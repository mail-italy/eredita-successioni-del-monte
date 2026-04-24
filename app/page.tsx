import Image from "next/image";
import Link from "next/link";

import {
  ArticleGrid,
  ContactSection,
  FaqSection,
  HomeAuthoritySection,
  HomeVideoSection,
  HubGrid,
  ServiceGrid,
} from "@/components/sections";
import { JsonLd } from "@/components/json-ld";
import {
  articles,
  contacts,
  featuredMoneySlugs,
  hubPages,
  moneyPages,
  thematicFaqs,
} from "@/lib/content";
import { buildMetadata, faqSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Avvocato successioni a Roma",
  description:
    "Avvocato successioni a Roma per eredità bloccate, testamenti contestati, divisioni ereditarie, legittima, donazioni e conflitti tra eredi.",
  path: "/",
  keywords: [
    "avvocato successioni Roma",
    "eredità bloccata",
    "divisione ereditaria",
    "impugnazione testamento",
    "quota di legittima",
  ],
});

const homepageFaqs = thematicFaqs.slice(0, 5);

const conversionProblems = [
  "Eredità bloccata tra coeredi",
  "Divisione ereditaria ferma da anni",
  "Testamento contestato o dubbio",
  "Mancato rispetto della quota di legittima",
  "Beni non dichiarati o sottratti",
];

const serviceLinks = [
  {
    title: "Divisione ereditaria",
    href: "/divisione-ereditaria",
    text: "Per sciogliere la comunione ereditaria, gestire immobili, denaro e beni indivisi.",
  },
  {
    title: "Impugnazione testamento",
    href: "/impugnazione-testamento",
    text: "Per verificare se esistono vizi, prove concrete e una reale azione praticabile.",
  },
  {
    title: "Quote di legittima",
    href: "/lesione-di-legittima",
    text: "Per controllare se coniuge, figli o altri legittimari sono stati lesi nella successione.",
  },
  {
    title: "Donazioni e collazione",
    href: "/donazioni",
    text: "Per capire come incidono liberalità pregresse e beni trasferiti prima della morte.",
  },
  {
    title: "Divisione gioielli e beni di famiglia",
    href: "/divisione-gioielli-eredita",
    text: "Per ricostruire inventario, valore e attribuzione di gioielli, preziosi e beni mobili.",
  },
];

