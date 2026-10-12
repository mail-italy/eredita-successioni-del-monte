import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const connectSources = [
  "'self'",
  "https://www.googletagmanager.com",
  "https://www.google-analytics.com",
  "https://region1.google-analytics.com",
  "https://region1.analytics.google.com",
  "https://www.google.com",
  "https://google.com",
  "https://ad.doubleclick.net",
  "https://stats.g.doubleclick.net",
  "https://pagead2.googlesyndication.com",
  "https://www.google.it",
  "https://www.googleadservices.com",
  "https://googleads.g.doubleclick.net",
];

const imageSources = ["'self'", "data:", "blob:"];

const scriptSources = [
  "'self'",
  "'unsafe-inline'",
  ...(isDev ? ["'unsafe-eval'"] : []),
  "https://www.googletagmanager.com",
  "https://www.google-analytics.com",
  "https://www.googleadservices.com",
  "https://www.google.com",
  "https://googleads.g.doubleclick.net",
];

const styleSources = ["'self'", "'unsafe-inline'"];
const frameSources = ["'self'", "https://www.google.com", "https://www.googletagmanager.com"];

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src ${scriptSources.join(" ")}`,
  `style-src ${styleSources.join(" ")}`,
  "font-src 'self' data:",
  `img-src ${imageSources.join(" ")} https:`,
  `connect-src ${connectSources.join(" ")}`,
  "frame-ancestors 'self'",
  `frame-src ${frameSources.join(" ")}`,
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
]
  .join("; ")
  .replace(/\s{2,}/g, " ")
  .trim();

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    root: process.cwd(),
  },
  async rewrites() {
    // Exact legacy image aliases serve the WebP bytes without storing duplicate PNGs.
    return [
      {
            "source": "/images/dettagli/avvocato-firma-documento.png",
            "destination": "/images/dettagli/avvocato-firma-documento-ottimizzata.webp"
      },
      {
            "source": "/images/dettagli/avvocato-sfoglia-codice-civile.png",
            "destination": "/images/dettagli/avvocato-sfoglia-codice-civile-ottimizzata.webp"
      },
      {
            "source": "/images/dettagli/codici-civile-successioni-ereditarie.png",
            "destination": "/images/dettagli/codici-civile-successioni-ereditarie-ottimizzata.webp"
      },
      {
            "source": "/images/dettagli/libreria-legale-globo.png",
            "destination": "/images/dettagli/libreria-legale-globo-ottimizzata.webp"
      },
      {
            "source": "/images/dettagli/scrivania-legale-penna-occhiali-tazza.png",
            "destination": "/images/dettagli/scrivania-legale-penna-occhiali-tazza-ottimizzata.webp"
      },
      {
            "source": "/images/dettagli/studio-legale-scrivania-penna-occhiali.png",
            "destination": "/images/dettagli/studio-legale-scrivania-penna-occhiali-ottimizzata.webp"
      },
      {
            "source": "/images/dettagli/testamento-penna-ceralacca.png",
            "destination": "/images/dettagli/testamento-penna-ceralacca-ottimizzata.webp"
      },
      {
            "source": "/images/gallery/studio-legale-del-monte-gallery-moodboard.png",
            "destination": "/images/gallery/studio-legale-del-monte-gallery-moodboard-ottimizzata.webp"
      },
      {
            "source": "/images/hero-eredita-home.png",
            "destination": "/images/hero-eredita-home-ottimizzata.webp"
      },
      {
            "source": "/images/hero-successioni-del-monte.png",
            "destination": "/images/hero-successioni-del-monte-ottimizzata.webp"
      },
      {
            "source": "/images/home/eredita-successioni-hero-editoriale.png",
            "destination": "/images/home/eredita-successioni-hero-editoriale-ottimizzata.webp"
      },
      {
            "source": "/images/home/eredita-successioni-hero-testamento-codici.png",
            "destination": "/images/home/eredita-successioni-hero-testamento-codici-ottimizzata.webp"
      },
      {
            "source": "/images/studio/avvocato-federica-del-monte-consulenza-cliente.png",
            "destination": "/images/studio/avvocato-federica-del-monte-consulenza-cliente-ottimizzata.webp"
      },
      {
            "source": "/images/studio/avvocato-federica-del-monte-ritratto-libreria.png",
            "destination": "/images/studio/avvocato-federica-del-monte-ritratto-libreria-ottimizzata.webp"
      },
      {
            "source": "/images/studio/avvocato-federica-del-monte-ritratto-scrivania.png",
            "destination": "/images/studio/avvocato-federica-del-monte-ritratto-scrivania-ottimizzata.webp"
      },
      {
            "source": "/images/studio/avvocato-federica-del-monte-ritratto-ufficio.png",
            "destination": "/images/studio/avvocato-federica-del-monte-ritratto-ufficio-ottimizzata.webp"
      }
];
  },
  async redirects() {
    return [
      { source: "/donazioni", destination: "/collazione-e-donazioni", permanent: true },
      {
        source: "/sitemap_index.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/informativa-sulla-privacy",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/informativa-sulla-privacy/",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/ereditaesuccessioni-it-avvocato-successioni-ereditarie",
        destination: "/avvocato-successioni",
        permanent: true,
      },
      {
        source: "/ereditaesuccessioni-it-avvocato-successioni-ereditarie/",
        destination: "/avvocato-successioni",
        permanent: true,
      },
      {
        source:
          "/avvocato-successioni-a-roma-studio-legale-del-monte-calcolo-eredita-e-successioni",
        destination: "/avvocato-successioni",
        permanent: true,
      },
      {
        source:
          "/avvocato-successioni-a-roma-studio-legale-del-monte-calcolo-eredita-e-successioni/",
        destination: "/avvocato-successioni",
        permanent: true,
      },
      {
        source: "/en",
        destination: "/",
        permanent: true,
      },
      {
        source: "/en/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/en/thankyou-page-en",
        destination: "/contatti",
        permanent: true,
      },
      {
        source: "/en/thankyou-page-en/",
        destination: "/contatti",
        permanent: true,
      },
      {
        source: "/contattaci",
        destination: "/contatti",
        permanent: true,
      },
      {
        source: "/contattaci/",
        destination: "/contatti",
        permanent: true,
      },
      {
        source: "/aree-di-competenza",
        destination: "/servizi",
        permanent: true,
      },
      {
        source: "/aree-di-competenza/",
        destination: "/servizi",
        permanent: true,
      },
      {
        source: "/assistenza-legale-ereditaria-e-successoria",
        destination: "/avvocato-successioni",
        permanent: true,
      },
      {
        source: "/assistenza-legale-ereditaria-e-successoria/",
        destination: "/avvocato-successioni",
        permanent: true,
      },
      {
        source: "/chi-siamo//",
        destination: "/chi-siamo",
        permanent: true,
      },
      {
        source: "/contattaci//",
        destination: "/contatti",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
