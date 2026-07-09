# Roadmap

Future development priorities for Viksit Bharat Journal.  
Architecture placeholders already exist in `src/lib/` — this roadmap tracks activation.

---

## Completed (Phases 0–9)

| Phase | Deliverable | Status |
|-------|-------------|--------|
| 0–6 | Platform redesign, Bharatiya design system, 32 journal routes | ✅ Deployed |
| 6 | SEO (sitemap, JSON-LD, RSS, Scholar meta), QA scripts | ✅ Deployed |
| 7 | Search, citations, dashboards, architecture modules | ✅ Deployed |
| 8 | CSRF, rate limits, PWA, editorial/email/AI architecture | ✅ Deployed (`87a3647`) |
| 8 | ISSN `2278-1757` registration | ✅ Deployed |
| 9 | Performance: remove antd/framer-motion, LCP 7s→2.4s, bundle −28% | ✅ Local (pending deploy) |

---

## Q3 2026 — Production Excellence

| Item | Priority | Depends on |
|------|----------|------------|
| Deploy Phase 9 performance optimizations | P0 | Git push |
| Production Lighthouse verification on CDN | P0 | Deploy |
| Compress `logo.png` (570 KB → WebP) | P1 | Asset pipeline |
| Redis rate limiting (Upstash) | P1 | Vercel integration |
| Crossref DOI prefix in `site.json` | P1 | Crossref membership |
| ORCID OAuth for author profiles | P2 | ORCID credentials |

---

## Q4 2026 — Editorial Workflow

| Item | Module | Status |
|------|--------|--------|
| Live reviewer assignment API | `src/lib/editorial/` | Architecture ready |
| Review queue backend integration | Editor dashboard | UI ready |
| Email queue (BullMQ/Redis) | `src/lib/email/` | In-memory placeholder |
| Acceptance/rejection notifications | Email templates | Templates defined |
| Manuscript status history | `StatusHistoryEntry` | Types defined |

---

## 2027 — International Indexing

| Standard | Module | Status |
|----------|--------|--------|
| Crossref DOI deposit | `src/lib/publishing/` | Placeholder |
| OAI-PMH 2.0 harvest | `src/lib/publishing/metadata.ts` | Placeholder |
| DataCite for datasets | `src/lib/repository/` | Placeholder |
| Dublin Core / MODS export | `METADATA_EXPORT_FORMATS` | Placeholder |
| UGC CARE application | `src/lib/identifiers/` | Registry entry |
| Scopus / WoS application | Admin workflow | Manual process |

---

## 2027 — Research Ecosystem

| Feature | Module |
|---------|--------|
| Research repository (datasets, code, theses) | `src/lib/repository/` |
| Supplementary files per paper | `RepositoryAsset` types |
| Conference proceedings expansion | Existing proceedings routes |
| Bal Shodh Patrika full workflow | `/bal-shodh-patrika` |
| Books & monographs | `/Books`, `/Journal` |
| Innovation showcase | `innovation` asset type |

---

## 2027 — AI-Assisted Research (On-Prem / Modular)

No external AI APIs in current architecture. Future modules in `src/lib/ai/registry.ts`:

| Module | ID |
|--------|-----|
| Semantic search | `semantic-search` |
| Paper recommendation | `paper-recommendation` |
| Research assistant | `research-assistant` |
| Citation suggestions | `citation-suggestions` |
| Reviewer suggestion | `reviewer-suggestion` |
| Duplicate detection | `duplicate-detection` |
| Plagiarism adapter | `plagiarism-adapter` |

Activation requires self-hosted model infrastructure.

---

## 2027 — Multi-Journal Platform

Architecture supports without major rewrites:

- Multiple journals (config-driven via `JOURNALS` in `config.ts`)
- Conference proceedings per event
- Institutional publications
- Volume/issue builder (editorial workflow)
- Paper scheduling and embargo

---

## Technical Debt Backlog

| Item | Impact |
|------|--------|
| Legacy `src/app/component/` client bundle (~110 files) | Performance |
| `localStorage` auth parallel to httpOnly cookies | Security |
| In-memory rate limit + email queue | Scalability |
| `Filter.tsx` useMemo warnings | Lint |
| `<img>` in `Notification.tsx` | LCP on legacy pages |
| Refresh token implementation | Auth UX |
| Background sync for PWA submissions | Offline UX |

---

## Performance Targets

| Metric | Current (local P9) | Target |
|--------|-------------------|--------|
| Lighthouse Performance | 80 | 95+ |
| LCP | 2.4 s | < 2.0 s |
| Accessibility | 96–100 | 100 |
| Homepage First Load JS | 107 kB | < 100 kB |

See `docs/PERFORMANCE_FINAL_REPORT.md` for detailed analysis.

---

## How to Propose Changes

1. Open issue on GitHub with problem statement
2. Reference affected `src/lib/` module
3. Confirm no breaking changes to papers, routes, or API contracts
4. Follow [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## Related Docs

- [docs/PHASE8_FINAL_REPORT.md](./PHASE8_FINAL_REPORT.md)
- [docs/PERFORMANCE_FINAL_REPORT.md](./PERFORMANCE_FINAL_REPORT.md)
- [ARCHITECTURE.md](./ARCHITECTURE.md)
