import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Banknote, Landmark, ShieldCheck, Sparkles, TrendingUp, Umbrella } from "lucide-react";

export function Hero() {
  const cats = [
    { to: "/banking", icon: Landmark, label: "Banking", bg: "bg-[#E3F2FD]", border: "border-[#90CAF9]/60", color: "text-[#1565C0]" },
    { to: "/loans", icon: Banknote, label: "Loans", bg: "bg-[#FFF4E5]", border: "border-[#FFCC80]/60", color: "text-[#E65100]" },
    { to: "/insurance", icon: Umbrella, label: "Insurance", bg: "bg-[#FCE4EC]", border: "border-[#F48FB1]/60", color: "text-[#AD1457]" },
    { to: "/mutual-funds", icon: TrendingUp, label: "Mutual Funds", bg: "bg-[#E8F5E9]", border: "border-[#A5D6A7]/60", color: "text-[#2E7D32]" },
  ] as const;

  return (
    <section className="relative overflow-hidden bg-gradient-hero text-foreground">
      <div className="absolute inset-0 bg-gradient-glow" />
      <div className="container relative mx-auto grid items-center gap-8 px-6 py-14 lg:py-20">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 py-1.5 text-xs font-semibold text-primary shadow-soft backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> India's Trusted Financial Partner
          </span>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
            Banking, Loans, Insurance & Investments — ek hi jagah
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
            40+ banks, top insurers aur SEBI-registered mutual funds — Aarthvaahini ke saath compare, apply aur grow karein.
          </p>
          <div className="mt-7 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            {cats.map(({ to, icon: Icon, label, bg, border, color }) => (
              <Link key={to} to={to}
                className={`group rounded-2xl border ${border} ${bg} p-4 text-center shadow-soft backdrop-blur transition-smooth hover:-translate-y-1 hover:shadow-elegant`}>
                <Icon className={`mx-auto h-6 w-6 ${color}`} />
                <p className={`mt-2 text-sm font-semibold ${color}`}>{label}</p>
              </Link>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground shadow-glow">
              <Link to="/cibil">Check My CIBIL — Free</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary/25 bg-card/60 text-primary">
              <Link to="/loans">Explore Products</Link>
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary-glow" /> RBI compliant partners</div>
            <div className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary-glow" /> 50,000+ happy customers</div>
          </div>
        </div>
      </div>
    </section>
  );
}
