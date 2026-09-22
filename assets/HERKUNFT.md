# Herkunft und Rechte aller Bilddateien

Diese Übersicht deckt alles ab, was unter `assets/` liegt. Die Kollwitz-Blätter
haben wegen ihrer besonderen Rechtslage eine eigene, ausführliche Datei:
[`quellen/HERKUNFT.md`](quellen/HERKUNFT.md).

---

## 1. Hintergründe – `backgrounds/`

Alle sieben Karten wurden mit **Google Gemini** erzeugt und anschließend von
Hand nachbearbeitet. Die vollständigen Prompts samt Stilguide stehen in
[`../docs/asset-prompts.md`](../docs/asset-prompts.md); jede Karte lässt sich
damit reproduzieren.

| Datei | Areal | Nachbearbeitung |
|---|---|---|
| `areal0_marktplatz.jpg` | Marktplatz | Ganz neu erzeugt, nachdem alle anderen Areale standen – das erste Bild passte in Palette und Perspektive nicht zum Rest (Einzelheiten in `../docs/asset-prompts.md`) |
| `areal1_fabrikhalle.jpg` | Fabrikhalle | Perspektive im zweiten Anlauf korrigiert (der erste Versuch lieferte eine Puppenstube) |
| `areal2_werkbank.jpg` | An der Werkbank | – |
| `areal3_viertel.jpg` | Stadtviertel | Neu erzeugt (vier kleine Werkstätten neben der großen Fabrik); oben um 380 px beschnitten, weil Dächer und Himmel die halbe Bildhöhe kosteten und bei höherem Zoom die Ladenfronten aus dem Bild geschoben hätten |
| `areal4_versammlung.jpg` | Versammlungsraum | – |
| `areal5_krisenplatz.jpg` | Krisenplatz | – |
| `epilog_petrograd.jpg` | Petrograd 1917 | von 1536 auf 1150 px Höhe beschnitten, damit die Kamera an der Unterkante einrastet und die roten Fahnen im Bild bleiben |

Der einheitliche Stil – Tuschezeichnung mit weicher Kolorierung, hybride
Top-Down-Perspektive, gedämpfte Palette – ist über den gemeinsamen Stilguide
im Prompt erzwungen, nicht nachträglich angeglichen.

---

## 2. Figuren – `characters/`

Ebenfalls mit **Google Gemini** erzeugt, dann freigestellt.

**Freistellen:** kantenverbundener Flood-Fill von den Bildrändern aus, nicht
globaler Farbschlüssel. Ein globaler Schlüssel hätte graue Haare und graue
Kleidung mit durchlöchert. Die Toleranz musste je Bild angepasst werden; bei
der Arbeitergruppe waren zwei Durchgänge nötig, weil der Bodenschatten
farblich zu weit vom weißen Hintergrund entfernt lag.

| Ordner | Inhalt |
|---|---|
| `worker_m/`, `worker_f/` | Spielfiguren, je 8 Posen (vier Richtungen × Stand/Schritt) |
| `npcs/` | neun NPCs: Marx, Lenin, Fabrikbesitzer, Arbeiter, Aufseher, Marktfrau, Kind, Dienstmädchen, Arbeitergruppe |
| `_raw-reference-sheets/` | die ungeschnittenen Originale, **nur Arbeitsmaterial** – das Spiel lädt sie nie |

Der Ordner `_raw-reference-sheets/` macht rund zwei Drittel des gesamten
Speicherplatzes aus. Er ist über `.gitignore` von der Veröffentlichung
ausgenommen; die Dateien bleiben lokal erhalten.

---

## 3. Oberflächen-Texturen – `ui/`

Mit **Google Gemini** erzeugt. Verwendet als 9-Slice-Texturen über
`border-image`, damit sich Ecken nicht verzerren.

