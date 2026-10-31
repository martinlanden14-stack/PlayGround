/* OUTLAND — world generation, tiles, structures, items & zones */
import { RNG, fbm, hash2, key, parseKey, clamp, dist } from './utils.js';
import { BUILDINGS, BLANKET_COLORS } from './data.js';

export const TILE = 32;
export const MAP = 84;

export const T = {
  GRASS: 0, DIRT: 1, SAND: 2, SHALLOW: 3, WATER: 4, ROCK: 5, STONE: 6, WOOD: 7,
};

const BLOCKING_KINDS = new Set(['tree', 'rock', 'wall', 'campfire', 'bench', 'turret', 'torch']);
const LIGHT_KINDS = new Set(['campfire', 'torch', 'turret']);

export class World {
  constructor(seed = 1) {
    this.w = MAP;
    this.h = MAP;
    this.seed = seed | 0;
    this.rng = new RNG(this.seed);
    this.cx = this.w >> 1;
    this.cy = this.h >> 1;
    this.terrain = new Uint8Array(this.w * this.h);
    this.zones = new Uint8Array(this.w * this.h);
    this.objs = new Map();
    this.designations = new Map();
    this.items = [];
    this.nextItemId = 1;
    this.cropRate = 1;
    this.rainBoost = 1;
    this.generate();
  }

  inBounds(x, y) { return x >= 0 && y >= 0 && x < this.w && y < this.h; }
  idx(x, y) { return y * this.w + x; }
  terrainAt(x, y) { return this.inBounds(x, y) ? this.terrain[y * this.w + x] : T.ROCK; }
  setTerrain(x, y, t) { if (this.inBounds(x, y)) this.terrain[y * this.w + x] = t; }
  objAt(x, y) { return this.objs.get(key(x, y)); }
  addObj(o) {
    o.x = o.x | 0; o.y = o.y | 0;
    this.objs.set(key(o.x, o.y), o);
    return o;
  }
  removeObjAt(x, y) {
    const k = key(x, y);
    const o = this.objs.get(k);
    if (o) this.objs.delete(k);
    return o;
  }
  removeObj(o) { return this.objs.delete(key(o.x, o.y)); }

  zoneAt(x, y) { return this.inBounds(x, y) ? this.zones[y * this.w + x] : 0; }
  setZone(x, y, z) {
    if (!this.inBounds(x, y)) return;
    this.zones[y * this.w + x] = z;
    this.refreshStockpile();
  }
  refreshStockpile() {
    for (const it of this.items) {
      if (it.carried) continue;
      const stored = this.zoneAt(it.x, it.y) === 1;
      if (it.stored !== stored) {
        it.stored = stored;
        if (stored) {
          it.ox = (hash2(it.x, it.y, 9) - 0.5) * 0.42;
          it.oy = (hash2(it.x, it.y, 13) - 0.5) * 0.42;
        }
      }
    }
  }

  walkable(x, y) {
    if (!this.inBounds(x, y)) return false;
    const t = this.terrain[y * this.w + x];
    if (t === T.WATER || t === T.ROCK) return false;
    const o = this.objs.get(key(x, y));
    if (o && BLOCKING_KINDS.has(o.kind)) return false;
    if (o && o.kind === 'blueprint' && BUILDINGS[o.defId]?.blocking && o.progress > 0.75) return false;
    return true;
  }
  moveCost(x, y) {
    const t = this.terrain[y * this.w + x];
    if (t === T.SHALLOW) return 1.7;
    if (t === T.SAND) return 1.18;
    if (t === T.STONE || t === T.WOOD) return 0.82;
    if (t === T.DIRT) return 0.94;
    return 1;
  }
  isLightSource(o) { return LIGHT_KINDS.has(o.kind); }

