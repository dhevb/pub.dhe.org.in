"use client";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { JournalShell } from "@/components/journal/JournalShell";
import { JOURNAL_LIST, paperRoute } from "@/lib/journals/config";
import { getJournal } from "@/lib/journals/config";
import Link from "next/link";
import { useMemo, useState } from "react";

const journal = getJournal("vbe");

const SEARCH_INDEX = JOURNAL_LIST.flatMap((j) =>
  Array.from({ length: j.paperCount }, (_, i) => ({
    journal: j,
    paperNum: i + 1,
    title: `${j.name} — Paper ${i + 1}`,
    type: "article" as const,
  }))
);

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return SEARCH_INDEX.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.journal.name.toLowerCase().includes(q) ||
        item.journal.id.includes(q)
    );
  }, [query]);

  return (
    <JournalShell journal={journal}>
      <h1 className="heading-display mb-8 text-center">Global Search</h1>

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search articles, journals, keywords..."
        className="input-field mx-auto mb-8 block max-w-2xl"
        aria-label="Search articles and journals"
      />

      {query && (
        <p className="mb-6 text-center text-text-muted">
          {results.length} result{results.length !== 1 ? "s" : ""} found
        </p>
      )}

      <div className="mx-auto max-w-3xl space-y-3">
        {results.map((item) => (
          <Link key={`${item.journal.id}-${item.paperNum}`} href={paperRoute(item.journal, item.paperNum)}>
            <Card className="transition-transform hover:-translate-y-0.5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-text">{item.title}</p>
                  <p className="text-sm text-text-muted">{item.journal.name}</p>
                </div>
                <Badge variant="primary">{item.type}</Badge>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </JournalShell>
  );
}
