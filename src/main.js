import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { Track, makeCanvasTexture } from './track.js';
import { World } from './world.js';
import { Car, Rival } from './car.js';
import { HUD, formatTime } from './hud.js';
import { GameAudio } from './audio.js';

const $ = (id) => document.getElementById(id);
const clamp = THREE.MathUtils.clamp;
const lerp = THREE.MathUtils.lerp;

/* ------------------------------------------------------------------ */
/*  Renderer / scene                                                   */
/* ------------------------------------------------------------------ */

const canvas = $('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
const gl = renderer.getContext();
const dbgInfo = gl.getExtension('WEBGL_debug_renderer_info');
const gpuName = dbgInfo ? String(gl.getParameter(dbgInfo.UNMASKED_RENDERER_WEBGL)) : '';
const softwareGPU = /llvmpipe|swiftshader|software/i.test(gpuName);
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, softwareGPU ? 0.85 : 1.75));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.12;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(62, window.innerWidth / window.innerHeight, 0.1, 8000);
camera.position.set(-150, 8, 238);

const track = new Track();
scene.add(track.group);
const world = new World(scene, track);
if (softwareGPU) {
  world.sun.shadow.mapSize.set(1024, 1024);
}

const PLAYER_START_U = 0.9895;
const player = new Car(track, 0xff4d2e, { u: PLAYER_START_U, offset: 0, number: 7 });
scene.add(player.mesh);

const rivalDefs = [
  { color: 0x3b82f6, u: 0.9915, lane: 2.6, baseSpeed: 40, number: 3, css: '#4c8dff' },
  { color: 0x9bff57, u: 0.9945, lane: -2.6, baseSpeed: 43, number: 11, css: '#9bff57' },
  { color: 0xb07cff, u: 0.9965, lane: 0, baseSpeed: 46, number: 24, css: '#c08cff' }
];
const rivals = rivalDefs.map((d) => {
  const r = new Rival(track, d.color, {
    u: d.u,
    lane: d.lane,
    baseSpeed: d.baseSpeed,
    number: d.number,
    originU: PLAYER_START_U
  });
  scene.add(r.mesh);
  return r;
});

const hud = new HUD(track, rivalDefs.map((d) => d.css));
const audio = new GameAudio();

/* ------------------------------------------------------------------ */
/*  Post processing                                                    */
/* ------------------------------------------------------------------ */

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.34, 0.6, 0.86);
composer.addPass(bloom);
composer.addPass(new OutputPass());
let bloomEnabled = true;

/* ------------------------------------------------------------------ */
/*  Smoke / spark particles                                            */
/* ------------------------------------------------------------------ */

const PARTICLE_COUNT = 220;
const pPos = new Float32Array(PARTICLE_COUNT * 3);
const pCol = new Float32Array(PARTICLE_COUNT * 3);
const pAlpha = new Float32Array(PARTICLE_COUNT);
const pSize = new Float32Array(PARTICLE_COUNT);
const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
  life: 0, max: 1, vx: 0, vy: 0, vz: 0, grow: 1
}));
let pCursor = 0;

const pGeo = new THREE.BufferGeometry();
pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
pGeo.setAttribute('alpha', new THREE.BufferAttribute(pAlpha, 1));
pGeo.setAttribute('psize', new THREE.BufferAttribute(pSize, 1));

