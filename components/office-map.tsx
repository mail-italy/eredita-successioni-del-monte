"use client";

import { useState } from "react";
import Link from "next/link";

import { contacts } from "@/lib/site-config";

export function OfficeMap({
  title = "Lo studio a Roma",
  compact = false,
}: {
  title?: string;
  compact?: boolean;
}) {
  const [showMap, setShowMap] = useState(false);
  return (
    <section className={compact ? "section-tight" : "section"}>
      <div className="shell">
        <div className="map-section">
          <div className="map-card">
            <p className="eyebrow">Dove siamo</p>
            <h2 className="display-sm">{title}</h2>
            <p className="lead">
              Studio Legale Del Monte
              <br />
              {contacts.address}
            </p>
            <p className="muted">
              Ricevimento su appuntamento. Per un primo contatto puoi usare anche
              WhatsApp o Mail.
            </p>
            <Link
              href={contacts.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="button-ghost"
            >
              Apri su Google Maps
            </Link>
          </div>

          <div className="map-frame-wrap">
            {showMap ? <iframe
              title="Mappa Studio Legale Del Monte"
              src={contacts.mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="map-frame"
            /> : <div className="map-frame stack" style={{ padding: "24px", display: "grid", alignContent: "center" }}><p>La mappa interattiva è fornita da Google. Si collegherà al servizio solo quando la apri.</p><button type="button" className="button-ghost" onClick={() => setShowMap(true)}>Mostra la mappa Google</button></div>}
          </div>
        </div>
      </div>
    </section>
  );
}
