// Inhalte fuer Areal 0: Fortschritt, Begriffe, NPCs, Dialoge, Aufgaben.
// Grundlage: Schulbuch "Fenster nach Westen", Kapitel 4 (M5-M11).

// Fortschritt der Schüli durch das Areal
const STORY = {
  marxIntro: false,
  arbeiter: false,
  buerger: false,
  gateOffen: false,
  gateBestanden: false,
  reflexionGestellt: false,
  meinung: '',
  fragmente: []
};

// Ungewerteter Reflexionsmoment am Ende von Areal 0 (vgl. Konzept Abschnitt 6):
// getrennt von der Punktbewertung, dient als Diskussionsgrundlage im Unterricht.
// Operator "Beurteilen" (AFB III) – bewusst als Freitext ohne Bewertung
const REFLEXIONSFRAGE =
  'Beurteile: Lässt sich die Gesellschaft, in der du heute lebst, noch in zwei ' +
  'große „feindliche Lager“ einteilen, wie Marx es beschreibt? Und findest du es ' +
  'gerecht, dass wenigen die Fabriken und Maschinen gehören und alle anderen ihre ' +
  'Arbeitskraft verkaufen müssen? Begründe deine Meinung.';

// Theoriefragmente für den Codex
const FRAGMENTS = {
  klassengesellschaft: {
    title: 'Klassengesellschaft',
    kurz: 'Die Gesellschaft zerfällt in zwei Klassen: die einen besitzen die Produktionsmittel, die anderen nur ihre Arbeitskraft.',
    text: 'Marx beschreibt den Kapitalismus als eine Gesellschaft, die im Kern aus zwei Gruppen ' +
          'besteht. Auf der einen Seite steht, wem die Mittel zur Produktion gehören: Fabrikgebäude, ' +
          'Maschinen, Werkzeug, Rohstoffe. Diese Gruppe nennt er Bourgeoisie. Auf der anderen Seite ' +
          'stehen die Industriearbeiter, das Proletariat. Sie bringen nichts in die Produktion ein ' +
          'als ihre eigene Arbeitsfähigkeit und sind darauf angewiesen, sie gegen Lohn anzubieten. ' +
          'Aus dieser ungleichen Ausgangslage folgt für Marx alles Weitere: Wer über die ' +
          'Produktionsmittel verfügt, verfügt damit auch über den Lebensunterhalt der anderen.',
    src: 'Begriff nach Marx/Engels, Manifest der Kommunistischen Partei (1848)'
  },
  manifest: {
    title: 'Bourgeoisie und Proletariat – im Original',
    kurz: 'Marx’ eigene Worte für die beiden Klassen und ihren Gegensatz, nachzulesen im Manifest von 1848.',
    text: '„Die ganze Gesellschaft spaltet sich mehr und mehr in zwei große feindliche Lager, ' +
          'in zwei große, einander direkt gegenüberstehende Klassen: Bourgeoisie und Proletariat.“ — ' +
          '„[Die Bourgeoisie] hat … kein anderes Band zwischen Mensch und Mensch übriggelassen ' +
          'als das nackte Interesse, als die gefühllose „bare Zahlung“.“',
    src: 'Marx/Engels, Manifest der Kommunistischen Partei (1848)'
  },
  histmat: {
    title: 'Historischer Materialismus',
    kurz: 'Geschichte treibt nicht durch Ideen voran, sondern durch die Frage, wem die Produktionsmittel gehören.',
    text: 'Für Marx und Engels verläuft Geschichte nicht zufällig, sondern nach einem wiederkehrenden ' +
          'Muster. Entscheidend ist, wer die wirtschaftliche Grundlage einer Epoche kontrolliert – ' +
          'diese Gruppe lebt vom Ertrag der Arbeit derjenigen, die nichts besitzen. Zwischen beiden ' +
          'wächst ein Konflikt heran, bis die bisher herrschende Gruppe verdrängt wird; so verdrängte ' +
          'in der Französischen Revolution das Bürgertum den Adel. Doch die Ungleichheit verschwindet ' +
          'dadurch nicht: Die Sieger rücken selbst an die Stelle der Herrschenden. Marx erwartete, dass ' +
          'dieser Kreislauf erst endet, wenn niemand mehr Produktionsmittel als Privateigentum kontrolliert.',
    src: 'Begriff nach Marx und Engels'
  }
};

