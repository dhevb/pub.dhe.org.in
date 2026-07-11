import { JOURNALS } from "@/lib/journals/config";
import type { SearchIndexItem } from "@/lib/content/search-index";
import { VIE_ARCHIVE_CATALOG } from "@/lib/journals/vie-archive-catalog";
import {
  isVieArchivePaper,
  type VieArchiveArticle,
} from "@/lib/journals/vie-archive-utils";

function parsePublishYear(publishDate: string): number | undefined {
  const match = publishDate.match(/\d{4}/);
  return match ? Number(match[0]) : undefined;
}

export function vieArchiveTableHref(article: VieArchiveArticle): string {
  const params = new URLSearchParams({
    volume: article.volume,
    issue: article.issue,
  });
  return `/vie.rase/table?${params.toString()}`;
}

export function vieArchivePapers(): VieArchiveArticle[] {
  return VIE_ARCHIVE_CATALOG.filter(isVieArchivePaper);
}

export function filterVieArchiveByQuery(
  articles: VieArchiveArticle[],
  query: string
): VieArchiveArticle[] {
  const q = query.trim().toLowerCase();
  if (!q) return articles;

  const tokens = q.split(/\s+/).filter(Boolean);
  return articles.filter((article) => {
    const haystack = [article.title, article.author, article.volume, article.issue]
      .join(" ")
      .toLowerCase();
    return tokens.every((token) => haystack.includes(token));
  });
}

export function buildVieArchiveSearchIndex(): SearchIndexItem[] {
  const journal = JOURNALS.vie;

  return vieArchivePapers().map((entry) => ({
    id: `vie-archive-${entry.page.replace(/[^\w]+/g, "-")}`,
    title: entry.title,
    journal,
    paperNum: 0,
    href: vieArchiveTableHref(entry),
    type: "archive" as const,
    authors: entry.author.trim() ? [entry.author.trim()] : [],
    published: entry.publishDate,
    year: parsePublishYear(entry.publishDate),
    volume: entry.volume,
    issue: entry.issue,
    pdfHref: `${entry.page}.pdf`,
  }));
}