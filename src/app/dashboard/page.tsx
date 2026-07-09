import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { buildMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Dashboard",
  path: "/dashboard",
  noIndex: true,
});

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
    desc: "CMS, platform settings, and content",
  },
];

export default function DashboardHubPage() {
  return (
    <DashboardShell
      title="Research Dashboard"
      description="Manage your research workflow across author, reviewer, editor, and admin roles."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {DASHBOARDS.map((d) => (
          <Link key={d.href} href={d.href}>
            <Card className="h-full transition-shadow hover:shadow-lg">
              <CardHeader>
                <CardTitle>{d.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">{d.desc}</CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </DashboardShell>
  );
}
