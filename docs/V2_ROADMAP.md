# V2.0 Master Roadmap — Enterprise Academic Publishing Platform

**Status:** Planning (not approved for implementation)  
**Baseline:** v1.0.1 · Production live at https://pub.dhe.org.in  
**Date:** 2026-07-10

---

## Executive Summary

Phases 0–9 and v1.0.1 delivered a **production-ready journal website** with security, SEO, dashboards, file-based CMS, and architecture scaffolds. Approximately **90–95% of core software engineering is complete**.

V2 transforms the platform from a **technically strong journal portal** into a **scholarly publishing infrastructure** connected to the global academic ecosystem.

**Strategic recommendation:** Operate with real editors, reviewers, and authors for 4–8 weeks before activating V2 phases. Collect workflow feedback; prioritize integrations based on evidence.

---

## What V2 Is / Is Not

| V2 Is | V2 Is Not |
|-------|-----------|
| Publishing integrations (DOI, ORCID, OAI-PMH) | UI redesign |
| Editorial lifecycle engine | Rewriting stable modules |
| Email + queue infrastructure | Breaking API contracts |
| Storage adapters | Removing papers or routes |
| Database migration **plan** | Forced database migration |
| Indexing readiness | Claiming live integrations without credentials |
| Observability activation | `npm audit fix --force` |

---

## Current Scaffold Inventory

Existing modules in `src/lib/` (verified in codebase):

| Module | Path | V2 Role |
|--------|------|---------|
| Identifiers | `identifiers/registry.ts` | DOI, ORCID, Crossref, ISSN |
| Publishing | `publishing/metadata.ts` | Crossref, OAI-PMH, Dublin Core exports |
| Editorial | `editorial/workflow.ts` | Status machine, review assignments |
| Email | `email/queue.ts` | Templates + in-memory queue |
| Repository | `repository/types.ts` | Supplementary assets, datasets |
| AI | `ai/registry.ts` | Provider-agnostic research AI modules |
| Search | `search/engine.ts` | Full-text; semantic hook ready |
| Monitoring | `monitoring/` | Logger, audit, Sentry stub |
| Backup | `backup/export.ts` | CMS export manifest |

**CMS today:** `content/*.json` via `src/lib/cms/loader.ts`  
**Manuscripts today:** Render backend API + legacy `axios` flows  
**ISSN:** `2278-1757` in `content/site.json` · **DOI prefix:** empty (awaiting Crossref)

---

## V2 Phases

### Phase 1 — Publishing Ecosystem

**Goal:** DOI, metadata deposit, OAI-PMH, citation exports  
**Doc:** [PUBLISHING_ARCHITECTURE.md](./PUBLISHING_ARCHITECTURE.md) · [INTEGRATIONS.md](./INTEGRATIONS.md)  
**Effort:** 6–10 weeks (with Crossref membership)  
**Activation:** Crossref credentials, DOI prefix in `site.json`

| Deliverable | Status Today | V2 Target |
|-------------|--------------|-----------|
| Crossref DOI registration | Placeholder `registerDoi()` | Adapter + queue |
| ORCID OAuth | Flag only (`orcidEnabled`) | OAuth BFF route |
| OAI-PMH 2.0 | Placeholder format entry | `/oai` route |
| Dublin Core / JATS export | Placeholder | Export adapters |
| Crossmark | Not started | Badge + metadata API |
| Volume/Issue automation | Types only | Editorial + CMS integration |
| BibTeX/RIS | **Active** (`research/citations.ts`) | Enhance + DOI field |

---

### Phase 2 — Editorial Workflow

**Goal:** Full lifecycle from submission to archival  
**Doc:** [EDITORIAL_WORKFLOW.md](./EDITORIAL_WORKFLOW.md)  
**Effort:** 8–12 weeks  
**Depends on:** Backend manuscript API extensions or PostgreSQL (Phase 7)

| Stage | UI Today | Engine Today |
|-------|----------|--------------|
| Submission | Wizard + legacy forms | Render API |
| Screening → Review | Dashboard placeholders | Types + transitions defined |
| Decision → Publication | Partial | `canTransition()` only |

---

### Phase 3 — Email & Notifications

**Goal:** Queue-backed transactional email  
**Doc:** [INTEGRATIONS.md](./INTEGRATIONS.md) (email section)  
**Effort:** 3–5 weeks  
**Activation:** SMTP/Resend/SendGrid + Redis/BullMQ

Templates defined: submission, review invite, decision, acceptance, rejection, publication, password reset, newsletter.

---

### Phase 4 — Object Storage

