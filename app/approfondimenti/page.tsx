import Image from "next/image";

import { ArticleGrid, ContactSection, FaqSection } from "@/components/sections";
import { ContactActions } from "@/components/contact-actions";
import { JsonLd } from "@/components/json-ld";
import { articles, articlesArchiveFaqs, siteConfig } from "@/lib/content";
import { breadcrumbSchema, buildMetadata, faqSchema, itemListSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Archivio approfondimenti",
  description:
    "Approfondimenti su successioni, testamenti, legittima, divisione ereditaria, donazioni, mediazione e successioni internazionali.",
  path: "/approfondimenti",
});

export default function ArticlesArchivePage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Homepage", path: "/" },
            { name: "Approfondimenti", path: "/approfondimenti" },
          ]),
          itemListSchema(
            "Archivio approfondimenti successori",
            articles.map((article) => ({
              name: article.title,
              url: `${siteConfig.domain}/approfondimenti/${article.slug}`,
            })),
          ),
          faqSchema(articlesArchiveFaqs),
        ]}
      />
      <section className="section">
        <div className="shell hero-grid">
          <div className="stack">
            <p className="eyebrow">Archivio approfondimenti</p>
            <h1 className="display">Approfondimenti su eredità e successioni</h1>
            <p className="lead">
              Articoli e guide pensati per aiutare a comprendere i nodi più frequenti
              del diritto successorio, con taglio chiaro, tecnico e orientato ai casi
              concreti.
            </p>
            <ContactActions scope="articles_archive_hero" includeEmail={false} compact />
          </div>
          <div className="editorial-figure editorial-figure-standard">
            <Image
              src="/images/dettagli/avvocato-sfoglia-codice-civile.png"
              alt="Consultazione di un codice civile nello studio legale"
              fill
              priority
              sizes="(max-width: 980px) 100vw, 50vw"
              className="editorial-image"
              style={{ objectPosition: "center center" }}
            />
          </div>
        </div>
      </section>
      <ArticleGrid articles={articles} eyebrow="Archivio" title="Tutti gli approfondimenti" />
      <FaqSection title="Domande frequenti sugli approfondimenti" items={articlesArchiveFaqs} />
      <ContactSection
        title="Desideri una valutazione sul tuo caso?"
        intro="Se dopo la lettura vuoi capire come applicare questi temi alla tua situazione concreta, puoi contattare lo studio direttamente da qui."
      />
    </>
  );
}
