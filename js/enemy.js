/* ============================================================
   NEON BREACH — drone enemies
   ============================================================ */
import * as THREE from 'three';

const TYPES = {
  scout: {
    name: 'WRAITH', hp: 60, speed: 5.2, radius: 0.82, score: 100,
    color: 0xff2f7e, hover: 1.85, damage: 6, attackCd: 1.25, size: 1.0,
    range: 'melee',
  },
  brute: {
    name: 'JUGGER', hp: 200, speed: 2.9, radius: 1.35, score: 260,
    color: 0xff9f1c, hover: 2.15, damage: 14, attackCd: 1.7, size: 1.7,
    range: 'melee',
  },
  spitter: {
    name: 'HEXER', hp: 95, speed: 3.5, radius: 0.95, score: 180,
    color: 0xb05cff, hover: 2.7, damage: 0, attackCd: 2.3, size: 1.15,
    range: 'ranged', preferred: 14,
  },
  elite: {
    name: 'OVERSEER', hp: 320, speed: 3.4, radius: 1.5, score: 500,
    color: 0xffd23f, hover: 3.0, damage: 16, attackCd: 1.4, size: 1.9,
    range: 'melee',
  },
};

let glowTex = null;
function getGlowTexture() {
  if (glowTex) return glowTex;
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(0.3, 'rgba(255,255,255,.6)');
  grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  glowTex = new THREE.CanvasTexture(c);
  return glowTex;
}

const barBgGeo = new THREE.PlaneGeometry(1.15, 0.11);
const barFillGeo = new THREE.PlaneGeometry(1.06, 0.055);

export class Enemy {
  constructor(game, type, position, wave = 1) {
    this.game = game;
    this.typeKey = type;
    this.type = TYPES[type] || TYPES.scout;
    this.maxHp = Math.round(this.type.hp * (1 + (wave - 1) * 0.09));
    this.hp = this.maxHp;
    this.alive = true;
    this.dead = false;
    this.state = 'spawning';
    this.spawnT = 0;
    this.age = 0;
    this.attackT = Math.random() * 0.6;
    this.windup = 0;
    this.meleeWindup = 0;
    this.flash = 0;
    this.knock = new THREE.Vector3();
    this.velocity = new THREE.Vector3();
    this.hitRadius = this.type.radius;
    this.visualScale = this.type.size * 0.9;
    this.baseY = this.type.hover;
    this.phase = Math.random() * Math.PI * 2;
    this.strafeDir = Math.random() < 0.5 ? -1 : 1;
    this.strafeT = 0;
    this.lunge = 0;

    this.group = new THREE.Group();
    this.group.position.copy(position);
    this.group.position.y = this.baseY;
    this.group.scale.setScalar(0.01);
    this.group.userData.enemy = this;

    this.buildModel();
    game.scene.add(this.group);
  }

