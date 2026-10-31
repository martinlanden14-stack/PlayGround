/* ============================================================
   World — neon arena, lighting, collision + ray helpers
   ============================================================ */
import * as THREE from 'three';

export const ARENA_HALF = 34;
export const ARENA_BOUND = 34;

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

/* ---------------- collision helpers ---------------- */

export function collideCircle(pos, radius, colliders, bound = ARENA_BOUND) {
  pos.x = clamp(pos.x, -bound + radius, bound - radius);
  pos.z = clamp(pos.z, -bound + radius, bound - radius);
  for (let i = 0; i < colliders.length; i++) {
    const c = colliders[i];
    const nx = clamp(pos.x, c.minX, c.maxX);
    const nz = clamp(pos.z, c.minZ, c.maxZ);
    const dx = pos.x - nx;
    const dz = pos.z - nz;
    const d2 = dx * dx + dz * dz;
    if (d2 < radius * radius) {
      if (d2 > 1e-9) {
        const d = Math.sqrt(d2);
        pos.x = nx + (dx / d) * radius;
        pos.z = nz + (dz / d) * radius;
      } else {
        const dl = pos.x - c.minX;
        const dr = c.maxX - pos.x;
        const dn = pos.z - c.minZ;
        const df = c.maxZ - pos.z;
        const m = Math.min(dl, dr, dn, df);
        if (m === dl) pos.x = c.minX - radius;
        else if (m === dr) pos.x = c.maxX + radius;
        else if (m === dn) pos.z = c.minZ - radius;
        else pos.z = c.maxZ + radius;
      }
    }
  }
}

/** Slab-method ray/AABB. Returns entry distance or null. */
export function rayBox(o, d, b) {
  let tmin = 0;
  let tmax = Infinity;
  const axes = ['x', 'y', 'z'];
  for (let i = 0; i < 3; i++) {
    const a = axes[i];
    const da = d[a];
    if (Math.abs(da) < 1e-8) {
      if (o[a] < b['min' + a.toUpperCase()] || o[a] > b['max' + a.toUpperCase()]) return null;
    } else {
      let t1 = (b['min' + a.toUpperCase()] - o[a]) / da;
      let t2 = (b['max' + a.toUpperCase()] - o[a]) / da;
      if (t1 > t2) { const tmp = t1; t1 = t2; t2 = tmp; }
      if (t1 > tmin) tmin = t1;
      if (t2 < tmax) tmax = t2;
      if (tmin > tmax) return null;
    }
  }
  return tmin;
}

/* ---------------- textures ---------------- */

function makeGlowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.25, 'rgba(255,255,255,0.55)');
  g.addColorStop(0.6, 'rgba(255,255,255,0.12)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeGridTexture() {
  const S = 512;
  const c = document.createElement('canvas');
  c.width = c.height = S;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#080d19';
  ctx.fillRect(0, 0, S, S);

  // faint panel noise
  for (let i = 0; i < 1600; i++) {
    ctx.fillStyle = `rgba(80,140,190,${Math.random() * 0.04})`;
    ctx.fillRect(Math.random() * S, Math.random() * S, 1, 1);
  }

  ctx.strokeStyle = 'rgba(34,230,255,0.11)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= S; i += 32) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, S); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(S, i); ctx.stroke();
  }
  ctx.strokeStyle = 'rgba(34,230,255,0.3)';
  ctx.lineWidth = 2;
  for (let i = 0; i <= S; i += 128) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, S); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(S, i); ctx.stroke();
  }
  // intersections
  ctx.fillStyle = 'rgba(120,250,255,0.5)';
  for (let x = 0; x <= S; x += 128) {
    for (let y = 0; y <= S; y += 128) {
      ctx.beginPath(); ctx.arc(x, y, 2.2, 0, Math.PI * 2); ctx.fill();
    }
  }

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(9, 9);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function makeSignTexture(title, sub) {
  const w = 512;
  const h = 128;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, w, h);
  ctx.font = '900 46px Orbitron, monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(34,230,255,0.95)';
  ctx.shadowBlur = 22;
  ctx.fillStyle = 'rgba(180,250,255,0.92)';
  ctx.fillText(title, w / 2, 48);
  ctx.shadowBlur = 10;
  ctx.font = '600 19px Rajdhani, monospace';
  ctx.fillStyle = 'rgba(255,45,122,0.9)';
  ctx.fillText(sub, w / 2, 94);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/* ---------------- world builder ---------------- */

