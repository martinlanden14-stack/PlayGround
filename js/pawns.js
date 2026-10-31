/* OUTLAND — colonists, raiders, needs, jobs & combat */
import {
  findPath, key, dist, clamp, lerp, lineClear, TAU, nearestWalkable, RNG,
} from './utils.js';
import { BUILDINGS, JOB_LABELS } from './data.js';

let PAWN_SEQ = 1;

export class Pawn {
  constructor(game, opts = {}) {
    this.game = game;
    this.id = opts.id || 'p' + (PAWN_SEQ++);
    this.isRaider = !!opts.isRaider;
    this.name = opts.name || (this.isRaider ? 'Raider' : 'Colonist');
    this.x = opts.x ?? 0;
    this.y = opts.y ?? 0;
    this.path = [];
    this.facing = opts.facing || 1;
    this.walkPhase = Math.random() * TAU;
    this.animT = Math.random() * 10;
    this.moving = false;
    this.speed = this.isRaider ? 1.82 : 2.06;
    this.maxHp = opts.maxHp ?? (this.isRaider ? 56 : 82);
    this.hp = opts.hp ?? this.maxHp;
    this.skills = opts.skills || { work: 2, mining: 2, cooking: 2, farming: 2, combat: 2, research: 2 };
    this.traits = opts.traits || [];
    this.needs = opts.needs || { hunger: 78 + Math.random() * 14, rest: 82 + Math.random() * 14, mood: 76 };
    this.moodBoost = 0;
    this.job = null;
    this.claimKey = null;
    this.thinkTimer = Math.random() * 0.4;
    this.threatTimer = Math.random() * 0.4;
    this.attackCd = 0.5 + Math.random();
    this.workAnim = 0;
    this.action = 'idle';
    this.actionT = 0;
    this.sleeping = false;
    this.sleepGround = false;
    this.downed = false;
    this.dead = false;
    this.deadTimer = 0;
    this.recoverTimer = 0;
    this.carried = null;
    this.drafted = false;
    this.targetPawn = null;
    this.wanderWait = 0;
    this.failed = new Map();
    this.dragMark = 0;
    this.isColonist = !this.isRaider;

    // appearance
    this.skin = opts.skin || '#d3a278';
    this.hair = opts.hair || '#3b2a20';
    this.shirt = opts.shirt || (this.isRaider ? '#6e3a34' : '#6c8a9c');
    this.pants = opts.pants || (this.isRaider ? '#38332f' : '#3f4853');
    this.hairStyle = opts.hairStyle ?? ((Math.random() * 4) | 0);
    this.bodyScale = opts.bodyScale || (0.94 + Math.random() * 0.12);
    this.weapon = opts.weapon || (this.isRaider ? 'blade' : 'rifle');
    this.bandana = this.isRaider;
  }

  get tileX() { return Math.floor(this.x); }
  get tileY() { return Math.floor(this.y); }
  get jobLabel() { return JOB_LABELS[this.job?.type] || (this.sleeping ? 'Sleeping' : 'Idle'); }
  trait(id) { return this.traits.some(t => t.id === id); }

  speedMult() {
    let m = 1;
    if (this.trait('quick')) m *= 1.12;
    if (this.game.hasTech('logistics') && !this.isRaider) m *= 1.12;
    let mood = 0.92 + (this.needs.mood / 100) * 0.16;
    return m * mood;
  }

  skill(id) {
    let v = this.skills[id] || 0;
    if (id === 'farming' && this.trait('greenthumb')) v *= 1.3;
    if (id === 'combat' && this.trait('sharpshooter')) v *= 1.3;
    if (id === 'cooking' && this.trait('gourmet')) v *= 1.3;
    return v;
  }

  /* ---------------- core update ---------------- */
  update(dt) {
    const g = this.game;
    this.animT += dt;
    if (this.dead) { this.deadTimer += dt; return; }
    if (this.downed) {
      this.moving = false;
      this.recoverTimer -= dt;
      const danger = g.raiders.some(r => !r.dead && !r.downed && dist(r.x, r.y, this.x, this.y) < 8);
      if (this.recoverTimer <= 0 && !danger) {
        this.downed = false;
        this.hp = Math.max(20, this.maxHp * 0.42);
        this.action = 'idle';
        this.failed.clear();
        g.toast(`${this.name} is back on their feet.`, 'good');
        g.audio.sfx('wake');
      }
      return;
    }

    this.updateNeeds(dt, g);
    this.attackCd = Math.max(0, this.attackCd - dt);
    this.actionT = Math.max(0, this.actionT - dt);
    this.thinkTimer -= dt;
    this.threatTimer -= dt;

    if (this.hp <= 0) { this.goDown(g); return; }

    // wake / react to threats
    if (this.threatTimer <= 0) {
      this.threatTimer = 0.42;
      if (this.isColonist) {
        const radius = this.drafted ? 15 : 7.4;
        const enemy = this.findEnemy(radius);
        if (enemy && this.job?.type !== 'fight') {
          if (this.sleeping && dist(enemy.x, enemy.y, this.x, this.y) < 4.2) this.wake();
          this.startFight(enemy);
        } else if (this.job?.type === 'fight' && (!this.targetPawn || this.targetPawn.dead || this.targetPawn.downed)) {
          this.targetPawn = null;
          this.clearJob();
        }
        if (this.job && this.job.type !== 'fight' && this.job.type !== 'sleep' && this.job.type !== 'eat') {
          if (this.needs.hunger < 12 || this.needs.rest < 9) { this.clearJob(); this.thinkTimer = 0; }
        }
      }
    }

    if (!this.job) {
      if (this.thinkTimer <= 0) { this.thinkTimer = 0.35 + Math.random() * 0.25; this.think(); }
    } else {
      this.runJob(dt);
    }

    this.step(dt);
    if (this.moving) this.actionT = Math.max(this.actionT, 0.05);
  }

