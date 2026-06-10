import type React from "react";

export function scrollToContactFormIfPresent(event: React.MouseEvent<HTMLAnchorElement>) {
  const target = document.getElementById("modulo-contatti");

  if (!target) return;

  event.preventDefault();
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", "#modulo-contatti");
}
