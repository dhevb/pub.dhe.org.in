import {
  apiFetch,
  apiFetchWithAuth,
  journalArticlePath,
  journalArticlesPath,
} from "./client";
import type { ArticleDetail, ArticleSummary } from "./types";

export async function getAllArticles(
  apiPrefix: string
): Promise<ArticleSummary[]> {
  const data = await apiFetch<ArticleSummary[] | { articles: ArticleSummary[] }>(
    journalArticlesPath(apiPrefix),
    { cache: "no-store" }
  );
  return Array.isArray(data) ? data : data.articles ?? [];
}

export async function getArticleById(
  apiPrefix: string,
  id: string
): Promise<ArticleDetail> {
  return apiFetch<ArticleDetail>(journalArticlePath(apiPrefix, id), {
    cache: "no-store",
  });
}

export async function getArticleByIdWithAuth(
  apiPrefix: string,
  id: string,
  token: string
): Promise<ArticleDetail> {
  return apiFetchWithAuth<ArticleDetail>(
    journalArticlePath(apiPrefix, id),
    token
  );
}