// NPCs mit Position auf der Karte (Weltkoordinaten, bereits mit WORLD_ZOOM)
const NPCS = [
  {
    id: 'marx', name: 'Karl Marx',
    dativ: 'Karl Marx',            // für "mit ... sprechen"
    x: 1150, y: 1150,   // rechts neben dem Brunnen, von dort hält er seine Rede
    file: 'npc_marx.png',
    color: '#6f6396', height: 140
  },
  {
    id: 'arbeiter', name: 'Alter Arbeiter',
    dativ: 'dem alten Arbeiter',
    x: 700, y: 1150,    // links, vor der Fabrikseite
    file: 'npc_arbeiter.png',
    color: '#6b5a44', height: 130
  },
  {
    id: 'buerger', name: 'Fabrikbesitzer',
    dativ: 'dem Fabrikbesitzer',
    x: 2350, y: 1100,   // rechts, vor den Bürgerhäusern
    file: 'npc_fabrikbesitzer.png',
    color: '#4a4a58', height: 138
  },

  // Übergang in die Fabrik. Das Tor steckt im Hintergrundbild, gezeichnet
  // wird nur eine Markierung am Boden.
  {
    id: 'fabriktor', name: 'Tor zur Spinnerei',
    dativ: 'dem Tor zur Spinnerei',
    // Bewusst westlich vom Werkmeister (2400/1600), sonst überlappen sich
    // die Ansprechweiten und einer der beiden wäre nicht erreichbar
    x: 500, y: 850,     // direkt vor dem Fabriktor im Bild
    unsichtbar: true,
    file: '', color: '#000', height: 0
  },

  // --- Belebung der Karte: keine Aufgaben, nur ein paar Zeilen Atmosphäre ---
  {
    id: 'marktfrau', name: 'Marktfrau',
    dativ: 'der Marktfrau',
    x: 1400, y: 1100,   // am ersten Marktstand
    file: 'npc_marktfrau.png',
    color: '#7a5f4a', height: 129
  },
  {
    id: 'kind', name: 'Botenjunge',
    dativ: 'dem Botenjungen',
    x: 1750, y: 1280,
    file: 'npc_kind.png',
    color: '#8a7a5a', height: 106  // Jugendlicher: gut vier Fünftel der Erwachsenengröße
  },
  {
    id: 'aufseher', name: 'Werkmeister',
    dativ: 'dem Werkmeister',
    x: 280, y: 1180,    // an der Fabrikmauer
    file: 'npc_aufseher.png',
    color: '#5a4a3a', height: 134
  },
  {
    id: 'dienstmaedchen', name: 'Dienstmädchen',
    dativ: 'dem Dienstmädchen',
    x: 2620, y: 1280,   // vor dem letzten Bürgerhaus
    file: 'npc_dienstmaedchen.png',
    color: '#6a6a72', height: 127
  }
];

// Umrechnung der Positionen und das Laden der NPC-Bilder übernimmt die Engine.

