"use client";

import { ArticleRenderer } from "@/components/journal/ArticleRenderer";
import { ArticleSkeleton } from "@/components/ui/Skeleton";
import type { JournalId } from "@/lib/journals/config";
import { journalArticlePath, apiUrl } from "@/lib/api/client";
import type { PaperData } from "@/types/article";
import { useEffect, useState } from "react";

interface DynamicArticleDetailProps {
  id: string;
  journalId: JournalId;
}

export function DynamicArticleDetail({ id, journalId }: DynamicArticleDetailProps) {
  const [article, setArticle] = useState<PaperData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchArticle() {
      try {
        const res = await fetch(apiUrl(journalArticlePath(journalId, id)), {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Not found");
        const data = (await res.json()) as PaperData;
        if (!cancelled) setArticle(data);
      } catch {
        if (!cancelled) setError("An error occurred while fetching the article.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchArticle();
    return () => {
      cancelled = true;
    };
  }, [id, journalId]);

  if (loading) return <ArticleSkeleton />;
  if (error) return <p className="text-error">{error}</p>;
  if (!article) return <p>No article found.</p>;

  return <ArticleRenderer data={article} />;
}
