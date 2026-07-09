"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { JournalConfig } from "@/lib/journals/config";
import { articleDetailRoute } from "@/lib/journals/config";
import { getAllArticles } from "@/lib/api/articles";
import type { ArticleSummary } from "@/lib/api/types";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

export interface StaticPaperItem {
  paperNum: number;
  title: string;
  href: string;
}

interface ArticleListProps {
  journal: JournalConfig;
  staticPapers: StaticPaperItem[];
}

export function ArticleList({ journal, staticPapers }: ArticleListProps) {
  const [articles, setArticles] = useState<ArticleSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await getAllArticles(journal.apiPrefix);
        if (!cancelled) setArticles(data);
      } catch {
        if (!cancelled) setError("Unable to load dynamic articles. Showing archived papers.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [journal.apiPrefix]);

  return (
    <div>
      <header className="mb-8 text-center">
        <h1 className="heading-section mb-2">Published Articles</h1>
        <p className="text-text-muted">{journal.name}</p>
      </header>

      {staticPapers.length > 0 && (
        <section className="mb-10" aria-labelledby="static-papers-heading">
          <h2 id="static-papers-heading" className="mb-4 text-lg font-semibold text-text">
            Journal Archive
          </h2>
          <ul className="space-y-3">
            {staticPapers.map((paper) => (
              <li key={paper.paperNum}>
                <Link href={paper.href}>
                  <Card className="transition-transform hover:-translate-y-0.5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-text">{paper.title}</p>
                        <p className="text-sm text-text-muted">
                          Paper {paper.paperNum} · Open Access
                        </p>
                      </div>
                      <Badge variant="primary">Archive</Badge>
                    </div>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="dynamic-articles-heading">
        <h2 id="dynamic-articles-heading" className="mb-4 text-lg font-semibold text-text">
          Recent Submissions
        </h2>

        {loading && (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        )}

        {error && !loading && (
          <p className="mb-4 text-sm text-text-muted">{error}</p>
        )}

        {!loading && articles.length === 0 && !error && (
          <p className="text-text-muted">No additional articles at this time.</p>
        )}

        {!loading && articles.length > 0 && (
          <ul className="space-y-3">
            {articles.map((article) => {
              const id = article._id ?? String((article as { id?: number }).id);
              const title = article.title ?? "Untitled Article";
              return (
                <li key={id}>
                  <Link href={articleDetailRoute(journal, id)}>
                    <Card className="transition-transform hover:-translate-y-0.5">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="font-semibold text-text">{title}</p>
                        <Badge variant="accent">Article</Badge>
                      </div>
                    </Card>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
