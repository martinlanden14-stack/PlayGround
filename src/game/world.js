import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import {
  makeConcreteTexture,
  makeAsphaltTexture,
  makeTileTexture,
  makeSandTexture,
  makeGripTexture,
  makeMuralTexture,
  makeFacadeTexture,
  makeShopTexture,
  makePosterTexture,
  makeGlowTexture,
  makeShadowTexture,
  makeSparksTexture,
  makeGraffitiTexture
} from './textures.js';

const UP = new THREE.Vector3(0, 1, 0);
const _v = new THREE.Vector3();
const _v2 = new THREE.Vector3();
const _q = new THREE.Quaternion();
const _e = new THREE.Euler();

const _m4 = new THREE.Matrix4();
const _inv = new THREE.Matrix4();
const _matCache = new Map();

function std(color, roughness = .8, metalness = 0, extra = {}) {
  const key = `${color}|${roughness}|${metalness}|${JSON.stringify(extra)}`;
  let m = _matCache.get(key);
  if (!m) {
    m = new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });
    _matCache.set(key, m);
  }
  return m;
}

function canMerge(geo) {
  if (!geo || !geo.attributes.position || !geo.index) return false;
  const names = Object.keys(geo.attributes).sort().join(',');
  return names === 'normal,position,uv' || names === 'normal,position,uv,uv2';
}

function mergeChildrenByMaterial(root) {
  root.updateMatrixWorld(true);
  _inv.copy(root.matrixWorld).invert();
  const buckets = new Map();
  const originals = [];
  root.traverse((o) => {
    if (o === root || !o.isMesh || o.isSkinnedMesh) return;
    if (o.userData.noMerge || Array.isArray(o.material) || o.material.transparent) return;
    if (!canMerge(o.geometry)) return;
    let b = buckets.get(o.material);
    if (!b) { b = []; buckets.set(o.material, b); }
    b.push(o);
  });
  for (const [material, list] of buckets) {
    if (list.length < 2) continue;
    const geos = [];
    let ok = true;
    for (const m of list) {
      try {
        const g = m.geometry.clone();
        _m4.multiplyMatrices(_inv, m.matrixWorld);
        g.applyMatrix4(_m4);
        geos.push(g);
      } catch { ok = false; break; }
    }
    if (!ok) continue;
    const merged = mergeGeometries(geos, false);
    if (!merged) continue;
    merged.computeBoundingSphere();
    const out = new THREE.Mesh(merged, material);
    out.castShadow = list.some((m) => m.castShadow);
    out.receiveShadow = list.some((m) => m.receiveShadow);
    out.frustumCulled = true;
    root.add(out);
    for (const m of list) originals.push(m);
  }
  for (const m of originals) m.parent?.remove(m);
}

function mergeStaticScene(scene) {
  scene.updateMatrixWorld(true);
  const buckets = new Map();
  const originals = [];
  const visit = (obj, dynamic) => {
    const isDynamic = dynamic || obj.userData.dynamic === true;
    if (obj.isMesh && !isDynamic && !obj.isSkinnedMesh && !Array.isArray(obj.material) && !obj.material.transparent && canMerge(obj.geometry)) {
      let b = buckets.get(obj.material);
      if (!b) { b = []; buckets.set(obj.material, b); }
      b.push(obj);
    }
    for (const c of obj.children) visit(c, isDynamic);
  };
  visit(scene, false);
  for (const [material, list] of buckets) {
    if (list.length < 2) continue;
    const geos = [];
    let ok = true;
    for (const m of list) {
      try {
        const g = m.geometry.clone();
        g.applyMatrix4(m.matrixWorld);
        geos.push(g);
      } catch { ok = false; break; }
    }
    if (!ok) continue;
    const merged = mergeGeometries(geos, false);
    if (!merged) continue;
    merged.computeBoundingSphere();
    const out = new THREE.Mesh(merged, material);
    out.castShadow = list.some((m) => m.castShadow);
    out.receiveShadow = list.some((m) => m.receiveShadow);
    out.matrixAutoUpdate = false;
    scene.add(out);
    for (const m of list) originals.push(m);
  }
  for (const m of originals) m.parent?.remove(m);
  return originals.length;
}

function mesh(geo, mat, x = 0, y = 0, z = 0, cast = true, receive = true) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.castShadow = cast;
  m.receiveShadow = receive;
  return m;
}

function canvasTexture(w, h, draw) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function makeMedallionTexture() {
  return canvasTexture(1024, 1024, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2, cy = h / 2;
    ctx.fillStyle = 'rgba(33,59,52,.17)';
    ctx.beginPath(); ctx.arc(cx, cy, 494, 0, Math.PI * 2); ctx.fill();

    // Outer mosaic ring
    for (let i = 0; i < 48; i++) {
      const a0 = (i / 48) * Math.PI * 2;
      const a1 = ((i + 1) / 48) * Math.PI * 2 - .025;
      ctx.fillStyle = i % 3 === 0 ? '#dd5838' : i % 3 === 1 ? '#efe2c7' : '#224e46';
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a0) * 405, cy + Math.sin(a0) * 405);
      ctx.arc(cx, cy, 478, a0, a1);
      ctx.lineTo(cx + Math.cos(a1) * 405, cy + Math.sin(a1) * 405);
      ctx.closePath();
      ctx.fill();
    }

    ctx.fillStyle = 'rgba(18,50,44,.82)';
    ctx.beginPath(); ctx.arc(cx, cy, 390, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#efe2c7'; ctx.lineWidth = 7;
    ctx.beginPath(); ctx.arc(cx, cy, 354, 0, Math.PI * 2); ctx.stroke();

    // Sun rays
    for (let i = 0; i < 32; i++) {
      if (i % 2) continue;
      const a0 = (i / 32) * Math.PI * 2;
      const a1 = ((i + 1) / 32) * Math.PI * 2;
      ctx.fillStyle = i % 4 === 0 ? '#f6b13f' : '#d95a37';
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a0) * 170, cy + Math.sin(a0) * 170);
      ctx.arc(cx, cy, 338, a0, a1);
      ctx.lineTo(cx + Math.cos(a1) * 170, cy + Math.sin(a1) * 170);
      ctx.closePath();
      ctx.fill();
    }
    const g = ctx.createRadialGradient(cx - 30, cy - 30, 8, cx, cy, 170);
    g.addColorStop(0, '#fff1bc');
    g.addColorStop(.55, '#f6ba45');
    g.addColorStop(1, '#df5b33');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(cx, cy, 168, 0, Math.PI * 2); ctx.fill();

    // Waves across sun
    ctx.strokeStyle = 'rgba(239,226,199,.74)';
    ctx.lineWidth = 8;
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      for (let x = 350; x <= 675; x += 12) {
        ctx.lineTo(x, cy + 22 + i * 28 + Math.sin(x * .035 + i) * 4);
      }
      ctx.stroke();
    }

    ctx.fillStyle = '#efe2c7';
    ctx.textAlign = 'center';
    ctx.font = '700 27px "Arial", sans-serif';
    ctx.fillText('VENICE BEACH SKATE PLAZA', cx, cy + 442);
    ctx.fillStyle = 'rgba(239,226,199,.52)';
    ctx.font = '600 15px monospace';
    ctx.fillText('EST. 1986  ·  GOLDEN HOUR SESSIONS', cx, cy + 468);
  });
}

