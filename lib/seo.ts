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
};

export function buildMetadata(input: BuildMetadataInput): Metadata {
  const canonical = new URL(input.path, siteConfig.domain).toString();

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
      type: "website",
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LegalService", "Attorney"],
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
    sameAs: [contacts.whatsappHref],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.brand,
    url: siteConfig.domain,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.domain}/approfondimenti?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, siteConfig.domain).toString(),
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
    headline: article.title,
    description: article.excerpt,
    author: {
      "@type": "Person",
      name: "Studio Legale Del Monte",
    },
    publisher: {
      "@type": "Organization",
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
