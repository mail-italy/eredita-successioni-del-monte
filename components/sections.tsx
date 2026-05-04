import Link from "next/link";
import Image from "next/image";

import {
  ArticleEntry,
  contacts,
  FaqItem,
  GlossaryTerm,
  HubPage,
  mainProblems,
  ServicePage,
  trustSignals,
  workSteps,
  getArticle,
  getArticleEntities,
  getArticleQuestions,
  getHub,
  getHubEntities,
  getService,
} from "@/lib/content";
import { ContactActions, ContactAvailabilityNote } from "@/components/contact-actions";
import { DeferredContactForm } from "@/components/deferred-contact-form";
import { DeferredLazyVideoPlayer } from "@/components/deferred-video-player";
import { OfficeMap } from "@/components/office-map";

function TrackLink({
  href,
  children,
  event = "cta_click",
  label,
  className = "button-primary",
}: {
  href: string;
  children: React.ReactNode;
  event?: string;
  label: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      className={className}
      data-track-event={event}
      data-track-label={label}
    >
      {children}
    </Link>
  );
}

const topicLinks: Record<string, string> = {
  "testamenti": "/hub/testamento",
  "testamento": "/hub/testamento",
  "divisioni ereditarie": "/divisione-ereditaria",
  "divisione ereditaria": "/divisione-ereditaria",
  "lesione di legittima": "/lesione-di-legittima",
  "legittima": "/hub/legittima",
  "donazioni": "/hub/donazioni",
  "collazione e donazioni": "/collazione-e-donazioni",
  "successioni internazionali": "/successioni-internazionali",
  "successione legittima": "/hub/successione-legittima",
  "conflitti tra coeredi": "/hub/conflitti-tra-coeredi",
  "impugnazione testamento": "/impugnazione-testamento",
  "impugnazione del testamento": "/impugnazione-testamento",
  "mediazione ereditaria": "/mediazione-ereditaria",
  "eredità giacente": "/eredita-giacente",
  "rinuncia eredità": "/rinuncia-eredita",
  "rinuncia all’eredità": "/rinuncia-eredita",
  "recupero somme ereditarie": "/recupero-somme-ereditarie",
  "conti correnti e somme del de cuius": "/recupero-somme-ereditarie",
};

function getTopicHref(label: string) {
  const normalized = label.toLowerCase().replace(/\s+/g, " ").trim();
  const direct = topicLinks[normalized];

  if (direct) {
    return direct;
  }

  if (normalized.includes("testamento")) return "/impugnazione-testamento";
  if (normalized.includes("division")) return "/divisione-ereditaria";
  if (normalized.includes("legittima")) return "/lesione-di-legittima";
  if (normalized.includes("donazion")) return "/collazione-e-donazioni";
  if (normalized.includes("internazional")) return "/successioni-internazionali";
  if (normalized.includes("mediazione")) return "/mediazione-ereditaria";
  if (normalized.includes("giacente")) return "/eredita-giacente";
  if (normalized.includes("rinuncia")) return "/rinuncia-eredita";
  if (normalized.includes("somme") || normalized.includes("conti correnti")) {
    return "/recupero-somme-ereditarie";
  }

  return null;
}

function TopicListItem({
  item,
  label,
}: {
  item: string;
  label: string;
}) {
  const href = getTopicHref(item);

  return (
    <li>
      {href ? (
        <TrackLink href={href} label={label} className="inline-link">
          {item}
        </TrackLink>
      ) : (
        item
      )}
    </li>
  );
}

type VisualAsset = {
  src: string;
  alt: string;
  objectPosition?: string;
  figureClassName?: string;
  priority?: boolean;
  sizes?: string;
};

function EditorialFigure({
  asset,
  className = "",
}: {
  asset: VisualAsset;
  className?: string;
}) {
  return (
    <div className={["editorial-figure", asset.figureClassName ?? "editorial-figure-wide", className].filter(Boolean).join(" ")}>
      <Image
        src={asset.src}
        alt={asset.alt}
        fill
        priority={asset.priority}
        loading={asset.priority ? "eager" : "lazy"}
        sizes={asset.sizes ?? "(max-width: 980px) 100vw, 50vw"}
        className="editorial-image"
        style={{ objectPosition: asset.objectPosition ?? "center center" }}
      />
    </div>
  );
}

