# Publishing Architecture

**Version:** 2.0 (design)  
**Baseline:** v1.0.1  
**Status:** Architecture documentation — integrations **Ready for Activation** where noted

---

## Overview

Publishing architecture spans identifier registration, metadata export, file storage, issue management, and citation distribution. All external services are accessed through **adapters** in `src/lib/` — never hard-coded vendor SDKs in UI components.

```
┌─────────────────────────────────────────────────────────────┐
│  Publication Layer (pages, Paper JSON, RSS, sitemap)          │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│  src/lib/publishing/ · identifiers/ · research/citations.ts   │
└───────────────────────────┬─────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│ Crossref API  │   │ OAI-PMH       │   │ Object Storage│
│ (DOI deposit) │   │ harvesters    │   │ (PDF/assets)  │
└───────────────┘   └───────────────┘   └───────────────┘
```

---

## Identifier Management

### Current state

| Identifier | Source | Status |
|------------|--------|--------|
| ISSN | `content/site.json` → `2278-1757` | **Live** |
| EISSN | Not separate field | **Gap** — add to site.json |
| DOI prefix | `site.json` → `doiPrefix: ""` | **Awaiting Crossref** |
| DOI per article | `buildArticleDoi()` when prefix set | **Ready for Activation** |
| ORCID | `orcidEnabled: true` | **Flag only** — no OAuth |
| Google Scholar | `google-scholar.ts` meta tags | **Live** |

### Target adapter interface

```typescript
// Future: src/lib/publishing/adapters/doi.ts
interface DoiAdapter {
  register(request: DoiRegistrationRequest): Promise<{ doi: string; status: string }>;
  updateMetadata(doi: string, metadata: Record<string, unknown>): Promise<void>;
  getStatus(doi: string): Promise<"registered" | "pending" | "failed">;
}
```

**Existing placeholder:** `registerDoi()` in `publishing/metadata.ts` returns `{ status: "queued" }`.

---

## Metadata Export Formats

Defined in `METADATA_EXPORT_FORMATS`:

| Format | ID | Status | V2 Deliverable |
|--------|-----|--------|----------------|
| Crossref XML | `crossref` | placeholder | Deposit adapter |
| DataCite JSON | `datacite` | placeholder | Dataset DOIs |
| OAI-PMH 2.0 | `oai-pmh` | placeholder | `GET /oai` endpoint |
| Dublin Core | `dublin-core` | placeholder | XML export per record |
| MODS | `mods` | placeholder | Library interchange |
| METS | `mets` | placeholder | Archive packaging |
| JATS XML | — | **Not in registry** | Add for NLM interchange |

### OAI-PMH (planned)

```
GET /oai?verb=Identify
GET /oai?verb=ListRecords&metadataPrefix=oai_dc
```

Records sourced from paper index + future manuscript table. **Not implemented.**

---

## Crossmark (planned)

Crossmark provides update/retraction signals on published DOIs.

| Component | Status |
|-----------|--------|
| Crossmark badge script | Not started |
| `crossmarkEnabled` in site.json | Not started |
| Update/deposit webhook | Not started |

**Depends on:** Crossref membership + DOI prefix.

---

## Citation Downloads

**Live today:** `src/lib/research/citations.ts`

| Style | Status |
|-------|--------|
| APA, MLA, Chicago, IEEE | Live |
| BibTeX, RIS | Live |

**V2 improvements:**
- Include DOI when available
- Include volume/issue/pages from editorial schedule
- Download endpoint `/api/citations/[paperId]?format=ris`

---

## PDF Metadata Injection (planned)

| Step | Tooling |
|------|---------|
| Extract text | pdf-lib or server-side worker |
| Embed XMP Dublin Core | Title, authors, DOI, ISSN |
| Embed document info | Creator, keywords |

**Queue job:** `pdf-metadata-injection` (Phase 3 queue)

---

## Volume / Issue Management

Types exist in `editorial/workflow.ts`:

```typescript
interface PublicationSchedule {
  volume?: string;
  issue?: string;
  scheduledAt?: string;
  publishedAt?: string;
}
```

**V2 plan:**
1. CMS or admin UI for volume/issue tables
2. Link manuscripts → issue on acceptance
3. Auto-generate issue landing pages (`/vbe.rase/issues`)
4. RSS + sitemap update on publish

**Today:** Issue pages exist as legacy routes; no automated scheduling.

---

## Object Storage Architecture

### Adapter pattern (planned)

```typescript
// Future: src/lib/storage/adapter.ts
interface StorageAdapter {
  upload(key: string, body: Buffer, mime: string): Promise<{ url: string; key: string }>;
  getSignedUrl(key: string, expiresIn: number): Promise<string>;
  delete(key: string): Promise<void>;
}
```

| Provider | Env vars (example) | Use case |
|----------|-------------------|----------|
| Local | `STORAGE_DRIVER=local` | Development |
| Cloudflare R2 | `R2_ACCOUNT_ID`, `R2_ACCESS_KEY`, `R2_BUCKET` | Production (recommended) |
| AWS S3 | `AWS_S3_BUCKET`, `AWS_REGION` | Enterprise |
| Backblaze B2 | `B2_KEY_ID`, `B2_BUCKET` | Cost alternative |

**Stored assets:** PDFs, figures, supplementary ZIPs, datasets.

**Today:** Uploads go to Render backend (legacy); no R2/S3 adapter.

---

## Search Architecture

### Current

| Layer | Implementation |
|-------|----------------|
| Index build | `content/search-index.ts` |
| API | `GET /api/search` |
| Client | `AdvancedSearchClient.tsx` |
| Engine | `search/engine.ts` (token match + filters) |
| Semantic hook | `semanticSearchRegistry[]` (empty) |

### V2 targets

- Faceted filters (already partial in engine)
- Synonym map in `content/search-synonyms.json`
- Search analytics via `trackEvent()`
- Saved searches (user cookie or DB)
- Semantic adapter behind feature flag

---

## DOI Reservation Workflow (planned)

```
1. Editor accepts manuscript
2. Reserve DOI (Crossref pre-registration)
3. Assign to volume/issue
4. Generate landing page + PDF
5. Deposit metadata (Crossref REST)
6. Publish → update sitemap, RSS, Scholar meta
7. Crossmark enabled
```

**Audit log:** `auditLog("publishing.doi_deposit", ...)` (monitoring module ready)

---

## Feature Flags

Use `src/lib/monitoring/feature-flags.ts`:

```typescript
// Proposed additions
crossrefDeposit: Boolean(process.env.CROSSREF_API_KEY),
orcidOAuth: Boolean(process.env.ORCID_CLIENT_ID),
oaiPmh: isFeatureEnabled("oaiPmh"),
objectStorage: Boolean(process.env.STORAGE_DRIVER),
```

---

## Related

- [INTEGRATIONS.md](./INTEGRATIONS.md)
- [INDEXING_READINESS.md](./INDEXING_READINESS.md)
- [EDITORIAL_WORKFLOW.md](./EDITORIAL_WORKFLOW.md)
- [V2_ROADMAP.md](./V2_ROADMAP.md)
