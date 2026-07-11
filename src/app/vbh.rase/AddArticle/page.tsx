import { JournalPage, journalPageMetadata } from "@/components/journal/JournalPage";
import type { Metadata } from "next";
import LegacyContent from "./legacy-content";

export const metadata: Metadata = journalPageMetadata(
  "vbh",
  "Add Article",
  "/AddArticle",
  "Submit a new research article to the journal editorial system."
);

export default function Page() {
  return (
    <JournalPage journalId="vbh">
      <LegacyContent />
    </JournalPage>
  );
}