function getServiceVisual(service: ServicePage, priority = false): VisualAsset {
  const base = {
    priority,
    sizes: "(max-width: 980px) 100vw, 46vw",
  };

  switch (service.slug) {
    case "avvocato-successioni":
      return {
        ...base,
        src: "/images/studio/avvocato-federica-del-monte-ritratto-ufficio.png",
        alt: "Ritratto professionale dell'avvocato Federica Del Monte in studio",
        objectPosition: "center 24%",
        figureClassName: "editorial-figure-wide",
      };
    case "impugnazione-testamento":
      return {
        ...base,
        src: "/images/dettagli/testamento-penna-ceralacca.png",
        alt: "Documento testamentario con penna e sigillo",
        objectPosition: "center center",
        figureClassName: "editorial-figure-standard",
      };
    case "divisione-ereditaria":
      return {
        ...base,
        src: "/images/dettagli/avvocato-firma-documento.png",
        alt: "Firma di un documento legale in studio",
        objectPosition: "center center",
        figureClassName: "editorial-figure-standard",
      };
    case "lesione-di-legittima":
      return {
        ...base,
        src: "/images/dettagli/codici-civile-successioni-ereditarie.png",
        alt: "Codici civili e volumi sulle successioni ereditarie",
        objectPosition: "center center",
        figureClassName: "editorial-figure-standard",
      };
    case "collazione-e-donazioni":
      return {
        ...base,
        src: "/images/dettagli/avvocato-sfoglia-codice-civile.png",
        alt: "Consultazione di un codice civile in studio legale",
        objectPosition: "center center",
        figureClassName: "editorial-figure-standard",
      };
    case "animali-domestici-eredita":
      return {
        ...base,
        src: "/images/generated/animali-domestici-eredita-desktop.webp",
        alt: "Animale domestico di famiglia in un contesto ereditario",
        objectPosition: "center center",
        figureClassName: "editorial-figure-wide",
      };
    case "auto-ereditata":
      return {
        ...base,
        src: "/images/generated/auto-ereditata-desktop.webp",
        alt: "Auto da gestire tra coeredi nell'ambito di una successione",
        objectPosition: "center center",
        figureClassName: "editorial-figure-wide",
      };
    case "casa-ereditata":
      return {
        ...base,
        src: "/images/generated/casa-ereditata-desktop.webp",
        alt: "Casa ereditata da dividere tra coeredi",
        objectPosition: "center center",
        figureClassName: "editorial-figure-wide",
      };
    case "affitti-immobili-ereditati":
      return {
        ...base,
        src: "/images/generated/affitti-immobili-ereditati-desktop.webp",
        alt: "Gestione degli affitti di un immobile ereditato",
        objectPosition: "center center",
        figureClassName: "editorial-figure-wide",
      };
    case "conti-correnti-azioni-polizze-eredita":
      return {
        ...base,
        src: "/images/generated/conti-correnti-azioni-polizze-eredita-desktop.webp",
        alt: "Documenti bancari e investimenti da dividere in successione",
        objectPosition: "center center",
        figureClassName: "editorial-figure-wide",
      };
    case "successioni-internazionali":
      return {
        ...base,
        src: "/images/dettagli/libreria-legale-globo.png",
        alt: "Globo e volumi giuridici per successioni con elementi internazionali",
        objectPosition: "center center",
        figureClassName: "editorial-figure-standard",
      };
    case "mediazione-ereditaria":
      return {
        ...base,
        src: "/images/studio/avvocato-federica-del-monte-consulenza-cliente.png",
        alt: "Consulenza legale con cliente nello studio",
        objectPosition: "center 26%",
        figureClassName: "editorial-figure-wide",
      };
    case "eredita-giacente":
      return {
        ...base,
        src: "/images/dettagli/studio-legale-scrivania-penna-occhiali.png",
        alt: "Scrivania legale con penna, documento e occhiali",
        objectPosition: "center center",
        figureClassName: "editorial-figure-standard",
      };
    case "rinuncia-eredita":
      return {
        ...base,
        src: "/images/dettagli/scrivania-legale-penna-occhiali-tazza.png",
        alt: "Scrivania dello studio con penna, documento, occhiali e tazza",
        objectPosition: "center center",
        figureClassName: "editorial-figure-standard",
      };
    case "recupero-somme-ereditarie":
      return {
        ...base,
        src: "/images/studio/avvocato-federica-del-monte-ritratto-libreria.png",
        alt: "Ritratto dell'avvocato nello studio davanti alla libreria legale",
        objectPosition: "center 18%",
        figureClassName: "editorial-figure-standard",
      };
    default:
      return {
        ...base,
        src: "/images/studio/avvocato-federica-del-monte-ritratto-scrivania.png",
        alt: "Ritratto istituzionale dell'avvocato in studio",
        objectPosition: "center 24%",
        figureClassName: "editorial-figure-wide",
      };
  }
}

function getHubVisual(hub: HubPage, priority = false): VisualAsset {
  const base = {
    priority,
    sizes: "(max-width: 980px) 100vw, 46vw",
  };

  switch (hub.slug) {
    case "testamento":
      return {
        ...base,
        src: "/images/dettagli/testamento-penna-ceralacca.png",
        alt: "Testamento con penna e sigillo",
        figureClassName: "editorial-figure-standard",
      };
    case "legittima":
      return {
        ...base,
        src: "/images/dettagli/codici-civile-successioni-ereditarie.png",
        alt: "Codici civili e testi sulle successioni ereditarie",
        figureClassName: "editorial-figure-standard",
      };
    case "divisione-ereditaria":
      return {
        ...base,
        src: "/images/dettagli/avvocato-firma-documento.png",
        alt: "Preparazione e firma di documento legale",
        figureClassName: "editorial-figure-standard",
      };
    case "donazioni":
      return {
        ...base,
        src: "/images/dettagli/avvocato-sfoglia-codice-civile.png",
        alt: "Consultazione di un volume giuridico in studio",
        figureClassName: "editorial-figure-standard",
      };
    case "successione-legittima":
      return {
        ...base,
        src: "/images/dettagli/codici-civile-successioni-ereditarie.png",
        alt: "Volumi giuridici su diritto civile e successioni",
        figureClassName: "editorial-figure-standard",
      };
    case "successioni-internazionali":
      return {
        ...base,
        src: "/images/dettagli/libreria-legale-globo.png",
        alt: "Globo e libreria legale per pratiche con elementi esteri",
        figureClassName: "editorial-figure-standard",
      };
    case "conflitti-tra-coeredi":
      return {
        ...base,
        src: "/images/studio/avvocato-federica-del-monte-consulenza-cliente.png",
        alt: "Colloquio legale in studio su una questione ereditaria",
        objectPosition: "center 26%",
        figureClassName: "editorial-figure-wide",
      };
    default:
      return {
        ...base,
        src: "/images/studio/avvocato-federica-del-monte-ritratto-libreria.png",
        alt: "Ritratto istituzionale in studio legale",
        objectPosition: "center 18%",
        figureClassName: "editorial-figure-standard",
      };
  }
}

