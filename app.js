import { ARTEN, STADIEN, METHODEN, art, spriteSVG, hp, hpFarbe, giessStatus, startIntervall } from './logic.js';

const KEY = 'pflanzen-v1';
const MAX_PROFILE = 3;
const RAEUME = ['Wohnzimmer', 'Küche', 'Schlafzimmer', 'Bad', 'Büro', 'Balkon'];
const $app = document.getElementById('app');

let db = laden();
let ansicht = { name: 'start' };
let meldung = '';

// ---------- Speicher ----------
function laden() {
  try {
    const d = JSON.parse(localStorage.getItem(KEY));
    if (d && Array.isArray(d.profile)) return d;
  } catch {}
  return { aktiv: null, profile: [] };
}
function speichern() {
  try { localStorage.setItem(KEY, JSON.stringify(db)); }
  catch { alert('Speichern fehlgeschlagen! Bitte exportiere deine Daten unter „Optionen“.'); }
}

// ---------- Helfer ----------
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => `&#${c.charCodeAt(0)};`);
const profil = () => db.profile.find(p => p.id === db.aktiv);
const pflanze = id => profil().pflanzen.find(p => p.id === id);
const isoTag = ts => new Date(ts - new Date(ts).getTimezoneOffset() * 60000).toISOString().slice(0, 10);
const datumZuTs = v => (!v || v === isoTag(Date.now()) ? Date.now() : Math.min(Date.now(), new Date(v + 'T12:00').getTime()));
const datumText = ts => new Date(ts).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
const lv = p => p.stadium * 10 + Math.min(9, p.anzahl);

function gehe(name, extra = {}) {
  ansicht = { name, ...extra };
  render();
  scrollTo(0, 0);
}

// ---------- Bausteine ----------
const optionen = (liste, wert) => liste.map(([v, t]) => `<option value="${esc(v)}"${v == wert ? ' selected' : ''}>${esc(t)}</option>`).join('');

function artOptionen(wert) {
  const gruppe = (label, filter) => `<optgroup label="${label}">${optionen(ARTEN.filter(filter).map(a => [a.id, a.name]), wert)}</optgroup>`;
  return gruppe('Aus Früchten', a => a.keimung?.herkunft === 'Frucht')
    + gruppe('Aus der Samentüte', a => a.keimung?.herkunft === 'Tüte')
    + gruppe('Zimmerpflanzen', a => !a.keimung);
}

function kpBalken(p, jetzt) {
  const h = hp(p, jetzt);
  return `<div class="kp"><b>KP</b><div class="balken" role="meter" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(h * 100)}" aria-label="Wasser"><i class="${hpFarbe(h)}" style="width:${h * 100}%"></i></div></div>`;
}

const spriteKlasse = (p, jetzt) => (hpFarbe(hp(p, jetzt)) === 'rot' ? 'durstig' : '');

