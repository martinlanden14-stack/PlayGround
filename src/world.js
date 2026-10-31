import * as THREE from 'three';
import { makeCar, makeSimplePerson } from './entities.js';

export const WORLD_HALF = 170;
export const CITY_HALF = 132;
export const ROADS = [-120, -80, -40, 0, 40, 80, 120];
export const BLOCK_CENTERS = [-100, -60, -20, 20, 60, 100];
export const ROAD_HALF = 7;
export const SIDEWALK_HALF = 11.5;

function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rng = mulberry32(982451653);
const rand = (a = 0, b = 1) => a + rng() * (b - a);
const pick = (arr) => arr[Math.floor(rng() * arr.length)];

function makeNoise(ctx, w, h, amount, color) {
  for (let i = 0; i < amount; i++) {
    ctx.fillStyle = color;
    ctx.globalAlpha = rand(0.015, 0.07);
    const s = rand(1, 4);
    ctx.fillRect(rand(0, w), rand(0, h), s, s);
  }
  ctx.globalAlpha = 1;
}

function worldToCanvas(v, size, extent) {
  return ((v + extent) / (extent * 2)) * size;
}

function makeGroundTexture(renderer) {
  const size = 2048;
  const extent = 170;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');

  ctx.fillStyle = '#8d837b';
  ctx.fillRect(0, 0, size, size);
  makeNoise(ctx, size, size, 16000, '#392f31');
  makeNoise(ctx, size, size, 9000, '#f4e8d7');

  // city blocks get a slightly warmer pavement
  for (const bx of BLOCK_CENTERS) {
    for (const bz of BLOCK_CENTERS) {
      const x = worldToCanvas(bx - 20, size, extent);
      const y = worldToCanvas(bz - 20, size, extent);
      const w = (40 / (extent * 2)) * size;
      ctx.fillStyle = '#9a9086';
      ctx.globalAlpha = 0.22;
      ctx.fillRect(x, y, w, w);
      ctx.globalAlpha = 1;
    }
  }

  const roadW = ((ROAD_HALF * 2) / (extent * 2)) * size;
  const roadPixel = (v) => worldToCanvas(v, size, extent) - roadW / 2;

  // asphalt
  for (const r of ROADS) {
    const p = roadPixel(r);
    ctx.fillStyle = '#343740';
    ctx.fillRect(p, 0, roadW, size);
    ctx.fillRect(0, p, size, roadW);
  }

  // curbs and gutters
  for (const r of ROADS) {
    const p = roadPixel(r);
    ctx.strokeStyle = 'rgba(230,216,190,0.28)';
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(p, 0); ctx.lineTo(p, size); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(p + roadW, 0); ctx.lineTo(p + roadW, size); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, p); ctx.lineTo(size, p); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, p + roadW); ctx.lineTo(size, p + roadW); ctx.stroke();
  }

  // lane dashes
  ctx.strokeStyle = 'rgba(227,190,96,0.72)';
  ctx.lineWidth = 4;
  ctx.setLineDash([34, 27]);
  for (const r of ROADS) {
    const p = worldToCanvas(r, size, extent);
    ctx.beginPath(); ctx.moveTo(p, 0); ctx.lineTo(p, size); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, p); ctx.lineTo(size, p); ctx.stroke();
  }
  ctx.setLineDash([]);

  // crosswalks at every intersection
  for (const rx of ROADS) {
    for (const rz of ROADS) {
      const cx = worldToCanvas(rx, size, extent);
      const cz = worldToCanvas(rz, size, extent);
      const stripe = 12;
      const gap = 9;
      ctx.fillStyle = 'rgba(235,228,211,0.64)';
      for (let i = -2; i <= 2; i++) {
        // north / south crossings
        ctx.fillRect(cx + i * (stripe + gap) - stripe / 2, cz - roadW / 2 - 28, stripe, 20);
        ctx.fillRect(cx + i * (stripe + gap) - stripe / 2, cz + roadW / 2 + 8, stripe, 20);
        // east / west crossings
        ctx.fillRect(cx - roadW / 2 - 28, cz + i * (stripe + gap) - stripe / 2, 20, stripe);
        ctx.fillRect(cx + roadW / 2 + 8, cz + i * (stripe + gap) - stripe / 2, 20, stripe);
      }
    }
  }

  // asphalt grime and repairs
  ctx.globalAlpha = 0.16;
  for (let i = 0; i < 240; i++) {
    const rx = pick(ROADS);
    const along = rand(-140, 140);
    const lateral = rand(-6, 6);
    ctx.fillStyle = rng() > 0.5 ? '#11131a' : '#585b61';
    if (rng() > 0.5) ctx.fillRect(worldToCanvas(rx + lateral, size, extent), worldToCanvas(along, size, extent), rand(3, 18), rand(2, 9));
    else ctx.fillRect(worldToCanvas(along, size, extent), worldToCanvas(rx + lateral, size, extent), rand(2, 9), rand(3, 18));
  }
  ctx.globalAlpha = 1;

  // manholes
  for (let i = 0; i < 28; i++) {
    const rx = pick(ROADS);
    const along = rand(-130, 130);
    const lateral = rand(-4.5, 4.5);
    const vertical = rng() > 0.5;
    const x = worldToCanvas(vertical ? rx + lateral : along, size, extent);
    const y = worldToCanvas(vertical ? along : rx + lateral, size, extent);
    ctx.fillStyle = '#1b1d22';
    ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#4e5158'; ctx.lineWidth = 1.5; ctx.stroke();
  }

  // faded road paint
  ctx.fillStyle = 'rgba(220,206,176,0.18)';
  for (const rx of ROADS) {
    for (const rz of ROADS) {
      const x = worldToCanvas(rx, size, extent);
      const y = worldToCanvas(rz, size, extent);
      ctx.save(); ctx.translate(x, y); ctx.rotate(Math.PI / 4);
      ctx.fillRect(-2, -18, 4, 36);
      ctx.restore();
    }
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  return tex;
}

