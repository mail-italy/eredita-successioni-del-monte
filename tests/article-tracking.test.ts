import assert from "node:assert/strict";
import test from "node:test";

import { articleAttribution } from "../lib/article-tracking";
import { CONSENT_KEY } from "../lib/consent";
import { CONTACT_SUCCESS_EVENT, trackEvent } from "../lib/tracking";

test("article contact events keep their existing names, clear stale fields and respect consent/host gates", () => {
  const oldWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  const oldDocument = Object.getOwnPropertyDescriptor(globalThis, "document");
  const session = new Map<string, string>();
  const local = new Map<string, string>();
  const article = {
    "data-editorial-id": "eredita-001",
    "data-editorial-title": "Come cercare un testamento",
    "data-editorial-path": "/approfondimenti/come-cercare-un-testamento",
  };
  let marker: Record<string, string> | null = article;
  const location = {
    hostname: "ereditaesuccessioni.it",
    origin: "https://ereditaesuccessioni.it",
    pathname: article["data-editorial-path"],
    href: "https://ereditaesuccessioni.it" + article["data-editorial-path"] + "?utm_source=not-copied#private-fragment",
  };
  const dataLayer: Record<string, string>[] = [];
  const browser = {
    location,
    dataLayer,
    __ereditaGtmLoaded: true,
    __ereditaAnalyticsAllowed: true,
    localStorage: { getItem: (key: string) => local.get(key) ?? null },
    sessionStorage: {
      getItem: (key: string) => session.get(key) ?? null,
      setItem: (key: string, value: string) => session.set(key, value),
      removeItem: (key: string) => session.delete(key),
    },
  };
  Object.defineProperty(globalThis, "window", { configurable: true, value: browser });
  Object.defineProperty(globalThis, "document", {
    configurable: true,
    value: { querySelector: () => marker ? { getAttribute: (key: string) => marker?.[key] ?? null } : null },
  });
  const setConsent = (analytics: boolean, marketing: boolean) => {
    local.set(CONSENT_KEY, JSON.stringify({ version: 1, updatedAt: Date.now(), analytics, marketing }));
    browser.__ereditaAnalyticsAllowed = analytics && marketing;
  };
  try {
    setConsent(true, true);
    articleAttribution.syncPage();
    trackEvent("click_whatsapp", { lead_type: "whatsapp" });
    assert.equal(dataLayer.length, 1);
    assert.equal(dataLayer[0].event, "click_whatsapp");
    assert.equal(dataLayer[0].article_id, "eredita-001");
    assert.equal(dataLayer[0].article_title, article["data-editorial-title"]);
    assert.equal(dataLayer[0].article_path, article["data-editorial-path"]);
    assert.equal(dataLayer[0].page_location, location.origin + location.pathname);
    assert.ok(!JSON.stringify(dataLayer).includes("not-copied"));

    articleAttribution.rememberContactNavigation("/contatti#modulo-contatti");
    marker = null;
    location.pathname = "/contatti";
    location.href = location.origin + location.pathname;
    articleAttribution.syncPage();
    const submissionContext = articleAttribution.getEventContext();
    trackEvent("click_phone", { lead_type: "phone" });
    assert.equal(dataLayer.at(-1)?.article_id, "eredita-001");

    // A request may finish after a route change: its original article stays bound.
    location.pathname = "/";
    articleAttribution.syncPage();
    trackEvent(CONTACT_SUCCESS_EVENT, { lead_type: "form_submit" }, submissionContext);
    assert.equal(dataLayer.at(-1)?.event, "lead_eredita");
    assert.equal(dataLayer.at(-1)?.article_id, "eredita-001");
    trackEvent("click_email", { lead_type: "email" });
    assert.equal(dataLayer.at(-1)?.article_id, "");
    assert.equal(dataLayer.at(-1)?.article_title, "");
    assert.equal(dataLayer.at(-1)?.article_path, "");

    const count = dataLayer.length;
    setConsent(false, false);
    articleAttribution.syncPage();
    trackEvent("click_whatsapp", { lead_type: "whatsapp" });
    assert.equal(dataLayer.length, count);
    assert.equal(session.size, 0);
    setConsent(true, false);
    marker = article;
    location.pathname = article["data-editorial-path"];
    articleAttribution.rememberContactNavigation("/contatti");
    assert.equal(session.size, 0, "the site's current conservative tag gate still applies");
    trackEvent("click_phone");
    assert.equal(dataLayer.length, count);

    setConsent(true, true);
    browser.location.hostname = "localhost";
    trackEvent("click_email");
    assert.equal(dataLayer.length, count, "preview/local hosts remain excluded");
  } finally {
    articleAttribution.clear();
    if (oldWindow) Object.defineProperty(globalThis, "window", oldWindow); else Reflect.deleteProperty(globalThis, "window");
    if (oldDocument) Object.defineProperty(globalThis, "document", oldDocument); else Reflect.deleteProperty(globalThis, "document");
  }
});
