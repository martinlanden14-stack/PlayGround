/* OUTLAND — scene renderer: terrain, objects, characters, light & weather */
import { TILE, T, MAP } from './world.js';
import { hash2, clamp, lerp, TAU } from './utils.js';
import { BUILDINGS } from './data.js';
import { makeCanvas, createSprites, rr } from './sprites.js';

const GRASS = ['#59753f', '#5f7d45', '#546f3c', '#66854b', '#5b7841'];
const DIRT = ['#796044', '#806649', '#735a3f', '#856b4c', '#7c6346'];
const SAND = ['#c0ab78', '#c7b381', '#bba673', '#cbb987', '#c3ae7c'];
const WATER = ['#2b5561', '#28505d', '#2e5a66', '#264d5a', '#2d5763'];
const SHALLOW = ['#3a6b70', '#407376', '#356367', '#447a7c'];
const ROCK = ['#6a7174', '#6f7679', '#656c6f', '#747b7e', '#6d7477'];
const STONEF = ['#878a83', '#82857e', '#8b8e87', '#7d8079', '#898c85'];
const WOODF = ['#876743', '#8e6d48', '#81613e', '#946f49', '#8a6944'];

const TERRAIN_COL = {
  [T.GRASS]: '#54713d', [T.DIRT]: '#7c6245', [T.SAND]: '#c1ac79',
  [T.SHALLOW]: '#3a6b70', [T.WATER]: '#2a5360', [T.ROCK]: '#6b7275',
  [T.STONE]: '#858881', [T.WOOD]: '#8a6a46',
};

function pickCol(arr, x, y, seed) { return arr[(hash2(x, y, seed) * arr.length) | 0]; }

export class Renderer {
  constructor(canvas, game) {
    this.canvas = canvas;
    this.game = game;
    this.ctx = canvas.getContext('2d', { alpha: false });
    this.dpr = 1;
    this.w = 1; this.h = 1;
    this.ground = null;
    this.thumb = null;
    this.spr = null;
    this.rain = [];
    this.ambient = [];
    this.fireflies = [];
    this.flash = 0;
    this.time = 0;
    this.lightCanvas = makeCanvas(2, 2);
    this.lightCtx = this.lightCanvas.getContext('2d');
    this.resize();
  }

  resize() {
    const mobile = Math.min(innerWidth, innerHeight) < 720;
    this.dpr = Math.min(window.devicePixelRatio || 1, mobile ? 2 : 2);
    this.w = innerWidth;
    this.h = innerHeight;
    this.canvas.width = Math.floor(this.w * this.dpr);
    this.canvas.height = Math.floor(this.h * this.dpr);
    this.canvas.style.width = this.w + 'px';
    this.canvas.style.height = this.h + 'px';
    if (this.game) this.game.clampCamera?.();
  }

  buildAssets() {
    this.spr = createSprites();
    this.buildGround();
    this.buildThumb();
    const n = this.w < 700 ? 130 : 200;
    this.rain = Array.from({ length: n }, () => ({
      x: Math.random() * this.w, y: Math.random() * this.h,
      l: 8 + Math.random() * 16, s: 520 + Math.random() * 500, o: 0.1 + Math.random() * 0.25,
    }));
    this.ambient = [];
    this.fireflies = [];
  }

