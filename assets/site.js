/* ================= EDIT HERE =================
   One entry per product. To publish an update:
   1. create a GitHub release with tag  <id>-v<version>  (e.g. morphclipper-v3.3)
   2. attach  <file>-mac.dmg  <file>-win.zip  <file>-manual.pdf
   3. move the current version into "older" (newest first), set "version" and "released", push.
   Older versions stay downloadable only from the plugin's own page (/<id>/).   */
const REPO = "morphlabaudio/morphlabaudio-site";
const KOFI = "https://ko-fi.com/morphlabaudio";
// Newsletter sign-ups. Until Kit is set up they go to a Google Form (responses land in a Google Sheet);
// once KIT_FORM is filled in, Kit takes over and the Google Form is no longer used.
const KIT_FORM = "";  // Kit form ID (number in the form's URL in the Kit dashboard)
const GFORM = { id:"1FAIpQLSfoSDcsLAx3iHIOuTj7FWFp72RAhg5goRBncEZs6C3idG0lGw", email:"entry.1125075590", lang:"entry.1324719701", consent:"entry.672579942" };  // form id (…/forms/d/e/<id>/viewform) + entry.NNN of each question
const PRODUCTS = [
  { id:"morphclipper", file:"MorphClipper", name:"MorphClipper", version:"3.3", group:"plugins",
    released:"2026-10-31", older:[{ version:"3.2", released:"2026-10-09" }],
    tag:"Mastering clipper",
    text:"A mastering-grade clipper with an oversampled clip stage, a true-peak ceiling measured to ITU-R BS.1770, a movable transient/saturation insert and Mid/Side or dual-mono routing. Density without crushing the mix." },
  { id:"morphdynamic", file:"MorphDynamic-MB-Transient", name:"MorphDynamic MB Transient", version:"2.8", group:"plugins",
    released:"2026-10-30", older:[{ version:"2.7", released:"2026-10-15" }],
    tag:"Multiband transient saturator",
    text:"Brings the transient forward, in your face, without degrading the signal. Each band reacts only to its own hits while the sustain stays clean. Five saturation types including Transformer, per-band power and solo on the spectrum." },
  { id:"morphlator", file:"MorPhlator", name:"MorPhlator", version:"2.3", group:"plugins",
    released:"2026-10-31", older:[{ version:"2.2", released:"2026-10-05" }],
    tag:"Multiband harmonic exciter",
    text:"Adds weight and perceived loudness by reshaping the waveform, not by compressing it. Optional three-band split keeps the low end tight, and Gain Match gives you an honest A/B at equal loudness." },
  { id:"morphalign", file:"MorPhalign", name:"MorPhalign", version:"3.2", group:"plugins",
    released:"2026-10-17", older:[],
    tag:"Sidechain phase alignment",
    text:"Aligns one track to another through the sidechain, so kick and bass sum with the least cancellation. Four engines — Rotate, Multiband, Match and Match LF — on one big knob." },
  { id:"morphtransient", file:"MorphTransient", name:"MorphTransient", version:"2.4", group:"plugins",
    released:"2026-10-05", older:[],
    tag:"Transient designer",
    text:"Two knobs, attack and sustain, driven by level-independent dual-envelope detection — no threshold to chase, no pumping. Parallel mix and a live shape meter. Zero latency." },
  { id:"morphase", file:"MorPhase", name:"MorPhase", version:"2.1", group:"plugins",
    released:"2026-10-05", older:[],
    tag:"All-pass phase tool",
    text:"Rotates phase with first- or second-order all-pass filters without touching the magnitude. Align kicks, layers and multi-mic recordings, and watch the result on a beat-locked waveform." },
  { id:"rx92", file:"RX92", name:"RX92", version:"2.2", group:"plugins",
    tall:true,  // narrow, very tall UI: its page shows the full-resolution screenshot whole instead of a 16:10 box
    released:"2026-10-16", older:[],
    tag:"DJ channel strip",
    text:"A channel strip modelled on the famous club mixer, built for live sets: 3-band EQ with kill, two series filters with a tempo-synced LFO and three effect slots inspired by the most-used DJ mixers. Zero latency, every parameter mappable to your MIDI controller." },
  { id:"morphcontrolxl", file:"MorphControl-XL", name:"MorphControl XL", version:"1.2", group:"tools",
    released:"2026-10-05", older:[],
    tag:"Step sequencer for Launch Control XL",
    text:"A 16-step, 909-style drum sequencer played from a Novation Launch Control XL. Eight instruments, accents, and a guided LEARN that maps any controller layout. Standalone app and plugin.",
    formats:"Standalone + AU + VST3 · Requires Novation Launch Control XL" }
];
/* ================= TRANSLATIONS =================
   English is the text in the HTML and in PRODUCTS above; these are the other languages.
   A missing key falls back to English. Product cards use "<id>.tag" and "<id>.text".  */
