# jontAWorld improvement audit — 7 October 2026

Review branch: `codex/site-audit`. Local production preview: `http://localhost:3087`.
The [8 October rendering deep dive](../2026-10-08/README.md) continues this audit with controlled layout experiments and homepage rendering verification.
This pass preserves the identity, seven services, story, routes, articles, screenshots, integrations, and product limitations. No production deployment, DNS change, environment change, or real enquiry submission was performed.

## Follow-up: startup prefetch and lint advisory

The shared header previously prefetched all seven destinations on initial load. Lighthouse recorded 14 route-data requests and downloaded Lab's client code and styles without a visit. Header links now disable viewport prefetch and call the supported `router.prefetch` API on mouse hover or keyboard focus. The current destination is skipped; navigation still uses Next.js `Link`. Content calls to action retain their existing prefetch behavior.

Comparable Lighthouse traces fell from **38 to 26 requests** and **342,235 to 288,576 transferred bytes**: 12 requests and 53,659 bytes (15.7%) avoided on initial load. Route-data requests fell from 14 to four, for Contact and Work. The separate browser regression verifies no startup About/Lab fetch, prefetch on hover/focus, and Enter navigation to Lab. Build, lint and the existing contact/Lab/navigation regressions pass. These changes alter loading behavior, with no visual design or content change.

The performance score still misses the requested 95 target: the three follow-up runs scored 63, 62 and 55. See [follow-up measurements](performance-followup.json) for individual scores, LCP, blocking time, CLS, request counts and host benchmark indices. Network savings are confirmed; timing results do not demonstrate an overall performance-score improvement. Main-thread execution and layout remain the dominant diagnostics. Accessibility, best practices and SEO remain 100 in the follow-up Lighthouse runs, with CLS zero. A quiet, repeatable browser/CPU environment is still needed to judge further rendering changes without confusing host contention with application work.

The five high-severity development entries share [braces advisory GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm), which lists **no patched version**. Registry checks found `braces` still at 3.0.3 and the latest Next ESLint plugin still using `fast-glob`. Upgrading that lint plugin does not remove the advisory. In the installed plugin, `getRootDirs` invokes glob matching only when `settings.next.rootDir` is configured; this repository has no such setting and uses the default working directory. This narrows the demonstrated exposure to tooling/configuration rather than establishing a runtime site defect. Keep glob configuration trusted; do not interpret this as a dependency fix. The production dependency audit remains clean. No incompatible forced downgrade or vendored glob replacement was applied.

The follow-up is another isolated commit on the review branch. Revert that commit first, then `33ce29e` and `f4072d3`, to roll back the full audit while retaining `d127700` and the pre-existing untracked files.

## Evidence and priorities

