import { journalPageMetadata } from "@/components/journal/JournalPage";
import type { Metadata } from "next";
import LegacyContent from "./legacy-content";

export const metadata: Metadata = journalPageMetadata(
  "vbe",
  "Manuscript Details",
  "/ManuscriptDetails",
  "View and manage your submitted manuscript details and status."
);

export default function Page() {
  return <LegacyContent />;
}
