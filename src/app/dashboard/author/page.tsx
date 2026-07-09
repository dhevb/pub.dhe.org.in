import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { AuthorDashboardView } from "@/components/dashboard/AuthorDashboard";
import { buildMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Author Dashboard",
  path: "/dashboard/author",
  noIndex: true,
});

export default function AuthorDashboardPage() {
  return (
    <DashboardShell
      title="Author Dashboard"
      description="Track manuscript submissions and start new papers across all journals."
    >
      <AuthorDashboardView />
    </DashboardShell>
  );
}
