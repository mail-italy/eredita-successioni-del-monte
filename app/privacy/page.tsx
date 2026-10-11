import Link from "next/link";

import { FaqSection } from "@/components/sections";
import { JsonLd } from "@/components/json-ld";
import { privacyPageFaqs } from "@/lib/content";
import { buildMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy",
  description:
    "Informativa privacy relativa ai dati raccolti tramite contatti, email, telefono e modulo di richiesta.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Homepage", path: "/" },
            { name: "Privacy", path: "/privacy" },
          ]),
          faqSchema(privacyPageFaqs),
        ]}
      />
      <section className="section">
        <div className="shell stack">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Privacy</span>
          </nav>
          <p className="eyebrow">Privacy</p>
          <h1 className="display-sm">Informativa privacy</h1>
          <div className="card stack">
            <p className="lead">
              I dati personali trasmessi tramite telefono, email, WhatsApp o modulo di
              contatto sono trattati per dare seguito alle richieste,
              valutare il caso esposto e gestire i successivi contatti con l’interessato.
            </p>
            <ul className="list">
              <li>Titolare del trattamento: Avv. Federica Del Monte, Via Costanza Baudana Vaccolini, 5 – 00153 Roma</li>
              <li>Finalità: gestione delle richieste di contatto e delle richieste di assistenza legale</li>
              <li>Base giuridica delle richieste di assistenza: misure precontrattuali richieste dall’interessato, ai sensi dell’art. 6, par. 1, lett. b), del Regolamento (UE) 2016/679</li>
              <li>Dati trattati: dati identificativi, recapiti, contenuti del messaggio e documenti eventualmente allegati</li>
              <li>Conservazione delle richieste senza incarico: 30 giorni dalla conclusione degli scambi relativi alla richiesta, con cancellazione manuale a cura dello Studio</li>
              <li>Diritti: accesso, rettifica, cancellazione, limitazione e opposizione nei limiti previsti dalla normativa applicabile</li>
            </ul>
            <h2>Conservazione e gestione delle richieste</h2>
            <p>Le richieste che non danno luogo a un incarico, la relativa corrispondenza e gli eventuali allegati sono conservati per 30 giorni dalla conclusione degli scambi relativi alla richiesta. Alla scadenza lo Studio provvede alla cancellazione manuale: non è prevista una cancellazione automatica.</p>
            <p>Questa regola non si applica ai dati confluiti in un fascicolo o relativi a un incarico professionale, né alle informazioni da conservare per obblighi di legge o specifiche esigenze documentate di accertamento, esercizio o difesa di un diritto, limitatamente a quanto necessario e per il tempo pertinente a tali esigenze. I trattamenti connessi all’incarico sono illustrati nell’ambito del rapporto professionale.</p>
            <p>Per il primo contatto invia una descrizione essenziale e solo allegati pertinenti. Prima di trasmettere documentazione sanitaria, giudiziaria o particolarmente riservata, concorda con lo Studio le modalità di invio. L’invio del modulo non costituisce accettazione di un incarico e gli allegati restano facoltativi.</p>
            <h2>Servizi tecnici e altri trattamenti</h2>
            <p>Vercel fornisce l’hosting e l’esecuzione del modulo. Le richieste sono trasmesse allo Studio tramite i servizi di posta utilizzati per i suoi recapiti e possono essere consultate dall’Avv. Federica Del Monte e dalle persone autorizzate alla loro gestione. I dati tecnici necessari al funzionamento e alla prevenzione degli abusi sono trattati per proteggere il servizio, sulla base del relativo interesse legittimo; gli obblighi di legge costituiscono una distinta base del trattamento.</p>
            <p>Gli strumenti Google Analytics e Google Ads vengono attivati tramite Google Tag Manager dopo la scelta descritta nella sezione cookie, sulla base del consenso. Vercel e Google utilizzano infrastrutture internazionali e il trattamento può coinvolgere Paesi esterni allo Spazio economico europeo. Puoi chiedere allo Studio informazioni sui destinatari e sulle garanzie applicabili ai tuoi dati. I servizi esterni, incluso WhatsApp, applicano le proprie informative.</p>
            <p className="muted">
              Per esercitare i diritti in materia di protezione dei dati o per ulteriori
              chiarimenti puoi scrivere a {`info@delmontestudiolegale.it`}.
            </p>
            <p>Nei casi previsti dagli artt. 15–22 del Regolamento puoi esercitare anche il diritto alla portabilità e opporti ai trattamenti basati sull’interesse legittimo. Puoi revocare il consenso agli strumenti facoltativi da «Preferenze cookie», senza pregiudicare la liceità dei trattamenti precedenti, e presentare reclamo al <a href="https://www.garanteprivacy.it/i-miei-diritti">Garante per la protezione dei dati personali</a>.</p>
          </div>
        </div>
      </section>
      <section id="cookie" className="section">
        <div className="shell stack">
          <h2 className="display-sm">Cookie e strumenti di misurazione</h2>
          <p>Al primo accesso gli strumenti facoltativi di Google sono disattivati. Puoi accettare, rifiutare o personalizzare la scelta dal pannello e riaprirlo tramite «Preferenze cookie» in fondo a ogni pagina.</p>
          <p>Il sito considera valida la preferenza per 180 giorni. Il dato nella memoria locale può restare fino a una nuova scelta o alla cancellazione dei dati del sito nel browser. Al momento gli strumenti Google si attivano soltanto quando autorizzi entrambe le categorie, statistiche e marketing: se ne scegli una sola restano disattivati. Le statistiche riguardano l’uso delle pagine e dei contatti; il marketing riguarda la misurazione delle campagne e la personalizzazione degli annunci Google. Rifiutare non impedisce di usare i contenuti o il modulo di contatto.</p>
          <p>La mappa Google viene caricata soltanto quando premi «Mostra la mappa Google». I collegamenti a WhatsApp, email e telefono si aprono su tua iniziativa.</p>
        </div>
      </section>
      <FaqSection title="Domande frequenti sulla privacy e sui dati di contatto" items={privacyPageFaqs} />
    </>
  );
}
