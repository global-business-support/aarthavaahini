import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import {
  Users,
  Clock,
  Banknote,
  ShieldCheck,
  TrendingUp,
  IndianRupee,
  CheckSquare,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/crm/")({
  component: DashboardPage,
});

type Stats = {
  totalLeads: number;
  followupsDue: number;
  loanPipeline: number;
  insurancePipeline: number;
  mfPipeline: number;
  revenue: number;
  pendingTasks: number;
  slaAlerts: number;
};

function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    (async () => {
      const now = new Date().toISOString();
      const [
        leads,
        followups,
        loans,
        insurance,
        funds,
        tasks,
        sla,
      ] = await Promise.all([
        supabase.from("leads").select("id", { count: "exact", head: true }),
        supabase
          .from("tasks")
          .select("id", { count: "exact", head: true })
          .lte("due_date", now)
          .neq("status", "done"),
        supabase
          .from("loan_cases")
          .select("loan_amount, stage")
          .not("stage", "in", '("Completed","Closed")'),
        supabase
          .from("insurance_cases")
          .select("premium, policy_status")
          .not("policy_status", "in", '("Issued","Closed")'),
        supabase
          .from("mutual_funds")
          .select("sip_amount, status")
          .not("status", "in", '("Portfolio Review","Closed")'),
        supabase.from("tasks").select("id", { count: "exact", head: true }).neq("status", "done"),
        supabase
          .from("tasks")
          .select("id", { count: "exact", head: true })
          .lt("due_date", now)
          .neq("status", "done"),
      ]);

      const sum = <T extends Record<string, unknown>>(rows: T[] | null, key: string) =>
        (rows ?? []).reduce((acc, r) => acc + (Number(r[key]) || 0), 0);

      const disb = await supabase.from("loan_cases").select("disbursement_amount");

      setStats({
        totalLeads: leads.count ?? 0,
        followupsDue: followups.count ?? 0,
        loanPipeline: sum(loans.data, "loan_amount"),
        insurancePipeline: sum(insurance.data, "premium"),
        mfPipeline: sum(funds.data, "sip_amount") * 12,
        revenue: sum(disb.data, "disbursement_amount"),
        pendingTasks: tasks.count ?? 0,
        slaAlerts: sla.count ?? 0,
      });
    })();
  }, []);

  const cards = [
    { label: "Total Leads", value: stats?.totalLeads, icon: Users, tone: "blue" },
    { label: "Followups Due", value: stats?.followupsDue, icon: Clock, tone: "amber" },
    { label: "Loan Pipeline", value: stats && formatINR(stats.loanPipeline), icon: Banknote, tone: "emerald" },
    { label: "Insurance Pipeline", value: stats && formatINR(stats.insurancePipeline), icon: ShieldCheck, tone: "violet" },
    { label: "MF Annual SIP", value: stats && formatINR(stats.mfPipeline), icon: TrendingUp, tone: "cyan" },
    { label: "Revenue (Disbursed)", value: stats && formatINR(stats.revenue), icon: IndianRupee, tone: "emerald" },
    { label: "Pending Tasks", value: stats?.pendingTasks, icon: CheckSquare, tone: "slate" },
    { label: "SLA Alerts", value: stats?.slaAlerts, icon: AlertTriangle, tone: "rose" },
  ] as const;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500">Overview of leads, pipeline and tasks across the team.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Card key={c.label} className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    {c.label}
                  </div>
                  <div className="mt-2 text-2xl font-bold text-slate-900">
                    {c.value ?? "—"}
                  </div>
                </div>
                <div className={cn("rounded-md p-2", toneBg(c.tone))}>
                  <Icon className={cn("h-5 w-5", toneFg(c.tone))} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <h2 className="text-sm font-semibold text-slate-700">Team Performance</h2>
          <p className="mt-2 text-xs text-slate-500">
            Per-executive metrics will appear here once leads are assigned. Assign leads from the Leads module to start tracking.
          </p>
        </Card>
        <Card className="p-5">
          <h2 className="text-sm font-semibold text-slate-700">Revenue Summary</h2>
          <p className="mt-2 text-xs text-slate-500">
            Totals are derived from disbursed loan amounts. Add insurance commission and MF AUM tracking to expand this.
          </p>
        </Card>
      </div>
    </div>
  );
}

function formatINR(v: number) {
  if (v >= 1e7) return `₹${(v / 1e7).toFixed(2)} Cr`;
  if (v >= 1e5) return `₹${(v / 1e5).toFixed(2)} L`;
  return `₹${Math.round(v).toLocaleString("en-IN")}`;
}
function toneBg(t: string) {
  return ({
    blue: "bg-blue-50", amber: "bg-amber-50", emerald: "bg-emerald-50",
    violet: "bg-violet-50", cyan: "bg-cyan-50", slate: "bg-slate-100", rose: "bg-rose-50",
  } as Record<string, string>)[t];
}
function toneFg(t: string) {
  return ({
    blue: "text-blue-600", amber: "text-amber-600", emerald: "text-emerald-600",
    violet: "text-violet-600", cyan: "text-cyan-600", slate: "text-slate-600", rose: "text-rose-600",
  } as Record<string, string>)[t];
}
