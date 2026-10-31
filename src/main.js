import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

/* -------------------------------------------------------------------------- */
/*  Casa Aurelia — a mobile-first real-time house                              */
/* -------------------------------------------------------------------------- */

const canvas = document.getElementById('scene');
const loaderEl = document.getElementById('loader');
const barFill = document.getElementById('bar-fill');
const loadPct = document.getElementById('load-pct');
const loadNote = document.getElementById('load-note');
const hintEl = document.getElementById('hint');
const rotateBtn = document.getElementById('rotate-btn');
const lightBtn = document.getElementById('light-btn');
const infoBtn = document.getElementById('info-btn');
const infoPanel = document.getElementById('info-panel');
const infoClose = document.getElementById('info-close');
const errorEl = document.getElementById('error');
const retryBtn = document.getElementById('retry-btn');
const presetButtons = [...document.querySelectorAll('[data-preset]')];

const MODEL_URL = `${import.meta.env.BASE_URL}models/casa-aurelia.glb`;
const isTouch = window.matchMedia('(pointer: coarse)').matches;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const forceLoader = new URLSearchParams(window.location.search).has('loader');

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const lerp = (a, b, t) => a + (b - a) * t;
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

function mulberry32(seed) {
  let a = seed;
  return function random() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rng = mulberry32(20261031);

/* -------------------------------------------------------------------------- */
/*  Renderer                                                                  */
/* -------------------------------------------------------------------------- */

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: false,
  powerPreference: 'high-performance',
  stencil: false,
});

let pixelRatio = Math.min(window.devicePixelRatio || 1, isTouch ? 2 : 1.8);
renderer.setPixelRatio(pixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setClearColor(0x0d1512, 1);

const maxAnisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());

/* -------------------------------------------------------------------------- */
/*  Scene & camera                                                            */
/* -------------------------------------------------------------------------- */

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0xbcd0cf, 0.0125);

function fovForViewport() {
  return window.innerWidth / window.innerHeight < 0.8 ? 50 : 38;
}

const camera = new THREE.PerspectiveCamera(
  fovForViewport(),
  window.innerWidth / window.innerHeight,
  0.1,
  400,
);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.055;
controls.enablePan = false;
controls.minDistance = 7;
controls.maxDistance = 95;
controls.minPolarAngle = Math.PI * 0.14;
controls.maxPolarAngle = Math.PI * 0.495;
controls.rotateSpeed = 0.58;
controls.zoomSpeed = 0.8;
controls.autoRotate = !reducedMotion;
controls.autoRotateSpeed = 0.52;
controls.target.set(0, 3, 0);

let autoRotateWanted = !reducedMotion;
let resumeTimer = 0;
let userInteracted = false;

/* -------------------------------------------------------------------------- */
/*  Sky                                                                       */
/* -------------------------------------------------------------------------- */

const skyUniforms = {
  uTop: { value: new THREE.Color(0x1e5f9e) },
  uHorizon: { value: new THREE.Color(0xa9cfe0) },
  uBottom: { value: new THREE.Color(0x6c7d5e) },
  uSunColor: { value: new THREE.Color(0xfff0c8) },
  uSunDirection: { value: new THREE.Vector3(-0.47, 0.73, 0.47).normalize() },
  uSunIntensity: { value: 1.0 },
};

const skyMaterial = new THREE.ShaderMaterial({
  uniforms: skyUniforms,
  side: THREE.BackSide,
  depthWrite: false,
  fog: false,
  vertexShader: /* glsl */ `
    varying vec3 vWorldPosition;
    void main() {
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform vec3 uTop;
    uniform vec3 uHorizon;
    uniform vec3 uBottom;
    uniform vec3 uSunColor;
    uniform vec3 uSunDirection;
    uniform float uSunIntensity;
    varying vec3 vWorldPosition;

    void main() {
      vec3 dir = normalize(vWorldPosition - cameraPosition);
      float h = clamp(dir.y * 0.5 + 0.5, 0.0, 1.0);
      float up = smoothstep(0.5, 0.68, h);
      vec3 col = mix(uHorizon, uTop, pow(up, 0.62));
      float below = smoothstep(0.33, 0.5, h);
      col = mix(uBottom, col, below);

      float sun = max(dot(dir, normalize(uSunDirection)), 0.0);
      col += uSunColor * (pow(sun, 1100.0) * 2.8 + pow(sun, 20.0) * 0.2) * uSunIntensity;

      // A soft atmospheric band keeps the horizon from reading as a hard edge.
      float haze = exp(-abs(dir.y) * 14.0);
      col = mix(col, mix(uHorizon, uSunColor, 0.12), haze * 0.12);

      gl_FragColor = vec4(col, 1.0);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `,
});

const sky = new THREE.Mesh(new THREE.SphereGeometry(220, 40, 24), skyMaterial);
sky.frustumCulled = false;
scene.add(sky);

/* -------------------------------------------------------------------------- */
/*  Environment map                                                           */
/* -------------------------------------------------------------------------- */

