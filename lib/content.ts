import { adsServicePages } from "@/lib/ads-service-pages";

export const siteConfig = {
  brand: "Eredità e Successioni",
  studio: "Studio Legale Del Monte",
  domain: "https://www.ereditaesuccessioni.it",
  baseTitle: "Eredità e Successioni | Assistenza legale in materia ereditaria",
  titleTemplate: "%s | Eredità e Successioni",
  description:
    "Assistenza legale dedicata a successioni, testamenti, divisioni ereditarie, legittima, donazioni, mediazione ereditaria e successioni internazionali.",
  locale: "it_IT",
};

const whatsappBaseMessage =
  "Messaggio proveniente dal sito Eredità e Successioni.\n\nBuongiorno, desidero richiedere una prima valutazione su una questione di eredità o successione.";

export const contacts = {
  phoneDisplay: "+39 06 97615122",
  phoneHref: "tel:+390697615122",
  whatsappHref: `https://wa.me/390697615122?text=${encodeURIComponent(whatsappBaseMessage)}`,
  email: "info@delmontestudiolegale.it",
  emailHref: "mailto:info@delmontestudiolegale.it",
  address: "Via Costanza Baudana Vaccolini, 5 – 00153 Roma",
  city: "Roma",
  officeHours: "Lunedì–Venerdì, 09:00–19:30",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Via+Costanza+Baudana+Vaccolini+5+00153+Roma",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Via%20Costanza%20Baudana%20Vaccolini%205%2C%2000153%20Roma&z=15&output=embed",
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ArticleSection = {
  title: string;
  paragraphs: string[];
};

export type ArticleEntry = {
  slug: string;
  title: string;
  excerpt: string;
  answerFirst: string;
  category: string;
  relatedServiceSlugs: string[];
  faq: FaqItem[];
  sections: ArticleSection[];
};

export type ServicePage = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  heroTitle: string;
  heroIntro: string;
  problemList: string[];
  whenToCall: string[];
  checks: string[];
  errors: string[];
  documents: string[];
  trust: string;
  relatedArticles: string[];
  relatedLinks?: { href: string; label: string; description?: string }[];
  variant?: "default" | "ads";
  introParagraphs?: string[];
  studioCanDo?: string[];
  firstAnalysisDocuments?: string[];
  termAttention?: string[];
  timeRisksParagraphs?: string[];
  timeRisks?: string[];
  faq: FaqItem[];
};

export type HubPage = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  sections: {
    title: string;
    items: string[];
  }[];
  featuredArticles: string[];
  connectedServices: string[];
  faq: FaqItem[];
};

export type GlossaryTerm = {
  slug: string;
  term: string;
  definition: string;
  whyItMatters: string;
  relatedSlugs: string[];
};

export const trustSignals = [
  {
    label: "Competenza dedicata a successioni, testamenti, legittima e divisioni",
    href: "/servizi",
  },
  {
    label: "Esperienza ultraventennale dello Studio Legale Del Monte",
    href: "/chi-siamo",
  },
  {
    label: "Assistenza in fase stragiudiziale, giudiziale e di mediazione",
    href: "/mediazione-ereditaria",
  },
  {
    label: "Approccio tecnico ma leggibile, orientato a prevenire errori e contenziosi",
    href: "/approfondimenti",
  },
];

export const mainProblems = [
  "Testamento contestato o sospetto di invalidità",
  "Divisione ereditaria bloccata tra coeredi",
  "Lesione della quota di legittima",
  "Donazioni da ricostruire in sede successoria",
  "Conti correnti e somme del de cuius da recuperare",
  "Successioni internazionali con patrimoni in più Paesi",
];

export const workSteps = [
  {
    title: "Inquadramento del caso",
    text: "Ricostruiamo la vicenda familiare, patrimoniale e documentale per capire subito se il nodo è testamentario, divisorio, di legittima o di donazioni pregresse.",
  },
  {
    title: "Verifica tecnica e strategia",
    text: "Valutiamo titoli, quote, beni, movimenti bancari, tempistiche e rischi processuali per impostare una linea di azione chiara e sostenibile.",
  },
  {
    title: "Negoziazione, mediazione o giudizio",
    text: "Privilegiamo le soluzioni efficaci quando sono realistiche, ma prepariamo il contenzioso con metodo quando l’accordo non tutela davvero il cliente.",
  },
];

