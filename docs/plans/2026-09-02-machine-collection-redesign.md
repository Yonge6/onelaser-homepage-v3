# Machine Collection Redesign

## Goal

Create a public GitHub Pages `/collections/` route for the OneLaser machine collection that helps a buyer identify the right family, narrow the current lineup, compare up to three machines, and continue to the official product or consultation path.

## Considered approaches

1. **Visual reskin of the existing Shopify grid.** Fastest, but it preserves the current price-first catalog logic and mixed product generations.
2. **xTool-style marketplace taxonomy.** Powerful filtering, but too dense for OneLaser's smaller and more coherent product range.
3. **Guided family-first collection.** A compact introduction, existing V3 finder logic, four family stories, intent-first filters, current/legacy separation, and a three-machine compare tray.

Approach 3 is selected because it carries the Homepage V3 narrative into a practical buying task without copying xTool's marketplace density.

## Page anatomy

1. Existing V3 announcement and global navigation.
2. Compact benefit-led collection introduction with `Find my fit` and `Browse all machines` actions.
3. V3-style machine finder returning two explained family recommendations.
4. Four family cards for XRF, Cobra, Hydra Gen2, and VertiGo.
5. Intent-first filters and current-lineup product grid.
6. Sticky compare tray and responsive comparison table.
7. Previous-generation and clearance section.
8. Ownership proof, buying guidance, FAQ, and existing V3 footer.

## Data and interaction

- Product price, compare-at price, title, handle, and image are based on the official OneLaser collection read on 2026-09-02.
- Primary filters use user language: project goal, material, and series. Sorting supports recommended, price, and name.
- Finder scoring reuses the approved V3 family-fit model and explains the two returned paths.
- Comparison is client-side only, capped at three machines, keyboard accessible, and does not simulate cart state.
- Official product links and consultation remain the conversion destinations.

## Responsive and accessibility requirements

- Desktop uses the V3 1280 px content baseline, 2 x 2 family cards, and a three-column SKU grid.
- Mobile uses 18 px gutters, one-card family rail, one-column products, a filter sheet, and a compact compare tray.
- Keep all visible text at 12 px or larger, all primary controls at least 44 px tall, and preserve visible focus styles.
- Filters, comparison selection, result counts, and finder results expose semantic labels and live updates.
- Reduced motion removes lifts and transitions.

## Verification

- Run `npm run verify`.
- Browser-check desktop and 390 x 844 for loaded images, zero horizontal overflow, Finder, filters, sorting, comparison, mobile filter sheet, navigation, and console errors.
- Complete Product Design comparison against the captured Homepage V3 desktop/mobile references and save `docs/qa/machine-collection-design-qa.md` with `final result: passed`.
- Push only the V3 remote `main`, wait for GitHub Pages, and validate the cache-busted `/collections/?v=<commit>` URL.
