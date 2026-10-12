import Link from "next/link";

import { contacts } from "@/lib/site-config";

export function OfficeMap({
  title = "Lo studio a Roma",
  compact = false,
}: {
  title?: string;
  compact?: boolean;
}) {
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
            <iframe
              title="Mappa Studio Legale Del Monte"
              src={contacts.mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="map-frame"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
