"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const ContactForm = dynamic(
  () => import("@/components/contact-form").then((mod) => mod.ContactForm),
  {
    ssr: false,
    loading: () => <ContactFormPlaceholder />,
  },
);

export function DeferredContactForm() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const node = wrapperRef.current;

    if (!node || shouldRender) {
      return;
    }

    const reveal = () => setShouldRender(true);

    if (!("IntersectionObserver" in window)) {
      const fallbackTimer = globalThis.setTimeout(reveal, 600);
      return () => globalThis.clearTimeout(fallbackTimer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          reveal();
          observer.disconnect();
        }
      },
      { rootMargin: "480px 0px" },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [shouldRender]);

  return <div ref={wrapperRef}>{shouldRender ? <ContactForm /> : <ContactFormPlaceholder />}</div>;
}

function ContactFormPlaceholder() {
  return (
    <div className="contact-form-skeleton" aria-hidden="true">
      <div className="contact-form-skeleton-grid">
        <div className="contact-form-skeleton-field" />
        <div className="contact-form-skeleton-field" />
        <div className="contact-form-skeleton-field" />
        <div className="contact-form-skeleton-field" />
        <div className="contact-form-skeleton-field contact-form-skeleton-field-full" />
        <div className="contact-form-skeleton-area" />
        <div className="contact-form-skeleton-field contact-form-skeleton-field-full" />
        <div className="contact-form-skeleton-checkbox" />
      </div>
      <div className="contact-form-skeleton-button" />
    </div>
  );
}
