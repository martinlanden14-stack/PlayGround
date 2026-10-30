import * as THREE from 'three';

/* ------------------------------------------------------------------ */
/*  Procedural textures                                                */
/* ------------------------------------------------------------------ */

export function makeCanvasTexture(w, h, draw, { srgb = true, repeat = true } = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  draw(ctx, w, h);
  const tex = new THREE.CanvasTexture(canvas);
  if (srgb) tex.colorSpace = THREE.SRGBColorSpace;
  if (repeat) {
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
  }
  tex.anisotropy = 8;
  return tex;
}

export function makeAsphaltTexture() {
  return makeCanvasTexture(512, 512, (ctx, w, h) => {
    ctx.fillStyle = '#34363d';
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 16000; i++) {
      const g = 38 + Math.random() * 46;
      ctx.fillStyle = `rgba(${g},${g},${g + 4},${0.12 + Math.random() * 0.35})`;
      const s = Math.random() * 2.2 + 0.4;
      ctx.fillRect(Math.random() * w, Math.random() * h, s, s);
    }
    // faint tire lines
    for (let i = 0; i < 6; i++) {
      const x = Math.random() * w;
      const grad = ctx.createLinearGradient(x, 0, x + 26, 0);
      grad.addColorStop(0, 'rgba(20,20,24,0)');
      grad.addColorStop(0.5, 'rgba(20,20,24,0.18)');
      grad.addColorStop(1, 'rgba(20,20,24,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(x, 0, 26, h);
    }
    // cracks
    ctx.strokeStyle = 'rgba(16,16,20,0.35)';
    ctx.lineWidth = 1.2;
    for (let i = 0; i < 14; i++) {
      ctx.beginPath();
      let x = Math.random() * w;
      let y = Math.random() * h;
      ctx.moveTo(x, y);
      for (let j = 0; j < 5; j++) {
        x += (Math.random() - 0.5) * 40;
        y += Math.random() * 26;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  });
}

export function makeGravelTexture() {
  return makeCanvasTexture(256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#5c5142';
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 5200; i++) {
      const g = 70 + Math.random() * 70;
      ctx.fillStyle = `rgba(${g},${g - 8},${g - 22},${0.25 + Math.random() * 0.5})`;
      const s = Math.random() * 3 + 0.6;
      ctx.beginPath();
      ctx.arc(Math.random() * w, Math.random() * h, s * 0.6, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}

export function makeGrassTexture() {
  return makeCanvasTexture(512, 512, (ctx, w, h) => {
    ctx.fillStyle = '#3f5133';
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 9000; i++) {
      const r = 52 + Math.random() * 40;
      const g = 74 + Math.random() * 52;
      const b = 42 + Math.random() * 30;
      ctx.fillStyle = `rgba(${r},${g},${b},${0.18 + Math.random() * 0.4})`;
      const x = Math.random() * w;
      const y = Math.random() * h;
      ctx.fillRect(x, y, 1 + Math.random() * 3, 2 + Math.random() * 5);
    }
    for (let i = 0; i < 24; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const rad = 30 + Math.random() * 90;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, rad);
      grad.addColorStop(0, 'rgba(96,116,58,0.18)');
      grad.addColorStop(1, 'rgba(96,116,58,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(x - rad, y - rad, rad * 2, rad * 2);
    }
  });
}

export function makeStripeTexture() {
  return makeCanvasTexture(64, 64, (ctx, w, h) => {
    ctx.fillStyle = '#e8e2d6';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#d8352a';
    ctx.fillRect(0, 0, w, h / 2);
    ctx.fillStyle = 'rgba(0,0,0,0.14)';
    ctx.fillRect(0, h / 2 - 2, w, 3);
  });
}

export function makeCheckerTexture() {
  return makeCanvasTexture(256, 64, (ctx, w, h) => {
    const cols = 16;
    const rows = 4;
    const cw = w / cols;
    const ch = h / rows;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        ctx.fillStyle = (x + y) % 2 === 0 ? '#f2ede2' : '#15161c';
        ctx.fillRect(x * cw, y * ch, cw, ch);
      }
    }
  });
}

function makeBannerTexture() {
  return makeCanvasTexture(1024, 128, (ctx, w, h) => {
    const grad = ctx.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0, '#141826');
    grad.addColorStop(0.5, '#1d2338');
    grad.addColorStop(1, '#141826');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    // checker edges
    const cell = 16;
    for (let x = 0; x < w; x += cell) {
      for (let y = 0; y < h; y += cell) {
        if (y < cell * 1 || y > h - cell * 1) {
          if (((x / cell) + (y / cell)) % 2 === 0) {
            ctx.fillStyle = 'rgba(242,237,226,0.9)';
            ctx.fillRect(x, y, cell, cell);
          }
        }
      }
    }
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ff7a3c';
    ctx.font = '800 52px Arial, Helvetica, sans-serif';
    ctx.fillText('SUNSET CIRCUIT', w / 2, h / 2 + 2);
    ctx.fillStyle = 'rgba(255,244,230,0.55)';
    ctx.font = '700 15px Arial, Helvetica, sans-serif';
    ctx.fillText('S T A R T   /   F I N I S H', w / 2, h / 2 + 40);
  }, { repeat: false });
}

