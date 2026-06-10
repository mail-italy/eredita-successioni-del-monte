"use client";

import Link from "next/link";
import type React from "react";

import { scrollToContactFormIfPresent } from "@/components/contact-form-scroll";

type ContactFormLinkProps = {
  children: React.ReactNode;
  className?: string;
  label: string;
};

export function ContactFormLink({
  children,
  className,
  label,
}: ContactFormLinkProps) {
  return (
    <Link
      href="/contatti#modulo-contatti"
      prefetch={false}
      className={className}
      data-track-event="contact_form_click"
      data-track-label={label}
      onClick={scrollToContactFormIfPresent}
    >
      {children}
    </Link>
  );
}
