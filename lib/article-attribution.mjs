// Public editorial context only. Never reads form values, URL queries or marketing IDs.
export const ARTICLE_ATTRIBUTION_TTL_MS = 30 * 60 * 1000;
const emptyContext = () => ({ article_id: '', article_title: '', article_path: '' });
const normalizePath = (path) => path === '/' ? '/' : path.replace(/\/+$/, '');
const cleanPath = (path) => typeof path === 'string' && /^\/[a-z0-9/_-]*$/i.test(path) && path.length <= 600 ? path : null;

export function createArticleAttribution({ site, origin, contactPaths, hasAnalyticsConsent, getWindow = () => typeof window === 'undefined' ? null : window, getDocument = () => typeof document === 'undefined' ? null : document, now = () => Date.now() }) {
  if (!['avvocato', 'eredita', 'studio'].includes(site)) throw new Error('Unknown editorial site');
  const canonicalOrigin = new URL(origin).origin;
  const key = `dm-article-contact-v1:${site}`;
  const allowedContactPaths = new Set(contactPaths.map(normalizePath));
  const originals = new WeakMap();
  let suppressed = false;
  const allowed = () => { try { return hasAnalyticsConsent() === true; } catch { return false; } };
  const currentPath = () => cleanPath(getWindow()?.location?.pathname || '');
  function validContext(value) {
    if (!value || typeof value !== 'object' || !new RegExp(`^${site}-[0-9]{3}$`).test(value.article_id || '')) return null;
    const path = cleanPath(value.article_path);
    const title = typeof value.article_title === 'string' ? Array.from(value.article_title, (character) => character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127 ? ' ' : character).join('').replace(/\s+/g, ' ').trim() : '';
    if (!path || !title || title.length > 300) return null;
    return { article_id: value.article_id, article_title: title, article_path: path };
  }
  function currentArticle() {
    const marker = getDocument()?.querySelector('[data-editorial-id][data-editorial-title][data-editorial-path]');
    if (!marker) return null;
    const context = validContext({ article_id: marker.getAttribute('data-editorial-id'), article_title: marker.getAttribute('data-editorial-title'), article_path: marker.getAttribute('data-editorial-path') });
    return context && normalizePath(context.article_path) === normalizePath(currentPath() || '') ? context : null;
  }
  function clear() {
    suppressed = true;
    try { getWindow()?.sessionStorage.removeItem(key); } catch { /* Storage failure cannot break a contact action. */ }
  }
  function pendingArticle() {
    if (!allowed()) { clear(); return null; }
    if (suppressed) return null;
    try {
      const raw = getWindow()?.sessionStorage.getItem(key);
      if (!raw) return null;
      const value = JSON.parse(raw), context = validContext(value.context);
      const target = normalizePath(currentPath() || '');
      if (value.version !== 1 || value.site !== site || !context || !Number.isFinite(value.savedAt) || value.savedAt > now() || now() - value.savedAt >= ARTICLE_ATTRIBUTION_TTL_MS || !allowedContactPaths.has(value.targetPath)) { clear(); return null; }
      if (target !== value.targetPath) return null;
      return context;
    } catch { clear(); return null; }
  }
  function resolveContext() { return currentArticle() || pendingArticle(); }
  function getEventContext() {
    const context = resolveContext();
    if (!context) return emptyContext();
    // GA4 custom event values allow 100 characters; never send a truncated URL.
    return { article_id: context.article_id, article_title: context.article_title.slice(0, 100), article_path: context.article_path.length <= 100 ? context.article_path : '' };
  }
  function rememberContactNavigation(href) {
    if (!allowed()) { clear(); return; }
    const context = currentArticle(), win = getWindow();
    if (!win) return;
    try {
      const target = new URL(href, win.location.href || canonicalOrigin + currentPath());
      if (!['https:', 'http:'].includes(target.protocol) || ['wa.me', 'api.whatsapp.com'].includes(target.hostname)) return;
      const sameSite = [new URL(win.location.href || canonicalOrigin).origin, canonicalOrigin].includes(target.origin);
      const targetPath = normalizePath(target.pathname);
      if (context && sameSite && allowedContactPaths.has(targetPath)) {
        clear();
        win.sessionStorage.setItem(key, JSON.stringify({ version: 1, site, savedAt: now(), targetPath, context }));
        suppressed = false;
      } else if (!sameSite || targetPath !== normalizePath(currentPath() || '')) clear();
    } catch { clear(); }
  }
  function syncPage() {
    if (!allowed() || !allowedContactPaths.has(normalizePath(currentPath() || ''))) clear();
    else pendingArticle();
  }
  function decorateWhatsAppHref(href) {
    try {
      const url = new URL(href);
      if (url.protocol !== 'https:' || !['wa.me', 'api.whatsapp.com'].includes(url.hostname)) return href;
      const number = url.hostname === 'wa.me' ? url.pathname.slice(1) : url.searchParams.get('phone');
      if (number?.replace(/\D/g, '') !== '390697615122') return href;
      const text = url.searchParams.get('text') || '';
      // Remove only an earlier suffix generated by this helper, never user-entered form text.
      const base = text.replace(/\n\nArticolo consultato: [^\n]*\nPagina: https:\/\/[^\s]+$/, '');
      const context = resolveContext();
      const next = context?.article_id ? `${base}\n\nArticolo consultato: ${context.article_title}\nPagina: ${canonicalOrigin}${context.article_path}` : base;
      if (next !== text) url.searchParams.set('text', next);
      return next !== text ? url.href : href;
    } catch { return href; }
  }
  function rewriteWhatsAppLinks(root = getDocument()) {
    for (const anchor of root?.querySelectorAll('a[href]') || []) {
      const href = anchor.getAttribute('href') || '';
      let saved = originals.get(anchor);
      if (!saved || (href !== saved.last && href !== saved.original)) saved = { original: href, last: href };
      const next = decorateWhatsAppHref(saved.original);
      if (next !== href) anchor.setAttribute('href', next);
      originals.set(anchor, { original: saved.original, last: next });
    }
  }
  return { getEventContext, rememberContactNavigation, decorateWhatsAppHref, rewriteWhatsAppLinks, syncPage, clear };
}
