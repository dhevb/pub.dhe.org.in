# Recommended Next Release

**Audit date:** 2026-07-10  
**Current production:** v0c7f48d (Phase 9 baseline)  
**Repository stable tag:** v1.0.1  
**Recommendation:** **Operational focus first; one engineering release to close audit gaps**

---

## Strategic Recommendation

**Do not begin V2 feature development.** The certification audit confirms the platform is **LEVEL 3 — Production Ready** as a journal website. The highest-value next step is a **4–8 week operational pilot** with real editors and authors, parallel to non-code prerequisites (DOI prefix application, editorial policies, Search Console).

Engineering should deliver **one consolidation release** to align production with the repository and close P1 audit gaps — not new publishing integrations.

---

## Release Plan

### Release A — v1.0.2 (Maintenance) — **Recommended within 2 weeks**

**Purpose:** Close deploy drift and P1 operational gaps without new features.

| Item | Type | Priority |
|------|------|----------|
| Deploy `release/v1.0.1-maintenance` to production | DevOps | P0 |
| Reject` production smoke 67/67 and document results | QA | P1 |
| Fix paper JSON `DOI` field → move license text to correct field | Data | P1 |
| Add `release/v1.0.1-maintenance` to CI triggers | DevOps | P2 |
| Safe `npm audit fix` (non-force) for minimatch | Deps | P2 |
| Homepage color contrast fixes (WCAG) | A11y | P2 |

**Verification gate:**
```bash
npm run lint && npx tsc --noEmit && npm run build && npm run qa && npm run test
BASE_URL=https://pub.dhe.org.in npm run qa:smoke
```

**SemVer:** PATCH — v1.0.2

---

### Release B — v1.1.0 (Engineering Excellence) — **After pilot starts (optional, 2–4 weeks)**

**Purpose:** Ship uncommitted v1.1 work already built locally.

| Item | Evidence |
|------|----------|
| Vitest suite (58 tests) | Already passing |
| `global-error.tsx`, `not-found.tsx` | Uncommitted |
| Standardized error handling | `src/lib/errors/` |
| Monitoring hooks + feature flags | `src/lib/monitoring/` |
| CI test step | `.github/workflows/ci.yml` (uncommitted) |
| `SECURITY_AUDIT_V1_1.md`, `RELEASE.md` | Docs ready |

**Do not include:** V2 integrations, UI redesign, legacy rewrites.

**SemVer:** MINOR — v1.1.0

---

### Release C — v1.2.0 (Framework) — **After pilot sign-off**

**Purpose:** Next.js 15 controlled upgrade per `NEXTJS_UPGRADE_PLAN.md`.

**Prerequisite:** Pilot feedback report approved; no open P0 incidents.

**SemVer:** MINOR — v1.2.0

---

### Release D — v1.3.x (First Publishing Integration) — **After pilot + Crossref credentials**

**Purpose:** First live publishing integration based on pilot evidence.

**Likely order (confirm with pilot):**
1. Email system (Phase 2)
2. Editorial workflow engine (Phase 3)
3. Crossref DOI adapter (Phase 4)

**Prerequisites:**
- Crossref membership + DOI prefix in `site.json`
- Email provider credentials
- Pilot sign-off (ADR-017)

**SemVer:** MINOR — v1.3.0+

---

## What NOT to Release Next

| Avoid | Reason |
|-------|--------|
| V2 full stack in one release | Violates phase-by-phase execution |
| UI redesign | Constitution; no user demand verified |
| Legacy component rewrite | Breaks compatibility risk |
| `npm audit fix --force` | ADR-015; breaks Next 14 |
| Database migration | Phase 10 design only |
| Claiming ORCID/Crossref live without credentials | Honesty policy |

---

## Operational Checklist (Parallel to Release A)

| # | Action | Blocks |
|---|--------|--------|
| 1 | Apply for Crossref DOI prefix | v1.3.x |
| 2 | Publish 7 standalone editorial policies | DOAJ |
| 3 | Configure Google Search Console + GA4 | Analytics |
| 4 | Submit Google Scholar inclusion request | Discovery |
| 5 | Run operational pilot; complete `PILOT_FEEDBACK_REPORT.md` | V2 Phase 2+ |

---

## Success Metrics (90 days post Release A)

| Metric | Target |
|--------|--------|
| Production version matches git tag | v1.0.2+ deployed |
| Smoke tests | 67/67 documented pass |
| Production incidents (P0) | 0 |
| Pilot submissions processed | ≥5 with editor feedback |
| Scholar meta | Required tags PASS on all 20 papers |
| Lighthouse Performance | ≥90 maintained |

---

## Related

- [OPEN_ITEMS.md](./OPEN_ITEMS.md)
- [PHASE_STATUS.md](./PHASE_STATUS.md)
- [V2_EXECUTION_PROMPT.md](./V2_EXECUTION_PROMPT.md)
- [RELEASE.md](./RELEASE.md)