const baseMoneyPages: ServicePage[] = [
  {
    slug: "avvocato-successioni",
    title: "Avvocato per successioni ereditarie",
    shortTitle: "Avvocato successioni",
    description:
      "Assistenza legale in materia di successioni, testamenti, divisioni ereditarie, legittima, conti correnti, immobili e conflitti tra coeredi.",
    heroTitle: "Hai bisogno di assistenza per una successione complessa?",
    heroIntro:
      "Eredità bloccata, dubbi sulle quote o conflitti tra coeredi richiedono una lettura tecnica immediata. Lo Studio aiuta a chiarire diritti, rischi e percorso più efficace.",
    problemList: [
      "Eredità con più coeredi e interessi divergenti",
      "Dubbi su validità del testamento o ricostruzione delle quote",
      "Beni immobili, denaro e donazioni da coordinare nella divisione",
      "Successioni ferme per contrasti, inerzia o documentazione incompleta",
    ],
    whenToCall: [
      "Quando vuoi capire subito diritti, quote e rischi prima di firmare o accettare",
      "Quando il patrimonio comprende immobili, somme bancarie, donazioni o beni indivisi",
      "Quando emergono tensioni tra fratelli, coniuge, figli o altri legittimari",
      "Quando serve impostare mediazione o giudizio con una base tecnica ordinata",
    ],
    checks: [
      "Titolo successorio applicabile: testamento o successione legittima",
      "Composizione dell’asse ereditario e presenza di debiti o pesi",
      "Quote di legittima, collazione, riduzione e possibili azioni giudiziali",
      "Documenti notarili, catastali, bancari e fiscali necessari",
    ],
    errors: [
      "Accettare informalmente l’eredità senza aver misurato debiti e responsabilità",
      "Pensare che il conflitto tra coeredi sia solo un tema relazionale e non probatorio",
      "Trascurare donazioni pregresse, prelievi bancari o intestazioni apparenti",
      "Arrivare alla mediazione o al giudizio senza una ricostruzione patrimoniale solida",
    ],
    documents: [
      "Certificato di morte e stato di famiglia storico",
      "Testamento, atti notarili, donazioni, visure catastali e ipotecarie",
      "Estratti conto, comunicazioni bancarie, documentazione su polizze e investimenti",
      "Eventuali diffide, convocazioni in mediazione o atti giudiziari già notificati",
    ],
    trust:
      "Lo Studio Legale Del Monte opera da oltre vent’anni nel diritto ereditario e successorio, con attenzione specifica a controversie familiari, patrimoni articolati e coordinamento tra fase negoziale e giudiziale.",
    relatedArticles: [
      "quota-di-legittima-come-si-calcola",
      "successione-legittima-con-coniuge-e-figli",
      "divisione-gioielli-eredita",
    ],
    faq: [
      {
        question: "Quando serve davvero un avvocato per successioni?",
        answer:
          "Serve appena il caso supera la semplice voltura documentale: più coeredi, dubbi sulle quote, testamento controverso, immobili indivisi, somme bancarie bloccate o donazioni pregresse richiedono una verifica legale prima di assumere decisioni irreversibili.",
      },
      {
        question: "Trattate solo casi su Roma?",
        answer:
          "Lo studio ha sede a Roma, ma assiste anche su questioni successorie di rilievo nazionale e, quando necessario, su pratiche con elementi internazionali.",
      },
      {
        question: "Posso avere un primo inquadramento del caso senza aver raccolto tutti i documenti?",
        answer:
          "Sì. Una prima analisi serve anche a capire quali documenti mancano, dove recuperarli e quali verifiche hanno priorità.",
      },
    ],
  },
  {
    slug: "impugnazione-testamento",
    title: "Impugnazione del testamento",
    shortTitle: "Impugnazione testamento",
    description:
      "Valutazione della validità del testamento, vizi formali, incapacità, pressione indebita, lesione di legittima e strategia per impugnare.",
    heroTitle: "Vuoi contestare un testamento?",
    heroIntro:
      "Testamento sospetto, incapacità del testatore, pressioni o lesione di legittima non si valutano a intuito. Occorre capire subito se esistono motivi fondati e prove utilizzabili.",
    problemList: [
      "Testamento olografo con dubbi su autenticità, data o sottoscrizione",
      "Sospetti di condizionamento, captazione o incapacità del testatore",
      "Clausole che sembrano ledere la quota di legittima",
      "Conflitti familiari già esplosi prima dell’apertura della successione",
    ],
    whenToCall: [
      "Quando il testamento appare incoerente rispetto alla storia familiare o patrimoniale",
      "Quando hai elementi clinici, documentali o testimoniali su fragilità del testatore",
      "Quando il testamento distribuisce beni in modo apparentemente squilibrato",
      "Quando vuoi capire se conviene un’azione di annullamento, nullità o riduzione",
    ],
    checks: [
      "Tipo di testamento e requisiti formali rispettati",
      "Capacità del testatore al momento della redazione",
      "Eventuali condotte di influenza indebita o abuso di dipendenza",
      "Rapporto tra disposizioni testamentarie, donazioni pregresse e quota disponibile",
    ],
    errors: [
      "Confondere un testamento sgradito con un testamento invalido",
      "Agire senza aver fissato il quadro probatorio prima della causa",
      "Trascurare il termine e il tipo di azione corretta",
      "Limitarsi alla parte formale senza ricostruire anche patrimonio e legittima",
    ],
    documents: [
      "Copia del testamento e verbali di pubblicazione",
      "Documentazione medica o sanitaria utile sulla capacità del testatore",
      "Messaggi, lettere, email o testimonianze sui rapporti familiari e sulle pressioni subite",
      "Documentazione patrimoniale per misurare eventuali lesioni della legittima",
    ],
    trust:
      "L’impugnazione richiede rigore probatorio e una lettura integrata tra validità formale, capacità, relazioni familiari e ricostruzione patrimoniale. È qui che una difesa specialistica fa la differenza.",
    relatedArticles: [
      "come-funziona-successione-legittima",
      "quota-di-legittima-come-si-calcola",
      "testamento-quando-si-puo-contestare",
    ],
    faq: [
      {
        question: "Posso impugnare un testamento solo perché mi ha escluso?",
        answer:
          "No. L’esclusione, da sola, non basta. Occorre capire se vi è una lesione di legittima oppure un vizio del testamento che consenta un’azione fondata.",
      },
      {
        question: "Un testamento scritto a mano è sempre valido?",
        answer:
          "No. Il testamento olografo richiede requisiti precisi e può essere contestato se mancano elementi formali o se vi sono seri dubbi su autenticità e capacità del testatore.",
      },
      {
        question: "Conviene partire subito con una causa?",
        answer:
          "Non sempre. In molti casi è utile prima cristallizzare prove, patrimonio e posizioni dei coeredi, anche per capire se una trattativa o mediazione possa rafforzare la strategia complessiva.",
      },
    ],
  },
  {
    slug: "divisione-ereditaria",
    title: "Divisione ereditaria e scioglimento della comunione",
    shortTitle: "Divisione ereditaria",
    description:
      "Assistenza nella divisione ereditaria: immobili, denaro, quote, beni mobili, gioielli, conflitti tra coeredi e scioglimento della comunione ereditaria.",
    heroTitle: "La divisione ereditaria è bloccata?",
    heroIntro:
      "Quando immobili, denaro o beni mobili restano in comunione, il conflitto tra coeredi tende a peggiorare. Serve una strategia chiara per trasformare quote astratte in attribuzioni concrete.",
    problemList: [
      "Immobili cointestati che nessuno riesce a vendere o gestire",
      "Beni mobili, gioielli, arredi o somme di denaro contesi",
      "Coeredi che usano in esclusiva beni comuni o non rendono conto delle spese",
      "Mancata trasparenza su prelievi, canoni, conti correnti o frutti dei beni",
    ],
    whenToCall: [
      "Quando la comunione ereditaria blocca il patrimonio da mesi o anni",
      "Quando occorre valutare quote, collazione, conguagli e divisibilità dei beni",
      "Quando un coerede occupa l’immobile o trattiene somme senza accordo",
      "Quando serve preparare mediazione obbligatoria o giudizio divisorio",
    ],
    checks: [
      "Composizione esatta dell’asse: immobili, denaro, titoli, crediti, beni mobili",
      "Quote ereditarie effettive e possibili incidenze di donazioni o legittima",
      "Comodità divisoria, indivisibilità o opportunità di vendita del bene",
      "Spese sostenute, frutti percepiti, indennità di occupazione e conguagli",
    ],
    errors: [
      "Dividere i beni senza aver prima ricostruito l’intero asse ereditario",
      "Ignorare il tema dei frutti, dei canoni o dell’uso esclusivo dell’immobile",
      "Sottovalutare il ruolo delle perizie e delle valutazioni economiche",
      "Pensare che la divisione giudiziale risolva da sola un dossier documentale debole",
    ],
    documents: [
      "Titoli di proprietà, visure catastali e ipotecarie, eventuali perizie",
      "Estratti conto, rendiconti, prova di spese e pagamenti effettuati",
      "Elenco dei beni mobili rilevanti, fotografie, inventari o stime",
      "Testamento, dichiarazione di successione e atti di donazione pregressi",
    ],
    trust:
      "Nelle divisioni ereditarie il risultato non dipende solo dal diritto astratto, ma da come vengono ricostruiti beni, valori, utilizzi e compensazioni. Lavoriamo per trasformare il conflitto in una mappa chiara di opzioni concrete.",
    relatedArticles: [
      "divisione-gioielli-eredita",
      "conti-correnti-del-de-cuius-cosa-sapere",
      "mediazione-ereditaria-quando-conviene",
    ],
    faq: [
      {
        question: "Se un coerede non vuole firmare, la divisione si ferma?",
        answer:
          "No. L’inerzia o il rifiuto di uno dei coeredi non impediscono in assoluto lo scioglimento della comunione. Cambia però il percorso: trattativa, mediazione e, se necessario, giudizio divisorio.",
      },
      {
        question: "Come si dividono beni mobili, gioielli o arredi di valore?",
        answer:
          "Si parte dall’individuazione e dalla prova della loro esistenza, poi si valutano stima, assegnazione, vendita o conguaglio. Nei beni mobili la criticità è spesso probatoria prima ancora che giuridica.",
      },
      {
        question: "Un coerede che usa da solo l’immobile deve qualcosa agli altri?",
        answer:
          "Può emergere un tema di indennità o di compensazione, ma va valutato sul caso concreto insieme a spese sostenute, utilità ricavate e periodo di utilizzo esclusivo.",
      },
    ],
  },
  {
    slug: "lesione-di-legittima",
    title: "Lesione di legittima",
    shortTitle: "Lesione di legittima",
    description:
      "Verifica della quota di legittima, riduzione delle disposizioni lesive, calcolo della massa ereditaria e tutela dei legittimari.",
    heroTitle: "La tua quota di legittima è stata lesa?",
    heroIntro:
      "Testamento squilibrato, donazioni fatte in vita o esclusione di un erede possono comprimere la quota riservata ai legittimari. Il punto è verificare calcoli, massa e rimedi praticabili.",
    problemList: [
      "Quote apparentemente sbilanciate a favore di un solo erede o terzo",
      "Donazioni pregresse che incidono sulla quota riservata",
      "Patrimonio poco trasparente o frammentato",
      "Conflitto tra testamento, liberalità e successione legittima",
    ],
    whenToCall: [
      "Quando sospetti che coniuge, figli o ascendenti siano stati penalizzati",
      "Quando servono calcoli tecnici su quota disponibile e quota di riserva",
      "Quando devi capire se agire prima contro disposizioni testamentarie o donazioni",
      "Quando il patrimonio comprende immobili, quote societarie o disponibilità bancarie",
    ],
    checks: [
      "Composizione della massa di calcolo",
      "Beni relitti, debiti e donatum",
      "Posizione dei legittimari e misura della quota lesa",
      "Ordine delle azioni e recuperabilità concreta dei beni",
    ],
    errors: [
      "Calcolare la legittima senza includere correttamente le donazioni",
      "Agire senza aver distinto riduzione e restituzione",
      "Sottovalutare il profilo probatorio sulle liberalità indirette",
      "Trascurare tempi e sostenibilità dell’azione",
    ],
    documents: [
      "Testamento e atti di donazione",
      "Titoli di proprietà e documentazione patrimoniale",
      "Estratti bancari e prova di movimenti rilevanti",
      "Stati di famiglia e documenti che provano la qualità di legittimario",
    ],
    trust:
      "La tutela della legittima richiede precisione: un errore nel perimetro del patrimonio o nel trattamento delle donazioni altera l’intera strategia.",
    relatedArticles: [
      "quota-di-legittima-come-si-calcola",
      "come-funziona-successione-legittima",
    ],
    faq: [
      {
        question: "La quota di legittima si calcola solo sui beni rimasti al momento della morte?",
        answer:
          "No. In molti casi vanno considerate anche donazioni e liberalità rilevanti, perché incidono sulla massa di calcolo e sulla quota riservata.",
      },
      {
        question: "Se il testamento mi esclude, sono automaticamente leso?",
        answer:
          "Non automaticamente. Va verificato se sei un legittimario e se, calcolando correttamente il patrimonio, la tua quota riservata risulta compressa.",
      },
    ],
  },
  {
    slug: "collazione-e-donazioni",
    title: "Collazione e donazioni in successione",
    shortTitle: "Collazione e donazioni",
    description:
      "Analisi di donazioni, anticipazioni, liberalità indirette e collazione nell’ambito della successione e delle quote ereditarie.",
    heroTitle: "Donazioni fatte in vita alterano l’eredità?",
    heroIntro:
      "Immobili donati, somme ricevute o liberalità indirette possono alterare quote ed equilibri tra fratelli e coeredi. Occorre capire cosa rileva davvero e come provarlo.",
    problemList: [
      "Donazioni immobiliari o somme di denaro fatte a uno solo degli eredi",
      "Pagamenti indiretti o intestazioni a favore di terzi",
      "Disaccordo su valore, epoca e natura della liberalità",
      "Confusione tra collazione, imputazione e riduzione",
    ],
    whenToCall: [
      "Quando il patrimonio apparente non spiega il reale squilibrio tra coeredi",
      "Quando un bene è stato donato anni prima e ora incide sulla divisione",
      "Quando occorre distinguere liberalità indirette da aiuti familiari ordinari",
      "Quando serve coordinare collazione e lesione di legittima",
    ],
    checks: [
      "Esistenza e tipologia delle donazioni",
      "Soggetti obbligati alla collazione",
      "Valore dei beni da conferire o imputare",
      "Effetti sulla divisione e sulle quote di riserva",
    ],
    errors: [
      "Trattare ogni aiuto economico come donazione giuridicamente rilevante",
      "Ignorare la prova bancaria o notarile disponibile",
      "Confondere il piano successorio con quello fiscale",
      "Valutare il bene senza un criterio coerente con l’azione proposta",
    ],
    documents: [
      "Atti notarili di donazione",
      "Bonifici, assegni, quietanze e documentazione bancaria",
      "Documenti su acquisti immobiliari o intestazioni sospette",
      "Testamento e dichiarazione di successione",
    ],
    trust:
      "Le donazioni sono uno dei punti più litigiosi del diritto successorio perché incidono insieme su patrimonio, quote, prova e rapporti familiari.",
    relatedArticles: [
      "quota-di-legittima-come-si-calcola",
      "conti-correnti-del-de-cuius-cosa-sapere",
    ],
    faq: [
      {
        question: "Ogni somma data a un figlio è una donazione da collazionare?",
        answer:
          "No. Serve qualificare il trasferimento e verificare contesto, causa e prova. Non ogni supporto familiare integra una liberalità rilevante in successione.",
      },
    ],
  },
  {
    slug: "animali-domestici-eredita",
    title: "Animali domestici in eredità",
    shortTitle: "Animali in eredità",
    description:
      "Assistenza legale su accordi tra eredi, spese, custodia e tutela dell’animale dopo la morte del proprietario.",
    seoTitle:
      "Animali domestici in eredità: a chi va il cane dopo la successione",
    seoDescription:
      "Cosa succede agli animali domestici dopo la morte del proprietario. Assistenza legale su accordi tra eredi, spese, custodia e tutela dell’animale.",
    heroTitle: "A chi va il cane o l’animale domestico nell’eredità?",
    heroIntro:
      "Dopo la morte del proprietario, anche un animale domestico può diventare motivo di conflitto tra gli eredi. Lo Studio assiste nella gestione degli accordi, delle spese, della custodia e delle decisioni pratiche più urgenti.",
    problemList: [
      "Un erede vuole tenere il cane o l’animale senza accordo",
      "I coeredi non concordano su custodia e spese",
      "L’animale viveva con il defunto e nessuno sa chi debba occuparsene",
      "Esistono volontà scritte, ma non è chiaro come applicarle",
      "Ci sono spese veterinarie o di mantenimento da ripartire",
    ],
    whenToCall: [
      "Quando gli eredi litigano sull’affidamento dell’animale",
      "Quando bisogna regolare spese e responsabilità",
      "Quando l’animale è collegato a un immobile o a una situazione familiare complessa",
      "Quando serve un accordo scritto tra coeredi",
    ],
    checks: [
      "Presenza di disposizioni testamentarie o volontà del defunto",
      "Chi detiene concretamente l’animale",
      "Spese già sostenute e spese future",
      "Possibile accordo tra eredi",
      "Collegamento con altri beni ereditari",
    ],
    errors: [
      "Trattare l’animale come un oggetto qualsiasi",
      "Lasciare la gestione solo a decisioni verbali",
      "Non documentare spese e accordi",
      "Agire senza considerare l’interesse pratico dell’animale",
    ],
    documents: [
      "Testamento o scritti del defunto",
      "Documenti veterinari",
      "Microchip e iscrizione all’anagrafe animale",
      "Ricevute di spese veterinarie e di mantenimento",
      "Comunicazioni tra eredi",
    ],
    trust:
      "Quando nell’eredità entra anche la gestione di un animale domestico, servono buon senso giuridico, attenzione pratica e accordi chiari che evitino conflitti inutili.",
    relatedArticles: [
      "mediazione-ereditaria-quando-conviene",
      "divisione-gioielli-eredita",
    ],
    relatedLinks: [
      { href: "/divisione-ereditaria", label: "Vai alla divisione ereditaria" },
      { href: "/mediazione-ereditaria", label: "Approfondisci la mediazione ereditaria" },
      { href: "/casa-ereditata", label: "Leggi sulla casa ereditata" },
      { href: "/divisione-gioielli-eredita", label: "Vai a gioielli e beni di famiglia" },
    ],
    faq: [
      {
        question: "Il cane entra nell’eredità?",
        answer:
          "L’animale non si gestisce come un bene qualsiasi, ma la sua sorte può comunque rientrare nelle decisioni pratiche e patrimoniali da coordinare tra gli eredi.",
      },
      {
        question: "Un erede può tenerlo senza accordo?",
        answer:
          "Non dovrebbe farlo in modo unilaterale se la situazione è contestata. Occorre verificare chi lo accudiva, quali volontà esistevano e come regolare custodia e spese.",
      },
      {
        question: "Chi paga le spese veterinarie?",
        answer:
          "Dipende dagli accordi, dalla gestione concreta dell’animale e dalle spese già sostenute. In caso di conflitto è utile documentare ogni esborso.",
      },
      {
        question: "Si può stabilire per accordo chi si occupa dell’animale?",
        answer:
          "Sì. Un accordo scritto tra coeredi può chiarire affidamento, spese, visite e responsabilità pratiche.",
      },
      {
        question: "Il defunto può indicare chi dovrà prendersene cura?",
        answer:
          "Può lasciare indicazioni utili, che vanno poi lette e applicate correttamente nel contesto concreto della successione.",
      },
    ],
  },
  {
    slug: "auto-ereditata",
    title: "Auto ereditata",
    shortTitle: "Auto ereditata",
    description:
      "Assistenza su voltura, uso del veicolo, vendita, assegnazione a un erede e accordi tra coeredi in caso di auto caduta in successione.",
    seoTitle:
      "Auto ereditata: chi la prende, voltura, uso e divisione tra eredi",
    seoDescription:
      "Come gestire un’auto caduta in successione: uso del veicolo, voltura, vendita, assegnazione a un erede e accordi tra coeredi.",
    heroTitle: "A chi va la macchina ereditata?",
    heroIntro:
      "L’auto caduta in successione può creare problemi pratici immediati: uso del veicolo, voltura, assicurazione, vendita o assegnazione a uno degli eredi. Lo Studio assiste nella gestione corretta dei passaggi e degli accordi tra coeredi.",
    problemList: [
      "Un erede utilizza l’auto senza accordo",
      "Non è chiaro chi debba fare la voltura",
      "Il veicolo deve essere venduto, ma manca il consenso",
      "Ci sono bollo, assicurazione o spese da pagare",
      "L’auto ha valore economico o affettivo rilevante",
    ],
    whenToCall: [
      "Quando gli eredi non concordano su vendita o assegnazione",
      "Quando un erede usa il mezzo senza rendere conto agli altri",
      "Quando bisogna coordinare PRA, documenti e successione",
      "Quando il veicolo rientra in una divisione ereditaria più ampia",
    ],
    checks: [
      "Intestazione del veicolo",
      "Stato della successione",
      "Possibilità di vendita o assegnazione",
      "Valore del mezzo",
      "Spese, bollo, assicurazione e responsabilità",
    ],
    errors: [
      "Usare l’auto senza accordo tra coeredi",
      "Rinviare voltura o vendita",
      "Non considerare spese e responsabilità",
      "Sottovalutare il valore del bene nella divisione",
    ],
    documents: [
      "Libretto di circolazione",
      "Certificato di proprietà e documenti PRA",
      "Certificato di morte",
      "Dichiarazione di successione, se disponibile",
      "Polizza assicurativa e ricevute delle spese",
    ],
    trust:
      "Su veicoli e beni mobili registrati conta muoversi presto, con documenti corretti e un accordo chiaro tra coeredi per evitare uso improprio e responsabilità inutili.",
    relatedArticles: [
      "conti-correnti-del-de-cuius-cosa-sapere",
      "mediazione-ereditaria-quando-conviene",
    ],
    relatedLinks: [
      { href: "/divisione-ereditaria", label: "Vai alla divisione ereditaria" },
      { href: "/casa-ereditata", label: "Leggi sulla casa ereditata" },
      { href: "/conti-correnti-azioni-polizze-eredita", label: "Leggi su conti correnti e polizze" },
      { href: "/divisione-gioielli-eredita", label: "Vai a gioielli e beni di famiglia" },
    ],
    faq: [
      {
        question: "Chi può usare l’auto ereditata?",
        answer:
          "L’uso del veicolo non dovrebbe essere deciso unilateralmente quando il bene cade in comunione ereditaria. Occorre verificare accordi, titolarità e responsabilità.",
      },
      {
        question: "Serve il consenso di tutti gli eredi per venderla?",
        answer:
          "Nella pratica il consenso o un percorso condiviso è normalmente decisivo, salvo diverse soluzioni giuridiche da valutare sul caso concreto.",
      },
      {
        question: "Come si fa la voltura?",
        answer:
          "La voltura richiede coordinamento tra documenti del veicolo, pratica successoria e passaggi presso gli uffici competenti.",
      },
      {
        question: "L’auto va stimata nella divisione?",
        answer:
          "Sì, se il suo valore incide sull’equilibrio delle quote o sull’assegnazione a uno degli eredi.",
      },
      {
        question: "Cosa succede se un erede la usa da solo?",
        answer:
          "Può sorgere un problema di utilizzo esclusivo, spese e rendiconto da valutare insieme al resto della divisione ereditaria.",
      },
    ],
  },
  {
    slug: "casa-ereditata",
    title: "Casa ereditata",
    shortTitle: "Casa ereditata",
    description:
      "Assistenza su comunione ereditaria, vendita, assegnazione, conguagli, uso dell’immobile e conflitti tra eredi.",
    seoTitle:
      "Casa ereditata: divisione, vendita o assegnazione tra eredi",
    seoDescription:
      "Cosa fare quando una casa cade in successione: comunione ereditaria, vendita, assegnazione, conguagli, uso dell’immobile e conflitti tra eredi.",
    heroTitle: "Come si divide una casa ereditata?",
    heroIntro:
      "Quando una casa cade in successione, gli eredi possono trovarsi in comunione su un bene difficile da gestire: vendita, assegnazione, uso esclusivo, conguagli e spese devono essere regolati con precisione.",
    problemList: [
      "Un erede vive nell’immobile senza accordo",
      "Alcuni vogliono vendere e altri no",
      "Non si riesce a stabilire il valore della casa",
      "Ci sono spese condominiali, mutuo o lavori da pagare",
      "L’immobile è indiviso da anni",
    ],
    whenToCall: [
      "Quando la casa ereditaria è bloccata",
      "Quando serve decidere tra vendita, divisione o assegnazione",
      "Quando un coerede usa l’immobile in via esclusiva",
      "Quando occorre impostare mediazione o divisione giudiziale",
    ],
    checks: [
      "Titoli di proprietà e quote",
      "Valore dell’immobile",
      "Eventuali ipoteche, mutui o pesi",
      "Uso attuale del bene",
      "Possibili accordi o conguagli",
    ],
    errors: [
      "Lasciare l’immobile indiviso senza regole",
      "Non regolare uso esclusivo e spese",
      "Vendere senza valutare bene quote e conguagli",
      "Arrivare alla causa senza documenti immobiliari completi",
    ],
    documents: [
      "Visura catastale",
      "Ispezione ipotecaria",
      "Atto di provenienza",
      "Dichiarazione di successione",
      "Documenti su mutui, spese, lavori e locazioni",
    ],
    trust:
      "La casa ereditaria è spesso il bene che concentra più tensioni: uso esclusivo, valore, spese e vendita richiedono una regia tecnica solida per evitare contenziosi lunghi.",
    relatedArticles: [
      "mediazione-ereditaria-quando-conviene",
      "divisione-gioielli-eredita",
      "successione-legittima-con-coniuge-e-figli",
    ],
    relatedLinks: [
      { href: "/divisione-ereditaria", label: "Vai alla divisione ereditaria" },
      { href: "/affitti-immobili-ereditati", label: "Leggi sugli affitti degli immobili ereditati" },
      { href: "/lesione-di-legittima", label: "Approfondisci la quota di legittima" },
      { href: "/mediazione-ereditaria", label: "Leggi sulla mediazione ereditaria" },
    ],
    faq: [
      {
        question: "Se uno degli eredi vive nella casa deve pagare qualcosa agli altri?",
        answer:
          "Può sorgere un tema di utilizzo esclusivo e compensazione economica, da valutare insieme a spese, tempi e modalità di occupazione.",
      },
      {
        question: "Si può vendere senza il consenso di tutti?",
        answer:
          "La vendita del bene ereditario richiede una valutazione attenta della situazione giuridica e del grado di accordo tra i coeredi.",
      },
      {
        question: "Come si determina il valore dell’immobile?",
        answer:
          "Il valore si determina normalmente con criteri tecnici coerenti con la finalità della divisione o dell’assegnazione.",
      },
      {
        question: "Cosa succede se la divisione bonaria non riesce?",
        answer:
          "Si può rendere necessario un percorso di mediazione o una divisione giudiziale, purché il caso sia stato preparato correttamente.",
      },
      {
        question: "Si può assegnare la casa a un solo erede?",
        answer:
          "Sì, in presenza dei presupposti giusti e con conguagli adeguati verso gli altri coeredi.",
      },
    ],
  },
  {
    slug: "affitti-immobili-ereditati",
    title: "Affitti di immobili ereditati",
    shortTitle: "Affitti immobili ereditati",
    description:
      "Assistenza sulla ripartizione dei canoni, rendiconti, incassi non dichiarati e conflitti tra coeredi su immobili locati caduti in successione.",
    seoTitle:
      "Affitti di immobili ereditati: come si dividono tra gli eredi",
    seoDescription:
      "Ripartizione dei canoni di locazione degli immobili ereditati: quote tra coeredi, rendiconti, incassi non dichiarati e conflitti sulla gestione.",
    heroTitle: "Come si dividono gli affitti di un immobile ereditato?",
    heroIntro:
      "Se un immobile ereditato è locato, i canoni di affitto devono essere ripartiti correttamente tra gli eredi. I problemi nascono quando uno solo incassa, non rende conto o gestisce il contratto senza accordo.",
    problemList: [
      "Un erede incassa gli affitti senza dividerli",
      "Non esiste un rendiconto chiaro dei canoni",
      "Il contratto di locazione è gestito da un solo coerede",
      "Ci sono spese sull’immobile da compensare",
      "I coeredi litigano su rinnovo, disdetta o vendita",
    ],
    whenToCall: [
      "Quando i canoni non vengono ripartiti",
      "Quando serve chiedere rendiconto a un coerede",
      "Quando l’immobile locato deve essere venduto o diviso",
      "Quando ci sono spese da imputare correttamente",
    ],
    checks: [
      "Contratto di locazione",
      "Quote ereditarie",
      "Canoni incassati",
      "Spese sostenute",
      "Gestione del rapporto con l’inquilino",
    ],
    errors: [
      "Lasciare incassi e spese senza rendiconto",
      "Non distinguere canoni, depositi e spese",
      "Non formalizzare accordi tra coeredi",
      "Agire sull’inquilino senza coordinamento tra eredi",
    ],
    documents: [
      "Contratto di locazione",
      "Estratti conto degli incassi",
      "Ricevute dei canoni",
      "Spese condominiali e fiscali",
      "Comunicazioni con l’inquilino",
    ],
    trust:
      "Quando un immobile ereditato produce reddito, la gestione dei canoni deve essere tracciata con precisione per evitare che il conflitto sugli incassi si estenda a tutta la successione.",
    relatedArticles: [
      "mediazione-ereditaria-quando-conviene",
      "conti-correnti-del-de-cuius-cosa-sapere",
    ],
    relatedLinks: [
      { href: "/casa-ereditata", label: "Vai alla casa ereditata" },
      { href: "/divisione-ereditaria", label: "Approfondisci la divisione ereditaria" },
      { href: "/recupero-somme-ereditarie", label: "Leggi sul recupero delle somme ereditarie" },
      { href: "/mediazione-ereditaria", label: "Leggi sulla mediazione ereditaria" },
    ],
    faq: [
      {
        question: "Gli affitti spettano a tutti gli eredi?",
        answer:
          "In linea generale i canoni seguono le quote ereditarie, ma la verifica concreta richiede di considerare incassi, spese e gestione effettiva del rapporto locativo.",
      },
      {
        question: "Cosa fare se un coerede incassa tutto?",
        answer:
          "Può essere necessario chiedere rendiconto e ricostruire somme incassate, spese trattenute e quote spettanti agli altri coeredi.",
      },
      {
        question: "Le spese si possono detrarre dagli affitti?",
        answer:
          "Dipende dal tipo di spesa e da come va imputata nel rapporto tra coeredi. Serve una ricostruzione chiara.",
      },
      {
        question: "Chi decide se rinnovare o disdire il contratto?",
        answer:
          "La decisione va coordinata con la posizione dei coeredi e con la gestione complessiva dell’immobile ereditato.",
      },
      {
        question: "Serve un rendiconto tra coeredi?",
        answer:
          "Sì, soprattutto quando uno solo incassa o gestisce il rapporto con l’inquilino.",
      },
    ],
  },
  {
    slug: "conti-correnti-azioni-polizze-eredita",
    title: "Conti correnti, azioni e polizze in eredità",
    shortTitle: "Conti correnti e polizze",
    description:
      "Assistenza legale su conti correnti del defunto, somme ereditarie, titoli, azioni, investimenti e polizze assicurative nella successione.",
    seoTitle:
      "Conti correnti, azioni e polizze in eredità: come si dividono",
    seoDescription:
      "Assistenza legale su conti correnti del defunto, somme ereditarie, titoli, azioni, investimenti e polizze assicurative nella successione.",
    heroTitle: "Come si dividono conti correnti, azioni e polizze nell’eredità?",
    heroIntro:
      "Conti correnti, somme, titoli, azioni e polizze possono essere tra i beni più delicati della successione. Occorre ricostruire saldo, movimenti, beneficiari, eventuali prelievi e diritti degli eredi.",
    problemList: [
      "La banca non sblocca le somme",
      "Un erede ha prelevato denaro prima o dopo la morte",
      "Non sono chiari titoli, azioni o investimenti",
      "Ci sono polizze con beneficiari da verificare",
      "Mancano estratti conto o documenti bancari",
    ],
    whenToCall: [
      "Quando servono dati bancari completi",
      "Quando emergono prelievi sospetti",
      "Quando bisogna dividere somme o strumenti finanziari",
      "Quando polizze o investimenti non sono chiari",
    ],
    checks: [
      "Saldo alla data del decesso",
      "Movimenti anteriori e successivi",
      "Cointestazioni e deleghe",
      "Titoli, fondi, azioni e dossier",
      "Polizze vita e beneficiari",
    ],
    errors: [
      "Firmare quietanze senza aver visto i movimenti",
      "Fermarsi al saldo finale senza controllare i prelievi",
      "Confondere conto cointestato e proprietà effettiva delle somme",
      "Ignorare polizze, dossier titoli e investimenti",
    ],
    documents: [
      "Estratti conto",
      "Certificazione dei saldi alla data del decesso",
      "Documentazione titoli e dossier",
      "Polizze assicurative",
      "Comunicazioni bancarie",
      "Dichiarazione di successione",
    ],
    trust:
      "Su conti, investimenti e polizze la differenza la fanno cronologia dei movimenti, titolarità effettiva e coordinamento tra banca, successione e diritti degli eredi.",
    relatedArticles: [
      "conti-correnti-del-de-cuius-cosa-sapere",
      "quota-di-legittima-come-si-calcola",
      "mediazione-ereditaria-quando-conviene",
    ],
    relatedLinks: [
      { href: "/recupero-somme-ereditarie", label: "Vai al recupero delle somme ereditarie" },
      { href: "/collazione-e-donazioni", label: "Approfondisci collazione e donazioni" },
      { href: "/lesione-di-legittima", label: "Leggi sulla quota di legittima" },
      { href: "/divisione-ereditaria", label: "Vai alla divisione ereditaria" },
    ],
    faq: [
      {
        question: "Come si dividono i soldi sul conto corrente?",
        answer:
          "Occorre partire da saldo, movimenti, eventuali cointestazioni e posizione successoria degli eredi. Non basta guardare il dato finale comunicato dalla banca.",
      },
      {
        question: "Gli eredi possono chiedere gli estratti conto?",
        answer:
          "Sì, nei limiti e con i presupposti corretti. Spesso la ricostruzione documentale è il primo passo indispensabile.",
      },
      {
        question: "Cosa succede se un erede ha prelevato denaro?",
        answer:
          "Va verificato quando, con quale titolo e con quale incidenza sulla successione o sulla divisione delle somme.",
      },
      {
        question: "Le polizze vita fanno parte dell’eredità?",
        answer:
          "Non sempre nello stesso modo dei beni ereditari ordinari. La verifica dipende da tipo di polizza, beneficiari e funzione concreta del rapporto.",
      },
      {
        question: "Come si dividono azioni, fondi e titoli?",
        answer:
          "Serve ricostruire dossier, valori, intestazioni e possibilità di liquidazione o assegnazione tra coeredi.",
      },
    ],
  },
  {
    slug: "successioni-internazionali",
    title: "Successioni internazionali",
    shortTitle: "Successioni internazionali",
    description:
      "Assistenza in successioni con elementi esteri: residenza, beni in più Paesi, legge applicabile, regolamento europeo e coordinamento documentale.",
    heroTitle: "Ci sono beni o eredi all’estero?",
    heroIntro:
      "Immobili esteri, conti fuori dall’Italia, residenza abituale all’estero o documenti stranieri cambiano il quadro della successione. Serve coordinare legge applicabile, foro e documentazione.",
    problemList: [
      "Defunto residente all’estero o con beni in più Stati",
      "Conflitti sulla legge applicabile alla successione",
      "Immobili esteri, conti esteri o eredi residenti fuori dall’Italia",
      "Necessità di coordinare professionisti e documenti internazionali",
    ],
    whenToCall: [
      "Quando esiste qualsiasi elemento transfrontaliero rilevante",
      "Quando servono verifiche su residenza abituale e scelta di legge",
      "Quando la successione coinvolge immobili o banche estere",
      "Quando il caso impatta su quote, testamento o certificazione successoria europea",
    ],
    checks: [
      "Elemento internazionale realmente decisivo",
      "Legge applicabile e foro competente",
      "Titoli, traduzioni, apostille e documentazione estera",
      "Compatibilità tra disciplina italiana e straniera",
    ],
    errors: [
      "Applicare automaticamente la legge italiana a ogni caso",
      "Trascurare la nozione di residenza abituale",
      "Sottovalutare tempi e forma dei documenti esteri",
      "Separare patrimonio italiano ed estero senza una visione unitaria",
    ],
    documents: [
      "Atti anagrafici e certificati esteri",
      "Testamenti, atti di proprietà e documentazione bancaria",
      "Documenti su residenza, cittadinanza e rapporti familiari",
      "Traduzioni asseverate e legalizzazioni ove necessarie",
    ],
    trust:
      "Le successioni internazionali premiano un’impostazione ordinata fin dall’inizio: una scelta sbagliata sulla legge applicabile compromette tutto il percorso successivo.",
    relatedArticles: [
      "successioni-internazionali-cosa-cambia",
      "testamento-quando-si-puo-contestare",
    ],
    faq: [
      {
        question: "Se il defunto era italiano ma viveva all’estero si applica sempre la legge italiana?",
        answer:
          "No. Va verificata la residenza abituale e l’eventuale scelta di legge. Nei casi internazionali non si può ragionare per automatismi.",
      },
    ],
  },
  {
    slug: "mediazione-ereditaria",
    title: "Mediazione ereditaria",
    shortTitle: "Mediazione ereditaria",
    description:
      "Preparazione tecnica della mediazione in materia ereditaria, divisioni, legittima, impugnazioni e conflitti tra coeredi.",
    heroTitle: "Vuoi evitare una causa tra eredi?",
    heroIntro:
      "La mediazione ereditaria funziona solo se arriva con patrimonio ricostruito, valori attendibili e opzioni concrete. Senza preparazione, rischia di essere solo un rinvio.",
    problemList: [
      "Mediazione obbligatoria in vista di una causa ereditaria",
      "Coeredi già conflittuali e diffidenza reciproca",
      "Immobili e somme da ripartire con conguagli",
      "Necessità di misurare rapidamente il punto di equilibrio",
    ],
    whenToCall: [
      "Quando vuoi arrivare alla mediazione con una posizione tecnica solida",
      "Quando la controparte usa la mediazione solo per rinviare",
      "Quando serve capire cosa è negoziabile e cosa no",
      "Quando una buona mediazione può evitare una divisione giudiziale lunga e costosa",
    ],
    checks: [
      "Dossier documentale e patrimoniale",
      "Quote, pretese, punti cedibili e punti indisponibili",
      "Valore economico dell’accordo rispetto all’alternativa giudiziale",
      "Rischi probatori e tempi del contenzioso",
    ],
    errors: [
      "Andare in mediazione senza dati e valori affidabili",
      "Confondere disponibilità al dialogo con debolezza",
      "Trascurare verbalizzazione e struttura dell’accordo",
      "Usare la mediazione prima di aver ricostruito il patrimonio",
    ],
    documents: [
      "Convocazione in mediazione e atti già scambiati",
      "Documenti patrimoniali e familiari essenziali",
      "Perizie, stime o bozze di riparto",
      "Elementi probatori su uso dei beni, spese o donazioni",
    ],
    trust:
      "La mediazione ereditaria funziona quando il lavoro tecnico è già stato fatto: è su questa preparazione che costruiamo il vantaggio negoziale.",
    relatedArticles: [
      "mediazione-ereditaria-quando-conviene",
      "divisione-gioielli-eredita",
    ],
    faq: [
      {
        question: "La mediazione ereditaria è sempre obbligatoria?",
        answer:
          "Dipende dal tipo di domanda e dal percorso processuale. In molte controversie ereditarie è un passaggio rilevante, ma va inquadrato correttamente sul caso concreto.",
      },
    ],
  },
  {
    slug: "eredita-giacente",
    title: "Eredità giacente",
    shortTitle: "Eredità giacente",
    description:
      "Assistenza su eredità giacente, nomina del curatore, amministrazione dell’asse e gestione dei beni in assenza di accettazione.",
    heroTitle: "L’eredità è senza gestione o senza eredi certi?",
    heroIntro:
      "Quando nessuno accetta l’eredità o la situazione resta ferma, beni e passività richiedono una gestione tecnica prudente. Occorre capire subito se vi sono i presupposti della giacenza.",
    problemList: [
      "Eredi incerti, inattivi o indecisi",
      "Beni da conservare o amministrare con urgenza",
      "Creditori interessati alla gestione dell’asse",
      "Necessità di capire ruoli e limiti del curatore",
    ],
    whenToCall: [
      "Quando l’eredità è ferma e i beni rischiano di deteriorarsi",
      "Quando servono chiarimenti sulla nomina del curatore",
      "Quando ci sono debiti o creditori da gestire",
      "Quando un potenziale erede vuole valutare senza esporsi a rischi inutili",
    ],
    checks: [
      "Presupposti della giacenza",
      "Beni e passività da amministrare",
      "Atti urgenti e conservativi necessari",
      "Interesse concreto dei soggetti coinvolti",
    ],
    errors: [
      "Agire sui beni prima di aver chiarito la posizione ereditaria",
      "Confondere giacenza con rinuncia",
      "Trascurare il ruolo dei creditori",
      "Sottovalutare la necessità di una gestione documentata",
    ],
    documents: [
      "Certificato di morte e documenti anagrafici",
      "Titoli di proprietà e visure",
      "Documentazione bancaria e fiscale",
      "Atti o comunicazioni di creditori",
    ],
    trust:
      "La fase di giacenza richiede prudenza tecnica: ogni iniziativa sui beni deve essere compatibile con la posizione ereditaria e con la tutela dell’asse.",
    relatedArticles: [
      "eredita-giacente-significato-e-rischi",
      "rinuncia-eredita-costi-e-conseguenze",
    ],
    faq: [
      {
        question: "L’eredità giacente significa che l’eredità è stata rinunciata?",
        answer:
          "No. La giacenza riguarda una fase in cui l’eredità non è ancora stata accettata e necessita di amministrazione. Non coincide automaticamente con la rinuncia.",
      },
    ],
  },
  {
    slug: "rinuncia-eredita",
    title: "Rinuncia all’eredità",
    shortTitle: "Rinuncia eredità",
    description:
      "Valutazione di rinuncia, accettazione espressa o tacita, benefici d’inventario, debiti ereditari e rischi operativi prima della scelta.",
    heroTitle: "Conviene rinunciare all’eredità?",
    heroIntro:
      "Debiti, atti già compiuti, beneficio d’inventario e posizione degli altri chiamati incidono sulla scelta. La rinuncia va valutata con attenzione prima di assumere decisioni irreversibili.",
    problemList: [
      "Timore di ereditare debiti o passività occulte",
      "Incertezza su atti già compiuti che potrebbero valere come accettazione",
      "Presenza di minori o incapaci nella linea ereditaria",
      "Beni di modesto valore ma con oneri rilevanti",
    ],
    whenToCall: [
      "Quando non conosci ancora l’esatto perimetro di beni e debiti",
      "Quando temi di aver compiuto atti incompatibili con la rinuncia",
      "Quando devi scegliere tra rinuncia e beneficio d’inventario",
      "Quando la decisione può incidere su figli, rappresentazione o creditori",
    ],
    checks: [
      "Presenza di debiti, garanzie o contenziosi pendenti",
      "Atti già compiuti dopo il decesso",
      "Termini e procedura corretta",
      "Effetti della scelta sugli altri chiamati all’eredità",
    ],
    errors: [
      "Rinunciare senza aver verificato beni attivi recuperabili",
      "Compiere atti dispositivi sui beni del defunto",
      "Confondere la mancata presentazione della successione con una rinuncia valida",
      "Decidere senza valutare alternative protettive",
    ],
    documents: [
      "Documenti anagrafici e certificato di morte",
      "Informazioni su debiti, mutui, cartelle o contenziosi",
      "Documentazione su immobili, conti e beni conosciuti",
      "Eventuali atti già compiuti dal chiamato",
    ],
    trust:
      "Prima di rinunciare serve un controllo rigoroso: una scelta fatta male può essere inefficace o economicamente dannosa.",
    relatedArticles: [
      "rinuncia-eredita-costi-e-conseguenze",
      "conti-correnti-del-de-cuius-cosa-sapere",
    ],
    faq: [
      {
        question: "Se non faccio nulla ho rinunciato automaticamente?",
        answer:
          "No. L’inerzia non equivale di per sé a rinuncia formale. Inoltre alcuni comportamenti possono integrare accettazione tacita con effetti molto rilevanti.",
      },
    ],
  },
  {
    slug: "recupero-somme-ereditarie",
    title: "Recupero di somme ereditarie e conti correnti",
    shortTitle: "Recupero somme ereditarie",
    description:
      "Recupero di somme del de cuius, verifica di conti correnti, prelievi, investimenti, polizze e tracciamento di disponibilità patrimoniali.",
    heroTitle: "Devi recuperare somme ereditarie o conti del defunto?",
    heroIntro:
      "Conti bloccati, prelievi sospetti, cointestazioni e investimenti non chiari richiedono una ricostruzione rigorosa. Il punto è capire chi aveva disponibilità delle somme e come recuperarle.",
    problemList: [
      "Conti correnti bloccati o non pienamente conosciuti",
      "Prelievi sospetti prima del decesso",
      "Difficoltà a ricostruire investimenti, polizze o cassette di sicurezza",
      "Conflitti su somme detenute da uno dei familiari",
    ],
    whenToCall: [
      "Quando mancano trasparenza e documentazione bancaria completa",
      "Quando sospetti svuotamenti o operazioni anomale",
      "Quando la banca richiede titoli o integrazioni per sbloccare posizioni",
      "Quando le somme incidono su divisione, legittima o donazioni indirette",
    ],
    checks: [
      "Rapporti bancari esistenti e soggetti delegati o cointestatari",
      "Movimenti rilevanti in prossimità del decesso",
      "Titolarità effettiva delle somme e trattamento successorio",
      "Collegamento con divisione ereditaria o azioni di riduzione",
    ],
    errors: [
      "Pensare che la cointestazione risolva automaticamente il problema della titolarità",
      "Trascurare la cronologia dei movimenti e la prova documentale",
      "Separare il tema bancario dal resto del patrimonio ereditario",
      "Agire contro la banca senza una ricostruzione preliminare robusta",
    ],
    documents: [
      "Estratti conto, documentazione bancaria e contratti di investimento",
      "Comunicazioni di blocco o richieste della banca",
      "Testamento, dichiarazione di successione e documenti anagrafici",
      "Prova di deleghe, cointestazioni o operazioni sospette",
    ],
    trust:
      "Il recupero delle somme ereditarie richiede precisione documentale e una lettura coordinata con quote, legittima, donazioni e divisione.",
    relatedArticles: [
      "conti-correnti-del-de-cuius-cosa-sapere",
      "quota-di-legittima-come-si-calcola",
    ],
    faq: [
      {
        question: "Un conto cointestato appartiene automaticamente per metà al superstite?",
        answer:
          "Non sempre in termini sostanziali e successori. La cointestazione bancaria non esaurisce da sola la verifica della provenienza e della spettanza effettiva delle somme.",
      },
    ],
  },
];

