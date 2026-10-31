import * as THREE from 'three'
import { Player, Weapon } from './player.js'
import { EnemyManager } from './enemies.js'
import { clamp, damp, formatScore, pad2, rand, randInt } from './utils.js'

export class Game {
  constructor({ scene, camera, renderer, composer, world, effects, audio, hud }) {
    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.composer = composer
    this.world = world
    this.effects = effects
    this.audio = audio
    this.hud = hud
    this.touchMode = matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0 || window.innerWidth <= 760
    document.body.classList.toggle('touch-ui', this.touchMode)

    this.weapon = new Weapon({ camera, scene, effects, audio, viewAspect: camera.aspect })
    this.player = new Player({ camera, scene, world, effects, audio, weapon: this.weapon })
    this.player.baseFov = camera.aspect < 0.8 ? 80 : this.touchMode ? 76 : 72
    this.player.fov = camera.aspect < 0.8 ? 80 : 72
    this.player.isTouch = this.touchMode
    this.player.weapon.setVisible(false)

    this.enemies = new EnemyManager({
      scene,
      camera,
      world,
      effects,
      audio,
      callbacks: {
        onDamage: (enemy, amount, crit, point) => this.onEnemyDamage(enemy, amount, crit, point),
        onKill: (enemy, info) => this.onEnemyKill(enemy, info),
        onPlayerHit: (damage, dir) => this.onPlayerHit(damage, dir)
      }
    })

    this.state = 'menu'
    this.score = 0
    this.wave = 1
    this.kills = 0
    this.headshots = 0
    this.shots = 0
    this.weaponHits = 0
    this.comboCount = 0
    this.comboTimer = 0
    this.best = Number(localStorage.getItem('helix-best') || 0)

    this.spawnRemaining = 0
    this.spawnTimer = 0
    this.spawnQueue = []
    this.waveTotal = 0
    this.waveActive = false
    this.waveStartTimer = 0
    this.intermission = 0
    this.introDelay = 0

    this.pickups = []
    this.deathTimer = 0
    this.deathShown = false
    this.pausedFromHidden = false
    this.menuT = 0
    this.wasLocked = false
    this.lastFrame = performance.now()
    this.damageFlash = 0

    this.input = {
      moveX: 0,
      moveY: 0,
      jump: false,
      aim: false,
      fire: false,
      grounded: true
    }
    this.touchMove = { x: 0, y: 0, active: false }
    this.keys = new Set()
    this.joystickPointer = null
    this.lookPointer = null
    this.lookLast = { x: 0, y: 0 }
    this.raycaster = new THREE.Raycaster()
    this.aimCandidate = null

    this.bindUI()
    this.bindInput()
    this.hud.setSoundMuted(!this.audio.enabled)
    this.hud.setWave(1)
    this.hud.setScore(0)

    window.__HELIX__ = {
      game: this,
      start: () => this.startGame(),
      enemies: this.enemies,
      player: this.player,
      world: this.world
    }
  }

