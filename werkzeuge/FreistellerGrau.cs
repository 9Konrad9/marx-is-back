using System; using System.Drawing; using System.Drawing.Imaging; using System.Collections.Generic;

// Freisteller fuer die Gemini-Blaetter auf GRAUEM Grund.
//
// Gleiche drei Schritte wie beim weissen Freisteller, aber die Schwelle
// haengt nicht an "fast weiss", sondern am tatsaechlich gemessenen
// Hintergrundton des Blattes. Der wird aus dem Randring als Median
// bestimmt - Gemini liefert je Blatt einen anderen Grauwert (129 bis 156).
public class FreistellerGrau {

  public static int[] BgFarbe(byte[] s, int w, int h) {
    List<int> R=new List<int>(), G=new List<int>(), B=new List<int>();
    for (int x = 0; x < w; x += 3) { Nimm(s, x, R, G, B); Nimm(s, (h-1)*w+x, R, G, B); }
    for (int y = 0; y < h; y += 3) { Nimm(s, y*w, R, G, B); Nimm(s, y*w+w-1, R, G, B); }
    R.Sort(); G.Sort(); B.Sort();
    return new int[] { R[R.Count/2], G[G.Count/2], B[B.Count/2] };
  }
  static void Nimm(byte[] s, int p, List<int> R, List<int> G, List<int> B) {
    int i=p*4; B.Add(s[i]); G.Add(s[i+1]); R.Add(s[i+2]);
  }

  static int Abstand(byte[] s, int p, int[] bg) {
    int i=p*4;
    return Math.Max(Math.Abs(s[i+2]-bg[0]), Math.Max(Math.Abs(s[i+1]-bg[1]), Math.Abs(s[i]-bg[2])));
  }
  static int Streuung(byte[] s, int p) {
    int i=p*4; int mn=Math.Min(s[i+2],Math.Min(s[i+1],s[i])), mx=Math.Max(s[i+2],Math.Max(s[i+1],s[i]));
    return mx-mn;
  }

  // Passt irgendwo im Gebiet ein Quadrat der Kantenlaenge 2*r+1?
  // Damit bleiben duenne Streifen stehen - beim Webstuhl die Luecken
  // zwischen den Kettfaeden, die sonst aufgerissen wuerden.
  static bool Dick(List<int> grp, int w, int h, int r) {
    HashSet<int> menge = new HashSet<int>(grp);
    foreach (int p in grp) {
      int x = p % w, y = p / w;
      if (x < r || y < r || x >= w-r || y >= h-r) continue;
      bool voll = true;
      for (int dy = -r; dy <= r && voll; dy++)
        for (int dx = -r; dx <= r; dx++)
          if (!menge.Contains((y+dy)*w + x+dx)) { voll = false; break; }
      if (voll) return true;
    }
    return false;
  }

  // tol   = wie weit ein Pixel vom Blattgrund abweichen darf und trotzdem
  //         als Hintergrund gilt (knapp halten, sonst frisst es helle Schuerzen)
  // voll  = ab welchem Abstand ein Pixel voll deckend ist (Saumrampe)
  // dicke = Mindestdicke einer eingeschlossenen Flaeche; 0 = keine Pruefung,
  //         -1 = Schritt 2 ganz aus (Taler: seine Flaeche IST Blattgrau)
  public static byte[] Maske(byte[] s, int w, int h, int tol, int voll, int dicke,
                             out int loecher, out int[] bg) {
    int n = w*h;
    bg = BgFarbe(s, w, h);
    int bgL = (bg[0]+bg[1]+bg[2])/3;

    bool[] hg = new bool[n];
    Queue<int> q = new Queue<int>();
    for (int x = 0; x < w; x++) { q.Enqueue(x); q.Enqueue((h-1)*w+x); }
    for (int y = 0; y < h; y++) { q.Enqueue(y*w); q.Enqueue(y*w+w-1); }
    while (q.Count > 0) {
      int p = q.Dequeue(); if (p < 0 || p >= n || hg[p]) continue;
      if (Abstand(s,p,bg) > tol || Streuung(s,p) > 12) continue;
      hg[p] = true; int x2=p%w, y2=p/w;
      if (x2>0) q.Enqueue(p-1); if (x2<w-1) q.Enqueue(p+1);
      if (y2>0) q.Enqueue(p-w); if (y2<h-1) q.Enqueue(p+w);
    }

    // Schritt 2: eingeschlossene Blattgrund-Flaechen (Arm/Koerper, Maschinen-
    // rahmen). Nur wenn das Gebiet wirklich flau ist - gezeichnetes Grau hat
    // Struktur und bleibt stehen.
    loecher = 0; bool[] ges = new bool[n];
    for (int p0 = 0; p0 < n; p0++) {
      if (dicke < 0 || hg[p0] || ges[p0]) continue;
      if (Abstand(s,p0,bg) > tol + 4 || Streuung(s,p0) > 12) continue;
      List<int> grp = new List<int>(); Queue<int> q2 = new Queue<int>();
      q2.Enqueue(p0); ges[p0] = true;
      while (q2.Count > 0) {
        int p = q2.Dequeue(); grp.Add(p); int x=p%w, y=p/w;
        int[] nb = { x>0?p-1:-1, x<w-1?p+1:-1, y>0?p-w:-1, y<h-1?p+w:-1 };
        foreach (int c in nb) {
          if (c < 0 || ges[c] || hg[c]) continue;
          if (Abstand(s,c,bg) <= tol + 4 && Streuung(s,c) <= 12) { ges[c] = true; q2.Enqueue(c); }
        }
      }
      if (grp.Count < 30) continue;
      double sum = 0; foreach (int p in grp) { int i=p*4; sum += (s[i]+s[i+1]+s[i+2])/3.0; }
      double mit = sum/grp.Count, va = 0;
      foreach (int p in grp) { int i=p*4; double d=(s[i]+s[i+1]+s[i+2])/3.0-mit; va += d*d; }
      if (Math.Abs(mit-bgL) > tol + 2 || Math.Sqrt(va/grp.Count) > 9) continue;
      if (dicke > 0 && !Dick(grp, w, h, dicke)) continue;
      foreach (int p in grp) hg[p] = true;
      loecher++;
    }

    // Schritt 3: weicher Saum, hoechstens drei Schritte weit vom Hintergrund
    // aus und nur ueber Pixel, die noch nahe am Blattgrund liegen. Die
    // schwarze Konturlinie liegt weit weg und blockiert sofort.
    byte[] al = new byte[n]; int[] tf = new int[n];
    for (int p = 0; p < n; p++) { al[p] = (byte)(hg[p] ? 0 : 255); tf[p] = hg[p] ? 0 : 99; }
    Queue<int> rq = new Queue<int>();
    for (int p = 0; p < n; p++) if (hg[p]) rq.Enqueue(p);
    while (rq.Count > 0) {
      int p = rq.Dequeue(); if (tf[p] >= 3) continue;
      int x=p%w, y=p/w;
      int[] nb = { x>0?p-1:-1, x<w-1?p+1:-1, y>0?p-w:-1, y<h-1?p+w:-1 };
      foreach (int c in nb) {
        if (c < 0 || hg[c] || tf[c] <= tf[p]+1) continue;
        int dist = Abstand(s,c,bg);
        if (dist >= voll) continue;
        int a = (int)Math.Round(255.0 * (dist - tol) / (double)(voll - tol));
        if (a < 0) a = 0; if (a > 255) a = 255;
        if (a < al[c]) al[c] = (byte)a;
        tf[c] = tf[p]+1; rq.Enqueue(c);
      }
    }
    return al;
  }

