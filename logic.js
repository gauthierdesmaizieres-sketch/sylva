// Reine Logik + Daten, ohne DOM – wird von app.js, test.js und make-icons.js genutzt.

export const TAG = 86400000;

export const STADIEN = ['Samen', 'Keimling', 'Jungpflanze', 'Ausgewachsen', 'Blühend'];

export const METHODEN = {
  kalt: '❄ Kühlschrank',
  direkt: '🌱 Direkt in Erde',
  wasser: '💧 Wasserglas',
  einweichen: '🛁 Einweichen',
};

// farben: [Blatt, Blatt dunkel, Blüte/Frucht]
export const ARTEN = [
  // --- Samen aus Früchten ---
  { id: 'avocado', name: 'Avocado', intervall: 5, farben: ['#5fae3c', '#2f6b28', '#7a5230'],
    keimung: { herkunft: 'Frucht', methode: 'wasser', dauer: '2–8 Wochen', temp: '20–25 °C',
      schritte: ['Kern waschen, braune Haut darf bleiben.', 'Drei Zahnstocher seitlich einstecken.', 'Mit der stumpfen Seite nach unten halb ins Wasserglas hängen.', 'Wasser jede Woche wechseln, warm und hell stellen.', 'Wenn Wurzeln ca. 10 cm lang sind: in Erde setzen, Kernspitze schaut raus.'],
      tipp: 'Geduld – manche Kerne brauchen 2 Monate. Bis zur ersten Frucht dauert es viele Jahre.' } },
  { id: 'zitrone', name: 'Zitrone', intervall: 7, farben: ['#4f9e3a', '#285e22', '#f4d23c'],
    keimung: { herkunft: 'Frucht', methode: 'einweichen', dauer: '2–4 Wochen', temp: '20–25 °C',
      schritte: ['Kerne frisch aus der Frucht nehmen und nicht trocknen lassen.', 'Fruchtfleisch abwaschen, über Nacht in lauwarmes Wasser legen.', 'Ca. 1 cm tief in Anzuchterde stecken.', 'Mit Folie oder Glas abdecken, Erde feucht halten.'],
      tipp: 'Kein Kühlschrank nötig. Zitruspflanzen mögen keine Kälte.' } },
  { id: 'orange', name: 'Orange / Mandarine', intervall: 7, farben: ['#4f9e3a', '#285e22', '#f08a24'],
    keimung: { herkunft: 'Frucht', methode: 'einweichen', dauer: '2–4 Wochen', temp: '20–25 °C',
      schritte: ['Kerne frisch entnehmen, gut abwaschen.', 'Über Nacht einweichen.', 'Ca. 1 cm tief in Anzuchterde stecken.', 'Abdecken und warm stellen.'],
      tipp: 'Aus einem Kern wachsen oft mehrere Keimlinge – den kräftigsten behalten.' } },
  { id: 'mango', name: 'Mango', intervall: 6, farben: ['#5aa646', '#2c6326', '#f2a33a'],
    keimung: { herkunft: 'Frucht', methode: 'direkt', dauer: '2–12 Wochen', temp: '24–28 °C',
      schritte: ['Fruchtfleisch vom Stein entfernen und trocknen lassen.', 'Die harte Steinhülle vorsichtig an der Kante aufschneiden.', 'Den bohnenförmigen Kern herausnehmen, 1 Tag einweichen.', '1–2 cm tief in Erde legen, sehr warm stellen (z. B. auf die Heizung).'],
      tipp: 'Wärme ist wichtiger als alles andere. Kein Kühlschrank!' } },
  { id: 'apfel', name: 'Apfel', intervall: 5, farben: ['#5fae3c', '#2f6b28', '#e04a3c'],
    keimung: { herkunft: 'Frucht', methode: 'kalt', dauer: '6–8 Wochen Kälte + 2–4 Wochen', temp: '4 °C, danach 18–20 °C',
      schritte: ['Kerne aus einem reifen Apfel nehmen und abwaschen.', 'In feuchtes Küchenpapier wickeln, in eine Dose legen.', '6–8 Wochen in den Kühlschrank (nicht Gefrierfach).', 'Wöchentlich prüfen, Papier feucht halten.', 'Gekeimte Kerne 1 cm tief in Erde setzen.'],
      tipp: 'Die Kälte simuliert den Winter – ohne sie keimen Apfelkerne kaum.' } },
  { id: 'kirsche', name: 'Kirsche', intervall: 5, farben: ['#5fae3c', '#2f6b28', '#b81e3a'],
    keimung: { herkunft: 'Frucht', methode: 'kalt', dauer: '8–12 Wochen Kälte', temp: '4 °C, danach 18–20 °C',
      schritte: ['Kerne gründlich vom Fruchtfleisch säubern.', 'Ein paar Tage an der Luft trocknen.', 'In feuchtem Sand oder Küchenpapier in einer Dose 8–12 Wochen kühlen.', 'Danach 2–3 cm tief in Erde setzen.'],
      tipp: 'Gut für Pflanzen, die du später nach draußen setzen willst.' } },
  { id: 'pfirsich', name: 'Pfirsich / Pflaume', intervall: 5, farben: ['#5fae3c', '#2f6b28', '#f7a08a'],
    keimung: { herkunft: 'Frucht', methode: 'kalt', dauer: '8–12 Wochen Kälte', temp: '4 °C, danach 18–20 °C',
      schritte: ['Stein säubern und trocknen.', 'Optional: Stein vorsichtig mit dem Nussknacker öffnen, Kern entnehmen.', 'Feucht verpackt 8–12 Wochen in den Kühlschrank.', 'Wenn eine Wurzel erscheint: in Erde setzen.'],
      tipp: 'Ein geknackter Stein keimt deutlich schneller.' } },
  { id: 'dattel', name: 'Dattel', intervall: 10, farben: ['#7fa64a', '#4a6b2a', '#8a5a2a'],
    keimung: { herkunft: 'Frucht', methode: 'einweichen', dauer: '1–3 Monate', temp: '25–30 °C',
      schritte: ['Kern säubern, 1–2 Tage in Wasser einweichen (Wasser täglich wechseln).', 'In feuchtes Küchenpapier in einen Gefrierbeutel legen.', 'Sehr warm und dunkel lagern.', 'Bei sichtbarer Wurzel aufrecht in Erde setzen.'],
      tipp: 'Ungeschwefelte, unbehandelte Datteln verwenden.' } },
  { id: 'papaya', name: 'Papaya', intervall: 4, farben: ['#5aa646', '#2c6326', '#f29a3a'],
    keimung: { herkunft: 'Frucht', methode: 'direkt', dauer: '2–4 Wochen', temp: '25–30 °C',
      schritte: ['Samen aus der Frucht nehmen, die glibberige Hülle abreiben.', 'Kurz trocknen lassen.', '0,5–1 cm tief in Anzuchterde säen.', 'Warm und feucht halten, abdecken.'],
      tipp: 'Mehrere Samen säen – nicht alle keimen.' } },
  { id: 'granatapfel', name: 'Granatapfel', intervall: 6, farben: ['#5fae3c', '#2f6b28', '#d2283c'],
    keimung: { herkunft: 'Frucht', methode: 'direkt', dauer: '2–6 Wochen', temp: '20–25 °C',
      schritte: ['Kerne aus der Frucht lösen, rotes Fruchtfleisch komplett abreiben.', 'Einen Tag trocknen lassen.', 'Ca. 1 cm tief in Erde säen.', 'Hell und warm stellen.'],
      tipp: 'Fruchtfleischreste fördern Schimmel – gründlich säubern.' } },
  { id: 'kiwi', name: 'Kiwi', intervall: 4, farben: ['#6aae3c', '#3a6b28', '#8a6a2a'],
    keimung: { herkunft: 'Frucht', methode: 'kalt', dauer: '2–3 Wochen Kälte + 2–4 Wochen', temp: '4 °C, danach 20–25 °C',
      schritte: ['Fruchtfleisch zerdrücken und die Samen in einem Sieb auswaschen.', 'Auf feuchtem Küchenpapier in einer Dose 2–3 Wochen kühlen.', 'Dann nur auf die Erde streuen und leicht andrücken (Lichtkeimer).', 'Abdecken, warm und hell stellen.'],
      tipp: 'Die Samen sind winzig – nicht mit Erde bedecken.' } },
  { id: 'litschi', name: 'Litschi', intervall: 5, farben: ['#5aa646', '#2c6326', '#e0505a'],
    keimung: { herkunft: 'Frucht', methode: 'direkt', dauer: '1–3 Wochen', temp: '25–30 °C',
      schritte: ['Kern sofort nach dem Essen säubern – er darf nicht austrocknen.', 'Ca. 2 cm tief in feuchte Erde stecken.', 'Sehr warm und feucht halten.'],
      tipp: 'Nur frische Kerne keimen, getrocknete sind nach wenigen Tagen tot.' } },
  { id: 'passionsfrucht', name: 'Passionsfrucht', intervall: 4, farben: ['#5aa646', '#2c6326', '#8a3cb4'],
    keimung: { herkunft: 'Frucht', methode: 'einweichen', dauer: '2–8 Wochen', temp: '22–28 °C',
      schritte: ['Samen vom Fruchtfleisch befreien (im Sieb auswaschen).', '1–2 Tage in lauwarmem Wasser einweichen.', '0,5 cm tief säen, abdecken.', 'Warm und feucht halten.'],
      tipp: 'Wird eine Kletterpflanze – später eine Rankhilfe geben.' } },
  { id: 'ananas', name: 'Ananas (Strunk)', intervall: 10, farben: ['#6aa64a', '#3a6b2a', '#f2c23a'],
    keimung: { herkunft: 'Frucht', methode: 'wasser', dauer: '3–6 Wochen bis Wurzeln', temp: '22–26 °C',
      schritte: ['Blattschopf abdrehen, Fruchtfleisch komplett entfernen.', 'Untere Blätter abzupfen, 1–2 Tage trocknen lassen.', 'Den Strunk ins Wasserglas stellen, Wasser alle paar Tage wechseln.', 'Bei 2–3 cm langen Wurzeln in lockere Erde pflanzen.'],
      tipp: 'Kein Samen, sondern der Blattschopf – klappt trotzdem!' } },
  { id: 'tomate', name: 'Tomate', intervall: 2, farben: ['#5fae3c', '#2f6b28', '#e8302a'],
    keimung: { herkunft: 'Frucht', methode: 'direkt', dauer: '1–2 Wochen', temp: '20–24 °C',
      schritte: ['Samen mit Gel aus einer reifen Tomate nehmen.', 'In einem Sieb auswaschen und auf Papier trocknen lassen.', '0,5 cm tief in Anzuchterde säen.', 'Hell und warm stellen, feucht halten.'],
      tipp: 'Samen von Hybridsorten (F1) aus dem Supermarkt geben oft andere Tomaten.' } },
  { id: 'chili', name: 'Chili / Paprika', intervall: 3, farben: ['#5fae3c', '#2f6b28', '#e8302a'],
    keimung: { herkunft: 'Frucht', methode: 'direkt', dauer: '1–3 Wochen', temp: '25–28 °C',
      schritte: ['Samen aus einer reifen Schote nehmen und trocknen.', 'Optional: 12 h in lauwarmem Kamillentee einweichen.', '0,5 cm tief säen.', 'Sehr warm halten (Heizung, Fensterbank über Heizkörper).'],
      tipp: 'Unter 20 °C keimen Chilis kaum.' } },
  { id: 'erdbeere', name: 'Erdbeere', intervall: 3, farben: ['#5fae3c', '#2f6b28', '#e8303c'],
    keimung: { herkunft: 'Frucht', methode: 'kalt', dauer: '2–4 Wochen Kälte + 2–4 Wochen', temp: '4 °C, danach 18–20 °C',
      schritte: ['Die kleinen Nüsschen von der Oberfläche abschaben und trocknen.', '2–4 Wochen im Kühlschrank lagern.', 'Auf die Erde streuen und nur andrücken (Lichtkeimer).', 'Abdecken, hell und feucht halten.'],
      tipp: 'Einfacher geht es mit Ablegern einer bestehenden Pflanze.' } },

  // --- Samen aus der Tüte ---
  { id: 'basilikum', name: 'Basilikum', intervall: 2, farben: ['#4fb44a', '#2a7028', '#ffffff'],
    keimung: { herkunft: 'Tüte', methode: 'direkt', dauer: '1–2 Wochen', temp: '20–25 °C',
      schritte: ['Samen auf die Erde streuen.', 'Nur andrücken, nicht bedecken (Lichtkeimer).', 'Mit Sprühflasche befeuchten.', 'Hell und warm stellen.'],
      tipp: 'Von unten gießen – Basilikum mag keine nassen Blätter.' } },
  { id: 'sonnenblume', name: 'Sonnenblume', intervall: 2, farben: ['#5fae3c', '#2f6b28', '#f5c518'],
    keimung: { herkunft: 'Tüte', methode: 'direkt', dauer: '1–2 Wochen', temp: '18–22 °C',
      schritte: ['Samen 2 cm tief in Erde stecken.', 'Feucht halten.', 'Sonnig stellen.'],
      tipp: 'Zwergsorten eignen sich für den Topf.' } },
  { id: 'kresse', name: 'Kresse', intervall: 1, farben: ['#6ac44a', '#3a7a28', '#ffffff'],
    keimung: { herkunft: 'Tüte', methode: 'direkt', dauer: '2–3 Tage', temp: '15–22 °C',
      schritte: ['Watte oder Küchenpapier in eine Schale legen und befeuchten.', 'Samen dicht aufstreuen.', 'Täglich befeuchten.', 'Nach ca. 7 Tagen ernten.'],
      tipp: 'Perfekt für den ersten Erfolg – geht immer.' } },
  { id: 'lavendel', name: 'Lavendel', intervall: 7, farben: ['#7aa66a', '#4a6b42', '#9a6ad4'],
    keimung: { herkunft: 'Tüte', methode: 'kalt', dauer: '3–4 Wochen Kälte + 2–4 Wochen', temp: '4 °C, danach 15–20 °C',
      schritte: ['Samen in feuchtem Sand 3–4 Wochen in den Kühlschrank.', 'Auf die Erde streuen, nur andrücken (Lichtkeimer).', 'Hell, nicht zu warm stellen.'],
      tipp: 'Lavendel mag es trocken – später wenig gießen.' } },
  { id: 'petersilie', name: 'Petersilie', intervall: 2, farben: ['#4fb44a', '#2a7028', '#d8f0a0'],
    keimung: { herkunft: 'Tüte', methode: 'einweichen', dauer: '2–4 Wochen', temp: '18–22 °C',
      schritte: ['Samen 24 h in lauwarmem Wasser einweichen.', '1 cm tief säen (Dunkelkeimer).', 'Gleichmäßig feucht halten.'],
      tipp: 'Braucht lange – nicht aufgeben!' } },
  { id: 'schnittlauch', name: 'Schnittlauch', intervall: 2, farben: ['#4fb44a', '#2a7028', '#c87ad4'],
    keimung: { herkunft: 'Tüte', methode: 'direkt', dauer: '1–2 Wochen', temp: '18–20 °C',
      schritte: ['1 cm tief säen und mit Erde bedecken (Dunkelkeimer).', 'Feucht halten.', 'Hell stellen, sobald er keimt.'],
      tipp: 'Regelmäßig schneiden, dann wächst er buschig.' } },
  { id: 'minze', name: 'Minze', intervall: 2, farben: ['#4fc46a', '#2a7a3a', '#c8a0e0'],
    keimung: { herkunft: 'Tüte', methode: 'direkt', dauer: '1–3 Wochen', temp: '18–22 °C',
      schritte: ['Samen auf die Erde streuen, nur andrücken (Lichtkeimer).', 'Abdecken und feucht halten.', 'Hell stellen.'],
      tipp: 'Minze wuchert – lieber im eigenen Topf halten.' } },
  { id: 'kapuzinerkresse', name: 'Kapuzinerkresse', intervall: 2, farben: ['#5fae3c', '#2f6b28', '#f07a1a'],
    keimung: { herkunft: 'Tüte', methode: 'einweichen', dauer: '1–2 Wochen', temp: '18–20 °C',
      schritte: ['Samen 24 h einweichen.', '2 cm tief in Erde stecken (Dunkelkeimer).', 'Feucht halten.'],
      tipp: 'Blüten und Blätter sind essbar.' } },
  { id: 'baerlauch', name: 'Bärlauch', intervall: 3, farben: ['#4fb44a', '#2a7028', '#ffffff'],
    keimung: { herkunft: 'Tüte', methode: 'kalt', dauer: '3 Monate Kälte, dann mehrere Wochen', temp: '0–4 °C',
      schritte: ['Samen in feuchtem Sand verpacken.', '3 Monate in den Kühlschrank (oder im Herbst draußen säen).', 'Danach 1 cm tief säen, schattig halten.'],
      tipp: 'Echter Kaltkeimer – ohne Winter passiert nichts.' } },

  // --- Klassische Zimmerpflanzen (ohne Keimhilfe) ---
  { id: 'monstera', name: 'Monstera', intervall: 7, farben: ['#3a9a3c', '#1e5a22', '#f2e8a0'] },
  { id: 'efeutute', name: 'Efeutute', intervall: 7, farben: ['#6ab43c', '#3a6b22', '#e8e070'] },
  { id: 'kaktus', name: 'Kaktus', intervall: 21, farben: ['#5aa67a', '#2c6346', '#f070b0'] },
  { id: 'sukkulente', name: 'Sukkulente', intervall: 14, farben: ['#8ac0a0', '#4a7a60', '#f0a0a0'] },
  { id: 'bogenhanf', name: 'Bogenhanf', intervall: 21, farben: ['#5a9a4a', '#2a5a2a', '#e8d870'] },
  { id: 'zamioculcas', name: 'Glücksfeder', intervall: 21, farben: ['#3a8a3c', '#1a4a1e', '#2a6a2a'] },
  { id: 'orchidee', name: 'Orchidee', intervall: 7, farben: ['#4a9a4a', '#2a5a2a', '#e070d0'] },
  { id: 'gummibaum', name: 'Gummibaum', intervall: 10, farben: ['#2a7a3a', '#143a1e', '#8a3a3a'] },
  { id: 'gruenlilie', name: 'Grünlilie', intervall: 7, farben: ['#7ac44a', '#3a7a28', '#ffffff'] },
  { id: 'einblatt', name: 'Einblatt', intervall: 5, farben: ['#3a9a3c', '#1e5a22', '#ffffff'] },

  // --- Fleischfressende Pflanzen (Regen- oder destilliertes Wasser, Erde immer feucht) ---
  { id: 'dionaea', name: 'Venusfliegenfalle', intervall: 2, karnivor: true, farben: ['#6ab43c', '#3a6b22', '#d8303a'] },
  { id: 'drosera', name: 'Sonnentau', intervall: 2, karnivor: true, farben: ['#8ab43c', '#4a6b22', '#e04060'] },
  { id: 'sarracenia', name: 'Schlauchpflanze', intervall: 2, karnivor: true, farben: ['#7aa63c', '#7a2a2a', '#e8c840'] },
  { id: 'nepenthes', name: 'Kannenpflanze', intervall: 4, karnivor: true, farben: ['#5aa63c', '#2c6326', '#b8303a'] },
  { id: 'sonstige', name: 'Sonstige', intervall: 7, farben: ['#5fae3c', '#2f6b28', '#f5c518'] },
];

