/* OUTLAND — procedural sprite atelier (all art generated at runtime) */
import { hash2 } from './utils.js';

export function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = Math.max(1, Math.ceil(w));
  c.height = Math.max(1, Math.ceil(h));
  return c;
}

/* Draw in "world pixel" units at 2x for crispness. */
export function sprite(w, h, ax, ay, draw) {
  const S = 2;
  const c = makeCanvas(w * S, h * S);
  const x = c.getContext('2d');
  x.scale(S, S);
  x.lineJoin = 'round';
  x.lineCap = 'round';
  draw(x, w, h);
  return { c, w, h, ax, ay };
}

const rr = (ctx, x, y, w, h, r) => {
  r = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
};

const leafShade = ['#2c452b', '#3a5b36', '#4b7040', '#5c844b', '#6f9959'];
const goldShade = ['#6f4c20', '#8c6126', '#a97c31', '#c19542', '#d9b25d'];

function pineSprite(seed, palette) {
  return sprite(64, 92, 32, 88, (x) => {
    // trunk
    x.fillStyle = '#4a3322';
    x.beginPath();
    x.moveTo(28, 88); x.lineTo(30, 58); x.lineTo(34, 58); x.lineTo(36, 88);
    x.closePath(); x.fill();
    x.strokeStyle = 'rgba(28,20,12,.55)'; x.lineWidth = 1; x.stroke();
    x.strokeStyle = '#6c4a2e'; x.lineWidth = 1.2;
    x.beginPath(); x.moveTo(31, 86); x.lineTo(31.5, 62); x.moveTo(34, 84); x.lineTo(33.5, 66); x.stroke();
    // roots
    x.strokeStyle = '#3b291a'; x.lineWidth = 1.6;
    x.beginPath(); x.moveTo(30, 87); x.lineTo(24, 90); x.moveTo(34, 87); x.lineTo(41, 90); x.stroke();

    // canopy layers
    const layers = [
      { y: 62, w: 30, h: 20, c: palette[1] },
      { y: 47, w: 25, h: 22, c: palette[2] },
      { y: 31, w: 19, h: 22, c: palette[3] },
      { y: 15, w: 12, h: 20, c: palette[4] },
    ];
    for (let i = 0; i < layers.length; i++) {
      const L = layers[i];
      const r = hash2(seed, i, 3);
      x.fillStyle = L.c;
      x.beginPath();
      const cxp = 32 + (r - 0.5) * 2;
      x.moveTo(cxp, L.y - L.h);
      const steps = 7;
      for (let s = 1; s <= steps; s++) {
        const t = s / steps;
        const px = cxp + (L.w / 2) * t + Math.sin(i * 2 + s * 1.7) * 1.8;
        const py = L.y - L.h + L.h * t + (s % 2 ? 2.4 : 0);
        x.lineTo(px, py);
      }
      x.lineTo(cxp + L.w * 0.24, L.y + 2);
      for (let s = steps; s >= 1; s--) {
        const t = s / steps;
        const px = cxp - (L.w / 2) * t - Math.sin(i * 3 + s) * 1.5;
        const py = L.y - L.h + L.h * t + (s % 2 ? 1.6 : 0);
        x.lineTo(px, py);
      }
      x.lineTo(cxp - L.w * 0.24, L.y + 2);
      x.closePath();
      x.fill();
      // rim light
      x.strokeStyle = palette[4];
      x.globalAlpha = 0.55;
      x.lineWidth = 1.2;
      x.beginPath();
      x.moveTo(cxp - 1, L.y - L.h + 3);
      x.lineTo(cxp - L.w * 0.4, L.y - 2);
      x.stroke();
      x.globalAlpha = 1;
    }
    // needle speckles
    for (let i = 0; i < 30; i++) {
      const px = 8 + hash2(seed, i, 8) * 48;
      const py = 12 + hash2(seed, i, 9) * 58;
      x.fillStyle = i % 3 ? 'rgba(25,50,28,.45)' : 'rgba(150,190,120,.3)';
      x.fillRect(px, py, 1.2, 2.4);
    }
  });
}

