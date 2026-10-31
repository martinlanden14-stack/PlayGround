/* ============================================================
   Enemies — crawlers, drones, brutes + their projectiles
   ============================================================ */
import * as THREE from 'three';
import { collideCircle } from './world.js';

const DEFS = {
  crawler: {
    hp: 30, speed: 4.2, radius: 0.62, modelScale: 1.25,
    bodyRadius: 0.74, bodyY: 0.6, headRadius: 0.34, headY: 0.62,
    score: 100, color: 0xffa02e, damage: 12, melee: true,
    hitColor: 0xffb347,
  },
  drone: {
    hp: 48, speed: 3.5, radius: 0.7, modelScale: 1.15,
    bodyRadius: 0.68, bodyY: 0, headRadius: 0.46, headY: 0,
    score: 150, color: 0xff2d7a, damage: 8, melee: false,
    flying: true, hitColor: 0xff5c9c,
  },
  brute: {
    hp: 170, speed: 2.25, radius: 1.0, modelScale: 1.15,
    bodyRadius: 1.05, bodyY: 1.3, headRadius: 0.48, headY: 2.4,
    score: 400, color: 0xff3b4d, damage: 22, melee: true,
    hitColor: 0xff6b7a,
  },
};

const smooth = (k) => k * k * (3 - 2 * k);

function raySphere(o, d, c, r) {
  const ox = c.x - o.x;
  const oy = c.y - o.y;
  const oz = c.z - o.z;
  const tca = ox * d.x + oy * d.y + oz * d.z;
  if (tca < 0) return -1;
  const d2 = ox * ox + oy * oy + oz * oz - tca * tca;
  const r2 = r * r;
  if (d2 > r2) return -1;
  return tca - Math.sqrt(r2 - d2);
}

/* ============================================================
   Enemy
   ============================================================ */

class Enemy {
  constructor(type, pos, scene, wave = 1) {
    this.type = type;
    this.def = DEFS[type];
    this.scene = scene;
    this.wave = wave;
    this.maxHp = Math.round(this.def.hp * (1 + (wave - 1) * 0.075));
    this.hp = this.maxHp;
    this.speed = this.def.speed * (1 + Math.min(0.35, (wave - 1) * 0.02));
    this.alive = true;
    this.spawnT = 0;
    this.flash = 0;
    this.punch = 0;
    this.attackCd = 0.6 + Math.random() * 0.5;
    this.fireCd = 1.2 + Math.random() * 1.8;
    this.seed = Math.random() * 10;
    this.stuckT = 0;
    this.avoidT = 0;
    this.avoidDir = 1;
    this.orbitDir = Math.random() < 0.5 ? 1 : -1;
    this.orbitAngle = Math.random() * Math.PI * 2;
    this.bodyCenter = new THREE.Vector3();
    this.headCenter = new THREE.Vector3();
    this.group = new THREE.Group();
    this.group.position.copy(pos);
    this.group.rotation.y = Math.random() * Math.PI * 2;
    this.parts = {};
    this._mats = [];
    this._geos = [];

    this._build();
    this.group.scale.setScalar(0.01);
    scene.add(this.group);
  }

  _mat(opts) {
    const m = new THREE.MeshStandardMaterial(opts);
    this._mats.push(m);
    return m;
  }

  _basic(color) {
    const m = new THREE.MeshBasicMaterial({ color, toneMapped: false });
    this._mats.push(m);
    return m;
  }

  _geo(g) {
    this._geos.push(g);
    return g;
  }

  _glow(color, size, opacity = 0.55) {
    const m = new THREE.SpriteMaterial({
      map: Enemy.glowTex, color, transparent: true, opacity,
      blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false,
    });
    this._mats.push(m);
    const s = new THREE.Sprite(m);
    s.scale.set(size, size, 1);
    this.group.add(s);
    return s;
  }