function makeEnvironment({ skyTop, skyHorizon, skyBottom, sunColor, sunDir }) {
  const width = 1024;
  const height = 512;
  const c = document.createElement('canvas');
  c.width = width;
  c.height = height;
  const ctx = c.getContext('2d');

  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, '#' + skyTop.toString(16).padStart(6, '0'));
  gradient.addColorStop(0.46, '#' + skyHorizon.toString(16).padStart(6, '0'));
  gradient.addColorStop(0.55, '#' + skyBottom.toString(16).padStart(6, '0'));
  gradient.addColorStop(1, '#20261f');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  const azimuth = Math.atan2(sunDir.x, sunDir.z);
  const sunX = ((azimuth / (Math.PI * 2) + 0.5) * width + width) % width;
  const sunY = height * (0.5 - Math.asin(clamp(sunDir.y, -1, 1)) / Math.PI);

  const glow = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 150);
  glow.addColorStop(0, 'rgba(255, 246, 220, 0.95)');
  glow.addColorStop(0.18, 'rgba(255, 235, 195, 0.45)');
  glow.addColorStop(1, 'rgba(255, 235, 195, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  // A soft bank of haze near the horizon keeps reflections from feeling sterile.
  const haze = ctx.createLinearGradient(0, height * 0.4, 0, height * 0.58);
  haze.addColorStop(0, 'rgba(255, 255, 255, 0)');
  haze.addColorStop(0.5, 'rgba(255, 255, 255, 0.16)');
  haze.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = haze;
  ctx.fillRect(0, 0, width, height);

  const texture = new THREE.CanvasTexture(c);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

const pmrem = new THREE.PMREMGenerator(renderer);
pmrem.compileEquirectangularShader();

const DAY = {
  sunColor: 0xffeccc,
  sunIntensity: 4.0,
  sunPos: new THREE.Vector3(-24, 22, 22),
  hemiSky: 0xb9d4ee,
  hemiGround: 0x465033,
  hemiIntensity: 0.46,
  fillIntensity: 0.28,
  skyTop: 0x1e5f9e,
  skyHorizon: 0xa9cfe0,
  skyBottom: 0x6c7d5e,
  skySun: 0xffe9bb,
  skySunIntensity: 1.15,
  fog: 0xbcd0cf,
  fogDensity: 0.0125,
  exposure: 1.06,
  glassGlow: 0.35,
  pathLight: 0.0,
  cloudColor: 0xfff6e8,
  cloudOpacity: 0.4,
};

const GOLDEN = {
  sunColor: 0xff9d4d,
  sunIntensity: 3.2,
  sunPos: new THREE.Vector3(-28, 9, 16),
  hemiSky: 0xffbb82,
  hemiGround: 0x332d22,
  hemiIntensity: 0.32,
  fillIntensity: 0.1,
  skyTop: 0x25345c,
  skyHorizon: 0xffa96e,
  skyBottom: 0x4f3a2e,
  skySun: 0xff9842,
  skySunIntensity: 1.75,
  fog: 0xcf8d68,
  fogDensity: 0.0135,
  exposure: 0.96,
  glassGlow: 1.2,
  pathLight: 5.2,
  cloudColor: 0xffb98f,
  cloudOpacity: 0.46,
};

const dayEnv = pmrem.fromEquirectangular(
  makeEnvironment({
    skyTop: DAY.skyTop,
    skyHorizon: DAY.skyHorizon,
    skyBottom: DAY.skyBottom,
    sunColor: DAY.skySun,
    sunDir: DAY.sunPos.clone().normalize(),
  }),
).texture;

const goldenEnv = pmrem.fromEquirectangular(
  makeEnvironment({
    skyTop: GOLDEN.skyTop,
    skyHorizon: GOLDEN.skyHorizon,
    skyBottom: GOLDEN.skyBottom,
    sunColor: GOLDEN.skySun,
    sunDir: GOLDEN.sunPos.clone().normalize(),
  }),
).texture;

pmrem.dispose();
scene.environment = dayEnv;
scene.environmentIntensity = 1.0;

/* -------------------------------------------------------------------------- */
/*  Lighting                                                                  */
/* -------------------------------------------------------------------------- */

const sunLight = new THREE.DirectionalLight(DAY.sunColor, DAY.sunIntensity);
sunLight.position.copy(DAY.sunPos);
sunLight.castShadow = true;
sunLight.shadow.mapSize.set(isTouch ? 1024 : 2048, isTouch ? 1024 : 2048);
sunLight.shadow.camera.near = 1;
sunLight.shadow.camera.far = 90;
const shadowExtent = 19;
sunLight.shadow.camera.left = -shadowExtent;
sunLight.shadow.camera.right = shadowExtent;
sunLight.shadow.camera.top = shadowExtent;
sunLight.shadow.camera.bottom = -shadowExtent;
sunLight.shadow.bias = -0.00045;
sunLight.shadow.normalBias = 0.035;
sunLight.shadow.radius = 2.5;
sunLight.target.position.set(0, 2.2, 0);
scene.add(sunLight, sunLight.target);

const hemiLight = new THREE.HemisphereLight(DAY.hemiSky, DAY.hemiGround, DAY.hemiIntensity);
scene.add(hemiLight);

const fillLight = new THREE.DirectionalLight(0x9fc4e8, DAY.fillIntensity);
fillLight.position.set(18, 12, -16);
scene.add(fillLight);

/* -------------------------------------------------------------------------- */
/*  Textures                                                                  */
/* -------------------------------------------------------------------------- */

function makeGrassTexture() {
  const size = 512;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');

  ctx.fillStyle = '#6d8050';
  ctx.fillRect(0, 0, size, size);

  const shades = ['#7e945c', '#8aa167', '#546c3e', '#6b8050', '#94a972', '#607547'];
  for (let i = 0; i < 30000; i += 1) {
    const x = rng() * size;
    const y = rng() * size;
    const len = 1 + rng() * 4.5;
    ctx.strokeStyle = shades[(rng() * shades.length) | 0];
    ctx.globalAlpha = 0.14 + rng() * 0.3;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + (rng() - 0.5) * 1.5, y - len);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(24, 24);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAnisotropy;
  return tex;
}

function makeStoneTexture() {
  const size = 512;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');

  ctx.fillStyle = '#a89c86';
  ctx.fillRect(0, 0, size, size);

  const tileW = 128;
  const tileH = 64;
  for (let row = 0; row < size / tileH; row += 1) {
    for (let col = -1; col < size / tileW + 1; col += 1) {
      const x = col * tileW + (row % 2 ? tileW / 2 : 0);
      const y = row * tileH;
      const shade = 168 + Math.floor(rng() * 28);
      ctx.fillStyle = `rgb(${shade}, ${shade - 10}, ${shade - 25})`;
      ctx.fillRect(x + 2, y + 2, tileW - 4, tileH - 4);
      ctx.strokeStyle = 'rgba(62, 55, 44, 0.38)';
      ctx.lineWidth = 2;
      ctx.strokeRect(x + 2, y + 2, tileW - 4, tileH - 4);
    }
  }

  for (let i = 0; i < 9000; i += 1) {
    const x = rng() * size;
    const y = rng() * size;
    ctx.fillStyle = `rgba(${rng() > 0.5 ? 255 : 50}, ${rng() > 0.5 ? 250 : 45}, ${rng() > 0.5 ? 240 : 38}, ${0.02 + rng() * 0.05})`;
    ctx.fillRect(x, y, 1.4, 1.4);
  }

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(6, 6);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAnisotropy;
  return tex;
}

function makeStuccoBumpTexture() {
  const size = 256;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, size, size);

  for (let i = 0; i < 16000; i += 1) {
    const x = rng() * size;
    const y = rng() * size;
    const v = 90 + Math.floor(rng() * 76);
    ctx.fillStyle = `rgba(${v}, ${v}, ${v}, ${0.18 + rng() * 0.28})`;
    const r = 0.5 + rng() * 1.6;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(5, 5);
  tex.colorSpace = THREE.NoColorSpace;
  tex.anisotropy = maxAnisotropy;
  return tex;
}

const stuccoBump = makeStuccoBumpTexture();

function makeCloudTexture() {
  const size = 256;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, size, size);

  for (let i = 0; i < 7; i += 1) {
    const x = size * (0.3 + rng() * 0.4);
    const y = size * (0.4 + rng() * 0.2);
    const r = size * (0.14 + rng() * 0.16);
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, 'rgba(255,255,255,0.55)');
    g.addColorStop(0.55, 'rgba(255,255,255,0.22)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/* -------------------------------------------------------------------------- */
/*  Ground, terrace & path                                                    */
/* -------------------------------------------------------------------------- */

const grassMaterial = new THREE.MeshStandardMaterial({
  map: makeGrassTexture(),
  color: 0x8d9c72,
  roughness: 1,
  metalness: 0,
});

// Break up the texture tiling with a little world-space value noise.
grassMaterial.onBeforeCompile = (shader) => {
  shader.vertexShader = shader.vertexShader
    .replace(
      '#include <common>',
      `#include <common>
       varying vec3 vGrassWorldPos;`,
    )
    .replace(
      '#include <begin_vertex>',
      `#include <begin_vertex>
       vGrassWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;`,
    );

  shader.fragmentShader = shader.fragmentShader
    .replace(
      '#include <common>',
      `#include <common>
       varying vec3 vGrassWorldPos;
       float grassHash(vec2 p) {
         return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
       }
       float grassNoise(vec2 p) {
         vec2 i = floor(p);
         vec2 f = fract(p);
         f = f * f * (3.0 - 2.0 * f);
         float a = grassHash(i);
         float b = grassHash(i + vec2(1.0, 0.0));
         float c = grassHash(i + vec2(0.0, 1.0));
         float d = grassHash(i + vec2(1.0, 1.0));
         return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
       }`,
    )
    .replace(
      '#include <map_fragment>',
      `#include <map_fragment>
       float grassMottle =
         grassNoise(vGrassWorldPos.xz * 0.045) * 0.55 +
         grassNoise(vGrassWorldPos.xz * 0.16) * 0.3 +
         grassNoise(vGrassWorldPos.xz * 0.55) * 0.15;
       diffuseColor.rgb *= mix(0.74, 1.16, grassMottle);`,
    );
};

const ground = new THREE.Mesh(new THREE.CircleGeometry(110, 72), grassMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -0.02;
ground.receiveShadow = true;
scene.add(ground);

const stoneMaterial = new THREE.MeshStandardMaterial({
  map: makeStoneTexture(),
  color: 0xdccbb2,
  roughness: 0.88,
  metalness: 0,
  bumpMap: null,
  bumpScale: 0.03,
});
stoneMaterial.bumpMap = stoneMaterial.map;

function roundedRectShape(width, height, radius) {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  return shape;
}

const terraceGeo = new THREE.ExtrudeGeometry(roundedRectShape(12.2, 12.8, 0.5), {
  depth: 0.28,
  bevelEnabled: true,
  bevelSize: 0.045,
  bevelThickness: 0.045,
  bevelSegments: 2,
  curveSegments: 10,
});
terraceGeo.rotateX(-Math.PI / 2);
const terrace = new THREE.Mesh(terraceGeo, stoneMaterial);
terrace.position.y = -0.28;
terrace.receiveShadow = true;
terrace.castShadow = false;
scene.add(terrace);

const pathMaterial = stoneMaterial.clone();
pathMaterial.color = new THREE.Color(0xcfc4ad);

const pathGroup = new THREE.Group();
const pathStoneGeo = new THREE.CylinderGeometry(0.62, 0.66, 0.075, 9);
const pathCount = 9;
for (let i = 0; i < pathCount; i += 1) {
  const t = i / (pathCount - 1);
  const stone = new THREE.Mesh(pathStoneGeo, pathMaterial);
  stone.position.set(
    0.75 + Math.sin(t * Math.PI * 0.9) * 1.35 + (rng() - 0.5) * 0.18,
    0.038 + rng() * 0.012,
    6.35 + t * 7.1,
  );
  stone.rotation.y = rng() * Math.PI;
  const s = 0.82 + rng() * 0.22;
  stone.scale.set(s, 1, s * (0.9 + rng() * 0.2));
  stone.castShadow = true;
  stone.receiveShadow = true;
  pathGroup.add(stone);
}
scene.add(pathGroup);

const landing = new THREE.Mesh(
  new THREE.BoxGeometry(2.5, 0.09, 1.35),
  pathMaterial,
);
landing.position.set(0.72, 0.045, 5.82);
landing.castShadow = true;
landing.receiveShadow = true;
scene.add(landing);

/* -------------------------------------------------------------------------- */
/*  Trees, hedges, flowers                                                    */
/* -------------------------------------------------------------------------- */

const treeSpecs = [
  { angle: 118, radius: 20, scale: 1.05 },
  { angle: 18, radius: 21, scale: 1.0 },
  { angle: 146, radius: 18.5, scale: 1.1 },
  { angle: 181, radius: 21, scale: 1.32 },
  { angle: 214, radius: 19, scale: 1.05 },
  { angle: 248, radius: 22, scale: 1.22 },
  { angle: 281, radius: 18, scale: 0.98 },
  { angle: 314, radius: 20, scale: 1.16 },
  { angle: 344, radius: 22.5, scale: 1.08 },
  { angle: 126, radius: 24, scale: 1.3 },
];

const trunkGeo = new THREE.CylinderGeometry(0.16, 0.28, 2.7, 7, 1);
trunkGeo.translate(0, 1.35, 0);
const trunkMat = new THREE.MeshStandardMaterial({
  color: 0x4a3826,
  roughness: 1,
  metalness: 0,
  flatShading: true,
});
const trunks = new THREE.InstancedMesh(trunkGeo, trunkMat, treeSpecs.length);
trunks.castShadow = true;
trunks.receiveShadow = true;
trunks.frustumCulled = false;

const foliageGeo = new THREE.IcosahedronGeometry(1, 2);
const foliageMat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0.98,
  metalness: 0,
  flatShading: false,
});
const foliagePerTree = 12;
const foliage = new THREE.InstancedMesh(
  foliageGeo,
  foliageMat,
  treeSpecs.length * foliagePerTree,
);
foliage.castShadow = true;
foliage.receiveShadow = true;
foliage.frustumCulled = false;

const branchGeo = new THREE.CylinderGeometry(0.045, 0.085, 1.55, 5, 1);
branchGeo.translate(0, 0.775, 0);
const branches = new THREE.InstancedMesh(branchGeo, trunkMat, treeSpecs.length * 2);
branches.castShadow = true;
branches.receiveShadow = true;
branches.frustumCulled = false;

const dummy = new THREE.Object3D();
const treeColor = new THREE.Color();

treeSpecs.forEach((tree, index) => {
  const angle = (tree.angle * Math.PI) / 180;
  const x = Math.cos(angle) * tree.radius;
  const z = Math.sin(angle) * tree.radius;

  dummy.position.set(x, 0, z);
  dummy.rotation.set(0, rng() * Math.PI * 2, 0);
  dummy.scale.set(tree.scale, tree.scale * (0.95 + rng() * 0.18), tree.scale);
  dummy.updateMatrix();
  trunks.setMatrixAt(index, dummy.matrix);

  for (let branchIndex = 0; branchIndex < 2; branchIndex += 1) {
    const i = index * 2 + branchIndex;
    dummy.position.set(x, 2.15 * tree.scale, z);
    dummy.rotation.set(
      (rng() - 0.5) * 0.3,
      rng() * Math.PI * 2,
      (branchIndex === 0 ? 1 : -1) * (0.45 + rng() * 0.35),
    );
    dummy.scale.set(tree.scale, tree.scale, tree.scale);
    dummy.updateMatrix();
    branches.setMatrixAt(i, dummy.matrix);
  }

  const blobs = [
    { x: 0, y: 3.5, z: 0, s: 1.35 },
    { x: 1.0, y: 3.0, z: 0.2, s: 0.95 },
    { x: -1.0, y: 3.1, z: -0.2, s: 1.0 },
    { x: 0.2, y: 4.3, z: -0.1, s: 0.9 },
    { x: 0.7, y: 3.8, z: 0.7, s: 0.85 },
    { x: -0.7, y: 3.9, z: 0.6, s: 0.9 },
    { x: 0.1, y: 2.7, z: -0.8, s: 0.8 },
    { x: 1.1, y: 3.8, z: -0.5, s: 0.75 },
    { x: -1.1, y: 3.7, z: -0.4, s: 0.8 },
    { x: 0.5, y: 4.8, z: 0.2, s: 0.65 },
    { x: -0.4, y: 4.6, z: 0.4, s: 0.6 },
    { x: 0, y: 3.2, z: 0.9, s: 0.8 },
  ];

  blobs.forEach((blob, blobIndex) => {
    const i = index * foliagePerTree + blobIndex;
    dummy.position.set(
      x + (blob.x + (rng() - 0.5) * 0.18) * tree.scale,
      (blob.y + (rng() - 0.5) * 0.14) * tree.scale,
      z + (blob.z + (rng() - 0.5) * 0.18) * tree.scale,
    );
    dummy.rotation.set(rng() * 0.4, rng() * Math.PI * 2, rng() * 0.3);
    const s = blob.s * tree.scale * (0.92 + rng() * 0.16);
    dummy.scale.set(s, s * (0.9 + rng() * 0.16), s);
    dummy.updateMatrix();
    foliage.setMatrixAt(i, dummy.matrix);

    treeColor.setHSL(
      0.245 + rng() * 0.045,
      0.3 + rng() * 0.14,
      0.145 + rng() * 0.065,
    );
    foliage.setColorAt(i, treeColor);
  });
});

trunks.instanceMatrix.needsUpdate = true;
branches.instanceMatrix.needsUpdate = true;
foliage.instanceMatrix.needsUpdate = true;
if (foliage.instanceColor) foliage.instanceColor.needsUpdate = true;
scene.add(trunks, branches, foliage);

/* Hedges along the terrace edge */
const hedgePositions = [];
for (const x of [-5.25, -4.35, -3.45, -2.55, -1.65, 2.75, 3.65, 4.55, 5.45]) {
  hedgePositions.push({ x, z: 6.45, s: 0.52 + rng() * 0.16 });
}
for (const z of [-4.4, -3.2, -2.0, -0.8, 0.4, 1.6, 2.8, 4.0]) {
  hedgePositions.push({ x: 6.35, z, s: 0.46 + rng() * 0.14 });
  hedgePositions.push({ x: -6.35, z: z + 0.2, s: 0.46 + rng() * 0.14 });
}

const hedgeGeo = new THREE.IcosahedronGeometry(1, 1);
const hedgeMat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0.95,
  metalness: 0,
  flatShading: true,
});
const hedges = new THREE.InstancedMesh(hedgeGeo, hedgeMat, hedgePositions.length);
hedges.castShadow = true;
hedges.receiveShadow = true;
hedges.frustumCulled = false;
hedgePositions.forEach((hedge, index) => {
  dummy.position.set(hedge.x, hedge.s * 0.58, hedge.z);
  dummy.rotation.set(rng() * 0.2, rng() * Math.PI * 2, rng() * 0.2);
  dummy.scale.set(hedge.s * 1.12, hedge.s * 0.78, hedge.s);
  dummy.updateMatrix();
  hedges.setMatrixAt(index, dummy.matrix);
  treeColor.setHSL(0.265 + rng() * 0.035, 0.38 + rng() * 0.12, 0.1 + rng() * 0.055);
  hedges.setColorAt(index, treeColor);
});
hedges.instanceMatrix.needsUpdate = true;
if (hedges.instanceColor) hedges.instanceColor.needsUpdate = true;
scene.add(hedges);