const pTex = makeCanvasTexture(64, 64, (ctx, w, h) => {
  const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.4, 'rgba(255,255,255,0.55)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}, { repeat: false });

const pMat = new THREE.ShaderMaterial({
  uniforms: { uTex: { value: pTex } },
  transparent: true,
  depthWrite: false,
  vertexShader: `
    attribute float alpha;
    attribute float psize;
    attribute vec3 color;
    varying float vA;
    varying vec3 vC;
    void main() {
      vA = alpha;
      vC = color;
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = psize * (340.0 / max(1.0, -mv.z));
      gl_Position = projectionMatrix * mv;
    }
  `,
  fragmentShader: `
    uniform sampler2D uTex;
    varying float vA;
    varying vec3 vC;
    void main() {
      vec4 t = texture2D(uTex, gl_PointCoord);
      float a = t.a * vA;
      if (a < 0.01) discard;
      gl_FragColor = vec4(vC, a);
    }
  `
});
const points = new THREE.Points(pGeo, pMat);
points.frustumCulled = false;
scene.add(points);

const tmpColor = new THREE.Color();
function emitParticle(x, y, z, vx, vy, vz, color, size, life, grow = 1) {
  const i = pCursor;
  pCursor = (pCursor + 1) % PARTICLE_COUNT;
  const p = particles[i];
  p.life = life;
  p.max = life;
  p.vx = vx;
  p.vy = vy;
  p.vz = vz;
  p.grow = grow;
  pPos[i * 3] = x;
  pPos[i * 3 + 1] = y;
  pPos[i * 3 + 2] = z;
  tmpColor.set(color);
  pCol[i * 3] = tmpColor.r;
  pCol[i * 3 + 1] = tmpColor.g;
  pCol[i * 3 + 2] = tmpColor.b;
  pAlpha[i] = 0.6;
  pSize[i] = size;
}

function updateParticles(dt) {
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = particles[i];
    if (p.life <= 0) {
      pAlpha[i] = 0;
      continue;
    }
    p.life -= dt;
    const t = Math.max(0, p.life / p.max);
    p.vx *= 0.96;
    p.vz *= 0.96;
    p.vy += 0.55 * dt;
    pPos[i * 3] += p.vx * dt;
    pPos[i * 3 + 1] += p.vy * dt;
    pPos[i * 3 + 2] += p.vz * dt;
    pAlpha[i] = t * 0.55;
    pSize[i] += p.grow * dt * 18;
  }
  pGeo.attributes.position.needsUpdate = true;
  pGeo.attributes.alpha.needsUpdate = true;
  pGeo.attributes.psize.needsUpdate = true;
  pGeo.attributes.color.needsUpdate = true;
}

/* ------------------------------------------------------------------ */
/*  Game state                                                         */
/* ------------------------------------------------------------------ */

const BEST_KEY = 'sunsetCircuitBestLap';
let storedBest = null;
try {
  const v = parseFloat(localStorage.getItem(BEST_KEY));
  if (isFinite(v) && v > 0) storedBest = v;
} catch (e) { /* ignore */ }

const game = {
  state: 'menu',
  prevState: 'racing',
  time: 0,
  raceTime: 0,
  lapStart: 0,
  lap: 1,
  best: storedBest,
  position: 4,
  topSpeed: 0,
  countdown: 0,
  lastCount: null,
  cameraMode: 0,
  finishTimer: 0,
  resultsShown: false,
  placement: 4,
  autoLaunch: 0,
  acc: 0
};
hud.setBest(game.best);

const camLook = new THREE.Vector3();
const camTarget = new THREE.Vector3();
const tmpV = new THREE.Vector3();
const tmpV2 = new THREE.Vector3();

/* ------------------------------------------------------------------ */
/*  Input                                                              */
/* ------------------------------------------------------------------ */

const keys = new Set();
const touch = { left: false, right: false, gas: false, brake: false, nitro: false, drift: false };

window.addEventListener('keydown', (e) => {
  const code = e.code;
  if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(code)) e.preventDefault();
  keys.add(code);
  if (e.repeat) return;

  if (code === 'KeyP' || code === 'Escape') togglePause();
  else if (code === 'KeyC') game.cameraMode = (game.cameraMode + 1) % 3;
  else if (code === 'KeyR' && (game.state === 'racing' || game.state === 'countdown')) respawnPlayer();
  else if (code === 'KeyM') toggleMute();
  else if (code === 'Enter') {
    if (game.state === 'menu') startRace();
    else if (game.state === 'finished') restartRace();
  }
});
window.addEventListener('keyup', (e) => keys.delete(e.code));
window.addEventListener('blur', () => {
  keys.clear();
  if (game.state === 'racing') togglePause(true);
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden && game.state === 'racing') togglePause(true);
});