  _build() {
    const d = this.def;
    this.bodyMat = this._mat({
      color: this.type === 'brute' ? 0x3a2630 : this.type === 'drone' ? 0x273250 : 0x2c3550,
      metalness: 0.7,
      roughness: 0.35,
      emissive: this.type === 'brute' ? 0x5a0a16 : this.type === 'drone' ? 0x5a0830 : 0x5a2600,
      emissiveIntensity: 1,
    });
    this.baseEmissive = this.bodyMat.emissive.clone();
    const accent = this._basic(d.color);
    const dark = this._mat({ color: 0x090d16, metalness: 0.6, roughness: 0.5 });

    if (this.type === 'drone') {
      const core = new THREE.Mesh(this._geo(new THREE.IcosahedronGeometry(0.6, 0)), this.bodyMat);
      this.group.add(core);
      const pivot = new THREE.Group();
      this.group.add(pivot);
      const ring = new THREE.Mesh(this._geo(new THREE.TorusGeometry(0.98, 0.075, 6, 28)), accent);
      ring.rotation.x = Math.PI / 2;
      pivot.add(ring);
      this.parts.ringPivot = pivot;
      this.parts.ring = ring;

      const eye = new THREE.Mesh(this._geo(new THREE.SphereGeometry(0.21, 10, 10)), accent);
      eye.position.set(0, 0, 0.52);
      this.group.add(eye);
      this.parts.eye = eye;

      for (const sx of [-1, 1]) {
        const fin = new THREE.Mesh(this._geo(new THREE.BoxGeometry(0.14, 0.34, 0.58)), dark);
        fin.position.set(sx * 0.56, -0.2, -0.08);
        fin.rotation.z = sx * 0.35;
        this.group.add(fin);
        const tip = new THREE.Mesh(this._geo(new THREE.BoxGeometry(0.05, 0.05, 0.42)), accent);
        tip.position.set(sx * 0.62, -0.24, -0.1);
        this.group.add(tip);
      }
      this._glow(d.color, 2.7, 0.5);
    } else if (this.type === 'crawler') {
      const body = new THREE.Mesh(this._geo(new THREE.BoxGeometry(0.95, 0.5, 1.3)), this.bodyMat);
      body.position.y = 0.55;
      this.group.add(body);

      for (const sx of [-1, 1]) {
        const panel = new THREE.Mesh(this._geo(new THREE.BoxGeometry(0.035, 0.16, 0.9)), accent);
        panel.position.set(sx * 0.49, 0.56, 0);
        this.group.add(panel);
      }

      const spine = new THREE.Mesh(this._geo(new THREE.BoxGeometry(0.12, 0.07, 0.95)), accent);
      spine.position.set(0, 0.84, 0);
      this.group.add(spine);

      const eye = new THREE.Mesh(this._geo(new THREE.SphereGeometry(0.13, 10, 10)), accent);
      eye.position.set(0, 0.66, 0.66);
      this.group.add(eye);
      this.parts.eye = eye;

      for (const sx of [-1, 1]) {
        const eye2 = new THREE.Mesh(this._geo(new THREE.SphereGeometry(0.07, 8, 8)), accent);
        eye2.position.set(sx * 0.22, 0.64, 0.65);
        this.group.add(eye2);
      }

      const mouth = new THREE.Mesh(this._geo(new THREE.BoxGeometry(0.46, 0.06, 0.05)), accent);
      mouth.position.set(0, 0.45, 0.68);
      this.group.add(mouth);

      const jaw = new THREE.Mesh(this._geo(new THREE.BoxGeometry(0.6, 0.12, 0.24)), dark);
      jaw.position.set(0, 0.38, 0.7);
      this.group.add(jaw);

      this.parts.legs = [];
      for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
        const leg = new THREE.Mesh(this._geo(new THREE.BoxGeometry(0.12, 0.5, 0.12)), dark);
        leg.position.set(sx * 0.5, 0.3, sz * 0.44);
        leg.rotation.z = sx * 0.22;
        this.group.add(leg);
        this.parts.legs.push(leg);
      }
      this._glow(d.color, 1.9, 0.42);
    } else {
      const torso = new THREE.Mesh(this._geo(new THREE.BoxGeometry(1.7, 1.7, 1.4)), this.bodyMat);
      torso.position.y = 1.2;
      this.group.add(torso);

      const core = new THREE.Mesh(this._geo(new THREE.SphereGeometry(0.4, 12, 12)), accent);
      core.position.set(0, 1.3, 0.72);
      this.group.add(core);
      this.parts.eye = core;

      for (const sx of [-1, 1]) {
        const band = new THREE.Mesh(this._geo(new THREE.BoxGeometry(0.1, 0.8, 0.05)), accent);
        band.position.set(sx * 0.55, 1.2, 0.72);
        this.group.add(band);
      }

      const head = new THREE.Mesh(this._geo(new THREE.BoxGeometry(0.62, 0.46, 0.62)), dark);
      head.position.set(0, 2.2, 0);
      this.group.add(head);
      const visor = new THREE.Mesh(this._geo(new THREE.BoxGeometry(0.52, 0.11, 0.05)), accent);
      visor.position.set(0, 2.21, 0.32);
      this.group.add(visor);

      for (const sx of [-1, 1]) {
        const shoulder = new THREE.Mesh(this._geo(new THREE.BoxGeometry(0.5, 0.8, 1.0)), dark);
        shoulder.position.set(sx * 1.05, 1.6, 0);
        this.group.add(shoulder);

        const stripe = new THREE.Mesh(this._geo(new THREE.BoxGeometry(0.08, 0.7, 0.08)), accent);
        stripe.position.set(sx * 1.28, 1.6, 0.48);
        this.group.add(stripe);

        const arm = new THREE.Mesh(this._geo(new THREE.BoxGeometry(0.4, 1.15, 0.42)), this.bodyMat);
        arm.position.set(sx * 1.08, 0.85, 0.06);
        this.group.add(arm);
        if (!this.parts.arms) this.parts.arms = [];
        this.parts.arms.push(arm);

        const leg = new THREE.Mesh(this._geo(new THREE.BoxGeometry(0.52, 0.8, 0.62)), dark);
        leg.position.set(sx * 0.45, 0.4, 0);
        this.group.add(leg);
      }
      this._glow(d.color, 3.8, 0.45);
    }
  }

  /** @returns {boolean} true if killed */
  takeDamage(amount, head, point) {
    if (!this.alive) return false;
    this.hp -= amount;
    this.flash = 1;
    this.punch = 1;
    if (point) {
      const d = this.def;
      this.bodyCenter.set(this.group.position.x, this.group.position.y + d.bodyY, this.group.position.z);
    }
    if (this.hp <= 0) {
      this.alive = false;
      return true;
    }
    return false;
  }

  update(dt, t, playerPos, manager) {
    if (!this.alive) return;
    const d = this.def;
    const p = this.group.position;

    // spawn pop
    if (this.spawnT < 0.6) {
      this.spawnT += dt;
      const k = smooth(Math.min(1, this.spawnT / 0.6));
      this.group.scale.setScalar(d.modelScale * (0.12 + 0.88 * k));
    }

    // hit flash + punch
    this.flash = Math.max(0, this.flash - dt * 6.5);
    this.bodyMat.emissive.copy(this.baseEmissive).addScalar(this.flash * 0.9);
    this.punch = Math.max(0, this.punch - dt * 7);
    if (this.spawnT >= 0.6) {
      this.group.scale.setScalar(d.modelScale * (1 + this.punch * 0.07));
    }

    const dx = playerPos.x - p.x;
    const dz = playerPos.z - p.z;
    const dist = Math.hypot(dx, dz);
    const nx = dist > 0.001 ? dx / dist : 0;
    const nz = dist > 0.001 ? dz / dist : 0;

    this.attackCd = Math.max(0, this.attackCd - dt);
    this.fireCd = Math.max(0, this.fireCd - dt);

    if (this.type === 'drone') {
      this.orbitAngle += dt * this.orbitDir * 0.55;
      const want = 9.2;
      const targetX = playerPos.x + Math.cos(this.orbitAngle) * want;
      const targetZ = playerPos.z + Math.sin(this.orbitAngle) * want;
      let tx = targetX - p.x;
      let tz = targetZ - p.z;
      const tl = Math.hypot(tx, tz);
      if (tl > 0.001) { tx /= tl; tz /= tl; }
      const approach = Math.min(1, Math.max(0.15, (dist - 6.5) / 5));
      p.x += tx * this.speed * dt * approach;
      p.z += tz * this.speed * dt * approach;

      const targetY = 2.25 + Math.sin(t * 1.6 + this.seed) * 0.32;
      p.y += (targetY - p.y) * Math.min(1, dt * 3);
      collideCircle(p, d.radius, manager.world.colliders);

      // face the player
      this.group.lookAt(playerPos.x, p.y, playerPos.z);
      if (this.parts.ringPivot) this.parts.ringPivot.rotation.y += dt * 2.2;
      if (this.parts.eye) this.parts.eye.scale.setScalar(1 + Math.sin(t * 8 + this.seed) * 0.12);

      // shoot
      if (this.fireCd <= 0 && dist < 30) {
        const from = new THREE.Vector3(p.x, p.y, p.z);
        const to = new THREE.Vector3(playerPos.x, playerPos.y + 1.25, playerPos.z);
        if (manager.world.lineOfSight(from, to)) {
          const dir = to.clone().sub(from).normalize();
          dir.x += (Math.random() - 0.5) * 0.045;
          dir.y += (Math.random() - 0.5) * 0.03;
          dir.z += (Math.random() - 0.5) * 0.045;
          dir.normalize();
          manager.spawnProjectile(from, dir, 12, d.damage);
          this.fireCd = Math.max(1.15, 2.35 - manager.wave * 0.07) + Math.random() * 0.7;
          if (this.parts.eye) this.parts.eye.scale.setScalar(1.9);
        } else {
          this.fireCd = 0.4;
        }
      }
    } else {
      // ground units: charge the player
      const weave = this.type === 'crawler' ? Math.sin(t * 4 + this.seed) * 0.28 : 0;
      let wx = nx * Math.cos(weave) - nz * Math.sin(weave);
      let wz = nx * Math.sin(weave) + nz * Math.cos(weave);
      const stop = this.type === 'brute' ? 1.5 : 0.75;

      // sidestep when a barrier blocks the direct charge
      if (this.avoidT > 0) {
        this.avoidT -= dt;
        const sx = -nz * this.avoidDir;
        const sz = nx * this.avoidDir;
        wx = nx * 0.32 + sx * 0.95;
        wz = nz * 0.32 + sz * 0.95;
        const ml = Math.hypot(wx, wz) || 1;
        wx /= ml;
        wz /= ml;
      }

      const prevX = p.x;
      const prevZ = p.z;
      if (dist > stop) {
        const boost = this.avoidT > 0 ? 1.06 : 1;
        p.x += wx * this.speed * dt * boost;
        p.z += wz * this.speed * dt * boost;
      }
      collideCircle(p, d.radius, manager.world.colliders);

      // stuck detection: if collision ate most of the intended step,
      // commit to a perpendicular sidestep for a moment
      if (dist > stop + 0.6) {
        const wanted = this.speed * dt;
        const moved = Math.hypot(p.x - prevX, p.z - prevZ);
        if (wanted > 0.001 && moved < wanted * 0.38) {
          this.stuckT += dt;
        } else {
          this.stuckT = Math.max(0, this.stuckT - dt * 2.5);
        }
        if (this.stuckT > 0.26 && this.avoidT <= 0) {
          this.stuckT = 0;
          this.avoidT = 0.5 + Math.random() * 0.45;
          this.avoidDir = Math.random() < 0.5 ? 1 : -1;
        }
      } else {
        this.stuckT = Math.max(0, this.stuckT - dt * 3);
      }

      if (this.type === 'crawler') {
        p.y = Math.sin(t * 9 + this.seed) * 0.055;
        this.group.lookAt(playerPos.x, p.y, playerPos.z);
        if (this.parts.legs) {
          const ph = t * 13 + this.seed;
          this.parts.legs.forEach((leg, i) => {
            leg.rotation.x = Math.sin(ph + i * Math.PI * 0.5) * 0.55;
          });
        }
      } else {
        p.y = Math.sin(t * 3 + this.seed) * 0.03;
        this.group.lookAt(playerPos.x, p.y, playerPos.z);
        if (this.parts.arms) {
          const ph = t * 3.4 + this.seed;
          this.parts.arms[0].rotation.x = Math.sin(ph) * 0.35;
          this.parts.arms[1].rotation.x = -Math.sin(ph) * 0.35;
        }
      }

      // melee
      const reach = d.radius + 0.85;
      if (dist < reach && this.attackCd <= 0) {
        this.attackCd = this.type === 'brute' ? 1.45 : 1.1;
        manager.onPlayerDamage(d.damage, p);
        this.punch = 1;
        if (this.type === 'brute') {
          manager.fx.burst(new THREE.Vector3(p.x, 1.2, p.z), d.color, 10, 5, 0.35, 8);
        }
      }
    }

    // hit spheres
    const d2 = this.def;
    this.bodyCenter.set(p.x, p.y + d2.bodyY, p.z);
    this.headCenter.set(p.x, p.y + d2.headY, p.z);
  }

  dispose() {
    this.scene.remove(this.group);
    for (const g of this._geos) g.dispose();
    for (const m of this._mats) m.dispose();
  }
}

