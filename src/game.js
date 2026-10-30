import * as THREE from 'three';
import { buildWorld } from './world.js';
import { Effects } from './effects.js';
import { EnemyManager } from './enemies.js';
import { Input } from './input.js';
import { UI } from './ui.js';
import { AudioSys } from './audio.js';
import { glowTexture, targetTexture } from './textures.js';

const EYE_HEIGHT = 1.62;
const MAG_SIZE = 24;
const FIRE_INTERVAL = 0.112;
const MAX_HP = 100;

const GUN_BASE = { x: 0.29, y: -0.255, z: -0.47 };

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.state = 'menu';
    this.time = 0;
    this.clock = new THREE.Clock();
    this.radarTick = 0;
    this.wasHot = false;
    this.lastSpread = -1;
    this.lastHealthShown = -1;

    this.best = Number(localStorage.getItem('nb_best') || 0);
    this.autoFire = localStorage.getItem('nb_auto') !== '0';

    this.playerPos = new THREE.Vector3(0, 0, 14);
    this.playerVel = new THREE.Vector3();
    this.yaw = 0;
    this.pitch = 0;

    this.health = MAX_HP;
    this.ammo = MAG_SIZE;
    this.reloading = false;
    this.reloadElapsed = 0;
    this.fireCooldown = 0;
    this.recoil = 0;
    this.shake = 0;
    this.shotCount = 0;
    this.bobPhase = 0;
    this.gunKick = 0;
    this.gunSwayX = 0;
    this.gunSwayY = 0;
    this.roll = 0;

    this.score = 0;
    this.kills = 0;
    this.wave = 1;
    this.comboChain = 0;
    this.comboTimer = 0;
    this.comboMult = 1;

    this.wavePhase = 'idle';
    this.waveTimer = 0;
    this.spawnQueue = [];
    this.spawnTimer = 0;
    this.sinceDamage = 0;
    this.invuln = 0;
    this.dashTimer = 0;
    this.dashCooldown = 0;
    this.dashParticle = 0;
    this.deathTimer = 0;
    this.muzzleTimer = 0;
    this.autoTarget = null;
    this.pickups = [];

    this._initThree();
    this._initGameplay();
    this._bindEvents();
    this._loop();
  }

  _initThree() {
    const renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance',
      stencil: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = false;
    this.renderer = renderer;
    this.pixelRatio = renderer.getPixelRatio();
    this.frameTime = 16;
    this.frameCount = 0;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(72, window.innerWidth / window.innerHeight, 0.05, 240);
    this.camera.rotation.order = 'YXZ';
    this.scene.add(this.camera);

    this.world = buildWorld(this.scene);
    this.effects = new Effects(this.scene);
    this.scene.updateMatrixWorld(true);
    this._buildGun();
    this._buildLockOn();
  }

  _buildLockOn() {
    const mat = new THREE.SpriteMaterial({
      map: targetTexture(),
      color: 0xffffff,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
      toneMapped: false,
    });
    this.lockOn = new THREE.Sprite(mat);
    this.lockOn.visible = false;
    this.lockOn.renderOrder = 5;
    this.scene.add(this.lockOn);
  }

  _initGameplay() {
    this.enemies = new EnemyManager(this.scene, this.effects, {
      onKill: (enemy, pos) => this._onEnemyKilled(enemy, pos),
      onPlayerHit: (dmg, pos) => this._hurt(dmg, pos),
      onShoot: () => this.audio.play('enemyShoot'),
      onDetonate: () => {},
      obstacles: this.world.obstacles,
    });
    this.audio = new AudioSys();

    this.ui = new UI({
      onStart: () => this.startRun(),
      onResume: () => this.resume(),
      onRestart: () => this.startRun(),
      onPause: () => this.togglePause(),
      onToggleAuto: () => this.toggleAuto(),
      onToggleAudio: () => this.toggleAudio(),
      onReload: () => { if (this.state === 'playing') this.startReload(); },
      onDash: () => { if (this.state === 'playing') this.tryDash(); },
    });

    this.input = new Input({
      lookZone: document.getElementById('look-zone'),
      stickZone: document.getElementById('stick-zone'),
      stickKnob: document.getElementById('stick-knob'),
      fireBtn: document.getElementById('btn-fire'),
      onPause: () => this.togglePause(),
    });

    this.ui.setAuto(this.autoFire);
    this.ui.setMuted(this.audio.muted);
    this.ui.setBest(this.best);
    this.ui.setHealth(MAX_HP);
    this.ui.setAmmo(this.ammo, MAG_SIZE);
    this.ui.setDashReady(true);
    this.ui.showMenu();

    window.addEventListener('pointerdown', () => this.audio.unlock(), { once: true });
  }

  _bindEvents() {
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('orientationchange', () => setTimeout(() => this.resize(), 220));
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.state === 'paused') this.resume();
      if (e.key === 'Enter' && this.state === 'menu') { e.preventDefault(); this.startRun(); }
    });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.state === 'playing') this.pause();
    });
  }

  resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.camera.aspect = w / h;
    if (this.dashTimer <= 0) this.camera.fov = this._baseFov();
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
  }

  _baseFov() {
    return this.camera.aspect < 0.85 ? 82 : 72;
  }

  /* ------------------------------------------------------------------ */
  /*  weapon view model                                                  */
  /* ------------------------------------------------------------------ */

  _buildGun() {
    const gun = new THREE.Group();
    const dark = new THREE.MeshStandardMaterial({ color: 0x1b2940, metalness: 0.82, roughness: 0.3 });
    const mid = new THREE.MeshStandardMaterial({ color: 0x31445f, metalness: 0.72, roughness: 0.38 });
    const cyan = new THREE.MeshBasicMaterial({ color: 0x8ff9ff, toneMapped: false });
    const hot = new THREE.MeshBasicMaterial({ color: 0xff2d9b, toneMapped: false });

    const add = (geo, mat, x, y, z, rx = 0, ry = 0, rz = 0) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      m.rotation.set(rx, ry, rz);
      gun.add(m);
      return m;
    };

    add(new THREE.BoxGeometry(0.15, 0.15, 0.6), dark, 0, 0, -0.06);
    add(new THREE.BoxGeometry(0.12, 0.065, 0.44), mid, 0, 0.105, -0.12);
    add(new THREE.BoxGeometry(0.1, 0.1, 0.28), mid, 0, 0.02, -0.42);
    add(new THREE.CylinderGeometry(0.032, 0.036, 0.46, 10), dark, 0, 0.025, -0.58, Math.PI / 2, 0, 0);
    add(new THREE.BoxGeometry(0.085, 0.085, 0.12), dark, 0, 0.025, -0.79);
    add(new THREE.BoxGeometry(0.055, 0.06, 0.035), cyan, 0, 0.025, -0.855);
    add(new THREE.BoxGeometry(0.105, 0.22, 0.17), dark, 0, -0.17, 0.02, -0.2, 0, 0);
    add(new THREE.BoxGeometry(0.09, 0.19, 0.12), mid, 0, -0.18, 0.21, -0.38, 0, 0);
    add(new THREE.BoxGeometry(0.06, 0.055, 0.16), mid, 0, 0.165, -0.1);
    add(new THREE.BoxGeometry(0.012, 0.028, 0.3), cyan, 0.078, 0.02, -0.16);
    add(new THREE.BoxGeometry(0.012, 0.028, 0.3), cyan, -0.078, 0.02, -0.16);
    add(new THREE.BoxGeometry(0.03, 0.012, 0.16), hot, 0, -0.095, -0.18);
    add(new THREE.SphereGeometry(0.016, 8, 6), hot, 0, 0.205, -0.13);

    gun.position.set(GUN_BASE.x, GUN_BASE.y, GUN_BASE.z);
    gun.rotation.set(0.015, -0.04, 0.012);
    gun.scale.setScalar(0.86);
    gun.visible = false;
    this.camera.add(gun);
    this.gun = gun;

    this.muzzle = new THREE.Object3D();
    this.muzzle.position.set(0, 0.025, -0.87);
    gun.add(this.muzzle);

    const flashMat = new THREE.SpriteMaterial({
      map: glowTexture(),
      color: 0x8ff9ff,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
    });
    this.muzzleFlash = new THREE.Sprite(flashMat);
    this.muzzleFlash.scale.setScalar(0.75);
    this.muzzleFlash.position.copy(this.muzzle.position);
    this.muzzleFlash.visible = false;
    gun.add(this.muzzleFlash);

    this.muzzleLight = new THREE.PointLight(0x8ff9ff, 0, 9, 2);
    this.muzzleLight.position.copy(this.muzzle.position);
    gun.add(this.muzzleLight);
  }

  /* ------------------------------------------------------------------ */
  /*  run lifecycle                                                      */
  /* ------------------------------------------------------------------ */

  startRun() {
    this.audio.unlock();
    this.audio.startAmbient();

    this.enemies.clear();
    for (const p of this.pickups) this._disposePickup(p);
    this.pickups.length = 0;

    this.playerPos.set(0, 0, 14);
    this.playerVel.set(0, 0, 0);
    this.yaw = 0;
    this.pitch = 0;
    this.roll = 0;
    this.health = MAX_HP;
    this.ammo = MAG_SIZE;
    this.reloading = false;
    this.reloadElapsed = 0;
    this.fireCooldown = 0;
    this.recoil = 0;
    this.shake = 0;
    this.bobPhase = 0;
    this.score = 0;
    this.kills = 0;
    this.comboChain = 0;
    this.comboTimer = 0;
    this.comboMult = 1;
    this.sinceDamage = 0;
    this.invuln = 0;
    this.dashTimer = 0;
    this.dashCooldown = 0;
    this.deathTimer = 0;
    this.wave = 0;
    this.pickups = [];
    this.lastHealthShown = -1;
    this._overShown = false;

    this.camera.fov = this._baseFov();
    this.camera.updateProjectionMatrix();
    this.gun.visible = true;
    this.lockOn.visible = false;
    this.gun.rotation.set(0.015, -0.04, 0.012);
    this.gun.position.set(GUN_BASE.x, GUN_BASE.y, GUN_BASE.z);

    this.state = 'playing';
    this.input.enabled = true;
    this.input.reset();
    this.ui.hideScreens();
    this.ui.showHud(true);
    this.ui.setHealth(this.health);
    this.ui.setAmmo(this.ammo, MAG_SIZE);
    this.ui.setScore(0);
    this.ui.setBest(this.best);
    this.ui.setCombo(1, 0);
    this.ui.setDashReady(true);
    this.ui.setBoss(null);
    this.ui.hideBanner();
    this.ui.setAuto(this.autoFire);
    this.ui.setMuted(this.audio.muted);
    this.lastHealthShown = this.health;

    this.startWave(1);
  }

  pause() {
    if (this.state !== 'playing') return;
    this.state = 'paused';
    this.input.enabled = false;
    this.input.reset();
    this.input.releaseLock();
    this.ui.showPause({ wave: this.wave, score: this.score, kills: this.kills });
  }

  resume() {
    if (this.state !== 'paused') return;
    this.audio.unlock();
    this.state = 'playing';
    this.input.enabled = true;
    this.ui.hidePause();
    this.input.reset();
  }

  togglePause() {
    if (this.state === 'playing') this.pause();
    else if (this.state === 'paused') this.resume();
  }

  toggleAudio() {
    this.audio.unlock();
    this.audio.setMuted(!this.audio.muted);
    this.ui.setMuted(this.audio.muted);
  }

  toggleAuto() {
    this.autoFire = !this.autoFire;
    localStorage.setItem('nb_auto', this.autoFire ? '1' : '0');
    this.ui.setAuto(this.autoFire);
  }

  _die() {
    this.state = 'dead';
    this.health = 0;
    this.deathTimer = 0;
    this.input.enabled = false;
    this.input.reset();
    this.input.releaseLock();
    this.audio.stopAmbient();
    this.audio.play('bossKill');
    this.lockOn.visible = false;
    this.ui.setHealth(0);
    this.ui.showHud(false);
    this.ui.setBoss(null);
    this.effects.flash(new THREE.Vector3(this.playerPos.x, 1.3, this.playerPos.z), 0xff2d5b, 6, 0.5);
    this.effects.spawnBurst(new THREE.Vector3(this.playerPos.x, 1.2, this.playerPos.z), 0xff2d5b, 40, 7);
    try { navigator.vibrate?.([60, 40, 120]); } catch { /* noop */ }

    if (this.score > this.best) {
      this.best = this.score;
      localStorage.setItem('nb_best', String(this.best));
    }
    this.ui.setBest(this.best);
  }

  /* ------------------------------------------------------------------ */
  /*  waves                                                              */
  /* ------------------------------------------------------------------ */

  startWave(n) {
    this.wave = n;
    this.ui.setWave(n);
    const boss = n % 5 === 0;
    const queue = this._buildQueue(n);
    this.spawnQueue = queue;
    this.wavePhase = 'intro';
    this.waveTimer = boss ? 2.4 : 1.2;
    this.spawnTimer = 0;
    this.health = Math.min(MAX_HP, this.health + 16);
    this.ammo = MAG_SIZE;
    this.reloading = false;
    this.ui.setHealth(this.health);
    this.ui.setAmmo(this.ammo, MAG_SIZE);
    this.ui.setReloading(false, 0);
    this.ui.setHostiles(queue.length + this.enemies.alive);
    this.ui.showBanner(`WAVE ${n}`, boss ? 'WARDEN SIGNATURE DETECTED' : 'INCOMING', boss ? 2.8 : 2.2, boss);
    if (boss) this.audio.play('boss');
    else this.audio.play('wave');
  }

  _buildQueue(n) {
    const boss = n % 5 === 0;
    let count = boss ? Math.min(6, 3 + Math.floor(n / 5)) : Math.min(16, 3 + Math.round(n * 1.15));
    const queue = [];
    if (boss) queue.push('warden');
    if (n >= 4 && !boss) queue.push('titan');
    for (let i = 0; i < count; i++) {
      const r = Math.random();
      if (n >= 4 && r > 0.87) queue.push('titan');
      else if (n >= 2 && r > 0.58) queue.push('seeker');
      else queue.push('drone');
    }
    return queue;
  }

  _pickSpawnPoint(minDist = 9) {
    for (let i = 0; i < 40; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 18 + Math.random() * 7;
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      if (Math.hypot(x - this.playerPos.x, z - this.playerPos.z) < minDist) continue;
      let blocked = false;
      for (const o of this.world.obstacles) {
        if (Math.hypot(x - o.x, z - o.z) < o.r + 1.6) { blocked = true; break; }
      }
      if (!blocked) return new THREE.Vector3(x, 0, z);
    }
    return new THREE.Vector3(0, 0, -20);
  }

  _spawnNext() {
    const type = this.spawnQueue.shift();
    if (!type) return;
    const p = this._pickSpawnPoint(type === 'warden' ? 11 : 9);
    const e = this.enemies.spawn(type, this.wave, p.x, p.z);
    const pos = new THREE.Vector3(p.x, type === 'warden' ? 3.1 : 1.6, p.z);
    this.effects.ring(p, e.cfg.color, type === 'warden' ? 8 : 4, 0.7);
    this.effects.flash(pos, e.cfg.color, type === 'warden' ? 6 : 3, 0.3);
    if (type === 'warden') {
      this.ui.showBanner('WARDEN', 'DESTROY THE CORE', 2.2, true);
      this.shake = Math.max(this.shake, 0.45);
      try { navigator.vibrate?.(30); } catch { /* noop */ }
    }
  }

  _updateWave(dt) {
    if (this.wavePhase === 'intro') {
      this.waveTimer -= dt;
      if (this.waveTimer <= 0) {
        this.wavePhase = 'active';
        this.spawnTimer = 0.18;
      }
    } else if (this.wavePhase === 'active') {
      this.spawnTimer -= dt;
      const maxAlive = this.wave % 5 === 0 ? 6 : 7;
      if (this.spawnQueue.length && this.enemies.alive < maxAlive && this.spawnTimer <= 0) {
        this._spawnNext();
        this.spawnTimer = Math.max(0.4, 0.92 - this.wave * 0.025);
      }
      if (!this.spawnQueue.length && this.enemies.alive === 0) {
        this.wavePhase = 'clear';
        this.waveTimer = 2.6;
        const bonus = 200 * this.wave;
        this.score += bonus;
        this.ui.setScore(this.score);
        this.ui.showBanner('SECTOR CLEAR', `+${bonus} BONUS`, 2.2);
        this.audio.play('wave');
        this.health = Math.min(MAX_HP, this.health + 14);
        this.ui.setHealth(this.health);
      }
    } else if (this.wavePhase === 'clear') {
      this.waveTimer -= dt;
      if (this.waveTimer <= 0) this.startWave(this.wave + 1);
    }
    const boss = this.enemies.enemies.find((e) => e.cfg.boss);
    if (boss) this.ui.setBoss({ name: boss.cfg.name, hp: boss.hp, max: boss.maxHp });
    else this.ui.setBoss(null);
  }

  /* ------------------------------------------------------------------ */
  /*  combat                                                             */
  /* ------------------------------------------------------------------ */

  get forward() {
    const cp = Math.cos(this.pitch);
    return new THREE.Vector3(-Math.sin(this.yaw) * cp, Math.sin(this.pitch), -Math.cos(this.yaw) * cp);
  }

  _updateShooting(dt) {
    if (this.ammo <= 0 && !this.reloading) this.startReload();
    this.fireCooldown -= dt;
    const origin = this.camera.position;
    const forward = this.forward;
    const target = this.enemies.findAimTarget(origin, forward, 0.155, this.world.blockers);
    this.autoTarget = target;

    if (target) {
      const dist = this.camera.position.distanceTo(target.group.position);
      this.lockOn.visible = true;
      this.lockOn.position.copy(target.group.position);
      this.lockOn.scale.setScalar(Math.max(1.4, dist * 0.145));
      this.lockOn.material.opacity = 0.72 + Math.sin(this.time * 9) * 0.2;
    } else {
      this.lockOn.visible = false;
    }

    const spread = Math.min(9, Math.hypot(this.playerVel.x, this.playerVel.z) * 0.45 + (this.fireCooldown > 0 ? 3.5 : 0));
    const hot = !!target;
    if (hot !== this.wasHot || Math.abs(spread - this.lastSpread) > 0.4) {
      this.ui.crosshairHot(hot, spread);
      this.wasHot = hot;
      this.lastSpread = spread;
    }

    if (this.reloading) return;
    const wantFire = this.input.firingNow || (this.autoFire && hot);
    if (!wantFire || this.fireCooldown > 0) return;
    if (this.ammo <= 0) {
      this.startReload();
      return;
    }
    this._fireShot(target);
  }

  _fireShot(target) {
    this.ammo--;
    this.fireCooldown = FIRE_INTERVAL;
    this.shotCount++;
    this.ui.setAmmo(this.ammo, MAG_SIZE);

    const origin = this.camera.position.clone();
    const forward = this.forward;
    let dir;
    if (target) {
      dir = new THREE.Vector3().copy(target.group.position).sub(origin).normalize();
    } else {
      dir = forward.clone();
      dir.x += (Math.random() - 0.5) * 0.014;
      dir.y += (Math.random() - 0.5) * 0.014;
      dir.z += (Math.random() - 0.5) * 0.014;
      dir.normalize();
    }

    const raycaster = new THREE.Raycaster(origin, dir, 0.1, 90);
    const worldHits = raycaster.intersectObjects(this.world.blockers, false);
    const worldDist = worldHits.length ? worldHits[0].distance : Infinity;
    const enemyHit = this.enemies.raycast(origin, dir, 90);

    let endPoint;
    let hitEnemy = null;
    if (enemyHit && enemyHit.distance < worldDist) {
      hitEnemy = enemyHit;
      endPoint = enemyHit.point;
    } else if (worldHits.length) {
      endPoint = worldHits[0].point;
    } else {
      endPoint = origin.clone().addScaledVector(dir, 60);
    }

    const muzzlePos = new THREE.Vector3();
    this.muzzle.getWorldPosition(muzzlePos);
    this.effects.tracer(muzzlePos, endPoint, 0x8ff9ff, 1);

    this.muzzleTimer = 0.05;
    this.muzzleFlash.visible = true;
    this.muzzleFlash.material.opacity = 0.95;
    this.muzzleFlash.material.rotation = Math.random() * Math.PI;
    this.muzzleLight.intensity = 24;

    this.recoil = Math.min(0.055, this.recoil + 0.0085);
    this.gunKick = Math.min(1.6, this.gunKick + 1);
    this.shake = Math.min(0.5, this.shake + 0.022);
    this.audio.play('shoot');

    if (hitEnemy) {
      const baseDamage = 15 + Math.floor((this.wave - 1) / 2) * 2;
      const damage = hitEnemy.crit ? baseDamage * 2 : baseDamage;
      const killed = this.enemies.damage(hitEnemy.enemy, damage, hitEnemy.point, hitEnemy.crit);
      this.effects.spawnBurst(hitEnemy.point, hitEnemy.enemy.cfg.color, hitEnemy.crit ? 14 : 9, 5.5, { upward: 0.5 });
      if (this.shotCount % 2 === 0 || hitEnemy.crit || killed) {
        this.ui.damageNumber(hitEnemy.point, this.camera, damage, killed ? 'kill' : hitEnemy.crit ? 'crit' : '');
      }
      this.ui.hitmarker(killed);
      if (!killed) this.audio.play('hit');
    } else {
      this.effects.spawnBurst(endPoint, 0x8ff9ff, 6, 3.2, { upward: 0.4 });
    }
  }

  startReload() {
    if (this.reloading || this.ammo >= MAG_SIZE || this.state !== 'playing') return;
    this.reloading = true;
    this.reloadElapsed = 0;
    this.audio.play('reload');
    this.ui.setReloading(true, 0, this.ammo, MAG_SIZE);
  }

  _updateReload(dt) {
    if (!this.reloading) return;
    this.reloadElapsed += dt;
    const progress = Math.min(1, this.reloadElapsed / 1.05);
    this.ui.setReloading(true, progress, this.ammo, MAG_SIZE);
    if (progress >= 1) {
      this.reloading = false;
      this.ammo = MAG_SIZE;
      this.ui.setReloading(false, 0, this.ammo, MAG_SIZE);
      this.audio.play('reloadDone');
    }
  }

  tryDash() {
    if (this.dashCooldown > 0 || this.state !== 'playing') return;
    const move = this.input.getMove();
    const fx = -Math.sin(this.yaw);
    const fz = -Math.cos(this.yaw);
    const rx = Math.cos(this.yaw);
    const rz = -Math.sin(this.yaw);
    let dx = rx * move.x + fx * move.y;
    let dz = rz * move.x + fz * move.y;
    if (Math.hypot(dx, dz) < 0.15) { dx = fx; dz = fz; }
    const len = Math.hypot(dx, dz) || 1;
    this.playerVel.x = (dx / len) * 17;
    this.playerVel.z = (dz / len) * 17;
    this.dashTimer = 0.17;
    this.dashCooldown = 2.0;
    this.invuln = Math.max(this.invuln, 0.34);
    this.camera.fov = this._baseFov() + 10;
    this.camera.updateProjectionMatrix();
    this.shake = Math.max(this.shake, 0.18);
    this.audio.play('dash');
    this.ui.setDashReady(false);
    const p = new THREE.Vector3(this.playerPos.x, 1.0, this.playerPos.z);
    this.effects.spawnBurst(p, 0x8ff9ff, 12, 4, { spread: 0.6, upward: 0.2 });
    try { navigator.vibrate?.(12); } catch { /* noop */ }
  }

  _updatePlayer(dt) {
    const look = this.input.consumeLook();
    const sens = this.input.pointerLocked ? 0.0022 : this.input.desktop ? 0.0038 : 0.0042;
    this.yaw -= look.x * sens;
    this.pitch -= look.y * sens;
    this.pitch = Math.max(-1.32, Math.min(1.32, this.pitch));

    if (this.input.consumeDash()) this.tryDash();
    if (this.input.consumeReload()) this.startReload();

    const move = this.input.getMove();
    const fx = -Math.sin(this.yaw);
    const fz = -Math.cos(this.yaw);
    const rx = Math.cos(this.yaw);
    const rz = -Math.sin(this.yaw);

    const maxSpeed = this.dashTimer > 0 ? 17 : 6.3;
    const targetVX = (rx * move.x + fx * move.y) * maxSpeed;
    const targetVZ = (rz * move.x + fz * move.y) * maxSpeed;
    const accel = this.dashTimer > 0 ? 30 : 11;
    const k = 1 - Math.exp(-accel * dt);
    this.playerVel.x += (targetVX - this.playerVel.x) * k;
    this.playerVel.z += (targetVZ - this.playerVel.z) * k;

    this.playerPos.x += this.playerVel.x * dt;
    this.playerPos.z += this.playerVel.z * dt;

    // arena bounds
    const radius = Math.hypot(this.playerPos.x, this.playerPos.z);
    if (radius > 27.2) {
      this.playerPos.x *= 27.2 / radius;
      this.playerPos.z *= 27.2 / radius;
    }

    // obstacle collision
    for (const o of this.world.obstacles) {
      const dx = this.playerPos.x - o.x;
      const dz = this.playerPos.z - o.z;
      const d = Math.hypot(dx, dz);
      const minD = o.r + 0.52;
      if (d < minD && d > 0.0001) {
        this.playerPos.x = o.x + (dx / d) * minD;
        this.playerPos.z = o.z + (dz / d) * minD;
      }
    }

    if (this.dashTimer > 0) {
      this.dashTimer -= dt;
      this.dashParticle -= dt;
      if (this.dashParticle <= 0) {
        this.dashParticle = 0.02;
        this.effects.spawnBurst(new THREE.Vector3(this.playerPos.x, 0.9, this.playerPos.z), 0x35f0ff, 2, 1.6, { upward: 0.1 });
      }
      if (this.dashTimer <= 0) {
        this.camera.fov = this._baseFov();
        this.camera.updateProjectionMatrix();
      }
    }
    if (this.dashCooldown > 0) {
      this.dashCooldown -= dt;
      if (this.dashCooldown <= 0) {
        this.dashCooldown = 0;
        this.ui.setDashReady(true);
      }
    }

    if (this.invuln > 0) this.invuln -= dt;
    this.sinceDamage += dt;

    // slow health regen when out of danger
    if (this.sinceDamage > 5.5 && this.health < MAX_HP && this.health > 0) {
      this.health = Math.min(MAX_HP, this.health + 8 * dt);
      if (Math.round(this.health) !== this.lastHealthShown) {
        this.lastHealthShown = Math.round(this.health);
        this.ui.setHealth(this.health);
      }
    }

    // camera animation
    const speed = Math.hypot(this.playerVel.x, this.playerVel.z);
    this.bobPhase += dt * (3.4 + speed * 1.15);
    const bob = Math.sin(this.bobPhase) * 0.03 * Math.min(1, speed / 4.6);
    const strafeBob = Math.cos(this.bobPhase * 0.5) * 0.014 * Math.min(1, speed / 5);
    this.roll += (-move.x * 0.028 - this.roll) * Math.min(1, dt * 8);

    this.shake = Math.max(0, this.shake - dt * 1.9);
    const shake = this.shake * this.shake;
    const sx = (Math.random() - 0.5) * shake * 0.5;
    const sy = (Math.random() - 0.5) * shake * 0.4;
    const sr = (Math.random() - 0.5) * shake * 0.05;

    this.camera.position.set(
      this.playerPos.x + sx * 0.3,
      EYE_HEIGHT + bob + strafeBob + sy * 0.3,
      this.playerPos.z
    );
    this.recoil += (0 - this.recoil) * Math.min(1, dt * 7);
    this.camera.rotation.set(this.pitch + this.recoil, this.yaw, this.roll + sr);

    // weapon animation
    this.gunKick += (0 - this.gunKick) * Math.min(1, dt * 14);
    this.gunSwayX += (-look.x * 0.0009 - this.gunSwayX) * Math.min(1, dt * 10);
    this.gunSwayY += (-look.y * 0.0007 - this.gunSwayY) * Math.min(1, dt * 10);
    const reloadProgress = this.reloading ? Math.min(1, this.reloadElapsed / 1.05) : 0;
    const reloadAnim = this.reloading ? Math.sin(reloadProgress * Math.PI) : 0;

    this.gun.position.x = GUN_BASE.x + this.gunSwayX + move.x * 0.006;
    this.gun.position.y = GUN_BASE.y + this.gunSwayY + bob * 0.4 - reloadAnim * 0.14 + Math.sin(this.bobPhase * 0.5) * 0.004;
    this.gun.position.z = GUN_BASE.z + this.gunKick * 0.055;
    this.gun.rotation.x = 0.015 - this.gunKick * 0.14 + reloadAnim * 0.55;
    this.gun.rotation.y = -0.04 + this.gunSwayX * 1.4;
    this.gun.rotation.z = 0.012 + this.roll * 0.6 + move.x * 0.015;

    // muzzle flash decay
    if (this.muzzleTimer > 0) {
      this.muzzleTimer -= dt;
      if (this.muzzleTimer <= 0) {
        this.muzzleFlash.visible = false;
        this.muzzleLight.intensity = 0;
      } else {
        this.muzzleFlash.material.opacity = this.muzzleTimer / 0.05;
        this.muzzleLight.intensity = 24 * (this.muzzleTimer / 0.05);
      }
    }

    // pickups
    for (let i = this.pickups.length - 1; i >= 0; i--) {
      const p = this.pickups[i];
      p.life -= dt;
      p.spin += dt * 2.2;
      p.mesh.rotation.y = p.spin;
      p.mesh.position.y = p.baseY + Math.sin(p.spin * 1.4) * 0.12;
      const dx = this.playerPos.x - p.mesh.position.x;
      const dz = this.playerPos.z - p.mesh.position.z;
      const dist = Math.hypot(dx, dz);
      if (dist < 4.6) {
        const pull = Math.min(1, dt * (3.5 + (4.6 - dist) * 1.6));
        p.mesh.position.x += dx * pull;
        p.mesh.position.z += dz * pull;
      }
      if (dist < 1.25) {
        const before = this.health;
        this.health = Math.min(MAX_HP, this.health + 22);
        this.ui.setHealth(this.health);
        this.ui.damageNumber(p.mesh.position, this.camera, `+${Math.round(this.health - before)}`, 'heal');
        this.audio.play('pickup');
        this._disposePickup(p);
        this.pickups.splice(i, 1);
        continue;
      }
      if (p.life <= 0) {
        this._disposePickup(p);
        this.pickups.splice(i, 1);
      }
    }
  }

  _updateCombo(dt) {
    if (this.comboChain > 0) {
      this.comboTimer -= dt;
      if (this.comboTimer <= 0) {
        this.comboChain = 0;
        this.comboMult = 1;
        this.ui.setCombo(1, 0);
      }
    }
  }

  _onEnemyKilled(enemy, pos) {
    this.kills++;
    this.comboChain++;
    this.comboTimer = 3.2;
    this.comboMult = 1 + Math.min(this.comboChain, 12) * 0.2;
    const gain = Math.round(enemy.cfg.score * this.comboMult);
    this.score += gain;
    this.ui.setScore(this.score);
    if (this.comboChain >= 2) this.ui.setCombo(this.comboMult, this.comboChain);
    if (this.comboChain === 3 || this.comboChain === 6 || this.comboChain === 10) this.audio.play('combo');

    this.audio.play(enemy.cfg.boss ? 'bossKill' : 'kill');
    this.shake = Math.min(0.9, this.shake + (enemy.cfg.boss ? 0.65 : 0.12));
    this.ui.hitmarker(true);
    try { navigator.vibrate?.(enemy.cfg.boss ? 80 : 18); } catch { /* noop */ }

    if (this.score > this.best) {
      this.best = this.score;
      localStorage.setItem('nb_best', String(this.best));
      this.ui.setBest(this.best);
    }

    if (enemy.cfg.boss) {
      this.ui.showBanner('WARDEN DOWN', 'SIGNATURE LOST', 2.4);
      this.ui.setBoss(null);
      this.effects.ring(pos, 0xa45bff, 13, 1.1);
    }

    const dropChance = enemy.cfg.boss ? 1 : 0.16;
    if (Math.random() < dropChance) this._spawnPickup(pos);
  }

  _spawnPickup(pos) {
    const mat = new THREE.MeshBasicMaterial({ color: 0x4dffb8, toneMapped: false });
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.17, 10, 8), mat);
    mesh.position.set(pos.x, 1.0, pos.z);
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTexture(), color: 0x4dffb8, transparent: true, opacity: 0.75,
      blending: THREE.AdditiveBlending, depthWrite: false,
    }));
    glow.scale.setScalar(1.4);
    mesh.add(glow);
    this.scene.add(mesh);
    this.pickups.push({ mesh, life: 13, spin: Math.random() * 6, baseY: 1.0 });
  }

  _disposePickup(p) {
    this.scene.remove(p.mesh);
    p.mesh.material.dispose();
    for (const child of p.mesh.children) {
      if (child.isSprite) child.material.dispose();
    }
  }

  _hurt(amount, pos) {
    if (this.state !== 'playing' || this.invuln > 0) return;
    this.health -= amount;
    this.sinceDamage = 0;
    this.invuln = 0.3;
    this.shake = Math.min(1, this.shake + 0.5);
    this.comboChain = 0;
    this.comboMult = 1;
    this.comboTimer = 0;
    this.ui.setCombo(1, 0);
    this.ui.setHealth(this.health);
    this.ui.flashDamage();
    this.lastHealthShown = Math.round(this.health);
    this.audio.play('hurt');
    try { navigator.vibrate?.(45); } catch { /* noop */ }

    const p = new THREE.Vector3(this.playerPos.x, 1.2, this.playerPos.z);
    this.effects.spawnBurst(p, 0xff2d5b, 10, 3, { upward: 0.4 });

    if (this.health <= 0) this._die();
  }

  /* ------------------------------------------------------------------ */
  /*  frame loop                                                         */
  /* ------------------------------------------------------------------ */

  _updatePlaying(dt) {
    this._updatePlayer(dt);
    this._updateShooting(dt);
    this._updateReload(dt);
    this._updateWave(dt);
    this._updateCombo(dt);

    this.enemies.update(dt, this.playerPos, this.playerVel);
    this.ui.setHostiles(this.spawnQueue.length + this.enemies.alive);

    this.radarTick++;
    if (this.radarTick % 6 === 0) {
      this.ui.updateRadar(dt * 6, this.playerPos, this.yaw, this.enemies.enemies);
    }
  }

  _updateMenu(dt) {
    const t = this.time * 0.09;
    const radius = 15.5;
    this.camera.position.set(Math.sin(t) * radius, 4.6 + Math.sin(this.time * 0.22) * 0.5, Math.cos(t) * radius);
    this.camera.lookAt(0, 2.0, 0);
    if (this.enemies.alive === 0 && Math.random() < dt * 0.5) {
      const a = Math.random() * Math.PI * 2;
      const r = 18 + Math.random() * 5;
      this.effects.spawnBurst(new THREE.Vector3(Math.cos(a) * r, 0.2, Math.sin(a) * r), 0x35f0ff, 2, 1.2, { upward: 0.4 });
    }
  }

  _updateDead(dt) {
    this.deathTimer += dt;
    const k = Math.min(1, this.deathTimer / 0.9);
    this.camera.position.set(this.playerPos.x, EYE_HEIGHT - k * 1.05, this.playerPos.z);
    this.camera.rotation.set(this.pitch - k * 0.35, this.yaw, this.roll + k * 0.5);
    if (this.deathTimer > 1.15 && !this._overShown) {
      this._overShown = true;
      this.ui.showGameOver({
        score: this.score,
        wave: this.wave,
        kills: this.kills,
        best: this.best,
      });
    }
  }

  _loop() {
    requestAnimationFrame(() => this._loop());
    const dt = Math.min(0.05, this.clock.getDelta());
    this.time += dt;

    if (this.state === 'playing') this._updatePlaying(dt);
    else if (this.state === 'dead') this._updateDead(dt);
    else if (this.state === 'menu') this._updateMenu(dt);

    if (this.state !== 'paused') {
      this.world.update(dt);
      this.effects.update(dt);
    }

    this.renderer.render(this.scene, this.camera);
    this._adaptQuality(dt);
  }

  _adaptQuality(dt) {
    this.frameTime += (dt * 1000 - this.frameTime) * 0.05;
    this.frameCount++;
    if (this.frameCount > 120 && this.frameCount % 90 === 0) {
      if (this.frameTime > 25 && this.pixelRatio > 1.0) {
        this.pixelRatio = Math.max(1, this.pixelRatio - 0.35);
        this.renderer.setPixelRatio(this.pixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight, false);
      }
    }
  }
}
