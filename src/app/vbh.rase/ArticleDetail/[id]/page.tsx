import { DynamicArticleDetail } from "@/components/journal/DynamicArticleDetail";
import { JournalShell } from "@/components/journal/JournalShell";
import { getJournal } from "@/lib/journals/config";

const journal = getJournal("vbh");

interface Props {
  params: { id: string };
}

export default function ArticleDetailPage({ params }: Props) {
  return (
    <JournalShell journal={journal}>
      <DynamicArticleDetail id={params.id} journalId="vbh" />
    </JournalShell>
  );
}
