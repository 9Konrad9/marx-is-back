// Inhalte für Areal 4: Versammlungsraum.
// Kernbegriff Klassenkampf (M18).
// Grundlage: Schulbuch "Fenster nach Westen", Kapitel 4.
//
// Didaktischer Kern: eine echte Entscheidung mit erzählerischer Konsequenz.
// Drei Wege, je zwei Beats. KEIN Weg ist der richtige – die anschließende
// Reflexionsfrage wäre sonst nicht ehrlich. Bewertet wird nur das Gate.
//
// Die Konsequenzen sind mit Blättern aus Käthe Kollwitz' Zyklus
// "Ein Weberaufstand" (1893–1897) bebildert; Herkunft und Lizenz siehe
// assets/quellen/HERKUNFT.md.

const STORY = {
  gesprochen: [],          // arbeiter, marktfrau, gruppe
  entscheidung: '',        // '', 'bittschrift', 'gewerkschaft', 'streik'
  beat: 0,                 // wie viele Konsequenzen schon gezeigt wurden
  gateBestanden: false,
  reflexionGestellt: false,
  meinung: '',
  fragmente: []
};

const REFLEXIONSFRAGE =
  'Was hättest du an der Stelle der Arbeiter getan – und würdest du das auch ' +
  'heute noch für richtig halten? Begründe deine Entscheidung und beziehe dich ' +
  'darauf, was danach tatsächlich geschehen ist.';

const FRAGMENTS = {
  klassenkampf: {
    title: 'Klassenkampf',
    kurz: 'Die Fabrik bringt die Arbeitenden erstmals in großer Zahl an einen Ort – und schafft sich damit ihre eigenen Gegner.',
    text: 'Für Marx stehen sich die beiden Klassen nicht bloß gegenüber, sie geraten notwendig ' +
          'aneinander: Was die eine an Lohn gewinnt, verliert die andere an Gewinn. Entscheidend ' +
          'ist für ihn, dass die Fabriken die Arbeitenden erstmals in großer Zahl an einem Ort ' +
          'versammeln. Dort erkennen sie, dass ihre Lage kein persönliches Pech ist, sondern allen ' +
          'gemeinsam widerfährt – und sie können sich verabreden. Aus vielen einzelnen Beschwerden ' +
          'wird so eine organisierte Bewegung. Marx erwartete, dass daraus am Ende der Sturz der ' +
          'bestehenden Ordnung folgt.',
    src: 'Begriff nach Marx/Engels, Manifest der Kommunistischen Partei (1848)'
  },
  revolution: {
    title: 'Sozialismus und Kommunismus',
    kurz: 'Sozialismus: Die Produktionsmittel gehören allen. Kommunismus: die Klassen sind verschwunden, und der Maßstab ist der Bedarf.',
    text: 'Marx’ Ziel war nicht ein höherer Lohn, sondern eine andere Eigentumsordnung. Solange die ' +
          'Produktionsmittel Einzelnen gehören, wiederholt sich für ihn dasselbe Verhältnis immer ' +
          'wieder. Den Schritt, mit dem die Arbeitenden sie in gemeinsame Hände nehmen, nennt er ' +
          'Revolution. Für den Zustand danach kursieren zwei Wörter, die oft verwechselt werden. ' +
          'Sozialismus meint die erste Stufe: Die Produktionsmittel gehören allen, gearbeitet wird ' +
          'weiter, und der Ertrag richtet sich nach der Leistung. Kommunismus meint die weitere ' +
          'Stufe, in der es die beiden Klassen nicht mehr gibt und nicht die Leistung den Maßstab ' +
          'bildet, sondern der Bedarf: „Jeder nach seinen Fähigkeiten, jedem nach seinen ' +
          'Bedürfnissen.“ Wie diese Gesellschaft im Einzelnen aussehen sollte, hat Marx bewusst ' +
          'offengelassen – er hielt es für unseriös, das im Voraus auszumalen.',
    src: 'Begriffe nach Marx; die Formel aus: Kritik des Gothaer Programms (1875)'
  },
  wege: {
    title: 'Reform oder Revolution',
    kurz: 'Die Arbeiterbewegung war sich nie einig, ob man das System verbessern oder stürzen soll; beide Wege wurden gegangen.',
    text: 'Die Arbeiterbewegung war sich über den Weg nie einig. Der eine Flügel setzte auf ' +
          'Gewerkschaften, Wahlrecht und Sozialgesetze – Verbesserungen innerhalb der bestehenden ' +
          'Ordnung. Der andere hielt das für Flickwerk und erwartete den Umsturz. Beide Wege sind ' +
          'historisch beschritten worden, beide haben etwas erreicht und beide haben einen Preis ' +
          'gefordert. Wer heute urteilt, sollte wissen, dass die Beteiligten damals nicht wussten, ' +
          'wie es ausgeht.',
    src: 'Zur Geschichte der Arbeiterbewegung im 19. Jahrhundert'
  }
};

