export const accessoryMachines = [
  { id: "hydra-gen2", name: "Hydra Gen2" },
  { id: "cobra", name: "Cobra Series" },
  { id: "xrf", name: "XRF" },
  { id: "xt", name: "XT" },
  { id: "vertigo", name: "VertiGo" },
  { id: "hydra-gen1", name: "Hydra Gen1" },
];

export function filterAccessories(products, { machine = "all", categories = [], minPrice = 0, maxPrice = 9500, query = "", sort = "featured" } = {}) {
  const result = products.filter((product) => (machine === "all" || product.machines.includes(machine))
    && (!categories.length || categories.includes(product.category))
    && product.price >= minPrice && product.price <= maxPrice
    && `${product.name} ${product.description} ${product.fit} ${product.compatibilityNote} ${product.machines.map((id) => accessoryMachines.find((m) => m.id === id)?.name).join(" ")}`.toLowerCase().includes(query.trim().toLowerCase()));
  if (sort === "price-low") result.sort((a, b) => a.price - b.price);
  if (sort === "price-high") result.sort((a, b) => b.price - a.price);
  if (sort === "name") result.sort((a, b) => a.name.localeCompare(b.name));
  return result;
}
