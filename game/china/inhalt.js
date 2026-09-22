// Inhalte für die Schlussszene: Schanghai, März 1927.
//
// Kein Areal im eigentlichen Sinn: keine Aufgabe, kein Gate, kein Begriff –
// wie Petrograd ein kurzer Gang. Seit die Unterrichtsreihe China vor Russland
// stellt, endet das Spiel hier statt in Petrograd.
//
// Was die Szene tut:
//
//   1. Sie schließt den Kreis zu Areal 1. Wieder eine Baumwollspinnerei,
//      wieder zwölf Stunden, wieder Ballen am Tor – achtzig Jahre später und
//      am anderen Ende der Welt. Wer in der Fabrikhalle mitgezählt hat,
//      erkennt die Rechnung wieder, ohne dass sie jemand erklären muss.
//   2. Sie zeigt den Bruch ein zweites Mal, eine Stufe weiter als Lenin.
//      Marx erwartete die Revolution in den Fabriken. In China standen zwei
//      Millionen Industriearbeitern vierhundert Millionen Menschen gegenüber,
//      die meisten davon auf dem Land.
//   3. Sie gibt dem Narrativbegriff aus Areal 5 seinen letzten Prüfstein:
//      Drei Männer berufen sich auf denselben Autor und meinen Verschiedenes.
//
// Der Zeitpunkt liegt bewusst VOR dem 12. April 1927, genau wie Petrograd vor
// dem Oktober liegt: Die Arbeiter haben die Stadt seit dem 21. März selbst in
// der Hand, die Armee der Guomindang steht davor, und es ist offen, was
// passiert. Was drei Wochen später geschieht, ist der erste Satz der nächsten
// Stunde, nicht der letzte dieser.
//
// Urheberrecht: Mao starb 1976, seine Texte sind bis 2046 geschützt. Der
// Bericht aus Hunan wird deshalb nirgends zitiert, sondern in eigenen Worten
// zusammengefasst; Mao selbst wird erst im Abschlusstext benannt und tritt
// nicht auf – er war im Frühjahr 1927 in Hunan, nicht in Schanghai.

const STORY = {
  gesehen: [],            // spinnerinnen, posten, student, bote
  auftaktGezeigt: false,
  fragmente: []           // die Szene schaltet nichts frei
};

const FRAGMENTS = {};

const AUFTAKT = {
  ort: 'Schanghai, März 1927',
  zeilen: [
    'Zehn Jahre nach Petrograd. Achttausend Kilometer weiter östlich.',
    'Auch hier wird Baumwolle zu Stoff. Die Spinnereien im Norden der Stadt gehören ' +
    'britischen und japanischen Gesellschaften. Gearbeitet wird zwölf Stunden, ' +
    'überwiegend von Frauen und Kindern.',
    'Seit dem einundzwanzigsten März gehört die Stadt den Arbeitern. Sie haben sie ' +
    'selbst eingenommen: erst der Generalstreik, dann fünftausend Bewaffnete – und die ' +
    'Behörden waren weg.',
    'Die Armee der Guomindang steht vor der Stadt. Was sie tun wird, weiß an diesem ' +
    'Tag niemand.',
    'Du bist wieder nicht dieselbe Person. Du stehst nur an derselben Stelle.'
  ]
};

const NPCS = [
  {
    id: 'spinnerinnen', name: 'Die Spinnerinnen',
    dativ: 'den Spinnerinnen',
    x: 1450, y: 890,   // sitzend an der Mauer, deshalb tiefer und flacher
    file: 'npc_spinnerinnen.png',
    color: '#5f5344', height: 150
  },
  {
    id: 'posten', name: 'Der Streikposten',
    dativ: 'dem Streikposten',
    x: 700, y: 1020,
    file: 'npc_posten.png',
    color: '#6b5a44', height: 250
  },
  {
    id: 'student', name: 'Der Student',
    dativ: 'dem Studenten',
    x: 1080, y: 1180,
    file: 'npc_student.png',
    color: '#7a5f4a', height: 246
  },
  {
    id: 'bote', name: 'Der Mann aus Hunan',
    dativ: 'dem Mann aus Hunan',
    x: 2350, y: 1050,
    file: 'npc_bote.png',
    color: '#5a4a3a', height: 254
  },
  {
    id: 'tor', name: 'Das Tor der Spinnerei',
    dativ: 'dem Tor der Spinnerei',
    x: 1810, y: 900,
    miniatur: { x: 1810, y: 620, groesse: 460 },
    unsichtbar: true,
    file: '', color: '#000', height: 0
  }
];

function merkeGesehen(id) {
  if (STORY.gesehen.indexOf(id) === -1) STORY.gesehen.push(id);
  Spiel.speichern();
}