  /* ---------------- terrain baking ---------------- */
  buildGround() {
    const world = this.game.world;
    const W = world.w * TILE, H = world.h * TILE;
    const g = makeCanvas(W, H);
    const x = g.getContext('2d');
    const seed = world.seed;
    const T2 = TILE;

    for (let ty = 0; ty < world.h; ty++) {
      for (let tx = 0; tx < world.w; tx++) {
        const t = world.terrain[ty * world.w + tx];
        const h = hash2(tx, ty, seed + 90);
        const px = tx * T2, py = ty * T2;
        let col = '#000';

        if (t === T.GRASS) col = pickCol(GRASS, tx, ty, seed + 91);
        else if (t === T.DIRT) col = pickCol(DIRT, tx, ty, seed + 92);
        else if (t === T.SAND) col = pickCol(SAND, tx, ty, seed + 93);
        else if (t === T.WATER) col = pickCol(WATER, tx, ty, seed + 94);
        else if (t === T.SHALLOW) col = pickCol(SHALLOW, tx, ty, seed + 95);
        else if (t === T.ROCK) col = pickCol(ROCK, tx, ty, seed + 96);
        else if (t === T.STONE) col = pickCol(STONEF, tx, ty, seed + 97);
        else if (t === T.WOOD) col = pickCol(WOODF, tx, ty, seed + 98);
        x.fillStyle = col;
        x.fillRect(px, py, T2, T2);

        if (t === T.GRASS) {
          // short blades
          for (let i = 0; i < 3; i++) {
            const bx = px + 3 + hash2(tx, ty, seed + 100 + i) * 26;
            const by = py + 6 + hash2(tx, ty, seed + 110 + i) * 24;
            x.strokeStyle = i % 2 ? 'rgba(36,56,28,.36)' : 'rgba(133,164,96,.3)';
            x.lineWidth = 0.9;
            x.beginPath();
            x.moveTo(bx, by);
            x.quadraticCurveTo(bx + 2.5, by - 4, bx + 1 + (h - .5) * 3, by - 7);
            x.stroke();
          }
          // flowers
          if (h > 0.94) {
            const fx = px + 6 + hash2(tx, ty, seed + 120) * 20;
            const fy = py + 6 + hash2(tx, ty, seed + 121) * 20;
            x.fillStyle = h > 0.975 ? '#e6d78e' : '#d7d3c4';
            for (let k = 0; k < 4; k++) {
              const a = (k / 4) * TAU;
              x.beginPath(); x.arc(fx + Math.cos(a) * 1.7, fy + Math.sin(a) * 1.7, 1.1, 0, TAU); x.fill();
            }
            x.fillStyle = '#c08a3e'; x.beginPath(); x.arc(fx, fy, 0.9, 0, TAU); x.fill();
          }
          if (h < 0.035) {
            x.fillStyle = 'rgba(110,120,95,.5)';
            x.beginPath(); x.arc(px + 8 + h * 400, py + 20, 1.4, 0, TAU); x.fill();
          }
        } else if (t === T.DIRT) {
          for (let i = 0; i < 4; i++) {
            x.fillStyle = i % 2 ? 'rgba(60,44,28,.22)' : 'rgba(180,155,115,.16)';
            x.beginPath();
            x.arc(px + hash2(tx, ty, seed + 130 + i) * 30, py + hash2(tx, ty, seed + 140 + i) * 30, 1 + hash2(tx, ty, i) * 1.6, 0, TAU);
            x.fill();
          }
          if (h > 0.86) {
            x.fillStyle = 'rgba(155,158,150,.42)';
            x.beginPath(); x.ellipse(px + 20, py + 18, 1.8, 1.2, h, 0, TAU); x.fill();
          }
        } else if (t === T.SAND) {
          for (let i = 0; i < 4; i++) {
            const sx = px + hash2(tx, ty, seed + 150 + i) * 30;
            const sy = py + hash2(tx, ty, seed + 160 + i) * 30;
            x.fillStyle = i % 2 ? 'rgba(110,92,60,.25)' : 'rgba(245,235,205,.25)';
            x.fillRect(sx, sy, 1.2, 1.2);
          }
          x.strokeStyle = 'rgba(105,90,60,.14)'; x.lineWidth = 1;
          x.beginPath();
          x.moveTo(px + 4, py + 9 + hash2(tx, ty, 6) * 14);
          x.quadraticCurveTo(px + 16, py + 6 + hash2(tx, ty, 7) * 16, px + 28, py + 10 + hash2(tx, ty, 8) * 12);
          x.stroke();
        } else if (t === T.WATER) {
          x.fillStyle = 'rgba(10,25,32,.12)';
          x.fillRect(px, py, T2, T2);
          // shoreline foam
          const shore = (dx, dy) => {
            const nt = world.terrainAt(tx + dx, ty + dy);
            return nt !== T.WATER && nt !== T.SHALLOW;
          };
          x.strokeStyle = 'rgba(210,232,224,.3)'; x.lineWidth = 1.4;
          if (shore(0, -1)) { x.beginPath(); x.moveTo(px, py + 2); x.bezierCurveTo(px + 10, py + 1, px + 22, py + 4, px + 32, py + 2); x.stroke(); }
          if (shore(0, 1)) { x.beginPath(); x.moveTo(px, py + 30); x.bezierCurveTo(px + 10, py + 29, px + 22, py + 31, px + 32, py + 30); x.stroke(); }
          if (shore(-1, 0)) { x.beginPath(); x.moveTo(px + 2, py); x.lineTo(px + 2, py + 32); x.stroke(); }
          if (shore(1, 0)) { x.beginPath(); x.moveTo(px + 30, py); x.lineTo(px + 30, py + 32); x.stroke(); }
        } else if (t === T.SHALLOW) {
          x.fillStyle = 'rgba(196,190,140,.12)';
          x.fillRect(px, py, T2, T2);
          for (let i = 0; i < 3; i++) {
            x.fillStyle = 'rgba(220,220,180,.2)';
            x.beginPath();
            x.arc(px + hash2(tx, ty, seed + 170 + i) * 30, py + hash2(tx, ty, seed + 180 + i) * 30, 1, 0, TAU);
            x.fill();
          }
        } else if (t === T.ROCK) {
          // faceted mountain top
          x.fillStyle = 'rgba(255,255,255,.055)';
          x.beginPath();
          x.moveTo(px, py); x.lineTo(px + 32, py + 3); x.lineTo(px + 14, py + 18); x.closePath(); x.fill();
          x.strokeStyle = 'rgba(35,40,42,.35)'; x.lineWidth = 1;
          x.beginPath();
          x.moveTo(px + 6 + h * 8, py + 4); x.lineTo(px + 12 + h * 5, py + 16); x.lineTo(px + 8, py + 29);
          x.moveTo(px + 22, py + 2); x.lineTo(px + 18, py + 14); x.lineTo(px + 25, py + 28);
          x.stroke();
          x.strokeStyle = 'rgba(225,232,228,.18)';
          x.beginPath(); x.moveTo(px + 2, py + 3); x.lineTo(px + 14, py + 3); x.stroke();
          if (h > 0.8) {
            x.fillStyle = 'rgba(92,118,60,.4)';
            x.beginPath(); x.ellipse(px + 21, py + 25, 4, 2, 0.4, 0, TAU); x.fill();
          }
        } else if (t === T.STONE) {
          // flagstones
          for (let sy = 0; sy < 2; sy++) for (let sx = 0; sx < 2; sx++) {
            const hh = hash2(tx * 2 + sx, ty * 2 + sy, seed + 200);
            x.fillStyle = hh > .5 ? 'rgba(255,255,255,.05)' : 'rgba(0,0,0,.045)';
            x.fillRect(px + sx * 16 + 1, py + sy * 16 + 1, 15, 15);
          }
          x.strokeStyle = 'rgba(58,62,56,.4)'; x.lineWidth = 1;
          x.strokeRect(px + .5, py + .5, 31, 31);
          x.beginPath(); x.moveTo(px + 15.5, py); x.lineTo(px + 15.5, py + 32); x.moveTo(px, py + 15.5); x.lineTo(px + 32, py + 15.5); x.stroke();
          x.strokeStyle = 'rgba(230,235,225,.12)';
          x.beginPath(); x.moveTo(px + 2, py + 2); x.lineTo(px + 13, py + 2); x.stroke();
        } else if (t === T.WOOD) {
          // planks
          for (let p = 0; p < 4; p++) {
            const yy = py + p * 8;
            x.fillStyle = p % 2 ? 'rgba(255,235,195,.035)' : 'rgba(40,25,10,.06)';
            x.fillRect(px, yy + 1, T2, 6);
            x.strokeStyle = 'rgba(50,33,17,.35)'; x.lineWidth = .8;
            x.beginPath(); x.moveTo(px, yy + 8); x.lineTo(px + 32, yy + 8); x.stroke();
            x.strokeStyle = 'rgba(225,195,145,.12)';
            x.beginPath(); x.moveTo(px + 2, yy + 3 + hash2(tx, ty, p) * 2); x.lineTo(px + 27, yy + 3 + hash2(tx, ty, p + 9) * 2); x.stroke();
            x.fillStyle = 'rgba(40,30,18,.5)';
            x.fillRect(px + 3, yy + 4, 1, 1); x.fillRect(px + 28, yy + 4, 1, 1);
          }
        }

        // soft edge shading when tile borders a different terrain
        if (t === T.GRASS && world.terrainAt(tx, ty + 1) === T.DIRT) {
          x.fillStyle = 'rgba(70,50,30,.08)'; x.fillRect(px, py + 28, T2, 4);
        }
      }
    }

    // mountain feet shading
    for (let ty = 1; ty < world.h - 1; ty++) {
      for (let tx = 1; tx < world.w - 1; tx++) {
        if (world.terrainAt(tx, ty) !== T.ROCK) continue;
        if (world.terrainAt(tx, ty + 1) !== T.ROCK) {
          x.fillStyle = 'rgba(20,25,20,.18)';
          x.fillRect(tx * T2, ty * T2 + T2 - 4, T2, 5);
        }
        if (world.terrainAt(tx, ty - 1) !== T.ROCK) {
          x.fillStyle = 'rgba(240,245,235,.1)';
          x.fillRect(tx * T2, ty * T2, T2, 2);
        }
      }
    }

    this.ground = g;
  }

