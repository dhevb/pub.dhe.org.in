# Governance — Viksit Bharat Journal

**Version:** 1.0  
**Effective:** 2026-07-10  
**Complements:** [PROJECT_CHARTER.md](./PROJECT_CHARTER.md) (engineering constitution)

This document defines **how decisions are made** over the lifetime of the platform — editorially and technically. The Project Charter governs engineering behavior; this document governs **organizational process**.

---

## 1. Vision and Mission

### Vision

To become Bharat's leading indigenous multidisciplinary research publishing ecosystem — journals, conference proceedings, Bal Shodh Patrika, books, repositories, and institutional publications with world-class standards and Bharatiya identity.

### Mission

Democratize research publication: affordable, ethical, open access for students, teachers, researchers, innovators, and independent scholars — with production-grade technology and editorial integrity.

### Strategic principle (2026–2027)

**Operate before you build.** Real editorial pilot evidence guides V2 priorities. See ADR-017, [PHASE_STATUS.md](./PHASE_STATUS.md), [OPERATIONS_MANUAL.md](./OPERATIONS_MANUAL.md).

---

## 2. Editorial Governance

### Authority

| Role | Responsibility |
|------|----------------|
| **Editor-in-Chief** | Publication standards, ethics, final policy approval |
| **Managing Editor** | Day-to-day editorial operations, pilot coordination |
| **Editorial Board** | Scope, peer review quality, acceptance decisions |
| **Publisher** (DHE) | ISSN, Crossref membership, legal/compliance |

### Editorial decisions

- Acceptance, rejection, and revision requests are **editorial**, not engineering decisions.
- Engineering implements workflows; editorial board defines policy.
- Policies must be published standalone (Open Access, Peer Review, Ethics, Plagiarism, Copyright, Data Availability, AI Usage) before DOAJ/Crossref applications.

### Pilot period (Phase 1)

- Duration: **4–8 weeks** minimum with real submissions.
- Feedback recorded in [PILOT_FEEDBACK_REPORT.md](./PILOT_FEEDBACK_REPORT.md).
- **Sign-off required** from Editor-in-Chief + Technical Lead before V2 implementation.

### Measurable outcomes (post-pilot)

Prioritize engineering from evidence:

| Metric | Source |
|--------|--------|
| Submissions received | Editorial records |
| Acceptance rate | Editorial records |
| Review turnaround time | Editorial records |
| Editor workload | Weekly pilot notes |
| Reviewer response rate | Editorial records |
| Author support requests | Support inbox |
| Search traffic / indexing | Search Console, Scholar |
| Lighthouse / uptime | `/api/health`, Vercel |
| User-reported bugs | OPEN_ITEMS, pilot report |
| Feature requests | Pilot report (ranked) |

---

## 3. Technical Governance

### Authority

| Role | Responsibility |
|------|----------------|
| **Technical Lead / Principal Architect** | Architecture, release approval, ADRs |
| **Release Engineer** | Versioning, tags, deployment coordination |
| **Security Owner** | Security patches, vulnerability response |
| **DevOps** | Vercel, env vars, monitoring |

### Engineering constitution

All technical work follows [PROJECT_CHARTER.md](./PROJECT_CHARTER.md) and `.cursor/rules/project-constitution.mdc`:

- Never remove papers, routes, or redirects without ADR + approval
- Never break API contracts without version bump + migration plan
- Never `npm audit fix --force`
- Never claim PASS without verification

### Engineering freeze (pilot period)

**Allowed:** Bug fixes (P0/P1), security patches, performance fixes, documentation  
**Deferred:** New features, UI redesign, framework upgrades, DB migration, Crossref/OAI/ORCID automation, AI features

Documented in [OPERATIONS_MANUAL.md](./OPERATIONS_MANUAL.md) and ADR-017.

---

## 4. Release Approval Process

### SemVer lanes

