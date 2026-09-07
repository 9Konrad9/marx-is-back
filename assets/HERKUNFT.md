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
