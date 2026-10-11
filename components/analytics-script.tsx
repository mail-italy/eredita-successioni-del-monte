"use client";

import { useEffect } from "react";
import { CookieConsent } from "@/components/cookie-consent";
import { CONSENT_EVENT, CONSENT_KEY, DENIED_CONSENT, googleConsent, hasTagConsent, isTrackingHost, readConsent, type ConsentChange, type ConsentPreferences } from "@/lib/consent";
import { trackEvent } from "@/lib/tracking";

const GTM_ID = "GTM-P2M4SXP4";

function clearMeasurementCookies(preferences: ConsentPreferences) {
  for (const part of document.cookie.split(";")) {
    const name = part.split("=")[0].trim();
    if ((!preferences.analytics && /^_ga(?:_|$)|^_gid$|^_gat/.test(name)) || (!preferences.marketing && /^_gcl_/.test(name))) {
      for (const domain of ["", window.location.hostname, ".ereditaesuccessioni.it"]) {
        document.cookie = `${name}=; Max-Age=0; Path=/;${domain ? ` Domain=${domain};` : ""} SameSite=Lax; Secure`;
      }
    }
  }
}

export function AnalyticsScript() {
  useEffect(() => {
    // Local development, preview hosts and tests never load Google tags.
    if (!isTrackingHost(window.location.hostname)) return;
    let current: ConsentPreferences = DENIED_CONSENT;
    window.dataLayer = window.dataLayer || [];
    // Google Tag expects an Arguments object in the queue, not a rest-parameter array.
    // eslint-disable-next-line prefer-rest-params
    window.gtag = window.gtag || function () { window.dataLayer?.push(arguments); };
    window.gtag("consent", "default", googleConsent(DENIED_CONSENT));
    window.gtag("set", "ads_data_redaction", true);

    const apply = (next: ConsentPreferences, canReload = true) => {
      const revoked = (current.analytics && !next.analytics) || (current.marketing && !next.marketing);
      current = next;
      window.__ereditaAnalyticsAllowed = next.analytics && hasTagConsent(next);
      window.gtag?.("consent", "update", googleConsent(next));
      if (revoked) {
        clearMeasurementCookies(next);
        // Already-running third-party scripts cannot be unloaded reliably.
        // Reload with the saved choice so the gate is applied before tags restart.
        if (window.__ereditaGtmLoaded && canReload) { window.location.reload(); return; }
      }
      if (!hasTagConsent(next) || window.__ereditaGtmLoaded) return;
      window.__ereditaGtmLoaded = true;
      window.dataLayer?.push({ "gtm.start": Date.now(), event: "gtm.js" });
      const script = document.createElement("script");
      script.id = "google-tag-manager-consented";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
      document.head.appendChild(script);
    };
    apply(readConsent() ?? DENIED_CONSENT);
    const changed = (event: Event) => { const choice = (event as CustomEvent<ConsentChange>).detail; apply(choice, choice.canReload); };
    const storageChanged = (event: StorageEvent) => { if (event.key === CONSENT_KEY) apply(readConsent() ?? DENIED_CONSENT); };
    const clicked = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest("a[href]");
      const href = anchor?.getAttribute("href")?.toLowerCase() ?? "";
      if (/^(https?:\/\/(wa\.me|api\.whatsapp\.com)\/|whatsapp:)/.test(href)) trackEvent("click_whatsapp", { lead_type: "whatsapp" });
      else if (href.startsWith("tel:")) trackEvent("click_phone", { lead_type: "phone" });
      else if (href.startsWith("mailto:")) trackEvent("click_email", { lead_type: "email" });
      else {
        const target = event.target.closest<HTMLElement>("[data-track-event]");
        if (target?.dataset.trackEvent) trackEvent(target.dataset.trackEvent, { event_label: target.dataset.trackLabel ?? "" });
      }
    };
    window.addEventListener(CONSENT_EVENT, changed);
    window.addEventListener("storage", storageChanged);
    window.addEventListener("click", clicked, { passive: true });
    return () => { window.removeEventListener(CONSENT_EVENT, changed); window.removeEventListener("storage", storageChanged); window.removeEventListener("click", clicked); };
  }, []);
  return <CookieConsent />;
}
