import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import {
  asphalt, concrete, rustMetal, wood, containerSide, chainlink,
  bloodSplat, bulletHole, softParticle, signTexture, hazardStripe, fbm, rng,
} from './textures.js';

const TAU = Math.PI * 2;
const V3 = THREE.Vector3;

function rayAABB(o, d, c, maxDist) {
  let tmin = 0, tmax = maxDist;
  let nAxis = -1, nSign = 1;
  const axes = ['x', 'y', 'z'];
  const mins = [c.minX, c.minY, c.minZ];
  const maxs = [c.maxX, c.maxY, c.maxZ];
  for (let i = 0; i < 3; i++) {
    const oi = o[axes[i]], di = d[axes[i]];
    if (Math.abs(di) < 1e-8) {
      if (oi < mins[i] || oi > maxs[i]) return null;
      continue;
    }
    const inv = 1 / di;
    let t1 = (mins[i] - oi) * inv;
    let t2 = (maxs[i] - oi) * inv;
    let sign = -1;
    if (t1 > t2) { const tt = t1; t1 = t2; t2 = tt; sign = 1; }
    if (t1 > tmin) { tmin = t1; nAxis = i; nSign = sign; }
    if (t2 < tmax) tmax = t2;
    if (tmin > tmax) return null;
  }
  if (nAxis < 0) return null;
  const n = new V3(0, 0, 0);
  n[axes[nAxis]] = nSign;
  return { dist: tmin, point: new V3(o.x + d.x * tmin, o.y + d.y * tmin, o.z + d.z * tmin), normal: n };
}

function box(w, h, d, material, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

function rounded(w, h, d, r, material, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 3, r), material);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

export class World {
  constructor(scene, renderer) {
    this.scene = scene;
    this.renderer = renderer;
    this.colliders = [];
    this.spawnPoints = [
      new V3(-17, 0, -18), new V3(17, 0, -18), new V3(0, 0, -21),
      new V3(-20, 0, 4), new V3(20, 0, 5), new V3(14, 0, 17), new V3(-15, 0, 17),
    ];
    this.flickerLights = [];
    this.time = 0;
    this.lightning = 0;
    this._lightningTimer = 14;
    this._lightningPhase = 0;
    this._materials = [];
    this.rain = null;
    this.mist = [];
    this.flashOverlay = 0;

    this._buildEnvironment();
    this._buildSky();
    this._buildGround();
    this._buildPerimeter();
    this._buildProps();
    this._buildLighting();
    this._buildRain();
    this._buildMist();
    this._buildShowcaseLight();
    this.scene.fog = new THREE.FogExp2(0x0d151f, 0.0185);
  }

  mat(params = {}) {
    const m = new THREE.MeshStandardMaterial({
      envMapIntensity: 0.85,
      ...params,
    });
    this._materials.push(m);
    return m;
  }

  phys(params = {}) {
    const m = new THREE.MeshPhysicalMaterial({
      envMapIntensity: 1.2,
      ...params,
    });
    this._materials.push(m);
    return m;
  }

  addCollider(minX, maxX, minZ, maxZ, tag = 'wall', minY = 0, maxY = 4) {
    this.colliders.push({ minX, maxX, minZ, maxZ, minY, maxY, tag });
  }

  meshCollider(mesh, pad = 0, tag = 'prop') {
    mesh.updateMatrixWorld(true);
    const b = new THREE.Box3().setFromObject(mesh);
    this.addCollider(b.min.x - pad, b.max.x + pad, b.min.z - pad, b.max.z + pad, tag, b.min.y - pad, b.max.y + pad);
  }

  /** Ray vs. the coarse collision world. Returns nearest hit point/normal. */
  raycast(origin, dir, maxDist = 120) {
    let best = maxDist;
    let normal = null;
    let point = null;
    for (const c of this.colliders) {
      const hit = rayAABB(origin, dir, c, best);
      if (hit && hit.dist < best) {
        best = hit.dist;
        point = hit.point;
        normal = hit.normal;
      }
    }
    // ground plane
    if (Math.abs(dir.y) > 1e-5) {
      const t = -origin.y / dir.y;
      if (t > 0.01 && t < best) {
        best = t;
        point = new V3(origin.x + dir.x * t, 0, origin.z + dir.z * t);
        normal = new V3(0, 1, 0);
      }
    }
    return point ? { point, normal, distance: best } : null;
  }

