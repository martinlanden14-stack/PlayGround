// Enemies: hover drones, rushing stalkers, and the Warden boss.
import * as THREE from 'three';
import { clamp, damp, glowSprite, rand, TAU } from './utils.js';

const HIT_COLORS = {
  drone: 0xff5a8c,
  stalker: 0xffcf5c,
  warden: 0xff8a3d,
};

class Enemy {
  constructor(manager, type, pos, wave) {
    this.manager = manager;
    this.game = manager.game;
    this.type = type;
    this.pos = pos.clone();
    this.vel = new THREE.Vector3();
    this.wave = wave;
    this.alive = true;
    this.dying = false;
    this.deathT = 0;
    this.spawnT = 0.55;
    this.flash = 0;
    this.phase = rand(TAU);
    this.hitRadius = 0.68;
    this.impactColor = HIT_COLORS[type] || 0x9ffcff;
    this.cooldown = rand(2.2, 1.2);
    this.windup = 0;
    this.scoreValue = 100;
    this.baseY = this.pos.y;

    this.group = new THREE.Group();
    this.group.position.copy(this.pos);
    this.group.scale.setScalar(0.2);
    manager.scene.add(this.group);

    this.shadow = new THREE.Mesh(manager.shadowGeo, manager.shadowMat);
    this.shadow.rotation.x = -Math.PI / 2;
    this.shadow.position.set(this.pos.x, 0.04, this.pos.z);
    manager.scene.add(this.shadow);

    this.aimPoint = new THREE.Vector3().copy(this.pos);
    this._toPlayer = new THREE.Vector3();
    this._tmp = new THREE.Vector3();
  }

  _baseInit(hp) {
    this.hp = hp;
    this.maxHp = hp;
  }

  _flashUpdate(dt) {
    this.flash = Math.max(0, this.flash - dt * 6);
    if (this.coreMat) {
      this.coreMat.emissiveIntensity = this.coreBase + this.flash * 14;
    }
    if (this.eyeMat) this.eyeMat.emissiveIntensity = 2.4 + this.flash * 12;
  }

  _facePlayer(extraY = 0) {
    const dx = this.game.player.pos.x - this.pos.x;
    const dz = this.game.player.pos.z - this.pos.z;
    this.group.rotation.y = Math.atan2(dx, dz) + extraY;
  }

  _updateAimPoint() {
    this.aimPoint.copy(this.pos);
    this.aimPoint.y += this.aimOffsetY || 0;
    this.aimPoint.copy(this.group.position);
    this.aimPoint.y += this.aimOffsetY || 0;
  }

  _moveWithHover(dt, desired, maxSpeed, accel = 3.4) {
    const dx = desired.x - this.pos.x;
    const dz = desired.z - this.pos.z;
    const dist = Math.hypot(dx, dz);
    let sx = 0;
    let sz = 0;
    if (dist > 0.05) {
      const speed = Math.min(maxSpeed, dist * 1.6);
      sx = (dx / dist) * speed;
      sz = (dz / dist) * speed;
    }
    this.vel.x = damp(this.vel.x, sx, accel, dt);
    this.vel.z = damp(this.vel.z, sz, accel, dt);
    this.pos.x += this.vel.x * dt;
    this.pos.z += this.vel.z * dt;
    this.game.world.resolveCircle(this.pos, 0.62, this.pos.y - 0.4, this.pos.y + 0.4);
    this.pos.x = clamp(this.pos.x, -27.5, 27.5);
    this.pos.z = clamp(this.pos.z, -27.5, 27.5);
  }

  _shootProjectile(target, speed, damage, scale = 1, spreadAngle = 0) {
    const origin = this.pos.clone();
    origin.y += 0.1;
    const dir = target.clone().sub(origin).normalize();
    if (spreadAngle) {
      const angle = rand(spreadAngle, -spreadAngle);
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const x = dir.x * cos - dir.z * sin;
      const z = dir.x * sin + dir.z * cos;
      dir.x = x;
      dir.z = z;
      dir.normalize();
    }
    this.manager.spawnProjectile(origin, dir, speed, damage, scale, this.type);
    this.game.audio.enemyShoot();
    this.game.fx.flash(origin, { color: 0xff5a8c, scale: 1.6 * scale, life: 0.12 });
  }

  _losToPlayer() {
    const p = this.game.player;
    return this.game.world.lineOfSight(
      this.pos.x,
      this.pos.y,
      this.pos.z,
      p.pos.x,
      p.pos.y + 1.2,
      p.pos.z
    );
  }

  damage(amount, point, dir) {
    if (!this.alive) return;
    this.hp -= amount;
    this.flash = 1;
    this.vel.x += dir.x * 0.6;
    this.vel.z += dir.z * 0.6;
    if (this.hp <= 0) this.die();
  }

