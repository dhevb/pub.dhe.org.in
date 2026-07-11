import { JOURNAL_LIST, paperRoute, type JournalConfig } from "@/lib/journals/config";
import { loadPaper } from "@/lib/journals/papers";
import { buildVieArchiveSearchIndex } from "@/lib/journals/vie-archive-search";

export interface SearchIndexItem {
  id: string;
  title: string;
  journal: JournalConfig;
  paperNum: number;
  href: string;
  type: "article" | "archive";
  keywords?: string;
  abstract?: string;
  authors?: string[];
  published?: string;
  year?: number;
  category?: string;
  volume?: string;
  issue?: string;
  pdfHref?: string;
}

export async function buildPaperSearchIndex(): Promise<SearchIndexItem[]> {
  const items: SearchIndexItem[] = [];

  for (const journal of JOURNAL_LIST) {
    for (let num = 1; num <= journal.paperCount; num++) {
      try {
        const paper = await loadPaper(journal.id, num);
        const title =
          paper.ArticleDetails?.Title ?? `${journal.name} — Paper ${num}`;

        const authors = [
          ...(paper.ArticleDetails?.Authors ?? []),
          ...(paper.ArticleDetails?.CoAuthors ?? []),
        ].map((a) => a.Name);
        const published = paper.ArticleInfo?.Published;

        items.push({
          id: `${journal.id}-paper-${num}`,
          title,
          journal,
          paperNum: num,
          href: paperRoute(journal, num),
          type: "article",
          keywords: paper.Keywords,
          abstract: paper.Abstract,
          authors,
          published,
          year: published?.match(/\d{4}/)?.[0]
            ? Number(published.match(/\d{4}/)![0])
            : undefined,
        });
      } catch {
        items.push({
          id: `${journal.id}-paper-${num}`,
          title: `${journal.name} — Paper ${num}`,
          journal,
          paperNum: num,
          href: paperRoute(journal, num),
          type: "article",
        });
      }
    }
  }

  items.push(...buildVieArchiveSearchIndex());

  return items;
}

export function filterSearchIndex(
  items: SearchIndexItem[],
  query: string
): SearchIndexItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return items.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.journal.name.toLowerCase().includes(q) ||
      item.journal.id.includes(q) ||
      item.keywords?.toLowerCase().includes(q) ||
      item.abstract?.toLowerCase().includes(q)
  );
}
