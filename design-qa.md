# OneLaser Homepage Design QA

## Comparison target

- Overall source visual truth: `/Users/yongyuan/.codex/generated_images/01a032c2-4b43-7912-848c-37760ec1eb31/exec-cc036295-7872-4d18-9023-1d92f772311c.png`
- Product-grid override: `/Users/yongyuan/Documents/XRF Gen2 网页/references/incoming/onelaser-official-product-grid-reference.png`
- Design-system source: `/Users/yongyuan/Documents/XRF Gen2 网页/UI-SPEC.md`
- Desktop implementation evidence: `/Users/yongyuan/Documents/XRF Gen2 网页/references/incoming/homepage-final-desktop-top.png` and `/Users/yongyuan/Documents/XRF Gen2 网页/references/incoming/homepage-final-desktop-bottom.png`
- Mobile implementation evidence: `/Users/yongyuan/Documents/XRF Gen2 网页/references/incoming/homepage-mobile-xrf-system.png` and `/Users/yongyuan/Documents/XRF Gen2 网页/references/incoming/homepage-mobile-end.png`
- Combined source and implementation comparison: `/Users/yongyuan/Documents/XRF Gen2 网页/references/incoming/design-qa-combined.png`
- Dense-gallery source/implementation comparison: `/Users/yongyuan/Documents/XRF Gen2 网页/references/incoming/homepage-gallery-density-comparison.png`
- Product-hover implementation evidence: `/Users/yongyuan/Documents/XRF Gen2 网页/references/incoming/homepage-product-hover-final.png`
- Generated WHY image evidence: `/Users/yongyuan/Documents/XRF Gen2 网页/references/incoming/homepage-why-image2-final.png` and `/Users/yongyuan/Documents/XRF Gen2 网页/references/incoming/homepage-why-image2-mobile-final.png`
- Image 2 audience assets: `public/assets/home-industry-makers-v2.jpg`, `public/assets/home-industry-business-v2.jpg`, and `public/assets/home-industry-education-v2.jpg`.

## Viewport and normalization

- Overall source pixels: 727 × 2162.
- Product-grid source pixels: 2678 × 2288.
- Brochure performance source crop: `/Users/yongyuan/Documents/XRF Gen2 网页/references/incoming/brochure-rf-core-crop.png`.
- Brochure-led WHY implementation evidence: `/Users/yongyuan/Documents/XRF Gen2 网页/references/incoming/homepage-brochure-why-desktop.png`.
- Desktop implementation pixels: 1440 × 4096 for each upper/lower checkpoint; CSS viewport 1440 × 4096; device scale factor 1.
- Mobile implementation pixels: 390 × 844; CSS viewport 390 × 844; device scale factor 1.
- The combined comparison normalizes source and implementation to equal column widths and top alignment. Focused mobile evidence is reviewed at native 390 px width.
- State: homepage, XRF campaign hero, default product grid. Additional interaction states cover carousel navigation, open/closed YouTube modal, and open/closed mobile navigation.

## Full-view comparison evidence

The combined comparison confirms the selected hierarchy from header through footer: white navigation, adaptive 3840 × 1200 campaign carousel, an `Engrave the Future` introduction and four-machine 2 × 2 campaign grid, brochure-led WHY ONELASER proof, a full-viewport finished-project rail, a full-viewport editorial YouTube rail, three separate maker/business/education panels, the required three-part brand promise, and the official-content dark footer. The former results banner, engineering-story stack, three-step workflow, duplicate support rail, payment-logo row, and final CTA were intentionally removed following direct user feedback.

The implementation uses the official OneLaser product card order, images, labels, copy, parameter pills, and Explore Now actions from the later user-supplied product-grid override. This later source intentionally supersedes the simpler product cards shown in the original generated mock.

## Focused comparison evidence