  die() {
    if (!this.alive) return;
    this.alive = false;
    this.dying = true;
    this.deathT = this.type === 'warden' ? 1.1 : 0.4;
    const big = this.type === 'warden';
    this.game.fx.explosion(this.group.position, big);
    this.game.audio.enemyDie(big);
    this.game.addShake(big ? 0.7 : 0.16);
    this.game.onEnemyKilled(this);

    if (this.shadow) {
      this.shadow.visible = false;
    }
    this.manager.onDeath(this);
  }

  updateDeath(dt) {
    this.deathT -= dt;
    this.group.rotation.y += dt * 9;
    this.group.rotation.z += dt * 4;
    const k = Math.max(0.001, this.deathT / (this.type === 'warden' ? 1.1 : 0.4));
    this.group.scale.setScalar(k * (this.group.userData.spawnScale || 1));
    if (Math.random() < dt * 30) {
      this.game.fx.burst(this.group.position, {
        count: 2,
        speed: 4,
        size: 0.1,
        life: 0.4,
        color: this.impactColor,
        color2: 0xffffff,
        gravity: 1,
      });
    }
    if (this.deathT <= 0) this.manager.remove(this);
  }
}

class Drone extends Enemy {
  constructor(manager, pos, wave) {
    super(manager, 'drone', pos, wave);
    this.pos.y = 2.35 + rand(0.6, -0.2);
    this.baseY = this.pos.y;
    this.hitRadius = 0.72;
    this.aimOffsetY = 0;
    this.scoreValue = 100;
    this.orbitDir = Math.random() < 0.5 ? 1 : -1;
    this.orbitTimer = rand(3, 1);
    this.strafeRadius = rand(10.5, 7.5);
    this.orbitAngle = Math.atan2(pos.x - manager.game.player.pos.x, pos.z - manager.game.player.pos.z);
    this.fireDelay = rand(2.4, 1.2);
    this._build(wave);
    this._baseInit(34 + wave * 3);
  }

  _build(wave) {
    const m = this.manager;
    const shellMat = m.droneShell.clone();
    const coreMat = m.droneCore.clone();
    this.coreMat = coreMat;
    this.coreBase = 3.2;
    coreMat.emissiveIntensity = this.coreBase;

    const shell = new THREE.Mesh(m.droneShellGeo, shellMat);
    shell.scale.set(1, 0.72, 1);
    this.group.add(shell);

    const ring = new THREE.Mesh(m.droneRingGeo, m.droneRingMat);
    ring.rotation.x = Math.PI / 2;
    this.group.add(ring);
    this.ring = ring;

    const core = new THREE.Mesh(m.droneCoreGeo, coreMat);
    core.position.z = 0.08;
    this.group.add(core);
    this.core = core;

    const eye = new THREE.Mesh(m.eyeGeo, m.eyeMat.clone());
    eye.position.set(0, 0.02, 0.46);
    eye.scale.setScalar(1.3);
    this.eyeMat = eye.material;
    this.group.add(eye);

    for (const side of [-1, 1]) {
      const fin = new THREE.Mesh(m.finGeo, m.droneFinMat);
      fin.position.set(side * 0.5, 0.02, 0);
      fin.rotation.z = side * 0.28;
      fin.rotation.y = side * 0.12;
      this.group.add(fin);
    }

    const glow = glowSprite(0xff2d78, 3.0, 0.7);
    this.group.add(glow);
    this.glow = glow;

    // point the eye downrange
    this.group.userData.spawnScale = 1.16;
    this.aimOffsetY = 0;
  }