/* ------------------------------------------------------------------ */
/*  Track                                                              */
/* ------------------------------------------------------------------ */

const POINTS = [
  [-160, 228], [-80, 232], [0, 228], [80, 236], [155, 225],
  [215, 200], [255, 160], [275, 105], [280, 45], [262, -10],
  [278, -70], [272, -130], [240, -175], [185, -198], [120, -205],
  [60, -192], [15, -160], [-20, -115], [-55, -70], [-105, -45],
  [-160, -55], [-200, -95], [-220, -150], [-228, -198], [-246, -130],
  [-250, -55], [-235, 20], [-245, 95], [-240, 165], [-215, 212]
];

export class Track {
  constructor() {
    this.points = POINTS.map(([x, z]) => new THREE.Vector3(x, 0, z));
    this.curve = new THREE.CatmullRomCurve3(this.points, true, 'catmullrom', 0.5);
    this.curve.arcLengthDivisions = 4000;
    this.length = this.curve.getLength();
    this.N = 2000;
    this.halfWidth = 7.6;
    this.runoff = 4.6;
    this.barrierOffset = this.halfWidth + this.runoff;
    this.samples = [];
    this.tangents = [];
    this.sides = [];

    for (let i = 0; i < this.N; i++) {
      const u = i / this.N;
      const p = this.curve.getPointAt(u);
      const t = this.curve.getTangentAt(u);
      t.y = 0;
      t.normalize();
      const side = new THREE.Vector3(-t.z, 0, t.x);
      this.samples.push(p);
      this.tangents.push(t);
      this.sides.push(side);
    }

    this.coarse = [];
    for (let i = 0; i < this.N; i += 5) this.coarse.push(this.samples[i]);

    this.group = new THREE.Group();
    this.group.name = 'track';
    this.startLights = [];
    this.build();
  }

  frameAt(u) {
    const n = this.N;
    const wrapped = ((u % 1) + 1) % 1;
    const f = wrapped * n;
    const i0 = Math.floor(f) % n;
    const i1 = (i0 + 1) % n;
    const a = f - Math.floor(f);
    const pos = this.samples[i0].clone().lerp(this.samples[i1], a);
    const tangent = this.tangents[i0].clone().lerp(this.tangents[i1], a).normalize();
    const side = this.sides[i0].clone().lerp(this.sides[i1], a).normalize();
    return { pos, tangent, side, index: i0, u: wrapped };
  }

  nearest(x, z, hint = null) {
    let best = -1;
    let bestD = Infinity;
    const n = this.N;
    const check = (i) => {
      const p = this.samples[i];
      const dx = p.x - x;
      const dz = p.z - z;
      const d = dx * dx + dz * dz;
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    };
    if (hint === null) {
      for (let i = 0; i < n; i += 8) check(i);
      const c = best;
      for (let o = -8; o <= 8; o++) check((c + o + n) % n);
    } else {
      for (let o = -80; o <= 80; o++) check((hint + o + n) % n);
      if (bestD > 900) {
        for (let i = 0; i < n; i += 8) check(i);
        const c = best;
        for (let o = -8; o <= 8; o++) check((c + o + n) % n);
      }
    }
    return best;
  }

  isNearTrack(x, z, radius = 16) {
    const r2 = radius * radius;
    for (let i = 0; i < this.coarse.length; i += 2) {
      const p = this.coarse[i];
      const dx = p.x - x;
      const dz = p.z - z;
      if (dx * dx + dz * dz < r2) return true;
    }
    return false;
  }

  /* ---------------- geometry helpers ---------------- */

