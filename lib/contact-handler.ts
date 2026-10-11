import { NextResponse } from "next/server";
import type { SendMailOptions, SentMessageInfo } from "nodemailer";
import { createHash, randomBytes } from "node:crypto";
import { contactRequestTopics } from "@/lib/site-config";
import { ContactInputError, hasExpectedSignature, readLimitedFormData, validatedField, validateAttachments } from "@/lib/contact-validation";


const deliveryNotConfiguredMessage =
  "Il modulo non è al momento disponibile. Contatta lo studio tramite telefono o email.";
const deliveryFailureMessage =
  "La richiesta non è stata inviata via email. Riprova oppure usa temporaneamente telefono, WhatsApp o Mail.";
const emailBannerText = "Richiesta proveniente dal sito Eredità e Successioni";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getSmtpConfig(env: Record<string, string | undefined>) {
  const from = env.CONTACT_FROM_EMAIL?.trim() ?? "";
  const to = env.CONTACT_TO_EMAIL?.trim() ?? "";
  const host = env.SMTP_HOST?.trim() ?? "";
  const port = Number(env.SMTP_PORT ?? "");
  const user = env.SMTP_USER?.trim() ?? "";
  const pass = env.SMTP_PASS ?? "";

  if (!from || !to || !host || !Number.isInteger(port) || port <= 0 || !user || !pass) {
    return null;
  }

  return {
    from,
    to,
    host,
    port,
    user,
    pass,
    secure: port === 465,
  };
}

type SmtpConfig = NonNullable<ReturnType<typeof getSmtpConfig>>;
export type DeliverMessage = (config: SmtpConfig, message: SendMailOptions) => Promise<Pick<SentMessageInfo, "accepted">>;

