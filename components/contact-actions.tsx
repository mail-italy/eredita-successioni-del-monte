"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { contacts } from "@/lib/content";

type ContactActionsProps = {
  scope: string;
  className?: string;
  includePhone?: boolean;
  includeEmail?: boolean;
  includeWhatsapp?: boolean;
  includeRequest?: boolean;
  compact?: boolean;
};

export function getRomeTimeState(date: Date) {
  const formatter = new Intl.DateTimeFormat("it-IT", {
    timeZone: "Europe/Rome",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? "0");
  const weekday = parts.find((part) => part.type === "weekday")?.value?.toLowerCase() ?? "";
  const totalMinutes = hour * 60 + minute;
  const isWeekday = !weekday.includes("sab") && !weekday.includes("dom");

  return {
    label: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
    canCall: isWeekday && totalMinutes >= 540 && totalMinutes <= 1170,
  };
}

export function useRomeTimeState() {
  return useRomeTimeStateWhen(true);
}

function useRomeTimeStateWhen(enabled: boolean) {
  const [timeState, setTimeState] = useState<ReturnType<typeof getRomeTimeState> | null>(
    enabled ? getRomeTimeState(new Date()) : null,
  );

  useEffect(() => {
    if (!enabled) {
      setTimeState(null);
      return;
    }

    let timer = 0;

    const sync = () => setTimeState(getRomeTimeState(new Date()));
    const schedule = () => {
      sync();
      timer = window.setTimeout(schedule, 60000 - (Date.now() % 60000) + 50);
    };

    schedule();

    return () => window.clearTimeout(timer);
  }, [enabled]);

  return timeState;
}

export function ContactActions({
  scope,
  className,
  includePhone = true,
  includeEmail = true,
  includeWhatsapp = true,
  includeRequest = true,
  compact = false,
}: ContactActionsProps) {
  const timeState = useRomeTimeStateWhen(includePhone);
  const wrapperClassName = [compact ? "contact-actions-compact" : "cluster", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClassName}>
      {includeRequest ? (
        <Link
          href="/contatti#modulo-contatti"
          className="button-request"
          data-track-event="contact_form_click"
          data-track-label={`${scope}_request`}
        >
          Invia una richiesta
        </Link>
      ) : null}

      {includeWhatsapp ? (
        <a
          href={contacts.whatsappHref}
          className="button-whatsapp"
          aria-label="Scrivi su WhatsApp allo Studio Legale Del Monte"
          title="Apri la chat WhatsApp con lo Studio Legale Del Monte"
          target="_blank"
          rel="noopener noreferrer"
          data-track-event="whatsapp_click"
          data-track-label={`${scope}_whatsapp`}
        >
          WhatsApp
        </a>
      ) : null}

      {includePhone && timeState?.canCall ? (
        <a
          href={contacts.phoneHref}
          className="button-call"
          data-track-event="phone_click"
          data-track-label={`${scope}_phone`}
        >
          Chiama
        </a>
      ) : null}

      {includeEmail ? (
        <a
          href={contacts.emailHref}
          className="button-mail"
          data-track-event="email_click"
          data-track-label={`${scope}_email`}
        >
          Mail
        </a>
      ) : null}
    </div>
  );
}

export function ContactAvailabilityNote() {
  return (
    <p className="muted">
      Telefono disponibile dal lunedì al venerdì, dalle 09:00 alle 19:30. Fuori
      fascia restano sempre disponibili WhatsApp e Mail.
    </p>
  );
}
