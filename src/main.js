import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js';

import { World } from './world.js';
import { FX } from './fx.js';
import { AudioEngine } from './audio.js';
import { ZombieManager } from './zombies.js';
import { Weapon } from './weapon.js';
import { UI } from './ui.js';

const V3 = THREE.Vector3;
const TMP = new V3();
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;

/* ------------------------------------------------------------------ */
/* post-processing grade                                              */
/* ------------------------------------------------------------------ */
const GradeShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uDamage: { value: 0 },
    uFlash: { value: 0 },
    uDeath: { value: 0 },
  },
  vertexShader: /* glsl */`
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
  `,
  fragmentShader: /* glsl */`
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform vec2 uResolution;
    uniform float uDamage;
    uniform float uFlash;
    uniform float uDeath;
    varying vec2 vUv;
    float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
    void main() {
      vec2 cc = vUv - 0.5;
      float r2 = dot(cc, cc);
      vec2 uv = 0.5 + cc * (1.0 + r2 * 0.022);
      float ca = (0.0008 + r2 * 0.0045) * (1.0 + uDamage * 1.4);
      vec3 col;
      col.r = texture2D(tDiffuse, uv + cc * ca).r;
      col.g = texture2D(tDiffuse, uv).g;
      col.b = texture2D(tDiffuse, uv - cc * ca).b;

      // cinematic teal shadows / warm highlights
      float lum = dot(col, vec3(0.299, 0.587, 0.114));
      vec3 shadowTint = vec3(0.82, 0.94, 1.08);
      vec3 highTint = vec3(1.07, 1.01, 0.92);
      col *= mix(shadowTint, highTint, smoothstep(0.05, 0.75, lum));
      col = mix(col, vec3(lum), 0.08);

      // vignette
      float vig = smoothstep(0.92, 0.22, length(cc) * 1.32);
      col *= mix(0.42, 1.0, vig);

      // film grain
      float n = hash(uv * uResolution + fract(uTime) * 91.7);
      col += (n - 0.5) * (0.045 + uDamage * 0.04);

      // subtle scanlines
      col *= 1.0 - 0.022 * sin(uv.y * uResolution.y * 1.7);

      // damage / lightning / death
      col = mix(col, vec3(0.32, 0.015, 0.015), uDamage * 0.28);
      col += vec3(0.5, 0.62, 0.78) * uFlash * 0.55;
      col = mix(col, vec3(0.02, 0.0, 0.0), uDeath * 0.55);
      gl_FragColor = vec4(max(col, 0.0), 1.0);
    }
  `,
};

/* ------------------------------------------------------------------ */
/* bootstrap                                                          */
/* ------------------------------------------------------------------ */
const canvas = document.getElementById('game-canvas');
const isTouch = matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
if (isTouch) document.body.classList.add('touch');

const ui = new UI();
const audio = new AudioEngine();

const renderer = new THREE.WebGLRenderer({
  canvas, antialias: false, alpha: false, stencil: false,
  powerPreference: 'high-performance',
  preserveDrawingBuffer: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isTouch ? 1.25 : 1.75));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.38;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.autoClear = false;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x05080c);
const camera = new THREE.PerspectiveCamera(72, window.innerWidth / window.innerHeight, 0.05, 220);
camera.rotation.order = 'YXZ';
camera.position.set(0, 1.7, 9);

const world = new World(scene, renderer);
const fx = new FX(scene, world, camera);
const zombies = new ZombieManager(scene, world, fx, audio);
const weapon = new Weapon(renderer, camera, fx, audio);
weapon.attachEnvironment(scene.environment);

const composer = new EffectComposer(renderer);
const worldPass = new RenderPass(scene, camera);
composer.addPass(worldPass);

const viewPass = new RenderPass(weapon.viewScene, weapon.viewCamera);
viewPass.clear = false;
viewPass.clearDepth = true;
composer.addPass(viewPass);

const bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2), 0.42, 0.55, 0.82);
composer.addPass(bloom);

const grade = new ShaderPass(GradeShader);
composer.addPass(grade);

const fxaa = new ShaderPass(FXAAShader);
fxaa.material.uniforms.resolution.value.set(1 / (window.innerWidth * renderer.getPixelRatio()), 1 / (window.innerHeight * renderer.getPixelRatio()));
composer.addPass(fxaa);

const output = new OutputPass();
composer.addPass(output);

/* ------------------------------------------------------------------ */
/* state                                                              */
/* ------------------------------------------------------------------ */
const game = {
  state: 'loading', // loading | menu | playing | paused | dead
  wave: 0,
  waveActive: false,
  spawnQueue: 0,
  spawnTimer: 0,
  intermission: 0,
  kills: 0,
  headshots: 0,
  score: 0,
  shots: 0,
  hits: 0,
  time: 0,
  quality: 'auto',
  gore: true,
  autoQualityDone: false,
};

