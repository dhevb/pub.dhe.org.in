import { readFileSync } from "fs";
import { join } from "path";
import { createClient } from "@supabase/supabase-js";
import pg from "pg";
import { isSupabaseConfigured, getSupabaseUrl } from "./config";

export interface SupabaseSetupStatus {
  configured: boolean;
  tablesReady: boolean;
  bucketReady: boolean;
  tables: string[];
  bucket: string;
}

function getPostgresUrl(): string | null {
  return (
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    null
  );
}

function getBucketName(): string {
  return process.env.SUPABASE_STORAGE_BUCKET ?? "manuscripts";
}

function createPgClient(connectionString: string): pg.Client {
  return new pg.Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });
}

function readMigrationSql(): string {
  return readFileSync(
    join(process.cwd(), "supabase/migrations/001_initial_schema.sql"),
    "utf8"
  );
}

async function withPg<T>(
  connectionString: string,
  fn: (client: pg.Client) => Promise<T>
): Promise<T> {
  const prevTls = process.env.NODE_TLS_REJECT_UNAUTHORIZED;
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const client = createPgClient(connectionString);
  try {
    await client.connect();
    return await fn(client);
  } finally {
    await client.end();
    if (prevTls === undefined) delete process.env.NODE_TLS_REJECT_UNAUTHORIZED;
    else process.env.NODE_TLS_REJECT_UNAUTHORIZED = prevTls;
  }
}

async function queryTables(connectionString: string): Promise<string[]> {
  return withPg(connectionString, async (client) => {
    const { rows } = await client.query(`
      select table_name from information_schema.tables
      where table_schema = 'public'
        and table_name in (
          'profiles','manuscripts','status_history','review_assignments',
          'editorial_notes','article_metrics','audit_logs','doi_registrations'
        )
      order by table_name
    `);
    return rows.map((r: { table_name: string }) => r.table_name);
  });
}

export async function getSupabaseSetupStatus(): Promise<SupabaseSetupStatus> {
  const bucket = getBucketName();
  if (!isSupabaseConfigured()) {
    return {
      configured: false,
      tablesReady: false,
      bucketReady: false,
      tables: [],
      bucket,
    };
  }

  const postgresUrl = getPostgresUrl();
  let tables: string[] = [];
  if (postgresUrl) {
    try {
      tables = await queryTables(postgresUrl);
    } catch {
      tables = [];
    }
  }

  let bucketReady = false;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (serviceKey) {
    const supabase = createClient(getSupabaseUrl(), serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data } = await supabase.storage.listBuckets();
    bucketReady = Boolean(data?.some((b) => b.name === bucket));
  }

  return {
    configured: true,
    tablesReady: tables.includes("manuscripts") && tables.includes("profiles"),
    bucketReady,
    tables,
    bucket,
  };
}

export async function runSupabaseSetup(): Promise<SupabaseSetupStatus> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured");
  }

  const postgresUrl = getPostgresUrl();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!postgresUrl) throw new Error("POSTGRES_URL is not configured");
  if (!serviceKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured");

  const sql = readMigrationSql();
  await withPg(postgresUrl, async (client) => {
    await client.query(sql);
  });

  const bucket = getBucketName();
  const supabase = createClient(getSupabaseUrl(), serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: buckets } = await supabase.storage.listBuckets();
  if (!buckets?.some((b) => b.name === bucket)) {
    const { error } = await supabase.storage.createBucket(bucket, {
      public: false,
      fileSizeLimit: 52428800,
    });
    if (error) throw new Error(error.message);
  }

  return getSupabaseSetupStatus();
}
