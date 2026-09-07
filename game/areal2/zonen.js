// Kollisionszonen für Areal 2 (Werkbank / Teilarbeit).
// Koordinaten sind direkt Bildpixel des Hintergrunds (2816 x 1536),
// deshalb steht authoredZoom in index.html auf 1.
//
// Die Werkbank zieht sich ohne Lücke über die ganze Bildbreite. Der schmale
// Streifen dahinter (Wand, Kisten, Pult, Tür) ist damit nicht erreichbar –
// er wird komplett gesperrt. Gespielt wird ausschließlich auf der offenen
// Fläche davor, also genau dort, wo ein Arbeiter an seiner Station steht.

function rechteck(x1, y1, x2, y2) {
  return [ {x:x1, y:y1}, {x:x2, y:y1}, {x:x2, y:y2}, {x:x1, y:y2} ];
}

const AREAL2_ZONEN = [
  // Alles oberhalb der Werkbank-Vorderkante: Wand, Kisten, Pult, Tür, Bank
  rechteck(   0,    0, 2816,  950),

  // Ränder: dunkle Bildkanten nicht begehbar machen
  rechteck(   0, 1500, 2816, 1536),
  rechteck(   0,    0,   30, 1536),
  rechteck(2786,    0, 2816, 1536)
];