const LANGS = [
  { code:"en", name:"English" },
  { code:"it", name:"Italiano" },
  { code:"nl", name:"Nederlands" },
  { code:"fr", name:"Français" }
];
const I18N = {
  it: {
    "title":"MorphLab Audio — Plugin audio gratuiti",
    "nav.plugins":"Plugin", "nav.tools":"Strumenti", "nav.install":"Installazione", "nav.bugs":"Bug", "nav.donate":"Dona",
    "hero.pitch":"Plugin gratuiti nati in uno studio di mastering. Per produzione, live, mix o mastering. Nessun account, nessuna chiave di licenza.",
    "hero.get":"Scarica i plugin", "hero.report":"Segnala un bug", "hero.audio":"Plugin audio",
    "s1.label":"01 — Plugin", "s1.right":"7 · Gratis", "s1.h":'Il <span class="o">rack</span>',
    "s1.lede":"Per macOS (AU + VST3, nativi su Apple Silicon e Intel) e Windows 10/11 (VST3, 64 bit). Ogni download include l’installer e il manuale utente in inglese e italiano.",
    "s2.label":"02 — Strumenti", "s2.h":'<span class="o">Strumenti</span>',
    "s2.lede":"Utility per i live set e i controller hardware. Anche queste gratis.",
    "s3.label":"03 — Installazione", "s3.h":'Install<span class="o">azione</span>',
    "s3.lede":"L’installer mette ogni formato nella cartella giusta. Poi rifai la scansione dei plugin nella tua DAW.",
    "s3.mac1":"Apri il <code>.dmg</code> e fai doppio clic sul <code>.pkg</code> che contiene. AU e VST3 si installano insieme.",
    "s3.mac2":"Se macOS dice che non può verificare lo sviluppatore: apri Impostazioni di Sistema → Privacy e sicurezza, scorri in basso e clicca “Apri comunque”. Basta farlo una volta per plugin.",
    "s3.win1":"Estrai lo zip e avvia <code>Setup.exe</code>. Il VST3 va in <code>C:\\Program Files\\Common Files\\VST3</code>.",
    "s3.win2":"Se compare SmartScreen, clicca “Ulteriori informazioni” → “Esegui comunque”.",
    "s3.miss":"Non compare?",
    "s3.miss1":"Rifai la scansione dei plugin nella DAW. In Logic l’AU si trova in Audio Units → MorphLab.",
    "s3.miss2":"Ancora niente? Manda una segnalazione indicando sistema operativo e DAW e ti aiuto.",
    "s4.label":"04 — Feedback", "s4.right":"Bug · Idee", "s4.h":"Trovato un bug? Hai un’idea?",
    "s4.lede":"Ogni segnalazione viene letta e riceve risposta. Indica sistema operativo e versione della DAW, così posso riprodurre il problema.",
    "s4.note":'Le segnalazioni si fanno su GitHub (serve un account gratuito). Niente account? Scrivi a <a href="mailto:info@morphlabaudio.com">info@morphlabaudio.com</a>.',
    "fb.bug":"Segnala un bug", "fb.bugText":"Qualcosa va in crash, suona male o non si carica.",
    "fb.idea":"Suggerisci un miglioramento", "fb.ideaText":"Una funzione, un ritocco al flusso di lavoro, l’idea per un nuovo plugin.",
    "fb.which":"Quale plugin?",
    "news.h":'Rimani sul <span class="o">pezzo.</span>', "news.sub":"Iscriviti", "news.ph":"Indirizzo email",
    "news.consent":"Accetto di ricevere la newsletter di MorphLab via email. Posso cancellarmi in qualsiasi momento.",
    "news.privacyTitle":"Come usiamo la tua email",
    "news.privacy":'MorphLab Audio (Paesi Bassi, <a href="mailto:info@morphlabaudio.com">info@morphlabaudio.com</a>) usa il tuo indirizzo email solo per mandarti questa newsletter. Non viene mai venduto né condiviso, e viene conservato finché non ti cancelli. Gli indirizzi sono conservati su Google Forms e sul nostro servizio di newsletter, Kit; entrambi possono tenere i dati negli USA. Ogni newsletter ha un link per cancellarsi. Per vedere, correggere o cancellare i tuoi dati scrivi a info@morphlabaudio.com. Puoi anche presentare un reclamo all’autorità olandese per la protezione dei dati (Autoriteit Persoonsgegevens).',
    "news.thanks":"Grazie, sei nella lista. Le newsletter arrivano da info@morphlabaudio.com.", "news.needConsent":"Spunta la casella per confermare che vuoi la newsletter.",
    "news.ok":"Quasi fatto: controlla la posta e conferma l’iscrizione.", "news.invalid":"Inserisci un indirizzo email valido.",
    "news.fail":"Qualcosa non ha funzionato. Riprova tra poco o scrivi a info@morphlabaudio.com.",
    "s5.label":"05 — Sostegno", "s5.h":'Dona per <span class="o">sostenerci</span>',
    "s5.lede":"Tutti i plugin MorphLab sono gratuiti. Le donazioni aiutano a coprire i costi di sviluppo e distribuzione.",
    "kofi.btn":"Sostieni su Ko-fi",
    "foot.contact":"Contatti", "foot.support":"Sostieni", "foot.country":"Paesi Bassi",
    "card.download":"Scarica per {os}", "card.or":"o", "card.manual":"Manuale", "card.notes":"Note",
    "card.view":"Apri {name} a grandezza intera", "card.alt":"Interfaccia di {name}",
    "tip.started":"Download avviato", "tip.enjoy":'Buon lavoro con <span class="o">{name}</span>',
    "tip.text":"Tutti i plugin MorphLab sono gratuiti. Se ti è utile, valuta di sostenere il progetto: le donazioni aiutano a coprire i costi di sviluppo e distribuzione.",
    "tip.later":"Magari più tardi", "close":"Chiudi", "lang":"Lingua",
    "card.more":"Dettagli · versioni precedenti",
    "pg.back":"Tutti i plugin", "pg.latest":"Ultima versione", "pg.released":"Pubblicata il {date}", "pg.install":"Come si installa",
    "pg.bug":"Segnala un bug", "pg.idea":"Suggerisci un miglioramento",
    "pg.olderLabel":"Archivio", "pg.olderH":'Versioni <span class="o">precedenti</span>',
    "pg.olderLede":"Build vecchie, tenute per i progetti salvati con quelle versioni. Non vengono più aggiornate: per lavorare usa l’ultima versione qui sopra.",
    "pg.old":"Vecchia", "pg.none":"Nessuna versione precedente: la v{v} è la prima pubblicata su questo sito.",
    "morphclipper.tag":"Clipper da mastering",
    "morphclipper.text":"Un clipper di livello mastering con stadio di clip in oversampling, ceiling true-peak misurato secondo ITU-R BS.1770, un insert transient/saturazione spostabile e routing Mid/Side o dual-mono. Densità senza schiacciare il mix.",
    "morphlator.tag":"Exciter armonico multibanda",
    "morphlator.text":"Aggiunge peso e loudness percepita rimodellando la forma d’onda, non comprimendola. La divisione opzionale in tre bande tiene il basso compatto, e Gain Match ti dà un A/B onesto a pari loudness.",
    "morphtransient.text":"Due manopole, attack e sustain, guidate da una rilevazione a doppio inviluppo indipendente dal livello: nessuna soglia da inseguire, nessun pumping. Mix parallelo e meter della forma in tempo reale. Latenza zero.",
    "morphdynamic.tag":"Saturatore multibanda sui transienti",
    "morphdynamic.text":"Porta il transiente in avanti, in faccia, senza degradare il segnale. Ogni banda reagisce solo ai propri colpi mentre il sustain resta pulito. Cinque tipi di saturazione tra cui Transformer, accensione e solo per banda sullo spettro.",
    "morphase.tag":"Strumento di fase all-pass",
    "morphase.text":"Ruota la fase con filtri all-pass del primo o secondo ordine senza toccare l’ampiezza. Allinea kick, layer e registrazioni multi-microfono, e guarda il risultato su una forma d’onda agganciata al beat.",
    "morphalign.tag":"Allineamento di fase in sidechain",
    "morphalign.text":"Allinea una traccia a un’altra tramite il sidechain, così kick e basso si sommano con la minima cancellazione. Quattro motori — Rotate, Multiband, Match e Match LF — su un’unica grande manopola.",
    "rx92.tag":"Channel strip per DJ",
    "rx92.text":"Una channel strip modellata sul famoso mixer da club, pensata per i live set: EQ a 3 bande con kill, due filtri in serie con LFO sincronizzato al tempo e tre slot effetti ispirati ai più usati mixer da DJ. Latenza zero, ogni parametro assegnabile al tuo controller MIDI.",
    "morphcontrolxl.tag":"Step sequencer per Launch Control XL",
    "morphcontrolxl.text":"Un drum sequencer a 16 step in stile 909, suonato da un Novation Launch Control XL. Otto strumenti, accenti e un LEARN guidato che mappa qualsiasi layout del controller. App standalone e plugin.",
    "morphcontrolxl.formats":"Standalone + AU + VST3 · Richiede Novation Launch Control XL"
  },
  nl: {
    "title":"MorphLab Audio — Gratis audio-plug-ins",
    "nav.plugins":"Plug-ins", "nav.tools":"Tools", "nav.install":"Installatie", "nav.bugs":"Bugs", "nav.donate":"Doneren",
    "hero.pitch":"Gratis plug-ins uit een masteringstudio. Voor productie, live optredens, mixen of masteren. Geen account, geen licentiesleutel.",
    "hero.get":"Download de plug-ins", "hero.report":"Meld een bug", "hero.audio":"Audio-plug-ins",
    "s1.label":"01 — Plug-ins", "s1.right":"7 · Gratis", "s1.h":'Het <span class="o">rack</span>',
    "s1.lede":"Voor macOS (AU + VST3, native op Apple Silicon en Intel) en Windows 10/11 (VST3, 64-bit). Elke download bevat een installatieprogramma en de handleiding in het Engels en Italiaans.",
    "s2.label":"02 — Tools", "s2.h":'<span class="o">Tools</span>',
    "s2.lede":"Hulpmiddelen voor livesets en hardwarecontrollers. Ook gratis.",
    "s3.label":"03 — Installatie", "s3.h":'Install<span class="o">atie</span>',
    "s3.lede":"Het installatieprogramma zet elk formaat in de juiste map. Laat daarna je DAW opnieuw naar plug-ins scannen.",
    "s3.mac1":"Open de <code>.dmg</code> en dubbelklik op de <code>.pkg</code> erin. AU en VST3 worden samen geïnstalleerd.",
    "s3.mac2":"Meldt macOS dat de ontwikkelaar niet kan worden geverifieerd? Open Systeeminstellingen → Privacy en beveiliging, scrol omlaag en klik op ‘Open toch’. Dit hoeft maar één keer per plug-in.",
    "s3.win1":"Pak de download uit en start <code>Setup.exe</code>. De VST3 komt in <code>C:\\Program Files\\Common Files\\VST3</code>.",
    "s3.win2":"Verschijnt SmartScreen? Klik op ‘Meer informatie’ → ‘Toch uitvoeren’.",
    "s3.miss":"Niet zichtbaar?",
    "s3.miss1":"Scan de plug-ins opnieuw in je DAW. In Logic staat de AU onder Audio Units → MorphLab.",
    "s3.miss2":"Nog steeds niets? Stuur een bugmelding met je besturingssysteem en DAW, dan help ik je.",
    "s4.label":"04 — Feedback", "s4.right":"Bugs · Ideeën", "s4.h":"Een bug gevonden? Een idee?",
    "s4.lede":"Elke melding wordt gelezen en beantwoord. Vermeld je besturingssysteem en DAW-versie, zodat ik het probleem kan reproduceren.",
    "s4.note":'Meldingen gaan via GitHub (een gratis account is nodig). Geen account? Mail naar <a href="mailto:info@morphlabaudio.com">info@morphlabaudio.com</a>.',
    "fb.bug":"Meld een bug", "fb.bugText":"Iets crasht, klinkt verkeerd of laadt niet.",
    "fb.idea":"Stel een verbetering voor", "fb.ideaText":"Een functie, een aanpassing in de workflow, een idee voor een nieuwe plug-in.",
    "fb.which":"Welke plug-in?",
    "news.h":'Blijf op de <span class="o">hoogte.</span>', "news.sub":"Aanmelden", "news.ph":"E-mailadres",
    "news.consent":"Ik wil de nieuwsbrief van MorphLab per e-mail ontvangen. Ik kan me op elk moment afmelden.",
    "news.privacyTitle":"Hoe we je e-mailadres gebruiken",
    "news.privacy":'MorphLab Audio (Nederland, <a href="mailto:info@morphlabaudio.com">info@morphlabaudio.com</a>) gebruikt je e-mailadres alleen om je deze nieuwsbrief te sturen. Het wordt nooit verkocht of gedeeld en bewaard tot je je afmeldt. Adressen worden opgeslagen bij Google Forms en bij onze nieuwsbriefdienst Kit; beide kunnen gegevens in de VS bewaren. Elke nieuwsbrief bevat een afmeldlink. Wil je je gegevens inzien, corrigeren of laten verwijderen, mail dan naar info@morphlabaudio.com. Je kunt ook een klacht indienen bij de Autoriteit Persoonsgegevens.',
    "news.thanks":"Bedankt, je staat op de lijst. Nieuwsbrieven komen van info@morphlabaudio.com.", "news.needConsent":"Vink het vakje aan om te bevestigen dat je de nieuwsbrief wilt.",
    "news.ok":"Bijna klaar — check je inbox en bevestig je aanmelding.", "news.invalid":"Vul een geldig e-mailadres in.",
    "news.fail":"Er ging iets mis. Probeer het zo opnieuw of mail naar info@morphlabaudio.com.",
    "s5.label":"05 — Steun", "s5.h":'Doneer om <span class="o">ons te steunen</span>',
    "s5.lede":"Alle MorphLab-plug-ins zijn gratis. Donaties helpen de kosten van ontwikkeling en distributie te dekken.",
    "kofi.btn":"Steun via Ko-fi",
    "foot.contact":"Contact", "foot.support":"Steun", "foot.country":"Nederland",
    "card.download":"Download voor {os}", "card.or":"of", "card.manual":"Handleiding", "card.notes":"Release-notes",
    "card.view":"{name} op volledige grootte bekijken", "card.alt":"Interface van {name}",
    "tip.started":"Download gestart", "tip.enjoy":'Veel plezier met <span class="o">{name}</span>',
    "tip.text":"Alle MorphLab-plug-ins zijn gratis. Heb je er iets aan, overweeg dan het project te steunen — donaties helpen de kosten van ontwikkeling en distributie te dekken.",
    "tip.later":"Misschien later", "close":"Sluiten", "lang":"Taal",
    "card.more":"Details · eerdere versies",
    "pg.back":"Alle plug-ins", "pg.latest":"Nieuwste versie", "pg.released":"Uitgebracht op {date}", "pg.install":"Installeren",
    "pg.bug":"Meld een bug", "pg.idea":"Stel een verbetering voor",
    "pg.olderLabel":"Archief", "pg.olderH":'Eerdere <span class="o">versies</span>',
    "pg.olderLede":"Oudere builds, bewaard voor projecten die ermee zijn opgeslagen. Ze worden niet meer bijgewerkt: gebruik voor nieuw werk de nieuwste versie hierboven.",
    "pg.old":"Oud", "pg.none":"Nog geen eerdere versies: v{v} is de eerste release op deze site.",
    "morphclipper.tag":"Masteringclipper",
    "morphclipper.text":"Een clipper van masteringniveau met een oversampled clipfase, een true-peak-ceiling gemeten volgens ITU-R BS.1770, een verplaatsbare transient/saturatie-insert en Mid/Side- of dual-mono-routing. Dichtheid zonder de mix plat te drukken.",
    "morphlator.tag":"Multiband harmonische exciter",
    "morphlator.text":"Voegt gewicht en waargenomen luidheid toe door de golfvorm te hervormen, niet door te comprimeren. De optionele splitsing in drie banden houdt het laag strak, en Gain Match geeft je een eerlijke A/B bij gelijke luidheid.",
    "morphtransient.text":"Twee knoppen, attack en sustain, aangestuurd door niveau-onafhankelijke detectie met dubbele envelope — geen drempel om bij te stellen, geen pumping. Parallelle mix en een live vormmeter. Nul latentie.",
    "morphdynamic.tag":"Multiband transiëntsaturator",
    "morphdynamic.text":"Zet de transiënt naar voren, recht in je gezicht, zonder het signaal aan te tasten. Elke band reageert alleen op zijn eigen klappen terwijl de sustain schoon blijft. Vijf saturatietypes waaronder Transformer, aan/uit en solo per band op het spectrum.",
    "morphase.tag":"All-pass fasetool",
    "morphase.text":"Draait de fase met all-passfilters van de eerste of tweede orde zonder de amplitude aan te raken. Lijn kicks, layers en opnames met meerdere microfoons uit en bekijk het resultaat op een golfvorm die op de beat vastzit.",
    "morphalign.tag":"Fase-uitlijning via sidechain",
    "morphalign.text":"Lijnt het ene spoor uit op het andere via de sidechain, zodat kick en bas optellen met zo min mogelijk uitdoving. Vier engines — Rotate, Multiband, Match en Match LF — op één grote knop.",
    "rx92.tag":"DJ-kanaalstrip",
    "rx92.text":"Een kanaalstrip naar het voorbeeld van de beroemde clubmixer, gemaakt voor livesets: 3-bands EQ met kill, twee filters in serie met een tempogesynchroniseerde LFO en drie effectslots geïnspireerd op de meestgebruikte DJ-mixers. Nul latentie, elke parameter toe te wijzen aan je MIDI-controller.",
    "morphcontrolxl.tag":"Stepsequencer voor Launch Control XL",
    "morphcontrolxl.text":"Een 16-staps drumsequencer in 909-stijl, bespeeld vanaf een Novation Launch Control XL. Acht instrumenten, accenten en een begeleide LEARN die elke controllerindeling mapt. Standalone app en plug-in.",
    "morphcontrolxl.formats":"Standalone + AU + VST3 · Vereist Novation Launch Control XL"
  },
  fr: {
    "title":"MorphLab Audio — Plug-ins audio gratuits",
    "nav.plugins":"Plug-ins", "nav.tools":"Outils", "nav.install":"Installation", "nav.bugs":"Bugs", "nav.donate":"Faire un don",
    "hero.pitch":"Des plug-ins gratuits nés dans un studio de mastering. Pour la production, le live, le mixage ou le mastering. Sans compte, sans clé de licence.",
    "hero.get":"Télécharger les plug-ins", "hero.report":"Signaler un bug", "hero.audio":"Plug-ins audio",
    "s1.label":"01 — Plug-ins", "s1.right":"7 · Gratuits", "s1.h":'Le <span class="o">rack</span>',
    "s1.lede":"Pour macOS (AU + VST3, natifs sur Apple Silicon et Intel) et Windows 10/11 (VST3, 64 bits). Chaque téléchargement comprend un installateur et le manuel en anglais et en italien.",
    "s2.label":"02 — Outils", "s2.h":'<span class="o">Outils</span>',
    "s2.lede":"Des utilitaires pour le live et les contrôleurs matériels. Gratuits eux aussi.",
    "s3.label":"03 — Installation", "s3.h":'Install<span class="o">ation</span>',
    "s3.lede":"L’installateur place chaque format dans le bon dossier. Relancez ensuite l’analyse des plug-ins dans votre DAW.",
    "s3.mac1":"Ouvrez le <code>.dmg</code> et double-cliquez sur le <code>.pkg</code> qu’il contient. AU et VST3 s’installent ensemble.",
    "s3.mac2":"Si macOS indique qu’il ne peut pas vérifier le développeur&nbsp;: ouvrez Réglages Système → Confidentialité et sécurité, faites défiler vers le bas et cliquez sur «&nbsp;Ouvrir quand même&nbsp;». Une seule fois par plug-in suffit.",
    "s3.win1":"Décompressez le fichier et lancez <code>Setup.exe</code>. Le VST3 est installé dans <code>C:\\Program Files\\Common Files\\VST3</code>.",
    "s3.win2":"Si SmartScreen apparaît, cliquez sur «&nbsp;Informations complémentaires&nbsp;» → «&nbsp;Exécuter quand même&nbsp;».",
    "s3.miss":"Introuvable&nbsp;?",
    "s3.miss1":"Relancez l’analyse des plug-ins dans votre DAW. Dans Logic, l’AU se trouve sous Audio Units → MorphLab.",
    "s3.miss2":"Toujours rien&nbsp;? Envoyez un rapport de bug en indiquant votre système et votre DAW, et je vous aiderai.",
    "s4.label":"04 — Retours", "s4.right":"Bugs · Idées", "s4.h":"Un bug&nbsp;? Une idée&nbsp;?",
    "s4.lede":"Chaque rapport est lu et reçoit une réponse. Indiquez votre système et la version de votre DAW pour que je puisse reproduire le problème.",
    "s4.note":'Les rapports se font sur GitHub (un compte gratuit est nécessaire). Pas de compte&nbsp;? Écrivez à <a href="mailto:info@morphlabaudio.com">info@morphlabaudio.com</a>.',
    "fb.bug":"Signaler un bug", "fb.bugText":"Un plantage, un son anormal ou un plug-in qui ne se charge pas.",
    "fb.idea":"Proposer une amélioration", "fb.ideaText":"Une fonction, un ajustement du workflow, une idée de nouveau plug-in.",
    "fb.which":"Quel plug-in&nbsp;?",
    "news.h":'Restez <span class="o">branchés.</span>', "news.sub":"S’inscrire", "news.ph":"Adresse e-mail",
    "news.consent":"J’accepte de recevoir la newsletter de MorphLab par e-mail. Je peux me désinscrire à tout moment.",
    "news.privacyTitle":"Utilisation de votre adresse e-mail",
    "news.privacy":'MorphLab Audio (Pays-Bas, <a href="mailto:info@morphlabaudio.com">info@morphlabaudio.com</a>) utilise votre adresse e-mail uniquement pour vous envoyer cette newsletter. Elle n’est jamais vendue ni partagée, et elle est conservée jusqu’à votre désinscription. Les adresses sont stockées chez Google Forms et chez notre service de newsletter, Kit&nbsp;; tous deux peuvent conserver les données aux États-Unis. Chaque newsletter contient un lien de désinscription. Pour consulter, corriger ou supprimer vos données, écrivez à info@morphlabaudio.com. Vous pouvez aussi déposer une plainte auprès de l’autorité néerlandaise de protection des données (Autoriteit Persoonsgegevens).',
    "news.thanks":"Merci, vous êtes inscrit. Les newsletters viennent de info@morphlabaudio.com.", "news.needConsent":"Cochez la case pour confirmer que vous souhaitez recevoir la newsletter.",
    "news.ok":"Presque terminé — vérifiez votre boîte mail et confirmez votre inscription.", "news.invalid":"Saisissez une adresse e-mail valide.",
    "news.fail":"Une erreur s’est produite. Réessayez dans un instant ou écrivez à info@morphlabaudio.com.",
    "s5.label":"05 — Soutien", "s5.h":'Faites un don pour <span class="o">nous soutenir</span>',
    "s5.lede":"Tous les plug-ins MorphLab sont gratuits. Les dons aident à couvrir les frais de développement et de distribution.",
    "kofi.btn":"Soutenir sur Ko-fi",
    "foot.contact":"Contact", "foot.support":"Soutenir", "foot.country":"Pays-Bas",
    "card.download":"Télécharger pour {os}", "card.or":"ou", "card.manual":"Manuel", "card.notes":"Notes",
    "card.view":"Voir {name} en taille réelle", "card.alt":"Interface de {name}",
    "tip.started":"Téléchargement lancé", "tip.enjoy":'Profitez bien de <span class="o">{name}</span>',
    "tip.text":"Tous les plug-ins MorphLab sont gratuits. S’il vous est utile, pensez à soutenir le projet — les dons aident à couvrir les frais de développement et de distribution.",
    "tip.later":"Plus tard", "close":"Fermer", "lang":"Langue",
    "card.more":"Détails · versions précédentes",
    "pg.back":"Tous les plug-ins", "pg.latest":"Dernière version", "pg.released":"Publiée le {date}", "pg.install":"Installation",
    "pg.bug":"Signaler un bug", "pg.idea":"Proposer une amélioration",
    "pg.olderLabel":"Archives", "pg.olderH":'Versions <span class="o">précédentes</span>',
    "pg.olderLede":"Anciennes versions, conservées pour les projets enregistrés avec elles. Elles ne sont plus mises à jour&nbsp;: pour un nouveau travail, utilisez la dernière version ci-dessus.",
    "pg.old":"Ancienne", "pg.none":"Pas encore de version précédente&nbsp;: la v{v} est la première publiée sur ce site.",
    "morphclipper.tag":"Clipper de mastering",
    "morphclipper.text":"Un clipper de qualité mastering avec un étage de clip suréchantillonné, un plafond true-peak mesuré selon l’ITU-R BS.1770, un insert transitoire/saturation déplaçable et un routage Mid/Side ou double mono. De la densité sans écraser le mix.",
    "morphlator.tag":"Exciter harmonique multibande",
    "morphlator.text":"Ajoute du poids et du volume perçu en remodelant la forme d’onde, sans la compresser. Le découpage optionnel en trois bandes garde le bas du spectre serré, et Gain Match permet un A/B honnête à volume égal.",
    "morphtransient.text":"Deux boutons, attaque et sustain, pilotés par une détection à double enveloppe indépendante du niveau — pas de seuil à réajuster, pas de pompage. Mix parallèle et indicateur de forme en temps réel. Latence nulle.",
    "morphdynamic.tag":"Saturateur de transitoires multibande",
    "morphdynamic.text":"Met le transitoire en avant, en pleine face, sans dégrader le signal. Chaque bande ne réagit qu’à ses propres frappes tandis que le sustain reste propre. Cinq types de saturation dont Transformer, activation et solo par bande sur le spectre.",
    "morphase.tag":"Outil de phase passe-tout",
    "morphase.text":"Fait tourner la phase avec des filtres passe-tout du premier ou du second ordre sans toucher à l’amplitude. Alignez kicks, couches et prises multi-micros, et observez le résultat sur une forme d’onde calée sur le beat.",
    "morphalign.tag":"Alignement de phase par sidechain",
    "morphalign.text":"Aligne une piste sur une autre via le sidechain, pour que kick et basse s’additionnent avec un minimum d’annulation. Quatre moteurs — Rotate, Multiband, Match et Match LF — sur un seul gros bouton.",
    "rx92.tag":"Tranche de console DJ",
    "rx92.text":"Une tranche de console inspirée de la célèbre table de mixage de club, pensée pour le live&nbsp;: EQ 3 bandes avec kill, deux filtres en série avec un LFO synchronisé au tempo et trois slots d’effets inspirés des tables DJ les plus utilisées. Latence nulle, chaque paramètre assignable à votre contrôleur MIDI.",
    "morphcontrolxl.tag":"Séquenceur pas à pas pour Launch Control XL",
    "morphcontrolxl.text":"Un séquenceur de batterie 16 pas façon 909, joué depuis un Novation Launch Control XL. Huit instruments, des accents et un LEARN guidé qui s’adapte à n’importe quelle disposition du contrôleur. Application autonome et plug-in.",
    "morphcontrolxl.formats":"Autonome + AU + VST3 · Nécessite un Novation Launch Control XL"
  }
};
// English for the strings built in JS (the static ones are read from the HTML at startup)
const EN = {
  "title": document.title,
  "fb.bug":"Report a bug", "fb.bugText":"Something crashes, sounds wrong or won’t load.",
  "fb.idea":"Suggest an improvement", "fb.ideaText":"A feature, a workflow tweak, a new plugin idea.",
  "fb.which":"Which plugin?",
  "card.download":"Download for {os}", "card.or":"or", "card.manual":"Manual", "card.notes":"Notes",
  "card.view":"View {name} at full size", "card.alt":"{name} interface",
  "tip.started":"Download started", "tip.enjoy":'Enjoy <span class="o">{name}</span>',
  "tip.text":"All MorphLab plugins are free. If it’s useful, consider supporting the project — donations help cover development and distribution costs.",
  "tip.later":"Maybe later", "close":"Close", "lang":"Language",
  "card.more":"Details · previous versions",
  "pg.back":"All plugins", "pg.latest":"Latest version", "pg.released":"Released {date}", "pg.install":"How to install",
  "pg.bug":"Report a bug", "pg.idea":"Suggest an improvement",
  "pg.olderLabel":"Archive", "pg.olderH":'Previous <span class="o">versions</span>',
  "pg.olderLede":"Older builds, kept for projects that were saved with them. They are not updated any more: for new work use the latest version above.",
  "pg.old":"Old", "pg.none":"No previous versions yet: v{v} is the first release on this site.",
  "news.ph":"Email address",
  "news.thanks":"Thanks — you’re on the list. Newsletters come from info@morphlabaudio.com.", "news.needConsent":"Please tick the box to confirm you want the newsletter.",
  "news.ok":"Almost done — check your inbox and confirm your subscription.", "news.invalid":"Please enter a valid email address.",
  "news.fail":"Something went wrong. Try again in a moment or email info@morphlabaudio.com."
};
PRODUCTS.forEach(p => { EN[p.id + ".tag"] = p.tag; EN[p.id + ".text"] = p.text; if (p.formats) EN[p.id + ".formats"] = p.formats; });
document.querySelectorAll("[data-i18n]").forEach(el => { EN[el.dataset.i18n] = el.innerHTML; });

