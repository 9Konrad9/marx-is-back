// Inhalte für den Epilog: Petrograd, Herbst 1917.
// Grundlage: Schulbuch "Fenster nach Westen", Kapitel 5.
//
// Kein Areal im eigentlichen Sinn: keine Aufgabe, kein Gate, kein Begriff.
// Ein kurzer Gang von etwa fünf Minuten, der drei Dinge tut:
//
//   1. Er zeigt dieselbe Not an einem anderen Ort und in einem anderen
//      Jahrhundert – die Brotschlange reimt sich auf Bäcker Lemm aus
//      Areal 3 und auf die Marktfrau vom Krisenplatz.
//   2. Er lässt die Schülis ihre eigene Quelle wiedererkennen: Der Vorleser
//      liest den Schlusssatz des Manifests vor, den sie in Areal 0 analysiert
//      haben. Siebzig Jahre später, in einer anderen Sprache, auf der Straße.
//   3. Er reicht den Narrativbegriff an die Folgestunde weiter, ohne ihn
//      noch einmal zu erklären.
//
// Der Zeitpunkt liegt bewusst VOR der Oktoberrevolution: Der Zar ist seit
// dem Frühjahr weg, der Krieg läuft weiter, und es ist offen, wer regieren
// wird. Der Oktober ist der erste Satz der nächsten Stunde, nicht der letzte
// dieser.
//
// Zwei Redner, und der Unterschied ist der Punkt: Der erste bleibt anonym
// und liest Marx vor – die Sätze aus Areal 0. Der zweite hat einen Namen,
// Lenin, und sagt etwas anderes als Marx. Genau dieser Bruch ist die Brücke
// zur Folgestunde.
//
// Die Spielfigur bleibt dieselbe wie in allen Arealen. Sie ist nicht
// dieselbe Person – sie steht an derselben Stelle in der Gesellschaft.

const STORY = {
  gesehen: [],            // schlange, vorleser, lenin
  auftaktGezeigt: false,
  fragmente: []           // der Epilog schaltet nichts frei
};

// Der Epilog vergibt keine Theoriefragmente. Der Codex ist mit Areal 5
// vollständig; hier wird nichts mehr gelernt, sondern etwas gezeigt.
const FRAGMENTS = {};

const AUFTAKT = {
  ort: 'Petrograd, Herbst 1917',
  zeilen: [
    'Vierunddreißig Jahre nach Marx’ Tod. Zweitausend Kilometer weiter östlich.',
    'Seit drei Jahren tobt der Erste Weltkrieg. Russland kämpft mit – und verliert: ' +
    'Millionen Soldaten sind gefallen, die Züge fahren Munition an die Front statt ' +
    'Getreide in die Städte, die Fabriken kommen nicht nach, das Brot ist rationiert.',
    'Verantwortlich gemacht wurde dafür der Zar. Im Februar gingen die Menschen wegen ' +
    'des Brotes auf die Straße; wenige Tage später dankte er ab. Seitdem regiert eine ' +
    'provisorische Regierung – und führt den Krieg weiter.',
    'Wer das Land regieren wird, ist an diesem Tag noch nicht entschieden.',
    'Du bist nicht dieselbe Person, die durch die Spinnerei gegangen ist. ' +
    'Du stehst nur an derselben Stelle.'
  ]
};

const NPCS = [
  {
    id: 'schlange', name: 'Die Brotschlange',
    dativ: 'den Leuten in der Schlange',
    x: 620, y: 950,    // vor der Ladenfront
    file: 'npc_arbeitergruppe.png',
    color: '#5f5344', height: 175
  },
  {
    id: 'vorleser', name: 'Ein Vorleser',
    dativ: 'dem Vorleser',
    x: 1700, y: 919,   // steht auf der Kiste: 61 Bildpixel über dem Boden
    file: 'npc_arbeiter.png',
    color: '#6b5a44', height: 180
  },
  {
    id: 'frau', name: 'Frau mit Kopftuch',
    dativ: 'der Frau mit dem Kopftuch',
    x: 1400, y: 1060,
    file: 'npc_marktfrau.png',
    color: '#7a5f4a', height: 176
  },
  {
    id: 'lenin', name: 'Der Redner auf der Kiste',
    dativ: 'dem Redner auf der Kiste',
    x: 2450, y: 999,   // steht auf der Kiste: 61 Bildpixel über dem Boden
    file: 'npc_lenin.png',
    color: '#5a4a52', height: 176
  },
  {
    id: 'tor', name: 'Das offene Fabriktor',
    dativ: 'dem offenen Fabriktor',
    x: 2190, y: 900,   // unter dem offenen Torbogen
    unsichtbar: true,
    file: '', color: '#000', height: 0
  }
];

function merkeGesehen(id) {
  if (STORY.gesehen.indexOf(id) === -1) STORY.gesehen.push(id);
}

