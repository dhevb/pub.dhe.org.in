import Link from "next/link";
import { buildPaperSearchIndex } from "@/lib/content/search-index";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardTitle } from "@/components/ui/Card";

export async function LatestPapersSection() {
  const papers = await buildPaperSearchIndex();
  const latest = papers.slice(0, 6);

  return (
    <section className="section-padding bg-background" aria-labelledby="latest-heading">
      <div className="container-wide">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="latest-heading" className="heading-section mb-2">
              Latest Published Papers
            </h2>
            <p className="text-text-muted">
              Open access research across all journal editions
            </p>
          </div>
          <Link
            href="/AllArticle"
            className="inline-flex min-h-11 items-center rounded-lg border border-border px-4 py-2 text-sm font-semibold text-text transition-colors hover:border-primary hover:text-primary"
          >
            View all articles
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((paper) => (
            <Link key={paper.id} href={paper.href}>
              <Card className="h-full transition-transform hover:-translate-y-0.5">
                <Badge
                  variant="primary"
                  className="mb-2 border border-primary/30 bg-primary/15 text-navy"
                >
                  {paper.journal.id.toUpperCase()}
                </Badge>
                <CardTitle className="line-clamp-2 text-base leading-snug">
                  {paper.title}
                </CardTitle>
                <CardContent className="mt-2 text-sm text-text-muted">
                  {paper.journal.name}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
