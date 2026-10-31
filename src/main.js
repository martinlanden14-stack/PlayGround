import * as THREE from 'three';
import { createWorld, ROADS } from './world.js';
import {
  makePlayer, animatePlayer, makeCar, makeSimplePerson, makeMarker,
  makeHelicopter, makeBlobShadow
} from './entities.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const $ = (id) => document.getElementById(id);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const damp = (a, b, rate, dt) => lerp(a, b, 1 - Math.exp(-rate * dt));
const angleDelta = (a, b) => Math.atan2(Math.sin(b - a), Math.cos(b - a));
const angleDamp = (a, b, rate, dt) => a + angleDelta(a, b) * (1 - Math.exp(-rate * dt));
const nowSec = () => performance.now() / 1000;
const fmtMoney = (v) => '$' + Math.max(0, Math.round(v)).toLocaleString('en-US');
const fmtTime = (s) => `${String(Math.floor(Math.max(0, s) / 60)).padStart(2, '0')}:${String(Math.floor(Math.max(0, s) % 60)).padStart(2, '0')}`;
const rand = (a = 0, b = 1) => a + Math.random() * (b - a);

const isTouch = matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0;
const isDesktop = matchMedia('(hover: hover) and (pointer: fine)').matches && innerWidth > 900;

const canvas = $('game');

// ---------------------------------------------------------------------------
// Renderer / scene
// ---------------------------------------------------------------------------
const renderer = new THREE.WebGLRenderer({
  canvas, antialias: !isTouch, powerPreference: 'high-performance', stencil: false
});
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isTouch ? 1.45 : 1.8));
renderer.setSize(innerWidth, innerHeight, false);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.28;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xe98468, 95, 340);

const camera = new THREE.PerspectiveCamera(57, innerWidth / innerHeight, 0.1, 900);
camera.position.set(42, 24, -58);
camera.lookAt(0, 7, 18);

// ---------------------------------------------------------------------------
// Sky, sun, lights
// ---------------------------------------------------------------------------
function makeSkyTexture() {
  const c = document.createElement('canvas');
  c.width = 1024; c.height = 512;
  const ctx = c.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#171334');
  grad.addColorStop(0.32, '#402154');
  grad.addColorStop(0.55, '#8e3f63');
  grad.addColorStop(0.72, '#e36b62');
  grad.addColorStop(0.84, '#ff9a6d');
  grad.addColorStop(0.94, '#ffc187');
  grad.addColorStop(1, '#f6a46e');
  ctx.fillStyle = grad; ctx.fillRect(0, 0, 1024, 512);

  // stars
  for (let i = 0; i < 160; i++) {
    const y = rand(0, 220);
    ctx.globalAlpha = rand(0.1, 0.75) * (1 - y / 260);
    ctx.fillStyle = '#fff8e8';
    ctx.fillRect(rand(0, 1024), y, rand(0.6, 1.8), rand(0.6, 1.8));
  }
  ctx.globalAlpha = 1;

  // wispy sunset clouds
  ctx.filter = 'blur(18px)';
  for (let i = 0; i < 22; i++) {
    const x = rand(-100, 1124);
    const y = rand(190, 390);
    const w = rand(90, 360);
    const h = rand(5, 22);
    const g = ctx.createLinearGradient(x, y, x, y + h);
    const warm = y > 300;
    g.addColorStop(0, warm ? 'rgba(255,187,140,0.05)' : 'rgba(255,170,180,0.03)');
    g.addColorStop(0.5, warm ? 'rgba(255,209,169,0.34)' : 'rgba(249,173,180,0.18)');
    g.addColorStop(1, 'rgba(60,25,60,0.02)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(x, y, w, h, rand(-0.05, 0.05), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.filter = 'none';

  // sun halo near the horizon
  const sun = ctx.createRadialGradient(720, 384, 2, 720, 384, 220);
  sun.addColorStop(0, 'rgba(255,247,204,0.98)');
  sun.addColorStop(0.08, 'rgba(255,222,143,0.9)');
  sun.addColorStop(0.25, 'rgba(255,165,91,0.38)');
  sun.addColorStop(0.6, 'rgba(255,110,90,0.1)');
  sun.addColorStop(1, 'rgba(255,90,90,0)');
  ctx.fillStyle = sun; ctx.fillRect(0, 0, 1024, 512);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  return tex;
}

const sky = new THREE.Mesh(
  new THREE.SphereGeometry(700, 32, 20),
  new THREE.MeshBasicMaterial({ map: makeSkyTexture(), side: THREE.BackSide, fog: false, depthWrite: false, toneMapped: false })
);
sky.rotation.y = -0.7;
scene.add(sky);

function makeGlowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, 'rgba(255,252,220,1)');
  g.addColorStop(0.12, 'rgba(255,228,158,0.98)');
  g.addColorStop(0.38, 'rgba(255,162,86,0.38)');
  g.addColorStop(1, 'rgba(255,120,70,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
const glowTexture = makeGlowTexture();

const sunSprite = new THREE.Sprite(new THREE.SpriteMaterial({
  map: glowTexture, color: 0xffd39a, transparent: true, blending: THREE.AdditiveBlending,
  depthWrite: false, fog: false, toneMapped: false
}));
sunSprite.position.set(34, 48, 320);
sunSprite.scale.set(118, 118, 1);
scene.add(sunSprite);

const hemi = new THREE.HemisphereLight(0xa4c7ff, 0x4a2c44, 1.7);
scene.add(hemi);
scene.add(new THREE.AmbientLight(0xffb99a, 0.5));

const sunLight = new THREE.DirectionalLight(0xffb078, 2.8);
sunLight.position.set(20, 70, 95);
sunLight.castShadow = true;
sunLight.shadow.mapSize.set(isTouch ? 1024 : 2048, isTouch ? 1024 : 2048);
sunLight.shadow.camera.left = -62;
sunLight.shadow.camera.right = 62;
sunLight.shadow.camera.top = 62;
sunLight.shadow.camera.bottom = -62;
sunLight.shadow.camera.near = 1;
sunLight.shadow.camera.far = 260;
sunLight.shadow.bias = -0.0007;
sunLight.shadow.normalBias = 0.035;
scene.add(sunLight);
scene.add(sunLight.target);

const rimLight = new THREE.DirectionalLight(0x6de5ff, 0.62);
rimLight.position.set(-80, 25, -60);
scene.add(rimLight);

const fillLight = new THREE.DirectionalLight(0xff9b78, 1.5);
fillLight.position.set(-70, 38, -85);
scene.add(fillLight);

// ---------------------------------------------------------------------------
// World / player
// ---------------------------------------------------------------------------
const world = createWorld(scene, renderer);

const player = makePlayer();
player.position.set(1.8, 0, 25);
player.rotation.y = 0;
scene.add(player);

const playerShadow = makeBlobShadow(0.9, 0.5);
playerShadow.position.y = 0.03;
scene.add(playerShadow);

// active objective + lockup markers
const objectiveMarker = makeMarker(0xffc85a);
objectiveMarker.visible = false;
scene.add(objectiveMarker);

const lockupMarker = makeMarker(0x65f3e0);
lockupMarker.position.set(120, 0, -80);
scene.add(lockupMarker);

// mission targets / cops / helicopter
const gangTargets = [];
const cops = [];
let helicopter = null;
const tracers = [];
const flashes = [];

// ---------------------------------------------------------------------------
// Audio
// ---------------------------------------------------------------------------
class AudioEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.engine = null;
    this.siren = null;
    this.master = null;
  }
  init() {
    if (this.ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = this.muted ? 0 : 0.5;
    this.master.connect(this.ctx.destination);

    const buffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.5, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    this.noise = buffer;
  }
  resume() { this.ctx?.resume(); }
  setMuted(v) {
    this.muted = v;
    if (this.master) this.master.gain.value = v ? 0 : 0.5;
  }
  tone(freq = 440, dur = 0.08, type = 'sine', vol = 0.15, slide = 0) {
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(20, freq + slide), t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(this.master);
    o.start(t); o.stop(t + dur + 0.02);
  }
  noiseBurst(dur = 0.12, vol = 0.3, freq = 1200, q = 0.7) {
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noise;
    const f = this.ctx.createBiquadFilter();
    f.type = 'bandpass'; f.frequency.value = freq; f.Q.value = q;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(f); f.connect(g); g.connect(this.master);
    src.start(t); src.stop(t + dur + 0.02);
  }
  shot() {
    this.noiseBurst(0.13, 0.32, 900, 0.55);
    this.tone(120, 0.11, 'square', 0.18, -70);
  }
  hit() { this.tone(90, 0.08, 'triangle', 0.13, -30); }
  cash() {
    this.tone(660, 0.09, 'triangle', 0.12);
    setTimeout(() => this.tone(880, 0.1, 'triangle', 0.1), 70);
    setTimeout(() => this.tone(1320, 0.16, 'sine', 0.09), 140);
  }
  complete() {
    [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => this.tone(f, 0.26, 'triangle', 0.1), i * 100));
  }
  fail() {
    [330, 262, 196].forEach((f, i) => setTimeout(() => this.tone(f, 0.3, 'sawtooth', 0.08, -20), i * 120));
  }
  ui() { this.tone(520, 0.04, 'sine', 0.06); }
  setEngine(on, speed = 0) {
    if (!this.ctx) return;
    if (!on) {
      if (this.engine) {
        const e = this.engine;
        e.gain.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.15);
        setTimeout(() => { try { e.osc1.stop(); e.osc2.stop(); } catch { /* noop */ } }, 700);
        this.engine = null;
      }
      return;
    }
    if (!this.engine) {
      const t = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();
      osc1.type = 'sawtooth'; osc2.type = 'square';
      osc1.frequency.value = 48; osc2.frequency.value = 24;
      filter.type = 'lowpass'; filter.frequency.value = 180; filter.Q.value = 2.5;
      gain.gain.value = 0.0001;
      osc1.connect(filter); osc2.connect(filter); filter.connect(gain); gain.connect(this.master);
      osc1.start(); osc2.start();
      this.engine = { osc1, osc2, filter, gain };
    }
    const e = this.engine;
    const t = this.ctx.currentTime;
    const v = clamp(Math.abs(speed) / 32, 0, 1);
    e.osc1.frequency.setTargetAtTime(44 + v * 92, t, 0.08);
    e.osc2.frequency.setTargetAtTime(22 + v * 46, t, 0.08);
    e.filter.frequency.setTargetAtTime(150 + v * 620, t, 0.1);
    e.gain.gain.setTargetAtTime(0.035 + v * 0.035, t, 0.1);
  }
  setSiren(on) {
    if (!this.ctx) return;
    if (!on) {
      if (this.siren) {
        try { this.siren.osc.stop(); this.siren.lfo.stop(); } catch { /* noop */ }
        this.siren = null;
      }
      return;
    }
    if (this.siren) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    const gain = this.ctx.createGain();
    osc.type = 'sine'; osc.frequency.value = 660;
    lfo.type = 'sine'; lfo.frequency.value = 0.55;
    lfoGain.gain.value = 140;
    gain.gain.value = 0.022;
    lfo.connect(lfoGain); lfoGain.connect(osc.frequency);
    osc.connect(gain); gain.connect(this.master);
    osc.start(); lfo.start();
    this.siren = { osc, lfo, gain };
  }
}
const audio = new AudioEngine();