const player = {
  pos: new V3(0, 1.7, 8.5),
  yaw: 0,
  pitch: -0.02,
  health: 100,
  maxHealth: 100,
  armor: 100,
  alive: true,
  radius: 0.36,
  speed: 0,
  bob: 0,
  bobT: 0,
  aliveTime: 0,
  hurtCooldown: 0,
  lowHealthTimer: 0,
  damage(amount, source) {
    if (!player.alive || game.state !== 'playing') return;
    const absorb = Math.min(player.armor, amount * 0.62);
    player.armor -= absorb;
    const hp = amount - absorb;
    player.health -= hp;
    player.hurtCooldown = 0.25;
    ui.damage(amount);
    ui.setHealth(Math.max(0, player.health));
    ui.setArmor(player.armor / 100);
    audio.playerHurt();
    shake = Math.min(3.5, shake + 1.4);
    grade.uniforms.uDamage.value = 1;
    if (player.health <= 0) {
      player.health = 0;
      die();
    }
  },
  reset() {
    player.pos.set(0, 1.7, 8.5);
    player.yaw = 0;
    player.pitch = -0.02;
    player.health = 100;
    player.armor = 100;
    player.alive = true;
    player.aliveTime = 0;
    player.speed = 0;
    player.hurtCooldown = 0;
    ui.setHealth(100);
    ui.setArmor(1);
  },
};

let shake = 0;
let cameraKickPitch = 0;
let cameraKickYaw = 0;
let firing = false;
let input = { x: 0, y: 0 };
let lookDelta = { x: 0, y: 0 };
let mouseDown = false;
let joystickId = null;
let lookPointerId = null;
let lastLook = { x: 0, y: 0 };
let sensitivity = 1;
let menuT = 0;
let fpsAccum = 0;
let fpsFrames = 0;
let fpsValue = 0;
let fpsCheckT = 0;
let lowFpsTime = 0;
let heartbeatT = 0;
let pointerLockHint = 0;

const settings = {
  sensitivity: 1,
  quality: 'auto',
  gore: true,
  assist: true,
};
try {
  Object.assign(settings, JSON.parse(localStorage.getItem('dead-signal-settings') || '{}'));
} catch { /* ignore */ }
sensitivity = settings.sensitivity;
weapon.aimAssist = settings.assist;
game.gore = settings.gore;
fx.goreEnabled = settings.gore;

function saveSettings() {
  try { localStorage.setItem('dead-signal-settings', JSON.stringify(settings)); } catch { /* ignore */ }
}

/* ------------------------------------------------------------------ */
/* loading                                                           */
/* ------------------------------------------------------------------ */
const tips = [
  'Tip: Aim for the head. It saves ammo — and it sends a message.',
  'Tip: Sprinting keeps you alive. Standing still makes you a target.',
  'Tip: Reload behind cover. The dead do not respect a fair fight.',
  'Tip: Watch the ammo pips. A dry click is the loudest sound in the world.',
  'Tip: Keep moving. They are slower than you — until they are not.',
];
ui.el.loadingTip.textContent = tips[(Math.random() * tips.length) | 0];

async function boot() {
  ui.setLoading(0.08, 'GENERATING TERRAIN');
  await new Promise((r) => requestAnimationFrame(r));
  ui.setLoading(0.22, 'COOKING PBR SURFACES');
  await new Promise((r) => setTimeout(r, 40));

  let zp = 0, wp = 0;
  const updateProgress = () => {
    const p = 0.28 + (zp * 0.4 + wp * 0.32);
    ui.setLoading(Math.min(0.97, p), zp < 0.99 ? 'RECOVERING BIOMASS' : wp < 0.99 ? 'ASSEMBLING M4A1' : 'SYNCING OPTICS');
  };

  try {
    await Promise.all([
      zombies.load((p) => { zp = p; updateProgress(); }),
      weapon.load((p) => { wp = p; updateProgress(); }),
    ]);
    weapon.attachEnvironment(scene.environment);
  } catch (err) {
    console.error(err);
    ui.el.loadingStatus.textContent = 'ASSET RECOVERY FAILED';
    ui.el.loadingTip.textContent = 'Could not load the 3D models. Check the console for details.';
    return;
  }

  ui.setLoading(1, 'SIGNAL ACQUIRED');
  await new Promise((r) => setTimeout(r, 420));
  ui.hideLoading();
  weapon.holder.visible = false;
  setupShowcase();
  game.state = 'menu';
  ui.showTitle();
  applyQuality(settings.quality, true);
  updateSettingsUI();
  window.__deadSignal.ready = true;

  const params = new URLSearchParams(location.search);
  if (params.get('autostart') === '1' || params.get('play') === '1') {
    setTimeout(() => startGame(false), 350);
  }
}

