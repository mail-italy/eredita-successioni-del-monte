export const CONTACT_LIMITS = {
  name: 100, surname: 100, phone: 40, email: 254, topic: 120, caseSummary: 8000,
  files: 3, fileBytes: 2 * 1024 * 1024, totalFileBytes: 3.5 * 1024 * 1024,
  bodyBytes: 4 * 1024 * 1024,
} as const;

const mimeByExtension: Record<string, string[]> = {
  pdf: ["application/pdf"], doc: ["application/msword"],
  docx: ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  jpg: ["image/jpeg"], jpeg: ["image/jpeg"], png: ["image/png"],
};
export type AttachmentInfo = Pick<File, "name" | "size" | "type">;
export function validateAttachments(files: AttachmentInfo[]): string | null {
  if (files.length > CONTACT_LIMITS.files) return "Puoi allegare al massimo 3 file.";
  if (files.reduce((sum, file) => sum + file.size, 0) > CONTACT_LIMITS.totalFileBytes) return "Gli allegati non possono superare complessivamente 3,5 MB.";
  for (const file of files) {
    if (file.size === 0 || file.size > CONTACT_LIMITS.fileBytes) return "Ogni allegato deve essere non vuoto e non superare 2 MB.";
    if (file.name.length > 180 || Array.from(file.name).some((character) => character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127 || character === "/" || character === "\\")) return "Il nome di un allegato non è valido.";
    const extension = file.name.toLowerCase().split(".").pop() ?? "";
    const mimes = mimeByExtension[extension];
    if (!mimes || (file.type && !mimes.includes(file.type))) return "Formato allegato non supportato. Usa PDF, DOC, DOCX, JPG, JPEG o PNG.";
  }
  return null;
}

export function hasExpectedSignature(name: string, bytes: Uint8Array) {
  const extension = name.toLowerCase().split(".").pop();
  const starts = (signature: number[]) => signature.every((value, index) => bytes[index] === value);
  if (extension === "pdf") return starts([0x25, 0x50, 0x44, 0x46, 0x2d]);
  if (extension === "png") return starts([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (extension === "jpg" || extension === "jpeg") return starts([0xff, 0xd8, 0xff]);
  if (extension === "doc") return starts([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]);
  if (extension === "docx") return starts([0x50, 0x4b, 0x03, 0x04]);
  return false;
}

export class ContactInputError extends Error {
  constructor(message: string, public status = 400) { super(message); }
}

// Enforce the limit while reading, including requests without Content-Length.
export async function readLimitedFormData(request: Request): Promise<FormData> {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("multipart/form-data")) throw new ContactInputError("Formato richiesta non valido.", 415);
  const declared = Number(request.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > CONTACT_LIMITS.bodyBytes) throw new ContactInputError("La richiesta supera 4 MB. Riduci gli allegati.", 413);
  if (!request.body) throw new ContactInputError("Richiesta vuota.");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > CONTACT_LIMITS.bodyBytes) { await reader.cancel(); throw new ContactInputError("La richiesta supera 4 MB. Riduci gli allegati.", 413); }
      chunks.push(value);
    }
    const body = new Uint8Array(total);
    let offset = 0;
    for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.length; }
    return await new Response(body, { headers: { "content-type": request.headers.get("content-type")! } }).formData();
  } catch (error) {
    if (error instanceof ContactInputError) throw error;
    throw new ContactInputError("Richiesta non leggibile. Riprova dal modulo.");
  } finally { reader.releaseLock(); }
}

export function validatedField(form: FormData, name: keyof typeof CONTACT_LIMITS): string {
  const values = form.getAll(name);
  if (values.length !== 1 || typeof values[0] !== "string") throw new ContactInputError("Compila tutti i campi obbligatori.");
  const value = values[0].trim();
  if (!value || value.length > CONTACT_LIMITS[name] || (value.includes(String.fromCharCode(0)) || (name !== "caseSummary" && /[\r\n]/.test(value)))) throw new ContactInputError(`Controlla il campo ${name}.`);
  return value;
}
