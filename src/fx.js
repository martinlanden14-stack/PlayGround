// Pooled visual effects: sparks, tracers, shockwave rings, flashes.
import * as THREE from 'three';
import { glowTexture, rand, TAU } from './utils.js';

const MAX_PARTICLES = 900;

export class FX {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;

    this._buildParticles();
    this._buildTracers();
    this._buildRings();
    this._buildFlashes();

    this.flashLight = new THREE.PointLight(0x9fefff, 0, 12, 2);
    this.scene.add(this.flashLight);
    this.flashPower = 0;

    this._color = new THREE.Color();
    this._color2 = new THREE.Color();
  }

  _buildParticles() {
    const geo = new THREE.BufferGeometry();
    this.pPos = new Float32Array(MAX_PARTICLES * 3);
    this.pCol = new Float32Array(MAX_PARTICLES * 3);
    this.pSize = new Float32Array(MAX_PARTICLES);
    this.pAlpha = new Float32Array(MAX_PARTICLES);
    geo.setAttribute('position', new THREE.BufferAttribute(this.pPos, 3));
    geo.setAttribute('aColor', new THREE.BufferAttribute(this.pCol, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(this.pSize, 1));
    geo.setAttribute('aAlpha', new THREE.BufferAttribute(this.pAlpha, 1));
    geo.setDrawRange(0, MAX_PARTICLES);

    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uPixelRatio: { value: 1 } },
      vertexShader: /* glsl */ `
        attribute vec3 aColor;
        attribute float aSize;
        attribute float aAlpha;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uPixelRatio;
        void main() {
          vColor = aColor;
          vAlpha = aAlpha;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * uPixelRatio * (320.0 / max(0.1, -mv.z));
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.06, d);
          if (a <= 0.001 || vAlpha <= 0.001) discard;
          gl_FragColor = vec4(vColor, a * vAlpha);
        }
      `,
    });

    this.particles = new THREE.Points(geo, mat);
    this.particles.frustumCulled = false;
    this.particles.renderOrder = 4;
    this.scene.add(this.particles);
    this.pGeo = geo;

    this.pData = new Array(MAX_PARTICLES);
    for (let i = 0; i < MAX_PARTICLES; i++) {
      this.pData[i] = { life: 0, maxLife: 1, vx: 0, vy: 0, vz: 0, grav: 0, drag: 1, size: 0 };
      this.pSize[i] = 0;
      this.pAlpha[i] = 0;
    }
    this.pCursor = 0;
  }

  _buildTracers() {
    this.tracerGeo = new THREE.CylinderGeometry(0.018, 0.018, 1, 5, 1, true);
    this.tracerGeo.translate(0, 0.5, 0);
    this.tracers = [];
    for (let i = 0; i < 26; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: 0x9ffcff,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(this.tracerGeo, mat);
      mesh.visible = false;
      mesh.frustumCulled = false;
      this.scene.add(mesh);
      this.tracers.push({ mesh, life: 0, maxLife: 0.07 });
    }
    this.tracerCursor = 0;
  }

  _buildRings() {
    this.ringGeo = new THREE.RingGeometry(0.72, 1, 40);
    this.rings = [];
    for (let i = 0; i < 14; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(this.ringGeo, mat);
      mesh.visible = false;
      mesh.frustumCulled = false;
      this.scene.add(mesh);
      this.rings.push({ mesh, life: 0, maxLife: 1, scale0: 1, scale1: 2, air: false });
    }
    this.ringCursor = 0;
  }

  _buildFlashes() {
    this.flashes = [];
    for (let i = 0; i < 16; i++) {
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
      this.flashes.push({ sprite, life: 0, maxLife: 0.2, scale: 1 });
    }
    this.flashCursor = 0;
  }

  setPixelRatio(ratio) {
    this.particles.material.uniforms.uPixelRatio.value = ratio;
  }

  burst(pos, opts = {}) {
    const {
      count = 14,
      speed = 6,
      speedVar = 0.7,
      size = 0.12,
      sizeVar = 0.6,
      life = 0.55,
      lifeVar = 0.5,
      color = 0x48f5ff,
      color2 = null,
      gravity = 7,
      drag = 2.2,
      dir = null,
      spread = 1,
    } = opts;

    this._color.set(color);
    this._color2.set(color2 || color);

    for (let i = 0; i < count; i++) {
      const idx = this.pCursor;
      this.pCursor = (this.pCursor + 1) % MAX_PARTICLES;
      const d = this.pData[idx];

      const u = rand(1, -1);
      const a = rand(TAU);
      const r = Math.sqrt(1 - u * u);
      let vx = Math.cos(a) * r;
      let vy = u;
      let vz = Math.sin(a) * r;

      if (dir) {
        vx = dir.x + vx * spread;
        vy = dir.y + vy * spread;
        vz = dir.z + vz * spread;
        const l = Math.hypot(vx, vy, vz) || 1;
        vx /= l;
        vy /= l;
        vz /= l;
      }

      const sp = speed * rand(1 + speedVar, 1 - speedVar);
      d.vx = vx * sp;
      d.vy = vy * sp;
      d.vz = vz * sp;
      d.grav = gravity;
      d.drag = drag;
      d.life = d.maxLife = life * rand(1 + lifeVar, 1 - lifeVar);
      d.size = size * rand(1 + sizeVar, 1 - sizeVar);

      this.pPos[idx * 3] = pos.x;
      this.pPos[idx * 3 + 1] = pos.y;
      this.pPos[idx * 3 + 2] = pos.z;

      const mix = Math.random();
      const cr = this._color.r + (this._color2.r - this._color.r) * mix;
      const cg = this._color.g + (this._color2.g - this._color.g) * mix;
      const cb = this._color.b + (this._color2.b - this._color.b) * mix;
      this.pCol[idx * 3] = cr;
      this.pCol[idx * 3 + 1] = cg;
      this.pCol[idx * 3 + 2] = cb;

      this.pSize[idx] = d.size;
      this.pAlpha[idx] = 1;
    }
  }

  tracer(from, to, color = 0x9ffcff, radius = 1, life = 0.075) {
    const t = this.tracers[this.tracerCursor];
    this.tracerCursor = (this.tracerCursor + 1) % this.tracers.length;
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const dz = to.z - from.z;
    const len = Math.hypot(dx, dy, dz);
    if (len < 0.01) return;

    const mesh = t.mesh;
    mesh.visible = true;
    mesh.position.copy(from);
    mesh.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(dx / len, dy / len, dz / len)
    );
    mesh.scale.set(radius, len, radius);
    mesh.material.color.set(color);
    mesh.material.opacity = 0.95;
    t.life = t.maxLife = life;
  }

  ring(pos, opts = {}) {
    const { color = 0x48f5ff, scale = 4, life = 0.5, flat = false, opacity = 0.8 } = opts;
    const r = this.rings[this.ringCursor];
    this.ringCursor = (this.ringCursor + 1) % this.rings.length;
    r.mesh.visible = true;
    r.mesh.position.copy(pos);
    if (flat) {
      r.mesh.rotation.set(-Math.PI / 2, 0, 0);
      r.air = false;
    } else {
      r.mesh.rotation.set(0, 0, 0);
      r.air = true;
    }
    r.mesh.material.color.set(color);
    r.mesh.material.opacity = opacity;
    r.mesh.scale.setScalar(0.35);
    r.life = r.maxLife = life;
    r.scale1 = scale;
    r.opacity = opacity;
  }

  flash(pos, opts = {}) {
    const { color = 0xffffff, scale = 2, life = 0.16, opacity = 0.8 } = opts;
    const f = this.flashes[this.flashCursor];
    this.flashCursor = (this.flashCursor + 1) % this.flashes.length;
    f.sprite.visible = true;
    f.sprite.position.copy(pos);
    f.sprite.material.color.set(color);
    f.sprite.material.opacity = opacity;
    f.sprite.scale.setScalar(scale);
    f.life = f.maxLife = life;
    f.scale = scale;
    f.opacity = opacity;
  }

  muzzleFlash(pos, color = 0x9fefff) {
    this.flashLight.position.copy(pos);
    this.flashLight.color.set(color);
    this.flashLight.intensity = 26;
    this.flashPower = 1;
  }

  impact(pos, color = 0x9ffcff) {
    this.burst(pos, {
      count: 8,
      speed: 5.5,
      size: 0.07,
      life: 0.35,
      color,
      color2: 0xffffff,
      gravity: 10,
      drag: 3,
    });
    this.flash(pos, { color, scale: 0.9, life: 0.1, opacity: 0.7 });
  }

  explosion(pos, big = false) {
    const count = big ? 90 : 34;
    this.burst(pos, {
      count,
      speed: big ? 15 : 9,
      size: big ? 0.28 : 0.14,
      sizeVar: 0.7,
      life: big ? 1.15 : 0.65,
      lifeVar: 0.6,
      color: big ? 0xffcf5c : 0xff2d78,
      color2: big ? 0xff2d78 : 0xffcf5c,
      gravity: 4,
      drag: 1.6,
    });
    this.burst(pos, {
      count: big ? 40 : 18,
      speed: big ? 8 : 5,
      size: big ? 0.2 : 0.1,
      life: big ? 0.7 : 0.45,
      color: 0x9ffcff,
      color2: 0xffffff,
      gravity: 1,
      drag: 3,
    });
    this.flash(pos, {
      color: big ? 0xffcf5c : 0xff7099,
      scale: big ? 9 : 3.4,
      life: big ? 0.5 : 0.26,
      opacity: 0.95,
    });
    this.ring(pos, { color: big ? 0xff2d78 : 0x48f5ff, scale: big ? 16 : 5.5, life: big ? 0.9 : 0.5 });
    this.ring(pos, { color: 0xffffff, scale: big ? 10 : 3.5, life: big ? 0.6 : 0.32, opacity: 0.6 });
    this.muzzleFlash(pos, big ? 0xffcf5c : 0xff2d78);
  }

  pickup(pos) {
    this.burst(pos, {
      count: 16,
      speed: 3.4,
      size: 0.11,
      life: 0.7,
      color: 0x7dffa5,
      color2: 0xffffff,
      gravity: -1.5,
      drag: 2,
    });
    this.ring(pos, { color: 0x7dffa5, scale: 3, life: 0.5, flat: true });
  }

  spawnPulse(pos) {
    this.burst(pos, {
      count: 26,
      speed: 5,
      size: 0.13,
      life: 0.8,
      color: 0xff2d78,
      color2: 0x48f5ff,
      gravity: -2.5,
      drag: 2.5,
    });
    this.ring(pos, { color: 0xff2d78, scale: 5, life: 0.55, flat: true });
    this.flash(pos.clone().setY(1), { color: 0xff2d78, scale: 4, life: 0.3 });
  }

  update(dt, time) {
    // particles
    const pos = this.pPos;
    const size = this.pSize;
    const alpha = this.pAlpha;
    const data = this.pData;
    for (let i = 0; i < MAX_PARTICLES; i++) {
      const d = data[i];
      if (d.life <= 0) {
        if (alpha[i] !== 0) alpha[i] = 0;
        continue;
      }
      d.life -= dt;
      if (d.life <= 0) {
        alpha[i] = 0;
        size[i] = 0;
        continue;
      }
      const dragF = Math.max(0, 1 - d.drag * dt);
      d.vx *= dragF;
      d.vy *= dragF;
      d.vz *= dragF;
      d.vy -= d.grav * dt;
      pos[i * 3] += d.vx * dt;
      pos[i * 3 + 1] += d.vy * dt;
      pos[i * 3 + 2] += d.vz * dt;
      if (pos[i * 3 + 1] < 0.02 && d.grav > 0) {
        pos[i * 3 + 1] = 0.02;
        d.vy *= -0.28;
        d.vx *= 0.7;
        d.vz *= 0.7;
      }
      const k = d.life / d.maxLife;
      alpha[i] = Math.min(1, k * 2.2);
      size[i] = d.size * (0.4 + k * 0.6);
    }
    this.pGeo.attributes.position.needsUpdate = true;
    this.pGeo.attributes.aAlpha.needsUpdate = true;
    this.pGeo.attributes.aSize.needsUpdate = true;
    this.pGeo.attributes.aColor.needsUpdate = true;

    // tracers
    for (const t of this.tracers) {
      if (t.life <= 0) continue;
      t.life -= dt;
      const k = Math.max(0, t.life / t.maxLife);
      t.mesh.material.opacity = k * 0.95;
      t.mesh.scale.x = t.mesh.scale.z = t.mesh.scale.x * (1 - dt * 1.5);
      if (t.life <= 0) t.mesh.visible = false;
    }

    // rings
    for (const r of this.rings) {
      if (r.life <= 0) continue;
      r.life -= dt;
      const k = Math.max(0, 1 - r.life / r.maxLife);
      const s = 0.35 + (r.scale1 - 0.35) * (1 - Math.pow(1 - k, 3));
      r.mesh.scale.setScalar(s);
      r.mesh.material.opacity = (1 - k) * (r.opacity ?? 0.8);
      if (r.air) r.mesh.quaternion.copy(this.camera.quaternion);
      if (r.life <= 0) r.mesh.visible = false;
    }

    // flashes
    for (const f of this.flashes) {
      if (f.life <= 0) continue;
      f.life -= dt;
      const k = Math.max(0, f.life / f.maxLife);
      f.sprite.material.opacity = k * f.opacity;
      f.sprite.scale.setScalar(f.scale * (1.1 - k * 0.35));
      if (f.life <= 0) f.sprite.visible = false;
    }

    // muzzle light decay
    if (this.flashPower > 0) {
      this.flashPower = Math.max(0, this.flashPower - dt * 14);
      this.flashLight.intensity = this.flashPower * 26;
    }
  }

  reset() {
    for (let i = 0; i < MAX_PARTICLES; i++) {
      this.pData[i].life = 0;
      this.pSize[i] = 0;
      this.pAlpha[i] = 0;
    }
    this.pGeo.attributes.aAlpha.needsUpdate = true;
    this.pGeo.attributes.aSize.needsUpdate = true;
    for (const t of this.tracers) {
      t.life = 0;
      t.mesh.visible = false;
    }
    for (const r of this.rings) {
      r.life = 0;
      r.mesh.visible = false;
    }
    for (const f of this.flashes) {
      f.life = 0;
      f.sprite.visible = false;
    }
    this.flashLight.intensity = 0;
    this.flashPower = 0;
  }
}
