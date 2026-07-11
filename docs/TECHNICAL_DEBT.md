# Technical Debt Register

**Last updated:** 2026-07-10  
**Baseline:** v1.0.1  
**Policy:** Document debt; do not pay down during pilot unless P0/P1 impact

---

## Summary

| Category | Items | Priority | V2 phase |
|----------|-------|----------|----------|
| Legacy duplication | 4 | P3 — preserve | Never rewrite without approval |
| Framework advisories | 1 | P2 | v1.2.x Next.js upgrade |
| Uncommitted v1.1 work | 1 | P1 | Commit as v1.1.x release |
| Integration scaffolds | 8 | P2 | Phases 2–12 |
| Test gaps | 2 | P2 | v1.1.x / V2 |
| npm audit (non-force) | 1 vuln (Next 14) | P2 | v1.2.x Next.js upgrade |

Overall maintainability score: **78/100** ([V1_1_ENGINEERING_REPORT.md](./V1_1_ENGINEERING_REPORT.md))

---

## P1 — Address Before or During Pilot

| ID | Debt | Location | Impact | Remediation |
|----|------|----------|--------|-------------|
| TD-001 | v1.1 engineering uncommitted | `src/lib/errors/`, tests, monitoring | Drift from production | Commit v1.1.x release branch |
| TD-002 | No transactional email | `email/queue.ts` in-memory only | Editorial comms manual | Phase 2 (post-pilot) |
| TD-003 | Empty DOI prefix | `content/site.json` | Scholar `citation_doi` gap | Crossref membership (ops) |

---

## P2 — Planned Remediation

| ID | Debt | Location | Remediation | Target |
|----|------|----------|-------------|--------|
| TD-010 | Next.js 14 framework advisories | `package.json` | Controlled upgrade to 15.x | v1.2.x |
| TD-011 | axios in legacy components | `src/app/component/*_Component/` | Migrate to fetch incrementally | V2+ |
| TD-012 | 6 login form variants | Legacy components | Consolidate after pilot confirms UX | Deferred |
| TD-013 | No E2E Playwright suite | — | Add critical path E2E | v1.1.x |
| TD-014 | Rate limit store in-memory | `src/lib/security/` | Redis/Upstash | Phase 2/9 |
| TD-015 | Audit log not persisted | `monitoring/audit.ts` | PostgreSQL or log drain | Phase 3/9 |
| TD-016 | npm audit — 1 remaining (Next.js 14 framework) | dependencies | Safe patches applied; Next 15+ in v1.2.x | v1.0.x maintenance |

---

## P3 — Accepted / Deferred

| ID | Debt | Rationale |
|----|------|-----------|
| TD-020 | 4× journal component trees (~168 files) | Legacy route compatibility — constitution |
| TD-021 | Large legacy files (Filter.tsx 767 lines) | Superseded by modern portal for new users |
| TD-022 | Dual CMS + Render API manuscript flow | Works in production; migrate in Phase 10 design |
| TD-023 | No visual CMS admin | Phase 8+ (post database plan) |
| TD-024 | AI modules all placeholders | By design until on-prem infra |

---

## Code Quality Metrics

| Metric | Value | Target |
|--------|-------|--------|
| Modern files >300 lines | 1 (`JournalHomepage.tsx`) | ≤3 |
| Legacy files >300 lines | 10+ | No action (preserve) |
| `src/lib/` test line coverage | ~89% | ≥85% |
| API routes | 11 | Documented in API_REFERENCE |

---

## Paydown Rules

1. **During pilot:** Bug fixes and security patches only (v1.0.x)
2. **No legacy rewrites** without ADR and editorial sign-off
3. **No `npm audit fix --force`** (ADR-015)
4. **Pilot feedback** may reprioritize P2 items

---

## Related

- [V1_1_ENGINEERING_REPORT.md](./V1_1_ENGINEERING_REPORT.md)
- [DEPENDENCY_AUDIT.md](./DEPENDENCY_AUDIT.md)
- [NEXTJS_UPGRADE_PLAN.md](./NEXTJS_UPGRADE_PLAN.md)
- [RISK_REGISTER.md](./RISK_REGISTER.md)
