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
export function trackEvent(event: string, params: Record<string, string> = {}) {
  if (typeof window === "undefined" || !isTrackingHost(window.location.hostname)) return;
  if (!window.__ereditaGtmLoaded) return;
  if (!(window.__ereditaAnalyticsAllowed ?? readConsent()?.analytics)) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params, page_location: window.location.origin + window.location.pathname, page_path: window.location.pathname });
}

// Change this only together with the approved GTM trigger migration.
export const CONTACT_SUCCESS_EVENT = process.env.NEXT_PUBLIC_USE_LEAD_EVENT === "true" ? "lead_eredita" : "form_submit";
