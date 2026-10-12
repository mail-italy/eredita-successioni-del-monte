import { notFound } from "next/navigation";

import { ArticlePageTemplate } from "@/components/sections";
import { JsonLd } from "@/components/json-ld";
import { articles, getArticle, getService } from "@/lib/content";
import {
  articleSchema,
  breadcrumbSchema,
  buildMetadata,
  faqSchema,
} from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return {};
  }

  return buildMetadata({
    title: article.seoTitle || article.title,
    image: article.image,
    type: "article",
    description: article.excerpt,
    path: `/approfondimenti/${article.slug}`,
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  const relatedServices = article.relatedServiceSlugs
    .map((serviceSlug) => getService(serviceSlug))
    .filter((value): value is NonNullable<typeof value> => Boolean(value));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Homepage", path: "/" },
            { name: "Approfondimenti", path: "/approfondimenti" },
            { name: article.title, path: `/approfondimenti/${article.slug}` },
          ]),
          articleSchema(article),
          faqSchema(article.faq),
        ]}
      />
      <ArticlePageTemplate article={article} relatedServices={relatedServices} />
    </>
  );
}