function bindTouch(el) {
  const key = el.dataset.touch;
  const set = (v) => {
    touch[key] = v;
    el.classList.toggle('on', v);
  };
  el.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    set(true);
    el.setPointerCapture?.(e.pointerId);
  });
  const off = (e) => { e.preventDefault(); set(false); };
  el.addEventListener('pointerup', off);
  el.addEventListener('pointercancel', off);
  el.addEventListener('pointerleave', off);
}
document.querySelectorAll('[data-touch]').forEach(bindTouch);

function getInput() {
  let steer = 0;
  if (keys.has('KeyA') || keys.has('ArrowLeft') || touch.left) steer -= 1;
  if (keys.has('KeyD') || keys.has('ArrowRight') || touch.right) steer += 1;
  let throttle = keys.has('KeyW') || keys.has('ArrowUp') || touch.gas ? 1 : 0;
  let brake = keys.has('KeyS') || keys.has('ArrowDown') || touch.brake ? 1 : 0;
  let handbrake = keys.has('Space') || touch.drift;
  let nitro = keys.has('ShiftLeft') || keys.has('ShiftRight') || touch.nitro;

  const pads = navigator.getGamepads ? navigator.getGamepads() : [];
  const pad = pads && pads[0];
  if (pad) {
    const ax = pad.axes[0] || 0;
    if (Math.abs(ax) > 0.16) steer = ax;
    const rt = pad.buttons[7]?.value || 0;
    const lt = pad.buttons[6]?.value || 0;
    if (rt > 0.05) throttle = Math.max(throttle, rt);
    if (lt > 0.05) brake = Math.max(brake, lt);
    if (pad.buttons[0]?.pressed) handbrake = true;
    if (pad.buttons[5]?.pressed) nitro = true;
  }
  return { steer, throttle, brake, handbrake, nitro };
}

const NEUTRAL = { steer: 0, throttle: 0, brake: 0, handbrake: false, nitro: false };

/* ------------------------------------------------------------------ */
/*  Buttons                                                            */
/* ------------------------------------------------------------------ */

$('startBtn').addEventListener('click', startRace);
$('resumeBtn').addEventListener('click', () => togglePause());
$('restartBtn').addEventListener('click', restartRace);
$('againBtn').addEventListener('click', restartRace);
$('menuBtn').addEventListener('click', goToMenu);
$('pauseBtn').addEventListener('click', () => togglePause());
$('muteBtn').addEventListener('click', toggleMute);

function toggleMute() {
  audio.setMuted(!audio.muted);
  $('muteBtn').textContent = audio.muted ? '×' : '♪';
  $('muteBtn').style.opacity = audio.muted ? '0.5' : '1';
}

function togglePause(force = false) {
  if (game.state === 'racing' || game.state === 'countdown') {
    if (force || game.state === 'racing' || game.state === 'countdown') {
      game.prevState = game.state;
      game.state = 'paused';
      hud.showPause(true);
      hud.setHudVisible(false);
      keys.clear();
    }
  } else if (game.state === 'paused') {
    game.state = game.prevState;
    hud.showPause(false);
    hud.setHudVisible(true);
    if (game.state === 'countdown') hud.setCountdown(String(Math.ceil(game.countdown)), false);
  }
}

function resetRaceState() {
  player.reset(PLAYER_START_U, 0);
  for (const r of rivals) r.reset();
  game.raceTime = 0;
  game.lapStart = 0;
  game.lap = 1;
  game.position = 4;
  game.topSpeed = 0;
  game.finishTimer = 0;
  game.resultsShown = false;
  game.lastCount = null;
  camLook.copy(player.pos).add(new THREE.Vector3(0, 1, 0));
  track.setStartLights('red');
  for (let i = 0; i < PARTICLE_COUNT; i++) particles[i].life = 0;
  hud.showFinish(false);
  hud.setBest(game.best);
}

