import { createFileRoute } from "@tanstack/react-router";
import { CrmLayout } from "@/components/crm/CrmLayout";

export const Route = createFileRoute("/crm")({
  head: () => ({ meta: [{ title: "CRM — Aarthvaahini" }] }),
  component: CrmLayout,
});
