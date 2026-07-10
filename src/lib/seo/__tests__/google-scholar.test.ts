import { describe, expect, it } from "vitest";
import { JOURNALS } from "@/lib/journals/config";
import { googleScholarMetadata } from "../google-scholar";
import type { PaperData } from "@/types/article";

const paper: PaperData = {
  ArticleDetails: {
    Title: "Sample Research Paper",
    Authors: [{ Name: "Author One", Position: "", Affiliation: "DHE" }],
  },
  ArticleInfo: { Published: "March 2024", Received: "", Revised: "", Editor: "" },
  Abstract: "This is the abstract.",
  Keywords: "research, education",
};

describe("googleScholarMetadata", () => {
  it("returns empty object when ArticleDetails missing", () => {
    expect(googleScholarMetadata({}, undefined)).toEqual({});
  });

  it("generates required Scholar meta fields", () => {
    const meta = googleScholarMetadata(paper, {
      pageUrl: "https://pub.dhe.org.in/vbe.rase/Paper1",
      issn: "2278-1757",
      journal: JOURNALS.vbe,
      paperNum: 1,
    });

    expect(meta?.citation_title).toBe("Sample Research Paper");
    expect(meta?.citation_issn).toBe("2278-1757");
    expect(meta?.citation_author1).toBe("Author One");
    expect(meta?.citation_pdf_url).toBe("https://pub.dhe.org.in/vbe.rase/Paper1");
    expect(meta?.citation_keywords).toBe("research, education");
  });
});