  ribbon(offset, width, y, material, { uRepeat = 1, vScale = 8, dashed = null } = {}) {
    const n = this.N;
    const positions = [];
    const uvs = [];
    const indices = [];
    const step = this.length / n;

    const pushVertex = (p, side, s, v) => {
      positions.push(p.x + side.x * s, y, p.z + side.z * s);
      uvs.push((s > 0 ? 1 : 0) * uRepeat, v);
    };

    if (!dashed) {
      for (let i = 0; i < n; i++) {
        const p = this.samples[i];
        const side = this.sides[i];
        const v = (i * step) / vScale;
        pushVertex(p, side, offset - width / 2, v);
        pushVertex(p, side, offset + width / 2, v);
      }
      for (let i = 0; i < n; i++) {
        const a = i * 2;
        const b = i * 2 + 1;
        const c = ((i + 1) % n) * 2;
        const d = ((i + 1) % n) * 2 + 1;
        indices.push(a, b, c, b, d, c);
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
      geo.setIndex(indices);
      geo.computeVertexNormals();
      const mesh = new THREE.Mesh(geo, material);
      mesh.receiveShadow = true;
      return mesh;
    }

    for (let i = 0; i < n; i++) {
      if (i % dashed.period >= dashed.on) continue;
      const i2 = (i + 1) % n;
      const p = this.samples[i];
      const p2 = this.samples[i2];
      const s = this.sides[i];
      const s2 = this.sides[i2];
      const v = (i * step) / vScale;
      const v2 = ((i + 1) * step) / vScale;
      const base = positions.length / 3;
      pushVertex(p, s, offset - width / 2, v);
      pushVertex(p, s, offset + width / 2, v);
      pushVertex(p2, s2, offset - width / 2, v2);
      pushVertex(p2, s2, offset + width / 2, v2);
      indices.push(base, base + 1, base + 2, base + 1, base + 3, base + 2);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    const mesh = new THREE.Mesh(geo, material);
    mesh.receiveShadow = true;
    return mesh;
  }

  wall(offset, height, material) {
    const n = this.N;
    const positions = [];
    const indices = [];
    for (let i = 0; i < n; i++) {
      const p = this.samples[i];
      const s = this.sides[i];
      const x = p.x + s.x * offset;
      const z = p.z + s.z * offset;
      positions.push(x, 0.12, z);
      positions.push(x, height, z);
    }
    for (let i = 0; i < n; i++) {
      const a = i * 2;
      const b = i * 2 + 1;
      const c = ((i + 1) % n) * 2;
      const d = ((i + 1) % n) * 2 + 1;
      indices.push(a, c, b, b, c, d);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    const mesh = new THREE.Mesh(geo, material);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    return mesh;
  }

  build() {
    const asphalt = new THREE.MeshStandardMaterial({
      map: makeAsphaltTexture(),
      color: 0xbfc2c8,
      roughness: 0.88,
      metalness: 0.06,
      side: THREE.DoubleSide
    });
    asphalt.map.repeat.set(1, 1);

    const road = this.ribbon(0, this.halfWidth * 2, 0.05, asphalt, { uRepeat: 2.2, vScale: 9 });
    road.name = 'road';
    this.group.add(road);

    const gravelMat = new THREE.MeshStandardMaterial({
      map: makeGravelTexture(),
      color: 0xc9bfae,
      roughness: 1,
      metalness: 0
    });
    gravelMat.map.repeat.set(2, 2);
    for (const s of [-1, 1]) {
      const strip = this.ribbon(
        s * (this.halfWidth + this.runoff / 2),
        this.runoff,
        0.02,
        gravelMat,
        { uRepeat: 1.6, vScale: 10 }
      );
      strip.receiveShadow = true;
      this.group.add(strip);
    }

    const curbMat = new THREE.MeshStandardMaterial({
      map: makeStripeTexture(),
      color: 0xffffff,
      roughness: 0.7,
      metalness: 0.05
    });
    for (const s of [-1, 1]) {
      const curb = this.ribbon(s * (this.halfWidth + 0.35), 0.75, 0.07, curbMat, {
        uRepeat: 1,
        vScale: 2.4
      });
      this.group.add(curb);
    }

    const lineMat = new THREE.MeshStandardMaterial({
      color: 0xf6f0e2,
      roughness: 0.5,
      metalness: 0.05,
      emissive: 0x443c30,
      emissiveIntensity: 0.35
    });
    for (const s of [-1, 1]) {
      this.group.add(this.ribbon(s * (this.halfWidth - 0.55), 0.18, 0.085, lineMat, { vScale: 4 }));
    }

    const dashMat = new THREE.MeshStandardMaterial({
      color: 0xfff3df,
      roughness: 0.5,
      emissive: 0x6a5432,
      emissiveIntensity: 0.5
    });
    this.group.add(this.ribbon(0, 0.24, 0.09, dashMat, { vScale: 4, dashed: { period: 16, on: 7 } }));

    // Barriers
    const railMat = new THREE.MeshStandardMaterial({
      color: 0x9aa3b2,
      roughness: 0.38,
      metalness: 0.85,
      side: THREE.DoubleSide
    });
    const postMat = new THREE.MeshStandardMaterial({ color: 0x6d7480, roughness: 0.5, metalness: 0.7 });
    const postGeo = new THREE.BoxGeometry(0.14, 0.72, 0.14);
    const postCount = Math.floor(this.N / 9) * 2;
    const posts = new THREE.InstancedMesh(postGeo, postMat, postCount);
    posts.castShadow = true;
    posts.receiveShadow = true;
    const m = new THREE.Matrix4();
    let pi = 0;
    for (let i = 0; i < this.N; i += 9) {
      for (const s of [-1, 1]) {
        const p = this.samples[i];
        const side = this.sides[i];
        m.makeTranslation(p.x + side.x * this.barrierOffset * s, 0.38, p.z + side.z * this.barrierOffset * s);
        posts.setMatrixAt(pi++, m);
      }
    }
    posts.count = pi;
    this.group.add(posts);

    for (const s of [-1, 1]) {
      this.group.add(this.wall(s * this.barrierOffset, 0.68, railMat));
      this.group.add(this.ribbon(s * this.barrierOffset, 0.16, 0.7, railMat, { vScale: 4 }));
    }

    // Start / finish line
    const checker = makeCheckerTexture();
    const line = new THREE.Mesh(
      new THREE.PlaneGeometry(this.halfWidth * 2 - 0.2, 2.2),
      new THREE.MeshStandardMaterial({ map: checker, roughness: 0.7, metalness: 0.05 })
    );
    const f0 = this.frameAt(0);
    const flat = new THREE.Group();
    flat.position.copy(f0.pos).add(new THREE.Vector3(0, 0.1, 0));
    flat.rotation.y = Math.atan2(f0.tangent.x, f0.tangent.z);
    line.rotation.x = -Math.PI / 2;
    flat.add(line);
    this.group.add(flat);

    this.buildGantry();
  }

  buildGantry() {
    const f = this.frameAt(0);
    const g = new THREE.Group();
    g.position.copy(f.pos);
    g.rotation.y = Math.atan2(f.tangent.x, f.tangent.z);

    const pillarMat = new THREE.MeshStandardMaterial({ color: 0x232837, roughness: 0.4, metalness: 0.7 });
    const span = this.halfWidth + 2.6;
    for (const s of [-1, 1]) {
      const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.5, 7.2, 0.5), pillarMat);
      pillar.position.set(s * span, 3.6, 0);
      pillar.castShadow = true;
      g.add(pillar);
      const foot = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.3, 1.2), pillarMat);
      foot.position.set(s * span, 0.15, 0);
      g.add(foot);
    }
    const beam = new THREE.Mesh(new THREE.BoxGeometry(span * 2 + 0.5, 0.55, 0.55), pillarMat);
    beam.position.set(0, 7.0, 0);
    beam.castShadow = true;
    g.add(beam);