// ---------- Dialoge ----------
// Jeder Eintrag liefert die Zeilen passend zum aktuellen Fortschritt.
const DIALOGE = {
  marx() {
    if (!STORY.marxIntro) {
      return {
        lines: [
          'Bleib einen Moment stehen. Du siehst müde aus – wie alle auf diesem Platz.',
          'Mein Name ist Karl Marx. Ich schreibe ein Buch über genau das, was du jeden Tag erlebst.',
          'Sieh dich um. Was du hier siehst, ist keine zufällige Ansammlung von Menschen. Du siehst zwei Klassen.',
          'Den einen gehören die Fabriken, die Maschinen, die Werkstätten – die Produktionsmittel. Das ist die Bourgeoisie.',
          'Die anderen besitzen nichts als ihre Arbeitskraft. Sie müssen sie verkaufen, um zu überleben. Das ist das Proletariat. Das bist du.',
          'Und nun hör gut zu, denn das ist meine These: Die Geschichte folgt immer demselben Muster.',
          'Wer die Produktionsmittel besitzt, beutet die aus, die nichts besitzen. Herr und Sklave, Gutsherr und Bauer, Fabrikbesitzer und Arbeiter – immer dasselbe.',
          'Nach einer gewissen Zeit der Unterdrückung wird die herrschende Klasse gestürzt. Du kennst das Beispiel: 1789, in Frankreich.',
          'Das Bürgertum fegte den Adel hinweg – den Klerus und die Feudalherren, die jahrhundertelang über Grund und Boden geherrscht hatten. Ein ganzer Stand verlor seine Macht.',
          'Aber sieh genau hin, was danach geschah. Das Bürgertum hat die Herrschaft nicht abgeschafft. Es hat sie übernommen. Aus den Siegern von damals wurden die Fabrikbesitzer von heute.',
          'Genau das meine ich: Eine neue Klasse nimmt den Platz der alten als Ausbeuter ein. Ein Kreislauf ohne Ende.',
          'Ich nenne das den historischen Materialismus. Merk dir den Begriff – er ist der Schlüssel zu allem, was du hier noch sehen wirst.',
          'Aber glaub mir nicht einfach. Geh und sieh selbst nach.',
          'Sprich mit dem alten Arbeiter drüben bei den Werkstätten – und mit einem der Herren aus den großen Häusern an der breiten Straße.',
          'Dann komm zurück. Ich will hören, ob du den Unterschied benennen kannst.'
        ],
        after() {
          STORY.marxIntro = true;
          Spiel.schalteFragmentFrei('histmat');
        }
      };
    }
    if (STORY.gateBestanden && !STORY.reflexionGestellt) {
      return {
        lines: [
          'Du hast begriffen, was die beiden Klassen unterscheidet. Das ist der Anfang.',
          'Aber Wissen allein genügt mir nicht. Ich will hören, was du selbst darüber denkst.',
          'Und merk dir: Auf diese Frage habe ich keine richtige Antwort für dich. Deine Meinung ist deine eigene.'
        ],
        after() { openReflexion(); }
      };
    }
    if (STORY.gateBestanden) {
      return { lines: [
        'Du hast dir eine eigene Meinung gebildet. Behalte sie – und prüfe sie an dem, was du noch sehen wirst.',
        'Denn die eigentliche Frage kommt erst: Wie genau entsteht der Reichtum des einen aus der Arbeit des anderen?',
        'Geh in die Fabrik, wenn du bereit bist. Dort wirst du es sehen.'
      ] };
    }
    if (STORY.arbeiter && STORY.buerger) {
      return {
        lines: [
          'Du hast beide gehört. Gut.',
          'Der eine besitzt nichts als seine Hände. Der andere besitzt die Fabrik, in der diese Hände arbeiten.',
          'Dann zeig mir jetzt, dass du den Unterschied wirklich benennen kannst.'
        ],
        after() { openGate(); }
      };
    }
    const fehlt = [];
    if (!STORY.arbeiter) fehlt.push('mit dem alten Arbeiter bei den Werkstätten');
    if (!STORY.buerger) fehlt.push('mit dem Fabrikbesitzer an der breiten Straße');
    return { lines: [
      'Noch nicht. Du hast noch nicht mit allen gesprochen.',
      'Sprich zuerst ' + fehlt.join(' und ') + '.',
      'Erst wer beide Seiten gehört hat, kann urteilen.'
    ] };
  },

  arbeiter() {
    if (!STORY.arbeiter) {
      return {
        lines: [
          'Du willst wissen, wie es mir geht? Sieh mich an, dann weißt du es.',
          'Vierzehn Stunden am Webstuhl. Sechs Tage die Woche. Seit ich elf Jahre alt bin.',
          'Was ich besitze, fragst du? (Er lacht trocken.) Diese Jacke. Und meine Hände.',
          'Mehr ist da nicht. Kein Stück Land, keine Maschine, keine Werkstatt. Nur die Kraft in meinen Armen.',
          'Und die verkaufe ich jeden Morgen neu – an den, dem die Fabrik gehört. Sonst haben meine Kinder abends nichts zu essen.',
          'Der Lohn reicht genau so weit, dass ich am nächsten Morgen wieder aufstehen und zur Arbeit gehen kann. Keinen Pfennig weiter.',
          'Der Herr mit dem Bart drüben am Brunnen nennt uns „Proletariat“. Ein feines Wort dafür, dass wir nichts haben außer uns selbst.'
        ],
        after() { STORY.arbeiter = true; }
      };
    }
    return { lines: [
      'Geh zu deinem Bärtigen zurück, Junge. Ich muss weiterarbeiten.',
      'Stehenbleiben kostet Lohn.'
    ] };
  },

  // Übergang zur Fabrik – erst offen, wenn das Areal abgeschlossen ist
  fabriktor() {
    if (!STORY.gateBestanden) {
      return { lines: [
        'Das Tor zur Spinnerei steht offen. Lärm dringt heraus, und es riecht nach heißem Öl.',
        'Aber du bist hier noch nicht fertig. Marx wartet auf dem Marktplatz auf deine Antwort.'
      ] };
    }
    if (!STORY.reflexionGestellt) {
      return { lines: [
        'Bevor du hineingehst: Marx wollte noch wissen, was du selbst denkst.',
        'Geh zurück zu ihm auf den Marktplatz.'
      ] };
    }
    return {
      lines: [
        'Du trittst an das Tor der Spinnerei. Drinnen schlagen die Webstühle im Takt.',
        'Hier hört das Zusehen auf. Hier beginnt die Arbeit.'
      ],
      after() { zeigeAbschluss(); }
    };
  },

  // --- Atmosphäre-NPCs: kurze Zeilen, keine Aufgaben, immer wiederholbar.
  //     Sie bestätigen nebenbei, was Marx behauptet, ohne es zu erklären. ---
  marktfrau() {
    return { lines: [
      'Kohl? Rüben? Oder hast du wieder nichts in der Tasche?',
      'Frag nicht nach den Preisen. Das Mehl kostet doppelt so viel wie im Frühjahr.',
      'Die Herren aus den großen Häusern kaufen bei mir nicht mehr. Denen liefert man ins Haus.'
    ] };
  },

  kind() {
    return { lines: [
      'Botengang für die Spinnerei. Ich darf nicht trödeln, sonst gibt es Ärger.',
      'Nächstes Jahr komme ich an die Maschinen. Dann verdiene ich richtiges Geld, sagt der Vater.',
      'Meine Schwester ist schon drin. Sie ist zehn.'
    ] };
  },

  aufseher() {
    return { lines: [
      'Weitergehen. Hier wird gearbeitet, nicht gestanden.',
      'Ich schreibe auf, wer zu spät kommt. Dreimal zu spät, und du bist raus.',
      'Beschwer dich nicht bei mir. Ich führe nur aus, was mir aufgetragen wird.'
    ] };
  },

  dienstmaedchen() {
    return { lines: [
      'Pst – nicht so laut. Die Herrschaft schläft noch.',
      'Ich stehe um fünf auf und lege mich um elf hin. Dafür habe ich ein Bett und zu essen.',
      'Manche sagen, das sei besser als die Fabrik. Manche sagen, es sei dasselbe.'
    ] };
  },

  buerger() {
    if (!STORY.buerger) {
      return {
        lines: [
          'Was starrst du so? Wenn du Arbeit suchst, geh zum Werkmeister, nicht zu mir.',
          'Ah – du willst wissen, wem das alles hier gehört. Nun gut, ich sage es dir.',
          'Mir gehört die Spinnerei am Kanal. Die Maschinen darin. Die Lagerhallen. Zweihundert Menschen arbeiten für mich.',
          'Man nennt Leute wie mich neuerdings „Bourgeoisie“. Großbürgertum. Ich nenne es schlicht: Ich habe etwas aufgebaut.',
          'Und vergiss nicht, was wir geschaffen haben. Noch nie in der Geschichte konnten so viele Güter so schnell und so günstig hergestellt werden.',
          'Die Leibeigenschaft ist vorbei. Dein Großvater gehörte noch einem Gutsherrn. Du dagegen kannst gehen, wohin du willst.',
          'Dass ich dabei reicher werde als du – nun ja. Mir gehört die Fabrik, ich trage das Risiko. Dir gehört deine Arbeitskraft.',
          'Und die kaufe ich dir ab. Ein Geschäft unter Freien, würde ich sagen.'
        ],
        after() { STORY.buerger = true; }
      };
    }
    return { lines: [
      'Wir sind fertig miteinander. Ich habe Geschäfte.',
      'Und du hast, nehme ich an, eine Schicht.'
    ] };
  }
};