  update(dt, time) {
    this._flashUpdate(dt);
    this.spawnT = Math.max(0, this.spawnT - dt);
    const spawnK = 1 - this.spawnT / 0.55;
    this.group.scale.setScalar((0.2 + 0.8 * spawnK) * 1.16);

    const player = this.game.player;
    this._facePlayer();

    this.orbitTimer -= dt;
    if (this.orbitTimer <= 0) {
      this.orbitTimer = rand(3.4, 1.2);
      this.orbitDir *= Math.random() < 0.35 ? -1 : 1;
      this.strafeRadius = rand(11, 7);
    }

    // orbit around the player, swapping direction and tightening the circle
    this.orbitAngle += this.orbitDir * dt * 0.42;
    const dist = Math.hypot(player.pos.x - this.pos.x, player.pos.z - this.pos.z);
    const radius = dist > 15 ? 9 : this.strafeRadius;
    const desired = this._tmp.set(
      player.pos.x + Math.sin(this.orbitAngle) * radius,
      0,
      player.pos.z + Math.cos(this.orbitAngle) * radius
    );

    const speed = Math.min(4.8, 2.9 + this.wave * 0.08);
    this._moveWithHover(dt, desired, speed, 2.8);

    // hover bob
    const bob = Math.sin(time * 1.7 + this.phase) * 0.22;
    this.pos.y = damp(this.pos.y, this.baseY + bob, 3, dt);
    this.group.position.copy(this.pos);
    this._updateAimPoint();

    this.ring.rotation.z += dt * (1.4 + this.orbitDir * 0.4);
    this.glow.material.opacity = 0.4 + Math.sin(time * 3 + this.phase) * 0.12;

    // attack
    this.cooldown -= dt;
    if (this.windup > 0) {
      this.windup -= dt;
      const p = 1 - this.windup / 0.5;
      this.coreMat.emissiveIntensity = this.coreBase + p * 7;
      this.core.scale.setScalar(1 + p * 0.4);
      if (this.windup <= 0) {
        this.core.scale.setScalar(1);
        this.coreMat.emissiveIntensity = this.coreBase;
        this._shootProjectile(
          this._tmp.set(player.pos.x, player.pos.y + 1.2, player.pos.z),
          15,
          10 + Math.min(5, this.wave),
          1
        );
        this.cooldown = rand(2.9, 1.7) - Math.min(0.8, this.wave * 0.05);
      }
    } else if (this.cooldown <= 0 && this.spawnT <= 0 && dist < 26 && this._losToPlayer()) {
      this.windup = 0.5;
    }
  }
}

class Stalker extends Enemy {
  constructor(manager, pos, wave) {
    super(manager, 'stalker', pos, wave);
    this.pos.y = 0;
    this.hitRadius = 0.62;
    this.aimOffsetY = 0.55;
    this.scoreValue = 150;
    this.speed = Math.min(7.4, 4.9 + wave * 0.12);
    this.attackTimer = 0;
    this.weave = rand(TAU);
    this.legPhase = rand(TAU);
    this._build();
    this._baseInit(22 + wave * 3.5);
  }

  _build() {
    const m = this.manager;
    const bodyMat = m.stalkerBodyMat.clone();
    this.coreMat = bodyMat;
    this.coreBase = 0.8;
    bodyMat.emissiveIntensity = 0.8;

    const body = new THREE.Mesh(m.stalkerBodyGeo, bodyMat);
    body.position.y = 0.52;
    body.scale.set(1.1, 0.62, 1.5);
    this.group.add(body);

    // angular back plates
    for (const side of [-1, 1]) {
      const plate = new THREE.Mesh(m.stalkerPlateGeo, m.stalkerSpineMat);
      plate.position.set(side * 0.28, 0.7, -0.18);
      plate.rotation.set(-0.5, side * 0.3, side * 0.45);
      this.group.add(plate);
    }

    // forward horns
    for (const side of [-1, 1]) {
      const horn = new THREE.Mesh(m.stalkerHornGeo, m.stalkerSpineMat);
      horn.position.set(side * 0.23, 0.58, 0.42);
      horn.rotation.set(1.15, 0, side * 0.25);
      this.group.add(horn);
    }

    // amber visor slit
    const visor = new THREE.Mesh(m.stalkerVisorGeo, m.eyeMat.clone());
    visor.position.set(0, 0.56, 0.56);
    this.eyeMat = visor.material;
    this.group.add(visor);

    // glowing core between the plates
    const core = new THREE.Mesh(m.stalkerCoreGeo, m.eyeMat);
    core.position.set(0, 0.46, 0.1);
    this.group.add(core);

    this.legs = [];
    for (let i = 0; i < 4; i++) {
      const side = i < 2 ? -1 : 1;
      const front = i % 2 === 0 ? 1 : -1;
      const leg = new THREE.Mesh(m.legGeo, m.stalkerLegMat);
      leg.position.set(side * 0.3, 0.3, front * 0.32);
      leg.rotation.z = side * 0.65;
      leg.rotation.x = front * 0.3;
      this.group.add(leg);
      this.legs.push({ mesh: leg, side, front });
    }

    const glow = glowSprite(0xff8a3d, 1.35, 0.4);
    glow.position.y = 0.55;
    this.group.add(glow);
    this.glow = glow;
    this.group.userData.spawnScale = 1;
  }

