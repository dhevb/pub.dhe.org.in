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

export function vieArchiveContentPdfUrl(page: string): string {
  return vieArchivePdfUrl(page);
}
