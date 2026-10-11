import assert from "node:assert/strict";
import test from "node:test";
import { DENIED_CONSENT, googleConsent, hasTagConsent, isTrackingHost, parseConsent } from "../lib/consent";

test("consent rejects malformed, expired and future records", () => {
  const now = 1000 * 60 * 60 * 24 * 365;
  for (const value of [null, "invalid", "{}", JSON.stringify({ version: 1, analytics: true, marketing: true, updatedAt: 0 }), JSON.stringify({ version: 1, analytics: true, marketing: true, updatedAt: now + 1 })]) assert.equal(parseConsent(value, now), null);
  assert.equal(parseConsent(JSON.stringify({ version: 1, analytics: false, marketing: true, updatedAt: now }), now)?.analytics, false);
});
test("Google storage defaults are denied and conservative gate needs both choices", () => {
  const defaults = googleConsent(DENIED_CONSENT); assert.equal(defaults.ad_storage, "denied"); assert.equal(defaults.analytics_storage, "denied"); assert.equal(defaults.ad_user_data, "denied"); assert.equal(defaults.ad_personalization, "denied");
  assert.equal(hasTagConsent(DENIED_CONSENT), false); assert.equal(hasTagConsent({ analytics: true, marketing: false }), false); assert.equal(hasTagConsent({ analytics: false, marketing: true }), false); assert.equal(hasTagConsent({ analytics: true, marketing: true }), true);
});
test("local and preview hosts never track", () => {
  for (const host of ["localhost", "127.0.0.1", "::1", "demo.localhost", "preview.vercel.app", "ereditaesuccessioni.it.attacker.test"]) assert.equal(isTrackingHost(host), false);
  assert.equal(isTrackingHost("ereditaesuccessioni.it"), true);
});

test("storage failures cannot revive a previously granted consent", async () => {
  const { CONSENT_KEY, CONSENT_BLOCK_KEY, saveConsent, readConsent } = await import("../lib/consent");
  const original = Object.getOwnPropertyDescriptor(globalThis, "window");
  const local = new Map<string, string>();
  const session = new Map<string, string>();
  let failLocalSet = false, failLocalRemove = false, failSession = false;
  const events: CustomEvent[] = [];
  Object.defineProperty(globalThis, "window", { configurable: true, value: {
    localStorage: { getItem: (key: string) => local.get(key) ?? null, setItem: (key: string, value: string) => { if (failLocalSet) throw new Error("QuotaExceededError"); local.set(key, value); }, removeItem: (key: string) => { if (failLocalRemove) throw new Error("SecurityError"); local.delete(key); } },
    sessionStorage: { getItem: (key: string) => session.get(key) ?? null, setItem: (key: string, value: string) => { if (failSession) throw new Error("SecurityError"); session.set(key, value); }, removeItem: (key: string) => { if (failSession) throw new Error("SecurityError"); session.delete(key); } },
    dispatchEvent: (event: CustomEvent) => { events.push(event); return true; },
  } });
  try {
    assert.equal(saveConsent({ analytics: true, marketing: true }), true);
    assert.equal(readConsent()?.analytics, true);
    failLocalSet = true;
    assert.equal(saveConsent(DENIED_CONSENT), false);
    assert.equal(local.has(CONSENT_KEY), false, "old grant removed before failed setItem");
    assert.equal(readConsent(), null);
    assert.equal(events.at(-1)?.detail.analytics, false);
    assert.equal(events.at(-1)?.detail.canReload, true, "reload reads no previous grant");

    failLocalSet = false; saveConsent({ analytics: true, marketing: true });
    failLocalSet = true; failLocalRemove = true;
    assert.equal(saveConsent(DENIED_CONSENT), false);
    assert.equal(session.get(CONSENT_BLOCK_KEY), "1", "session denial survives reload if local removal fails");
    assert.equal(readConsent(), null);
    assert.equal(events.at(-1)?.detail.canReload, true);

    failLocalSet = false; failLocalRemove = false; saveConsent({ analytics: true, marketing: true });
    failLocalSet = true; failLocalRemove = true; failSession = true;
    assert.equal(saveConsent(DENIED_CONSENT), false);
    assert.equal(readConsent(), null, "in-memory denial remains effective if every store is blocked");
    assert.equal(events.at(-1)?.detail.canReload, false, "no reload into stale consent when neither store can be changed");
    assert.equal(events.at(-1)?.detail.marketing, false);
  } finally {
    failLocalSet = false; failLocalRemove = false; failSession = false; saveConsent(DENIED_CONSENT);
    if (original) Object.defineProperty(globalThis, "window", original); else Reflect.deleteProperty(globalThis, "window");
  }
});
