import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { articleBody, articleHash, decodeHtml, hash, escapeHtml, planNext, publicUrl, romeDate, validateEntry } from './engine.mjs';
import { runIndexNow } from '../indexnow.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const read = async (file) => JSON.parse(await fs.readFile(path.join(root, file), 'utf8'));
async function write(file, value) {
  const destination = path.join(root, file);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.writeFile(`${destination}.tmp`, JSON.stringify(value, null, 2) + '\n');
  await fs.rename(`${destination}.tmp`, destination);
}
const today = romeDate();
const config = await read('editorial/config.json');
const published = await read('editorial/published.json');
const state = await read('editorial/state.json');
const entries = [];
for (const file of (await fs.readdir(path.join(root, 'editorial/approved'))).filter((f) => f.endsWith('.json')).sort()) {
  const entry = await read(`editorial/approved/${file}`);
  const image = await fs.readFile(path.join(root, 'editorial/assets', path.basename(entry.article.image.path)));
  entries.push(validateEntry(entry, config, image, today));
}
for (const key of ['id', 'slug']) {
  const values = entries.map((e) => e.article[key]);
  if (new Set(values).size !== values.length) throw new Error(`Duplicazione ${key} nella coda`);
  const released = published.map((e) => e.article[key]);
  if (new Set(released).size !== released.length) throw new Error(`Duplicazione ${key} nei pubblicati`);
}
for (const item of published) {
  if (!entries.some((entry) => entry.article.id === item.article.id && entry.approval.sha256 === item.approval.sha256)) throw new Error(`Pubblicazione senza approvazione corrispondente: ${item.article.id}`);
  if (articleHash(item.article) !== item.approval.sha256) throw new Error('Contenuto pubblicato modificato senza approvazione');
  if (item.publishedDate > today || !item.publishedAt) throw new Error('Data di pubblicazione futura o assente');
}
const hour = Number(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Rome', hour: '2-digit', hourCycle: 'h23' }).format(new Date()));
const plan = planNext({ config, entries, published, today, hour, pending: state.pending });
const command = process.argv[2] || 'plan';
if (!['plan', 'stage', 'generate', 'verify', 'deploy'].includes(command)) throw new Error('Comando non riconosciuto');
if (command === 'plan') {
  const summary = { action: plan.action, id: plan.id, url: plan.url, reason: plan.reason };
  console.log(JSON.stringify({ ...summary, site: config.site, approved: entries.length, published: published.length }, null, 2));
  if (process.env.GITHUB_OUTPUT) await fs.appendFile(process.env.GITHUB_OUTPUT, `action=${plan.action}\n`);
}
if (command === 'stage') {
  if (plan.action !== 'publish') throw new Error(`Nessuna nuova pubblicazione consentita: ${plan.action}`);
  const record = { ...plan.entry, publishedDate: today, publishedAt: new Date().toISOString() };
  await fs.mkdir(path.join(root, 'public/images/editorial'), { recursive: true });
  await fs.copyFile(path.join(root, 'editorial/assets', path.basename(record.article.image.path)), path.join(root, 'public', record.article.image.path));
  published.push(record);
  await write('editorial/published.json', published);
  await write('editorial/state.json', { ...state, pending: { id: record.article.id, url: plan.url, stagedAt: record.publishedAt } });
  console.log(`Preparato ${record.article.id}; il rilascio deve ancora essere verificato.`);
}
if (command === 'generate') {
  const feed = published.map((record) => {
    const a = record.article;
    const bodyHtml = articleBody(a);
    const serviceSlugs = a.relatedExistingUrls.filter((u) => new URL(u).origin === config.origin).map((u) => new URL(u).pathname.replace(/^\/+|\/+$/g, '')).filter((s) => config.serviceSlugs.includes(s));
    if (!serviceSlugs.length) throw new Error(`Nessuna pagina servizio valida: ${a.id}`);
    const common = { editorialId: a.id, slug: a.slug, title: a.title, seoTitle: a.seoTitle, category: a.area, image: a.image.path, imageAlt: a.image.alt, bodyHtml, publishedAt: record.publishedAt, updatedAt: record.publishedAt, reviewedBy: record.approval.reviewer, reviewedAt: record.approval.approvedAt };
    if (config.site === 'avvocato') return { ...common, description: a.description, service: serviceSlugs[0], intro: '', sections: [], faqs: a.faqs, relatedArticles: [], readTime: `${Math.max(2, Math.ceil(a.bodyMarkdown.split(/\s+/).length / 210))} min` };
    if (config.site === 'eredita') return { ...common, excerpt: a.description, answerFirst: a.description, relatedServiceSlugs: serviceSlugs, faq: a.faqs, sections: [] };
    const faq = a.faqs.length ? `<section><h2>Domande frequenti</h2>${a.faqs.map((q) => `<h3>${escapeHtml(q.question)}</h3><p>${escapeHtml(q.answer)}</p>`).join('')}</section>` : '';
    const html = bodyHtml + faq;
    const itemPath = `${config.pathPrefix}${a.slug}`.replace(/\/$/, '');
    return { id: a.id, editorialId: a.id, contentType: 'post', locale: 'it', slug: a.slug, path: itemPath, url: publicUrl(a, config), title: a.title, heading: a.title, excerpt: a.description, summary: a.description, contentHtml: html, contentRaw: html, cleanHtml: html, bodyHtml: html, plainText: html.replace(/<[^>]*>/g, ' '), date: record.publishedAt, modified: record.publishedAt, featuredImage: { id: `${a.id}-image`, url: a.image.path, alt: a.image.alt, title: a.title }, categories: [{ id: `editorial-${a.area}`, name: a.area, slug: a.area.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') }], tags: [], seo: { title: a.seoTitle, description: a.description, focusKeyword: '', openGraphTitle: a.title, openGraphDescription: a.description, openGraphImage: a.image.path }, oldSlugs: [], isFrontPage: false, isBlogIndex: false, reviewedBy: record.approval.reviewer, reviewedAt: record.approval.approvedAt };
  });
  await write('editorial/site-articles.json', feed);
  if (config.site === 'studio') {
    const data = await read('data/site-content.json');
    data.items = data.items.filter((item) => !item.editorialId);
    if (feed.some((item) => data.items.some((existing) => existing.path === item.path))) throw new Error('Conflitto con un URL esistente');
    data.items.push(...feed);
    await write('data/site-content.json', data);
  }
  console.log(`${feed.length} articoli pubblicati caricati; nessuna bozza nel sito.`);
}
if (command === 'deploy') {
  if (!state.pending) throw new Error('Nessun rilascio da distribuire');
  const hook = process.env.VERCEL_EDITORIAL_DEPLOY_HOOK;
  if (!hook || !/^https:\/\/api\.vercel\.com\/v1\/integrations\/deploy\//.test(hook)) throw new Error('Deploy Hook Vercel assente o non valido');
  const response = await fetch(hook, { method: 'POST', redirect: 'error', signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw new Error(`Deploy Hook HTTP ${response.status}`);
  const body = await response.json();
  if (!body.job?.id) throw new Error('Vercel non ha restituito un job di deploy');
  console.log('Deploy richiesto a Vercel; attendo la verifica del sito pubblico.');
}
if (command === 'verify') {
  if (!state.pending) { console.log('Nessun rilascio pendente'); process.exit(0); }
  const record = published.find((item) => item.article.id === state.pending.id);
  if (!record) throw new Error('Stato pendente senza articolo');
  const a = record.article;
  const url = publicUrl(a, config);
  const response = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(20000) });
  if (response.status !== 200) throw new Error(`Pagina non disponibile: HTTP ${response.status}`);
  const html = await response.text();
  const pageTitle = decodeHtml(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '');
  if (!decodeHtml(html).includes(a.title) || !pageTitle.includes(a.seoTitle) || !html.includes(a.image.path) || !html.includes(articleHash(a))) throw new Error('Testo, metadata o immagine attesa non presenti nel rilascio');
  const image = await fetch(new URL(a.image.path, config.origin), { redirect: 'manual', signal: AbortSignal.timeout(20000) });
  if (image.status !== 200 || !(image.headers.get('content-type') || '').startsWith('image/')) throw new Error('Immagine pubblica non disponibile');
  if (hash(Buffer.from(await image.arrayBuffer())) !== a.image.sha256) throw new Error('Immagine pubblica diversa da quella approvata');
  const result = await runIndexNow({ config: await read('indexnow.config.json'), urls: [url], submit: true });
  await write('editorial/state.json', { pending: null, lastVerified: { id: a.id, url, checkedAt: new Date().toISOString(), indexNowStatus: result.httpStatus, indexingVerified: false } });
  console.log(JSON.stringify({ id: a.id, url, verification: 'HTTP, immagine, canonical, robots e sitemap verificati', indexNowStatus: result.httpStatus, indexingVerified: false }, null, 2));
}
