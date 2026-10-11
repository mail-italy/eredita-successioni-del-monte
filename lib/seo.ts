import type { Metadata } from "next";

import {
  ArticleEntry,
  contacts,
  FaqItem,
  HubPage,
  ServicePage,
  siteConfig,
} from "@/lib/content";

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article";
};

export function buildMetadata(input: BuildMetadataInput): Metadata {
  const canonical = new URL(input.path, siteConfig.domain).toString();
  const image = new URL(input.image ?? "/images/homepage-hero-desktop.webp", siteConfig.domain).toString();

  return {
    title: {
      absolute: input.title,
    },
    description: input.description,
    keywords: input.keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title: input.title,
      description: input.description,
      url: canonical,
      siteName: siteConfig.brand,
      type: input.type ?? "website",
      images: [{ url: image, alt: input.title }],
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      images: [image],
      title: input.title,
      description: input.description,
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${siteConfig.domain}/#organization`,
    url: `${siteConfig.domain}/`,
    name: siteConfig.brand,
    legalName: siteConfig.studio,
    areaServed: ["IT", contacts.city],
    telephone: contacts.phoneDisplay,
    email: contacts.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contacts.address,
      addressLocality: contacts.city,
      addressCountry: "IT",
    },
    sameAs: ["https://www.delmontestudiolegale.it/"],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.domain}/#website`,
    publisher: { "@id": `${siteConfig.domain}/#organization` },
    name: siteConfig.brand,
    url: siteConfig.domain,

  };
}

function absoluteUrl(path: string) {
  return new URL(path, siteConfig.domain).toString();
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
  currentPath = items.at(-1)?.path ?? "/",
) {
  const canonical = absoluteUrl(currentPath);

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(faq: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function serviceSchema(page: ServicePage) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: page.title,
    name: page.shortTitle,
    description: page.description,
    provider: {
      "@type": "LegalService",
      "@id": `${siteConfig.domain}/#organization`,
      name: siteConfig.studio,
      areaServed: ["IT", contacts.city],
    },
    areaServed: ["IT", contacts.city],
  };
}

export function articleSchema(article: ArticleEntry) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${siteConfig.domain}/approfondimenti/${article.slug}#article`,
    headline: article.title,
    image: `${siteConfig.domain}/images/homepage-hero-desktop.webp`,
    description: article.excerpt,
    author: {
      "@type": "Organization",
      "@id": `${siteConfig.domain}/#organization`,
      name: siteConfig.studio,
      url: `${siteConfig.domain}/chi-siamo`,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${siteConfig.domain}/#organization`,
      name: siteConfig.brand,
    },
    mainEntityOfPage: new URL(`/approfondimenti/${article.slug}`, siteConfig.domain).toString(),
  };
}

export function collectionSchema(hub: HubPage) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: hub.title,
    description: hub.description,
    url: new URL(`/hub/${hub.slug}`, siteConfig.domain).toString(),
  };
}

export function itemListSchema(
  name: string,
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export function definedTermSetSchema(
  name: string,
  items: { term: string; description: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name,
    hasDefinedTerm: items.map((item) => ({
      "@type": "DefinedTerm",
      name: item.term,
      description: item.description,
      url: item.url,
    })),
  };
}
