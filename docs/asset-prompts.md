# Asset-Prompts: "Der Weg des Proletariers"

Diese Liste wird Areal für Areal ergänzt. Jeder Prompt ist so geschrieben, dass er direkt in ein Bildgenerierungstool kopiert werden kann.

**Technischer Hinweis für Gemini:** Gemini generiert standardmäßig nur in 1K (~1024 px lange Seite), und im normalen Gemini-Interface gibt es dafür **kein Auflösungs-Dropdown**. Mit einem kostenpflichtigen Google-AI-Plan lässt sich beim fertigen Bild über **"Mehr" → "Mit Pro neu erstellen" ("Redo with Pro")** eine 2K-Version (~2048 px lange Seite) erzeugen – das ist der praktikable Weg für uns. Echtes 4K wäre nur über Google AI Studio (separates, etwas technischeres Tool) erreichbar und ist für unseren Zweck aktuell nicht nötig. Wichtig: Eine Zahl wie "2048x1152" im Prompt-Text selbst hat **keinen Einfluss** auf die tatsächliche Pixelgröße – die wird ausschließlich über den Redo-with-Pro-Schritt gesteuert, nicht über den Prompt.

---

## Stilguide (gilt für ALLE Hintergründe)

Diesen Block am Anfang jedes Areal-Prompts mitgeben, damit der Stil konsistent bleibt:

```
Detailed ink-and-wash style comic illustration with soft painterly
cel-shading (visible fine linework and subtle textured shading, NOT
perfectly flat single-color fills — a bit more refined and painterly
than basic flat vector art, similar to a moody graphic novel or
illustrated map), bold black outlines around major shapes, using the
classic hybrid top-down RPG perspective seen in games like Stardew
Valley, Pokémon, or old-school Zelda: the ground, streets and open
terrain are shown strictly from directly above (true top-down), while
buildings, trees, characters and other tall objects are drawn
standing upright with their FRONT FACADE / front view clearly visible
(walls with windows and doors, topped by a visible roof; for
characters: face and body seen from the front/back/side as
appropriate) as if viewed slightly from the front — like a flat
cutout standing on the top-down ground plane. This is explicitly NOT
isometric (do not show two angled walls or sides of a building at
once), a dark, somber, oppressive color palette evoking 19th century
industrial hardship: dominated by muted grays, dull rust browns,
faded dark reds, and murky greens, hazy overcast smog-tinted
atmosphere, deeper and heavier shadow tones throughout for a gloomy,
bleak, foreboding mood (this is a deliberate mood choice reflecting
the harshness of industrial exploitation — avoid a cheerful, bright,
or inviting look), a gritty, worn, lived-in atmosphere rather than a
clean/polished look: visible grime, soot stains, weathering, faded
paint — avoid a sterile, pristine, or overly symmetrical "city
builder" look, no UI elements, only include elements explicitly
described below — no additional scenery
```

**Wichtig beim Speichern (gilt für alle Gemini-Bilder, nicht nur Hintergründe):** Immer über den echten **"Download"-Button** sichern, nicht per "Bild kopieren" – sonst bekommst du nur eine komprimierte Vorschau statt der vollen Auflösung (siehe unsere Erfahrung bei Areal 0).

**Was sich gegenüber dem vierten Test-Bild ändert:**
- Deutlich düsterere, bedrücktere Farbpalette (Grautöne, verblasstes Rostbraun, trüber Himmel, schwerere Schatten) statt warmer/freundlicher Töne
- Wichtig: Die begehbaren Flächen sollen trotzdem **spürbar heller** bleiben als Gebäude/Hindernisse, damit die Lesbarkeit für dein Zonen-Tool nicht leidet
- "Gritty/worn" und Hybrid-Top-Down-Perspektive bleiben wie zuvor bestehen

**Wichtig für dein Zonen-Tool:** Ich formuliere jeden Prompt so, dass begehbare Flächen (Straßen, Böden, freie Plätze) und nicht-begehbare Objekte (Gebäude, Mauern, Maschinen, Möbel) sich **visuell klar unterscheiden** (Textur/Farbe) – das erleichtert dir das nachträgliche Einzeichnen der zugänglichen Bereiche.

**Hinweis zur Kartengröße:** Über den echten "Download"-Button (nicht Kopieren/Einfügen!) erreichen wir bei Gemini in der Praxis ca. **2750×1536 px** – das reicht gut für unseren Zweck und liegt sogar über dem ursprünglich anvisierten 2K-Ziel. Wichtig beim Speichern der Bilder also immer: über den Download-Button sichern, nicht per Rechtsklick "Bild kopieren".

---

## Areal 0: Marktplatz (Außenbereich)

**Kontext:** Erstes Areal, Einführung der **Klassengesellschaft** und des
**historischen Materialismus**. Marx hält hier seine Rede.

**Neu gebaut, nachdem alle anderen Areale standen.** Das erste Bild war eine
verwinkelte Stadtkarte mit drei abgehenden Straßen – entstanden, bevor die
strengere Perspektivregel im Stilguide stand. Es passte am Ende an drei
Stellen nicht: Es hatte als einziges **Grün** (Bäume, olivgrüne Planen), es
zeigte **Dächer von oben** statt frontaler Fassaden, und es lief auf
`worldZoom: 2.6` – rund dreimal stärker vergrößert als alle anderen Areale,
was die Linien sichtbar weicher machte. Ein Test mit kleinerem Zoom half nur
gegen den dritten Punkt.

