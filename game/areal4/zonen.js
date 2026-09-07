// Kollisionszonen für Areal 4 (Versammlungsraum).
// Koordinaten sind direkt Bildpixel des Hintergrunds (2816 x 1536),
// deshalb steht authoredZoom in index.html auf 1.
//
// Begehbar sind der breite Mittelgang zwischen den Tischgruppen, die Ränder
// links und rechts sowie das Querband zwischen oberer und unterer Tischreihe.

function rechteck(x1, y1, x2, y2) {
  return [ {x:x1, y:y1}, {x:x2, y:y1}, {x:x2, y:y2}, {x:x1, y:y2} ];
}

const AREAL4_ZONEN = [
  // Wandband oben mit Tür, Rednerpult und Ofen
  rechteck(   0,    0, 2816,  540),

  // Obere Tischreihe (Tisch samt Bank)
  rechteck( 470,  600, 1180,  925),
  rechteck(1630,  600, 2340,  925),

  // Untere Tischreihe
  rechteck( 470, 1065, 1180, 1370),
  rechteck(1630, 1065, 2340, 1370),

  // Ränder
  rechteck(   0, 1500, 2816, 1536),
  rechteck(   0,    0,   30, 1536),
  rechteck(2786,    0, 2816, 1536)
];
