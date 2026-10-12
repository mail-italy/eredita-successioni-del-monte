import test from 'node:test';
import assert from 'node:assert/strict';
import { createArticleAttribution, ARTICLE_ATTRIBUTION_TTL_MS } from '../lib/article-attribution.mjs';
function fixture({ consent = true, storageFails = false } = {}) {
  let allowed=consent,time=1000000,marker={ 'data-editorial-id':'avvocato-001','data-editorial-title':'Dopo la Cassazione: giudizio di rinvio','data-editorial-path':'/approfondimenti/rinvio' };
  const data=new Map();
  const win={location:{pathname:'/approfondimenti/rinvio',href:'https://avvocatodelmonte.com/approfondimenti/rinvio?email=private@example.test#secret'},sessionStorage:{getItem:k=>data.get(k)||null,setItem(k,v){if(storageFails)throw Error('blocked');data.set(k,v);},removeItem(k){if(storageFails)throw Error('blocked');data.delete(k);}}};
  const doc={querySelector:()=>marker?{getAttribute:k=>marker[k]}:null};
  const helper=createArticleAttribution({site:'avvocato',origin:'https://avvocatodelmonte.com',contactPaths:['/contatti'],hasAnalyticsConsent:()=>allowed,getWindow:()=>win,getDocument:()=>doc,now:()=>time});
  return {helper,data,win,setConsent:v=>{allowed=v;},setTime:v=>{time=v;},setMarker:v=>{marker=v;},navigate(path){win.location.pathname=path;win.location.href='https://avvocatodelmonte.com'+path;marker=null;}};
}
const wa='https://wa.me/390697615122?text='+encodeURIComponent('Messaggio dal sito: avvocatodelmonte.com\n\nBuongiorno.');
const blank={article_id:'',article_title:'',article_path:''};
test('current approved article contributes only public marker metadata, never query or hash',()=>{
 const f=fixture();assert.deepEqual(f.helper.getEventContext(),{article_id:'avvocato-001',article_title:'Dopo la Cassazione: giudizio di rinvio',article_path:'/approfondimenti/rinvio'});assert.equal(f.data.size,0);
 const text=new URL(f.helper.decorateWhatsAppHref(wa)).searchParams.get('text');assert.match(text,/avvocatodelmonte.com\/approfondimenti\/rinvio/);assert.doesNotMatch(text,/private|email=|secret/);assert.equal(f.helper.decorateWhatsAppHref(f.helper.decorateWhatsAppHref(wa)),f.helper.decorateWhatsAppHref(wa));
});
test('denied consent allows current-page WhatsApp context but never stores an article journey',()=>{
 const f=fixture({consent:false});assert.match(new URL(f.helper.decorateWhatsAppHref(wa)).searchParams.get('text'),/Articolo consultato/);f.helper.rememberContactNavigation('/contatti');assert.equal(f.data.size,0);f.navigate('/contatti');assert.deepEqual(f.helper.getEventContext(),blank);assert.equal(f.helper.decorateWhatsAppHref(wa),wa);
});
test('only an explicit contact navigation creates the consented bridge, contact query is excluded',()=>{
 const f=fixture();f.helper.rememberContactNavigation('/servizi');assert.equal(f.data.size,0);f.helper.rememberContactNavigation('/contatti?name=private#form');assert.equal(f.data.size,1);assert.doesNotMatch([...f.data.values()][0],/private|name=/);f.navigate('/contatti');f.helper.syncPage();assert.equal(f.helper.getEventContext().article_id,'avvocato-001');
});
test('a rewrite during navigation does not erase pending context before the target route mounts',()=>{
 const f=fixture();f.helper.rememberContactNavigation('/contatti');f.setMarker(null);assert.deepEqual(f.helper.getEventContext(),blank);assert.equal(f.data.size,1);f.navigate('/contatti');assert.equal(f.helper.getEventContext().article_id,'avvocato-001');
});
test('bridge expires after 30 minutes and is removed on the next read',()=>{
 const f=fixture();f.helper.rememberContactNavigation('/contatti');f.navigate('/contatti');f.setTime(1000000+ARTICLE_ATTRIBUTION_TTL_MS);assert.deepEqual(f.helper.getEventContext(),blank);assert.equal(f.data.size,0);
});
test('form failure preserves bridge; explicit success clear removes it and resets WhatsApp',()=>{
 const f=fixture();f.helper.rememberContactNavigation('/contatti');f.navigate('/contatti');assert.equal(f.helper.getEventContext().article_id,'avvocato-001');assert.equal(f.helper.getEventContext().article_id,'avvocato-001');f.helper.clear();assert.deepEqual(f.helper.getEventContext(),blank);assert.equal(f.helper.decorateWhatsAppHref(wa),wa);assert.equal(f.data.size,0);
});
test('revocation and navigation away clear attribution; returning cannot restore the prior article',()=>{
 const f=fixture();f.helper.rememberContactNavigation('/contatti');f.navigate('/contatti');f.setConsent(false);f.helper.syncPage();f.setConsent(true);assert.deepEqual(f.helper.getEventContext(),blank);
 const g=fixture();g.helper.rememberContactNavigation('/contatti');g.navigate('/contatti');g.helper.rememberContactNavigation('https://example.org/');g.navigate('/contatti');assert.deepEqual(g.helper.getEventContext(),blank);
 const h=fixture();h.helper.rememberContactNavigation('/contatti');h.navigate('/studio');h.helper.syncPage();h.navigate('/contatti');assert.deepEqual(h.helper.getEventContext(),blank);
});
test('WhatsApp and telephone contact clicks do not destroy the same-page bridge before tracking',()=>{
 const f=fixture();f.helper.rememberContactNavigation('/contatti');f.navigate('/contatti');for(const href of [wa,'tel:+390697615122','mailto:info@delmontestudiolegale.it','#form']){f.helper.rememberContactNavigation(href);assert.equal(f.helper.getEventContext().article_id,'avvocato-001');}
});
test('storage errors fail closed without breaking links or form interactions',()=>{
 const f=fixture({storageFails:true});assert.doesNotThrow(()=>f.helper.rememberContactNavigation('/contatti'));f.navigate('/contatti');assert.deepEqual(f.helper.getEventContext(),blank);assert.doesNotThrow(()=>f.helper.clear());assert.equal(f.helper.decorateWhatsAppHref('tel:+390697615122'),'tel:+390697615122');
});
test('malformed, foreign-site, future and wrong-target persisted contexts are rejected',()=>{
 for(const override of [{version:2},{site:'studio'},{savedAt:99999999},{targetPath:'/other'},{context:{article_id:'studio-001',article_title:'Foreign',article_path:'/evil'}}]){
  const f=fixture();f.helper.rememberContactNavigation('/contatti');const key=[...f.data.keys()][0];f.data.set(key,JSON.stringify({...JSON.parse(f.data.get(key)),...override}));f.navigate('/contatti');assert.deepEqual(f.helper.getEventContext(),blank);
 }
});
test('stale DOM on an SPA route never contributes an article from the prior route',()=>{
 const f=fixture();f.win.location.pathname='/studio';assert.deepEqual(f.helper.getEventContext(),blank);
});
test('long paths remain complete in WhatsApp but are omitted from GA4 custom params, ID retained',()=>{
 const f=fixture(),p='/approfondimenti/'+'a'.repeat(90);f.win.location.pathname=p;f.setMarker({'data-editorial-id':'avvocato-002','data-editorial-title':'Titolo','data-editorial-path':p});assert.equal(f.helper.getEventContext().article_path,'');assert.equal(f.helper.getEventContext().article_id,'avvocato-002');assert.match(new URL(f.helper.decorateWhatsAppHref(wa)).searchParams.get('text'),new RegExp(p));
});
test('foreign recipients and non-WhatsApp URLs are never rewritten',()=>{
 const f=fixture();for(const href of ['https://wa.me/39999999999?text=x','https://example.com/?text=x','javascript:alert(1)','mailto:info@example.com'])assert.equal(f.helper.decorateWhatsAppHref(href),href);
});