| Priority / classification | Route or file | Evidence and user impact | Fix and verification |
| --- | --- | --- | --- |
| P1 confirmed defect | `/contact`, `ContactForm.tsx` | `!result.success` accepted the truthy string `"false"`. A filled honeypot also reset the form and claimed delivery without contacting the provider. Users could lose a message while seeing false success. | Accept only boolean `true` or string `"true"`; reject honeypot submissions without clearing text. Unit and intercepted browser tests cover explicit rejection, malformed/null JSON, HTTP failure, and network failure. |
| P1 improvement opportunity | `/contact` | No fetch deadline; duplicate prevention depended on React state reaching the next render. A stalled request could leave the form pending indefinitely. | Twenty-second timeout and synchronous ref guard. Pending duplicate test passes; failure retains text. Success wording distinguishes provider acceptance from delivery. Provider processing is disclosed and email alternatives retained. |
| P1 confirmed defect | Small text across Home, Work, Lab, Writing, Now and case studies | Axe measured 4.10:1 for caption text on sunken backgrounds, with other tinted panels below 4.5:1. Now's invitation label measured 3.06:1. These are normal-sized visible text. | Darken the existing light-theme faint token; use the inherited foreground on the inverted invitation. All 16 content pages pass the selected WCAG A/AA axe rules in both themes after these changes. |
| P1 confirmed defect | Home build-process `dl` | Axe's `definition-list` rule reports invalid `div > span` siblings inside the definition list. | Put each supporting line inside its `dd`; preserve the grid appearance. Axe no longer reports the violation. |
| P1 improvement opportunity | Shared mobile navigation | Downward scrolling could collapse navigation while a header link was focused; collapsed links were removed from the tab order without a keyboard focus path that reopened them. | Keep the row visible while primary navigation contains focus, and reopen it when any primary-nav control receives focus. Browser regression exercises collapse followed by header focus. This site has a scrolling link row, not a menu dialog, so Escape and focus trapping do not apply. |
| P2 confirmed inconsistency | Home and project content | Home grouped products as “In production,” while the case studies explicitly call ApprenticeLog, ElectraCore, SafeSignal, and PURE previews and describe inactive services. Reachable deployments alone do not establish readiness. | Replace the aggregate production claim with “Explore the products” / “Products you can explore.” Preserve individual limits, including SafeSignal's on-device records and absence of monitoring, messaging, calling, or dispatch. |
| P2 confirmed inconsistency | `/now` | Three pictured products included TrailDesk, while Building listed ElectraCore, ApprenticeLog and the portfolio. The caption called the pictures three products currently in progress. | Identify the pictures as lessons from named projects and direct readers to the current-focus list. Preserve the owner's existing list. No new priorities or update date are invented. |
| P2 confirmed inconsistency | `/lab` snippets | Local linked-product source includes ApprenticeLog's audit note and DigiLearn's `lastVisited` handling, which the displayed excerpts omit. `parseProgress` normalises to version 2 rather than validating an incoming version. | Label shortened excerpts and the omitted field; accurately describe normalisation. SafeSignal's timer implementation matches its excerpt. Keyboard edit advances approved/version 4/history 3 to submitted/version 5/history 4; Reset restores the original state. |
| P2 confirmed defect | PURE source link in `content/projects.ts` | Public GitHub source URL returned 404; its deployment returned 200. | Omit the optional unavailable source link without removing the project, case study, assets, or deployment. Fourteen remaining content URLs return 200. A private or renamed repository remains an owner decision. |
| P2 confirmed defect | Static pages and project/article metadata | Rendered static pages inherited Home's `og:url` and social title; case studies lacked their own `og:url`. Article `timeRequired` used prose such as `8 min`, rather than an ISO duration. Person `makesOffer` pointed to CreativeWork values rather than offers. | Shared route metadata produces page-specific social URLs, titles, descriptions and images; project/article social records identify their own content. Use `PT8M`-style duration and reverse `creator` relationships. Rendered canonical/social URLs agree in the accessibility evidence. |
| P2 confirmed dependency finding | `package.json`, lockfile | Initial npm audit reported 15 affected package entries, including a critical Next.js entry. Exploitability depends on features and inputs; this is not evidence of a compromised site. The OG generator uses fixed content. | Target Next.js and matching ESLint config at 16.3.6, compatible named transitive updates, and a scoped patched PostCSS override. Production-only audit returns zero advisories. Five high entries remain in the lint dependency chain rooted in `braces`; avoid npm's proposed major downgrade. |
| P2 confirmed waste | Shared `PhoneFrame` | Mobile Lighthouse requested a 24,183-byte optimised DigiLearn phone image even though CSS hides the phone frame below 768px. | Remove phone-image priority/preload, retaining the image and lazy loading. The subsequent mobile request trace contains no `mobile.webp` request. This is a verified request saving, not a claim of improved Core Web Vitals. |
| P2 improvement opportunity | Hero copy | “Digital products” and an interface/system statement did not immediately name the offered deliverables. | Name websites, web apps, and internal tools in the existing paragraph; keep the heading, voice, layout and seven service categories. |

No P0 exposure or critical functioning failure was reproduced.

## Coverage and validation

- Live direct HTTP checks covered all 16 sitemap content pages: seven top-level pages, six case studies (including existing PURE work), and three articles. Each returned 200. Robots, manifest, RSS and OG image returned 200; an unknown route returned a genuine 404.
- Local browser sweeps use 320, 375, 390, 768, 1024 and 1440 CSS pixels, direct navigation/reloads, canonical/title checks, image checks, document overflow and uncaught browser errors. See `coverage.json` for the final results. Scrollable code content is intentionally wider inside its focusable scroll container and does not overflow the document.
- Axe checks every content page at 390px in light and dark themes, with reduced motion enabled. The completed scan reports zero violations across 32 page/theme combinations. This does not replace a full human screen-reader audit or certify WCAG conformance.
- Lint, TypeScript, contact confirmation unit regression, mocked browser workflows, link check and the default Turbopack production build pass. A webpack production build also passed during diagnosis. CI runs the contact confirmation regression.
- Twenty-seven explicit image paths found in app/content source exist. Writing's three referenced v2 images are tracked. Canonicals, sitemap generation, robots, icons, RSS, metadata and genuine 404 behavior were reviewed. No indexed routes were removed.
- Actual live headers include CSP, HSTS, referrer policy, permissions policy and nosniff. Local fonts use the existing CSS stack; no font provider was introduced. Existing hosting/header settings were retained because no breaking header defect was reproduced.

