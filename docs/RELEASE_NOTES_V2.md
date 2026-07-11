# Release Notes — V2.0 (Draft)

**Status:** Placeholder — populate as phases complete  
**Target:** v2.0.0 (after Phase 10 design approval and phased integration delivery)  
**Current production:** v1.0.1

Do not publish this document until V2 phases pass verification gates.

---

## v2.0.0 — Enterprise Publishing Ecosystem (Planned)

### Highlights

_To be filled when V2 reaches release candidate._

- Full editorial workflow engine (submission → archive)
- Crossref DOI registration (when credentials configured)
- ORCID author linking
- OAI-PMH metadata harvesting
- Provider-agnostic email, storage, and observability
- Enhanced search with facets and analytics
- AI-ready interfaces (no external API dependency)

---

## Phase Release Mapping (Tentative)

| Version | Phases | Notes |
|---------|--------|-------|
| v1.0.x | — | Maintenance during pilot |
| v1.1.x | Observability partial, tests | Engineering excellence |
| v1.2.x | — | Next.js 15 upgrade |
| v1.3.x | 4–6 | DOI, ORCID, OAI-PMH |
| v1.4.x | 2–3 | Email + editorial |
| v1.5.x | 7–8 | Storage + search |
| v2.0.0 | 9–12 | Full observability, DB plan, indexing, AI interfaces |

Phases may shift based on [PILOT_FEEDBACK_REPORT.md](./PILOT_FEEDBACK_REPORT.md).

---

## Breaking Changes

_None planned._ V2 preserves:

- 20 immutable paper JSON files and URLs
- Legacy journal routes and redirects
- Existing API contracts (extensions only)

---

## Migration Notes

_To be filled for each phase._

---

## Verification Checklist (Required for v2.0.0 GA)

- [ ] All completed phases pass lint, tsc, build, qa, test, smoke
- [ ] [INTEGRATION_STATUS.md](./INTEGRATION_STATUS.md) accurate — no false Live claims
- [ ] [PHASE_STATUS.md](./PHASE_STATUS.md) all targeted phases ✅
- [ ] Security review per phase
- [ ] Rollback plan documented
- [ ] CHANGELOG updated
- [ ] Production deployment verified on https://pub.dhe.org.in

---

## Related

- [CHANGELOG.md](./CHANGELOG.md)
- [RELEASE.md](./RELEASE.md)
- [V2_EXECUTION_REPORT.md](./V2_EXECUTION_REPORT.md)
