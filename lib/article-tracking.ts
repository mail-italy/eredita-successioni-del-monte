import { createArticleAttribution } from "@/lib/article-attribution.mjs";
import { hasTagConsent, readConsent } from "@/lib/consent";

export const articleAttribution = createArticleAttribution({
  site: "eredita",
  origin: "https://ereditaesuccessioni.it",
  contactPaths: ["/contatti"],
  hasAnalyticsConsent: () => {
    const consent = readConsent();
    return Boolean(consent?.analytics && hasTagConsent(consent));
  },
});