// ---------- Die drei Wege ----------
// Jeder Weg hat zwei Beats: unmittelbare Reaktion, dann die Folge Wochen später.
const WEGE = {
  bittschrift: {
    label: 'Eine Bittschrift aufsetzen',
    kurz: 'Höflich, schriftlich, mit allen Unterschriften. Niemand riskiert seine Stelle.',
    // zu-Infinitiv für den Rückblick im Abschlusstext
    vorschlag: 'eine Bittschrift aufzusetzen',
    beats: [
      {
        titel: 'Zwei Tage später',
        text: 'Der Werkmeister nimmt das Papier entgegen, liest die erste Zeile und faltet es ' +
              'wieder zusammen. Er sagt, er werde es weiterreichen. Er sagt es freundlich.',
        bild: null
      },
      {
        titel: 'Sechs Wochen später',
        text: 'Eine Antwort kommt nie. Der Lohn bleibt, wie er ist, die Schicht bleibt, wie sie ' +
              'ist. Zwei von euch fragen nach; man sagt ihnen, die Sache werde geprüft. ' +
              'Es hat niemanden etwas gekostet – und nichts hat sich verändert.',
        bild: '../../assets/quellen/kollwitz_not_plate.jpg',
        bildnachweis: 'Käthe Kollwitz: „Ein Weberaufstand“, Blatt 1 „Not“, 1893–1897. ' +
                      'Statens Museum for Kunst, Kopenhagen (CC0).'
      }
    ]
  },

  gewerkschaft: {
    label: 'Eine Gewerkschaft gründen',
    kurz: 'Langsam, unauffällig, Beitrag für Beitrag. Es dauert – und es fällt auf.',
    vorschlag: 'eine Gewerkschaft zu gründen',
    beats: [
      {
        titel: 'Nach vier Wochen',
        text: 'Neunundvierzig Namen stehen auf der Liste, jeder zahlt wöchentlich einen Pfennig ' +
              'in die Kasse. Ihr trefft euch weiter im Hinterzimmer, aber ihr seid keine Handvoll ' +
              'mehr. Der Werkmeister weiß es. Er sagt noch nichts.',
        bild: null
      },
      {
        titel: 'Im Frühjahr darauf',
        text: 'Zwei von denen, die die Liste führten, sind entlassen worden – aus Gründen, die ' +
              'niemand nachprüfen kann. Die Kasse besteht trotzdem weiter, und als im Sommer eine ' +
              'Familie ihren Ernährer verliert, zahlt sie zum ersten Mal aus. Wenig. Aber es ist ' +
              'da, und es gehört euch.',
        // Bewusst nicht "Weberzug": das Blatt wird im Gate ausführlich analysiert
        // und soll dort zum ersten Mal auftauchen.
        bild: '../../assets/quellen/kollwitz_beratung_plate.jpg',
        bildnachweis: 'Käthe Kollwitz: „Ein Weberaufstand“, Blatt 3 „Beratung“, 1893–1897. ' +
                      'Statens Museum for Kunst, Kopenhagen (CC0).'
      }
    ]
  },

  streik: {
    label: 'Sofort streiken',
    kurz: 'Alle Maschinen stehen lassen, morgen früh. Sofort spürbar – und ohne Rückweg.',
    vorschlag: 'sofort zu streiken',
    beats: [
      {
        titel: 'Am nächsten Morgen',
        text: 'Um sechs steht die Halle still. Zum ersten Mal hört ihr, wie leise dieses Gebäude ' +
              'sein kann. Am Tor sammeln sich die Familien. Am dritten Tag lässt der Besitzer ' +
              'das Tor verriegeln.',
        bild: '../../assets/quellen/kollwitz_sturm_plate.jpg',
        bildnachweis: 'Käthe Kollwitz: „Ein Weberaufstand“, Blatt 5 „Sturm“, 1893–1897. ' +
                      'Statens Museum for Kunst, Kopenhagen (CC0).'
      },
      {
        titel: 'Nach elf Tagen',
        text: 'Der Stücklohn wird um einen halben Taler angehoben – weniger, als ihr gefordert ' +
              'habt, aber mehr als nichts. Vierzehn von euch werden nicht wieder eingestellt. ' +
              'Zwei Männer sind bei der Räumung des Tores zu Tode gekommen. Was ihr erreicht habt, ' +
              'steht im Lohnbuch. Was es gekostet hat, steht nirgends.',
        bild: '../../assets/quellen/kollwitz_ende_plate.jpg',
        bildnachweis: 'Käthe Kollwitz: „Ein Weberaufstand“, Blatt 6 „Ende“, 1893–1897. ' +
                      'Statens Museum for Kunst, Kopenhagen (CC0).'
      }
    ]
  }
};