export const moneyPages: ServicePage[] = [...baseMoneyPages, ...adsServicePages];

export const hubPages: HubPage[] = [
  {
    slug: "testamento",
    title: "Testamento",
    description:
      "Guida ai testamenti: validità, pubblicazione, contestazione, tutela dei legittimari e ricadute sulla successione.",
    intro:
      "Il testamento è spesso il centro del conflitto successorio. In questa sezione trovi le questioni chiave: forme, validità, prova, rapporti con la legittima e strategie in caso di contestazione.",
    sections: [
      {
        title: "Nodi da capire subito",
        items: [
          "Differenza tra testamento olografo, pubblico e segreto",
          "Requisiti formali e profili di invalidità",
          "Capacità del testatore e influenza indebita",
          "Rapporto tra disposizioni testamentarie e quota di legittima",
        ],
      },
      {
        title: "Quando il tema diventa contenzioso",
        items: [
          "Autenticità della scheda testamentaria",
          "Interpretazione delle clausole",
          "Annullamento, nullità o riduzione",
          "Effetti sui beni e sulla divisione ereditaria",
        ],
      },
    ],
    featuredArticles: ["testamento-quando-si-puo-contestare"],
    connectedServices: ["impugnazione-testamento", "lesione-di-legittima"],
    faq: [
      {
        question: "Un testamento può escludere totalmente i figli?",
        answer:
          "Può contenerne l’esclusione sul piano formale, ma va poi verificato se la disposizione lede la quota riservata ai legittimari e quali azioni siano esperibili.",
      },
    ],
  },
  {
    slug: "legittima",
    title: "Legittima",
    description:
      "Approfondimenti su quota di legittima, riduzione, donazioni e tutela dei legittimari nella successione.",
    intro:
      "La legittima è uno dei temi più cercati e più fraintesi. Qui trovi i contenuti che aiutano a capire quota di riserva, massa di calcolo, donazioni e rimedi contro le disposizioni lesive.",
    sections: [
      {
        title: "Questioni essenziali",
        items: [
          "Chi sono i legittimari",
          "Come si calcola la quota di riserva",
          "Cosa entra nella massa di calcolo",
          "Differenza tra lesione, riduzione e restituzione",
        ],
      },
    ],
    featuredArticles: ["quota-di-legittima-come-si-calcola"],
    connectedServices: ["lesione-di-legittima", "collazione-e-donazioni"],
    faq: [
      {
        question: "Le donazioni in vita incidono sempre sulla legittima?",
        answer:
          "Incidono quando, per natura e prova, devono essere considerate nella ricostruzione della massa. È una verifica tecnica, non automatica.",
      },
    ],
  },
  {
    slug: "divisione-ereditaria",
    title: "Divisione ereditaria",
    description:
      "Guide su scioglimento della comunione ereditaria, immobili, beni mobili, conguagli, mediazione e contenzioso tra coeredi.",
    intro:
      "La divisione ereditaria è il punto in cui il diritto incontra il patrimonio reale: immobili, denaro, beni mobili, rendiconti, spese e conguagli devono essere coordinati in modo rigoroso.",
    sections: [
      {
        title: "Questioni da presidiare",
        items: [
          "Comodità divisoria e indivisibilità dei beni",
          "Uso esclusivo dell’immobile ereditato",
          "Beni mobili, gioielli e arredi",
          "Mediazione e giudizio divisorio",
        ],
      },
    ],
    featuredArticles: ["divisione-gioielli-eredita", "mediazione-ereditaria-quando-conviene"],
    connectedServices: ["divisione-ereditaria", "mediazione-ereditaria"],
    faq: [
      {
        question: "La divisione ereditaria riguarda solo gli immobili?",
        answer:
          "No. Coinvolge l’intero asse: denaro, mobili, crediti, gioielli, spese, frutti e ogni altro valore che deve essere attribuito o compensato.",
      },
    ],
  },
  {
    slug: "donazioni",
    title: "Donazioni",
    description:
      "Approfondimenti su donazioni, collazione, liberalità indirette e impatto delle attribuzioni fatte in vita sulla successione.",
    intro:
      "Le donazioni sono spesso il vero terreno dello scontro tra coeredi. In questa sezione trovi i criteri per distinguere liberalità rilevanti, prova e impatto sulle quote ereditarie.",
    sections: [
      {
        title: "Aree di analisi",
        items: [
          "Donazione diretta e indiretta",
          "Tracciabilità bancaria e prova",
          "Collazione e imputazione",
          "Interferenze con la legittima",
        ],
      },
    ],
    featuredArticles: ["conti-correnti-del-de-cuius-cosa-sapere"],
    connectedServices: ["collazione-e-donazioni", "lesione-di-legittima"],
    faq: [
      {
        question: "Un immobile comprato dai genitori ma intestato al figlio conta in successione?",
        answer:
          "Può contare eccome, ma bisogna qualificare correttamente l’operazione e ricostruirne la prova.",
      },
    ],
  },
  {
    slug: "successione-legittima",
    title: "Successione legittima",
    description:
      "Guida alla successione legittima: quote, coniuge, figli, ascendenti e criteri di ripartizione quando manca il testamento.",
    intro:
      "Quando non esiste un testamento valido, opera la successione legittima. In questa sezione trovi chi eredita, in che misura e quali nodi operativi emergono nei casi più frequenti.",
    sections: [
      {
        title: "Casi più ricorrenti",
        items: [
          "Coniuge e figli",
          "Solo figli o solo coniuge",
          "Presenza di ascendenti o collaterali",
          "Rapporto con donazioni e beni indivisi",
        ],
      },
    ],
    featuredArticles: [
      "come-funziona-successione-legittima",
      "successione-legittima-con-coniuge-e-figli",
    ],
    connectedServices: ["avvocato-successioni", "divisione-ereditaria"],
    faq: [
      {
        question: "Se non c’è testamento ereditano sempre in parti uguali?",
        answer:
          "No. La ripartizione dipende dai chiamati presenti e dalle regole della successione legittima, che variano in base a coniuge, figli, ascendenti e altri parenti.",
      },
    ],
  },
  {
    slug: "successioni-internazionali",
    title: "Successioni internazionali",
    description:
      "Guida alle successioni con elementi esteri: residenza abituale, beni in più Paesi, legge applicabile e documentazione.",
    intro:
      "Quando la successione supera i confini nazionali, la prima domanda non è cosa spetta, ma quale legge si applica e quale autorità è competente.",
    sections: [
      {
        title: "Punti da verificare",
        items: [
          "Residenza abituale del defunto",
          "Eventuale professio iuris",
          "Beni e conti in Stati diversi",
          "Certificazioni, traduzioni e atti esteri",
        ],
      },
    ],
    featuredArticles: ["successioni-internazionali-cosa-cambia"],
    connectedServices: ["successioni-internazionali"],
    faq: [
      {
        question: "Un immobile all’estero segue sempre le regole del Paese in cui si trova?",
        answer:
          "Non basta una risposta astratta: nei casi internazionali vanno coordinati legge applicabile, beni, foro e forme di circolazione degli atti.",
      },
    ],
  },
  {
    slug: "conflitti-tra-coeredi",
    title: "Conflitti tra coeredi",
    description:
      "Contenuti dedicati ai conflitti tra coeredi: strategie, mediazione, divisione, uso dei beni, rendiconti e tutela patrimoniale.",
    intro:
      "Nei conflitti ereditari il problema non è solo giuridico. Servono struttura, prova e capacità di distinguere ciò che è negoziabile da ciò che richiede una tutela più incisiva.",
    sections: [
      {
        title: "Snodi ricorrenti",
        items: [
          "Uso esclusivo di immobili o somme",
          "Mancata trasparenza nella gestione dei beni",
          "Conflitti su testamento o legittima",
          "Mediazione preparata male o troppo tardi",
        ],
      },
    ],
    featuredArticles: ["mediazione-ereditaria-quando-conviene", "divisione-gioielli-eredita"],
    connectedServices: ["divisione-ereditaria", "mediazione-ereditaria", "avvocato-successioni"],
    faq: [
      {
        question: "Conviene tentare subito un accordo?",
        answer:
          "Conviene solo se arriva dopo una ricostruzione seria di beni, quote e punti di attrito. Altrimenti si rischia di perdere tempo e posizioni utili.",
      },
    ],
  },
];

