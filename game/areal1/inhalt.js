// Inhalte für Areal 1: Fabrikhalle.
// Kernbegriffe Mehrwert (M7) und Ausbeutung (M8).
// Grundlage: Schulbuch "Fenster nach Westen", Kapitel 4.

const STORY = {
  eingewiesen: false,      // der alte Arbeiter hat die Arbeit erklärt
  schichten: 0,            // abgeschlossene Schichten
  maschineDa: false,       // neue Maschine aufgestellt (nach Schicht 2)
  lohnGesenkt: false,
  erzeugt: 0,              // aufsummierter Warenwert
  ausgezahlt: 0,           // aufsummierter Lohn
  gateBestanden: false,
  reflexionGestellt: false,
  meinung: '',
  fragmente: []
};

// Operator "Beurteilen" (AFB III) – ungewerteter Freitext
const REFLEXIONSFRAGE =
  'Beurteile: Der Fabrikbesitzer sagt, er trage das Risiko und dürfe deshalb ' +
  'den Überschuss behalten. Der alte Arbeiter sagt, ohne seine Hände entstünde ' +
  'gar kein Stoff. Wer hat aus deiner Sicht den besseren Grund – und warum? ' +
  'Begründe deine Meinung.';

const FRAGMENTS = {
  mehrwert: {
    title: 'Mehrwert',
    kurz: 'Der Arbeiter erzeugt mehr Wert, als sein Lohn beträgt; die Differenz behält der Besitzer.',
    text: 'Aus Rohstoff wird durch Arbeit etwas Wertvolleres: Baumwolle allein ist wenig wert, ' +
          'der fertige Stoff deutlich mehr. Diesen Wertzuwachs schafft die Arbeit. Der Unternehmer ' +
          'bezahlt aber nur zwei Dinge – das Material und einen Lohn, der gerade zum Leben reicht. ' +
          'Was darüber hinaus entsteht, nennt Marx den Mehrwert. Er bleibt beim Eigentümer der ' +
          'Produktionsmittel, obwohl ihn die Arbeit hervorgebracht hat.',
    src: 'Begriff nach Marx, Das Kapital, Band I (1867)'
  },
  ausbeutung: {
    title: 'Ausbeutung',
    kurz: 'Ausbeutung meint bei Marx keine Bosheit, sondern das planmäßige Einbehalten des Mehrwerts.',
    text: 'Für Marx verschärft sich das Verhältnis mit der Zeit von selbst. Weil die Unternehmer ' +
          'miteinander konkurrieren, müssen sie billiger produzieren: Sie drücken die Löhne und ' +
          'ersetzen menschliche Arbeit durch Maschinen. Wer dadurch überflüssig wird, verarmt – und ' +
          'die Übrigen nehmen aus Angst um ihre Stelle noch niedrigere Löhne hin. Der Anteil, der ' +
          'beim Eigentümer bleibt, wächst also, während der Anteil der Arbeitenden schrumpft.',
    src: 'Begriff nach Marx, Das Kapital, Band I (1867)'
  }
};

// ---------- Die Schichten am Webstuhl ----------
// Zahlen bewusst klein und rund gehalten, damit die Aufteilung auf einen
// Blick lesbar bleibt. Ab der dritten Schicht steht die neue Maschine:
// mehr Ausstoß, aber gesenkter Lohn – so wird M8 erfahrbar.
const SCHICHTEN = [
  { bahnen: 10, wert: 20, material: 6, lohn: 4 },
  { bahnen: 10, wert: 20, material: 6, lohn: 4 },
  { bahnen: 15, wert: 30, material: 8, lohn: 3 }
];

const NPCS = [
  {
    id: 'webstuhl', name: 'Webstuhl',
    dativ: 'dem Webstuhl',
    x: 1430, y: 900,
    miniatur: { x: 1675, y: 580, groesse: 440 },   // Webstuhl rechts der Gasse
    unsichtbar: true,          // die Maschine steckt schon im Hintergrundbild
    file: '', color: '#000', height: 0
  },
  {
    id: 'tuer', name: 'Tür nach draußen',
    dativ: 'der Tür nach draußen',
    x: 1400, y: 300,
    miniatur: { x: 1400, y: 200, groesse: 400 },
    unsichtbar: true,          // die Tür steckt schon im Hintergrundbild
    file: '', color: '#000', height: 0
  },
  {
    id: 'arbeiter', name: 'Alter Arbeiter',
    dativ: 'dem alten Arbeiter',
    x: 700, y: 900,
    file: 'npc_arbeiter.png',
    color: '#6b5a44', height: 200
  },
  {
    id: 'aufseher', name: 'Werkmeister',
    dativ: 'dem Werkmeister',
    x: 2250, y: 900,
    file: 'npc_aufseher.png',
    color: '#5a4a3a', height: 207
  },
  // Beide stehen im Mittelgang, NICHT im schmalen Streifen an der oberen Wand:
  // dort ist bis zum Kartenrand weniger Platz als die Figuren hoch sind,
  // sie würden am Kopf abgeschnitten.
  {
    id: 'buerger', name: 'Fabrikbesitzer',
    dativ: 'dem Fabrikbesitzer',
    x: 1900, y: 950,
    file: 'npc_fabrikbesitzer.png',
    color: '#4a4a58', height: 213
  },
  {
    id: 'marx', name: 'Karl Marx',
    dativ: 'Karl Marx',
    x: 1050, y: 950,
    file: 'npc_marx.png',
    color: '#6f6396', height: 220
  }
];