function wedgeGeometry(width, length, height) {
  const w = width / 2, l = length / 2;
  const positions = [];
  const uvs = [];
  const indices = [];
  const push = (x, y, z, u, v) => {
    positions.push(x, y, z);
    uvs.push(u, v);
    return positions.length / 3 - 1;
  };
  // Ramp face: low at +z, high at -z
  const a = push(-w, 0, l, 0, 0);
  const b = push(w, 0, l, 1, 0);
  const c = push(w, height, -l, 1, 1);
  const d = push(-w, height, -l, 0, 1);
  indices.push(a, b, c, a, c, d);
  // Back
  const e = push(-w, 0, -l, 0, 0);
  const f = push(w, 0, -l, 1, 0);
  indices.push(d, c, f, d, f, e);
  // Sides
  indices.push(a, d, e);
  indices.push(b, f, c);
  // bottom
  // use separate bottom verts to avoid sharing normal issues
  const i1 = push(-w, 0, l, 0, 0);
  const i2 = push(w, 0, l, 1, 0);
  const i3 = push(w, 0, -l, 1, 1);
  const i4 = push(-w, 0, -l, 0, 1);
  indices.push(i1, i4, i3, i1, i3, i2);

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

function buildSky(scene) {
  const sunDir = new THREE.Vector3(-0.29, 0.135, -0.947).normalize();
  const uniforms = {
    uTime: { value: 0 },
    uSun: { value: sunDir },
    uTop: { value: new THREE.Color('#14586f') },
    uMid: { value: new THREE.Color('#e99360') },
    uHorizon: { value: new THREE.Color('#ffd08f') }
  };
  const mat = new THREE.ShaderMaterial({
    uniforms,
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    vertexShader: `
      varying vec3 vDir;
      void main() {
        vec4 world = modelMatrix * vec4(position, 1.0);
        vDir = normalize(world.xyz);
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,
    fragmentShader: `
      varying vec3 vDir;
      uniform vec3 uSun;
      uniform vec3 uTop;
      uniform vec3 uMid;
      uniform vec3 uHorizon;
      uniform float uTime;

      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
      float noise(vec2 p){
        vec2 i = floor(p); vec2 f = fract(p);
        f = f*f*(3.0-2.0*f);
        return mix(mix(hash(i), hash(i+vec2(1.0,0.0)), f.x), mix(hash(i+vec2(0.0,1.0)), hash(i+vec2(1.0,1.0)), f.x), f.y);
      }

      void main() {
        vec3 d = normalize(vDir);
        float h = clamp(d.y, -0.15, 1.0);
        float horizon = smoothstep(-0.02, 0.18, h);
        vec3 col = mix(uHorizon, uMid, smoothstep(0.005, 0.13, h));
        col = mix(col, uTop, smoothstep(0.12, 0.48, h));

        float sd = max(dot(d, uSun), 0.0);
        float disc = smoothstep(0.99935, 0.9998, sd);
        float inner = pow(sd, 260.0);
        float glow = pow(sd, 14.0) * 0.16 + pow(sd, 60.0) * 0.14;
        vec3 sunCol = vec3(1.0, 0.83, 0.55);
        col += sunCol * disc * 1.9;
        col += vec3(1.0, 0.46, 0.18) * glow * (1.0 - horizon * .4);
        col += uHorizon * pow(1.0 - abs(h), 9.0) * 0.11;

        // Wispy high cloud band
        float az = atan(d.z, d.x);
        vec2 np = vec2(az * 3.4 + uTime * 0.004, h * 22.0);
        vec2 warp = vec2(noise(np * .55 + 3.1), noise(np * .62 + 17.0)) - .5;
        np += warp * vec2(2.2, 4.0);
        float n = noise(np) * .54 + noise(np * 2.2 + 5.0) * .3 + noise(np * 4.8) * .12;
        float band = smoothstep(0.035, 0.13, h) * smoothstep(0.6, 0.24, h);
        float cloud = smoothstep(0.5, 0.72, n) * band;
        vec3 cloudCol = mix(vec3(0.96, 0.58, 0.45), vec3(1.0, 0.88, 0.72), smoothstep(0.04, 0.42, h));
        col = mix(col, cloudCol, cloud * .46);

        // Distant haze
        col = mix(col, vec3(0.99,0.73,0.55), pow(1.0 - abs(h), 18.0) * .32);
        gl_FragColor = vec4(col, 1.0);
      }
    `
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(470, 48, 24), mat);
  sky.frustumCulled = false;
  scene.add(sky);
  return { sky, uniforms, sunDir };
}

function makeCloudTexture() {
  return canvasTexture(512, 256, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < 22; i++) {
      const x = 80 + Math.random() * 350;
      const y = 105 + Math.random() * 68;
      const rx = 45 + Math.random() * 85;
      const ry = 10 + Math.random() * 24;
      const g = ctx.createRadialGradient(x, y, 0, x, y, rx);
      g.addColorStop(0, `rgba(255,226,199,${.12 + Math.random() * .14})`);
      g.addColorStop(.6, `rgba(255,195,167,${.05 + Math.random() * .08})`);
      g.addColorStop(1, 'rgba(255,190,160,0)');
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(1, ry / rx);
      ctx.translate(-x, -y);
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(x, y, rx, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }
  });
}

function buildOcean(scene) {
  const geo = new THREE.PlaneGeometry(520, 340, 1, 1);
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uDeep: { value: new THREE.Color('#0a3e46') },
      uShallow: { value: new THREE.Color('#2b8b86') },
      uSun: { value: new THREE.Color('#ffb264') }
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vWorld;
      void main() {
        vUv = uv;
        vec4 w = modelMatrix * vec4(position,1.0);
        vWorld = w.xyz;
        gl_Position = projectionMatrix * viewMatrix * w;
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      varying vec3 vWorld;
      uniform float uTime;
      uniform vec3 uDeep;
      uniform vec3 uShallow;
      uniform vec3 uSun;
      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
      void main() {
        vec2 p = vWorld.xz;
        float perspective = smoothstep(-220.0, -55.0, vWorld.z);
        float w1 = sin(p.x * .32 + uTime * .7 + sin(p.y * .12) * 2.0);
        float w2 = sin(p.y * .8 - uTime * 1.1 + p.x * .09);
        float w3 = sin((p.x + p.y) * 1.7 + uTime * 1.9);
        float ripple = (w1 * .5 + w2 * .32 + w3 * .12) * .5 + .5;
        vec3 col = mix(uDeep, uShallow, ripple * .55 + perspective * .12);
        float glint = pow(max(0.0, sin(p.x * .55 + p.y * .18 + uTime * 1.4)), 28.0) * .45;
        float path = exp(-pow((vWorld.x + 58.0) * .024, 2.0));
        glint += pow(max(0.0, sin(p.y * .43 + uTime * 1.1)), 38.0) * path * .95;
        col += uSun * glint;
        float foam = smoothstep(-59.0, -55.0, vWorld.z) * smoothstep(-53.0, -56.0, vWorld.z);
        foam *= .28 + .16 * sin(p.x * .55 + uTime * .8);
        col = mix(col, vec3(0.92,0.89,0.78), clamp(foam,0.0,1.0) * .7);
        col += vec3(0.02,0.04,0.03) * hash(gl_FragCoord.xy);
        gl_FragColor = vec4(col, 1.0);
      }
    `
  });
  const ocean = new THREE.Mesh(geo, mat);
  ocean.rotation.x = -Math.PI / 2;
  ocean.position.set(0, -1.05, -172);
  ocean.receiveShadow = false;
  scene.add(ocean);
  return { ocean, mat };
}

function addGroundGrime(scene) {
  const tex = canvasTexture(256, 256, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 4, w / 2, h / 2, w / 2);
    g.addColorStop(0, 'rgba(255,255,255,.9)');
    g.addColorStop(.55, 'rgba(255,255,255,.42)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  });
  const palette = [0x4a4335, 0x37342b, 0x6b5c46];
  let seed = 4;
  const next = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < 26; i++) {
    const s = .9 + next() * 3.6;
    const mat = new THREE.MeshBasicMaterial({
      map: tex, transparent: true, depthWrite: false, opacity: .05 + next() * .1,
      color: palette[i % palette.length], polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2
    });
    const m = mesh(new THREE.PlaneGeometry(s, s * (.6 + next() * .8)), mat, -29 + next() * 58, .012, -28 + next() * 56, false, false);
    m.rotation.x = -Math.PI / 2;
    m.rotation.z = next() * Math.PI;
    scene.add(m);
  }
  // A few chalk scuffs + wax streaks
  const waxMat = new THREE.MeshBasicMaterial({ color: 0x2c2a24, transparent: true, opacity: .1, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
  for (let i = 0; i < 6; i++) {
    const len = 1.2 + next() * 2.6;
    const m = mesh(new THREE.PlaneGeometry(.08 + next() * .1, len), waxMat, -24 + next() * 48, .014, -24 + next() * 46, false, false);
    m.rotation.x = -Math.PI / 2;
    m.rotation.z = next() * Math.PI;
    scene.add(m);
  }
}

function buildGround(scene, concrete, asphalt, tile, sand) {
  const group = new THREE.Group();

  // Deep base so gaps never reveal sky
  const base = mesh(new THREE.PlaneGeometry(360, 360), std(0x8f866f, .96), 0, -.12, 0, false, true);
  base.rotation.x = -Math.PI / 2;
  group.add(base);

  const plaza = mesh(new THREE.PlaneGeometry(64, 72, 1, 1), new THREE.MeshStandardMaterial({
    map: concrete, color: 0xd6cab4, roughness: .88, metalness: .02, bumpMap: concrete, bumpScale: .05
  }), 0, 0, 0, false, true);
  plaza.rotation.x = -Math.PI / 2;
  group.add(plaza);

  // Promenade band and border
  const promenade = mesh(new THREE.PlaneGeometry(66, 8), new THREE.MeshStandardMaterial({
    map: tile, color: 0xf0e2c5, roughness: .8, metalness: .01, bumpMap: tile, bumpScale: .012
  }), 0, .018, -34, false, true);
  promenade.rotation.x = -Math.PI / 2;
  group.add(promenade);

  // Painted lane
  const paint = new THREE.MeshBasicMaterial({ color: 0xd7ff43, transparent: true, opacity: .52, depthWrite: false });
  for (let i = 0; i < 7; i++) {
    const dash = mesh(new THREE.PlaneGeometry(2.6, .16), paint, -28 + i * 9.4, .024, -29.6, false, false);
    dash.rotation.x = -Math.PI / 2;
    dash.rotation.z = -.02;
    group.add(dash);
  }

  // Beach
  const beach = mesh(new THREE.PlaneGeometry(190, 25), new THREE.MeshStandardMaterial({
    map: sand, color: 0xf1d8a6, roughness: 1, bumpMap: sand, bumpScale: .02
  }), 0, -.26, -49.5, false, true);
  beach.rotation.x = -Math.PI / 2;
  group.add(beach);

  // Asphalt path behind plaza
  const path = mesh(new THREE.PlaneGeometry(90, 7), new THREE.MeshStandardMaterial({
    map: asphalt, color: 0x8d8c7d, roughness: .92
  }), 0, .01, 37, false, true);
  path.rotation.x = -Math.PI / 2;
  group.add(path);

  // Medallion
  const medallionTex = makeMedallionTexture();
  const medallion = new THREE.Mesh(new THREE.PlaneGeometry(18.5, 18.5), new THREE.MeshStandardMaterial({
    map: medallionTex, transparent: true, roughness: .78, metalness: 0.02, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2
  }));
  medallion.rotation.x = -Math.PI / 2;
  medallion.position.set(0, .026, -4);
  medallion.receiveShadow = true;
  group.add(medallion);

  // Scattered painted marks
  const markMat = new THREE.MeshBasicMaterial({ color: 0xe8643c, transparent: true, opacity: .42, depthWrite: false });
  const circle = mesh(new THREE.RingGeometry(1.2, 1.34, 48), markMat, 18, .028, 9, false, false);
  circle.rotation.x = -Math.PI / 2;
  group.add(circle);
  const arrow = new THREE.Mesh(new THREE.CircleGeometry(.48, 3), markMat);
  arrow.rotation.x = -Math.PI / 2;
  arrow.rotation.z = Math.PI / 2;
  arrow.position.set(-14, .028, 4);
  group.add(arrow);

  scene.add(group);
  return group;
}

function buildRailing(scene, metalMat, x1, z1, x2, z2, height = 1.05) {
  const dx = x2 - x1, dz = z2 - z1;
  const len = Math.hypot(dx, dz);
  const angle = Math.atan2(dx, dz);
  const g = new THREE.Group();
  g.position.set(x1, 0, z1);
  g.rotation.y = angle;

  const postGeo = new THREE.CylinderGeometry(.035, .045, height, 7);
  const railGeo = new THREE.CylinderGeometry(.03, .03, len, 7);
  const count = Math.max(2, Math.round(len / 2.4));
  for (let i = 0; i <= count; i++) {
    const post = mesh(postGeo, metalMat, 0, height / 2, (i / count) * len);
    g.add(post);
  }
  const rail = mesh(railGeo, metalMat, 0, height, len / 2);
  rail.rotation.x = Math.PI / 2;
  g.add(rail);
  const mid = mesh(railGeo, metalMat, 0, height * .54, len / 2);
  mid.rotation.x = Math.PI / 2;
  mid.scale.set(.7, 1, .7);
  g.add(mid);

  scene.add(g);
  return g;
}

function buildWalls(scene, concrete, mural, graffiti) {
  const group = new THREE.Group();
  const wallMat = new THREE.MeshStandardMaterial({
    map: concrete, color: 0x9d927d, roughness: .91, bumpMap: concrete, bumpScale: .03
  });
  const topMat = std(0x6e6656, .86);

  // Ocean-side low wall
  const front = mesh(new THREE.BoxGeometry(67, 1.05, .45), wallMat, 0, .52, -38.2);
  group.add(front);
  const frontTop = mesh(new THREE.BoxGeometry(67.4, .11, .58), topMat, 0, 1.06, -38.2);
  group.add(frontTop);
  buildRailing(scene, std(0x4b4e46, .42, .7), -32.8, -38.25, 32.8, -38.25, 1.02);

  // Side walls
  const left = mesh(new THREE.BoxGeometry(.45, 3.9, 69), wallMat, -32.4, 1.95, -3.5);
  group.add(left);
  const right = mesh(new THREE.BoxGeometry(.45, 3.9, 69), wallMat, 32.4, 1.95, -3.5);
  group.add(right);
  group.add(mesh(new THREE.BoxGeometry(.65, .14, 69), topMat, -32.4, 3.93, -3.5));
  group.add(mesh(new THREE.BoxGeometry(.65, .14, 69), topMat, 32.4, 3.93, -3.5));

  // Graffiti / mural panels
  const muralMat = new THREE.MeshStandardMaterial({ map: mural, roughness: .9, color: 0xe5dcc8 });
  const muralPanel = mesh(new THREE.PlaneGeometry(23, 8.5), muralMat, -32.15, 2.1, 2, true, true);
  muralPanel.rotation.y = Math.PI / 2;
  muralPanel.scale.set(1, .54, 1);
  group.add(muralPanel);

  const graffitiMat = new THREE.MeshStandardMaterial({ map: graffiti, transparent: true, roughness: .95, depthWrite: false });
  const graf = mesh(new THREE.PlaneGeometry(16, 6), graffitiMat, 32.16, 2.25, -14, false, false);
  graf.rotation.y = -Math.PI / 2;
  graf.scale.y = .9;
  group.add(graf);

  // Back wall with painted stripes
  const back = mesh(new THREE.BoxGeometry(65, 4.4, .45), wallMat, 0, 2.2, 32.6);
  group.add(back);
  group.add(mesh(new THREE.BoxGeometry(65.4, .15, .62), topMat, 0, 4.44, 32.6));
  const stripeMat = new THREE.MeshStandardMaterial({ color: 0x163f3a, roughness: .8 });
  for (let i = 0; i < 5; i++) {
    const stripe = mesh(new THREE.PlaneGeometry(7.4, 4.3), stripeMat, -24 + i * 12, 2.2, 32.36, false, false);
    stripe.scale.y = i % 2 ? .32 : .16;
    group.add(stripe);
  }
  const backGraf = mesh(new THREE.PlaneGeometry(22, 7), graffitiMat, 15, 2.5, 32.35, false, false);
  backGraf.rotation.y = Math.PI;
  group.add(backGraf);

  // Bench/planter rhythm along sides
  scene.add(group);
  return group;
}

function buildBuilding(scene, facadeTextures, x, z, w, d, h, colorIndex, neon) {
  const group = new THREE.Group();
  const tex = facadeTextures[colorIndex % facadeTextures.length].clone();
  tex.needsUpdate = true;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(Math.max(1, Math.round(w / 12)), Math.max(1, Math.round(h / 13)));
  const facade = new THREE.MeshStandardMaterial({ map: tex, roughness: .88, metalness: .02 });
  const wall = new THREE.MeshStandardMaterial({ color: [0xc98d6b, 0xd4b48b, 0x8da28e, 0xd09f88, 0x7a918a][colorIndex % 5], roughness: .91 });
  const roof = std(0x5b5a4c, .96);
  const mats = [facade, facade, roof, roof, facade, facade];
  const b = mesh(new THREE.BoxGeometry(w, h, d), mats, 0, h / 2, 0);
  group.add(b);

  // Parapet
  const parapet = mesh(new THREE.BoxGeometry(w + .2, .5, d + .2), wall, 0, h + .22, 0);
  group.add(parapet);

  // Rooftop details
  const ac = mesh(new RoundedBoxGeometry(1.8, 1.1, 1.5, 2, .1), std(0x77786c, .7, .1), w * .2, h + .82, -d * .12);
  group.add(ac);
  if (h > 15) {
    const tank = mesh(new THREE.CylinderGeometry(.9, .9, 1.8, 12), std(0x7d6b55, .82), -w * .24, h + 1.2, d * .12);
    group.add(tank);
    const tankTop = mesh(new THREE.ConeGeometry(1.0, .5, 12), std(0x5d5041, .9), -w * .24, h + 2.35, d * .12);
    group.add(tankTop);
  }

  // Awnings
  if (h < 15) {
    const awningMat = new THREE.MeshStandardMaterial({ color: neon ? 0xd7ff43 : 0xd95739, roughness: .7, side: THREE.DoubleSide });
    const awning = mesh(new THREE.BoxGeometry(w * .8, .12, 2.2), awningMat, 0, 4.0, d / 2 + 1.0);
    awning.rotation.x = -.15;
    group.add(awning);
    for (let i = 0; i < 7; i++) {
      const stripe = mesh(new THREE.BoxGeometry(w * .1, .015, 2.18), new THREE.MeshStandardMaterial({ color: 0xf0e7d3, roughness: .8 }), -w * .35 + i * w * .12, 4.08, d / 2 + 1.0);
      stripe.rotation.x = -.15;
      group.add(stripe);
    }
  }

  // Signs
  const signText = ['TACOS', 'SURF SHACK', 'SKATE CO.', 'PACIFIC', 'CANTINA'][colorIndex % 5];
  const signSub = ['OPEN LATE · VENICE', 'BOARDS · WAX · WAVES', 'SINCE 1986', 'COLD DRINKS', 'SEA YOU SOON'][colorIndex % 5];
  const signMat = new THREE.MeshBasicMaterial({
    map: makeShopTexture(signText, signSub, colorIndex % 2 ? '#102f2b' : '#822e22', '#f7ecd4', colorIndex % 3 === 0 ? '#ff5b3a' : '#d7ff43'),
    transparent: false,
    toneMapped: false
  });
  const sign = mesh(new THREE.PlaneGeometry(Math.min(w * .84, 7.4), Math.min(w * .42, 3.6)), signMat, 0, Math.min(6.4, h - 1), d / 2 + .03, false, false);
  group.add(sign);

  // Fire escape / AC units on facades
  for (let i = 0; i < Math.min(2, Math.floor(h / 8)); i++) {
    const box = mesh(new THREE.BoxGeometry(1.0, .5, .38), std(0x9a9785, .8), w * .27, 8 + i * 4, d / 2 + .18);
    group.add(box);
  }

  group.position.set(x, 0, z);
  scene.add(group);
  return group;
}

function makePalm(scene, x, z, scale = 1, lean = 0, seed = 0) {
  const group = new THREE.Group();
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x6b5138, roughness: .97, bumpMap: null });
  const trunkSeg = new THREE.CylinderGeometry(.12 * scale, .2 * scale, 1.22 * scale, 7, 2);
  const segs = 9;
  let px = 0, pz = 0;
  for (let i = 0; i < segs; i++) {
    const t = i / (segs - 1);
    const seg = mesh(trunkSeg, trunkMat, px, (i + .5) * 1.12 * scale, pz);
    seg.rotation.z = lean * (.25 + t * .9) + Math.sin(i * 1.7 + seed) * .018;
    seg.rotation.x = Math.cos(i * 1.3 + seed) * .02;
    group.add(seg);
    px += Math.sin(lean * (.25 + t * .9)) * 1.04 * scale;
    pz += Math.cos(i * 2.1 + seed) * .035 * scale;
  }

  const crown = new THREE.Group();
  crown.position.set(px, segs * 1.12 * scale + .15, pz);
  group.add(crown);

  const leafMat = new THREE.MeshStandardMaterial({
    color: 0x254c36, roughness: .8, metalness: .02, side: THREE.DoubleSide
  });
  const leafMatLight = new THREE.MeshStandardMaterial({
    color: 0x3d6d45, roughness: .75, side: THREE.DoubleSide
  });

  for (let f = 0; f < 9; f++) {
    const angle = (f / 9) * Math.PI * 2 + seed * .4;
    const geo = new THREE.BufferGeometry();
    const pts = [];
    const uvs = [];
    const idx = [];
    const len = (2.7 + Math.random() * 1.2) * scale;
    const width = .42 * scale;
    const droop = .9 + Math.random() * .5;
    const segCount = 8;
    for (let s = 0; s <= segCount; s++) {
      const t = s / segCount;
      const spread = len * t;
      const y = Math.sin(t * Math.PI * .45) * 1.05 * scale - t * t * droop * scale;
      const side = Math.sin(t * Math.PI) * width * (1 - t * .38);
      pts.push(-side, y, spread, side, y, spread);
      uvs.push(0, t, 1, t);
    }
    for (let s = 0; s < segCount; s++) {
      const a = s * 2;
      idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    const leaf = new THREE.Mesh(geo, f % 3 === 0 ? leafMatLight : leafMat);
    leaf.rotation.y = angle;
    leaf.rotation.z = Math.sin(angle) * .09;
    leaf.castShadow = true;
    leaf.receiveShadow = true;
    crown.add(leaf);

    const rib = mesh(new THREE.CylinderGeometry(.012 * scale, .009 * scale, len, 4), std(0x5e7241, .72), 0, 0, len / 2);
    rib.rotation.x = Math.PI / 2;
    rib.rotation.y = angle;
    rib.position.y = .22 * scale;
    crown.add(rib);
  }

  // Coconuts
  for (let c = 0; c < 3; c++) {
    const nut = mesh(new THREE.SphereGeometry(.14 * scale, 8, 6), std(0x4f3d27, .9), Math.cos(c * 2.1) * .25 * scale, -.14, Math.sin(c * 2.1) * .25 * scale);
    crown.add(nut);
  }

  group.position.set(x, 0, z);
  group.rotation.y = seed * .8;
  scene.add(group);
  mergeChildrenByMaterial(crown);
  crown.userData.dynamic = true;
  return { group, crown, phase: seed * 2.3 };
}

function makeBench(scene, x, z, rot = 0) {
  const g = new THREE.Group();
  const wood = std(0xa46f43, .8);
  for (let i = 0; i < 4; i++) {
    g.add(mesh(new THREE.BoxGeometry(1.8, .09, .19), wood, 0, .47, -.28 + i * .19));
  }
  for (let i = 0; i < 3; i++) {
    const back = mesh(new THREE.BoxGeometry(1.8, .13, .08), wood, 0, .73 + i * .17, .38);
    back.rotation.x = -.16;
    g.add(back);
  }
  const legMat = std(0x272d28, .5, .65);
  for (const lx of [-.68, .68]) {
    g.add(mesh(new THREE.BoxGeometry(.07, .5, .54), legMat, lx, .25, 0));
  }
  g.position.set(x, 0, z);
  g.rotation.y = rot;
  scene.add(g);
  return g;
}

function makePlanter(scene, x, z, scale = 1) {
  const g = new THREE.Group();
  const pot = mesh(new RoundedBoxGeometry(1.2 * scale, .62 * scale, 1.2 * scale, 2, .04), std(0x7e6a52, .9), 0, .31 * scale, 0);
  g.add(pot);
  const dirt = mesh(new THREE.CylinderGeometry(.5 * scale, .5 * scale, .04, 16), std(0x3f3325, 1), 0, .63 * scale, 0);
  g.add(dirt);
  const bushMat = new THREE.MeshStandardMaterial({ color: 0x315e3d, roughness: .9 });
  for (let i = 0; i < 5; i++) {
    const leaf = mesh(new THREE.IcosahedronGeometry((.25 + Math.random() * .2) * scale, 1), bushMat, Math.cos(i) * .32 * scale, .76 * scale + Math.random() * .2, Math.sin(i) * .32 * scale);
    leaf.scale.y = .75;
    g.add(leaf);
  }
  g.position.set(x, 0, z);
  scene.add(g);
  return g;
}

function makeTrash(scene, x, z) {
  const g = new THREE.Group();
  const can = mesh(new THREE.CylinderGeometry(.32, .28, .9, 12), std(0x2c4039, .65, .4), 0, .45, 0);
  g.add(can);
  const lip = mesh(new THREE.TorusGeometry(.32, .035, 6, 16), std(0x18211e, .4, .8), 0, .91, 0);
  lip.rotation.x = Math.PI / 2;
  g.add(lip);
  const lid = mesh(new THREE.CylinderGeometry(.3, .34, .1, 12), std(0x1c2925, .5, .7), 0, .95, 0);
  g.add(lid);
  g.position.set(x, 0, z);
  scene.add(g);
  return g;
}

function makeCone(scene, x, z) {
  const g = new THREE.Group();
  const cone = mesh(new THREE.ConeGeometry(.19, .55, 14), std(0xe9672f, .7), 0, .31, 0);
  g.add(cone);
  const band = mesh(new THREE.CylinderGeometry(.12, .15, .09, 14), std(0xf2ead6, .68), 0, .3, 0);
  g.add(band);
  g.add(mesh(new THREE.BoxGeometry(.46, .04, .46), std(0xe9672f, .8), 0, .02, 0));
  g.position.set(x, 0, z);
  scene.add(g);
  return g;
}

function makeUmbrella(scene, x, z, color = 0xff5b3a) {
  const g = new THREE.Group();
  const pole = mesh(new THREE.CylinderGeometry(.035, .045, 2.8, 8), std(0xe6dfc9, .55, .4), 0, 1.4, 0);
  g.add(pole);
  const canopyMat = new THREE.MeshStandardMaterial({ color, roughness: .85, side: THREE.DoubleSide });
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const geo = new THREE.ConeGeometry(1.5, .55, 3, 1, true, a, Math.PI * 2 / 8);
    const pad = new THREE.Mesh(geo, i % 2 ? canopyMat : std(0xf2e5c8, .9, 0, { side: THREE.DoubleSide }));
    pad.position.y = 2.65;
    pad.castShadow = true;
    g.add(pad);
  }
  g.position.set(x, 0, z);
  g.rotation.z = .07;
  scene.add(g);
  return g;
}

function buildRamp(scene, def, concreteMat, accentMat) {
  const { x, z, yaw, width, length, height } = def;
  const g = new THREE.Group();
  const geo = wedgeGeometry(width, length, height);
  const ramp = new THREE.Mesh(geo, concreteMat);
  ramp.castShadow = true;
  ramp.receiveShadow = true;
  g.add(ramp);

  // Painted top lip
  const lip = mesh(new THREE.BoxGeometry(width + .05, .08, .22), accentMat, 0, height + .015, -length / 2 + .08, false, true);
  lip.rotation.x = -.02;
  g.add(lip);

  // Side rails
  const railMat = std(0x5b5e56, .36, .82);
  for (const sx of [-width / 2 - .06, width / 2 + .06]) {
    const rail = mesh(new THREE.CylinderGeometry(.022, .022, length * .86, 6), railMat, sx, height * .5 + .18, .02);
    rail.rotation.x = Math.PI / 2;
    rail.rotation.z = Math.atan2(height, length);
    g.add(rail);
  }

  // Tiled face stripe
  const stripe = mesh(new THREE.PlaneGeometry(width * .26, Math.hypot(length, height) * .82), accentMat, 0, height * .5 + .08, 0);
  stripe.rotation.x = -Math.atan2(height, length) + Math.PI / 2;
  stripe.position.z = .08;
  stripe.visible = false;
  g.add(stripe);

  g.position.set(x, 0, z);
  g.rotation.y = yaw;
  scene.add(g);
  return g;
}

function makeRail(scene, a, b, y, style = 'rail') {
  const ax = a[0], az = a[1], bx = b[0], bz = b[1];
  const dx = bx - ax, dz = bz - az;
  const len = Math.hypot(dx, dz);
  const angle = Math.atan2(dx, dz);
  const g = new THREE.Group();
  g.position.set(ax, 0, az);
  g.rotation.y = angle;

  const metal = std(0xc3bda9, .22, .92);
  const dark = std(0x3a3d36, .38, .8);
  const topGeo = new THREE.CylinderGeometry(.045, .045, len, 8);
  const top = mesh(topGeo, metal, 0, y, len / 2);
  top.rotation.x = Math.PI / 2;
  g.add(top);
  if (style === 'flat') {
    const flat = mesh(new THREE.BoxGeometry(.16, .04, len), metal, 0, y - .02, len / 2);
    g.add(flat);
  } else {
    const lower = mesh(new THREE.CylinderGeometry(.032, .032, len, 7), dark, 0, y * .52, len / 2);
    lower.rotation.x = Math.PI / 2;
    g.add(lower);
  }

  const posts = Math.max(2, Math.round(len / 3.2));
  const postGeo = new THREE.CylinderGeometry(.035, .045, y, 7);
  for (let i = 0; i <= posts; i++) {
    const t = i / posts;
    const post = mesh(postGeo, dark, 0, y / 2, t * len);
    g.add(post);
    const foot = mesh(new THREE.CylinderGeometry(.1, .13, .04, 8), dark, 0, .02, t * len);
    g.add(foot);
  }

  // Grind wax sheen on top
  const sheen = mesh(new THREE.CylinderGeometry(.05, .05, len * .85, 8), std(0xf0e3b0, .14, .8, { emissive: 0x3a2e12, emissiveIntensity: .2 }), 0, y + .005, len / 2);
  sheen.rotation.x = Math.PI / 2;
  g.add(sheen);

  scene.add(g);
  return g;
}

function makeLedge(scene, x, z, w, d, h, yaw, concreteMat, accentMat) {
  const g = new THREE.Group();
  const body = mesh(new RoundedBoxGeometry(w, h, d, 3, .07), concreteMat, 0, h / 2, 0);
  g.add(body);
  const top = mesh(new THREE.BoxGeometry(w + .12, .09, d + .12), std(0x8c806b, .55, .1), 0, h + .035, 0);
  g.add(top);
  const stripe = mesh(new THREE.BoxGeometry(w * .65, .07, d + .14), accentMat, 0, h * .54, 0);
  g.add(stripe);
  const boltMat = std(0x5c594e, .4, .8);
  for (let i = 0; i < 4; i++) {
    const bolt = mesh(new THREE.CylinderGeometry(.035, .035, .02, 6), boltMat, -w / 2 + .3 + i * (w - .6) / 3, h + .085, 0);
    g.add(bolt);
  }
  g.position.set(x, 0, z);
  g.rotation.y = yaw;
  scene.add(g);
  return g;
}

function makeFunbox(scene, x, z, w, d, h, concreteMat, accentMat) {
  const g = new THREE.Group();
  const base = mesh(new RoundedBoxGeometry(w, h, d, 3, .06), concreteMat, 0, h / 2, 0);
  g.add(base);
  const cap = mesh(new THREE.BoxGeometry(w + .14, .1, d + .14), std(0x9b8f77, .6), 0, h + .04, 0);
  g.add(cap);
  const stripe = mesh(new THREE.BoxGeometry(w + .16, .08, .18), accentMat, 0, h * .58, d / 2 + .01);
  g.add(stripe);
  // Small kickers on long sides for access
  const sideRamp = new THREE.Mesh(wedgeGeometry(w * .8, 2.2, h), concreteMat);
  sideRamp.rotation.y = Math.PI;
  sideRamp.position.set(0, 0, -d / 2 - 1.05);
  sideRamp.castShadow = sideRamp.receiveShadow = true;
  g.add(sideRamp);
  g.position.set(x, 0, z);
  scene.add(g);
  return g;
}

function makeTape(scene, glowTex, x, y, z, index) {
  const g = new THREE.Group();
  const bodyMat = std(0x1d2723, .28, .65);
  bodyMat.emissive = new THREE.Color(0x3a2e0b);
  bodyMat.emissiveIntensity = .3;
  const body = mesh(new RoundedBoxGeometry(.55, .12, .33, 2, .03), bodyMat, 0, 0, 0);
  body.rotation.x = .08;
  g.add(body);

  const edge = mesh(new THREE.BoxGeometry(.56, .015, .34), std(0xe9b94a, .3, .8), 0, -.066, 0);
  g.add(edge);

  const reelMat = std(0x0b100d, .5, .2);
  for (const rx of [-.135, .135]) {
    const reel = mesh(new THREE.CylinderGeometry(.085, .085, .025, 16), reelMat, rx, 0, 0);
    reel.rotation.x = Math.PI / 2;
    g.add(reel);
    const hub = mesh(new THREE.TorusGeometry(.085, .008, 5, 16), std(0xd7ff43, .3, .7), rx, 0, .013);
    g.add(hub);
  }
  const label = mesh(new THREE.PlaneGeometry(.27, .09), new THREE.MeshBasicMaterial({ color: 0xd7ff43, toneMapped: false }), .02, 0, .171);
  g.add(label);

  const glow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTex, color: 0xffc35c, transparent: true, opacity: .55, blending: THREE.AdditiveBlending, depthWrite: false
  }));
  glow.scale.set(1.6, 1.6, 1);
  g.add(glow);
  const ring = mesh(new THREE.TorusGeometry(.36, .008, 4, 32), new THREE.MeshBasicMaterial({ color: 0xffd66d, transparent: true, opacity: .5, toneMapped: false }), 0, 0, 0, false, false);
  ring.rotation.x = Math.PI / 2;
  g.add(ring);

  g.position.set(x, y, z);
  g.userData = { index, baseY: y, phase: index * 1.7, collected: false, ring, glow, dynamic: true };
  scene.add(g);
  return g;
}

