// Sample data for Připrav.cz — Czech 6th grade teacher platform

const SUBJECTS = [
  { id: 'cestina', label: 'Český jazyk', short: 'ČJ', hue: 18 },
  { id: 'matematika', label: 'Matematika', short: 'M', hue: 220 },
  { id: 'dejepis', label: 'Dějepis', short: 'D', hue: 35 },
  { id: 'obcanka', label: 'Občanská výchova', short: 'OV', hue: 280 },
  { id: 'prirodopis', label: 'Přírodopis', short: 'PŘ', hue: 150 },
];

const FOCUS_TYPES = [
  { id: 'new', label: 'Nové učivo' },
  { id: 'practice', label: 'Procvičování' },
  { id: 'review', label: 'Opakování' },
];

// Pedagogické rámce / struktury hodiny
const FRAMEWORKS = [
  {
    id: 'classic',
    label: 'Klasická struktura',
    short: 'Klasická',
    desc: 'Pětifázová hodina — osvědčený model pro běžnou výuku.',
    phases: [
      { phase: 'Aktivace', badge: 'engagement', weight: 7, title: 'Vstupní otázka', desc: 'Brainstorming ve dvojicích — co už o tématu žáci ví. Zápis pojmů na tabuli.' },
      { phase: 'Výklad', badge: 'concept', weight: 13, title: 'Vysvětlení nového pojmu', desc: 'Stručný výklad s příklady. Žáci si dělají poznámky, učitel kontroluje porozumění.' },
      { phase: 'Procvičování', badge: 'practice', weight: 12, title: 'Řízené příklady', desc: 'Žáci řeší 4–5 typových úloh společně. Po každé úloze krátká kontrola.' },
      { phase: 'Produkce', badge: 'production', weight: 8, title: 'Samostatná práce', desc: 'Žáci zkouší podobnou úlohu samostatně. Učitel obchází třídu a pomáhá.' },
      { phase: 'Reflexe', badge: 'reflection', weight: 5, title: 'Co si odnášíme', desc: 'Tři věci, které jsem se naučil/a. Zápis do sešitu, dva žáci sdílí nahlas.' },
    ],
  },
  {
    id: 'eur',
    label: 'E-U-R (RWCT)',
    short: 'E-U-R',
    desc: 'Evokace – Uvědomění si významu – Reflexe. Konstruktivistický model čtením a psaním ke kritickému myšlení.',
    phases: [
      { phase: 'Evokace', badge: 'engagement', weight: 10, title: 'Co už o tématu víme', desc: 'Volné psaní 3 min, poté myšlenková mapa ve dvojicích. Aktivace předchozích znalostí a formulace otázek.' },
      { phase: 'Uvědomění si významu', badge: 'concept', weight: 25, title: 'Setkání s novou informací', desc: 'Čtení textu metodou I.N.S.E.R.T. nebo poslech s vedeným zápisem. Žáci aktivně zpracovávají novou informaci a propojují ji s tím, co už věděli.' },
      { phase: 'Reflexe', badge: 'reflection', weight: 10, title: 'Co se ve mně změnilo', desc: 'Pětilístek nebo výstupní lístek. Žáci formulují, jak se jejich porozumění proměnilo, a kladou si nové otázky.' },
    ],
  },
  {
    id: '5e',
    label: '5E model',
    short: '5E',
    desc: 'Engage – Explore – Explain – Elaborate – Evaluate. Vhodný především pro přírodovědné a badatelské hodiny.',
    phases: [
      { phase: 'Engage', badge: 'engagement', weight: 5, title: 'Zaujetí', desc: 'Provokativní otázka, krátké video nebo demonstrace. Cílem je vyvolat zvědavost a propojit s prekonceptem.' },
      { phase: 'Explore', badge: 'practice', weight: 12, title: 'Zkoumání', desc: 'Žáci ve skupinách experimentují, pozorují, sbírají data. Učitel zatím nevysvětluje — kladou si vlastní otázky.' },
      { phase: 'Explain', badge: 'concept', weight: 10, title: 'Vysvětlení', desc: 'Žáci sdílí pozorování. Učitel formalizuje terminologii a zavádí odborný jazyk pro zjištěné jevy.' },
      { phase: 'Elaborate', badge: 'production', weight: 12, title: 'Rozšíření', desc: 'Aplikace získaného konceptu na nový kontext nebo komplikovanější příklad. Hlubší procvičení.' },
      { phase: 'Evaluate', badge: 'reflection', weight: 6, title: 'Hodnocení', desc: 'Krátký kvíz, sebehodnocení nebo prezentace. Ověření, zda žák dokáže koncept použít a vysvětlit.' },
    ],
  },
  {
    id: 'gradual',
    label: 'Postupné uvolňování',
    short: 'Já – my – ty',
    desc: 'Učitel postupně předává odpovědnost: nejprve modeluje, pak společně, nakonec samostatně.',
    phases: [
      { phase: 'Úvod', badge: 'engagement', weight: 5, title: 'Cíl a motivace', desc: 'Učitel jasně formuluje, co se dnes naučíme a proč to potřebujeme.' },
      { phase: 'Já modeluji', badge: 'concept', weight: 12, title: 'Učitel ukazuje postup', desc: 'Učitel nahlas demonstruje postup, „myslí nahlas" a předvádí strategii řešení.' },
      { phase: 'Společně', badge: 'practice', weight: 14, title: 'Vedená společná práce', desc: 'Třída pracuje společně pod vedením učitele. Žáci postupně přebírají rozhodování.' },
      { phase: 'Samostatně', badge: 'production', weight: 10, title: 'Samostatná aplikace', desc: 'Žáci pracují samostatně nebo ve dvojicích. Učitel poskytuje cílenou podporu těm, kdo ji potřebují.' },
      { phase: 'Reflexe', badge: 'reflection', weight: 4, title: 'Sebehodnocení', desc: 'Co mi šlo? Kde jsem si nebyl/a jistý/á? Žáci hodnotí svůj pokrok.' },
    ],
  },
  {
    id: 'inquiry',
    label: 'Badatelská výuka',
    short: 'Bádání',
    desc: 'Žáci kladou otázky, formulují hypotézy a hledají odpovědi vlastním zkoumáním.',
    phases: [
      { phase: 'Otázka', badge: 'engagement', weight: 6, title: 'Provokativní problém', desc: 'Učitel představí jev nebo otázku, na kterou neexistuje jednoduchá odpověď.' },
      { phase: 'Hypotéza', badge: 'concept', weight: 8, title: 'Formulace hypotéz', desc: 'Žáci ve skupinách navrhují možná vysvětlení. Hypotézy se zapisují na tabuli.' },
      { phase: 'Bádání', badge: 'practice', weight: 18, title: 'Sběr dat a zkoumání', desc: 'Žáci ověřují hypotézy — pokus, výzkum textu, dotazník, pozorování. Učitel je v roli průvodce.' },
      { phase: 'Diskuze', badge: 'production', weight: 8, title: 'Sdílení a argumentace', desc: 'Skupiny prezentují zjištění. Třída společně diskutuje, které hypotézy se potvrdily.' },
      { phase: 'Reflexe', badge: 'reflection', weight: 5, title: 'Co jsme zjistili', desc: 'Shrnutí poznatků a otevření nových otázek pro příští bádání.' },
    ],
  },
  {
    id: 'flipped',
    label: 'Převrácená třída',
    short: 'Flipped',
    desc: 'Žáci se s teorií seznamují doma; ve škole se soustředí na aplikaci a diskuzi.',
    phases: [
      { phase: 'Kontrola přípravy', badge: 'engagement', weight: 6, title: 'Vstupní kvíz', desc: 'Krátký kvíz nebo diskuze ověří, co si žáci přinesli z domácí přípravy (video, text).' },
      { phase: 'Otázky', badge: 'concept', weight: 8, title: 'Vyjasnění nejasností', desc: 'Učitel adresuje místa, kde se nejvíce žáků zaseklo. Cílený miniworkshop.' },
      { phase: 'Aplikace', badge: 'practice', weight: 18, title: 'Práce na úlohách', desc: 'Většina hodiny — žáci řeší úlohy, projekty, případové studie. Učitel je k dispozici jako konzultant.' },
      { phase: 'Sdílení', badge: 'production', weight: 8, title: 'Prezentace řešení', desc: 'Vybrané skupiny prezentují postup. Třída srovnává různá řešení a strategie.' },
      { phase: 'Plán dál', badge: 'reflection', weight: 5, title: 'Co si připravit na příště', desc: 'Učitel zadá materiál pro další lekci a vyjasní očekávané výstupy.' },
    ],
  },
];

