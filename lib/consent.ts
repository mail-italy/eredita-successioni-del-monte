export type ConsentPreferences = { analytics: boolean; marketing: boolean };
export type StoredConsent = ConsentPreferences & { version: 1; updatedAt: number };
export const CONSENT_KEY = "eredita-consent-v1";
export const CONSENT_BLOCK_KEY = "eredita-consent-blocked";
export type ConsentChange = StoredConsent & { canReload: boolean };
let deniedForThisPage = false;
export const CONSENT_EVENT = "eredita-consent-changed";
export const OPEN_CONSENT_EVENT = "eredita-consent-open";
const MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000;
export const GRANULAR_TAG_CONSENT_READY = process.env.NEXT_PUBLIC_GRANULAR_TAG_CONSENT_READY === "true";
export function hasTagConsent(preferences: ConsentPreferences) {
  return GRANULAR_TAG_CONSENT_READY ? preferences.analytics || preferences.marketing : preferences.analytics && preferences.marketing;
}
export const DENIED_CONSENT: ConsentPreferences = { analytics: false, marketing: false };

export function parseConsent(value: string | null, now = Date.now()): StoredConsent | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as Partial<StoredConsent>;
    if (parsed.version !== 1 || typeof parsed.analytics !== "boolean" || typeof parsed.marketing !== "boolean" || typeof parsed.updatedAt !== "number" || parsed.updatedAt > now || now - parsed.updatedAt > MAX_AGE_MS) return null;
    return parsed as StoredConsent;
  } catch { return null; }
}

export function readConsent(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  if (deniedForThisPage) return null;
  try { if (window.sessionStorage.getItem(CONSENT_BLOCK_KEY) === "1") return null; } catch { /* The local record is still checked below. */ }
  try { return parseConsent(window.localStorage.getItem(CONSENT_KEY)); } catch { return null; }
}

export function isTrackingHost(hostname: string) {
  return hostname === "ereditaesuccessioni.it" || hostname === "www.ereditaesuccessioni.it";
}

export function googleConsent(consent: ConsentPreferences) {
  return {
    analytics_storage: consent.analytics ? "granted" : "denied",
    ad_storage: consent.marketing ? "granted" : "denied",
    ad_user_data: consent.marketing ? "granted" : "denied",
    ad_personalization: consent.marketing ? "granted" : "denied",
    personalization_storage: "denied",
    functionality_storage: "denied",
    security_storage: "granted",
  };
}

export function saveConsent(preferences: ConsentPreferences) {
  const value: StoredConsent = { ...preferences, version: 1, updatedAt: Date.now() };
  let saved = false;
  let canReload = false;
  // Removing the old grant first prevents a failed setItem from restoring it on reload.
  try {
    window.localStorage.removeItem(CONSENT_KEY);
    canReload = true;
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(value));
    saved = true;
  } catch { /* Fail closed; a failed write never activates Google tags. */ }
  deniedForThisPage = !saved;
  try {
    if (saved) window.sessionStorage.removeItem(CONSENT_BLOCK_KEY);
    else window.sessionStorage.setItem(CONSENT_BLOCK_KEY, "1");
    canReload = true;
  } catch { /* If neither store can be changed, retain the deny override without reloading. */ }
  const effective: ConsentChange = { ...(saved ? value : { ...DENIED_CONSENT, version: 1 as const, updatedAt: Date.now() }), canReload };
  window.dispatchEvent(new CustomEvent<ConsentChange>(CONSENT_EVENT, { detail: effective }));
  return saved;
}

export function openConsentPreferences() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}
