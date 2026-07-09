import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ReviewerDashboardView } from "@/components/dashboard/ReviewerDashboard";
import { buildMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Reviewer Dashboard",
  path: "/dashboard/reviewer",
  noIndex: true,
});

export default function ReviewerDashboardPage() {
  return (
    <DashboardShell
      title="Reviewer Dashboard"
      description="Peer review assignments, guidelines, and editorial notices."
    >
      <ReviewerDashboardView />
    </DashboardShell>
  );
}
