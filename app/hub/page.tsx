import Image from "next/image";

import { ContactSection, FaqSection, HubGrid } from "@/components/sections";
import { ContactActions } from "@/components/contact-actions";
import { JsonLd } from "@/components/json-ld";
import { hubArchiveFaqs, hubPages, siteConfig } from "@/lib/content";
import { breadcrumbSchema, buildMetadata, faqSchema, itemListSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Aree di approfondimento",
  description:
    "Aree di approfondimento su testamento, legittima, divisione ereditaria, donazioni, successione legittima, successioni internazionali e conflitti tra coeredi.",
  path: "/hub",
});

export default function HubArchivePage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Homepage", path: "/" },
            { name: "Aree di approfondimento", path: "/hub" },
          ]),
          itemListSchema(
            "Aree di approfondimento sul diritto successorio",
            hubPages.map((page) => ({
              name: page.title,
              url: `${siteConfig.domain}/hub/${page.slug}`,
            })),
          ),
          faqSchema(hubArchiveFaqs),
        ]}
      />
      <section className="section">
        <div className="shell hero-grid">
          <div className="stack">
            <p className="eyebrow">Aree di approfondimento</p>
            <h1 className="display">Temi principali del diritto ereditario</h1>
            <p className="lead">
              Una raccolta ordinata dei temi che ricorrono più spesso nelle pratiche
              successorie: testamenti, legittima, divisioni, donazioni, successione
              legittima, profili internazionali e conflitti tra coeredi.
            </p>
            <ContactActions scope="hub_archive_hero" includeEmail={false} compact />
          </div>
          <div className="editorial-figure editorial-figure-wide">
            <Image
              src="/images/home/eredita-successioni-hero-testamento-codici.png"
              alt="Dettaglio editoriale di studio legale con testamento e codici"
              fill
              priority
              sizes="(max-width: 980px) 100vw, 50vw"
              className="editorial-image"
              style={{ objectPosition: "center 34%" }}
            />
          </div>
        </div>
      </section>
      <HubGrid hubs={hubPages} />
      <FaqSection title="Domande frequenti sulle aree di approfondimento" items={hubArchiveFaqs} />
      <ContactSection />
    </>
  );
}
