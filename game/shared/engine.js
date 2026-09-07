/* ============================================================
   Marx is back – gemeinsame Spielmechanik aller Areale

   Enthält alles, was in jedem Areal gleich ist: Kamera, Bewegung,
   Kollision, Touch-Steuerung, Dialoge, Codex, Aufgaben, Spielstand
   und den Zonen-Editor.

   Ein Areal liefert nur noch seine Inhalte und ruft Spiel.start(...) auf.
   Bewusst als klassisches Skript (kein ES-Modul), damit die Dateien
   auch per Doppelklick ohne Server geöffnet werden können.
   ============================================================ */

const Spiel = (function () {
'use strict';

// ---------- Grundzustand ----------
let cfg = null;                 // Konfiguration des laufenden Areals
let STORY = null;               // Fortschrittsobjekt des Areals
let FRAGMENTS = null;           // Begriffe für den Codex
let NPCS = [];
let DIALOGE = {};

let ZOOM_FIX = 1;
let mapW = 0, mapH = 0;
let bgLoaded = false;
let gameStarted = false;

let studentName = '';
let selectedGender = null;
let fortsetzenStand = null;

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let VIEWPORT_W = 0;
let VIEWPORT_H = 0;

const camera = { x: 0, y: 0 };

const player = {
  x: 0, y: 0,
  speed: 220,
  facing: 'front',
  moving: false,
  animTimer: 0,
  animFrame: 0,
  displayHeight: 150
};

const WALK_FRAME_DURATION = 0.18;  // Sekunden je Gehzyklus-Frame
let INTERACT_RADIUS = 150;         // Weltpixel, in denen ein NPC ansprechbar ist

const bgImage = new Image();
const schildImg = new Image();
let schildBereit = false;
schildImg.onload  = () => { schildBereit = true; };
schildImg.onerror = () => { schildBereit = false; };

const sprites = { m: {}, f: {} };
const spriteLoaded = { m: {}, f: {} };
const POSE_KEYS = ['front_idle','front_walk','back_idle','back_walk',
                   'left_idle','left_walk','right_idle','right_walk'];

// ---------- Oberflächen-Elemente ----------
const elDialog     = document.getElementById('dialogBox');
const elPortrait   = document.getElementById('dialogPortrait');
const elDialogName = document.getElementById('dialogName');
const elDialogText = document.getElementById('dialogText');
const elDialogHint = document.getElementById('dialogHint');
const elHint       = document.getElementById('interactHint');
const elGate       = document.getElementById('gateOverlay');
const elGateTitel  = document.querySelector('#gateOverlay h2');
const elGateSub    = document.querySelector('#gateOverlay .gateSub');
const elGateCards  = document.getElementById('gateCards');
const elGateFeed   = document.getElementById('gateFeedback');
const elGateCheck  = document.getElementById('gateCheck');
const elCodex      = document.getElementById('codexOverlay');
const elCodexList  = document.getElementById('codexList');
const elToast      = document.getElementById('toast');
const elRefl       = document.getElementById('reflexionOverlay');
const elReflFrage  = document.getElementById('reflexionFrage');
const elReflText   = document.getElementById('reflexionText');
const elHud        = document.getElementById('hud');
const btnAktion    = document.getElementById('btnAktion');
const btnCodex     = document.getElementById('btnCodex');
const exportOverlay = document.getElementById('exportOverlay');
const exportBox     = document.getElementById('exportBox');

// Touch-Erkennung: echte Touch-Geräte bekommen Joystick und Knöpfe,
// PCs behalten Tastatur und Maus. Beides läuft parallel.
const IST_TOUCH = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;

// ============================================================
//  Canvas und Kamera
// ============================================================

// Auf Displays mit hoher Pixeldichte (devicePixelRatio 2 oder 3 – die
// meisten neueren Geräte) bekommt die Zeichenfläche echte Gerätepixel.
// Gerechnet wird trotzdem in CSS-Pixeln, den Faktor übernimmt die
// Grundtransformation des Kontexts.
function resizeCanvas() {
  VIEWPORT_W = window.innerWidth;
  VIEWPORT_H = window.innerHeight;
  const dpr = window.devicePixelRatio || 1;

  canvas.width  = Math.round(VIEWPORT_W * dpr);
  canvas.height = Math.round(VIEWPORT_H * dpr);
  canvas.style.width  = VIEWPORT_W + 'px';
  canvas.style.height = VIEWPORT_H + 'px';

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
}

function clampCamera() {
  camera.x = Math.max(0, Math.min(camera.x, mapW - VIEWPORT_W));
  camera.y = Math.max(0, Math.min(camera.y, mapH - VIEWPORT_H));
  // Falls die Karte kleiner als der Viewport ist: zentrieren
  if (mapW < VIEWPORT_W) camera.x = -(VIEWPORT_W - mapW) / 2;
  if (mapH < VIEWPORT_H) camera.y = -(VIEWPORT_H - mapH) / 2;
}

function updateCamera() {
  camera.x = player.x - VIEWPORT_W / 2;
  camera.y = player.y - VIEWPORT_H / 2;
  clampCamera();
}

// ============================================================
//  Eingabe: Tastatur und Touch
// ============================================================

const keys = {};
window.addEventListener('keydown', e => keys[(e.key || '').toLowerCase()] = true);
window.addEventListener('keyup',   e => keys[(e.key || '').toLowerCase()] = false);

const STICK_RADIUS = 70;    // Auslenkung bis Vollgas, in CSS-Pixeln
const STICK_TOTZONE = 12;   // darunter gilt der Finger als "nicht bewegt"
let stick = null;           // { id, ox, oy, x, y }

function getInputVector() {
  let dx = 0, dy = 0;
  if (keys['arrowup']    || keys['w']) dy -= 1;
  if (keys['arrowdown']  || keys['s']) dy += 1;
  if (keys['arrowleft']  || keys['a']) dx -= 1;
  if (keys['arrowright'] || keys['d']) dx += 1;

  const len = Math.hypot(dx, dy);
  if (len > 0) return { dx: dx / len, dy: dy / len };

  // Joystick: Richtung aus der Auslenkung, Tempo anteilig bis STICK_RADIUS
  if (stick) {
    const sx = stick.x - stick.ox;
    const sy = stick.y - stick.oy;
    const d = Math.hypot(sx, sy);
    if (d > STICK_TOTZONE) {
      const staerke = Math.min(d, STICK_RADIUS) / STICK_RADIUS;
      return { dx: (sx / d) * staerke, dy: (sy / d) * staerke };
    }
  }
  return { dx: 0, dy: 0 };
}

function canvasPunkt(t) {
  const r = canvas.getBoundingClientRect();
  return { x: t.clientX - r.left, y: t.clientY - r.top };
}

canvas.addEventListener('touchstart', e => {
  e.preventDefault();                 // verhindert Scrollen und Doppeltipp-Zoom
  if (editMode) return;
  if (dialog) { advanceDialog(); return; }
  if (uiBlocking()) return;

  if (!stick) {
    const t = e.changedTouches[0];
    const p = canvasPunkt(t);
    stick = { id: t.identifier, ox: p.x, oy: p.y, x: p.x, y: p.y };
  }
}, { passive: false });

canvas.addEventListener('touchmove', e => {
  e.preventDefault();
  if (!stick) return;
  for (const t of e.changedTouches) {
    if (t.identifier === stick.id) {
      const p = canvasPunkt(t);
      stick.x = p.x; stick.y = p.y;
    }
  }
}, { passive: false });

function touchEnde(e) {
  if (!stick) return;
  for (const t of e.changedTouches) {
    if (t.identifier === stick.id) stick = null;
  }
}
canvas.addEventListener('touchend', touchEnde, { passive: false });
canvas.addEventListener('touchcancel', touchEnde, { passive: false });

canvas.addEventListener('click', () => {
  if (!editMode && dialog) advanceDialog();
});

// ============================================================
//  Kollision
// ============================================================

let zonen = [];   // Polygone in Weltkoordinaten

function pointInPolygon(px, py, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i].x, yi = poly[i].y;
    const xj = poly[j].x, yj = poly[j].y;
    const schneidet = ((yi > py) !== (yj > py)) &&
      (px < (xj - xi) * (py - yi) / (yj - yi) + xi);
    if (schneidet) inside = !inside;
  }
  return inside;
}

function isBlocked(x, y) {
  for (const z of zonen) if (pointInPolygon(x, y, z)) return true;
  return false;
}

// ============================================================
//  Zonen-Editor (F2)
// ============================================================

