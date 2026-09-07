// Inhalte für Areal 3: Stadtviertel.
// Kernbegriffe Konzentration des Kapitals (M15) und Verelendung (M17).
// Grundlage: Schulbuch "Fenster nach Westen", Kapitel 4.
//
// Didaktischer Kern: Dieselbe Straße wird dreimal begangen. Zwischen den
// Durchgängen vergehen Jahre – Werkstätten schließen, ihre Meister stehen
// danach selbst auf der Straße, und der eigene Lohn sinkt. Die beiden
// Thesen greifen dadurch sichtbar ineinander: Konzentration erzeugt
// Verelendung, statt nur behauptet zu werden.

const STORY = {
  jahr: 0,               // 0, 1, 2 – Index in ZEITSTUFEN
  besucht: [],           // in dieser Zeitstufe schon angesprochene Meister
  gateBestanden: false,
  reflexionGestellt: false,
  meinung: '',
  fragmente: []
};

const REFLEXIONSFRAGE =
  'Beurteile: Der Fabrikbesitzer sagt, er habe niemanden verdrängt – er habe ' +
  'nur billiger produziert, und die Kundschaft habe entschieden. Die Meister ' +
  'sagen, sie hätten gar keine Chance gehabt, mitzuhalten. Wer hat aus deiner ' +
  'Sicht recht? Und findest du es in Ordnung, dass es so gelaufen ist?';

const FRAGMENTS = {
  konzentration: {
    title: 'Konzentration des Kapitals',
    kurz: 'Wer schon groß ist, produziert billiger, verdrängt die Kleinen und wird dadurch noch größer.',
    text: 'Wer im Wettbewerb bereits groß ist, kann in bessere Maschinen investieren und dadurch ' +
          'billiger anbieten als kleine Betriebe. Diese verlieren ihre Kundschaft und geben auf; ' +
          'ihre Anteile fallen an die Großen, die dadurch noch größer werden. Marx erwartete, dass ' +
          'sich dieser Vorgang immer weiter fortsetzt, bis nur noch wenige, sehr große Unternehmen ' +
          'übrig sind. Der Wettbewerb frisst so nach und nach seine eigenen Teilnehmer.',
    src: 'Begriff nach Marx, Das Kapital, Band I (1867)'
  },
  verelendung: {
    title: 'Verelendung',
    kurz: 'Je mehr Betriebe schließen, desto mehr Menschen suchen Arbeit – und desto tiefer lassen sich die Löhne drücken.',
    text: 'Wenn Betriebe schließen und Maschinen menschliche Arbeit ersetzen, suchen mehr Menschen ' +
          'Arbeit, als Stellen da sind. Wer einstellt, kann dann den Lohn drücken – wer ablehnt, ' +
          'wird ersetzt. So sinken die Löhne genau dann, wenn die Not am größten ist. Marx erwartete ' +
          'deshalb, dass die Kluft immer weiter aufgeht: wenige, die immer reicher werden, und ' +
          'immer mehr, die immer ärmer werden.',
    src: 'Begriff nach Marx, Das Kapital, Band I (1867)'
  }
};

// ---------- Die drei Zeitstufen ----------
// "offen" nennt die Werkstätten, die zu diesem Zeitpunkt noch arbeiten.
const ZEITSTUFEN = [
  {
    titel: 'Frühjahr 1861',
    offen: ['weber', 'schuster', 'schmied', 'baecker'],
    lohn: 12,
    ankunft: 'Vier Werkstätten, vier Meister. In der Fabrik am Ende der Straße rauchen die Schlote.'
  },
  {
    titel: 'Herbst 1864 – drei Jahre später',
    offen: ['schmied', 'baecker'],
    lohn: 9,
    ankunft: 'Zwei Läden sind vernagelt. Vor ihnen stehen Männer, die du als Meister gekannt hast.'
  },
  {
    titel: 'Winter 1869 – wieder fünf Jahre',
    offen: [],
    lohn: 6,
    ankunft: 'Kein einziger Laden hat mehr offen. Die Straße gehört jetzt der Fabrik.'
  }
];

const MEISTER = [
  { id: 'weber',    name: 'Weber Kalthoff',   dativ: 'dem Weber',    x:  197, y: 480 },
  { id: 'schuster', name: 'Schuster Rieff',   dativ: 'dem Schuster', x:  611, y: 480 },
  { id: 'schmied',  name: 'Schmied Bartold',  dativ: 'dem Schmied',  x: 1024, y: 480 },
  { id: 'baecker',  name: 'Bäcker Lemm',      dativ: 'dem Bäcker',   x: 1452, y: 480 }
];

