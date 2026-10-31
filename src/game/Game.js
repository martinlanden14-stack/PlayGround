import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { createWorld } from './world.js';
import { Skater } from './skater.js';
import { Input } from './input.js';
import { Soundscape } from './audio.js';

const TAU = Math.PI * 2;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const damp = (a, b, lambda, dt) => lerp(a, b, 1 - Math.exp(-lambda * dt));
const mod = (n, m) => ((n % m) + m) % m;

const RUN_TIME = 120;
const MAX_SPEED = 16;
const GRAVITY = 23;

const SCORE = {
  ollie: 100,
  kickflip: 300,
  shove: 250,
  spin: 450,
  grind: 90,
  tape: 300
};

const TRICK_LABEL = {
  ollie: 'OLLIE',
  kickflip: 'KICKFLIP',
  shove: 'SHOVE-IT',
  spin: '360 SPIN',
  grind: '50-50 GRIND'
};

class ParticleField {
  constructor(scene, texture) {
    this.count = 360;
    this.pos = new Float32Array(this.count * 3);
    this.col = new Float32Array(this.count * 3);
    this.size = new Float32Array(this.count);
    this.life = new Float32Array(this.count);
    this.vel = new Float32Array(this.count * 3);
    this.decay = new Float32Array(this.count);
    this.gravity = new Float32Array(this.count);
    this.cursor = 0;

    for (let i = 0; i < this.count; i++) {
      this.pos[i * 3 + 1] = -999;
      this.life[i] = 0;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(this.pos, 3));
    geo.setAttribute('aColor', new THREE.BufferAttribute(this.col, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(this.size, 1));
    geo.setAttribute('aLife', new THREE.BufferAttribute(this.life, 1));
    this.geo = geo;

    const mat = new THREE.ShaderMaterial({
      uniforms: { uMap: { value: texture } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        attribute vec3 aColor;
        attribute float aSize;
        attribute float aLife;
        varying vec3 vColor;
        varying float vLife;
        void main() {
          vColor = aColor;
          vLife = aLife;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * (330.0 / max(1.0, -mv.z));
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform sampler2D uMap;
        varying vec3 vColor;
        varying float vLife;
        void main() {
          vec4 tex = texture2D(uMap, gl_PointCoord);
          float alpha = tex.a * smoothstep(0.0, 0.18, vLife) * min(1.0, vLife * 1.6);
          if (alpha < 0.005) discard;
          gl_FragColor = vec4(vColor * tex.rgb, alpha);
        }
      `
    });
    this.points = new THREE.Points(geo, mat);
    this.points.frustumCulled = false;
    scene.add(this.points);
  }

  spawn(x, y, z, n, { color = 0xffd27a, spread = 2, up = 2, size = .14, life = .7, gravity = 5, direction = null } = {}) {
    const c = new THREE.Color(color);
    for (let i = 0; i < n; i++) {
      const idx = this.cursor++ % this.count;
      const p = idx * 3;
      this.pos[p] = x + (Math.random() - .5) * .18;
      this.pos[p + 1] = y + (Math.random() - .5) * .12;
      this.pos[p + 2] = z + (Math.random() - .5) * .18;
      let vx = (Math.random() - .5) * spread;
      let vy = Math.random() * up + .2;
      let vz = (Math.random() - .5) * spread;
      if (direction) {
        vx += direction.x * (Math.random() * 2.5);
        vz += direction.z * (Math.random() * 2.5);
      }
      this.vel[p] = vx;
      this.vel[p + 1] = vy;
      this.vel[p + 2] = vz;
      this.col[p] = c.r * (0.8 + Math.random() * .4);
      this.col[p + 1] = c.g * (0.8 + Math.random() * .4);
      this.col[p + 2] = c.b * (0.8 + Math.random() * .4);
      this.size[idx] = size * (0.5 + Math.random() * .8);
      this.life[idx] = 1;
      this.decay[idx] = 1 / (life * (0.65 + Math.random() * .7));
      this.gravity[idx] = gravity;
    }
    this._dirty();
  }

  burst(x, y, z, colors = [0xffd27a, 0xd7ff43, 0xff5b3a]) {
    for (const col of colors) {
      this.spawn(x, y, z, 10, { color: col, spread: 4.5, up: 3.5, size: .18, life: .85, gravity: 5.5 });
    }
  }

  _dirty() {
    this.geo.attributes.position.needsUpdate = true;
    this.geo.attributes.aColor.needsUpdate = true;
    this.geo.attributes.aSize.needsUpdate = true;
    this.geo.attributes.aLife.needsUpdate = true;
  }

  update(dt) {
    let dirty = false;
    for (let i = 0; i < this.count; i++) {
      if (this.life[i] <= 0) continue;
      const p = i * 3;
      this.life[i] -= this.decay[i] * dt;
      if (this.life[i] <= 0) {
        this.life[i] = 0;
        this.pos[p + 1] = -999;
        dirty = true;
        continue;
      }
      this.vel[p + 1] -= this.gravity[i] * dt;
      this.vel[p] *= 1 - 1.1 * dt;
      this.vel[p + 2] *= 1 - 1.1 * dt;
      this.pos[p] += this.vel[p] * dt;
      this.pos[p + 1] += this.vel[p + 1] * dt;
      this.pos[p + 2] += this.vel[p + 2] * dt;
      dirty = true;
    }
    if (dirty) {
      this.geo.attributes.position.needsUpdate = true;
      this.geo.attributes.aLife.needsUpdate = true;
    }
  }
}

export class SunsetGrind {
  constructor(canvas) {
    this.canvas = canvas;
    this.mode = 'boot';
    this.time = 0;
    this.menuTime = 0;
    this.runTime = 0;
    this.timer = RUN_TIME;
    this.score = 0;
    this.displayScore = 0;
    this.bestScore = Number(localStorage.getItem('sg-best') || 0);
    this.bestTapes = Number(localStorage.getItem('sg-tapes') || 0);
    this.tapes = 0;
    this.tricksLanded = 0;
    this.bestCombo = 0;
    this.topSpeed = 0;
    this.comboPoints = 0;
    this.comboTimer = 0;
    this.comboMult = 1;
    this.comboCount = 0;
    this.airTime = 0;
    this.pending = 0;
    this.countdown = 0;
    this.countdownTick = 4;
    this.tutorialTimer = 0;
    this.shake = 0;
    this.shakeRoll = 0;
    this.landCooldown = 0;
    this.toastTimer = 0;
    this.allTapes = false;
    this.objectivePulse = 0;
    this._lastScore = -1;
    this._lastTimer = '';
    this._lastSpeed = -1;
    this._hintShown = false;
    this._lastActionAt = 0;
    this._endHandled = false;
    this._newBest = false;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
      stencil: false
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setSize(window.innerWidth, window.innerHeight, false);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.shadowMap.autoUpdate = false;
    this.renderer.shadowMap.needsUpdate = true;
    this.renderer.setClearColor(0xc58f6e, 1);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, .1, 600);
    this.camera.position.set(0, 3, 20);

    this.world = createWorld(this.scene, this.renderer);
    this.skater = new Skater(this.scene, this.world);
    this.input = new Input();
    this.audio = new Soundscape();
    this.particles = new ParticleField(this.scene, this.world.sparksTex);

    this.player = {
      x: 0, y: 0, z: 16, yaw: 0, speed: 0, vy: 0,
      airborne: false, grinding: false, rail: null, railT: 0, railDir: 1,
      surfaceY: 0, pitch: 0, slope: 0, steer: 0, airTime: 0,
      flipAngle: 0, flipTarget: 0, shoveAngle: 0, shoveTarget: 0,
      spinAngle: 0, spinTarget: 0, quickTricks: [],
      bail: 0, lastGroundY: 0, grindAccum: 0, grindIndex: -1,
      lastRailExit: 0
    };

    this.bindUI();
    this.bindEvents();
    this.setupPost();

    this.cameraTarget = new THREE.Vector3(0, 1.1, 8);
    this.cameraPos = new THREE.Vector3(4.15, 1.58, 20.7);
    this.followPos = new THREE.Vector3();
    this.followLook = new THREE.Vector3();
    this.followInit = false;
    this.clock = new THREE.Clock();
    this._frameCount = 0;
    this._perfAccum = 0;

    this.refreshMenuStats();
    this.updateSkater(0);
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  setupPost() {
    this.composer = new EffectComposer(this.renderer);
    this.composer.setSize(window.innerWidth, window.innerHeight);
    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);

    this.bloom = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      .27, .4, .82
    );
    this.composer.addPass(this.bloom);

    this.gradePass = new ShaderPass({
      uniforms: {
        tDiffuse: { value: null },
        uTime: { value: 0 },
        uRes: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uVignette: { value: .3 },
        uGrain: { value: .035 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float uTime;
        uniform vec2 uRes;
        uniform float uVignette;
        uniform float uGrain;
        varying vec2 vUv;

        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
        }

        void main() {
          vec2 uv = vUv;
          vec2 c = uv - 0.5;
          float dist = length(c);
          vec2 ca = c * dist * 0.006;
          vec3 col;
          col.r = texture2D(tDiffuse, uv - ca).r;
          col.g = texture2D(tDiffuse, uv).g;
          col.b = texture2D(tDiffuse, uv + ca).b;

          float luma = dot(col, vec3(0.299, 0.587, 0.114));
          col = mix(vec3(luma), col, 1.18);
          col *= vec3(1.03, 1.0, 0.952);
          col += vec3(0.005, 0.002, -0.002);

          float vig = smoothstep(0.78, 0.22, dist);
          col *= mix(0.78, 1.0, vig);
          float grain = hash(uv * uRes + fract(uTime) * 91.7) - 0.5;
          col += grain * uGrain * (0.35 + (1.0 - vig) * 0.7);

          gl_FragColor = vec4(col, 1.0);
        }
      `
    });
    this.composer.addPass(this.gradePass);
    this.composer.addPass(new OutputPass());
  }

  bindUI() {
    this.ui = {
      boot: document.getElementById('boot'),
      bootProgress: document.getElementById('boot-progress'),
      menu: document.getElementById('menu'),
      hud: document.getElementById('hud'),
      countdown: document.getElementById('countdown'),
      countdownText: document.getElementById('countdown-text'),
      countdownSub: document.getElementById('countdown-sub'),
      score: document.getElementById('score'),
      hudBest: document.getElementById('hud-best'),
      menuBest: document.getElementById('menu-best'),
      menuTapes: document.getElementById('menu-tapes'),
      timer: document.getElementById('timer'),
      timerText: document.getElementById('timer-text'),
      timerArc: document.getElementById('timer-arc'),
      tapeCount: document.getElementById('tape-count'),
      combo: document.getElementById('combo'),
      comboMult: document.getElementById('combo-mult'),
      comboFill: document.getElementById('combo-fill'),
      comboPoints: document.getElementById('combo-points'),
      comboLabel: document.getElementById('combo-label'),
      speed: document.getElementById('speed'),
      speedValue: document.getElementById('speed-value'),
      speedBars: [...document.querySelectorAll('.speed-bars i')],
      trickFeed: document.getElementById('trick-feed'),
      popLayer: document.getElementById('pop-layer'),
      objective: document.getElementById('objective'),
      objectiveText: document.getElementById('objective-text'),
      grindPrompt: document.getElementById('grind-prompt'),
      tutorial: document.getElementById('tutorial'),
      pause: document.getElementById('pause'),
      results: document.getElementById('results'),
      finalScore: document.getElementById('final-score'),
      statCombo: document.getElementById('stat-combo'),
      statTapes: document.getElementById('stat-tapes'),
      statSpeed: document.getElementById('stat-speed'),
      statTricks: document.getElementById('stat-tricks'),
      newBest: document.getElementById('new-best'),
      pauseAudioBtn: document.getElementById('pause-audio-btn'),
      menuAudio: document.getElementById('menu-audio'),
      scoreCard: document.querySelector('.score-card')
    };
    this.ui.hudBest.textContent = this.bestScore.toLocaleString('en-US');
    this.ui.timerArc.style.strokeDasharray = '113';
    this.updateAudioLabels();
  }

  bindEvents() {
    document.getElementById('start-btn').addEventListener('click', () => this.startRun());
    document.getElementById('pause-btn').addEventListener('click', () => this.pause());
    document.getElementById('resume-btn').addEventListener('click', () => this.resume());
    document.getElementById('pause-restart-btn').addEventListener('click', () => this.startRun());
    document.getElementById('again-btn').addEventListener('click', () => this.startRun());
    document.getElementById('home-btn').addEventListener('click', () => this.goHome());
    document.getElementById('pause-audio-btn').addEventListener('click', () => this.toggleAudio());
    document.getElementById('menu-audio').addEventListener('click', () => this.toggleAudio());

    window.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' || e.code === 'KeyP') {
        if (this.mode === 'playing') this.pause();
        else if (this.mode === 'paused') this.resume();
      }
      if (e.code === 'Enter' && this.mode === 'menu') this.startRun();
    });

    window.addEventListener('resize', () => this.resize());
    window.addEventListener('orientationchange', () => setTimeout(() => this.resize(), 120));
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.mode === 'playing') this.pause();
    });

    this.input.onAction(() => {
      if (this.mode === 'playing') this.tutorialTimer = Math.max(this.tutorialTimer, 10);
    });

    window.addEventListener('beforeunload', () => {
      this.audio.setRolling(0, false);
      this.audio.setGrind(false);
    });

    document.fonts?.ready.then(() => {
      this.ui.menu.classList.add('is-ready');
    });

    const onFirstTouch = () => {
      this.audio.init();
      window.removeEventListener('pointerdown', onFirstTouch);
    };
    window.addEventListener('pointerdown', onFirstTouch, { once: true });
  }

  updateAudioLabels() {
    const on = this.audio.enabled;
    this.ui.menuAudio?.classList.toggle('muted', !on);
    this.ui.pauseAudioBtn.textContent = `AUDIO: ${on ? 'ON' : 'OFF'}`;
  }

  async toggleAudio() {
    if (!this.audio.ctx) await this.audio.init();
    this.audio.toggle();
    this.audio.ui();
    this.updateAudioLabels();
  }

  refreshMenuStats() {
    this.ui.menuBest.textContent = this.bestScore.toLocaleString('en-US');
    this.ui.menuTapes.textContent = `${this.bestTapes} / 12`;
    this.ui.hudBest.textContent = this.bestScore.toLocaleString('en-US');
  }

  resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setSize(w, h, false);
    this.composer?.setSize(w, h);
    if (this.gradePass) this.gradePass.uniforms.uRes.value.set(w * this.renderer.getPixelRatio(), h * this.renderer.getPixelRatio());
  }

  resetRun() {
    this.timer = RUN_TIME;
    this.score = 0;
    this.displayScore = 0;
    this.tapes = 0;
    this.tricksLanded = 0;
    this.bestCombo = 0;
    this.topSpeed = 0;
    this.comboPoints = 0;
    this.comboTimer = 0;
    this.comboMult = 1;
    this.comboCount = 0;
    this.pending = 0;
    this.airTime = 0;
    this.tutorialTimer = 0;
    this.landCooldown = 0;
    this.allTapes = false;
    this._endHandled = false;
    this._newBest = false;
    this.countdown = 3.4;
    this.countdownTick = 4;
    this.player.x = 0;
    this.player.y = 0;
    this.player.z = 16;
    this.player.yaw = 0;
    this.player.speed = 5.5;
    this.player.vy = 0;
    this.player.airborne = false;
    this.player.grinding = false;
    this.player.rail = null;
    this.player.surfaceY = 0;
    this.player.pitch = 0;
    this.player.steer = 0;
    this.player.flipAngle = 0;
    this.player.flipTarget = 0;
    this.player.shoveAngle = 0;
    this.player.shoveTarget = 0;
    this.player.spinAngle = 0;
    this.player.spinTarget = 0;
    this.player.bail = 0;
    this.player.quickTricks = [];
    this.player.lastRailExit = 0;
    this.followInit = false;
    this.skater.setBail(0);
    this.skater.snapTricks?.();
    for (const tape of this.world.tapes) {
      tape.visible = true;
      tape.userData.collected = false;
      tape.scale.setScalar(1);
    }
    this.input.reset();
    this.ui.trickFeed.innerHTML = '';
    this.ui.popLayer.innerHTML = '';
    this.ui.combo.classList.remove('active');
    this.ui.comboMult.textContent = '×1';
    this.ui.comboFill.style.width = '0%';
    this.ui.comboPoints.textContent = '0 PTS';
    this.ui.tutorial.classList.remove('hide');
    this.ui.grindPrompt.classList.remove('show');
    this.ui.objectiveText.textContent = 'FIND THE GOLDEN TAPES';
    this.ui.objective.classList.remove('show');
    this.ui.timer.classList.remove('low');
    this.ui.score.textContent = '0';
    this.ui.tapeCount.textContent = '0';
    this.ui.scoreCard?.classList.remove('flash');
    this._lastScore = -1;
    this._lastTimer = '';
    this._lastSpeed = -1;
    this._hintShown = false;
  }

  async startRun() {
    if (this.mode === 'paused') this.closePause();
    this.audio.init();
    this.audio.start();
    this.resetRun();
    this.mode = 'countdown';
    this.ui.menu.classList.remove('is-active');
    this.ui.results.classList.remove('is-active');
    this.ui.pause.classList.remove('is-active');
    this.ui.hud.classList.add('is-active');
    this.ui.countdown.classList.add('is-active');
    this.ui.countdownText.textContent = '3';
    this.ui.countdownSub.textContent = 'FIND YOUR LINE';
    this.ui.countdown.classList.remove('pop');
    this._lastActionAt = performance.now();
    this.countdownTick = 4;
  }

  pause() {
    if (this.mode !== 'playing') return;
    this.mode = 'paused';
    this.ui.pause.classList.add('is-active');
    this.audio.setRolling(0, false);
    this.audio.setGrind(false);
    this.input.reset();
  }

  closePause() {
    this.ui.pause.classList.remove('is-active');
  }

  resume() {
    if (this.mode !== 'paused') return;
    this.mode = 'playing';
    this.closePause();
    this.clock.getDelta();
  }

  goHome() {
    this.mode = 'menu';
    this.ui.results.classList.remove('is-active');
    this.ui.pause.classList.remove('is-active');
    this.ui.hud.classList.remove('is-active');
    this.ui.menu.classList.add('is-active');
    this.ui.countdown.classList.remove('is-active');
    this.input.reset();
    this.audio.setRolling(0, false);
    this.audio.setGrind(false);
    this.refreshMenuStats();
    this.followInit = false;
  }

  endRun() {
    if (this._endHandled) return;
    this._endHandled = true;
    this.mode = 'result';
    this.audio.setRolling(0, false);
    this.audio.setGrind(false);
    this.audio.end();
    this.finalizeRunStats();
    const final = Math.round(this.score);
    this._newBest = final > this.bestScore;
    if (this._newBest) {
      this.bestScore = final;
      localStorage.setItem('sg-best', String(final));
    }
    if (this.tapes > this.bestTapes) {
      this.bestTapes = this.tapes;
      localStorage.setItem('sg-tapes', String(this.tapes));
    }
    this.ui.finalScore.textContent = final.toLocaleString('en-US');
    this.ui.statCombo.textContent = Math.round(this.bestCombo).toLocaleString('en-US');
    this.ui.statTapes.textContent = `${this.tapes} / 12`;
    this.ui.statSpeed.textContent = `${Math.round(this.topSpeed * 2.237)} MPH`;
    this.ui.statTricks.textContent = String(this.tricksLanded);
    this.ui.newBest.classList.toggle('show', this._newBest);
    this.ui.hud.classList.remove('is-active');
    this.ui.results.classList.add('is-active');

    // Hero pose under the arch for the results backdrop
    const p = this.player;
    p.x = 0; p.z = -2; p.y = 0; p.yaw = Math.PI + .4;
    p.speed = 0; p.vy = 0; p.airborne = false; p.grinding = false; p.rail = null;
    p.pitch = 0; p.steer = 0; p.surfaceY = 0;
    p.flipAngle = p.flipTarget = p.shoveAngle = p.shoveTarget = p.spinAngle = p.spinTarget = 0;
    this.skater.snapTricks?.();
    this.skater.setBail(0);
    this.menuTime = 0;
    this.cameraPos.set(2.4, 2.7, 4.4);
    this.cameraTarget.set(0, 1.15, -2);
    this.followInit = false;
    const quotes = [
      '“The best line is the next one.”',
      '“Wax on. Sunset off.”',
      '“No waves, all motion.”',
      '“Left the beach a little louder.”'
    ];
    document.getElementById('result-quote').textContent = quotes[Math.floor(Math.random() * quotes.length)];
    this.refreshMenuStats();
    if (navigator.vibrate) navigator.vibrate([20, 50, 30]);
  }

  finalizeRunStats() {
    if (this.pending > 0) this.bankCombo(true);
    this.comboPoints = 0;
  }

  animate() {
    requestAnimationFrame(this.animate);
    const dt = Math.min(this.clock.getDelta(), .045);
    this.time += dt;

    if (this.mode === 'boot') {
      this.updateMenu(dt);
    } else if (this.mode === 'menu') {
      this.updateMenu(dt);
    } else if (this.mode === 'countdown') {
      this.updateCountdown(dt);
    } else if (this.mode === 'playing') {
      this.updatePlaying(dt);
    } else if (this.mode === 'paused') {
      this.updatePaused(dt);
    } else if (this.mode === 'result') {
      this.updateResultsCamera(dt);
    }

    this.world.update(dt, this.time, this.mode === 'menu' || this.mode === 'boot' ? null : this.skater.root.position, this.camera);
    this.particles.update(dt);
    this.updateCamera(dt);
    this.updatePops();
    this.updateHud(dt);

    // dynamic grade
    this.gradePass.uniforms.uTime.value = this.time;

    if (window.innerWidth >= 900 || this._frameCount % 2 === 0) {
      this.renderer.shadowMap.needsUpdate = true;
    }
    this.composer.render();
    this._frameCount++;
    if (this._frameCount === 2) {
      this.ui.bootProgress.style.width = '100%';
      setTimeout(() => this.ui.boot.classList.add('done'), 180);
      this.ui.menu.classList.add('is-active');
      this.mode = 'menu';
    }
  }

  updateMenu(dt) {
    this.menuTime += dt;
    const t = this.menuTime;
    const p = this.player;
    // subtle idle push-in and parallax
    const sway = Math.sin(t * .18);
    const cam = new THREE.Vector3(
      4.15 + sway * .42,
      1.58 + Math.sin(t * .31) * .035,
      20.7 - (t % 100) * .006
    );
    const look = new THREE.Vector3(-3.6 + sway * .08, 1.02, 6.8);
    this.cameraPos.lerp(cam, 1 - Math.exp(-1.7 * dt));
    this.cameraTarget.lerp(look, 1 - Math.exp(-1.8 * dt));
    this.camera.position.copy(this.cameraPos);
    this.camera.lookAt(this.cameraTarget);
    this.camera.fov = 56;
    this.camera.updateProjectionMatrix();

    // skater idle in the attract shot
    p.x = 0; p.y = 0; p.z = 10; p.yaw = .12;
    const idle = {
      x: p.x, y: p.y, z: p.z, yaw: p.yaw, speed: 0, steer: Math.sin(t * .45) * .04,
      pitch: 0, airborne: false, grinding: false, flip: 0, shove: 0, spinAngle: 0,
      bail: 0, pushing: false, surfaceY: 0
    };
    this.skater.update(dt, idle);
    this.updateHud(dt, true);
  }

  updateResultsCamera(dt) {
    this.menuTime += dt;
    const t = this.menuTime;
    const p = this.player;
    const a = .42 + t * .06;
    const cam = new THREE.Vector3(
      p.x + Math.sin(a) * 6.4,
      2.55 + Math.sin(t * .32) * .06,
      p.z + Math.cos(a) * 6.4
    );
    this.cameraPos.lerp(cam, 1 - Math.exp(-1.6 * dt));
    this.cameraTarget.lerp(new THREE.Vector3(p.x, 1.12, p.z), 1 - Math.exp(-2.2 * dt));
    this.camera.position.copy(this.cameraPos);
    this.camera.lookAt(this.cameraTarget);
    this.camera.fov = 46;
    this.camera.updateProjectionMatrix();

    p.yaw = Math.PI + .4 + Math.sin(t * .4) * .06;
    const idle = {
      x: p.x, y: p.y, z: p.z, yaw: p.yaw, speed: 0, steer: Math.sin(t * .5) * .03,
      pitch: 0, airborne: false, grinding: false, flip: 0, shove: 0, spinAngle: 0,
      bail: 0, pushing: false, surfaceY: 0
    };
    this.skater.update(dt, idle);
    this.world.update(dt, this.time, p, this.camera);
  }

  updateCountdown(dt) {
    this.countdown -= dt;
    const prevTick = this.countdownTick;
    const tick = Math.ceil(this.countdown);
    if (tick !== prevTick && tick > 0) {
      this.countdownTick = tick;
      this.ui.countdownText.textContent = String(Math.min(3, tick));
      this.ui.countdown.classList.remove('pop');
      void this.ui.countdown.offsetWidth;
      this.ui.countdown.classList.add('pop');
      if (this.audio.ctx) this.audio.blip(330 + (3 - tick) * 80, .08, 'square', .035);
    }
    if (this.countdown <= .45) {
      this.ui.countdownText.textContent = 'GO';
      this.ui.countdownSub.textContent = 'OWN THE BOARDWALK';
    }
    if (this.countdown <= 0) {
      this.ui.countdown.classList.remove('is-active');
      this.mode = 'playing';
      this.runTime = 0;
      this.clock.getDelta();
      this.showObjective('FIND THE GOLDEN TAPES', 2.4);
    }
    // let skater settle into moving stance during the countdown, but don't move
    const p = this.player;
    this.skater.update(dt, {
      x: p.x, y: p.y, z: p.z, yaw: p.yaw, speed: 4, steer: 0, pitch: 0,
      airborne: false, grinding: false, flip: 0, shove: 0, spinAngle: 0, bail: 0, pushing: true, surfaceY: 0
    });
  }

  updatePaused(dt) {
    this.menuTime += dt;
    this.updateCamera(dt);
  }

  updatePlaying(dt) {
    const p = this.player;
    this.runTime += dt;
    this.timer = Math.max(0, RUN_TIME - this.runTime);
    this.landCooldown = Math.max(0, this.landCooldown - dt);
    this.player.lastRailExit = Math.max(0, this.player.lastRailExit - dt);
    this.tutorialTimer += dt;

    if (this.timer <= 0) {
      this.endRun();
      return;
    }

    const actions = this.input.consumeActions();
    for (const action of actions) this.handleAction(action);

    // Combo timeout
    if (this.comboTimer > 0) {
      this.comboTimer -= dt;
      if (this.comboTimer <= 0) {
        if (this.comboPoints > 0) this.bankCombo();
        else this.resetCombo();
      }
    }

    // Trick animation progress
    p.flipAngle = Math.min(p.flipTarget, p.flipAngle + TAU * 2.15 * dt);
    p.shoveAngle = Math.min(p.shoveTarget, p.shoveAngle + TAU * 2.0 * dt);
    const spinTarget = p.spinTarget;
    if (p.spinAngle < spinTarget) p.spinAngle = Math.min(spinTarget, p.spinAngle + 11.2 * dt);
    else if (p.spinAngle > spinTarget) p.spinAngle = Math.max(spinTarget, p.spinAngle - 11.2 * dt);

    const steer = this.input.moveX;
    p.steer = damp(p.steer, steer, 10, dt);

    if (p.grinding) {
      this.updateGrind(dt);
    } else {
      this.updateRide(dt, steer);
    }

    // Tape pickups
    this.checkTapes();

    // Tutorial fade
    if (this.tutorialTimer > 13) this.ui.tutorial.classList.add('hide');
    if (this.tutorialTimer > .4 && !this._hintShown) {
      this._hintShown = true;
      this.ui.objective.classList.add('show');
      this.ui.tutorial.classList.remove('hide');
      setTimeout(() => this.ui.objective.classList.remove('show'), 3800);
    }

    // speed / camera data
    this.topSpeed = Math.max(this.topSpeed, p.speed);
    this.updateSkater(dt);
    this.updateGrindFX(dt);
    this.updateRailPrompt();
    this.audio.setRolling(p.speed, !p.airborne && !p.grinding);
    this.audio.setGrind(p.grinding);
  }

  updateRide(dt, steer) {
    const p = this.player;
    const input = this.input;
    const speedNorm = p.speed / MAX_SPEED;
    const turnRate = (1.1 + Math.min(p.speed, 10) * .075) * (p.airborne ? .38 : 1);
    p.yaw += steer * turnRate * dt;
    p.yaw = mod(p.yaw + Math.PI, TAU) - Math.PI;

    if (!p.airborne) {
      if (input.push > .1) {
        p.speed += (3.8 + input.push * 5.2) * dt;
        if (Math.random() < dt * 7) {
          this.audio.push();
          this.spawnDust(1, false);
        }
      } else {
        p.speed -= (0.55 + p.speed * .045) * dt;
      }
      if (input.brake) p.speed -= 9 * dt;
      // gentle auto-roll so the game never feels stuck
      if (p.speed < 4.2) p.speed += 1.6 * dt;
      p.speed = clamp(p.speed, 0, MAX_SPEED);
    } else {
      p.speed -= .25 * dt;
      p.speed = clamp(p.speed, 0, MAX_SPEED);
    }

    const forward = new THREE.Vector3(Math.sin(p.yaw), 0, -Math.cos(p.yaw));
    const oldX = p.x, oldZ = p.z;
    const oldSurface = this.world.surfaceAt(p.x, p.z);
    const step = p.speed * dt;
    p.x += forward.x * step;
    p.z += forward.z * step;

    // arena bounds
    const b = this.world.bounds;
    if (p.x < b.minX || p.x > b.maxX || p.z < b.minZ || p.z > b.maxZ) {
      p.x = clamp(p.x, b.minX, b.maxX);
      p.z = clamp(p.z, b.minZ, b.maxZ);
      p.speed *= .88;
      this.shake = Math.max(this.shake, .18);
      this.spawnDust(2, true);
    }

    const surf = this.world.surfaceAt(p.x, p.z);
    p.surfaceY = surf.height;
    p.slope = surf.height;

    if (!p.airborne) {
      const climb = surf.height - p.y;
      if (climb > .58) {
        // Blocked by a ledge face, ease off
        p.x = oldX; p.z = oldZ;
        p.speed *= .45;
        p.surfaceY = this.world.surfaceAt(p.x, p.z).height;
      } else if (climb < -.38) {
        // Rolled off an edge / ramp lip
        p.airborne = true;
        p.vy = oldSurface.ramp ? oldSurface.ramp.launch : 1.8;
        p.airTime = 0;
        p.flipAngle = p.flipTarget = 0;
        p.shoveAngle = p.shoveTarget = 0;
        p.spinAngle = p.spinTarget = 0;
        p.quickTricks = [];
      } else {
        p.y = surf.height;
        // Gravity along slopes
        if (surf.ramp && p.speed > .3) {
          const hAhead = this.world.surfaceAt(p.x + forward.x * .55, p.z + forward.z * .55).height;
          const hBehind = this.world.surfaceAt(p.x - forward.x * .55, p.z - forward.z * .55).height;
          const grade = (hAhead - hBehind) / 1.1;
          p.speed -= grade * 8.5 * dt;
          p.speed = clamp(p.speed, 0, MAX_SPEED);
        }
      }
    } else {
      p.airTime += dt;
      p.vy -= GRAVITY * dt;
      p.y += p.vy * dt;
      if (p.vy < 0 && p.y <= surf.height) {
        p.y = surf.height;
        this.land(surf);
      }
      if (p.y > surf.height + .2) this.tryGrind(dt);
    }

    // Board pitch follows terrain
    if (!p.airborne) {
      const hAhead = this.world.surfaceAt(
        p.x + Math.sin(p.yaw) * .45,
        p.z - Math.cos(p.yaw) * .45
      ).height;
      const hBehind = this.world.surfaceAt(
        p.x - Math.sin(p.yaw) * .45,
        p.z + Math.cos(p.yaw) * .45
      ).height;
      const targetPitch = Math.atan2(hAhead - hBehind, .9);
      p.pitch = damp(p.pitch, targetPitch, 12, dt);
    } else {
      p.pitch = damp(p.pitch, clamp(-p.vy * .025, -.24, .2), 3, dt);
    }

    // tricks visuals return to zero once on the ground
    if (!p.airborne) {
      p.flipTarget = 0;
      p.shoveTarget = 0;
      p.flipAngle = damp(p.flipAngle, 0, 20, dt);
      p.shoveAngle = damp(p.shoveAngle, 0, 20, dt);
      p.spinAngle = damp(p.spinAngle, 0, 20, dt);
      p.spinTarget = 0;
    }

    if (p.airborne && p.speed > 5) {
      // speed lines in the form of dust trails from the launch lip (sparse)
      if (Math.random() < dt * 1.5) this.spawnAirTrail();
    }
  }

  handleAction(action) {
    const p = this.player;
    this.tutorialTimer = Math.max(this.tutorialTimer, 10);
    if (action === 'ollie') {
      if (p.grinding) {
        this.leaveGrind(true);
      } else if (!p.airborne) {
        p.airborne = true;
        p.vy = 7.4 + Math.min(p.speed, 12) * .075;
        p.y += .02;
        p.airTime = 0;
        p.flipAngle = p.flipTarget = 0;
        p.shoveAngle = p.shoveTarget = 0;
        p.spinAngle = p.spinTarget = 0;
        p.quickTricks = [];
        this.audio.ollie();
        this.shake = Math.max(this.shake, .22);
        this.spawnDust(8, true);
        this.addTrick('Ollie', SCORE.ollie, 'ollie');
        if (navigator.vibrate) navigator.vibrate(6);
      }
      return;
    }

    if (!p.airborne && !p.grinding) return;

    if (action === 'kickflip') {
      if (p.flipAngle < .05) {
        p.flipTarget += TAU;
        this.addTrick('Kickflip', SCORE.kickflip, 'kickflip');
      }
    } else if (action === 'shove') {
      p.shoveTarget += TAU;
      this.addTrick('Shove-it', SCORE.shove, 'shove');
    } else if (action === 'spin') {
      p.spinTarget += TAU;
      this.addTrick('360 Spin', SCORE.spin, 'spin');
    }
    this.audio.trick();
    this.shake = Math.max(this.shake, .16);
    if (navigator.vibrate) navigator.vibrate(5);
  }

  addTrick(name, points, key) {
    const p = this.player;
    p.quickTricks.push({ name, points, key });
    this.pending += points;
    this.comboCount++;
    this.comboMult = Math.min(9, 1 + this.comboCount * .5);
    this.comboTimer = 3.4;
    this.ui.combo.classList.add('active');
    this.ui.comboMult.textContent = `×${this.comboMult.toFixed(1).replace('.0', '')}`;
    this.ui.comboMult.classList.remove('bump');
    void this.ui.comboMult.offsetWidth;
    this.ui.comboMult.classList.add('bump');
    this.addFeed(name.toUpperCase(), points);
    this.audio.combo(this.comboCount);
    this.spawnDust(3, false);
  }

  land(surf) {
    const p = this.player;
    const impact = clamp(Math.abs(p.vy) / 9, 0, 1);
    p.airborne = false;
    p.vy = 0;
    p.y = surf.height;
    p.surfaceY = surf.height;
    p.pitch = 0;
    this.skater.triggerLanding(.4 + impact * .7);
    this.shake = Math.max(this.shake, .18 + impact * .4);
    this.audio.land(.5 + impact * .5);
    this.spawnDust(10 + Math.floor(impact * 14), true, surf.height);
    if (navigator.vibrate) navigator.vibrate(12);

    const airBank = Math.floor(Math.min(p.airTime, 3) * 110);
    if (airBank > 0) this.pending += airBank;

    const wasSpinning = p.spinTarget > 0;
    const spinRemainder = Math.abs(p.spinTarget - p.spinAngle);
    let sketchy = false;
    if (wasSpinning && spinRemainder > 1.2) sketchy = true;
    if (p.flipTarget > 0 && Math.abs(p.flipTarget - p.flipAngle) > 1.1) sketchy = true;
    if (p.shoveTarget > 0 && Math.abs(p.shoveTarget - p.shoveAngle) > 1.1) sketchy = true;

    if (sketchy) {
      this.pending *= .55;
      this.shake = Math.max(this.shake, .6);
      this.skater.setBail(.65);
      this.addFeed('SKETCHY LANDING', 0);
      this.audio.land(1);
      this.spawnDust(16, true, surf.height);
      setTimeout(() => this.skater.setBail(0), 450);
    }

    if (this.pending > 0 || this.comboCount > 0) {
      const total = Math.round(this.pending * this.comboMult);
      this.score += total;
      this.bestCombo = Math.max(this.bestCombo, total);
      this.tricksLanded += p.quickTricks.length || (p.grinding ? 1 : 0);
      this.showPop(`+${total.toLocaleString('en-US')}`, p.x, p.y + 1.7, p.z, 'big');
      if (this.comboMult > 1) {
        this.showPop(`×${this.comboMult.toFixed(1).replace('.0', '')} COMBO`, p.x, p.y + 2.25, p.z, '');
      }
      this.addFeed(`CLEAN LANDING`, 0, 'landing');
      this.audio.combo(Math.min(8, this.comboMult));
    }
    this.pending = 0;
    this.comboPoints = 0;
    this.comboCount = 0;
    this.comboMult = 1;
    this.comboTimer = 0;
    p.flipTarget = 0;
    p.shoveTarget = 0;
    p.spinTarget = 0;
    p.flipAngle = 0;
    p.shoveAngle = 0;
    p.spinAngle = 0;
    p.quickTricks = [];
    this.skater.snapTricks?.();
    this.ui.combo.classList.remove('active');
    this.ui.comboMult.textContent = '×1';
    this.ui.comboFill.style.width = '0%';
    this.ui.comboPoints.textContent = '0 PTS';

    // quick camera kick
    this.shakeRoll = (Math.random() - .5) * .02;
  }

  bankCombo(silent = false) {
    if (this.pending <= 0) {
      this.resetCombo();
      return;
    }
    const total = Math.round(this.pending * this.comboMult);
    this.score += total;
    this.bestCombo = Math.max(this.bestCombo, total);
    this.tricksLanded += this.player.quickTricks.length;
    if (!silent) {
      this.showPop(`+${total.toLocaleString('en-US')}`, this.player.x, this.player.y + 1.5, this.player.z, 'big');
      this.audio.combo(Math.min(8, this.comboMult));
    }
    this.pending = 0;
    this.comboPoints = 0;
    this.comboCount = 0;
    this.comboMult = 1;
    this.comboTimer = 0;
    this.player.quickTricks = [];
    this.ui.combo.classList.remove('active');
    this.ui.comboMult.textContent = '×1';
    this.ui.comboPoints.textContent = '0 PTS';
    this.ui.comboFill.style.width = '0%';
  }

  resetCombo() {
    this.comboTimer = 0;
    this.comboMult = 1;
    this.comboCount = 0;
    this.pending = 0;
    this.ui.combo.classList.remove('active');
    this.ui.comboMult.textContent = '×1';
    this.ui.comboFill.style.width = '0%';
    this.ui.comboPoints.textContent = '0 PTS';
  }

  checkTapes() {
    const p = this.player;
    for (const tape of this.world.tapes) {
      if (tape.userData.collected) continue;
      const dx = p.x - tape.position.x;
      const dz = p.z - tape.position.z;
      const dy = (p.y + 1.0) - tape.position.y;
      if (dx * dx + dz * dz < 1.45 && Math.abs(dy) < 1.2) {
        this.collectTape(tape);
      }
    }
  }

  collectTape(tape) {
    this.world.collectTape(tape);
    this.tapes++;
    this.runTime = Math.max(0, this.runTime - 5);
    const bonus = Math.round(SCORE.tape * this.comboMult);
    this.score += bonus;
    this.comboCount++;
    this.comboMult = Math.min(9, 1 + this.comboCount * .5);
    this.comboTimer = 3.8;
    this.ui.combo.classList.add('active');
    this.ui.comboMult.textContent = `×${this.comboMult.toFixed(1).replace('.0', '')}`;
    this.audio.tape();
    this.spawnBurst(tape.position);
    this.showPop('TAPE +5 SEC', tape.position.x, tape.position.y + .5, tape.position.z, 'coral');
    this.showPop(`+${bonus.toLocaleString('en-US')}`, tape.position.x, tape.position.y + 1.0, tape.position.z, '');
    this.addFeed('GOLDEN TAPE +5 SEC', bonus, 'tape');
    this.shake = Math.max(this.shake, .15);
    if (navigator.vibrate) navigator.vibrate([6, 20, 6]);
    this.ui.tapeCount.textContent = String(this.tapes);
    if (this.tapes >= this.world.tapes.length && !this.allTapes) {
      this.allTapes = true;
      this.score += 10000;
      this.showObjective('ALL TAPES FOUND · +10,000', 5);
      this.addFeed('TAPE COLLECTION COMPLETE', 10000, 'tape');
    }
  }

  tryGrind(dt) {
    const p = this.player;
    if (p.grinding || p.vy > 1.2 || p.lastRailExit > 0) return;
    let best = null;
    let bestT = 0;
    let bestDist = .56;
    for (let i = 0; i < this.world.rails.length; i++) {
      const r = this.world.rails[i];
      const ax = r.a[0], az = r.a[1], bx = r.b[0], bz = r.b[1];
      const dx = bx - ax, dz = bz - az;
      const len2 = dx * dx + dz * dz;
      let t = ((p.x - ax) * dx + (p.z - az) * dz) / len2;
      t = clamp(t, 0, 1);
      const px = ax + dx * t;
      const pz = az + dz * t;
      const dist = Math.hypot(p.x - px, p.z - pz);
      const heightOk = p.y > r.y - .25 && p.y < r.y + 1.25;
      if (dist < bestDist && heightOk) {
        bestDist = dist;
        best = { rail: r, index: i };
        bestT = t;
      }
    }
    if (!best) return;
    const r = best.rail;
    const dx = r.b[0] - r.a[0];
    const dz = r.b[1] - r.a[1];
    const forward = new THREE.Vector3(Math.sin(p.yaw), 0, -Math.cos(p.yaw));
    const seg = new THREE.Vector3(dx, 0, dz).normalize();
    p.grinding = true;
    p.airborne = false;
    p.rail = best.rail;
    p.grindIndex = best.index;
    p.railT = bestT;
    p.railDir = forward.dot(seg) >= 0 ? 1 : -1;
    p.y = r.y + .02;
    p.vy = 0;
    p.flipTarget = 0;
    p.shoveTarget = 0;
    p.spinTarget = 0;
    p.flipAngle = 0;
    p.shoveAngle = 0;
    p.spinAngle = 0;
    this.skater.snapTricks?.();
    this.audio.setGrind(true);
    this.addTrick('50-50 Grind', 60, 'grind');
    this.showPop('GRIND', p.x, p.y + 1.4, p.z, 'coral');
    this.spawnSparks(20);
    this.shake = Math.max(this.shake, .12);
    if (navigator.vibrate) navigator.vibrate([5, 15, 5]);
  }

  updateGrind(dt) {
    const p = this.player;
    const r = p.rail;
    if (!r) { p.grinding = false; return; }
    const ax = r.a[0], az = r.a[1], bx = r.b[0], bz = r.b[1];
    const dx = bx - ax, dz = bz - az;
    const len = Math.hypot(dx, dz);
    p.railT += (p.railDir * p.speed * dt) / len;
    if (p.railT <= .005 || p.railT >= .995) {
      this.leaveGrind(false);
      return;
    }
    p.x = ax + dx * p.railT;
    p.z = az + dz * p.railT;
    p.y = r.y + .02;
    p.surfaceY = r.y;
    p.yaw = Math.atan2(dx * p.railDir, -dz * p.railDir);
    p.yaw = mod(p.yaw + Math.PI, TAU) - Math.PI;
    p.speed = Math.max(5.5, p.speed - dt * .1);
    p.pitch = 0;

    this.pending += SCORE.grind * dt;
    this.comboPoints += SCORE.grind * dt;
    this.comboTimer = Math.max(this.comboTimer, 1.1);
    this.ui.comboFill.style.width = '100%';
    this.ui.comboPoints.textContent = `${Math.round(this.pending)} PTS`;
    if (Math.random() < dt * 3) this.spawnSparks(2);
  }

  leaveGrind(jump) {
    const p = this.player;
    if (!p.grinding) return;
    p.grinding = false;
    p.rail = null;
    p.lastRailExit = .32;
    this.audio.setGrind(false);
    if (jump) {
      p.airborne = true;
      p.vy = 6.2;
      p.y += .05;
      p.airTime = 0;
      this.audio.ollie();
      this.spawnSparks(12);
      this.skater.triggerLanding(.2);
    } else {
      // roll off the end cleanly
      p.airborne = true;
      p.vy = 2.2;
      p.airTime = 0;
      p.speed *= .9;
    }
    this.skater.snapTricks?.();
    this.shake = Math.max(this.shake, .1);
  }

  updateSkater(dt) {
    const p = this.player;
    const state = this.makeSkaterState();
    this.skater.update(dt, state);
  }

  makeSkaterState() {
    const p = this.player;
    return {
      x: p.x, y: p.y, z: p.z, yaw: p.yaw,
      speed: p.speed, steer: p.steer, pitch: p.pitch,
      airborne: p.airborne,
      grinding: p.grinding,
      pushing: this.input.pushing && !p.airborne,
      flip: p.flipAngle / TAU,
      shove: p.shoveAngle / TAU,
      spinAngle: p.spinAngle,
      bail: p.bail,
      surfaceY: p.surfaceY
    };
  }

  updateGrindFX(dt) {
    const p = this.player;
    if (!p.grinding) return;
    if (Math.random() < dt * 24) {
      this.spawnSparks(1);
    }
    if (Math.random() < dt * 8) {
      this.particles.spawn(p.x, p.y + .1, p.z, 1, {
        color: 0xffc76a, spread: 1.4, up: .8, size: .07, life: .35, gravity: 8
      });
    }
  }

  updateRailPrompt() {
    const p = this.player;
    if (p.airborne && !p.grinding) {
      let near = false;
      for (const r of this.world.rails) {
        const ax = r.a[0], az = r.a[1], bx = r.b[0], bz = r.b[1];
        const dx = bx - ax, dz = bz - az;
        const len2 = dx * dx + dz * dz;
        let t = ((p.x - ax) * dx + (p.z - az) * dz) / len2;
        t = clamp(t, 0, 1);
        const dist = Math.hypot(p.x - (ax + dx * t), p.z - (az + dz * t));
        if (dist < 3.2 && p.y > r.y - .4) { near = true; break; }
      }
      this.ui.grindPrompt.classList.toggle('show', near);
    } else {
      this.ui.grindPrompt.classList.remove('show');
    }
  }

  spawnDust(n, strong = false, surfY = null) {
    const p = this.player;
    const y = surfY ?? (p.surfaceY || 0);
    this.particles.spawn(p.x, y + .05, p.z, n, {
      color: strong ? 0xf0d7ad : 0xd9bf91,
      spread: strong ? 2.8 : 1.2,
      up: strong ? 1.2 : .45,
      size: strong ? .16 : .1,
      life: strong ? .8 : .45,
      gravity: 1.4
    });
  }

  spawnSparks(n) {
    const p = this.player;
    const fwd = new THREE.Vector3(Math.sin(p.yaw), 0, -Math.cos(p.yaw));
    this.particles.spawn(p.x, p.y + .03, p.z, n, {
      color: 0xffc35a,
      spread: 2.5, up: 2.4, size: .075, life: .36, gravity: 6.5,
      direction: fwd
    });
  }

  spawnAirTrail() {
    const p = this.player;
    this.particles.spawn(p.x, p.y + .1, p.z, 1, {
      color: 0xe8c58f, spread: .5, up: .2, size: .055, life: .45, gravity: .5
    });
  }

  spawnBurst(pos) {
    this.particles.burst(pos.x, pos.y, pos.z);
    for (let i = 0; i < 20; i++) {
      this.particles.spawn(pos.x, pos.y, pos.z, 1, {
        color: i % 2 ? 0xffd76a : 0xfff0ba,
        spread: 5, up: 4, size: .12, life: 1.1, gravity: 4
      });
    }
  }

  updateCamera(dt) {
    const p = this.player;
    const mode = this.mode;
    if (mode === 'menu' || mode === 'boot') return;
    if (mode === 'result') return;

    const forward = new THREE.Vector3(Math.sin(p.yaw), 0, -Math.cos(p.yaw));
    const right = new THREE.Vector3(Math.cos(p.yaw), 0, Math.sin(p.yaw));
    const portrait = window.innerHeight > window.innerWidth;
    const airLift = p.airborne ? Math.min(1, p.y * .03) : 0;
    const speedPull = Math.min(1, p.speed / MAX_SPEED);

    const dist = portrait ? 7.4 + speedPull * .6 : 8.5 + speedPull * .8;
    const height = portrait ? 3.55 + airLift * .25 : 3.75 + airLift * .25;
    const side = portrait ? 2.1 : 2.6;

    const desired = new THREE.Vector3(
      p.x - forward.x * dist + right.x * side,
      p.y + height,
      p.z - forward.z * dist + right.z * side
    );
    // Keep the camera inside the plaza so it never clips through walls.
    desired.x = clamp(desired.x, -31.7, 31.7);
    desired.z = clamp(desired.z, -36.6, 31.8);
    const look = new THREE.Vector3(
      p.x + forward.x * 4.1,
      p.y + 1.05,
      p.z + forward.z * 4.1
    );

    if (!this.followInit) {
      this.cameraPos.copy(desired);
      this.cameraTarget.copy(look);
      this.followInit = true;
    } else {
      const posLambda = mode === 'countdown' ? 4.5 : 6.8;
      this.cameraPos.lerp(desired, 1 - Math.exp(-posLambda * dt));
      this.cameraTarget.lerp(look, 1 - Math.exp(-6.5 * dt));
    }

    // Camera shake
    this.shake = Math.max(0, this.shake - dt * 2.2);
    const s = this.shake;
    const t = this.time * 70;
    const shakeX = Math.sin(t * 1.3) * s * .12;
    const shakeY = Math.cos(t * 1.7) * s * .1;
    const shakeZ = Math.sin(t * 2.1) * s * .05;
    this.camera.position.set(
      this.cameraPos.x + shakeX,
      this.cameraPos.y + shakeY,
      this.cameraPos.z + shakeZ
    );
    this.camera.lookAt(this.cameraTarget);
    this.camera.rotation.z += Math.sin(this.time * 55) * s * .012 + this.shakeRoll;
    this.shakeRoll *= Math.pow(.02, dt);

    const targetFov = (portrait ? 61 : 58) + speedPull * 6 + (p.airborne ? 2 : 0);
    this.camera.fov = damp(this.camera.fov, targetFov, 3.2, dt);
    this.camera.updateProjectionMatrix();
  }

  updateHud(dt, menu = false) {
    if (this._lastScore !== Math.round(this.score)) {
      this._lastScore = Math.round(this.score);
      this.ui.score.textContent = this._lastScore.toLocaleString('en-US');
      this.ui.score.classList.remove('bump');
      void this.ui.score.offsetWidth;
      this.ui.score.classList.add('bump');
    }

    if (!menu) {
      const secs = Math.ceil(this.timer);
      const m = Math.floor(secs / 60);
      const s = secs % 60;
      const label = `${m}:${s.toString().padStart(2, '0')}`;
      if (label !== this._lastTimer) {
        this._lastTimer = label;
        this.ui.timerText.textContent = label;
        this.ui.timerArc.style.strokeDashoffset = String(113 * (1 - this.timer / RUN_TIME));
        this.ui.timer.classList.toggle('low', this.timer < 20);
      }
      const mph = Math.round(this.player.speed * 2.237);
      if (mph !== this._lastSpeed) {
        this._lastSpeed = mph;
        this.ui.speedValue.textContent = String(mph);
        const on = Math.round(clamp(mph / 34, 0, 1) * 5);
        this.ui.speedBars.forEach((b, i) => b.classList.toggle('on', i < on));
      }
      this.ui.tapeCount.textContent = String(this.tapes);
    }

    // combo bar
    if (this.comboTimer > 0) {
      this.ui.comboFill.style.width = `${clamp(this.comboTimer / 3.4, 0, 1) * 100}%`;
      this.ui.comboPoints.textContent = `${Math.round(this.pending)} PTS`;
    }

    // score card pulse
    if (this.score > 0) this.ui.hudBest.textContent = this.bestScore.toLocaleString('en-US');
  }

  addFeed(text, points, cls = '') {
    const el = document.createElement('div');
    el.className = `trick-line ${cls}`;
    if (points > 0) {
      el.innerHTML = `${text}<b>+${Math.round(points).toLocaleString('en-US')}</b>`;
    } else {
      el.textContent = text;
    }
    this.ui.trickFeed.appendChild(el);
    while (this.ui.trickFeed.children.length > 4) this.ui.trickFeed.firstElementChild.remove();
    setTimeout(() => {
      el.classList.add('out');
      setTimeout(() => el.remove(), 450);
    }, 1650);
  }

  showPop(text, x, y, z, cls = '') {
    const el = document.createElement('div');
    el.className = `score-pop ${cls}`;
    el.textContent = text;
    this.ui.popLayer.appendChild(el);
    const pos = new THREE.Vector3(x, y, z);
    this._project = this._project || new THREE.Vector3();
    const projected = pos.clone().project(this.camera);
    const sx = (projected.x * .5 + .5) * window.innerWidth;
    const sy = (-projected.y * .5 + .5) * window.innerHeight;
    el.style.left = `${sx}px`;
    el.style.top = `${sy}px`;
    el._world = pos;
    el._age = 0;
    el._life = 1;
    setTimeout(() => el.remove(), 1200);
  }

  updatePops() {
    const list = this.ui.popLayer.children;
    if (!list.length) return;
    for (const el of list) {
      if (!el._world) continue;
      const projected = el._world.clone().project(this.camera);
      el.style.left = `${(projected.x * .5 + .5) * window.innerWidth}px`;
      el.style.top = `${(-projected.y * .5 + .5) * window.innerHeight}px`;
    }
  }

  showObjective(text, seconds = 3) {
    this.ui.objectiveText.textContent = text;
    this.ui.objective.classList.add('show');
    clearTimeout(this._objectiveTimeout);
    this._objectiveTimeout = setTimeout(() => {
      this.ui.objective.classList.remove('show');
    }, seconds * 1000);
  }
}