const facadeSchemes = [
  { base: '#376967', dark: '#1f4448', window: '#20313e', lit: '#ffc46d', trim: '#6e8e87' },
  { base: '#a5524d', dark: '#6b2e34', window: '#26263b', lit: '#ffb85d', trim: '#c88472' },
  { base: '#b8a58b', dark: '#7c6e62', window: '#253140', lit: '#ffd98b', trim: '#d4c4a8' },
  { base: '#4d3b69', dark: '#2d2245', window: '#1c2339', lit: '#ffbd69', trim: '#776091' },
  { base: '#283a53', dark: '#172438', window: '#111c2c', lit: '#ffc66f', trim: '#52647d' },
  { base: '#b36e56', dark: '#743d36', window: '#272436', lit: '#ffd17b', trim: '#d39278' },
  { base: '#69765f', dark: '#3d4b3c', window: '#1e2c30', lit: '#ffd28a', trim: '#8d9a80' }
];

function makeFacadeTextures(scheme) {
  const w = 128, h = 256;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  const e = document.createElement('canvas');
  e.width = w; e.height = h;
  const ectx = e.getContext('2d');

  ctx.fillStyle = scheme.base; ctx.fillRect(0, 0, w, h);
  ectx.fillStyle = '#000'; ectx.fillRect(0, 0, w, h);
  makeNoise(ctx, w, h, 900, '#ffffff');
  makeNoise(ctx, w, h, 600, '#000000');

  const cols = 4, rows = 8;
  const cw = w / cols, rh = h / rows;
  for (let row = 0; row < rows; row++) {
    const y = row * rh;
    // floor band
    ctx.fillStyle = scheme.trim;
    ctx.globalAlpha = 0.36;
    ctx.fillRect(0, y + rh - 3, w, 2);
    ctx.globalAlpha = 1;
    for (let col = 0; col < cols; col++) {
      const x = col * cw + cw * 0.2;
      const ww = cw * 0.6;
      const wy = y + rh * 0.22;
      const wh = rh * 0.46;
      const lit = rng() < 0.29;
      ctx.fillStyle = scheme.dark;
      ctx.fillRect(x - 2, wy - 2, ww + 4, wh + 4);
      ctx.fillStyle = lit ? scheme.lit : scheme.window;
      ctx.fillRect(x, wy, ww, wh);
      if (lit) {
        ectx.fillStyle = 'rgba(255,190,100,0.9)';
        ectx.fillRect(x, wy, ww, wh);
        ectx.fillStyle = 'rgba(255,240,190,0.55)';
        ectx.fillRect(x + ww * 0.12, wy + 2, ww * 0.35, wh * 0.42);
        ctx.fillStyle = 'rgba(255,235,180,0.25)';
        ctx.fillRect(x - 3, wy - 3, ww + 6, wh + 6);
      } else {
        ctx.fillStyle = 'rgba(122,164,188,0.15)';
        ctx.fillRect(x + 1, wy + 1, ww * 0.35, wh * 0.7);
      }
      // mullions
      ctx.strokeStyle = 'rgba(15,18,25,0.65)';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, wy, ww, wh);
      ctx.beginPath(); ctx.moveTo(x + ww / 2, wy); ctx.lineTo(x + ww / 2, wy + wh); ctx.stroke();
    }
  }

  // street level storefronts
  ctx.fillStyle = scheme.dark;
  ctx.fillRect(0, h - 26, w, 26);
  ectx.fillStyle = '#000';
  ectx.fillRect(0, h - 26, w, 26);
  for (let i = 0; i < 2; i++) {
    ctx.fillStyle = i === 0 ? 'rgba(255,196,109,0.8)' : 'rgba(101,243,224,0.35)';
    ctx.fillRect(8 + i * 60, h - 22, 44, 15);
    ectx.fillStyle = i === 0 ? '#ffc46d' : '#65f3e0';
    ectx.fillRect(8 + i * 60, h - 22, 44, 15);
  }

  // grime base
  const grime = ctx.createLinearGradient(0, h * 0.7, 0, h);
  grime.addColorStop(0, 'rgba(0,0,0,0)');
  grime.addColorStop(1, 'rgba(0,0,0,0.28)');
  ctx.fillStyle = grime; ctx.fillRect(0, h * 0.7, w, h * 0.3);

  const map = new THREE.CanvasTexture(c);
  map.colorSpace = THREE.SRGBColorSpace;
  map.wrapS = map.wrapT = THREE.RepeatWrapping;
  const emissive = new THREE.CanvasTexture(e);
  emissive.colorSpace = THREE.SRGBColorSpace;
  emissive.wrapS = emissive.wrapT = THREE.RepeatWrapping;
  return { map, emissive };
}