| Version | Scope |
|---------|--------|
| **v1.0.x** | Maintenance, docs, certification, operations handbooks |
| **v1.1.x** | Pilot-driven bug fixes and minor improvements |
| **v1.2.x** | Next.js framework upgrade (planned) |
| **v1.3.x** | First publishing integrations (post-pilot + credentials) |
| **v2.x** | Enterprise publishing ecosystem |

### Approval gates

| Release type | Approvers | Verification |
|--------------|-----------|--------------|
| PATCH (v1.0.x) | Technical Lead | lint, tsc, test, qa, build |
| Certification / docs-only | Technical Lead | No runtime changes; CHANGELOG |
| MINOR (v1.1.x+) | Technical Lead + Editorial (if workflow impact) | Full QA + smoke (prod) |
| MAJOR (v2.x) | Technical Lead + Editorial Board + ADR | Certification re-audit |

### Release artifacts (required)

- `docs/CHANGELOG.md` entry
- `docs/RELEASE_NOTES_vX.Y.Z.md` for semver bumps
- Git annotated tag `vX.Y.Z`
- Post-deploy smoke results archived (production releases)

### Current releases

| Version | Status | Purpose |
|---------|--------|---------|
| v1.0.2 | Released (certification) | LEVEL 3 audit documentation |
| v1.0.3 | In progress | Operations + governance documentation |
| v1.1.0 | Planned post-pilot | Pilot-driven improvements |

---

## 5. Security Disclosure Policy

### Reporting

Report security vulnerabilities to: **pub.dhe4@gmail.com** (or dedicated security contact when assigned).

Include: description, reproduction steps, impact assessment, suggested fix if known.

### Response timeline

| Severity | Target response |
|----------|-----------------|
| Critical (active exploit) | 24 hours |
| High | 72 hours |
| Medium | 2 weeks |
| Low | Next maintenance release |

### Disclosure

- Do **not** disclose publicly until patch is available (coordinated disclosure).
- Credit researchers in CHANGELOG when appropriate.
- Never commit secrets, credentials, or `.env` files.

See [SECURITY.md](./SECURITY.md) for technical controls.

---

## 6. Documentation Ownership

| Document class | Owner | Review cadence |
|----------------|-------|----------------|
| PROJECT_CHARTER, ADRs | Technical Lead | On architectural change |
| OPERATIONS_MANUAL | Release Engineer + Ops | Quarterly |
| GOVERNANCE (this doc) | Technical Lead + Editorial | Annually |
| API_REFERENCE, ARCHITECTURE | Technical Lead | Each API change |
| Editorial policies | Editorial Board | Annually |
| PILOT_FEEDBACK_REPORT | Managing Editor | Weekly during pilot |
| OPEN_ITEMS, TECHNICAL_DEBT | Technical Lead | Monthly |

All documentation lives in `docs/` and is version-controlled in Git.

---

## 7. Change Management

### Classifications

| Class | Examples | Process |
|-------|----------|---------|
| **Standard** | Doc updates, safe deps | PR + CI |
| **Normal** | Bug fix, minor feature | PR + review + QA |
| **Major** | API change, migration, V2 phase | ADR + pilot evidence + extended QA |
| **Emergency** | P0 production fix | Hotfix branch → fast-track → post-mortem |

### Change request sources

1. Pilot feedback (preferred during freeze)
2. OPEN_ITEMS / RISK_REGISTER
3. Security advisories
4. Editorial board requests

### V2 changes

Require: Phase 1 sign-off + credentials (if integration) + phase-by-phase execution per [V2_EXECUTION_PROMPT.md](./V2_EXECUTION_PROMPT.md).

---

## 8. Architecture Decision Record (ADR) Process

### When an ADR is required

- New external integration (Crossref, ORCID, email provider)
- Database migration
- Breaking API or URL change
- Framework major upgrade
- Governance or release policy change
- Anything reversing a prior ADR

### ADR workflow

