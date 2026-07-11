import { JournalPage, journalPageMetadata } from "@/components/journal/JournalPage";
import type { Metadata } from "next";
import LegacyContent from "./legacy-content";

export const metadata: Metadata = journalPageMetadata(
  "vbe",
  "Article Index",
  "/table",
  "Searchable index of all published articles."
);

export default function Page() {
  return (
    <JournalPage journalId="vbe">
      <LegacyContent />
    </JournalPage>
  );
}