function oakSprite(seed, palette, trunkColor = '#54402c') {
  return sprite(76, 96, 38, 92, (x) => {
    x.strokeStyle = trunkColor;
    x.lineWidth = 7;
    x.beginPath();
    x.moveTo(38, 92);
    x.bezierCurveTo(37, 76, 34, 68, 30, 58);
    x.stroke();
    x.lineWidth = 4.5;
    x.beginPath(); x.moveTo(36, 74); x.bezierCurveTo(28, 66, 24, 62, 20, 54); x.stroke();
    x.beginPath(); x.moveTo(39, 70); x.bezierCurveTo(47, 62, 52, 58, 55, 50); x.stroke();
    x.strokeStyle = 'rgba(30,22,14,.5)'; x.lineWidth = 2;
    x.beginPath(); x.moveTo(40, 90); x.lineTo(39, 72); x.stroke();
    // roots
    x.strokeStyle = trunkColor; x.lineWidth = 2.6;
    x.beginPath(); x.moveTo(38, 91); x.lineTo(30, 95); x.moveTo(40, 91); x.lineTo(48, 95); x.stroke();

    const blobs = [
      [26, 42, 19], [40, 30, 22], [54, 40, 18], [34, 52, 17],
      [48, 54, 15], [18, 50, 13], [60, 53, 12], [40, 18, 13], [29, 27, 12],
    ];
    for (let layer = 0; layer < 3; layer++) {
      for (let i = 0; i < blobs.length; i++) {
        const [bx, by, br] = blobs[i];
        const jx = (hash2(seed, i, layer) - 0.5) * 4;
        const jy = (hash2(seed, i + 9, layer) - 0.5) * 3;
        x.fillStyle = palette[layer + 1];
        x.beginPath();
        x.arc(bx + jx, by + jy + layer * 1.2, br * (1 - layer * 0.13), 0, Math.PI * 2);
        x.fill();
      }
    }
    // leaf highlights
    for (let i = 0; i < 44; i++) {
      const a = hash2(seed, i, 21) * Math.PI * 2;
      const r = Math.sqrt(hash2(seed, i, 22)) * 25;
      const px = 38 + Math.cos(a) * r;
      const py = 38 + Math.sin(a) * r * 0.8;
      x.fillStyle = i % 4 === 0 ? 'rgba(210,230,160,.35)' : 'rgba(25,45,25,.35)';
      x.beginPath(); x.ellipse(px, py, 1.7, 1, a, 0, Math.PI * 2); x.fill();
    }
    // dappled rim light
    x.strokeStyle = palette[4];
    x.globalAlpha = 0.5;
    x.lineWidth = 1.4;
    x.beginPath(); x.arc(34, 26, 26, Math.PI * 1.05, Math.PI * 1.75); x.stroke();
    x.globalAlpha = 1;
  });
}

function rockSprite(seed) {
  return sprite(58, 50, 29, 45, (x) => {
    const pts = [];
    const n = 9;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const r = 16 + hash2(seed, i, 2) * 11;
      pts.push([29 + Math.cos(a) * r * 1.25, 25 + Math.sin(a) * r * 0.72]);
    }
    x.beginPath(); x.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < n; i++) x.lineTo(pts[i][0], pts[i][1]);
    x.closePath();
    const g = x.createLinearGradient(12, 8, 46, 46);
    g.addColorStop(0, '#9aa0a1'); g.addColorStop(0.45, '#7c8386'); g.addColorStop(1, '#565d60');
    x.fillStyle = g; x.fill();
    x.strokeStyle = 'rgba(30,35,36,.6)'; x.lineWidth = 1.4; x.stroke();
    // facets
    x.strokeStyle = 'rgba(40,45,46,.42)'; x.lineWidth = 1;
    x.beginPath();
    x.moveTo(29, 14); x.lineTo(24, 27); x.lineTo(33, 41);
    x.moveTo(24, 27); x.lineTo(12, 30);
    x.moveTo(33, 41); x.lineTo(45, 35);
    x.stroke();
    x.strokeStyle = 'rgba(230,235,230,.35)'; x.lineWidth = 1.2;
    x.beginPath(); x.moveTo(28, 13); x.lineTo(19, 19); x.lineTo(15, 29); x.stroke();
    // moss
    x.fillStyle = 'rgba(90,120,60,.5)';
    for (let i = 0; i < 5; i++) {
      const px = 15 + hash2(seed, i, 4) * 30;
      const py = 32 + hash2(seed, i, 5) * 11;
      x.beginPath(); x.ellipse(px, py, 3, 1.7, 0, 0, Math.PI * 2); x.fill();
    }
    // pebbles
    x.fillStyle = '#777e80';
    x.beginPath(); x.arc(10, 44, 3, 0, Math.PI * 2); x.arc(47, 43, 2.4, 0, Math.PI * 2); x.fill();
  });
}

