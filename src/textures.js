import * as THREE from 'three';

let glowCache = null;
let gridCache = null;
let shadowCache = null;
let targetCache = null;

/** Soft radial glow used by particles, sprites and enemy auras. */
export function glowTexture() {
  if (glowCache) return glowCache;
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.18, 'rgba(255,255,255,0.92)');
  g.addColorStop(0.42, 'rgba(255,255,255,0.32)');
  g.addColorStop(0.72, 'rgba(255,255,255,0.06)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  glowCache = new THREE.CanvasTexture(canvas);
  glowCache.colorSpace = THREE.SRGBColorSpace;
  glowCache.needsUpdate = true;
  return glowCache;
}

/** Dark tech grid for the arena floor. */
export function gridTexture() {
  if (gridCache) return gridCache;
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');

  const bg = ctx.createRadialGradient(size / 2, size / 2, 30, size / 2, size / 2, size * 0.72);
  bg.addColorStop(0, '#0b1a2e');
  bg.addColorStop(0.55, '#07101f');
  bg.addColorStop(1, '#040912');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, size, size);

  ctx.strokeStyle = 'rgba(53, 240, 255, 0.055)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= size; i += 16) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, size); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(size, i); ctx.stroke();
  }

  ctx.strokeStyle = 'rgba(53, 240, 255, 0.30)';
  ctx.lineWidth = 2;
  for (let i = 0; i <= size; i += 128) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, size); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(size, i); ctx.stroke();
  }

  ctx.strokeStyle = 'rgba(255, 45, 155, 0.14)';
  ctx.lineWidth = 1;
  for (let i = 64; i < size; i += 128) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, size); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(size, i); ctx.stroke();
  }

  // little node markers at intersections
  ctx.fillStyle = 'rgba(143, 249, 255, 0.35)';
  for (let x = 0; x <= size; x += 128) {
    for (let y = 0; y <= size; y += 128) {
      ctx.fillRect(x - 1.5, y - 1.5, 3, 3);
    }
  }

  gridCache = new THREE.CanvasTexture(canvas);
  gridCache.colorSpace = THREE.SRGBColorSpace;
  gridCache.wrapS = gridCache.wrapT = THREE.RepeatWrapping;
  gridCache.repeat.set(6, 6);
  gridCache.anisotropy = 4;
  gridCache.needsUpdate = true;
  return gridCache;
}

/** Faint round blob shadow. */
export function shadowTexture() {
  if (shadowCache) return shadowCache;
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(0,0,0,0.7)');
  g.addColorStop(0.55, 'rgba(0,0,0,0.35)');
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  shadowCache = new THREE.CanvasTexture(canvas);
  return shadowCache;
}


/** Corner brackets for the aim-assist lock-on reticle. */
export function targetTexture() {
  if (targetCache) return targetCache;
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.strokeStyle = 'rgba(255,255,255,0.95)';
  ctx.lineWidth = 5;
  const pad = 12;
  const len = 26;
  const corners = [
    [pad, pad, 1, 1],
    [size - pad, pad, -1, 1],
    [pad, size - pad, 1, -1],
    [size - pad, size - pad, -1, -1],
  ];
  for (const [x, y, sx, sy] of corners) {
    ctx.beginPath();
    ctx.moveTo(x + sx * len, y);
    ctx.lineTo(x, y);
    ctx.lineTo(x, y + sy * len);
    ctx.stroke();
  }
  // center tick
  ctx.strokeStyle = 'rgba(255,255,255,0.6)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(size / 2 - 7, size / 2);
  ctx.lineTo(size / 2 + 7, size / 2);
  ctx.stroke();
  targetCache = new THREE.CanvasTexture(canvas);
  targetCache.colorSpace = THREE.SRGBColorSpace;
  return targetCache;
}
