import * as THREE from 'three';
import { gridTexture, glowTexture } from './textures.js';

export const ARENA_RADIUS = 28;

const CRATE_DATA = [
  [-6, 4, 1.05],
  [5, -5, 1.0],
  [9, 7, 0.95],
  [-11, -6, 1.15],
  [0, -12, 1.05],
  [13, -3, 0.9],
  [-4, 13, 0.85],
  [-16, 10, 1.0],
];

const PILLAR_COUNT = 8;

/** Builds the arena and returns handles the game logic needs. */
export function buildWorld(scene) {
  const root = new THREE.Group();
  scene.add(root);

  const obstacles = []; // { x, z, r } solid circles for player collision
  const blockers = []; // meshes that stop bullets and line of sight
  const pulses = []; // emissive things that breathe

  scene.background = new THREE.Color(0x05060f);
  scene.fog = new THREE.FogExp2(0x06070f, 0.017);

  addSky(scene);
  addStars(scene);
  addLights(scene);

  /* ---------------- floor ---------------- */

  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x9fb7c9,
    map: gridTexture(),
    roughness: 0.72,
    metalness: 0.35,
    emissive: 0x061626,
    emissiveIntensity: 0.7,
  });
  const floor = new THREE.Mesh(new THREE.CircleGeometry(ARENA_RADIUS + 2.6, 96), floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0;
  root.add(floor);

  // glowing concentric guide rings
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x35f0ff,
    transparent: true,
    opacity: 0.18,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  [6.5, 13, 21].forEach((radius, i) => {
    const ring = new THREE.Mesh(new THREE.RingGeometry(radius, radius + 0.07, 128), ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.015 + i * 0.001;
    root.add(ring);
  });

  // center emblem
  const emblem = new THREE.Group();
  const eRing = new THREE.Mesh(
    new THREE.RingGeometry(1.6, 1.75, 6),
    new THREE.MeshBasicMaterial({ color: 0xff2d9b, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false })
  );
  eRing.rotation.x = -Math.PI / 2;
  emblem.add(eRing);
  const eRing2 = new THREE.Mesh(
    new THREE.RingGeometry(2.15, 2.2, 6),
    new THREE.MeshBasicMaterial({ color: 0x35f0ff, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false })
  );
  eRing2.rotation.x = -Math.PI / 2;
  emblem.add(eRing2);
  emblem.position.y = 0.02;
  root.add(emblem);
  pulses.push({ mesh: eRing, base: 0.35, speed: 0.8, amp: 0.14 });
  pulses.push({ mesh: eRing2, base: 0.22, speed: -0.5, amp: 0.1 });

  /* ---------------- perimeter wall ---------------- */

  const wallMat = new THREE.MeshStandardMaterial({
    color: 0x060b18,
    roughness: 0.85,
    metalness: 0.4,
    side: THREE.BackSide,
    transparent: true,
    opacity: 0.92,
  });
  const wall = new THREE.Mesh(new THREE.CylinderGeometry(ARENA_RADIUS + 2.2, ARENA_RADIUS + 2.2, 10, 72, 1, true), wallMat);
  wall.position.y = 5;
  root.add(wall);

  // flickering light strips embedded in the wall
  const stripGeo = new THREE.BoxGeometry(0.14, 4.6, 0.14);
  const stripMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.62, blending: THREE.AdditiveBlending, depthWrite: false });
  const stripCount = 36;
  const strips = new THREE.InstancedMesh(stripGeo, stripMat, stripCount);
  const dummy = new THREE.Object3D();
  const stripColors = [new THREE.Color(0x35f0ff), new THREE.Color(0xff2d9b), new THREE.Color(0x35f0ff)];
  for (let i = 0; i < stripCount; i++) {
    const a = (i / stripCount) * Math.PI * 2;
    dummy.position.set(Math.cos(a) * (ARENA_RADIUS + 2.05), 3.1 + (i % 3) * 0.35, Math.sin(a) * (ARENA_RADIUS + 2.05));
    dummy.rotation.set(0, -a, 0);
    dummy.updateMatrix();
    strips.setMatrixAt(i, dummy.matrix);
    strips.setColorAt(i, stripColors[i % stripColors.length]);
  }
  strips.instanceMatrix.needsUpdate = true;
  strips.instanceColor.needsUpdate = true;
  root.add(strips);

  // top and bottom rim glow
  [0.25, 9.6].forEach((y, i) => {
    const rim = new THREE.Mesh(
      new THREE.TorusGeometry(ARENA_RADIUS + 2.1, i === 0 ? 0.055 : 0.035, 6, 96),
      new THREE.MeshBasicMaterial({ color: i === 0 ? 0x35f0ff : 0xa45bff, transparent: true, opacity: i === 0 ? 0.4 : 0.28, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    rim.rotation.x = Math.PI / 2;
    rim.position.y = y;
    root.add(rim);
  });

  /* ---------------- pillars ---------------- */

  const pillarMat = new THREE.MeshStandardMaterial({ color: 0x131c2e, roughness: 0.5, metalness: 0.7 });
  const pillarGlowMat = new THREE.MeshBasicMaterial({ color: 0x35f0ff, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false });

  for (let i = 0; i < PILLAR_COUNT; i++) {
    const a = (i / PILLAR_COUNT) * Math.PI * 2 + Math.PI / 8;
    const x = Math.cos(a) * 25.2;
    const z = Math.sin(a) * 25.2;
    const h = 6.4;
    const pillar = new THREE.Mesh(new THREE.BoxGeometry(1.25, h, 1.25), pillarMat);
    pillar.position.set(x, h / 2, z);
    pillar.rotation.y = -a;
    root.add(pillar);
    blockers.push(pillar);
    obstacles.push({ x, z, r: 1.15 });

    const glow = new THREE.Mesh(new THREE.BoxGeometry(0.1, h * 0.78, 0.1), pillarGlowMat);
    glow.position.set(x - Math.cos(a) * 0.66, h * 0.5, z - Math.sin(a) * 0.66);
    root.add(glow);

    const cap = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.12, 1.5), pillarGlowMat);
    cap.position.set(x, h + 0.06, z);
    cap.rotation.y = -a;
    root.add(cap);
  }

  /* ---------------- crates ---------------- */

  const crateMat = new THREE.MeshStandardMaterial({ color: 0x121a2a, roughness: 0.6, metalness: 0.55 });
  const edgeMat = new THREE.LineBasicMaterial({ color: 0x35f0ff, transparent: true, opacity: 0.5 });
  const crateGeo = new THREE.BoxGeometry(1, 1, 1);
  const edgeGeo = new THREE.EdgesGeometry(crateGeo);

  CRATE_DATA.forEach(([x, z, r], i) => {
    const size = 1.55 + (i % 3) * 0.22;
    const h = 1.5 + (i % 2) * 0.35;
    const crate = new THREE.Mesh(crateGeo, crateMat);
    crate.scale.set(size, h, size);
    crate.position.set(x, h / 2, z);
    crate.rotation.y = (i * 0.7) % Math.PI;
    root.add(crate);
    blockers.push(crate);
    obstacles.push({ x, z, r: size * 0.72 });

    const edges = new THREE.LineSegments(edgeGeo, edgeMat);
    edges.scale.copy(crate.scale);
    edges.position.copy(crate.position);
    edges.rotation.copy(crate.rotation);
    root.add(edges);

    const stripe = new THREE.Mesh(
      new THREE.BoxGeometry(size * 0.62, 0.045, size * 1.005),
      new THREE.MeshBasicMaterial({ color: i % 2 ? 0xff2d9b : 0x35f0ff, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    stripe.position.set(x, h * 0.62, z);
    stripe.rotation.y = crate.rotation.y;
    root.add(stripe);
  });

  /* ---------------- low barriers ---------------- */

  const barrierData = [
    { x: -14.5, z: 2.5, rot: 0.62, len: 5.4 },
    { x: 10.5, z: 12.5, rot: -0.85, len: 4.6 },
    { x: 15, z: 16, rot: 0.25, len: 3.2 },
  ];

  barrierData.forEach((b) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(b.len, 1.2, 0.55), crateMat);
    mesh.position.set(b.x, 0.6, b.z);
    mesh.rotation.y = b.rot;
    root.add(mesh);
    blockers.push(mesh);

    const glow = new THREE.Mesh(
      new THREE.BoxGeometry(b.len * 0.96, 0.04, 0.6),
      new THREE.MeshBasicMaterial({ color: 0x35f0ff, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    glow.position.set(b.x, 1.2, b.z);
    glow.rotation.y = b.rot;
    root.add(glow);

    const steps = Math.ceil(b.len / 1.3);
    for (let s = 0; s < steps; s++) {
      const t = steps === 1 ? 0.5 : s / (steps - 1);
      const off = (t - 0.5) * (b.len - 1);
      obstacles.push({
        x: b.x + Math.cos(b.rot) * off,
        z: b.z - Math.sin(b.rot) * off,
        r: 0.62,
      });
    }
  });

  /* ---------------- distant city silhouettes ---------------- */

  const farMat = new THREE.MeshBasicMaterial({ color: 0x0a1224 });
  const farGlowMat = new THREE.MeshBasicMaterial({ color: 0x1a3350, transparent: true, opacity: 0.5 });
  for (let i = 0; i < 26; i++) {
    const a = (i / 26) * Math.PI * 2 + (i % 3) * 0.08;
    const dist = 52 + (i % 5) * 9;
    const w = 3 + (i % 4) * 2.5;
    const h = 8 + ((i * 7) % 34);
    const tower = new THREE.Mesh(new THREE.BoxGeometry(w, h, w), farMat);
    tower.position.set(Math.cos(a) * dist, h / 2 - 4, Math.sin(a) * dist);
    tower.rotation.y = a;
    root.add(tower);

    if (i % 2 === 0) {
      const win = new THREE.Mesh(new THREE.BoxGeometry(w * 0.55, h * 0.5, 0.08), farGlowMat);
      win.position.set(Math.cos(a) * (dist - w * 0.55), h * 0.45 - 2, Math.sin(a) * (dist - w * 0.55));
      win.rotation.y = -a + Math.PI / 2;
      root.add(win);
    }
  }

  /* ---------------- dust ---------------- */

  const dustCount = 240;
  const dustGeo = new THREE.BufferGeometry();
  const dustPos = new Float32Array(dustCount * 3);
  const dustSeed = new Float32Array(dustCount);
  for (let i = 0; i < dustCount; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * 26;
    dustPos[i * 3] = Math.cos(a) * r;
    dustPos[i * 3 + 1] = 0.4 + Math.random() * 8;
    dustPos[i * 3 + 2] = Math.sin(a) * r;
    dustSeed[i] = Math.random() * Math.PI * 2;
  }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  const dustMat = new THREE.PointsMaterial({
    color: 0x6fe8ff,
    size: 0.06,
    map: glowTexture(),
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });
  const dust = new THREE.Points(dustGeo, dustMat);
  root.add(dust);

  const dustBase = dustPos.slice();

  /* ---------------- update ---------------- */

  let time = 0;
  function update(dt) {
    time += dt;
    emblem.rotation.y = time * 0.08;

    for (const p of pulses) {
      p.mesh.material.opacity = p.base + Math.sin(time * p.speed) * p.amp;
    }

    // slow drifting motes
    for (let i = 0; i < dustCount; i++) {
      const i3 = i * 3;
      dustPos[i3 + 1] += dt * (0.08 + (dustSeed[i] % 0.1));
      dustPos[i3] += Math.sin(time * 0.22 + dustSeed[i]) * dt * 0.12;
      dustPos[i3 + 2] += Math.cos(time * 0.19 + dustSeed[i]) * dt * 0.12;
      if (dustPos[i3 + 1] > 9.4) {
        dustPos[i3 + 1] = 0.3;
        dustPos[i3] = dustBase[i3];
        dustPos[i3 + 2] = dustBase[i3 + 2];
      }
    }
    dustGeo.attributes.position.needsUpdate = true;
  }

  return { root, obstacles, blockers, update };
}

function addSky(scene) {
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: {
      topColor: { value: new THREE.Color(0x03040a) },
      midColor: { value: new THREE.Color(0x100a24) },
      horizonColor: { value: new THREE.Color(0x2b0f3d) },
      glowColor: { value: new THREE.Color(0x0b4f6b) },
    },
    vertexShader: /* glsl */ `
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vDir;
      uniform vec3 topColor;
      uniform vec3 midColor;
      uniform vec3 horizonColor;
      uniform vec3 glowColor;
      void main() {
        float h = clamp(vDir.y * 0.5 + 0.5, 0.0, 1.0);
        vec3 col = mix(horizonColor, midColor, smoothstep(0.42, 0.62, h));
        col = mix(col, topColor, smoothstep(0.58, 1.0, h));
        float band = exp(-pow((vDir.y - 0.02) * 9.0, 2.0));
        col += glowColor * band * 0.55;
        float glow = exp(-pow((vDir.y + 0.04) * 4.0, 2.0)) * 0.18;
        col += horizonColor * glow;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(180, 32, 20), skyMat);
  sky.frustumCulled = false;
  scene.add(sky);
}

function addStars(scene) {
  const count = 700;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const c = new THREE.Color();
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2;
    const y = Math.random() * 0.85 + 0.08;
    const r = 150 + Math.random() * 20;
    const horiz = Math.sqrt(1 - y * y);
    positions[i * 3] = Math.cos(a) * horiz * r;
    positions[i * 3 + 1] = y * r;
    positions[i * 3 + 2] = Math.sin(a) * horiz * r;
    c.setHSL(0.52 + Math.random() * 0.18, 0.7, 0.55 + Math.random() * 0.35);
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const mat = new THREE.PointsMaterial({
    size: 0.9,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
    fog: false,
    sizeAttenuation: true,
  });
  const stars = new THREE.Points(geo, mat);
  stars.frustumCulled = false;
  scene.add(stars);
}

function addLights(scene) {
  const hemi = new THREE.HemisphereLight(0x5fd8ff, 0x160a2a, 1.25);
  scene.add(hemi);

  const key = new THREE.DirectionalLight(0xc8efff, 2.1);
  key.position.set(12, 24, 8);
  scene.add(key);

  const rim = new THREE.DirectionalLight(0xff2d9b, 0.7);
  rim.position.set(-14, 10, -16);
  scene.add(rim);

  const magenta = new THREE.PointLight(0xff2d9b, 150, 52, 2);
  magenta.position.set(-17, 6.5, -12);
  scene.add(magenta);

  const cyan = new THREE.PointLight(0x35f0ff, 130, 52, 2);
  cyan.position.set(16, 6.5, 12);
  scene.add(cyan);

  const violet = new THREE.PointLight(0xa45bff, 90, 44, 2);
  violet.position.set(0, 8, -20);
  scene.add(violet);
}
