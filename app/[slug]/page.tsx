import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { ServicePageTemplate } from "@/components/sections";
import { articles, getService, moneyPages } from "@/lib/content";
import {
  breadcrumbSchema,
  buildMetadata,
  faqSchema,
  serviceSchema,
} from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return moneyPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return {};
  }

  return buildMetadata({
    title: service.seoTitle ?? service.title,
    description: service.seoDescription ?? service.description,
    path: `/${service.slug}`,
    keywords: service.keywords,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  const relatedArticles = articles.filter((article) =>
    service.relatedArticles.includes(article.slug),
  );

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Homepage", path: "/" },
            { name: service.title, path: `/${service.slug}` },
          ]),
          serviceSchema(service),
          faqSchema(service.faq),
        ]}
      />
      <ServicePageTemplate service={service} relatedArticles={relatedArticles} />
    </>
  );
}
