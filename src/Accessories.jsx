import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, ArrowsClockwise, Camera, CaretDown, Check, CircleNotch, FunnelSimple, MagnifyingGlass, Plus, Snowflake, Stack, Wind, X } from "@phosphor-icons/react";
import { HomeFooter, HomeNavigation } from "./Home.jsx";
import { useImageReadiness } from "./MachineCollection.jsx";
import { initializeAnalytics, trackEvent } from "./analytics.js";
import catalog from "./data/accessories.json";
import { accessoryMachines, filterAccessories } from "./data/accessoryFilters.js";
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

function AccessoryCard({ product, machine }) {
  return <article className="accessory-product">
    <a className="accessory-product__media" href={product.url} aria-label={`View ${product.name}`} onClick={() => trackEvent("accessory_product_click", { item_id: product.id })}>
      <img src={asset(product.image)} alt={product.name} loading="lazy" width="720" height="720" />
    </a>
    <div className="accessory-product__body">
      <div className="accessory-machine-tags" aria-label="Compatible machines">
        {product.machines.length === accessoryMachines.length ? <span className={machine !== "all" ? "is-current" : ""}>All OneLaser machines</span> : product.machines.length ? accessoryMachines.filter((m) => product.machines.includes(m.id)).map((m) => <span key={m.id} className={machine === m.id ? "is-current" : ""}>{m.name}</span>) : <span>{product.id.includes("replacement-filters") ? product.fit : "Confirm machine fit"}</span>}
      </div>
      <span className="accessory-product__category">{categories.find((category) => category.id === product.category).name}</span>
      <h3><a href={product.url}>{product.name}</a></h3>
      <p>{product.description}</p>
      <p className="accessory-product__compatibility">{product.compatibilityNote}</p>
      <div className="accessory-product__purchase">
        <div className="accessory-product__price">{product.priceVaries && <small>From </small>}<strong>{money(product.price)}</strong><span>USD</span>{product.compareAt && <del>{money(product.compareAt)}</del>}</div>
        <a className="accessory-product__action" href={product.url} onClick={() => trackEvent("accessory_product_click", { item_id: product.id })}>View details <ArrowUpRight size={17} aria-hidden="true" /></a>
      </div>
    </div>
  </article>;
}

