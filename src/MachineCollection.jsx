import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  CaretDown,
  CaretLeft,
  CaretRight,
  Check,
  FunnelSimple,
  Play,
  Plus,
  ShieldCheck,
  SlidersHorizontal,
  Sparkle,
  Star,
  X,
  XCircle,
} from "@phosphor-icons/react";
import { HomeFooter, HomeNavigation } from "./Home.jsx";
import { initializeAnalytics, trackEvent } from "./analytics.js";
import "./machine-collection.css";

const asset = (name) => `${import.meta.env.BASE_URL}assets/${name}`;
const officialProduct = (handle) => `https://www.1laser.com/products/${handle}`;
const SALES_CALL_URL = "https://www.1laser.com/products/sales-consultation-call";
const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const PRICE_MIN = 0;
const PRICE_MAX = 15000;
const PRICE_STEP = 100;

const familyProfiles = [
  {
    id: "xrf",
    eyebrow: "PERFORMANCE DESKTOP LASER",
    name: "XRF™",
    copy: "Fine-detail RF performance in a compact, air-cooled platform.",
    bestFor: "Detailed products, personalization and growing shops",
    specs: ["38W RF", "1,200 mm/s", "True 3.5G"],
    image: "home-product-xrf.png",
    scene: "home-product-xrf-scene.webp",
  },
  {
    id: "cobra",
    eyebrow: "WORKSHOP ESSENTIAL",
    name: "Cobra™ Series",
    copy: "High-power glass CO₂ cutting with an optional IR upgrade workflow.",
    bestFor: "Thicker materials, signage and workshop production",
    specs: ["Up to 130W Glass", "Optional 2W / 3W / 5W IR", "1,200 mm/s"],
    image: "home-product-cobra.png",
    scene: "home-product-cobra-scene.webp",
  },
  {
    id: "hydra",
    eyebrow: "INDUSTRIAL LASER SYSTEM",
    name: "Hydra™ Gen2",
    copy: "Industrial hybrid performance for speed, detail and daily output.",
    bestFor: "Production teams and broad job requirements",
    specs: ["Up to 70W RF", "Up to 150W Glass", "2,000 mm/s"],
    image: "home-product-hydra-gen2.png",
    scene: "home-product-hydra-gen2-scene.webp",
  },
  {
    id: "vertigo",
    eyebrow: "PERFORMANCE ROTARY LASER",
    name: "VertiGo™",
    copy: "A vertical RF laser engineered around tumblers, cups and bottles.",
    bestFor: "Drinkware specialists and repeat cylindrical work",
    specs: ["38W RF", "Integrated PiBurn Grip", "Smart Autofocus"],
    image: "home-product-vertigo.png",
    scene: "home-product-vertigo-scene.webp",
  },
];

const collectionStoryVideos = [
  {
    id: "WD5has9K3IY",
    title: "This Firefighter Made a Six-Figure Business With a Laser",
    channel: "OneLaser",
    tag: "CUSTOMER SUCCESS",
  },
  {
    id: "HOh6qitWLqI",
    title: "Best Laser for Your Small Business!?",
    channel: "Bearded Builds Co",
    tag: "SMALL BUSINESS",
  },
  {
    id: "F1ZJvoeANgk",
    title: "Meet the COBRA™: Official Product Tour & Launch Announcement",
    channel: "OneLaser",
    tag: "COBRA PRODUCT TOUR",
  },
  {
    id: "UxN-bVOpAKg",
    title: "I Spent 10 Years Evaluating Lasers—Here’s Why I Chose the Cobra",
    channel: "OneLaser",
    tag: "COBRA OWNER STORY",
  },
  {
    id: "Fqtlsk_NsKM",
    title: "Is the OneLaser Hydra 13 Worth It? A Pottery Owner's Honest Review",
    channel: "OneLaser",
    tag: "HYDRA OWNER REVIEW",
  },
  {
    id: "HdP62cQVzs0",
    title: "The Machine Behind His Best-Selling Maps | OneLaser Hydra 16 Testimonial",
    channel: "OneLaser",
    tag: "HYDRA TESTIMONIAL",
  },
  {
    id: "qAn4HhGjRDs",
    title: "Getting Started with VertiGo: Complete Setup Guide",
    channel: "OneLaser",
    tag: "VERTIGO SETUP",
  },
  {
    id: "qomhIor8-Ww",
    title: "OneLaser VertiGo First Setup",
    channel: "OneLaser",
    tag: "VERTIGO FIRST RUN",
  },
  {
    id: "5q2-Iy9Nhdc",
    title: "OneLaser XRF Unboxing",
    channel: "Bearded Builds Co",
    tag: "OWNER SETUP",
  },
  {
    id: "f2cJ7G0t_cw",
    title: "Install the Riser Base on Your XT / XRF",
    channel: "Edmonds Woodshop",
    tag: "WORKSHOP EXPANSION",
  },
  {
    id: "arBKtqSz21o",
    title: "OneLaser XRF 38W Unboxing & Test Cutting",
    channel: "Peachy Creations",
    tag: "MAKER TEST RUN",
  },
  {
    id: "r5m8As2oOJ4",
    title: "Hobby Laser vs. OneLaser XRF: Does Speed Actually Matter?",
    channel: "OneLaser",
    tag: "XRF PERFORMANCE TEST",
  },
  {
    id: "waBw5gDMPIM",
    title: "Testing the New OneLaser Machines at Next Level Maker Conference",
    channel: "OneLaser",
    tag: "FULL LINEUP",
  },
];

