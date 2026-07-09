"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import type { PaperData } from "@/types/article";
import { CITATION_STYLES, formatCitation, type CitationStyle } from "@/lib/research";
import { trackEvent } from "@/lib/analytics";

interface CitationToolbarProps {
  data: PaperData;
  journalName: string;
  url: string;
  year?: string;
}

export function CitationToolbar({ data, journalName, url, year }: CitationToolbarProps) {
  const [style, setStyle] = useState<CitationStyle>("apa");
  const [copied, setCopied] = useState(false);

  const citation = formatCitation(style, data, { journalName, url, year });

  async function copyCitation() {
    await navigator.clipboard.writeText(citation);
    setCopied(true);
    trackEvent({ name: "citation_copy", properties: { style } });
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mb-8 rounded-xl border bg-card p-4" aria-label="Citation tools">
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <label htmlFor="citation-style" className="text-sm font-medium">
          Cite this article
        </label>
        <select
          id="citation-style"
          value={style}
          onChange={(e) => setStyle(e.target.value as CitationStyle)}
          className="rounded-lg border bg-background px-3 py-1.5 text-sm"
        >
          {CITATION_STYLES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={copyCitation}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:opacity-90"
        >
          {copied ? (
            <Check className="h-4 w-4" aria-hidden />
          ) : (
            <Copy className="h-4 w-4" aria-hidden />
          )}
          {copied ? "Copied" : "Copy citation"}
        </button>
      </div>
      <pre className="overflow-x-auto whitespace-pre-wrap text-xs text-muted-foreground">
        {citation}
      </pre>
    </div>
  );
}
