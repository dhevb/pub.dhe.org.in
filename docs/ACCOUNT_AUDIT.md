# Account Re-Audit — shiksha-mahakumbh & dheWeb (July 6, 2026)

Post-migration check: anything left on personal accounts that should move to **`dhevb`**.

---

## Executive summary

| Account | Repos left | Action needed |
|---------|------------|---------------|
| **shiksha-mahakumbh** | **0** | Optional: add as `dhevb` org member for deploy access |
| **dheWeb** | **0** | Keep as **org admin** — no repo transfer needed |
| **dhevb** | All canonical code | ✅ Source of truth |

**Nothing critical left to transfer on GitHub.** Remaining items are credentials, Vercel team access, and external services (Render, DNS).

---

## GitHub — shiksha-mahakumbh (User)

| Check | Status |
|-------|--------|
| Public repos | **0** — all migrated or deleted |
| Legacy journal repos | **Deleted** (vbe/vie/vbh/vih, sm24, ac, rase.backend) |
| `dhe.org.in` duplicate | **Deleted** |
| `pub.dhe.org.in`, `rase` | **Moved** → `dhevb/` (fork + original removed) |
| Org membership | Member of **`dhevb`** (not org admin) |
| GitHub Packages | Not audited (needs `read:packages` scope) |

**Recommendation:** Invite `shiksha-mahakumbh` as **`dhevb` org member** (if not already visible in members list) so `gh`/git push works without always switching to `dheWeb`.

---

## GitHub — dheWeb (User)

| Check | Status |
|-------|--------|
| Public repos | **0** — all transferred to `dhevb` |
| `dhe-orgin.`, `tejas`, `swadeshi-bazaar-backend`, `event_mangement` | **Transferred** → `dhevb/` |
| Legacy forks deleted | ✅ (pub-rase-co-in, journal repos, etc.) |
| **dhevb org role** | **Admin** — keep this account for org management |

**Recommendation:** Keep `dheWeb` as primary **dhevb org admin**. Do not delete the account.

---

## GitHub — dhevb org (canonical)

| Repo | Vercel project | Git connected |
|------|----------------|---------------|
| `dhe-orgin.` | dhe-orgin-ctai | ✅ `dhevb/dhe-orgin.` |
| `pub.dhe.org.in` | pub.dhe.org.in | ✅ `dhevb/pub.dhe.org.in` |
| `tejas` | tejas | ✅ `dhevb/tejas` |
| `rase` | rase-co-in | ✅ `dhevb/rase` |
| `event_mangement` | event-mangement | ✅ `dhevb/event_mangement` |
| `swadeshi-bazaar-backend` | (no Vercel on dhe-projects) | N/A |

---

## Vercel team `dhe-projects`

| Item | Status | Notes |
|------|--------|-------|
| CLI user | `internsdhe` | Team owner/login — **not** tied to GitHub repo owner |
| Domain registrar entries | 9 domains | Created by `internsdhe` — OK, team-level |
| Old git links | **Disconnected** | `shiksha-mahakumbh/pub.dhe.org.in`, `shiksha-mahakumbh/rase` removed |
| Canonical git links | **Connected** | All 4 main sites → `dhevb/*` |

### Domains still on team (review only)

`dhe.org.in`, `rase.co.in`, `shikshamahakumbh.com`, `raseconferences.com`, `raseconferneces.com`, `tredul.in`, `tudu.co.in`, `sarvatr.co.in`, `itrchandigarh.org`

**Optional cleanup:** `raseconferences.com` / typo domain if no longer used.

---

## Credentials & secrets — NOT on GitHub (transfer separately)

These are **not** moved by repo transfer. Verify in each dashboard:

| Service | Used by | Where to manage |
|---------|---------|-----------------|
| **Render** | `vie-rase-backend.onrender.com` | [render.com](https://render.com) — login/API still in `pub.dhe.org.in` code |
| **Vercel env vars** | All 4 canonical sites | Vercel → Project → Settings → Environment Variables |
| **Supabase** | dhe.org.in, possibly others | supabase.com dashboard |
| **Razorpay** | dhe.org.in, rase | razorpay.com dashboard |
| **GoDaddy DNS** | All domains | domaincontrol.com — nameservers point to Vercel |
| **GitHub OAuth apps** | Vercel ↔ GitHub | Vercel Integrations + GitHub Settings → Applications |
| **gh CLI tokens** | Local deploys | `shiksha-mahakumbh` + `dheWeb` in Windows keyring — **keep both** |

### Vercel env (per project — audit in dashboard)

- `NEXT_PUBLIC_API_URL` → Render backend
- `NEXT_PUBLIC_SITE_URL` → site URL
- Any Supabase `NEXT_PUBLIC_SUPABASE_*`
- Razorpay keys on dhe.org.in

**Action:** Log into Vercel as `internsdhe` → each canonical project → confirm env vars still set (repo move does not clear them).

---

## Render API (separate from deleted GitHub repos)

`pub.dhe.org.in` still calls **`https://vie-rase-backend.onrender.com`** for login, signup, manuscripts.

- GitHub repo `dhevb/Vie_rase_backend` was **deleted** (unused duplicate)
- **Render service** may still run independently — audit at render.com
- If unused: disable Render service to save cost
- If used: no GitHub transfer needed; manage via Render dashboard

---

## What does NOT need transfer

| Item | Reason |
|------|--------|
| Git history on user accounts | Repos empty |
| Vercel projects | Already on `dhe-projects` team |
| DNS / domains | Team-level on Vercel, not per GitHub user |
| `tredul`, `tudu`, `sarvatr`, etc. | Already on `dhevb` or separate products |

---

## Recommended follow-ups (optional)

1. **Add `shiksha-mahakumbh` to `dhevb` org** (member role) — org admin (`dheWeb` or `bigbyte151`) invites via GitHub → Organization settings → Members
2. **Audit Render dashboard** — confirm `vie-rase-backend` owner account; shut down if truly unused
3. **Vercel → Settings → Git** — confirm GitHub App has access to `dhevb` org repos only
4. **Rotate tokens** (optional security hygiene) — Vercel deploy tokens, Render API keys if team members changed
5. **DNS cleanup** — remove stale conference subdomain records (sk23/sk24/sk25/sm24)

---

## Account disposition

| Account | Keep? | Role going forward |
|---------|-------|-------------------|
| **dhevb** (org) | ✅ | All production code |
| **dheWeb** | ✅ | Org admin, Vercel/git deploys |
| **shiksha-mahakumbh** | ✅ | CI user / secondary; add to org for push access |
| **internsdhe** (Vercel) | ✅ | Team owner on Vercel |

No GitHub repos remain on personal accounts. Migration is **complete** for code and Vercel git links.