const NPCS = [
  {
    id: 'marx', name: 'Karl Marx',
    dativ: 'Karl Marx',
    // Abstand zum Rednerpult so gewählt, dass er bei der jetzigen Figurengröße
    // vollständig sichtbar bleibt und nicht oben angeschnitten wird
    x: 1408, y: 790,
    file: 'npc_marx.png',
    color: '#6f6396', height: 240
  },
  {
    id: 'arbeiter', name: 'Alter Arbeiter',
    dativ: 'dem alten Arbeiter',
    x: 700, y: 990,
    file: 'npc_arbeiter.png',
    color: '#6b5a44', height: 218
  },
  {
    id: 'marktfrau', name: 'Marktfrau',
    dativ: 'der Marktfrau',
    x: 2050, y: 990,
    file: 'npc_marktfrau.png',
    color: '#7a5f4a', height: 216
  },
  {
    id: 'gruppe', name: 'Die Versammelten',
    dativ: 'den Versammelten',
    x: 1408, y: 1270,
    file: 'npc_arbeitergruppe.png',
    color: '#5f5344', height: 218
  },
  {
    id: 'tuer', name: 'Tür zur Gasse',
    dativ: 'der Tür zur Gasse',
    x: 700, y: 600,
    miniatur: { x: 692, y: 215, groesse: 300 },
    unsichtbar: true,
    file: '', color: '#000', height: 0
  }
];

function merkeGespraech(id) {
  if (STORY.gesprochen.indexOf(id) === -1) STORY.gesprochen.push(id);
}

