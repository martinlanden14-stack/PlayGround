import * as THREE from 'three';

/* ------------------------------------------------------------------
   Tiny deterministic noise toolkit used to author every texture in
   the game at runtime. No external image downloads, no loading stalls.
------------------------------------------------------------------ */
export function rng(seed = 1) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash2(x, y, seed) {
  let h = Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(seed, 1442695041);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

function lerp(a, b, t) { return a + (b - a) * t; }
function smooth(t) { return t * t * (3 - 2 * t); }

export function vnoise(x, y, seed = 1) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const u = smooth(xf), v = smooth(yf);
  return lerp(
    lerp(hash2(xi, yi, seed), hash2(xi + 1, yi, seed), u),
    lerp(hash2(xi, yi + 1, seed), hash2(xi + 1, yi + 1, seed), u),
    v
  );
}

export function fbm(x, y, octaves = 4, seed = 1) {
  let v = 0, amp = 0.5, freq = 1, total = 0;
  for (let i = 0; i < octaves; i++) {
    v += vnoise(x * freq, y * freq, seed + i * 17) * amp;
    total += amp;
    amp *= 0.5; freq *= 2.03;
  }
  return v / total;
}

function canvas(size) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  return c;
}

function tex(c, { srgb = true, repeat = 1, aniso = 4 } = {}) {
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeat, repeat);
  t.anisotropy = aniso;
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.needsUpdate = true;
  return t;
}

/* Build a color canvas + normal map + roughness canvas from a per-pixel
   shader function. `fn(x,y,size)` returns [r,g,b,height,rough]. */
function surface(size, fn, seed = 1, repeat = 1) {
  const c = canvas(size);
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(size, size);
  const rough = canvas(size);
  const rctx = rough.getContext('2d');
  const rimg = rctx.createImageData(size, size);
  const height = new Float32Array(size * size);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = y * size + x;
      const p = fn(x, y, size, seed);
      img.data[i * 4] = Math.max(0, Math.min(255, p[0]));
      img.data[i * 4 + 1] = Math.max(0, Math.min(255, p[1]));
      img.data[i * 4 + 2] = Math.max(0, Math.min(255, p[2]));
      img.data[i * 4 + 3] = 255;
      height[i] = p[3] ?? 0.5;
      const r = Math.max(0, Math.min(255, (p[4] ?? 0.8) * 255));
      rimg.data[i * 4] = r;
      rimg.data[i * 4 + 1] = r;
      rimg.data[i * 4 + 2] = r;
      rimg.data[i * 4 + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  rctx.putImageData(rimg, 0, 0);

  // Sobel-ish normal map from the height buffer.
  const n = canvas(size);
  const nctx = n.getContext('2d');
  const nimg = nctx.createImageData(size, size);
  const at = (x, y) => height[((y + size) % size) * size + ((x + size) % size)];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = (at(x + 1, y) - at(x - 1, y)) * 2.2;
      const dy = (at(x, y + 1) - at(x, y - 1)) * 2.2;
      const len = Math.hypot(dx, dy, 1);
      const i = (y * size + x) * 4;
      nimg.data[i] = ((dx / len) * 0.5 + 0.5) * 255;
      nimg.data[i + 1] = ((dy / len) * 0.5 + 0.5) * 255;
      nimg.data[i + 2] = ((1 / len) * 0.5 + 0.5) * 255;
      nimg.data[i + 3] = 255;
    }
  }
  nctx.putImageData(nimg, 0, 0);

  return {
    map: tex(c, { repeat }),
    roughnessMap: tex(rough, { srgb: false, repeat }),
    normalMap: tex(n, { srgb: false, repeat }),
  };
}

/* ------------------------------- surfaces ------------------------------- */
export function asphalt() {
  return surface(512, (x, y, s, seed) => {
    const u = x / s, v = y / s;
    const broad = fbm(u * 4, v * 4, 5, seed);
    const fine = fbm(u * 38, v * 38, 3, seed + 9);
    const grain = hash2(x, y, seed + 3);
    const ridge = Math.abs(fbm(u * 9, v * 9, 4, seed + 4) - 0.5);
    const crack = ridge < 0.008 ? 1 : ridge < 0.02 ? 0.35 : 0;
    const puddle = Math.max(0, fbm(u * 2.3 + 10, v * 2.3, 4, seed + 7) - 0.56) * 2.6;
    let base = 20 + broad * 18 + fine * 7;
    base += grain > 0.982 ? 24 : grain > 0.93 ? 5 : 0;
    base -= crack * 13;
    const wet = Math.min(1, puddle) * 0.5;
    const r = base * (0.92 - wet * 0.3);
    const g = base * (0.97 - wet * 0.25);
    const b = base * (1.05 - wet * 0.1);
    const height = 0.48 + fine * 0.22 + grain * 0.12 - crack * 0.35 - wet * 0.16;
    const rough = 0.86 - Math.min(1, puddle) * 0.68 + fine * 0.08;
    return [r, g, b, height, rough];
  }, 12, 9);
}

