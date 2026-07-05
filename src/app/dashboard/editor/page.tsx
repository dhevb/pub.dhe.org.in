import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { JournalShell } from "@/components/journal/JournalShell";
import { getJournal } from "@/lib/journals/config";
import { buildMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Editor Dashboard",
  path: "/dashboard/editor",
  noIndex: true,
});

const journal = getJournal("vbe");

export default function EditorDashboard() {
  return (
    <JournalShell journal={journal}>
      <h1 className="heading-section mb-8">Editor Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Submission Queue</CardTitle></CardHeader>
          <CardContent>New manuscripts for initial screening.</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Reviewer Assignment</CardTitle></CardHeader>
          <CardContent>Assign and track peer reviewers.</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Editorial Decisions</CardTitle></CardHeader>
          <CardContent>Accept, revise, or reject manuscripts.</CardContent>
        </Card>
      </div>
    </JournalShell>
  );
}
