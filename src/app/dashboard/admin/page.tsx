import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { AdminDashboardView } from "@/components/dashboard/AdminDashboard";
import { buildMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Admin Dashboard",
  path: "/dashboard/admin",
  noIndex: true,
});

export default function AdminDashboardPage() {
  return (
    <DashboardShell
      title="Admin Dashboard"
      description="File-based CMS overview, site settings, and platform content."
    >
      <AdminDashboardView />
    </DashboardShell>
  );
}