// ---------- Ansichten ----------
function profilWahl() {
  return `<main class="mitte">
    <div class="box titel"><h1>SYLVA</h1><div class="logo">${spriteSVG(4, art('sonnenblume').farben)}</div></div>
    ${db.profile.length ? `<div class="box"><h2>Wer bist du?</h2>${db.profile.map(p =>
      `<button class="knopf breit" data-a="profil-waehlen" data-id="${esc(p.id)}">▶ ${esc(p.name)}</button>`).join('')}</div>` : ''}
    ${db.profile.length < MAX_PROFILE ? `<form class="box" data-f="profil-neu">
      <h2>${db.profile.length ? 'Neuer Trainer' : 'Willkommen! Wie heißt du?'}</h2>
      <input name="name" required maxlength="20" placeholder="Dein Name" aria-label="Name">
      <button class="knopf breit">Los geht's!</button></form>` : ''}
  </main>`;
}

function kopf(pr) {
  return `<header><span class="logo-text">SYLVA</span>
    <button class="profil-knopf" data-a="profil-wechseln" title="Profil wechseln">👤 ${esc(pr.name)}</button></header>`;
}

function nav() {
  const k = (v, icon, text) => `<button data-a="gehe" data-v="${v}" class="${ansicht.name === v ? 'aktiv' : ''}"><span>${icon}</span>${text}</button>`;
  return `<nav>${k('start', '🏠', 'Garten')}${k('keim', '🌰', 'Keimhilfe')}${k('neu', '➕', 'Neu')}${k('einst', '⚙', 'Optionen')}</nav>`;
}

function start(pr) {
  const jetzt = Date.now();
  if (!pr.pflanzen.length) {
    return `<div class="box"><p>Dein Pflanzen-Dex ist noch leer.</p><p>Fange deine erste Pflanze!</p>
      <button class="knopf breit" data-a="gehe" data-v="neu">➕ Pflanze hinzufügen</button>
      <button class="knopf breit hell" data-a="gehe" data-v="keim">🌰 Etwas aussäen</button></div>`;
  }
  const durstig = pr.pflanzen.filter(p => hpFarbe(hp(p, jetzt)) === 'rot').length;
  const raeume = [...pr.raeume, ...new Set(pr.pflanzen.map(p => p.raum).filter(r => !pr.raeume.includes(r)))];
  const bereiche = raeume.map(raum => {
    const liste = pr.pflanzen.filter(p => p.raum === raum).sort((a, b) => hp(a, jetzt) - hp(b, jetzt));
    if (!liste.length) return '';
    return `<section><h2>${esc(raum)} <small>(${liste.length})</small></h2><div class="raster">${liste.map(p => `
      <article class="karte ${hpFarbe(hp(p, jetzt))}" data-a="oeffnen" data-id="${esc(p.id)}" tabindex="0">
        <div class="${spriteKlasse(p, jetzt)}">${spriteSVG(p.stadium, art(p.art).farben)}</div>
        <div class="karte-text"><strong>${esc(p.name)}</strong><span>Lv.${lv(p)} · ${STADIEN[p.stadium]}</span>
          ${kpBalken(p, jetzt)}<span class="status">${giessStatus(p, jetzt)}</span></div>
        <button class="knopf klein" data-a="giessen" data-id="${esc(p.id)}" aria-label="${esc(p.name)} gießen">💧</button>
      </article>`).join('')}</div></section>`;
  }).join('');
  return `<div class="box banner ${durstig ? 'warn' : ''}">${durstig
    ? `⚠ ${durstig} ${durstig === 1 ? 'Pflanze hat' : 'Pflanzen haben'} Durst!`
    : `✓ Alle ${pr.pflanzen.length} Pflanzen sind fit!`}</div>${bereiche}`;
}

function pflanzeAnsicht(pr) {
  const p = pflanze(ansicht.id);
  if (!p) return start(pr);
  const jetzt = Date.now(), a = art(p.art);
  return `<button class="zurueck" data-a="gehe" data-v="start">◀ Garten</button>
    <div class="box detail">
      <div class="buehne ${spriteKlasse(p, jetzt)} ${ansicht.evo ? 'evo' : ''}">${spriteSVG(p.stadium, a.farben)}</div>
      <h1>${esc(p.name)} <small>Lv.${lv(p)}</small></h1>
      ${kpBalken(p, jetzt)}<p class="status">${giessStatus(p, jetzt)}</p>
      <div class="knoepfe">
        <button class="knopf" data-a="giessen" data-id="${esc(p.id)}">💧 Gießen</button>
        ${p.stadium < STADIEN.length - 1 ? `<button class="knopf gold" data-a="entwickeln" data-id="${esc(p.id)}">✨ Entwickeln</button>` : ''}
      </div>
      <dl>
        <dt>Art</dt><dd>${esc(a.name)}</dd>
        <dt>Raum</dt><dd>${esc(p.raum)}</dd>
        <dt>Stadium</dt><dd>${STADIEN[p.stadium]} (${p.stadium + 1}/${STADIEN.length})</dd>
        <dt>Gießen</dt><dd>alle ${p.intervall} Tage</dd>
        <dt>Zuletzt</dt><dd>${datumText(p.gegossen)}</dd>
        <dt>Gegossen</dt><dd>${p.anzahl}×</dd>
        <dt>Dabei seit</dt><dd>${datumText(p.erstellt)}</dd>
      </dl>
      ${a.keimung && p.stadium <= 1 ? `<button class="knopf breit hell" data-a="gehe" data-v="keim" data-offen="${a.id}">🌰 Keimhilfe für ${esc(a.name)}</button>` : ''}
    </div>
    <details class="box"><summary>✎ Bearbeiten</summary>
      <form data-f="pflanze-speichern" data-id="${esc(p.id)}">${pflanzeFelder(pr, p)}
        <button class="knopf breit">Speichern</button></form>
      <button class="knopf breit rot" data-a="loeschen" data-id="${esc(p.id)}">🗑 Pflanze freilassen (löschen)</button>
    </details>`;
}

function pflanzeFelder(pr, p) {
  return `<label>Name<input name="name" maxlength="30" value="${esc(p.name ?? '')}" placeholder="z. B. Bernd"></label>
    <label>Art<select name="art">${artOptionen(p.art)}</select></label>
    <label>Raum<select name="raum">${optionen(pr.raeume.map(r => [r, r]), p.raum)}</select></label>
    <label>Stadium<select name="stadium">${optionen(STADIEN.map((s, i) => [i, s]), p.stadium)}</select></label>
    <label>Gießen alle … Tage<input name="intervall" type="number" min="1" max="90" value="${p.intervall ?? ''}" placeholder="automatisch je nach Art"></label>
    <label>Zuletzt gegossen<input name="gegossen" type="date" max="${isoTag(Date.now())}" value="${isoTag(p.gegossen ?? Date.now())}"></label>`;
}

function neu(pr) {
  const vorlage = { art: ansicht.art || 'monstera', stadium: ansicht.art ? 0 : 3, raum: pr.raeume[0] };
  return `<form class="box" data-f="pflanze-neu"><h1>Neue Pflanze</h1>${pflanzeFelder(pr, vorlage)}
    <button class="knopf breit">➕ Hinzufügen</button></form>`;
}

function keim() {
  const filter = ansicht.filter || 'alle';
  const liste = ARTEN.filter(a => a.keimung && (filter === 'alle' || a.keimung.herkunft === filter));
  const tab = (v, t) => `<button class="tab ${filter === v ? 'aktiv' : ''}" data-a="filter" data-v="${v}">${t}</button>`;
  return `<div class="box"><h1>Keimhilfe</h1>
      <p>Woher kommt dein Samen? Tippe auf eine Pflanze für die Anleitung.</p>
      <ul class="legende">
        <li><b>${METHODEN.kalt}</b> Kaltkeimer: braucht einen künstlichen Winter.</li>
        <li><b>${METHODEN.einweichen}</b> Harte Schale: vorher in Wasser legen.</li>
        <li><b>${METHODEN.wasser}</b> Erst Wurzeln im Glas, dann in Erde.</li>
        <li><b>${METHODEN.direkt}</b> Einfach säen, warm und feucht halten.</li>
        <li><b>Lichtkeimer</b> nur andrücken · <b>Dunkelkeimer</b> mit Erde bedecken.</li>
      </ul></div>
    <div class="tabs">${tab('alle', 'Alle')}${tab('Frucht', '🍎 Aus Früchten')}${tab('Tüte', '📦 Samentüte')}</div>
    ${liste.map(a => `<details class="box anleitung" ${ansicht.offen === a.id ? 'open' : ''}>
      <summary>${spriteSVG(1, a.farben)}<span><strong>${esc(a.name)}</strong><br><em>${METHODEN[a.keimung.methode]} · ${a.keimung.dauer}</em></span></summary>
      <p><b>Temperatur:</b> ${a.keimung.temp}<br><b>Dauer:</b> ${a.keimung.dauer}</p>
      <ol>${a.keimung.schritte.map(s => `<li>${s}</li>`).join('')}</ol>
      <p class="tipp">💡 ${a.keimung.tipp}</p>
      <button class="knopf breit" data-a="aussaeen" data-art="${a.id}">🌰 Diesen Samen aussäen</button>
    </details>`).join('')}
    <p class="hinweis">Allgemeine Tipps – jede Sorte ist etwas anders. Mehrere Samen säen erhöht die Chance.</p>`;
}

function einst(pr) {
  return `<div class="box"><h1>Optionen</h1>
      <form data-f="profil-name"><label>Dein Name<input name="name" required maxlength="20" value="${esc(pr.name)}"></label>
        <button class="knopf">Umbenennen</button></form></div>
    <div class="box"><h2>Profile (${db.profile.length}/${MAX_PROFILE})</h2>
      ${db.profile.map(p => `<p>${p.id === pr.id ? '▶' : '·'} ${esc(p.name)} – ${p.pflanzen.length} Pflanzen</p>`).join('')}
      <button class="knopf breit hell" data-a="profil-wechseln">👤 Profil wechseln / hinzufügen</button>
      <button class="knopf breit rot" data-a="profil-loeschen">🗑 Mein Profil löschen</button></div>
    <div class="box"><h2>Räume</h2>
      <ul class="raeume">${pr.raeume.map(r => `<li>${esc(r)} <button class="knopf klein rot" data-a="raum-weg" data-raum="${esc(r)}" aria-label="${esc(r)} entfernen">✕</button></li>`).join('')}</ul>
      <form data-f="raum-neu" class="zeile"><input name="raum" required maxlength="20" placeholder="Neuer Raum" aria-label="Neuer Raum">
        <button class="knopf">➕</button></form></div>
    <div class="box"><h2>Sicherung</h2>
      <p>Deine Daten liegen nur auf diesem Gerät. Exportiere sie ab und zu!</p>
      <button class="knopf breit" data-a="export">⬇ Exportieren (alle Profile)</button>
      <label class="knopf breit hell datei">⬆ Importieren<input type="file" id="import" accept="application/json,.json" hidden></label></div>`;
}

const ANSICHTEN = { start, pflanze: pflanzeAnsicht, neu, keim, einst };

function render() {
  const pr = profil();
  if (!pr) { $app.innerHTML = profilWahl(); return; }
  $app.innerHTML = kopf(pr) + `<main>${meldung ? `<div class="box meldung" role="status">${esc(meldung)}</div>` : ''}${ANSICHTEN[ansicht.name](pr)}</main>` + nav();
  meldung = '';
  ansicht.evo = false;
}

// ---------- Aktionen ----------
const AKTIONEN = {
  gehe: d => gehe(d.v, { offen: d.offen }),
  oeffnen: d => gehe('pflanze', { id: d.id }),
  filter: d => { ansicht.filter = d.v; render(); },
  aussaeen: d => gehe('neu', { art: d.art }),
  'profil-waehlen': d => { db.aktiv = d.id; speichern(); gehe('start'); },
  'profil-wechseln': () => { db.aktiv = null; speichern(); render(); },
  giessen: d => {
    const p = pflanze(d.id);
    p.gegossen = Date.now();
    p.anzahl++;
    meldung = `${p.name} wurde gegossen! Die KP sind wieder voll.`;
    speichern(); render();
  },
  entwickeln: d => {
    const p = pflanze(d.id);
    if (p.stadium === 1 && p.intervall === startIntervall(p.art, 1)) p.intervall = art(p.art).intervall;
    p.stadium++;
    meldung = `Nanu? ${p.name} entwickelt sich … zu ${STADIEN[p.stadium]}!`;
    ansicht.evo = true;
    speichern(); render();
  },
  loeschen: d => {
    const pr = profil(), p = pflanze(d.id);
    if (!confirm(`${p.name} wirklich löschen?`)) return;
    pr.pflanzen = pr.pflanzen.filter(x => x.id !== d.id);
    speichern(); gehe('start');
  },
  'raum-weg': d => {
    const pr = profil();
    if (pr.pflanzen.some(p => p.raum === d.raum)) return alert(`In „${d.raum}“ stehen noch Pflanzen. Verschiebe sie zuerst.`);
    pr.raeume = pr.raeume.filter(r => r !== d.raum);
    speichern(); render();
  },
  'profil-loeschen': () => {
    const pr = profil();
    if (!confirm(`Profil „${pr.name}“ mit ${pr.pflanzen.length} Pflanzen endgültig löschen?`)) return;
    db.profile = db.profile.filter(p => p.id !== pr.id);
    db.aktiv = null;
    speichern(); render();
  },
  export: () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(db, null, 2)], { type: 'application/json' }));
    a.download = `pflanzen-dex-${isoTag(Date.now())}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  },
};