**Der Ersatz folgt der Bauweise aller übrigen Areale:** eine Fassadenzeile als
Band am oberen Rand, darunter ein offener Platz. Das kostete nebenbei die 59
handgezeichneten Kollisionspolygone – die neuen acht Rechtecke ließen sich
dafür aus dem Bild ausmessen, ohne den F2-Editor zu benutzen.

**Der soziale Verlauf steckt jetzt im Bild:** Fabrik → Arbeiterhäuser →
Bürgerhäuser, von links nach rechts. Marx' Satz „Du siehst zwei Klassen" wird
damit in einem Blick sichtbar, statt erlaufen werden zu müssen. Die NPCs sind
entsprechend verteilt: Werkmeister an der Fabrikmauer, Fabrikbesitzer und
Dienstmädchen vor den Bürgerhäusern.

**Prompt:**
```
[Stilguide siehe oben] +

IMPORTANT — NO GREEN ANYWHERE: no trees, no bushes, no grass, no
foliage, no green awnings, no green tint in the ground. The whole
image stays in grey, brown, rust and soot.

PERSPECTIVE — follow this exactly, it is the most important part:
Use the flat top-down view of a 2D role-playing game like Stardew
Valley or a Pokémon Game Boy game. The cobbled ground is seen
strictly from directly above and fills most of the image. Every
building and object stands upright as a flat cutout with its FRONT
FACADE facing the viewer — walls with windows and doors, seen
perfectly face-on. Use a strictly orthographic projection: no
vanishing point, no converging lines, no tilt. NEVER show a roof from
above, never show two sides of any object at once, do not draw this
as a doll's-house diorama or a map with pitched roofs seen from the
sky. There is only ONE row of buildings: a continuous flat band along
the TOP EDGE of the image. No side walls, no bottom row of buildings.

GROUND: a wide open cobblestone market square covering the lower two
thirds of the image, damp and worn, with puddles and soot stains but
rendered plainly and clearly LIGHTER than every building and object,
so that walkable ground and obstacles are easy to tell apart at a
glance. The lower half of the square is completely empty and open.

CONTENT — the building band along the top edge, from LEFT to RIGHT,
showing a social gradient in three parts:
  LEFT THIRD: the soot-blackened brick front of a textile mill with
  small high windows and one large closed timber double gate; a tall
  chimney rising above it with thin smoke.
  MIDDLE THIRD: cramped, crooked working-class housing fronts, narrow
  and close-set, small windows, some boarded up with planks, plaster
  falling off.
  RIGHT THIRD: tall, well-kept bourgeois townhouse fronts in pale
  stone, large regular windows, ornate doorways, clean compared to
  everything left of them.

Standing on the open square in front of the building band, as upright
front-facing cutouts: a plain weathered stone fountain slightly left
of centre as a landmark, and three or four simple wooden market
stalls with sagging, torn cloth awnings and bare counters, spread
along the middle of the square with wide gaps between them.

The illustration must fill the whole canvas edge to edge, with no
black border, no frame and no vignette. Include no people, no text,
no letters, no signage and no other scenery beyond what is listed
here.
```

**Nach der Generierung:** Über den echten Download-Button sichern und als
`assets/backgrounds/areal0_marktplatz.jpg` ablegen – als JPG, nicht PNG. Das
erste Areal-0-Bild lag als PNG bei 6,4 MB und war damit mit Abstand die
größte Datei im Projekt.

---

## Charaktere: Hauptfiguren (Arbeiter/in) – Referenzblätter

**Kontext:** Feste, wählbare Spielfigur (männlich/weiblich, siehe Konzeptdokument Abschnitt 4). Da allgemeine Bildgeneratoren keine exakt aufeinander abgestimmten Animations-Frames liefern können, generieren wir pro Figur ein Referenzblatt mit 8 Posen (4 Richtungen × Idle + Schritt), das wir danach einzeln zuschneiden. Im Spiel wechseln wir zwischen Idle- und Schrittpose für einen einfachen 2-Frame-Gehzyklus.

**Wichtig für beide Prompts unten:**
- Jeder Prompt ist **vollständig eigenständig** – einfach 1:1 kopieren, nichts ergänzen
- Am besten in einem **neuen, separaten Gemini-Chat** generieren (nicht im selben Verlauf wie die Hintergründe), damit kein Kontext aus vorherigen Bildern einfließt
- Über den echten **Download-Button** sichern, nicht kopieren (siehe technischer Hinweis oben)

### Männliche Arbeiterfigur

```
Detailed ink-and-wash style comic illustration with soft painterly
cel-shading (visible fine linework and subtle textured shading, not
perfectly flat single-color fills, similar to a moody graphic novel
illustration), bold black outlines around major shapes, a dark,
muted, weathered color palette (faded browns, grays, muted rust
tones) matching a somber 19th century industrial setting.

A character reference sheet showing the same 19th century male
industrial worker in eight separate poses, arranged evenly in two
horizontal rows of four with equal spacing and identical character
scale/height in every pose. Top row: standing idle poses facing 1)
directly forward (toward viewer), 2) directly away (back view), 3)
left in profile, 4) right in profile. Bottom row: the same four
directions, but in a mid-stride walking pose (one leg forward, arms
swinging in opposite counter-motion), same character, same outfit,
same scale.

The character wears simple, practical worn work clothes typical of a
19th century factory worker: a flat cap, a plain waistcoat over a
shirt with sleeves rolled up, suspenders, worn trousers, sturdy
boots.

The ENTIRE image background, edge to edge across the whole canvas,
must be a single flat solid uniform mid-gray color — absolutely no
scenery, no buildings, no cityscape, no gradient, no other content
anywhere in the image outside of the eight character poses. Every
pose has equal margins and is centered in its grid cell. No text, no
labels, no grid lines, no shadows on the ground.
```

