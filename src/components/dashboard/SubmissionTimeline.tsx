"use client";

const STEPS = [
  { id: "submitted", label: "Submitted", description: "Manuscript received" },
  { id: "screening", label: "Editorial screening", description: "Initial quality check" },
  { id: "review", label: "Peer review", description: "Assigned to reviewers" },
  { id: "decision", label: "Editorial decision", description: "Accept / revise / reject" },
  { id: "published", label: "Published", description: "Live in journal" },
] as const;

interface SubmissionTimelineProps {
  currentStep?: (typeof STEPS)[number]["id"];
}

export function SubmissionTimeline({
  currentStep = "submitted",
}: SubmissionTimelineProps) {
  const currentIndex = STEPS.findIndex((s) => s.id === currentStep);

  return (
    <ol className="space-y-4" aria-label="Submission timeline">
      {STEPS.map((step, i) => {
        const done = i <= currentIndex;
        const active = i === currentIndex;
        return (
          <li key={step.id} className="flex gap-4">
            <div
              className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                done
                  ? "bg-primary text-primary-foreground"
                  : "border bg-muted text-muted-foreground"
              }`}
              aria-current={active ? "step" : undefined}
            >
              {i + 1}
            </div>
            <div>
              <p className={`font-medium ${active ? "text-primary" : ""}`}>
                {step.label}
              </p>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
