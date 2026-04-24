import { ContactSection, FaqSection } from "@/components/sections";
import { ContactActions } from "@/components/contact-actions";
import { JsonLd } from "@/components/json-ld";
import { thematicFaqs } from "@/lib/content";
import { breadcrumbSchema, buildMetadata, faqSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "FAQ tematiche",
  description:
    "FAQ su successioni, testamenti, divisione ereditaria, legittima, donazioni, mediazione e successioni internazionali.",
  path: "/faq-tematiche",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Homepage", path: "/" },
            { name: "FAQ tematiche", path: "/faq-tematiche" },
          ]),
          faqSchema(thematicFaqs),
        ]}
      />
      <section className="section-tight">
        <div className="shell meta-grid">
          <div className="mini-card">
            <h3>Dubbi ricorrenti</h3>
            <p>Risposte alle domande che emergono più spesso nelle successioni, nei testamenti e nelle divisioni ereditarie.</p>
          </div>
          <div className="mini-card">
            <h3>Risposte chiare</h3>
            <p>Spiegazioni sintetiche per orientarsi prima di approfondire con un articolo o con un contatto diretto.</p>
          </div>
          <div className="mini-card">
            <h3>Assistenza</h3>
            <p>Quando la domanda riguarda un caso concreto, puoi passare direttamente al modulo o ai recapiti dello studio.</p>
            <ContactActions scope="faq_page_top" includeEmail={false} compact />
          </div>
        </div>
      </section>
      <FaqSection
        title="FAQ tematiche sul diritto successorio"
        items={thematicFaqs}
      />
      <ContactSection />
    </>
  );
}
