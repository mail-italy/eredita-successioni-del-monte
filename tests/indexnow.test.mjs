import test from 'node:test';
import assert from 'node:assert/strict';
import { runIndexNow, parseArguments, parseSitemap } from '../scripts/indexnow.mjs';

const config = { host: 'example.test', key: 'a'.repeat(32) };
const pageUrl = 'https://example.test/studio';
const otherUrl = 'https://example.test/contatti';
const keyUrl = `https://example.test/${config.key}.txt`;
const sitemapUrl = 'https://example.test/sitemap.xml';
const endpoint = 'https://api.indexnow.org/indexnow';
const xml = (urls = [pageUrl]) => `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((url) => `<url><loc>${url}</loc><lastmod>2026-10-12</lastmod></url>`).join('')}</urlset>`;
const html = (url = pageUrl, extra = '') => `<html><head><link rel="canonical" href="${url}"/>${extra}</head><body>Page</body></html>`;

function harness({ keyBody = config.key, sitemap = xml(), pages = {}, postStatus = 200 } = {}) {
  const calls = [];
  const fetchImpl = async (url, options) => {
    calls.push({ url, ...options });
    assert.equal(options.redirect, 'manual');
    if (options.method === 'POST') {
      assert.equal(url, endpoint);
      return new Response(null, { status: postStatus });
    }
    assert.equal(options.method, 'GET');
    if (url === keyUrl) return new Response(keyBody);
    if (url === sitemapUrl) return new Response(sitemap, { headers: { 'content-type': 'application/xml' } });
    const page = pages[url] || {};
    return new Response(page.body ?? html(url), { status: page.status ?? 200, headers: { 'content-type': 'text/html', ...page.headers } });
  };
  return { calls, fetchImpl };
}

test('default dry-run validates key, sitemap and deduplicated page without any POST', async () => {
  const mock = harness();
  const result = await runIndexNow({ config, urls: [pageUrl, pageUrl], fetchImpl: mock.fetchImpl });
  assert.equal(result.mode, 'dry-run');
  assert.equal(result.indexingVerified, false);
  assert.deepEqual(result.urlList, [pageUrl]);
  assert.deepEqual(mock.calls.map((call) => call.url), [keyUrl, sitemapUrl, pageUrl]);
  assert.ok(mock.calls.every((call) => call.method === 'GET'));
});

test('explicit submit sends one batch only after all page checks, preserving public verification host', async () => {
  const mock = harness({ sitemap: xml([pageUrl, otherUrl]) });
  const result = await runIndexNow({ config, urls: [pageUrl, otherUrl], submit: true, fetchImpl: mock.fetchImpl });
  assert.equal(result.httpStatus, 200);
  assert.equal(result.indexingVerified, false);
  assert.deepEqual(mock.calls.map((call) => call.url), [keyUrl, sitemapUrl, pageUrl, otherUrl, endpoint]);
  assert.deepEqual(JSON.parse(mock.calls.at(-1).body), { ...config, keyLocation: keyUrl, urlList: [pageUrl, otherUrl] });
  assert.match(result.message, /ricevuti.*non verificata/);
});

test('202 reports pending key verification separately from receipt and indexing', async () => {
  const mock = harness({ postStatus: 202 });
  const result = await runIndexNow({ config, urls: [pageUrl], submit: true, fetchImpl: mock.fetchImpl });
  assert.equal(result.httpStatus, 202);
  assert.equal(result.indexingVerified, false);
  assert.match(result.message, /chiave ancora pendente/);
});

