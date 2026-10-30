/* ============================================================
   NEON BREACH — main game controller
   ============================================================ */
import * as THREE from 'three';
import { Arena } from './arena.js';
import { Effects } from './effects.js';
import { Enemy, TYPES } from './enemy.js';
import { Pickup } from './pickups.js';
import { Player } from './player.js';
import { HUD } from './hud.js';
import { Input } from './input.js';
import { AudioBus } from './audio.js';

const isTouch = matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
const BEST_KEY = 'neonbreach.best.v1';
const HD_KEY = 'neonbreach.hd.v1';

export class Game {
  constructor(container) {
    this.container = container;
    this.state = 'menu';
    this.wave = 1;
    this.kills = 0;
    this.score = 0;
    this.combo = 1;
    this.comboT = 0;
    this.enemies = [];
    this.pending = [];
    this.bolts = [];
    this.pickups = [];
    this.activeBoltMats = new Map();
    const hdPref = localStorage.getItem(HD_KEY);
    this.quality = hdPref !== null ? (hdPref === '1' ? 'high' : 'low') : (isTouch ? 'low' : 'high');
    this.isTouch = isTouch;

    this.best = parseInt(localStorage.getItem(BEST_KEY) || '0', 10) || 0;

    /* ---- renderer ---- */
    this.renderer = new THREE.WebGLRenderer({
      antialias: !isTouch || window.devicePixelRatio < 1.8,
      powerPreference: 'high-performance',
      stencil: false,
    });
    this.renderer.setPixelRatio(this.targetPixelRatio());
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.18;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(this.renderer.domElement);

    /* ---- scene ---- */
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x060a14, 0.0105);
    this.camera = new THREE.PerspectiveCamera(this.fovForWindow(), window.innerWidth / window.innerHeight, 0.03, 300);
    this.scene.add(this.camera);

    this.audio = new AudioBus();
    this.arena = new Arena(this.scene, this.quality);
    this.effects = new Effects(this.scene);
    this.hud = new HUD(this);
    this.input = new Input({
      canvas: this.renderer.domElement,
      lookZone: document.getElementById('look-zone'),
      stickZone: document.getElementById('stick-zone'),
      stickBase: document.getElementById('stick-base'),
      stickKnob: document.getElementById('stick-knob'),
      stickHome: document.getElementById('stick-home'),
      fireBtn: document.getElementById('btn-fire'),
      reloadBtn: document.getElementById('btn-reload'),
      jumpBtn: document.getElementById('btn-jump'),
    });
    this.player = new Player(this);
    this.player.gun.visible = false;

    this.clock = new THREE.Clock();
    this.waveState = 'idle';
    this.stateTimer = 0;
    this.spawnTimer = 0;
    this.aimCheck = 0;
    this.firstWaveDelay = 0;
    this.deathT = 0;

