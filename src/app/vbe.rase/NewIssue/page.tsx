import { journalPageMetadata } from "@/components/journal/JournalPage";
import type { Metadata } from "next";
import LegacyContent from "./legacy-content";

export const metadata: Metadata = journalPageMetadata(
  "vbe",
  "New Issue",
  "/NewIssue",
  "Latest journal issue and newly published articles."
);

export default function Page() {
  return <LegacyContent />;
}