const LANG_KEY = "ml-lang";
function pickLang(){
  const ok = c => LANGS.some(l => l.code === c);
  const q = new URLSearchParams(location.search).get("lang");
  if (ok(q)) return q;
  try { const s = localStorage.getItem(LANG_KEY); if (ok(s)) return s; } catch {}
  for (const l of navigator.languages || [navigator.language || ""]) {
    const c = l.slice(0, 2).toLowerCase();
    if (ok(c)) return c;
  }
  return "en";
}
let lang = pickLang();
const t = (k, vars = {}) => ((I18N[lang] || {})[k] ?? EN[k] ?? k).replace(/\{(\w+)\}/g, (_, v) => vars[v] ?? "");

let flagN = 0;
function flag(c){
  const v = (vb, body) => `<svg class="flag" viewBox="${vb}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${body}</svg>`;
  if (c === "it") return v("0 0 3 2", '<path fill="#009246" d="M0 0h1v2H0z"/><path fill="#fff" d="M1 0h1v2H1z"/><path fill="#CE2B37" d="M2 0h1v2H2z"/>');
  if (c === "fr") return v("0 0 3 2", '<path fill="#002654" d="M0 0h1v2H0z"/><path fill="#fff" d="M1 0h1v2H1z"/><path fill="#CE1126" d="M2 0h1v2H2z"/>');
  if (c === "nl") return v("0 0 3 2", '<path fill="#AE1C28" d="M0 0h3v.67H0z"/><path fill="#fff" d="M0 .67h3v.66H0z"/><path fill="#21468B" d="M0 1.33h3V2H0z"/>');
  const id = "uk" + (++flagN);
  return v("0 0 60 30", `<clipPath id="${id}"><path d="M30 15h30v15zv15H0zH0V0zV0h30z"/></clipPath><path fill="#012169" d="M0 0h60v30H0z"/><path stroke="#fff" stroke-width="6" d="M0 0l60 30m0-30L0 30"/><path stroke="#C8102E" stroke-width="4" clip-path="url(#${id})" d="M0 0l60 30m0-30L0 30"/><path stroke="#fff" stroke-width="10" d="M30 0v30M0 15h60"/><path stroke="#C8102E" stroke-width="6" d="M30 0v30M0 15h60"/>`);
}