export const articles: ArticleEntry[] = [
  {
    slug: "quota-di-legittima-come-si-calcola",
    title: "Quota di legittima: come si calcola davvero e quali errori evitare",
    excerpt:
      "Guida answer-first alla quota di legittima: chi ne ha diritto, come si ricostruisce la massa e perché le donazioni cambiano il risultato.",
    answerFirst:
      "La quota di legittima non si calcola guardando solo ai beni rimasti al momento della morte. Bisogna ricostruire la massa ereditaria tenendo conto anche di debiti e donazioni rilevanti, per poi distinguere tra quota disponibile e quota riservata ai legittimari.",
    category: "Legittima",
    relatedServiceSlugs: ["lesione-di-legittima", "testamento", "collazione-e-donazioni"],
    faq: [
      {
        question: "Chi sono i legittimari?",
        answer:
          "Coniuge, figli e, in alcuni casi, ascendenti. Sono i soggetti cui la legge riserva una quota minima del patrimonio.",
      },
      {
        question: "Le donazioni incidono sempre sul calcolo?",
        answer:
          "Incidono quando devono essere considerate nella massa di calcolo. La verifica va fatta caso per caso in base alla natura della liberalità e alla prova disponibile.",
      },
    ],
    sections: [
      {
        title: "Perché il calcolo intuitivo è spesso sbagliato",
        paragraphs: [
          "Molti immaginano la legittima come una semplice frazione del patrimonio residuo. In realtà il calcolo richiede un passaggio tecnico: si ricostruisce la massa di riferimento, si sottraggono i debiti e si tiene conto delle attribuzioni fatte in vita che rilevano nella vicenda successoria.",
          "Questo significa che una successione apparentemente lineare può nascondere una lesione significativa se esistono donazioni immobiliari, bonifici, liberalità indirette o trasferimenti patrimoniali da qualificare correttamente.",
        ],
      },
      {
        title: "Cosa entra nella massa di calcolo",
        paragraphs: [
          "Entrano anzitutto i beni relitti, cioè quelli ancora presenti nel patrimonio al momento della morte, insieme ai debiti ereditari da considerare nel saldo complessivo.",
          "A questi elementi possono aggiungersi donazioni e attribuzioni fatte in vita, quando il loro trattamento è giuridicamente rilevante ai fini della tutela dei legittimari.",
        ],
      },
      {
        title: "Perché la prova è decisiva",
        paragraphs: [
          "Nel contenzioso la differenza non la fa solo la norma, ma la capacità di documentare valori, trasferimenti, titoli e rapporti familiari. Senza prova, anche una lesione teoricamente evidente può diventare difficile da far valere.",
        ],
      },
    ],
  },
  {
    slug: "come-funziona-successione-legittima",
    title: "Successione legittima: come funziona quando manca il testamento",
    excerpt:
      "Chi eredita se non c’è testamento? Una guida chiara alle regole della successione legittima e ai casi più frequenti.",
    answerFirst:
      "La successione legittima si applica quando manca un testamento valido o quando il testamento non disciplina tutto il patrimonio. In quel caso la legge stabilisce chi eredita e in quale misura, in base ai rapporti di parentela esistenti.",
    category: "Successione legittima",
    relatedServiceSlugs: ["successione-legittima", "avvocato-successioni", "divisione-ereditaria"],
    faq: [
      {
        question: "Se non c’è testamento ereditano sempre i figli?",
        answer:
          "Dipende da chi è presente nella successione. La presenza del coniuge, di più figli o di altri parenti cambia la ripartizione delle quote.",
      },
    ],
    sections: [
      {
        title: "Quando si apre la successione legittima",
        paragraphs: [
          "La successione legittima interviene quando non esiste un testamento valido oppure quando il testamento non dispone dell’intero asse. È quindi una disciplina residuale, ma di frequente applicazione pratica.",
        ],
      },
      {
        title: "Perché non basta conoscere la regola generale",
        paragraphs: [
          "Anche quando la chiamata è definita dalla legge, restano da chiarire beni, quote, eventuali donazioni, debiti e rapporti tra coeredi. È qui che nasce la gran parte dei conflitti successori.",
        ],
      },
    ],
  },
  {
    slug: "successione-legittima-con-coniuge-e-figli",
    title: "Successione legittima con coniuge e figli: quote e casi pratici",
    excerpt:
      "Le quote cambiano in base al numero dei figli e alla composizione della famiglia. Ecco cosa verificare davvero.",
    answerFirst:
      "Nella successione legittima con coniuge e figli le quote non sono sempre identiche: cambiano in base al numero dei figli e alla struttura familiare. Per applicarle bene bisogna però considerare anche patrimonio, eventuali donazioni e successiva divisione dei beni.",
    category: "Successione legittima",
    relatedServiceSlugs: ["successione-legittima", "avvocato-successioni", "divisione-ereditaria"],
    faq: [
      {
        question: "Coniuge e un figlio ereditano allo stesso modo di coniuge e più figli?",
        answer:
          "No. La legge prevede ripartizioni differenti, e su queste poi incidono i beni concreti da dividere.",
      },
    ],
    sections: [
      {
        title: "Le quote sono solo il punto di partenza",
        paragraphs: [
          "Sapere la percentuale astratta di spettanza non basta. Il vero problema pratico emerge quando il patrimonio è composto da immobili indivisi, denaro, donazioni pregresse o beni che non si ripartiscono automaticamente.",
        ],
      },
    ],
  },
  {
    slug: "divisione-gioielli-eredita",
    title: "Divisione dei gioielli in eredità: prova, valore e criteri pratici",
    excerpt:
      "I gioielli ereditari generano conflitti frequenti perché il problema è spesso provare esistenza, disponibilità e valore prima ancora della divisione.",
    answerFirst:
      "La divisione dei gioielli in eredità non si risolve con una regola astratta sulla quota. Prima bisogna dimostrare quali beni esistono, dove si trovano, chi li detiene e quale valore hanno.",
    category: "Divisione ereditaria",
    relatedServiceSlugs: ["gioielli-ereditati", "divisione-ereditaria", "mediazione-ereditaria"],
    faq: [
      {
        question: "I gioielli si dividono come il denaro?",
        answer:
          "No. Nei beni mobili di pregio conta molto la prova della consistenza e la scelta del criterio di attribuzione o conguaglio.",
      },
    ],
    sections: [
      {
        title: "Perché i beni mobili sono tra i più difficili da trattare",
        paragraphs: [
          "A differenza degli immobili, i gioielli non hanno un registro pubblico e spesso non esiste un inventario completo. Il conflitto nasce quindi già sulla loro individuazione.",
          "Una buona strategia parte da elenco, fotografie, stime e prova della detenzione attuale, prima ancora di discutere la ripartizione finale.",
        ],
      },
    ],
  },
  {
    slug: "testamento-quando-si-puo-contestare",
    title: "Quando si può contestare un testamento",
    excerpt:
      "Contestare un testamento è possibile solo in presenza di vizi o lesioni giuridicamente rilevanti. Ecco i criteri da usare prima di iniziare una causa.",
    answerFirst:
      "Un testamento si può contestare quando esistono motivi giuridicamente fondati, come vizi formali, incapacità del testatore, autenticità dubbia o lesione della quota di legittima. Il semplice dissenso familiare non basta.",
    category: "Testamento",
    relatedServiceSlugs: [
      "testamento",
      "impugnazione-testamento",
      "testamento-olografo-falso",
      "lesione-di-legittima",
    ],
    faq: [
      {
        question: "Se il testamento mi sembra ingiusto posso contestarlo?",
        answer:
          "L’ingiustizia percepita non basta. Serve un motivo giuridico serio e una base probatoria adeguata.",
      },
    ],
    sections: [
      {
        title: "Le quattro verifiche da fare prima di agire",
        paragraphs: [
          "Prima di contestare un testamento occorre verificare tipo di azione, interesse concreto, prove disponibili e impatto patrimoniale dell’eventuale vittoria.",
        ],
      },
    ],
  },
  {
    slug: "conti-correnti-del-de-cuius-cosa-sapere",
    title: "Conti correnti del de cuius: cosa sapere su blocco, prelievi e recupero somme",
    excerpt:
      "Come affrontare conti bloccati, cointestazioni e movimenti sospetti nella successione.",
    answerFirst:
      "I conti correnti del de cuius non sono solo un adempimento bancario. Possono incidere su ricostruzione del patrimonio, divisione, legittima, donazioni indirette e recupero di somme contestate.",
    category: "Patrimonio ereditario",
    relatedServiceSlugs: ["recupero-somme-ereditarie", "collazione-e-donazioni"],
    faq: [
      {
        question: "La banca consegna subito le somme agli eredi?",
        answer:
          "No. Di regola richiede documentazione specifica e la situazione può complicarsi in presenza di conflitti o dubbi sulla titolarità.",
      },
    ],
    sections: [
      {
        title: "Il nodo dei movimenti prima del decesso",
        paragraphs: [
          "Bonifici, prelievi e spostamenti di somme in prossimità del decesso possono diventare decisivi. Per questo serve una ricostruzione cronologica precisa, non impressionistica.",
        ],
      },
    ],
  },
  {
    slug: "mediazione-ereditaria-quando-conviene",
    title: "Mediazione ereditaria: quando conviene davvero",
    excerpt:
      "Una mediazione ereditaria funziona solo se arriva con un dossier preparato. Altrimenti diventa un rinvio costoso.",
    answerFirst:
      "La mediazione ereditaria conviene quando il caso è già stato messo in ordine: patrimonio, quote, beni, donazioni, valori e punti di conflitto devono essere chiari prima dell’incontro.",
    category: "Mediazione",
    relatedServiceSlugs: ["conflitti-tra-coeredi", "mediazione-ereditaria", "divisione-ereditaria"],
    faq: [
      {
        question: "La mediazione è utile anche quando i rapporti sono ormai rotti?",
        answer:
          "Può esserlo, ma solo se la trattativa si fonda su dati tecnici e non sulla sola disponibilità emotiva delle parti.",
      },
    ],
    sections: [
      {
        title: "La mediazione non sostituisce il lavoro tecnico",
        paragraphs: [
          "Molte mediazioni falliscono perché vengono affrontate come un passaggio formale. In realtà la qualità del risultato dipende dalla preparazione giuridica e patrimoniale fatta prima.",
        ],
      },
    ],
  },
  {
    slug: "eredita-giacente-significato-e-rischi",
    title: "Eredità giacente: significato, nomina del curatore e rischi da conoscere",
    excerpt:
      "Cos’è l’eredità giacente, quando si apre e quali conseguenze pratiche comporta per beni, debiti ed eredi.",
    answerFirst:
      "L’eredità giacente è una fase in cui l’eredità non è ancora stata accettata e necessita di amministrazione. Serve a evitare vuoti di gestione su beni e rapporti patrimoniali del defunto.",
    category: "Eredità giacente",
    relatedServiceSlugs: ["beneficio-inventario", "eredita-giacente", "rinuncia-eredita"],
    faq: [
      {
        question: "L’eredità giacente equivale a dire che nessuno erediterà?",
        answer:
          "No. Significa che, in quel momento, l’eredità non è stata ancora accettata e richiede gestione secondo regole specifiche.",
      },
    ],
    sections: [
      {
        title: "Perché la giacenza non è un dettaglio tecnico",
        paragraphs: [
          "La gestione dell’eredità in questa fase incide sulla conservazione dei beni, sui rapporti con i creditori e sulle scelte future dei chiamati. Per questo va impostata correttamente fin dall’inizio.",
        ],
      },
    ],
  },
  {
    slug: "rinuncia-eredita-costi-e-conseguenze",
    title: "Rinuncia all’eredità: costi, conseguenze e errori da evitare",
    excerpt:
      "Quando rinunciare, cosa succede dopo e perché l’accettazione tacita è il rischio più sottovalutato.",
    answerFirst:
      "Rinunciare all’eredità può essere opportuno, ma solo dopo aver verificato beni, debiti e comportamenti già tenuti. Il rischio maggiore è credere di poter rinunciare dopo aver compiuto atti che valgono come accettazione tacita.",
    category: "Rinuncia",
    relatedServiceSlugs: ["beneficio-inventario", "rinuncia-eredita", "eredita-giacente"],
    faq: [
      {
        question: "Posso rinunciare se ho già iniziato a usare i beni del defunto?",
        answer:
          "Dipende dal tipo di atti compiuti. Alcuni comportamenti possono essere incompatibili con la rinuncia e vanno valutati con estrema cautela.",
      },
    ],
    sections: [
      {
        title: "La vera domanda non è solo quanto costa",
        paragraphs: [
          "Il costo formale della rinuncia è spesso il tema meno importante. Il punto è se la scelta sia davvero coerente con il patrimonio, i debiti e gli atti già compiuti dal chiamato.",
        ],
      },
    ],
  },
  {
    slug: "successioni-internazionali-cosa-cambia",
    title: "Successioni internazionali: cosa cambia davvero quando c’è un elemento estero",
    excerpt:
      "Residenza, legge applicabile, immobili esteri e documenti: la guida per non affrontare una successione internazionale con schemi solo italiani.",
    answerFirst:
      "Nelle successioni internazionali cambia prima di tutto il metodo: bisogna identificare l’elemento estero rilevante, la legge applicabile e l’autorità competente, prima ancora di discutere quote e ripartizioni.",
    category: "Successioni internazionali",
    relatedServiceSlugs: ["successioni-internazionali"],
    faq: [
      {
        question: "Basta che un erede viva all’estero per parlare di successione internazionale?",
        answer:
          "Non sempre. L’elemento internazionale va qualificato con precisione per capire se incide davvero sulla disciplina applicabile.",
      },
    ],
    sections: [
      {
        title: "Perché la domanda iniziale è quasi sempre sbagliata",
        paragraphs: [
          "Spesso si chiede subito chi eredita e quanto. Nei casi internazionali la prima domanda corretta è un’altra: quale legge governa la successione e con quali effetti sui beni coinvolti.",
        ],
      },
    ],
  },
];