function getArticleVisual(article: ArticleEntry, priority = false): VisualAsset {
  const base = {
    priority,
    sizes: "(max-width: 980px) 100vw, 46vw",
  };

  if (article.slug.includes("testamento")) {
    return {
      ...base,
      src: "/images/dettagli/testamento-penna-ceralacca.png",
      alt: "Testamento con penna e sigillo",
      figureClassName: "editorial-figure-standard",
    };
  }

  if (article.slug.includes("successioni-internazionali")) {
    return {
      ...base,
      src: "/images/dettagli/libreria-legale-globo.png",
      alt: "Dettaglio di libreria legale con globo",
      figureClassName: "editorial-figure-standard",
    };
  }

  if (article.slug.includes("mediazione")) {
    return {
      ...base,
      src: "/images/studio/avvocato-federica-del-monte-consulenza-cliente.png",
      alt: "Consulenza in studio su pratica ereditaria",
      objectPosition: "center 26%",
      figureClassName: "editorial-figure-wide",
    };
  }

  if (
    article.slug.includes("legittima") ||
    article.slug.includes("successione-legittima")
  ) {
    return {
      ...base,
      src: "/images/dettagli/codici-civile-successioni-ereditarie.png",
      alt: "Volumi giuridici su diritto civile e successioni",
      figureClassName: "editorial-figure-standard",
    };
  }

  if (article.slug.includes("conti-correnti")) {
    return {
      ...base,
      src: "/images/dettagli/studio-legale-scrivania-penna-occhiali.png",
      alt: "Scrivania di studio con documento, penna e occhiali",
      figureClassName: "editorial-figure-standard",
    };
  }

  if (article.slug.includes("rinuncia") || article.slug.includes("giacente")) {
    return {
      ...base,
      src: "/images/dettagli/scrivania-legale-penna-occhiali-tazza.png",
      alt: "Dettaglio di scrivania legale con documenti e penna",
      figureClassName: "editorial-figure-standard",
    };
  }

  if (article.slug.includes("divisione")) {
    return {
      ...base,
      src: "/images/dettagli/avvocato-firma-documento.png",
      alt: "Firma di documento in contesto legale",
      figureClassName: "editorial-figure-standard",
    };
  }

  return {
    ...base,
    src: "/images/dettagli/avvocato-sfoglia-codice-civile.png",
    alt: "Consultazione di un codice civile in studio",
    figureClassName: "editorial-figure-standard",
  };
}