  updateNeeds(dt, g) {
    const night = g.isNight();
    if (this.sleeping) {
      const restRate = (7.2 / (this.trait('heavy') ? 1.22 : this.trait('nightowl') ? 1.05 : 1));
      this.needs.rest = Math.min(100, this.needs.rest + dt * restRate);
      this.needs.hunger = Math.max(0, this.needs.hunger - dt * 0.035);
    } else {
      this.needs.hunger = Math.max(0, this.needs.hunger - dt * 0.115);
      this.needs.rest = Math.max(0, this.needs.rest - dt * (night ? 0.118 : 0.075) * (this.trait('nightowl') ? 0.8 : 1));
    }
    if (this.needs.hunger <= 0) this.hp -= dt * 1.1;
    if (!this.sleeping && this.hp < this.maxHp && this.needs.hunger > 35 && this.needs.rest > 25) {
      this.hp = Math.min(this.maxHp, this.hp + dt * 0.16);
    }
    if (this.isColonist) {
      let target = 66 + this.moodBoost;
      if (this.trait('optimist')) target += 8;
      if (this.trait('gloomy')) target -= 8;
      if (this.needs.hunger > 45) target += 5; else if (this.needs.hunger < 20) target -= 22;
      if (this.needs.rest > 45) target += 5; else if (this.needs.rest < 20) target -= 17;
      if (g.raidActive) target -= 9;
      if (night) target -= 2;
      if (this.sleeping) target += 5;
      if (!g.world.beds().length) target -= 4;
      this.needs.mood += (clamp(target, 2, 100) - this.needs.mood) * Math.min(1, dt * 0.22);
    }
    this.moodBoost *= Math.max(0, 1 - dt * 0.03);
  }

  step(dt) {
    if (!this.path.length) { this.moving = false; return; }
    const p = this.path[0];
    const tx = p.x + 0.5, ty = p.y + 0.5;
    let dx = tx - this.x, dy = ty - this.y;
    let d = Math.hypot(dx, dy);
    let move = this.speed * this.speedMult() * dt;
    if (d <= move || d < 0.001) {
      this.x = tx; this.y = ty;
      this.path.shift();
      if (!this.path.length) this.moving = false;
    } else {
      this.x += (dx / d) * move;
      this.y += (dy / d) * move;
      if (Math.abs(dx) > 0.02) this.facing = dx > 0 ? 1 : -1;
      this.walkPhase += move * 6.5;
      this.moving = true;
      if (this.isColonist && Math.random() < dt * 1.4) {
        this.game.addParticle({ type: 'dust', x: this.x + (Math.random() - .5) * .3, y: this.y + .2, vx: (Math.random() - .5) * .3, vy: -0.1, life: 0.7, size: 2.5 + Math.random() * 2 });
      }
    }
    this.openNearbyDoors();
  }

