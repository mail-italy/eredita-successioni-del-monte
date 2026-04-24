"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";

import { contactRequestTopics } from "@/lib/content";

const allowedAttachmentExtensions = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"];
const attachmentErrorMessage =
  "Formato allegato non supportato. Usa PDF, DOC, DOCX, JPG, JPEG o PNG.";

type FormState = {
  status: "idle" | "submitting" | "success" | "error";
  message: string;
};

const initialState: FormState = {
  status: "idle",
  message: "",
};

export function ContactForm() {
  const [state, setState] = useState<FormState>(initialState);
  const [attachmentError, setAttachmentError] = useState("");

  const successClassName = useMemo(() => {
    if (state.status === "success") {
      return "form-alert form-alert-success";
    }

    if (state.status === "error") {
      return "form-alert form-alert-error";
    }

    return "form-alert";
  }, [state.status]);

  function hasAllowedAttachmentExtension(fileName: string) {
    const normalized = fileName.toLowerCase();

    return allowedAttachmentExtensions.some((extension) => normalized.endsWith(extension));
  }

  function handleAttachmentChange(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.currentTarget.files ?? []);

    if (files.length === 0) {
      setAttachmentError("");
      return;
    }

    const hasInvalidFile = files.some((file) => !hasAllowedAttachmentExtension(file.name));

    setAttachmentError(hasInvalidFile ? attachmentErrorMessage : "");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (formData.get("privacy") !== "accepted") {
      setState({
        status: "error",
        message: "Per inviare la richiesta è necessario accettare l’informativa privacy.",
      });
      return;
    }

    const selectedFiles = formData
      .getAll("attachments")
      .filter((value): value is File => value instanceof File && value.name.trim() !== "");

    const hasInvalidAttachment = selectedFiles.some(
      (file) => !hasAllowedAttachmentExtension(file.name),
    );

    if (hasInvalidAttachment) {
      setAttachmentError(attachmentErrorMessage);
      setState({
        status: "error",
        message: attachmentErrorMessage,
      });
      return;
    }

    setAttachmentError("");

    setState({
      status: "submitting",
      message: "Invio in corso...",
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message ?? "Invio non riuscito.");
      }

      setState({
        status: "success",
        message:
          payload.message ??
          "Richiesta inviata correttamente. Lo studio ti ricontatterà nel più breve tempo possibile.",
      });
      setAttachmentError("");
      form.reset();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Si è verificato un errore. Riprova oppure usa WhatsApp o Mail.";

      setState({
        status: "error",
        message,
      });
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label className="field">
          <span>Nome</span>
          <input name="name" required autoComplete="given-name" />
        </label>
        <label className="field">
          <span>Cognome</span>
          <input name="surname" required autoComplete="family-name" />
        </label>
        <label className="field">
          <span>Telefono</span>
          <input name="phone" type="tel" required autoComplete="tel" />
        </label>
        <label className="field">
          <span>Email</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
        <label className="field field-full">
          <span>Ambito della richiesta</span>
          <select name="topic" required defaultValue="">
            <option value="" disabled>
              Seleziona un ambito
            </option>
            {contactRequestTopics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </label>
        <label className="field field-full">
          <span>Sintesi del caso</span>
          <textarea
            name="caseSummary"
            rows={6}
            required
            placeholder="Descrivi in modo sintetico il problema, i soggetti coinvolti e l’eventuale documentazione già disponibile."
          />
        </label>
        <label className="field field-full">
          <span>Allegati</span>
          <input
            name="attachments"
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleAttachmentChange}
          />
          <small className="muted">
            Puoi allegare documenti utili alla prima valutazione. Formati consigliati:
            PDF, DOC, DOCX, JPG, JPEG, PNG.
          </small>
          {attachmentError ? <small className="form-field-error">{attachmentError}</small> : null}
        </label>
        <label className="field field-honeypot" aria-hidden="true">
          <span>Sito web</span>
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
        <label className="field-checkbox field-full">
          <input name="privacy" type="checkbox" value="accepted" required />
          <span>
            Ho letto l’informativa privacy e acconsento al trattamento dei dati per
            la gestione della richiesta.
          </span>
        </label>
      </div>

      {state.message ? <div className={successClassName}>{state.message}</div> : null}

      <button
        type="submit"
        className="button-secondary"
        disabled={state.status === "submitting"}
        data-track-event="form_submit"
        data-track-label="contact_form_submit"
      >
        {state.status === "submitting" ? "Invio in corso..." : "Invia richiesta"}
      </button>
    </form>
  );
}