function buildPickers(){
  document.querySelectorAll("[data-lang-picker]").forEach(box => {
    box.innerHTML = `<button class="lang-btn" type="button" aria-haspopup="listbox" aria-expanded="false"></button>
      <ul class="lang-menu" role="listbox">${LANGS.map(l => `<li><button type="button" role="option" data-l="${l.code}" lang="${l.code}">${flag(l.code)}${l.name}</button></li>`).join("")}</ul>`;
    const btn = box.querySelector(".lang-btn");
    btn.addEventListener("click", e => { e.stopPropagation(); const open = !box.classList.contains("open"); closePickers(); if (open) { box.classList.add("open"); btn.setAttribute("aria-expanded", "true"); } });
    box.querySelectorAll("[data-l]").forEach(o => o.addEventListener("click", () => { setLang(o.dataset.l); closePickers(); btn.focus(); }));
  });
}
function closePickers(){
  document.querySelectorAll("[data-lang-picker].open").forEach(b => { b.classList.remove("open"); b.querySelector(".lang-btn").setAttribute("aria-expanded", "false"); });
}
document.addEventListener("click", closePickers);

// home page = index.html; plugin pages = /<id>/index.html with <body data-page="plugin" data-id="<id>">
const PAGE = document.body.dataset.page || "home";
const PAGE_ID = document.body.dataset.id;