// Lesson plan templates keyed by focus type
const LESSON_TEMPLATES = {
  new: [
    { phase: 'Aktivace', minutes: 7, badge: 'engagement', title: 'Vstupní otázka', desc: 'Zápis na tabuli — co už o tématu žáci ví. Brainstorming ve dvojicích, sdílení pojmů.' },
    { phase: 'Výklad', minutes: 13, badge: 'concept', title: 'Vysvětlení nového pojmu', desc: 'Stručný výklad s příklady na tabuli. Žáci si dělají poznámky do sešitu, učitel kontroluje porozumění.' },
    { phase: 'Procvičování', minutes: 12, badge: 'practice', title: 'Řízené příklady', desc: 'Žáci řeší 4–5 typových úloh společně. Po každé úloze krátká kontrola a vysvětlení chyb.' },
    { phase: 'Produkce', minutes: 8, badge: 'production', title: 'Samostatná práce', desc: 'Žáci zkouší podobnou úlohu samostatně. Učitel obchází třídu a pomáhá individuálně.' },
    { phase: 'Reflexe', minutes: 5, badge: 'reflection', title: 'Co si odnášíme', desc: 'Tři věci, které jsem se naučil/a. Zápis do sešitu, dva žáci sdílí nahlas.' },
  ],
  practice: [
    { phase: 'Aktivace', minutes: 5, badge: 'engagement', title: 'Krátká rozcvička', desc: 'Pět rychlých otázek na zopakování klíčových pojmů z minulé hodiny.' },
    { phase: 'Výklad', minutes: 8, badge: 'concept', title: 'Připomenutí postupu', desc: 'Krátké shrnutí postupu řešení s jedním vzorovým příkladem na tabuli.' },
    { phase: 'Procvičování', minutes: 18, badge: 'practice', title: 'Pracovní list', desc: 'Žáci pracují ve dvojicích na pracovním listu se 6 úlohami od jednodušších po složitější.' },
    { phase: 'Produkce', minutes: 9, badge: 'production', title: 'Vlastní úloha', desc: 'Každý žák vymyslí jednu úlohu pro spolužáka a vyřeší si vzájemně.' },
    { phase: 'Reflexe', minutes: 5, badge: 'reflection', title: 'Sebehodnocení', desc: 'Žáci na škále 1–5 ohodnotí, jak jistě téma zvládají, a označí, co potřebují více procvičit.' },
  ],
  review: [
    { phase: 'Aktivace', minutes: 6, badge: 'engagement', title: 'Myšlenková mapa', desc: 'Žáci ve skupinách tvoří myšlenkovou mapu k tématu. Každá skupina prezentuje hlavní větve.' },
    { phase: 'Výklad', minutes: 10, badge: 'concept', title: 'Společné shrnutí', desc: 'Učitel společně se třídou doplňuje a strukturuje pojmy z myšlenkových map na tabuli.' },
    { phase: 'Procvičování', minutes: 14, badge: 'practice', title: 'Soutěž ve skupinách', desc: 'Kvízová soutěž — 3 kola otázek od jednoduchých po složité. Skupiny sbírají body.' },
    { phase: 'Produkce', minutes: 10, badge: 'production', title: 'Mini-projekt', desc: 'Skupiny tvoří krátký výstup (plakát, scénka, infografika) shrnující hlavní myšlenku.' },
    { phase: 'Reflexe', minutes: 5, badge: 'reflection', title: 'Výstupní lístek', desc: 'Co bylo nejdůležitější? Co mě překvapilo? Žáci píší na lísteček a odevzdávají při odchodu.' },
  ],
};

