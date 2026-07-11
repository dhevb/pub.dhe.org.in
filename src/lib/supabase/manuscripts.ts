import type { ManuscriptRecord } from "@/lib/api/types";
import type { ManuscriptStatus } from "@/lib/editorial/workflow";
import { getSupabaseServiceClient } from "./client";
import { isSupabaseConfigured } from "./config";

export interface SupabaseManuscript {
  id: string;
  user_id: string;
  journal_id: string;
  title: string;
  status: ManuscriptStatus;
  abstract?: string;
  file_path?: string;
  submitted_at: string;
  updated_at: string;
}

function toManuscriptRecord(row: SupabaseManuscript): ManuscriptRecord {
  return {
    id: row.id,
    title: row.title,
    status: row.status,
    journal: row.journal_id,
    submitted_at: row.submitted_at,
    file_path: row.file_path,
  } as ManuscriptRecord;
}

export async function getManuscriptsFromSupabase(
  userId: string
): Promise<ManuscriptRecord[]> {
  const client = getSupabaseServiceClient();
  if (!client) return [];

  const { data, error } = await client
    .from("manuscripts")
    .select("*")
    .eq("user_id", userId)
    .order("submitted_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data as SupabaseManuscript[]).map(toManuscriptRecord);
}

export async function createManuscriptInSupabase(input: {
  userId: string;
  journalId: string;
  title: string;
  abstract?: string;
  filePath?: string;
}): Promise<SupabaseManuscript> {
  const client = getSupabaseServiceClient();
  if (!client) throw new Error("Supabase not configured");

  const { data, error } = await client
    .from("manuscripts")
    .insert({
      user_id: input.userId,
      journal_id: input.journalId,
      title: input.title,
      abstract: input.abstract,
      file_path: input.filePath,
      status: "submitted",
    })
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  await client.from("status_history").insert({
    manuscript_id: data.id,
    status: "submitted",
    changed_by: input.userId,
    note: "Initial submission",
  });

  return data as SupabaseManuscript;
}

export async function updateManuscriptStatusInSupabase(
  manuscriptId: string,
  status: ManuscriptStatus,
  changedBy: string,
  note?: string
): Promise<void> {
  const client = getSupabaseServiceClient();
  if (!client) throw new Error("Supabase not configured");

  const { error } = await client
    .from("manuscripts")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", manuscriptId);

  if (error) throw new Error(error.message);

  await client.from("status_history").insert({
    manuscript_id: manuscriptId,
    status,
    changed_by: changedBy,
    note,
  });
}

export function supabaseManuscriptsEnabled(): boolean {
  return isSupabaseConfigured();
}

export async function getAllManuscriptsForEditor(): Promise<SupabaseManuscript[]> {
  const client = getSupabaseServiceClient();
  if (!client) return [];
  const { data, error } = await client
    .from("manuscripts")
    .select("*")
    .order("submitted_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as SupabaseManuscript[];
}

export async function getManuscriptStatusInSupabase(
  manuscriptId: string
): Promise<ManuscriptStatus | null> {
  const client = getSupabaseServiceClient();
  if (!client) return null;
  const { data, error } = await client
    .from("manuscripts")
    .select("status")
    .eq("id", manuscriptId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return (data?.status as ManuscriptStatus | undefined) ?? null;
}

export interface EditorialActivityEntry {
  id: string;
  manuscriptId: string;
  title: string;
  status: ManuscriptStatus;
  note?: string;
  at: string;
}

export async function getRecentEditorialActivity(
  limit = 8
): Promise<EditorialActivityEntry[]> {
  const client = getSupabaseServiceClient();
  if (!client) return [];
  const { data, error } = await client
    .from("status_history")
    .select("id, manuscript_id, status, note, created_at, manuscripts(title)")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => {
    const manuscript = row.manuscripts as { title?: string } | null;
    return {
      id: row.id as string,
      manuscriptId: row.manuscript_id as string,
      title: manuscript?.title ?? "Untitled",
      status: row.status as ManuscriptStatus,
      note: (row.note as string | undefined) ?? undefined,
      at: row.created_at as string,
    };
  });
}
