# Accessories collection design and delivery

## Scope and design

Add `/accessories/` to the independent OneLaser V3 GitHub Pages site. Reuse the existing navigation, footer, Certia typography, white and #F5F5F7 surfaces, rounded panels and collection catalog anatomy. Keep all 28 official accessories, organized first by six machine families and then by six accessory types. Desktop uses a sticky filter sidebar and three-column catalog; mobile uses a native modal filter sheet and single-column product cards.

The page sequence is introduction with a static accessories group image, machine selection, the complete searchable/sortable/filterable catalog, official consultation CTA and the six FAQs from the source collection. No machine-selection quiz or machine reviews are repurposed as accessory evidence.

## Source and price handling

Source: https://www.1laser.com/collections/laser-accessories

Retrieved on 2026-10-08 using the live rendered collection and its same-origin `/collections/laser-accessories/products.json?limit=250` response. `src/data/accessories.json` retains each product URL and original image URL. All 28 local WebP assets are conversions of the corresponding official first product image, preserving aspect ratios. The hero is separately generated from six official accessory images at the user’s explicit request; see below.

Product names are retained, descriptions are concise summaries of official product descriptions, and fit labels use explicit source information. Category taxonomy and UI labels are editorial organization. No additional compatibility is inferred. All product and consultation actions lead to the official website.

Prices use the minimum variant price. `From` appears only when variant prices differ. The reflective mirror/bracket product therefore starts at $29.99 even though the collection card shows its first $44.99 variant. A compare-at price is shown only when greater than the corresponding selling price; the glass tube's inconsistent $249.99 compare-at value is excluded. Prices are a source snapshot, not a live shopping cart.

## Implementation and verification

- Add Accessories component, scoped stylesheet, product data and 28 local assets.
- Add a Vite HTML entry and application route; connect existing desktop/mobile/footer links.
- Reuse existing image readiness behavior for stable placeholders.
- Verify build, all images, desktop/mobile overflow, price/category combinations, search, sorting, empty/reset states, mobile dialog Escape/focus/body-scroll behavior, FAQ and navigation.
- Commit only scoped files; push `main` to `v3`; validate the deployed route and asset after GitHub Pages succeeds.

## Hero image revision, 2026-10-08

User requested an accessories collection image generated using ChatGPT in ego-browser, with no image link or caption controls. Generated in https://chatgpt.com/c/6ac75a66-2cc0-83e8-b523-5373a42384d1 using six official product references: PiBurn OMNI, OneLaser CW-5200 chiller, X Series riser base, FiltraBox Micro, Smart Air Assist control, and a focal lens.

Downloaded through ChatGPT’s image download action. Original PNG is retained under ignored `references/incoming/accessories/chatgpt-accessories-collection.png`; published WebP is `public/assets/accessories/accessories-collection-hero.webp`, 1448 × 1086 (4:3), exported without cropping. Product appearance and the presence of all six accessories were visually checked. The scene is a generated composition, not a photograph of a sold bundle. No bundle or additional compatibility is claimed.

The hero media is a non-interactive figure with one image, no product title, subtitle, link, or arrow. Breadcrumb removal and the white outlined consultation button remain in place.

## Machine-first compatibility revision, 2026-10-08

Hydra Gen2 is the first machine tile, followed by Cobra, XRF, XT, VertiGo and Hydra Gen1. The chosen machine is reflected in the catalog heading, first filter, removable chip, product tags and shareable URL. Type, price and search narrow that machine; changing machines clears those secondary constraints. Empty-result recovery keeps the chosen machine.

Each product stores explicit `machines`, a visible `compatibilityNote`, and an auditable `compatibilityEvidence` / `compatibilitySource`. The official collection JSON was refreshed; product pages and variants were checked for generation and configuration restrictions. A generic Hydra Series label is not expanded into Gen1/Gen2 claims. PiBurn V X Series compatibility is supported by the official rotary setup article; PiBurn OMNI follows its explicit XRF and Hydra/Cobra variants. FiltraBox Expand X-3 explicitly supports any OneLaser machine, subject to connection/airflow checks. Replacement filters are matched to the extractor, not the laser.

