import type { ArticleContext } from "@/lib/article-attribution.mjs";
import { articleAttribution } from "@/lib/article-tracking";
import { isTrackingHost, readConsent } from "@/lib/consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __ereditaGtmLoaded?: boolean;
    __ereditaAnalyticsAllowed?: boolean;
  }
}

// One dataLayer event per action. The GTM container owns GA4 event delivery.
export function trackEvent(event: string, params: Record<string, string> = {}, articleContext?: ArticleContext) {
  if (typeof window === "undefined" || !isTrackingHost(window.location.hostname)) return;
  if (!window.__ereditaGtmLoaded) return;
  if (!(window.__ereditaAnalyticsAllowed ?? readConsent()?.analytics)) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params, ...(articleContext ?? articleAttribution.getEventContext()), page_location: window.location.origin + window.location.pathname, page_path: window.location.pathname });
}

// Reserved for the API-confirmed delivery path. Google's automatic form_submit
// also fires for failed submissions and must never trigger a lead conversion.
// GTM maps this signal to the existing GA4 events and Google Ads conversion label.
export const CONTACT_SUCCESS_EVENT = "lead_eredita";
