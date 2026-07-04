import { PaperPage, generatePaperMetadata } from "@/components/journal/PaperPage";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return generatePaperMetadata({ journalId: "vih", paperNum: 4 });
}

export default function Page() {
  return <PaperPage journalId="vih" paperNum={4} />;
}
