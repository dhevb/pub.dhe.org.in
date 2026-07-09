import {
  ArticleDetailPage,
  generateArticleDetailMetadata,
} from "@/components/journal/ArticleDetailPage";
import type { JournalId } from "@/lib/journals/config";
import type { Metadata } from "next";

const journalId = "vbe" as const satisfies JournalId;

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return generateArticleDetailMetadata({ journalId, id: params.id });
}

export default function Page({ params }: Props) {
  return <ArticleDetailPage journalId={journalId} id={params.id} />;
}