const DIALOGE = {
  arbeiter() {
    if (STORY.entscheidung) {
      return { lines: [
        'Es ist entschieden. Jetzt tragen wir es gemeinsam, was immer daraus wird.',
        'Das ist mehr, als ich in dreißig Jahren erlebt habe.'
      ] };
    }
    return {
      lines: [
        'Ich bin der Älteste hier, also sage ich das Unbequeme.',
        'Ich habe zweimal erlebt, wie so etwas ausgeht. Beide Male haben wir verloren, und beide Male hat es Leute die Stelle gekostet.',
        'Das heißt nicht, dass wir nichts tun sollen. Es heißt, dass wir wissen sollten, was wir riskieren.',
        'Wer hier Familie hat, sollte zweimal überlegen. Ich sage das nicht, um euch zu bremsen. Ich sage es, damit es gesagt ist.'
      ],
      after() { merkeGespraech('arbeiter'); }
    };
  },

  marktfrau() {
    if (STORY.entscheidung) {
      return { lines: [
        'Gut. Was auch kommt – zurück will ich nicht.'
      ] };
    }
    return {
      lines: [
        'Zweimal verloren, sagt er. Und wie oft haben wir verloren, indem wir nichts getan haben?',
        'Mein Mehl kostet das Doppelte wie vor drei Jahren. Mein Lohn ist gefallen. Rechnet euch das aus.',
        'Ich habe nichts mehr, was mir jemand wegnehmen könnte. Genau deshalb habe ich keine Angst.',
        'Und noch etwas: Wir sind hier drin zu fünfzig. In der Halle sind wir zweihundert. Das war früher nie so.'
      ],
      after() { merkeGespraech('marktfrau'); }
    };
  },

  // Die Gruppe antwortet als Sprechchor, nicht als einzelne Figur
  gruppe() {
    if (STORY.entscheidung) {
      const w = WEGE[STORY.entscheidung];
      return { lines: [
        'Ein Raunen geht durch die Bänke, dann Zustimmung.',
        '„Also ' + w.label.toLowerCase() + '."',
        '„Dann stehen wir zusammen."'
      ] };
    }
    return {
      lines: [
        'Die Versammelten sehen dich an. Fünfzig Gesichter, kein einziges gleichgültig.',
        '„Was sollen wir tun?"',
        '„Sag du es. Du warst an den Webstühlen, an der Werkbank und draußen im Viertel."',
        '„Wir tragen es mit. Aber jemand muss es aussprechen."'
      ],
      after() { merkeGespraech('gruppe'); }
    };
  },

  marx() {
    const alle = STORY.gesprochen.length >= 3;

    // Nach dem Gate hält Marx seine wichtigste Rede des Spiels – wohin der
    // Klassenkampf seiner Meinung nach führen soll. Sie liegt bewusst NACH
    // der Entscheidung (sonst legte er der Schüli die Wahl in den Mund) und
    // VOR der Reflexionsfrage, damit man sein Ziel kennt, wenn man das
    // eigene Urteil formuliert. Und sie ist Pflicht, kein Nachschlag: Der
    // Weg zur Reflexion führt durch sie hindurch.
    if (STORY.gateBestanden && !STORY.reflexionGestellt) {
      return {
        lines: [
          'Merk dir eines: Was hier geschehen ist, war nur möglich, weil ihr in einem Raum wart.',
          'Zweihundert Menschen in einer Halle können sich verabreden. Zweihundert Weber an zweihundert Handwebstühlen in zweihundert Dörfern können das nicht.',
          'Die Fabrik hat euch zusammengetrieben – und sich damit ihre eigenen Gegner geschaffen.',
          'Und jetzt sage ich dir, was ich selber will. Du hast ein Recht darauf, das zu wissen, bevor du dich auf mich berufst.',
          'Ein halber Taler mehr im Lohnbuch ändert nichts daran, wem die Fabrik gehört. Solange sie einem Einzelnen gehört, wiederholt sich alles, was du gesehen hast – hier, oder in der nächsten Stadt.',
          'Also muss die Frage des Eigentums selbst beantwortet werden. Nicht durch eine Bitte an den Besitzer, sondern dadurch, dass die Arbeitenden die Produktionsmittel in ihre eigenen Hände nehmen. Das nenne ich Revolution.',
          'Ich sage nicht: morgen früh, und ich sage nicht: mit Gewalt um jeden Preis. Ich sage, dass es ohne diesen Schritt nicht geht.',
          'Für das, was danach käme, gibt es zwei Wörter, und man verwechselt sie ständig.',
          'Sozialismus ist der erste Schritt: Die Fabriken, die Maschinen, der Boden gehören nicht mehr Einzelnen, sondern allen gemeinsam. Gearbeitet wird weiter, und wer mehr leistet, bekommt mehr.',
          'Kommunismus ist das, was ich mir dahinter vorstelle: eine Gesellschaft, in der es die beiden Klassen gar nicht mehr gibt – und in der nicht mehr die Leistung den Maßstab bildet, sondern das, was ein Mensch braucht.',
          'Das Zweite habe ich nie ausgemalt. Ich halte es für unseriös, eine Zukunft im Voraus einzurichten, in der man nicht lebt.',
          'Damit weißt du, wohin ich will. Und jetzt die Frage, die ich dir nicht abnehmen kann.',
          'Nicht was richtig war. Was du getan hättest.'
        ],
        after() { openReflexion(); }
      };
    }
    if (STORY.gateBestanden) {
      return { lines: [
        'Du kennst jetzt mein Ziel und deins. Ob sie zusammenpassen, wirst du selbst merken.',
        'Was daraus im Großen wird, sehen wir am Ende der Straße.'
      ] };
    }
    if (STORY.beat >= 2) {
      return {
        lines: [
          'Du hast entschieden, und du hast gesehen, was daraus geworden ist.',
          'Jetzt lass uns benennen, was hier eigentlich geschehen ist.'
        ],
        after() { openGate(); }
      };
    }
    if (!alle) {
      const fehlt = [];
      if (STORY.gesprochen.indexOf('arbeiter') === -1) fehlt.push('den alten Arbeiter');
      if (STORY.gesprochen.indexOf('marktfrau') === -1) fehlt.push('die Marktfrau');
      if (STORY.gesprochen.indexOf('gruppe') === -1) fehlt.push('die Versammelten');
      return { lines: [
        'Setz dich nicht, du wirst gleich reden müssen.',
        'Du weißt, warum ihr hier seid. Letzte Woche hat der Bäcker als letzter zugemacht, und am Freitag stand der neue Lohn am Tor: sechs Taler. Vor acht Jahren waren es zwölf.',
        'Also ist herumgegangen, dass man sich trifft. Nicht in der Halle, nicht auf der Straße – hier, im Hinterzimmer hinter der Schankstube. Versammlungen von Arbeitern sieht die Obrigkeit nicht gern.',
        'Fünfzig sind gekommen. Und jetzt merk dir, warum das überhaupt möglich ist: Vor zwanzig Jahren saßen dieselben Leute an einzelnen Webstühlen in einzelnen Dörfern. Die hätten sich nie verabreden können.',
        'Sie wollen entscheiden, was sie tun. Nur hat keiner von ihnen je entschieden, und keiner spricht für sie.',
        'Hör dir erst an, was sie zu sagen haben – ' + fehlt.join(', ') + '.',
        'Danach entscheidest du. Und ich sage dir vorher: Ich habe keine Antwort für dich.'
      ] };
    }
    return {
      lines: [
        'Du hast alle gehört. Der Alte warnt, die Marktfrau drängt, die Versammlung wartet.',
        'Ich könnte dir jetzt sagen, was ich denke. Aber dann wäre es meine Entscheidung und nicht deine.',
        'Also: Was schlägst du der Versammlung vor?'
      ],
      after() { openEntscheidung(); }
    };
  },

  tuer() {
    if (!STORY.gateBestanden) {
      return { lines: [
        'Die Tür führt hinaus in die Gasse.',
        'Aber hier drinnen ist noch nichts entschieden. Marx wartet am Rednerpult.'
      ] };
    }
    if (!STORY.reflexionGestellt) {
      return { lines: [
        'Marx wollte noch wissen, was du selbst getan hättest. Sprich zuerst mit ihm.'
      ] };
    }
    return {
      lines: [
        'Du drückst die Tür auf. Draußen ist es kalt und still.',
        'Hinter dir löst sich die Versammlung auf – einzeln, in Abständen, damit es nicht auffällt.'
      ],
      after() { zeigeAbschluss(); }
    };
  }
};

