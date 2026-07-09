import type { JournalId } from "@/lib/journals/config";
import { getJournal, type JournalConfig } from "@/lib/journals/config";
import { journalSectionMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JournalShell } from "./JournalShell";

export function journalPageMetadata(
  journalId: JournalId,
  title: string,
  pathSuffix: string,
  description?: string,
  noIndex = false
): Metadata {
  const journal = getJournal(journalId);
  return journalSectionMetadata(journal, title, pathSuffix, description, noIndex);
}

interface JournalPageProps {
  journalId: JournalId;
  children: ReactNode;
}

export function JournalPage({ journalId, children }: JournalPageProps) {
  const journal = getJournal(journalId);
  return <JournalShell journal={journal}>{children}</JournalShell>;
}

export function getJournalFromId(journalId: JournalId): JournalConfig {
  return getJournal(journalId);
}
