import * as THREE from 'three';

let RNG_STATE = 90210;
function rand() {
  RNG_STATE = (RNG_STATE * 1664525 + 1013904223) % 4294967296;
  return RNG_STATE / 4294967296;
}
function randRange(a, b) { return a + rand() * (b - a); }

function canvas2d(w, h) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return [c, c.getContext('2d')];
}

function finishTexture(canvas, { repeat = [1, 1], srgb = true, aniso = 8 } = {}) {
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeat[0], repeat[1]);
  tex.anisotropy = aniso;
  if (srgb) tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function noise(ctx, w, h, count, alpha, light = false) {
  for (let i = 0; i < count; i++) {
    const a = rand() * alpha;
    ctx.fillStyle = light ? `rgba(255,248,230,${a})` : `rgba(20,24,20,${a})`;
    const s = rand() < 0.85 ? 1 : 2;
    ctx.fillRect(rand() * w, rand() * h, s, s);
  }
}

export function makeConcreteTexture() {
  const [c, ctx] = canvas2d(512, 512);
  ctx.fillStyle = '#bcb3a2';
  ctx.fillRect(0, 0, 512, 512);

  const grad = ctx.createLinearGradient(0, 0, 512, 512);
  grad.addColorStop(0, 'rgba(255,246,226,.08)');
  grad.addColorStop(.45, 'rgba(255,255,255,0)');
  grad.addColorStop(1, 'rgba(50,49,40,.1)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Broad weathering blooms
  for (let i = 0; i < 18; i++) {
    const x = rand() * 512, y = rand() * 512, r = randRange(18, 90);
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, `rgba(67,61,48,${randRange(.025, .07)})`);
    g.addColorStop(1, 'rgba(67,61,48,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
  noise(ctx, 512, 512, 7600, .14);
  noise(ctx, 512, 512, 2400, .13, true);

  // Expansion joints
  ctx.strokeStyle = 'rgba(63,59,50,.36)';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 1); ctx.lineTo(512, 1); ctx.moveTo(1, 0); ctx.lineTo(1, 512); ctx.stroke();
  ctx.strokeStyle = 'rgba(255,248,232,.16)';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(0, 3); ctx.lineTo(512, 3); ctx.moveTo(3, 0); ctx.lineTo(3, 512); ctx.stroke();

  // Hairline cracks
  for (let i = 0; i < 6; i++) {
    let x = rand() * 512, y = rand() * 512;
    ctx.beginPath();
    ctx.moveTo(x, y);
    const steps = Math.floor(randRange(4, 9));
    for (let s = 0; s < steps; s++) {
      x += randRange(-16, 16); y += randRange(4, 18);
      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = 'rgba(55,52,43,.22)';
    ctx.lineWidth = .6;
    ctx.stroke();
  }

  return finishTexture(c, { repeat: [12, 12], aniso: 16 });
}

export function makeAsphaltTexture() {
  const [c, ctx] = canvas2d(512, 512);
  ctx.fillStyle = '#252925';
  ctx.fillRect(0, 0, 512, 512);
  noise(ctx, 512, 512, 12000, .32);
  noise(ctx, 512, 512, 5000, .1, true);
  for (let i = 0; i < 40; i++) {
    ctx.fillStyle = `rgba(170,168,153,${randRange(.02, .08)})`;
    ctx.beginPath();
    ctx.arc(rand() * 512, rand() * 512, randRange(1, 4), 0, Math.PI * 2);
    ctx.fill();
  }
  return finishTexture(c, { repeat: [14, 14], aniso: 8 });
}

export function makeTileTexture() {
  const [c, ctx] = canvas2d(512, 512);
  const cols = 4, rows = 4;
  const cw = 512 / cols, ch = 512 / rows;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const warm = rand() > .35;
      ctx.fillStyle = warm ? `hsl(${randRange(18, 28)}, ${randRange(14, 24)}%, ${randRange(56, 67)}%)` : `hsl(${randRange(35, 45)}, 12%, ${randRange(66, 75)}%)`;
      ctx.fillRect(x * cw + 2, y * ch + 2, cw - 4, ch - 4);
      ctx.fillStyle = 'rgba(255,255,255,.04)';
      ctx.fillRect(x * cw + 4, y * ch + 4, cw - 8, 2);
    }
  }
  noise(ctx, 512, 512, 5000, .1);
  ctx.strokeStyle = 'rgba(76,70,57,.32)';
  ctx.lineWidth = 3;
  for (let i = 0; i <= cols; i++) {
    ctx.beginPath(); ctx.moveTo(i * cw, 0); ctx.lineTo(i * cw, 512); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, i * ch); ctx.lineTo(512, i * ch); ctx.stroke();
  }
  return finishTexture(c, { repeat: [8, 8], aniso: 16 });
}