/* ------------------------------------------------------------------ */
/* menu showcase                                                      */
/* ------------------------------------------------------------------ */
function setupShowcase() {
  zombies.clear();
  fx.reset();
  const hero = zombies.spawnShowcase(new V3(4.1, 0, 3.55));
  if (hero) {
    hero.root.rotation.y = Math.atan2(0.35 - 4.1, 8.4 - 3.55);
    hero.targetHeight = 1.94;
    hero.visual.scale.setScalar(hero.targetHeight / zombies.baseHeight);
    hero.visual.rotation.z = -0.03;
  }
  const b1 = zombies.spawnShowcase(new V3(-5.2, 0, -3.5));
  if (b1) b1.root.rotation.y = Math.atan2(5.2, 8.4 + 3.5);
  const b2 = zombies.spawnShowcase(new V3(8.5, 0, -5.5));
  if (b2) b2.root.rotation.y = Math.atan2(-8.5, 8.4 + 5.5);
  camera.position.set(0.35, 1.7, 8.4);
  camera.lookAt(1.85, 1.13, 1.2);
}

/* ------------------------------------------------------------------ */
/* game lifecycle                                                     */
/* ------------------------------------------------------------------ */
function resetRun() {
  zombies.clear();
  fx.reset();
  weapon.reset();
  player.reset();
  game.wave = 0;
  game.waveActive = false;
  game.spawnQueue = 0;
  game.spawnTimer = 0;
  game.intermission = 0;
  game.kills = 0;
  game.headshots = 0;
  game.score = 0;
  game.shots = 0;
  game.hits = 0;
  game.time = 0;
  ui.setScore(0, 0, 0);
  ui.setWave(0, 0);
  ui.setAmmo(weapon.mag, weapon.reserve);
  grade.uniforms.uDeath.value = 0;
}

function startGame(fromUser = true) {
  if (!window.__deadSignal.ready) return;
  audio.resume();
  audio.uiClick();
  resetRun();
  ui.hideLoading();
  ui.hideTitle();
  ui.hideDeath();
  ui.hidePause();
  ui.showHUD();
  ui.setHealth(100);
  ui.setArmor(1);
  ui.setScore(0, 0, 0);
  ui.setAmmo(30, 180);
  weapon.holder.visible = true;
  weapon.start();
  player.alive = true;
  player.pos.set(0, 1.7, 8.5);
  player.yaw = 0;
  player.pitch = -0.02;
  camera.position.copy(player.pos);
  game.state = 'playing';
  game.intermission = 0;
  game.wave = 0;
  game.time = 0;
  startWave(1);
  ui.prompt(isTouch ? '' : 'CLICK TO LOCK MOUSE', !isTouch);
  pointerLockHint = 3;
  if (!isTouch && fromUser === true) canvas.requestPointerLock?.();
}

function startWave(n) {
  game.wave = n;
  game.waveActive = true;
  const base = 4 + Math.floor(n * 1.7);
  game.spawnQueue = Math.min(22, base + (n % 3 === 0 ? 2 : 0));
  game.spawnTimer = 0.7;
  game.intermission = 0;
  const boss = n % 5 === 0;
  ui.banner(boss ? 'ELITE SIGNAL DETECTED' : 'INCOMING', `WAVE ${String(n).padStart(2, '0')}`, boss ? 'SURVIVE THE ELITE' : n === 1 ? 'HOLD THE LINE' : 'THEY KEEP COMING');
  ui.setWave(n, game.spawnQueue);
  audio.thunder();
  if (boss) {
    setTimeout(() => { if (game.state === 'playing') spawnZombie(true); }, 900);
  }
}

function spawnZombie(forceBoss = false) {
  const points = world.spawnPoints;
  let best = points[0];
  let bestD = -1;
  for (const p of points) {
    const d = p.distanceToSquared(player.pos);
    const jitter = Math.random() * 30;
    if (d + jitter > bestD) { bestD = d + jitter; best = p; }
  }
  const pos = best.clone();
  pos.x += (Math.random() - 0.5) * 3.5;
  pos.z += (Math.random() - 0.5) * 3.5;
  const boss = forceBoss;
  const wave = game.wave;
  const runner = !boss && Math.random() < Math.min(0.45, 0.12 + wave * 0.035);
  const z = zombies.spawn(pos, {
    health: boss ? 520 + wave * 75 : 90 + wave * 20 + (runner ? -20 : 20),
    speed: boss ? 1.0 : (runner ? 2.55 : 1.12) + wave * 0.045,
    damage: boss ? 32 : 11 + wave * 1.15,
    runner,
    boss,
    scale: boss ? 1.35 : 0.94 + Math.random() * 0.14,
  });
  if (z) {
    z.root.rotation.y = Math.atan2(player.pos.x - pos.x, player.pos.z - pos.z);
    for (let i = 0; i < 16; i++) {
      fx.dust.spawn(
        new V3(pos.x + (Math.random() - 0.5) * 0.8, 0.15 + Math.random() * 0.7, pos.z + (Math.random() - 0.5) * 0.8),
        new V3((Math.random() - 0.5) * 1.6, 0.6 + Math.random() * 1.8, (Math.random() - 0.5) * 1.6),
        0.16 + Math.random() * 0.3, 0.7 + Math.random() * 0.8
      );
    }
  }
}