function render(){
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => { el.innerHTML = t(el.dataset.i18n); });
  document.querySelectorAll("[data-i18n-ph]").forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
  document.querySelectorAll("[data-lang-picker]").forEach(box => {
    const btn = box.querySelector(".lang-btn");
    btn.innerHTML = `${flag(lang)}<span>${lang.toUpperCase()}</span><svg class="chev" viewBox="0 0 8 8" aria-hidden="true"><path d="M1 2.5l3 3 3-3"/></svg>`;
    btn.setAttribute("aria-label", `${t("lang")}: ${LANGS.find(l => l.code === lang).name}`);
    box.querySelectorAll("[data-l]").forEach(o => o.setAttribute("aria-selected", o.dataset.l === lang));
  });
  if (PAGE === "plugin") renderPlugin(); else renderHome();
}
function renderHome(){
  document.title = t("title");
  document.querySelector('#subscribe [name="fields[language]"]').value = lang;
  document.querySelector("#subscribe .sub-msg").textContent = "";
  document.getElementById("grid-plugins").innerHTML = PRODUCTS.filter(p => p.group === "plugins").map(card).join("");
  document.getElementById("grid-tools").innerHTML = PRODUCTS.filter(p => p.group === "tools").map(card).join("");
  const was = document.getElementById("which")?.value;
  const opts = PRODUCTS.map(p => `<option${p.name === was ? " selected" : ""}>${p.name}</option>`).join("");
  document.getElementById("fb").innerHTML = `
  <a href="#" data-t="bug_report.yml"><b>${t("fb.bug")}</b><span>${t("fb.bugText")}</span></a>
  <a href="#" data-t="feature_request.yml"><b>${t("fb.idea")}</b><span>${t("fb.ideaText")}</span></a>
  <label>${t("fb.which")}<select id="which">${opts}</select></label>`;
}
function setLang(c){
  lang = c;
  try { localStorage.setItem(LANG_KEY, c); } catch {}
  render();
}
/* ============================================== */

