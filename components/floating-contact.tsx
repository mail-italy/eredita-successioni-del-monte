"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { ContactActions, useRomeTimeState } from "@/components/contact-actions";
import { contacts } from "@/lib/content";

function ContactIcon({
  kind,
}: {
  kind: "request" | "whatsapp" | "mail" | "phone";
}) {
  if (kind === "whatsapp") {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M19.11 4.89A9.93 9.93 0 0 0 12.03 2C6.5 2 2 6.5 2 12.03c0 1.77.46 3.5 1.34 5.02L2 22l5.1-1.33a10 10 0 0 0 4.93 1.26h.01c5.52 0 10.01-4.5 10.01-10.03 0-2.68-1.04-5.2-2.94-7.01ZM12.04 20.2h-.01a8.26 8.26 0 0 1-4.21-1.16l-.3-.18-3.03.79.81-2.96-.2-.3a8.2 8.2 0 0 1-1.27-4.36c0-4.57 3.72-8.29 8.3-8.29 2.21 0 4.28.86 5.84 2.42a8.2 8.2 0 0 1 2.43 5.86c0 4.57-3.72 8.29-8.28 8.29Zm4.55-6.18c-.25-.13-1.47-.73-1.7-.82-.23-.08-.4-.12-.57.13-.17.25-.66.82-.81.99-.15.17-.3.19-.55.06-.25-.13-1.06-.39-2.02-1.25-.74-.67-1.24-1.5-1.39-1.75-.15-.25-.02-.39.11-.52.12-.11.25-.3.38-.45.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.57-1.37-.78-1.88-.21-.49-.42-.42-.57-.42l-.49-.01c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.02 2.6c.13.17 1.77 2.7 4.28 3.79.6.26 1.06.42 1.42.53.6.19 1.15.16 1.59.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29Z" />
      </svg>
    );
  }

  const commonProps = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (kind) {
    case "request":
      return (
        <svg {...commonProps}>
          <path d="M7 4.5h7l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V6A1.5 1.5 0 0 1 7.5 4.5Z" />
          <path d="M14 4.5V9h4" />
          <path d="M9 12h6" />
          <path d="M9 15.5h6" />
        </svg>
      );
    case "mail":
      return (
        <svg {...commonProps}>
          <rect x="4" y="6" width="16" height="12" rx="2.2" />
          <path d="m5.5 8 6.5 5 6.5-5" />
        </svg>
      );
    case "phone":
      return (
        <svg {...commonProps}>
          <path d="M8.4 5.7c.4-.4 1-.5 1.5-.2l2 1.2c.5.3.7 1 .4 1.5l-.9 1.8c-.2.4-.1.8.1 1.1.5.8 1.2 1.6 2 2.4.8.8 1.6 1.4 2.4 2 .3.2.7.3 1.1.1l1.8-.9c.5-.3 1.2-.1 1.5.4l1.2 2c.3.5.2 1.1-.2 1.5l-1.3 1.3c-.7.7-1.8 1-2.8.7-1.8-.5-4.5-1.8-7-4.4-2.6-2.5-3.9-5.2-4.4-7-.3-1 .1-2.1.7-2.8l1.4-1.3Z" />
        </svg>
      );
  }
}

type MobileContactAction = {
  key: string;
  href: string;
  label: string;
  className: string;
  icon: React.ReactNode;
  ariaLabel: string;
  target?: string;
  rel?: string;
};

export function FloatingContact() {
  const pathname = usePathname();
  const timeState = useRomeTimeState();
  const [mobileContactsOpen, setMobileContactsOpen] = useState(false);

  const mobileActions: MobileContactAction[] = [];

  if (timeState?.canCall) {
    mobileActions.push({
      key: "phone",
      href: contacts.phoneHref,
      label: "Chiama",
      className: "mobile-speed-dial-action-phone",
      icon: <ContactIcon kind="phone" />,
      ariaLabel: "Chiama lo studio",
    });
  }

  mobileActions.push(
    {
      key: "mail",
      href: contacts.emailHref,
      label: "Mail",
      className: "mobile-speed-dial-action-mail",
      icon: <ContactIcon kind="mail" />,
      ariaLabel: "Invia una mail",
    },
    {
      key: "whatsapp",
      href: contacts.whatsappHref,
      label: "WhatsApp",
      className: "mobile-speed-dial-action-whatsapp",
      icon: <ContactIcon kind="whatsapp" />,
      ariaLabel: "Apri WhatsApp",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      key: "request",
      href: "/contatti#modulo-contatti",
      label: "Contatti",
      className: "mobile-speed-dial-action-request",
      icon: <ContactIcon kind="request" />,
      ariaLabel: "Vai al modulo contatti",
    },
  );

  useEffect(() => {
    setMobileContactsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileContactsOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileContactsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileContactsOpen]);

  return (
    <>
      <div className="floating-contact" aria-label="Contatti rapidi">
        <ContactActions scope="floating" compact />
      </div>

      {mobileContactsOpen ? (
        <button
          type="button"
          className="mobile-speed-dial-overlay"
          aria-label="Chiudi il menu contatti rapidi"
          onClick={() => setMobileContactsOpen(false)}
        />
      ) : null}

      <div
        className={
          mobileContactsOpen
            ? "mobile-contact-fab-wrap mobile-contact-fab-wrap-open"
            : "mobile-contact-fab-wrap"
        }
      >
        {mobileContactsOpen ? (
          <div
            id="mobile-contact-sheet"
            className="mobile-speed-dial mobile-speed-dial-open"
          >
            {mobileActions.map((action) => (
              <div key={action.key} className="mobile-speed-dial-row">
                <span className="mobile-speed-dial-label">{action.label}</span>
                <Link
                  href={action.href}
                  className={`mobile-speed-dial-button ${action.className}`}
                  aria-label={action.ariaLabel}
                  title={action.label}
                  target={action.target}
                  rel={action.rel}
                  data-track-event={action.key === "request" ? "contact_form_click" : action.key === "phone" ? "phone_click" : action.key === "mail" ? "email_click" : "whatsapp_click"}
                  data-track-label={`mobile_fab_${action.key}`}
                  onClick={() => setMobileContactsOpen(false)}
                >
                  {action.icon}
                </Link>
              </div>
            ))}
          </div>
        ) : null}

        <button
          type="button"
          className={mobileContactsOpen ? "mobile-contact-fab mobile-contact-fab-open" : "mobile-contact-fab"}
          aria-label={mobileContactsOpen ? "Chiudi i contatti rapidi" : "Apri i contatti rapidi"}
          aria-expanded={mobileContactsOpen}
          aria-controls="mobile-contact-sheet"
          onClick={() => setMobileContactsOpen((value) => !value)}
        >
          <span className="mobile-contact-fab-icon" aria-hidden="true">
            {mobileContactsOpen ? "×" : "+"}
          </span>
          <span>Contatti</span>
        </button>
      </div>
    </>
  );
}