const COMPETENCIES_BY_SUBJECT = {
  cestina: ['Komunikativní', 'K učení', 'Sociální', 'Občanská'],
  matematika: ['K řešení problémů', 'K učení', 'Pracovní', 'Komunikativní'],
  dejepis: ['Občanská', 'K učení', 'Komunikativní', 'Sociální'],
  obcanka: ['Občanská', 'Sociální', 'Komunikativní', 'K řešení problémů'],
  prirodopis: ['K řešení problémů', 'K učení', 'Pracovní', 'Občanská'],
};

const ACTIVITIES = [
  { id: 'a1', title: 'Slovní druhy — pracovní list', type: 'Worksheet', subject: 'cestina', desc: 'Třídění 30 slov do tabulky podle slovních druhů. Vhodné pro samostatnou práci nebo dvojice.', duration: '20 min' },
  { id: 'a2', title: 'Zlomky v praxi — Pizza party', type: 'Game', subject: 'matematika', desc: 'Skupinová hra, kde žáci dělí virtuální pizzy mezi spolužáky a počítají zbylé části.', duration: '25 min' },
  { id: 'a3', title: 'Středověký rytíř — chatbot', type: 'Chatbot', subject: 'dejepis', desc: 'Žáci si povídají s AI postavou rytíře z 13. století. Cíl: zjistit denní rutinu, výzbroj, hodnoty.', duration: '15 min' },
  { id: 'a4', title: 'Můj region a jeho problémy', type: 'Discussion', subject: 'obcanka', desc: 'Strukturovaná diskuze o lokálních tématech. Žáci formulují problém a navrhují řešení.', duration: '30 min' },
  { id: 'a5', title: 'Klíčení semen — pozorování', type: 'Worksheet', subject: 'prirodopis', desc: 'Týdenní pozorovací deník s nákresy fází klíčení fazole. Pracovní list pro každý den.', duration: '10 min/den' },
  { id: 'a6', title: 'Stavba věty — Detektiv', type: 'Game', subject: 'cestina', desc: 'Žáci v rolích detektivů hledají podmět a přísudek v "podezřelých" větách.', duration: '20 min' },
  { id: 'a7', title: 'Procenta v reklamě', type: 'Discussion', subject: 'matematika', desc: 'Analýza reálných reklam — jak jsou prezentovány slevy a co znamenají v praxi.', duration: '25 min' },
  { id: 'a8', title: 'Husitský kazatel — chatbot', type: 'Chatbot', subject: 'dejepis', desc: 'Rozhovor s AI postavou husitského kazatele. Žáci hledají argumenty pro reformu církve.', duration: '15 min' },
];

