import nodemailer from "nodemailer";
import { createContactHandler } from "@/lib/contact-handler";

export const runtime = "nodejs";
export const POST = createContactHandler(async (config, message) => {
  const transporter = nodemailer.createTransport({
    host: config.host, port: config.port, secure: config.secure,
    auth: { user: config.user, pass: config.pass },
    connectionTimeout: 10_000, socketTimeout: 15_000,
    disableFileAccess: true, disableUrlAccess: true,
  });
  try { return await transporter.sendMail(message); }
  finally { transporter.close(); }
});
