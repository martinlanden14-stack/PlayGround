// Procedural world generation and the starting colony of Emberfield.
import {
  TERRAIN, T, BUILDINGS, ITEMS, SKIN_TONES, HAIR_COLORS, SHIRT_COLORS, PANTS_COLORS,
  HAIR_STYLES, FIRST_NAMES, NICKNAMES, TRAITS, ANIMAL_DEFS,
} from './defs.js';
import { mulberry32, fbm, noise2, pick, clamp, dist, shuffle } from './util.js';
import { Pawn } from './pawns.js';

export const NATURE = {
  oak: { name: 'Oak tree', blocks: true, hp: 140, choppable: true, chopWork: 3.2, wood: 20, beauty: 2, kind: 'tree' },
  pine: { name: 'Pine tree', blocks: true, hp: 120, choppable: true, chopWork: 2.8, wood: 16, beauty: 2, kind: 'tree' },
  birch: { name: 'Birch tree', blocks: true, hp: 100, choppable: true, chopWork: 2.4, wood: 13, beauty: 2, kind: 'tree' },
  deadtree: { name: 'Dead tree', blocks: true, hp: 70, choppable: true, chopWork: 1.6, wood: 8, beauty: -1, kind: 'tree' },
  bush: { name: 'Berry bush', blocks: false, hp: 30, choppable: false, beauty: 1, kind: 'bush' },
  boulder: { name: 'Granite boulder', blocks: true, hp: 260, minable: true, mineWork: 3.8, stone: 26, steel: 0, kind: 'rock' },
  steelrock: { name: 'Compact steel', blocks: true, hp: 320, minable: true, mineWork: 4.6, stone: 8, steel: 18, kind: 'rock' },
  limestone: { name: 'Limestone boulder', blocks: true, hp: 220, minable: true, mineWork: 3.4, stone: 22, steel: 0, kind: 'rock' },
};

const inRect = (x, y, r) => x >= r.x0 && x <= r.x1 && y >= r.y0 && y <= r.y1;