| Datei | Verwendung |
|---|---|
| `papier.jpg` | Dialogfenster, Aufgaben-, Quellen- und Codexkarten |
| `holzknopf.jpg` | alle Schaltflächen, Überschriften, Namensbanner der Figuren |
| `namensschild.png` | Namensbanner (Vorlage) |
| `eisenschild.png` | Interaktionshinweis im Spiel. Weißer Rand abgeschnitten, auf 480 px verkleinert und per Gamma (0,62) aufgehellt – im Original war die Platte so dunkel, dass sie vor den Fassaden verschwand. Nieten sitzen nur in den Ecken, damit sie beim Dehnen nicht zu Ovalen werden. |
| `vernagelt.png` | die zugenagelten Ladentüren in Areal 3 |
| `kiste.png` | die umgedrehte Kiste, auf der im Epilog beide Redner stehen – der anonyme Vorleser und Lenin. Weiß randverbunden freigestellt, auf das Motiv beschnitten und auf 640 px Breite verkleinert. |
| `taler.png` | Münzen in der Mehrwert-Bilanz in Areal 1 |
| `baumwolle.png`, `stoffballen.png`, `webstuhl_detail.png` | Requisiten |
| `werkbank_detail.jpg` | Stanzkopf im Minispiel von Areal 2 – **kein eigenes Bild**, sondern eine genau eine Bankperiode breite Kachel aus `areal2_werkbank.jpg` (x 1057–1412, y 580–930). Kachelt dadurch nahtlos. |

Bei `papier.jpg` wurden 3 % an jeder Seite abgeschnitten: Das Original hatte
einen weißen Rand außerhalb der Blattkante, der als heller Saum um jedes
Dialogfenster sichtbar war.

---

## 4. Historische Bildquellen – `quellen/`

Käthe Kollwitz, **„Ein Weberaufstand" (1893–1897)**, fünf der sechs Blätter.

**Gemeinfrei**, und – was in Deutschland leicht übersehen wird – auch die
**Reproduktionen sind frei**: Nach dem BGH-Urteil zu den Reiss-Engelhorn-Museen
(2018) können Fotografien gemeinfreier Werke einen eigenen Lichtbildschutz
genießen. Die hier verwendeten Digitalisate stammen vom **Statens Museum for
Kunst (SMK), Kopenhagen**, das sie unter **CC0 1.0** freigegeben hat.

Ausführlich, mit Inventarnummern und Blattzuordnung, in
[`quellen/HERKUNFT.md`](quellen/HERKUNFT.md).

---

## 5. Was bewusst fehlt

Zwei Dinge aus dem Schulbuch sind **absichtlich nicht** im Spiel, weil das
Repository öffentlich ist:

- **Hugo Gellert**, Illustrationen zu „Das Kapital" (1934). Gellert starb 1985;
  die Schutzfrist läuft bis 2055. An ihre Stelle treten die Kollwitz-Blätter,
  die thematisch ohnehin näher an den 1860er Jahren liegen.
- **Sahra Wagenknecht und Jürgen Neffe** (Schulbuch M28/M29). Beide leben, ihre
  Texte sind voll geschützt. An ihre Stelle treten zwei selbst verfasste
  Darstellungen über Amazon und Mondragón.

Ebenfalls bewusst weggelassen: **Logos, Firmenzeichen und Fotos** in den
Gegenwartsdarstellungen. Der Vergleich läuft rein über Text.

---

## 6. Dateigrößen

Vor der Veröffentlichung wurden alle Bilder auf die Größe gebracht, in der sie
im Spiel tatsächlich gebraucht werden:

- **Hintergründe:** in den Maßen unverändert (2816 px breit), aber mit
  JPEG-Qualität 82 neu gespeichert – zusammen 4,7 MB statt vorher 18,3 MB.
  Die Maße bleiben, weil die Bilder auf einem Retina-iPad nicht verkleinert
  ankommen: Die Zeichenfläche wird mit dem `devicePixelRatio` multipliziert,
  und Areal 3 zeigt seinen Hintergrund bei `worldZoom` 1,5 sogar dreifach
  vergrößert. Verglichen wurde in genau dieser Vergrößerung – bei der
  flächigen Tuschezeichnung ist kein Unterschied zu sehen.