  addItem(type, amount, x, y, stored = false, ox = null, oy = null) {
    if (amount <= 0) return null;
    const it = {
      id: this.nextItemId++,
      type, amount,
      x: x | 0, y: y | 0,
      ox: ox ?? (hash2(x, y, this.nextItemId) - 0.5) * 0.44,
      oy: oy ?? (hash2(y, x, this.nextItemId + 7) - 0.5) * 0.32,
      stored: stored || this.zoneAt(x | 0, y | 0) === 1,
      carried: false, reserved: null,
    };
    this.items.push(it);
    return it;
  }
  removeItem(it) {
    const i = this.items.indexOf(it);
    if (i >= 0) this.items.splice(i, 1);
  }
  total(type) {
    let n = 0;
    for (const it of this.items) if (it.type === type) n += it.amount;
    return n;
  }
  totals() {
    const t = { wood: 0, stone: 0, food: 0, meal: 0 };
    for (const it of this.items) if (t[it.type] !== undefined) t[it.type] += it.amount;
    return t;
  }
  spend(type, amount) {
    if (this.total(type) < amount) return false;
    let need = amount;
    // consume stored stock first, then loose items
    const sorted = [...this.items].sort((a, b) => (a.type !== type ? 1 : 0) - (b.type !== type ? 1 : 0) || (b.stored ? 1 : 0) - (a.stored ? 1 : 0));
    for (const it of sorted) {
      if (need <= 0) break;
      if (it.type !== type) continue;
      const take = Math.min(need, it.amount);
      it.amount -= take; need -= take;
      if (it.amount <= 0) this.removeItem(it);
    }
    return true;
  }
  findNearestItem(type, x, y, predicate = null) {
    let best = null, bd = Infinity;
    for (const it of this.items) {
      if (it.type !== type || it.carried || (predicate && !predicate(it))) continue;
      const d = (it.x - x) ** 2 + (it.y - y) ** 2;
      if (d < bd) { bd = d; best = it; }
    }
    return best;
  }
  stockpileTiles() {
    const out = [];
    for (let y = 0; y < this.h; y++) for (let x = 0; x < this.w; x++) {
      if (this.zones[y * this.w + x] === 1) out.push({ x, y });
    }
    return out;
  }
  findNearestZoneTile(x, y, zone = 1) {
    let best = null, bd = Infinity;
    for (let ty = 0; ty < this.h; ty++) for (let tx = 0; tx < this.w; tx++) {
      if (this.zones[ty * this.w + tx] !== zone) continue;
      const d = (tx - x) ** 2 + (ty - y) ** 2;
      if (d < bd) { bd = d; best = { x: tx, y: ty }; }
    }
    return best;
  }
  farmTiles() {
    const out = [];
    for (let y = 0; y < this.h; y++) for (let x = 0; x < this.w; x++) {
      if (this.zones[y * this.w + x] === 2) out.push({ x, y });
    }
    return out;
  }
  findFreeBed(pawnId) {
    const beds = [];
    for (const o of this.objs.values()) if (o.kind === 'bed') beds.push(o);
    let best = null, bd = Infinity;
    for (const b of beds) {
      if (b.sleepers && b.sleepers.length && !b.sleepers.includes(pawnId)) continue;
      if (b.owner && b.owner !== pawnId) continue;
      const d = (b.x - this.cx) ** 2 + (b.y - this.cy) ** 2;
      if (d < bd) { bd = d; best = b; }
    }
    return best;
  }
  beds() { const a = []; for (const o of this.objs.values()) if (o.kind === 'bed') a.push(o); return a; }
  campfires() { const a = []; for (const o of this.objs.values()) if (o.kind === 'campfire') a.push(o); return a; }
  benches() { const a = []; for (const o of this.objs.values()) if (o.kind === 'bench') a.push(o); return a; }
  turrets() { const a = []; for (const o of this.objs.values()) if (o.kind === 'turret') a.push(o); return a; }
  lightsNear(x, y, r = 22) {
    const out = [];
    for (const o of this.objs.values()) {
      if (!LIGHT_KINDS.has(o.kind)) continue;
      if (Math.abs(o.x - x) > r || Math.abs(o.y - y) > r) continue;
      out.push(o);
    }
    return out;
  }

  canPlace(defId, x, y) {
    const def = BUILDINGS[defId];
    if (!def || !this.inBounds(x, y)) return false;
    const t = this.terrainAt(x, y);
    if (def.floor) {
      if (t === T.WATER || t === T.ROCK) return false;
      return !this.objs.has(key(x, y));
    }
    if (t === T.WATER || t === T.ROCK) return false;
    const o = this.objAt(x, y);
    if (o) {
      if (o.kind === 'crop' || o.kind === 'blueprint') return false;
      if (o.kind === 'bush') return false;
      return false;
    }
    return true;
  }

