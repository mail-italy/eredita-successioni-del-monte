"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/tracking";

export function PageViewTracker({ event, label }: { event: string; label?: string }) {
  useEffect(() => { trackEvent(event, { event_label: label ?? "" }); }, [event, label]);
  return null;
}
