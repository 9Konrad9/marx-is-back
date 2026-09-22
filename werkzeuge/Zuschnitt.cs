using System; using System.Drawing; using System.Drawing.Imaging; using System.Collections.Generic;

// Beschneidet eine Textur auf das Motiv. Fuer die 9-Slice-Texturen: dort
// darf kein Rest des Blattgrunds stehenbleiben, weil border-image genau
// die aeusserste Pixelreihe ueber die ganze Kante zieht - aus 5 px Weiss
// im Bild wird ein weisser Saum um jede Schaltflaeche.
public class Zuschnitt {

  public static string Beschneide(string ein, string aus, int tol, int rein,
                                  int zielBreite, long qualitaet) {
    Bitmap src = new Bitmap(ein);
    int w = src.Width, h = src.Height;
    BitmapData d = src.LockBits(new Rectangle(0,0,w,h), ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
    byte[] s = new byte[w*h*4];
    System.Runtime.InteropServices.Marshal.Copy(d.Scan0, s, 0, s.Length); src.UnlockBits(d);

    int[] bg = FreistellerGrau.BgFarbe(s, w, h);
    Func<int,int,bool> motiv = (x,y) => {
      int i = (y*w+x)*4;
      return Math.Max(Math.Abs(s[i+2]-bg[0]), Math.Max(Math.Abs(s[i+1]-bg[1]), Math.Abs(s[i]-bg[2]))) > tol;
    };
    // Eine Zeile/Spalte zaehlt erst als Motiv, wenn mindestens ein Viertel
    // von ihr abweicht - einzelne JPEG-Sprenkel im Rand sollen nicht zaehlen.
    int x1=0, x2=w-1, y1=0, y2=h-1;
    while (y1 < h && Anteil(motiv, w, y1, true)  < 0.25) y1++;
    while (y2 > y1 && Anteil(motiv, w, y2, true) < 0.25) y2--;
    while (x1 < w && Anteil(motiv, h, x1, false) < 0.25) x1++;
    while (x2 > x1 && Anteil(motiv, h, x2, false) < 0.25) x2--;
    x1 += rein; y1 += rein; x2 -= rein; y2 -= rein;

    Bitmap kl = src.Clone(new Rectangle(x1, y1, x2-x1+1, y2-y1+1), PixelFormat.Format24bppRgb);
    Bitmap fin = kl;
    if (zielBreite > 0 && zielBreite != kl.Width) {
      int nh = (int)Math.Round(kl.Height * (double)zielBreite / kl.Width);
      fin = new Bitmap(zielBreite, nh, PixelFormat.Format24bppRgb);
      using (Graphics g = Graphics.FromImage(fin)) {
        g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
        g.DrawImage(kl, 0, 0, zielBreite, nh);
      }
    }
    ImageCodecInfo enc = null;
    foreach (ImageCodecInfo c in ImageCodecInfo.GetImageEncoders())
      if (c.FormatID == ImageFormat.Jpeg.Guid) enc = c;
    EncoderParameters ep = new EncoderParameters(1);
    ep.Param[0] = new EncoderParameter(System.Drawing.Imaging.Encoder.Quality, qualitaet);
    fin.Save(aus, enc, ep);
    return string.Format("{0}: grund=({1},{2},{3}) Schnitt {4},{5}..{6},{7} -> {8}x{9}",
      System.IO.Path.GetFileName(aus), bg[0],bg[1],bg[2], x1,y1,x2,y2, fin.Width, fin.Height);
  }

  static double Anteil(Func<int,int,bool> motiv, int laenge, int k, bool zeile) {
    int t = 0;
    for (int i = 0; i < laenge; i++) if (zeile ? motiv(i,k) : motiv(k,i)) t++;
    return (double)t / laenge;
  }

  // PNG am Rand beschneiden, ohne zu skalieren.
  public static string Stutze(string ein, string aus, int px) {
    Bitmap src = new Bitmap(ein);
    Bitmap kl = src.Clone(new Rectangle(px, px, src.Width-2*px, src.Height-2*px),
                          PixelFormat.Format32bppArgb);
    kl.Save(aus, ImageFormat.Png);
    return System.IO.Path.GetFileName(aus) + ": " + src.Width + "x" + src.Height
         + " -> " + kl.Width + "x" + kl.Height;
  }
}
