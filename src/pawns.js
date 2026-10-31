// Pawns: colonists, raiders and animals, their needs, tasks and combat.
import { WEAPONS, ITEMS, SKILLS, TRAITS, SKIN_TONES, HAIR_COLORS, SHIRT_COLORS, PANTS_COLORS, HAIR_STYLES, T } from './defs.js';
import { clamp, dist, pick, TAU } from './util.js';

let PAWN_SEQ = 1;

export class Pawn {
  constructor(world, opts = {}) {
    this.world = world;
    this.id = opts.id || PAWN_SEQ++;
    this.kind = opts.kind || 'colonist';
    this.animalType = opts.animalType || null;
    this.def = opts.def || null;
    this.name = opts.name || (this.kind === 'raider' ? 'Raider' : this.kind === 'animal' ? 'Animal' : 'Colonist');
    this.x = opts.x ?? 30;
    this.y = opts.y ?? 30;
    this.maxHp = opts.hp ?? (this.kind === 'animal' ? this.def?.hp || 40 : 100);
    this.hp = this.maxHp;
    this.weapon = opts.weapon || null;
    this.skills = {};
    for (const s of SKILLS) this.skills[s] = opts.skills?.[s] ?? Math.floor(world.rng() * 5);
    this.skillProgress = {};
    this.traitIds = opts.traits || (this.kind === 'colonist' ? [pick(world.rng, TRAITS).id] : []);
    this.appearance = opts.appearance || {
      skin: pick(world.rng, SKIN_TONES), hair: pick(world.rng, HAIR_COLORS),
      shirt: pick(world.rng, SHIRT_COLORS), pants: pick(world.rng, PANTS_COLORS),
      hairStyle: pick(world.rng, HAIR_STYLES), hat: null, glasses: false, beard: false, mask: false,
    };
    this.priorities = opts.priorities || { doctor: 3, construction: 3, mining: 3, plants: 3, cooking: 3, hauling: 3, research: 3 };
    this.needs = { food: 78, rest: 82, joy: 65 };
    this.mood = 65;
    this.moodTarget = 65;
    this.lowMoodTime = 0;
    this.broken = 0;
    this.age = 20 + Math.floor(world.rng() * 30);
    this.backstory = opts.backstory || '';
    this.path = [];
    this.task = null;
    this.phase = 'idle';
    this.work = 0;
    this.working = false;
    this.sleeping = false;
    this.downed = false;
    this.dead = false;
    this.drafted = false;
    this.alarm = false;
    this.bleed = 0;
    this.cover = 0;
    this.carry = null;
    this.cooldown = 0;
    this.repathTimer = 0;
    this.idleTimer = 0.2 + world.rng() * 0.6;
    this.walkPhase = world.rng() * TAU;
    this.workAnim = 0;
    this.facing = Math.PI / 2;
    this.moving = false;
    this.flash = 0;
    this.recoil = 0;
    this.attackFlash = 0;
    this.wanderTimer = 1 + world.rng() * 4;
    this.moodTimer = world.rng();
    this.seatId = null;
    this.medicalReservedBy = null;
    this.huntReservedBy = null;
    this.lastHurt = -99;
    this.comfortBonus = 0;
    this.homeX = this.x; this.homeY = this.y;
    this.cover = 0;
    this.downedTimer = 0;
    this.deadAt = 0;
    this.faction = opts.faction || (this.kind === 'raider' ? 'raider' : 'colony');
    this.speedMul = this.kind === 'animal' ? this.def?.speed || 0.8 : this.kind === 'raider' ? 1.9 : 1.85;
    if (this.traitIds.includes('trigger')) this.skills.shooting = Math.min(10, this.skills.shooting + 1);
  }

  // ---------------------------------------------------------------- traits and stats
  hasTrait(id) { return this.traitIds.includes(id); }
  get isColonist() { return this.kind === 'colonist'; }
  get maxSpeed() {
    let s = this.speedMul;
    if (this.hasTrait('lazy')) s *= 0.94;
    if (this.carry) s *= 0.9;
    if (this.hp < this.maxHp * 0.5) s *= 0.82;
    if (this.world.terrainAt(Math.floor(this.x), Math.floor(this.y)).name === 'Marsh') s *= 0.82;
    if (this.world.terrainAt(Math.floor(this.x), Math.floor(this.y)).name === 'Sand') s *= 0.92;
    if (this.world.raid?.active && this.kind === 'colonist') s *= 1.06;
    return s;
  }
  workSpeed(skill) {
    let f = 0.78 + (this.skills[skill] || 0) * 0.055;
    if (this.hasTrait('industrious')) f *= 1.15;
    if (this.hasTrait('lazy')) f *= 0.88;
    if (this.hp < this.maxHp * 0.5) f *= 0.72;
    if (this.world.eclipse > 0) f *= 0.95;
    return f;
  }
  gainSkill(skill, amount = 0.15) {
    if (this.skills[skill] == null) return;
    if (this.skills[skill] >= 10) return;
    this.skillProgress[skill] = (this.skillProgress[skill] || 0) + amount;
    if (this.skillProgress[skill] >= 1) {
      this.skillProgress[skill] -= 1;
      this.skills[skill] += 1;
    }
  }
  moodLabel() {
    if (this.mood > 85) return 'Rapturous';
    if (this.mood > 70) return 'Content';
    if (this.mood > 55) return 'Steady';
    if (this.mood > 40) return 'Uneasy';
    if (this.mood > 24) return 'Stressed';
    return 'Breaking';
  }
  activity() {
    if (this.dead) return 'Dead';
    if (this.downed) return 'Downed';
    if (this.drafted) return 'Drafted';
    if (this.sleeping) return 'Sleeping';
    const t = this.task;
    if (!t) return this.broken > 0 ? 'Wandering in a daze' : 'Idle';
    switch (t.type) {
      case 'build': return `Building ${this.world.objectById(t.objId)?.def.name?.toLowerCase() || 'structure'}`;
      case 'deconstruct': return 'Deconstructing';
      case 'chop': return 'Chopping wood';
      case 'mine': return 'Mining';
      case 'harvest': return 'Harvesting';
      case 'plant': return 'Sowing crops';
      case 'haul': return 'Hauling';
      case 'haulDrop': return 'Hauling';
      case 'eat': case 'eatSeat': return 'Eating';
      case 'sleep': return 'Sleeping';
      case 'cook': return 'Cooking a meal';
      case 'research': return 'Researching';
      case 'tend': return 'Tending wounds';
      case 'hunt': return 'Hunting';
      case 'attack': return 'Fighting';
      case 'move': return 'Moving';
      case 'wander': return 'Wandering';
      case 'flee': return 'Fleeing';
      default: return 'Working';
    }
  }
  wake() {
    if (!this.sleeping) return;
    this.sleeping = false;
    this.finishTask();
  }
  faceTowards(x, y) { this.facing = Math.atan2(y - this.y, x - this.x); }