let editMode = false;
let currentPolygon = [];
let mouseWorld = { x: 0, y: 0 };
const EDIT_PAN_SPEED = 900;

canvas.addEventListener('mousemove', e => {
  // Gerechnet wird in CSS-Pixeln, den devicePixelRatio übernimmt die
  // Grundtransformation des Kontexts (siehe resizeCanvas)
  const rect = canvas.getBoundingClientRect();
  mouseWorld.x = (e.clientX - rect.left) + camera.x;
  mouseWorld.y = (e.clientY - rect.top) + camera.y;
});

canvas.addEventListener('click', () => {
  if (!editMode || !exportOverlay.classList.contains('hidden')) return;
  currentPolygon.push({ x: mouseWorld.x, y: mouseWorld.y });
});

function showExport() {
  // Zurück in AUTHORED_ZOOM-Koordinaten rechnen, damit der eingefügte Text
  // unabhängig vom eingestellten Zoom gültig bleibt
  const inAuthored = zonen.map(poly => poly.map(p => ({
    x: +(p.x / ZOOM_FIX).toFixed(2),
    y: +(p.y / ZOOM_FIX).toFixed(2)
  })));
  exportBox.value = JSON.stringify(inAuthored);
  exportOverlay.classList.remove('hidden');
  exportBox.focus();
  exportBox.select();
}

window.addEventListener('keydown', e => {
  const k = (e.key || '').toLowerCase();

  if (k === 'f2') {
    editMode = !editMode;
    currentPolygon = [];
    canvas.style.cursor = editMode ? 'crosshair' : 'default';
    if (!editMode) exportOverlay.classList.add('hidden');
    e.preventDefault();
    return;
  }
  if (!exportOverlay.classList.contains('hidden')) {
    if (k === 'escape') exportOverlay.classList.add('hidden');
    return;
  }
  if (!editMode) return;

  if (k === 'enter') {
    if (currentPolygon.length >= 3) { zonen.push(currentPolygon); currentPolygon = []; }
  } else if (k === 'backspace') {
    currentPolygon.pop();
  } else if (k === 'z') {
    if (currentPolygon.length > 0) currentPolygon = [];
    else zonen.pop();
  } else if (k === 'c') {
    showExport();
  }
});

// ============================================================
//  Meldungen und Codex
// ============================================================

let toastTimer = null;

function zeigeToast(text) {
  elToast.textContent = text;
  elToast.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => elToast.classList.add('hidden'), 3200);
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

function schalteFragmentFrei(key) {
  if (STORY.fragmente.includes(key)) return;
  STORY.fragmente.push(key);
  ergaenzeGesamtcodex(key, FRAGMENTS[key]);
  zeigeToast('Theoriefragment freigeschaltet: ' + FRAGMENTS[key].title +
             (IST_TOUCH ? '  (Knopf „Codex“)' : '  (C = Codex)'));
  speichereSpielstand();
}

// ---------- Gesamtcodex über alle Areale ----------
// Der Codex soll am Ende der zweiten Doppelstunde alle Begriffe aus allen
// Arealen enthalten – deshalb liegt er arealübergreifend im Gerät und wird
// nach Name gefiltert (mehrere Schülis können dasselbe iPad benutzen).
function ladeGesamtcodex() {
  try { return JSON.parse(localStorage.getItem('marxIsBack.codex') || '[]'); }
  catch (e) { return []; }
}

function ergaenzeGesamtcodex(key, f) {
  try {
    const alle = ladeGesamtcodex();
    if (alle.some(e => e.key === key && e.areal === cfg.areal && e.name === studentName)) return;
    alle.push({
      name: studentName, areal: cfg.areal, arealName: cfg.arealName || ('Areal ' + cfg.areal),
      key: key, title: f.title, kurz: f.kurz, text: f.text, src: f.src
    });
    localStorage.setItem('marxIsBack.codex', JSON.stringify(alle));
  } catch (e) { /* gesperrter Speicher darf nichts anhalten */ }
}

// Bei "Neu beginnen" die Einträge dieses Areals für diese Schüli entfernen,
// damit der Codex nicht doppelt befüllt wird
function bereinigeGesamtcodex() {
  try {
    const rest = ladeGesamtcodex().filter(
      e => !(e.areal === cfg.areal && e.name === studentName));
    localStorage.setItem('marxIsBack.codex', JSON.stringify(rest));
  } catch (e) { /* siehe oben */ }
}

function meineMeinungen() {
  try {
    return JSON.parse(localStorage.getItem('marxIsBack.meinungen') || '[]')
             .filter(m => m.name === studentName);
  } catch (e) { return []; }
}

// Baut den Codex über ALLE bisher gespielten Areale auf.
function codexHtml() {
  const eintraege = ladeGesamtcodex().filter(e => e.name === studentName);
  const meinungen = meineMeinungen();

  if (eintraege.length === 0 && meinungen.length === 0) {
    // Der Codex sammelt über alle Areale hinweg und filtert nach Namen. Wer
    // seinen Namen anders schreibt als vorher, sieht hier nichts – und würde
    // am Ende eine leere Seite abfotografieren. Deshalb steht der Hinweis
    // ausdrücklich hier, mitsamt dem Namen, unter dem gerade gesucht wird.
    return '<div class="codexEmpty">Für <b>' + escapeHtml(studentName) +
           '</b> ist noch nichts gespeichert.<br>' +
           'Wenn du in den Arealen vorher schon Begriffe freigeschaltet hast, ' +
           'hast du deinen Namen dort vielleicht anders geschrieben – ' +
           'schreib ihn genau gleich, dann taucht alles wieder auf.</div>';
  }

  // Ein einziges Raster über alle Areale statt einer langen Spalte mit
  // Zwischenüberschriften: Dreizehn Begriffe mit vollem Text füllten früher
  // drei bis vier iPad-Bildschirme, und der Screenshot am Ende wurde dadurch
  // unbrauchbar. Jetzt trägt jede Karte den Kernsatz; der ausführliche Text
  // steckt aufgeklappt darunter und ist im Screenshot bewusst zugeklappt.
  const nachAreal = (a, b) => a.areal - b.areal;
  let html = '';

  const begriffe = eintraege.slice().sort(nachAreal);
  if (begriffe.length) {
    html += '<div class="codexRaster">';
    for (const f of begriffe) {
      html += '<div class="codexEntry">' +
                '<div class="codexAreal">' +
                  escapeHtml(f.arealName || ('Areal ' + f.areal)) +
                '</div>' +
                '<h3>' + escapeHtml(f.title) + '</h3>' +
                '<p class="codexKurz">' + escapeHtml(f.kurz || f.text) + '</p>' +
                (f.kurz
                  ? '<details><summary>Ausführlich</summary>' +
                    '<p>' + escapeHtml(f.text) + '</p>' +
                    '<span class="codexSrc">' + escapeHtml(f.src) + '</span></details>'
                  : '<span class="codexSrc">' + escapeHtml(f.src) + '</span>') +
              '</div>';
    }
    html += '</div>';
  }

  // Eigene Positionierungen stehen abgesetzt und über die volle Breite –
  // es sind Fließtexte, die sich nicht in eine Rasterkarte zwängen lassen.
  if (meinungen.length) {
    html += '<h3 class="codexAbschnitt">Meine Positionen</h3>';
    for (const m of meinungen.slice().sort(nachAreal)) {
      html += '<div class="codexEntry codexMeinung">' +
                '<div class="codexAreal">Areal ' + escapeHtml(String(m.areal)) + '</div>' +
                '<p class="codexFrage">' + escapeHtml(m.frage) + '</p>' +
                '<p>' + escapeHtml(m.antwort) + '</p>' +
                '<span class="codexSrc">Ungewertet – deine eigene Meinung</span>' +
              '</div>';
    }
  }
  return html;
}

function renderCodex() {
  elCodexList.innerHTML = codexHtml();
}

function toggleCodex() {
  if (elCodex.classList.contains('hidden')) {
    renderCodex();
    elCodex.classList.remove('hidden');
  } else {
    elCodex.classList.add('hidden');
  }
}

// ---------- Spielmenü ----------
// Knopf und Fenster werden hier erzeugt statt in jede der sieben
// Areal-Dateien geschrieben – so bekommt jedes Areal das Menü automatisch.
let elMenu = null, btnMenu = null;

