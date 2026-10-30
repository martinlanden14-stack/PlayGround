/* ============================================================
   NEON BREACH — arena: procedural neon environment
   ============================================================ */
import * as THREE from 'three';

const HALF = 30;
const PLAY_HALF = 28.0;

function canvasTex(w, h, draw, { repeat = [1, 1], srgb = true } = {}) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const g = c.getContext('2d');
  draw(g, w, h);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeat[0], repeat[1]);
  t.anisotropy = 4;
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function gridTexture() {
  return canvasTex(512, 512, (g, w, h) => {
    g.fillStyle = '#060a14';
    g.fillRect(0, 0, w, h);
    // subtle tiles
    const grad = g.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, 'rgba(20,40,70,.18)');
    grad.addColorStop(1, 'rgba(5,8,16,0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, w, h);

    g.strokeStyle = 'rgba(69,243,255,.16)';
    g.lineWidth = 2;
    for (let i = 1; i < 8; i++) {
      const p = (i * w) / 8;
      g.beginPath(); g.moveTo(p, 0); g.lineTo(p, h); g.stroke();
      g.beginPath(); g.moveTo(0, p); g.lineTo(w, p); g.stroke();
    }
    g.strokeStyle = 'rgba(69,243,255,.34)';
    g.lineWidth = 3;
    g.strokeRect(0, 0, w, h);
    g.strokeRect(w / 2, h / 2, 1, 1);
    // rivets
    g.fillStyle = 'rgba(120,240,255,.25)';
    for (let i = 0; i < 90; i++) {
      const x = Math.random() * w, y = Math.random() * h;
      if (x % 64 < 8 || y % 64 < 8) g.fillRect(x, y, 1.5, 1.5);
    }
  }, { repeat: [8, 8] });
}

function panelTexture() {
  return canvasTex(512, 256, (g, w, h) => {
    g.fillStyle = '#0b1220';
    g.fillRect(0, 0, w, h);
    g.strokeStyle = 'rgba(60,110,140,.35)';
    g.lineWidth = 2;
    for (let x = 0; x < w; x += 128) {
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, h); g.stroke();
      g.strokeStyle = 'rgba(60,110,140,.2)';
      g.strokeRect(x + 6, 8, 116, h - 16);
      g.strokeStyle = 'rgba(60,110,140,.35)';
    }
    g.strokeStyle = 'rgba(69,243,255,.35)';
    g.beginPath(); g.moveTo(0, h * 0.5); g.lineTo(w, h * 0.5); g.stroke();
    g.fillStyle = 'rgba(69,243,255,.14)';
    for (let x = 12; x < w; x += 128) g.fillRect(x, 14, 40, 3);
    g.fillStyle = 'rgba(255,47,126,.2)';
    for (let x = 90; x < w; x += 256) g.fillRect(x, h - 22, 52, 3);
  }, { repeat: [3, 1] });
}

function crateTexture() {
  return canvasTex(256, 256, (g, w, h) => {
    g.fillStyle = '#111a2b';
    g.fillRect(0, 0, w, h);
    g.strokeStyle = 'rgba(69,243,255,.2)';
    g.lineWidth = 4;
    g.strokeRect(10, 10, w - 20, h - 20);
    g.strokeRect(24, 24, w - 48, h - 48);
    g.strokeStyle = 'rgba(0,0,0,.5)';
    g.lineWidth = 2;
    for (let i = 0; i < 4; i++) {
      g.beginPath(); g.moveTo(24, 24 + i * 56); g.lineTo(w - 24, 24 + i * 56); g.stroke();
    }
    g.fillStyle = 'rgba(255,179,64,.5)';
    g.fillRect(24, 24, 26, 8);
    g.fillStyle = 'rgba(69,243,255,.5)';
    g.fillRect(w - 62, h - 38, 38, 6);
    g.font = 'bold 18px monospace';
    g.fillStyle = 'rgba(120,240,255,.22)';
    g.fillText('C-07', 30, h - 40);
  });
}

