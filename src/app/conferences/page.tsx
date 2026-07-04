import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { JournalShell } from "@/components/journal/JournalShell";
import { CONFERENCE_TRACKS, PAST_CONFERENCES } from "@/lib/content/homepage";
import { getJournal } from "@/lib/journals/config";
import { buildMetadata } from "@/lib/seo/metadata";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Multi-Track Conferences",
  description:
    "15 multi-track education conferences under Shiksha Mahakumbh — covering every discipline in Bharat's education ecosystem.",
  path: "/conferences",
});

const journal = getJournal("vbe");

export default function ConferencesPage() {
  return (
    <JournalShell journal={journal}>
      <section className="mb-12 text-center">
        <Badge variant="secondary" className="mb-4">Academic Council</Badge>
        <h1 className="heading-display mb-4">Multi-Track Conferences</h1>
        <p className="mx-auto max-w-2xl text-lg text-text-muted">
          Representing every education discipline through 15 multi-track conferences
          under the Shiksha Mahakumbh academic council — from school education to
          Indian Knowledge Systems.
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CONFERENCE_TRACKS.map((track) => (
          <Card key={track.id}>
            <CardHeader>
              <CardTitle>{track.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-devanagari text-accent">{track.nameHi}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="mt-16">
        <h2 className="heading-section mb-8 text-center">Recent Conferences</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {PAST_CONFERENCES.slice(0, 2).map((conf) => (
            <Card key={conf.name}>
              <CardTitle>{conf.name}</CardTitle>
              <CardContent className="mt-2">
                <p>{conf.theme}</p>
                <Badge className="mt-2">{conf.year}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mt-8 text-center">
          <Link href="/conferences/past" className="text-primary hover:underline">
            View complete conference archive →
          </Link>
        </p>
      </section>
    </JournalShell>
  );
}