export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: "legittima",
    term: "Legittima",
    definition:
      "Quota del patrimonio che la legge riserva a determinati soggetti, detti legittimari, anche contro eventuali disposizioni contrarie del defunto.",
    whyItMatters:
      "È il concetto centrale per valutare esclusioni, squilibri testamentari, donazioni e possibili azioni di riduzione.",
    relatedSlugs: ["lesione-di-legittima", "quota-di-legittima-come-si-calcola"],
  },
  {
    slug: "collazione",
    term: "Collazione",
    definition:
      "Meccanismo con cui determinate donazioni fatte in vita a figli o coniuge vengono considerate nella ripartizione ereditaria.",
    whyItMatters:
      "Incide direttamente sulla divisione e sull’equilibrio tra coeredi quando vi sono attribuzioni patrimoniali pregresse.",
    relatedSlugs: ["collazione-e-donazioni", "quota-di-legittima-come-si-calcola"],
  },
  {
    slug: "eredita-giacente",
    term: "Eredità giacente",
    definition:
      "Situazione in cui l’eredità non è stata ancora accettata e necessita di una gestione dedicata per la tutela del patrimonio.",
    whyItMatters:
      "Aiuta a capire come si amministrano beni, debiti e urgenze quando la posizione degli eredi non è ancora definita.",
    relatedSlugs: ["eredita-giacente", "eredita-giacente-significato-e-rischi"],
  },
  {
    slug: "accettazione-tacita",
    term: "Accettazione tacita",
    definition:
      "Accettazione dell’eredità che deriva da comportamenti incompatibili con la volontà di rinunciare.",
    whyItMatters:
      "È il rischio principale per chi vuole rinunciare ma compie atti dispositivi o gestori sui beni del defunto.",
    relatedSlugs: ["rinuncia-eredita", "rinuncia-eredita-costi-e-conseguenze"],
  },
];

