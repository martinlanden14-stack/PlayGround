// Canvas renderer: cached procedural terrain, layered sprite art, weather and lighting.
import { TILE, TERRAIN_BY_ID, BUILDINGS, ITEMS, WEAPONS } from './defs.js';
import { clamp, lerp, hash2, mulberry32, mix, shade, rgba, TAU, roundRect, poly } from './util.js';

const P = Math.PI;

export class Renderer {
  constructor(canvas, world) {
    this.canvas = canvas;
    this.world = world;
    this.ctx = canvas.getContext('2d', { alpha: false });
    this.lightCanvas = document.createElement('canvas');
    this.lightCtx = this.lightCanvas.getContext('2d');
    this.dpr = Math.min(2, window.devicePixelRatio || 1);
    this.w = 0; this.h = 0;
    this.camera = { x: 31.5, y: 31.5, zoom: 1.15, tx: 31.5, ty: 31.5, tzoom: 1.15 };
    this.hover = null;
    this.selected = new Set();
    this.tool = null;
    this.zonePreview = null;
    this.marquee = null;
    this.showPaths = true;
    this.weatherOff = false;
    this.waterPhase = 0;
    this.time = 0;
    this.terrainCanvas = document.createElement('canvas');
    this.terrainCanvas.width = world.W * TILE;
    this.terrainCanvas.height = world.H * TILE;
    this.tctx = this.terrainCanvas.getContext('2d');
    this.miniBase = document.createElement('canvas');
    this.miniBase.width = 192; this.miniBase.height = 192;
    this.mctx = this.miniBase.getContext('2d');
    this.dirty = { x0: 0, y0: 0, x1: world.W, y1: world.H, all: true };
    this.clouds = [
      { x: 10, y: 12, r: 140, sx: 1.5, sy: 0.6 },
      { x: 42, y: 34, r: 180, sx: 1.1, sy: 0.9 },
      { x: 25, y: 50, r: 120, sx: 1.8, sy: 0.5 },
    ];
    this.fireflies = [];
    for (let i = 0; i < 26; i++) {
      this.fireflies.push({ x: 16 + Math.random() * 38, y: 18 + Math.random() * 30, phase: Math.random() * TAU, speed: 0.3 + Math.random() * 0.6 });
    }
    this.birds = [];
    this.birdTimer = 8;
    this.palettes = [];
    this.buildPalettes();
    this.resize();
    this.renderFullTerrain();
    world.on('terrain', (r) => this.markDirty(r));
    this.vignette = null;
  }

  buildPalettes() {
    for (let id = 0; id < TERRAIN_BY_ID.length; id++) {
      const def = TERRAIN_BY_ID[id];
      if (!def) { this.palettes.push([]); continue; }
      const arr = [];
      for (let i = 0; i < 9; i++) {
        const t = (i - 4) / 4;
        let c = shade(def.base, t * 0.045);
        if (i % 3 === 0) c = mix(def.base, def.alt, 0.35);
        arr.push(c);
      }
      this.palettes.push(arr);
    }
  }

  // ---------------------------------------------------------------- view
  resize() {
    this.dpr = Math.min(2, window.devicePixelRatio || 1);
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.canvas.width = Math.round(this.w * this.dpr);
    this.canvas.height = Math.round(this.h * this.dpr);
    this.canvas.style.width = this.w + 'px';
    this.canvas.style.height = this.h + 'px';
    this.lightCanvas.width = Math.max(2, Math.round(this.w * 0.5));
    this.lightCanvas.height = Math.max(2, Math.round(this.h * 0.5));
    this.vignette = null;
  }
  clampCamera() {
    const c = this.camera;
    const hw = this.w / (2 * c.zoom * TILE);
    const hh = this.h / (2 * c.zoom * TILE);
    if (hw * 2 > this.world.W) c.x = this.world.W / 2;
    else c.x = clamp(c.x, hw - 1, this.world.W - hw + 1);
    if (hh * 2 > this.world.H) c.y = this.world.H / 2;
    else c.y = clamp(c.y, hh - 1, this.world.H - hh + 1);
  }
  focus(x, y, zoom) {
    this.camera.tx = x; this.camera.ty = y;
    if (zoom) this.camera.tzoom = clamp(zoom, 0.58, 2.9);
  }
  panBy(dxScreen, dyScreen) {
    const c = this.camera;
    c.tx -= dxScreen / (c.zoom * TILE);
    c.ty -= dyScreen / (c.zoom * TILE);
    c.x = c.tx; c.y = c.ty;
    this.clampCamera();
    c.tx = c.x; c.ty = c.y;
  }
  zoomAt(sx, sy, factor) {
    const c = this.camera;
    const before = this.screenToWorld(sx, sy);
    c.tzoom = clamp(c.tzoom * factor, 0.58, 2.9);
    c.zoom = c.tzoom;
    c.x = c.tx; c.y = c.ty;
    const after = this.screenToWorld(sx, sy);
    c.tx += before.x - after.x; c.ty += before.y - after.y;
    c.x = c.tx; c.y = c.ty;
    this.clampCamera();
    c.tx = c.x; c.ty = c.y;
  }
  screenToWorld(sx, sy) {
    const c = this.camera;
    return {
      x: ((sx - this.w / 2) / c.zoom + c.x * TILE) / TILE,
      y: ((sy - this.h / 2) / c.zoom + c.y * TILE) / TILE,
    };
  }
  worldToScreen(x, y) {
    const c = this.camera;
    return {
      x: (x * TILE - c.x * TILE) * c.zoom + this.w / 2,
      y: (y * TILE - c.y * TILE) * c.zoom + this.h / 2,
    };
  }
  view() {
    const c = this.camera;
    const hw = this.w / (2 * c.zoom * TILE);
    const hh = this.h / (2 * c.zoom * TILE);
    return {
      x0: Math.floor(c.x - hw) - 2, y0: Math.floor(c.y - hh) - 2,
      x1: Math.ceil(c.x + hw) + 2, y1: Math.ceil(c.y + hh) + 2,
    };
  }

