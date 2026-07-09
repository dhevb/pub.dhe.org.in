import type { PaperData } from "@/types/article";
import type { Metadata } from "next";
import type { JournalConfig } from "@/lib/journals/config";
import { buildArticleDoi } from "@/lib/identifiers";

export interface GoogleScholarMetaOptions {
  journal?: JournalConfig;
  paperNum?: number;
  pageUrl: string;
  issn?: string;
  doiPrefix?: string;
  publisher?: string;
}

export function googleScholarMetadata(
  data: PaperData,
  options: GoogleScholarMetaOptions | JournalConfig | undefined
): Metadata["other"] {
  if (!data.ArticleDetails) return {};

  const journal =
    options && "routePrefix" in options ? options : options?.journal;
  const paperNum =
    options && "paperNum" in options ? options.paperNum : undefined;
  const pageUrl =
    options && "pageUrl" in options ? options.pageUrl : "";
  const siteIssn =
    options && "issn" in options ? options.issn : undefined;
  const doiPrefix =
    options && "doiPrefix" in options ? options.doiPrefix : undefined;
  const publisher =
    (options && "publisher" in options ? options.publisher : undefined) ||
    "Department of Holistic Education";

  const authors = [
    ...(data.ArticleDetails.Authors || []),
    ...(data.ArticleDetails.CoAuthors || []),
  ];

  const published = data.ArticleInfo?.Published || "";
  const issn = journal?.issn || siteIssn || undefined;
  const doi =
    (data as PaperData & { doi?: string }).doi ||
    (doiPrefix && journal && paperNum
      ? buildArticleDoi(doiPrefix, journal.id, paperNum)
      : undefined);

  const meta: Record<string, string | string[]> = {
    citation_title: data.ArticleDetails.Title,
    citation_publication_date: published,
    citation_journal_title: journal?.name ?? "Viksit Bharat Journal",
    citation_publisher: publisher,
    citation_language: journal?.language === "hi" ? "hi" : "en",
    citation_abstract: data.Abstract || "",
  };

  if (pageUrl) {
    meta.citation_abstract_html_url = pageUrl;
    meta.citation_pdf_url = pageUrl;
  }

  if (data.Keywords) meta.citation_keywords = data.Keywords;
  if (published) meta.citation_date = published;
  if (issn) meta.citation_issn = issn;
  if (doi) meta.citation_doi = doi;

  const volume = (data as PaperData & { volume?: string }).volume;
  const issue = (data as PaperData & { issue?: string }).issue;
  const firstPage = (data as PaperData & { firstPage?: string }).firstPage;
  const lastPage = (data as PaperData & { lastPage?: string }).lastPage;
  if (volume) meta.citation_volume = volume;
  if (issue) meta.citation_issue = issue;
  if (firstPage) meta.citation_firstpage = firstPage;
  if (lastPage) meta.citation_lastpage = lastPage;

  authors.forEach((author, i) => {
    meta[`citation_author${i + 1}`] = author.Name;
    if (author.Affiliation) {
      meta[`citation_author_institution${i + 1}`] = author.Affiliation;
    }
  });

  return meta;
}