function startRace() {
  audio.init();
  audio.resume();
  hud.showStart(false);
  hud.showFinish(false);
  hud.showPause(false);
  hud.setHudVisible(true);
  hud.setTouchVisible(window.matchMedia('(pointer: coarse)').matches);
  resetRaceState();
  game.state = 'racing';
  game.raceTime = 0;
  game.lapStart = 0;
  game.lap = 1;
  game.autoLaunch = 2.4;
  game.acc = 0;
  track.setStartLights('go');
  hud.setCountdown('GO!', true);
  setTimeout(() => hud.hideCountdown(), 850);
  setTimeout(() => { if (game.state === 'racing' || game.state === 'finished') track.setStartLights('off'); }, 1600);
  audio.beep(880, 0.32, 'square', 0.18);
  // Snap the chase camera behind the car so the first frame is composed.
  const portrait = camera.aspect < 0.85;
  camera.position.copy(player.pos).addScaledVector(player.forward, portrait ? -7.8 : -6.9);
  camera.position.y += portrait ? 3.2 : 2.95;
  camLook.copy(player.pos).addScaledVector(player.forward, 8);
  camLook.y += 1.1;
  camera.lookAt(camLook);
  updateHud(0);
  $('loading').classList.add('done');
}

function restartRace() {
  startRace();
}

function goToMenu() {
  game.state = 'menu';
  hud.showFinish(false);
  hud.showPause(false);
  hud.setHudVisible(false);
  hud.showStart(true);
  hud.setTouchVisible(false);
  resetRaceState();
  track.setStartLights('off');
}

function respawnPlayer() {
  const u = player.lastU;
  const total = player.total;
  player.reset(u, 0);
  player.total = total;
  player.lastU = player.startU;
  audio.beep(240, 0.1, 'sine', 0.1);
}

function finishRace() {
  if (game.state !== 'racing') return;
  const lapTime = game.raceTime - game.lapStart;
  if (!game.best || lapTime < game.best) {
    game.best = lapTime;
    try { localStorage.setItem(BEST_KEY, String(lapTime)); } catch (e) { /* ignore */ }
    hud.setBest(game.best);
  }
  game.placement = 1 + rivals.filter((r) => r.raceDistance >= 3).length;
  game.state = 'finished';
  game.finishTimer = 0;
  game.resultsShown = false;
  track.setStartLights('off');
  hud.setHudVisible(false);
  hud.setTouchVisible(false);
  audio.finishFanfare();
}

/* ------------------------------------------------------------------ */
/*  Camera                                                             */
/* ------------------------------------------------------------------ */

let shake = 0;