- Product grid: the official override and implementation are shown together in `home-products-refinement-combined.png`. Card order, labels, copy, parameters, machine identity, and text actions match. The latest user-supplied Cobra, XRF, Hydra Gen2, and VertiGo renders replace the earlier files. OneLaser red, 24 px radii, Certia typography, and mobile single-column behavior follow the XRF Gen2 UI specification.
- Hero: the exact three supplied 3840 × 1200 campaign artworks remain intact and uncropped at desktop inside the required 600 px stage.
- WHY ONELASER: the brochure-led module now uses one dominant RF engineering image beside six distinct, numbered advantages. The image, statement, outcome copy, and technical proof remain separate information levels rather than being merged into generic cards. The module follows ENDLESS POSSIBILITIES as requested.
- Product families: the clean machine render remains the default state. On fine-pointer hover and keyboard focus, each card crossfades to its supplied real-world machine scene with a controlled dark gradient, white technical copy, and no layout shift; touch devices retain the stable default card.
- Finished projects: nineteen real engraving outputs form an edge-to-edge horizontal scroll-snap gallery: three dense rows on desktop and two rows on mobile. Each card owns its image and material label, opens an accessible enlarged-image viewer with a consistent image-stage height, and uses no synthetic placeholder or code-drawn asset.
- Videos: four real local YouTube covers replace generic placeholders in an edge-to-edge horizontal rail. The video story now follows THE ONELASER STANDARD as requested. Iframes are absent until interaction, and removed on close.
- Mobile: native 390 px captures confirm no document overflow, readable copy, a 12 px minimum visible text floor, single-column product cards, intentional horizontal media rails, a working navigation drawer, and a complete two-column-to-single-column footer adaptation.

## Findings

- No actionable P0, P1, or P2 fidelity issues remain.
- Fonts and typography: Certia is used throughout; editorial headings are 48 px desktop and 32 px mobile; card and body hierarchy follows `UI-SPEC.md`; visible text floor is 12 px.
- Spacing and layout rhythm: 12–16 px card grouping, 24–28 px product radii, 48 px desktop / 32 px mobile section boundaries, one shared 1280 px editorial axis, and an aspect-correct Hero capped at 600 px are consistent with the XRF Gen2 system. Product, project, WHY, audience, brand, video, and footer content begin at the same 180 px desktop / 18 px mobile axis at the tested viewports.
- Colors and visual tokens: surfaces are `#FFFFFF` / `#F5F5F7`, text uses black / `#6B6B70`, borders use XRF gray tokens, brand accents use `#E7310E`, and primary actions use `#D92D0D`.
- Image quality and asset fidelity: all production images load with real natural dimensions. The Maker, Business, and Education panels use three 1536 × 1024 Image 2 photographs centered on people and finished work, with no machine or equipment visible. No machine render, logo, video cover, or photographic module uses a placeholder or code-drawn approximation.
- Copy and content: the product grid uses live official OneLaser copy verified from `https://www.1laser.com/`; the WHY module uses the supplied brochure copy directly; the closing brand statements use the user's text verbatim; header and footer information follow the current official homepage.
- Browser checks: zero broken or pending images, zero document overflow at desktop and 390 px, and a 12 px mobile text floor. The project and video rails advance, the project lightbox moves between images and restores page scrolling on close, the lazy video modal inserts exactly one iframe and removes it on close, and the mobile navigation opens and closes correctly.
- Footer checks: the full dark footer uses the same content axis as the section above. Its desktop demo action and subscription form are both exactly 48 px high; the mobile form intentionally stacks for touch usability without overflow.

## Comparison history

1. Initial product cards lacked the official labels, specification pills, and CTA anatomy. Fixed by verifying the live OneLaser homepage and rebuilding the 2 × 2 grid with the supplied official reference. Post-fix evidence: `homepage-final-desktop-top.png` and `homepage-mobile-xrf-system.png`.
2. Initial audience panels allowed embedded banner copy to overlap the new overlay copy. Fixed by using the approved right-side image crop. Post-fix evidence: `homepage-final-desktop-bottom.png`.
3. Initial homepage tokens drifted from the XRF Gen2 system in card radius, accent red, heading sizes, play-control scale, and mobile card layout. Fixed with 24 px product radii, `#E7310E` / `#D92D0D`, 48/32 px editorial headings, 72/58 px play controls, and single-column mobile product cards. Post-fix evidence: desktop and 390 px captures above.
4. A trial full-bleed Hero crop clipped the banner's left-side message at 1440 px. Reverted to uncropped `contain` rendering inside the exact 600 px stage. Post-fix evidence: `homepage-final-desktop-top.png`.
5. The first WHY ONELASER draft combined unrelated brochure statements into one narrative. Rebuilt it as three discrete brochure claims with one outcome and proof set per card. Post-fix evidence: `homepage-brochure-why-desktop.png`.
6. The homepage lacked the requested breadth of finished-work evidence. Added a nineteen-item, three-row desktop gallery with full-viewport horizontal movement, two-row mobile adaptation, and an accessible fixed-height enlarged-image viewer.
7. The prior footer and navigation were simplified approximations. Rebuilt both from the current official OneLaser information architecture while retaining the XRF Gen2 white/light-gray visual system.
8. The first carousel indicator used framed dots and did not communicate timing. Replaced it with borderless 52 px progress bars whose active fill mirrors the 6.5-second banner cycle, with a reduced-motion fallback.
9. The product grid initially communicated only isolated machines. Added four supplied real-world scene images as progressive hover/focus states while preserving the uncluttered white default and mobile behavior.
10. The WHY media mixed brochure artwork and inconsistent visual languages. Replaced all three images with purpose-generated 3:2 industrial photography tied one-to-one to the approved RF precision, vision intelligence, and speed claims.
11. Footer and media rails used different horizontal calculations. Unified every major heading, body, first card, footer lead, footer columns, and footer bottom rule to the XRF Gen2 1280 px content axis.
12. The product specifications read as plain ruled rows. Rebuilt them as compact 10 px rounded rectangles on desktop and 9 px on mobile, with a translucent dark hover treatment over the machine scenes.
13. The three-card WHY layout felt like separate campaign tiles rather than the supplied brochure. Rebuilt it as one technical image plus a structured six-point editorial introduction.
14. The audience panels still showed laser machines. Replaced all three with purpose-generated Maker, Business, and Education scenes showing only people, engraved outcomes, business fulfillment, and hands-on STEM work.