function bushSprite(seed, withBerries) {
  return sprite(48, 44, 24, 40, (x) => {
    const blobs = [[24, 28, 12], [15, 27, 9], [33, 27, 9], [19, 19, 8], [29, 18, 8], [24, 34, 8]];
    for (let i = 0; i < blobs.length; i++) {
      const [bx, by, br] = blobs[i];
      x.fillStyle = i % 2 ? '#46673a' : '#537a43';
      x.beginPath(); x.arc(bx + (hash2(seed, i, 2) - .5) * 2, by, br, 0, Math.PI * 2); x.fill();
    }
    x.fillStyle = 'rgba(140,180,110,.45)';
    for (let i = 0; i < 14; i++) {
      const px = 10 + hash2(seed, i, 6) * 28;
      const py = 14 + hash2(seed, i, 7) * 21;
      x.beginPath(); x.ellipse(px, py, 1.8, 1.1, hash2(seed, i, 8) * 3, 0, Math.PI * 2); x.fill();
    }
    if (withBerries) {
      for (let i = 0; i < 7; i++) {
        const px = 13 + hash2(seed, i, 11) * 23;
        const py = 19 + hash2(seed, i, 12) * 18;
        x.fillStyle = '#a8403b';
        x.beginPath(); x.arc(px, py, 1.6, 0, Math.PI * 2); x.fill();
        x.fillStyle = 'rgba(255,200,180,.7)';
        x.fillRect(px - 0.5, py - 0.7, 0.8, 0.8);
      }
    }
    x.strokeStyle = 'rgba(40,60,30,.35)'; x.lineWidth = 1;
    x.beginPath(); x.arc(24, 28, 13, 0, Math.PI); x.stroke();
  });
}

function bedSprite(blanket) {
  return sprite(36, 54, 18, 50, (x) => {
    // frame
    rr(x, 5, 6, 26, 45, 3);
    x.fillStyle = '#6a4a2f'; x.fill();
    x.strokeStyle = 'rgba(28,18,10,.6)'; x.lineWidth = 1.2; x.stroke();
    // mattress
    rr(x, 7, 10, 22, 38, 2.5);
    x.fillStyle = '#d8d0bd'; x.fill();
    // pillow
    rr(x, 9, 12, 18, 9, 3);
    x.fillStyle = '#efe9da'; x.fill();
    x.strokeStyle = 'rgba(120,110,90,.4)'; x.lineWidth = 0.8; x.stroke();
    x.strokeStyle = 'rgba(255,255,255,.6)'; x.beginPath(); x.moveTo(11, 15); x.lineTo(25, 15); x.stroke();
    // blanket
    rr(x, 8, 24, 20, 21, 2);
    const g = x.createLinearGradient(8, 24, 28, 45);
    g.addColorStop(0, blanket); g.addColorStop(1, 'rgba(20,20,20,.25)');
    x.fillStyle = g; x.fill();
    x.fillStyle = 'rgba(255,255,255,.12)';
    x.fillRect(8, 27, 20, 2);
    x.fillStyle = 'rgba(0,0,0,.16)';
    x.fillRect(8, 37, 20, 1.4);
    // folds
    x.strokeStyle = 'rgba(0,0,0,.22)'; x.lineWidth = 0.9;
    x.beginPath(); x.moveTo(13, 25); x.lineTo(12, 44); x.moveTo(22, 25); x.lineTo(23, 44); x.stroke();
    // footboard
    x.fillStyle = '#5a3d26';
    rr(x, 5, 46, 26, 4, 1.5); x.fill();
    x.fillStyle = 'rgba(255,255,255,.14)';
    x.fillRect(7, 47, 22, 1);
  });
}