const products = [
  {
    id: "xrf-38",
    family: "xrf",
    name: "XRF™ 38W",
    label: "BEST SELLER",
    generation: "Current lineup",
    summary: "All-in-one RF desktop laser for fast, fine-detail production.",
    bestFor: "Personalized goods, photo engraving and compact shops",
    specs: ["38W RF", "23.6 × 11.8 in", "1,200 mm/s"],
    powers: [38],
    laser: "38W RF CO₂",
    workArea: "23.6 × 11.8 in",
    maxSpeed: "1,200 mm/s",
    keyCapability: "Air-cooled RF · 0.07 mm laser spot",
    acceleration: "True 3.5G",
    positioningAccuracy: "≤0.01 mm",
    maxResolution: "2,000 DPI",
    productLine: "XRF™ Series",
    materials: ["organic", "coated-metal"],
    intents: ["engraving", "both"],
    price: 4399,
    compareAt: 6499,
    handle: "onelaser-xrf-desktop-laser-machine",
    image: "https://cdn.shopify.com/s/files/1/0747/8748/7778/files/XRF_360cdcd1-c129-44be-a750-7da43a587a00.png?v=1782463970&width=900",
  },
  {
    id: "cobra-8",
    family: "cobra",
    name: "Cobra™ 8",
    label: "WORKSHOP ESSENTIAL",
    generation: "Current lineup",
    summary: "The compact entry into Cobra glass CO₂ cutting power.",
    bestFor: "Growing workshops cutting wood, acrylic and leather",
    specs: ["90W Glass", "31.5 × 19.7 in", "1,200 mm/s"],
    powers: [90],
    laser: "90W Glass CO₂; 2W / 3W / 5W IR optional",
    workArea: "31.50 × 19.69 in (800 × 500 mm)",
    maxSpeed: "1,200 mm/s",
    keyCapability: "Smart Dual Air-Assist · optional IR upgrade",
    acceleration: "2G",
    positioningAccuracy: "±0.02 mm",
    maxResolution: "1,000 DPI",
    productLine: "Cobra™ Series",
    materials: ["organic", "coated-metal"],
    intents: ["cutting", "both"],
    price: 5999,
    compareAt: 6999,
    handle: "cobra-8-90w-co2-laser-engraver-cutter",
    image: "https://cdn.shopify.com/s/files/1/0747/8748/7778/files/Cobra_8.png?v=1782460144&width=900",
  },
  {
    id: "cobra-10",
    family: "cobra",
    name: "Cobra™ 10",
    label: "BALANCED CUTTING FIT",
    generation: "Current lineup",
    summary: "Balanced cutting power for a broader production catalog.",
    bestFor: "Sign shops and businesses balancing size with throughput",
    specs: ["100W Glass", "39.4 × 23.6 in", "1,200 mm/s"],
    powers: [100],
    laser: "100W Glass CO₂; 2W / 3W / 5W IR optional",
    workArea: "39.37 × 23.62 in (1,000 × 600 mm)",
    maxSpeed: "1,200 mm/s",
    keyCapability: "Smart Dual Air-Assist · optional IR upgrade",
    acceleration: "2G",
    positioningAccuracy: "±0.02 mm",
    maxResolution: "1,000 DPI",
    productLine: "Cobra™ Series",
    materials: ["organic", "coated-metal"],
    intents: ["cutting", "both", "production"],
    price: 6999,
    compareAt: 7999,
    handle: "cobra-10-100w-co2-laser-engraver-cutter",
    image: "https://cdn.shopify.com/s/files/1/0747/8748/7778/files/Cobra_10.png?v=1782460375&width=900",
  },
  {
    id: "cobra-14",
    family: "cobra",
    name: "Cobra™ 14",
    label: "MAXIMUM COBRA POWER",
    generation: "Current lineup",
    summary: "The largest Cobra cutting tier for demanding workshop jobs.",
    bestFor: "Large-format work and higher-power material cutting",
    specs: ["130W Glass", "55.1 × 35.4 in", "1,200 mm/s"],
    powers: [130],
    laser: "130W Glass CO₂; 2W / 3W / 5W IR optional",
    workArea: "55.12 × 35.43 in (1,400 × 900 mm)",
    maxSpeed: "1,200 mm/s",
    keyCapability: "Smart Dual Air-Assist · optional IR upgrade",
    acceleration: "2G",
    positioningAccuracy: "±0.02 mm",
    maxResolution: "1,000 DPI",
    productLine: "Cobra™ Series",
    materials: ["organic", "coated-metal"],
    intents: ["cutting", "production"],
    price: 8999,
    compareAt: 9999,
    handle: "cobra-14-130w-co2-laser-engraver-cutter",
    image: "https://cdn.shopify.com/s/files/1/0747/8748/7778/files/Cobra_14.png?v=1782460438&width=900",
  },
  {
    id: "hydra-7-gen2",
    family: "hydra",
    name: "Hydra™ 7 Gen2",
    label: "PURE RF PRODUCTION",
    generation: "Current lineup",
    summary: "A dedicated 70W RF platform for crisp detail at industrial scale.",
    bestFor: "High-volume engraving where RF detail comes first",
    specs: ["70W RF", "27.6 × 19.7 in", "2,000 mm/s"],
    powers: [70],
    laser: "70W RF CO₂",
    workArea: "27.56 × 19.69 in",
    maxSpeed: "2,000 mm/s",
    keyCapability: "Air-cooled 70W RF · optional fiber upgrade",
    acceleration: "4G",
    positioningAccuracy: "≤0.01 mm",
    maxResolution: "2,000 DPI",
    productLine: "Hydra™ Gen2",
    materials: ["organic", "coated-metal"],
    intents: ["engraving", "production"],
    price: 10999,
    compareAt: 11999,
    handle: "hydra-7-gen-2-70w-rf-co2-dual-laser-machine",
    image: "https://cdn.shopify.com/s/files/1/0747/8748/7778/files/Hydra_7Gen2.png?v=1782813665&width=900",
  },
  {
    id: "hydra-9-gen2",
    family: "hydra",
    name: "Hydra™ 9 Gen2",
    label: "INDUSTRIAL HYBRID",
    generation: "Current lineup",
    summary: "A hybrid production system for cutting range and RF detail.",
    bestFor: "Businesses moving between fine engraving and cutting",
    specs: ["38W RF + 100W Glass", "70W RF option", "2,000 mm/s"],
    powers: [38, 70, 100],
    laser: "38W RF + 100W Glass CO₂, or 70W RF",
    workArea: "35.43 × 23.62 in",
    maxSpeed: "2,000 mm/s",
    keyCapability: "Hybrid or Pro configuration · Smart Dual Air-Assist",
    acceleration: "4G",
    positioningAccuracy: "≤0.01 mm",
    maxResolution: "2,000 DPI",
    productLine: "Hydra™ Gen2",
    materials: ["organic", "coated-metal"],
    intents: ["engraving", "cutting", "both", "production"],
    price: 10999,
    compareAt: 11999,
    handle: "hydra-9-gen-2-70w-rf-co2-dual-laser-machine",
    image: "https://cdn.shopify.com/s/files/1/0747/8748/7778/files/Hydra_9Gen2.png?v=1782813672&width=900",
  },
  {
    id: "hydra-13-gen2",
    family: "hydra",
    name: "Hydra™ 13 Gen2",
    label: "EXPANDED CAPACITY",
    generation: "Current lineup",
    summary: "More room for mixed production without giving up RF precision.",
    bestFor: "Established shops with larger work and varied orders",
    specs: ["38W RF + 130W Glass", "70W RF option", "2,000 mm/s"],
    powers: [38, 70, 130],
    laser: "38W RF + 130W Glass CO₂, or 70W RF",
    workArea: "51.18 × 35.43 in",
    maxSpeed: "2,000 mm/s",
    keyCapability: "Hybrid or Pro configuration · Smart Dual Air-Assist",
    acceleration: "4G",
    positioningAccuracy: "≤0.01 mm",
    maxResolution: "2,000 DPI",
    productLine: "Hydra™ Gen2",
    materials: ["organic", "coated-metal"],
    intents: ["engraving", "cutting", "both", "production"],
    price: 12999,
    compareAt: 13999,
    handle: "hydra-13-gen-2-70w-rf-co2-dual-laser-machine",
    image: "https://cdn.shopify.com/s/files/1/0747/8748/7778/files/Hydra_13Gen2.png?v=1782813672&width=900",
  },
  {
    id: "hydra-16-gen2",
    family: "hydra",
    name: "Hydra™ 16 Gen2",
    label: "MAXIMUM HYDRA CAPACITY",
    generation: "Current lineup",
    summary: "The largest Gen2 hybrid platform for demanding production floors.",
    bestFor: "High-output teams that need maximum capacity",
    specs: ["38W RF + 150W Glass", "70W RF option", "2,000 mm/s"],
    powers: [38, 70, 150],
    laser: "38W RF + 150W Glass CO₂, or 70W RF",
    workArea: "62.99 × 39.37 in",
    maxSpeed: "2,000 mm/s",
    keyCapability: "Hybrid or Pro configuration · Smart Dual Air-Assist",
    acceleration: "4G",
    positioningAccuracy: "≤0.01 mm",
    maxResolution: "2,000 DPI",
    productLine: "Hydra™ Gen2",
    materials: ["organic", "coated-metal"],
    intents: ["cutting", "both", "production"],
    price: 13999,
    compareAt: 14999,
    handle: "hydra-16-gen-2-70w-rf-co2-dual-laser-machine",
    image: "https://cdn.shopify.com/s/files/1/0747/8748/7778/files/Hydra_16Gen2.png?v=1782813672&width=900",
  },
  {
    id: "vertigo-38",
    family: "vertigo",
    name: "VertiGo™ 38W",
    label: "DRINKWARE SPECIALIST",
    generation: "Current lineup",
    summary: "A vertical RF workflow purpose-built for cylindrical products.",
    bestFor: "Tumblers, cups, bottles and repeat drinkware jobs",
    specs: ["38W RF", "Ø 16–230 mm", "800 mm/s"],
    powers: [38],
    laser: "38W RF CO₂",
    workArea: "300 mm X travel; Ø 16–230 mm manual focus",
    maxSpeed: "800 mm/s",
    keyCapability: "Integrated rotary · Ø 89–230 mm autofocus range",
    acceleration: "3G",
    positioningAccuracy: "≤0.01 mm",
    maxResolution: "1,000 DPI",
    productLine: "VertiGo™",
    materials: ["drinkware", "coated-metal"],
    intents: ["engraving", "drinkware", "production"],
    price: 5599,
    compareAt: 5999,
    handle: "vertigo-vertical-laser-engraver",
    image: "https://cdn.shopify.com/s/files/1/0747/8748/7778/files/VertiGo_3c806291-bd5f-4153-9ca8-d54e3fd1cd0b.png?v=1782698357&width=900",
  },
  {
    id: "xt-55",
    family: "xrf",
    name: "XT™ 55W",
    label: "CLEARANCE",
    generation: "Previous generation",
    summary: "A previous-generation desktop glass CO₂ platform.",
    bestFor: "Value-focused desktop cutting",
    specs: ["55W Glass", "23.6 × 11.8 in", "1,000 mm/s"],
    laser: "55W Glass CO₂",
    workArea: "23.6 × 11.8 in",
    maxSpeed: "1,000 mm/s",
    keyCapability: "Built-in water cooling · 5MP camera",
    acceleration: "3G",
    positioningAccuracy: "≤0.01 mm",
    maxResolution: "1,000 DPI",
    productLine: "X Series",
    materials: ["organic"],
    intents: ["cutting", "both"],
    price: 3599,
    compareAt: 4599,
    handle: "onelaser-xt-desktop-laser-machine",
    image: "https://cdn.shopify.com/s/files/1/0747/8748/7778/files/XT_1.png?v=1782464798&width=900",
  },
  {
    id: "hydra-7",
    family: "hydra",
    name: "Hydra™ 7",
    label: "CLEARANCE",
    generation: "Previous generation",
    summary: "Previous-generation dual-source Hydra platform.",
    bestFor: "Value-focused hybrid capability",
    specs: ["80W Glass + 38W RF", "28 × 20 in", "1,200 mm/s"],
    laser: "80W Glass CO₂ + 38W RF CO₂",
    workArea: "28 × 20 in",
    maxSpeed: "1,200 mm/s",
    keyCapability: "Dual-laser cabinet · 5MP camera",
    acceleration: "3G",
    positioningAccuracy: "≤0.01 mm",
    maxResolution: "2,000 DPI",
    productLine: "Hydra™ Series",
    materials: ["organic", "coated-metal"],
    intents: ["engraving", "cutting", "both"],
    price: 6299,
    compareAt: 6999,
    handle: "onelaser-hydra-7-cabinet-dual-laser-system-with-80-glass-tube-and-38w-rf-metal-tube",
    image: "https://cdn.shopify.com/s/files/1/0747/8748/7778/files/80W_d0085122-d2b3-4e5a-a510-6b0e8409eb5c.png?v=1742910341&width=900",
  },
  {
    id: "hydra-9",
    family: "hydra",
    name: "Hydra™ 9",
    label: "CLEARANCE",
    generation: "Previous generation",
    summary: "Previous-generation hybrid Hydra with RF detail capability.",
    bestFor: "Established shops seeking a clearance hybrid",
    specs: ["100W Glass + 38W RF", "35.4 × 23.6 in", "1,200 mm/s"],
    laser: "100W Glass CO₂ + 38W RF CO₂",
    workArea: "35.43 × 23.62 in",
    maxSpeed: "1,200 mm/s",
    keyCapability: "Dual-laser cabinet · 5MP camera",
    acceleration: "3G",
    positioningAccuracy: "≤0.01 mm",
    maxResolution: "2,000 DPI",
    productLine: "Hydra™ Series",
    materials: ["organic", "coated-metal"],
    intents: ["engraving", "cutting", "both", "production"],
    price: 8999,
    compareAt: 9999,
    handle: "onelaser-hydra-9-laser-engraving-machine",
    image: "https://cdn.shopify.com/s/files/1/0747/8748/7778/files/d4f70b20ae08baa91175811c4f952f6f_b9af453b-621f-4432-93f1-d8e7e635b31e.png?v=1745220554&width=900",
  },
  {
    id: "hydra-16",
    family: "hydra",
    name: "Hydra™ 16",
    label: "CLEARANCE",
    generation: "Previous generation",
    summary: "The largest previous-generation Hydra hybrid platform.",
    bestFor: "Large jobs at a clearance price",
    specs: ["150W Glass + 38W RF", "63 × 39.4 in", "1,200 mm/s"],
    laser: "150W Glass CO₂ + 38W RF CO₂",
    workArea: "62.99 × 39.37 in",
    maxSpeed: "1,200 mm/s",
    keyCapability: "Dual-laser cabinet · 5MP camera",
    acceleration: "3G",
    positioningAccuracy: "≤0.01 mm",
    maxResolution: "2,000 DPI",
    productLine: "Hydra™ Series",
    materials: ["organic", "coated-metal"],
    intents: ["engraving", "cutting", "both", "production"],
    price: 12599,
    compareAt: 13999,
    handle: "onelaser-hydra-16-cabinet-dual-laser-system-with150w-glass-tube-and-38w-rf-metal-tube",
    image: "https://cdn.shopify.com/s/files/1/0747/8748/7778/files/b208d4aba7990af021c0b2224580ee1c_d8d0feaf-a45d-4019-a54c-ebb36c18496e.png?v=1783933825&width=900",
  },
];

