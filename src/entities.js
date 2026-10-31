import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _e = new THREE.Euler();
const _v = new THREE.Vector3();
const _s = new THREE.Vector3(1, 1, 1);

let blobTexture = null;
export function getBlobTexture() {
  if (blobTexture) return blobTexture;
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(64, 64, 2, 64, 64, 62);
  grad.addColorStop(0, 'rgba(0,0,0,0.5)');
  grad.addColorStop(0.45, 'rgba(0,0,0,0.28)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  blobTexture = new THREE.CanvasTexture(c);
  return blobTexture;
}

export function makeBlobShadow(radius = 1, opacity = 0.55) {
  const mat = new THREE.MeshBasicMaterial({
    map: getBlobTexture(), transparent: true, opacity, depthWrite: false,
    polygonOffset: true, polygonOffsetFactor: -2, color: 0x000000
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(radius * 2, radius * 2), mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = 0.025;
  mesh.renderOrder = 1;
  return mesh;
}

function colorize(geometry, color) {
  const c = new THREE.Color(color);
  const count = geometry.attributes.position.count;
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    arr[i * 3] = c.r; arr[i * 3 + 1] = c.g; arr[i * 3 + 2] = c.b;
  }
  geometry.setAttribute('color', new THREE.BufferAttribute(arr, 3));
  return geometry;
}

function part(list, geometry, color, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) {
  let g = geometry.clone();
  if (g.index) g = g.toNonIndexed();
  g.deleteAttribute('uv');
  g.deleteAttribute('uv1');
  g.deleteAttribute('uv2');
  colorize(g, color);
  _e.set(rx, ry, rz);
  _q.setFromEuler(_e);
  _m.compose(_v.set(x, y, z), _q, _s);
  g.applyMatrix4(_m);
  list.push(g);
  geometry.dispose();
  return g;
}

function mergeParts(parts, material) {
  const merged = mergeGeometries(parts, false);
  parts.forEach((p) => p.dispose());
  const mesh = new THREE.Mesh(merged, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

const carPaint = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.34, metalness: 0.38 });
const carGlass = new THREE.MeshStandardMaterial({ color: 0x17202d, roughness: 0.18, metalness: 0.55 });
const carTrim = new THREE.MeshStandardMaterial({ color: 0x101116, roughness: 0.6, metalness: 0.2 });
const tireMat = new THREE.MeshStandardMaterial({ color: 0x0b0b0e, roughness: 0.92 });
const rimMat = new THREE.MeshStandardMaterial({ color: 0xb7b8bd, roughness: 0.28, metalness: 0.8 });
const headMat = new THREE.MeshBasicMaterial({ color: 0xfff2c4 });
const tailMat = new THREE.MeshBasicMaterial({ color: 0xff2b32 });
const copLightRed = new THREE.MeshBasicMaterial({ color: 0xff1a2c });
const copLightBlue = new THREE.MeshBasicMaterial({ color: 0x1c8bff });

export function makeCar({ color = 0xff6b35, type = 'sport', detailed = false, police = false, mission = false } = {}) {
  const group = new THREE.Group();
  const body = new THREE.Group();
  group.add(body);

  const isSport = type === 'sport';
  const isSUV = type === 'suv';
  const width = isSUV ? 2.05 : 1.92;
  const length = isSUV ? 4.5 : 4.15;
  const bodyH = isSUV ? 0.62 : 0.45;
  const baseY = isSUV ? 0.64 : 0.52;

  if (detailed) {
    const paint = new THREE.MeshStandardMaterial({ color, roughness: 0.28, metalness: 0.5 });
    const main = new THREE.Mesh(new RoundedBoxGeometry(width, bodyH, length, 2, 0.16), paint);
    main.position.y = baseY;
    main.castShadow = true; main.receiveShadow = true;
    body.add(main);

    const nose = new THREE.Mesh(new RoundedBoxGeometry(width * 0.92, bodyH * 0.62, 0.8, 2, 0.1), paint);
    nose.position.set(0, baseY - 0.03, length * 0.44);
    body.add(nose);

    const cabin = new THREE.Mesh(new RoundedBoxGeometry(width * 0.82, isSUV ? 0.75 : 0.56, isSport ? 2.0 : 2.4, 2, 0.15), carGlass);
    cabin.position.set(0, baseY + bodyH * 0.5 + (isSUV ? 0.32 : 0.24), isSport ? -0.18 : -0.08);
    body.add(cabin);

    const roof = new THREE.Mesh(new RoundedBoxGeometry(width * 0.8, 0.11, isSport ? 1.65 : 2.1, 2, 0.05), paint);
    roof.position.set(0, baseY + bodyH * 0.5 + (isSUV ? 0.7 : 0.53), isSport ? -0.2 : -0.1);
    body.add(roof);

    const bumperF = new THREE.Mesh(new RoundedBoxGeometry(width * 0.98, 0.16, 0.26, 2, 0.04), carTrim);
    bumperF.position.set(0, baseY - bodyH * 0.32, length * 0.51);
    body.add(bumperF);
    const bumperB = bumperF.clone();
    bumperB.position.z = -length * 0.51;
    body.add(bumperB);

    const lightGeo = new THREE.BoxGeometry(0.42, 0.13, 0.05);
    const hl1 = new THREE.Mesh(lightGeo, headMat); hl1.position.set(-width * 0.34, baseY + 0.02, length * 0.505); body.add(hl1);
    const hl2 = hl1.clone(); hl2.position.x = width * 0.34; body.add(hl2);
    const tl1 = new THREE.Mesh(lightGeo, tailMat); tl1.position.set(-width * 0.34, baseY + 0.04, -length * 0.505); body.add(tl1);
    const tl2 = tl1.clone(); tl2.position.x = width * 0.34; body.add(tl2);

    if (isSport) {
      const spoiler = new THREE.Mesh(new THREE.BoxGeometry(width * 0.88, 0.06, 0.34), carTrim);
      spoiler.position.set(0, baseY + 0.54, -length * 0.43);
      body.add(spoiler);
      const standL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.3, 0.06), carTrim);
      standL.position.set(-width * 0.3, baseY + 0.37, -length * 0.43); body.add(standL);
      const standR = standL.clone(); standR.position.x = width * 0.3; body.add(standR);
      const skirt = new THREE.Mesh(new THREE.BoxGeometry(width * 1.01, 0.1, length * 0.72), carTrim);
      skirt.position.y = baseY - bodyH * 0.5 + 0.02; body.add(skirt);
    }

    if (mission) {
      const glow = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.045, 3.35), new THREE.MeshBasicMaterial({
        color: 0xff6a1a, toneMapped: false
      }));
      glow.position.y = 0.22; group.add(glow);
      const glowEdge = new THREE.Mesh(new THREE.BoxGeometry(2.05, 0.035, 3.9), new THREE.MeshBasicMaterial({
        color: 0xff3d12, transparent: true, opacity: 0.42, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false
      }));
      glowEdge.position.y = 0.12; group.add(glowEdge);
    }

    if (police) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.12, 0.24), carTrim);
      bar.position.set(0, baseY + bodyH * 0.5 + (isSUV ? 0.82 : 0.65), isSport ? -0.2 : -0.1);
      body.add(bar);
      const red = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.13, 0.2), copLightRed);
      red.position.set(-0.3, bar.position.y + 0.11, bar.position.z); body.add(red);
      const blue = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.13, 0.2), copLightBlue);
      blue.position.set(0.3, bar.position.y + 0.11, bar.position.z); body.add(blue);
      body.userData.copLights = [red, blue];
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(width * 1.005, 0.2, length * 0.5), new THREE.MeshStandardMaterial({ color: 0xf1e6d0, roughness: 0.5 }));
      stripe.position.set(0, baseY, -0.1); body.add(stripe);
    }

    const wheels = [];
    const wheelGeo = new THREE.CylinderGeometry(isSUV ? 0.43 : 0.37, isSUV ? 0.43 : 0.37, 0.3, 14);
    wheelGeo.rotateZ(Math.PI / 2);
    const hubGeo = new THREE.CylinderGeometry(isSUV ? 0.2 : 0.17, isSUV ? 0.2 : 0.17, 0.315, 10);
    hubGeo.rotateZ(Math.PI / 2);
    for (const [wx, wz] of [[-width * 0.51, length * 0.32], [width * 0.51, length * 0.32], [-width * 0.51, -length * 0.32], [width * 0.51, -length * 0.32]]) {
      const wheel = new THREE.Group();
      const tire = new THREE.Mesh(wheelGeo, tireMat);
      tire.castShadow = true;
      const hub = new THREE.Mesh(hubGeo, rimMat);
      wheel.add(tire, hub);
      wheel.position.set(wx, isSUV ? 0.43 : 0.37, wz);
      group.add(wheel);
      wheels.push(wheel);
    }
    group.add(makeBlobShadow(length * 0.55, 0.45));
    group.userData.wheels = wheels;
    group.userData.body = body;
    group.userData.detailed = true;
    group.userData.copLights = body.userData.copLights || null;
    return group;
  }

  // Lightweight, merged car used for traffic and parked cars.
  const parts = [];
  const box = (w, h, d) => new RoundedBoxGeometry(w, h, d, 1, 0.1);
  part(parts, box(width, bodyH, length), color, 0, baseY, 0);
  part(parts, box(width * 0.9, bodyH * 0.55, 0.7), color, 0, baseY - 0.02, length * 0.45);
  part(parts, box(width * 0.78, isSUV ? 0.68 : 0.48, isSport ? 1.85 : 2.2), 0x1b2431, 0, baseY + bodyH * 0.5 + (isSUV ? 0.28 : 0.2), isSport ? -0.2 : -0.05);
  part(parts, box(width * 0.76, 0.1, isSport ? 1.55 : 2.0), color, 0, baseY + bodyH * 0.5 + (isSUV ? 0.64 : 0.45), isSport ? -0.22 : -0.08);
  part(parts, box(width * 0.98, 0.14, 0.22), 0x101116, 0, baseY - bodyH * 0.3, length * 0.51);
  part(parts, box(width * 0.98, 0.14, 0.22), 0x101116, 0, baseY - bodyH * 0.3, -length * 0.51);
  part(parts, box(0.38, 0.11, 0.05), 0xfff2c4, -width * 0.33, baseY + 0.02, length * 0.505);
  part(parts, box(0.38, 0.11, 0.05), 0xfff2c4, width * 0.33, baseY + 0.02, length * 0.505);
  part(parts, box(0.36, 0.1, 0.05), 0xff2b32, -width * 0.33, baseY + 0.04, -length * 0.505);
  part(parts, box(0.36, 0.1, 0.05), 0xff2b32, width * 0.33, baseY + 0.04, -length * 0.505);
  const wheelGeo = new THREE.CylinderGeometry(isSUV ? 0.42 : 0.36, isSUV ? 0.42 : 0.36, 0.28, 10);
  wheelGeo.rotateZ(Math.PI / 2);
  for (const [wx, wz] of [[-width * 0.51, length * 0.32], [width * 0.51, length * 0.32], [-width * 0.51, -length * 0.32], [width * 0.51, -length * 0.32]]) {
    part(parts, wheelGeo, 0x0a0a0d, wx, isSUV ? 0.42 : 0.36, wz);
  }
  const mesh = mergeParts(parts, carPaint);
  group.add(mesh);
  if (police) {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.1, 0.22), carTrim);
    bar.position.set(0, baseY + bodyH * 0.5 + (isSUV ? 0.8 : 0.62), isSport ? -0.2 : -0.1);
    group.add(bar);
    const red = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.12, 0.18), copLightRed);
    red.position.set(-0.29, bar.position.y + 0.1, bar.position.z); group.add(red);
    const blue = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.12, 0.18), copLightBlue);
    blue.position.set(0.29, bar.position.y + 0.1, bar.position.z); group.add(blue);
    group.userData.copLights = [red, blue];
  }
  group.add(makeBlobShadow(length * 0.55, 0.42));
  group.userData.body = group;
  group.userData.wheels = [];
  return group;
}

