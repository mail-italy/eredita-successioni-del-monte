"use client";

import dynamic from "next/dynamic";

const FloatingContact = dynamic(
  () => import("@/components/floating-contact").then((mod) => mod.FloatingContact),
  { ssr: false },
);

export function DeferredFloatingContact() {
  return <FloatingContact />;
}