  // ---------------------------------------------------------------- tasks
  releaseReservations() {
    const t = this.task;
    if (!t) return;
    const w = this.world;
    if (t.objId != null) {
      const o = w.objectById(t.objId);
      if (o && o.reservedBy === this.id) o.reservedBy = null;
    }
    if (t.itemId != null) {
      const item = w.itemById(t.itemId);
      if (item && item.reservedBy === this.id) item.reservedBy = null;
    }
    if (t.type === 'tend') {
      const target = w.pawnById(t.targetId);
      if (target && target.medicalReservedBy === this.id) target.medicalReservedBy = null;
    }
    if (t.type === 'harvest' || t.type === 'plant') {
      w.releaseCrop(t.x, t.y);
    }
    if (t.type === 'hunt') {
      const target = w.pawnById(t.targetId);
      if (target && target.huntReservedBy === this.id) target.huntReservedBy = null;
    }
    if (this.seatId != null) {
      const seat = w.objectById(this.seatId);
      if (seat && seat.seatReservedBy === this.id) seat.seatReservedBy = null;
      this.seatId = null;
    }
    if (t.type === 'sleep' && this.sleeping) this.sleeping = false;
  }
  clearTask() {
    this.releaseReservations();
    this.task = null;
    this.path = [];
    this.phase = 'idle';
    this.working = false;
    this.sleeping = false;
    this.work = 0;
    this.moving = false;
  }
  finishTask(dropped = false) {
    if (this.carry && !dropped) {
      const spot = this.world.nearestWalkable(Math.floor(this.x), Math.floor(this.y));
      this.world.addItem(this.carry.type, this.carry.qty, spot.x, spot.y);
      this.carry = null;
    }
    this.releaseReservations();
    this.task = null;
    this.path = [];
    this.phase = 'idle';
    this.working = false;
    this.sleeping = false;
    this.work = 0;
    this.moving = false;
    this.idleTimer = 0.25 + this.world.rng() * 0.8;
  }