function makeFerrisWheel(scene) {
  const group = new THREE.Group();
  group.position.set(-54, 0, -86);
  const wood = std(0x67563f, .9);
  const metal = std(0x8e8877, .5, .5);
  // Pier
  const pier = mesh(new THREE.BoxGeometry(11, .7, 60), wood, 0, -.55, 20);
  group.add(pier);
  for (let i = 0; i < 14; i++) {
    for (const px of [-4, 4]) {
      const post = mesh(new THREE.CylinderGeometry(.18, .22, 2.8, 6), std(0x534835, .95), px, -2.1, -5 + i * 4.2);
      group.add(post);
    }
  }
  // Wheel supports
  for (const sx of [-3.2, 3.2]) {
    const leg = mesh(new THREE.CylinderGeometry(.2, .26, 17, 6), metal, sx, 8, 0);
    leg.rotation.z = sx * .02;
    group.add(leg);
  }
  const wheel = new THREE.Group();
  wheel.position.y = 16;
  const ringMat = std(0xb7ae93, .36, .7);
  for (const zz of [-.35, .35]) {
    const ring = mesh(new THREE.TorusGeometry(8.6, .11, 6, 64), ringMat, 0, 0, zz);
    wheel.add(ring);
  }
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    const spoke = mesh(new THREE.CylinderGeometry(.035, .035, 17.2, 4), ringMat, 0, 0, 0);
    spoke.rotation.z = a;
    wheel.add(spoke);
    const gondola = mesh(new THREE.BoxGeometry(1.15, .9, .7), std([0xff5b3a, 0xd7ff43, 0xf1e1bf, 0x2b8b86][i % 4], .7), Math.cos(a) * 8.6, Math.sin(a) * 8.6 - .55, .55);
    wheel.add(gondola);
    const bulb = mesh(new THREE.SphereGeometry(.09, 6, 5), new THREE.MeshBasicMaterial({ color: 0xffd87a, toneMapped: false }), Math.cos(a) * 8.6, Math.sin(a) * 8.6, .8, false, false);
    wheel.add(bulb);
  }
  group.add(wheel);
  mergeChildrenByMaterial(wheel);
  wheel.userData.dynamic = true;
  // Pier lights
  for (let i = 0; i < 8; i++) {
    const post = mesh(new THREE.CylinderGeometry(.05, .05, 3, 5), metal, -4.7, 1.5, -10 + i * 8);
    group.add(post);
    const light = new THREE.MeshBasicMaterial({ color: 0xffcf7a, toneMapped: false });
    const bulb = mesh(new THREE.SphereGeometry(.12, 6, 5), light, -4.7, 3.05, -10 + i * 8, false, false);
    group.add(bulb);
  }
  group.rotation.y = -.05;
  scene.add(group);
  return { group, wheel };
}