// ---------------------------------------------------------------------------
// Game state
// ---------------------------------------------------------------------------
const game = {
  mode: 'loading',
  started: false,
  cash: Number(localStorage.getItem('sunset-city-cash') || 0) || 0,
  health: 100,
  armor: 0,
  wanted: 0,
  lastCrime: -999,
  heatTimer: 0,
  inCar: null,
  mission: null,
  freeRoam: true,
  deaths: 0,
  missionIndex: 0,
  elapsed: 0,
  lastDamage: -999,
  pendingDeath: false,
  pendingMissionFail: false,
  shake: 0,
  camYaw: 0,
  camPitch: 0.28,
  camDist: 7.4,
  camLook: new THREE.Vector3(),
  camPos: new THREE.Vector3(42, 24, -58),
  lookCooldown: 0,
  context: null,
  introT: 0,
  startTime: 0
};

const input = {
  x: 0, y: 0, mag: 0, sprint: false, brake: false, fire: false,
  keys: new Set()
};
const playerState = {
  heading: 0, speed: 0, vy: 0, onGround: true, aimingUntil: 0,
  fireCooldown: 0, stepPhase: 0, inCar: null
};

const LOCKUP = new THREE.Vector3(120, 0, -80);
const HOSPITAL = new THREE.Vector3(0, 0, 120);
const CLINIC = new THREE.Vector3(0, 0, 120);

// ---------------------------------------------------------------------------
// HUD refs
// ---------------------------------------------------------------------------
const hud = $('hud');
const healthFill = $('health-fill');
const armorFill = $('armor-fill');
const cashEl = $('cash');
const wantedEl = $('wanted');
const missionKicker = $('mission-kicker');
const missionTitle = $('mission-title');
const missionObjective = $('mission-objective');
const missionDistance = $('mission-distance');
const missionTimer = $('mission-timer');
const speedo = $('speedo');
const speedValue = $('speed-value');
const speedFill = $('speed-fill');
const carHealthFill = $('car-health-fill');
const contextPrompt = $('context-prompt');
const contextText = $('context-text');
const contextKey = $('context-key');
const contextBtn = $('context-btn');
const jumpBtn = $('jump-btn');
const brakeBtn = $('brake-btn');
const fireBtn = $('fire-btn');
const fireLabel = fireBtn.querySelector('span');
const toastEl = $('toast');
const damageFlash = $('damage-flash');
const crosshair = $('crosshair');
const districtLabel = $('district-label');
const minimap = $('minimap');
const mctx = minimap.getContext('2d');
const rotateHint = $('rotate-hint');

function updateCash() {
  cashEl.textContent = fmtMoney(game.cash);
  localStorage.setItem('sunset-city-cash', String(game.cash));
}
function updateHealth() {
  healthFill.style.width = `${clamp(game.health, 0, 100)}%`;
  armorFill.style.width = `${clamp(game.armor, 0, 100)}%`;
}
function updateWanted() {
  wantedEl.querySelectorAll('.star').forEach((el, i) => el.classList.toggle('active', i < game.wanted));
  wantedEl.classList.toggle('pulse', game.wanted >= 3);
  audio.setSiren(game.wanted > 0 && game.mode === 'playing');
}
let toastTimer = 0;
function toast(text, kind = '') {
  toastEl.textContent = text;
  toastEl.className = 'toast show ' + kind;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toastEl.className = 'toast ' + kind; }, 2300);
}
function flashDamage() {
  damageFlash.classList.add('on');
  setTimeout(() => damageFlash.classList.remove('on'), 90);
}

// ---------------------------------------------------------------------------
// Input
// ---------------------------------------------------------------------------
const joystick = $('joystick');
const joystickKnob = $('joystick-knob');
const touchInput = { x: 0, y: 0, mag: 0, active: false, pointerId: null };
let lookPointer = null;
let lookMoved = 0;

function setJoystickFromEvent(e) {
  const rect = joystick.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  let dx = e.clientX - cx;
  let dy = e.clientY - cy;
  const radius = rect.width * 0.34;
  const len = Math.hypot(dx, dy);
  if (len > radius) { dx = (dx / len) * radius; dy = (dy / len) * radius; }
  const nx = dx / radius;
  const ny = -dy / radius;
  const mag = Math.min(1, Math.hypot(nx, ny));
  touchInput.x = nx;
  touchInput.y = ny;
  touchInput.mag = mag;
  joystickKnob.style.transform = `translate(${dx}px, ${dy}px)`;
}

joystick.addEventListener('pointerdown', (e) => {
  e.preventDefault();
  touchInput.active = true;
  touchInput.pointerId = e.pointerId;
  joystick.classList.add('active');
  joystick.setPointerCapture(e.pointerId);
  setJoystickFromEvent(e);
});
joystick.addEventListener('pointermove', (e) => {
  if (!touchInput.active || e.pointerId !== touchInput.pointerId) return;
  e.preventDefault();
  setJoystickFromEvent(e);
});
function endJoystick(e) {
  if (e.pointerId !== touchInput.pointerId) return;
  touchInput.active = false;
  touchInput.pointerId = null;
  touchInput.x = 0; touchInput.y = 0; touchInput.mag = 0;
  joystick.classList.remove('active');
  joystickKnob.style.transform = 'translate(0px, 0px)';
}
joystick.addEventListener('pointerup', endJoystick);
joystick.addEventListener('pointercancel', endJoystick);
joystick.addEventListener('lostpointercapture', endJoystick);

let lookLastX = 0;
let lookLastY = 0;
function lookStart(e) {
  if (game.mode !== 'playing') return;
  if (lookPointer !== null) return;
  lookPointer = e.pointerId;
  lookMoved = 0;
  lookLastX = e.clientX;
  lookLastY = e.clientY;
  canvas.setPointerCapture?.(e.pointerId);
}
canvas.addEventListener('pointerdown', (e) => {
  if (game.mode !== 'playing') return;
  if (e.pointerType === 'mouse' && e.button === 2) {
    e.preventDefault();
    lookStart(e);
    return;
  }
  lookStart(e);
});
canvas.addEventListener('pointermove', (e) => {
  if (lookPointer !== e.pointerId) return;
  const dx = e.clientX - lookLastX;
  const dy = e.clientY - lookLastY;
  lookLastX = e.clientX;
  lookLastY = e.clientY;
  lookMoved += Math.abs(dx) + Math.abs(dy);
  game.camYaw += dx * 0.0048;
  game.camPitch = clamp(game.camPitch + dy * 0.0032, 0.05, 0.86);
  game.lookCooldown = 2.4;
});
canvas.addEventListener('pointerup', (e) => {
  if (lookPointer !== e.pointerId) return;
  const wasClick = lookMoved < 7;
  lookPointer = null;
  if (wasClick && e.pointerType === 'mouse' && game.mode === 'playing') tryShoot();
});
canvas.addEventListener('pointercancel', () => { lookPointer = null; });
canvas.addEventListener('contextmenu', (e) => e.preventDefault());
canvas.addEventListener('wheel', (e) => {
  if (game.mode !== 'playing') return;
  e.preventDefault();
  game.camDist = clamp(game.camDist + Math.sign(e.deltaY) * 0.55, 5.4, 11);
}, { passive: false });

function bindHold(el, onDown, onUp) {
  el.addEventListener('pointerdown', (e) => {
    e.preventDefault(); e.stopPropagation();
    el.setPointerCapture?.(e.pointerId);
    el.classList.add('pressed');
    onDown();
  });
  const up = (e) => {
    e.preventDefault();
    el.classList.remove('pressed');
    onUp?.();
  };
  el.addEventListener('pointerup', up);
  el.addEventListener('pointercancel', up);
  el.addEventListener('pointerleave', (e) => { if (e.buttons === 0) { el.classList.remove('pressed'); onUp?.(); } });
}
bindHold(fireBtn, () => { input.fire = true; tryShoot(); }, () => { input.fire = false; });
bindHold(brakeBtn, () => { input.brake = true; }, () => { input.brake = false; });
jumpBtn.addEventListener('pointerdown', (e) => { e.preventDefault(); e.stopPropagation(); jump(); });
contextBtn.addEventListener('pointerdown', (e) => { e.preventDefault(); e.stopPropagation(); doContext(); });
$('pause-btn').addEventListener('click', pauseGame);
$('sound-btn').addEventListener('click', toggleSound);
$('start-sound').addEventListener('click', toggleSound);
$('start-btn').addEventListener('click', startGame);
$('resume-btn').addEventListener('click', resumeGame);
$('restart-btn').addEventListener('click', restartGame);
$('continue-btn').addEventListener('click', continueAfterResult);

window.addEventListener('keydown', (e) => {
  if (e.repeat) {
    if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault();
    return;
  }
  input.keys.add(e.code);
  if (e.code === 'Escape') { if (game.mode === 'playing') pauseGame(); else if (game.mode === 'paused') resumeGame(); }
  if (e.code === 'KeyE') doContext();
  if (e.code === 'Space') { e.preventDefault(); jump(); }
  if (e.code === 'KeyM') toggleSound();
  if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') input.sprint = true;
  if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault();
});
window.addEventListener('keyup', (e) => {
  input.keys.delete(e.code);
  if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') input.sprint = false;
});
window.addEventListener('blur', () => {
  input.keys.clear();
  input.fire = false;
  input.brake = false;
  if (game.mode === 'playing') pauseGame();
});

