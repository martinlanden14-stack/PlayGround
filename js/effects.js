/* ============================================================
   NEON BREACH — pooled visual effects
   ============================================================ */
import * as THREE from 'three';

const PARTICLE_VERT = `
  attribute float aSize;
  attribute float aAlpha;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vColor = color;
    vAlpha = aAlpha;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (260.0 / max(1.0, -mv.z));
    gl_Position = projectionMatrix * mv;
  }`;

const PARTICLE_FRAG = `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.05, d) * vAlpha;
    gl_FragColor = vec4(vColor, a);
  }`;

class ParticlePool {
  constructor(scene, count) {
    this.count = count;
    this.cursor = 0;
    this.pos = new Float32Array(count * 3);
    this.vel = new Float32Array(count * 3);
    this.col = new Float32Array(count * 3);
    this.size = new Float32Array(count);
    this.alpha = new Float32Array(count);
    this.life = new Float32Array(count);
    this.maxLife = new Float32Array(count);
    this.drag = new Float32Array(count);
    this.grav = new Float32Array(count);
    this.baseSize = new Float32Array(count);

    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(this.pos, 3));
    g.setAttribute('color', new THREE.BufferAttribute(this.col, 3));
    g.setAttribute('aSize', new THREE.BufferAttribute(this.size, 1));
    g.setAttribute('aAlpha', new THREE.BufferAttribute(this.alpha, 1));
    const m = new THREE.ShaderMaterial({
      vertexShader: PARTICLE_VERT,
      fragmentShader: PARTICLE_FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });
    this.points = new THREE.Points(g, m);
    this.points.frustumCulled = false;
    scene.add(this.points);
    this.geo = g;
  }

  spawn(x, y, z, vx, vy, vz, r, g, b, size, life, drag = 2.4, grav = 7) {
    const i = this.cursor;
    this.cursor = (this.cursor + 1) % this.count;
    const i3 = i * 3;
    this.pos[i3] = x; this.pos[i3 + 1] = y; this.pos[i3 + 2] = z;
    this.vel[i3] = vx; this.vel[i3 + 1] = vy; this.vel[i3 + 2] = vz;
    this.col[i3] = r; this.col[i3 + 1] = g; this.col[i3 + 2] = b;
    this.baseSize[i] = size;
    this.size[i] = size;
    this.alpha[i] = 1;
    this.life[i] = life;
    this.maxLife[i] = life;
    this.drag[i] = drag;
    this.grav[i] = grav;
  }

  update(dt) {
    for (let i = 0; i < this.count; i++) {
      if (this.life[i] <= 0) { this.alpha[i] = 0; continue; }
      this.life[i] -= dt;
      const i3 = i * 3;
      const k = Math.max(0, this.life[i] / this.maxLife[i]);
      const dragK = Math.max(0, 1 - this.drag[i] * dt);
      this.vel[i3] *= dragK;
      this.vel[i3 + 1] = this.vel[i3 + 1] * dragK - this.grav[i] * dt;
      this.vel[i3 + 2] *= dragK;
      this.pos[i3] += this.vel[i3] * dt;
      this.pos[i3 + 1] += this.vel[i3 + 1] * dt;
      this.pos[i3 + 2] += this.vel[i3 + 2] * dt;
      if (this.pos[i3 + 1] < 0.03) {
        this.pos[i3 + 1] = 0.03;
        this.vel[i3 + 1] *= -0.32;
        this.vel[i3] *= 0.6;
        this.vel[i3 + 2] *= 0.6;
      }
      this.alpha[i] = k * k;
      this.size[i] = this.baseSize[i] * (0.55 + k * 0.7);
    }
    this.geo.attributes.position.needsUpdate = true;
    this.geo.attributes.color.needsUpdate = true;
    this.geo.attributes.aSize.needsUpdate = true;
    this.geo.attributes.aAlpha.needsUpdate = true;
  }
}

export class Effects {
  constructor(scene) {
    this.scene = scene;
    this.particles = new ParticlePool(scene, 520);
    this.tracers = [];
    this.shells = [];
    this.rings = [];
    this.time = 0;

    const tracerGeo = new THREE.BoxGeometry(0.035, 0.035, 1);
    const tracerMat = new THREE.MeshBasicMaterial({
      color: 0xaef7ff, transparent: true, opacity: 0.9,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    for (let i = 0; i < 14; i++) {
      const m = new THREE.Mesh(tracerGeo, tracerMat.clone());
      m.visible = false;
      m.frustumCulled = false;
      scene.add(m);
      this.tracers.push({ mesh: m, life: 0, max: 0.09 });
    }

    const shellGeo = new THREE.BoxGeometry(0.035, 0.035, 0.075);
    const shellMat = new THREE.MeshStandardMaterial({ color: 0xffc35a, emissive: 0x6a3400, emissiveIntensity: 0.6, metalness: 0.9, roughness: 0.3 });
    for (let i = 0; i < 14; i++) {
      const m = new THREE.Mesh(shellGeo, shellMat);
      m.visible = false;
      scene.add(m);
      this.shells.push({ mesh: m, life: 0, vel: new THREE.Vector3(), spin: new THREE.Vector3() });
    }

    const ringGeo = new THREE.RingGeometry(0.35, 0.55, 40);
    for (let i = 0; i < 10; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: 0xff2f7e, transparent: true, opacity: 0,
        side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false,
      });
      const m = new THREE.Mesh(ringGeo, mat);
      m.visible = false;
      scene.add(m);
      this.rings.push({ mesh: m, life: 0, max: 0.5 });
    }

    this.tracerCursor = 0;
    this.shellCursor = 0;
    this.ringCursor = 0;
  }

