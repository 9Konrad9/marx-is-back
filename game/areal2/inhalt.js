// Inhalte für Areal 2: Werkbank / maschinengetaktete Teilarbeit.
// Kernbegriff Entfremdung (M9).
// Grundlage: Schulbuch "Fenster nach Westen", Kapitel 4.
//
// Didaktischer Kern: Nicht der Text erklärt die Entfremdung, sondern das
// Spiel selbst. Die Schicht ist bewusst monoton, der Takt gehört der
// Maschine, und am Ende weiß die Schüli nicht, was sie hergestellt hat.

const STORY = {
  eingewiesen: false,
  schichtFertig: false,
  handgriffe: 0,        // tatsächlich geschaffte Handgriffe
  verpasst: 0,          // verpasste Takte
  gateBestanden: false,
  reflexionGestellt: false,
  meinung: '',
  fragmente: []
};

// Der Operator "Erklären" zielt hier auf die eigene Erfahrung, nicht auf
// eine Meinung – deshalb ist die Frage enger gefasst als in Areal 0 und 1.
const REFLEXIONSFRAGE =
  'Erkläre mit eigenen Worten, warum sich diese Arbeit so angefühlt hat, ' +
  'wie sie sich angefühlt hat. Beziehe dich darauf, was du tun konntest ' +
  'und was nicht – und darauf, was du am Ende der Schicht in den Händen hattest.';

const FRAGMENTS = {
  entfremdung: {
    title: 'Entfremdung',
    kurz: 'Wer nur einen Handgriff im Maschinentakt macht, erkennt sich in seinem Produkt nicht mehr wieder.',
    text: 'Wo eine Maschine den Takt vorgibt, schrumpft die Arbeit auf wenige immer gleiche ' +
          'Handgriffe zusammen. Der Arbeitende entscheidet nicht mehr, was entsteht, wie es ' +
          'entsteht und wie schnell – er fügt sich in einen Ablauf ein, den andere festgelegt ' +
          'haben, und sieht das fertige Erzeugnis oft nie. Marx nennt diesen Zustand ' +
          'Entfremdung: Die Arbeit gehört nicht mehr zum Menschen, sie steht ihm fremd ' +
          'gegenüber. Sie ernährt ihn noch, aber sie sagt nichts mehr über ihn aus.',
    src: 'Begriff nach Marx; vgl. Manifest der Kommunistischen Partei (1848)'
  }
};

// ---------- Die Schicht an der Werkbank ----------
// Bewusst karg gehalten: kein wachsender Lohn, keine Bilanz, kein Ergebnis.
// Nur ein Zähler, der hochläuft, und ein Takt, der schneller wird.
const SCHICHT = {
  ziel: 40,             // Handgriffe bis Feierabend
  taktStart: 1250,      // Millisekunden je Takt
  taktSchnell: 850,     // ab dem Tempo-Wechsel
  tempoAb: 24,          // ab diesem Handgriff zieht der Werkmeister an
  fensterAnteil: 0.55   // Anteil des Takts, in dem das Teil greifbar ist
};

// Zwischenrufe, die die Monotonie sichtbar machen, statt sie nur zu erzeugen
const TAKT_MELDUNGEN = {
  8:  'Acht. Noch zweiunddreißig.',
  16: 'Deine Gedanken wandern. Die Hand macht weiter.',
  24: 'Der Werkmeister zieht den Riemen straffer. Das Tempo steigt.',
  32: 'Du zählst nicht mehr mit. Es zählt ja auch niemand sonst.'
};

const NPCS = [
  {
    id: 'station', name: 'Deine Station',
    dativ: 'deiner Station',
    x: 880, y: 1010,
    miniatur: { x: 874, y: 760, groesse: 420 },
    unsichtbar: true,        // die Maschine steckt schon im Hintergrundbild
    file: '', color: '#000', height: 0
  },
  {
    id: 'tuer', name: 'Weg nach draußen',
    dativ: 'dem Weg nach draußen',
    x: 1400, y: 1000,
    miniatur: { x: 1406, y: 190, groesse: 380 },
    unsichtbar: true,
    file: '', color: '#000', height: 0
  },
  {
    id: 'arbeiter', name: 'Alter Arbeiter',
    dativ: 'dem alten Arbeiter',
    x: 1929, y: 1020,
    file: 'npc_arbeiter.png',
    color: '#6b5a44', height: 200
  },
  {
    id: 'aufseher', name: 'Werkmeister',
    dativ: 'dem Werkmeister',
    x: 2450, y: 1300,
    file: 'npc_aufseher.png',
    color: '#5a4a3a', height: 207
  },
  {
    id: 'marx', name: 'Karl Marx',
    dativ: 'Karl Marx',
    x: 450, y: 1300,
    file: 'npc_marx.png',
    color: '#6f6396', height: 220
  }
];