function updateCamera(dt) {
  const speedFrac = clamp(player.speedKmh / 260, 0, 1);
  const portrait = camera.aspect < 0.85;
  if (game.state === 'menu') {
    const t = game.time;
    const back = (portrait ? 8.6 : 7.2) + Math.sin(t * 0.13) * (portrait ? 0.6 : 1.2);
    const side = portrait ? 1.0 : 2.6 + Math.sin(t * 0.21) * 0.9;
    camTarget.copy(player.pos).addScaledVector(player.forward, 9);
    camTarget.y += 1.0;
    tmpV.copy(player.pos).addScaledVector(player.forward, -back).addScaledVector(player.right, side);
    tmpV.y += portrait ? 3.2 : 2.9;
    camera.position.lerp(tmpV, 1 - Math.exp(-dt * 1.8));
    camLook.lerp(camTarget, 1 - Math.exp(-dt * 3));
    camera.lookAt(camLook);
    camera.fov = lerp(camera.fov, portrait ? 66 : 56, 1 - Math.exp(-dt * 2));
    camera.updateProjectionMatrix();
    return;
  }

  if (game.state === 'finished') {
    const a = game.time * 0.22 + 1.2;
    const orbit = portrait ? 10 : 8.5;
    camTarget.copy(player.pos).add(new THREE.Vector3(0, 0.8, 0));
    tmpV.set(camTarget.x + Math.cos(a) * orbit, 3.2 + Math.sin(a * 0.9) * 0.5, camTarget.z + Math.sin(a) * orbit);
    camera.position.lerp(tmpV, 1 - Math.exp(-dt * 1.6));
    camLook.lerp(camTarget, 1 - Math.exp(-dt * 4));
    camera.lookAt(camLook);
    camera.fov = lerp(camera.fov, portrait ? 60 : 50, 1 - Math.exp(-dt * 2));
    camera.updateProjectionMatrix();
    return;
  }

  if (game.state === 'countdown') {
    const a = 2.1 + game.countdown * 0.18;
    const orbit = portrait ? 9.4 : 8.2;
    camTarget.copy(player.pos).add(new THREE.Vector3(0, 0.85, 0));
    tmpV.set(camTarget.x + Math.cos(a) * orbit, 2.9, camTarget.z + Math.sin(a) * orbit);
    camera.position.lerp(tmpV, 1 - Math.exp(-dt * 2.4));
    camLook.lerp(camTarget, 1 - Math.exp(-dt * 5));
    camera.lookAt(camLook);
    camera.fov = lerp(camera.fov, portrait ? 64 : 58, 1 - Math.exp(-dt * 2));
    camera.updateProjectionMatrix();
    return;
  }

  const mode = game.cameraMode;
  if (mode === 2) {
    tmpV.copy(player.pos).addScaledVector(player.forward, 0.35);
    tmpV.y += 1.42;
    camera.position.lerp(tmpV, 1 - Math.exp(-dt * 20));
    tmpV2.copy(player.pos).addScaledVector(player.forward, 24);
    tmpV2.y += 1.1;
    camLook.lerp(tmpV2, 1 - Math.exp(-dt * 12));
    camera.lookAt(camLook);
  } else {
    const back = (mode === 0 ? 6.9 : 11.8) * (portrait ? 1.1 : 1);
    const height = (mode === 0 ? 2.95 : 5.2) + (portrait ? 0.3 : 0);
    tmpV.copy(player.pos).addScaledVector(player.forward, -back);
    tmpV.y += height;
    tmpV.addScaledVector(player.right, -player.steer * 1.05);
    camera.position.lerp(tmpV, 1 - Math.exp(-dt * 5.2));
    if (camera.position.y < 1.1) camera.position.y = 1.1;
    tmpV2.copy(player.pos).addScaledVector(player.forward, 5.5 + speedFrac * 6);
    tmpV2.y += 1.15;
    camLook.lerp(tmpV2, 1 - Math.exp(-dt * 7));
    camera.lookAt(camLook);
  }

  const targetFov = 60 + speedFrac * 14 + (portrait ? (1 - camera.aspect) * 24 : 0) + (player.nitro < 0.98 && game.state === 'racing' ? 2 : 0);
  camera.fov = lerp(camera.fov, targetFov, 1 - Math.exp(-dt * 3));
  camera.updateProjectionMatrix();

  if (shake > 0.001) {
    camera.position.x += (Math.random() - 0.5) * shake;
    camera.position.y += (Math.random() - 0.5) * shake * 0.7;
    camera.position.z += (Math.random() - 0.5) * shake;
    shake *= Math.exp(-dt * 4.5);
  }
}

/* ------------------------------------------------------------------ */
/*  Particles emission                                                 */
/* ------------------------------------------------------------------ */

function emitDrift() {
  const f = player.forward;
  const r = player.right;
  for (const s of [-1, 1]) {
    const x = player.pos.x - f.x * 1.45 + r.x * 0.82 * s;
    const z = player.pos.z - f.z * 1.45 + r.z * 0.82 * s;
    emitParticle(
      x, 0.28, z,
      -f.x * 2.4 + (Math.random() - 0.5) * 1.6,
      0.4 + Math.random() * 0.6,
      -f.z * 2.4 + (Math.random() - 0.5) * 1.6,
      player.onRoad ? 0xd8d2c6 : 0xb49a72,
      0.75, 0.9 + Math.random() * 0.5, 0.9
    );
  }
}

function emitBoost() {
  const f = player.forward;
  const r = player.right;
  for (const s of [-1, 1]) {
    const x = player.pos.x - f.x * 2.25 + r.x * 0.45 * s;
    const z = player.pos.z - f.z * 2.25 + r.z * 0.45 * s;
    emitParticle(
      x, 0.5, z,
      -f.x * 6 + (Math.random() - 0.5) * 1.2,
      0.3 + Math.random() * 0.5,
      -f.z * 6 + (Math.random() - 0.5) * 1.2,
      Math.random() > 0.5 ? 0xffb15e : 0xff5a2a,
      0.5, 0.32, 0.5
    );
  }
}