function toggleSound() {
  audio.setMuted(!audio.muted);
  $('sound-btn').classList.toggle('muted', audio.muted);
  $('start-sound').classList.toggle('muted', audio.muted);
  $('start-sound').querySelector('span').textContent = audio.muted ? 'SOUND OFF' : 'SOUND ON';
  if (!audio.muted) { audio.init(); audio.resume(); audio.ui(); }
}

function jump() {
  if (game.mode !== 'playing' || game.inCar || !playerState.onGround) return;
  playerState.vy = 5.5;
  playerState.onGround = false;
  audio.tone(240, 0.08, 'triangle', 0.04, 70);
}

// ---------------------------------------------------------------------------
// Camera
// ---------------------------------------------------------------------------
const cameraRay = new THREE.Raycaster();
const camDesired = new THREE.Vector3();
const camTarget = new THREE.Vector3();

function updateCamera(dt) {
  const car = game.inCar;
  const target = car
    ? new THREE.Vector3(car.group.position.x, 1.15, car.group.position.z)
    : new THREE.Vector3(player.position.x, 1.45 + player.position.y, player.position.z);

  if (car) {
    if (game.lookCooldown <= 0) game.camYaw = angleDamp(game.camYaw, car.heading, 2.3, dt);
  }
  game.lookCooldown = Math.max(0, game.lookCooldown - dt);

  const portrait = innerWidth / innerHeight < 0.78;
  const dist = car ? game.camDist + 2.1 : game.camDist * (portrait ? 1.48 : 1);
  const cp = Math.cos(game.camPitch);
  const sp = Math.sin(game.camPitch);
  const offset = new THREE.Vector3(
    -Math.sin(game.camYaw) * cp * dist,
    sp * dist + 0.45,
    -Math.cos(game.camYaw) * cp * dist
  );
  camDesired.copy(target).add(offset);
  const shoulder = car || portrait ? 0 : 0.92;
  const rightX = Math.cos(game.camYaw);
  const rightZ = -Math.sin(game.camYaw);
  camDesired.x += rightX * shoulder;
  camDesired.z += rightZ * shoulder;

  // Keep the camera out of buildings.
  let allowed = 1;
  const steps = 14;
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const x = lerp(target.x, camDesired.x, t);
    const z = lerp(target.z, camDesired.z, t);
    if (world.isBlocked(x, z, 0.28)) { allowed = Math.max(0.12, t - 0.07); break; }
  }
  camDesired.x = lerp(target.x, camDesired.x, allowed);
  camDesired.z = lerp(target.z, camDesired.z, allowed);
  camDesired.y = lerp(target.y + 0.4, camDesired.y, allowed);

  const posRate = allowed < 0.98 ? 22 : 9.5;
  game.camPos.x = damp(game.camPos.x, camDesired.x, posRate, dt);
  game.camPos.y = damp(game.camPos.y, camDesired.y, posRate, dt);
  game.camPos.z = damp(game.camPos.z, camDesired.z, posRate, dt);

  const fwdX = Math.sin(game.camYaw);
  const fwdZ = Math.cos(game.camYaw);
  camTarget.set(
    target.x + fwdX * 2.1 + rightX * shoulder,
    target.y + 0.15,
    target.z + fwdZ * 2.1 + rightZ * shoulder
  );
  game.camLook.x = damp(game.camLook.x, camTarget.x, 12, dt);
  game.camLook.y = damp(game.camLook.y, camTarget.y, 12, dt);
  game.camLook.z = damp(game.camLook.z, camTarget.z, 12, dt);

  camera.position.copy(game.camPos);
  if (game.shake > 0.001) {
    const s = game.shake;
    camera.position.x += rand(-s, s);
    camera.position.y += rand(-s, s);
    camera.position.z += rand(-s, s);
    game.shake = damp(game.shake, 0, 10, dt);
  }
  camera.lookAt(game.camLook);

  sunLight.position.set(target.x + 55, 70, target.z + 95);
  sunLight.target.position.set(target.x, 0, target.z);
  sunLight.target.updateMatrixWorld();
}

// ---------------------------------------------------------------------------
// Player movement + vehicle physics
// ---------------------------------------------------------------------------
function combinedInput() {
  let x = touchInput.x;
  let y = touchInput.y;
  let mag = touchInput.mag;
  if (input.keys.has('KeyA') || input.keys.has('ArrowLeft')) x -= 1;
  if (input.keys.has('KeyD') || input.keys.has('ArrowRight')) x += 1;
  if (input.keys.has('KeyW') || input.keys.has('ArrowUp')) y += 1;
  if (input.keys.has('KeyS') || input.keys.has('ArrowDown')) y -= 1;
  if (input.keys.size) {
    const len = Math.hypot(x, y);
    if (len > 1) { x /= len; y /= len; }
    mag = Math.min(1, len);
  }
  return { x, y, mag };
}

function moveOnFoot(dt) {
  const inp = combinedInput();
  const moving = inp.mag > 0.12;
  const sprint = input.sprint || inp.mag > 0.9;
  const maxSpeed = sprint ? 8.1 : 5.4;
  const targetSpeed = moving ? inp.mag * maxSpeed : 0;
  playerState.speed = damp(playerState.speed, targetSpeed, moving ? 11 : 9, dt);

  if (moving) {
    const fwdX = Math.sin(game.camYaw);
    const fwdZ = Math.cos(game.camYaw);
    const rightX = Math.cos(game.camYaw);
    const rightZ = -Math.sin(game.camYaw);
    let dx = fwdX * inp.y + rightX * inp.x;
    let dz = fwdZ * inp.y + rightZ * inp.x;
    const len = Math.hypot(dx, dz) || 1;
    dx /= len; dz /= len;
    const dist = playerState.speed * dt;
    const nx = player.position.x + dx * dist;
    const nz = player.position.z + dz * dist;
    const r = 0.42;
    if (!world.isBlocked(nx, nz, r)) {
      player.position.x = nx; player.position.z = nz;
    } else if (!world.isBlocked(nx, player.position.z, r)) {
      player.position.x = nx;
    } else if (!world.isBlocked(player.position.x, nz, r)) {
      player.position.z = nz;
    } else {
      playerState.speed *= 0.3;
    }
    const heading = Math.atan2(dx, dz);
    playerState.heading = angleDamp(playerState.heading, heading, 13, dt);
    player.rotation.y = playerState.heading;
  }

  // jump / gravity
  playerState.vy -= 16 * dt;
  player.position.y += playerState.vy * dt;
  if (player.position.y <= 0) { player.position.y = 0; playerState.vy = 0; playerState.onGround = true; }

  const aiming = performance.now() < playerState.aimingUntil;
  animatePlayer(player, performance.now() / 1000, playerState.speed, aiming);
  playerShadow.position.set(player.position.x, 0.03, player.position.z);
  playerShadow.material.opacity = clamp(0.55 - player.position.y * 0.08, 0.18, 0.55);
  playerShadow.scale.setScalar(clamp(1 - player.position.y * 0.04, 0.7, 1));
  player.visible = true;
  playerShadow.visible = true;
  playerState.inCar = null;
}

function updateVehicle(dt) {
  const car = game.inCar;
  if (!car) return;
  const inp = combinedInput();
  const throttle = inp.y;
  const steer = inp.x;
  const absSpeed = Math.abs(car.speed);
  const maxFwd = car.detailed ? 34 : 30;
  const maxRev = 10;

  if (input.brake) {
    car.speed *= Math.exp(-3.6 * dt);
  } else if (throttle > 0.08) {
    car.speed += (car.detailed ? 19 : 15) * throttle * dt;
  } else if (throttle < -0.08) {
    if (car.speed > 1) car.speed += throttle * 24 * dt;
    else car.speed += throttle * 11 * dt;
  } else {
    car.speed *= Math.exp(-0.55 * dt);
  }
  car.speed = clamp(car.speed, -maxRev, maxFwd);
  if (absSpeed < 0.05 && Math.abs(throttle) < 0.05) car.speed = 0;

  const steerAuthority = clamp(absSpeed / 7, 0, 1) * (input.brake ? 1.35 : 1);
  const dirSign = car.speed < 0 ? -1 : 1;
  car.heading += steer * 1.72 * dt * steerAuthority * dirSign;
  car.group.rotation.y = car.heading;

  const fwdX = Math.sin(car.heading);
  const fwdZ = Math.cos(car.heading);
  const nx = car.group.position.x + fwdX * car.speed * dt;
  const nz = car.group.position.z + fwdZ * car.speed * dt;
  if (!world.carBlocked(nx, nz, car.heading)) {
    car.group.position.x = nx;
    car.group.position.z = nz;
  } else {
    const impact = Math.abs(car.speed);
    if (impact > 6) {
      game.shake = Math.max(game.shake, clamp(impact * 0.012, 0.05, 0.24));
      audio.hit();
      flashDamage();
      car.health -= impact * 0.55;
      if (impact > 12) toast('WATCH THE PAINT', 'bad');
      damagePlayer(impact * 0.45, false);
    }
    car.speed *= -0.22;
    if (Math.abs(car.speed) < 1.2) car.speed = 0;
  }

  car.group.position.y = 0;
  if (car.detailed && car.group.userData.body) {
    const body = car.group.userData.body;
    body.rotation.z = damp(body.rotation.z, -steer * clamp(car.speed / 30, 0, 1) * 0.07, 8, dt);
    body.rotation.x = damp(body.rotation.x, clamp((throttle > 0 ? 1 : 0) * 0.012, -0.03, 0.03), 6, dt);
  }
  const wheels = car.group.userData.wheels || [];
  for (const w of wheels) w.rotation.x += car.speed * dt / 0.37;

  player.position.set(car.group.position.x, 0, car.group.position.z);
  player.rotation.y = car.heading;
  player.visible = false;
  playerShadow.visible = false;
  playerState.inCar = car;

  audio.setEngine(true, car.speed);
  if (car.health <= 0) explodeCar(car);

  // Running people over is very much a crime.
  if (Math.abs(car.speed) > 5) {
    for (const ped of world.peds) {
      if (ped.dead) continue;
      if (ped.group.position.distanceToSquared(car.group.position) < 4.6) {
        killPed(ped, 'VEHICULAR MANSLAUGHTER');
      }
    }
    for (const cop of cops) {
      if (cop.dead) continue;
      if (cop.group.position.distanceToSquared(car.group.position) < 4.6) damageCop(cop, 80, true);
    }
  }
}

