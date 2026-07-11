"use client";

import { useState } from "react";

interface Article {
  title: string;
  date: string;
  author: string;
  description: string;
}

interface LegacyIssuesContentProps {
  AlphabetList: React.ComponentType;
  ResearchArticleCard: React.ComponentType<Article>;
  articles?: Article[];
}

const DEFAULT_ARTICLES: Article[] = [
  {
    title:
      "Caputo Fractional Derivative for Analysis of COVID-19 and HIV/AIDS Transmission",
    date: "29 Sep 2023",
    author: "Kumama Regassa Cheneke",
    description:
      "In this study, Caputo fractional derivative model of HIV and COVID-19 infections is analyzed. Moreover, the well-posedness of...",
  },
];

export function LegacyIssuesContent({
  AlphabetList,
  ResearchArticleCard,
  articles = DEFAULT_ARTICLES,
}: LegacyIssuesContentProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = articles.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <label className="block max-w-xl">
        <span className="sr-only">Search articles</span>
        <input
          type="search"
          placeholder="Search articles"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-field"
        />
      </label>

      <div className="flex flex-col gap-6 lg:flex-row">
        <aside className="shrink-0">
          <AlphabetList />
        </aside>
        <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.length === 0 ? (
            <p className="text-text-muted">No issues found.</p>
          ) : (
            filtered.map((article, index) => (
              <ResearchArticleCard key={index} {...article} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}