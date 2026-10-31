// The arena: geometry, lighting, collision boxes, spawn pads, skyline.
import * as THREE from 'three';
import { makeCanvasTexture, glowSprite, rand, TAU, rayAABB } from './utils.js';

const NEON_CYAN = 0x48f5ff;
const NEON_PINK = 0xff2d78;
const NEON_AMBER = 0xffcf5c;

function floorTexture() {
  return makeCanvasTexture(512, 512, (ctx, w, h) => {
    ctx.fillStyle = '#151b24';
    ctx.fillRect(0, 0, w, h);

    // panel variation
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        const shade = 18 + Math.floor(Math.random() * 8);
        ctx.fillStyle = `rgb(${shade},${shade + 4},${shade + 10})`;
        ctx.fillRect(x * 128 + 2, y * 128 + 2, 124, 124);
        ctx.strokeStyle = 'rgba(0,0,0,0.45)';
        ctx.lineWidth = 2;
        ctx.strokeRect(x * 128 + 2, y * 128 + 2, 124, 124);
        // rivets
        ctx.fillStyle = 'rgba(160,190,210,0.14)';
        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          ctx.arc(x * 128 + 12 + (i % 2) * 104, y * 128 + 12 + Math.floor(i / 2) * 104, 1.6, 0, TAU);
          ctx.fill();
        }
      }
    }

    // grime streaks
    for (let i = 0; i < 90; i++) {
      ctx.strokeStyle = `rgba(0,0,0,${rand(0.18, 0.03)})`;
      ctx.lineWidth = rand(2, 0.4);
      const x = rand(w);
      const y = rand(h);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + rand(22, -22), y + rand(40, 4));
      ctx.stroke();
    }

    // cyan tech grid
    ctx.strokeStyle = 'rgba(72,245,255,0.36)';
    ctx.lineWidth = 2;
    for (let i = 0; i <= 4; i++) {
      ctx.beginPath();
      ctx.moveTo(i * 128, 0);
      ctx.lineTo(i * 128, h);
      ctx.moveTo(0, i * 128);
      ctx.lineTo(w, i * 128);
      ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(72,245,255,0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 8; i++) {
      ctx.beginPath();
      ctx.moveTo(i * 64, 0);
      ctx.lineTo(i * 64, h);
      ctx.moveTo(0, i * 64);
      ctx.lineTo(w, i * 64);
      ctx.stroke();
    }
    // hazard notch
    ctx.fillStyle = 'rgba(255,45,120,0.28)';
    ctx.fillRect(0, 254, 46, 4);
    ctx.fillRect(466, 254, 46, 4);
  });
}

function floorEmissiveTexture() {
  return makeCanvasTexture(256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(72,245,255,0.55)';
    ctx.lineWidth = 2;
    for (let i = 0; i <= 2; i++) {
      ctx.beginPath();
      ctx.moveTo(i * 128, 0);
      ctx.lineTo(i * 128, h);
      ctx.moveTo(0, i * 128);
      ctx.lineTo(w, i * 128);
      ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(255,45,120,0.25)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(64, 0);
    ctx.lineTo(64, h);
    ctx.stroke();
  });
}

function wallTexture() {
  return makeCanvasTexture(256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#1a2532';
    ctx.fillRect(0, 0, w, h);
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 2; x++) {
        const g = 27 + Math.floor(Math.random() * 7);
        ctx.fillStyle = `rgb(${g},${g + 3},${g + 8})`;
        ctx.fillRect(x * 128 + 3, y * 64 + 3, 122, 58);
        ctx.strokeStyle = 'rgba(90,140,170,0.14)';
        ctx.lineWidth = 1;
        ctx.strokeRect(x * 128 + 3, y * 64 + 3, 122, 58);
      }
    }
    ctx.fillStyle = 'rgba(72,245,255,0.2)';
    ctx.fillRect(0, 124, w, 2);
    // vents
    for (let i = 0; i < 5; i++) {
      ctx.fillStyle = 'rgba(0,0,0,0.35)';
      ctx.fillRect(28 + i * 9, 30, 4, 14);
    }
    // warning label
    ctx.save();
    ctx.translate(198, 208);
    ctx.fillStyle = 'rgba(255,207,92,0.5)';
    ctx.fillRect(0, 0, 30, 2);
    ctx.fillRect(0, 4, 20, 2);
    ctx.restore();
    // rust streaks
    for (let i = 0; i < 18; i++) {
      ctx.strokeStyle = `rgba(0,0,0,${rand(0.25, 0.08)})`;
      ctx.beginPath();
      ctx.moveTo(rand(w), rand(80));
      ctx.lineTo(rand(w), rand(h));
      ctx.stroke();
    }
  });
}

function beamTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 16;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  const g = ctx.createLinearGradient(0, 128, 0, 0);
  g.addColorStop(0, 'rgba(255,255,255,0.65)');
  g.addColorStop(0.35, 'rgba(255,255,255,0.22)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 16, 128);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function bannerTexture(title, sub, color = '#48f5ff') {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 512, 128);
  ctx.fillStyle = 'rgba(4,10,18,0.85)';
  ctx.fillRect(0, 24, 512, 80);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 24, 512, 80);
  ctx.globalAlpha = 0.4;
  ctx.fillStyle = color;
  ctx.fillRect(14, 24, 4, 80);
  ctx.globalAlpha = 1;
  ctx.font = '700 30px "Arial Narrow", Arial, sans-serif';
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.fillText(title, 256, 62);
  ctx.font = '13px monospace';
  ctx.fillStyle = 'rgba(180,220,240,0.7)';
  ctx.fillText(sub, 256, 88);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function padDecalTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 256, 256);
  ctx.translate(128, 128);
  ctx.strokeStyle = 'rgba(72,245,255,0.85)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, 108, 0, TAU);
  ctx.stroke();
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(0, 0, 92, 0, TAU);
  ctx.stroke();
  ctx.setLineDash([10, 8]);
  ctx.beginPath();
  ctx.arc(0, 0, 76, 0, TAU);
  ctx.stroke();
  ctx.setLineDash([]);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * TAU;
    ctx.save();
    ctx.rotate(a);
    ctx.fillStyle = 'rgba(72,245,255,0.8)';
    ctx.fillRect(56, -2, 22, 4);
    ctx.restore();
  }
  ctx.fillStyle = 'rgba(255,45,120,0.8)';
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, TAU);
  ctx.fill();
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function platformDecalTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 512;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 512, 512);
  ctx.translate(256, 256);
  ctx.strokeStyle = 'rgba(255,45,120,0.6)';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(0, 0, 196, 0, TAU);
  ctx.stroke();
  ctx.strokeStyle = 'rgba(72,245,255,0.4)';
  ctx.lineWidth = 2;
  ctx.setLineDash([26, 14]);
  ctx.beginPath();
  ctx.arc(0, 0, 160, 0, TAU);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.font = '900 220px "Arial Narrow", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(255,45,120,0.28)';
  ctx.fillText('07', 0, 78);
  ctx.font = '700 22px monospace';
  ctx.fillStyle = 'rgba(72,245,255,0.5)';
  ctx.fillText('COMBAT  ZONE', 0, 150);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export class World {
  constructor(scene, renderer) {
    this.scene = scene;
    this.renderer = renderer;
    this.colliders = [];
    this.spawnPads = [];
    this.dynamic = [];
    this.halfSize = 30;
    this.spawnRadius = 23;

    this._buildMaterials();
    this._buildSky();
    this._buildFloor();
    this._buildWalls();
    this._buildCenterpiece();
    this._buildCover();
    this._buildSpawnPads();
    this._buildBanners();
    this._buildSkyline();
    this._buildLights();
    this._buildDust();
  }

  _buildMaterials() {
    const floorMap = floorTexture();
    floorMap.wrapS = floorMap.wrapT = THREE.RepeatWrapping;
    floorMap.repeat.set(8, 8);
    const floorGlow = floorEmissiveTexture();
    floorGlow.wrapS = floorGlow.wrapT = THREE.RepeatWrapping;
    floorGlow.repeat.set(8, 8);

    const wallMap = wallTexture();
    wallMap.wrapS = wallMap.wrapT = THREE.RepeatWrapping;
    wallMap.repeat.set(8, 2);

    this.mats = {
      floor: new THREE.MeshStandardMaterial({
        map: floorMap,
        emissiveMap: floorGlow,
        emissive: 0xffffff,
        emissiveIntensity: 0.5,
        roughness: 0.66,
        metalness: 0.42,
      }),
      wall: new THREE.MeshStandardMaterial({
        map: wallMap,
        roughness: 0.8,
        metalness: 0.3,
        color: 0xffffff,
      }),
      wallDark: new THREE.MeshStandardMaterial({ color: 0x0a111c, roughness: 0.9, metalness: 0.2 }),
      metal: new THREE.MeshStandardMaterial({ color: 0x3a4a58, roughness: 0.48, metalness: 0.72 }),
      metalDark: new THREE.MeshStandardMaterial({ color: 0x1e2a36, roughness: 0.58, metalness: 0.62 }),
      crate: new THREE.MeshStandardMaterial({ color: 0x33465a, roughness: 0.5, metalness: 0.55 }),
      crateAlt: new THREE.MeshStandardMaterial({ color: 0x3a3546, roughness: 0.55, metalness: 0.5 }),
      barrel: new THREE.MeshStandardMaterial({ color: 0x8a3b1e, roughness: 0.48, metalness: 0.6, emissive: 0x2a0c02, emissiveIntensity: 0.6 }),
      cyan: new THREE.MeshStandardMaterial({ color: 0x063039, emissive: NEON_CYAN, emissiveIntensity: 1.9, roughness: 0.3, metalness: 0.3 }),
      pink: new THREE.MeshStandardMaterial({ color: 0x2a0614, emissive: NEON_PINK, emissiveIntensity: 1.8, roughness: 0.3, metalness: 0.3 }),
      amber: new THREE.MeshStandardMaterial({ color: 0x332206, emissive: NEON_AMBER, emissiveIntensity: 1.3, roughness: 0.35, metalness: 0.3 }),
      edgeCyan: new THREE.LineBasicMaterial({ color: NEON_CYAN, transparent: true, opacity: 0.3 }),
      edgePink: new THREE.LineBasicMaterial({ color: NEON_PINK, transparent: true, opacity: 0.3 }),
      edgeAmber: new THREE.LineBasicMaterial({ color: NEON_AMBER, transparent: true, opacity: 0.25 }),
      pad: new THREE.MeshBasicMaterial({
        map: padDecalTexture(),
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: 0.8,
        side: THREE.DoubleSide,
      }),
      beam: new THREE.MeshBasicMaterial({
        map: beamTexture(),
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: 0.35,
        side: THREE.DoubleSide,
      }),
      decal: new THREE.MeshBasicMaterial({
        map: platformDecalTexture(),
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: 0.9,
      }),
    };

    this.geoBox = new THREE.BoxGeometry(1, 1, 1);
  }

  _addCollider(minX, maxX, minY, maxY, minZ, maxZ) {
    const c = { minX, maxX, minY, maxY, minZ, maxZ };
    this.colliders.push(c);
    return c;
  }

  /** Box helper: unit cube scaled; adds a collider unless disabled. */
  _box(w, h, d, x, y, z, mat, { solid = true, edge = null, rotY = 0 } = {}) {
    const mesh = new THREE.Mesh(this.geoBox, mat);
    mesh.scale.set(w, h, d);
    mesh.position.set(x, y, z);
    mesh.rotation.y = rotY;
    if (edge) {
      const geo = new THREE.EdgesGeometry(this.geoBox);
      const lines = new THREE.LineSegments(geo, edge);
      lines.scale.set(1.002, 1.002, 1.002);
      mesh.add(lines);
    }
    this.scene.add(mesh);
    if (solid) {
      this._addCollider(x - w / 2, x + w / 2, y - h / 2, y + h / 2, z - d / 2, z + d / 2);
    }
    return mesh;
  }

  _buildFloor() {
    const geo = new THREE.PlaneGeometry(64, 64, 1, 1);
    const floor = new THREE.Mesh(geo, this.mats.floor);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = false;
    this.scene.add(floor);

    // outer safety strip
    const stripGeo = new THREE.BoxGeometry(61, 0.06, 0.14);
    for (const z of [-29.5, 29.5]) {
      const s = new THREE.Mesh(stripGeo, this.mats.cyan);
      s.position.set(0, 0.05, z);
      this.scene.add(s);
    }
    const stripGeoZ = new THREE.BoxGeometry(0.14, 0.06, 61);
    for (const x of [-29.5, 29.5]) {
      const s = new THREE.Mesh(stripGeoZ, this.mats.cyan);
      s.position.set(x, 0.05, 0);
      this.scene.add(s);
    }
  }

  _buildWalls() {
    const H = 9;
    // collision walls are 2 units thick, sitting just outside the playable floor
    this._box(64, H, 2, 0, H / 2, -31, this.mats.wall, { edge: this.mats.edgeCyan });
    this._box(64, H, 2, 0, H / 2, 31, this.mats.wall, { edge: this.mats.edgeCyan });
    this._box(2, H, 64, -31, H / 2, 0, this.mats.wall, { edge: this.mats.edgeCyan });
    this._box(2, H, 64, 31, H / 2, 0, this.mats.wall, { edge: this.mats.edgeCyan });

    // neon trim
    const trimLong = new THREE.BoxGeometry(58, 0.14, 0.1);
    const trimShort = new THREE.BoxGeometry(0.1, 0.14, 58);
    for (const z of [-29.94, 29.94]) {
      const s = new THREE.Mesh(trimLong, this.mats.cyan);
      s.position.set(0, 7.9, z);
      this.scene.add(s);
      const low = new THREE.Mesh(trimLong, this.mats.pink);
      low.position.set(0, 0.4, z);
      this.scene.add(low);
    }
    for (const x of [-29.94, 29.94]) {
      const s = new THREE.Mesh(trimShort, this.mats.cyan);
      s.position.set(x, 7.9, 0);
      this.scene.add(s);
      const low = new THREE.Mesh(trimShort, this.mats.pink);
      low.position.set(x, 0.4, 0);
      this.scene.add(low);
    }

    // vertical ribs on the long walls
    for (let i = -3; i <= 3; i++) {
      for (const z of [-29.9, 29.9]) {
        const rib = new THREE.Mesh(new THREE.BoxGeometry(0.12, 7.6, 0.12), this.mats.metalDark);
        rib.position.set(i * 8, 3.8, z);
        this.scene.add(rib);
      }
    }

    // corner towers
    for (const x of [-1, 1]) {
      for (const z of [-1, 1]) {
        const tower = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 2.1, 11, 6), this.mats.wallDark);
        tower.position.set(x * 30, 5.5, z * 30);
        this.scene.add(tower);
        const glow = glowSprite(NEON_PINK, 5, 0.55);
        glow.position.set(x * 30, 10.5, z * 30);
        this.scene.add(glow);
      }
    }
  }

  _buildCenterpiece() {
    const H = 1.8;
    // platform body
    this._box(11, H, 11, 0, H / 2, 0, this.mats.metal, { edge: this.mats.edgeCyan });
    // rim light
    const rimGeoX = new THREE.BoxGeometry(11.2, 0.08, 0.12);
    const rimGeoZ = new THREE.BoxGeometry(0.12, 0.08, 11.2);
    for (const z of [-5.55, 5.55]) {
      const r = new THREE.Mesh(rimGeoX, this.mats.cyan);
      r.position.set(0, H + 0.02, z);
      this.scene.add(r);
    }
    for (const x of [-5.55, 5.55]) {
      const r = new THREE.Mesh(rimGeoZ, this.mats.cyan);
      r.position.set(x, H + 0.02, 0);
      this.scene.add(r);
    }

    // decal on top
    const decal = new THREE.Mesh(new THREE.PlaneGeometry(9.6, 9.6), this.mats.decal);
    decal.rotation.x = -Math.PI / 2;
    decal.position.y = H + 0.012;
    this.scene.add(decal);

    // stairs on four sides (two low steps + platform edge)
    const stepMat = this.mats.metalDark;
    const glowMat = this.mats.cyan;
    const makeStairs = (side) => {
      // side: 0 = +z, 1 = -z, 2 = +x, 3 = -x
      const sign = side === 0 ? 1 : side === 1 ? -1 : 1;
      const axis = side < 2 ? 'z' : 'x';
      for (let i = 0; i < 2; i++) {
        const dist = 5.5 + 0.95 + 1.9 * (1 - i); // steps butt against the platform
        const height = i === 0 ? 1.2 : 0.6;
        const depth = 1.9;
        if (axis === 'z') {
          this._box(8, height, depth, 0, height / 2, sign * dist, stepMat, { edge: this.mats.edgeCyan });
          const line = new THREE.Mesh(new THREE.BoxGeometry(8, 0.04, 0.08), glowMat);
          line.position.set(0, height + 0.03, sign * (dist + depth / 2 - 0.02));
          this.scene.add(line);
        } else {
          this._box(depth, height, 8, sign * dist, height / 2, 0, stepMat, { edge: this.mats.edgeCyan });
          const line = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.04, 8), glowMat);
          line.position.set(sign * (dist + depth / 2 - 0.02), height + 0.03, 0);
          this.scene.add(line);
        }
      }
    };
    makeStairs(0);
    makeStairs(1);
    makeStairs(2);
    makeStairs(3);

    // central holo emitter
    const pylon = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.5, 0.7, 6), this.mats.metalDark);
    pylon.position.set(0, H + 0.35, 0);
    this.scene.add(pylon);
    const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.5, 0), this.mats.pink);
    gem.position.set(0, H + 1.1, 0);
    this.scene.add(gem);
    const halo = glowSprite(NEON_PINK, 3.4, 0.5);
    halo.position.set(0, H + 1.1, 0);
    this.scene.add(halo);
    this.dynamic.push((t) => {
      gem.rotation.y = t * 0.8;
      gem.position.y = H + 1.1 + Math.sin(t * 1.4) * 0.08;
      halo.material.opacity = 0.38 + Math.sin(t * 2.2) * 0.1;
    });

    // light column over the platform
    const column = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.2, 14, 20, 1, true), this.mats.beam);
    column.position.set(0, 9, 0);
    column.material = this.mats.beam.clone();
    column.material.opacity = 0.06;
    this.scene.add(column);
  }

  _crate(x, z, size, height, mat) {
    const mesh = this._box(size, height, size, x, height / 2, z, mat, { edge: this.mats.edgeCyan });
    // top insert
    const top = new THREE.Mesh(this.geoBox, this.mats.metalDark);
    top.scale.set(size * 0.72, 0.09, size * 0.72);
    top.position.set(x, height + 0.03, z);
    this.scene.add(top);
    const led = new THREE.Mesh(this.geoBox, this.mats.amber);
    led.scale.set(size * 0.16, 0.1, 0.05);
    led.position.set(x, height * 0.62, z + size / 2 + 0.015);
    this.scene.add(led);
    return mesh;
  }

  _pillar(x, z) {
    const h = 6.4;
    this._box(1.7, h, 1.7, x, h / 2, z, this.mats.metalDark, { edge: this.mats.edgePink });
    const cap = new THREE.Mesh(this.geoBox, this.mats.pink);
    cap.scale.set(1.9, 0.12, 1.9);
    cap.position.set(x, h + 0.04, z);
    this.scene.add(cap);
    // vertical light strips
    for (const [dx, dz] of [[0.87, 0], [-0.87, 0], [0, 0.87], [0, -0.87]]) {
      const strip = new THREE.Mesh(this.geoBox, this.mats.cyan);
      strip.scale.set(dx ? 0.05 : 0.16, 4.2, dz ? 0.05 : 0.16);
      strip.position.set(x + dx, 2.4, z + dz);
      this.scene.add(strip);
    }
    const glow = glowSprite(NEON_PINK, 4.5, 0.4);
    glow.position.set(x, h + 0.4, z);
    this.scene.add(glow);
  }

  _barrel(x, z) {
    const group = new THREE.Group();
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.56, 1.5, 12), this.mats.barrel);
    body.position.y = 0.75;
    group.add(body);
    for (const y of [0.38, 1.12]) {
      const band = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.045, 5, 16), this.mats.amber);
      band.rotation.x = Math.PI / 2;
      band.position.y = y;
      group.add(band);
    }
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.08, 12), this.mats.metalDark);
    cap.position.y = 1.53;
    group.add(cap);
    group.position.set(x, 0, z);
    this.scene.add(group);
    this._addCollider(x - 0.55, x + 0.55, 0, 1.55, z - 0.55, z + 0.55);
    return group;
  }

  _buildCover() {
    // diagonal crate stacks
    for (const [x, z] of [
      [12, 12],
      [-12, -12],
      [12, -12],
      [-12, 12],
    ]) {
      this._crate(x, z, 3.1, 2.7, this.mats.crate);
      const small = new THREE.Mesh(this.geoBox, this.mats.crateAlt);
      small.scale.set(1.5, 1.2, 1.5);
      small.position.set(x + 1.4, 0.6, z - 1.0);
      this.scene.add(small);
      this._addCollider(x + 0.65, x + 2.15, 0, 1.2, z - 1.75, z - 0.25);
    }

    // mid-ring cover crates
    for (const [x, z, s] of [
      [15.5, -4.5, 2.3],
      [-15.5, 4.5, 2.3],
      [4.5, 15.5, 2.3],
      [-4.5, -15.5, 2.3],
    ]) {
      this._crate(x, z, s, 2.1, this.mats.crateAlt);
    }

    // low barriers
    const barriers = [
      [24, -8, 1.2, 6],
      [-24, 8, 1.2, 6],
      [8, 24, 6, 1.2],
      [-8, -24, 6, 1.2],
      [-24, -8, 1.2, 5],
      [24, 8, 1.2, 5],
      [8, -24, 5, 1.2],
      [-8, 24, 5, 1.2],
    ];
    for (const [x, z, w, d] of barriers) {
      this._box(w, 1.15, d, x, 0.575, z, this.mats.metal, { edge: this.mats.edgeAmber });
      const stripe = new THREE.Mesh(this.geoBox, this.mats.amber);
      stripe.scale.set(w > d ? w * 0.7 : 0.08, 0.1, d > w ? d * 0.7 : 0.08);
      stripe.position.set(x, 1.16, z);
      this.scene.add(stripe);
    }

    // corner pillars
    for (const x of [-21, 21]) {
      for (const z of [-21, 21]) this._pillar(x, z);
    }

    // barrels
    for (const [x, z] of [
      [7.8, 18.6],
      [-7.8, -18.6],
      [18.6, -7.8],
      [-18.6, 7.8],
      [-19.5, -14],
      [19.5, 14],
    ]) {
      this._barrel(x, z);
    }

    // a couple of stacked crate staircases near the edges
    for (const [x, z, flip] of [
      [-18, 4, 1],
      [18, -4, -1],
    ]) {
      this._crate(x, z, 2, 0.8, this.mats.crate);
      this._crate(x + 2.4 * flip, z, 2, 1.6, this.mats.crate);
      this._crate(x + 4.8 * flip, z, 2, 2.4, this.mats.crate);
    }
  }

  _buildSpawnPads() {
    const beamGeo = new THREE.CylinderGeometry(0.16, 1.45, 4.4, 16, 1, true);
    const ringGeo = new THREE.RingGeometry(1.55, 1.75, 40);
    const angles = [];
    for (let i = 0; i < 8; i++) angles.push((i / 8) * Math.PI * 2 + Math.PI / 8);

    for (const a of angles) {
      const x = Math.cos(a) * this.spawnRadius;
      const z = Math.sin(a) * this.spawnRadius;

      const decal = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), this.mats.pad);
      decal.rotation.x = -Math.PI / 2;
      decal.position.set(x, 0.03, z);
      this.scene.add(decal);

      const beam = new THREE.Mesh(beamGeo, this.mats.beam.clone());
      beam.position.set(x, 2.2, z);
      beam.material.opacity = 0.18;
      this.scene.add(beam);

      const ring = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({
        color: NEON_PINK,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      }));
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(x, 0.05, z);
      this.scene.add(ring);

      const glow = glowSprite(NEON_CYAN, 2.4, 0.28);
      glow.position.set(x, 0.4, z);
      this.scene.add(glow);

      this.spawnPads.push({ x, z, beam, decal, ring, glow, phase: Math.random() * TAU });
    }
  }

  _buildBanners() {
    const bannerA = bannerTexture('SECTOR 07 // COMBAT ZONE', 'LIVE FEED  ·  NO EXIT  ·  NO MERCY', '#48f5ff');
    const matA = new THREE.MeshBasicMaterial({ map: bannerA, transparent: true, opacity: 0.85, side: THREE.DoubleSide });
    const a = new THREE.Mesh(new THREE.PlaneGeometry(14, 3.5), matA);
    a.position.set(-11, 5.6, -29.85);
    this.scene.add(a);

    const bannerB = bannerTexture('WARDEN PROTOCOL', 'THREAT LEVEL: EXTREME', '#ff2d78');
    const matB = new THREE.MeshBasicMaterial({ map: bannerB, transparent: true, opacity: 0.8, side: THREE.DoubleSide });
    const b = new THREE.Mesh(new THREE.PlaneGeometry(12, 3), matB);
    b.position.set(12, 5.4, 29.85);
    b.rotation.y = Math.PI;
    this.scene.add(b);

    this.dynamic.push((t) => {
      matA.opacity = 0.78 + Math.sin(t * 7.3) * 0.05 + Math.sin(t * 1.7) * 0.02;
      matB.opacity = 0.74 + Math.sin(t * 5.1) * 0.05;
    });
  }

  _buildSky() {
    const skyGeo = new THREE.SphereGeometry(380, 32, 20);
    const skyMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
      uniforms: {
        topColor: { value: new THREE.Color(0x02040a) },
        horizonColor: { value: new THREE.Color(0x0d1d33) },
        lowColor: { value: new THREE.Color(0x1a0b22) },
        glowColor: { value: new THREE.Color(0x2a1240) },
      },
      vertexShader: /* glsl */ `
        varying vec3 vDir;
        void main() {
          vDir = normalize(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 topColor;
        uniform vec3 horizonColor;
        uniform vec3 lowColor;
        uniform vec3 glowColor;
        varying vec3 vDir;
        void main() {
          float y = vDir.y;
          vec3 col = mix(lowColor, horizonColor, smoothstep(-0.35, 0.08, y));
          col = mix(col, topColor, smoothstep(0.02, 0.7, y));
          float sideGlow = pow(max(0.0, dot(normalize(vec3(vDir.x, 0.0, vDir.z)), normalize(vec3(0.7, 0.0, -0.7)))), 5.0);
          col += glowColor * sideGlow * 0.6 * smoothstep(0.25, -0.1, y);
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });
    const sky = new THREE.Mesh(skyGeo, skyMat);
    sky.frustumCulled = false;
    sky.renderOrder = -10;
    this.scene.add(sky);

    // stars
    const starCount = 420;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const theta = rand(Math.PI * 2);
      const phi = Math.acos(rand(1, 0.08));
      const r = 340;
      positions[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
      positions[i * 3 + 1] = Math.cos(phi) * r;
      positions[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * r;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const stars = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({
        color: 0xbfe9ff,
        size: 1.3,
        sizeAttenuation: false,
        transparent: true,
        opacity: 0.75,
        depthWrite: false,
        fog: false,
      })
    );
    stars.frustumCulled = false;
    this.scene.add(stars);

    // distant planet + ring
    const planet = new THREE.Mesh(
      new THREE.SphereGeometry(34, 32, 20),
      new THREE.MeshBasicMaterial({ color: 0x2b1438, fog: false })
    );
    planet.position.set(-120, 86, -190);
    this.scene.add(planet);
    const planetGlow = glowSprite(0x8c3dff, 150, 0.32);
    planetGlow.position.copy(planet.position);
    planetGlow.material.fog = false;
    this.scene.add(planetGlow);
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(46, 62, 64),
      new THREE.MeshBasicMaterial({
        color: 0x7a5cff,
        transparent: true,
        opacity: 0.22,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        fog: false,
      })
    );
    ring.position.copy(planet.position);
    ring.rotation.set(0.9, -0.3, 0.5);
    this.scene.add(ring);

    // haze glow at horizon
    const horizonGlow = glowSprite(0xff2d78, 220, 0.12);
    horizonGlow.position.set(90, 12, -260);
    horizonGlow.material.fog = false;
    this.scene.add(horizonGlow);
  }

  _buildSkyline() {
    const winTex = makeCanvasTexture(64, 128, (ctx, w, h) => {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, w, h);
      for (let y = 6; y < h - 6; y += 8) {
        for (let x = 5; x < w - 5; x += 9) {
          if (Math.random() < 0.28) {
            ctx.fillStyle = Math.random() < 0.2 ? 'rgba(255,207,92,0.9)' : 'rgba(72,245,255,0.75)';
            ctx.fillRect(x, y, 4, 3);
          }
        }
      }
    });
    winTex.wrapS = winTex.wrapT = THREE.RepeatWrapping;

    const mats = [
      new THREE.MeshStandardMaterial({
        color: 0x04080f,
        roughness: 0.9,
        metalness: 0.3,
        emissive: 0xffffff,
        emissiveMap: winTex,
        emissiveIntensity: 0.9,
      }),
      new THREE.MeshStandardMaterial({
        color: 0x060a12,
        roughness: 0.9,
        metalness: 0.3,
        emissive: 0xff77aa,
        emissiveMap: winTex,
        emissiveIntensity: 0.35,
      }),
    ];

    for (let i = 0; i < 30; i++) {
      const a = (i / 30) * Math.PI * 2 + rand(0.12, -0.12);
      const dist = rand(135, 60);
      const width = rand(4, 13);
      const height = rand(10, 52);
      const depth = rand(4, 13);
      const mat = mats[i % 2];
      const b = new THREE.Mesh(this.geoBox, mat);
      b.scale.set(width, height, depth);
      b.position.set(Math.cos(a) * dist, height / 2 - 1, Math.sin(a) * dist);
      b.rotation.y = rand(Math.PI);
      this.scene.add(b);

      if (height > 26) {
        const beacon = glowSprite(i % 3 === 0 ? NEON_PINK : NEON_CYAN, 5, 0.4);
        beacon.position.set(b.position.x, height + 1, b.position.z);
        this.scene.add(beacon);
      }
    }

    // distant bridge / arch silhouette
    const archMat = new THREE.MeshStandardMaterial({ color: 0x060b12, roughness: 0.9 });
    const arch = new THREE.Mesh(new THREE.TorusGeometry(48, 1.1, 6, 40, Math.PI), archMat);
    arch.position.set(0, 0, -150);
    arch.rotation.z = 0;
    this.scene.add(arch);
  }

  _buildLights() {
    const hemi = new THREE.HemisphereLight(0x9adcff, 0x241430, 3.0);
    this.scene.add(hemi);

    const key = new THREE.DirectionalLight(0xffe4c4, 3.8);
    key.position.set(24, 34, 18);
    this.scene.add(key);

    const rim = new THREE.DirectionalLight(0x5f8cff, 2.2);
    rim.position.set(-26, 18, -28);
    this.scene.add(rim);

    const center = new THREE.PointLight(NEON_CYAN, 160, 38, 2);
    center.position.set(0, 7.5, 0);
    this.scene.add(center);
    this.dynamic.push((t) => {
      center.intensity = 150 + Math.sin(t * 2.4) * 18;
    });

    const pinkA = new THREE.PointLight(NEON_PINK, 120, 30, 2);
    pinkA.position.set(-20, 5, 20);
    this.scene.add(pinkA);

    const pinkB = new THREE.PointLight(NEON_PINK, 120, 30, 2);
    pinkB.position.set(20, 5, -20);
    this.scene.add(pinkB);

    this.scene.fog = new THREE.Fog(0x060a12, 42, 210);
  }

  _buildDust() {
    const count = 180;
    const pos = new Float32Array(count * 3);
    this.dustSeed = [];
    for (let i = 0; i < count; i++) {
      const x = rand(29, -29);
      const y = rand(8, 0.3);
      const z = rand(29, -29);
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      this.dustSeed.push({ y, speed: rand(0.12, 0.03), phase: rand(TAU), x, z });
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
      color: 0x8fe8ff,
      size: 0.055,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      fog: true,
    });
    this.dust = new THREE.Points(geo, mat);
    this.dust.frustumCulled = false;
    this.scene.add(this.dust);
  }

  update(dt, t) {
    for (const fn of this.dynamic) fn(t, dt);

    for (const pad of this.spawnPads) {
      pad.ring.rotation.z = t * 0.25 + pad.phase;
      pad.ring.material.opacity = 0.3 + Math.sin(t * 1.8 + pad.phase) * 0.16;
      pad.beam.material.opacity = 0.1 + Math.sin(t * 1.4 + pad.phase) * 0.05;
      pad.glow.material.opacity = 0.18 + Math.sin(t * 1.8 + pad.phase) * 0.1;
    }

    if (this.dust) {
      const arr = this.dust.geometry.attributes.position.array;
      for (let i = 0; i < this.dustSeed.length; i++) {
        const s = this.dustSeed[i];
        let y = arr[i * 3 + 1] + s.speed * dt;
        if (y > 8.4) y = 0.2;
        arr[i * 3 + 1] = y;
        arr[i * 3] = s.x + Math.sin(t * 0.2 + s.phase) * 0.5;
        arr[i * 3 + 2] = s.z + Math.cos(t * 0.17 + s.phase) * 0.5;
      }
      this.dust.geometry.attributes.position.needsUpdate = true;
    }
  }

  /** Random spawn pad, preferring ones far from the player and not crowded. */
  pickSpawn(playerPos, enemies) {
    let best = null;
    let bestScore = -Infinity;
    for (const pad of this.spawnPads) {
      const dp = Math.hypot(pad.x - playerPos.x, pad.z - playerPos.z);
      if (dp < 11) continue;
      let crowd = 0;
      for (const e of enemies) {
        if (!e.alive) continue;
        if (Math.hypot(e.pos.x - pad.x, e.pos.z - pad.z) < 3.5) crowd += 1;
      }
      const score = dp + rand(8) - crowd * 30;
      if (score > bestScore) {
        bestScore = score;
        best = pad;
      }
    }
    return best || this.spawnPads[0];
  }

  groundHeightAt(x, z, radius, feetY, stepHeight) {
    let ground = 0;
    for (const b of this.colliders) {
      if (b.maxY > feetY + Math.max(stepHeight, 0.35)) continue;
      if (x + radius < b.minX || x - radius > b.maxX || z + radius < b.minZ || z - radius > b.maxZ) continue;
      if (b.maxY > ground) ground = b.maxY;
    }
    return ground;
  }

  /** Slide a circle out of solid boxes at a given body height. */
  resolveCircle(pos, radius, bodyLow, bodyHigh) {
    for (let pass = 0; pass < 2; pass++) {
      for (const b of this.colliders) {
        if (bodyHigh <= b.minY + 0.001 || bodyLow >= b.maxY - 0.001) continue;
        const nx = Math.max(b.minX, Math.min(pos.x, b.maxX));
        const nz = Math.max(b.minZ, Math.min(pos.z, b.maxZ));
        let dx = pos.x - nx;
        let dz = pos.z - nz;
        const d2 = dx * dx + dz * dz;
        if (d2 >= radius * radius) continue;
        if (d2 > 1e-8) {
          const d = Math.sqrt(d2);
          const push = radius - d;
          pos.x += (dx / d) * push;
          pos.z += (dz / d) * push;
        } else {
          // center inside the box: push along the shallowest axis
          const left = pos.x - b.minX;
          const right = b.maxX - pos.x;
          const back = pos.z - b.minZ;
          const front = b.maxZ - pos.z;
          const m = Math.min(left, right, back, front);
          if (m === left) pos.x = b.minX - radius;
          else if (m === right) pos.x = b.maxX + radius;
          else if (m === back) pos.z = b.minZ - radius;
          else pos.z = b.maxZ + radius;
        }
      }
    }
  }

  lineOfSight(ax, ay, az, bx, by, bz) {
    const dx = bx - ax;
    const dy = by - ay;
    const dz = bz - az;
    const len = Math.hypot(dx, dy, dz);
    if (len < 0.0001) return true;
    const nx = dx / len;
    const ny = dy / len;
    const nz = dz / len;
    for (const b of this.colliders) {
      if (b.maxY < 0.1) continue;
      const t = rayAABB(ax, ay, az, nx, ny, nz, b);
      if (t > 0.2 && t < len - 0.2) return false;
    }
    return true;
  }
}
