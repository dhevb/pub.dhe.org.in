# Operations Manual — Viksit Bharat Journal

**Version:** 1.0  
**Effective:** 2026-07-10  
**Platform:** https://pub.dhe.org.in  
**Certification:** LEVEL 3 — Production Ready ([PRODUCTION_READINESS_CERTIFICATE.md](./PRODUCTION_READINESS_CERTIFICATE.md))

This is the **single source of truth** for day-to-day production operations. For deep technical detail, follow links to specialized docs — do not duplicate them here.

**Engineering policy during editorial pilot (ADR-017):** Bug fixes, security patches, performance improvements, and documentation only. No new features until [PILOT_FEEDBACK_REPORT.md](./PILOT_FEEDBACK_REPORT.md) is signed off.

---

## Quick Reference

| Item | Value |
|------|-------|
| Production URL | https://pub.dhe.org.in |
| Hosting | Vercel, region `bom1` (Mumbai) |
| Backend API | https://vie-rase-backend.onrender.com |
| Repository | github.com/dhevb/pub.dhe.org.in |
| Current release | v1.0.2 (tag `v1.0.2`) |
| Health check | `GET /api/health` |
| ISSN | 2278-1757 |
| DOI prefix | *(empty — pending Crossref)* |
| Editorial contact | pub.dhe4@gmail.com |

---

## 1. Production Deployment Procedure

### Prerequisites

- Merge approved to `main`
- CI green: lint, tests, `qa:papers`, build
- Release notes updated in `docs/CHANGELOG.md`

### Standard deploy (Vercel Git integration)

