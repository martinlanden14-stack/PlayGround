/* ============================================================
   NEON BREACH — main game
   ============================================================ */
import * as THREE from 'three';
import { createWorld, collideCircle, ARENA_BOUND } from './world.js';
import { Input } from './input.js';
import { AudioEngine } from './audio.js';
import { FX } from './fx.js';
import { EnemyManager } from './enemies.js';
import { UI } from './ui.js';

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const pad2 = (n) => String(n).padStart(2, '0');

const PLAYER = {
  speed: 6.1,
  sprint: 1.3,
  eye: 1.62,
  radius: 0.42,
  gravity: 19,
  jump: 6.3,
  maxHealth: 100,
  mag: 30,
  reloadTime: 1.3,
  fireDelay: 0.098,
  damage: 26,
  headMult: 3,
  regenDelay: 5.5,
  regenRate: 7,
};

class Game {
  constructor() {
    this.canvas = document.getElementById('game');
    this.state = 'menu';
    this.time = 0;
    this.shake = 0;
    this.recoil = 0;
    this.swayX = 0;
    this.swayY = 0;
    this.flashT = 0;
    this.stepTimer = 0;
    this.aimAssistTarget = null;

    this.stats = { score: 0, kills: 0, shots: 0, hits: 0, streak: 0, streakT: 0, wave: 1 };
    this.wave = 1;
    this.waveState = 'idle';
    this.spawnQueue = [];
    this.spawnTimer = 0;
    this.intermissionT = 0;
    this.maxAlive = 6;
    this.pickups = [];

    this.player = {
      pos: new THREE.Vector3(0, 0, 12),
      vel: new THREE.Vector3(),
      yaw: 0,
      pitch: 0,
      vy: 0,
      grounded: true,
      health: PLAYER.maxHealth,
      ammo: PLAYER.mag,
      reloading: false,
      reloadT: 0,
      fireCd: 0,
      regenT: 0,
      bob: 0,
      bobAmp: 0,
      dead: false,
      moving: 0,
    };

    this._initRenderer();
    this._initScene();
    this._initWeapon();
    this._initGameplay();
    this._initUI();
    this._applyDeviceCopy();
    this._bindEvents();

    this.renderScale = 1;
    this.baseDPR = Math.min(window.devicePixelRatio || 1, this.isTouchDevice() ? 1.5 : 1.75);
    this._resize();

    this.clock = new THREE.Clock();
    this.menuTime = 0;
    this.fpsTimer = 0;
    this.fpsFrames = 0;
    this.fps = 60;
    this.scaleTimer = 0;

    this.ui.showMenu();
    this.ui.setState('menu');
    this.weaponGroup.visible = false;
    this.input.setEnabled(false);

    window.__neon = this;
    this._loop = this._loop.bind(this);
    requestAnimationFrame(this._loop);
  }

  isTouchDevice() {
    return ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
  }

  /* ============================================================
     setup
     ============================================================ */