export function concrete() {
  return surface(512, (x, y, s, seed) => {
    const u = x / s, v = y / s;
    const broad = fbm(u * 5, v * 5, 5, seed);
    const fine = fbm(u * 30, v * 30, 3, seed + 11);
    const grain = hash2(x, y, seed + 2);
    const streak = Math.max(0, fbm(u * 16, v * 2.2, 4, seed + 5) - 0.5) * 1.8;
    const seam = (y % 128 < 2 || x % 256 < 2) ? 0.55 : 0;
    const chip = grain > 0.985 ? 1 : 0;
    let base = 58 + broad * 42 + fine * 12;
    base -= streak * 26;
    base -= seam * 24;
    base += chip * 20;
    const height = 0.5 + fine * 0.14 + broad * 0.1 - seam * 0.4 - streak * 0.1 + chip * 0.1;
    const rough = 0.88 - streak * 0.15 + fine * 0.06;
    return [base * 1.01, base, base * 0.95, height, rough];
  }, 21, 4);
}

export function rustMetal() {
  return surface(512, (x, y, s, seed) => {
    const u = x / s, v = y / s;
    const broad = fbm(u * 4, v * 4, 5, seed);
    const fine = fbm(u * 28, v * 28, 4, seed + 8);
    const grain = hash2(x, y, seed + 12);
    const rust = Math.max(0, fbm(u * 7 + 2, v * 7, 4, seed + 3) - 0.42) * 1.8;
    const scratch = Math.abs(fbm(u * 70, v * 4, 2, seed + 1) - 0.5) < 0.012 ? 1 : 0;
    const r = 46 + broad * 22 + rust * 74 + fine * 14 - scratch * 16;
    const g = 48 + broad * 22 + rust * 38 + fine * 14 - scratch * 16;
    const b = 50 + broad * 24 + rust * 8 + fine * 14 - scratch * 16;
    const height = 0.46 + fine * 0.16 + rust * 0.22 + grain * 0.06 - scratch * 0.1;
    return [r, g, b, height, 0.62 - rust * 0.15 + fine * 0.1];
  }, 33, 3);
}

export function wood() {
  return surface(512, (x, y, s, seed) => {
    const u = x / s, v = y / s;
    const plank = Math.floor(v * 8);
    const seam = Math.abs((v * 8) % 1 - 0.5) > 0.47 ? 1 : 0;
    const grain = fbm(u * 3 + plank * 4, v * 44, 4, seed + plank);
    const knot = Math.max(0, fbm(u * 5, v * 5, 3, seed + 99) - 0.72) * 3;
    const base = 56 + grain * 46 + knot * 22 - seam * 26;
    const height = 0.5 + grain * 0.14 - seam * 0.4 + knot * 0.12;
    return [base * 1.05, base * 0.78, base * 0.48, height, 0.82 - grain * 0.1];
  }, 44, 2);
}

export function containerSide(hue = 'teal') {
  const palette = hue === 'red' ? [86, 34, 30] : hue === 'blue' ? [30, 52, 72] : [26, 66, 62];
  return surface(512, (x, y, s, seed) => {
    const u = x / s, v = y / s;
    const rib = Math.sin(u * Math.PI * 2 * 16) * 0.5 + 0.5;
    const rust = Math.max(0, fbm(u * 5 + 3, v * 5, 5, seed) - 0.52) * 2.4;
    const fine = fbm(u * 36, v * 36, 3, seed + 2);
    const scratch = Math.abs(fbm(u * 50, v * 6, 2, seed + 4) - 0.5) < 0.01 ? 1 : 0;
    const shade = 0.72 + rib * 0.3;
    const r = palette[0] * shade + rust * 62 + fine * 8 - scratch * 20;
    const g = palette[1] * shade + rust * 26 + fine * 8 - scratch * 20;
    const b = palette[2] * shade + rust * 6 + fine * 8 - scratch * 20;
    const height = 0.5 + rib * 0.32 + fine * 0.08 + rust * 0.1;
    return [r, g, b, height, 0.66 + fine * 0.12 - rust * 0.2];
  }, 55, 1);
}

export function chainlink() {
  const s = 256;
  const c = canvas(s);
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, s, s);
  ctx.strokeStyle = 'rgba(176, 184, 178, 0.95)';
  ctx.lineWidth = 3;
  const step = 32;
  ctx.beginPath();
  for (let i = -s; i < s * 2; i += step) {
    ctx.moveTo(i, 0); ctx.lineTo(i + s, s);
    ctx.moveTo(i, s); ctx.lineTo(i + s, 0);
  }
  ctx.stroke();
  ctx.strokeStyle = 'rgba(120, 128, 124, 0.6)';
  ctx.lineWidth = 1;
  ctx.stroke();
  const t = tex(c, { repeat: 6 });
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

