/* ============================================================
   NEON BREACH — player, weapon, controls & hitscan
   ============================================================ */
import * as THREE from 'three';
import { vibrate } from './input.js';

const EYE = 1.68;
const GRAVITY = 20;
const MOVE_SPEED = 5.9;
const JUMP_V = 6.6;

function glowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(0.22, 'rgba(255,240,190,.95)');
  grd.addColorStop(0.55, 'rgba(255,140,60,.35)');
  grd.addColorStop(1, 'rgba(255,80,20,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

export class Player {
  constructor(game) {
    this.game = game;
    this.position = new THREE.Vector3(0, 0, 13);
    this.velocity = new THREE.Vector3();
    this.yaw = 0;
    this.pitch = 0;
    this.eyeY = EYE;
    this.radius = 0.45;
    this.grounded = true;
    this.bobT = 0;
    this.bobAmt = 0;
    this.health = 100;
    this.maxHealth = 100;
    this.alive = true;
    this.lastDamage = -99;
    this.time = 0;

    // weapon
    this.mag = 30;
    this.magSize = 30;
    this.reserve = 150;
    this.fireRate = 8.6;
    this.fireT = 0;
    this.reloading = false;
    this.reloadT = 0;
    this.reloadDur = 1.25;
    this.spread = 0;
    this.recoilPitch = 0;
    this.recoilYaw = 0;
    this.kickZ = 0;
    this.sway = { x: 0, y: 0 };
    this.flashT = 0;

    this.shake = 0;
    this.shakeT = 0;
    this.hurtT = 0;

    this.camera = game.camera;
    this.buildViewModel();
    this.reset();
  }

  reset() {
    this.position.set(0, 0, 13);
    this.velocity.set(0, 0, 0);
    this.yaw = 0;
    this.pitch = 0;
    this.health = this.maxHealth;
    this.alive = true;
    this.lastDamage = -99;
    this.mag = this.magSize;
    this.reserve = 150;
    this.reloading = false;
    this.reloadT = 0;
    this.spread = 0;
    this.recoilPitch = 0;
    this.recoilYaw = 0;
    this.kickZ = 0;
    this.shake = 0;
    this.fireT = 0;
    this.grounded = true;
    this.camera.position.copy(this.position).setY(EYE);
    this.camera.rotation.set(0, 0, 0, 'YXZ');
  }

  /* --------------------------- view model --------------------------- */
  buildViewModel() {
    const g = new THREE.Group();
    const metal = new THREE.MeshStandardMaterial({ color: 0x3a4c68, metalness: 0.92, roughness: 0.3, flatShading: true, depthTest: false, depthWrite: false, emissive: 0x123048, emissiveIntensity: 1.5 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x1a2436, metalness: 0.7, roughness: 0.5, depthTest: false, depthWrite: false, emissive: 0x0a1624, emissiveIntensity: 1.2 });
    const cyan = new THREE.MeshBasicMaterial({ color: 0x66f8ff, depthTest: false, depthWrite: false });
    const magmat = new THREE.MeshStandardMaterial({ color: 0x2e3d58, metalness: 0.8, roughness: 0.35, depthTest: false, depthWrite: false });
    const glove = new THREE.MeshStandardMaterial({ color: 0x2a3547, metalness: 0.2, roughness: 0.9, flatShading: true, depthTest: false, depthWrite: false, emissive: 0x0e1826, emissiveIntensity: 1.0 });
    const allMats = [metal, dark, cyan, magmat, glove];

    const add = (mesh) => { mesh.renderOrder = 100; mesh.frustumCulled = false; g.add(mesh); return mesh; };

    // receiver
    add(new THREE.Mesh(new THREE.BoxGeometry(0.085, 0.125, 0.44), metal));
    // top rail
    const rail = add(new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.025, 0.3), dark));
    rail.position.set(0, 0.075, -0.04);
    // barrel shroud
    const shroud = add(new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.075, 0.34), dark));
    shroud.position.set(0, 0.012, -0.36);
    const barrel = add(new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.28, 8), metal));
    barrel.rotation.x = Math.PI / 2;
    barrel.position.set(0, 0.018, -0.55);
    const brake = add(new THREE.Mesh(new THREE.BoxGeometry(0.068, 0.068, 0.09), metal));
    brake.position.set(0, 0.018, -0.7);
    // side glow accents
    for (const s of [-1, 1]) {
      const strip = add(new THREE.Mesh(new THREE.BoxGeometry(0.006, 0.022, 0.3), cyan));
      strip.position.set(s * 0.045, 0.012, -0.24);
    }
    const core = add(new THREE.Mesh(new THREE.BoxGeometry(0.052, 0.02, 0.05), cyan));
    core.position.set(0, 0.062, 0.09);
    // magazine
    const mag = add(new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.21, 0.085), magmat));
    mag.position.set(0, -0.155, 0.045);
    mag.rotation.x = -0.18;
    // grip
    const grip = add(new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.17, 0.085), dark));
    grip.position.set(0, -0.13, 0.16);
    grip.rotation.x = 0.32;
    // stock
    const stock = add(new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.1, 0.19), metal));
    stock.position.set(0, -0.015, 0.29);
    // sight
    const sightBase = add(new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.045, 0.11), dark));
    sightBase.position.set(0, 0.115, -0.02);
    const sightRing = add(new THREE.Mesh(new THREE.TorusGeometry(0.04, 0.007, 6, 18), cyan));
    sightRing.position.set(0, 0.152, -0.02);
    // hands
    const handR = add(new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.12, 0.13), glove));
    handR.position.set(0.005, -0.135, 0.235);
    handR.rotation.x = 0.35;
    const handL = add(new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.12, 0.16), glove));
    handL.position.set(-0.005, -0.055, -0.34);
    handL.rotation.x = -0.15;

    this.gun = g;
    this.gunBase = new THREE.Vector3(0.34, -0.30, -0.74);
    this.gun.position.copy(this.gunBase);
    this.gun.rotation.set(0.015, 0.045, 0.02);
    this.gun.scale.setScalar(0.88);
    this.gun.renderOrder = 100;
    this.camera.add(g);

    // muzzle flash
    const flashMat = new THREE.SpriteMaterial({
      map: glowTexture(), color: 0xffffff, transparent: true,
      blending: THREE.AdditiveBlending, depthTest: false, depthWrite: false, opacity: 0,
    });
    this.muzzle = new THREE.Sprite(flashMat);
    this.muzzle.position.set(0, 0.018, -0.78);
    this.muzzle.scale.setScalar(0.5);
    this.muzzle.renderOrder = 101;
    g.add(this.muzzle);

    const cone = new THREE.Mesh(
      new THREE.ConeGeometry(0.06, 0.32, 6, 1, true),
      new THREE.MeshBasicMaterial({ color: 0xffd9a0, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthTest: false, depthWrite: false, side: THREE.DoubleSide })
    );
    cone.rotation.x = -Math.PI / 2;
    cone.position.set(0, 0.018, -0.9);
    cone.renderOrder = 101;
    g.add(cone);
    this.flashCone = cone;

    const flashLight = new THREE.PointLight(0xffb060, 0, 4, 2);
    flashLight.position.set(0, 0.02, -0.8);
    g.add(flashLight);
    this.flashLight = flashLight;

    this.muzzleWorld = new THREE.Vector3();
    this.allMats = allMats;
    this.setAspect(window.innerWidth / window.innerHeight);
  }

  setAspect(aspect) {
    if (!this.gun) return;
    this.portrait = aspect < 1;
    if (this.portrait) {
      this.gunBase.set(0.25, -0.30, -0.72);
      this.gun.scale.setScalar(0.8);
    } else {
      this.gunBase.set(0.34, -0.30, -0.74);
      this.gun.scale.setScalar(0.88);
    }
  }

  /* ----------------------------- update ----------------------------- */
  update(dt, input) {
    this.time += dt;
    if (!this.alive) { this.updateViewModel(dt, input); return; }

    // look
    const look = input.consumeLook();
    this.yaw -= look.x;
    this.pitch -= look.y;
    this.pitch = Math.max(-1.32, Math.min(1.32, this.pitch));
    this.sway.x += (look.x * 0.9 - this.sway.x) * Math.min(1, 10 * dt);
    this.sway.y += (look.y * 0.9 - this.sway.y) * Math.min(1, 10 * dt);

    // movement
    const move = input.sample();
    const speedMul = (input.keys.has('ShiftLeft') ? 1.18 : 1);
    const wishX = move.x * MOVE_SPEED * speedMul;
    const wishZ = move.y * MOVE_SPEED * speedMul;
    const accel = this.grounded ? 14 : 5;
    this.velocity.x += (wishX - this.velocity.x) * Math.min(1, accel * dt);
    this.velocity.z += (wishZ - this.velocity.z) * Math.min(1, accel * dt);

    this.position.x += this.velocity.x * dt;
    this.position.z += this.velocity.z * dt;
    this.game.arena.resolveCircle(this.position, this.radius);

    // jump / gravity
    if (input.consumePressed('jump') && this.grounded) {
      this.velocity.y = JUMP_V;
      this.grounded = false;
      this.game.audio.jump();
    }
    this.velocity.y -= GRAVITY * dt;
    this.position.y += this.velocity.y * dt;
    if (this.position.y <= 0) {
      if (!this.grounded && this.velocity.y < -5) {
        this.game.audio.land();
        this.addShake(0.08);
      }
      this.position.y = 0;
      this.velocity.y = 0;
      this.grounded = true;
    } else {
      this.grounded = false;
    }

    // head bob
    const horizSpeed = Math.hypot(this.velocity.x, this.velocity.z);
    const targetBob = this.grounded ? Math.min(1, horizSpeed / MOVE_SPEED) : 0;
    this.bobAmt += (targetBob - this.bobAmt) * Math.min(1, 8 * dt);
    this.bobT += dt * (6.5 + horizSpeed * 0.85);
    const bobY = Math.sin(this.bobT) * 0.035 * this.bobAmt;
    const bobX = Math.cos(this.bobT * 0.5) * 0.026 * this.bobAmt;

    // camera
    this.eyeY = EYE;
    this.camera.position.set(
      this.position.x + bobX + this.shakeX(),
      this.position.y + this.eyeY + bobY + this.shakeY(),
      this.position.z
    );
    const sh = this.getShake();
    this.camera.rotation.set(
      this.pitch + this.recoilPitch + sh.x,
      this.yaw + this.recoilYaw + sh.y,
      sh.z,
      'YXZ'
    );

    // accel / input handling
    if (input.consumePressed('reload')) this.reload();
    if (input.firing && this.mag <= 0 && !this.reloading) this.reload();
    this.fireT -= dt;
    if (input.firing && !this.reloading && this.fireT <= 0) {
      if (this.mag > 0) this.shoot();
      else if (this.fireT < -0.35) {
        this.game.audio.empty();
        this.fireT = 0.35;
        this.game.hud.flashReload();
      }
    }

    this.updateWeapon(dt);
    this.updateViewModel(dt, input);

    // passive regen
    if (this.time - this.lastDamage > 5.5 && this.health < this.maxHealth) {
      this.health = Math.min(this.maxHealth, this.health + 11 * dt);
      this.game.hud.setHealth(this.health, this.maxHealth);
    }
    if (this.time - this.lastDamage > 5.5) this.hurtT = Math.max(0, this.hurtT - dt);
  }

  updateWeapon(dt) {
    if (this.reloading) {
      this.reloadT -= dt;
      this.game.hud.setReload(1 - this.reloadT / this.reloadDur);
      if (this.reloadT <= 0) {
        const need = this.magSize - this.mag;
        const take = Math.min(need, this.reserve);
        this.mag += take;
        this.reserve -= take;
        this.reloading = false;
        this.game.audio.reloadEnd();
        this.game.hud.setReload(-1);
        this.game.hud.setAmmo(this.mag, this.reserve);
      }
    }
    this.spread = Math.max(0, this.spread - dt * 0.055);
    this.recoilPitch *= Math.pow(0.0008, dt);
    this.recoilYaw *= Math.pow(0.0008, dt);
    this.kickZ += (0 - this.kickZ) * Math.min(1, 18 * dt);
    this.flashT = Math.max(0, this.flashT - dt);
    this.muzzle.material.opacity = this.flashT > 0 ? Math.min(1, this.flashT / 0.045) : 0;
    this.flashCone.material.opacity = this.flashT > 0 ? Math.min(0.75, this.flashT / 0.05) : 0;
    this.flashLight.intensity = this.flashT > 0 ? 16 : 0;
    if (this.flashT > 0) {
      this.muzzle.scale.setScalar(0.26 + Math.random() * 0.14);
      this.muzzle.material.rotation = Math.random() * Math.PI * 2;
    }
    // shake decay
    this.shake = Math.max(0, this.shake - dt * 3.2);
    this.shakeT += dt;
  }

  updateViewModel(dt, input) {
    const reloadK = this.reloading ? 1 - Math.abs(0.5 - (1 - this.reloadT / this.reloadDur)) * 2 : 0;
    const bob = this.bobAmt;
    const t = this.bobT;
    const g = this.gun;
    const base = this.gunBase;

    const targetX = base.x + Math.cos(t * 0.5) * 0.014 * bob - this.sway.x * 0.4 + (this.reloading ? -0.06 : 0);
    const targetY = base.y + Math.sin(t) * 0.018 * bob - this.sway.y * 0.3 - reloadK * 0.16;
    const targetZ = base.z + this.kickZ + (this.reloading ? 0.05 : 0);
    g.position.x += (targetX - g.position.x) * Math.min(1, 14 * dt);
    g.position.y += (targetY - g.position.y) * Math.min(1, 14 * dt);
    g.position.z += (targetZ - g.position.z) * Math.min(1, 18 * dt);

    const targetRX = 0.015 + this.kickZ * 0.9 + reloadK * 0.85 - this.sway.y * 0.6;
    const targetRY = 0.045 - this.sway.x * 0.7 + (this.reloading ? 0.2 : 0);
    const targetRZ = 0.02 + reloadK * 0.35;
    g.rotation.x += (targetRX - g.rotation.x) * Math.min(1, 14 * dt);
    g.rotation.y += (targetRY - g.rotation.y) * Math.min(1, 14 * dt);
    g.rotation.z += (targetRZ - g.rotation.z) * Math.min(1, 10 * dt);
  }

  /* ------------------------------ shoot ------------------------------ */
  shoot() {
    this.mag--;
    this.fireT = 1 / this.fireRate;
    this.flashT = 0.075;
    this.kickZ = 0.055 + Math.random() * 0.02;
    this.recoilPitch += 0.012 + Math.random() * 0.008;
    this.recoilYaw += (Math.random() - 0.5) * 0.008;
    this.spread = Math.min(0.05, this.spread + 0.007);
    this.addShake(0.012);
    this.game.audio.shoot();
    this.game.hud.setAmmo(this.mag, this.reserve);
    if (navigator.vibrate) vibrate(8);

    const origin = this.camera.position.clone();
    const forward = new THREE.Vector3();
    this.camera.getWorldDirection(forward);

    // aim assist: pull toward the most centred target within a small cone
    let assist = null;
    let best = Infinity;
    for (const e of this.game.enemies) {
      if (!e.alive) continue;
      const to = e.group.position.clone().add(new THREE.Vector3(0, 0.15, 0)).sub(origin);
      const dist = to.length();
      if (dist > 48) continue;
      to.normalize();
      const dot = to.dot(forward);
      if (dot < 0.996) continue; // ~5.1 degrees
      const score = Math.acos(Math.min(1, dot)) * 4 + dist * 0.001;
      if (score < best) { best = score; assist = to; }
    }
    if (assist) {
      forward.lerp(assist, 0.72).normalize();
    }

    const spread = 0.0035 + this.spread + this.bobAmt * 0.004 + (this.grounded ? 0 : 0.012);
    const dir = forward.clone();
    dir.x += (Math.random() - 0.5) * spread * 2;
    dir.y += (Math.random() - 0.5) * spread * 2;
    dir.z += (Math.random() - 0.5) * spread * 2;
    dir.normalize();

    // enemy sphere intersection
    let hitEnemy = null;
    let hitT = Infinity;
    for (const e of this.game.enemies) {
      if (!e.alive || e.state === 'dead') continue;
      const c = e.group.position.clone();
      const oc = c.clone().sub(origin);
      const t = oc.dot(dir);
      if (t < 0) continue;
      const closest = origin.clone().addScaledVector(dir, t);
      const d2 = closest.distanceToSquared(c);
      const r = e.hitRadius * 1.12;
      if (d2 < r * r && t < hitT) {
        // blocked by cover?
        if (!this.game.arena.raycastBlocked(origin, dir, Math.max(0.2, t - 0.4))) {
          hitT = t;
          hitEnemy = e;
        }
      }
    }

    this.muzzle.getWorldPosition(this.muzzleWorld);
    const endPoint = new THREE.Vector3();

    if (hitEnemy) {
      const hitPoint = origin.clone().addScaledVector(dir, hitT);
      // crit if the impact sits in the upper part of the drone
      const localY = hitPoint.y - hitEnemy.group.position.y;
      const crit = localY > hitEnemy.hitRadius * 0.35;
      const dmg = crit ? 42 : 26;
      const killed = hitEnemy.takeDamage(dmg, hitPoint, crit);
      this.game.effects.sparkBurst(hitPoint, dir.clone().negate(), hitEnemy.type.color, crit ? 16 : 9, 9);
      this.game.effects.tracer(this.muzzleWorld, hitPoint, 0xcafcff);
      this.game.hud.hitmarker(killed, crit);
      this.game.audio.hit();
      if (navigator.vibrate) vibrate(killed ? [12, 30, 18] : 6);
      if (!killed) this.game.onEnemyHit(hitEnemy, dmg, crit);
      this.game.hud.damagePopup?.(crit ? 'CRIT' : '');
    } else {
      const wall = this.sampleImpact(origin, dir, 65);
      if (wall) {
        endPoint.copy(wall.point);
        this.game.effects.sparkBurst(wall.point, wall.normal, 0x9fd8ff, 6, 5);
        this.game.effects.tracer(this.muzzleWorld, wall.point, 0x8fe8ff);
      } else {
        endPoint.copy(origin).addScaledVector(dir, 60);
        this.game.effects.tracer(this.muzzleWorld, endPoint, 0x8fe8ff);
      }
    }

    // shell casing
    this.game.effects.shell(
      this.camera.position.clone().add(new THREE.Vector3(0.25, -0.18, -0.3)),
      this.camera.getWorldDirection(new THREE.Vector3())
    );
    this.game.hud.setCrosshairFiring(true);
    clearTimeout(this._chTimer);
    this._chTimer = setTimeout(() => this.game.hud.setCrosshairFiring(false), 90);
  }

  sampleImpact(origin, dir, maxDist) {
    const p = new THREE.Vector3();
    const step = 0.45;
    for (let s = step; s < maxDist; s += step) {
      p.copy(origin).addScaledVector(dir, s);
      if (p.y <= 0.02) return { point: p.clone(), normal: new THREE.Vector3(0, 1, 0) };
      const ax = Math.abs(p.x), az = Math.abs(p.z);
      if (ax > 29.3) return { point: p.clone(), normal: new THREE.Vector3(-Math.sign(p.x), 0, 0) };
      if (az > 29.3) return { point: p.clone(), normal: new THREE.Vector3(0, 0, -Math.sign(p.z)) };
      for (const c of this.game.arena.colliders) {
        if (p.x > c.minX && p.x < c.maxX && p.z > c.minZ && p.z < c.maxZ && p.y < c.h) {
          // approximate normal from the closest side
          const dxl = Math.abs(p.x - c.minX), dxr = Math.abs(c.maxX - p.x);
          const dzl = Math.abs(p.z - c.minZ), dzr = Math.abs(c.maxZ - p.z);
          const dyt = Math.abs(c.h - p.y);
          const m = Math.min(dxl, dxr, dzl, dzr, dyt);
          let n;
          if (m === dyt) n = new THREE.Vector3(0, 1, 0);
          else if (m === dxl) n = new THREE.Vector3(-1, 0, 0);
          else if (m === dxr) n = new THREE.Vector3(1, 0, 0);
          else if (m === dzl) n = new THREE.Vector3(0, 0, -1);
          else n = new THREE.Vector3(0, 0, 1);
          return { point: p.clone(), normal: n };
        }
      }
    }
    return null;
  }

  aimTarget() {
    if (!this.alive) return null;
    const origin = this.camera.position.clone();
    const forward = new THREE.Vector3();
    this.camera.getWorldDirection(forward);
    let best = null, bestDot = 0.988;
    for (const e of this.game.enemies) {
      if (!e.alive) continue;
      const to = e.group.position.clone().sub(origin);
      const dist = to.length();
      if (dist > 55) continue;
      to.normalize();
      const dot = to.dot(forward);
      if (dot > bestDot) {
        if (!this.game.arena.raycastBlocked(origin, forward, Math.max(0.3, dist - 0.6))) {
          bestDot = dot;
          best = e;
        }
      }
    }
    return best;
  }

  /* ----------------------------- damage ----------------------------- */
  damage(amount, fromPos) {
    if (!this.alive || this.game.state !== 'playing') return;
    this.health -= amount;
    this.lastDamage = this.time;
    this.hurtT = 1;
    this.addShake(0.16 + amount * 0.006);
    this.game.audio.hurt();
    this.game.hud.setHealth(this.health, this.maxHealth);
    this.game.hud.damageFlash(amount);
    if (fromPos) this.game.hud.damageDirection(fromPos, this.position, this.yaw);
    if (navigator.vibrate) vibrate([40, 20, 30]);
    if (this.health <= 0) {
      this.health = 0;
      this.alive = false;
      this.game.onPlayerDeath();
    }
  }

  heal(v) {
    this.health = Math.min(this.maxHealth, this.health + v);
    this.game.hud.setHealth(this.health, this.maxHealth);
  }

  addAmmo(v) {
    this.reserve = Math.min(300, this.reserve + v);
    this.game.hud.setAmmo(this.mag, this.reserve);
  }

  reload() {
    if (this.reloading || this.mag >= this.magSize || this.reserve <= 0) return;
    this.reloading = true;
    this.reloadT = this.reloadDur;
    this.game.audio.reloadStart();
    this.game.hud.setReload(0);
    this.game.hud.flashReload(false);
  }

  addShake(v) {
    this.shake = Math.min(0.5, this.shake + v);
  }

  getShake() {
    const s = this.shake;
    if (s <= 0.001) return { x: 0, y: 0, z: 0 };
    const t = this.shakeT * 41;
    return {
      x: (Math.sin(t * 1.7) + Math.sin(t * 2.9)) * 0.5 * s,
      y: (Math.sin(t * 2.3 + 1.1) + Math.sin(t * 3.7)) * 0.5 * s,
      z: Math.sin(t * 1.3) * s * 0.35,
    };
  }

  shakeX() { return this.getShake().y * 0.06; }
  shakeY() { return this.getShake().x * 0.06; }
}