function buildingTexture() {
  return canvasTex(128, 256, (g, w, h) => {
    g.fillStyle = '#070b16';
    g.fillRect(0, 0, w, h);
    for (let y = 8; y < h; y += 12) {
      for (let x = 8; x < w; x += 16) {
        if (Math.random() < 0.34) {
          const c = Math.random() < 0.2 ? '255,47,126' : Math.random() < 0.5 ? '69,243,255' : '255,200,120';
          g.fillStyle = `rgba(${c},${0.25 + Math.random() * 0.55})`;
          g.fillRect(x, y, 7, 3);
        }
      }
    }
    g.fillStyle = 'rgba(69,243,255,.5)';
    g.fillRect(w * 0.2, 4, w * 0.6, 2);
  });
}

function holoTexture(text, color = '69,243,255') {
  return canvasTex(256, 256, (g, w, h) => {
    g.clearRect(0, 0, w, h);
    g.strokeStyle = `rgba(${color},.85)`;
    g.lineWidth = 3;
    g.strokeRect(10, 10, w - 20, h - 20);
    g.strokeStyle = `rgba(${color},.3)`;
    g.lineWidth = 1;
    for (let y = 18; y < h - 18; y += 8) {
      g.beginPath(); g.moveTo(18, y); g.lineTo(w - 18, y); g.stroke();
    }
    g.fillStyle = `rgba(${color},.9)`;
    g.font = 'bold 30px monospace';
    g.textAlign = 'center';
    g.fillText(text, w / 2, h / 2 - 4);
    g.font = '12px monospace';
    g.fillStyle = `rgba(${color},.55)`;
    g.fillText('SECTOR // 07', w / 2, h / 2 + 26);
    g.fillStyle = `rgba(${color},.9)`;
    g.beginPath(); g.arc(w / 2, h / 2 + 52, 3, 0, Math.PI * 2); g.fill();
  }, { srgb: false });
}

function glowTexture() {
  return canvasTex(128, 128, (g, w, h) => {
    const grd = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    grd.addColorStop(0, 'rgba(255,255,255,1)');
    grd.addColorStop(0.25, 'rgba(255,255,255,.65)');
    grd.addColorStop(0.6, 'rgba(255,255,255,.14)');
    grd.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grd;
    g.fillRect(0, 0, w, h);
  }, { srgb: false });
}

export class Arena {
  constructor(scene, quality) {
    this.scene = scene;
    this.quality = quality;
    this.colliders = [];
    this.spawnPoints = [];
    this.animated = [];
    this.holoMats = [];
    this.spawnRings = [];
    this.time = 0;

    this.buildSky();
    this.buildFloor();
    this.buildWalls();
    this.buildCover();
    this.buildSpawnPads();
    this.buildDust();
    this.buildSkyline();
    this.buildLights();
  }

