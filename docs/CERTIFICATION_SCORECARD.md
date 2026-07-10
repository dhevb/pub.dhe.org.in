# Certification Scorecard — Viksit Bharat Journal

**Audit date:** 2026-07-10  
**Auditor role:** Independent multi-disciplinary certification review  
**Platform version (repo):** v1.0.1 (`package.json` 1.0.1)  
**Production URL:** https://pub.dhe.org.in  
**Production health commit:** `0c7f48d` *(see OPEN_ITEMS — deploy drift)*

---

## Overall Scores (0–100)

| Domain | Score | Status |
|--------|------:|--------|
| **Architecture** | 78 | PARTIALLY COMPLETE |
| **Security** | 82 | PARTIALLY COMPLETE |
| **Performance** | 88 | PASS (measured) |
| **Accessibility** | 85 | PARTIALLY COMPLETE |
| **SEO** | 94 | PASS (measured) |
| **Publishing Readiness** | 42 | NOT IMPLEMENTED (enterprise) |
| **Documentation** | 92 | PASS |
| **Maintainability** | 74 | PARTIALLY COMPLETE |
| **Developer Experience** | 80 | PARTIALLY COMPLETE |
| **Operations** | 72 | PARTIALLY COMPLETE |
| **Overall Platform** | **76** | **LEVEL 3** |

---

## Verification Evidence (This Audit Session)

| Check | Result | Evidence |
|-------|--------|----------|
| `npm run lint` | PASS (3 warnings) | Legacy `Notification.tsx`, `Filter.tsx` — 2026-07-10 |
| `npx tsc --noEmit` | PASS | Exit 0 — 2026-07-10 |
| `npm run test` | PASS | 58/58 tests — 2026-07-10 |
| `npm run qa` | PASS | 20/20 paper JSON — 2026-07-10 |
| `npm run build` | PASS | First Load JS shared 87.4 kB — 2026-07-10 |
| Production `/api/health` | PASS | `status: ok`, backend ok — 2026-07-10 |
| Scholar meta (Paper1) | PASS required / WARN optional | `verify-scholar.mjs` — 2026-07-10 |
| Lighthouse production homepage | PASS | perf 92, a11y 96, BP 100, SEO 100 — 2026-07-09 |
| Production smoke (67 routes) | NOT RE-VERIFIED | Prior report only; blocked this session |
| npm audit | 8 vulnerabilities | 1 moderate, 7 high — 2026-07-10 |

---

## Domain Scorecards

### Architecture — 78

| Criterion | Status | Evidence |
|-----------|--------|----------|
| Next.js App Router structure | PASS | `src/app/`, server components default |
| BFF API layer | PASS | 14 routes under `src/app/api/` |
| ADR log (17 ADRs) | PASS | `docs/ARCHITECTURE_DECISIONS.md` |
| Constitution compliance | PASS | `.cursor/rules/project-constitution.mdc` |
| Legacy/modern dual stack | PARTIALLY COMPLETE | 162 legacy vs 74 modern component files |
| Publishing scaffolds | DOCUMENTED ONLY | `editorial/`, `publishing/`, `email/` placeholders |
| Scalability design | PARTIALLY COMPLETE | File CMS; no DB/queue in production |

### Security — 82

| Criterion | Status | Evidence |
|-----------|--------|----------|
| CSRF (double-submit) | PASS | `middleware.ts`, `requireCsrf()` |
| Rate limiting | PARTIALLY COMPLETE | In-memory middleware; not Redis |
| CSP | PARTIALLY COMPLETE | Present; `unsafe-inline`, `unsafe-eval` |
| Security headers | PASS | X-Frame-Options, nosniff, Referrer-Policy |
| Auth cookies httpOnly | PASS | `AUTH_COOKIE_OPTIONS` |
| Input validation (Zod) | PASS | Login route verified |
| Dependency vulns | FAIL | 8 npm audit (safe fix blocked on majors) |
| Audit logging | PARTIALLY COMPLETE | In-memory buffer (500 max) |
| Sentry | READY FOR ACTIVATION | Stub only; no `@sentry/nextjs` |
| RBAC / authorization | NOT IMPLEMENTED | Token gate only on `/dashboard` |

### Performance — 88

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| Lighthouse Performance | 92 | ≥90 | PASS |
| LCP | 2.8 s | ≤2.5 s | PARTIALLY COMPLETE |
| CLS | 0 | ≤0.1 | PASS |
| TBT | 84 ms | ≤200 ms | PASS |
| TTI | 4.6 s | — | Acceptable |
| Shared JS | 87.4 kB | — | PASS (post Phase 9) |

*Source: `lighthouse-prod-final.json`, build output 2026-07-10*

### Accessibility — 85

| Criterion | Status | Evidence |
|-----------|--------|----------|
| Lighthouse Accessibility | 96 | Production homepage |
| Skip link | PASS | `layout.tsx` `#main-content` |
| Reduced motion | PASS | `globals.css` |
| Color contrast (WCAG 2.2 AA) | FAIL (partial) | Lighthouse `color-contrast` score 0 on homepage |
| Heading order | PARTIALLY COMPLETE | Lighthouse heading-order flagged |
| Manual screen reader audit | NOT PERFORMED | Automated only |
| Form labels (modern UI) | PASS | Submission wizard, dashboards |

### SEO — 94

