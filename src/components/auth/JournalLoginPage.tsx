"use client";

import { useRouter } from "next/navigation";
import type { JournalId } from "@/lib/journals/config";
import { getJournal } from "@/lib/journals/config";
import { JournalLogin } from "@/components/auth/JournalLogin";

export function JournalLoginPage({ journalId }: { journalId: JournalId }) {
  const router = useRouter();
  const journal = getJournal(journalId);

  return (
    <JournalLogin
      onLogin={() => {
        router.push(`${journal.routePrefix}/SubmitManuscript`);
        router.refresh();
      }}
      signupHref={`${journal.routePrefix}/signup`}
    />
  );
}
