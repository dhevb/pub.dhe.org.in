import type { SearchDocument, SearchFilters } from "./types";

function normalize(text: string): string {
  return text.toLowerCase().trim();
}

function matchesQuery(doc: SearchDocument, query: string): boolean {
  if (!query) return true;
  const q = normalize(query);
  const haystack = [
    doc.title,
    doc.journalName,
    doc.journalId,
    doc.keywords,
    doc.abstract,
    doc.category,
    doc.conference,
    doc.track,
    doc.volume,
    doc.issue,
    ...(doc.authors ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  // Full-text: match any token
  const tokens = q.split(/\s+/).filter(Boolean);
  return tokens.every((token) => haystack.includes(token));
}

function parseYear(dateStr?: string): number | undefined {
  if (!dateStr) return undefined;
  const match = dateStr.match(/\d{4}/);
  return match ? Number(match[0]) : undefined;
}

export function searchDocuments(
  documents: SearchDocument[],
  filters: SearchFilters
): SearchDocument[] {
  let results = documents.filter((doc) => {
    if (!matchesQuery(doc, filters.query)) return false;
    if (filters.journalId && filters.journalId !== "all" && doc.journalId !== filters.journalId)
      return false;
    if (filters.language && filters.language !== "all" && doc.language !== filters.language)
      return false;
    if (filters.year && filters.year !== "all" && doc.year !== filters.year) return false;
    if (filters.volume && doc.volume !== filters.volume) return false;
    if (filters.issue && doc.issue !== filters.issue) return false;
    if (filters.category && !doc.category?.toLowerCase().includes(normalize(filters.category)))
      return false;
    if (filters.conference && !doc.conference?.toLowerCase().includes(normalize(filters.conference)))
      return false;
    if (filters.track && !doc.track?.toLowerCase().includes(normalize(filters.track)))
      return false;
    if (filters.keywords && !doc.keywords?.toLowerCase().includes(normalize(filters.keywords)))
      return false;
    if (filters.author) {
      const a = normalize(filters.author);
      const authorMatch = doc.authors?.some((name) => normalize(name).includes(a));
      if (!authorMatch) return false;
    }
    return true;
  });

  const sort = filters.sort ?? "newest";
  results = [...results].sort((a, b) => {
    switch (sort) {
      case "alphabetical":
        return a.title.localeCompare(b.title);
      case "oldest":
        return (a.year ?? 0) - (b.year ?? 0);
      case "most-viewed":
        return (b.viewCount ?? 0) - (a.viewCount ?? 0);
      case "newest":
      default:
        return (b.year ?? 0) - (a.year ?? 0);
    }
  });

  return results;
}

export { parseYear };

/** Future: plug semantic/vector search provider here. */
export interface SemanticSearchProvider {
  id: string;
  search(query: string, limit?: number): Promise<SearchDocument[]>;
}

export const semanticSearchRegistry: SemanticSearchProvider[] = [];