export const art = id => ARTEN.find(a => a.id === id) || ARTEN.find(a => a.id === 'sonstige');

// --- Pixel-Sprites (16×16) ---
// . leer  k Kontur  p/P Topf  s Erde  b/B Samen  w Glanz  g/G Blatt  f Blüte
export const PALETTE = { k: '#2b2b2b', p: '#c8643c', P: '#8c3c28', s: '#5a3a22', b: '#c08848', B: '#6b4423', w: '#e8ffd0' };

const TOPF = [
  '...ssssssssss...',
  '..kkkkkkkkkkkk..',
  '..kppppppppPPk..',
  '...kpppppppPk...',
  '...kpppppppPk...',
  '....kpppppPk....',
  '....kkkkkkkk....',
];
const LEER = '................';
const STIEL = '.......GG.......';

export const SPRITES = [
  // Samen
  [LEER, LEER, LEER, LEER, LEER, LEER,
    '......kkk.......',
    '.....kbwbk......',
    '.....kbbBk......', ...TOPF],
  // Keimling
  [LEER, LEER, LEER, LEER,
    '...GGg....gGG...',
    '...GggG..GggG...',
    '....GggGGggG....',
    STIEL, STIEL, ...TOPF],
  // Jungpflanze
  [LEER,
    '......gg........',
    '.....gggG.......',
    '..GG.GggG.GG....',
    '.GggG.GG.GggG...',
    '.GgggGGGGgggG...',
    '..GgggGGgggG....',
    '....GGGGGG......',
    STIEL, ...TOPF],
  // Ausgewachsen
  ['.....GGGGG......',
    '...GGgggggGG....',
    '..GgggwggggggG..',
    '.GgggggGggggggG.',
    '.GggwgGGGgggwgG.',
    '.GgggggGgggggGG.',
    '..GGgggGGgggGG..',
    '....GGGGGGGG....',
    STIEL, ...TOPF],
  // Blühend
  ['.....GGfGG......',
    '...GGggfggGG....',
    '..GfffggggfggG..',
    '.GgfgggGgggfffG.',
    '.GgggfGGGgggggG.',
    '.GfffggGgggfgGG.',
    '..GGgfgGGgggGG..',
    '....GGGGGGGG....',
    STIEL, ...TOPF],
];