/* A scatter of tiny flowers in the hedge line */
const flowerGeo = new THREE.IcosahedronGeometry(0.075, 0);
const flowerMat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0.85,
  metalness: 0,
});
const flowerColors = [0xfff0b0, 0xf3b8c0, 0xffd7e2, 0xfff7df, 0xe9b04a];
const flowers = new THREE.InstancedMesh(flowerGeo, flowerMat, 90);
flowers.frustumCulled = false;
for (let i = 0; i < 90; i += 1) {
  const hedge = hedgePositions[(rng() * hedgePositions.length) | 0];
  dummy.position.set(
    hedge.x + (rng() - 0.5) * hedge.s * 1.6,
    hedge.s * 0.6 + rng() * 0.45,
    hedge.z + (rng() - 0.5) * hedge.s * 1.4,
  );
  const s = 0.7 + rng() * 0.7;
  dummy.scale.set(s, s, s);
  dummy.rotation.set(rng() * 3, rng() * 3, rng() * 3);
  dummy.updateMatrix();
  flowers.setMatrixAt(i, dummy.matrix);
  treeColor.setHex(flowerColors[(rng() * flowerColors.length) | 0]);
  flowers.setColorAt(i, treeColor);
}
flowers.instanceMatrix.needsUpdate = true;
if (flowers.instanceColor) flowers.instanceColor.needsUpdate = true;
scene.add(flowers);