  buildThumb() {
    const world = this.game.world;
    const c = makeCanvas(world.w, world.h);
    const x = c.getContext('2d');
    const img = x.createImageData(world.w, world.h);
    for (let i = 0; i < world.w * world.h; i++) {
      const t = world.terrain[i];
      const col = TERRAIN_COL[t] || '#000';
      const r = parseInt(col.slice(1, 3), 16), g = parseInt(col.slice(3, 5), 16), b = parseInt(col.slice(5, 7), 16);
      img.data[i * 4] = r; img.data[i * 4 + 1] = g; img.data[i * 4 + 2] = b; img.data[i * 4 + 3] = 255;
    }
    x.putImageData(img, 0, 0);
    this.thumb = c;
  }

  /* ---------------- main render ---------------- */
  render(now) {
    const g = this.game;
    const dt = g.frameDt || 0.016;
    this.time = now / 1000;
    this.updateAmbient(dt, g);

    const ctx = this.ctx;
    const dpr = this.dpr;
    const w = this.w, h = this.h;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = '#121a15';
    ctx.fillRect(0, 0, w, h);

    const cam = g.camera;
    const zoom = cam.zoom;
    ctx.save();
    ctx.translate(w / 2 - cam.x * zoom, h / 2 - cam.y * zoom);
    ctx.scale(zoom, zoom);
    const view = {
      x0: cam.x - w / 2 / zoom, y0: cam.y - h / 2 / zoom,
      x1: cam.x + w / 2 / zoom, y1: cam.y + h / 2 / zoom,
    };

    if (this.ground) ctx.drawImage(this.ground, 0, 0);

    this.drawWaterAnim(ctx, view, g);
    this.drawZones(ctx, view, g);
    this.drawDesignations(ctx, view, g);
    this.drawDecals(ctx, view, g);

    const drawList = [];
    const w0 = view.x0 - 90, w1 = view.x1 + 90, h0 = view.y0 - 150, h1 = view.y1 + 60;

    for (const o of g.world.objs.values()) {
      const sx = (o.x + 0.5) * TILE, sy = (o.y + 0.9) * TILE;
      if (sx < w0 || sx > w1 || sy < h0 || sy > h1) continue;
      drawList.push({ y: sy, kind: 'obj', o, sx, sy });
    }
    for (const it of g.world.items) {
      const sx = (it.x + 0.5 + (it.stored ? (it.ox || 0) : (it.ox || 0))) * TILE;
      const sy = (it.y + 0.5 + (it.oy || 0)) * TILE;
      if (sx < w0 || sx > w1 || sy < h0 || sy > h1) continue;
      drawList.push({ y: sy + 4, kind: 'item', it, sx, sy });
    }
    for (const p of g.colonists) {
      const sx = p.x * TILE, sy = p.y * TILE;
      if (p.dead) continue;
      if (sx < w0 || sx > w1 || sy < h0 || sy > h1) continue;
      drawList.push({ y: sy + 2, kind: 'pawn', p, sx, sy });
    }
    for (const p of g.raiders) {
      if (p.dead && p.deadTimer > 10) continue;
      const sx = p.x * TILE, sy = p.y * TILE;
      if (sx < w0 || sx > w1 || sy < h0 || sy > h1) continue;
      drawList.push({ y: sy + 2, kind: 'pawn', p, sx, sy });
    }
    drawList.sort((a, b) => a.y - b.y);

    // shadows
    ctx.save();
    for (const d of drawList) {
      if (d.kind === 'obj') this.drawObjShadow(ctx, d.o, d.sx, d.sy);
      else if (d.kind === 'pawn') this.drawPawnShadow(ctx, d.p, d.sx, d.sy);
      else this.drawItemShadow(ctx, d.it, d.sx, d.sy);
    }
    ctx.restore();

    for (const d of drawList) {
      if (d.kind === 'obj') this.drawObj(ctx, d.o, d.sx, d.sy, g);
      else if (d.kind === 'pawn') this.drawPawn(ctx, d.p, d.sx, d.sy, g);
      else this.drawItem(ctx, d.it, d.sx, d.sy, g, zoom);
    }

    this.drawProjectiles(ctx, g);
    this.drawParticles(ctx, g, view);

    ctx.restore();

    // screen-space atmosphere
    this.drawLighting(ctx, g, view);
    this.drawWeather(ctx, g, dt);
    this.drawAmbient(ctx, g);
    this.drawSelection(ctx, g);
    this.drawPlacement(ctx, g);

    this.groundFlash?.(ctx, g);
  }