function baueMenu() {
  btnMenu = document.createElement('button');
  btnMenu.id = 'btnMenu';
  btnMenu.className = 'touchBtn';
  btnMenu.textContent = 'Menü';
  btnMenu.classList.add('hidden');
  document.body.appendChild(btnMenu);

  elMenu = document.createElement('div');
  elMenu.id = 'menuOverlay';
  elMenu.className = 'hidden';
  elMenu.innerHTML =
    '<div class="gateInner">' +
      '<h2>Menü</h2>' +
      '<div class="gateSub" id="menuAreal"></div>' +
      '<div class="menuBtns">' +
        '<button class="holz menuBtn" data-tun="weiter">Weiterspielen</button>' +
        '<button class="holz menuBtn" data-tun="neustart">Dieses Areal neu starten</button>' +
        '<button class="holz menuBtn" data-tun="haupt">Zum Hauptmenü</button>' +
      '</div>' +
      '<div class="menuHinweis">„Dieses Areal neu starten" verwirft nur den Fortschritt in ' +
      'diesem einen Areal. Dein Codex und die Ergebnisse der anderen Areale bleiben erhalten.</div>' +
    '</div>';
  document.body.appendChild(elMenu);
  registriereOverlay(elMenu);

  btnMenu.addEventListener('click', () => {
    if (dialog || uiBlocking()) return;
    document.getElementById('menuAreal').textContent = cfg.arealName || '';
    elMenu.classList.remove('hidden');
  });

  elMenu.querySelectorAll('.menuBtn').forEach(b => {
    b.addEventListener('click', () => menuAktion(b.dataset.tun));
  });
}

function menuAktion(was) {
  if (was === 'weiter') {
    elMenu.classList.add('hidden');
    return;
  }
  if (was === 'neustart') {
    // Nur den Spielstand DIESES Areals verwerfen. Der Gesamtcodex und die
    // Ergebnisse bleiben liegen; beim Neustart räumt bereinigeGesamtcodex()
    // die Begriffe dieses Areals ohnehin selbst weg.
    try { localStorage.removeItem(spielstandKey()); } catch (e) { /* egal */ }
    window.location.reload();
    return;
  }
  if (was === 'haupt') {
    speichereSpielstand();
    window.location.href = '../../index.html';
  }
}

// ============================================================
//  Dialoge
// ============================================================

let dialog = null;   // { npc, lines, i, after }

// Arealeigene Overlays (z. B. das Schicht-Minispiel in der Fabrik) melden
// sich hier an, damit die Figur stillsteht, solange sie offen sind.
const extraOverlays = [];
function registriereOverlay(el) { if (el) extraOverlays.push(el); }

function uiBlocking() {
  if (!elDialog.classList.contains('hidden')) return true;
  if (!elGate.classList.contains('hidden')) return true;
  if (!elCodex.classList.contains('hidden')) return true;
  if (!elRefl.classList.contains('hidden')) return true;
  for (const el of extraOverlays) {
    if (!el.classList.contains('hidden')) return true;
  }
  return false;
}

function starteDialog(npc) {
  stick = null;   // Joystick loslassen, sonst läuft die Figur nach dem Dialog weiter
  const d = DIALOGE[npc.id]();
  dialog = { npc: npc, lines: d.lines, i: 0, after: d.after };

  elDialogName.textContent = npc.name;
  zeigeDialogBild(npc);
  elDialog.classList.remove('hidden');
  elHint.classList.add('hidden');
  zeigeDialogZeile();
}

// Orte (Webstuhl, Tür, Tor) haben kein eigenes Bild: Der Gegenstand steckt
// schon im Hintergrund. Statt eines leeren Rahmens zeigen wir deshalb den
// Ausschnitt des Hintergrundbildes rund um den Interaktionspunkt.
function zeigeDialogBild(npc) {
  const ortBild = holeOrtBild();
  if (npc.loaded) {
    ortBild.classList.add('hidden');
    elPortrait.classList.remove('hidden');
    elPortrait.src = npc.img.src;
    elPortrait.style.background = 'transparent';
    return;
  }
  const aus = ortAusschnitt(npc);
  if (!aus) {
    // Weder Figur noch Hintergrund: lieber gar kein Kästchen als ein leeres
    elPortrait.classList.add('hidden');
    ortBild.classList.add('hidden');
    return;
  }
  elPortrait.classList.add('hidden');
  ortBild.classList.remove('hidden');
  const kante = ortBild.offsetWidth || 72;
  const f = kante / aus.groesse;
  ortBild.style.backgroundImage = 'url("' + cfg.hintergrund + '")';
  ortBild.style.backgroundSize =
    Math.round(bgImage.naturalWidth * f) + 'px ' + Math.round(bgImage.naturalHeight * f) + 'px';
  ortBild.style.backgroundPosition =
    Math.round(-aus.x * f) + 'px ' + Math.round(-aus.y * f) + 'px';
}

function holeOrtBild() {
  let el = document.getElementById('dialogOrt');
  if (!el) {
    el = document.createElement('div');
    el.id = 'dialogOrt';
    el.className = 'hidden';
    elPortrait.parentNode.insertBefore(el, elPortrait);
  }
  return el;
}

// Quadratischer Ausschnitt in Bildpixeln des Hintergrunds. Ohne Angabe wird er
// aus dem Interaktionspunkt abgeleitet: Der Punkt liegt am Fuß des Gegenstands,
// also sitzt er im unteren Viertel des Ausschnitts. Steht der Gegenstand weiter
// weg – eine Tür an der Wand, vor der man auf dem Boden steht –, gibt der NPC
// die Bildmitte selbst an:  miniatur: { x: 1400, y: 200, groesse: 400 }
function ortAusschnitt(npc) {
  if (!bgLoaded) return null;
  const m = npc.miniatur || {};
  const groesse = Math.min(m.groesse || 420, bgImage.naturalWidth, bgImage.naturalHeight);
  const mitteX = m.x !== undefined ? m.x : npc.x / cfg.worldZoom;
  const obenY  = m.y !== undefined ? m.y - groesse / 2
                                   : npc.y / cfg.worldZoom - groesse * 0.8;
  return {
    groesse: groesse,
    x: Math.max(0, Math.min(mitteX - groesse / 2, bgImage.naturalWidth  - groesse)),
    y: Math.max(0, Math.min(obenY,                bgImage.naturalHeight - groesse))
  };
}

function zeigeDialogZeile() {
  elDialogText.textContent = dialog.lines[dialog.i];
  const letzte = dialog.i === dialog.lines.length - 1;
  const wie = IST_TOUCH ? 'Tippen' : 'Leertaste / E / Klick';
  elDialogHint.textContent = wie + (letzte ? ' – Gespräch beenden' : ' – weiter');
}

function advanceDialog() {
  if (!dialog) return;
  dialog.i++;
  if (dialog.i < dialog.lines.length) {
    zeigeDialogZeile();
  } else {
    const cb = dialog.after;
    dialog = null;
    elDialog.classList.add('hidden');
    if (cb) cb();
    speichereSpielstand();
  }
}

elDialog.addEventListener('click', () => { if (dialog) advanceDialog(); });

function nearestNPC() {
  let best = null, bestD = INTERACT_RADIUS;
  for (const npc of NPCS) {
    const d = Math.hypot(npc.x - player.x, npc.y - player.y);
    if (d < bestD) { bestD = d; best = npc; }
  }
  return best;
}

// ============================================================
//  Aufgaben (Gates)
//  Zwei Bausteine, die jedes Areal mit eigenen Inhalten füllt:
//  eine Zuordnungsaufgabe und eine Quellenanalyse mit Fragen.
// ============================================================

let gateFertig = false;      // true = gelöst, Knopf schließt nur noch
let gateWeiter = null;       // Rückruf nach erfolgreichem Abschluss
let gatePruefen = null;      // aktuelle Prüffunktion

