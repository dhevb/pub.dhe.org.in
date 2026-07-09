"use client";

import dynamic from "next/dynamic";

const Editorial = dynamic(
  () => import("@/app/component/vbe_Component/Editorial"),
  {
    loading: () => (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-lg bg-border" />
        ))}
      </div>
    ),
    ssr: false,
  }
);

/**
 * Unified editorial board — shared across all journal editions.
 * Data preserved from the original VBE editorial component.
 */
export function EditorialBoard() {
  return (
    <div className="editorial-board overflow-x-auto">
      <header className="mb-8 text-center">
        <h1 className="heading-section">Editorial Board</h1>
        <p className="mt-2 text-text-muted">
          Distinguished scholars guiding Viksit Bharat Journal
        </p>
      </header>
      <Editorial />
    </div>
  );
}