function makePlazaSignTexture() {
  return canvasTexture(1024, 256, (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#16443d');
    g.addColorStop(1, '#082420');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // Sun disc
    const sg = ctx.createRadialGradient(806, 118, 6, 806, 118, 124);
    sg.addColorStop(0, '#ffd27a');
    sg.addColorStop(.55, '#ff8a4d');
    sg.addColorStop(1, 'rgba(255,91,58,0)');
    ctx.fillStyle = sg;
    ctx.fillRect(660, 0, 300, 256);
    // Sun stripes
    ctx.save();
    ctx.beginPath();
    ctx.arc(806, 118, 72, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = '#0f3733';
    for (let i = 0; i < 7; i++) ctx.fillRect(720, 132 + i * 11, 180, 4 + i * .8);
    ctx.restore();

    // Frame
    ctx.strokeStyle = 'rgba(245,238,219,.55)';
    ctx.lineWidth = 3;
    ctx.strokeRect(14, 14, w - 28, h - 28);
    ctx.fillStyle = '#d7ff43';
    ctx.fillRect(34, 40, 108, 7);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#f5eedb';
    ctx.font = '900 132px "Arial Black", "Helvetica Neue", sans-serif';
    ctx.fillText('VENICE', 40, 178);
    ctx.fillStyle = '#d7ff43';
    ctx.font = '700 34px "Arial Black", sans-serif';
    ctx.fillText('SKATE PLAZA', 44, 218);
    ctx.fillStyle = 'rgba(245,238,219,.72)';
    ctx.font = '600 20px monospace';
    ctx.fillText('EST. 1986  ·  OCEAN FRONT WALK', 600, 218);
    ctx.textAlign = 'center';
  });
}

function makePlazaArch(scene) {
  const g = new THREE.Group();
  const steel = std(0x244a43, .45, .5);
  const rust = std(0x8a5a3c, .78, .15);
  for (const x of [-6.6, 6.6]) {
    g.add(mesh(new THREE.CylinderGeometry(.15, .21, 6.5, 10), steel, x, 3.25, 0));
    g.add(mesh(new THREE.CylinderGeometry(.46, .58, .4, 12), std(0x8b8272, .82), x, .2, 0));
    g.add(mesh(new THREE.CylinderGeometry(.24, .24, .14, 10), rust, x, 6.52, 0));
  }
  g.add(mesh(new THREE.BoxGeometry(13.95, .32, .36), steel, 0, 6.5, 0));
  for (const x of [-4.4, 0, 4.4]) {
    g.add(mesh(new THREE.BoxGeometry(.06, .9, .06), steel, x, 5.98, 0));
  }
  const tex = makePlazaSignTexture();
  const signMat = new THREE.MeshStandardMaterial({
    map: tex, roughness: .68, metalness: .04, side: THREE.DoubleSide,
    emissive: new THREE.Color(0x8a6a3c), emissiveMap: tex, emissiveIntensity: .18
  });
  g.add(mesh(new THREE.PlaneGeometry(12.6, 3.15), signMat, 0, 4.55, .05, false, false));

  // Little warm bulbs under the beam
  const bulbMat = new THREE.MeshBasicMaterial({ color: 0xffd88a, toneMapped: false });
  for (let i = 0; i < 10; i++) {
    g.add(mesh(new THREE.SphereGeometry(.06, 6, 5), bulbMat, -6 + i * 1.33, 6.28, .22, false, false));
  }

  g.position.set(0, -.24, -43.5);
  g.rotation.y = .015;
  scene.add(g);
  return g;
}

function makeLifeguardTower(scene) {
  const g = new THREE.Group();
  const wood = std(0x8d6a45, .9);
  for (const x of [-1.1, 1.1]) {
    for (const z of [-1, 1]) {
      const leg = mesh(new THREE.CylinderGeometry(.09, .11, 3.4, 6), wood, x, 1.7, z);
      g.add(leg);
    }
  }
  const cab = mesh(new THREE.BoxGeometry(3, 1.8, 2.6), std(0xe9dbc0, .82), 0, 3.8, 0);
  g.add(cab);
  const roof = mesh(new THREE.BoxGeometry(3.7, .14, 3.3), std(0xd85a3a, .8), 0, 4.8, 0);
  roof.rotation.x = -.08;
  g.add(roof);
  const windowMat = std(0x244b4d, .25, .3, { emissive: 0x102c2c, emissiveIntensity: .4 });
  g.add(mesh(new THREE.BoxGeometry(1.8, .75, .04), windowMat, 0, 4.02, 1.31));
  const rail = mesh(new THREE.BoxGeometry(3.2, .08, .1), std(0x6c563d, .8), 0, 3.2, 1.35);
  g.add(rail);
  g.position.set(16, 0, -47);
  g.rotation.y = .1;
  scene.add(g);
  return g;
}

function makeSeagull(scene, idx) {
  const g = new THREE.Group();
  const mat = new THREE.MeshBasicMaterial({ color: 0xf6ecd5, side: THREE.DoubleSide, toneMapped: false });
  const wingGeo = new THREE.BufferGeometry();
  wingGeo.setAttribute('position', new THREE.Float32BufferAttribute([
    0, 0, .1, -.8, .16, -.1, -.06, 0, -.18,
    0, 0, .1, .06, 0, -.18, .8, .16, -.1
  ], 3));
  const wings = new THREE.Mesh(wingGeo, mat);
  g.add(wings);
  const body = mesh(new THREE.SphereGeometry(.08, 6, 4), std(0xf8eed8, .8), 0, 0, 0, false, false);
  body.scale.set(.7, .55, 1.5);
  g.add(body);
  g.userData = { idx, phase: idx * 1.9, radius: 34 + idx * 6, height: 17 + idx * 3, speed: .04 + idx * .007, dynamic: true };
  g.position.set(0, 20, -10);
  scene.add(g);
  return g;
}

function createEnvironment(renderer) {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 256;
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0, '#2c7c87');
  g.addColorStop(.42, '#e9a278');
  g.addColorStop(.54, '#ffd19a');
  g.addColorStop(.58, '#76605a');
  g.addColorStop(1, '#112d2d');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 512, 256);
  const sg = ctx.createRadialGradient(352, 140, 4, 352, 140, 72);
  sg.addColorStop(0, '#fff7d7');
  sg.addColorStop(.2, '#ffd487');
  sg.addColorStop(.55, 'rgba(255,155,80,.45)');
  sg.addColorStop(1, 'rgba(255,120,60,0)');
  ctx.fillStyle = sg;
  ctx.fillRect(280, 68, 150, 150);
  const tex = new THREE.CanvasTexture(c);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromEquirectangular(tex).texture;
  pmrem.dispose();
  tex.dispose();
  return env;
}