function findNearbyCar(maxDist = 4.8) {
  let best = null;
  let bestD = maxDist;
  for (const car of world.parkedCars) {
    if (car.destroyed) continue;
    const d = Math.hypot(car.group.position.x - player.position.x, car.group.position.z - player.position.z);
    if (d < bestD) { bestD = d; best = car; }
  }
  return best;
}

function enterCar(car) {
  if (!car || car.destroyed || game.inCar) return;
  game.inCar = car;
  car.speed = 0;
  player.visible = false;
  playerShadow.visible = false;
  game.camYaw = car.heading;
  game.lookCooldown = 1.4;
  audio.init(); audio.resume(); audio.ui();
  updateControlsUI();
  toast(car.mission ? 'SUNSET COUPE — TAKE IT EASY' : 'HOTWIRED', 'money');
  if (game.mission) {
    const step = game.mission.def.steps[game.mission.index];
    if (step && step.type === 'enterCar' && step.car === car) advanceMission();
  }
}

function exitCar() {
  const car = game.inCar;
  if (!car) return;
  if (Math.abs(car.speed) > 7) { toast('SLOW DOWN TO EXIT', 'bad'); return; }
  const leftX = Math.cos(car.heading);
  const leftZ = -Math.sin(car.heading);
  const candidates = [
    [car.group.position.x + leftX * 2.2, car.group.position.z + leftZ * 2.2],
    [car.group.position.x - leftX * 2.2, car.group.position.z - leftZ * 2.2],
    [car.group.position.x - Math.sin(car.heading) * 3.4, car.group.position.z - Math.cos(car.heading) * 3.4]
  ];
  let spot = candidates[0];
  for (const c of candidates) {
    if (!world.isBlocked(c[0], c[1], 0.45)) { spot = c; break; }
  }
  player.position.set(spot[0], 0, spot[1]);
  player.visible = true;
  playerShadow.visible = true;
  playerState.heading = car.heading;
  player.rotation.y = car.heading;
  car.speed = 0;
  game.inCar = null;
  audio.setEngine(false);
  updateControlsUI();
  audio.ui();
}

function updateControlsUI() {
  const inCar = !!game.inCar;
  jumpBtn.classList.toggle('hidden', inCar);
  brakeBtn.classList.toggle('hidden', !inCar);
  fireLabel.textContent = inCar ? 'DRIVE-BY' : 'FIRE';
  speedo.classList.toggle('hidden', !inCar);
  crosshair.classList.toggle('hidden', inCar || game.mode !== 'playing');
}

// ---------------------------------------------------------------------------
// Combat / effects
// ---------------------------------------------------------------------------
function spawnGlow(pos, color = 0xffd59a, size = 1.4, life = 0.12, additive = true) {
  const mat = new THREE.SpriteMaterial({
    map: glowTexture, color, transparent: true, opacity: 1,
    blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
    depthWrite: false, toneMapped: false
  });
  const sprite = new THREE.Sprite(mat);
  sprite.position.copy(pos);
  sprite.scale.set(size, size, 1);
  scene.add(sprite);
  flashes.push({ sprite, life, maxLife: life, grow: 1.8 });
  return sprite;
}

function spawnTracer(a, b, color = 0xffdfa0, life = 0.07) {
  const geo = new THREE.BufferGeometry().setFromPoints([a, b]);
  const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false });
  const line = new THREE.Line(geo, mat);
  scene.add(line);
  tracers.push({ line, life, maxLife: life });
}

function updateEffects(dt) {
  for (let i = tracers.length - 1; i >= 0; i--) {
    const t = tracers[i];
    t.life -= dt;
    t.line.material.opacity = clamp(t.life / t.maxLife, 0, 1) * 0.9;
    if (t.life <= 0) {
      scene.remove(t.line);
      t.line.geometry.dispose();
      t.line.material.dispose();
      tracers.splice(i, 1);
    }
  }
  for (let i = flashes.length - 1; i >= 0; i--) {
    const f = flashes[i];
    f.life -= dt;
    const k = 1 - f.life / f.maxLife;
    f.sprite.material.opacity = clamp(1 - k, 0, 1);
    const s = f.sprite.scale.x + dt * 7 * f.grow;
    f.sprite.scale.set(s, s, 1);
    if (f.life <= 0) {
      scene.remove(f.sprite);
      f.sprite.material.dispose();
      flashes.splice(i, 1);
    }
  }
}

function lineOfSight(a, b) {
  const steps = 10;
  for (let i = 1; i < steps; i++) {
    const t = i / steps;
    const x = lerp(a.x, b.x, t);
    const z = lerp(a.z, b.z, t);
    if (world.isBlocked(x, z, 0.15)) return false;
  }
  return true;
}

function getAimForward() {
  if (game.inCar) {
    return new THREE.Vector3(Math.sin(game.inCar.heading), 0, Math.cos(game.inCar.heading));
  }
  const dir = new THREE.Vector3();
  camera.getWorldDirection(dir);
  dir.y = 0;
  if (dir.lengthSq() < 0.01) dir.set(Math.sin(game.camYaw), 0, Math.cos(game.camYaw));
  return dir.normalize();
}

function allTargets() {
  const list = [];
  for (const ped of world.peds) if (!ped.dead) list.push({ obj: ped, kind: 'ped', pos: ped.group.position, y: 1.15 });
  for (const cop of cops) if (!cop.dead) list.push({ obj: cop, kind: 'cop', pos: cop.group.position, y: 1.3 });
  for (const gang of gangTargets) if (!gang.dead) list.push({ obj: gang, kind: 'gang', pos: gang.group.position, y: 1.25 });
  return list;
}

function findAimTarget(origin, forward, maxDist = 36) {
  let best = null;
  let bestScore = -Infinity;
  for (const t of allTargets()) {
    const dx = t.pos.x - origin.x;
    const dz = t.pos.z - origin.z;
    const dist = Math.hypot(dx, dz);
    if (dist > maxDist || dist < 0.5) continue;
    const dot = (dx / dist) * forward.x + (dz / dist) * forward.z;
    if (dot < 0.52) continue;
    const score = dot * 2 - dist / maxDist * 0.7;
    if (score > bestScore) { bestScore = score; best = t; }
  }
  return best;
}

function tryShoot() {
  if (game.mode !== 'playing') return;
  const now = performance.now();
  if (now < playerState.fireCooldown) return;
  playerState.fireCooldown = now + (game.inCar ? 220 : 185);
  playerState.aimingUntil = now + 550;
  audio.init(); audio.resume();
  audio.shot();
  game.shake = Math.max(game.shake, 0.035);

  let muzzle = new THREE.Vector3();
  if (game.inCar) {
    const car = game.inCar;
    muzzle.set(car.group.position.x + Math.sin(car.heading) * 1.9, 0.95, car.group.position.z + Math.cos(car.heading) * 1.9);
  } else {
    player.updateMatrixWorld();
    player.userData.gun.getWorldPosition(muzzle);
    muzzle.y = Math.max(muzzle.y, 1.2);
  }

  const forward = getAimForward();
  const target = findAimTarget(muzzle, forward, game.inCar ? 30 : 36);
  let end;
  if (target) {
    end = new THREE.Vector3(target.pos.x, target.y, target.pos.z);
    if (target.kind === 'cop') damageCop(target.obj, 45);
    else if (target.kind === 'gang') damageGang(target.obj, 50);
    else damagePed(target.obj, 50);
    spawnGlow(end, 0xff5f4a, 0.65, 0.1);
  } else {
    end = muzzle.clone().addScaledVector(forward, 44);
    end.y = muzzle.y - 0.2;
    let blockedAt = null;
    for (let i = 2; i < 48; i += 1.2) {
      const x = muzzle.x + forward.x * i;
      const z = muzzle.z + forward.z * i;
      if (world.isBlocked(x, z, 0.12)) { blockedAt = i; break; }
    }
    if (blockedAt) {
      end.set(muzzle.x + forward.x * blockedAt, muzzle.y - 0.25, muzzle.z + forward.z * blockedAt);
      spawnGlow(end, 0xffd28a, 0.55, 0.09);
    }
  }
  spawnTracer(muzzle, end);
  spawnGlow(muzzle, 0xffdf9d, 0.85, 0.055);
  crosshair.style.transform = 'translate(-50%, -50%) scale(1.28)';
  setTimeout(() => { crosshair.style.transform = 'translate(-50%, -50%) scale(1)'; }, 70);
}

function damagePed(ped, amount) {
  if (ped.dead) return;
  ped.health = (ped.health ?? 100) - amount;
  ped.panic = 7;
  for (const other of world.peds) if (!other.dead && other !== ped) other.panic = Math.max(other.panic, 6);
  if (ped.health <= 0) killPed(ped, 'MURDER');
  else addWanted(1, 'ASSAULT');
}

function killPed(ped, reason = 'MURDER') {
  if (ped.dead) return;
  ped.dead = true;
  ped.deadTimer = 0;
  ped.group.rotation.z = Math.PI / 2;
  ped.group.position.y = 0.2;
  ped.group.rotation.y = rand(0, Math.PI * 2);
  addWanted(2, reason);
  toast(reason, 'bad');
  for (const other of world.peds) if (!other.dead && other !== ped) other.panic = Math.max(other.panic, 8);
  spawnGlow(new THREE.Vector3(ped.group.position.x, 0.8, ped.group.position.z), 0xff3d4f, 1.2, 0.2);
}

function spawnCop(pos) {
  const group = makeSimplePerson({ cop: true, shirt: 0x2d4b78, pants: 0x141c2c, skin: 0xc78e68, hat: 0x1a2a4a });
  group.position.copy(pos);
  group.rotation.y = rand(0, Math.PI * 2);
  scene.add(group);
  const cop = { kind: 'cop', group, health: 100, shootTimer: rand(0.7, 1.8), dead: false, deadTimer: 0, heading: group.rotation.y, movePhase: rand(0, 10) };
  cops.push(cop);
  return cop;
}

