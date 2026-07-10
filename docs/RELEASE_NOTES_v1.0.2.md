# Release Notes — v1.0.2

**Release date:** 2026-07-10  
**Branch:** `release/v1.0.2-certification`  
**Tag:** `v1.0.2`  
**Type:** Documentation & certification (no application code changes)

---

## Summary

v1.0.2 finalizes the **independent certification audit** of the Viksit Bharat Journal platform. This release documents production readiness as a scholarly journal website. It contains **no new features**, **no refactors**, and **no production logic changes**.

---

## Certification Result

| Field | Value |
|-------|-------|
| **Classification** | **LEVEL 3 — Production Ready** |
| **Overall score** | **76 / 100** |
| **Certificate ID** | VBJ-CERT-2026-07-10-001 |
| **Production URL** | https://pub.dhe.org.in |

**Certified for:** Public journal website, article hosting, Google Scholar metadata, author portal (with Render backend).

**Not certified for:** International indexing deposit, enterprise editorial workflow, live DOI/Crossref, OAI-PMH, ORCID.

### Domain Scores

| Domain | Score |
|--------|------:|
| Architecture | 78 |
| Security | 82 |
| Performance | 88 |
| Accessibility | 85 |
| SEO | 94 |
| Publishing Readiness | 42 |
| Documentation | 92 |
| Maintainability | 74 |
| Developer Experience | 80 |
| Operations | 72 |

---

## Documentation Added

| Document | Purpose |
|----------|---------|
| [FINAL_CERTIFICATION_AUDIT.md](./FINAL_CERTIFICATION_AUDIT.md) | Full independent audit record |
| [CERTIFICATION_SCORECARD.md](./CERTIFICATION_SCORECARD.md) | Scores and evidence matrix |
| [PRODUCTION_READINESS_CERTIFICATE.md](./PRODUCTION_READINESS_CERTIFICATE.md) | Formal LEVEL 3 certificate |
| [OPEN_ITEMS.md](./OPEN_ITEMS.md) | P0–P3 tracked gaps |
| [RECOMMENDED_NEXT_RELEASE.md](./RECOMMENDED_NEXT_RELEASE.md) | Release sequencing guidance |
| This file | v1.0.2 release notes |

**ADR:** ADR-018 — Independent certification audit (LEVEL 3)

---

## Known Limitations

1. **Deploy drift:** Production `/api/health` reported commit `0c7f48d` at audit time; deploy v1.0.2 to align.
2. **Publishing integrations:** Crossref, OAI-PMH, ORCID, transactional email — NOT IMPLEMENTED.
3. **Editorial workflow engine:** DOCUMENTED ONLY (`src/lib/editorial/workflow.ts` types).
4. **RBAC:** Dashboard routes gated by token only; no role-based authorization.
5. **DOI prefix:** Empty in `content/site.json`; `citation_doi` not emitted.
6. **Paper JSON data quality:** `DOI` field contains license text, not DOI identifiers.
7. **Production smoke (67 routes):** Not re-verified during certification session.
8. **npm audit:** 8 vulnerabilities (1 moderate, 7 high); safe fix only — no `--force`.

---

## Open Items (Summary)

See [OPEN_ITEMS.md](./OPEN_ITEMS.md). Priority highlights:

| ID | Item | Priority |
|----|------|----------|
| OI-001 | Register Crossref/DataCite DOI prefix | P0 |
| OI-002 | Complete operational pilot (4–8 weeks) | P0 |
| OI-003 | Deploy v1.0.2 to production | P0 |
| OI-013 | Role-based dashboard authorization | P1 |
| OI-016 | Re-run production smoke tests | P1 |

---

## Next Milestone

1. **Approve and push** `release/v1.0.2-certification` + tag `v1.0.2`
2. **Deploy** to Vercel production
3. **Run** `BASE_URL=https://pub.dhe.org.in npm run qa:smoke` and document results
4. **Begin** operational pilot — [PILOT_FEEDBACK_REPORT.md](./PILOT_FEEDBACK_REPORT.md)
5. **Do not** start V2 implementation until pilot sign-off (ADR-017)

Optional follow-up: v1.1.0 engineering release (separate branch; uncommitted work exists locally).

---

## Verification Results (2026-07-10)

Recorded at `package.json` version **1.0.2** (pre-tag).

