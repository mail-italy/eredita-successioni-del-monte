// Lightweight public configuration: safe to import from client components.
export const siteConfig = {
  brand: "Eredità e Successioni",
  studio: "Studio Legale Del Monte",
  domain: "https://ereditaesuccessioni.it",
  baseTitle: "Eredità e Successioni | Assistenza legale in materia ereditaria",
  titleTemplate: "%s | Eredità e Successioni",
  description:
    "Assistenza legale dedicata a successioni, testamenti, divisioni ereditarie, legittima, donazioni, mediazione ereditaria e successioni internazionali.",
  locale: "it_IT",
};

const whatsappBaseMessage =
  "Messaggio dal sito: ereditaesuccessioni.it (Eredità e Successioni)\n\nBuongiorno, desidero richiedere una prima valutazione su una questione di eredità o successione.";

const openingTime = "09:30";
const closingTime = "19:00";

export const contacts = {
  phoneDisplay: "+39 06 97615122",
  phoneHref: "tel:+390697615122",
  whatsappHref: `https://wa.me/390697615122?text=${encodeURIComponent(whatsappBaseMessage)}`,
  email: "info@delmontestudiolegale.it",
  emailHref: "mailto:info@delmontestudiolegale.it",
  address: "Via Costanza Baudana Vaccolini, 5 – 00153 Roma",
  city: "Roma",
  openingTime,
  closingTime,
  officeHours: `Lunedì–Venerdì, ${openingTime}–${closingTime}`,
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Via+Costanza+Baudana+Vaccolini+5+00153+Roma",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Via%20Costanza%20Baudana%20Vaccolini%205%2C%2000153%20Roma&z=15&output=embed",
};

export const primaryNav = [
  { href: "/", label: "Homepage" },
  { href: "/servizi", label: "Servizi" },
  { href: "/hub", label: "Aree" },
  { href: "/approfondimenti", label: "Approfondimenti" },
  { href: "/glossario-successorio", label: "Glossario" },
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/contatti", label: "Contatti" },
];

export const contactRequestTopics = [
  "Avvocato successioni",
  "Successione legittima",
  "Testamento",
  "Testamento olografo falso",
  "Impugnazione testamento",
  "Lesione di legittima",
  "Divisione ereditaria",
  "Conflitti tra coeredi",
  "Accettazione eredità",
  "Beneficio d’inventario",
  "Petizione ereditaria",
  "Indegnità successoria",
  "Vendita casa ereditata",
  "Gioielli ereditati",
  "Collazione e donazioni",
  "Mediazione ereditaria",
  "Rinuncia all’eredità",
  "Recupero somme ereditarie",
  "Successioni internazionali",
  "Altro",
];

// Keep the form editable; only preselect an existing topic for a dedicated page.
const serviceContactTopics: Record<string, string> = {
  "avvocato-successioni": "Avvocato successioni",
  "successione-legittima": "Successione legittima",
  "testamento": "Testamento",
  "testamento-olografo-falso": "Testamento olografo falso",
  "impugnazione-testamento": "Impugnazione testamento",
  "lesione-di-legittima": "Lesione di legittima",
  "divisione-ereditaria": "Divisione ereditaria",
  "conflitti-tra-coeredi": "Conflitti tra coeredi",
  "accettazione-eredita": "Accettazione eredità",
  "beneficio-inventario": "Beneficio d’inventario",
  "petizione-ereditaria": "Petizione ereditaria",
  "indegnita-successoria": "Indegnità successoria",
  "vendita-casa-ereditata": "Vendita casa ereditata",
  "gioielli-ereditati": "Gioielli ereditati",
  "collazione-e-donazioni": "Collazione e donazioni",
  "mediazione-ereditaria": "Mediazione ereditaria",
  "rinuncia-eredita": "Rinuncia all’eredità",
  "recupero-somme-ereditarie": "Recupero somme ereditarie",
  "successioni-internazionali": "Successioni internazionali",
};

export function getServiceContactTopic(slug?: string) {
  const topic = slug ? serviceContactTopics[slug] : undefined;
  return topic && contactRequestTopics.includes(topic) ? topic : "";
}
