# Architecture Decision Records (ADR)

**Project:** Viksit Bharat Journal  
**Format:** Lightweight ADR (context → decision → consequences)  
**Status key:** Accepted · Superseded · Proposed

Record new decisions at the bottom with the next ADR number.

---

## ADR-001: Unified monorepo portal

| Field | Value |
|-------|-------|
| **Status** | Accepted |
| **Date** | 2026 (Phases 1–6) |

**Context:** Four separate journal sites (`vbe.rase.co.in`, etc.) fragmented SEO, branding, and maintenance.

**Decision:** Single Next.js app at `pub.dhe.org.in` with short journal entry routes (`/vbe`, `/vbh`, `/vie`, `/vih`) and preserved legacy paths (`/vbe.rase/*`, etc.).

**Consequences:**
- (+) One deploy, one design system, unified sitemap
- (+) Legacy domains redirect via `vercel.json`
- (−) Large codebase with dual modern/legacy component trees

---

## ADR-002: File-based CMS (no headless CMS)

| Field | Value |
|-------|-------|
| **Status** | Accepted |
| **Date** | 2026 |

**Context:** Site settings, FAQs, announcements, editorial board need editing without a database admin UI initially.

**Decision:** Store content in `content/*.json`, loaded by `src/lib/cms/loader.ts`. Git is source of truth.

**Consequences:**
- (+) Zero CMS infrastructure cost; version-controlled content
- (+) Simple preview via `/api/cms`
- (−) Non-technical editors need Git or future admin UI
- (−) No runtime CMS without redeploy (except backend manuscripts)

---

## ADR-003: Backend-for-Frontend (BFF) on Next.js

| Field | Value |
|-------|-------|
| **Status** | Accepted |
| **Date** | 2026 |

**Context:** Render backend (`vie-rase-backend.onrender.com`) exposes auth and manuscripts; browser must not handle tokens insecurely on modern paths.

**Decision:** Next.js `/api/*` routes proxy auth, set httpOnly cookies, validate CSRF. Client uses `secureFetch()` / `apiFetch()`.

**Consequences:**
- (+) Same-origin auth; tokens not in JS on login path
- (+) CSRF + rate limiting at edge middleware
- (−) Legacy components still call backend via `axios` directly (migration debt)
- (−) Cold-start latency on Render free tier

---

## ADR-004: httpOnly cookies over localStorage JWT

| Field | Value |
|-------|-------|
| **Status** | Accepted (with legacy bridge) |
| **Date** | 2026 |

**Context:** Legacy manuscript flows used `localStorage` for `token`, `userId`.

**Decision:** Modern login via `/api/auth/login` sets httpOnly cookies (`token`, `auth-token`, `userId`). `persistLegacyAuth()` bridges to localStorage during migration.

**Consequences:**
- (+) XSS cannot exfiltrate session token from cookies
- (−) Parallel auth stores until legacy migration complete

---

## ADR-005: CSRF double-submit cookie

| Field | Value |
|-------|-------|
| **Status** | Accepted |
| **Date** | 2026 (Phase 8) |

**Context:** Cookie-based auth requires CSRF protection on mutating API routes.

**Decision:** `csrf-token` cookie (readable) + `x-csrf-token` header must match. Enforced in middleware and `requireCsrf()` helper.

**Consequences:**
- (+) Works with BFF pattern; no server-side session store required
- (+) Edge-compatible token generation
- (−) Client must bootstrap CSRF via `CsrfBootstrap` before mutations

---

## ADR-006: Twenty immutable paper JSON files

| Field | Value |
|-------|-------|
| **Status** | Accepted |
| **Date** | 2026 (migration) |

**Context:** Platform redesign must not break published article URLs or Google Scholar indexing.

**Decision:** Exactly 20 files: `src/app/{vbe,vbh,vie,vih}.rase/output/Paper{1-5}.json`. Verified by `npm run qa:papers`. Never delete or rename routes.

**Consequences:**
- (+) Stable Scholar URLs and citation metadata
- (+) CI gate on paper integrity
- (−) New papers require explicit process (future publishing module)

---

## ADR-007: Legacy component preservation

| Field | Value |
|-------|-------|
| **Status** | Accepted |
| **Date** | 2026 |

**Context:** ~168 legacy files in `src/app/component/*_Component/` power manuscript submission on `*.rase` routes.

**Decision:** Do not remove legacy tree until feature parity in `src/components/submission/`. New work goes in `src/components/` + `src/lib/`.

**Consequences:**
- (+) Zero regression on legacy journal workflows
- (−) 4× duplicated journal components; larger bundles on legacy routes
- (−) `axios` + Font Awesome remain until migration