  /* ------------------------------------------------------------------ */
  _buildEnvironment() {
    // Custom night environment probe: cold sky, warm sodium lamps, red flare.
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    pmrem.compileEquirectangularShader();
    const env = new THREE.Scene();
    env.background = new THREE.Color(0x020407);
    const dome = new THREE.Mesh(
      new THREE.SphereGeometry(40, 24, 12),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(0x0a1622), side: THREE.BackSide })
    );
    env.add(dome);
    const panel = (color, power, pos, scale, rot) => {
      const m = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1),
        new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(power), side: THREE.DoubleSide })
      );
      m.position.set(...pos);
      m.scale.set(...scale);
      if (rot) m.rotation.set(...rot);
      env.add(m);
    };
    panel(0xff8f3d, 5.0, [-9, 4, -6], [5, 2.4, 1], [0, 0.8, 0]);
    panel(0xff8f3d, 3.4, [11, 5, 4], [4, 2, 1], [0, -1.1, 0]);
    panel(0x69a6ff, 1.8, [0, 12, -14], [10, 4, 1], [0, 0, 0]);
    panel(0xff2f1f, 3.2, [12, 1.2, -9], [1.2, 1.2, 1], [0, 0.4, 0]);
    panel(0x9ed8ff, 1.0, [-14, 9, 8], [8, 3, 1], [0.3, -0.7, 0]);
    this.scene.environment = pmrem.fromScene(env, 0.06).texture;
    this.scene.environmentIntensity = 1.22;
    pmrem.dispose();
    env.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) o.material.dispose();
    });
  }

  _buildSky() {
    const geo = new THREE.SphereGeometry(160, 32, 20);
    const mat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: { uTime: { value: 0 } },
      vertexShader: /* glsl */`
        varying vec3 vWorld;
        void main() {
          vWorld = normalize(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */`
        varying vec3 vWorld;
        uniform float uTime;
        float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float noise(vec2 p) {
          vec2 i = floor(p), f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(mix(hash(i), hash(i + vec2(1,0)), u.x), mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x), u.y);
        }
        float fbm(vec2 p) {
          float v = 0.0, a = 0.5;
          for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
          return v;
        }
        void main() {
          vec3 d = normalize(vWorld);
          float h = clamp(d.y * 0.5 + 0.5, 0.0, 1.0);
          vec3 top = vec3(0.004, 0.008, 0.016);
          vec3 mid = vec3(0.018, 0.033, 0.050);
          vec3 hor = vec3(0.085, 0.070, 0.055);
          vec3 col = mix(hor, mid, smoothstep(0.44, 0.60, h));
          col = mix(col, top, smoothstep(0.60, 0.92, h));
          vec2 p = d.xz / max(0.08, d.y + 0.32);
          float clouds = fbm(p * 1.8 + vec2(uTime * 0.006, uTime * 0.002));
          float band = smoothstep(0.42, 0.78, clouds) * smoothstep(0.0, 0.22, d.y) * (1.0 - smoothstep(0.55, 0.95, d.y));
          col += vec3(0.055, 0.065, 0.080) * band;
          vec2 flatDir = normalize(vec2(d.x, d.z) + 0.0001);
          float glow = pow(max(0.0, dot(flatDir, normalize(vec2(-0.7, -0.72)))), 7.0);
          col += vec3(0.12, 0.055, 0.018) * glow * smoothstep(0.0, 0.14, d.y) * (1.0 - smoothstep(0.22, 0.55, d.y));
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });
    this.sky = new THREE.Mesh(geo, mat);
    this.sky.frustumCulled = false;
    this.scene.add(this.sky);
  }

  _buildGround() {
    const a = asphalt();
    const groundMat = this.phys({
      map: a.map,
      normalMap: a.normalMap,
      roughnessMap: a.roughnessMap,
      normalScale: new THREE.Vector2(0.55, 0.55),
      metalness: 0.12,
      roughness: 1,
      color: 0xcdd2d6,
      envMapIntensity: 0.55,
    });
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(72, 72), groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);

    // darker outer apron
    const apron = new THREE.Mesh(
      new THREE.PlaneGeometry(140, 140),
      this.mat({ color: 0x07090b, roughness: 0.95, metalness: 0.05 })
    );
    apron.rotation.x = -Math.PI / 2;
    apron.position.y = -0.03;
    apron.receiveShadow = true;
    this.scene.add(apron);

    // faded lane markings and hazard border
    const paint = this.mat({ color: 0xb9b6a6, roughness: 0.9, transparent: true, opacity: 0.24 });
    for (let i = 0; i < 7; i++) {
      const stripe = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 2.2), paint);
      stripe.rotation.x = -Math.PI / 2;
      stripe.position.set(0, 0.012, -10 + i * 4);
      this.scene.add(stripe);
    }
    const hz = hazardStripe();
    hz.repeat.set(18, 1);
    const hazardMat = this.mat({ map: hz, roughness: 0.8, transparent: true, opacity: 0.55, polygonOffset: true, polygonOffsetFactor: -1 });
    for (const [x, z, w, d, rot] of [[0, 10.8, 22, 0.55, 0], [0, -16.5, 26, 0.5, 0], [16.5, 4, 0.5, 14, Math.PI / 2]]) {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), hazardMat);
      m.rotation.x = -Math.PI / 2;
      m.rotation.z = rot;
      m.position.set(x, 0.014, z);
      this.scene.add(m);
    }

    // Puddles
    const puddleMat = this.phys({
      color: 0x05090c,
      roughness: 0.045,
      metalness: 0.35,
      clearcoat: 1,
      clearcoatRoughness: 0.06,
      transparent: true,
      opacity: 0.82,
      envMapIntensity: 1.8,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const r = rng(4);
    const puddles = [[-3, 4, 3.4], [5.5, -5, 2.7], [-8, -10, 3.8], [11, 8, 3.0], [1.5, -15, 2.4], [-13, 2, 2.2], [8, 14, 2.6]];
    for (const [px, pz, size] of puddles) {
      const shape = new THREE.Shape();
      const pts = 22;
      for (let i = 0; i <= pts; i++) {
        const a = (i / pts) * TAU;
        const rad = size * (0.72 + fbm(Math.cos(a) * 2 + px, Math.sin(a) * 2 + pz, 3, 8) * 0.55);
        const x = Math.cos(a) * rad, y = Math.sin(a) * rad * 0.65;
        if (i === 0) shape.moveTo(x, y); else shape.lineTo(x, y);
      }
      const m = new THREE.Mesh(new THREE.ShapeGeometry(shape), puddleMat);
      m.rotation.x = -Math.PI / 2;
      m.position.set(px, 0.009, pz);
      m.renderOrder = 2;
      this.scene.add(m);
    }

    // scattered rubble
    const rubbleMat = this.mat({ color: 0x3a3b39, roughness: 0.95 });
    const r2 = rng(11);
    for (let i = 0; i < 90; i++) {
      const s = 0.04 + r2() * 0.16;
      const m = new THREE.Mesh(new THREE.DodecahedronGeometry(s, 0), rubbleMat);
      m.position.set((r2() - 0.5) * 44, s * 0.4, (r2() - 0.5) * 40);
      m.rotation.set(r2() * 3, r2() * 3, r2() * 3);
      m.castShadow = false;
      m.receiveShadow = true;
      this.scene.add(m);
    }

    // old blood pools
    const bloodTex = bloodSplat();
    const bloodMat = this.mat({ map: bloodTex, transparent: true, roughness: 0.42, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 });
    for (const [x, z, s, rot] of [[-4.5, -2, 2.8, 0.4], [7, 3.5, 1.9, 1.2], [-9, 7, 2.2, 2.4]]) {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(s, s), bloodMat);
      m.rotation.x = -Math.PI / 2;
      m.rotation.z = rot;
      m.position.set(x, 0.016, z);
      m.renderOrder = 3;
      this.scene.add(m);
    }
  }

  _buildPerimeter() {
    const c = concrete();
    c.map.repeat.set(3, 1);
    c.roughnessMap.repeat.set(3, 1);
    c.normalMap.repeat.set(3, 1);
    const wallMat = this.mat({
      map: c.map, normalMap: c.normalMap, roughnessMap: c.roughnessMap,
      color: 0x8f9698, normalScale: new THREE.Vector2(0.7, 0.7), roughness: 1, metalness: 0.05,
    });

    const addWall = (w, h, d, x, y, z, rot = 0) => {
      const m = box(w, h, d, wallMat, x, y, z);
      m.rotation.y = rot;
      this.scene.add(m);
      const halfW = Math.abs(Math.cos(rot)) * w / 2 + Math.abs(Math.sin(rot)) * d / 2;
      const halfD = Math.abs(Math.sin(rot)) * w / 2 + Math.abs(Math.cos(rot)) * d / 2;
      this.addCollider(x - halfW, x + halfW, z - halfD, z + halfD, 'wall', 0, h);
      return m;
    };

    addWall(56, 5.5, 0.7, 0, 2.75, -22.5);
    addWall(56, 4.5, 0.7, 0, 2.25, 22.5);
    addWall(0.7, 5, 45, -23.5, 2.5, 0);
    addWall(0.7, 5, 45, 23.5, 2.5, 0);

    // top ledge / barbed wire silhouette
    const wireMat = this.mat({ color: 0x1a1d1e, roughness: 0.8, metalness: 0.7 });
    for (let i = -26; i <= 26; i += 2) {
      const m = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.7, 4), wireMat);
      m.position.set(i, 5.75, -22.2);
      m.rotation.z = (i % 4 === 0 ? 0.5 : -0.5);
      this.scene.add(m);
    }

    // Building facades
    const facade = new THREE.Group();
    const b1 = box(17, 13, 6, wallMat, -14, 6.5, -20);
    const b2 = box(12, 10, 6, wallMat, 17, 5, -20);
    this.scene.add(b1, b2);
    this.addCollider(-22.5, -5.5, -23, -17);
    this.addCollider(11, 23, -23, -17);

    // windows (some lit, most dead)
    const winMat = this.mat({ color: 0x080b0d, roughness: 0.22, metalness: 0.45, envMapIntensity: 1.4 });
    const litMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(0xffa04a).multiplyScalar(1.5) });
    const litMat2 = new THREE.MeshBasicMaterial({ color: new THREE.Color(0x7fb7c4).multiplyScalar(0.8) });
    for (let fx = 0; fx < 5; fx++) {
      for (let fy = 0; fy < 4; fy++) {
        const lit = (fx === 3 && fy === 2) || (fx === 1 && fy === 1);
        const m = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 2.0), lit ? (fx === 3 ? litMat : litMat2) : winMat);
        m.position.set(-19.5 + fx * 2.7, 2.4 + fy * 2.8, -16.95);
        this.scene.add(m);
        if (!lit) {
          const frame = box(1.7, 2.2, 0.08, this.mat({ color: 0x2a2d2c, roughness: 0.8, metalness: 0.4 }), m.position.x, m.position.y, -17.02);
          this.scene.add(frame);
        }
      }
    }
    for (let fx = 0; fx < 3; fx++) {
      for (let fy = 0; fy < 3; fy++) {
        const m = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 1.8), winMat);
        m.position.set(13.5 + fx * 2.4, 2.3 + fy * 2.7, -16.95);
        this.scene.add(m);
      }
    }

    // pipes and AC units on facade
    const pipeMat = this.mat({ color: 0x3c4142, roughness: 0.55, metalness: 0.75 });
    for (let i = 0; i < 3; i++) {
      const p = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 11, 8), pipeMat);
      p.position.set(-21.5 + i * 0.4, 6, -16.8);
      p.castShadow = true;
      this.scene.add(p);
    }
    for (const [x, y] of [[-10, 9.4], [-12, 6.5], [18, 7.2]]) {
      const ac = rounded(1.5, 1.0, 0.7, 0.06, this.mat({ color: 0x545b5c, roughness: 0.7, metalness: 0.4 }), x, y, -16.9);
      this.scene.add(ac);
      const fan = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.05, 18), this.mat({ color: 0x1a1d1e, roughness: 0.6, metalness: 0.5 }));
      fan.rotation.x = Math.PI / 2;
      fan.position.set(x, y, -16.53);
      this.scene.add(fan);
    }

    // Fence sections and gate
    const fenceTex = chainlink();
    const fenceMat = new THREE.MeshStandardMaterial({
      map: fenceTex, transparent: true, alphaTest: 0.35, side: THREE.DoubleSide,
      roughness: 0.5, metalness: 0.6, color: 0x9aa2a0, envMapIntensity: 0.7,
    });
    for (const [x, z, w, rot] of [[-10.5, -22.1, 7, 0], [10.5, -22.1, 7, 0], [-23.1, 12, 9, Math.PI / 2], [23.1, 12, 9, Math.PI / 2]]) {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, 2.8), fenceMat);
      m.position.set(x, 3.9, z);
      m.rotation.y = rot;
      this.scene.add(m);
      const bar = box(w, 0.08, 0.08, pipeMat, x, 5.3, z);
      bar.rotation.y = rot;
      this.scene.add(bar);
      const bar2 = box(w, 0.08, 0.08, pipeMat, x, 2.5, z);
      bar2.rotation.y = rot;
      this.scene.add(bar2);
    }

    // Gate frame
    const gate = new THREE.Group();
    const gp = this.mat({ color: 0x313635, roughness: 0.6, metalness: 0.7 });
    const gp1 = box(0.28, 5, 0.28, gp, -3.4, 2.5, -21.8);
    const gp2 = box(0.28, 5, 0.28, gp, 3.4, 2.5, -21.8);
    this.scene.add(gp1, gp2);
    const top = box(7.1, 0.28, 0.28, gp, 0, 5.0, -21.8);
    this.scene.add(top);
    const gateMesh = new THREE.Mesh(new THREE.PlaneGeometry(6.6, 2.5), fenceMat);
    gateMesh.position.set(0, 3.55, -21.8);
    gateMesh.rotation.y = 0.18;
    this.scene.add(gateMesh);
    this.addCollider(-3.6, 3.6, -22.1, -21.5);

    // signs
    const qSign = signTexture(['QUARANTINE', 'ZONE 07'], { accent: '#e0c84a', sub: 'AUTHORIZED PERSONNEL ONLY' });
    const q = new THREE.Mesh(new THREE.PlaneGeometry(5.4, 2.7), new THREE.MeshStandardMaterial({
      map: qSign, roughness: 0.6, metalness: 0.2, emissive: 0x2a2410, emissiveMap: qSign, emissiveIntensity: 0.6,
    }));
    q.position.set(0, 7.0, -22.05);
    this.scene.add(q);

    const dzSign = signTexture(['DEAD', 'ZONE'], { accent: '#c73a32', sub: 'TURN BACK' });
    const dz = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 1.7), new THREE.MeshStandardMaterial({
      map: dzSign, roughness: 0.65, metalness: 0.25, emissive: 0x1a0806, emissiveMap: dzSign, emissiveIntensity: 0.5,
    }));
    dz.position.set(-18.5, 3.8, -22.05);
    this.scene.add(dz);

    // graffiti on right wall
    const graffiti = signTexture(['NO', 'EXIT'], { accent: '#8f2a25', bg: '#0d1012', border: false });
    const g = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 1.6), new THREE.MeshBasicMaterial({ map: graffiti, transparent: true, opacity: 0.5 }));
    g.position.set(23.1, 2.4, 7);
    g.rotation.y = -Math.PI / 2;
    this.scene.add(g);
  }

  _buildProps() {
    const rust = rustMetal();
    const metalMat = this.mat({ map: rust.map, normalMap: rust.normalMap, roughnessMap: rust.roughnessMap, color: 0x8b8f8c, metalness: 0.6, roughness: 1, normalScale: new THREE.Vector2(0.8, 0.8) });
    const darkMetal = this.mat({ color: 0x24282a, metalness: 0.8, roughness: 0.42 });
    const woodTex = wood();
    const woodMat = this.mat({ map: woodTex.map, normalMap: woodTex.normalMap, roughnessMap: woodTex.roughnessMap, color: 0x9c8a68, roughness: 1, metalness: 0.02 });

    // --- shipping containers ---
    const makeContainer = (x, z, rot, hue, y = 1.3) => {
      const g = new THREE.Group();
      const side = containerSide(hue);
      side.map.repeat.set(3, 1); side.normalMap.repeat.set(3, 1); side.roughnessMap.repeat.set(3, 1);
      const sideMat = this.mat({ map: side.map, normalMap: side.normalMap, roughnessMap: side.roughnessMap, color: 0xb0b4b0, metalness: 0.55, roughness: 1, normalScale: new THREE.Vector2(1.2, 1.2) });
      const body = box(6.0, 2.55, 2.45, sideMat, 0, 0, 0);
      g.add(body);
      const trim = this.mat({ color: 0x22282a, metalness: 0.7, roughness: 0.45 });
      for (const sx of [-3.02, 3.02]) g.add(box(0.12, 2.62, 2.52, trim, sx, 0, 0));
      for (const sz of [-1.25, 1.25]) g.add(box(6.05, 0.14, 0.1, trim, 0, 1.27, sz));
      // doors on the +x end
      for (const dz of [-0.6, 0.6]) {
        g.add(box(0.08, 2.25, 1.08, sideMat, 3.06, 0, dz));
        for (const by of [-0.85, 0.85]) {
          const bar = box(0.09, 1.9, 0.09, trim, 3.12, 0, dz + by * 0.2);
          g.add(bar);
        }
      }
      g.position.set(x, y, z);
      g.rotation.y = rot;
      this.scene.add(g);
      this.meshCollider(g, 0.05, 'container');
      return g;
    };
    const c1 = makeContainer(11.5, -11.5, -0.16, 'teal');
    makeContainer(-12.5, -9.5, 0.28, 'red');
    const c2 = makeContainer(12.2, -11.0, -0.16, 'blue', 3.9);
    c2.scale.set(0.94, 0.94, 0.94);

    // container stencil
    const stencil = signTexture(['CARGO 07', 'MIL-SPEC'], { accent: '#b9c0b8', bg: '#1b2524', border: false });
    const st = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.2), new THREE.MeshBasicMaterial({ map: stencil, transparent: true, opacity: 0.4 }));
    st.position.set(11.5, 1.5, -10.24);
    st.rotation.y = -0.16;
    this.scene.add(st);

    // --- crates ---
    const crate = (x, z, s = 1, rot = 0, stack = 1) => {
      for (let i = 0; i < stack; i++) {
        const m = rounded(s, s * 0.82, s, 0.03, woodMat, x, s * 0.42 + i * s * 0.84, z);
        m.rotation.y = rot + (i * 0.08);
        this.scene.add(m);
        // edge braces
        const edgeMat = this.mat({ color: 0x3a3327, roughness: 0.85 });
        for (const ex of [-s / 2 + 0.03, s / 2 - 0.03]) {
          const b = box(0.05, s * 0.84, 0.06, edgeMat, x + ex * Math.cos(rot), s * 0.42 + i * s * 0.84, z - ex * Math.sin(rot));
          this.scene.add(b);
        }
      }
      this.addCollider(x - s * 0.62, x + s * 0.62, z - s * 0.62, z + s * 0.62, 'crate');
    };
    crate(-5.8, 4.6, 1.15, 0.3, 2);
    crate(-4.4, 5.6, 0.9, -0.2, 1);
    crate(8.6, 9.2, 1.2, 0.5, 2);
    crate(9.8, 10.2, 0.85, 0.1, 1);
    crate(-14.6, 11.8, 1.0, -0.4, 1);

    // --- barrels ---
    const barrelMat = this.mat({ map: rust.map, normalMap: rust.normalMap, roughnessMap: rust.roughnessMap, color: 0x7e5a33, metalness: 0.55, roughness: 0.95 });
    const barrel = (x, z, rot = 0, tipped = false) => {
      const g = new THREE.Group();
      const b = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.94, 18, 1), barrelMat);
      b.castShadow = b.receiveShadow = true;
      g.add(b);
      for (const y of [-0.31, 0.31]) {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.325, 0.028, 6, 18), darkMetal);
        ring.rotation.x = Math.PI / 2;
        ring.position.y = y;
        g.add(ring);
      }
      const stripe = new THREE.Mesh(new THREE.CylinderGeometry(0.325, 0.325, 0.12, 18, 1, true), new THREE.MeshBasicMaterial({ color: 0x9a7d20, side: THREE.DoubleSide }));
      stripe.position.y = 0.1;
      g.add(stripe);
      if (tipped) { g.rotation.z = Math.PI / 2; g.position.set(x, 0.34, z); }
      else g.position.set(x, 0.48, z);
      g.rotation.y = rot;
      this.scene.add(g);
      this.addCollider(x - 0.4, x + 0.4, z - 0.4, z + 0.4, 'barrel');
    };
    barrel(-6.7, 7.2, 0.2);
    barrel(-7.4, 7.9, 1.2);
    barrel(7.4, -2.5, 0.4, true);
    barrel(15.2, 3.2, 0.1);
    barrel(-17.4, -2.2, 2.1);
    barrel(4.6, 15.4, 0.9, true);

    // --- jersey barriers ---
    const shape = new THREE.Shape();
    shape.moveTo(-0.42, 0); shape.lineTo(0.42, 0); shape.lineTo(0.28, 0.28); shape.lineTo(0.18, 1.0); shape.lineTo(-0.18, 1.0); shape.lineTo(-0.28, 0.28); shape.closePath();
    const barrierGeo = new THREE.ExtrudeGeometry(shape, { depth: 2.6, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 1 });
    barrierGeo.translate(0, 0, -1.3);
    const barrierMat = this.mat({ map: concrete().map, color: 0x8e918c, roughness: 0.92 });
    const barrier = (x, z, rot = 0) => {
      const m = new THREE.Mesh(barrierGeo, barrierMat);
      m.position.set(x, 0, z);
      m.rotation.y = rot;
      m.castShadow = m.receiveShadow = true;
      this.scene.add(m);
      const hw = Math.abs(Math.cos(rot)) * 1.32 + Math.abs(Math.sin(rot)) * 0.45;
      const hd = Math.abs(Math.sin(rot)) * 1.32 + Math.abs(Math.cos(rot)) * 0.45;
      this.addCollider(x - hw, x + hw, z - hd, z + hd, 'barrier');
    };
    barrier(-2.8, 2.0, Math.PI / 2);
    barrier(3.2, -2.0, Math.PI / 2);
    barrier(-12.8, 6.0, 0.35);
    barrier(15.5, -5.2, -0.4);
    barrier(-17.2, 14.5, 0.1);

    // hazard stripes on barriers
    const hzTex = hazardStripe();
    hzTex.repeat.set(3, 1);
    const hzMat = this.mat({ map: hzTex, roughness: 0.8, transparent: true, opacity: 0.75 });
    for (const [x, z, rot] of [[-2.8, 2.0, Math.PI / 2], [3.2, -2.0, Math.PI / 2]]) {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 0.22), hzMat);
      m.position.set(x + Math.cos(rot) * 0.42, 0.62, z - Math.sin(rot) * 0.42);
      m.rotation.y = rot + Math.PI / 2;
      this.scene.add(m);
    }

    // --- abandoned car ---
    this._buildCar(5.2, 3.0, -0.42);

    // --- sandbags ---
    const sandMat = this.mat({ color: 0x8b7d5e, roughness: 0.98, metalness: 0.02 });
    const sandbag = (x, y, z, rot) => {
      const m = new THREE.Mesh(new THREE.CapsuleGeometry(0.19, 0.44, 4, 8), sandMat);
      m.rotation.z = Math.PI / 2;
      m.rotation.y = rot;
      m.position.set(x, y, z);
      m.scale.set(1.05, 1, 0.78);
      m.castShadow = m.receiveShadow = true;
      this.scene.add(m);
    };
    for (let row = 0; row < 3; row++) {
      for (let i = 0; i < 5 - row; i++) {
        sandbag(-0.4 + i * 0.46 + row * 0.22, 0.2 + row * 0.3, 7.7 + (row % 2) * 0.05, 0.1 * i);
      }
    }
    this.addCollider(-0.8, 2.0, 7.4, 8.1, 'sandbags');

    // --- traffic cones ---
    const coneMat = this.mat({ color: 0xc25a1e, roughness: 0.7, metalness: 0.1 });
    const coneStripe = new THREE.MeshBasicMaterial({ color: 0xd8d3c2 });
    for (const [x, z] of [[-3.8, -1.2], [6.4, -7.4], [13.2, 11.2], [-9.4, -4.2]]) {
      const g = new THREE.Group();
      const c = new THREE.Mesh(new THREE.ConeGeometry(0.17, 0.62, 12), coneMat);
      c.position.y = 0.36; c.castShadow = true;
      g.add(c);
      const s = new THREE.Mesh(new THREE.CylinderGeometry(0.125, 0.145, 0.1, 12, 1, true), coneStripe);
      s.position.y = 0.36;
      g.add(s);
      const base = box(0.42, 0.05, 0.42, this.mat({ color: 0x1a1c1c, roughness: 0.9 }), 0, 0.025, 0);
      g.add(base);
      g.position.set(x, 0, z);
      g.rotation.y = Math.random() * 3;
      this.scene.add(g);
    }

    // --- tires ---
    const tireMat = this.mat({ color: 0x121414, roughness: 0.95 });
    for (const [x, z, r] of [[-8.6, 2.4, 0.4], [-8.1, 3.1, 0.2], [12.8, -2.1, 1.2]]) {
      const t = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.16, 8, 18), tireMat);
      t.rotation.x = Math.PI / 2;
      t.rotation.z = r;
      t.position.set(x, 0.17, z);
      t.castShadow = true;
      this.scene.add(t);
    }

    // --- papers / debris ---
    const paperMat = this.mat({ color: 0xb8b2a0, roughness: 0.95, side: THREE.DoubleSide });
    const pr = rng(21);
    for (let i = 0; i < 34; i++) {
      const p = new THREE.Mesh(new THREE.PlaneGeometry(0.18 + pr() * 0.14, 0.24 + pr() * 0.12), paperMat);
      p.rotation.x = -Math.PI / 2 + (pr() - 0.5) * 0.2;
      p.rotation.z = pr() * 3;
      p.position.set((pr() - 0.5) * 36, 0.018, (pr() - 0.5) * 34);
      this.scene.add(p);
    }

    // --- warning tape ---
    const tapeMat = this.mat({ map: hazardStripe(), roughness: 0.85, side: THREE.DoubleSide });
    const tape = new THREE.Mesh(new THREE.PlaneGeometry(8.5, 0.12), tapeMat);
    tape.position.set(0, 0.72, 6.6);
    tape.rotation.z = 0.03;
    this.scene.add(tape);

    // --- street lights ---
    this._buildLamp(-9.5, -5.5, 1, 0xffb15c, true);
    this._buildLamp(10.5, 6.5, -1, 0xffc078, false);
    this._buildLamp(0.5, -17.5, 0, 0xff8a3c, false);

    // --- red emergency flare ---
    const flare = new THREE.Group();
    const flareBase = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 0.3, 10), darkMetal);
    flareBase.position.y = 0.15;
    flare.add(flareBase);
    const flareLight = new THREE.PointLight(0xff321c, 9, 12, 2);
    flareLight.position.set(12.6, 0.45, -4.6);
    this.scene.add(flareLight);
    this.flickerLights.push({ light: flareLight, base: 9, speed: 13, seed: 2 });
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: softParticle('255,70,30'), color: 0xff3a1c, blending: THREE.AdditiveBlending,
      transparent: true, opacity: 0.8, depthWrite: false,
    }));
    glow.scale.set(1.5, 1.5, 1);
    glow.position.set(12.6, 0.4, -4.6);
    this.scene.add(glow);
    this.flareGlow = glow;

    // --- cables ---
    const cableMat = this.mat({ color: 0x0d0f10, roughness: 0.8 });
    const cablePts = [
      [new V3(-9.5, 4.1, -5.5), new V3(0, 3.3, -3), new V3(10.5, 4.1, 6.5)],
      [new V3(-9.5, 4.2, -5.5), new V3(-15, 3.1, -14), new V3(-23, 4.2, -18)],
    ];
    for (const pts of cablePts) {
      const curve = new THREE.CatmullRomCurve3(pts);
      const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, 0.018, 4, false), cableMat);
      this.scene.add(tube);
    }

    // --- bullet holes on walls / barriers ---
    const bhTex = bulletHole();
    const bhMat = this.mat({ map: bhTex, transparent: true, roughness: 0.8, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -3 });
    const br = rng(6);
    for (let i = 0; i < 18; i++) {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(0.24, 0.24), bhMat);
      const side = i % 3;
      if (side === 0) { m.position.set(-4 + br() * 20, 1.2 + br() * 2.5, -22.08); }
      else if (side === 1) { m.position.set(23.08, 1.2 + br() * 2.4, -10 + br() * 22); m.rotation.y = -Math.PI / 2; }
      else { m.position.set(-23.08, 1.3 + br() * 2.2, -12 + br() * 22); m.rotation.y = Math.PI / 2; }
      this.scene.add(m);
    }
  }

  _buildCar(x, z, rot) {
    const g = new THREE.Group();
    const bodyMat = this.phys({ color: 0x1d2a33, metalness: 0.75, roughness: 0.38, clearcoat: 0.5, clearcoatRoughness: 0.4 });
    const glassMat = this.phys({ color: 0x05090c, metalness: 0.4, roughness: 0.08, transparent: true, opacity: 0.72, envMapIntensity: 2 });
    const trimMat = this.mat({ color: 0x0d1011, roughness: 0.55, metalness: 0.6 });
    const rustMat = this.mat({ color: 0x6b3f24, roughness: 0.9, metalness: 0.2 });

    const chassis = rounded(4.1, 0.72, 1.86, 0.12, bodyMat, 0, 0.78, 0);
    g.add(chassis);
    const hood = rounded(1.35, 0.36, 1.78, 0.1, bodyMat, 1.45, 1.06, 0);
    g.add(hood);
    const trunk = rounded(1.1, 0.4, 1.78, 0.1, bodyMat, -1.55, 1.07, 0);
    g.add(trunk);
    const cabin = rounded(2.05, 0.86, 1.7, 0.14, bodyMat, -0.1, 1.48, 0);
    g.add(cabin);
    const roof = rounded(1.8, 0.1, 1.58, 0.05, bodyMat, -0.12, 1.93, 0);
    g.add(roof);
    // windows
    const w1 = new THREE.Mesh(new THREE.PlaneGeometry(1.65, 0.62), glassMat);
    w1.position.set(-0.1, 1.52, 0.86); g.add(w1);
    const w2 = w1.clone(); w2.rotation.y = Math.PI; w2.position.z = -0.86; g.add(w2);
    const w3 = new THREE.Mesh(new THREE.PlaneGeometry(1.55, 0.6), glassMat);
    w3.position.set(0.95, 1.52, 0); w3.rotation.y = Math.PI / 2; g.add(w3);
    const w4 = w3.clone(); w4.rotation.y = -Math.PI / 2; w4.position.x = -1.15; g.add(w4);
    // windshield cracks
    const crackMat = new THREE.MeshBasicMaterial({ color: 0x9fb6c0, transparent: true, opacity: 0.18 });
    for (let i = 0; i < 5; i++) {
      const c = new THREE.Mesh(new THREE.PlaneGeometry(0.02, 0.4 + Math.random() * 0.3), crackMat);
      c.position.set(0.96, 1.52, (Math.random() - 0.5) * 0.5);
      c.rotation.y = Math.PI / 2;
      c.rotation.x = Math.random() * 1.4;
      g.add(c);
    }
    // wheels
    for (const wx of [-1.35, 1.35]) {
      for (const wz of [-0.92, 0.92]) {
        const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.28, 18), this.mat({ color: 0x0c0d0d, roughness: 0.95 }));
        tire.rotation.x = Math.PI / 2;
        tire.position.set(wx, 0.42, wz);
        tire.castShadow = true;
        g.add(tire);
        const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.3, 12), this.mat({ color: 0x5b6061, metalness: 0.9, roughness: 0.35 }));
        rim.rotation.x = Math.PI / 2;
        rim.position.set(wx, 0.42, wz);
        g.add(rim);
      }
    }
    // lights
    for (const lz of [-0.58, 0.58]) {
      const housing = box(0.1, 0.22, 0.34, trimMat, 2.05, 0.92, lz);
      g.add(housing);
      if (lz > 0) {
        const lens = new THREE.Mesh(new THREE.PlaneGeometry(0.26, 0.16), new THREE.MeshBasicMaterial({ color: new THREE.Color(0xffc07a).multiplyScalar(0.4) }));
        lens.position.set(2.11, 0.92, lz);
        lens.rotation.y = Math.PI / 2;
        g.add(lens);
      }
    }
    // grille
    g.add(box(0.08, 0.25, 1.3, trimMat, 2.06, 0.72, 0));
    // rust patches
    for (const [rx, ry, rz, s] of [[1.9, 0.7, 0.9, 0.4], [-1.9, 0.65, -0.8, 0.55], [0.3, 0.5, 0.93, 0.35]]) {
      const p = new THREE.Mesh(new THREE.PlaneGeometry(s, s * 0.6), rustMat);
      p.position.set(rx, ry, rz);
      if (rz > 0) p.rotation.y = 0;
      g.add(p);
    }
    g.position.set(x, 0, z);
    g.rotation.y = rot;
    this.scene.add(g);
    this.meshCollider(g, 0.1, 'car');
    this.car = g;
  }

  _buildLamp(x, z, dir, color, shadow) {
    const g = new THREE.Group();
    const metal = this.mat({ color: 0x2b3032, metalness: 0.8, roughness: 0.42 });
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.11, 4.2, 10), metal);
    pole.position.y = 2.1;
    pole.castShadow = true;
    g.add(pole);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.08, 0.08), metal);
    arm.position.set(dir * 0.62, 4.15, 0);
    arm.rotation.z = dir * 0.18;
    g.add(arm);
    const housing = rounded(0.62, 0.16, 0.3, 0.03, metal, dir * 1.28, 4.02, 0);
    g.add(housing);
    const lens = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.22), new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(2.4) }));
    lens.rotation.x = Math.PI / 2;
    lens.position.set(dir * 1.28, 3.93, 0);
    g.add(lens);
    g.position.set(x, 0, z);
    this.scene.add(g);

    const spot = new THREE.SpotLight(color, 62, 22, 0.64, 0.55, 2);
    spot.position.set(x + dir * 1.28, 3.9, z);
    spot.target.position.set(x + dir * 3.2, 0, z + 1.5);
    spot.castShadow = shadow;
    if (shadow) {
      spot.shadow.mapSize.set(1024, 1024);
      spot.shadow.camera.near = 0.5;
      spot.shadow.camera.far = 22;
      spot.shadow.bias = -0.0015;
      spot.shadow.normalBias = 0.03;
    }
    this.scene.add(spot, spot.target);
    this.flickerLights.push({ light: spot, base: 62, speed: 2.4 + Math.random() * 3, seed: Math.random() * 10 });

    // volumetric cone
    const coneMat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      uniforms: { uColor: { value: new THREE.Color(color) }, uOpacity: { value: shadow ? 0.055 : 0.04 } },
      vertexShader: /* glsl */`
        varying vec2 vUv; varying vec3 vPos;
        void main(){ vUv = uv; vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
      `,
      fragmentShader: /* glsl */`
        varying vec2 vUv; varying vec3 vPos; uniform vec3 uColor; uniform float uOpacity;
        void main(){
          float edge = smoothstep(0.0, 0.28, vUv.x) * smoothstep(1.0, 0.72, vUv.x);
          float fade = smoothstep(0.0, 0.18, vUv.y) * smoothstep(1.0, 0.55, vUv.y);
          gl_FragColor = vec4(uColor, edge * fade * uOpacity);
        }
      `,
    });
    const cone = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 3.0, 4.0, 24, 1, true), coneMat);
    cone.position.set(x + dir * 1.28, 2.0, z);
    cone.rotation.z = dir * 0.04;
    cone.renderOrder = 4;
    this.scene.add(cone);
    this.flickerLights[this.flickerLights.length - 1].cone = cone;
  }

  _buildLighting() {
    const hemi = new THREE.HemisphereLight(0x5a7d9c, 0x1b1712, 1.6);
    this.scene.add(hemi);
    const ambient = new THREE.AmbientLight(0x2c3a48, 0.45);
    this.scene.add(ambient);

    const moon = new THREE.DirectionalLight(0xb2cce8, 1.95);
    moon.position.set(-14, 20, 12);
    moon.castShadow = true;
    moon.shadow.mapSize.set(2048, 2048);
    moon.shadow.camera.near = 1;
    moon.shadow.camera.far = 60;
    moon.shadow.camera.left = -30;
    moon.shadow.camera.right = 30;
    moon.shadow.camera.top = 30;
    moon.shadow.camera.bottom = -30;
    moon.shadow.bias = -0.0006;
    moon.shadow.normalBias = 0.035;
    this.scene.add(moon);
    this.moon = moon;

    const fill = new THREE.DirectionalLight(0x507597, 0.9);
    fill.position.set(12, 8, -18);
    this.scene.add(fill);

    this.lightningLight = new THREE.DirectionalLight(0xc8ddff, 0);
    this.lightningLight.position.set(-8, 26, -20);
    this.scene.add(this.lightningLight);
  }

  _buildShowcaseLight() {
    const s = new THREE.SpotLight(0xff7b3a, 190, 18, 0.42, 0.65, 2);
    s.position.set(7.3, 3.8, 6.9);
    s.target.position.set(4.1, 1.1, 3.55);
    s.castShadow = false;
    this.scene.add(s, s.target);
    this.showcaseLight = s;
    const rim = new THREE.SpotLight(0x5b9fd8, 120, 18, 0.48, 0.8, 2);
    rim.position.set(0.4, 3.4, 1.0);
    rim.target.position.set(4.1, 1.3, 3.55);
    rim.castShadow = false;
    this.scene.add(rim, rim.target);
    this.showcaseRim = rim;
  }

  _buildRain() {
    const count = 1400;
    const positions = new Float32Array(count * 6);
    const speeds = new Float32Array(count);
    const r = rng(5);
    for (let i = 0; i < count; i++) {
      const x = (r() - 0.5) * 38;
      const z = (r() - 0.5) * 38;
      const y = r() * 18;
      const len = 0.25 + r() * 0.55;
      positions[i * 6] = x; positions[i * 6 + 1] = y; positions[i * 6 + 2] = z;
      positions[i * 6 + 3] = x + 0.04; positions[i * 6 + 4] = y - len; positions[i * 6 + 5] = z;
      speeds[i] = 9 + r() * 9;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.LineBasicMaterial({ color: 0x9ab8c8, transparent: true, opacity: 0.22, depthWrite: false, blending: THREE.AdditiveBlending });
    this.rain = new THREE.LineSegments(geo, mat);
    this.rain.frustumCulled = false;
    this.rainSpeeds = speeds;
    this.scene.add(this.rain);
  }

  _buildMist() {
    const tex = softParticle('150,165,170');
    for (let i = 0; i < 12; i++) {
      const m = new THREE.Sprite(new THREE.SpriteMaterial({
        map: tex, color: 0x8899a0, transparent: true, opacity: 0.045 + Math.random() * 0.035,
        depthWrite: false, blending: THREE.NormalBlending,
      }));
      const s = 10 + Math.random() * 14;
      m.scale.set(s, s * 0.35, 1);
      m.position.set((Math.random() - 0.5) * 44, 0.5 + Math.random() * 1.2, (Math.random() - 0.5) * 40);
      m.userData.drift = 0.05 + Math.random() * 0.12;
      m.userData.phase = Math.random() * 10;
      this.scene.add(m);
      this.mist.push(m);
    }
  }

  /* ------------------------------------------------------------------ */
  resolveCircle(pos, radius) {
    for (const c of this.colliders) {
      const cx = Math.max(c.minX, Math.min(pos.x, c.maxX));
      const cz = Math.max(c.minZ, Math.min(pos.z, c.maxZ));
      let dx = pos.x - cx, dz = pos.z - cz;
      let d2 = dx * dx + dz * dz;
      if (d2 < radius * radius) {
        if (d2 < 1e-8) {
          // inside: push toward nearest edge
          const left = Math.abs(pos.x - c.minX), right = Math.abs(c.maxX - pos.x);
          const back = Math.abs(pos.z - c.minZ), front = Math.abs(c.maxZ - pos.z);
          const m = Math.min(left, right, back, front);
          if (m === left) pos.x = c.minX - radius;
          else if (m === right) pos.x = c.maxX + radius;
          else if (m === back) pos.z = c.minZ - radius;
          else pos.z = c.maxZ + radius;
        } else {
          const d = Math.sqrt(d2);
          const push = (radius - d) / d;
          pos.x += dx * push;
          pos.z += dz * push;
        }
      }
    }
    pos.x = Math.max(-22.4, Math.min(22.4, pos.x));
    pos.z = Math.max(-21.4, Math.min(21.4, pos.z));
  }

  isBlocked(x, z, radius = 0.4) {
    for (const c of this.colliders) {
      const cx = Math.max(c.minX, Math.min(x, c.maxX));
      const cz = Math.max(c.minZ, Math.min(z, c.maxZ));
      const dx = x - cx, dz = z - cz;
      if (dx * dx + dz * dz < radius * radius) return true;
    }
    return false;
  }

  update(dt, camera) {
    this.time += dt;
    const t = this.time;

    if (this.rain) {
      const pos = this.rain.geometry.attributes.position;
      const arr = pos.array;
      const count = this.rainSpeeds.length;
      for (let i = 0; i < count; i++) {
        const i6 = i * 6;
        let y = arr[i6 + 1] - this.rainSpeeds[i] * dt;
        const len = arr[i6 + 1] - arr[i6 + 4];
        if (y < 0) {
          y = 15 + Math.random() * 4;
          const x = (Math.random() - 0.5) * 38;
          const z = (Math.random() - 0.5) * 38;
          arr[i6] = x; arr[i6 + 2] = z;
          arr[i6 + 3] = x + 0.04; arr[i6 + 5] = z;
        }
        arr[i6 + 1] = y;
        arr[i6 + 4] = y - len;
      }
      pos.needsUpdate = true;
      this.rain.position.set(camera.position.x, 0, camera.position.z);
    }

    for (const m of this.mist) {
      m.position.x += Math.sin(t * m.userData.drift + m.userData.phase) * dt * 0.4;
      m.position.z += Math.cos(t * m.userData.drift * 0.7 + m.userData.phase) * dt * 0.3;
      m.material.opacity = (0.04 + 0.025 * (0.5 + 0.5 * Math.sin(t * 0.3 + m.userData.phase)));
    }

    for (const f of this.flickerLights) {
      const n = Math.sin(t * f.speed + f.seed) * 0.5 + 0.5;
      const n2 = Math.sin(t * f.speed * 3.7 + f.seed * 2.1) * 0.5 + 0.5;
      let k = 0.82 + n * 0.22;
      if (n2 > 0.93) k *= 0.35;
      f.light.intensity = f.base * k;
      if (f.cone) f.cone.material.uniforms.uOpacity.value = (f.cone.material.uniforms.uOpacity.value * 0.9) + (0.045 * k * 0.1);
    }
    if (this.flareGlow) {
      const k = 0.72 + Math.sin(t * 11.3) * 0.16 + Math.sin(t * 27.7) * 0.08;
      this.flareGlow.material.opacity = 0.6 * k;
      this.flareGlow.scale.setScalar(1.2 + k * 0.5);
    }

    // lightning
    this._lightningTimer -= dt;
    if (this._lightningTimer <= 0 && this._lightningPhase <= 0) {
      this._lightningPhase = 0.62;
      this._lightningTimer = 16 + Math.random() * 22;
    }
    if (this._lightningPhase > 0) {
      this._lightningPhase -= dt;
      const p = 1 - this._lightningPhase / 0.62;
      const flash = Math.max(0, Math.sin(p * Math.PI * 2.4)) * Math.exp(-p * 5.5);
      this.lightningLight.intensity = flash * 5.5;
      this.flashOverlay = Math.max(this.flashOverlay, flash * 0.45);
    } else {
      this.lightningLight.intensity = 0;
    }
    this.flashOverlay *= Math.max(0, 1 - dt * 9);

    this.sky.material.uniforms.uTime.value = t;
    this.sky.position.copy(camera.position);
  }
}
