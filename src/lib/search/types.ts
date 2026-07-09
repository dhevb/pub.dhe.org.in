import type { JournalId } from "@/lib/journals/config";

export type SearchSortOption =
  | "newest"
  | "oldest"
  | "alphabetical"
  | "most-viewed";

export type SearchLanguageFilter = "all" | "en" | "hi";

export interface SearchFilters {
  query: string;
  journalId?: JournalId | "all";
  language?: SearchLanguageFilter;
  year?: number | "all";
  volume?: string;
  issue?: string;
  author?: string;
  category?: string;
  conference?: string;
  track?: string;
  keywords?: string;
  sort?: SearchSortOption;
}

export interface SearchDocument {
  id: string;
  title: string;
  href: string;
  journalId: JournalId;
  journalName: string;
  language: "en" | "hi";
  paperNum: number;
  keywords?: string;
  abstract?: string;
  authors?: string[];
  year?: number;
  category?: string;
  conference?: string;
  track?: string;
  volume?: string;
  issue?: string;
  viewCount?: number;
  type: "article" | "proceeding" | "book";
}