// ---------- Aufgabe: Klassenkampf, Textzitat und Bildquelle ----------
// Marx im Wortlaut (Manifest, Kapitel I), dazu unsere eigene Erklärung.
const QUELLEN = {
  manifest: {
    ref: 'Marx/Engels: Manifest der Kommunistischen Partei (1848)',
    nachweis: 'Wörtliches Zitat aus Kapitel I. Gemeinfrei; Marx starb 1883, Engels 1895.',
    zitat: 'Aber mit der Entwicklung der Industrie vermehrt sich nicht nur das Proletariat; es ' +
           'wird in größeren Massen zusammengedrängt, seine Kraft wächst, und es fühlt sie immer mehr.'
  },
  erklaerung: {
    ref: 'Was Marx damit meint',
    art: '',
    nachweis: 'Zusammenfassung in heutiger Sprache, für dieses Spiel geschrieben – kein Zitat.',
    keinZitat: true,
    zitat: 'Entscheidend ist das Wort „zusammengedrängt“. Zweihundert Weber an zweihundert ' +
           'Handwebstühlen in zweihundert Dörfern können sich nicht verabreden – sie sehen ' +
           'einander nie. Zweihundert Menschen in einer Halle können es. Sie merken, dass ihre ' +
           'Lage kein persönliches Pech ist, sondern allen gemeinsam widerfährt. Aus vielen ' +
           'einzelnen Beschwerden wird so eine gemeinsame Sache. Die Fabrik bringt damit selbst ' +
           'hervor, was sich gegen sie richtet.'
  },
  bild: {
    ref: 'Käthe Kollwitz: „Weberzug“ (1893–1897)',
    bild: '../../assets/quellen/kollwitz_weberzug_plate.jpg',
    bildtext: 'Blatt 4 aus dem Zyklus „Ein Weberaufstand“. Kollwitz ließ sich von Gerhart Hauptmanns ' +
              'Drama „Die Weber“ anregen, kleidete die Aufständischen aber bewusst wie Arbeiter ' +
              'ihrer eigenen Zeit.',
    nachweis: 'Käthe Kollwitz (1867–1945): „Ein Weberaufstand“, Blatt 4 „Weberzug“, 1893–1897. ' +
              'Statens Museum for Kunst, Kopenhagen (CC0). Gemeinfrei.'
  }
};