const PRESENTATIONS = [
  { id: 'p1', title: 'Vyjmenovaná slova po B', subject: 'cestina', date: '2026-04-28', slides: 18 },
  { id: 'p2', title: 'Desetinná čísla — úvod', subject: 'matematika', date: '2026-04-25', slides: 22 },
  { id: 'p3', title: 'Přemyslovci — vznik státu', subject: 'dejepis', date: '2026-04-21', slides: 24 },
  { id: 'p4', title: 'Lidská práva pro 6. třídu', subject: 'obcanka', date: '2026-04-18', slides: 16 },
  { id: 'p5', title: 'Bezobratlí živočichové', subject: 'prirodopis', date: '2026-04-14', slides: 28 },
  { id: 'p6', title: 'Slovní druhy — opakování', subject: 'cestina', date: '2026-04-09', slides: 14 },
];

const QUIZZES = [
  { id: 'q1', title: 'Vyjmenovaná slova po B', subject: 'cestina', questions: 12, lastUsed: 'včera' },
  { id: 'q2', title: 'Sčítání desetinných čísel', subject: 'matematika', questions: 15, lastUsed: 'před 3 dny' },
  { id: 'q3', title: 'Přemyslovci — kontrola', subject: 'dejepis', questions: 10, lastUsed: 'minulý týden' },
  { id: 'q4', title: 'Ústava ČR — základy', subject: 'obcanka', questions: 8, lastUsed: 'před 2 týdny' },
  { id: 'q5', title: 'Hmyz — určování', subject: 'prirodopis', questions: 20, lastUsed: 'minulý měsíc' },
  { id: 'q6', title: 'Skladba věty', subject: 'cestina', questions: 14, lastUsed: 'včera' },
];