## Primary interactions tested

- Hero autoplay structure, direct slide-dot selection, keyboard arrows, and swipe handlers.
- YouTube cover opens the accessible lazy modal; close removes the iframe; overlay and Escape close are implemented.
- Mobile menu opens, exposes navigation, and closes after navigation.
- Product, demo, YouTube, support, email, telephone, footer, and internal XRF links have real destinations.
- Fine-pointer hover transitions reveal each product's corresponding scene; moving away restores the original machine render without affecting card geometry.

## Follow-up polish

- P3: re-evaluate line breaks at intermediate tablet widths after future localization or copy changes.

final result: passed

---

# OneLaser V3 Lineup and Density Polish QA

## Scope

- Restored the machine lineup to the original homepage card anatomy, copy hierarchy, parameter pills, scene hover treatment, and mobile single-column layout.
- Added exact user-supplied Finder positioning lines plus compact, source-backed specification pills for all four machines.
- Matched the material filter control to the Ambition tabs, added restrained Ambition hover/focus feedback, rebalanced the project modal columns, aligned the Standard image to the content axis, and reduced Standard vertical whitespace.
- Replaced the Demo Room Explore card with an official Testimonials path.

## Responsive and interaction checks

- Desktop: 1502 × 1179; machine grid is two equal 632 px columns with four 650 px cards; filter and Ambition controls both measure 52 px outer / 42 px button; Standard image and content axes align at 1280 px.
- Project modal desktop columns measure approximately 321 / 419 / 354 px for specifications / earnings / machine, with no internal overflow.
- Mobile: 390 × 844; document width is 390 px with no horizontal page overflow; machine cards are one 354 px column and 500 px high; Finder result cards scroll independently without content overflow.
- Standard padding is 44 px desktop, 32 px tablet, and 24 px mobile. Ambition hover/focus produces image scale, elevation, and red CTA feedback with a reduced-motion fallback.
- Changed module images loaded with real natural dimensions, including 1320 × 1356 scene images, 800 × 800 machine renders, 1536 × 1024 Ambition art, and the 1800 × 729 headquarters image.
- Console: no warnings or errors in the checked desktop and mobile flows.

final result: passed
---

# OneLaser V3 Performance Section Design QA

## Comparison target

- Source visual truth: `references/incoming/selected-performance-option.png`
- Implementation screenshot: `references/incoming/v3-performance-desktop-final-1614x1179.png`
- Responsive screenshot: `references/incoming/v3-performance-mobile-final-390x844.png`
- Full-view comparison: `references/incoming/v3-performance-design-qa-comparison.png`
- Focused comparison: `references/incoming/v3-performance-design-qa-focused.png`
- Desktop viewport: 1614 × 1179 CSS px, device scale factor 1
- Mobile viewport: 390 × 844 CSS px, device scale factor 1
- Source pixels: 1467 × 1072
- Desktop implementation pixels: 1614 × 1179
- Full comparison normalization: both sides resized to 807 × 590
- Focused comparison normalization: selected control, stage, and proof strip cropped from each source and resized to 807 × 520
- State: RF Precision selected; fixed site header visible

## Findings

