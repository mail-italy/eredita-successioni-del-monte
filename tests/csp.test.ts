import assert from "node:assert/strict";
import test from "node:test";
import config from "../next.config";

test("CSP allows required Google Ads endpoints without a universal connect/script wildcard", async () => {
  const headers = await config.headers!();
  const policy = headers[0].headers.find((header) => header.key === "Content-Security-Policy")!.value;
  const directive = (name: string) => policy.split(";").map((item) => item.trim()).find((item) => item.startsWith(name + " "))!.split(/\s+/).slice(1);
  for (const source of ["https://www.googletagmanager.com", "https://www.googleadservices.com", "https://www.google.com"]) assert.ok(directive("script-src").includes(source));
  for (const source of ["https://region1.analytics.google.com", "https://pagead2.googlesyndication.com", "https://www.google.it", "https://ad.doubleclick.net", "https://stats.g.doubleclick.net"]) assert.ok(directive("connect-src").includes(source));
  assert.ok(directive("frame-src").includes("https://www.googletagmanager.com"));
  for (const kind of ["connect-src", "script-src"]) { assert.ok(!directive(kind).includes("*")); assert.ok(!directive(kind).includes("https:")); }
});
