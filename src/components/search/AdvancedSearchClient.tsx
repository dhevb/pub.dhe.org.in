"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import type { SearchDocument, SearchFilters } from "@/lib/search";
import { searchDocuments } from "@/lib/search";
import { JOURNAL_LIST } from "@/lib/journals/config";
import { BOOKS_AND_PROCEEDINGS } from "@/lib/content/homepage";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { trackEvent } from "@/lib/analytics";

interface AdvancedSearchClientProps {
  documents: SearchDocument[];
}

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "alphabetical", label: "A–Z" },
  { value: "most-viewed", label: "Most viewed" },
] as const;

export function AdvancedSearchClient({ documents }: AdvancedSearchClientProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    journalId: "all",
    language: "all",
    year: "all",
    sort: "newest",
  });
  const [showFilters, setShowFilters] = useState(false);

  const results = useMemo(() => searchDocuments(documents, filters), [documents, filters]);

  const bookResults = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    if (!q) return [];
    return BOOKS_AND_PROCEEDINGS.filter((b) =>
      b.title.toLowerCase().includes(q)
    );
  }, [filters.query]);

  function update<K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }));
    if (key === "query" && typeof value === "string" && value.length > 2) {
      trackEvent({ name: "search_query", properties: { query: value } });
    }
  }

  const years = useMemo(() => {
    const set = new Set(documents.map((d) => d.year).filter(Boolean) as number[]);
    return Array.from(set).sort((a, b) => b - a);
  }, [documents]);

  return (
    <>
      <div className="relative mx-auto mb-4 max-w-2xl">
        <Search
          className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted"
          aria-hidden
        />
        <Input
          type="search"
          value={filters.query}
          onChange={(e) => update("query", e.target.value)}
          placeholder="Full-text search: title, abstract, author, keywords..."
          className="pl-12"
          aria-label="Search articles and proceedings"
        />
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setShowFilters((v) => !v)}
          className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-muted"
          aria-expanded={showFilters}
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden />
          Filters
        </button>
        <label className="sr-only" htmlFor="search-sort">
          Sort results
        </label>
        <select
          id="search-sort"
          value={filters.sort}
          onChange={(e) =>
            update("sort", e.target.value as SearchFilters["sort"])
          }
          className="rounded-lg border bg-background px-3 py-2 text-sm"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {showFilters && (
        <div
          className="mx-auto mb-8 grid max-w-3xl gap-4 rounded-xl border bg-card p-4 sm:grid-cols-2 lg:grid-cols-3"
          role="region"
          aria-label="Search filters"
        >
          <div>
            <label htmlFor="filter-journal" className="mb-1 block text-xs font-medium">
              Journal
            </label>
            <select
              id="filter-journal"
              value={filters.journalId ?? "all"}
              onChange={(e) =>
                update("journalId", e.target.value as SearchFilters["journalId"])
              }
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
            >
              <option value="all">All journals</option>
              {JOURNAL_LIST.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="filter-language" className="mb-1 block text-xs font-medium">
              Language
            </label>
            <select
              id="filter-language"
              value={filters.language ?? "all"}
              onChange={(e) =>
                update("language", e.target.value as SearchFilters["language"])
              }
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
            >
              <option value="all">All</option>
              <option value="en">English</option>
              <option value="hi">Hindi</option>
            </select>
          </div>
          <div>
            <label htmlFor="filter-year" className="mb-1 block text-xs font-medium">
              Year
            </label>
            <select
              id="filter-year"
              value={filters.year === "all" || !filters.year ? "all" : String(filters.year)}
              onChange={(e) =>
                update(
                  "year",
                  e.target.value === "all" ? "all" : Number(e.target.value)
                )
              }
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
            >
              <option value="all">All years</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="filter-author" className="mb-1 block text-xs font-medium">
              Author
            </label>
            <Input
              id="filter-author"
              value={filters.author ?? ""}
              onChange={(e) => update("author", e.target.value)}
              placeholder="Author name"
            />
          </div>
          <div>
            <label htmlFor="filter-keywords" className="mb-1 block text-xs font-medium">
              Keywords
            </label>
            <Input
              id="filter-keywords"
              value={filters.keywords ?? ""}
              onChange={(e) => update("keywords", e.target.value)}
              placeholder="Keyword filter"
            />
          </div>
          <div>
            <label htmlFor="filter-category" className="mb-1 block text-xs font-medium">
              Category
            </label>
            <Input
              id="filter-category"
              value={filters.category ?? ""}
              onChange={(e) => update("category", e.target.value)}
              placeholder="Research category"
            />
          </div>
        </div>
      )}

      {filters.query && (
        <p className="mb-6 text-center text-text-muted">
          {results.length + bookResults.length} result
          {results.length + bookResults.length !== 1 ? "s" : ""} found
        </p>
      )}

      <div className="mx-auto max-w-3xl space-y-3">
        {results.map((item) => (
          <div key={item.id} className="space-y-1">
            <Link href={item.href}>
              <Card className="transition-transform hover:-translate-y-0.5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-text">{item.title}</p>
                    <p className="mt-1 text-sm text-text-muted">{item.journalName}</p>
                    {item.volume && item.issue && (
                      <p className="mt-1 text-xs text-text-muted">
                        {item.volume} · {item.issue}
                      </p>
                    )}
                    {item.authors && item.authors.length > 0 && (
                      <p className="mt-1 text-xs text-text-muted">
                        {item.authors.join(", ")}
                      </p>
                    )}
                    {item.keywords && (
                      <p className="mt-2 text-xs text-text-muted">
                        Keywords: {item.keywords}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant={item.type === "archive" ? "secondary" : "primary"}>
                      {item.type === "archive" ? "Archive" : "Article"}
                    </Badge>
                    {item.year && (
                      <span className="text-xs text-text-muted">{item.year}</span>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
            {item.type === "archive" && item.pdfHref && (
              <a
                href={item.pdfHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm text-primary hover:underline"
              >
                Open PDF
              </a>
            )}
          </div>
        ))}

        {bookResults.map((book) => (
          <a key={book.href} href={book.href} target="_blank" rel="noopener noreferrer">
            <Card className="transition-transform hover:-translate-y-0.5">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-text">{book.title}</p>
                <Badge variant="secondary">{book.type}</Badge>
              </div>
            </Card>
          </a>
        ))}

        {filters.query && results.length === 0 && bookResults.length === 0 && (
          <p className="text-center text-text-muted">
            No results found. Try different keywords or browse{" "}
            <Link href="/AllArticle" className="text-primary hover:underline">
              all articles
            </Link>
            .
          </p>
        )}
      </div>
    </>
  );
}