/* A meadow of tiny tufts and flowers keeps the lawn from reading as a plane. */
const tuftCount = 260;
const tuftGeo = new THREE.ConeGeometry(0.05, 0.3, 3);
tuftGeo.translate(0, 0.15, 0);
const tuftMat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 1,
  metalness: 0,
  flatShading: true,
});
const tufts = new THREE.InstancedMesh(tuftGeo, tuftMat, tuftCount);
tufts.receiveShadow = true;
tufts.frustumCulled = false;

const meadowCount = 150;
const meadowGeo = new THREE.IcosahedronGeometry(0.06, 0);
const meadowMat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0.85,
  metalness: 0,
});
const meadow = new THREE.InstancedMesh(meadowGeo, meadowMat, meadowCount);
meadow.frustumCulled = false;

function clearOfGarden(x, z) {
  if (Math.abs(x) < 6.8 && Math.abs(z) < 7.2) return false;
  if (z > 5.4 && z < 15.2 && x > -1.4 && x < 4.0) return false;
  return true;
}

let tuftIndex = 0;
while (tuftIndex < tuftCount) {
  const angle = rng() * Math.PI * 2;
  const radius = 8.8 + rng() * 16;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  if (!clearOfGarden(x, z)) continue;

  dummy.position.set(x, 0, z);
  dummy.rotation.set(0, rng() * Math.PI * 2, 0);
  const s = 0.55 + rng() * 0.75;
  dummy.scale.set(s, s * (0.8 + rng() * 0.7), s);
  dummy.updateMatrix();
  tufts.setMatrixAt(tuftIndex, dummy.matrix);
  treeColor.setHSL(0.24 + rng() * 0.05, 0.3 + rng() * 0.2, 0.16 + rng() * 0.1);
  tufts.setColorAt(tuftIndex, treeColor);
  tuftIndex += 1;
}

let meadowIndex = 0;
while (meadowIndex < meadowCount) {
  const angle = rng() * Math.PI * 2;
  const radius = 9.2 + rng() * 14;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  if (!clearOfGarden(x, z)) continue;

  dummy.position.set(x, 0.08 + rng() * 0.22, z);
  dummy.rotation.set(rng() * 3, rng() * 3, rng() * 3);
  const s = 0.65 + rng() * 0.7;
  dummy.scale.set(s, s, s);
  dummy.updateMatrix();
  meadow.setMatrixAt(meadowIndex, dummy.matrix);
  treeColor.setHex(flowerColors[(rng() * flowerColors.length) | 0]);
  meadow.setColorAt(meadowIndex, treeColor);
  meadowIndex += 1;
}

tufts.instanceMatrix.needsUpdate = true;
meadow.instanceMatrix.needsUpdate = true;
if (tufts.instanceColor) tufts.instanceColor.needsUpdate = true;
if (meadow.instanceColor) meadow.instanceColor.needsUpdate = true;
scene.add(tufts, meadow);

/* A simple bench gives the garden a human scale. */
const bench = new THREE.Group();
const benchWood = new THREE.MeshStandardMaterial({ color: 0x6b4f32, roughness: 0.82, metalness: 0 });
const benchMetal = new THREE.MeshStandardMaterial({ color: 0x2d2b27, roughness: 0.5, metalness: 0.55 });