const finderOptions = {
  material: [
    ["organic", "Wood, acrylic, leather or paper"],
    ["coated-metal", "Anodized, coated or painted metal"],
    ["drinkware", "Tumblers, cups, bottles and glassware"],
  ],
  application: [
    ["engraving", "Engraving first"],
    ["cutting", "Cutting first"],
    ["both", "Both engraving and cutting"],
  ],
  volume: [
    ["creator", "Creator and occasional projects"],
    ["business", "Growing small business"],
    ["production", "Daily production"],
  ],
  size: [
    ["compact", "Compact — up to 12 in"],
    ["standard", "Standard — 12–24 in"],
    ["large", "Large — 24–40 in"],
    ["extra-large", "Extra large — 40+ in"],
  ],
};

const filterGroups = [
  {
    key: "intent",
    label: "Primary job",
    options: [
      ["all", "All jobs"],
      ["engraving", "Fine engraving"],
      ["cutting", "Cutting"],
      ["both", "Engrave + cut"],
      ["drinkware", "Drinkware"],
      ["production", "Production"],
    ],
  },
  {
    key: "material",
    label: "Material",
    options: [
      ["all", "All materials"],
      ["organic", "Wood, acrylic + leather"],
      ["coated-metal", "Coated + anodized metal"],
      ["drinkware", "Tumblers + bottles"],
    ],
  },
  {
    key: "power",
    label: "Laser Power",
    multiple: true,
    options: [
      ["all", "All power"],
      ["38", "38W"],
      ["70", "70W"],
      ["90", "90W"],
      ["100", "100W"],
      ["130", "130W"],
      ["150", "150W"],
    ],
  },
  {
    key: "family",
    label: "Series",
    multiple: true,
    options: [
      ["all", "All series"],
      ["xrf", "XRF"],
      ["cobra", "Cobra"],
      ["hydra", "Hydra Gen2"],
      ["vertigo", "VertiGo"],
    ],
  },
];

