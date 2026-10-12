import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { articleBody, articleHash, hash } from './engine.mjs';

const source = path.dirname(fileURLToPath(import.meta.url));
async function indexNowSource() {
  const adjacent = path.resolve(source, '../indexnow.mjs');
  try { await fs.access(adjacent); return adjacent; }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  // The central development copy lives in work/editorial-system. Repository
  // copies must use scripts/indexnow.mjs and must not silently reach elsewhere.
  if (path.basename(source) !== 'editorial-system') throw new Error('Missing scripts/indexnow.mjs beside the editorial test directory');
  return path.resolve(source, '../editorial-sites/avvocato/scripts/indexnow.mjs');
}
const now = '2026-10-15T10:00:00.000Z';
const bytes = Buffer.from('synthetic image fixture: never published');
const origin = 'https://avvocatodelmonte.com';
const key = '0123456789abcdef0123456789abcdef';
const hook = 'https://api.vercel.com/v1/integrations/deploy/test-fixture-never-network';
const writeJson = (file, value) => fs.writeFile(file, JSON.stringify(value, null, 2));

function entry(number, validUntil = '2026-12-31') {
  const id = `avvocato-${String(number).padStart(3, '0')}`;
  const article = {
    id, site: 'avvocato', slug: `collaudo-isolato-${number}`,
    title: `Collaudo sintetico ${number}`, seoTitle: `Collaudo sintetico ${number}`,
    description: 'Fixture usata soltanto da un test locale isolato.', area: 'Cassazione civile',
    bodyMarkdown: '## Prova locale\n\nContenuto sintetico che non viene pubblicato.',
    status: 'approved', legalReview: 'approved',
    image: { status: 'generated', alt: 'Fixture sintetica', path: `/images/editorial/${id}.webp`, sha256: hash(bytes) },
    sources: [{ url: 'https://www.normattiva.it/', title: 'Fonte sintetica del test', supports: 'Campo di prova senza proposizioni legali.', checkedAt: '2026-10-12' }],
    faqs: [], relatedExistingUrls: [`${origin}/cassazione-civile`],
  };
  return { article, releaseDate: number === 1 ? '2026-10-12' : '2026-10-14', approval: { reviewer: 'Revisore sintetico test', evidence: 'Fixture, non approvazione reale', approvedAt: '2026-10-12', validUntil, sha256: articleHash(article) } };
}

// This preload completely replaces fetch and Date inside the child CLI process.
// There is deliberately no fallback to the real network.
const mockSource = String.raw`
import fs from 'node:fs/promises';
import path from 'node:path';
const root = process.env.FIXTURE_ROOT;
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) { super(...(args.length ? args : [process.env.FIXTURE_NOW])); }
  static now() { return new RealDate(process.env.FIXTURE_NOW).valueOf(); }
};
const config = JSON.parse(await fs.readFile(path.join(root, 'mock-config.json'), 'utf8'));
globalThis.fetch = async (input, options = {}) => {
  const url = String(input), method = options.method || 'GET';
  const stateAtRequest = JSON.parse(await fs.readFile(path.join(root, 'editorial/state.json'), 'utf8'));
  await fs.appendFile(path.join(root, 'requests.jsonl'), JSON.stringify({url, method, pending: stateAtRequest.pending}) + '\n');
  if (url === config.hook && method === 'POST') {
    if (process.env.FIXTURE_HOOK === 'network-error') throw new Error('Simulated network failure');
    if (process.env.FIXTURE_HOOK === 'failure') return new Response('Simulated failure', {status: 503});
    return Response.json({job: {id: 'synthetic-job'}});
  }
  if (url === 'https://api.indexnow.org/indexnow' && method === 'POST') {
    if (process.env.FIXTURE_LIVE !== 'yes') throw new Error('Unexpected IndexNow request');
    return new Response('', {status: 200});
  }
  if (method !== 'GET') throw new Error('Unexpected mock request: ' + method + ' ' + url);
  if (process.env.FIXTURE_LIVE !== 'yes') return new Response('Not deployed', {status: 404});
  if (url === config.pageUrl) return new Response(config.html, {headers: {'content-type': 'text/html'}});
  if (url === config.imageUrl) return new Response(Buffer.from(config.imageBase64, 'base64'), {headers: {'content-type': 'image/webp'}});
  if (url === config.keyUrl) return new Response(config.key);
  if (url === config.sitemapUrl) return new Response('<urlset><url><loc>' + config.pageUrl + '</loc></url></urlset>', {headers: {'content-type': 'application/xml'}});
  throw new Error('Unmatched mocked URL, real network forbidden: ' + url);
};
`;