// Fisher-Yates: Reihenfolge bei jedem Durchgang neu mischen, damit die
// Lösung nicht vom Nachbarn abgeschaut oder auswendig gelernt wird
function mischen(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

function gateKopf(titel, hinweis) {
  elGateTitel.textContent = titel;
  elGateSub.innerHTML = hinweis;
  elGateFeed.textContent = '';
  elGate.classList.remove('hidden');
}

elGateCheck.addEventListener('click', () => {
  if (gateFertig) {
    elGate.classList.add('hidden');
    const cb = gateWeiter;
    gateWeiter = null;
    if (cb) cb();
  } else if (gatePruefen) {
    gatePruefen();
  }
});

// ---------- Baustein 1: Zuordnung ----------
let zuKarten = [], zuAntworten = {}, zuVersuche = 0, zuCfg = null;

function oeffneZuordnung(c) {
  zuCfg = c;
  zuKarten = mischen(c.karten);
  zuAntworten = {};
  zuVersuche = 0;
  gateFertig = false;
  gateWeiter = c.onFertig || null;
  gatePruefen = pruefeZuordnung;
  elGateCheck.textContent = 'Antwort prüfen';
  gateKopf(c.titel, c.hinweis);
  renderZuordnung();
}

function renderZuordnung() {
  elGateCards.innerHTML = '';
  zuKarten.forEach((karte, idx) => {
    const card = document.createElement('div');
    card.className = 'gateCard';

    const txt = document.createElement('div');
    txt.className = 'gateCardText';
    txt.textContent = karte.text;

    const btns = document.createElement('div');
    btns.className = 'gateBtns';
    for (const sp of zuCfg.spalten) {
      const b = document.createElement('button');
      b.className = 'gateBtn' + (zuAntworten[idx] === sp.key ? ' sel' : '');
      b.textContent = sp.label;
      b.addEventListener('click', () => { zuAntworten[idx] = sp.key; renderZuordnung(); });
      btns.appendChild(b);
    }
    card.appendChild(txt);
    card.appendChild(btns);
    elGateCards.appendChild(card);
  });
}

function pruefeZuordnung() {
  const offen = zuKarten.length - Object.keys(zuAntworten).length;
  if (offen > 0) {
    elGateFeed.style.color = '#e8b84b';
    elGateFeed.textContent = 'Es fehlen noch ' + offen + ' Zuordnungen.';
    return;
  }
  zuVersuche++;
  let richtig = 0;
  const cards = elGateCards.querySelectorAll('.gateCard');
  zuKarten.forEach((karte, idx) => {
    const ok = zuAntworten[idx] === karte.spalte;
    if (ok) richtig++;
    cards[idx].classList.toggle('right', ok);
    cards[idx].classList.toggle('wrong', !ok);
  });

  if (richtig === zuKarten.length) {
    elGateFeed.style.color = '#8fd08c';
    elGateFeed.textContent = zuCfg.erfolgText || 'Alles richtig zugeordnet.';
    elGateCheck.textContent = zuCfg.weiterText || 'Weiter';
    gateFertig = true;
    if (zuCfg.fragment) schalteFragmentFrei(zuCfg.fragment);
    speichereErgebnis(zuCfg.aufgabe, richtig, zuKarten.length, zuVersuche);
  } else {
    elGateFeed.style.color = '#e0908c';
    elGateFeed.textContent = richtig + ' von ' + zuKarten.length +
      ' richtig. Die rot markierten Einträge gehören zur jeweils anderen Seite – ' +
      'korrigiere sie und prüfe erneut.';
  }
}

// ---------- Baustein 2: Quellenanalyse mit Operatorfragen ----------
let quFragen = [], quAntworten = {}, quVersuche = 0, quCfg = null;

function oeffneQuellen(c) {
  quCfg = c;
  quAntworten = {};
  quVersuche = 0;
  gateFertig = false;
  gateWeiter = c.onFertig || null;
  gatePruefen = pruefeQuellen;
  // Fragen und Antwortoptionen mischen
  quFragen = mischen(c.fragen).map(f => {
    const kopie = Object.assign({}, f);
    kopie.optionen = mischen(f.optionen);
    return kopie;
  });
  elGateCheck.textContent = 'Antworten prüfen';
  gateKopf(c.titel, c.hinweis);
  renderQuellen();
}

function renderQuellen() {
  let html = '';
  // Ein Gate kann statt Quellen auch Darstellungen zeigen. Das Wort steht
  // über jedem Kasten und vor jeder Frage – die Unterscheidung Quelle /
  // Darstellung ist Unterrichtsstoff und darf hier nicht verwischt werden.
  const wort = quCfg.bezugWort || 'Quelle';

  for (const q of quCfg.quellen) {
    // Ein einzelner Kasten kann die Beschriftung überschreiben: q.art. Eine
    // eigene Erläuterung darf nicht „Quelle" heißen – das ist genau die
    // Verwechslung, die das Spiel den Schülis austreiben soll. Ein leerer
    // String lässt das Vorwort ganz weg.
    const wortHier = q.art === undefined ? wort : q.art;
    html += '<div class="quelleBox">' +
              '<div class="quelleKopf">' +
                (wortHier ? escapeHtml(wortHier) + ' ' : '') + escapeHtml(q.ref) +
              '</div>';
    // Bildquelle (z. B. eine Grafik) statt oder zusätzlich zum Zitat
    if (q.bild) {
      html += '<img class="quelleBild" src="' + escapeHtml(q.bild) + '" alt="">';
    }
    if (q.zitat) {
      // Zusammenfassungen dürfen nicht wie Zitate aussehen: keine
      // Anführungszeichen, keine Kursive. Sonst hebt die Typografie die
      // Unterscheidung wieder auf, die im Nachweis darunter steht.
      html += q.keinZitat
        ? '<div class="quelleText">' + escapeHtml(q.zitat) + '</div>'
        : '<div class="quelleZitat">„' + escapeHtml(q.zitat) + '“</div>';
    }
    // Stichpunktform: für Darstellungen, die sich nicht als Zitat lesen
    // lassen. Paare aus Stichwort und Erläuterung.
    if (q.punkte) {
      html += '<dl class="quellePunkte">';
      for (const p of q.punkte) {
        html += '<dt>' + escapeHtml(p[0]) + '</dt><dd>' + escapeHtml(p[1]) + '</dd>';
      }
      html += '</dl>';
    }
    if (q.bildtext) {
      html += '<div class="quelleBildtext">' + escapeHtml(q.bildtext) + '</div>';
    }
    html += '<div class="quelleNachweis">' + escapeHtml(q.nachweis) + '</div>' +
            '</div>';
  }

  quFragen.forEach((f, fi) => {
    const gewaehlt = quAntworten[fi] || [];
    html += '<div class="frageBlock" data-f="' + fi + '">' +
              '<div class="frageKopf">' + escapeHtml(f.afb) + ' · ' + escapeHtml(f.operator) +
                (f.quelleRef ? ' · zu: ' + escapeHtml(f.quelleRef) : '') + '</div>' +
              '<div class="frageText">' + escapeHtml(f.frage) + '</div>' +
              '<div class="frageOptionen">';
    f.optionen.forEach((opt, oi) => {
      const sel = gewaehlt.indexOf(opt) !== -1 ? ' sel' : '';
      html += '<button class="gateBtn' + sel + '" data-f="' + fi + '" data-o="' + oi + '">' +
                escapeHtml(opt) + '</button>';
    });
    html += '</div></div>';
  });

  elGateCards.innerHTML = html;

  elGateCards.querySelectorAll('button[data-o]').forEach(btn => {
    btn.addEventListener('click', () => {
      const fi = +btn.dataset.f;
      const f = quFragen[fi];
      const opt = f.optionen[+btn.dataset.o];
      let sel = quAntworten[fi] || [];

      if (f.typ === 'eine') {
        sel = [opt];                                 // eine Auswahl ersetzt die vorige
      } else {
        const i = sel.indexOf(opt);
        if (i !== -1) sel = sel.filter(o => o !== opt);
        else if (sel.length < 2) sel = sel.concat([opt]);
        else sel = [sel[1], opt];                    // bei zwei Treffern rutscht die älteste raus
      }
      quAntworten[fi] = sel;
      renderQuellen();
    });
  });
}

function pruefeQuellen() {
  const unvollstaendig = quFragen.filter((f, i) => {
    const sel = quAntworten[i] || [];
    return f.typ === 'zwei' ? sel.length !== 2 : sel.length !== 1;
  }).length;

  if (unvollstaendig > 0) {
    elGateFeed.style.color = '#e8b84b';
    elGateFeed.textContent = unvollstaendig === 1
      ? 'Eine Frage ist noch nicht vollständig beantwortet.'
      : 'Es sind noch ' + unvollstaendig + ' Fragen nicht vollständig beantwortet.';
    return;
  }

  quVersuche++;
  let richtig = 0;
  const bloecke = elGateCards.querySelectorAll('.frageBlock');
  quFragen.forEach((f, i) => {
    const sel  = (quAntworten[i] || []).slice().sort();
    const soll = (f.typ === 'zwei' ? f.richtig.slice() : [f.richtig]).sort();
    const ok = sel.length === soll.length && sel.every((v, k) => v === soll[k]);
    if (ok) richtig++;
    bloecke[i].classList.toggle('right', ok);
    bloecke[i].classList.toggle('wrong', !ok);
  });

  if (richtig === quFragen.length) {
    elGateFeed.style.color = '#8fd08c';
    elGateFeed.textContent = quCfg.erfolgText || 'Alle Fragen richtig.';
    elGateCheck.textContent = quCfg.weiterText || 'Weiter';
    gateFertig = true;
    if (quCfg.fragment) schalteFragmentFrei(quCfg.fragment);
    speichereErgebnis(quCfg.aufgabe, richtig, quFragen.length, quVersuche);
  } else {
    elGateFeed.style.color = '#e0908c';
    elGateFeed.textContent = richtig + ' von ' + quFragen.length +
      ' richtig. Sieh dir die rot markierten Fragen noch einmal an und lies den Text dazu genau.';
  }
}

// ---------- Baustein 3: Reihenfolge ----------
// Für Ursachenketten: Die Schritte werden gemischt angezeigt und mit Pfeilen
// in die richtige Abfolge gebracht. Bewusst mit Knöpfen statt Ziehen –
// Drag-and-drop ist auf dem iPad unzuverlässig.
let reiSchritte = [], reiVersuche = 0, reiCfg = null;

function oeffneReihenfolge(c) {
  reiCfg = c;
  reiVersuche = 0;
  gateFertig = false;
  gateWeiter = c.onFertig || null;
  gatePruefen = pruefeReihenfolge;

  // So lange mischen, bis die Startanordnung nicht zufällig schon stimmt
  do { reiSchritte = mischen(c.schritte); }
  while (c.schritte.length > 2 && reiSchritte.every((s, i) => s === c.schritte[i]));

  elGateCheck.textContent = 'Reihenfolge prüfen';
  gateKopf(c.titel, c.hinweis);
  renderReihenfolge();
}

function renderReihenfolge() {
  elGateCards.innerHTML = '';
  reiSchritte.forEach((text, idx) => {
    const card = document.createElement('div');
    card.className = 'gateCard';

    const nr = document.createElement('div');
    nr.className = 'reiNummer';
    nr.textContent = (idx + 1) + '.';

    const txt = document.createElement('div');
    txt.className = 'gateCardText';
    txt.textContent = text;

    const btns = document.createElement('div');
    btns.className = 'gateBtns';

    const hoch = document.createElement('button');
    hoch.className = 'gateBtn';
    hoch.textContent = '▲';
    hoch.disabled = idx === 0;
    hoch.addEventListener('click', () => tauscheSchritt(idx, idx - 1));

    const runter = document.createElement('button');
    runter.className = 'gateBtn';
    runter.textContent = '▼';
    runter.disabled = idx === reiSchritte.length - 1;
    runter.addEventListener('click', () => tauscheSchritt(idx, idx + 1));

    btns.appendChild(hoch);
    btns.appendChild(runter);
    card.appendChild(nr);
    card.appendChild(txt);
    card.appendChild(btns);
    elGateCards.appendChild(card);
  });
}

function tauscheSchritt(a, b) {
  if (b < 0 || b >= reiSchritte.length) return;
  const t = reiSchritte[a];
  reiSchritte[a] = reiSchritte[b];
  reiSchritte[b] = t;
  renderReihenfolge();
}

function pruefeReihenfolge() {
  reiVersuche++;
  let richtig = 0;
  const karten = elGateCards.querySelectorAll('.gateCard');
  reiSchritte.forEach((s, i) => {
    const ok = s === reiCfg.schritte[i];
    if (ok) richtig++;
    karten[i].classList.toggle('right', ok);
    karten[i].classList.toggle('wrong', !ok);
  });

  if (richtig === reiCfg.schritte.length) {
    elGateFeed.style.color = '#8fd08c';
    elGateFeed.textContent = reiCfg.erfolgText || 'Die Reihenfolge stimmt.';
    elGateCheck.textContent = reiCfg.weiterText || 'Weiter';
    gateFertig = true;
    if (reiCfg.fragment) schalteFragmentFrei(reiCfg.fragment);
    speichereErgebnis(reiCfg.aufgabe, richtig, reiCfg.schritte.length, reiVersuche);
  } else {
    elGateFeed.style.color = '#e0908c';
    elGateFeed.textContent = richtig + ' von ' + reiCfg.schritte.length +
      ' Schritten stehen an der richtigen Stelle. Verschiebe die rot markierten ' +
      'mit den Pfeilen und prüfe erneut.';
  }
}

// ---------- Baustein 4: Reflexion (Freitext, ungewertet) ----------
// Ein Areal kann mehrere Reflexionen stellen. Damit die zweite die erste
// weder überschreibt noch mit deren Text vorbelegt wird, bekommt jede über
// c.feld ihr eigenes Feld im Spielstand. Ohne Angabe bleibt es bei "meinung".
let reflCfg = null;
let reflFeld = 'meinung';

function oeffneReflexion(c) {
  reflCfg = c;
  reflFeld = c.feld || 'meinung';
  elReflFrage.textContent = c.frage;
  elReflText.value = STORY[reflFeld] || '';
  elRefl.classList.remove('hidden');
  elReflText.focus();
}

document.getElementById('reflexionSpeichern').addEventListener('click', () => {
  const text = elReflText.value.trim();
  if (text.length < 15) {
    elReflText.focus();
    zeigeToast('Schreib bitte noch ein, zwei Sätze mehr – es gibt kein Richtig oder Falsch.');
    return;
  }
  STORY[reflFeld] = text;
  STORY[reflFeld + 'Frage'] = reflCfg.frage;
  STORY.reflexionGestellt = true;
  elRefl.classList.add('hidden');
  // Getippte Buchstaben nicht als gedrückte Bewegungstasten hängen lassen
  for (const k in keys) keys[k] = false;
  speichereMeinung(reflCfg.frage, text);
  speichereSpielstand();
  zeigeToast('Deine Position wurde im Codex gespeichert.' +
             (IST_TOUCH ? '  (Knopf „Codex“)' : '  (C = Codex)'));
  if (reflCfg.onFertig) reflCfg.onFertig();
});

// ---------- Abschluss eines Areals ----------
// Zeigt eine screenshot-taugliche Zusammenfassung: Name, Ergebnisse und den
// vollständigen Codex. Von hier geht es ins nächste Areal.
const elAbschluss = document.getElementById('abschlussOverlay');

function oeffneAbschluss(c) {
  const meine = (() => {
    try {
      return JSON.parse(localStorage.getItem('marxIsBack.ergebnisse') || '[]')
               .filter(e => e.name === studentName && e.areal === cfg.areal);
    } catch (e) { return []; }
  })();

  let erg = '';
  if (meine.length) {
    erg = '<ul style="margin:0;padding-left:20px;line-height:1.7">' +
          meine.map(e => '<li>' + escapeHtml(e.aufgabe) + ': <b>' + e.richtig + ' von ' +
                          e.gesamt + '</b> richtig, ' +
                          (e.versuche === 1 ? 'im ersten Versuch' : e.versuche + ' Versuche') +
                          '</li>').join('') +
          '</ul>';
  }

  document.getElementById('abschlussKopf').innerHTML =
    '<h2>' + escapeHtml(c.titel) + '</h2>' +
    '<div class="gateSub">' + escapeHtml(studentName) + '</div>' +
    (c.text ? '<p style="font-size:15px;line-height:1.6">' + escapeHtml(c.text) + '</p>' : '') +
    (erg ? '<div class="kontoBoxAbschluss"><b>Deine Ergebnisse in diesem Areal</b>' + erg + '</div>' : '') +
    '<div class="gateSub" style="margin-top:18px">Wenn du am Ende der Stunde fertig bist: ' +
    'Mach einen Screenshot von diesem Codex und lade ihn in OneNote hoch.</div>';

  document.getElementById('abschlussCodex').innerHTML = codexHtml();

  const btn = document.getElementById('abschlussWeiter');
  if (c.weiterZiel) {
    btn.textContent = c.weiterLabel || 'Weiter';
    btn.classList.remove('hidden');
    btn.onclick = () => { speichereSpielstand(); window.location.href = c.weiterZiel; };
  } else {
    btn.classList.add('hidden');
  }
  document.getElementById('abschlussZurueck').onclick = () => elAbschluss.classList.add('hidden');

  elAbschluss.classList.remove('hidden');
}

if (elAbschluss) registriereOverlay(elAbschluss);

// ============================================================
//  Speichern: Ergebnisse, Meinungen, Spielstand
//  Alles bleibt lokal auf dem Gerät. Punkte und ungewertete
//  Freitexte werden bewusst getrennt abgelegt.
// ============================================================

function speichereErgebnis(aufgabe, richtig, gesamt, versuche) {
  try {
    const key = 'marxIsBack.ergebnisse';
    const alle = JSON.parse(localStorage.getItem(key) || '[]');
    alle.push({
      name: studentName,
      figur: selectedGender === 'f' ? 'weiblich' : 'männlich',
      areal: cfg.areal,
      aufgabe: aufgabe,
      richtig: richtig, gesamt: gesamt, versuche: versuche,
      begriffe: STORY.fragmente.map(k => FRAGMENTS[k].title),
      zeit: new Date().toISOString()
    });
    localStorage.setItem(key, JSON.stringify(alle));
  } catch (e) {
    // Voller oder gesperrter Speicher darf den Spielfluss nicht anhalten
  }
}

function speichereMeinung(frage, text) {
  try {
    const key = 'marxIsBack.meinungen';
    const alle = JSON.parse(localStorage.getItem(key) || '[]');
    alle.push({
      name: studentName,
      areal: cfg.areal,
      frage: frage,
      antwort: text,
      zeit: new Date().toISOString()
    });
    localStorage.setItem(key, JSON.stringify(alle));
  } catch (e) { /* siehe oben */ }
}

function spielstandKey() { return 'marxIsBack.spielstand.areal' + cfg.areal; }

function speichereSpielstand() {
  if (!gameStarted) return;
  try {
    localStorage.setItem(spielstandKey(), JSON.stringify({
      version: 1,
      name: studentName,
      figur: selectedGender,
      story: STORY,
      x: player.x, y: player.y, facing: player.facing,
      zeit: new Date().toISOString()
    }));
  } catch (e) { /* siehe oben */ }
}

function ladeSpielstand() {
  try {
    const roh = localStorage.getItem(spielstandKey());
    if (!roh) return null;
    const s = JSON.parse(roh);
    if (!s || s.version !== 1 || !s.name || !s.figur) return null;
    return s;
  } catch (e) { return null; }
}

// Auf dem iPad kann Safari die Seite jederzeit aus dem Speicher werfen –
// deshalb bei jedem Wegschalten sichern, nicht erst beim Schließen
window.addEventListener('pagehide', speichereSpielstand);
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') speichereSpielstand();
});

