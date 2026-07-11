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