  createStructure(defId, x, y, opts = {}) {
    const def = BUILDINGS[defId];
    const kind = def.floor ? 'floor'
      : def.door ? 'door'
      : def.bed ? 'bed'
      : def.fire ? 'campfire'
      : def.bench ? 'bench'
      : def.turret ? 'turret'
      : (defId === 'wood_wall' || defId === 'stone_wall') ? 'wall'
      : defId;
    if (def.floor) {
      this.setTerrain(x, y, defId === 'stone_floor' ? T.STONE : T.WOOD);
      return { kind: 'floor', defId, x, y, floor: true };
    }
    const o = {
      kind, defId, x, y,
      hp: opts.hp ?? def.hp, maxHp: opts.hp ?? def.hp,
      playerBuilt: opts.playerBuilt !== false,
      material: opts.material || (def.cost.stone ? 'stone' : 'wood'),
    };
    if (def.door) { o.open = 0; o.target = 0; }
    if (def.bed) { o.sleepers = []; o.blanket = opts.blanket || BLANKET_COLORS[this.rng.int(0, BLANKET_COLORS.length - 1)]; }
    if (def.fire) { o.fuel = opts.fuel ?? 85; o.lit = true; o.flicker = this.rng.float(0, 10); }
    if (def.bench) { o.studying = false; }
    if (def.turret) { o.angle = -Math.PI / 2; o.cd = 0; o.target = null; o.flash = 0; }
    if (def.light) o.light = def.light;
    if (def.blocking) o.blocking = true;
    this.objs.set(key(x, y), o);
    return o;
  }

  createBlueprint(defId, x, y) {
    const def = BUILDINGS[defId];
    return this.addObj({
      kind: 'blueprint', defId, x, y,
      progress: 0, buildTime: def.buildTime || 3, hp: 20, maxHp: 20,
    });
  }

  designatedJobAt(x, y) { return this.designations.get(key(x, y)); }
  setDesignation(x, y, type) {
    if (!this.inBounds(x, y)) return false;
    if (type === 'chop') {
      const o = this.objAt(x, y);
      if (!o || (o.kind !== 'tree' && o.kind !== 'bush')) return false;
    }
    if (type === 'mine') {
      const o = this.objAt(x, y);
      if (o && o.kind !== 'rock') return false;
      if (!o && this.terrainAt(x, y) !== T.ROCK) return false;
    }
    if (type === 'deconstruct') {
      const o = this.objAt(x, y);
      if (!o || !['wall', 'door', 'bed', 'campfire', 'bench', 'turret', 'torch'].includes(o.kind)) return false;
    }
    if (type === 'harvest') {
      const o = this.objAt(x, y);
      if (!o || (o.kind !== 'crop' && o.kind !== 'bush')) return false;
    }
    this.designations.set(key(x, y), type);
    return true;
  }
  clearDesignation(x, y) { this.designations.delete(key(x, y)); }

  findMineTargets() {
    const out = [];
    for (const [k, v] of this.designations) {
      if (v === 'mine') { const [x, y] = parseKey(k); out.push({ x, y, type: v }); }
    }
    return out;
  }

  damageStructure(o, amount) {
    if (!o) return;
    o.hp -= amount;
    if (o.hp <= 0) {
      const def = BUILDINGS[o.defId];
      this.removeObj(o);
      if (o.kind === 'wall') {
        const drop = def?.cost?.stone ? 'stone' : 'wood';
        const n = def?.cost?.stone ? 2 : 2;
        this.addItem(drop, n, o.x, o.y);
      }
      if (o.kind === 'campfire') {
        this.addItem('wood', 2, o.x, o.y);
        this.addItem('stone', 1, o.x, o.y);
      }
    }
  }

  update(dt, game) {
    // doors ease open
    for (const o of this.objs.values()) {
      if (o.kind === 'door') {
        o.open += (o.target - o.open) * Math.min(1, dt * 8);
      } else if (o.kind === 'crop') {
        if (this.zoneAt(o.x, o.y) === 2) {
          const rate = 0.0058 * (this.cropRate || 1) * (this.rainBoost || 1);
          o.growth = Math.min(1, o.growth + rate * dt);
        }
      } else if (o.kind === 'bush') {
        if ((o.berries || 0) < o.maxBerries) {
          o.regrow = (o.regrow || 0) + dt;
          if (o.regrow > 220) {
            o.berries = Math.min(o.maxBerries, (o.berries || 0) + 1);
            o.regrow = 0;
          }
        }
      } else if (o.kind === 'campfire') {
        if (o.fuel > 0) {
          o.fuel = Math.max(0, o.fuel - dt * 0.055);
          o.lit = o.fuel > 0;
        } else o.lit = false;
        o.flicker = (o.flicker || 0) + dt * 9;
      } else if (o.kind === 'turret') {
        o.flash = Math.max(0, (o.flash || 0) - dt * 6);
      }
    }
    // flash decays handled in render
    this.rainBoost = game?.weather === 'rain' ? 1.4 : game?.weather === 'drizzle' ? 1.15 : 1;
  }

  naturalNear(x, y, kind, radius = 6) {
    let best = null, bd = Infinity;
    for (const o of this.objs.values()) {
      if (o.kind !== kind) continue;
      const d = (o.x - x) ** 2 + (o.y - y) ** 2;
      if (d < bd && d <= radius * radius) { bd = d; best = o; }
    }
    return best;
  }