export const aboutPage = {
  title: "Chi siamo",
  intro:
    "Eredità e Successioni riunisce l’esperienza dello Studio Legale Del Monte nelle questioni ereditarie e successorie: testamenti, lesione di legittima, divisioni ereditarie, donazioni, mediazione e patrimoni con profili internazionali.",
  highlights: [
    "Esperienza ultraventennale nella gestione di controversie ereditarie e patrimoniali",
    "Approccio integrato tra consulenza, negoziazione, mediazione e tutela giudiziale",
    "Forte attenzione a patrimoni complessi, beni immobili, somme bancarie e successioni internazionali",
    "Metodo orientato a coniugare rigore tecnico, leggibilità e visione strategica",
  ],
  narrative: [
    "La materia successoria richiede una competenza che non sia solo civilistica in astratto. Ogni pratica intreccia rapporti familiari, prova documentale, patrimonio, tempi e spesso tensioni che durano da anni.",
    "Per questo il sito è stato pensato per offrire orientamento chiaro, informazioni utili e un accesso diretto all’assistenza legale nelle questioni che più spesso generano conflitti tra eredi e famiglie.",
    "Il tono dello Studio resta umano, diretto e misurato, ma con una forte base tecnica. L’obiettivo non è alimentare il conflitto: è chiarire rapidamente il terreno, proteggere la posizione del cliente e scegliere la strategia più efficace.",
  ],
};

export const thematicFaqs: FaqItem[] = [
  {
    question: "Affrontate solo contenziosi già avviati?",
    answer:
      "No. Interveniamo anche prima del conflitto aperto, quando serve impostare correttamente analisi documentale, quote, strategia e contatti con gli altri coeredi.",
  },
  {
    question: "Le pagine del sito sono pensate solo per Roma?",
    answer:
      "No. Lo studio ha sede a Roma ma opera su pratiche successorie in tutta Italia e, quando necessario, anche su questioni con profili internazionali o con coordinamento tra più luoghi.",
  },
  {
    question: "Posso contattarvi anche per una successione internazionale?",
    answer:
      "Sì. Le successioni internazionali richiedono un inquadramento iniziale particolarmente accurato su legge applicabile, documenti e coordinamento degli attori coinvolti.",
  },
  {
    question: "Seguite solo cause oppure anche fasi preventive e trattative?",
    answer:
      "Seguiamo anche la fase preventiva: verifica dei documenti, analisi delle quote, lettere ai coeredi, impostazione della mediazione e definizione della strategia prima che il conflitto degeneri.",
  },
  {
    question: "Posso scrivere anche se ho solo parte dei documenti?",
    answer:
      "Sì. Una prima valutazione serve spesso proprio a capire quali documenti mancano, dove recuperarli e quali verifiche hanno priorità nel tuo caso.",
  },
  {
    question: "Trattate successioni con immobili, conti e donazioni nello stesso dossier?",
    answer:
      "Sì. Molte pratiche successorie richiedono una lettura unitaria di immobili, somme bancarie, liberalità pregresse e rapporti tra coeredi, perché affrontarli separatamente porta spesso a errori.",
  },
  {
    question: "La consulenza è utile anche se non voglio fare subito causa?",
    answer:
      "Sì. Spesso la consulenza serve proprio a evitare mosse affrettate, chiarire la posizione giuridica e capire se esistono spazi reali per una soluzione negoziale o mediativa.",
  },
  {
    question: "Vi occupate anche di questioni bancarie e somme del de cuius?",
    answer:
      "Sì. Quando nella successione emergono conti correnti, investimenti, prelievi sospetti o somme non trasparenti, la ricostruzione bancaria diventa una parte centrale del lavoro.",
  },
];

function mergeFaqs(base: FaqItem[], additions: FaqItem[], maxItems = 8) {
  const seen = new Set<string>();

  return [...base, ...additions]
    .filter((item) => {
      const key = item.question.trim().toLowerCase();

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    })
    .slice(0, maxItems);
}

const successioniGeneralFaqs: FaqItem[] = [
  {
    question: "Gestite anche successioni con coeredi residenti in città diverse?",
    answer:
      "Sì. Nelle pratiche successorie è frequente coordinare documenti, firme, trattative e posizioni di persone che si trovano in luoghi diversi, senza che questo impedisca un’impostazione ordinata del caso.",
  },
  {
    question: "Quando conviene chiedere una valutazione prima di accettare l’eredità?",
    answer:
      "Conviene appena esistono dubbi su debiti, immobili indivisi, somme bancarie, donazioni pregresse o possibili contestazioni tra chiamati: sono tutti profili che incidono sulla strategia iniziale.",
  },
  {
    question: "La dichiarazione di successione risolve anche i conflitti tra eredi?",
    answer:
      "No. La dichiarazione ha una funzione fiscale e ricognitiva, ma non sostituisce la verifica delle quote, la divisione dei beni o la soluzione dei contrasti tra coeredi.",
  },
  {
    question: "Una successione può diventare contenziosa anche senza testamento?",
    answer:
      "Sì. I conflitti nascono spesso anche in successione legittima, soprattutto quando il patrimonio comprende immobili, somme da ricostruire, utilizzo esclusivo dei beni o donazioni fatte in vita.",
  },
  {
    question: "Serve sempre andare dal notaio prima di parlare con un avvocato?",
    answer:
      "No. In molte situazioni è utile prima una lettura legale del caso, per capire quali passaggi richiedono un notaio, quali documenti servono davvero e quali rischi evitare.",
  },
  {
    question: "Seguite anche pratiche in cui il problema principale è il coordinamento tra più beni e più persone?",
    answer:
      "Sì. Una parte importante del lavoro riguarda proprio l’ordine del dossier: quote, beni, documenti, posizioni dei coeredi e percorso più efficace tra trattativa, mediazione e giudizio.",
  },
];

const testamentoFaqs: FaqItem[] = [
  {
    question: "Quanto conta la grafia del testamento olografo?",
    answer:
      "Conta molto, ma non è l’unico profilo. Oltre all’autografia vanno verificati data, sottoscrizione, coerenza del contenuto e disponibilità di prove utili in caso di contestazione.",
  },
  {
    question: "È utile acquisire subito documentazione medica del testatore?",
    answer:
      "Spesso sì. Se il dubbio riguarda la capacità o possibili influenze indebite, la ricostruzione clinica e temporale diventa uno dei punti più importanti del fascicolo.",
  },
  {
    question: "Un testamento pubblico è inattaccabile?",
    answer:
      "No. Ha una struttura formale più forte, ma può comunque essere messo in discussione se emergono vizi della volontà, incapacità del testatore o profili di lesione della legittima.",
  },
  {
    question: "Posso contestare solo una clausola del testamento?",
    answer:
      "Dipende dal tipo di vizio e dall’effetto della disposizione. In alcuni casi il problema riguarda l’intero atto, in altri una specifica attribuzione o il suo impatto sulla quota riservata.",
  },
  {
    question: "Quanto pesa la prova testimoniale nelle contestazioni testamentarie?",
    answer:
      "Può essere utile, ma raramente basta da sola. È più efficace quando si combina con documenti, cartelle cliniche, messaggi, cronologia degli eventi e assetto patrimoniale.",
  },
  {
    question: "Prima di impugnare è utile verificare anche il patrimonio e le donazioni?",
    answer:
      "Sì. In molte situazioni la contestazione del testamento si intreccia con la ricostruzione della massa ereditaria e con l’eventuale tutela dei legittimari.",
  },
];

const divisioneFaqs: FaqItem[] = [
  {
    question: "La divisione ereditaria richiede sempre una perizia sugli immobili?",
    answer:
      "Non sempre, ma una stima attendibile è spesso indispensabile per impostare conguagli, ipotesi di assegnazione, vendita o trattativa tra coeredi.",
  },
  {
    question: "Si possono dividere prima le somme e poi affrontare gli immobili?",
    answer:
      "A volte sì, ma solo se il quadro patrimoniale è chiaro. Spezzare il dossier senza coordinamento può alterare i conguagli e rendere più difficile una chiusura coerente della comunione.",
  },
  {
    question: "Come si gestiscono le spese pagate da un solo coerede dopo il decesso?",
    answer:
      "Vanno documentate e collocate correttamente nel rendiconto della comunione ereditaria, distinguendo tra spese necessarie, anticipate e spese che richiedono compensazioni.",
  },
  {
    question: "Un immobile indivisibile obbliga sempre alla vendita?",
    answer:
      "Non automaticamente. Si valuta se esistono soluzioni di assegnazione con conguaglio, accordi tra coeredi o altre opzioni compatibili con il valore del bene e le quote in gioco.",
  },
  {
    question: "I beni mobili di valore vanno trattati a parte nella divisione?",
    answer:
      "Vanno ricostruiti con attenzione specifica, ma sempre dentro il quadro complessivo dell’asse ereditario, perché incidono su equilibrio economico e conguagli finali.",
  },
  {
    question: "La mediazione è utile anche quando la comunione è bloccata da anni?",
    answer:
      "Può esserlo se arriva con stime, elenco dei beni, prospetti di riparto e criteri chiari. Senza questo lavoro preparatorio rischia di restare solo formale.",
  },
];

const legittimaFaqs: FaqItem[] = [
  {
    question: "La quota di legittima cambia se esistono solo figli o anche il coniuge?",
    answer:
      "Sì. La misura della quota riservata dipende dalla composizione della famiglia successoria e va calcolata tenendo conto dei legittimari effettivamente presenti.",
  },
  {
    question: "Le polizze o altri strumenti patrimoniali incidono sempre sulla legittima?",
    answer:
      "Non esiste una risposta automatica. Occorre qualificare correttamente il rapporto e capire se e in che modo rilevi nella ricostruzione patrimoniale del caso concreto.",
  },
  {
    question: "Posso valutare una lesione di legittima anche prima della divisione?",
    answer:
      "Sì. Anzi, spesso è proprio necessario farlo prima, per capire se la trattativa o la divisione proposta riflettono davvero i diritti dei legittimari.",
  },
  {
    question: "Riduzione e restituzione sono la stessa cosa?",
    answer:
      "No. La riduzione serve a far dichiarare inefficace l’attribuzione lesiva nei limiti necessari, mentre la restituzione riguarda il recupero concreto dei beni o del loro valore nei confronti dei soggetti coinvolti.",
  },
  {
    question: "Conta solo il valore nominale delle donazioni o anche il loro effetto concreto?",
    answer:
      "Conta la corretta qualificazione dell’attribuzione e il suo peso nella massa di calcolo, con attenzione a tempi, valori, soggetti coinvolti e prova disponibile.",
  },
  {
    question: "È utile una trattativa anche quando la lesione appare evidente?",
    answer:
      "Sì, se il quadro patrimoniale è stato ricostruito bene. Una trattativa fondata su numeri verificabili può ridurre tempi e costi senza indebolire la posizione del legittimario.",
  },
];

const donazioniFaqs: FaqItem[] = [
  {
    question: "Come si distingue una donazione indiretta da un semplice aiuto familiare?",
    answer:
      "Conta il contesto concreto: provenienza delle somme, finalità del trasferimento, documentazione bancaria, assetto complessivo dell’operazione e coerenza con i rapporti familiari.",
  },
  {
    question: "La collazione riguarda tutti gli eredi?",
    answer:
      "No. Riguarda solo i soggetti che la legge considera tenuti a conferire o imputare le donazioni ricevute, e va letta insieme alla struttura della successione concreta.",
  },
  {
    question: "Un bonifico fatto molti anni prima del decesso può ancora essere rilevante?",
    answer:
      "Sì, se integra una liberalità che incide sulla ricostruzione delle quote o sull’equilibrio tra coeredi. Il tempo trascorso non elimina da solo il problema.",
  },
  {
    question: "Se non esiste un atto notarile, la donazione è irrilevante?",
    answer:
      "No. Molte questioni successorie riguardano proprio liberalità indirette o trasferimenti di fatto, che richiedono però una prova più accurata.",
  },
  {
    question: "Collazione e lesione di legittima vanno valutate insieme?",
    answer:
      "Spesso sì, perché la stessa attribuzione fatta in vita può incidere sia sul rapporto interno tra coeredi sia sulla tutela del legittimario leso.",
  },
  {
    question: "Serve ricostruire il valore storico o attuale della donazione?",
    answer:
      "Dipende dalla questione giuridica in esame. La corretta valutazione economica non può essere separata dal tipo di azione e dal criterio applicabile nel caso concreto.",
  },
];

const successioneLegittimaFaqs: FaqItem[] = [
  {
    question: "La successione legittima si applica anche se esiste un testamento parziale?",
    answer:
      "Sì, per la parte del patrimonio non disciplinata da un testamento valido. In questi casi bisogna coordinare bene le disposizioni esistenti con le regole legali di chiamata.",
  },
  {
    question: "Le quote legali risolvono automaticamente la divisione dei beni?",
    answer:
      "No. Le quote indicano la spettanza astratta, ma restano poi da gestire immobili indivisi, somme, beni mobili, conguagli e rapporti tra coeredi.",
  },
  {
    question: "I fratelli del defunto entrano sempre nella successione legittima?",
    answer:
      "No. La loro posizione dipende dai parenti più prossimi effettivamente presenti e dall’ordine stabilito dalla legge nella chiamata ereditaria.",
  },
  {
    question: "Le donazioni fatte in vita contano anche senza testamento?",
    answer:
      "Sì. Anche nella successione legittima le attribuzioni pregresse possono incidere su divisione, collazione e rapporti economici tra i chiamati.",
  },
  {
    question: "Se tutti sono d’accordo sulle quote, serve comunque verificare i beni?",
    answer:
      "Sì. L’accordo sulle percentuali non basta se il patrimonio non è stato ricostruito bene o se mancano trasparenza e valori attendibili sui beni da ripartire.",
  },
  {
    question: "La presenza del coniuge superstite incide anche sulla casa familiare?",
    answer:
      "Può incidere in modo rilevante, ma il tema va esaminato insieme alla composizione della famiglia e al tipo di diritti che vengono in considerazione nel caso concreto.",
  },
];

