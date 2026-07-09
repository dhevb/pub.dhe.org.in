import Link from "next/link";
import { PortalShell } from "@/components/layout/PortalShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardTitle } from "@/components/ui/Card";
import { PAST_CONFERENCES } from "@/lib/content/homepage";
import { buildMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Past Conferences Archive",
  description:
    "Archive of Shiksha Mahakumbh and RASE conferences — preserving Bharat's education research heritage.",
  path: "/conferences/past",
});

export default function PastConferencesPage() {
  return (
    <PortalShell>
      <div className="container-wide section-padding">
        <header className="mb-12 text-center">
          <h1 className="heading-display mb-4">Past Conferences Archive</h1>
          <p className="mx-auto max-w-2xl text-text-muted">
            Preserving the research output from Bharat&apos;s largest education
            conferences. All papers remain accessible in our permanent archive.
          </p>
        </header>

        <div className="space-y-6">
          {PAST_CONFERENCES.map((conf) => (
            <Card key={conf.name}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <CardTitle>{conf.name}</CardTitle>
                  <CardContent className="mt-2">
                    <p className="font-medium text-primary">{conf.theme}</p>
                    <p className="mt-2 text-text-muted">
                      {conf.papers} research papers published
                    </p>
                  </CardContent>
                </div>
                <Badge variant="secondary">{conf.year}</Badge>
              </div>
            </Card>
          ))}
        </div>

        <p className="mt-12 text-center">
          <Link href="/conferences" className="text-primary hover:underline">
            ← Back to conferences
          </Link>
        </p>
      </div>
    </PortalShell>
  );
}
