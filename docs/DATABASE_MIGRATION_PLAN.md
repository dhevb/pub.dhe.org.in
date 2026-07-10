# Database Migration Plan

**Version:** 2.0 (design only — **no migration executed**)  
**Baseline:** v1.0.1  
**Status:** Proposed

---

## Current Data Architecture

| Data type | Storage | Access |
|-----------|---------|--------|
| Site content | `content/*.json` | `cms/loader.ts` |
| Published papers | `src/app/*.rase/output/Paper*.json` | `journals/papers.ts` |
| Manuscripts | Render PostgreSQL (backend) | `api/manuscripts.ts` BFF |
| Users / auth | Render backend | `/api/auth/*` BFF |
| Search index | Built at runtime from papers | `search-index.ts` |
| Sessions | httpOnly cookies | `auth/constants.ts` |
| Rate limits | In-memory | `security/rate-limit.ts` |
| Email queue | In-memory | `email/queue.ts` |
| Audit logs | In-memory | `monitoring/sentry.ts` |

**Principle:** V2 migration must not break file-based papers or CMS during transition.

---

## Target Architecture

```
┌─────────────────────────────────────────────────────────┐
│  Next.js (Vercel)                                        │
└────────────┬───────────────────────────────┬────────────┘
             │                               │
             ▼                               ▼
┌────────────────────────┐      ┌────────────────────────┐
│  PostgreSQL (Neon/     │      │  Redis (Upstash)        │
│  Supabase/Railway)     │      │  Queues, cache, limits  │
└────────────────────────┘      └────────────────────────┘
             │
             ▼
┌────────────────────────┐
│  Object Storage (R2)   │
│  PDFs, assets, datasets│
└────────────────────────┘
```

---

## Proposed ER Model (high level)

```
┌──────────┐     ┌──────────────┐     ┌─────────────┐
│  User    │────<│ Manuscript   │>────│ Review      │
└──────────┘     └──────────────┘     └─────────────┘
     │                   │                    │
     │                   ▼                    │
     │            ┌──────────────┐            │
     │            │ StatusHistory│            │
     │            └──────────────┘            │
     │                   │                    │
     ▼                   ▼                    ▼
┌──────────┐     ┌──────────────┐     ┌─────────────┐
│ ORCID    │     │ Publication  │     │ ReviewReport│
│ link     │     │ Schedule     │     └─────────────┘
└──────────┘     └──────────────┘
                        │
                        ▼
                 ┌──────────────┐
                 │ DOI Record   │
                 └──────────────┘

┌──────────┐     ┌──────────────┐
│ Volume   │────<│ Issue        │
└──────────┘     └──────────────┘
                        │
                        ▼
                 ┌──────────────┐
                 │ Article      │ (links to paper JSON or DB content)
                 └──────────────┘

┌──────────┐     ┌──────────────┐
│ CMS Page │────<│ CMS Revision │
└──────────┘     └──────────────┘
```

---

## Prisma Schema (sketch — not in repo)

```prisma
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  orcid         String?
  role          Role
  manuscripts   Manuscript[]
  reviews       ReviewAssignment[]
}

model Manuscript {
  id            String   @id @default(cuid())
  title         String
  status        ManuscriptStatus
  submittedAt   DateTime
  authorId      String
  author        User     @relation(fields: [authorId], references: [id])
  history       StatusHistoryEntry[]
  schedule      PublicationSchedule?
  doi           DoiRecord?
}

// ... additional models
```

**Location when approved:** `prisma/schema.prisma` (new directory)

---

## Migration Strategy (phased)

### Phase A — Read replica / sync (no cutover)

1. Deploy PostgreSQL (Neon recommended for Vercel)
2. Prisma schema mirrors Render backend entities
3. Nightly sync job: Render → PostgreSQL (read-only mirror)
4. Validate row counts vs Render API

### Phase B — Dual write

1. BFF routes write to both Render and PostgreSQL
2. Compare responses in shadow mode
3. Feature flag `DATABASE_PRIMARY=render|postgres`

### Phase C — Cutover

1. Switch `DATABASE_PRIMARY=postgres`
2. Render API becomes legacy read-only
3. 30-day rollback window

### Phase D — Decommission Render DB

1. Archive export
2. Remove dual-write code
3. ADR supersession entry

**Estimated total:** 8–16 weeks after Phase A approval

---

## What Stays File-Based

| Asset | Reason |
|-------|--------|
| 20 Paper JSON files | Immutable contract; Scholar URLs |
| `content/*.json` (interim) | Until Visual CMS (Phase 8) |
| Static SEO assets | sitemap, robots |

New manuscripts and editorial workflow → PostgreSQL.

---

## Redis Use Cases

| Feature | Key pattern |
|---------|-------------|
| Rate limiting | `rl:{ip}:{route}` |
| Email queue | BullMQ `email` queue |
| DOI deposit jobs | BullMQ `publishing` queue |
| Search index cache | `search:index:v1` |
| Session store (optional) | `session:{id}` |

---

## Visual CMS (Phase 8 — design)

| Feature | Storage |
|---------|---------|
| Rich editor content | PostgreSQL `cms_pages` |
| Media files | R2 + `media_assets` table |
| Revisions | `cms_revisions` |
| Role permissions | `cms_roles` |
| Preview tokens | Redis TTL keys |

**Not replacing** file CMS until feature parity + migration tool for existing JSON.

---

## Rollback Plan

| Stage | Rollback |
|-------|----------|
| Phase A (mirror only) | Drop PostgreSQL — no impact |
| Phase B (dual write) | Set `DATABASE_PRIMARY=render` |
| Phase C (cutover) | Revert flag + restore Render from archive |
| CMS migration | Keep `content/*.json` in git as backup |

---

## Cost Estimate (monthly)

| Service | Tier | Est. cost |
|---------|------|-----------|
| Neon PostgreSQL | Free → Pro | $0–25 |
| Upstash Redis | Pay-as-go | $0–10 |
| Cloudflare R2 | Storage | $1–5 |
| **Total** | | **$1–40/mo** at launch scale |

---

## Related

- [V2_ROADMAP.md](./V2_ROADMAP.md) Phase 7–8
- [EDITORIAL_WORKFLOW.md](./EDITORIAL_WORKFLOW.md)
- [DATABASE.md](./DATABASE.md) — current file-based model
- [INTEGRATIONS.md](./INTEGRATIONS.md)
