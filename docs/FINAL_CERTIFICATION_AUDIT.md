# Final Certification Audit — Viksit Bharat Journal

**Audit type:** Independent multi-disciplinary certification  
**Date:** 2026-07-10  
**Auditor stance:** Assume nothing · Verify everything · No PASS without evidence  
**Production URL:** https://pub.dhe.org.in  
**Repository version:** v1.0.1 (`package.json` 1.0.1)  
**Production health version:** `0c7f48d` *(deploy drift — see §DevOps)*

---

## Executive Summary

The Viksit Bharat Journal platform is a **technically mature, production-live academic journal website** with strong SEO, security hardening, performance optimization, and exceptional documentation. It successfully hosts 20 peer-reviewed articles with Google Scholar-compliant metadata and ISSN registration.

It is **not** an enterprise academic publishing system. Crossref DOI deposit, OAI-PMH harvesting, operational editorial workflow, transactional email, ORCID linking, and major index eligibility remain **NOT IMPLEMENTED** or **DOCUMENTED ONLY**.

### Final Classification

# **LEVEL 3 — Production Ready**

| Level | Definition | Fit |
|-------|------------|-----|
| LEVEL 1 — Prototype | Non-production experiments | ❌ Exceeded |
| LEVEL 2 — Internal Beta | Limited audience, incomplete QA | ❌ Exceeded |
| **LEVEL 3 — Production Ready** | **Stable public website, security, SEO, content** | **✅ Certified** |
| LEVEL 4 — International Publishing Ready | DOI, OAI, workflow, indexing eligibility | ❌ Not met |
| LEVEL 5 — Enterprise Academic Publishing Platform | Full V2 ecosystem | ❌ Not met |

**Overall score: 76/100** — see [CERTIFICATION_SCORECARD.md](./CERTIFICATION_SCORECARD.md)

---

## 1. Verification Log (This Session)

| Command / Check | Result | Timestamp |
|-----------------|--------|-----------|
| `npm run lint` | ✅ PASS (3 warnings in legacy files) | 2026-07-10 |
| `npx tsc --noEmit` | ✅ PASS | 2026-07-10 |
| `npm run test` | ✅ PASS — 58/58 | 2026-07-10 |
| `npm run qa` | ✅ PASS — 20/20 papers | 2026-07-10 |
| `npm run build` | ✅ PASS — shared JS 87.4 kB | 2026-07-10 |
| `npm audit` | ⚠️ 8 vulnerabilities (1 moderate, 7 high) | 2026-07-10 |
| `GET https://pub.dhe.org.in/api/health` | ✅ `status: ok`, backend ok | 2026-07-10 |
| `GET https://pub.dhe.org.in/robots.txt` | ✅ Sitemap + disallow rules | 2026-07-10 |
| `verify-scholar.mjs` (Paper1 prod) | ✅ 7/7 required; ⚠️ citation_doi missing | 2026-07-10 |
| Lighthouse prod homepage | ✅ P92 A96 BP100 SEO100 | 2026-07-09 |
| Production smoke 67 routes | ⬜ NOT RE-VERIFIED this session | — |

---

## 2. Technical Audit

### 2.1 Folder Structure

| Area | Path | Files | Assessment |
|------|------|------:|--------------|
| Modern UI | `src/components/` | 74 | PASS — reusable design system |
| Modern logic | `src/lib/` | 81 | PASS — domain modules |
| Legacy journal UI | `src/app/component/*_Component/` | 162 | ACCEPTED DEBT — 4× duplication |
| App routes | `src/app/` | 667 total in src | PASS — App Router |
| CMS | `content/*.json` | Verified | PASS — file-based CMS |
| Papers | `*/output/Paper{1-5}.json` | 20 | PASS — immutable contract |
| Tests | `src/lib/**/__tests__`, `tests/` | 14 files | PASS |
| Docs | `docs/` | 55+ | PASS — comprehensive |

### 2.2 Architecture

