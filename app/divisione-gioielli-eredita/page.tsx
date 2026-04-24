import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { FaqSection } from "@/components/sections";
import { JsonLd } from "@/components/json-ld";
import { contacts } from "@/lib/content";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";

const pageFaqs = [
  {
    question: "I gioielli fanno parte dell’eredità?",
    answer:
      "Sì. Gioielli, preziosi e altri beni mobili di valore possono rientrare nell’asse ereditario e devono essere considerati nella ricostruzione del patrimonio da dividere tra gli eredi.",
  },
  {
    question: "Cosa succede se un erede li trattiene?",
    answer:
      "Se un coerede trattiene i gioielli senza accordo, occorre verificare subito prova dell’esistenza dei beni, disponibilità materiale, valore e titolo del possesso per impostare richiesta di restituzione, imputazione o divisione.",
  },
  {
    question: "Serve una perizia?",
    answer:
      "Spesso sì. Una stima professionale aiuta a stabilire il valore reale dei preziosi, a costruire un accordo più solido tra gli eredi e, se necessario, a sostenere la domanda in giudizio.",
  },
  {
    question: "Come si stabilisce il valore?",
    answer:
      "Il valore si ricostruisce con perizie, documenti di acquisto, fotografie, inventari, polizze assicurative e altri elementi utili a identificare qualità, consistenza e pregio dei beni.",
  },
  {
    question: "Si può fare causa per la divisione?",
    answer:
      "Sì. Se manca un accordo su esistenza, valore o assegnazione dei gioielli, il bene può essere incluso nella divisione giudiziale insieme agli altri cespiti ereditari, con eventuali accertamenti e conguagli.",
  },
];

export const metadata: Metadata = {
  title: "Divisione gioielli eredità: come si dividono tra gli eredi",
  description:
    "Come dividere gioielli e preziosi nell’eredità. Assistenza legale per inventario, stima, accordo tra eredi o divisione giudiziale.",
};