export function generateMap(w) {
  const rng = mulberry32(w.seed ^ 0x51a7c3);
  const { W, H } = w;

  // --- Base terrain: a temperate river valley with a rocky north-west ridge.
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const elev = fbm(x * 0.075, y * 0.075, w.seed, 4);
      const moist = fbm(x * 0.12 + 31, y * 0.12 + 77, w.seed + 17, 3);
      let t = T.grass;
      if (x < 20 && y < 21) {
        const ridge = fbm(x * 0.17, y * 0.17, w.seed + 83, 3);
        if (ridge > 0.5 || (x < 10 && y < 12)) t = T.gravel;
        if (ridge > 0.7) t = T.sand;
      }
      if (t === T.grass) {
        if (moist > 0.66) t = T.dirt;
        else if (moist < 0.34 && elev > 0.55) t = T.dirt;
      }
      // A quiet lake west of the colony.
      const lakeNoise = (fbm(x * 0.22 + 9, y * 0.22 + 4, w.seed + 5, 3) - 0.5) * 3.4;
      const dl = Math.hypot(x - 13.2, y - 21.4) + lakeNoise;
      if (dl < 5.1) t = T.water;
      else if (dl < 6.1) t = T.marsh;
      else if (dl < 7.3) t = T.sand;
      w.terrain[w.idx(x, y)] = t;
    }
  }

  // --- Colony clearing: worn dirt and a path network.
  const paintDirt = (cx, cy, radius, type = T.dirt) => {
    for (let y = Math.floor(cy - radius); y <= Math.ceil(cy + radius); y++) {
      for (let x = Math.floor(cx - radius); x <= Math.ceil(cx + radius); x++) {
        if (!w.inBounds(x, y)) continue;
        const d = dist(x, y, cx, cy);
        if (d > radius) continue;
        if (w.terrain[w.idx(x, y)] === T.water) continue;
        if (w.terrain[w.idx(x, y)] === T.woodfloor) continue;
        if (d > radius - 0.8 && rng() < 0.45) continue;
        w.terrain[w.idx(x, y)] = rng() < 0.24 ? T.gravel : type;
      }
    }
  };
  for (let i = 0; i < 12; i++) paintDirt(29.5 + Math.sin(i) * 0.5, 33 + i * 0.55, 1.4, T.dirt);
  for (let i = 0; i < 12; i++) paintDirt(28 + i, 38.6, 1.15, T.dirt);
  for (let i = 0; i < 8; i++) paintDirt(38.6, 34 + i * 0.55, 1.05, T.dirt);
  for (let i = 0; i < 8; i++) paintDirt(24.5 + i, 37.2, 0.9, T.dirt);
  paintDirt(30.5, 30.5, 3.4, T.dirt);
  paintDirt(33.5, 35.5, 2.6, T.dirt);
  paintDirt(38, 31.5, 2.4, T.gravel);

  // House interior flooring.
  for (let y = 25; y <= 31; y++) for (let x = 25; x <= 33; x++) w.terrain[w.idx(x, y)] = T.woodfloor;
  // Small porch.
  for (let x = 28; x <= 30; x++) for (let y = 32; y <= 33; y++) w.terrain[w.idx(x, y)] = T.woodfloor;

  // --- Home structure.
  for (let x = 24; x <= 34; x++) {
    for (let y = 24; y <= 32; y++) {
      if (x > 24 && x < 34 && y > 24 && y < 32) continue;
      if (x === 29 && y === 32) continue;
      const isCorner = (x === 24 || x === 34) && (y === 24 || y === 32);
      w.place('wall', x, y, { built: true, force: true });
      if (isCorner) w.objects[w.objects.length - 1].corner = true;
    }
  }
  w.place('door', 29, 32, { built: true, force: true });
  w.place('bed', 25, 25, { built: true, force: true });
  w.place('bed', 27, 25, { built: true, force: true });
  w.place('bed', 32, 25, { built: true, force: true });
  w.place('table', 27, 29, { built: true, force: true });
  w.place('table', 31, 29, { built: true, force: true });
  w.place('chair', 26, 29, { built: true, force: true });
  w.place('chair', 29, 29, { built: true, force: true });
  w.place('chair', 30, 29, { built: true, force: true });
  w.place('chair', 33, 29, { built: true, force: true });
  w.place('stove', 33, 27, { built: true, force: true });
  w.place('bench', 25, 30, { built: true, force: true });
  w.place('lamp', 29, 27, { built: true, force: true });
  w.place('sculpture', 31, 31, { built: true, force: true });
  // Aria's work in progress: a fifth bed being assembled.
  w.place('bed', 30, 27, { built: false, force: true });

  // --- Outdoors: power, defence and gathering places.
  w.place('solar', 37, 24, { built: true, force: true });
  w.place('solar', 40, 24, { built: true, force: true });
  w.place('battery', 37, 27, { built: true, force: true });
  w.place('turret', 39, 32, { built: true, force: true });
  for (let x = 37; x <= 40; x++) w.place('sandbag', x, 33, { built: true, force: true });
  w.place('lamp', 28, 34, { built: true, force: true });
  w.place('lamp', 35, 37, { built: true, force: true });
  w.place('campfire', 33, 35, { built: true, force: true });
  w.place('chair', 32, 35, { built: true, force: true });
  w.place('chair', 34, 35, { built: true, force: true });

  // --- Zones.
  w.addZone('stockpile', 21, 35, 26, 38);
  w.addZone('grow', 38, 36, 44, 40);

  // Crop field, partly ripe and partly waiting to be sown.
  const cropRng = mulberry32(w.seed + 991);
  for (const key of w.growTiles) {
    const r = cropRng();
    if (r < 0.1) { w.crops[key] = 0; w.cropPlanted[key] = 0; continue; }
    w.cropPlanted[key] = 1;
    w.crops[key] = r < 0.5 ? 1 : 0.18 + cropRng() * 0.66;
  }

  // --- Storage contents.
  const stacks = [
    [21, 35, 'wood', 72], [21, 36, 'wood', 56], [22, 37, 'wood', 34],
    [22, 35, 'stone', 48], [23, 36, 'stone', 32],
    [23, 35, 'steel', 36], [24, 37, 'steel', 18],
    [24, 35, 'grain', 44], [25, 36, 'grain', 20],
    [25, 35, 'meal', 11], [24, 36, 'meat', 20],
    [26, 35, 'silver', 170], [26, 36, 'silver', 60],
    [26, 37, 'meal', 4],
  ];
  for (const [x, y, type, qty] of stacks) w.addItem(type, qty, x, y, { particles: false });
  // Items dropped outside await hauling (and give the colony a lived-in look).
  w.addItem('wood', 26, 31, 34, { particles: false });
  w.addItem('steel', 14, 34, 34, { particles: false });
  w.addItem('silver', 24, 27, 36, { particles: false });

  // --- Flora and rock.
  const avoid = [
    { x0: 22, y0: 22, x1: 36, y1: 34 },
    { x0: 35, y0: 22, x1: 43, y1: 31 },
    { x0: 19, y0: 33, x1: 28, y1: 41 },
    { x0: 36, y0: 34, x1: 46, y1: 42 },
    { x0: 30, y0: 33, x1: 36, y1: 38 },
    { x0: 12, y0: 19, x1: 15, y1: 23 },
  ];
  const isOpenForNature = (x, y) => {
    if (!w.inBounds(x, y)) return false;
    const t = w.terrain[w.idx(x, y)];
    if (t === T.water || t === T.marsh || t === T.woodfloor || t === T.stonefloor || t === T.soil) return false;
    if (w.objectAt(x, y)) return false;
    if (avoid.some((r) => inRect(x, y, r))) return false;
    return true;
  };

  const treeTypes = ['oak', 'oak', 'oak', 'pine', 'pine', 'birch', 'birch', 'deadtree'];
  let trees = 0;
  for (let i = 0; i < 900 && trees < 165; i++) {
    const x = 2 + Math.floor(rng() * (W - 4));
    const y = 2 + Math.floor(rng() * (H - 4));
    if (!isOpenForNature(x, y)) continue;
    const forest = fbm(x * 0.09 + 51, y * 0.09 + 12, w.seed + 31, 3);
    if (forest < 0.42 && rng() > 0.035) continue;
    if (Math.hypot(x - 30, y - 30) < 8 && rng() > 0.12) continue;
    let type = pick(rng, treeTypes);
    if (y < 18) type = rng() < 0.65 ? 'pine' : 'birch';
    if (x < 18 && y < 18 && rng() < 0.5) type = 'deadtree';
    w.placeNature(type, x, y, NATURE[type]);
    trees++;
  }
  let rocks = 0;
  for (let i = 0; i < 420 && rocks < 58; i++) {
    const x = 1 + Math.floor(rng() * (W - 2));
    const y = 1 + Math.floor(rng() * (H - 2));
    if (!isOpenForNature(x, y)) continue;
    const ridge = x < 22 && y < 22 ? 0.3 : 0.62;
    if (noise2(x * 0.13, y * 0.13, w.seed + 71) < ridge) continue;
    const type = rng() < 0.14 ? 'steelrock' : rng() < 0.5 ? 'boulder' : 'limestone';
    w.placeNature(type, x, y, NATURE[type]);
    rocks++;
  }
  let bushes = 0;
  for (let i = 0; i < 140 && bushes < 42; i++) {
    const x = 2 + Math.floor(rng() * (W - 4));
    const y = 2 + Math.floor(rng() * (H - 4));
    if (!isOpenForNature(x, y)) continue;
    if (w.terrain[w.idx(x, y)] !== T.grass) continue;
    w.placeNature('bush', x, y, NATURE.bush);
    bushes++;
  }

  // Keep the colony clearing readable: a handful of deliberate trees frame the scene.
  const framing = [
    ['oak', 21, 28], ['pine', 19, 34], ['birch', 36, 41], ['oak', 47, 33],
    ['pine', 43, 43], ['oak', 20, 43], ['birch', 17, 27], ['oak', 45, 20],
  ];
  for (const [type, x, y] of framing) {
    if (isOpenForNature(x, y)) w.placeNature(type, x, y, NATURE[type]);
  }

  // A few natural debris piles near the lake and forest.
  w.addItem('stone', 12, 17, 26, { particles: false });
  w.addItem('wood', 10, 16, 29, { particles: false });
  w.addItem('grain', 8, 25, 44, { particles: false });
  w.rebuildZones();
}