  openNearbyDoors() {
    const w = this.game.world;
    const cx = Math.floor(this.x), cy = Math.floor(this.y);
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const o = w.objAt(cx + dx, cy + dy);
      if (o && o.kind === 'door') o.target = 1;
    }
  }

  /* ---------------- navigation ---------------- */
  initTravel(job, tx, ty, adjacent = false) {
    const sx = clamp(Math.floor(this.x), 0, this.game.world.w - 1);
    const sy = clamp(Math.floor(this.y), 0, this.game.world.h - 1);
    const keyT = 't' + key(tx, ty);
    if (this.failed.has(keyT) && this.failed.get(keyT) > this.game.time) return false;
    const path = findPath(this.game.world, sx, sy, tx, ty, { adjacent, maxNodes: 15000 });
    if (path === null) {
      this.failed.set(keyT, this.game.time + 9);
      return false;
    }
    this.path = path;
    this.moving = path.length > 0;
    job.tx = tx; job.ty = ty;
    return true;
  }

  atTile(tx, ty, extra = 0.6) {
    return dist(this.x, this.y, tx + 0.5, ty + 0.5) < 1.05 + extra;
  }
  nextTo(tx, ty) {
    return Math.max(Math.abs(Math.floor(this.x) - tx), Math.abs(Math.floor(this.y) - ty)) <= 1
      || dist(this.x, this.y, tx + 0.5, ty + 0.5) < 1.85;
  }

  visitedTarget(job) {
    if (this.path.length) return false;
    return this.atTile(job.tx, job.ty, 0.75) || this.nextTo(job.tx, job.ty);
  }

  /* ---------------- jobs ---------------- */
  claim(k) {
    const g = this.game;
    if (g.claims.has(k) && g.claims.get(k) !== this.id) return false;
    g.claims.set(k, this.id);
    this.claimKey = k;
    return true;
  }
  releaseClaim() {
    if (this.claimKey && this.game.claims.get(this.claimKey) === this.id) this.game.claims.delete(this.claimKey);
    this.claimKey = null;
  }
  clearJob() {
    if (this.job?.type === 'sleep' && this.job.bed) {
      const b = this.job.bed;
      b.sleepers = (b.sleepers || []).filter(id => id !== this.id);
    }
    if (this.job?.bench) this.job.bench.studying = false;
    if (this.job?.item) this.job.item.reserved = null;
    this.releaseClaim();
    this.job = null;
    this.sleeping = false;
    this.targetPawn = null;
    this.action = 'idle';
    this.workAnim = 0;
  }
  wake() {
    if (!this.sleeping) return;
    this.sleeping = false;
    this.action = 'idle';
    if (this.job?.type === 'sleep') this.clearJob();
  }

  think() {
    const g = this.game;
    if (this.isRaider) return this.thinkRaider();
    if (this.sleeping) return;

    const enemy = this.findEnemy(this.drafted ? 15 : 8.5);
    if (enemy) { this.startFight(enemy); return; }

    if (this.needs.hunger < 34) {
      if (this.startEat()) return;
      this.needs.mood = Math.max(0, this.needs.mood - 0.35);
    }
    const night = g.isNight();
    const tiredThreshold = this.trait('nightowl') ? 46 : 62;
    if (this.needs.rest < 22 || (night && this.needs.rest < tiredThreshold && !this.drafted)) {
      if (this.startSleep()) return;
    }
    if (this.drafted) { this.startGuard(); return; }

    if (this.startDesignation()) return;
    if (this.startBuild()) return;
    if (this.startFarm()) return;
    if (this.startRefuel()) return;
    if (this.startCook()) return;
    if (this.startHaul()) return;
    if (this.startResearch()) return;
    this.startWander();
  }

  findEnemy(radius) {
    const list = this.game.raiders;
    let best = null, bd = radius * radius;
    for (const r of list) {
      if (r.dead || r.downed) continue;
      const d = (r.x - this.x) ** 2 + (r.y - this.y) ** 2;
      if (d < bd) { bd = d; best = r; }
    }
    if (best && bd > 36 && !lineClear(this.game.world, this.x, this.y, best.x, best.y)) return null;
    return best;
  }

  startFight(enemy) {
    if (!enemy) return;
    if (this.job?.type === 'fight' && this.targetPawn === enemy) return;
    this.clearJob();
    this.targetPawn = enemy;
    this.job = { type: 'fight', phase: 'fight', repath: 0 };
    this.action = 'aim';
    if (this.sleeping) this.wake();
  }

  startGuard() {
    if (this.job && this.job.type === 'guard') return;
    this.clearJob();
    this.job = { type: 'guard', phase: 'idle' };
    this.action = 'aim';
  }

  /* ---------- designated work ---------- */
  startDesignation() {
    const w = this.game.world;
    let best = null, bestD = Infinity, bestType = null;
    for (const [k, type] of w.designations) {
      const [x, y] = k.split(',').map(Number);
      const cc = this.claimKeyFor(type, x, y);
      if (this.game.claims.has(cc) && this.game.claims.get(cc) !== this.id) continue;
      if (this.failed.has('t' + k) && this.failed.get('t' + k) > this.game.time) continue;
      const d = (x - this.x) ** 2 + (y - this.y) ** 2;
      if (d < bestD) { bestD = d; best = { x, y }; bestType = type; }
    }
    if (!best) return false;
    const { x, y } = best;
    if (bestType === 'chop') {
      const o = w.objAt(x, y);
      if (!o || (o.kind !== 'tree' && o.kind !== 'bush')) { w.clearDesignation(x, y); return false; }
      return this.startChop(o);
    }
    if (bestType === 'mine') {
      const o = w.objAt(x, y);
      return this.startMine(x, y, o);
    }
    if (bestType === 'harvest') {
      const o = w.objAt(x, y);
      if (!o) { w.clearDesignation(x, y); return false; }
      return this.startHarvest(o, true);
    }
    if (bestType === 'deconstruct') {
      const o = w.objAt(x, y);
      if (!o) { w.clearDesignation(x, y); return false; }
      return this.startDeconstruct(o);
    }
    w.clearDesignation(x, y);
    return false;
  }

  claimKeyFor(type, x, y) { return type + ':' + key(x, y); }

  startChop(obj) {
    const k = 'chop:' + key(obj.x, obj.y);
    if (!this.claim(k)) return false;
    const job = { type: 'chop', obj, tx: obj.x, ty: obj.y, phase: 'travel', anim: 0 };
    this.job = job;
    if (!this.initTravel(job, obj.x, obj.y)) { this.clearJob(); return false; }
    this.action = 'chop';
    return true;
  }

  startMine(x, y, obj) {
    const k = 'mine:' + key(x, y);
    if (!this.claim(k)) return false;
    const job = { type: 'mine', obj, tx: x, ty: y, phase: 'travel', progress: 0, duration: obj ? 2.4 : 2.9 };
    this.job = job;
    if (!this.initTravel(job, x, y)) { this.clearJob(); return false; }
    this.action = 'mine';
    return true;
  }

  startHarvest(obj, designated = false) {
    const k = 'harvest:' + key(obj.x, obj.y);
    if (!this.claim(k)) return false;
    const job = { type: 'harvest', obj, tx: obj.x, ty: obj.y, phase: 'travel', progress: 0, designated };
    this.job = job;
    if (!this.initTravel(job, obj.x, obj.y)) { this.clearJob(); return false; }
    this.action = 'farm';
    return true;
  }

  startDeconstruct(obj) {
    const k = 'deconstruct:' + key(obj.x, obj.y);
    if (!this.claim(k)) return false;
    const job = { type: 'deconstruct', obj, tx: obj.x, ty: obj.y, phase: 'travel', hp: obj.hp ?? 100 };
    this.job = job;
    if (!this.initTravel(job, obj.x, obj.y)) { this.clearJob(); return false; }
    this.action = 'build';
    return true;
  }

  /* ---------- construction ---------- */
  startBuild() {
    const w = this.game.world;
    let best = null, bd = Infinity;
    for (const o of w.objs.values()) {
      if (o.kind !== 'blueprint') continue;
      const k = 'build:' + key(o.x, o.y);
      if (this.game.claims.has(k) && this.game.claims.get(k) !== this.id) continue;
      if (this.failed.has('t' + key(o.x, o.y)) && this.failed.get('t' + key(o.x, o.y)) > this.game.time) continue;
      const d = (o.x - this.x) ** 2 + (o.y - this.y) ** 2;
      if (d < bd) { bd = d; best = o; }
    }
    if (!best) return false;
    const k = 'build:' + key(best.x, best.y);
    if (!this.claim(k)) return false;
    const job = { type: 'build', obj: best, tx: best.x, ty: best.y, phase: 'travel', progress: best.progress || 0 };
    this.job = job;
    if (!this.initTravel(job, best.x, best.y, true)) { this.clearJob(); return false; }
    this.action = 'build';
    return true;
  }

  /* ---------- farming ---------- */
  startFarm() {
    const w = this.game.world;
    let best = null, bd = Infinity, mode = null;
    for (let y = 0; y < w.h; y++) {
      for (let x = 0; x < w.w; x++) {
        if (w.zones[y * w.w + x] !== 2) continue;
        const o = w.objAt(x, y);
        if (o && o.kind !== 'crop') continue;
        if (o && o.kind === 'crop' && o.growth < 0.98) continue;
        if (!o && !w.walkable(x, y)) continue;
        const k = 'farm:' + key(x, y);
        if (this.game.claims.has(k) && this.game.claims.get(k) !== this.id) continue;
        if (this.failed.has('t' + key(x, y)) && this.failed.get('t' + key(x, y)) > this.game.time) continue;
        const d = (x - this.x) ** 2 + (y - this.y) ** 2;
        if (d < bd) { bd = d; best = { x, y, o }; mode = o ? 'harvest' : 'sow'; }
      }
    }
    if (!best) return false;
    const k = 'farm:' + key(best.x, best.y);
    if (!this.claim(k)) return false;
    const job = { type: mode, obj: best.o, tx: best.x, ty: best.y, phase: 'travel', progress: 0 };
    this.job = job;
    if (!this.initTravel(job, best.x, best.y)) { this.clearJob(); return false; }
    this.action = 'farm';
    return true;
  }

  /* ---------- stockpile / hauling ---------- */
  startHaul() {
    const w = this.game.world;
    if (!w.stockpileTiles().length) return false;
    let best = null, bd = Infinity;
    for (const it of w.items) {
      if (it.stored || it.carried || it.amount <= 0) continue;
      if (it.reserved && it.reserved !== this.id) continue;
      if (this.failed.has('t' + key(it.x, it.y)) && this.failed.get('t' + key(it.x, it.y)) > this.game.time) continue;
      const d = (it.x - this.x) ** 2 + (it.y - this.y) ** 2;
      if (d < bd) { bd = d; best = it; }
    }
    if (!best) return false;
    best.reserved = this.id;
    const job = {
      type: 'haul', item: best, tx: best.x, ty: best.y, phase: 'travel', stage: 'pickup',
    };
    this.job = job;
    this.claimKey = 'item:' + best.id;
    this.game.claims.set(this.claimKey, this.id);
    if (!this.initTravel(job, best.x, best.y)) { this.clearJob(); return false; }
    this.action = 'haul';
    return true;
  }

  /* ---------- food & cooking ---------- */
  startEat() {
    const w = this.game.world;
    let best = null, bd = Infinity;
    for (const it of w.items) {
      if (it.carried || it.amount <= 0) continue;
      if (it.type !== 'meal' && it.type !== 'food') continue;
      if (it.reserved && it.reserved !== this.id) continue;
      const pref = it.type === 'meal' ? 0 : 2.5;
      const d = Math.sqrt((it.x - this.x) ** 2 + (it.y - this.y) ** 2) + pref;
      if (d < bd) { bd = d; best = it; }
    }
    if (!best) return false;
    best.reserved = this.id;
    const job = { type: 'eat', item: best, tx: best.x, ty: best.y, phase: 'travel', progress: 0 };
    this.job = job;
    this.claimKey = 'item:' + best.id;
    this.game.claims.set(this.claimKey, this.id);
    if (!this.initTravel(job, best.x, best.y)) { this.clearJob(); return false; }
    this.action = 'eat';
    return true;
  }

  startCook() {
    const w = this.game.world;
    const meals = w.total('meal');
    if (w.total('food') < 2 || meals >= 10) return false;
    let best = null, bd = Infinity;
    for (const o of w.campfires()) {
      const k = 'cook:' + key(o.x, o.y);
      if (this.game.claims.has(k) && this.game.claims.get(k) !== this.id) continue;
      const d = (o.x - this.x) ** 2 + (o.y - this.y) ** 2;
      if (d < bd) { bd = d; best = o; }
    }
    if (!best) return false;
    const k = 'cook:' + key(best.x, best.y);
    if (!this.claim(k)) return false;
    const job = { type: 'cook', fire: best, tx: best.x, ty: best.y, phase: 'travel', progress: 0 };
    this.job = job;
    if (!this.initTravel(job, best.x, best.y)) { this.clearJob(); return false; }
    this.action = 'cook';
    return true;
  }

  startRefuel() {
    const w = this.game.world;
    if (w.total('wood') < 5) return false;
    let best = null, bd = Infinity;
    for (const o of w.campfires()) {
      if (o.fuel > 34) continue;
      const k = 'refuel:' + key(o.x, o.y);
      if (this.game.claims.has(k) && this.game.claims.get(k) !== this.id) continue;
      const d = (o.x - this.x) ** 2 + (o.y - this.y) ** 2;
      if (d < bd) { bd = d; best = o; }
    }
    if (!best) return false;
    const k = 'refuel:' + key(best.x, best.y);
    if (!this.claim(k)) return false;
    const job = { type: 'refuel', fire: best, tx: best.x, ty: best.y, phase: 'travel', progress: 0 };
    this.job = job;
    if (!this.initTravel(job, best.x, best.y)) { this.clearJob(); return false; }
    this.action = 'build';
    return true;
  }

  startResearch() {
    const g = this.game;
    if (!g.activeResearch) return false;
    const w = g.world;
    let best = null, bd = Infinity;
    for (const o of w.benches()) {
      const k = 'research:' + key(o.x, o.y);
      if (g.claims.has(k) && g.claims.get(k) !== this.id) continue;
      const d = (o.x - this.x) ** 2 + (o.y - this.y) ** 2;
      if (d < bd) { bd = d; best = o; }
    }
    if (!best) return false;
    const k = 'research:' + key(best.x, best.y);
    if (!this.claim(k)) return false;
    const job = { type: 'research', bench: best, tx: best.x, ty: best.y, phase: 'travel' };
    this.job = job;
    if (!this.initTravel(job, best.x, best.y)) { this.clearJob(); return false; }
    this.action = 'research';
    return true;
  }

  startSleep() {
    const w = this.game.world;
    const bed = w.findFreeBed(this.id);
    if (bed) {
      const k = 'bed:' + key(bed.x, bed.y);
      if (this.claim(k)) {
        const job = { type: 'sleep', bed, tx: bed.x, ty: bed.y, phase: 'travel' };
        this.job = job;
        if (this.initTravel(job, bed.x, bed.y)) { this.action = 'sleep'; return true; }
      }
      this.clearJob();
    }
    // exhausted — sleep on the ground
    this.clearJob();
    this.job = { type: 'sleep', bed: null, tx: Math.floor(this.x), ty: Math.floor(this.y), phase: 'sleep', ground: true };
    this.sleeping = true;
    this.sleepGround = true;
    this.action = 'sleep';
    this.path = [];
    return true;
  }

  startWander() {
    const g = this.game;
    const w = g.world;
    for (let i = 0; i < 10; i++) {
      const x = clamp(Math.round(w.cx + (Math.random() - 0.5) * 16), 1, w.w - 2);
      const y = clamp(Math.round(w.cy + (Math.random() - 0.5) * 14), 1, w.h - 2);
      if (!w.walkable(x, y) || w.objAt(x, y)) continue;
      const job = { type: 'wander', tx: x, ty: y, phase: 'travel', wait: 1 + Math.random() * 5 };
      this.job = job;
      if (this.initTravel(job, x, y)) { this.action = 'walk'; return true; }
    }
    this.job = { type: 'wander', phase: 'idle', wait: 2 + Math.random() * 4, tx: Math.floor(this.x), ty: Math.floor(this.y) };
    this.action = 'idle';
    return true;
  }

  /* ---------------- job execution ---------------- */
  runJob(dt) {
    const j = this.job;
    if (!j) return;
    if (j.type === 'fight') { this.runFight(dt); return; }
    if (j.type === 'sleep') { this.runSleep(dt); return; }
    if (j.type === 'wander') { this.runWander(dt); return; }
    if (j.type === 'guard') { this.runGuard(dt); return; }
    if (j.type === 'eat') { this.runEat(dt); return; }
    if (j.type === 'haul') { this.runHaul(dt); return; }
    if (j.type === 'smash') { this.runSmash(dt); return; }

    // work-style jobs share travel handling
    if (j.phase === 'travel') {
      if (this.visitedTarget(j)) {
        j.phase = 'work';
        this.path = [];
        this.moving = false;
      } else if (!this.path.length) {
        if (!this.initTravel(j, j.tx, j.ty, j.type === 'build')) { this.clearJob(); }
      }
      return;
    }
    if (!this.visitedTarget(j) && !this.path.length) {
      if (!this.initTravel(j, j.tx, j.ty, j.type === 'build')) { this.clearJob(); }
      return;
    }
    this.workAnim += dt * 8;
    switch (j.type) {
      case 'chop': this.doChop(dt, j); break;
      case 'mine': this.doMine(dt, j); break;
      case 'harvest': this.doHarvest(dt, j); break;
      case 'sow': this.doSow(dt, j); break;
      case 'build': this.doBuild(dt, j); break;
      case 'deconstruct': this.doDeconstruct(dt, j); break;
      case 'cook': this.doCook(dt, j); break;
      case 'refuel': this.doRefuel(dt, j); break;
      case 'research': this.doResearch(dt, j); break;
      default: this.clearJob(); break;
    }
  }

  doChop(dt, j) {
    const o = j.obj;
    if (!o || !this.game.world.objs.has(key(o.x, o.y))) { this.clearJob(); return; }
    this.action = 'chop';
    const rate = (11 + this.skill('work') * 1.25) * dt;
    o.hp -= rate;
    if (Math.random() < dt * 7) {
      this.game.addParticle({ type: o.kind === 'bush' ? 'leaf' : 'chip', x: o.x + 0.5 + (Math.random() - .5) * .6, y: o.y + 0.45, vx: (Math.random() - .5) * 1.6, vy: -1 - Math.random(), life: 0.8, size: 2.4 });
    }
    if (o.hp <= 0) {
      const w = this.game.world;
      w.removeObj(o);
      w.clearDesignation(o.x, o.y);
      this.game.audio.sfx(o.kind === 'bush' ? 'leaf' : 'tree');
      if (o.kind === 'tree') {
        const n = Math.max(4, Math.round((o.wood || 8) * (1 + this.skill('work') * 0.03)));
        this.dropLoot('wood', n, o.x, o.y);
        this.game.stats.woodGathered += n;
        this.game.floatText(o.x + .5, o.y + .2, `+${n} wood`, '#e6bd85');
      } else {
        const n = 4 + Math.round(this.skill('farming') * 0.4);
        this.dropLoot('food', n, o.x, o.y);
        this.game.floatText(o.x + .5, o.y + .2, `+${n} berries`, '#d8e19a');
      }
      this.game.addParticle({ type: 'leaf', x: o.x + .5, y: o.y + .4, vx: 0, vy: 0, life: 0.4 });
      this.clearJob();
      this.thinkTimer = 0.1;
    }
  }

  doMine(dt, j) {
    const w = this.game.world;
    const o = j.obj;
    if (o) {
      if (!w.objs.has(key(o.x, o.y))) { this.clearJob(); return; }
      o.hp -= (10 + this.skill('mining') * 1.4) * dt;
      if (o.hp <= 0) {
        w.removeObj(o); w.clearDesignation(o.x, o.y);
        const n = 5 + Math.round(this.skill('mining') * 0.4);
        this.dropLoot('stone', n, o.x, o.y);
        this.game.stats.stoneGathered += n;
        this.game.floatText(o.x + .5, o.y + .2, `+${n} stone`, '#c9d0d4');
        this.game.audio.sfx('mine');
        this.clearJob(); this.thinkTimer = 0.1;
        return;
      }
    } else {
      j.progress += dt / j.duration;
      if (j.progress >= 1) {
        if (w.terrainAt(j.tx, j.ty) === 5) {
          w.setTerrain(j.tx, j.ty, 1);
          const n = 6 + Math.round(this.skill('mining') * 0.4);
          this.dropLoot('stone', n, j.tx, j.ty);
          this.game.stats.stoneGathered += n;
          this.game.floatText(j.tx + .5, j.ty + .2, `+${n} stone`, '#c9d0d4');
          this.game.audio.sfx('mine');
        }
        w.clearDesignation(j.tx, j.ty);
        this.clearJob(); this.thinkTimer = 0.1;
        return;
      }
    }
    this.action = 'mine';
    if (Math.random() < dt * 8) {
      this.game.addParticle({ type: 'stone', x: j.tx + .5, y: j.ty + .5, vx: (Math.random() - .5) * 1.8, vy: -1.2 * Math.random(), life: .7, size: 2 });
    }
  }

  doHarvest(dt, j) {
    const o = j.obj;
    if (!o) { this.clearJob(); return; }
    j.progress += dt * (0.7 + this.skill('farming') * 0.045);
    this.action = 'farm';
    if (j.progress >= 1) {
      const w = this.game.world;
      if (o.kind === 'crop') {
        if (o.growth >= 0.95) {
          const bonus = this.game.hasTech('agriculture') ? 1.5 : 1;
          const n = Math.round((4 + Math.random() * 3 + this.skill('farming') * 0.3) * bonus);
          this.dropLoot('food', n, o.x, o.y);
          this.game.stats.foodHarvested += n;
          this.game.floatText(o.x + .5, o.y + .2, `+${n} food`, '#d8e19a');
          o.growth = 0.05;
          this.game.audio.sfx('harvest');
        }
      } else if (o.kind === 'bush') {
        const n = o.berries || 0;
        if (n > 0) {
          this.dropLoot('food', n, o.x, o.y);
          o.berries = 0; o.regrow = 0;
          this.game.floatText(o.x + .5, o.y + .2, `+${n} berries`, '#d8e19a');
        }
        if (j.designated) w.clearDesignation(o.x, o.y);
      }
      this.clearJob();
      this.thinkTimer = 0.15;
    }
  }

  doSow(dt, j) {
    const w = this.game.world;
    if (w.objAt(j.tx, j.ty)) { this.clearJob(); return; }
    j.progress += dt * (0.9 + this.skill('farming') * 0.05);
    this.action = 'farm';
    if (j.progress >= 1) {
      w.addObj({ kind: 'crop', x: j.tx, y: j.ty, growth: 0.06, variant: (Math.random() * 3) | 0, hp: 10 });
      this.game.audio.sfx('sow');
      this.clearJob();
      this.thinkTimer = 0.2;
    }
  }

  doBuild(dt, j) {
    const bp = j.obj;
    const w = this.game.world;
    if (!bp || !w.objs.has(key(bp.x, bp.y))) { this.clearJob(); return; }
    const def = BUILDINGS[bp.defId];
    if (!def) { w.removeObj(bp); this.clearJob(); return; }
    this.action = 'build';
    const techBoost = this.game.hasTech('carpentry') ? 1.2 : 1;
    const rate = (0.34 + this.skill('work') * 0.026) * techBoost;
    bp.progress = (bp.progress || 0) + rate * dt;
    if (Math.random() < dt * 4.5) {
      this.game.addParticle({ type: 'dust', x: bp.x + .5, y: bp.y + .5, vx: (Math.random() - .5) * 1.2, vy: -0.4, life: 1.0, size: 2.6 });
    }
    if (bp.progress >= 1) {
      w.removeObj(bp);
      let hp = def.hp;
      if (def.id === 'wood_wall' && this.game.hasTech('carpentry')) hp *= 1.35;
      if (def.id === 'stone_wall' && this.game.hasTech('masonry')) hp *= 1.4;
      w.createStructure(bp.defId, bp.x, bp.y, { hp: Math.round(hp), playerBuilt: true });
      this.game.stats.built++;
      this.game.audio.sfx('build');
      this.game.floatText(bp.x + .5, bp.y + .1, def.name, '#bcd6c0');
      this.game.checkObjectives();
      this.clearJob();
      this.thinkTimer = 0.15;
    }
  }

  doDeconstruct(dt, j) {
    const o = j.obj;
    const w = this.game.world;
    if (!o || !w.objs.has(key(o.x, o.y))) { this.clearJob(); return; }
    this.action = 'build';
    o.hp = (o.hp ?? 100) - dt * (22 + this.skill('work') * 2);
    if (Math.random() < dt * 3) this.game.addParticle({ type: 'chip', x: o.x + .5, y: o.y + .5, vx: (Math.random() - .5) * 1.5, vy: -1, life: .7, size: 2 });
    if (o.hp <= 0) {
      const def = BUILDINGS[o.defId] || {};
      const cost = def.cost || {};
      for (const [type, n] of Object.entries(cost)) {
        const refund = Math.max(1, Math.round(n * 0.55));
        this.dropLoot(type, refund, o.x, o.y);
      }
      w.removeObj(o);
      w.clearDesignation(o.x, o.y);
      this.game.audio.sfx('build');
      this.clearJob();
      this.thinkTimer = 0.1;
    }
  }

  doCook(dt, j) {
    const fire = j.fire;
    const w = this.game.world;
    if (!fire || !w.objs.has(key(fire.x, fire.y))) { this.clearJob(); return; }
    j.progress += dt;
    this.action = 'cook';
    if (Math.random() < dt * 3) {
      this.game.addParticle({ type: 'smoke', x: fire.x + .5 + (Math.random() - .5) * .3, y: fire.y + .15, vx: 0.05, vy: -0.4, life: 1.4, size: 3 });
    }
    if (j.progress >= 2.6) {
      j.progress = 0;
      if (w.total('food') >= 2 && w.total('meal') < 12) {
        w.spend('food', 2);
        w.addItem('meal', 1, fire.x, fire.y, w.zoneAt(fire.x, fire.y) === 1);
        this.game.floatText(fire.x + .5, fire.y - .3, '+1 meal', '#f0c987');
        this.game.audio.sfx('cook');
      } else { this.clearJob(); this.thinkTimer = 0.4; return; }
      this.thinkTimer = 0.1;
      if (w.total('food') < 2 || w.total('meal') >= 10) { this.clearJob(); }
    }
  }

  doRefuel(dt, j) {
    const fire = j.fire;
    const w = this.game.world;
    if (!fire || !w.objs.has(key(fire.x, fire.y))) { this.clearJob(); return; }
    j.progress += dt;
    this.action = 'build';
    if (j.progress >= 1.2) {
      if (w.total('wood') >= 5) {
        w.spend('wood', 5);
        fire.fuel = Math.min(100, (fire.fuel || 0) + 55);
        fire.lit = true;
        this.game.floatText(fire.x + .5, fire.y - .2, 'fire stoked', '#f0b36a');
        this.game.audio.sfx('fire');
      }
      this.clearJob();
      this.thinkTimer = 0.2;
    }
  }

  doResearch(dt, j) {
    this.action = 'research';
    this.game.addResearch(dt * (0.5 + this.skill('research') * 0.07));
    j.bench.studying = true;
    this.workAnim += dt;
    if (Math.random() < dt * 1.5) {
      this.game.addParticle({ type: 'spark', x: j.bench.x + .5, y: j.bench.y + .2, vx: (Math.random() - .5) * .4, vy: -0.5, life: 0.9, size: 1.6 });
    }
    if (!this.game.activeResearch) { this.clearJob(); this.thinkTimer = 0.3; }
  }

  runEat(dt) {
    const j = this.job;
    const it = j.item;
    if (!it || it.amount <= 0 || !this.game.world.items.includes(it)) { this.clearJob(); this.thinkTimer = 0.2; return; }
    if (j.phase === 'travel') {
      if (!this.path.length && this.atTile(it.x, it.y, 0.9)) {
        j.phase = 'work'; j.progress = 0; this.path = []; this.moving = false;
      } else if (!this.path.length) {
        if (!this.initTravel(j, it.x, it.y)) { this.clearJob(); return; }
      }
      return;
    }
    this.action = 'eat';
    j.progress += dt;
    if (j.progress >= 1.1) {
      const isMeal = it.type === 'meal';
      it.amount -= 1;
      if (it.amount <= 0) this.game.world.removeItem(it);
      this.needs.hunger = Math.min(100, this.needs.hunger + (isMeal ? 46 : 24));
      if (isMeal) { this.moodBoost += 2.5; this.needs.mood = Math.min(100, this.needs.mood + 4); }
      else { this.needs.mood = Math.max(0, this.needs.mood - 1.5); }
      this.game.audio.sfx('eat');
      this.game.floatText(this.x, this.y - 0.7, isMeal ? 'meal' : 'berries', isMeal ? '#f0c987' : '#d8e19a');
      this.clearJob();
      this.thinkTimer = 0.2;
    }
  }

  runHaul(dt) {
    const j = this.job;
    const w = this.game.world;
    if (j.stage === 'pickup') {
      const it = j.item;
      if (!it || it.amount <= 0 || !w.items.includes(it)) {
        this.clearJob(); this.thinkTimer = 0.2; return;
      }
      if (!this.path.length && this.atTile(it.x, it.y, 0.6)) {
        const cap = 25 + (this.game.hasTech('logistics') ? 12 : 0);
        const take = Math.min(it.amount, cap);
        this.carried = { type: it.type, amount: take };
        it.amount -= take;
        if (it.amount <= 0) w.removeItem(it);
        it.reserved = null;
        this.releaseClaim();
        const st = w.findNearestZoneTile(it.x, it.y, 1);
        if (!st) { this.dropCarried(); this.clearJob(); return; }
        j.stage = 'drop';
        j.phase = 'travel';
        this.job.claimKey = 'stock:' + key(st.x, st.y);
        this.game.claims.set(this.job.claimKey, this.id);
        this.claimKey = this.job.claimKey;
        if (!this.initTravel(j, st.x, st.y, false)) { this.dropCarried(); this.clearJob(); return; }
      } else if (!this.path.length) {
        if (!this.initTravel(j, it.x, it.y)) { this.clearJob(); return; }
      }
      return;
    }
    // dropping off
    if (!this.path.length) {
      if (this.atTile(j.tx, j.ty, 0.9) || this.nextTo(j.tx, j.ty)) {
        this.dropCarried();
        this.game.audio.sfx('drop');
        this.clearJob();
        this.thinkTimer = 0.25;
      } else if (!this.initTravel(j, j.tx, j.ty, false)) {
        this.dropCarried(); this.clearJob();
      }
    }
  }

  dropLoot(type, amount, x, y) {
    const w = this.game.world;
    let left = amount;
    let guard = 0;
    while (left > 0 && guard++ < 8) {
      const n = Math.min(left, 12);
      const ox = (Math.random() - 0.5) * 0.34;
      const oy = (Math.random() - 0.5) * 0.2;
      w.addItem(type, n, x, y, false, ox, oy);
      left -= n;
    }
  }

  dropCarried() {
    if (!this.carried) return;
    const c = this.carried;
    this.carried = null;
    if (c.amount <= 0) return;
    const tile = { x: Math.floor(this.x), y: Math.floor(this.y) };
    const stored = this.game.world.zoneAt(tile.x, tile.y) === 1;
    this.game.world.addItem(c.type, c.amount, tile.x, tile.y, stored);
    if (stored) this.game.audio.sfx('drop');
  }

  runSleep(dt) {
    const j = this.job;
    if (j.phase === 'travel') {
      if (!this.path.length && this.atTile(j.tx, j.ty, 0.3)) {
        this.path = []; this.moving = false;
        j.phase = 'sleep';
        this.sleeping = true;
        this.sleepGround = false;
        if (j.bed) {
          j.bed.sleepers = j.bed.sleepers || [];
          if (!j.bed.sleepers.includes(this.id)) j.bed.sleepers.push(this.id);
        }
        this.action = 'sleep';
      } else if (!this.path.length) {
        if (!this.initTravel(j, j.tx, j.ty)) { this.clearJob(); this.thinkTimer = 0.5; }
      }
      return;
    }
    this.action = 'sleep';
    const day = this.game.isDay();
    if (this.needs.rest >= 98 || (day && this.needs.rest > 78)) {
      this.wake();
      this.clearJob();
      this.thinkTimer = 0.2;
    }
    if (Math.random() < dt * 0.25) {
      this.game.addParticle({ type: 'zzz', x: this.x + 0.2, y: this.y - 0.6, vx: 0.15, vy: -0.25, life: 1.6, size: 7 });
    }
  }

  runWander(dt) {
    const j = this.job;
    if (j.phase === 'travel') {
      if (!this.path.length) {
        j.phase = 'idle';
        j.wait = 1.5 + Math.random() * 5;
        this.action = 'idle';
        this.moving = false;
      }
      return;
    }
    j.wait -= dt;
    this.action = 'idle';
    if (j.wait <= 0) { this.clearJob(); this.thinkTimer = 0.2; }
  }

  runGuard(dt) {
    const enemy = this.findEnemy(15);
    if (enemy) { this.startFight(enemy); return; }
    this.action = 'aim';
    if (!this.path.length) {
      this.guardTimer = (this.guardTimer || 0) - dt;
      if (this.guardTimer <= 0) {
        this.guardTimer = 4 + Math.random() * 3;
        const w = this.game.world;
        const x = clamp(Math.round(w.cx + (Math.random() - 0.5) * 8), 1, w.w - 2);
        const y = clamp(Math.round(w.cy + (Math.random() - 0.5) * 8), 1, w.h - 2);
        if (w.walkable(x, y)) this.initTravel({}, x, y);
      }
    }
  }

  runFight(dt) {
    const e = this.targetPawn;
    if (!e || e.dead || e.downed || (this.isColonist && e.isRaider === this.isRaider)) {
      this.targetPawn = null;
      if (this.isRaider) { this.clearJob(); this.thinkTimer = 0.2; }
      else { this.clearJob(); this.thinkTimer = 0.1; }
      return;
    }
    const d = dist(this.x, this.y, e.x, e.y);
    this.facing = e.x > this.x ? 1 : -1;
    this.action = 'aim';

    if (this.isRaider) {
      if (d > 1.35) {
        this.fightRepath = (this.fightRepath || 0) - dt;
        if (this.fightRepath <= 0 || !this.path.length) {
          this.fightRepath = 0.5;
          const sx = Math.floor(this.x), sy = Math.floor(this.y);
          const path = findPath(this.game.world, sx, sy, Math.floor(e.x), Math.floor(e.y), { adjacent: false, maxNodes: 12000 });
          if (path && path.length) this.path = path;
          else {
            const p = nearestWalkable(this.game.world, Math.floor(e.x), Math.floor(e.y), 2);
            if (p) { const p2 = findPath(this.game.world, sx, sy, p.x, p.y, { maxNodes: 8000 }); if (p2) this.path = p2; }
          }
          if (!this.path.length) this.attackStructureNearby();
        }
      } else {
        this.path = [];
        this.moving = false;
        if (this.attackCd <= 0) {
          this.attackCd = 1.25 + Math.random() * 0.3;
          this.actionT = 0.22;
          e.damage(7 + Math.random() * 5, this.game, this);
          this.game.audio.sfx('hurt');
        }
      }
      return;
    }

    // colonist ranged combat
    const range = 8.6;
    if (d > range) {
      this.fightRepath = (this.fightRepath || 0) - dt;
      if (this.fightRepath <= 0 || !this.path.length) {
        this.fightRepath = 0.7;
        const target = nearestWalkable(this.game.world, Math.floor(e.x), Math.floor(e.y), 3);
        if (target) this.initTravel({}, target.x, target.y);
      }
    } else {
      this.path = [];
      this.moving = false;
      if (this.attackCd <= 0 && lineClear(this.game.world, this.x, this.y, e.x, e.y)) {
        this.attackCd = 1.05 + Math.random() * 0.5;
        const skill = this.skill('combat');
        const dmg = 8 + skill * 0.85 + Math.random() * 4;
        const hitChance = clamp(0.66 + skill * 0.028, 0.5, 0.94);
        this.game.spawnProjectile({
          x: this.x, y: this.y - 0.35, target: e, dmg,
          team: 'colony', hitChance, speed: 26,
            color: '#ffdf8a',
        });
        this.actionT = 0.28;
        this.game.audio.sfx('shot');
      }
    }
  }

  thinkRaider() {
    const g = this.game;
    let target = null, bd = Infinity;
    for (const p of g.colonists) {
      if (p.dead || p.downed) continue;
      const d = (p.x - this.x) ** 2 + (p.y - this.y) ** 2;
      if (d < bd) { bd = d; target = p; }
    }
    if (target) {
      this.startFight(target);
      return;
    }
    // no living colonists — smash the colony
    let struct = null; bd = Infinity;
    for (const o of g.world.objs.values()) {
      if (!['wall', 'door', 'bed', 'campfire', 'bench', 'turret', 'torch'].includes(o.kind)) continue;
      const d = (o.x - this.x) ** 2 + (o.y - this.y) ** 2;
      if (d < bd) { bd = d; struct = o; }
    }
    if (struct) {
      this.raidTarget = struct;
      this.job = { type: 'smash', tx: struct.x, ty: struct.y, phase: 'travel' };
      this.action = 'aim';
      if (!this.initTravel(this.job, struct.x, struct.y)) {
        // already adjacent? attack
        this.job.phase = 'work';
      }
    } else {
      this.job = { type: 'wander', phase: 'idle', wait: 2, tx: Math.floor(this.x), ty: Math.floor(this.y) };
    }
  }

  attackStructureNearby() {
    const w = this.game.world;
    const cx = Math.floor(this.x), cy = Math.floor(this.y);
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const o = w.objAt(cx + dx, cy + dy);
      if (o && ['wall', 'door', 'bed', 'campfire', 'bench', 'turret', 'torch'].includes(o.kind)) {
        this.raidTarget = o;
        this.job = { type: 'smash', tx: o.x, ty: o.y, phase: 'work' };
        return true;
      }
    }
    return false;
  }

  runSmash(dt) {
    const j = this.job;
    const o = j.objRef || this.raidTarget || this.game.world.objAt(j.tx, j.ty);
    if (!o || !this.game.world.objs.has(key(o.x, o.y))) {
      this.clearJob(); this.thinkTimer = 0.3; return;
    }
    const d = dist(this.x, this.y, o.x + 0.5, o.y + 0.5);
    if (d > 1.5) {
      if (!this.path.length) {
        if (!this.initTravel(j, o.x, o.y)) { this.clearJob(); this.thinkTimer = 0.5; }
      } else if (j.phase === 'work') {
        // blocked by the structure itself
        this.attackStructure(o);
      }
      return;
    }
    this.facing = o.x + .5 > this.x ? 1 : -1;
    this.path = [];
    this.moving = false;
    if (this.attackCd <= 0) {
      this.attackCd = 1.15 + Math.random() * 0.3;
      this.attackStructure(o);
      this.actionT = 0.22;
    }
    this.action = 'aim';
  }

  attackStructure(o) {
    const w = this.game.world;
    const def = BUILDINGS[o.defId];
    w.damageStructure(o, 14 + Math.random() * 6);
    this.game.audio.sfx('smash');
    for (let i = 0; i < 4; i++) {
      this.game.addParticle({
        type: o.material === 'stone' ? 'stone' : 'chip',
        x: o.x + .5 + (Math.random() - .5) * .4, y: o.y + .4,
        vx: (Math.random() - .5) * 2, vy: -Math.random() * 1.6, life: .8, size: 2.4,
      });
    }
    if (!w.objs.has(key(o.x, o.y))) {
      this.game.toast(`${def?.name || 'Structure'} destroyed!`, 'bad');
      this.clearJob();
    }
  }

  /* ---------------- damage ---------------- */
  damage(amount, game, source) {
    if (this.dead || this.downed) return;
    this.hp -= amount;
    const p = this.isRaider ? '#8a3030' : '#a03a32';
    game.spawnBlood(this.x, this.y, 3 + (Math.random() * 3 | 0), this.isRaider);
    game.floatText(this.x + (Math.random() - .5) * .4, this.y - 0.8, `-${Math.round(amount)}`, '#f08a7e');
    if (this.hp <= 0) {
      if (this.isRaider) {
        this.dead = true;
        this.hp = 0;
        this.deadTimer = 0;
        this.path = [];
        this.job = null;
        this.game.onRaiderDowned(this);
      } else {
        this.goDown(game);
      }
    }
  }

  goDown(game) {
    if (this.downed) return;
    this.downed = true;
    this.sleeping = false;
    this.hp = 0;
    this.path = [];
    this.dropCarried();
    this.clearJob();
    this.action = 'downed';
    this.recoverTimer = game.hasTech('medicine') ? 12 : 24;
    this.needs.mood = Math.max(0, this.needs.mood - 12);
    game.toast(`${this.name} is down!`, 'bad');
    game.audio.sfx('down');
    game.onColonistDowned(this);
  }

  serialize() {
    return {
      id: this.id, name: this.name, x: this.x, y: this.y, hp: this.hp, maxHp: this.maxHp,
      skills: this.skills, traits: this.traits.map(t => t.id), needs: this.needs,
      skin: this.skin, hair: this.hair, shirt: this.shirt, pants: this.pants,
      hairStyle: this.hairStyle, bodyScale: this.bodyScale, weapon: this.weapon,
      downed: this.downed, dead: this.dead, drafted: this.drafted,
    };
  }
}
