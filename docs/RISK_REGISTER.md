# Risk Register

**Last updated:** 2026-07-10  
**Review cadence:** Weekly during pilot; per-phase during V2 execution

---

## Risk Matrix

| ID | Risk | Likelihood | Impact | Score | Mitigation | Owner |
|----|------|------------|--------|-------|------------|-------|
| R-001 | Building unused V2 features | **High** | **High** | 🔴 | Operational pilot gate (ADR-017); phase-by-phase execution | Product / Engineering |
| R-002 | Crossref membership delay | Medium | High | 🟠 | Apply early; manual DOI process interim | Editorial board |
| R-003 | Legacy component regression | Low | High | 🟡 | Constitution: no rewrites; smoke tests on every release | Engineering |
| R-004 | Render API downtime | Medium | High | 🟠 | Health checks; status page; cached static content | DevOps |
| R-005 | Forced dependency upgrade breaks prod | Low | High | 🟡 | ADR-015: no `--force`; v1.2.x planned Next upgrade | Engineering |
| R-006 | Editorial workflow mismatch with software | Medium | Medium | 🟡 | Pilot feedback before Phase 3 | Editorial |
| R-007 | Premature database migration | Low | **Critical** | 🟠 | Phase 10 design only; explicit approval required | Architecture |
| R-008 | Fake integration claims | Low | High | 🟡 | INTEGRATION_STATUS policy; feature flags | Engineering |
| R-009 | PII in logs / audit buffer | Low | High | 🟡 | Security review each phase; redact in audit.ts | Security |
| R-010 | Indexing rejection (DOAJ, UGC) | Medium | Medium | 🟡 | Publish policies; OAI-PMH Phase 6 | Editorial |
| R-011 | Key person dependency (single maintainer) | Medium | Medium | 🟡 | Documentation complete; CONTRIBUTING guide | Operations |
| R-012 | Uncommitted v1.1 work lost | Low | Medium | 🟢 | Commit v1.1.x release when approved | Engineering |

**Score:** 🔴 Critical · 🟠 High · 🟡 Medium · 🟢 Low

---

## Top Risk Detail: R-001 — Feature Overbuild

**Description:** Implementing email, editorial engine, Crossref, or storage before validating real editorial workflows leads to rework and wasted effort.

**Triggers:**
- Pressure to "match Scopus journals" technically before operational maturity
- Cursor asked to implement multiple V2 phases at once

**Mitigation:**
1. Phase 1 pilot mandatory ([PILOT_FEEDBACK_REPORT.md](./PILOT_FEEDBACK_REPORT.md))
2. One phase at a time ([V2_EXECUTION_PROMPT.md](./V2_EXECUTION_PROMPT.md))
3. Prioritize from pilot evidence, not assumptions
4. Operational prerequisites (DOI, policies) parallel to pilot — not blocked on code

**Residual risk:** Medium until pilot sign-off

---

## Operational Risks (Non-Technical)

| Risk | Mitigation |
|------|------------|
| No peer review policy published | Draft COPE-aligned policy before DOAJ |
| Plagiarism checks manual | Document process; integrate tool in Phase 3+ if pilot requires |
| Author confusion (dual UI paths) | Pilot observations; improve docs not UI rewrites |
| Reviewer fatigue | Email reminders Phase 2; workflow Phase 3 |

---

## Phase-Specific Risks (When Unblocked)

| Phase | Risk | Mitigation |
|-------|------|------------|
| 2 Email | Deliverability / spam | SPF/DKIM; provider with analytics |
| 4 Crossref | Invalid metadata deposit | Validation adapter; sandbox first |
| 5 ORCID | OAuth token storage | BFF pattern; secure cookies |
| 6 OAI-PMH | Harvester load | Rate limit; caching |
| 7 Storage | Vendor lock-in | Adapter interface; config switch |
| 10 Database | Data loss on migration | Rollback scripts; staged migration |

---

## Review Log

| Date | Reviewer | Changes |
|------|----------|---------|
| 2026-07-10 | Architecture | Initial register; R-001 flagged critical |

---

## Related

- [V2_EXECUTION_REPORT.md](./V2_EXECUTION_REPORT.md)
- [TECHNICAL_DEBT.md](./TECHNICAL_DEBT.md)
- [PROJECT_CHARTER.md](./PROJECT_CHARTER.md)
