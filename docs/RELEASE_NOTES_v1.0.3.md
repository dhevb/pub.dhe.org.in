# Release Notes — v1.0.3

**Release date:** 2026-07-10  
**Branch:** `docs/v1.0.3-operations`  
**Type:** Documentation & operations (no runtime code changes)

---

## Summary

v1.0.3 adds the **production operations handbook** and **governance model** for long-term platform operation. This release follows the frozen **v1.0.2 certification** release and prepares the team for the 4–8 week editorial pilot.

**No application code, configuration, or dependency changes.**

---

## Added

| Document | Purpose |
|----------|---------|
| [OPERATIONS_MANUAL.md](./OPERATIONS_MANUAL.md) | Single source of truth for deploy, rollback, checklists, backup, incident response |
| [GOVERNANCE.md](./GOVERNANCE.md) | Editorial + technical governance, release approval, ADR process, deprecation policy |
| [SUPPORT_MATRIX.md](./SUPPORT_MATRIX.md) | Version, runtime, browser support, and EOL policy |
| [PILOT_SUMMARY.md](./PILOT_SUMMARY.md) | Post-pilot evidence template for v1.1.0 planning |
| [PILOT_MODE_CURSOR_PROMPT.md](./PILOT_MODE_CURSOR_PROMPT.md) | Master Cursor prompt — pilot / feature freeze |
| This file | v1.0.3 release notes |

### Updated references

- `README.md` — operations and governance links; version **v1.0.3**
- `docs/ROADMAP.md` — operational focus pointer
- `docs/PHASE_STATUS.md` — engineering freeze policy
- `docs/CHANGELOG.md` — v1.0.3 entry

---

## Relationship to v1.0.2

| Release | Scope |
|---------|--------|
| **v1.0.2** | Certification audit only (LEVEL 3) — **frozen** |
| **v1.0.3** | Operations + governance documentation |

Deploy order: merge and deploy **v1.0.2** first; then merge **v1.0.3** when approved.

---

## Post-Deploy Validation (v1.0.2 / production)

Complete after v1.0.2 is deployed to production. Archive results here or in [OPERATIONS_MANUAL.md](./OPERATIONS_MANUAL.md) §3.

| Check | Date | Result | Notes |
|-------|------|--------|-------|
| Vercel deploy (v1.0.2) | | ⬜ | |
| `/api/health` | | ⬜ | `version`: ___ |
| Homepage | | ⬜ | |
| Paper `/vbe.rase/Paper1` | | ⬜ | |
| `/sitemap.xml` | | ⬜ | |
| `/feed.xml` | | ⬜ | |
| Login flow | | ⬜ | |
| Author dashboard | | ⬜ | |
| Search page | | ⬜ | |
| `qa:smoke` (67 routes) | | ⬜ | ___/67 passed |
| `verify-scholar.mjs` | | ⬜ | |
| Search Console sitemap submitted | | ⬜ | |

```bash
BASE_URL=https://pub.dhe.org.in npm run qa:smoke
node scripts/qa/verify-scholar.mjs https://pub.dhe.org.in/vbe.rase/Paper1
curl -s https://pub.dhe.org.in/api/health
```

---

## Pilot Period (Next 2–3 Months)

Engineering freeze active. Collect metrics in [PILOT_FEEDBACK_REPORT.md](./PILOT_FEEDBACK_REPORT.md):

- Submissions, acceptance rate, review turnaround
- Editor workload, reviewer response rate
- Author support requests
- Search traffic, bugs, feature requests

v1.1.0 planned **after** pilot sign-off with evidence-driven scope.

---

## Verification (v1.0.3 branch)

Documentation-only release — no build behavior change. Baseline from v1.0.2:

| Command | Expected |
|---------|----------|
| `npm run lint` | PASS |
| `npx tsc --noEmit` | PASS |
| `npm run test` | 58/58 |
| `npm run qa` | 20/20 |
| `npm run build` | PASS |

---

## Rollback

Documentation-only — rollback is revert merge or redeploy prior Vercel build. No runtime impact.

```bash
git revert <v1.0.3-merge-commit>
# Or Vercel → Promote previous deployment
```

---

## Related

- [OPERATIONS_MANUAL.md](./OPERATIONS_MANUAL.md)
- [GOVERNANCE.md](./GOVERNANCE.md)
- [RELEASE_NOTES_v1.0.2.md](./RELEASE_NOTES_v1.0.2.md)
- [CHANGELOG.md](./CHANGELOG.md)