function scaleBoxUVs(geo, w, h, d) {
  const uv = geo.attributes.uv;
  const norm = geo.attributes.normal;
  for (let i = 0; i < uv.count; i++) {
    const nx = Math.abs(norm.getX(i));
    const ny = Math.abs(norm.getY(i));
    const nz = Math.abs(norm.getZ(i));
    let su = 1, sv = 1;
    if (nx > 0.5) { su = d / 12; sv = h / 26; }
    else if (nz > 0.5) { su = w / 12; sv = h / 26; }
    else if (ny > 0.5) { su = w / 14; sv = d / 14; }
    uv.setXY(i, uv.getX(i) * su, uv.getY(i) * sv);
  }
  uv.needsUpdate = true;
}

const neonWords = ['HOTEL', 'MOTEL', 'CLUB 77', 'DINER', 'PAWN', 'LIQUOR', 'TATTOO', 'SUNSET', 'CASINO', '24 HRS'];
const neonColors = ['#ff5b6e', '#65f3e0', '#ffc85a', '#ff7a2f', '#d68cff'];

function makeNeonSign(text, color) {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 128;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 512, 128);
  ctx.fillStyle = 'rgba(10,6,18,0.82)';
  ctx.fillRect(10, 12, 492, 104);
  ctx.strokeStyle = color;
  ctx.lineWidth = 6;
  ctx.strokeRect(14, 16, 484, 96);
  ctx.font = '800 64px "Arial Narrow", Impact, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = color;
  ctx.shadowBlur = 24;
  ctx.fillStyle = color;
  ctx.fillText(text, 256, 68);
  ctx.shadowBlur = 0;
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.font = '700 18px "Arial Narrow", Impact, sans-serif';
  ctx.fillText('OPEN LATE', 256, 106);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeBillboardTexture() {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 256;
  const ctx = c.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 512, 256);
  grad.addColorStop(0, '#ff7a2f'); grad.addColorStop(0.55, '#ff3d5a'); grad.addColorStop(1, '#4b236d');
  ctx.fillStyle = grad; ctx.fillRect(0, 0, 512, 256);
  ctx.fillStyle = 'rgba(9,5,18,0.22)'; ctx.fillRect(0, 0, 512, 256);
  ctx.fillStyle = '#fff4df';
  ctx.font = 'italic 900 88px "Arial Narrow", Impact, sans-serif';
  ctx.fillText('SUNSET', 28, 118);
  ctx.font = 'italic 900 74px "Arial Narrow", Impact, sans-serif';
  ctx.fillStyle = '#ffe08a';
  ctx.fillText('99.1 FM', 30, 196);
  ctx.font = '700 18px Inter, sans-serif';
  ctx.fillStyle = 'rgba(255,244,223,0.8)';
  ctx.fillText('THE SOUND OF THE CITY', 34, 228);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createWorld(scene, renderer) {
  const group = new THREE.Group();
  group.name = 'city';
  scene.add(group);

  const colliders = [];
  const buildings = [];
  const traffic = [];
  const peds = [];
  const parkedCars = [];
  const lampPositions = [];
  const palmPositions = [];

  // ocean + ground
  const oceanMat = new THREE.MeshStandardMaterial({ color: 0x173a55, roughness: 0.16, metalness: 0.62 });
  const ocean = new THREE.Mesh(new THREE.PlaneGeometry(1400, 1400), oceanMat);
  ocean.rotation.x = -Math.PI / 2;
  ocean.position.y = -0.65;
  scene.add(ocean);

  const groundMat = new THREE.MeshStandardMaterial({ map: makeGroundTexture(renderer), roughness: 0.94, metalness: 0.02 });
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(WORLD_HALF * 2, WORLD_HALF * 2), groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  const roofMat = new THREE.MeshStandardMaterial({ color: 0x3a3438, roughness: 0.92 });
  const roofDark = new THREE.MeshStandardMaterial({ color: 0x26232b, roughness: 0.95 });
  const facadeMats = facadeSchemes.map((scheme) => {
    const { map, emissive } = makeFacadeTextures(scheme);
    return new THREE.MeshStandardMaterial({
      map, emissiveMap: emissive, emissive: 0xffffff, emissiveIntensity: 0.82,
      roughness: 0.78, metalness: 0.05
    });
  });
  const roofMats = [roofMat, roofMat, roofMat, roofMat, roofMat, roofMat];
  const facadeSets = facadeMats.map((m) => [m, m, roofMat, roofDark, m, m]);

  const signTextures = neonWords.map((word, i) => makeNeonSign(word, neonColors[i % neonColors.length]));
  const billboardTex = makeBillboardTexture();

  function addBuilding(bx, bz, w, d, h, schemeIndex) {
    const geo = new THREE.BoxGeometry(w, h, d);
    scaleBoxUVs(geo, w, h, d);
    const mesh = new THREE.Mesh(geo, facadeSets[schemeIndex]);
    mesh.position.set(bx, h / 2, bz);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
    buildings.push(mesh);
    colliders.push({ minX: bx - w / 2, maxX: bx + w / 2, minZ: bz - d / 2, maxZ: bz + d / 2, h });

    // rooftop details
    const roofY = h + 0.01;
    if (rng() < 0.72) {
      const ac = new THREE.Mesh(new THREE.BoxGeometry(rand(1.1, 2.1), rand(0.5, 1.2), rand(1, 1.8)), roofDark);
      ac.position.set(bx + rand(-w * 0.24, w * 0.24), roofY + 0.4, bz + rand(-d * 0.24, d * 0.24));
      ac.castShadow = true;
      group.add(ac);
    }
    if (rng() < 0.45) {
      const tank = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.7, 1.8, 8), roofMat);
      tank.position.set(bx + rand(-w * 0.25, w * 0.25), roofY + 0.9, bz + rand(-d * 0.25, d * 0.25));
      tank.castShadow = true;
      group.add(tank);
    }
    if (h > 22 && rng() < 0.45) {
      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.08, rand(3, 8), 5), roofDark);
      mast.position.set(bx, roofY + 2.4, bz);
      group.add(mast);
      const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.11, 6, 5), new THREE.MeshBasicMaterial({ color: 0xff3b4c }));
      beacon.position.set(bx, roofY + 5.2, bz);
      group.add(beacon);
    }

    // storefront sign on the face nearest a road
    if (h < 30 && rng() < 0.48) {
      const sign = new THREE.Mesh(new THREE.PlaneGeometry(rand(5, 8), rand(1.25, 1.8)), new THREE.MeshBasicMaterial({
        map: signTextures[Math.floor(rng() * signTextures.length)], transparent: true, toneMapped: false
      }));
      const dirs = [
        { x: 0, z: d / 2 + 0.05, ry: 0 },
        { x: 0, z: -d / 2 - 0.05, ry: Math.PI },
        { x: w / 2 + 0.05, z: 0, ry: Math.PI / 2 },
        { x: -w / 2 - 0.05, z: 0, ry: -Math.PI / 2 }
      ];
      const dir = dirs[Math.floor(rng() * 4)];
      sign.position.set(bx + dir.x, rand(4.5, Math.min(9, h - 2)), bz + dir.z);
      sign.rotation.y = dir.ry;
      group.add(sign);
    }

    // occasional rooftop billboard
    if (h > 14 && h < 34 && rng() < 0.18) {
      const boardMat = new THREE.MeshBasicMaterial({ map: billboardTex, toneMapped: false });
      const board = new THREE.Mesh(new THREE.PlaneGeometry(9, 4.5), boardMat);
      board.position.set(bx, roofY + 4.6, bz);
      board.rotation.x = -0.06;
      group.add(board);
      const boardBack = new THREE.Mesh(new THREE.PlaneGeometry(9, 4.5), boardMat);
      boardBack.position.copy(board.position);
      boardBack.rotation.set(-0.06, Math.PI, 0);
      group.add(boardBack);
      for (const off of [-3.5, 3.5]) {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.12, 4.2, 0.12), roofDark);
        leg.position.set(bx + off, roofY + 2.1, bz);
        group.add(leg);
      }
    }
  }

  function addPark(bx, bz) {
    const grass = new THREE.Mesh(new THREE.PlaneGeometry(19.5, 19.5), new THREE.MeshStandardMaterial({ color: 0x315b43, roughness: 1 }));
    grass.rotation.x = -Math.PI / 2;
    grass.position.set(bx, 0.03, bz);
    grass.receiveShadow = true;
    group.add(grass);
    const pathMat = new THREE.MeshStandardMaterial({ color: 0xb3a38a, roughness: 0.9 });
    const p1 = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 19.5), pathMat);
    p1.rotation.x = -Math.PI / 2; p1.position.set(bx, 0.04, bz); group.add(p1);
    const p2 = new THREE.Mesh(new THREE.PlaneGeometry(19.5, 2.4), pathMat);
    p2.rotation.x = -Math.PI / 2; p2.position.set(bx, 0.041, bz); group.add(p2);
    const fountain = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.5, 0.55, 16), new THREE.MeshStandardMaterial({ color: 0x7c766d, roughness: 0.8 }));
    fountain.position.set(bx, 0.3, bz); group.add(fountain);
    const water = new THREE.Mesh(new THREE.CylinderGeometry(1.75, 1.75, 0.12, 16), new THREE.MeshStandardMaterial({ color: 0x3c7e91, roughness: 0.2, metalness: 0.5 }));
    water.position.set(bx, 0.61, bz); group.add(water);
    palmPositions.push([bx - 6.5, bz - 6.5], [bx + 6.5, bz - 6.5], [bx - 6.5, bz + 6.5], [bx + 6.5, bz + 6.5]);
    for (const [x, z] of [[bx - 4, bz - 7], [bx + 4, bz - 7], [bx - 4, bz + 7], [bx + 4, bz + 7]]) {
      const bench = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.18, 0.6), new THREE.MeshStandardMaterial({ color: 0x634437, roughness: 0.9 }));
      bench.position.set(x, 0.5, z); group.add(bench);
      const back = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.65, 0.12), bench.material);
      back.position.set(x, 0.8, z + 0.3); group.add(back);
    }
  }

  function addParkingLot(bx, bz) {
    const lot = new THREE.Mesh(new THREE.PlaneGeometry(19.5, 19.5), new THREE.MeshStandardMaterial({ color: 0x303138, roughness: 0.95 }));
    lot.rotation.x = -Math.PI / 2; lot.position.set(bx, 0.03, bz); lot.receiveShadow = true; group.add(lot);
    const lineMat = new THREE.MeshBasicMaterial({ color: 0xd5c9ac });
    for (let i = -2; i <= 2; i++) {
      const line = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 5), lineMat);
      line.rotation.x = -Math.PI / 2; line.position.set(bx + i * 3.2, 0.04, bz + 5); group.add(line);
      const line2 = line.clone(); line2.position.z = bz - 5; group.add(line2);
    }
  }

  // Build the city blocks
  let blockIndex = 0;
  for (const bx of BLOCK_CENTERS) {
    for (const bz of BLOCK_CENTERS) {
      blockIndex++;
      const isPark = (bx === -60 && bz === 60) || (bx === 60 && bz === -60);
      const isLot = (bx === 100 && bz === 20) || (bx === -20 && bz === -100);
      if (isPark) { addPark(bx, bz); continue; }
      if (isLot) { addParkingLot(bx, bz); continue; }

      const dist = Math.hypot(bx, bz);
      const center = dist < 65;
      const mid = dist < 115;
      const hMin = center ? 19 : mid ? 10 : 7;
      const hMax = center ? 47 : mid ? 26 : 16;
      const pattern = rng();

      const schemes = [];
      const makeScheme = () => Math.floor(rng() * facadeSchemes.length);

      if (pattern < 0.42) {
        const w = rand(14.5, 18.5), d = rand(13.5, 18.5);
        addBuilding(bx + rand(-1, 1), bz + rand(-1, 1), w, d, rand(hMin, hMax), makeScheme());
      } else if (pattern < 0.72) {
        const gap = 1.2;
        const w1 = rand(7.5, 9.5), w2 = rand(7.5, 9.5);
        const d = rand(14, 18);
        addBuilding(bx - 10 + w1 / 2, bz + rand(-1, 1), w1, d, rand(hMin, hMax * 0.86), makeScheme());
        addBuilding(bx + 10 - w2 / 2, bz + rand(-1, 1), w2, d, rand(hMin * 0.82, hMax), makeScheme());
        void gap;
      } else if (pattern < 0.9) {
        for (const sx of [-1, 1]) {
          for (const sz of [-1, 1]) {
            addBuilding(
              bx + sx * 5.5 + rand(-0.6, 0.6),
              bz + sz * 5.5 + rand(-0.6, 0.6),
              rand(7.2, 8.8), rand(7.2, 8.8),
              rand(hMin, hMax * 0.8), makeScheme()
            );
          }
        }
      } else {
        addBuilding(bx, bz - 4.3, rand(15, 18), rand(7, 9), rand(hMin, hMax * 0.72), makeScheme());
        addBuilding(bx, bz + 5.6, rand(13, 17), rand(5.5, 7.5), rand(hMin * 0.7, hMax * 0.58), makeScheme());
      }
    }
  }

  // Distant skyline ring — simple dark towers catching the last light
  const distantMat = new THREE.MeshStandardMaterial({ color: 0x2e2a42, roughness: 0.9 });
  const distantMat2 = new THREE.MeshStandardMaterial({ color: 0x3d3652, roughness: 0.9 });
  for (let i = 0; i < 34; i++) {
    const angle = (i / 34) * Math.PI * 2 + rand(-0.04, 0.04);
    const radius = rand(148, 168);
    const w = rand(8, 18);
    const h = rand(18, 68);
    const tower = new THREE.Mesh(new THREE.BoxGeometry(w, h, rand(8, 16)), i % 2 ? distantMat : distantMat2);
    tower.position.set(Math.cos(angle) * radius, h / 2, Math.sin(angle) * radius);
    tower.rotation.y = -angle;
    group.add(tower);
  }

  // Street lamps (instanced)
  for (const r of ROADS) {
    for (const along of [-120, -60, 0, 60, 120]) {
      lampPositions.push([r + 8.7, along + 10], [r - 8.7, along - 10]);
      lampPositions.push([along + 10, r + 8.7], [along - 10, r - 8.7]);
    }
  }
  const lampGeo = new THREE.CylinderGeometry(0.055, 0.09, 4.9, 5);
  lampGeo.translate(0, 2.45, 0);
  const lampMesh = new THREE.InstancedMesh(lampGeo, new THREE.MeshStandardMaterial({ color: 0x24242b, roughness: 0.7, metalness: 0.5 }), lampPositions.length);
  const bulbGeo = new THREE.BoxGeometry(0.35, 0.14, 0.35);
  bulbGeo.translate(0, 4.94, 0);
  const bulbMesh = new THREE.InstancedMesh(bulbGeo, new THREE.MeshBasicMaterial({ color: 0xffd89b }), lampPositions.length);
  const poolGeo = new THREE.CircleGeometry(4.4, 14);
  poolGeo.rotateX(-Math.PI / 2);
  const poolMat = new THREE.MeshBasicMaterial({ color: 0xffc97a, transparent: true, opacity: 0.1, blending: THREE.AdditiveBlending, depthWrite: false });
  const pools = new THREE.InstancedMesh(poolGeo, poolMat, lampPositions.length);
  pools.position.y = 0.06;
  const dummy = new THREE.Object3D();
  lampPositions.forEach(([x, z], i) => {
    dummy.position.set(x, 0, z); dummy.rotation.set(0, 0, 0); dummy.updateMatrix();
    lampMesh.setMatrixAt(i, dummy.matrix);
    bulbMesh.setMatrixAt(i, dummy.matrix);
    dummy.position.y = 0.06; dummy.updateMatrix();
    pools.setMatrixAt(i, dummy.matrix);
  });
  lampMesh.castShadow = true;
  group.add(lampMesh, bulbMesh, pools);

  // Palms (instanced trunks + fronds)
  palmPositions.push([-125, -20], [-125, 40], [125, -40], [125, 20], [-20, 125], [40, 125], [20, -125], [-40, -125]);
  for (const bx of BLOCK_CENTERS) {
    if (rng() < 0.34) palmPositions.push([bx + rand(-8, 8), rand(-140, 140)]);
  }
  const trunkGeo = new THREE.CylinderGeometry(0.12, 0.24, 5.4, 6);
  trunkGeo.translate(0, 2.7, 0);
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5e4535, roughness: 0.92 });
  const trunks = new THREE.InstancedMesh(trunkGeo, trunkMat, palmPositions.length);
  trunks.castShadow = true;

  function makeFrondGeometry() {
    const segs = 4;
    const positions = [];
    const indices = [];
    for (let i = 0; i <= segs; i++) {
      const t = i / segs;
      const x = t * 3.5;
      const y = -0.18 * x - 0.055 * x * x;
      const width = 0.55 * (1 - t) + 0.04;
      positions.push(x, y, -width, x, y + 0.05, width);
      if (i < segs) {
        const a = i * 2;
        indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }
  const frondGeo = makeFrondGeometry();
  const frondMat = new THREE.MeshStandardMaterial({ color: 0x2d6b4f, roughness: 0.84, side: THREE.DoubleSide });
  const fronds = new THREE.InstancedMesh(frondGeo, frondMat, palmPositions.length * 7);
  fronds.castShadow = true;
  palmPositions.forEach(([x, z], i) => {
    dummy.position.set(x, 0, z);
    const scale = rand(0.82, 1.16);
    dummy.scale.set(scale, scale, scale);
    dummy.rotation.y = rand(0, Math.PI * 2);
    dummy.updateMatrix();
    trunks.setMatrixAt(i, dummy.matrix);
    for (let f = 0; f < 7; f++) {
      const leaf = new THREE.Object3D();
      leaf.position.set(x, 5.3 * scale, z);
      leaf.rotation.set(0, (f / 7) * Math.PI * 2 + rand(-0.2, 0.2), rand(-0.12, 0.12));
      leaf.scale.setScalar(scale);
      leaf.updateMatrix();
      fronds.setMatrixAt(i * 7 + f, leaf.matrix);
    }
    dummy.scale.set(1, 1, 1);
  });
  group.add(trunks, fronds);

  // A few street props: hydrants, bins, bus stops
  const propMat = new THREE.MeshStandardMaterial({ color: 0x8d342e, roughness: 0.7 });
  const binMat = new THREE.MeshStandardMaterial({ color: 0x2d4a42, roughness: 0.8 });
  for (let i = 0; i < 18; i++) {
    const road = pick(ROADS);
    const along = rand(-130, 130);
    const vertical = rng() > 0.5;
    const x = vertical ? road + rand(7.8, 10) : along;
    const z = vertical ? along : road + rand(7.8, 10);
    if (isBlockedRaw(x, z, 0.6)) continue;
    if (i % 3 === 0) {
      const hydrant = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 0.8, 7), propMat);
      hydrant.position.set(x, 0.4, z); group.add(hydrant);
      const top = new THREE.Mesh(new THREE.SphereGeometry(0.2, 7, 5), propMat);
      top.position.set(x, 0.85, z); group.add(top);
    } else {
      const bin = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.29, 0.95, 8), binMat);
      bin.position.set(x, 0.48, z); group.add(bin);
    }
  }

  function isBlockedRaw(x, z, r = 0.5) {
    if (Math.abs(x) > WORLD_HALF - 2 || Math.abs(z) > WORLD_HALF - 2) return true;
    for (const c of colliders) {
      if (x + r > c.minX && x - r < c.maxX && z + r > c.minZ && z - r < c.maxZ) return true;
    }
    return false;
  }

  // Mission car: iconic orange coupe
  const missionCar = makeCar({ color: 0xff5f1f, type: 'sport', detailed: true, mission: true });
  missionCar.position.set(-5.1, 0, 35);
  missionCar.rotation.y = 0;
  missionCar.userData.heading = 0;
  group.add(missionCar);
  const missionObj = {
    group: missionCar, heading: 0, speed: 0, health: 100, mission: true, color: 0xff5f1f,
    name: 'SUNSET COUPE', detailed: true, driver: null
  };
  parkedCars.push(missionObj);

  // Parked cars around the city
  const carColors = [0x2f8f9b, 0xd3b45e, 0x88465b, 0x475f8f, 0xd6d1c6, 0x7c3d35, 0x3e7455, 0x9a5b9e];
  let parkedCount = 0;
  let attempts = 0;
  while (parkedCount < 11 && attempts < 100) {
    attempts++;
    const road = pick(ROADS);
    const vertical = rng() > 0.5;
    const along = rand(-128, 128);
    if (ROADS.some((r) => Math.abs(along - r) < 10)) continue;
    const lane = rng() > 0.5 ? 5.1 : -5.1;
    const x = vertical ? road + lane : along;
    const z = vertical ? along : road + lane;
    if (isBlockedRaw(x, z, 2)) continue;
    if (Math.hypot(x - missionCar.position.x, z - missionCar.position.z) < 12) continue;
    const suv = rng() < 0.25;
    const car = makeCar({ color: pick(carColors), type: suv ? 'suv' : 'sedan', detailed: false });
    const heading = vertical ? (lane > 0 ? 0 : Math.PI) : (lane > 0 ? -Math.PI / 2 : Math.PI / 2);
    car.position.set(x, 0, z);
    car.rotation.y = heading;
    car.userData.heading = heading;
    group.add(car);
    parkedCars.push({ group: car, heading, speed: 0, health: 100, mission: false, color: 0, name: suv ? 'CITY SUV' : 'CIVILIAN CAR', detailed: false, driver: null });
    parkedCount++;
  }

  // Traffic cars
  const trafficColors = [0xc9b45a, 0x3d6d8f, 0x914c4c, 0x4f7957, 0xb0b0ad, 0x6a4d85, 0x2e7d80];
  for (let i = 0; i < 8; i++) {
    const vertical = i % 2 === 0;
    const road = pick(ROADS);
    const dir = rng() > 0.5 ? 1 : -1;
    const lane = dir > 0 ? -3.2 : 3.2;
    const car = makeCar({ color: trafficColors[i % trafficColors.length], type: i === 6 ? 'suv' : 'sedan', detailed: false });
    const along = rand(-140, 140);
    car.position.set(vertical ? road + lane : along, 0, vertical ? along : road + lane);
    const heading = vertical ? (dir > 0 ? 0 : Math.PI) : (dir > 0 ? Math.PI / 2 : -Math.PI / 2);
    car.rotation.y = heading;
    group.add(car);
    traffic.push({ group: car, vertical, road, lane, dir, along, speed: rand(6, 11), heading });
  }

  // Pedestrians walking block perimeters
  const shirts = [0xcf5b4d, 0x4f7e9c, 0xd7b65f, 0x7d5e9c, 0x4f8662, 0xd6d0c1, 0x3d3d4d, 0xb15f7d, 0xdf8a48];
  const pants = [0x263040, 0x191d27, 0x4e4038, 0x3a3f56, 0x22262b];
  const skins = [0xc78e68, 0x8a5b3d, 0xe0b08b, 0x6d432b, 0xb97e58];
  for (let i = 0; i < 18; i++) {
    const bx = pick(BLOCK_CENTERS);
    const bz = pick(BLOCK_CENTERS);
    if ((bx === -60 && bz === 60) || (bx === 60 && bz === -60)) continue;
    const shirt = pick(shirts);
    const person = makeSimplePerson({ shirt, pants: pick(pants), skin: pick(skins), hat: rng() < 0.3 ? 0x27212a : null });
    const t = rng() * 4;
    const dir = rng() > 0.5 ? 1 : -1;
    group.add(person);
    peds.push({ group: person, bx, bz, t, dir, speed: rand(1.0, 1.8), panic: 0, dead: false, deadTimer: 0, heading: 0 });
  }

  // spawn a couple of pedestrian props in the park
  const parkPed = makeSimplePerson({ shirt: 0xd7b65f, pants: 0x263040, skin: 0xc78e68 });
  parkPed.position.set(-64, 0, 56);
  group.add(parkPed);
  peds.push({ group: parkPed, bx: -60, bz: 60, t: 0.5, dir: 1, speed: 0.8, panic: 0, dead: false, deadTimer: 0, heading: 0 });

  function perimeterPos(bx, bz, t, half = SIDEWALK_HALF) {
    const p = ((t % 4) + 4) % 4;
    if (p < 1) return { x: bx - half + p * 2 * half, z: bz - half, hx: 1, hz: 0 };
    if (p < 2) return { x: bx + half, z: bz - half + (p - 1) * 2 * half, hx: 0, hz: 1 };
    if (p < 3) return { x: bx + half - (p - 2) * 2 * half, z: bz + half, hx: -1, hz: 0 };
    return { x: bx - half, z: bz + half - (p - 3) * 2 * half, hx: 0, hz: -1 };
  }

  function updateTraffic(dt) {
    for (const car of traffic) {
      car.along += car.dir * car.speed * dt;
      if (car.along > 146) car.along = -146;
      if (car.along < -146) car.along = 146;
      if (car.vertical) car.group.position.set(car.road + car.lane, 0, car.along);
      else car.group.position.set(car.along, 0, car.road + car.lane);
      car.group.rotation.y = car.heading;
      // subtle suspension bob
      car.group.position.y = Math.sin(car.along * 0.45) * 0.012;
    }
  }

  function updatePeds(dt, playerPos, panic) {
    for (const ped of peds) {
      if (ped.dead) {
        ped.deadTimer += dt;
        continue;
      }
      if (panic > 0) ped.panic = Math.max(ped.panic, panic);
      if (ped.panic > 0) ped.panic -= dt;
      const panicNow = ped.panic > 0;
      ped.t += ped.dir * ped.speed * (panicNow ? 2.6 : 1) * dt / SIDEWALK_HALF * 0.5;
      const pos = perimeterPos(ped.bx, ped.bz, ped.t);
      ped.group.position.set(pos.x, 0, pos.z);
      const targetHeading = Math.atan2(pos.hx * ped.dir, pos.hz * ped.dir);
      ped.heading = targetHeading;
      ped.group.rotation.y = targetHeading;
      const bob = Math.abs(Math.sin(performance.now() * 0.009 * (panicNow ? 1.8 : 1) + ped.group.userData.bob)) * (panicNow ? 0.1 : 0.055);
      ped.group.position.y = bob;
      ped.group.rotation.z = Math.sin(performance.now() * 0.009 + ped.group.userData.bob) * 0.025;
    }
  }

  function update(dt, playerPos, panic = 0) {
    updateTraffic(dt);
    updatePeds(dt, playerPos, panic);
  }

  function isBlocked(x, z, r = 0.5) { return isBlockedRaw(x, z, r); }

  function carBlocked(x, z, heading, halfWidth = 1.05, halfLength = 2.15) {
    const cos = Math.cos(heading), sin = Math.sin(heading);
    const pts = [
      [0, 0], [halfLength, 0], [-halfLength, 0],
      [halfLength, halfWidth], [halfLength, -halfWidth], [-halfLength, halfWidth], [-halfLength, -halfWidth]
    ];
    for (const [lz, lx] of pts) {
      const px = x + lx * cos + lz * sin;
      const pz = z - lx * sin + lz * cos;
      if (isBlockedRaw(px, pz, 0.12)) return true;
    }
    return false;
  }

  function districtAt(x, z) {
    if (x > 72) return 'SUNSET BEACH';
    if (x < -72) return 'WESTSIDE DOCKS';
    if (z < -72) return 'NORTH POINT';
    if (z > 72) return 'SOUTH YARD';
    return 'DOWNTOWN';
  }

  function randomSpawnNear(pos, min = 28, max = 62) {
    for (let i = 0; i < 30; i++) {
      const angle = rand(0, Math.PI * 2);
      const radius = rand(min, max);
      const x = pos.x + Math.cos(angle) * radius;
      const z = pos.z + Math.sin(angle) * radius;
      if (Math.abs(x) < 138 && Math.abs(z) < 138 && !isBlockedRaw(x, z, 0.8)) return new THREE.Vector3(x, 0, z);
    }
    return new THREE.Vector3(0, 0, 30);
  }

  function roadPoint(ix, iz) {
    return new THREE.Vector3(ROADS[((ix % 7) + 7) % 7], 0, ROADS[((iz % 7) + 7) % 7]);
  }

  return {
    group, colliders, buildings, traffic, peds, parkedCars, missionCar: missionObj,
    update, isBlocked, carBlocked, districtAt, randomSpawnNear, roadPoint,
    isBlockedRaw, perimeterPos, lampPositions, palmPositions
  };
}
