using System; using System.Drawing; using System.Drawing.Imaging; using System.Collections.Generic;

// Freisteller fuer die Gemini-Bilder auf weissem Grund.
//
// Drei Schritte:
//   1. Randverbundene Flutfuellung entfernt den aeusseren Hintergrund.
//   2. Eingeschlossene reine Weissflaechen (zwischen Arm und Koerper) werden
//      zusaetzlich entfernt - aber nur, wenn sie wirklich Hintergrund sind:
//      Mittelwert ueber 244 bei sehr geringer Streuung. Gezeichnetes Weiss
//      wie Baumwollflusen oder Papier hat Schattierung und bleibt stehen.
//   3. Weicher Saum: Vom Hintergrund aus hoechstens drei Schritte weit, und
//      nur ueber helle Pixel. Dunkle Konturlinien blockieren und bleiben voll
//      deckend - dadurch verschwindet der helle JPEG-Saum, ohne dass die
//      Zeichnung angeknabbert wird.
public class Freisteller {

  public static byte[] Maske(byte[] s, int w, int h, out int loecher) {
    int n = w * h;
    bool[] bg = new bool[n];
    Queue<int> q = new Queue<int>();
    for (int x = 0; x < w; x++) { q.Enqueue(x); q.Enqueue((h - 1) * w + x); }
    for (int y = 0; y < h; y++) { q.Enqueue(y * w); q.Enqueue(y * w + w - 1); }
    while (q.Count > 0) {
      int p = q.Dequeue(); if (p < 0 || p >= n || bg[p]) continue;
      int i = p * 4; int bb = s[i], gg = s[i + 1], rr = s[i + 2];
      int mn = Math.Min(rr, Math.Min(gg, bb)), mx = Math.Max(rr, Math.Max(gg, bb));
      if (mn < 238 || mx - mn > 14) continue;
      bg[p] = true; int x2 = p % w, y2 = p / w;
      if (x2 > 0) q.Enqueue(p - 1); if (x2 < w - 1) q.Enqueue(p + 1);
      if (y2 > 0) q.Enqueue(p - w); if (y2 < h - 1) q.Enqueue(p + w);
    }

    loecher = 0; bool[] ges = new bool[n];
    for (int p0 = 0; p0 < n; p0++) {
      if (bg[p0] || ges[p0]) continue;
      int i0 = p0 * 4;
      int mn0 = Math.Min(s[i0 + 2], Math.Min(s[i0 + 1], s[i0]));
      int mx0 = Math.Max(s[i0 + 2], Math.Max(s[i0 + 1], s[i0]));
      if (mn0 <= 225 || mx0 - mn0 >= 14) continue;
      List<int> grp = new List<int>(); Queue<int> q2 = new Queue<int>();
      q2.Enqueue(p0); ges[p0] = true;
      while (q2.Count > 0) {
        int p = q2.Dequeue(); grp.Add(p); int x = p % w, y = p / w;
        int[] nb = { x > 0 ? p - 1 : -1, x < w - 1 ? p + 1 : -1, y > 0 ? p - w : -1, y < h - 1 ? p + w : -1 };
        foreach (int c in nb) {
          if (c < 0 || ges[c] || bg[c]) continue; int i = c * 4;
          int mn = Math.Min(s[i + 2], Math.Min(s[i + 1], s[i])), mx = Math.Max(s[i + 2], Math.Max(s[i + 1], s[i]));
          if (mn > 225 && mx - mn < 14) { ges[c] = true; q2.Enqueue(c); }
        }
      }
      if (grp.Count < 25) continue;
      double sum = 0; foreach (int p in grp) { int i = p * 4; sum += (s[i] + s[i + 1] + s[i + 2]) / 3.0; }
      double mit = sum / grp.Count, va = 0;
      foreach (int p in grp) { int i = p * 4; double d = (s[i] + s[i + 1] + s[i + 2]) / 3.0 - mit; va += d * d; }
      if (mit < 244 || Math.Sqrt(va / grp.Count) > 12) continue;
      foreach (int p in grp) bg[p] = true;
      loecher++;
    }

    byte[] al = new byte[n]; int[] tf = new int[n];
    for (int p = 0; p < n; p++) { al[p] = (byte)(bg[p] ? 0 : 255); tf[p] = bg[p] ? 0 : 99; }
    Queue<int> rq = new Queue<int>();
    for (int p = 0; p < n; p++) if (bg[p]) rq.Enqueue(p);
    while (rq.Count > 0) {
      int p = rq.Dequeue(); if (tf[p] >= 3) continue;
      int x = p % w, y = p / w;
      int[] nb = { x > 0 ? p - 1 : -1, x < w - 1 ? p + 1 : -1, y > 0 ? p - w : -1, y < h - 1 ? p + w : -1 };
      foreach (int c in nb) {
        if (c < 0 || bg[c] || tf[c] <= tf[p] + 1) continue;
        int i = c * 4; int L = (s[i] + s[i + 1] + s[i + 2]) / 3;
        if (L <= 150) continue;
        int a = (int)Math.Round(255.0 * (238 - L) / 38.0);
        if (a < 0) a = 0; if (a > 255) a = 255;
        if (a < al[c]) al[c] = (byte)a;
        tf[c] = tf[p] + 1; rq.Enqueue(c);
      }
    }
    return al;
  }

