import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductPage } from "@/components/site/ProductPage";
import { insurance } from "@/data/products";

export const Route = createFileRoute("/insurance")({
  head: () => ({ meta: [
    { title: "Insurance — Term, Health, Motor, Travel | Aarthvaahini" },
    { name: "description", content: "Protect your family with term life, health, motor, travel, home and child insurance from top insurers." },
  ]}),
  component: () => (
    <div className="min-h-screen bg-background">
      <Header />
      <main><ProductPage title="Insurance" subtitle="Pariwar ki suraksha sabse pehle — top insurers ke best plans."
        items={insurance} productType="insurance" accentClass="text-[#AD1457]" /></main>
      <Footer />
    </div>
  ),
});