const ua = navigator.userAgent;
const isWin = /Windows/.test(ua);
const tagOf = p => `${p.id}-v${p.version}`;
const asset = (p, kind) => `https://github.com/${REPO}/releases/download/${tagOf(p)}/${p.file}-${kind}`;
const label = os => os === "mac" ? "macOS" : "Windows";
const ext = os => os === "mac" ? "mac.dmg" : "win.zip";
// noon, so the day never shifts with the visitor's time zone
const fmtDate = d => new Intl.DateTimeFormat(lang, { day:"numeric", month:"long", year:"numeric" }).format(new Date(d + "T12:00:00"));
const formatsOf = p => p.formats ? t(p.id + ".formats") : "macOS 11+ · AU + VST3 &nbsp;|&nbsp; Windows 10+ · VST3";
const shotOf = (p, lazy) => `<div class="shot" data-id="${p.id}" data-name="${p.name}" data-ver="${p.version}" role="button" tabindex="0" aria-label="${t("card.view", { name:p.name })}"><img src="/img/${p.id}.webp?v=${p.version}" alt="${t("card.alt", { name:p.name })}"${lazy ? ' loading="lazy"' : ""}></div>`;

function downloads(p){
  const first = isWin ? "win" : "mac", second = first === "mac" ? "win" : "mac";
  return `<div class="dl">
      <a class="btn solid" data-dl="${p.name}" href="${asset(p, ext(first))}">${t("card.download", { os:label(first) })}</a>
      <span class="alt">${t("card.or")} <a data-dl="${p.name}" href="${asset(p, ext(second))}">${label(second)}</a> · <a href="${asset(p, "manual.pdf")}">${t("card.manual")}</a> · <a href="https://github.com/${REPO}/releases/tag/${tagOf(p)}">${t("card.notes")}</a></span>
    </div>`;
}
function card(p){
  return `<article class="card">
    ${shotOf(p, true)}
    <div class="head"><h3><a href="/${p.id}/">${p.name}</a></h3><span class="ver">v${p.version}</span></div>
    <div class="tag">${t(p.id + ".tag")}</div>
    <p>${t(p.id + ".text")}</p>
    <div class="formats">${formatsOf(p)}</div>
    ${downloads(p)}
    <a class="more" href="/${p.id}/">${t("card.more")} →</a>
  </article>`;
}
function renderPlugin(){
  const p = PRODUCTS.find(x => x.id === PAGE_ID);
  document.title = `${p.name} — MorphLab Audio`;
  const older = p.older.map(o => {
    const v = { ...p, version:o.version };
    return `<li class="old-row">
      <div class="old-v"><span class="old-badge">${t("pg.old")}</span><b>v${o.version}</b><span class="old-d">${fmtDate(o.released)}</span></div>
      <div class="old-dl"><a class="btn" data-dl="${p.name}" href="${asset(v, "mac.dmg")}">macOS</a><a class="btn" data-dl="${p.name}" href="${asset(v, "win.zip")}">Windows</a><a href="${asset(v, "manual.pdf")}">${t("card.manual")}</a></div>
    </li>`;
  }).join("");
  document.getElementById("pg").innerHTML = `
  <a class="back label" href="/#${p.group}">← ${t("pg.back")}</a>
  <section class="pg-top">
    <div class="shead label"><span>${t(p.id + ".tag")}</span><span>v${p.version}</span></div>
    <div class="pg-grid${p.tall ? " tall" : ""}">
      ${p.tall ? `<div class="full-shot"><img src="/img/full/${p.id}.webp?v=${p.version}" alt="${t("card.alt", { name:p.name })}"></div>` : shotOf(p, false)}
      <div class="pg-info">
        <h1 class="pg-h">${p.name}</h1>
        <div class="latest"><span class="pill">${t("pg.latest")}</span><span class="ver">v${p.version} · ${t("pg.released", { date:fmtDate(p.released) })}</span></div>
        <p>${t(p.id + ".text")}</p>
        <div class="formats">${formatsOf(p)}</div>
        ${downloads(p)}
        <p class="pg-fb"><a href="#" data-t="bug_report.yml" data-plugin="${p.name}">${t("pg.bug")}</a> · <a href="#" data-t="feature_request.yml" data-plugin="${p.name}">${t("pg.idea")}</a> · <a href="/#install">${t("pg.install")}</a></p>
      </div>
    </div>
  </section>
  <section class="older" id="older">
    <div class="older-box">
      <div class="shead label"><span>${t("pg.olderLabel")}</span><span>${p.older.length}</span></div>
      <h2>${t("pg.olderH")}</h2>
      ${older ? `<p class="lede">${t("pg.olderLede")}</p><ul class="old-list">${older}</ul>` : `<p class="old-none">${t("pg.none", { v:p.version })}</p>`}
    </div>
  </section>`;
}
buildPickers();
render();

