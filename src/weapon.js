// Pulse rifle: viewmodel, hitscan, aim assist, recoil and reload.
import * as THREE from 'three';
import { clamp, damp, glowSprite, glowTexture, rayAABB, raySphere, rand } from './utils.js';

const MAG_SIZE = 30;
const FIRE_INTERVAL = 0.115;
const RELOAD_TIME = 1.35;
const DAMAGE = 13;
const AIM_CONE = 0.085; // radians ~4.9 deg
const MAX_RANGE = 80;

export class Weapon {
  constructor(game) {
    this.game = game;
    this.camera = game.camera;
    this.weaponScene = new THREE.Scene();
    this.weaponCamera = new THREE.PerspectiveCamera(58, 1, 0.01, 12);

    this.ammo = MAG_SIZE;
    this.magSize = MAG_SIZE;
    this.cooldown = 0;
    this.reloading = false;
    this.reloadTimer = 0;
    this.recoilZ = 0;
    this.recoilX = 0;
    this.swayX = 0;
    this.swayY = 0;
    this.bobT = 0;
    this.muzzleTimer = 0;
    this.autoReloadDelay = 0;
    this.locked = false;

    this._buildLights();
    this._buildGun();

    this._dir = new THREE.Vector3();
    this._right = new THREE.Vector3();
    this._up = new THREE.Vector3();
    this._muzzle = new THREE.Vector3();
    this._end = new THREE.Vector3();
    this._tmp = new THREE.Vector3();
    this._hit = new THREE.Vector3();
    this._worldUp = new THREE.Vector3(0, 1, 0);
    this._forward = new THREE.Vector3();
  }

  _buildLights() {
    const hemi = new THREE.HemisphereLight(0xbfeaff, 0x0a1018, 1.05);
    this.weaponScene.add(hemi);
    const key = new THREE.DirectionalLight(0xffe6c8, 1.4);
    key.position.set(1.2, 2.2, 1.5);
    this.weaponScene.add(key);
    const rim = new THREE.DirectionalLight(0x48f5ff, 0.8);
    rim.position.set(-1.6, 0.6, -1.2);
    this.weaponScene.add(rim);
    const under = new THREE.PointLight(0xff2d78, 1.6, 2.2, 2);
    under.position.set(0.1, -0.8, -0.2);
    this.weaponScene.add(under);
  }

  _buildGun() {
    const g = new THREE.Group();
    this.gun = g;
    this.gunRoot = new THREE.Group();
    this.gunRoot.add(g);
    this.gunRoot.position.set(0.35, -0.32, -0.85);
    this.gunRoot.rotation.set(0.02, -0.055, 0.01);
    this.weaponScene.add(this.gunRoot);
    this.base = { x: 0.35, y: -0.32, z: -0.85, rx: 0.015, ry: 0.11 };

    const gunMetal = new THREE.MeshStandardMaterial({ color: 0x273441, roughness: 0.62, metalness: 0.45 });
    const gunLight = new THREE.MeshStandardMaterial({ color: 0x3d5062, roughness: 0.58, metalness: 0.4 });
    const gunDark = new THREE.MeshStandardMaterial({ color: 0x141b23, roughness: 0.62, metalness: 0.45 });
    const cyan = new THREE.MeshStandardMaterial({
      color: 0x0a2a33,
      emissive: 0x48f5ff,
      emissiveIntensity: 2.0,
      roughness: 0.25,
      metalness: 0.3,
    });
    const pink = new THREE.MeshStandardMaterial({
      color: 0x2a0614,
      emissive: 0xff2d78,
      emissiveIntensity: 2.6,
      roughness: 0.3,
      metalness: 0.3,
    });

    const add = (geo, mat, x, y, z, rx = 0, ry = 0, rz = 0) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      m.rotation.set(rx, ry, rz);
      g.add(m);
      return m;
    };