function campfireBase() {
  return sprite(48, 36, 24, 30, (x) => {
    // ring of stones
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      const px = 24 + Math.cos(a) * 14;
      const py = 22 + Math.sin(a) * 8;
      x.fillStyle = i % 3 === 0 ? '#8a8f90' : i % 3 === 1 ? '#767c7e' : '#959a9a';
      x.beginPath(); x.ellipse(px, py, 3.4, 2.6, a, 0, Math.PI * 2); x.fill();
      x.strokeStyle = 'rgba(35,40,42,.5)'; x.lineWidth = .7; x.stroke();
    }
    // charred logs
    x.strokeStyle = '#3d2a1b'; x.lineWidth = 4; x.lineCap = 'round';
    x.beginPath(); x.moveTo(15, 23); x.lineTo(33, 18); x.moveTo(16, 17); x.lineTo(33, 25); x.stroke();
    x.strokeStyle = '#63422a'; x.lineWidth = 1.5;
    x.beginPath(); x.moveTo(15, 22); x.lineTo(32, 17); x.stroke();
    // embers
    for (let i = 0; i < 7; i++) {
      const px = 19 + hash2(i, 1, 3) * 11;
      const py = 19 + hash2(i, 2, 3) * 6;
      x.fillStyle = i % 2 ? '#e88a35' : '#f3bf5e';
      x.beginPath(); x.arc(px, py, 1.1, 0, Math.PI * 2); x.fill();
    }
  });
}

function benchSprite() {
  return sprite(52, 50, 26, 46, (x) => {
    // legs
    x.fillStyle = '#4d3521';
    x.fillRect(9, 28, 4, 16); x.fillRect(39, 28, 4, 16);
    // desktop
    rr(x, 5, 14, 42, 22, 2.5);
    x.fillStyle = '#7a5836'; x.fill();
    x.strokeStyle = 'rgba(30,20,10,.55)'; x.lineWidth = 1.2; x.stroke();
    x.fillStyle = 'rgba(255,255,255,.09)';
    x.fillRect(7, 16, 38, 2);
    // grain
    x.strokeStyle = 'rgba(50,32,16,.35)'; x.lineWidth = .8;
    x.beginPath(); x.moveTo(9, 24); x.lineTo(43, 24); x.moveTo(9, 30); x.lineTo(43, 30); x.stroke();
    // papers
    x.save(); x.translate(17, 20); x.rotate(-0.16);
    x.fillStyle = '#e6dfcb'; x.fillRect(-6, -5, 15, 11);
    x.strokeStyle = 'rgba(90,80,60,.5)'; x.lineWidth = .7;
    x.beginPath(); x.moveTo(-4, -2); x.lineTo(6, -2); x.moveTo(-4, 1); x.lineTo(4, 1); x.moveTo(-4, 4); x.lineTo(6, 4); x.stroke();
    x.restore();
    // flask
    x.fillStyle = 'rgba(150,210,220,.75)';
    x.beginPath(); x.arc(35, 20, 4.6, 0, Math.PI * 2); x.fill();
    x.fillStyle = 'rgba(255,255,255,.5)';
    x.beginPath(); x.arc(33.4, 18.5, 1.3, 0, Math.PI * 2); x.fill();
    x.strokeStyle = '#c9b87f'; x.lineWidth = 1.4;
    x.beginPath(); x.moveTo(35, 15.5); x.lineTo(35, 11.5); x.stroke();
    // candle
    x.fillStyle = '#d9cba9'; x.fillRect(11, 20, 3, 6);
    x.fillStyle = '#ffca66';
    x.beginPath(); x.ellipse(12.5, 18.4, 1.3, 2.2, 0, 0, Math.PI * 2); x.fill();
  });
}

function turretBase() {
  return sprite(44, 40, 22, 36, (x) => {
    x.fillStyle = '#4a4f52';
    x.beginPath(); x.ellipse(22, 30, 17, 8, 0, 0, Math.PI * 2); x.fill();
    x.strokeStyle = 'rgba(20,24,26,.6)'; x.lineWidth = 1; x.stroke();
    x.fillStyle = '#5c6366';
    x.beginPath(); x.ellipse(22, 28, 13, 6, 0, 0, Math.PI * 2); x.fill();
    // legs
    x.strokeStyle = '#3b4043'; x.lineWidth = 3;
    x.beginPath(); x.moveTo(13, 31); x.lineTo(7, 38); x.moveTo(31, 31); x.lineTo(37, 38); x.moveTo(22, 33); x.lineTo(22, 39); x.stroke();
    // ammo box
    x.fillStyle = '#6b6f53'; x.fillRect(29, 30, 10, 6);
    x.strokeStyle = 'rgba(20,25,20,.5)'; x.lineWidth = .8; x.strokeRect(29, 30, 10, 6);
    // dome
    x.fillStyle = '#6e7679';
    x.beginPath(); x.arc(22, 24, 8, Math.PI, Math.PI * 2); x.fill();
    x.fillStyle = 'rgba(255,255,255,.18)';
    x.beginPath(); x.arc(20, 21.5, 4, Math.PI, Math.PI * 2); x.fill();
  });
}