const skinMat = new THREE.MeshStandardMaterial({ color: 0xd39a74, roughness: 0.75 });
const darkMat = new THREE.MeshStandardMaterial({ color: 0x1b1524, roughness: 0.82 });
const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf4ead5, roughness: 0.78 });
const tealMat = new THREE.MeshStandardMaterial({ color: 0x1e6a6b, roughness: 0.72 });
const goldMat = new THREE.MeshStandardMaterial({ color: 0xd9a743, roughness: 0.4, metalness: 0.65 });
const gunMat = new THREE.MeshStandardMaterial({ color: 0x15161b, roughness: 0.42, metalness: 0.6 });

export function makePlayer() {
  const root = new THREE.Group();
  const body = new THREE.Group();
  root.add(body);

  const hips = new THREE.Mesh(new RoundedBoxGeometry(0.52, 0.22, 0.32, 2, 0.08), darkMat);
  hips.position.y = 0.88; body.add(hips);

  const torso = new THREE.Mesh(new RoundedBoxGeometry(0.66, 0.62, 0.36, 2, 0.12), whiteMat);
  torso.position.y = 1.24; body.add(torso);

  const jacket = new THREE.Mesh(new RoundedBoxGeometry(0.73, 0.5, 0.4, 2, 0.1), tealMat);
  jacket.position.set(0, 1.29, 0.005); body.add(jacket);
  const jacketOpen = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.5, 0.02), whiteMat);
  jacketOpen.position.set(0, 1.29, 0.205); body.add(jacketOpen);

  const chain = new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.018, 5, 10, Math.PI), goldMat);
  chain.position.set(0, 1.5, 0.2); chain.rotation.z = Math.PI; body.add(chain);

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.11, 0.12, 8), skinMat);
  neck.position.y = 1.61; body.add(neck);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.235, 12, 9), skinMat);
  head.scale.set(0.9, 1.06, 0.92); head.position.y = 1.79; body.add(head);
  const hair = new THREE.Mesh(new RoundedBoxGeometry(0.38, 0.14, 0.35, 2, 0.05), darkMat);
  hair.position.set(0, 1.96, -0.015); body.add(hair);
  const glasses = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.085, 0.045), darkMat);
  glasses.position.set(0, 1.82, 0.21); body.add(glasses);

  const arms = [];
  for (const side of [-1, 1]) {
    const pivot = new THREE.Group();
    pivot.position.set(side * 0.39, 1.45, 0);
    const upper = new THREE.Mesh(new RoundedBoxGeometry(0.17, 0.38, 0.19, 2, 0.06), tealMat);
    upper.position.y = -0.18; pivot.add(upper);
    const fore = new THREE.Mesh(new RoundedBoxGeometry(0.15, 0.34, 0.16, 2, 0.05), skinMat);
    fore.position.y = -0.51; pivot.add(fore);
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), skinMat);
    hand.position.y = -0.7; pivot.add(hand);
    body.add(pivot);
    arms.push(pivot);
  }

  const gun = new THREE.Group();
  gun.position.set(0.02, -0.76, 0.12);
  const barrel = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.09, 0.42), gunMat);
  barrel.position.z = 0.13; gun.add(barrel);
  const grip = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.22, 0.12), gunMat);
  grip.position.set(0, -0.1, -0.02); grip.rotation.x = -0.18; gun.add(grip);
  arms[1].add(gun);

  const legs = [];
  for (const side of [-1, 1]) {
    const pivot = new THREE.Group();
    pivot.position.set(side * 0.16, 0.9, 0);
    const thigh = new THREE.Mesh(new RoundedBoxGeometry(0.22, 0.43, 0.25, 2, 0.07), darkMat);
    thigh.position.y = -0.22; pivot.add(thigh);
    const shin = new THREE.Mesh(new RoundedBoxGeometry(0.19, 0.4, 0.21, 2, 0.06), darkMat);
    shin.position.y = -0.62; pivot.add(shin);
    const shoe = new THREE.Mesh(new RoundedBoxGeometry(0.22, 0.14, 0.37, 2, 0.05), whiteMat);
    shoe.position.set(0, -0.84, 0.07); pivot.add(shoe);
    body.add(pivot);
    legs.push(pivot);
  }

  body.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  root.add(makeBlobShadow(0.75, 0.5));
  root.userData = { body, arms, legs, gun, torso, jacket };
  return root;
}

