# Homepage rendering deep dive — 8 October 2026

Review branch: `codex/site-audit`, continuing from `1d15c85`. Local production preview: [localhost:3087](http://localhost:3087/). No deployment or real enquiry submission was performed. The three pre-existing untracked DigiLearn files remain untouched.

## Findings and implementation

**Confirmed improvement opportunity:** the long homepage lays out work, principles and all seven services during startup even though much of that content is far below the viewport. Three rounds comparing normal typography, unbalanced text and JavaScript disabled showed that substantial layout work remains without JavaScript. Removing the established typography did not produce a consistent enough result to justify a visual change.

The homepage now applies `content-visibility: auto` to its three main content sections. Measured section heights at 320, 375, 390, 768, 1024 and 1440 pixels inform responsive intrinsic-size estimates. The browser remembers actual sizes after rendering. The hero, statement, footer, content order, copy, seven services and screenshots retain their existing design. A print override renders every section. The shared server-rendered `Section` component accepts an optional CSS class; other routes keep eager content sections. No client component, new browser script or new dependency was added for this optimisation.

**Confirmed mobile layout defect:** collapsing the existing navigation row moved `main` from 89px to 45px in the document. The header now sits in a sticky slot that reserves both mobile rows while its visible surface compacts. The transparent remainder passes pointer events to the page beneath it. Keyboard focus still restores the navigation. Desktop height remains automatic, and the slot is removed for print. The regression verifies content position, pointer hit testing and focus restoration in addition to the existing contact and Lab flows.

**Rejected optimisation:** deferring individual project cards further reduced layout time in a prototype, but focusing a distant card produced a 0.233 layout-shift score at 320px. Card-level deferral was removed. Project cards retain their original implementation and immediate layout when their containing section is rendered. This decision avoids trading faster startup work for unstable content jumps.

This uses the browser's supported [offscreen rendering mechanism](https://web.dev/articles/content-visibility). It is progressive enhancement: browsers without support render the sections normally. Chromium is the browser tested here; Safari and Firefox behavior and a complete native screen-reader session remain unverified.

## Verification method

The initial DevTools accessibility snapshot omitted deferred headings. Enabling DevTools accessibility before navigation produced the same limited tree. A separate Chrome process with `--force-renderer-accessibility` exposed all main content headings, following [Chromium's documented accessibility activation procedure](https://www.chromium.org/developers/accessibility/testing/automated-testing/ax-inspect/). This is a test-activation distinction, not sufficient evidence of a screen-reader defect. The regression uses separate browser instances: full accessibility activation for heading discovery, and an ordinary browser for find-in-page, focused links, scrolling and screenshots. It does not force sections visible for those normal-browser interactions.

`npm run test:rendering` checks the six required widths. It compares every main heading with the activated accessibility tree, finds a service heading through browser find-in-page, focuses project and service links, visits every project card and section, checks horizontal overflow and layout shift, and verifies the print override. Captures cover the hero and services at 390 and 1440 pixels. Fully rendered homepage axe scans cover light and dark themes so deferred content is not silently excluded from contrast checks. The retained implementation passes all six widths with 23 discoverable main headings, zero startup CLS and zero scripted-flow CLS. All measured section heights match the baseline after rendering. Both axe scans report zero violations. Build, TypeScript and lint checks pass, as do mocked contact submission, Lab controls and header/navigation regressions.

`npm run profile:rendering` alternates three pairs of otherwise identical production-page loads at 390×844 with fourfold Chrome CPU throttling and cold page caches. The baseline disables only section containment through intercepted CSS; the current variant uses the built stylesheet. Both variants use the same interception path. This isolates the implemented CSS change more directly than comparing Lighthouse runs on different days. Durations remain lab diagnostics on a shared Windows host, not field INP or an adoption claim.

## Evidence and limits

The three paired production runs show lower layout and style time in each pair. Median values are:

| CDP diagnostic | Deferral disabled | Retained implementation | Change |
| --- | ---: | ---: | ---: |
| Layout | 1,959 ms | 1,541 ms | −21% |
| Style recalculation | 598 ms | 361 ms | −40% |
| Script execution | 741 ms | 1,109 ms | +50% |
| Total task time | 4,929 ms | 5,938 ms | +20% |

These results support the targeted layout/style saving, not an overall task-time improvement. Script and total timings remain variable on the shared host. See [paired profiles](profile.json), [six-width rendering checks](rendering.json), [two-theme axe results](accessibility.json), [experiments and rejected-card evidence](experiments.json), and [Lighthouse runs](lighthouse.json). The initial Lighthouse back/forward-cache warning was classified by Lighthouse as non-actionable (`NavigationCancelledWhileRestoring`) and did not recur in the second run; it was not treated as a confirmed site defect.

The earlier contact-provider and development-dependency limitations remain in the [main audit](../2026-10-07/README.md); this pass does not establish inbox delivery or repair an unpatched lint dependency. The local build conditionally includes Vercel Analytics only when `VERCEL` is set, so these local results do not represent every production request.

| Captured view | Before | After |
| --- | --- | --- |
| 390px hero | [Before](hero-before.png) | [After](hero-after.png) |
| 390px services | [Before](services-before.png) | [After](services-after.png) |
| 1440px services | [Before](desktop-services-before.png) | [After](desktop-services-after.png) |

The hero and mobile/desktop service captures were visually inspected. The mobile hero PNG is byte-identical to its baseline, as recorded in [screenshot hashes](screenshots.json). The viewport screenshots preserve the current system theme; the separate axe scans explicitly test both light and dark. Rendering checks show the same section heights after all content is visited.

The fresh baseline Lighthouse performance score was 64. Final serial runs scored **67, 75 and 31**, with accessibility, best practices and SEO at 100 and CLS zero in every run. The requested **95 performance target remains unmet**. LCP and blocking time vary substantially, and the paired CDP profile does not establish an overall task-time improvement. A repeatable performance runner is needed for further framework execution and critical-rendering optimisation; this report does not dismiss the low score as solely a host issue. Automated accessibility checks do not replace a complete manual assistive-technology review. The accessibility-activated browser and normal-browser rendering checks deliberately test different conditions.

## Reproduction and rollback

Run `npm ci`, `npm run build` and `npm run start -- --port 3087`, then `npm run test:rendering`. For isolated timing, run `npm run profile:rendering` after other browser checks finish. Reports and working captures default to ignored `.audit/` directories. Avoid running performance measurements alongside a build or other browser tests.

Review this follow-up against `1d15c85`. Revert the rendering follow-up commit to undo just these changes; retain the earlier audit commits and unrelated PURE addition. No production rollback is needed.