  drawWaterAnim(ctx, view, g) {
    const world = g.world;
    const t = this.time;
    const tx0 = Math.max(0, Math.floor(view.x0 / TILE) - 1);
    const tx1 = Math.min(world.w - 1, Math.ceil(view.x1 / TILE) + 1);
    const ty0 = Math.max(0, Math.floor(view.y0 / TILE) - 1);
    const ty1 = Math.min(world.h - 1, Math.ceil(view.y1 / TILE) + 1);
    for (let y = ty0; y <= ty1; y++) {
      for (let x = tx0; x <= tx1; x++) {
        const tr = world.terrain[y * world.w + x];
        if (tr !== T.WATER && tr !== T.SHALLOW) continue;
        const px = x * TILE, py = y * TILE;
        const s = Math.sin(t * 0.9 + x * 1.7 + y * 0.9);
        const c2 = Math.cos(t * 0.65 + x * 0.8 - y * 1.3);
        ctx.strokeStyle = tr === T.WATER ? `rgba(190,225,222,${0.075 + 0.055 * (s + 1) / 2})` : `rgba(215,235,220,${0.1 + 0.07 * (c2 + 1) / 2})`;
        ctx.lineWidth = 0.9;
        ctx.beginPath();
        ctx.moveTo(px + 5 + s * 4, py + 11 + c2 * 2);
        ctx.quadraticCurveTo(px + 15, py + 7 + s * 3, px + 26, py + 12 + c2 * 2.5);
        ctx.stroke();
        if ((x * 7 + y * 3) % 5 === 0) {
          ctx.fillStyle = 'rgba(235,250,240,.16)';
          ctx.beginPath();
          ctx.arc(px + 10 + ((x * 13 + y * 7) % 16) + s * 2, py + 22 + c2 * 3, 0.9, 0, TAU);
          ctx.fill();
        }
      }
    }
  }