export function animatePlayer(player, t, speed, aiming = false) {
  const { body, arms, legs } = player.userData;
  const moving = speed > 0.15;
  const stride = Math.sin(t * (moving ? 9.5 : 2)) * (moving ? 1 : 0.04);
  const amp = Math.min(1, speed / 4.5);
  legs[0].rotation.x = stride * 0.85 * amp;
  legs[1].rotation.x = -stride * 0.85 * amp;
  arms[0].rotation.x = -stride * 0.62 * amp - (aiming ? 0.2 : 0);
  arms[1].rotation.x = stride * 0.62 * amp - (aiming ? 1.28 : 0);
  arms[0].rotation.z = 0.08;
  arms[1].rotation.z = aiming ? -0.05 : -0.08;
  arms[1].rotation.x += aiming ? 0 : 0;
  body.position.y = moving ? Math.abs(Math.sin(t * 9.5)) * 0.045 : Math.sin(t * 2) * 0.012;
  body.rotation.z = moving ? Math.sin(t * 9.5) * 0.015 : 0;
  if (aiming) {
    arms[0].rotation.x = -1.15;
    arms[0].rotation.z = -0.38;
    arms[1].rotation.x = -1.28;
    arms[1].rotation.z = 0.28;
  }
}

const pedMaterials = {};
function pedMat(color) {
  if (!pedMaterials[color]) pedMaterials[color] = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.8 });
  return pedMaterials[color];
}