// ============================================================
//  Tasten und Touch-Knöpfe im Spiel
// ============================================================

window.addEventListener('keydown', e => {
  if (editMode) return;
  // Im Freitextfeld darf keine Taste eine Spielfunktion auslösen
  if (!elRefl.classList.contains('hidden')) return;

  const k = (e.key || '').toLowerCase();
  const istWeiter = k === ' ' || e.code === 'Space' || k === 'enter' || k === 'e';

  if (!elDialog.classList.contains('hidden')) {
    if (istWeiter) { e.preventDefault(); advanceDialog(); }
    return;
  }
  if (!elGate.classList.contains('hidden')) return;
  if (!elCodex.classList.contains('hidden')) {
    if (k === 'escape' || k === 'c') toggleCodex();
    return;
  }
  if (k === 'e') {
    const npc = nearestNPC();
    if (npc) starteDialog(npc);
  } else if (k === 'c') {
    toggleCodex();
  }
});

if (IST_TOUCH) document.body.classList.add('touch');

btnAktion.addEventListener('click', () => {
  if (dialog) { advanceDialog(); return; }
  if (uiBlocking()) return;
  const npc = nearestNPC();
  if (npc) starteDialog(npc);
});

btnCodex.addEventListener('click', () => {
  if (dialog || !elGate.classList.contains('hidden') ||
      !elRefl.classList.contains('hidden')) return;
  toggleCodex();
});

