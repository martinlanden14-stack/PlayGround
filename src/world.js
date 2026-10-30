import * as THREE from 'three';
import { makeCanvasTexture, makeGrassTexture } from './track.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const SUN_DIR = new THREE.Vector3(0.75, 0.30, -0.58).normalize();

function softCircleTexture(size = 128, inner = 'rgba(255,255,255,1)', outer = 'rgba(255,255,255,0)') {
  return makeCanvasTexture(size, size, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    g.addColorStop(0, inner);
    g.addColorStop(0.35, 'rgba(255,255,255,0.6)');
    g.addColorStop(1, outer);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }, { repeat: false });
}

function cloudTexture() {
  return makeCanvasTexture(256, 128, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < 26; i++) {
      const x = w * (0.15 + Math.random() * 0.7);
      const y = h * (0.35 + Math.random() * 0.3);
      const r = 18 + Math.random() * 42;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, 'rgba(255,255,255,0.5)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
    }
  }, { repeat: false });
}

function windowTexture() {
  return makeCanvasTexture(64, 128, (ctx, w, h) => {
    ctx.fillStyle = '#0c1220';
    ctx.fillRect(0, 0, w, h);
    const cols = 6;
    const rows = 16;
    const cw = w / cols;
    const ch = h / rows;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const lit = Math.random() < 0.42;
        if (!lit) continue;
        const warm = Math.random();
        ctx.fillStyle = warm > 0.7 ? 'rgba(180,225,255,0.95)' : `rgba(255,${170 + Math.random() * 60},${90 + Math.random() * 60},0.95)`;
        ctx.fillRect(x * cw + 2, y * ch + 3, cw - 4, ch - 5);
      }
    }
  });
}

