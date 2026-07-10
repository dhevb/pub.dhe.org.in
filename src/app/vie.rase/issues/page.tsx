import { journalPageMetadata } from "@/components/journal/JournalPage";
import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

export const metadata: Metadata = journalPageMetadata(
  "vie",
  "Issues",
  "/issues",
  "Browse published journal issues."
);

/** Legacy /issues route — full archive catalog is at /table. */
export default function VieIssuesRedirect() {
  permanentRedirect("/vie.rase/table");
}