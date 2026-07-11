import Link from "next/link";
import { HindiText } from "@/components/ui/HindiText";
import { CONFERENCE_TRACKS, PAST_CONFERENCES } from "@/lib/content/homepage";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardTitle } from "@/components/ui/Card";

export function ConferencePreviewSection() {
  return (
    <section className="section-padding bg-surface" aria-labelledby="conferences-heading">
      <div className="container-wide">
        <div className="mb-10 text-center">
          <Badge variant="secondary" className="mb-4">
            Shiksha Mahakumbh Academic Council
          </Badge>
          <h2 id="conferences-heading" className="heading-section mb-4">
            Multi-Track Conferences
          </h2>
          <p className="mx-auto max-w-2xl text-text-muted">
            15 research tracks covering every discipline in Bharat&apos;s education
            ecosystem — from school education to Indian Knowledge Systems.
          </p>
        </div>
        <div className="mb-10 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {CONFERENCE_TRACKS.slice(0, 10).map((track) => (
            <Card key={track.id} className="p-4 text-center">
              <p className="text-sm font-semibold text-text">{track.name}</p>
              <HindiText className="mt-1 text-xs text-text-muted">
                {track.nameHi}
              </HindiText>
            </Card>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {PAST_CONFERENCES.slice(0, 2).map((conf) => (
            <Card key={conf.name}>
              <CardTitle className="text-base">{conf.name}</CardTitle>
              <CardContent className="mt-2">
                <p className="text-sm text-primary">{conf.theme}</p>
                <Badge className="mt-2">{conf.year}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/conferences">
            <Button variant="secondary">Explore Conferences</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
