import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, ArrowsClockwise, Camera, CaretDown, Check, CircleNotch, FunnelSimple, MagnifyingGlass, Plus, Snowflake, Stack, Wind, X } from "@phosphor-icons/react";
import { HomeFooter, HomeNavigation } from "./Home.jsx";
import { useImageReadiness } from "./MachineCollection.jsx";
import { initializeAnalytics, trackEvent } from "./analytics.js";
import catalog from "./data/accessories.json";
import "./accessories.css";

const asset = (path) => `${import.meta.env.BASE_URL}assets/${path}`;
const money = (value) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: Number.isInteger(value) ? 0 : 2 }).format(value);
const CALL_URL = "https://www.1laser.com/products/sales-consultation-call";
const categories = [
  { id: "rotaries", name: "Rotary attachments", icon: ArrowsClockwise },
  { id: "expansion", name: "Risers & feeders", icon: Stack },
  { id: "cooling", name: "Cooling & air assist", icon: Snowflake },
  { id: "filtration", name: "Filtration & filters", icon: Wind },
  { id: "optics", name: "Optics & laser tubes", icon: CircleNotch },
  { id: "camera", name: "Cameras", icon: Camera },
];
const faqs = [
  ["What’s the best rotary attachment for tumblers?", "We recommend the PiBurn Rotary, which offers excellent stability, grip, and ease of use for drinkware engraving."],
  ["Do I need a chiller for my laser machine?", "If you’re using a high-wattage system like Hydra, a chiller is essential for keeping your machine cool and running efficiently."],
  ["How do I know which lens to use?", 'A 2" focal lens works for most jobs. Use a longer lens (3"–4") for deeper cuts and a shorter lens (1.5") for fine engraving.'],
  ["Can I upgrade my machine’s height for tall items?", "Yes! The Base Boost Riser gives you more vertical space and enables passthrough for longer items."],
  ["Is the conveyor feeder necessary?", "It’s a huge time-saver for businesses that handle repeat jobs or fabric, leather, and signage material."],
  ["How can I finance my laser machine?", "We offer financing through Shop Pay, ClickLease and more—making it easier to start or grow your business."],
];

function AccessoryCard({ product }) {
  return <article className="accessory-product">
    <a className="accessory-product__media" href={product.url} aria-label={`View ${product.name}`} onClick={() => trackEvent("accessory_product_click", { item_id: product.id })}>
      <img src={asset(product.image)} alt={product.name} loading="lazy" width="720" height="720" />
    </a>
    <div className="accessory-product__body">
      <span className="accessory-product__category">{categories.find((category) => category.id === product.category).name}</span>
      <h3><a href={product.url}>{product.name}</a></h3>
      <p>{product.description}</p>
      <span className="accessory-product__fit">{product.fit}</span>
      <div className="accessory-product__purchase">
        <div className="accessory-product__price">{product.priceVaries && <small>From </small>}<strong>{money(product.price)}</strong><span>USD</span>{product.compareAt && <del>{money(product.compareAt)}</del>}</div>
        <a className="accessory-product__action" href={product.url} onClick={() => trackEvent("accessory_product_click", { item_id: product.id })}>View details <ArrowUpRight size={17} aria-hidden="true" /></a>
      </div>
    </div>
  </article>;
}