function updateWaves(dt) {
  if (game.state !== 'playing') return;
  if (!game.waveActive) {
    game.intermission -= dt;
    if (game.intermission <= 0) startWave(game.wave + 1);
    return;
  }
  const alive = zombies.zombies.filter((z) => !z.dead).length;
  if (game.spawnQueue > 0) {
    game.spawnTimer -= dt;
    const maxAlive = isTouch ? 8 : 11;
    if (game.spawnTimer <= 0 && alive < maxAlive) {
      spawnZombie(false);
      game.spawnQueue--;
      game.spawnTimer = Math.max(0.25, 0.85 - game.wave * 0.03) + Math.random() * 0.45;
    }
  }
  const remaining = game.spawnQueue + alive;
  ui.setWave(game.wave, remaining);
  if (game.spawnQueue === 0 && alive === 0) {
    game.waveActive = false;
    game.intermission = 5.5;
    const bonus = game.wave * 500;
    game.score += bonus;
    ui.setScore(game.score, game.kills, game.headshots);
    ui.banner('AREA SECURE', 'WAVE CLEAR', `+${bonus} BONUS · RESUPPLY INBOUND`);
    ui.feed(`<span class="hs">WAVE CLEAR</span> · +${bonus}`);
    weapon.addAmmo(90);
    player.health = Math.min(100, player.health + 18);
    player.armor = Math.min(100, player.armor + 25);
    ui.setHealth(player.health);
    ui.setArmor(player.armor / 100);
    audio.thunder();
  }
}

function die() {
  if (game.state !== 'playing') return;
  player.alive = false;
  game.state = 'dead';
  weapon.setEnabled(false);
  firing = false;
  ui.setCrosshairVisible(false);
  grade.uniforms.uDeath.value = 1;
  audio.zombieDeath();
  const accuracy = game.shots ? Math.round((game.hits / game.shots) * 100) : 0;
  setTimeout(() => {
    ui.showDeath(
      `<div><b>${game.wave}</b><span>WAVE</span></div><div><b>${game.kills}</b><span>KILLS</span></div><div><b>${game.headshots}</b><span>HEADSHOTS</span></div>`,
      accuracy >= 60 ? 'Good shooting, operator. It was not enough.' : 'The signal went quiet.'
    );
  }, 900);
}

function retry() {
  audio.uiClick();
  ui.hideDeath();
  ui.setCrosshairVisible(true);
  startGame();
}

function goMenu() {
  audio.uiClick();
  ui.hideDeath();
  ui.hidePause();
  ui.hideHUD();
  ui.setCrosshairVisible(true);
  weapon.setEnabled(false);
  weapon.holder.visible = false;
  resetRun();
  game.state = 'menu';
  setupShowcase();
  ui.showTitle();
  grade.uniforms.uDeath.value = 0;
}

function pauseGame() {
  if (game.state !== 'playing') return;
  game.state = 'paused';
  firing = false;
  weapon.setEnabled(false);
  const acc = game.shots ? Math.round((game.hits / game.shots) * 100) : 0;
  ui.showPause(
    `<div><b>${game.wave}</b><span>WAVE</span></div><div><b>${game.kills}</b><span>KILLS</span></div><div><b>${game.headshots}</b><span>HEADSHOTS</span></div><div><b>${acc}%</b><span>ACCURACY</span></div>`
  );
  if (document.pointerLockElement) document.exitPointerLock();
}

function resumeGame() {
  if (game.state !== 'paused') return;
  audio.uiClick();
  ui.hidePause();
  game.state = 'playing';
  weapon.setEnabled(true);
  if (!isTouch) canvas.requestPointerLock?.();
}

/* ------------------------------------------------------------------ */
/* input                                                              */
/* ------------------------------------------------------------------ */
const keys = new Set();
window.addEventListener('keydown', (e) => {
  if (e.code === 'Escape') {
    if (game.state === 'playing') pauseGame();
    else if (game.state === 'paused') resumeGame();
    return;
  }
  if (game.state === 'playing') {
    keys.add(e.code);
    if (e.code === 'KeyR') weapon.startReload();
    if (e.code === 'Space') { firing = true; e.preventDefault(); }
  }
});
window.addEventListener('keyup', (e) => {
  keys.delete(e.code);
  if (e.code === 'Space') firing = false;
});
window.addEventListener('blur', () => { keys.clear(); firing = false; });

