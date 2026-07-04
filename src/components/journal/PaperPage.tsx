import { ArticleRenderer } from "@/components/journal/ArticleRenderer";
import { JournalShell } from "@/components/journal/JournalShell";
import type { JournalId } from "@/lib/journals/config";
import { getJournal } from "@/lib/journals/config";
import { loadPaper } from "@/lib/journals/papers";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { scholarlyArticleSchema } from "@/lib/seo/schemas";
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

  return buildMetadata({
    title,
    description: data.Abstract?.slice(0, 160),
    path: `${journal.routePrefix}/Paper${paperNum}`,
    type: "article",
  });
}

export async function PaperPage({ journalId, paperNum }: PaperPageProps) {
  const journal = getJournal(journalId);
  const data = await loadPaper(journalId, paperNum);

  const schema = data.ArticleDetails
    ? scholarlyArticleSchema({
        title: data.ArticleDetails.Title,
        abstract: data.Abstract || "",
        authors: data.ArticleDetails.Authors?.map((a) => a.Name) || [],
        datePublished: data.ArticleInfo?.Published || "",
        url: `https://pub.rase.co.in${journal.routePrefix}/Paper${paperNum}`,
        keywords: data.Keywords,
      })
    : null;

  return (
    <JournalShell journal={journal}>
      {schema && <JsonLd data={schema} />}
      <ArticleRenderer data={data} />
    </JournalShell>
  );
}
