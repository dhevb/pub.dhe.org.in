# Contributing

Guidelines for developers contributing to Viksit Bharat Journal.

---

## Getting Started

```bash
git clone https://github.com/dhevb/pub.dhe.org.in.git
cd pub.dhe.org.in
npm install

# Create local env
echo "NEXT_PUBLIC_SITE_URL=http://localhost:3000" > .env.local
echo "NEXT_PUBLIC_API_URL=https://vie-rase-backend.onrender.com" >> .env.local

npm run dev
```

Open http://localhost:3000

**Requirements:** Node.js ≥ 20

---

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production (Vercel auto-deploy) |
| `platform-upgrade` | Active development branch |
| Feature branches | `feature/description` off `platform-upgrade` |

---

## Before Submitting

```bash
npm run lint
npm run qa:papers      # Must pass 20/20
npx tsc --noEmit       # Run after npm run build
npm run build
```

For route changes:

```bash
npm run dev            # Terminal 1
npm run qa:smoke       # Terminal 2
```

---

## Coding Standards

### TypeScript

- Strict mode enabled
- Prefer explicit types on public APIs
- Use `@/` path alias (`src/`)

### Components

| Rule | Detail |
|------|--------|
| Server by default | Only add `"use client"` when hooks/events required |
| No redesign scope creep | Match existing Tailwind tokens and `src/components/ui/` |
| Legacy preservation | Do not delete `src/app/component/` without migration plan |
| Paper immutability | Never delete or break `Paper{1-5}.json` routes |

### Styling

- **Tailwind CSS** with design tokens in `tailwind.config.ts`
- Bharatiya palette: `saffron`, `navy`, `gold`, `green`
- Utility classes: `section-padding`, `container-wide`, `heading-section`
- UI primitives: `src/components/ui/` (Button, Card, Input, Badge)

### API changes

- **Do not change Render backend contracts** without coordination
- New BFF routes go in `src/app/api/`
- Add CSRF validation for mutating routes
- Add Zod validation + sanitization
- Register rate limits in `src/lib/security/rate-limit.ts`

### Security

- Never commit `.env.local`, tokens, or credentials
- Use `secureFetch()` for client mutations
- Sanitize all user input on API routes
- Do not expose backend tokens to client JS (use httpOnly cookies)

### Commits

- Imperative mood: "Add CSRF protection to signup route"
- Focus on **why**, not just what
- One logical change per commit when possible

---

## File Placement Guide

| What | Where |
|------|-------|
| New marketing page | `src/app/your-page/page.tsx` + `PortalShell` |
| New journal section | `src/app/{journal}.rase/Section/page.tsx` |
| Shared UI | `src/components/` |
| Business logic | `src/lib/` |
| Site content | `content/*.json` |
| Static constants | `src/lib/content/` |
| API route | `src/app/api/your-route/route.ts` |
| QA test | `scripts/qa/` |

**Avoid:** Adding to `src/app/component/` unless maintaining legacy parity.

---

## Non-Negotiables

1. **20 paper JSON files** — preserve all `src/app/{vbe,vbh,vie,vih}.rase/output/Paper{1-5}.json`
2. **Legacy routes** — `/vbe.rase/*`, `/vbh.rase/*`, etc. must keep working
3. **Legacy redirects** — do not remove `vercel.json` or `next.config.mjs` redirects
4. **API contracts** — backend path names unchanged (`vbe_getallarticles`, etc.)
5. **ISSN** — `2278-1757` in CMS and journal config

---

## Pull Request Checklist

- [ ] `npm run lint` passes
- [ ] `npm run qa:papers` — 20/20
- [ ] `npm run build` succeeds
- [ ] No secrets in diff
- [ ] New routes added to sitemap if public
- [ ] CSRF on new mutating API routes
- [ ] Documentation updated if architecture changes

---

## Performance Guidelines

See `docs/PERFORMANCE_AUDIT.md` and `docs/PERFORMANCE_FINAL_REPORT.md`.

- Prefer server components
- Use `dynamic()` for below-fold sections
- Do not add heavy dependencies without bundle analysis
- `lucide-react` icons — tree-shaken via `optimizePackageImports`
- Avoid `antd` — removed in Phase 9; use `src/components/ui/`

---

## Related Docs

- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [DEPLOYMENT.md](./DEPLOYMENT.md)
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
