// Inhalte für Areal 5: Krisenplatz.
// Kernbegriffe Krise/Überproduktion (M16), klassenlose Gesellschaft
// (Manifest) und – als Abschluss des Spiels – Narrativ.
// Grundlage: Schulbuch "Fenster nach Westen", Kapitel 4.
//
// Didaktischer Aufbau in fünf Zügen:
//   1. Die Krise: volle Lager hinter verschlossenem Tor. Zu viel Ware,
//      deshalb keine Arbeit. M16 wird über drei kurze Gespräche getragen.
//   2. Marx' Ziel: die klassenlose Gesellschaft, mit echtem Manifest-Zitat.
//      Staatsauflösung und Diktatur des Proletariats bleiben bewusst außen
//      vor – zu weit für diese Stufe, und Stoff für den Petersburg-Epilog.
//   3. Der Sprung in die Gegenwart: zwei DARSTELLUNGEN (keine Quellen!) von
//      Amazon und Mondragón. Der Vergleich läuft über die Codex-Begriffe –
//      damit wird der Codex vom Sammelalbum zum Werkzeug.
//   4. Eigene Positionierung (Freitext, ungewertet).
//   5. Narrativ: Der Fabrikbesitzer erzählt dieselben acht Jahre als SEINE
//      Geschichte, ohne ein einziges Mal zu lügen. Erst nach der
//      Zuordnungsaufgabe fällt der Begriff. Erfahrung vor Definition.
//
// ACHTUNG vor dem Unterrichtseinsatz: Die Zahlen in den beiden
// Gegenwartsdarstellungen sind mit Stand 2025/2026 notiert und sollten
// einmal gegengeprüft werden – besonders Beschäftigtenzahl und Anteil von
// Bezos. Sie sind bewusst als Größenordnungen formuliert, nicht auf die
// Stelle genau.

const STORY = {
  gesprochen: [],           // wartende, arbeiter, marktfrau
  zielGehoert: false,       // Marx hat sein Ziel erklärt
  gate1: false,             // Krise + Manifest
  gate2: false,             // Vergleich Amazon / Mondragón
  position: '',             // Freitext 1 (eigene Positionierung)
  positionGestellt: false,
  besitzerGehoert: false,   // Gegenerzählung gehört
  gate3: false,             // Zuordnung: wer erzählt was
  narrativMeinung: '',      // Freitext 2 (was das Spiel nicht zeigte)
  narrativGestellt: false,
  fragmente: []
};

const POSITIONSFRAGE =
  'Beurteile: Hinter den beiden Betrieben stehen zwei verschiedene Antworten ' +
  'auf dieselbe Frage – wem soll gehören, womit gearbeitet wird? Welche der ' +
  'beiden Antworten überzeugt dich mehr, und warum? Begründe mit den ' +
  'Begriffen aus deinem Codex, und sag auch, was dich an der anderen Antwort ' +
  'stört.';

// Bewusst mit Anschubhilfe: Die Frage ist die abstrakteste des Spiels,
// und sie kommt am Ende einer langen Sitzung.
const NARRATIVFRAGE =
  'Dieses Spiel hat dir acht Jahre lang eine Version erzählt – die von Marx. ' +
  'Nenne eine Sache, die darin nicht vorkam. ' +
  '(Wenn du nicht weiterkommst: Denk an das, was der Fabrikbesitzer gerade ' +
  'gesagt hat. Oder überleg, ob dir im Spiel jemals jemand begegnet ist, dem ' +
  'es durch die Fabrik besser ging.)';

