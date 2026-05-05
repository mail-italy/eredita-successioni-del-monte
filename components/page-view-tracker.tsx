"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function PageViewTracker({
  event,
  label,
}: {
  event: string;
  label?: string;
}) {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event,
      event_category: "page_view",
      event_label: label,
    });
  }, [event, label]);

  return null;
}