const DIALOGE = {
  arbeiter() {
    if (!STORY.eingewiesen) {
      return {
        lines: [
          'Da bist du also. Der Werkmeister hat dich mir zugeteilt.',
          'Das ist dein Webstuhl. Baumwolle kommt oben rein, Stoff kommt unten raus. Zehn Bahnen, dann ist die Schicht vorbei.',
          'Eines noch, bevor du anfängst: Zähl mit. Zähl, wie viel Stoff du machst – und was du dafür bekommst.',
          'Die meisten hier zählen nicht mehr mit. Ich schon. Seit dreißig Jahren.'
        ],
        after() { STORY.eingewiesen = true; }
      };
    }
    if (STORY.schichten >= SCHICHTEN.length) {
      return { lines: [
        'Jetzt hast du es selbst gesehen. Du machst den Stoff, und trotzdem wird er nicht deiner.',
        'Der Bärtige am Eingang hat einen Namen dafür. Frag ihn.'
      ] };
    }
    if (STORY.maschineDa) {
      return { lines: [
        'Die neue Maschine läuft schneller als die alte, das stimmt.',
        'Nur: Schneller heißt nicht mehr Lohn. Schneller heißt, dass wir weniger von uns brauchen.',
        'Zwei aus der Nachtschicht sind seit Montag nicht mehr da.'
      ] };
    }
    return { lines: [
      'Weiterarbeiten. Der Werkmeister sieht her.',
      'Und vergiss das Zählen nicht.'
    ] };
  },

  aufseher() {
    if (STORY.schichten === 0) {
      return { lines: [
        'Du bist neu. Also einmal die Regeln.',
        'Die Maschine steht nicht still. Wenn sie stillsteht, kostet das Geld – und das wird dir abgezogen.',
        'Zehn Bahnen pro Schicht. Wer weniger schafft, bekommt weniger.'
      ] };
    }
    if (STORY.maschineDa) {
      return { lines: [
        'Fünfzehn Bahnen jetzt. Die neue Maschine schafft das mühelos.',
        'Beschwer dich nicht bei mir. Ich habe die Zahl nicht festgelegt, ich schreibe sie nur auf.'
      ] };
    }
    return { lines: [
      'Tempo. Der Stoff webt sich nicht von allein.',
      'Ich notiere jede Unterbrechung.'
    ] };
  },

  buerger() {
    if (STORY.schichten < 2) {
      return { lines: [
        'Ah, der Neue am dritten Webstuhl. Arbeite ordentlich, dann bleiben wir Freunde.',
        'Die Baumwolle habe ich eingekauft, die Maschine habe ich bezahlt, die Halle gehört mir.',
        'Du bringst deine Hände mit. Ein klarer Handel, findest du nicht?'
      ] };
    }
    if (STORY.maschineDa && !STORY.lohnGesenkt) {
      return { lines: [
        'Du hast die neue Maschine gesehen. Sie kostet mich ein Vermögen.',
        'Also wird der Stücklohn angepasst. Das ist keine Bosheit, das ist Rechnen.',
        'Die Spinnerei am anderen Ufer verkauft billiger als ich. Wenn ich mithalten will, muss irgendwo gespart werden.',
        'Und gespart wird dort, wo es am einfachsten geht.'
      ] };
    }
    return { lines: [
      'Der Stoff verkauft sich gut in Manchester. Sehr gut sogar.',
      'Was mit dem Erlös geschieht? Ich kaufe die nächste Maschine. So wächst ein Betrieb.'
    ] };
  },

  marx() {
    if (STORY.schichten < SCHICHTEN.length) {
      return { lines: [
        'Ich sagte dir, du sollst selbst nachsehen. Also sieh nach.',
        'Stell dich an den Webstuhl und arbeite deine Schichten ab. Zähl mit, was entsteht – und was bei dir bleibt.',
        'Danach reden wir.'
      ] };
    }
    if (STORY.gateBestanden && !STORY.reflexionGestellt) {
      return {
        lines: [
          'Du hast es also selbst gerechnet. Gut.',
          'Und nun will ich wieder deine eigene Meinung hören, nicht meine.'
        ],
        after() { openReflexion(); }
      };
    }
    if (STORY.gateBestanden) {
      return { lines: [
        'Du weißt jetzt, woher der Gewinn kommt. Das ist mehr, als die meisten je erfahren.',
        'Aber es geht weiter. Denn diese Arbeit tut noch etwas anderes mit dir – sie macht dich dir selbst fremd.',
        'Geh weiter zum Fließband, wenn du bereit bist.'
      ] };
    }
    return {
      lines: [
        'Du hast deine Schichten hinter dir. Sag mir: Wie viel Stoff hast du gemacht?',
        'Und wie viel davon ist bei dir geblieben?',
        'Ich habe einen Satz dafür aufgeschrieben. Merk ihn dir, er beschreibt genau das, was du hier erlebt hast:',
        '„Das Kapital ist verstorbne Arbeit, die sich nur vampyrmäßig belebt durch Einsaugung lebendiger Arbeit – und um so mehr lebt, je mehr sie davon einsaugt.“',
        'Die Maschine dort drüben ist tote Arbeit. Erst deine Hände machen sie lebendig. Und je mehr sie von dir bekommt, desto größer wird sie.',
        'Ich weiß es. Du weißt es jetzt auch. Aber du sollst es benennen können.'
      ],
      after() { openGate(); }
    };
  },

  tuer() {
    if (!STORY.gateBestanden) {
      return { lines: [
        'Die Tür führt zurück auf die Straße.',
        'Aber deine Schicht ist noch nicht abgerechnet. Marx wartet.'
      ] };
    }
    if (!STORY.reflexionGestellt) {
      return { lines: [
        'Marx wollte noch hören, was du selbst denkst. Sprich zuerst mit ihm.'
      ] };
    }
    return {
      lines: [
        'Du schiebst die Tür auf. Draußen ist die Luft kalt und beißend nach Rauch – ',
        'und nach dem Lärm der Halle fast unheimlich still.'
      ],
      after() { zeigeAbschluss(); }
    };
  },

  webstuhl() {
    if (!STORY.eingewiesen) {
      return { lines: [
        'Der Webstuhl steht still. Vielleicht solltest du zuerst mit dem alten Arbeiter sprechen.'
      ] };
    }
    if (STORY.schichten >= SCHICHTEN.length) {
      return { lines: [
        'Deine Schichten sind abgearbeitet. Der Webstuhl läuft jetzt für jemand anderen.'
      ] };
    }
    return { lines: ['Du legst die Baumwolle ein und trittst an den Webstuhl.'],
             after() { starteSchicht(); } };
  }
};