const DIALOGE = {
  arbeiter() {
    if (!STORY.eingewiesen) {
      return {
        lines: [
          'Neue Halle, neue Arbeit. Hier ist es anders als an den Webstühlen.',
          'Dort hast du ein Stück Stoff gemacht, von vorn bis hinten. Hier machst du einen Handgriff.',
          'Einen. Immer denselben. Der Kopf da vor dir stanzt, du legst ein, du nimmst raus, der Nächste legt ein.',
          'Frag nicht, was daraus wird. Ich arbeite hier seit vier Jahren und weiß es nicht.',
          'Und noch etwas: Du bestimmst das Tempo nicht. Die Maschine bestimmt es. Du kommst mit oder du kommst nicht mit.'
        ],
        after() { STORY.eingewiesen = true; }
      };
    }
    if (STORY.schichtFertig) {
      return { lines: [
        'Und? Merkst du es jetzt?',
        'Am Webstuhl war ich müde. Hier bin ich leer. Das ist ein Unterschied.',
        'Der Bärtige drüben hat auch dafür ein Wort. Er hat für alles ein Wort.'
      ] };
    }
    return { lines: [
      'Steh nicht herum. Die Maschine wartet nicht.',
      'Deine Station ist die dritte von links.'
    ] };
  },

  aufseher() {
    if (!STORY.schichtFertig) {
      return { lines: [
        'Vierzig Handgriffe. Dann ist Feierabend.',
        'Zu früh gegriffen zählt nicht. Verpasst zählt auch nicht. Nur im Takt zählt.',
        'Und wenn ich merke, dass es zu leicht geht, drehe ich das Tempo hoch.'
      ] };
    }
    return { lines: [
      'Vierzig. Aufgeschrieben.',
      'Was du gestanzt hast? Das steht nicht in meinem Buch. In meinem Buch stehen nur Zahlen.'
    ] };
  },

  station() {
    if (!STORY.eingewiesen) {
      return { lines: [
        'Der Stanzkopf steht still. Sprich zuerst mit dem alten Arbeiter, er weist dich ein.'
      ] };
    }
    if (STORY.schichtFertig) {
      return { lines: [
        'Deine Schicht ist vorbei. Die Station gehört jetzt jemand anderem.'
      ] };
    }
    return { lines: ['Du stellst dich an die Bank und legst die Hände an den Hebel.'],
             after() { starteSchicht(); } };
  },

  marx() {
    if (!STORY.schichtFertig) {
      return { lines: [
        'Nicht mit mir reden. Arbeiten. Ich will, dass du es in den Händen spürst, nicht in den Ohren.',
        'Vierzig Handgriffe. Dann sprechen wir.'
      ] };
    }
    if (STORY.gateBestanden && !STORY.reflexionGestellt) {
      return {
        lines: [
          'Eine Frage habe ich noch, und sie ist die wichtigste.',
          'Nicht was du gelernt hast – was du gespürt hast.'
        ],
        after() { openReflexion(); }
      };
    }
    if (STORY.gateBestanden) {
      return { lines: [
        'Du hast einen Namen für dieses Gefühl. Das ist mehr, als die meisten hier je bekommen.',
        'Und jetzt sieh dich draußen um. Was in dieser Halle mit dir geschieht, geschieht draußen mit ganzen Straßenzügen.'
      ] };
    }
    return {
      lines: [
        'Also. Vierzig Handgriffe.',
        'Sag mir: Was hast du hergestellt?',
        '… Du weißt es nicht. Natürlich weißt du es nicht.',
        'Am Webstuhl war der Stoff wenigstens noch deiner, ehe man ihn dir wegnahm. Hier gibt es gar nichts mehr, das deines werden könnte.',
        'Ich habe dafür vor zwanzig Jahren einen Satz aufgeschrieben. Er lautet: Der Arbeiter wird ein bloßes Zubehör der Maschine.',
        'Zubehör. Nicht die Maschine hilft dir – du hilfst ihr.',
        'Dafür gibt es ein Wort. Lass es uns gemeinsam finden.'
      ],
      after() { openGate(); }
    };
  },

  tuer() {
    if (!STORY.gateBestanden) {
      return { lines: [
        'Der Weg nach draußen führt um die Bank herum zur Tür.',
        'Aber deine Schicht ist noch nicht abgerechnet. Marx wartet.'
      ] };
    }
    if (!STORY.reflexionGestellt) {
      return { lines: [
        'Marx wollte noch hören, wie sich das angefühlt hat. Sprich zuerst mit ihm.'
      ] };
    }
    return {
      lines: [
        'Du gehst um die Werkbank herum und drückst die Tür auf.',
        'Hinter dir stanzt der Kopf weiter, im selben Takt, für jemand anderen.'
      ],
      after() { zeigeAbschluss(); }
    };
  }
};

