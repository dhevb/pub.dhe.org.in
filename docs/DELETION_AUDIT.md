# Legacy RASE Projects — Deletion Audit

**Date:** July 6, 2026  
**Status:** Vercel cleanup **COMPLETE** — GitHub deletion pending `delete_repo` scope  
**Replacement platform:** [pub.dhe.org.in](https://pub.dhe.org.in) (`dhevb/pub.dhe.org.in`)

---

## Executive summary

| Category | Count | Action |
|----------|-------|--------|
| Vercel projects deleted | 21 | ✅ Done July 6, 2026 |
| GitHub repos — deleted | 13 | ✅ Done July 6, 2026 |
| GitHub repos — already gone | 12 | No action |
| **Do not delete** | `tredul-backend` only |
| **rase.backend** | Delete without migration (never in use) |
| **Vie_rase_backend** | Delete without migration (never in use) |

---

## CRITICAL — Do NOT delete

### tredul-backend is unrelated to RASE

| Vercel project | Serves | Verdict |
|----------------|--------|---------|
| [tredul-backend](https://vercel.com/dhe-projects/tredul-backend) | [tredul.in](https://www.tredul.in) backend | **REMOVE FROM DELETION LIST** |

### 3. Redirect before deleting publishing projects ✅ DONE

---

## Vercel projects audit (`dhe-projects`)

| Project | Vercel URL | Custom domain(s) | Live? | Git connected? | Superseded by | Delete? |
|---------|------------|------------------|-------|----------------|---------------|---------|
| [pub-rase-co-in](https://vercel.com/dhe-projects/pub-rase-co-in) | pub-rase-co-in-dhe-projects.vercel.app | **pub.rase.co.in** | Yes (old app) | No (0/5 checklist) | pub.dhe.org.in | ✅ After redirect |
| [vbe.rase.co.in](https://vercel.com/dhe-projects/vbe.rase.co.in) | vberasecoin-dhe-projects.vercel.app | vbe.rase.co.in (404) | Broken | No | pub.dhe.org.in/vbe | ✅ |
| [vie.rase.co.in](https://vercel.com/dhe-projects/vie.rase.co.in) | vierasecoin-dhe-projects.vercel.app | **vie.rase.co.in** | Yes (old VIE) | No | pub.dhe.org.in/vie | ✅ After redirect |
| [vbh.rase.co.in](https://vercel.com/dhe-projects/vbh.rase.co.in) | vbh-asecoin.vercel.app | vbh.rase.co.in (404) | Broken | No | pub.dhe.org.in/vbh | ✅ |
| [vih.rase.co.in](https://vercel.com/dhe-projects/vih.rase.co.in) | vihrasecoin.vercel.app | vih.rase.co.in (404) | Broken | No | pub.dhe.org.in/vih | ✅ |
| [vi-rase-co-in](https://vercel.com/dhe-projects/vi-rase-co-in) | vi-rase-co-in-dhe-projects.vercel.app | **vi.rase.co.in** | Yes | No | pub.dhe.org.in (TBD) | ⚠️ Archive decision |
| [sm24-rase-co-in](https://vercel.com/dhe-projects/sm24-rase-co-in) | sm24-rase-co-in-dhe-projects.vercel.app | **sm24.rase.co.in** | Yes | No | N/A (conference) | ⚠️ User confirmed delete |
| [sm24.rase.co.in](https://vercel.com/dhe-projects/sm24.rase.co.in) | sm24rasecoin.vercel.app | None on prod | Duplicate | No | sm24-rase-co-in | ✅ Delete duplicate |
| [sk23-rase-co-in](https://vercel.com/dhe-projects/sk23-rase-co-in) | sk23-rase-co-in-dhe-projects.vercel.app | **sk23.rase.co.in** | Yes | No | Historical archive | ⚠️ User confirmed delete |
| [sk24-rase-co-in](https://vercel.com/dhe-projects/sk24-rase-co-in) | sk24-rase-co-in-dhe-projects.vercel.app | sk24.rase.co.in (DNS dead), **raseconferences.com** | Partial | No | Historical | ⚠️ User confirmed delete |
| [sk25-rase-co-in](https://vercel.com/dhe-projects/sk25-rase-co-in) | sk25-rase-co-in-dhe-projects.vercel.app | **sk25.rase.co.in** | Yes | No | Historical | ⚠️ User confirmed delete |
| [ac-rase-co-in](https://vercel.com/dhe-projects/ac-rase-co-in) | ac-rase-co-in-dhe-projects.vercel.app | **ac.rase.co.in** | Configured | No | Unknown | ⚠️ User confirmed delete |
| [ac-shikshamahakumbh-com](https://vercel.com/dhe-projects/ac-shikshamahakumbh-com) | ac-shikshamahakumbh-com-dhe-projects.vercel.app | No custom domain on prod | Preview only | No | N/A | ✅ |
| [tredul-backend](https://vercel.com/dhe-projects/tredul-backend) | tredul-backend.vercel.app | tredul.in | Yes | Unknown | N/A | ❌ **NOT RASE** |

**Common state:** All listed projects show Vercel Production Checklist **0/5** — no Git connected, domains often missing or on stale deploys.

---

## GitHub repositories audit

### shiksha-mahakumbh — EXISTS (delete candidates)

| Repo | Last push | Homepage | Size | Maps to Vercel | Delete? |
|------|-----------|----------|------|----------------|---------|
| [vbe.rase.co.in](https://github.com/shiksha-mahakumbh/vbe.rase.co.in) | Oct 2024 | vberasecoin.vercel.app | 44 KB | vbe.rase.co.in | ✅ |
| [vie.rase.co.in](https://github.com/shiksha-mahakumbh/vie.rase.co.in) | Oct 2024 | vierasecoin.vercel.app | 236 KB | vie.rase.co.in | ✅ |
| [vbh.rase.co.in](https://github.com/shiksha-mahakumbh/vbh.rase.co.in) | Jan 2025 | vbh-asecoin.vercel.app | 50 KB | vbh.rase.co.in | ✅ |
| [vih.rase.co.in](https://github.com/shiksha-mahakumbh/vih.rase.co.in) | Oct 2024 | vihrasecoin.vercel.app | 45 KB | vih.rase.co.in | ✅ |
| [sm24.rase.co.in](https://github.com/shiksha-mahakumbh/sm24.rase.co.in) | Nov 2024 | — | 67 KB | sm24-rase-co-in | ✅ |
| [ac.shikshamahakumbh.com](https://github.com/shiksha-mahakumbh/ac.shikshamahakumbh.com) | Dec 2025 | ac-shikshamahakumbh-com.vercel.app | 1.3 MB | ac-shikshamahakumbh-com | ✅ |
| [rase.backend](https://github.com/shiksha-mahakumbh/rase.backend) | Dec 2024 | rase-backend.vercel.app | 12 MB | Never in use | ✅ Delete (no migration needed) |

### dhevb — EXISTS

| Repo | Last push | Homepage | Delete? |
|------|-----------|----------|---------|
| [Vie_rase_backend](https://github.com/dhevb/Vie_rase_backend) | Sep 2024 | vie-rase-backend.vercel.app | ✅ Delete (no migration needed) |
| [sm25.rase.co.in](https://github.com/dhevb/sm25.rase.co.in) | Sep 2024 | — | ✅ (no Vercel project found) |

### dheWeb — NOT FOUND (already deleted or never existed)

All 7 repos return **404** from GitHub API:

- `dheWeb/sm24-rase-co-in`, `vih-rase-co-in`, `vbh-rase-co-in`, `vbe-rase-co-in`, `vie-rase-co-in`, `sk25-rase-co-in`, `sm25-rase-co-in`

`dheWeb` is a **user account** (not org) with only: `dhe-orgin`, `tejas`, `dhe.org.in`, `swadeshi-bazaar-backend`, `event_mangement`.

### dhevb — NOT FOUND (already deleted)

- `dhevb/sk23-rase-co-in`, `vi-rase-co-in`, `sk25-rase-co-in`, `ac-rase-co-in`, `vi-rase`

---

## Duplicate / fork map

```
OLD (delete)                          NEW (keep)
─────────────────────────────────────────────────────────
pub-rase-co-in + pub.rase.co.in   →   pub.dhe.org.in
vbe.rase.co.in (repo + Vercel)    →   pub.dhe.org.in/vbe
vie.rase.co.in (repo + Vercel)    →   pub.dhe.org.in/vie
vbh.rase.co.in (repo + Vercel)    →   pub.dhe.org.in/vbh
vih.rase.co.in (repo + Vercel)    →   pub.dhe.org.in/vih
vi-rase-co-in + vi.rase.co.in     →   pub.dhe.org.in (redirect)
shiksha-mahakumbh/rase.backend    →   deleted (never in use)
dhevb/Vie_rase_backend            →   deleted (never in use)
sm24.rase.co.in + sm24-rase-co-in →   conference — user wants removed
sk23/sk24/sk25-rase-co-in         →   conference archives — user wants removed
```

---

## Recommended deletion order

### Phase 0 — Prerequisites ✅ DONE

- [x] Redirect `pub.rase.co.in`, `vbe|vie|vbh|vih|vi.rase.co.in` → `pub.dhe.org.in`
- [x] NIT subdomains → `dhe.org.in/*` paths
- [x] Confirm `pub.dhe.org.in` does not depend on Vercel `rase.backend` (uses Render)

### Phase 1 — Publishing duplicates ✅ Vercel DONE

- [x] Deleted 21 legacy Vercel projects
- [x] Delete GitHub repos (7 shiksha-mahakumbh + 6 dhevb)

### Phase 2 — Backend repos ✅ queued for delete

- [x] `rase.backend` — delete without migration (never in use)
- [x] `Vie_rase_backend` — delete without migration (never in use)

### Never delete (unless explicitly scoped)

- `tredul-backend` — serves tredul.in
- `pub.dhe.org.in` — new platform
- `rase-co-in` / `www.rase.co.in` — Shiksha Mahakumbh hub (not in deletion list)

---

## Vercel CLI deletion commands (reference)

```bash
# Remove domain first, then delete project
vercel domains rm pub.rase.co.in --scope dhe-projects
vercel project rm pub-rase-co-in --scope dhe-projects --yes
```

## GitHub deletion commands (reference)

```bash
gh repo delete shiksha-mahakumbh/vbe.rase.co.in --yes
gh repo delete shiksha-mahakumbh/rase.backend --yes
gh repo delete dhevb/Vie_rase_backend --yes
```

---

## DNS records to clean up (GoDaddy / domaincontrol.com)

After Vercel project deletion, remove A/CNAME records for:

- `pub`, `vbe`, `vie`, `vbh`, `vih`, `vi`, `sm24`, `sk23`, `sk25`, `ac` → `.rase.co.in`

Or point them all to `pub.dhe.org.in` via CNAME if keeping subdomains as redirects.
