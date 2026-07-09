"use client";

import { useEffect, useState } from "react";
import type { JournalId } from "@/lib/journals/config";
import { getJournal, JOURNAL_LIST } from "@/lib/journals/config";
import { JOURNAL_SUBMIT_URLS } from "@/lib/site-url";
import { JournalLogin } from "@/components/auth/JournalLogin";
import { Card } from "@/components/ui/Card";
import { LEGACY_STORAGE_KEYS } from "@/lib/auth/constants";
import { SubmissionProgress } from "./SubmissionProgress";
import { AuthorDetailsStep } from "./AuthorDetailsStep";
import { ArticleDetailsStep } from "./ArticleDetailsStep";
import { ManuscriptUploadStep } from "./ManuscriptUploadStep";

interface SubmissionWizardProps {
  journalId: JournalId;
}

const SUBMIT_URL_MAP: Record<JournalId, string> = JOURNAL_SUBMIT_URLS;

export function SubmissionWizard({ journalId }: SubmissionWizardProps) {
  const journal = getJournal(journalId);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token =
      localStorage.getItem(LEGACY_STORAGE_KEYS.token) ||
      localStorage.getItem(LEGACY_STORAGE_KEYS.authToken);
    if (token) {
      setIsLoggedIn(true);
      setStep(2);
    }
    setLoading(false);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setStep(2);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-8 text-center">
        <h1 className="heading-section mb-2">Submit Manuscript</h1>
        <p className="text-text-muted">{journal.name}</p>
      </header>

      <div className="mb-8 grid gap-4 lg:grid-cols-[14rem_1fr]">
        <Card className="h-fit p-4">
          <h2 className="mb-3 text-sm font-semibold text-text">Switch Journal</h2>
          <ul className="space-y-2 text-sm">
            {JOURNAL_LIST.map((j) => (
              <li key={j.id}>
                <a
                  href={SUBMIT_URL_MAP[j.id]}
                  className={
                    j.id === journalId
                      ? "font-medium text-primary"
                      : "text-text-muted hover:text-primary"
                  }
                >
                  {j.name}
                </a>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <SubmissionProgress
            currentStep={step}
            onStepClick={(s) => {
              if (s <= step) setStep(s);
            }}
          />

          {loading && <p className="text-center text-text-muted">Loading…</p>}

          {!loading && step === 1 && !isLoggedIn && (
            <JournalLogin onLogin={handleLogin} />
          )}

          {step === 2 && (
            <AuthorDetailsStep
              apiPrefix={journal.apiPrefix}
              onNext={() => setStep(3)}
              onPrevious={() => setStep(1)}
            />
          )}

          {step === 3 && (
            <ArticleDetailsStep
              apiPrefix={journal.apiPrefix}
              onNext={() => setStep(4)}
              onPrevious={() => setStep(2)}
            />
          )}

          {step === 4 && (
            <ManuscriptUploadStep
              apiPrefix={journal.apiPrefix}
              onPrevious={() => setStep(3)}
            />
          )}
        </Card>
      </div>
    </div>
  );
}
