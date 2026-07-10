import { describe, expect, it } from "vitest";
import { searchDocuments } from "../engine";
import type { SearchDocument } from "../types";

const docs: SearchDocument[] = [
  {
    id: "1",
    title: "IoT in Agriculture",
    href: "/vbe.rase/Paper1",
    journalId: "vbe",
    journalName: "VBE",
    language: "en",
    paperNum: 1,
    type: "article",
    year: 2024,
    authors: ["A. Kumar"],
    keywords: "iot, farming",
    category: "Technology",
  },
  {
    id: "2",
    title: "शिक्षा में नवाचार",
    href: "/vbh.rase/Paper1",
    journalId: "vbh",
    journalName: "VBH",
    language: "hi",
    paperNum: 1,
    type: "article",
    year: 2023,
    authors: ["राजेश"],
    keywords: "शिक्षा",
    category: "Education",
  },
];

describe("searchDocuments", () => {
  it("filters by query tokens", () => {
    const results = searchDocuments(docs, { query: "iot agriculture" });
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe("1");
  });

  it("filters by journal and language", () => {
    const results = searchDocuments(docs, {
      query: "",
      journalId: "vbh",
      language: "hi",
    });
    expect(results).toHaveLength(1);
    expect(results[0].journalId).toBe("vbh");
  });

  it("sorts alphabetically and by year", () => {
    const newest = searchDocuments(docs, { query: "", sort: "newest" });
    expect(newest[0].year).toBe(2024);

    const alpha = searchDocuments(docs, { query: "", sort: "alphabetical" });
    expect(alpha[0].title.localeCompare(alpha[1].title)).toBeLessThanOrEqual(0);
  });

  it("filters by category", () => {
    const results = searchDocuments(docs, {
      query: "",
      category: "technology",
    });
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe("1");
  });

  it("sorts by view count and oldest", () => {
    const withViews = [
      { ...docs[0], viewCount: 10 },
      { ...docs[1], viewCount: 50 },
    ];
    const viewed = searchDocuments(withViews, { query: "", sort: "most-viewed" });
    expect(viewed[0].viewCount).toBe(50);

    const oldest = searchDocuments(docs, { query: "", sort: "oldest" });
    expect(oldest[0].year).toBe(2023);
  });
});