export function HeroSection() {
  const thematicTags = [
    "Testamenti",
    "Divisioni ereditarie",
    "Lesione di legittima",
    "Donazioni",
    "Successioni internazionali",
  ];

  return (
    <section className="section hero-section">
      <div className="shell hero-shell">
        <div className="hero-premium">
          <div className="hero-media">
            <div className="hero-image-layer">
              <Image
                src="/images/hero-eredita-home.webp"
                alt="Professionista dello Studio Legale Del Monte in un contesto istituzionale"
                width={1086}
                height={1448}
                priority
                fetchPriority="high"
                sizes="(max-width: 760px) calc(100vw - 52px), (max-width: 1380px) calc(100vw - 32px), 1380px"
                quality={86}
                className="hero-portrait"
              />
            </div>

            <div className="hero-copy-panel">
              <div className="hero-copy-stack">
                <p className="hero-breadcrumb">Homepage</p>
                <p className="eyebrow hero-eyebrow-light">Studio Legale Del Monte</p>
                <h1 className="display hero-title hero-title-light">
                  Assistenza legale in materia di eredità e successioni
                </h1>
                <p className="lead hero-copy hero-copy-light">
                  Tutela e consulenza su testamenti, divisioni ereditarie,
                  impugnazioni, quota di legittima, donazioni, successioni
                  internazionali e questioni successorie complesse.
                </p>

                <div className="tag-list hero-tags">
                  {thematicTags.map((tag) => (
                    <TrackLink
                      key={tag}
                      href={getTopicHref(tag) ?? "/servizi"}
                      label={`hero_topic_${tag}`}
                      className="tag hero-tag hero-tag-light"
                    >
                      {tag}
                    </TrackLink>
                  ))}
                </div>

                <div className="hero-cta-row">
                  <TrackLink href="/contatti#modulo-contatti" label="hero_contact" className="button-primary">
                    Richiedi una valutazione preliminare
                  </TrackLink>
                  <ContactActions scope="hero" includeEmail includePhone includeWhatsapp compact />
                </div>

                <ContactAvailabilityNote />
              </div>
            </div>
          </div>
        </div>

        <div className="hero-trust-grid">
          {trustSignals.map((signal) => (
            <TrackLink
              key={signal.label}
              href={signal.href}
              label={`hero_trust_${signal.label}`}
              className="hero-trust-card clickable-card"
            >
              <p>{signal.label}</p>
            </TrackLink>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeAuthoritySection() {
  return (
    <section className="section-tight home-authority-section">
      <div className="shell home-authority-grid">
        <div className="home-authority-lead">
          <p className="eyebrow">Diritto ereditario</p>
          <h2 className="display-sm">Il punto centrale non è solo il conflitto, ma la corretta lettura della successione</h2>
        </div>
        <div className="home-authority-copy">
          <p className="lead">
            Prima di discutere di impugnazioni, divisioni, beni o conti correnti,
            occorre chiarire il quadro successorio: titolo applicabile, quote
            spettanti, eventuali donazioni pregresse, posizione dei legittimari e
            documenti realmente decisivi. Questa impostazione evita errori iniziali e
            rende più solida ogni scelta successiva, stragiudiziale o contenziosa.
          </p>
        </div>
      </div>
    </section>
  );
}

export function HomeVideoSection() {
  return (
    <section className="section home-video-section" aria-labelledby="home-video-title">
      <div className="shell home-video-grid">
        <div className="stack home-video-copy">
          <p className="eyebrow">Studio e metodo</p>
          <h2 id="home-video-title" className="display-sm">
            Un confronto diretto, dopo aver chiarito i nodi principali della successione
          </h2>
          <p className="lead">
            Il video resta disponibile su desktop e mobile come approfondimento
            visivo dello studio, ma entra solo dopo la sezione dedicata alle
            questioni ereditarie più frequenti e viene caricato in modo differito.
          </p>
          <p className="muted">
            In questo modo la homepage mantiene un primo impatto rapido e
            istituzionale, lasciando spazio al video in una posizione più coerente
            con il percorso di lettura.
          </p>
        </div>

        <div className="home-video-shell">
          <DeferredLazyVideoPlayer
            className="home-video"
            desktopSrc="/video/hero-studio-legale-desktop-light.mp4"
            mobileSrc="/video/hero-studio-legale-mobile-light.mp4"
            posterDesktop="/images/hero-successioni-del-monte.webp"
            posterMobile="/images/hero-successioni-del-monte-mobile.webp"
            ariaLabel="Video di presentazione dello studio legale"
          />
        </div>
      </div>
    </section>
  );
}

export function ProblemsSection({ items = mainProblems }: { items?: string[] }) {
  return (
    <section className="section">
      <div className="shell stack">
        <div className="stack">
          <p className="eyebrow">Questioni trattate</p>
          <h2 className="display-sm">
            Assistenza sulle controversie ereditarie più frequenti
          </h2>
          <p className="lead">
            Dalle successioni bloccate tra coeredi ai dubbi sul testamento, fino alla
            ricostruzione di somme, immobili e donazioni: ogni area è trattata con
            attenzione tecnica e taglio pratico.
          </p>
        </div>
        <div className="cards-grid">
          {items.map((item) => {
            const href = getTopicHref(item);

            return href ? (
              <Link key={item} href={href} prefetch={false} className="card clickable-card">
                <h3>{item}</h3>
              </Link>
            ) : (
              <div key={item} className="card">
                <h3>{item}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function WorkSection() {
  return (
    <section className="section">
      <div className="shell">
        <div className="stack">
          <p className="eyebrow">Metodo</p>
          <h2 className="display-sm">Un percorso chiaro, dalla verifica iniziale alla strategia</h2>
        </div>
        <div className="three-column" style={{ marginTop: 24 }}>
          {workSteps.map((step) => (
            <div key={step.title} className="card">
              <h3>{step.title}</h3>
              <p className="muted">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceGrid({ services }: { services: ServicePage[] }) {
  return (
    <section className="section">
      <div className="shell stack">
        <div className="stack">
          <p className="eyebrow">Servizi</p>
          <h2 className="display-sm">Aree di assistenza in materia successoria</h2>
        </div>
        <div className="cards-grid">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/${service.slug}`}
              prefetch={false}
              className="card stack clickable-card"
              data-track-event="cta_click"
              data-track-label={`service_${service.slug}`}
            >
              <h3>{service.title}</h3>
              <p className="muted">{service.description}</p>
              <span className="button-ghost card-link-cta">
                Approfondisci
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HubGrid({ hubs }: { hubs: HubPage[] }) {
  return (
    <section className="section">
      <div className="shell stack">
        <div className="stack">
          <p className="eyebrow">Aree di approfondimento</p>
          <h2 className="display-sm">Temi principali del diritto ereditario</h2>
          <p className="lead">
            Testamento, legittima, divisione ereditaria, donazioni, successione
            legittima, successioni internazionali e conflitti tra coeredi.
          </p>
        </div>
        <div className="cards-grid">
          {hubs.map((hub) => (
            <Link
              key={hub.slug}
              href={`/hub/${hub.slug}`}
              prefetch={false}
              className="card stack clickable-card"
              data-track-event="cta_click"
              data-track-label={`hub_${hub.slug}`}
            >
              <h3>{hub.title}</h3>
              <p className="muted">{hub.description}</p>
              <span className="button-ghost card-link-cta">
                Vai alla sezione
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ArticleGrid({
  articles,
  title = "Approfondimenti utili",
  eyebrow = "Approfondimenti",
}: {
  articles: ArticleEntry[];
  title?: string;
  eyebrow?: string;
}) {
  return (
    <section className="section">
      <div className="shell stack">
        <div className="stack">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="display-sm">{title}</h2>
        </div>
        <div className="cards-grid">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/approfondimenti/${article.slug}`}
              prefetch={false}
              className="card stack clickable-card"
              data-track-event="cta_click"
              data-track-label={`article_${article.slug}`}
            >
              <p className="eyebrow">{article.category}</p>
              <h3>{article.title}</h3>
              <p className="muted">{article.excerpt}</p>
              <span className="button-ghost card-link-cta">
                Leggi l’articolo
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqSection({
  title = "Domande frequenti",
  items,
}: {
  title?: string;
  items: FaqItem[];
}) {
  return (
    <section className="section">
      <div className="shell stack">
        <div className="stack">
          <p className="eyebrow">FAQ</p>
          <h2 className="display-sm">{title}</h2>
        </div>
        <div className="faq-accordion">
          {items.map((item) => (
            <details key={item.question} className="faq-item">
              <summary className="faq-question">{item.question}</summary>
              <div className="faq-answer">
                <p className="muted">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection({
  title = "Contatta lo Studio",
  intro = "Puoi scrivere per una prima valutazione del caso, allegando la documentazione già disponibile. Il telefono è attivo nella fascia oraria indicata; WhatsApp e Mail restano sempre disponibili.",
  includeMap = true,
}: {
  title?: string;
  intro?: string;
  includeMap?: boolean;
}) {
  return (
    <>
      <section className="section">
        <div className="shell panel">
          <div className="panel-inner contact-grid">
            <div className="stack">
              <p className="eyebrow">Contatti</p>
              <h2 className="display-sm">{title}</h2>
              <p className="lead">{intro}</p>
              <div className="contact-list">
                <div className="contact-item">
                  <strong>Telefono</strong>
                  <div className="muted">{contacts.phoneDisplay}</div>
                </div>
                <div className="contact-item">
                  <strong>WhatsApp</strong>
                  <div className="muted">Messaggi sempre disponibili</div>
                </div>
                <div className="contact-item">
                  <strong>Mail</strong>
                  <div className="muted">{contacts.email}</div>
                </div>
                <div className="contact-item">
                  <strong>Sede</strong>
                  <div className="muted">{contacts.address}</div>
                </div>
              </div>
              <ContactAvailabilityNote />
              <ContactActions scope="contact_section" includeEmail includePhone includeWhatsapp compact />
            </div>

            <div
              id="modulo-contatti"
              className="card contact-form-card stack"
              style={{ scrollMarginTop: "110px" }}
            >
              <h3>Richiesta di contatto</h3>
              <p className="muted">
                Compila il modulo con i dati essenziali del caso e allega, se utile,
                la documentazione disponibile.
              </p>
              <DeferredContactForm />
            </div>
          </div>
        </div>
      </section>
      {includeMap ? <OfficeMap compact /> : null}
    </>
  );
}

const serviceLandingTitles: Record<string, string> = {
  "avvocato-successioni": "Hai bisogno di un avvocato per una successione complessa?",
  "impugnazione-testamento": "Vuoi contestare un testamento?",
  "divisione-ereditaria": "La divisione ereditaria è bloccata?",
  "lesione-di-legittima": "La tua quota di legittima è stata lesa?",
  "collazione-e-donazioni": "Donazioni fatte in vita alterano l’eredità?",
  "successioni-internazionali": "Ci sono beni o eredi all’estero?",
  "mediazione-ereditaria": "Vuoi evitare una causa tra eredi?",
  "eredita-giacente": "L’eredità è senza gestione o senza eredi certi?",
  "rinuncia-eredita": "Conviene rinunciare all’eredità?",
  "recupero-somme-ereditarie": "Devi recuperare somme ereditarie o conti del defunto?",
};

function getServiceHeroTitle(service: ServicePage) {
  return service.heroTitle;
}

const specialInheritanceAssetCards = [
  {
    href: "/divisione-gioielli-eredita",
    title: "Gioielli e preziosi",
    description:
      "Come dividere gioielli, preziosi e beni mobili di valore.",
  },
  {
    href: "/animali-domestici-eredita",
    title: "Animali domestici",
    description:
      "Cosa fare se gli eredi litigano sull’animale domestico.",
  },
  {
    href: "/auto-ereditata",
    title: "Auto ereditata",
    description:
      "Voltura, uso, vendita o assegnazione dell’auto caduta in successione.",
  },
  {
    href: "/casa-ereditata",
    title: "Casa ereditata",
    description:
      "Vendita, assegnazione, uso esclusivo e conguagli sulla casa ereditata.",
  },
  {
    href: "/affitti-immobili-ereditati",
    title: "Affitti immobiliari",
    description:
      "Ripartizione dei canoni incassati da immobili ereditati.",
  },
  {
    href: "/conti-correnti-azioni-polizze-eredita",
    title: "Conti correnti, azioni e polizze",
    description:
      "Conti, titoli, azioni, polizze e somme del defunto.",
  },
];

const specialInheritanceClusterSlugs = new Set([
  "divisione-ereditaria",
  "recupero-somme-ereditarie",
  "animali-domestici-eredita",
  "auto-ereditata",
  "casa-ereditata",
  "affitti-immobili-ereditati",
  "conti-correnti-azioni-polizze-eredita",
]);

export function SpecialInheritanceAssetsSection({
  currentHref,
  title = "Beni particolari in eredità",
  intro = "Quando la successione riguarda beni specifici o difficili da gestire, conviene leggere anche le pagine dedicate ai casi più ricorrenti.",
}: {
  currentHref?: string;
  title?: string;
  intro?: string;
}) {
  const cards = specialInheritanceAssetCards.filter((item) => item.href !== currentHref);

  return (
    <section className="section-tight">
      <div className="shell">
        <div className="card stack">
          <p className="eyebrow">Cluster tematico</p>
          <h2 className="display-sm">{title}</h2>
          <p className="muted">{intro}</p>
          <div className="cards-grid">
            {cards.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                className="card stack clickable-card"
                data-track-event="cta_click"
                data-track-label={`special_asset_${item.href}`}
              >
                <h3>{item.title}</h3>
                <p className="muted">{item.description}</p>
                <span className="button-ghost card-link-cta">Vai alla pagina dedicata</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function getTrustCards(kind: "service" | "hub" | "article", slug?: string) {
  const firstCard =
    slug === "successioni-internazionali" || slug === "successioni-internazionali-cosa-cambia"
      ? "Coordinamento su successioni con elementi esteri"
      : "Esperienza in successioni complesse";

  const articleFirstCard =
    slug === "successioni-internazionali-cosa-cambia"
      ? "Lettura chiara di casi con beni, documenti o eredi all’estero"
      : "Approccio tecnico ma leggibile anche nei casi più delicati";

  return [
    kind === "article" ? articleFirstCard : firstCard,
    "Gestione stragiudiziale e giudiziale",
    "Studio legale a Roma con operatività nazionale",
    "Approccio riservato, probatorio e strategico",
  ];
}

function LandingActionButtons({ scope }: { scope: string }) {
  return (
    <div className="landing-template-cta-row">
      <TrackLink
        href="/contatti#modulo-contatti"
        label={`${scope}_contact`}
        className="button-primary landing-template-cta"
      >
        Contatta lo Studio
      </TrackLink>
      <Link
        href={contacts.whatsappHref}
        className="button-whatsapp landing-template-cta"
        target="_blank"
        rel="noopener noreferrer"
        data-track-event="whatsapp_click"
        data-track-label={`${scope}_whatsapp`}
      >
        Scrivi su WhatsApp
      </Link>
    </div>
  );
}

function LandingHero({
  eyebrow,
  title,
  intro,
  microCases,
  asset,
  breadcrumbs,
  scope,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  microCases: string[];
  asset: VisualAsset;
  breadcrumbs: React.ReactNode;
  scope: string;
}) {
  return (
    <>
      <LandingTemplateStyles />
      <section className="hero-section">
        <div className="hero-shell landing-template-shell">
          <div className="landing-template-hero">
            <Image
              src={asset.src}
              alt={asset.alt}
              fill
              priority={asset.priority}
              loading={asset.priority ? "eager" : "lazy"}
              sizes="100vw"
              className="landing-template-hero-image"
              style={{ objectPosition: asset.objectPosition ?? "center center" }}
            />
            <div className="landing-template-hero-overlay" aria-hidden="true" />
            <div className="landing-template-hero-content">
              <div className="landing-template-hero-copy">
                <p className="eyebrow landing-template-eyebrow">{eyebrow}</p>
                <h1 className="display landing-template-title">{title}</h1>
                <p className="lead landing-template-lead">{intro}</p>
                {microCases.length > 0 ? (
                  <div className="landing-template-tags">
                    {microCases.slice(0, 4).map((item) => (
                      <span key={item} className="tag landing-template-tag">
                        {item}
                      </span>
                    ))}
                  </div>
                ) : null}
                <LandingActionButtons scope={scope} />
                <p className="landing-template-note">
                  Puoi iniziare con un messaggio WhatsApp oppure usare il modulo
                  contatti per un primo inquadramento del caso.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-tight">
        <div className="shell">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            {breadcrumbs}
          </nav>
        </div>
      </section>
    </>
  );
}

function LandingTemplateStyles() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          .landing-template-shell {
            width: min(calc(100% - 8px), 100vw);
          }

          .landing-template-hero {
            position: relative;
            min-height: clamp(620px, 82vh, 880px);
            border-radius: 34px;
            overflow: hidden;
            border: 1px solid rgba(48, 65, 85, 0.12);
            box-shadow: 0 34px 88px rgba(15, 32, 49, 0.12);
            background: #ddd4c8;
          }

          .landing-template-hero-image {
            object-fit: cover;
            filter: brightness(1.08) saturate(0.96) contrast(1.01);
          }

          .landing-template-hero-overlay {
            position: absolute;
            inset: 0;
            z-index: 1;
            background:
              linear-gradient(
                90deg,
                rgba(15, 23, 42, 0.38) 0%,
                rgba(15, 23, 42, 0.28) 18%,
                rgba(15, 23, 42, 0.16) 38%,
                rgba(15, 23, 42, 0.08) 58%,
                rgba(15, 23, 42, 0.03) 78%,
                rgba(15, 23, 42, 0) 100%
              );
          }

          .landing-template-hero-content {
            position: relative;
            z-index: 2;
            display: flex;
            align-items: center;
            min-height: inherit;
            width: min(calc(100% - 44px), 1380px);
            margin: 0 auto;
            padding: 138px 0 42px;
          }

          .landing-template-hero-copy {
            max-width: 590px;
            display: grid;
            gap: 18px;
          }

          .landing-template-eyebrow,
          .landing-template-note {
            color: rgba(247, 244, 239, 0.88);
          }

          .landing-template-title {
            color: #f7f4ef;
            max-width: 12ch;
            font-size: clamp(2.5rem, 4.3vw, 4.15rem);
            line-height: 1.03;
          }

          .landing-template-lead {
            color: rgba(247, 244, 239, 0.92);
            max-width: 54ch;
            line-height: 1.7;
          }

          .landing-template-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            max-width: 44rem;
          }

          .landing-template-tag {
            border-color: rgba(255, 255, 255, 0.14);
            background: rgba(255, 255, 255, 0.12);
            color: #f7f4ef;
          }

          .landing-template-cta-row {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            align-items: center;
            max-width: 470px;
          }

          .landing-template-cta {
            min-height: 50px !important;
            min-width: 210px;
            padding: 0 18px !important;
            flex: 1 1 210px;
          }

          .landing-template-note {
            margin: 0;
            line-height: 1.6;
            font-size: 0.95rem;
          }

          @media (max-width: 980px) {
            .landing-template-shell {
              width: min(calc(100% - 32px), 1380px);
            }

            .landing-template-hero-content {
              width: min(calc(100% - 32px), 920px);
              padding-top: 116px;
              padding-bottom: 28px;
            }

            .landing-template-hero-copy {
              max-width: 510px;
            }
          }

          @media (max-width: 760px) {
            .landing-template-hero {
              min-height: 620px;
              border-radius: 24px;
            }

            .landing-template-hero-image {
              object-position: center center !important;
            }

            .landing-template-hero-overlay {
              background:
                linear-gradient(
                  180deg,
                  rgba(8, 19, 31, 0.16) 0%,
                  rgba(8, 19, 31, 0.1) 30%,
                  rgba(8, 19, 31, 0.22) 62%,
                  rgba(8, 19, 31, 0.58) 100%
                );
            }

            .landing-template-hero-content {
              width: min(calc(100% - 24px), 720px);
              padding: 88px 0 18px;
              align-items: flex-end;
            }

            .landing-template-hero-copy {
              max-width: none;
              gap: 14px;
            }

            .landing-template-title {
              max-width: 100%;
              font-size: clamp(1.95rem, 7.8vw, 2.7rem);
              line-height: 1.05;
            }

            .landing-template-lead,
            .landing-template-note {
              max-width: none;
            }

            .landing-template-tags {
              display: none;
            }

            .landing-template-cta-row {
              display: grid;
              gap: 10px;
              max-width: none;
            }

            .landing-template-cta {
              width: 100%;
              min-width: 0;
            }
          }
        `,
      }}
    />
  );
}

export function ServicePageTemplate({
  service,
  relatedArticles,
}: {
  service: ServicePage;
  relatedArticles: ArticleEntry[];
}) {
  const serviceVisual = getServiceVisual(service, true);
  const heroTitle = getServiceHeroTitle(service);

  return (
    <>
      <LandingHero
        eyebrow={service.shortTitle}
        title={heroTitle}
        intro={service.heroIntro}
        microCases={service.problemList}
        asset={serviceVisual}
        scope={`service_${service.slug}_hero`}
        breadcrumbs={
          <>
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/servizi">Servizi</Link>
            <span>/</span>
            <span>{service.shortTitle}</span>
          </>
        }
      />

      <section className="section-tight">
        <div className="shell two-column">
          <div className="card stack">
            <p className="eyebrow">Problema</p>
            <h2 className="display-sm">Ti trovi in una di queste situazioni?</h2>
            <p className="lead">{service.description}</p>
            <ul className="list">
              {service.problemList.map((item) => (
                <TopicListItem
                  key={item}
                  item={item}
                  label={`${service.slug}_problem_${item}`}
                />
              ))}
            </ul>
          </div>
          <div className="card stack">
            <p className="eyebrow">Soluzione</p>
            <h2 className="display-sm">Cosa va chiarito per impostare una soluzione efficace</h2>
            <p className="muted">
              Il punto decisivo non è solo capire se esiste un diritto, ma verificare
              come provarlo, come misurarlo e quale percorso tutela davvero la tua
              posizione.
            </p>
            <div className="info-list">
              {service.checks.map((item) => (
                <div key={item} className="info-item">
                  <strong>{item}</strong>
                </div>
              ))}
            </div>
            <ul className="list">
              {service.whenToCall.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell two-column">
          <div className="card stack">
            <p className="eyebrow">Errori</p>
            <h2 className="display-sm">Errori frequenti che peggiorano il caso</h2>
            <div className="info-list">
              {service.errors.map((item) => (
                <div key={item} className="info-item">
                  <strong>{item}</strong>
                </div>
              ))}
            </div>
          </div>
          <div className="card stack">
            <p className="eyebrow">Documenti</p>
            <h2 className="display-sm">Documenti utili per impostare il lavoro</h2>
            <ul className="list">
              {service.documents.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell two-column">
          <div className="card stack">
            <p className="eyebrow">Metodo</p>
            <h2 className="display-sm">Come interviene lo Studio</h2>
            <div className="info-list">
              {workSteps.map((step) => (
                <div key={step.title} className="info-item">
                  <strong>{step.title}</strong>
                  <p>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="card stack">
            <p className="eyebrow">Trust</p>
            <h2 className="display-sm">Assistenza concreta, fondata su prova e strategia</h2>
            <p className="lead">{service.trust}</p>
            <div className="meta-grid">
              {getTrustCards("service", service.slug).map((item) => (
                <div key={item} className="mini-card">
                  <h3>{item}</h3>
                </div>
              ))}
            </div>
            <LandingActionButtons scope={`service_${service.slug}_mid`} />
          </div>
        </div>
      </section>

      {service.relatedLinks && service.relatedLinks.length > 0 ? (
        <section className="section-tight">
          <div className="shell">
            <div className="card stack">
              <p className="eyebrow">Collegamenti utili</p>
              <h2 className="display-sm">Pagine collegate da consultare in parallelo</h2>
              <p className="muted">
                Alcune questioni ereditarie si intrecciano con divisione, donazioni,
                somme bancarie o gestione di beni specifici. Qui trovi i passaggi più
                utili da approfondire.
              </p>
              <div className="cards-grid">
                {service.relatedLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="card clickable-card"
                    data-track-event="cta_click"
                    data-track-label={`${service.slug}_related_${item.href}`}
                  >
                    <h3>{item.label}</h3>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}
      {specialInheritanceClusterSlugs.has(service.slug) ? (
        <SpecialInheritanceAssetsSection currentHref={`/${service.slug}`} />
      ) : null}

      <FaqSection title={`Domande frequenti su ${service.shortTitle.toLowerCase()}`} items={service.faq} />
      {relatedArticles.length > 0 ? (
        <ArticleGrid
          articles={relatedArticles}
          eyebrow="Approfondimenti correlati"
          title="Contenuti utili collegati a questa materia"
        />
      ) : null}
      <section className="section-tight">
        <div className="shell panel">
          <div className="panel-inner two-column">
            <div className="stack">
              <p className="eyebrow">Contatto</p>
              <h2 className="display-sm">Hai bisogno di un primo inquadramento?</h2>
              <p className="lead">
                Un confronto tempestivo aiuta a evitare errori, accordi sfavorevoli e
                iniziative inefficaci.
              </p>
            </div>
            <div className="stack">
              <div className="landing-template-cta-row landing-template-cta-row-final">
                <TrackLink
                  href="/contatti#modulo-contatti"
                  label={`${service.slug}_final_contact`}
                  className="button-primary landing-template-cta"
                >
                  Contatta lo Studio
                </TrackLink>
                <Link
                  href={contacts.whatsappHref}
                  className="button-whatsapp landing-template-cta"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track-event="whatsapp_click"
                  data-track-label={`${service.slug}_final_whatsapp`}
                >
                  Scrivi su WhatsApp
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ContactSection
        title={`Parla con lo Studio per ${service.shortTitle.toLowerCase()}`}
        intro="Se desideri una valutazione del caso o hai già documenti da far esaminare, puoi usare il form oppure i contatti diretti dello studio."
      />
    </>
  );
}

export function HubPageTemplate({
  hub,
  relatedArticles,
  relatedServices,
}: {
  hub: HubPage;
  relatedArticles: ArticleEntry[];
  relatedServices: ServicePage[];
}) {
  const hubVisual = getHubVisual(hub, true);

  return (
    <>
      <section className="section">
        <div className="shell hero-grid">
          <div className="stack">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/hub">Aree</Link>
              <span>/</span>
              <span>{hub.title}</span>
            </nav>
            <p className="eyebrow">Area di approfondimento</p>
            <h1 className="display">{hub.title}</h1>
            <p className="lead">{hub.intro}</p>
            <div className="tag-list">
              {getHubEntities(hub).map((entity) => {
                const href = getTopicHref(entity) ?? "/servizi";

                return (
                  <TrackLink
                    key={entity}
                    href={href}
                    label={`hub_${hub.slug}_topic_${entity}`}
                    className="tag"
                  >
                    {entity}
                  </TrackLink>
                );
              })}
            </div>
            <div className="cluster">
              <ContactActions scope={`hub_${hub.slug}_hero`} compact />
            </div>
          </div>
          <EditorialFigure asset={hubVisual} />
        </div>
      </section>

      <section className="section-tight">
        <div className="shell cards-grid">
          {hub.sections.map((section) => (
            <div key={section.title} className="card">
              <h3>{section.title}</h3>
              <ul className="list">
                {section.items.map((item) => (
                  <TopicListItem
                    key={item}
                    item={item}
                    label={`hub_${hub.slug}_section_${item}`}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <ServiceGrid services={relatedServices} />
      <ArticleGrid articles={relatedArticles} />
      <FaqSection title={`Domande frequenti su ${hub.title.toLowerCase()}`} items={hub.faq} />
      <ContactSection
        title={`Assistenza su ${hub.title.toLowerCase()}`}
        intro="Se la situazione descritta in questa sezione riguarda il tuo caso, puoi contattare lo studio per una prima valutazione."
      />
    </>
  );
}

export function ArticlePageTemplate({
  article,
  relatedServices,
}: {
  article: ArticleEntry;
  relatedServices: ServicePage[];
}) {
  const articleVisual = getArticleVisual(article, true);

  return (
    <>
      <section className="section">
        <div className="shell hero-grid">
          <div className="stack">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/approfondimenti">Approfondimenti</Link>
              <span>/</span>
              <span>{article.title}</span>
            </nav>
            <p className="eyebrow">{article.category}</p>
            <h1 className="display">{article.title}</h1>
            <p className="lead">{article.answerFirst}</p>
            <div className="tag-list">
              {getArticleEntities(article).map((entity) => {
                const href = getTopicHref(entity) ?? "/approfondimenti";

                return (
                  <TrackLink
                    key={entity}
                    href={href}
                    label={`article_${article.slug}_topic_${entity}`}
                    className="tag"
                  >
                    {entity}
                  </TrackLink>
                );
              })}
            </div>
          </div>
          <div className="hero-side-stack">
            <EditorialFigure asset={articleVisual} />
            <div className="panel">
              <div className="panel-inner stack">
                <h2>Domande che emergono più spesso</h2>
                <div className="info-list">
                  {getArticleQuestions(article).map((question) => (
                    <div key={question} className="info-item">
                      <strong>{question}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell two-column">
          <article className="card article-body">
            {article.sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </article>
          <aside className="stack">
            <div className="card stack">
              <h3>Servizi collegati</h3>
              {relatedServices.map((service) => (
                <TrackLink
                  key={service.slug}
                  href={`/${service.slug}`}
                  label={`article_${article.slug}_${service.slug}`}
                  className="button-ghost"
                >
                  {service.shortTitle}
                </TrackLink>
              ))}
            </div>
            <div className="card stack">
              <h3>Quando è utile un parere legale</h3>
              <ul className="list">
                <li>Quando il caso reale non coincide con le ipotesi più semplici.</li>
                <li>Quando occorre valutare prove, documenti o iniziative da intraprendere.</li>
                <li>Quando il rapporto tra coeredi è già conflittuale o sta degenerando.</li>
              </ul>
            </div>
            <div className="card stack">
              <h3>Contatto rapido</h3>
              <TrackLink href="/contatti#modulo-contatti" label={`article_${article.slug}_form`} className="button-primary">
                Vai al modulo contatti
              </TrackLink>
              <ContactActions scope={`article_${article.slug}_side`} compact />
            </div>
          </aside>
        </div>
      </section>

      <FaqSection title="Domande frequenti sull’argomento" items={article.faq} />
      <ContactSection
        title="Hai bisogno di una valutazione sul tuo caso?"
        intro="Gli articoli aiutano a orientarsi, ma quando servono documenti, prova e strategia è utile passare a un confronto diretto con lo studio."
      />
    </>
  );
}

function getGlossaryLinkData(slug: string) {
  const service = getService(slug);

  if (service) {
    const serviceLabels: Record<string, string> = {
      "lesione-di-legittima": "Leggi sulla quota di legittima",
      "divisione-ereditaria": "Vai alla divisione ereditaria",
      "collazione-e-donazioni": "Approfondisci la collazione",
      "rinuncia-eredita": "Vai alla rinuncia all’eredità",
      "eredita-giacente": "Leggi sull’eredità giacente",
      "impugnazione-testamento": "Leggi sull’impugnazione del testamento",
      "successioni-internazionali": "Leggi sulle successioni internazionali",
      "mediazione-ereditaria": "Leggi sulla mediazione ereditaria",
      "recupero-somme-ereditarie": "Leggi sul recupero delle somme ereditarie",
      "avvocato-successioni": "Vai all’avvocato per successioni",
    };

    return {
      href: `/${service.slug}`,
      label:
        serviceLabels[service.slug] ?? `Approfondisci: ${service.shortTitle}`,
    };
  }

  const article = getArticle(slug);

  if (article) {
    return {
      href: `/approfondimenti/${article.slug}`,
      label: `Approfondisci: ${article.title}`,
    };
  }

  const hub = getHub(slug);

  if (hub) {
    return {
      href: `/hub/${hub.slug}`,
      label: `Vai a ${hub.title}`,
    };
  }

  return null;
}

export function GlossaryGrid({ terms }: { terms: GlossaryTerm[] }) {
  return (
    <section className="section">
      <div className="shell stack">
        <div className="stack">
          <p className="eyebrow">Glossario successorio</p>
          <h1 className="display-sm">Termini utili per orientarsi nelle successioni</h1>
          <p className="lead">
            Definizioni chiare per comprendere i concetti più importanti del diritto
            ereditario e capire quando è opportuno approfondire o chiedere assistenza.
          </p>
        </div>
        <div className="cards-grid">
          {terms.map((term) => (
            <div key={term.slug} id={term.slug} className="card stack">
              <h2>{term.term}</h2>
              <p className="muted">{term.definition}</p>
              <p className="muted">
                <strong>Perché conta:</strong> {term.whyItMatters}
              </p>
              <div className="cluster glossary-links">
                {term.relatedSlugs
                  .map((slug) => ({ slug, data: getGlossaryLinkData(slug) }))
                  .filter(
                    (item): item is { slug: string; data: NonNullable<ReturnType<typeof getGlossaryLinkData>> } =>
                      Boolean(item.data),
                  )
                  .slice(0, 2)
                  .map(({ slug, data }) => (
                    <TrackLink
                      key={slug}
                      href={data.href}
                      label={`glossary_${term.slug}_${slug}`}
                      className="button-ghost glossary-link-button"
                    >
                      {data.label}
                    </TrackLink>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