  update(dt, time) {
    this._flashUpdate(dt);
    this.spawnT = Math.max(0, this.spawnT - dt);
    this.group.scale.setScalar(0.2 + 0.8 * (1 - this.spawnT / 0.55));

    const player = this.game.player;
    this._facePlayer();
    const dx = player.pos.x - this.pos.x;
    const dz = player.pos.z - this.pos.z;
    const dist = Math.hypot(dx, dz);

    // weaving approach
    this.weave += dt * 2.4;
    const weaveOff = Math.sin(this.weave) * 0.5;
    const inv = 1 / Math.max(0.001, dist);
    let moveX = dx * inv;
    let moveZ = dz * inv;
    // perpendicular offset
    const px = -moveZ * weaveOff;
    const pz = moveX * weaveOff;

    let speed = this.speed;
    if (this.attackTimer > 0) speed *= 0.25;
    if (dist < 1.7) speed = 0;

    this.vel.x = damp(this.vel.x, (moveX + px) * speed, 8, dt);
    this.vel.z = damp(this.vel.z, (moveZ + pz) * speed, 8, dt);

    this.pos.x += this.vel.x * dt;
    this.pos.z += this.vel.z * dt;

    // climb low steps
    for (const b of this.game.world.colliders) {
      const rise = b.maxY - this.pos.y;
      if (rise <= 0.02 || rise > 0.58) continue;
      const nx = Math.max(b.minX, Math.min(this.pos.x, b.maxX));
      const nz = Math.max(b.minZ, Math.min(this.pos.z, b.maxZ));
      if (Math.hypot(this.pos.x - nx, this.pos.z - nz) < 0.55) {
        this.pos.y = b.maxY;
        break;
      }
    }

    this.game.world.resolveCircle(this.pos, 0.48, this.pos.y + 0.15, this.pos.y + 1.0);
    this.pos.x = clamp(this.pos.x, -28, 28);
    this.pos.z = clamp(this.pos.z, -28, 28);

    // ground follow
    const ground = this.game.world.groundHeightAt(this.pos.x, this.pos.z, 0.35, this.pos.y, 0.9);
    if (this.pos.y > ground + 0.02) {
      this.pos.y = Math.max(ground, this.pos.y - dt * 9);
    } else {
      this.pos.y = ground;
    }

    this.group.position.copy(this.pos);
    this._updateAimPoint();

    // leg scuttle
    this.legPhase += dt * (4 + speed * 1.6);
    for (const leg of this.legs) {
      leg.mesh.rotation.z = leg.side * 0.6 + Math.sin(this.legPhase + leg.front * 1.6 + leg.side) * 0.3;
      leg.mesh.rotation.x = leg.front * 0.25 + Math.cos(this.legPhase + leg.front) * 0.3;
    }
    this.group.position.y = this.pos.y + Math.abs(Math.sin(this.legPhase * 1.4)) * 0.035;
    this.glow.material.opacity = 0.28 + Math.sin(time * 5 + this.phase) * 0.1;

    // melee attack with a telegraphed crouch
    this.attackTimer = Math.max(0, this.attackTimer - dt);
    this.cooldown -= dt;
    if (this.windup > 0) {
      this.windup -= dt;
      const p = 1 - this.windup / 0.38;
      this.group.position.y = this.pos.y - p * 0.12;
      this.coreMat.emissiveIntensity = 0.8 + p * 5;
      if (this.windup <= 0) {
        this.coreMat.emissiveIntensity = 0.8;
        if (dist < 2.5 && !player.dead) {
          player.takeDamage(13 + this.wave, this.pos);
          this.game.fx.burst(
            player.pos.clone().setY(player.pos.y + 1.2),
            { count: 12, speed: 4, size: 0.1, life: 0.5, color: 0xff4d5e, color2: 0xffcf5c, gravity: 2 }
          );
        }
        this.cooldown = 1.45;
        this.attackTimer = 0.5;
      }
    } else if (dist < 2.1 && this.cooldown <= 0 && this.spawnT <= 0) {
      this.windup = 0.38;
    }
  }
}

class Warden extends Enemy {
  constructor(manager, pos, wave) {
    super(manager, 'warden', pos, wave);
    this.pos.y = 3.2;
    this.baseY = 3.2;
    this.hitRadius = 1.7;
    this.aimOffsetY = 0.2;
    this.scoreValue = 2000;
    this.fireDelay = 2.4;
    this.volleyCount = 0;
    this.orbitDir = 1;
    this.orbitAngle = Math.atan2(pos.x - manager.game.player.pos.x, pos.z - manager.game.player.pos.z);
    this.summoned = false;
    this.group.userData.spawnScale = 1.55;
    this._build(wave);
    this._baseInit(260 + wave * 38);
  }

