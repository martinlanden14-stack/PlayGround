import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const SHADOW_TEX = (() => {
  if (typeof document === 'undefined') return null;
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(64, 64, 8, 64, 64, 62);
  g.addColorStop(0, 'rgba(0,0,0,0.72)');
  g.addColorStop(0.55, 'rgba(0,0,0,0.4)');
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c);
  return t;
})();

function stripeTexture() {
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 64;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#f6f1e6';
  ctx.fillRect(0, 0, 64, 64);
  ctx.fillStyle = '#161a24';
  ctx.fillRect(26, 0, 12, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function buildCar(color = 0xff4d2e, { stripes = true, number = null } = {}) {
  const root = new THREE.Group();
  const body = new THREE.Group();
  root.add(body);

  const paint = new THREE.MeshPhysicalMaterial({
    color,
    metalness: 0.55,
    roughness: 0.26,
    clearcoat: 1,
    clearcoatRoughness: 0.1
  });
  const carbon = new THREE.MeshStandardMaterial({ color: 0x14161d, roughness: 0.55, metalness: 0.5 });
  const glass = new THREE.MeshPhysicalMaterial({
    color: 0x0a1622,
    metalness: 0.9,
    roughness: 0.08,
    clearcoat: 1,
    transparent: true,
    opacity: 0.92
  });
  const tireMat = new THREE.MeshStandardMaterial({ color: 0x101014, roughness: 0.95, metalness: 0.05 });
  const rimMat = new THREE.MeshStandardMaterial({ color: 0xd6dde8, roughness: 0.22, metalness: 0.95 });
  const headMat = new THREE.MeshStandardMaterial({
    color: 0xfff4da,
    emissive: 0xfff0c8,
    emissiveIntensity: 3.2,
    roughness: 0.25
  });
  const tailMat = new THREE.MeshStandardMaterial({
    color: 0xff2a2a,
    emissive: 0xff1010,
    emissiveIntensity: 1.5,
    roughness: 0.35
  });
  const stripeMat = new THREE.MeshStandardMaterial({
    map: stripeTexture(),
    color: 0xffffff,
    roughness: 0.4,
    metalness: 0.2
  });
  const batches = new Map();
  const add = (geo, mat, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) => {
    const g = geo.index ? geo.toNonIndexed() : geo.clone();
    const m = new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(rx, ry, rz));
    m.setPosition(x, y, z);
    g.applyMatrix4(m);
    if (!batches.has(mat)) batches.set(mat, []);
    batches.get(mat).push(g);
  };

  // Main chassis
  add(new RoundedBoxGeometry(1.92, 0.58, 4.3, 4, 0.2), paint, 0, 0.58, 0);
  add(new RoundedBoxGeometry(1.8, 0.3, 1.55, 4, 0.12), paint, 0, 0.88, 1.18);
  add(new RoundedBoxGeometry(1.72, 0.22, 1.05, 4, 0.1), paint, 0, 0.89, -1.52);
  add(new THREE.BoxGeometry(1.96, 0.12, 4.34), carbon, 0, 0.32, 0);

  // Cabin
  add(new RoundedBoxGeometry(1.58, 0.66, 2.05, 4, 0.26), glass, 0, 1.07, -0.28);
  add(new RoundedBoxGeometry(1.4, 0.13, 1.15, 4, 0.05), paint, 0, 1.4, -0.42);
  add(new THREE.BoxGeometry(1.62, 0.1, 0.12), carbon, 0, 1.36, 0.62);
  add(new THREE.BoxGeometry(1.62, 0.1, 0.12), carbon, 0, 1.36, -1.16);

  // Bumpers, skirts and fender haunches
  add(new RoundedBoxGeometry(1.96, 0.42, 0.52, 4, 0.14), paint, 0, 0.54, 2.06);
  add(new RoundedBoxGeometry(1.96, 0.4, 0.5, 4, 0.14), paint, 0, 0.56, -2.06);
  add(new THREE.BoxGeometry(2.04, 0.1, 0.46), carbon, 0, 0.34, 2.14);
  add(new THREE.BoxGeometry(2.0, 0.16, 0.4), carbon, 0, 0.38, -2.12);
  add(new THREE.BoxGeometry(1.66, 0.16, 0.52), carbon, 0, 0.24, -2.16);
  for (let i = -2; i <= 2; i++) {
    add(new THREE.BoxGeometry(0.04, 0.2, 0.55), carbon, i * 0.32, 0.23, -2.17);
  }
  for (const s of [-1, 1]) {
    add(new THREE.BoxGeometry(0.1, 0.16, 3.1), carbon, s * 0.99, 0.39, 0);
    add(new THREE.BoxGeometry(0.2, 0.06, 0.06), carbon, s * 0.94, 1.05, 0.6);
    add(new RoundedBoxGeometry(0.16, 0.13, 0.26, 2, 0.04), paint, s * 1.04, 1.1, 0.56);
    add(new RoundedBoxGeometry(0.14, 0.16, 1.3, 3, 0.05), paint, s * 1.03, 0.92, 1.36);
    add(new RoundedBoxGeometry(0.14, 0.16, 1.3, 3, 0.05), paint, s * 1.03, 0.92, -1.36);
    add(new THREE.BoxGeometry(0.06, 0.28, 0.82), carbon, s * 1.0, 0.62, -0.52);
  }

  // Hood vent
  add(new THREE.BoxGeometry(0.7, 0.05, 0.5), carbon, 0, 1.035, 1.1);

  // Rear deck louvers
  for (let i = 0; i < 3; i++) {
    add(new THREE.BoxGeometry(1.42, 0.035, 0.14), carbon, 0, 1.015, -1.55 - i * 0.2, 0.16, 0, 0);
  }

  // Rear wing
  for (const s of [-1, 1]) {
    add(new THREE.BoxGeometry(0.09, 0.36, 0.14), carbon, s * 0.66, 1.11, -2.0);
    add(new THREE.BoxGeometry(0.07, 0.32, 0.62), paint, s * 1.02, 1.24, -2.05);
  }
  add(new THREE.BoxGeometry(2.04, 0.08, 0.58), carbon, 0, 1.31, -2.05);
  add(new THREE.BoxGeometry(1.9, 0.035, 0.04), tailMat, 0, 1.36, -2.33);

  // Lights
  for (const s of [-1, 1]) {
    add(new THREE.BoxGeometry(0.52, 0.11, 0.08), headMat, s * 0.56, 0.74, 2.17);
    add(new THREE.BoxGeometry(0.42, 0.06, 0.06), headMat, s * 0.56, 0.62, 2.19);
    add(new THREE.BoxGeometry(0.46, 0.1, 0.05), tailMat, s * 0.56, 0.84, -2.19);
    add(new THREE.BoxGeometry(0.08, 0.08, 0.05), tailMat, s * 0.88, 0.84, -2.19);
    add(new THREE.CylinderGeometry(0.07, 0.08, 0.16, 10), rimMat, s * 0.34, 0.31, -2.28, Math.PI / 2, 0, 0);
  }

  // Racing stripes
  if (stripes) {
    for (const s of [-1, 1]) {
      add(new THREE.BoxGeometry(0.2, 0.02, 1.5), stripeMat, s * 0.2, 1.036, 1.18);
      add(new THREE.BoxGeometry(0.2, 0.02, 1.1), stripeMat, s * 0.2, 1.472, -0.42);
    }
  }

  // Number roundel
  if (number !== null) {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#f6f1e6';
    ctx.beginPath();
    ctx.arc(64, 64, 56, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#14161d';
    ctx.font = '900 74px Arial Black, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(number), 64, 68);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    const mat = new THREE.MeshStandardMaterial({ map: tex, transparent: true, roughness: 0.5, metalness: 0.1 });
    for (const s of [-1, 1]) {
      add(new THREE.PlaneGeometry(0.5, 0.5), mat, s * 0.976, 0.74, -0.15, 0, (s * Math.PI) / 2, 0);
    }

    // Rear number plate
    const pc = document.createElement('canvas');
    pc.width = 128;
    pc.height = 64;
    const pctx = pc.getContext('2d');
    pctx.fillStyle = '#f6f1e6';
    pctx.fillRect(0, 0, 128, 64);
    pctx.strokeStyle = '#ff7a3c';
    pctx.lineWidth = 6;
    pctx.strokeRect(3, 3, 122, 58);
    pctx.fillStyle = '#14161d';
    pctx.font = '900 42px Arial Black, Arial, sans-serif';
    pctx.textAlign = 'center';
    pctx.textBaseline = 'middle';
    pctx.fillText(String(number).padStart(2, '0'), 64, 34);
    const ptex = new THREE.CanvasTexture(pc);
    ptex.colorSpace = THREE.SRGBColorSpace;
    add(
      new THREE.PlaneGeometry(0.56, 0.28),
      new THREE.MeshStandardMaterial({ map: ptex, roughness: 0.5, metalness: 0.1 }),
      0, 0.63, -2.325, 0, Math.PI, 0
    );
  }


  // Flush static geometry into one mesh per material.
  for (const [mat, geos] of batches) {
    const merged = mergeGeometries(geos, false);
    if (!merged) continue;
    const mesh = new THREE.Mesh(merged, mat);
    mesh.castShadow = !mat.transparent;
    mesh.receiveShadow = true;
    body.add(mesh);
    for (const g of geos) g.dispose();
  }

  // Wheels
  const wheels = [];
  const frontWheels = [];
  const tireGeo = new THREE.CylinderGeometry(0.47, 0.47, 0.36, 24);
  tireGeo.rotateZ(Math.PI / 2);
  const rimBase = new THREE.CylinderGeometry(0.29, 0.29, 0.38, 18);
  rimBase.rotateZ(Math.PI / 2);
  const lipGeo = new THREE.TorusGeometry(0.3, 0.025, 8, 24);
  lipGeo.rotateY(Math.PI / 2);
  const spokeGeos = [rimBase.toNonIndexed(), lipGeo.toNonIndexed()];
  for (let k = 0; k < 5; k++) {
    const spoke = new THREE.BoxGeometry(0.06, 0.52, 0.09).toNonIndexed();
    spoke.rotateX((k / 5) * Math.PI * 2);
    spokeGeos.push(spoke);
  }
  const rimMerged = mergeGeometries(spokeGeos, false);
  spokeGeos.forEach((g) => g.dispose());

  for (const z of [1.38, -1.38]) {
    for (const x of [-1.02, 1.02]) {
      const wg = new THREE.Group();
      wg.position.set(x, 0.47, z);
      const spin = new THREE.Group();
      wg.add(spin);
      const tire = new THREE.Mesh(tireGeo, tireMat);
      tire.castShadow = true;
      spin.add(tire);
      const rim = new THREE.Mesh(rimMerged, rimMat);
      spin.add(rim);
      root.add(wg);
      wheels.push({ group: wg, spin });
      if (z > 0) frontWheels.push(wg);
    }
  }

  // Contact shadow
  if (SHADOW_TEX) {
    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(3.0, 5.2),
      new THREE.MeshBasicMaterial({
        map: SHADOW_TEX,
        transparent: true,
        opacity: 0.62,
        depthWrite: false
      })
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.012;
    shadow.renderOrder = 2;
    root.add(shadow);
  }

  root.userData = { body, wheels, frontWheels, tailMat, headMat, paint };
  return root;
}

/* ------------------------------------------------------------------ */
/*  Arcade car physics                                                 */
/* ------------------------------------------------------------------ */

export class Car {
  constructor(track, color, opts = {}) {
    this.track = track;
    this.mesh = buildCar(color, opts);
    this.pos = new THREE.Vector3();
    this.vel = new THREE.Vector3();
    this.forward = new THREE.Vector3(0, 0, 1);
    this.right = new THREE.Vector3(1, 0, 0);
    this.yaw = 0;
    this.steer = 0;
    this.steerVis = 0;
    this.spin = 0;
    this.total = 0;
    this.lastIndex = 0;
    this.lastU = 0;
    this.startU = 0;
    this.nitro = 1;
    this.maxSpeed = 64;
    this.accel = 19.5;
    this.brakeForce = 34;
    this.drifting = false;
    this.onRoad = true;
    this.lateral = 0;
    this.offset = 0;
    this.speedKmh = 0;
    this.vf = 0;
    this.wallHit = 0;
    this.roll = 0;
    this.pitch = 0;
    this.reset(opts.u ?? 0.002, opts.offset ?? 0);
  }

  reset(u = 0.002, offset = 0) {
    const f = this.track.frameAt(u);
    this.startU = f.u;
    this.pos.copy(f.pos).addScaledVector(f.side, offset);
    this.pos.y = 0.06;
    this.yaw = Math.atan2(f.tangent.x, f.tangent.z);
    this.forward.set(Math.sin(this.yaw), 0, Math.cos(this.yaw));
    this.right.set(Math.cos(this.yaw), 0, -Math.sin(this.yaw));
    this.vel.set(0, 0, 0);
    this.steer = 0;
    this.steerVis = 0;
    this.total = 0;
    this.lastIndex = f.index;
    this.lastU = f.u;
    this.nitro = 1;
    this.drifting = false;
    this.wallHit = 0;
    this.sync(0);
  }

  update(dt, input) {
    const track = this.track;
    dt = Math.min(dt, 0.05);
    if (dt <= 0) return;

    const yaw = this.yaw;
    this.forward.set(Math.sin(yaw), 0, Math.cos(yaw));
    this.right.set(Math.cos(yaw), 0, -Math.sin(yaw));

    let vf = this.vel.dot(this.forward);
    let vl = this.vel.dot(this.right);

    const targetSteer = input.steer || 0;
    this.steer += (targetSteer - this.steer) * (1 - Math.exp(-dt * 8));
    const throttle = input.throttle || 0;
    const brake = input.brake || 0;
    const handbrake = !!input.handbrake;
    const boosting = !!input.nitro && this.nitro > 0.02 && throttle > 0;
    this._braking = brake > 0;

    const speedAbs = Math.abs(vf);
    const grip = handbrake ? 1.55 : this.onRoad ? 9.5 : 3.6;

    // Longitudinal forces
    if (throttle > 0) {
      const boostFactor = boosting ? 1.75 : 1;
      vf += throttle * this.accel * boostFactor * dt;
    }
    if (brake > 0) {
      if (vf > 0.4) vf -= brake * this.brakeForce * dt;
      else vf -= brake * 11 * dt;
    }
    if (handbrake) vf -= Math.sign(vf) * 7.5 * dt;
    if (!this.onRoad) vf -= Math.sign(vf) * 6.5 * dt;

    // Drag
    vf -= vf * Math.abs(vf) * 0.0022 * dt;
    vf -= vf * 0.028 * dt;

    const maxSpeed = boosting ? 82 : this.maxSpeed;
    if (vf > maxSpeed) vf -= (vf - maxSpeed) * Math.min(1, dt * 4);
    if (vf < -14) vf = -14;

    // Lateral grip
    vl *= Math.exp(-grip * dt);

    // Steering / yaw
    const authority = Math.min(1, speedAbs / 10) / (1 + speedAbs * 0.052);
    const turnRate = this.steer * 1.9 * authority * (handbrake ? 1.75 : 1) * (vf >= 0 ? 1 : -1);
    this.yaw += turnRate * dt;

    // Rebuild velocity in the OLD frame so the car can slide
    this.vel.copy(this.forward).multiplyScalar(vf).addScaledVector(this.right, vl);

    this.pos.addScaledVector(this.vel, dt);

    // Track relation / wall collision
    const idx = track.nearest(this.pos.x, this.pos.z, this.lastIndex);
    const p = track.samples[idx];
    const side = track.sides[idx];
    const tan = track.tangents[idx];
    const dx = this.pos.x - p.x;
    const dz = this.pos.z - p.z;
    const offset = dx * side.x + dz * side.z;
    const along = dx * tan.x + dz * tan.z;
    this.offset = offset;
    this.onRoad = Math.abs(offset) < track.halfWidth - 0.4;
    this.lastIndex = idx;

    const limit = track.barrierOffset - 0.85;
    if (Math.abs(offset) > limit) {
      const s = Math.sign(offset);
      this.pos.x = p.x + side.x * limit * s + tan.x * along;
      this.pos.z = p.z + side.z * limit * s + tan.z * along;
      const vn = this.vel.dot(side);
      this.vel.addScaledVector(side, -vn * 1.35);
      this.vel.multiplyScalar(0.84);
      this.wallHit = Math.min(1, this.wallHit + 0.6);
      vf *= 0.86;
    } else {
      this.wallHit *= Math.exp(-dt * 5);
    }

    // Nitro meter
    if (boosting) {
      this.nitro = Math.max(0, this.nitro - dt * 0.34);
    } else {
      const regen = (this.drifting ? 0.2 : 0.055) + (this.onRoad ? 0.015 : 0);
      this.nitro = Math.min(1, this.nitro + regen * dt);
    }

    // Progress
    const u = idx / track.N;
    let delta = u - this.lastU;
    if (delta < -0.5) delta += 1;
    if (delta > 0.5) delta -= 1;
    this.total += delta;
    this.lastU = u;

    // Telemetry
    this.lateral = this.vel.dot(this.right);
    this.vf = this.vel.dot(this.forward);
    this.speedKmh = this.vel.length() * 3.6;
    this.drifting = Math.abs(this.lateral) > 2.6 && this.speedKmh > 34;

    // Visuals
    const targetRoll = THREE.MathUtils.clamp(-this.steer * Math.min(1, speedAbs / 45) * 0.055 - this.lateral * 0.004, -0.09, 0.09);
    this.roll += (targetRoll - this.roll) * (1 - Math.exp(-dt * 6));
    const targetPitch = THREE.MathUtils.clamp((throttle > 0 ? -0.012 : 0) + (brake > 0 ? 0.02 : 0) - (boosting ? 0.008 : 0), -0.03, 0.04);
    this.pitch += (targetPitch - this.pitch) * (1 - Math.exp(-dt * 5));

    this.spin += (vf * dt) / 0.42;
    this.sync(dt);
  }

  sync(dt) {
    this.mesh.position.copy(this.pos);
    this.mesh.rotation.y = this.yaw;
    const ud = this.mesh.userData;
    ud.body.rotation.z = this.roll;
    ud.body.rotation.x = this.pitch;
    ud.body.position.y = Math.sin(performance.now() * 0.004) * 0.004 * Math.min(1, Math.abs(this.vf) / 20);
    for (const w of ud.wheels) w.spin.rotation.x = this.spin;
    for (const w of ud.frontWheels) w.rotation.y = this.steer * 0.45;
    ud.tailMat.emissiveIntensity = this._braking ? 3.6 : 1.5;
  }
}

/* ------------------------------------------------------------------ */
/*  Scripted rivals                                                    */
/* ------------------------------------------------------------------ */

export class Rival {
  constructor(track, color, { u, lane, baseSpeed, number, originU = 0 }) {
    this.track = track;
    this.mesh = buildCar(color, { stripes: false, number });
    this.startU = u;
    this.originU = originU;
    this.lane = lane;
    this.baseSpeed = baseSpeed;
    this.number = number;
    this.raceDistance = u - originU;
    this.spin = 0;
    this.phase = Math.random() * Math.PI * 2;
    this.pos = new THREE.Vector3();
    this.yaw = 0;
    this.steer = 0;
    this.finished = false;
    this.finishTime = 0;
    this.syncVisual(0);
  }

  reset() {
    this.raceDistance = this.startU - this.originU;
    this.finished = false;
    this.finishTime = 0;
    this.syncVisual(0);
  }

  update(dt, time, playerDistance) {
    const track = this.track;
    if (this.finished) {
      this.syncVisual(dt);
      return;
    }
    let target = this.baseSpeed;
    const gap = playerDistance - this.raceDistance;
    if (gap > 0.05) target *= 1.045;
    if (gap > 0.22) target *= 1.06;
    if (gap < -0.06) target *= 0.94;
    if (gap < -0.2) target *= 0.88;
    target *= 1 + Math.sin(time * 0.5 + this.phase) * 0.025;
    this.raceDistance += (target * dt) / track.length;
    if (this.raceDistance >= 3) {
      this.finished = true;
      this.finishTime = time;
    }
    this.syncVisual(dt);
  }

  syncVisual(dt) {
    const u = this.originU + this.raceDistance;
    const f = this.track.frameAt(u);
    const weave = Math.sin(performance.now() * 0.00045 + this.phase) * 0.45;
    this.pos.copy(f.pos).addScaledVector(f.side, this.lane + weave);
    this.pos.y = 0.06;
    this.yaw = Math.atan2(f.tangent.x, f.tangent.z);
    this.mesh.position.copy(this.pos);
    this.mesh.rotation.y = this.yaw;
    this.spin += (this.baseSpeed * dt) / 0.42;
    const ud = this.mesh.userData;
    for (const w of ud.wheels) w.spin.rotation.x = this.spin;
    for (const w of ud.frontWheels) w.rotation.y = Math.sin(performance.now() * 0.001 + this.phase) * 0.05;
  }
}
