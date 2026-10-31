// The colony world: procedural map, entities, time, events, jobs, combat.
import {
  MAP_W, MAP_H, HOURS_PER_SEC, START_HOUR, TERRAIN, TERRAIN_BY_ID, T, BUILDINGS, ITEMS, TECH,
  WEAPONS, TRAITS, FIRST_NAMES, NICKNAMES, BACKSTORIES, SKIN_TONES, HAIR_COLORS, SHIRT_COLORS,
  PANTS_COLORS, HAIR_STYLES, ANIMAL_DEFS, RAIDERS,
} from './defs.js';
import {
  clamp, dist, mulberry32, fbm, hash2, pick, shuffle, timeString, dayStamp,
} from './util.js';
import { Pawn } from './pawns.js';
import { generateMap, populateWorld } from './gen.js';

const DIRS8 = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];

export class World {
  constructor(seed = 20260401) {
    this.seed = seed;
    this.W = MAP_W; this.H = MAP_H;
    this.rng = mulberry32(seed);
    this.nextId = 1;
    this.terrain = new Uint8Array(this.W * this.H);
    this.objGrid = new Int32Array(this.W * this.H).fill(0);
    this.objects = [];
    this.objectsById = new Map();
    this.items = [];
    this.pawns = [];
    this.zones = [];
    this.crops = new Float32Array(this.W * this.H);
    this.cropPlanted = new Uint8Array(this.W * this.H);
    this.cropReserved = new Map();
    this.growTiles = new Set();
    this.stockpileTiles = new Set();
    this.designations = { chop: new Set(), mine: new Set(), deconstruct: new Set(), hunt: new Set() };
    this.particles = [];
    this.projectiles = [];
    this.floaters = [];
    this.decals = [];
    this.animTime = 0;
    this.speed = 1;
    this.paused = false;
    this.day = 1;
    this.time = START_HOUR;
    this.month = 0;
    this.weather = 'clear';
    this.weatherTimer = 7;
    this.rain = 0;
    this.fog = 0;
    this.eclipse = 0;
    this.flash = 0;
    this.techs = new Set();
    this.research = {
      active: 'masonry',
      progress: { masonry: 34, agriculture: 0, gunsmithing: 0, medicine: 0 },
      queue: ['masonry', 'agriculture', 'gunsmithing', 'medicine'],
    };
    this.events = [];
    this.raid = null;
    this.lastAbs = (this.day - 1) * 24 + this.time;
    this.lastRaidEnd = null;
    this.nextRaidAt = this.absHours() + 12.2;
    this.listeners = {};
    this.stats = { kills: 0, built: 0, harvested: 0, chopped: 0, mined: 0, meals: 0, colonistsLost: 0 };
    this.wealth = 0;
    this.gameOver = false;
    this.audio = null;
    this.recentNotices = [];
    this.jobScanTimer = 0;
    this._g = new Float32Array(this.W * this.H);
    this._came = new Int32Array(this.W * this.H);
    this._stamp = new Int32Array(this.W * this.H);
    this._closed = new Int32Array(this.W * this.H);
    this._mark = 0;
    this._buildHeap = null;
    this.generate();
    this.populate();
    this.scheduleInitialEvents();
    this.recomputeWealth();
  }

  // ---------------------------------------------------------------- events
  on(name, fn) { (this.listeners[name] ||= []).push(fn); return this; }
  emit(name, data) { for (const fn of this.listeners[name] || []) fn(data); }
  notice(kind, title, text, opts = {}) {
    const n = { kind, title, text, time: this.time, day: this.day, ...opts };
    this.recentNotices.push(n);
    if (this.recentNotices.length > 12) this.recentNotices.shift();
    this.emit('notice', n);
    return n;
  }
  play(sound, opts) { try { this.audio?.play(sound, opts); } catch { /* audio is optional */ } }

  absHours() { return (this.day - 1) * 24 + this.time; }
  hours() { return this.time; }
  isNight() { return this.time < 6 || this.time > 20.2; }
  daylight() {
    if (this.eclipse > 0) return 0.12;
    const h = this.time;
    if (h < 5) return 0;
    if (h < 7.5) return (h - 5) / 2.5;
    if (h < 17.5) return 1;
    if (h < 20) return 1 - (h - 17.5) / 2.5;
    return 0;
  }
  darkness() {
    const d = 1 - this.daylight();
    const weatherMurk = this.weather === 'storm' ? 0.16 : this.weather === 'rain' ? 0.1 : this.weather === 'overcast' ? 0.05 : 0;
    return clamp(d * 0.68 + weatherMurk + (this.eclipse > 0 ? 0.22 : 0), 0, 0.86);
  }

  // ---------------------------------------------------------------- tiles
  inBounds(x, y) { return x >= 0 && y >= 0 && x < this.W && y < this.H; }
  idx(x, y) { return (y | 0) * this.W + (x | 0); }
  tileAt(x, y) { return this.inBounds(x, y) ? this.terrain[this.idx(x, y)] : T.water; }
  terrainDef(x, y) { return this.terrainAt(x, y); }
  terrainAt(x, y) { return TERRAIN_BY_ID[this.tileAt(x, y)] || TERRAIN_BY_ID[0]; }
  objectAt(x, y) {
    if (!this.inBounds(x, y)) return null;
    const id = this.objGrid[this.idx(x, y)];
    return id ? this.objectsById.get(id) || null : null;
  }
  objectById(id) { return id ? this.objectsById.get(id) || null : null; }
  pawnById(id) { return this.pawns.find((p) => p.id === id && !p.dead) || null; }

  isWalkable(x, y) {
    if (!this.inBounds(x, y)) return false;
    const t = this.terrain[this.idx(x, y)];
    if (!TERRAIN_BY_ID[t]?.walk) return false;
    const o = this.objectAt(x, y);
    if (o && !o.dead && o.built && o.def.blocks) return false;
    return true;
  }
  blocksSight(x, y) {
    if (!this.inBounds(x, y)) return true;
    const o = this.objectAt(x, y);
    if (o && !o.dead && o.built && (o.def.blocks || o.type === 'door')) return true;
    return false;
  }
  lineClear(x1, y1, x2, y2) {
    const d = Math.hypot(x2 - x1, y2 - y1);
    const steps = Math.ceil(d * 3);
    for (let i = 1; i < steps; i++) {
      const t = i / steps;
      const x = Math.floor(x1 + (x2 - x1) * t);
      const y = Math.floor(y1 + (y2 - y1) * t);
      if (this.blocksSight(x, y)) {
        // Doors and walls at either endpoint shouldn't block a shot at the target tile.
        if ((x === Math.floor(x1) && y === Math.floor(y1)) || (x === Math.floor(x2) && y === Math.floor(y2))) continue;
        return false;
      }
    }
    return true;
  }

