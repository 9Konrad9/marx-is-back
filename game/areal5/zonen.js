// Kollisionszonen für Areal 5 (Krisenplatz).
// Koordinaten sind direkt Bildpixel des Hintergrunds (2816 x 1536),
// deshalb steht authoredZoom in index.html auf 1.
//
// Die Grenze zwischen Hof und Hindernissen wurde am fertigen Bild gemessen:
// spaltenweise von oben nach unten die erste Stelle gesucht, ab der 60 Zeilen
// am Stück heller, farbloser Boden sind. Die Fassade endet durchgehend bei
// etwa y = 600; die aufgeschwungenen Lagertorflügel rechts reichen tiefer,
// die Marktstände links am tiefsten.

function rechteck(x1, y1, x2, y2) {
  return [ {x:x1, y:y1}, {x:x2, y:y1}, {x:x2, y:y2}, {x:x1, y:y2} ];
}

const AREAL5_ZONEN = [
  // Fabrikfassade mit Schornstein, verriegeltem Tor und Lagerhaus:
  // durchgehendes Band am oberen Rand
  rechteck(   0,    0, 2816,  600),

  // Marktstände links. Der vorderste Stand ragt am weitesten in den Hof.
  rechteck(  30,  600, 1130,  800),
  rechteck(  30,  800,  700,  880),

  // Aufgeschwungene Torflügel des Lagerhauses
  rechteck(2080,  600, 2760,  715),

  // Feuertonne, frei im Hof
  rechteck( 130,  930,  345, 1190),

  // Ränder
  rechteck(   0, 1500, 2816, 1536),
  rechteck(   0,    0,   30, 1536),
  rechteck(2786,    0, 2816, 1536)
];
