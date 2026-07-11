import { JournalPage, journalPageMetadata } from "@/components/journal/JournalPage";
import type { Metadata } from "next";
import LegacyContent from "./legacy-content";

export const metadata: Metadata = journalPageMetadata(
  "vie",
  "Manuscript Details",
  "/ManuscriptDetails",
  "View and manage your submitted manuscript details and status."
);

export default function Page() {
  return (
    <JournalPage journalId="vie">
      <LegacyContent />
    </JournalPage>
  );
}
