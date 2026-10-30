import * as THREE from 'three';
import { glowTexture, shadowTexture } from './textures.js';

export const ENEMY_TYPES = {
  drone: {
    name: 'DRONE',
    hp: 38,
    radius: 1.0,
    speed: 3.1,
    score: 100,
    color: 0xff9a3c,
    hover: 2.05,
    fireRate: 2.25,
    range: 14,
    projectileDamage: 7,
    projectileSpeed: 13,
    burst: 1,
    kind: 'shooter',
  },
  seeker: {
    name: 'SEEKER',
    hp: 24,
    radius: 0.82,
    speed: 5.0,
    score: 120,
    color: 0xff2d9b,
    hover: 1.45,
    fireRate: 0,
    range: 0,
    projectileDamage: 0,
    projectileSpeed: 0,
    burst: 0,
    kind: 'kamikaze',
    contactDamage: 15,
  },
  titan: {
    name: 'TITAN',
    hp: 145,
    radius: 1.55,
    speed: 2.0,
    score: 320,
    color: 0x35f0ff,
    hover: 2.4,
    fireRate: 2.45,
    range: 17,
    projectileDamage: 13,
    projectileSpeed: 11,
    burst: 3,
    kind: 'shooter',
  },
  warden: {
    name: 'WARDEN',
    hp: 760,
    radius: 2.5,
    speed: 1.35,
    score: 1800,
    color: 0xa45bff,
    hover: 3.15,
    fireRate: 1.35,
    range: 22,
    projectileDamage: 15,
    projectileSpeed: 10,
    burst: 5,
    kind: 'shooter',
    boss: true,
  },
};

const _v1 = new THREE.Vector3();
const _v2 = new THREE.Vector3();
const _v3 = new THREE.Vector3();
const _color = new THREE.Color();

const GEO = {
  shellSmall: new THREE.IcosahedronGeometry(0.55, 0),
  shellSeeker: new THREE.OctahedronGeometry(0.52, 0),
  shellTitan: new THREE.DodecahedronGeometry(1.05, 0),
  shellWarden: new THREE.IcosahedronGeometry(1.65, 0),
  core: new THREE.SphereGeometry(0.24, 12, 10),
  coreBig: new THREE.SphereGeometry(0.42, 14, 12),
  coreBoss: new THREE.SphereGeometry(0.78, 16, 14),
  ring: new THREE.TorusGeometry(0.86, 0.035, 5, 36),
  ringBig: new THREE.TorusGeometry(1.42, 0.05, 5, 44),
  ringBoss: new THREE.TorusGeometry(2.15, 0.07, 6, 52),
  spike: new THREE.ConeGeometry(0.09, 0.55, 5),
  satellite: new THREE.SphereGeometry(0.15, 8, 6),
};

const SHARED = {
  wire: new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.38 }),
  ring: new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }),
  ringSoft: new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }),
  glowSprite: new THREE.SpriteMaterial({ map: glowTexture(), color: 0xffffff, transparent: true, opacity: 0.46, blending: THREE.AdditiveBlending, depthWrite: false }),
  shadow: new THREE.MeshBasicMaterial({ map: shadowTexture(), transparent: true, opacity: 0.5, depthWrite: false, color: 0x000000 }),
};

const WIRE_GEO = {
  drone: new THREE.WireframeGeometry(GEO.shellSmall),
  seeker: new THREE.WireframeGeometry(GEO.shellSeeker),
  titan: new THREE.WireframeGeometry(GEO.shellTitan),
  warden: new THREE.WireframeGeometry(GEO.shellWarden),
};

