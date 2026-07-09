import { LoginPageView } from "@/components/journal/views";
import { journalPageMetadata } from "@/components/journal/JournalPage";
import type { Metadata } from "next";

export const metadata: Metadata = journalPageMetadata("vih", "Sign In", "/login", undefined, true);

export default function Page() {
  return <LoginPageView journalId="vih" />;
}