export function fabric() {
  return surface(256, (x, y, s, seed) => {
    const u = x / s, v = y / s;
    const broad = fbm(u * 7, v * 7, 4, seed + 2);
    const fine = fbm(u * 52, v * 52, 2, seed + 8);
    const weave = (Math.sin(x * 2.6) * Math.sin(y * 2.6) + 1) * 0.5;
    const wear = Math.max(0, fbm(u * 12 + 4, v * 4, 4, seed + 13) - 0.5) * 1.9;
    const blood = Math.max(0, fbm(u * 3.5 + 12, v * 3.5, 4, seed + 19) - 0.61) * 3.2;
    let base = 34 + broad * 16 + fine * 8 + weave * 5;
    base -= wear * 18;
    const r = base * (0.96 + blood * 0.75);
    const g = base * (0.99 - blood * 0.55);
    const b = base * (0.93 - blood * 0.62);
    const height = 0.5 + weave * 0.12 + fine * 0.06 - wear * 0.1;
    const rough = 0.94 - blood * 0.28 + fine * 0.03;
    return [r, g, b, height, rough];
  }, 33, 1);
}

export function bloodSplat() {
  const s = 256;
  const c = canvas(s);
  const ctx = c.getContext('2d');
  const r = rng(71);
  ctx.clearRect(0, 0, s, s);
  const cx = s / 2, cy = s / 2;
  // main pool
  for (let i = 0; i < 26; i++) {
    const a = r() * Math.PI * 2;
    const d = r() * 26;
    const rad = 8 + r() * 24;
    const grd = ctx.createRadialGradient(cx + Math.cos(a) * d, cy + Math.sin(a) * d, 0, cx + Math.cos(a) * d, cy + Math.sin(a) * d, rad);
    grd.addColorStop(0, 'rgba(74, 4, 6, 0.95)');
    grd.addColorStop(0.65, 'rgba(102, 8, 10, 0.7)');
    grd.addColorStop(1, 'rgba(70, 3, 5, 0)');
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(cx + Math.cos(a) * d, cy + Math.sin(a) * d, rad, 0, Math.PI * 2);
    ctx.fill();
  }
  // droplets
  for (let i = 0; i < 90; i++) {
    const a = r() * Math.PI * 2;
    const d = 18 + Math.pow(r(), 0.6) * 106;
    const rad = 0.6 + r() * 3.8;
    ctx.fillStyle = `rgba(${58 + r() * 50 | 0}, ${3 + r() * 8 | 0}, ${4 + r() * 6 | 0}, ${0.55 + r() * 0.45})`;
    ctx.beginPath();
    ctx.ellipse(cx + Math.cos(a) * d, cy + Math.sin(a) * d, rad, rad * (1 + r() * 2.4), a, 0, Math.PI * 2);
    ctx.fill();
  }
  // drips
  for (let i = 0; i < 10; i++) {
    const x = cx + (r() - 0.5) * 70;
    const y = cy + 10;
    const len = 20 + r() * 58;
    const grd = ctx.createLinearGradient(x, y, x, y + len);
    grd.addColorStop(0, 'rgba(90, 6, 8, 0.8)');
    grd.addColorStop(1, 'rgba(90, 6, 8, 0)');
    ctx.strokeStyle = grd;
    ctx.lineWidth = 1.5 + r() * 3;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + (r() - 0.5) * 8, y + len * 0.6, x + (r() - 0.5) * 10, y + len); ctx.stroke();
  }
  const t = tex(c, { repeat: 1 });
  t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  return t;
}

export function bulletHole() {
  const s = 128;
  const c = canvas(s);
  const ctx = c.getContext('2d');
  const r = rng(13);
  const grd = ctx.createRadialGradient(64, 64, 2, 64, 64, 20);
  grd.addColorStop(0, 'rgba(4,4,4,0.98)');
  grd.addColorStop(0.55, 'rgba(12,12,12,0.9)');
  grd.addColorStop(1, 'rgba(20,20,20,0)');
  ctx.fillStyle = grd;
  ctx.beginPath(); ctx.arc(64, 64, 20, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = 'rgba(160,160,150,0.28)';
  for (let i = 0; i < 10; i++) {
    const a = r() * Math.PI * 2;
    const l = 8 + r() * 24;
    ctx.lineWidth = 0.6 + r() * 1.2;
    ctx.beginPath();
    ctx.moveTo(64 + Math.cos(a) * 7, 64 + Math.sin(a) * 7);
    ctx.lineTo(64 + Math.cos(a) * l, 64 + Math.sin(a) * l);
    ctx.stroke();
  }
  const t = tex(c, { repeat: 1 });
  t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  return t;
}

export function softParticle(color = '255,255,255') {
  const s = 128;
  const c = canvas(s);
  const ctx = c.getContext('2d');
  const grd = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, `rgba(${color},1)`);
  grd.addColorStop(0.25, `rgba(${color},0.55)`);
  grd.addColorStop(0.65, `rgba(${color},0.12)`);
  grd.addColorStop(1, `rgba(${color},0)`);
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, s, s);
  const t = tex(c, { repeat: 1 });
  t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  return t;
}