const seat = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.08, 0.5), benchWood);
seat.position.y = 0.46;
const back = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.38, 0.07), benchWood);
back.position.set(0, 0.7, -0.21);
back.rotation.x = -0.08;
bench.add(seat, back);
for (const sx of [-0.7, 0.7]) {
  for (const sz of [-0.17, 0.17]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.46, 0.07), benchMetal);
    leg.position.set(sx, 0.23, sz);
    bench.add(leg);
  }
}
bench.position.set(5.1, 0, 9.0);
bench.rotation.y = -0.62;
bench.traverse((object) => {
  if (object.isMesh) {
    object.castShadow = true;
    object.receiveShadow = true;
  }
});
scene.add(bench);

/* Terracotta planters flank the steps. */
const potMat = new THREE.MeshStandardMaterial({ color: 0x9b5f43, roughness: 0.86, metalness: 0 });
const potLeafMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.95, metalness: 0 });
for (const potX of [-1.65, 3.15]) {
  const pot = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.22, 0.48, 12), potMat);
  body.position.y = 0.24;
  const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.33, 0.33, 0.08, 12), potMat);
  rim.position.y = 0.48;
  pot.add(body, rim);

  const plant = new THREE.Group();
  for (let i = 0; i < 5; i += 1) {
    const leaf = new THREE.Mesh(new THREE.IcosahedronGeometry(0.18 + rng() * 0.08, 1), potLeafMat);
    leaf.position.set((rng() - 0.5) * 0.34, 0.62 + rng() * 0.25, (rng() - 0.5) * 0.34);
    leaf.scale.set(1, 1.25 + rng() * 0.4, 1);
    leaf.material = potLeafMat.clone();
    leaf.material.color.setHSL(0.25 + rng() * 0.04, 0.4, 0.2 + rng() * 0.08);
    plant.add(leaf);
  }
  pot.add(plant);
  pot.position.set(potX, 0.01, 4.95);
  pot.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = true;
      object.receiveShadow = true;
    }
  });
  scene.add(pot);
}

/* A soft ring of distant hills and trees gives the horizon some depth. */
const hillGeo = new THREE.SphereGeometry(1, 24, 14);
const hillColors = [0x4c624b, 0x455b45, 0x53694f, 0x3f5541, 0x4a6048];
for (let i = 0; i < 8; i += 1) {
  const angle = (i / 8) * Math.PI * 2 + rng() * 0.35;
  const radius = 68 + rng() * 24;
  const hill = new THREE.Mesh(
    hillGeo,
    new THREE.MeshStandardMaterial({
      color: hillColors[i % hillColors.length],
      roughness: 1,
      metalness: 0,
      flatShading: false,
    }),
  );
  hill.position.set(
    Math.cos(angle) * radius,
    -3.2 - rng() * 1.5,
    Math.sin(angle) * radius,
  );
  hill.scale.set(28 + rng() * 20, 7 + rng() * 5, 20 + rng() * 14);
  hill.rotation.y = rng() * Math.PI;
  scene.add(hill);
}

const distantTreeGeo = new THREE.ConeGeometry(1, 1, 6);
distantTreeGeo.translate(0, 0.5, 0);
const distantTreeMat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 1,
  metalness: 0,
  flatShading: true,
});
const distantTreeCount = 160;
const distantTrees = new THREE.InstancedMesh(
  distantTreeGeo,
  distantTreeMat,
  distantTreeCount,
);
distantTrees.frustumCulled = false;
for (let i = 0; i < distantTreeCount; i += 1) {
  const angle = rng() * Math.PI * 2;
  const radius = 52 + rng() * 38;
  const height = 3.2 + rng() * 5.2;
  dummy.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
  dummy.rotation.set(0, rng() * Math.PI * 2, 0);
  dummy.scale.set(1.1 + rng() * 1.2, height, 1.1 + rng() * 1.2);
  dummy.updateMatrix();
  distantTrees.setMatrixAt(i, dummy.matrix);
  treeColor.setHSL(0.26 + rng() * 0.04, 0.18 + rng() * 0.1, 0.11 + rng() * 0.05);
  distantTrees.setColorAt(i, treeColor);
}
distantTrees.instanceMatrix.needsUpdate = true;
if (distantTrees.instanceColor) distantTrees.instanceColor.needsUpdate = true;
scene.add(distantTrees);

/* -------------------------------------------------------------------------- */
/*  Path lamps                                                                */
/* -------------------------------------------------------------------------- */

const lampMaterials = [];
const pathLights = [];
const lampPositions = [
  { x: 2.65, z: 8.15 },
  { x: -2.25, z: 11.2 },
];

lampPositions.forEach(({ x, z }) => {
  const group = new THREE.Group();
  group.position.set(x, 0, z);

  const post = new THREE.Mesh(
    new THREE.CylinderGeometry(0.055, 0.07, 1.05, 6),
    new THREE.MeshStandardMaterial({ color: 0x2c2a25, roughness: 0.7, metalness: 0.5 }),
  );
  post.position.y = 0.52;
  post.castShadow = true;

  const cap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.13, 0.13, 0.05, 8),
    new THREE.MeshStandardMaterial({ color: 0x3a352b, roughness: 0.6, metalness: 0.4 }),
  );
  cap.position.y = 1.06;

  const glowMat = new THREE.MeshStandardMaterial({
    color: 0xffe0ad,
    emissive: new THREE.Color(0xffb36a),
    emissiveIntensity: 0.1,
    roughness: 0.4,
    metalness: 0,
  });
  lampMaterials.push(glowMat);

  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.105, 10, 8), glowMat);
  bulb.position.y = 1.13;

  const light = new THREE.PointLight(0xffb36a, 0, 7.5, 2);
  light.position.y = 1.18;
  pathLights.push(light);

  group.add(post, cap, bulb, light);
  scene.add(group);
});

/* -------------------------------------------------------------------------- */
/*  Clouds & dust                                                             */
/* -------------------------------------------------------------------------- */

const cloudTexture = makeCloudTexture();
const cloudGroup = new THREE.Group();
const cloudMaterials = [];
for (let i = 0; i < 7; i += 1) {
  const material = new THREE.SpriteMaterial({
    map: cloudTexture,
    transparent: true,
    opacity: DAY.cloudOpacity,
    depthWrite: false,
    fog: false,
    color: 0xffffff,
  });
  cloudMaterials.push(material);
  const sprite = new THREE.Sprite(material);
  const angle = rng() * Math.PI * 2;
  const radius = 55 + rng() * 55;
  sprite.position.set(
    Math.cos(angle) * radius,
    22 + rng() * 20,
    Math.sin(angle) * radius,
  );
  const scale = 22 + rng() * 26;
  sprite.scale.set(scale, scale * 0.48, 1);
  cloudGroup.add(sprite);
}
scene.add(cloudGroup);

/* Low mist softens the distant treeline. */
const mistGroup = new THREE.Group();
const mistMaterials = [];
for (let i = 0; i < 5; i += 1) {
  const material = new THREE.SpriteMaterial({
    map: cloudTexture,
    transparent: true,
    opacity: 0.1,
    depthWrite: false,
    fog: false,
    color: 0xdde8dd,
  });
  mistMaterials.push(material);
  const sprite = new THREE.Sprite(material);
  const angle = rng() * Math.PI * 2;
  const radius = 30 + rng() * 20;
  sprite.position.set(Math.cos(angle) * radius, 1.4 + rng() * 1.8, Math.sin(angle) * radius);
  sprite.scale.set(38 + rng() * 24, 5 + rng() * 4, 1);
  mistGroup.add(sprite);
}
scene.add(mistGroup);