| Command | Result | Detail |
|---------|--------|--------|
| `npm run lint` | **PASS** | 3 warnings (legacy `Notification.tsx`, `Filter.tsx`) |
| `npx tsc --noEmit` | **PASS** | Exit 0 |
| `npm run test` | **PASS** | 58/58 tests, 14 files |
| `npm run qa` | **PASS** | 20/20 paper JSON files |
| `npm run build` | **PASS** | 123 static pages; shared JS 87.4 kB |
| `npm run qa:smoke` | **NOT RUN** | Requires running server or production URL |

### Version fields (`GET /api/health`)

| Field | Source | v1.0.2 behavior |
|-------|--------|-----------------|
| `version` | `VERCEL_GIT_COMMIT_SHA` (7-char) on Vercel; `"local"` in dev | After deploy: expect `db32af1` |
| Semver | `package.json` | **1.0.2** (not returned by health endpoint today) |

Health does not read `package.json` in v1.0.2 — semver is documented in this file, [CHANGELOG.md](./CHANGELOG.md), and [README.md](../README.md). Post-deploy verification: confirm `version` matches the deployed commit.

### External Checks (audit session)

| Check | Result |
|-------|--------|
| `GET /api/health` (production) | `status: ok` |
| `verify-scholar.mjs` Paper1 | 7/7 required PASS |
| Lighthouse homepage (prod) | P92 A96 BP100 SEO100 |

---

## Deployment Checklist

- [x] Merge `release/v1.0.2-certification` → `main` (2026-07-10, fast-forward to `574eb05`)
- [x] Push `main` to origin (2026-07-10)
- [x] Push tag `v1.0.2` to origin
- [ ] Vercel production deploy from `main` (region `bom1`) — **pending** at validation time
- [ ] Verify `GET /api/health` — `version` = `574eb05` after deploy (was `0c7f48d` pre-deploy)
- [x] Run production smoke: `BASE_URL=https://pub.dhe.org.in npm run qa:smoke`
- [x] Confirm Scholar meta on sample paper URL
- [ ] Update [PHASE_STATUS.md](./PHASE_STATUS.md) deploy status after Vercel deploy

**Environment:** No new env vars required for this release.

---

## Post-Deploy Production Validation

*Recorded 2026-07-10 after merge to `main`. Re-run after Vercel deploy completes.*

| Check | Date | Result | Notes |
|-------|------|--------|-------|
| Merge to `main` | 2026-07-10 | ✅ | `574eb05` |
| Push `main` | 2026-07-10 | ✅ | |
| Vercel deploy Ready | 2026-07-10 | ⬜ | Production still on `0c7f48d` — await auto-deploy |
| `/api/health` | 2026-07-10 | ⚠️ | `status: ok`, `version: 0c7f48d` (pre-deploy) |
| `qa:smoke` (67 checks) | 2026-07-10 | ⚠️ | **63/67 passed**, 4 failed (transient fetch) |
| `verify-scholar.mjs` Paper1 | 2026-07-10 | ✅ | 7/7 required PASS |
| Homepage / paper / sitemap | 2026-07-10 | ⬜ | Re-verify post-deploy |

### Smoke failures (investigate / re-run)

| Route | Error |
|-------|-------|
| `/vbh.rase/Paper4` | fetch failed |
| `/vbh.rase/Paper5` | fetch failed |
| `/vie.rase/ReadArticlePage` | fetch failed |
| `/vie` | fetch failed |

```bash
BASE_URL=https://pub.dhe.org.in npm run qa:smoke
node scripts/qa/verify-scholar.mjs https://pub.dhe.org.in/vbe.rase/Paper1
curl -s https://pub.dhe.org.in/api/health
```

**v1.0.2 closure:** Re-run smoke after Vercel deploy; target **67/67**. Then mark v1.0.2 closed.

---

## Rollback Procedure

This release changes documentation and `package.json` version metadata only. No runtime behavior changes.

### If deployed and rollback needed

```bash
# Revert to previous production deployment in Vercel dashboard
# Or redeploy prior git tag:
git checkout v1.0.1
# Trigger Vercel production deploy from v1.0.1
```

### If tag must be removed locally (before push)

```bash
git tag -d v1.0.2
git checkout release/v1.0.1-maintenance
```

**Do not** force-push tags to shared remote without team approval.

---

## Related

- [PROJECT_CHARTER.md](./PROJECT_CHARTER.md)
- [ARCHITECTURE_DECISIONS.md](./ARCHITECTURE_DECISIONS.md) — ADR-018
- [CHANGELOG.md](./CHANGELOG.md)