---

## ADR-008: Vercel deployment (bom1) + host redirects

| Field | Value |
|-------|-------|
| **Status** | Accepted |
| **Date** | 2026 |

**Context:** Primary audience in India; legacy domains must redirect to unified platform.

**Decision:** Deploy on Vercel region `bom1`. Legacy host rules in `vercel.json` + standalone redirect projects in `scripts/legacy-redirects/`.

**Consequences:**
- (+) Low latency for Indian users
- (+) Automatic preview deploys per branch
- (−) In-memory rate limits not shared across instances (see ADR-011)

---

## ADR-009: In-memory rate limiting (interim)

| Field | Value |
|-------|-------|
| **Status** | Accepted (interim) |
| **Date** | 2026 (Phase 8) |

**Context:** Need per-route rate limits without adding Redis immediately.

**Decision:** `src/lib/security/rate-limit.ts` — in-memory Map in middleware.

**Consequences:**
- (+) Zero infra cost; effective on single instance
- (−) Not distributed across Vercel edge instances
- **Future:** Upstash Redis (documented in ROADMAP)

---

## ADR-010: Remove antd and framer-motion

| Field | Value |
|-------|-------|
| **Status** | Accepted |
| **Date** | 2026 (Phase 9) |

**Context:** Homepage bundle ~148 kB; antd pulled into legacy card components.

**Decision:** Remove `antd` and `framer-motion`. Replace with Tailwind + native HTML (`<details>`, static stats).

**Consequences:**
- (+) Homepage First Load JS 148 kB → 107 kB
- (+) LCP improved (7s → 2.4s local)
- (−) No animation on stats section (acceptable tradeoff)

---

## ADR-011: Vitest for critical lib modules

| Field | Value |
|-------|-------|
| **Status** | Accepted |
| **Date** | 2026 (v1.0.1) |

**Context:** No automated unit tests; only QA scripts for papers and smoke.

**Decision:** Vitest 3.x with tests on `src/lib/security`, `search`, `research`, `seo`, `cms`, `qa`, plus paper regression suite.

**Consequences:**
- (+) 58 tests; ~89% line coverage on critical modules
- (+) CI runs `npm run test`
- (−) No E2E Playwright yet (v1.1.x planned)

---

## ADR-012: Provider-agnostic AI registry

| Field | Value |
|-------|-------|
| **Status** | Accepted |
| **Date** | 2026 (Phase 7–8) |

**Context:** Future AI features must not lock to OpenAI or external APIs.

**Decision:** `src/lib/ai/registry.ts` — module IDs with `enabled: false` placeholders. Self-hosted/on-prem activation later.

**Consequences:**
- (+) Admin dashboard can display roadmap modules
- (+) No runtime AI dependencies today
- (−) No AI functionality until infrastructure exists

---

## ADR-013: Identifiers and publishing scaffolds

| Field | Value |
|-------|-------|
| **Status** | Accepted |
| **Date** | 2026 |

**Context:** Crossref, DOI, ORCID, OAI-PMH planned for v1.3.x.

**Decision:** `src/lib/identifiers/registry.ts` and `src/lib/publishing/metadata.ts` as typed placeholders. ISSN `2278-1757` registered in CMS and Scholar meta now.

**Consequences:**
- (+) JSON-LD and Scholar meta include ISSN
- (−) DOI prefix empty until Crossref membership

---

## ADR-014: Semantic versioning release strategy

| Field | Value |
|-------|-------|
| **Status** | Accepted |
| **Date** | 2026-07-10 |

**Context:** Platform reached production; need predictable release lanes.

**Decision:**

| Version | Scope |
|---------|--------|
| v1.0.x | Fixes, safe deps, security patches, perf |
| v1.1.x | Testing, monitoring, DX |
| v1.2.x | Next.js 15+ framework upgrade |
| v1.3.x | DOI, ORCID, Crossref |
| v2.x | AI ecosystem |

**Consequences:** Documented in [PROJECT_CHARTER.md](./PROJECT_CHARTER.md), [RELEASE.md](./RELEASE.md), [ROADMAP.md](./ROADMAP.md).

---

## ADR-015: Safe dependency maintenance policy

| Field | Value |
|-------|-------|
| **Status** | Accepted |
| **Date** | 2026-07-10 (v1.0.1) |

**Context:** npm audit reported 9 vulnerabilities; `--force` would jump to Next 16.

**Decision:** Never `npm audit fix --force`. Patch/minor updates only in v1.0.x. Major Next upgrade planned separately ([NEXTJS_UPGRADE_PLAN.md](./NEXTJS_UPGRADE_PLAN.md)).

