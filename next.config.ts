import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const connectSources = [
  "'self'",
  "https://www.googletagmanager.com",
  "https://www.google-analytics.com",
  "https://region1.google-analytics.com",
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
];

const styleSources = ["'self'", "'unsafe-inline'"];
const frameSources = ["'self'", "https://www.google.com"];

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
  async redirects() {
    return [
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