function torchSprite() {
  return sprite(30, 56, 15, 52, (x) => {
    x.fillStyle = '#4a3422';
    x.fillRect(13, 20, 4, 30);
    x.strokeStyle = 'rgba(20,14,8,.5)'; x.lineWidth = 1; x.strokeRect(13, 20, 4, 30);
    x.fillStyle = '#6b4b2d';
    x.fillRect(13, 20, 1.4, 30);
    // base rocks
    x.fillStyle = '#6f7678';
    x.beginPath(); x.ellipse(15, 51, 8, 3, 0, 0, Math.PI * 2); x.fill();
    // bowl
    x.fillStyle = '#3c3f40';
    x.beginPath(); x.moveTo(8, 18); x.lineTo(22, 18); x.lineTo(19, 9); x.lineTo(11, 9); x.closePath(); x.fill();
    x.fillStyle = '#5b5f60';
    x.fillRect(10, 8, 10, 2);
    x.fillStyle = '#2a2c2c';
    x.beginPath(); x.ellipse(15, 8, 8, 2, 0, 0, Math.PI * 2); x.fill();
  });
}

function wallSprite(kind) {
  return sprite(44, 48, 22, 44, (x) => {
    if (kind === 'wood') {
      // side face
      x.fillStyle = '#5b4026';
      x.beginPath(); x.moveTo(4, 30); x.lineTo(40, 30); x.lineTo(38, 43); x.lineTo(6, 43); x.closePath(); x.fill();
      // top planks
      const g = x.createLinearGradient(4, 4, 40, 32);
      g.addColorStop(0, '#9a7449'); g.addColorStop(1, '#75532f');
      rr(x, 4, 4, 36, 28, 2);
      x.fillStyle = g; x.fill();
      x.strokeStyle = 'rgba(40,26,12,.55)'; x.lineWidth = 1.1; x.stroke();
      x.strokeStyle = 'rgba(48,32,18,.4)'; x.lineWidth = 1;
      for (let i = 1; i < 4; i++) { x.beginPath(); x.moveTo(4 + i * 9, 5); x.lineTo(4 + i * 9, 31); x.stroke(); }
      // nails + grain
      x.fillStyle = 'rgba(40,40,42,.55)';
      x.beginPath(); x.arc(9, 9, .9, 0, 7); x.arc(35, 9, .9, 0, 7); x.arc(9, 27, .9, 0, 7); x.arc(35, 27, .9, 0, 7); x.fill();
      x.strokeStyle = 'rgba(220,190,140,.18)'; x.lineWidth = .7;
      x.beginPath(); x.moveTo(6, 12); x.lineTo(38, 12); x.moveTo(6, 23); x.lineTo(38, 23); x.stroke();
      // highlight edge
      x.strokeStyle = 'rgba(255,225,170,.35)'; x.lineWidth = 1.4;
      x.beginPath(); x.moveTo(5, 5); x.lineTo(38, 5); x.stroke();
      // side grain
      x.strokeStyle = 'rgba(30,20,10,.3)'; x.lineWidth = .9;
      x.beginPath(); x.moveTo(8, 33); x.lineTo(37, 33); x.moveTo(8, 38); x.lineTo(37, 38); x.stroke();
    } else {
      // side face
      x.fillStyle = '#565c5e';
      x.beginPath(); x.moveTo(4, 30); x.lineTo(40, 30); x.lineTo(38, 43); x.lineTo(6, 43); x.closePath(); x.fill();
      // stone top
      rr(x, 4, 4, 36, 28, 2.5);
      x.fillStyle = '#7f8481'; x.fill();
      x.strokeStyle = 'rgba(35,40,40,.6)'; x.lineWidth = 1.2; x.stroke();
      // block pattern rows
      const rows = [4, 11, 18, 25];
      for (let r = 0; r < rows.length; r++) {
        const yy = rows[r];
        x.strokeStyle = 'rgba(50,55,54,.42)'; x.lineWidth = .9;
        x.beginPath(); x.moveTo(4, yy); x.lineTo(40, yy); x.stroke();
        const off = r % 2 ? 9 : 0;
        for (let bx = 8 + off; bx < 40; bx += 12) {
          x.beginPath(); x.moveTo(bx, yy); x.lineTo(bx, Math.min(31, yy + 7)); x.stroke();
        }
      }
      // highlights & moss
      x.fillStyle = 'rgba(225,230,220,.18)';
      x.fillRect(6, 5, 32, 2);
      x.fillStyle = 'rgba(95,125,65,.35)';
      x.beginPath(); x.ellipse(9, 29, 4, 2, 0, 0, 7); x.ellipse(35, 30, 3, 1.5, 0, 0, 7); x.fill();
      x.strokeStyle = 'rgba(230,235,225,.25)'; x.lineWidth = 1;
      x.beginPath(); x.moveTo(7, 8); x.lineTo(37, 8); x.stroke();
    }
  });
}

