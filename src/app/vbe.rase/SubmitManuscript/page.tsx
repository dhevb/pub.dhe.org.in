import { SubmitManuscriptPageView } from "@/components/journal/views";
import { journalPageMetadata } from "@/components/journal/JournalPage";
import type { Metadata } from "next";

export const metadata: Metadata = journalPageMetadata("vbe", "Submit Manuscript", "/SubmitManuscript");

export default function Page() {
  return <SubmitManuscriptPageView journalId="vbe" />;
}