const defaultFilters = { power: [], intent: "all", material: "all", family: [], minPrice: "", maxPrice: "" };
const defaultFinder = { material: "", application: "", volume: "", size: "" };

function rankFamilies(selections) {
  const scores = { xrf: 0, cobra: 0, hydra: 0, vertigo: 0 };
  const add = (values) => Object.entries(values).forEach(([key, score]) => { scores[key] += score; });

  if (selections.material === "organic") add({ cobra: 3, xrf: 2, hydra: 1 });
  if (selections.material === "coated-metal") add({ xrf: 3, hydra: 2, cobra: 1 });
  if (selections.material === "drinkware") add({ vertigo: 10, xrf: 2, hydra: 1 });
  if (selections.application === "engraving") add({ xrf: 3, vertigo: 2, hydra: 1 });
  if (selections.application === "cutting") add({ cobra: 4, hydra: 3, xrf: 1 });
  if (selections.application === "both") add({ cobra: 3, hydra: 3, xrf: 1 });
  if (selections.volume === "creator") add({ xrf: 3, cobra: 2, vertigo: 2 });
  if (selections.volume === "business") add({ cobra: 2, xrf: 2, vertigo: 2, hydra: 1 });
  if (selections.volume === "production") add({ hydra: 4, cobra: 3, vertigo: 2 });
  if (selections.size === "compact") add({ xrf: 3, vertigo: 2, cobra: 1 });
  if (selections.size === "standard") add({ cobra: 2, xrf: 2, hydra: 1 });
  if (selections.size === "large") add({ hydra: 3, cobra: 3 });
  if (selections.size === "extra-large") add({ hydra: 5, cobra: 3 });

  return Object.entries(scores)
    .sort((first, second) => second[1] - first[1])
    .slice(0, 2)
    .map(([id], index) => ({ ...familyProfiles.find((family) => family.id === id), rank: index + 1 }));
}

function useImageReadiness() {
  useEffect(() => {
    const palettes = [
      ["#e7ded5", "#d8c9bc", "#f3ece5"],
      ["#dfe5df", "#cbd8cf", "#edf2ed"],
      ["#dde4e8", "#c7d4db", "#edf2f4"],
      ["#e8dfdf", "#d9c8ca", "#f4ebeb"],
      ["#e5e0e9", "#d3cadb", "#f1edf4"],
      ["#e1e6e3", "#cbd7d2", "#eff3f1"],
      ["#e8e2d7", "#d8cdbb", "#f4efe6"],
    ];
    const prepare = (image) => {
      if (!(image instanceof HTMLImageElement)) return;
      const seed = `${image.currentSrc || image.getAttribute("src") || ""}|${image.alt || ""}`;
      const hash = [...seed].reduce((value, character) => (((value << 5) - value + character.charCodeAt(0)) | 0), 0);
      const [base, low, high] = palettes[Math.abs(hash) % palettes.length];
      image.style.setProperty("--image-placeholder-base", base);
      image.style.setProperty("--image-placeholder-low", low);
      image.style.setProperty("--image-placeholder-high", high);
      image.classList.toggle("is-image-ready", image.complete && image.naturalWidth > 0);
      image.classList.toggle("is-image-error", image.complete && image.naturalWidth === 0);
    };
    const ready = (event) => {
      if (!(event.target instanceof HTMLImageElement)) return;
      event.target.classList.add("is-image-ready");
      event.target.classList.remove("is-image-error");
    };
    const error = (event) => {
      if (!(event.target instanceof HTMLImageElement)) return;
      event.target.classList.add("is-image-error");
      event.target.classList.remove("is-image-ready");
    };
    const observer = new MutationObserver((records) => records.forEach((record) => {
      record.addedNodes.forEach((node) => {
        if (node instanceof HTMLImageElement) prepare(node);
        if (node instanceof Element) node.querySelectorAll("img").forEach(prepare);
      });
    }));
    document.querySelectorAll(".collection-shell img").forEach(prepare);
    document.addEventListener("load", ready, true);
    document.addEventListener("error", error, true);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      document.removeEventListener("load", ready, true);
      document.removeEventListener("error", error, true);
      observer.disconnect();
    };
  }, []);
}