const successioniInternazionaliFaqs: FaqItem[] = [
  {
    question: "Serve sempre il certificato successorio europeo?",
    answer:
      "Non in ogni pratica, ma in molti casi è uno strumento utile per far circolare la qualità di erede o i poteri successori tra più Stati.",
  },
  {
    question: "La residenza abituale del defunto è un dato solo anagrafico?",
    answer:
      "No. È una nozione sostanziale che richiede di valutare centro di vita, stabilità della permanenza, relazioni familiari e collegamenti effettivi con uno Stato.",
  },
  {
    question: "Se i beni sono in Italia ma gli eredi vivono all’estero cambia tutto?",
    answer:
      "Non necessariamente tutto, ma la gestione pratica del dossier cambia: servono verifiche su documenti, procure, traduzioni, tempi e coordinamento transfrontaliero.",
  },
  {
    question: "I testamenti redatti all’estero valgono automaticamente in Italia?",
    answer:
      "Vanno esaminati con attenzione quanto a forma, legge applicabile e compatibilità con il quadro successorio complessivo, senza dare nulla per scontato.",
  },
  {
    question: "Le imposte e la legge civile seguono sempre la stessa logica internazionale?",
    answer:
      "No. Profilo fiscale e disciplina civilistica possono seguire regole diverse, perciò il coordinamento iniziale del caso è essenziale.",
  },
  {
    question: "Quando ci sono beni in più Paesi conviene trattare tutto separatamente?",
    answer:
      "Di solito no. Serve una regia unitaria, altrimenti il rischio è perdere coerenza tra legge applicabile, prova documentale e risultato pratico della successione.",
  },
];

const mediazioneFaqs: FaqItem[] = [
  {
    question: "In mediazione è utile arrivare con una proposta economica già formulata?",
    answer:
      "Spesso sì, purché sia fondata su beni, valori, quote e margini di trattativa realistici. Una proposta senza base tecnica rischia di indebolire la posizione negoziale.",
  },
  {
    question: "La mediazione ereditaria funziona anche se i rapporti familiari sono molto tesi?",
    answer:
      "Può funzionare se si sposta il confronto su dossier, valori e criteri di riparto concreti. Senza questa impostazione, la tensione personale tende a prevalere.",
  },
  {
    question: "Posso usare la mediazione per chiarire prima i documenti mancanti?",
    answer:
      "Sì, ma va gestita con obiettivi precisi. Talvolta la mediazione serve anche a ottenere trasparenza su beni, somme o documenti che una parte non sta condividendo.",
  },
  {
    question: "Un verbale di mediazione chiude davvero il conflitto?",
    answer:
      "Solo se l’accordo è costruito bene, con attribuzioni chiare, tempi, eventuali conguagli e formule che evitino nuove contestazioni esecutive o interpretative.",
  },
  {
    question: "Conviene mediare anche quando penso di avere una posizione molto forte?",
    answer:
      "Può convenire se la mediazione permette di monetizzare un vantaggio probatorio senza affrontare tempi e costi del giudizio, ma la scelta va misurata caso per caso.",
  },
  {
    question: "La mediazione può essere utile per la sola divisione di un immobile ereditato?",
    answer:
      "Sì, soprattutto quando occorre confrontare opzioni di vendita, assegnazione, uso del bene e conguagli tra coeredi con posizioni molto diverse.",
  },
];

const ereditaGiacenteFaqs: FaqItem[] = [
  {
    question: "Chi può chiedere la nomina del curatore dell’eredità giacente?",
    answer:
      "Dipende dall’interesse concreto alla gestione dell’asse: possono rilevare la posizione dei chiamati, dei creditori o di altri soggetti che hanno necessità di evitare il vuoto di amministrazione.",
  },
  {
    question: "Il curatore può vendere beni dell’eredità giacente?",
    answer:
      "Può compiere gli atti consentiti dal quadro normativo e autorizzativo applicabile, ma non dispone liberamente del patrimonio come se fosse un erede.",
  },
  {
    question: "L’eredità giacente serve solo quando tutti rinunciano?",
    answer:
      "No. Può rilevare anche quando i chiamati non hanno ancora accettato o la situazione è ferma, ma i beni richiedono comunque protezione e amministrazione.",
  },
  {
    question: "I creditori possono attivarsi durante la giacenza?",
    answer:
      "Sì. La presenza di debiti e creditori è uno dei motivi per cui la fase di giacenza deve essere impostata con attenzione documentale e procedurale.",
  },
  {
    question: "Chi intende poi accettare l’eredità deve comunque monitorare la fase di giacenza?",
    answer:
      "Sì, perché le attività svolte nel frattempo incidono sulla conservazione del patrimonio e sulla situazione concreta che troverà al momento della decisione.",
  },
  {
    question: "La giacenza blocca definitivamente la successione?",
    answer:
      "No. È uno strumento di gestione temporanea, non una soluzione finale del destino dell’eredità o dei diritti dei chiamati.",
  },
];

const rinunciaFaqs: FaqItem[] = [
  {
    question: "Il beneficio d’inventario è sempre un’alternativa migliore della rinuncia?",
    answer:
      "Non sempre. Dipende dal tipo di patrimonio, dalla presenza di beni attivi, dai costi di gestione e dal livello di rischio connesso ai debiti ereditari.",
  },
  {
    question: "Pagare spese del defunto può impedirmi di rinunciare?",
    answer:
      "Dipende da natura, finalità e modalità dell’atto. Alcuni comportamenti hanno funzione conservativa, altri possono essere letti come accettazione tacita.",
  },
  {
    question: "Se rinuncio io, i miei figli entrano automaticamente nella successione?",
    answer:
      "La tua rinuncia può incidere sulla chiamata successiva e sulla rappresentazione, ma gli effetti vanno verificati in concreto, soprattutto se sono coinvolti minori.",
  },
  {
    question: "Posso rinunciare se nel frattempo ho chiesto informazioni alla banca o all’amministratore?",
    answer:
      "La semplice acquisizione di informazioni non coincide di per sé con accettazione, ma è sempre opportuno controllare l’intera sequenza degli atti compiuti.",
  },
  {
    question: "La rinuncia è utile anche quando il patrimonio sembra di modesto valore?",
    answer:
      "Può esserlo, ma solo dopo aver verificato se esistono beni o somme recuperabili che renderebbero più conveniente una diversa scelta successoria.",
  },
  {
    question: "Serve decidere subito oppure conviene prima ricostruire il quadro?",
    answer:
      "Nella maggior parte dei casi conviene prima ricostruire bene beni, debiti e atti già compiuti, perché una decisione affrettata può creare problemi irreversibili.",
  },
];

const recuperoSommeFaqs: FaqItem[] = [
  {
    question: "La banca deve dire subito quanti rapporti aveva il defunto?",
    answer:
      "La risposta dipende dalla documentazione presentata e dalla posizione di chi richiede le informazioni. Per questo è utile impostare correttamente la richiesta fin dall’inizio.",
  },
  {
    question: "Un delegato sul conto può continuare a operare dopo il decesso?",
    answer:
      "Il tema va verificato con attenzione sulla base del rapporto bancario concreto e della cronologia delle operazioni, perché da lì possono emergere responsabilità e contestazioni rilevanti.",
  },
  {
    question: "Prelievi ravvicinati al decesso sono sempre illeciti?",
    answer:
      "Non automaticamente. Vanno inquadrati per causa, titolo, momento, provenienza delle somme e rapporti tra i soggetti coinvolti.",
  },
  {
    question: "Polizze e investimenti vanno analizzati insieme ai conti correnti?",
    answer:
      "Sì, perché spesso la ricostruzione patrimoniale completa richiede di coordinare rapporti bancari, prodotti finanziari e altre disponibilità intestate o collegate al de cuius.",
  },
  {
    question: "Si può agire anche se non ho ancora l’estratto conto completo?",
    answer:
      "Sì, ma la strategia va costruita per ottenere prima i dati essenziali. Senza cronologia e documenti il rischio è confondere sospetti e prove.",
  },
  {
    question: "Il recupero delle somme rileva anche nella divisione ereditaria?",
    answer:
      "Sì. Le somme bancarie non sono un tema separato: incidono su quote, conguagli, legittima e trasparenza complessiva della successione.",
  },
];

const conflittiTraCoerediFaqs: FaqItem[] = [
  {
    question: "Quando il conflitto tra coeredi diventa un problema giuridico e non solo relazionale?",
    answer:
      "Quando incide sulla gestione dei beni, sulla trasparenza delle informazioni, sulle quote, sull’uso esclusivo del patrimonio o sulla possibilità concreta di chiudere la successione.",
  },
  {
    question: "Conviene scrivere subito agli altri coeredi con una diffida?",
    answer:
      "Può essere utile, ma solo se prima sono chiari obiettivi, richieste, documenti da ottenere e posizione giuridica che si intende presidiare.",
  },
  {
    question: "Un coerede può trattenere documenti o chiavi dei beni comuni?",
    answer:
      "Il punto non va affrontato solo sul piano personale: occorre impostare richieste e iniziative che permettano di recuperare trasparenza e controllo sulla gestione del patrimonio.",
  },
  {
    question: "La causa è inevitabile quando i rapporti sono compromessi?",
    answer:
      "Non sempre. Anche nei contesti tesi può essere utile un passaggio mediativo o negoziale, purché supportato da un dossier tecnico solido.",
  },
  {
    question: "Come si gestisce un coerede che usa da solo immobile o somme comuni?",
    answer:
      "Serve ricostruire fatti, tempi, utilità percepite e spese sostenute, così da trasformare il conflitto in richieste patrimoniali verificabili.",
  },
  {
    question: "È utile separare i piani personali dai punti economici del conflitto?",
    answer:
      "Sì. Nelle successioni più complesse il lavoro efficace consiste proprio nel tradurre tensioni familiari in questioni documentabili e giuridicamente trattabili.",
  },
];

export const aboutPageFaqs: FaqItem[] = [
  {
    question: "Di cosa si occupa in concreto lo Studio Legale Del Monte in materia successoria?",
    answer:
      "Lo studio assiste su successioni, testamenti, legittima, divisioni ereditarie, donazioni, mediazione, rinuncia, eredità giacente e pratiche con profili internazionali o patrimoni articolati.",
  },
  {
    question: "Lo studio segue solo contenziosi già iniziati?",
    answer:
      "No. Una parte rilevante del lavoro riguarda la fase preventiva: analisi dei documenti, impostazione della strategia, lettere ai coeredi e verifica dei rischi prima di assumere iniziative irreversibili.",
  },
  {
    question: "Qual è l’approccio dello studio nelle pratiche ereditarie?",
    answer:
      "L’approccio è tecnico ma leggibile: prima si ordina il fascicolo, poi si valutano diritti, prove, convenienza della trattativa e solidità dell’eventuale azione giudiziale.",
  },
  {
    question: "Lo studio opera solo su Roma?",
    answer:
      "No. La sede è a Roma, ma l’assistenza riguarda pratiche successorie in tutta Italia e, quando necessario, casi che richiedono coordinamento tra più luoghi o profili internazionali.",
  },
  {
    question: "Quando conviene contattare lo studio?",
    answer:
      "Conviene appena emergono dubbi seri su quote, testamento, divisione dei beni, donazioni, conti correnti o rapporti conflittuali tra coeredi.",
  },
  {
    question: "Seguite anche mediazione e trattativa oltre al giudizio?",
    answer:
      "Sì. La scelta tra trattativa, mediazione e causa viene fatta in base alla qualità della prova, alla struttura del patrimonio e al risultato concretamente più utile per il cliente.",
  },
  {
    question: "È possibile avere un primo inquadramento anche con documentazione incompleta?",
    answer:
      "Sì. Una prima analisi serve spesso proprio a stabilire quali documenti mancano e quale ordine seguire per recuperare quelli decisivi.",
  },
  {
    question: "Lo studio segue anche patrimoni con immobili, somme bancarie e donazioni nello stesso caso?",
    answer:
      "Sì. Le pratiche più complesse richiedono proprio una regia unitaria tra beni immobili, conti, investimenti, liberalità pregresse e conflitti familiari.",
  },
];

export const contactPageFaqs: FaqItem[] = [
  {
    question: "Qual è il canale migliore per il primo contatto?",
    answer:
      "Dipende dal caso, ma il modulo contatti è spesso la via più ordinata perché consente di indicare l’argomento e sintetizzare i fatti essenziali. WhatsApp e Mail restano comunque sempre disponibili.",
  },
  {
    question: "Quando compare il pulsante Chiama?",
    answer:
      "Compare nella fascia 09:00–19:30. Fuori fascia restano visibili WhatsApp, Mail e il pulsante Invia una richiesta che porta direttamente al modulo contatti.",
  },
  {
    question: "Posso inviare documenti già nel primo contatto?",
    answer:
      "Sì, se sono già disponibili. Conviene però allegare solo i documenti essenziali e indicare chiaramente il nodo principale della successione o del contenzioso.",
  },
  {
    question: "Lo studio riceve solo a Roma?",
    answer:
      "La sede è a Roma, ma l’assistenza può riguardare pratiche successorie di rilievo nazionale e casi che richiedono coordinamento tra più luoghi.",
  },
  {
    question: "Se scrivo fuori orario ricevo comunque riscontro?",
    answer:
      "Sì. Il telefono è limitato alla fascia indicata, ma WhatsApp, Mail e il modulo restano sempre utilizzabili per avviare la richiesta.",
  },
  {
    question: "Nel primo messaggio devo già spiegare tutta la storia familiare?",
    answer:
      "No. È più utile indicare il problema principale, i soggetti coinvolti, l’eventuale urgenza e i documenti già in tuo possesso.",
  },
  {
    question: "Posso contattare lo studio anche per una mediazione già fissata?",
    answer:
      "Sì. In questi casi è utile farlo il prima possibile, così da avere tempo per ordinare documenti, valori e linea negoziale.",
  },
  {
    question: "Il modulo è adatto anche per richieste su successioni internazionali?",
    answer:
      "Sì. In quel caso è utile segnalare subito i Paesi coinvolti, la residenza del defunto e i principali beni o rapporti da coordinare.",
  },
];

