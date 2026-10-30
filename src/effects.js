import * as THREE from 'three';
import { glowTexture } from './textures.js';

const MAX_PARTICLES = 520;
const MAX_TRACERS = 24;
const MAX_RINGS = 14;
const MAX_FLASHES = 12;

/** Lightweight pooled FX: sparks, tracers, shockwave rings and flashes. */
export class Effects {
  constructor(scene) {
    this.scene = scene;
    this.time = 0;
    this._initParticles();
    this._initTracers();
    this._initRings();
    this._initFlashes();
  }

  _initParticles() {
    const geo = new THREE.BufferGeometry();
    this.pPositions = new Float32Array(MAX_PARTICLES * 3);
    this.pColors = new Float32Array(MAX_PARTICLES * 3);
    this.pVel = new Float32Array(MAX_PARTICLES * 3);
    this.pLife = new Float32Array(MAX_PARTICLES);
    this.pMax = new Float32Array(MAX_PARTICLES);
    this.pBase = new Float32Array(MAX_PARTICLES * 3);
    this.pDrag = new Float32Array(MAX_PARTICLES);
    this.pCursor = 0;

    geo.setAttribute('position', new THREE.BufferAttribute(this.pPositions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(this.pColors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.2,
      map: glowTexture(),
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    this.points = new THREE.Points(geo, mat);
    this.points.frustumCulled = false;
    this.scene.add(this.points);
  }

  _initTracers() {
    this.tracers = [];
    const geo = new THREE.CylinderGeometry(0.013, 0.013, 1, 5, 1, true);
    for (let i = 0; i < MAX_TRACERS; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.visible = false;
      mesh.frustumCulled = false;
      this.scene.add(mesh);
      this.tracers.push({ mesh, life: 0, max: 0.075 });
    }
    this.tracerCursor = 0;
  }

  _initRings() {
    this.rings = [];
    const geo = new THREE.RingGeometry(0.46, 0.56, 40);
    for (let i = 0; i < MAX_RINGS; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.visible = false;
      this.scene.add(mesh);
      this.rings.push({ mesh, life: 0, max: 0.6, scale: 4, flat: true });
    }
    this.ringCursor = 0;
  }

  _initFlashes() {
    this.flashes = [];
    for (let i = 0; i < MAX_FLASHES; i++) {
      const mat = new THREE.SpriteMaterial({
        map: glowTexture(),
        color: 0xffffff,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(mat);
      sprite.visible = false;
      this.scene.add(sprite);
      this.flashes.push({ sprite, life: 0, max: 0.22, scale: 2 });
    }
    this.flashCursor = 0;
  }

  spawnBurst(pos, color, count = 12, speed = 5, opts = {}) {
    const spread = opts.spread ?? 1;
    const upward = opts.upward ?? 0.4;
    const size = opts.size ?? 0.2;
    if (opts.size) this.points.material.size = 0.2;
    const base = new THREE.Color(color);
    for (let i = 0; i < count; i++) {
      const idx = this.pCursor++ % MAX_PARTICLES;
      const dir = new THREE.Vector3(
        (Math.random() - 0.5) * 2 * spread,
        (Math.random() - 0.32) * 2 * spread * 0.7 + upward,
        (Math.random() - 0.5) * 2 * spread
      ).normalize();
      const s = speed * (0.35 + Math.random() * 0.9);
      const i3 = idx * 3;
      this.pPositions[i3] = pos.x + dir.x * 0.12;
      this.pPositions[i3 + 1] = pos.y + dir.y * 0.12;
      this.pPositions[i3 + 2] = pos.z + dir.z * 0.12;
      this.pVel[i3] = dir.x * s;
      this.pVel[i3 + 1] = dir.y * s;
      this.pVel[i3 + 2] = dir.z * s;
      const tint = 0.7 + Math.random() * 0.6;
      this.pBase[i3] = base.r * tint;
      this.pBase[i3 + 1] = base.g * tint;
      this.pBase[i3 + 2] = base.b * tint;
      this.pColors[i3] = this.pBase[i3];
      this.pColors[i3 + 1] = this.pBase[i3 + 1];
      this.pColors[i3 + 2] = this.pBase[i3 + 2];
      this.pMax[idx] = 0.3 + Math.random() * 0.55;
      this.pLife[idx] = this.pMax[idx];
      this.pDrag[idx] = 2.4;
    }
    this.points.geometry.attributes.position.needsUpdate = true;
    this.points.geometry.attributes.color.needsUpdate = true;
    this.points.material.size = Math.max(this.points.material.size, size);
  }

  tracer(from, to, color = 0x8ff9ff, width = 1) {
    const t = this.tracers[this.tracerCursor++ % MAX_TRACERS];
    const dir = new THREE.Vector3().subVectors(to, from);
    const len = dir.length();
    if (len < 0.01) return;
    dir.normalize();
    t.mesh.position.copy(from).addScaledVector(dir, len / 2);
    t.mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    t.mesh.scale.set(width, len, width);
    t.mesh.material.color.setHex(color);
    t.mesh.material.opacity = 0.9;
    t.mesh.visible = true;
    t.life = t.max;
  }

  ring(pos, color = 0x35f0ff, scale = 4, duration = 0.55, y = 0.05) {
    const r = this.rings[this.ringCursor++ % MAX_RINGS];
    r.mesh.position.set(pos.x, y, pos.z);
    r.mesh.scale.setScalar(1);
    r.mesh.material.color.setHex(color);
    r.mesh.material.opacity = 0.75;
    r.mesh.visible = true;
    r.life = duration;
    r.max = duration;
    r.scale = scale;
  }

  flash(pos, color = 0xffffff, scale = 2, duration = 0.2) {
    const f = this.flashes[this.flashCursor++ % MAX_FLASHES];
    f.sprite.position.copy(pos);
    f.sprite.scale.setScalar(scale);
    f.sprite.material.color.setHex(color);
    f.sprite.material.opacity = 0.9;
    f.sprite.visible = true;
    f.life = duration;
    f.max = duration;
    f.scale = scale;
  }

  update(dt) {
    this.time += dt;

    for (let i = 0; i < MAX_PARTICLES; i++) {
      if (this.pLife[i] <= 0) continue;
      this.pLife[i] -= dt;
      const i3 = i * 3;
      if (this.pLife[i] <= 0) {
        this.pColors[i3] = this.pColors[i3 + 1] = this.pColors[i3 + 2] = 0;
        this.pPositions[i3 + 1] = -50;
        continue;
      }
      const drag = Math.max(0, 1 - this.pDrag[i] * dt);
      this.pVel[i3] *= drag;
      this.pVel[i3 + 1] = this.pVel[i3 + 1] * drag - 2.2 * dt;
      this.pVel[i3 + 2] *= drag;
      this.pPositions[i3] += this.pVel[i3] * dt;
      this.pPositions[i3 + 1] += this.pVel[i3 + 1] * dt;
      this.pPositions[i3 + 2] += this.pVel[i3 + 2] * dt;
      const k = Math.max(0, this.pLife[i] / this.pMax[i]);
      const fade = k * k;
      this.pColors[i3] = this.pBase[i3] * fade;
      this.pColors[i3 + 1] = this.pBase[i3 + 1] * fade;
      this.pColors[i3 + 2] = this.pBase[i3 + 2] * fade;
    }
    this.points.geometry.attributes.position.needsUpdate = true;
    this.points.geometry.attributes.color.needsUpdate = true;

    for (const t of this.tracers) {
      if (t.life <= 0) continue;
      t.life -= dt;
      const k = Math.max(0, t.life / t.max);
      t.mesh.material.opacity = k * 0.9;
      if (t.life <= 0) t.mesh.visible = false;
    }

    for (const r of this.rings) {
      if (r.life <= 0) continue;
      r.life -= dt;
      const k = 1 - Math.max(0, r.life / r.max);
      r.mesh.scale.setScalar(1 + k * r.scale);
      r.mesh.material.opacity = (1 - k) * 0.7;
      if (r.life <= 0) r.mesh.visible = false;
    }

    for (const f of this.flashes) {
      if (f.life <= 0) continue;
      f.life -= dt;
      const k = 1 - Math.max(0, f.life / f.max);
      f.sprite.scale.setScalar(f.scale * (0.6 + k * 0.7));
      f.sprite.material.opacity = (1 - k) * 0.85;
      if (f.life <= 0) f.sprite.visible = false;
    }
  }
}
