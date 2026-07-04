import { PaperPage, generatePaperMetadata } from "@/components/journal/PaperPage";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return generatePaperMetadata({ journalId: "vie", paperNum: 3 });
}

export default function Page() {
  return <PaperPage journalId="vie" paperNum={3} />;
}
