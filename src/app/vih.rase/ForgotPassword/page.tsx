import { ForgotPasswordPageView } from "@/components/journal/views";
import { journalPageMetadata } from "@/components/journal/JournalPage";
import type { Metadata } from "next";

export const metadata: Metadata = journalPageMetadata("vih", "Forgot Password", "/ForgotPassword", undefined, true);

export default function Page() {
  return <ForgotPasswordPageView journalId="vih" />;
}