const FRAGMENTS = {
  krise: {
    title: 'Krise und Überproduktion',
    kurz: 'Weil alle die Löhne drücken, fehlt am Ende die Kundschaft: Die Lager sind voll und die Menschen ohne Arbeit.',
    text: 'Jeder Fabrikbesitzer drückt die Löhne, um billiger zu sein als die Konkurrenz. Für sich ' +
          'genommen ist das vernünftig. Zusammengenommen ruiniert es den Absatz: Die Arbeitenden ' +
          'sind zugleich die Kundschaft, und wer wenig verdient, kauft wenig. Irgendwann ist mehr ' +
          'produziert, als gekauft werden kann. Dann stehen die Lager voll und die Maschinen still – ' +
          'und die Menschen haben keine Arbeit, weil zu viel da ist, nicht weil zu wenig da ist. ' +
          'Marx sah in diesen wiederkehrenden Krisen keinen Betriebsunfall, sondern die Bauweise ' +
          'des Systems selbst.',
    src: 'Begriff nach Marx/Engels, Manifest der Kommunistischen Partei (1848)'
  },
  klassenlos: {
    title: 'Klassenlose Gesellschaft',
    kurz: 'Gehören die Produktionsmittel allen, kann niemand mehr von fremder Arbeit leben – dann gibt es keine zwei Klassen mehr.',
    text: 'Marx’ Ziel war keine bessere Verteilung innerhalb der bestehenden Ordnung, sondern das ' +
          'Ende der Trennung selbst: Wenn die Produktionsmittel – Fabriken, Maschinen, Land – nicht ' +
          'mehr wenigen Einzelnen gehören, sondern der Gemeinschaft, kann auch niemand mehr von ' +
          'fremder Arbeit leben. Damit gäbe es keine zwei Klassen mehr, die sich gegenüberstehen, ' +
          'und der Maßstab wäre ein anderer: „Jeder nach seinen Fähigkeiten, jedem nach seinen ' +
          'Bedürfnissen.“ Wie diese Gesellschaft im Einzelnen aussehen sollte, hat Marx bewusst ' +
          'offengelassen – er hielt es für unseriös, das im Voraus auszumalen.',
    src: 'Manifest der Kommunistischen Partei (1848); die Formel „Jeder nach seinen Fähigkeiten …“ ' +
         'aus: Kritik des Gothaer Programms (1875)'
  },
  ordnungen: {
    title: 'Kapitalismus und Sozialismus',
    kurz: 'Zwei Antworten auf dieselbe Frage: Wem soll gehören, womit gearbeitet wird?',
    text: 'Beide Wörter bezeichnen mehr als eine Wirtschaftsweise – sie sind zwei ganze ' +
          'Vorstellungen davon, wie Menschen zusammenleben sollen. Im Kapitalismus gehören die ' +
          'Produktionsmittel Einzelnen; wer besitzt und wer das Risiko trägt, entscheidet, und der ' +
          'Wettbewerb gilt als der Antrieb, der allen nützt. Im Sozialismus gehören sie denen, die ' +
          'mit ihnen arbeiten; entschieden wird gemeinsam, und der Maßstab ist nicht der Gewinn, ' +
          'sondern der Nutzen für alle. Aus beiden folgt jeweils eine ganze Kette weiterer ' +
          'Antworten: was gerecht ist, was Leistung wert ist, worauf Geschichte hinausläuft. ' +
          'Deshalb streiten sich daran bis heute politische Lager – es geht nie nur um Zahlen.',
    src: 'Grundbegriffe der politischen Ideengeschichte'
  },
  narrativ: {
    title: 'Narrativ',
    kurz: 'Aus denselben Tatsachen lassen sich verschiedene Geschichten bauen, je nachdem, was man auswählt und weglässt.',
    text: 'Aus vielen einzelnen Tatsachen wird nicht von selbst eine Geschichte. Jemand muss ' +
          'auswählen: Was kommt vor und was nicht, was steht am Anfang, was am Ende, worauf läuft ' +
          'es hinaus. Diese Auswahl mitsamt der Deutung, die in ihr steckt, nennt man ein Narrativ. ' +
          'Der Fabrikbesitzer und du habt dieselben acht Jahre erzählt, keiner von euch hat gelogen – ' +
          'und trotzdem waren es zwei verschiedene Geschichten. Marx’ Erklärung des Kapitalismus ist ' +
          'ein solches Narrativ, ein außerordentlich wirkungsmächtiges. Und dieses Spiel hat es dir ' +
          'von innen erzählt: Du hast fünf Stationen lang genau das erlebt, was Marx vorhergesagt ' +
          'hat. Das lag daran, dass es so gebaut wurde.',
    src: 'Begriff aus der Geschichtswissenschaft; Jahresthema der 10b'
  }
};