// 6.A — třídní roster
const STUDENTS = [
  { id: 's1', name: 'Tomáš Novák', initials: 'TN', comp: { kom: 78, kri: 65, spo: 82, gra: 71 } },
  { id: 's2', name: 'Eliška Horáková', initials: 'EH', comp: { kom: 92, kri: 88, spo: 85, gra: 90 } },
  { id: 's3', name: 'Jakub Dvořák', initials: 'JD', comp: { kom: 54, kri: 72, spo: 60, gra: 58 } },
  { id: 's4', name: 'Adéla Svobodová', initials: 'AS', comp: { kom: 81, kri: 79, spo: 88, gra: 76 } },
  { id: 's5', name: 'Matyáš Černý', initials: 'MČ', comp: { kom: 67, kri: 84, spo: 55, gra: 72 } },
  { id: 's6', name: 'Karolína Procházková', initials: 'KP', comp: { kom: 88, kri: 76, spo: 92, gra: 84 } },
  { id: 's7', name: 'Vojtěch Kučera', initials: 'VK', comp: { kom: 49, kri: 58, spo: 64, gra: 52 } },
  { id: 's8', name: 'Anežka Veselá', initials: 'AV', comp: { kom: 75, kri: 82, spo: 71, gra: 79 } },
  { id: 's9', name: 'Filip Marek', initials: 'FM', comp: { kom: 71, kri: 69, spo: 73, gra: 68 } },
  { id: 's10', name: 'Barbora Krejčí', initials: 'BK', comp: { kom: 86, kri: 91, spo: 78, gra: 88 } },
  { id: 's11', name: 'Štěpán Pokorný', initials: 'ŠP', comp: { kom: 62, kri: 70, spo: 68, gra: 65 } },
  { id: 's12', name: 'Tereza Růžičková', initials: 'TR', comp: { kom: 79, kri: 74, spo: 81, gra: 77 } },
  { id: 's13', name: 'Ondřej Beneš', initials: 'OB', comp: { kom: 58, kri: 63, spo: 70, gra: 61 } },
  { id: 's14', name: 'Klára Urbanová', initials: 'KU', comp: { kom: 84, kri: 80, spo: 86, gra: 82 } },
  { id: 's15', name: 'Daniel Hruška', initials: 'DH', comp: { kom: 70, kri: 77, spo: 64, gra: 73 } },
  { id: 's16', name: 'Natálie Šťastná', initials: 'NŠ', comp: { kom: 90, kri: 85, spo: 89, gra: 86 } },
];

// Recent activity history per student (id-keyed)
const STUDENT_HISTORY = {
  s1: [
    { date: '6. 5.', kind: 'quiz', label: 'Vyjmenovaná slova po B', score: '9/12', subject: 'cestina' },
    { date: '4. 5.', kind: 'worksheet', label: 'Slovní druhy — list', score: 'splněno', subject: 'cestina' },
    { date: '2. 5.', kind: 'quiz', label: 'Sčítání desetinných čísel', score: '11/15', subject: 'matematika' },
    { date: '29. 4.', kind: 'discussion', label: 'Můj region a jeho problémy', score: 'aktivní účast', subject: 'obcanka' },
  ],
  default: [
    { date: '6. 5.', kind: 'quiz', label: 'Vyjmenovaná slova po B', score: '10/12', subject: 'cestina' },
    { date: '4. 5.', kind: 'worksheet', label: 'Klíčení semen — den 3', score: 'splněno', subject: 'prirodopis' },
    { date: '2. 5.', kind: 'quiz', label: 'Sčítání desetinných čísel', score: '13/15', subject: 'matematika' },
    { date: '29. 4.', kind: 'chatbot', label: 'Středověký rytíř', score: 'dokončeno', subject: 'dejepis' },
  ],
};

const COMPETENCIES = [
  { key: 'kom', label: 'Komunikace' },
  { key: 'kri', label: 'Kritické myšlení' },
  { key: 'spo', label: 'Spolupráce' },
  { key: 'gra', label: 'Gramotnost' },
];