canvas.addEventListener('mousedown', (e) => {
  if (game.state !== 'playing') return;
  mouseDown = true;
  if (e.button === 0) firing = true;
  if (!isTouch && document.pointerLockElement !== canvas) {
    canvas.requestPointerLock?.();
    pointerLockHint = 0;
  }
});
window.addEventListener('mouseup', () => { mouseDown = false; firing = false; });
canvas.addEventListener('contextmenu', (e) => e.preventDefault());

document.addEventListener('mousemove', (e) => {
  if (game.state !== 'playing' || isTouch) return;
  if (document.pointerLockElement === canvas) {
    const s = 0.0019 * sensitivity;
    player.yaw -= e.movementX * s;
    player.pitch -= e.movementY * s;
    player.pitch = clamp(player.pitch, -1.32, 1.32);
    lookDelta.x += e.movementX * s;
    lookDelta.y += e.movementY * s;
    pointerLockHint = 0;
  } else if (mouseDown) {
    const s = 0.0022 * sensitivity;
    player.yaw -= e.movementX * s;
    player.pitch -= e.movementY * s;
    player.pitch = clamp(player.pitch, -1.32, 1.32);
    lookDelta.x += e.movementX * s;
    lookDelta.y += e.movementY * s;
  }
});

document.addEventListener('pointerlockchange', () => {
  if (game.state === 'playing' && !isTouch) {
    pointerLockHint = document.pointerLockElement === canvas ? 0 : 4;
  }
});

/* --- touch controls --- */
const joystickZone = document.getElementById('joystick-zone');
const joystickKnob = document.getElementById('joystick-knob');
const lookZone = document.getElementById('look-zone');
const fireBtn = document.getElementById('fire-btn');
const reloadBtn = document.getElementById('reload-btn');

function joystickStart(e) {
  if (game.state !== 'playing') return;
  joystickId = e.pointerId;
  joystickZone.setPointerCapture?.(e.pointerId);
  joystickMove(e);
  e.preventDefault();
}
function joystickMove(e) {
  if (e.pointerId !== joystickId) return;
  const r = joystickZone.getBoundingClientRect();
  const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
  let dx = e.clientX - cx, dy = e.clientY - cy;
  const max = r.width * 0.34;
  const d = Math.hypot(dx, dy);
  if (d > max) { dx = dx / d * max; dy = dy / d * max; }
  joystickKnob.style.transform = `translate(${dx}px, ${dy}px)`;
  input.x = dx / max;
  input.y = -dy / max;
  e.preventDefault();
}
function joystickEnd(e) {
  if (e.pointerId !== joystickId) return;
  joystickId = null;
  input.x = 0; input.y = 0;
  joystickKnob.style.transform = 'translate(0px, 0px)';
}
joystickZone?.addEventListener('pointerdown', joystickStart);
joystickZone?.addEventListener('pointermove', joystickMove);
joystickZone?.addEventListener('pointerup', joystickEnd);
joystickZone?.addEventListener('pointercancel', joystickEnd);

function lookStart(e) {
  if (game.state !== 'playing') return;
  lookPointerId = e.pointerId;
  lastLook.x = e.clientX; lastLook.y = e.clientY;
  lookZone.setPointerCapture?.(e.pointerId);
  e.preventDefault();
}
function lookMove(e) {
  if (e.pointerId !== lookPointerId || game.state !== 'playing') return;
  const dx = e.clientX - lastLook.x;
  const dy = e.clientY - lastLook.y;
  lastLook.x = e.clientX; lastLook.y = e.clientY;
  const s = 0.0034 * sensitivity;
  player.yaw -= dx * s;
  player.pitch -= dy * s;
  player.pitch = clamp(player.pitch, -1.32, 1.32);
  lookDelta.x += dx * s;
  lookDelta.y += dy * s;
  e.preventDefault();
}
function lookEnd(e) {
  if (e.pointerId !== lookPointerId) return;
  lookPointerId = null;
}
lookZone?.addEventListener('pointerdown', lookStart);
lookZone?.addEventListener('pointermove', lookMove);
lookZone?.addEventListener('pointerup', lookEnd);
lookZone?.addEventListener('pointercancel', lookEnd);

fireBtn?.addEventListener('pointerdown', (e) => {
  if (game.state !== 'playing') return;
  firing = true;
  fireBtn.classList.add('active');
  fireBtn.setPointerCapture?.(e.pointerId);
  e.preventDefault();
});
function stopFire(e) {
  firing = false;
  fireBtn.classList.remove('active');
}
fireBtn?.addEventListener('pointerup', stopFire);
fireBtn?.addEventListener('pointercancel', stopFire);
fireBtn?.addEventListener('pointerleave', (e) => { if (e.buttons === 0) stopFire(e); });
reloadBtn?.addEventListener('pointerdown', (e) => {
  e.preventDefault();
  if (game.state === 'playing') weapon.startReload();
});