    this.bindUI();
    this.onResize();
    window.addEventListener('resize', () => this.onResize());
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.state === 'playing') this.pause();
    });

    this.hud.setHealth(100, 100);
    this.hud.setAmmo(30, 150);
    this.hud.setWave(1);
    this.hud.setScore(0);
    this.refreshBest();

    this.loop = this.loop.bind(this);
    this.renderer.setAnimationLoop(this.loop);

    // debug / capture hook
    window.__NEON__ = this;
    window.addEventListener('error', (e) => console.error('[neon]', e.message));
  }

  targetPixelRatio() {
    const dpr = window.devicePixelRatio || 1;
    if (this.quality === 'high') return Math.min(2, dpr);
    return Math.min(isTouch ? 1.5 : 2, dpr);
  }

  fovForWindow() {
    const aspect = window.innerWidth / window.innerHeight;
    if (aspect < 0.75) return 90;
    if (aspect < 1.2) return 84;
    return 74;
  }

  onResize() {
    const w = window.innerWidth, h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.fov = this.fovForWindow();
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(this.targetPixelRatio());
    this.renderer.setSize(w, h);
    this.hud.resizeRadar();
    if (this.player) this.player.setAspect(w / h);

    if (this.state === 'playing') this.showRotateHint();
  }

  /* ------------------------------ UI ------------------------------ */
  bindUI() {
    const $ = (id) => document.getElementById(id);
    this.startScreen = $('start-screen');
    this.pauseScreen = $('pause-screen');
    this.overScreen = $('gameover-screen');

    $('btn-deploy').addEventListener('click', () => {
      this.audio.init();
      this.enterFullscreen();
      this.startRun();
    });
    $('btn-retry').addEventListener('click', () => {
      this.audio.init();
      this.startRun();
    });
    $('btn-menu').addEventListener('click', () => this.toMenu());
    $('btn-resume').addEventListener('click', () => this.resume());
    $('btn-quit').addEventListener('click', () => this.toMenu());
    $('btn-pause').addEventListener('click', () => this.pause());
    $('btn-sound').addEventListener('click', () => this.toggleSound());
    $('opt-hd').checked = this.quality === 'high';
    $('opt-hd').addEventListener('change', (e) => {
      this.quality = e.target.checked ? 'high' : 'low';
      localStorage.setItem(HD_KEY, e.target.checked ? '1' : '0');
      this.onResize();
    });

    window.addEventListener('keydown', (e) => {
      if (this.state === 'menu' && (e.code === 'Enter' || e.code === 'Space')) {
        this.audio.init();
        this.startRun();
      } else if (this.state === 'paused' && (e.code === 'Escape' || e.code === 'Enter')) {
        this.resume();
      } else if (this.state === 'over' && e.code === 'Enter' && !this.overScreen.classList.contains('hidden')) {
        this.startRun();
      }
    });
    document.addEventListener('pointerlockchange', () => {
      if (this.state === 'playing' && !this.isTouch && !document.pointerLockElement) this.pause();
    });
    this.updateSoundIcon();
    this.refreshBest();
  }

  showRotateHint() {
    const show = this.isTouch && window.innerHeight > window.innerWidth && this.state === 'playing';
    this.hud.rotateHint.classList.toggle('hidden', !show);
    if (show) {
      clearTimeout(this._rotTimer);
      this._rotTimer = setTimeout(() => this.hud.rotateHint.classList.add('hidden'), 5000);
    }
  }

  refreshBest() {
    document.getElementById('best-score').textContent = this.best.toLocaleString('en-US');
  }

  updateSoundIcon() {
    const btn = document.getElementById('btn-sound');
    btn.classList.toggle('muted', this.audio.muted);
  }

  toggleSound() {
    this.audio.init();
    this.audio.setMuted(!this.audio.muted);
    this.updateSoundIcon();
    this.audio.ui();
  }

  enterFullscreen() {
    if (!this.isTouch) return;
    try {
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen({ navigationUI: 'hide' }).catch(() => {});
      }
      if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('landscape').catch(() => {});
      }
    } catch { /* non fatal */ }
  }

  /* ---------------------------- lifecycle ---------------------------- */
  startRun() {
    this.clearEntities();
    this.player.reset();
    this.wave = 0;
    this.kills = 0;
    this.score = 0;
    this.combo = 1;
    this.comboT = 0;
    this.deathT = 0;
    this.hud.setScore(0);
    this.hud.setHealth(this.player.health, this.player.maxHealth);
    this.hud.setAmmo(this.player.mag, this.player.reserve);
    this.hud.setCombo(1);
    this.hud.setReload(-1);
    this.hud.setCrosshairEnemy(false);
    this.hud.show();
    this.player.gun.visible = true;

    this.startScreen.classList.add('hidden');
    this.pauseScreen.classList.add('hidden');
    this.overScreen.classList.add('hidden');
    this.state = 'playing';
    this.input.setEnabled(true);
    this.input.clearPressed();
    this.waveState = 'idle';
    this.stateTimer = 2.0;
    this.spawnTimer = 0;
    this.audio.init();
    this.audio.ui();
    this.onResize();

    this.showRotateHint();
    // desktop pointer lock
    if (!isTouch && this.renderer.domElement.requestPointerLock) {
      try { this.renderer.domElement.requestPointerLock(); } catch { /* noop */ }
    }
  }

  startWave() {
    this.wave++;
    this.hud.setWave(this.wave);
    const comp = this.waveComposition(this.wave);
    this.spawnQueue = [];
    for (const [type, n] of Object.entries(comp)) {
      for (let i = 0; i < n; i++) this.spawnQueue.push(type);
    }
    // shuffle
    for (let i = this.spawnQueue.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.spawnQueue[i], this.spawnQueue[j]] = [this.spawnQueue[j], this.spawnQueue[i]];
    }
    this.waveState = 'spawning';
    this.spawnTimer = 0.75;
    this.waveTotal = this.spawnQueue.length;

    const boss = comp.elite > 0;
    this.hud.waveBanner(boss ? `WAVE ${String(this.wave).padStart(2, '0')}` : `WAVE ${String(this.wave).padStart(2, '0')}`,
      boss ? 'OVERSEER SIGNATURE DETECTED' : `${this.waveTotal} HOSTILES INBOUND`);
    this.audio.wave();
    this.hud.setEnemies(this.waveTotal);
    this.combo = 1;
    this.hud.setCombo(1);
  }

  waveComposition(wave) {
    const comp = {};
    comp.scout = 3 + Math.floor(wave * 0.8);
    if (wave >= 2) comp.spitter = Math.floor(wave * 0.7);
    if (wave >= 3) comp.brute = Math.floor((wave + 1) / 2);
    if (wave >= 5 && wave % 5 === 0) comp.elite = Math.floor(wave / 5);
    return comp;
  }

  maxAlive() {
    return Math.min(2 + this.wave, 8);
  }

  updateWaves(dt) {
    if (this.waveState === 'idle') {
      this.stateTimer -= dt;
      if (this.stateTimer <= 0) this.startWave();
      return;
    }

    if (this.waveState === 'spawning') {
      this.spawnTimer -= dt;
      const active = this.aliveCount() + this.pending.length;
      if (this.spawnTimer <= 0 && this.spawnQueue.length > 0 && active < this.maxAlive()) {
        this.queueSpawn(this.spawnQueue.shift());
        this.spawnTimer = 0.55 + Math.random() * 0.25;
      } else if (this.spawnTimer < -0.5) {
        this.spawnTimer = 0;
      }
      if (this.spawnQueue.length === 0 && this.pending.length === 0) {
        this.waveState = 'active';
      }
    } else if (this.waveState === 'active') {
      if (this.aliveCount() === 0) this.waveCleared();
    } else if (this.waveState === 'intermission') {
      this.stateTimer -= dt;
      if (this.stateTimer <= 0) this.startWave();
    }

    // pending spawn telegraphs
    for (let i = this.pending.length - 1; i >= 0; i--) {
      const p = this.pending[i];
      p.t -= dt;
      if (p.t <= 0) {
        this.spawnEnemy(p.type, p.point);
        this.pending.splice(i, 1);
      }
    }
    this.hud.setEnemies(this.aliveCount() + this.spawnQueue.length + this.pending.length);
  }

  queueSpawn(type) {
    let idx = 0;
    let bestDist = -1;
    for (let i = 0; i < this.arena.spawnPoints.length; i++) {
      const sp = this.arena.spawnPoints[i];
      const d = Math.hypot(sp.x - this.player.position.x, sp.z - this.player.position.z);
      const score = d + Math.random() * 6;
      if (score > bestDist) { bestDist = score; idx = i; }
    }
    const point = this.arena.spawnPoints[idx].clone();
    this.arena.flashSpawn(idx);
    this.audio.spawn();
    this.pending.push({ type, point, t: 0.9, index: idx });
  }

  spawnEnemy(type, point) {
    const e = new Enemy(this, type, point, this.wave);
    this.enemies.push(e);
    this.effects.shockwave(new THREE.Vector3(point.x, 1, point.z), e.type.color, 1.4);
    this.effects.sparkBurst(new THREE.Vector3(point.x, 1.4, point.z), new THREE.Vector3(0, 1, 0), e.type.color, 14, 6);
  }

  waveCleared() {
    this.waveState = 'intermission';
    this.stateTimer = 4.2;
    const bonus = 200 * this.wave;
    this.score += bonus;
    this.hud.setScore(this.score);
    this.player.heal(24);
    this.player.addAmmo(60);
    this.hud.waveBanner('WAVE CLEARED', `+${bonus} BONUS · REARMING`);
    this.audio.cleared();
    setTimeout(() => {
      if (this.state === 'playing') this.hud.waveBanner('NEXT WAVE', 'INCOMING IN 4');
    }, 2200);
  }

  aliveCount() {
    let n = 0;
    for (const e of this.enemies) if (e.alive) n++;
    return n;
  }

  onEnemyHit(enemy, dmg, crit) {
    // micro feedback only; scoring handled on kill
  }

  onEnemyKilled(enemy) {
    this.kills++;
    this.comboT = 3.6;
    const pts = Math.round(enemy.type.score * this.combo);
    this.combo = Math.min(6, this.combo + 1);
    this.score += pts;
    this.hud.setScore(this.score);
    this.hud.setCombo(this.combo);
    this.hud.killfeed(enemy.type.name, pts);
    if (this.combo >= 3) this.player.addShake(0.02);

    // drops
    const r = Math.random();
    const p = enemy.group.position.clone();
    p.y = 0;
    const pos = this.freeGroundPoint(p);
    if (r < 0.18 && this.player.health < this.player.maxHealth - 10) {
      this.pickups.push(new Pickup(this, 'health', pos));
    } else if (r < 0.5 && this.player.reserve < 260) {
      this.pickups.push(new Pickup(this, 'ammo', pos));
    }
  }

  freeGroundPoint(p) {
    const out = p.clone();
    for (let i = 0; i < 8; i++) {
      if (!this.arena.pointBlocked(out.x, out.z)) break;
      out.x += (Math.random() - 0.5) * 3;
      out.z += (Math.random() - 0.5) * 3;
    }
    this.arena.clampToArena(out);
    return out;
  }

  /* ------------------------------ bolts ------------------------------ */
  spawnEnemyBolt(origin, dir, color) {
    let mat = this.activeBoltMats.get(color);
    if (!mat) {
      mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.95 });
      this.activeBoltMats.set(color, mat);
    }
    const geom = this.boltGeo || (this.boltGeo = new THREE.SphereGeometry(0.135, 8, 8));
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.copy(origin);
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({
      color, map: this.getBoltGlow(), transparent: true, opacity: 0.85,
      blending: THREE.AdditiveBlending, depthWrite: false,
    }));
    halo.scale.setScalar(0.85);
    mesh.add(halo);
    this.scene.add(mesh);
    this.bolts.push({
      mesh, vel: dir.multiplyScalar(15.5), life: 4.2, color,
      origin: origin.clone(),
    });
  }

  getBoltGlow() {
    if (this.boltGlow) return this.boltGlow;
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const g = c.getContext('2d');
    const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, 'rgba(255,255,255,1)');
    grd.addColorStop(0.4, 'rgba(255,255,255,.5)');
    grd.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grd;
    g.fillRect(0, 0, 64, 64);
    this.boltGlow = new THREE.CanvasTexture(c);
    return this.boltGlow;
  }

  updateBolts(dt) {
    const body = new THREE.Vector3(this.player.position.x, this.player.position.y + 1.1, this.player.position.z);
    for (let i = this.bolts.length - 1; i >= 0; i--) {
      const b = this.bolts[i];
      b.life -= dt;
      b.mesh.position.addScaledVector(b.vel, dt);
      b.mesh.rotation.y += dt * 5;

      let dead = false;
      const p = b.mesh.position;
      if (b.life <= 0 || p.y < 0.1 || Math.abs(p.x) > 29.4 || Math.abs(p.z) > 29.4) dead = true;
      if (!dead) {
        for (const c of this.arena.colliders) {
          if (p.x > c.minX && p.x < c.maxX && p.z > c.minZ && p.z < c.maxZ && p.y < c.h) { dead = true; break; }
        }
      }
      if (!dead && this.player.alive && p.distanceTo(body) < 0.68) {
        this.player.damage(11, b.origin);
        this.effects.explosion(p.clone(), b.color, 0.7);
        dead = true;
      }
      if (dead) {
        if (b.life > 0) this.effects.sparkBurst(p.clone(), new THREE.Vector3(0, 1, 0), b.color, 7, 4);
        this.scene.remove(b.mesh);
        b.mesh.children.forEach((ch) => ch.material?.dispose?.());
        this.bolts.splice(i, 1);
      }
    }
  }

  /* ------------------------------ player ------------------------------ */
  onPlayerDeath() {
    if (this.state !== 'playing') return;
    this.state = 'over';
    this.deathT = 0;
    this.input.setEnabled(false);
    this.hud.setHealth(0, this.player.maxHealth);
    this.hud.setCrosshairEnemy(false);
    this.hud.setCombo(1);
    this.audio.over();
    this.player.addShake(0.5);
    this.effects.explosion(
      new THREE.Vector3(this.player.position.x, 1.2, this.player.position.z),
      0xff2f7e, 1.6
    );
    if (this.best < this.score) {
      this.best = this.score;
      localStorage.setItem(BEST_KEY, String(this.best));
    }
    if (document.pointerLockElement) document.exitPointerLock?.();
    setTimeout(() => {
      if (this.state !== 'over') return;
      document.getElementById('go-score').textContent = this.score.toLocaleString('en-US');
      document.getElementById('go-wave').textContent = String(this.wave);
      document.getElementById('go-kills').textContent = String(this.kills);
      document.getElementById('go-best').textContent = this.best.toLocaleString('en-US');
      this.overScreen.classList.remove('hidden');
      this.refreshBest();
    }, 950);
  }

  /* ---------------------------- pause/menu ---------------------------- */
  pause() {
    if (this.state !== 'playing') return;
    this.state = 'paused';
    this.input.setEnabled(false);
    if (document.pointerLockElement) document.exitPointerLock?.();
    document.getElementById('pause-wave').textContent = String(this.wave);
    document.getElementById('pause-score').textContent = this.score.toLocaleString('en-US');
    document.getElementById('pause-kills').textContent = String(this.kills);
    this.pauseScreen.classList.remove('hidden');
    this.audio.ui();
  }

  resume() {
    if (this.state !== 'paused') return;
    this.pauseScreen.classList.add('hidden');
    this.state = 'playing';
    this.input.setEnabled(true);
    this.input.clearPressed();
    this.audio.init();
    this.audio.ui();
    if (!isTouch && this.renderer.domElement.requestPointerLock) {
      try { this.renderer.domElement.requestPointerLock(); } catch { /* noop */ }
    }
  }

  toMenu() {
    this.state = 'menu';
    this.clearEntities();
    this.input.setEnabled(false);
    this.hud.hide();
    this.player.gun.visible = false;
    this.pauseScreen.classList.add('hidden');
    this.overScreen.classList.add('hidden');
    this.startScreen.classList.remove('hidden');
    this.hud.rotateHint.classList.add('hidden');
    this.hud.setReload(-1);
    this.wave = 1;
    this.score = 0;
    this.kills = 0;
    this.player.reset();
    this.refreshBest();
    if (document.pointerLockElement) document.exitPointerLock?.();
  }

  clearEntities() {
    for (const e of this.enemies) {
      if (e.alive) {
        this.scene.remove(e.group);
        e.group.traverse((o) => {
          if (o.geometry && o.geometry !== Enemy.sharedBarBg && o.geometry !== Enemy.sharedBarFill) o.geometry.dispose?.();
          o.material?.dispose?.();
        });
      }
      e.alive = false;
    }
    this.enemies.length = 0;
    for (const p of this.pickups) if (p.alive) p.destroy();
    this.pickups.length = 0;
    for (const b of this.bolts) {
      this.scene.remove(b.mesh);
      b.mesh.children.forEach((ch) => ch.material?.dispose?.());
    }
    this.bolts.length = 0;
    this.pending.length = 0;
    this.spawnQueue = [];
  }

  /* ------------------------------- loop ------------------------------- */
  loop() {
    const dt = Math.min(0.05, this.clock.getDelta());
    const t = this.clock.elapsedTime;

    if (this.state === 'playing') {
      this.updateWaves(dt);
      this.player.update(dt, this.input);
      for (let i = this.enemies.length - 1; i >= 0; i--) {
        const e = this.enemies[i];
        if (e.alive) e.update(dt, t);
        else this.enemies.splice(i, 1);
      }
      this.updateBolts(dt);
      for (let i = this.pickups.length - 1; i >= 0; i--) {
        const r = this.pickups[i].update(dt, this.player);
        if (r) this.pickups.splice(i, 1);
      }
      this.arena.update(dt, t);
      this.effects.update(dt);
      this.hud.update(dt);

      // combo decay
      if (this.comboT > 0) {
        this.comboT -= dt;
        if (this.comboT <= 0) { this.combo = 1; this.hud.setCombo(1); }
      }

      // crosshair target check
      this.aimCheck -= dt;
      if (this.aimCheck <= 0) {
        this.aimCheck = 0.1;
        this.hud.setCrosshairEnemy(!!this.player.aimTarget());
      }

      if (this.input.consumePressed('pause')) this.pause();
      if (this.input.consumePressed('mute')) this.toggleSound();
    } else if (this.state === 'over') {
      this.deathT += dt;
      this.player.updateViewModel(dt, this.input);
      this.arena.update(dt, t);
      this.effects.update(dt);
      for (const e of this.enemies) if (e.alive) e.update(dt, t);
      this.updateBolts(dt);
      for (let i = this.pickups.length - 1; i >= 0; i--) {
        if (this.pickups[i].update(dt, this.player)) this.pickups.splice(i, 1);
      }
      this.hud.update(dt);

      // death cam
      const k = Math.min(1, this.deathT / 0.9);
      this.camera.position.y = THREE.MathUtils.lerp(this.player.eyeY, 0.55, k);
      this.camera.rotation.z = k * 0.55;
      this.camera.rotation.x = this.player.pitch - k * 0.35;
    } else if (this.state === 'menu') {
      // slow idle orbit for the menu backdrop
      this.arena.update(dt, t);
      this.effects.update(dt);
      this.camera.position.set(Math.sin(t * 0.09) * 8, 5.2 + Math.sin(t * 0.5) * 0.15, 18 + Math.cos(t * 0.09) * 5);
      this.camera.lookAt(0, 2.2, 0);
    } else if (this.state === 'paused') {
      this.hud.update(0);
    }

    this.renderer.render(this.scene, this.camera);
  }
}

export { isTouch };
