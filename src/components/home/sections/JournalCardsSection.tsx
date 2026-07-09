import Link from "next/link";
import Image from "next/image";
import { JOURNAL_LIST } from "@/lib/journals/config";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export function JournalCardsSection() {
  return (
    <section className="section-padding bg-surface" aria-labelledby="journals-heading">
      <div className="container-wide">
        <h2 id="journals-heading" className="heading-section mb-4 text-center">
          Our Journals
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-text-muted">
          Four editions serving English and Hindi researchers — from Viksit Bharat
          Education Journal to legacy archives, all preserved and accessible.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {JOURNAL_LIST.map((journal) => (
            <Card key={journal.id} className="flex h-full flex-col">
              <CardHeader>
                <div className="mb-3 flex items-center gap-3">
                  <Image
                    src={journal.logo}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-lg object-contain"
                  />
                  <Badge variant={journal.language === "hi" ? "accent" : "primary"}>
                    {journal.language === "hi" ? "हिंदी" : "English"}
                  </Badge>
                </div>
                <CardTitle className="text-base leading-snug">{journal.name}</CardTitle>
                <p className="font-devanagari text-sm text-text-muted">
                  {journal.nameHindi}
                </p>
              </CardHeader>
              <CardContent className="mt-auto flex flex-col gap-2">
                <Link href={journal.entryRoute}>
                  <Button variant="outline" size="sm" className="w-full">
                    View Journal
                  </Button>
                </Link>
                <Link href={`${journal.routePrefix}/SubmitManuscript`}>
                  <Button variant="ghost" size="sm" className="w-full">
                    Submit Paper
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