    // receiver body
    add(new THREE.BoxGeometry(0.135, 0.145, 0.46), gunMetal, 0, 0, -0.1);
    add(new THREE.BoxGeometry(0.105, 0.04, 0.34), gunLight, 0, 0.09, -0.12);
    add(new THREE.BoxGeometry(0.09, 0.035, 0.2), gunDark, 0, -0.085, -0.17);
    // barrel
    add(new THREE.CylinderGeometry(0.026, 0.03, 0.36, 10), gunDark, 0, 0.012, -0.5, Math.PI / 2);
    add(new THREE.CylinderGeometry(0.034, 0.034, 0.075, 10), gunMetal, 0, 0.012, -0.68, Math.PI / 2);
    add(new THREE.TorusGeometry(0.016, 0.004, 5, 12), pink, 0, 0.012, -0.723, 0);
    // shroud + vents
    add(new THREE.BoxGeometry(0.1, 0.1, 0.28), gunMetal, 0, 0.012, -0.34);
    for (let i = 0; i < 3; i++) {
      add(new THREE.BoxGeometry(0.105, 0.014, 0.028), gunDark, 0, 0.04, -0.27 - i * 0.055);
    }
    // glow strips
    add(new THREE.BoxGeometry(0.012, 0.02, 0.3), cyan, 0.071, 0.02, -0.18);
    add(new THREE.BoxGeometry(0.012, 0.02, 0.3), cyan, -0.071, 0.02, -0.18);
    add(new THREE.BoxGeometry(0.05, 0.012, 0.09), cyan, 0, 0.108, -0.34);
    // grip
    add(new THREE.BoxGeometry(0.078, 0.2, 0.11), gunDark, 0, -0.15, 0.075, 0.3);
    add(new THREE.BoxGeometry(0.084, 0.05, 0.12), gunMetal, 0, -0.06, 0.06, 0.3);
    // magazine
    add(new THREE.BoxGeometry(0.075, 0.19, 0.12), gunLight, 0, -0.16, -0.08, -0.14);
    add(new THREE.BoxGeometry(0.08, 0.03, 0.13), cyan, 0, -0.24, -0.075, -0.14);
    // stock
    add(new THREE.BoxGeometry(0.09, 0.1, 0.2), gunMetal, 0, -0.005, 0.24);
    add(new THREE.BoxGeometry(0.11, 0.13, 0.035), gunDark, 0, -0.01, 0.345);
    // sight ring
    add(new THREE.TorusGeometry(0.032, 0.006, 5, 18), gunDark, 0, 0.112, -0.09);
    add(new THREE.TorusGeometry(0.018, 0.003, 5, 18), cyan, 0, 0.112, -0.09);
    const dot = add(new THREE.SphereGeometry(0.007, 6, 6), pink, 0, 0.112, -0.09);
    dot.material = pink;
    add(new THREE.BoxGeometry(0.018, 0.05, 0.03), gunDark, 0, 0.1, -0.02);
    add(new THREE.BoxGeometry(0.018, 0.05, 0.03), gunDark, 0, 0.1, -0.17);
    // energy cell
    add(new THREE.CylinderGeometry(0.03, 0.03, 0.1, 8), pink, 0.082, -0.01, 0.02, 0, 0, Math.PI / 2);
    const coreGlow = glowSprite(0xff2d78, 0.22, 0.85);
    coreGlow.position.set(0.09, -0.01, 0.02);
    g.add(coreGlow);

