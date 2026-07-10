# Editorial Pilot Summary

**Status:** Template — complete when pilot ends  
**Pilot period:** _YYYY-MM-DD_ → _YYYY-MM-DD_  
**Platform version at pilot start:** v1.0.2 (LEVEL 3 certified)  
**Purpose:** Evidence input for **v1.1.0** backlog prioritization

Weekly raw data: [PILOT_FEEDBACK_REPORT.md](./PILOT_FEEDBACK_REPORT.md)

---

## Executive Summary

_One paragraph: pilot goals, duration, participant counts, and overall verdict._

| Verdict | ⬜ Proceed to v1.1.0 planning · ⬜ Extend pilot · ⬜ Revise scope |
|---------|---------------------------------------------------------------------|

---

## Submission Metrics

| Metric | Value |
|--------|------:|
| Total submissions | |
| Submissions screened | |
| Sent to peer review | |
| Accepted | |
| Rejected | |
| Withdrawn | |
| **Acceptance rate** | _%_ |

---

## Timeline Metrics

| Metric | Value | Target |
|--------|------:|--------|
| Average time to first editorial decision | _days_ | |
| Average peer review turnaround | _days_ | 4–6 weeks (stated policy) |
| Average time submission → publication | _days_ | |
| Longest outstanding submission | _days_ | |

---

## People Metrics

| Metric | Value |
|--------|------:|
| Active editors | |
| Active reviewers | |
| Reviewer invitations sent | |
| Reviewer acceptance rate | _%_ |
| Reviewer completion rate | _%_ |
| Author support tickets | |

### Editor workload assessment

_Short narrative: sustainable / overloaded / underutilized._

---

## Author Feedback (Top Themes)

| # | Theme | Frequency | Suggested action | v1.1 priority |
|---|-------|-----------|------------------|---------------|
| 1 | | | | P1 / P2 / P3 |

---

## Reviewer Feedback (Top Themes)

| # | Theme | Frequency | Suggested action |
|---|-------|-----------|------------------|
| 1 | | | |

---

## Top Reported Issues

| ID | Type | Description | Severity | v1.1? |
|----|------|-------------|----------|-------|
| 1 | Bug / UX / Policy | | P0–P3 | Yes / No |

---

## Platform Performance Metrics

| Metric | Value | Source |
|--------|------:|--------|
| Production uptime | _%_ | Vercel / health checks |
| `/api/health` failures | _count_ | Monitoring |
| Lighthouse Performance (homepage) | _score_ | Lighthouse |
| LCP | _s_ | Lighthouse |
| Smoke test pass rate | _/67_ | `qa:smoke` |

---

## SEO & Discovery Metrics

| Metric | Value | Source |
|--------|------:|--------|
| Google Search Console indexed pages | | GSC |
| Crawl errors | | GSC |
| Organic clicks (period) | | GA4 / GSC |
| RSS subscribers | | *(if tracked)* |

---

## Google Scholar Status

| Item | Status |
|------|--------|
| Required `citation_*` meta | ✅ / ❌ |
| Inclusion application submitted | ⬜ |
| Confirmed indexed | ⬜ |
| DOI in meta (when prefix active) | ⬜ |

---

## Security & Dependencies (Pilot Period)

| Item | Count / status |
|------|----------------|
| P0 security incidents | |
| npm audit vulnerabilities (end of pilot) | |
| Dependency patches applied | |

---

## Recommended v1.1.0 Backlog

> **Governance rule:** No feature enters the roadmap because it is technically possible. Every feature must solve a demonstrated operational problem.

Each proposal **must** include all columns below. If evidence is missing, the item stays out of v1.1.

| Rank | Problem (pilot evidence) | Evidence | Expected benefit | Complexity | Ops impact | Priority |
|------|--------------------------|----------|------------------|------------|------------|----------|
| 1 | | | | S / M / L | | P0–P3 |
| 2 | | | | | | |
| 3 | | | | | | |

**Example (good):** "Editors spent ~18% of time on manual citations" → evidence: pilot week 3 editor logs → benefit: reduce manual work → Crossref adapter scoped for v1.3, not assumed.

**Example (reject):** "Let's implement Crossref" with no pilot data.

### Explicitly deferred to V2

| Item | Reason |
|------|--------|
| | Not validated by pilot |

---

## Sign-off

| Role | Name | Date | Approved |
|------|------|------|----------|
| Editor-in-Chief | | | ⬜ |
| Managing Editor | | | ⬜ |
| Technical Lead | | | ⬜ |

**When signed:** Update [PHASE_STATUS.md](./PHASE_STATUS.md) Phase 1 to ✅; begin v1.1.0 planning.

---

## Related

- [PILOT_FEEDBACK_REPORT.md](./PILOT_FEEDBACK_REPORT.md)
- [GOVERNANCE.md](./GOVERNANCE.md)
- [OPERATIONS_MANUAL.md](./OPERATIONS_MANUAL.md)
- [RECOMMENDED_NEXT_RELEASE.md](./RECOMMENDED_NEXT_RELEASE.md)