export function createWorld(scene, renderer) {
  const concrete = makeConcreteTexture();
  const asphalt = makeAsphaltTexture();
  const tile = makeTileTexture();
  const sand = makeSandTexture();
  const mural = makeMuralTexture();
  const graffiti = makeGraffitiTexture();
  const glowTex = makeGlowTexture();
  const shadowTex = makeShadowTexture();
  const sparksTex = makeSparksTexture();
  makeGripTexture(); // warmed for the skater module

  scene.environment = createEnvironment(renderer);
  scene.environmentIntensity = .5;
  scene.fog = new THREE.FogExp2(0xdf9f78, .0016);

  const skyInfo = buildSky(scene);
  const oceanInfo = buildOcean(scene);

  const cloudTex = makeCloudTexture();
  const clouds = [];
  for (let i = 0; i < 7; i++) {
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({
      map: cloudTex, transparent: true, depthWrite: false, opacity: .45 + Math.random() * .25, color: 0xffcdb0
    }));
    sp.position.set(-120 + i * 40 + Math.random() * 20, 22 + Math.random() * 18, -170 - Math.random() * 90);
    sp.scale.set(70 + Math.random() * 60, 24 + Math.random() * 15, 1);
    scene.add(sp);
    clouds.push(sp);
  }

  const sunSprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTex, color: 0xffd28c, transparent: true, opacity: .72, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false
  }));
  sunSprite.position.copy(skyInfo.sunDir).multiplyScalar(420);
  sunSprite.scale.set(56, 56, 1);
  scene.add(sunSprite);

  const sunHalo = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTex, color: 0xff8a45, transparent: true, opacity: .34, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false
  }));
  sunHalo.position.copy(skyInfo.sunDir).multiplyScalar(415);
  sunHalo.scale.set(210, 210, 1);
  scene.add(sunHalo);

  const hemi = new THREE.HemisphereLight(0xffd0a0, 0x14302c, .44);
  scene.add(hemi);
  const ambient = new THREE.AmbientLight(0x476a60, .13);
  scene.add(ambient);

  const sun = new THREE.DirectionalLight(0xffc286, 4.6);
  sun.position.set(-26, 24, -56);
  sun.castShadow = true;
  sun.shadow.mapSize.set(window.innerWidth < 900 ? 1024 : 2048, window.innerWidth < 900 ? 1024 : 2048);
  sun.shadow.camera.near = 2;
  sun.shadow.camera.far = 130;
  sun.shadow.camera.left = -36;
  sun.shadow.camera.right = 36;
  sun.shadow.camera.top = 38;
  sun.shadow.camera.bottom = -38;
  sun.shadow.bias = -.00045;
  sun.shadow.normalBias = .035;
  sun.shadow.radius = 3;
  scene.add(sun);
  scene.add(sun.target);
  sun.target.position.set(0, 0, 0);

  const rim = new THREE.DirectionalLight(0x7fd2c9, .62);
  rim.position.set(-30, 18, 30);
  scene.add(rim);

  const cameraFill = new THREE.DirectionalLight(0xffd7b5, .58);
  cameraFill.position.set(6, 12, 42);
  scene.add(cameraFill);

  const fill = new THREE.PointLight(0xff8b4c, 8, 35, 2);
  fill.position.set(-24, 5, -30);
  scene.add(fill);

  buildGround(scene, concrete, asphalt, tile, sand);
  buildWalls(scene, concrete, mural, graffiti);

  // Facades
  const facadeTextures = [
    makeFacadeTexture(1, '#d7a57f', '#f2e2c6'),
    makeFacadeTexture(2, '#c98d6d', '#e9d3b3'),
    makeFacadeTexture(3, '#8fa58c', '#e9e2cf'),
    makeFacadeTexture(4, '#d2b387', '#f4e8cf')
  ];
  const buildings = [
    [-43, 25, 16, 12, 19, 0, true], [-45, 8, 18, 13, 27, 1, false], [-41, -10, 15, 12, 13, 2, true],
    [-46, -27, 20, 15, 22, 3, false], [43, 26, 17, 13, 17, 3, false], [46, 8, 18, 12, 25, 1, true],
    [41, -11, 15, 12, 12, 0, false], [46, -28, 21, 15, 20, 2, true],
    [-60, -45, 22, 16, 12, 1, false], [63, -43, 24, 18, 15, 0, false]
  ];
  for (const [x, z, w, d, h, ci, neon] of buildings) {
    buildBuilding(scene, facadeTextures, x, z, w, d, h, ci, neon);
  }

  // Distant skyline silhouettes
  const farMat = std(0x5e5c50, .95);
  for (let i = 0; i < 18; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const x = side * (62 + Math.floor(i / 2) * 11 + Math.random() * 4);
    const h = 7 + Math.random() * 16;
    const b = mesh(new THREE.BoxGeometry(8 + Math.random() * 6, h, 8), farMat, x, h / 2 - .4, -94 - Math.random() * 16, false, false);
    scene.add(b);
  }

  // Obstacles
  const concreteMat = new THREE.MeshStandardMaterial({ map: concrete, color: 0xd8cdb7, roughness: .9, bumpMap: concrete, bumpScale: .03 });
  const accentMat = std(0xd7ff43, .72);
  const coralMat = std(0xe15636, .75);

  const ramps = [
    { x: 0, z: -24.5, yaw: 0, width: 4.8, length: 5.6, height: 1.35, launch: 7.6 },
    { x: 21, z: 16.5, yaw: 0, width: 3.7, length: 4.4, height: 1.0, launch: 6.4 },
    { x: -20.5, z: -7.5, yaw: Math.PI / 2, width: 8.2, length: 7.4, height: 2.1, launch: 7.0 },
    { x: 25.8, z: -19.5, yaw: -Math.PI / 2, width: 9.0, length: 7.8, height: 2.35, launch: 7.4 }
  ];
  for (const r of ramps) buildRamp(scene, r, concreteMat, r.width > 8 ? coralMat : accentMat);

  const platforms = [
    { x: 11.5, z: -12, w: 7.2, d: 5.4, y: .42 }
  ];
  makeFunbox(scene, 11.5, -12, 7.2, 5.4, .42, concreteMat, accentMat);

  makeLedge(scene, -28, 15, 2.2, 7.5, .5, 0, concreteMat, accentMat);
  makeLedge(scene, 28, 4, 1.4, 7.2, .42, 0, concreteMat, coralMat);
  makeLedge(scene, -13, 27, 6.2, 1.5, .55, 0, concreteMat, accentMat);

  const rails = [
    { a: [-6, 6], b: [-6, -6], y: .58, style: 'rail' },
    { a: [16.4, 7], b: [16.4, -6.2], y: .58, style: 'rail' },
    { a: [-15, -18], b: [-24, -18], y: .52, style: 'flat' },
    { a: [16, 11], b: [24, 11], y: .5, style: 'rail' }
  ];
  for (const r of rails) makeRail(scene, r.a, r.b, r.y, r.style);

  // A-frame sign / props
  const props = new THREE.Group();
  makeBench(scene, -28.5, -20, Math.PI / 2);
  makeBench(scene, 28.4, -16, -Math.PI / 2);
  makeBench(scene, -28.4, 24, Math.PI / 2);
  makePlanter(scene, -29.5, 29, 1.1);
  makePlanter(scene, 29.2, 29, .95);
  makePlanter(scene, 29.3, -29, 1.05);
  makePlanter(scene, -29.4, -33, .9);
  makeTrash(scene, 26.7, 24.5);
  makeTrash(scene, -27, -1.5);
  makeCone(scene, 8.3, 2.2);
  makeCone(scene, 9.2, 3.0);
  makeCone(scene, 20.3, -6.2);
  makeUmbrella(scene, -20, -49, 0xff5b3a);
  makeUmbrella(scene, -8, -51, 0xd7ff43);
  makeUmbrella(scene, 8, -48, 0x2b9a91);
  makeUmbrella(scene, -1.5, -52, 0xf0c04a);
  makeUmbrella(scene, 14.5, -50.5, 0xe15636);
  scene.add(props);

  addGroundGrime(scene);

  // Palms
  const palms = [];
  const palmDefs = [
    [-26.5, 29, 1.1, .2, 1], [27.5, 27, 1.0, -.24, 2], [-29, -29, 1.16, .28, 3],
    [28.5, -30, 1.12, -.18, 4], [-24, 12, .88, .1, 5], [24.5, -2, .94, -.16, 6],
    [-18, -44, 1.2, .2, 7], [13, -45, 1.06, -.3, 8], [-45, -45, 1.4, .1, 9],
    [12.2, -4.5, .92, -.14, 10], [-13.2, -17, 1.02, .17, 11]
  ];
  for (const [x, z, s, lean, seed] of palmDefs) palms.push(makePalm(scene, x, z, s, lean, seed));

  // Lifeguard tower + ferris wheel
  makePlazaArch(scene);
  makeLifeguardTower(scene);
  const ferris = makeFerrisWheel(scene);

  // Seagulls
  const gulls = [];
  for (let i = 0; i < 6; i++) gulls.push(makeSeagull(scene, i));

  // Tapes
  const tapeDefs = [
    [2.6, 12], [-6, 2], [16.4, 3], [11.5, -12], [0, -28.6], [-20.5, -7.5],
    [25.8, -19.5], [-25, 21], [26, 28], [-11, -32], [12, -32], [21, 16.5]
  ];
  const tapes = tapeDefs.map(([x, z], i) => makeTape(scene, glowTex, x, 1.18, z, i));
  // Put some tapes at rail / ramp / platform height
  tapes[1].position.y = tapes[1].userData.baseY = 1.55;
  tapes[2].position.y = tapes[2].userData.baseY = 1.55;
  tapes[3].position.y = tapes[3].userData.baseY = 1.65;
  tapes[4].position.y = tapes[4].userData.baseY = 2.45;
  tapes[5].position.y = tapes[5].userData.baseY = 3.2;
  tapes[6].position.y = tapes[6].userData.baseY = 3.35;
  tapes[11].position.y = tapes[11].userData.baseY = 2.1;

  // Ground contact shadow texture shared
  const shadowMat = new THREE.MeshBasicMaterial({
    map: shadowTex, transparent: true, depthWrite: false, opacity: .66, blending: THREE.NormalBlending
  });
  // Slight ambient dust motes
  const dustCount = 150;
  const dustPositions = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i++) {
    dustPositions[i * 3] = (Math.random() - .5) * 60;
    dustPositions[i * 3 + 1] = .2 + Math.random() * 8;
    dustPositions[i * 3 + 2] = (Math.random() - .5) * 60;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
  const dustMat = new THREE.PointsMaterial({
    color: 0xffdca8, size: .035, transparent: true, opacity: .5, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true
  });
  const dust = new THREE.Points(dustGeo, dustMat);
  scene.add(dust);

  const bounds = { minX: -31.4, maxX: 31.4, minZ: -37.4, maxZ: 31.4 };

  function surfaceAt(x, z) {
    let h = 0;
    let ramp = null;
    for (const r of ramps) {
      const dx = x - r.x, dz = z - r.z;
      const c = Math.cos(r.yaw), s = Math.sin(r.yaw);
      const lx = c * dx - s * dz;
      const lz = s * dx + c * dz;
      if (Math.abs(lx) <= r.width / 2 && Math.abs(lz) <= r.length / 2) {
        const t = Math.min(1, Math.max(0, (r.length / 2 - lz) / r.length));
        const rh = r.height * t;
        if (rh > h) { h = rh; ramp = r; }
      }
    }
    for (const p of platforms) {
      const halfW = p.w / 2, halfD = p.d / 2;
      if (Math.abs(x - p.x) <= halfW && Math.abs(z - p.z) <= halfD) {
        if (p.y > h) { h = p.y; ramp = null; }
      }
    }
    return { height: h, ramp };
  }

  const _m = new THREE.Matrix4();
  function update(dt, elapsed, playerPos, camera) {
    skyInfo.uniforms.uTime.value = elapsed;
    oceanInfo.mat.uniforms.uTime.value = elapsed;

    // Slow cinematic sky drift
    sunSprite.position.copy(skyInfo.sunDir).multiplyScalar(420);
    for (let i = 0; i < clouds.length; i++) {
      const c = clouds[i];
      c.position.x += dt * (.12 + i * .008);
      if (c.position.x > 155) c.position.x = -155;
    }

    for (const p of palms) {
      p.crown.rotation.z = Math.sin(elapsed * .55 + p.phase) * .014;
      p.crown.rotation.x = Math.cos(elapsed * .4 + p.phase) * .01;
    }
    ferris.wheel.rotation.z += dt * .035;
    for (const gull of gulls) {
      const u = gull.userData;
      const a = elapsed * u.speed + u.phase;
      gull.position.set(Math.cos(a) * u.radius, u.height + Math.sin(a * 2.3) * 1.2, -15 + Math.sin(a) * u.radius * .55);
      gull.rotation.y = -a;
      gull.rotation.z = Math.sin(a * 2) * .12;
      gull.children[0].rotation.z = Math.sin(elapsed * 8 + u.phase) * .4;
      gull.children[0].children?.forEach?.(() => {});
    }
    for (const tape of tapes) {
      if (tape.userData.collected) continue;
      tape.rotation.y = elapsed * 1.2 + tape.userData.phase;
      tape.position.y = tape.userData.baseY + Math.sin(elapsed * 2.2 + tape.userData.phase) * .12;
      tape.userData.ring.rotation.z = elapsed * 2.3;
      tape.userData.glow.material.opacity = .4 + Math.sin(elapsed * 3 + tape.userData.phase) * .12;
    }
    dust.rotation.y = elapsed * .01;
    dust.material.opacity = .38 + Math.sin(elapsed * .5) * .08;

    if (playerPos) {
      sun.target.position.set(playerPos.x, 0, playerPos.z);
      sun.position.set(playerPos.x - 26, 24, playerPos.z - 56);
      sun.target.updateMatrixWorld();
      // Keep fog from washing out foreground but preserve distance haze
      scene.fog.density = .0021;
    }
  }

  function collectTape(tape) {
    tape.userData.collected = true;
    tape.visible = false;
  }

  // Batch static geometry by material to keep draw calls low on phones.
  mergeStaticScene(scene);

  return {
    update,
    surfaceAt,
    collectTape,
    ramps,
    rails,
    platforms,
    tapes,
    bounds,
    sun,
    sunDir: skyInfo.sunDir,
    shadowTex,
    glowTex,
    sparksTex,
    shadowMat,
    concreteTexture: concrete,
    palette: { ink: 0x07100d, lime: 0xd7ff43, coral: 0xff5b3a, paper: 0xf5eedb }
  };
}