**Consequences:**
- (+) v1.0.1 reduced vulns 9 → 8 safely
- (−) Next.js framework advisories remain until v1.2.x

---

## ADR-016: V2 enterprise publishing strategy

| Field | Value |
|-------|-------|
| **Status** | Accepted |
| **Date** | 2026-07-10 |

**Context:** Core software engineering (Phases 0–9, v1.0.1) is substantially complete. Remaining gap is academic ecosystem integration (Crossref, ORCID, editorial lifecycle, storage, indexing) — not UI rewrites.

**Decision:** V2 documented in [V2_ROADMAP.md](./V2_ROADMAP.md). Adapter-based integrations only; mark **Ready for Activation** without credentials. Run 4–8 weeks real editorial operations before phase prioritization.

**Consequences:**
- (+) Eight V2 design docs guide incremental activation of existing `src/lib/` scaffolds
- (+) No fabricated live integrations
- (−) Full publishing infrastructure estimated 12–24 months

---

## ADR-017: Operational pilot gate before V2 implementation

| Field | Value |
|-------|-------|
| **Status** | Accepted |
| **Date** | 2026-07-10 |

**Context:** Platform is production-stable (v1.0.1) with ~90–95% core engineering complete. The greatest remaining risk is implementing integrations and workflow features that real editors, authors, and reviewers do not need.

**Decision:** V2 feature implementation is **blocked** until Phase 1 operational pilot completes:

1. Run production with real users for 4–8 weeks
2. Collect observations in [PILOT_FEEDBACK_REPORT.md](./PILOT_FEEDBACK_REPORT.md)
3. Sign off with editorial and engineering leads
4. Re-prioritize V2 phases 2–12 from pilot evidence

During pilot: v1.0.x maintenance only (bug fixes, security patches). No new V2 features. Operational prerequisites (Crossref application, editorial policies, Search Console) proceed in parallel.

**Consequences:**
- (+) Reduces rework and unused features
- (+) Aligns engineering with validated workflows
- (+) Execution prompt and trackers documented in [V2_EXECUTION_PROMPT.md](./V2_EXECUTION_PROMPT.md)
- (−) V2 timeline starts after pilot, not immediately

---

## ADR-018: Independent certification audit (LEVEL 3)

| Field | Value |
|-------|-------|
| **Status** | Accepted |
| **Date** | 2026-07-10 (v1.0.2) |

**Context:** Platform reached production stability (v1.0.1). An independent multi-disciplinary audit was required to certify readiness without assuming prior PASS claims.

**Decision:** Conduct full certification audit documented in [FINAL_CERTIFICATION_AUDIT.md](./FINAL_CERTIFICATION_AUDIT.md). Classify platform as **LEVEL 3 — Production Ready** (76/100). Not certified as LEVEL 4 (international publishing) until DOI, OAI-PMH, editorial engine, and pilot complete.

**Consequences:**
- (+) Formal certificate: [PRODUCTION_READINESS_CERTIFICATE.md](./PRODUCTION_READINESS_CERTIFICATE.md)
- (+) Open items tracked in [OPEN_ITEMS.md](./OPEN_ITEMS.md)
- (+) v1.0.2 documentation-only release; no feature code in certification branch
- (−) LEVEL 4 requirements documented but not met

---

## ADR-019: Governance and operations documentation (v1.0.3)

| Field | Value |
|-------|-------|
| **Status** | Accepted |
| **Date** | 2026-07-10 |

**Context:** Platform certified LEVEL 3 (v1.0.2). Long-term operation requires documented governance beyond the engineering charter.

**Decision:** Publish [GOVERNANCE.md](./GOVERNANCE.md) and [OPERATIONS_MANUAL.md](./OPERATIONS_MANUAL.md) as v1.0.3 documentation-only release, separate from v1.0.2 certification for audit clarity.

**Consequences:**
- (+) Clear editorial vs technical decision boundaries
- (+) Engineering freeze formalized during pilot
- (+) Release cadence: v1.0.2 cert → v1.0.3 ops → pilot → v1.1.0 evidence-driven

---

## Template for new ADRs

```markdown
## ADR-NNN: Title

| Field | Value |
|-------|-------|
| **Status** | Proposed / Accepted / Superseded |
| **Date** | YYYY-MM-DD |

**Context:** …

**Decision:** …

**Consequences:** …
```

---

## Related

- [FINAL_CERTIFICATION_AUDIT.md](./FINAL_CERTIFICATION_AUDIT.md)
- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [PROJECT_CHARTER.md](./PROJECT_CHARTER.md)
- [V2_ROADMAP.md](./V2_ROADMAP.md)
- [ROADMAP.md](./ROADMAP.md)