/* ------------------------------------------------------------------ */
/* player update                                                      */
/* ------------------------------------------------------------------ */
function updatePlayer(dt) {
  player.aliveTime += dt;
  const forward = new V3(-Math.sin(player.yaw), 0, -Math.cos(player.yaw));
  const right = new V3(Math.cos(player.yaw), 0, -Math.sin(player.yaw));
  let mx = input.x, mz = input.y;
  if (!isTouch) {
    mx = (keys.has('KeyD') || keys.has('ArrowRight') ? 1 : 0) - (keys.has('KeyA') || keys.has('ArrowLeft') ? 1 : 0);
    mz = (keys.has('KeyW') || keys.has('ArrowUp') ? 1 : 0) - (keys.has('KeyS') || keys.has('ArrowDown') ? 1 : 0);
  }
  const move = new V3().addScaledVector(right, mx).addScaledVector(forward, mz);
  const len = move.length();
  if (len > 1) move.divideScalar(len);
  const sprint = !isTouch && (keys.has('ShiftLeft') || keys.has('ShiftRight'));
  const targetSpeed = (sprint ? 6.4 : 4.15) * (weapon.reloading ? 0.82 : 1);
  const desired = move.multiplyScalar(targetSpeed);
  const accel = player.speed > targetSpeed ? 12 : 9;
  // integrate with a little inertia
  player.velX = lerp(player.velX || 0, desired.x, Math.min(1, dt * accel));
  player.velZ = lerp(player.velZ || 0, desired.z, Math.min(1, dt * accel));
  const next = player.pos.clone();
  next.x += player.velX * dt;
  next.z += player.velZ * dt;
  world.resolveCircle(next, player.radius);
  player.pos.x = next.x;
  player.pos.z = next.z;
  player.speed = Math.hypot(player.velX, player.velZ);

  // bob
  if (player.speed > 0.2) player.bobT += dt * (4.6 + player.speed * 0.9);
  player.bob = Math.sin(player.bobT) * Math.min(0.035, player.speed * 0.006);
  player.bobSide = Math.cos(player.bobT * 0.5) * Math.min(0.02, player.speed * 0.003);

  // camera
  camera.position.set(
    player.pos.x + player.bobSide,
    1.68 + player.bob,
    player.pos.z
  );
  const shakeX = (Math.random() - 0.5) * shake * 0.006;
  const shakeY = (Math.random() - 0.5) * shake * 0.006;
  camera.rotation.set(
    player.pitch + cameraKickPitch + shakeY,
    player.yaw + cameraKickYaw + shakeX,
    Math.sin(player.bobT * 0.5) * Math.min(0.012, player.speed * 0.002) + shakeX * 0.3
  );
  camera.updateMatrixWorld();

  shake = Math.max(0, shake - dt * 5.5);
  cameraKickPitch = lerp(cameraKickPitch, 0, Math.min(1, dt * 9));
  cameraKickYaw = lerp(cameraKickYaw, 0, Math.min(1, dt * 9));
  lookDelta.x = lerp(lookDelta.x, 0, Math.min(1, dt * 16));
  lookDelta.y = lerp(lookDelta.y, 0, Math.min(1, dt * 16));

  // low health heartbeat
  if (player.health < 36) {
    heartbeatT -= dt;
    if (heartbeatT <= 0) {
      heartbeatT = 1.05;
      audio.heartbeat(1.4 - player.health / 40);
    }
  }

  // crosshair
  const spreadPx = 5 + weapon.spread * 620 + Math.min(6, player.speed * 0.7);
  ui.crosshairSpread(spreadPx);

  // prompts
  if (weapon.reloading) ui.prompt('RELOADING', true);
  else if (weapon.mag === 0 && weapon.reserve === 0) ui.prompt('OUT OF AMMO', true);
  else if (weapon.mag <= 6) ui.prompt(isTouch ? 'TAP RELOAD' : 'PRESS R TO RELOAD', true);
  else if (pointerLockHint > 0) {
    pointerLockHint -= dt;
    ui.prompt('CLICK TO LOCK MOUSE', true);
  } else ui.prompt('', false);
}

function updateDead(dt) {
  camera.position.y = lerp(camera.position.y, 0.6, Math.min(1, dt * 1.2));
  camera.rotation.z = lerp(camera.rotation.z, 0.5, Math.min(1, dt * 0.8));
  camera.rotation.x = lerp(camera.rotation.x, 0.15, Math.min(1, dt * 0.6));
  camera.updateMatrixWorld();
}

function updateMenu(dt) {
  menuT += dt;
  const t = menuT;
  camera.position.set(
    0.35 + Math.sin(t * 0.11) * 0.22,
    1.68 + Math.sin(t * 0.27) * 0.018,
    8.4 + Math.cos(t * 0.09) * 0.12
  );
  camera.lookAt(1.85 + Math.sin(t * 0.07) * 0.07, 1.12, 1.2);
  camera.rotation.z += Math.sin(t * 0.23) * 0.004;
  camera.updateMatrixWorld();
  // showcase zombie idles
  zombies.update(dt, new V3(0, 1.7, 20), player);
  fx.update(dt);
  world.update(dt, camera);
  weapon.update(dt, 0, { x: 0, y: 0 }, false);
}