class Projectile {
  constructor(scene) {
    this.group = new THREE.Group();
    this.core = new THREE.Mesh(
      new THREE.SphereGeometry(0.14, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false })
    );
    this.glow = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: glowTexture(), color: 0xffffff, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    this.glow.scale.setScalar(1.15);
    this.group.add(this.core, this.glow);
    this.group.visible = false;
    this.group.renderOrder = 3;
    this.scene = scene;
    scene.add(this.group);
    this.active = false;
    this.pos = new THREE.Vector3();
    this.vel = new THREE.Vector3();
    this.life = 0;
    this.damage = 0;
    this.radius = 0.18;
  }

  spawn(pos, vel, color, damage, radius = 0.18) {
    this.pos.copy(pos);
    this.vel.copy(vel);
    this.damage = damage;
    this.radius = radius;
    this.life = 5;
    this.active = true;
    this.group.visible = true;
    this.group.position.copy(pos);
    this.core.material.color.setHex(0xffffff);
    this.glow.material.color.setHex(color);
    this.core.scale.setScalar(radius / 0.18);
    this.glow.scale.setScalar(1.15 * (radius / 0.18));
  }

  deactivate() {
    this.active = false;
    this.life = 0;
    this.group.visible = false;
  }
}

export class EnemyManager {
  constructor(scene, effects, hooks = {}) {
    this.scene = scene;
    this.effects = effects;
    this.hooks = hooks;
    this.enemies = [];
    this.projectiles = [];
    this.projectilePool = [];
    this.t = 0;
    this.projectileCursor = 0;
  }

  _getProjectile() {
    for (let i = 0; i < this.projectiles.length; i++) {
      if (!this.projectiles[i].active) return this.projectiles[i];
    }
    const p = new Projectile(this.scene);
    this.projectiles.push(p);
    return p;
  }

  spawn(type, wave, x, z) {
    const enemy = new Enemy(this.scene, type, wave, x, z);
    this.enemies.push(enemy);
    return enemy;
  }

  clear() {
    for (const e of this.enemies) e.destroy();
    this.enemies.length = 0;
    for (const p of this.projectiles) p.deactivate();
  }

  get alive() {
    return this.enemies.length;
  }

  update(dt, playerPos, playerVel, playerRadius = 0.62) {
    this.t += dt;

    // enemy separation
    for (let i = 0; i < this.enemies.length; i++) {
      const a = this.enemies[i];
      for (let j = i + 1; j < this.enemies.length; j++) {
        const b = this.enemies[j];
        const dx = b.pos.x - a.pos.x;
        const dz = b.pos.z - a.pos.z;
        const d2 = dx * dx + dz * dz;
        const min = (a.cfg.radius + b.cfg.radius) * 0.95;
        if (d2 > 0.0001 && d2 < min * min) {
          const d = Math.sqrt(d2);
          const push = (min - d) / d * 0.5;
          a.pos.x -= dx * push;
          a.pos.z -= dz * push;
          b.pos.x += dx * push;
          b.pos.z += dz * push;
        }
      }
    }

    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const e = this.enemies[i];
      e.update(dt, this.t, playerPos, playerVel, this);
      if (e.dead) this.enemies.splice(i, 1);
    }

