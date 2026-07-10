import { describe, expect, it } from "vitest";
import { formatCitation, CITATION_STYLES } from "../citations";
import type { PaperData } from "@/types/article";

const sample: PaperData = {
  ArticleDetails: {
    Title: "Test Paper Title",
    Authors: [{ Name: "John Smith", Position: "Dr", Affiliation: "DHE" }],
    CoAuthors: [{ Name: "Jane Doe", Position: "Prof", Affiliation: "IIT" }],
  },
  ArticleInfo: { Published: "January 2024", Received: "", Revised: "", Editor: "" },
  Abstract: "Abstract text",
};

describe("formatCitation", () => {
  const opts = {
    journalName: "Viksit Bharat Education",
    url: "https://pub.dhe.org.in/vbe.rase/Paper1",
    year: "2024",
  };

  it("formats APA citation", () => {
    const apa = formatCitation("apa", sample, opts);
    expect(apa).toContain("Test Paper Title");
    expect(apa).toContain("2024");
    expect(apa).toContain("Viksit Bharat Education");
  });

  it("formats BibTeX with author and year", () => {
    const bib = formatCitation("bibtex", sample, opts);
    expect(bib).toContain("@article");
    expect(bib).toContain("John Smith and Jane Doe");
    expect(bib).toContain("year={2024}");
  });

  it("exports all citation styles", () => {
    expect(CITATION_STYLES.map((s) => s.id)).toEqual([
      "apa",
      "mla",
      "chicago",
      "ieee",
      "bibtex",
      "ris",
    ]);
    for (const style of CITATION_STYLES) {
      const text = formatCitation(style.id, sample, opts);
      expect(text.length).toBeGreaterThan(10);
    }
  });
});