export function pixel(ch, farben) {
  if (ch === 'g') return farben[0];
  if (ch === 'G') return farben[1];
  if (ch === 'f') return farben[2];
  return PALETTE[ch] || null;
}

export function spriteSVG(stadium, farben) {
  let rects = '';
  SPRITES[stadium].forEach((row, y) => [...row].forEach((ch, x) => {
    const c = pixel(ch, farben);
    if (c) rects += `<rect x="${x}" y="${y}" width="1.05" height="1.05" fill="${c}"/>`;
  }));
  return `<svg class="sprite" viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true">${rects}</svg>`;
}

// --- Gieß-Logik ---
export const tageSeit = (ts, jetzt) => (jetzt - ts) / TAG;

// 1 = frisch gegossen, 0 = Gießtag erreicht oder überfällig
export const hp = (p, jetzt) => Math.max(0, Math.min(1, 1 - tageSeit(p.gegossen, jetzt) / p.intervall));

export const hpFarbe = h => (h > 0.5 ? 'gruen' : h > 0.2 ? 'gelb' : 'rot');

const tage = n => `${n} ${n === 1 ? 'Tag' : 'Tagen'}`;

export function giessStatus(p, jetzt) {
  const rest = p.intervall - tageSeit(p.gegossen, jetzt);
  if (rest >= 1) return `Gießen in ${tage(Math.floor(rest))}`;
  if (rest > -1) return 'Heute gießen!';
  return `Seit ${tage(Math.floor(-rest))} überfällig!`;
}

// Samen und Keimlinge feucht halten, danach Intervall der Art
export const startIntervall = (artId, stadium) => (stadium <= 1 ? Math.min(2, art(artId).intervall) : art(artId).intervall);