const NPCS = [
  {
    id: 'marx', name: 'Karl Marx',
    dativ: 'Karl Marx',
    x: 150, y: 880,   // unten auf dem Pflaster, weit genug vom Weber weg
    file: 'npc_marx.png',
    color: '#6f6396', height: 281
  },
  {
    id: 'weber', name: 'Weber Kalthoff', dativ: 'dem Weber',
    x:  197, y: 480,
    file: 'npc_aufseher.png',      // Meister in bürgerlicher Kleidung
    color: '#5a4a3a', height: 278
  },
  {
    id: 'schuster', name: 'Schuster Rieff', dativ: 'dem Schuster',
    x:  611, y: 480,
    file: 'npc_arbeiter.png',
    color: '#6b5a44', height: 270
  },
  {
    id: 'schmied', name: 'Schmied Bartold', dativ: 'dem Schmied',
    x: 1024, y: 480,
    file: 'npc_aufseher.png',
    color: '#5a4a3a', height: 284
  },
  {
    id: 'baecker', name: 'Bäcker Lemm', dativ: 'dem Bäcker',
    x: 1452, y: 480,
    file: 'npc_arbeiter.png',
    color: '#6b5a44', height: 274
  },
  {
    id: 'fabrik', name: 'Tor der großen Fabrik',
    dativ: 'dem Tor der großen Fabrik',
    x: 2276, y: 520,
    miniatur: { x: 2237, y: 300, groesse: 320 },
    unsichtbar: true,
    file: '', color: '#000', height: 0
  }
];

// ---------- Dialoge der vier Meister, je Zeitstufe ----------
// Erste Stufe: selbstbewusst. Zweite: bedrängt oder schon gescheitert.
// Dritte: alle auf der Straße.
const MEISTER_TEXTE = {
  weber: [
    [ 'Kalthoff, Weberei in dritter Generation. Sechs Stühle, vier Gesellen.',
      'Die Fabrik da hinten webt schneller als wir, das stimmt. Aber unser Tuch hält länger.',
      'Die Leute wissen das. Noch.' ],
    [ 'Zugenagelt. Ja. Sehen Sie sich ruhig um.',
      'Sie haben ihr Tuch für den halben Preis verkauft. Ich hätte draufgezahlt bei jedem Ballen.',
      'Meine Gesellen sind jetzt dort drin. Ich stehe hier.' ],
    [ 'Fragen Sie nicht nach Arbeit, ich habe selbst keine.',
      'Fünfzehn Jahre eigener Betrieb, und jetzt stelle ich mich morgens ans Tor wie alle anderen.',
      'Und weil wir so viele sind, zahlen sie, was sie wollen.' ]
  ],
  schuster: [
    [ 'Schuhe, Stiefel, Reparaturen. Alles von Hand, alles hier in der Werkstatt.',
      'Maschinen für Schuhe? Das wird nie etwas. Ein Fuß ist keine Baumwolle.',
      'Kommen Sie in fünf Jahren wieder, dann stehe ich immer noch hier.' ],
    [ 'Sagen Sie nichts. Ich weiß, was ich damals gesagt habe.',
      'Sie machen jetzt auch Schuhe da drüben. Nicht gute. Aber billige.',
      'Und billig schlägt gut, wenn die Leute nichts haben.' ],
    [ 'Ich flicke noch, wenn jemand kommt. Es kommt selten jemand.',
      'Wer nichts verdient, kauft keine neuen Schuhe. Und wer keine neuen Schuhe kauft, lässt auch keine flicken.',
      // Keine geschlechtsgebundene Anrede: die Spielfigur kann weiblich sein
      'Es hängt eben alles zusammen. Alles.' ]
  ],
  schmied: [
    [ 'Bartold. Beschläge, Werkzeug, Wagenteile.',
      'Ich habe einen Vorteil: Die Fabrik braucht Ersatzteile, und die schmiede ich ihr.',
      'Solange sie mich braucht, komme ich durch.' ],
    [ 'Noch da, ja. Aber sie drücken den Preis bei jeder Bestellung.',
      'Und sie lassen mich wissen, dass sie die Teile auch selbst gießen könnten. Jederzeit.',
      'Man arbeitet anders, wenn man weiß, dass man ersetzbar ist.' ],
    [ 'Sie gießen jetzt selbst. Vor zwei Monaten kam die letzte Bestellung.',
      'Ich habe zwanzig Jahre für sie gearbeitet, und es brauchte einen Brief, um das zu beenden.',
      'Meinen Amboss habe ich verkauft. An sie.' ]
  ],
  baecker: [
    [ 'Brot, jeden Morgen um vier. Das Viertel isst mein Brot.',
      'Mir kann die Fabrik nichts anhaben. Brot backt keine Maschine.',
      'Und die Arbeiter dort drüben, das sind meine besten Kunden.' ],
    [ 'Ich backe noch. Aber ich backe weniger.',
      'Meine Kunden verdienen weniger als früher, also kaufen sie weniger. So einfach ist das.',
      'Ich bin nicht von der Fabrik verdrängt worden. Ich verhungere an ihren Löhnen.' ],
    [ 'Letzte Woche zugemacht. Nicht, weil jemand billiger gebacken hätte.',
      'Sondern weil niemand mehr genug hatte, um zu kaufen.',
      'Sie haben mich nicht besiegt. Sie haben mir die Kundschaft ausgehungert.' ]
  ]
};

