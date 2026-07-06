# DHE / RASE Ecosystem Audit — Keep vs Delete vs Untouched

**Date:** July 6, 2026  
**Last updated:** July 6, 2026 (cleanup completed)  
**Scope:** Full inventory of `dhe-projects` Vercel + GitHub (`shiksha-mahakumbh`, `dhevb`, `dheWeb`)

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
| **dhe-orgin-ctai** | www.dhe.org.in | `dheWeb/dhe-orgin.` |
| **tejas** | tejas.dhe.org.in | `dheWeb/tejas` |
| **pub.dhe.org.in** | pub.dhe.org.in | `shiksha-mahakumbh/pub.dhe.org.in` |
| **rase-co-in** | www.rase.co.in | `shiksha-mahakumbh/rase` |

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

## GitHub audit

### shiksha-mahakumbh — KEEP

| Repo | Maps to |
|------|---------|
| **pub.dhe.org.in** | pub.dhe.org.in Vercel |
| **rase** | rase-co-in Vercel |
| **dhe.org.in** | ⚠️ May be stale vs dheWeb/dhe-orgin. |

### shiksha-mahakumbh — DELETED ✅ (July 6, 2026)

`vbe.rase.co.in`, `vie.rase.co.in`, `vbh.rase.co.in`, `vih.rase.co.in`, `sm24.rase.co.in`, `ac.shikshamahakumbh.com`, `rase.backend`

### dhevb — DELETE (needs **dheWeb** org admin)

| Repo | Notes |
|------|-------|
| nitsri-dhe-org-in | Migrated to dhe.org.in/nitsri |
| nitkkr-dhe-org-in | Migrated to dhe.org.in/nitkkr |
| nitj-dhe-org-in | Migrated to dhe.org.in/nitj |
| iitr-dhe-org-in | Migrated to dhe.org.in/iitrpr |
| **Vie_rase_backend** | Delete without migration — never in use |
| sm25.rase.co.in | Unused conference |

### dheWeb — KEEP

| Repo | Maps to |
|------|---------|
| **dhe-orgin.** | dhe-orgin-ctai (canonical DHE) |
| **tejas** | tejas Vercel |

---

## Remaining manual steps

1. **dhevb repos (6)** — `shiksha-mahakumbh` has no org admin. Sign in as **dheWeb**:

```powershell
gh auth login -h github.com -s delete_repo
# Sign in as dheWeb, then:
gh repo delete dhevb/nitsri-dhe-org-in --yes
gh repo delete dhevb/nitkkr-dhe-org-in --yes
gh repo delete dhevb/nitj-dhe-org-in --yes
gh repo delete dhevb/iitr-dhe-org-in --yes
gh repo delete dhevb/Vie_rase_backend --yes
gh repo delete dhevb/sm25.rase.co.in --yes
```

2. **DNS cleanup** (optional) — remove stale A/CNAME for deleted conference subdomains (sk23/sk24/sk25/sm24/ac).

---

## Counts summary (final)

| Bucket | Vercel | GitHub |
|--------|--------|--------|
| **Keep (canonical)** | 4 | 4–5 |
| **Deleted (Vercel)** | 21 | — |
| **Deleted (GitHub shiksha-mahakumbh)** | — | 7 |
| **Pending delete (GitHub dhevb)** | — | 6 |
| **Do not touch** | 7 | 3+ |