  static byte[] Lies(Bitmap b, out int w, out int h) {
    w = b.Width; h = b.Height; int n = w * h;
    BitmapData d = b.LockBits(new Rectangle(0, 0, w, h), ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
    byte[] s = new byte[n * 4];
    System.Runtime.InteropServices.Marshal.Copy(d.Scan0, s, 0, s.Length);
    b.UnlockBits(d); return s;
  }

  static Bitmap Baue(byte[] s, int w, int h) {
    Bitmap dst = new Bitmap(w, h, PixelFormat.Format32bppArgb);
    BitmapData dd = dst.LockBits(new Rectangle(0, 0, w, h), ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb);
    System.Runtime.InteropServices.Marshal.Copy(s, 0, dd.Scan0, s.Length);
    dst.UnlockBits(dd); return dst;
  }

  static Rectangle Kasten(byte[] al, int w, int x1, int x2, int y1, int y2) {
    int mnX = x2, mxX = x1, mnY = y2, mxY = y1;
    for (int y = y1; y <= y2; y++) for (int x = x1; x <= x2; x++) if (al[y * w + x] >= 8) {
      if (x < mnX) mnX = x; if (x > mxX) mxX = x; if (y < mnY) mnY = y; if (y > mxY) mxY = y; }
    return new Rectangle(mnX, mnY, mxX - mnX + 1, mxY - mnY + 1);
  }

  static Bitmap Skaliere(Bitmap src, int hoehe) {
    int nh = hoehe, nw = (int)Math.Round(src.Width * (double)hoehe / src.Height);
    Bitmap fin = new Bitmap(nw, nh, PixelFormat.Format32bppArgb);
    using (Graphics g = Graphics.FromImage(fin)) {
      g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
      g.DrawImage(src, 0, 0, nw, nh);
    }
    return fin;
  }

  // Eine einzelne Figur, optional aus einem Bildausschnitt.
  public static string Einzeln(string ein, string aus, int hoehe, int cx, int cy, int cw, int ch) {
    Bitmap voll = new Bitmap(ein);
    Bitmap src = (cw > 0) ? voll.Clone(new Rectangle(cx, cy, cw, ch), PixelFormat.Format32bppArgb) : new Bitmap(voll);
    int w, h; byte[] s = Lies(src, out w, out h);
    int loecher; byte[] al = Maske(s, w, h, out loecher);
    for (int p = 0; p < w * h; p++) s[p * 4 + 3] = al[p];
    Bitmap dst = Baue(s, w, h);
    int minX = w, minY = h, maxX = -1, maxY = -1;
    for (int p = 0; p < w * h; p++) { if (al[p] < 8) continue; int x = p % w, y = p / w;
      if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y; }
    Bitmap kl = dst.Clone(new Rectangle(minX, minY, maxX - minX + 1, maxY - minY + 1), PixelFormat.Format32bppArgb);
    Bitmap fin = Skaliere(kl, hoehe);
    fin.Save(aus, ImageFormat.Png);
    return System.IO.Path.GetFileName(aus) + ": " + fin.Width + "x" + fin.Height + ", Weissflaechen entfernt: " + loecher;
  }

  // Referenzblatt mit acht Posen in zwei Reihen zu vier.
  // Die Blickrichtungen sind bei Gemini nicht spaltentreu, deshalb werden die
  // Paare fest zugeordnet: rechts = Spalte 3 Stand + Spalte 4 Schritt,
  // links = Spalte 4 Stand + Spalte 3 Schritt.
  public static string Blatt(string ein, string ordner, string praefix, bool linksSpiegeln, int hoehe) {
    Bitmap src = new Bitmap(ein);
    int w, h; byte[] s = Lies(src, out w, out h);
    int loecher; byte[] al = Maske(s, w, h, out loecher);
    for (int p = 0; p < w * h; p++) s[p * 4 + 3] = al[p];
    Bitmap frei = Baue(s, w, h);

    List<int[]> bd = new List<int[]>(); int st = -1;
    for (int y = 0; y < h; y++) {
      bool v = false; for (int x = 0; x < w; x++) if (al[y * w + x] >= 8) { v = true; break; }
      if (v && st < 0) st = y;
      if (!v && st >= 0) { if (y - st > 40) bd.Add(new int[] { st, y - 1 }); st = -1; }
    }
    if (st >= 0 && h - st > 40) bd.Add(new int[] { st, h - 1 });
    if (bd.Count != 2) return "FEHLER: " + bd.Count + " Baender";

    List<Rectangle[]> zellen = new List<Rectangle[]>();
    foreach (int[] band in bd) {
      List<Rectangle> sp = new List<Rectangle>(); int cs = -1;
      for (int x = 0; x < w; x++) {
        bool v = false; for (int y = band[0]; y <= band[1]; y++) if (al[y * w + x] >= 8) { v = true; break; }
        if (v && cs < 0) cs = x;
        if (!v && cs >= 0) { if (x - cs > 25) sp.Add(Kasten(al, w, cs, x - 1, band[0], band[1])); cs = -1; }
      }
      if (cs >= 0 && w - cs > 25) sp.Add(Kasten(al, w, cs, w - 1, band[0], band[1]));
      if (sp.Count != 4) return "FEHLER: " + sp.Count + " Spalten";
      zellen.Add(sp.ToArray());
    }

    var paare = new Dictionary<string, int[][]>();
    paare["front"] = new int[][] { new int[] { 0, 0 }, new int[] { 1, 0 } };
    paare["back"]  = new int[][] { new int[] { 0, 1 }, new int[] { 1, 1 } };
    paare["right"] = new int[][] { new int[] { 0, 2 }, new int[] { 1, 3 } };
    paare["left"]  = new int[][] { new int[] { 0, 3 }, new int[] { 1, 2 } };
    System.IO.Directory.CreateDirectory(ordner);
    foreach (var kv in paare) {
      Rectangle a = zellen[kv.Value[0][0]][kv.Value[0][1]];
      Rectangle b = zellen[kv.Value[1][0]][kv.Value[1][1]];
      int bw = Math.Max(a.Width, b.Width), bh = Math.Max(a.Height, b.Height);
      string[] art = { "idle", "walk" }; Rectangle[] rechtecke = { a, b };
      for (int k = 0; k < 2; k++) {
        Bitmap kasten = new Bitmap(bw, bh, PixelFormat.Format32bppArgb);
        using (Graphics g = Graphics.FromImage(kasten))
          g.DrawImage(frei, new Rectangle((bw - rechtecke[k].Width) / 2, bh - rechtecke[k].Height,
                                          rechtecke[k].Width, rechtecke[k].Height), rechtecke[k], GraphicsUnit.Pixel);
        if (linksSpiegeln && kv.Key == "left" && k == 0) kasten.RotateFlip(RotateFlipType.RotateNoneFlipX);
        Bitmap fin = Skaliere(kasten, hoehe);
        fin.Save(System.IO.Path.Combine(ordner, praefix + "_" + kv.Key + "_" + art[k] + ".png"), ImageFormat.Png);
      }
    }
    return praefix + ": 8 Posen, Weissflaechen entfernt: " + loecher;
  }
}