**Goal:** Vendor-agnostic file storage  
**Doc:** [PUBLISHING_ARCHITECTURE.md](./PUBLISHING_ARCHITECTURE.md) (storage section)  
**Effort:** 2–4 weeks  
**Targets:** S3, Cloudflare R2, Backblaze B2, local dev

---

### Phase 5 — Search Upgrade

**Goal:** Faceted search, analytics, semantic adapter  
**Doc:** [PUBLISHING_ARCHITECTURE.md](./PUBLISHING_ARCHITECTURE.md) (search section)  
**Effort:** 4–6 weeks  
**Today:** `/api/search`, `AdvancedSearchClient`, `search/engine.ts`

---

### Phase 6 — Observability

**Goal:** Production monitoring stack  
**Doc:** [OBSERVABILITY_PLAN.md](./OBSERVABILITY_PLAN.md)  
**Effort:** 2–4 weeks  
**Today:** `/api/health`, `logEvent()`, Sentry stub, audit buffer

---

### Phase 7 — Database (Plan Only)

**Goal:** Migration strategy — **do not migrate in Phase 7 execution without approval**  
**Doc:** [DATABASE_MIGRATION_PLAN.md](./DATABASE_MIGRATION_PLAN.md)  
**Effort:** 4–6 weeks design; 8–16 weeks migration

---

### Phase 8 — Visual CMS (Design)

**Goal:** Admin CMS replacing file-only editing  
**Doc:** [DATABASE_MIGRATION_PLAN.md](./DATABASE_MIGRATION_PLAN.md) (CMS section)  
**Effort:** 12+ weeks  
**Not started**

---

### Phase 9 — Indexing Readiness

**Goal:** Gap analysis for global indexes  
**Doc:** [INDEXING_READINESS.md](./INDEXING_READINESS.md)  
**Effort:** 2–3 weeks documentation + fixes

---

### Phase 10 — AI Readiness

**Goal:** Provider-agnostic interfaces only  
**Doc:** [AI_READINESS.md](./AI_READINESS.md)  
**Effort:** 4–8 weeks (on-prem infra separate)  
**Today:** 9 modules in `ai/registry.ts`, all `placeholder`

---

## Release Mapping (SemVer)

| Version | V2 Phases |
|---------|-----------|
| **v1.0.x** | Maintenance only (current) |
| **v1.1.x** | Phase 6 partial, test/observability DX |
| **v1.2.x** | Next.js 15+ ([NEXTJS_UPGRADE_PLAN.md](./NEXTJS_UPGRADE_PLAN.md)) |
| **v1.3.x** | Phase 1 publishing integrations |
| **v1.4.x** | Phase 2–3 editorial + email |
| **v1.5.x** | Phase 4–5 storage + search |
| **v2.0.x** | Phase 7 database migration + Phase 8 CMS |

Phases may shift based on operational feedback.

---

## Quality Gates (Every Phase)

```bash
npm run lint
npx tsc --noEmit
npm run build
npm run qa
npm run test
npm run qa:smoke   # when routes change
```

Plus: security review · performance check · a11y spot-check · rollback plan · CHANGELOG · ADR entry

---

## Prerequisites Before V2 Kickoff

- [ ] Merge `release/v1.0.1-maintenance` → `main` and verify production
- [ ] 4–8 weeks real editorial operations (recommended)
- [ ] Crossref membership application submitted
- [ ] ORCID developer credentials (sandbox → production)
- [ ] Email provider account (Resend/SendGrid/SES)
- [ ] Object storage bucket (R2 recommended for cost)
- [ ] Redis/Upstash for queues
- [ ] Sentry DSN configured

---

## Related Documents

| Doc | Purpose |
|-----|---------|
| [PUBLISHING_ARCHITECTURE.md](./PUBLISHING_ARCHITECTURE.md) | DOI, metadata, storage, search |
| [EDITORIAL_WORKFLOW.md](./EDITORIAL_WORKFLOW.md) | Lifecycle engine |
| [INTEGRATIONS.md](./INTEGRATIONS.md) | External service adapters |
| [INDEXING_READINESS.md](./INDEXING_READINESS.md) | Scholar, Crossref, Scopus gaps |
| [DATABASE_MIGRATION_PLAN.md](./DATABASE_MIGRATION_PLAN.md) | PostgreSQL/Prisma/Redis plan |
| [OBSERVABILITY_PLAN.md](./OBSERVABILITY_PLAN.md) | Sentry, OTel, metrics |
| [AI_READINESS.md](./AI_READINESS.md) | Research AI interfaces |
| [PROJECT_CHARTER.md](./PROJECT_CHARTER.md) | Governance |
| [ARCHITECTURE_DECISIONS.md](./ARCHITECTURE_DECISIONS.md) | ADR log |
