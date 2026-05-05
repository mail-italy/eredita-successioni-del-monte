import Image from "next/image";
import Link from "next/link";

import { ContactSection, FaqSection } from "@/components/sections";
import { ContactActions } from "@/components/contact-actions";
import { JsonLd } from "@/components/json-ld";
import { PageViewTracker } from "@/components/page-view-tracker";
import { contacts, contactPageFaqs } from "@/lib/content";
import { buildMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contatti",
  description:
    "Contatti dello Studio Legale Del Monte per successioni, eredità, testamenti e divisioni ereditarie.",
  path: "/contatti",
});

export default function ContactsPage() {
  return (
    <>
      <PageViewTracker event="contact_page_view" label="contatti" />
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Homepage", path: "/" },
            { name: "Contatti", path: "/contatti" },
          ]),
          faqSchema(contactPageFaqs),
        ]}
      />
      <section className="section">
        <div className="shell hero-grid">
          <div className="stack">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Contatti</span>
            </nav>
            <p className="eyebrow">Contatti</p>
            <h1 className="display">Contatta lo studio</h1>
            <p className="lead">
              Se hai bisogno di assistenza in materia di successioni, eredità,
              testamenti o divisioni ereditarie, puoi contattare lo studio tramite
              telefono, WhatsApp, Mail o modulo di richiesta.
            </p>
            <ContactActions scope="contacts_hero" compact />
          </div>
          <div className="hero-side-stack">
            <div className="editorial-figure editorial-figure-wide">
              <Image
                src="/images/studio/avvocato-federica-del-monte-consulenza-cliente.png"
                alt="Consulenza nello studio legale Del Monte"
                fill
                priority
                sizes="(max-width: 980px) 100vw, 50vw"
                className="editorial-image"
                style={{ objectPosition: "center 26%" }}
              />
            </div>
            <div className="panel">
              <div className="panel-inner stack">
                <div className="contact-item">
                  <strong>Telefono</strong>
                  <div className="muted">{contacts.phoneDisplay}</div>
                </div>
                <div className="contact-item">
                  <strong>WhatsApp</strong>
                  <div className="muted">Chat diretta con messaggio introduttivo dal sito</div>
                </div>
                <div className="contact-item">
                  <strong>Email</strong>
                  <div className="muted">{contacts.email}</div>
                </div>
                <div className="contact-item">
                  <strong>Indirizzo</strong>
                  <div className="muted">{contacts.address}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ContactSection />
      <section className="section-tight">
        <div className="shell meta-grid">
          <div className="mini-card">
            <h3>Canali disponibili</h3>
            <p>Telefono, WhatsApp, Mail e modulo di contatto con possibilità di allegare documenti.</p>
          </div>
          <div className="mini-card">
            <h3>Orari del telefono</h3>
            <p>Il pulsante Chiama è disponibile dalle 09:00 alle 19:30. WhatsApp e Mail restano sempre attivi.</p>
          </div>
          <div className="mini-card">
            <h3>Sede</h3>
            <p>Studio a Roma, con assistenza su questioni successorie che richiedono coordinamento anche oltre il contesto locale.</p>
          </div>
        </div>
      </section>
      <FaqSection title="Domande frequenti sui contatti dello studio" items={contactPageFaqs} />
    </>
  );
}
