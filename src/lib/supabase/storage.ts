import { getSupabaseServiceClient } from "./client";
import { isSupabaseConfigured } from "./config";

const DEFAULT_BUCKET = process.env.SUPABASE_STORAGE_BUCKET ?? "manuscripts";

export async function uploadToSupabaseStorage(
  path: string,
  file: Buffer | ArrayBuffer,
  contentType: string
): Promise<string | null> {
  if (!isSupabaseConfigured()) return null;

  const client = getSupabaseServiceClient();
  if (!client) return null;

  const { error } = await client.storage
    .from(DEFAULT_BUCKET)
    .upload(path, file, { contentType, upsert: true });

  if (error) throw new Error(error.message);

  const { data } = client.storage.from(DEFAULT_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function deleteFromSupabaseStorage(path: string): Promise<void> {
  const client = getSupabaseServiceClient();
  if (!client) return;
  await client.storage.from(DEFAULT_BUCKET).remove([path]);
}
