import { IndexingPageView } from "@/components/journal/views";
import { journalPageMetadata } from "@/components/journal/JournalPage";
import type { Metadata } from "next";

export const metadata: Metadata = journalPageMetadata("vih", "Indexing", "/Indexing");

export default function Page() {
  return <IndexingPageView journalId="vih" />;
}