1. Push merged commit to `main`
2. Vercel auto-builds (see [DEPLOYMENT.md](./DEPLOYMENT.md))
3. Wait for deployment **Ready** in Vercel dashboard
4. Run [Release Checklist](#3-release-checklist) below
5. Archive smoke results in `docs/RELEASE_NOTES_vX.Y.Z.md`

### Manual verification commands

```bash
curl -s https://pub.dhe.org.in/api/health | jq .
npm run qa:papers
BASE_URL=https://pub.dhe.org.in npm run qa:smoke
node scripts/qa/verify-scholar.mjs https://pub.dhe.org.in/vbe.rase/Paper1
```

### Environment variables

Configured in Vercel → Settings → Environment Variables. Full list: [DEPLOYMENT.md](./DEPLOYMENT.md#environment-variables).

---

## 2. Rollback Procedure

### Option A — Vercel (fastest, preferred)

1. Vercel Dashboard → **Deployments**
2. Select last known-good deployment
3. **Promote to Production**
4. Run health + smoke test
5. Document incident in [OPEN_ITEMS.md](./OPEN_ITEMS.md) or incident log

### Option B — Git revert

```bash
git revert <bad-commit-sha>
git push origin main
# Vercel auto-deploys
```

### Option C — Redeploy prior tag

```bash
git checkout v1.0.1   # or prior tag
# Trigger production deploy from Vercel
```

**Never** force-push `main` or tags without team approval.

See also: [RELEASE.md](./RELEASE.md), [RELEASE_NOTES_v1.0.2.md](./RELEASE_NOTES_v1.0.2.md#rollback-procedure)

---

## 3. Release Checklist

Use for every production release (patch, minor, or certification).

### Pre-merge

- [ ] `npm run lint` — PASS
- [ ] `npx tsc --noEmit` — PASS
- [ ] `npm run test` — PASS (58/58)
- [ ] `npm run qa` — PASS (20/20 papers)
- [ ] `npm run build` — PASS
- [ ] `CHANGELOG.md` updated
- [ ] `docs/RELEASE_NOTES_vX.Y.Z.md` created (if semver bump)
- [ ] No secrets in commit
- [ ] PR reviewed

### Post-deploy

- [ ] Vercel deployment status: **Ready**
- [ ] `/api/health` → `status: ok`, `version` = expected commit (7-char SHA)
- [ ] Homepage loads
- [ ] Sample paper: `/vbe.rase/Paper1`
- [ ] `/sitemap.xml` accessible
- [ ] `/feed.xml` accessible
- [ ] `/robots.txt` correct
- [ ] Login → dashboard flow works
- [ ] Search page loads
- [ ] `BASE_URL=https://pub.dhe.org.in npm run qa:smoke` — record pass/fail count
- [ ] Scholar meta: `node scripts/qa/verify-scholar.mjs` on one paper
- [ ] Submit sitemap in Google Search Console *(if URLs changed materially)*

### v1.0.2 completion (current)

- [x] Branch `release/v1.0.2-certification` pushed
- [x] Tag `v1.0.2` (annotated) pushed
- [ ] Merge → `main`
- [ ] Vercel deploy complete
- [ ] Production smoke archived in [RELEASE_NOTES_v1.0.2.md](./RELEASE_NOTES_v1.0.2.md)

---

## 4. Weekly Editorial Checklist

*During operational pilot — record in [PILOT_FEEDBACK_REPORT.md](./PILOT_FEEDBACK_REPORT.md)*

### Submissions & workflow

- [ ] New submissions received (count: ___)
- [ ] Submissions screened (count: ___)
- [ ] Reviewers invited / assigned
- [ ] Reviews completed (count: ___)
- [ ] Decisions communicated to authors
- [ ] Pain points noted (editor / author / reviewer)

### Platform health (5 min)

- [ ] https://pub.dhe.org.in loads
- [ ] `/api/health` → `status: ok`
- [ ] No P0/P1 user-reported bugs open

### Communication

- [ ] Author/reviewer emails responded within SLA
- [ ] Editorial board notices published if needed (`content/announcements.json`)

### Documentation

- [ ] Update weekly section in `PILOT_FEEDBACK_REPORT.md`
- [ ] Log bugs in OPEN_ITEMS or pilot report

---

## 5. Monthly Maintenance Checklist

### Engineering (maintenance branch only during pilot)

- [ ] Review [OPEN_ITEMS.md](./OPEN_ITEMS.md) P0/P1 items
- [ ] `npm audit` — apply **safe** fixes only (never `--force`)
- [ ] Check Vercel deployment logs for errors
- [ ] Verify Render backend availability (cold-start awareness)
- [ ] Review `/api/health` backend status trend

### Content & SEO

- [ ] Google Search Console — coverage, crawl errors
- [ ] Google Analytics 4 — traffic review *(when configured)*
- [ ] Sample Scholar meta check on 2 paper URLs
- [ ] Confirm 20 paper JSON files intact: `npm run qa:papers`

### Security

- [ ] Review dependency advisories ([DEPENDENCY_AUDIT.md](./DEPENDENCY_AUDIT.md))
- [ ] Confirm no exposed secrets in repo
- [ ] Spot-check auth flow (login, logout, protected routes)

### Editorial operations

- [ ] Pilot metrics: submissions, acceptance rate, time-to-decision
- [ ] Policy gaps identified → editorial board action

---

## 6. Backup Procedure

### What to back up

| Asset | Location | Method |
|-------|----------|--------|
| Source code | GitHub | Primary; tags for releases |
| 20 paper JSON files | `src/app/*/output/Paper*.json` | Git + `npm run qa:papers` verification |
| CMS content | `content/*.json` | Git |
| Vercel config | `vercel.json`, `next.config.mjs` | Git |
| Environment vars | Vercel dashboard | **Export manually** to secure password manager |
| Backend manuscripts | Render API | Backend team responsibility — confirm with Render admin |

### CMS export

```bash
# Manifest export (when used)
# See src/lib/backup/export.ts
```

### Backup frequency

| Asset | Frequency |
|-------|-----------|
| Git (code + content) | Every merge to `main` |
| Env var snapshot | After any env change |
| Paper integrity check | Weekly during pilot |

---

## 7. Recovery Procedure

### Scenario: Site down (5xx / not loading)

1. Check [Vercel status](https://www.vercel-status.com/)
2. Check Vercel deployment — failed build? Rollback to last good deploy
3. Check `/api/health` — backend `down`? Static pages may still work
4. If Render backend down: wait for cold start or contact backend admin
5. Document in incident log; post-mortem if P0

### Scenario: Corrupted paper JSON

1. **Do not** edit paper files without ADR approval (constitution)
2. Restore from Git: `git checkout main -- src/app/vbe.rase/output/Paper1.json`
3. Run `npm run qa:papers`
4. Redeploy if needed

### Scenario: Bad production deploy

1. Vercel → Promote previous deployment (see [Rollback](#2-rollback-procedure))
2. Smoke test
3. `git revert` on `main` if code fix required

### Scenario: Security incident

1. Rotate compromised credentials immediately (Vercel env, backend tokens)
2. Assess scope via Vercel logs
3. Patch and emergency release if needed
4. Document in [SECURITY.md](./SECURITY.md) incident section

---

## 8. Google Search Console Checks

### Initial setup (one-time)

1. Add property: `https://pub.dhe.org.in`
2. Verify via `NEXT_PUBLIC_GSC_VERIFICATION` meta tag or DNS
3. Submit sitemap: `https://pub.dhe.org.in/sitemap.xml`

### Monthly

- [ ] **Pages** — indexed vs not indexed
- [ ] **Sitemaps** — last read date, errors
- [ ] **Core Web Vitals** — mobile/desktop
- [ ] **Manual actions** — none expected
- [ ] **Security issues** — none expected

### After each release with new URLs

- [ ] Resubmit sitemap if routes or paper count changed
- [ ] Request indexing for new high-value pages (optional)

---

## 9. Google Scholar Monitoring

### Requirements (verified in certification audit)

Required `citation_*` meta on every paper page. Verify:

```bash
node scripts/qa/verify-scholar.mjs https://pub.dhe.org.in/vbe.rase/Paper1
```

### Monthly

- [ ] Run verify-scholar on 2 papers (EN + HI journal)
- [ ] Confirm articles are **public** (no login wall)
- [ ] Confirm `citation_issn` present
- [ ] When DOI prefix configured: confirm `citation_doi` present

### Inclusion application

- [ ] Apply via [Google Scholar inclusion form](https://scholar.google.com/intl/en/scholar/inclusion.html) if not indexed
- [ ] Allow 4–8 weeks for processing
- [ ] Re-check after site structure changes

Gap analysis: [INDEXING_READINESS.md](./INDEXING_READINESS.md)

---

## 10. DOI Registration Workflow

**Status:** NOT IMPLEMENTED — manual process until Crossref adapter (V2 Phase 4).

### Prerequisites (operational)

1. [ ] Crossref or DataCite membership approved
2. [ ] DOI prefix assigned
3. [ ] Set `doiPrefix` in `content/site.json`
4. [ ] Configure Crossref credentials in Vercel env (when adapter exists)

### Current manual workflow (until automation)

1. Editorial board accepts paper for publication
2. Register DOI via Crossref web interface (when membership active)
3. Add DOI to paper metadata / CMS
4. Verify `citation_doi` on live paper page
5. Deposit metadata to Crossref per their schedule

Future automation: [INTEGRATIONS.md](./INTEGRATIONS.md), [PUBLISHING_ARCHITECTURE.md](./PUBLISHING_ARCHITECTURE.md)

---

## 11. Volume / Issue Publication Workflow

**Current state:** Legacy issue management via journal routes (`/vbe.rase/issues`, `NewIssue`, `table`). Modern dashboards link to legacy tools.

### Recommended manual workflow (pilot period)

1. **Editorial decision** — acceptance recorded (spreadsheet or backend until workflow engine exists)
2. **Copy editing** — author revisions outside platform or via email
3. **Assign volume/issue** — editorial board assigns numbers
4. **Publish article**
   - New static paper: requires engineering (immutable JSON contract — constitution)
   - Existing issue table: legacy `issues` / `NewIssue` routes
5. **Update CMS** — announcements, homepage highlights in `content/`
6. **SEO** — resubmit sitemap if new URLs
7. **Indexing** — Crossref deposit when DOI active

### First published volume (medium priority)

- [ ] Define volume 1, issue 1 scope with editorial board
- [ ] Publish 3–5 accepted papers as a named issue
- [ ] Document process gaps in `PILOT_FEEDBACK_REPORT.md`

---

## 12. Annual Dependency Review

**Schedule:** Q1 each year (or before major release)

1. Review [DEPENDENCY_AUDIT.md](./DEPENDENCY_AUDIT.md)
2. Run `npm audit` — safe patches only on maintenance branch
3. Plan Next.js major upgrade per [NEXTJS_UPGRADE_PLAN.md](./NEXTJS_UPGRADE_PLAN.md) — **not during pilot**
4. Review Node.js LTS alignment (`engines.node`)
5. Update [TECHNICAL_DEBT.md](./TECHNICAL_DEBT.md)
6. Re-run certification spot-check if major upgrades shipped

---

## 13. Security Review Schedule

| Review | Frequency | Reference |
|--------|-----------|-----------|
| Dependency audit | Monthly | `npm audit`, [SECURITY.md](./SECURITY.md) |
| Auth/CSRF spot-check | Quarterly | Login, logout, protected routes |
| Full security re-audit | Annually | [SECURITY_AUDIT_V1_1.md](./SECURITY_AUDIT_V1_1.md) template |
| Penetration test | Before LEVEL 4 certification | Third-party recommended |

During pilot: security patches on `release/v1.0.x` or `main` hotfix only.

---

## 14. Performance Audit Schedule

| Check | Frequency | Tool |
|-------|-----------|------|
| Lighthouse homepage | After major deploy | Chrome DevTools / CI |
| LCP / CLS spot-check | Quarterly | Lighthouse production |
| Bundle size | Each release | `npm run build` output |
| Render backend latency | Monthly | `/api/health` backend status |

Targets: Performance ≥90, LCP ≤2.5s (aspirational), CLS ≤0.1.  
Reference: [PERFORMANCE_FINAL_REPORT.md](./PERFORMANCE_FINAL_REPORT.md)

---

## 15. Incident Response Process

### Severity levels

| Level | Definition | Response time |
|-------|------------|---------------|
| **P0** | Site down, auth broken, data loss risk | Immediate |
| **P1** | Major feature broken (submission, login) | Same day |
| **P2** | Minor bug, cosmetic, legacy-only | Next maintenance window |
| **P3** | Enhancement request | Backlog / pilot report |

### Response steps

1. **Detect** — user report, health check, Vercel alert
2. **Triage** — assign severity
3. **Communicate** — editorial contact if user-facing; maintenance banner via `content/site.json` `maintenanceMode` if extended outage
4. **Mitigate** — rollback or hotfix branch
5. **Verify** — health + smoke test
6. **Document** — update OPEN_ITEMS, CHANGELOG, post-mortem for P0/P1

### Engineering freeze during pilot

**Allowed:** P0/P1 bug fixes, security patches, perf fixes, docs  
**Deferred:** New features, UI redesign, framework upgrades, V2 integrations

See [RISK_REGISTER.md](./RISK_REGISTER.md) — R-001 (building unused features).

---

## 16. Contact List

*Update names and phone numbers in a secure internal copy if needed.*

### Technical

| Role | Contact | Responsibility |
|------|---------|----------------|
| Platform engineering | *(assign)* | Deploys, bugs, Vercel, GitHub |
| Backend API (Render) | *(assign)* | Manuscript API, auth backend |
| DevOps / Vercel admin | *(assign)* | Env vars, domains, SSL |

### Editorial

| Role | Contact | Responsibility |
|------|---------|----------------|
| Managing editor | pub.dhe4@gmail.com | Submissions, decisions |
| Editor-in-chief | *(assign)* | Policy, pilot sign-off |
| Publisher | Department of Holistic Education | ISSN, Crossref membership |

### External services

| Service | Portal |
|---------|--------|
| Vercel | vercel.com/dashboard |
| Render | dashboard.render.com |
| GitHub | github.com/dhevb/pub.dhe.org.in |
| Google Search Console | search.google.com/search-console |
| Crossref | www.crossref.org *(when member)* |

---

## 17. Operational Roadmap (Next 2–3 Months)

*Engineering frozen for features; operations focus.*

| Priority | Task | Owner |
|----------|------|-------|
| 🔴 High | Run journal with real submissions and editorial workflows | Editorial |
| 🔴 High | Publish OA, Peer Review, Ethics, Plagiarism policies (standalone) | Editorial board |
| 🔴 High | Apply for Crossref DOI membership | Editorial board |
| 🔴 High | Configure GA4 and Search Console | Ops / Marketing |
| 🟠 Medium | Apply for Google Scholar indexing | Editorial |
| 🟠 Medium | Build first published volume/issue with real papers | Editorial |
| 🟠 Medium | Collect author, reviewer, editor feedback weekly | Editorial |
| 🟢 Later | Begin V2 based on pilot evidence | Engineering |

---

## 18. Related Documents

| Doc | Purpose |
|-----|---------|
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Vercel, env vars, CI |
| [RELEASE.md](./RELEASE.md) | SemVer, hotfix workflow |
| [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md) | Launch checklist |
| [PILOT_FEEDBACK_REPORT.md](./PILOT_FEEDBACK_REPORT.md) | Editorial pilot template |
| [PHASE_STATUS.md](./PHASE_STATUS.md) | V2 phase tracker |
| [OPEN_ITEMS.md](./OPEN_ITEMS.md) | Tracked gaps |
| [PROJECT_CHARTER.md](./PROJECT_CHARTER.md) | Engineering constitution |
| [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) | Common issues |

---

*Maintain this manual when procedures change. Version bumps to this doc should be noted in CHANGELOG.*
