import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  NEXT_PUBLIC_API_URL: z.string().url().optional(),
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
  NEXT_PUBLIC_GSC_VERIFICATION: z.string().optional(),
  NEXT_PUBLIC_CLARITY_ID: z.string().optional(),
  NEXT_PUBLIC_PLAUSIBLE_DOMAIN: z.string().optional(),
  NEXT_PUBLIC_MATOMO_URL: z.string().url().optional(),
  SENTRY_DSN: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  SUPABASE_STORAGE_BUCKET: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM_EMAIL: z.string().optional(),
  CROSSREF_API_KEY: z.string().optional(),
  CROSSREF_DOI_PREFIX: z.string().optional(),
  ORCID_CLIENT_ID: z.string().optional(),
  ORCID_CLIENT_SECRET: z.string().optional(),
  PLAGIARISM_API_KEY: z.string().optional(),
  PLAGIARISM_PROVIDER: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

let cached: Env | null = null;

/** Validated environment — safe defaults in development. */
export function getEnv(): Env {
  if (cached) return cached;
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    if (process.env.NODE_ENV === "production") {
      console.error("[env] Validation warnings:", parsed.error.flatten());
    }
    cached = envSchema.parse({});
    return cached;
  }
  cached = parsed.data;
  return cached;
}

export function requireEnv(key: keyof Env): string | undefined {
  return getEnv()[key];
}
