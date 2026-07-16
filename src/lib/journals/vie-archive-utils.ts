/** Helpers for the VIE legacy volume/issue archive catalog. */

export interface VieArchiveArticle {
  title: string;
  author: string;
  publishDate: string;
  page: string;
  volume: string;
  issue: string;
  readArticle?: string;
}

const CONTENT_TITLES = new Set(["content", "conent"]);

export function isVieArchiveContentEntry(article: VieArchiveArticle): boolean {
  const title = article.title.trim().toLowerCase();
  return CONTENT_TITLES.has(title) || title.startsWith("journal title for");
}

export function isVieArchivePaper(article: VieArchiveArticle): boolean {
  if (isVieArchiveContentEntry(article)) return false;
  const author = article.author.trim() || article.readArticle?.trim() || "";
  return Boolean(article.title.trim() && author);
}

export function vieArchivePdfUrl(page: string): string {
  return `${page}.pdf`;
}

/** PDFs deferred for upload — show pending state, not broken links. */
export const VIE_ARCHIVE_PENDING_PDF_PATHS = new Set([
  "/vie/Volume 4 Issue 1 Article 61",
  "/vie/Volume 4 Issue 1 Article 62",
  "/vie/Volume 4 Issue 1 Article 63",
  "/vie/Volume 4 Issue 1 Article 64",
]);

export function isVieArchivePdfPending(page: string): boolean {
  return VIE_ARCHIVE_PENDING_PDF_PATHS.has(page);
}

export function vieArchiveContentPdfUrl(page: string): string {
  return vieArchivePdfUrl(page);
}