/* ============================================================
   EnemyManager
   ============================================================ */

export class EnemyManager {
  constructor(scene, world, fx, audio, callbacks) {
    this.scene = scene;
    this.world = world;
    this.fx = fx;
    this.audio = audio;
    this.callbacks = callbacks;
    this.enemies = [];
    this.wave = 1;
    this.maxProjectiles = 26;
    this.projectiles = [];
    this._initProjectiles();
    Enemy.glowTex = world.glowTex;
  }

  _initProjectiles() {
    const geo = new THREE.SphereGeometry(0.14, 8, 8);
    for (let i = 0; i < this.maxProjectiles; i++) {
      const mat = new THREE.MeshBasicMaterial({ color: 0xff5c9c, toneMapped: false });
      const mesh = new THREE.Mesh(geo, mat);
      const glowMat = new THREE.SpriteMaterial({
        map: this.world.glowTex, color: 0xff2d7a, transparent: true, opacity: 0.8,
        blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false,
      });
      const glow = new THREE.Sprite(glowMat);
      glow.scale.set(1.1, 1.1, 1);
      mesh.add(glow);
      mesh.visible = false;
      mesh.frustumCulled = false;
      this.scene.add(mesh);
      this.projectiles.push({
        mesh, glow, active: false, vel: new THREE.Vector3(), life: 0, damage: 8,
        prev: new THREE.Vector3(), dir: new THREE.Vector3(),
      });
    }
  }

