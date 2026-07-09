"use client";

import { cn } from "@/lib/utils/cn";

const STEPS = [
  "Sign In",
  "Author Details",
  "Article Details",
  "Upload Manuscript",
] as const;

interface SubmissionProgressProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function SubmissionProgress({
  currentStep,
  onStepClick,
}: SubmissionProgressProps) {
  return (
    <ol className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {STEPS.map((label, index) => {
        const step = index + 1;
        const isActive = currentStep >= step;
        const isCurrent = currentStep === step;

        return (
          <li key={label} className="flex flex-1 items-center gap-2">
            <button
              type="button"
              onClick={() => onStepClick?.(step)}
              disabled={!onStepClick || step > currentStep}
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors",
                isActive
                  ? "bg-primary text-white"
                  : "bg-border text-text-muted",
                isCurrent && "ring-2 ring-primary/30 ring-offset-2"
              )}
              aria-current={isCurrent ? "step" : undefined}
            >
              {step}
            </button>
            <span
              className={cn(
                "text-xs font-medium sm:text-sm",
                isActive ? "text-text" : "text-text-muted"
              )}
            >
              {label}
            </span>
            {index < STEPS.length - 1 && (
              <span className="hidden h-px flex-1 bg-border sm:block" aria-hidden />
            )}
          </li>
        );
      })}
    </ol>
  );
}