export function AccessoriesPage() {
  const [machine, setMachine] = useState(() => {
    const requested = new URLSearchParams(window.location.search).get("machine");
    return accessoryMachines.some((item) => item.id === requested) ? requested : "all";
  });
  const [selected, setSelected] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(9500);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const dialogRef = useRef(null);
  const catalogRef = useRef(null);
  const machineName = accessoryMachines.find((item) => item.id === machine)?.name;
  const machineProducts = useMemo(() => catalog.products.filter((product) => machine === "all" || product.machines.includes(machine)), [machine]);
  useImageReadiness();
  useEffect(() => {
    const url = new URL(window.location.href);
    if (machine === "all") url.searchParams.delete("machine");
    else url.searchParams.set("machine", machine);
    window.history.replaceState(null, "", url);
  }, [machine]);
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
  const filtered = useMemo(() => filterAccessories(catalog.products, { machine, categories: selected, minPrice, maxPrice, query, sort }), [machine, selected, minPrice, maxPrice, query, sort]);
  const activeCount = Number(machine !== "all") + selected.length + Number(minPrice > 0 || maxPrice < 9500) + Number(Boolean(query));
  const resetDetails = () => { setSelected([]); setMinPrice(0); setMaxPrice(9500); setQuery(""); };
  const reset = () => { setMachine("all"); resetDetails(); };
  const toggle = (id) => { setSelected((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]); trackEvent("accessory_filter", { category: id }); };
  const chooseMachine = (id, scroll = false) => {
    setMachine(id); resetDetails();
    if (scroll) catalogRef.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    trackEvent("accessory_machine_filter", { machine: id });
  };
  const filters = (mobile = false) => <div className="accessory-filters__content">
    <header><strong><FunnelSimple size={18} />Filters {activeCount > 0 && <span>{activeCount}</span>}</strong><button onClick={reset} disabled={!activeCount}>Reset</button>{mobile && <button className="accessory-icon-button" aria-label="Close filters" onClick={() => dialogRef.current.close()}><X size={21} /></button>}</header>
    <fieldset className="accessory-machine-field"><legend>Your machine</legend><div><select aria-label="Filter by machine" value={machine} onChange={(event) => chooseMachine(event.target.value)}><option value="all">All machines</option>{accessoryMachines.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></div></fieldset>
    <fieldset><legend>Accessory type</legend><div className="accessory-category-options">{categories.map((category) => <label key={category.id}><input type="checkbox" checked={selected.includes(category.id)} onChange={() => toggle(category.id)} /><span className="accessory-checkbox"><Check size={12} weight="bold" /></span><span>{category.name}</span><small>{machineProducts.filter((p) => p.category === category.id).length}</small></label>)}</div></fieldset>
    <fieldset><legend>Price</legend>
      <div className="accessory-price-range" style={{ "--range-start": `${minPrice / 95}%`, "--range-end": `${maxPrice / 95}%` }}>
        <input aria-label="Minimum price slider" type="range" min="0" max="9500" step="25" value={minPrice} onChange={(event) => setMinPrice(Math.min(Number(event.target.value), maxPrice))} />
        <input aria-label="Maximum price slider" type="range" min="0" max="9500" step="25" value={maxPrice} onChange={(event) => setMaxPrice(Math.max(Number(event.target.value), minPrice))} />
      </div>
      <div className="accessory-price-fields"><label>Min ($)<input aria-label="Minimum price" type="number" min="0" max={maxPrice} value={minPrice} onChange={(event) => setMinPrice(Math.max(0, Math.min(Number(event.target.value), maxPrice)))} /></label><span>—</span><label>Max ($)<input aria-label="Maximum price" type="number" min={minPrice} max="9500" value={maxPrice} onChange={(event) => setMaxPrice(Math.min(9500, Math.max(Number(event.target.value), minPrice)))} /></label></div>
    </fieldset>
    <div className="accessory-filter-help"><p>Have questions or need help?</p><a href={CALL_URL}>Book A Free Call <ArrowUpRight size={16} /></a></div>
    {mobile && <button className="accessory-primary accessory-show-results" onClick={() => dialogRef.current.close()}>Show {filtered.length} products <ArrowUpRight size={18} /></button>}
  </div>;

  return <div className="home-shell collection-shell accessories-shell" id="top">
    <a className="home-skip" href="#accessories-main">Skip to content</a>
    <HomeNavigation />
    <main id="accessories-main">
      <section className="accessory-hero" aria-labelledby="accessory-title">
        <div className="accessory-hero__copy"><span className="accessory-eyebrow">ENGRAVING. MARKING. CUTTING.</span><h1 id="accessory-title">Laser accessories.</h1><p className="accessory-hero__headline">Enhance your projects.</p><p>Boost your OneLaser engraving capabilities with laser rotaries, Base Boost systems, chillers, and more, tailored to your specific needs.</p><div className="accessory-hero__actions"><a className="accessory-primary" href="#accessory-machines">Find my accessories <ArrowDown size={18} /></a><a className="accessory-secondary" href={CALL_URL}>Book A Free Call <ArrowUpRight size={18} /></a></div></div>
        <figure className="accessory-hero__media"><img src={asset("accessories/accessories-gray-studio-hero.webp")} alt="Eight OneLaser accessories arranged with visual rhythm on tonal gray studio plinths" fetchPriority="high" width="1448" height="1086" /></figure>
      </section>

      <section className="accessory-machines" id="accessory-machines" aria-labelledby="accessory-machine-title">
        <header><div><span className="accessory-eyebrow">START WITH YOUR MACHINE</span><h2 id="accessory-machine-title">Shop by machine.</h2><p>Choose your OneLaser to find accessories that fit.</p></div><button className="accessory-all-machines" onClick={() => chooseMachine("all", true)} aria-pressed={machine === "all"}>View all accessories <ArrowUpRight size={18} /></button></header>
        <div className="accessory-machine-grid">{accessoryMachines.map((item) => <button key={item.id} aria-pressed={machine === item.id} className={machine === item.id ? "is-active" : ""} onClick={() => chooseMachine(item.id, true)}><span>{item.name}</span><small>{catalog.products.filter((product) => product.machines.includes(item.id)).length} matching {catalog.products.filter((product) => product.machines.includes(item.id)).length === 1 ? "accessory" : "accessories"}</small><ArrowDown size={18} aria-hidden="true" /></button>)}</div>
      </section>

      <section className="accessory-catalog" id="accessory-catalog" ref={catalogRef} aria-labelledby="accessory-catalog-title">
        <header className="accessory-section-heading"><span className="accessory-eyebrow">LASER ACCESSORIES</span><h2 id="accessory-catalog-title">{machineName ? `Accessories for ${machineName}.` : "Find your next upgrade."}</h2><p>{machineName ? "Check the model and configuration notes on each accessory before ordering." : "Select your machine first, then narrow by accessory type or price."}</p></header>
        <div className="accessory-catalog__layout"><aside className="accessory-filters" aria-label="Filter accessories">{filters()}</aside><div className="accessory-results">
          <div className="accessory-toolbar"><p role="status" aria-live="polite"><strong>{filtered.length}</strong> {filtered.length === 1 ? "product" : "products"}</p><label className="accessory-search"><MagnifyingGlass size={18} aria-hidden="true" /><input aria-label="Search accessories" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search accessories" /></label><label className="accessory-sort"><span>Sort by</span><select aria-label="Sort accessories" value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name: A–Z</option></select><CaretDown size={15} aria-hidden="true" /></label><button className="accessory-mobile-filter" onClick={() => { dialogRef.current.showModal(); document.body.style.overflow = "hidden"; }}><FunnelSimple size={18} />Filters{activeCount > 0 && ` (${activeCount})`}</button></div>
          {activeCount > 0 && <div className="accessory-active-filters">{machineName && <button className="accessory-machine-chip" onClick={() => chooseMachine("all")} aria-label={`Remove ${machineName} machine filter`}>{machineName}<X size={14} /></button>}{selected.map((id) => <button key={id} onClick={() => toggle(id)} aria-label={`Remove ${categories.find((c) => c.id === id).name} filter`}>{categories.find((c) => c.id === id).name}<X size={14} /></button>)}{(minPrice > 0 || maxPrice < 9500) && <button onClick={() => { setMinPrice(0); setMaxPrice(9500); }}>{money(minPrice)} – {money(maxPrice)}<X size={14} /></button>}<button onClick={reset}>Clear all</button></div>}
          <div className="accessory-grid">{filtered.map((product) => <AccessoryCard key={product.id} product={product} machine={machine} />)}</div>
          {filtered.length === 0 && <div className="accessory-empty"><MagnifyingGlass size={32} /><h3>No matching accessories.</h3><p>{machineName ? `Try another accessory type or price range for your ${machineName}.` : "Try another search or clear your filters."}</p><button className="accessory-primary" onClick={resetDetails}>Clear type, price & search</button></div>}
        </div></div>
      </section>
      <section className="accessory-help" aria-labelledby="accessory-help-title"><div><span className="accessory-eyebrow">TALK TO A REP</span><h2 id="accessory-help-title">Have questions<br />or need help?</h2></div><a className="accessory-primary" href={CALL_URL} onClick={() => trackEvent("lead_action", { action: "accessory_consultation" })}>Book A Free Call <ArrowUpRight size={19} /></a></section>
      <section className="accessory-faq" aria-labelledby="accessory-faq-title"><header className="accessory-section-heading"><span className="accessory-eyebrow">ACCESSORY ESSENTIALS</span><h2 id="accessory-faq-title">Frequently asked questions.</h2></header><div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<Plus size={22} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></section>
    </main><HomeFooter />
    <dialog ref={dialogRef} className="accessory-filter-dialog" aria-label="Filter accessories" onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current.close(); }}>{filters(true)}</dialog>
  </div>;
}
