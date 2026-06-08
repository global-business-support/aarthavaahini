import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const items = [
  {
    name: "Rahul Sharma",
    role: "Business Owner, Mumbai",
    text: "Aarthvaahini ne mera business loan sirf 3 din me approve karwa diya. Process bahut smooth tha aur team ne har step pe guide kiya.",
    rating: 5,
    initials: "RS",
    color: "from-blue-500 to-blue-700",
  },
  {
    name: "Priya Verma",
    role: "Software Engineer, Pune",
    text: "SIP planning aur mutual fund advice excellent thi. Mere portfolio me ek saal me 18% return mila. Highly recommended!",
    rating: 5,
    initials: "PV",
    color: "from-pink-500 to-rose-600",
  },
  {
    name: "Amit Patel",
    role: "Doctor, Ahmedabad",
    text: "Health insurance lene me bahut confusion thi, lekin team ne best plan suggest kiya. Claim bhi cashless ho gaya.",
    rating: 5,
    initials: "AP",
    color: "from-emerald-500 to-teal-600",
  },
  {
    name: "Neha Singh",
    role: "Teacher, Lucknow",
    text: "Home loan ke liye sabse low interest rate yahi mila. Documentation se lekar disbursal tak sab fast tha.",
    rating: 5,
    initials: "NS",
    color: "from-orange-500 to-amber-600",
  },
  {
    name: "Vikram Joshi",
    role: "Entrepreneur, Bengaluru",
    text: "CIBIL score improve karne ke tips bahut helpful the. 4 mahine me score 680 se 770 ho gaya.",
    rating: 5,
    initials: "VJ",
    color: "from-indigo-500 to-purple-600",
  },
  {
    name: "Sneha Kapoor",
    role: "HR Manager, Delhi",
    text: "Personal loan apply karte hi 24 ghante me amount account me aa gaya. Transparent charges aur no hidden fees.",
    rating: 5,
    initials: "SK",
    color: "from-cyan-500 to-blue-600",
  },
];

export function Testimonials() {
  return (
    <section className="container mx-auto px-6 py-24">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          ★ Trusted by 50,000+ customers
        </span>
        <h2 className="mt-4 font-display text-4xl font-bold text-foreground sm:text-5xl">
          What our <span className="text-gradient">customers say</span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Real stories from real people who achieved their financial goals with Aarthvaahini.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((t) => (
          <Card
            key={t.name}
            className="group relative overflow-hidden border-border/60 bg-gradient-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant"
          >
            <Quote className="absolute -right-2 -top-2 h-20 w-20 text-primary/5" />
            <div className="relative">
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-foreground/80">
                "{t.text}"
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-border/60 pt-4">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${t.color} text-sm font-bold text-white shadow-md`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