- No actionable P0, P1, or P2 differences remain.
- Typography: Certia display typography, headline weight, body hierarchy, proof metrics, and 12 px minimum text floor match the selected direction and the existing OneLaser system.
- Spacing and layout rhythm: the centered heading, unified selector, 60/40 stage, rounded proof ledger, and one-link close reproduce the selected hierarchy without restoring the former stacked-card length.
- Colors and tokens: white and `#F5F5F7` surfaces, black media field, muted gray copy, OneLaser red proof accents, and restrained borders remain within the approved site tokens.
- Image quality: the RF visual uses the supplied real RF assembly. Its separate production crop removes the unrelated comparison sample while preserving the physical assembly and sharp native pixels.
- Copy and content: all three tab labels, headlines, descriptions, and proof values come from the existing approved V3 data. No new commercial or performance claim was introduced.
- Interaction and accessibility: all three tabs work by click and Left/Right Arrow keys, expose tab and tabpanel semantics, retain visible focus, and disable transition motion under reduced motion.
- Responsive behavior: at 390 px the selector fits without internal or document overflow, the stage becomes image-first vertical content, the page width equals the viewport, and the selected image loads at a non-zero natural size.

## Comparison history

1. First implementation comparison: the shared RF source still exposed part of its unrelated lion comparison sample and required an aggressive crop. Severity P2 because it weakened product-image clarity.
2. Fix: created `public/assets/why-onelaser-rf-system.webp` from the supplied RF source, removed only the sample area over the pure-black background, and retained the complete RF assembly.
3. Post-fix comparison: the focused selector, stage, copy panel, proof ledger, radii, and content hierarchy align with the selected visual. The user-requested unified gray pill intentionally replaces the mock's red underline and decorative tab icons.

## Open questions

- None.

## Implementation checklist

- [x] Unified three-tab performance selector
- [x] Functional click and keyboard switching
- [x] One shared media-and-copy stage
- [x] Compact three-part proof ledger
- [x] Real RF asset retained and cleaned for this slot
- [x] Desktop and 390 px responsive verification
- [x] Console errors checked

## Follow-up polish

- None required for handoff. The unified selector treatment is an intentional user-directed difference from the generated option.

final result: passed
---

# OneLaser V3 Finder and Closing Modules Design QA

## Sources and captures

- Machine finder reference: `/var/folders/vd/kws8fm5509l6b9hnywhd8yfr0000gn/T/codex-clipboard-7956c80e-f71f-4aa3-8a66-49f6ede1a4a2.png` — 2580 × 672.
- OneLaser Standard reference: `/var/folders/vd/kws8fm5509l6b9hnywhd8yfr0000gn/T/codex-clipboard-8a4d2abf-8b4a-48da-8576-ea3fc88f86a0.png` — 2582 × 2056.
- Explore and final CTA reference: `/var/folders/vd/kws8fm5509l6b9hnywhd8yfr0000gn/T/codex-clipboard-48a499b6-45ee-4df3-ad5e-6d23435a9612.png` — 2600 × 1348.
- Desktop implementation captures: `references/incoming/v3-finder-desktop.png`, `references/incoming/v3-standard-desktop.png`, and `references/incoming/v3-explore-desktop.png` — each captured at a 1598 × 1179 viewport.
- Mobile implementation captures: `references/incoming/v3-finder-mobile-fixed.png`, `references/incoming/v3-standard-mobile.png`, and `references/incoming/v3-explore-mobile.png` — each captured at a 390 × 844 viewport.
- Combined comparison: `references/incoming/v3-design-comparison.png` — 1480 × 2100.

## Comparison findings

- The machine finder keeps the reference hierarchy, pale-gray rounded container, two-column desktop form, and red pill action while extending the interaction to four required inputs and two explained machine matches.
- The OneLaser Standard preserves the reference's full-width aerial proof, left-aligned ownership message, four equal proof columns, and centered support action. Mobile changes the proof row to a horizontal snap rail to reduce page height.
- Explore preserves the reference's three-column editorial links and black final action panel. The existing V3 type, spacing, and OneLaser red tokens remain consistent.
- The existing Makers, Business, and Education tabbed stage remains the approved single-stage pattern and was not duplicated.

## Responsive and interaction checks

- Desktop: 1598 × 1179; no document overflow; old `#why-onelaser` section absent.
- Mobile: 390 × 844; no document overflow; minimum customer-facing text in the changed modules is 12 px.
- Finder: all four native selects are required; submission returns exactly two linked recommendations; the test cases returned VertiGo + XRF for tumbler engraving and Cobra + Hydra for large production cutting/engraving.
- Images: finder machine images, ambition art, and the 1800 × 729 headquarters image loaded with real natural dimensions.
- Console: no warnings or errors in the checked desktop and mobile flows.

## Iteration history

1. Initial mobile review found long material option text expanding the form's min-content width and clipping controls.
2. Added explicit min/max-width constraints to the form, select, results, and mobile result rail.
3. Rechecked at 390 px: form width 314 px inside a 354 px finder, document width 390 px, and the recommendation rail scrolls independently (314 px viewport / 670 px content).

final result: passed
