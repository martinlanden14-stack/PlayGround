// Player controller: movement, collision, camera feel, health.
import * as THREE from 'three';
import { clamp, damp } from './utils.js';

const EYE_HEIGHT = 1.62;
const PLAYER_RADIUS = 0.42;
const STEP_HEIGHT = 0.64;
const WALK_SPEED = 5.8;
const SPRINT_SPEED = 8.1;
const GRAVITY = 24;
const JUMP_SPEED = 8.4;

export class Player {
  constructor(game) {
    this.game = game;
    this.camera = game.camera;
    this.camera.rotation.order = 'YXZ';
    this.camera.fov = 78;
    this.camera.updateProjectionMatrix();

    this.pos = new THREE.Vector3(0, 0, 20);
    this.vel = new THREE.Vector3();
    this.yaw = 0;
    this.pitch = 0;
    this.recoilPitch = 0;
    this.recoilYaw = 0;
    this.shake = 0;
    this.time = 0;

    this.health = 100;
    this.maxHealth = 100;
    this.lastDamageAt = -99;
    this.dead = false;
    this.iframes = 0;

    this.grounded = true;
    this.horizontalSpeed = 0;
    this.speedFactor = 0;
    this.bobPhase = 0;
    this.bobAmount = 0;

    this._tmp = new THREE.Vector3();
    this._right = new THREE.Vector3();
    this._fov = 78;
  }

  reset() {
    this.pos.set(0, 0, 20);
    this.vel.set(0, 0, 0);
    this.yaw = 0;
    this.pitch = 0;
    this.recoilPitch = 0;
    this.recoilYaw = 0;
    this.shake = 0;
    this.time = 0;
    this.health = this.maxHealth;
    this.dead = false;
    this.iframes = 0;
    this.grounded = true;
    this.horizontalSpeed = 0;
    this.speedFactor = 0;
    this.bobPhase = 0;
    this.bobAmount = 0;
    this.lastDamageAt = -99;
    this._fov = 78;
    this.game.ui.setHealth(this.health);
    this._applyCamera();
  }

  look(dx, dy) {
    this.yaw -= dx;
    this.pitch -= dy;
    this.pitch = clamp(this.pitch, -1.34, 1.34);
  }

  kick(pitch, yaw) {
    this.recoilPitch += pitch;
    this.recoilYaw += yaw;
  }

  addShake(amount) {
    this.shake = Math.min(1.2, this.shake + amount);
  }

  get eyePosition() {
    return this._tmp.set(this.pos.x, this.pos.y + EYE_HEIGHT, this.pos.z);
  }

