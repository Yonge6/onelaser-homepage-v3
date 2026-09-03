# OneLaser Homepage + XRF Gen2 Current State

Updated: 2026-09-03 (Asia/Shanghai)

## Start here

This is the sole routine continuation handoff. Work directly in `/Users/yongyuan/Documents/XRF Gen2 网页`; do not create a worktree. Preserve all untracked `qa/*.png`. Use focused inspection only and never replay old task logs or read the archived decision file in full.

## Routes

- V3 repository: `Yonge6/onelaser-homepage-v3`, branch `main`.
- OneLaser Homepage V3: `https://yonge6.github.io/onelaser-homepage-v3/`.
- Retained XRF Gen2 detail: `https://yonge6.github.io/onelaser-homepage-v3/?page=xrf`.
- Protected V2: `https://yonge6.github.io/onelaser-homepage/` at baseline `1b6ac43`; do not overwrite or redeploy it from V3 work.

## Current homepage state

- Narrative order is Hero Campaigns → machine lineup → Made with OneLaser → performance → audience fit → real-world proof → OneLaser Standard → Explore / Community → footer.
- The four-machine lineup explains project fit before specifications and preserves the Cobra, XRF, Hydra Gen2 and VertiGo capability boundaries.
- Finished work restores all 42 V2 project images in a dense material-filtered rail: three rows on desktop and two rows on mobile. Performance follows the user-approved three-stage anatomy: one dark metric-led RF system stage, two supplied evidence images, then the complete user-supplied 01–06 capability set in a divided desktop grid and mobile snap rail. The extra Vision and Speed images and the comparison link remain removed. Makers, Business and Education share one tab-controlled stage with the same expert-consultation CTA.
- The real-world video module keeps the protected V2 heading, story link, card sizing and rail rhythm.
- Existing global navigation, Mega Menu, image placeholder system, project modal, lazy video modal, accessibility and XRF detail route remain intact.
- Desktop uses a 2 × 2 lineup with single-line lineup and project-introduction descriptions at wide breakpoints. Mobile uses horizontal scroll-snap rails and a 390 px-specific campaign treatment.
- All four lineup machine renders are visually centered within the open media area while retaining aligned copy and Explore actions.
- The three ambition images are 84–127 KB WebP files and are preloaded for immediate tab switching. Explore cards use a shared hover/focus treatment, and The OneLaser Standard title is `Make better with one.`.
- Performance and Built for Every Ambition headers follow the shared 1280 px left-aligned content baseline.
- The redundant `Ready When You Are` final CTA panel has been removed; Explore transitions directly to the footer.

## Current collection state

- The public machine collection route is `/collections/` in the independent V3 repository.
- Nine current machines and four previous-generation machines use the user-supplied Cobra, Hydra Gen2 and VertiGo specification workbooks; X Series and first-generation Hydra specifications use the official OneLaser product pages. Live pricing remains sourced from the current official product pages.
- Cobra cards identify the 2W/3W/5W IR module as an optional upgrade. Hydra 9/13/16 Gen2 cards distinguish the 38W RF + glass-tube Hybrid configuration from the 70W RF Pro configuration.
- The standalone `Choose the platform first` family module is removed. The catalog now follows the Finder directly.
- Finder uses the standard 48 px desktop / 32 px mobile section rhythm, including an explicit white boundary below it before the catalog begins.
- Finder recommendations reuse each family profile's verified specification pills, matching the product-family tag treatment on the homepage.
- The Finder submit action gives desktop hover feedback through a darker red surface, lift, stronger shadow and arrow movement, with a pressed state and reduced-motion fallback.
- The sticky catalog filter follows the compact xTool-style hierarchy: Price, Primary job, Material, Laser Power and Series. Price uses a synchronized red dual-thumb range slider plus minimum/maximum inputs; Laser Power and Series are multi-select OR groups with square checkmarks, while different groups combine with AND logic. Group headings are 14 px and vertically centered between the preceding divider and first option. The header shows active-filter and result counts, and mobile uses the existing bottom drawer.
- Every discounted product card calculates and displays `Saved $X` from its official current and compare-at prices.
- Current machine prices use Certia 800 consistently on cards and in the comparison table.
- The comparison table covers eleven decision fields, including exact laser configuration, work area, raster engraving speed, acceleration, positioning accuracy and engraving resolution. Its per-machine remove action is a lightweight Old Glory Blue text control with an outlined close-circle.
- The previous-generation disclosure uses a visible 42 px red-outlined pill control with hover, keyboard-focus, pressed and expanded-state feedback; reduced-motion users receive the same state changes without transitions.
- The previous-generation disclosure leads with `Proven performance. Exceptional value.` and positions the remaining machines as mature, capable platforms at a more accessible price, followed by a concise very-limited-inventory prompt without implying guaranteed financial returns.
- The Buying Guide leads with the benefit-focused heading `We’ll help you choose with confidence.` before its three practical decision steps.
- The 13-video customer-story rail is full-bleed and matches the XRF listing card height: an intrinsic 16:9 cover plus a fixed 174 px copy area. Long titles clamp to two lines so no card stretches the row; all covers remain 1280 × 720 with no crop or CSS blank space.

## Validation state

- `npm run verify` passes.
- Desktop and 390 × 844 have zero document overflow, a 12 px minimum visible text floor and 64/64 loaded homepage images with real natural dimensions.
- Browser console errors and warnings are empty.
- Collection desktop and 390 × 844 checks have zero document overflow; the comparison table uses contained horizontal scrolling on mobile, the Price and Laser Power filters return the expected products, and all 13 full-bleed story covers load at 1280 × 720.
- The 42-image material filter, ambition image tabs, Explore hover treatment and mobile menu are interaction-verified; the earlier Hero, Mega Menu, project modal and lazy video behavior remains intact.

## Working-tree contract

- Existing `qa/*.png` files are user-owned evidence. Never stage, rename, overwrite or delete them.
- Temporary visual evidence stays in ignored `references/incoming/`; production assets live in `public/assets/`.
- Run `./scripts/compact-status.sh`, then `npm run verify` after scoped changes.
- For publication, commit only V3 target files and push `main` only to the independent `Yonge6/onelaser-homepage-v3` remote. Validate the cache-busted V3 homepage without touching the protected V2 remote.