function emitSparks() {
  const f = player.forward;
  const r = player.right;
  for (let i = 0; i < 8; i++) {
    emitParticle(
      player.pos.x + r.x * 1.0 * Math.sign(player.offset) + (Math.random() - 0.5) * 1.2,
      0.5,
      player.pos.z + r.z * 1.0 * Math.sign(player.offset) + (Math.random() - 0.5) * 1.2,
      -f.x * 2 + (Math.random() - 0.5) * 7,
      1 + Math.random() * 4,
      -f.z * 2 + (Math.random() - 0.5) * 7,
      0xffa040, 0.28, 0.4, 0.2
    );
  }
}

/* ------------------------------------------------------------------ */
/*  Update                                                             */
/* ------------------------------------------------------------------ */

function updateHud(dt) {
  let gear = 'N';
  const kmh = player.speedKmh;
  if (player.vf < -0.5) gear = 'R';
  else if (kmh > 4) {
    const thresholds = [22, 52, 88, 128, 172, 215];
    gear = String(thresholds.findIndex((t) => kmh < t) + 1 || 6);
  }
  hud.update({
    speed: kmh,
    gear,
    lap: game.lap,
    time: game.raceTime,
    best: game.best,
    position: game.position,
    boost: player.nitro,
    drifting: player.drifting && player.speedKmh > 35,
    offTrack: !player.onRoad && player.speedKmh > 12,
    speedLines: (player.speedKmh > 205 || (player.nitro < 0.99 && player.vf > 25)) && game.state === 'racing'
  });
  hud.drawMap(player, rivals);
}

let hudTick = 0;

