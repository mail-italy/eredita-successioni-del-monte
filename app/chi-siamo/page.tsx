import Image from "next/image";
import Link from "next/link";

import { ContactSection, FaqSection } from "@/components/sections";
import { ContactActions } from "@/components/contact-actions";
import { JsonLd } from "@/components/json-ld";
import { aboutPage, aboutPageFaqs } from "@/lib/content";
import { buildMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Chi siamo",
  description:
    "Esperienza ultraventennale dello Studio Legale Del Monte in successioni, eredità, testamenti e divisioni ereditarie.",
  path: "/chi-siamo",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Homepage", path: "/" },
            { name: "Chi siamo", path: "/chi-siamo" },
          ]),
          faqSchema(aboutPageFaqs),
        ]}
      />
      <section className="section">
        <div className="shell hero-grid">
          <div className="stack">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Chi siamo</span>
            </nav>
            <p className="eyebrow">Chi siamo</p>
            <h1 className="display">Esperienza, rigore tecnico e attenzione al caso concreto</h1>
            <p className="lead">{aboutPage.intro}</p>
            <ContactActions scope="about_hero" includeEmail={false} compact />
          </div>
          <div className="editorial-figure editorial-figure-wide">
            <Image
              src="/images/studio/avvocato-federica-del-monte-ritratto-scrivania.png"
              alt="Avvocato Federica Del Monte nel proprio studio"
              fill
              priority
              sizes="(max-width: 980px) 100vw, 50vw"
              className="editorial-image"
              style={{ objectPosition: "center 24%" }}
            />
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell three-column">
          {aboutPage.highlights.map((item) => (
            <div key={item} className="card">
              <h3>{item}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="section-tight">
        <div className="shell meta-grid">
          <div className="mini-card">
            <h3>Esperienza</h3>
            <p>Attività continuativa nelle successioni, nei testamenti e nei conflitti tra coeredi.</p>
          </div>
          <div className="mini-card">
            <h3>Focus professionale</h3>
            <p>Successioni, testamenti, legittima, divisioni ereditarie, patrimoni complessi e profili internazionali.</p>
          </div>
          <div className="mini-card">
            <h3>Approccio</h3>
            <p>Metodo orientato a chiarezza, prova, tutela della posizione del cliente e ricerca di soluzioni efficaci.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell two-column">
          {aboutPage.narrative.map((paragraph) => (
            <div key={paragraph} className="card">
              <p className="lead">{paragraph}</p>
            </div>
          ))}
        </div>
      </section>

      <FaqSection title="Domande ricorrenti sullo studio" items={aboutPageFaqs} />
      <ContactSection
        title="Contatta lo studio"
        intro="Se vuoi capire come impostare una successione, una divisione o un contenzioso ereditario, qui trovi i riferimenti dello Studio Legale Del Monte in un unico blocco ordinato."
      />
    </>
  );
}