export function makeSandTexture() {
  const [c, ctx] = canvas2d(512, 512);
  ctx.fillStyle = '#d9bf91';
  ctx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 32; i++) {
    ctx.strokeStyle = `rgba(130,103,67,${randRange(.03, .09)})`;
    ctx.lineWidth = randRange(1, 3);
    ctx.beginPath();
    const y = rand() * 512;
    for (let x = 0; x <= 512; x += 16) ctx.lineTo(x, y + Math.sin(x * .03 + i) * 5 + randRange(-2, 2));
    ctx.stroke();
  }
  noise(ctx, 512, 512, 13000, .09);
  noise(ctx, 512, 512, 7000, .08, true);
  return finishTexture(c, { repeat: [12, 12] });
}

export function makeGripTexture() {
  const [c, ctx] = canvas2d(256, 512);
  ctx.fillStyle = '#111410';
  ctx.fillRect(0, 0, 256, 512);
  noise(ctx, 256, 512, 16000, .25, true);
  noise(ctx, 256, 512, 5000, .3);
  ctx.strokeStyle = 'rgba(255,255,255,.025)';
  ctx.lineWidth = 1;
  for (let x = -512; x < 512; x += 8) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + 512, 512); ctx.stroke();
  }
  const g = ctx.createLinearGradient(0, 0, 0, 512);
  g.addColorStop(0, 'rgba(255,255,255,.06)');
  g.addColorStop(.5, 'rgba(0,0,0,0)');
  g.addColorStop(1, 'rgba(255,255,255,.035)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 512);
  return finishTexture(c, { repeat: [1, 1], aniso: 8 });
}

export function makeDeckGraphicTexture() {
  const [c, ctx] = canvas2d(320, 900);
  ctx.fillStyle = '#122c29';
  ctx.fillRect(0, 0, 320, 900);

  // Wood veneer edge hints
  for (let i = 0; i < 8; i++) {
    ctx.fillStyle = `rgba(218,162,98,${i % 2 ? .08 : .04})`;
    ctx.fillRect(0, 70 + i * 3, 320, 1);
  }

  // Sunburst
  const cx = 160, cy = 410, r = 116;
  ctx.save();
  ctx.translate(cx, cy);
  for (let i = 0; i < 28; i++) {
    ctx.rotate((Math.PI * 2) / 28);
    ctx.fillStyle = i % 2 ? '#e9502f' : '#f6b642';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-13, -r - 60);
    ctx.lineTo(13, -r - 60);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
  const sun = ctx.createRadialGradient(cx - 30, cy - 30, 8, cx, cy, r);
  sun.addColorStop(0, '#fff4c4');
  sun.addColorStop(.55, '#f6ad33');
  sun.addColorStop(1, '#e9502f');
  ctx.fillStyle = sun;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();

  // Ocean wave
  ctx.fillStyle = '#0d5758';
  ctx.beginPath();
  ctx.moveTo(0, 610);
  ctx.bezierCurveTo(75, 570, 105, 650, 160, 610);
  ctx.bezierCurveTo(220, 570, 250, 655, 320, 604);
  ctx.lineTo(320, 720); ctx.lineTo(0, 720);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#e8e0c8';
  ctx.beginPath();
  ctx.moveTo(0, 618);
  ctx.bezierCurveTo(80, 584, 108, 648, 162, 618);
  ctx.bezierCurveTo(222, 584, 252, 648, 320, 612);
  ctx.lineTo(320, 626);
  ctx.bezierCurveTo(252, 662, 222, 598, 162, 632);
  ctx.bezierCurveTo(108, 662, 80, 598, 0, 632);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#f1ead8';
  ctx.font = '700 34px "Arial Black", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('SUNSET', 160, 140);
  ctx.font = '700 15px "Arial", sans-serif';
  ctx.letterSpacing = '5px';
  ctx.fillText('SKATE CO.', 160, 164);
  ctx.fillStyle = '#d7ff43';
  ctx.fillRect(112, 178, 96, 4);

  ctx.save();
  ctx.translate(160, 780);
  ctx.rotate(-.06);
  ctx.fillStyle = '#efe6d1';
  ctx.font = 'italic 700 31px "Arial", sans-serif';
  ctx.fillText('VENICE', 0, 0);
  ctx.restore();
  ctx.fillStyle = 'rgba(239,230,209,.45)';
  ctx.font = '500 12px monospace';
  ctx.fillText('SG-86 / 8.25" / GOLDEN HOUR', 160, 844);

  return finishTexture(c, { repeat: [1, 1], aniso: 8 });
}