- **`kiste.png`** kam mit 2608 × 1179 aus dem Generator und wird 55 px hoch
  angezeigt; jetzt 640 px breit (324 statt 4734 KB).
- **`npc_lenin.png`** ebenso auf das Format der übrigen Figuren gebracht:
  198 × 499 wie Marx und der alte Arbeiter (150 statt 1086 KB).

Das ganze Repository liegt damit bei knapp 12 MB statt 25,5 MB. Die
ungeschnittenen Generatorbilder in `_raw-reference-sheets/` (54 MB) sind über
`.gitignore` ausgenommen und bleiben nur lokal.

---

## 7. Figuren der Schanghai-Szene

Ebenfalls mit **Google Gemini** erzeugt, Prompts in
[`../docs/asset-prompts.md`](../docs/asset-prompts.md).

| Datei | Nachbearbeitung |
|---|---|
| `npcs/npc_spinnerinnen.png` | sitzende Dreiergruppe, randverbunden freigestellt |
| `npcs/npc_posten.png` | freigestellt |
| `npcs/npc_student.png` | freigestellt |
| `npcs/npc_bote.png` | kam als Drei-Ansichten-Blatt statt als Einzelfigur; die linke Vorderansicht ist herausgeschnitten und freigestellt |
| `characters/china/worker_m/`, `characters/china/worker_f/` | je acht Posen aus einem Referenzblatt geschnitten |

**Beim Schneiden der Referenzblätter:** Gemini hat die Blickrichtungen nicht
spaltenweise durchgehalten. Beim Mann schauen `pose3_idle` und `pose4_walk`
nach rechts, `pose4_idle` und `pose3_walk` nach links – die Posen mussten
also über die Spalten hinweg gepaart werden. Bei der Frau schauen **beide**
Standposen nach rechts; die linke Standpose ist deshalb eine Spiegelung.
Geprüft wurde das nicht nach Augenmaß, sondern über die Lage von Haut- und
Haarpixeln im Kopfbereich: Das Haar sitzt am Hinterkopf, die Haut vorne.

Wer die Blätter neu generiert, muss das erneut prüfen – eine vertauschte
Richtung fällt im Spiel sofort auf, die Figur läuft dann rückwärts.

---

## 8. Freistellen, zweiter Durchgang

Auf dem iPad fielen helle Ränder auf, vor allem zwischen Körper und Armen.
Zwei verschiedene Ursachen, beide behoben:

**Heller Saum und eingeschlossene Flächen (China-Assets).** Die
randverbundene Flutfüllung erreicht eingeschlossene Flächen prinzipbedingt
nicht: Was zwischen Arm und Körper liegt, hat keine Verbindung zum Bildrand.
Dazu kam ein heller Saum, den JPEG an den Konturen hinterlässt – diese Pixel
liegen zwischen reinem Weiß und der schwarzen Linie und fielen durch die
Schwelle. Der Freisteller in `werkzeuge/Freisteller.cs` macht jetzt drei
Schritte:

1. randverbundene Flutfüllung wie bisher,
2. eingeschlossene Weißflächen zusätzlich entfernen, aber nur bei Mittelwert
   über 244 und sehr geringer Streuung – gezeichnetes Weiß wie die
   Baumwollflusen an den Ärmeln der Spinnerinnen oder das Papierbündel des
   Boten hat Schattierung und bleibt stehen,
3. weicher Saum: vom Hintergrund aus höchstens drei Schritte weit und nur über
   helle Pixel. Dunkle Konturlinien blockieren und bleiben voll deckend.