/* ------------------------------------------------------------------ */
/* main loop                                                          */
/* ------------------------------------------------------------------ */
let lastTime = performance.now();

function animate(now) {
  requestAnimationFrame(animate);
  const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
  lastTime = now;
  update(dt);
  render();
  updateFps(dt);
}

function update(dt) {
  game.time += dt;
  grade.uniforms.uTime.value = game.time;
  grade.uniforms.uDamage.value = Math.max(0, grade.uniforms.uDamage.value - dt * 2.4);
  grade.uniforms.uFlash.value = world.flashOverlay;
  world.update(dt, camera);

  if (game.state === 'menu') {
    updateMenu(dt);
    return;
  }
  if (game.state === 'paused') {
    return;
  }
  if (game.state === 'dead') {
    zombies.update(dt, player.pos, player);
    fx.update(dt);
    weapon.update(dt, 0, { x: 0, y: 0 }, false);
    updateDead(dt);
    return;
  }

  // playing
  updatePlayer(dt);
  if (firing) {
    if (weapon.fire(camera, zombies)) {
      game.shots++;
    }
  }
  weapon.update(dt, player.speed, lookDelta, firing);
  zombies.update(dt, player.pos, player);
  updateWaves(dt);
  fx.update(dt);

  // spawn fog / atmosphere around the player is handled by world
}

function render() {
  const vw = window.innerWidth, vh = window.innerHeight;
  weapon.viewCamera.aspect = vw / vh;
  weapon.viewCamera.fov = camera.fov;
  weapon.viewCamera.updateProjectionMatrix();
  composer.render();
}

function updateFps(dt) {
  fpsAccum += dt;
  fpsFrames++;
  if (fpsAccum > 0.5) {
    fpsValue = Math.round(fpsFrames / fpsAccum);
    ui.setFps(`${fpsValue} FPS`);
    fpsFrames = 0;
    fpsAccum = 0;
    if (game.quality === 'auto' && !game.autoQualityDone && game.state === 'playing') {
      if (fpsValue < 38) {
        lowFpsTime += 0.5;
        if (lowFpsTime > 4) {
          applyQuality('low');
          game.autoQualityDone = true;
        }
      } else {
        lowFpsTime = Math.max(0, lowFpsTime - 0.5);
      }
    }
  }
}

/* ------------------------------------------------------------------ */
/* quality / resize / settings                                        */
/* ------------------------------------------------------------------ */
function applyQuality(mode, silent = false) {
  game.quality = mode;
  let effective = mode;
  if (mode === 'auto') {
    const cores = navigator.hardwareConcurrency || 4;
    const mem = navigator.deviceMemory || 4;
    effective = isTouch ? (cores >= 6 && mem >= 4 ? 'high' : 'low') : (cores >= 4 ? 'high' : 'low');
  }
  if (effective === 'high') {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isTouch ? 1.3 : 1.8));
    bloom.enabled = true;
    bloom.strength = 0.42;
    world.moon.castShadow = true;
    renderer.shadowMap.enabled = true;
  } else {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.0));
    bloom.enabled = false;
    world.moon.castShadow = false;
    renderer.shadowMap.enabled = true;
  }
  onResize();
  if (!silent) {
    settings.quality = mode;
    saveSettings();
    updateSettingsUI();
  }
}

function onResize() {
  const w = window.innerWidth, h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  weapon.resize(w / h);
  renderer.setSize(w, h);
  composer.setSize(w, h);
  bloom.setSize(w / 2, h / 2);
  const pr = renderer.getPixelRatio();
  fxaa.material.uniforms.resolution.value.set(1 / (w * pr), 1 / (h * pr));
  grade.uniforms.uResolution.value.set(w * pr, h * pr);
}
window.addEventListener('resize', onResize);
onResize();

function updateSettingsUI() {
  const sens = document.getElementById('sens-title');
  const sensOut = document.getElementById('sens-out');
  const sensPause = document.getElementById('sens-pause');
  const quality = document.getElementById('quality-title');
  const qualityPause = document.getElementById('quality-pause');
  const gore = document.getElementById('gore-toggle');
  const assist = document.getElementById('assist-toggle');
  if (sens) sens.value = settings.sensitivity;
  if (sensOut) sensOut.textContent = Number(settings.sensitivity).toFixed(2);
  if (sensPause) sensPause.value = settings.sensitivity;
  if (quality) quality.value = settings.quality;
  if (qualityPause) qualityPause.value = settings.quality;
  if (gore) gore.checked = settings.gore;
  if (assist) assist.checked = settings.assist;
}