function crowdTexture() {
  return makeCanvasTexture(1024, 512, (ctx, w, h) => {
    const base = ctx.createLinearGradient(0, 0, 0, h);
    base.addColorStop(0, '#1c212d');
    base.addColorStop(1, '#10141d');
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, w, h);

    const rows = 9;
    const cols = 58;
    const cw = w / cols;
    const ch = h / rows;

    // Concrete aisles break up the seating into believable blocks.
    ctx.fillStyle = 'rgba(8,10,16,0.72)';
    for (let c = 0; c < cols; c += 14) ctx.fillRect(c * cw, 0, cw * 0.72, h);

    const shirts = ['#e8d8b8', '#d97a5a', '#7fb7c9', '#c9c3b8', '#b07c8e', '#8fae7a', '#9d93c4', '#e0a84e', '#5d7fb0'];
    const skins = ['#d9a77c', '#c98b5e', '#a86f4c', '#e8c09a', '#8a5a3c'];

    for (let row = 0; row < rows; row++) {
      ctx.fillStyle = row % 2 ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.08)';
      ctx.fillRect(0, row * ch, w, ch);
      ctx.fillStyle = 'rgba(5,7,12,0.5)';
      ctx.fillRect(0, row * ch + ch - 7, w, 7);

      for (let col = 0; col < cols; col++) {
        if (col % 14 < 1) continue;
        if (Math.random() < 0.1) continue;
        const px = col * cw + cw * (0.34 + Math.random() * 0.32);
        const py = row * ch + ch * (0.52 + Math.random() * 0.08);
        const rr = cw * (0.2 + Math.random() * 0.08);
        ctx.globalAlpha = 0.55 + Math.random() * 0.35;
        ctx.fillStyle = shirts[(Math.random() * shirts.length) | 0];
        ctx.beginPath();
        ctx.ellipse(px, py, rr * 1.12, rr * 1.28, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = skins[(Math.random() * skins.length) | 0];
        ctx.beginPath();
        ctx.arc(px, py - rr * 1.15, rr * 0.62, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;

    // A few trackside flags in the crowd.
    for (const [fx, color] of [[0.18, '#ff7a3c'], [0.57, '#7ee7ff'], [0.84, '#ffd166']]) {
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.8;
      ctx.fillRect(w * fx, h * 0.06, cw * 2.2, ch * 0.55);
      ctx.globalAlpha = 1;
    }

    const shade = ctx.createLinearGradient(0, 0, 0, h);
    shade.addColorStop(0, 'rgba(6,8,14,0.68)');
    shade.addColorStop(0.2, 'rgba(6,8,14,0)');
    shade.addColorStop(0.8, 'rgba(6,8,14,0)');
    shade.addColorStop(1, 'rgba(6,8,14,0.55)');
    ctx.fillStyle = shade;
    ctx.fillRect(0, 0, w, h);
  }, { repeat: false });
}

function grandstandBannerTexture() {
  return makeCanvasTexture(1024, 128, (ctx, w, h) => {
    ctx.fillStyle = '#10131d';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#ff7a3c';
    ctx.fillRect(0, 0, w, 9);
    ctx.fillRect(0, h - 9, w, 9);
    ctx.fillStyle = '#fff4e6';
    ctx.font = '900 54px Arial Black, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('APEX ENERGY', w / 2, h / 2 - 4);
    ctx.fillStyle = '#ff7a3c';
    ctx.font = '700 19px Arial, sans-serif';
    ctx.letterSpacing = '10px';
    ctx.fillText('OFFICIAL GRANDSTAND', w / 2, h / 2 + 36);
  }, { repeat: false });
}

function billboardTexture(title, sub, color) {
  return makeCanvasTexture(512, 256, (ctx, w, h) => {
    ctx.fillStyle = '#0b0f1c';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = color;
    ctx.lineWidth = 6;
    ctx.strokeRect(10, 10, w - 20, h - 20);
    ctx.fillStyle = color;
    ctx.font = '900 82px Arial Black, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(title, w / 2, h / 2 - 18);
    ctx.fillStyle = 'rgba(255,244,230,0.75)';
    ctx.font = '700 24px Arial, sans-serif';
    ctx.letterSpacing = '8px';
    ctx.fillText(sub, w / 2, h / 2 + 62);
    // speed stripes
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    for (let i = 0; i < 9; i++) ctx.fillRect(i * 60, 0, 12, h);
  }, { repeat: false });
}

export class World {
  constructor(scene, track) {
    this.scene = scene;
    this.track = track;
    this.time = 0;
    this.group = new THREE.Group();
    this.group.name = 'world';
    scene.add(this.group);

    scene.fog = new THREE.FogExp2(0x8a5f66, 0.00085);
    scene.background = new THREE.Color(0x8a5f66);

    this.buildSky();
    this.buildLights();
    this.buildGround();
    this.buildWater();
    this.buildMountains();
    this.buildCity();
    this.buildTrees();
    this.buildStreetLights();
    this.buildGrandstand();
    this.buildBillboards();
    this.buildClouds();
    this.buildIsland();
  }

  buildSky() {
    const geo = new THREE.SphereGeometry(3200, 32, 20);
    const mat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
      uniforms: {
        topColor: { value: new THREE.Color(0x101b3d) },
        midColor: { value: new THREE.Color(0x7a4a72) },
        horizonColor: { value: new THREE.Color(0xff9a5e) },
        sunColor: { value: new THREE.Color(0xffb066) },
        sunDir: { value: SUN_DIR.clone() }
      },
      vertexShader: `
        varying vec3 vDir;
        void main() {
          vDir = normalize(position);
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying vec3 vDir;
        uniform vec3 topColor;
        uniform vec3 midColor;
        uniform vec3 horizonColor;
        uniform vec3 sunColor;
        uniform vec3 sunDir;
        void main() {
          vec3 dir = normalize(vDir);
          float h = dir.y;
          vec3 col = mix(horizonColor, midColor, smoothstep(-0.02, 0.26, h));
          col = mix(col, topColor, smoothstep(0.18, 0.72, h));
          float sd = max(dot(dir, normalize(sunDir)), 0.0);
          col += sunColor * pow(sd, 1400.0) * 1.6;
          col += sunColor * pow(sd, 14.0) * 0.12;
          col += vec3(1.0, 0.45, 0.18) * pow(max(0.0, 1.0 - abs(h) * 5.0), 4.0) * 0.10;
          gl_FragColor = vec4(col, 1.0);
        }
      `
    });
    const sky = new THREE.Mesh(geo, mat);
    sky.frustumCulled = false;
    this.group.add(sky);
    this.sky = sky;

  }

  buildLights() {
    const hemi = new THREE.HemisphereLight(0xb6c8ff, 0x5a4433, 1.15);
    this.group.add(hemi);

    const sun = new THREE.DirectionalLight(0xffb173, 3.9);
    sun.position.copy(SUN_DIR).multiplyScalar(220);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -80;
    sun.shadow.camera.right = 80;
    sun.shadow.camera.top = 80;
    sun.shadow.camera.bottom = -80;
    sun.shadow.camera.near = 1;
    sun.shadow.camera.far = 620;
    sun.shadow.bias = -0.0004;
    sun.shadow.normalBias = 0.035;
    this.group.add(sun);
    this.group.add(sun.target);
    this.sun = sun;

    const rim = new THREE.DirectionalLight(0x7c9dff, 0.7);
    rim.position.set(-120, 90, 160);
    this.group.add(rim);
  }

  buildGround() {
    const tex = makeGrassTexture();
    tex.repeat.set(320, 320);
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(6000, 6000),
      new THREE.MeshStandardMaterial({ map: tex, color: 0xb5bd96, roughness: 1, metalness: 0 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    ground.position.y = -0.02;
    this.group.add(ground);
  }

  buildWater() {
    const center = new THREE.Vector3(25, 0, 10);
    this.waterCenter = center;

    const sand = new THREE.Mesh(
      new THREE.CircleGeometry(88, 64),
      new THREE.MeshStandardMaterial({ color: 0xd8c39a, roughness: 1 })
    );
    sand.rotation.x = -Math.PI / 2;
    sand.position.set(center.x, -0.22, center.z);
    sand.receiveShadow = true;
    this.group.add(sand);

    const mat = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        time: { value: 0 },
        deep: { value: new THREE.Color(0x0d3346) },
        shallow: { value: new THREE.Color(0x2c7f8f) },
        sunDir: { value: SUN_DIR.clone() }
      },
      vertexShader: `
        varying vec3 vWorld;
        void main() {
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vWorld = wp.xyz;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,
      fragmentShader: `
        varying vec3 vWorld;
        uniform float time;
        uniform vec3 deep;
        uniform vec3 shallow;
        uniform vec3 sunDir;
        void main() {
          float w1 = sin(vWorld.x * 0.22 + time * 0.9);
          float w2 = sin(vWorld.z * 0.31 - time * 1.15);
          float w3 = sin((vWorld.x + vWorld.z) * 0.11 + time * 0.6);
          vec3 n = normalize(vec3((w1 + w3) * 0.045, 1.0, (w2 - w3) * 0.045));
          vec3 viewDir = normalize(cameraPosition - vWorld);
          float fres = pow(1.0 - max(dot(viewDir, n), 0.0), 2.6);
          vec3 col = mix(deep, shallow, fres * 0.85 + 0.08);
          vec3 r = reflect(-viewDir, n);
          float spec = pow(max(dot(r, normalize(sunDir)), 0.0), 120.0);
          float sparkle = pow(max(dot(r, normalize(sunDir)), 0.0), 8.0);
          col += vec3(1.0, 0.62, 0.3) * spec * 2.2;
          col += vec3(1.0, 0.45, 0.2) * sparkle * 0.10;
          col += vec3(0.12, 0.2, 0.26) * (w1 * 0.5 + 0.5) * 0.18;
          gl_FragColor = vec4(col, 0.94);
        }
      `
    });
    const water = new THREE.Mesh(new THREE.CircleGeometry(80, 96), mat);
    water.rotation.x = -Math.PI / 2;
    water.position.set(center.x, -0.12, center.z);
    this.group.add(water);
    this.water = water;
  }

  buildIsland() {
    const c = this.waterCenter;
    const island = new THREE.Mesh(
      new THREE.CylinderGeometry(15, 17, 1.4, 20),
      new THREE.MeshStandardMaterial({ color: 0x6f7a4a, roughness: 1 })
    );
    island.position.set(c.x + 6, 0.25, c.z - 4);
    island.receiveShadow = true;
    this.group.add(island);

    const sandEdge = new THREE.Mesh(
      new THREE.CylinderGeometry(17, 18.5, 0.5, 20),
      new THREE.MeshStandardMaterial({ color: 0xd8c39a, roughness: 1 })
    );
    sandEdge.position.set(c.x + 6, -0.05, c.z - 4);
    this.group.add(sandEdge);

    // Palm trees on island
    const palm = (x, z, s) => {
      const g = new THREE.Group();
      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.18, 0.34, 5.2, 7),
        new THREE.MeshStandardMaterial({ color: 0x6b4a32, roughness: 1 })
      );
      trunk.position.y = 2.6;
      trunk.rotation.z = 0.09;
      trunk.castShadow = true;
      g.add(trunk);
      const leafMat = new THREE.MeshStandardMaterial({ color: 0x3f6b39, roughness: 0.9, side: THREE.DoubleSide });
      for (let i = 0; i < 8; i++) {
        const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.5, 3.4, 4, 1, true), leafMat);
        leaf.position.y = 5.1;
        leaf.rotation.z = Math.PI / 2.5;
        leaf.rotation.y = (i / 8) * Math.PI * 2;
        leaf.scale.set(0.5, 1, 1);
        g.add(leaf);
      }
      g.position.set(x, 0.9, z);
      g.scale.setScalar(s);
      this.group.add(g);
    };
    palm(c.x + 2, c.z - 2, 1.1);
    palm(c.x + 10, c.z - 7, 0.85);
    palm(c.x + 9, c.z + 4, 0.95);
  }

  buildMountains() {
    const mat1 = new THREE.MeshStandardMaterial({ color: 0x524766, roughness: 1, flatShading: true });
    const mat2 = new THREE.MeshStandardMaterial({ color: 0x3d3854, roughness: 1, flatShading: true });
    const snowMat = new THREE.MeshStandardMaterial({ color: 0x9c90aa, roughness: 1, flatShading: true });
    const hillMat = new THREE.MeshStandardMaterial({ color: 0x35422f, roughness: 1, flatShading: true });

    const rng = (seed) => {
      let s = seed;
      return () => {
        s = (s * 16807) % 2147483647;
        return (s - 1) / 2147483646;
      };
    };
    const rand = rng(7919);
    const buckets = new Map();
    const push = (geo, mat, x, y, z, rotY) => {
      const g = geo.toNonIndexed();
      const m4 = new THREE.Matrix4().makeRotationY(rotY);
      m4.setPosition(x, y, z);
      g.applyMatrix4(m4);
      if (!buckets.has(mat)) buckets.set(mat, []);
      buckets.get(mat).push(g);
    };

    for (let i = 0; i < 22; i++) {
      const a = (i / 22) * Math.PI * 2 + rand() * 0.16;
      const dist = 1050 + rand() * 650;
      const h = 150 + rand() * 330;
      const r = 130 + rand() * 240;
      const rotY = rand() * Math.PI;
      const x = Math.cos(a) * dist;
      const z = Math.sin(a) * dist;
      push(new THREE.ConeGeometry(r, h, 8, 2), i % 2 ? mat1 : mat2, x, h / 2 - 12, z, rotY);
      if (h > 330) push(new THREE.ConeGeometry(r * 0.3, h * 0.26, 8, 1), snowMat, x, h - h * 0.13 - 12, z, rotY);
    }

    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2 + 0.21;
      const dist = 620 + rand() * 180;
      const h = 40 + rand() * 90;
      const r = 90 + rand() * 120;
      push(new THREE.ConeGeometry(r, h, 7, 1), hillMat, Math.cos(a) * dist, h / 2 - 6, Math.sin(a) * dist, rand() * Math.PI);
    }

    for (const [mat, geos] of buckets) {
      const merged = mergeGeometries(geos, false);
      geos.forEach((g) => g.dispose());
      if (!merged) continue;
      this.group.add(new THREE.Mesh(merged, mat));
    }
  }


  buildCity() {
    const center = new THREE.Vector3(620, 0, -330);
    const win = windowTexture();
    const materials = [0, 1, 2].map((k) => {
      const t = win.clone();
      t.needsUpdate = true;
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(1.2, 1.2 + k * 1.6);
      return new THREE.MeshStandardMaterial({
        map: t,
        color: 0x4a5470,
        roughness: 0.62,
        metalness: 0.25,
        emissive: 0xffb066,
        emissiveMap: t,
        emissiveIntensity: 0.85
      });
    });
    const rng = (seed) => {
      let s = seed;
      return () => {
        s = (s * 48271) % 2147483647;
        return (s - 1) / 2147483646;
      };
    };
    const rand = rng(104729);
    const buckets = [[], [], []];
    for (let i = 0; i < 30; i++) {
      const a = rand() * Math.PI * 2;
      const r = Math.sqrt(rand()) * 210;
      const x = center.x + Math.cos(a) * r;
      const z = center.z + Math.sin(a) * r;
      const h = 26 + rand() * 120;
      const w = 18 + rand() * 26;
      const d = 18 + rand() * 26;
      const mi = h < 55 ? 0 : h < 100 ? 1 : 2;
      const geo = new THREE.BoxGeometry(w, h, d).toNonIndexed();
      const m4 = new THREE.Matrix4().makeRotationY(rand() * 0.5);
      m4.setPosition(x, h / 2, z);
      geo.applyMatrix4(m4);
      buckets[mi].push(geo);
    }
    buckets.forEach((geos, i) => {
      if (!geos.length) return;
      const merged = mergeGeometries(geos, false);
      geos.forEach((g) => g.dispose());
      if (!merged) return;
      const mesh = new THREE.Mesh(merged, materials[i]);
      this.group.add(mesh);
    });
  }


  buildTrees() {
    const rand = (() => {
      let s = 20241;
      return () => {
        s = (s * 16807) % 2147483647;
        return (s - 1) / 2147483646;
      };
    })();

    const count = 380;
    const trunkGeo = new THREE.CylinderGeometry(0.18, 0.32, 2.6, 6);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5a4130, roughness: 1 });
    const leafGeo = new THREE.ConeGeometry(1.75, 5.2, 7);
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x3c5b35, roughness: 0.95, flatShading: true });
    const trunks = new THREE.InstancedMesh(trunkGeo, trunkMat, count);
    const leaves = new THREE.InstancedMesh(leafGeo, leafMat, count);
    trunks.castShadow = true;
    leaves.castShadow = true;
    leaves.receiveShadow = true;

    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const pos = new THREE.Vector3();
    const scl = new THREE.Vector3();
    const color = new THREE.Color();
    let n = 0;
    let guard = 0;
    while (n < count && guard++ < 6000) {
      const a = rand() * Math.PI * 2;
      const r = 120 + Math.sqrt(rand()) * 400;
      const x = Math.cos(a) * r + 10;
      const z = Math.sin(a) * r + 10;
      if (this.track.isNearTrack(x, z, 23)) continue;
      if (Math.hypot(x - this.waterCenter.x, z - this.waterCenter.z) < 100) continue;
      if (Math.hypot(x - 620, z + 330) < 250) continue;
      if (Math.hypot(x + 210, z - 190) < 60) continue;
      const s = 0.7 + rand() * 1.15;
      pos.set(x, 1.3 * s, z);
      scl.setScalar(s);
      m.compose(pos, q, scl);
      trunks.setMatrixAt(n, m);
      pos.y = (2.4 + 2.6) * s;
      m.compose(pos, q, scl);
      leaves.setMatrixAt(n, m);
      color.setHSL(0.26 + rand() * 0.06, 0.28 + rand() * 0.18, 0.2 + rand() * 0.12);
      leaves.setColorAt(n, color);
      n++;
    }
    trunks.count = n;
    leaves.count = n;
    this.group.add(trunks, leaves);

    // Rocks
    const rockGeo = new THREE.DodecahedronGeometry(1, 0);
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x77706a, roughness: 1, flatShading: true });
    const rocks = new THREE.InstancedMesh(rockGeo, rockMat, 150);
    rocks.castShadow = true;
    rocks.receiveShadow = true;
    let rn = 0;
    guard = 0;
    while (rn < 150 && guard++ < 4000) {
      const a = rand() * Math.PI * 2;
      const r = 80 + Math.sqrt(rand()) * 700;
      const x = Math.cos(a) * r + 10;
      const z = Math.sin(a) * r + 10;
      if (this.track.isNearTrack(x, z, 19)) continue;
      if (Math.hypot(x - this.waterCenter.x, z - this.waterCenter.z) < 92) continue;
      const s = 0.35 + rand() * 1.5;
      pos.set(x, s * 0.35, z);
      q.setFromEuler(new THREE.Euler(rand() * 0.4, rand() * Math.PI, rand() * 0.4));
      scl.set(s, s * 0.7, s);
      m.compose(pos, q, scl);
      rocks.setMatrixAt(rn++, m);
    }
    rocks.count = rn;
    this.group.add(rocks);

    // Roadside bushes
    const bushGeo = new THREE.IcosahedronGeometry(1, 0);
    const bushMat = new THREE.MeshStandardMaterial({ color: 0x4b6238, roughness: 1, flatShading: true });
    const bushes = new THREE.InstancedMesh(bushGeo, bushMat, 240);
    bushes.castShadow = true;
    bushes.receiveShadow = true;
    let bn = 0;
    guard = 0;
    while (bn < 240 && guard++ < 4000) {
      const idx = (rand() * this.track.N) | 0;
      const f = this.track.frameAt(idx / this.track.N);
      const side = rand() > 0.5 ? 1 : -1;
      const off = this.track.barrierOffset + 2.5 + rand() * 26;
      const x = f.pos.x + f.side.x * off * side;
      const z = f.pos.z + f.side.z * off * side;
      if (Math.hypot(x - this.waterCenter.x, z - this.waterCenter.z) < 95) continue;
      if (Math.hypot(x - 620, z + 330) < 240) continue;
      const sc = 0.5 + rand() * 1.3;
      pos.set(x, sc * 0.55, z);
      q.setFromEuler(new THREE.Euler(0, rand() * Math.PI, 0));
      scl.set(sc, sc * 0.8, sc);
      m.compose(pos, q, scl);
      bushes.setMatrixAt(bn, m);
      color.setHSL(0.25 + rand() * 0.06, 0.3 + rand() * 0.16, 0.18 + rand() * 0.1);
      bushes.setColorAt(bn, color);
      bn++;
    }
    bushes.count = bn;
    this.group.add(bushes);
  }

  buildStreetLights() {
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x2c3240, roughness: 0.5, metalness: 0.7 });
    const lampMat = new THREE.MeshStandardMaterial({
      color: 0xffd9a0,
      emissive: 0xffb060,
      emissiveIntensity: 2.2,
      roughness: 0.4
    });
    const coneMat = new THREE.MeshBasicMaterial({
      color: 0xffb060,
      transparent: true,
      opacity: 0.045,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const poleGeo = new THREE.CylinderGeometry(0.1, 0.16, 6.2, 6);
    const armGeo = new THREE.BoxGeometry(1.5, 0.1, 0.1);
    const headGeo = new THREE.BoxGeometry(0.75, 0.16, 0.32);
    const coneGeo = new THREE.ConeGeometry(2.6, 6.0, 12, 1, true);
    const poleParts = [];
    const headParts = [];
    const coneParts = [];

    for (let i = 0; i < 26; i++) {
      const u = (i / 26) * 1.0;
      const f = this.track.frameAt(u);
      const s = i % 2 === 0 ? 1 : -1;
      const off = this.track.barrierOffset + 1.8;
      const x = f.pos.x + f.side.x * off * s;
      const z = f.pos.z + f.side.z * off * s;
      const yaw = Math.atan2(f.tangent.x, f.tangent.z);
      const base = new THREE.Matrix4().makeRotationY(yaw);
      base.setPosition(x, 0, z);

      const pole = poleGeo.toNonIndexed();
      pole.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 3.1, 0).premultiply(base));
      poleParts.push(pole);

      const arm = armGeo.toNonIndexed();
      arm.applyMatrix4(new THREE.Matrix4().makeTranslation(-s * 0.65, 6.15, 0).premultiply(base));
      poleParts.push(arm);

      const head = headGeo.toNonIndexed();
      head.applyMatrix4(new THREE.Matrix4().makeTranslation(-s * 1.3, 6.05, 0).premultiply(base));
      headParts.push(head);

      const cone = coneGeo.toNonIndexed();
      cone.applyMatrix4(new THREE.Matrix4().makeTranslation(-s * 1.3, 3.1, 0).premultiply(base));
      coneParts.push(cone);
    }

    const poleMesh = new THREE.Mesh(mergeGeometries(poleParts, false), poleMat);
    poleMesh.castShadow = true;
    this.group.add(poleMesh);
    this.group.add(new THREE.Mesh(mergeGeometries(headParts, false), lampMat));
    this.group.add(new THREE.Mesh(mergeGeometries(coneParts, false), coneMat));
    poleParts.forEach((g) => g.dispose());
    headParts.forEach((g) => g.dispose());
    coneParts.forEach((g) => g.dispose());
  }


  buildGrandstand() {
    const f = this.track.frameAt(0.035);
    const g = new THREE.Group();
    const off = this.track.barrierOffset + 26;
    g.position.copy(f.pos).addScaledVector(f.side, off);
    g.rotation.y = Math.atan2(f.tangent.x, f.tangent.z) + Math.PI / 2; // face the track

    const W = 36;
    const concrete = new THREE.MeshStandardMaterial({ color: 0x2b303d, roughness: 0.9, metalness: 0.1 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x161a24, roughness: 0.55, metalness: 0.5 });
    const steel = new THREE.MeshStandardMaterial({ color: 0x3a4150, roughness: 0.4, metalness: 0.8 });
    const orange = new THREE.MeshStandardMaterial({ color: 0xff7a3c, emissive: 0xff5a1e, emissiveIntensity: 0.7, roughness: 0.5 });

    // Plinth and front wall give the stand a solid, non-billboard silhouette.
    const plinth = new THREE.Mesh(new THREE.BoxGeometry(W, 1.6, 11), concrete);
    plinth.position.set(0, 0.8, -2.6);
    plinth.castShadow = true;
    plinth.receiveShadow = true;
    g.add(plinth);

    const wall = new THREE.Mesh(new THREE.BoxGeometry(W, 2.8, 0.7), concrete);
    wall.position.set(0, 1.4, 2.0);
    wall.castShadow = true;
    wall.receiveShadow = true;
    g.add(wall);

    const band = new THREE.Mesh(
      new THREE.PlaneGeometry(W - 1.2, 1.5),
      new THREE.MeshStandardMaterial({
        map: grandstandBannerTexture(),
        roughness: 0.6,
        metalness: 0.05,
        emissive: 0x3a2214,
        emissiveIntensity: 0.6
      })
    );
    band.position.set(0, 2.15, 2.37);
    g.add(band);

    // Raked seating: the crowd plane leans back away from the track.
    const rise = 6.4;
    const run = 7.6;
    const slope = Math.hypot(rise, run);
    const angle = Math.atan2(run, rise);
    const crowd = new THREE.Mesh(
      new THREE.PlaneGeometry(W - 1.4, slope),
      new THREE.MeshStandardMaterial({
        map: crowdTexture(),
        roughness: 0.92,
        metalness: 0.02,
        emissive: 0x2a1c14,
        emissiveIntensity: 0.5
      })
    );
    crowd.rotation.x = -angle;
    crowd.position.set(0, 2.8 + rise / 2, 1.65 - run / 2);
    crowd.receiveShadow = true;
    g.add(crowd);

    // Cantilevered roof, back posts and closed ends.
    const roof = new THREE.Mesh(new THREE.BoxGeometry(W + 2.5, 0.35, 12.5), dark);
    roof.position.set(0, 10.4, -3.3);
    roof.rotation.x = 0.045;
    roof.castShadow = true;
    g.add(roof);

    const lip = new THREE.Mesh(new THREE.BoxGeometry(W + 2.3, 0.12, 0.24), orange);
    lip.position.set(0, 10.18, 2.75);
    g.add(lip);

    for (const x of [-15, -5, 5, 15]) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.4, 10.2, 0.4), steel);
      post.position.set(x, 5.1, -8.8);
      post.castShadow = true;
      g.add(post);
    }
    for (const s of [-1, 1]) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.24, 10.2, 0.24), steel);
      post.position.set(s * (W / 2 - 0.9), 5.1, 2.2);
      post.castShadow = true;
      g.add(post);
    }
    const truss = new THREE.Mesh(new THREE.BoxGeometry(W + 2, 0.18, 0.18), steel);
    truss.position.set(0, 9.85, 2.7);
    g.add(truss);

    for (const s of [-1, 1]) {
      const side = new THREE.Mesh(new THREE.BoxGeometry(0.5, 8.4, 10.8), concrete);
      side.position.set(s * (W / 2 - 0.25), 4.2, -2.2);
      side.castShadow = true;
      side.receiveShadow = true;
      g.add(side);
    }

    const flagMat = new THREE.MeshStandardMaterial({ color: 0xff7a3c, roughness: 0.7, side: THREE.DoubleSide });
    for (const x of [-12, 12]) {
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 3.2, 6), steel);
      pole.position.set(x, 12.1, 0.6);
      g.add(pole);
      const flag = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.3), flagMat);
      flag.position.set(x + 1.2, 13.0, 0.6);
      g.add(flag);
    }

    this.group.add(g);
  }

  buildBillboards() {
    const defs = [
      { u: 0.075, side: 1, title: 'APEX', sub: 'FIND THE LINE', color: '#ff7a3c' },
      { u: 0.28, side: -1, title: 'NITRO', sub: 'HOLD SHIFT', color: '#7ee7ff' },
      { u: 0.52, side: 1, title: 'DRIFT', sub: 'FEEL THE SLIP', color: '#ffd166' },
      { u: 0.74, side: -1, title: 'SUNSET', sub: 'GOLDEN HOUR GP', color: '#ff5c8a' }
    ];
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x2a3040, roughness: 0.5, metalness: 0.6 });
    for (const d of defs) {
      const f = this.track.frameAt(d.u);
      const g = new THREE.Group();
      g.position.copy(f.pos).addScaledVector(f.side, (this.track.barrierOffset + 9) * d.side);
      g.rotation.y = Math.atan2(f.tangent.x, f.tangent.z);
      g.rotation.y += d.side > 0 ? Math.PI / 2 : -Math.PI / 2;

      const panel = new THREE.Mesh(
        new THREE.PlaneGeometry(9, 4.5),
        new THREE.MeshStandardMaterial({
          map: billboardTexture(d.title, d.sub, d.color),
          roughness: 0.7,
          metalness: 0.05,
          emissive: 0x3a2214,
          emissiveIntensity: 0.55,
          side: THREE.DoubleSide
        })
      );
      panel.position.set(0, 5.3, 0);
      panel.castShadow = true;
      g.add(panel);

      const frame = new THREE.Mesh(new THREE.BoxGeometry(9.5, 5, 0.3), poleMat);
      frame.position.set(0, 5.3, -0.18);
      g.add(frame);
      for (const x of [-3.2, 3.2]) {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 4.4, 6), poleMat);
        post.position.set(x, 2.2, -0.2);
        post.castShadow = true;
        g.add(post);
      }
      this.group.add(g);
    }
  }

  buildClouds() {
    const tex = cloudTexture();
    const rng = (() => {
      let s = 77813;
      return () => {
        s = (s * 16807) % 2147483647;
        return (s - 1) / 2147483646;
      };
    })();
    for (let i = 0; i < 18; i++) {
      const mat = new THREE.SpriteMaterial({
        map: tex,
        color: i % 3 === 0 ? 0xffb080 : 0xffe0cc,
        transparent: true,
        opacity: 0.16 + rng() * 0.18,
        depthWrite: false,
        fog: false
      });
      const sp = new THREE.Sprite(mat);
      const a = rng() * Math.PI * 2;
      const r = 550 + rng() * 1500;
      sp.position.set(Math.cos(a) * r, 200 + rng() * 260, Math.sin(a) * r);
      const s = 180 + rng() * 340;
      sp.scale.set(s, s * 0.42, 1);
      this.group.add(sp);
    }
  }

  update(time, dt, carPos, cameraPos) {
    this.time = time;
    this.water.material.uniforms.time.value = time;
    if (cameraPos) this.sky.position.copy(cameraPos);
    if (carPos) {
      this.sun.position.copy(carPos).addScaledVector(SUN_DIR, 210);
      this.sun.target.position.copy(carPos);
      this.sun.target.updateMatrixWorld();
    }
  }
}
