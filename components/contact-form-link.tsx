"use client";

import Link from "next/link";
import type React from "react";

import { scrollToContactFormIfPresent } from "@/components/contact-form-scroll";

type ContactFormLinkProps = {
  children: React.ReactNode;
  className?: string;
  label: string;
} & Omit<
  React.ComponentPropsWithoutRef<typeof Link>,
  "href" | "prefetch" | "data-track-event" | "data-track-label" | "onClick"
>;

export function ContactFormLink({
  children,
  className,
  label,
  ...props
}: ContactFormLinkProps) {
  return (
    <Link
      {...props}
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
