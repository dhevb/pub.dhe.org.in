import { ArticleRenderer } from "@/components/journal/ArticleRenderer";
import { CitationToolbar } from "@/components/research/CitationToolbar";
import {
  buildPaperBreadcrumbs,
  buildPaperJsonLd,
} from "@/components/journal/ArticleDetailPage";
import { JournalShell } from "@/components/journal/JournalShell";
import type { JournalId } from "@/lib/journals/config";
import { getJournal } from "@/lib/journals/config";
import { loadPaper } from "@/lib/journals/papers";
import { getSiteSettings } from "@/lib/cms";
import { buildMetadata, siteConfig } from "@/lib/seo/metadata";
import { googleScholarMetadata } from "@/lib/seo/google-scholar";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Metadata } from "next";

interface PaperPageProps {
  journalId: JournalId;
  paperNum: number;
}

export async function generatePaperMetadata({
  journalId,
  paperNum,
}: PaperPageProps): Promise<Metadata> {
  const journal = getJournal(journalId);
  const data = await loadPaper(journalId, paperNum);
  const title = data.ArticleDetails?.Title || `Paper ${paperNum}`;
  const path = `${journal.routePrefix}/Paper${paperNum}`;
  const pageUrl = `${siteConfig.url}${path}`;
  const site = getSiteSettings();

  return {
    ...buildMetadata({
      title,
      description: data.Abstract?.slice(0, 160),
      path,
      type: "article",
      journal,
      keywords: data.Keywords?.split(",").map((k) => k.trim()),
    }),
    other: {
      ...(googleScholarMetadata(data, {
        journal,
        paperNum,
        pageUrl,
        issn: site.issn,
        doiPrefix: site.doiPrefix,
        publisher: site.publisher,
      }) as Record<string, string | string[]>),
    },
  };
}

export async function PaperPage({ journalId, paperNum }: PaperPageProps) {
  const journal = getJournal(journalId);
  const data = await loadPaper(journalId, paperNum);
  const title = data.ArticleDetails?.Title || `Paper ${paperNum}`;

  const schema = buildPaperJsonLd(journalId, paperNum, data);
  const breadcrumbs = buildPaperBreadcrumbs(journalId, paperNum, title);
  const pageUrl = `${siteConfig.url}${journal.routePrefix}/Paper${paperNum}`;
  const year = data.ArticleInfo?.Published?.match(/\d{4}/)?.[0];

  return (
    <JournalShell journal={journal}>
      <JsonLd data={[breadcrumbs, ...(schema ? [schema] : [])]} />
      <CitationToolbar
        data={data}
        journalName={journal.name}
        url={pageUrl}
        year={year}
      />
      <ArticleRenderer data={data} />
    </JournalShell>
  );
}