export function makeMuralTexture() {
  const [c, ctx] = canvas2d(1024, 512);
  const bg = ctx.createLinearGradient(0, 0, 1024, 512);
  bg.addColorStop(0, '#173f3a');
  bg.addColorStop(.6, '#0c2826');
  bg.addColorStop(1, '#071615');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 1024, 512);

  // Big sun
  const sun = ctx.createRadialGradient(758, 208, 10, 758, 208, 184);
  sun.addColorStop(0, '#ffe9a7');
  sun.addColorStop(.45, '#ffb240');
  sun.addColorStop(1, '#f05430');
  ctx.fillStyle = sun;
  ctx.beginPath(); ctx.arc(758, 208, 176, 0, Math.PI * 2); ctx.fill();

  // Retro waves
  ctx.strokeStyle = '#48b9a4';
  ctx.lineWidth = 18;
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    for (let x = -20; x <= 1060; x += 20) {
      const y = 330 + i * 34 + Math.sin(x * .012 + i * .8) * 18;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  // Abstract palm
  ctx.strokeStyle = '#d7ff43';
  ctx.lineWidth = 7;
  ctx.beginPath(); ctx.moveTo(178, 470); ctx.quadraticCurveTo(150, 300, 212, 176); ctx.stroke();
  for (let i = 0; i < 7; i++) {
    const a = -2.55 + i * .42;
    ctx.beginPath();
    ctx.moveTo(212, 176);
    ctx.quadraticCurveTo(212 + Math.cos(a) * 86, 176 + Math.sin(a) * 86 - 40, 212 + Math.cos(a) * 150, 176 + Math.sin(a) * 150);
    ctx.stroke();
  }

  ctx.fillStyle = '#f2ead7';
  ctx.font = '700 88px "Arial Black", sans-serif';
  ctx.save();
  ctx.translate(376, 230);
  ctx.rotate(-.055);
  ctx.fillText('SUNSET', 0, 0);
  ctx.restore();
  ctx.strokeStyle = '#d7ff43';
  ctx.lineWidth = 4;
  ctx.strokeText('SUNSET', 376, 318);
  ctx.fillStyle = '#ff5b3a';
  ctx.font = '700 50px "Arial", sans-serif';
  ctx.fillText('GRIND', 388, 372);
  ctx.fillStyle = 'rgba(242,234,215,.48)';
  ctx.font = '600 15px monospace';
  ctx.fillText('VENICE BEACH · CALIFORNIA · 1986', 392, 400);

  // Paint scrapes and speckle
  noise(ctx, 1024, 512, 9000, .09, true);
  noise(ctx, 1024, 512, 6000, .13);
  for (let i = 0; i < 18; i++) {
    ctx.fillStyle = `rgba(7,22,21,${randRange(.05, .2)})`;
    ctx.fillRect(rand() * 1024, rand() * 512, randRange(8, 80), randRange(1, 5));
  }
  return finishTexture(c, { repeat: [1, 1], aniso: 8 });
}