function doorFrame() {
  return sprite(40, 46, 20, 42, (x) => {
    x.fillStyle = 'rgba(0,0,0,.15)';
    x.fillRect(4, 34, 32, 8);
    x.fillStyle = '#6a4a2b';
    x.fillRect(3, 6, 5, 36); x.fillRect(32, 6, 5, 36);
    x.fillStyle = '#8b6338';
    x.fillRect(3, 6, 5, 3); x.fillRect(32, 6, 5, 3);
    x.strokeStyle = 'rgba(30,20,10,.5)'; x.lineWidth = 1;
    x.strokeRect(3, 6, 5, 36); x.strokeRect(32, 6, 5, 36);
  });
}

function itemSprite(type) {
  if (type === 'wood') {
    return sprite(34, 26, 17, 22, (x) => {
      const log = (x0, y0, ang, len) => {
        x.save(); x.translate(x0, y0); x.rotate(ang);
        x.fillStyle = '#7c552f'; rr(x, -len / 2, -3.2, len, 6.4, 3); x.fill();
        x.strokeStyle = 'rgba(30,18,8,.6)'; x.lineWidth = 1; x.stroke();
        x.fillStyle = '#b98a55'; x.beginPath(); x.ellipse(len / 2, 0, 2.2, 3.2, 0, 0, 7); x.fill();
        x.strokeStyle = '#8c6339'; x.lineWidth = .8;
        x.beginPath(); x.ellipse(len / 2, 0, 1.2, 1.8, 0, 0, 7); x.stroke();
        x.strokeStyle = 'rgba(220,180,120,.35)'; x.beginPath(); x.moveTo(-len / 2 + 3, -2); x.lineTo(len / 2 - 4, -2); x.stroke();
        x.restore();
      };
      log(17, 20, -0.06, 26); log(16, 14, 0.12, 24); log(18, 8, -0.18, 22);
    });
  }
  if (type === 'stone') {
    return sprite(34, 26, 17, 22, (x) => {
      const rock = (px, py, r, c) => {
        x.fillStyle = c; x.beginPath();
        x.moveTo(px - r, py); x.lineTo(px - r * .5, py - r * .8); x.lineTo(px + r * .5, py - r * .6);
        x.lineTo(px + r, py + r * .2); x.lineTo(px, py + r * .7); x.closePath(); x.fill();
        x.strokeStyle = 'rgba(35,40,40,.5)'; x.lineWidth = .8; x.stroke();
        x.strokeStyle = 'rgba(235,240,235,.28)'; x.beginPath(); x.moveTo(px - r * .5, py - r * .6); x.lineTo(px + r * .2, py - r * .3); x.stroke();
      };
      rock(11, 19, 7, '#8a9092'); rock(23, 20, 8, '#7b8284'); rock(19, 11, 6, '#979d9e');
    });
  }
  if (type === 'food') {
    return sprite(30, 26, 15, 22, (x) => {
      x.fillStyle = '#8a6b3c';
      x.beginPath(); x.moveTo(6, 12); x.lineTo(24, 12); x.lineTo(21, 22); x.lineTo(9, 22); x.closePath(); x.fill();
      x.strokeStyle = 'rgba(40,25,10,.5)'; x.lineWidth = .9; x.stroke();
      x.strokeStyle = 'rgba(230,205,150,.4)'; x.lineWidth = .8;
      x.beginPath(); x.moveTo(8, 15); x.lineTo(22, 15); x.moveTo(9, 19); x.lineTo(21, 19); x.stroke();
      x.fillStyle = '#a83f3a';
      for (let i = 0; i < 6; i++) {
        const px = 8 + hash2(i, type.length, 3) * 14;
        const py = 8 + hash2(i, 7, 3) * 6;
        x.beginPath(); x.arc(px, py, 2.1, 0, 7); x.fill();
        x.fillStyle = 'rgba(255,215,200,.6)'; x.fillRect(px - .6, py - .8, .8, .8); x.fillStyle = '#a83f3a';
      }
      x.fillStyle = '#5f7c3d';
      x.beginPath(); x.ellipse(18, 7, 4, 2, -0.5, 0, 7); x.fill();
    });
  }
  return sprite(30, 26, 15, 22, (x) => {
    // meal bowl
    x.fillStyle = '#d8cdb5';
    x.beginPath(); x.ellipse(15, 16, 10, 6, 0, 0, Math.PI); x.fill();
    x.fillStyle = '#a88f68';
    x.beginPath(); x.ellipse(15, 16, 7.5, 3.6, 0, 0, Math.PI); x.fill();
    x.fillStyle = '#c98f4e';
    x.beginPath(); x.ellipse(15, 15.5, 6, 2.6, 0, 0, 7); x.fill();
    x.strokeStyle = 'rgba(255,255,255,.35)'; x.lineWidth = .8;
    x.beginPath(); x.ellipse(15, 16, 10, 5.5, 0, 0.15, Math.PI - .15); x.stroke();
    x.strokeStyle = 'rgba(255,240,210,.4)'; x.lineWidth = 1;
    x.beginPath(); x.moveTo(12, 10); x.bezierCurveTo(10, 7, 14, 6, 12.5, 3); x.moveTo(18, 10); x.bezierCurveTo(16, 7, 20, 6, 18.5, 3.5); x.stroke();
  });
}

