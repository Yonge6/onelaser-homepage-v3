# Machine Collection Design QA

## Visual truth

- Desktop source: `references/incoming/collection-redesign-audit-2026-09-02/02-homepage-v3-desktop.jpg`
- Mobile source: `references/incoming/collection-redesign-audit-2026-09-02/04-homepage-v3-mobile.jpg`
- The existing OneLaser Homepage V3 is the visual source of truth. The collection page intentionally reuses its announcement bar, header, footer, Certia typography, neutral surfaces, OneLaser red, rounded media cards, spacing rhythm, and responsive navigation.
- xTool was used only as a product-finding interaction reference; its visual language was not copied.

## Implementation evidence

| View | Viewport | Screenshot | State |
| --- | --- | --- | --- |
| Desktop | 1280 × 720 CSS px, DPR 2 | `references/incoming/machine-collection-qa/19-desktop-final.jpg` | Page load / hero |
| Mobile | 390 × 844 CSS px, DPR 2 | `references/incoming/machine-collection-qa/18-mobile-final.jpg` | Page load / hero |
| Desktop | 1280 × 720 CSS px, DPR 2 | `references/incoming/machine-collection-qa/03-desktop-finder-results.jpg` | Finder recommendations |
| Desktop | 1280 × 720 CSS px, DPR 2 | `references/incoming/machine-collection-qa/06-desktop-compare.jpg` | Two-product comparison |
| Mobile | 390 × 844 CSS px, DPR 2 | `references/incoming/machine-collection-qa/10-mobile-filter-sheet-fixed.jpg` | Filter sheet open |
| Mobile | 390 × 844 CSS px, DPR 2 | `references/incoming/machine-collection-qa/12-mobile-catalog-fixed.jpg` | Product card and controls |
| Mobile | 390 × 844 CSS px, DPR 2 | `references/incoming/machine-collection-qa/17-mobile-compare-fixed-final.jpg` | Comparison landing |

## Comparison and findings

The desktop and mobile source screenshots were compared directly beside the final implementation screenshots at matching viewport sizes. The implementation preserves the V3 shell and visual system while changing the information architecture from a promotional homepage to a guided buying surface. The hero keeps the same calm neutral palette, large Certia headline, red primary pill, outlined secondary pill, rounded product media, and mobile stacking behavior.

Focused QA covered the Finder form and recommendation state, family selection, responsive filter sheet, sort control, catalog filtering, two-product shortlist, comparison table, external product links, mobile menu shell, and footer. Product images use real OneLaser assets or official Shopify CDN media.

Issues found and resolved:

- P1: Hero and card CTA labels inherited a dark link color on mobile. Fixed with scoped collection-page button color rules.
- P2: The mobile filter confirmation action could fall below the sheet viewport. Fixed with a sticky bottom action.
- P2: Mobile product media delayed the model name below the fold. Reduced the mobile media height while retaining the complete product image.
- P2: Comparison scrolling initially landed below the section heading. Added the comparison anchor and sticky-header scroll offset.
- P2: Several metadata labels rendered at 11px. Raised every customer-facing label to the 12px minimum.

## Verification

- Desktop: 1280 × 720, zero horizontal overflow, 12px minimum visible text, no broken loaded images, no console warnings or errors.
- Mobile: 390 × 844, zero horizontal overflow, 12px minimum visible text, no broken loaded images, no console warnings or errors.
- Deferred images are limited to off-screen horizontal cards and the collapsed legacy-products disclosure; visible images load with real natural dimensions when their content enters view.
- Finder, filters, sorting, family shortcuts, shortlist selection, comparison navigation, and clear-comparison actions respond correctly.

## 2026-09-03 annotation follow-up

- Removed the four-machine media grid from the Hero and reflowed the message into a shorter single-column panel. Evidence: `references/incoming/machine-collection-qa/22-collections-hero-no-machines-desktop.jpg` and `24-collections-hero-no-machines-mobile.jpg`.
- Reduced the desktop filter panel from the original loose vertical treatment to an 837px compact panel at the annotated 1755 × 1179 viewport.
- Made the desktop filter panel sticky at 82px, directly below the 76px fixed header. The checked scroll state held the filter at 82px without page overflow. Evidence: `references/incoming/machine-collection-qa/23-collections-filter-sticky-desktop.jpg`.
- Preserved the mobile bottom-sheet behavior: 655px tall at 390 × 844, fixed to the viewport bottom, with the `Show 9 machines` action fully visible.
- Added a real GitHub Pages entry at `/collections/`; `?page=machines` remains a compatibility route.

## 2026-09-03 visual refinement follow-up

- Rebuilt the Hero as a left-copy/right-image composition using the supplied four-machine lineup image. It remains a single responsive module and stacks the image below the copy at 390px. Evidence: `references/incoming/machine-collection-qa/25-collections-hero-lineup-desktop.jpg` and `27-collections-hero-lineup-mobile.jpg`.
- Standardized interactive button labels to 800 weight. The paired `Explore` and `Compare` actions both resolve to 12px / 800; the Finder submit and mobile filter confirmation resolve to 800.
- Replaced every black product badge with OneLaser action red, moved the custom sort caret 16px inside the select edge, and added breathing room between filter dividers and fieldset titles.
- Standardized major collection section boundaries to 48px desktop and 32px mobile, removing the oversized catalog lead-in while keeping the filter panel sticky at 82px on desktop.
- Rechecked 1755 × 1179 desktop and 390 × 844 mobile: zero horizontal overflow, no broken loaded images, and no console warnings or errors.
- Replaced the compact ownership strip with the approved XRF-style support composition: two cards above and one full-width card below, collapsing to a single column on mobile. Evidence: `references/incoming/machine-collection-qa/28-collections-ownership-support-desktop.jpg` and `29-collections-ownership-support-mobile.jpg`.
- Removed `serious` from customer-facing source copy, including the collection FAQ and XRF authority heading.
- Updated every product-card media badge to Independence Day navy `#002868`, while retaining OneLaser red for primary actions, prices and selected states.
- Set the previous-generation disclosure title to the shared 800 display weight at all breakpoints.
- Added the approved `Real businesses. Real results.` video rail with five live YouTube stories verified through YouTube metadata. The carousel supports arrows, touch/trackpad scrolling, keyboard arrows, reduced-motion behavior and a lazy privacy-enhanced player modal. Evidence: `references/incoming/machine-collection-qa/30-collections-customer-stories-desktop.jpg` and `31-collections-customer-stories-mobile.jpg`.

## Final result

passed