  _build(wave) {
    const m = this.manager;
    const shellMat = m.wardenShellMat.clone();
    const coreMat = m.wardenCoreMat.clone();
    this.coreMat = coreMat;
    this.coreBase = 3.6;
    coreMat.emissiveIntensity = this.coreBase;

    const shell = new THREE.Mesh(m.wardenShellGeo, shellMat);
    this.group.add(shell);
    const shell2 = new THREE.Mesh(m.wardenShellGeo, m.wardenShellMat);
    shell2.scale.set(0.7, 0.55, 0.7);
    shell2.position.y = 0.55;
    shell2.rotation.y = 0.5;
    this.group.add(shell2);

    const core = new THREE.Mesh(m.wardenCoreGeo, coreMat);
    this.group.add(core);
    this.core = core;

    const ringA = new THREE.Mesh(m.wardenRingGeo, m.wardenRingMat);
    ringA.rotation.x = Math.PI / 2;
    this.group.add(ringA);
    this.ringA = ringA;
    const ringB = new THREE.Mesh(m.wardenRingGeo, m.wardenRingMatPink);
    ringB.rotation.x = Math.PI / 2;
    ringB.rotation.z = 0.7;
    ringB.scale.setScalar(1.22);
    this.group.add(ringB);
    this.ringB = ringB;

    this.eyes = [];
    for (let i = -1; i <= 1; i++) {
      const eye = new THREE.Mesh(m.eyeGeo, m.wardenEyeMat.clone());
      eye.position.set(i * 0.5, 0.05, 1.15);
      eye.scale.setScalar(1.9);
      this.group.add(eye);
      this.eyes.push(eye);
    }
    this.eyeMat = this.eyes[0].material;

    const glow = glowSprite(0xff2d78, 5, 0.35);
    this.group.add(glow);
    this.glow = glow;

    const crown = new THREE.Mesh(m.wardenCrownGeo, m.wardenRingMatPink);
    crown.position.y = 1.1;
    this.group.add(crown);
    this.crown = crown;
    this.group.scale.setScalar(3.2);
  }

  update(dt, time) {
    this._flashUpdate(dt);
    this.spawnT = Math.max(0, this.spawnT - dt);
    const spawnK = clamp(1 - this.spawnT / 0.55, 0, 1);
    this.group.scale.setScalar(0.2 + 1.35 * spawnK);

    const player = this.game.player;
    this._facePlayer();
    const dx = this.pos.x - player.pos.x;
    const dz = this.pos.z - player.pos.z;
    const dist = Math.hypot(dx, dz);

    const radius = 11;
    this.orbitAngle += dt * 0.12;
    const desired = this._tmp.set(
      player.pos.x + Math.sin(this.orbitAngle) * radius,
      0,
      player.pos.z + Math.cos(this.orbitAngle) * radius
    );
    this._moveWithHover(dt, desired, 2.4, 1.6);
    this.pos.y = damp(this.pos.y, this.baseY + Math.sin(time * 0.9 + this.phase) * 0.35, 2.5, dt);
    this.group.position.copy(this.pos);
    this._updateAimPoint();
    this.aimPoint.y = this.pos.y + 0.2;

    this.ringA.rotation.z += dt * 0.55;
    this.ringB.rotation.z -= dt * 0.8;
    this.crown.rotation.y += dt * 0.7;
    this.glow.material.opacity = 0.45 + Math.sin(time * 2.3) * 0.12;

    // attacks
    this.cooldown -= dt;
    if (this.windup > 0) {
      this.windup -= dt;
      const p = 1 - this.windup / 0.6;
      this.coreMat.emissiveIntensity = this.coreBase + p * 8;
      if (this.windup <= 0) {
        this.coreMat.emissiveIntensity = this.coreBase;
        if (this.volleyCount % 2 === 0) {
          for (let i = -1; i <= 1; i++) {
            this._shootProjectile(
              this._tmp.set(player.pos.x + i * 1.8, player.pos.y + 1.1, player.pos.z),
              13,
              12 + Math.min(6, this.wave),
              1.6
            );
          }
        } else {
          for (let i = 0; i < 7; i++) {
            this._shootProjectile(
              this._tmp.set(player.pos.x, player.pos.y + 1.1, player.pos.z),
              10.5,
              9 + Math.min(4, this.wave),
              1.3,
              Math.PI * 0.9
            );
          }
        }
        this.volleyCount++;
        this.cooldown = 2.5;
      }
    } else if (this.cooldown <= 0 && this.spawnT <= 0 && this._losToPlayer()) {
      this.windup = 0.6;
    }

    // summon escorts once at half health
    if (!this.summoned && this.hp < this.maxHp * 0.5) {
      this.summoned = true;
      this.game.ui.toast('WARDEN DEPLOYING ESCORTS', 'warn');
      for (let i = 0; i < 2; i++) {
        this.manager.spawn('drone', this.wave, true);
      }
      this.game.audio.spawn();
    }

    this.game.ui.updateBoss(this.hp / this.maxHp);
  }
}

