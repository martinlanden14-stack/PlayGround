// Game orchestration: state machine, waves, scoring, camera modes.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { World } from './world.js';
import { Player } from './player.js';
import { Weapon } from './weapon.js';
import { EnemyManager } from './enemies.js';
import { FX } from './fx.js';
import { Input } from './input.js';
import { UI } from './ui.js';
import { AudioEngine } from './audio.js';
import { clamp, lerp } from './utils.js';

const COMBO_WINDOW = 3.8;
const MAX_ALIVE = 8;

export class Game {
  constructor() {
    this.state = 'menu';
    this.time = 0;
    this.menuAngle = 0.6;
    this.isTouch =
      new URLSearchParams(location.search).get('touch') === '1' ||
      (new URLSearchParams(location.search).get('touch') !== '0' &&
        (('ontouchstart' in window) || navigator.maxTouchPoints > 0));

    this.score = 0;
    this.kills = 0;
    this.wave = 0;
    this.bestCombo = 1;
    this.combo = 1;
    this.comboTimer = 0;
    this.waveActive = false;
    this.intermission = 1.1;
    this.spawnQueue = [];
    this.spawnTimer = 0;
    this.deathTimer = 0;
    this.dt = 0;

    const canvas = document.getElementById('scene');
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !this.isTouch,
      powerPreference: 'high-performance',
      alpha: false,
      stencil: false,
    });
    this.pixelRatio = Math.min(window.devicePixelRatio || 1, this.isTouch ? 1.7 : 2);
    this.renderer.setPixelRatio(this.pixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.renderer.autoClear = true;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x050810);

    this.camera = new THREE.PerspectiveCamera(
      78,
      window.innerWidth / window.innerHeight,
      0.06,
      420
    );
    this.camera.position.set(0, 13, 28);
    this.camera.lookAt(0, 2, 0);

    const pmrem = new THREE.PMREMGenerator(this.renderer);
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
    this.scene.environment = envRT.texture;
    this.scene.environmentIntensity = 0.35;
    pmrem.dispose();

    this.audio = new AudioEngine();
    this.world = new World(this.scene, this.renderer);
    this.fx = new FX(this.scene, this.camera);
    this.fx.setPixelRatio(this.pixelRatio);
    this.player = new Player(this);
    this.weapon = new Weapon(this);
    this.weapon.weaponScene.environment = this.scene.environment;
    this.weapon.weaponScene.environmentIntensity = 0.5;
    this.enemies = new EnemyManager(this);
    this.ui = new UI(this);
    this.input = new Input(this);

    this.ui.setHudVisible(false);
    this.ui.setScreen('menu');
    this.weapon.resize(window.innerWidth / window.innerHeight);
    this.fx.setPixelRatio(this.renderer.getPixelRatio());

    this._onResize = () => this.resize();
    window.addEventListener('resize', this._onResize);
    window.addEventListener('orientationchange', () => setTimeout(this._onResize, 120));
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.state === 'playing') this.togglePause(true);
    });

    this.clock = new THREE.Clock();
    this._loop = this._loop.bind(this);
    requestAnimationFrame(this._loop);

    // test / remix hooks
    window.__sector7 = this;
  }

  // ------------------------------------------------------------ states
  isPlaying() {
    return this.state === 'playing';
  }

  start() {
    this.audio.init();
    this.audio.resume();
    this.audio.startMusic();
    this.audio.setPaused(false);
    this.resetRun();
    this.state = 'playing';
    this.ui.setScreen(null);
    this.ui.setHudVisible(true);
    this.ui.setLocked(false);
    this.ui.maybeRotateHint();
    this.input.reset();
    if (!this.input.isTouch) this.input.requestLock();
    this.clock.getDelta();
  }

  resetRun() {
    this.score = 0;
    this.kills = 0;
    this.wave = 0;
    this.combo = 1;
    this.comboTimer = 0;
    this.bestCombo = 1;
    this.waveActive = false;
    this.intermission = 1.2;
    this.spawnQueue = [];
    this.spawnTimer = 0;
    this.deathTimer = 0;
    this.enemies.reset();
    this.fx.reset();
    this.player.reset();
    this.weapon.reset();
    this.ui.setHealth(100);
    this.ui.setScore(0);
    this.ui.setKills(0);
    this.ui.setCombo(1, 0);
    this.ui.setWave(1, 0);
    this.ui.hideBoss();
    this.ui.setReloading(false);
    this.ui.toastStack.innerHTML = '';
  }

  onPlayerDeath() {
    if (this.state !== 'playing') return;
    this.state = 'dying';
    this.deathTimer = 0;
    this.audio.playerDeath();
    this.audio.setPaused(true);
    this.input.reset();
    this.input.releaseLock();
    this.ui.hideBoss();
    this.ui.setLocked(false);
    this.addShake(1.2);
    const newBest = this.ui.saveBest(this.score, this.wave);
    this._newBest = newBest;
    if (navigator.vibrate) navigator.vibrate([80, 50, 120]);
  }

  showGameOver() {
    this.state = 'over';
    this.ui.setScreen('over');
    this.ui.setHudVisible(false);
    this.ui.showGameOver(
      {
        score: this.score,
        wave: this.wave,
        kills: this.kills,
        bestCombo: this.bestCombo,
      },
      this._newBest
    );
  }

  toMenu() {
    this.state = 'menu';
    this.input.releaseLock();
    this.input.reset();
    this.enemies.reset();
    this.fx.reset();
    this.audio.setPaused(false);
    this.ui.hideBoss();
    this.ui.setScreen('menu');
    this.ui.setHudVisible(false);
    this.ui.setLocked(false);
    this.weapon.muzzleSprite.material.opacity = 0;
    this.ui.saveBest(this.score, this.wave);
    this.player.reset();
    this.camera.fov = 78;
    this.camera.updateProjectionMatrix();
  }

  togglePause(force = null) {
    if (force === true || (force === null && this.state === 'playing')) {
      if (this.state !== 'playing') return;
      this.state = 'paused';
      this.input.reset();
      this.input.releaseLock();
      this.audio.setPaused(true);
      this.ui.setScreen('pause');
      this.ui.setHudVisible(true);
      this.ui.showPause(true, { wave: this.wave, score: this.score });
    } else if (this.state === 'paused') {
      this.state = 'playing';
      this.ui.setScreen(null);
      this.ui.setHudVisible(true);
      this.audio.setPaused(false);
      this.input.reset();
      this.clock.getDelta();
      if (!this.input.isTouch) this.input.requestLock();
    }
  }

  toggleMute() {
    const muted = this.audio.toggle();
    this.ui.updateMuteButtons();
    if (!muted) {
      this.audio.init();
      this.audio.resume();
      this.audio.startMusic();
      this.audio.setPaused(this.state !== 'playing');
    }
    return muted;
  }

  // ------------------------------------------------------------ waves
  updateWaves(dt) {
    if (!this.waveActive) {
      this.intermission -= dt;
      if (this.intermission <= 0) this.beginWave(this.wave + 1);
      return;
    }

    const remaining = this.spawnQueue.length + this.enemies.activeCount();
    this.ui.setWave(this.wave, remaining);

    if (this.spawnQueue.length > 0) {
      this.spawnTimer -= dt;
      if (this.spawnTimer <= 0 && this.enemies.activeCount() < MAX_ALIVE) {
        const type = this.spawnQueue.shift();
        this.enemies.spawn(type, this.wave);
        this.spawnTimer = this.spawnInterval;
      }
    }

    if (this.spawnQueue.length === 0 && this.enemies.list.length === 0) {
      this.completeWave();
    }
  }

  beginWave(n) {
    this.wave = n;
    this.waveActive = true;
    this.spawnTimer = 0.7;
    this.spawnQueue = [];
    const isBoss = n % 5 === 0;

    let drones = Math.min(12, 4 + Math.floor(n * 1.2));
    let stalkers = n >= 2 ? Math.min(8, Math.floor(n * 0.8)) : 0;
    if (isBoss) {
      drones = Math.min(6, 3 + Math.floor(n / 5));
      stalkers = Math.min(4, 2 + Math.floor(n / 10));
      this.spawnQueue.push('warden');
    }
    for (let i = 0; i < drones; i++) this.spawnQueue.push('drone');
    for (let i = 0; i < stalkers; i++) this.spawnQueue.push('stalker');

    // shuffle everything after the boss
    for (let i = isBoss ? 1 : 0; i < this.spawnQueue.length; i++) {
      const j = i + Math.floor(Math.random() * (this.spawnQueue.length - i));
      [this.spawnQueue[i], this.spawnQueue[j]] = [this.spawnQueue[j], this.spawnQueue[i]];
    }

    this.spawnInterval = Math.max(0.55, 1.05 - n * 0.03);
    this.audio.waveStart(isBoss ? 1 : 0);
    this.ui.setWave(n, this.spawnQueue.length);
    this.ui.banner(
      isBoss ? 'WARDEN SIGNATURE DETECTED' : 'THREAT DETECTED',
      `WAVE ${n}`,
      isBoss ? 'Break the Warden. Survive the escorts.' : this._waveTagline(n),
      3200
    );
    if (isBoss) this.addShake(0.4);
    this.ui.toast(isBoss ? 'BOSS INBOUND' : `WAVE ${n} // ${this.spawnQueue.length} HOSTILES`, isBoss ? 'warn' : '');
  }

  _waveTagline(n) {
    if (n === 1) return 'Hold the platform. Chain your kills.';
    if (n === 2) return 'Stalkers are on the floor. Keep moving.';
    if (n === 3) return 'They are learning your position.';
    if (n === 4) return 'Heavy contact. Use the cover.';
    return 'No reinforcements. Make every shot count.';
  }

  completeWave() {
    this.waveActive = false;
    this.intermission = 4.2;
    this.player.heal(22);
    const bonus = 200 * this.wave;
    this.score += bonus;
    this.ui.setScore(this.score);
    this.audio.waveClear();
    this.ui.banner('SECTOR CLEAR', `WAVE ${this.wave} CLEARED`, 'INTEGRITY RESTORED  ·  REARMING', 3000);
    this.ui.toast(`WAVE BONUS +${bonus}`, 'gold');
    this.ui.hideBoss();
  }

  // ------------------------------------------------------------ scoring
  onEnemyKilled(enemy) {
    this.kills += 1;
    if (this.comboTimer > 0) this.combo = Math.min(5, this.combo + 1);
    else this.combo = 1;
    this.comboTimer = COMBO_WINDOW;
    this.bestCombo = Math.max(this.bestCombo, this.combo);

    const points = enemy.scoreValue * this.combo;
    this.score += points;
    this.ui.setScore(this.score);
    this.ui.setKills(this.kills);
    this.ui.setCombo(this.combo, 1);
    this.ui.scorePop(`+${points}`, true);

    if (this.combo > 1) {
      this.ui.toast(`CHAIN x${this.combo}  +${points}`, 'gold');
    }

    if (enemy.type === 'warden') {
      this.ui.banner('TARGET DESTROYED', 'WARDEN DOWN', `+${points}`, 2600);
      this.addShake(0.9);
    }
  }

  addShake(amount) {
    if (this.state === 'playing' || this.state === 'dying') {
      this.player.addShake(amount);
    }
  }

  cameraShake(amount) {
    this.addShake(amount);
  }

  // ------------------------------------------------------------ loop
  _loop() {
    requestAnimationFrame(this._loop);
    const raw = this.clock.getDelta();
    const dt = Math.min(raw, 0.05);
    this.dt = dt;
    this.time += dt;

    if (this.state === 'playing') {
      if (this.ui.isRotateHintVisible()) {
        // hold the simulation while the portrait prompt is up
        this._render();
        return;
      }
      this._updatePlaying(dt);
    } else if (this.state === 'paused') {
      this._render();
    } else if (this.state === 'dying') {
      this._updateDying(dt);
    } else {
      this._updateMenu(dt);
    }
  }

  _updatePlaying(dt) {
    this.input.update();
    const look = this.input.consumeLook();
    if (look.x || look.y) this.player.look(look.x, look.y);

    this.player.update(dt, this.input);
    if (this.player.dead) return;
    this.weapon.update(dt, this.input, look);
    this.enemies.update(dt, this.time);
    this.fx.update(dt, this.time);
    this.world.update(dt, this.time);
    this.updateWaves(dt);

    if (this.comboTimer > 0) {
      this.comboTimer -= dt;
      if (this.comboTimer <= 0) {
        this.combo = 1;
        this.ui.setCombo(1, 0);
      } else {
        this.ui.setCombo(this.combo, this.comboTimer / COMBO_WINDOW);
      }
    }

    this._render();
  }

  _updateDying(dt) {
    this.deathTimer += dt;
    const p = this.player;
    const k = Math.min(1, this.deathTimer / 1.15);
    const ease = 1 - Math.pow(1 - k, 3);
    this.camera.position.set(
      p.pos.x,
      lerp(p.pos.y + 1.62, p.pos.y + 0.35, ease),
      p.pos.z
    );
    this.camera.rotation.set(p.pitch - 0.45 * ease, p.yaw, 0.55 * ease);
    this.fx.update(dt, this.time);
    this.world.update(dt, this.time);
    this._render(true);
    if (this.deathTimer > 1.55) this.showGameOver();
  }

  _updateMenu(dt) {
    this.menuAngle += dt * 0.055;
    const r = 27;
    const y = 12.5 + Math.sin(this.menuAngle * 1.4) * 1.4;
    this.camera.position.set(Math.cos(this.menuAngle) * r, y, Math.sin(this.menuAngle) * r);
    this.camera.lookAt(0, 1.6, 0);
    this.world.update(dt, this.time);
    this.fx.update(dt, this.time);
    this._render(false);
    if (this.state === 'menu' && Math.random() < dt * 0.4) {
      // idle sparkle on the platform
      this.fx.burst(new THREE.Vector3(0, 3, 0), {
        count: 2,
        speed: 1.2,
        size: 0.09,
        life: 1.2,
        color: 0xff2d78,
        color2: 0x48f5ff,
        gravity: -0.6,
      });
    }
  }

  _render(weaponVisible = this.state === 'playing' || this.state === 'paused') {
    this.renderer.render(this.scene, this.camera);
    if (weaponVisible) {
      this.renderer.autoClear = false;
      this.weapon.render();
      this.renderer.autoClear = true;
    }
  }

  resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.input?.isTouch ? 1.7 : 2));
    this.renderer.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.weapon.resize(w / h);
    this.fx.setPixelRatio(this.renderer.getPixelRatio());
    this.ui.maybeRotateHint();
  }

  // ------------------------------------------------------------ debug helpers
  debugSpawn(type = 'drone') {
    return this.enemies.spawn(type, this.wave || 1);
  }

  debugKillAll() {
    for (const e of [...this.enemies.list]) {
      if (e.alive) e.damage(99999, e.pos, new THREE.Vector3(0, 1, 0));
    }
  }

  debugSetHealth(v) {
    this.player.health = clamp(v, 0, 100);
    this.ui.setHealth(this.player.health);
  }
}