// ---------- Quellenanalyse-Gate (Basis: M6) ----------
const GATE_KARTEN = [
  { text: 'Verfügt über die Produktionsmittel: Gebäude, Maschinen, Rohstoffe', klasse: 'B' },
  { text: 'Zu ihr gehören die Eigentümer der großen Betriebe', klasse: 'B' },
  { text: 'Ihr heutiges Gegenstück wären Konzerneigentümer und Großanleger', klasse: 'B' },
  { text: 'Kauft fremde Arbeitskraft ein und bestimmt den Lohn', klasse: 'B' },
  { text: 'Besitzt nichts außer der eigenen Arbeitskraft', klasse: 'P' },
  { text: 'Muss die eigene Arbeitskraft verkaufen, um leben zu können', klasse: 'P' },
  { text: 'Das sind die Industriearbeiter', klasse: 'P' },
  { text: 'Hat weder Fabriken noch Maschinen im Besitz', klasse: 'P' }
];

// ---------- Originalquellen (Phase 2 des Abschlussquiz) ----------
// Beide Zitate stammen aus dem Kommunistischen Manifest und sind gemeinfrei.
const QUELLE_WERK = 'Karl Marx / Friedrich Engels: „Manifest der Kommunistischen Partei“, 1848';

// Beide Zitate im Wortlaut gegen Kapitel I geprüft. Beim zweiten steht im
// Original „Sie hat …“; wer damit gemeint ist, steht Sätze vorher. Die
// Ergänzung in eckigen Klammern und die Auslassungspunkte sind deshalb
// gesetzt – so, wie es die Schülis beim Zitieren selbst lernen sollen.
const QUELLEN = {
  m11: {
    ref: 'Manifest, Kapitel I – die zwei Klassen',
    zitat: 'Die ganze Gesellschaft spaltet sich mehr und mehr in zwei große feindliche Lager, ' +
           'in zwei große, einander direkt gegenüberstehende Klassen: Bourgeoisie und Proletariat.'
  },
  m10: {
    ref: 'Manifest, Kapitel I – die Bourgeoisie',
    zitat: '[Die Bourgeoisie] hat … kein anderes Band zwischen Mensch und Mensch übriggelassen ' +
           'als das nackte Interesse, als die gefühllose „bare Zahlung“.'
  }
};