    for (const p of this.projectiles) {
      if (!p.active) continue;
      p.life -= dt;
      if (p.life <= 0) { p.deactivate(); continue; }
      p.pos.addScaledVector(p.vel, dt);
      p.group.position.copy(p.pos);
      p.glow.material.opacity = 0.7 + Math.sin(this.t * 22 + p.life) * 0.2;

      // player hit
      const py = playerPos.y + 1.05;
      const dx = p.pos.x - playerPos.x;
      const dy = p.pos.y - py;
      const dz = p.pos.z - playerPos.z;
      const rr = playerRadius + p.radius + 0.3;
      if (dx * dx + dy * dy + dz * dz < rr * rr) {
        this.hooks.onPlayerHit?.(p.damage, p.pos);
        this.effects.spawnBurst(p.pos, 0xff2d9b, 8, 3.2);
        p.deactivate();
        continue;
      }

      // world collision
      let hitWorld = p.pos.y < 0.08 || p.pos.lengthSq() > 29.5 * 29.5;
      if (!hitWorld && p.pos.y < 2.6) {
        for (const o of this.hooks.obstacles || []) {
          const ox = p.pos.x - o.x;
          const oz = p.pos.z - o.z;
          if (ox * ox + oz * oz < (o.r + 0.14) * (o.r + 0.14)) { hitWorld = true; break; }
        }
      }
      if (hitWorld) {
        this.effects.spawnBurst(p.pos, 0x8ff9ff, 5, 2.4);
        p.deactivate();
      }
    }
  }

  /** Closest enemy sphere along a ray, plus the hit point. */
  raycast(origin, dir, maxDist = 60) {
    let best = null;
    for (const e of this.enemies) {
      if (e.dead) continue;
      _v1.copy(e.group.position).sub(origin);
      const t = _v1.dot(dir);
      if (t < 0 || t > maxDist) continue;
      const closest = _v2.copy(origin).addScaledVector(dir, t);
      const distSq = closest.distanceToSquared(e.group.position);
      const r = e.hitRadius;
      if (distSq > r * r) continue;
      const back = Math.sqrt(Math.max(0, r * r - distSq));
      const hitT = Math.max(0.1, t - back);
      if (!best || hitT < best.distance) {
        const point = new THREE.Vector3().copy(origin).addScaledVector(dir, hitT);
        const crit = point.y > e.group.position.y + r * 0.42;
        best = { enemy: e, point, distance: hitT, crit };
      }
    }
    return best;
  }

  /** Enemy nearest to the crosshair within a cone. */
  findAimTarget(origin, dir, maxAngle = 0.1, blockers = null) {
    let best = null;
    let bestAngle = Infinity;
    for (const e of this.enemies) {
      if (e.dead) continue;
      _v1.copy(e.group.position).sub(origin);
      const dist = _v1.length();
      if (dist < 0.2 || dist > 55) continue;
      _v1.multiplyScalar(1 / dist);
      const dot = _v1.dot(dir);
      if (dot < 0.6) continue;
      const angle = Math.acos(Math.min(1, dot));
      // larger, closer enemies get a slightly wider assist window
      const widened = maxAngle + Math.min(0.05, (e.cfg.radius * 0.6) / dist);
      if (angle > widened || angle >= bestAngle) continue;
      if (blockers && blockers.length) {
        const ray = new THREE.Raycaster(origin, _v1.clone(), 0.1, dist - e.cfg.radius * 0.8);
        if (ray.intersectObjects(blockers, false).length) continue;
      }
      best = e;
      bestAngle = angle;
    }
    return best;
  }

  damage(enemy, amount, point, crit = false) {
    if (!enemy || enemy.dead) return false;
    enemy.hp -= amount;
    enemy.flash = 1;
    enemy.lastHit = this.t;
    if (enemy.hp <= 0) {
      enemy.hp = 0;
      this._kill(enemy, crit);
      return true;
    }
    return false;
  }

  _kill(enemy) {
    enemy.dead = true;
    const pos = enemy.group.position.clone();
    this.effects.spawnBurst(pos, enemy.cfg.color, enemy.cfg.boss ? 60 : 26, enemy.cfg.boss ? 12 : 8, { upward: 0.35 });
    this.effects.spawnBurst(pos, 0xffffff, enemy.cfg.boss ? 24 : 12, 5, { upward: 0.6 });
    this.effects.ring(pos, enemy.cfg.color, enemy.cfg.boss ? 9 : 4.5, 0.7);
    this.effects.flash(pos, enemy.cfg.color, enemy.cfg.boss ? 7 : 3.4, 0.28);
    enemy.destroy();
    this.hooks.onKill?.(enemy, pos);
  }

  /** Seeker self-destruct — hurts the player but awards no score. */
  detonate(enemy) {
    if (enemy.dead) return;
    enemy.dead = true;
    const pos = enemy.group.position.clone();
    this.effects.spawnBurst(pos, 0xff2d9b, 30, 8, { upward: 0.4 });
    this.effects.ring(pos, 0xff2d9b, 5, 0.55);
    this.effects.flash(pos, 0xff2d9b, 4, 0.24);
    this.hooks.onPlayerHit?.(enemy.cfg.contactDamage, pos);
    enemy.destroy();
    this.hooks.onDetonate?.(enemy, pos);
  }

  _fire(enemy, playerPos, playerVel) {
    const cfg = enemy.cfg;
    const origin = enemy.group.position.clone();
    origin.y += Math.sin(enemy.phase * 2) * 0.1;
    const speed = cfg.projectileSpeed;
    _v1.copy(playerPos);
    _v1.y += 1.05;
    // mild predictive lead so shots feel smart but dodgeable
    const dist = origin.distanceTo(_v1);
    _v1.addScaledVector(playerVel, (dist / speed) * 0.4);
    _v3.copy(_v1).sub(origin).normalize();

    const count = enemy.hp < enemy.maxHp * 0.5 ? cfg.burst + 1 : cfg.burst;
    const spread = cfg.boss ? 0.045 : 0.03;
    const color = cfg.color;
    for (let i = 0; i < count; i++) {
      const offset = (i - (count - 1) / 2) * spread;
      const dir = _v3.clone();
      // yaw the shot sideways for a fan pattern
      const cos = Math.cos(offset);
      const sin = Math.sin(offset);
      const dx = dir.x * cos - dir.z * sin;
      const dz = dir.x * sin + dir.z * cos;
      dir.x = dx;
      dir.z = dz;
      dir.x += (Math.random() - 0.5) * 0.02;
      dir.y += (Math.random() - 0.5) * 0.02;
      dir.normalize();
      const p = this._getProjectile();
      _v2.copy(origin);
      p.spawn(_v2, dir.multiplyScalar(speed), color, cfg.projectileDamage, cfg.boss ? 0.26 : 0.18);
    }
    this.effects.flash(origin, color, 1.5, 0.14);
    this.hooks.onShoot?.(enemy);
  }
}

