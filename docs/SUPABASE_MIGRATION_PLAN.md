# Supabase Migration Plan (v1.1 Implementation)

**Status:** Scaffold implemented — activate with environment variables.

## Setup

1. Create Supabase project at supabase.com
2. Run `supabase/migrations/001_initial_schema.sql` in SQL editor
3. Create storage bucket `manuscripts` (public or signed URLs)
4. Add env vars to Vercel (see `.env.example`)

## Hybrid mode

- **Without Supabase:** Render backend + in-memory metrics/email queue (current production)
- **With Supabase:** Manuscripts, metrics, editorial workflow, persistent audit logs

## API routes added

| Route | Purpose |
|-------|---------|
| `/api/oai` | OAI-PMH 2.0 harvest |
| `/api/metrics` | Article views/downloads |
| `/api/citations` | Citation export (APA, MLA, BibTeX, RIS) |
| `/api/editorial` | Workflow transitions (Supabase required) |
| `/api/auth/orcid` | ORCID OAuth start |
| `/api/auth/orcid/callback` | ORCID OAuth callback |

## Next steps after credentials

1. Migrate Render users to Supabase Auth
2. Enable RLS policies for production roles
3. ~~Wire editor dashboard to `/api/editorial`~~ ✅ Done (v1.1.1)
4. Upload new manuscripts to Supabase Storage