// Operatorgestützte Fragen mit steigendem Anforderungsbereich (AFB I–II;
// der AFB-III-Teil ist der ungewertete Freitext am Ende)
const QUELLEN_FRAGEN = [
  {
    quelle: 'm11', afb: 'AFB I', operator: 'Benennen',
    frage: 'Benenne die beiden Klassen, die Marx in dieser Quelle einander gegenüberstellt. Wähle zwei aus.',
    typ: 'zwei',
    optionen: ['Bourgeoisie', 'Proletariat', 'Adel', 'Klerus', 'Zünfte', 'Bauernstand'],
    richtig: ['Bourgeoisie', 'Proletariat']
  },
  {
    quelle: 'm11', afb: 'AFB II', operator: 'Erklären',
    frage: 'Erkläre, was Marx mit „zwei große feindliche Lager“ meint.',
    typ: 'eine',
    optionen: [
      'Die Interessen beider Klassen sind unvereinbar: Was die eine Seite gewinnt, verliert die andere.',
      'Die beiden Klassen wohnen in verschiedenen Stadtvierteln und begegnen sich kaum.',
      'Die Gesellschaft zerfällt in immer mehr kleine Gruppen mit eigenen Interessen.'
    ],
    richtig: 'Die Interessen beider Klassen sind unvereinbar: Was die eine Seite gewinnt, verliert die andere.'
  },
  {
    quelle: 'm10', afb: 'AFB II', operator: 'Erläutern',
    frage: 'Erläutere, was Marx der Bourgeoisie in dieser Quelle vorwirft.',
    typ: 'eine',
    optionen: [
      'Sie habe menschliche Beziehungen auf das Geldverhältnis reduziert – es zähle nur noch, was sich bezahlen lässt.',
      'Sie habe den Arbeitern verboten, sich in Gewerkschaften zusammenzuschließen.',
      'Sie habe die Maschinen eingeführt und dadurch die Handarbeit zerstört.'
    ],
    richtig: 'Sie habe menschliche Beziehungen auf das Geldverhältnis reduziert – es zähle nur noch, was sich bezahlen lässt.'
  }
];
