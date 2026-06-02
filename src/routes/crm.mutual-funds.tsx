import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/crm/mutual-funds")({ component: MFPage });

const STAGES = ["Lead", "Risk Profiling", "KYC", "SIP Proposal", "SIP Active", "Portfolio Review"];

type Row = { id: string; fund_name: string; sip_amount: number | null; investment_type: string | null; status: string };

function MFPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("mutual_funds").select("*").order("created_at", { ascending: false });
      setRows((data ?? []) as Row[]);
      setLoading(false);
    })();
  }, []);
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Mutual Funds</h1>
        <p className="text-sm text-slate-500">Workflow: {STAGES.join(" → ")}</p>
      </div>
      <Card className="overflow-hidden">
        {loading ? (
          <div className="flex h-40 items-center justify-center"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
        ) : rows.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-500">No mutual fund cases yet.</div>
        ) : (
          <Table>
            <TableHeader><TableRow><TableHead>Fund</TableHead><TableHead>SIP Amount</TableHead><TableHead>Type</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.fund_name}</TableCell>
                  <TableCell>{r.sip_amount ? `₹${Number(r.sip_amount).toLocaleString("en-IN")}` : "—"}</TableCell>
                  <TableCell>{r.investment_type ?? "—"}</TableCell>
                  <TableCell><Badge variant="secondary">{r.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
