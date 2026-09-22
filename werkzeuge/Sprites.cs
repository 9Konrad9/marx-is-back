using System; using System.Drawing; using System.Drawing.Imaging; using System.Collections.Generic;

// Schneidet die acht Spielerposen neu aus dem Referenzblatt - ohne zu raten,
// welche Zelle welche Richtung ist.
//
// Das Blatt ist unordentlich: sechs Spalten statt vier, doppelte Posen, und
// die Blickrichtungen stehen nicht spaltentreu. Statt das von Hand zuzuordnen,
// dienen die VORHANDENEN Sprite-Dateien als Vorlage: Fuer jede von ihnen wird
// die Zelle gesucht, deren Silhouette am besten passt (auch gespiegelt), und
// nur deren Pixel werden ersetzt. Bildgroesse, Fusspunkt und Zuordnung der
// Richtungen bleiben damit garantiert so, wie sie im Spiel schon stimmen.
public class Sprites {

  class Zelle { public Bitmap bild; public int w, h; }

  static List<Zelle> Zerlege(string blatt, int tol, int voll, int dicke) {
    Bitmap src = new Bitmap(blatt);
    int w, h; byte[] s = FreistellerGrau.Lies(src, out w, out h);
    int loecher; int[] bg;
    byte[] al = FreistellerGrau.Maske(s, w, h, tol, voll, dicke, out loecher, out bg);
    for (int p = 0; p < w*h; p++) s[p*4+3] = al[p];
    Bitmap frei = FreistellerGrau.Baue(s, w, h);

    // Zusammenhaengende Figuren finden (8er-Nachbarschaft, damit ein
    // vorgesetzter Fuss nicht als eigene Figur zaehlt)
    int n = w*h; int[] marke = new int[n]; List<Zelle> aus = new List<Zelle>();
    int lauf = 0;
    for (int p0 = 0; p0 < n; p0++) {
      if (al[p0] < 40 || marke[p0] != 0) continue;
      lauf++; Queue<int> q = new Queue<int>(); q.Enqueue(p0); marke[p0] = lauf;
      int mnX=w, mxX=0, mnY=h, mxY=0, zahl=0;
      while (q.Count > 0) {
        int p = q.Dequeue(); zahl++;
        int x=p%w, y=p/w;
        if (x<mnX) mnX=x; if (x>mxX) mxX=x; if (y<mnY) mnY=y; if (y>mxY) mxY=y;
        for (int dy=-1; dy<=1; dy++) for (int dx=-1; dx<=1; dx++) {
          int nx=x+dx, ny=y+dy;
          if (nx<0||ny<0||nx>=w||ny>=h) continue;
          int c=ny*w+nx;
          if (marke[c]!=0 || al[c]<40) continue;
          marke[c]=lauf; q.Enqueue(c);
        }
      }
      if (zahl < 20000) continue;                 // Sprenkel verwerfen
      Zelle z = new Zelle();
      z.w = mxX-mnX+1; z.h = mxY-mnY+1;
      z.bild = frei.Clone(new Rectangle(mnX, mnY, z.w, z.h), PixelFormat.Format32bppArgb);
      aus.Add(z);
    }
    return aus;
  }

  static byte[] Silhouette(Bitmap b, int gw, int gh, bool spiegeln) {
    Bitmap norm = new Bitmap(gw, gh, PixelFormat.Format32bppArgb);
    using (Graphics g = Graphics.FromImage(norm)) {
      g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
      g.DrawImage(b, 0, 0, gw, gh);
    }
    if (spiegeln) norm.RotateFlip(RotateFlipType.RotateNoneFlipX);
    int w,h; byte[] s = FreistellerGrau.Lies(norm, out w, out h);
    byte[] m = new byte[gw*gh];
    for (int p = 0; p < gw*gh; p++) m[p] = (byte)(s[p*4+3] >= 128 ? 1 : 0);
    return m;
  }

  static double Deckung(byte[] a, byte[] b) {
    int schnitt = 0, ver = 0;
    for (int i = 0; i < a.Length; i++) {
      if (a[i]==1 && b[i]==1) schnitt++;
      if (a[i]==1 || b[i]==1) ver++;
    }
    return ver == 0 ? 0 : (double)schnitt/ver;
  }

  public static string Ersetze(string blatt, string[] ziele, string ausOrdner,
                               int tol, int voll, int dicke) {
    List<Zelle> zellen = Zerlege(blatt, tol, voll, dicke);
    System.IO.Directory.CreateDirectory(ausOrdner);
    System.Text.StringBuilder sb = new System.Text.StringBuilder();
    sb.Append(System.IO.Path.GetFileName(blatt) + ": " + zellen.Count + " Posen im Blatt\n");
    const int GW = 96, GH = 192;

    foreach (string ziel in ziele) {
      Bitmap alt = new Bitmap(ziel);
      int aw, ah; byte[] sa = FreistellerGrau.Lies(alt, out aw, out ah);
      int mnX=aw, mxX=-1, mnY=ah, mxY=-1;
      for (int p = 0; p < aw*ah; p++) {
        if (sa[p*4+3] < 40) continue;
        int x=p%aw, y=p/aw;
        if (x<mnX) mnX=x; if (x>mxX) mxX=x; if (y<mnY) mnY=y; if (y>mxY) mxY=y;
      }
      Bitmap altAusschnitt = alt.Clone(new Rectangle(mnX,mnY,mxX-mnX+1,mxY-mnY+1),
                                       PixelFormat.Format32bppArgb);
      byte[] vorlage = Silhouette(altAusschnitt, GW, GH, false);

      double best = -1; int bestI = -1; bool bestSpiegel = false;
      for (int i = 0; i < zellen.Count; i++) {
        for (int sp = 0; sp < 2; sp++) {
          double dk = Deckung(vorlage, Silhouette(zellen[i].bild, GW, GH, sp==1));
          if (dk > best) { best = dk; bestI = i; bestSpiegel = (sp==1); }
        }
      }

      int zw = mxX-mnX+1, zh = mxY-mnY+1;
      Bitmap neu = new Bitmap(aw, ah, PixelFormat.Format32bppArgb);
      using (Graphics g = Graphics.FromImage(neu)) {
        g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
        Bitmap q = new Bitmap(zellen[bestI].bild);
        if (bestSpiegel) q.RotateFlip(RotateFlipType.RotateNoneFlipX);
        g.DrawImage(q, new Rectangle(mnX, mnY, zw, zh),
                    new Rectangle(0, 0, q.Width, q.Height), GraphicsUnit.Pixel);
      }
      neu.Save(System.IO.Path.Combine(ausOrdner, System.IO.Path.GetFileName(ziel)), ImageFormat.Png);
      sb.Append(string.Format("  {0,-26} Pose {1}{2}  Deckung {3:0.000}  {4}x{5} Kasten {6},{7} {8}x{9}\n",
        System.IO.Path.GetFileName(ziel), bestI, bestSpiegel ? " gespiegelt" : "          ",
        best, aw, ah, mnX, mnY, zw, zh));
    }
    return sb.ToString();
  }
}
