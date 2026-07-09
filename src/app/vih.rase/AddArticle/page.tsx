import { journalPageMetadata } from "@/components/journal/JournalPage";
import type { Metadata } from "next";
import LegacyContent from "./legacy-content";

export const metadata: Metadata = journalPageMetadata(
  "vih",
  "Add Article",
  "/AddArticle",
  "Submit a new research article to the journal editorial system."
);

export default function Page() {
  return <LegacyContent />;
}