// ---------- Quellen für Gate 1 ----------
// Zuerst Marx im Wortlaut, dann unsere eigene Erklärung dazu. Beides ist
// eigens gekennzeichnet – auf dieser Unterscheidung baut Zug 5 auf.
// Die Schülis haben das Schulbuch nicht; deshalb steht im Spiel keine
// M-Nummer und kein Verweis, den sie nicht nachschlagen können.
const QUELLEN = {
  krise: {
    ref: 'Marx/Engels: Manifest der Kommunistischen Partei (1848)',
    nachweis: 'Wörtliches Zitat aus Kapitel I. Gemeinfrei; Marx starb 1883, Engels 1895.',
    zitat: 'In den Krisen bricht eine gesellschaftliche Epidemie aus, welche allen früheren ' +
           'Epochen als ein Widersinn erschienen wäre – die Epidemie der Überproduktion.'
  },
  kriseKurz: {
    ref: 'Was Marx damit meint',
    art: '',
    nachweis: 'Zusammenfassung in heutiger Sprache, für dieses Spiel geschrieben – kein Zitat.',
    keinZitat: true,
    zitat: 'Eine Epidemie ist etwas, das sich ausbreitet und krank macht. Marx nennt die ' +
           'Überproduktion so, weil sie genau umgekehrt läuft wie jede Not davor: Früher litten ' +
           'die Menschen, wenn es zu wenig gab. Jetzt stehen sie ohne Arbeit da, weil es zu viel ' +
           'gibt. Der Grund: Jeder Unternehmer senkt die Löhne, um billiger anzubieten – und ' +
           'senkt damit zugleich die Kaufkraft derer, die seine Waren kaufen sollen. Am Ende ist ' +
           'mehr hergestellt, als sich verkaufen lässt, die Lager sind voll, die Produktion steht. ' +
           'Marx erwartete, dass solche Krisen wiederkehren und dabei immer heftiger ausfallen.'
  },
  manifest: {
    ref: 'Marx/Engels: Manifest der Kommunistischen Partei (1848)',
    nachweis: 'Wörtliches Zitat aus dem Schluss des zweiten Kapitels. Marx und Engels ' +
              'veröffentlichten das Manifest im Februar 1848 in London; es ist gemeinfrei.',
    zitat: 'An die Stelle der alten bürgerlichen Gesellschaft mit ihren Klassen und ' +
           'Klassengegensätzen tritt eine Assoziation, worin die freie Entwicklung eines jeden ' +
           'die Bedingung für die freie Entwicklung aller ist.'
  }
};

const QUELLEN_FRAGEN = [
  {
    quelle: 'krise', afb: 'AFB I', operator: 'Benennen',
    frage: 'Benenne, was Marx als „Epidemie“ bezeichnet.',
    typ: 'eine',
    optionen: [
      'Die Überproduktion – dass mehr hergestellt wird, als sich verkaufen lässt.',
      'Eine Krankheit, die sich in den Arbeitervierteln ausbreitet.',
      'Die wachsende Zahl der Streiks in den Fabriken.'
    ],
    richtig: 'Die Überproduktion – dass mehr hergestellt wird, als sich verkaufen lässt.'
  },
  {
    quelle: 'kriseKurz', afb: 'AFB II', operator: 'Erklären',
    frage: 'Erkläre, warum ausgerechnet das Lohndrücken der einzelnen Unternehmer am Ende allen schadet.',
    typ: 'eine',
    optionen: [
      'Weil die Arbeitenden zugleich die Kundschaft sind: Wer wenig verdient, kann wenig kaufen.',
      'Weil die Unternehmer sich gegenseitig die besten Arbeiter abwerben und dabei draufzahlen.',
      'Weil der Staat bei zu niedrigen Löhnen die Ausfuhr von Waren verbietet.'
    ],
    richtig: 'Weil die Arbeitenden zugleich die Kundschaft sind: Wer wenig verdient, kann wenig kaufen.'
  },
  {
    quelle: 'manifest', afb: 'AFB II', operator: 'Erläutern',
    frage: 'Erläutere, was nach dem Zitat an die Stelle der alten Gesellschaft treten soll.',
    typ: 'eine',
    optionen: [
      'Eine Gemeinschaft ohne Klassengegensätze, in der die freie Entwicklung jedes Einzelnen ' +
        'Voraussetzung für die aller ist.',
      'Eine Gesellschaft, in der die bisherigen Arbeiter die Stelle der bisherigen Besitzer einnehmen.',
      'Ein Staat, der die Löhne festsetzt und die Preise überwacht.'
    ],
    richtig: 'Eine Gemeinschaft ohne Klassengegensätze, in der die freie Entwicklung jedes Einzelnen ' +
             'Voraussetzung für die aller ist.'
  }
];

