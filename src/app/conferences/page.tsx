import Link from "next/link";
import { HindiText } from "@/components/ui/HindiText";
import { PortalShell } from "@/components/layout/PortalShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { conferenceEventsSchema } from "@/lib/seo/schemas";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { CONFERENCE_TRACKS, PAST_CONFERENCES } from "@/lib/content/homepage";
import { buildMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Multi-Track Conferences",
  description:
    "15 multi-track education conferences under Shiksha Mahakumbh — covering every discipline in Bharat's education ecosystem.",
  path: "/conferences",
});

export default function ConferencesPage() {
  return (
    <PortalShell>
      <JsonLd data={conferenceEventsSchema()} />
      <div className="container-wide section-padding">
        <section className="mb-16 text-center">
          <Badge variant="secondary" className="mb-4">
            Academic Council
          </Badge>
          <h1 className="heading-display mb-4">Multi-Track Conferences</h1>
          <p className="mx-auto max-w-2xl text-lg text-text-muted">
            Representing every education discipline through 15 multi-track
            conferences under the Shiksha Mahakumbh academic council — from
            school education to Indian Knowledge Systems.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="heading-section mb-8 text-center">Research Tracks</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CONFERENCE_TRACKS.map((track) => (
              <Card key={track.id}>
                <CardHeader>
                  <CardTitle className="text-base">{track.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <HindiText className="text-accent">{track.nameHi}</HindiText>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="heading-section mb-8 text-center">Recent Conferences</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {PAST_CONFERENCES.slice(0, 2).map((conf) => (
              <Card key={conf.name}>
                <CardTitle>{conf.name}</CardTitle>
                <CardContent className="mt-2">
                  <p>{conf.theme}</p>
                  <Badge className="mt-2">{conf.year}</Badge>
                  <p className="mt-2 text-sm text-text-muted">
                    {conf.papers} papers published
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-8 text-center">
            <Link href="/conferences/past" className="font-medium text-primary hover:underline">
              View complete conference archive →
            </Link>
          </p>
        </section>

        <section className="rounded-xl bg-navy p-8 text-center text-white">
          <h2 className="font-display text-2xl font-bold mb-4">
            Conference Proceedings
          </h2>
          <p className="mb-6 text-white/70">
            All accepted conference papers are published in the Viksit Bharat
            Journal proceedings archive with permanent open access.
          </p>
          <Link
            href="/search"
            className="inline-block rounded-lg bg-saffron px-6 py-3 text-sm font-semibold text-white hover:brightness-110"
          >
            Search Proceedings
          </Link>
        </section>
      </div>
    </PortalShell>
  );
}
