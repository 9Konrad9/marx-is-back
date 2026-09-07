// Kollisionszonen für Areal 1 (Fabrikhalle).
// Anders als in Areal 0 sind die Koordinaten hier direkt Bildpixel des
// Hintergrunds (2816 x 1536), deshalb steht authoredZoom in index.html auf 1.
// Die Halle ist regelmäßig aufgebaut, daher genügen Rechtecke.

function rechteck(x1, y1, x2, y2) {
  return [ {x:x1, y:y1}, {x:x2, y:y1}, {x:x2, y:y2}, {x:x1, y:y2} ];
}

const AREAL1_ZONEN = [
  // Wandband am oberen Rand (darin Tür und Fenster)
  rechteck(   0,    0, 2816,  220),

  // Baumwollballen links, ragen unter die Wand
  rechteck(   0,    0,  560,  345),
  // Kontor des Fabrikbesitzers
  rechteck(1560,    0, 1950,  385),
  // Stapel fertiger Stoffballen
  rechteck(1955,  140, 2280,  345),

  // Obere Maschinenreihe, unterbrochen vom senkrechten Quergang
  rechteck(  40,  385, 1360,  795),
  rechteck(1505,  385, 2800,  795),

  // Untere Maschinenreihe
  rechteck(  30, 1015, 1325, 1465),
  rechteck(1530, 1015, 2800, 1465),

  // Ränder: dunkle Bildkanten nicht begehbar machen
  rechteck(   0, 1465, 2816, 1536),
  rechteck(   0,    0,   35, 1536),
  rechteck(2795,    0, 2816, 1536)
];