// ---------- Zug 3: zwei Darstellungen aus der Gegenwart ----------
// Ausdrücklich DARSTELLUNGEN, keine Quellen: von mir zusammengestellte
// Beschreibungen zweier realer Unternehmen. Genau diese Unterscheidung
// wird in Zug 5 gebraucht.
const DARSTELLUNGEN = [
  {
    titel: 'A: Amazon',
    art: 'Darstellung – zusammengestellte Beschreibung, kein Quellentext',
    punkte: [
      ['Gegründet', '1994 von Jeff Bezos, zunächst als Online-Buchhandel.'],
      ['Größe', 'Weltweit über eine Million Beschäftigte, davon ein großer Teil in Lagerhallen ' +
                'und in der Zustellung.'],
      ['Wem gehört der Betrieb?', 'Den Aktionären. Größter einzelner Anteilseigner ist der ' +
                'Gründer mit rund neun Prozent; sein Privatvermögen wird auf einen dreistelligen ' +
                'Milliardenbetrag geschätzt.'],
      ['Wer entscheidet?', 'Die Konzernführung. Wer im Lager arbeitet, entscheidet über den ' +
                'Betrieb nicht mit.'],
      ['Wohin geht der Überschuss?', 'In Investitionen und an die Anteilseigner – über ' +
                'Kursgewinne und Rückkäufe eigener Aktien.'],
      ['Wie wird gearbeitet?', 'Die Lagerarbeit ist digital getaktet: Handscanner erfassen, wie ' +
                'viele Artikel pro Stunde gegriffen werden. Der Takt gibt die Maschine vor.']
    ]
  },
  {
    titel: 'B: Mondragón',
    art: 'Darstellung – zusammengestellte Beschreibung, kein Quellentext',
    punkte: [
      ['Gegründet', '1956 in der baskischen Stadt Mondragón, aus einer kleinen Werkstatt und ' +
                'einer Berufsschule heraus.'],
      ['Größe', 'Ein Verbund von Genossenschaften mit rund 70.000 Beschäftigten – Industrie, ' +
                'Handel, eine eigene Bank und eine Hochschule.'],
      ['Wem gehört der Betrieb?', 'Den Mitgliedern, also den Beschäftigten selbst. Wer ' +
                'aufgenommen wird, legt eine Einlage ein und wird Miteigentümer.'],
      ['Wer entscheidet?', 'Die Generalversammlung. Jedes Mitglied hat eine Stimme – unabhängig ' +
                'davon, wie viel Kapital es eingelegt hat.'],
      ['Wohin geht der Überschuss?', 'In Rücklagen, in neue Investitionen und zu einem Teil an ' +
                'die Mitglieder. Der Abstand zwischen höchstem und niedrigstem Einkommen ist ' +
                'begrenzt und lag in den Genossenschaften lange bei etwa 1:6.'],
      // Gegenstück zur selben Kategorie bei Amazon. Wichtig gegen das
      // Missverständnis, in einer Genossenschaft sei die Arbeit selbst eine
      // andere – der Unterschied liegt beim Eigentum, nicht am Band.
      ['Wie wird gearbeitet?', 'Auch hier ist es Industriearbeit: Schichten, Fließbänder, ' +
                'Stückvorgaben. Der Unterschied liegt nicht darin, wie sich die Arbeit anfühlt, ' +
                'sondern darin, wem der Betrieb gehört und wer über ihn bestimmt.'],
    ]
  }
];

