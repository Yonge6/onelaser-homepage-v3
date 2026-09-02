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

## Final result

passed
