import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { JournalShell } from "@/components/journal/JournalShell";
import { getJournal } from "@/lib/journals/config";
import { buildMetadata } from "@/lib/seo/metadata";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Author Dashboard",
  path: "/dashboard/author",
  noIndex: true,
});

const journal = getJournal("vbe");

export default function AuthorDashboard() {
  return (
    <JournalShell journal={journal}>
      <h1 className="heading-section mb-8">Author Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {[
          { title: "Submissions", desc: "Track your manuscript submissions", href: "/vbe.rase/ManuscriptDetails" },
          { title: "Submit New", desc: "Start a new manuscript submission", href: "/vbe.rase/SubmitManuscript" },
          { title: "Certificates", desc: "Download publication certificates", href: "#" },
        ].map((item) => (
          <Link key={item.title} href={item.href}>
            <Card className="h-full hover:shadow-lg">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>{item.desc}</CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </JournalShell>
  );
}
