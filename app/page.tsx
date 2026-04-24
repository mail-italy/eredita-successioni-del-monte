import {
  ArticleGrid,
  ContactSection,
  FaqSection,
  HeroSection,
  HomeAuthoritySection,
  HomeVideoSection,
  HubGrid,
  ProblemsSection,
  ServiceGrid,
  WorkSection,
} from "@/components/sections";
import { JsonLd } from "@/components/json-ld";
import {
  articles,
  featuredMoneySlugs,
  hubPages,
  mainProblems,
  moneyPages,
  thematicFaqs,
} from "@/lib/content";
import { buildMetadata, faqSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Avvocati per eredità e successioni",
  description:
    "Assistenza legale per successioni, testamenti, divisioni ereditarie, legittima, donazioni, mediazione e successioni internazionali.",
  path: "/",
  keywords: [
    "avvocato successioni",
    "eredità e successioni",
    "divisione ereditaria",
    "impugnazione testamento",
    "quota di legittima",
  ],
});

export default function HomePage() {
  const featuredServices = moneyPages.filter((page) =>
    featuredMoneySlugs.includes(page.slug),
  );
  const featuredArticles = articles.slice(0, 6);

  return (
    <>
      <JsonLd data={faqSchema(thematicFaqs)} />
      <HeroSection />
      <ProblemsSection items={mainProblems} />
      <HomeAuthoritySection />
      <HomeVideoSection />
      <WorkSection />
      <HubGrid hubs={hubPages} />
      <ServiceGrid services={featuredServices} />
      <ArticleGrid
        articles={featuredArticles}
        eyebrow="Approfondimenti"
        title="Articoli e guide utili"
      />
      <FaqSection title="FAQ principali su successioni ed eredità" items={thematicFaqs} />
      <ContactSection />
    </>
  );
}