  public static byte[] Lies(Bitmap b, out int w, out int h) {
    w=b.Width; h=b.Height;
    BitmapData d=b.LockBits(new Rectangle(0,0,w,h),ImageLockMode.ReadOnly,PixelFormat.Format32bppArgb);
    byte[] s=new byte[w*h*4];
    System.Runtime.InteropServices.Marshal.Copy(d.Scan0,s,0,s.Length); b.UnlockBits(d); return s;
  }
  public static Bitmap Baue(byte[] s, int w, int h) {
    Bitmap dst=new Bitmap(w,h,PixelFormat.Format32bppArgb);
    BitmapData dd=dst.LockBits(new Rectangle(0,0,w,h),ImageLockMode.WriteOnly,PixelFormat.Format32bppArgb);
    System.Runtime.InteropServices.Marshal.Copy(s,0,dd.Scan0,s.Length); dst.UnlockBits(dd); return dst;
  }
  public static Bitmap Skaliere(Bitmap src, int hoehe) {
    int nh=hoehe, nw=(int)Math.Round(src.Width*(double)hoehe/src.Height);
    Bitmap fin=new Bitmap(nw,nh,PixelFormat.Format32bppArgb);
    using (Graphics g=Graphics.FromImage(fin)) {
      g.InterpolationMode=System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
      g.DrawImage(src,0,0,nw,nh);
    }
    return fin;
  }

  // Eine Einzelfigur oder ein Requisit. hoehe<=0 laesst die Groesse wie sie ist.
  public static string Einzeln(string ein, string aus, int hoehe, int tol, int voll, int dicke) {
    Bitmap src = new Bitmap(ein);
    int w,h; byte[] s = Lies(src, out w, out h);
    int loecher; int[] bg;
    byte[] al = Maske(s, w, h, tol, voll, dicke, out loecher, out bg);
    for (int p=0; p<w*h; p++) s[p*4+3] = al[p];
    Bitmap dst = Baue(s, w, h);
    int minX=w, minY=h, maxX=-1, maxY=-1;
    for (int p=0; p<w*h; p++) { if (al[p] < 8) continue; int x=p%w, y=p/w;
      if (x<minX) minX=x; if (x>maxX) maxX=x; if (y<minY) minY=y; if (y>maxY) maxY=y; }
    Bitmap kl = dst.Clone(new Rectangle(minX,minY,maxX-minX+1,maxY-minY+1), PixelFormat.Format32bppArgb);
    Bitmap fin = hoehe > 0 ? Skaliere(kl, hoehe) : kl;
    fin.Save(aus, ImageFormat.Png);
    return string.Format("{0,-28} grund=({1},{2},{3}) -> {4}x{5}, Flaechen entfernt: {6}",
      System.IO.Path.GetFileName(aus), bg[0], bg[1], bg[2], fin.Width, fin.Height, loecher);
  }
}
