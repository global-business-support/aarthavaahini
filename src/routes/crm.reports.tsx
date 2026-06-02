import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, Clock, Package } from "lucide-react";

export const Route = createFileRoute("/crm/reports")({ component: ReportsPage });

const REPORTS = [
  { name: "Lead Conversion", desc: "Funnel from New → Disbursed across stages", icon: TrendingUp },
  { name: "Revenue", desc: "Disbursement, premium and SIP totals over time", icon: BarChart3 },
  { name: "Employee Performance", desc: "Per-executive leads handled, conversion %, revenue", icon: Users },
  { name: "TAT Report", desc: "Turn-around time between lead stages", icon: Clock },
  { name: "Product Wise Report", desc: "Loan / Insurance / MF wise breakdown", icon: Package },
];

function ReportsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
        <p className="text-sm text-slate-500">
          Generated from live data once leads and cases flow through the pipeline.
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {REPORTS.map((r) => {
          const Icon = r.icon;
          return (
            <Card key={r.name} className="p-5">
              <div className="flex items-start gap-3">
                <div className="rounded-md bg-blue-50 p-2 text-blue-600">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{r.name}</div>
                  <div className="mt-1 text-xs text-slate-500">{r.desc}</div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