const dustCount = 90;
const dustPositions = new Float32Array(dustCount * 3);
for (let i = 0; i < dustCount; i += 1) {
  dustPositions[i * 3] = (rng() - 0.5) * 22;
  dustPositions[i * 3 + 1] = 0.5 + rng() * 8;
  dustPositions[i * 3 + 2] = (rng() - 0.5) * 22;
}
const dustGeo = new THREE.BufferGeometry();
dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
const dustMat = new THREE.PointsMaterial({
  color: 0xffe8b8,
  size: 0.032,
  transparent: true,
  opacity: 0.3,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  sizeAttenuation: true,
});
const dust = new THREE.Points(dustGeo, dustMat);
dust.frustumCulled = false;
scene.add(dust);

/* -------------------------------------------------------------------------- */
/*  House                                                                     */
/* -------------------------------------------------------------------------- */

let house = null;
let houseBounds = null;
let houseSize = new THREE.Vector3(8.3, 7.3, 8.7);
let fitDistance = 22;
let targetY = 3.1;
let introDone = false;
let lightTween = null;
let lightT = 0;
let currentMode = 'day';
let cameraTween = null;
let currentPreset = 'hero';
let loaderTarget = 0;
let loaderShown = 0;

const glassMaterials = new Set();
const interiorLights = [];

function enhanceMaterial(material) {
  if (!material) return;
  material.envMapIntensity = 1.0;
  material.shadowSide = THREE.FrontSide;
  if (material.map) material.map.anisotropy = maxAnisotropy;
  if (material.normalMap) material.normalMap.anisotropy = maxAnisotropy;

  const materialName = material.name || '';
  const takesBump =
    materialName.includes('stucco') ||
    materialName === 'material_0' ||
    materialName === 'PlainRedBricks_1K' ||
    materialName === 'Concrete_obruby';
  if (takesBump) {
    material.bumpMap = material.map || stuccoBump;
    material.bumpScale = material.map ? 0.022 : 0.018;
  }

  if (material.name === 'Glass' || material.name === 'glazed') {
    material.transmission = 0;
    material.thickness = 0;
    material.transparent = true;
    material.opacity = material.name === 'Glass' ? 0.84 : 0.34;
    material.color = new THREE.Color(material.name === 'Glass' ? 0xffe0b2 : 0xb9d4e0);
    material.roughness = 0.055;
    material.metalness = 0;
    material.depthWrite = false;
    material.envMapIntensity = material.name === 'Glass' ? 1.5 : 2.1;
    material.side = THREE.DoubleSide;
    material.emissive = new THREE.Color(0xffb36a);
    material.emissiveIntensity = material.name === 'Glass' ? DAY.glassGlow : 0.04;
    if (material.name === 'Glass') glassMaterials.add(material);
  }

  material.needsUpdate = true;
}

function mergeStaticScene(root) {
  root.updateMatrixWorld(true);

  const buckets = new Map();
  const multi = [];

  root.traverse((object) => {
    if (!object.isMesh || object.isSkinnedMesh) return;
    if (Array.isArray(object.material) && object.material.length > 1) {
      multi.push(object);
      return;
    }

    const material = Array.isArray(object.material) ? object.material[0] : object.material;
    if (!material) return;

    let geometry = object.geometry.clone();
    if (geometry.index) geometry = geometry.toNonIndexed();
    geometry.applyMatrix4(object.matrixWorld);

    const keepUv = Boolean(
      material.map ||
        material.normalMap ||
        material.roughnessMap ||
        material.metalnessMap ||
        material.aoMap ||
        material.emissiveMap ||
        material.alphaMap,
    );
    const keep = new Set(['position', 'normal']);
    if (keepUv) keep.add('uv');

    for (const name of Object.keys(geometry.attributes)) {
      if (!keep.has(name)) geometry.deleteAttribute(name);
    }
    if (!geometry.attributes.normal) geometry.computeVertexNormals();
    if (keepUv && !geometry.attributes.uv) {
      geometry.setAttribute(
        'uv',
        new THREE.BufferAttribute(new Float32Array(geometry.attributes.position.count * 2), 2),
      );
    }
    geometry.morphAttributes = {};

    if (!buckets.has(material.uuid)) buckets.set(material.uuid, { material, geometries: [] });
    buckets.get(material.uuid).geometries.push(geometry);
  });

  const group = new THREE.Group();

  for (const { material, geometries } of buckets.values()) {
    const merged = mergeGeometries(geometries, false);
    if (merged) {
      merged.computeBoundingSphere();
      const mesh = new THREE.Mesh(merged, material);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);
      geometries.forEach((geometry) => geometry.dispose());
    } else {
      for (const geometry of geometries) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        group.add(mesh);
      }
    }
  }

  for (const object of multi) {
    const geometry = object.geometry.clone();
    geometry.applyMatrix4(object.matrixWorld);
    const mesh = new THREE.Mesh(geometry, object.material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
  }

  return group;
}

function computeFraming() {
  if (!house) return;
  houseBounds = new THREE.Box3().setFromObject(house);
  houseBounds.getSize(houseSize);
  const sphere = houseBounds.getBoundingSphere(new THREE.Sphere());
  targetY = houseBounds.min.y + houseSize.y * 0.43;

  const vFov = THREE.MathUtils.degToRad(camera.fov);
  const hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect);
  const fitFov = Math.min(vFov, hFov);
  fitDistance = (sphere.radius * 1.09) / Math.sin(fitFov / 2);
}

const PRESETS = {
  hero: { theta: 31, phi: 79.5, distance: 0.95, target: 0.42 },
  garden: { theta: 6, phi: 86, distance: 1.0, target: 0.34 },
  aerial: { theta: 40, phi: 55, distance: 1.13, target: 0.32 },
};

function sphericalPosition(preset, radiusScale = 1) {
  const phi = THREE.MathUtils.degToRad(preset.phi);
  const theta = THREE.MathUtils.degToRad(preset.theta);
  const radius = fitDistance * preset.distance * radiusScale;
  const target = new THREE.Vector3(
    0,
    houseBounds.min.y + houseSize.y * preset.target,
    0,
  );
  return {
    position: new THREE.Vector3(
      target.x + radius * Math.sin(phi) * Math.sin(theta),
      target.y + radius * Math.cos(phi),
      target.z + radius * Math.sin(phi) * Math.cos(theta),
    ),
    target,
    radius,
  };
}