function meisterDialog(id) {
  const texte = MEISTER_TEXTE[id][STORY.jahr];
  return {
    lines: texte,
    after() {
      if (STORY.besucht.indexOf(id) === -1) STORY.besucht.push(id);
    }
  };
}

const DIALOGE = {
  weber:    () => meisterDialog('weber'),
  schuster: () => meisterDialog('schuster'),
  schmied:  () => meisterDialog('schmied'),
  baecker:  () => meisterDialog('baecker'),

  marx() {
    const stufe = ZEITSTUFEN[STORY.jahr];
    const alleGesprochen = STORY.besucht.length >= 4;

    if (STORY.gateBestanden && !STORY.reflexionGestellt) {
      return {
        lines: [
          'Du hast den Verlauf vor Augen. Jetzt will ich wieder dein Urteil hören, nicht meines.'
        ],
        after() { openReflexion(); }
      };
    }
    if (STORY.gateBestanden) {
      return { lines: [
        'Vier Werkstätten, acht Jahre, ein Ergebnis. Und dein Lohn ist dabei um die Hälfte gefallen.',
        'Merke dir: Das war kein Unglück und keine böse Absicht. Das war der Wettbewerb, der wie vorgesehen funktioniert hat.',
        'Was daraus folgt, wirst du im Versammlungsraum hören.'
      ] };
    }
    if (!alleGesprochen) {
      return { lines: [
        stufe.ankunft,
        'Geh die Straße ab und sprich mit allen vier Meistern. Auch mit denen, die keinen Laden mehr haben.',
        'Und behalte deinen Wochenlohn im Auge. Er steht oben links.'
      ] };
    }
    if (STORY.jahr < ZEITSTUFEN.length - 1) {
      return {
        lines: [
          'Du hast sie alle gehört. Und nun lass Zeit vergehen.',
          'Nicht viel. Ein paar Jahre nur. Dieselbe Straße, dieselben Menschen.'
        ],
        after() { naechsteZeitstufe(); }
      };
    }
    return {
      lines: [
        'Dreimal dieselbe Straße. Jetzt sag mir, was du gesehen hast.',
        'Nicht vier einzelne Unglücke. Eine Kette, in der jedes Glied das nächste zieht.',
        'Bring die Glieder in die richtige Ordnung.'
      ],
      after() { openGate(); }
    };
  },

  fabrik() {
    if (!STORY.gateBestanden) {
      return { lines: [
        'Das Tor der großen Fabrik. Sie ist gewachsen, während ringsum alles kleiner wurde.',
        'Aber du bist hier noch nicht fertig. Marx wartet am anderen Ende der Straße.'
      ] };
    }
    if (!STORY.reflexionGestellt) {
      return { lines: [
        'Marx wollte noch dein Urteil hören. Sprich zuerst mit ihm.'
      ] };
    }
    return {
      lines: [
        'Du blickst am Tor hinauf. Der Schlot wirft seinen Schatten über die ganze Straße.',
        'Irgendwo dahinter arbeiten Kalthoff, Rieff, Bartold und Lemm – als Tagelöhner.'
      ],
      after() { zeigeAbschluss(); }
    };
  }
};

// ---------- Aufgabe: die Ursachenkette (M15 + M17) ----------
// In der RICHTIGEN Reihenfolge notiert; die Engine mischt beim Anzeigen.
const KETTE = [
  'Große Betriebe haben mehr Kapital und können in bessere Maschinen investieren.',
  'Dadurch stellen sie ihre Waren billiger her als die kleinen Werkstätten.',
  'Die kleinen Werkstätten verlieren ihre Kundschaft und müssen schließen.',
  'Ihre Meister und Gesellen suchen nun selbst eine Anstellung.',
  'Es bewerben sich mehr Menschen um Arbeit, als es Stellen gibt.',
  'Wer einstellt, kann deshalb immer niedrigere Löhne durchsetzen.',
  'Die Kluft zwischen wenigen sehr Reichen und vielen Armen wird größer.'
];

