# Integration Status (V2 Execution Tracker)

**Last updated:** 2026-07-10  
**Policy:** Never mark **Live** without verified credentials and successful test transaction.

Design details: [INTEGRATIONS.md](./INTEGRATIONS.md)

---

## Status Key

| Status | Meaning |
|--------|---------|
| **Live** | Production credentials configured; verified end-to-end |
| **Ready for Activation** | Adapter/interface exists; env vars documented; feature-flagged |
| **Scaffold** | Types, placeholders, or stubs in codebase |
| **Planned** | Documented only; no code |
| **Manual** | Handled outside platform |
| **Blocked** | Waiting on external membership / credentials |

---

## Core Platform

| Integration | Status | Config | Verification |
|-------------|--------|--------|--------------|
| Vercel (hosting) | **Live** | `vercel.json`, region `bom1` | Production URL responds |
| Render API (backend) | **Live** | `NEXT_PUBLIC_API_URL` | Auth + manuscript flows |
| File CMS | **Live** | `content/*.json` | CMS loader tests |
| Google Scholar meta | **Live** | `seo/google-scholar.ts` | `verify-scholar.mjs` |

---

## Publishing & Identifiers

| Integration | Status | Code | Credentials | Next action |
|-------------|--------|------|-------------|-------------|
| Crossref DOI deposit | **Scaffold** | `publishing/metadata.ts` | ❌ No prefix | Apply for membership; set `doiPrefix` |
| DataCite | **Planned** | `identifiers/registry.ts` | ❌ | After Crossref decision |
| ORCID OAuth | **Scaffold** | `identifiers/registry.ts` | ❌ | Register sandbox app |
| OAI-PMH 2.0 | **Scaffold** | `publishing/metadata.ts` | N/A | Phase 6 after metadata stable |
| Dublin Core export | **Scaffold** | `publishing/metadata.ts` | N/A | Phase 6 |
| JATS export | **Planned** | — | N/A | Phase 6 |
| ISSN (2278-1757) | **Live** | `content/site.json` | Registered | Maintain portal record |
| OpenAlex sync | **Planned** | `identifiers/registry.ts` | N/A | Metadata export Phase 11 |

---

## Communication

| Integration | Status | Code | Credentials | Next action |
|-------------|--------|------|-------------|-------------|
| SMTP | **Planned** | `email/queue.ts` | ❌ | Phase 2 — choose provider |
| Resend | **Planned** | — | ❌ | Phase 2 adapter |
| SendGrid | **Planned** | — | ❌ | Phase 2 adapter |
| Amazon SES | **Planned** | — | ❌ | Phase 2 adapter |
| Email queue (Redis/BullMQ) | **Planned** | In-memory queue today | ❌ Redis | Phase 2 |

**Templates defined (not wired):** submission, review invite, decision, acceptance, rejection, publication, password reset, newsletter.

---

## Storage

| Provider | Status | Code | Credentials | Next action |
|----------|--------|------|-------------|-------------|
| Local filesystem | **Live** | Static assets, CMS | N/A | Dev default |
| AWS S3 | **Planned** | — | ❌ | Phase 7 adapter |
| Cloudflare R2 | **Planned** | — | ❌ | Phase 7 (recommended) |
| Backblaze B2 | **Planned** | — | ❌ | Phase 7 adapter |

---

## Analytics & Observability

| Integration | Status | Code | Credentials | Next action |
|-------------|--------|------|-------------|-------------|
| Google Analytics 4 | **Ready for Activation** | `analytics/providers.ts` | ❌ `GA_MEASUREMENT_ID` | Set up GSC + GA |
| Microsoft Clarity | **Ready for Activation** | `analytics/providers.ts` | ❌ | Optional |
| Sentry | **Ready for Activation** | `monitoring/sentry.ts` | ❌ DSN | Phase 9 |
| OpenTelemetry | **Planned** | — | ❌ | Phase 9 |
| Prometheus / Grafana | **Planned** | — | ❌ | Phase 9 |
| Audit log buffer | **Scaffold** | `monitoring/audit.ts` | N/A | Extend in Phase 3/9 |

---

## Search

| Capability | Status | Code | Notes |
|------------|--------|------|-------|
| Full-text search API | **Live** | `/api/search`, `search/engine.ts` | File-based index |
| Faceted filters | **Planned** | — | Phase 8 |
| Saved searches | **Planned** | — | Phase 8 |
| Search analytics | **Planned** | — | Phase 8 |
| Semantic search adapter | **Scaffold** | Hook in `search/engine.ts` | No external API |

---

## Indexing Services (External)

| Service | Platform readiness | Application status | Doc |
|---------|-------------------|-------------------|-----|
| Google Scholar | 85% | ⬜ Apply | [INDEXING_READINESS.md](./INDEXING_READINESS.md) |
| Crossref | 15% | ⬜ Membership | Same |
| DOAJ | 50% | ⬜ When OA policy published | Same |
| OpenAlex | 40% | Automatic when metadata exports | Same |
| BASE / CORE | 45% | ⬜ Needs OAI-PMH | Same |
| UGC CARE | 20% | ⬜ Manual application | Same |
| Scopus | 10% | ⬜ 2+ year track record | Same |
| Web of Science | 10% | ⬜ Application | Same |
| Dimensions | 15% | Via Crossref | Same |

---

## AI (Provider-Agnostic)

| Module | Status | Code | External API |
|--------|--------|------|--------------|
| Reviewer recommendation | **Scaffold** | `ai/registry.ts` | ❌ Disabled |
| Citation recommendation | **Scaffold** | `ai/registry.ts` | ❌ Disabled |
| Related papers | **Scaffold** | `ai/registry.ts` | ❌ Disabled |
| Research summaries | **Scaffold** | `ai/registry.ts` | ❌ Disabled |
| Keyword extraction | **Scaffold** | `ai/registry.ts` | ❌ Disabled |
| Trend analysis | **Scaffold** | `ai/registry.ts` | ❌ Disabled |
| Duplicate detection | **Scaffold** | `ai/registry.ts` | ❌ Disabled |

Phase 12: interfaces and feature flags only until on-prem infrastructure exists.

---

## Change Log

| Date | Integration | Change |
|------|-------------|--------|
| 2026-07-10 | All V2 integrations | Initial tracker created; pilot gate active |

---

## Related

- [PHASE_STATUS.md](./PHASE_STATUS.md)
- [V2_EXECUTION_REPORT.md](./V2_EXECUTION_REPORT.md)