  tracer(from, to, color = 0xaef7ff) {
    const t = this.tracers[this.tracerCursor];
    this.tracerCursor = (this.tracerCursor + 1) % this.tracers.length;
    const len = from.distanceTo(to);
    if (len < 0.1) return;
    const mesh = t.mesh;
    mesh.visible = true;
    mesh.material.color.setHex(color);
    mesh.material.opacity = 0.85;
    mesh.position.copy(from).add(to).multiplyScalar(0.5);
    mesh.lookAt(to);
    mesh.scale.set(1, 1, len);
    t.life = t.max;
  }

  sparkBurst(pos, normal, color = 0x9ff6ff, count = 10, power = 7) {
    const c = new THREE.Color(color);
    for (let i = 0; i < count; i++) {
      const vx = (Math.random() - 0.5) * power + normal.x * power * 0.5;
      const vy = (Math.random() - 0.3) * power + normal.y * power * 0.5;
      const vz = (Math.random() - 0.5) * power + normal.z * power * 0.5;
      this.particles.spawn(
        pos.x, pos.y, pos.z, vx, vy, vz,
        c.r, c.g, c.b,
        0.07 + Math.random() * 0.09,
        0.25 + Math.random() * 0.35,
        3.2, 9
      );
    }
    // flash core
    this.particles.spawn(pos.x, pos.y, pos.z, 0, 0.4, 0, c.r, c.g, c.b, 0.42, 0.09, 1, 0);
  }

  explosion(pos, color = 0xff2f7e, scale = 1) {
    const c = new THREE.Color(color);
    const c2 = new THREE.Color(0xffd28a);
    const n = Math.floor(26 * scale);
    for (let i = 0; i < n; i++) {
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      const sp = (3 + Math.random() * 8) * scale;
      const cc = Math.random() < 0.3 ? c2 : c;
      this.particles.spawn(
        pos.x, pos.y, pos.z,
        Math.sin(ph) * Math.cos(th) * sp,
        Math.cos(ph) * sp * 0.7 + 2,
        Math.sin(ph) * Math.sin(th) * sp,
        cc.r, cc.g, cc.b,
        (0.1 + Math.random() * 0.18) * scale,
        0.4 + Math.random() * 0.5,
        2.2, 8
      );
    }
    this.particles.spawn(pos.x, pos.y, pos.z, 0, 0, 0, 1, 0.85, 0.6, 1.6 * scale, 0.12, 1, 0);
    this.shockwave(pos, color, 1.3 * scale);
  }

  shockwave(pos, color = 0xff2f7e, scale = 1) {
    const r = this.rings[this.ringCursor];
    this.ringCursor = (this.ringCursor + 1) % this.rings.length;
    r.mesh.visible = true;
    r.mesh.position.copy(pos);
    r.mesh.rotation.set(Math.PI / 2, 0, 0);
    r.mesh.material.color.setHex(color);
    r.mesh.material.opacity = 0.9;
    r.mesh.scale.setScalar(0.4 * scale);
    r.life = r.max;
    r.scale = scale;
  }

  shell(pos, dir) {
    const s = this.shells[this.shellCursor];
    this.shellCursor = (this.shellCursor + 1) % this.shells.length;
    s.mesh.visible = true;
    s.mesh.position.copy(pos);
    s.vel.set(dir.x * 2 + (Math.random() - 0.5) * 1.5, 1.6 + Math.random(), dir.z * 2 + (Math.random() - 0.5) * 1.5);
    s.spin.set(Math.random() * 20, Math.random() * 20, Math.random() * 20);
    s.life = 1.1;
    s.bounces = 0;
  }

  update(dt) {
    this.time += dt;
    this.particles.update(dt);

    for (const t of this.tracers) {
      if (t.life > 0) {
        t.life -= dt;
        t.mesh.material.opacity = Math.max(0, (t.life / t.max) * 0.9);
        if (t.life <= 0) t.mesh.visible = false;
      }
    }

    for (const s of this.shells) {
      if (s.life <= 0) continue;
      s.life -= dt;
      s.vel.y -= 16 * dt;
      s.mesh.position.addScaledVector(s.vel, dt);
      s.mesh.rotation.x += s.spin.x * dt;
      s.mesh.rotation.y += s.spin.y * dt;
      s.mesh.rotation.z += s.spin.z * dt;
      if (s.mesh.position.y < 0.03) {
        s.mesh.position.y = 0.03;
        s.vel.y = Math.abs(s.vel.y) * 0.35;
        s.vel.x *= 0.5;
        s.vel.z *= 0.5;
        s.spin.multiplyScalar(0.5);
      }
      if (s.life <= 0) s.mesh.visible = false;
    }

    for (const r of this.rings) {
      if (r.life > 0) {
        r.life -= dt;
        const k = 1 - r.life / r.max;
        const s = (0.4 + k * 3.2) * (r.scale || 1);
        r.mesh.scale.setScalar(s);
        r.mesh.material.opacity = Math.max(0, (1 - k) * 0.85);
        if (r.life <= 0) r.mesh.visible = false;
      }
    }
  }
}