  beginTask(task) {
    if (!task || this.dead || this.downed) return false;
    this.releaseReservations();
    const w = this.world;
    this.task = task;
    this.phase = 'go';
    this.work = 0;
    this.working = false;
    this.sleeping = false;
    this.path = [];
    this.repathTimer = 0;
    let goals = null;

    switch (task.type) {
      case 'build': case 'deconstruct': case 'chop': case 'mine': case 'cook': case 'research': {
        const obj = w.objectById(task.objId);
        if (!obj || obj.dead || (task.type === 'build' && obj.built) || (task.type !== 'build' && !obj.built && task.type !== 'chop' && task.type !== 'mine')) { return false; }
        obj.reservedBy = this.id;
        if (task.type === 'chop' && !obj.def.choppable) return false;
        if (task.type === 'mine' && !obj.def.minable) return false;
        goals = w.adjacentTiles(obj);
        if (!goals.length) return false;
        task.standX = goals[0].x; task.standY = goals[0].y;
        break;
      }
      case 'harvest': case 'plant': {
        const key = w.idx(task.x, task.y);
        if (w.cropReserved.has(key)) return false;
        if (task.type === 'harvest' && !(w.cropPlanted[key] && w.crops[key] >= 1)) return false;
        if (task.type === 'plant' && w.cropPlanted[key]) return false;
        w.reserveCrop(task.x, task.y, this.id);
        goals = [{ x: task.x, y: task.y }];
        break;
      }
      case 'haul': {
        const item = w.itemById(task.itemId);
        if (!item || item.reservedBy) return false;
        item.reservedBy = this.id;
        task.item = item;
        goals = [{ x: item.x, y: item.y }];
        break;
      }
      case 'eat': {
        const item = w.itemById(task.itemId);
        if (!item) return false;
        item.reservedBy = this.id;
        task.item = item;
        goals = [{ x: item.x, y: item.y }];
        break;
      }
      case 'sleep': {
        if (task.ground) {
          const spot = w.isWalkable(Math.floor(this.x), Math.floor(this.y)) ? { x: Math.floor(this.x), y: Math.floor(this.y) } : w.nearestWalkable(this.x, this.y);
          goals = [spot];
        } else {
          const bed = w.objectById(task.objId);
          if (!bed || bed.dead || bed.reservedBy) return false;
          bed.reservedBy = this.id;
          goals = [{ x: bed.x, y: bed.y }];
          task.bed = bed;
        }
        break;
      }
      case 'tend': {
        const target = w.pawnById(task.targetId);
        if (!target || target.dead || target === this || target.medicalReservedBy) return false;
        target.medicalReservedBy = this.id;
        goals = [];
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]]) {
          const nx = Math.floor(target.x) + dx, ny = Math.floor(target.y) + dy;
          if (w.isWalkable(nx, ny)) goals.push({ x: nx, y: ny });
        }
        if (!goals.length) return false;
        break;
      }
      case 'hunt': {
        const target = w.pawnById(task.targetId);
        if (!target || target.dead || target.kind !== 'animal') return false;
        target.huntReservedBy = this.id;
        task.target = target;
        this.approachCombat(task, true);
        return true;
      }
      case 'attack': {
        const target = w.pawnById(task.targetId);
        if (!target || target.dead) return false;
        task.target = target;
        this.approachCombat(task, false);
        return true;
      }
      case 'haulDrop': {
        if (!this.carry) return false;
        if (!task.dest) return false;
        goals = [{ x: task.dest.x, y: task.dest.y }];
        break;
      }
      case 'move': case 'wander': case 'flee': {
        const spot = w.isWalkable(Math.round(task.x), Math.round(task.y)) ? { x: Math.round(task.x), y: Math.round(task.y) } : w.nearestWalkable(task.x, task.y);
        task.x = spot.x; task.y = spot.y;
        goals = [spot];
        break;
      }
      default:
        return false;
    }
    if (!goals || !goals.length) { this.clearTask(); return false; }
    const path = w.pathToAny(this, goals);
    if (path == null) { this.clearTask(); return false; }
    this.path = path;
    if (!path.length) this.arrive();
    return true;
  }

  snapToWork() {
    const t = this.task;
    if (!t) return;
    const w = this.world;
    if (t.type === 'build' || t.type === 'deconstruct' || t.type === 'chop' || t.type === 'mine' || t.type === 'cook' || t.type === 'research') {
      const obj = w.objectById(t.objId);
      if (!obj) return;
      const spot = w.freeAdjacent(obj, this);
      if (spot) { this.x = spot.x + 0.5; this.y = spot.y + 0.5; }
      this.faceTowards(obj.x + obj.w / 2, obj.y + obj.h / 2);
    } else if (t.type === 'tend') {
      const target = w.pawnById(t.targetId);
      if (target) {
        const spot = w.nearestWalkable(Math.floor(target.x) + 1, Math.floor(target.y));
        this.x = spot.x + 0.5; this.y = spot.y + 0.5;
        this.faceTowards(target.x, target.y);
      }
    } else if (t.type === 'harvest' || t.type === 'plant') {
      this.x = t.x + 0.5; this.y = t.y + 0.5;
    } else if (t.type === 'eat' || t.type === 'sleep') {
      if (t.objId) { const bed = w.objectById(t.objId); if (bed) { this.x = bed.x + 0.5; this.y = bed.y + 0.5; } }
    }
    this.path = [];
    this.phase = 'work';
    this.working = true;
  }

  // ---------------------------------------------------------------- movement
  moveAlong(sdt) {
    if (!this.path.length) return true;
    const node = this.path[0];
    const tx = node.x + 0.5, ty = node.y + 0.5;
    const dx = tx - this.x, dy = ty - this.y;
    const d = Math.hypot(dx, dy);
    const step = this.maxSpeed * sdt;
    this.moving = true;
    if (d <= step || d < 0.02) {
      this.x = tx; this.y = ty;
      this.walkPhase += 0.5;
      this.path.shift();
      if (!this.path.length) { this.moving = false; return true; }
      return false;
    }
    this.x += (dx / d) * step;
    this.y += (dy / d) * step;
    this.facing = Math.atan2(dy, dx);
    this.walkPhase += sdt * this.maxSpeed * 5.2;
    return false;
  }

  // ---------------------------------------------------------------- main update
  update(sdt, gh) {
    if (this.dead) return;
    this.flash = Math.max(0, this.flash - sdt);
    this.recoil = Math.max(0, this.recoil - sdt * 5);
    this.attackFlash = Math.max(0, this.attackFlash - sdt);
    this.cooldown = Math.max(0, this.cooldown - sdt);
    this.updateNeeds(gh);
    this.updateMood(gh);

    if (this.downed) {
      this.downedTimer += gh;
      this.bleed = Math.max(0, this.bleed - gh * 0.25);
      if (this.bleed <= 0 && this.hp > 5) {
        this.hp = Math.min(this.maxHp, this.hp + gh * 2.2);
        if (this.hp > this.maxHp * 0.45 && this.downedTimer > 2) {
          this.downed = false;
          this.addFloat('Recovered', '#9fd18a');
        }
      }
      return;
    }

    if (this.kind === 'animal') { this.updateAnimal(sdt, gh); return; }
    if (this.kind === 'raider') { this.updateRaider(sdt, gh); return; }

    this.updateCombat(sdt, gh);
    if (this.sleeping) { this.tickSleep(sdt, gh); return; }
    if (this.task) { this.updateTask(sdt, gh); return; }

    if (this.drafted) return;
    if (this.broken > 0) {
      this.broken -= gh;
      if (this.broken <= 0) {
        this.mood = Math.max(this.mood, 45);
        this.world.notice('info', `${this.name} recovers`, `${this.name} snaps out of their daze and returns to work.`);
      }
      this.idleTimer -= sdt;
      if (this.idleTimer <= 0) {
        this.idleTimer = 3 + this.world.rng() * 4;
        const spot = this.world.nearestWalkable(this.x + (this.world.rng() - 0.5) * 8, this.y + (this.world.rng() - 0.5) * 8);
        this.beginTask({ type: 'wander', x: spot.x, y: spot.y });
      }
      return;
    }

    if (this.world.raid?.active && this.alarm) {
      this.reactToRaid();
      if (this.task) return;
    }

    this.idleTimer -= sdt;
    if (this.idleTimer > 0) return;
    this.idleTimer = 0.4 + this.world.rng() * 0.6;
    const job = this.world.findJob(this);
    if (job) {
      this.beginTask(job);
    } else {
      const spot = this.world.nearestWalkable(this.x + (this.world.rng() - 0.5) * 7, this.y + (this.world.rng() - 0.5) * 7);
      this.beginTask({ type: 'wander', x: spot.x, y: spot.y });
      this.idleTimer = 2 + this.world.rng() * 4;
    }
  }

  updateNeeds(gh) {
    const n = this.needs;
    const asleep = this.sleeping;
    const foodRate = this.hasTrait('gourmand') ? 2.75 : 2.2;
    n.food = clamp(n.food - (asleep ? foodRate * 0.55 : foodRate) * gh, 0, 100);
    if (asleep) {
      const rate = this.hasTrait('quicksleep') ? 18 : 14.5;
      n.rest = clamp(n.rest + rate * gh, 0, 100);
    } else {
      n.rest = clamp(n.rest - 4.1 * gh, 0, 100);
      // Joy rises slowly around the campfire or when idle, decays otherwise.
      const nearFire = this.world.objects.some((o) => !o.dead && o.built && (o.def.fire || o.type === 'campfire') && dist(o.x, o.y, this.x, this.y) < 6);
      n.joy = clamp(n.joy + (nearFire ? 2.2 : this.working ? -1.05 : -0.5) * gh, 0, 100);
    }
    if (n.food <= 0) {
      this.hp = Math.max(0, this.hp - gh * 1.4);
      if (this.hp <= 0) this.world.killPawn(this, 'starvation');
    }
    if (n.rest <= 0) this.moodTarget -= 0.02;
    if (this.bleed > 0) {
      this.hp = Math.max(0, this.hp - gh * this.bleed * 0.7);
      this.bleed = Math.max(0, this.bleed - gh * 0.22);
      if (this.hp <= 0) this.world.killPawn(this, 'blood loss');
    } else if (this.hp < this.maxHp && this.kind === 'colonist') {
      this.hp = Math.min(this.maxHp, this.hp + gh * 1.0);
    }
    if (this.hp < this.maxHp * 0.25 && !this.downed && this.kind === 'colonist') {
      this.downed = true;
      this.clearTask();
      this.world.notice('bad', `${this.name} is down!`, `${this.name} collapsed from their wounds and needs a doctor.`);
    }
    this.cover = this.world.coverAt ? this.world.coverAt(this.x, this.y) : this.cover;
  }

  updateMood(gh) {
    if (this.kind !== 'colonist') return;
    this.moodTimer -= gh;
    if (this.moodTimer > 0) { this.mood += (this.moodTarget - this.mood) * Math.min(1, gh * 1.5); return; }
    this.moodTimer = 0.6;
    let m = 52;
    if (this.hasTrait('optimist')) m += 8;
    if (this.hasTrait('pessimist')) m -= 8;
    if (this.hasTrait('kind')) m += 3;
    if (this.hasTrait('nightowl')) m += this.world.isNight() ? 5 : -2;
    m += (this.needs.food - 50) * 0.14;
    m += (this.needs.rest - 50) * 0.1;
    m += (this.needs.joy - 50) * 0.12;
    m -= (1 - this.hp / this.maxHp) * 26;
    if (this.bleed > 0) m -= 7;
    if (this.comfortBonus) m += this.comfortBonus;
    const indoor = this.world.terrainAt(Math.floor(this.x), Math.floor(this.y)).name === 'Wood floor';
    if (!indoor && this.world.isNight()) m -= 3;
    if (this.world.weather === 'rain') m -= 2;
    if (this.world.weather === 'storm') m -= 5;
    if (this.world.raid?.active) m -= 11;
    for (const o of this.world.objects) {
      if (o.dead || !o.built) continue;
      if (dist(o.x, o.y, this.x, this.y) > 6) continue;
      if (o.def.beauty) m += Math.min(4, o.def.beauty * 0.4);
      if (o.def.fire) m += 2.5;
    }
    if (this.comfortBonus > 0) this.comfortBonus = Math.max(0, this.comfortBonus - 0.6);
    m = clamp(m, 4, 100);
    this.moodTarget = m;
    this.mood += (m - this.mood) * Math.min(1, gh * 2.4);
    if (this.mood < 22) {
      this.lowMoodTime += gh;
      if (this.lowMoodTime > 3.5 && this.broken <= 0) {
        this.broken = 4 + this.world.rng() * 3;
        this.lowMoodTime = 0;
        this.clearTask();
        this.world.notice('bad', `${this.name} breaks`, `${this.name} is overwhelmed. They wander the colony in a daze, unable to work.`);
      }
    } else {
      this.lowMoodTime = Math.max(0, this.lowMoodTime - gh * 0.5);
    }
  }

  addFloat(text, color) {
    this.world.addFloater(text, this.x, this.y - 1.1, color || '#e8e0cd');
  }

  // ---------------------------------------------------------------- task flow
  updateTask(sdt, gh) {
    const t = this.task;
    if (!t) return;
    if (this.kind === 'colonist' && (this.needs.food < 10 || this.needs.rest < 8) && !['eat', 'eatSeat', 'sleep'].includes(t.type)) {
      this.finishTask();
      return;
    }
    if (t.type === 'attack' || t.type === 'hunt') {
      this.updateCombatTask(sdt);
      return;
    }
    if (this.phase === 'go') {
      if (t.objId != null) {
        const obj = this.world.objectById(t.objId);
        if (!obj || obj.dead) return this.finishTask();
      }
      if (t.itemId != null && !this.world.itemById(t.itemId)) return this.finishTask();
      if (this.moveAlong(sdt)) this.arrive();
      return;
    }
    if (this.phase !== 'work') return;
    this.working = true;
    this.workAnim += sdt * 1.4;
    switch (t.type) {
      case 'build': return this.tickBuild(sdt);
      case 'deconstruct': return this.tickDeconstruct(sdt);
      case 'chop': return this.tickChop(sdt);
      case 'mine': return this.tickMine(sdt);
      case 'harvest': return this.tickHarvest(sdt);
      case 'plant': return this.tickPlant(sdt);
      case 'cook': return this.tickCook(sdt);
      case 'research': return this.tickResearch(sdt);
      case 'tend': return this.tickTend(sdt);
      case 'eat': return this.tickEat(sdt, false);
      case 'eatSeat': return this.tickEat(sdt, true);
      default: return this.finishTask();
    }
  }

  arrive() {
    const t = this.task;
    if (!t) return;
    const w = this.world;
    switch (t.type) {
      case 'build': case 'deconstruct': case 'chop': case 'mine': case 'cook': case 'research': {
        const obj = w.objectById(t.objId);
        if (!obj || obj.dead) return this.finishTask();
        const spot = w.freeAdjacent(obj, this);
        if (spot) { this.x = spot.x + 0.5; this.y = spot.y + 0.5; }
        this.faceTowards(obj.x + obj.w / 2, obj.y + obj.h / 2);
        this.phase = 'work';
        this.work = 0;
        break;
      }
      case 'harvest': case 'plant': {
        this.x = t.x + 0.5; this.y = t.y + 0.5;
        this.faceTowards(t.x + 0.5, t.y + 1.4);
        this.phase = 'work';
        this.work = 0;
        break;
      }
      case 'haul': {
        const item = t.item || w.itemById(t.itemId);
        if (!item || item.dead) return this.finishTask();
        const type = item.type, qty = item.qty;
        item.reservedBy = null;
        w.removeItem(item, qty);
        this.carry = { type, qty };
        const dest = w.stockpileSpot(this.x, this.y);
        this.task = null;
        if (!dest) { this.finishTask(); return; }
        this.beginTask({ type: 'haulDrop', itemType: type, qty, dest });
        return;
      }
      case 'eat': {
        const item = t.item || w.itemById(t.itemId);
        if (!item || item.dead) return this.finishTask();
        const nutrition = ITEMS[item.type]?.food || 15;
        w.removeItem(item, 1);
        item.reservedBy = null;
        this.needs.food = clamp(this.needs.food + nutrition, 0, 100);
        this.addFloat(`+${Math.round(nutrition)} food`, '#c9d9a0');
        w.spawnParticles('dust', this.x, this.y, 2, { spread: 0.2 });
        const seat = w.findFreeSeat(this);
        this.task = null;
        if (seat) {
          seat.seatReservedBy = this.id;
          this.seatId = seat.id;
          const path = w.pathToTile(this, seat.x, seat.y);
          if (path) {
            this.task = { type: 'eatSeat', seatId: seat.id };
            this.phase = 'go';
            this.path = path;
            this.work = 0;
            if (!path.length) this.sitDown(seat);
            return;
          }
          seat.seatReservedBy = null;
          this.seatId = null;
        }
        this.task = { type: 'eat', standing: true };
        this.phase = 'work';
        this.work = 0;
        return;
      }
      case 'eatSeat': {
        const seat = w.objectById(t.seatId);
        if (seat) this.sitDown(seat);
        else { this.finishTask(); }
        return;
      }
      case 'sleep': {
        if (t.bed) {
          this.x = t.bed.x + t.bed.w / 2;
          this.y = t.bed.y + t.bed.h / 2;
          this.sleeping = true;
          this.phase = 'work';
          this.facing = Math.PI / 2;
          w.spawnParticles('heal', this.x, this.y - 0.4, 1, { spread: 0.1 });
        } else {
          this.sleeping = true;
          this.phase = 'work';
        }
        this.addFloat('zzz', '#b8c8d8');
        return;
      }
      case 'tend': {
        const target = w.pawnById(t.targetId);
        if (!target) return this.finishTask();
        this.faceTowards(target.x, target.y);
        this.phase = 'work';
        this.work = 0;
        return;
      }
      case 'haulDrop': {
        if (!this.carry) return this.finishTask();
        if (!w.isWalkable(t.dest.x, t.dest.y)) {
          const spot = w.stockpileSpot(this.x, this.y) || w.nearestWalkable(this.x, this.y);
          t.dest = spot;
        }
        w.addItem(this.carry.type, this.carry.qty, t.dest.x, t.dest.y, { particles: false });
        this.carry = null;
        this.workAnim += 0.5;
        this.finishTask();
        return;
      }
      case 'move': case 'wander': case 'flee': {
        if (t.type === 'wander') this.idleTimer = 2 + w.rng() * 5;
        this.finishTask();
        return;
      }
      default:
        this.finishTask();
    }
  }

  sitDown(seat) {
    this.x = seat.x + 0.5;
    this.y = seat.y + 0.5;
    this.facing = Math.PI / 2;
    this.phase = 'work';
    this.work = 0;
    this.working = true;
  }

  tickBuild(sdt) {
    const w = this.world;
    const obj = w.objectById(this.task.objId);
    if (!obj || obj.dead || obj.built) return this.finishTask();
    const rate = this.workSpeed('construction') * sdt;
    this.work += rate;
    obj.work = this.work;
    if (w.rng() < sdt * 5) {
      w.spawnParticles('spark', obj.x + obj.w / 2, obj.y + obj.h / 2, 1, { spread: 0.25 });
    }
    if (this.work >= obj.workNeeded) {
      w.completeBuild(obj);
      this.gainSkill('construction', 0.3);
      this.addFloat('Built', '#a8d18a');
      this.finishTask();
    }
  }

  tickDeconstruct(sdt) {
    const w = this.world;
    const obj = w.objectById(this.task.objId);
    if (!obj || obj.dead) return this.finishTask();
    this.work += this.workSpeed('construction') * sdt;
    if (w.rng() < sdt * 5) w.spawnParticles(obj.type.includes('stone') ? 'stone' : 'wood', obj.x + obj.w / 2, obj.y + obj.h / 2, 1, { spread: 0.3 });
    if (this.work >= Math.max(0.6, obj.def.work * 0.65)) {
      const refund = {};
      for (const [k, v] of Object.entries(obj.def.cost || {})) refund[k] = Math.max(1, Math.ceil(v / 2));
      const x = obj.x, y = obj.y, type = obj.type;
      w.removeObject(obj, { terrain: obj.def.floor ? T.grass : undefined });
      for (const [k, v] of Object.entries(refund)) w.addItem(k, v, x, y);
      w.spawnParticles('dust', x + 0.5, y + 0.5, 10, { spread: 0.8 });
      w.designations.deconstruct.delete(obj.id);
      this.gainSkill('construction', 0.2);
      this.finishTask();
    }
  }

  tickChop(sdt) {
    const w = this.world;
    const obj = w.objectById(this.task.objId);
    if (!obj || obj.dead) return this.finishTask();
    this.work += this.workSpeed('mining') * sdt;
    obj.work = this.work;
    if (w.rng() < sdt * 8) {
      w.spawnParticles('wood', obj.x + 0.5, obj.y + 0.45, 2, { spread: 0.5 });
      w.spawnParticles('leaf', obj.x + 0.5, obj.y - 0.2, 2, { spread: 0.7 });
    }
    if (this.work >= obj.def.chopWork) {
      const qty = obj.def.wood || 8;
      const x = obj.x, y = obj.y;
      w.removeObject(obj);
      w.addItem('wood', Math.round(qty * (0.85 + w.rng() * 0.3)), x, y);
      w.placeNature('stump', x, y, { name: 'Stump', blocks: false, hp: 30, kind: 'stump', beauty: -1 });
      w.spawnParticles('leaf', x + 0.5, y + 0.2, 14, { spread: 1.2 });
      w.spawnParticles('wood', x + 0.5, y + 0.4, 6, { spread: 0.7 });
      w.designations.chop.delete(obj.id);
      w.stats.chopped++;
      this.gainSkill('mining', 0.35);
      this.addFloat('+wood', '#d8b77c');
      w.play('chop');
      this.finishTask();
    }
  }

  tickMine(sdt) {
    const w = this.world;
    const obj = w.objectById(this.task.objId);
    if (!obj || obj.dead) return this.finishTask();
    this.work += this.workSpeed('mining') * sdt;
    obj.work = this.work;
    if (w.rng() < sdt * 7) w.spawnParticles('stone', obj.x + 0.5, obj.y + 0.5, 2, { spread: 0.45 });
    if (this.work >= obj.def.mineWork) {
      const x = obj.x, y = obj.y;
      const stone = obj.def.stone || 0, steel = obj.def.steel || 0;
      w.removeObject(obj);
      if (stone) w.addItem('stone', Math.round(stone * (0.85 + w.rng() * 0.3)), x, y);
      if (steel) w.addItem('steel', Math.round(steel * (0.85 + w.rng() * 0.3)), x, y);
      w.setTerrain(x, y, T.gravel);
      w.spawnParticles('dust', x + 0.5, y + 0.5, 14, { spread: 1 });
      w.spawnParticles('stone', x + 0.5, y + 0.5, 6, { spread: 0.8 });
      w.designations.mine.delete(obj.id);
      w.stats.mined++;
      this.gainSkill('mining', 0.35);
      this.addFloat(steel ? '+steel' : '+stone', '#c3c6c9');
      w.play('mine');
      this.finishTask();
    }
  }

  tickHarvest(sdt) {
    const w = this.world;
    const key = w.idx(this.task.x, this.task.y);
    this.work += this.workSpeed('plants') * sdt;
    if (w.rng() < sdt * 4) w.spawnParticles('leaf', this.task.x + 0.5, this.task.y + 0.5, 1, { spread: 0.4 });
    if (this.work >= 1.1) {
      const yieldQty = Math.round(4 * (w.hasTech('agriculture') ? 1.3 : 1));
      w.addItem('grain', yieldQty, this.task.x, this.task.y);
      w.crops[key] = 0;
      w.cropPlanted[key] = 0;
      w.releaseCrop(this.task.x, this.task.y);
      w.stats.harvested += yieldQty;
      this.gainSkill('plants', 0.22);
      this.addFloat(`+${yieldQty} grain`, '#d8c477');
      this.finishTask();
    }
  }

  tickPlant(sdt) {
    const w = this.world;
    this.work += this.workSpeed('plants') * sdt;
    if (this.work >= 0.85) {
      const key = w.idx(this.task.x, this.task.y);
      w.crops[key] = 0.02;
      w.cropPlanted[key] = 1;
      w.releaseCrop(this.task.x, this.task.y);
      w.spawnParticles('dust', this.task.x + 0.5, this.task.y + 0.6, 2, { spread: 0.3 });
      this.gainSkill('plants', 0.15);
      this.finishTask();
    }
  }

  tickCook(sdt) {
    const w = this.world;
    const stove = w.objectById(this.task.objId);
    if (!stove || stove.dead) return this.finishTask();
    this.work += this.workSpeed('cooking') * sdt;
    if (w.rng() < sdt * 3) w.spawnParticles('smoke', stove.x + 0.5, stove.y + 0.2, 1, { spread: 0.2 });
    if (this.work >= 5.2) {
      let used = 0;
      if (w.consume('grain', 5)) used = 5;
      else if (w.consume('meat', 5)) used = 5;
      if (used) {
        const spot = w.freeAdjacent(stove, this) || w.nearestWalkable(this.x, this.y);
        w.addItem('meal', 3, spot.x, spot.y);
        w.stats.meals += 3;
        w.spawnParticles('spark', spot.x + 0.5, spot.y + 0.5, 2, { spread: 0.2, color: '#e0a060' });
        this.addFloat('+3 meals', '#e8c18c');
        this.gainSkill('cooking', 0.35);
        w.play('cook');
      } else {
        w.notice('bad', 'No food to cook', 'The cook found nothing in storage to turn into meals.');
      }
      this.finishTask();
    }
  }

  tickResearch(sdt) {
    const w = this.world;
    if (!w.research.active) return this.finishTask();
    if (!this.task.tech) this.task.tech = w.research.active;
    if (this.task.tech !== w.research.active) return this.finishTask();
    let rate = 1.55 * this.workSpeed('research');
    if (this.hasTrait('fastlearner')) rate *= 1.25;
    w.addResearch(rate * sdt);
    this.workAnim += sdt;
    if (w.rng() < sdt * 0.7) w.spawnParticles('spark', this.x + 0.2, this.y - 0.3, 1, { spread: 0.2, color: '#9ec8e8' });
    this.gainSkill('research', 0.02);
  }

  tickTend(sdt) {
    const w = this.world;
    const target = w.pawnById(this.task.targetId);
    if (!target || target.dead) return this.finishTask();
    this.work += this.workSpeed('medicine') * sdt * (w.hasTech('medicine') ? 1.6 : 1);
    if (this.work >= 2.6) {
      target.bleed = 0;
      target.hp = Math.min(target.maxHp, target.hp + 10 + this.skills.medicine * 2.2);
      target.downedTimer = Math.max(target.downedTimer, 1);
      w.spawnParticles('heal', target.x, target.y - 0.4, 6, { spread: 0.5 });
      this.addFloat('Tended', '#9fd18a');
      this.gainSkill('medicine', 0.3);
      w.play('tend');
      this.finishTask();
    }
  }

  tickEat(sdt, seated) {
    if (!this.task) return;
    this.work += sdt * (seated ? 1.25 : 1);
    if (this.work >= (seated ? 3.2 : 2.3)) {
      this.comfortBonus = seated ? 5 : -3;
      this.needs.joy = clamp(this.needs.joy + (seated ? 4 : -2), 0, 100);
      if (!seated) this.addFloat('Ate standing', '#c9a38a');
      this.finishTask();
    }
  }

  tickSleep(sdt) {
    if (this.world.raid?.active && this.alarm) { this.wake(); return; }
    this.workAnim += sdt * 0.4;
    if (this.sleeping && this.world.rng() < sdt * 0.22) this.world.spawnParticles('heal', this.x + 0.2, this.y - 0.5, 1, { spread: 0.1 });
    if (this.needs.rest >= 95) {
      this.sleeping = false;
      this.comfortBonus = 4;
      this.addFloat('Rested', '#a8c8d8');
      this.finishTask();
    }
    if (this.task?.bed && this.task.bed.dead) {
      this.sleeping = false;
      this.finishTask();
    }
  }

  // ---------------------------------------------------------------- combat AI
  updateCombat(sdt, gh) {
    const w = this.world;
    if (this.drafted) {
      if (!this.task || this.task.type !== 'attack') this.tryAutoFire();
      return;
    }
    if (w.raid?.active) {
      this.alarm = true;
      if (!this.task || !['attack', 'flee'].includes(this.task.type)) this.reactToRaid();
    } else if (this.alarm) {
      this.alarm = false;
      if (this.task && (this.task.type === 'attack' || this.task.type === 'flee')) this.finishTask();
    }
  }

  reactToRaid() {
    const w = this.world;
    const enemy = w.nearestRaider(this.x, this.y);
    if (!enemy) return;
    const d = dist(this.x, this.y, enemy.x, enemy.y);
    if (this.kind !== 'colonist') return;
    const wep = WEAPONS[this.weapon];
    const ranged = !!wep?.ranged;
    const brave = ranged || this.hasTrait('brawler') || this.skills.shooting >= 5 || d < 4.5;
    if (brave) {
      this.beginTask({ type: 'attack', targetId: enemy.id });
      return;
    }
    // Unarmed or timid colonists run for the house.
    let best = null, bd = Infinity;
    for (let y = 25; y <= 31; y++) {
      for (let x = 25; x <= 33; x++) {
        if (w.terrain[w.idx(x, y)] !== T.woodfloor) continue;
        if (!w.isWalkable(x, y)) continue;
        const dd = (x - 29) ** 2 + (y - 29) ** 2 + w.rng() * 4;
        if (dd < bd) { bd = dd; best = { x, y }; }
      }
    }
    if (!best) {
      const a = Math.atan2(this.y - enemy.y, this.x - enemy.x);
      best = w.nearestWalkable(this.x + Math.cos(a) * 6, this.y + Math.sin(a) * 6);
    }
    this.beginTask({ type: 'flee', x: best.x, y: best.y });
  }

  findRaiderInRange(range) {
    const w = this.world;
    if (!w.raid) return null;
    let best = null, bd = Infinity;
    for (const p of w.raid.attackers) {
      if (p.dead || p.downed) continue;
      const d = dist(this.x, this.y, p.x, p.y);
      if (d < range && d < bd && w.lineClear(this.x, this.y, p.x, p.y)) { bd = d; best = p; }
    }
    return best;
  }

  tryAutoFire() {
    const wep = WEAPONS[this.weapon];
    if (!wep?.ranged) return false;
    const target = this.findRaiderInRange(wep.range);
    if (!target) return false;
    this.faceTowards(target.x, target.y);
    return this.tryShoot(target);
  }

  tryShoot(target) {
    const w = this.world;
    const wep = WEAPONS[this.weapon];
    if (!wep?.ranged || this.cooldown > 0 || !target || target.dead) return false;
    const d = dist(this.x, this.y, target.x, target.y);
    if (d > wep.range) return false;
    if (!w.lineClear(this.x, this.y, target.x, target.y)) return false;
    this.faceTowards(target.x, target.y);
    const burst = wep.burst || 1;
    const dmg = wep.dmg * (w.hasTech('gunsmithing') ? 1.2 : 1);
    for (let i = 0; i < burst; i++) w.shoot(this, target, { dmg });
    this.cooldown = wep.cooldown * (1.05 - this.skills.shooting * 0.018);
    this.attackFlash = 0.16;
    this.recoil = 0.16;
    this.workAnim += 0.4;
    return true;
  }

  tryMelee(target) {
    const w = this.world;
    if (!target || target.dead || this.cooldown > 0) return false;
    const d = dist(this.x, this.y, target.x, target.y);
    if (d > 1.35) return false;
    this.faceTowards(target.x, target.y);
    w.melee(this, target);
    this.cooldown = WEAPONS[this.weapon]?.cooldown || 1;
    this.workAnim += 0.5;
    return true;
  }

  approachCombat(task, hunt) {
    task.phase = 'go';
    this.phase = 'go';
    this.path = [];
    this.repathTimer = 0;
    this.working = false;
    if (hunt) this.task = task;
  }

  updateCombatTask(sdt) {
    const w = this.world;
    const t = this.task;
    if (!t) return;
    let target = t.target ? w.pawnById(t.target.id) : (t.targetId ? w.pawnById(t.targetId) : null);
    if (t.targetId) target = w.pawnById(t.targetId) || target;
    if (!target || target.dead) {
      if (t.type === 'hunt' && target) w.designations.hunt.delete(target.id);
      this.finishTask();
      return;
    }
    t.target = target;
    t.targetId = target.id;
    if (t.type === 'attack' && target.downed) { this.finishTask(); return; }
    if (t.type === 'attack' && !w.raid && !this.drafted) { this.finishTask(); return; }
    const wep = WEAPONS[this.weapon];
    const ranged = !!wep?.ranged;
    const stop = ranged ? Math.min(wep.range * 0.9, 9) : 1.15;
    const d = dist(this.x, this.y, target.x, target.y);
    if (d <= stop) {
      this.path = [];
      this.phase = 'work';
      this.working = true;
      this.faceTowards(target.x, target.y);
      this.workAnim += sdt;
      if (ranged) this.tryShoot(target);
      else this.tryMelee(target);
      return;
    }
    this.phase = 'go';
    this.working = false;
    this.repathTimer -= sdt;
    if (!this.path.length || this.repathTimer <= 0) {
      this.repathTimer = 0.7;
      const path = w.pathToTile(this, Math.floor(target.x), Math.floor(target.y));
      if (path) this.path = path;
      else {
        if (t.type === 'hunt') w.notice('info', 'Hunt failed', `${this.name} could not reach the animal.`);
        this.finishTask();
        return;
      }
    }
    this.moveAlong(sdt);
  }

  // ---------------------------------------------------------------- raiders
  updateRaider(sdt, gh) {
    const w = this.world;
    this.working = false;
    if (this.cooldown > 0) this.cooldown -= sdt;
    const target = w.nearestColonist(this.x, this.y);
    if (target) {
      const d = dist(this.x, this.y, target.x, target.y);
      const wep = WEAPONS[this.weapon] || WEAPONS.knife;
      if (wep.ranged) {
        const inRange = d <= wep.range * 0.92;
        if (inRange && w.lineClear(this.x, this.y, target.x, target.y)) {
          this.path = [];
          this.faceTowards(target.x, target.y);
          if (this.cooldown <= 0) {
            w.shoot(this, target, { dmg: wep.dmg });
            this.cooldown = wep.cooldown * 1.35;
            this.attackFlash = 0.16;
            this.recoil = 0.16;
          }
        } else {
          this.chase(target, sdt, 0.65);
        }
      } else {
        if (d <= 1.3) {
          this.path = [];
          this.faceTowards(target.x, target.y);
          if (this.cooldown <= 0) {
            w.melee(this, target);
            this.cooldown = wep.cooldown * 1.2;
          }
        } else {
          this.chase(target, sdt, 0.55);
        }
      }
    } else {
      // No defenders left: break the colony apart.
      let obj = null, bd = Infinity;
      for (const o of w.objects) {
        if (o.dead || !o.built || !o.def.blocks) continue;
        if (o.x < 20 || o.x > 38 || o.y < 22 || o.y > 38) continue;
        const d = dist(this.x, this.y, o.x, o.y);
        if (d < bd) { bd = d; obj = o; }
      }
      if (obj) {
        if (bd <= 1.6) {
          this.path = [];
          this.faceTowards(obj.x + 0.5, obj.y + 0.5);
          if (this.cooldown <= 0) {
            w.damageObject(obj, 14, this.name);
            this.cooldown = 1.1;
            this.workAnim += 0.5;
          }
        } else {
          this.chase({ x: obj.x + 0.5, y: obj.y + 0.5 }, sdt, 0.9);
        }
      }
    }
    if (this.attackFlash > 0) this.attackFlash -= sdt;
  }

  chase(target, sdt, interval) {
    this.repathTimer -= sdt;
    if (!this.path.length || this.repathTimer <= 0) {
      this.repathTimer = interval;
      const path = this.world.pathToTile(this, Math.floor(target.x), Math.floor(target.y));
      if (path) this.path = path;
      else {
        // Try to break a wall in the way.
        for (const o of this.world.objects) {
          if (o.dead || !o.built || !o.def.blocks) continue;
          if (dist(this.x, this.y, o.x + o.w / 2, o.y + o.h / 2) < 1.8) {
            if (this.cooldown <= 0) {
              this.world.damageObject(o, 12, this.name);
              this.cooldown = 1.2;
            }
            return;
          }
        }
      }
    }
    this.moveAlong(sdt);
    this.working = false;
  }

  // ---------------------------------------------------------------- animals
  updateAnimal(sdt, gh) {
    const w = this.world;
    this.needs.food = Math.max(55, this.needs.food);
    this.needs.rest = Math.max(55, this.needs.rest);
    this.working = false;
    this.fleeTimer = Math.max(0, (this.fleeTimer || 0) - sdt);
    const threat = w.nearestRaider(this.x, this.y);
    const threatD = threat ? dist(this.x, this.y, threat.x, threat.y) : Infinity;
    const recentlyHurt = w.animTime - this.lastHurt < 2.5;
    if ((threat && threatD < 7) || recentlyHurt) {
      if (this.fleeTimer <= 0) {
        this.fleeTimer = 1.2;
        const angle = threat ? Math.atan2(this.y - threat.y, this.x - threat.x) : w.rng() * TAU;
        const spot = w.nearestWalkable(this.x + Math.cos(angle) * 5, this.y + Math.sin(angle) * 5);
        this.beginTask({ type: 'flee', x: spot.x, y: spot.y });
      }
      if (this.task) { this.moveAlong(sdt); if (!this.path.length) this.task = null; }
      return;
    }
    if (this.task) {
      if (this.phase === 'go') {
        if (this.moveAlong(sdt)) this.task = null;
      } else this.task = null;
      return;
    }
    this.wanderTimer -= sdt;
    if (this.wanderTimer <= 0) {
      this.wanderTimer = 4 + w.rng() * 8;
      let hx = this.homeX ?? this.x, hy = this.homeY ?? this.y;
      let best = null;
      for (let i = 0; i < 10; i++) {
        const a = w.rng() * TAU, r = 1 + w.rng() * (this.animalType === 'muffalo' ? 6 : 4);
        const x = Math.round(hx + Math.cos(a) * r), y = Math.round(hy + Math.sin(a) * r);
        if (w.isWalkable(x, y) && !w.objectAt(x, y)) { best = { x, y }; break; }
      }
      if (best) {
        this.beginTask({ type: 'wander', x: best.x, y: best.y });
        this.needs.food = 100;
      }
    }
  }
}