// ---------- Aufgabe: Mehrwert und Ausbeutung ----------
const GATE_KARTEN = [
  { text: 'Kauft die Baumwolle ein und bezahlt sie',                        klasse: 'U' },
  { text: 'Verwandelt die Baumwolle durch Arbeit in Stoff',                 klasse: 'A' },
  { text: 'Behält den Überschuss, der beim Verkauf übrig bleibt',           klasse: 'U' },
  { text: 'Erhält nur so viel, wie zum Weiterleben nötig ist',              klasse: 'A' },
  { text: 'Besitzt Halle, Webstühle und den fertigen Stoff',                klasse: 'U' },
  { text: 'Schafft den Wertzuwachs, der zwischen Rohstoff und Ware liegt',  klasse: 'A' },
  { text: 'Entscheidet, wie hoch der Stücklohn ist',                        klasse: 'U' },
  { text: 'Verliert die Stelle, wenn eine Maschine die Arbeit übernimmt',   klasse: 'A' }
];

// WICHTIG – Unterscheidung, die im Geschichtsunterricht zählt:
// M7 und M8 sind die BLAUEN Kästen des Schulbuchs, also Marx' Kernthesen in
// heutiger Sprache (Darstellung), KEINE wörtlichen Zitate. Nur "kapital" unten
// ist ein echtes Zitat. Die Kennzeichnung im Spiel muss das abbilden.
//
// Der Wortlaut beider Kapital-Zitate ist gegen MEW 23, S. 247 geprüft
// (Kapitel 8, „Der Arbeitstag"). Die Schreibweise „vampyrmäßig" und die
// alte Form „verstorbne" stehen so im Original und werden nicht modernisiert.
const QUELLEN = {
  kapital: {
    ref: 'Karl Marx: „Das Kapital“, Band I (1867)',
    nachweis: 'Wörtliches Zitat aus Kapitel 8 („Der Arbeitstag“). Marx starb 1883, ' +
              'das Werk ist gemeinfrei.',
    zitat: 'Das Kapital hat aber einen einzigen Lebenstrieb, den Trieb, sich zu verwerten, ' +
           'Mehrwert zu schaffen … Das Kapital ist verstorbne Arbeit, die sich nur vampyrmäßig ' +
           'belebt durch Einsaugung lebendiger Arbeit und um so mehr lebt, je mehr sie davon ' +
           'einsaugt.'
  },
  mehrwert: {
    ref: 'Was Marx damit meint',
    art: '',
    nachweis: 'Zusammenfassung in heutiger Sprache, für dieses Spiel geschrieben – kein Zitat.',
    keinZitat: true,
    zitat: '„Verstorbne Arbeit“ nennt Marx die Maschinen und das Material: In ihnen steckt Arbeit, ' +
           'die längst getan ist. Von allein bringen sie nichts hervor. Erst die lebendige Arbeit ' +
           'setzt sie in Bewegung – und schafft dabei mehr Wert, als der Lohn beträgt. Aus einem ' +
           'Haufen Baumwolle wird Tuch, das mehr wert ist als die Baumwolle. Diese Differenz nennt ' +
           'Marx den Mehrwert, und sie bleibt beim Besitzer. Der Arbeiter bekommt so viel, wie er ' +
           'braucht, um am nächsten Morgen wieder anfangen zu können.'
  },
  ausbeutung: {
    ref: 'Was Marx damit meint',
    art: '',
    nachweis: 'Zusammenfassung in heutiger Sprache, für dieses Spiel geschrieben – kein Zitat.',
    keinZitat: true,
    zitat: 'Das Bild vom Vampir ist bei Marx keine Beschimpfung, sondern eine Beschreibung: Je mehr ' +
           'fremde Arbeitszeit ein Betrieb aufsaugt, desto besser geht es ihm. Deshalb ist es für ' +
           'jeden Einzelnen vernünftig, den Arbeitstag zu verlängern und den Lohn zu drücken – und ' +
           'weil die Konkurrenz alle dazu zwingt, verschärft sich das mit der Zeit. Menschliche ' +
           'Arbeit durch Maschinen zu ersetzen, gehört zur selben Rechnung. Ausbeutung meint bei ' +
           'Marx also nicht die Bosheit Einzelner, sondern die Bauweise des Systems.'
  }
};