async function setup(t, { expired = false, published = true, pending = true, next = false, nextExpired = false, attempts = 0, requestedAt, lastVerified } = {}) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'editorial-cli-isolated-'));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  await fs.mkdir(path.join(root, 'scripts/editorial'), { recursive: true });
  await fs.mkdir(path.join(root, 'editorial/approved'), { recursive: true });
  await fs.mkdir(path.join(root, 'editorial/assets'), { recursive: true });
  for (const name of ['cli.mjs', 'engine.mjs']) await fs.copyFile(path.join(source, name), path.join(root, 'scripts/editorial', name));
  await fs.copyFile(await indexNowSource(), path.join(root, 'scripts/indexnow.mjs'));
  const first = entry(1, expired ? '2026-10-13' : undefined);
  const entries = next ? [first, entry(2, nextExpired ? '2026-10-14' : undefined)] : [first];
  for (const item of entries) {
    await writeJson(path.join(root, 'editorial/approved', `${item.article.id}.json`), item);
    await fs.writeFile(path.join(root, 'editorial/assets', path.basename(item.article.image.path)), bytes);
  }
  const record = { ...first, publishedDate: '2026-10-12', publishedAt: '2026-10-12T08:00:00.000Z' };
  await writeJson(path.join(root, 'editorial/config.json'), { site: 'avvocato', enabled: true, startDate: '2026-10-12', cadenceDays: 2, publishHour: 8, timezone: 'Europe/Rome', origin, pathPrefix: '/approfondimenti/', trailingSlash: false, serviceSlugs: ['cassazione-civile'] });
  await writeJson(path.join(root, 'editorial/published.json'), published ? [record] : []);
  await writeJson(path.join(root, 'editorial/site-articles.json'), []);
  await writeJson(path.join(root, 'editorial/state.json'), { pending: pending ? { id: first.article.id, url: `${origin}/approfondimenti/${first.article.slug}`, stagedAt: record.publishedAt, deployAttempts: attempts, ...(requestedAt ? { deployRequestedAt: requestedAt } : {}) } : null, lastVerified: lastVerified || null });
  await writeJson(path.join(root, 'indexnow.config.json'), { host: 'avvocatodelmonte.com', key });
  const pageUrl = `${origin}/approfondimenti/${first.article.slug}`;
  await writeJson(path.join(root, 'mock-config.json'), { hook, pageUrl, imageUrl: origin + first.article.image.path, imageBase64: bytes.toString('base64'), key, keyUrl: `${origin}/${key}.txt`, sitemapUrl: `${origin}/sitemap.xml`, html: `<html><head><title>${first.article.seoTitle}</title><link rel="canonical" href="${pageUrl}"></head><body><h1>${first.article.title}</h1><img src="${first.article.image.path}" alt="Fixture">${articleBody(first.article)}</body></html>` });
  await fs.writeFile(path.join(root, 'fetch-mock.mjs'), mockSource);
  return {
    root, first,
    run(command, { live = false, hookResult = 'success', at = now } = {}) {
      const result = spawnSync(process.execPath, ['--import', path.join(root, 'fetch-mock.mjs'), path.join(root, 'scripts/editorial/cli.mjs'), command], {
        cwd: root, encoding: 'utf8', timeout: 15000,
        env: { ...process.env, NODE_OPTIONS: '', GITHUB_OUTPUT: '', FIXTURE_ROOT: root, FIXTURE_NOW: at, FIXTURE_LIVE: live ? 'yes' : 'no', FIXTURE_HOOK: hookResult, VERCEL_EDITORIAL_DEPLOY_HOOK: hook },
      });
      if (result.error) throw result.error;
      return result;
    },
    read(relative) { return fs.readFile(path.join(root, relative), 'utf8').then(JSON.parse); },
    async requests() {
      try { return (await fs.readFile(path.join(root, 'requests.jsonl'), 'utf8')).trim().split('\n').filter(Boolean).map(JSON.parse); }
      catch (error) { if (error.code === 'ENOENT') return []; throw error; }
    },
  };
}
const assertSuccess = result => assert.equal(result.status, 0, result.stderr || result.stdout);
const hookPosts = requests => requests.filter(request => request.url === hook && request.method === 'POST');

test('generate rebuilds existing content even when an unpublished approval is expired', async t => {
  const f = await setup(t, { pending: false, next: true, nextExpired: true });
  assertSuccess(f.run('generate'));
  const feed = await f.read('editorial/site-articles.json');
  assert.equal(feed.length, 1);
  assert.equal(feed[0].editorialId, 'avvocato-001');
  assert.deepEqual(await f.requests(), []);
  const plan = f.run('plan');
  assert.notEqual(plan.status, 0);
  assert.match(plan.stderr, /Revisione da rinnovare/);
});