export default function DivisioneGioielliEreditaPage() {
  const legalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "Divisione gioielli eredità",
    description:
      "Assistenza legale per inventario, stima, accordo tra eredi o divisione giudiziale di gioielli e preziosi ereditati.",
    provider: {
      "@type": "Attorney",
      name: "Studio Legale Del Monte",
    },
    areaServed: ["IT", contacts.city],
    address: {
      "@type": "PostalAddress",
      streetAddress: contacts.address,
      addressLocality: contacts.city,
      addressCountry: "IT",
    },
    telephone: contacts.phoneDisplay,
    email: contacts.email,
  };

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Homepage", path: "/" },
            { name: "Divisione gioielli eredità", path: "/divisione-gioielli-eredita" },
          ]),
          faqSchema(pageFaqs),
          legalServiceSchema,
        ]}
      />

      <section className="hero-section">
        <div className="hero-shell">
          <div className="hero-premium">
            <div
              className="hero-media landing-hero-media"
              style={{ minHeight: "min(82vh, 860px)", position: "relative" }}
            >
              <div
                aria-hidden="true"
                className="landing-hero-overlay"
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 1,
                  background:
                    "linear-gradient(90deg, rgba(8, 19, 31, 0.66) 0%, rgba(8, 19, 31, 0.52) 32%, rgba(8, 19, 31, 0.24) 58%, rgba(8, 19, 31, 0.06) 78%, rgba(8, 19, 31, 0) 100%)",
                  pointerEvents: "none",
                }}
              />
              <div className="hero-copy-panel landing-hero-copy-panel">
                <div
                  className="hero-copy-stack landing-hero-copy-stack"
                  style={{
                    maxWidth: "560px",
                    gap: "18px",
                  }}
                >
                  <p className="eyebrow hero-eyebrow-light">
                    Divisione di gioielli e beni di famiglia
                  </p>
                  <h1
                    className="display hero-title hero-title-light"
                    style={{
                      fontSize: "clamp(2.6rem, 4.2vw, 4rem)",
                      lineHeight: 1.05,
                      maxWidth: "12ch",
                    }}
                  >
                    Devi dividere gioielli o beni di famiglia ereditati?
                  </h1>
                  <p
                    className="lead hero-copy hero-copy-light"
                    style={{
                      maxWidth: "54ch",
                      lineHeight: 1.72,
                    }}
                  >
                    Conflitti tra eredi, gioielli trattenuti o dubbi sul valore
                    possono bloccare la successione. Lo Studio interviene per
                    ricostruire i beni, tutelare le quote e individuare una
                    soluzione concreta.
                  </p>
                  <div className="tag-list hero-tags landing-hero-tags" style={{ gap: "10px" }}>
                    <span className="tag hero-tag-light">
                      Un erede trattiene gioielli senza accordo
                    </span>
                    <span className="tag hero-tag-light">
                      Non esiste un inventario chiaro
                    </span>
                    <span className="tag hero-tag-light">
                      Disaccordo sul valore dei preziosi
                    </span>
                  </div>
                  <div className="hero-cta-row landing-hero-cta-row" style={{ maxWidth: "460px" }}>
                    <Link
                      href="/contatti#modulo-contatti"
                      className="button-primary"
                      aria-label="Vai direttamente al form contatti"
                      style={{
                        minWidth: "220px",
                        minHeight: "46px",
                        flex: "1 1 220px",
                      }}
                    >
                      Contatta lo Studio
                    </Link>
                    <Link
                      href={contacts.whatsappHref}
                      className="button-request"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        minWidth: "220px",
                        minHeight: "46px",
                        flex: "1 1 220px",
                      }}
                    >
                      Scrivi su WhatsApp
                    </Link>
                  </div>
                  <p
                    className="muted hero-copy hero-copy-light"
                    style={{ maxWidth: "46ch", lineHeight: 1.65 }}
                  >
                    Puoi iniziare con un messaggio WhatsApp e poi approfondire con
                    documenti e inventario disponibile.
                  </p>
                </div>
              </div>
              <div className="hero-image-layer landing-hero-image-layer">
                <Image
                  src="/images/dettagli/scrivania-legale-penna-occhiali-tazza.png"
                  alt="Gioielli e beni di famiglia da dividere in eredità"
                  width={1600}
                  height={1067}
                  priority
                  sizes="100vw"
                  className="hero-portrait landing-hero-portrait"
                  style={{ objectPosition: "center 56%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Divisione gioielli eredità</span>
          </nav>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell">
          <div className="card stack">
            <p className="eyebrow">Problema</p>
            <h2 className="display-sm">
              Quando i gioielli ereditati diventano un problema
            </h2>
            <p className="lead">
              I beni mobili, come gioielli, preziosi e oggetti di valore, sono una
              causa frequente di conflitto perché spesso non sono tracciati, sono
              difficili da valutare e possono essere facilmente trattenuti da uno dei
              coeredi.
            </p>
            <p className="muted">
              Il nodo non riguarda solo la ripartizione finale. Prima occorre capire
              quali beni esistono davvero, chi li detiene, quale valore abbiano e se
              vi siano stati trasferimenti o donazioni anteriori alla successione.
            </p>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell two-column">
          <div className="card stack">
            <p className="eyebrow">Soluzione</p>
            <h2 className="display-sm">Come si dividono i gioielli nell’eredità</h2>
            <div className="info-list">
              <div className="info-item">
                <strong>Fanno parte dell’asse ereditario</strong>
                <p>
                  Se non risulta un valido trasferimento, i gioielli possono entrare
                  nella massa da dividere tra gli eredi.
                </p>
              </div>
              <div className="info-item">
                <strong>Devono essere inventariati</strong>
                <p>
                  L’inventario serve a identificare con precisione beni, quantità,
                  stato e disponibilità materiale.
                </p>
              </div>
              <div className="info-item">
                <strong>Possono essere stimati da periti</strong>
                <p>
                  La perizia aiuta a misurare il valore reale dei preziosi e a ridurre
                  le contestazioni tra coeredi.
                </p>
              </div>
              <div className="info-item">
                <strong>Possono essere assegnati con conguaglio</strong>
                <p>
                  Un bene può essere attribuito a un erede, con compensazione
                  economica verso gli altri in base alla quota.
                </p>
              </div>
              <div className="info-item">
                <strong>Se manca l’accordo si va in divisione giudiziale</strong>
                <p>
                  In assenza di intesa, i gioielli possono essere ricompresi nella
                  causa di divisione ereditaria.
                </p>
              </div>
            </div>
          </div>

          <div className="card stack">
            <p className="eyebrow">Intervento</p>
            <h2 className="display-sm">Il nostro intervento</h2>
            <div className="info-list">
              <div className="info-item">
                <strong>1. Analisi della situazione ereditaria</strong>
                <p>
                  Verifichiamo titolo successorio, quote, documenti disponibili e
                  profili di rischio legati ai beni mobili contestati.
                </p>
              </div>
              <div className="info-item">
                <strong>2. Ricostruzione beni e valori</strong>
                <p>
                  Organizziamo prova, inventario, stime e disponibilità materiale dei
                  beni per impostare una base tecnica chiara.
                </p>
              </div>
              <div className="info-item">
                <strong>3. Accordo tra eredi o azione giudiziale</strong>
                <p>
                  Assistiamo nella trattativa quando è possibile chiudere bene la
                  questione, oppure prepariamo l’azione necessaria.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell two-column">
          <div className="card stack">
            <p className="eyebrow">Casi reali</p>
            <h2 className="display-sm">Situazioni ricorrenti</h2>
            <div className="info-list">
              <div className="info-item">
                <strong>Gioielli non dichiarati</strong>
                <p>
                  Ricostruzione dell’inventario attraverso documenti, fotografie,
                  testimonianze e riscontri disponibili.
                </p>
              </div>
              <div className="info-item">
                <strong>Disaccordo tra fratelli</strong>
                <p>
                  Impostazione di un accordo con compensazioni e conguagli per evitare
                  una divisione squilibrata.
                </p>
              </div>
              <div className="info-item">
                <strong>Beni trattenuti</strong>
                <p>
                  Attivazione degli strumenti legali utili per ottenere restituzione,
                  imputazione del valore o inclusione nella divisione.
                </p>
              </div>
            </div>
          </div>

          <div className="card stack">
            <p className="eyebrow">Trust</p>
            <h2 className="display-sm">Perché scegliere lo Studio</h2>
            <div className="meta-grid">
              <div className="mini-card">
                <h3>Avvocato cassazionista</h3>
                <p>
                  Assistenza con impostazione tecnica rigorosa nelle controversie
                  ereditarie più delicate.
                </p>
              </div>
              <div className="mini-card">
                <h3>Successioni complesse</h3>
                <p>
                  Esperienza in patrimoni articolati, conflitti tra coeredi e beni
                  difficili da ricostruire.
                </p>
              </div>
              <div className="mini-card">
                <h3>Stragiudiziale e giudiziale</h3>
                <p>
                  Gestione completa del percorso, dall’accordo tra eredi fino alla
                  tutela in giudizio.
                </p>
              </div>
              <div className="mini-card">
                <h3>Roma e operatività nazionale</h3>
                <p>
                  Studio a Roma con assistenza su questioni successorie anche oltre il
                  contesto locale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqSection
        title="Domande frequenti sulla divisione dei gioielli ereditati"
        items={pageFaqs}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .landing-hero-media {
          position: relative;
        }

        .landing-hero-copy-panel {
          width: min(56%, 760px);
          padding: 142px min(5vw, 56px) 40px;
        }

        .landing-hero-copy-stack {
          margin-top: 12px;
        }

        .landing-hero-tags {
          max-width: 44rem;
        }

        .landing-hero-cta-row {
          max-width: 460px;
        }

        @media (max-width: 980px) {
          .landing-hero-copy-panel {
            width: min(58%, 560px);
            padding-top: 124px;
            padding-right: 20px;
            padding-bottom: 28px;
            padding-left: 28px;
          }
        }

        @media (max-width: 760px) {
          .landing-hero-overlay {
            background: linear-gradient(
              180deg,
              rgba(8, 19, 31, 0.1) 0%,
              rgba(8, 19, 31, 0.03) 100%
            ) !important;
          }

          .landing-hero-media {
            min-height: auto !important;
            display: grid;
          }

          .landing-hero-copy-panel {
            order: 1;
            width: auto;
            padding: 22px 18px 18px;
            background: linear-gradient(
              180deg,
              rgba(251, 248, 242, 0.98),
              rgba(247, 243, 236, 0.96)
            );
          }

          .landing-hero-copy-stack {
            max-width: none !important;
            gap: 14px !important;
            margin-top: 0;
          }

          .landing-hero-copy-panel :global(.display) {
            font-size: clamp(1.9rem, 7vw, 2.5rem) !important;
            line-height: 1.06 !important;
            max-width: none !important;
          }

          .landing-hero-copy-panel :global(.lead) {
            line-height: 1.58 !important;
            max-width: none !important;
          }

          .landing-hero-tags {
            display: grid;
            gap: 8px !important;
          }

          .landing-hero-tags :global(.tag:nth-child(4)) {
            display: none;
          }

          .landing-hero-cta-row {
            max-width: none !important;
            display: grid;
            gap: 10px;
          }

          .landing-hero-cta-row :global(a) {
            width: 100%;
            min-width: 0 !important;
          }

          .landing-hero-image-layer {
            order: 2;
            padding: 0 14px 14px;
          }

          .landing-hero-portrait {
            border-radius: 18px;
            aspect-ratio: 16 / 10;
            object-fit: cover;
            object-position: center 58% !important;
          }
        }
      `,
        }}
      />
    </>
  );
}