**Pattern:** Next.js 14 App Router BFF — server components default, API routes proxy Render backend.

**Evidence:** `src/lib/api/client.ts`, 14 API routes, `middleware.ts` for cross-cutting security.

**ADR consistency:** 17 ADRs in `ARCHITECTURE_DECISIONS.md`; ADR-016/017 align with V2 pilot gate. **PASS**

**Constitution compliance:** `.cursor/rules/project-constitution.mdc` + `PROJECT_CHARTER.md` — no papers removed, no route breaking observed. **PASS**

### 2.3 Reusable Components & Duplication

| Pattern | Modern | Legacy | Verdict |
|---------|--------|--------|---------|
| Journal trees | 1 shared homepage | 4× `_Component/` copies | PARTIALLY COMPLETE |
| Login forms | `JournalLogin`, BFF routes | 6+ legacy variants | PARTIALLY COMPLETE |
| HTTP client | `fetch` via BFF | `axios` in legacy | PARTIALLY COMPLETE |
| UI primitives | `src/components/ui/` | Inline legacy styles | PASS (modern path) |

**Largest files (legacy, deferred):** `Filter.tsx` (767 lines), `Editorial.tsx` (724 lines).

### 2.4 Technical Debt

Documented in `TECHNICAL_DEBT.md`. Key items: legacy duplication, in-memory rate limit/audit, npm vulns, uncommitted v1.1 work.

### 2.5 Dependencies

| Package | Version | Status |
|---------|---------|--------|
| Next.js | ^14.2.4 | PASS — pinned policy |
| React | ^18.3.1 | PASS |
| TypeScript | ^5 | PASS |
| Vitest | ^3.2.4 | PASS |
| npm audit | 8 vulns | PARTIALLY COMPLETE — safe fix limited |

**Removed (Phase 9):** antd, framer-motion — verified absent from `package.json`. **PASS**

### 2.6 Bundle & Assets

- First Load JS shared: **87.4 kB** (build 2026-07-10)
- Middleware: 27.9 kB
- Paper pages: ~110 kB first load
- Legacy submit pages: up to 158 kB

**Largest images:** Not measured this session; prior audits flag `logo.png` (~570 KB) for WebP compression. **PARTIALLY COMPLETE**

### 2.7 Dead Code

Publishing/editorial/email/AI modules are **intentional scaffolds** (ADR-012, ADR-013) — marked **DOCUMENTED ONLY**, not dead code.

### 2.8 Type Safety

`tsc --noEmit` exit 0. Zod validation on API inputs (login verified). **PASS**

---

## 3. Security Audit

| Control | Status | Evidence |
|---------|--------|----------|
| Authentication | PASS | BFF login → Render API → httpOnly cookies |
| Authorization | **NOT IMPLEMENTED** (RBAC) | Middleware checks token only; no role gate on `/dashboard/editor` |
| CSRF | PASS | Double-submit cookie; `requireCsrf()` on mutations |
| Rate limiting | PARTIALLY COMPLETE | Per-IP in-memory; 429 with Retry-After |
| CSP | PARTIALLY COMPLETE | Present; allows `unsafe-inline`, `unsafe-eval` |
| Cookie security | PASS | httpOnly, secure in prod, sameSite lax/strict |
| Security headers | PASS | X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy |
| Input validation | PASS | Zod + sanitize helpers |
| Output encoding | PASS | React default; XML escape in RSS |
| Secrets in repo | PASS | No `.env` committed; `.env.example` exists |
| Session management | PARTIALLY COMPLETE | 7-day cookie + legacy localStorage dual path |
| Audit logging | PARTIALLY COMPLETE | In-memory buffer; login/search emit events |
| Dependency vulns | FAIL (dev tooling) | 8 npm audit; glob/eslint-config-next chain |

**Security score: 82/100** — aligns with prior V1.1 audit (88) adjusted for RBAC gap and unverified pentest.

---

## 4. Performance Audit

