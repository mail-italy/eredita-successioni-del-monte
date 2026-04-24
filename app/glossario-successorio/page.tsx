import { ContactSection, FaqSection, GlossaryGrid } from "@/components/sections";
import { ContactActions } from "@/components/contact-actions";
import { JsonLd } from "@/components/json-ld";
import { glossaryFaqs, glossaryTerms, siteConfig } from "@/lib/content";
import { breadcrumbSchema, buildMetadata, definedTermSetSchema, faqSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Glossario successorio",
  description:
    "Glossario successorio con termini chiave su eredità, successioni, testamenti, legittima, collazione e accettazione.",
  path: "/glossario-successorio",
});

export default function GlossaryPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Homepage", path: "/" },
            { name: "Glossario successorio", path: "/glossario-successorio" },
          ]),
          definedTermSetSchema(
            "Glossario successorio",
            glossaryTerms.map((term) => ({
              term: term.term,
              description: term.definition,
              url: `${siteConfig.domain}/glossario-successorio#${term.slug}`,
            })),
          ),
          faqSchema(glossaryFaqs),
        ]}
      />
      <section className="section-tight">
        <div className="shell stack">
          <p className="eyebrow">Glossario</p>
          <h2 className="display-sm">Termini da capire prima di agire</h2>
          <p className="lead">
            Il glossario aiuta a leggere meglio i concetti chiave del diritto
            successorio e a collegarli ai temi pratici trattati nel resto del sito.
          </p>
          <ContactActions scope="glossary_hero" includeEmail={false} compact />
        </div>
      </section>
      <GlossaryGrid terms={glossaryTerms} />
      <FaqSection title="Domande frequenti sul glossario successorio" items={glossaryFaqs} />
      <ContactSection
        title="Hai trovato il termine, ora serve la verifica sul caso"
        intro="Il glossario aiuta a orientarsi, ma non sostituisce l’analisi giuridica dei documenti e della situazione concreta."
      />
    </>
  );
}
