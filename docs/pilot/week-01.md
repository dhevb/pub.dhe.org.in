# Pilot Week 01

**Week ending:** 2026-07-10  
**Reporter:** Technical Lead  
**Production version:** v1.0.4 (`ec7702e`)

---

## Release activity

| Item | Status |
|------|--------|
| v1.0.4 VIE archive hotfix merged | ✅ |
| PR #1 + PR #2 (redirect) deployed | ✅ |
| `/api/health` | ok · `ec7702e` |
| `/vie.rase/issues` redirect | ✅ 308 → `/vie.rase/table` |
| Archive catalog verified | 4 vol · 12 issues · 64 papers |
| PDF audit | **59/59 live** on production + 5 deferred (Vol 4 I1: 61–65) |

### Catalog path fix (2026-07-10)

Deep audit of `public/vie/` found PDFs existed with **wrong issue numbers in catalog**, not missing files:

| Catalog entry | Was (404) | Fixed to (200) |
|---------------|-----------|----------------|
| Vol 2 I2 Art 35, 36 | Issue 2 paths | Issue 3 paths |
| Vol 2 I3 Art 38, 39 | Issue 3 paths | Issue 4 paths |
| Vol 3 I2 Art 53 | Issue 2 path | Issue 4 path |
| Content Vol 3 I2 2025 | single space | double space (matches asset) |

`public/vie/` contains **87 PDFs** locally (incl. placeholder `cv4i1.pdf`); Vol 4 Issue 1 article PDFs 61–65 deferred.

---

## Incidents

| ID | Severity | Summary | Status |
|----|----------|---------|--------|
| — | — | None this week | — |

---

## Editorial operations

| Metric | Value |
|--------|-------|
| Submissions received | 0 (pilot not yet started) |
| Reviews completed | 0 |
| Articles published | 0 |

---

## Reliability

| Check | Result |
|-------|--------|
| Smoke test | 67/67 (baseline from v1.0.2) |
| `/api/health` | ok |
| Backend | ok |

---

## Operational tasks (content, not code)

### Vol 4 Issue 1 (deferred)

Articles **61–65** show **"PDF pending upload"** in the archive until files are provided. Placeholder `cv4i1.pdf` added for issue cover.

When PDFs are ready, add to `public/vie/` as:
- `Volume 4 Issue 1 Article 61.pdf` … `65.pdf`
- Remove paths from `VIE_ARCHIVE_PENDING_PDF_PATHS` in `vie-archive-utils.ts`

---

## Actions for next week

1. Begin real editorial submissions
2. Upload Vol 4 I1 article PDFs (61–65) when ready
3. Configure Search Console / analytics if not done
4. Complete first full manual archive spot-check in browser