function updateInteractHint() {
  const blockiert = uiBlocking();
  elHud.style.display = blockiert ? 'none' : '';
  if (IST_TOUCH) btnCodex.classList.toggle('hidden', blockiert);
  // Der Menüknopf ist auf Tastatur wie Touch sichtbar – anders als der
  // Codexknopf, den es am PC nur als Taste C gibt.
  if (btnMenu) btnMenu.classList.toggle('hidden', blockiert || !gameStarted);

  if (blockiert) {
    elHint.classList.add('hidden');
    if (IST_TOUCH) btnAktion.classList.add('hidden');
    return;
  }

  const npc = nearestNPC();
  if (npc) {
    elHint.textContent = IST_TOUCH
      ? 'Tippe auf „Sprechen“ – ' + npc.name
      : 'E  –  mit ' + (npc.dativ || npc.name) + ' sprechen';
    elHint.classList.remove('hidden');
    if (IST_TOUCH) btnAktion.classList.remove('hidden');
  } else {
    elHint.classList.add('hidden');
    if (IST_TOUCH) btnAktion.classList.add('hidden');
  }
}

// ============================================================
//  Spielschleife und Zeichnen
// ============================================================

let lastTime = performance.now();

function update(dt) {
  const inp = getInputVector();
  const dx = inp.dx, dy = inp.dy;

  if (editMode) {
    camera.x += dx * EDIT_PAN_SPEED * dt;
    camera.y += dy * EDIT_PAN_SPEED * dt;
    clampCamera();
    elHint.classList.add('hidden');
    return;
  }

  // Während Dialog, Aufgabe oder Codex offen sind, steht die Figur still
  if (uiBlocking()) {
    player.moving = false;
    player.animFrame = 0;
    player.animTimer = 0;
    updateInteractHint();
    return;
  }

  player.moving = (dx !== 0 || dy !== 0);

  // Blickrichtung: dominante Achse gewinnt, nur bei Bewegung aktualisieren
  if (player.moving) {
    if (Math.abs(dx) > Math.abs(dy)) player.facing = dx > 0 ? 'right' : 'left';
    else                             player.facing = dy > 0 ? 'front' : 'back';
  }

  // Gehanimation: reiner idle/walk-Wechsel. Das ändert NUR animFrame,
  // niemals player.facing – sonst dreht sich die Figur beim Posenwechsel.
  if (player.moving) {
    player.animTimer += dt;
    player.animFrame = Math.floor(player.animTimer / WALK_FRAME_DURATION) % 2;
  } else {
    player.animTimer = 0;
    player.animFrame = 0;
  }

  let nextX = player.x + dx * player.speed * dt;
  let nextY = player.y + dy * player.speed * dt;

  const halbeBreite = player.displayHeight / 2;
  nextX = Math.max(halbeBreite, Math.min(nextX, mapW - halbeBreite));
  nextY = Math.max(player.displayHeight, Math.min(nextY, mapH));

  // Achsenweise Prüfung am Fußpunkt – erlaubt Entlanggleiten an Wänden.
  // Steckt die Figur ausnahmsweise schon in einer Zone, wird die Prüfung
  // ausgesetzt, damit sie herausfinden kann statt gefangen zu sein.
  const stecktFest = isBlocked(player.x, player.y);
  if (stecktFest || !isBlocked(nextX, player.y)) player.x = nextX;
  if (stecktFest || !isBlocked(player.x, nextY)) player.y = nextY;

  updateCamera();
  updateInteractHint();
}

function drawPlayer() {
  const pose = player.facing + (player.animFrame === 1 ? '_walk' : '_idle');
  if (spriteLoaded[selectedGender][pose]) {
    const img = sprites[selectedGender][pose];
    const h = player.displayHeight;
    const w = h * (img.naturalWidth / img.naturalHeight);
    // Figur steht mit den Füßen auf player.x/player.y
    ctx.drawImage(img, player.x - w / 2, player.y - h, w, h);
  } else {
    ctx.beginPath();
    ctx.arc(player.x, player.y - 12, 12, 0, Math.PI * 2);
    ctx.fillStyle = '#ffcc33'; ctx.fill();
    ctx.lineWidth = 3; ctx.strokeStyle = '#7a4a00'; ctx.stroke();
  }
}

