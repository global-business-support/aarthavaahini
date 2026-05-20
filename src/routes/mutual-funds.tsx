import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductPage } from "@/components/site/ProductPage";
import { mutualFunds } from "@/data/products";

export const Route = createFileRoute("/mutual-funds")({
  head: () => ({ meta: [
    { title: "Mutual Funds — SIP, ELSS, Debt, NPS | Aarthvaahini" },
    { name: "description", content: "Start SIP from ₹500. ELSS tax saver, debt funds, NPS, SGB and PMS — SEBI-registered advisors." },
  ]}),
  component: () => (
    <div className="min-h-screen bg-background">
      <Header />
      <main><ProductPage title="Mutual Funds" subtitle="₹500 se shuru karein — long-term wealth banane ka sabse smart tareeka."
        items={mutualFunds} productType="mutual_fund" accentClass="text-[#2E7D32]" /></main>
      <Footer />
    </div>
  ),
});