// Worksheets — printable materials matched to common 6th-grade topics
const WORKSHEETS = [
  { id: 'w1', title: 'Vyjmenovaná slova po B — doplňování', subject: 'cestina', pages: 2, level: '6. třída', topic: 'vyjmenovaná slova' },
  { id: 'w2', title: 'Slovní druhy — třídění', subject: 'cestina', pages: 3, level: '6. třída', topic: 'slovní druhy' },
  { id: 'w3', title: 'Stavba věty — podmět a přísudek', subject: 'cestina', pages: 2, level: '6. třída', topic: 'stavba věty' },
  { id: 'w4', title: 'Sčítání desetinných čísel — 20 příkladů', subject: 'matematika', pages: 2, level: '6. třída', topic: 'desetinná čísla' },
  { id: 'w5', title: 'Zlomky — krácení a rozšiřování', subject: 'matematika', pages: 3, level: '6. třída', topic: 'zlomky' },
  { id: 'w6', title: 'Procenta v praxi — slovní úlohy', subject: 'matematika', pages: 2, level: '6. třída', topic: 'procenta' },
  { id: 'w7', title: 'Přemyslovci — časová osa', subject: 'dejepis', pages: 2, level: '6. třída', topic: 'přemyslovci' },
  { id: 'w8', title: 'Husitské války — křížovka', subject: 'dejepis', pages: 1, level: '6. třída', topic: 'husité' },
  { id: 'w9', title: 'Lidská práva — případové studie', subject: 'obcanka', pages: 3, level: '6. třída', topic: 'lidská práva' },
  { id: 'w10', title: 'Bezobratlí — určovací klíč', subject: 'prirodopis', pages: 2, level: '6. třída', topic: 'bezobratlí' },
  { id: 'w11', title: 'Hmyz — anatomie', subject: 'prirodopis', pages: 2, level: '6. třída', topic: 'hmyz' },
];

// Material kinds that can be suggested into a lesson phase
// Map phase badge → preferred material kinds (in order)
const PHASE_SUGGESTIONS = {
  engagement: ['discussion', 'chatbot', 'game', 'quiz'],
  concept:    ['presentation', 'worksheet', 'chatbot'],
  practice:   ['worksheet', 'game', 'quiz'],
  production: ['worksheet', 'discussion', 'game'],
  reflection: ['quiz', 'discussion', 'worksheet'],
};

// Aggregate all library materials into one searchable index
function getAllMaterials() {
  return [
    ...ACTIVITIES.map(a => ({
      ...a,
      kind: a.type.toLowerCase(),
      lib: 'activity',
      duration: a.duration,
    })),
    ...WORKSHEETS.map(w => ({
      id: w.id, title: w.title, subject: w.subject, desc: `${w.pages} strany · ${w.level} · pracovní list k tématu „${w.topic}"`,
      kind: 'worksheet', lib: 'worksheet', topic: w.topic, pages: w.pages,
    })),
    ...PRESENTATIONS.map(p => ({
      id: p.id, title: p.title, subject: p.subject, desc: `Prezentace · ${p.slides} slidů`,
      kind: 'presentation', lib: 'presentation', slides: p.slides, date: p.date,
    })),
    ...QUIZZES.map(q => ({
      id: q.id, title: q.title, subject: q.subject, desc: `Kvíz · ${q.questions} otázek · naposledy ${q.lastUsed}`,
      kind: 'quiz', lib: 'quiz', questions: q.questions,
    })),
  ];
}

