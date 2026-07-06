# DHE / RASE Ecosystem Audit — Keep vs Delete vs Untouched

**Date:** July 6, 2026  
**Last updated:** July 6, 2026 (cleanup completed)  
**Scope:** Full inventory of `dhe-projects` Vercel + GitHub (`dhevb` org — consolidated July 6, 2026)

## Target architecture (canonical)

| Canonical URL | Role | Status |
|---------------|------|--------|
| **dhe.org.in** | Main DHE hub — institutional pages as **paths** | ✅ Live |
| **dhe.org.in/nitsri** | Replaces `nitsri.dhe.org.in` | ✅ Live + 301 from subdomain |
| **dhe.org.in/nitkkr** | Replaces `nitkkr.dhe.org.in` | ✅ Live + 301 from subdomain |
| **dhe.org.in/nitj** | Replaces `nitj.dhe.org.in` | ✅ Live + 301 from subdomain |
| **dhe.org.in/iitrpr** | Replaces `iitr.dhe.org.in` / `iitrpr.dhe.org.in` | ✅ Live + 301 from subdomains |
| **rase.co.in** | Shiksha Mahakumbh / RASE hub | ✅ Live (`rase-co-in`) |
| **pub.dhe.org.in** | Viksit Bharat journals (consolidated) | ✅ Live |
| **tejas.dhe.org.in** | TEJAS assessment platform | ✅ Live |

---

## Vercel team: `dhe-projects` (11 projects — post-cleanup)

### TIER 1 — KEEP (canonical production)

| Vercel project | Production URL | GitHub source |
|----------------|----------------|---------------|
| **dhe-orgin-ctai** | www.dhe.org.in | `dhevb/dhe-orgin.` |
| **tejas** | tejas.dhe.org.in | `dhevb/tejas` |
| **pub.dhe.org.in** | pub.dhe.org.in | `dhevb/pub.dhe.org.in` |
| **rase-co-in** | www.rase.co.in | `dhevb/rase` |

### TIER 4 — DO NOT TOUCH (unrelated products)

| Vercel project | Domain |
|----------------|--------|
| **tredul** | tredul.in |
| **tredul-backend** | tredul-backend.vercel.app |
| **tudu-co-in** | tudu.co.in |
| **tudu-backend** | tudu-backend.vercel.app |
| **sarvatr-co-in** | sarvatr.co.in |
| **holistic-harbor** | alltemples.org.in |
| **event-mangement** | event-mangement-omega.vercel.app |

---

## Completed cleanup (July 6, 2026)

### Vercel projects DELETED (21 total)

`pub-rase-co-in`, `vbe.rase.co.in`, `vie.rase.co.in`, `vbh.rase.co.in`, `vih.rase.co.in`, `vi-rase-co-in`, `nitsri-dhe-org-in`, `nitkkr-dhe-org-in`, `nitj-dhe-org-in`, `iitr.dhe.org.in`, `vb-itr`, `sk23-rase-co-in`, `sk24-rase-co-in`, `sk25-rase-co-in`, `sm24-rase-co-in`, `sm24.rase.co.in`, `ac-rase-co-in`, `ac-shikshamahakumbh-com`, `dhe.org.in-main`, `rase`, `dhe-orgin` (accidental duplicate)

### Domains attached to canonical projects

**pub.dhe.org.in:** `pub.rase.co.in`, `vbe.rase.co.in`, `vie.rase.co.in`, `vbh.rase.co.in`, `vih.rase.co.in`, `vi.rase.co.in`

**dhe-orgin-ctai:** `nitsri.dhe.org.in`, `nitkkr.dhe.org.in`, `nitj.dhe.org.in`, `iitrpr.dhe.org.in`, `iitr.dhe.org.in`

### Redirects verified (308)

| Legacy URL | Redirects to |
|------------|--------------|
| pub.rase.co.in | pub.dhe.org.in |
| vi.rase.co.in | pub.dhe.org.in |
| vbe.rase.co.in | pub.dhe.org.in/vbe |
| vie.rase.co.in | pub.dhe.org.in/vie |
| nitsri.dhe.org.in | www.dhe.org.in/nitsri |
| nitkkr.dhe.org.in | www.dhe.org.in/nitkkr |
| nitj.dhe.org.in | www.dhe.org.in/nitj |
| iitrpr.dhe.org.in | www.dhe.org.in/iitrpr |

---

## GitHub audit — all canonical repos on `dhevb` org

### dhevb — CANONICAL (July 6, 2026)

| Repo | Maps to |
|------|---------|
| **dhe-orgin.** | dhe-orgin-ctai → www.dhe.org.in |
| **tejas** | tejas → tejas.dhe.org.in |
| **pub.dhe.org.in** | pub.dhe.org.in Vercel |
| **rase** | rase-co-in → www.rase.co.in |
| swadeshi-bazaar-backend | 🔒 UNTOUCH |
| event_mangement | 🔒 UNTOUCH |

**Migrated from `dheWeb`:** `dhe-orgin.`, `tejas`, `swadeshi-bazaar-backend`, `event_mangement` (transferred)  
**Migrated from `shiksha-mahakumbh`:** `pub.dhe.org.in`, `rase` (forked to org, originals deleted)

### shiksha-mahakumbh / dheWeb user accounts

All production repos moved to **`dhevb`**. User accounts retained for auth/deploy only.

### dhevb — DELETED ✅ (July 6, 2026)

`nitsri-dhe-org-in`, `nitkkr-dhe-org-in`, `nitj-dhe-org-in`, `iitr-dhe-org-in`, `Vie_rase_backend`, `sm25.rase.co.in`, `dhe-org-in`, `new-shiksha-mahakumbh`, `shikshamahakumbh`

**Also deleted (private repos, visible to org admin):** `sk23/sk24/sk25-rase-co-in`, `vi-rase-co-in`, `vi-rase`, `ac-rase-co-in`, `rase-co-in`

### dhevb — other (untouched commercial projects)

`sarvatr`, `tudu-co-in`, `Tredul`, `HolisticHarbor`, `sb_frontend`, `sb_frontendnew`, etc.

### dheWeb — DELETED ✅ (July 6, 2026)

`dhe.org.in`, `pub-rase-co-in`, `sm24-rase-co-in`, `vih/vbh/vbe/vie-rase-co-in`, `sk25-rase-co-in`, `sm25-rase-co-in` — all superseded by canonical repos or removed as legacy

---

## Remaining manual steps

1. **Vercel Git reconnect** — point each Vercel project to `dhevb/*` repo (Settings → Git) if deploy webhooks break.
2. **DNS cleanup** (optional) — remove stale A/CNAME for deleted conference subdomains (sk23/sk24/sk25/sm24/ac).

---

## Counts summary (final)

| Bucket | Vercel | GitHub |
|--------|--------|--------|
| **Keep (canonical)** | 4 | 4–5 |
| **Deleted (Vercel)** | 21 | — |
| **Deleted (GitHub)** | — | 13 |
| **Do not touch** | 7 | 3+ |