// cards and feedback links are rebuilt on every language change, so their clicks are delegated
document.addEventListener("click", e => {
  const fb = e.target.closest("a[data-t]");
  if (fb) {
    e.preventDefault();
    const name = fb.dataset.plugin || document.getElementById("which").value;
    const q = new URLSearchParams({ template: fb.dataset.t, plugin: name, title: `[${name}] ` });
    window.open(`https://github.com/${REPO}/issues/new?${q}`, "_blank", "noopener");
    return;
  }
  const shot = e.target.closest(".shot");
  if (shot) { openShot(shot); return; }
  const dl = e.target.closest("[data-dl]");
  if (dl && !tipSeen()) setTimeout(() => openTip(dl.dataset.dl, dl), 600);
});
document.addEventListener("keydown", e => {
  const shot = e.target.closest && e.target.closest(".shot");
  if (shot && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openShot(shot); }
});

// Newsletter: posts to Kit's public form endpoint; Kit sends the double opt-in email.
// If the JSON request fails (network, CORS), the form is submitted normally into a new tab
// so Kit can show its own confirmation page.
const sub = document.getElementById("subscribe");
if (sub) sub.action = `https://app.kit.com/forms/${KIT_FORM}/subscriptions`;
sub?.addEventListener("submit", async e => {
  e.preventDefault();
  const msg = sub.querySelector(".sub-msg"), btn = sub.querySelector("button"), email = sub.querySelector("[type=email]");
  const say = (k, err) => { msg.textContent = t(k); msg.classList.toggle("err", !!err); };
  if (sub.querySelector(".hp").value) { say("news.ok"); return; }
  if (!email.checkValidity()) { say("news.invalid", true); email.focus(); return; }
  if (!sub.querySelector(".sub-ok input").checked) { say("news.needConsent", true); return; }
  btn.disabled = true;
  try {
    if (KIT_FORM) {
      const r = await fetch(sub.action, { method:"POST", headers:{ Accept:"application/json" }, body:new FormData(sub) });
      if (!r.ok) throw new Error(r.status);
      say("news.ok");
    } else {
      // Google Forms gives no CORS response: an opaque reply is the best confirmation available
      const body = new URLSearchParams({ [GFORM.email]: email.value.trim(), [GFORM.lang]: lang,
        [GFORM.consent]: `yes — ${new Date().toISOString()} — ${t("news.consent")}` });
      await fetch(`https://docs.google.com/forms/d/e/${GFORM.id}/formResponse`, { method:"POST", mode:"no-cors", body });
      say("news.thanks");
    }
    email.value = "";
    sub.querySelector(".sub-ok input").checked = false;
  } catch {
    if (KIT_FORM) { try { sub.submit(); say("news.ok"); } catch { say("news.fail", true); } }
    else say("news.fail", true);
  } finally {
    btn.disabled = false;
  }
});

