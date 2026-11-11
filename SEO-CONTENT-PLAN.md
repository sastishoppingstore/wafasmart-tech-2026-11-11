# SEO Content Plan — 22 guides (2026-10-30)

All articles live under `/blog/<slug>.html`, are linked from `/blog.html`, and are included
in `dist/sitemap.xml`.

## UAE VAT (7)

1. `/blog/uae-vat-calculator-guide.html` — UAE VAT Calculator Guide 2026
2. `/blog/remove-vat-from-price-uae.html` — Remove VAT from a price in the UAE
3. `/blog/vat-inclusive-vs-vat-exclusive-uae.html` — VAT-inclusive vs VAT-exclusive
4. `/blog/uae-vat-rates-2026.html` — UAE VAT rates 2026
5. `/blog/uae-vat-registration-threshold-small-business.html` — Registration thresholds
6. `/blog/uae-tax-invoice-requirements.html` — Tax invoice checklist
7. `/blog/uae-vat-return-filing-common-mistakes.html` — VAT return mistakes

## Pakistan tools / money (6)

8. `/blog/pakistan-salary-tax-calculator-guide.html` — Salary tax calculator guide
9. `/blog/pakistan-zakat-calculator-guide.html` — Zakat, gold/silver nisab
10. `/blog/pakistan-bmi-calculator-guide.html` — BMI formula and Asian cut-offs
11. `/blog/compress-image-to-50kb-pakistan.html` — Compress images for online forms
12. `/blog/pdf-tools-for-pakistani-students.html` — Free PDF tools for students
13. `/blog/pakistan-freelancer-tax-guide.html` — Freelancer registration/filing checklist

## Free domain & hosting (6)

14. `/blog/free-domain-name-guide.html` — Free domain options and limits
15. `/blog/free-hosting-static-website.html` — Firebase / GitHub / Netlify comparison
16. `/blog/how-to-host-website-free-pakistan.html` — Host a website free in Pakistan
17. `/blog/free-ssl-certificate-guide.html` — Free SSL / HTTPS guide
18. `/blog/free-website-for-small-business-pakistan.html` — Free website for a small business
19. `/blog/domain-vs-hosting-explained.html` — Domain vs hosting

## Construction & materials (3, added 2026-10-30)

20. `/blog/building-material-calculator-guide.html` — Bricks, cement, steel and sand guide
21. `/blog/house-construction-cost-lahore-karachi-2026.html` — Lahore/Karachi construction cost
22. `/blog/building-material-cost-dubai-sharjah-2026.html` — Dubai/Sharjah material cost

New tool: `/tools/building-material-calculator`

## Rebuild

```bash
node build/blog-build.js
node build/tools-build.js   # only if tool guide links/content changed
node build/browser-audit.js
firebase deploy --only hosting --project wafasmart-tech
```

`build/blog-build.js` reads `dist/blog.html` for the shared header/footer shell, writes all
22 generated articles, rebuilds the blog index, and refreshes the `BLOG-GUIDES` block in the sitemap.
It is safe to run repeatedly.

## SEO notes

- Each article has a unique title, meta description, keywords, canonical, OG/Twitter tags,
  `Article`, `FAQPage` and `BreadcrumbList` JSON-LD.
- `/blog.html` has an `ItemList` of all 24 articles (22 generated + 2 featured).
- Articles link to the matching free tool and to 2–3 related guides.
- The construction cluster links to the building-material calculator and the location guides.
- Tool pages for VAT, salary tax, Zakat, BMI, image compression and PDF merging link back
  to their guide via `guide` / `guideTitle` fields in the tool content files.
- Facts that can change (UAE VAT thresholds, FBR slabs, nisab, free-tier limits) are marked
  as "verify with the authority" rather than presented as permanent.
