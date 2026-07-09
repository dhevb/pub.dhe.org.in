import { SignupPageView } from "@/components/journal/views";
import { journalPageMetadata } from "@/components/journal/JournalPage";
import type { Metadata } from "next";

export const metadata: Metadata = journalPageMetadata("vie", "Sign Up", "/signup", undefined, true);

export default function Page() {
  return <SignupPageView journalId="vie" />;
}

