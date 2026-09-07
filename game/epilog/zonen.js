// Kollisionszonen für den Epilog (Petrograd 1917).
// Koordinaten sind direkt Bildpixel des Hintergrunds (2816 x 1150),
// deshalb steht authoredZoom in index.html auf 1.
//
// Das Bild ist bewusst nur 1150 statt 1536 Pixel hoch: Die untere Bildhälfte
// war leerer Schnee, und ohne sie rastet die Kamera an der Kartenunterkante
// ein. Dadurch steht der Bildausschnitt senkrecht fest und zeigt dauerhaft
// die roten Fahnen (y 292–424) UND den begehbaren Streifen darunter. Bei
// voller Bildhöhe wären die Fahnen nie ins Bild gekommen.
//
// Die Häuserzeile endet gemessen bei etwa y = 830; darunter liegt der offene
// Platz. Der Torbogen rechts führt in eine perspektivische Gasse – die ist
// nicht begehbar und liegt ohnehin im gesperrten Band.

function rechteck(x1, y1, x2, y2) {
  return [ {x:x1, y:y1}, {x:x2, y:y1}, {x:x2, y:y2}, {x:x1, y:y2} ];
}

const EPILOG_ZONEN = [
  // Häuserzeile mit Ladenfront, Toreinfahrt und den roten Fahnen
  rechteck(   0,    0, 2816,  830),

  // Ränder
  rechteck(   0, 1120, 2816, 1150),
  rechteck(   0,    0,   30, 1150),
  rechteck(2786,    0, 2816, 1150)
];