function drawNPC(npc) {
  const h = npc.height;

  // Unsichtbarer Interaktionspunkt: Das Objekt selbst steckt schon im
  // Hintergrundbild (z. B. ein Webstuhl). Gezeichnet wird nur eine dezente
  // Markierung am Boden plus die Beschriftung.
  if (npc.unsichtbar) {
    const nah = Math.hypot(npc.x - player.x, npc.y - player.y) < INTERACT_RADIUS;
    ctx.beginPath();
    ctx.ellipse(npc.x, npc.y, 46, 18, 0, 0, Math.PI * 2);
    ctx.lineWidth = 3;
    ctx.setLineDash([9, 7]);
    ctx.strokeStyle = nah ? 'rgba(255,224,138,0.95)' : 'rgba(255,224,138,0.45)';
    ctx.stroke();
    ctx.setLineDash([]);
    zeichneNamensschild(npc, 58);
    return;
  }

  if (npc.loaded) {
    const w = h * (npc.img.naturalWidth / npc.img.naturalHeight);
    ctx.drawImage(npc.img, npc.x - w / 2, npc.y - h, w, h);
  } else {
    // Platzhalter-Silhouette, solange das NPC-Bild noch fehlt
    const w = h * 0.40;
    ctx.fillStyle = npc.color;
    ctx.strokeStyle = '#14141a';
    ctx.lineWidth = 3;
    ctx.fillRect(npc.x - w / 2, npc.y - h * 0.70, w, h * 0.70);
    ctx.strokeRect(npc.x - w / 2, npc.y - h * 0.70, w, h * 0.70);
    ctx.beginPath();
    ctx.arc(npc.x, npc.y - h * 0.82, h * 0.14, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();
  }

  zeichneNamensschild(npc, h);
}

// Holzschild als Hintergrund der Namen. Es wird in drei Teilen gezeichnet:
// linker Beschlag, gedehnte Mitte, rechter Beschlag. Nur die Mitte wird
// gestreckt, damit die Eisenbeschläge bei langen Namen nicht verzerren.
const SCHILD_CAP = 44;    // Breite eines Beschlags in Bildpixeln
const SCHILD_HOEHE = 30;  // Höhe des Schilds auf dem Bildschirm

function zeichneNamensschild(npc, hoehe) {
  ctx.font = 'bold 14px sans-serif';
  ctx.textAlign = 'center';
  const tw = ctx.measureText(npc.name).width;
  const oben = npc.y - hoehe - 34;

  if (schildBereit) {
    const bh = schildImg.naturalHeight;
    const bw = schildImg.naturalWidth;
    const skala = SCHILD_HOEHE / bh;
    const kappe = SCHILD_CAP * skala;
    const innen = Math.max(tw + 16, 30);
    const links = npc.x - (innen + kappe * 2) / 2;

    ctx.drawImage(schildImg, 0, 0, SCHILD_CAP, bh,
                  links, oben, kappe, SCHILD_HOEHE);
    ctx.drawImage(schildImg, SCHILD_CAP, 0, bw - SCHILD_CAP * 2, bh,
                  links + kappe, oben, innen, SCHILD_HOEHE);
    ctx.drawImage(schildImg, bw - SCHILD_CAP, 0, SCHILD_CAP, bh,
                  links + kappe + innen, oben, kappe, SCHILD_HOEHE);

    // Dunkler Rand, damit die Schrift auf dem hellen Holz lesbar bleibt
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(20,16,10,0.85)';
    ctx.strokeText(npc.name, npc.x, oben + SCHILD_HOEHE / 2 + 5);
    ctx.fillStyle = '#f6ecd2';
    ctx.fillText(npc.name, npc.x, oben + SCHILD_HOEHE / 2 + 5);
  } else {
    // Solange das Schild nicht geladen ist: schlichter dunkler Kasten
    ctx.fillStyle = 'rgba(0,0,0,0.68)';
    ctx.fillRect(npc.x - tw / 2 - 9, npc.y - hoehe - 27, tw + 18, 21);
    ctx.fillStyle = '#ffe08a';
    ctx.fillText(npc.name, npc.x, npc.y - hoehe - 11);
  }
}

function drawZonePolygon(poly, fill, stroke) {
  if (poly.length === 0) return;
  ctx.beginPath();
  ctx.moveTo(poly[0].x, poly[0].y);
  for (let i = 1; i < poly.length; i++) ctx.lineTo(poly[i].x, poly[i].y);
  if (poly.length > 2) { ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); }
  ctx.lineWidth = 2; ctx.strokeStyle = stroke; ctx.stroke();
  for (const p of poly) {
    ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = stroke; ctx.fill();
  }
}

function drawStick() {
  if (!stick) return;
  const sx = stick.x - stick.ox, sy = stick.y - stick.oy;
  const d = Math.hypot(sx, sy);
  const f = d > STICK_RADIUS ? STICK_RADIUS / d : 1;

  ctx.beginPath();
  ctx.arc(stick.ox, stick.oy, STICK_RADIUS, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0,0,0,0.28)'; ctx.fill();
  ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(255,224,138,0.55)'; ctx.stroke();

  ctx.beginPath();
  ctx.arc(stick.ox + sx * f, stick.oy + sy * f, 30, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,224,138,0.75)'; ctx.fill();
}

function render() {
  ctx.save();
  ctx.clearRect(0, 0, VIEWPORT_W, VIEWPORT_H);
  ctx.translate(-camera.x, -camera.y);

  ctx.drawImage(bgImage, 0, 0, mapW, mapH);

  // Haken für Dinge, die auf dem Boden liegen und VON den Figuren verdeckt
  // werden – etwa eine Kiste, auf der jemand steht. Das Gegenstück
  // zeichneWelt läuft nach den Figuren und legt sich über sie.
  if (cfg && cfg.zeichneBoden) cfg.zeichneBoden(ctx);

  if (editMode) {
    for (const z of zonen) drawZonePolygon(z, 'rgba(220,40,40,0.28)', 'rgba(220,40,40,0.95)');
    drawZonePolygon(currentPolygon.concat([mouseWorld]), 'rgba(255,220,40,0.18)', 'rgba(255,220,40,0.95)');
  }

  // Figuren nach Fußpunkt sortiert zeichnen, damit weiter hinten stehende
  // von weiter vorne stehenden verdeckt werden
  const drawables = NPCS.map(npc => ({ y: npc.y, draw: () => drawNPC(npc) }));
  drawables.push({ y: player.y, draw: drawPlayer });
  drawables.sort((a, b) => a.y - b.y);
  for (const d of drawables) d.draw();

  // Haken für arealspezifisches Zeichnen in Weltkoordinaten
  if (cfg && cfg.zeichneWelt) cfg.zeichneWelt(ctx);

  ctx.restore();

  if (editMode) {
    ctx.fillStyle = 'rgba(0,0,0,0.65)';
    ctx.fillRect(10, VIEWPORT_H - 132, 460, 122);
    ctx.fillStyle = '#fff';
    ctx.font = '13px sans-serif';
    ctx.textAlign = 'left';
    const zeilen = [
      'ZONEN-EDITOR — F2 zum Verlassen',
      'Linksklick: Punkt setzen   Enter: Polygon abschließen',
      'Backspace: letzten Punkt entfernen   Z: zurücknehmen',
      'C: Export-Text anzeigen (zum Kopieren in die Zonen-Datei)',
      'Polygone: ' + zonen.length + '   aktuelle Punkte: ' + currentPolygon.length
    ];
    zeilen.forEach((z, i) => ctx.fillText(z, 22, VIEWPORT_H - 106 + i * 20));
  }

  drawStick();
}

function loop(now) {
  const dt = Math.min((now - lastTime) / 1000, 0.05);  // gegen Tab-Wechsel-Sprünge
  lastTime = now;
  update(dt);
  render();
  requestAnimationFrame(loop);
}

// ============================================================
//  Startbildschirm und Initialisierung
// ============================================================

let elNameInput, elNameFehler, elOptionen;

function nameGesetzt() { return elNameInput.value.trim().length > 0; }

function pruefeName() {
  elOptionen.classList.toggle('gesperrt', !nameGesetzt());
  if (nameGesetzt()) elNameFehler.classList.remove('an');
}

function starteSpiel() {
  if (!bgLoaded || !selectedGender || gameStarted) return;
  gameStarted = true;

  if (fortsetzenStand) {
    Object.assign(STORY, fortsetzenStand.story);
    player.x = fortsetzenStand.x;
    player.y = fortsetzenStand.y;
    player.facing = fortsetzenStand.facing || 'front';
    fortsetzenStand = null;
    updateCamera();
    zeigeToast('Willkommen zurück, ' + studentName + '. Es geht weiter, wo du aufgehört hast.');
  } else {
    bereinigeGesamtcodex();     // alte Einträge dieses Areals verwerfen
    player.x = cfg.startpunkt.x * ZOOM_FIX;
    player.y = cfg.startpunkt.y * ZOOM_FIX;
    updateCamera();
    zeigeToast(IST_TOUCH ? cfg.startHinweisTouch : cfg.startHinweisTastatur);
  }

  speichereSpielstand();
  requestAnimationFrame(loop);

  // Haken für Areale, die direkt nach dem Startbildschirm etwas einblenden
  // wollen (z. B. die Titelkarte des Epilogs).
  if (cfg.nachStart) cfg.nachStart();
}

