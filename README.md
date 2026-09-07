# Marx is back – Der Weg des Proletariers

Ein browserbasiertes Lernspiel zum Marxismus für den Geschichtsunterricht der
10. Klasse. Die Spielenden gehen als Industriearbeiterin oder Industriearbeiter
durch sechs Areale und einen Epilog und erleben dabei nacheinander die
Kernbegriffe der Marx'schen Kapitalismuskritik – nicht als Definitionen,
sondern als Situationen, in denen man selbst steht.

Am Ende jedes Areals steht eine Quellenanalyse-Aufgabe, die gelöst werden muss,
um weiterzukommen. Wer sie löst, schaltet eine Begriffskarte für den
**Theorie-Codex** frei. Der Codex wächst über alle Areale hinweg mit und ist am
Ende der Spickzettel für die Auswertungsstunde.

---

## Spielen

Das Spiel braucht **keinen Server, keine Installation und kein Konto**.

- **Auf dem iPad:** den Link im Browser öffnen – das ist der vorgesehene Weg im
  Unterricht. Die Steuerung ist auf Touch ausgelegt: Wischen zum Laufen, ein
  Knopf zum Sprechen, ein Knopf für den Codex.
- **Am PC:** WASD oder Pfeiltasten zum Laufen, `E` zum Sprechen, `C` für den Codex.
- **Ohne Netz:** Das Verzeichnis herunterladen und `index.html` doppelklicken.
  Es braucht keinen Server – das Spiel läuft auch aus dem Dateisystem.

**Alle Daten bleiben auf dem Gerät** (`localStorage`). Es wird nichts
übertragen, nichts gespeichert, nichts ausgewertet – kein Server ist beteiligt.
Mehrere Schülerinnen und Schüler können dasselbe iPad benutzen; die Einträge
werden nach dem eingetragenen Namen getrennt gehalten.

**Wichtig bei zwei Terminen:** Weil alles lokal liegt, findet man seinen Codex
in der zweiten Stunde nur auf demselben Gerät im selben Browser wieder – und
nicht im privaten Modus, der beim Schließen alles verwirft. Deshalb gehört der
Screenshot am Ende jeder Stunde zum Ablauf und nicht erst ans Ende des Spiels.

**Abgabe:** Am Ende macht man einen Screenshot des Codex (`codex.html` oder der
Abschlussbildschirm) und lädt ihn dort hoch, wo die Lehrkraft ihn erwartet.

---

## Aufbau

```
index.html            Hauptmenü und Einstiegsseite
codex.html            Codex ohne Spiel – der bequeme Ort für den Screenshot

game/
  shared/engine.js    gemeinsame Mechanik: Kamera, Bewegung, Kollision,
                      Touch-Steuerung, Dialoge, Codex, Aufgaben, Spielstand
  shared/engine.css   gemeinsame Oberfläche
  areal0 … areal5/    je index.html (Verdrahtung), inhalt.js (Texte, NPCs,
  epilog/             Aufgaben) und zonen.js (Kollisionspolygone)

assets/
  backgrounds/        die sieben Areal-Hintergründe
  characters/         Spielfiguren und NPCs, freigestellt
  ui/                 Papier, Holz und andere Oberflächen-Texturen
  quellen/            die Kollwitz-Blätter samt Herkunftsnachweis

docs/
  konzept.md          Unterrichtskonzept, Levelplan, offene Punkte
  asset-prompts.md    die Bildprompts samt Stilguide
```

Ein neues Areal braucht nur diese drei Dateien – die Mechanik wird nicht
kopiert. Verbesserungen an Touch-Bedienung, Speichersystem oder Aufgabenlogik
wirken automatisch überall.

Eingebunden wird bewusst über klassische `<script src>`-Tags statt ES-Module,
damit sich das Spiel auch ohne Server per Doppelklick öffnen lässt.

---

## Didaktisches

Das Spiel führt konsequent eine Unterscheidung mit, die im Geschichtsunterricht
zentral ist und hier über sechs Areale eingeübt wird:

- **Quelle** – Marx und Engels im Wortlaut (Manifest, Das Kapital), dazu das
  Kollwitz-Blatt. Kursiv, in Anführungszeichen, mit Werkangabe.
- **Darstellung** – jemand berichtet später über etwas: die Kernthesen-Kästen
  des Schulbuchs, und im Finale zwei Beschreibungen heutiger Unternehmen.
  Aufrecht gesetzt, ohne Anführungszeichen, ausdrücklich als Darstellung
  beschriftet.
- **Narrativ** – die Auswahl und Deutung dahinter. Im Finale erzählt der
  Fabrikbesitzer dieselben acht Jahre als seine Geschichte, ohne ein einziges
  Mal zu lügen. Erst danach fällt der Begriff.

Das Spiel ist **bewusst einseitig**: Es erzählt konsequent aus der Perspektive
des Proletariats. Der letzte Zug macht genau das zum Thema und stellt den
Spielenden die Frage, was in dieser Erzählung nicht vorkam.

Der ausführliche Levelplan mit Kernbegriffen, Operatoren und Zeitbudget steht
in [`docs/konzept.md`](docs/konzept.md).

---

## Rechte und Herkunft

Kurzfassung – ausführlich in [`assets/HERKUNFT.md`](assets/HERKUNFT.md):

- **Programmcode:** MIT-Lizenz.
- **Texte und Aufgaben:** CC BY-SA 4.0. Sie sind eigens für dieses Spiel
  geschrieben. **Kein Schulbuchtext wird wiedergegeben, und es gibt keinen
  Verweis auf ein Schulbuch** – jede Aufgabe geht auf ein wörtliches
  Marx-Zitat zurück, dem eine eigene Erklärung beigestellt ist.
- **Marx-Zitate:** gemeinfrei (Marx † 1883, Engels † 1895). Alle im Spiel
  verwendeten Stellen sind im Wortlaut geprüft und in
  [`docs/konzept.md`](docs/konzept.md), Abschnitt 12, mit Fundstelle aufgeführt.
- **Käthe Kollwitz, „Ein Weberaufstand":** gemeinfrei; die Digitalisate stammen
  vom Statens Museum for Kunst Kopenhagen unter CC0. Details in
  [`assets/quellen/HERKUNFT.md`](assets/quellen/HERKUNFT.md).
- **Hintergründe, Figuren und Oberflächen:** mit Google Gemini erzeugt und von
  Hand nachbearbeitet (freigestellt, zugeschnitten, farblich angepasst).

Bewusst **nicht** enthalten sind zwei Dinge, die im Schulbuch stehen: die
Grafiken von Hugo Gellert (1934, noch geschützt) und die Gegenwartstexte von
Sahra Wagenknecht und Jürgen Neffe (lebende Autoren). An ihre Stelle treten die
gemeinfreien Kollwitz-Blätter und zwei selbst verfasste Darstellungen.

---

## Mitmachen und Weiterverwenden

Das Spiel ist für eine konkrete Klasse an einer konkreten Schule entstanden.
Wer es für den eigenen Unterricht anpassen will: Die Texte stecken alle in den
`inhalt.js`-Dateien, sauber getrennt von der Mechanik. Wer eine Karte austauscht,
zeichnet die Kollisionszonen mit dem eingebauten Editor (`F2`) neu ein.

**Ungeprüft:** Das Spiel ist bisher nur im Desktop-Browser mit simulierten
Touch-Ereignissen getestet, noch nicht auf einem echten iPad.
