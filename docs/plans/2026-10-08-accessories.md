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
