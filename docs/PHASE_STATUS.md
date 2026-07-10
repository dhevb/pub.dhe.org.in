# V2 Phase Status

**Last updated:** 2026-07-10  
**Current version:** v1.0.3 (docs) · certified **v1.0.2** LEVEL 3  
**Certification:** [PRODUCTION_READINESS_CERTIFICATE.md](./PRODUCTION_READINESS_CERTIFICATE.md) (76/100)  
**Execution mode:** **Operational pilot** (Phase 1) — engineering freeze; see [OPERATIONS_MANUAL.md](./OPERATIONS_MANUAL.md), [GOVERNANCE.md](./GOVERNANCE.md)

Use [V2_EXECUTION_PROMPT.md](./V2_EXECUTION_PROMPT.md) when beginning implementation phases.

---

## Summary

| Phase | Name | Status | Gate |
|-------|------|--------|------|
| **1** | Operational Pilot | 🟡 **In progress** | `PILOT_FEEDBACK_REPORT.md` approved |
| 2 | Email System | ⬜ Blocked | Phase 1 |
| 3 | Editorial Workflow | ⬜ Blocked | Phase 1 |
| 4 | Crossref & DOI | ⬜ Blocked | Phase 1 + Crossref credentials |
| 5 | ORCID | ⬜ Blocked | Phase 1 + ORCID sandbox |
| 6 | OAI-PMH | ⬜ Blocked | Phase 1 |
| 7 | Storage | ⬜ Blocked | Phase 1 |
| 8 | Search | ⬜ Blocked | Phase 1 |
| 9 | Observability | ⬜ Blocked | Phase 1 |
| 10 | Database (design only) | 🟢 Scaffold docs ready | No auto-migration |
| 11 | Indexing | 🟢 Gap analysis ready | Phase 1 informs priorities |
| 12 | AI | 🟢 Interfaces scaffolded | No external APIs |

**Legend:** 🟢 Ready to start when unblocked · 🟡 Active · ⬜ Not started · 🔴 Blocked by dependency

---

## Phase 1 — Operational Pilot

**Objective:** Validate workflows with real users before building integrations.

**Code policy:** No new V2 features. **Engineering freeze** during pilot — allowed: bug fixes, security patches, perf, docs. Deferred: features, redesign, V2. [GOVERNANCE.md](./GOVERNANCE.md) §3, [OPERATIONS_MANUAL.md](./OPERATIONS_MANUAL.md).

| Task | Status | Notes |
|------|--------|-------|
| Production platform audit | ✅ Complete | [FINAL_CERTIFICATION_AUDIT.md](./FINAL_CERTIFICATION_AUDIT.md) — LEVEL 3 (Jul 2026) |
| Independent certification | ✅ Complete | v1.0.2 — [RELEASE_NOTES_v1.0.2.md](./RELEASE_NOTES_v1.0.2.md) |
| Editor workflow observations | ⬜ Pending | Use [PILOT_FEEDBACK_REPORT.md](./PILOT_FEEDBACK_REPORT.md) |
| Author workflow observations | ⬜ Pending | |
| Reviewer workflow observations | ⬜ Pending | |
| Administrator observations | ⬜ Pending | |
| Pilot feedback report finalized | ⬜ Pending | Target: 4–8 weeks of operations |
| Phase 1 sign-off | ⬜ Pending | Editorial board + engineering |

**Exit criteria:**
- Completed `PILOT_FEEDBACK_REPORT.md` with prioritized pain points
- No P0 production incidents open
- Operational prerequisites checklist reviewed ([V2_EXECUTION_PROMPT.md](./V2_EXECUTION_PROMPT.md))

---

## Phases 2–12 (Not Started)

Detailed acceptance criteria live in phase-specific docs. Implementation order is fixed — see execution prompt.

| Phase | Scaffold today | Credentials needed |
|-------|----------------|-------------------|
| 2 Email | `email/queue.ts` (in-memory) | SMTP / Resend / SendGrid / SES |
| 3 Editorial | `editorial/workflow.ts` (types) | Backend API extensions |
| 4 Crossref | `registerDoi()` placeholder | Crossref deposit account + DOI prefix |
| 5 ORCID | Feature flag only | ORCID OAuth client |
| 6 OAI-PMH | Format entry placeholder | Published metadata corpus |
| 7 Storage | None | S3 / R2 / B2 bucket |
| 8 Search | `search/engine.ts` active | Optional: Elasticsearch/Typesense |
| 9 Observability | Sentry stub, audit buffer | Sentry DSN, OTel collector |
| 10 Database | Design doc only | PostgreSQL + Redis (future) |
| 11 Indexing | Scholar meta live | DOI, OAI-PMH for full readiness |
| 12 AI | 9 placeholder modules | On-prem infra (future) |

---

## Verification Log

| Date | lint | tsc | build | qa | test | smoke | Notes |
|------|------|-----|-------|-----|------|-------|-------|
| 2026-07-09 | ✅ | ✅ | ✅ | ✅ | ✅ 58 | ✅ 67/67 | v1.0.1 production baseline |

---

## Related

- [V2_EXECUTION_REPORT.md](./V2_EXECUTION_REPORT.md)
- [INTEGRATION_STATUS.md](./INTEGRATION_STATUS.md)
- [RISK_REGISTER.md](./RISK_REGISTER.md)
