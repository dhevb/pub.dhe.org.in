import { JournalPage, journalPageMetadata } from "@/components/journal/JournalPage";
import type { Metadata } from "next";
import LegacyContent from "./legacy-content";

export const metadata: Metadata = journalPageMetadata(
  "vbe",
  "Current Issue",
  "/issue",
  "Read articles from the current journal issue."
);

export default function Page() {
  return (
    <JournalPage journalId="vbe">
      <LegacyContent />
    </JournalPage>
  );
}
