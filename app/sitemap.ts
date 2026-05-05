import type { MetadataRoute } from "next";

import { articles, hubPages, moneyPages, siteConfig } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/chi-siamo",
    "/contatti",
    "/privacy",
    "/servizi",
    "/hub",
    "/approfondimenti",
    "/glossario-successorio",
    "/faq-tematiche",
    "/divisione-gioielli-eredita",
  ];

  const allPaths = [
    ...staticPages,
    ...moneyPages.map((page) => `/${page.slug}`),
    ...hubPages.map((page) => `/hub/${page.slug}`),
    ...articles.map((article) => `/approfondimenti/${article.slug}`),
  ];

  return allPaths.map((path) => ({
    url: `${siteConfig.domain}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