function damageCop(cop, amount, byCar = false) {
  if (cop.dead) return;
  cop.health -= amount;
  if (cop.health <= 0) {
    cop.dead = true;
    cop.deadTimer = 0;
    cop.group.rotation.z = Math.PI / 2;
    cop.group.position.y = 0.2;
    spawnGlow(new THREE.Vector3(cop.group.position.x, 0.8, cop.group.position.z), 0x3b8cff, 1.3, 0.2);
    addWanted(1, byCar ? 'COP HIT AND RUN' : 'COP KILLED');
    audio.hit();
    game.shake = Math.max(game.shake, 0.1);
  } else {
    addWanted(1, 'ASSAULTING AN OFFICER');
  }
}

function damagePlayer(amount, flash = true) {
  if (game.mode !== 'playing') return;
  const absorbed = Math.min(game.armor, amount * 0.65);
  game.armor -= absorbed;
  game.health -= (amount - absorbed);
  game.lastDamage = nowSec();
  game.shake = Math.max(game.shake, clamp(amount * 0.008, 0.02, 0.16));
  if (flash) flashDamage();
  updateHealth();
  if (game.health <= 0) playerDied();
}

function playerDied() {
  if (game.mode !== 'playing') return;
  game.health = 0;
  updateHealth();
  game.mode = 'dead';
  game.pendingDeath = true;
  game.pendingMissionFail = false;
  if (game.mission) { game.mission.failed = true; game.mission = null; }
  if (game.inCar) { game.inCar.speed = 0; }
  audio.setEngine(false);
  audio.setSiren(false);
  audio.fail();
  showResult({
    badge: 'WASTED', title: 'THE CITY WON', sub: `You lost ${fmtMoney(250)} and woke up in a clinic. The streets do not forgive.`,
    payout: 0, payoutLabel: 'MEDICAL BILL', balance: Math.max(0, game.cash - 250), time: game.elapsed, heat: '0 STARS',
    fail: true, continueText: 'WAKE UP'
  });
  game.cash = Math.max(0, game.cash - 250);
  updateCash();
}

function updateCops(dt) {
  const desired = game.wanted > 0 ? Math.min(1 + game.wanted, 5) : 0;
  let alive = 0;
  for (const cop of cops) if (!cop.dead) alive++;
  if (alive < desired && game.mode === 'playing' && game.wanted > 0) {
    game.copSpawnTimer = (game.copSpawnTimer || 0) - dt;
    if (game.copSpawnTimer <= 0) {
      game.copSpawnTimer = 1.1;
      spawnCop(world.randomSpawnNear(player.position, 26, 52));
    }
  }

  const pp = player.position;
  for (let i = cops.length - 1; i >= 0; i--) {
    const cop = cops[i];
    if (cop.dead) {
      cop.deadTimer += dt;
      if (cop.deadTimer > 14) {
        scene.remove(cop.group);
        cops.splice(i, 1);
      }
      continue;
    }
    const dx = pp.x - cop.group.position.x;
    const dz = pp.z - cop.group.position.z;
    const dist = Math.hypot(dx, dz);
    if (dist > 105) {
      scene.remove(cop.group);
      cops.splice(i, 1);
      continue;
    }
    cop.shootTimer -= dt;
    const canSee = dist < 18 && lineOfSight(cop.group.position, pp);
    if (canSee && cop.shootTimer <= 0) {
      cop.shootTimer = rand(1.1, 2.1);
      const from = new THREE.Vector3(cop.group.position.x, 1.4, cop.group.position.z);
      const to = new THREE.Vector3(pp.x, 1.2 + pp.y, pp.z);
      spawnTracer(from, to, 0xff6d5e, 0.08);
      spawnGlow(from, 0xffdf9d, 0.6, 0.06);
      audio.noiseBurst(0.1, 0.12, 780, 0.6);
      damagePlayer(rand(5, 9));
    }
    if (dist > 2.2) {
      const dirX = dx / (dist || 1);
      const dirZ = dz / (dist || 1);
      const speed = 4.6 + Math.min(2, game.wanted * 0.3);
      const nx = cop.group.position.x + dirX * speed * dt;
      const nz = cop.group.position.z + dirZ * speed * dt;
      if (!world.isBlocked(nx, nz, 0.38)) {
        cop.group.position.x = nx; cop.group.position.z = nz;
      } else if (!world.isBlocked(nx, cop.group.position.z, 0.38)) {
        cop.group.position.x = nx;
      } else if (!world.isBlocked(cop.group.position.x, nz, 0.38)) {
        cop.group.position.z = nz;
      }
      cop.heading = Math.atan2(dirX, dirZ);
      cop.group.rotation.y = cop.heading;
      cop.movePhase += dt * 10;
      cop.group.position.y = Math.abs(Math.sin(cop.movePhase)) * 0.06;
    }
  }

  if (game.wanted >= 3) {
    if (!helicopter) {
      helicopter = makeHelicopter();
      helicopter.position.set(pp.x + 35, 25, pp.z - 30);
      scene.add(helicopter);
    }
    const t = nowSec();
    const target = new THREE.Vector3(pp.x + Math.cos(t * 0.24) * 26, 23, pp.z + Math.sin(t * 0.24) * 26);
    helicopter.position.lerp(target, 1 - Math.exp(-0.55 * dt));
    helicopter.lookAt(pp.x, 20, pp.z);
    helicopter.userData.rotor.rotation.y += dt * 22;
    helicopter.userData.tailRotor.rotation.x += dt * 28;
    helicopter.userData.beam.material.opacity = 0.07 + Math.sin(t * 6) * 0.025;
    game.heliTimer = (game.heliTimer || 0) - dt;
    if (game.heliTimer <= 0) {
      game.heliTimer = rand(1.7, 2.8);
      const from = helicopter.position.clone();
      const to = new THREE.Vector3(pp.x, 1.2, pp.z);
      spawnTracer(from, to, 0x9ec9ff, 0.08);
      spawnGlow(from, 0xcfe6ff, 1, 0.06);
      audio.noiseBurst(0.08, 0.1, 620, 0.8);
      damagePlayer(rand(3, 6));
    }
  } else if (helicopter) {
    scene.remove(helicopter);
    helicopter = null;
  }

  if (game.wanted > 0) {
    const now = nowSec();
    const near = cops.some((c) => !c.dead && c.group.position.distanceTo(pp) < 48) || !!helicopter;
    if (now - game.lastCrime > 8 && !near) {
      game.heatTimer += dt;
      if (game.heatTimer > 9) {
        game.heatTimer = 0;
        game.wanted = Math.max(0, game.wanted - 1);
        updateWanted();
        if (game.wanted > 0) toast('HEAT COOLING…', 'money');
        else { toast('YOU LOST THE COPS', 'money'); clearPolice(); }
      }
    } else {
      game.heatTimer = 0;
    }
  }
}

function clearPolice() {
  for (const cop of cops) scene.remove(cop.group);
  cops.length = 0;
  if (helicopter) { scene.remove(helicopter); helicopter = null; }
  audio.setSiren(false);
}

function addWanted(n, reason = '') {
  if (game.mode !== 'playing' || n <= 0) return;
  const before = game.wanted;
  game.wanted = clamp(game.wanted + n, 0, 5);
  game.lastCrime = nowSec();
  game.heatTimer = 0;
  updateWanted();
  if (game.wanted > before && reason) toast(`WANTED: ${reason}`, 'bad');
}

function damageGang(gang, amount) {
  if (gang.dead) return;
  gang.health -= amount;
  addWanted(1, 'GANG SHOOTOUT');
  if (gang.health <= 0) {
    gang.dead = true;
    gang.group.rotation.z = Math.PI / 2;
    gang.group.position.y = 0.2;
    if (gang.beacon) gang.beacon.visible = false;
    spawnGlow(new THREE.Vector3(gang.group.position.x, 0.8, gang.group.position.z), 0xffc85a, 1.2, 0.2);
    audio.hit();
    if (game.mission) {
      const step = game.mission.def.steps[game.mission.index];
      if (step && step.type === 'killTargets') {
        const left = gangTargets.filter((g) => !g.dead).length;
        if (left === 0) advanceMission();
        else toast(`CREW MEMBER DOWN — ${left} LEFT`, 'money');
      }
    }
  }
}

function updateGangs(dt) {
  const pp = player.position;
  for (const gang of gangTargets) {
    if (gang.dead) continue;
    const dx = pp.x - gang.group.position.x;
    const dz = pp.z - gang.group.position.z;
    const dist = Math.hypot(dx, dz);
    gang.shootTimer -= dt;
    if (dist < 24 && lineOfSight(gang.group.position, pp)) {
      gang.group.rotation.y = Math.atan2(dx, dz);
      if (gang.shootTimer <= 0) {
        gang.shootTimer = rand(1.2, 2.3);
        const from = new THREE.Vector3(gang.group.position.x, 1.4, gang.group.position.z);
        const to = new THREE.Vector3(pp.x, 1.2 + pp.y, pp.z);
        spawnTracer(from, to, 0xff9a55, 0.07);
        spawnGlow(from, 0xffdf9d, 0.55, 0.055);
        audio.noiseBurst(0.08, 0.1, 720, 0.7);
        damagePlayer(rand(4, 8));
      }
    }
    if (gang.beacon) {
      gang.beacon.rotation.y += dt * 2.2;
      gang.beacon.position.y = 2.55 + Math.sin(nowSec() * 3 + gang.phase) * 0.14;
    }
  }
}

// ---------------------------------------------------------------------------
// Vehicle destruction
// ---------------------------------------------------------------------------
function explodeCar(car) {
  if (car.destroyed) return;
  car.destroyed = true;
  car.health = 0;
  car.group.visible = false;
  const pos = car.group.position.clone();
  const wasDriven = game.inCar === car;
  if (wasDriven) {
    game.inCar = null;
    player.visible = true;
    playerShadow.visible = true;
    player.position.set(pos.x + 2.2, 0, pos.z);
    playerState.heading = car.heading;
    player.rotation.y = car.heading;
    audio.setEngine(false);
    damagePlayer(32);
    updateControlsUI();
  }
  for (let i = 0; i < 4; i++) {
    spawnGlow(new THREE.Vector3(pos.x + rand(-1.5, 1.5), rand(0.3, 1.8), pos.z + rand(-1.5, 1.5)), i === 0 ? 0xfff0b0 : 0xff6a2a, rand(1.8, 3.4), rand(0.4, 0.8));
  }
  for (let i = 0; i < 7; i++) {
    spawnGlow(new THREE.Vector3(pos.x + rand(-2.5, 2.5), rand(1.5, 3.8), pos.z + rand(-2.5, 2.5)), 0x4d3a44, rand(1.5, 2.7), rand(0.7, 1.4), false);
  }
  game.shake = Math.max(game.shake, 0.4);
  audio.noiseBurst(0.55, 0.4, 250, 0.5);
  audio.tone(55, 0.5, 'sawtooth', 0.18, -25);
  toast('VEHICLE DESTROYED', 'bad');
  if (car.mission && game.mission) failMission('THE COUPE WAS DESTROYED');
}