function ProductCard({ product, compareIds, onToggleCompare }) {
  const isSelected = compareIds.includes(product.id);
  const compareLimitReached = compareIds.length >= 3 && !isSelected;
  const savedAmount = Math.max(0, product.compareAt - product.price);

  return (
    <article className={`collection-product-card collection-product-card--${product.family}`}>
      <div className="collection-product-card__media">
        <img src={product.image} alt={`${product.name} laser machine`} loading="lazy" />
      </div>
      <div className="collection-product-card__body">
        <p className="collection-product-card__family">{product.label}</p>
        <h3>{product.name}</h3>
        <p className="collection-product-card__summary">{product.summary}</p>
        <p className="collection-product-card__best"><strong>Best for</strong>{product.bestFor}</p>
        <ul aria-label={`${product.name} key facts`}>
          {product.specs.map((spec) => <li key={spec}>{spec}</li>)}
        </ul>
        <div className="collection-product-card__price">
          <div>
            <small>Current price</small>
            <strong>{currency.format(product.price)}</strong>
            <del>{currency.format(product.compareAt)}</del>
            {savedAmount > 0 && <span className="collection-product-card__saving">Saved {currency.format(savedAmount)}</span>}
          </div>
          <span>USD</span>
        </div>
        <div className="collection-product-card__actions">
          <a href={officialProduct(product.handle)} target="_blank" rel="noreferrer" onClick={() => trackEvent("view_content", { content_name: product.name, content_category: "machine_collection" })}>
            Explore <ArrowUpRight size={17} weight="bold" />
          </a>
          <button
            type="button"
            className={isSelected ? "is-selected" : ""}
            aria-pressed={isSelected}
            disabled={compareLimitReached}
            title={compareLimitReached ? "Remove one selected machine before adding another." : undefined}
            onClick={() => onToggleCompare(product.id)}
          >
            {isSelected ? <Check size={17} weight="bold" /> : <Plus size={17} weight="bold" />}
            {isSelected ? "Selected" : "Compare"}
          </button>
        </div>
      </div>
    </article>
  );
}

function CollectionStoryCard({ video, index, onPlay }) {
  return (
    <button
      type="button"
      className="review-video-card"
      aria-label={`Play ${video.title} by ${video.channel}`}
      onClick={() => onPlay(video)}
    >
      <span className="review-video-card__media">
        <img
          src={`https://i.ytimg.com/vi/${video.id}/hq720.jpg`}
          alt=""
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = `https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`;
          }}
        />
        <span><Play size={22} weight="fill" /></span>
        <i>{String(index + 1).padStart(2, "0")} / {String(collectionStoryVideos.length).padStart(2, "0")}</i>
      </span>
      <span className="review-video-card__copy">
        <small>{video.tag}</small>
        <strong>{video.title}</strong>
        <span>{video.channel}</span>
      </span>
    </button>
  );
}

