"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  EDITORIAL_TRANSITIONS,
  type ManuscriptStatus,
} from "@/lib/editorial";
import { secureFetch } from "@/lib/security/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface EditorManuscript {
  id: string;
  title: string;
  status: ManuscriptStatus;
  journal_id: string;
  submitted_at: string;
  file_path?: string;
}

interface EditorStats {
  pending: number;
  under_review: number;
  revision_requested: number;
  accepted: number;
  rejected: number;
  published: number;
  total: number;
}

interface ActivityEntry {
  id: string;
  manuscriptId: string;
  title: string;
  status: ManuscriptStatus;
  note?: string;
  at: string;
}

interface EditorialResponse {
  enabled: boolean;
  authenticated?: boolean;
  manuscripts?: EditorManuscript[];
  stats?: EditorStats | null;
  activity?: ActivityEntry[];
  error?: string;
}

const STATUS_FLOW: ManuscriptStatus[] = [
  "submitted",
  "screening",
  "under_review",
  "revision_requested",
  "accepted",
  "scheduled",
  "published",
];

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

function statusLabel(status: ManuscriptStatus) {
  return status.replace(/_/g, " ");
}

export function EditorialWorkflowPanel() {
  const [data, setData] = useState<EditorialResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/editorial", { credentials: "include" });
      const body = (await res.json()) as EditorialResponse;
      if (!res.ok) {
        throw new Error(body.error ?? "Failed to load editorial queue");
      }
      setData(body);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load editorial queue");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function transition(
    manuscriptId: string,
    from: ManuscriptStatus,
    to: ManuscriptStatus
  ) {
    setBusyId(manuscriptId);
    setError(null);
    try {
      const res = await secureFetch(
        `/api/editorial?from=${encodeURIComponent(from)}`,
        {
          method: "POST",
          body: JSON.stringify({ manuscriptId, status: to }),
        }
      );
      const body = await res.json();
      if (!res.ok) {
        throw new Error(body.error ?? "Transition failed");
      }
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Transition failed");
    } finally {
      setBusyId(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        Loading editorial queue…
      </div>
    );
  }

  if (!data?.enabled) {
    return (
      <Card>
        <CardContent className="pt-6 text-sm text-muted-foreground">
          Editorial workflow requires Supabase. It is not enabled in this environment.
        </CardContent>
      </Card>
    );
  }

  if (data.authenticated === false) {
    return (
      <Card>
        <CardContent className="pt-6 text-sm text-muted-foreground">
          Sign in with an editor account to view the review queue and manage transitions.
        </CardContent>
      </Card>
    );
  }

  const stats = data.stats;
  const manuscripts = data.manuscripts ?? [];
  const activity = data.activity ?? [];

  return (
    <div className="space-y-6">
      {error && (
        <Card className="border-destructive/30">
          <CardContent className="pt-6 text-sm text-destructive">{error}</CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { label: "Pending submissions", value: stats?.pending ?? 0 },
          { label: "Under review", value: stats?.under_review ?? 0 },
          { label: "Revision requested", value: stats?.revision_requested ?? 0 },
          { label: "Accepted", value: stats?.accepted ?? 0 },
          { label: "Rejected", value: stats?.rejected ?? 0 },
          { label: "Published", value: stats?.published ?? 0 },
        ].map((item) => (
          <Card key={item.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {item.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent editorial activity</CardTitle>
        </CardHeader>
        <CardContent>
          {activity.length === 0 ? (
            <p className="text-sm text-muted-foreground">No workflow activity yet.</p>
          ) : (
            <ul className="space-y-2 text-sm text-muted-foreground">
              {activity.map((entry) => (
                <li key={entry.id} className="border-l-2 border-primary/30 pl-3">
                  <span className="font-medium text-foreground">{entry.title}</span>
                  {" — "}
                  {statusLabel(entry.status)} ({formatDate(entry.at)})
                  {entry.note ? ` — ${entry.note}` : ""}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Review queue</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          {manuscripts.length === 0 ? (
            <p className="text-muted-foreground">
              No manuscripts in Supabase yet. New submissions will appear here.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th scope="col" className="py-2 pr-4 font-medium">Manuscript</th>
                    <th scope="col" className="py-2 pr-4 font-medium">Journal</th>
                    <th scope="col" className="py-2 pr-4 font-medium">Status</th>
                    <th scope="col" className="py-2 pr-4 font-medium">Submitted</th>
                    <th scope="col" className="py-2 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {manuscripts.map((m) => {
                    const next = EDITORIAL_TRANSITIONS[m.status] ?? [];
                    return (
                      <tr key={m.id} className="border-b border-border/50 align-top">
                        <td className="py-3 pr-4">
                          <p className="font-medium">{m.title || "Untitled"}</p>
                          {m.file_path && (
                            <a
                              href={m.file_path}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-primary hover:underline"
                            >
                              View file
                            </a>
                          )}
                        </td>
                        <td className="py-3 pr-4 uppercase">{m.journal_id}</td>
                        <td className="py-3 pr-4">
                          <Badge>{statusLabel(m.status)}</Badge>
                        </td>
                        <td className="py-3 pr-4">{formatDate(m.submitted_at)}</td>
                        <td className="py-3">
                          <div className="flex flex-wrap gap-2">
                            {next.length === 0 ? (
                              <span className="text-muted-foreground">—</span>
                            ) : (
                              next.map((to) => (
                                <Button
                                  key={to}
                                  type="button"
                                  size="sm"
                                  variant="outline"
                                  disabled={busyId === m.id}
                                  onClick={() => transition(m.id, m.status, to)}
                                >
                                  {busyId === m.id ? "…" : statusLabel(to)}
                                </Button>
                              ))
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Decision timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="flex flex-wrap gap-2" aria-label="Editorial status flow">
            {STATUS_FLOW.map((s, i) => (
              <li key={s} className="flex items-center gap-2 text-xs">
                <span className="rounded-full bg-muted px-2 py-1 capitalize">
                  {statusLabel(s)}
                </span>
                {i < STATUS_FLOW.length - 1 && (
                  <span aria-hidden className="text-muted-foreground">→</span>
                )}
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
