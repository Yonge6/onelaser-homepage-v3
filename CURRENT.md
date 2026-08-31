# OneLaser Homepage + XRF Gen2 Current State

Updated: 2026-08-31 (Asia/Shanghai)

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
- Finished work is a reduced material-filtered rail; performance is three large editorial stories; Makers, Business and Education share one tab-controlled stage.
- Existing global navigation, Mega Menu, image placeholder system, project modal, lazy video modal, accessibility and XRF detail route remain intact.
- Desktop uses a four-column lineup. Mobile uses horizontal scroll-snap rails and a 390 px-specific campaign treatment.

## Validation state

- `npm run verify` passes.
- Desktop and 390 × 844 have zero document overflow, a 12 px minimum visible text floor and 34/34 loaded homepage images with real natural dimensions.
- Browser console errors, page errors and failed responses are empty.
- Hero, Mega Menu and Escape close, material filter, project modal navigation, ambition tabs, lazy video iframe removal and mobile menu are interaction-verified.

## Working-tree contract

- Existing `qa/*.png` files are user-owned evidence. Never stage, rename, overwrite or delete them.
- Temporary visual evidence stays in ignored `references/incoming/`; production assets live in `public/assets/`.
- Run `./scripts/compact-status.sh`, then `npm run verify` after scoped changes.
- For publication, commit only V3 target files and push `main` only to the independent `Yonge6/onelaser-homepage-v3` remote. Validate the cache-busted V3 homepage without touching the protected V2 remote.