// ---------------------------------------------------------------------------
// Missions
// ---------------------------------------------------------------------------
const contractPoints = [
  new THREE.Vector3(-120, 0, 80),
  new THREE.Vector3(80, 0, 80),
  new THREE.Vector3(-80, 0, 40),
  new THREE.Vector3(40, 0, -120),
  new THREE.Vector3(120, 0, 40),
  new THREE.Vector3(-40, 0, -80)
];

function resetMissionCar(pos, heading = 0) {
  const car = world.missionCar;
  car.group.position.copy(pos);
  car.group.position.y = 0;
  car.group.rotation.y = heading;
  car.heading = heading;
  car.speed = 0;
  car.health = 100;
  car.destroyed = false;
  car.group.visible = true;
  car.driver = null;
  if (game.inCar === car) {
    game.inCar = null;
    player.visible = true;
    playerShadow.visible = true;
  }
}

function spawnGangTargets(center) {
  clearGangTargets();
  const count = 3;
  for (let i = 0; i < count; i++) {
    let x = center.x + rand(-7, 7);
    let z = center.z + rand(-7, 7);
    for (let tries = 0; tries < 12 && world.isBlocked(x, z, 0.5); tries++) {
      x = center.x + rand(-9, 9);
      z = center.z + rand(-9, 9);
    }
    const group = makeSimplePerson({ gang: true, shirt: 0x3a2b42, pants: 0x17151d, skin: 0x9a6848, hat: 0x17131c });
    group.position.set(x, 0, z);
    group.rotation.y = rand(0, Math.PI * 2);
    scene.add(group);
    const beacon = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.34, 0),
      new THREE.MeshBasicMaterial({ color: 0xff3d5a, toneMapped: false })
    );
    beacon.position.y = 2.55;
    group.add(beacon);
    const gang = {
      kind: 'gang', group, health: 100, dead: false, shootTimer: rand(1, 2.2),
      beacon, phase: rand(0, Math.PI * 2)
    };
    gangTargets.push(gang);
  }
}

function clearGangTargets() {
  for (const gang of gangTargets) {
    scene.remove(gang.group);
  }
  gangTargets.length = 0;
}

function buildMission(kind) {
  if (kind === 'first') {
    resetMissionCar(new THREE.Vector3(-5.1, 0, 35), 0);
    return {
      id: 'first', kicker: 'STORY JOB', title: 'THE FIRST SCORE', payout: 2500, timeLimit: 0,
      steps: [
        { type: 'enterCar', car: world.missionCar, text: 'Steal the orange coupe', objective: 'Steal the orange coupe' },
        {
          type: 'reach', point: new THREE.Vector3(-120, 0, 80), radius: 7, requireCar: true,
          text: 'Drive to the docks', objective: 'Drive to the docks',
          onStart: () => toast('PICK UP THE CASE AT THE DOCKS', 'money')
        },
        {
          type: 'reach', point: LOCKUP, radius: 7, requireCar: true,
          text: 'Escape to the lockup', objective: 'Escape to the lockup',
          onStart: () => {
            addWanted(2, 'ARMED ROBBERY');
            game.armor = Math.max(game.armor, 45);
            updateHealth();
            toast('CASE SECURED — LOSE THE COPS', 'money');
            audio.cash();
          }
        }
      ]
    };
  }
  if (kind === 'courier') {
    const point = contractPoints[Math.floor(Math.random() * contractPoints.length)];
    resetMissionCar(point, rand(0, 4) * Math.PI / 2);
    return {
      id: 'courier', kicker: 'CONTRACT', title: 'HOT DELIVERY', payout: 1700, timeLimit: 165,
      steps: [
        {
          type: 'enterCar', car: world.missionCar, text: 'Steal the marked coupe', objective: 'Steal the marked coupe',
          onStart: () => toast('THE CLOCK IS RUNNING', 'money')
        },
        {
          type: 'reach', point: LOCKUP, radius: 7, requireCar: true, text: 'Deliver it to the lockup', objective: 'Deliver it to the lockup',
          onStart: () => { addWanted(1, 'STOLEN VEHICLE'); toast('DON’T SCRATCH THE PAINT', 'money'); }
        }
      ]
    };
  }
  if (kind === 'shakedown') {
    const center = contractPoints[Math.floor(Math.random() * contractPoints.length)].clone().add(new THREE.Vector3(rand(-10, 10), 0, rand(-10, 10)));
    spawnGangTargets(center);
    return {
      id: 'shakedown', kicker: 'CONTRACT', title: 'SHAKEDOWN', payout: 2200, timeLimit: 0,
      steps: [
        {
          type: 'killTargets', text: 'Eliminate the crew', objective: 'Eliminate the crew',
          onStart: () => toast('THREE CREW MEMBERS MARKED', 'bad')
        }
      ]
    };
  }
  const pickup = contractPoints[Math.floor(Math.random() * contractPoints.length)].clone();
  return {
    id: 'getaway', kicker: 'CONTRACT', title: 'DEAD DROP', payout: 2000, timeLimit: 150,
    steps: [
      {
        type: 'reach', point: pickup, radius: 6, requireCar: false, text: 'Grab the briefcase', objective: 'Grab the briefcase',
        onStart: () => toast('THE BRIEFCASE IS WAITING', 'money')
      },
      {
        type: 'reach', point: LOCKUP, radius: 7, requireCar: false, text: 'Get the case to the lockup', objective: 'Get the case to the lockup',
        onStart: () => {
          addWanted(2, 'STOLEN GOODS');
          game.armor = Math.max(game.armor, 35);
          updateHealth();
          toast('CASE SECURED — MOVE!', 'money');
          audio.cash();
        }
      }
    ]
  };
}

function beginMission(def) {
  game.mission = { def, index: 0, start: performance.now(), elapsed: 0, failed: false, lastStep: -1 };
  game.freeRoam = false;
  lockupMarker.visible = false;
  objectiveMarker.visible = true;
  missionKicker.textContent = def.kicker;
  missionTitle.textContent = def.title;
  missionTimer.classList.toggle('hidden', !def.timeLimit);
  setMissionStep(0);
  updateMissionUI();
  audio.ui();
}

function setMissionStep(i) {
  const m = game.mission;
  if (!m) return;
  m.index = i;
  const step = m.def.steps[i];
  if (step?.onStart) step.onStart();
  if (step?.text) toast(step.text.toUpperCase(), '');
}

function advanceMission() {
  const m = game.mission;
  if (!m) return;
  const next = m.index + 1;
  if (next >= m.def.steps.length) completeMission();
  else {
    setMissionStep(next);
    audio.tone(760, 0.12, 'triangle', 0.08);
    setTimeout(() => audio.tone(1040, 0.18, 'triangle', 0.08), 90);
  }
}

function missionTarget() {
  const m = game.mission;
  if (!m) return LOCKUP;
  const step = m.def.steps[m.index];
  if (!step) return LOCKUP;
  if (step.type === 'enterCar') return step.car.group.position;
  if (step.type === 'reach') {
    if (step.requireCar && !game.inCar) return world.missionCar.group.position;
    return step.point;
  }
  if (step.type === 'killTargets') {
    let best = null, bestD = Infinity;
    for (const gang of gangTargets) {
      if (gang.dead) continue;
      const d = gang.group.position.distanceTo(player.position);
      if (d < bestD) { bestD = d; best = gang; }
    }
    return best ? best.group.position : LOCKUP;
  }
  return LOCKUP;
}

function missionObjectiveText() {
  const m = game.mission;
  if (!m) return 'Return to the lockup for a new job';
  const step = m.def.steps[m.index];
  if (!step) return '';
  if (step.type === 'reach' && step.requireCar && !game.inCar) return 'Return to the coupe';
  if (step.type === 'killTargets') {
    const left = gangTargets.filter((g) => !g.dead).length;
    return `${step.objective} (${3 - left}/3)`;
  }
  return step.objective || step.text;
}

function updateMission(dt) {
  const m = game.mission;
  if (!m) {
    lockupMarker.visible = true;
    objectiveMarker.visible = false;
    missionKicker.textContent = 'FREE ROAM';
    missionTitle.textContent = 'SUNSET CITY';
    missionObjective.textContent = 'Return to the lockup for a new job';
    missionDistance.textContent = `${Math.round(player.position.distanceTo(LOCKUP))}m`;
    missionTimer.classList.add('hidden');
    return;
  }
  m.elapsed += dt;
  if (m.def.timeLimit && m.elapsed > m.def.timeLimit) {
    failMission('THE CLOCK RAN OUT');
    return;
  }
  const step = m.def.steps[m.index];
  if (!step) return;

  if (step.type === 'enterCar') {
    if (game.inCar === step.car) advanceMission();
  } else if (step.type === 'reach') {
    const target = step.requireCar && !game.inCar ? world.missionCar.group.position : step.point;
    const dist = Math.hypot(player.position.x - target.x, player.position.z - target.z);
    if (dist < step.radius && (!step.requireCar || game.inCar)) advanceMission();
  } else if (step.type === 'killTargets') {
    if (gangTargets.length && gangTargets.every((g) => g.dead)) advanceMission();
  }

  if (!game.mission) return;
  const target = missionTarget();
  objectiveMarker.position.set(target.x, 0, target.z);
  objectiveMarker.visible = true;
  const dist = Math.hypot(player.position.x - target.x, player.position.z - target.z);
  missionObjective.textContent = missionObjectiveText();
  missionDistance.textContent = `${Math.round(dist)}m`;
  missionTimer.classList.toggle('hidden', !m.def.timeLimit);
  if (m.def.timeLimit) missionTimer.querySelector('span').textContent = fmtTime(m.def.timeLimit - m.elapsed);
}