test('foreign hosts, credentials, query, fragment, HTTP and too many URLs fail before network', async () => {
  const invalid = ['http://example.test/studio', 'https://www.example.test/studio', 'https://example.test.evil.test/studio', 'https://user:pass@example.test/studio', `${pageUrl}?a=1`, `${pageUrl}?`, `${pageUrl}#part`, `${pageUrl}#`, '//example.test/studio'];
  for (const url of invalid) {
    const mock = harness();
    await assert.rejects(runIndexNow({ config, urls: [url], submit: true, fetchImpl: mock.fetchImpl }));
    assert.equal(mock.calls.length, 0, url);
  }
  const mock = harness();
  await assert.rejects(runIndexNow({ config, urls: Array.from({ length: 10_001 }, (_, i) => `https://example.test/${i}`), fetchImpl: mock.fetchImpl }), /Massimo/);
  assert.equal(mock.calls.length, 0);
});

test('key mismatch, unsupported XML and URL outside sitemap prevent submission', async () => {
  const cases = [
    { keyBody: 'wrong' },
    { sitemap: '<sitemapindex><sitemap/></sitemapindex>' },
    { sitemap: xml([otherUrl]) },
    { sitemap: xml().replace('</url>', '<loc>https://example.test/second</loc></url>') },
    { sitemap: '<!DOCTYPE urlset SYSTEM "http://example.test/x">' + xml() }
  ];
  for (const options of cases) {
    const mock = harness(options);
    await assert.rejects(runIndexNow({ config, urls: [pageUrl], submit: true, fetchImpl: mock.fetchImpl }));
    assert.ok(mock.calls.every((call) => call.method === 'GET'));
  }
});

test('redirect, noindex headers/meta, wrong canonical and non-HTML all block the entire batch', async () => {
  const pages = [
    { status: 308, headers: { location: `${pageUrl}/` } },
    { headers: { 'x-robots-tag': 'bingbot: noindex' } },
    { body: html(pageUrl, '<meta name="robots" content="noindex, follow"/>') },
    { body: html(pageUrl, "<meta content='none' name='Bingbot'>") },
    { body: html(otherUrl) },
    { body: '<html><head></head></html>' },
    { body: html(pageUrl, `<link rel="canonical" href="${pageUrl}">`) },
    { headers: { 'content-type': 'application/json' } }
  ];
  for (const page of pages) {
    const mock = harness({ sitemap: xml([otherUrl, pageUrl]), pages: { [pageUrl]: page } });
    await assert.rejects(runIndexNow({ config, urls: [otherUrl, pageUrl], submit: true, fetchImpl: mock.fetchImpl }));
    assert.ok(mock.calls.every((call) => call.method === 'GET'));
  }
});

test('key or sitemap redirects are not followed and cannot reach POST', async () => {
  for (const target of [keyUrl, sitemapUrl]) {
    const mock = harness();
    const fetchImpl = async (url, options) => url === target
      ? new Response(null, { status: 308, headers: { location: `${url}/` } })
      : mock.fetchImpl(url, options);
    await assert.rejects(runIndexNow({ config, urls: [pageUrl], submit: true, fetchImpl }), /senza redirect/);
    assert.ok(mock.calls.every((call) => call.method === 'GET'));
  }
});

test('endpoint errors including rate limit and redirect fail without automatic retry', async () => {
  for (const status of [400, 403, 422, 429, 500, 308]) {
    const mock = harness({ postStatus: status });
    await assert.rejects(runIndexNow({ config, urls: [pageUrl], submit: true, fetchImpl: mock.fetchImpl }), /nessun retry/);
    assert.equal(mock.calls.filter((call) => call.method === 'POST').length, 1);
  }
});

test('flat Next sitemap alternates work; CLI requires explicit submit and rejects unknown options', () => {
  assert.deepEqual([...parseSitemap(xml().replace('</url>', '<xhtml:link rel="alternate" hreflang="it" href="https://example.test/studio"/></url>'), config.host)], [pageUrl]);
  assert.deepEqual(parseArguments([pageUrl]), { help: false, submit: false, urls: [pageUrl] });
  assert.equal(parseArguments(['--submit', pageUrl]).submit, true);
  assert.throws(() => parseArguments(['--all']), /sconosciuta/);
});
