import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const ENDPOINT = 'https://api.indexnow.org/indexnow';
const MAX_URLS = 10_000;

function canonicalUrl(input, host) {
  if (typeof input !== 'string' || /[?#\s\\]/.test(input)) {
    throw new Error(`URL non ammesso: ${input}`);
  }
  let url;
  try { url = new URL(input); } catch { throw new Error(`URL non valido: ${input}`); }
  if (url.protocol !== 'https:' || url.host !== host || url.username || url.password) {
    throw new Error(`È richiesto HTTPS sull'host esatto ${host}, senza credenziali: ${input}`);
  }
  return url.href;
}

function decodeEntities(text) {
  const named = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" };
  return text.replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (_, entity) => {
    if (!entity.startsWith('#')) return named[entity.toLowerCase()];
    const hex = entity[1].toLowerCase() === 'x';
    return String.fromCodePoint(Number.parseInt(entity.slice(hex ? 2 : 1), hex ? 16 : 10));
  });
}

// Deliberately limited to the flat UTF-8 urlset emitted by these sites.
// Not a general XML parser: sitemap indexes, DTDs and entities are rejected.
export function parseSitemap(xml, host) {
  if (/<!DOCTYPE|<!ENTITY/i.test(xml)) throw new Error('DTD/entity non ammessi nella sitemap');
  const root = xml.trim().match(/^(?:<\?xml[^?]*\?>\s*)?<urlset\b[^>]*>([\s\S]*)<\/urlset>$/);
  if (!root) throw new Error('Formato sitemap non supportato: atteso urlset XML piatto');
  const entries = [...root[1].matchAll(/<url\b[^>]*>([\s\S]*?)<\/url>/g)];
  if (!entries.length || root[1].replace(/<url\b[^>]*>[\s\S]*?<\/url>/g, '').trim()) {
    throw new Error('Sitemap vuota o struttura url non supportata');
  }
  return new Set(entries.map((entry) => {
    const locations = [...entry[1].matchAll(/<loc>([^<]+)<\/loc>/g)];
    if (locations.length !== 1) throw new Error('Ogni url della sitemap deve avere un solo loc');
    return canonicalUrl(decodeEntities(locations[0][1].trim()), host);
  }));
}

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)]
    .map((match) => [match[1].toLowerCase(), decodeEntities(match[2] ?? match[3] ?? match[4])]));
}

function ensureIndexable(html, response, url, host) {
  const noindex = /\b(?:noindex|none)\b/i;
  if (noindex.test(response.headers.get('x-robots-tag') || '')) {
    throw new Error(`X-Robots-Tag impedisce l'indicizzazione: ${url}`);
  }
  // Inspect server-rendered head only; body examples must not count as metadata.
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1];
  if (!head) throw new Error(`Head HTML assente: ${url}`);
  for (const tag of head.matchAll(/<meta\b[^>]*>/gi)) {
    const meta = attributes(tag[0]);
    if (/^(?:robots|googlebot(?:-news)?|bingbot|oai-searchbot|perplexitybot|claude-searchbot)$/i.test(meta.name || '') && noindex.test(meta.content || '')) {
      throw new Error(`Meta robots impedisce l'indicizzazione: ${url}`);
    }
  }
  const canonicals = [...head.matchAll(/<link\b[^>]*>/gi)].map((tag) => attributes(tag[0]))
    .filter((link) => (link.rel || '').toLowerCase().split(/\s+/).includes('canonical'));
  if (canonicals.length !== 1 || canonicalUrl(canonicals[0].href, host) !== url) {
    throw new Error(`Canonical assente, multiplo o non coerente: ${url}`);
  }
}

export async function runIndexNow({ config, urls, submit = false, fetchImpl = globalThis.fetch }) {
  if (!config || !/^[a-z0-9.-]+$/.test(config.host || '') || !/^[a-f0-9]{32}$/.test(config.key || '')) {
    throw new Error('Configurazione IndexNow non valida: host canonico e chiave hex32 richiesti');
  }
  if (!Array.isArray(urls) || !urls.length) throw new Error('Specificare almeno un URL modificato dopo l’attivazione');
  const urlList = [...new Set(urls.map((url) => canonicalUrl(url, config.host)))];
  if (urlList.length > MAX_URLS) throw new Error(`Massimo ${MAX_URLS} URL distinti per invio`);
  const keyLocation = `https://${config.host}/${config.key}.txt`;
  async function get(url) {
    const response = await fetchImpl(url, { method: 'GET', redirect: 'manual', signal: AbortSignal.timeout(15_000) });
    if (response.status !== 200 || response.redirected) throw new Error(`GET deve restituire 200 senza redirect: ${url} (HTTP ${response.status})`);
    return response;
  }
  const keyResponse = await get(keyLocation);
  if ((await keyResponse.text()).trim() !== config.key) throw new Error('Il file chiave pubblico non corrisponde alla configurazione');
  const sitemapResponse = await get(`https://${config.host}/sitemap.xml`);
  const sitemapUrls = parseSitemap(await sitemapResponse.text(), config.host);
  for (const url of urlList) {
    if (!sitemapUrls.has(url)) throw new Error(`URL assente dalla sitemap canonica: ${url}`);
  }
  for (const url of urlList) {
    const response = await get(url);
    if (!(response.headers.get('content-type') || '').toLowerCase().includes('text/html')) {
      throw new Error(`La pagina non è HTML: ${url}`);
    }
    ensureIndexable(await response.text(), response, url, config.host);
  }
  const payload = { host: config.host, key: config.key, keyLocation, urlList };
  const result = { mode: submit ? 'submit' : 'dry-run', host: config.host, keyLocation, urlList, checkedAt: new Date().toISOString(), indexingVerified: false };
  if (!submit) return { ...result, message: 'Controlli superati; nessuna notifica inviata. Indicare --submit soltanto per modifiche successive all’attivazione.' };
  const response = await fetchImpl(ENDPOINT, {
    method: 'POST', redirect: 'manual', signal: AbortSignal.timeout(15_000),
    headers: { 'Content-Type': 'application/json; charset=utf-8' }, body: JSON.stringify(payload)
  });
  if (![200, 202].includes(response.status) || response.redirected) {
    throw new Error(`IndexNow HTTP ${response.status}: invio non confermato, nessun retry automatico`);
  }
  return { ...result, httpStatus: response.status, message: response.status === 200
    ? 'URL ricevuti da IndexNow; indicizzazione non verificata né garantita.'
    : 'URL ricevuti; verifica della chiave ancora pendente. Indicizzazione non verificata né garantita.' };
}

export function parseArguments(args) {
  const unknown = args.find((arg) => arg.startsWith('-') && !['--submit', '--help'].includes(arg));
  if (unknown) throw new Error(`Opzione sconosciuta: ${unknown}`);
  return { help: args.includes('--help'), submit: args.includes('--submit'), urls: args.filter((arg) => !arg.startsWith('-')) };
}

async function main() {
  const args = parseArguments(process.argv.slice(2));
  if (args.help) {
    console.log('Uso: node scripts/indexnow.mjs [--submit] https://host-canonico/percorso [...]\nDefault: soli GET di verifica, nessun invio. Solo URL modificati DOPO l’attivazione. Vedi docs/INDEXNOW.md.');
    return;
  }
  const config = JSON.parse(await readFile(new URL('../indexnow.config.json', import.meta.url), 'utf8'));
  console.log(JSON.stringify(await runIndexNow({ config, ...args }), null, 2));
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch((error) => { console.error(error.message); process.exitCode = 1; });
}