  drawZones(ctx, view, g) {
    const world = g.world;
    const t = this.time;
    const tx0 = Math.max(0, Math.floor(view.x0 / TILE) - 1);
    const tx1 = Math.min(world.w - 1, Math.ceil(view.x1 / TILE) + 1);
    const ty0 = Math.max(0, Math.floor(view.y0 / TILE) - 1);
    const ty1 = Math.min(world.h - 1, Math.ceil(view.y1 / TILE) + 1);
    for (let y = ty0; y <= ty1; y++) {
      for (let x = tx0; x <= tx1; x++) {
        const z = world.zones[y * world.w + x];
        if (!z) continue;
        const px = x * TILE, py = y * TILE;
        if (z === 1) {
          ctx.fillStyle = 'rgba(232,185,109,.09)';
          ctx.fillRect(px, py, TILE, TILE);
          ctx.strokeStyle = 'rgba(232,185,109,.22)';
          ctx.lineWidth = 0.8;
          ctx.strokeRect(px + 0.5, py + 0.5, TILE - 1, TILE - 1);
          ctx.fillStyle = 'rgba(232,185,109,.22)';
          ctx.fillRect(px + 15, py + 15, 2, 2);
        } else if (z === 2) {
          ctx.fillStyle = 'rgba(62,42,25,.72)';
          ctx.fillRect(px, py, TILE, TILE);
          ctx.strokeStyle = 'rgba(36,24,14,.5)'; ctx.lineWidth = 1;
          for (let fy = 3; fy < TILE; fy += 7) {
            ctx.beginPath(); ctx.moveTo(px, py + fy); ctx.lineTo(px + TILE, py + fy); ctx.stroke();
          }
          ctx.strokeStyle = 'rgba(150,190,100,.24)';
          ctx.setLineDash([3, 4]);
          ctx.strokeRect(px + 1.5, py + 1.5, TILE - 3, TILE - 3);
          ctx.setLineDash([]);
          // markers only on edges
          const edge = world.zoneAt(x - 1, y) !== 2 || world.zoneAt(x + 1, y) !== 2 || world.zoneAt(x, y - 1) !== 2 || world.zoneAt(x, y + 1) !== 2;
          if (edge) {
            ctx.fillStyle = 'rgba(150,190,100,.5)';
            ctx.fillRect(px + 15, py + 1, 2, 2);
          }
        }
      }
    }
  }