**Source:** `lighthouse-prod-final.json` (mobile, 2026-07-09, https://pub.dhe.org.in/)

| Metric | Value | Assessment |
|--------|-------|------------|
| Lighthouse Performance | 92 | PASS |
| LCP | 2.8 s | PARTIALLY COMPLETE (target ≤2.5 s) |
| FCP | 2.1 s | PASS |
| CLS | 0 | PASS |
| TBT | 84 ms | PASS |
| TTI | 4.6 s | Acceptable |
| INP | Not isolated in report | — |

**Architecture:** Static prerender for paper pages (○ static in build output). Server components on modern routes. **PASS**

**Caching:** Vercel CDN; no custom cache headers audited this session. **PARTIALLY COMPLETE**

---

## 5. SEO Audit

| Element | Status | Evidence |
|---------|--------|----------|
| Page metadata | PASS | `buildMetadata()` |
| Canonical | PASS | Per-page via hreflang helper |
| hreflang | PASS | en-IN / hi-IN journal pairs |
| JSON-LD | PASS | Organization + Website in layout |
| RSS | PASS | `/feed.xml/route.ts` |
| robots.txt | PASS | Live + disallows `/dashboard/`, `/api/` |
| sitemap.xml | PASS | `sitemap.ts` + `sitemap-urls.ts` |
| Scholar meta | PASS | Required tags verified production |
| OpenGraph | PASS | `opengraph-image.tsx` |
| Twitter Cards | PASS | Via metadata helper |
| Breadcrumbs | PARTIALLY COMPLETE | Paper pages; not universal |
| Structured data (Article) | PARTIALLY COMPLETE | Scholar meta yes; Schema.org Article not on all pages |

**SEO score: 94/100**

---

## 6. Accessibility Audit

| Criterion | Status | Evidence |
|-----------|--------|----------|
| Lighthouse a11y | 96 | Production homepage |
| Skip link | PASS | `layout.tsx` |
| Keyboard nav (modern UI) | PARTIALLY COMPLETE | Not manually tested all routes |
| Focus order | PARTIALLY COMPLETE | Lighthouse heading-order flagged |
| Heading hierarchy | PARTIALLY COMPLETE | Some legacy pages unverified |
| ARIA | PARTIALLY COMPLETE | Dashboard tables use `scope="col"` |
| Color contrast (WCAG 2.2 AA) | **FAIL (partial)** | Lighthouse color-contrast score 0 |
| Forms | PASS | Modern submission wizard |
| Reduced motion | PASS | `globals.css` |
| Screen readers | NOT VERIFIED | No manual NVDA/JAWS session |

**Accessibility score: 85/100** — automated strong; full WCAG 2.2 AA not certified.

---

## 7. Academic Publishing Audit

### 7.1 Indexing & Metadata Readiness

| Service | Status | Readiness | Evidence |
|---------|--------|-----------|----------|
| Google Scholar | **READY FOR ACTIVATION** | ~85% | Required meta PASS; inclusion not confirmed |
| ISSN 2278-1757 | **PASS** | Registered in CMS | `content/site.json` |
| Crossref | **NOT IMPLEMENTED** | ~15% | Empty DOI prefix; placeholder deposit |
| DOAJ | **PARTIALLY COMPLETE** | ~50% | OA policy text; no application |
| OpenAlex | **PARTIALLY COMPLETE** | ~40% | No metadata export endpoint |
| Dimensions | **NOT IMPLEMENTED** | ~15% | Requires Crossref |
| BASE / CORE | **NOT IMPLEMENTED** | ~45% | Requires OAI-PMH |
| UGC CARE | **NOT IMPLEMENTED** | ~20% | Manual application |
| Scopus | **NOT APPLICABLE** | ~10% | Needs multi-year track record |
| Web of Science | **NOT APPLICABLE** | ~10% | Application + track record |

### 7.2 Protocols & Identifiers

| Protocol | Status |
|----------|--------|
| DOI | **NOT IMPLEMENTED** — `doiPrefix: ""` |
| ORCID | **READY FOR ACTIVATION** — `orcidEnabled: true`, no OAuth route |
| OAI-PMH | **NOT IMPLEMENTED** — no endpoint |
| Dublin Core | **DOCUMENTED ONLY** |
| JATS XML | **NOT IMPLEMENTED** |
| Crossmark | **NOT IMPLEMENTED** |

### 7.3 Data Quality Issue

Paper JSON files use `"DOI"` key for **Creative Commons license text**, not a DOI identifier. This is misleading metadata and should be corrected before Crossref activation.

### 7.4 Ethics & Policies

| Policy | Status | Location |
|--------|--------|----------|
| Open Access (CC BY 4.0) | PARTIALLY COMPLETE | `/about#open-access` |
| Peer Review | PARTIALLY COMPLETE | `/about#peer-review` |
| Publication Ethics | PARTIALLY COMPLETE | `/about#ethics` |
| COPE alignment | **NOT VERIFIED** | No COPE membership cited |
| Plagiarism policy | PARTIALLY COMPLETE | Mentioned; no tool integration |
| Copyright & Licensing | PARTIALLY COMPLETE | CC BY on about; inconsistent in paper JSON |
| Data Availability | **NOT IMPLEMENTED** | No standalone policy |
| AI Usage Policy | **NOT IMPLEMENTED** | — |
| Archiving (LOCKSS/CLOCKSS) | **NOT IMPLEMENTED** | — |

**Publishing readiness score: 42/100**

---

## 8. Editorial Audit

| Workflow stage | UI | Backend / Engine | Status |
|----------------|-----|------------------|--------|
| Submission | Modern wizard + legacy forms | Render API | PARTIALLY COMPLETE |
| Screening | Dashboard placeholder | NOT IMPLEMENTED | DOCUMENTED ONLY |
| Editor assignment | Legacy AddArticle/table | Render API partial | PARTIALLY COMPLETE |
| Reviewer assignment | Reviewer dashboard shell | NOT IMPLEMENTED | DOCUMENTED ONLY |
| Blind review | Claimed in copy | NOT VERIFIED | PARTIALLY COMPLETE |
| Revision / Decision | UI panels | `canTransition()` types only | DOCUMENTED ONLY |
| Copy editing / Proof | NOT IMPLEMENTED | — | NOT IMPLEMENTED |
| Publication | Static paper JSON | Manual | PARTIALLY COMPLETE |
| Archive | NOT IMPLEMENTED | — | NOT IMPLEMENTED |
| Audit logs | Login, search | In-memory | PARTIALLY COMPLETE |

**Editor experience:** `EditorDashboard` links to legacy routes (`AddArticle`, `issues`, `table`) — functional but not unified workflow.

**Author experience:** Submission wizard requires legacy localStorage auth token — dual auth path.

**Reviewer experience:** `/dashboard/reviewer` — descriptive shell; assignments not verified against backend.

---

## 9. CMS & Dashboards

| Component | Status | Evidence |
|-----------|--------|----------|
| File CMS loader | PASS | `src/lib/cms/loader.ts`, tests |
| Site config | PASS | `content/site.json` |
| Author dashboard | PARTIALLY COMPLETE | UI present |
| Editor dashboard | PARTIALLY COMPLETE | Links to legacy tools |
| Admin dashboard | PARTIALLY COMPLETE | UI shell |
| Reviewer dashboard | PARTIALLY COMPLETE | UI shell |
| Visual CMS admin | NOT IMPLEMENTED | Phase 8+ design |

---

## 10. Authentication & API

### Auth Flow

1. POST `/api/auth/login` → Render backend → httpOnly cookies + CSRF rotation
2. Legacy flows also use `localStorage` (`LEGACY_STORAGE_KEYS`)
3. Middleware protects `/dashboard`, `/profile` — token presence only

### API Routes (14)

| Route | Method | CSRF | Validated |
|-------|--------|------|-----------|
| `/api/auth/login` | POST | ✅ | Zod |
| `/api/auth/logout` | POST | ✅ | — |
| `/api/auth/signup` | POST | ✅ | Zod |
| `/api/auth/session` | GET | — | — |
| `/api/auth/forgot-password` | POST | ✅ | Zod |
| `/api/search` | GET/POST | ✅ | — |
| `/api/contact` | POST | ✅ | Zod |
| `/api/manuscripts` | * | ✅ | — |
| `/api/cms` | GET | — | — |
| `/api/csrf` | GET | — | — |
| `/api/health` | GET | — | — |

**API documentation:** `docs/API_REFERENCE.md` — **PASS**

---

## 11. DevOps Audit

| Item | Status | Evidence |
|------|--------|----------|
| CI/CD | PARTIALLY COMPLETE | GitHub Actions: test, lint, qa:papers, build |
| CI branch coverage | FAIL | `release/v1.0.1-maintenance` not in triggers |
| Git strategy | PASS | SemVer tags, maintenance branch |
| Versioning | PARTIALLY COMPLETE | Tag v1.0.1; prod on older commit |
| Rollback | PASS | Documented in DEPLOYMENT.md |
| Health checks | PASS | `/api/health` live |
| Monitoring | NOT IMPLEMENTED | Sentry stub |
| Logging | PARTIALLY COMPLETE | Console + audit buffer |
| Error tracking | NOT IMPLEMENTED | Stub only |
| Environment variables | PASS | Documented in DEPLOYMENT.md |
| Deployment | PASS | Vercel bom1, redirects for legacy domains |

**Deploy drift (critical finding):** Production health reports `"version":"0c7f48d"` while repository is at v1.0.1 with additional commits. Maintenance and V2 docs may not be deployed.

---

## 12. Documentation Audit

| Document | Complete | Accurate |
|----------|----------|----------|
| README | ✅ | ✅ |
| PROJECT_CHARTER | ✅ | ✅ |
| ARCHITECTURE | ✅ | ✅ |
| ADR (17) | ✅ | ✅ |
| API_REFERENCE | ✅ | ✅ |
| SECURITY | ✅ | ✅ |
| DEPLOYMENT | ✅ | ✅ |
| CMS, SEO, DASHBOARDS | ✅ | ✅ |
| ROADMAP, V2_ROADMAP | ✅ | ✅ |
| TROUBLESHOOTING | ✅ | ✅ |
| CHANGELOG | ✅ | ✅ |
| RELEASE / V2 execution docs | ✅ | ✅ |

**Minor issue:** Duplicate filenames (`Architecture.md` vs `ARCHITECTURE.md`).

**Documentation score: 92/100**

---

## 13. Testing Audit

| Layer | Coverage | Status |
|-------|----------|--------|
| Unit (lib/) | ~89% critical modules | PASS |
| Integration (API CSRF) | 2 tests | PARTIALLY COMPLETE |
| Regression (papers) | 20 tests | PASS |
| E2E (Playwright) | None | NOT IMPLEMENTED |
| Smoke (HTTP) | Script exists | NOT RE-VERIFIED prod |
| Scholar verification | Script exists | PASS (prod sample) |

---

## 14. Observability

| Capability | Status |
|------------|--------|
| `/api/health` | PASS — live |
| Structured logging | PARTIALLY COMPLETE |
| Audit trail | PARTIALLY COMPLETE — ephemeral |
| Sentry | READY FOR ACTIVATION |
| OpenTelemetry | NOT IMPLEMENTED |
| Prometheus/Grafana | NOT IMPLEMENTED |

---

## 15. Internationalization

| Aspect | Status |
|--------|--------|
| Hindi content (vbh, vih journals) | PASS |
| Devanagari font | PASS — Noto Sans Devanagari |
| hreflang en-IN / hi-IN | PASS |
| Full i18n framework (next-intl etc.) | NOT IMPLEMENTED |
| RTL support | NOT IMPLEMENTED |
| Locale routing | NOT IMPLEMENTED |

**Assessment:** Bilingual content with SEO alternates — **PARTIALLY COMPLETE**, not full i18n.

---

## 16. Compliance

| Standard | Status |
|----------|--------|
| HTTPS | PASS |
| Cookie consent (GDPR) | NOT VERIFIED |
| Privacy policy page | NOT VERIFIED this session |
| WCAG 2.2 AA | PARTIALLY COMPLETE |
| COPE | NOT VERIFIED |
| UGC CARE | NOT APPLICABLE until application |

---

## 17. Risk Analysis

See [RISK_REGISTER.md](./RISK_REGISTER.md). Top risks from certification perspective:

| Risk | Severity | Category |
|------|----------|----------|
| Building unused V2 features before pilot | Critical | Product |
| Deploy drift (prod behind repo) | High | Operations |
| No RBAC on editorial dashboards | High | Security |
| False indexing claims (DOAJ listed in UI but not indexed) | Medium | Publishing |
| Dual auth path (cookies + localStorage) | Medium | Security |
| Paper JSON DOI field misuse | Medium | Data quality |

---

## 18. Honesty Matrix (Summary)

| Category | PASS | PARTIAL | DOC ONLY | NOT IMPL |
|----------|-----:|--------:|---------:|---------:|
| Website / Portal | 12 | 4 | 0 | 1 |
| Security | 6 | 5 | 0 | 1 |
| Publishing / Indexing | 2 | 4 | 4 | 8 |
| Editorial | 0 | 4 | 3 | 4 |
| DevOps / Ops | 4 | 4 | 0 | 2 |

---

## 19. Requirements to Reach LEVEL 4

1. **Crossref DOI prefix** registered and configured in CMS
2. **OAI-PMH 2.0** public endpoint with Dublin Core
3. **Operational editorial workflow** — submission through publication with audit trail
4. **Transactional email** — review invitations, decisions, reminders
5. **Standalone editorial policies** — OA, peer review, ethics (COPE-aligned), plagiarism, copyright, data, AI usage
6. **Google Scholar inclusion** confirmed (not just meta-ready)
7. **ORCID** author linking (sandbox → production)
8. **RBAC** on dashboard routes
9. **Persistent audit logs**
10. **Operational pilot** completed with signed `PILOT_FEEDBACK_REPORT.md`
11. **Production deployed** to certified release (v1.0.2+)
12. **DOAJ application** when eligible

---

## 20. Requirements to Reach LEVEL 5

All LEVEL 4 items plus V2 Phases 7–12: object storage, enhanced search, full observability stack, PostgreSQL migration (executed), indexing in major databases (multi-year), on-prem AI interfaces, visual CMS — estimated 12–24 months per V2 roadmap.

---

## 21. Deliverables Index

| Document | Purpose |
|----------|---------|
| [CERTIFICATION_SCORECARD.md](./CERTIFICATION_SCORECARD.md) | Scores by domain |
| [PRODUCTION_READINESS_CERTIFICATE.md](./PRODUCTION_READINESS_CERTIFICATE.md) | Formal LEVEL 3 certificate |
| [OPEN_ITEMS.md](./OPEN_ITEMS.md) | Tracked gaps P0–P3 |
| [RECOMMENDED_NEXT_RELEASE.md](./RECOMMENDED_NEXT_RELEASE.md) | Release sequencing |
| This document | Full audit record |

---

## 22. Auditor Conclusion

The Viksit Bharat Journal platform earns **LEVEL 3 — Production Ready** certification as a **public academic journal website**. Engineering quality, documentation, SEO, and Scholar metadata preparation are **above average** for regional journal platforms.

It **does not** qualify as **International Publishing Ready** or **Enterprise Academic Publishing Platform** until publishing integrations, editorial lifecycle automation, and indexing prerequisites are implemented and verified with credentials — following the operational pilot prescribed in ADR-017.

**Recommended immediate action:** Operational pilot + v1.0.2 deploy alignment — not V2 code.

---

*Audit performed without code changes. Production smoke suite not re-run against live URL in this session.*