  // ---------------------------------------------------------------- objects
  place(type, x, y, opts = {}) {
    const def = BUILDINGS[type];
    if (!def) return null;
    const rot = opts.rot || 0;
    const w = rot % 180 === 90 ? def.h : def.w;
    const h = rot % 180 === 90 ? def.w : def.h;
    for (let yy = y; yy < y + h; yy++) {
      for (let xx = x; xx < x + w; xx++) {
        if (!this.inBounds(xx, yy)) return null;
        if (!opts.force && this.terrain[this.idx(xx, yy)] === T.water) return null;
        if (!opts.force && this.objectAt(xx, yy)) return null;
      }
    }
    const built = opts.built !== false;
    const obj = {
      id: this.nextId++, type, def, x, y, w, h, rot,
      built, hp: built ? def.hp : Math.max(1, def.hp * 0.12), maxHp: def.hp,
      work: 0, workNeeded: def.work, seed: (Math.random() * 1e9) | 0,
      reservedBy: null, angle: -Math.PI / 2, cooldown: 0, targetId: null,
      open: 0, flash: 0, fell: 0, creation: this.animTime, dead: false,
    };
    this.objects.push(obj);
    this.objectsById.set(obj.id, obj);
    this.fillGrid(obj, obj.id);
    this.invalidateAround(x, y, w, h);
    return obj;
  }
  fillGrid(obj, id) {
    for (let yy = obj.y; yy < obj.y + obj.h; yy++)
      for (let xx = obj.x; xx < obj.x + obj.w; xx++)
        if (this.inBounds(xx, yy)) this.objGrid[this.idx(xx, yy)] = id;
  }
  removeObject(obj, opts = {}) {
    if (!obj || obj.dead) return;
    obj.dead = true;
    for (let yy = obj.y; yy < obj.y + obj.h; yy++)
      for (let xx = obj.x; xx < obj.x + obj.w; xx++) {
        if (this.inBounds(xx, yy) && this.objGrid[this.idx(xx, yy)] === obj.id) this.objGrid[this.idx(xx, yy)] = 0;
      }
    this.objectsById.delete(obj.id);
    for (const set of Object.values(this.designations)) set.delete(obj.id);
    this.invalidateAround(obj.x, obj.y, obj.w, obj.h);
    if (opts.terrain != null) {
      for (let yy = obj.y; yy < obj.y + obj.h; yy++)
        for (let xx = obj.x; xx < obj.x + obj.w; xx++)
          if (this.inBounds(xx, yy)) this.terrain[this.idx(xx, yy)] = opts.terrain;
    }
  }
  invalidateAround(x, y, w, h) {
    this.emit('terrain', { x0: x - 1, y0: y - 1, x1: x + w + 1, y1: y + h + 1 });
  }
  setTerrain(x, y, t) {
    if (!this.inBounds(x, y)) return;
    this.terrain[this.idx(x, y)] = t;
    this.invalidateAround(x, y, 1, 1);
  }
  completeBuild(obj) {
    if (!obj || obj.dead) return;
    obj.built = true;
    obj.hp = obj.maxHp;
    obj.work = 0;
    if (obj.def.floor) {
      const t = obj.type === 'stonefloor' ? T.stonefloor : T.woodfloor;
      for (let yy = obj.y; yy < obj.y + obj.h; yy++)
        for (let xx = obj.x; xx < obj.x + obj.w; xx++) this.terrain[this.idx(xx, yy)] = t;
      this.removeObject(obj);
      this.invalidateAround(obj.x, obj.y, obj.w, obj.h);
    }
    this.stats.built++;
    this.spawnParticles('dust', obj.x + obj.w / 2, obj.y + obj.h / 2, 10, { spread: 0.9 });
    this.play('build');
    this.recomputeWealth();
  }
  damageObject(obj, dmg, source) {
    if (!obj || obj.dead) return;
    obj.hp -= dmg;
    obj.flash = 0.18;
    const px = obj.x + obj.w / 2, py = obj.y + obj.h / 2;
    this.spawnParticles(obj.type.includes('stone') || obj.type === 'sandbag' ? 'stone' : 'wood', px, py, 3, { spread: 0.5 });
    if (obj.hp <= 0) {
      this.spawnParticles('dust', px, py, 16, { spread: 1.2 });
      this.removeObject(obj, { terrain: obj.def.floor ? T.grass : undefined });
      this.notice('bad', 'Structure destroyed', `${obj.def.name} was destroyed${source ? ` by ${source}` : ''}.`);
      this.play('collapse');
    }
  }
  adjacentTiles(obj) {
    const out = [];
    const seen = new Set();
    for (let x = obj.x - 1; x <= obj.x + obj.w; x++) {
      for (let y = obj.y - 1; y <= obj.y + obj.h; y++) {
        if (x >= obj.x && x < obj.x + obj.w && y >= obj.y && y < obj.y + obj.h) continue;
        if (!this.isWalkable(x, y)) continue;
        const k = this.idx(x, y);
        if (seen.has(k)) continue;
        seen.add(k);
        out.push({ x, y });
      }
    }
    return out;
  }
  freeAdjacent(obj, pawn) {
    const opts = this.adjacentTiles(obj);
    if (!opts.length) return null;
    if (!pawn) return opts[0];
    opts.sort((a, b) => dist2(a.x, a.y, pawn.x, pawn.y) - dist2(b.x, b.y, pawn.x, pawn.y));
    return opts[0];
  }
  nearestWalkable(x, y) {
    x = Math.round(x); y = Math.round(y);
    if (this.isWalkable(x, y)) return { x, y };
    for (let r = 1; r < 8; r++) {
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          if (Math.abs(dx) !== r && Math.abs(dy) !== r) continue;
          if (this.isWalkable(x + dx, y + dy)) return { x: x + dx, y: y + dy };
        }
      }
    }
    return { x, y };
  }

  // ---------------------------------------------------------------- items
  addItem(type, qty, x, y, opts = {}) {
    if (qty <= 0) return null;
    x = Math.round(x); y = Math.round(y);
    const existing = this.items.find((i) => !i.dead && i.type === type && i.x === x && i.y === y && !i.reservedBy);
    if (existing) {
      existing.qty += qty;
      existing.pulse = 0.3;
      return existing;
    }
    const item = { id: this.nextId++, type, qty, x, y, reservedBy: null, seed: (Math.random() * 1e9) | 0, dead: false, pulse: 0.35 };
    this.items.push(item);
    if (opts.particles !== false) this.spawnParticles('dust', x + 0.5, y + 0.5, 3, { spread: 0.4 });
    return item;
  }
  itemById(id) { return this.items.find((i) => i.id === id && !i.dead) || null; }
  itemsAt(x, y) { return this.items.filter((i) => !i.dead && i.x === x && i.y === y); }
  removeItem(item, qty = item.qty) {
    if (!item) return;
    item.qty -= qty;
    if (item.qty <= 0) item.dead = true;
  }
  countItem(type) {
    let n = 0;
    for (const i of this.items) if (!i.dead && i.type === type) n += i.qty;
    return n;
  }
  countAll() {
    const c = { wood: 0, stone: 0, steel: 0, grain: 0, meat: 0, meal: 0, silver: 0 };
    for (const i of this.items) if (!i.dead && c[i.type] != null) c[i.type] += i.qty;
    c.food = c.grain + c.meat + c.meal;
    return c;
  }
  consume(type, qty) {
    let need = qty;
    const pool = this.items.filter((i) => !i.dead && i.type === type && !i.reservedBy)
      .sort((a, b) => (this.isStockpileAt(b.x, b.y) ? 1 : 0) - (this.isStockpileAt(a.x, a.y) ? 1 : 0));
    for (const i of pool) {
      if (need <= 0) break;
      const take = Math.min(need, i.qty);
      i.qty -= take; need -= take;
      if (i.qty <= 0) i.dead = true;
    }
    if (need > 0) {
      // allow consuming reserved stock (meals on a stove, for example)
      const rest = this.items.filter((i) => !i.dead && i.type === type);
      for (const i of rest) {
        if (need <= 0) break;
        const take = Math.min(need, i.qty);
        i.qty -= take; need -= take;
        if (i.qty <= 0) i.dead = true;
      }
    }
    return need <= 0;
  }
  findFoodItem(pawn) {
    const foods = this.items.filter((i) => !i.dead && !i.reservedBy && ITEMS[i.type]?.food);
    if (!foods.length) return null;
    const rank = (i) => (i.type === 'meal' ? 0 : i.type === 'meat' ? 1 : 2);
    return foods.sort((a, b) => rank(a) - rank(b) || dist2(a.x, a.y, pawn.x, pawn.y) - dist2(b.x, b.y, pawn.x, pawn.y))[0];
  }

  // ---------------------------------------------------------------- zones
  addZone(type, x0, y0, x1, y1) {
    const x = Math.min(x0, x1), y = Math.min(y0, y1);
    const w = Math.abs(x1 - x0) + 1, h = Math.abs(y1 - y0) + 1;
    let minX = Math.max(0, x), minY = Math.max(0, y), maxX = Math.min(this.W - 1, x + w - 1), maxY = Math.min(this.H - 1, y + h - 1);
    if (maxX < minX || maxY < minY) return null;
    // Trim water from zones where possible.
    let count = 0;
    for (let yy = minY; yy <= maxY; yy++) for (let xx = minX; xx <= maxX; xx++) if (this.terrain[this.idx(xx, yy)] !== T.water) count++;
    if (count < 2) return null;
    const zone = { id: this.nextId++, type, x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 };
    this.zones.push(zone);
    if (type === 'grow') {
      for (let yy = zone.y; yy < zone.y + zone.h; yy++) {
        for (let xx = zone.x; xx < zone.x + zone.w; xx++) {
          if (this.terrain[this.idx(xx, yy)] === T.water) continue;
          if (!this.objectAt(xx, yy)) this.terrain[this.idx(xx, yy)] = T.soil;
        }
      }
      this.invalidateAround(zone.x, zone.y, zone.w, zone.h);
    }
    this.rebuildZones();
    return zone;
  }
  rebuildZones() {
    this.growTiles.clear();
    this.stockpileTiles.clear();
    for (const z of this.zones) {
      if (z.removed) continue;
      for (let y = z.y; y < z.y + z.h; y++) {
        for (let x = z.x; x < z.x + z.w; x++) {
          if (!this.inBounds(x, y)) continue;
          if (z.type === 'grow') this.growTiles.add(this.idx(x, y));
          else this.stockpileTiles.add(this.idx(x, y));
        }
      }
    }
    for (const key of this.growTiles) {
      if (!this.cropPlanted[key] && this.terrain[key] !== T.soil && this.terrain[key] !== T.water) this.terrain[key] = T.soil;
    }
  }
  zoneAt(x, y) {
    return this.zones.find((z) => !z.removed && x >= z.x && x < z.x + z.w && y >= z.y && y < z.y + z.h) || null;
  }
  removeZoneAt(x, y) {
    const z = this.zoneAt(x, y);
    if (!z) return false;
    z.removed = true;
    for (let yy = z.y; yy < z.y + z.h; yy++) for (let xx = z.x; xx < z.x + z.w; xx++) {
      const k = this.idx(xx, yy);
      if (z.type === 'grow') { this.crops[k] = 0; this.cropPlanted[k] = 0; this.cropReserved.delete(k); }
    }
    this.zones = this.zones.filter((zz) => !zz.removed);
    this.rebuildZones();
    return true;
  }
  isStockpileAt(x, y) { return this.stockpileTiles.has(this.idx(x, y)); }
  stockpileSpot(x, y) {
    if (!this.stockpileTiles.size) return null;
    let best = null, bestScore = Infinity;
    for (const key of this.stockpileTiles) {
      const sx = key % this.W, sy = Math.floor(key / this.W);
      if (!this.isWalkable(sx, sy)) continue;
      const stacks = this.items.filter((i) => !i.dead && i.x === sx && i.y === sy).length;
      if (stacks >= 3) continue;
      const score = dist2(sx, sy, x, y) + stacks * 3;
      if (score < bestScore) { bestScore = score; best = { x: sx, y: sy }; }
    }
    return best;
  }
  isStorageFull() {
    for (const key of this.stockpileTiles) {
      const sx = key % this.W, sy = Math.floor(key / this.W);
      const stacks = this.items.filter((i) => !i.dead && i.x === sx && i.y === sy).length;
      if (stacks < 3) return false;
    }
    return true;
  }

  // ---------------------------------------------------------------- pathfinding
  findPath(sx, sy, goals, opts = {}) {
    sx |= 0; sy |= 0;
    if (!this.isWalkable(sx, sy)) {
      const alt = this.nearestWalkable(sx, sy);
      sx = alt.x; sy = alt.y;
    }
    const goalList = [];
    for (const g of goals) {
      const k = this.idx(g.x, g.y);
      if (!this.isWalkable(g.x, g.y)) continue;
      goalList.push({ x: g.x, y: g.y, k });
    }
    if (!goalList.length) return null;
    const goalSet = new Set(goalList.map((g) => g.k));
    if (goalSet.has(this.idx(sx, sy))) return [];
    const W = this.W, N = W * this.H;
    const mark = ++this._mark;
    const g = this._g, came = this._came, seen = this._stamp, closed = this._closed;
    const open = new MinHeap();
    const start = this.idx(sx, sy);
    const h = (x, y) => {
      let m = Infinity;
      for (const gl of goalList) {
        const d = Math.abs(gl.x - x) + Math.abs(gl.y - y);
        if (d < m) m = d;
      }
      return m;
    };
    g[start] = 0;
    seen[start] = mark;
    came[start] = -1;
    open.push(h(sx, sy), start);
    let found = -1;
    let expanded = 0;
    const maxNodes = opts.maxNodes || 6000;
    while (open.size) {
      const { val: cur } = open.pop();
      if (closed[cur] === mark) continue;
      closed[cur] = mark;
      if (goalSet.has(cur)) { found = cur; break; }
      if (++expanded > maxNodes) break;
      const cx = cur % W, cy = (cur / W) | 0;
      for (const [dx, dy] of DIRS8) {
        const nx = cx + dx, ny = cy + dy;
        if (!this.isWalkable(nx, ny)) continue;
        if (dx && dy && (!this.isWalkable(cx + dx, cy) || !this.isWalkable(cx, cy + dy))) continue;
        const ni = ny * W + nx;
        if (closed[ni] === mark) continue;
        const cost = dx && dy ? 1.4142 : 1;
        const ng = g[cur] + cost;
        if (seen[ni] !== mark || ng < g[ni]) {
          seen[ni] = mark;
          g[ni] = ng;
          came[ni] = cur;
          open.push(ng + h(nx, ny), ni);
        }
      }
    }
    if (found < 0) return null;
    const path = [];
    let cur = found;
    while (cur !== start && cur >= 0) {
      path.push({ x: cur % W, y: (cur / W) | 0 });
      cur = came[cur];
    }
    path.reverse();
    return path;
  }

  pathToAdjacent(pawn, obj, opts) {
    const goals = this.adjacentTiles(obj);
    if (!goals.length) return null;
    return this.findPath(Math.round(pawn.x), Math.round(pawn.y), goals, opts);
  }
  pathToTile(pawn, x, y, opts) {
    return this.findPath(Math.round(pawn.x), Math.round(pawn.y), [{ x, y }], opts);
  }
  pathToAny(pawn, goals, opts) {
    return this.findPath(Math.round(pawn.x), Math.round(pawn.y), goals, opts);
  }

  // ---------------------------------------------------------------- simulation
  update(dt) {
    if (this.paused || this.gameOver) return;
    const sdt = Math.min(dt, 0.06) * this.speed;
    const gh = sdt * HOURS_PER_SEC;
    this.animTime += sdt;
    this.time += gh;
    let rolled = false;
    while (this.time >= 24) {
      this.time -= 24;
      this.day++;
      this.month = Math.floor((this.day - 1) / 15) % 4;
      rolled = true;
    }
    if (rolled) {
      this.recomputeWealth();
      this.onNewDay();
    }
    this.updateWeather(gh);
    this.updateEvents();
    this.updatePawns(sdt, gh);
    this.updateObjects(sdt, gh);
    this.updateCrops(gh);
    this.updateProjectiles(sdt);
    this.updateParticles(sdt);
    this.updateRaid();
    if (this.absHours() >= this.nextRaidAt && !this.raid && this.day > 1) this.spawnRaid();
    this.wealthTimer = (this.wealthTimer || 0) - sdt;
    if (this.wealthTimer <= 0) { this.wealthTimer = 3; this.recomputeWealth(); }
  }

  onNewDay() {
    if (this.day === 2) {
      this.notice('info', 'A new day', 'The colony survived its first night. Keep everyone fed, rested and hopeful.');
    }
    if (this.day % 15 === 0) {
      this.notice('info', 'A new season', 'The air shifts. A new season settles over the colony.');
    }
  }

  updateWeather(gh) {
    this.rain += ((this.weather === 'rain' || this.weather === 'storm' ? (this.weather === 'storm' ? 1 : 0.6) : 0) - this.rain) * Math.min(1, gh * 1.4);
    this.fog += ((this.weather === 'fog' ? 1 : 0) - this.fog) * Math.min(1, gh * 1.2);
    if (this.eclipse > 0) this.eclipse = Math.max(0, this.eclipse - gh);
    this.flash = Math.max(0, this.flash - gh * 40);
    if ((this.weather === 'storm' || this.weather === 'rain') && this.rng() < gh * (this.weather === 'storm' ? 0.9 : 0.14)) {
      this.flash = 1;
      this.play('thunder');
    }
    this.weatherTimer -= gh;
    if (this.weatherTimer <= 0) {
      const old = this.weather;
      const roll = this.rng();
      let next = 'clear';
      if (roll < 0.4) next = 'clear';
      else if (roll < 0.6) next = 'overcast';
      else if (roll < 0.82) next = 'rain';
      else if (roll < 0.92) next = 'storm';
      else next = 'fog';
      if (this.eclipse > 0) next = 'overcast';
      this.weather = next;
      this.weatherTimer = 4 + this.rng() * 8;
      if (old !== next && (next === 'storm' || next === 'rain')) {
        this.notice('info', next === 'storm' ? 'Thunderstorm' : 'Rain', next === 'storm'
          ? 'Lightning splits the sky. Colonists hurry to finish their work.'
          : 'A soft rain begins to fall across the colony.');
      }
      this.emit('weather', next);
    }
  }

  updatePawns(sdt, gh) {
    if (!sdt) return;
    for (const p of this.pawns) {
      if (p.dead) continue;
      p.update(sdt, gh);
    }
    if (!this.gameOver && this.pawns.length && !this.pawns.some((p) => p.kind === 'colonist' && !p.dead && !p.downed)) {
      this.gameOver = true;
      this.paused = true;
      this.emit('gameover', {});
    }
  }

  updateCrops(gh) {
    if (!this.growTiles.size) return;
    const light = this.daylight();
    const mult = this.hasTech('agriculture') ? 1.25 : 1;
    for (const key of this.growTiles) {
      if (!this.cropPlanted[key]) continue;
      if (this.crops[key] < 1) {
        let rate = (0.9 + light * 1.6) * mult / 24; // about one day from sprout to ripe
        if (this.weather === 'rain') rate *= 1.15;
        this.crops[key] = Math.min(1, this.crops[key] + rate * gh);
      }
    }
  }

  updateObjects(sdt, gh) {
    for (const o of this.objects) {
      if (o.dead) continue;
      if (o.flash > 0) o.flash = Math.max(0, o.flash - sdt);
      if (!o.built) continue;
      if (o.def.turret) this.updateTurret(o, sdt);
      if (o.type === 'campfire' || o.type === 'stove') {
        if (this.rng() < sdt * 0.6) this.spawnParticles('smoke', o.x + o.w / 2, o.y + 0.25, 1, { spread: 0.2 });
      }
      if (o.def.door) {
        let near = false;
        for (const p of this.pawns) {
          if (!p.dead && dist(p.x, p.y, o.x + 0.5, o.y + 0.5) < 1.4) { near = true; break; }
        }
        o.open += ((near ? 1 : 0) - o.open) * Math.min(1, sdt * 7);
      }
    }
  }

  updateTurret(o, sdt) {
    if (o.cooldown > 0) o.cooldown -= sdt;
    const range = 10.5;
    let target = null, best = Infinity;
    for (const p of this.pawns) {
      if (p.dead || p.kind !== 'raider' || p.downed) continue;
      const d = dist(o.x + 0.5, o.y + 0.5, p.x, p.y);
      if (d < range && d < best && this.lineClear(o.x + 0.5, o.y + 0.5, p.x, p.y)) { best = d; target = p; }
    }
    if (target) {
      const ang = Math.atan2(target.y - (o.y + 0.5), target.x - (o.x + 0.5));
      let diff = ((ang - o.angle + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI;
      o.angle += diff * Math.min(1, sdt * 8);
      if (o.cooldown <= 0) {
        o.cooldown = 0.75;
        this.shoot(o, target, { dmg: 11 * (this.hasTech('gunsmithing') ? 1.25 : 1), range, acc: 0.64, kind: 'turret', tracer: 'gold' });
      }
    } else {
      o.angle += (this.animTime * 0.12 - o.angle) * Math.min(1, sdt * 0.5);
    }
  }

  updateProjectiles(sdt) {
    for (const b of this.projectiles) {
      if (b.done) continue;
      b.px = b.x; b.py = b.y;
      const dx = b.tx - b.x, dy = b.ty - b.y;
      const d = Math.hypot(dx, dy);
      const step = b.speed * sdt;
      if (d <= step + 0.05) {
        b.x = b.tx; b.y = b.ty; b.done = true;
        if (b.hit && b.target && !b.target.dead) {
          this.hurt(b.target, b.dmg, b.sourceName, b);
        } else {
          this.spawnParticles('dust', b.tx, b.ty, 2, { spread: 0.2 });
        }
      } else {
        b.x += (dx / d) * step;
        b.y += (dy / d) * step;
      }
    }
    if (this.projectiles.length > 60) this.projectiles = this.projectiles.filter((b) => !b.done);
    else if (this.projectiles.some((b) => b.done)) this.projectiles = this.projectiles.filter((b) => !b.done);
  }

  updateParticles(sdt) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= sdt;
      if (p.life <= 0) { this.particles.splice(i, 1); continue; }
      p.x += p.vx * sdt;
      p.y += p.vy * sdt;
      p.vx *= 0.985;
      p.vy = p.vy * 0.985 + (p.grav || 0) * sdt;
      p.rot += p.spin * sdt;
    }
    for (let i = this.floaters.length - 1; i >= 0; i--) {
      const f = this.floaters[i];
      f.life -= sdt;
      f.y -= sdt * 0.55;
      if (f.life <= 0) this.floaters.splice(i, 1);
    }
    for (let i = this.decals.length - 1; i >= 0; i--) {
      this.decals[i].life -= sdt;
      if (this.decals[i].life <= 0) this.decals.splice(i, 1);
    }
  }

  spawnParticles(kind, x, y, n = 4, opts = {}) {
    if (this.particles.length > 900) return;
    const spread = opts.spread ?? 0.5;
    for (let i = 0; i < n; i++) {
      const a = this.rng() * Math.PI * 2;
      const sp = (0.2 + this.rng() * 0.9) * spread;
      let vx = Math.cos(a) * sp, vy = Math.sin(a) * sp;
      let grav = 0, life = 0.5 + this.rng() * 0.7, size = 2 + this.rng() * 2;
      if (kind === 'smoke') { vx = (this.rng() - 0.5) * 0.2; vy = -0.35 - this.rng() * 0.4; grav = 0; life = 1.6 + this.rng(); size = 3 + this.rng() * 4; }
      if (kind === 'dust') { vy -= 0.2; grav = 0.3; }
      if (kind === 'spark') { grav = 2.4; life = 0.25 + this.rng() * 0.35; size = 1.5; }
      if (kind === 'blood') { grav = 2.8; life = 0.5 + this.rng() * 0.5; }
      if (kind === 'leaf') { grav = 0.25; life = 1.5 + this.rng(); vx *= 1.6; vy *= 0.6; }
      if (kind === 'heal') { vy = -0.5 - this.rng() * 0.5; life = 0.8 + this.rng() * 0.6; }
      this.particles.push({
        kind, x: x + (this.rng() - 0.5) * 0.3, y: y + (this.rng() - 0.5) * 0.2,
        vx, vy, life, max: life, size, rot: this.rng() * 6.28, spin: (this.rng() - 0.5) * 5, grav,
        color: opts.color || null,
      });
    }
    if (this.particles.length > 1200) this.particles.splice(0, this.particles.length - 1000);
  }

  addFloater(text, x, y, color = '#e8e0cd') {
    this.floaters.push({ text, x, y, color, life: 1.5, max: 1.5 });
  }
  addDecal(kind, x, y, opts = {}) {
    if (this.decals.length > 160) this.decals.shift();
    this.decals.push({ kind, x, y, rot: this.rng() * 6.28, size: opts.size || 0.4 + this.rng() * 0.35, life: 80 + this.rng() * 40, max: 120, color: opts.color });
  }

  // ---------------------------------------------------------------- combat
  shoot(shooter, target, opts = {}) {
    if (!shooter || !target || target.dead) return false;
    const isObj = !!shooter.def;
    const sx = isObj ? shooter.x + shooter.w / 2 : shooter.x;
    const sy = isObj ? shooter.y + shooter.h / 2 : shooter.y;
    const wep = WEAPONS[shooter.weapon] || WEAPONS.pistol;
    const kind = opts.kind || wep.kind;
    const dmg = opts.dmg ?? wep.dmg;
    const range = opts.range ?? wep.range;
    const d = dist(sx, sy, target.x, target.y);
    let acc = (opts.acc ?? wep.acc) + (isObj ? 0 : (shooter.skills?.shooting || 0) * 0.02) - d / (range * 4.2);
    if (!isObj && shooter.traitIds?.includes('trigger')) acc -= 0.07;
    if (target.downed) acc = Math.min(0.98, acc + 0.25);
    if (this.weather === 'rain') acc -= 0.04;
    if (this.weather === 'fog') acc -= 0.06;
    if (target.cover > 0) acc -= target.cover * 0.22;
    acc = clamp(acc, 0.1, 0.95);
    const hit = this.rng() < acc;
    const spread = (1 - acc) * 2.2;
    let tx = target.x, ty = target.y;
    if (!hit) { tx += (this.rng() - 0.5) * spread; ty += (this.rng() - 0.5) * spread; }
    this.projectiles.push({
      x: sx, y: sy, px: sx, py: sy, tx, ty, speed: kind === 'shotgun' ? 24 : kind === 'turret' ? 32 : 30,
      target, hit, dmg, sourceName: isObj ? 'a gun turret' : shooter.name, kind, tracer: opts.tracer || 'warm',
      life: 1.2, done: false,
    });
    this.spawnParticles('muzzle', sx, sy, 3, { spread: 0.35 });
    if (!isObj) {
      shooter.recoil = 0.18;
      shooter.attackFlash = 0.1;
    } else {
      shooter.flash = 0.1;
    }
    this.play(kind === 'turret' ? 'turret' : 'gunshot', { distance: 1 });
    return true;
  }

  melee(attacker, target) {
    if (!attacker || !target || target.dead) return;
    const skill = attacker.skills?.melee || 3;
    let dmg = (WEAPONS[attacker.weapon]?.dmg || 8) + skill * 0.7;
    if (attacker.traitIds?.includes('brawler')) dmg *= 1.2;
    this.spawnParticles('blood', target.x, target.y - 0.3, 5, { spread: 0.45 });
    this.play('melee');
    this.hurt(target, dmg, attacker.name, { melee: true });
    attacker.attackFlash = 0.16;
  }

  hurt(target, dmg, sourceName, shot = {}) {
    if (!target || target.dead) return;
    target.hp -= dmg;
    target.flash = 0.22;
    target.lastHurt = this.animTime;
    if (target.kind === 'animal' || target.kind === 'colonist' || target.kind === 'raider') {
      this.spawnParticles('blood', target.x, target.y - 0.25, 4, { spread: 0.45 });
      if (this.rng() < 0.65) this.addDecal('blood', target.x + (this.rng() - 0.5) * 0.6, target.y + (this.rng() - 0.5) * 0.6);
      else this.addDecal('blood', target.x + (this.rng() - 0.5) * 0.8, target.y + (this.rng() - 0.5) * 0.8);
    }
    if (target.kind === 'colonist') {
      target.bleed = (target.bleed || 0) + 0.4 + dmg * 0.02;
    }
    if (target.hp <= 0) {
      this.killPawn(target, sourceName);
    } else if (target.hp < target.maxHp * 0.25 && !target.downed) {
      target.downed = true;
      target.drafted = false;
      target.task = null;
      target.path = [];
      if (target.kind === 'colonist') {
        this.notice('bad', `${target.name} is down!`, `${target.name} collapsed from their wounds. A doctor can tend them.`);
      }
    }
  }

  killPawn(pawn, sourceName) {
    if (pawn.dead) return;
    pawn.dead = true;
    pawn.deadAt = this.animTime;
    pawn.downed = false;
    pawn.drafted = false;
    pawn.task = null;
    pawn.path = [];
    this.addDecal('blood', pawn.x, pawn.y, { size: 0.8 });
    this.spawnParticles('blood', pawn.x, pawn.y, 10, { spread: 0.7 });
    if (pawn.kind === 'colonist') {
      this.stats.colonistsLost++;
      this.notice('bad', `${pawn.name} has died`, `${pawn.name} was killed ${sourceName ? `by ${sourceName}` : 'in the line of duty'}. The colony mourns.`);
      this.play('death');
    } else if (pawn.kind === 'raider') {
      this.stats.kills++;
      this.addItem('silver', 12 + Math.floor(this.rng() * 20), pawn.x, pawn.y);
      this.notice('good', 'Raider down', `${pawn.name} has been killed.`);
    } else if (pawn.kind === 'animal') {
      this.addItem('meat', Math.round(pawn.def.meat * 0.7), pawn.x, pawn.y);
    }
  }

  // ---------------------------------------------------------------- research
  hasTech(id) { return this.techs.has(id); }
  addResearch(points) {
    const r = this.research;
    if (!r.active) return;
    const tech = TECH[r.active];
    if (!tech) return;
    r.progress[r.active] = (r.progress[r.active] || 0) + points;
    if (r.progress[r.active] >= tech.cost) {
      this.techs.add(r.active);
      this.notice('tech', 'Research complete', `${tech.name} is finished. ${tech.unlocks ? 'New structures are available in the build menu.' : 'The colony reaps the benefits.'}`);
      this.play('research');
      this.emit('tech', r.active);
      r.active = r.queue.find((id) => !this.techs.has(id)) || null;
      this.recomputeWealth();
    }
  }
  setResearch(id) {
    if (this.techs.has(id) || !TECH[id]) return;
    this.research.active = id;
    this.emit('research', id);
  }
  researchPct(id) {
    const cost = TECH[id]?.cost || 1;
    return clamp((this.research.progress[id] || 0) / cost, 0, 1);
  }

  // ---------------------------------------------------------------- events
  scheduleInitialEvents() {
    const t = this.absHours();
    this.nextRaidAt = t + 12.5;
    this.events.push({ at: t + 4.0, type: 'cargo', done: false });
    this.events.push({ at: t + 26.5, type: 'wanderer', done: false });
    this.events.push({ at: t + 33, type: 'eclipse', done: false });
  }
  updateEvents() {
    const now = this.absHours();
    for (const ev of this.events) {
      if (!ev.done && ev.at <= now) {
        ev.done = true;
        if (ev.type === 'cargo') this.eventCargo();
        else if (ev.type === 'wanderer') this.eventWanderer();
        else if (ev.type === 'eclipse') this.eventEclipse();
      }
    }
    this.events = this.events.filter((e) => !e.done);
  }
  eventCargo() {
    const cx = 30 + Math.round((this.rng() - 0.5) * 10);
    const cy = 34 + Math.round((this.rng() - 0.5) * 8);
    const spot = this.nearestWalkable(cx, cy);
    const drops = [['steel', 28], ['silver', 85], ['meal', 8], ['grain', 24]];
    drops.forEach(([type, qty], i) => {
      const s = this.nearestWalkable(spot.x + (i % 2) * 2 - 1, spot.y + Math.floor(i / 2) * 2 - 1);
      this.addItem(type, qty, s.x, s.y);
      this.spawnParticles('spark', s.x + 0.5, s.y + 0.5, 8, { spread: 1 });
      this.spawnParticles('smoke', s.x + 0.5, s.y + 0.5, 6, { spread: 0.5 });
      this.addDecal('scorch', s.x + 0.5, s.y + 0.5, { size: 0.7 });
    });
    this.notice('good', 'Cargo pods', 'Cargo pods crash-land near the colony, scattering supplies across the grass. Haulers will gather what they can.');
    this.play('crash');
  }
  eventWanderer() {
    const p = this.spawnColonist({
      x: 2, y: 30 + Math.round((this.rng() - 0.5) * 6), name: pick(this.rng, FIRST_NAMES),
      weapon: 'pistol', wanderer: true,
    });
    if (!p) return;
    const dest = this.nearestWalkable(30, 34);
    p.beginTask({ type: 'move', x: dest.x, y: dest.y });
    this.notice('good', 'Wanderer joins', `${p.name} has wandered into the colony, ragged but hopeful. They have joined as a colonist.`);
    this.play('chime');
  }
  eventEclipse() {
    this.eclipse = 4.5;
    this.notice('info', 'Eclipse', 'The sun dims behind an unnatural shadow. Crops slow and colonists grow uneasy.');
    this.play('eclipse');
  }

  spawnRaid() {
    const day = this.day;
    const count = clamp(3 + Math.floor(day / 2) + Math.floor(this.wealth / 3000), 3, 8);
    const fromEast = this.rng() < 0.55;
    const edge = fromEast ? this.W - 2 : 1;
    const baseY = 20 + Math.round((this.rng() - 0.5) * 16);
    const attackers = [];
    for (let i = 0; i < count; i++) {
      const y = clamp(baseY + Math.round((this.rng() - 0.5) * 8) + (i - count / 2) * 0.8, 4, this.H - 5);
      let x = edge;
      let tries = 0;
      while (!this.isWalkable(x, Math.round(y)) && tries < 20) { x += fromEast ? -1 : 1; tries++; }
      const look = RAIDERS[(this.rng() * RAIDERS.length) | 0];
      const weaponRoll = this.rng();
      const weapon = weaponRoll < 0.45 ? 'pistol' : weaponRoll < 0.75 ? 'knife' : weaponRoll < 0.92 ? 'club' : 'rifle';
      const p = new Pawn(this, {
        kind: 'raider', x: x + 0.5, y: y + 0.5, name: pick(this.rng, FIRST_NAMES) + (this.rng() < 0.4 ? ` ${pick(this.rng, NICKNAMES)}` : ''),
        weapon, hp: 75 + Math.round(this.rng() * 30), skills: { shooting: 3 + Math.round(this.rng() * 4), melee: 3 + Math.round(this.rng() * 4) },
        appearance: { skin: look.skin, shirt: look.shirt, pants: look.pants, hair: '#2a211c', hairStyle: pick(this.rng, ['bald', 'mohawk', 'short', 'hood']), mask: look.mask },
        traitIds: [],
      });
      p.faction = 'raider';
      this.pawns.push(p);
      attackers.push(p);
    }
    this.raid = { attackers, start: this.animTime, active: true };
    const dir = fromEast ? 'east' : 'west';
    this.notice('raid', 'RAID', `Pirates are approaching from the ${dir}. ${count} raiders are moving on the colony.`, { sticky: true });
    this.emit('raid', { from: dir, count });
    this.play('alarm');
    for (const p of this.pawns) {
      if (p.kind !== 'colonist' || p.dead || p.downed) continue;
      p.wake();
      p.task = null;
      p.path = [];
      p.alarm = true;
    }
    this.nextRaidAt = this.absHours() + 28 + this.rng() * 20;
  }
  updateRaid() {
    if (!this.raid) return;
    const living = this.raid.attackers.filter((p) => !p.dead && !p.downed);
    if (!living.length) {
      this.raid.active = false;
      this.notice('good', 'Raid repelled', 'The last raider has fallen. The colony is safe, for now. Everyone breathes a little easier.');
      this.emit('raidEnd', {});
      this.play('chime');
      this.raid = null;
    }
  }
  nearestColonist(x, y, aliveOnly = true) {
    let best = null, bd = Infinity;
    for (const p of this.pawns) {
      if (p.kind !== 'colonist' || p.dead) continue;
      if (aliveOnly && p.downed) continue;
      const d = dist(x, y, p.x, p.y);
      if (d < bd) { bd = d; best = p; }
    }
    return best;
  }
  nearestRaider(x, y) {
    if (!this.raid) return null;
    let best = null, bd = Infinity;
    for (const p of this.raid.attackers) {
      if (p.dead || p.downed) continue;
      const d = dist(x, y, p.x, p.y);
      if (d < bd) { bd = d; best = p; }
    }
    return best;
  }

  recomputeWealth() {
    let w = 0;
    for (const i of this.items) if (!i.dead) w += i.qty * (ITEMS[i.type]?.value || 1);
    for (const o of this.objects) if (!o.dead) w += (o.def.cost ? Object.values(o.def.cost).reduce((a, b) => a + b, 0) : 4) * 2.2;
    for (const p of this.pawns) if (p.kind === 'colonist' && !p.dead) w += 320;
    this.wealth = Math.round(w);
    this.emit('wealth', this.wealth);
  }

  // ---------------------------------------------------------------- jobs
  findJob(pawn) {
    if (pawn.dead || pawn.downed || pawn.drafted) return null;

    // Critical needs come before any work.
    if (pawn.needs.food < (pawn.traitIds.includes('gourmand') ? 36 : 30)) {
      const food = this.findFoodItem(pawn);
      if (food) return { type: 'eat', itemId: food.id };
    }
    if (pawn.needs.rest < 24) {
      const bed = this.findFreeBed(pawn);
      return bed ? { type: 'sleep', objId: bed.id } : { type: 'sleep', ground: true };
    }

    // Designated hunts are handled by armed colonists before ordinary work.
    if (pawn.weapon && WEAPONS[pawn.weapon]?.ranged && this.designations.hunt.size) {
      const best = this.nearestDesignatedAnimal(pawn);
      if (best) return { type: 'hunt', targetId: best.id };
    }

    const order = ['doctor', 'construction', 'mining', 'plants', 'cooking', 'hauling', 'research'];
    for (let pr = 1; pr <= 4; pr++) {
      for (const work of order) {
        if (pawn.priorities[work] !== pr) continue;
        let job = null;
        if (work === 'doctor') job = this.jobDoctor(pawn);
        else if (work === 'construction') job = this.jobConstruction(pawn);
        else if (work === 'mining') job = this.jobMining(pawn);
        else if (work === 'plants') job = this.jobPlants(pawn);
        else if (work === 'cooking') job = this.jobCooking(pawn);
        else if (work === 'hauling') job = this.jobHauling(pawn);
        else if (work === 'research') job = this.jobResearch(pawn);
        if (job) return job;
      }
    }
    return null;
  }

  nearestDesignatedAnimal(pawn) {
    let best = null, bd = Infinity;
    for (const id of this.designations.hunt) {
      const a = this.pawnById(id);
      if (!a || a.dead || a.kind !== 'animal' || a.huntReservedBy) continue;
      const d = dist2(pawn.x, pawn.y, a.x, a.y);
      if (d < bd) { bd = d; best = a; }
    }
    return best;
  }

  jobDoctor(pawn) {
    for (const p of this.pawns) {
      if (p === pawn || p.dead || p.kind !== 'colonist' || p.medicalReservedBy) continue;
      if (p.hp < p.maxHp * 0.88 || p.bleed > 0) return { type: 'tend', targetId: p.id };
    }
    return null;
  }

  jobConstruction(pawn) {
    for (const id of this.designations.deconstruct) {
      const o = this.objectById(id);
      if (o && !o.dead && o.built && !o.reservedBy) return { type: 'deconstruct', objId: o.id };
    }
    let best = null, bd = Infinity;
    for (const o of this.objects) {
      if (o.dead || o.built || o.reservedBy) continue;
      if (o.def.tech && !this.techs.has(o.def.tech)) continue;
      const d = dist2(pawn.x, pawn.y, o.x, o.y);
      if (d < bd) { bd = d; best = o; }
    }
    return best ? { type: 'build', objId: best.id } : null;
  }

  jobMining(pawn) {
    let best = null, bd = Infinity;
    for (const id of this.designations.mine) {
      const o = this.objectById(id);
      if (!o || o.dead || !o.def.minable || o.reservedBy) continue;
      const d = dist2(pawn.x, pawn.y, o.x, o.y);
      if (d < bd) { bd = d; best = o; }
    }
    return best ? { type: 'mine', objId: best.id } : null;
  }

  jobPlants(pawn) {
    if (!this.growTiles.size) return null;
    let harvest = null, hd = Infinity;
    let plant = null, pd = Infinity;
    for (const key of this.growTiles) {
      if (this.cropReserved.has(key)) continue;
      const x = key % this.W, y = (key / this.W) | 0;
      if (this.objectAt(x, y)?.def.blocks) continue;
      if (this.cropPlanted[key] && this.crops[key] >= 1) {
        const d = dist2(pawn.x, pawn.y, x, y);
        if (d < hd) { hd = d; harvest = { x, y }; }
      } else if (!this.cropPlanted[key]) {
        const d = dist2(pawn.x, pawn.y, x, y);
        if (d < pd) { pd = d; plant = { x, y }; }
      }
    }
    if (harvest) return { type: 'harvest', x: harvest.x, y: harvest.y };
    if (plant) return { type: 'plant', x: plant.x, y: plant.y };
    return null;
  }

  jobCooking(pawn) {
    if (this.countItem('meal') >= 14) return null;
    if (this.countItem('grain') + this.countItem('meat') < 5) return null;
    let stove = null;
    for (const o of this.objects) {
      if (o.dead || !o.built || !o.def.stove || o.reservedBy) continue;
      stove = o; break;
    }
    return stove ? { type: 'cook', objId: stove.id } : null;
  }

  jobHauling(pawn) {
    if (!this.stockpileTiles.size) return null;
    let best = null, bd = Infinity;
    for (const item of this.items) {
      if (item.dead || item.reservedBy) continue;
      if (this.isStockpileAt(item.x, item.y)) continue;
      if (this.objectAt(item.x, item.y)?.def.blocks) continue;
      const d = dist2(pawn.x, pawn.y, item.x, item.y);
      if (d < bd) { bd = d; best = item; }
    }
    return best ? { type: 'haul', itemId: best.id } : null;
  }

  jobResearch(pawn) {
    if (!this.research.active) return null;
    for (const o of this.objects) {
      if (o.dead || !o.built || !o.def.research || o.reservedBy) continue;
      return { type: 'research', objId: o.id };
    }
    return null;
  }

  findFreeBed(pawn) {
    let best = null, bd = Infinity;
    for (const o of this.objects) {
      if (o.dead || !o.built || !o.def.bed || o.reservedBy) continue;
      const d = dist2(pawn.x, pawn.y, o.x, o.y);
      if (d < bd) { bd = d; best = o; }
    }
    return best;
  }

  findFreeSeat(pawn) {
    let best = null, bd = Infinity;
    for (const o of this.objects) {
      if (o.dead || !o.built || !o.def.seat || o.seatReservedBy) continue;
      const nearTable = this.objects.some((t) => t.def.table && !t.dead && dist(t.x, t.y, o.x, o.y) < 2.3);
      if (!nearTable) continue;
      const d = dist2(pawn.x, pawn.y, o.x, o.y);
      if (d < bd) { bd = d; best = o; }
    }
    return best;
  }

  reserveCrop(x, y, pawnId) { this.cropReserved.set(this.idx(x, y), pawnId); }
  releaseCrop(x, y) { this.cropReserved.delete(this.idx(x, y)); }

  coverAt(x, y) {
    const tx = Math.floor(x), ty = Math.floor(y);
    let cover = 0;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const o = this.objectAt(tx + dx, ty + dy);
        if (o && !o.dead && o.built && o.def.cover) cover = Math.max(cover, o.def.cover);
      }
    }
    return cover;
  }

  canPlaceAt(type, x, y, rot = 0) {
    const def = BUILDINGS[type];
    if (!def) return false;
    if (def.tech && !this.hasTech(def.tech)) return false;
    const w = rot % 180 === 90 ? def.h : def.w;
    const h = rot % 180 === 90 ? def.w : def.h;
    for (let yy = y; yy < y + h; yy++) {
      for (let xx = x; xx < x + w; xx++) {
        if (!this.inBounds(xx, yy)) return false;
        const t = this.terrain[this.idx(xx, yy)];
        if (t === T.water) return false;
        const o = this.objectAt(xx, yy);
        if (o && !o.dead) {
          if (def.floor) return false;
          if (!o.nature && o.type === type && !o.built) continue;
          return false;
        }
      }
    }
    return true;
  }

  canAfford(type) {
    const def = BUILDINGS[type];
    if (!def) return false;
    for (const [k, v] of Object.entries(def.cost || {})) if (this.countItem(k) < v) return false;
    return true;
  }

  missingFor(type) {
    const def = BUILDINGS[type] || {};
    const out = [];
    for (const [k, v] of Object.entries(def.cost || {})) {
      const have = this.countItem(k);
      if (have < v) out.push({ type: k, need: v - have });
    }
    return out;
  }

  spend(type) {
    const def = BUILDINGS[type];
    if (!def) return false;
    for (const [k, v] of Object.entries(def.cost || {})) if (this.countItem(k) < v) return false;
    for (const [k, v] of Object.entries(def.cost || {})) this.consume(k, v);
    return true;
  }

  queueBuild(type, x, y, rot = 0) {
    if (!this.canPlaceAt(type, x, y, rot)) return { ok: false, reason: 'blocked' };
    if (!this.canAfford(type)) return { ok: false, reason: 'resources', missing: this.missingFor(type) };
    const def = BUILDINGS[type];
    if (def.floor) {
      const w = rot % 180 === 90 ? def.h : def.w;
      const h = rot % 180 === 90 ? def.w : def.h;
      let any = false;
      for (let yy = y; yy < y + h; yy++) for (let xx = x; xx < x + w; xx++) {
        if (this.terrain[this.idx(xx, yy)] === (type === 'stonefloor' ? T.stonefloor : T.woodfloor)) continue;
        if (this.objectAt(xx, yy)) continue;
        any = true;
      }
      if (!any) return { ok: false, reason: 'floor' };
    }
    this.spend(type);
    const obj = this.place(type, x, y, { built: false, rot });
    if (!obj) return { ok: false, reason: 'blocked' };
    obj.work = 0;
    this.notice('info', 'Blueprint placed', `${def.name} marked for construction.`);
    return { ok: true, obj };
  }

  cancelBuild(obj, refund = true) {
    if (!obj || obj.dead || obj.built) return false;
    if (refund) {
      const spot = this.nearestWalkable(obj.x, obj.y);
      for (const [k, v] of Object.entries(obj.def.cost || {})) {
        this.addItem(k, Math.max(1, Math.ceil(v * 0.6)), spot.x, spot.y, { particles: false });
      }
    }
    this.removeObject(obj);
    return true;
  }

  designate(kind, x0, y0, x1, y1) {
    const set = this.designations[kind];
    if (!set) return 0;
    let n = 0;
    const ax = Math.min(x0, x1), bx = Math.max(x0, x1);
    const ay = Math.min(y0, y1), by = Math.max(y0, y1);
    for (let y = ay; y <= by; y++) {
      for (let x = ax; x <= bx; x++) {
        if (!this.inBounds(x, y)) continue;
        const o = this.objectAt(x, y);
        if (kind === 'chop') {
          if (!o || !o.nature || !o.def.choppable) continue;
        } else if (kind === 'mine') {
          if (!o || !o.nature || !o.def.minable) continue;
        } else if (kind === 'deconstruct') {
          if (!o || !o.built || o.nature) continue;
        } else if (kind === 'hunt') {
          continue;
        }
        set.add(o.id);
        n++;
      }
    }
    if (n) this.play('click');
    return n;
  }

  designateHunt(pawnId, on = true) {
    const p = this.pawnById(pawnId);
    if (!p || p.kind !== 'animal') return false;
    if (on) this.designations.hunt.add(p.id); else this.designations.hunt.delete(p.id);
    return true;
  }

  clearDesignations() {
    for (const set of Object.values(this.designations)) set.clear();
  }

  // ---------------------------------------------------------------- creation helpers
  placeNature(type, x, y, def) {
    if (!this.inBounds(x, y)) return null;
    if (this.objectAt(x, y)) return null;
    if (this.terrain[this.idx(x, y)] === T.water) return null;
    const obj = {
      id: this.nextId++, type, def, x, y, w: 1, h: 1, rot: 0,
      built: true, hp: def.hp, maxHp: def.hp, work: 0, workNeeded: def.work || 2,
      seed: (Math.random() * 1e9) | 0, reservedBy: null, angle: 0, cooldown: 0, open: 0,
      flash: 0, fell: 0, creation: this.animTime, dead: false, nature: true,
    };
    this.objects.push(obj);
    this.objectsById.set(obj.id, obj);
    this.fillGrid(obj, obj.id);
    return obj;
  }

  spawnColonist(opts = {}) {
    const used = new Set(this.pawns.filter((p) => p.kind === 'colonist').map((p) => p.name.split(' ')[0]));
    let name = opts.name;
    if (!name) {
      const pool = FIRST_NAMES.filter((n) => !used.has(n));
      name = pool.length ? pick(this.rng, pool) : pick(this.rng, FIRST_NAMES) + ' II';
      if (this.rng() < 0.28) name += ` ${pick(this.rng, NICKNAMES)}`;
    }
    const p = new Pawn(this, {
      kind: 'colonist', name, x: opts.x ?? 30, y: opts.y ?? 34,
      weapon: opts.weapon || pick(this.rng, ['pistol', 'rifle', 'shotgun', 'knife']),
      skills: opts.skills, traits: opts.traits,
      appearance: opts.appearance, priorities: opts.priorities,
      hp: opts.hp,
    });
    this.pawns.push(p);
    return p;
  }

  // ---------------------------------------------------------------- generation bridge
  generate() { generateMap(this); }
  populate() { populateWorld(this); }

  // __WORLD_JOBS__
}

// Minimal binary heap (kept local to avoid another import in the hot path).
class MinHeap {
  constructor() { this.k = []; this.v = []; }
  get size() { return this.k.length; }
  push(key, val) {
    const k = this.k, v = this.v;
    let i = k.length;
    k.push(key); v.push(val);
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (k[p] <= key) break;
      k[i] = k[p]; v[i] = v[p]; i = p;
    }
    k[i] = key; v[i] = val;
  }
  pop() {
    const k = this.k, v = this.v;
    if (!k.length) return null;
    const topV = v[0], topK = k[0];
    const lastK = k.pop(), lastV = v.pop();
    if (k.length) {
      let i = 0;
      const n = k.length;
      while (true) {
        let c = i * 2 + 1;
        if (c >= n) break;
        if (c + 1 < n && k[c + 1] < k[c]) c++;
        if (k[c] >= lastK) break;
        k[i] = k[c]; v[i] = v[c]; i = c;
      }
      k[i] = lastK; v[i] = lastV;
    }
    return { key: topK, val: topV };
  }
}

function dist2(x1, y1, x2, y2) { return (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1); }