export function createSprites() {
  const s = {};
  const pine = ['#2b4429', '#35522f', '#426637', '#507a42', '#63914f'];
  const pine2 = ['#263f2c', '#304d33', '#3a5c3a', '#466c41', '#578050'];
  const oakPal = ['#2c4527', '#38552f', '#466a38', '#587f45', '#6d9854'];
  const goldPal = ['#5a3d18', '#7a5320', '#976a28', '#b18335', '#cfa24c'];
  s.pine0 = pineSprite(11, pine);
  s.pine1 = pineSprite(23, pine2);
  s.pine2 = oakSprite(37, goldPal, '#7a6148');
  s.oak0 = oakSprite(53, oakPal);
  s.oak1 = oakSprite(67, oakPal);
  s.oak2 = oakSprite(71, goldPal, '#6d5b46');
  s.rock0 = rockSprite(3);
  s.rock1 = rockSprite(9);
  s.rock2 = rockSprite(17);
  s.bush0 = bushSprite(5, true);
  s.bush1 = bushSprite(8, false);
  s.bed0 = bedSprite('#8f5a54');
  s.bed1 = bedSprite('#5d7186');
  s.bed2 = bedSprite('#7c8a5e');
  s.bed3 = bedSprite('#6e5d7a');
  s.campfire = campfireBase();
  s.bench = benchSprite();
  s.turret = turretBase();
  s.torch = torchSprite();
  s.wallWood = wallSprite('wood');
  s.wallStone = wallSprite('stone');
  s.door = doorFrame();
  s.itemWood = itemSprite('wood');
  s.itemStone = itemSprite('stone');
  s.itemFood = itemSprite('food');
  s.itemMeal = itemSprite('meal');
  s.bed = [s.bed0, s.bed1, s.bed2, s.bed3];
  return s;
}

export { rr, leafShade, goldShade };
