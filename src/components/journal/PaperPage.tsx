import { ArticleRenderer } from "@/components/journal/ArticleRenderer";
import {
  buildPaperBreadcrumbs,
  buildPaperJsonLd,
} from "@/components/journal/ArticleDetailPage";
import { JournalShell } from "@/components/journal/JournalShell";
import type { JournalId } from "@/lib/journals/config";
import { getJournal } from "@/lib/journals/config";
import { loadPaper } from "@/lib/journals/papers";
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
      ...(googleScholarMetadata(data, journal) as Record<string, string | string[]>),
      citation_pdf_url: `${siteConfig.url}${path}`,
    },
  };
}

export async function PaperPage({ journalId, paperNum }: PaperPageProps) {
  const journal = getJournal(journalId);
  const data = await loadPaper(journalId, paperNum);
  const title = data.ArticleDetails?.Title || `Paper ${paperNum}`;

  const schema = buildPaperJsonLd(journalId, paperNum, data);
  const breadcrumbs = buildPaperBreadcrumbs(journalId, paperNum, title);

  return (
    <JournalShell journal={journal}>
      <JsonLd data={[breadcrumbs, ...(schema ? [schema] : [])]} />
      <ArticleRenderer data={data} />
    </JournalShell>
  );
}