export function AccessoriesPage() {
  const [selected, setSelected] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(9500);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const dialogRef = useRef(null);
  const catalogRef = useRef(null);
  useImageReadiness();
  useEffect(() => {
    document.title = "Laser Accessories — OneLaser";
    initializeAnalytics();
    trackEvent("view_content", { content_name: "Accessories", content_category: "collection" });
    const dialog = dialogRef.current;
    const unlock = () => { document.body.style.overflow = ""; };
    const resize = () => { if (window.innerWidth > 820 && dialog.open) dialog.close(); };
    dialog.addEventListener("close", unlock);
    window.addEventListener("resize", resize);
    return () => { dialog.removeEventListener("close", unlock); window.removeEventListener("resize", resize); unlock(); };
  }, []);
  const filtered = useMemo(() => {
    const result = catalog.products.filter((product) => (!selected.length || selected.includes(product.category))
      && product.price >= minPrice && product.price <= maxPrice
      && `${product.name} ${product.description} ${product.fit}`.toLowerCase().includes(query.trim().toLowerCase()));
    if (sort === "price-low") result.sort((a, b) => a.price - b.price);
    if (sort === "price-high") result.sort((a, b) => b.price - a.price);
    if (sort === "name") result.sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [selected, minPrice, maxPrice, query, sort]);
  const activeCount = selected.length + Number(minPrice > 0 || maxPrice < 9500) + Number(Boolean(query));
  const reset = () => { setSelected([]); setMinPrice(0); setMaxPrice(9500); setQuery(""); };
  const toggle = (id) => { setSelected((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]); trackEvent("accessory_filter", { category: id }); };
  const chooseCategory = (id) => {
    setSelected([id]); setMinPrice(0); setMaxPrice(9500); setQuery("");
    catalogRef.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    trackEvent("accessory_category", { category: id });
  };
  const filters = (mobile = false) => <div className="accessory-filters__content">
    <header><strong><FunnelSimple size={18} />Filters {activeCount > 0 && <span>{activeCount}</span>}</strong><button onClick={reset} disabled={!activeCount}>Reset</button>{mobile && <button className="accessory-icon-button" aria-label="Close filters" onClick={() => dialogRef.current.close()}><X size={21} /></button>}</header>
    <fieldset><legend>Price</legend>
      <div className="accessory-price-range" style={{ "--range-start": `${minPrice / 95}%`, "--range-end": `${maxPrice / 95}%` }}>
        <input aria-label="Minimum price slider" type="range" min="0" max="9500" step="25" value={minPrice} onChange={(event) => setMinPrice(Math.min(Number(event.target.value), maxPrice))} />
        <input aria-label="Maximum price slider" type="range" min="0" max="9500" step="25" value={maxPrice} onChange={(event) => setMaxPrice(Math.max(Number(event.target.value), minPrice))} />
      </div>
      <div className="accessory-price-fields"><label>Min ($)<input aria-label="Minimum price" type="number" min="0" max={maxPrice} value={minPrice} onChange={(event) => setMinPrice(Math.max(0, Math.min(Number(event.target.value), maxPrice)))} /></label><span>—</span><label>Max ($)<input aria-label="Maximum price" type="number" min={minPrice} max="9500" value={maxPrice} onChange={(event) => setMaxPrice(Math.min(9500, Math.max(Number(event.target.value), minPrice)))} /></label></div>
    </fieldset>
    <fieldset><legend>Category</legend><div className="accessory-category-options">{categories.map((category) => <label key={category.id}><input type="checkbox" checked={selected.includes(category.id)} onChange={() => toggle(category.id)} /><span className="accessory-checkbox"><Check size={12} weight="bold" /></span><span>{category.name}</span><small>{catalog.products.filter((p) => p.category === category.id).length}</small></label>)}</div></fieldset>
    <div className="accessory-filter-help"><p>Have questions or need help?</p><a href={CALL_URL}>Book A Free Call <ArrowUpRight size={16} /></a></div>
    {mobile && <button className="accessory-primary accessory-show-results" onClick={() => dialogRef.current.close()}>Show {filtered.length} products <ArrowUpRight size={18} /></button>}
  </div>;

  return <div className="home-shell collection-shell accessories-shell" id="top">
    <a className="home-skip" href="#accessories-main">Skip to content</a>
    <HomeNavigation />
    <main id="accessories-main">
      <section className="accessory-hero" aria-labelledby="accessory-title">
        <div className="accessory-hero__copy"><span className="accessory-eyebrow">ENGRAVING. MARKING. CUTTING.</span><h1 id="accessory-title">Laser accessories.</h1><p className="accessory-hero__headline">Enhance your projects.</p><p>Boost your OneLaser engraving capabilities with laser rotaries, Base Boost systems, chillers, and more, tailored to your specific needs.</p><div className="accessory-hero__actions"><a className="accessory-primary" href="#accessory-catalog">Shop accessories <ArrowDown size={18} /></a><a className="accessory-secondary" href={CALL_URL}>Book A Free Call <ArrowUpRight size={18} /></a></div></div>
        <a className="accessory-hero__media" href={catalog.products.find((p) => p.id === "piburn-omni-for-onelaser").url}><img src={asset("accessories/piburn-omni-for-onelaser.webp")} alt="PiBurn OMNI rotary with roller and chuck drive systems" fetchPriority="high" width="1400" height="875" /><span><span>PiBurn OMNI<small>Roller and chuck. One rotary.</small></span><span className="accessory-round-arrow"><ArrowUpRight size={23} /></span></span></a>
      </section>

      <nav className="accessory-categories" aria-label="Shop accessories by category">{categories.map(({ id, name, icon: Icon }) => <button key={id} onClick={() => chooseCategory(id)}><Icon size={30} weight="regular" aria-hidden="true" /><span>{name}</span><small>{catalog.products.filter((p) => p.category === id).length} {id === "camera" ? "product" : "products"}</small></button>)}</nav>

      <section className="accessory-catalog" id="accessory-catalog" ref={catalogRef} aria-labelledby="accessory-catalog-title">
        <header className="accessory-section-heading"><span className="accessory-eyebrow">LASER ACCESSORIES</span><h2 id="accessory-catalog-title">Find your next upgrade.</h2><p>Rotaries, Base Boost systems, chillers, and more.</p></header>
        <div className="accessory-catalog__layout"><aside className="accessory-filters" aria-label="Filter accessories">{filters()}</aside><div className="accessory-results">
          <div className="accessory-toolbar"><p role="status" aria-live="polite"><strong>{filtered.length}</strong> {filtered.length === 1 ? "product" : "products"}</p><label className="accessory-search"><MagnifyingGlass size={18} aria-hidden="true" /><input aria-label="Search accessories" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search accessories" /></label><label className="accessory-sort"><span>Sort by</span><select aria-label="Sort accessories" value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name: A–Z</option></select><CaretDown size={15} aria-hidden="true" /></label><button className="accessory-mobile-filter" onClick={() => { dialogRef.current.showModal(); document.body.style.overflow = "hidden"; }}><FunnelSimple size={18} />Filters{activeCount > 0 && ` (${activeCount})`}</button></div>
          {activeCount > 0 && <div className="accessory-active-filters">{selected.map((id) => <button key={id} onClick={() => toggle(id)} aria-label={`Remove ${categories.find((c) => c.id === id).name} filter`}>{categories.find((c) => c.id === id).name}<X size={14} /></button>)}{(minPrice > 0 || maxPrice < 9500) && <button onClick={() => { setMinPrice(0); setMaxPrice(9500); }}>{money(minPrice)} – {money(maxPrice)}<X size={14} /></button>}<button onClick={reset}>Clear all</button></div>}
          <div className="accessory-grid">{filtered.map((product) => <AccessoryCard key={product.id} product={product} />)}</div>
          {filtered.length === 0 && <div className="accessory-empty"><MagnifyingGlass size={32} /><h3>No matching accessories.</h3><p>Try another search or clear your filters.</p><button className="accessory-primary" onClick={reset}>Clear filters</button></div>}
        </div></div>
      </section>
      <section className="accessory-help" aria-labelledby="accessory-help-title"><div><span className="accessory-eyebrow">TALK TO A REP</span><h2 id="accessory-help-title">Have questions<br />or need help?</h2></div><a className="accessory-primary" href={CALL_URL} onClick={() => trackEvent("lead_action", { action: "accessory_consultation" })}>Book A Free Call <ArrowUpRight size={19} /></a></section>
      <section className="accessory-faq" aria-labelledby="accessory-faq-title"><header className="accessory-section-heading"><span className="accessory-eyebrow">ACCESSORY ESSENTIALS</span><h2 id="accessory-faq-title">Frequently asked questions.</h2></header><div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<Plus size={22} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></section>
    </main><HomeFooter />
    <dialog ref={dialogRef} className="accessory-filter-dialog" aria-label="Filter accessories" onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current.close(); }}>{filters(true)}</dialog>
  </div>;
}