  buildModel() {
    const t = this.type;
    const col = new THREE.Color(t.color);
    // model is built in unscaled space, then the whole group is scaled by size
    const r = t.radius / t.size;

    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x141c2e, metalness: 0.85, roughness: 0.32,
      emissive: col, emissiveIntensity: 0.18, flatShading: true,
    });
    const glowMat = new THREE.MeshBasicMaterial({ color: col });
    this.bodyMat = bodyMat;
    this.glowMat = glowMat;

    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 1), bodyMat);
    core.userData.enemy = this;
    this.group.add(core);
    this.core = core;

    // armor fins
    const finMat = new THREE.MeshStandardMaterial({ color: 0x222c42, metalness: 0.9, roughness: 0.25, flatShading: true });
    for (let i = 0; i < 3; i++) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(r * 1.15, 0.07, r * 0.42), finMat);
      fin.position.y = 0;
      const a = (i / 3) * Math.PI * 2;
      fin.position.set(Math.cos(a) * r * 0.35, Math.sin(a) * r * 0.35, 0);
      fin.rotation.z = a;
      fin.rotation.y = 0.3;
      this.group.add(fin);
    }

    // rotating rings
    this.ring1 = new THREE.Mesh(new THREE.TorusGeometry(r * 1.2, 0.042, 4, 22), glowMat);
    this.ring1.rotation.x = Math.PI / 2.5;
    this.group.add(this.ring1);
    this.ring2 = new THREE.Mesh(new THREE.TorusGeometry(r * 1.36, 0.024, 4, 26), glowMat);
    this.ring2.rotation.y = Math.PI / 2;
    this.ring2.rotation.z = Math.PI / 3;
    this.group.add(this.ring2);

    // eye / lens (points forward = -z)
    const eye = new THREE.Mesh(
      new THREE.SphereGeometry(r * 0.21, 10, 10),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    eye.position.z = -r * 0.92;
    eye.userData.enemy = this;
    this.group.add(eye);
    this.eye = eye;

    const halo = new THREE.Sprite(new THREE.SpriteMaterial({
      map: getGlowTexture(), color: t.color, transparent: true,
      blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.85,
    }));
    halo.position.copy(eye.position);
    halo.scale.setScalar(r * 1.05);
    this.group.add(halo);
    this.halo = halo;

    // thruster
    const thr = new THREE.Mesh(
      new THREE.ConeGeometry(r * 0.28, r * 0.7, 8, 1, true),
      new THREE.MeshBasicMaterial({
        color: t.color, transparent: true, opacity: 0.5,
        blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
      })
    );
    thr.position.y = -r * 0.95;
    thr.rotation.x = Math.PI;
    this.group.add(thr);
    this.thruster = thr;

    const tg = new THREE.Sprite(new THREE.SpriteMaterial({
      map: getGlowTexture(), color: t.color, transparent: true,
      blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.55,
    }));
    tg.position.y = -r * 1.05;
    tg.scale.setScalar(r * 0.9);
    this.group.add(tg);

    // health bar
    const bar = new THREE.Group();
    bar.position.y = r * 2.1;
    const bg = new THREE.Mesh(barBgGeo, new THREE.MeshBasicMaterial({
      color: 0x05070d, transparent: true, opacity: 0.75, depthWrite: false, depthTest: false,
    }));
    const fill = new THREE.Mesh(barFillGeo, new THREE.MeshBasicMaterial({
      color: t.color, transparent: true, opacity: 0.95, depthWrite: false, depthTest: false,
    }));
    fill.position.z = 0.002;
    bg.renderOrder = 5; fill.renderOrder = 6;
    bar.add(bg); bar.add(fill);
    bar.visible = false;
    this.group.add(bar);
    this.bar = bar;
    this.barFill = fill;

    // fake shadow
    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(r * 1.05, 18),
      new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.3, depthWrite: false })
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -this.group.position.y + 0.02;
    shadow.position.y = 0.02 - this.group.position.y;
    this.group.add(shadow);
    this.shadow = shadow;
  }

  /* ------------------------------ AI ------------------------------ */
  update(dt, t) {
    if (!this.alive) return;
    this.age += dt;
    const g = this.group;
    const player = this.game.player;
    const ppos = player.position;

    if (this.state === 'spawning') {
      this.spawnT += dt;
      const k = Math.min(1, this.spawnT / 0.55);
      const s = k < 1 ? 0.2 + k * 0.9 + Math.sin(k * Math.PI) * 0.18 : 1;
      g.scale.setScalar(s * this.visualScale);
      if (k >= 1) { this.state = 'active'; g.scale.setScalar(this.visualScale); }
      g.position.y = this.baseY;
      this.face(player, dt, 4);
      return;
    }

    const dx = ppos.x - g.position.x;
    const dz = ppos.z - g.position.z;
    const dist = Math.hypot(dx, dz);
    const dirX = dist > 0.001 ? dx / dist : 0;
    const dirZ = dist > 0.001 ? dz / dist : 0;

    // desired motion
    let wantX = 0, wantZ = 0;
    const spd = this.type.speed * (1 + Math.min(0.35, (this.game.wave - 1) * 0.035));
    this.strafeT -= dt;
    if (this.strafeT <= 0) { this.strafeT = 2 + Math.random() * 2.5; this.strafeDir *= Math.random() < 0.25 ? -1 : 1; }

    if (this.type.range === 'ranged') {
      const pref = this.type.preferred;
      if (dist > pref + 2) { wantX = dirX * spd; wantZ = dirZ * spd; }
      else if (dist < pref - 2.5) { wantX = -dirX * spd * 0.9; wantZ = -dirZ * spd * 0.9; }
      wantX += -dirZ * this.strafeDir * spd * 0.75;
      wantZ += dirX * this.strafeDir * spd * 0.75;
    } else {
      wantX = dirX * spd;
      wantZ = dirZ * spd;
      // hold a stand-off distance so drones don't clip into the camera
      const stop = this.hitRadius + 1.15;
      if (dist < stop) {
        wantX -= dirX * spd * 1.4;
        wantZ -= dirZ * spd * 1.4;
      }
      // orbit around the player for a more dynamic fight
      wantX += -dirZ * this.strafeDir * spd * 0.28;
      wantZ += dirX * this.strafeDir * spd * 0.28;
    }

    // a melee charge overrides steering — the drone commits to a lunge
    if (this.meleeWindup > 0) {
      wantX = dirX * spd * 2.9;
      wantZ = dirZ * spd * 2.9;
    }

    // separation from other drones
    for (const other of this.game.enemies) {
      if (other === this || !other.alive) continue;
      const ox = g.position.x - other.group.position.x;
      const oz = g.position.z - other.group.position.z;
      const od = Math.hypot(ox, oz);
      const min = this.hitRadius + other.hitRadius + 0.35;
      if (od < min && od > 0.001) {
        const push = ((min - od) / min) * 14;
        wantX += (ox / od) * push;
        wantZ += (oz / od) * push;
      }
    }

    const accel = 15;
    this.velocity.x += (wantX - this.velocity.x) * Math.min(1, accel * dt);
    this.velocity.z += (wantZ - this.velocity.z) * Math.min(1, accel * dt);
    this.velocity.x += this.knock.x;
    this.velocity.z += this.knock.z;
    this.velocity.y = 0;
    this.knock.multiplyScalar(Math.max(0, 1 - 7 * dt));

    g.position.x += this.velocity.x * dt;
    g.position.z += this.velocity.z * dt;
    // slide around cover instead of getting stuck on it
    this.game.arena.resolveCircle(g.position, this.hitRadius * 0.72);
    g.position.x = Math.max(-29.2, Math.min(29.2, g.position.x));
    g.position.z = Math.max(-29.2, Math.min(29.2, g.position.z));

    // hard stand-off so drones never clip through the camera
    const sdx = g.position.x - ppos.x;
    const sdz = g.position.z - ppos.z;
    const sd = Math.hypot(sdx, sdz);
    const minDist = this.hitRadius + (this.meleeWindup > 0 ? 0.75 : 2.3);
    if (sd < minDist) {
      if (sd < 0.001) {
        g.position.x = ppos.x + minDist;
        g.position.z = ppos.z;
      } else {
        g.position.x = ppos.x + (sdx / sd) * minDist;
        g.position.z = ppos.z + (sdz / sd) * minDist;
      }
    }

    // hover bob + lunge
    this.lunge = Math.max(0, this.lunge - dt * 3.5);
    const bob = Math.sin(this.age * 2.6 + this.phase) * 0.16;
    g.position.y += (this.baseY + bob - g.position.y) * Math.min(1, 6 * dt);
    this.core.position.z = -this.lunge * 0.55;

    // anim
    this.ring1.rotation.z += dt * 2.1;
    this.ring1.rotation.y += dt * 1.3;
    this.ring2.rotation.x += dt * 1.6;
    this.thruster.scale.y = 0.8 + Math.sin(this.age * 18 + this.phase) * 0.2;
    this.halo.scale.setScalar(this.type.radius * (1.0 + Math.sin(this.age * 5) * 0.08));

    this.face(player, dt, 7);

    // aim / attacks
    this.attackT -= dt;
    if (this.type.range === 'ranged') {
      if (this.windup > 0) {
        this.windup -= dt;
        const k = 1 - this.windup / 0.55;
        this.eye.scale.setScalar(1 + k * 0.9);
        this.halo.material.opacity = 0.9 + k * 0.6;
        if (this.windup <= 0) {
          this.eye.scale.setScalar(1);
          this.halo.material.opacity = 0.85;
          this.fireProjectile();
        }
      } else if (this.attackT <= 0 && dist < 30 && dist > 3) {
        if (!this.game.arena.raycastBlocked(
          new THREE.Vector3(g.position.x, g.position.y, g.position.z),
          new THREE.Vector3(dirX, 0, dirZ), dist - 0.5
        )) {
          this.attackT = this.type.attackCd * (0.85 + Math.random() * 0.3);
          this.windup = 0.55;
        }
      }
    } else {
      const reach = this.hitRadius + 1.75;
      if (this.meleeWindup > 0) {
        // telegraphed lunge — the player can strafe out of it
        this.meleeWindup -= dt;
        const k = 1 - Math.max(0, this.meleeWindup) / 0.42;
        this.core.scale.setScalar(1 + k * 0.3);
        this.eye.scale.setScalar(1 + k * 0.8);
        this.halo.material.opacity = 0.8 + k * 0.8;
        if (this.meleeWindup <= 0) {
          this.core.scale.setScalar(1);
          this.eye.scale.setScalar(1);
          this.halo.material.opacity = 0.85;
          if (dist < reach + 0.9) {
            this.lunge = 1;
            player.damage(this.type.damage, g.position);
            this.game.effects.shockwave(new THREE.Vector3(g.position.x, g.position.y, g.position.z), this.type.color, 0.8);
          }
        }
      } else if (dist < 5.0 && this.attackT <= 0) {
        this.attackT = this.type.attackCd + 0.42;
        this.meleeWindup = 0.42;
      }
    }

    // hit flash
    if (this.flash > 0) {
      this.flash -= dt;
      const k = Math.max(0, this.flash / 0.12);
      this.bodyMat.emissiveIntensity = 0.18 + k * 2.6;
      this.eye.material.color.setRGB(1, 1 - k * 0.7, 1 - k * 0.7);
    }

    // health bar
    const hurt = this.hp < this.maxHp;
    this.bar.visible = hurt;
    if (hurt) {
      const f = Math.max(0, this.hp / this.maxHp);
      this.barFill.scale.x = f;
      this.barFill.position.x = -(1 - f) * 0.53;
      this.barFill.material.color.setHex(f > 0.5 ? this.type.color : 0xff2f2f);
      // billboard toward the camera (handles the drone's own rotation)
      this.bar.lookAt(this.game.camera.position);
    }

    // shadow stays on the floor
    this.shadow.position.y = 0.02 - g.position.y;
    const sh = 0.7 + (g.position.y - this.baseY) * 0.1;
    this.shadow.scale.setScalar(Math.max(0.55, sh));
  }

  face(player, dt, speed) {
    const targetYaw = Math.atan2(
      player.position.x - this.group.position.x,
      player.position.z - this.group.position.z
    ) + Math.PI;
    let cur = this.group.rotation.y;
    let diff = targetYaw - cur;
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    // the eye/lens points along local -z, so the model faces targetYaw + PI
    this.group.rotation.y = cur + diff * Math.min(1, speed * dt);
  }

  fireProjectile() {
    const g = this.group.position;
    const target = this.game.player.position.clone();
    target.y = this.game.player.eyeY - 0.15;
    const origin = new THREE.Vector3(g.x, g.y, g.z);
    const dir = target.sub(origin).normalize();
    dir.x += (Math.random() - 0.5) * 0.06;
    dir.y += (Math.random() - 0.5) * 0.04;
    dir.z += (Math.random() - 0.5) * 0.06;
    dir.normalize();
    this.game.spawnEnemyBolt(origin, dir, this.type.color);
    this.game.audio.enemyShot();
  }

  /* --------------------------- damage --------------------------- */
  takeDamage(amount, point, crit = false) {
    if (!this.alive) return false;
    this.hp -= amount;
    this.flash = 0.12;
    this.bar.visible = true;
    if (point) {
      const d = new THREE.Vector3().subVectors(this.group.position, this.game.player.position).setY(0).normalize();
      this.knock.addScaledVector(d, crit ? 2.2 : 1.1);
    }
    if (this.hp <= 0) { this.die(point); return true; }
    return false;
  }

  die(point) {
    if (!this.alive) return;
    this.alive = false;
    const p = this.group.position.clone();
    this.game.effects.explosion(p, this.type.color, this.type.size);
    this.game.effects.sparkBurst(p, new THREE.Vector3(0, 1, 0), this.type.color, 18, 10);
    this.game.audio.kill();
    // remove
    this.game.scene.remove(this.group);
    this.group.traverse((o) => {
      if (o.geometry && o.geometry !== barBgGeo && o.geometry !== barFillGeo) o.geometry.dispose?.();
      if (o.material && o.material.map !== getGlowTexture()) {
        o.material.dispose?.();
      }
    });
    this.game.onEnemyKilled(this, point);
  }
}

export { TYPES };

Enemy.sharedBarBg = barBgGeo;
Enemy.sharedBarFill = barFillGeo;
