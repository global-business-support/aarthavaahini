import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductPage } from "@/components/site/ProductPage";
import { loans } from "@/data/products";

export const Route = createFileRoute("/loans")({
  head: () => ({ meta: [
    { title: "Loans — Home, Personal, Business, LAP | Aarthvaahini" },
    { name: "description", content: "Apply for home, personal, business, car, education and gold loans from 40+ banks at lowest rates." },
  ]}),
  component: () => (
    <div className="min-h-screen bg-background">
      <Header />
      <main><ProductPage title="Loans" subtitle="40+ banks ke saath best deals — sirf 24 ghante me approval."
        items={loans} productType="loan" accentClass="text-[#E65100]" /></main>
      <Footer />
    </div>
  ),
});
