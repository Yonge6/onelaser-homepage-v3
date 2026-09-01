# OneLaser Homepage + XRF Gen2 Current State

Updated: 2026-09-01 (Asia/Shanghai)

## Start here

This is the sole routine continuation handoff. Work directly in `/Users/yongyuan/Documents/XRF Gen2 网页`; do not create a worktree. Preserve all untracked `qa/*.png`. Use focused inspection only and never replay old task logs or read the archived decision file in full.

## Routes

- V3 repository: `Yonge6/onelaser-homepage-v3`, branch `main`.
- OneLaser Homepage V3: `https://yonge6.github.io/onelaser-homepage-v3/`.
- Retained XRF Gen2 detail: `https://yonge6.github.io/onelaser-homepage-v3/?page=xrf`.
- Protected V2: `https://yonge6.github.io/onelaser-homepage/` at baseline `1b6ac43`; do not overwrite or redeploy it from V3 work.

## Current homepage state

- Narrative order is Hero Campaigns → machine lineup → Made with OneLaser → performance → audience fit → real-world proof → OneLaser Standard → Explore / Community / Final CTA.
- The four-machine lineup explains project fit before specifications and preserves the Cobra, XRF, Hydra Gen2 and VertiGo capability boundaries.
- Finished work restores all 42 V2 project images in a dense material-filtered rail: three rows on desktop and two rows on mobile. Performance uses the user-approved `OneLaser means high performance, reinvented.` content in one unified RF Precision / Speed & Motion / Vision Workflow selector, with two supplied RF proof images and three compact brand-proof cells. Makers, Business and Education share one tab-controlled stage with the same expert-consultation CTA.
- The real-world video module keeps the protected V2 heading, story link, card sizing and rail rhythm.
- Existing global navigation, Mega Menu, image placeholder system, project modal, lazy video modal, accessibility and XRF detail route remain intact.
- Desktop uses a 2 × 2 lineup with single-line lineup and project-introduction descriptions at wide breakpoints. Mobile uses horizontal scroll-snap rails and a 390 px-specific campaign treatment.
- The three ambition images are 84–127 KB WebP files and are preloaded for immediate tab switching. Explore cards use a shared hover/focus treatment, and The OneLaser Standard title is `Make better with one.`.

## Validation state

- `npm run verify` passes.
- Desktop and 390 × 844 have zero document overflow, a 12 px minimum visible text floor and 64/64 loaded homepage images with real natural dimensions.
- Browser console errors and warnings are empty.
- The 42-image material filter, performance mouse/keyboard tabs, ambition image tabs, Explore hover treatment and mobile menu are interaction-verified; the earlier Hero, Mega Menu, project modal and lazy video behavior remains intact.

## Working-tree contract

- Existing `qa/*.png` files are user-owned evidence. Never stage, rename, overwrite or delete them.
- Temporary visual evidence stays in ignored `references/incoming/`; production assets live in `public/assets/`.
- Run `./scripts/compact-status.sh`, then `npm run verify` after scoped changes.
- For publication, commit only V3 target files and push `main` only to the independent `Yonge6/onelaser-homepage-v3` remote. Validate the cache-busted V3 homepage without touching the protected V2 remote.
