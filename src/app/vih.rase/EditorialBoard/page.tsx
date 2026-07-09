import { EditorialBoardPageView } from "@/components/journal/views";
import { journalPageMetadata } from "@/components/journal/JournalPage";
import type { Metadata } from "next";

export const metadata: Metadata = journalPageMetadata("vih", "Editorial Board", "/EditorialBoard");

export default function Page() {
  return <EditorialBoardPageView journalId="vih" />;
}
