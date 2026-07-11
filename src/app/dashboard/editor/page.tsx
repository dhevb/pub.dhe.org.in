import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { EditorDashboardView } from "@/components/dashboard/EditorDashboard";
import { buildMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Editor Dashboard",
  path: "/dashboard/editor",
  noIndex: true,
});

export default function EditorDashboardPage() {
  return (
    <DashboardShell
      title="Editor Dashboard"
      description="Editorial workflow, journal tools, and decision management."
      allowedRoles={["editor"]}
    >
      <EditorDashboardView />
    </DashboardShell>
  );
}