## Measurements and their limits

See `measurements.json` for exact measured values and environments. The local mobile Lighthouse runs use simulated throttling; the desktop host is shared and results varied. The first run before the hidden-image change reported performance 74, accessibility 100, best practices 100, SEO 100, LCP 1.78s, CLS 0 and total blocking time 1.48s. A concurrent final-build run reported performance 56 and LCP 4.08s. These runs are not a reliable before/after timing comparison.

Two serial final-build runs after the browser sweep reported performance 68 / 64, LCP 2.26s / 2.70s, CLS 0 / 0, and total blocking time 1.97s / 4.61s. Accessibility, best practices, and SEO remained 100 in both. The variation persists even without concurrent audit traffic.

The existing performance CI budget is 95. It is not established as passing by these measurements. Investigate the framework chunk's execution and layout work in a controlled three-run mobile CI profile before release. Total blocking time is a lab diagnostic, not INP. No field INP or CrUX result was obtained, and no field-performance improvement is claimed. The scoped Next.js update addresses the affected version range identified in the [Next.js advisory](https://github.com/advisories/GHSA-vcvr-r3jv-pc5j); its conditional exploitability should not be confused with a confirmed site exposure.

The before/after captures here are local production views immediately before and after the contrast, semantic and positioning polish, at 390px in light mode. They are not a baseline for every earlier contact or dependency change.

| View | Before | After |
| --- | --- | --- |
| Hero | [Before](hero-before.png) | [After](hero-after.png) |
| Now invitation | [Before](now-before.png) | [After](now-after.png) |

## Remaining concerns and blockers

1. **Contact provider, unverified:** This repository calls FormSubmit directly and has no local contact server handler. Browser length/email checks and the client honeypot do not establish server validation, payload limits, rate limiting, recipient activation, or inbox delivery. `_captcha: false` remains part of the existing integration. Verify these with provider access and a designated test recipient/environment before treating delivery or spam protection as assured.
2. **Performance, unresolved:** The local Lighthouse performance budget is not met. Host contention and simulated CPU results prevent attributing timing differences to changes. The hidden-image request saving is confirmed, but a controlled profile and optimisation of demonstrated main-thread work remain necessary.
3. **Development dependency, confirmed:** Five npm high-severity package entries share the `eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces` path. npm proposes downgrading the framework lint config to 14.x; this pass intentionally avoids that incompatible forced fix. Production audit is clean.
4. **Owner facts, unverified:** Current personal priorities, product adoption/readiness, commercial outcomes, and PURE's public source location cannot be inferred from a 200 response. Existing specific limitations and the Now Building list were preserved.
5. **Live browser stability, unverified concern:** Early browser navigation stalled, and one earlier retrieval produced a Cloudflare error page. A horizontal-overflow signal did not reproduce on the local site. Subsequent live HTTP checks passed. No site CSS change was made from that signal.

No public preview was deployed. The local preview supports review without publishing changes. Delivery testing and a full manual assistive-technology session remain external verification work.

## Review and rollback

Review this pass relative to `d127700`, which preserves the PURE addition made during the session. The first audit checkpoint is `f4072d3`; the subsequent audit commit contains the remaining changes and this evidence. The three pre-existing untracked DigiLearn verification files were untouched.

Use `git diff d127700..codex/site-audit` to review; `changed-files.txt` lists this pass's files. To roll back after integrating the audit commits, revert the final audit commit and then `f4072d3`; retain `d127700`. Do not reset or clean the shared checkout. No production rollback is needed because this pass was not deployed.

Reproduce basic checks with `npm ci`, `npm run lint`, `npm run typecheck`, `npm run test:contact`, `npm run check:links`, and `npm run build`. Run `npm run start -- --port 3087` and `npm run test:browser` for Windows Chrome regressions. For the responsive sweep, set `BASE_URL=http://localhost:3087` and `AUDIT_OUT=.audit/final`, then run `npm run audit:responsive`. Raw local reports remain in ignored `.audit/`; the reviewable summaries and selected captures are committed here.
