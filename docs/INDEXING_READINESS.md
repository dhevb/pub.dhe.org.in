# Indexing Readiness

**Version:** 2.0 (gap analysis)  
**Baseline:** v1.0.1 · Production: https://pub.dhe.org.in  
**Date:** 2026-07-10

---

## Summary

| Index / Standard | Readiness | Priority |
|------------------|-----------|----------|
| Google Scholar | **High (85%)** | Maintain |
| ISSN Portal | **Registered** | Maintain |
| Crossref | **Low (15%)** | P1 — needs DOI prefix |
| OpenAlex | **Medium (40%)** | P2 — metadata export |
| DOAJ | **Medium (50%)** | P2 — application |
| BASE / CORE | **Medium (45%)** | P2 — OAI-PMH |
| UGC CARE | **Low (20%)** | P1 — manual application |
| Scopus | **Low (10%)** | P3 — 2+ year track record |
| Web of Science | **Low (10%)** | P3 — application |
| Semantic Scholar | **Medium (35%)** | P2 — structured data |
| Dimensions | **Low (15%)** | P3 — via Crossref |

---

## Google Scholar

### Requirements vs platform

| Requirement | Status | Evidence |
|-------------|--------|----------|
| `citation_*` meta tags | ✅ | `googleScholarMetadata()` |
| `citation_issn` | ✅ | ISSN `2278-1757` |
| `citation_title`, `citation_author` | ✅ | All 20 papers |
| `citation_pdf_url` | ✅ | Paper page URL |
| `citation_doi` | ⚠️ | Empty until Crossref |
| `citation_volume/issue/pages` | ⚠️ | Optional — not in paper JSON |
| Crawlable HTML articles | ✅ | Static paper pages |
| No login wall on articles | ✅ | Public routes |

**Verification:** `node scripts/qa/verify-scholar.mjs` — passes required fields.

**Gap:** Add DOI to meta when prefix configured. Add volume/issue when editorial workflow live.

**Score: 85/100**

---

## Crossref

| Requirement | Status |
|-------------|--------|
| DOI prefix assigned | ❌ `doiPrefix: ""` |
| Metadata deposit API | ❌ Placeholder only |
| Reference linking | ❌ |
| Crossmark | ❌ |
| Similarity Check (optional) | ❌ |

**Action:** Apply for Crossref membership → configure prefix → implement deposit adapter → test sandbox deposit.

**Score: 15/100**

---

## OpenAlex

| Requirement | Status |
|-------------|--------|
| DOI on works | ❌ Pending Crossref |
| Open bibliographic metadata | ⚠️ JSON-LD partial |
| ISSN in metadata | ✅ |
| Institutional ROR IDs | ❌ Not in author data |

**Action:** Export works to OpenAlex-compatible JSON; register ISSN work in OpenAlex after DOI live.

**Score: 40/100**

---

## DOAJ (Directory of Open Access Journals)

| Requirement | Status |
|-------------|--------|
| Open access policy page | ⚠️ Partial — about page |
| ISSN registered | ✅ |
| Full text available | ✅ PDF/HTML on paper pages |
| Editorial board listed | ✅ `content/editorial-board.json` |
| Peer review process documented | ⚠️ Needs dedicated page |
| APC transparency | ✅ No APC (implicit) |

**Action:** Create `/open-access-policy` page; submit DOAJ application.

**Score: 50/100**

---

## OAI-PMH (BASE, CORE, institutional harvesters)

| Requirement | Status |
|-------------|--------|
| OAI-PMH 2.0 endpoint | ❌ Not implemented |
| Dublin Core metadata | ❌ Placeholder export |
| Persistent identifiers | ⚠️ ISSN only |

**Action:** Implement `GET /oai` with `ListRecords` for published papers.

**Score: 45/100**

---

## UGC CARE (India)

| Requirement | Status |
|-------------|--------|
| ISSN | ✅ |
| Regular publication | ⚠️ 20 static papers — need ongoing issues |
| Peer review documented | ⚠️ |
| Website quality | ✅ |
| Application submission | ❌ Manual |

**Action:** Document peer review policy; publish 2+ issues per year; submit UGC CARE application.

**Score: 20/100**

---

## Scopus / Web of Science

| Requirement | Status |
|-------------|--------|
| 2+ years regular publication | ❌ New platform |
| International editorial board | ✅ Partial |
| English abstracts | ✅ |
| DOI on all articles | ❌ |
| Citation tracking | ❌ |

**Timeline:** 24+ months after consistent publishing cadence.

**Score: 10/100**

---

## Semantic Scholar

| Requirement | Status |
|-------------|--------|
| Schema.org ScholarlyArticle | ✅ JSON-LD |
| DOI | ❌ Pending |
| Open crawl | ✅ Public pages |

**Action:** Ensure `schemas.ts` includes `ScholarlyArticle` with full author ORCID when available.

**Score: 35/100**

---

## Structured Data Audit

**Live in** `src/lib/seo/schemas.ts`:

| Schema | Status |
|--------|--------|
| Organization | ✅ |
| WebSite + SearchAction | ✅ |
| Article / ScholarlyArticle | ✅ Paper pages |
| BreadcrumbList | ✅ |
| FAQPage | ✅ Homepage FAQs |
| Periodical | ⚠️ Verify on journal pages |

---

## Indexing Action Plan

### Immediate (v1.0.x — no external deps)

- [ ] Add `/open-access-policy` page
- [ ] Add `/peer-review-policy` page
- [ ] Verify JSON-LD on all paper routes (`qa:smoke`)
- [ ] Add `citation_doi` when prefix configured

### v1.3.x (Crossref)

- [ ] DOI prefix in `site.json`
- [ ] Deposit adapter + test sandbox
- [ ] Update Scholar meta with DOI

### v1.4.x (Harvest)

- [ ] OAI-PMH endpoint
- [ ] Dublin Core export
- [ ] DOAJ application

### 2027+ (Applications)

- [ ] UGC CARE submission
- [ ] Scopus / WoS when eligibility met

---

## Verification Commands

```bash
node scripts/qa/verify-scholar.mjs
npm run qa:smoke
curl -s https://pub.dhe.org.in/vbe.rase/Paper1 | grep -E 'application/ld\+json|citation_'
curl -s https://pub.dhe.org.in/sitemap.xml | head
curl -s https://pub.dhe.org.in/robots.txt
```

---

## Related

- [SEO.md](./SEO.md)
- [PUBLISHING_ARCHITECTURE.md](./PUBLISHING_ARCHITECTURE.md)
- [INTEGRATIONS.md](./INTEGRATIONS.md)
- [V2_ROADMAP.md](./V2_ROADMAP.md) Phase 9
