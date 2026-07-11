/**
 * One-time Supabase setup: run migration SQL + ensure storage bucket exists.
 * Usage: node scripts/setup-supabase.mjs
 */
import { readFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";
import pg from "pg";

function loadEnv(path = ".env.local") {
  const env = {};
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    env[key] = val;
  }
  return env;
}

async function runMigration(connectionString) {
  const sql = readFileSync(
    "supabase/migrations/001_initial_schema.sql",
    "utf8"
  );
  const client = new pg.Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    await client.query(sql);
    console.log("Migration applied successfully.");
  } finally {
    await client.end();
  }
}

async function ensureStorageBucket(url, serviceKey, bucket) {
  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: buckets, error: listError } =
    await supabase.storage.listBuckets();
  if (listError) throw new Error(`List buckets: ${listError.message}`);

  const exists = buckets?.some((b) => b.name === bucket);
  if (exists) {
    console.log(`Storage bucket "${bucket}" already exists.`);
    return;
  }

  const { error: createError } = await supabase.storage.createBucket(bucket, {
    public: false,
    fileSizeLimit: 52428800,
  });
  if (createError) throw new Error(`Create bucket: ${createError.message}`);
  console.log(`Storage bucket "${bucket}" created.`);
}

async function verifyTables(connectionString) {
  const client = new pg.Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    const { rows } = await client.query(`
      select table_name from information_schema.tables
      where table_schema = 'public'
        and table_name in ('profiles','manuscripts','article_metrics')
      order by table_name
    `);
    console.log("Verified tables:", rows.map((r) => r.table_name).join(", "));
  } finally {
    await client.end();
  }
}

const env = loadEnv();
const url = env.NEXT_PUBLIC_SUPABASE_URL || env.SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;
const bucket = env.SUPABASE_STORAGE_BUCKET || "manuscripts";
const postgresUrl =
  env.POSTGRES_URL_NON_POOLING || env.POSTGRES_URL || env.POSTGRES_PRISMA_URL;

if (!url) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
if (!serviceKey) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
if (!postgresUrl) throw new Error("Missing POSTGRES_URL");

console.log("Supabase URL:", url);
console.log("Postgres URL: set");
console.log("Bucket:", bucket);

await runMigration(postgresUrl);
await verifyTables(postgresUrl);
await ensureStorageBucket(url, serviceKey, bucket);

console.log("Supabase setup complete.");
