# Open Items — Post-Certification Audit

**Audit date:** 2026-07-10  
**Classification:** LEVEL 3 — Production Ready  
**Tracking:** Resolve before LEVEL 4 certification

Priority: **P0** Critical · **P1** High · **P2** Medium · **P3** Low

---

## P0 — Critical (Before claiming LEVEL 4)

| ID | Item | Status | Owner | Evidence |
|----|------|--------|-------|----------|
| OI-001 | Register Crossref or DataCite DOI prefix | NOT STARTED | Editorial board | `content/site.json` `doiPrefix: ""` |
| OI-002 | Complete 4–8 week operational pilot | IN PROGRESS | Operations | `PILOT_FEEDBACK_REPORT.md` template only |
| OI-003 | Align production deploy with v1.0.1+ | OPEN | DevOps | `/api/health` returns `0c7f48d`, not maintenance branch |

---

## P1 — High

| ID | Item | Status | Notes |
|----|------|--------|-------|
| OI-010 | Publish standalone editorial policy documents | PARTIALLY COMPLETE | Content on `/about`; not formal PDF/web policy suite for DOAJ |
| OI-011 | Google Scholar inclusion application | NOT STARTED | Meta ready; inclusion not verified |
| OI-012 | Google Search Console + GA4 configuration | NOT VERIFIED | Analytics providers ready for activation |
| OI-013 | Role-based authorization on dashboards | NOT IMPLEMENTED | Any authenticated user can access `/dashboard/*` |
| OI-014 | Commit and release v1.1 engineering work | OPEN | Tests, error boundaries, monitoring uncommitted locally |
| OI-015 | Fix paper JSON `DOI` field data quality | OPEN | Field contains CC license text, not DOI identifier |
| OI-016 | Re-run production smoke tests (67 routes) | VERIFIED 2026-07-11 | 69/69 after archive routes added |

---

## P2 — Medium

| ID | Item | Status | Notes |
|----|------|--------|-------|
| OI-020 | npm audit 8 vulnerabilities (safe path) | OPEN | 1 moderate, 7 high; `--force` blocked by policy |
| OI-021 | CSP: remove `unsafe-inline` / `unsafe-eval` | OPEN | `middleware.ts` CSP_DIRECTIVES |
| OI-022 | Redis-backed rate limiting | NOT IMPLEMENTED | In-memory only |
| OI-023 | Persistent audit log storage | NOT IMPLEMENTED | 500-entry in-memory buffer |
| OI-024 | Sentry integration (`@sentry/nextjs`) | READY FOR ACTIVATION | Stub exists |
| OI-025 | WCAG 2.2 AA color contrast failures (homepage) | OPEN | Lighthouse `color-contrast` score 0 |
| OI-026 | CI: add `release/v1.0.1-maintenance` branch | OPEN | CI triggers on main/master/platform-upgrade only |
| OI-027 | E2E test suite (Playwright) | NOT IMPLEMENTED | Unit tests only |
| OI-028 | Merge duplicate docs (`Architecture.md` / `ARCHITECTURE.md`) | OPEN | Minor doc debt |

---

## P3 — Low / V2 Backlog

| ID | Item | Status | V2 Phase |
|----|------|--------|----------|
| OI-030 | OAI-PMH endpoint | NOT IMPLEMENTED | 6 |
| OI-031 | Crossref XML deposit adapter | DOCUMENTED ONLY | 4 |
| OI-032 | ORCID OAuth | READY FOR ACTIVATION | 5 |
| OI-033 | Transactional email + queue | NOT IMPLEMENTED | 2 |
| OI-034 | Editorial workflow engine | DOCUMENTED ONLY | 3 |
| OI-035 | Object storage (S3/R2/B2) | NOT IMPLEMENTED | 7 |
| OI-036 | PostgreSQL migration | DESIGN ONLY | 10 |
| OI-037 | DOAJ application | NOT STARTED | 11 |
| OI-038 | UGC CARE application | NOT STARTED | 11 |
| OI-039 | Scopus / Web of Science | NOT APPLICABLE | Multi-year track record required |
| OI-040 | Legacy component refactor (168 files) | DEFERRED | Constitution: preserve compatibility |
| OI-041 | Next.js 15 upgrade | PLANNED | v1.2.x |
| OI-042 | AI modules activation | DOCUMENTED ONLY | 12 |

---

## Operational (Non-Code)

| ID | Item | Status |
|----|------|--------|
| OI-050 | eISSN verification vs print ISSN | NOT VERIFIED |
| OI-051 | COPE membership / ethics officer | NOT VERIFIED |
| OI-052 | Plagiarism screening tool integration | NOT IMPLEMENTED |
| OI-053 | Data availability policy (standalone) | PARTIALLY COMPLETE |
| OI-054 | AI usage policy for authors | NOT IMPLEMENTED |
| OI-055 | Archiving / LOCKSS / CLOCKSS | NOT IMPLEMENTED |

---

## Verification Gaps (This Audit)

| Gap | Impact | Remediation |
|-----|--------|-------------|
| Production smoke not re-run | Cannot certify all 67 routes today | `BASE_URL=https://pub.dhe.org.in npm run qa:smoke` |
| Manual accessibility audit | WCAG certification incomplete | axe + manual keyboard/SR test |
| Penetration test | Security score is code review, not pentest | Third-party pentest before LEVEL 4 |
| Load testing | Scalability not measured | k6/Artillery on search + paper routes |

---

## Related

- [CERTIFICATION_SCORECARD.md](./CERTIFICATION_SCORECARD.md)
- [RECOMMENDED_NEXT_RELEASE.md](./RECOMMENDED_NEXT_RELEASE.md)
- [RISK_REGISTER.md](./RISK_REGISTER.md)