document.getElementById("yr").textContent = new Date().getFullYear();

// Full-size viewer. Click the image to toggle between fit-to-screen and 1:1;
// 1:1 divides by devicePixelRatio because the screenshots are Retina (2x) captures.
let lb = null, lbFrom = null, lbResize = null;
function closeShot(){
  if (!lb) return;
  const el = lb; lb = null;
  removeEventListener("resize", lbResize);
  el.classList.remove("on");
  document.body.style.overflow = "";
  setTimeout(() => el.remove(), 250);
  lbFrom && lbFrom.focus();
}
function openShot(shot){
  lbFrom = shot;
  lb = document.createElement("div");
  lb.className = "lb";
  lb.setAttribute("role", "dialog");
  lb.setAttribute("aria-modal", "true");
  lb.setAttribute("aria-label", `${shot.dataset.name} at full size`);
  lb.innerHTML = `<button class="lb-close" aria-label="${t("close")}">×</button><img src="/img/full/${shot.dataset.id}.webp?v=${shot.dataset.ver}" alt="${t("card.alt", { name:shot.dataset.name })}">`;
  const img = lb.querySelector("img");
  // width only, never width+height: capping both independently squashes the image
  const size = () => {
    if (!lb || !img.naturalWidth) return;
    const real = img.naturalWidth / (window.devicePixelRatio || 1);
    const fit = Math.min(real, innerWidth - 48, (innerHeight - 80) * img.naturalWidth / img.naturalHeight);
    const native = lb.classList.contains("native");
    img.style.width = (native ? real : fit) + "px";
    img.style.cursor = fit < real ? (native ? "zoom-out" : "zoom-in") : "default";
  };
  img.addEventListener("load", size);
  lbResize = size;
  addEventListener("resize", size);
  img.addEventListener("click", e => {
    e.stopPropagation();
    lb.classList.toggle("native");
    size();
  });
  lb.addEventListener("click", closeShot);
  document.body.appendChild(lb);
  document.body.style.overflow = "hidden";
  if (img.complete) size();
  requestAnimationFrame(() => lb && lb.classList.add("on"));
  lb.querySelector(".lb-close").focus();
}
// Ko-fi popup: once per visitor, after the first installer download.
// The download itself is never blocked; storage can throw (private mode), then it just shows again next visit.
const TIP_KEY = "ml-tip-shown";
const tipSeen = () => { try { return localStorage.getItem(TIP_KEY) === "1"; } catch { return false; } };
let tip = null, tipFrom = null;
function closeTip(){
  if (!tip) return;
  const el = tip; tip = null;
  el.classList.remove("on");
  document.body.style.overflow = "";
  setTimeout(() => el.remove(), 250);
  tipFrom && tipFrom.focus();
}
function openTip(name, from){
  try { localStorage.setItem(TIP_KEY, "1"); } catch {}
  tipFrom = from;
  tip = document.createElement("div");
  tip.className = "tip";
  tip.setAttribute("role", "dialog");
  tip.setAttribute("aria-modal", "true");
  tip.setAttribute("aria-labelledby", "tip-h");
  tip.innerHTML = `<div class="box">
    <button class="lb-close" aria-label="${t("close")}">×</button>
    <div class="label">${t("tip.started")}</div>
    <h3 id="tip-h">${t("tip.enjoy", { name })}</h3>
    <p>${t("tip.text")}</p>
    <div class="actions"><a class="btn solid" href="${KOFI}" target="_blank" rel="noopener">${t("kofi.btn")}</a><button class="later">${t("tip.later")}</button></div>
  </div>`;
  tip.addEventListener("click", e => { if (e.target === tip) closeTip(); });
  tip.querySelector(".lb-close").addEventListener("click", closeTip);
  tip.querySelector(".later").addEventListener("click", closeTip);
  tip.querySelector(".btn").addEventListener("click", () => setTimeout(closeTip, 300));
  document.body.appendChild(tip);
  document.body.style.overflow = "hidden";
  requestAnimationFrame(() => tip && tip.classList.add("on"));
  tip.querySelector(".btn").focus();
}
document.addEventListener("keydown", e => { if (e.key === "Escape") { closeTip(); closeShot(); closePickers(); } });
