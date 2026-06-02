import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/crm/tasks")({ component: TasksPage });

type Row = { id: string; title: string; description: string | null; task_type: string | null; status: string; priority: string; due_date: string | null };

function TasksPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("tasks").select("*").order("due_date", { ascending: true });
      setRows((data ?? []) as Row[]);
      setLoading(false);
    })();
  }, []);
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Tasks</h1>
        <p className="text-sm text-slate-500">Followups, calls, meetings, document collection, renewals.</p>
      </div>
      <Card className="overflow-hidden">
        {loading ? (
          <div className="flex h-40 items-center justify-center"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
        ) : rows.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-500">No tasks yet.</div>
        ) : (
          <Table>
            <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Type</TableHead><TableHead>Priority</TableHead><TableHead>Status</TableHead><TableHead>Due</TableHead></TableRow></TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.title}</TableCell>
                  <TableCell>{r.task_type ?? "—"}</TableCell>
                  <TableCell>
                    <Badge className={cn(
                      r.priority === "high" && "bg-rose-100 text-rose-700 hover:bg-rose-100",
                      r.priority === "medium" && "bg-amber-100 text-amber-700 hover:bg-amber-100",
                      r.priority === "low" && "bg-slate-100 text-slate-700 hover:bg-slate-100",
                    )}>{r.priority}</Badge>
                  </TableCell>
                  <TableCell><Badge variant="secondary">{r.status}</Badge></TableCell>
                  <TableCell className="text-sm">{r.due_date ? new Date(r.due_date).toLocaleString() : "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
