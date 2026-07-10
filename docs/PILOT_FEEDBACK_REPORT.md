# Operational Pilot Feedback Report

**Status:** Template — collect during 4–8 week pilot  
**Platform:** https://pub.dhe.org.in  
**Version baseline:** v1.0.2 (production verified)  
**Pilot period:** _YYYY-MM-DD_ → _YYYY-MM-DD_

---

## Pilot Exit Criteria

All rows must be satisfied before ending the pilot and opening v1.1 planning. Track weekly in [PROJECT_STATUS.md](./PROJECT_STATUS.md).

| Area | Exit criteria | Met? |
|------|---------------|------|
| **Stability** | No unresolved P0 issues for 2 consecutive weeks | ⬜ |
| **Editorial operations** | Workflow completed for multiple real submissions | ⬜ |
| **Authors** | Feedback collected and categorized | ⬜ |
| **Reviewers** | Feedback collected and categorized | ⬜ |
| **Editors** | Workflow pain points documented | ⬜ |
| **Operations** | Weekly reports completed throughout pilot | ⬜ |
| **Reliability** | Smoke tests consistently 67/67 | ⬜ |
| **Publishing** | Search indexing verified; registration progress documented | ⬜ |

**When all met:** Complete [PILOT_SUMMARY.md](./PILOT_SUMMARY.md) and obtain sign-off below.

**Weekly archive:** Record each Friday in [docs/pilot/](./pilot/) (`week-01.md`, `week-02.md`, …).

---

## Executive Summary

_Summarize pilot goals, participant count, duration, and top 3–5 outcomes._

| Metric | Value |
|--------|-------|
| Editors enrolled | |
| Authors (submissions) | |
| Reviewers active | |
| Submissions processed | |
| Production incidents (P0/P1) | |
| Overall pilot verdict | ⬜ Proceed to V2 Phase 2 · ⬜ Extend pilot · ⬜ Revise scope |

---

## Pre-Pilot Production Baseline (Engineering)

_Filled from engineering audit — update if re-verified._

| Area | Status | Evidence |
|------|--------|----------|
| Production URL | ✅ Live | https://pub.dhe.org.in |
| Version | v1.0.2 | Closed — smoke 67/67 (`c152991`) |
| Smoke tests | ✅ 67/67 | `scripts/qa/smoke.mjs` |
| Google Scholar meta | ✅ Ready | `scripts/qa/verify-scholar.mjs` |
| Lighthouse performance | ~92 | Jul 2026 production |
| Security score | 88/100 | [SECURITY_AUDIT_V1_1.md](./SECURITY_AUDIT_V1_1.md) |
| ISSN | 2278-1757 | `content/site.json` |
| DOI prefix | Empty | Awaiting Crossref |
| Papers (immutable) | 20 JSON | vbe/vbh/vie/vih × Paper1–5 |

---

## Pain Points

### Editors

| # | Description | Severity | Frequency | Suggested fix | V2 phase |
|---|-------------|----------|-----------|---------------|----------|
| 1 | | P0 / P1 / P2 / P3 | Daily / Weekly / Rare | | |

### Authors

| # | Description | Severity | Frequency | Suggested fix | V2 phase |
|---|-------------|----------|-----------|---------------|----------|
| 1 | | | | | |

### Reviewers

| # | Description | Severity | Frequency | Suggested fix | V2 phase |
|---|-------------|----------|-----------|---------------|----------|
| 1 | | | | | |

### Administrators

| # | Description | Severity | Frequency | Suggested fix | V2 phase |
|---|-------------|----------|-----------|---------------|----------|
| 1 | | | | | |

---

## Bugs

| ID | Reporter | Route / feature | Steps to reproduce | Expected | Actual | Severity | Status |
|----|----------|-----------------|-------------------|----------|--------|----------|--------|
| BUG-001 | | | | | | | Open / Fixed / Won't fix |

---

## Feature Requests

| # | Requested by | Description | User value | Engineering effort | Priority | Defer to phase |
|---|--------------|-------------|------------|-------------------|----------|----------------|
| FR-001 | | | High / Med / Low | S / M / L / XL | P1–P3 | |

---

## Performance Issues

| # | Page / API | Metric | Observed | Target | Notes |
|---|------------|--------|----------|--------|-------|
| 1 | | LCP / TTFB / API ms | | | |

---

## Editorial Issues

| # | Stage | Issue | Impact on publication quality | Policy gap? |
|---|-------|-------|------------------------------|-------------|
| 1 | Screening / Review / Decision / Copy-edit | | | Yes / No |

---

## Publishing Issues

| # | Issue | Blocks indexing? | Blocks DOI? | Operational workaround |
|---|-------|------------------|-------------|------------------------|
| 1 | | | | |

---

## Recommendations

### Immediate (v1.0.x — no V2 scope)

1. _Bug fixes and documentation only_

### Short-term (post-pilot, phases 2–6)

1. _Ordered by pilot evidence_

### Medium-term (phases 7–11)

1. 

### Deferred / Out of scope

1. _UI redesign, legacy rewrites, etc._

---

## Phase Prioritization (Post-Pilot)

_Rank V2 execution phases based on pilot evidence, not assumptions._

| Rank | Phase | Rationale from pilot |
|------|-------|---------------------|
| 1 | | |
| 2 | | |
| 3 | | |

---

## Sign-off

| Role | Name | Date | Approved |
|------|------|------|----------|
| Editor-in-Chief | | | ⬜ |
| Managing Editor | | | ⬜ |
| Technical Lead | | | ⬜ |

**When signed:** Update [PHASE_STATUS.md](./PHASE_STATUS.md) Phase 1 to ✅ and unblock Phase 2 planning.

---

## Related

- [V2_EXECUTION_PROMPT.md](./V2_EXECUTION_PROMPT.md)
- [EDITORIAL_WORKFLOW.md](./EDITORIAL_WORKFLOW.md)
- [INDEXING_READINESS.md](./INDEXING_READINESS.md)