let enemyId = 0;

class Enemy {
  constructor(scene, type, wave, x, z) {
    this.id = ++enemyId;
    this.type = type;
    this.cfg = ENEMY_TYPES[type];
    this.wave = wave;
    this.scene = scene;
    this.pos = new THREE.Vector3(x, 0, z);
    this.vel = new THREE.Vector3();
    this.phase = Math.random() * Math.PI * 2;
    this.seed = Math.random() * 10;
    this.strafe = Math.random() < 0.5 ? -1 : 1;
    this.flash = 0;
    this.dead = false;
    this.lastTrail = 0;
    this.spawnT = 0.45;
    this.hitRadius = this.cfg.radius * 1.12;

    const boost = this.cfg.boss
      ? 1 + Math.max(0, wave - 5) * 0.1
      : 1 + (wave - 1) * 0.15;
    this.maxHp = Math.round(this.cfg.hp * boost);
    this.hp = this.maxHp;
    this.speed = this.cfg.speed * (1 + Math.min(0.45, wave * 0.018));
    this.fireTimer = 0.9 + Math.random() * 1.4;
    this.radialCounter = 0;

    this.group = new THREE.Group();
    this.group.position.copy(this.pos);
    this.group.position.y = this.cfg.hover;
    this.group.scale.setScalar(0.01);
    this.scene.add(this.group);

    this._build();
  }