  bindUI() {
    document.getElementById('play-btn').addEventListener('click', () => {
      this.audio.init()
      this.audio.ui()
      this.startGame()
    })
    document.getElementById('sound-btn').addEventListener('click', () => {
      this.audio.init()
      const enabled = this.audio.toggle()
      this.hud.setSoundMuted(!enabled)
      if (enabled) this.audio.ui()
    })
    document.getElementById('pause-btn').addEventListener('click', () => {
      if (this.state === 'playing') this.pause()
    })
    document.getElementById('resume-btn').addEventListener('click', () => this.resume())
    document.getElementById('quit-btn').addEventListener('click', () => this.toMenu())
    document.getElementById('redeploy-btn').addEventListener('click', () => this.startGame())
    document.getElementById('menu-btn').addEventListener('click', () => this.toMenu())

    // Touch controls
    const joystick = document.getElementById('joystick')
    const knob = document.getElementById('joystick-knob')
    const updateJoystick = (event) => {
      const rect = joystick.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      let dx = event.clientX - cx
      let dy = event.clientY - cy
      const maxR = rect.width * 0.32
      const len = Math.hypot(dx, dy)
      if (len > maxR) { dx = dx / len * maxR; dy = dy / len * maxR }
      knob.style.transform = `translate(${dx}px, ${dy}px)`
      const nx = dx / maxR
      const ny = -dy / maxR
      const dead = 0.12
      this.touchMove.x = Math.abs(nx) < dead ? 0 : nx
      this.touchMove.y = Math.abs(ny) < dead ? 0 : ny
      this.touchMove.active = true
    }
    joystick.addEventListener('pointerdown', (e) => {
      e.preventDefault()
      this.joystickPointer = e.pointerId
      joystick.setPointerCapture(e.pointerId)
      updateJoystick(e)
    })
    joystick.addEventListener('pointermove', (e) => {
      if (this.joystickPointer !== e.pointerId) return
      e.preventDefault()
      updateJoystick(e)
    })
    const releaseJoystick = (e) => {
      if (this.joystickPointer !== e.pointerId) return
      this.joystickPointer = null
      this.touchMove.x = 0
      this.touchMove.y = 0
      this.touchMove.active = false
      knob.style.transform = 'translate(0, 0)'
    }
    joystick.addEventListener('pointerup', releaseJoystick)
    joystick.addEventListener('pointercancel', releaseJoystick)

    // Look drag on canvas
    const canvas = this.renderer.domElement
    canvas.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'touch') return
      if (this.state !== 'playing') return
      if (this.lookPointer !== null) return
      this.lookPointer = e.pointerId
      this.lookLast.x = e.clientX
      this.lookLast.y = e.clientY
      canvas.setPointerCapture(e.pointerId)
    })
    canvas.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'touch' || this.lookPointer !== e.pointerId) return
      const dx = e.clientX - this.lookLast.x
      const dy = e.clientY - this.lookLast.y
      this.lookLast.x = e.clientX
      this.lookLast.y = e.clientY
      this.player.look(dx, dy, 0.0033)
    })
    const endLook = (e) => {
      if (this.lookPointer === e.pointerId) this.lookPointer = null
    }
    canvas.addEventListener('pointerup', endLook)
    canvas.addEventListener('pointercancel', endLook)

    const holdButton = (id, onDown, onUp) => {
      const el = document.getElementById(id)
      el.addEventListener('pointerdown', (e) => {
        e.preventDefault()
        el.setPointerCapture(e.pointerId)
        el.classList.add('held')
        onDown()
      })
      const up = (e) => {
        el.classList.remove('held')
        onUp?.()
      }
      el.addEventListener('pointerup', up)
      el.addEventListener('pointercancel', up)
      el.addEventListener('lostpointercapture', up)
    }
    holdButton('fire-btn', () => { this.input.fire = true }, () => { this.input.fire = false })
    holdButton('aim-btn', () => { this.input.aim = true }, () => { this.input.aim = false })
    document.getElementById('reload-btn').addEventListener('pointerdown', (e) => {
      e.preventDefault()
      this.weapon.startReload()
    })
    document.getElementById('jump-btn').addEventListener('pointerdown', (e) => {
      e.preventDefault()
      this.input.jump = true
    })

    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.state === 'playing') {
        this.pausedFromHidden = true
        this.pause()
      }
    })
  }

  bindInput() {
    const keys = this.keys
    window.addEventListener('keydown', (e) => {
      if (['Space', 'KeyW', 'KeyA', 'KeyS', 'KeyD', 'KeyR', 'Escape'].includes(e.code)) e.preventDefault()
      keys.add(e.code)
      if (e.repeat) return
      if (e.code === 'Escape') {
        if (this.state === 'playing') this.pause()
        else if (this.state === 'paused') this.resume()
      }
      if (e.code === 'KeyR' && this.state === 'playing') this.weapon.startReload()
      if (e.code === 'Space' && this.state === 'playing') this.input.jump = true
    })
    window.addEventListener('keyup', (e) => keys.delete(e.code))
    window.addEventListener('blur', () => {
      keys.clear()
      this.input.fire = false
      this.input.aim = false
    })

    const canvas = this.renderer.domElement
    canvas.addEventListener('contextmenu', (e) => e.preventDefault())
    canvas.addEventListener('mousedown', (e) => {
      if (this.state !== 'playing') return
      if (e.button === 0) {
        this.input.fire = true
        if (!this.touchMode && document.pointerLockElement !== canvas) this.requestLock()
      }
      if (e.button === 2) this.input.aim = true
    })
    window.addEventListener('mouseup', (e) => {
      if (e.button === 0) this.input.fire = false
      if (e.button === 2) this.input.aim = false
    })
    document.addEventListener('mousemove', (e) => {
      if (this.state !== 'playing' || this.touchMode) return
      if (document.pointerLockElement === canvas) {
        this.player.look(e.movementX, e.movementY, 0.0021)
      }
    })
    document.addEventListener('pointerlockchange', () => {
      if (document.pointerLockElement === canvas) {
        this.wasLocked = true
      } else if (this.wasLocked && this.state === 'playing' && !this.touchMode) {
        this.wasLocked = false
        this.pause()
      }
    })
    canvas.addEventListener('click', () => {
      if (this.state === 'playing' && !this.touchMode && document.pointerLockElement !== canvas) this.requestLock()
    })

    // Resize is handled by main, but keep weapon framing in sync.
    window.addEventListener('resize', () => {
      this.weapon.updateViewAspect(this.camera.aspect)
      this.player.baseFov = this.camera.aspect < 0.8 ? 80 : this.touchMode ? 76 : 72
    })
  }

  requestLock() {
    const canvas = this.renderer.domElement
    if (this.touchMode) return
    try {
      const p = canvas.requestPointerLock?.()
      if (p && p.catch) p.catch(() => {})
    } catch { /* pointer lock can be unavailable in embedded previews */ }
  }

  startGame() {
    this.audio.init()
    this.state = 'playing'
    this.score = 0
    this.wave = 0
    this.kills = 0
    this.headshots = 0
    this.shots = 0
    this.weaponHits = 0
    this.comboCount = 0
    this.comboTimer = 0
    this.spawnRemaining = 0
    this.spawnQueue = []
    this.waveActive = false
    this.waveStartTimer = 0.35
    this.intermission = 0
    this.introDelay = 0.7
    this.deathShown = false
    this.deathTimer = 0
    this.clearPickups()
    this.enemies.clear()
    this.player.reset()
    this.player.weapon.setVisible(true)
    this.hud.scoreEl.textContent = '000000'
    this.hud.lastScore = -1
    this.hud.hideGameOver()
    this.hud.hidePause()
    this.hud.hideMenu()
    this.hud.setScore(0)
    this.hud.setBest(this.best)
    this.hud.setWave(1)
    this.hud.setWaveProgress(0)
    this.hud.toast('DEFENSE PROTOCOL', 'SIMULATION ACTIVE', 'HOLD THE FOUNDRY', '', 2000)
    this.input.fire = false
    this.input.aim = false
    this.input.jump = false
    this.keys.clear()
    this.audio.waveStart(1)
    this.requestLock()
    this.menuT = 0
    this.wasLocked = false
    this.lastFrame = performance.now()
  }

  toMenu() {
    this.state = 'menu'
    this.enemies.clear()
    this.clearPickups()
    this.hud.showMenu()
    this.hud.hidePause()
    this.hud.hideGameOver()
    this.player.weapon.setVisible(false)
    this.player.reset()
    this.input.fire = false
    this.input.aim = false
    this.keys.clear()
    this.input.moveX = 0
    this.input.moveY = 0
    this.touchMove.x = 0
    this.touchMove.y = 0
    if (document.pointerLockElement) document.exitPointerLock()
    this.menuT = 0
    this.camera.rotation.order = 'YXZ'
    this.camera.fov = 62
    this.camera.updateProjectionMatrix()
  }

  pause() {
    if (this.state !== 'playing') return
    this.state = 'paused'
    this.wasLocked = false
    this.input.fire = false
    this.input.aim = false
    if (document.pointerLockElement) document.exitPointerLock()
    this.hud.showPause({ wave: Math.max(1, this.wave), score: this.score, kills: this.kills })
  }

  resume() {
    if (this.state !== 'paused') return
    this.state = 'playing'
    this.hud.hidePause()
    this.lastFrame = performance.now()
    if (this.pausedFromHidden) {
      this.pausedFromHidden = false
    }
    this.requestLock()
  }

  startWave(n) {
    this.wave = n
    this.waveActive = true
    const total = Math.min(16, 3 + Math.floor(n * 1.8))
    this.waveTotal = total
    this.spawnRemaining = total
    this.spawnTimer = 0
    this.spawnQueue = []
    for (let i = 0; i < total; i++) {
      const wardenChance = n >= 2 ? Math.min(0.34, 0.08 + n * 0.035) : 0
      let kind = Math.random() < wardenChance ? 'warden' : 'wasp'
      if (i === total - 1 && n >= 4 && !this.spawnQueue.includes('warden')) kind = 'warden'
      this.spawnQueue.push(kind)
    }
    // First contact always comes from the front for readability.
    if (n === 1) this.spawnQueue[0] = 'wasp'
    this.hud.setWave(n)
    this.hud.setWaveProgress(0)
    this.hud.toast(n === 1 ? 'HOSTILE SIGNAL' : 'UPLINK WARNING', `WAVE ${pad2(n)} INBOUND`, n === 1 ? 'THREAT LEVEL: MODERATE' : 'THREAT LEVEL: ELEVATED', n >= 4 ? 'danger' : '')
    this.audio.waveStart(n)
  }

  spawnNextEnemy() {
    if (this.spawnRemaining <= 0 || this.spawnQueue.length === 0) return
    const kind = this.spawnQueue.shift()
    this.spawnRemaining--
    let portal = randInt(0, this.world.portalCount - 1)
    if (this.wave === 1 && this.spawnRemaining === this.waveTotal - 1) portal = 6
    // Pick a portal which is not directly behind the player.
    for (let i = 0; i < 4; i++) {
      const candidate = randInt(0, this.world.portalCount - 1)
      const sp = this.world.spawnPoint(candidate).position
      if (Math.hypot(sp.x - this.player.position.x, sp.z - this.player.position.z) > 18) { portal = candidate; break }
    }
    this.enemies.spawn(kind, portal, this.wave)
  }

  onEnemyDamage(enemy, amount, crit, point) {
    this.weaponHits++
    this.hud.hit(crit)
    this.hud.damageNumber(point, amount, crit, this.camera)
    if (crit) this.headshots++
  }

  onEnemyKill(enemy, info) {
    this.kills++
    this.comboCount = this.comboTimer > 0 ? this.comboCount + 1 : 1
    this.comboTimer = 3.0
    const mult = clamp(this.comboCount, 1, 5)
    const gained = enemy.score * mult
    this.score += gained
    this.hud.setScore(this.score)
    this.hud.killfeed(enemy.kind, info.crit)
    if (mult >= 2) this.hud.combo(mult)
    if (this.score > this.best) {
      this.best = this.score
      this.hud.setBest(this.best)
    }
    const healthLow = this.player.health < 48 && this.player.health > 0
    if (Math.random() < (healthLow ? 0.42 : 0.14)) {
      this.spawnPickup(info.position)
    }
  }

  onPlayerHit(amount, direction) {
    if (this.player.dead) return
    this.player.takeDamage(amount, direction)
    this.hud.damage(amount, direction, this.player.yaw)
    this.damageFlash = 1
  }

  spawnPickup(position) {
    const group = new THREE.Group()
    group.position.set(position.x, 1.05, position.z)
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x5dffda, toneMapped: false })
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.23, 0), coreMat)
    group.add(core)
    const cage = new THREE.Mesh(
      new THREE.TorusGeometry(0.34, 0.018, 5, 28),
      new THREE.MeshBasicMaterial({ color: 0x7ffff0, transparent: true, opacity: 0.8, toneMapped: false })
    )
    cage.rotation.x = Math.PI / 2
    group.add(cage)
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: this.effects.particles.material.uniforms.uMap.value,
      color: 0x54ffd8, transparent: true, opacity: 0.7,
      blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false
    }))
    glow.scale.setScalar(1.5)
    group.add(glow)
    const beam = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.16, 1.4, 8, 1, true),
      new THREE.MeshBasicMaterial({
        color: 0x53ffd8, transparent: true, opacity: 0.12, side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false
      })
    )
    beam.position.y = -0.55
    group.add(beam)
    this.scene.add(group)
    this.pickups.push({ group, life: 18, phase: rand(0, Math.PI * 2), core, cage })
  }

  updatePickups(dt, elapsed) {
    for (let i = this.pickups.length - 1; i >= 0; i--) {
      const p = this.pickups[i]
      p.life -= dt
      p.phase += dt
      p.group.position.y = 1.05 + Math.sin(p.phase * 2.2) * 0.16
      p.core.rotation.y += dt * 1.8
      p.core.rotation.x += dt * 0.9
      p.cage.rotation.z += dt * 0.7
      p.group.visible = p.life > 2.8 || Math.floor(p.life * 8) % 2 === 0
      const dx = p.group.position.x - this.player.position.x
      const dz = p.group.position.z - this.player.position.z
      if (dx * dx + dz * dz < 2.1 * 2.1 && !this.player.dead) {
        this.player.heal(25)
        this.effects.heal(p.group.position.clone())
        this.audio.pickup()
        this.hud.pickup()
        this.score += 50
        this.hud.setScore(this.score)
        this.removePickup(i)
        continue
      }
      if (p.life <= 0) this.removePickup(i)
    }
  }

  removePickup(index) {
    const p = this.pickups[index]
    this.scene.remove(p.group)
    p.group.traverse((o) => {
      if (o.geometry) o.geometry.dispose()
      if (o.material) {
        const mats = Array.isArray(o.material) ? o.material : [o.material]
        mats.forEach((m) => m.dispose())
      }
    })
    this.pickups.splice(index, 1)
  }

  clearPickups() {
    for (const p of this.pickups) {
      this.scene.remove(p.group)
      p.group.traverse((o) => {
        if (o.geometry) o.geometry.dispose()
        if (o.material) {
          const mats = Array.isArray(o.material) ? o.material : [o.material]
          mats.forEach((m) => m.dispose())
        }
      })
    }
    this.pickups.length = 0
  }

  handleFiring() {
    if (!this.input.fire || this.state !== 'playing' || this.player.dead) return
    if (!this.weapon.tryShoot()) return
    this.shots++
    const origin = this.player.getShootOrigin()
    const ads = this.weapon.adsK > 0.5
    let spread = ads ? 0.0025 : 0.0105
    if (this.player.moveAmount > 0.2) spread += 0.006 * this.player.moveAmount
    let dir = this.player.getShootDirection(spread)

    if (this.touchMode) {
      const candidate = this.enemies.getAimCandidate(origin, dir, ads ? 0.065 : 0.045)
      if (candidate && !candidate.dead) {
        const aim = candidate.group.position.clone().sub(origin)
        const dist = aim.length()
        aim.normalize()
        dir = dir.lerp(aim, ads ? 0.55 : 0.3).normalize()
      }
    }

    this.raycaster.set(origin, dir)
    this.raycaster.near = 0.1
    this.raycaster.far = 120
    const enemyHit = this.enemies.raycast(this.raycaster.ray)
    const worldHits = this.world.raycast(this.raycaster)
    const worldHit = worldHits.length ? worldHits[0] : null
    let end = origin.clone().addScaledVector(dir, 80)

    if (enemyHit && (!worldHit || enemyHit.t < worldHit.distance)) {
      end.copy(enemyHit.point)
      const damage = 32
      this.enemies.damage(enemyHit.enemy, damage, enemyHit.crit, enemyHit.point.clone())
    } else if (worldHit) {
      end.copy(worldHit.point)
      const normal = worldHit.face
        ? worldHit.face.normal.clone().transformDirection(worldHit.object.matrixWorld)
        : dir.clone().negate()
      this.effects.impact(worldHit.point, normal)
    }

    const muzzle = this.weapon.muzzle.getWorldPosition(new THREE.Vector3())
    this.effects.tracer(muzzle, end, ads ? 0x9ffaff : 0x6ff2ff)
    const pitchKick = ads ? rand(0.0035, 0.006) : rand(0.008, 0.013)
    const yawKick = rand(-0.004, 0.004)
    this.player.applyRecoil(pitchKick, yawKick)
  }

  setAimTarget() {
    if (this.state !== 'playing' || this.player.dead) {
      this.hud.setTarget(false)
      return
    }
    const origin = this.player.getShootOrigin()
    const dir = this.player.getShootDirection(0)
    const candidate = this.enemies.getAimCandidate(origin, dir, 0.045)
    let valid = false
    if (candidate) {
      const target = candidate.group.position.clone()
      valid = !this.world.isBlocked(origin, target, 0.7)
    }
    this.hud.setTarget(valid)
  }

  updateMenu(dt) {
    this.menuT += dt
    const t = this.menuT
    const angle = 0.36 + Math.sin(t * 0.05) * 0.08
    const radius = 31
    this.camera.position.set(Math.sin(angle) * radius, 6.6 + Math.sin(t * 0.14) * 0.28, Math.cos(angle) * radius)
    this.camera.rotation.order = 'YXZ'
    this.camera.lookAt(0, 2.6 + Math.sin(t * 0.11) * 0.12, 0)
    this.camera.rotation.z += Math.sin(t * 0.09) * 0.003
    this.camera.fov = 60
    this.camera.updateProjectionMatrix()
  }

  updateDeath(dt, elapsed) {
    this.deathTimer += dt
    this.input.fire = false
    this.input.aim = false
    const k = clamp(this.deathTimer / 1.2, 0, 1)
    this.camera.position.y = damp(this.camera.position.y, 0.72, 2.4, dt)
    this.camera.rotation.x = damp(this.camera.rotation.x, -0.45, 2.4, dt)
    this.camera.rotation.z = damp(this.camera.rotation.z, 0.36, 2.2, dt)
    if (this.deathTimer > 1.5 && !this.deathShown) {
      this.deathShown = true
      this.state = 'gameover'
      const accuracy = this.shots > 0 ? this.weaponHits / this.shots : 0
      this.hud.showGameOver({ wave: Math.max(1, this.wave), score: this.score, kills: this.kills, accuracy })
      this.hud.setBest(this.score)
      if (document.pointerLockElement) document.exitPointerLock()
    }
  }

  update(dt, elapsed) {
    this.effects.update(dt)
    this.world.update(dt, elapsed)

    if (this.state === 'menu') {
      this.updateMenu(dt)
      return
    }

    if (this.state === 'paused' || this.state === 'gameover') {
      if (this.state === 'gameover') {
        this.camera.rotation.z += dt * 0.01
      }
      this.weapon.update(dt, { aiming: false, moving: 0, lookX: 0, lookY: 0 })
      return
    }

    if (this.player.dead) {
      this.updateDeath(dt, elapsed)
      this.enemies.update(dt, elapsed)
      this.updatePickups(dt, elapsed)
      this.hud.update(this.player, this.weapon)
      this.hud.updateRadar(this.player, this.enemies.enemies, dt, this.pickups)
      return
    }

    // Movement input: keyboard + virtual joystick
    let moveX = (this.keys.has('KeyD') ? 1 : 0) - (this.keys.has('KeyA') ? 1 : 0)
    let moveY = (this.keys.has('KeyW') ? 1 : 0) - (this.keys.has('KeyS') ? 1 : 0)
    if (this.touchMove.active) {
      moveX = this.touchMove.x
      moveY = this.touchMove.y
    }
    this.input.moveX = moveX
    this.input.moveY = moveY
    this.player.update(dt, this.input)
    this.enemies.setPlayerPosition(this.player.getShootOrigin())
    this.enemies.update(dt, elapsed)
    this.handleFiring()
    this.updatePickups(dt, elapsed)
    this.setAimTarget()
    this.hud.update(this.player, this.weapon)
    this.hud.updateRadar(this.player, this.enemies.enemies, dt, this.pickups)

    if (this.comboTimer > 0) {
      this.comboTimer -= dt
      if (this.comboTimer <= 0) this.comboCount = 0
    }

    // Wave director
    if (!this.waveActive) {
      if (this.intermission > 0) {
        this.intermission -= dt
        if (this.intermission <= 0) this.startWave(this.wave + 1)
      } else if (this.waveStartTimer > 0) {
        this.waveStartTimer -= dt
        if (this.waveStartTimer <= 0) this.startWave(1)
      }
      return
    }

    if (this.spawnRemaining > 0) {
      this.spawnTimer -= dt
      if (this.spawnTimer <= 0) {
        this.spawnNextEnemy()
        this.spawnTimer = rand(0.55, 1.0)
      }
    }
    const remaining = this.spawnRemaining + this.enemies.alive
    const cleared = this.waveTotal - remaining
    this.hud.setWaveProgress(this.waveTotal > 0 ? cleared / this.waveTotal : 0)

    if (this.spawnRemaining === 0 && this.enemies.alive === 0) {
      this.waveActive = false
      this.hud.setWaveProgress(1)
      const bonus = this.wave * 250
      this.score += bonus
      this.hud.setScore(this.score)
      this.hud.toast('WAVE CLEARED', `+${formatScore(bonus)}`, `WAVE ${pad2(this.wave)} SECURED // NEXT ASSAULT IN 5`, 'gold', 3000)
      this.audio.waveClear()
      this.intermission = 5
      this.hud.setBest(this.score)
      this.player.heal(15)
    }
  }
}