| Criterion | Status | Evidence |
|-----------|--------|----------|
| Lighthouse SEO | 100 | Production |
| `robots.txt` | PASS | Live fetch 2026-07-10 |
| `sitemap.xml` | PASS | `src/app/sitemap.ts` |
| JSON-LD | PASS | Organization + Website schemas |
| OpenGraph / Twitter | PASS | `buildMetadata()` |
| RSS | PASS | `/feed.xml` |
| hreflang (journal pairs) | PASS | `hreflang.ts` en-IN / hi-IN |
| Canonical URLs | PASS | `buildHreflangAlternates()` |
| Breadcrumbs | PARTIALLY COMPLETE | Paper pages; not all routes |

### Publishing Readiness — 42

| Standard | Status | Score contrib. |
|----------|--------|----------------|
| Google Scholar meta | PASS | High |
| ISSN 2278-1757 | PASS | High |
| DOI / Crossref | NOT IMPLEMENTED | Empty prefix; placeholder `registerDoi()` |
| OAI-PMH | NOT IMPLEMENTED | No `/oai` route |
| Dublin Core / JATS | DOCUMENTED ONLY | Placeholder formats |
| ORCID | READY FOR ACTIVATION | Flag only |
| DOAJ eligibility | PARTIALLY COMPLETE | OA text on `/about`; no formal policy docs |
| COPE alignment | PARTIALLY COMPLETE | Ethics section; no COPE membership |
| Editorial workflow engine | NOT IMPLEMENTED | Types only in `workflow.ts` |
| Transactional email | NOT IMPLEMENTED | In-memory queue |
| Crossmark | NOT IMPLEMENTED | — |
| Scopus / WoS | NOT APPLICABLE | Requires track record + indexing |

### Documentation — 92

| Document | Status |
|----------|--------|
| README | PASS |
| PROJECT_CHARTER | PASS |
| ARCHITECTURE + 17 ADRs | PASS |
| API_REFERENCE | PASS |
| SECURITY, SEO, CMS, DEPLOYMENT | PASS |
| V2 roadmap + execution docs | PASS |
| TROUBLESHOOTING, CHANGELOG | PASS |
| Duplicate legacy docs (`Architecture.md`, `Deployment.md`) | Minor debt |

### Maintainability — 74

| Criterion | Status | Evidence |
|-----------|--------|----------|
| Unit tests (58) | PASS | Vitest |
| Coverage (critical lib) | ~89% | V1.1 report |
| E2E tests | NOT IMPLEMENTED | No Playwright |
| Legacy duplication (4× journals) | ACCEPTED DEBT | Constitution |
| TypeScript strict usage | PASS | `tsc --noEmit` clean |
| Technical debt register | PASS | `docs/TECHNICAL_DEBT.md` |

### Developer Experience — 80

| Criterion | Status | Evidence |
|-----------|--------|----------|
| QA scripts | PASS | papers, smoke, scholar |
| CI pipeline | PARTIALLY COMPLETE | Tests + lint + build; branch coverage gap |
| `.env.example` | PARTIALLY COMPLETE | Uncommitted local changes |
| Module READMEs | PARTIALLY COMPLETE | errors, monitoring; uncommitted |

### Operations — 72

| Criterion | Status | Evidence |
|-----------|--------|----------|
| Vercel deploy (bom1) | PASS | `vercel.json` |
| Health endpoint | PASS | Live `/api/health` |
| Redirects (legacy domains) | PASS | 14 redirect rules |
| Error boundaries | PARTIALLY COMPLETE | `error.tsx` local; `global-error.tsx` uncommitted |
| Monitoring | NOT IMPLEMENTED | Sentry stub |
| Production version sync | FAIL | Health `0c7f48d` ≠ repo v1.0.1 tag |
| Rollback documented | PASS | `docs/DEPLOYMENT.md` |

---

## Certification Level

### **LEVEL 3 — Production Ready**

The platform is a **stable, secure, SEO-optimized academic journal website** suitable for public production use, article discovery, and Google Scholar metadata compliance. It is **not** certified as an international enterprise publishing platform.

---

## Path to Next Level

### LEVEL 4 — International Publishing Ready (target overall ≥85, publishing ≥70)

| # | Requirement | Current gap |
|---|-------------|-------------|
| 1 | Crossref DOI prefix + live deposit adapter | NOT IMPLEMENTED |
| 2 | OAI-PMH 2.0 endpoint | NOT IMPLEMENTED |
| 3 | Operational editorial workflow (not UI shell) | NOT IMPLEMENTED |
| 4 | Transactional email with queue | NOT IMPLEMENTED |
| 5 | Standalone editorial policy documents (7+) | PARTIALLY COMPLETE |
| 6 | Google Scholar inclusion confirmed | NOT VERIFIED |
| 7 | ORCID author linking | READY FOR ACTIVATION |
| 8 | Persistent audit logs | NOT IMPLEMENTED |
| 9 | 4–8 week operational pilot complete | IN PROGRESS |
| 10 | Production deployed to v1.0.1+ | DEPLOY DRIFT |

### LEVEL 5 — Enterprise Academic Publishing Platform

Requires LEVEL 4 plus: PostgreSQL migration, object storage, full observability stack, indexing in major databases (multi-year), AI interfaces on-prem, visual CMS — see `docs/V2_ROADMAP.md`.

---

## Related

- [FINAL_CERTIFICATION_AUDIT.md](./FINAL_CERTIFICATION_AUDIT.md)
- [PRODUCTION_READINESS_CERTIFICATE.md](./PRODUCTION_READINESS_CERTIFICATE.md)
- [OPEN_ITEMS.md](./OPEN_ITEMS.md)
- [RECOMMENDED_NEXT_RELEASE.md](./RECOMMENDED_NEXT_RELEASE.md)