const DIALOGE = {
  schlange() {
    if (STORY.gesehen.indexOf('schlange') !== -1) {
      return { lines: [
        '„Wenn du dich jetzt anstellst, bist du vor Mitternacht nicht dran."'
      ] };
    }
    return {
      lines: [
        'Die Schlange reicht um die Ecke. Es ist kalt, und niemand geht.',
        '„Vier Stunden für zwei Pfund. Gestern waren es fünf."',
        '„Sie sagen, das Getreide liegt im Süden und kommt nicht her. Die Waggons fahren an die Front."',
        '„Es ist ja genug da. Es ist bloß nicht hier."'
      ],
      after() { merkeGesehen('schlange'); }
    };
  },

  frau() {
    if (STORY.gesehen.length >= 2) {
      return { lines: [
        'Mein Mann ist seit zwei Jahren an der Front. Geschrieben hat er zuletzt im Mai.',
        'Erst hieß es, mit dem Zaren wird es besser. Der Zar ist weg. Besser ist es nicht.'
      ] };
    }
    return {
      lines: [
        'Im Februar sind wir wegen des Brotes auf die Straße. Bloß wegen des Brotes.',
        'Acht Tage später war der Zar nicht mehr da. So schnell ging das.',
        'Und jetzt? Jetzt reden sie alle. Jeden Tag ein anderer auf einer anderen Kiste.'
      ]
    };
  },

  // Der Schlusssatz des Manifests, den die Schülis in Areal 0 analysiert
  // haben. Gemeinfrei, wörtlich, hier bewusst ohne Nennung des Vorlesers.
  vorleser() {
    if (STORY.gesehen.indexOf('vorleser') !== -1) {
      return { lines: [
        'Er liest weiter. Die Traube um ihn herum ist größer geworden.'
      ] };
    }
    return {
      lines: [
        'Ein Mann steht auf einer umgedrehten Kiste und liest von einem Blatt ab. ' +
        'Zwanzig, dreißig Leute hören zu. Niemand nennt seinen Namen.',
        'Er liest auf Russisch. Aber du hast diese Sätze schon einmal gehört.',
        '„Die Proletarier haben nichts in ihr zu verlieren als ihre Ketten. ' +
        'Sie haben eine Welt zu gewinnen."',
        '„Proletarier aller Länder, vereinigt euch!"',
        'Neunundsechzig Jahre alt sind die Sätze. Geschrieben in London, von einem Mann, ' +
        'der seit vierunddreißig Jahren tot ist.',
        'Hier stehen sie auf einem Flugblatt, das durch zwanzig Hände gegangen ist.'
      ],
      after() { merkeGesehen('vorleser'); }
    };
  },

  // Der zweite Redner ist nicht mehr anonym. Er ist der Grund, warum die
  // Folgestunde nicht mehr von Marx handelt: Marx erwartete die Revolution
  // in den am weitesten entwickelten Industrieländern – Russland war das
  // Gegenteil davon. Was Lenin daraus macht, ist der Bruch, an dem die
  // nächste Einheit ansetzt.
  lenin() {
    if (STORY.gesehen.indexOf('lenin') !== -1) {
      return { lines: [
        'Die Menge um die Kiste ist nicht kleiner geworden.',
        '„Frieden. Land. Brot." Drei Wörter. Mehr braucht er nicht.'
      ] };
    }
    return {
      lines: [
        'Weiter hinten, näher am offenen Tor, steht ein zweiter Mann auf einer Kiste. ' +
        'Dieser hier hat einen Namen, und alle in der Menge kennen ihn: Lenin.',
        '„Man sagt uns, Russland sei nicht so weit. Man sagt, erst müsse das Land Fabriken ' +
        'bauen, eine Bourgeoisie heranwachsen lassen, und dann, viel später, komme unsere Zeit."',
        '„Marx hat das so beschrieben, ja. Er sah die Revolution dort kommen, wo die Industrie ' +
        'am weitesten ist – in England, in Deutschland. Nicht bei uns."',
        '„Aber sehen Sie sich um. Der Krieg hat die Ordnung zerschlagen, die uns aufhalten sollte. ' +
        'Die Soldaten laufen davon, die Bauern nehmen sich das Land, in den Betrieben entscheiden ' +
        'die Räte. Worauf sollen wir warten?"',
        '„Was fehlt, ist nicht die Zeit. Was fehlt, ist eine Partei, die weiß, was sie will, und ' +
        'die zugreift, wenn der Augenblick da ist."',
        '„Frieden. Land. Brot. Und alle Macht den Räten."',
        'Er redet von Marx – und er sagt etwas anderes als Marx.'
      ],
      after() { merkeGesehen('lenin'); }
    };
  },

  tor() {
    if (STORY.gesehen.length < 3) {
      return { lines: [
        'Das Fabriktor steht offen. An einem Flügel hängt eine rote Fahne.',
        'Aber sieh dich erst um – die Brotschlange, der Vorleser, der Mann auf der Kiste. ' +
        'Du bist nur einmal hier.'
      ] };
    }
    return {
      lines: [
        'Das letzte Fabriktor, vor dem du standest, war verriegelt. Eine Kette davor, ' +
        'und dahinter lagerte Tuch, das niemand kaufen konnte.',
        'Dieses hier steht offen, und an einem Flügel hängt eine rote Fahne.',
        'Was in den Wochen danach geschieht, steht in keinem Buch, das Marx geschrieben hat. ' +
        'Es ist erst danach passiert.'
      ],
      after() { zeigeAbschluss(); }
    };
  }
};