function felderLesen(f, alt = {}) {
  const artId = f.get('art'), stadium = Number(f.get('stadium'));
  const gegossenTag = f.get('gegossen');
  return {
    name: f.get('name').trim() || art(artId).name,
    art: artId,
    raum: f.get('raum'),
    stadium,
    intervall: Number(f.get('intervall')) || startIntervall(artId, stadium),
    gegossen: alt.gegossen && gegossenTag === isoTag(alt.gegossen) ? alt.gegossen : datumZuTs(gegossenTag),
  };
}

const FORMULARE = {
  'profil-neu': f => {
    if (db.profile.length >= MAX_PROFILE) return;
    const p = { id: crypto.randomUUID(), name: f.get('name').trim(), raeume: [...RAEUME], pflanzen: [] };
    db.profile.push(p);
    db.aktiv = p.id;
    speichern(); gehe('start');
  },
  'profil-name': f => { profil().name = f.get('name').trim(); speichern(); meldung = 'Name gespeichert.'; render(); },
  'raum-neu': f => {
    const r = f.get('raum').trim(), pr = profil();
    if (!pr.raeume.includes(r)) pr.raeume.push(r);
    speichern(); render();
  },
  'pflanze-neu': f => {
    const p = { id: crypto.randomUUID(), ...felderLesen(f), anzahl: 0, erstellt: Date.now() };
    profil().pflanzen.push(p);
    meldung = `Du hast ${p.name} gefangen!`;
    speichern(); gehe('start');
  },
  'pflanze-speichern': (f, form) => {
    const p = pflanze(form.dataset.id);
    Object.assign(p, felderLesen(f, p));
    meldung = 'Gespeichert.';
    speichern(); render();
  },
};