The five explicitly supported Hydra Gen2 entries are CW-5200 (glass-tube systems), FiltraBox Expand X-3, CO₂ glass tubes (Hydra 9/13/16 glass-tube configurations), 3X laser beam expander, and 25 mm beam combiner. Hydra Gen1 focal-lens barrel and generation-ambiguous rotaries are excluded. XRF has 14 matched entries, XT 11, Cobra 5, Hydra Gen1 4 and VertiGo 1; unconfirmed products remain in the full 28-item catalog.

## Workshop hero replacement, 2026-10-08

User requested a more premium, less crowded workshop scene. Regenerated in the same ChatGPT conversation through ego-browser using the previously uploaded official product references. The selected image uses PiBurn OMNI as the main subject, with a white air-assist control and gold lens on a wooden workbench, plus a CW-5200 chiller below. Natural side light, neutral walls and separated products replace the six-item white-background composition. This remains illustrative generated artwork, not a physical installation or bundle compatibility claim.

Original: ignored `references/incoming/accessories/chatgpt-accessories-workshop.png`. Production: `public/assets/accessories/accessories-workshop-hero.webp`, 1448 × 1086, 164,666 bytes; format conversion only, no crop. The former image stays available, but the hero now references the new version and accurate alt text. Existing machine filters and static, non-linked image behavior are retained.

Generation prompt: Generate a horizontal 4:3 premium workshop commercial photograph using the uploaded official accessory photographs as the exact appearance references. Spacious tidy maker workshop, neutral gray walls, pale oak workbench with charcoal legs, soft natural window light, realistic materials and contact shadows, 35–40% breathing room. PiBurn OMNI is the complete, uncropped primary subject on the right of the bench; air-assist control on the left and gold focal lens nearby, CW-5200 chiller on the floor below. Keep original geometry and colors. Omit the filtration unit, riser and laser machine. No people, headlines, new logos, watermark, dramatic smoke or glow, piled products or incorrect pipe connections.

## Documentary workshop hero replacement, 2026-10-08

The first workshop composition still read as synthetic, so it was regenerated in the same ChatGPT conversation with a documentary product-photography brief. The replacement removes decorative plants, perfect surfaces, the extra controller and lens, and staged showroom lighting. PiBurn OMNI is the sole sharp subject on a lightly worn working bench; an unbranded tumbler sits beside it and the CW-5200 is stored below. Ordinary wall tools, muted window light, natural wear, restrained depth of field and a non-symmetrical camera angle make the scene feel captured in a working shop.

Original: ignored `references/incoming/accessories/chatgpt-accessories-workshop-v2.png`. Production: `public/assets/accessories/accessories-workshop-hero-v2.webp`, 1448 × 1086, 199,566 bytes; format conversion only, no crop. The previous generated hero assets remain available for comparison, while the page references only this version.

Generation prompt: Create a horizontal 4:3 photorealistic documentary product photograph in a real small American laser workshop. Use the originally uploaded official product photographs as exact appearance references. Preserve PiBurn OMNI's full red twin-rail base, two drive assemblies, black and orange rollers, chuck, knobs, feet and mechanical proportions. Place it alone as the sharp subject on a lightly worn real wood workbench, occupying about 45% of the frame, with an unbranded stainless tumbler beside it and a CW-5200 only in the softly focused space below. Use an eye-level three-quarter 50 mm camera view, f/5.6, neutral cloudy window light, natural grain, subtle fingerprints and ordinary wall tools. No people, text, new logos, plants, showroom styling, cinematic grading, dramatic rays, glossy CGI surfaces, warped rails, duplicated wheels, fused mechanisms, fake cables or excess props.