**Löcher in der Figur (europäische Arbeiterin).** Beim ursprünglichen
Freistellen war die Toleranz zu hoch: Die helle Schürze lag farblich zu nah am
mittelgrauen Blatthintergrund und wurde streckenweise mit weggeschnitten –
teils ganz, teils als halbdurchsichtige Sprenkel. Im Spiel schien dort die
Straße durch. Das Referenzblatt existiert nicht mehr, deshalb wurde repariert
statt neu geschnitten: morphologisches Schließen der Alphamaske mit Radius 3,
danach Auffüllen der Farbe aus der Umgebung. Echte Lücken zwischen Arm und
Körper sind breiter als sechs Pixel und bleiben dabei erhalten.

**Warum das nicht automatisch für alle Bilder läuft:** Das Schließen würde bei
den China-Figuren genau die Arm-Lücken wieder zumachen, die Schritt 2 gerade
geöffnet hat. Die beiden Verfahren gehören zu verschiedenen Fehlern und dürfen
nicht nacheinander auf dieselbe Datei angewendet werden.

---

## 9. Freistellen, dritter Durchgang – alle übrigen Bilder

Nach den China-Assets wurde der ganze Bestand durchgemessen statt nur
angesehen. Drei Prüfungen liefen über jede PNG-Datei:

1. **Heller Saum:** mittlere Helligkeit der Pixel direkt an der Silhouetten­kante
   gegen die Helligkeit sechs bis zwölf Pixel dahinter. Ein stehengebliebener
   Hintergrundsaum macht die Kante systematisch heller als das Innere.
2. **Eingeschlossene Blattgrund-Flächen:** farblose, flaue Gebiete, die keine
   Verbindung nach außen haben – die Lücken zwischen Arm und Körper.
3. **Löcher:** halbdurchsichtige Gebiete mitten in der Figur.

Kontrolliert wurde jeder Treffer, indem die erkannten Gebiete grün eingefärbt
und die Datei auf Magenta gelegt wurde. Gezeichnetes Weiß (die Baumwollflusen,
die Leinwand der Ballen, das weiße Hemd des Fabrikbesitzers, die Fläche des
Talers) sah dabei genauso aus wie Hintergrund und musste von Hand
auseinandergehalten werden.

### Was gefunden wurde

| Fehler | Betroffen | Sichtbar als |
|---|---|---|
| **4–6 px weißer Rahmen** rings um die Holztextur | `ui/holzknopf.jpg` | weißer Saum um **jede** Schaltfläche, jede Überschrift und jedes Namensbanner – `border-image` zieht genau die äußerste Pixelreihe über die ganze Kante |
| 1 px heller Saum | `ui/eisenschild.png` | helle Haarlinie rings um den Interaktions­hinweis |
| Blattgrund in allen Rahmenfenstern | `ui/webstuhl_detail.png` | graue Flecken im Webstuhl, der im Schicht-Overlay direkt auf Schwarz liegt |
| Blattgrund zwischen Arm und Körper | `npc_marktfrau`, `npc_dienstmaedchen`, `npc_arbeiter`, alle 16 Spielerposen | helle Flächen in den Achsel- und Beinlücken |
| Grund durchgefressen, Reste an den Füßen | `npc_arbeitergruppe` | helle Linien quer durch die Mäntel, graue Klötze zwischen den Beinen |

Nicht betroffen und deshalb unangetastet: die Hintergründe, die Kollwitz-Blätter,
`papier.jpg`, `kiste.png`, `npc_lenin.png` und der gesamte China-Satz.

### Was dagegen gemacht wurde

Neu geschnitten aus den Originalen in `_raw-reference-sheets/`, mit
`werkzeuge/FreistellerGrau.cs`. Der arbeitet wie der weiße Freisteller, aber
die Schwelle hängt nicht an „fast weiß", sondern am **gemessenen** Blattgrund:
Gemini hat je Blatt einen anderen Grauwert geliefert, von 129 bis 156. Der
wird als Median des Randrings bestimmt, alle Vergleiche laufen als Abstand
dazu.

