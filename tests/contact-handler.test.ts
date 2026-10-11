import assert from "node:assert/strict";
import test from "node:test";
import { createContactHandler } from "../lib/contact-handler";
import { CONTACT_LIMITS } from "../lib/contact-validation";
import type { SendMailOptions } from "nodemailer";

const env = { VERCEL_ENV: "production", CONTACT_FROM_EMAIL: "site@example.test", CONTACT_TO_EMAIL: "info@delmontestudiolegale.it", SMTP_HOST: "smtp.example.test", SMTP_PORT: "465", SMTP_USER: "mock", SMTP_PASS: "mock" };
function form(changes: Record<string, string | undefined> = {}) {
  const data = new FormData();
  for (const [key, value] of Object.entries({ name: "Mario", surname: "Rossi", phone: "+39 06 1234567", email: "mario@example.test", topic: "Altro", caseSummary: "Esempio di richiesta per test, senza invio.", privacy: "accepted", ...changes })) if (value !== undefined) data.set(key, value);
  return data;
}
function request(data = form(), origin = "http://localhost:4312") {
  return new Request("http://localhost:4312/api/contact", { method: "POST", headers: { origin, "x-forwarded-for": "192.0.2.10" }, body: data });
}
function setup(options: { reject?: boolean; smtp?: boolean; accepted?: string[]; now?: () => number } = {}) {
  const sent: SendMailOptions[] = [];
  const handler = createContactHandler(async (_, mail) => {
    sent.push(mail);
    if (options.reject) throw new Error("Mock SMTP failure");
    return { accepted: options.accepted ?? [env.CONTACT_TO_EMAIL] };
  }, options.smtp === false ? { VERCEL_ENV: "production" } : env, options.now);
  return { sent, handler };
}

test("production submission reaches only injected SMTP mock with escaped HTML and safe attachment", async () => {
  const { sent, handler } = setup();
  const data = form({ name: "<Mario>", caseSummary: "<script>alert(1)</script>" });
  data.append("attachments", new File(["%PDF-1.4\nTest"], "documento.pdf", { type: "application/pdf" }));
  assert.equal((await handler(request(data))).status, 200);
  assert.equal(sent.length, 1);
  assert.equal(sent[0].replyTo, "mario@example.test");
  assert.equal(sent[0].disableFileAccess, true);
  assert.equal(sent[0].disableUrlAccess, true);
  assert.match(String(sent[0].html), /&lt;script&gt;/);
  assert.doesNotMatch(String(sent[0].html), /<script>/);
});

test("recipient comes from server env and the visible domain cannot be replaced by submitted provenance", async () => {
  const { sent, handler } = setup();
  const data = form({ to: "other@example.invalid", CONTACT_TO_EMAIL: "other@example.invalid", source: "forged.example.invalid", origine: "forged.example.invalid", origin: "forged.example.invalid" });
  assert.equal((await handler(request(data))).status, 200);
  assert.equal(sent.length, 1);
  assert.equal(sent[0].to, env.CONTACT_TO_EMAIL);
  assert.match(String(sent[0].subject), /^\[ereditaesuccessioni\.it\] /);
  assert.match(String(sent[0].text), /^Sito di provenienza: ereditaesuccessioni\.it/);
  assert.match(String(sent[0].html), /Sito di provenienza: ereditaesuccessioni\.it/);
  for (const field of [sent[0].subject, sent[0].text, sent[0].html]) assert.doesNotMatch(String(field), /forged\.example\.invalid|other@example\.invalid/);
});

for (const [label, deployment] of Object.entries({ preview: "preview", development: "development", absent: undefined, invalid: "Production" })) {
  test(`blocks ${label} deployment even with SMTP credentials`, async () => {
    let deliveries = 0;
    const handler = createContactHandler(async () => { deliveries += 1; return { accepted: [env.CONTACT_TO_EMAIL] }; }, { ...env, VERCEL_ENV: deployment });
    const input = request();
    assert.equal((await handler(input)).status, 503);
    assert.equal(input.bodyUsed, false);
    assert.equal(deliveries, 0);
  });
}

