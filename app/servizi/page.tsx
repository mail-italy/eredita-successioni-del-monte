import Image from "next/image";

import { ContactSection, FaqSection, ServiceGrid } from "@/components/sections";
import { ContactActions } from "@/components/contact-actions";
import { JsonLd } from "@/components/json-ld";
import { moneyPages, servicesArchiveFaqs, siteConfig } from "@/lib/content";
import { breadcrumbSchema, buildMetadata, faqSchema, itemListSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Servizi",
  description:
    "Servizi legali in materia di successioni, testamenti, divisioni ereditarie, legittima, donazioni, mediazione ed eredità giacente.",
  path: "/servizi",
});

export default function ServicesArchivePage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Homepage", path: "/" },
            { name: "Servizi", path: "/servizi" },
          ]),
          itemListSchema(
            "Servizi in materia di successioni",
            moneyPages.map((page) => ({
              name: page.title,
              url: `${siteConfig.domain}/${page.slug}`,
            })),
          ),
          faqSchema(servicesArchiveFaqs),
        ]}
      />
      <section className="section">
        <div className="shell hero-grid">
          <div className="stack">
            <p className="eyebrow">Servizi</p>
            <h1 className="display">Servizi legali in materia successoria</h1>
            <p className="lead">
              In questa sezione trovi le principali aree di assistenza dello studio:
              successioni, testamenti, lesione di legittima, divisioni ereditarie,
              donazioni, mediazione, eredità giacente e recupero somme ereditarie.
            </p>
            <ContactActions scope="services_archive_hero" includeEmail={false} compact />
          </div>
          <div className="editorial-figure editorial-figure-standard">
            <Image
              src="/images/dettagli/codici-civile-successioni-ereditarie.png"
              alt="Codici civili e testi sulle successioni ereditarie"
              fill
              priority
              sizes="(max-width: 980px) 100vw, 50vw"
              className="editorial-image"
              style={{ objectPosition: "center center" }}
            />
          </div>
        </div>
      </section>
      <ServiceGrid services={moneyPages} />
      <FaqSection title="Domande frequenti sui servizi dello studio" items={servicesArchiveFaqs} />
      <ContactSection />
    </>
  );
}
