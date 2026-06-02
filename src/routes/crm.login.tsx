import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, ShieldAlert } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/crm/login")({
  validateSearch: (s: Record<string, unknown>) => ({
    unauthorized: s.unauthorized === "1" ? "1" : undefined,
  }),
  component: CrmLoginPage,
});

function CrmLoginPage() {
  const nav = useNavigate();
  const search = useSearch({ from: "/crm/login" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // If already signed in as staff, send to dashboard
  useEffect(() => {
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id);
      const staff = (roles ?? []).some((r) =>
        ["admin", "manager", "sales_executive", "operations", "insurance_executive", "mf_executive"].includes(
          r.role as string,
        ),
      );
      if (staff) nav({ to: "/crm" });
    };
    check();
  }, [nav]);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Signed in");
    nav({ to: "/crm" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <Card className="w-full max-w-md p-7 shadow-elegant">
        <h1 className="text-center text-2xl font-bold text-slate-900">
          Aarthvaahini CRM
        </h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          Sign in with your staff account.
        </p>
        {search.unauthorized && (
          <div className="mt-4 flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              Your account doesn't have CRM access. Contact your administrator to be assigned a staff role.
            </span>
          </div>
        )}
        <form onSubmit={signIn} className="mt-6 space-y-3">
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              required
              className="mt-1.5 h-11"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              required
              className="mt-1.5 h-11"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign in
          </Button>
        </form>
      </Card>
    </div>
  );
}
