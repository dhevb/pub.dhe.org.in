import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAMES } from "@/lib/auth/constants";
import {
  canTransition,
  type ManuscriptStatus,
} from "@/lib/editorial/workflow";
import {
  getAllManuscriptsForEditor,
  getManuscriptStatusInSupabase,
  getRecentEditorialActivity,
  supabaseManuscriptsEnabled,
  updateManuscriptStatusInSupabase,
} from "@/lib/supabase/manuscripts";
import { validateCsrfToken, CSRF_COOKIE_NAME } from "@/lib/security/csrf";

const transitionSchema = z.object({
  manuscriptId: z.string().uuid(),
  status: z.enum([
    "submitted",
    "screening",
    "under_review",
    "revision_requested",
    "accepted",
    "rejected",
    "scheduled",
    "published",
    "withdrawn",
  ]),
  note: z.string().max(2000).optional(),
});

function requireEditorRole() {
  const store = cookies();
  const userId = store.get(AUTH_COOKIE_NAMES.userId)?.value;
  const role = store.get(AUTH_COOKIE_NAMES.role)?.value?.toLowerCase();
  if (!userId || !["editor", "admin"].includes(role ?? "")) {
    return null;
  }
  return userId;
}

function buildStats(manuscripts: { status: ManuscriptStatus }[]) {
  const counts: Record<ManuscriptStatus, number> = {
    submitted: 0,
    screening: 0,
    under_review: 0,
    revision_requested: 0,
    accepted: 0,
    rejected: 0,
    scheduled: 0,
    published: 0,
    withdrawn: 0,
  };

  for (const m of manuscripts) {
    counts[m.status] += 1;
  }

  return {
    pending: counts.submitted + counts.screening,
    under_review: counts.under_review,
    revision_requested: counts.revision_requested,
    accepted: counts.accepted,
    rejected: counts.rejected,
    published: counts.published,
    total: manuscripts.length,
  };
}

export async function POST(request: NextRequest) {
  if (!supabaseManuscriptsEnabled()) {
    return NextResponse.json(
      { error: "Editorial workflow requires Supabase configuration" },
      { status: 503 }
    );
  }

  const csrfHeader = request.headers.get("x-csrf-token");
  const csrfCookie = cookies().get(CSRF_COOKIE_NAME)?.value;
  if (!validateCsrfToken(csrfCookie, csrfHeader)) {
    return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
  }

  const userId = requireEditorRole();
  if (!userId) {
    return NextResponse.json({ error: "Editor access required" }, { status: 403 });
  }

  try {
    const body = transitionSchema.parse(await request.json());
    const currentStatus = await getManuscriptStatusInSupabase(body.manuscriptId);

    if (!currentStatus) {
      return NextResponse.json({ error: "Manuscript not found" }, { status: 404 });
    }

    if (!canTransition(currentStatus, body.status)) {
      return NextResponse.json(
        { error: `Invalid transition from ${currentStatus} to ${body.status}` },
        { status: 400 }
      );
    }

    await updateManuscriptStatusInSupabase(
      body.manuscriptId,
      body.status,
      userId,
      body.note
    );

    return NextResponse.json({ success: true, status: body.status });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Transition failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function GET() {
  const enabled = supabaseManuscriptsEnabled();
  if (!enabled) {
    return NextResponse.json({
      enabled: false,
      manuscripts: [],
      stats: null,
      activity: [],
    });
  }

  const userId = requireEditorRole();
  if (!userId) {
    return NextResponse.json({
      enabled: true,
      authenticated: false,
      manuscripts: [],
      stats: null,
      activity: [],
    });
  }

  try {
    const [manuscripts, activity] = await Promise.all([
      getAllManuscriptsForEditor(),
      getRecentEditorialActivity(),
    ]);

    return NextResponse.json({
      enabled: true,
      authenticated: true,
      manuscripts,
      stats: buildStats(manuscripts),
      activity,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to load queue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
