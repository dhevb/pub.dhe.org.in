import { ArticlesPageView } from "@/components/journal/views";
import { journalPageMetadata } from "@/components/journal/JournalPage";
import type { Metadata } from "next";

export const metadata: Metadata = journalPageMetadata("vbe", "Articles", "/ReadArticlePage");

export default function Page() {
  return ArticlesPageView({ journalId: "vbe" });
}
