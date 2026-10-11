"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { DENIED_CONSENT, GRANULAR_TAG_CONSENT_READY, OPEN_CONSENT_EVENT, readConsent, saveConsent, type ConsentPreferences } from "@/lib/consent";

export function CookieConsent() {
  const [notice, setNotice] = useState(false);
  const [storageWarning, setStorageWarning] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>(DENIED_CONSENT);
  const dialog = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const initial = readConsent();
    const frame = requestAnimationFrame(() => { setPreferences(initial ?? DENIED_CONSENT); setNotice(!initial); });
    const open = () => {
      returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setPreferences(readConsent() ?? DENIED_CONSENT);
      dialog.current?.showModal();
    };
    window.addEventListener(OPEN_CONSENT_EVENT, open);
    return () => { cancelAnimationFrame(frame); window.removeEventListener(OPEN_CONSENT_EVENT, open); };
  }, []);

  function closeDialog() {
    dialog.current?.close();
    returnFocus.current?.focus();
  }

  function trapDialogFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const focusable = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button, a[href], input, select, textarea, [tabindex="0"]')).filter((node) => !node.hasAttribute("disabled"));
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }

  function choose(value: ConsentPreferences) {
    const saved = saveConsent(value);
    setPreferences(saved ? value : DENIED_CONSENT);
    setStorageWarning(!saved);
    setNotice(!saved);
    closeDialog();
  }

  return <>
    {notice ? <section className="cookie-notice" aria-label="Scelte sui cookie">
      <div className="cookie-notice-copy"><h2>La tua privacy</h2><p>Usiamo strumenti Google per statistiche e marketing solo con il tuo consenso. Puoi rifiutare e continuare a navigare. <Link href="/privacy#cookie">Informazioni sui cookie</Link>.</p></div>
      {storageWarning ? <p role="status">Non è stato possibile salvare la scelta nel browser. Gli strumenti facoltativi restano disattivati; potresti dover scegliere di nuovo alla prossima visita.</p> : null}
      <div className="cookie-actions">
        <button type="button" onClick={() => choose(DENIED_CONSENT)}>Rifiuta tutti</button>
        <button type="button" onClick={() => { returnFocus.current = document.activeElement as HTMLElement; dialog.current?.showModal(); }}>Personalizza</button>
        <button type="button" onClick={() => choose({ analytics: true, marketing: true })}>Accetta tutti</button>
      </div>
    </section> : null}
    <dialog ref={dialog} className="cookie-dialog" aria-labelledby="cookie-title" aria-describedby="cookie-description" onKeyDown={trapDialogFocus} onCancel={(event) => { event.preventDefault(); closeDialog(); }}>
      <h2 id="cookie-title">Preferenze cookie</h2>
      <p id="cookie-description">I cookie facoltativi sono disattivati fino alla tua scelta. Puoi modificarla dal collegamento «Preferenze cookie» in fondo a ogni pagina.</p>
      <div className="cookie-choice"><strong>Necessari</strong><p>Memorizzano la tua scelta per 180 giorni e permettono il funzionamento del sito. Sono sempre attivi.</p></div>
      <label className="cookie-choice"><span><input type="checkbox" checked={preferences.analytics} onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })} /> Statistiche</span><p>Google Analytics ci aiuta a capire quali pagine e contatti vengono utilizzati.</p></label>
      <label className="cookie-choice"><span><input type="checkbox" checked={preferences.marketing} onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })} /> Marketing</span><p>Gli strumenti pubblicitari Google misurano le campagne e, con il consenso, personalizzano gli annunci.</p></label>
      {!GRANULAR_TAG_CONSENT_READY ? <p>Al momento gli strumenti Google si attivano soltanto se autorizzi entrambe le categorie. Se ne selezioni una sola, restano disattivati.</p> : null}
      <p><Link href="/privacy#cookie" onClick={closeDialog}>Leggi le informazioni sui cookie</Link>.</p>
      <div className="cookie-actions">
        <button type="button" onClick={() => choose(DENIED_CONSENT)}>Rifiuta tutti</button>
        <button type="button" onClick={() => choose(preferences)}>Salva preferenze</button>
        <button type="button" onClick={closeDialog}>Chiudi senza salvare</button>
      </div>
    </dialog>
  </>;
}
