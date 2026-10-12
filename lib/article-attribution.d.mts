export const ARTICLE_ATTRIBUTION_TTL_MS: number;
export type ArticleContext = { article_id: string; article_title: string; article_path: string };
export type ArticleAttribution = {
  getEventContext(): ArticleContext;
  rememberContactNavigation(href: string): void;
  decorateWhatsAppHref(href: string): string;
  rewriteWhatsAppLinks(root?: Document | Element): void;
  syncPage(): void;
  clear(): void;
};
export function createArticleAttribution(options: {
  site: 'avvocato' | 'eredita' | 'studio'; origin: string; contactPaths: string[];
  hasAnalyticsConsent(): boolean;
}): ArticleAttribution;
