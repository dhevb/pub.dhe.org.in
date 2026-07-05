import type { PaperData } from "@/types/article";
import type { Metadata } from "next";

export function googleScholarMetadata(data: PaperData): Metadata["other"] {
  if (!data.ArticleDetails) return {};

  const authors = [
    ...(data.ArticleDetails.Authors || []),
    ...(data.ArticleDetails.CoAuthors || []),
  ];

  const meta: Record<string, string | string[]> = {
    citation_title: data.ArticleDetails.Title,
    citation_publication_date: data.ArticleInfo?.Published || "",
    citation_journal_title: "Viksit Bharat Education Journal",
    citation_publisher: "Department of Holistic Education",
    citation_language: "en",
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
