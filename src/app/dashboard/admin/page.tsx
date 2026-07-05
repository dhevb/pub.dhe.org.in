import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { JournalShell } from "@/components/journal/JournalShell";
import { getJournal } from "@/lib/journals/config";
import { buildMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Admin Dashboard",
  path: "/dashboard/admin",
  noIndex: true,
});

const journal = getJournal("vbe");

export default function AdminDashboard() {
  return (
    <JournalShell journal={journal}>
      <h1 className="heading-section mb-8">Admin Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Analytics", desc: "Downloads, views, countries, institutions" },
          { title: "Users", desc: "Authors, reviewers, and editors" },
          { title: "Special Issues", desc: "Manage conference and special publications" },
          { title: "Platform Settings", desc: "DOI, indexing, and email notifications" },
        ].map((item) => (
          <Card key={item.title}>
            <CardHeader><CardTitle>{item.title}</CardTitle></CardHeader>
            <CardContent>{item.desc}</CardContent>
          </Card>
        ))}
      </div>
    </JournalShell>
  );
}