export function createWorld(scene) {
  const group = new THREE.Group();
  scene.add(group);

  const colliders = [];
  const glowTex = makeGlowTexture();
  const animated = [];

  const mat = {
    floor: new THREE.MeshStandardMaterial({
      map: makeGridTexture(),
      color: 0xa9c4de,
      roughness: 0.84,
      metalness: 0.12,
      emissive: 0x07121c,
      emissiveIntensity: 1,
    }),
    wall: new THREE.MeshStandardMaterial({ color: 0x0c1424, roughness: 0.72, metalness: 0.35 }),
    wallDark: new THREE.MeshStandardMaterial({ color: 0x070c16, roughness: 0.85, metalness: 0.2 }),
    pillar: new THREE.MeshStandardMaterial({ color: 0x101a2e, roughness: 0.55, metalness: 0.6 }),
    crate: new THREE.MeshStandardMaterial({ color: 0x142033, roughness: 0.55, metalness: 0.5 }),
    crateDark: new THREE.MeshStandardMaterial({ color: 0x0b1322, roughness: 0.7, metalness: 0.4 }),
    cyan: new THREE.MeshBasicMaterial({ color: 0x22e6ff, toneMapped: false }),
    pink: new THREE.MeshBasicMaterial({ color: 0xff2d7a, toneMapped: false }),
    violet: new THREE.MeshBasicMaterial({ color: 0x8a5cff, toneMapped: false }),
    amber: new THREE.MeshBasicMaterial({ color: 0xffb347, toneMapped: false }),
    tower: new THREE.MeshStandardMaterial({ color: 0x070c18, roughness: 0.9, metalness: 0.2 }),
    glass: new THREE.MeshBasicMaterial({ color: 0x1a3d5c, toneMapped: false, transparent: true, opacity: 0.35 }),
  };

  function addCollider(cx, cz, sx, sz, h, baseY = 0) {
    const c = {
      minX: cx - sx / 2, maxX: cx + sx / 2,
      minY: baseY, maxY: baseY + h,
      minZ: cz - sz / 2, maxZ: cz + sz / 2,
    };
    colliders.push(c);
    return c;
  }

  function addBox(cx, cy, cz, sx, sy, sz, material, { collide = true, ray = true } = {}) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), material);
    m.position.set(cx, cy, cz);
    group.add(m);
    if (collide) {
      const c = addCollider(cx, cz, sx, sz, sy, cy - sy / 2);
      if (!ray) colliders.pop();
    }
    return m;
  }

  /* ---------- floor ---------- */
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(ARENA_HALF * 2 + 12, ARENA_HALF * 2 + 12), mat.floor);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0;
  group.add(floor);

  // glowing floor border + cross
  const border = 33.4;
  const strip = (x, z, w, d, m) => {
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, d), m);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(x, 0.015, z);
    group.add(mesh);
    return mesh;
  };
  strip(0, -border, border * 2, 0.16, mat.cyan);
  strip(0, border, border * 2, 0.16, mat.cyan);
  strip(-border, 0, 0.16, border * 2, mat.cyan);
  strip(border, 0, 0.16, border * 2, mat.cyan);

  const ring1Mat = new THREE.MeshBasicMaterial({
    color: 0xff2d7a, toneMapped: false, transparent: true, opacity: 0.7,
  });
  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(6.4, 0.05, 4, 96), ring1Mat);
  ring1.rotation.x = -Math.PI / 2;
  ring1.position.y = 0.02;
  group.add(ring1);

  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.9, 0.035, 4, 72), mat.cyan);
  ring2.rotation.x = -Math.PI / 2;
  ring2.position.y = 0.02;
  group.add(ring2);

  const ring3 = new THREE.Mesh(new THREE.TorusGeometry(4.5, 0.02, 4, 96), mat.violet);
  ring3.rotation.x = -Math.PI / 2;
  ring3.position.y = 0.025;
  group.add(ring3);
  animated.push({ mesh: ring3, kind: 'spinSlow' });

  // center mark
  const crossA = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.12), mat.cyan);
  crossA.rotation.x = -Math.PI / 2;
  crossA.position.set(0, 0.03, 0);
  group.add(crossA);
  const crossB = crossA.clone();
  crossB.rotation.z = Math.PI / 2;
  group.add(crossB);

  /* ---------- outer walls ---------- */
  const wallH = 7.5;
  const wallT = 1.6;
  const wallC = 35.8;
  addBox(0, wallH / 2, -wallC, 74, wallH, wallT, mat.wall);
  addBox(0, wallH / 2, wallC, 74, wallH, wallT, mat.wall);
  addBox(-wallC, wallH / 2, 0, wallT, wallH, 74, mat.wall);
  addBox(wallC, wallH / 2, 0, wallT, wallH, 74, mat.wall);

  // wall trim
  const trim = (x, z, w, d, m) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, 0.1, d), m);
    mesh.position.set(x, wallH - 0.32, z);
    group.add(mesh);
  };
  trim(0, -wallC + wallT / 2, 72, 0.12, mat.cyan);
  trim(0, wallC - wallT / 2, 72, 0.12, mat.pink);
  trim(-wallC + wallT / 2, 0, 0.12, 72, mat.pink);
  trim(wallC - wallT / 2, 0, 0.12, 72, mat.cyan);

  // lower wall skirt glow
  const skirt = (x, z, w, d, m) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, 0.08, d), m);
    mesh.position.set(x, 0.08, z);
    group.add(mesh);
  };
  skirt(0, -35.2, 70, 0.08, mat.violet);
  skirt(0, 35.2, 70, 0.08, mat.violet);

  // vertical wall ribs
  for (let i = -3; i <= 3; i++) {
    const x = i * 10;
    const ribN = new THREE.Mesh(new THREE.BoxGeometry(0.22, wallH - 0.8, 0.14), i % 2 === 0 ? mat.cyan : mat.violet);
    ribN.position.set(x, wallH / 2, -35.1);
    group.add(ribN);
    const ribS = ribN.clone();
    ribS.position.z = 35.1;
    group.add(ribS);
  }
  for (let i = -3; i <= 3; i++) {
    const z = i * 10;
    const ribW = new THREE.Mesh(new THREE.BoxGeometry(0.14, wallH - 0.8, 0.22), i % 2 === 0 ? mat.pink : mat.cyan);
    ribW.position.set(-35.1, wallH / 2, z);
    group.add(ribW);
    const ribE = ribW.clone();
    ribE.position.x = 35.1;
    group.add(ribE);
  }

  // wall signs
  const sign1 = new THREE.Mesh(
    new THREE.PlaneGeometry(11, 2.75),
    new THREE.MeshBasicMaterial({ map: makeSignTexture('SECTOR 07', 'CONTAINMENT GRID — ACTIVE'), transparent: true, opacity: 0.8, toneMapped: false, depthWrite: false })
  );
  sign1.position.set(0, 4.4, -34.94);
  group.add(sign1);

  const sign2 = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 2.5),
    new THREE.MeshBasicMaterial({ map: makeSignTexture('NO EXIT', 'LETHAL FORCE AUTHORIZED'), transparent: true, opacity: 0.7, toneMapped: false, depthWrite: false })
  );
  sign2.position.set(34.94, 4.2, 6);
  sign2.rotation.y = -Math.PI / 2;
  group.add(sign2);

  /* ---------- pillars ---------- */
  const pillars = [
    [14, 14, 2.2, 6.4], [-14, 14, 2.2, 6.4],
    [14, -14, 2.2, 6.4], [-14, -14, 2.2, 6.4],
    [26, 0, 2.6, 7.2], [-26, 0, 2.6, 7.2],
  ];
  for (const [x, z, s, h] of pillars) {
    addBox(x, h / 2, z, s, h, s, mat.pillar);
    // glowing vertical edges
    for (const [ox, oz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
      const edge = new THREE.Mesh(new THREE.BoxGeometry(0.09, h - 0.7, 0.09), (ox === oz) ? mat.cyan : mat.pink);
      edge.position.set(x + ox * (s / 2 - 0.03), h / 2, z + oz * (s / 2 - 0.03));
      group.add(edge);
    }
    // cap
    const cap = new THREE.Mesh(new THREE.BoxGeometry(s + 0.35, 0.16, s + 0.35), mat.cyan);
    cap.position.set(x, h + 0.06, z);
    group.add(cap);
    // floating glow sprite
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTex, color: 0x22e6ff, transparent: true, opacity: 0.22,
      blending: THREE.AdditiveBlending, depthWrite: false,
    }));
    glow.scale.set(3.4, 3.4, 1);
    glow.position.set(x, h + 0.4, z);
    group.add(glow);
  }

  /* ---------- crates / cover ---------- */
  const crates = [
    [6.5, 4.5, 2.4, 1.5, 2.4], [-7.5, 8.5, 3.2, 1.9, 1.7],
    [9.5, -7.5, 2.1, 1.3, 3.1], [-9.5, -9.5, 2.7, 1.7, 2.7],
    [18.5, 8.5, 3.2, 2.3, 2.1], [-18.5, -8.5, 2.5, 1.5, 2.5],
    [0, -18.5, 4.4, 1.1, 1.1], [0, 18.5, 4.4, 1.1, 1.1],
    [18.5, -18.5, 2.2, 1.8, 2.2], [-18.5, 18.5, 2.2, 1.8, 2.2],
  ];
  for (const [x, z, sx, sy, sz] of crates) {
    addBox(x, sy / 2, z, sx, sy, sz, mat.crate);
    const top = new THREE.Mesh(new THREE.BoxGeometry(sx + 0.05, 0.07, sz + 0.05), mat.cyan);
    top.position.set(x, sy + 0.03, z);
    group.add(top);
    // side accent
    const accent = new THREE.Mesh(new THREE.BoxGeometry(sx + 0.02, 0.06, 0.05), mat.violet);
    accent.position.set(x, sy * 0.55, z + sz / 2 + 0.01);
    group.add(accent);
  }

  // low barriers near the middle (spawn lane left open)
  for (const [x, z, rot] of [[0, -8, 0], [-8, 0, 1], [8, 0, 1]]) {
    const w = 5.2, h = 0.68, d = 0.55;
    const sx = rot ? d : w;
    const sz = rot ? w : d;
    addBox(x, h / 2, z, sx, h, sz, mat.crateDark);
    const top = new THREE.Mesh(new THREE.BoxGeometry(sx + 0.04, 0.06, sz + 0.04), mat.pink);
    top.position.set(x, h + 0.02, z);
    group.add(top);
  }

  /* ---------- distant skyline ---------- */
  for (let i = 0; i < 26; i++) {
    const a = (i / 26) * Math.PI * 2 + Math.random() * 0.2;
    const r = 48 + Math.random() * 26;
    const w = 4 + Math.random() * 8;
    const h = 8 + Math.random() * 30;
    const d = 4 + Math.random() * 8;
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    const tower = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat.tower);
    tower.position.set(x, h / 2 - 0.5, z);
    group.add(tower);
    if (Math.random() < 0.55) {
      const neon = new THREE.Mesh(
        new THREE.BoxGeometry(w * 0.9, 0.16, d * 0.9),
        Math.random() < 0.5 ? mat.cyan : mat.pink
      );
      neon.position.set(x, h - 0.4, z);
      group.add(neon);
    }
    if (Math.random() < 0.4) {
      const win = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.55, h * 0.5), mat.glass);
      win.position.set(x, h * 0.55, z + d / 2 + 0.01);
      group.add(win);
    }
  }

  /* ---------- sky ---------- */
  const skyGeo = new THREE.SphereGeometry(180, 24, 16);
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: {},
    vertexShader: `
      varying vec3 vPos;
      void main() {
        vPos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vPos;
      void main() {
        vec3 d = normalize(vPos);
        float h = d.y * 0.5 + 0.5;
        vec3 top = vec3(0.006, 0.010, 0.035);
        vec3 bottom = vec3(0.030, 0.014, 0.070);
        vec3 col = mix(bottom, top, smoothstep(0.35, 1.0, h));
        float horizon = pow(1.0 - abs(d.y), 10.0);
        col += vec3(0.20, 0.03, 0.16) * horizon * 0.55;
        col += vec3(0.02, 0.09, 0.16) * pow(max(0.0, d.y), 3.0) * 0.5;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  const sky = new THREE.Mesh(skyGeo, skyMat);
  group.add(sky);

  // stars
  const starCount = 700;
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    const a = Math.random() * Math.PI * 2;
    const y = Math.random() * 0.9 + 0.08;
    const r = 150;
    const rr = Math.sqrt(1 - y * y);
    starPos[i * 3] = Math.cos(a) * rr * r;
    starPos[i * 3 + 1] = y * r;
    starPos[i * 3 + 2] = Math.sin(a) * rr * r;
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({
    color: 0x9fdcff, size: 1.1, map: glowTex, transparent: true, opacity: 0.75,
    blending: THREE.AdditiveBlending, depthWrite: false, fog: false, sizeAttenuation: true,
  }));
  group.add(stars);

  // floating rings
  const skyRing1 = new THREE.Mesh(new THREE.TorusGeometry(23, 0.09, 4, 100), mat.violet);
  skyRing1.position.set(0, 19, -4);
  skyRing1.rotation.x = Math.PI / 2.35;
  skyRing1.rotation.z = 0.2;
  group.add(skyRing1);
  const skyRing2 = new THREE.Mesh(new THREE.TorusGeometry(16, 0.06, 4, 80), mat.pink);
  skyRing2.position.set(0, 26, -10);
  skyRing2.rotation.x = Math.PI / 2.1;
  skyRing2.rotation.y = 0.4;
  group.add(skyRing2);
  animated.push({ mesh: skyRing1, kind: 'ring1' });
  animated.push({ mesh: skyRing2, kind: 'ring2' });

  /* ---------- lights ---------- */
  const hemi = new THREE.HemisphereLight(0x6a8cff, 0x0a0014, 1.15);
  scene.add(hemi);

  const dir = new THREE.DirectionalLight(0xbfe6ff, 2.1);
  dir.position.set(18, 28, 12);
  scene.add(dir);

  const rim = new THREE.DirectionalLight(0xff5c9c, 0.55);
  rim.position.set(-22, 10, -20);
  scene.add(rim);

  const p1 = new THREE.PointLight(0x22e6ff, 32, 30, 2);
  p1.position.set(0, 5.5, 0);
  scene.add(p1);

  const p2 = new THREE.PointLight(0xff2d7a, 26, 26, 2);
  p2.position.set(20, 4, -20);
  scene.add(p2);

  const p3 = new THREE.PointLight(0x8a5cff, 22, 26, 2);
  p3.position.set(-20, 4, 20);
  scene.add(p3);

  scene.fog = new THREE.Fog(0x05060f, 30, 110);
  scene.background = new THREE.Color(0x05060f);

  /* ---------- spawn points ---------- */
  const spawnPoints = [];
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2 + Math.PI / 12;
    spawnPoints.push(new THREE.Vector3(Math.cos(a) * 30.5, 0, Math.sin(a) * 30.5));
  }

  /* ---------- raycast ---------- */
  function raycast(origin, direction, maxDist = 80) {
    let t = maxDist;
    if (direction.y < -1e-6) {
      const tf = -origin.y / direction.y;
      if (tf > 0.01 && tf < t) t = tf;
    }
    for (let i = 0; i < colliders.length; i++) {
      const hit = rayBox(origin, direction, colliders[i]);
      if (hit !== null && hit > 0.02 && hit < t) t = hit;
    }
    return t;
  }

  function lineOfSight(a, b) {
    const dir = new THREE.Vector3().subVectors(b, a);
    const dist = dir.length();
    if (dist < 0.001) return true;
    dir.divideScalar(dist);
    const hit = raycast(a, dir, dist + 0.2);
    return hit >= dist - 0.05;
  }

  function update(t, dt) {
    for (const a of animated) {
      if (a.kind === 'spinSlow') a.mesh.rotation.z += dt * 0.08;
      else if (a.kind === 'ring1') { a.mesh.rotation.z += dt * 0.03; a.mesh.rotation.y = Math.sin(t * 0.1) * 0.2; }
      else if (a.kind === 'ring2') { a.mesh.rotation.z -= dt * 0.05; }
    }
    stars.rotation.y += dt * 0.004;
    // slow pulse on the central ring
    const pulse = 0.55 + Math.sin(t * 1.6) * 0.18;
    ring1.material.opacity = pulse;
    ring1.material.transparent = true;
    ring1.material.needsUpdate = false;
  }

  return { group, colliders, spawnPoints, raycast, lineOfSight, update, glowTex, skyRing1, skyRing2 };
}