export function makeSimplePerson({ shirt = 0xcf5b4d, pants = 0x263040, skin = 0xc78e68, hat = null, cop = false, gang = false } = {}) {
  const parts = [];
  const add = (g, c, x, y, z, rx = 0, ry = 0, rz = 0) => part(parts, g, c, x, y, z, rx, ry, rz);
  const rbox = (w, h, d, r = 0.05) => new RoundedBoxGeometry(w, h, d, 1, r);
  add(rbox(0.21, 0.72, 0.23), pants, -0.14, 0.45, 0);
  add(rbox(0.21, 0.72, 0.23), pants, 0.14, 0.45, 0);
  add(rbox(0.24, 0.12, 0.35), 0x18131c, -0.14, 0.08, 0.05);
  add(rbox(0.24, 0.12, 0.35), 0x18131c, 0.14, 0.08, 0.05);
  add(rbox(0.54, 0.62, 0.31), shirt, 0, 1.13, 0);
  add(rbox(0.14, 0.55, 0.16), shirt, -0.36, 1.12, 0);
  add(rbox(0.14, 0.55, 0.16), shirt, 0.36, 1.12, 0);
  add(new THREE.SphereGeometry(0.105, 8, 6), skin, -0.36, 0.79, 0);
  add(new THREE.SphereGeometry(0.105, 8, 6), skin, 0.36, 0.79, 0);
  add(new THREE.CylinderGeometry(0.08, 0.09, 0.1, 7), skin, 0, 1.49, 0);
  add(new THREE.SphereGeometry(0.22, 9, 7), skin, 0, 1.65, 0);
  add(rbox(0.35, 0.1, 0.33), hat != null ? hat : (cop ? 0x1c2a4a : (gang ? 0x17141d : 0x2a2027)), 0, 1.82, -0.01);
  if (cop) {
    add(rbox(0.58, 0.18, 0.34), 0x16213c, 0, 1.36, 0);
    add(rbox(0.38, 0.08, 0.04), 0x10182c, 0, 1.34, 0.19);
    add(rbox(0.15, 0.12, 0.4), 0x111318, 0.38, 1.05, 0.12);
  }
  if (gang) {
    add(rbox(0.2, 0.1, 0.04), 0xff3d5a, 0, 1.3, 0.18);
  }
  const mesh = mergeParts(parts, pedMat(0xffffff));
  const group = new THREE.Group();
  group.add(mesh);
  group.add(makeBlobShadow(0.55, 0.42));
  group.userData.bob = Math.random() * Math.PI * 2;
  return group;
}

