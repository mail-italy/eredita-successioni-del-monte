import test from 'node:test';
import assert from 'node:assert/strict';
import { addDays, articleBody, articleHash, decodeHtml, hash, markdownHtml, planNext, romeDate, validateEntry } from './engine.mjs';
const image = Buffer.from('fixture');
const config = {site:'avvocato',origin:'https://avvocatodelmonte.com',pathPrefix:'/approfondimenti/',trailingSlash:false,enabled:true,startDate:'2026-10-12',cadenceDays:2,publishHour:8};
function fixture() {
  const article = { id:'avvocato-001',site:'avvocato',slug:'prova',title:'Prova',seoTitle:'Prova',description:'Descrizione',area:'Civile',bodyMarkdown:'Contenuto completo',status:'approved',legalReview:'approved',image:{status:'generated',alt:'Illustrazione',path:'/images/editorial/avvocato-001.webp',sha256:hash(image)},sources:[{url:'https://www.normattiva.it/',title:'Legge',supports:'Regola',checkedAt:'2026-10-12'}],faqs:[],relatedExistingUrls:['https://avvocatodelmonte.com/cassazione-civile'] };
  return {article,releaseDate:'2026-10-12',approval:{reviewer:'Reviewer test',approvedAt:'2026-10-12',validUntil:'2027-05-31',sha256:articleHash(article)}};
}
const plan = (extra={}) => planNext({config,entries:[fixture()],published:[],today:'2026-10-12',hour:9,pending:null,...extra});
test('paused config never publishes',()=>assert.equal(plan({config:{...config,enabled:false}}).action,'paused'));
test('Rome date honors DST and midnight',()=>{
  assert.equal(romeDate(new Date('2026-10-24T22:30:00Z')),'2026-10-25');
  assert.equal(romeDate(new Date('2026-10-25T22:30:00Z')),'2026-10-25');
  assert.equal(addDays('2026-10-24',2),'2026-10-26');
});
test('future entries cannot publish early',()=>assert.equal(plan({entries:[{...fixture(),releaseDate:'2026-10-14'}]}).action,'wait'));
test('a delayed run never publishes multiple articles',()=>{
  const first=fixture(); const second=structuredClone(first); second.article.id='avvocato-002';second.releaseDate='2026-10-14';
  assert.equal(plan({entries:[second,first],today:'2026-11-12'}).id,'avvocato-001');
});
test('minimum interval applies after delayed actual publication',()=>assert.equal(plan({today:'2026-10-14',published:[{article:{id:'avvocato-099'},publishedDate:'2026-10-13'}]}).action,'wait'));
test('repeat run is idempotent',()=>assert.equal(plan({published:[{...fixture(),publishedDate:'2026-10-12'}]}).action,'wait'));
test('unverified deployment blocks next release',()=>assert.equal(plan({pending:{id:'avvocato-000'}}).action,'verify'));
test('expired review blocks release',()=>{const e=fixture();e.approval.validUntil='2026-10-13';assert.throws(()=>plan({entries:[e],today:'2026-10-14'}),/rinnovare/);});
test('valid approval accepts original bytes only',()=>{
  const e=fixture();assert.equal(validateEntry(e,config,image,'2026-10-12'),e);
  assert.throws(()=>validateEntry(e,config,Buffer.from('changed'),'2026-10-12'),/Immagine/);
  e.article.title='Changed';assert.throws(()=>validateEntry(e,config,image,'2026-10-12'),/Contenuto cambiato/);
});
test('draft, missing reviewer and future approval are rejected',()=>{
  for (const modify of [(e)=>{e.article.status='draft';},(e)=>{e.approval.reviewer='';},(e)=>{e.approval.approvedAt='2026-10-13';}]) {
    const e=fixture();modify(e);assert.throws(()=>validateEntry(e,config,image,'2026-10-12'));
  }
});
test('safe renderer preserves legal source links and never accepts script HTML',()=>{
  const html=markdownHtml('## Titolo\n\n[Norma](https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:2017-03-08;24) **testo**\n\n<script>alert(1)</script>\n\n[bad](javascript:alert)');
  assert.match(html,/<h2>Titolo<\/h2>/);assert.match(html,/<a href="https:\/\/www.normattiva.it/);assert.match(html,/<strong>testo<\/strong>/);assert.ok(!html.includes('<script>'));assert.ok(!html.includes('href="javascript:'));
});

test('live proof tolerates equivalent HTML entities and binds the approved body hash', () => {
  assert.equal(decodeHtml('l&#x27;erede &amp; l&#39;avvocato'), "l'erede & l'avvocato");
  const entry = fixture();
  assert.ok(articleBody(entry.article).includes(articleHash(entry.article)));
  assert.equal(articleBody(entry.article).includes('<script>'), false);
});

test('known future legal change cannot be approved beyond its recheck date', () => {
  const entry = fixture();
  entry.article.reviewValidUntil = '2026-12-31';
  entry.approval.sha256 = articleHash(entry.article);
  assert.throws(() => validateEntry(entry, config, image, '2026-10-12'), /Aggiornamento normativo/);
  entry.approval.validUntil = '2026-12-31';
  assert.equal(validateEntry(entry, config, image, '2026-10-12'), entry);
});
