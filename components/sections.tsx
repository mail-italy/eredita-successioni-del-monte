import Link from "next/link";
import Image from "next/image";

import {
  ArticleEntry,
  contacts,
  FaqItem,
  GlossaryTerm,
  HubPage,
  mainProblems,
  moneyPages,
  ServicePage,
  trustSignals,
  workSteps,
  getArticleEntities,
  getArticleQuestions,
  getHubEntities,
  getServiceEntities,
  getServiceLinks,
} from "@/lib/content";
import { ContactActions, ContactAvailabilityNote } from "@/components/contact-actions";
import { ContactForm } from "@/components/contact-form";
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
      className={className}
      data-track-event={event}
      data-track-label={label}
    >
      {children}
    </Link>
  );
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
                src="/images/hero-eredita-home.png"
                alt="Professionista dello Studio Legale Del Monte"
                width={1086}
                height={1448}
                priority
                sizes="(max-width: 760px) 100vw, (max-width: 1440px) 86vw, 1100px"
                className="hero-portrait"
              />
            </div>

            <div className="hero-desktop-copy">
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
                    <span key={tag} className="tag hero-tag hero-tag-light">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="hero-cta-row">
                  <TrackLink href="/contatti" label="hero_contact" className="button-primary">
                    Richiedi una valutazione preliminare
                  </TrackLink>
                  <ContactActions scope="hero" includeEmail includePhone includeWhatsapp compact />
                </div>

                <ContactAvailabilityNote />
              </div>
            </div>
          </div>

          <div className="hero-mobile-copy">
            <div className="hero-copy-stack hero-copy-stack-mobile">
              <p className="hero-breadcrumb">Homepage</p>
              <p className="eyebrow">Studio Legale Del Monte</p>
              <h1 className="display hero-title">
                Assistenza legale in materia di eredità e successioni
              </h1>
              <p className="lead hero-copy">
                Tutela e consulenza su testamenti, divisioni ereditarie,
                impugnazioni, quota di legittima, donazioni, successioni
                internazionali e questioni successorie complesse.
              </p>

              <div className="tag-list hero-tags">
                {thematicTags.map((tag) => (
                  <span key={tag} className="tag hero-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="hero-cta-row">
                <TrackLink href="/contatti" label="hero_contact_mobile" className="button-primary">
                  Richiedi una valutazione preliminare
                </TrackLink>
                <ContactActions scope="hero_mobile" includeEmail includePhone includeWhatsapp compact />
              </div>

              <ContactAvailabilityNote />
            </div>
          </div>
        </div>

        <div className="hero-trust-grid">
          {trustSignals.map((signal) => (
            <div key={signal} className="hero-trust-card">
              <p>{signal}</p>
            </div>
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
          <p className="eyebrow">Assistenza dedicata</p>
          <h2 className="display-sm">Una struttura chiara per questioni ereditarie complesse</h2>
        </div>
        <div className="home-authority-copy">
          <p className="lead">
            Successioni, testamenti, quote di legittima, divisioni patrimoniali e
            contenziosi tra coeredi richiedono ordine documentale, lettura tecnica e
            una strategia coerente. La homepage ora accompagna il visitatore in questo
            percorso con priorità visive più nette e sezioni meglio scandite.
          </p>
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
          {items.map((item) => (
            <div key={item} className="card">
              <h3>{item}</h3>
            </div>
          ))}
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
            <div key={service.slug} className="card stack">
              <h3>{service.title}</h3>
              <p className="muted">{service.description}</p>
              <TrackLink
                href={`/${service.slug}`}
                label={`service_${service.slug}`}
                className="button-ghost"
              >
                Approfondisci
              </TrackLink>
            </div>
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
            <div key={hub.slug} className="card stack">
              <h3>{hub.title}</h3>
              <p className="muted">{hub.description}</p>
              <TrackLink
                href={`/hub/${hub.slug}`}
                label={`hub_${hub.slug}`}
                className="button-ghost"
              >
                Vai alla sezione
              </TrackLink>
            </div>
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
            <article key={article.slug} className="card stack">
              <p className="eyebrow">{article.category}</p>
              <h3>{article.title}</h3>
              <p className="muted">{article.excerpt}</p>
              <TrackLink
                href={`/approfondimenti/${article.slug}`}
                label={`article_${article.slug}`}
                className="button-ghost"
              >
                Leggi l’articolo
              </TrackLink>
            </article>
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

            <div className="card contact-form-card stack">
              <h3>Richiesta di contatto</h3>
              <p className="muted">
                Compila il modulo con i dati essenziali del caso e allega, se utile,
                la documentazione disponibile.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      {includeMap ? <OfficeMap compact /> : null}
    </>
  );
}

export function ServicePageTemplate({
  service,
  relatedArticles,
}: {
  service: ServicePage;
  relatedArticles: ArticleEntry[];
}) {
  return (
    <>
      <section className="section">
        <div className="shell hero-grid">
          <div className="stack">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/servizi">Servizi</Link>
              <span>/</span>
              <span>{service.shortTitle}</span>
            </nav>
            <p className="eyebrow">{service.shortTitle}</p>
            <h1 className="display">{service.heroTitle}</h1>
            <p className="lead">{service.heroIntro}</p>
            <div className="cluster">
              <TrackLink href="/contatti" label={`${service.slug}_hero_contact`}>
                Richiedi assistenza
              </TrackLink>
              <ContactActions scope={`${service.slug}_hero`} compact />
            </div>
          </div>
          <div className="panel">
            <div className="panel-inner stack">
              <h2>Quando può essere utile un confronto con lo studio</h2>
              <ul className="list">
                {service.whenToCall.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell meta-grid">
          <div className="mini-card">
            <h3>In breve</h3>
            <p>{service.description}</p>
          </div>
          <div className="mini-card">
            <h3>Assistenza su misura</h3>
            <p>
              Ogni pratica viene valutata in base a documenti, asset patrimoniali,
              rapporti tra coeredi e obiettivi concreti.
            </p>
          </div>
          <div className="mini-card">
            <h3>Ambito di attività</h3>
            <p>
              Studio con sede a Roma, attivo anche su questioni successorie che
              richiedono coordinamento documentale o giudiziale più ampio.
            </p>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell cards-grid">
          <div className="card">
            <h3>Problemi trattati</h3>
            <ul className="list">
              {service.problemList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3>Verifiche preliminari</h3>
            <ul className="list">
              {service.checks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3>Errori da evitare</h3>
            <ul className="list">
              {service.errors.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3>Documenti utili</h3>
            <ul className="list">
              {service.documents.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell two-column">
          <div className="card stack">
            <h3>Temi collegati</h3>
            <div className="tag-list">
              {getServiceEntities(service).map((item) => (
                <span key={item} className="tag">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="card stack">
            <h3>Come affrontiamo la pratica</h3>
            <div className="info-list">
              <div className="info-item">
                <strong>Analisi documentale</strong>
                <p>Ricostruzione iniziale di quote, beni, atti e profili di rischio.</p>
              </div>
              <div className="info-item">
                <strong>Valutazione strategica</strong>
                <p>Scelta del percorso più adatto tra trattativa, mediazione e contenzioso.</p>
              </div>
              <div className="info-item">
                <strong>Assistenza operativa</strong>
                <p>Gestione dei rapporti con coeredi, professionisti, mediatori e autorità competenti.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell two-column">
          <div className="card stack">
            <p className="eyebrow">Affidabilità professionale</p>
            <h2 className="display-sm">Assistenza concreta, fondata su prova e strategia</h2>
            <p className="lead">{service.trust}</p>
          </div>
          <div className="card stack">
            <h3>Contatto diretto con lo studio</h3>
            <p className="muted">
              Se ritieni che la situazione richieda una valutazione legale, puoi
              contattare lo studio nei modi più adatti al tuo caso.
            </p>
            <ContactActions scope={`${service.slug}_mid`} compact />
            <ContactAvailabilityNote />
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell two-column">
          <div className="card stack">
            <h3>Approfondimenti utili</h3>
            <div className="info-list">
              {getServiceLinks(service).map((item) => (
                <div key={item.href} className="info-item">
                  <TrackLink href={item.href} label={`${service.slug}_${item.label}`} className="button-ghost">
                    {item.label}
                  </TrackLink>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="card stack">
            <h3>Quando agire senza rinviare</h3>
            <ul className="list">
              <li>Quando esiste un rischio di perdita di prova o documenti rilevanti.</li>
              <li>Quando le decisioni dei coeredi incidono su beni, somme o immobili.</li>
              <li>Quando è necessario impostare subito la strategia prima di mediazione o causa.</li>
            </ul>
          </div>
        </div>
      </section>

      <FaqSection title={`Domande frequenti su ${service.shortTitle.toLowerCase()}`} items={service.faq} />
      <ArticleGrid
        articles={relatedArticles}
        eyebrow="Approfondimenti correlati"
        title="Contenuti utili collegati a questa materia"
      />
      <ContactSection
        title={`Parla con un avvocato per ${service.shortTitle.toLowerCase()}`}
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
          </div>
          <div className="panel">
            <div className="panel-inner stack">
              <h2>Argomenti collegati</h2>
              <div className="tag-list">
                {getHubEntities(hub).map((entity) => (
                  <span key={entity} className="tag">
                    {entity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell cards-grid">
          {hub.sections.map((section) => (
            <div key={section.title} className="card">
              <h3>{section.title}</h3>
              <ul className="list">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
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
              {getArticleEntities(article).map((entity) => (
                <span key={entity} className="tag">
                  {entity}
                </span>
              ))}
            </div>
          </div>
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
              <div className="cluster">
                {term.relatedSlugs.map((slug) => {
                  const service = moneyPages.find((page) => page.slug === slug);
                  const href = service ? `/${slug}` : `/approfondimenti/${slug}`;

                  return (
                    <TrackLink
                      key={slug}
                      href={href}
                      label={`glossary_${term.slug}_${slug}`}
                      className="button-ghost"
                    >
                      Approfondisci
                    </TrackLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
