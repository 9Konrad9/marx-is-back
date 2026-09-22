using System; using System.Drawing; using System.Drawing.Imaging; using System.Collections.Generic;
// Prueft fertige PNGs: sucht eingeschlossene, farblose, flaue Gebiete
// beliebiger Helligkeit -
// also stehengebliebenen grauen Blatthintergrund zwischen Arm und Koerper.
public class Pruefung {
  public static string Suche(string datei, string name) {
    Bitmap b=new Bitmap(datei); int w=b.Width,h=b.Height,n=w*h;
    BitmapData d=b.LockBits(new Rectangle(0,0,w,h),ImageLockMode.ReadOnly,PixelFormat.Format32bppArgb);
    byte[] s=new byte[n*4]; System.Runtime.InteropServices.Marshal.Copy(d.Scan0,s,0,s.Length); b.UnlockBits(d);
    bool[] ges=new bool[n]; List<string> treffer=new List<string>(); int summe=0;
    for(int p0=0;p0<n;p0++){
      if(ges[p0]||s[p0*4+3]<250) continue; int i0=p0*4;
      int mn0=Math.Min(s[i0+2],Math.Min(s[i0+1],s[i0])), mx0=Math.Max(s[i0+2],Math.Max(s[i0+1],s[i0]));
      if(mn0<110||mx0-mn0>=10) continue;
      List<int> grp=new List<int>(); Queue<int> q=new Queue<int>(); q.Enqueue(p0); ges[p0]=true; bool offen=false;
      while(q.Count>0){ int p=q.Dequeue(); grp.Add(p); int x=p%w,y=p/w;
        if(x==0||y==0||x==w-1||y==h-1) offen=true;
        int[] nb={x>0?p-1:-1,x<w-1?p+1:-1,y>0?p-w:-1,y<h-1?p+w:-1};
        foreach(int c in nb){ if(c<0) continue; if(s[c*4+3]<250){offen=true;continue;}
          if(ges[c]) continue; int i=c*4;
          int mn=Math.Min(s[i+2],Math.Min(s[i+1],s[i])),mx=Math.Max(s[i+2],Math.Max(s[i+1],s[i]));
          if(mn>=110&&mx-mn<10){ges[c]=true;q.Enqueue(c);} } }
      if(offen||grp.Count<30) continue;
      double sum=0; foreach(int p in grp){int i=p*4; sum+=(s[i]+s[i+1]+s[i+2])/3.0;}
      double mit=sum/grp.Count, va=0;
      foreach(int p in grp){int i=p*4; double dd=(s[i]+s[i+1]+s[i+2])/3.0-mit; va+=dd*dd;}
      double sd=Math.Sqrt(va/grp.Count);
      if(sd>10) continue;
      int mnX=w,mxX=0,mnY=h,mxY=0;
      foreach(int p in grp){int x=p%w,y=p/w; if(x<mnX)mnX=x; if(x>mxX)mxX=x; if(y<mnY)mnY=y; if(y>mxY)mxY=y;}
      summe+=grp.Count;
      treffer.Add(grp.Count+"px L="+mit.ToString("0")+" sd="+sd.ToString("0.0")+" "+mnX+".."+mxX+"/"+mnY+".."+mxY); }
    if(treffer.Count==0) return null;
    treffer.Sort((a,c)=>int.Parse(c.Split('p')[0])-int.Parse(a.Split('p')[0]));
    string top=""; for(int i=0;i<Math.Min(3,treffer.Count);i++) top+=" ["+treffer[i]+"]";
    return string.Format("{0,-46} gebiete={1,-3} pixel={2,-6}{3}", name, treffer.Count, summe, top);
  }
}