    // muzzle flash sprite
    this.muzzleSprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTexture(),
        color: 0x9ffcff,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        depthWrite: false,
      })
    );
    this.muzzleSprite.position.set(0, 0.012, -0.78);
    this.muzzleSprite.scale.set(0.4, 0.4, 0.4);
    g.add(this.muzzleSprite);
    this.muzzleLight = new THREE.PointLight(0x9ffcff, 0, 1.6, 2);
    this.muzzleLight.position.set(0, 0.012, -0.8);
    g.add(this.muzzleLight);

    // soft cyan halo hugging the barrel
    const halo = glowSprite(0x48f5ff, 0.5, 0.16);
    halo.position.set(0, 0.02, -0.45);
    g.add(halo);
  }

  resize(aspect) {
    this.weaponCamera.aspect = aspect;
    this.weaponCamera.updateProjectionMatrix();
    const portrait = aspect < 1;
    this.base.x = portrait ? 0.18 : 0.35;
    this.base.y = portrait ? -0.36 : -0.32;
    this.base.z = portrait ? -0.98 : -0.85;
    this.gunRoot.scale.setScalar(portrait ? 0.7 : 0.8);
  }

  reset() {
    this.ammo = MAG_SIZE;
    this.reloading = false;
    this.reloadTimer = 0;
    this.cooldown = 0;
    this.autoReloadDelay = 0;
    this.gunRoot.rotation.set(this.base.rx, this.base.ry, 0);
    this.game.ui.setAmmo(this.ammo, MAG_SIZE, false);
    this.muzzleSprite.material.opacity = 0;
    this.muzzleTimer = 0;
  }

  startReload() {
    if (this.reloading || this.ammo >= MAG_SIZE) return;
    this.reloading = true;
    this.reloadTimer = RELOAD_TIME;
    this.game.audio.reloadStart();
    this.game.ui.setReloading(true);
  }

  _tryReload() {
    if (this.reloading || this.ammo >= MAG_SIZE) return;
    this.startReload();
  }

  _findAimTarget(forward, wallT) {
    let best = null;
    let bestAngle = AIM_CONE;
    const origin = this.camera.position;
    for (const e of this.game.enemies.list) {
      if (!e.alive || e.dying) continue;
      const c = e.aimPoint;
      const dx = c.x - origin.x;
      const dy = c.y - origin.y;
      const dz = c.z - origin.z;
      const dist = Math.hypot(dx, dy, dz);
      if (dist > 70) continue;
      const dot = (dx * forward.x + dy * forward.y + dz * forward.z) / dist;
      const angle = Math.acos(clamp(dot, -1, 1));
      if (angle < bestAngle && dist < wallT) {
        bestAngle = angle;
        best = { enemy: e, dist, dx, dy, dz };
      }
    }
    return best;
  }

  shoot() {
    if (this.reloading) return;
    if (this.ammo <= 0) {
      this.game.audio.empty();
      return;
    }

    this.ammo--;
    this.cooldown = FIRE_INTERVAL;
    this.game.audio.shoot();
    this.game.ui.setAmmo(this.ammo, MAG_SIZE, this.reloading);

    const cam = this.camera;
    cam.getWorldDirection(this._forward);
    const forward = this._forward.clone().normalize();
    this._right.crossVectors(forward, this._worldUp).normalize();
    this._up.crossVectors(this._right, forward).normalize();

    // wall distance along the raw aim ray (stops aim assist reaching through cover)
    const origin = cam.position;
    let wallT = MAX_RANGE;
    for (const b of this.game.world.colliders) {
      const t = rayAABB(origin.x, origin.y, origin.z, forward.x, forward.y, forward.z, b);
      if (t < wallT) wallT = t;
    }
    if (forward.y < -0.0001) {
      const t = -origin.y / forward.y;
      if (t > 0 && t < wallT) wallT = t;
    }

    // aim assist: blend toward the enemy closest to the crosshair
    const target = this._findAimTarget(forward, wallT);
    this._dir.copy(forward);
    if (target) {
      this._tmp.set(target.dx / target.dist, target.dy / target.dist, target.dz / target.dist);
      this._dir.lerp(this._tmp, 0.62).normalize();
    }

    // small spread, less while stationary
    const moveSpread = 0.0025 + (this.game.player.speedFactor || 0) * 0.004;
    this._dir
      .addScaledVector(this._right, rand(moveSpread, -moveSpread))
      .addScaledVector(this._up, rand(moveSpread, -moveSpread))
      .normalize();

    // find nearest enemy hit
    let hitEnemy = null;
    let hitT = wallT;
    for (const e of this.game.enemies.list) {
      if (!e.alive) continue;
      const c = e.aimPoint;
      const t = raySphere(
        origin.x,
        origin.y,
        origin.z,
        this._dir.x,
        this._dir.y,
        this._dir.z,
        c.x,
        c.y,
        c.z,
        e.hitRadius
      );
      if (t < hitT) {
        hitT = t;
        hitEnemy = e;
      }
    }

    this._end.copy(origin).addScaledVector(this._dir, Math.min(hitT, MAX_RANGE));
    // muzzle position in world space (roughly at the gun barrel)
    this._muzzle
      .copy(origin)
      .addScaledVector(forward, 0.55)
      .addScaledVector(this._right, 0.16)
      .addScaledVector(this._up, -0.09);

    if (hitEnemy) {
      this._hit.copy(origin).addScaledVector(this._dir, hitT);
      hitEnemy.damage(DAMAGE, this._hit, this._dir);
      this.game.fx.impact(this._hit, hitEnemy.impactColor || 0x9ffcff);
      this.game.audio.hit();
      this.game.ui.hitmarker(hitEnemy.hp <= 0);
      this.game.fx.tracer(this._muzzle, this._hit, 0xbdfbff, 1.3, 0.06);
    } else {
      this.game.fx.tracer(this._muzzle, this._end, 0x9ffcff, 1, 0.07);
      if (wallT < MAX_RANGE) {
        const p = this._end.clone();
        p.addScaledVector(this._dir, -0.02);
        this.game.fx.impact(p, 0x9ffcff);
      }
    }

    // feedback: recoil, flash, camera kick
    this.recoilZ += 0.07;
    this.recoilX += 0.09;
    this.muzzleTimer = 0.055;
    this.muzzleSprite.material.opacity = 1;
    this.muzzleSprite.material.rotation = rand(Math.PI * 2);
    this.muzzleSprite.scale.setScalar(rand(0.44, 0.3));
    this.muzzleLight.intensity = 4;
    this.game.fx.muzzleFlash(this._muzzle, 0x9ffcff);
    this.game.player.kick(rand(0.011, 0.006), rand(0.006, -0.006));
    this.game.cameraShake(0.12);
    if (navigator.vibrate) navigator.vibrate(5);

    if (this.ammo <= 0) this.autoReloadDelay = 0.22;
  }

  update(dt, input, look) {
    this.cooldown = Math.max(0, this.cooldown - dt);
    this.muzzleTimer = Math.max(0, this.muzzleTimer - dt);
    if (this.muzzleTimer <= 0) this.muzzleSprite.material.opacity = damp(this.muzzleSprite.material.opacity, 0, 40, dt);
    this.muzzleLight.intensity = damp(this.muzzleLight.intensity, 0, 30, dt);

    if (this.reloading) {
      this.reloadTimer -= dt;
      if (this.reloadTimer <= 0) {
        this.reloading = false;
        this.ammo = MAG_SIZE;
        this.game.audio.reloadEnd();
        this.game.ui.setReloading(false);
        this.game.ui.setAmmo(this.ammo, MAG_SIZE, false);
        this.game.ui.toast('MAGAZINE READY', '');
      }
    }

    if (this.autoReloadDelay > 0) {
      this.autoReloadDelay -= dt;
      if (this.autoReloadDelay <= 0) {
        this.autoReloadDelay = 0;
        this._tryReload();
      }
    }
    if (this.ammo <= 0 && !this.reloading && this.autoReloadDelay <= 0) {
      this._tryReload();
    }

    if (input.consumeReload()) this._tryReload();
    if (input.fireHeld && !this.reloading && this.cooldown <= 0 && this.game.state === 'playing') {
      this.shoot();
    }

    // crosshair target feedback
    if (this.game.state === 'playing' && !this.reloading) {
      this.camera.getWorldDirection(this._forward);
      let wallT = MAX_RANGE;
      const o = this.camera.position;
      for (const b of this.game.world.colliders) {
        const t = rayAABB(o.x, o.y, o.z, this._forward.x, this._forward.y, this._forward.z, b);
        if (t < wallT) wallT = t;
      }
      const target = this._findAimTarget(this._forward, wallT);
      const locked = !!target;
      if (locked !== this.locked) {
        this.locked = locked;
        this.game.ui.setLocked(locked);
      }
    }

    // viewmodel animation
    const speed = this.game.player.horizontalSpeed || 0;
    this.bobT += dt * (4.2 + speed * 0.55);
    const bobAmt = Math.min(speed / 7, 1);
    const bx = Math.cos(this.bobT * 1.1) * 0.006 * bobAmt;
    const by = Math.abs(Math.sin(this.bobT)) * 0.008 * bobAmt;

    this.swayX = damp(this.swayX, clamp(-look.x * 3.2, -0.03, 0.03), 10, dt);
    this.swayY = damp(this.swayY, clamp(-look.y * 2.4, -0.02, 0.02), 10, dt);
    this.recoilZ = damp(this.recoilZ, 0, 14, dt);
    this.recoilX = damp(this.recoilX, 0, 14, dt);

    let reloadAnimX = 0;
    let reloadAnimY = 0;
    let reloadRotZ = 0;
    if (this.reloading) {
      const p = 1 - this.reloadTimer / RELOAD_TIME;
      const arc = Math.sin(p * Math.PI);
      reloadAnimX = -0.1 * arc;
      reloadAnimY = -0.12 * arc;
      reloadRotZ = 0.5 * arc;
    }

    const base = this.base;
    this.gunRoot.position.x = base.x + bx + this.swayX * 0.5;
    this.gunRoot.position.y = base.y + by + this.swayY * 0.5 + reloadAnimY;
    this.gunRoot.position.z = base.z + this.recoilZ;
    this.gunRoot.rotation.x = base.rx + this.recoilX + this.swayY * 1.6 + reloadAnimX;
    this.gunRoot.rotation.y = base.ry + this.swayX * 1.4;
    this.gunRoot.rotation.z = reloadRotZ;
  }

  render() {
    this.game.renderer.clearDepth();
    this.game.renderer.render(this.weaponScene, this.weaponCamera);
  }
}