  get aliveCount() {
    let n = 0;
    for (const e of this.enemies) if (e.alive) n++;
    return n;
  }

  spawn(type, pos) {
    const enemy = new Enemy(type, pos, this.scene, this.wave);
    this.enemies.push(enemy);
    this.fx.spawnRing(pos, enemy.def.color);
    return enemy;
  }

  update(dt, t, playerPos) {
    // enemies
    for (const e of this.enemies) {
      if (!e.alive) continue;
      e.update(dt, t, playerPos, this);
    }

    // soft separation so the swarm doesn't stack
    const list = this.enemies;
    for (let i = 0; i < list.length; i++) {
      const a = list[i];
      if (!a.alive) continue;
      for (let j = i + 1; j < list.length; j++) {
        const b = list[j];
        if (!b.alive) continue;
        const dx = b.group.position.x - a.group.position.x;
        const dz = b.group.position.z - a.group.position.z;
        const min = a.def.radius + b.def.radius + 0.25;
        const d2 = dx * dx + dz * dz;
        if (d2 > 0.0001 && d2 < min * min) {
          const d = Math.sqrt(d2);
          const push = ((min - d) / d) * 0.5;
          a.group.position.x -= dx * push;
          a.group.position.z -= dz * push;
          b.group.position.x += dx * push;
          b.group.position.z += dz * push;
        }
      }
    }

    // remove dead
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const e = this.enemies[i];
      if (e.alive) continue;
      this.fx.explosion(e.bodyCenter, e.def.color);
      this.enemies.splice(i, 1);
      e.dispose();
    }

