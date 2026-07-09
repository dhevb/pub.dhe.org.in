import { JournalHomepage } from "@/components/home/JournalHomepage";
import { JournalShell } from "@/components/journal/JournalShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { getJournal } from "@/lib/journals/config";
import { journalMetadata } from "@/lib/seo/metadata";
import { journalSchema, organizationSchema } from "@/lib/seo/schemas";
import type { Metadata } from "next";

const journal = getJournal("vih");

export const metadata: Metadata = journalMetadata(journal);

export default function VihEntryPage() {
  return (
    <JournalShell journal={journal}>
      <JsonLd data={[organizationSchema(), journalSchema(journal)]} />
      <JournalHomepage journal={journal} />
    </JournalShell>
  );
}