test("delivery kill switch blocks production before reading the body or invoking SMTP", async () => {
  let deliveries = 0;
  const runtimeEnv = { ...env, CONTACT_DISABLE_DELIVERY: "false" };
  const handler = createContactHandler(async () => { deliveries += 1; return { accepted: [env.CONTACT_TO_EMAIL] }; }, runtimeEnv);
  assert.equal((await handler(request())).status, 200);
  runtimeEnv.CONTACT_DISABLE_DELIVERY = "true";
  const input = request();
  assert.equal((await handler(input)).status, 503);
  assert.equal(input.bodyUsed, false);
  assert.equal(deliveries, 1);
});

for (const [label, values] of Object.entries({ missing: { name: "" }, longEmail: { email: "x".repeat(255) }, invalidEmail: { email: "not-an-address" }, headerInjection: { email: "a@example.test\r\nBcc: other@example.test" }, privacy: { privacy: "no" }, honeypot: { website: "spam" }, longMessage: { caseSummary: "x".repeat(8001) }, topic: { topic: "unknown" } })) {
  test(`rejects ${label} before SMTP`, async () => { const { handler, sent } = setup(); assert.equal((await handler(request(form(values)))).status, 400); assert.equal(sent.length, 0); });
}

test("rejects duplicate field and cross-origin requests", async () => {
  const { handler, sent } = setup(); const data = form(); data.append("email", "other@example.test");
  assert.equal((await handler(request(data))).status, 400);
  assert.equal((await handler(request(form(), "https://untrusted.example"))).status, 403);
  assert.equal(sent.length, 0);
});

test("limits attachment count, individual/aggregate sizes, MIME and signature", async () => {
  const cases = [
    () => Array.from({ length: 4 }, (_, i) => new File(["%PDF-test"], `${i}.pdf`, { type: "application/pdf" })),
    () => [new File([new Uint8Array(CONTACT_LIMITS.fileBytes + 1)], "large.pdf", { type: "application/pdf" })],
    () => [new File([new Uint8Array(2 * 1024 * 1024)], "a.pdf", { type: "application/pdf" }), new File([new Uint8Array(1.6 * 1024 * 1024)], "b.pdf", { type: "application/pdf" })],
    () => [new File(["%PDF-test"], "wrong.pdf", { type: "image/png" })],
    () => [new File(["MZ-executable"], "fake.pdf", { type: "application/pdf" })],
  ];
  for (const build of cases) {
    const { handler, sent } = setup(); const data = form(); for (const file of build()) data.append("attachments", file);
    assert.equal((await handler(request(data))).status, 400); assert.equal(sent.length, 0);
  }
});

test("stream limit rejects a body without Content-Length and malformed multipart", async () => {
  const { handler, sent } = setup();
  const oversized = new Request("http://localhost:4312/api/contact", { method: "POST", headers: { "content-type": "multipart/form-data; boundary=test" }, body: new Uint8Array(CONTACT_LIMITS.bodyBytes + 1) });
  assert.equal((await handler(oversized)).status, 413);
  const malformed = new Request("http://localhost:4312/api/contact", { method: "POST", headers: { "content-type": "multipart/form-data; boundary=test" }, body: "invalid" });
  assert.equal((await handler(malformed)).status, 400);
  assert.equal(sent.length, 0);
});

test("SMTP unavailable, rejected and failed never claim success", async () => {
  assert.equal((await setup({ smtp: false }).handler(request())).status, 503);
  assert.equal((await setup({ reject: true }).handler(request())).status, 502);
  assert.equal((await setup({ accepted: [] }).handler(request())).status, 502);
});

test("per-instance rate limit rejects ninth request and expires after 15 minutes", async () => {
  let clock = 1000; const { handler, sent } = setup({ now: () => clock });
  for (let i = 0; i < 8; i++) assert.equal((await handler(request())).status, 200);
  const limited = await handler(request()); assert.equal(limited.status, 429); assert.equal(limited.headers.get("retry-after"), "900");
  assert.equal(sent.length, 8); clock += 15 * 60 * 1000 + 1; assert.equal((await handler(request())).status, 200);
});
