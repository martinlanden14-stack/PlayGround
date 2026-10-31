import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
import { clone as cloneSkeleton } from 'three/addons/utils/SkeletonUtils.js'
import { Arena } from './Arena.js'
import { Fighter, FIGHTERS } from './Fighter.js'
import { FX } from './FX.js'
import { AudioEngine } from './Audio.js'
import { UI } from './UI.js'

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
const lerp = (a, b, t) => a + (b - a) * t
const smooth = (t) => { t = clamp(t, 0, 1); return t * t * (3 - 2 * t) }
const formatTime = (seconds) => {
  const s = Math.max(0, Math.floor(seconds))
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}

const GradeShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uVignette: { value: 0.32 },
    uGrain: { value: 0.028 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform sampler2D tDiffuse;
    uniform float uTime, uVignette, uGrain;
    float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    void main() {
      vec2 uv = vUv;
      vec2 d = uv - 0.5;
      float r2 = dot(d, d);
      vec2 ca = d * r2 * 0.006;
      vec3 col;
      col.r = texture2D(tDiffuse, uv + ca).r;
      col.g = texture2D(tDiffuse, uv).g;
      col.b = texture2D(tDiffuse, uv - ca).b;
      col *= 1.0 - uVignette * smoothstep(0.12, 0.72, r2);
      // subtle cool shadows / warm highlights
      float luma = dot(col, vec3(0.299, 0.587, 0.114));
      col += vec3(-0.012, 0.008, 0.022) * (1.0 - luma) * 0.55;
      col += vec3(0.022, 0.009, -0.008) * luma * 0.35;
      float grain = hash(uv * vec2(1920.0, 1080.0) + uTime * 19.0) - 0.5;
      col += grain * uGrain;
      gl_FragColor = vec4(col, 1.0);
    }
  `,
}

export class Game {
  constructor(canvas) {
    this.canvas = canvas
    this.elapsed = 0
    this.fps = 60
    this.frames = 0
    this.state = 'boot'
    this.playerId = 'nyx'
    this.round = 1
    this.wins = { p: 0, e: 0 }
    this.input = { move: 0, blocking: false }
    this.punchChain = 0
    this.timeScale = 1
    this.hitStop = 0
    this.shake = 0
    this.shakeTime = 0
    this.cameraFocus = null
    this.introTime = 0
    this.roundEndTimer = 0
    this.finisherTime = 0
    this.finisherDone = false
    this.finisherEndTimer = 0
    this.matchElapsed = 0
    this.comboCount = 0
    this.lastPlayerHit = -10
    this.matchStats = { damage: 0, maxCombo: 0, time: '00:00' }
    this.aiCooldown = 0.8
    this.aiBlockTimer = 0
    this.aiMove = 0
    this.quality = {
      mobile: window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 900,
      low: false,
    }
    this.lowQuality = false
    this.lastFrameTime = performance.now()

    this.ui = new UI({
      onPlay: () => this.beginQuickFight(),
      onChoose: () => this.showSelect(),
      onSelectBack: () => this.showTitle(),
      onEnterArena: () => this.beginQuickFight(),
      onSelectFighter: (id) => this.selectFighter(id),
      onRematch: () => this.beginQuickFight(),
      onResultSelect: () => this.showSelect(),
      onMenu: () => this.showTitle(),
      onResume: () => this.resume(),
      onRestart: () => this.beginQuickFight(),
      onQuit: () => this.showTitle(),
      onHow: () => this.ui.showHow(),
      onHowClose: () => this.ui.closeHow(),
      onSoundToggle: (on) => this.audio.setMuted(!on),
      onQuality: () => this.toggleQuality(),
      onPause: () => this.togglePause(),
      onMove: (axis) => { this.input.move = Math.abs(axis) > 0.06 ? axis : 0 },
      onBlock: (on) => { this.input.blocking = on; if (this.player && this.state === 'fight') this.player.setBlocking(on) },
      onAction: (action) => this.handleAction(action),
      onUi: () => this.audio.ui(),
    })
    this.audio = new AudioEngine()

    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x040708)
    this.scene.fog = new THREE.FogExp2(0x071015, 0.022)

    this.camera = new THREE.PerspectiveCamera(38, 1, 0.08, 90)
    this.camera.position.set(0, 1.35, 5.4)
    this.cameraLook = new THREE.Vector3(0, 1.05, 0)
    this.cameraTarget = new THREE.Vector3(0, 1.35, 5.4)
    this.cameraLookTarget = new THREE.Vector3(0, 1.05, 0)

    this.renderer = new THREE.WebGLRenderer({
      canvas, antialias: true, powerPreference: 'high-performance', alpha: false, stencil: false,
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.quality.mobile ? 1.45 : 1.75))
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.08
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.info.autoReset = false

    this.setupEnvironment()
    this.setupPost()
    this.arena = new Arena(this.scene, this.quality)
    this.fx = new FX(this.scene)

    this.fighters = {
      nyx: new Fighter(this.scene, FIGHTERS.nyx, { side: 'player', x: -0.7 }),
      kaelus: new Fighter(this.scene, FIGHTERS.kaelus, { side: 'enemy', x: 0.7 }),
    }
    for (const fighter of Object.values(this.fighters)) {
      fighter.onProjectile = (action) => this.spawnSpecial(fighter, action)
      fighter.onActionEvent = (event, action) => this.handleActionEvent(fighter, event, action)
    }
    this.player = this.fighters.nyx
    this.enemy = this.fighters.kaelus
    this.setRoles()
    this.layout()
    this.resetFightersForMenu()
    this.ui.setFighterInfo(this.player.def, this.enemy.def)
    this.ui.setPortrait('nyx', '')
    this.ui.setPortrait('kaelus', '')
    this.ui.setQuality('HIGH')
    this.ui.setLoading(22)
    this.ui.showTitle()

    this.modelsReady = false
    Promise.all(Object.values(this.fighters).map((fighter) => fighter.characterReady))
      .then(() => {
        this.modelsReady = true
        this.ui.setLoading(100)
        return document.fonts?.ready || Promise.resolve()
      })
      .then(() => this.makePortraits())
      .catch((error) => {
        this.modelsReady = true
        console.warn('Character preload failed', error)
      })

    this.bindResize()
    this.clock = new THREE.Clock()
    this.loop = this.loop.bind(this)
    this.animate = this.animate.bind(this)
    requestAnimationFrame(this.animate)
  }

  setupEnvironment() {
    const pmrem = new THREE.PMREMGenerator(this.renderer)
    pmrem.compileEquirectangularShader()
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    this.scene.environmentIntensity = 0.22
    pmrem.dispose()
  }

  setupPost() {
    const size = new THREE.Vector2(window.innerWidth, window.innerHeight)
    const rt = new THREE.WebGLRenderTarget(size.x, size.y, {
      type: THREE.HalfFloatType,
      samples: this.quality.mobile ? 0 : 2,
    })
    this.composer = new EffectComposer(this.renderer, rt)
    this.composer.setSize(size.x, size.y)
    this.renderPass = new RenderPass(this.scene, this.camera)
    this.composer.addPass(this.renderPass)
    this.bloom = new UnrealBloomPass(size, this.quality.mobile ? 0.42 : 0.56, 0.52, 0.76)
    this.composer.addPass(this.bloom)
    this.outputPass = new OutputPass()
    this.composer.addPass(this.outputPass)
    this.grade = new ShaderPass(GradeShader)
    this.grade.uniforms.uVignette.value = 0.28
    this.composer.addPass(this.grade)
  }

  bindResize() {
    window.addEventListener('resize', () => this.onResize())
    window.addEventListener('orientationchange', () => setTimeout(() => this.onResize(), 150))
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && ['fight', 'intro'].includes(this.state)) this.togglePause()
    })
  }

  onResize() {
    const w = window.innerWidth, h = window.innerHeight
    this.camera.aspect = w / h
    this.layout()
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(w, h)
    this.composer.setSize(w, h)
    this.bloom.resolution.set(w, h)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.lowQuality ? 1 : (this.quality.mobile ? 1.45 : 1.75)))
    if (this.state === 'title' || this.state === 'select') this.resetFightersForMenu()
    else this.clampPositions()
  }

  layout() {
    const aspect = window.innerWidth / window.innerHeight
    const portrait = aspect < 0.82
    this.layoutInfo = portrait
      ? { startX: 0.56, bounds: 1.12, gap: 0.56, fitWidth: 2.68, fov: 50, portrait: true }
      : { startX: 1.02, bounds: 2.38, gap: 0.72, fitWidth: 5.35, fov: 38, portrait: false }
    this.camera.fov = this.layoutInfo.fov
    this.camera.aspect = aspect
    this.baseDist = Math.max(4.15, this.layoutInfo.fitWidth / (2 * Math.tan((this.camera.fov * Math.PI) / 360) * aspect))
    this.camera.updateProjectionMatrix()
  }

  resetFightersForMenu() {
    if (!this.player || !this.enemy) return
    const x = this.layoutInfo.startX * (this.layoutInfo.portrait ? 0.92 : 1.0)
    this.player.reset(-x)
    this.enemy.reset(x)
    this.player.setFacing(1)
    this.enemy.setFacing(-1)
    this.player.setVictory(false)
    this.enemy.setVictory(false)
    this.player.meter = 0
    this.enemy.meter = 0
    this.ui.setHealth('p', 1)
    this.ui.setHealth('e', 1)
    this.ui.setMeter('p', 0)
    this.ui.setMeter('e', 0)
  }

  setRoles() {
    const other = this.playerId === 'nyx' ? 'kaelus' : 'nyx'
    this.player = this.fighters[this.playerId]
    this.enemy = this.fighters[other]
    const x = this.layoutInfo?.startX || 1
    this.player.setPosition(-x)
    this.enemy.setPosition(x)
    this.player.setFacing(1)
    this.enemy.setFacing(-1)
    this.player.root.scale.x = 1
    this.enemy.root.scale.x = -1
    this.ui.setFighterInfo(this.player.def, this.enemy.def)
    this.ui.selectCard(this.playerId)
  }

  selectFighter(id) {
    if (!FIGHTERS[id]) return
    this.playerId = id
    this.setRoles()
    this.resetFightersForMenu()
    this.audio.ui()
  }

  beginQuickFight() {
    this.audio.unlock()
    this.startMatch()
  }

  showTitle() {
    this.state = 'title'
    this.timeScale = 1
    this.resetFightersForMenu()
    this.ui.showTitle()
    this.ui.hidePrompt()
    this.ui.setBlood(false)
    this.player.setVictory(false)
    this.enemy.setVictory(false)
    this.input.move = 0
    this.input.blocking = false
  }

  showSelect() {
    this.audio.unlock()
    this.state = 'select'
    this.timeScale = 1
    this.setRoles()
    this.resetFightersForMenu()
    this.ui.showSelect()
    this.ui.setBlood(false)
  }

  startMatch() {
    this.audio.unlock()
    this.state = 'intro'
    this.round = 1
    this.wins = { p: 0, e: 0 }
    this.matchElapsed = 0
    this.matchStats = { damage: 0, maxCombo: 0, time: '00:00' }
    this.comboCount = 0
    this.lastPlayerHit = -10
    this.punchChain = 0
    this.aiCooldown = 0.9
    this.aiBlockTimer = 0
    this.input.move = 0
    this.input.blocking = false
    this.player.meter = 0
    this.enemy.meter = 0
    this.ui.setHealth('p', 1)
    this.ui.setHealth('e', 1)
    this.ui.setMeter('p', 0)
    this.ui.setMeter('e', 0)
    this.ui.setRoundPips('p', 0)
    this.ui.setRoundPips('e', 0)
    this.ui.setBlood(false)
    this.ui.showFight()
    this.setRoles()
    this.startRound(1)
  }

  startRound(round) {
    this.round = round
    this.state = 'intro'
    this.introTime = 0
    this.fightAnnounced = false
    this.timeScale = 1
    this.hitStop = 0
    this.roundEndTimer = 0
    this.finisherTime = 0
    this.finisherDone = false
    this.finisherEndTimer = 0
    this.comboCount = 0
    this.lastPlayerHit = -10
    this.player.reset(-this.layoutInfo.startX)
    this.enemy.reset(this.layoutInfo.startX)
    this.player.setFacing(1)
    this.enemy.setFacing(-1)
    this.player.setVictory(false)
    this.enemy.setVictory(false)
    this.player.meter = Math.min(100, this.player.meter)
    this.enemy.meter = Math.min(100, this.enemy.meter)
    this.aiBlockTimer = 0
    this.aiCooldown = 0.9
    for (const projectile of this.fx.projectiles) this.fx.destroyProjectile(projectile, false)
    this.fx.projectiles.length = 0
    this.ui.setHealth('p', 1)
    this.ui.setHealth('e', 1)
    this.ui.setMeter('p', this.player.meter / 100)
    this.ui.setMeter('e', this.enemy.meter / 100)
    this.ui.setTimer(99)
    this.ui.setRound(round)
    this.ui.setRoundPips('p', this.wins.p)
    this.ui.setRoundPips('e', this.wins.e)
    this.ui.hidePrompt()
    this.ui.combo(0)
    this.ui.setBlood(false)
    this.ui.showFight()
    this.ui.announce(`ROUND ${round}`, '', round === 1 ? 'THE ASHEN CITADEL' : 'NO MERCY', 1500)
    this.audio.announce()
    this.cameraFocus = null
  }

  togglePause() {
    if (this.state === 'paused') { this.resume(); return }
    if (!['fight', 'intro'].includes(this.state)) return
    this.pausedFrom = this.state
    this.state = 'paused'
    this.timeScale = 0
    this.ui.showPause()
    this.ui.hidePrompt()
  }

  resume() {
    if (this.state !== 'paused') return
    this.state = this.pausedFrom || 'fight'
    this.timeScale = 1
    this.ui.hidePause()
  }

  toggleQuality() {
    this.lowQuality = !this.lowQuality
    this.applyQuality()
  }

  applyQuality() {
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.lowQuality ? 1 : (this.quality.mobile ? 1.45 : 1.75)))
    this.composer.setSize(window.innerWidth, window.innerHeight)
    this.bloom.strength = this.lowQuality ? 0.26 : (this.quality.mobile ? 0.42 : 0.56)
    this.renderer.shadowMap.enabled = !this.lowQuality
    this.ui.setQuality(this.lowQuality ? 'PERFORMANCE' : 'HIGH')
  }

  handleAction(action) {
    if (this.state !== 'fight' || !this.player || this.player.dead) return
    const p = this.player
    if (action === 'jump') {
      if (p.airborne || p.action || p.hitStun > 0) return
      p.root.position.y = 0.03
      p.airborne = true
      p.jumpVelocity = 5.25
      p.setBlocking(false)
      this.audio.whoosh(0.45)
      return
    }
    if (action === 'block') return
    if (p.action && !p.canAct()) {
      if (['punch', 'kick'].includes(action)) {
        const next = action === 'punch' ? (this.punchChain % 2 ? 'jab' : 'cross') : 'kick'
        p.queueAction(next)
      }
      return
    }
    if (action === 'punch') {
      const name = this.punchChain % 2 ? 'cross' : 'jab'
      this.punchChain++
      p.startAction(name)
      this.audio.whoosh(0.8)
    } else if (action === 'kick') {
      p.startAction(p.airborne ? 'dive' : 'kick')
      this.audio.whoosh(1.1)
    } else if (action === 'special') {
      if (p.meter < 100) { this.audio.ui(); return }
      const low = this.enemy.health / this.enemy.maxHealth <= 0.25
      const close = Math.abs(p.x - this.enemy.x) < 1.65
      if (low && close) {
        this.triggerFinisher()
      } else {
        p.meter = 0
        this.ui.setMeter('p', 0)
        p.startAction('special')
        this.audio.special()
      }
    }
  }

  triggerFinisher() {
    if (this.state !== 'fight' || this.player.meter < 100) return
    if (this.enemy.health / this.enemy.maxHealth > 0.25) return
    if (!this.player.startAction('execution')) return
    this.state = 'finisher'
    this.finisherTime = 0
    this.finisherDone = false
    this.finisherEndTimer = 0
    this.timeScale = 0.58
    this.player.meter = 0
    this.ui.setMeter('p', 0)
    this.ui.hidePrompt()
    this.enemy.setBlocking(false)
    this.enemy.action = null
    this.ui.announce('EXECUTION', '', 'NO MERCY', 1200)
    this.audio.special()
    this.audio.heavy()
  }

  update(dt) {
    const realDt = Math.min(dt, 0.05)
    this.elapsed += realDt
    this.ui.update(realDt)
    if (this.state === 'paused') {
      this.updateCamera(realDt)
      this.grade.uniforms.uTime.value = this.elapsed
      return
    }

    if (this.hitStop > 0) this.hitStop = Math.max(0, this.hitStop - realDt)
    let scaled = realDt * this.timeScale
    if (this.hitStop > 0) scaled *= 0.1

    this.arena.update(scaled, this.elapsed)
    this.fx.update(scaled)

    if (this.state === 'title' || this.state === 'select') {
      this.player.update(realDt, this.elapsed, this.enemy, { moving: 0 })
      this.enemy.update(realDt, this.elapsed, this.player, { moving: 0 })
    } else if (this.state === 'intro') {
      this.updateIntro(realDt)
    } else if (this.state === 'fight') {
      this.updateFight(realDt, scaled)
    } else if (this.state === 'roundEnd') {
      this.updateRoundEnd(realDt, scaled)
    } else if (this.state === 'finisher') {
      this.updateFinisher(realDt, scaled)
    } else if (this.state === 'result') {
      this.player.update(realDt, this.elapsed, this.enemy, { moving: 0 })
      this.enemy.update(realDt, this.elapsed, this.player, { moving: 0 })
    }

    this.updateCamera(realDt)
    this.grade.uniforms.uTime.value = this.elapsed
    document.body.dataset.phase = this.state
  }

  updateIntro(dt) {
    this.introTime += dt
    this.player.update(dt, this.elapsed, this.enemy, { moving: 0 })
    this.enemy.update(dt, this.elapsed, this.player, { moving: 0 })
    if (!this.fightAnnounced && this.introTime > 1.15) {
      this.fightAnnounced = true
      this.ui.announce('FIGHT!', '', '', 900)
      this.audio.announce()
    }
    if (this.introTime > 1.55) {
      this.state = 'fight'
      this.ui.hidePrompt()
    }
  }

  updateFight(dt, scaled) {
    this.matchElapsed += dt
    const p = this.player, e = this.enemy
    p.setBlocking(this.input.blocking)
    e.setBlocking(this.aiBlockTimer > 0)

    // player locomotion
    let playerMove = 0
    if (!p.action && p.hitStun <= 0 && !p.blocking && !p.dead) {
      playerMove = this.input.move
      const speed = p.def.speed * (p.airborne ? 0.65 : 1)
      p.setPosition(clamp(p.x + playerMove * speed * dt, -this.layoutInfo.bounds, e.x - this.layoutInfo.gap))
    }
    p.update(scaled, this.elapsed, e, { moving: playerMove })

    // enemy AI
    this.updateAI(dt)
    e.update(scaled, this.elapsed, p, { moving: this.aiMove })

    this.clampPositions()
    this.checkHits(p, e)
    if (this.state !== 'fight') return
    this.checkHits(e, p)
    if (this.state !== 'fight') return
    this.checkProjectiles()
    if (this.state !== 'fight') return

    // combo window
    if (this.comboCount > 0 && this.elapsed - this.lastPlayerHit > 1.35) {
      this.comboCount = 0
      this.ui.combo(0)
    }

    // timer
    const timeLeft = 99 - this.matchElapsed
    this.ui.setTimer(timeLeft)
    if (timeLeft <= 0) {
      const pRatio = p.health / p.maxHealth
      const eRatio = e.health / e.maxHealth
      this.endRound(pRatio >= eRatio ? p : e, 'time')
      return
    }

    // execution prompt
    const low = e.health / e.maxHealth <= 0.25
    const ready = low && p.meter >= 100 && !p.dead && !p.action
    if (ready) this.ui.showPrompt()
    else this.ui.hidePrompt()
  }

  updateAI(dt) {
    const e = this.enemy, p = this.player
    if (this.aiCooldown > 0) this.aiCooldown -= dt
    if (this.aiBlockTimer > 0) this.aiBlockTimer -= dt
    if (e.dead || e.hitStun > 0 || e.action) { this.aiMove = 0; return }
    const dist = Math.abs(e.x - p.x)
    const dir = Math.sign(p.x - e.x)
    let move = 0

    // reactive guard
    if (p.isAttacking() && dist < 1.55 && this.aiCooldown <= 0 && Math.random() < 0.42) {
      this.aiBlockTimer = 0.28 + Math.random() * 0.18
      this.aiCooldown = 0.55
      this.aiMove = 0
      return
    }
    if (this.aiBlockTimer > 0) { this.aiMove = 0; return }

    if (dist > 1.32) move = dir
    else if (dist < 0.76) move = -dir * 0.55
    else if (Math.random() < 0.012) move = -dir * 0.4

    if (this.aiCooldown <= 0) {
      if (e.meter >= 100 && dist < 2.4 && Math.random() < 0.5) {
        e.meter = 0
        this.ui.setMeter('e', 0)
        e.startAction('special')
        this.audio.special()
        this.aiCooldown = 1.6
      } else if (dist < 1.28) {
        const r = Math.random()
        if (r < 0.38) e.startAction('kick')
        else if (r < 0.58) e.startAction('upper')
        else e.startAction('jab')
        this.audio.whoosh(0.9)
        this.aiCooldown = 0.75 + Math.random() * 0.75
      } else if (dist < 1.9 && Math.random() < 0.25) {
        e.startAction('kick')
        this.aiCooldown = 0.95
      }
    }
    if (!e.action && !e.blocking) {
      const speed = e.def.speed * 0.88
      e.setPosition(clamp(e.x + move * speed * dt, p.x + this.layoutInfo.gap, this.layoutInfo.bounds))
    }
    this.aiMove = move
  }

  clampPositions() {
    const p = this.player, e = this.enemy
    p.setPosition(clamp(p.x, -this.layoutInfo.bounds, e.x - this.layoutInfo.gap))
    e.setPosition(clamp(e.x, p.x + this.layoutInfo.gap, this.layoutInfo.bounds))
  }

  checkHits(attacker, defender) {
    const attack = attacker.getHitInfo()
    if (!attack || defender.dead) return
    const dist = Math.abs(attacker.x - defender.x)
    const vertical = Math.abs(attacker.root.position.y - defender.root.position.y)
    const reach = attack.reach * attacker.def.reach + 0.38
    if (dist > reach) return
    if (vertical > 0.62 && !attack.air) return
    attacker.consumeHit()
    const blocked = defender.blocking && defender.hitStun <= 0
    attack.power = attacker.def.power
    const result = defender.takeHit(attack, blocked)
    this.registerHit(attacker, defender, attack, result, blocked)
  }

  checkProjectiles() {
    const p = this.player, e = this.enemy
    for (const projectile of this.fx.projectiles) {
      if (!projectile.alive) continue
      const target = projectile.owner === p ? e : p
      if (target.dead) continue
      const dist = Math.abs(projectile.x - target.x)
      const y = projectile.group.position.y
      if (dist < 0.48 && Math.abs(y - (target.root.position.y + 1.02)) < 0.95) {
        const blocked = target.blocking && target.hitStun <= 0
        const attack = { damage: projectile.damage, power: projectile.owner.def.power, type: 'special', launcher: false }
        const result = target.takeHit(attack, blocked)
        this.fx.destroyProjectile(projectile, true)
        this.audio.projectile()
        this.registerHit(projectile.owner, target, attack, result, blocked)
        break
      }
      if (Math.abs(projectile.x) > 8) this.fx.destroyProjectile(projectile, false)
    }
  }

  registerHit(attacker, defender, attack, result, blocked) {
    const hitPoint = new THREE.Vector3(
      (attacker.x + defender.x) * 0.5,
      defender.root.position.y + (attack.type === 'kick' ? 1.0 : attack.type === 'special' ? 1.18 : 1.25),
      0.18,
    )
    this.fx.impact(hitPoint, {
      color: blocked ? 0x7fe8ff : (attacker === this.player ? 0xffc879 : 0xff6f52),
      heavy: attack.damage > 80,
      block: blocked,
      blood: !blocked && (attack.damage > 75 || result.ko),
    })
    if (blocked) {
      this.audio.block()
      this.shake = Math.max(this.shake, 0.07)
    } else {
      if (attack.damage > 80) this.audio.heavy()
      else if (attack.type === 'kick') this.audio.kick()
      else this.audio.punch()
      this.shake = Math.max(this.shake, Math.min(0.4, 0.08 + attack.damage / 360))
      this.hitStop = attack.damage > 80 ? 0.075 : 0.045
      if (attack.damage > 70) this.ui.flash(attack.damage > 90 ? '#fff2d6' : '#fff8ec')
    }
    this.ui.setHealth(defender === this.player ? 'p' : 'e', defender.health / defender.maxHealth)
    this.ui.setMeter(attacker === this.player ? 'p' : 'e', attacker.meter / 100)
    this.ui.setMeter(defender === this.player ? 'p' : 'e', defender.meter / 100)
    attacker.addMeter(blocked ? 3 : 11)
    defender.addMeter(blocked ? 4 : 7)
    this.ui.setMeter(attacker === this.player ? 'p' : 'e', attacker.meter / 100)
    this.ui.setMeter(defender === this.player ? 'p' : 'e', defender.meter / 100)

    const screen = this.toScreen(hitPoint)
    this.ui.damageNumber(
      blocked ? 'GUARD' : `${Math.round(result.damage)}`,
      screen.x, screen.y,
      blocked ? '#9fe8ff' : (defender === this.player ? '#ff8a78' : '#ffdba0'),
    )
    if (attacker === this.player && !blocked) {
      this.comboCount = this.elapsed - this.lastPlayerHit < 1.35 ? this.comboCount + 1 : 1
      this.lastPlayerHit = this.elapsed
      this.matchStats.maxCombo = Math.max(this.matchStats.maxCombo, this.comboCount)
      this.matchStats.damage += result.damage
      this.ui.combo(this.comboCount)
    }
    if (result.ko) this.endRound(attacker, 'ko')
  }

  toScreen(world) {
    const v = world.clone().project(this.camera)
    return {
      x: (v.x * 0.5 + 0.5) * window.innerWidth,
      y: (-v.y * 0.5 + 0.5) * window.innerHeight,
    }
  }

  spawnSpecial(fighter, action) {
    const origin = new THREE.Vector3(fighter.x + fighter.facing * 0.43, 1.28, 0.08)
    this.fx.spawnProjectile(fighter, origin, fighter.facing, { ...fighter.def, damage: action.damage })
    this.audio.projectile()
  }

  handleActionEvent(fighter, event) {
    if (fighter !== this.player || this.state !== 'finisher') return
    const enemy = this.enemy
    if (event.type === 'slash') {
      const pos = new THREE.Vector3(enemy.x + (this.player.x - enemy.x) * 0.2, 1.15 + Math.random() * 0.25, 0.35)
      this.fx.slash(pos, 0xffe4b0, Math.random() * Math.PI, 1.6)
      this.fx.burst(pos, 0xffb060, 34, 1.4)
      this.fx.ring(pos, 0xff8a50, 1.5)
      this.shake = Math.max(this.shake, 0.3)
      this.audio.heavy()
      enemy.health = Math.max(1, enemy.health - 30)
      enemy.hitStun = 0.22
      enemy.action = null
      this.ui.setHealth('e', enemy.health / enemy.maxHealth)
      this.ui.flash('#fff0cc')
    } else if (event.type === 'finish') {
      const pos = new THREE.Vector3(enemy.x, 1.1, 0.35)
      this.fx.slash(pos, 0xffffff, 0, 2.2)
      this.fx.burst(pos, 0xff8b40, 90, 2.2)
      this.fx.ring(pos, 0xffd08a, 2.4)
      this.fx.smokeBurst(pos, 0x5a2720, 16, 1.8)
      this.ui.flash('#ffffff')
      this.ui.setBlood(true)
      this.shake = 1.15
      this.audio.ko()
      enemy.takeHit({ damage: 9999, power: 1, type: 'execution', launcher: false }, false)
      this.ui.setHealth('e', 0)
      this.ui.announce('ANNIHILATION', `${this.player.def.name} OWNS THE NIGHT`, 'EXECUTION', 2300)
    }
  }

  endRound(winner, reason = 'ko') {
    if (this.state !== 'fight') return
    const loser = winner === this.player ? this.enemy : this.player
    this.state = 'roundEnd'
    this.roundEndTimer = 0
    this.timeScale = 0.38
    this.hitStop = 0.12
    this.shake = Math.max(this.shake, 0.5)
    this.cameraFocus = loser
    this.wins[winner === this.player ? 'p' : 'e']++
    this.ui.setRoundPips('p', this.wins.p)
    this.ui.setRoundPips('e', this.wins.e)
    this.ui.hidePrompt()
    this.ui.combo(0)
    if (reason === 'ko') {
      winner.setVictory(true)
      this.ui.announce('K.O.', `${winner.def.name} TAKES THE ROUND`, this.wins.p + this.wins.e >= 3 ? 'FINAL ROUND' : 'ROUND WON', 2200)
      this.audio.ko()
    } else {
      winner.setVictory(true)
      this.ui.announce('TIME', `${winner.def.name} LEADS THE REALM`, 'TIME EXPIRED', 2200)
      this.audio.announce()
    }
  }

  updateRoundEnd(dt, scaled) {
    this.roundEndTimer += dt
    this.player.update(scaled, this.elapsed, this.enemy, { moving: 0 })
    this.enemy.update(scaled, this.elapsed, this.player, { moving: 0 })
    if (this.roundEndTimer > 1.1) this.timeScale = 1
    if (this.roundEndTimer > 3.05) {
      if (this.wins.p >= 2 || this.wins.e >= 2) this.showResult(this.wins.p >= 2)
      else this.startRound(this.round + 1)
    }
  }

  updateFinisher(dt, scaled) {
    this.finisherTime += dt
    this.timeScale = 0.58
    const simDt = dt * this.timeScale
    this.player.update(simDt, this.elapsed, this.enemy, { moving: 0 })
    this.enemy.update(simDt, this.elapsed, this.player, { moving: 0 })
    if (!this.player.action) {
      if (!this.finisherDone) {
        this.finisherDone = true
        this.finisherEndTimer = 0
      }
      this.finisherEndTimer += dt
      if (this.finisherEndTimer > 1.1) this.showResult(true)
    }
  }

  showResult(win) {
    if (this.state === 'result') return
    this.state = 'result'
    this.timeScale = 1
    this.player.setVictory(win)
    if (!win) this.enemy.setVictory(true)
    this.matchStats.time = formatTime(this.matchElapsed)
    this.ui.setHealth('p', this.player.health / this.player.maxHealth)
    this.ui.setHealth('e', this.enemy.health / this.enemy.maxHealth)
    this.ui.showResult({
      win,
      time: this.matchStats.time,
      maxCombo: this.matchStats.maxCombo,
      damage: Math.round(this.matchStats.damage).toLocaleString('en-US'),
      playerName: this.player.def.name,
      enemyName: this.enemy.def.name,
    })
    this.ui.setBlood(false)
    this.ui.hidePrompt()
    this.audio.announce()
  }

  updateCamera(dt) {
    const t = this.elapsed
    const aspect = window.innerWidth / window.innerHeight
    const portrait = aspect < 0.82
    const midX = (this.player.x + this.enemy.x) * 0.5
    const dist = this.baseDist
    let px = 0, py = 1.35, pz = dist
    let lx = 0, ly = 1.02, lz = 0

    if (this.state === 'title') {
      px = Math.sin(t * 0.13) * (portrait ? 0.25 : 0.7)
      py = 1.42
      pz = dist * 1.1
      lx = Math.sin(t * 0.11) * 0.08
      ly = 1.04
    } else if (this.state === 'select') {
      px = Math.sin(t * 0.1) * 0.28
      py = 1.36
      pz = dist * 1.02
      lx = 0
      ly = 1.04
    } else if (this.state === 'intro') {
      const u = smooth(this.introTime / 1.55)
      px = lerp(-1.1, midX * 0.25, u)
      py = lerp(1.28, 1.32, u)
      pz = lerp(dist * 1.2, dist, u)
      lx = lerp(-0.4, midX * 0.22, u)
      ly = 1.04
    } else if (this.state === 'roundEnd') {
      const focus = this.cameraFocus || this.enemy
      px = focus.x * 0.25
      py = 1.28
      pz = dist * 0.82
      lx = focus.x * 0.34
      ly = 1.0
    } else if (this.state === 'finisher') {
      const k = Math.min(1, this.finisherTime / 1.6)
      px = midX + Math.sin(this.finisherTime * 0.24) * 1.05 * k
      py = 1.38
      pz = dist * (0.62 - 0.04 * k)
      lx = midX * 0.8
      ly = 1.12
    } else if (this.state === 'result') {
      px = Math.sin(t * 0.16) * 0.55
      py = 1.38
      pz = dist * 0.98
      lx = 0
      ly = 1.05
    } else if (this.state === 'paused') {
      px = midX * 0.25
      py = 1.32
      pz = dist
      lx = midX * 0.22
      ly = 1.04
    } else {
      px = midX * 0.3
      py = 1.32
      pz = dist
      lx = midX * 0.25
      ly = 1.04
    }

    // subtle breathing sway
    px += Math.sin(t * 0.37) * 0.018
    py += Math.sin(t * 0.29) * 0.01

    if (this.shake > 0.001) {
      this.shakeTime += dt * 55
      px += Math.sin(this.shakeTime * 1.7) * this.shake * 0.09
      py += Math.cos(this.shakeTime * 2.3) * this.shake * 0.055
      pz += Math.sin(this.shakeTime * 1.1) * this.shake * 0.035
      this.shake = Math.max(0, this.shake - dt * 1.35)
    }

    this.cameraTarget.set(px, py, pz)
    this.cameraLookTarget.set(lx, ly, lz)
    const rate = this.state === 'finisher' ? 2.2 : 5.5
    const b = 1 - Math.exp(-rate * dt)
    this.camera.position.lerp(this.cameraTarget, b)
    this.cameraLook.lerp(this.cameraLookTarget, b)
    this.camera.lookAt(this.cameraLook)
  }

  makePortraits() {
    if (this.portraitsDone) return
    this.portraitsDone = true
    for (const id of ['nyx', 'kaelus']) {
      try {
        const fighter = this.fighters[id]
        const canvas = document.createElement('canvas')
        canvas.width = 360
        canvas.height = 480
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, preserveDrawingBuffer: true })
        renderer.setPixelRatio(1)
        renderer.setSize(360, 480, false)
        renderer.outputColorSpace = THREE.SRGBColorSpace
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 1.2
        renderer.setClearColor(0x000000, 0)
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(32, 0.75, 0.01, 10)
        camera.position.set(0.02, 1.6, 1.55)
        camera.lookAt(0, 1.47, 0)
        scene.add(new THREE.HemisphereLight(0x8db4c9, 0x190c08, 0.8))
        const key = new THREE.DirectionalLight(0xffd8a4, 4.2)
        key.position.set(1.3, 2.4, 2.0)
        scene.add(key)
        const rim = new THREE.DirectionalLight(fighter.def.specialColor, 4.8)
        rim.position.set(-1.4, 1.7, -1.2)
        scene.add(rim)
        const fill = new THREE.DirectionalLight(0x86b8d8, 1.6)
        fill.position.set(-0.8, 1.0, 1.5)
        scene.add(fill)
        const clone = cloneSkeleton(fighter.model)
        clone.rotation.y = -0.72
        clone.position.y = -0.02
        clone.traverse((object) => {
          if (object.isSprite) object.visible = false
        })
        scene.add(clone)
        renderer.render(scene, camera)
        const data = canvas.toDataURL('image/png')
        this.ui.setPortrait(id, data)
        renderer.dispose()
        renderer.forceContextLoss?.()
      } catch (error) {
        console.warn('Portrait render failed', error)
      }
    }
  }

  animate() {
    requestAnimationFrame(this.animate)
    const dt = this.clock.getDelta()
    this.frames++
    const inst = 1 / Math.max(0.0001, dt)
    this.fps = this.fps * 0.94 + inst * 0.06
    this.update(dt)
    this.renderer.info.reset()
    this.composer.render()
    if (!this.ready && this.frames > 2 && this.modelsReady) {
      this.ready = true
      this.ui.hideLoading()
      document.body.dataset.ready = 'true'
    }
  }

  loop() { this.animate() }

  get diagnostics() {
    return {
      state: this.state,
      fps: Math.round(this.fps),
      player: this.player?.def.name,
      enemy: this.enemy?.def.name,
      health: { player: this.player?.health, enemy: this.enemy?.health },
      renderer: this.renderer.info.render,
      ready: !!this.ready,
      portrait: this.portraitsDone,
    }
  }
}