function updatePresetButtons(name) {
  presetButtons.forEach((button) => {
    const active = button.dataset.preset === name;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}

function flyToPreset(name, { immediate = false, duration = 1.55 } = {}) {
  if (!house) return;
  const preset = PRESETS[name];
  if (!preset) return;
  const destination = sphericalPosition(preset);
  currentPreset = name;
  updatePresetButtons(name);

  if (immediate || reducedMotion) {
    camera.position.copy(destination.position);
    controls.target.copy(destination.target);
    controls.update();
    cameraTween = null;
    return;
  }

  const fromPosition = camera.position.clone();
  const fromTarget = controls.target.clone();
  cameraTween = {
    fromPosition,
    toPosition: destination.position,
    fromTarget,
    toTarget: destination.target,
    start: performance.now(),
    duration: duration * 1000,
  };
  controls.autoRotate = false;
  controls.enabled = false;
  hideHint();
}

function updateCameraTween(now) {
  if (!cameraTween) return;
  const t = clamp((now - cameraTween.start) / cameraTween.duration, 0, 1);
  const e = easeInOutCubic(t);
  camera.position.lerpVectors(cameraTween.fromPosition, cameraTween.toPosition, e);
  controls.target.lerpVectors(cameraTween.fromTarget, cameraTween.toTarget, e);
  controls.update();

  if (t >= 1) {
    cameraTween = null;
    controls.enabled = true;
    controls.autoRotate = autoRotateWanted;
    introDone = true;
  }
}

/* -------------------------------------------------------------------------- */
/*  Loader                                                                    */
/* -------------------------------------------------------------------------- */

function setLoaderProgress(value) {
  loaderTarget = clamp(value, 0, 1);
  const pct = Math.round(loaderTarget * 100);
  barFill.style.width = `${pct}%`;
  loadPct.textContent = `${pct}%`;
  loaderEl.querySelector('.bar').setAttribute('aria-valuenow', String(pct));

  if (loaderTarget < 0.28) loadNote.textContent = 'Preparing the garden';
  else if (loaderTarget < 0.62) loadNote.textContent = 'Planting the trees';
  else if (loaderTarget < 0.92) loadNote.textContent = 'Lighting the rooms';
  else loadNote.textContent = 'Almost home';
}

function hideLoader() {
  loaderEl.classList.add('is-done');
  setTimeout(() => {
    loaderEl.setAttribute('aria-hidden', 'true');
  }, 950);
  setTimeout(() => hideHint(), 9000);
}

function hideHint() {
  hintEl.classList.add('is-hidden');
}

/* -------------------------------------------------------------------------- */
/*  House loading                                                             */
/* -------------------------------------------------------------------------- */

const gltfLoader = new GLTFLoader();

function loadHouse() {
  errorEl.hidden = true;
  setLoaderProgress(0.04);

  gltfLoader.load(
    MODEL_URL,
    (gltf) => {
      const root = gltf.scene;
      root.updateMatrixWorld(true);

      const materials = new Set();
      root.traverse((object) => {
        if (!object.isMesh) return;
        const list = Array.isArray(object.material) ? object.material : [object.material];
        list.forEach((material) => {
          if (material && !materials.has(material)) {
            materials.add(material);
            enhanceMaterial(material);
          }
        });
      });

      house = mergeStaticScene(root);

      // Seat the house precisely on the terrace.
      const rawBounds = new THREE.Box3().setFromObject(house);
      const terraceTop = new THREE.Box3().setFromObject(terrace).max.y;
      house.position.y += terraceTop - rawBounds.min.y + 0.012;
      house.updateMatrixWorld(true);

      scene.add(house);
      computeFraming();

      // Warm interior light spills through the glazing without lighting the facade.
      const lowerLight = new THREE.PointLight(0xffc48a, 10, 12, 2);
      lowerLight.position.set(0, houseBounds.min.y + houseSize.y * 0.32, 0);
      const upperLight = new THREE.PointLight(0xffd0a0, 7, 11, 2);
      upperLight.position.set(0, houseBounds.min.y + houseSize.y * 0.72, 0);
      interiorLights.push(lowerLight, upperLight);
      scene.add(lowerLight, upperLight);
      applyLighting(lightT);

      window.__casa = {
        scene,
        camera,
        renderer,
        controls,
        house,
        glassMaterials: [...glassMaterials],
        interiorLights,
        materialNames: [...materials].map((material) => material.name),
        setMode: setLightMode,
      };

      // A cinematic opening angle before settling into the hero view.
      const intro = sphericalPosition(PRESETS.hero, 1.42);
      const introPhi = THREE.MathUtils.degToRad(68);
      const introTheta = THREE.MathUtils.degToRad(36);
      const introRadius = intro.radius * 1.02;
      camera.position.set(
        intro.target.x + introRadius * Math.sin(introPhi) * Math.sin(introTheta),
        intro.target.y + introRadius * Math.cos(introPhi),
        intro.target.z + introRadius * Math.sin(introPhi) * Math.cos(introTheta),
      );
      controls.target.copy(intro.target);
      controls.update();

      setLoaderProgress(1);
      setTimeout(() => {
        hideLoader();
        flyToPreset('hero', { duration: 2.9 });
        controls.autoRotate = false;
      }, forceLoader ? 6500 : 420);

      // Let the page settle before enabling interaction.
      setTimeout(() => {
        if (!cameraTween) {
          controls.enabled = true;
          controls.autoRotate = autoRotateWanted;
          introDone = true;
        }
      }, 1200);
    },
    (event) => {
      if (event.total) {
        setLoaderProgress(0.04 + (event.loaded / event.total) * 0.96);
      } else {
        setLoaderProgress(Math.min(0.9, 0.04 + event.loaded / 18000000));
      }
    },
    (error) => {
      console.error(error);
      loaderEl.classList.add('is-done');
      errorEl.hidden = false;
    },
  );
}

/* -------------------------------------------------------------------------- */
/*  Light modes                                                               */
/* -------------------------------------------------------------------------- */

function applyLighting(t) {
  sunLight.color.lerpColors(new THREE.Color(DAY.sunColor), new THREE.Color(GOLDEN.sunColor), t);
  sunLight.intensity = lerp(DAY.sunIntensity, GOLDEN.sunIntensity, t);
  sunLight.position.lerpVectors(DAY.sunPos, GOLDEN.sunPos, t);

  hemiLight.color.lerpColors(new THREE.Color(DAY.hemiSky), new THREE.Color(GOLDEN.hemiSky), t);
  hemiLight.groundColor.lerpColors(
    new THREE.Color(DAY.hemiGround),
    new THREE.Color(GOLDEN.hemiGround),
    t,
  );
  hemiLight.intensity = lerp(DAY.hemiIntensity, GOLDEN.hemiIntensity, t);
  fillLight.intensity = lerp(DAY.fillIntensity, GOLDEN.fillIntensity, t);

  skyUniforms.uTop.value.lerpColors(new THREE.Color(DAY.skyTop), new THREE.Color(GOLDEN.skyTop), t);
  skyUniforms.uHorizon.value.lerpColors(
    new THREE.Color(DAY.skyHorizon),
    new THREE.Color(GOLDEN.skyHorizon),
    t,
  );
  skyUniforms.uBottom.value.lerpColors(
    new THREE.Color(DAY.skyBottom),
    new THREE.Color(GOLDEN.skyBottom),
    t,
  );
  skyUniforms.uSunColor.value.lerpColors(
    new THREE.Color(DAY.skySun),
    new THREE.Color(GOLDEN.skySun),
    t,
  );
  skyUniforms.uSunDirection.value
    .copy(DAY.sunPos)
    .normalize()
    .lerp(GOLDEN.sunPos.clone().normalize(), t)
    .normalize();
  skyUniforms.uSunIntensity.value = lerp(DAY.skySunIntensity, GOLDEN.skySunIntensity, t);

  scene.fog.color.lerpColors(new THREE.Color(DAY.fog), new THREE.Color(GOLDEN.fog), t);
  scene.fog.density = lerp(DAY.fogDensity, GOLDEN.fogDensity, t);
  renderer.toneMappingExposure = lerp(DAY.exposure, GOLDEN.exposure, t);

  glassMaterials.forEach((material) => {
    material.emissiveIntensity = lerp(DAY.glassGlow, GOLDEN.glassGlow, t);
  });
  lampMaterials.forEach((material) => {
    material.emissiveIntensity = lerp(0.1, 2.6, t);
  });
  pathLights.forEach((light) => {
    light.intensity = lerp(DAY.pathLight, GOLDEN.pathLight, t);
  });
  interiorLights.forEach((light, index) => {
    light.intensity = lerp(index === 0 ? 10 : 7, index === 0 ? 20 : 14, t);
  });

  cloudMaterials.forEach((material) => {
    material.color.lerpColors(new THREE.Color(DAY.cloudColor), new THREE.Color(GOLDEN.cloudColor), t);
    material.opacity = lerp(DAY.cloudOpacity, GOLDEN.cloudOpacity, t);
  });
  mistMaterials.forEach((material) => {
    material.color.lerpColors(new THREE.Color(0xdde8dd), new THREE.Color(0xffc7a0), t);
    material.opacity = lerp(0.1, 0.07, t);
  });
}

function setLightMode(mode) {
  if (mode === currentMode) return;
  currentMode = mode;
  const target = mode === 'golden' ? 1 : 0;
  const start = lightT;
  const startTime = performance.now();
  const duration = reducedMotion ? 1 : 1200;

  lightTween = { start, target, startTime, duration };
  scene.environment = mode === 'golden' ? goldenEnv : dayEnv;
  document.body.classList.toggle('is-golden', mode === 'golden');
  lightBtn.setAttribute('aria-pressed', String(mode === 'golden'));
  lightBtn.setAttribute(
    'aria-label',
    mode === 'golden' ? 'Switch to daylight' : 'Switch to golden hour',
  );
  lightBtn.title = mode === 'golden' ? 'Daylight' : 'Golden hour';
}

function updateLightTween(now) {
  if (!lightTween) return;
  const t = clamp((now - lightTween.startTime) / lightTween.duration, 0, 1);
  lightT = lerp(lightTween.start, lightTween.target, easeInOutCubic(t));
  applyLighting(lightT);
  if (t >= 1) {
    lightT = lightTween.target;
    lightTween = null;
    applyLighting(lightT);
  }
}

/* -------------------------------------------------------------------------- */
/*  UI                                                                        */
/* -------------------------------------------------------------------------- */

presetButtons.forEach((button) => {
  button.addEventListener('click', () => {
    userInteracted = true;
    flyToPreset(button.dataset.preset);
  });
});

rotateBtn.addEventListener('click', () => {
  autoRotateWanted = !autoRotateWanted;
  controls.autoRotate = autoRotateWanted && !cameraTween;
  rotateBtn.classList.toggle('is-on', autoRotateWanted);
  rotateBtn.setAttribute('aria-pressed', String(autoRotateWanted));
  if (autoRotateWanted) hideHint();
});

lightBtn.addEventListener('click', () => {
  setLightMode(currentMode === 'day' ? 'golden' : 'day');
});

infoBtn.addEventListener('click', () => {
  if (typeof infoPanel.showModal === 'function') infoPanel.showModal();
});

infoClose.addEventListener('click', () => infoPanel.close());

infoPanel.addEventListener('click', (event) => {
  if (event.target === infoPanel) infoPanel.close();
});

retryBtn.addEventListener('click', () => window.location.reload());

canvas.addEventListener('pointerdown', () => {
  userInteracted = true;
  hideHint();
  if (cameraTween) {
    cameraTween = null;
    controls.enabled = true;
    controls.autoRotate = autoRotateWanted;
  }
});

controls.addEventListener('start', () => {
  userInteracted = true;
  hideHint();
  if (resumeTimer) {
    clearTimeout(resumeTimer);
    resumeTimer = 0;
  }
  controls.autoRotate = false;
});

controls.addEventListener('end', () => {
  if (!autoRotateWanted || cameraTween) return;
  if (resumeTimer) clearTimeout(resumeTimer);
  resumeTimer = window.setTimeout(() => {
    if (autoRotateWanted && !cameraTween && !lightTween) controls.autoRotate = true;
  }, 3200);
});

window.addEventListener('keydown', (event) => {
  if (infoPanel.open) return;
  if (event.key === '1') flyToPreset('hero');
  if (event.key === '2') flyToPreset('garden');
  if (event.key === '3') flyToPreset('aerial');
  if (event.key.toLowerCase() === 'r') rotateBtn.click();
  if (event.key.toLowerCase() === 'l') lightBtn.click();
  if (event.key.toLowerCase() === 'i') infoBtn.click();
});

/* -------------------------------------------------------------------------- */
/*  Resize                                                                    */
/* -------------------------------------------------------------------------- */

function onResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.fov = fovForViewport();
  camera.updateProjectionMatrix();

  pixelRatio = Math.min(window.devicePixelRatio || 1, isTouch ? 2 : 1.8);
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(width, height);

  if (house) {
    computeFraming();
    if (!userInteracted && !cameraTween) {
      flyToPreset(currentPreset, { immediate: true });
    }
  }
}

window.addEventListener('resize', onResize);
window.addEventListener('orientationchange', () => setTimeout(onResize, 120));

/* -------------------------------------------------------------------------- */
/*  Animation                                                                 */
/* -------------------------------------------------------------------------- */

let qualityAccum = 0;
let qualityFrames = 0;

function updateDust(dt) {
  const positions = dust.geometry.attributes.position.array;
  for (let i = 0; i < dustCount; i += 1) {
    positions[i * 3 + 1] += dt * 0.11;
    positions[i * 3] += Math.sin(performance.now() * 0.0002 + i) * dt * 0.02;
    if (positions[i * 3 + 1] > 9) positions[i * 3 + 1] = 0.4;
  }
  dust.geometry.attributes.position.needsUpdate = true;
}

function monitorQuality(dt) {
  if (!isTouch) return;
  qualityAccum += dt;
  qualityFrames += 1;
  if (qualityAccum < 3) return;

  const fps = qualityFrames / qualityAccum;
  if (fps < 42 && pixelRatio > 1.25) {
    pixelRatio = Math.max(1.25, pixelRatio - 0.3);
    renderer.setPixelRatio(pixelRatio);
  }
  qualityAccum = 0;
  qualityFrames = 0;
}

let lastFrameTime = performance.now();

function animate(now) {
  requestAnimationFrame(animate);
  const dt = Math.min((now - lastFrameTime) / 1000, 0.05);
  lastFrameTime = now;

  updateCameraTween(now);
  updateLightTween(now);

  if (controls.enabled) controls.update();

  sky.position.copy(camera.position);
  cloudGroup.rotation.y += dt * 0.0035;
  mistGroup.rotation.y += dt * 0.0012;
  updateDust(dt);

  monitorQuality(dt);
  renderer.render(scene, camera);
}

/* -------------------------------------------------------------------------- */
/*  Boot                                                                      */
/* -------------------------------------------------------------------------- */

applyLighting(0);
setLoaderProgress(0.02);
rotateBtn.classList.toggle('is-on', autoRotateWanted);
rotateBtn.setAttribute('aria-pressed', String(autoRotateWanted));

// Start with a wide, atmospheric view while the model downloads.
const bootTarget = new THREE.Vector3(0, 3.1, 0);
const bootRadius = 36;
const bootPhi = THREE.MathUtils.degToRad(71);
const bootTheta = THREE.MathUtils.degToRad(66);
camera.position.set(
  bootTarget.x + bootRadius * Math.sin(bootPhi) * Math.sin(bootTheta),
  bootTarget.y + bootRadius * Math.cos(bootPhi),
  bootTarget.z + bootRadius * Math.sin(bootPhi) * Math.cos(bootTheta),
);
controls.target.copy(bootTarget);
controls.update();

loadHouse();
requestAnimationFrame(animate);