function setSensitivity(v) {
  settings.sensitivity = Number(v);
  sensitivity = settings.sensitivity;
  saveSettings();
  updateSettingsUI();
}

function setGore(v) {
  settings.gore = !!v;
  game.gore = settings.gore;
  fx.goreEnabled = settings.gore;
  saveSettings();
  updateSettingsUI();
}

function setAssist(v) {
  settings.assist = !!v;
  weapon.aimAssist = settings.assist;
  saveSettings();
  updateSettingsUI();
}

/* ------------------------------------------------------------------ */
/* UI wiring                                                          */
/* ------------------------------------------------------------------ */
document.getElementById('deploy-btn')?.addEventListener('click', startGame);
document.getElementById('credits-btn')?.addEventListener('click', () => { audio.resume(); audio.uiClick(); ui.showCredits(); });
document.getElementById('credits-close')?.addEventListener('click', () => { audio.uiClick(); ui.hideCredits(); });
document.getElementById('settings-btn-title')?.addEventListener('click', () => { audio.resume(); audio.uiClick(); ui.showSettings(); });
document.getElementById('settings-close')?.addEventListener('click', () => { audio.uiClick(); ui.hideSettings(); });
document.getElementById('pause-btn')?.addEventListener('click', pauseGame);
document.getElementById('resume-btn')?.addEventListener('click', resumeGame);
document.getElementById('restart-btn-pause')?.addEventListener('click', () => { ui.hidePause(); retry(); });
document.getElementById('retry-btn')?.addEventListener('click', retry);
document.getElementById('menu-btn')?.addEventListener('click', goMenu);

document.getElementById('sens-title')?.addEventListener('input', (e) => setSensitivity(e.target.value));
document.getElementById('sens-pause')?.addEventListener('input', (e) => setSensitivity(e.target.value));
document.getElementById('quality-title')?.addEventListener('change', (e) => applyQuality(e.target.value));
document.getElementById('quality-pause')?.addEventListener('change', (e) => applyQuality(e.target.value));
document.getElementById('gore-toggle')?.addEventListener('change', (e) => setGore(e.target.checked));
document.getElementById('assist-toggle')?.addEventListener('change', (e) => setAssist(e.target.checked));

/* ------------------------------------------------------------------ */
/* manager callbacks                                                  */
/* ------------------------------------------------------------------ */
zombies.onKill = (z, headshot) => {
  game.kills++;
  if (headshot) game.headshots++;
  const pts = z.isBoss ? 1000 : headshot ? 250 : 100;
  game.score += pts;
  ui.setScore(game.score, game.kills, game.headshots);
  ui.feed(headshot
    ? `<b>HEADSHOT</b> · ${z.isBoss ? 'ELITE DOWN' : 'ZOMBIE DOWN'} <span class="hs">+${pts}</span>`
    : `<b>KILL</b> · ${z.isBoss ? 'ELITE DOWN' : 'ZOMBIE DOWN'} +${pts}`);
  if (z.isBoss) ui.banner('TARGET ELIMINATED', 'ELITE DOWN', '+1000');
  if (navigator.vibrate) navigator.vibrate(headshot ? 28 : 12);
};
zombies.onHeadshot = () => {
  ui.headshot();
  if (navigator.vibrate) navigator.vibrate(16);
};
zombies.onPlayerHit = (damage) => player.damage(damage, null);

weapon.onAmmo = (mag, reserve) => ui.setAmmo(mag, reserve);
weapon.onReloadStart = () => ui.prompt('RELOADING', true);
weapon.onReloadEnd = () => ui.prompt('', false);
weapon.onShot = () => {
  cameraKickPitch += 0.013 + Math.random() * 0.004;
  cameraKickYaw += (Math.random() - 0.5) * 0.008;
  shake = Math.min(1.4, shake + 0.34);
};
weapon.onHit = (hit) => {
  if (hit.miss) return;
  game.hits++;
  if (hit.killed) ui.hitmarker('kill');
  else if (hit.headshot) ui.hitmarker('head');
  else ui.hitmarker('');
  if (hit.killed) shake = Math.min(2.5, shake + 0.5);
};

/* ------------------------------------------------------------------ */
/* debug handle + boot                                                */
/* ------------------------------------------------------------------ */
window.__deadSignal = {
  ready: false,
  THREE,
  game,
  player,
  world,
  zombies,
  weapon,
  fx,
  ui,
  audio,
  camera,
  renderer,
  start: startGame,
  menu: goMenu,
  pause: pauseGame,
  resume: resumeGame,
  spawn: spawnZombie,
  setQuality: applyQuality,
  wave: startWave,
  damage: (n) => player.damage(n, null),
  killAll: () => zombies.zombies.forEach((z) => z.hit(9999, 'head', new V3(0, 0, -1), z.getHeadWorldPosition())),
};

boot();
requestAnimationFrame(animate);