  drawDesignations(ctx, view, g) {
    const world = g.world;
    const pulse = 0.55 + Math.sin(this.time * 4) * 0.25;
    for (const [k, type] of world.designations) {
      const [x, y] = k.split(',').map(Number);
      const px = x * TILE, py = y * TILE;
      if (px < view.x0 - TILE || px > view.x1 + TILE || py < view.y0 - TILE || py > view.y1 + TILE) continue;
      const col = type === 'chop' ? '#e8b96d' : type === 'mine' ? '#a9c4d1' : type === 'harvest' ? '#a8c87f' : '#d6847a';
      ctx.save();
      ctx.globalAlpha = pulse;
      ctx.strokeStyle = col;
      ctx.lineWidth = 1.4;
      ctx.setLineDash([4, 3]);
      ctx.strokeRect(px + 3, py + 3, TILE - 6, TILE - 6);
      ctx.setLineDash([]);
      ctx.globalAlpha = pulse * 0.9;
      ctx.translate(px + TILE / 2, py + TILE / 2);
      ctx.lineWidth = 1.6;
      ctx.strokeStyle = col;
      ctx.fillStyle = 'rgba(10,14,16,.35)';
      if (type === 'chop') {
        ctx.beginPath(); ctx.arc(0, 0, 7, 0, TAU); ctx.fill();
        ctx.beginPath(); ctx.moveTo(-4, 5); ctx.lineTo(3, -4); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(2, -5); ctx.lineTo(6, -3); ctx.lineTo(3, 1); ctx.closePath(); ctx.stroke();
      } else if (type === 'mine') {
        ctx.beginPath(); ctx.arc(0, 0, 7, 0, TAU); ctx.fill();
        ctx.beginPath(); ctx.moveTo(-5, 5); ctx.lineTo(4, -5); ctx.stroke();
        ctx.beginPath(); ctx.arc(2, -4, 5, Math.PI * 0.9, Math.PI * 1.9); ctx.stroke();
      } else if (type === 'deconstruct') {
        ctx.beginPath(); ctx.arc(0, 0, 7, 0, TAU); ctx.fill();
        ctx.beginPath(); ctx.moveTo(-4, -4); ctx.lineTo(4, 4); ctx.moveTo(4, -4); ctx.lineTo(-4, 4); ctx.stroke();
      } else {
        ctx.beginPath(); ctx.arc(0, 0, 7, 0, TAU); ctx.fill();
        ctx.beginPath(); ctx.moveTo(-4, 4); ctx.quadraticCurveTo(-2, -5, 4, -4); ctx.stroke();
        ctx.beginPath(); ctx.arc(3, -4, 2, 0, TAU); ctx.fill();
      }
      ctx.restore();
    }
  }

  drawDecals(ctx, view, g) {
    for (const d of g.decals) {
      const px = d.x * TILE, py = d.y * TILE;
      if (px < view.x0 - 60 || px > view.x1 + 60 || py < view.y0 - 60 || py > view.y1 + 60) continue;
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(d.rot || 0);
      ctx.globalAlpha = d.alpha ?? 0.55;
      ctx.fillStyle = d.color || '#6b1f1c';
      for (let i = 0; i < (d.spots || 4); i++) {
        const a = hash2(d.seed || 1, i, 3) * TAU;
        const r = hash2(d.seed || 2, i, 4) * (d.size || 14);
        ctx.beginPath();
        ctx.ellipse(Math.cos(a) * r, Math.sin(a) * r * 0.65, 1.6 + hash2(i, d.seed || 3, 5) * 2.4, 1.2 + hash2(i, d.seed || 4, 6) * 1.5, a, 0, TAU);
        ctx.fill();
      }
      ctx.restore();
    }
  }
