import type { JournalId } from "@/lib/journals/config";
import { articleDetailRoute, getJournal } from "@/lib/journals/config";
import { apiFetch, journalArticlePath } from "@/lib/api/client";
import { DynamicArticleDetail } from "@/components/journal/DynamicArticleDetail";
import { JournalPage } from "@/components/journal/JournalPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { googleScholarMetadata } from "@/lib/seo/google-scholar";
import { buildMetadata, siteConfig } from "@/lib/seo/metadata";
import {
  breadcrumbSchema,
  scholarlyArticleSchema,
} from "@/lib/seo/schemas";
import type { PaperData } from "@/types/article";
import type { Metadata } from "next";

interface ArticleDetailPageProps {
  journalId: JournalId;
  id: string;
}

export async function generateArticleDetailMetadata({
  journalId,
  id,
}: ArticleDetailPageProps): Promise<Metadata> {
  const journal = getJournal(journalId);
  const path = `${journal.routePrefix}/ArticleDetail/${id}`;

  try {
    const data = await apiFetch<PaperData>(journalArticlePath(journalId, id), {
      cache: "no-store",
    });
    const title = data.ArticleDetails?.Title ?? `Article ${id}`;

    return {
      ...buildMetadata({
        title,
        description: data.Abstract?.slice(0, 160) ?? `Research article from ${journal.name}`,
        path,
        type: "article",
        journal,
      }),
      other: googleScholarMetadata(data, journal),
    };
  } catch {
    return buildMetadata({
      title: `Article ${id}`,
      description: `Research article from ${journal.name}`,
      path,
      journal,
    });
  }
}

export async function ArticleDetailPage({
  journalId,
  id,
}: ArticleDetailPageProps) {
  const journal = getJournal(journalId);
  const articleUrl = `${siteConfig.url}${articleDetailRoute(journal, id)}`;

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: journal.name, url: `${siteConfig.url}${journal.entryRoute}` },
    {
      name: "Articles",
      url: `${siteConfig.url}${journal.routePrefix}/ReadArticlePage`,
    },
    { name: `Article ${id}`, url: articleUrl },
  ]);

  return (
    <JournalPage journalId={journalId}>
      <JsonLd data={breadcrumbs} />
      <DynamicArticleDetail id={id} journalId={journalId} />
    </JournalPage>
  );
}

export function buildPaperBreadcrumbs(
  journalId: JournalId,
  paperNum: number,
  paperTitle: string
) {
  const journal = getJournal(journalId);
  const paperUrl = `${siteConfig.url}${journal.routePrefix}/Paper${paperNum}`;

  return breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: journal.name, url: `${siteConfig.url}${journal.entryRoute}` },
    {
      name: "Articles",
      url: `${siteConfig.url}${journal.routePrefix}/ReadArticlePage`,
    },
    { name: paperTitle, url: paperUrl },
  ]);
}

export function buildPaperJsonLd(
  journalId: JournalId,
  paperNum: number,
  data: PaperData
) {
  const journal = getJournal(journalId);
  if (!data.ArticleDetails) return null;

  return scholarlyArticleSchema({
    title: data.ArticleDetails.Title,
    abstract: data.Abstract || "",
    authors: data.ArticleDetails.Authors?.map((a) => a.Name) || [],
    datePublished: data.ArticleInfo?.Published || "",
    url: `${siteConfig.url}${journal.routePrefix}/Paper${paperNum}`,
    keywords: data.Keywords,
    journalName: journal.name,
  });
}
