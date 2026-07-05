# Deployment Guide

## Vercel Deployment

1. Connect GitHub repository to Vercel
2. Set environment variables:

```
NEXT_PUBLIC_SITE_URL=https://pub.dhe.org.in
NEXT_PUBLIC_API_URL=https://vie-rase-backend.onrender.com
```

3. Add custom domain **pub.dhe.org.in** in Vercel → Settings → Domains
4. Deploy — production URL should be `https://pub.dhe.org.in`

## Aligning GitHub & Vercel names (optional)

The live site uses **pub.dhe.org.in**. GitHub repo name (`pub.rase.co.in`) and Vercel project name are labels only — they do not change the public URL if the custom domain is set correctly.

To rename for consistency:

| Platform | Steps |
|----------|--------|
| **GitHub** | Repo → Settings → General → Repository name → `pub.dhe.org.in` |
| **Vercel** | Project → Settings → General → Project Name → `pub.dhe.org.in` |

After rename, update the Git remote URL locally:

```bash
git remote set-url origin https://github.com/shiksha-mahakumbh/pub.dhe.org.in.git
```

## Legacy domain redirects

If **pub.rase.co.in** or old subdomains (vbe.rase.co.in, etc.) still receive traffic, add them in Vercel → Domains and redirect to `https://pub.dhe.org.in`.

## Build Verification

```bash
npm run build
npm run start
```

## Post-Deployment Checklist

- [ ] All 98 routes accessible
- [ ] All 20 papers load correctly
- [ ] `/sitemap.xml` returns valid XML
- [ ] `/robots.txt` accessible
- [ ] `/feed.xml` RSS feed works
- [ ] `/manifest.webmanifest` loads
- [ ] Login/signup connects to backend API
- [ ] Mobile responsive on all pages
- [ ] No console errors on homepage

## GitHub Actions (Recommended)

```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run lint
      - run: npm run build
```