    const bannerTex = makeBannerTexture();
    const bannerMat = new THREE.MeshStandardMaterial({
      map: bannerTex,
      roughness: 0.65,
      metalness: 0.05,
      emissive: 0x33200f,
      emissiveIntensity: 0.55
    });
    for (const [z, ry] of [[0.03, 0], [-0.03, Math.PI]]) {
      const banner = new THREE.Mesh(new THREE.PlaneGeometry(span * 2 - 0.4, 1.5), bannerMat);
      banner.position.set(0, 6.0, z);
      banner.rotation.y = ry;
      g.add(banner);
    }

    // Start lights
    for (let i = 0; i < 3; i++) {
      const mat = new THREE.MeshStandardMaterial({
        color: 0x2a0d0d,
        emissive: 0x220404,
        emissiveIntensity: 1,
        roughness: 0.35
      });
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.24, 14, 12), mat);
      bulb.position.set((i - 1) * 1.0, 7.55, 0.3);
      g.add(bulb);
      this.startLights.push(mat);
    }

    this.group.add(g);
  }

  setStartLights(state) {
    // state: 'off' | 'red' | 'go'
    for (const mat of this.startLights) {
      if (state === 'off') {
        mat.emissive.setHex(0x220404);
        mat.emissiveIntensity = 1;
        mat.color.setHex(0x2a0d0d);
      } else if (state === 'red') {
        mat.emissive.setHex(0xff1d1d);
        mat.emissiveIntensity = 2.4;
        mat.color.setHex(0xff3333);
      } else {
        mat.emissive.setHex(0x27ff7a);
        mat.emissiveIntensity = 2.6;
        mat.color.setHex(0x4dff9c);
      }
    }
  }
}