### Weibliche Arbeiterfigur

```
Detailed ink-and-wash style comic illustration with soft painterly
cel-shading (visible fine linework and subtle textured shading, not
perfectly flat single-color fills, similar to a moody graphic novel
illustration), bold black outlines around major shapes, a dark,
muted, weathered color palette (faded browns, grays, muted rust
tones) matching a somber 19th century industrial setting.

A character reference sheet showing the same 19th century female
industrial worker in eight separate poses, arranged evenly in two
horizontal rows of four with equal spacing and identical character
scale/height in every pose. Top row: standing idle poses facing 1)
directly forward (toward viewer), 2) directly away (back view), 3)
left in profile, 4) right in profile. Bottom row: the same four
directions, but in a mid-stride walking pose (one leg forward, arms
swinging in opposite counter-motion), same character, same outfit,
same scale.

The character wears simple, practical worn work clothes typical of a
19th century female factory/textile worker: a headscarf or plain
kerchief tied over the hair, a long-sleeved blouse, a simple apron
over a long practical work skirt, sturdy worn boots.

The ENTIRE image background, edge to edge across the whole canvas,
must be a single flat solid uniform mid-gray color — absolutely no
scenery, no buildings, no cityscape, no gradient, no other content
anywhere in the image outside of the eight character poses. Every
pose has equal margins and is centered in its grid cell. No text, no
labels, no grid lines, no shadows on the ground.
```

**Annahme:** Ich gehe davon aus, dass die weibliche Figur eine **wählbare Alternative zur männlichen Spielfigur** sein soll (Schülis könnten z. B. zu Beginn wählen). Falls du sie stattdessen als NPC (z. B. die "Arbeiterkollege/in"-Figur aus dem Konzept) einsetzen willst, sag Bescheid – der Prompt funktioniert für beide Zwecke gleich gut.

**Nach der Generierung (pro Figur):**
1. Über den Download-Button die volle Auflösung sichern
2. Hintergrund entfernen (z. B. remove.bg, Photopea)
3. Die 8 Posen einzeln zuschneiden auf gleich große Kacheln, z. B.:
   `worker_m_front_idle.png`, `worker_m_front_walk.png`, `worker_m_back_idle.png`, `worker_m_back_walk.png`, `worker_m_left_idle.png`, `worker_m_left_walk.png`, `worker_m_right_idle.png`, `worker_m_right_walk.png` (analog `worker_f_...` für die weibliche Figur)

---

## NPCs für Areal 0 – Einzelposen

**Wichtiger Unterschied zu den Spielfiguren:** NPCs laufen nicht, sie stehen an ihrem Platz und sprechen die Schülis an. Sie brauchen deshalb **kein Referenzblatt mit 8 Posen** – eine einzige, nach vorne gerichtete Pose reicht völlig aus. Das spart dir pro Figur das Zuschneiden: nur Hintergrund entfernen, fertig.

**Für alle drei Prompts unten gilt:**
- Jeder Prompt ist **vollständig eigenständig** – 1:1 kopieren, nichts ergänzen
- Am besten je ein **neuer, separater Gemini-Chat** (kein Kontext aus vorherigen Bildern)
- Über den echten **Download-Button** sichern, nicht kopieren
- Danach nur: Hintergrund entfernen (remove.bg/Photopea) und unter dem angegebenen Dateinamen speichern

### Karl Marx (Questgeber, am Brunnen)

Dateiname: `assets/characters/npcs/npc_marx.png`

```
Detailed ink-and-wash style comic illustration with soft painterly
cel-shading (visible fine linework and subtle textured shading, not
perfectly flat single-color fills, similar to a moody graphic novel
illustration), bold black outlines around major shapes, a dark,
muted, weathered color palette (faded browns, grays, muted rust
tones) matching a somber 19th century industrial setting.

A single full-body character illustration of Karl Marx as an
imposing bearded philosopher in his early sixties, standing in a
calm, dignified upright pose, facing directly forward toward the
viewer, full body visible from the top of his head down to his
shoes. He has a large full grey-and-white beard reaching his chest
and thick swept-back greying hair. He wears the formal dark clothing
of a 19th century scholar: a heavy dark frock coat over a waistcoat,
a white shirt with a dark cravat, and dark trousers with worn dress
shoes. He holds a rolled-up manuscript in one hand at his side. His
expression is serious and thoughtful, not angry, not smiling.

The character is centered in the image with generous even margins on
all sides. The ENTIRE image background, edge to edge across the whole
canvas, must be a single flat solid uniform mid-gray color —
absolutely no scenery, no buildings, no cityscape, no gradient, no
other content anywhere in the image outside of the single character.
No text, no labels, no shadow on the ground.
```

### Fabrikbesitzer / Kapitalist (Bourgeoisie-Perspektive)

Dateiname: `assets/characters/npcs/npc_fabrikbesitzer.png`