export function makeHelicopter() {
  const group = new THREE.Group();
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x1b2435, roughness: 0.45, metalness: 0.45 });
  const accentMat = new THREE.MeshStandardMaterial({ color: 0xe7d8b8, roughness: 0.6 });
  const body = new THREE.Mesh(new RoundedBoxGeometry(1.9, 1.25, 3.2, 2, 0.35), bodyMat);
  group.add(body);
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.8, 12, 8), bodyMat);
  nose.scale.set(1, 0.85, 1.1); nose.position.set(0, 0, 1.4); group.add(nose);
  const glass = new THREE.Mesh(new THREE.SphereGeometry(0.68, 12, 8), carGlass);
  glass.scale.set(1.05, 0.8, 1); glass.position.set(0, 0.12, 1.62); group.add(glass);
  const tail = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.38, 3.6), bodyMat);
  tail.position.set(0, 0.2, -2.6); group.add(tail);
  const fin = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.15, 0.8), accentMat);
  fin.position.set(0, 0.6, -4.1); group.add(fin);
  const skidL = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 2.4, 6), bodyMat);
  skidL.rotation.x = Math.PI / 2; skidL.position.set(-0.9, -0.9, 0.1); group.add(skidL);
  const skidR = skidL.clone(); skidR.position.x = 0.9; group.add(skidR);
  const strutL = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.7, 0.09), bodyMat);
  strutL.position.set(-0.72, -0.55, 0.1); group.add(strutL);
  const strutR = strutL.clone(); strutR.position.x = 0.72; group.add(strutR);

  const rotor = new THREE.Group();
  rotor.position.set(0, 0.9, 0);
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.55, 6), bodyMat);
  mast.position.y = 0.25; rotor.add(mast);
  for (let i = 0; i < 2; i++) {
    const blade = new THREE.Mesh(new THREE.BoxGeometry(5.8, 0.04, 0.2), carTrim);
    blade.rotation.y = i * Math.PI / 2; rotor.add(blade);
  }
  group.add(rotor);

  const tailRotor = new THREE.Group();
  tailRotor.position.set(0.2, 0.55, -4.15);
  for (let i = 0; i < 2; i++) {
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.4, 0.14), carTrim);
    blade.rotation.x = i * Math.PI / 2; tailRotor.add(blade);
  }
  group.add(tailRotor);

  const beam = new THREE.Mesh(new THREE.ConeGeometry(3.4, 26, 18, 1, true), new THREE.MeshBasicMaterial({
    color: 0xcfe9ff, transparent: true, opacity: 0.11, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending
  }));
  beam.position.set(0, -13, 0);
  beam.rotation.x = Math.PI;
  group.add(beam);
  group.userData = { rotor, tailRotor, beam };
  group.traverse((o) => { if (o.isMesh) { o.castShadow = true; } });
  return group;
}

export function makeMarker(color = 0x65f3e0) {
  const group = new THREE.Group();
  const ringMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9, side: THREE.DoubleSide, depthWrite: false });
  const ring = new THREE.Mesh(new THREE.RingGeometry(2.2, 2.55, 40), ringMat);
  ring.rotation.x = -Math.PI / 2; ring.position.y = 0.04; group.add(ring);
  const inner = new THREE.Mesh(new THREE.CircleGeometry(2.1, 32), new THREE.MeshBasicMaterial({
    color, transparent: true, opacity: 0.1, depthWrite: false, blending: THREE.AdditiveBlending
  }));
  inner.rotation.x = -Math.PI / 2; inner.position.y = 0.03; group.add(inner);
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 2.3, 18, 24, 1, true), new THREE.MeshBasicMaterial({
    color, transparent: true, opacity: 0.14, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending
  }));
  beam.position.y = 9; group.add(beam);
  const diamond = new THREE.Mesh(new THREE.OctahedronGeometry(0.5, 0), new THREE.MeshBasicMaterial({ color }));
  diamond.position.y = 3.1; group.add(diamond);
  group.userData = { ring, inner, beam, diamond, baseY: 3.1 };
  return group;
}