export default function HomePage() {
  const featuredServices = moneyPages.filter((page) =>
    featuredMoneySlugs.includes(page.slug),
  );
  const featuredArticles = articles.slice(0, 6);

  return (
    <>
      <JsonLd data={faqSchema(homepageFaqs)} />

      <section className="hero-section">
        <div className="hero-shell homepage-hero-shell">
          <div className="homepage-hero">
            <Image
              src="/images/hero-successioni-del-monte.webp"
              alt="Avvocato per successioni ed eredità a Roma"
              fill
              priority
              sizes="(max-width: 760px) 100vw, 1380px"
              className="homepage-hero-image"
            />
            <div className="homepage-hero-overlay" aria-hidden="true" />
            <div className="homepage-hero-content">
              <div className="homepage-hero-copy">
                <p className="eyebrow homepage-hero-eyebrow">Successioni ed eredità</p>
                <h1 className="display homepage-hero-title">Avvocato successioni a Roma</h1>
                <p className="lead homepage-hero-lead">
                  Eredità bloccata, testamento contestato o conflitti tra eredi?
                  Analizziamo il caso e individuiamo la strategia più efficace.
                </p>
                <div className="homepage-hero-actions">
                  <Link href="/contatti#modulo-contatti" className="button-primary homepage-cta">
                    Contatta lo Studio
                  </Link>
                  <Link
                    href={contacts.whatsappHref}
                    className="button-request homepage-cta"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Scrivi su WhatsApp
                  </Link>
                </div>
                <p className="homepage-hero-note">
                  Risposta rapida - Primo inquadramento del caso
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell">
          <div className="card stack">
            <p className="eyebrow">Problemi reali</p>
            <h2 className="display-sm">Ti trovi in una di queste situazioni?</h2>
            <ul className="list">
              {conversionProblems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="lead">
              Queste situazioni richiedono un intervento legale tempestivo.
            </p>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell stack">
          <div className="stack">
            <p className="eyebrow">Servizi</p>
            <h2 className="display-sm">Assistenza legale nelle successioni</h2>
            <p className="lead">Ogni situazione richiede una strategia mirata.</p>
          </div>
          <div className="meta-grid">
            {serviceLinks.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="mini-card clickable-card"
                data-track-event="service_click"
                data-track-label={`home_primary_${service.href.replace("/", "")}`}
              >
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <span className="button-ghost card-link-cta">Approfondisci</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell two-column">
          <div className="card stack">
            <p className="eyebrow">Metodo</p>
            <h2 className="display-sm">Come lavoriamo</h2>
            <div className="info-list">
              <div className="info-item">
                <strong>1. Analisi del caso</strong>
                <p>
                  Ricostruiamo fatti, documenti, beni e rapporti tra gli eredi per
                  capire con precisione il quadro successorio.
                </p>
              </div>
              <div className="info-item">
                <strong>2. Definizione strategia</strong>
                <p>
                  Valutiamo rischi, prove, margini di accordo e sostenibilità del
                  percorso più utile.
                </p>
              </div>
              <div className="info-item">
                <strong>3. Intervento</strong>
                <p>
                  Assistiamo nella trattativa, in mediazione o in giudizio quando
                  serve una tutela più incisiva.
                </p>
              </div>
            </div>
            <p className="muted">
              Valutiamo prima le soluzioni più rapide, intervenendo in giudizio quando
              necessario.
            </p>
          </div>

          <div className="card stack">
            <p className="eyebrow">Approccio</p>
            <h2 className="display-sm">Prima verifica tecnica, poi scelta del percorso</h2>
            <p className="lead">
              Nelle successioni il problema non è solo il conflitto tra familiari, ma
              la corretta lettura di quote, donazioni, testamento, beni e prove.
            </p>
            <p className="muted">
              Quando l’accordo è realistico, lo perseguiamo con metodo. Quando non
              tutela davvero il cliente, prepariamo il contenzioso su una base
              documentale ordinata.
            </p>
            <div className="cluster homepage-inline-cta">
              <Link href="/contatti#modulo-contatti" className="button-primary">
                Contatta ora
              </Link>
              <Link
                href={contacts.whatsappHref}
                className="button-request"
                target="_blank"
                rel="noopener noreferrer"
              >
                Scrivi su WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </section>

      <HomeAuthoritySection />
      <HomeVideoSection />
      <HubGrid hubs={hubPages} />
      <ServiceGrid services={featuredServices} />
      <ArticleGrid
        articles={featuredArticles}
        eyebrow="Approfondimenti"
        title="Guide e contenuti utili sulle successioni"
      />
      <FaqSection title="Domande frequenti su successioni ed eredità" items={homepageFaqs} />
      <ContactSection
        title="Serve assistenza per una successione?"
        intro="Un’analisi tempestiva consente di evitare errori e contenziosi. Puoi usare il modulo oppure i contatti diretti dello Studio per un primo inquadramento del caso."
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .homepage-hero {
              position: relative;
              min-height: clamp(580px, 78vh, 840px);
              border-radius: 34px;
              overflow: hidden;
              border: 1px solid rgba(48, 65, 85, 0.12);
              box-shadow: 0 34px 88px rgba(15, 32, 49, 0.14);
              background: #ddd4c8;
            }

            .homepage-hero-image {
              object-fit: cover;
              object-position: center 25%;
              transform: scale(1);
              filter: saturate(0.96) contrast(1.02);
            }

            .homepage-hero-overlay {
              position: absolute;
              inset: 0;
              z-index: 1;
              background:
                linear-gradient(
                  90deg,
                  rgba(8, 19, 31, 0.64) 0%,
                  rgba(8, 19, 31, 0.52) 28%,
                  rgba(8, 19, 31, 0.24) 56%,
                  rgba(8, 19, 31, 0.08) 76%,
                  rgba(8, 19, 31, 0) 100%
                );
            }

            .homepage-hero-content {
              position: relative;
              z-index: 2;
              display: flex;
              align-items: center;
              min-height: inherit;
              width: min(calc(100% - 28px), 1440px);
              margin: 0 auto;
              padding: 134px 0 44px;
            }

            .homepage-hero-copy {
              max-width: 590px;
              display: grid;
              gap: 18px;
            }

            .homepage-hero-eyebrow {
              color: rgba(247, 244, 239, 0.92);
            }

            .homepage-hero-title {
              color: #f7f4ef;
              max-width: 11ch;
              font-size: clamp(2.6rem, 4.5vw, 4.3rem);
              line-height: 1.02;
            }

            .homepage-hero-lead {
              color: rgba(247, 244, 239, 0.9);
              max-width: 54ch;
              line-height: 1.7;
            }

            .homepage-hero-actions {
              display: flex;
              flex-wrap: wrap;
              gap: 10px;
              align-items: center;
              max-width: 470px;
            }

            .homepage-cta {
              min-height: 50px !important;
              min-width: 210px;
              padding: 0 18px !important;
              flex: 1 1 210px;
            }

            .homepage-hero-note {
              margin: 0;
              color: rgba(247, 244, 239, 0.88);
              font-size: 0.95rem;
              line-height: 1.6;
            }

            .homepage-inline-cta {
              align-items: stretch;
            }

            .homepage-inline-cta > a {
              min-height: 50px;
              min-width: 210px;
            }

            .homepage-hero-shell {
              width: min(calc(100% - 8px), 100vw);
            }

            @media (max-width: 980px) {
              .homepage-hero-shell {
                width: min(calc(100% - 32px), 1380px);
              }

              .homepage-hero {
                min-height: 660px;
              }

              .homepage-hero-content {
                width: min(calc(100% - 36px), 920px);
                padding-top: 118px;
                padding-bottom: 30px;
              }

              .homepage-hero-copy {
                max-width: 500px;
              }
            }

            @media (max-width: 760px) {
              .homepage-hero {
                min-height: 560px;
                border-radius: 24px;
              }

              .homepage-hero-image {
                object-position: center 28%;
                transform: none;
              }

              .homepage-hero-overlay {
                background:
                  linear-gradient(
                    180deg,
                    rgba(8, 19, 31, 0.42) 0%,
                    rgba(8, 19, 31, 0.28) 28%,
                    rgba(8, 19, 31, 0.12) 58%,
                    rgba(8, 19, 31, 0.08) 100%
                  );
              }

              .homepage-hero-content {
                width: min(calc(100% - 24px), 720px);
                padding: 96px 0 24px;
                align-items: flex-start;
              }

              .homepage-hero-copy {
                max-width: none;
                gap: 14px;
              }

              .homepage-hero-title {
                max-width: 100%;
                font-size: clamp(2rem, 8vw, 2.9rem);
                line-height: 1.05;
              }

              .homepage-hero-lead,
              .homepage-hero-note {
                max-width: none;
              }

              .homepage-hero-actions,
              .homepage-inline-cta {
                display: grid;
                gap: 10px;
                max-width: none;
              }

              .homepage-cta,
              .homepage-inline-cta > a {
                width: 100%;
                min-width: 0;
              }
            }
          `,
        }}
      />
    </>
  );
}