function completeMission() {
  const m = game.mission;
  if (!m) return;
  const payout = m.def.payout;
  game.cash += payout;
  updateCash();
  game.mission = null;
  game.freeRoam = true;
  objectiveMarker.visible = false;
  lockupMarker.visible = true;
  game.wanted = 0;
  updateWanted();
  clearPolice();
  game.missionIndex++;
  audio.complete();
  audio.setSiren(false);
  showResult({
    badge: 'JOB COMPLETE', title: m.def.title,
    sub: m.def.id === 'first' ? 'The case is delivered. The city knows your name.' : 'The contract is settled. Your reputation grows.',
    payout, payoutLabel: 'PAYOUT', balance: game.cash, time: m.elapsed, heat: 'CLEAR',
    fail: false, continueText: 'KEEP EXPLORING'
  });
}

function failMission(reason) {
  if (!game.mission) return;
  const title = game.mission.def.title;
  game.mission = null;
  game.freeRoam = true;
  objectiveMarker.visible = false;
  lockupMarker.visible = true;
  clearGangTargets();
  game.wanted = 0;
  updateWanted();
  clearPolice();
  audio.fail();
  showResult({
    badge: 'JOB FAILED', title, sub: reason, payout: 0, payoutLabel: 'PAYOUT',
    balance: game.cash, time: 0, heat: 'CLEAR', fail: true, continueText: 'BACK TO THE STREETS'
  });
}

function startContract() {
  if (game.mission || game.mode !== 'playing') return;
  if (player.position.distanceTo(LOCKUP) > 6) return;
  game.health = 100;
  game.armor = 60;
  updateHealth();
  const types = ['courier', 'shakedown', 'getaway'];
  const kind = types[game.missionIndex % types.length];
  clearGangTargets();
  beginMission(buildMission(kind));
  audio.cash();
}

// ---------------------------------------------------------------------------
// Context interaction
// ---------------------------------------------------------------------------
function updateContext() {
  let ctx = null;
  if (game.mode !== 'playing') {
    contextPrompt.classList.add('hidden');
    contextBtn.classList.add('hidden');
    game.context = null;
    return;
  }
  if (game.inCar) {
    ctx = { type: 'exit', label: 'EXIT VEHICLE' };
  } else if (game.mission) {
    const step = game.mission.def.steps[game.mission.index];
    if (step?.type === 'enterCar') {
      const d = Math.hypot(step.car.group.position.x - player.position.x, step.car.group.position.z - player.position.z);
      if (d < 5.2) ctx = { type: 'enterMission', label: 'ENTER THE COUPE', car: step.car };
    }
    if (!ctx) {
      const car = findNearbyCar();
      if (car) ctx = { type: 'enter', label: 'ENTER VEHICLE', car };
    }
  } else {
    const car = findNearbyCar();
    if (car) ctx = { type: 'enter', label: 'ENTER VEHICLE', car };
    else if (player.position.distanceTo(LOCKUP) < 6.5) ctx = { type: 'contract', label: 'START CONTRACT' };
  }
  game.context = ctx;
  if (!ctx) {
    contextPrompt.classList.add('hidden');
    contextBtn.classList.add('hidden');
    return;
  }
  contextPrompt.classList.remove('hidden');
  contextBtn.classList.remove('hidden');
  contextText.textContent = ctx.label;
  contextBtn.querySelector('span').textContent = ctx.type === 'exit' ? 'EXIT' : ctx.type === 'contract' ? 'START' : 'ENTER';
  contextKey.textContent = isDesktop ? 'E' : '●';
}

function doContext() {
  if (game.mode !== 'playing') return;
  const ctx = game.context;
  if (!ctx) return;
  audio.init(); audio.resume();
  if (ctx.type === 'exit') exitCar();
  else if (ctx.type === 'enter' || ctx.type === 'enterMission') enterCar(ctx.car);
  else if (ctx.type === 'contract') startContract();
}

// ---------------------------------------------------------------------------
// UI / markers / minimap
// ---------------------------------------------------------------------------
const resultScreen = $('result-screen');
const resultModal = resultScreen.querySelector('.result-modal');
const resultBadge = $('result-badge');
const resultTitle = $('result-title');
const resultSub = $('result-sub');
const resultCash = $('result-cash');
const resultBalance = $('result-balance');
const resultTime = $('result-time');
const resultHeat = $('result-heat');
const continueBtn = $('continue-btn');
const pauseScreen = $('pause-screen');

function updateMissionUI() {
  if (!game.mission) return;
  missionKicker.textContent = game.mission.def.kicker;
  missionTitle.textContent = game.mission.def.title;
  missionTimer.classList.toggle('hidden', !game.mission.def.timeLimit);
}

function showResult(data) {
  game.mode = 'result';
  game.resultData = data;
  resultBadge.textContent = data.badge;
  resultTitle.textContent = data.title;
  resultSub.textContent = data.sub;
  resultCash.textContent = data.payout ? `+${fmtMoney(data.payout)}` : '$0';
  resultBalance.textContent = fmtMoney(data.balance);
  resultTime.textContent = fmtTime(data.time || 0);
  resultHeat.textContent = data.heat || 'CLEAR';
  resultModal.classList.toggle('fail', !!data.fail);
  resultBadge.style.color = data.fail ? '#ff5c6e' : '';
  resultCash.style.color = data.payout ? '' : 'rgba(255,244,223,0.55)';
  continueBtn.querySelector('span:last-child').textContent = data.continueText || 'CONTINUE';
  resultScreen.classList.remove('hidden');
  document.body.classList.add('result-open');
  hud.style.pointerEvents = 'none';
  audio.setEngine(false);
  audio.setSiren(false);
}

function snapCameraBehindPlayer() {
  const target = new THREE.Vector3(player.position.x, 1.45, player.position.z);
  const cp = Math.cos(game.camPitch), sp = Math.sin(game.camPitch);
  const dist = game.camDist;
  game.camPos.set(
    target.x - Math.sin(game.camYaw) * cp * dist,
    target.y + sp * dist + 0.45,
    target.z - Math.cos(game.camYaw) * cp * dist
  );
  game.camLook.set(target.x + Math.sin(game.camYaw) * 2.1, target.y, target.z + Math.cos(game.camYaw) * 2.1);
  camera.position.copy(game.camPos);
  camera.lookAt(game.camLook);
}

function continueAfterResult() {
  resultScreen.classList.add('hidden');
  document.body.classList.remove('result-open');
  const wasDeath = game.pendingDeath;
  if (wasDeath) {
    game.pendingDeath = false;
    game.health = 100;
    game.armor = 0;
    game.wanted = 0;
    clearPolice();
    clearGangTargets();
    game.inCar = null;
    game.freeRoam = true;
    game.mission = null;
    objectiveMarker.visible = false;
    lockupMarker.visible = true;
    player.visible = true;
    playerShadow.visible = true;
    player.position.set(HOSPITAL.x, 0, HOSPITAL.z);
    playerState.heading = 0;
    player.rotation.y = 0;
    game.camYaw = 0;
    game.camPitch = 0.28;
    snapCameraBehindPlayer();
    updateHealth();
    updateWanted();
    updateControlsUI();
  }
  game.mode = 'playing';
  hud.style.pointerEvents = '';
  audio.init(); audio.resume();
  audio.setSiren(game.wanted > 0);
  if (game.inCar) audio.setEngine(true, game.inCar.speed);
  updateControlsUI();
  game.lastDamage = nowSec() - 20;
}

function pauseGame() {
  if (game.mode !== 'playing') return;
  game.mode = 'paused';
  $('pause-cash').textContent = fmtMoney(game.cash);
  $('pause-job').textContent = game.mission ? game.mission.def.title : 'FREE ROAM';
  $('pause-wanted').textContent = game.wanted ? `${game.wanted} STARS` : 'CLEAN';
  pauseScreen.classList.remove('hidden');
  audio.setEngine(false);
  audio.setSiren(false);
}

function resumeGame() {
  if (game.mode !== 'paused') return;
  pauseScreen.classList.add('hidden');
  game.mode = 'playing';
  audio.init(); audio.resume();
  if (game.inCar) audio.setEngine(true, game.inCar.speed);
  audio.setSiren(game.wanted > 0);
}

function restartGame() {
  pauseScreen.classList.add('hidden');
  resultScreen.classList.add('hidden');
  document.body.classList.remove('result-open');
  startScreen.classList.add('hidden');
  game.mode = 'playing';
  game.started = true;
  game.cash = 0;
  game.health = 100;
  game.armor = 0;
  game.wanted = 0;
  game.mission = null;
  game.freeRoam = true;
  game.missionIndex = 0;
  game.elapsed = 0;
  game.pendingDeath = false;
  game.inCar = null;
  clearPolice();
  clearGangTargets();
  for (const car of world.parkedCars) {
    car.destroyed = false;
    car.group.visible = true;
    car.health = 100;
    car.speed = 0;
  }
  for (const ped of world.peds) {
    if (ped.dead) {
      ped.dead = false;
      ped.group.rotation.z = 0;
      ped.group.position.y = 0;
      ped.health = 100;
    }
  }
  player.visible = true;
  playerShadow.visible = true;
  player.position.set(1.8, 0, 25);
  playerState.heading = 0;
  player.rotation.y = 0;
  game.camYaw = 0;
  game.camPitch = 0.28;
  snapCameraBehindPlayer();
  updateCash();
  updateHealth();
  updateWanted();
  updateControlsUI();
  hud.classList.remove('hidden');
  beginMission(buildMission('first'));
}

function startGame() {
  if (game.mode !== 'menu') return;
  audio.init();
  audio.resume();
  audio.ui();
  $('start-screen').classList.add('hidden');
  document.body.classList.remove('result-open');
  hud.classList.remove('hidden');
  game.mode = 'playing';
  game.started = true;
  game.elapsed = 0;
  game.startTime = performance.now();
  game.health = 100;
  game.armor = 0;
  game.camYaw = 0;
  game.camPitch = 0.28;
  game.camDist = 7.4;
  player.visible = true;
  playerShadow.visible = true;
  snapCameraBehindPlayer();
  updateCash();
  updateHealth();
  updateWanted();
  updateControlsUI();
  beginMission(buildMission('first'));
  requestAnimationFrame(() => {
    try { document.documentElement.requestFullscreen?.()?.catch?.(() => {}); } catch { /* noop */ }
    try { screen.orientation?.lock?.('landscape')?.catch?.(() => {}); } catch { /* noop */ }
  });
  if (innerHeight > innerWidth && isTouch) {
    rotateHint.classList.remove('hidden');
    setTimeout(() => rotateHint.classList.add('hidden'), 5200);
  }
}

