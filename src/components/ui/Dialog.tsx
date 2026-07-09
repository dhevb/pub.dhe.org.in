"use client";

import { cn } from "@/lib/utils/cn";
import { X } from "lucide-react";
import {
  HTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
} from "react";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  className,
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className={cn(
        "fixed inset-0 z-50 m-auto w-full max-w-lg rounded-xl border border-border bg-surface p-0 shadow-lg backdrop:bg-navy/50",
        className
      )}
      aria-labelledby="dialog-title"
      aria-describedby={description ? "dialog-description" : undefined}
    >
      <div className="flex items-start justify-between border-b border-border px-6 py-4">
        <div>
          <h2 id="dialog-title" className="font-display text-lg font-semibold text-text">
            {title}
          </h2>
          {description && (
            <p id="dialog-description" className="mt-1 text-sm text-text-muted">
              {description}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1 text-text-muted hover:bg-background hover:text-text"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>
      </div>
      <div className="px-6 py-4">{children}</div>
    </dialog>
  );
}

interface DialogActionsProps extends HTMLAttributes<HTMLDivElement> {}

export function DialogActions({ className, children, ...props }: DialogActionsProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-end gap-3 border-t border-border px-6 py-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