Dazu kam eine **Mindestdicke** für Schritt 2: Eine eingeschlossene Fläche wird
nur entfernt, wenn irgendwo ein Quadrat von 2r+1 Pixeln hineinpasst. Ohne das
riss der Schnitt beim Webstuhl die Lücken zwischen den Kettfäden auf, und das
Bild sah zerfressen aus. Werte: r = 3 bei den Spielerposen (die Achsellücken
sind dort nur rund 13 px breit), r = 8 bei den Einzelfiguren und beim Webstuhl.
Beim Taler ist Schritt 2 ganz abgeschaltet – seine Münzfläche **ist**
Blattgrau, der Schnitt hätte das Gesicht ausgestanzt.

**Die Spielerposen ohne Raten.** Das Referenzblatt hat sechs Spalten statt
vier, doppelte Posen und keine spaltentreuen Blickrichtungen – die Zuordnung
von Hand wäre die wahrscheinlichste Fehlerquelle gewesen. Stattdessen dienen
die **vorhandenen** Dateien als Vorlage (`werkzeuge/Sprites.cs`): Für jede wird
die Blattzelle gesucht, deren Silhouette am besten deckt, auch gespiegelt, und
nur deren Pixel werden ersetzt. Die Deckungswerte lagen bei 0,94 bis 0,99, die
Spiegelpaare (links/rechts) kamen dabei von selbst heraus. Bildgröße, Kasten
und Fußpunkt bleiben damit exakt wie vorher – **kein einziges Sprite hat sich
um einen Pixel verschoben**, alle Maße stimmen mit den alten Dateien überein.

**Die Holztextur** wurde mit `werkzeuge/Zuschnitt.cs` neu aus dem Original
beschnitten (600 × 331 statt 600 × 335) und mit Qualität 88 gespeichert. Eine
Zeile zählt erst als Motiv, wenn ein Viertel von ihr vom Grund abweicht –
einzelne JPEG-Sprenkel im weißen Rand sollen den Schnitt nicht verhindern.
`papier.jpg` blieb bewusst unverändert: Ein neuer Schnitt hätte die gezeichnete
dunkle Blattkante mit ins Bild geholt und jedem Dialogfenster einen Rahmen
gegeben. Weiß war dort ohnehin keines.

`eisenschild.png` wurde nur um 1 px rundum gestutzt (478 × 250); der
`border-image`-Slice von 52 bleibt dabei gültig.

### Was nach der Reparatur noch anschlägt – und warum es bleibt

Die Prüfung auf eingeschlossene farblose Flächen meldet weiter sechs Dateien.
Alle sechs wurden einzeln kontrolliert, keine ist ein Rest:

- `npc_student`, `npc_arbeitergruppe`, `baumwolle`, `stoffballen`: die
  gemeldeten Flächen liegen bei einer Helligkeit, die der jeweilige Blattgrund
  gar nicht hat (119 gegen 145, 218 gegen 154 …). Es sind das glatte Gewand des
  Studenten, ein heller Fleck auf der Schürze der alten Frau, die Leinwand der
  Ballen. Beim Studenten kommt dazu, dass sein Blatt **weiß** war – ein Rest
  müsste bei 255 liegen, nicht bei 119.
- `eisenschild` hat überhaupt keine Transparenz; gemeldet wird die Platte selbst.
- `webstuhl_detail` behält 321 px in vier Haarlinien, die dünnste genau einen
  Pixel hoch. Sie verschwinden nur, wenn man die Mindestdicke so weit senkt,
  dass es die Kettfäden mitnimmt – das Bild sähe dann zerfressen aus.

Die beiden anderen Prüfungen – heller Saum an der Silhouette und fast weiße
Pixel an der Transparenzkante – melden über alle 53 PNG-Dateien **null**
Treffer.