function updateMarkers(dt) {
  const t = performance.now() / 1000;
  for (const marker of [objectiveMarker, lockupMarker]) {
    if (!marker.visible) continue;
    const u = marker.userData;
    const s = 1 + Math.sin(t * 2.6) * 0.07;
    u.ring.scale.setScalar(s);
    u.ring.material.opacity = 0.55 + Math.sin(t * 2.6) * 0.25;
    u.beam.material.opacity = 0.08 + Math.sin(t * 1.7) * 0.035;
    u.diamond.rotation.y += dt * 1.8;
    u.diamond.position.y = u.baseY + Math.sin(t * 2.2) * 0.18;
  }
}

function updateHUD(dt) {
  healthFill.style.width = `${clamp(game.health, 0, 100)}%`;
  armorFill.style.width = `${clamp(game.armor, 0, 100)}%`;
  if (game.inCar) {
    const car = game.inCar;
    const mph = Math.round(Math.abs(car.speed) * 2.237);
    speedValue.textContent = String(mph);
    speedFill.style.width = `${clamp(Math.abs(car.speed) / 34 * 100, 0, 100)}%`;
    carHealthFill.style.width = `${clamp(car.health, 0, 100)}%`;
    carHealthFill.style.background = car.health < 35 ? '#ff5c5c' : car.health < 65 ? '#ffd15a' : '#65f3e0';
  }
  game.districtTimer = (game.districtTimer || 0) - dt;
  if (game.districtTimer <= 0) {
    game.districtTimer = 0.4;
    districtLabel.textContent = world.districtAt(player.position.x, player.position.z);
  }
  if (nowSec() - game.lastDamage > 8 && game.health < 100) {
    game.health = Math.min(100, game.health + dt * 5);
  }
}

function drawMinimap() {
  const w = minimap.width, h = minimap.height;
  const cx = w / 2, cy = h / 2;
  const scale = 1.35;
  const px = player.position.x;
  const pz = player.position.z;
  mctx.clearRect(0, 0, w, h);
  mctx.save();
  mctx.beginPath(); mctx.arc(cx, cy, w / 2 - 2, 0, Math.PI * 2); mctx.clip();
  mctx.fillStyle = '#16384d'; mctx.fillRect(0, 0, w, h);
  mctx.translate(cx - px * scale, cy - pz * scale);

  // city land
  mctx.fillStyle = '#5d5758';
  mctx.fillRect(-132 * scale, -132 * scale, 264 * scale, 264 * scale);
  mctx.fillStyle = 'rgba(255,255,255,0.035)';
  for (const bx of [-100, -60, -20, 20, 60, 100]) {
    for (const bz of [-100, -60, -20, 20, 60, 100]) {
      mctx.fillRect((bx - 18) * scale, (bz - 18) * scale, 36 * scale, 36 * scale);
    }
  }

  // roads
  mctx.strokeStyle = '#292c34';
  mctx.lineWidth = 14 * scale;
  mctx.lineCap = 'butt';
  for (const r of ROADS) {
    mctx.beginPath(); mctx.moveTo(r * scale, -132 * scale); mctx.lineTo(r * scale, 132 * scale); mctx.stroke();
    mctx.beginPath(); mctx.moveTo(-132 * scale, r * scale); mctx.lineTo(132 * scale, r * scale); mctx.stroke();
  }
  mctx.strokeStyle = 'rgba(232,199,116,0.28)';
  mctx.lineWidth = 1.2;
  for (const r of ROADS) {
    mctx.beginPath(); mctx.moveTo(r * scale, -132 * scale); mctx.lineTo(r * scale, 132 * scale); mctx.stroke();
    mctx.beginPath(); mctx.moveTo(-132 * scale, r * scale); mctx.lineTo(132 * scale, r * scale); mctx.stroke();
  }

  // buildings
  mctx.fillStyle = 'rgba(20,16,28,0.58)';
  for (const c of world.colliders) {
    const bw = (c.maxX - c.minX) * scale;
    const bh = (c.maxZ - c.minZ) * scale;
    if (bw < 2 || bh < 2) continue;
    mctx.fillRect(c.minX * scale, c.minZ * scale, bw, bh);
  }

  // traffic
  mctx.fillStyle = 'rgba(255,240,205,0.5)';
  for (const t of world.traffic) {
    mctx.beginPath(); mctx.arc(t.group.position.x * scale, t.group.position.z * scale, 1.6, 0, Math.PI * 2); mctx.fill();
  }

  // cops
  for (const cop of cops) {
    if (cop.dead) continue;
    mctx.fillStyle = '#5fb0ff';
    mctx.beginPath(); mctx.arc(cop.group.position.x * scale, cop.group.position.z * scale, 3.1, 0, Math.PI * 2); mctx.fill();
    mctx.strokeStyle = 'rgba(255,255,255,0.65)'; mctx.lineWidth = 1; mctx.stroke();
  }

  // objective / lockup
  const obj = game.mission ? missionTarget() : LOCKUP;
  const objColor = game.mission ? '#ffc85a' : '#65f3e0';
  const ox = obj.x * scale, oz = obj.z * scale;
  mctx.save();
  mctx.translate(ox, oz);
  mctx.rotate(Math.PI / 4);
  mctx.fillStyle = objColor;
  mctx.shadowColor = objColor; mctx.shadowBlur = 10;
  mctx.fillRect(-4, -4, 8, 8);
  mctx.restore();

  // player arrow (fixed at center)
  mctx.translate(px * scale, pz * scale);
  const heading = game.inCar ? game.inCar.heading : playerState.heading;
  mctx.rotate(Math.PI - heading);
  mctx.fillStyle = '#fff4df';
  mctx.shadowColor = 'rgba(0,0,0,0.8)'; mctx.shadowBlur = 4;
  mctx.beginPath();
  mctx.moveTo(0, -8); mctx.lineTo(6, 6); mctx.lineTo(0, 3); mctx.lineTo(-6, 6); mctx.closePath(); mctx.fill();
  mctx.restore();
}

function updateMenu(dt) {
  const t = performance.now() / 1000;
  const angle = -2.32 + Math.sin(t * 0.035) * 0.3;
  camera.position.set(Math.cos(angle) * 145, 48 + Math.sin(t * 0.2) * 2, Math.sin(angle) * 145);
  camera.lookAt(0, 11, 18);
  world.update(dt, player.position, 0);
  updateMarkers(dt);
}

// ---------------------------------------------------------------------------
// Main update / render loop
// ---------------------------------------------------------------------------
let minimapTimer = 0;
function updateGame(dt) {
  game.elapsed += dt;
  if (game.inCar) updateVehicle(dt);
  else moveOnFoot(dt);
  if (game.mode !== 'playing') return;

  world.update(dt, player.position, game.wanted > 0 ? 1 : 0);
  updateMission(dt);
  if (game.mode !== 'playing') return;
  updateCops(dt);
  updateGangs(dt);
  if (game.mode !== 'playing') return;
  if (input.fire) tryShoot();
  updateContext();
  updateHUD(dt);
  updateCamera(dt);
  updateEffects(dt);
  updateMarkers(dt);

  minimapTimer -= dt;
  if (minimapTimer <= 0) {
    minimapTimer = 0.08;
    drawMinimap();
  }

  if (game.inCar) {
    audio.setEngine(true, game.inCar.speed);
  }
}

let lastFrame = performance.now();
let fpsAccum = 0, fpsFrames = 0, lowFpsChecked = false;
function frame(now) {
  requestAnimationFrame(frame);
  const dt = Math.min(0.05, Math.max(0.0001, (now - lastFrame) / 1000));
  lastFrame = now;
  if (game.mode === 'menu') updateMenu(dt);
  else if (game.mode === 'playing') updateGame(dt);
  else if (game.mode === 'result' || game.mode === 'paused') {
    updateMarkers(dt);
    updateEffects(dt);
  }
  renderer.render(scene, camera);

  if (!lowFpsChecked && game.mode === 'playing' && now - game.startTime > 5000) {
    fpsAccum += dt; fpsFrames++;
    if (fpsAccum > 2.5) {
      lowFpsChecked = true;
      const fps = fpsFrames / fpsAccum;
      if (fps < 38) {
        renderer.setPixelRatio(1);
        renderer.setSize(innerWidth, innerHeight, false);
        sunLight.castShadow = false;
      }
    }
  }
}

window.addEventListener('resize', () => {
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isTouch ? 1.45 : 1.8));
  renderer.setSize(innerWidth, innerHeight, false);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden && game.mode === 'playing') pauseGame();
});

// ---------------------------------------------------------------------------
// Boot
// ---------------------------------------------------------------------------
const startScreen = $('start-screen');
const loadingScreen = $('loading-screen');
const loadingFill = $('loading-fill');
const loadingCopy = $('loading-copy');

async function boot() {
  player.visible = false;
  playerShadow.visible = false;
  objectiveMarker.visible = false;
  lockupMarker.visible = false;
  hud.classList.add('hidden');
  loadingFill.style.width = '22%';
  loadingCopy.textContent = 'Painting the skyline…';
  await new Promise((r) => setTimeout(r, 120));
  loadingFill.style.width = '62%';
  loadingCopy.textContent = 'Starting the sunset engine…';
  await Promise.race([document.fonts?.ready || Promise.resolve(), new Promise((r) => setTimeout(r, 1200))]);
  await new Promise((r) => setTimeout(r, 220));
  loadingFill.style.width = '100%';
  loadingCopy.textContent = 'Welcome to Sunset City';
  await new Promise((r) => setTimeout(r, 260));
  loadingScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
  game.mode = 'menu';
  game.camPos.copy(camera.position);
  requestAnimationFrame(frame);
}

window.__SUNSET = { game, world, player, camera, scene, renderer, input, playerState, cops, gangTargets, THREE };

boot();