export function muzzleFlash() {
  const s = 256;
  const c = canvas(s);
  const ctx = c.getContext('2d');
  const r = rng(9);
  ctx.translate(128, 128);
  ctx.globalCompositeOperation = 'lighter';
  // hot core
  const core = ctx.createRadialGradient(0, 0, 0, 0, 0, 64);
  core.addColorStop(0, 'rgba(255,255,240,1)');
  core.addColorStop(0.18, 'rgba(255,226,150,0.95)');
  core.addColorStop(0.5, 'rgba(255,140,40,0.42)');
  core.addColorStop(1, 'rgba(255,80,10,0)');
  ctx.fillStyle = core;
  ctx.beginPath(); ctx.arc(0, 0, 64, 0, Math.PI * 2); ctx.fill();
  // spikes
  for (let i = 0; i < 13; i++) {
    const a = (i / 13) * Math.PI * 2 + r() * 0.3;
    const len = 52 + r() * 76;
    const w = 4 + r() * 9;
    ctx.save();
    ctx.rotate(a);
    const g = ctx.createLinearGradient(0, 0, len, 0);
    g.addColorStop(0, 'rgba(255,240,190,0.9)');
    g.addColorStop(0.35, 'rgba(255,160,50,0.5)');
    g.addColorStop(1, 'rgba(255,90,20,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(0, -w); ctx.lineTo(len, 0); ctx.lineTo(0, w); ctx.closePath(); ctx.fill();
    ctx.restore();
  }
  const t = tex(c, { repeat: 1 });
  t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  return t;
}

export function signTexture(lines, { accent = '#d8c33a', bg = '#15181a', border = true, sub = '' } = {}) {
  const w = 512, h = 256;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
  // grime
  for (let i = 0; i < 1400; i++) {
    ctx.fillStyle = `rgba(${120 + Math.random() * 40 | 0},${118 + Math.random() * 40 | 0},${100 + Math.random() * 30 | 0},${Math.random() * 0.05})`;
    ctx.fillRect(Math.random() * w, Math.random() * h, Math.random() * 22, Math.random() * 5);
  }
  if (border) {
    ctx.strokeStyle = accent; ctx.lineWidth = 5;
    ctx.strokeRect(14, 14, w - 28, h - 28);
    ctx.strokeStyle = 'rgba(255,255,255,0.12)'; ctx.lineWidth = 1;
    ctx.strokeRect(24, 24, w - 48, h - 48);
  }
  ctx.fillStyle = accent;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const size = lines.length > 1 ? 58 : 76;
  ctx.font = `700 ${size}px "Arial Narrow", Impact, sans-serif`;
  lines.forEach((line, i) => {
    ctx.fillText(line, w / 2, h / 2 + (i - (lines.length - 1) / 2) * (size + 8));
  });
  if (sub) {
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.font = '700 22px monospace';
    ctx.fillText(sub, w / 2, h - 42);
  }
  // scratches
  ctx.strokeStyle = 'rgba(0,0,0,0.35)';
  for (let i = 0; i < 22; i++) {
    ctx.lineWidth = Math.random() * 1.5;
    ctx.beginPath();
    const x = Math.random() * w, y = Math.random() * h;
    ctx.moveTo(x, y); ctx.lineTo(x + (Math.random() - 0.5) * 90, y + (Math.random() - 0.5) * 24); ctx.stroke();
  }
  const t = tex(c, { repeat: 1 });
  t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  return t;
}

export function hazardStripe() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#b99a20'; ctx.fillRect(0, 0, 128, 128);
  ctx.fillStyle = '#111';
  for (let i = -128; i < 256; i += 36) {
    ctx.beginPath();
    ctx.moveTo(i, 0); ctx.lineTo(i + 18, 0); ctx.lineTo(i + 18 - 128, 128); ctx.lineTo(i - 128, 128); ctx.closePath();
    ctx.fill();
  }
  for (let i = 0; i < 200; i++) {
    ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.12})`;
    ctx.fillRect(Math.random() * 128, Math.random() * 128, Math.random() * 12, Math.random() * 4);
  }
  return tex(c, { repeat: 1 });
}

export function smokeTexture() {
  return softParticle('190,200,205');
}
