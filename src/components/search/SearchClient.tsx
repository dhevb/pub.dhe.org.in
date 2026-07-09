"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { SearchIndexItem } from "@/lib/content/search-index";
import { BOOKS_AND_PROCEEDINGS } from "@/lib/content/homepage";
import { filterSearchIndex } from "@/lib/content/search-index";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

interface SearchClientProps {
  index: SearchIndexItem[];
}

export function SearchClient({ index }: SearchClientProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => filterSearchIndex(index, query), [index, query]);

  const bookResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return BOOKS_AND_PROCEEDINGS.filter((b) =>
      b.title.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <>
      <div className="relative mx-auto mb-8 max-w-2xl">
        <Search
          className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted"
          aria-hidden
        />
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, journal, keywords, or abstract..."
          className="pl-12"
          aria-label="Search articles and proceedings"
        />
      </div>

      {query && (
        <p className="mb-6 text-center text-text-muted">
          {results.length + bookResults.length} result
          {results.length + bookResults.length !== 1 ? "s" : ""} found
        </p>
      )}

      <div className="mx-auto max-w-3xl space-y-3">
        {results.map((item) => (
          <Link key={item.id} href={item.href}>
            <Card className="transition-transform hover:-translate-y-0.5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-text">{item.title}</p>
                  <p className="mt-1 text-sm text-text-muted">{item.journal.name}</p>
                  {item.keywords && (
                    <p className="mt-2 text-xs text-text-muted">
                      Keywords: {item.keywords}
                    </p>
                  )}
                </div>
                <Badge variant="primary">Article</Badge>
              </div>
            </Card>
          </Link>
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

        {query && results.length === 0 && bookResults.length === 0 && (
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
