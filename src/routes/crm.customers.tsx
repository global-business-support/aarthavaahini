import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/crm/customers")({ component: CustomersPage });

type Row = { id: string; customer_name: string; mobile: string | null; email: string | null; pan: string | null; occupation: string | null; income: number | null; created_at: string };

function CustomersPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("customers").select("*").order("created_at", { ascending: false }).limit(500);
      setRows((data ?? []) as Row[]);
      setLoading(false);
    })();
  }, []);
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Customers</h1>
        <p className="text-sm text-slate-500">{rows.length} customers · convert qualified leads into customers to build 360° view.</p>
      </div>
      <Card className="overflow-hidden">
        {loading ? (
          <div className="flex h-40 items-center justify-center"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
        ) : rows.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-500">No customers yet.</div>
        ) : (
          <Table>
            <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Mobile</TableHead><TableHead>Email</TableHead><TableHead>PAN</TableHead><TableHead>Occupation</TableHead><TableHead>Income</TableHead></TableRow></TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.customer_name}</TableCell>
                  <TableCell>{r.mobile ?? "—"}</TableCell>
                  <TableCell>{r.email ?? "—"}</TableCell>
                  <TableCell>{r.pan ?? "—"}</TableCell>
                  <TableCell>{r.occupation ?? "—"}</TableCell>
                  <TableCell>{r.income ? `₹${Number(r.income).toLocaleString("en-IN")}` : "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
