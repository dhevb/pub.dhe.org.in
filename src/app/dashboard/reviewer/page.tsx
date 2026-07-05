import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { JournalShell } from "@/components/journal/JournalShell";
import { getJournal } from "@/lib/journals/config";
import { buildMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Reviewer Dashboard",
  path: "/dashboard/reviewer",
  noIndex: true,
});

const journal = getJournal("vbe");

export default function ReviewerDashboard() {
  return (
    <JournalShell journal={journal}>
      <h1 className="heading-section mb-8">Reviewer Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Pending Reviews</CardTitle></CardHeader>
          <CardContent>Manuscripts awaiting your peer review.</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Completed Reviews</CardTitle></CardHeader>
          <CardContent>Your submitted review history.</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Review Guidelines</CardTitle></CardHeader>
          <CardContent>Ethics, scoring rubric, and confidentiality policy.</CardContent>
        </Card>
      </div>
    </JournalShell>
  );
}
