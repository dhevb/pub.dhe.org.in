import Link from "next/link";
import type { SearchIndexItem } from "@/lib/content/search-index";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardTitle } from "@/components/ui/Card";

interface LatestPapersSectionProps {
  papers: SearchIndexItem[];
}

export function LatestPapersSection({ papers }: LatestPapersSectionProps) {
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
          <Link href="/AllArticle">
            <Button variant="outline" size="sm">
              View all articles
            </Button>
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((paper) => (
            <Link key={paper.id} href={paper.href}>
              <Card className="h-full transition-transform hover:-translate-y-0.5">
                <Badge variant="primary" className="mb-2">
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