// Score a material's match against a lesson context (topic words + subject + phase preferences)
function suggestForPhase({ phase, subject, topic, limit = 2 }) {
  const prefs = PHASE_SUGGESTIONS[phase.badge] || [];
  const topicWords = (topic || '').toLowerCase().split(/[\s,.;]+/).filter(w => w.length >= 3);
  const all = getAllMaterials();
  const scored = all.map(m => {
    let score = 0;
    if (m.subject === subject) score += 10;
    const prefIdx = prefs.indexOf(m.kind);
    if (prefIdx >= 0) score += (prefs.length - prefIdx) * 3;
    const hay = `${m.title} ${m.desc || ''} ${m.topic || ''}`.toLowerCase();
    for (const w of topicWords) {
      if (hay.includes(w)) score += 6;
    }
    return { m, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.filter(s => s.score > 0).slice(0, limit).map(s => s.m);
}

// Shared store for user-saved lessons (Moje lekce in Knihovna)
const MyLessonsStore = {
  list: [
    {
      id: 'ml-seed-1',
      topic: 'Vyjmenovaná slova po B',
      subject: 'cestina',
      length: 45,
      focus: 'new',
      frameworkId: 'classic',
      savedAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
      phases: [
        { phase: 'Aktivace', badge: 'engagement', minutes: 7, start: 0, end: 7, title: 'Vstupní otázka', desc: 'Brainstorming ve dvojicích — co už o tématu žáci ví.' },
        { phase: 'Výklad', badge: 'concept', minutes: 13, start: 7, end: 20, title: 'Vysvětlení nového pojmu', desc: 'Stručný výklad s příklady. Žáci si dělají poznámky.' },
        { phase: 'Procvičování', badge: 'practice', minutes: 12, start: 20, end: 32, title: 'Řízené příklady', desc: 'Žáci řeší 4–5 typových úloh společně.' },
        { phase: 'Produkce', badge: 'production', minutes: 8, start: 32, end: 40, title: 'Samostatná práce', desc: 'Žáci zkouší podobnou úlohu samostatně.' },
        { phase: 'Reflexe', badge: 'reflection', minutes: 5, start: 40, end: 45, title: 'Co si odnášíme', desc: 'Tři věci, které jsem se naučil/a.' },
      ],
      attachments: [{ id: 'w1', title: 'Vyjmenovaná slova po B — doplňování', kind: 'worksheet' }],
    },
    {
      id: 'ml-seed-2',
      topic: 'Sčítání desetinných čísel',
      subject: 'matematika',
      length: 45,
      focus: 'practice',
      frameworkId: 'gradual',
      savedAt: Date.now() - 1000 * 60 * 60 * 24 * 12,
      phases: [
        { phase: 'Úvod', badge: 'engagement', minutes: 5, start: 0, end: 5, title: 'Cíl a motivace', desc: 'Jasně formulovat, co se dnes naučíme.' },
        { phase: 'Já modeluji', badge: 'concept', minutes: 10, start: 5, end: 15, title: 'Učitel ukazuje postup', desc: 'Učitel myslí nahlas, demonstruje postup.' },
        { phase: 'Společně', badge: 'practice', minutes: 14, start: 15, end: 29, title: 'Vedená společná práce', desc: 'Třída pracuje společně pod vedením učitele.' },
        { phase: 'Samostatně', badge: 'production', minutes: 12, start: 29, end: 41, title: 'Samostatná aplikace', desc: 'Žáci pracují samostatně nebo ve dvojicích.' },
        { phase: 'Reflexe', badge: 'reflection', minutes: 4, start: 41, end: 45, title: 'Sebehodnocení', desc: 'Co mi šlo? Kde jsem si nebyl/a jistý/á?' },
      ],
      attachments: [{ id: 'w4', title: 'Sčítání desetinných čísel — 20 příkladů', kind: 'worksheet' }, { id: 'q2', title: 'Sčítání desetinných čísel', kind: 'quiz' }],
    },
  ],
  listeners: [],
  add(lesson) {
    this.list = [{ ...lesson, id: 'ml-' + Date.now(), savedAt: Date.now() }, ...this.list];
    this.listeners.forEach(fn => fn(this.list));
  },
  remove(id) {
    this.list = this.list.filter(l => l.id !== id);
    this.listeners.forEach(fn => fn(this.list));
  },
  subscribe(fn) {
    this.listeners.push(fn);
    return () => { this.listeners = this.listeners.filter(f => f !== fn); };
  },
};

function useMyLessons() {
  const [list, setList] = React.useState(MyLessonsStore.list);
  React.useEffect(() => MyLessonsStore.subscribe(setList), []);
  return list;
}

const ACTIVITY_TYPES = ['Worksheet', 'Game', 'Chatbot', 'Discussion'];
const ACTIVITY_TYPE_LABELS = {
  Worksheet: 'Pracovní list',
  Game: 'Hra',
  Chatbot: 'Chatbot',
  Discussion: 'Diskuze',
};

Object.assign(window, {
  SUBJECTS, FOCUS_TYPES, FRAMEWORKS, LESSON_TEMPLATES, COMPETENCIES_BY_SUBJECT,
  ACTIVITIES, WORKSHEETS, PRESENTATIONS, QUIZZES, STUDENTS, STUDENT_HISTORY,
  COMPETENCIES, ACTIVITY_TYPES, ACTIVITY_TYPE_LABELS,
  PHASE_SUGGESTIONS, getAllMaterials, suggestForPhase,
  MyLessonsStore, useMyLessons,
});
