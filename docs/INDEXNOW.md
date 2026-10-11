# Notifiche IndexNow per Eredità e Successioni dopo un rilascio

Questa integrazione non invia nulla durante build, deploy, navigazione o test. Il comando si esegue esplicitamente dal Mac con Node 20.9 o successivo. Nessuna funzione Vercel, cron, dipendenza aggiuntiva o credenziale dei servizi Google è necessaria.

`indexnow.config.json` contiene l'host canonico e una chiave di verifica dedicata. Il file corrispondente in `public/<chiave>.txt` è intenzionalmente accessibile sul sito. Non sostituirlo con password, token Bing, Google o SMTP. Mantenere la chiave distinta dagli altri siti.

## Quando usarlo

Prima attendere il deploy **Production riuscito** e controllare la versione pubblica. Registrare nel report di rilascio commit e data di attivazione. Notificare solo URL aggiunti o modificati sostanzialmente da quel momento. Le modifiche precedenti restano affidate alla sitemap e a `lastmod` attendibili: nessun invio retroattivo massivo, nemmeno copiando tutti gli URL della sitemap. Ritocchi grafici non richiedono notifiche.

Esempio per un futuro aggiornamento reale della pagina Chi siamo:

```sh
npm run indexnow -- https://ereditaesuccessioni.it/chi-siamo
```

Il comando predefinito fa soltanto GET di verifica. Per notificare lo stesso elenco dopo aver verificato il risultato:

```sh
npm run indexnow -- --submit https://ereditaesuccessioni.it/chi-siamo
```

Si possono passare più URL espliciti, separati da spazi. Non sono accettati HTTP, altri host, credenziali nell'URL, query, frammenti, redirect o URL non presenti nella sitemap canonica. Gli URL sono deduplicati (massimo 10.000 distinti).

Il comando verifica il file chiave pubblico, scarica la sitemap e controlla che tutte le pagine abbiano HTTP 200, HTML con canonical coerente e nessun `noindex` rilevato nell'head o nelle intestazioni. Prima del deploy la verifica del file chiave può fallire con 404: è atteso, non usare anteprime o rimuovere il controllo per forzare l'invio.

Il parser XML è volutamente limitato al `urlset` piatto prodotto dai tre siti Next.js. Legge il singolo `loc` di ogni `url` e ignora i metadata accessori; rifiuta sitemap index, DTD, entity e struttura estranea. Il parser HTML controlla i tag statici `link`/`meta` nell'head restituito dal server; non è un crawler JavaScript. In caso di cambio formato sitemap/head, aggiornare e verificare i test prima dell'uso. Rimozioni o spostamenti non sono gestiti da questo comando prudenziale per nuove pagine e aggiornamenti.

## Interpretare il risultato

- `dry-run`: nessun POST, solo verifiche; non è una ricevuta IndexNow.
- HTTP **200**: URL ricevuti; non prova indicizzazione, posizione o citazioni AI.
- HTTP **202**: ricevuti, con verifica della chiave ancora pendente.
- Altro HTTP o errore: uscita non zero, nessun retry automatico. Conservare la ricevuta JSON insieme al commit del rilascio; verificare la causa prima di un eventuale nuovo invio.

Il comando non interroga lo stato dell'indice. Anche se i controlli locali passano, l'effettiva scansione e indicizzazione restano decisioni dei motori partecipanti. Non è una registrazione presso tutte le AI.

Fonti: [protocollo IndexNow](https://www.indexnow.org/documentation), [FAQ ufficiali, criteri e invii storici](https://www.indexnow.org/faq).

## Replicare su un altro repository

Copiare `scripts/indexnow.mjs`, `tests/indexnow.test.mjs` e questa guida; generare una **nuova** chiave e configurare l'host canonico dell'altro sito. Lo script non dipende da moduli applicativi, Google Tag Manager o dalle route Next. Il comando npm è solo una scorciatoia; nessun hook deve essere aggiunto alla build. I test usano esclusivamente fetch simulato, senza notifiche reali.