const DIALOGE = {

  // Die Klammer zu Areal 1. Bewusst dieselbe Rechnung, nur ohne Zahlen –
  // die Zahlen haben die Schülis dort selbst aufgeschrieben.
  spinnerinnen() {
    if (STORY.gesehen.indexOf('spinnerinnen') !== -1) {
      return { lines: [
        'Sie sitzen weiter an der Mauer. Solange gestreikt wird, laufen die Maschinen nicht.'
      ] };
    }
    return {
      lines: [
        'Drei Frauen sitzen neben dem Tor auf dem Boden, die Rücken an der Mauer. ' +
        'An ihren Ärmeln hängen Baumwollfasern.',
        '„Zwölf Stunden. Vierzehn, wenn die Maschinen laufen müssen."',
        '„Die Baumwolle kommt über das Meer, die Maschinen kommen aus England, und die ' +
        'Spinnerei gehört einer Gesellschaft, deren Namen wir nicht aussprechen können."',
        'Du kennst diese Rechnung. Du hast sie in deiner ersten Schicht selbst aufgemacht – ' +
        'nur waren es dort Taler, und es war achtzig Jahre früher.'
      ],
      after() { merkeGesehen('spinnerinnen'); }
    };
  },

  // Dieselbe Offenheit wie in Petrograd: Es ist noch nicht entschieden.
  posten() {
    if (STORY.gesehen.indexOf('posten') !== -1) {
      return { lines: [
        'Er steht, wo er stand, und sieht die Straße hinunter.',
        '„Noch ist nichts passiert."'
      ] };
    }
    return {
      lines: [
        'Ein junger Mann mit einer roten Binde am Arm steht vor dem Tor. Ein Gewehr hat ' +
        'er nicht, nur einen Stock.',
        '„Seit dem einundzwanzigsten gehört die Stadt uns. Erst haben wir gestreikt, dann ' +
        'haben wir sie genommen. Fünftausend von uns hatten Waffen."',
        '„Die Behörden sind weg. Die Gewerkschaft verteilt das Brot. Es funktioniert."',
        'Er zeigt mit dem Stock nach Westen, wo die Straße aus der Stadt führt.',
        '„Und dort draußen steht die Armee und wartet."'
      ],
      after() { merkeGesehen('posten'); }
    };
  },

  // Die Verbindung zurück nach Petrograd – und zugleich das Eingeständnis,
  // dass Marx' Voraussetzung hier nicht stimmt.
  student() {
    if (STORY.gesehen.indexOf('student') !== -1) {
      return { lines: [
        '„Zwei Millionen", sagt er noch einmal. „Und vierhundert Millionen."'
      ] };
    }
    return {
      lines: [
        'Er spricht dich auf Englisch an, langsam und sorgfältig, als hätte er die Sätze geübt.',
        '„Vor sechs Jahren haben sich in dieser Stadt dreizehn Leute in einem Hinterzimmer ' +
        'getroffen und eine Partei gegründet. Nach dem Vorbild dessen, was in Russland ' +
        'passiert ist."',
        '„Wir haben Marx gelesen, wir haben Lenin gelesen. Beide waren sich einig: Die ' +
        'Revolution kommt aus den Fabriken. Also sind wir in die Fabriken gegangen."',
        'Er zeigt die Straße hinunter – auf die Ballen, das Tor, die Frauen an der Mauer.',
        '„Und hier stehen wir. Zwei Millionen Industriearbeiter, sagen die Zahlen. In einem ' +
        'Land mit vierhundert Millionen Menschen."'
      ],
      after() { merkeGesehen('student'); }
    };
  },

  // Der Bruch. Kein Zitat, keine berühmte Person: ein Bote mit einem Bericht.
  // Wer ihn geschrieben hat, sagt erst der Abschlusstext.
  bote() {
    if (STORY.gesehen.indexOf('bote') !== -1) {
      return { lines: [
        'Er hat das Bündel Papier wieder unter den Arm geklemmt.',
        '„Vierhundert Millionen", sagt er. „Fragt euch, was ihr damit macht."'
      ] };
    }
    return {
      lines: [
        'Er ist vor zwei Tagen angekommen, mit einem Bündel Papier unter dem Arm. Seine ' +
        'Schuhe sind nicht die eines Städters.',
        '„Ich komme aus Hunan. Dort ist diesen Winter etwas passiert, das hier keiner glaubt."',
        '„Die Bauern haben sich zusammengetan. Nicht ein Dorf – hunderte. Sie haben die ' +
        'Pachtverträge verbrannt und die Grundherren aus den Häusern geholt. Zwei Millionen ' +
        'stehen in den Bauernverbänden, und hinter jedem Namen steht eine Familie."',
        '„Einer von uns war dort und hat aufgeschrieben, was er gesehen hat. Sein Bericht ' +
        'sagt: Die Kraft, die dieses Land umwirft, steht nicht in euren Fabriken. Sie steht ' +
        'auf den Feldern."',
        'Er sieht die Straße hinunter zum Tor der Spinnerei.',
        '„Marx hat von den Arbeitern geschrieben. Bei uns sind neun von zehn Menschen Bauern. ' +
        'Was machen wir damit?"'
      ],
      after() { merkeGesehen('bote'); }
    };
  },

  tor() {
    if (STORY.gesehen.length < 4) {
      const fehlt = [];
      if (STORY.gesehen.indexOf('spinnerinnen') === -1) fehlt.push('die Frauen an der Mauer');
      if (STORY.gesehen.indexOf('posten') === -1)       fehlt.push('den Posten am Tor');
      if (STORY.gesehen.indexOf('student') === -1)      fehlt.push('den Studenten');
      if (STORY.gesehen.indexOf('bote') === -1)         fehlt.push('den Mann mit dem Bündel');
      return { lines: [
        'Das Tor ist zu. An den Flügeln hängen rote Tücher, und heute geht niemand hinein.',
        'Sieh dich erst um – ' + fehlt.join(', ') + '. Du bist nur einmal hier.'
      ] };
    }
    return {
      lines: [
        'Das erste Fabriktor in diesem Spiel war verriegelt, und dahinter lag Tuch, das ' +
        'niemand kaufen konnte.',
        'Das zweite stand offen, mit einer roten Fahne am Flügel.',
        'Dieses hier ist geschlossen, weil gestreikt wird. Drinnen stehen dieselben ' +
        'Maschinen wie in deiner ersten Schicht.',
        'Drei Männer haben dir heute erklärt, was zu tun ist. Alle drei berufen sich auf ' +
        'denselben Mann. Keine zwei von ihnen meinen dasselbe.'
      ],
      after() { zeigeAbschluss(); }
    };
  }
};