  // ---------------------------------------------------------------- terrain cache
  markDirty(r) {
    if (!this.dirty) return;
    if (r.x0 <= this.dirty.x0 && r.y0 <= this.dirty.y0 && r.x1 >= this.dirty.x1 && r.y1 >= this.dirty.y1) return;
    if (this.dirty.all) { this.dirty = { ...r }; this.dirty.all = false; return; }
    this.dirty.x0 = Math.min(this.dirty.x0, r.x0);
    this.dirty.y0 = Math.min(this.dirty.y0, r.y0);
    this.dirty.x1 = Math.max(this.dirty.x1, r.x1);
    this.dirty.y1 = Math.max(this.dirty.y1, r.y1);
  }
  renderFullTerrain() {
    this.tctx.clearRect(0, 0, this.terrainCanvas.width, this.terrainCanvas.height);
    this.renderTerrainRegion(0, 0, this.world.W - 1, this.world.H - 1, false);
    this.renderMinimapBase();
    this.dirty = null;
  }
  renderTerrainRegion(x0, y0, x1, y1, clip = true) {
    const w = this.world, ctx = this.tctx;
    x0 = Math.max(0, x0 - 1); y0 = Math.max(0, y0 - 1);
    x1 = Math.min(w.W - 1, x1 + 1); y1 = Math.min(w.H - 1, y1 + 1);
    if (clip) {
      ctx.save();
      ctx.beginPath();
      ctx.rect((x0 - 0.4) * TILE, (y0 - 0.4) * TILE, (x1 - x0 + 1.8) * TILE, (y1 - y0 + 1.8) * TILE);
      ctx.clip();
      ctx.clearRect((x0 - 0.4) * TILE, (y0 - 0.4) * TILE, (x1 - x0 + 1.8) * TILE, (y1 - y0 + 1.8) * TILE);
    }
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) this.drawTerrainBase(ctx, x, y);
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) this.drawTerrainEdges(ctx, x, y);
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) this.drawTerrainDetail(ctx, x, y);
    if (clip) ctx.restore();
  }

  drawTerrainBase(ctx, x, y) {
    const w = this.world;
    const t = w.terrain[w.idx(x, y)];
    const px = x * TILE, py = y * TILE;
    const pal = this.palettes[t] || this.palettes[0];
    const ci = Math.floor(hash2(x, y, 7) * pal.length);
    ctx.fillStyle = pal[ci];
    ctx.fillRect(px, py, TILE + 0.5, TILE + 0.5);
    // Broad organic tinting so large areas breathe.
    if (t === 0) {
      const n = hash2(x >> 2, y >> 2, 13);
      if (n > 0.58) { ctx.fillStyle = `rgba(43,65,30,${0.05 + n * 0.05})`; ctx.fillRect(px, py, TILE + 0.5, TILE + 0.5); }
      else if (n < 0.2) { ctx.fillStyle = 'rgba(150,170,90,0.045)'; ctx.fillRect(px, py, TILE + 0.5, TILE + 0.5); }
    }
    if (t === 1) {
      const n = hash2(x >> 2, y >> 2, 22);
      if (n > 0.7) { ctx.fillStyle = 'rgba(90,73,51,0.14)'; ctx.fillRect(px, py, TILE + 0.5, TILE + 0.5); }
    }
  }

  drawTerrainEdges(ctx, x, y) {
    const w = this.world;
    const t = w.terrain[w.idx(x, y)];
    const def = TERRAIN_BY_ID[t];
    if (!def) return;
    const px = x * TILE, py = y * TILE;
    const dirs = [[0, -1], [1, 0], [0, 1], [-1, 0]];
    for (const [dx, dy] of dirs) {
      const nx = x + dx, ny = y + dy;
      if (!w.inBounds(nx, ny)) continue;
      const nt = w.terrain[w.idx(nx, ny)];
      if (nt === t) continue;
      const ndef = TERRAIN_BY_ID[nt];
      if (!ndef) continue;

      // Water/land shoreline.
      if (nt === 4 && t !== 4) {
        ctx.fillStyle = 'rgba(27,43,39,0.30)';
        this.edgeRect(ctx, px, py, dx, dy, 0, 3);
        ctx.fillStyle = 'rgba(120,160,150,0.10)';
        this.edgeRect(ctx, px, py, dx, dy, 3, 2);
        continue;
      }
      if (t === 4 && nt !== 4) {
        ctx.fillStyle = 'rgba(190,220,205,0.20)';
        for (let i = 0; i < 6; i++) {
          const r = hash2(x * 13 + i, y * 7 + i, 31);
          const along = 3 + i * 5 + r * 3;
          this.edgeRect(ctx, px, py, dx, dy, 1 + r * 2, 1.4, along, 1.6);
        }
        ctx.fillStyle = 'rgba(19,38,42,0.25)';
        this.edgeRect(ctx, px, py, dx, dy, 6, 2.5);
        continue;
      }

      // Floors get a crisp edge with a soft shadow.
      if (def.rank === 8 && ndef.rank !== 8) {
        ctx.fillStyle = 'rgba(0,0,0,0.24)';
        this.edgeRect(ctx, px, py, dx, dy, 0, 2.2);
        continue;
      }
      if (ndef.rank === 8) {
        ctx.fillStyle = 'rgba(0,0,0,0.12)';
        this.edgeRect(ctx, px, py, dx, dy, 0, 2.6);
        continue;
      }

      // Higher-ranked neighbouring terrain spills into this tile with an organic edge.
      if (ndef.rank > def.rank && ndef.rank < 6) {
        const pal = this.palettes[nt] || this.palettes[0];
        for (let i = 0; i < 32; i += 2) {
          const r = hash2(x * 37 + i, y * 41 + i, 5);
          const depth = 0.8 + r * 2.6 + (hash2(i, y, 17) > 0.8 ? 1.5 : 0);
          ctx.globalAlpha = 0.65 + r * 0.3;
          ctx.fillStyle = pal[Math.floor(r * pal.length)];
          this.edgeRect(ctx, px, py, dx, dy, depth, 2.2, i, 2.2);
        }
        ctx.globalAlpha = 1;
        for (let i = 0; i < 7; i++) {
          const r = hash2(x * 7 + i, y * 11 + i, 9);
          const along = 3 + r * 26;
          const depth = 3 + hash2(i, x + y, 12) * 5;
          ctx.globalAlpha = 0.4 + r * 0.3;
          ctx.fillStyle = pal[Math.floor(r * pal.length)];
          this.edgeRect(ctx, px, py, dx, dy, depth, 1.5 + r * 2.4, along, 2 + r * 2.5);
        }
        ctx.globalAlpha = 1;
      }
    }
  }

  edgeRect(ctx, px, py, dx, dy, depth, thickness, along = 0, alongSize = TILE) {
    // depth is inward from the shared edge; along is offset from the start corner.
    if (dx === 1) ctx.fillRect(px + TILE - depth - thickness, py + along, thickness, alongSize);
    else if (dx === -1) ctx.fillRect(px + depth, py + along, thickness, alongSize);
    else if (dy === 1) ctx.fillRect(px + along, py + TILE - depth - thickness, alongSize, thickness);
    else if (dy === -1) ctx.fillRect(px + along, py + depth, alongSize, thickness);
  }

  drawTerrainDetail(ctx, x, y) {
    const w = this.world;
    const t = w.terrain[w.idx(x, y)];
    const px = x * TILE, py = y * TILE;
    const h = (i) => hash2(x * 91 + i, y * 57 + i, 3);
    if (t === 0) {
      for (let i = 0; i < 4; i++) {
        const r = h(i);
        const bx = px + 3 + h(i + 11) * 26, by = py + 5 + h(i + 23) * 24;
        const len = 3 + r * 5;
        ctx.strokeStyle = r > 0.55 ? 'rgba(44,68,31,0.55)' : 'rgba(132,158,84,0.42)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.quadraticCurveTo(bx + (h(i + 4) - 0.5) * 3, by - len * 0.6, bx + (h(i + 5) - 0.5) * 6, by - len);
        ctx.stroke();
      }
      if (h(31) > 0.94) {
        const bx = px + 8 + h(32) * 16, by = py + 8 + h(33) * 16;
        const colors = ['#e8dfb0', '#e3b7c2', '#c9b4e0', '#f0d07a'];
        const c = colors[Math.floor(h(34) * colors.length)];
        ctx.fillStyle = 'rgba(54,72,40,0.7)';
        ctx.fillRect(bx, by + 2, 1, 3);
        ctx.fillStyle = c;
        for (let k = 0; k < 4; k++) {
          const a = (k / 4) * TAU;
          ctx.beginPath(); ctx.arc(bx + Math.cos(a) * 1.4, by + Math.sin(a) * 1.4, 1.1, 0, TAU); ctx.fill();
        }
        ctx.fillStyle = '#e8c96a'; ctx.beginPath(); ctx.arc(bx, by, 0.9, 0, TAU); ctx.fill();
      }
      if (h(41) > 0.9) {
        ctx.fillStyle = 'rgba(92,105,72,0.35)';
        const bx = px + 4 + h(42) * 24, by = py + 5 + h(43) * 22;
        ctx.beginPath(); ctx.ellipse(bx, by, 2.4, 1.3, h(44) * 2, 0, TAU); ctx.fill();
      }
      if (h(51) > 0.965) {
        ctx.strokeStyle = 'rgba(62,58,40,0.5)'; ctx.lineWidth = 1;
        const bx = px + h(52) * 28, by = py + h(53) * 28;
        ctx.beginPath(); ctx.arc(bx, by, 1.8, 0, TAU); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(bx, by - 3); ctx.lineTo(bx + 1.4, by - 5); ctx.stroke();
      }
    } else if (t === 1) {
      for (let i = 0; i < 11; i++) {
        const bx = px + h(i) * 31, by = py + h(i + 20) * 31;
        const r = h(i + 50);
        if (r > 0.72) {
          ctx.fillStyle = 'rgba(70,57,38,0.45)'; ctx.fillRect(bx, by, 1.5 + r * 2, 1.2);
          ctx.fillStyle = 'rgba(145,125,92,0.35)'; ctx.fillRect(bx, by - 1, 1, 1);
        } else {
          ctx.fillStyle = r > 0.35 ? 'rgba(96,79,55,0.5)' : 'rgba(134,113,80,0.4)';
          ctx.fillRect(bx, by, 1.5, 1.5);
        }
      }
      if (h(70) > 0.82) {
        ctx.strokeStyle = 'rgba(82,66,44,0.4)'; ctx.lineWidth = 1;
        const bx = px + h(71) * 20, by = py + h(72) * 20;
        ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + 4 + h(73) * 5, by + 2 + h(74) * 3); ctx.stroke();
      }
    } else if (t === 2) {
      for (let i = 0; i < 14; i++) {
        const bx = px + 2 + h(i) * 28, by = py + 2 + h(i + 17) * 28;
        const r = h(i + 60), s = 1 + r * 2.4;
        ctx.fillStyle = r > 0.5 ? 'rgba(96,94,86,0.9)' : 'rgba(126,122,112,0.9)';
        ctx.beginPath(); ctx.ellipse(bx, by, s, s * 0.75, h(i + 5) * 3, 0, TAU); ctx.fill();
        ctx.fillStyle = 'rgba(170,166,155,0.45)'; ctx.fillRect(bx - s * 0.4, by - s * 0.5, s * 0.8, 0.8);
        ctx.fillStyle = 'rgba(50,48,44,0.3)'; ctx.fillRect(bx - s * 0.4, by + s * 0.3, s * 0.9, 0.8);
      }
    } else if (t === 3) {
      for (let i = 0; i < 9; i++) {
        const bx = px + 2 + h(i) * 28, by = py + 2 + h(i + 15) * 28;
        const r = h(i + 40);
        ctx.fillStyle = r > 0.5 ? 'rgba(144,126,89,0.3)' : 'rgba(206,190,151,0.36)';
        ctx.fillRect(bx, by, 1.2, 1);
      }
      ctx.strokeStyle = 'rgba(143,124,86,0.18)'; ctx.lineWidth = 1;
      const bx = px + h(2) * 18, by = py + 6 + h(3) * 20;
      ctx.beginPath(); ctx.moveTo(bx, by); ctx.quadraticCurveTo(bx + 8, by - 2, bx + 15, by + 1); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(bx - 4, by + 7); ctx.quadraticCurveTo(bx + 5, by + 5, bx + 12, by + 8); ctx.stroke();
    } else if (t === 4) {
      const n = hash2(x, y, 33);
      if (n > 0.5) {
        const bx = px + 4 + h(1) * 24, by = py + 4 + h(2) * 24;
        ctx.strokeStyle = 'rgba(158,200,204,0.10)'; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(bx, by); ctx.quadraticCurveTo(bx + 5, by - 2, bx + 10, by); ctx.stroke();
      }
      if (n > 0.85) {
        ctx.fillStyle = 'rgba(19,41,47,0.18)';
        ctx.beginPath(); ctx.ellipse(px + 16, py + 16, 12, 8, 0, 0, TAU); ctx.fill();
      }
    } else if (t === 5) {
      for (let i = 0; i < 4; i++) {
        const yy = py + 5 + i * 7;
        ctx.fillStyle = 'rgba(48,38,25,0.25)'; ctx.fillRect(px, yy, TILE, 1.5);
        ctx.fillStyle = 'rgba(128,105,72,0.16)'; ctx.fillRect(px, yy + 1.5, TILE, 1);
      }
      for (let i = 0; i < 5; i++) {
        ctx.fillStyle = 'rgba(85,68,46,0.35)';
        ctx.fillRect(px + h(i) * 30, py + h(i + 9) * 30, 1.4, 1.4);
      }
    } else if (t === 6) {
      // Wide staggered boards with a warm sheen so floors read against the walls.
      const toneShift = (hash2(x >> 1, y >> 1, 63) - 0.5) * 0.06;
      ctx.fillStyle = toneShift > 0 ? `rgba(255,214,158,${toneShift})` : `rgba(38,22,10,${-toneShift})`;
      ctx.fillRect(px, py, TILE, TILE);
      for (let row = 0; row < 4; row++) {
        const yy = py + row * 8;
        const off = (row % 2) * 14;
        const tone = hash2(x, y * 4 + row, 61);
        ctx.fillStyle = tone > 0.5 ? 'rgba(255,218,160,0.075)' : 'rgba(52,29,12,0.10)';
        ctx.fillRect(px, yy, TILE, 8);
        // deep seam plus a lit lip on the board below it
        ctx.fillStyle = 'rgba(34,19,8,0.48)';
        ctx.fillRect(px, yy, TILE, 1.3);
        ctx.fillStyle = 'rgba(255,224,176,0.055)';
        ctx.fillRect(px, yy + 1.3, TILE, 0.9);
        ctx.fillStyle = 'rgba(24,13,5,0.30)';
        ctx.fillRect(px + ((off + 16) % TILE), yy + 1.6, 1.3, 6.4);
        // grain
        ctx.strokeStyle = 'rgba(58,34,15,0.20)'; ctx.lineWidth = 0.8;
        const gx = px + 3 + hash2(x + row, y, 7) * 21, gy = yy + 2.4 + hash2(x, y + row, 9) * 3.8;
        ctx.beginPath(); ctx.moveTo(gx, gy); ctx.quadraticCurveTo(gx + 5, gy + 1.2, gx + 10, gy - 0.6); ctx.stroke();
        ctx.strokeStyle = 'rgba(255,222,172,0.05)';
        ctx.beginPath(); ctx.moveTo(gx, gy - 0.8); ctx.quadraticCurveTo(gx + 5, gy + 0.3, gx + 9, gy - 1.4); ctx.stroke();
        if (tone > 0.80) {
          ctx.strokeStyle = 'rgba(48,27,11,0.34)';
          ctx.beginPath(); ctx.ellipse(px + 8 + tone * 15, yy + 4.3, 1.5, 2.1, 0, 0, TAU); ctx.stroke();
        }
        // nail heads at the ends of a few boards
        if (tone > 0.62) {
          ctx.fillStyle = 'rgba(36,21,9,0.5)';
          ctx.fillRect(px + 2.4, yy + 3.6, 1.2, 1.2);
          ctx.fillRect(px + 28.4, yy + 4.6, 1.2, 1.2);
          ctx.fillStyle = 'rgba(255,215,165,0.16)';
          ctx.fillRect(px + 2.1, yy + 3.3, 0.7, 0.7);
        }
      }
    } else if (t === 7) {
      for (let ty = 0; ty < 2; ty++) for (let tx = 0; tx < 2; tx++) {
        const bx = px + tx * 16, by = py + ty * 16;
        const r = hash2(x * 2 + tx, y * 2 + ty, 71);
        ctx.fillStyle = r > 0.5 ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.055)';
        ctx.fillRect(bx + 1, by + 1, 14, 14);
        ctx.fillStyle = 'rgba(38,36,33,0.35)';
        ctx.fillRect(bx, by, 16, 1); ctx.fillRect(bx, by, 1, 16);
        if (r > 0.7) {
          ctx.strokeStyle = 'rgba(30,28,26,0.25)'; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(bx + 4 + r * 6, by + 3); ctx.lineTo(bx + 8 + r * 3, by + 12); ctx.stroke();
        }
      }
    } else if (t === 8) {
      ctx.fillStyle = 'rgba(31,52,38,0.3)';
      const bx = px + h(1) * 14, by = py + h(2) * 14;
      ctx.beginPath(); ctx.ellipse(bx + 6, by + 6, 6 + h(3) * 6, 3 + h(4) * 3, h(5) * 3, 0, TAU); ctx.fill();
      for (let i = 0; i < 4; i++) {
        const rx = px + 4 + h(i + 20) * 24, ry = py + 10 + h(i + 30) * 20;
        ctx.strokeStyle = 'rgba(124,138,78,0.55)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(rx, ry); ctx.lineTo(rx + (h(i + 40) - 0.5) * 3, ry - 7 - h(i + 41) * 6); ctx.stroke();
        ctx.fillStyle = 'rgba(150,140,80,0.55)';
        ctx.beginPath(); ctx.arc(rx + (h(i + 40) - 0.5) * 3, ry - 8 - h(i + 41) * 6, 1, 0, TAU); ctx.fill();
      }
    }
  }

  renderMinimapBase() {
    const w = this.world;
    const s = this.miniBase.width / w.W;
    for (let y = 0; y < w.H; y++) for (let x = 0; x < w.W; x++) {
      const t = w.terrain[w.idx(x, y)];
      this.mctx.fillStyle = TERRAIN_BY_ID[t]?.base || '#000';
      this.mctx.fillRect(x * s, y * s, s + 0.5, s + 0.5);
    }
    this.mctx.fillStyle = 'rgba(0,0,0,0.25)';
    this.mctx.fillRect(0, 0, 192, 192);
  }

  // ---------------------------------------------------------------- main draw
  draw(dt) {
    const c = this.camera;
    c.x += (c.tx - c.x) * Math.min(1, dt * 10);
    c.y += (c.ty - c.y) * Math.min(1, dt * 10);
    c.zoom += (c.tzoom - c.zoom) * Math.min(1, dt * 12);
    this.clampCamera();
    this.time += dt;
    this.dt = dt;
    const w = this.world;
    const ctx = this.ctx;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.fillStyle = '#0a100d';
    ctx.fillRect(0, 0, this.w, this.h);

    if (this.dirty) {
      if (this.dirty.all) this.renderFullTerrain();
      else {
        this.renderTerrainRegion(Math.floor(this.dirty.x0), Math.floor(this.dirty.y0), Math.ceil(this.dirty.x1), Math.ceil(this.dirty.y1));
        this.renderMinimapBase();
        this.dirty = null;
      }
    }

    const view = this.view();
    ctx.save();
    ctx.translate(this.w / 2, this.h / 2);
    ctx.scale(c.zoom, c.zoom);
    ctx.translate(-c.x * TILE, -c.y * TILE);

    // Terrain (only the visible slice).
    const sx = clamp(view.x0 * TILE, 0, w.W * TILE);
    const sy = clamp(view.y0 * TILE, 0, w.H * TILE);
    const sw = clamp((view.x1 - view.x0) * TILE, 1, w.W * TILE - sx);
    const sh = clamp((view.y1 - view.y0) * TILE, 1, w.H * TILE - sy);
    ctx.drawImage(this.terrainCanvas, sx, sy, sw, sh, sx, sy, sw, sh);

    this.drawWater(ctx, view);
    this.drawDecals(ctx, view);
    this.drawZones(ctx, view);
    this.drawCrops(ctx, view);
    this.drawHoverTile(ctx);

    // Sort every visible sprite by its footprint's bottom edge.
    const drawables = [];
    for (const o of w.objects) {
      if (o.dead) continue;
      if (o.x + o.w < view.x0 || o.x > view.x1 || o.y + o.h < view.y0 || o.y > view.y1) continue;
      drawables.push({ sort: o.y + o.h + (o.nature ? 0.15 : 0), kind: 'obj', o });
    }
    for (const p of w.pawns) {
      if (p.kind === 'colonist' && p.dead && this.world.animTime - (p.deadAt || 0) > 90) continue;
      if (p.x < view.x0 || p.x > view.x1 || p.y < view.y0 || p.y > view.y1) continue;
      drawables.push({ sort: p.y + 0.5, kind: 'pawn', p });
    }
    for (const it of w.items) {
      if (it.dead || it.x < view.x0 || it.x > view.x1 || it.y < view.y0 || it.y > view.y1) continue;
      drawables.push({ sort: it.y + 0.42, kind: 'item', it });
    }
    drawables.sort((a, b) => a.sort - b.sort);
    for (const d of drawables) {
      if (d.kind === 'obj') this.drawObject(ctx, d.o);
      else if (d.kind === 'pawn') this.drawPawnWorld(ctx, d.p);
      else this.drawItem(ctx, d.it);
    }

    this.drawDesignations(ctx, view);
    this.drawPaths(ctx);
    this.drawProjectiles(ctx);
    this.drawParticles(ctx);
    this.drawFloaters(ctx);
    this.drawCloudShadows(ctx);

    if (this.zonePreview) this.drawZonePreview(ctx, this.zonePreview);
    this.drawToolGhost(ctx, view);
    ctx.restore();

    this.drawLighting(ctx);
    this.drawWeather(ctx);
    this.drawAmbient(ctx);
    this.drawPost(ctx);
    this.drawScreenLabels(ctx);
    if (this.marquee) this.drawMarquee(ctx);
  }

  // ---------------------------------------------------------------- overlays
  drawWater(ctx, view) {
    const w = this.world;
    const t0 = this.time;
    for (let y = view.y0; y <= view.y1; y++) {
      if (y < 0 || y >= w.H) continue;
      for (let x = view.x0; x <= view.x1; x++) {
        if (x < 0 || x >= w.W) continue;
        if (w.terrain[w.idx(x, y)] !== 4) continue;
        const px = x * TILE, py = y * TILE;
        const n = hash2(x, y, 91);
        const ph = t0 * 0.6 + n * 8 + x * 0.5 + y * 0.3;
        ctx.strokeStyle = `rgba(145,195,200,${0.05 + Math.sin(ph) * 0.025 + 0.06})`;
        ctx.lineWidth = 1.1;
        const bx = px + 4 + n * 18, by = py + 8 + hash2(x, y, 92) * 18;
        ctx.beginPath();
        ctx.moveTo(bx + Math.sin(ph) * 3, by);
        ctx.quadraticCurveTo(bx + 5, by - 1.5 + Math.sin(ph * 1.3) * 1.5, bx + 10, by);
        ctx.stroke();
        if (n > 0.72) {
          ctx.strokeStyle = 'rgba(190,225,220,0.07)';
          ctx.beginPath(); ctx.moveTo(bx + 2, by + 6); ctx.lineTo(bx + 9, by + 6); ctx.stroke();
        }
      }
    }
  }

  drawDecals(ctx, view) {
    for (const d of this.world.decals) {
      if (d.x < view.x0 || d.x > view.x1 || d.y < view.y0 || d.y > view.y1) continue;
      const px = d.x * TILE, py = d.y * TILE;
      const a = clamp(d.life / d.max, 0, 1);
      if (d.kind === 'blood') {
        const seed = hash2(Math.floor(d.x * 10), Math.floor(d.y * 10), 4);
        ctx.globalAlpha = 0.38 * a;
        ctx.fillStyle = '#571d1a';
        for (let i = 0; i < 6; i++) {
          const r = hash2(i, seed * 1000, 7);
          const bx = px + (r - 0.5) * d.size * 34, by = py + (hash2(i, seed * 800, 9) - 0.5) * d.size * 26;
          ctx.beginPath(); ctx.ellipse(bx, by, (1 + r * 3) * d.size, (0.8 + r * 2) * d.size, r * 3, 0, TAU); ctx.fill();
        }
        ctx.globalAlpha = 0.18 * a;
        ctx.fillStyle = '#3e1412';
        ctx.beginPath(); ctx.ellipse(px, py, d.size * 9, d.size * 6, d.rot, 0, TAU); ctx.fill();
        ctx.globalAlpha = 1;
      } else if (d.kind === 'scorch') {
        const g = ctx.createRadialGradient(px, py, 1, px, py, d.size * 30);
        g.addColorStop(0, `rgba(20,18,16,${0.35 * a})`);
        g.addColorStop(0.7, `rgba(30,26,22,${0.16 * a})`);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.ellipse(px, py, d.size * 30, d.size * 22, d.rot, 0, TAU); ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  }

  drawZones(ctx, view) {
    const w = this.world;
    for (const z of w.zones) {
      if (z.removed) continue;
      if (z.x + z.w < view.x0 || z.x > view.x1 || z.y + z.h < view.y0 || z.y > view.y1) continue;
      const px = z.x * TILE, py = z.y * TILE, pw = z.w * TILE, ph = z.h * TILE;
      const grow = z.type === 'grow';
      ctx.save();
      ctx.fillStyle = grow ? 'rgba(122,190,92,0.035)' : 'rgba(228,210,160,0.035)';
      ctx.fillRect(px, py, pw, ph);
      ctx.strokeStyle = grow ? 'rgba(150,205,120,0.32)' : 'rgba(226,205,150,0.28)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([5, 5]);
      ctx.strokeRect(px + 1, py + 1, pw - 2, ph - 2);
      ctx.setLineDash([]);
      const l = 7;
      ctx.strokeStyle = grow ? 'rgba(176,225,140,0.5)' : 'rgba(236,216,166,0.46)';
      ctx.lineWidth = 1.6;
      for (const [cx, cy, dx, dy] of [[px, py, 1, 1], [px + pw, py, -1, 1], [px, py + ph, 1, -1], [px + pw, py + ph, -1, -1]]) {
        ctx.beginPath(); ctx.moveTo(cx + dx * 2, cy + dy * 2); ctx.lineTo(cx + dx * l, cy + dy * 2); ctx.moveTo(cx + dx * 2, cy + dy * 2); ctx.lineTo(cx + dx * 2, cy + dy * l); ctx.stroke();
      }
      ctx.globalAlpha = 0.6;
      this.drawZoneGlyph(ctx, px + 8, py + 9, grow);
      ctx.restore();
    }
  }
  drawZoneGlyph(ctx, x, y, grow) {
    ctx.strokeStyle = grow ? 'rgba(190,230,150,0.9)' : 'rgba(240,220,170,0.9)';
    ctx.fillStyle = ctx.strokeStyle;
    ctx.lineWidth = 1;
    if (grow) {
      ctx.beginPath(); ctx.moveTo(x, y + 4); ctx.lineTo(x, y - 2); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(x - 2, y - 1, 2, 1, -0.6, 0, TAU); ctx.fill();
      ctx.beginPath(); ctx.ellipse(x + 2, y - 2, 2, 1, 0.6, 0, TAU); ctx.fill();
    } else {
      ctx.strokeRect(x - 3.5, y - 3.5, 7, 7);
      ctx.beginPath(); ctx.moveTo(x - 3.5, y); ctx.lineTo(x + 3.5, y); ctx.moveTo(x, y - 3.5); ctx.lineTo(x, y + 3.5); ctx.stroke();
    }
  }

  drawCrops(ctx, view) {
    const w = this.world;
    const t = this.time;
    for (let y = view.y0; y <= view.y1; y++) {
      for (let x = view.x0; x <= view.x1; x++) {
        if (x < 0 || y < 0 || x >= w.W || y >= w.H) continue;
        const key = w.idx(x, y);
        if (!w.cropPlanted[key]) continue;
        const g = w.crops[key];
        const px = x * TILE + TILE / 2, py = y * TILE + TILE - 4;
        const sway = Math.sin(t * 1.7 + x * 0.6 + y * 0.4) * 1.1;
        if (g < 0.16) {
          ctx.strokeStyle = 'rgba(124,167,86,0.85)'; ctx.lineWidth = 1;
          for (let i = 0; i < 3; i++) {
            const bx = px - 7 + i * 7 + hash2(x, y + i, 5) * 2;
            ctx.beginPath(); ctx.moveTo(bx, py); ctx.quadraticCurveTo(bx - 1 + sway * 0.3, py - 4, bx - 2 + sway * 0.5, py - 6); ctx.stroke();
          }
          continue;
        }
        const mature = g > 0.8;
        const stalkColor = mature ? 'rgba(196,168,83,0.95)' : 'rgba(116,158,74,0.95)';
        const leafColor = mature ? 'rgba(180,154,72,0.8)' : 'rgba(92,138,63,0.9)';
        const height = 7 + g * 13;
        for (let i = 0; i < 4; i++) {
          const bx = px - 9 + i * 6 + hash2(x + i, y, 2) * 2;
          const hh = height * (0.7 + hash2(x, y + i, 3) * 0.4);
          ctx.strokeStyle = stalkColor;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(bx, py);
          ctx.quadraticCurveTo(bx + sway * 0.5, py - hh * 0.55, bx + sway, py - hh);
          ctx.stroke();
          if (i % 2 === 0) {
            ctx.strokeStyle = leafColor; ctx.lineWidth = 1.1;
            ctx.beginPath(); ctx.moveTo(bx + sway * 0.3, py - hh * 0.45); ctx.quadraticCurveTo(bx - 4 + sway, py - hh * 0.55, bx - 5 + sway, py - hh * 0.36); ctx.stroke();
          }
          if (mature) {
            ctx.fillStyle = 'rgba(219,190,103,0.95)';
            for (let k = 0; k < 3; k++) {
              ctx.beginPath();
              ctx.ellipse(bx + sway + (k - 1) * 1.4, py - hh + 1 + k * 0.6, 1.1, 2.1, (k - 1) * 0.4, 0, TAU);
              ctx.fill();
            }
          }
        }
      }
    }
  }

  drawHoverTile(ctx) {
    if (!this.hover) return;
    const x = Math.floor(this.hover.x), y = Math.floor(this.hover.y);
    if (!this.world.inBounds(x, y)) return;
    ctx.save();
    ctx.strokeStyle = this.tool ? 'rgba(240,206,130,0.75)' : 'rgba(235,240,230,0.32)';
    ctx.lineWidth = 1.4;
    ctx.setLineDash([3, 3]);
    ctx.strokeRect(x * TILE + 1.5, y * TILE + 1.5, TILE - 3, TILE - 3);
    ctx.setLineDash([]);
    ctx.restore();
  }

  drawDesignations(ctx, view) {
    const w = this.world;
    const pulse = 0.72 + Math.sin(this.time * 3.1) * 0.18;
    const drawBadge = (o, glyph) => {
      if (o.x < view.x0 || o.x > view.x1 || o.y < view.y0 || o.y > view.y1) return;
      const cx = (o.x + o.w / 2) * TILE, cy = o.y * TILE - 2;
      ctx.save();
      ctx.globalAlpha = pulse;
      ctx.fillStyle = 'rgba(16,20,17,0.78)';
      ctx.strokeStyle = 'rgba(236,192,108,0.9)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(cx, cy, 7.2, 0, TAU); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = '#f0cf8b';
      ctx.fillStyle = '#f0cf8b';
      ctx.lineWidth = 1.3;
      if (glyph === 'axe') {
        ctx.beginPath(); ctx.moveTo(cx - 2.4, cy + 3.2); ctx.lineTo(cx + 2.2, cy - 2.6); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx + 0.4, cy - 3.4); ctx.lineTo(cx + 3.6, cy - 2.8); ctx.lineTo(cx + 2.4, cy + 0.6); ctx.closePath(); ctx.fill();
      } else if (glyph === 'pick') {
        ctx.beginPath(); ctx.moveTo(cx - 2.6, cy + 3.2); ctx.lineTo(cx + 1.4, cy - 2.4); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx - 2.8, cy - 2.6); ctx.quadraticCurveTo(cx + 1, cy - 4.4, cx + 4, cy - 1.8); ctx.stroke();
      } else {
        ctx.beginPath(); ctx.moveTo(cx - 3, cy - 3); ctx.lineTo(cx + 3, cy + 3); ctx.moveTo(cx + 3, cy - 3); ctx.lineTo(cx - 3, cy + 3); ctx.stroke();
      }
      ctx.restore();
    };
    for (const id of w.designations.chop) { const o = w.objectById(id); if (o) drawBadge(o, 'axe'); }
    for (const id of w.designations.mine) { const o = w.objectById(id); if (o) drawBadge(o, 'pick'); }
    for (const id of w.designations.deconstruct) { const o = w.objectById(id); if (o) drawBadge(o, 'x'); }
    for (const id of w.designations.hunt) {
      const p = w.pawnById(id);
      if (!p) continue;
      ctx.save();
      ctx.strokeStyle = `rgba(235,170,110,${pulse})`;
      ctx.lineWidth = 1.4;
      const px = p.x * TILE, py = p.y * TILE;
      ctx.beginPath(); ctx.arc(px, py, 13, 0, TAU); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(px - 17, py); ctx.lineTo(px - 11, py); ctx.moveTo(px + 11, py); ctx.lineTo(px + 17, py); ctx.stroke();
      ctx.restore();
    }
  }

  drawPaths(ctx) {
    if (!this.showPaths) return;
    for (const id of this.selected) {
      const p = this.world.pawnById(id);
      if (!p || !p.path.length) continue;
      ctx.save();
      ctx.strokeStyle = 'rgba(236,210,150,0.24)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([3, 5]);
      ctx.beginPath();
      ctx.moveTo(p.x * TILE, p.y * TILE);
      for (const node of p.path) ctx.lineTo(node.x * TILE + TILE / 2, node.y * TILE + TILE / 2);
      ctx.stroke();
      ctx.setLineDash([]);
      const last = p.path[p.path.length - 1];
      ctx.strokeStyle = 'rgba(236,210,150,0.5)';
      ctx.beginPath(); ctx.arc(last.x * TILE + 16, last.y * TILE + 16, 4, 0, TAU); ctx.stroke();
      ctx.restore();
    }
  }

  drawProjectiles(ctx) {
    for (const b of this.world.projectiles) {
      const x = b.x * TILE, y = b.y * TILE - 7;
      const px = (b.px ?? b.x) * TILE, py = (b.py ?? b.y) * TILE - 7;
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      const col = b.tracer === 'gold' ? '255,208,112' : '255,222,160';
      const g = ctx.createLinearGradient(px, py, x, y);
      g.addColorStop(0, `rgba(${col},0)`);
      g.addColorStop(1, `rgba(${col},0.9)`);
      ctx.strokeStyle = g;
      ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(x, y); ctx.stroke();
      ctx.fillStyle = 'rgba(255,240,200,0.9)';
      ctx.beginPath(); ctx.arc(x, y, 1.8, 0, TAU); ctx.fill();
      ctx.restore();
    }
  }

  drawParticles(ctx) {
    for (const p of this.world.particles) {
      const a = clamp(p.life / p.max, 0, 1);
      const x = p.x * TILE, y = p.y * TILE;
      if (p.kind === 'smoke') {
        const r = p.size * (2.2 - a * 1.1);
        ctx.fillStyle = `rgba(90,92,88,${0.16 * a})`;
        ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
      } else if (p.kind === 'dust') {
        ctx.fillStyle = p.color || `rgba(172,157,128,${0.5 * a})`;
        ctx.beginPath(); ctx.arc(x, y, p.size * (1.4 - a * 0.4), 0, TAU); ctx.fill();
      } else if (p.kind === 'blood') {
        ctx.fillStyle = `rgba(122,32,28,${0.7 * a})`;
        ctx.beginPath(); ctx.arc(x, y, p.size * 0.8, 0, TAU); ctx.fill();
      } else if (p.kind === 'wood') {
        ctx.save(); ctx.translate(x, y); ctx.rotate(p.rot);
        ctx.fillStyle = `rgba(145,105,57,${0.9 * a})`; ctx.fillRect(-p.size, -p.size * 0.4, p.size * 2, p.size * 0.8);
        ctx.restore();
      } else if (p.kind === 'stone') {
        ctx.save(); ctx.translate(x, y); ctx.rotate(p.rot);
        ctx.fillStyle = `rgba(135,132,124,${0.9 * a})`; ctx.fillRect(-p.size * 0.6, -p.size * 0.5, p.size * 1.4, p.size);
        ctx.restore();
      } else if (p.kind === 'leaf') {
        ctx.save(); ctx.translate(x, y); ctx.rotate(p.rot);
        ctx.fillStyle = `rgba(${p.color || '110,140,70'},${0.75 * a})`;
        ctx.beginPath(); ctx.ellipse(0, 0, p.size, p.size * 0.45, 0, 0, TAU); ctx.fill();
        ctx.restore();
      } else if (p.kind === 'spark') {
        ctx.save(); ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = p.color ? `rgba(255,220,160,${0.9 * a})` : `rgba(255,205,120,${0.9 * a})`;
        ctx.fillRect(x - 1, y - 1, 2.4, 2.4);
        ctx.restore();
      } else if (p.kind === 'muzzle') {
        ctx.save(); ctx.globalCompositeOperation = 'lighter';
        const g = ctx.createRadialGradient(x, y, 0, x, y, 14);
        g.addColorStop(0, `rgba(255,240,200,${0.65 * a})`);
        g.addColorStop(1, 'rgba(255,180,90,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 14, 0, TAU); ctx.fill();
        ctx.restore();
      } else if (p.kind === 'heal') {
        ctx.save();
        ctx.strokeStyle = `rgba(150,215,140,${0.65 * a})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(x - 2, y); ctx.lineTo(x + 2, y); ctx.moveTo(x, y - 2); ctx.lineTo(x, y + 2); ctx.stroke();
        ctx.restore();
      }
    }
  }

  drawFloaters(ctx) {
    ctx.save();
    ctx.textAlign = 'center';
    ctx.font = '600 9px Inter, system-ui, sans-serif';
    for (const f of this.world.floaters) {
      const a = clamp(f.life / f.max, 0, 1);
      ctx.globalAlpha = a;
      ctx.fillStyle = 'rgba(10,12,10,0.55)';
      ctx.fillText(f.text, f.x * TILE + 0.8, f.y * TILE + 0.8);
      ctx.fillStyle = f.color;
      ctx.fillText(f.text, f.x * TILE, f.y * TILE);
    }
    ctx.restore();
  }

  drawCloudShadows(ctx) {
    const w = this.world;
    const day = w.daylight();
    if (day < 0.15) return;
    const view = this.view();
    ctx.save();
    ctx.globalCompositeOperation = 'multiply';
    for (const c of this.clouds) {
      const x = (((c.x + this.time * c.sx) % (w.W + 60)) - 30) * TILE;
      const y = (((c.y + this.time * c.sy * 0.2) % (w.H + 40)) - 20) * TILE;
      if (x < view.x0 * TILE - c.r || x > view.x1 * TILE + c.r || y < view.y0 * TILE - c.r || y > view.y1 * TILE + c.r) continue;
      const g = ctx.createRadialGradient(x, y, 0, x, y, c.r);
      g.addColorStop(0, 'rgba(80,90,90,0.10)');
      g.addColorStop(1, 'rgba(80,90,90,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.ellipse(x, y, c.r, c.r * 0.62, 0, 0, TAU); ctx.fill();
    }
    ctx.restore();
  }

  drawZonePreview(ctx, z) {
    const x0 = Math.min(z.x0, z.x1) * TILE, y0 = Math.min(z.y0, z.y1) * TILE;
    const x1 = (Math.max(z.x0, z.x1) + 1) * TILE, y1 = (Math.max(z.y0, z.y1) + 1) * TILE;
    ctx.save();
    const grow = z.type === 'grow';
    ctx.fillStyle = grow ? 'rgba(140,210,100,0.12)' : 'rgba(240,215,150,0.10)';
    ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
    ctx.strokeStyle = grow ? 'rgba(176,230,130,0.9)' : 'rgba(240,214,156,0.9)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 4]);
    ctx.strokeRect(x0 + 1, y0 + 1, x1 - x0 - 2, y1 - y0 - 2);
    ctx.restore();
  }

  drawToolGhost(ctx, view) {
    if (!this.tool || this.tool.kind !== 'build' || !this.hover) return;
    const def = BUILDINGS[this.tool.defId];
    if (!def) return;
    const rot = this.tool.rot || 0;
    const w = rot % 180 === 90 ? def.h : def.w;
    const h = rot % 180 === 90 ? def.w : def.h;
    const x = Math.floor(this.hover.x - (this.tool.anchor === 'center' ? (w - 1) / 2 : 0));
    const y = Math.floor(this.hover.y - (this.tool.anchor === 'center' ? (h - 1) / 2 : 0));
    const ok = this.world.canPlaceAt(this.tool.defId, x, y, rot);
    const fake = { type: this.tool.defId, def, x, y, w, h, rot, built: true, seed: 7, open: 0, angle: -Math.PI / 2, flash: 0, dead: false };
    ctx.save();
    ctx.globalAlpha = ok ? 0.45 : 0.3;
    this.drawBuildingArt(ctx, fake, this.time);
    ctx.globalAlpha = 1;
    ctx.lineWidth = 1.6;
    ctx.strokeStyle = ok ? 'rgba(165,225,135,0.9)' : 'rgba(235,110,90,0.95)';
    ctx.fillStyle = ok ? 'rgba(150,220,120,0.08)' : 'rgba(230,80,70,0.12)';
    ctx.fillRect(x * TILE + 1, y * TILE + 1, w * TILE - 2, h * TILE - 2);
    ctx.strokeRect(x * TILE + 1, y * TILE + 1, w * TILE - 2, h * TILE - 2);
    ctx.setLineDash([4, 3]);
    for (let i = 0; i < w; i++) for (let j = 0; j < h; j++) ctx.strokeRect((x + i) * TILE + 3, (y + j) * TILE + 3, TILE - 6, TILE - 6);
    ctx.restore();
  }

  // ---------------------------------------------------------------- objects & nature
  drawObject(ctx, o) {
    const time = this.time;
    if (o.nature) {
      this.drawNature(ctx, o, time);
      return;
    }
    if (!o.built) {
      this.drawBlueprint(ctx, o, time);
      return;
    }
    this.drawBuildingArt(ctx, o, time);
    if (o.flash > 0) {
      ctx.save();
      ctx.globalAlpha = o.flash * 2.5;
      ctx.fillStyle = 'rgba(255,140,110,0.6)';
      ctx.fillRect(o.x * TILE, o.y * TILE, o.w * TILE, o.h * TILE);
      ctx.restore();
    }
    if (this.selectedObj === o.id) {
      ctx.save();
      ctx.strokeStyle = 'rgba(244,214,150,0.9)';
      ctx.lineWidth = 1.4;
      ctx.setLineDash([5, 3]);
      roundRect(ctx, o.x * TILE + 1, o.y * TILE + 1, o.w * TILE - 2, o.h * TILE - 2, 3);
      ctx.stroke();
      ctx.restore();
    }
  }

  drawNature(ctx, o, time) {
    const t = o.type;
    if (t === 'stump') { this.drawStump(ctx, o, time); return; }
    if (t === 'bush') { this.drawBush(ctx, o, time); return; }
    if (t === 'boulder' || t === 'steelrock' || t === 'limestone') { this.drawRock(ctx, o, time); return; }
    this.drawTree(ctx, o, time);
  }

  drawTree(ctx, o, time) {
    const x = o.x * TILE + TILE / 2;
    const base = o.y * TILE + TILE - 1;
    const seed = o.seed || 1;
    const storm = this.world.weather === 'storm' ? 0.004 : this.world.weather === 'rain' ? 0.0022 : 0.001;
    const sway = Math.sin(time * (1.05 + (seed % 10) * 0.02) + seed % 97) * (1.4 + seed % 3) * 0.6 + Math.sin(time * 2.7 + seed) * 0.5 + (this.world.weather === 'storm' ? Math.sin(time * 5 + seed) * 2 : 0);
    const isPine = o.type === 'pine';
    const isBirch = o.type === 'birch';
    const isDead = o.type === 'deadtree';
    ctx.save();
    // shadow
    ctx.fillStyle = 'rgba(24,30,20,0.20)';
    ctx.beginPath(); ctx.ellipse(x + 5, base + 3, 15, 5.4, -0.12, 0, TAU); ctx.fill();
    // trunk
    const trunkTop = base - (isPine ? 40 : isDead ? 30 : 30) - (seed % 5);
    const trunkW = isBirch ? 3.4 : 4.6;
    ctx.strokeStyle = isDead ? '#5b4a39' : isBirch ? '#d7d2c3' : '#57402b';
    ctx.lineWidth = trunkW;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x, base);
    ctx.quadraticCurveTo(x - 1.2, base - 16, x + sway * 0.25, trunkTop);
    ctx.stroke();
    ctx.strokeStyle = isDead ? 'rgba(148,122,92,0.4)' : isBirch ? 'rgba(255,255,255,0.5)' : 'rgba(154,120,76,0.45)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x - 1.4, base - 2); ctx.lineTo(x + 1.4, base - 2); ctx.stroke();
    if (isBirch) {
      ctx.strokeStyle = 'rgba(35,31,27,0.7)';
      ctx.lineWidth = 1.2;
      for (let i = 0; i < 4; i++) {
        const yy = base - 5 - i * 7;
        ctx.beginPath(); ctx.moveTo(x - 1.2, yy); ctx.lineTo(x + 1.6, yy - 0.5); ctx.stroke();
      }
    }
    if (isDead) {
      ctx.strokeStyle = '#5b4a39';
      ctx.lineWidth = 2.4;
      for (const [a, len] of [[-0.7, 18], [0.65, 16], [-0.15, 20], [0.2, 12]]) {
        ctx.beginPath();
        ctx.moveTo(x + sway * 0.3, trunkTop + 8);
        ctx.quadraticCurveTo(x + Math.cos(a) * len * 0.5 + sway, trunkTop - len * 0.25, x + Math.cos(a) * len + sway, trunkTop - len * 0.7);
        ctx.stroke();
      }
      ctx.restore();
      return;
    }
    const cx = x + sway;
    const cy = trunkTop + 2;
    if (isPine) {
      const green = ['#335c38', '#3f6f42', '#4b7d49', '#5d8f53'];
      for (let layer = 0; layer < 4; layer++) {
        const ly = cy - 2 + layer * 10;
        const lw = 8 + layer * 5.5;
        ctx.fillStyle = green[layer];
        ctx.beginPath();
        ctx.moveTo(cx, ly - 19);
        ctx.lineTo(cx - lw * 0.45, ly - 7);
        ctx.lineTo(cx - lw * 0.24, ly - 6);
        ctx.lineTo(cx - lw, ly + 2);
        ctx.lineTo(cx + lw, ly + 2);
        ctx.lineTo(cx + lw * 0.24, ly - 6);
        ctx.lineTo(cx + lw * 0.45, ly - 7);
        ctx.closePath();
        ctx.fill();
      }
      ctx.fillStyle = 'rgba(160,200,130,0.18)';
      ctx.beginPath(); ctx.ellipse(cx - 5, cy - 20, 5, 9, -0.6, 0, TAU); ctx.fill();
    } else {
      const dark = isBirch ? '#4f6b34' : '#345027';
      const mid = isBirch ? '#6f8a42' : '#42662f';
      const light = isBirch ? '#9db35e' : '#5d8440';
      const hi = isBirch ? '#bbcd7e' : '#78a153';
      const lobes = [];
      for (let i = 0; i < 7; i++) {
        const a = (i / 7) * TAU + (seed % 13) * 0.1;
        lobes.push({
          x: cx + Math.cos(a) * (5 + (seed >> i) % 6),
          y: cy + Math.sin(a) * (3 + (seed >> i) % 4) - 2,
          r: 8 + ((seed >> (i * 2)) % 5),
        });
      }
      ctx.fillStyle = dark;
      for (const l of lobes) { ctx.beginPath(); ctx.arc(l.x, l.y, l.r + 1.8, 0, TAU); ctx.fill(); }
      ctx.fillStyle = mid;
      for (let i = 0; i < 6; i++) {
        const l = lobes[i];
        ctx.beginPath(); ctx.arc(l.x - 0.6, l.y - 0.8, l.r, 0, TAU); ctx.fill();
      }
      ctx.fillStyle = light;
      for (let i = 0; i < 4; i++) {
        const l = lobes[i];
        ctx.beginPath(); ctx.arc(l.x - 2.5, l.y - 3, l.r * 0.62, 0, TAU); ctx.fill();
      }
      ctx.fillStyle = hi;
      for (let i = 0; i < 3; i++) {
        const l = lobes[i];
        ctx.beginPath(); ctx.arc(l.x - 4, l.y - 5, l.r * 0.3, 0, TAU); ctx.fill();
      }
      // leaf speckles at the canopy edge
      for (let i = 0; i < 18; i++) {
        const a = (i / 18) * TAU + seed;
        const r = 13 + hash2(i, seed, 3) * 7;
        ctx.fillStyle = i % 3 === 0 ? hi : light;
        ctx.beginPath();
        ctx.arc(cx + Math.cos(a) * r, cy - 1 + Math.sin(a) * r * 0.8, 1.4, 0, TAU);
        ctx.fill();
      }
      if (o.type === 'oak' && seed % 3 === 0) {
        ctx.fillStyle = 'rgba(180,150,70,0.8)';
        for (let i = 0; i < 3; i++) {
          ctx.beginPath(); ctx.arc(cx - 8 + i * 7, cy + 9 + (i % 2) * 4, 1.2, 0, TAU); ctx.fill();
        }
      }
    }
    ctx.restore();
  }

  drawRock(ctx, o, time) {
    const seed = o.seed || 2;
    const x = o.x * TILE + TILE / 2, y = o.y * TILE + TILE - 2;
    const steel = o.type === 'steelrock';
    const baseCol = steel ? '#7f878c' : o.type === 'limestone' ? '#9b968a' : '#7d7b75';
    const topCol = steel ? '#aab2b7' : o.type === 'limestone' ? '#b5b0a3' : '#999690';
    const dark = steel ? '#5a6266' : o.type === 'limestone' ? '#6f6b62' : '#5c5b57';
    ctx.save();
    ctx.fillStyle = 'rgba(22,25,20,0.22)';
    ctx.beginPath(); ctx.ellipse(x + 5, y + 2, 15, 5.5, -0.15, 0, TAU); ctx.fill();
    const pts = [];
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * TAU - 0.7;
      const r = 11 + hash2(i, seed, 6) * 6;
      pts.push([x + Math.cos(a) * r, y - 8 + Math.sin(a) * r * 0.78]);
    }
    poly(ctx, pts);
    ctx.fillStyle = baseCol; ctx.fill();
    ctx.strokeStyle = dark; ctx.lineWidth = 1.2; ctx.stroke();
    // top facet
    ctx.fillStyle = topCol;
    ctx.beginPath();
    ctx.moveTo(x - 9, y - 11);
    ctx.lineTo(x - 2, y - 20);
    ctx.lineTo(x + 8, y - 17);
    ctx.lineTo(x + 11, y - 8);
    ctx.lineTo(x + 1, y - 6);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.14)';
    ctx.beginPath(); ctx.moveTo(x - 7, y - 13); ctx.lineTo(x - 1, y - 19); ctx.lineTo(x + 4, y - 17); ctx.lineTo(x - 2, y - 13); ctx.closePath(); ctx.fill();
    ctx.fillStyle = dark; ctx.globalAlpha = 0.5;
    ctx.beginPath(); ctx.moveTo(x + 2, y - 6); ctx.lineTo(x + 11, y - 8); ctx.lineTo(x + 8, y + 1); ctx.lineTo(x - 2, y + 4); ctx.closePath(); ctx.fill();
    ctx.globalAlpha = 1;
    if (steel) {
      ctx.strokeStyle = 'rgba(160,210,220,0.6)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x - 5, y - 9); ctx.lineTo(x + 2, y - 15); ctx.stroke();
      ctx.fillStyle = 'rgba(200,240,245,0.7)';
      ctx.beginPath(); ctx.arc(x + 3, y - 12, 1.2, 0, TAU); ctx.fill();
    } else if (hash2(seed, o.x, 4) > 0.45) {
      ctx.fillStyle = 'rgba(88,112,62,0.55)';
      ctx.beginPath(); ctx.ellipse(x - 7, y - 2, 4, 2, -0.4, 0, TAU); ctx.fill();
      ctx.fillStyle = 'rgba(110,135,72,0.4)';
      ctx.beginPath(); ctx.ellipse(x + 5, y + 1, 2.6, 1.4, 0.3, 0, TAU); ctx.fill();
    }
    // loose pebbles
    ctx.fillStyle = 'rgba(80,79,74,0.7)';
    ctx.beginPath(); ctx.arc(x - 12, y + 2, 1.8, 0, TAU); ctx.fill();
    ctx.beginPath(); ctx.arc(x + 12, y + 3, 1.3, 0, TAU); ctx.fill();
    ctx.restore();
  }

  drawBush(ctx, o, time) {
    const seed = o.seed || 4;
    const x = o.x * TILE + TILE / 2, y = o.y * TILE + TILE - 4;
    const sway = Math.sin(time * 1.4 + seed) * 0.7;
    ctx.save();
    ctx.fillStyle = 'rgba(24,30,20,0.18)';
    ctx.beginPath(); ctx.ellipse(x + 3, y + 2, 11, 4, 0, 0, TAU); ctx.fill();
    const greens = ['#3f5f30', '#4f7338', '#5f8642', '#70994f'];
    for (let i = 0; i < 6; i++) {
      const r = 4 + hash2(i, seed, 5) * 5;
      const bx = x - 7 + (i % 3) * 7 + sway, by = y - 5 - Math.floor(i / 3) * 5 + hash2(i, seed, 8) * 2;
      ctx.fillStyle = greens[i % greens.length];
      ctx.beginPath(); ctx.arc(bx, by, r, 0, TAU); ctx.fill();
    }
    ctx.fillStyle = 'rgba(190,210,130,0.25)';
    ctx.beginPath(); ctx.arc(x - 5 + sway, y - 12, 3.4, 0, TAU); ctx.fill();
    if (seed % 2 === 0) {
      ctx.fillStyle = '#a04439';
      for (let i = 0; i < 5; i++) {
        ctx.beginPath(); ctx.arc(x - 6 + hash2(i, seed, 9) * 12 + sway, y - 10 + hash2(i, seed, 10) * 8, 1.2, 0, TAU); ctx.fill();
      }
    }
    ctx.restore();
  }

  drawStump(ctx, o, time) {
    const x = o.x * TILE + TILE / 2, y = o.y * TILE + TILE - 6;
    ctx.save();
    ctx.fillStyle = 'rgba(24,28,20,0.18)';
    ctx.beginPath(); ctx.ellipse(x + 3, y + 3, 8, 3, 0, 0, TAU); ctx.fill();
    ctx.fillStyle = '#6a4c30';
    ctx.beginPath(); ctx.ellipse(x, y, 8, 5, 0, 0, TAU); ctx.fill();
    ctx.fillStyle = '#8a6540';
    ctx.beginPath(); ctx.ellipse(x, y - 1, 7, 4.2, 0, 0, TAU); ctx.fill();
    ctx.strokeStyle = 'rgba(95,66,40,0.8)'; ctx.lineWidth = 0.8;
    ctx.beginPath(); ctx.ellipse(x, y - 1, 4.5, 2.6, 0, 0, TAU); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(x, y - 1, 2, 1.2, 0, 0, TAU); ctx.stroke();
    ctx.restore();
  }

  drawBlueprint(ctx, o, time) {
    const x = o.x * TILE, y = o.y * TILE, w = o.w * TILE, h = o.h * TILE;
    ctx.save();
    ctx.globalAlpha = 0.3;
    this.drawBuildingArt(ctx, { ...o, built: true }, time);
    ctx.globalAlpha = 1;
    // construction frame
    ctx.strokeStyle = 'rgba(190,220,225,0.55)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.strokeRect(x + 2, y + 2, w - 4, h - 4);
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(40,44,42,0.55)';
    ctx.fillRect(x + 2, y + 2, w - 4, h - 4);
    ctx.globalAlpha = 0.78;
    this.drawBuildingArt(ctx, { ...o, built: true }, time);
    ctx.globalAlpha = 1;
    ctx.strokeStyle = 'rgba(140,180,185,0.7)';
    ctx.strokeRect(x + 2, y + 2, w - 4, h - 4);
    const progress = clamp(o.work / o.workNeeded, 0, 1);
    ctx.fillStyle = 'rgba(15,20,20,0.65)';
    ctx.fillRect(x + 4, y + h - 7, w - 8, 4);
    ctx.fillStyle = 'rgba(158,206,172,0.9)';
    ctx.fillRect(x + 4, y + h - 7, (w - 8) * progress, 4);
    // corner stakes
    ctx.fillStyle = '#8a6b45';
    for (const [px, py] of [[x + 2, y + 2], [x + w - 4, y + 2], [x + 2, y + h - 4], [x + w - 4, y + h - 4]]) {
      ctx.fillRect(px, py, 2, 4);
    }
    ctx.restore();
  }

  drawBuildingArt(ctx, o, time) {
    const t = o.type;
    switch (t) {
      case 'wall': return this.drawWall(ctx, o, false);
      case 'stonewall': return this.drawWall(ctx, o, true);
      case 'door': return this.drawDoor(ctx, o, time);
      case 'floor': case 'stonefloor': return this.drawFloorPatch(ctx, o, t === 'stonefloor');
      case 'sandbag': return this.drawSandbag(ctx, o);
      case 'bed': return this.drawBed(ctx, o);
      case 'table': return this.drawTable(ctx, o);
      case 'chair': return this.drawChair(ctx, o);
      case 'lamp': return this.drawLamp(ctx, o, time);
      case 'campfire': return this.drawCampfire(ctx, o, time);
      case 'sculpture': return this.drawSculpture(ctx, o);
      case 'stove': return this.drawStove(ctx, o, time);
      case 'bench': return this.drawBench(ctx, o, time);
      case 'solar': return this.drawSolar(ctx, o, time);
      case 'battery': return this.drawBattery(ctx, o, time);
      case 'turret': return this.drawTurret(ctx, o, time);
      default: return this.drawGeneric(ctx, o);
    }
  }

  drawWall(ctx, o, stone) {
    const x = o.x * TILE, y = o.y * TILE, s = TILE;
    ctx.save();
    ctx.fillStyle = 'rgba(14,18,13,0.34)';
    ctx.fillRect(x + 3, y + 5, s - 1, s - 1);
    const top = stone ? '#948f85' : '#b68d58';
    const mid = stone ? '#7d786e' : '#9a7447';
    const dark = stone ? '#585449' : '#593d22';
    ctx.fillStyle = mid;
    ctx.fillRect(x, y, s, s);
    if (stone) {
      ctx.fillStyle = dark;
      for (let row = 0; row < 4; row++) {
        ctx.fillRect(x, y + row * 8, s, 1);
        const off = row % 2 === 0 ? 0 : 8;
        for (let col = 0; col < 2; col++) ctx.fillRect(x + off + col * 16, y + row * 8, 1, 8);
      }
      for (let i = 0; i < 8; i++) {
        const r = hash2(o.x * 7 + i, o.y * 3 + i, 4);
        ctx.fillStyle = r > 0.5 ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)';
        ctx.fillRect(x + (i % 4) * 8, y + Math.floor(i / 2) * 8, 7, 3);
      }
      ctx.fillStyle = 'rgba(255,255,255,0.12)';
      ctx.fillRect(x, y, s, 2);
      ctx.fillStyle = 'rgba(0,0,0,0.20)';
      ctx.fillRect(x, y + s - 3, s, 3);
      if (hash2(o.x, o.y, 8) > 0.62) {
        ctx.fillStyle = 'rgba(96,120,64,0.5)';
        ctx.beginPath(); ctx.ellipse(x + 7 + hash2(o.x, o.y, 2) * 16, y + 7, 4, 2.6, 0.5, 0, TAU); ctx.fill();
      }
    } else {
      // Stacked timber courses: clearly solid wall, not a floor plank.
      for (let band = 0; band < 4; band++) {
        const by = y + band * 8;
        const tone = hash2(o.x, o.y * 4 + band, 5);
        ctx.fillStyle = tone > 0.5 ? 'rgba(255,226,172,0.075)' : 'rgba(52,30,13,0.075)';
        ctx.fillRect(x, by, TILE, 8);
        ctx.fillStyle = 'rgba(41,24,10,0.52)';
        ctx.fillRect(x, by, TILE, 1.3);
        ctx.fillStyle = 'rgba(255,228,182,0.10)';
        ctx.fillRect(x, by + 1.3, TILE, 0.9);
        ctx.fillStyle = 'rgba(35,20,8,0.44)';
        ctx.fillRect(x + (band % 2 ? 11 : 22), by + 2, 1.1, 6);
        ctx.strokeStyle = 'rgba(74,46,22,0.20)'; ctx.lineWidth = 0.8;
        const gx = x + 3 + hash2(o.x + band, o.y, 3) * 18;
        ctx.beginPath(); ctx.moveTo(gx, by + 3.4); ctx.quadraticCurveTo(gx + 5, by + 4.6, gx + 9, by + 3.1); ctx.stroke();
        if (tone > 0.78) {
          ctx.strokeStyle = 'rgba(58,34,14,0.32)';
          ctx.beginPath(); ctx.ellipse(x + 7 + tone * 17, by + 4.8, 1.4, 1.9, 0, 0, TAU); ctx.stroke();
        }
        if (tone < 0.18) {
          ctx.fillStyle = 'rgba(36,21,9,0.45)';
          ctx.fillRect(x + 4, by + 4.6, 1.2, 1.2);
          ctx.fillRect(x + 26, by + 3.4, 1.2, 1.2);
        }
      }
      ctx.fillStyle = top;
      ctx.fillRect(x, y, s, 2.6);
      ctx.fillStyle = 'rgba(255,238,198,0.20)';
      ctx.fillRect(x, y, s, 1);
      ctx.fillStyle = dark;
      ctx.fillRect(x, y + s - 2.6, s, 2.6);
    }
    ctx.restore();
  }

  drawDoor(ctx, o, time) {
    const x = o.x * TILE, y = o.y * TILE, s = TILE;
    ctx.save();
    ctx.fillStyle = 'rgba(18,22,16,0.22)';
    ctx.fillRect(x + 2, y + 4, s, s - 1);
    ctx.fillStyle = '#6c4d2e';
    ctx.fillRect(x, y, s, s);
    ctx.fillStyle = '#8f6b43';
    ctx.fillRect(x + 2, y + 2, s - 4, s - 4);
    // frame
    ctx.fillStyle = '#5b3f24';
    ctx.fillRect(x, y, 3, s); ctx.fillRect(x + s - 3, y, 3, s);
    // leaf swings open
    ctx.save();
    ctx.translate(x + 3, y + 3);
    ctx.rotate(-o.open * 1.0);
    ctx.fillStyle = '#9a7549';
    ctx.fillRect(0, 0, s - 6, s - 6);
    for (let i = 0; i < 2; i++) {
      ctx.strokeStyle = 'rgba(70,47,26,0.35)'; ctx.lineWidth = 0.9;
      ctx.beginPath(); ctx.moveTo(4, 6 + i * 9); ctx.lineTo(s - 10, 6 + i * 9); ctx.stroke();
    }
    ctx.fillStyle = '#5a3d22';
    ctx.fillRect(s - 12, (s - 6) / 2 - 1.5, 3, 3);
    ctx.strokeStyle = 'rgba(50,32,16,0.5)';
    ctx.strokeRect(0.5, 0.5, s - 7, s - 7);
    ctx.restore();
    ctx.strokeStyle = 'rgba(40,27,14,0.5)';
    ctx.strokeRect(x + 1, y + 1, s - 2, s - 2);
    ctx.restore();
  }

  drawFloorPatch(ctx, o, stone) {
    const x = o.x * TILE, y = o.y * TILE, s = TILE;
    ctx.save();
    ctx.fillStyle = stone ? '#726d65' : '#8a6844';
    ctx.fillRect(x, y, s, s);
    if (stone) {
      ctx.strokeStyle = 'rgba(40,38,35,0.35)'; ctx.lineWidth = 1;
      ctx.strokeRect(x + 0.5, y + 0.5, s / 2, s / 2);
      ctx.strokeRect(x + s / 2, y + s / 2, s / 2, s / 2);
    } else {
      ctx.strokeStyle = 'rgba(55,36,19,0.35)'; ctx.lineWidth = 1;
      for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(x, y + i * 8); ctx.lineTo(x + s, y + i * 8); ctx.stroke(); }
    }
    ctx.restore();
  }

  drawSandbag(ctx, o) {
    const x = o.x * TILE, y = o.y * TILE, s = TILE;
    ctx.save();
    ctx.fillStyle = 'rgba(20,24,18,0.22)';
    ctx.beginPath(); ctx.ellipse(x + 17, y + 28, 13, 4.5, 0, 0, TAU); ctx.fill();
    const bags = [[7, 25, 7.5, 5.5, '#a89163'], [17, 26, 8, 6, '#b29a69'], [26, 24.5, 6.6, 5.2, '#9b8558'], [12, 17, 8, 6, '#b09a6d'], [22, 16.5, 7.5, 5.6, '#a38d60']];
    for (const [bx, by, rx, ry, c] of bags) {
      ctx.fillStyle = c;
      roundRect(ctx, x + bx - rx, y + by - ry, rx * 2, ry * 2, ry);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.12)';
      roundRect(ctx, x + bx - rx + 2, y + by - ry + 1.5, rx * 2 - 4, ry * 0.8, ry * 0.4); ctx.fill();
      ctx.strokeStyle = 'rgba(75,62,40,0.4)'; ctx.lineWidth = 0.9;
      ctx.beginPath(); ctx.moveTo(x + bx - rx + 3, y + by); ctx.lineTo(x + bx + rx - 3, y + by); ctx.stroke();
      ctx.fillStyle = 'rgba(78,64,42,0.5)';
      ctx.fillRect(x + bx - 1, y + by - ry, 1.4, ry * 2);
    }
    ctx.restore();
  }

  drawBed(ctx, o) {
    const rot = o.rot % 180 === 90;
    const w = rot ? TILE * 2 : TILE, h = rot ? TILE : TILE * 2;
    const x = o.x * TILE, y = o.y * TILE;
    ctx.save();
    ctx.translate(x + w / 2, y + h / 2);
    if (rot) ctx.rotate(Math.PI / 2);
    ctx.translate(-w / 2, -h / 2);
    const bw = w - 5, bh = h - 5;
    ctx.fillStyle = 'rgba(18,22,16,0.30)';
    roundRect(ctx, 4.5, 6.5, bw, bh, 3.5); ctx.fill();
    // wooden frame and headboard
    ctx.fillStyle = '#4f3720';
    roundRect(ctx, 1.5, 1.5, bw, bh, 3.5); ctx.fill();
    ctx.fillStyle = '#7b5836';
    roundRect(ctx, 2.8, 2.8, bw - 2.6, bh - 2.6, 3); ctx.fill();
    ctx.fillStyle = '#8f6a43';
    roundRect(ctx, 2.8, 2.8, bw - 2.6, 6.5, 2.6); ctx.fill();
    ctx.fillStyle = 'rgba(255,230,186,0.22)';
    ctx.fillRect(4, 3.3, bw - 4.6, 1.2);
    ctx.fillStyle = 'rgba(40,25,12,0.4)';
    ctx.fillRect(4, 8.6, bw - 4.6, 1.1);
    // mattress
    ctx.fillStyle = '#ddd7c6';
    roundRect(ctx, 5.2, 10, bw - 7, bh - 12.5, 2.6); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.36)';
    roundRect(ctx, 6, 10.6, bw - 8.6, 2.4, 1.2); ctx.fill();
    // pillow with a soft crease
    ctx.fillStyle = '#f0ebdd';
    roundRect(ctx, 6.4, 11.4, bw - 9.6, 8.6, 2.4); ctx.fill();
    ctx.fillStyle = 'rgba(120,108,88,0.20)';
    roundRect(ctx, 6.4, 18.2, bw - 9.6, 1.8, 1); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.55)'; ctx.lineWidth = 0.7;
    ctx.beginPath(); ctx.moveTo(8, 14); ctx.quadraticCurveTo(w / 2, 15.4, w - 9, 13.6); ctx.stroke();
    // blanket
    const shadeC = ['#7e8b6c', '#8d6a5e', '#667b86', '#8a7a58', '#756b88'][o.seed % 5];
    const by = h * 0.47;
    ctx.fillStyle = 'rgba(30,24,16,0.20)';
    roundRect(ctx, 5.6, by + 1, bw - 7.6, bh - by - 4.4, 2); ctx.fill();
    ctx.fillStyle = shadeC;
    roundRect(ctx, 5.4, by, bw - 7.6, bh - by - 4.6, 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.16)';
    roundRect(ctx, 5.4, by, bw - 7.6, 3.2, 1.4); ctx.fill();
    ctx.fillStyle = 'rgba(0,0,0,0.10)';
    ctx.fillRect(5.4, by + 3.2, bw - 7.6, 1);
    ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(6.4, by + 8); ctx.lineTo(w - 7.6, by + 7.4); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(6.4, h - 10); ctx.lineTo(w - 7.6, h - 10.7); ctx.stroke();
    // stitched edge
    ctx.strokeStyle = 'rgba(28,22,15,0.28)'; ctx.lineWidth = 0.8;
    roundRect(ctx, 5.4, by, bw - 7.6, bh - by - 4.6, 2); ctx.stroke();
    ctx.restore();
  }

  drawTable(ctx, o) {
    const x = o.x * TILE, y = o.y * TILE, w = o.w * TILE, h = o.h * TILE;
    ctx.save();
    ctx.fillStyle = 'rgba(20,24,18,0.22)';
    roundRect(ctx, x + 3, y + 4, w - 5, h - 4, 3); ctx.fill();
    ctx.fillStyle = '#6b4e30';
    roundRect(ctx, x + 2, y + 3, w - 5, h - 5, 3); ctx.fill();
    ctx.fillStyle = '#8b6741';
    roundRect(ctx, x + 1.5, y + 1.5, w - 5, h - 5, 3); ctx.fill();
    ctx.fillStyle = '#9c774b';
    roundRect(ctx, x + 2, y + 2, w - 7, h - 7, 2.5); ctx.fill();
    ctx.strokeStyle = 'rgba(84,58,32,0.35)'; ctx.lineWidth = 0.8;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(x + 6, y + 6 + i * 6);
      ctx.quadraticCurveTo(x + w / 2, y + 4 + i * 6, x + w - 8, y + 6 + i * 6);
      ctx.stroke();
    }
    const sd = o.seed || 1;
    if (sd % 3 === 0) {
      // bowl and cup
      ctx.fillStyle = '#d8d0bc';
      ctx.beginPath(); ctx.ellipse(x + w * 0.3, y + h / 2, 4, 2.6, 0, 0, TAU); ctx.fill();
      ctx.fillStyle = '#a77b46';
      ctx.beginPath(); ctx.ellipse(x + w * 0.3, y + h / 2 - 0.4, 2.8, 1.6, 0, 0, TAU); ctx.fill();
      ctx.fillStyle = '#c9bda6';
      ctx.beginPath(); ctx.arc(x + w * 0.7, y + h / 2, 2.4, 0, TAU); ctx.fill();
    }
    ctx.restore();
  }

  drawChair(ctx, o) {
    const x = o.x * TILE + TILE / 2, y = o.y * TILE + TILE / 2;
    const cv = ['#8a5a4a', '#6d7a58', '#6b7285', '#8a744f'][(o.seed || 1) % 4];
    ctx.save();
    ctx.fillStyle = 'rgba(20,24,18,0.2)';
    ctx.beginPath(); ctx.ellipse(x + 3, y + 8, 9, 3.5, 0, 0, TAU); ctx.fill();
    ctx.fillStyle = '#5c4127';
    ctx.fillRect(x - 8, y + 4, 2, 5); ctx.fillRect(x + 6, y + 4, 2, 5);
    ctx.fillStyle = '#85633e';
    roundRect(ctx, x - 9, y - 2, 18, 8, 2); ctx.fill();
    ctx.fillStyle = cv;
    roundRect(ctx, x - 8, y - 1.5, 16, 6, 1.8); ctx.fill();
    ctx.fillStyle = '#74522f';
    roundRect(ctx, x - 9, y - 11, 18, 5, 2); ctx.fill();
    ctx.fillStyle = cv;
    roundRect(ctx, x - 8, y - 10, 16, 3.4, 1.5); ctx.fill();
    ctx.strokeStyle = 'rgba(60,40,22,0.5)';
    ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(x - 6, y - 7); ctx.lineTo(x - 6, y + 3); ctx.moveTo(x + 6, y - 7); ctx.lineTo(x + 6, y + 3); ctx.stroke();
    ctx.restore();
  }

  drawLamp(ctx, o, time) {
    const x = o.x * TILE + TILE / 2, y = o.y * TILE + TILE - 5;
    ctx.save();
    ctx.fillStyle = 'rgba(20,24,18,0.22)';
    ctx.beginPath(); ctx.ellipse(x + 3, y + 1, 7, 3, 0, 0, TAU); ctx.fill();
    ctx.fillStyle = '#4a4d4a';
    ctx.beginPath(); ctx.ellipse(x, y, 6, 2.8, 0, 0, TAU); ctx.fill();
    ctx.fillStyle = '#6a6e68';
    ctx.fillRect(x - 1.2, y - 24, 2.4, 24);
    ctx.fillStyle = '#8a8d84';
    ctx.fillRect(x - 1.2, y - 24, 1, 24);
    ctx.fillStyle = '#3d403c';
    roundRect(ctx, x - 5.5, y - 31, 11, 5, 2); ctx.fill();
    const flicker = 0.85 + Math.sin(time * 7 + o.seed) * 0.06;
    const g = ctx.createRadialGradient(x, y - 29, 0, x, y - 29, 6);
    g.addColorStop(0, `rgba(255,236,180,${0.95 * flicker})`);
    g.addColorStop(1, 'rgba(255,190,100,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y - 29, 6, 0, TAU); ctx.fill();
    ctx.fillStyle = '#f6dc9d';
    ctx.beginPath(); ctx.arc(x, y - 29, 2.6, 0, TAU); ctx.fill();
    ctx.restore();
  }

  drawCampfire(ctx, o, time) {
    const x = o.x * TILE + TILE / 2, y = o.y * TILE + TILE - 7;
    ctx.save();
    ctx.fillStyle = 'rgba(20,20,14,0.18)';
    ctx.beginPath(); ctx.ellipse(x + 2, y + 5, 13, 5, 0, 0, TAU); ctx.fill();
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * TAU;
      const r = hash2(i, o.seed, 4);
      ctx.fillStyle = i % 2 ? '#7c7468' : '#8c8477';
      ctx.beginPath(); ctx.ellipse(x + Math.cos(a) * 11, y + Math.sin(a) * 5.5, 3 + r * 1.5, 2.2 + r, a, 0, TAU); ctx.fill();
    }
    ctx.strokeStyle = '#5b4127'; ctx.lineWidth = 4; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x - 6, y + 2); ctx.lineTo(x + 6, y - 4); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x - 5, y - 4); ctx.lineTo(x + 6, y + 2); ctx.stroke();
    ctx.strokeStyle = '#7c5a35'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(x - 6, y + 1); ctx.lineTo(x + 5, y - 4); ctx.stroke();
    const flick = Math.sin(time * 8 + o.seed) * 0.5 + Math.sin(time * 13.7) * 0.25;
    ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 3; i++) {
      const h = 12 + i * 4 + flick * 2;
      const wdt = 5 - i;
      ctx.fillStyle = i === 0 ? 'rgba(255,225,150,0.85)' : i === 1 ? 'rgba(255,160,64,0.55)' : 'rgba(230,90,30,0.25)';
      ctx.beginPath();
      ctx.moveTo(x - wdt, y);
      ctx.quadraticCurveTo(x - wdt * 0.5, y - h * 0.6, x + flick * 2, y - h);
      ctx.quadraticCurveTo(x + wdt * 0.6, y - h * 0.5, x + wdt, y);
      ctx.closePath(); ctx.fill();
    }
    ctx.fillStyle = 'rgba(255,210,120,0.8)';
    for (let i = 0; i < 3; i++) {
      const a = time * (1.3 + i * 0.2) + i * 2;
      ctx.beginPath(); ctx.arc(x + Math.cos(a) * 5, y - 8 - Math.abs(Math.sin(a)) * 10, 0.9, 0, TAU); ctx.fill();
    }
    ctx.restore();
  }

  drawSculpture(ctx, o) {
    const x = o.x * TILE + TILE / 2, y = o.y * TILE + TILE - 3;
    ctx.save();
    ctx.fillStyle = 'rgba(20,24,18,0.22)';
    ctx.beginPath(); ctx.ellipse(x + 3, y + 1, 9, 3, 0, 0, TAU); ctx.fill();
    ctx.fillStyle = '#6d5133';
    roundRect(ctx, x - 7, y - 6, 14, 6, 2); ctx.fill();
    ctx.fillStyle = '#8c6a45';
    roundRect(ctx, x - 6, y - 6, 12, 3, 1.5); ctx.fill();
    ctx.strokeStyle = '#a07a4c'; ctx.lineWidth = 3.2; ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x - 3, y - 7);
    ctx.bezierCurveTo(x - 9, y - 16, x + 8, y - 17, x + 2, y - 27);
    ctx.bezierCurveTo(x - 2, y - 33, x + 5, y - 34, x + 6, y - 29);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(224,190,132,0.5)'; ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(x - 2, y - 9);
    ctx.bezierCurveTo(x - 6, y - 17, x + 6, y - 18, x + 2, y - 26);
    ctx.stroke();
    ctx.fillStyle = 'rgba(230,200,150,0.7)';
    ctx.beginPath(); ctx.arc(x + 6, y - 29, 1.4, 0, TAU); ctx.fill();
    ctx.restore();
  }

  drawStove(ctx, o, time) {
    const x = o.x * TILE, y = o.y * TILE, w = TILE, h = TILE * 2;
    const cooking = o.reservedBy != null && this.world.pawnById(o.reservedBy)?.task?.type === 'cook';
    ctx.save();
    ctx.fillStyle = 'rgba(18,22,18,0.28)';
    roundRect(ctx, x + 3, y + 5, w - 4, h - 5, 4); ctx.fill();
    // enamel body
    const body = ctx.createLinearGradient(x, y, x + w, y + h);
    body.addColorStop(0, '#8a908b');
    body.addColorStop(0.45, '#727873');
    body.addColorStop(1, '#565c58');
    ctx.fillStyle = body;
    roundRect(ctx, x + 2, y + 2, w - 4, h - 5, 3.5); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.20)';
    roundRect(ctx, x + 3.4, y + 3.2, 5.4, h - 9, 2.2); ctx.fill();
    // cast-iron cooktop
    ctx.fillStyle = '#303634';
    roundRect(ctx, x + 3.5, y + 3.5, w - 7, 26, 2.5); ctx.fill();
    ctx.strokeStyle = '#1c211f'; ctx.lineWidth = 1.2;
    roundRect(ctx, x + 3.5, y + 3.5, w - 7, 26, 2.5); ctx.stroke();
    for (const [bx, by, br] of [[x + 11, y + 11, 5.6], [x + 22, y + 19, 4.2]]) {
      ctx.fillStyle = '#454b49';
      ctx.beginPath(); ctx.arc(bx, by, br, 0, TAU); ctx.fill();
      ctx.strokeStyle = cooking ? 'rgba(255,146,66,0.85)' : 'rgba(20,24,23,0.8)';
      ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.arc(bx, by, br - 0.7, 0, TAU); ctx.stroke();
      ctx.strokeStyle = 'rgba(0,0,0,0.45)'; ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.arc(bx, by, br * 0.56, 0, TAU); ctx.stroke();
    }
    // pot on the front burner
    ctx.fillStyle = '#707774';
    roundRect(ctx, x + 6.5, y + 5.5, 10, 8, 2.5); ctx.fill();
    ctx.fillStyle = '#b3b7b0';
    ctx.beginPath(); ctx.ellipse(x + 11.5, y + 6.2, 5.4, 1.9, 0, 0, TAU); ctx.fill();
    ctx.fillStyle = '#3d4341';
    ctx.beginPath(); ctx.ellipse(x + 11.5, y + 6.2, 3.8, 1.15, 0, 0, TAU); ctx.fill();
    if (cooking) {
      ctx.fillStyle = 'rgba(255,168,84,0.5)';
      ctx.beginPath(); ctx.ellipse(x + 11.5, y + 6, 4.2, 1.7, 0, 0, TAU); ctx.fill();
    }
    // flue collar at the back corner
    ctx.fillStyle = '#4d5350';
    ctx.beginPath(); ctx.arc(x + 25, y + 8, 3.6, 0, TAU); ctx.fill();
    ctx.strokeStyle = '#a3a8a2'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.arc(x + 25, y + 8, 3.6, 0, TAU); ctx.stroke();
    ctx.fillStyle = '#242927';
    ctx.beginPath(); ctx.arc(x + 25, y + 8, 2.1, 0, TAU); ctx.fill();
    // control strip
    ctx.fillStyle = '#666c68';
    roundRect(ctx, x + 3.5, y + 31.5, w - 7, 9, 1.8); ctx.fill();
    ctx.fillStyle = '#2c302e';
    roundRect(ctx, x + 4.5, y + 32.5, w - 9, 7, 1.4); ctx.fill();
    for (let i = 0; i < 3; i++) {
      const kx = x + 8.5 + i * 6.4;
      ctx.fillStyle = '#c9b184';
      ctx.beginPath(); ctx.arc(kx, y + 36, 1.8, 0, TAU); ctx.fill();
      ctx.fillStyle = cooking && i === 0 ? '#ff9a4a' : '#8a918c';
      ctx.fillRect(kx - 0.4, y + 34.2, 0.9, 1.2);
    }
    // oven door
    ctx.fillStyle = '#3f4542';
    roundRect(ctx, x + 5, y + 42, w - 10, 15.5, 2); ctx.fill();
    ctx.strokeStyle = '#1e2321'; ctx.lineWidth = 1;
    roundRect(ctx, x + 6.2, y + 43.3, w - 12.4, 12.6, 1.6); ctx.stroke();
    ctx.fillStyle = cooking ? 'rgba(255,142,62,0.55)' : 'rgba(44,55,55,0.72)';
    roundRect(ctx, x + 7.4, y + 44.4, w - 14.8, 10.4, 1.2); ctx.fill();
    if (cooking) {
      ctx.fillStyle = 'rgba(255,206,132,0.55)';
      roundRect(ctx, x + 8.6, y + 45.4, w - 17.2, 4, 1); ctx.fill();
    }
    ctx.fillStyle = 'rgba(255,255,255,0.18)';
    ctx.fillRect(x + 7.5, y + 44.6, w - 15, 1);
    // handle
    ctx.fillStyle = '#b4b8b2';
    roundRect(ctx, x + 8, y + 56.5, w - 16, 2.4, 1.2); ctx.fill();
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(x + 9, y + 58.6, w - 18, 0.8);
    // feet
    ctx.fillStyle = '#3a3f3c';
    ctx.fillRect(x + 4, y + h - 2.4, 5, 2.4);
    ctx.fillRect(x + w - 9, y + h - 2.4, 5, 2.4);
    ctx.restore();
  }

  drawBench(ctx, o, time) {
    const x = o.x * TILE, y = o.y * TILE, w = o.w * TILE, h = o.h * TILE;
    ctx.save();
    ctx.fillStyle = 'rgba(20,24,18,0.22)';
    roundRect(ctx, x + 3, y + 4, w - 6, h - 3, 3); ctx.fill();
    ctx.fillStyle = '#6b4e30';
    roundRect(ctx, x + 2, y + 2, w - 4, h - 4, 3); ctx.fill();
    ctx.fillStyle = '#917049';
    roundRect(ctx, x + 2, y + 2, w - 6, h - 7, 2.5); ctx.fill();
    // papers
    const papers = [[10, 8, 9, 7, -0.12], [24, 7, 8, 6, 0.1], [38, 10, 10, 6, -0.05], [48, 16, 7, 6, 0.16]];
    for (const [px, py, pw, ph, rot] of papers) {
      ctx.save(); ctx.translate(x + px + pw / 2, y + py + ph / 2); ctx.rotate(rot);
      ctx.fillStyle = '#e2dccb'; ctx.fillRect(-pw / 2, -ph / 2, pw, ph);
      ctx.strokeStyle = 'rgba(90,85,70,0.4)'; ctx.lineWidth = 0.5;
      for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-pw / 2 + 1, -ph / 2 + i * 1.6); ctx.lineTo(pw / 2 - 1.5, -ph / 2 + i * 1.6); ctx.stroke(); }
      ctx.restore();
    }
    // books
    ctx.fillStyle = '#7d4a3f'; ctx.fillRect(x + 6, y + 20, 8, 3);
    ctx.fillStyle = '#4f6570'; ctx.fillRect(x + 7, y + 17, 7, 3);
    // microscope
    ctx.strokeStyle = '#b5b8b2'; ctx.lineWidth = 2.2;
    ctx.beginPath(); ctx.moveTo(x + w - 17, y + 20); ctx.quadraticCurveTo(x + w - 12, y + 8, x + w - 20, y + 9); ctx.stroke();
    ctx.fillStyle = '#5f6765'; ctx.fillRect(x + w - 21, y + 20, 10, 2);
    ctx.fillStyle = '#8fb0b8'; ctx.beginPath(); ctx.arc(x + w - 18, y + 10, 2.4, 0, TAU); ctx.fill();
    // beaker + glow
    ctx.fillStyle = 'rgba(110,180,170,0.7)'; ctx.fillRect(x + 18, y + 18, 4, 6);
    ctx.fillStyle = 'rgba(190,235,225,0.5)'; ctx.fillRect(x + 18, y + 18, 4, 2);
    const g = ctx.createRadialGradient(x + 27, y + 5, 0, x + 27, y + 5, 14);
    g.addColorStop(0, 'rgba(255,220,150,0.22)'); g.addColorStop(1, 'rgba(255,220,150,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x + 27, y + 5, 14, 0, TAU); ctx.fill();
    ctx.restore();
  }

  drawSolar(ctx, o, time) {
    const x = o.x * TILE, y = o.y * TILE, s = TILE * 2;
    const day = this.world.daylight();
    ctx.save();
    ctx.fillStyle = 'rgba(18,22,18,0.26)';
    ctx.fillRect(x + 5, y + 8, s - 5, s - 5);
    ctx.fillStyle = '#5b5f5d';
    ctx.fillRect(x + 3, y + 4, s - 8, s - 10);
    ctx.fillStyle = '#38464e';
    ctx.fillRect(x + 5, y + 6, s - 12, s - 15);
    // cells
    for (let cy = 0; cy < 5; cy++) {
      for (let cx = 0; cx < 6; cx++) {
        const bx = x + 7 + cx * 8.5, by = y + 8 + cy * 8.2;
        const r = hash2(cx, cy, o.seed);
        ctx.fillStyle = `rgba(${38 + r * 20},${70 + r * 20},${86 + r * 24},0.92)`;
        ctx.fillRect(bx, by, 7.2, 6.8);
        ctx.strokeStyle = 'rgba(140,175,185,0.12)'; ctx.lineWidth = 0.5;
        ctx.strokeRect(bx, by, 7.2, 6.8);
      }
    }
    // specular sweep
    const sx = ((time * 0.12) % 1) * s;
    const grad = ctx.createLinearGradient(x + 4, y + 4, x + s - 4, y + s - 4);
    grad.addColorStop(0, 'rgba(170,210,220,0.16)');
    grad.addColorStop(0.35, 'rgba(220,245,250,0.02)');
    grad.addColorStop(1, 'rgba(170,210,220,0.08)');
    ctx.fillStyle = grad;
    ctx.fillRect(x + 5, y + 6, s - 12, s - 15);
    ctx.fillStyle = 'rgba(255,255,255,0.16)';
    ctx.beginPath();
    ctx.moveTo(x + 10, y + 6); ctx.lineTo(x + 20, y + 6); ctx.lineTo(x + 10, y + 22); ctx.closePath(); ctx.fill();
    // frame
    ctx.strokeStyle = '#8a8f8a'; ctx.lineWidth = 2;
    ctx.strokeRect(x + 4.5, y + 5, s - 11, s - 13);
    // legs
    ctx.fillStyle = '#5f625e';
    ctx.fillRect(x + 8, y + s - 7, 4, 7);
    ctx.fillRect(x + s - 15, y + s - 7, 4, 7);
    // status LED
    ctx.fillStyle = day > 0.3 ? 'rgba(130,220,130,0.9)' : 'rgba(210,90,70,0.8)';
    ctx.beginPath(); ctx.arc(x + s - 12, y + s - 10, 1.6, 0, TAU); ctx.fill();
    ctx.restore();
  }

  drawBattery(ctx, o, time) {
    const x = o.x * TILE, y = o.y * TILE, w = TILE, h = TILE * 2;
    ctx.save();
    ctx.fillStyle = 'rgba(18,22,18,0.24)';
    roundRect(ctx, x + 3, y + 5, w - 3, h - 4, 4); ctx.fill();
    ctx.fillStyle = '#4b4f4e';
    roundRect(ctx, x + 2, y + 2, w - 4, h - 5, 3); ctx.fill();
    ctx.fillStyle = '#626866';
    roundRect(ctx, x + 4, y + 4, w - 8, h - 9, 2); ctx.fill();
    ctx.strokeStyle = '#2f3331'; ctx.lineWidth = 1;
    ctx.strokeRect(x + 6, y + 7, w - 12, h - 15);
    // hazard stripes
    ctx.save();
    ctx.beginPath(); ctx.rect(x + 6, y + 8, w - 12, 7); ctx.clip();
    for (let i = -8; i < 40; i += 8) {
      ctx.fillStyle = i % 16 === 0 ? 'rgba(200,170,80,0.6)' : 'rgba(35,35,32,0.6)';
      ctx.beginPath(); ctx.moveTo(x + 4 + i, y + 8); ctx.lineTo(x + 10 + i, y + 8); ctx.lineTo(x + 4 + i + 8, y + 15); ctx.lineTo(x + i - 2, y + 15); ctx.closePath(); ctx.fill();
    }
    ctx.restore();
    // bars
    for (let i = 0; i < 4; i++) {
      ctx.fillStyle = i < 3 ? 'rgba(120,200,135,0.9)' : 'rgba(70,80,70,0.7)';
      ctx.fillRect(x + 8, y + 22 + i * 5, w - 16, 2.6);
    }
    ctx.fillStyle = 'rgba(180,230,180,0.85)';
    ctx.beginPath(); ctx.arc(x + w - 9, y + 44, 1.6, 0, TAU); ctx.fill();
    ctx.strokeStyle = 'rgba(30,32,30,0.7)'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(x + 3, y + h - 6); ctx.lineTo(x + w - 3, y + h - 6); ctx.stroke();
    ctx.restore();
  }

  drawTurret(ctx, o, time) {
    const cx = o.x * TILE + TILE / 2, cy = o.y * TILE + TILE / 2;
    ctx.save();
    ctx.fillStyle = 'rgba(18,22,18,0.26)';
    ctx.beginPath(); ctx.ellipse(cx + 3, cy + 8, 15, 6, 0, 0, TAU); ctx.fill();
    ctx.fillStyle = '#3e4442';
    ctx.beginPath(); ctx.ellipse(cx, cy + 3, 13, 7, 0, 0, TAU); ctx.fill();
    ctx.fillStyle = '#565d59';
    ctx.beginPath(); ctx.ellipse(cx, cy + 1, 11, 5.5, 0, 0, TAU); ctx.fill();
    // ammo box
    ctx.fillStyle = '#4c514b';
    ctx.fillRect(cx - 13, cy + 2, 7, 8);
    ctx.fillStyle = '#8e8a6d'; ctx.fillRect(cx - 12, cy + 4, 5, 2);
    // rotating head
    ctx.save();
    ctx.translate(cx, cy - 3);
    ctx.rotate(o.angle);
    ctx.fillStyle = '#5b625e';
    roundRect(ctx, -5, -5, 11, 10, 3); ctx.fill();
    ctx.fillStyle = '#6c736e';
    roundRect(ctx, -4, -4, 9, 7, 2); ctx.fill();
    ctx.fillStyle = '#303532';
    ctx.fillRect(1, -2.2, 18, 4.4);
    ctx.fillStyle = '#7d837d';
    ctx.fillRect(8, -1.4, 12, 2.2);
    ctx.fillStyle = '#1d201f';
    ctx.fillRect(18, -2.4, 3, 4.8);
    ctx.fillStyle = 'rgba(210,80,60,0.9)';
    ctx.beginPath(); ctx.arc(-3, 0, 1.2, 0, TAU); ctx.fill();
    ctx.restore();
    if (o.flash > 0) {
      ctx.globalCompositeOperation = 'lighter';
      const g = ctx.createRadialGradient(cx + 20, cy - 3, 0, cx + 20, cy - 3, 16);
      g.addColorStop(0, 'rgba(255,240,190,0.8)'); g.addColorStop(1, 'rgba(255,170,80,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx + 20, cy - 3, 16, 0, TAU); ctx.fill();
    }
    ctx.restore();
  }

  drawGeneric(ctx, o) {
    const x = o.x * TILE, y = o.y * TILE, w = o.w * TILE, h = o.h * TILE;
    ctx.save();
    ctx.fillStyle = 'rgba(20,24,18,0.22)';
    ctx.fillRect(x + 3, y + 4, w - 3, h - 3);
    ctx.fillStyle = '#7a5d3c';
    roundRect(ctx, x + 2, y + 2, w - 5, h - 5, 3); ctx.fill();
    ctx.fillStyle = '#96784f';
    roundRect(ctx, x + 3, y + 3, w - 9, h - 9, 2); ctx.fill();
    ctx.restore();
  }

  drawItem(ctx, it) {
    const baseX = it.x * TILE + TILE / 2, baseY = it.y * TILE + TILE - 6;
    const n = it.seed % 7;
    const x = baseX + (n - 3) * 0.9, y = baseY;
    ctx.save();
    ctx.fillStyle = 'rgba(20,24,18,0.20)';
    ctx.beginPath(); ctx.ellipse(x + 3, y + 3, 9, 3.2, 0, 0, TAU); ctx.fill();
    const type = it.type;
    if (type === 'wood') {
      for (let i = 0; i < 3; i++) {
        const ly = y - 3 - i * 3.2;
        ctx.fillStyle = i === 1 ? '#7d5a36' : '#8f6a40';
        roundRect(ctx, x - 8 + i * 1.2, ly - 2.4, 15, 4, 1.8); ctx.fill();
        ctx.fillStyle = '#b08a58';
        ctx.beginPath(); ctx.ellipse(x + 7 + i * 1.2, ly - 0.4, 1.6, 1.6, 0, 0, TAU); ctx.fill();
        ctx.strokeStyle = 'rgba(70,48,26,0.6)'; ctx.lineWidth = 0.6;
        ctx.beginPath(); ctx.arc(x + 7 + i * 1.2, ly - 0.4, 0.8, 0, TAU); ctx.stroke();
      }
    } else if (type === 'stone') {
      const cols = ['#8c887f', '#7b776f', '#969187'];
      for (let i = 0; i < 3; i++) {
        ctx.fillStyle = cols[i];
        ctx.beginPath();
        ctx.moveTo(x - 7 + i * 5, y - i * 2);
        ctx.lineTo(x - 2 + i * 5, y - 4 - i * 2);
        ctx.lineTo(x + 1 + i * 5, y - 0.5 - i * 2);
        ctx.lineTo(x - 4 + i * 5, y + 1.6 - i * 2);
        ctx.closePath(); ctx.fill();
      }
    } else if (type === 'steel') {
      for (let i = 0; i < 3; i++) {
        ctx.fillStyle = i === 1 ? '#8c979c' : '#9da8ac';
        roundRect(ctx, x - 7 + i * 1.5, y - 2 - i * 2.6, 14, 3, 1); ctx.fill();
        ctx.fillStyle = 'rgba(230,245,250,0.5)';
        ctx.fillRect(x - 6 + i * 1.5, y - 2 + 0.4 - i * 2.6, 12, 0.8);
      }
    } else if (type === 'grain') {
      ctx.fillStyle = '#b99c62';
      roundRect(ctx, x - 6, y - 9, 12, 10, 3); ctx.fill();
      ctx.fillStyle = '#cfb47b';
      roundRect(ctx, x - 5, y - 8, 10, 3, 2); ctx.fill();
      ctx.strokeStyle = '#6b5736'; ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.moveTo(x - 4, y - 6); ctx.lineTo(x + 4, y - 6); ctx.stroke();
      ctx.strokeStyle = '#c8b471'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x + 4, y - 9); ctx.lineTo(x + 6, y - 14); ctx.stroke();
      ctx.fillStyle = '#ddc57c';
      for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.ellipse(x + 6 + (i % 2) * 1.4, y - 13 + i, 0.8, 1.4, 0.5, 0, TAU); ctx.fill(); }
    } else if (type === 'meal') {
      ctx.fillStyle = '#d8d0bb';
      ctx.beginPath(); ctx.ellipse(x, y - 2, 7, 3.5, 0, 0, TAU); ctx.fill();
      ctx.fillStyle = '#b18a58';
      ctx.beginPath(); ctx.ellipse(x, y - 2.5, 5, 2.3, 0, 0, TAU); ctx.fill();
      ctx.fillStyle = '#7d5c38';
      ctx.beginPath(); ctx.ellipse(x, y - 2.8, 3.6, 1.5, 0, 0, TAU); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.beginPath(); ctx.ellipse(x - 2, y - 3, 1.2, 0.6, 0, 0, TAU); ctx.fill();
    } else if (type === 'meat') {
      ctx.fillStyle = '#a75850';
      roundRect(ctx, x - 6, y - 5, 8, 5, 2); ctx.fill();
      ctx.fillStyle = '#c4786d';
      roundRect(ctx, x + 1, y - 3, 6, 4, 2); ctx.fill();
      ctx.fillStyle = 'rgba(240,200,185,0.5)';
      ctx.fillRect(x - 4, y - 4, 2, 1.2);
    } else if (type === 'silver') {
      for (let i = 0; i < 4; i++) {
        ctx.fillStyle = i % 2 ? '#c6cbd1' : '#aeb5bd';
        ctx.beginPath(); ctx.ellipse(x - 4 + i * 3, y - 1.5 - (i % 2) * 1.2, 3.6, 1.6, 0, 0, TAU); ctx.fill();
        ctx.strokeStyle = 'rgba(70,75,82,0.5)'; ctx.lineWidth = 0.6;
        ctx.beginPath(); ctx.ellipse(x - 4 + i * 3, y - 1.5 - (i % 2) * 1.2, 3.6, 1.6, 0, 0, TAU); ctx.stroke();
      }
    }
    ctx.restore();
  }

  // ---------------------------------------------------------------- pawns
  drawPawnWorld(ctx, p) {
    const px = p.x * TILE;
    const py = p.y * TILE + 8;
    if (p.kind === 'animal') { this.drawAnimal(ctx, p, px, py); return; }

    const human = true;
    const isRaider = p.kind === 'raider';
    const app = p.appearance || {};
    const dead = p.dead;
    const down = p.downed && !dead;
    const sleeping = p.sleeping;
    const lying = dead || down || sleeping;

    // Ground shadow.
    ctx.save();
    const shR = lying ? 12 : 8.4;
    const sg = ctx.createRadialGradient(px + 2, py + 1.5, 0, px + 2, py + 1.5, shR);
    sg.addColorStop(0, 'rgba(10,14,9,0.30)');
    sg.addColorStop(1, 'rgba(10,14,9,0)');
    ctx.fillStyle = sg;
    ctx.beginPath(); ctx.ellipse(px + 2, py + 1.5, shR, shR * 0.38, -0.1, 0, TAU); ctx.fill();
    ctx.restore();

    if (lying) {
      this.drawLyingPawn(ctx, p, px, py);
      return;
    }

    const dir = Math.cos(p.facing) >= -0.02 ? 1 : -1;
    const moving = p.moving && p.path.length > 0;
    const phase = p.walkPhase;
    const swing = moving ? Math.sin(phase) : 0;
    const bob = moving ? Math.abs(Math.sin(phase)) * 1.1 : (p.working ? Math.sin(p.workAnim * 4) * 0.5 : 0);
    const armSwing = moving ? Math.sin(phase + P) * 3.2 : 0;
    const working = p.working && p.phase === 'work';
    const armLift = working ? Math.sin(p.workAnim * 8) * 3 : 0;

    ctx.save();
    ctx.translate(px, py - bob);
    ctx.scale(dir, 1);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Legs.
    const legSwing = swing * 3.4;
    for (const side of [-1, 1]) {
      const off = side === -1 ? 1.8 : -1.8;
      const sx = off, ex = off + (side === -1 ? legSwing : -legSwing);
      ctx.strokeStyle = app.pants || '#3f4a52';
      ctx.lineWidth = 3.6;
      ctx.beginPath();
      ctx.moveTo(off * 0.6, -8);
      ctx.lineTo(ex, 1);
      ctx.stroke();
      // boot
      ctx.fillStyle = '#3a2b20';
      roundRect(ctx, ex - 2.1, -0.4, 4.6, 3.2, 1.4); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fillRect(ex - 1.8, 0.1, 3.4, 0.7);
    }

    // Torso.
    const shirt = app.shirt || '#7d8c62';
    ctx.fillStyle = '#2c241c';
    roundRect(ctx, -5.4, -18.6, 10.8, 12.2, 4.4); ctx.fill();
    ctx.fillStyle = shirt;
    roundRect(ctx, -5, -18.2, 10, 11.4, 4); ctx.fill();
    // shirt shading
    const tg = ctx.createLinearGradient(-5, -18, 5, -7);
    tg.addColorStop(0, 'rgba(255,255,255,0.16)');
    tg.addColorStop(0.55, 'rgba(255,255,255,0.02)');
    tg.addColorStop(1, 'rgba(0,0,0,0.22)');
    ctx.fillStyle = tg;
    roundRect(ctx, -5, -18.2, 10, 11.4, 4); ctx.fill();
    // belt
    ctx.fillStyle = '#43301f';
    roundRect(ctx, -5.1, -9.4, 10.2, 2.6, 1); ctx.fill();
    ctx.fillStyle = '#c9b27a';
    ctx.fillRect(-0.8, -9.2, 1.7, 1.9);
    // collar / scarf
    if (app.scarf) {
      ctx.fillStyle = '#a8503f';
      roundRect(ctx, -5.2, -18.6, 10.4, 3, 2); ctx.fill();
      ctx.beginPath(); ctx.moveTo(2.2, -17); ctx.lineTo(5.4, -12.6); ctx.lineTo(3.4, -12.2); ctx.lineTo(1.2, -16); ctx.closePath(); ctx.fill();
    } else {
      ctx.fillStyle = 'rgba(28,24,20,0.55)';
      roundRect(ctx, -3.4, -18.8, 6.8, 2.1, 1); ctx.fill();
    }

    // Back arm (behind body).
    ctx.strokeStyle = shade(shirt, -0.24);
    ctx.lineWidth = 3.1;
    ctx.beginPath();
    ctx.moveTo(-3.8, -16.4);
    ctx.quadraticCurveTo(-6.2 - armSwing * 0.4, -12.6, -4.6 - armSwing, -8.8 + armLift * 0.3);
    ctx.stroke();
    ctx.fillStyle = app.skin || '#d29a74';
    ctx.beginPath(); ctx.arc(-4.6 - armSwing, -8.6 + armLift * 0.3, 1.9, 0, TAU); ctx.fill();

    // Head.
    const headY = -22.2;
    const headR = 4.35;
    ctx.fillStyle = app.skin || '#d29a74';
    ctx.beginPath(); ctx.ellipse(0.2, headY, headR * 0.9, headR, 0, 0, TAU); ctx.fill();
    // neck
    ctx.fillStyle = shade(app.skin || '#d29a74', -0.12);
    ctx.fillRect(-1.6, -19.2, 3.2, 2.2);
    // cheek shading
    ctx.fillStyle = 'rgba(70,35,20,0.16)';
    ctx.beginPath(); ctx.ellipse(1.6, headY + 1.4, 2.2, 2.6, 0.2, 0, TAU); ctx.fill();
    // ear
    ctx.fillStyle = shade(app.skin || '#d29a74', -0.08);
    ctx.beginPath(); ctx.ellipse(-2.9, headY + 0.6, 1.05, 1.35, 0, 0, TAU); ctx.fill();
    // face: eyes and mouth
    ctx.fillStyle = '#241a14';
    ctx.beginPath(); ctx.ellipse(2.15, headY - 0.3, 0.62, 0.78, 0, 0, TAU); ctx.fill();
    ctx.beginPath(); ctx.ellipse(-0.35, headY - 0.3, 0.56, 0.72, 0, 0, TAU); ctx.fill();
    ctx.fillStyle = '#f2ece0';
    ctx.beginPath(); ctx.arc(2.3, headY - 0.45, 0.22, 0, TAU); ctx.fill();
    ctx.beginPath(); ctx.arc(-0.2, headY - 0.45, 0.2, 0, TAU); ctx.fill();
    // brow
    ctx.strokeStyle = 'rgba(48,32,22,0.65)'; ctx.lineWidth = 0.8;
    ctx.beginPath(); ctx.moveTo(1.35, headY - 1.5); ctx.lineTo(2.7, headY - 1.35); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-1.05, headY - 1.4); ctx.lineTo(0.35, headY - 1.55); ctx.stroke();
    // nose
    ctx.strokeStyle = 'rgba(120,70,45,0.55)'; ctx.lineWidth = 0.75;
    ctx.beginPath(); ctx.moveTo(2.2, headY + 0.4); ctx.lineTo(2.7, headY + 1.3); ctx.lineTo(2.1, headY + 1.5); ctx.stroke();
    // mouth
    ctx.strokeStyle = 'rgba(112,52,42,0.75)'; ctx.lineWidth = 0.8;
    ctx.beginPath(); ctx.moveTo(0.9, headY + 2.5); ctx.quadraticCurveTo(1.9, headY + 2.9, 2.6, headY + 2.35); ctx.stroke();
    // beard
    if (app.beard) {
      ctx.fillStyle = 'rgba(58,40,28,0.75)';
      ctx.beginPath();
      ctx.moveTo(-2.4, headY + 1.4);
      ctx.quadraticCurveTo(0, headY + 5.6, 3.3, headY + 1.6);
      ctx.quadraticCurveTo(2.6, headY + 3.4, 0.3, headY + 3.6);
      ctx.quadraticCurveTo(-1.4, headY + 3.2, -2.4, headY + 1.4);
      ctx.fill();
    }
    if (app.mask) {
      ctx.fillStyle = isRaider ? '#4a2b2b' : '#3f4440';
      roundRect(ctx, -2.4, headY + 0.7, 6, 3.4, 1.4); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.10)';
      ctx.fillRect(-1.6, headY + 1.2, 4.4, 0.6);
    }
    // hair
    this.drawHair(ctx, app, headY, headR, p.seed || 0);
    // hat
    if (app.hat === 'straw') {
      ctx.fillStyle = '#c9a761';
      ctx.beginPath(); ctx.ellipse(0, headY - 3.1, 7.4, 2.6, 0, 0, TAU); ctx.fill();
      ctx.fillStyle = '#b8944f';
      ctx.beginPath(); ctx.ellipse(0, headY - 4.2, 4.1, 2.9, 0, 0, TAU); ctx.fill();
      ctx.fillStyle = '#7d5f34';
      ctx.fillRect(-4, headY - 4.4, 8, 1.1);
    } else if (app.hat === 'cap') {
      ctx.fillStyle = '#4a5a4c';
      ctx.beginPath(); ctx.ellipse(0, headY - 3.2, 4.6, 2.6, 0, P, TAU); ctx.fill();
      ctx.fillRect(0, headY - 3.6, 6.4, 1.5);
    }
    // glasses
    if (app.glasses) {
      ctx.strokeStyle = 'rgba(40,44,46,0.85)'; ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.arc(2.15, headY - 0.3, 1.55, 0, TAU); ctx.stroke();
      ctx.beginPath(); ctx.arc(-0.35, headY - 0.3, 1.45, 0, TAU); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0.6, headY - 0.4); ctx.lineTo(0.1, headY - 0.4); ctx.stroke();
      ctx.fillStyle = 'rgba(200,235,245,0.16)';
      ctx.beginPath(); ctx.arc(2.2, headY - 0.5, 1.25, 0, TAU); ctx.fill();
    }

    // Front arm and tool.
    ctx.strokeStyle = shirt;
    ctx.lineWidth = 3.2;
    ctx.beginPath();
    ctx.moveTo(3.6, -16.2);
    ctx.quadraticCurveTo(6.4 + armSwing * 0.35, -12.4, 5.2 + armSwing, -8.7 - armLift * 0.4);
    ctx.stroke();
    ctx.fillStyle = app.skin || '#d29a74';
    ctx.beginPath(); ctx.arc(5.2 + armSwing, -8.5 - armLift * 0.4, 1.95, 0, TAU); ctx.fill();

    this.drawPawnTool(ctx, p, working, armSwing, armLift);
    if (p.carry) this.drawCarried(ctx, p);

    // Hurt flash.
    if (p.flash > 0) {
      ctx.globalCompositeOperation = 'source-atop';
      ctx.fillStyle = `rgba(255,70,55,${clamp(p.flash * 3.2, 0, 0.7)})`;
      ctx.fillRect(-12, -30, 24, 34);
      ctx.globalCompositeOperation = 'source-over';
    }
    ctx.restore();

    // Blood on the ground for the wounded.
    if (p.hp < p.maxHp * 0.55 && !p.dead) {
      ctx.save();
      ctx.globalAlpha = clamp((1 - p.hp / p.maxHp) * 0.5, 0, 0.4);
      ctx.fillStyle = '#571f1a';
      ctx.beginPath(); ctx.ellipse(px + 3, py + 1.5, 7, 2.6, -0.15, 0, TAU); ctx.fill();
      ctx.restore();
    }

    this.drawPawnBars(ctx, p, px, py);
    if (this.selected.has(p.id)) this.drawSelectionBrackets(ctx, px, py, p);
  }

  drawHair(ctx, app, headY, headR, seed) {
    const style = app.hairStyle || 'short';
    const color = app.hair || '#3d2b20';
    ctx.fillStyle = color;
    if (style === 'bald') {
      ctx.fillStyle = shade(app.skin || '#d29a74', -0.06);
      ctx.beginPath(); ctx.ellipse(0.2, headY - 1.4, 3.8, 2.6, 0, P, TAU); ctx.fill();
      return;
    }
    if (style === 'mohawk') {
      ctx.beginPath();
      ctx.moveTo(-1.4, headY - 3.4);
      ctx.lineTo(0.6, headY - 9.5);
      ctx.lineTo(2.4, headY - 3.2);
      ctx.closePath(); ctx.fill();
      return;
    }
    if (style === 'bun') {
      ctx.beginPath(); ctx.arc(-3.4, headY - 3.4, 2.5, 0, TAU); ctx.fill();
    }
    if (style === 'ponytail' || style === 'braids') {
      ctx.beginPath(); ctx.ellipse(-4.3, headY + 1.2, 1.9, 4.4, 0.35, 0, TAU); ctx.fill();
      if (style === 'braids') {
        ctx.strokeStyle = color; ctx.lineWidth = 1.1;
        for (let i = -1; i <= 1; i++) {
          ctx.beginPath(); ctx.ellipse(-4.1 + i * 0.9, headY + 2.2 + i * 0.8, 1.2, 4.2, 0.3, 0, TAU); ctx.stroke();
        }
      }
    }
    // Cap of hair.
    ctx.beginPath();
    ctx.ellipse(0.1, headY - 2.6, 4.25, 3.2, 0, P, TAU);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(-0.4, headY - 1.2, 3.2, 2.7, 0, P, TAU * 0.94);
    ctx.fill();
    if (style === 'long') {
      ctx.beginPath();
      ctx.ellipse(-2.9, headY + 1.4, 2, 4.4, 0.25, 0, TAU);
      ctx.fill();
    } else if (style === 'curly') {
      for (let i = 0; i < 5; i++) {
        const a = -0.4 - i * 0.48;
        ctx.beginPath(); ctx.arc(0.1 + Math.cos(a) * 3.7, headY - 2.1 + Math.sin(a) * 3.1, 1.7, 0, TAU); ctx.fill();
      }
    } else if (style === 'hood') {
      ctx.fillStyle = shade(app.shirt || '#7d8c62', -0.2);
      ctx.beginPath();
      ctx.moveTo(-4.7, headY + 3.8);
      ctx.quadraticCurveTo(-6.2, headY - 3, 0, headY - 6.2);
      ctx.quadraticCurveTo(6.2, headY - 3, 4.7, headY + 3.8);
      ctx.lineTo(2.2, headY + 2.4);
      ctx.quadraticCurveTo(0, headY + 1, -2.2, headY + 2.4);
      ctx.closePath(); ctx.fill();
    }
    // hair sheen
    ctx.strokeStyle = 'rgba(255,240,210,0.20)'; ctx.lineWidth = 0.8;
    ctx.beginPath(); ctx.moveTo(-2.2, headY - 4.3); ctx.quadraticCurveTo(0.2, headY - 5.2, 2.4, headY - 4); ctx.stroke();
  }

  drawPawnTool(ctx, p, working, armSwing, armLift) {
    const t = p.task?.type;
    const hx = 5.2 + armSwing, hy = -8.5 - armLift * 0.4;
    if (t === 'chop') {
      const a = -0.9 + Math.sin(p.workAnim * 7) * 0.5;
      ctx.save(); ctx.translate(hx, hy); ctx.rotate(a);
      ctx.strokeStyle = '#7a5a35'; ctx.lineWidth = 1.7;
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -10); ctx.stroke();
      ctx.fillStyle = '#9aa0a2';
      ctx.beginPath(); ctx.moveTo(0, -10); ctx.lineTo(5.2, -11.6); ctx.lineTo(5.8, -8.2); ctx.lineTo(0, -7.6); ctx.closePath(); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      ctx.beginPath(); ctx.moveTo(0.4, -10); ctx.lineTo(4.6, -11.1); ctx.lineTo(4.8, -9.8); ctx.closePath(); ctx.fill();
      ctx.restore();
      return;
    }
    if (t === 'mine' || t === 'deconstruct') {
      const a = -1.0 + Math.sin(p.workAnim * 6.2) * 0.65;
      ctx.save(); ctx.translate(hx, hy); ctx.rotate(a);
      ctx.strokeStyle = '#6f5433'; ctx.lineWidth = 1.7;
      ctx.beginPath(); ctx.moveTo(0, 2); ctx.lineTo(0, -10); ctx.stroke();
      ctx.strokeStyle = '#a3a8a9'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(-4.6, -9.4); ctx.quadraticCurveTo(0, -12.4, 4.8, -9.6); ctx.stroke();
      ctx.restore();
      return;
    }
    if (t === 'build' || t === 'plant' || t === 'harvest' || t === 'cook' || t === 'tend') {
      const a = -0.5 + Math.sin(p.workAnim * 8) * 0.3;
      ctx.save(); ctx.translate(hx, hy); ctx.rotate(a);
      if (t === 'build') {
        ctx.fillStyle = '#8a6a44'; ctx.fillRect(-0.8, -8, 2.4, 9);
        ctx.fillStyle = '#aab0b2'; ctx.fillRect(-2.2, -10, 5, 2.4);
      } else if (t === 'cook') {
        ctx.fillStyle = '#b9bcb5';
        ctx.beginPath(); ctx.ellipse(0, -2, 3.2, 1.5, 0, 0, TAU); ctx.fill();
        ctx.strokeStyle = '#8d918a'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(2.4, -2.2); ctx.lineTo(5, -3.6); ctx.stroke();
      } else if (t === 'tend') {
        ctx.fillStyle = '#e6e0d2'; ctx.fillRect(-1.6, -5, 3.2, 4);
        ctx.fillStyle = '#b8503f'; ctx.fillRect(-0.7, -4.4, 1.4, 2.6); ctx.fillRect(-1.3, -3.6, 3.2, 1);
      } else {
        ctx.strokeStyle = '#86a95c'; ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.moveTo(0, 1); ctx.lineTo(1.2, -5); ctx.stroke();
      }
      ctx.restore();
      return;
    }
    // Weapon.
    const wep = WEAPONS[p.weapon];
    if (!wep) return;
    const aiming = p.drafted || p.task?.type === 'attack' || p.task?.type === 'hunt';
    const recoil = p.recoil || 0;
    ctx.save();
    ctx.translate(hx - recoil * 4, hy + (aiming ? -1 : 1));
    if (wep.ranged) {
      ctx.rotate(aiming ? -0.12 : 0.38);
      ctx.fillStyle = '#5b4127';
      roundRect(ctx, -4.4, -1.7, 6, 2.8, 1); ctx.fill();
      ctx.fillStyle = '#4a4f4e';
      roundRect(ctx, 0.4, -1.9, 10.4, 2.3, 1); ctx.fill();
      ctx.fillStyle = '#767d7a';
      ctx.fillRect(2.4, -1.4, 6.4, 0.9);
      ctx.fillStyle = '#2c302f';
      ctx.fillRect(9.4, -1.5, 2.1, 1.6);
      ctx.fillStyle = '#8a6a3e';
      roundRect(ctx, 1.8, 0.2, 2.4, 2.2, 0.6); ctx.fill();
      if (wep.kind === 'shotgun') {
        ctx.fillStyle = '#6b4a2c'; ctx.fillRect(-1.4, -2.2, 4.6, 1.1);
      }
      if (wep.kind === 'rifle') {
        ctx.fillStyle = '#3b3f3e'; ctx.fillRect(4.2, -2.8, 2.8, 1.1);
      }
    } else {
      ctx.rotate(-0.5);
      ctx.fillStyle = '#5a3f24';
      roundRect(ctx, -0.6, 0, 2, 3.4, 0.6); ctx.fill();
      ctx.fillStyle = '#b9bfc1';
      ctx.beginPath(); ctx.moveTo(0.4, 0); ctx.lineTo(6.4, -1.3); ctx.lineTo(6.8, 0.4); ctx.lineTo(0.4, 2.1); ctx.closePath(); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      ctx.beginPath(); ctx.moveTo(0.8, 0.2); ctx.lineTo(6, -0.8); ctx.lineTo(6.1, -0.1); ctx.closePath(); ctx.fill();
    }
    ctx.restore();
    if (p.attackFlash > 0 && wep.ranged && aiming) {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      const mx = hx + 10 * Math.cos(-0.12), my = hy - 1 + 10 * Math.sin(-0.12);
      const g = ctx.createRadialGradient(mx, my, 0, mx, my, 9);
      g.addColorStop(0, 'rgba(255,238,180,0.75)');
      g.addColorStop(1, 'rgba(255,160,60,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(mx, my, 9, 0, TAU); ctx.fill();
      ctx.restore();
    }
  }

  drawCarried(ctx, p) {
    const item = p.carry;
    if (!item) return;
    const color = ITEMS[item.type]?.color || '#9a7444';
    ctx.save();
    ctx.translate(0.8, -13.4);
    const n = Math.min(3, 1 + Math.floor(item.qty / 12));
    for (let i = 0; i < n; i++) {
      ctx.fillStyle = i === 1 ? shade(color, -0.12) : color;
      roundRect(ctx, -5.4 + i * 0.8, -1.6 - i * 2.6, 10.4, 3, 1.2); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.18)';
      ctx.fillRect(-4.6 + i * 0.8, -1.3 - i * 2.6, 8.8, 0.7);
    }
    ctx.restore();
  }

  drawLyingPawn(ctx, p, px, py) {
    const app = p.appearance || {};
    const dead = p.dead;
    const sleeping = p.sleeping && !dead && !p.downed;
    const down = p.downed && !dead;
    const shirt = app.shirt || '#7d8c62';
    const skin = app.skin || '#d29a74';
    ctx.save();
    ctx.translate(px, py - 3.5);
    ctx.rotate(sleeping ? -P / 2 + 0.06 : -P / 2 + 0.22);
    ctx.scale(1, 1);
    // Body lying on the ground.
    ctx.fillStyle = shirt;
    roundRect(ctx, -4.4, -1.6, 9.4, 9.6, 4); ctx.fill();
    const g = ctx.createLinearGradient(-4, -1, 5, 8);
    g.addColorStop(0, 'rgba(255,255,255,0.14)');
    g.addColorStop(1, 'rgba(0,0,0,0.22)');
    ctx.fillStyle = g;
    roundRect(ctx, -4.4, -1.6, 9.4, 9.6, 4); ctx.fill();
    // Legs.
    ctx.strokeStyle = app.pants || '#3f4a52';
    ctx.lineWidth = 3.4; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-1.4, 7); ctx.lineTo(-2.4, 13.4); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(2, 7); ctx.lineTo(2.8, 13.2); ctx.stroke();
    ctx.fillStyle = '#3a2b20';
    roundRect(ctx, -4.2, 12.6, 3.6, 2.6, 1.2); ctx.fill();
    roundRect(ctx, 1.2, 12.4, 3.6, 2.6, 1.2); ctx.fill();
    // Arm.
    ctx.strokeStyle = shirt; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(-3.4, 1.2); ctx.quadraticCurveTo(-7, 2.4, -6.4, 5.6); ctx.stroke();
    ctx.fillStyle = skin;
    ctx.beginPath(); ctx.arc(-6.4, 5.8, 1.8, 0, TAU); ctx.fill();
    // Head.
    ctx.fillStyle = skin;
    ctx.beginPath(); ctx.ellipse(0, -3.2, 4.4, 4.1, 0.1, 0, TAU); ctx.fill();
    ctx.fillStyle = 'rgba(70,35,20,0.14)';
    ctx.beginPath(); ctx.ellipse(1.8, -1.7, 2, 2.4, 0, 0, TAU); ctx.fill();
    // closed eyes
    ctx.strokeStyle = 'rgba(45,30,22,0.8)'; ctx.lineWidth = 0.8;
    ctx.beginPath(); ctx.moveTo(1.2, -3.4); ctx.lineTo(2.6, -3.4); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-1.4, -3.4); ctx.lineTo(0, -3.4); ctx.stroke();
    ctx.fillStyle = app.hair || '#3d2b20';
    ctx.beginPath(); ctx.ellipse(-0.2, -5.6, 4.2, 2.8, 0.1, P, TAU); ctx.fill();
    if (app.beard) {
      ctx.fillStyle = 'rgba(58,40,28,0.7)';
      ctx.beginPath(); ctx.ellipse(0, -1.4, 2.6, 1.9, 0.1, 0, TAU); ctx.fill();
    }
    if (dead) {
      ctx.globalCompositeOperation = 'source-atop';
      ctx.fillStyle = 'rgba(70,30,26,0.32)';
      ctx.fillRect(-14, -10, 28, 30);
      ctx.globalCompositeOperation = 'source-over';
    }
    ctx.restore();

    // Bed blanket over sleeping colonists.
    if (sleeping && p.task?.bed) {
      const bed = p.task.bed;
      ctx.save();
      ctx.fillStyle = 'rgba(86,104,120,0.55)';
      roundRect(ctx, bed.x * TILE + 4, bed.y * TILE + TILE * 0.95, TILE - 8, TILE * 0.95, 3); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fillRect(bed.x * TILE + 5, bed.y * TILE + TILE * 0.98, TILE - 10, 2);
      ctx.restore();
    }
    // Downed marker / zzz
    if (down) {
      ctx.save();
      ctx.globalAlpha = 0.7 + Math.sin(this.time * 4) * 0.2;
      ctx.fillStyle = '#e0b0a4';
      ctx.font = 'bold 9px Inter, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('!', px, py - 20);
      ctx.restore();
    }
    if (sleeping) {
      ctx.save();
      ctx.fillStyle = 'rgba(200,220,235,0.75)';
      ctx.textAlign = 'center';
      for (let i = 0; i < 3; i++) {
        const ph = (this.time * 0.55 + i * 0.33) % 1;
        ctx.globalAlpha = (1 - ph) * 0.8;
        ctx.font = `600 ${6 + ph * 4}px Inter, system-ui, sans-serif`;
        ctx.fillText('z', px + 8 + ph * 4 + i * 2, py - 12 - ph * 13);
      }
      ctx.restore();
    }
  }

  drawAnimal(ctx, p, px, py) {
    const type = p.animalType || 'muffalo';
    const dead = p.dead;
    const down = p.downed && !dead;
    const lying = dead || down;
    const dir = Math.cos(p.facing ?? 0) >= 0 ? 1 : -1;
    const moving = p.moving && p.path.length > 0;
    const bob = moving ? Math.abs(Math.sin(p.walkPhase)) * 1.2 : Math.sin(this.time * 1.4 + p.id) * 0.5;
    ctx.save();
    const shR = type === 'muffalo' ? 15 : type === 'chicken' ? 6 : 7;
    ctx.fillStyle = 'rgba(12,16,10,0.25)';
    ctx.beginPath(); ctx.ellipse(px + 2, py + 1, shR, shR * 0.35, 0, 0, TAU); ctx.fill();
    ctx.translate(px, py - bob);
    ctx.scale(dir, 1);
    if (lying) { ctx.rotate(-P / 2 + 0.1); ctx.translate(-2, 2); }

    if (type === 'muffalo') {
      const fur = p.def?.fur || '#8a7c6a';
      const alt = p.def?.furAlt || '#6f6355';
      const legSwing = moving ? Math.sin(p.walkPhase) * 2.4 : 0;
      // legs
      ctx.strokeStyle = alt; ctx.lineWidth = 3.2; ctx.lineCap = 'round';
      for (const [lx, sw] of [[-8, legSwing], [-4, -legSwing], [6, -legSwing], [10, legSwing]]) {
        ctx.beginPath(); ctx.moveTo(lx, 3); ctx.lineTo(lx + sw * 0.5, 12); ctx.stroke();
        ctx.fillStyle = '#4a4239';
        roundRect(ctx, lx + sw * 0.5 - 1.8, 11.2, 3.8, 2.2, 1); ctx.fill();
      }
      // shaggy body
      ctx.fillStyle = fur;
      ctx.beginPath(); ctx.ellipse(1, -1.5, 14.5, 8.2, -0.04, 0, TAU); ctx.fill();
      ctx.fillStyle = alt;
      for (let i = 0; i < 9; i++) {
        const a = 0.3 + i * 0.32;
        ctx.beginPath(); ctx.ellipse(1 + Math.cos(a) * 12.4, -1.5 + Math.sin(a) * 6.4, 3.6, 4.4, a, 0, TAU); ctx.fill();
      }
      ctx.fillStyle = fur;
      ctx.beginPath(); ctx.ellipse(-1, -4, 11, 6.4, 0.1, 0, TAU); ctx.fill();
      // face / head
      ctx.fillStyle = shade(fur, -0.08);
      ctx.beginPath(); ctx.ellipse(12.4, -3.6, 5.4, 5.6, 0.2, 0, TAU); ctx.fill();
      ctx.fillStyle = '#3d3630';
      ctx.beginPath(); ctx.ellipse(16.4, -1.8, 3, 2.4, 0.2, 0, TAU); ctx.fill();
      ctx.fillStyle = '#241f1b';
      ctx.beginPath(); ctx.arc(13.8, -4.6, 0.9, 0, TAU); ctx.fill();
      // horns
      ctx.strokeStyle = '#c8bda3'; ctx.lineWidth = 1.8; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(12.2, -8.2); ctx.quadraticCurveTo(10.4, -12.4, 13.6, -13); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(15.2, -8); ctx.quadraticCurveTo(17.4, -11.8, 15, -12.4); ctx.stroke();
      // tail
      ctx.strokeStyle = alt; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(-13, -2); ctx.quadraticCurveTo(-16.4, 1, -15, 5); ctx.stroke();
      ctx.fillStyle = alt; ctx.beginPath(); ctx.arc(-15, 5, 1.8, 0, TAU); ctx.fill();
      // wool highlight
      ctx.fillStyle = 'rgba(255,255,255,0.10)';
      ctx.beginPath(); ctx.ellipse(-2, -6, 8, 3.4, 0.1, 0, TAU); ctx.fill();
      if (p.flash > 0) {
        ctx.globalCompositeOperation = 'source-atop';
        ctx.fillStyle = `rgba(255,70,55,${clamp(p.flash * 3, 0, 0.6)})`;
        ctx.fillRect(-20, -18, 40, 34);
        ctx.globalCompositeOperation = 'source-over';
      }
    } else if (type === 'chicken') {
      const fur = p.def?.fur || '#e8dfc8';
      const alt = p.def?.furAlt || '#d1c3a4';
      const legSwing = moving ? Math.sin(p.walkPhase) * 1.6 : 0;
      ctx.strokeStyle = '#c79a4e'; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(-1, 2); ctx.lineTo(-1.8 + legSwing, 7); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(2, 2); ctx.lineTo(2.6 - legSwing, 7); ctx.stroke();
      ctx.fillStyle = fur;
      ctx.beginPath(); ctx.ellipse(0, -2, 6.8, 5.2, -0.06, 0, TAU); ctx.fill();
      ctx.fillStyle = alt;
      ctx.beginPath(); ctx.ellipse(-1.6, -1.2, 4.6, 4, 0.3, 0, TAU); ctx.fill();
      // wing
      ctx.fillStyle = shade(fur, -0.12);
      ctx.beginPath(); ctx.ellipse(-0.4, -1.4, 3.6, 2.4, -0.2, 0, TAU); ctx.fill();
      // tail
      ctx.fillStyle = shade(fur, 0.06);
      ctx.beginPath(); ctx.moveTo(-5.8, -2.4); ctx.lineTo(-9.6, -6.4); ctx.lineTo(-8.2, -0.6); ctx.closePath(); ctx.fill();
      // head
      ctx.fillStyle = fur;
      ctx.beginPath(); ctx.arc(4.6, -7.2, 3.4, 0, TAU); ctx.fill();
      ctx.fillStyle = '#c8523c';
      ctx.beginPath(); ctx.ellipse(4.2, -10.4, 1.4, 2, 0, 0, TAU); ctx.fill();
      ctx.beginPath(); ctx.ellipse(6.4, -10, 1.2, 1.8, 0, 0, TAU); ctx.fill();
      ctx.fillStyle = '#e0a83c';
      ctx.beginPath(); ctx.moveTo(7.6, -7.4); ctx.lineTo(10.8, -6.4); ctx.lineTo(7.6, -5.6); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#e8d9b0';
      ctx.beginPath(); ctx.arc(5.2, -8.2, 1.4, 0, TAU); ctx.fill();
      ctx.fillStyle = '#241f1b';
      ctx.beginPath(); ctx.arc(5.5, -8.3, 0.7, 0, TAU); ctx.fill();
    } else {
      const fur = p.def?.fur || '#a08e75';
      const alt = p.def?.furAlt || '#86745c';
      const hop = moving ? Math.abs(Math.sin(p.walkPhase)) * 2.4 : 0;
      ctx.translate(0, -hop);
      ctx.fillStyle = fur;
      ctx.beginPath(); ctx.ellipse(-0.6, -3.6, 6.4, 5, -0.1, 0, TAU); ctx.fill();
      ctx.fillStyle = alt;
      ctx.beginPath(); ctx.ellipse(-3, -2.2, 4, 3.2, 0.25, 0, TAU); ctx.fill();
      // ears
      ctx.fillStyle = fur;
      for (const [ex, rot] of [[3.2, -0.5], [5, -0.2]]) {
        ctx.save(); ctx.translate(ex, -8); ctx.rotate(rot);
        ctx.beginPath(); ctx.ellipse(0, -3.2, 1.5, 4.2, 0, 0, TAU); ctx.fill();
        ctx.fillStyle = 'rgba(190,140,130,0.5)';
        ctx.beginPath(); ctx.ellipse(0, -3.2, 0.7, 2.8, 0, 0, TAU); ctx.fill();
        ctx.fillStyle = fur;
        ctx.restore();
      }
      // head
      ctx.beginPath(); ctx.arc(4, -5.4, 3.4, 0, TAU); ctx.fill();
      ctx.fillStyle = '#2a231d';
      ctx.beginPath(); ctx.arc(5.6, -5.8, 0.75, 0, TAU); ctx.fill();
      ctx.fillStyle = '#c08f88';
      ctx.beginPath(); ctx.arc(7, -4.4, 0.7, 0, TAU); ctx.fill();
      // tail
      ctx.fillStyle = '#efe9dc';
      ctx.beginPath(); ctx.arc(-6.4, -3.6, 2, 0, TAU); ctx.fill();
      // feet
      ctx.fillStyle = alt;
      ctx.beginPath(); ctx.ellipse(-2.4, 1.2, 2.2, 1.2, 0, 0, TAU); ctx.fill();
      ctx.beginPath(); ctx.ellipse(2, 1.2, 2.2, 1.2, 0, 0, TAU); ctx.fill();
    }
    if (p.flash > 0) {
      ctx.globalCompositeOperation = 'source-atop';
      ctx.fillStyle = `rgba(255,70,55,${clamp(p.flash * 3, 0, 0.6)})`;
      ctx.fillRect(-22, -20, 44, 36);
      ctx.globalCompositeOperation = 'source-over';
    }
    ctx.restore();
    if (p.hp < p.maxHp * 0.98 || p.huntReservedBy || this.selected.has(p.id)) this.drawPawnBars(ctx, p, px, py);
  }

  drawPawnBars(ctx, p, px, py) {
    const barW = 16;
    const top = py - (p.kind === 'animal' ? (p.animalType === 'muffalo' ? 34 : 22) : 33);
    if (p.kind === 'raider' || p.kind === 'animal' || p.hp < p.maxHp) {
      const f = clamp(p.hp / p.maxHp, 0, 1);
      ctx.save();
      ctx.fillStyle = 'rgba(12,14,12,0.66)';
      roundRect(ctx, px - barW / 2 - 0.5, top - 0.5, barW + 1, 4, 1.4); ctx.fill();
      ctx.fillStyle = p.kind === 'raider' ? '#c8564a' : f > 0.55 ? '#86b061' : f > 0.28 ? '#d0a95f' : '#c85044';
      roundRect(ctx, px - barW / 2, top, barW * f, 3, 1); ctx.fill();
      ctx.restore();
    }
    if (p.drafted) {
      ctx.save();
      ctx.strokeStyle = 'rgba(224,96,80,0.75)';
      ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.arc(px, py - 16, 15, 0, TAU); ctx.stroke();
      ctx.restore();
    }
    if (p.kind === 'animal' && p.huntReservedBy) {
      ctx.save();
      ctx.strokeStyle = 'rgba(235,170,110,0.8)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(px, py - 12, 12, 0, TAU); ctx.stroke();
      ctx.restore();
    }
  }

  drawSelectionBrackets(ctx, px, py, p) {
    const top = py - (p.kind === 'animal' ? 30 : 33);
    const half = p.kind === 'animal' ? 15 : 12;
    const l = 4.5;
    ctx.save();
    ctx.strokeStyle = 'rgba(244,222,164,0.95)';
    ctx.lineWidth = 1.4;
    for (const [cx, cy, dx, dy] of [[px - half, top, 1, 1], [px + half, top, -1, 1], [px - half, py + 3, 1, -1], [px + half, py + 3, -1, -1]]) {
      ctx.beginPath();
      ctx.moveTo(cx + dx * l, cy);
      ctx.lineTo(cx, cy);
      ctx.lineTo(cx, cy + dy * l);
      ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(244,222,164,0.28)';
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 3]);
    ctx.strokeRect(px - half, top, half * 2, py + 3 - top);
    ctx.restore();
  }

  // ---------------------------------------------------------------- lighting & atmosphere
  lightSources() {
    const out = [];
    for (const o of this.world.objects) {
      if (o.dead || !o.built) continue;
      const light = o.def.light;
      if (!light) continue;
      out.push({
        x: o.x + o.w / 2, y: o.y + o.h / 2,
        r: light, warm: true,
        flicker: (o.def.fire || o.type === 'campfire') ? 0.92 + Math.sin(this.time * 9 + o.seed) * 0.06 + Math.sin(this.time * 17.3 + o.seed) * 0.03 : 0.96 + Math.sin(this.time * 1.3 + o.seed) * 0.02,
        power: o.def.powered ? (this.world.techs.has('masonry') ? 1 : 1) : 1,
      });
    }
    return out;
  }

  drawLighting(ctx) {
    const w = this.world;
    const d = w.darkness();
    const c = this.camera;

    // Golden hour / cold night colour grade.
    const h = w.time;
    let tint = null;
    if (h > 5.2 && h < 8.2) tint = { c: '255,176,96', a: (1 - Math.abs(h - 6.7) / 1.6) * 0.09 };
    else if (h > 17 && h < 20.4) tint = { c: '255,148,78', a: (1 - Math.abs(h - 18.6) / 1.7) * 0.10 };
    if (w.eclipse > 0) tint = { c: '120,130,180', a: Math.min(0.14, 0.05 + w.eclipse * 0.02) };
    if (tint && tint.a > 0.005) {
      ctx.fillStyle = `rgba(${tint.c},${tint.a})`;
      ctx.fillRect(0, 0, this.w, this.h);
    }

    // Daylight needs no light pass at all.
    if (d <= 0.012) return;
    const lights = this.lightSources();
    {
      const lc = this.lightCanvas, lx = this.lightCtx;
      const cw = lc.width, ch = lc.height;
      const sx = cw / this.w, sy = ch / this.h;
      lx.setTransform(1, 0, 0, 1, 0, 0);
      lx.clearRect(0, 0, cw, ch);
      const nightColor = w.eclipse > 0 ? '4,10,22' : '7,12,28';
      lx.fillStyle = `rgba(${nightColor},${Math.min(0.92, d * 0.94)})`;
      lx.fillRect(0, 0, cw, ch);
      lx.globalCompositeOperation = 'destination-out';
      for (const l of lights) {
        const sp = this.worldToScreen(l.x, l.y);
        const r = l.r * TILE * c.zoom * 1.18;
        if (sp.x + r < 0 || sp.x - r > this.w || sp.y + r < 0 || sp.y - r > this.h) continue;
        const g = lx.createRadialGradient(sp.x * sx, sp.y * sy, 0, sp.x * sx, sp.y * sy, Math.max(2, r * sx));
        g.addColorStop(0, 'rgba(0,0,0,1)');
        g.addColorStop(0.32, 'rgba(0,0,0,0.94)');
        g.addColorStop(0.62, 'rgba(0,0,0,0.62)');
        g.addColorStop(0.85, 'rgba(0,0,0,0.22)');
        g.addColorStop(1, 'rgba(0,0,0,0)');
        lx.fillStyle = g;
        lx.beginPath(); lx.arc(sp.x * sx, sp.y * sy, Math.max(2, r * sx), 0, TAU); lx.fill();
      }
      lx.globalCompositeOperation = 'source-over';
      ctx.drawImage(lc, 0, 0, this.w, this.h);

      // Warm bloom in the lit areas.
      const night = clamp(d * 1.5, 0, 1);
      if (night > 0.02 && lights.length) {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        for (const l of lights) {
          const sp = this.worldToScreen(l.x, l.y);
          const r = l.r * TILE * c.zoom;
          if (sp.x + r < 0 || sp.x - r > this.w || sp.y + r < 0 || sp.y - r > this.h) continue;
          const g = ctx.createRadialGradient(sp.x, sp.y, 0, sp.x, sp.y, r);
          g.addColorStop(0, `rgba(255,196,112,${0.13 * night * l.flicker})`);
          g.addColorStop(0.45, `rgba(255,164,80,${0.06 * night * l.flicker})`);
          g.addColorStop(1, 'rgba(255,140,60,0)');
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(sp.x, sp.y, r, 0, TAU); ctx.fill();
        }
        ctx.restore();
      }
    }
  }

  drawWeather(ctx) {
    if (this.weatherOff) return;
    const w = this.world;
    const rain = w.rain;
    const fog = w.fog;
    const storm = w.weather === 'storm';
    if (fog > 0.02) {
      ctx.save();
      ctx.fillStyle = `rgba(188,196,194,${0.12 * fog})`;
      ctx.fillRect(0, 0, this.w, this.h);
      ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < 4; i++) {
        const px = ((i * 0.29 + this.time * 0.006 * (1 + i * 0.3)) % 1.25 - 0.12) * this.w;
        const py = (0.12 + i * 0.23) * this.h + Math.sin(this.time * 0.2 + i) * 30;
        const r = this.w * (0.22 + i * 0.06);
        const g = ctx.createRadialGradient(px, py, 0, px, py, r);
        g.addColorStop(0, `rgba(210,220,218,${0.05 * fog})`);
        g.addColorStop(1, 'rgba(210,220,218,0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(px, py, r, 0, TAU); ctx.fill();
      }
      ctx.restore();
    }
    if (rain > 0.02) {
      ctx.save();
      const count = Math.floor((storm ? 260 : 150) * clamp(rain, 0, 1));
      const slant = 0.22;
      ctx.lineCap = 'round';
      for (let i = 0; i < count; i++) {
        const rx = hash2(i, 3, 17) * (this.w + 120) - 60;
        const speed = (storm ? 900 : 620) + hash2(i, 8, 23) * 420;
        const len = (storm ? 16 : 11) + hash2(i, 4, 31) * 10;
        const y = ((hash2(i, 5, 41) * (this.h + 160) + this.time * speed) % (this.h + 160)) - 80;
        const x = rx + y * slant + Math.sin(this.time * 2 + i) * 3;
        const a = (storm ? 0.26 : 0.18) * rain * (0.55 + hash2(i, 6, 43) * 0.45);
        ctx.strokeStyle = `rgba(176,208,222,${a})`;
        ctx.lineWidth = hash2(i, 7, 47) > 0.8 ? 1.4 : 1;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - slant * len, y + len);
        ctx.stroke();
        if (hash2(i, 9, 53) > 0.94) {
          const sy = y + len;
          ctx.strokeStyle = `rgba(196,222,230,${a * 0.8})`;
          ctx.beginPath(); ctx.ellipse(x - slant * len, sy, 4, 1.1, 0, 0, TAU); ctx.stroke();
        }
      }
      // screen wet sheen
      ctx.fillStyle = `rgba(52,74,84,${0.04 * rain})`;
      ctx.fillRect(0, 0, this.w, this.h);
      ctx.restore();
    }
    if (w.flash > 0.01) {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = `rgba(210,224,255,${w.flash * 0.26})`;
      ctx.fillRect(0, 0, this.w, this.h);
      ctx.restore();
    }
  }

  drawAmbient(ctx) {
    const w = this.world;
    const dt = this.dt || 0.016;
    const night = w.darkness();

    // Birds crossing during daylight.
    this.birdTimer -= dt;
    if (this.birdTimer <= 0) {
      this.birdTimer = 9 + Math.random() * 16;
      const fromLeft = Math.random() < 0.5;
      const n = 2 + Math.floor(Math.random() * 4);
      const baseY = 30 + Math.random() * (this.h * 0.45);
      for (let i = 0; i < n; i++) {
        this.birds.push({
          x: fromLeft ? -30 - i * 22 : this.w + 30 + i * 22,
          y: baseY + (Math.random() - 0.5) * 46 + i * 7,
          vx: (fromLeft ? 1 : -1) * (34 + Math.random() * 26),
          phase: Math.random() * TAU,
          size: 2.4 + Math.random() * 2.2,
        });
      }
    }
    if (w.weather !== 'storm' && w.daylight() > 0.35 || w.eclipse > 0) {
      ctx.save();
      for (let i = this.birds.length - 1; i >= 0; i--) {
        const b = this.birds[i];
        b.x += b.vx * dt;
        if (b.x < -80 || b.x > this.w + 80) { this.birds.splice(i, 1); continue; }
        const flap = Math.sin(this.time * 9 + b.phase);
        const s = b.size;
        const y = b.y + Math.sin(this.time * 1.5 + b.phase) * 4;
        ctx.strokeStyle = 'rgba(38,44,40,0.5)';
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.moveTo(b.x - s * 2, y - flap * s);
        ctx.quadraticCurveTo(b.x - s * 0.4, y - s * 0.6, b.x, y);
        ctx.quadraticCurveTo(b.x + s * 0.4, y - s * 0.6, b.x + s * 2, y - flap * s);
        ctx.stroke();
      }
      ctx.restore();
    }

    // Fireflies at dusk and night.
    if (night > 0.22) {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (const f of this.fireflies) {
        const fx = (f.x + Math.sin(this.time * f.speed + f.phase) * 1.6) * TILE;
        const fy = (f.y + Math.cos(this.time * f.speed * 0.8 + f.phase) * 1.2) * TILE;
        const sp = this.worldToScreen(fx / TILE, fy / TILE);
        if (sp.x < -20 || sp.x > this.w + 20 || sp.y < -20 || sp.y > this.h + 20) continue;
        const a = (0.35 + Math.sin(this.time * 2.2 + f.phase) * 0.3) * night;
        const g = ctx.createRadialGradient(sp.x, sp.y, 0, sp.x, sp.y, 9);
        g.addColorStop(0, `rgba(230,255,150,${a})`);
        g.addColorStop(1, 'rgba(190,255,90,0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(sp.x, sp.y, 9, 0, TAU); ctx.fill();
      }
      ctx.restore();
    }
  }

  drawPost(ctx) {
    if (!this.vignette) {
      const vc = document.createElement('canvas');
      vc.width = Math.max(2, Math.round(this.w / 2));
      vc.height = Math.max(2, Math.round(this.h / 2));
      const vx = vc.getContext('2d');
      const g = vx.createRadialGradient(vc.width / 2, vc.height / 2, Math.min(vc.width, vc.height) * 0.32, vc.width / 2, vc.height / 2, Math.max(vc.width, vc.height) * 0.78);
      g.addColorStop(0, 'rgba(0,0,0,0)');
      g.addColorStop(0.72, 'rgba(4,8,6,0.16)');
      g.addColorStop(1, 'rgba(2,5,4,0.46)');
      vx.fillStyle = g;
      vx.fillRect(0, 0, vc.width, vc.height);
      // Bake the warm lift into the same overlay so the frame needs one blit only.
      vx.fillStyle = 'rgba(255,214,150,0.035)';
      vx.fillRect(0, 0, vc.width, vc.height);
      this.vignette = vc;
    }
    ctx.drawImage(this.vignette, 0, 0, this.w, this.h);
  }

  // ---------------------------------------------------------------- screen space labels
  drawScreenLabels(ctx) {
    const w = this.world;
    const targets = [];
    for (const id of this.selected) {
      const p = w.pawnById(id);
      if (p) targets.push(p);
    }
    if (this.hoverPawn && !this.selected.has(this.hoverPawn.id)) targets.push(this.hoverPawn);
    for (const p of targets) {
      if (p.dead) continue;
      const sp = this.worldToScreen(p.x, p.y);
      if (sp.x < -80 || sp.x > this.w + 80 || sp.y < -60 || sp.y > this.h + 60) continue;
      const top = sp.y - (p.kind === 'animal' ? 46 : 52) * Math.max(0.8, this.camera.zoom * 0.9);
      const name = p.kind === 'animal' ? (p.def?.name || 'Animal') : p.name;
      ctx.save();
      ctx.textAlign = 'center';
      ctx.font = '600 12px Inter, system-ui, sans-serif';
      const tw = ctx.measureText(name).width;
      const bw = Math.max(tw + 18, 58), bh = 20;
      const bx = sp.x - bw / 2, by = top - bh;
      ctx.fillStyle = 'rgba(12,15,13,0.82)';
      roundRect(ctx, bx, by, bw, bh, 5); ctx.fill();
      ctx.strokeStyle = p.kind === 'raider' ? 'rgba(200,86,74,0.6)' : 'rgba(214,196,148,0.34)';
      ctx.lineWidth = 1;
      roundRect(ctx, bx + 0.5, by + 0.5, bw - 1, bh - 1, 4.5); ctx.stroke();
      ctx.fillStyle = '#efe6d0';
      ctx.fillText(name, sp.x, by + 14);
      // activity line
      const act = p.kind === 'colonist' ? p.activity() : p.kind === 'raider' ? (p.downed ? 'Downed' : 'Hostile') : (p.downed ? 'Wounded' : p.dead ? 'Dead' : 'Wild animal');
      ctx.font = '500 10px Inter, system-ui, sans-serif';
      ctx.fillStyle = p.kind === 'raider' ? 'rgba(226,150,136,0.95)' : 'rgba(198,204,190,0.85)';
      ctx.fillText(act, sp.x, by + bh + 12);
      if (p.kind === 'colonist' && !p.downed) {
        // compact needs strip
        const nw = 52, nx = sp.x - nw / 2, ny = by + bh + 17;
        const cols = [['#d9a05c', p.needs.food], ['#7fa8c8', p.needs.rest], ['#9cbf74', p.mood]];
        for (let i = 0; i < 3; i++) {
          ctx.fillStyle = 'rgba(10,13,11,0.7)';
          roundRect(ctx, nx + i * 18, ny, 16, 3.4, 1.5); ctx.fill();
          ctx.fillStyle = cols[i][0];
          roundRect(ctx, nx + i * 18, ny, 16 * clamp(cols[i][1] / 100, 0, 1), 3.4, 1.5); ctx.fill();
        }
      }
      ctx.restore();
    }

    // Hovered object tooltip.
    if (this.hoverObj && !this.hoverPawn) {
      const o = this.hoverObj;
      const sp = this.worldToScreen(o.x + o.w / 2, o.y);
      ctx.save();
      ctx.textAlign = 'center';
      ctx.font = '600 11px Inter, system-ui, sans-serif';
      const name = o.def?.name || 'Object';
      const sub = o.nature ? (o.def.minable ? 'Mineable' : o.def.choppable ? 'Choppable' : '') : !o.built ? `Blueprint ${Math.round((o.work / o.workNeeded) * 100)}%` : '';
      const tw = Math.max(ctx.measureText(name).width, sub ? 52 : 0) + 20;
      const bx = sp.x - tw / 2, by = sp.y - 36;
      ctx.fillStyle = 'rgba(12,15,13,0.8)';
      roundRect(ctx, bx, by, tw, sub ? 30 : 19, 5); ctx.fill();
      ctx.strokeStyle = 'rgba(214,196,148,0.28)';
      ctx.lineWidth = 1; roundRect(ctx, bx + 0.5, by + 0.5, tw - 1, (sub ? 30 : 19) - 1, 4.5); ctx.stroke();
      ctx.fillStyle = '#efe6d0';
      ctx.fillText(name, sp.x, by + 13);
      if (sub) {
        ctx.font = '500 9px Inter, system-ui, sans-serif';
        ctx.fillStyle = 'rgba(196,202,188,0.8)';
        ctx.fillText(sub, sp.x, by + 24);
      }
      ctx.restore();
    }
  }

  drawMarquee(ctx) {
    const m = this.marquee;
    const x = Math.min(m.x0, m.x1), y = Math.min(m.y0, m.y1);
    const w = Math.abs(m.x1 - m.x0), h = Math.abs(m.y1 - m.y0);
    ctx.save();
    ctx.fillStyle = 'rgba(228,204,146,0.10)';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = 'rgba(240,218,162,0.85)';
    ctx.lineWidth = 1.2;
    ctx.setLineDash([5, 4]);
    ctx.strokeRect(x + 0.5, y + 0.5, w, h);
    ctx.restore();
  }

  // ---------------------------------------------------------------- minimap, icons, portraits
  drawMinimap(canvas) {
    const w = this.world;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.save();
    roundRect(ctx, 0, 0, W, H, 6); ctx.clip();
    ctx.drawImage(this.miniBase, 0, 0, W, H);
    const sx = W / w.W, sy = H / w.H;
    // zones tint
    ctx.globalAlpha = 0.18;
    for (const z of w.zones) {
      if (z.removed) continue;
      ctx.fillStyle = z.type === 'grow' ? '#7ac45c' : '#e4cf9a';
      ctx.fillRect(z.x * sx, z.y * sy, z.w * sx, z.h * sy);
    }
    ctx.globalAlpha = 1;
    // buildings as dark pixels
    for (const o of w.objects) {
      if (o.dead) continue;
      if (o.nature) {
        if (o.def.kind === 'tree') { ctx.fillStyle = 'rgba(26,48,24,0.55)'; }
        else { ctx.fillStyle = 'rgba(70,68,62,0.55)'; }
      } else if (!o.built) {
        ctx.fillStyle = 'rgba(200,220,225,0.5)';
      } else {
        ctx.fillStyle = o.type === 'wall' ? 'rgba(52,42,30,0.8)' : 'rgba(86,74,58,0.72)';
      }
      ctx.fillRect(o.x * sx, o.y * sy, Math.max(1, o.w * sx), Math.max(1, o.h * sy));
    }
    // pawns
    for (const p of w.pawns) {
      if (p.dead && p.kind !== 'colonist') continue;
      if (p.kind === 'colonist' && p.dead) { ctx.fillStyle = 'rgba(120,110,100,0.8)'; }
      else if (p.kind === 'colonist') ctx.fillStyle = this.selected.has(p.id) ? '#ffe9a8' : '#e8c675';
      else if (p.kind === 'raider') ctx.fillStyle = '#e05f4e';
      else continue;
      const r = p.kind === 'colonist' ? 2.4 : 2;
      ctx.beginPath(); ctx.arc(p.x * sx, p.y * sy, r, 0, TAU); ctx.fill();
      if (p.kind === 'colonist') {
        ctx.strokeStyle = 'rgba(10,12,10,0.65)'; ctx.lineWidth = 0.7;
        ctx.beginPath(); ctx.arc(p.x * sx, p.y * sy, r, 0, TAU); ctx.stroke();
      }
    }
    // camera viewport
    const c = this.camera;
    const vw = (this.w / (c.zoom * TILE)) * sx;
    const vh = (this.h / (c.zoom * TILE)) * sy;
    ctx.strokeStyle = 'rgba(245,232,202,0.9)';
    ctx.lineWidth = 1.4;
    ctx.strokeRect(c.x * sx - vw / 2, c.y * sy - vh / 2, vw, vh);
    ctx.fillStyle = 'rgba(245,232,202,0.06)';
    ctx.fillRect(c.x * sx - vw / 2, c.y * sy - vh / 2, vw, vh);
    ctx.restore();
    ctx.strokeStyle = 'rgba(214,196,148,0.35)';
    ctx.lineWidth = 1;
    roundRect(ctx, 0.5, 0.5, W - 1, H - 1, 6); ctx.stroke();
  }

  drawDefIcon(ctx, type, size) {
    const def = BUILDINGS[type];
    if (!def) return;
    ctx.setTransform(2, 0, 0, 2, 0, 0);
    ctx.clearRect(0, 0, size, size);
    const pad = 4;
    const avail = size - pad * 2;
    const scale = Math.min(avail / (def.w * TILE), avail / (def.h * TILE));
    ctx.save();
    ctx.translate(size / 2, size / 2);
    ctx.scale(scale, scale);
    ctx.translate(-def.w * TILE / 2, -def.h * TILE / 2);
    const fake = {
      type, def, x: 0, y: 0, w: def.w, h: def.h, rot: 0, built: true,
      seed: 11, open: 0, angle: -P / 2, flash: 0, dead: false, work: def.work * 0.7, workNeeded: def.work,
    };
    this.drawBuildingArt(ctx, fake, this.time);
    ctx.restore();
  }

  drawPortrait(ctx, pawn, w, h) {
    const app = pawn.appearance || {};
    const skin = app.skin || '#d29a74';
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    if (pawn.kind === 'raider') { bg.addColorStop(0, '#3a2320'); bg.addColorStop(1, '#221715'); }
    else { bg.addColorStop(0, '#2e3833'); bg.addColorStop(1, '#1a201d'); }
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
    // soft window light
    const lg = ctx.createRadialGradient(w * 0.72, h * 0.18, 0, w * 0.72, h * 0.18, w * 0.9);
    lg.addColorStop(0, 'rgba(255,224,168,0.20)');
    lg.addColorStop(1, 'rgba(255,224,168,0)');
    ctx.fillStyle = lg;
    ctx.fillRect(0, 0, w, h);
    const cx = w / 2, shoulder = h * 0.98;
    const scale = h / 44;
    ctx.save();
    ctx.translate(cx, shoulder);
    ctx.scale(scale, scale);
    // shoulders
    ctx.fillStyle = app.shirt || '#7d8c62';
    ctx.beginPath();
    ctx.moveTo(-16, 4);
    ctx.quadraticCurveTo(-15, -8, -6, -10);
    ctx.lineTo(6, -10);
    ctx.quadraticCurveTo(15, -8, 16, 4);
    ctx.closePath(); ctx.fill();
    const sg = ctx.createLinearGradient(-16, -10, 16, 4);
    sg.addColorStop(0, 'rgba(255,255,255,0.16)');
    sg.addColorStop(1, 'rgba(0,0,0,0.3)');
    ctx.fillStyle = sg;
    ctx.fill();
    // collar
    ctx.fillStyle = 'rgba(26,22,18,0.5)';
    ctx.beginPath(); ctx.moveTo(-6, -10); ctx.lineTo(0, -4); ctx.lineTo(6, -10); ctx.closePath(); ctx.fill();
    // neck
    ctx.fillStyle = shade(skin, -0.1);
    ctx.fillRect(-3.4, -14, 6.8, 6);
    // head
    const hy = -20.4;
    ctx.fillStyle = skin;
    ctx.beginPath(); ctx.ellipse(0, hy, 8.6, 9.6, 0, 0, TAU); ctx.fill();
    ctx.fillStyle = 'rgba(70,35,20,0.12)';
    ctx.beginPath(); ctx.ellipse(3.4, hy + 2, 4.4, 5.4, 0.14, 0, TAU); ctx.fill();
    // ears
    ctx.fillStyle = shade(skin, -0.06);
    ctx.beginPath(); ctx.ellipse(-8.2, hy + 1, 1.9, 2.6, 0, 0, TAU); ctx.fill();
    ctx.beginPath(); ctx.ellipse(8.2, hy + 1, 1.9, 2.6, 0, 0, TAU); ctx.fill();
    // eyes
    ctx.fillStyle = '#f2ece2';
    ctx.beginPath(); ctx.ellipse(-3.2, hy - 0.4, 2.2, 1.5, 0, 0, TAU); ctx.fill();
    ctx.beginPath(); ctx.ellipse(3.2, hy - 0.4, 2.2, 1.5, 0, 0, TAU); ctx.fill();
    ctx.fillStyle = '#2b211b';
    ctx.beginPath(); ctx.arc(-3, hy - 0.3, 1.1, 0, TAU); ctx.fill();
    ctx.beginPath(); ctx.arc(3.4, hy - 0.3, 1.1, 0, TAU); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.75)';
    ctx.beginPath(); ctx.arc(-2.7, hy - 0.7, 0.38, 0, TAU); ctx.fill();
    ctx.beginPath(); ctx.arc(3.7, hy - 0.7, 0.38, 0, TAU); ctx.fill();
    // brows
    ctx.strokeStyle = 'rgba(48,32,22,0.7)'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(-5.4, hy - 2.8); ctx.quadraticCurveTo(-3.2, hy - 3.4, -1.2, hy - 2.8); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(1.2, hy - 2.8); ctx.quadraticCurveTo(3.2, hy - 3.4, 5.4, hy - 2.8); ctx.stroke();
    // nose
    ctx.strokeStyle = 'rgba(130,78,52,0.55)'; ctx.lineWidth = 1.1;
    ctx.beginPath(); ctx.moveTo(0, hy + 0.6); ctx.quadraticCurveTo(-0.6, hy + 3.4, 1.4, hy + 3.8); ctx.stroke();
    // mouth
    ctx.strokeStyle = 'rgba(120,58,48,0.8)'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(-2.2, hy + 5.4); ctx.quadraticCurveTo(0, hy + 6.3, 2.4, hy + 5.2); ctx.stroke();
    // beard
    if (app.beard) {
      ctx.fillStyle = 'rgba(58,40,28,0.82)';
      ctx.beginPath();
      ctx.moveTo(-8.4, hy + 1.6);
      ctx.quadraticCurveTo(-7.4, hy + 9.4, 0, hy + 11.6);
      ctx.quadraticCurveTo(7.4, hy + 9.4, 8.4, hy + 1.6);
      ctx.quadraticCurveTo(5.2, hy + 7.6, 0, hy + 7.8);
      ctx.quadraticCurveTo(-5.2, hy + 7.6, -8.4, hy + 1.6);
      ctx.fill();
      ctx.fillStyle = 'rgba(120,84,56,0.35)';
      ctx.beginPath(); ctx.ellipse(-1.6, hy + 7.2, 2.4, 1.4, 0.2, 0, TAU); ctx.fill();
    }
    // hair scaled up
    ctx.save();
    ctx.scale(1.9, 1.9);
    ctx.translate(0.1, -hy / 1.9 + hy / 1.9);
    this.drawHair(ctx, app, hy / 1.9 + 0.4, 4.6, pawn.seed || 0);
    ctx.restore();
    if (app.hat === 'straw') {
      ctx.fillStyle = '#c9a761';
      ctx.beginPath(); ctx.ellipse(0, hy - 6.4, 14.4, 4.4, 0, 0, TAU); ctx.fill();
      ctx.fillStyle = '#b8944f';
      ctx.beginPath(); ctx.ellipse(0, hy - 8.4, 8, 5.6, 0, 0, TAU); ctx.fill();
      ctx.fillStyle = '#7d5f34';
      ctx.fillRect(-7.6, hy - 8.8, 15.2, 2);
    }
    if (app.glasses) {
      ctx.strokeStyle = 'rgba(35,40,42,0.9)'; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.arc(-3.2, hy - 0.4, 3, 0, TAU); ctx.stroke();
      ctx.beginPath(); ctx.arc(3.2, hy - 0.4, 3, 0, TAU); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-0.4, hy - 0.5); ctx.lineTo(0.4, hy - 0.5); ctx.stroke();
      ctx.fillStyle = 'rgba(200,235,245,0.12)';
      ctx.beginPath(); ctx.arc(-3, hy - 0.8, 2.5, 0, TAU); ctx.fill();
    }
    if (app.mask) {
      ctx.fillStyle = 'rgba(52,42,42,0.92)';
      roundRect(ctx, -7.4, hy + 1.4, 14.8, 7.4, 2.4); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fillRect(-5.6, hy + 2.6, 11.2, 1.2);
    }
    if (app.scarf) {
      ctx.fillStyle = '#a8503f';
      roundRect(ctx, -8.6, -8.8, 17.2, 4.4, 2); ctx.fill();
    }
    ctx.restore();
    // rim light
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    const rg = ctx.createLinearGradient(w, 0, w * 0.45, h * 0.7);
    rg.addColorStop(0, 'rgba(255,214,150,0.10)');
    rg.addColorStop(1, 'rgba(255,214,150,0)');
    ctx.fillStyle = rg;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  }

}