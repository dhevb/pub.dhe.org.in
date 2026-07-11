# Language Policy - DHE Publishing Platform

Version 1.0. Applies to pub.dhe.org.in (v1.0.x pilot).

## Model

Separate-journals bilingual model (not full i18n):

- VBE/VBH - current English/Hindi pair
- VIE/VIH - legacy archive English/Hindi pair
- Portal pages default to English with Hindi subtitles

## Rules

1. html lang: en-IN (portal, English journals) or hi-IN (VBH, VIH, bal-shodh-patrika)
2. Devanagari blocks use HindiText component with lang=hi
3. Journal nav/footer labels follow journal.language (src/lib/i18n/journal-labels.ts)
4. Paper CC license text in LicenseNotice, not DOI (OI-015)
5. hreflang en-IN/hi-IN on journal routes (metadata + sitemap)

## Future (v1.1+)

- Hindi portal pages without duplicate routes
- next-intl if locale URLs required
- Hindi author guidelines when uploaded

## References

- src/lib/journals/config.ts
- src/lib/i18n/
- src/lib/seo/hreflang.ts
- docs/TECHNICAL_DEBT.md (OI-015)