export function createContactHandler(deliver: DeliverMessage, env: Record<string, string | undefined> = process.env, now = Date.now) {
  const attempts = new Map<string, { count: number; until: number }>();
  const salt = randomBytes(16).toString("hex");
  return async function POST(request: Request) {
    // Preview deployments inherit SMTP credentials: only explicit production may deliver.
    // Read the server-only override on every request so delivery can be disabled independently.
    if (env.VERCEL_ENV !== "production" || env.CONTACT_DISABLE_DELIVERY === "true") {
      return NextResponse.json({ message: deliveryNotConfiguredMessage }, { status: 503 });
    }
    const origin = request.headers.get("origin");
    if (origin && origin !== new URL(request.url).origin) return NextResponse.json({ message: "Origine richiesta non consentita." }, { status: 403 });
    // Per-instance abuse mitigation; a distributed edge limit is still required in production.
    const address = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const key = createHash("sha256").update(salt + address).digest("hex");
    const timestamp = now();
    for (const [id, item] of attempts) if (item.until <= timestamp) attempts.delete(id);
    if (attempts.size >= 10000 && !attempts.has(key)) return NextResponse.json({ message: "Riprova più tardi." }, { status: 429 });
    const attempt = attempts.get(key) ?? { count: 0, until: timestamp + 15 * 60 * 1000 };
    if (attempt.count >= 8) return NextResponse.json({ message: "Troppe richieste. Riprova tra qualche minuto." }, { status: 429, headers: { "Retry-After": "900" } });
    attempt.count += 1;
    attempts.set(key, attempt);

    let name: string, surname: string, phone: string, email: string, topic: string, caseSummary: string;
    let files: File[];
    try {
      const formData = await readLimitedFormData(request);
      if (String(formData.get("website") ?? "").trim()) throw new ContactInputError("Richiesta non valida.");
      if (formData.get("privacy") !== "accepted") throw new ContactInputError("È necessario accettare l’informativa privacy.");
      name = validatedField(formData, "name");
      surname = validatedField(formData, "surname");
      phone = validatedField(formData, "phone");
      email = validatedField(formData, "email");
      topic = validatedField(formData, "topic");
      caseSummary = validatedField(formData, "caseSummary");
      if (!/^[^\s@<>,;]+@[^\s@<>,;]+\.[^\s@<>,;]+$/.test(email)) throw new ContactInputError("Inserisci un indirizzo email valido.");
      if (!/^[+()\d .-]{5,40}$/.test(phone)) throw new ContactInputError("Inserisci un numero di telefono valido.");
      if (!contactRequestTopics.includes(topic)) throw new ContactInputError("Seleziona un ambito della richiesta valido.");
      const attachments = formData.getAll("attachments");
      if (attachments.some((item) => !(item instanceof File))) throw new ContactInputError("Allegato non valido.");
      files = (attachments as File[]).filter((file) => file.name !== "");
      const error = validateAttachments(files);
      if (error) throw new ContactInputError(error);
      for (const file of files) {
        if (!hasExpectedSignature(file.name, new Uint8Array(await file.slice(0, 8).arrayBuffer()))) throw new ContactInputError("Un allegato non corrisponde al formato dichiarato.");
      }
    } catch (error) {
      return NextResponse.json({ message: error instanceof ContactInputError ? error.message : "Richiesta non valida." }, { status: error instanceof ContactInputError ? error.status : 400 });
    }

  const smtpConfig = getSmtpConfig(env);

  if (!smtpConfig) {
    return NextResponse.json({ message: deliveryNotConfiguredMessage }, { status: 503 });
  }

  const attachments = await Promise.all(
    files.map(async (file) => ({
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer()),
      contentType: file.type || undefined,
    })),
  );

  const fullName = `${name} ${surname}`.trim();
  const subject = `Nuova richiesta contatti: ${fullName} - ${topic}`;
  const escapedSummary = escapeHtml(caseSummary).replaceAll("\n", "<br />");
  const attachmentSummary =
    attachments.length > 0
      ? attachments.map((attachment) => escapeHtml(attachment.filename ?? "")).join(", ")
      : "Nessuno";

  const text = [
    emailBannerText,
    "",
    "Nuova richiesta dal modulo contatti",
    `Nome: ${name}`,
    `Cognome: ${surname}`,
    `Telefono: ${phone}`,
    `Email: ${email}`,
    `Ambito richiesta: ${topic}`,
    "Sintesi del caso:",
    caseSummary,
    `Allegati: ${attachmentSummary}`,
  ].join("\n");

  const html = `
    <div style="margin:0; padding:32px 0; background:#f4efe7; color:#16202b;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
        <tr>
          <td align="center" style="padding:0 16px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:720px; border-collapse:separate; border-spacing:0; overflow:hidden; background:#ffffff; border:1px solid rgba(48,65,85,0.12); border-radius:20px; box-shadow:0 18px 45px rgba(16,32,51,0.08);">
              <tr>
                <td style="background:#c7792d; padding:16px 24px; font-family:Arial, sans-serif; font-size:15px; font-weight:700; line-height:1.45; color:#ffffff;">
                  ${emailBannerText}
                </td>
              </tr>
              <tr>
                <td style="padding:28px 24px 10px; font-family:Arial, sans-serif;">
                  <p style="margin:0 0 8px; font-size:12px; letter-spacing:0.16em; text-transform:uppercase; color:#8b6a3e; font-weight:700;">
                    Studio Legale Del Monte
                  </p>
                  <h1 style="margin:0; font-size:24px; line-height:1.2; color:#16202b;">
                    Nuova richiesta dal modulo contatti
                  </h1>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 24px 28px; font-family:Arial, sans-serif; color:#16202b;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
                    <tr>
                      <td style="padding:0 0 12px; width:180px; vertical-align:top; font-size:13px; line-height:1.45; color:#7b8796; font-weight:700;">Nome</td>
                      <td style="padding:0 0 12px; font-size:15px; line-height:1.55; color:#16202b;">${escapeHtml(name)}</td>
                    </tr>
                    <tr>
                      <td style="padding:0 0 12px; width:180px; vertical-align:top; font-size:13px; line-height:1.45; color:#7b8796; font-weight:700;">Cognome</td>
                      <td style="padding:0 0 12px; font-size:15px; line-height:1.55; color:#16202b;">${escapeHtml(surname)}</td>
                    </tr>
                    <tr>
                      <td style="padding:0 0 12px; width:180px; vertical-align:top; font-size:13px; line-height:1.45; color:#7b8796; font-weight:700;">Telefono</td>
                      <td style="padding:0 0 12px; font-size:15px; line-height:1.55; color:#16202b;">${escapeHtml(phone)}</td>
                    </tr>
                    <tr>
                      <td style="padding:0 0 12px; width:180px; vertical-align:top; font-size:13px; line-height:1.45; color:#7b8796; font-weight:700;">Email</td>
                      <td style="padding:0 0 12px; font-size:15px; line-height:1.55; color:#16202b;">${escapeHtml(email)}</td>
                    </tr>
                    <tr>
                      <td style="padding:0 0 12px; width:180px; vertical-align:top; font-size:13px; line-height:1.45; color:#7b8796; font-weight:700;">Ambito richiesta</td>
                      <td style="padding:0 0 12px; font-size:15px; line-height:1.55; color:#16202b;">${escapeHtml(topic)}</td>
                    </tr>
                    <tr>
                      <td style="padding:4px 0 12px; width:180px; vertical-align:top; font-size:13px; line-height:1.45; color:#7b8796; font-weight:700;">Sintesi del caso</td>
                      <td style="padding:4px 0 12px;">
                        <div style="padding:16px 18px; border-radius:16px; background:#f7f3ec; border:1px solid rgba(48,65,85,0.1); font-size:15px; line-height:1.7; color:#16202b;">
                          ${escapedSummary}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:0; width:180px; vertical-align:top; font-size:13px; line-height:1.45; color:#7b8796; font-weight:700;">Allegati</td>
                      <td style="padding:0; font-size:15px; line-height:1.55; color:#16202b;">${attachmentSummary}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  `;

  try {
    const info = await deliver(smtpConfig, {
      disableFileAccess: true,
      disableUrlAccess: true,
      from: smtpConfig.from,
      to: smtpConfig.to,
      replyTo: email,
      subject,
      text,
      html,
      attachments,
    });

    const acceptedRecipients = (Array.isArray(info.accepted) ? info.accepted : []).map((recipient: unknown) => String(recipient).toLowerCase());

    if (acceptedRecipients.length === 0 || !acceptedRecipients.includes(smtpConfig.to.toLowerCase())) {
      return NextResponse.json({ message: deliveryFailureMessage }, { status: 502 });
    }

    return NextResponse.json(
      {
        message:
          "Richiesta inviata correttamente. Lo studio ti ricontatterà dopo aver esaminato le informazioni ricevute.",
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json({ message: deliveryFailureMessage }, { status: 502 });
  }
}

}
