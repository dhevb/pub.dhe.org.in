import { PaperPage, generatePaperMetadata } from "@/components/journal/PaperPage";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return generatePaperMetadata({ journalId: "vbh", paperNum: 5 });
}

export default function Page() {
  return <PaperPage journalId="vbh" paperNum={5} />;
}