function update(dt) {
  game.time += dt;
  world.update(game.time, dt, player.pos, camera.position);
  updateParticles(dt);

  if (game.state === 'menu') {
    for (const r of rivals) r.syncVisual(0);
    player.sync(0);
    audio.update({ speed: 0, throttle: 0, drifting: false, boosting: false, onRoad: true, running: false });
  } else if (game.state === 'countdown') {
    game.countdown -= dt;
    const n = Math.ceil(game.countdown);
    if (n >= 1 && n !== game.lastCount) {
      game.lastCount = n;
      hud.setCountdown(String(n), false);
      audio.beep(440, 0.14, 'square', 0.14);
    }
    if (game.countdown <= 0) {
      game.state = 'racing';
      game.lastCount = 0;
      game.raceTime = 0;
      game.lapStart = 0;
      game.lap = 1;
      hud.setCountdown('GO!', true);
      audio.beep(880, 0.35, 'square', 0.18);
      track.setStartLights('go');
      setTimeout(() => {
        hud.hideCountdown();
        if (game.state === 'racing') track.setStartLights('off');
      }, 700);
    }
    player.sync(dt);
    for (const r of rivals) r.syncVisual(dt);
    audio.update({ speed: 0, throttle: 0, drifting: false, boosting: false, onRoad: true, running: true });
  } else if (game.state === 'racing') {
    let input = getInput();
    if (game.autoLaunch > 0) {
      const manual = input.throttle > 0 || input.brake > 0 || Math.abs(input.steer) > 0.05 || input.handbrake || input.nitro;
      if (manual) {
        game.autoLaunch = 0;
      } else {
        input = { ...input, throttle: 0.9, steer: 0 };
        game.autoLaunch -= dt;
      }
    }
    const STEP = 1 / 60;
    game.acc = Math.min(0.35, game.acc + dt);
    let steps = 0;
    while (game.acc >= STEP && steps < 22) {
      player.update(STEP, input);
      game.raceTime += STEP;
      game.topSpeed = Math.max(game.topSpeed, player.speedKmh);
      for (const r of rivals) r.update(STEP, game.raceTime, player.total);
      game.acc -= STEP;
      steps++;
    }
    if (steps >= 22) game.acc = 0;

    // lap completion
    const completed = Math.floor(player.total) + 1;
    if (completed > game.lap) {
      const lapTime = game.raceTime - game.lapStart;
      game.lapStart = game.raceTime;
      let newBest = false;
      if (!game.best || lapTime < game.best) {
        game.best = lapTime;
        newBest = true;
        try { localStorage.setItem(BEST_KEY, String(lapTime)); } catch (e) { /* ignore */ }
        hud.setBest(game.best);
      }
      if (completed > 3) {
        finishRace();
      } else {
        game.lap = completed;
        hud.toast(`LAP ${completed} / 3`, newBest ? `NEW BEST · ${formatTime(lapTime)}` : formatTime(lapTime));
        audio.lapChime(newBest);
      }
    }

    if (game.state === 'racing' && player.total >= 3) finishRace();

    // position
    game.position = 1 + rivals.filter((r) => r.raceDistance > player.total).length;

    // particles
    if (player.drifting && player.speedKmh > 35) emitDrift();
    if (!player.onRoad && player.speedKmh > 15) {
      emitParticle(
        player.pos.x - player.forward.x * 1.4,
        0.25,
        player.pos.z - player.forward.z * 1.4,
        (Math.random() - 0.5) * 2,
        0.4 + Math.random() * 0.5,
        (Math.random() - 0.5) * 2,
        0xb49a72, 0.85, 0.8, 1.1
      );
    }
    if (input.nitro && player.nitro > 0.02 && input.throttle > 0) emitBoost();
    if (player.wallHit > 0.25) {
      emitSparks();
      shake = Math.max(shake, 0.25);
    }
    if (player.drifting) shake = Math.max(shake, 0.035);

    audio.update({
      speed: player.speedKmh,
      throttle: input.throttle,
      drifting: player.drifting,
      boosting: input.nitro && player.nitro > 0.02 && input.throttle > 0,
      onRoad: player.onRoad,
      running: true
    });

    hudTick += dt;
    if (hudTick > 1 / 30) {
      hudTick = 0;
      updateHud(dt);
    }
  } else if (game.state === 'finished') {
    for (const r of rivals) r.update(dt, game.time, player.total);
    player.sync(dt);
    game.finishTimer += dt;
    if (game.finishTimer > 1.15 && !game.resultsShown) {
      game.resultsShown = true;
      hud.showResults({
        placement: game.placement,
        time: game.raceTime,
        best: game.best,
        top: game.topSpeed
      });
    }
    audio.update({ speed: 0, throttle: 0, drifting: false, boosting: false, onRoad: true, running: false });
  }

  if (game.state === 'racing' || game.state === 'countdown') {
    shake = Math.max(shake, clamp(player.speedKmh / 900, 0, 0.12));
  }
  updateCamera(dt);
}

/* ------------------------------------------------------------------ */
/*  Render loop                                                        */
/* ------------------------------------------------------------------ */

let last = performance.now();
let firstFrame = true;

function frame(now) {
  requestAnimationFrame(frame);
  const dt = Math.min(0.25, (now - last) / 1000);
  last = now;
  if (game.state !== 'paused') update(dt);

  if (bloomEnabled) composer.render();
  else renderer.render(scene, camera);

  if (firstFrame) {
    firstFrame = false;
    setTimeout(() => $('loading').classList.add('done'), 120);
  }
}

function onResize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  composer.setSize(w, h);
  bloom.setSize(w, h);
}
window.addEventListener('resize', onResize);

/* ------------------------------------------------------------------ */
/*  Boot                                                               */
/* ------------------------------------------------------------------ */

resetRaceState();
track.setStartLights('off');
hud.setBest(game.best);
camLook.copy(player.pos).add(new THREE.Vector3(0, 1, 0));
camera.position.copy(player.pos).add(new THREE.Vector3(10, 4.5, 10));
requestAnimationFrame(frame);

// Expose a tiny debug surface for automated verification.
window.__sunset = {
  game,
  player,
  rivals,
  track,
  renderer,
  camera,
  composer,
  bloom,
  scene,
  softwareGPU,
  gpuName,
  startRace,
  restartRace,
  goToMenu,
  setBloom(v) { bloomEnabled = v; },
  setShadows(v) { renderer.shadowMap.enabled = v; },
  get speedKmh() { return player.speedKmh; },
  get state() { return game.state; }
};