export const servicesArchiveFaqs: FaqItem[] = [
  {
    question: "Quali servizi coprono l’intero percorso successorio?",
    answer:
      "L’archivio servizi copre i principali snodi della materia: successione, testamento, legittima, divisione, donazioni, mediazione, rinuncia, eredità giacente, successioni internazionali e recupero somme.",
  },
  {
    question: "Da quale pagina conviene partire se non so ancora qual è il problema principale?",
    answer:
      "Di solito conviene partire da Avvocato successioni o dalla pagina che assomiglia di più al nodo concreto: testamento, divisione, legittima, donazioni, somme bancarie o rinuncia.",
  },
  {
    question: "I servizi sono pensati solo per cause giudiziali?",
    answer:
      "No. Ogni servizio è costruito anche per la fase di analisi preventiva, trattativa, mediazione o impostazione del dossier prima del giudizio.",
  },
  {
    question: "Le singole pagine servizio sostituiscono una valutazione sul caso?",
    answer:
      "No. Servono per orientarsi, ma ogni pratica richiede verifiche su documenti, quote, beni, tempi e convenienza concreta delle iniziative.",
  },
  {
    question: "Posso avere più problemi contemporaneamente, per esempio testamento e divisione?",
    answer:
      "Sì, ed è frequente. Molti casi coinvolgono più servizi insieme: testamento, legittima, donazioni, immobili e somme bancarie vanno spesso letti in modo unitario.",
  },
  {
    question: "I servizi coprono anche patrimoni complessi o distribuiti in più luoghi?",
    answer:
      "Sì. In particolare quando servono coordinamento documentale, più beni da ricostruire o profili internazionali, il lavoro richiede una regia tecnica più articolata.",
  },
  {
    question: "Quando conviene passare dalla lettura della pagina a un contatto diretto?",
    answer:
      "Conviene quando il tuo caso non è lineare, quando servono verifiche su documenti e prova o quando devi decidere rapidamente come muoverti.",
  },
  {
    question: "Il servizio giusto dipende dal tipo di bene o dal tipo di conflitto?",
    answer:
      "Dipende da entrambi. Il nodo può nascere dal testamento, dalla quota, da un immobile indiviso, da somme bancarie o dal comportamento dei coeredi: per questo l’inquadramento iniziale è decisivo.",
  },
];

export const hubArchiveFaqs: FaqItem[] = [
  {
    question: "A cosa servono le aree di approfondimento rispetto ai servizi?",
    answer:
      "Le aree organizzano i grandi temi del diritto successorio, mentre i servizi sono più orientati all’assistenza operativa e alla gestione concreta del caso.",
  },
  {
    question: "Se ho un dubbio sul testamento devo leggere solo l’area Testamento?",
    answer:
      "Non necessariamente. Spesso il tema si intreccia con legittima, donazioni, divisione o conflitti tra coeredi, quindi può essere utile leggere anche le aree collegate.",
  },
  {
    question: "Le aree sono pensate per chi non ha ancora individuato l’azione giusta?",
    answer:
      "Sì. Servono proprio a capire quale snodo giuridico stia guidando davvero la pratica: testamento, quote, beni, mediazione o profili internazionali.",
  },
  {
    question: "Le aree affrontano anche i problemi pratici oltre alle regole?",
    answer:
      "Sì. Ogni area collega il principio giuridico ai nodi ricorrenti nella realtà: documenti, prova, rapporti tra coeredi, immobili, somme e tempi del percorso.",
  },
  {
    question: "Posso usare le aree per capire quali documenti raccogliere?",
    answer:
      "Sì, almeno come primo orientamento. Le singole pagine aiutano a capire quali temi approfondire prima di un confronto diretto sul caso concreto.",
  },
  {
    question: "Le aree sono utili anche se la pratica è già molto conflittuale?",
    answer:
      "Sì. Anche in un contenzioso avanzato è utile distinguere correttamente il problema dominante e gli snodi accessori che incidono sulla strategia.",
  },
  {
    question: "Perché alcune aree rimandano a più servizi o articoli?",
    answer:
      "Perché le questioni ereditarie raramente restano isolate: una stessa pratica può coinvolgere più pagine e richiedere una lettura integrata del problema.",
  },
  {
    question: "Le aree valgono anche per successioni fuori Roma?",
    answer:
      "Sì. Sono contenuti costruiti per casi successori che possono riguardare tutto il territorio nazionale e, in alcune materie, anche contesti con elementi internazionali.",
  },
];

export const articlesArchiveFaqs: FaqItem[] = [
  {
    question: "Gli articoli sono pensati per dare risposte operative o solo informative?",
    answer:
      "L’obiettivo è orientare con taglio operativo, ma senza sostituire la verifica sul singolo fascicolo, che resta indispensabile quando il caso è concreto.",
  },
  {
    question: "Da dove conviene iniziare se non conosco il linguaggio successorio?",
    answer:
      "Puoi partire dagli articoli più vicini al tuo dubbio principale o dal glossario, così da chiarire prima i concetti essenziali e poi approfondire il tema specifico.",
  },
  {
    question: "Gli articoli seguono una logica per temi collegati?",
    answer:
      "Sì. Ogni articolo è collegato ai servizi e alle aree pertinenti, così puoi passare dal chiarimento teorico all’inquadramento pratico del problema.",
  },
  {
    question: "Un articolo basta per decidere se fare causa?",
    answer:
      "No. Gli articoli aiutano a capire i criteri, ma la decisione richiede analisi di documenti, prova, tempi, costi e sostenibilità dell’iniziativa.",
  },
  {
    question: "Gli approfondimenti trattano solo testamenti e quote?",
    answer:
      "No. Coprono anche divisione dei beni, conti correnti, mediazione, rinuncia, eredità giacente e successioni con profili internazionali.",
  },
  {
    question: "Posso usare gli articoli per preparare una mediazione o un incontro con lo studio?",
    answer:
      "Sì. Sono utili per chiarire il vocabolario del problema e arrivare al confronto con domande più mirate e documenti meglio ordinati.",
  },
  {
    question: "Quando un approfondimento segnala che il caso è più complesso del previsto?",
    answer:
      "Quando emergono donazioni, beni in più luoghi, conti bancari non chiari, più coeredi in conflitto o dubbi su validità del testamento e calcolo della legittima.",
  },
  {
    question: "Gli articoli sono utili anche se la successione è già aperta da tempo?",
    answer:
      "Sì. Spesso aiutano proprio a rimettere ordine in pratiche ferme da mesi o anni e a capire dove si trova il vero blocco del fascicolo.",
  },
];

export const glossaryFaqs: FaqItem[] = [
  {
    question: "A cosa serve il glossario successorio?",
    answer:
      "Serve a chiarire i termini più ricorrenti del diritto ereditario prima di affrontare pagine tecniche, articoli o una richiesta di assistenza sul caso concreto.",
  },
  {
    question: "Il glossario sostituisce una consulenza?",
    answer:
      "No. Aiuta a orientarsi nel lessico, ma non basta per capire diritti, rischi e strategia applicabili a una vicenda familiare specifica.",
  },
  {
    question: "Quali termini conviene capire subito in una pratica ereditaria?",
    answer:
      "Di solito conviene partire da legittima, collazione, accettazione tacita, eredità giacente e dagli altri concetti che incidono sulle prime decisioni operative.",
  },
  {
    question: "Perché il significato tecnico conta più di quello comune?",
    answer:
      "Perché molti equivoci nascono proprio dall’uso quotidiano di parole che nel diritto successorio hanno un effetto preciso su quote, beni e responsabilità.",
  },
  {
    question: "Il glossario aiuta anche a leggere meglio gli articoli del sito?",
    answer:
      "Sì. È pensato per facilitare la lettura degli approfondimenti e rendere più chiari i collegamenti tra concetti diversi della stessa pratica.",
  },
  {
    question: "Ci sono termini che incidono subito sulla scelta tra accettare e rinunciare?",
    answer:
      "Sì. Ad esempio accettazione tacita ed eredità giacente sono concetti che possono cambiare radicalmente il modo corretto di muoversi dopo il decesso.",
  },
  {
    question: "Il glossario è utile anche per chi è già in conflitto con i coeredi?",
    answer:
      "Sì, perché aiuta a dare un nome preciso ai problemi reali del dossier e a distinguere ciò che è emotivo da ciò che è giuridicamente rilevante.",
  },
  {
    question: "Come proseguire dopo aver individuato il termine che mi riguarda?",
    answer:
      "Puoi usare i link di approfondimento collegati a ciascuna voce oppure passare direttamente al modulo contatti se hai già bisogno di una verifica sul tuo caso.",
  },
];

export const privacyPageFaqs: FaqItem[] = [
  {
    question: "Quali dati vengono trattati quando invio una richiesta?",
    answer:
      "Vengono trattati i dati identificativi e di contatto che scegli di comunicare, il contenuto del messaggio e gli eventuali documenti allegati necessari a valutare la richiesta.",
  },
  {
    question: "Per quale finalità vengono usati i dati inviati tramite il sito?",
    answer:
      "I dati sono usati per dare seguito alla richiesta di contatto, valutare la questione esposta e gestire gli eventuali passaggi successivi con l’interessato.",
  },
  {
    question: "Qual è la base giuridica del trattamento dei dati?",
    answer:
      "La base giuridica è data dal consenso espresso dall’interessato e, ove necessario, dalle misure precontrattuali richieste attraverso il contatto con lo studio.",
  },
  {
    question: "I dati inviati tramite WhatsApp, Mail o modulo hanno lo stesso scopo?",
    answer:
      "Sì. Cambia il canale, ma la finalità resta la gestione della richiesta e della possibile assistenza legale collegata al caso esposto.",
  },
  {
    question: "Per quanto tempo vengono conservati i dati trasmessi?",
    answer:
      "I dati sono conservati per il tempo necessario a gestire la richiesta, a svolgere le verifiche connesse e ad adempiere agli obblighi eventualmente applicabili.",
  },
  {
    question: "Posso chiedere accesso, rettifica o cancellazione dei miei dati?",
    answer:
      "Sì. L’interessato può esercitare i diritti previsti dalla normativa applicabile, nei limiti e con le modalità stabilite dal quadro normativo in materia di protezione dei dati.",
  },
  {
    question: "È necessario inviare subito tutti i documenti sensibili?",
    answer:
      "No. È preferibile condividere inizialmente solo i dati e i documenti strettamente necessari per comprendere il problema e valutare la richiesta.",
  },
  {
    question: "A chi posso scrivere per chiarimenti sulla privacy?",
    answer:
      "Per chiarimenti o per esercitare i diritti in materia di protezione dei dati puoi contattare lo studio all’indirizzo info@delmontestudiolegale.it.",
  },
];

const serviceFaqAdditions: Record<string, FaqItem[]> = {
  "avvocato-successioni": successioniGeneralFaqs,
  "impugnazione-testamento": testamentoFaqs,
  "divisione-ereditaria": divisioneFaqs,
  "lesione-di-legittima": legittimaFaqs,
  "collazione-e-donazioni": donazioniFaqs,
  "successioni-internazionali": successioniInternazionaliFaqs,
  "mediazione-ereditaria": mediazioneFaqs,
  "eredita-giacente": ereditaGiacenteFaqs,
  "rinuncia-eredita": rinunciaFaqs,
  "recupero-somme-ereditarie": recuperoSommeFaqs,
};

const hubFaqAdditions: Record<string, FaqItem[]> = {
  testamento: testamentoFaqs,
  legittima: legittimaFaqs,
  "divisione-ereditaria": divisioneFaqs,
  donazioni: donazioniFaqs,
  "successione-legittima": successioneLegittimaFaqs,
  "successioni-internazionali": successioniInternazionaliFaqs,
  "conflitti-tra-coeredi": conflittiTraCoerediFaqs,
};

const articleFaqAdditions: Record<string, FaqItem[]> = {
  "quota-di-legittima-come-si-calcola": legittimaFaqs,
  "come-funziona-successione-legittima": successioneLegittimaFaqs,
  "successione-legittima-con-coniuge-e-figli": successioneLegittimaFaqs,
  "divisione-gioielli-eredita": divisioneFaqs,
  "testamento-quando-si-puo-contestare": testamentoFaqs,
  "conti-correnti-del-de-cuius-cosa-sapere": recuperoSommeFaqs,
  "mediazione-ereditaria-quando-conviene": mediazioneFaqs,
  "eredita-giacente-significato-e-rischi": ereditaGiacenteFaqs,
  "rinuncia-eredita-costi-e-conseguenze": rinunciaFaqs,
  "successioni-internazionali-cosa-cambia": successioniInternazionaliFaqs,
};

moneyPages.forEach((page) => {
  page.faq = mergeFaqs(page.faq, serviceFaqAdditions[page.slug] ?? []);
});

hubPages.forEach((page) => {
  page.faq = mergeFaqs(page.faq, hubFaqAdditions[page.slug] ?? []);
});

articles.forEach((article) => {
  article.faq = mergeFaqs(article.faq, articleFaqAdditions[article.slug] ?? []);
});

export function getArticleEntities(article: ArticleEntry) {
  return Array.from(
    new Set([
      article.category.toLowerCase(),
      "successioni",
      "eredità",
      "diritto successorio",
      ...article.title
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s-]/gu, "")
        .split(/\s+/)
        .filter((value) => value.length > 4),
    ]),
  ).slice(0, 10);
}

export function getArticleQuestions(article: ArticleEntry) {
  return [
    `Quando ${article.title.toLowerCase()} diventa un problema legale concreto?`,
    `Quali documenti aiutano a chiarire ${article.category.toLowerCase()}?`,
    `Quali errori peggiorano il contenzioso in materia di ${article.category.toLowerCase()}?`,
  ];
}

export function getHubEntities(hub: HubPage) {
  return Array.from(
    new Set([
      hub.slug.replaceAll("-", " "),
      "successione",
      "eredità",
      ...hub.sections.flatMap((section) => section.items.slice(0, 2)),
    ]),
  );
}

export const primaryNav = [
  { href: "/", label: "Homepage" },
  { href: "/servizi", label: "Servizi" },
  { href: "/hub", label: "Aree" },
  { href: "/approfondimenti", label: "Approfondimenti" },
  { href: "/glossario-successorio", label: "Glossario" },
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/contatti", label: "Contatti" },
];

export const navigationGroups = [
  {
    label: "Servizi",
    items: [
      "avvocato-successioni",
      "impugnazione-testamento",
      "divisione-ereditaria",
      "lesione-di-legittima",
      "rinuncia-eredita",
      "successione-legittima",
      "conflitti-tra-coeredi",
    ]
      .map((slug) => getService(slug))
      .filter((page): page is ServicePage => Boolean(page))
      .map((page) => ({
        href: `/${page.slug}`,
        label: page.shortTitle,
      })),
  },
  {
    label: "Aree",
    items: hubPages.map((page) => ({
      href: `/hub/${page.slug}`,
      label: page.title,
    })),
  },
  {
    label: "Approfondimenti",
    items: articles.slice(0, 6).map((article) => ({
      href: `/approfondimenti/${article.slug}`,
      label: article.title,
    })),
  },
];

export const contactRequestTopics = [
  "Avvocato successioni",
  "Successione legittima",
  "Testamento",
  "Testamento olografo falso",
  "Impugnazione testamento",
  "Lesione di legittima",
  "Divisione ereditaria",
  "Conflitti tra coeredi",
  "Accettazione eredità",
  "Beneficio d’inventario",
  "Petizione ereditaria",
  "Indegnità successoria",
  "Vendita casa ereditata",
  "Gioielli ereditati",
  "Collazione e donazioni",
  "Mediazione ereditaria",
  "Rinuncia all’eredità",
  "Recupero somme ereditarie",
  "Successioni internazionali",
  "Altro",
];

export const featuredMoneySlugs = [
  "avvocato-successioni",
  "impugnazione-testamento",
  "divisione-ereditaria",
  "lesione-di-legittima",
  "successioni-internazionali",
  "recupero-somme-ereditarie",
];

export function getService(slug: string) {
  return moneyPages.find((page) => page.slug === slug);
}

export function getHub(slug: string) {
  return hubPages.find((page) => page.slug === slug);
}

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}