test('failed hook preserves attempt before POST and can retry after cooldown', async t => {
  const f = await setup(t);
  const failed = f.run('deploy', { hookResult: 'failure' });
  assert.notEqual(failed.status, 0); assert.match(failed.stderr, /Deploy Hook HTTP 503/);
  assert.equal((await f.read('editorial/state.json')).pending.deployAttempts, 1);
  assert.equal(hookPosts(await f.requests())[0].pending.deployAttempts, 1);
  assertSuccess(f.run('deploy', { at: '2026-10-15T12:00:00.000Z' }));
  assert.equal((await f.read('editorial/state.json')).pending.deployAttempts, 2);
  assert.equal(hookPosts(await f.requests()).length, 2);
});

test('network error also retains the attempt counter', async t => {
  const f = await setup(t);
  const failed = f.run('deploy', { hookResult: 'network-error' });
  assert.notEqual(failed.status, 0); assert.match(failed.stderr, /Simulated network failure/);
  assert.equal((await f.read('editorial/state.json')).pending.deployAttempts, 1);
});

test('already published approved bytes never request another deployment', async t => {
  const f = await setup(t, { attempts: 3 });
  const result = f.run('deploy', { live: true });
  assertSuccess(result); assert.match(result.stdout, /già online/);
  assert.equal(hookPosts(await f.requests()).length, 0);
  assert.equal((await f.requests()).filter(r => r.method === 'POST').length, 0);
  assert.equal((await f.read('editorial/state.json')).pending.deployAttempts, 3);
});

test('three unsuccessful requests prevent a fourth hook POST', async t => {
  const f = await setup(t, { attempts: 3, requestedAt: '2026-10-14T08:00:00.000Z' });
  const result = f.run('deploy');
  assert.notEqual(result.status, 0); assert.match(result.stderr, /Tre richieste/);
  assert.equal(hookPosts(await f.requests()).length, 0);
  assert.equal((await f.read('editorial/state.json')).pending.deployAttempts, 3);
});

test('one-hour cooldown prevents another hook POST', async t => {
  const f = await setup(t, { attempts: 1, requestedAt: '2026-10-15T09:30:00.000Z' });
  const result = f.run('deploy');
  assert.notEqual(result.status, 0); assert.match(result.stderr, /almeno un’ora/);
  assert.equal(hookPosts(await f.requests()).length, 0);
  assert.equal((await f.read('editorial/state.json')).pending.deployAttempts, 1);
});

test('approval expired during pending period prevents deployment retry', async t => {
  const f = await setup(t, { expired: true });
  const result = f.run('deploy');
  assert.notEqual(result.status, 0); assert.match(result.stderr, /Revisione scaduta/);
  assert.equal(hookPosts(await f.requests()).length, 0);
});

test('successful live verification clears pending and records actual verification time', async t => {
  const f = await setup(t);
  assertSuccess(f.run('verify', { live: true }));
  const state = await f.read('editorial/state.json');
  assert.equal(state.pending, null);
  assert.equal(state.lastVerified.id, f.first.article.id);
  assert.equal(state.lastVerified.checkedAt, now);
  assert.equal(state.lastVerified.indexingVerified, false);
  assert.equal((await f.requests()).filter(r => r.url === 'https://api.indexnow.org/indexnow' && r.method === 'POST').length, 1);
  assert.equal(hookPosts(await f.requests()).length, 0);
});

test('probe checks live content with GET only and preserves pending state', async t => {
  const f = await setup(t);
  const before = await f.read('editorial/state.json');
  assertSuccess(f.run('probe', { live: true }));
  const requests = await f.requests();
  assert.ok(requests.length > 0);
  assert.equal(requests.filter(r => r.method !== 'GET').length, 0);
  assert.deepEqual(await f.read('editorial/state.json'), before);
});

test('late verification prevents publication on the same day and the following day', async t => {
  const f = await setup(t, { pending: false, next: true, lastVerified: { id: 'avvocato-001', checkedAt: now } });
  for (const at of [now, '2026-10-16T10:00:00.000Z']) {
    const result = f.run('plan', { at }); assertSuccess(result);
    assert.equal(JSON.parse(result.stdout).action, 'wait');
  }
  const due = f.run('plan', { at: '2026-10-17T10:00:00.000Z' }); assertSuccess(due);
  assert.equal(JSON.parse(due.stdout).action, 'publish');
  assert.equal(JSON.parse(due.stdout).id, 'avvocato-002');
  assert.deepEqual(await f.requests(), []);
});
