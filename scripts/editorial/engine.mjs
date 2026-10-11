import { createHash } from 'node:crypto';

export const hash = (value) => createHash('sha256').update(value).digest('hex');
export function canonicalJson(value) {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(',')}]`;
  if (value && typeof value === 'object') return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(',')}}`;
  return JSON.stringify(value);
}
export const articleHash = (article) => hash(canonicalJson(article));
export function romeDate(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Rome', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
}
export function addDays(date, count) {
  const result = new Date(`${date}T12:00:00Z`);
  result.setUTCDate(result.getUTCDate() + count);
  return result.toISOString().slice(0, 10);
}
export function validDate(date) {
  return typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(Date.parse(date)) && new Date(`${date}T12:00:00Z`).toISOString().slice(0, 10) === date;
}
export function publicUrl(article, config) {
  return `${config.origin}${config.pathPrefix}${article.slug}${config.trailingSlash ? '/' : ''}`;
}
export function validateEntry(entry, config, imageBytes, today) {
  const { article: a, approval, releaseDate } = entry;
  if (!a || a.site !== config.site || !new RegExp(`^${config.site}-\\d{3}$`).test(a.id || '')) throw new Error('Identità articolo non valida');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(a.slug || '')) throw new Error(`Slug non valido: ${a.id}`);
  for (const key of ['title', 'seoTitle', 'description', 'area', 'bodyMarkdown']) if (typeof a[key] !== 'string' || !a[key].trim()) throw new Error(`Campo ${key} assente: ${a.id}`);
  if (a.status !== 'approved' || a.legalReview !== 'approved' || !approval?.reviewer?.trim() || !validDate(approval.approvedAt) || !validDate(approval.validUntil) || !validDate(releaseDate)) throw new Error(`Approvazione incompleta: ${a.id}`);
  if (approval.approvedAt > releaseDate || approval.validUntil < releaseDate || approval.approvedAt > today) throw new Error(`Date approvazione incoerenti: ${a.id}`);
  if (a.reviewValidUntil && (!validDate(a.reviewValidUntil) || approval.validUntil > a.reviewValidUntil)) throw new Error(`Aggiornamento normativo da verificare: ${a.id}`);
  if (approval.sha256 !== articleHash(a)) throw new Error(`Contenuto cambiato dopo approvazione: ${a.id}`);
  if (a.image?.status !== 'generated' || !a.image.alt || !/^\/images\/editorial\/[a-z]+-\d{3}\.webp$/.test(a.image.path || '') || !/^[a-f0-9]{64}$/.test(a.image.sha256 || '') || hash(imageBytes) !== a.image.sha256) throw new Error(`Immagine mancante o cambiata: ${a.id}`);
  if (!a.sources?.length || a.sources.some((s) => !s.title || !s.supports || !validDate(s.checkedAt) || s.checkedAt > approval.approvedAt || !/^https:\/\//.test(s.url))) throw new Error(`Fonti incomplete: ${a.id}`);
  if (!Array.isArray(a.faqs) || a.faqs.some((q) => !q.question || !q.answer)) throw new Error(`FAQ non valide: ${a.id}`);
  if (!Array.isArray(a.relatedExistingUrls) || a.relatedExistingUrls.some((url) => !/^https:\/\//.test(url))) throw new Error(`Collegamenti non validi: ${a.id}`);
  return entry;
}
export function planNext({ config, entries, published, today, hour, pending }) {
  if (!config.enabled) return { action: 'paused', reason: 'Calendario non attivato' };
  if (!validDate(config.startDate) || config.cadenceDays !== 2) throw new Error('Calendario non configurato');
  if (pending) return { action: 'verify', id: pending.id, reason: 'Verificare il rilascio precedente prima di pubblicare altro' };
  if (today < config.startDate || hour < config.publishHour) return { action: 'wait' };
  const ids = new Set(published.map((x) => x.article.id));
  const last = published.map((x) => x.publishedDate).sort().at(-1);
  if (last && today < addDays(last, config.cadenceDays)) return { action: 'wait', reason: 'Intervallo minimo di due giorni' };
  const ordered = entries.filter((x) => !ids.has(x.article.id)).sort((a,b) => a.releaseDate.localeCompare(b.releaseDate) || a.article.id.localeCompare(b.article.id));
  const next = ordered[0];
  if (!next || next.releaseDate > today) return { action: 'wait' };
  if (next.approval.validUntil < today) throw new Error(`Revisione da rinnovare prima della pubblicazione: ${next.article.id}`);
  return { action: 'publish', id: next.article.id, url: publicUrl(next.article, config), entry: next };
}
export const escapeHtml = (text) => String(text).replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
export const decodeHtml = (text) => String(text).replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (_, entity) => {
  if (entity[0] === '#') return String.fromCodePoint(parseInt(entity.slice(entity[1].toLowerCase() === 'x' ? 2 : 1), entity[1].toLowerCase() === 'x' ? 16 : 10));
  return { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" }[entity.toLowerCase()];
});
function inline(text) {
  // Raw HTML is always escaped. Only HTTPS links and explicit local paths survive.
  const tokens = [];
  const replaced = text.replace(/\[([^\]\n]+)\]\((https:\/\/[^\s)]+|\/(?!\/)[^\s)]*)\)/g, (_, label, url) => {
    tokens.push(`<a href="${escapeHtml(url)}">${escapeHtml(label)}</a>`);
    return `\uE000${tokens.length - 1}\uE000`;
  });
  return escapeHtml(replaced).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\uE000(\d+)\uE000/g, (_, i) => tokens[Number(i)] || '');
}
export function markdownHtml(markdown) {
  if (/\uE000/.test(markdown)) throw new Error('Carattere riservato non ammesso');
  return markdown.trim().split(/\n\s*\n/).map((block) => {
    const heading = block.match(/^(#{1,4})\s+([^\n]+)$/);
    if (heading) { const level = Math.max(2, heading[1].length); return `<h${level}>${inline(heading[2])}</h${level}>`; }
    const lines = block.split('\n');
    if (lines.every((line) => /^[-*] /.test(line))) return `<ul>${lines.map((line) => `<li>${inline(line.slice(2))}</li>`).join('')}</ul>`;
    if (lines.every((line) => /^\d+\. /.test(line))) return `<ol>${lines.map((line) => `<li>${inline(line.replace(/^\d+\. /, ''))}</li>`).join('')}</ol>`;
    return `<p>${inline(block.replace(/\n/g, ' '))}</p>`;
  }).join('\n');
}
export function articleBody(a) {
  return `<div data-editorial-digest="${articleHash(a)}">${markdownHtml(a.bodyMarkdown)}\n<section><h2>Fonti e riferimenti</h2><ul>${a.sources.map((s) => `<li><a href="${escapeHtml(s.url)}">${escapeHtml(s.title)}</a></li>`).join('')}</ul><p>Fonti controllate il ${escapeHtml(a.sources.map((s) => s.checkedAt).sort().at(-1))}. Contenuto informativo generale; la valutazione del caso richiede l'esame dei documenti.</p></section></div>`;
}