export function makeFacadeTexture(seed = 1, base = '#d6a17e', trim = '#f0e1c8') {
  let s = seed * 7919 + 17;
  const rr = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  const [c, ctx] = canvas2d(512, 512);
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 512, 512);
  noise(ctx, 512, 512, 4200, .11, true);
  noise(ctx, 512, 512, 3000, .08);

  // Ground floor storefront
  ctx.fillStyle = 'rgba(23,35,32,.9)';
  ctx.fillRect(18, 350, 476, 144);
  ctx.fillStyle = trim;
  ctx.fillRect(18, 340, 476, 14);
  ctx.fillStyle = 'rgba(86,149,153,.36)';
  for (let i = 0; i < 4; i++) ctx.fillRect(33 + i * 118, 372, 96, 102);
  ctx.strokeStyle = trim;
  ctx.lineWidth = 5;
  for (let i = 0; i <= 4; i++) {
    ctx.beginPath(); ctx.moveTo(30 + i * 118, 368); ctx.lineTo(30 + i * 118, 480); ctx.stroke();
  }

  // Upper windows
  const rows = 3, cols = 4;
  for (let r = 0; r < rows; r++) {
    for (let col = 0; col < cols; col++) {
      const x = 42 + col * 116, y = 52 + r * 94;
      ctx.fillStyle = 'rgba(20,42,45,.92)';
      ctx.fillRect(x, y, 74, 64);
      const g = ctx.createLinearGradient(x, y, x + 74, y + 64);
      g.addColorStop(0, 'rgba(122,197,196,.34)');
      g.addColorStop(.5, 'rgba(17,40,43,.05)');
      g.addColorStop(1, 'rgba(247,190,120,.15)');
      ctx.fillStyle = g;
      ctx.fillRect(x, y, 74, 64);
      ctx.strokeStyle = trim;
      ctx.lineWidth = 4;
      ctx.strokeRect(x - 1, y - 1, 76, 66);
      ctx.beginPath(); ctx.moveTo(x + 37, y); ctx.lineTo(x + 37, y + 64); ctx.stroke();
      // balcony
      ctx.fillStyle = 'rgba(30,31,25,.45)';
      ctx.fillRect(x - 7, y + 65, 88, 6);
      ctx.strokeStyle = 'rgba(20,22,18,.7)';
      ctx.lineWidth = 2;
      for (let b = 0; b < 8; b++) {
        ctx.beginPath(); ctx.moveTo(x - 4 + b * 11, y + 70); ctx.lineTo(x - 4 + b * 11, y + 82); ctx.stroke();
      }
      if (rr() > .74) {
        ctx.fillStyle = 'rgba(40,68,53,.9)';
        ctx.beginPath(); ctx.arc(x + 66, y + 22, 10, 0, Math.PI * 2); ctx.fill();
      }
    }
  }

  // Cornice / trim
  ctx.fillStyle = trim;
  ctx.fillRect(0, 0, 512, 10);
  ctx.fillStyle = 'rgba(62,45,34,.28)';
  ctx.fillRect(0, 10, 512, 4);
  ctx.fillStyle = 'rgba(255,255,255,.08)';
  ctx.fillRect(0, 336, 512, 4);
  noise(ctx, 512, 512, 2600, .07);
  return finishTexture(c, { repeat: [1, 1], aniso: 8 });
}

export function makeShopTexture(text, sub, bg = '#123f3b', fg = '#f5eedb', accent = '#d7ff43') {
  const [c, ctx] = canvas2d(512, 256);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 512, 256);
  ctx.strokeStyle = 'rgba(245,238,219,.22)';
  ctx.lineWidth = 8;
  ctx.strokeRect(12, 12, 488, 232);
  ctx.fillStyle = accent;
  ctx.fillRect(28, 31, 64, 6);
  ctx.fillStyle = fg;
  ctx.textAlign = 'center';
  ctx.font = '700 84px "Arial Black", sans-serif';
  ctx.fillText(text, 256, 154);
  ctx.fillStyle = accent;
  ctx.font = '600 21px monospace';
  ctx.fillText(sub, 256, 198);
  ctx.textAlign = 'left';
  return finishTexture(c, { repeat: [1, 1] });
}

