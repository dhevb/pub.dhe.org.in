import type { PaperData } from "@/types/article";
import type { Metadata } from "next";
import type { JournalConfig } from "@/lib/journals/config";

export function googleScholarMetadata(
  data: PaperData,
  journal?: JournalConfig
): Metadata["other"] {
  if (!data.ArticleDetails) return {};

  const authors = [
    ...(data.ArticleDetails.Authors || []),
    ...(data.ArticleDetails.CoAuthors || []),
  ];

  const meta: Record<string, string | string[]> = {
    citation_title: data.ArticleDetails.Title,
    citation_publication_date: data.ArticleInfo?.Published || "",
    citation_journal_title: journal?.name ?? "Viksit Bharat Journal",
    citation_publisher: "Department of Holistic Education",
    citation_language: journal?.language === "hi" ? "hi" : "en",
    citation_abstract: data.Abstract || "",
  };

  if (data.Keywords) meta.citation_keywords = data.Keywords;
  if (data.ArticleInfo?.Published) meta.citation_date = data.ArticleInfo.Published;

  authors.forEach((author, i) => {
    meta[`citation_author${i + 1}`] = author.Name;
    if (author.Affiliation) {
      meta[`citation_author_institution${i + 1}`] = author.Affiliation;
    }
  });

  return meta;
}