```
Detailed ink-and-wash style comic illustration with soft painterly
cel-shading (visible fine linework and subtle textured shading, not
perfectly flat single-color fills, similar to a moody graphic novel
illustration), bold black outlines around major shapes, a dark,
muted, weathered color palette (faded browns, grays, muted rust
tones) matching a somber 19th century industrial setting.

A single full-body character illustration of a wealthy 19th century
factory owner, a portly well-fed man in his fifties, standing in a
confident upright pose with his chin slightly raised, facing directly
forward toward the viewer, full body visible from the top of his hat
down to his shoes. He wears the expensive clothing of the
industrial upper class: a tall black top hat, a long dark tailcoat
over a richly colored waistcoat with a visible gold pocket watch
chain, a white high collar with a cravat, and polished dark shoes. He
rests both hands on a walking cane held in front of him. His
expression is self-satisfied and faintly condescending. His clothing
is noticeably cleaner and better kept than a worker's — no patches,
no soot stains.

The character is centered in the image with generous even margins on
all sides. The ENTIRE image background, edge to edge across the whole
canvas, must be a single flat solid uniform mid-gray color —
absolutely no scenery, no buildings, no cityscape, no gradient, no
other content anywhere in the image outside of the single character.
No text, no labels, no shadow on the ground.
```

### Älterer Arbeiterkollege (Proletariats-Perspektive)

Dateiname: `assets/characters/npcs/npc_arbeiter.png`

**Hinweis:** Bewusst deutlich **älter und hagerer** als die Spielfiguren gestaltet, damit die Schülis ihn nicht mit ihrer eigenen Figur verwechseln.

```
Detailed ink-and-wash style comic illustration with soft painterly
cel-shading (visible fine linework and subtle textured shading, not
perfectly flat single-color fills, similar to a moody graphic novel
illustration), bold black outlines around major shapes, a dark,
muted, weathered color palette (faded browns, grays, muted rust
tones) matching a somber 19th century industrial setting.

A single full-body character illustration of an ageing 19th century
factory worker, a thin gaunt man in his late fifties with a slightly
stooped posture and tired, deeply lined face, standing still and
facing directly forward toward the viewer, full body visible from his
cap down to his boots. He has short grey stubble and grey hair under
a worn flat cap. He wears heavily used work clothes: a patched
threadbare jacket over a collarless shirt, suspenders, baggy worn
trousers with visible repairs, and scuffed heavy boots. His clothes
show grime and soot stains. One hand rests on his lower back as if it
aches. His expression is weary and resigned but not hostile.

The character is centered in the image with generous even margins on
all sides. The ENTIRE image background, edge to edge across the whole
canvas, must be a single flat solid uniform mid-gray color —
absolutely no scenery, no buildings, no cityscape, no gradient, no
other content anywhere in the image outside of the single character.
No text, no labels, no shadow on the ground.
```

**Nach der Generierung (alle drei):**
1. Über den Download-Button sichern
2. Freistellen und zuschneiden (siehe unten)
3. In den Ordner `assets/characters/npcs/` legen, unter den oben genannten Dateinamen

Solange die Dateien fehlen, zeichnet das Spiel automatisch beschriftete Platzhalter-Silhouetten an den richtigen Stellen – du kannst ein Areal also schon vollständig durchspielen, bevor die Bilder fertig sind.

### Status Areal 0: erledigt ✓

Alle drei NPC-Bilder sind generiert, freigestellt und im Spiel eingebaut.
Die unbearbeiteten Originale liegen zur Sicherheit in
`assets/characters/_raw-reference-sheets/npc_*_original.jpg` – falls wir später
in anderer Größe neu zuschneiden wollen.

### Freistellen: wie es gemacht wurde

Der graue Hintergrund lässt sich **nicht** per einfachem Farbschlüssel entfernen:
Marx' Bart und Haare sowie die Kleidung des Arbeiters enthalten dieselben
Grautöne – ein globaler Farbfilter stanzt dort Löcher hinein.

Stattdessen wird ein **Flood-Fill vom Bildrand aus** verwendet: Nur
Hintergrund, der mit dem Bildrand zusammenhängt, wird transparent. Graue
Flächen innerhalb der Figur bleiben dadurch unangetastet. Anschließend wird
auf die Figur zugeschnitten und auf 500 px Höhe skaliert (Kontur läuft am Rand
weich aus, damit keine harten Treppenkanten entstehen).

Wenn du weitere NPCs generierst: Bilder ablegen und Bescheid sagen – das
Freistellen übernehme ich, du musst nichts von Hand schneiden.

---

## Atmosphäre-NPCs Areal 0 – erledigt ✓

Diese vier geben keine Aufgaben, sondern beleben die Karte mit je drei Zeilen
Dialog. **Alle vier sind generiert, freigestellt und eingebaut.** Damit haben
alle sieben NPCs in Areal 0 ihr Bild. Originale liegen in
`assets/characters/_raw-reference-sheets/npc_*_original.jpg`.

**Gleiches Vorgehen wie bei den drei Haupt-NPCs:** je ein eigener Gemini-Chat,
eine einzige Pose, über den Download-Button sichern, danach bei mir abgeben.

### Marktfrau → `npc_marktfrau.png`

```
Detailed ink-and-wash style comic illustration with soft painterly
cel-shading (visible fine linework and subtle textured shading, not
perfectly flat single-color fills, similar to a moody graphic novel
illustration), bold black outlines around major shapes, a dark,
muted, weathered color palette (faded browns, grays, muted rust
tones) matching a somber 19th century industrial setting.

A single full-body character illustration of a stout 19th century
market woman in her forties, standing with one hand on her hip and
the other resting on her apron, facing directly forward toward the
viewer, full body visible from her headscarf down to her shoes. She
wears a plain dark headscarf knotted at the back, a coarse blouse
with sleeves pushed up over reddened forearms, a broad work apron
with a front pocket, and a heavy long skirt. Her face is broad and
weathered, her expression shrewd and a little impatient — a woman
used to haggling all day.

The character is centered in the image with generous even margins on
all sides. The ENTIRE image background, edge to edge across the whole
canvas, must be a single flat solid uniform mid-gray color —
absolutely no scenery, no market stall, no goods, no gradient, no
other content anywhere in the image outside of the single character.
No text, no labels, no shadow on the ground.
```

