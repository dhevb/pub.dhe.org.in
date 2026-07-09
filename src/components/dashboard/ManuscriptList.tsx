"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Loader2, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { LEGACY_STORAGE_KEYS } from "@/lib/auth/constants";
import type { ManuscriptRecord } from "@/lib/api/types";
import { JOURNAL_LIST } from "@/lib/journals/config";

function formatDate(value?: string) {
  if (!value) return "—";
  const d = new Date(value);
  return Number.isNaN(d.getTime())
    ? value
    : d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
}

export function ManuscriptList() {
  const [manuscripts, setManuscripts] = useState<ManuscriptRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const legacyUserId =
          typeof window !== "undefined"
            ? localStorage.getItem(LEGACY_STORAGE_KEYS.userId)
            : null;

        const url = legacyUserId
          ? `/api/manuscripts?userId=${encodeURIComponent(legacyUserId)}`
          : "/api/manuscripts";

        const res = await fetch(url, { credentials: "include" });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error ?? "Failed to load manuscripts");
        }

        if (!cancelled) {
          setManuscripts(data.manuscripts ?? []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load manuscripts"
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        Loading your submissions…
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive/30">
        <CardContent className="pt-6">
          <p className="text-destructive">{error}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>{" "}
            to view manuscript history, or submit a new paper below.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (manuscripts.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <FileText className="h-10 w-10 text-muted-foreground" aria-hidden />
          <div>
            <p className="font-medium">No submissions yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Start your first manuscript submission with any journal.
            </p>
          </div>
          <Link
            href="/vbe.rase/SubmitManuscript"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            <Plus className="h-4 w-4" aria-hidden />
            Submit manuscript
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {manuscripts.map((m) => (
        <Card key={String(m.id)}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{m.title || "Untitled"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-muted-foreground">
              <span>Submitted: {formatDate(m.submission_date)}</span>
              {m.category && <span>Category: {m.category}</span>}
              {m.status && <span>Status: {m.status}</span>}
            </div>
            {m.abstract && (
              <p className="line-clamp-2 text-foreground/80">{m.abstract}</p>
            )}
            {m.file_path && (
              <a
                href={m.file_path}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-primary hover:underline"
              >
                View uploaded file
              </a>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function AuthorQuickLinks() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {JOURNAL_LIST.map((j) => (
        <Link
          key={j.id}
          href={`/${j.apiPrefix}.rase/SubmitManuscript`}
          className="rounded-lg border bg-card p-4 transition-shadow hover:shadow-md"
        >
          <p className="font-medium">{j.apiPrefix.toUpperCase()}</p>
          <p className="mt-1 text-xs text-muted-foreground">Submit to {j.name}</p>
        </Link>
      ))}
    </div>
  );
}