  serialize() {
    return {
      seed: this.seed,
      terrain: Array.from(this.terrain),
      zones: Array.from(this.zones),
      objs: [...this.objs.values()],
      designations: [...this.designations.entries()],
      items: this.items,
      nextItemId: this.nextItemId,
      cropRate: this.cropRate,
    };
  }
  load(data) {
    this.seed = data.seed;
    this.terrain = new Uint8Array(data.terrain);
    this.zones = new Uint8Array(data.zones);
    this.objs = new Map();
    for (const o of data.objs) this.objs.set(key(o.x, o.y), o);
    this.designations = new Map(data.designations);
    this.items = data.items;
    this.nextItemId = data.nextItemId || 1;
    this.cropRate = data.cropRate || 1;
    this.refreshStockpile();
  }

  /* ---------------- world generation ---------------- */
  generate() {
    const { w, h, seed } = this;
    const cx = this.cx, cy = this.cy;
    const rng = this.rng;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const wx = x + (fbm(x * 0.075, y * 0.075, seed + 11, 3) - 0.5) * 11;
        const wy = y + (fbm(x * 0.075 + 30, y * 0.075, seed + 12, 3) - 0.5) * 11;
        let e = fbm(wx * 0.052, wy * 0.052, seed + 1, 5);
        e = 0.5 + (e - 0.5) * 1.5;
        const moist = fbm(wx * 0.085 + 20, wy * 0.085, seed + 2, 4);
        const edge = Math.min(x, y, w - 1 - x, h - 1 - y);
        let t = T.GRASS;
        if (edge < 2 + hash2(x, y, seed + 4) * 1.8) t = T.ROCK;
        else if (e < 0.325) t = T.WATER;
        else if (e < 0.352) t = T.SHALLOW;
        else if (e < 0.382) t = T.SAND;
        else if (e > 0.705) t = T.ROCK;
        else {
          const dirt = fbm(wx * 0.11 + 7, wy * 0.11, seed + 6, 3);
          if (dirt < 0.39 && moist < 0.55) t = T.DIRT;
          else t = T.GRASS;
        }
        this.terrain[y * w + x] = t;
      }
    }

    // sandy shores
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const i = y * w + x;
        if (this.terrain[i] === T.GRASS || this.terrain[i] === T.DIRT) {
          let nearWater = false;
          for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
            const t = this.terrain[(y + dy) * w + (x + dx)];
            if (t === T.WATER || t === T.SHALLOW) nearWater = true;
          }
          if (nearWater && hash2(x, y, seed + 9) < 0.7) this.terrain[i] = T.SAND;
        }
      }
    }

    // level the colony clearing
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const d = Math.hypot(x - cx, y - cy);
        if (d < 10.5) {
          const t = this.terrain[y * w + x];
          if (t === T.WATER || t === T.ROCK || t === T.SHALLOW) this.terrain[y * w + x] = T.GRASS;
        }
      }
    }

    // paved plaza
    for (let y = cy - 5; y <= cy + 5; y++) {
      for (let x = cx - 5; x <= cx + 5; x++) {
        if (Math.hypot(x - cx, y - cy) < 4.6) this.setTerrain(x, y, T.STONE);
      }
    }
    // wooden sleeping deck
    for (let y = cy - 5; y <= cy - 3; y++) {
      for (let x = cx - 4; x <= cx + 4; x++) this.setTerrain(x, y, T.WOOD);
    }
    // dirt track running south
    for (let y = cy + 6; y < h - 4; y++) {
      const x = Math.round(cx + Math.sin(y * 0.19) * 5 + (y - cy) * 0.06);
      for (let ox = -1; ox <= 1; ox++) {
        const t = this.terrainAt(x + ox, y);
        if (t === T.GRASS || t === T.DIRT) this.setTerrain(x + ox, y, T.DIRT);
      }
    }

    // scatter flora & boulders
    for (let y = 2; y < h - 2; y++) {
      for (let x = 2; x < w - 2; x++) {
        const d = Math.hypot(x - cx, y - cy);
        if (d < 9.2) continue;
        const t = this.terrain[y * w + x];
        if (t !== T.GRASS && t !== T.DIRT && t !== T.SAND) continue;
        const moisture = fbm(x * 0.09 + 3, y * 0.09, seed + 5, 3);
        const forest = fbm(x * 0.115 + 20, y * 0.115, seed + 15, 4);
        const roll = hash2(x, y, seed + 77);
        let treeChance = 0.012;
        if (moisture > 0.48) treeChance += (moisture - 0.48) * 0.34;
        if (forest > 0.54) treeChance += (forest - 0.54) * 0.55;
        if (t === T.SAND) treeChance *= 0.3;
        if (d < 14) treeChance *= 0.55;
        if (roll < treeChance) {
          this.addObj({
            kind: 'tree', x, y,
            variant: (hash2(x, y, seed + 21) * 3) | 0,
            size: 0.86 + hash2(x, y, seed + 22) * 0.3,
            hp: 60, maxHp: 60,
            sway: hash2(x, y, seed + 23) * 10,
            wood: 8 + Math.floor(hash2(x, y, seed + 24) * 5),
          });
        } else if (roll > 0.9935) {
          this.addObj({
            kind: 'rock', x, y,
            variant: (hash2(x, y, seed + 31) * 3) | 0,
            hp: 55, maxHp: 55,
            stone: 6 + Math.floor(hash2(x, y, seed + 32) * 5),
            size: 0.8 + hash2(x, y, seed + 33) * 0.35,
          });
        } else if (roll > 0.982) {
          this.addObj({
            kind: 'bush', x, y,
            berries: 3 + Math.floor(hash2(x, y, seed + 41) * 4),
            maxBerries: 7,
            regrow: 0,
            hp: 20, maxHp: 20,
          });
        }
      }
    }

    // guarantee forage close to home
    const berrySpots = [[-8, 4], [8, -3], [-6, -8], [10, 6], [5, 9], [-11, -4]];
    for (const [dx, dy] of berrySpots) {
      const x = cx + dx, y = cy + dy;
      if (this.inBounds(x, y) && !this.objs.has(key(x, y)) && this.terrainAt(x, y) !== T.WATER && this.terrainAt(x, y) !== T.ROCK) {
        this.addObj({ kind: 'bush', x, y, berries: 6, maxBerries: 7, regrow: 0, hp: 20, maxHp: 20 });
      }
    }
    // a few close trees and boulders for the tutorial
    const closeStuff = [[-8, 2, 'tree'], [-9, 3, 'tree'], [7, 8, 'tree'], [9, -5, 'tree'], [9, 8, 'rock'], [-7, 7, 'rock']];
    for (const [dx, dy, kind] of closeStuff) {
      const x = cx + dx, y = cy + dy;
      if (!this.inBounds(x, y) || this.objs.has(key(x, y))) continue;
      if (this.terrainAt(x, y) === T.WATER || this.terrainAt(x, y) === T.ROCK) continue;
      if (kind === 'tree') {
        this.addObj({ kind: 'tree', x, y, variant: 1, size: 1.02, hp: 60, maxHp: 60, sway: rng.float(0, 10), wood: 12 });
      } else {
        this.addObj({ kind: 'rock', x, y, variant: 0, hp: 55, maxHp: 55, stone: 9, size: 1 });
      }
    }

    // starting camp — beds, fire, stockpile, provisions
    this.createStructure('campfire', cx, cy, { fuel: 88 });
    const bedXs = [cx - 3, cx - 1, cx + 1, cx + 3];
    for (const bx of bedXs) this.createStructure('bed', bx, cy - 4, { playerBuilt: true });
    this.createStructure('torch', cx - 4, cy + 1);
    this.createStructure('torch', cx + 4, cy + 1);

    for (let y = cy + 2; y <= cy + 5; y++) {
      for (let x = cx - 3; x <= cx + 3; x++) this.zones[y * w + x] = 1;
    }

    const stock = [
      ['wood', 48], ['wood', 42], ['wood', 30],
      ['stone', 32], ['stone', 24],
      ['food', 18], ['food', 12],
      ['meal', 5], ['meal', 3],
    ];
    const spots = [];
    for (let y = cy + 2; y <= cy + 5; y++) for (let x = cx - 3; x <= cx + 3; x++) spots.push([x, y]);
    rng.shuffle(spots);
    stock.forEach(([type, amount], i) => {
      const [x, y] = spots[i % spots.length];
      this.addItem(type, amount, x, y, true);
    });
    this.refreshStockpile();

    // a couple of welcome designations
    const nearTrees = [];
    for (const o of this.objs.values()) {
      if (o.kind === 'tree') {
        const d = dist(o.x, o.y, cx, cy);
        if (d < 15) nearTrees.push(o);
      }
    }
    nearTrees.sort((a, b) => dist(a.x, a.y, cx, cy) - dist(b.x, b.y, cx, cy));
    for (const o of nearTrees.slice(0, 3)) this.designations.set(key(o.x, o.y), 'chop');
  }
}
