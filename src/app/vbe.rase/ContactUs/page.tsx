import { ContactPageView } from "@/components/journal/views";
import { journalPageMetadata } from "@/components/journal/JournalPage";
import type { Metadata } from "next";

export const metadata: Metadata = journalPageMetadata("vbe", "Contact", "/ContactUs");

export default function Page() {
  return <ContactPageView journalId="vbe" />;
}
