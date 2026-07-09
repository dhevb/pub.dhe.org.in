import { ContactPageView } from "@/components/journal/views";
import { journalPageMetadata } from "@/components/journal/JournalPage";
import type { Metadata } from "next";

export const metadata: Metadata = journalPageMetadata("vbh", "Contact", "/ContactUs");

export default function Page() {
  return <ContactPageView journalId="vbh" />;
}
