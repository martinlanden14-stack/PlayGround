/* ============================================================
   FX — pooled particles, tracers, flashes and rings
   ============================================================ */
import * as THREE from 'three';

const MAX_PARTICLES = 420;
const MAX_TRACERS = 24;
const MAX_FLASHES = 14;
const MAX_RINGS = 12;

export class FX {
  constructor(scene, glowTex) {
    this.scene = scene;
    this.glowTex = glowTex;
    this._pIndex = 0;
    this._tIndex = 0;
    this._fIndex = 0;
    this._rIndex = 0;

    /* ---------- particles ---------- */
    this.pPos = new Float32Array(MAX_PARTICLES * 3);
    this.pCol = new Float32Array(MAX_PARTICLES * 3);
    this.pBase = new Float32Array(MAX_PARTICLES * 3);
    this.pVel = new Float32Array(MAX_PARTICLES * 3);
    this.pLife = new Float32Array(MAX_PARTICLES);
    this.pMax = new Float32Array(MAX_PARTICLES);
    this.pGrav = new Float32Array(MAX_PARTICLES);
    for (let i = 0; i < MAX_PARTICLES; i++) {
      this.pPos[i * 3 + 1] = -999;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(this.pPos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(this.pCol, 3));
    this.pMat = new THREE.PointsMaterial({
      size: 0.19,
      map: glowTex,
      vertexColors: true,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    this.points = new THREE.Points(geo, this.pMat);
    this.points.frustumCulled = false;
    scene.add(this.points);

    /* ---------- tracers ---------- */
    this.tracers = [];
    const tGeo = new THREE.BoxGeometry(1, 1, 1);
    for (let i = 0; i < MAX_TRACERS; i++) {
      const m = new THREE.Mesh(tGeo, new THREE.MeshBasicMaterial({
        color: 0x9ff6ff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending,
        depthWrite: false, toneMapped: false,
      }));
      m.visible = false;
      m.frustumCulled = false;
      scene.add(m);
      this.tracers.push({ mesh: m, life: 0, max: 0.075 });
    }

    /* ---------- flash sprites ---------- */
    this.flashes = [];
    for (let i = 0; i < MAX_FLASHES; i++) {
      const s = new THREE.Sprite(new THREE.SpriteMaterial({
        map: glowTex, color: 0xffffff, transparent: true, opacity: 0,
        blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false,
      }));
      s.visible = false;
      s.frustumCulled = false;
      scene.add(s);
      this.flashes.push({ sprite: s, life: 0, max: 0.16, size: 1, grow: 2 });
    }

    /* ---------- rings ---------- */
    this.rings = [];
    const rGeo = new THREE.TorusGeometry(1, 0.035, 4, 56);
    for (let i = 0; i < MAX_RINGS; i++) {
      const m = new THREE.Mesh(rGeo, new THREE.MeshBasicMaterial({
        color: 0x22e6ff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending,
        depthWrite: false, toneMapped: false,
      }));
      m.rotation.x = -Math.PI / 2;
      m.visible = false;
      m.frustumCulled = false;
      scene.add(m);
      this.rings.push({ mesh: m, life: 0, max: 0.6, from: 0.4, to: 1.5, vertical: false });
    }
  }

  /* ---------------- spawn API ---------------- */

  burst(pos, color, count = 10, speed = 5, life = 0.45, gravity = 9) {
    const c = new THREE.Color(color);
    for (let n = 0; n < count; n++) {
      const i = this._pIndex;
      this._pIndex = (this._pIndex + 1) % MAX_PARTICLES;
      const i3 = i * 3;
      this.pPos[i3] = pos.x;
      this.pPos[i3 + 1] = pos.y;
      this.pPos[i3 + 2] = pos.z;
      const a = Math.random() * Math.PI * 2;
      const up = (Math.random() - 0.25) * 1.6;
      const sp = speed * (0.25 + Math.random() * 0.95);
      const rad = Math.sqrt(Math.max(0, 1 - Math.min(1, up * up * 0.18)));
      this.pVel[i3] = Math.cos(a) * rad * sp;
      this.pVel[i3 + 1] = up * sp * 0.65;
      this.pVel[i3 + 2] = Math.sin(a) * rad * sp;
      const l = life * (0.55 + Math.random() * 0.8);
      this.pLife[i] = l;
      this.pMax[i] = l;
      this.pGrav[i] = gravity;
      this.pBase[i3] = c.r;
      this.pBase[i3 + 1] = c.g;
      this.pBase[i3 + 2] = c.b;
    }
  }

  tracer(from, to, color = 0x9ff6ff, width = 0.028) {
    const t = this.tracers[this._tIndex];
    this._tIndex = (this._tIndex + 1) % MAX_TRACERS;
    const len = from.distanceTo(to);
    if (len < 0.01) return;
    t.mesh.position.copy(from).add(to).multiplyScalar(0.5);
    t.mesh.lookAt(to);
    t.mesh.scale.set(width, width, len);
    t.mesh.material.color.set(color);
    t.mesh.material.opacity = 0.85;
    t.mesh.visible = true;
    t.life = t.max;
  }

  flash(pos, color = 0xffffff, size = 1.2, life = 0.14, grow = 2.2) {
    const f = this.flashes[this._fIndex];
    this._fIndex = (this._fIndex + 1) % MAX_FLASHES;
    f.sprite.position.copy(pos);
    f.sprite.material.color.set(color);
    f.sprite.material.opacity = 1;
    f.sprite.scale.set(size, size, 1);
    f.sprite.visible = true;
    f.life = life;
    f.max = life;
    f.size = size;
    f.grow = grow;
  }

  ring(pos, color = 0x22e6ff, from = 0.4, to = 1.5, life = 0.5) {
    const r = this.rings[this._rIndex];
    this._rIndex = (this._rIndex + 1) % MAX_RINGS;
    r.mesh.position.copy(pos);
    r.mesh.position.y = Math.max(0.03, pos.y);
    r.mesh.material.color.set(color);
    r.mesh.material.opacity = 0.9;
    r.mesh.scale.setScalar(from);
    r.mesh.visible = true;
    r.life = life;
    r.max = life;
    r.from = from;
    r.to = to;
  }

  impact(pos, color = 0x9ff6ff, normal = null) {
    this.burst(pos, color, 8, 4.5, 0.35, 12);
    this.flash(pos, color, 0.55, 0.09, 1.2);
    if (normal) {
      const p = pos.clone().addScaledVector(normal, 0.02);
      this.burst(p, 0xfff1b0, 3, 2.2, 0.2, 6);
    }
  }

  explosion(pos, color = 0xff2d7a) {
    this.burst(pos, color, 26, 8, 0.7, 10);
    this.burst(pos, 0xfff2c0, 8, 5, 0.32, 4);
    this.flash(pos, color, 2.6, 0.25, 2.4);
    this.ring(pos, color, 0.5, 2.4, 0.45);
  }

  spawnRing(pos, color = 0xff2d7a) {
    this.ring(new THREE.Vector3(pos.x, 0.05, pos.z), color, 0.35, 1.9, 0.7);
    this.burst(new THREE.Vector3(pos.x, 0.15, pos.z), color, 8, 2.2, 0.5, 3);
  }

  /* ---------------- update ---------------- */

  update(dt) {
    // particles
    let any = false;
    for (let i = 0; i < MAX_PARTICLES; i++) {
      if (this.pLife[i] <= 0) continue;
      any = true;
      const i3 = i * 3;
      this.pLife[i] -= dt;
      if (this.pLife[i] <= 0) {
        this.pPos[i3 + 1] = -999;
        this.pCol[i3] = this.pCol[i3 + 1] = this.pCol[i3 + 2] = 0;
        continue;
      }
      this.pVel[i3 + 1] -= this.pGrav[i] * dt;
      this.pPos[i3] += this.pVel[i3] * dt;
      this.pPos[i3 + 1] += this.pVel[i3 + 1] * dt;
      this.pPos[i3 + 2] += this.pVel[i3 + 2] * dt;
      if (this.pPos[i3 + 1] < 0.02) {
        this.pPos[i3 + 1] = 0.02;
        this.pVel[i3 + 1] *= -0.35;
        this.pVel[i3] *= 0.7;
        this.pVel[i3 + 2] *= 0.7;
      }
      const k = this.pLife[i] / this.pMax[i];
      const fade = k * k;
      this.pCol[i3] = this.pBase[i3] * fade;
      this.pCol[i3 + 1] = this.pBase[i3 + 1] * fade;
      this.pCol[i3 + 2] = this.pBase[i3 + 2] * fade;
    }
    if (any) {
      this.points.geometry.attributes.position.needsUpdate = true;
      this.points.geometry.attributes.color.needsUpdate = true;
    }

    // tracers
    for (const t of this.tracers) {
      if (t.life <= 0) continue;
      t.life -= dt;
      if (t.life <= 0) {
        t.mesh.visible = false;
      } else {
        t.mesh.material.opacity = (t.life / t.max) * 0.85;
      }
    }

    // flashes
    for (const f of this.flashes) {
      if (f.life <= 0) continue;
      f.life -= dt;
      if (f.life <= 0) {
        f.sprite.visible = false;
      } else {
        const k = f.life / f.max;
        f.sprite.material.opacity = k;
        const s = f.size * (1 + (1 - k) * f.grow);
        f.sprite.scale.set(s, s, 1);
      }
    }

    // rings
    for (const r of this.rings) {
      if (r.life <= 0) continue;
      r.life -= dt;
      if (r.life <= 0) {
        r.mesh.visible = false;
      } else {
        const k = 1 - r.life / r.max;
        const e = 1 - Math.pow(1 - k, 3);
        r.mesh.scale.setScalar(r.from + (r.to - r.from) * e);
        r.mesh.material.opacity = (1 - k) * 0.9;
      }
    }
  }

  clear() {
    for (let i = 0; i < MAX_PARTICLES; i++) {
      this.pLife[i] = 0;
      this.pPos[i * 3 + 1] = -999;
      this.pCol[i * 3] = this.pCol[i * 3 + 1] = this.pCol[i * 3 + 2] = 0;
    }
    this.points.geometry.attributes.position.needsUpdate = true;
    this.points.geometry.attributes.color.needsUpdate = true;
    for (const t of this.tracers) { t.life = 0; t.mesh.visible = false; }
    for (const f of this.flashes) { f.life = 0; f.sprite.visible = false; }
    for (const r of this.rings) { r.life = 0; r.mesh.visible = false; }
  }
}
