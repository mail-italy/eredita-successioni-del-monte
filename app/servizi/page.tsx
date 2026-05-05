import Link from "next/link";
import Image from "next/image";

import {
  ContactSection,
  FaqSection,
  SpecialInheritanceAssetsSection,
} from "@/components/sections";
import { ContactActions } from "@/components/contact-actions";
import { JsonLd } from "@/components/json-ld";
import {
  getService,
  moneyPages,
  servicesArchiveFaqs,
  siteConfig,
  type ServicePage,
} from "@/lib/content";
import { breadcrumbSchema, buildMetadata, faqSchema, itemListSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Servizi",
  description:
    "Servizi legali in materia di successioni, testamenti, divisioni ereditarie, legittima, donazioni, mediazione ed eredità giacente.",
  path: "/servizi",
});

const serviceCategories = [
  {
    title: "Assistenza principale e casi complessi",
    intro:
      "Pagine di inquadramento per chi deve impostare una strategia complessiva o affronta una successione con più nodi collegati.",
    slugs: ["avvocato-successioni", "successioni-internazionali"],
  },
  {
    title: "Testamento e legittima",
    intro:
      "Validità del testamento, quote riservate, donazioni e questioni che incidono sulla devoluzione ereditaria.",
    slugs: [
      "testamento",
      "impugnazione-testamento",
      "testamento-olografo-falso",
      "lesione-di-legittima",
      "successione-legittima",
      "collazione-e-donazioni",
      "indegnita-successoria",
    ],
  },
  {
    title: "Divisione e conflitti tra coeredi",
    intro:
      "Comunione ereditaria, liti tra eredi, mediazione e gestione dei beni quando l'accordo si blocca.",
    slugs: ["divisione-ereditaria", "conflitti-tra-coeredi", "mediazione-ereditaria"],
  },
  {
    title: "Accettazione, rinuncia e debiti ereditari",
    intro:
      "Scelte iniziali dell'erede, rischio di accettazione tacita, beneficio d'inventario e gestione dell'eredità non ancora accettata.",
    slugs: [
      "accettazione-eredita",
      "beneficio-inventario",
      "rinuncia-eredita",
      "eredita-giacente",
    ],
  },
  {
    title: "Beni ereditari, casa, somme e gioielli",
    intro:
      "Pagine dedicate a denaro, immobili e beni mobili di valore che generano spesso contrasti pratici immediati.",
    slugs: ["recupero-somme-ereditarie", "vendita-casa-ereditata", "gioielli-ereditati"],
  },
  {
    title: "Azioni ereditarie specifiche",
    intro:
      "Tutele mirate quando occorre recuperare beni o definire la posizione di un erede con azioni più specifiche.",
    slugs: ["petizione-ereditaria"],
  },
] satisfies { title: string; intro: string; slugs: string[] }[];

function getCategoryServices(slugs: string[]) {
  return slugs
    .map((slug) => getService(slug))
    .filter((page): page is ServicePage => Boolean(page));
}

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

      <section className="section-tight">
        <div className="shell stack">
          <div className="stack">
            <p className="eyebrow">Catalogo servizi</p>
            <h2 className="display-sm">Aree di assistenza ordinate per tema</h2>
            <p className="lead">
              La pagina raccoglie sia le aree principali dello studio sia le landing
              più specifiche dedicate a testamento, conflitti tra coeredi,
              accettazione, debiti ereditari e beni in successione.
            </p>
          </div>

          {serviceCategories.map((category) => {
            const services = getCategoryServices(category.slugs);

            if (services.length === 0) {
              return null;
            }

            return (
              <div key={category.title} className="card stack">
                <div className="stack">
                  <h3>{category.title}</h3>
                  <p className="muted">{category.intro}</p>
                </div>
                <div className="cards-grid">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/${service.slug}`}
                      prefetch={false}
                      className="card stack clickable-card"
                      data-track-event="cta_click"
                      data-track-label={`services_archive_${service.slug}`}
                    >
                      <h3>{service.title}</h3>
                      <p className="muted">{service.description}</p>
                      <span className="button-ghost card-link-cta">Approfondisci</span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <SpecialInheritanceAssetsSection
        title="Beni particolari in eredità"
        intro="Oltre ai servizi successori principali, alcune pagine affrontano beni specifici che generano conflitti pratici immediati tra gli eredi: immobili, affitti, auto, gioielli, animali domestici e rapporti bancari."
      />
      <FaqSection title="Domande frequenti sui servizi dello studio" items={servicesArchiveFaqs} />
      <ContactSection />
    </>
  );
}