function richteStartbildschirmEin() {
  elNameInput  = document.getElementById('nameInput');
  elNameFehler = document.getElementById('nameFehler');
  elOptionen   = document.querySelector('#charSelect .options');

  // Im Hauptmenü eingetragenen Namen übernehmen, damit er nicht in jedem
  // Areal neu getippt werden muss – und damit er überall gleich geschrieben
  // ist, denn der Codex wird nach Namen gefiltert.
  try {
    const gemerkt = localStorage.getItem('marxIsBack.name');
    if (gemerkt) elNameInput.value = gemerkt;
  } catch (e) { /* localStorage gesperrt – dann eben von Hand */ }

  elNameInput.addEventListener('input', pruefeName);
  pruefeName();

  document.querySelectorAll('#charSelect .option').forEach(el => {
    el.addEventListener('click', () => {
      if (!nameGesetzt()) {
        elNameFehler.classList.add('an');
        elNameInput.focus();
        return;
      }
      studentName = elNameInput.value.trim();
      selectedGender = el.dataset.gender;
      document.getElementById('charSelect').classList.add('hidden');
      starteSpiel();
    });
  });

  const stand = ladeSpielstand();
  const boxFort = document.getElementById('fortsetzenBox');
  const boxNeu  = document.getElementById('neuBox');
  if (!stand) return;                     // kein Spielstand: direkt Figurenauswahl

  const anzahl = (stand.story && stand.story.fragmente) ? stand.story.fragmente.length : 0;
  const gesamt = Object.keys(FRAGMENTS).length;
  const datum = new Date(stand.zeit);
  document.getElementById('fortsetzenInfo').textContent =
    stand.name + ' – ' + anzahl + ' von ' + gesamt + ' Begriffen gesammelt (zuletzt gespielt am ' +
    datum.toLocaleDateString('de-DE') + ' um ' +
    datum.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) + ' Uhr).';

  boxFort.classList.remove('hidden');
  boxNeu.classList.add('hidden');

  document.getElementById('btnFortsetzen').addEventListener('click', () => {
    fortsetzenStand = stand;
    studentName = stand.name;
    selectedGender = stand.figur;
    document.getElementById('charSelect').classList.add('hidden');
    starteSpiel();
  });

  document.getElementById('btnNeu').addEventListener('click', () => {
    boxFort.classList.add('hidden');
    boxNeu.classList.remove('hidden');
    elNameInput.value = stand.name;       // Name als Vorschlag übernehmen
    pruefeName();
    elNameInput.focus();
  });
}

// Platzierungsprüfung beim Start. Fängt zwei Fehler ab, die beim Setzen von
// NPCs leicht passieren und im Spiel erst spät auffallen:
// 1. Die Figur ragt oben aus der Karte heraus und wird abgeschnitten.
// 2. Zwei Interaktionspunkte liegen so dicht beieinander, dass immer nur
//    einer von beiden ansprechbar ist.
function pruefePlatzierung() {
  const meldungen = [];

  for (const npc of NPCS) {
    if (npc.height > 0 && npc.y - npc.height < 0) {
      meldungen.push('„' + npc.name + '" ragt oben aus der Karte heraus (Kopf bei y=' +
        Math.round(npc.y - npc.height) + '). Setze die Figur weiter nach unten: ' +
        'mindestens y = ' + Math.ceil(npc.height / ZOOM_FIX) + ' in Areal-Koordinaten.');
    }
    if (npc.y > mapH || npc.x < 0 || npc.x > mapW) {
      meldungen.push('„' + npc.name + '" liegt außerhalb der Karte.');
    }
  }

  for (let i = 0; i < NPCS.length; i++) {
    for (let j = i + 1; j < NPCS.length; j++) {
      const d = Math.hypot(NPCS[i].x - NPCS[j].x, NPCS[i].y - NPCS[j].y);
      if (d < INTERACT_RADIUS) {
        meldungen.push('„' + NPCS[i].name + '" und „' + NPCS[j].name + '" stehen nur ' +
          Math.round(d) + ' Pixel auseinander (Ansprechweite ' + Math.round(INTERACT_RADIUS) +
          '). Einer der beiden ist dadurch nicht erreichbar.');
      }
    }
  }

  if (meldungen.length) {
    console.warn('[Platzierung Areal ' + cfg.areal + ']\n- ' + meldungen.join('\n- '));
  }
  return meldungen;
}

// ---------- Öffentliche Schnittstelle ----------
function start(konfiguration) {
  cfg = konfiguration;
  STORY = cfg.story;
  FRAGMENTS = cfg.fragmente;
  NPCS = cfg.npcs;
  DIALOGE = cfg.dialoge;

  // Fortschrittsfelder, die die Engine selbst braucht
  if (!Array.isArray(STORY.fragmente)) STORY.fragmente = [];
  if (typeof STORY.meinung !== 'string') STORY.meinung = '';

  ZOOM_FIX = cfg.worldZoom / cfg.authoredZoom;
  // Figurengröße je Areal: Ein Marktplatz verträgt eine kleinere Figur als
  // eine enge Halle, in der die Maschinen den Maßstab vorgeben.
  player.displayHeight = cfg.spielerHoehe || 150;
  // Tempo und Reichweite an die Figurengröße koppeln, damit sich das Laufen
  // in jedem Areal gleich anfühlt
  const massstab = player.displayHeight / 150 * ZOOM_FIX;
  player.speed = 220 * massstab;
  INTERACT_RADIUS = 150 * massstab;

  // Zonen und NPC-Positionen vom Zeichen-Zoom auf den aktuellen umrechnen
  zonen = (cfg.zonen || []).map(poly => poly.map(p => ({ x: p.x * ZOOM_FIX, y: p.y * ZOOM_FIX })));
  for (const npc of NPCS) {
    npc.x *= ZOOM_FIX;
    npc.y *= ZOOM_FIX;
    npc.loaded = false;
    if (!npc.file) continue;   // unsichtbarer Interaktionspunkt: kein Bild laden
    const img = new Image();
    img.onload  = () => { npc.loaded = true; };
    img.onerror = () => { npc.loaded = false; };   // Platzhalter springt ein
    img.src = cfg.npcPfad + npc.file;
    npc.img = img;
  }

  // Spielerfiguren laden
  for (const g of ['m', 'f']) {
    for (const pose of POSE_KEYS) {
      const img = new Image();
      spriteLoaded[g][pose] = false;
      img.onload  = () => { spriteLoaded[g][pose] = true; };
      img.onerror = () => { spriteLoaded[g][pose] = false; };
      img.src = cfg.spielerPfad + 'worker_' + g + '/worker_' + g + '_' + pose + '.png';
      sprites[g][pose] = img;
    }
  }

  schildImg.src = (cfg.uiPfad || '../../assets/ui/') + 'namensschild.png';

  resizeCanvas();
  window.addEventListener('resize', () => { resizeCanvas(); if (gameStarted) updateCamera(); });

  bgImage.onload = () => {
    mapW = bgImage.naturalWidth * cfg.worldZoom;
    mapH = bgImage.naturalHeight * cfg.worldZoom;
    bgLoaded = true;
    pruefePlatzierung();
    starteSpiel();
  };
  bgImage.onerror = () => {
    ctx.fillStyle = '#fff';
    ctx.font = '16px sans-serif';
    ctx.fillText('Hintergrundbild konnte nicht geladen werden: ' + cfg.hintergrund, 20, 40);
  };
  bgImage.src = cfg.hintergrund;

  baueMenu();
  richteStartbildschirmEin();
}

return {
  start: start,
  // Bausteine, die die Areal-Inhalte aufrufen
  oeffneZuordnung: oeffneZuordnung,
  oeffneQuellen: oeffneQuellen,
  oeffneReihenfolge: oeffneReihenfolge,
  oeffneReflexion: oeffneReflexion,
  oeffneAbschluss: oeffneAbschluss,
  starteDialog: starteDialog,
  schalteFragmentFrei: schalteFragmentFrei,
  zeigeToast: zeigeToast,
  registriereOverlay: registriereOverlay,
  speichern: speichereSpielstand,
  // Zugriff für Tests und arealspezifische Erweiterungen
  npcNach: id => NPCS.find(n => n.id === id),
  spieler: player,
  zustand: () => STORY,
  istTouch: IST_TOUCH,
  istBlockiert: isBlocked,
  pruefePlatzierung: pruefePlatzierung,
  // Einzelnen Frame auslösen – für automatisierte Tests, wenn
  // requestAnimationFrame nicht läuft (z. B. im Hintergrund-Tab)
  schritt: dt => { update(dt || 1 / 60); render(); }
};
})();