// Zwei kurze Marx-Zitate im Wortlaut, dazu jeweils unsere eigene Erklärung.
// Beide geprüft gegen Das Kapital, Band I: die Konzentration steht in
// Kapitel 24 („Geschichtliche Tendenz der kapitalistischen Akkumulation"),
// die Verelendung in Kapitel 23. Beim ersten Satz fällt in fast allen
// Zitatsammlungen das „Je" weg – hier steht es, weil es im Original steht.
const QUELLEN = {
  konzentration: {
    ref: 'Karl Marx: „Das Kapital“, Band I (1867)',
    nachweis: 'Wörtliches Zitat aus Kapitel 24. Gemeinfrei; Marx starb 1883.',
    zitat: 'Je ein Kapitalist schlägt viele tot.'
  },
  konzentrationKurz: {
    ref: 'Was Marx damit meint',
    art: '',
    nachweis: 'Zusammenfassung in heutiger Sprache, für dieses Spiel geschrieben – kein Zitat.',
    keinZitat: true,
    zitat: '„Totschlagen“ ist wirtschaftlich gemeint, nicht blutig: Wer schon groß ist, hat mehr ' +
           'Kapital, kann in bessere Maschinen investieren und dadurch billiger anbieten. Die ' +
           'kleinen Werkstätten verlieren ihre Kundschaft und geben auf; ihr Anteil fällt an die ' +
           'Großen, die dadurch noch größer werden. Marx erwartete, dass sich das immer weiter ' +
           'fortsetzt, bis nur noch wenige, sehr große Unternehmen übrig sind. Der Wettbewerb ' +
           'frisst so nach und nach seine eigenen Teilnehmer.'
  },
  verelendung: {
    ref: 'Karl Marx: „Das Kapital“, Band I (1867)',
    nachweis: 'Wörtliches Zitat aus Kapitel 23 („Das allgemeine Gesetz der kapitalistischen ' +
              'Akkumulation“). Gemeinfrei.',
    zitat: 'Die Akkumulation von Reichtum auf dem einen Pol ist also zugleich Akkumulation von ' +
           'Elend, Arbeitsqual, Sklaverei, Unwissenheit, Brutalisierung und moralischer ' +
           'Degradation auf dem Gegenpol.'
  },
  verelendungKurz: {
    ref: 'Was Marx damit meint',
    art: '',
    nachweis: 'Zusammenfassung in heutiger Sprache, für dieses Spiel geschrieben – kein Zitat.',
    keinZitat: true,
    zitat: 'Akkumulation heißt Anhäufung. Marx sagt: Reichtum und Elend häufen sich nicht ' +
           'zufällig nebeneinander an, sondern durch denselben Vorgang. Wenn Betriebe schließen ' +
           'und Maschinen menschliche Arbeit ersetzen, suchen mehr Menschen Arbeit, als Stellen ' +
           'da sind. Wer einstellt, kann dann den Lohn drücken – wer ablehnt, wird ersetzt. So ' +
           'sinken die Löhne genau dann, wenn die Not am größten ist. Die beiden „Pole“ sind ' +
           'also die zwei Enden einer einzigen Bewegung.'
  }
};

const QUELLEN_FRAGEN = [
  {
    quelle: 'konzentrationKurz', afb: 'AFB I', operator: 'Benennen',
    frage: 'Benenne den Vorteil, den große Betriebe laut Quelle gegenüber kleinen haben.',
    typ: 'eine',
    optionen: [
      'Sie haben mehr Kapital und können deshalb mehr in Maschinen investieren.',
      'Sie dürfen als Einzige mit dem Ausland handeln.',
      'Ihre Arbeiter sind besser ausgebildet als die der kleinen Werkstätten.'
    ],
    richtig: 'Sie haben mehr Kapital und können deshalb mehr in Maschinen investieren.'
  },
  {
    quelle: 'verelendungKurz', afb: 'AFB II', operator: 'Erklären',
    frage: 'Erkläre, warum die Löhne gerade dann sinken, wenn viele Menschen Arbeit suchen.',
    typ: 'eine',
    optionen: [
      'Weil es mehr Bewerber als Stellen gibt: Wer den Lohn ablehnt, wird sofort ersetzt.',
      'Weil Arbeitslose weniger Erfahrung haben und deshalb weniger leisten.',
      'Weil der Staat in Krisenzeiten die Löhne gesetzlich senkt.'
    ],
    richtig: 'Weil es mehr Bewerber als Stellen gibt: Wer den Lohn ablehnt, wird sofort ersetzt.'
  },
  {
    quelle: 'verelendung', afb: 'AFB II', operator: 'Erläutern',
    frage: 'Marx nennt zwei „Pole“. Erläutere, was auf dem einen und was auf dem anderen wächst.',
    typ: 'eine',
    optionen: [
      'Auf dem einen Pol häuft sich Reichtum an, auf dem anderen Elend – und beides durch denselben Vorgang.',
      'Auf dem einen Pol steht die Stadt, auf dem anderen das Land.',
      'Auf dem einen Pol stehen die Maschinen, auf dem anderen die Werkzeuge der Handwerker.'
    ],
    richtig: 'Auf dem einen Pol häuft sich Reichtum an, auf dem anderen Elend – und beides durch denselben Vorgang.'
  }
];
