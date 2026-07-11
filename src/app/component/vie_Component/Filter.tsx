"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ArticleList from "./ArticleList";
import { VIE_ARCHIVE_CATALOG } from "@/lib/journals/vie-archive-catalog";
import {
  filterVieArchiveByQuery,
  vieArchivePapers,
} from "@/lib/journals/vie-archive-search";

function FilterInner() {
  const searchParams = useSearchParams();
  const allArticles = VIE_ARCHIVE_CATALOG;

  const volumes: string[] = useMemo(
    () => Array.from(new Set(allArticles.map((article) => article.volume))),
    [allArticles]
  );

  const [selectedVolume, setSelectedVolume] = useState<string>(volumes[0] ?? "");
  const [selectedIssue, setSelectedIssue] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const volume = searchParams.get("volume");
    const issue = searchParams.get("issue");
    const q = searchParams.get("q");
    if (volume && volumes.includes(volume)) setSelectedVolume(volume);
    if (issue) setSelectedIssue(issue);
    if (q) setSearchQuery(q);
  }, [searchParams, volumes]);

  const isSearching = searchQuery.trim().length > 0;

  const searchMatches = useMemo(
    () => filterVieArchiveByQuery(vieArchivePapers(), searchQuery),
    [searchQuery]
  );

  const filteredArticles = useMemo(() => {
    if (isSearching) {
      return searchMatches;
    }
    if (selectedIssue === "") {
      return [];
    }
    return allArticles.filter(
      (article) =>
        article.volume === selectedVolume && article.issue === selectedIssue
    );
  }, [
    allArticles,
    isSearching,
    searchMatches,
    selectedVolume,
    selectedIssue,
  ]);

  const issuesWithDates = useMemo(() => {
    const issuesMap = new Map<string, string>();
    allArticles.forEach((article) => {
      if (article.volume === selectedVolume && !issuesMap.has(article.issue)) {
        issuesMap.set(article.issue, article.publishDate);
      }
    });
    return Array.from(issuesMap.entries());
  }, [allArticles, selectedVolume]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVolume(e.target.value);
    setSelectedIssue("");
    setSearchQuery("");
  };

  const handleIssueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedIssue(e.target.value);
    setSearchQuery("");
  };

  useEffect(() => {
    if (!isSearching && issuesWithDates.length > 0 && selectedIssue === "") {
      setSelectedIssue(issuesWithDates[0][0]);
    }
  }, [selectedVolume, issuesWithDates, isSearching, selectedIssue]);

  return (
    <div>
      <div className="mx-auto flex flex-col items-center justify-center p-4">
        <h1 className="mb-4 text-2xl font-bold text-black">Table of contents</h1>

        <div className="mb-4 w-full max-w-xl">
          <label htmlFor="archive-search" className="mr-2 text-black">
            Search archive:
          </label>
          <input
            id="archive-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or author across all volumes…"
            className="mt-1 w-full rounded border p-2 text-black"
          />
        </div>

        {!isSearching && (
          <>
            <div className="mb-4 text-black">
              <label htmlFor="volume" className="mr-2">
                Select Volume:
              </label>
              <select
                id="volume"
                value={selectedVolume}
                onChange={handleVolumeChange}
                className="rounded border p-2"
              >
                {volumes.map((volume) => (
                  <option key={volume} value={volume} className="m-4">
                    {volume}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4 text-black">
              <label htmlFor="issue" className="mr-2">
                Select Issue:
              </label>
              <select
                id="issue"
                value={selectedIssue}
                onChange={handleIssueChange}
                className="rounded border p-2"
              >
                <option value="">Select Issue</option>
                {issuesWithDates.map(([issue, publishDate]) => (
                  <option key={issue} value={issue}>
                    {issue} (Published:{" "}
                    {new Date(publishDate).toLocaleDateString()})
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {isSearching && (
          <p className="mb-4 text-sm text-gray-600">
            {searchMatches.length} paper{searchMatches.length !== 1 ? "s" : ""}{" "}
            matching &ldquo;{searchQuery.trim()}&rdquo; across all volumes
          </p>
        )}
      </div>

      {filteredArticles.length > 0 ? (
        <ArticleList articles={filteredArticles} />
      ) : isSearching ? (
        <p className="px-4 text-center text-gray-600">
          No papers match your search. Try different keywords.
        </p>
      ) : (
        selectedIssue === "" && (
          <p className="px-4 text-center text-gray-600">
            Select an issue to view its papers, or use search above.
          </p>
        )
      )}
    </div>
  );
}

const Filter: React.FC = () => (
  <Suspense
    fallback={
      <div className="p-4 text-center text-gray-600">Loading archive…</div>
    }
  >
    <FilterInner />
  </Suspense>
);

export default Filter;
