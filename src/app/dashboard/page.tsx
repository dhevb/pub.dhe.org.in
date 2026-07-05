import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { JournalShell } from "@/components/journal/JournalShell";
import { getJournal } from "@/lib/journals/config";
import { buildMetadata } from "@/lib/seo/metadata";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Dashboard",
  path: "/dashboard",
  noIndex: true,
});

const journal = getJournal("vbe");

const DASHBOARDS = [
  {
    title: "Author Dashboard",
    href: "/dashboard/author",
    desc: "Track submissions, revisions, and certificates",
  },
  {
    title: "Reviewer Dashboard",
    href: "/dashboard/reviewer",
    desc: "Review assignments and manuscript evaluations",
  },
  {
    title: "Editor Dashboard",
    href: "/dashboard/editor",
    desc: "Manage editorial workflow and decisions",
  },
  {
    title: "Admin Dashboard",
    href: "/dashboard/admin",
    desc: "Platform analytics, users, and settings",
  },
];

export default function DashboardHubPage() {
  return (
    <JournalShell journal={journal}>
      <h1 className="heading-section mb-8">Research Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {DASHBOARDS.map((d) => (
          <Link key={d.href} href={d.href}>
            <Card className="h-full hover:shadow-lg">
              <CardHeader>
                <CardTitle>{d.title}</CardTitle>
              </CardHeader>
              <CardContent>{d.desc}</CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </JournalShell>
  );
}