export function MachineCollectionPage() {
  const [filters, setFilters] = useState(defaultFilters);
  const [sort, setSort] = useState("recommended");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [compareIds, setCompareIds] = useState([]);
  const [finderSelections, setFinderSelections] = useState(defaultFinder);
  const [finderMatches, setFinderMatches] = useState(null);
  const [youtubeVideo, setYoutubeVideo] = useState(null);
  const catalogRef = useRef(null);
  const compareRef = useRef(null);
  const storyRailRef = useRef(null);
  useImageReadiness();

  useEffect(() => {
    document.title = "Laser Machines — Find Your OneLaser";
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = "Find and compare OneLaser XRF, Cobra, Hydra Gen2, and VertiGo laser machines by project, material, output, and fit.";
    initializeAnalytics();
    trackEvent("view_content", { content_name: "Machine Collection", content_category: "collection" });
  }, []);

  useEffect(() => {
    if (!filtersOpen && !youtubeVideo) return undefined;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setFiltersOpen(false);
        setYoutubeVideo(null);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [filtersOpen, youtubeVideo]);

  const currentProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      if (product.generation !== "Current lineup") return false;
      if (filters.family.length > 0 && !filters.family.includes(product.family)) return false;
      if (filters.material !== "all" && !product.materials.includes(filters.material)) return false;
      if (filters.intent !== "all" && !product.intents.includes(filters.intent)) return false;
      if (filters.power.length > 0 && !filters.power.some((power) => product.powers.includes(Number(power)))) return false;
      if (filters.minPrice !== "" && product.price < Number(filters.minPrice)) return false;
      if (filters.maxPrice !== "" && product.price > Number(filters.maxPrice)) return false;
      return true;
    });
    if (sort === "price-low") return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "price-high") return [...filtered].sort((a, b) => b.price - a.price);
    if (sort === "name") return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    return filtered;
  }, [filters, sort]);

  const legacyProducts = products.filter((product) => product.generation === "Previous generation");
  const comparedProducts = compareIds.map((id) => products.find((product) => product.id === id)).filter(Boolean);
  const activeFilterCount = filters.power.length + filters.family.length
    + ["intent", "material"].filter((key) => filters[key] !== "all").length
    + (filters.minPrice !== "" || filters.maxPrice !== "" ? 1 : 0);

  function updateFilter(key, value) {
    setFilters((current) => ({ ...current, [key]: value }));
    trackEvent("machine_collection_filter", { filter_name: key, filter_value: value });
  }

  function updatePriceFilter(key, rawValue) {
    if (rawValue === "") {
      setFilters((current) => ({ ...current, [key]: "" }));
      return;
    }

    const numericValue = Number(rawValue);
    if (!Number.isFinite(numericValue)) return;

    setFilters((current) => {
      const currentMin = current.minPrice === "" ? PRICE_MIN : Number(current.minPrice);
      const currentMax = current.maxPrice === "" ? PRICE_MAX : Number(current.maxPrice);
      const boundedValue = key === "minPrice"
        ? Math.min(Math.max(numericValue, PRICE_MIN), currentMax)
        : Math.max(Math.min(numericValue, PRICE_MAX), currentMin);
      const isDefaultBoundary = key === "minPrice" ? boundedValue === PRICE_MIN : boundedValue === PRICE_MAX;
      return { ...current, [key]: isDefaultBoundary ? "" : String(boundedValue) };
    });
  }

  function toggleMultiFilter(key, value) {
    setFilters((current) => {
      const selected = current[key];
      const next = value === "all"
        ? []
        : selected.includes(value)
          ? selected.filter((item) => item !== value)
          : [...selected, value];
      trackEvent("machine_collection_filter", { filter_name: key, filter_value: next.join(",") || "all" });
      return { ...current, [key]: next };
    });
  }

  function chooseFamily(id) {
    setFilters((current) => ({ ...current, family: [id] }));
    window.requestAnimationFrame(() => catalogRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  function toggleCompare(id) {
    setCompareIds((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      if (current.length >= 3) return current;
      const next = [...current, id];
      trackEvent("machine_compare_select", { machine_id: id, selection_count: next.length });
      return next;
    });
  }

  function submitFinder(event) {
    event.preventDefault();
    const matches = rankFamilies(finderSelections);
    setFinderMatches(matches);
    trackEvent("machine_finder_complete", { first_match: matches[0]?.id, second_match: matches[1]?.id });
  }

  function scrollStories(direction) {
    const rail = storyRailRef.current;
    const card = rail?.querySelector(".review-video-card");
    if (!rail || !card) return;
    const gap = Number.parseFloat(window.getComputedStyle(rail).columnGap || window.getComputedStyle(rail).gap) || 18;
    rail.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }

  function playStory(video) {
    setYoutubeVideo(video);
    trackEvent("video_start", { video_id: video.id, video_title: video.title, content_category: "machine_collection_story" });
  }

  const selectedMinPrice = filters.minPrice === "" ? PRICE_MIN : Number(filters.minPrice);
  const selectedMaxPrice = filters.maxPrice === "" ? PRICE_MAX : Number(filters.maxPrice);
  const priceRangeStyle = {
    "--price-start": `${((selectedMinPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100}%`,
    "--price-end": `${((selectedMaxPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100}%`,
  };

  return (
    <div className="home-shell collection-shell" id="top">
      <a className="home-skip" href="#collection-main">Skip to content</a>
      <HomeNavigation />

      <main id="collection-main">
        <section className="collection-hero" aria-labelledby="collection-hero-title">
          <div className="collection-hero__copy">
            <span>ONE RANGE. FOUR WAYS TO MAKE.</span>
            <h1 id="collection-hero-title">Find the machine that fits how you make.</h1>
            <p>Start with your products and production goals. We’ll help you narrow the range before the specifications take over.</p>
            <div className="collection-hero__actions">
              <a href="#machine-finder">Find my fit <Sparkle size={18} weight="fill" /></a>
              <a href="#machine-catalog">Browse all machines <ArrowUpRight size={18} weight="bold" /></a>
            </div>
            <ul aria-label="OneLaser ownership promises">
              <li>30-Day Easy Returns</li>
              <li>3-2-1 Warranty</li>
              <li>U.S.-Based Support</li>
            </ul>
          </div>
          <figure className="collection-hero__media">
            <img src={asset("collection-hero-lineup.jpg")} alt="OneLaser XRF, Cobra, Hydra Gen2 and VertiGo laser machines" />
          </figure>
        </section>

        <section className="collection-finder" id="machine-finder" aria-labelledby="collection-finder-title">
          <div className="collection-finder__intro">
            <span>NOT SURE WHERE TO START?</span>
            <h2 id="collection-finder-title">Start with the work.</h2>
            <p>Tell us what you make and how you work. You’ll get two strong family fits, plus the reason each belongs on your shortlist.</p>
          </div>
          <form className="collection-finder__form" onSubmit={submitFinder}>
            {Object.entries(finderOptions).map(([field, options]) => (
              <label htmlFor={`collection-finder-${field}`} key={field}>
                <span>{field === "application" ? "Primary job" : field === "volume" ? "Output level" : field === "size" ? "Project size" : "Material"}</span>
                <span className="collection-select-wrap">
                  <select id={`collection-finder-${field}`} value={finderSelections[field]} onChange={(event) => { setFinderSelections((current) => ({ ...current, [field]: event.target.value })); setFinderMatches(null); }} required>
                    <option value="" disabled>Select {field === "application" ? "primary job" : field === "volume" ? "output level" : field === "size" ? "project size" : "material"}</option>
                    {options.map(([value, label]) => <option value={value} key={value}>{label}</option>)}
                  </select>
                  <CaretDown size={18} weight="bold" aria-hidden="true" />
                </span>
              </label>
            ))}
            <button type="submit">Show my matches <ArrowUpRight size={19} weight="bold" /></button>
          </form>
          {finderMatches && (
            <div className="collection-finder__results" aria-live="polite">
              <header><span>YOUR TWO BEST-FIT PATHS</span><h3>Compare the family fit first.</h3></header>
              <div>
                {finderMatches.map((family) => (
                  <button type="button" onClick={() => chooseFamily(family.id)} key={family.id}>
                    <span>{family.rank === 1 ? "BEST MATCH" : "ALSO CONSIDER"}</span>
                    <h3>{family.name}</h3>
                    <p>{family.bestFor}</p>
                    <ul aria-label={`${family.name} key specifications`}>
                      {family.specs.map((spec) => <li key={spec}>{spec}</li>)}
                    </ul>
                    <img src={asset(family.image)} alt="" loading="lazy" />
                    <strong>View {family.name.replace("™", "")} models <ArrowUpRight size={16} weight="bold" /></strong>
                  </button>
                ))}
              </div>
              <p>Recommendations are based on project fit. Confirm material compatibility, rotary requirements, work area, and final configuration with a OneLaser expert.</p>
            </div>
          )}
        </section>

        <section className="collection-catalog" id="machine-catalog" ref={catalogRef} aria-labelledby="collection-catalog-title">
          <header className="collection-catalog__header">
            <div>
              <span>CURRENT LINEUP</span>
              <h2 id="collection-catalog-title">Find your machine.</h2>
              <p>Filter by the job you need to do, then compare the details that change your workflow.</p>
            </div>
            <button className="collection-filter-trigger" type="button" aria-expanded={filtersOpen} aria-controls="collection-filters" onClick={() => setFiltersOpen(true)}>
              <FunnelSimple size={19} weight="bold" /> Filters{activeFilterCount ? ` · ${activeFilterCount}` : ""}
            </button>
          </header>

          <div className="collection-catalog__layout">
            {filtersOpen && <button className="collection-filter-backdrop" type="button" aria-label="Close filters" onClick={() => setFiltersOpen(false)} />}
            <aside id="collection-filters" className={`collection-filters${filtersOpen ? " is-open" : ""}`} aria-label="Filter current machines">
              <header>
                <div>
                  <SlidersHorizontal size={20} weight="bold" />
                  <strong>Filters</strong>
                  {activeFilterCount > 0 && <span>{activeFilterCount}</span>}
                </div>
                <div className="collection-filters__header-actions">
                  <button className="collection-filters__reset" type="button" onClick={() => setFilters(defaultFilters)} disabled={!activeFilterCount}>Reset</button>
                  <button className="collection-filters__close" type="button" aria-label="Close filters" onClick={() => setFiltersOpen(false)}><X size={19} weight="bold" /></button>
                </div>
              </header>
              <p className="collection-filters__count"><strong>{currentProducts.length}</strong> {currentProducts.length === 1 ? "machine" : "machines"} match</p>
              <fieldset className="collection-filters__price">
                <legend>Price</legend>
                <div className="collection-price-range" style={priceRangeStyle}>
                  <div className="collection-price-range__values" aria-hidden="true">
                    <span>{currency.format(PRICE_MIN)}</span>
                    <strong>{currency.format(selectedMinPrice)} — {currency.format(selectedMaxPrice)}</strong>
                    <span>{currency.format(PRICE_MAX)}</span>
                  </div>
                  <div className="collection-price-range__track">
                    <input type="range" min={PRICE_MIN} max={PRICE_MAX} step={PRICE_STEP} value={selectedMinPrice} aria-label="Minimum price" onChange={(event) => updatePriceFilter("minPrice", event.target.value)} onPointerUp={() => trackEvent("machine_collection_filter", { filter_name: "min_price", filter_value: filters.minPrice || "all" })} />
                    <input type="range" min={PRICE_MIN} max={PRICE_MAX} step={PRICE_STEP} value={selectedMaxPrice} aria-label="Maximum price" onChange={(event) => updatePriceFilter("maxPrice", event.target.value)} onPointerUp={() => trackEvent("machine_collection_filter", { filter_name: "max_price", filter_value: filters.maxPrice || "all" })} />
                  </div>
                </div>
                <div className="collection-price-fields">
                  <label>
                    <span>Min</span>
                    <span className="collection-price-input"><span>$</span><input type="number" min={PRICE_MIN} max={selectedMaxPrice} step={PRICE_STEP} inputMode="numeric" placeholder="0" value={filters.minPrice} onChange={(event) => updatePriceFilter("minPrice", event.target.value)} onBlur={() => trackEvent("machine_collection_filter", { filter_name: "min_price", filter_value: filters.minPrice || "all" })} /></span>
                  </label>
                  <span aria-hidden="true">to</span>
                  <label>
                    <span>Max</span>
                    <span className="collection-price-input"><span>$</span><input type="number" min={selectedMinPrice} max={PRICE_MAX} step={PRICE_STEP} inputMode="numeric" placeholder="15000" value={filters.maxPrice} onChange={(event) => updatePriceFilter("maxPrice", event.target.value)} onBlur={() => trackEvent("machine_collection_filter", { filter_name: "max_price", filter_value: filters.maxPrice || "all" })} /></span>
                  </label>
                </div>
              </fieldset>
              {filterGroups.map((group) => (
                <fieldset className={`${group.key === "power" ? "collection-filters__power " : ""}${group.multiple ? "collection-filters__multi" : ""}`.trim() || undefined} key={group.key}>
                  <legend>{group.label}</legend>
                  <div>
                    {group.options.map(([value, label]) => {
                      const isActive = group.multiple
                        ? value === "all" ? filters[group.key].length === 0 : filters[group.key].includes(value)
                        : filters[group.key] === value;
                      return (
                        <button type="button" className={isActive ? "is-active" : ""} aria-pressed={isActive} onClick={() => group.multiple ? toggleMultiFilter(group.key, value) : updateFilter(group.key, value)} key={value}>
                          <span>{label}</span>
                          <span className="collection-filter-option__mark" aria-hidden="true">{isActive && <Check size={13} weight="bold" />}</span>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              ))}
              <button className="collection-filters__apply" type="button" onClick={() => setFiltersOpen(false)}>Show {currentProducts.length} machines</button>
            </aside>

            <div className="collection-results">
              <div className="collection-results__toolbar">
                <p aria-live="polite"><strong>{currentProducts.length}</strong> current {currentProducts.length === 1 ? "machine" : "machines"}</p>
                <label htmlFor="collection-sort">
                  <span>Sort</span>
                  <span className="collection-sort-wrap">
                    <select id="collection-sort" value={sort} onChange={(event) => setSort(event.target.value)}>
                      <option value="recommended">Recommended</option>
                      <option value="price-low">Price: low to high</option>
                      <option value="price-high">Price: high to low</option>
                      <option value="name">Name</option>
                    </select>
                    <CaretDown size={16} weight="bold" aria-hidden="true" />
                  </span>
                </label>
              </div>
              {currentProducts.length ? (
                <div className="collection-product-grid">
                  {currentProducts.map((product) => <ProductCard product={product} compareIds={compareIds} onToggleCompare={toggleCompare} key={product.id} />)}
                </div>
              ) : (
                <div className="collection-empty">
                  <h3>No exact match yet.</h3>
                  <p>Clear one filter or talk with a OneLaser expert about the closest production fit.</p>
                  <button type="button" onClick={() => setFilters(defaultFilters)}>Clear filters</button>
                </div>
              )}
            </div>
          </div>
        </section>

        {comparedProducts.length >= 2 && (
          <section className="collection-compare" id="machine-comparison" ref={compareRef} aria-labelledby="collection-compare-title">
            <header>
              <div><span>YOUR SHORTLIST</span><h2 id="collection-compare-title">Compare what changes the work.</h2></div>
              <button type="button" onClick={() => setCompareIds([])}>Clear comparison</button>
            </header>
            <div className="collection-compare__table-wrap">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Compare</th>
                    {comparedProducts.map((product) => (
                      <th scope="col" key={product.id}>
                        <img src={product.image} alt="" loading="lazy" />
                        <strong>{product.name}</strong>
                        <button type="button" onClick={() => toggleCompare(product.id)} aria-label={`Remove ${product.name} from comparison`}><XCircle size={17} weight="regular" /> Remove</button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr><th scope="row">Best for</th>{comparedProducts.map((product) => <td key={product.id}>{product.bestFor}</td>)}</tr>
                  <tr><th scope="row">Laser configuration</th>{comparedProducts.map((product) => <td key={product.id}>{product.laser}</td>)}</tr>
                  <tr><th scope="row">Work area / object size</th>{comparedProducts.map((product) => <td key={product.id}>{product.workArea}</td>)}</tr>
                  <tr><th scope="row">Max engraving speed</th>{comparedProducts.map((product) => <td key={product.id}>{product.maxSpeed}</td>)}</tr>
                  <tr><th scope="row">Acceleration</th>{comparedProducts.map((product) => <td key={product.id}>{product.acceleration}</td>)}</tr>
                  <tr><th scope="row">Positioning accuracy</th>{comparedProducts.map((product) => <td key={product.id}>{product.positioningAccuracy}</td>)}</tr>
                  <tr><th scope="row">Max engraving resolution</th>{comparedProducts.map((product) => <td key={product.id}>{product.maxResolution}</td>)}</tr>
                  <tr><th scope="row">Key capability</th>{comparedProducts.map((product) => <td key={product.id}>{product.keyCapability}</td>)}</tr>
                  <tr><th scope="row">Product line</th>{comparedProducts.map((product) => <td key={product.id}>{product.productLine}</td>)}</tr>
                  <tr><th scope="row">Generation</th>{comparedProducts.map((product) => <td key={product.id}>{product.generation}</td>)}</tr>
                  <tr><th scope="row">Starting price</th>{comparedProducts.map((product) => <td key={product.id}><strong>{currency.format(product.price)}</strong></td>)}</tr>
                </tbody>
              </table>
            </div>
          </section>
        )}

        <section className="collection-legacy" aria-labelledby="collection-legacy-title">
          <details>
            <summary>
              <span><small>PREVIOUS GENERATION &amp; CLEARANCE</small><strong id="collection-legacy-title">Still comparing earlier platforms?</strong></span>
              <span>View {legacyProducts.length} machines <CaretDown size={18} weight="bold" /></span>
            </summary>
            <p className="collection-legacy__intro">These models remain available while inventory lasts. Compare their exact configuration and support path before purchase.</p>
            <div className="collection-product-grid collection-product-grid--legacy">
              {legacyProducts.map((product) => <ProductCard product={product} compareIds={compareIds} onToggleCompare={toggleCompare} key={product.id} />)}
            </div>
          </details>
        </section>

        <section className="ownership-support ownership-support--collection" id="collection-support" aria-label="OneLaser ownership support">
          <div className="ownership-support__inner">
            <div className="ownership-support__grid">
              <article className="ownership-support__card">
                <div className="ownership-support__card-top"><Check size={26} weight="bold" aria-hidden="true" /><span>01</span></div>
                <div className="ownership-support__lead"><h3>30-Day Money-Back Guarantee.</h3></div>
                <div className="ownership-support__details">
                  <p>Take a full 30 days to get to know your OneLaser. If it&apos;s not the right fit for you, just reach out — we&apos;ll help you send it back, no hard feelings, no hassle. We&apos;d rather you find the perfect machine than keep one that isn&apos;t. (Refunds are issued in full, less a 3% payment processing fee and round-trip shipping costs.)</p>
                </div>
              </article>
              <article className="ownership-support__card">
                <div className="ownership-support__card-top"><ShieldCheck size={26} weight="regular" aria-hidden="true" /><span>02</span></div>
                <div className="ownership-support__lead"><h3>We built it to last. We back it to prove it.</h3></div>
                <div className="ownership-support__details">
                  <p>OneLaser&apos;s 3-2-1 warranty provides three years on the frame and structure, two years on electronics, and one year on the laser source. It&apos;s not fine print; it&apos;s what confidence in our own build quality looks like. Confirm exact coverage for your selected model before purchase.</p>
                </div>
              </article>
              <article className="ownership-support__card ownership-support__card--wide">
                <div className="ownership-support__card-top"><Star size={26} weight="regular" aria-hidden="true" /><span>03</span></div>
                <div className="ownership-support__lead"><h3>One Support. Real engineers. Real experience.</h3></div>
                <div className="ownership-support__details">
                  <p>When you call OneLaser, you talk to a U.S.-based engineer with more than five years of laser-industry experience on average—people who&apos;ve built, tuned and repaired these machines, not script readers. That experience means faster answers, first-call solutions and real support. You&apos;re not just buying a machine; you&apos;re buying the team behind it.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="collection-guide" aria-labelledby="collection-guide-title">
          <header><span>BUYING GUIDE</span><h2 id="collection-guide-title">We’ll help you choose with confidence.</h2></header>
          <div>
            <article><span>01</span><h3>Start with the product.</h3><p>Flat goods, deep cutting, large-format production and repeat drinkware each point to a different OneLaser family.</p></article>
            <article><span>02</span><h3>Choose detail or cutting headroom.</h3><p>RF favors fast response and fine detail. Higher-power glass CO₂ tiers create more cutting headroom.</p></article>
            <article><span>03</span><h3>Plan for tomorrow’s volume.</h3><p>Choose around your repeatable daily workflow—not a single sample job or an unsupported income promise.</p></article>
          </div>
          <a href={SALES_CALL_URL} target="_blank" rel="noreferrer" onClick={() => trackEvent("generate_lead", { lead_type: "machine_collection_consultation" })}>Talk with a OneLaser expert <ArrowUpRight size={18} weight="bold" /></a>
        </section>

        <section className="review-proof collection-stories" id="customer-stories" aria-labelledby="collection-stories-title">
          <div className="review-proof__header">
            <div className="section-heading section-heading--stack">
              <span className="eyebrow">CUSTOMER SUCCESS · OWNER STORIES</span>
              <h2 id="collection-stories-title">Real businesses. Real results.</h2>
              <p>Watch owners and independent creators put OneLaser machines into real workshop workflows—from first setup to business production.</p>
            </div>
            <div className="review-proof__controls" aria-label="Browse OneLaser customer stories">
              <button type="button" onClick={() => scrollStories(-1)} aria-label="Show previous customer story"><CaretLeft size={22} /></button>
              <button type="button" onClick={() => scrollStories(1)} aria-label="Show more customer stories"><CaretRight size={22} /></button>
            </div>
          </div>
          <div
            className="review-proof__rail"
            ref={storyRailRef}
            aria-label="OneLaser customer story videos"
            tabIndex="0"
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") scrollStories(-1);
              if (event.key === "ArrowRight") scrollStories(1);
            }}
          >
            {collectionStoryVideos.map((video, index) => <CollectionStoryCard video={video} index={index} onPlay={playStory} key={video.id} />)}
          </div>
        </section>

        <section className="collection-faq" aria-labelledby="collection-faq-title">
          <header><span>FAQ</span><h2 id="collection-faq-title">Before you choose.</h2></header>
          <div>
            <details><summary>Which OneLaser is best for a first machine?<CaretDown size={18} weight="bold" /></summary><p>Start with the products you plan to make, then use the finder above. XRF prioritizes desktop RF detail, Cobra prioritizes cutting, Hydra Gen2 combines industrial scale with RF options, and VertiGo specializes in drinkware.</p></details>
            <details><summary>Can these machines engrave bare metal?<CaretDown size={18} weight="bold" /></summary><p>RF and glass CO₂ systems are intended for compatible organic materials and coated, painted or anodized metal surfaces. Confirm bare-metal requirements with OneLaser before purchase.</p></details>
            <details><summary>Do I need a Rotary for cups and bottles?<CaretDown size={18} weight="bold" /></summary><p>Cylindrical work generally requires a compatible rotary setup. VertiGo is built around an integrated PiBurn Grip; confirm rotary compatibility for other models.</p></details>
            <details><summary>Where can I confirm current price and availability?<CaretDown size={18} weight="bold" /></summary><p>Every product card opens the official OneLaser product page. That page is the final source for live pricing, availability, configuration and fulfillment expectations.</p></details>
          </div>
        </section>
      </main>

      {comparedProducts.length > 0 && (
        <aside className="collection-compare-tray" aria-label="Machine comparison shortlist">
          <div>
            <span>{comparedProducts.length}/3 selected</span>
            <strong>{comparedProducts.map((product) => product.name).join(" · ")}</strong>
          </div>
          <button type="button" disabled={comparedProducts.length < 2} onClick={() => compareRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}>
            {comparedProducts.length < 2 ? "Select one more" : `Compare ${comparedProducts.length}`} <ArrowUpRight size={17} weight="bold" />
          </button>
          <button type="button" aria-label="Clear comparison" onClick={() => setCompareIds([])}><X size={18} weight="bold" /></button>
        </aside>
      )}

      <HomeFooter />

      {youtubeVideo && (
        <div className="youtube-modal" role="dialog" aria-modal="true" aria-label={`${youtubeVideo.title} YouTube video`} onClick={() => setYoutubeVideo(null)}>
          <div className="youtube-modal__dialog" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="youtube-modal__close" aria-label="Close YouTube video" onClick={() => setYoutubeVideo(null)}><X size={23} /></button>
            <div className="youtube-modal__player">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeVideo.id}?autoplay=1&rel=0&modestbranding=1`}
                title={youtubeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div className="youtube-modal__copy"><span className="eyebrow">{youtubeVideo.tag}</span><h2>{youtubeVideo.title}</h2><p>{youtubeVideo.channel} · YouTube</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
