import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

type Props = {
  productType: "loan" | "insurance" | "mutual_fund" | "banking" | "contact" | "cibil";
  productName?: string;
  showAmount?: boolean;
  showMessage?: boolean;
  buttonLabel?: string;
  amountLabel?: string;
};

export function LeadForm({
  productType, productName, showAmount, showMessage,
  buttonLabel = "Submit Enquiry", amountLabel = "Amount Required (₹)",
}: Props) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", amount: "", message: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.full_name.trim().length < 2) return toast.error("Apna naam likhe");
    if (form.phone.trim().length < 7) return toast.error("Sahi mobile number daale");
    setLoading(true);
    const { error } = await supabase.from("leads").insert({
      full_name: form.full_name.trim(),
      email: form.email.trim() || null,
      phone: form.phone.trim(),
      product_type: productType,
      product_name: productName ?? null,
      amount: form.amount ? Number(form.amount) : null,
      message: form.message.trim() || null,
    });
    setLoading(false);
    if (error) return toast.error("Submit nahi hua: " + error.message);
    toast.success("Dhanyavaad! Hum jald aapse sampark karenge.");
    setForm({ full_name: "", email: "", phone: "", amount: "", message: "" });
  };

  return (
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <Label htmlFor="ln">Full Name *</Label>
        <Input id="ln" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} className="mt-1.5 h-11" required />
      </div>
      <div>
        <Label htmlFor="le">Email</Label>
        <Input id="le" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1.5 h-11" />
      </div>
      <div>
        <Label htmlFor="lp">Mobile *</Label>
        <Input id="lp" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1.5 h-11" required />
      </div>
      {showAmount && (
        <div className="sm:col-span-2">
          <Label htmlFor="la">{amountLabel}</Label>
          <Input id="la" type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="mt-1.5 h-11" />
        </div>
      )}
      {showMessage && (
        <div className="sm:col-span-2">
          <Label htmlFor="lm">Message</Label>
          <Textarea id="lm" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-1.5" rows={4} />
        </div>
      )}
      <Button type="submit" disabled={loading} size="lg" className="sm:col-span-2 bg-gradient-primary text-primary-foreground shadow-glow">
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{buttonLabel}
      </Button>
    </form>
  );
}