const QUELLEN_FRAGEN = [
  {
    quelle: 'mehrwert', afb: 'AFB I', operator: 'Benennen',
    frage: 'Benenne die beiden Kosten, die der Unternehmer laut Quelle bezahlt. Wähle zwei aus.',
    typ: 'zwei',
    optionen: ['Das Rohmaterial', 'Den Lohn des Arbeiters', 'Eine Steuer an den Staat',
               'Die Miete der Arbeiterwohnung', 'Den Schulbesuch der Kinder', 'Eine Abgabe an die Gewerkschaft'],
    richtig: ['Das Rohmaterial', 'Den Lohn des Arbeiters']
  },
  {
    quelle: 'mehrwert', afb: 'AFB II', operator: 'Erklären',
    frage: 'Erkläre, warum am Ende mehr Geld herauskommt, als der Unternehmer ausgegeben hat.',
    typ: 'eine',
    optionen: [
      'Weil die Arbeit den Rohstoff in etwas Wertvolleres verwandelt, der Lohn dafür aber niedriger ist als dieser Wertzuwachs.',
      'Weil der Unternehmer die Ware zu einem überhöhten Preis verkauft und die Kunden betrügt.',
      'Weil das Rohmaterial mit der Zeit von selbst an Wert gewinnt, wenn es gelagert wird.'
    ],
    richtig: 'Weil die Arbeit den Rohstoff in etwas Wertvolleres verwandelt, der Lohn dafür aber niedriger ist als dieser Wertzuwachs.'
  },
  {
    quelle: 'ausbeutung', afb: 'AFB II', operator: 'Erläutern',
    frage: 'Erläutere, warum sich die Lage der Arbeiter laut Marx mit der Zeit verschlechtert.',
    typ: 'eine',
    optionen: [
      'Weil die Unternehmer im Wettbewerb zueinander stehen und deshalb Löhne senken und Menschen durch Maschinen ersetzen.',
      'Weil die Arbeiter mit der Zeit unaufmerksamer werden und deshalb weniger leisten.',
      'Weil die Rohstoffe knapper werden und die Fabriken deshalb schließen müssen.'
    ],
    richtig: 'Weil die Unternehmer im Wettbewerb zueinander stehen und deshalb Löhne senken und Menschen durch Maschinen ersetzen.'
  }
];
