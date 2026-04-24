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
              contatto sono trattati esclusivamente per dare seguito alle richieste,
              valutare il caso esposto e gestire i successivi contatti con l’interessato.
            </p>
            <ul className="list">
              <li>Titolare del trattamento: Studio Legale Del Monte</li>
              <li>Finalità: gestione delle richieste di contatto e delle richieste di assistenza legale</li>
              <li>Base giuridica: consenso e misure precontrattuali richieste dall’interessato</li>
              <li>Dati trattati: dati identificativi, recapiti, contenuti del messaggio e documenti eventualmente allegati</li>
              <li>Conservazione: per il tempo necessario a gestire la richiesta e agli adempimenti connessi</li>
              <li>Diritti: accesso, rettifica, cancellazione, limitazione e opposizione nei limiti previsti dalla normativa applicabile</li>
            </ul>
            <p className="muted">
              Per esercitare i diritti in materia di protezione dei dati o per ulteriori
              chiarimenti puoi scrivere a {`info@delmontestudiolegale.it`}.
            </p>
          </div>
        </div>
      </section>
      <FaqSection title="Domande frequenti sulla privacy e sui dati di contatto" items={privacyPageFaqs} />
    </>
  );
}
