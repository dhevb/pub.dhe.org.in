import { JournalPage, journalPageMetadata } from "@/components/journal/JournalPage";
import type { Metadata } from "next";
import LegacyContent from "./legacy-content";

export const metadata: Metadata = journalPageMetadata(
  "vbe",
  "Journal Issues",
  "/issues",
  "Browse all published volumes and issues of the journal."
);

export default function Page() {
  return (
    <JournalPage journalId="vbe">
      <LegacyContent />
    </JournalPage>
  );
}