  _initRenderer() {
    try {
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: false,
        alpha: false,
        stencil: false,
        powerPreference: 'high-performance',
      });
    } catch (err) {
      document.getElementById('boot-error').classList.remove('hidden');
      document.getElementById('menu').classList.add('hidden');
      throw err;
    }
    this.renderer.setClearColor(0x05060f, 1);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.12;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  }

  _initScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(74, 1, 0.04, 240);
    this.camera.rotation.order = 'YXZ';
    this.scene.add(this.camera);

    this.world = createWorld(this.scene);
    this.fx = new FX(this.scene, this.world.glowTex);
    this.audio = new AudioEngine();
  }

  _initWeapon() {
    const g = new THREE.Group();
    const dark = new THREE.MeshStandardMaterial({ color: 0x101724, metalness: 0.8, roughness: 0.34, emissive: 0x07111f, emissiveIntensity: 0.5 });
    const mid = new THREE.MeshStandardMaterial({ color: 0x1a2740, metalness: 0.72, roughness: 0.4, emissive: 0x0a1830, emissiveIntensity: 0.4 });
    const grip = new THREE.MeshStandardMaterial({ color: 0x080c14, metalness: 0.35, roughness: 0.8, emissive: 0x03070c, emissiveIntensity: 0.4 });
    const cyan = new THREE.MeshBasicMaterial({ color: 0x22e6ff, toneMapped: false });
    const pink = new THREE.MeshBasicMaterial({ color: 0xff2d7a, toneMapped: false });

    const add = (geo, mat, x, y, z, rx = 0, ry = 0, rz = 0) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      m.rotation.set(rx, ry, rz);
      g.add(m);
      return m;
    };

    // receiver
    add(new THREE.BoxGeometry(0.17, 0.2, 0.52), dark, 0, 0, -0.06);
    add(new THREE.BoxGeometry(0.145, 0.075, 0.44), mid, 0, 0.135, -0.12);
    add(new THREE.BoxGeometry(0.15, 0.14, 0.36), mid, 0, 0.015, -0.43);
    // handguard vents
    for (let i = 0; i < 3; i++) {
      add(new THREE.BoxGeometry(0.012, 0.055, 0.05), dark, 0.078, 0.02, -0.33 - i * 0.09);
      add(new THREE.BoxGeometry(0.012, 0.055, 0.05), dark, -0.078, 0.02, -0.33 - i * 0.09);
    }
    // barrel + muzzle brake
    add(new THREE.BoxGeometry(0.06, 0.06, 0.4), dark, 0, 0.02, -0.79);
    add(new THREE.BoxGeometry(0.11, 0.11, 0.14), mid, 0, 0.02, -1.0);
    add(new THREE.BoxGeometry(0.13, 0.035, 0.06), dark, 0, 0.02, -0.95);
    // top rail
    add(new THREE.BoxGeometry(0.06, 0.035, 0.56), dark, 0, 0.19, -0.2);
    for (let i = 0; i < 5; i++) {
      add(new THREE.BoxGeometry(0.075, 0.012, 0.03), mid, 0, 0.212, -0.02 - i * 0.08);
    }
    // stock
    add(new THREE.BoxGeometry(0.12, 0.15, 0.3), dark, 0, 0.0, 0.36);
    add(new THREE.BoxGeometry(0.1, 0.06, 0.2), mid, 0, 0.095, 0.33);
    // grip + magazine + trigger guard
    add(new THREE.BoxGeometry(0.11, 0.24, 0.13), grip, 0, -0.18, 0.05, 0.3);
    add(new THREE.BoxGeometry(0.1, 0.24, 0.14), grip, 0, -0.21, -0.14, -0.12);
    add(new THREE.BoxGeometry(0.09, 0.02, 0.14), dark, 0, -0.105, 0.02);
    // neon accents
    add(new THREE.BoxGeometry(0.016, 0.02, 0.28), cyan, 0.088, 0.055, -0.28);
    add(new THREE.BoxGeometry(0.016, 0.02, 0.28), cyan, -0.088, 0.055, -0.28);
    add(new THREE.BoxGeometry(0.02, 0.016, 0.3), cyan, 0, 0.215, -0.2);
    add(new THREE.BoxGeometry(0.02, 0.02, 0.24), pink, 0, -0.1, -0.36);
    // energy cell on the visible (left) side
    add(new THREE.BoxGeometry(0.018, 0.1, 0.16), cyan, -0.094, -0.045, -0.16);
    add(new THREE.BoxGeometry(0.02, 0.03, 0.04), pink, 0.09, 0.05, 0.02);

    // holographic sight frame
    const sy = 0.265;
    const sz = -0.3;
    add(new THREE.BoxGeometry(0.008, 0.075, 0.008), cyan, -0.047, sy, sz);
    add(new THREE.BoxGeometry(0.008, 0.075, 0.008), cyan, 0.047, sy, sz);
    add(new THREE.BoxGeometry(0.102, 0.008, 0.008), cyan, 0, sy + 0.038, sz);
    add(new THREE.BoxGeometry(0.102, 0.008, 0.008), cyan, 0, sy - 0.038, sz);
    const dot = add(new THREE.SphereGeometry(0.009, 8, 8), pink, 0, sy, sz);
    dot.material = pink;

    g.scale.setScalar(0.95);
    g.position.set(0.31, -0.3, -0.62);
    g.rotation.set(0.015, -0.055, 0.01);
    this.camera.add(g);
    this.weaponGroup = g;
    this.weaponBase = { x: 0.31, y: -0.3, z: -0.62, rx: 0.015, ry: -0.055, rz: 0.01 };

    this.muzzle = new THREE.Object3D();
    this.muzzle.position.set(0, 0.02, -1.1);
    g.add(this.muzzle);

    this.muzzleFlash = new THREE.Sprite(new THREE.SpriteMaterial({
      map: this.world.glowTex,
      color: 0xffd9a0,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    }));
    this.muzzleFlash.scale.set(0.5, 0.5, 1);
    this.muzzleFlash.position.copy(this.muzzle.position);
    this.muzzleFlash.visible = false;
    g.add(this.muzzleFlash);

    this.muzzleLight = new THREE.PointLight(0xffd0a0, 0, 7, 2);
    this.muzzleLight.position.copy(this.muzzle.position);
    g.add(this.muzzleLight);

    this.muzzleWorld = new THREE.Vector3();
  }

  _initGameplay() {
    this.enemies = new EnemyManager(this.scene, this.world, this.fx, this.audio, {
      onKill: (enemy, head) => this._onKill(enemy, head),
      onHit: (enemy, head) => this._onHit(enemy, head),
      onPlayerDamage: (amount, source) => this._damagePlayer(amount, source),
    });

    // shared pickup visuals
    this.pickupGeo = new THREE.IcosahedronGeometry(0.26, 0);
    this.pickupMat = new THREE.MeshBasicMaterial({ color: 0x46ffa8, toneMapped: false });
    this.pickupRingGeo = new THREE.TorusGeometry(0.48, 0.025, 4, 32);
    this.pickupRingMat = new THREE.MeshBasicMaterial({ color: 0x46ffa8, toneMapped: false });
    this.pickupGlowMat = new THREE.SpriteMaterial({
      map: this.world.glowTex, color: 0x46ffa8, transparent: true, opacity: 0.6,
      blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false,
    });
  }

  _initUI() {
    this.ui = new UI();

    this.input = new Input(this.canvas, {
      onPause: () => this.togglePause(),
      onMute: () => this.toggleMute(),
    });

    document.getElementById('btn-deploy').addEventListener('click', () => this.startGame());
    document.getElementById('btn-redeploy').addEventListener('click', () => this.startGame());
    document.getElementById('btn-resume').addEventListener('click', () => this.resumeGame());
    document.getElementById('btn-quit').addEventListener('click', () => this.quitToMenu());
    document.getElementById('btn-menu').addEventListener('click', () => this.quitToMenu());
    document.getElementById('btn-pause').addEventListener('click', () => this.togglePause());
    document.getElementById('btn-mute').addEventListener('click', () => this.toggleMute());
  }

  _applyDeviceCopy() {
    if (this.isTouchDevice()) return;
    const deploy = document.querySelector('#btn-deploy .deploy-label');
    if (deploy) deploy.textContent = 'CLICK TO DEPLOY';
    const hints = [
      ['W', 'WASD — MOVE'],
      ['◎', 'MOUSE — AIM'],
      ['◉', 'CLICK — SHOOT'],
    ];
    document.querySelectorAll('#menu .hint').forEach((el, i) => {
      if (!hints[i]) return;
      el.innerHTML = `<span class="hint-key">${hints[i][0]}</span> ${hints[i][1]}`;
    });
    const foot = document.querySelector('#menu .menu-foot span:last-child');
    if (foot) foot.textContent = 'SPACE JUMP · R RELOAD';
  }

  _bindEvents() {
    window.addEventListener('resize', () => this._resize());
    window.addEventListener('orientationchange', () => setTimeout(() => this._resize(), 120));
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.state === 'playing') this.pauseGame();
    });
    document.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  _resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.renderer.setPixelRatio(this.baseDPR ? this.baseDPR * this.renderScale : Math.min(window.devicePixelRatio || 1, 1.5));
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / Math.max(1, h);
    this.camera.fov = this.camera.aspect < 0.8 ? 82 : 74;
    this.camera.updateProjectionMatrix();

    // keep the viewmodel inside the frame on narrow/portrait screens
    const narrow = this.camera.aspect < 0.8;
    this.weaponBase.x = narrow ? 0.19 : 0.31;
    this.weaponBase.y = narrow ? -0.27 : -0.3;
    this.weaponBase.z = narrow ? -0.7 : -0.62;
    this.weaponGroup.scale.setScalar(narrow ? 0.8 : 0.95);
  }

  /* ============================================================
     state
     ============================================================ */

  startGame() {
    this.audio.init();
    this.resetRun();
    this.state = 'playing';
    this.ui.setState('playing');
    this.ui.reset();
    this.weaponGroup.visible = true;
    this.input.setEnabled(true);
    this.player.pos.set(0, 0, 12);
    this.player.yaw = 0;
    this.player.pitch = 0;
    this.camera.rotation.set(0, 0, 0);
    this.camera.position.set(0, PLAYER.eye, 12);
    this.audio.ui();
    this.startWave(1);
    this.clock.getDelta();

    if (!this.isTouchDevice()) {
      try { this.canvas.requestPointerLock?.(); } catch { /* ignore */ }
    }
  }

  resetRun() {
    this.enemies.clear();
    this.fx.clear();
    this._clearPickups();
    this.stats = { score: 0, kills: 0, shots: 0, hits: 0, streak: 0, streakT: 0, wave: 1 };
    this.wave = 0;
    this.waveState = 'idle';
    this.spawnQueue = [];
    this.spawnTimer = 0;
    this.intermissionT = 0;
    this.maxAlive = 6;
    this.shake = 0;
    this.recoil = 0;
    this.flashT = 0;
    this.aimAssistTarget = null;

    const p = this.player;
    p.pos.set(0, 0, 12);
    p.vel.set(0, 0, 0);
    p.yaw = 0;
    p.pitch = 0;
    p.vy = 0;
    p.grounded = true;
    p.health = PLAYER.maxHealth;
    p.ammo = PLAYER.mag;
    p.reloading = false;
    p.reloadT = 0;
    p.fireCd = 0;
    p.regenT = 0;
    p.bob = 0;
    p.bobAmp = 0;
    p.dead = false;
    p.moving = 0;
    this.stepTimer = 0;

    this.weaponGroup.position.set(this.weaponBase.x, this.weaponBase.y, this.weaponBase.z);
    this.weaponGroup.rotation.set(this.weaponBase.rx, this.weaponBase.ry, this.weaponBase.rz);
  }

  pauseGame() {
    if (this.state !== 'playing') return;
    this.state = 'paused';
    this.input.setEnabled(false);
    this.ui.setPauseStats(this.wave, this.stats.score);
    this.ui.setState('paused');
    this.audio.ui();
    if (document.pointerLockElement) document.exitPointerLock?.();
  }

  resumeGame() {
    if (this.state !== 'paused') return;
    this.state = 'playing';
    this.ui.setState('playing');
    this.input.setEnabled(true);
    this.audio.init();
    this.audio.ui();
    this.clock.getDelta();
    if (!this.isTouchDevice()) {
      try { this.canvas.requestPointerLock?.(); } catch { /* ignore */ }
    }
  }

  togglePause() {
    if (this.state === 'playing') this.pauseGame();
    else if (this.state === 'paused') this.resumeGame();
  }

  quitToMenu() {
    this.state = 'menu';
    this.input.setEnabled(false);
    this.resetRun();
    this.weaponGroup.visible = false;
    this.ui.showMenu();
    this.ui.setState('menu');
    this.menuTime = 0;
    if (document.pointerLockElement) document.exitPointerLock?.();
  }

  toggleMute() {
    this.audio.init();
    const muted = this.audio.toggleMute();
    this.ui.setMuted(muted);
    if (!muted) this.audio.ui();
  }

  /* ============================================================
     waves
     ============================================================ */

  startWave(n) {
    this.wave = n;
    this.stats.wave = n;
    this.waveState = 'active';
    this.spawnQueue = this._buildWave(n);
    this.spawnTimer = 0.85;
    this.maxAlive = Math.min(5 + Math.floor(n / 2), 9);
    this.enemies.wave = n;
    this.ui.setWave(n);
    this.ui.setHostiles(this.spawnQueue.length);
    this.ui.showBanner(`WAVE ${pad2(n)}`, `${this.spawnQueue.length} HOSTILES INBOUND`);
    this.audio.waveStart();
  }

  _buildWave(n) {
    const total = Math.min(4 + n * 2, 22);
    const arr = [];
    for (let i = 0; i < total; i++) {
      const r = Math.random();
      if (n >= 3 && i === total - 1 && (n % 2 === 1 || n >= 6)) arr.push('brute');
      else if (n >= 2 && r < Math.min(0.5, 0.22 + n * 0.025)) arr.push('drone');
      else arr.push('crawler');
    }
    if (n >= 4 && n % 3 === 0 && !arr.includes('brute')) arr[arr.length - 1] = 'brute';
    for (let i = arr.length - 1; i > 0; i--) {
      const j = (Math.random() * (i + 1)) | 0;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  _pickSpawn() {
    const pts = this.world.spawnPoints;
    let best = pts[0];
    let bestScore = -Infinity;
    for (let i = 0; i < 12; i++) {
      const p = pts[(Math.random() * pts.length) | 0];
      const d = p.distanceTo(this.player.pos);
      const score = d + Math.random() * 8;
      if (d > 11 && score > bestScore) { bestScore = score; best = p; }
    }
    return new THREE.Vector3(
      best.x + (Math.random() - 0.5) * 2.2,
      0,
      best.z + (Math.random() - 0.5) * 2.2
    );
  }

  _updateWaves(dt) {
    if (this.waveState === 'active') {
      this.spawnTimer -= dt;
      if (this.spawnQueue.length && this.enemies.aliveCount < this.maxAlive && this.spawnTimer <= 0) {
        const type = this.spawnQueue.shift();
        const pos = this._pickSpawn();
        this.enemies.spawn(type, pos);
        this.spawnTimer = Math.max(0.4, 1.1 - this.wave * 0.035);
        this.ui.setHostiles(this.spawnQueue.length + this.enemies.aliveCount);
      }
      if (!this.spawnQueue.length && this.enemies.aliveCount === 0) this._waveCleared();
    } else if (this.waveState === 'intermission') {
      this.intermissionT -= dt;
      if (this.intermissionT <= 0) this.startWave(this.wave + 1);
    }
  }

  _waveCleared() {
    if (this.waveState !== 'active') return;
    this.waveState = 'intermission';
    this.intermissionT = 4.5;
    const heal = 22;
    this.player.health = Math.min(PLAYER.maxHealth, this.player.health + heal);
    this.player.ammo = PLAYER.mag;
    this.player.reloading = false;
    this.ui.setHealth(this.player.health, PLAYER.maxHealth);
    this.ui.setAmmo(this.player.ammo, PLAYER.mag, false, 0);
    this.ui.setHostiles(0);
    this.ui.showBanner('WAVE CLEARED', `+${heal} INTEGRITY · AMMO RESTORED · NEXT WAVE IN 4`);
    this.audio.waveClear();
  }

  /* ============================================================
     player
     ============================================================ */

  _updatePlayer(dt, t) {
    const p = this.player;
    if (p.dead) return;

    // look
    const look = this.input.consumeLook();
    const sens = this.input.isTouch ? 0.0043 : 0.0022;
    p.yaw -= look.x * sens;
    p.pitch -= look.y * sens;
    p.pitch = clamp(p.pitch, -1.45, 1.45);
    this._lookDX = look.x;
    this._lookDY = look.y;

    // movement
    const input = this.input;
    let ix = input.move.x;
    let iy = input.move.y;
    const mag = Math.hypot(ix, iy);
    if (mag > 1) { ix /= mag; iy /= mag; }
    const sprint = input.sprint && !input.isTouch ? PLAYER.sprint : 1;
    const speed = PLAYER.speed * sprint;
    const sin = Math.sin(p.yaw);
    const cos = Math.cos(p.yaw);
    const tvx = (-sin * iy + cos * ix) * speed;
    const tvz = (-cos * iy - sin * ix) * speed;
    const accel = p.grounded ? 14 : 4.5;
    p.vel.x = lerp(p.vel.x, tvx, Math.min(1, accel * dt));
    p.vel.z = lerp(p.vel.z, tvz, Math.min(1, accel * dt));
    p.pos.x += p.vel.x * dt;
    p.pos.z += p.vel.z * dt;

    collideCircle(p.pos, PLAYER.radius, this.world.colliders, ARENA_BOUND);

    // jump / gravity
    if (input.consumeJump() && p.grounded) {
      p.vy = PLAYER.jump;
      p.grounded = false;
    }
    if (!p.grounded) {
      p.vy -= PLAYER.gravity * dt;
      p.pos.y += p.vy * dt;
      if (p.pos.y <= 0) {
        p.pos.y = 0;
        p.vy = 0;
        p.grounded = true;
        this.shake = Math.min(1, this.shake + 0.15);
      }
    }

    // head bob
    const horizSpeed = Math.hypot(p.vel.x, p.vel.z);
    p.moving = clamp(horizSpeed / PLAYER.speed, 0, 1.4);
    if (p.grounded && horizSpeed > 0.6) {
      p.bob += dt * (7.2 + horizSpeed * 0.85);
      p.bobAmp = lerp(p.bobAmp, 1, Math.min(1, dt * 8));
    } else {
      p.bobAmp = lerp(p.bobAmp, 0, Math.min(1, dt * 8));
    }

    // footsteps
    if (p.grounded && horizSpeed > 1.2) {
      this.stepTimer -= dt * (horizSpeed / PLAYER.speed);
      if (this.stepTimer <= 0) {
        this.stepTimer = 0.36;
        this.audio.step();
      }
    } else {
      this.stepTimer = 0.12;
    }

    // health regen
    if (p.regenT > 0) p.regenT -= dt;
    else if (p.health < PLAYER.maxHealth) {
      p.health = Math.min(PLAYER.maxHealth, p.health + PLAYER.regenRate * dt);
      this.ui.setHealth(p.health, PLAYER.maxHealth);
    }

    // camera
    this.shake = Math.max(0, this.shake - dt * 2.4);
    const bobY = Math.sin(p.bob * 2) * 0.032 * p.bobAmp;
    const bobX = Math.cos(p.bob) * 0.018 * p.bobAmp;
    const sh = this.shake * this.shake;
    this.camera.position.set(
      p.pos.x + bobX + (Math.random() - 0.5) * sh * 0.16,
      p.pos.y + PLAYER.eye + bobY + (Math.random() - 0.5) * sh * 0.14,
      p.pos.z + (Math.random() - 0.5) * sh * 0.16
    );
    this.camera.rotation.set(
      p.pitch + (Math.random() - 0.5) * sh * 0.012,
      p.yaw + (Math.random() - 0.5) * sh * 0.012,
      (Math.random() - 0.5) * sh * 0.02
    );

    // weapon + firing
    this._updateWeapon(dt, t);

    if (p.fireCd > 0) p.fireCd -= dt;
    if (this.input.consumeReload()) this._startReload();
    if (this.input.firing && !p.reloading && p.fireCd <= 0) this._fire();
    if (p.reloading) {
      p.reloadT += dt;
      const k = Math.min(1, p.reloadT / PLAYER.reloadTime);
      this.ui.setAmmo(p.ammo, PLAYER.mag, true, k);
      if (k >= 1) this._finishReload();
    } else {
      this.ui.setAmmo(p.ammo, PLAYER.mag, false, 0);
    }

    this.ui.setHealth(p.health, PLAYER.maxHealth);
    const spread = 7 + p.moving * 5 + this.recoil * 6 + (p.grounded ? 0 : 3);
    this.ui.setSpread(spread);

    // combo timer
    if (this.stats.streakT > 0) {
      this.stats.streakT -= dt;
      if (this.stats.streakT <= 0) {
        this.stats.streak = 0;
        this.ui.setCombo(1);
      }
    }
  }

  _updateWeapon(dt, t) {
    const p = this.player;
    const lookDX = this._lookDX || 0;
    const lookDY = this._lookDY || 0;
    this.swayX = lerp(this.swayX, clamp(-lookDX * 0.0014, -0.035, 0.035), Math.min(1, dt * 11));
    this.swayY = lerp(this.swayY, clamp(lookDY * 0.0014, -0.035, 0.035), Math.min(1, dt * 11));
    this.recoil = Math.max(0, this.recoil - dt * 9);

    let dip = 0;
    let roll = 0;
    if (p.reloading) {
      const k = Math.min(1, p.reloadT / PLAYER.reloadTime);
      dip = Math.sin(k * Math.PI) * 0.2;
      roll = Math.sin(k * Math.PI) * 0.55;
    }
    const bob = p.bobAmp;
    const wx = this.weaponBase.x + this.swayX + Math.cos(p.bob) * 0.009 * bob;
    const wy = this.weaponBase.y + this.swayY - dip + Math.sin(p.bob * 2) * 0.009 * bob;
    const wz = this.weaponBase.z + this.recoil * 0.07;
    this.weaponGroup.position.set(wx, wy, wz);
    this.weaponGroup.rotation.set(
      this.weaponBase.rx + this.recoil * 0.16 + roll * 0.2 + this.swayY * 1.6,
      this.weaponBase.ry + this.swayX * 1.8,
      this.weaponBase.rz + roll
    );

    // muzzle flash
    if (this.flashT > 0) {
      this.flashT -= dt;
      const k = Math.max(0, this.flashT / 0.055);
      this.muzzleFlash.visible = true;
      this.muzzleFlash.material.opacity = k;
      const s = 0.36 + (1 - k) * 0.32;
      this.muzzleFlash.scale.set(s, s, 1);
      this.muzzleFlash.material.rotation = Math.random() * Math.PI * 2;
      this.muzzleLight.intensity = 30 * k;
    } else {
      this.muzzleFlash.visible = false;
      this.muzzleLight.intensity = 0;
    }
  }

  _startReload() {
    const p = this.player;
    if (p.reloading || p.ammo >= PLAYER.mag || p.dead) return;
    p.reloading = true;
    p.reloadT = 0;
    this.audio.reloadStart();
  }

  _finishReload() {
    const p = this.player;
    p.reloading = false;
    p.reloadT = 0;
    p.ammo = PLAYER.mag;
    this.audio.reloadEnd();
    this.ui.setAmmo(p.ammo, PLAYER.mag, false, 0);
  }

  _fire() {
    const p = this.player;
    if (p.dead || this.state !== 'playing') return;
    if (p.ammo <= 0) {
      this.audio.dryFire();
      this._startReload();
      return;
    }
    p.ammo--;
    p.fireCd = PLAYER.fireDelay;
    this.stats.shots++;
    this.recoil = 1;
    this.shake = Math.min(1.1, this.shake + 0.28);
    this.flashT = 0.055;
    this.audio.shoot();

    // aim direction from yaw/pitch
    const cp = Math.cos(p.pitch);
    const dir = new THREE.Vector3(-Math.sin(p.yaw) * cp, Math.sin(p.pitch), -Math.cos(p.yaw) * cp);
    const origin = new THREE.Vector3(p.pos.x, p.pos.y + PLAYER.eye, p.pos.z);

    // touch aim assist
    if (this.input.isTouch) {
      let bestAng = 0.13;
      let bestDir = null;
      for (const e of this.enemies.enemies) {
        if (!e.alive) continue;
        const to = e.bodyCenter.clone().sub(origin);
        const dist = to.length();
        if (dist > 45 || dist < 0.5) continue;
        to.divideScalar(dist);
        const ang = dir.angleTo(to);
        if (ang < bestAng) {
          bestAng = ang;
          bestDir = to;
        }
      }
      if (bestDir) dir.lerp(bestDir, 0.6).normalize();
    }

    // spread
    const spread = this.input.isTouch ? 0.0038 : 0.0018;
    dir.x += (Math.random() - 0.5) * spread;
    dir.y += (Math.random() - 0.5) * spread;
    dir.z += (Math.random() - 0.5) * spread;
    dir.normalize();

    const worldT = this.world.raycast(origin, dir, 90);
    const enemyHit = this.enemies.raycast(origin, dir, Math.min(worldT, 90));

    let endT = worldT;
    if (enemyHit) {
      endT = enemyHit.t;
      this.stats.hits++;
      const point = origin.clone().addScaledVector(dir, enemyHit.t);
      const dmg = PLAYER.damage * (enemyHit.head ? PLAYER.headMult : 1);
      this.fx.flash(point, enemyHit.head ? 0xffd27a : 0x9ff6ff, enemyHit.head ? 0.9 : 0.55, 0.08, 1.4);
      this.enemies.damage(enemyHit.enemy, dmg, enemyHit.head, point);
    } else {
      const point = origin.clone().addScaledVector(dir, worldT);
      this.fx.impact(point, 0x9ff6ff);
    }

    // muzzle flash + tracer
    this.camera.updateMatrixWorld(true);
    this.muzzle.getWorldPosition(this.muzzleWorld);
    const end = origin.clone().addScaledVector(dir, Math.max(0.5, endT));
    this.fx.tracer(this.muzzleWorld, end, 0xbdf9ff, 0.034);
    this.fx.flash(this.muzzleWorld, 0xffd9a0, 0.55, 0.075, 1.6);
  }

  /* ============================================================
     combat callbacks
     ============================================================ */

  _comboMult() {
    return 1 + Math.min(4, Math.floor(this.stats.streak / 3));
  }

  _onKill(enemy, head) {
    this.stats.kills++;
    this.stats.streak++;
    this.stats.streakT = 4;
    const mult = this._comboMult();
    const points = Math.round(enemy.def.score * (head ? 1.5 : 1) * mult);
    this.stats.score += points;
    this.ui.setScore(this.stats.score);
    this.ui.setCombo(mult);
    this.ui.killPop(`+${points}${head ? ' ◈ HEADSHOT' : ''}`, head);
    this.ui.hitmarker(true);
    this.audio.kill(head);
    this.shake = Math.min(1.2, this.shake + 0.35);

    if (Math.random() < 0.2) {
      this._spawnPickup(enemy.bodyCenter, 25);
    }
    this.ui.setHostiles(this.spawnQueue.length + this.enemies.aliveCount);
    this._checkWaveClear();
  }

  _onHit(enemy, head) {
    this.audio.hit(head);
    this.ui.hitmarker(false);
  }

  _damagePlayer(amount, source) {
    const p = this.player;
    if (this.state !== 'playing' || p.dead) return;
    p.health -= amount;
    p.regenT = PLAYER.regenDelay;
    this.shake = Math.min(1.2, this.shake + 0.8);
    this.ui.flashDamage();
    this.audio.hurt();
    this.ui.setHealth(p.health, PLAYER.maxHealth);
    if (p.health <= 0) {
      p.health = 0;
      this._die();
    }
  }

  _die() {
    const p = this.player;
    if (p.dead) return;
    p.dead = true;
    this.state = 'dead';
    this.input.setEnabled(false);
    this.audio.gameOver();
    this.weaponGroup.visible = false;
    this.ui.setHealth(0, PLAYER.maxHealth);
    const accuracy = this.stats.shots > 0 ? Math.round((this.stats.hits / this.stats.shots) * 100) : 0;
    if (document.pointerLockElement) document.exitPointerLock?.();
    this.ui.showGameOver({
      score: this.stats.score,
      wave: this.stats.wave,
      kills: this.stats.kills,
      accuracy,
    });
  }

  _checkWaveClear() {
    if (this.waveState !== 'active') return;
    if (!this.spawnQueue.length && this.enemies.aliveCount === 0) this._waveCleared();
  }

  /* ============================================================
     pickups
     ============================================================ */

  _spawnPickup(pos, amount) {
    const group = new THREE.Group();
    const orb = new THREE.Mesh(this.pickupGeo, this.pickupMat);
    group.add(orb);
    const glow = new THREE.Sprite(this.pickupGlowMat);
    glow.scale.set(1.8, 1.8, 1);
    group.add(glow);
    const ring = new THREE.Mesh(this.pickupRingGeo, this.pickupRingMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = -0.4;
    group.add(ring);
    group.position.set(pos.x, 0.75, pos.z);
    this.scene.add(group);
    this.pickups.push({ group, orb, ring, amount, life: 18, baseY: 0.75, t: Math.random() * 6 });
  }

  _updatePickups(dt, t) {
    const p = this.player;
    for (let i = this.pickups.length - 1; i >= 0; i--) {
      const pk = this.pickups[i];
      pk.life -= dt;
      pk.t += dt;
      pk.group.rotation.y += dt * 1.8;
      pk.group.position.y = pk.baseY + Math.sin(t * 2.4 + pk.t) * 0.12;
      pk.ring.rotation.z += dt * 2.4;
      const blink = pk.life < 4 ? (Math.sin(t * 18) > 0 ? 0.3 : 1) : 1;
      pk.group.visible = pk.life > 0 && blink > 0.5;

      const dx = pk.group.position.x - p.pos.x;
      const dz = pk.group.position.z - p.pos.z;
      const dy = pk.group.position.y - (p.pos.y + 1.0);
      if (pk.life > 0 && dx * dx + dz * dz < 1.5 * 1.5 && Math.abs(dy) < 1.8) {
        p.health = Math.min(PLAYER.maxHealth, p.health + pk.amount);
        this.ui.setHealth(p.health, PLAYER.maxHealth);
        this.audio.pickup();
        this.fx.burst(pk.group.position, 0x46ffa8, 14, 3.5, 0.4, 2);
        this.ui.killPop(`+${pk.amount} INTEGRITY`);
        this._removePickup(i);
        continue;
      }
      if (pk.life <= 0) this._removePickup(i);
    }
  }

  _removePickup(index) {
    const pk = this.pickups[index];
    this.scene.remove(pk.group);
    this.pickups.splice(index, 1);
  }

  _clearPickups() {
    for (const pk of this.pickups) this.scene.remove(pk.group);
    this.pickups.length = 0;
  }

  /* ============================================================
     loop
     ============================================================ */

  _menuCamera(t) {
    const a = t * 0.075;
    const r = 24;
    this.camera.position.set(Math.cos(a) * r, 10 + Math.sin(t * 0.35) * 1.6, Math.sin(a) * r);
    this.camera.lookAt(0, 1.8, 0);
    this.camera.rotation.z = Math.sin(t * 0.2) * 0.01;
  }

  _loop() {
    requestAnimationFrame(this._loop);
    const dt = Math.min(this.clock.getDelta(), 0.05);
    this.time += dt;

    if (this.state === 'menu') {
      this.menuTime += dt;
      this._menuCamera(this.menuTime);
      this.world.update(this.time, dt);
      this.fx.update(dt);
    } else if (this.state === 'playing') {
      this._updatePlayer(dt, this.time);
      this._updateWaves(dt);
      this.enemies.update(dt, this.time, this.player.pos);
      this._updatePickups(dt, this.time);
      this.world.update(this.time, dt);
      this.fx.update(dt);
    } else if (this.state === 'dead') {
      // let the scene settle while the overlay is up
      this.enemies.update(dt, this.time, this.player.pos);
      this.world.update(this.time, dt);
      this.fx.update(dt);
    } else {
      // paused: keep the frame static
      this.world.update(this.time, 0);
    }

    this.renderer.render(this.scene, this.camera);

    // fps + dynamic resolution
    this.fpsFrames++;
    this.fpsTimer += dt;
    if (this.fpsTimer >= 1) {
      this.fps = this.fpsFrames / this.fpsTimer;
      this.ui.setFPS(this.fps);
      this.fpsFrames = 0;
      this.fpsTimer = 0;
    }
    if (this.state === 'playing') {
      this.scaleTimer += dt;
      if (this.scaleTimer > 3.5) {
        this.scaleTimer = 0;
        if (this.fps < 42 && this.renderScale > 0.7) {
          this.renderScale = Math.max(0.7, this.renderScale - 0.1);
          this._resize();
        } else if (this.fps > 56 && this.renderScale < 1) {
          this.renderScale = Math.min(1, this.renderScale + 0.05);
          this._resize();
        }
      }
    }
  }
}

new Game();