// ---------------------------------------------------------------- starting colonists
export function populateWorld(w) {
  const rng = mulberry32(w.seed + 404);
  const used = new Set();

  const make = (name, opts) => {
    const skin = opts.skin || pick(rng, SKIN_TONES);
    const hair = opts.hair || pick(rng, HAIR_COLORS);
    const shirt = opts.shirt || pick(rng, SHIRT_COLORS);
    const appearance = {
      skin, hair, shirt,
      pants: opts.pants || pick(rng, PANTS_COLORS),
      hairStyle: opts.hairStyle || pick(rng, HAIR_STYLES),
      hat: opts.hat || null,
      glasses: !!opts.glasses,
      beard: !!opts.beard,
      mask: !!opts.mask,
      scarf: !!opts.scarf,
    };
    used.add(name.split(' ')[0]);
    const p = w.spawnColonist({
      name, weapon: opts.weapon, skills: opts.skills, traits: opts.traits,
      appearance, priorities: opts.priorities, hp: opts.hp,
    });
    p.x = opts.x; p.y = opts.y;
    p.needs.food = opts.food ?? 78 + rng() * 18;
    p.needs.rest = opts.rest ?? 72 + rng() * 24;
    p.needs.joy = opts.joy ?? 60 + rng() * 25;
    p.backstory = opts.backstory || 'Colony founder';
    p.mood = 62 + rng() * 18;
    p.age = 22 + Math.floor(rng() * 24);
    p.skillProgress = p.skillProgress || {};
    return p;
  };

  const aria = make('Aria Brightwater', {
    x: 31.2, y: 28.1, weapon: 'rifle', backstory: 'Vatgrown soldier',
    skin: '#d29a74', hair: '#5a3a26', hairStyle: 'bun', shirt: '#4f6b7a', pants: '#3c4552',
    skills: { shooting: 8, melee: 4, construction: 6, mining: 3, cooking: 3, plants: 3, research: 5, medicine: 5, crafting: 4 },
    traits: ['optimist', 'industrious'],
    priorities: { doctor: 2, construction: 1, mining: 3, plants: 3, cooking: 4, hauling: 2, research: 4 },
  });
  const bram = make('Bram Stone', {
    x: 20, y: 32.6, weapon: 'knife', backstory: 'Settlement blacksmith',
    skin: '#b97d58', hair: '#3d2b20', hairStyle: 'short', beard: true, shirt: '#9b6a4d', pants: '#4a4136',
    skills: { shooting: 3, melee: 7, construction: 8, mining: 7, cooking: 2, plants: 4, research: 1, medicine: 2, crafting: 7 },
    traits: ['industrious', 'brawler'],
    priorities: { doctor: 4, construction: 1, mining: 2, plants: 4, cooking: 4, hauling: 2, research: 4 },
  });
  const cleo = make('Cleo Hearth', {
    x: 32, y: 28.2, weapon: 'pistol', backstory: 'Frontier cook',
    skin: '#95603f', hair: '#2b211c', hairStyle: 'braids', shirt: '#8a5a6b', pants: '#3f4a52',
    skills: { shooting: 4, melee: 3, construction: 2, mining: 2, cooking: 9, plants: 6, research: 2, medicine: 4, crafting: 5 },
    traits: ['gourmand', 'kind'],
    priorities: { doctor: 3, construction: 3, mining: 4, plants: 2, cooking: 1, hauling: 2, research: 4 },
  });
  const dax = make('Dax Voss', {
    x: 26.2, y: 31.1, weapon: 'pistol', backstory: 'Lab assistant',
    skin: '#e3b090', hair: '#a2652f', hairStyle: 'curly', glasses: true, shirt: '#6a6f8e', pants: '#3c4552',
    skills: { shooting: 3, melee: 2, construction: 3, mining: 2, cooking: 4, plants: 3, research: 9, medicine: 6, crafting: 6 },
    traits: ['fastlearner', 'nightowl'],
    priorities: { doctor: 2, construction: 4, mining: 4, plants: 3, cooking: 4, hauling: 3, research: 1 },
  });
  const elin = make('Elin Rye', {
    x: 39.4, y: 37.4, weapon: 'shotgun', backstory: 'Colony farmer',
    skin: '#f0c7a8', hair: '#c2893f', hairStyle: 'ponytail', hat: 'straw', shirt: '#7d8c62', pants: '#564a3a',
    skills: { shooting: 5, melee: 4, construction: 3, mining: 2, cooking: 4, plants: 9, research: 3, medicine: 3, crafting: 4 },
    traits: ['optimist', 'kind'],
    priorities: { doctor: 3, construction: 3, mining: 4, plants: 1, cooking: 2, hauling: 2, research: 4 },
  });
  const finn = make('Finn Ash', {
    x: 29.3, y: 34.6, weapon: 'rifle', backstory: 'Orphaned drifter',
    skin: '#70452e', hair: '#2b211c', hairStyle: 'mohawk', shirt: '#b08a4f', pants: '#2f3a3f',
    skills: { shooting: 6, melee: 5, construction: 5, mining: 5, cooking: 2, plants: 3, research: 2, medicine: 2, crafting: 4 },
    traits: ['quicksleep', 'trigger'],
    priorities: { doctor: 4, construction: 2, mining: 2, plants: 3, cooking: 4, hauling: 1, research: 4 },
  });

  // Starting jobs staged so the colony is alive from the very first frame.
  const bedBlueprint = w.objects.find((o) => o.type === 'bed' && !o.built);
  if (bedBlueprint) {
    aria.beginTask({ type: 'build', objId: bedBlueprint.id });
    aria.snapToWork();
  }

  // Bram chops the nearest tree outside the colony.
  let tree = null, td = Infinity;
  for (const o of w.objects) {
    if (!o.nature || !o.def.choppable || o.def.kind !== 'tree') continue;
    const d = dist(o.x, o.y, 21, 32);
    if (d < td && d > 3 && d < 12) { td = d; tree = o; }
  }
  if (tree) {
    w.designations.chop.add(tree.id);
    bram.beginTask({ type: 'chop', objId: tree.id });
    bram.snapToWork();
  }

  const stove = w.objects.find((o) => o.type === 'stove');
  if (stove) {
    cleo.beginTask({ type: 'cook', objId: stove.id });
    cleo.snapToWork();
    cleo.work = 1.4;
  }

  const bench = w.objects.find((o) => o.def.research);
  if (bench) {
    dax.beginTask({ type: 'research', objId: bench.id });
    dax.snapToWork();
    dax.work = 1.2;
  }

  // Elin harvests the ripest crop.
  let crop = null;
  for (const key of w.growTiles) {
    if (w.crops[key] >= 1) { crop = key; break; }
  }
  if (crop != null) {
    const cx = crop % w.W, cy = (crop / w.W) | 0;
    elin.x = cx + 0.5; elin.y = cy + 0.5;
    elin.beginTask({ type: 'harvest', x: cx, y: cy });
    elin.snapToWork();
    elin.work = 0.4;
  }

  // Finn is mid-haul with an armful of logs.
  const outsideWood = w.items.find((i) => i.type === 'wood' && !w.isStockpileAt(i.x, i.y) && i.x > 28);
  if (outsideWood) {
    const qty = outsideWood.qty;
    w.removeItem(outsideWood, qty);
    finn.carry = { type: 'wood', qty };
    const dest = w.stockpileSpot(29, 34);
    if (dest) {
      finn.beginTask({ type: 'haulDrop', itemType: 'wood', qty, dest });
      finn.x = 30.4; finn.y = 35.2;
    }
  }

  // Aria's bed should look nearly finished at first glance.
  if (bedBlueprint) bedBlueprint.work = bedBlueprint.workNeeded * 0.22;
  cleo.beginTask && null;

  // Animals: a small herd of muffalo, some chickens, and a wild hare.
  const addAnimal = (type, x, y) => {
    const def = ANIMAL_DEFS[type];
    const p = new Pawn(w, {
      kind: 'animal', animalType: type, def, name: def.name, x, y,
      hp: def.hp, weapon: null,
    });
    w.pawns.push(p);
    return p;
  };
  addAnimal('muffalo', 42.3, 43.2);
  addAnimal('muffalo', 43.8, 44.1);
  addAnimal('muffalo', 40.8, 44.2);
  addAnimal('chicken', 34.4, 36.7);
  addAnimal('chicken', 35.3, 36.1);
  addAnimal('chicken', 33.8, 37.4);
  addAnimal('hare', 18.2, 31.6);

  // Give the animals somewhere to wander from.
  for (const p of w.pawns) {
    if (p.kind !== 'animal') continue;
    p.homeX = p.x; p.homeY = p.y;
    p.wanderTimer = 1 + rng() * 5;
  }

  w.emit('colonists', {});
}
