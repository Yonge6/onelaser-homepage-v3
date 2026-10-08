import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { accessoryMachines, filterAccessories } from '../src/data/accessoryFilters.js';
const { products } = JSON.parse(readFileSync(new URL('../src/data/accessories.json', import.meta.url)));

test('Hydra Gen2 contains only explicit generation or universal matches', () => {
  const matches = filterAccessories(products, { machine: 'hydra-gen2' });
  assert.equal(matches.length, 5);
  assert.ok(matches.some(p => p.id === 'cw-5200-industrial-water-chiller'));
  assert.ok(matches.some(p => p.id === 'co2-glass-laser-tube'));
  assert.ok(matches.every(p => !p.id.includes('rotary') && p.id !== 'hydra-focal-lens-barrel'));
  assert.ok(matches.filter(p => /chiller|glass-laser-tube/.test(p.id)).every(p => /glass/i.test(p.compatibilityNote)));
});

test('machine and secondary filters combine without leaking incompatible items', () => {
  const matches = filterAccessories(products, { machine: 'hydra-gen2', categories: ['cooling', 'optics'], maxPrice: 500, sort: 'price-low' });
  assert.ok(matches.length > 0);
  assert.ok(matches.every(p => p.machines.includes('hydra-gen2') && ['cooling', 'optics'].includes(p.category) && p.price <= 500));
  assert.deepEqual(matches.map(p => p.price), matches.map(p => p.price).toSorted((a,b) => a-b));
  assert.equal(filterAccessories(products, { machine: 'hydra-gen2', categories: ['camera'] }).length, 0);
});

test('all products remain reachable and each compatibility record has a primary source', () => {
  assert.equal(filterAccessories(products).length, 28);
  assert.ok(products.every(p => p.compatibilityNote && p.compatibilityEvidence && p.compatibilitySource.startsWith('https://www.1laser.com/')));
  assert.ok(products.every(p => p.machines.every(id => accessoryMachines.some(m => m.id === id))));
  assert.ok(products.filter(p => p.id.includes('replacement-filters')).every(p => p.machines.length === 0));
  assert.equal(filterAccessories(products, { machine: 'xrf' }).length, 14);
  assert.ok(filterAccessories(products, { query: '  HYDRA GEN2 ' }).every(p => p.machines.includes('hydra-gen2')));
});