  update(dt, input) {
    this.time += dt;
    this.iframes = Math.max(0, this.iframes - dt);

    const moveX = input.moveX;
    const moveY = input.moveY;
    const moving = Math.hypot(moveX, moveY) > 0.08;

    const sin = Math.sin(this.yaw);
    const cos = Math.cos(this.yaw);
    // camera forward is -Z when yaw = 0
    let wishX = -sin * moveY + cos * moveX;
    let wishZ = -cos * moveY - sin * moveX;
    const wishLen = Math.hypot(wishX, wishZ);
    if (wishLen > 1) {
      wishX /= wishLen;
      wishZ /= wishLen;
    }

    const sprinting = input.sprint && moveY > 0.2;
    const targetSpeed = (sprinting ? SPRINT_SPEED : WALK_SPEED) * Math.min(1, Math.hypot(moveX, moveY));
    const accel = this.grounded ? 38 : 9;
    this.vel.x = damp(this.vel.x, wishX * targetSpeed, accel, dt);
    this.vel.z = damp(this.vel.z, wishZ * targetSpeed, accel, dt);

    if (input.consumeJump() && this.grounded && !this.dead) {
      this.vel.y = JUMP_SPEED;
      this.grounded = false;
      this.game.audio.init();
      this.game.audio.tone({ type: 'sine', f0: 180, f1: 110, dur: 0.12, vol: 0.03 });
      if (navigator.vibrate) navigator.vibrate(8);
    }

    this.vel.y -= GRAVITY * dt;
    if (this.vel.y < -34) this.vel.y = -34;

    // ---- step up onto low ledges before horizontal collision
    if (this.grounded && !this.dead) {
      for (const b of this.game.world.colliders) {
        const rise = b.maxY - this.pos.y;
        if (rise <= 0.02 || rise > STEP_HEIGHT) continue;
        if (this.pos.y + 1.7 < b.minY) continue;
        const nx = Math.max(b.minX, Math.min(this.pos.x, b.maxX));
        const nz = Math.max(b.minZ, Math.min(this.pos.z, b.maxZ));
        const d = Math.hypot(this.pos.x - nx, this.pos.z - nz);
        if (d < PLAYER_RADIUS + 0.1) {
          this.pos.y = b.maxY;
          this.vel.y = Math.max(this.vel.y, 0);
          break;
        }
      }
    }

    // ---- horizontal move + collision
    this.pos.x += this.vel.x * dt;
    this.pos.z += this.vel.z * dt;
    this.game.world.resolveCircle(
      this._tmp.set(this.pos.x, this.pos.y, this.pos.z),
      PLAYER_RADIUS,
      this.pos.y + 0.12,
      this.pos.y + 1.66
    );
    this.pos.x = clamp(this._tmp.x, -29.1, 29.1);
    this.pos.z = clamp(this._tmp.z, -29.1, 29.1);

    // ---- vertical
    this.pos.y += this.vel.y * dt;
    const ground = this.game.world.groundHeightAt(
      this.pos.x,
      this.pos.z,
      PLAYER_RADIUS * 0.82,
      this.pos.y,
      STEP_HEIGHT
    );

    if (this.pos.y <= ground + 0.001 && this.vel.y <= 0.1) {
      this.pos.y = ground;
      this.vel.y = 0;
      this.grounded = true;
    } else {
      this.grounded = false;
    }

    // ---- feel
    this.horizontalSpeed = Math.hypot(this.vel.x, this.vel.z);
    this.speedFactor = clamp(this.horizontalSpeed / SPRINT_SPEED, 0, 1);
    if (this.grounded && this.horizontalSpeed > 0.5) {
      this.bobPhase += dt * (6.4 + this.horizontalSpeed * 1.25);
      this.bobAmount = damp(this.bobAmount, Math.min(1, this.horizontalSpeed / WALK_SPEED), 8, dt);
    } else {
      this.bobAmount = damp(this.bobAmount, 0, 6, dt);
    }

    this.recoilPitch = damp(this.recoilPitch, 0, 11, dt);
    this.recoilYaw = damp(this.recoilYaw, 0, 11, dt);
    this.shake = damp(this.shake, 0, 7.5, dt);

    // fov kick when sprinting
    const targetFov = 78 + (sprinting ? 4 : 0) + this.speedFactor * 1.2;
    this._fov = damp(this._fov, targetFov, 6, dt);
    if (Math.abs(this.camera.fov - this._fov) > 0.05) {
      this.camera.fov = this._fov;
      this.camera.updateProjectionMatrix();
    }

    // ---- regen
    if (!this.dead && this.time - this.lastDamageAt > 7 && this.health < this.maxHealth) {
      this.health = Math.min(this.maxHealth, this.health + 11 * dt);
      this.game.ui.setHealth(this.health);
    }

    this._applyCamera();
  }

  _applyCamera() {
    const bobY = Math.sin(this.bobPhase * 2) * 0.032 * this.bobAmount;
    const bobX = Math.cos(this.bobPhase) * 0.026 * this.bobAmount;
    const sin = Math.sin(this.yaw);
    const cos = Math.cos(this.yaw);
    this._right.set(cos, 0, -sin);

    const shake = this.shake;
    const st = this.time * 46;
    const shakeX = Math.sin(st * 1.7) * shake * 0.014;
    const shakeY = Math.sin(st * 1.1) * shake * 0.012;
    const shakeRoll = Math.sin(st * 0.73) * shake * 0.02;

    this.camera.position.set(
      this.pos.x + this._right.x * bobX + shakeX,
      this.pos.y + EYE_HEIGHT + bobY + shakeY,
      this.pos.z + this._right.z * bobX
    );
    this.camera.rotation.set(
      this.pitch + this.recoilPitch + shakeY * 0.35,
      this.yaw + this.recoilYaw + shakeX * 0.3,
      shakeRoll
    );
  }

  takeDamage(amount, fromPos = null) {
    if (this.dead || this.iframes > 0) return;
    this.health = Math.max(0, this.health - amount);
    this.lastDamageAt = this.time;
    this.iframes = 0.16;
    this.addShake(0.55);
    this.game.ui.setHealth(this.health);
    this.game.ui.damageFlash();
    this.game.audio.hurt();
    if (navigator.vibrate) navigator.vibrate([24, 30, 40]);

    if (this.health <= 0) {
      this.dead = true;
      this.game.onPlayerDeath();
    }
  }

  heal(amount) {
    if (this.dead) return;
    this.health = Math.min(this.maxHealth, this.health + amount);
    this.game.ui.setHealth(this.health);
  }
}