    this._updateProjectiles(dt, playerPos);
  }

  spawnProjectile(from, dir, speed, damage) {
    let p = this.projectiles.find((x) => !x.active);
    if (!p) {
      p = this.projectiles[0];
      p.active = false;
    }
    p.active = true;
    p.mesh.visible = true;
    p.mesh.position.copy(from);
    p.prev.copy(from);
    p.dir.copy(dir).normalize();
    p.vel.copy(p.dir).multiplyScalar(speed);
    p.life = 5.5;
    p.damage = damage;
    this.audio.enemyShoot();
  }

  _updateProjectiles(dt, playerPos) {
    const playerCenter = new THREE.Vector3(playerPos.x, playerPos.y + 1.1, playerPos.z);
    for (const p of this.projectiles) {
      if (!p.active) continue;
      p.prev.copy(p.mesh.position);
      p.mesh.position.addScaledVector(p.vel, dt);
      p.life -= dt;

      const step = p.prev.distanceTo(p.mesh.position) + 0.05;
      const hitWall = this.world.raycast(p.prev, p.dir, step + 0.1);
      const hitPlayer = p.mesh.position.distanceTo(playerCenter) < 0.62;

      if (hitPlayer) {
        this.onPlayerDamage(p.damage, p.mesh.position);
        this.fx.burst(p.mesh.position, 0xff2d7a, 8, 3.5, 0.3, 4);
        p.active = false;
      } else if (hitWall < step + 0.08 || p.life <= 0 || p.mesh.position.y < 0.05) {
        this.fx.impact(p.mesh.position, 0xff5c9c);
        p.active = false;
      }
      if (!p.active) p.mesh.visible = false;
    }
  }

  onPlayerDamage(amount, source) {
    this.callbacks.onPlayerDamage?.(amount, source);
  }

  /** Hitscan against enemy spheres. Returns { enemy, t, head } or null. */
  raycast(origin, dir, maxDist = 90) {
    let best = null;
    for (const e of this.enemies) {
      if (!e.alive || e.spawnT < 0.12) continue;
      const tb = raySphere(origin, dir, e.bodyCenter, e.def.bodyRadius);
      if (tb >= 0 && tb < maxDist && (!best || tb < best.t)) {
        best = { enemy: e, t: tb, head: false };
      }
      const th = raySphere(origin, dir, e.headCenter, e.def.headRadius);
      if (th >= 0 && th < maxDist && (!best || th < best.t)) {
        best = { enemy: e, t: th, head: true };
      }
    }
    return best;
  }

  damage(enemy, amount, head, point) {
    const killed = enemy.takeDamage(amount, head, point);
    if (killed) {
      this.callbacks.onKill?.(enemy, head);
    } else {
      this.fx.burst(point || enemy.bodyCenter, enemy.def.hitColor, head ? 10 : 6, 3.2, 0.28, 5);
      this.callbacks.onHit?.(enemy, head);
    }
    return killed;
  }

  clear() {
    for (const e of this.enemies) e.dispose();
    this.enemies.length = 0;
    for (const p of this.projectiles) {
      p.active = false;
      p.mesh.visible = false;
    }
  }
}