  /* ------------------------------- sky ------------------------------- */
  buildSky() {
    const geo = new THREE.SphereGeometry(170, 24, 16);
    const mat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
      uniforms: {},
      vertexShader: `
        varying vec3 vPos;
        void main() {
          vPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: `
        varying vec3 vPos;
        void main() {
          vec3 d = normalize(vPos);
          float h = d.y;
          vec3 top = vec3(0.004, 0.006, 0.018);
          vec3 mid = vec3(0.02, 0.028, 0.07);
          vec3 col = mix(mid, top, smoothstep(0.0, 0.65, h));
          col = mix(vec3(0.035,0.012,0.045), col, smoothstep(-0.25, 0.05, h));
          float band = exp(-pow((h - 0.015) * 9.0, 2.0));
          col += vec3(0.30, 0.05, 0.30) * band * 0.55;
          float band2 = exp(-pow((h - 0.10) * 14.0, 2.0));
          col += vec3(0.03, 0.20, 0.26) * band2 * 0.5;
          gl_FragColor = vec4(col, 1.0);
        }`,
    });
    const sky = new THREE.Mesh(geo, mat);
    sky.renderOrder = -10;
    this.scene.add(sky);

    // stars
    const n = 700;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(Math.random() * 0.9 + 0.05);
      const r = 150;
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.cos(ph) + 8;
      pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const m = new THREE.PointsMaterial({
      color: 0x9fd8ff, size: 0.55, sizeAttenuation: true,
      transparent: true, opacity: 0.8, depthWrite: false, fog: false,
    });
    this.scene.add(new THREE.Points(g, m));
  }

  /* ------------------------------ floor ------------------------------ */
  buildFloor() {
    const tex = gridTexture();
    const mat = new THREE.MeshStandardMaterial({
      map: tex, roughness: 0.66, metalness: 0.38, color: 0xbfd9e6,
      envMapIntensity: 0.5,
    });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(HALF * 2, HALF * 2), mat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = false;
    this.scene.add(floor);

    // center emblem
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(4.4, 4.7, 64),
      new THREE.MeshBasicMaterial({ color: 0x45f3ff, transparent: true, opacity: 0.5, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.02;
    this.scene.add(ring);
    this.centerRing = ring;

    const ring2 = new THREE.Mesh(
      new THREE.RingGeometry(5.6, 5.7, 64, 1, 0, Math.PI * 1.3),
      new THREE.MeshBasicMaterial({ color: 0xff2f7e, transparent: true, opacity: 0.42, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    ring2.rotation.x = -Math.PI / 2;
    ring2.position.y = 0.021;
    this.scene.add(ring2);
    this.centerRing2 = ring2;

    // glowing floor guide strips
    const stripMat = new THREE.MeshBasicMaterial({ color: 0x45f3ff, transparent: true, opacity: 0.32, blending: THREE.AdditiveBlending, depthWrite: false });
    for (let i = -2; i <= 2; i++) {
      const s = new THREE.Mesh(new THREE.PlaneGeometry(0.06, HALF * 1.7), stripMat);
      s.rotation.x = -Math.PI / 2;
      s.position.set(i * 9, 0.015, 0);
      this.scene.add(s);
    }
  }

  /* ------------------------------ walls ------------------------------ */
  buildWalls() {
    const tex = panelTexture();
    tex.repeat.set(6, 1.6);
    const wallMat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.8, metalness: 0.35, color: 0x8fa8bb });
    const topMat = new THREE.MeshBasicMaterial({ color: 0xff2f7e });
    const trimMat = new THREE.MeshBasicMaterial({ color: 0x45f3ff });

    const h = 8;
    const walls = [
      { x: 0, z: -HALF, w: HALF * 2, d: 1.2, rot: 0 },
      { x: 0, z: HALF, w: HALF * 2, d: 1.2, rot: 0 },
      { x: -HALF, z: 0, w: 1.2, d: HALF * 2, rot: 0 },
      { x: HALF, z: 0, w: 1.2, d: HALF * 2, rot: 0 },
    ];
    for (const wl of walls) {
      const wall = new THREE.Mesh(new THREE.BoxGeometry(wl.w, h, wl.d), wallMat);
      wall.position.set(wl.x, h / 2, wl.z);
      this.scene.add(wall);

      const top = new THREE.Mesh(new THREE.BoxGeometry(wl.w, 0.16, wl.d + 0.06), topMat);
      top.position.set(wl.x, h - 0.3, wl.z);
      this.scene.add(top);

      const trim = new THREE.Mesh(new THREE.BoxGeometry(wl.w, 0.05, wl.d + 0.1), trimMat);
      trim.position.set(wl.x, 2.4, wl.z);
      this.scene.add(trim);
    }

    // vertical light pillars along walls
    const barGeo = new THREE.BoxGeometry(0.14, 6.4, 0.14);
    const cyanBars = new THREE.InstancedMesh(barGeo, new THREE.MeshBasicMaterial({ color: 0x45f3ff }), 32);
    const m = new THREE.Matrix4();
    let idx = 0;
    for (let i = 0; i < 8; i++) {
      const p = -HALF + 3 + i * 7.7;
      for (const side of [-1, 1]) {
        m.makeTranslation(p, 3.4, side * (HALF - 0.65));
        cyanBars.setMatrixAt(idx++, m);
      }
      m.makeTranslation(-(HALF - 0.65), 3.4, p * 0.92);
      cyanBars.setMatrixAt(idx++, m);
      m.makeTranslation(HALF - 0.65, 3.4, p * 0.92);
      cyanBars.setMatrixAt(idx++, m);
    }
    cyanBars.count = idx;
    this.scene.add(cyanBars);

    // corner accent columns
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
      const col = new THREE.Mesh(new THREE.BoxGeometry(2.4, 8.6, 2.4), wallMat);
      col.position.set(sx * (HALF - 0.8), 4.3, sz * (HALF - 0.8));
      this.scene.add(col);
      const cap = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.14, 2.7), topMat);
      cap.position.set(sx * (HALF - 0.8), 8.4, sz * (HALF - 0.8));
      this.scene.add(cap);
    }
  }

  /* ------------------------------ cover ------------------------------ */
  buildCover() {
    const tex = crateTexture();
    const mat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.7, metalness: 0.4, color: 0xa8c2d4 });
    const edgeCyan = new THREE.LineBasicMaterial({ color: 0x45f3ff, transparent: true, opacity: 0.75 });
    const edgeMag = new THREE.LineBasicMaterial({ color: 0xff2f7e, transparent: true, opacity: 0.6 });

    const layout = [
      [-8, -7, 4.0, 2.4, 2.2], [8, -7, 4.0, 2.4, 2.2],
      [-8, 7.5, 4.0, 2.4, 2.2], [8, 7.5, 4.0, 2.4, 2.2],
      [0, -15, 6.0, 2.2, 2.8], [0, 15, 6.0, 2.2, 2.8],
      [-17, -1.5, 2.4, 6.0, 2.5], [17, -1.5, 2.4, 6.0, 2.5],
      [-20, 20, 3.2, 3.2, 1.7], [20, 20, 3.2, 3.2, 1.7],
      [-20, -20, 3.2, 3.2, 1.7], [20, -20, 3.2, 3.2, 1.7],
      [-13, 15, 2.0, 2.0, 1.25], [13, 15, 2.0, 2.0, 1.25],
      [-13, -16, 2.0, 2.0, 1.25], [13, -16, 2.0, 2.0, 1.25],
    ];

    for (let i = 0; i < layout.length; i++) {
      const [x, z, w, d, h] = layout[i];
      const geo = new THREE.BoxGeometry(w, h, d);
      const box = new THREE.Mesh(geo, mat);
      box.position.set(x, h / 2, z);
      this.scene.add(box);

      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), i % 3 === 0 ? edgeMag : edgeCyan);
      edges.position.copy(box.position);
      this.scene.add(edges);

      // top glow strip
      const strip = new THREE.Mesh(
        new THREE.PlaneGeometry(w * 0.55, 0.07),
        new THREE.MeshBasicMaterial({ color: i % 3 === 0 ? 0xff2f7e : 0x45f3ff, transparent: true, opacity: 0.65, blending: THREE.AdditiveBlending, depthWrite: false })
      );
      strip.rotation.x = -Math.PI / 2;
      strip.position.set(x, h + 0.012, z);
      this.scene.add(strip);

      this.colliders.push({
        minX: x - w / 2, maxX: x + w / 2,
        minZ: z - d / 2, maxZ: z + d / 2,
        h, x, z,
      });
    }

    // pillars
    const pillarMat = new THREE.MeshStandardMaterial({ color: 0x18243a, roughness: 0.5, metalness: 0.7 });
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x45f3ff, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false });
    for (const [x, z] of [[-23, 0], [23, 0], [0, -23], [0, 23]]) {
      const p = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.75, 7, 8), pillarMat);
      p.position.set(x, 3.5, z);
      this.scene.add(p);
      for (let k = 0; k < 3; k++) {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.035, 6, 24), ringMat);
        ring.rotation.x = Math.PI / 2;
        ring.position.set(x, 1.4 + k * 2.2, z);
        this.scene.add(ring);
      }
      this.colliders.push({ minX: x - 0.75, maxX: x + 0.75, minZ: z - 0.75, maxZ: z + 0.75, h: 7, x, z });
    }

    // holo billboards
    const holoMat1 = new THREE.MeshBasicMaterial({
      map: holoTexture('BREACH', '69,243,255'), transparent: true, opacity: 0.75,
      side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false, fog: false,
    });
    const holoMat2 = new THREE.MeshBasicMaterial({
      map: holoTexture('WAVE', '255,47,126'), transparent: true, opacity: 0.7,
      side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false, fog: false,
    });
    this.holoMats.push(holoMat1, holoMat2);
    const h1 = new THREE.Mesh(new THREE.PlaneGeometry(4.6, 4.6), holoMat1);
    h1.position.set(-12, 5.6, -27.6);
    this.scene.add(h1);
    this.animated.push({ obj: h1, type: 'holo', base: 5.6, phase: 0 });
    const h2 = new THREE.Mesh(new THREE.PlaneGeometry(4.0, 4.0), holoMat2);
    h2.position.set(27.4, 5.2, 6);
    h2.rotation.y = -Math.PI / 2;
    this.scene.add(h2);
    this.animated.push({ obj: h2, type: 'holo', base: 5.2, phase: 1.7 });
  }

  /* ---------------------------- spawn pads ---------------------------- */
  buildSpawnPads() {
    const r = 23.5;
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2 + 0.2;
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      this.spawnPoints.push(new THREE.Vector3(x, 0, z));

      const mat = new THREE.MeshBasicMaterial({
        color: 0xff2f7e, transparent: true, opacity: 0.0,
        side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false,
      });
      const ring = new THREE.Mesh(new THREE.RingGeometry(1.05, 1.35, 32), mat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(x, 0.03, z);
      this.scene.add(ring);
      this.spawnRings.push({ mesh: ring, mat, active: 0 });
    }
  }

  /* ------------------------------- dust ------------------------------- */
  buildDust() {
    const n = this.quality === 'high' ? 260 : 140;
    const pos = new Float32Array(n * 3);
    const speed = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 56;
      pos[i * 3 + 1] = Math.random() * 10 + 0.4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 56;
      speed[i] = 0.15 + Math.random() * 0.3;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    this.dustGeo = g;
    this.dustSpeed = speed;
    this.dust = new THREE.Points(g, new THREE.PointsMaterial({
      color: 0x66d8ff, size: 0.055, transparent: true, opacity: 0.55,
      blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
    }));
    this.scene.add(this.dust);
  }

  /* ----------------------------- skyline ----------------------------- */
  buildSkyline() {
    const tex = buildingTexture();
    const mats = [];
    for (let i = 0; i < 3; i++) {
      const m = tex.clone();
      m.needsUpdate = true;
      m.wrapS = m.wrapT = THREE.RepeatWrapping;
      m.repeat.set(1 + i * 0.5, 1.4 + i * 0.8);
      m.offset.set(Math.random(), Math.random());
      mats.push(new THREE.MeshBasicMaterial({ map: m, color: 0x8fa8c0, fog: true }));
    }
    const geo = new THREE.BoxGeometry(1, 1, 1);

    for (let i = 0; i < 34; i++) {
      const a = (i / 34) * Math.PI * 2 + Math.random() * 0.12;
      const r = 46 + Math.random() * 42;
      const w = 4 + Math.random() * 8;
      const h = 9 + Math.random() * 34;
      const b = new THREE.Mesh(geo, mats[i % 3]);
      b.scale.set(w, h, w);
      b.position.set(Math.cos(a) * r, h / 2 - 1, Math.sin(a) * r);
      b.rotation.y = -a;
      this.scene.add(b);
      if (i % 5 === 0) {
        const beacon = new THREE.Mesh(
          new THREE.SphereGeometry(0.3, 6, 6),
          new THREE.MeshBasicMaterial({ color: 0xff2f7e, fog: false })
        );
        beacon.position.set(b.position.x, h - 0.4, b.position.z);
        this.scene.add(beacon);
        this.animated.push({ obj: beacon, type: 'beacon', base: 0, phase: i });
      }
    }
  }

  /* ------------------------------ lights ------------------------------ */
  buildLights() {
    this.scene.add(new THREE.HemisphereLight(0x6fc9ff, 0x180a28, 2.1));
    const dir = new THREE.DirectionalLight(0xbfe8ff, 2.2);
    dir.position.set(14, 26, 10);
    this.scene.add(dir);

    const fill = new THREE.PointLight(0xff2f7e, 260, 46, 2);
    fill.position.set(-18, 7, -18);
    this.scene.add(fill);

    const fill2 = new THREE.PointLight(0x45f3ff, 230, 44, 2);
    fill2.position.set(18, 6, 16);
    this.scene.add(fill2);
  }

  /* ------------------------------- API ------------------------------- */
  clampToArena(pos) {
    pos.x = Math.max(-PLAY_HALF, Math.min(PLAY_HALF, pos.x));
    pos.z = Math.max(-PLAY_HALF, Math.min(PLAY_HALF, pos.z));
  }

  resolveCircle(pos, radius) {
    this.clampToArena(pos);
    for (const c of this.colliders) {
      const nx = Math.max(c.minX, Math.min(c.maxX, pos.x));
      const nz = Math.max(c.minZ, Math.min(c.maxZ, pos.z));
      let dx = pos.x - nx;
      let dz = pos.z - nz;
      const d2 = dx * dx + dz * dz;
      if (d2 < radius * radius) {
        if (d2 > 1e-7) {
          const d = Math.sqrt(d2);
          pos.x = nx + (dx / d) * radius;
          pos.z = nz + (dz / d) * radius;
        } else {
          const left = pos.x - c.minX, right = c.maxX - pos.x;
          const top = pos.z - c.minZ, bottom = c.maxZ - pos.z;
          const m = Math.min(left, right, top, bottom);
          if (m === left) pos.x = c.minX - radius;
          else if (m === right) pos.x = c.maxX + radius;
          else if (m === top) pos.z = c.minZ - radius;
          else pos.z = c.maxZ + radius;
        }
      }
    }
    this.clampToArena(pos);
  }

  pointBlocked(x, z) {
    for (const c of this.colliders) {
      if (x > c.minX - 0.4 && x < c.maxX + 0.4 && z > c.minZ - 0.4 && z < c.maxZ + 0.4) return true;
    }
    return false;
  }

  raycastBlocked(origin, dir, dist) {
    // cheap DDA-ish sampling used for projectile / line-of-sight checks
    const steps = Math.ceil(dist / 0.7);
    for (let i = 1; i <= steps; i++) {
      const t = (i / steps) * dist;
      const x = origin.x + dir.x * t;
      const z = origin.z + dir.z * t;
      const y = origin.y + dir.y * t;
      if (y < 0 || Math.abs(x) > HALF || Math.abs(z) > HALF) return true;
      for (const c of this.colliders) {
        if (x > c.minX && x < c.maxX && z > c.minZ && z < c.maxZ && y < c.h) return true;
      }
      if (y < 0.05) return true;
    }
    return false;
  }

  getSpawnPoint(i) {
    return this.spawnPoints[i % this.spawnPoints.length];
  }

  flashSpawn(index) {
    const ring = this.spawnRings[index % this.spawnRings.length];
    if (ring) ring.active = 1.4;
  }

  update(dt, t) {
    this.time += dt;
    this.centerRing.rotation.z += dt * 0.12;
    this.centerRing2.rotation.z -= dt * 0.2;

    for (const a of this.animated) {
      if (a.type === 'holo') {
        a.obj.position.y = a.base + Math.sin(t * 0.7 + a.phase) * 0.18;
        a.obj.material.opacity = 0.58 + Math.sin(t * 2.2 + a.phase) * 0.14;
      } else if (a.type === 'beacon') {
        a.obj.material.color.setHSL(0.92, 1, 0.5 + 0.25 * (0.5 + 0.5 * Math.sin(t * 1.5 + a.phase)));
      }
    }

    for (const ring of this.spawnRings) {
      if (ring.active > 0) {
        ring.active = Math.max(0, ring.active - dt);
        const k = ring.active / 1.4;
        ring.mat.opacity = 0.15 + 0.65 * k;
        const s = 1 + (1 - k) * 1.1;
        ring.mesh.scale.set(s, s, s);
        ring.mesh.rotation.z += dt * 1.8;
      } else {
        ring.mat.opacity = Math.max(0, ring.mat.opacity - dt * 3);
      }
    }

    // dust drift
    const pos = this.dustGeo.attributes.position.array;
    for (let i = 0; i < this.dustSpeed.length; i++) {
      pos[i * 3 + 1] += this.dustSpeed[i] * dt;
      if (pos[i * 3 + 1] > 11) pos[i * 3 + 1] = 0.3;
    }
    this.dustGeo.attributes.position.needsUpdate = true;
  }
}

export { HALF, PLAY_HALF };