// Daten aus Datei kommen von außen: Form prüfen und Zahlen begrenzen
function importieren(datei) {
  if (!datei) return;
  datei.text().then(text => {
    const d = JSON.parse(text);
    if (!d || !Array.isArray(d.profile)) throw new Error('kein Pflanzen-Dex-Export');
    const profile = d.profile.slice(0, MAX_PROFILE).map(p => ({
      id: String(p.id || crypto.randomUUID()),
      name: String(p.name || 'Trainer').slice(0, 20),
      raeume: Array.isArray(p.raeume) ? p.raeume.map(String) : [...RAEUME],
      pflanzen: (Array.isArray(p.pflanzen) ? p.pflanzen : []).map(x => ({
        id: String(x.id || crypto.randomUUID()),
        name: String(x.name || 'Pflanze').slice(0, 30),
        art: art(x.art).id,
        raum: String(x.raum || RAEUME[0]),
        stadium: Math.max(0, Math.min(STADIEN.length - 1, Math.floor(Number(x.stadium)) || 0)),
        intervall: Math.max(1, Math.min(90, Math.floor(Number(x.intervall)) || 7)),
        gegossen: Number(x.gegossen) || Date.now(),
        anzahl: Math.max(0, Math.floor(Number(x.anzahl)) || 0),
        erstellt: Number(x.erstellt) || Date.now(),
      })),
    }));
    if (!confirm(`${profile.length} Profil(e) importieren? Alle aktuellen Daten werden ersetzt.`)) return;
    db = { aktiv: null, profile };
    speichern(); render();
  }).catch(e => alert('Import fehlgeschlagen: ' + e.message));
}

// ---------- Events ----------
$app.addEventListener('click', e => {
  const el = e.target.closest('[data-a]');
  if (el) AKTIONEN[el.dataset.a](el.dataset);
});
$app.addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.matches('article[data-a]')) AKTIONEN.oeffnen(e.target.dataset);
});
$app.addEventListener('submit', e => {
  e.preventDefault();
  FORMULARE[e.target.dataset.f](new FormData(e.target), e.target);
});
$app.addEventListener('change', e => { if (e.target.id === 'import') importieren(e.target.files[0]); });
document.addEventListener('visibilitychange', () => { if (!document.hidden && ansicht.name === 'start') render(); });

navigator.storage?.persist?.();
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');
render();
