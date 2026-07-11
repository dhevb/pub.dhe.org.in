import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAMES } from "@/lib/auth/constants";
import {
  canTransition,
  type ManuscriptStatus,
} from "@/lib/editorial/workflow";
import {
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

  const store = cookies();
  const userId = store.get(AUTH_COOKIE_NAMES.userId)?.value;
  const role = store.get(AUTH_COOKIE_NAMES.role)?.value?.toLowerCase();

  if (!userId || !["editor", "admin"].includes(role ?? "")) {
    return NextResponse.json({ error: "Editor access required" }, { status: 403 });
  }

  try {
    const body = transitionSchema.parse(await request.json());
    const currentStatus = request.nextUrl.searchParams.get(
      "from"
    ) as ManuscriptStatus | null;

    if (currentStatus && !canTransition(currentStatus, body.status)) {
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
  return NextResponse.json({
    enabled: supabaseManuscriptsEnabled(),
    transitions: "POST with manuscriptId, status, optional note",
  });
}
