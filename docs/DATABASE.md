# Data Architecture

This platform does **not** use a traditional application database in the Next.js layer. Data is stored in three tiers.

---

## Tier 1 — File-Based CMS (`content/`)

Synchronous JSON reads via `src/lib/cms/loader.ts` at build/request time.

| File | Loader | Schema |
|------|--------|--------|
| `content/site.json` | `getSiteSettings()` | Site name, ISSN, DOI prefix, publisher, flags |
| `content/announcements.json` | `getAnnouncements()` | `{ announcements: CmsAnnouncement[] }` — filtered by `expiresAt` |
| `content/news.json` | `getNewsItems()` | `{ items: CmsNewsItem[] }` |
| `content/faqs.json` | `getCmsFaqs()` | `{ items: CmsFaq[] }` |
| `content/editorial-board.json` | `getEditorialBoard()` | `{ members: EditorialBoardMember[] }` |
| `content/research-categories.json` | `getResearchCategories()` | Categories + research tracks |

**Types:** `src/lib/cms/types.ts`

**Preview API:** `GET /api/cms` returns combined snapshot.

**Backup:** `src/lib/backup/export.ts` → `exportCmsBackup()` lists CMS files for disaster recovery manifests.

---

## Tier 2 — Published Papers (Immutable JSON)

**20 files** — never delete or modify without explicit approval.

```
src/app/vbe.rase/output/Paper{1-5}.json
src/app/vbh.rase/output/Paper{1-5}.json
src/app/vie.rase/output/Paper{1-5}.json
src/app/vih.rase/output/Paper{1-5}.json
```

**Loader:** `loadPaper(journalId, paperNum)` in `src/lib/journals/papers.ts`  
**Index:** `buildPaperSearchIndex()` in `src/lib/content/search-index.ts`  
**QA:** `npm run qa:papers` validates all 20 files + `ArticleDetails.Title`

### Paper JSON structure (simplified)

```json
{
  "ArticleDetails": {
    "Title": "...",
    "Authors": [{ "Name": "..." }],
    "CoAuthors": [],
    "Keywords": "..."
  },
  "ArticleInfo": {
    "Published": "...",
    "Volume": "...",
    "Issue": "..."
  },
  "ArticleContent": { ... }
}
```

---

## Tier 3 — Render Backend (External)

**URL:** `https://vie-rase-backend.onrender.com`

Stores dynamic data not in the repo:

| Entity | Access |
|--------|--------|
| Users / auth | `POST /api/login`, `/api/signup`, `/api/reset-password` |
| Manuscripts | `GET /api/vbe_manuscripts/user/{userId}`, submit endpoints per journal |
| Articles (API) | `GET /api/{prefix}_getallarticles`, `GET /api/{prefix}_getarticle/{id}` |
| File uploads | `POST /api/{prefix}_submit-manuscript-file` |

**No database schema is defined in this frontend repo.** Backend is a separate service (`Vie_rase_backend` on Render).

---

## Tier 4 — Client-Side Storage (Legacy)

| Storage | Keys | Purpose |
|---------|------|---------|
| httpOnly cookies | `token`, `auth-token`, `userId` | Modern auth (7 days) |
| localStorage | `token`, `userId`, `email`, `role`, etc. | Legacy manuscript flows |
| CSRF cookie | `csrf-token` | Double-submit (8 hours, non-httpOnly) |

Managed by `src/lib/auth/constants.ts` — `persistLegacyAuth()`, `clearLegacyAuth()`.

---

## Tier 5 — In-Memory (Architecture Placeholders)

| Module | Storage | Notes |
|--------|---------|-------|
| `src/lib/email/queue.ts` | In-memory array | Replace with Redis/BullMQ at scale |
| `src/lib/security/rate-limit.ts` | In-memory Map | Resets on serverless cold start |
| `src/lib/monitoring/logger.ts` | In-memory buffer (200 events) | Optional `SENTRY_DSN` hook |

---

## Search Index

Built at runtime from paper JSON — not persisted:

```typescript
// src/lib/content/search-index.ts
export async function buildPaperSearchIndex(): Promise<SearchIndexItem[]>
```

Used by homepage (`LatestPapersSection`), `/search`, and `GET /api/search`.

---

## Data Flow Diagram

```
content/*.json ──► getSiteSettings() ──► pages, metadata, JSON-LD
Paper*.json    ──► loadPaper()        ──► /vbe.rase/Paper1, Scholar meta
Paper*.json    ──► buildPaperSearchIndex() ──► /search, /api/search
Render API     ──► apiFetch()         ──► manuscripts, login, legacy articles
Cookies        ──► middleware         ──► /dashboard protection
```

---

## Migration Notes

- **No ORM** — do not add Prisma/Drizzle without architectural review.
- **CMS changes** — edit JSON in `content/`, commit, deploy.
- **New papers** — add `Paper{N}.json` + page route; run `npm run qa:papers`.
- **Backend schema** — coordinate with `vie-rase-backend` repository separately.

---

## Related Docs

- [CMS.md](./CMS.md)
- [API_REFERENCE.md](./API_REFERENCE.md)
- [ARCHITECTURE.md](./ARCHITECTURE.md)
