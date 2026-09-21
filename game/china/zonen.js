// Kollisionszonen für die China-Szene (Schanghai, März 1927).
// Koordinaten sind direkt Bildpixel des Hintergrunds (2816 x 1536),
// deshalb steht authoredZoom in index.html auf 1.
//
// Die Grenze wurde am fertigen Bild gemessen, nicht geschätzt: spaltenweise
// von unten nach oben die Stelle gesucht, ab der die dunkle Ziegelmauer
// beginnt. Sie liegt über die ganze Breite bei etwa y = 840 – Mauer, Tor,
// Spinnereigebäude und die Gasse links enden alle auf derselben Höhe.
//
// Die Baumwollballen rechts ragen als einziges unter diese Linie: ihr
// unterer Stapel reicht bis etwa y = 890.

function rechteck(x1, y1, x2, y2) {
  return [ {x:x1, y:y1}, {x:x2, y:y1}, {x:x2, y:y2}, {x:x1, y:y2} ];
}

const CHINA_ZONEN = [
  // Durchgehendes Band am oberen Rand: Gasse, Mauer, Tor, Spinnerei
  rechteck(   0,    0, 2816,  840),

  // Der untere Baumwollstapel rechts
  rechteck(2640,  840, 2800,  895),

  // Ränder
  rechteck(   0, 1506, 2816, 1536),
  rechteck(   0,    0,   30, 1536),
  rechteck(2786,    0, 2816, 1536)
];