export function makePosterTexture(title = 'SKATE', sub = 'VENICE') {
  const [c, ctx] = canvas2d(256, 380);
  ctx.fillStyle = '#e95b38';
  ctx.fillRect(0, 0, 256, 380);
  ctx.fillStyle = '#0b2725';
  ctx.beginPath(); ctx.arc(128, 142, 88, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#d7ff43';
  ctx.beginPath(); ctx.arc(128, 142, 58, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#0b2725';
  ctx.font = '700 66px "Arial Black", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(title, 128, 286);
  ctx.font = '700 18px monospace';
  ctx.fillText(sub, 128, 320);
  ctx.strokeStyle = 'rgba(245,238,219,.6)';
  ctx.lineWidth = 5;
  ctx.strokeRect(10, 10, 236, 360);
  noise(ctx, 256, 380, 1000, .08, true);
  return finishTexture(c, { repeat: [1, 1] });
}

export function makeGlowTexture(inner = '#fff8d0', outer = 'rgba(255,133,51,0)') {
  const [c, ctx] = canvas2d(256, 256);
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, inner);
  g.addColorStop(.16, 'rgba(255,243,190,.72)');
  g.addColorStop(.42, 'rgba(255,164,70,.2)');
  g.addColorStop(1, outer);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function makeShadowTexture() {
  const [c, ctx] = canvas2d(256, 256);
  const g = ctx.createRadialGradient(128, 128, 4, 128, 128, 124);
  g.addColorStop(0, 'rgba(5,12,10,.62)');
  g.addColorStop(.42, 'rgba(5,12,10,.34)');
  g.addColorStop(1, 'rgba(5,12,10,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function makeSparksTexture() {
  const [c, ctx] = canvas2d(64, 64);
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,255,220,1)');
  g.addColorStop(.25, 'rgba(255,230,110,.9)');
  g.addColorStop(.55, 'rgba(255,116,32,.35)');
  g.addColorStop(1, 'rgba(255,80,20,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function makeGraffitiTexture() {
  const [c, ctx] = canvas2d(1024, 384);
  ctx.clearRect(0, 0, 1024, 384);
  const words = [
    { t: 'RIDE', x: 44, y: 240, size: 168, color: '#d7ff43', tilt: -.05 },
    { t: 'LOCAL', x: 336, y: 150, size: 96, color: '#ff5b3a', tilt: .035 },
    { t: '86', x: 744, y: 300, size: 220, color: '#f4ead3', tilt: -.03 }
  ];
  for (const w of words) {
    ctx.save();
    ctx.translate(w.x, w.y);
    ctx.rotate(w.tilt);
    ctx.font = `700 ${w.size}px "Arial Black", sans-serif`;
    ctx.lineWidth = 14;
    ctx.strokeStyle = 'rgba(9,24,22,.9)';
    ctx.strokeText(w.t, 0, 0);
    ctx.fillStyle = w.color;
    ctx.fillText(w.t, 0, 0);
    ctx.restore();
  }
  ctx.strokeStyle = 'rgba(245,238,219,.75)';
  ctx.lineWidth = 7;
  ctx.beginPath(); ctx.moveTo(58, 290); ctx.bezierCurveTo(220, 340, 450, 250, 690, 318); ctx.stroke();
  ctx.fillStyle = 'rgba(255,91,58,.9)';
  ctx.beginPath(); ctx.arc(931, 170, 52, 0, Math.PI * 2); ctx.fill();
  noise(ctx, 1024, 384, 3000, .1, true);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

export function makeFilmGrainTexture() {
  const [c, ctx] = canvas2d(128, 128);
  const img = ctx.createImageData(128, 128);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = Math.floor(rand() * 255);
    img.data[i] = v; img.data[i + 1] = v; img.data[i + 2] = v; img.data[i + 3] = 22;
  }
  ctx.putImageData(img, 0, 0);
  return finishTexture(c, { repeat: [1, 1] });
}
