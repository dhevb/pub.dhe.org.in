import type { JournalId } from "@/lib/journals/config";
import { getJournal, paperRoute } from "@/lib/journals/config";
import { loadPaper } from "@/lib/journals/papers";
import { JournalLoginPage } from "@/components/auth/JournalLoginPage";
import { SignupForm } from "@/components/auth/SignupForm";
import { EditorialBoard } from "@/components/journal/EditorialBoard";
import { ArticleList } from "@/components/journal/ArticleList";
import { JournalContact } from "@/components/journal/JournalContact";
import { JournalIndexing } from "@/components/journal/JournalIndexing";
import { JournalPage } from "@/components/journal/JournalPage";
import { SubmissionWizard } from "@/components/submission/SubmissionWizard";
import ForgotPassword from "@/app/component/ForgotPassword";

export async function ArticlesPageView({ journalId }: { journalId: JournalId }) {
  const journal = getJournal(journalId);
  const staticPapers = [];

  for (let num = 1; num <= journal.paperCount; num++) {
    try {
      const data = await loadPaper(journalId, num);
      staticPapers.push({
        paperNum: num,
        title: data.ArticleDetails?.Title ?? `Paper ${num}`,
        href: paperRoute(journal, num),
      });
    } catch {
      staticPapers.push({
        paperNum: num,
        title: `Paper ${num}`,
        href: paperRoute(journal, num),
      });
    }
  }

  return (
    <JournalPage journalId={journalId}>
      <ArticleList journal={journal} staticPapers={staticPapers} />
    </JournalPage>
  );
}

export function EditorialBoardPageView({ journalId }: { journalId: JournalId }) {
  return (
    <JournalPage journalId={journalId}>
      <EditorialBoard />
    </JournalPage>
  );
}

export function SubmitManuscriptPageView({ journalId }: { journalId: JournalId }) {
  return (
    <JournalPage journalId={journalId}>
      <SubmissionWizard journalId={journalId} />
    </JournalPage>
  );
}

export function ContactPageView({ journalId }: { journalId: JournalId }) {
  return (
    <JournalPage journalId={journalId}>
      <JournalContact />
    </JournalPage>
  );
}

export function IndexingPageView({ journalId }: { journalId: JournalId }) {
  return (
    <JournalPage journalId={journalId}>
      <JournalIndexing />
    </JournalPage>
  );
}

export function SignupPageView({ journalId }: { journalId: JournalId }) {
  const journal = getJournal(journalId);
  return (
    <JournalPage journalId={journalId}>
      <SignupForm loginHref={`${journal.routePrefix}/login`} />
    </JournalPage>
  );
}

export function LoginPageView({ journalId }: { journalId: JournalId }) {
  return (
    <JournalPage journalId={journalId}>
      <JournalLoginPage journalId={journalId} />
    </JournalPage>
  );
}

export function ForgotPasswordPageView({ journalId }: { journalId: JournalId }) {
  return (
    <JournalPage journalId={journalId}>
      <div className="py-8">
        <ForgotPassword />
      </div>
    </JournalPage>
  );
}