// ---------- Zug 3: das Abschlussquiz ----------
// Der Vergleich läuft ausdrücklich über die Begriffe aus dem Codex.
const VERGLEICH_FRAGEN = [
  {
    afb: 'AFB I', operator: 'Benennen',
    quelleRef: 'A: Amazon',
    frage: 'Benenne, wem bei Amazon die Produktionsmittel gehören – also Lagerhallen, ' +
           'Fahrzeuge und Rechenzentren.',
    typ: 'eine',
    optionen: [
      'Den Aktionären, nicht denen, die dort arbeiten.',
      'Zu gleichen Teilen den Beschäftigten und den Aktionären.',
      'Dem Staat, der sie an das Unternehmen verpachtet.'
    ],
    richtig: 'Den Aktionären, nicht denen, die dort arbeiten.'
  },
  {
    afb: 'AFB II', operator: 'Erklären',
    quelleRef: 'B: Mondragón',
    frage: 'Erkläre mit dem Begriff Mehrwert, warum sich die Lage in einer Genossenschaft anders darstellt.',
    typ: 'eine',
    optionen: [
      'Der Überschuss geht an dieselben Menschen, die ihn erarbeitet haben – es gibt keine ' +
        'getrennte Gruppe, die davon lebt.',
      'In einer Genossenschaft entsteht gar kein Mehrwert, weil nichts verkauft wird.',
      'Der Mehrwert wird vollständig an den Staat abgeführt und dort verteilt.'
    ],
    richtig: 'Der Überschuss geht an dieselben Menschen, die ihn erarbeitet haben – es gibt keine ' +
             'getrennte Gruppe, die davon lebt.'
  },
  {
    afb: 'AFB II', operator: 'Erläutern',
    quelleRef: 'A: Amazon',
    frage: 'Erläutere, warum in den beiden Betrieben verschiedene Leute entscheiden – und was ' +
           'das mit der Eigentumsfrage zu tun hat.',
    typ: 'eine',
    optionen: [
      'Wem der Betrieb gehört, der bestimmt auch, wer entscheidet: bei Amazon die ' +
        'Konzernführung für die Aktionäre, bei Mondragón die Mitgliederversammlung, in der ' +
        'jedes Mitglied eine Stimme hat.',
      'Die Entscheidung liegt in beiden Fällen bei denen, die am längsten im Betrieb sind.',
      'Bei Amazon entscheiden die Beschäftigten über die Löhne, bei Mondragón der Staat.'
    ],
    richtig: 'Wem der Betrieb gehört, der bestimmt auch, wer entscheidet: bei Amazon die ' +
             'Konzernführung für die Aktionäre, bei Mondragón die Mitgliederversammlung, in der ' +
             'jedes Mitglied eine Stimme hat.'
  }
];

// ---------- Zug 5: dieselben acht Jahre, zwei Erzählungen ----------
// Jede dieser sechs Aussagen ist wahr und deckt sich mit dem, was der
// Spieler in den Arealen 1 bis 3 tatsächlich erlebt oder gesehen hat.
// Genau darauf beruht die Pointe: Es wird nirgends gelogen.
const ERZAEHLUNGEN = [
  { text: 'Dein Wochenlohn ist in acht Jahren von zwölf auf sechs Taler gefallen.',
    spalte: 'du' },
  { text: 'Von 70 Talern, die du in der Spinnerei erarbeitet hast, wurden dir 11 ausgezahlt.',
    spalte: 'du' },
  { text: 'Vier Meister mit eigenem Betrieb stehen heute selbst am Fabriktor.',
    spalte: 'du' },
  { text: 'Wo vier kleine Werkstätten standen, arbeiten heute zweihundert Menschen unter einem Dach.',
    spalte: 'er' },
  { text: 'Ein Ballen Tuch kostet heute halb so viel wie 1861 – auch für Arbeiterfamilien.',
    spalte: 'er' },
  { text: 'Wer heute in der Fabrik anfängt, muss dafür keine siebenjährige Lehre mehr durchlaufen.',
    spalte: 'er' }
];

const NPCS = [
  {
    id: 'marx', name: 'Karl Marx',
    dativ: 'Karl Marx',
    x: 1000, y: 1080,
    file: 'npc_marx.png',
    color: '#6f6396', height: 288
  },
  {
    id: 'wartende', name: 'Die Wartenden',
    dativ: 'den Wartenden',
    x: 1450, y: 780,
    file: 'npc_arbeitergruppe.png',
    color: '#5f5344', height: 264
  },
  {
    id: 'arbeiter', name: 'Alter Arbeiter',
    dativ: 'dem alten Arbeiter',
    x: 430, y: 1060,   // rechts neben der Feuertonne
    file: 'npc_arbeiter.png',
    color: '#6b5a44', height: 267
  },
  {
    id: 'marktfrau', name: 'Marktfrau',
    dativ: 'der Marktfrau',
    x: 730, y: 920,    // vor dem mittleren Marktstand
    file: 'npc_marktfrau.png',
    color: '#7a5f4a', height: 264
  },
  {
    id: 'besitzer', name: 'Fabrikbesitzer',
    dativ: 'dem Fabrikbesitzer',
    x: 2000, y: 1080,
    file: 'npc_fabrikbesitzer.png',
    color: '#4a4a58', height: 294
  },
  {
    id: 'ausgang', name: 'Weg aus dem Viertel',
    dativ: 'dem Weg aus dem Viertel',
    x: 1408, y: 1440,
    miniatur: { x: 1408, y: 1250, groesse: 500 },
    unsichtbar: true,
    file: '', color: '#000', height: 0
  }
];

