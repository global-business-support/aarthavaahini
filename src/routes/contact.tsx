import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Card } from "@/components/ui/card";
import { LeadForm } from "@/components/site/LeadForm";
import { Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact Us — Aarthvaahini" },
    { name: "description", content: "Get in touch with Aarthvaahini for loans, insurance and investment queries." },
  ]}),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">Contact <span className="text-gradient">Us</span></h1>
          <p className="mt-4 text-muted-foreground">Koi bhi sawaal? Hum 24 ghante me reply karte hain.</p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            {[
              { icon: Phone, t: "Call Us", v: "+91 90000 00000" },
              { icon: Mail, t: "Email", v: "support@aarthvaahini.com" },
              { icon: MapPin, t: "Address", v: "Aarthvaahini Financial Services Pvt. Ltd., Mumbai, Maharashtra, India" },
            ].map(({ icon: Icon, t, v }) => (
              <Card key={t} className="flex items-start gap-4 p-5 shadow-soft">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10"><Icon className="h-5 w-5 text-primary" /></div>
                <div><p className="font-semibold">{t}</p><p className="text-sm text-muted-foreground">{v}</p></div>
              </Card>
            ))}
          </div>
          <Card className="p-7 shadow-elegant">
            <h2 className="font-display text-2xl font-bold">Send a message</h2>
            <p className="mt-1 text-sm text-muted-foreground">Hum 24 ghante me sampark karenge.</p>
            <div className="mt-6"><LeadForm productType="contact" showMessage buttonLabel="Send Message" /></div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
