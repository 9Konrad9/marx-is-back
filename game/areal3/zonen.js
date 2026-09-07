// Kollisionszonen für Areal 3 (Stadtviertel).
// Koordinaten sind direkt Bildpixel des Hintergrunds (2816 x 1156),
// deshalb steht authoredZoom in index.html auf 1.
//
// Das Bild ist oben um 380 Pixel beschnitten: Dächer, Schornstein und Himmel
// kosteten die halbe Bildhöhe, ohne etwas zu erzählen. Ohne sie passen bei
// höherem Zoom die Ladenfronten und die Figuren zugleich ins Bild.
//
// Die Häuserzeile endet jetzt bei etwa y = 405; darunter liegt zuerst der
// Gehweg und dann das Pflaster. Der Gehweg ist begehbar – die Meister stehen
// dort vor ihren Läden, und nur so kommen die Türen im Bildausschnitt nach
// oben mit ins Bild.

function rechteck(x1, y1, x2, y2) {
  return [ {x:x1, y:y1}, {x:x2, y:y1}, {x:x2, y:y2}, {x:x1, y:y2} ];
}

const AREAL3_ZONEN = [
  // Häuserzeile: vier Werkstätten und rechts die große Fabrik
  rechteck(   0,    0, 2816,  405),

  // Ränder
  rechteck(   0, 1126, 2816, 1156),
  rechteck(   0,    0,   30, 1156),
  rechteck(2786,    0, 2816, 1156)
];

// Mittelpunkte der vier Werkstattfronten. Schließt ein Laden, werden über
// diese Stellen die Bretter aus vernagelt.png gezeichnet – sie decken die
// ganze Ladenfront ab, nicht nur die Tür.
const AREAL3_TUEREN = [
  { id: 'weber',    x:  197, y:  345 },
  { id: 'schuster', x:  611, y:  345 },
  { id: 'schmied',  x: 1024, y:  345 },
  { id: 'baecker',  x: 1452, y:  345 }
];