function merkeGespraech(id) {
  if (STORY.gesprochen.indexOf(id) === -1) STORY.gesprochen.push(id);
}

const DIALOGE = {
  wartende() {
    if (STORY.gate1) {
      return { lines: [
        '„Sie sagen, im Frühjahr geht es vielleicht wieder los."',
        '„Vielleicht."'
      ] };
    }
    return {
      lines: [
        'Vierzig, fünfzig Menschen stehen vor dem verschlossenen Tor. Niemand geht, niemand ' +
        'kommt herein.',
        '„Seit Dienstag ist zu. Sie sagen, das Lager ist voll."',
        '„Voll. Verstehst du das? Da drin liegt mehr Tuch als in meinem ganzen Leben durch ' +
        'meine Hände gegangen ist."',
        '„Und wir stehen draußen, weil zu viel davon da ist."'
      ],
      after() { merkeGespraech('wartende'); }
    };
  },

  arbeiter() {
    if (STORY.gate1) {
      return { lines: [
        'Ich habe drei davon erlebt. Die erste hat mich fast umgebracht, bei der zweiten wusste ich ' +
        'schon, wie es geht.',
        'Man gewöhnt sich an alles. Das ist das Schlimme daran.'
      ] };
    }
    return {
      lines: [
        'Das ist nicht das erste Mal. 1857 war es genauso, und davor auch schon.',
        'Erst wird gebaut wie verrückt, alle stellen ein, alle stellen her. Dann steht auf einmal ' +
        'alles still.',
        'Und jedes Mal heißt es, das sei ein Unglück gewesen. Ein Wetterumschwung sozusagen.',
        'Ich weiß nicht viel. Aber ein Wetterumschwung, der alle sieben Jahre kommt, ist kein ' +
        'Wetterumschwung mehr.'
      ],
      after() { merkeGespraech('arbeiter'); }
    };
  },

  marktfrau() {
    if (STORY.gate1) {
      return { lines: [
        'Zwei Stände weiter hat gestern auch zugemacht.',
        'So geht das reihum, bis wieder jemand Geld in der Tasche hat.'
      ] };
    }
    return {
      lines: [
        'Ich stehe hier seit sechs Uhr. Verkauft habe ich nichts.',
        'Es ist ja nicht so, dass die Leute nichts bräuchten. Sie haben nur nichts.',
        'Mein Mehl liegt da, ihr Tuch liegt da drin, und dazwischen sind fünfzig Menschen, die ' +
        'beides gebrauchen könnten.',
        'Erklär mir das mal einer.'
      ],
      after() { merkeGespraech('marktfrau'); }
    };
  },

  besitzer() {
    // Vor dem Narrativ-Teil: kurz, abweisend, aber nicht als Karikatur.
    if (!STORY.positionGestellt) {
      return { lines: [
        'Sie wollen wissen, wann wieder aufgemacht wird. Das wollen alle.',
        'Wenn sich das Lager leert. Vorher wäre es Wahnsinn, weiterzuproduzieren.',
        'Ich stelle niemanden ein, damit er beschäftigt ist. Ich stelle jemanden ein, wenn ich ' +
        'seine Arbeit verkaufen kann.'
      ] };
    }
    if (STORY.gate3) {
      return { lines: [
        'Ich habe Ihnen nichts vorgemacht. Sie können jede Zahl nachprüfen.',
        'Dass Sie am Ende trotzdem seine Geschichte glauben und nicht meine – das ist Ihre ' +
        'Entscheidung, nicht meine Zahl.'
      ] };
    }
    // Zug 5: die Gegenerzählung. Jede Aussage deckt sich mit dem, was der
    // Spieler selbst gesehen hat – hier wird an keiner Stelle gelogen.
    return {
      lines: [
        'Er hat Ihnen also acht Jahre erzählt. Dann erzähle ich Ihnen dieselben acht Jahre.',
        '1861 standen in dieser Straße vier Werkstätten. Zusammen ernährten sie vielleicht ' +
        'dreißig Menschen. Heute arbeiten zweihundert unter meinem Dach.',
        'Ein Ballen Tuch kostet die Hälfte dessen, was er damals kostete. Das heißt: Auch die ' +
        'Frau eines Tagelöhners kann ihre Kinder einkleiden. Vor zwanzig Jahren konnte sie das nicht.',
        'Und wer bei mir anfängt, braucht dafür keine siebenjährige Lehre. Er braucht zwei Wochen. ' +
        'Fragen Sie einen Meister, was er davon hält – und fragen Sie den, der die Lehrjahre ' +
        'nicht bezahlen konnte.',
        'Ich sage nicht, dass es Ihnen gut geht. Ich sage, dass Sie mir nicht erzählen sollen, ' +
        'es sei vorher besser gewesen.'
      ],
      after() {
        STORY.besitzerGehoert = true;
        oeffneErzaehlungen();
      }
    };
  },

  marx() {
    // --- Zug 5b: Auflösung nach der Zuordnung ---
    if (STORY.gate3 && !STORY.narrativGestellt) {
      return {
        lines: [
          'Du hast es sortiert bekommen. Jetzt das Entscheidende: Keine einzige dieser Aussagen ' +
          'ist falsch. Auch seine nicht.',
          'In deiner Erzählung kommt nicht vor, dass Tuch billiger geworden ist. In seiner kommt ' +
          'nicht vor, dass du dabei ärmer geworden bist.',
          'Keiner von euch hat gelogen. Ihr habt ausgewählt. Und die Auswahl ist die Geschichte.',
          'Dafür gibt es ein Wort: ein Narrativ. Ich habe dir eins erzählt, acht Jahre lang, und ' +
          'du hast dabei gestanden.',
          'Ein letztes Mal also, und diesmal gegen mich:'
        ],
        after() { oeffneNarrativfrage(); }
      };
    }
    if (STORY.narrativGestellt) {
      return { lines: [
        'Gut. Behalte das.',
        'Nicht, damit du mir nicht mehr glaubst – sondern damit du weißt, dass du dich entschieden ' +
        'hast, mir zu glauben.',
        'Der Weg aus dem Viertel führt nach Süden. Geh.'
      ] };
    }

    // --- Zug 5a: Hinweis auf den Fabrikbesitzer ---
    if (STORY.positionGestellt && !STORY.besitzerGehoert) {
      return { lines: [
        'Du hast dich festgelegt. Das war der schwerste Teil, und du hast ihn hinter dir.',
        'Bevor du gehst, will ich dir noch etwas zumuten – etwas, das gegen mich spricht.',
        'Der Mann dort drüben hat dieselben acht Jahre erlebt wie du. Lass ihn sie erzählen.',
        'Und hör genau hin, wo er lügt.'
      ] };
    }

    // --- Zug 4: Positionierung ---
    if (STORY.gate2 && !STORY.positionGestellt) {
      return {
        lines: [
          'Zwei Betriebe, dieselben Fragen: Wem gehört es, wer entscheidet, wer bekommt den Überschuss.',
          'Ich sage dir nicht, was daraus folgt. Ich bin seit über hundertvierzig Jahren tot; ' +
          'die Antwort schuldest du deiner eigenen Zeit, nicht meiner.'
        ],
        after() { oeffnePosition(); }
      };
    }

    // --- Zug 3: Sprung in die Gegenwart ---
    if (STORY.gate1 && !STORY.gate2) {
      return {
        lines: [
          'Du weißt jetzt, was ich für das Ende hielt und was ich mir als Ziel dachte.',
          'Was du nicht weißt: ob irgendetwas davon eingetreten ist. Das kann ich dir nicht sagen – ' +
          'ich habe 1883 aufgehört zu schauen.',
          'Aber du kannst schauen. Hier sind zwei Betriebe aus deiner Zeit, beschrieben nach ' +
          'denselben Fragen, die ich dir beigebracht habe.',
          'Und versteh mich nicht falsch: Es geht nicht um Buchhaltung. Hinter den beiden steht ' +
          'jeweils eine ganze Vorstellung davon, wie Menschen zusammenleben sollen.',
          'Die eine sagt: Wer etwas wagt und besitzt, soll darüber bestimmen, und was dabei für ' +
          'alle herausspringt, ist der Beweis, dass es funktioniert. Das nennt man Kapitalismus.',
          'Die andere sagt: Womit gearbeitet wird, soll denen gehören, die damit arbeiten, und ' +
          'entschieden wird gemeinsam. Das nennt man Sozialismus.',
          'Beide sind mehr als Wirtschaftsordnungen. Beide sagen dir, was gerecht ist, was ein ' +
          'Mensch wert ist und worauf Geschichte hinausläuft. Es sind zwei Erzählungen über die ' +
          'Welt – und du wirst dein Leben lang beiden begegnen.',
          'Achtung, und das ist wichtig: Das hier sind keine Quellen. Niemand aus diesen Betrieben ' +
          'spricht selbst. Das sind Darstellungen – jemand hat sie zusammengestellt und dabei ' +
          'ausgewählt, was drinsteht. Merk dir das Wort, wir kommen darauf zurück.',
          'Und jetzt vergleich sie. Mit meinen Begriffen – du hast sie alle im Codex.'
        ],
        after() { oeffneVergleich(); }
      };
    }

    // --- Zug 2: die Krise erklären und das Ziel benennen ---
    if (STORY.gesprochen.length >= 3 && !STORY.zielGehoert) {
      return {
        lines: [
          'Die Marktfrau hat die richtige Frage gestellt. Fünfzig Menschen, die Tuch brauchen, ' +
          'und ein Lager voll Tuch – und dazwischen geht nichts.',
          'Das ist kein Missgeschick. Jeder Besitzer hat die Löhne gedrückt, um billiger zu sein ' +
          'als der Nachbar. Jeder für sich völlig vernünftig.',
          'Nur sind die Arbeitenden zugleich die Kundschaft. Wer allen den Lohn kürzt, kürzt ' +
          'allen die Käufer. Am Ende steht die Ware da und niemand kann sie holen.',
          'Der alte Mann am Feuer hat recht: Das kommt wieder. Und jedes Mal härter.',
          'Und jetzt die Frage, die du dir seit dem Marktplatz stellst: Worauf soll das ' +
          'hinauslaufen? Was will ich eigentlich?'
        ],
        after() {
          STORY.zielGehoert = true;
          oeffneZiel();
        }
      };
    }

    // --- Zug 1: Ankunft ---
    const fehlt = [];
    if (STORY.gesprochen.indexOf('wartende') === -1)  fehlt.push('die Wartenden am Tor');
    if (STORY.gesprochen.indexOf('arbeiter') === -1)  fehlt.push('den alten Arbeiter am Feuer');
    if (STORY.gesprochen.indexOf('marktfrau') === -1) fehlt.push('die Marktfrau');
    return { lines: [
      'Das Tor ist zu. Der Schlot raucht nicht. Und dahinter liegt mehr Tuch, als dieses Viertel ' +
      'in einem Jahr tragen könnte.',
      'Sieh dich um und sprich mit ihnen – ' + fehlt.join(', ') + '.',
      'Danach erkläre ich dir, warum das kein Unfall ist.'
    ] };
  },

  ausgang() {
    if (!STORY.gate1) {
      return { lines: [
        'Der Weg nach Süden, aus dem Viertel hinaus.',
        'Aber du bist hier noch nicht fertig. Marx steht mitten auf dem Platz.'
      ] };
    }
    if (!STORY.narrativGestellt) {
      return { lines: [
        'Noch nicht. Marx hat dir noch etwas zu sagen.'
      ] };
    }
    return {
      lines: [
        'Du gehst nach Süden. Hinter dir bleibt ein Platz mit vollen Lagern und leeren Händen.',
        'Was aus alledem geworden ist, steht in keinem der Bücher, die Marx geschrieben hat. ' +
        'Es ist erst danach passiert.'
      ],
      after() { zeigeAbschluss(); }
    };
  }
};