export class EnemyManager {
  constructor(game) {
    this.game = game;
    this.scene = game.scene;
    this.list = [];
    this.projectiles = [];
    this.orbs = [];
    this.boss = null;

    this._buildShared();
  }

  _buildShared() {
    this.droneShellGeo = new THREE.SphereGeometry(0.42, 9, 7);
    this.droneCoreGeo = new THREE.IcosahedronGeometry(0.26, 0);
    this.droneRingGeo = new THREE.TorusGeometry(0.62, 0.052, 5, 22);
    this.finGeo = new THREE.BoxGeometry(0.52, 0.05, 0.18);
    this.eyeGeo = new THREE.SphereGeometry(0.09, 8, 6);
    this.stalkerBodyGeo = new THREE.SphereGeometry(0.42, 8, 6);
    this.stalkerSpineGeo = new THREE.ConeGeometry(0.2, 0.55, 5);
    this.stalkerPlateGeo = new THREE.ConeGeometry(0.19, 0.52, 4);
    this.stalkerHornGeo = new THREE.ConeGeometry(0.055, 0.38, 4);
    this.stalkerVisorGeo = new THREE.BoxGeometry(0.36, 0.055, 0.05);
    this.stalkerCoreGeo = new THREE.OctahedronGeometry(0.11, 0);
    this.legGeo = new THREE.BoxGeometry(0.07, 0.6, 0.07);
    this.wardenShellGeo = new THREE.CylinderGeometry(1.45, 1.05, 0.95, 6);
    this.wardenCoreGeo = new THREE.IcosahedronGeometry(0.62, 1);
    this.wardenRingGeo = new THREE.TorusGeometry(1.8, 0.08, 6, 32);
    this.wardenCrownGeo = new THREE.TorusGeometry(0.95, 0.07, 5, 6);
    this.shadowGeo = new THREE.CircleGeometry(0.68, 20);
    this.projectileGeo = new THREE.SphereGeometry(0.17, 10, 8);
    this.orbGeo = new THREE.IcosahedronGeometry(0.24, 0);

    this.shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.28,
      depthWrite: false,
    });
    this.droneShell = new THREE.MeshStandardMaterial({ color: 0x3a4c5e, roughness: 0.45, metalness: 0.65 });
    this.droneCore = new THREE.MeshStandardMaterial({
      color: 0x2a0614,
      emissive: 0xff2d78,
      emissiveIntensity: 3.2,
      roughness: 0.2,
      metalness: 0.2,
    });
    this.droneRingMat = new THREE.MeshStandardMaterial({ color: 0x111922, roughness: 0.5, metalness: 0.8 });
    this.droneFinMat = new THREE.MeshStandardMaterial({ color: 0x36485a, roughness: 0.4, metalness: 0.8 });
    this.eyeMat = new THREE.MeshStandardMaterial({
      color: 0x2a1004,
      emissive: 0xff8a3d,
      emissiveIntensity: 3.2,
      roughness: 0.2,
    });
    this.stalkerBodyMat = new THREE.MeshStandardMaterial({
      color: 0x1d1a24,
      emissive: 0x8a3a10,
      emissiveIntensity: 0.8,
      roughness: 0.52,
      metalness: 0.55,
    });
    this.stalkerSpineMat = new THREE.MeshStandardMaterial({ color: 0x474a55, roughness: 0.4, metalness: 0.8 });
    this.stalkerLegMat = new THREE.MeshStandardMaterial({ color: 0x141a22, roughness: 0.6, metalness: 0.6 });
    this.wardenShellMat = new THREE.MeshStandardMaterial({ color: 0x241826, roughness: 0.45, metalness: 0.8 });
    this.wardenCoreMat = new THREE.MeshStandardMaterial({
      color: 0x2a0614,
      emissive: 0xff2d78,
      emissiveIntensity: 2.5,
      roughness: 0.2,
      metalness: 0.2,
    });
    this.wardenRingMat = new THREE.MeshStandardMaterial({ color: 0x3b2a24, roughness: 0.4, metalness: 0.8 });
    this.wardenRingMatPink = new THREE.MeshStandardMaterial({
      color: 0x2a0614,
      emissive: 0xff2d78,
      emissiveIntensity: 1.8,
      roughness: 0.4,
      metalness: 0.4,
    });
    this.wardenEyeMat = new THREE.MeshStandardMaterial({
      color: 0x2a0614,
      emissive: 0xff8a3d,
      emissiveIntensity: 1.9,
      roughness: 0.2,
    });
    this.projectileMat = new THREE.MeshBasicMaterial({ color: 0xff5a8c });
    this.orbMat = new THREE.MeshStandardMaterial({
      color: 0x0a2a18,
      emissive: 0x7dffa5,
      emissiveIntensity: 4,
      roughness: 0.2,
      metalness: 0.2,
    });
  }

  spawn(type, wave, quiet = false) {
    const pad = this.game.world.pickSpawn(this.game.player.pos, this.list);
    const y = type === 'warden' ? 3.1 : type === 'stalker' ? 0.05 : 2.3;
    const pos = new THREE.Vector3(pad.x + rand(1.4, -1.4), y, pad.z + rand(1.4, -1.4));
    let enemy;
    if (type === 'stalker') enemy = new Stalker(this, pos, wave);
    else if (type === 'warden') enemy = new Warden(this, pos, wave);
    else enemy = new Drone(this, pos, wave);

    this.list.push(enemy);
    if (type === 'warden') {
      this.boss = enemy;
      this.game.ui.showBoss();
      this.game.audio.bossSpawn();
      this.game.ui.toast('WARDEN CLASS SIGNATURE DETECTED', 'warn');
    } else if (!quiet) {
      this.game.audio.spawn();
    }
    this.game.fx.spawnPulse(pos.clone().setY(0.3));
    if (type === 'warden') this.game.fx.spawnPulse(pos.clone().setY(1.2));
    return enemy;
  }

  spawnProjectile(origin, dir, speed, damage, scale = 1, type = 'drone') {
    let p = this.projectiles.find((x) => !x.active);
    if (!p) {
      const mesh = new THREE.Mesh(this.projectileGeo, this.projectileMat.clone());
      mesh.visible = false;
      const glow = glowSprite(0xff5a8c, 1.1, 0.75);
      mesh.add(glow);
      this.scene.add(mesh);
      p = { mesh, active: false };
      this.projectiles.push(p);
    }
    p.active = true;
    p.mesh.visible = true;
    p.mesh.position.copy(origin);
    p.mesh.scale.setScalar(scale);
    p.mesh.material.color.set(type === 'warden' ? 0xff8a3d : type === 'stalker' ? 0xffcf5c : 0xff5a8c);
    p.mesh.children[0].material.color.set(type === 'warden' ? 0xff8a3d : 0xff5a8c);
    p.mesh.children[0].scale.setScalar(5 / scale);
    p.pos = origin.clone();
    p.prev = origin.clone();
    p.vel = dir.clone().multiplyScalar(speed);
    p.damage = damage;
    p.radius = 0.18 * scale;
    p.life = 5.5;
    p.speed = speed;
  }

  spawnOrb(pos) {
    const group = new THREE.Group();
    const orb = new THREE.Mesh(this.orbGeo, this.orbMat);
    group.add(orb);
    const halo = glowSprite(0x7dffa5, 2.2, 0.5);
    group.add(halo);
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.45, 0.02, 5, 18),
      new THREE.MeshBasicMaterial({ color: 0x7dffa5, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    ring.rotation.x = Math.PI / 2;
    group.add(ring);
    group.position.copy(pos);
    group.position.y = 1.05;
    this.scene.add(group);
    this.orbs.push({ group, orb, ring, halo, life: 22, phase: rand(TAU), active: true });
  }

  onDeath(enemy) {
    // health drops
    if (enemy.type === 'warden') {
      this.spawnOrb(enemy.group.position.clone());
      this.spawnOrb(enemy.group.position.clone().add(new THREE.Vector3(1.4, 0, 0)));
    } else if (Math.random() < 0.2) {
      this.spawnOrb(enemy.group.position.clone());
    }

    if (enemy === this.boss) {
      this.boss = null;
      this.game.ui.hideBoss();
      for (let i = 0; i < 3; i++) {
        this.game.fx.explosion(
          enemy.group.position.clone().add(new THREE.Vector3(rand(2, -2), rand(1, -1), rand(2, -2))),
          false
        );
      }
    }
  }

  remove(enemy) {
    const idx = this.list.indexOf(enemy);
    if (idx >= 0) this.list.splice(idx, 1);
    this.scene.remove(enemy.group);
    this.scene.remove(enemy.shadow);
    if (enemy.coreMat) enemy.coreMat.dispose();
    if (enemy.eyeMat) enemy.eyeMat.dispose();
    if (enemy === this.boss) {
      this.boss = null;
      this.game.ui.hideBoss();
    }
  }

  activeCount() {
    return this.list.filter((e) => e.alive).length;
  }

  update(dt, time) {
    for (let i = this.list.length - 1; i >= 0; i--) {
      const e = this.list[i];
      if (e.dying) {
        e.updateDeath(dt);
        continue;
      }
      e.update(dt, time);

      // ground shadow
      const sy = this.game.world.groundHeightAt(e.pos.x, e.pos.z, 0.1, e.pos.y, 4);
      e.shadow.position.set(e.pos.x, sy + 0.035, e.pos.z);
      const k = clamp(1 - (e.pos.y - sy) / 9, 0.3, 1);
      e.shadow.scale.setScalar(k);
      e.shadow.material.opacity = 0.28 * k;
    }

    this._updateProjectiles(dt);
    this._updateOrbs(dt, time);
  }

  _updateProjectiles(dt) {
    for (const p of this.projectiles) {
      if (!p.active) continue;
      p.life -= dt;
      p.prev.copy(p.pos);
      p.pos.addScaledVector(p.vel, dt);
      p.mesh.position.copy(p.pos);

      if (p.life <= 0 || p.pos.y < 0.05 || p.pos.y > 12) {
        this._killProjectile(p);
        continue;
      }

      // arena collision
      let hitWall = false;
      for (const b of this.game.world.colliders) {
        const t = this._rayBox(p.prev, p.pos, b);
        if (t !== null) {
          p.pos.lerpVectors(p.prev, p.pos, t);
          hitWall = true;
          break;
        }
      }
      if (hitWall) {
        this.game.fx.burst(p.pos, {
          count: 8,
          speed: 3.4,
          size: 0.09,
          life: 0.35,
          color: 0xff5a8c,
          color2: 0xffffff,
          gravity: 5,
        });
        this._killProjectile(p);
        continue;
      }

      // player hit
      const player = this.game.player;
      if (!player.dead) {
        const cx = player.pos.x;
        const cy = player.pos.y + 1.05;
        const cz = player.pos.z;
        const d = Math.hypot(p.pos.x - cx, p.pos.y - cy, p.pos.z - cz);
        if (d < 0.62 + p.radius) {
          player.takeDamage(p.damage, p.pos);
          this.game.fx.burst(p.pos, {
            count: 14,
            speed: 4,
            size: 0.12,
            life: 0.4,
            color: 0xff4d5e,
            color2: 0xffcf5c,
            gravity: 4,
          });
          this._killProjectile(p);
        }
      }
    }
  }

  _rayBox(a, b, box) {
    // treat the projectile as a point swept along the segment
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dz = b.z - a.z;
    let tmin = 0;
    let tmax = 1;
    for (const [o, d, min, max] of [
      [a.x, dx, box.minX, box.maxX],
      [a.y, dy, box.minY, box.maxY],
      [a.z, dz, box.minZ, box.maxZ],
    ]) {
      if (Math.abs(d) < 1e-9) {
        if (o < min || o > max) return null;
      } else {
        let t1 = (min - o) / d;
        let t2 = (max - o) / d;
        if (t1 > t2) [t1, t2] = [t2, t1];
        if (t1 > tmin) tmin = t1;
        if (t2 < tmax) tmax = t2;
        if (tmin > tmax) return null;
      }
    }
    return tmin;
  }

  _killProjectile(p) {
    p.active = false;
    p.mesh.visible = false;
  }

  _updateOrbs(dt, time) {
    const player = this.game.player;
    for (let i = this.orbs.length - 1; i >= 0; i--) {
      const o = this.orbs[i];
      o.life -= dt;
      o.group.position.y = 1.05 + Math.sin(time * 2.4 + o.phase) * 0.16;
      o.orb.rotation.y += dt * 1.6;
      o.orb.rotation.x += dt * 0.8;
      o.ring.rotation.z += dt * 2;
      o.halo.material.opacity = 0.35 + Math.sin(time * 4 + o.phase) * 0.12;

      const d = Math.hypot(o.group.position.x - player.pos.x, o.group.position.z - player.pos.z);
      if (d < 1.25 && o.life > 0 && !player.dead) {
        player.heal(22);
        this.game.audio.pickup();
        this.game.fx.pickup(o.group.position);
        this.game.ui.toast('+22 INTEGRITY', 'gold');
        this.game.ui.healFlash();
        this.scene.remove(o.group);
        this.orbs.splice(i, 1);
        continue;
      }
      if (o.life <= 0) {
        this.scene.remove(o.group);
        this.orbs.splice(i, 1);
      }
    }
  }

  reset() {
    for (const e of [...this.list]) {
      this.scene.remove(e.group);
      this.scene.remove(e.shadow);
      if (e.coreMat) e.coreMat.dispose();
      if (e.eyeMat) e.eyeMat.dispose();
    }
    this.list.length = 0;
    this.boss = null;
    for (const p of this.projectiles) {
      p.active = false;
      p.mesh.visible = false;
    }
    for (const o of this.orbs) this.scene.remove(o.group);
    this.orbs.length = 0;
  }
}
