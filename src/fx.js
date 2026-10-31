import * as THREE from 'three';
import { bloodSplat, bulletHole, softParticle } from './textures.js';

const V3 = THREE.Vector3;
const TMP = new V3();

class ParticlePool {
  constructor(scene, count, { texture, color = 0xffffff, additive = false, gravity = -9.8, drag = 0.6, scale = 420 }) {
    this.count = count;
    this.gravity = gravity;
    this.drag = drag;
    this.scale = scale;
    this.positions = new Float32Array(count * 3);
    this.velocities = new Float32Array(count * 3);
    this.sizes = new Float32Array(count);
    this.alphas = new Float32Array(count);
    this.life = new Float32Array(count);
    this.maxLife = new Float32Array(count);
    this.cursor = 0;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(this.sizes, 1));
    geo.setAttribute('aAlpha', new THREE.BufferAttribute(this.alphas, 1));
    this.material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
      uniforms: {
        uMap: { value: texture },
        uColor: { value: new THREE.Color(color) },
        uScale: { value: scale },
      },
      vertexShader: /* glsl */`
        attribute float aSize;
        attribute float aAlpha;
        varying float vAlpha;
        uniform float uScale;
        void main() {
          vAlpha = aAlpha;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = clamp(aSize * uScale / max(1.0, -mv.z), 1.0, 90.0);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */`
        varying float vAlpha;
        uniform sampler2D uMap;
        uniform vec3 uColor;
        void main() {
          vec4 t = texture2D(uMap, gl_PointCoord);
          if (t.a * vAlpha < 0.01) discard;
          gl_FragColor = vec4(uColor, t.a * vAlpha);
        }
      `,
    });
    this.points = new THREE.Points(geo, this.material);
    this.points.frustumCulled = false;
    this.points.renderOrder = 8;
    this.geo = geo;
    scene.add(this.points);
    for (let i = 0; i < count; i++) this.alphas[i] = 0;
  }

  spawn(pos, vel, size, life) {
    const i = this.cursor;
    this.cursor = (this.cursor + 1) % this.count;
    const i3 = i * 3;
    this.positions[i3] = pos.x;
    this.positions[i3 + 1] = pos.y;
    this.positions[i3 + 2] = pos.z;
    this.velocities[i3] = vel.x;
    this.velocities[i3 + 1] = vel.y;
    this.velocities[i3 + 2] = vel.z;
    this.sizes[i] = size;
    this.life[i] = life;
    this.maxLife[i] = life;
    this.alphas[i] = 1;
  }

  update(dt) {
    const p = this.positions, v = this.velocities;
    const damp = Math.exp(-this.drag * dt);
    for (let i = 0; i < this.count; i++) {
      if (this.life[i] <= 0) {
        if (this.alphas[i] !== 0) this.alphas[i] = 0;
        continue;
      }
      this.life[i] -= dt;
      const i3 = i * 3;
      v[i3 + 1] += this.gravity * dt;
      v[i3] *= damp;
      v[i3 + 1] *= damp;
      v[i3 + 2] *= damp;
      p[i3] += v[i3] * dt;
      p[i3 + 1] += v[i3 + 1] * dt;
      p[i3 + 2] += v[i3 + 2] * dt;
      if (p[i3 + 1] < 0.02) {
        p[i3 + 1] = 0.02;
        v[i3 + 1] *= -0.22;
        v[i3] *= 0.5;
        v[i3 + 2] *= 0.5;
      }
      const t = Math.max(0, this.life[i] / this.maxLife[i]);
      this.alphas[i] = t * t;
    }
    this.geo.attributes.position.needsUpdate = true;
    this.geo.attributes.aSize.needsUpdate = true;
    this.geo.attributes.aAlpha.needsUpdate = true;
  }

  reset() {
    for (let i = 0; i < this.count; i++) {
      this.life[i] = 0;
      this.alphas[i] = 0;
    }
    this.geo.attributes.aAlpha.needsUpdate = true;
  }
}

export class FX {
  constructor(scene, world, camera) {
    this.scene = scene;
    this.world = world;
    this.camera = camera;
    this.time = 0;
    this.decals = [];
    this.holes = [];
    this.gibs = [];
    this.tracers = [];
    this.shells = [];
    this.lights = [];
    this._initParticles();
    this._initDecals();
    this._initGibs();
    this._initTracers();
    this._initShells();
  }

  _initParticles() {
    const bloodTex = softParticle('150,10,12');
    const sparkTex = softParticle('255,190,90');
    const dustTex = softParticle('170,170,160');
    this.blood = new ParticlePool(this.scene, 900, { texture: bloodTex, color: 0x8e0d12, gravity: -11, drag: 0.7, scale: 500 });
    this.bloodMist = new ParticlePool(this.scene, 160, { texture: bloodTex, color: 0x5c0609, gravity: -0.8, drag: 2.2, scale: 700 });
    this.sparks = new ParticlePool(this.scene, 260, { texture: sparkTex, color: 0xffb15c, additive: true, gravity: -13, drag: 0.35, scale: 360 });
    this.dust = new ParticlePool(this.scene, 220, { texture: dustTex, color: 0x8e8b80, gravity: -0.4, drag: 1.8, scale: 600 });
    this.embers = new ParticlePool(this.scene, 90, { texture: sparkTex, color: 0xff6a2a, additive: true, gravity: 0.6, drag: 0.4, scale: 220 });
    this._emberTimer = 0;
  }

  _initDecals() {
    const bloodTex = bloodSplat();
    this.bloodMatBase = new THREE.MeshStandardMaterial({
      map: bloodTex, transparent: true, opacity: 1, roughness: 0.35, metalness: 0.05,
      depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4, side: THREE.DoubleSide,
      envMapIntensity: 0.5,
    });
    for (let i = 0; i < 34; i++) {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), this.bloodMatBase.clone());
      m.visible = false;
      m.renderOrder = 6;
      this.scene.add(m);
      this.decals.push({ mesh: m, life: 0 });
    }

    const holeTex = bulletHole();
    this.holeMatBase = new THREE.MeshStandardMaterial({
      map: holeTex, transparent: true, opacity: 0.95, roughness: 0.8, metalness: 0.1,
      depthWrite: false, polygonOffset: true, polygonOffsetFactor: -5, side: THREE.DoubleSide,
    });
    for (let i = 0; i < 44; i++) {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 0.18), this.holeMatBase.clone());
      m.visible = false;
      m.renderOrder = 7;
      this.scene.add(m);
      this.holes.push({ mesh: m, life: 0 });
    }
  }

  _initGibs() {
    const meat = new THREE.MeshStandardMaterial({ color: 0x4a080b, roughness: 0.45, metalness: 0.05, envMapIntensity: 0.4 });
    const bone = new THREE.MeshStandardMaterial({ color: 0xb9ac8a, roughness: 0.6, metalness: 0.05 });
    for (let i = 0; i < 26; i++) {
      const g = new THREE.Group();
      const chunk = new THREE.Mesh(new THREE.IcosahedronGeometry(1, 1), meat.clone());
      chunk.scale.set(0.8 + Math.random() * 0.7, 0.7 + Math.random() * 0.8, 0.6 + Math.random() * 0.7);
      chunk.castShadow = true;
      g.add(chunk);
      if (Math.random() < 0.45) {
        const b = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.035, 0.34, 5), bone.clone());
        b.position.set((Math.random() - 0.5) * 0.2, 0.2, 0);
        b.rotation.set(Math.random(), Math.random(), Math.random());
        g.add(b);
      }
      g.visible = false;
      this.scene.add(g);
      this.gibs.push({ mesh: g, vel: new V3(), spin: new V3(), life: 0, maxLife: 0, scale: 1 });
    }
  }

  _initTracers() {
    this.tracerMatBase = new THREE.LineBasicMaterial({
      color: 0xffd08a, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false,
    });
    for (let i = 0; i < 18; i++) {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
      const line = new THREE.Line(geo, this.tracerMatBase.clone());
      line.visible = false;
      line.frustumCulled = false;
      this.scene.add(line);
      this.tracers.push({ line, life: 0 });
    }
  }

  _initShells() {
    const brass = new THREE.MeshStandardMaterial({ color: 0xb08b3e, metalness: 0.9, roughness: 0.32, envMapIntensity: 1.2 });
    const geo = new THREE.CylinderGeometry(0.012, 0.014, 0.055, 6);
    for (let i = 0; i < 22; i++) {
      const m = new THREE.Mesh(geo, brass);
      m.visible = false;
      m.castShadow = false;
      this.scene.add(m);
      this.shells.push({ mesh: m, vel: new V3(), spin: new V3(), life: 0 });
    }
  }

  bloodBurst(pos, dir, count = 24, opts = {}) {
    const force = opts.force ?? 1;
    const head = opts.headshot;
    for (let i = 0; i < count; i++) {
      const v = new V3(
        dir.x * (1.4 + Math.random() * 3.2) * force + (Math.random() - 0.5) * 2.4,
        Math.random() * 2.8 * force + 0.2,
        dir.z * (1.4 + Math.random() * 3.2) * force + (Math.random() - 0.5) * 2.4
      );
      this.blood.spawn(pos, v, 0.035 + Math.random() * (head ? 0.1 : 0.07), 0.4 + Math.random() * 0.6);
    }
    if (count > 15) {
      for (let i = 0; i < (head ? 10 : 6); i++) {
        const v = new V3(
          dir.x * 0.8 + (Math.random() - 0.5) * 1.2,
          Math.random() * 0.9 + 0.1,
          dir.z * 0.8 + (Math.random() - 0.5) * 1.2
        );
        this.bloodMist.spawn(pos, v, 0.14 + Math.random() * 0.22, 0.5 + Math.random() * 0.5);
      }
    }
    if (opts.player) {
      // not blood — handled as a small red flash elsewhere
    }
  }

  gib(pos, dir, scale = 1, head = false) {
    const g = this.gibs.find((x) => x.life <= 0);
    if (!g) return;
    g.mesh.visible = true;
    g.mesh.position.copy(pos);
    g.scale = scale * (head ? 0.2 : 0.11);
    g.mesh.scale.setScalar(g.scale);
    g.vel.set(
      dir.x * (2.4 + Math.random() * 3) + (Math.random() - 0.5) * 1.4,
      2.2 + Math.random() * 3.2,
      dir.z * (2.4 + Math.random() * 3) + (Math.random() - 0.5) * 1.4
    );
    g.spin.set((Math.random() - 0.5) * 12, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 12);
    g.life = 5 + Math.random() * 2;
    g.maxLife = g.life;
    g.head = head;
    if (head) {
      g.mesh.children[0].material.color.setHex(0x5a0a0c);
    }
  }

  bloodPool(pos, size = 1.4) {
    const d = this.decals.find((x) => x.life <= 0) || this.decals[0];
    d.mesh.visible = true;
    d.mesh.position.set(pos.x + (Math.random() - 0.5) * 0.4, 0.018, pos.z + (Math.random() - 0.5) * 0.4);
    d.mesh.rotation.set(-Math.PI / 2, 0, Math.random() * Math.PI * 2);
    d.mesh.scale.setScalar(size * (0.85 + Math.random() * 0.4));
    d.mesh.material.opacity = 0.95;
    d.life = 40;
    d.maxLife = 40;
  }

  impact(point, normal, kind = 'concrete') {
    const n = normal.clone().normalize();
    const p = point.clone().addScaledVector(n, 0.012);
    for (let i = 0; i < 10; i++) {
      const v = new V3(
        n.x * (1.5 + Math.random() * 3) + (Math.random() - 0.5) * 3,
        n.y * 1.5 + Math.random() * 2.6,
        n.z * (1.5 + Math.random() * 3) + (Math.random() - 0.5) * 3
      );
      this.sparks.spawn(p, v, 0.014 + Math.random() * 0.026, 0.15 + Math.random() * 0.3);
    }
    for (let i = 0; i < 5; i++) {
      const v = new V3(n.x * 0.4 + (Math.random() - 0.5) * 0.8, 0.3 + Math.random() * 0.6, n.z * 0.4 + (Math.random() - 0.5) * 0.8);
      this.dust.spawn(p, v, 0.1 + Math.random() * 0.18, 0.4 + Math.random() * 0.7);
    }
    const h = this.holes.find((x) => x.life <= 0) || this.holes[0];
    h.mesh.visible = true;
    h.mesh.position.copy(p).addScaledVector(n, 0.008);
    h.mesh.lookAt(p.clone().add(n));
    h.mesh.rotateZ(Math.random() * Math.PI * 2);
    h.mesh.scale.setScalar(0.65 + Math.random() * 0.7);
    h.mesh.material.opacity = 0.95;
    h.life = 30;
    h.maxLife = 30;
  }

  tracer(from, to) {
    const t = this.tracers.find((x) => x.life <= 0) || this.tracers[0];
    const arr = t.line.geometry.attributes.position.array;
    arr[0] = from.x; arr[1] = from.y; arr[2] = from.z;
    arr[3] = to.x; arr[4] = to.y; arr[5] = to.z;
    t.line.geometry.attributes.position.needsUpdate = true;
    t.line.visible = true;
    t.line.material.opacity = 0.85;
    t.life = 0.07;
  }

  shell(pos, dir) {
    const s = this.shells.find((x) => x.life <= 0) || this.shells[0];
    s.mesh.visible = true;
    s.mesh.position.copy(pos);
    s.vel.set(dir.x * 1.4 + (Math.random() - 0.5) * 0.8, 1.4 + Math.random() * 1.4, dir.z * 1.4 + (Math.random() - 0.5) * 0.8);
    s.spin.set(Math.random() * 14, Math.random() * 14, Math.random() * 14);
    s.life = 3.5;
    s.mesh.scale.setScalar(1);
  }

  muzzleLight(pos, color = 0xffa050, intensity = 8) {
    let l = this.lights.find((x) => x.life <= 0);
    if (!l) {
      const light = new THREE.PointLight(color, 0, 9, 2);
      this.scene.add(light);
      l = { light, life: 0 };
      this.lights.push(l);
    }
    l.light.position.copy(pos);
    l.light.color.setHex(color);
    l.light.intensity = intensity;
    l.life = 0.055;
  }

  update(dt) {
    this.time += dt;
    this.blood.update(dt);
    this.bloodMist.update(dt);
    this.sparks.update(dt);
    this.dust.update(dt);
    this.embers.update(dt);

    this._emberTimer -= dt;
    if (this._emberTimer <= 0) {
      this._emberTimer = 0.18;
      const cam = this.camera.position;
      for (let i = 0; i < 2; i++) {
        this.embers.spawn(
          new V3(cam.x + (Math.random() - 0.5) * 18, 0.2 + Math.random() * 1.2, cam.z + (Math.random() - 0.5) * 18),
          new V3((Math.random() - 0.5) * 0.5, 0.2 + Math.random() * 0.4, (Math.random() - 0.5) * 0.5),
          0.02 + Math.random() * 0.03,
          3 + Math.random() * 4
        );
      }
    }

    for (const d of this.decals) {
      if (d.life <= 0) continue;
      d.life -= dt;
      if (d.life < 5) d.mesh.material.opacity = Math.max(0, d.life / 5) * 0.95;
      if (d.life <= 0) d.mesh.visible = false;
    }
    for (const h of this.holes) {
      if (h.life <= 0) continue;
      h.life -= dt;
      if (h.life <= 0) h.mesh.visible = false;
    }
    for (const g of this.gibs) {
      if (g.life <= 0) continue;
      g.life -= dt;
      g.vel.y -= 12 * dt;
      g.mesh.position.addScaledVector(g.vel, dt);
      g.mesh.rotation.x += g.spin.x * dt;
      g.mesh.rotation.y += g.spin.y * dt;
      g.mesh.rotation.z += g.spin.z * dt;
      if (g.mesh.position.y < 0.06) {
        g.mesh.position.y = 0.06;
        g.vel.y *= -0.28;
        g.vel.x *= 0.55;
        g.vel.z *= 0.55;
        g.spin.multiplyScalar(0.7);
      }
      if (g.life < 1.2) {
        const s = g.scale * Math.max(0, g.life / 1.2);
        g.mesh.scale.setScalar(s);
      }
      if (g.life <= 0) g.mesh.visible = false;
    }
    for (const t of this.tracers) {
      if (t.life <= 0) continue;
      t.life -= dt;
      t.line.material.opacity = Math.max(0, t.life / 0.07) * 0.85;
      if (t.life <= 0) t.line.visible = false;
    }
    for (const s of this.shells) {
      if (s.life <= 0) continue;
      s.life -= dt;
      s.vel.y -= 12 * dt;
      s.mesh.position.addScaledVector(s.vel, dt);
      s.mesh.rotation.x += s.spin.x * dt;
      s.mesh.rotation.z += s.spin.z * dt;
      if (s.mesh.position.y < 0.02) {
        s.mesh.position.y = 0.02;
        s.vel.y *= -0.35;
        s.vel.x *= 0.6;
        s.vel.z *= 0.6;
      }
      if (s.life <= 0) s.mesh.visible = false;
    }
    for (const l of this.lights) {
      if (l.life <= 0) continue;
      l.life -= dt;
      l.light.intensity *= 0.72;
      if (l.life <= 0) l.light.intensity = 0;
    }
  }

  reset() {
    this.blood.reset(); this.bloodMist.reset(); this.sparks.reset(); this.dust.reset(); this.embers.reset();
    for (const d of this.decals) { d.life = 0; d.mesh.visible = false; }
    for (const h of this.holes) { h.life = 0; h.mesh.visible = false; }
    for (const g of this.gibs) { g.life = 0; g.mesh.visible = false; }
    for (const t of this.tracers) { t.life = 0; t.line.visible = false; }
    for (const s of this.shells) { s.life = 0; s.mesh.visible = false; }
    for (const l of this.lights) { l.life = 0; l.light.intensity = 0; }
  }
}