### Botenjunge → `npc_kind.png`

**Hinweis:** Die erste Fassung dieses Prompts hat Gemini verweigert. Ausgelöst
hat das die Kombination aus konkretem Kindesalter, Körperbeschreibung
(„thin"), Armutsmerkmalen (zu große Kleidung, keine Schuhe) und verschmutztem
Gesicht – bei Minderjährigen greifen dort Schutzfilter, unabhängig vom Zweck.

Die Fassung unten umgeht das, ohne die Aussage zu verlieren: etwas älterer
Jugendlicher, Beschreibung ausschließlich über Kleidung und Haltung, Stiefel
statt nackter Füße, und eine ausdrückliche Einordnung als historische
Bildungsillustration. Die inhaltliche Schärfe trägt ohnehin der Dialog
(„Meine Schwester ist schon drin. Sie ist zehn."), nicht das Bild.

```
Detailed ink-and-wash style comic illustration with soft painterly
cel-shading (visible fine linework and subtle textured shading, not
perfectly flat single-color fills, similar to a moody graphic novel
illustration), bold black outlines around major shapes, a dark,
muted, weathered color palette (faded browns, grays, muted rust
tones) matching a somber 19th century industrial setting.

A respectful historical character illustration for an educational
history game about 19th century industrial society. A single
full-body illustration of a young teenage errand boy of about
fourteen, standing upright and calmly with his arms at his sides,
facing directly forward toward the viewer, full body visible from his
cap down to his boots. He wears the plain everyday clothing of a
working family: a flat cap, a jacket that is slightly too large with
a visible patch at one elbow, a collarless shirt, simple sturdy
trousers, and solid worn leather boots. His expression is calm and
matter-of-fact. Depict him fully clothed, dignified and in good
health.

The character is centered in the image with generous even margins on
all sides. The ENTIRE image background, edge to edge across the whole
canvas, must be a single flat solid uniform mid-gray color —
absolutely no scenery, no buildings, no gradient, no other content
anywhere in the image outside of the single character. No text, no
labels, no shadow on the ground.
```

**Falls Gemini auch das ablehnt:** „teenage errand boy of about fourteen"
durch „young factory worker in his late teens" ersetzen. Dann ist es
eindeutig kein Minderjährigen-Motiv mehr, und die Kernaussage bleibt über den
Dialog trotzdem erhalten.

### Werkmeister → `npc_aufseher.png`

```
Detailed ink-and-wash style comic illustration with soft painterly
cel-shading (visible fine linework and subtle textured shading, not
perfectly flat single-color fills, similar to a moody graphic novel
illustration), bold black outlines around major shapes, a dark,
muted, weathered color palette (faded browns, grays, muted rust
tones) matching a somber 19th century industrial setting.

A single full-body character illustration of a 19th century factory
foreman in his forties, standing squarely with folded arms, facing
directly forward toward the viewer, full body visible from head to
boots. His clothing sits between the workers and the owner: a dark
waistcoat over a clean shirt with the sleeves rolled up, a bowler
hat, sturdy trousers and solid boots — better kept than a worker's
clothes, far plainer than a gentleman's. A pocket watch chain and a
small notebook tucked into his waistcoat mark him as the man who
records who arrives late. His expression is stern and unsympathetic.

The character is centered in the image with generous even margins on
all sides. The ENTIRE image background, edge to edge across the whole
canvas, must be a single flat solid uniform mid-gray color —
absolutely no scenery, no machinery, no gradient, no other content
anywhere in the image outside of the single character. No text, no
labels, no shadow on the ground.
```

### Dienstmädchen → `npc_dienstmaedchen.png`

```
Detailed ink-and-wash style comic illustration with soft painterly
cel-shading (visible fine linework and subtle textured shading, not
perfectly flat single-color fills, similar to a moody graphic novel
illustration), bold black outlines around major shapes, a dark,
muted, weathered color palette (faded browns, grays, muted rust
tones) matching a somber 19th century industrial setting.

A single full-body character illustration of a young 19th century
domestic servant, a slim woman of about twenty, standing upright and
a little stiffly with her hands folded in front of her, facing
directly forward toward the viewer, full body visible from her cap
down to her shoes. She wears the uniform of a bourgeois household:
a small white ruffled cap, a dark high-necked long-sleeved dress,
and a clean starched white apron with straps over the shoulders. Her
clothes are noticeably cleaner and tidier than a factory worker's,
but plain and clearly not her own choosing. Her expression is
guarded and tired, her eyes slightly shadowed from short sleep.

The character is centered in the image with generous even margins on
all sides. The ENTIRE image background, edge to edge across the whole
canvas, must be a single flat solid uniform mid-gray color —
absolutely no scenery, no furniture, no gradient, no other content
anywhere in the image outside of the single character. No text, no
labels, no shadow on the ground.
```

---

## Areal 1: Fabrikhalle (Innenraum)

**Kontext:** Zweites Areal, Kernbegriffe **Mehrwert** (M7) und **Ausbeutung**
(M8). Bewusst **klein und eng** gehalten – hier steht nicht das Erkunden im
Vordergrund, sondern die Arbeit am Webstuhl.

**Benötigte begehbare Struktur:**
- Ein **breiter Mittelgang**, der die Halle der Länge nach durchzieht
- Links und rechts davon je eine Reihe Webstühle, dazwischen schmale Quergänge
- Ein **Materiallager** (Ballen Rohbaumwolle) an einem Ende
- Ein **Stapel fertiger Stoffballen** am anderen Ende
- Ein abgetrenntes **Kontor** (Büro des Fabrikbesitzers) mit Fenster zur Halle
- Eine **Tür nach draußen** – dort kommt später der Übergang zurück zum Marktplatz

**Unterschied zum Außenbereich Areal 0:** Der Boden wird weiterhin streng von
oben gezeigt, aber Maschinen, Wände und Regale stehen aufrecht mit sichtbarer
Vorderseite. Kein Himmel, keine Straßen – der Raum ist geschlossen.

**Was beim ersten Versuch schiefging (wichtig für alle weiteren Innenräume):**
Der erste Prompt lieferte ein **Puppenstuben-Diorama** – sichtbare Rückwand
*und* Seitenwand, dazu die Decke. Zwei Ursachen:

1. Die Formulierung „overhead line shafts running along the ceiling" hat eine
   Deckenansicht regelrecht erzwungen. **Niemals Decken-Elemente verlangen.**
2. Bei Innenräumen kippen Bildgeneratoren von sich aus in die Dioramaansicht.
   Es genügt nicht, „top-down" zu sagen – man muss ausdrücklich vorgeben, dass
   **nur eine einzige Wand** sichtbar ist, als flaches Band am oberen Bildrand.

Der Prompt unten schreibt das explizit vor und verbietet Decke, Seitenwände
und Fluchtpunkt einzeln.

**Prompt:**
```
Detailed ink-and-wash style comic illustration with soft painterly
cel-shading (visible fine linework and subtle textured shading, NOT
perfectly flat single-color fills), bold black outlines around major
shapes, a dark oppressive palette of soot blacks, greasy iron grays,
dull rust browns and dirty oil-stained wood, hazy air full of cotton
dust, heavy shadows, gritty and worn with visible grime, oil stains
and lint — avoid any clean, tidy or modern factory look.

PERSPECTIVE — follow this exactly, it is the most important part:
Use the flat top-down interior view of a 2D role-playing game like
Stardew Valley or a Pokémon Game Boy game. The wooden floor is seen
strictly from directly above and fills almost the entire image.
Exactly ONE wall is visible: a flat horizontal band running along the
TOP EDGE of the image only, seen perfectly face-on. There are NO side
walls, NO bottom wall, NO ceiling, NO roof, NO rafters, NO overhead
beams, shafts or belts of any kind, and NO view into the depth of the
room. Use a strictly orthographic projection: no vanishing point, no
converging lines, no tilt. Do not draw the room as a doll's-house
diorama or a cutaway box seen from an angle. Never show two sides of
any object at once.

All machines and furniture are drawn as flat upright cutouts standing
on the floor plane, each seen from the FRONT, all facing the viewer
in the same direction, like sprites placed on a map.

CONTENT — the interior of a small cramped 19th century textile mill:
Two horizontal rows of large mechanical power looms stand on the
floor, one row in the upper half and one in the lower half, leaving a
wide clear horizontal aisle of open floorboards between them and
narrow gaps between neighbouring machines. Against the wall at the
top edge, from left to right: stacked bales of raw cotton, a plain
closed wooden door, a small foreman's office booth with a large
window in its front face, and a stack of finished cloth bolts.

The open floor must be clearly LIGHTER and plainer in texture than
the machines and the wall, so that walkable floor and obstacles are
easy to tell apart at a glance.

The illustration must fill the whole canvas edge to edge, with no
black border, no frame and no vignette. Include no people, no text
and no signage.
```

**Nach der Generierung:** Über den echten Download-Button sichern und als
`assets/backgrounds/areal1_fabrikhalle.png` ablegen. Die Kollisionszonen
zeichne ich dann mit dem F2-Editor ein – bei einer Halle mit klaren Gängen
sind das deutlich weniger Polygone als in Areal 0.

---

*(Die Prompts für Areal 2, 3 und 4 wurden im Chat gegeben und sind hier noch nicht nachgetragen.)*

---

## Areal 5: Krisenplatz (Außenbereich)

**Kontext:** Letztes Spielareal, Kernbegriffe **Krise des Kapitalismus** (M16)
und **klassenlose Gesellschaft** (Gothaer Programm). Der Platz vor dem
Fabriktor, nachdem die Fabrik die Produktion eingestellt hat: Es wurde zu viel
produziert, deshalb steht alles still, deshalb hat niemand Arbeit. Der
Widerspruch muss **im Bild sichtbar** sein – volle Lager hinter einem
verschlossenen Tor.

**Benötigte begehbare Struktur:**
- Ein breiter, offener Platz als Hauptfläche über die ganze Kartenbreite
- Am oberen Bildrand als durchgehendes Band: die Fabrikfassade mit einem
  **großen, geschlossenen Tor** in der Mitte
- Rechts daneben ein **offenes Lagerhaustor**, dahinter bis unter die Decke
  gestapelte Stoffballen – die Ware, die niemand kauft
- Links ein paar **leere Marktstände** und eine **Feuertonne** als Treffpunkt
- Untere Bildhälfte offen: dort stehen später die NPCs

**Wichtig gegenüber Areal 0 und 3:** Diesmal keine Straßen, die aus dem Bild
führen – der Platz ist eine Sackgasse, das ist die Aussage. Der Winter macht
ihn zum kältesten Ort des Spiels.

**Prompt:**
```
[Stilguide siehe oben] +

A wide open 19th century factory yard in winter, using the hybrid
top-down perspective described above: the ground is seen strictly
from directly above and fills most of the image, while all buildings
and objects stand upright as flat cutouts with their FRONT FACADE
facing the viewer. Strictly orthographic — no vanishing point, no
converging lines, never two sides of any object at once, not
isometric, not a diorama.

The ground is a broad empty cobbled yard covered in trodden grey
snow and frozen mud, rendered plainly and clearly LIGHTER than every
building and object, so that walkable ground and obstacles are easy
to tell apart at a glance. The lower half of the yard is completely
empty and open.

Along the TOP EDGE of the image, as one continuous flat band seen
perfectly face-on: the soot-stained brick front wall of a large
textile mill, with small high windows, a tall chimney with NO smoke
rising from it, and in the centre a huge closed double gate of dark
timber, barred with a heavy chain and padlock. To the right of the
gate, in the same wall band, a wide warehouse doorway standing open,
and inside it bolts and bales of finished cloth stacked densely from
floor to ceiling, packed tight and overflowing toward the doorway.

Along the left edge of the yard: three empty wooden market stalls
with sagging, torn cloth awnings and bare counters, and a rusted
metal fire barrel with faint embers.

Everything is still and abandoned: no smoke, no movement, no goods
being carried. Include no people, no text, no signage, no lettering
and no other scenery beyond what is listed here.
```

**Nach der Generierung:** Über den echten Download-Button sichern und als
`assets/backgrounds/areal5_krisenplatz.jpg` ablegen.

**Charaktere:** keine neuen nötig. Areal 5 verwendet `npc_marx.png`,
`npc_fabrikbesitzer.png`, `npc_arbeiter.png`, `npc_marktfrau.png` und
`npc_arbeitergruppe.png` wieder.

**Keine Bilder für den Gegenwartsteil.** Die beiden Darstellungen (Amazon /
Mondragón) kommen bewusst ohne Logos, Fotos oder Firmenzeichen aus – das sind
geschützte Marken bzw. Lichtbilder, und das Repository soll öffentlich werden.
Der Vergleich läuft rein über Text.

---

## Epilog: Petrograd 1917 (Außenbereich)

**Kontext:** Letzte Station, kurzer Gang ohne Aufgabe. Der Moment ist bewusst
**vor der Oktoberrevolution** gewählt: Der Zar ist seit dem Frühjahr weg, der
Krieg läuft weiter, das Brot ist knapp – und es ist offen, wer regieren wird.
Genau da hört das Spiel auf; der Oktober ist der erste Satz der Folgestunde.

**Namensform:** 1917 hieß die Stadt **Petrograd**. St. Petersburg wurde 1914
bei Kriegsbeginn umbenannt, weil der Name zu deutsch klang; erst 1924 wurde
daraus Leningrad. Im Spiel steht deshalb durchgehend Petrograd.

**Benötigte begehbare Struktur:**
- Ein breiter, offener Platz über die ganze Kartenbreite
- Am oberen Bildrand als Band: eine Häuserzeile, darin eine **Bäckerei** mit
  Schaufenster (davor stellt sich später die Warteschlange auf)
- Rechts ein **Fabriktor, weit offen** – das Gegenbild zum verriegelten Tor
  aus Areal 5
- Untere Bildhälfte frei: dort stehen die NPCs

**Der eine Farbbruch:** Das Spiel ist seit sechs Arealen konsequent grau,
rostbraun und trüb. Hier hängen zum ersten Mal **rote Fahnen** – die einzige
gesättigte Farbe im ganzen Spiel. Alles andere bleibt beim gewohnten Stilguide.
Das ist der ganze visuelle Effekt des Epilogs und darf deshalb nicht durch
weitere bunte Elemente verwässert werden.

**Keine Schrift.** Weder kyrillische noch lateinische Buchstaben, keine
Ladenschilder, keine Parolen auf den Fahnen. Falsch geschriebenes Russisch auf
einem Unterrichtsmaterial wäre peinlich, und der Stilguide verbietet Text ohnehin.

**Prompt:**
```
[Stilguide siehe oben] +

A wide open city square in Petrograd in late 1917, in winter, using the
hybrid top-down perspective described above: the ground is seen
strictly from directly above and fills most of the image, while all
buildings and objects stand upright as flat cutouts with their FRONT
FACADE facing the viewer. Strictly orthographic — no vanishing point,
no converging lines, never two sides of any object at once, not
isometric, not a diorama.

The ground is a broad open square of grey cobblestones under trodden
snow and frozen slush, rendered plainly and clearly LIGHTER than every
building and object so that walkable ground and obstacles are easy to
tell apart at a glance. The lower half of the square is completely
empty and open.

Along the TOP EDGE of the image, as one continuous flat band seen
perfectly face-on: a row of tall, soot-stained plastered apartment
house fronts with many small windows, several of them boarded up. In
the left third of this row, at street level, a bakery shopfront with a
large window and a closed door. In the right third, a wide factory
gateway standing WIDE OPEN, its two iron gates swung back against the
wall.

Hanging from the upper windows and from the open factory gate: several
large plain RED banners and flags, deep crimson, completely blank with
no writing, no symbols and no emblems. These red cloths are the only
saturated colour anywhere in the image; everything else stays in the
muted grey, rust brown and washed-out palette.

The square is otherwise still and empty: no people, no vehicles, no
horses. Include no text, no letters, no signage and no other scenery
beyond what is listed here.
```

**Nach der Generierung:** Über den echten Download-Button sichern und als
`assets/backgrounds/epilog_petrograd.jpg` ablegen.

**Charaktere:** keine neuen. Der Epilog verwendet `npc_arbeitergruppe.png`
(Brotschlange), `npc_arbeiter.png` (der Vorleser) und `npc_marktfrau.png`
wieder. Der Vorleser bleibt **anonym** – kein Lenin, keine benannte Figur.
Sobald er einen Namen bekommt, ist die Deutung schon getroffen; namenlos
bleibt es das, was es historisch war: ein Text, der in vielen Händen umlief.

---

## Lenin für den Epilog

**Kontext:** Im Epilog gibt es zwei Redner. Der erste bleibt anonym und liest
Marx vor; der zweite ist **Lenin** und sagt etwas anderes als Marx. Genau
dieser Bruch ist die Brücke zur Folgestunde, deshalb bekommt er ein eigenes
Bild statt eines geliehenen Sprites.

**Historisch:** Herbst 1917, Lenin ist 47. Kein Anzugträger mit Krawatte im
Kreml-Stil – das kam später. In dieser Zeit trug er einen dunklen
Dreiteiler, oft eine Schiebermütze, und er sprach von Kisten und
improvisierten Rednertribünen herab.

**Prompt:**
```
[Stilguide für Figuren siehe oben – dieselbe Tuschezeichnung mit
weicher Kolorierung, bold black outlines, gedämpfte Palette wie bei
den übrigen NPCs] +

A single full-body character illustration of a man in his late
forties, standing upright and seen strictly from the FRONT, facing
the viewer, in the same ink-and-wash comic style with bold black
outlines and muted grey-brown colouring as the other characters.

He is a Russian political speaker of 1917: short and stocky, bald on
top with a close-trimmed reddish-brown beard and moustache, high
forehead, intent narrow eyes. He wears a plain dark three-piece suit,
slightly rumpled, with a waistcoat and a dark tie, and a worker's flat
cap held in one hand at his side. The other arm is raised in a short,
controlled speaking gesture — not theatrical, not a raised fist, more
like someone making a point in an argument.

Full body from head to shoes, standing on nothing, centred, with
generous empty margin on all four sides.

Plain flat WHITE background, completely empty, no floor, no shadow on
the ground, no scenery, no props, no podium, no crate, no flag, no
text and no lettering anywhere.
```

**Wichtig für das Freistellen:** ausdrücklich weißer Hintergrund **ohne
Bodenschatten** verlangt – bei der Arbeitergruppe hat ein grauer Schatten
zwei Anläufe gekostet, weil er farblich zu weit vom Weiß entfernt lag.

**Nach der Generierung:** Über den Download-Button sichern und im
Hauptverzeichnis ablegen; ich stelle frei und lege die Datei als
`assets/characters/npcs/npc_lenin.png` ab. Bis dahin läuft der Epilog mit
einem Platzhalter (Kopie des Werkmeister-Sprites) – der Ablauf ist damit
schon vollständig getestet.

---

---

## Die Rednerkiste im Epilog

**Kontext:** Beide Redner im Epilog stehen laut Text auf einer umgedrehten
Kiste – der anonyme Vorleser und Lenin. Das ist die visuelle Klammer der Szene:
dieselbe improvisierte Tribüne, einmal liest jemand Marx vor, einmal sagt
jemand im Namen von Marx etwas anderes. Ein Asset genügt für beide. Bei Lenins
Figurenprompt war „no podium, no crate" ausdrücklich verlangt, damit die Figur
freistellbar bleibt.

**Prompt:**
```
[Stilguide für Figuren – dieselbe Tuschezeichnung mit weicher Kolorierung,
bold black outlines, gedämpfte Palette wie bei den NPCs] +

A single wooden packing crate, empty and turned upside down so that its
flat bottom faces up and forms a small platform someone could stand on.
Drawn in the same ink-and-wash comic style with bold black outlines and
muted grey-brown colouring as the game's characters.

Rough sawn planks with visible grain and nail heads, edges worn and
splintered, the wood weathered grey-brown, one plank slightly darker
than the rest. Sturdy and plain — a shipping crate, not furniture, no
lid, no hinges, no rope, no lettering or stencilled marks of any kind.

Seen from the FRONT and very slightly from above, so that both the front
face and a shallow sliver of the flat top surface are visible. Centred,
with generous empty margin on all four sides.

Plain flat WHITE background, completely empty, no floor, no shadow on
the ground, no scenery, no props, no text and no lettering anywhere.
```

**Warum die sichtbare Oberseite:** Ohne den schmalen Streifen der Deckfläche
sieht es aus, als stünde die Figur hinter der Kiste statt darauf.

**Einbau:** Die Engine zeichnete arealspezifische Extras bisher nur über den
Figuren (`zeichneWelt`, für die vernagelten Läden in Areal 3). Eine Kiste muss
darunter liegen, sonst verdeckt ihre Vorderseite die Beine. Dafür gibt es jetzt
`zeichneBoden`, der zwischen Hintergrund und Figuren läuft. Die Kiste ist 55
Bildschirmpixel hoch – eine Figur misst 176 px bei 1,70 m, also sind 100 px
etwa ein Meter, und die Kiste kommt damit auf gut einen halben. Beide Redner
stehen 61 Bildpixel über dem Boden, damit die Füße auf der Deckfläche landen.
