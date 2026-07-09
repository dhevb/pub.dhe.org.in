import type { SearchIndexItem } from "@/lib/content/search-index";
import { parseYear } from "@/lib/search";
import type { SearchDocument } from "@/lib/search";

export function indexToSearchDocuments(items: SearchIndexItem[]): SearchDocument[] {
  return items.map((item) => ({
    id: item.id,
    title: item.title,
    href: item.href,
    journalId: item.journal.id,
    journalName: item.journal.name,
    language: item.journal.language,
    paperNum: item.paperNum,
    keywords: item.keywords,
    abstract: item.abstract,
    authors: item.authors,
    year: item.year ?? parseYear(item.published),
    type: "article",
  }));
}