// ---------- Aufgabe: Entfremdung ----------
// Zuerst Marx im Wortlaut, dann unsere eigene Erklärung dazu. Wortlaut geprüft
// gegen das Manifest, Kapitel I. Die Schülis haben das Schulbuch nicht,
// deshalb steht hier keine M-Nummer.
const QUELLEN = {
  manifest: {
    ref: 'Marx/Engels: Manifest der Kommunistischen Partei (1848)',
    nachweis: 'Wörtliches Zitat aus Kapitel I. Gemeinfrei; Marx starb 1883, Engels 1895.',
    zitat: 'Er wird ein bloßes Zubehör der Maschine, von dem nur der einfachste, eintönigste, ' +
           'am leichtesten erlernbare Handgriff verlangt wird.'
  },
  erklaerung: {
    ref: 'Was Marx damit meint',
    art: '',
    nachweis: 'Zusammenfassung in heutiger Sprache, für dieses Spiel geschrieben – kein Zitat.',
    keinZitat: true,
    zitat: 'Wer vorher ein Handwerk gelernt hatte, plante seine Arbeit selbst, sah das fertige ' +
           'Stück vor sich und konnte etwas, das nicht jeder konnte. In der Fabrik bleibt davon ' +
           'ein einziger Handgriff im Takt der Maschine. Man entscheidet nicht mehr, was entsteht, ' +
           'wie schnell es entsteht und wozu es gut ist – und man sieht das Ergebnis nie ganz. ' +
           'Marx nennt das Entfremdung: Die Arbeit gehört einem nicht mehr, obwohl man sie tut. ' +
           '„Zubehör“ ist dabei wörtlich gemeint – nicht die Maschine hilft dem Menschen, sondern ' +
           'der Mensch der Maschine.'
  }
};

const QUELLEN_FRAGEN = [
  {
    quelle: 'erklaerung', afb: 'AFB I', operator: 'Benennen',
    frage: 'Benenne, was du in deiner Schicht hergestellt hast.',
    typ: 'eine',
    optionen: [
      'Einen Teil eines Werkstücks, das ich nie fertig gesehen habe.',
      'Ein vollständiges Werkstück von Anfang bis Ende.',
      'Gar nichts – die Maschine hat die ganze Arbeit allein gemacht.'
    ],
    richtig: 'Einen Teil eines Werkstücks, das ich nie fertig gesehen habe.'
  },
  {
    quelle: 'erklaerung', afb: 'AFB I', operator: 'Benennen',
    frage: 'Benenne die beiden Dinge, die dem Arbeiter laut Quelle genommen werden. Wähle zwei aus.',
    typ: 'zwei',
    optionen: [
      'Der Einfluss darauf, was und wie schnell hergestellt wird',
      'Der Sinn, den die Arbeit für ihn hat',
      'Das Werkzeug, mit dem er arbeitet',
      'Der Lohn, den er am Ende erhält',
      'Der Kontakt zu den anderen Arbeitern',
      'Das Recht, die Fabrik zu verlassen'
    ],
    richtig: ['Der Einfluss darauf, was und wie schnell hergestellt wird', 'Der Sinn, den die Arbeit für ihn hat']
  },
  {
    quelle: 'manifest', afb: 'AFB II', operator: 'Erklären',
    frage: 'Erkläre, was gemeint ist, wenn der Arbeiter im Zitat „bloßes Zubehör der Maschine“ genannt wird.',
    typ: 'eine',
    optionen: [
      'Nicht die Maschine unterstützt den Menschen, sondern der Mensch bedient die Maschine in ihrem Takt und richtet sich ganz nach ihr.',
      'Der Arbeiter darf die Maschine nicht verlassen und wird nachts an sie angekettet.',
      'Der Arbeiter versteht die Maschine so gut, dass er sie selbst reparieren kann.'
    ],
    richtig: 'Nicht die Maschine unterstützt den Menschen, sondern der Mensch bedient die Maschine in ihrem Takt und richtet sich ganz nach ihr.'
  }
];