const QUELLEN_FRAGEN = [
  {
    quelle: 'erklaerung', afb: 'AFB I', operator: 'Benennen',
    frage: 'Benenne den Umstand, der es den Arbeitern überhaupt erst ermöglicht, sich zu organisieren.',
    typ: 'eine',
    optionen: [
      'Dass sie in großen Betrieben zu vielen an einem Ort zusammenarbeiten.',
      'Dass sie durch die Maschinen mehr Freizeit gewonnen haben.',
      'Dass ihnen der Staat das Versammlungsrecht ausdrücklich zugesichert hat.'
    ],
    richtig: 'Dass sie in großen Betrieben zu vielen an einem Ort zusammenarbeiten.'
  },
  {
    quelle: 'bild', afb: 'AFB II', operator: 'Beschreiben',
    frage: 'Beschreibe, was auf dem Blatt zu sehen ist. Welche Aussage trifft am ehesten zu?',
    typ: 'eine',
    optionen: [
      'Ein geschlossener Zug von Männern und Frauen, die entschlossen und ernst in eine Richtung gehen; einige tragen Werkzeug wie Waffen.',
      'Eine fröhliche Feier, bei der Arbeiter und Fabrikbesitzer gemeinsam auf einen Abschluss anstoßen.',
      'Eine kleine Gruppe Einzelner, die ziellos und ohne Verbindung zueinander umherirrt.'
    ],
    richtig: 'Ein geschlossener Zug von Männern und Frauen, die entschlossen und ernst in eine Richtung gehen; einige tragen Werkzeug wie Waffen.'
  },
  {
    quelle: 'bild', afb: 'AFB II', operator: 'Erklären',
    frage: 'Erkläre, warum Kollwitz die Aufständischen dicht gedrängt und alle in dieselbe Richtung gehend zeigt.',
    typ: 'eine',
    optionen: [
      'Um deutlich zu machen, dass die Stärke der Arbeiter allein darin liegt, gemeinsam zu handeln.',
      'Um zu zeigen, dass die Menschen sich verlaufen haben und den Weg suchen.',
      'Weil die Straße so eng war, dass niemand daneben gehen konnte.'
    ],
    richtig: 'Um deutlich zu machen, dass die Stärke der Arbeiter allein darin liegt, gemeinsam zu handeln.'
  }
];
