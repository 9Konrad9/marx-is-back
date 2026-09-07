// Kollisionszonen für Areal 0 (Marktplatz).
// Koordinaten sind direkt Bildpixel des Hintergrunds (2816 x 1536),
// deshalb steht authoredZoom in index.html auf 1.
//
// Der alte Marktplatz war eine verwinkelte Stadtkarte mit drei Straßen und
// 59 handgezeichneten Polygonen. Das neue Bild folgt der Bauweise aller
// übrigen Areale: eine Fassadenzeile als Band am oberen Rand, darunter ein
// offener Platz. Dadurch genügen ein paar Rechtecke.
//
// Begehbar ist der Platz unterhalb der Häuserzeile, ohne Brunnen und Stände.

function rechteck(x1, y1, x2, y2) {
  return [ {x:x1, y:y1}, {x:x2, y:y1}, {x:x2, y:y2}, {x:x1, y:y2} ];
}

const AREAL0_ZONEN = [
  // Fassadenzeile: Fabrik mit Tor, Arbeiterhäuser, Bürgerhäuser mit Gitter
  rechteck(   0,    0, 2816,  775),

  // Brunnen, links der Mitte
  rechteck( 800,  745, 1085,  975),

  // Die drei Marktstände
  rechteck(1265,  710, 1540,  975),
  rechteck(1660,  715, 1950,  975),
  rechteck(2215,  730, 2560,  975),

  // Ränder
  rechteck(   0, 1500, 2816, 1536),
  rechteck(   0,    0,   30, 1536),
  rechteck(2786,    0, 2816, 1536)
];