  _build() {
    const cfg = this.cfg;
    const color = cfg.color;
    this.shellMat = new THREE.MeshStandardMaterial({
      color: 0x0c1424,
      emissive: color,
      emissiveIntensity: 0.55,
      metalness: 0.65,
      roughness: 0.3,
      flatShading: true,
    });
    this.coreMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: color,
      emissiveIntensity: 2.4,
      roughness: 0.2,
      metalness: 0.1,
    });

    let shellGeo = GEO.shellSmall;
    let coreGeo = GEO.core;
    let ringGeo = GEO.ring;
    if (this.type === 'seeker') shellGeo = GEO.shellSeeker;
    if (this.type === 'titan') { shellGeo = GEO.shellTitan; coreGeo = GEO.coreBig; ringGeo = GEO.ringBig; }
    if (this.type === 'warden') { shellGeo = GEO.shellWarden; coreGeo = GEO.coreBoss; ringGeo = GEO.ringBoss; }

    const shell = new THREE.Mesh(shellGeo, this.shellMat);
    this.group.add(shell);
    this.shell = shell;

    const wireMat = SHARED.wire.clone();
    wireMat.color.setHex(color);
    wireMat.opacity = this.type === 'warden' ? 0.5 : 0.34;
    const wire = new THREE.LineSegments(WIRE_GEO[this.type], wireMat);
    wire.scale.setScalar(1.02);
    this.wire = wire;
    this.group.add(wire);

    const core = new THREE.Mesh(coreGeo, this.coreMat);
    this.core = core;
    this.group.add(core);

    // rings
    this.rings = [];
    const ringMat = SHARED.ring.clone();
    ringMat.color.setHex(color);
    const addRing = (geo, rx, ry, rz, rotSpeed) => {
      const m = new THREE.Mesh(geo, ringMat);
      m.rotation.set(rx, ry, rz);
      this.group.add(m);
      this.rings.push({ mesh: m, speed: rotSpeed, axis: new THREE.Vector3(0, 1, 0) });
    };
    if (this.type === 'drone') {
      addRing(ringGeo, Math.PI / 2, 0, 0.35, 1.4);
      addRing(ringGeo, Math.PI / 3, 0.7, 0, -1.0);
    } else if (this.type === 'seeker') {
      addRing(ringGeo, 0.5, 0.3, 0.9, 2.4);
      for (let i = 0; i < 4; i++) {
        const spike = new THREE.Mesh(GEO.spike, this.shellMat);
        const a = (i / 4) * Math.PI * 2;
        spike.position.set(Math.cos(a) * 0.62, 0, Math.sin(a) * 0.62);
        spike.rotation.z = Math.PI / 2;
        spike.rotation.y = -a;
        this.group.add(spike);
      }
    } else if (this.type === 'titan') {
      addRing(ringGeo, Math.PI / 2, 0, 0, 0.55);
      addRing(ringGeo, 0.9, 0.4, 0.5, -0.8);
      addRing(ringGeo, 0.2, 1.2, 0.2, 1.1);
    } else {
      addRing(ringGeo, Math.PI / 2, 0, 0, 0.35);
      addRing(ringGeo, 1.1, 0.5, 0.4, -0.55);
      addRing(ringGeo, 0.35, 1.3, 0.8, 0.75);
      this.satellites = new THREE.Group();
      for (let i = 0; i < 5; i++) {
        const s = new THREE.Mesh(GEO.satellite, this.coreMat);
        const a = (i / 5) * Math.PI * 2;
        s.position.set(Math.cos(a) * 1.45, Math.sin(a * 2) * 0.15, Math.sin(a) * 1.45);
        this.satellites.add(s);
      }
      this.group.add(this.satellites);
    }

    // aura
    const aura = new THREE.Sprite(SHARED.glowSprite.clone());
    aura.material.color.setHex(color);
    aura.material.opacity = cfg.boss ? 0.5 : 0.4;
    aura.scale.setScalar(cfg.radius * (cfg.boss ? 4.6 : 4.2));
    this.group.add(aura);
    this.aura = aura;

    // shadow blob on the floor
    const shadow = new THREE.Mesh(new THREE.PlaneGeometry(cfg.radius * 2.4, cfg.radius * 2.4), SHARED.shadow);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -cfg.hover + 0.03;
    this.group.add(shadow);
    this.shadow = shadow;
  }

  update(dt, t, playerPos, playerVel, manager) {
    this.phase += dt;
    this.spawnT = Math.max(0, this.spawnT - dt);
    if (this.spawnT > 0) {
      const k = 1 - this.spawnT / 0.45;
      const s = 0.3 + k * 0.7;
      this.group.scale.setScalar(s);
    } else {
      this.group.scale.setScalar(1);
    }

    if (this.flash > 0) {
      this.flash = Math.max(0, this.flash - dt * 5.5);
      this.coreMat.emissiveIntensity = 2.4 + this.flash * 7;
      this.shellMat.emissiveIntensity = 0.55 + this.flash * 2.4;
    } else {
      this.coreMat.emissiveIntensity = 2.4;
      this.shellMat.emissiveIntensity = 0.55;
    }
    const baseScale = this.spawnT > 0 ? 0.3 + (1 - this.spawnT / 0.45) * 0.7 : 1;
    this.group.scale.setScalar(baseScale * (1 + this.flash * 0.06));

    _v1.set(playerPos.x - this.pos.x, 0, playerPos.z - this.pos.z);
    const dist = _v1.length();
    if (dist > 0.001) _v1.multiplyScalar(1 / dist);

    const desired = _v2.set(0, 0, 0);
    const cfg = this.cfg;

    if (cfg.kind === 'kamikaze') {
      desired.addScaledVector(_v1, this.speed);
      desired.x += Math.cos(this.phase * 3 + this.seed) * 1.1;
      desired.z += Math.sin(this.phase * 3 + this.seed) * 1.1;
      if (dist < 1.85) {
        manager.detonate(this);
        return;
      }
      if (this.phase - this.lastTrail > 0.09) {
        this.lastTrail = this.phase;
        manager.effects.spawnBurst(this.group.position, cfg.color, 1, 0.6, { upward: 0.05, spread: 0.4 });
      }
    } else {
      const range = cfg.range;
      if (dist > range) desired.addScaledVector(_v1, this.speed);
      else if (dist < range * 0.52) desired.addScaledVector(_v1, -this.speed * 0.85);

      const sideX = -_v1.z * this.strafe;
      const sideZ = _v1.x * this.strafe;
      const strafeAmount = Math.sin(this.phase * 0.8 + this.seed) * this.speed * 0.55;
      desired.x += sideX * strafeAmount;
      desired.z += sideZ * strafeAmount;

      if (dist > 1.5) {
        this.fireTimer -= dt;
        if (this.fireTimer <= 0 && dist < range * 1.35) {
          manager._fire(this, playerPos, playerVel);
          this.fireTimer = cfg.fireRate * (0.78 + Math.random() * 0.4);
        }
      }
    }

    this.vel.lerp(desired, Math.min(1, dt * 3.2));
    this.pos.addScaledVector(this.vel, dt);

    // keep inside arena
    const radius = Math.hypot(this.pos.x, this.pos.z);
    if (radius > 26.5) {
      this.pos.x *= 26.5 / radius;
      this.pos.z *= 26.5 / radius;
    }

    const bob = Math.sin(this.phase * 2 + this.seed) * 0.16;
    this.group.position.set(this.pos.x, cfg.hover + bob, this.pos.z);
    this.shadow.position.y = -cfg.hover - bob + 0.03;

    // facing & animation
    if (dist > 0.01) {
      const targetRot = Math.atan2(_v1.x, _v1.z);
      let diff = targetRot - this.group.rotation.y;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      this.group.rotation.y += diff * Math.min(1, dt * 2.2);
    }
    this.core.rotation.y += dt * 1.4;
    if (this.satellites) {
      this.satellites.rotation.y += dt * 1.1;
      this.satellites.rotation.x = Math.sin(this.phase * 0.7) * 0.25;
    }
    for (const r of this.rings) {
      r.mesh.rotation.z += dt * r.speed;
      r.mesh.rotation.x += dt * r.speed * 0.35;
    }
    if (this.type === 'seeker') this.wire.rotation.y -= dt * 4;
    if (this.type === 'drone') this.wire.rotation.y += dt * 0.7;

    const auraPulse = 0.36 + Math.sin(this.phase * 3.1 + this.seed) * 0.09;
    this.aura.material.opacity = this.cfg.boss ? auraPulse + 0.1 : auraPulse;
  }

  destroy() {
    this.scene.remove(this.group);
    this.shellMat.dispose();
    this.coreMat.dispose();
    this.wire.material.dispose();
    const ringMat = this.rings[0]?.mesh.material;
    if (ringMat) ringMat.dispose();
    this.aura.material.dispose();
  }
}