1. Draft ADR in [ARCHITECTURE_DECISIONS.md](./ARCHITECTURE_DECISIONS.md) — status **Proposed**
2. Review by Technical Lead (and Editorial if user-facing)
3. Status → **Accepted** on merge
4. Implement with reference to ADR number in PR and CHANGELOG
5. Supersede old ADRs when decisions change — never delete history

### Template

See ADR template at end of `ARCHITECTURE_DECISIONS.md`.

---

## 9. Code Review Requirements

### All PRs to `main`

- [ ] CI green (lint, test, qa:papers, build)
- [ ] No secrets committed
- [ ] CHANGELOG updated (if user-visible)
- [ ] Minimal diff — constitution compliance
- [ ] One reviewer minimum (Technical Lead or delegate)

### PRs touching

| Area | Extra requirement |
|------|-------------------|
| `src/app/api/*` | API_REFERENCE update |
| `middleware.ts` / security | SECURITY.md note |
| Paper JSON files | **Forbidden** without explicit board approval |
| `content/site.json` ISSN/DOI | Editorial approval |

### During engineering freeze

Only P0/P1 fixes and documentation PRs merge to `main` unless Editorial + Technical Lead jointly approve exception.

---

## 10. Release Cadence

| Track | Cadence | Notes |
|-------|---------|-------|
| v1.0.x maintenance | As needed | Security, critical bugs |
| Documentation releases | After major doc milestones | e.g. v1.0.2 cert, v1.0.3 ops |
| v1.1.x | After pilot sign-off | Evidence-driven batch |
| V2 phases | One phase at a time | Post-pilot only |

**No fixed monthly feature releases** during pilot — quality and stability over velocity.

---

## 11. Deprecation Policy

### URLs and routes

- **Never remove** legacy journal routes (`/vbe.rase/*`, etc.) without ADR + 12-month redirect plan.
- Deprecated routes receive permanent redirects in `vercel.json` / `next.config.mjs`.

### APIs

- Breaking changes require MAJOR version or parallel `/api/v2` with deprecation header.
- Minimum **6 months** notice in CHANGELOG and API_REFERENCE for external consumers.

### Dependencies

- Remove dependencies only after verification + bundle impact documented.
- Major framework upgrades follow [NEXTJS_UPGRADE_PLAN.md](./NEXTJS_UPGRADE_PLAN.md).

### Features

- Feature flags preferred over removal (`src/lib/monitoring/feature-flags.ts`).
- Pilot may deprecate UI paths; engineering follows editorial evidence.

---

## 12. Long-Term Maintenance Commitments

### Platform commitments (5–10 year horizon)

| Commitment | Mechanism |
|------------|-----------|
| 20 immutable papers preserved | Constitution + `qa:papers` |
| Production URL stability | `pub.dhe.org.in` canonical |
| Legacy domain redirects | `vercel.json` |
| ISSN metadata accuracy | CMS + Scholar meta tests |
| Security patches | v1.0.x maintenance track |
| Documentation currency | OPERATIONS_MANUAL + CHANGELOG |

### Not committed until operational

- Live DOI deposit automation
- OAI-PMH endpoint
- PostgreSQL migration
- 24/7 on-call (assign when team scales)

### Review

Re-assess commitments annually with Editorial Board + Technical Lead.

---

## 13. Related Documents

| Document | Relationship |
|----------|--------------|
| [PROJECT_CHARTER.md](./PROJECT_CHARTER.md) | Engineering constitution |
| [OPERATIONS_MANUAL.md](./OPERATIONS_MANUAL.md) | Day-to-day operations |
| [ARCHITECTURE_DECISIONS.md](./ARCHITECTURE_DECISIONS.md) | ADR log |
| [PHASE_STATUS.md](./PHASE_STATUS.md) | V2 execution tracker |
| [RISK_REGISTER.md](./RISK_REGISTER.md) | Risk matrix |
| [FINAL_CERTIFICATION_AUDIT.md](./FINAL_CERTIFICATION_AUDIT.md) | LEVEL 3 baseline |

---

*Amendments to this document require Technical Lead approval and Editorial acknowledgment for sections affecting publication policy.*
