import * as THREE from 'three'
import { TAU, rand, clamp, damp, makeGlowTexture, segmentBoxIntersection } from './utils.js'

const shadowTexture = (() => {
  let tex = null
  return () => {
    if (tex) return tex
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 128
    const ctx = canvas.getContext('2d')
    const g = ctx.createRadialGradient(64, 64, 8, 64, 64, 62)
    g.addColorStop(0, 'rgba(0,0,0,0.6)')
    g.addColorStop(0.5, 'rgba(0,0,0,0.32)')
    g.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 128, 128)
    tex = new THREE.CanvasTexture(canvas)
    return tex
  }
})()

function makeArmorMaterial(accent) {
  return new THREE.MeshStandardMaterial({
    color: 0x748794,
    metalness: 0.78,
    roughness: 0.38,
    emissive: accent,
    emissiveIntensity: 0.34,
    envMapIntensity: 1.5
  })
}

function buildWasp(accent = 0xff345c) {
  const group = new THREE.Group()
  const armor = makeArmorMaterial(accent)
  const accentMat = new THREE.MeshBasicMaterial({ color: accent, toneMapped: false })
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0xff5970, toneMapped: false })
  const dark = new THREE.MeshStandardMaterial({ color: 0x080d12, metalness: 0.8, roughness: 0.4 })

  const body = new THREE.Mesh(new THREE.IcosahedronGeometry(0.5, 1), armor)
  body.scale.set(1.42, 0.84, 1.12)
  body.castShadow = true
  group.add(body)

  const dorsal = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.12, 0.86), dark)
  dorsal.position.set(0, 0.34, -0.02)
  dorsal.rotation.x = -0.08
  group.add(dorsal)
  const dorsalLight = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.025, 0.58), accentMat)
  dorsalLight.position.set(0, 0.405, 0)
  group.add(dorsalLight)

  for (const side of [-1, 1]) {
    const pod = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.22, 0.62), armor)
    pod.position.set(side * 0.62, -0.02, 0.03)
    pod.rotation.z = side * 0.17
    pod.castShadow = true
    group.add(pod)
    const wing = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.9, 3), armor)
    wing.position.set(side * 0.95, 0.04, -0.1)
    wing.rotation.z = side * Math.PI / 2
    wing.rotation.x = Math.PI / 2
    wing.castShadow = true
    group.add(wing)
    const wingEdge = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.035, 0.6), accentMat)
    wingEdge.position.set(side * 1.04, 0.05, -0.12)
    group.add(wingEdge)
    // barrel
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.064, 0.62, 8), dark)
    barrel.rotation.x = Math.PI / 2
    barrel.position.set(side * 0.28, -0.16, 0.48)
    group.add(barrel)
    const tip = new THREE.Mesh(new THREE.TorusGeometry(0.055, 0.017, 6, 12), accentMat)
    tip.position.set(side * 0.28, -0.16, 0.8)
    group.add(tip)
  }

  const socket = new THREE.Mesh(new THREE.SphereGeometry(0.27, 16, 12), dark)
  socket.scale.set(1.04, 0.92, 0.5)
  socket.position.set(0, 0, 0.46)
  group.add(socket)
  const eye = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 12), eyeMat)
  eye.scale.z = 0.62
  eye.position.set(0, 0, 0.58)
  group.add(eye)
  const eyeGlow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeGlowTexture(64), color: accent, transparent: true, opacity: 0.5,
    blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false
  }))
  eyeGlow.position.set(0, 0, 0.62)
  eyeGlow.scale.set(0.95, 0.95, 1)
  group.add(eyeGlow)
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeGlowTexture(96), color: accent, transparent: true, opacity: 0.075,
    blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false
  }))
  halo.position.set(0, 0, -0.18)
  halo.scale.set(1.75, 1.75, 1)
  group.add(halo)

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.62, 0.017, 6, 48),
    new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.3, toneMapped: false })
  )
  ring.rotation.set(Math.PI / 2.3, 0.15, 0.5)
  group.add(ring)
  const ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(0.46, 0.012, 5, 32),
    new THREE.MeshBasicMaterial({ color: 0x6fefff, transparent: true, opacity: 0.2, toneMapped: false })
  )
  ring2.rotation.set(0.3, Math.PI / 2, 0.7)
  group.add(ring2)

  const spine = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.56, 4), dark)
  spine.rotation.x = Math.PI
  spine.position.set(0, -0.48, -0.02)
  group.add(spine)
  const spineLight = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.03, 0.4, 5), accentMat)
  spineLight.position.set(0, -0.55, 0)
  group.add(spineLight)

  const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.45, 4), dark)
  antenna.position.set(0, 0.54, -0.05)
  group.add(antenna)
  const antennaTip = new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 4), accentMat)
  antennaTip.position.set(0, 0.77, -0.05)
  group.add(antennaTip)

  return { group, armor, accentMat, eyeMat, eye, eyeGlow, ring, ring2, body, scale: 1 }
}

function buildWarden(accent = 0xff3bd1) {
  const group = new THREE.Group()
  const armor = makeArmorMaterial(accent)
  armor.color.setHex(0x6e7586)
  armor.emissiveIntensity = 0.42
  const accentMat = new THREE.MeshBasicMaterial({ color: accent, toneMapped: false })
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0xffb04a, toneMapped: false })
  const dark = new THREE.MeshStandardMaterial({ color: 0x090c12, metalness: 0.9, roughness: 0.36 })

  const body = new THREE.Mesh(new THREE.OctahedronGeometry(0.72, 0), armor)
  body.scale.set(1.15, 0.9, 0.85)
  body.castShadow = true
  group.add(body)
  const belly = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.35, 0.9), dark)
  belly.position.y = -0.26
  group.add(belly)
  const topPlate = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.16, 0.95), dark)
  topPlate.position.y = 0.58
  group.add(topPlate)
  const topLight = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.035, 0.68), accentMat)
  topLight.position.y = 0.675
  group.add(topLight)

  for (const side of [-1, 1]) {
    const shoulder = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.5, 0.74), armor)
    shoulder.position.set(side * 0.82, 0.14, 0)
    shoulder.rotation.z = side * 0.22
    shoulder.castShadow = true
    group.add(shoulder)
    const shoulderLight = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.34, 0.6), accentMat)
    shoulderLight.position.set(side * 1.045, 0.2, 0)
    group.add(shoulderLight)
    const pod = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.34, 0.18, 10), dark)
    pod.rotation.z = Math.PI / 2
    pod.position.set(side * 1.18, -0.08, 0)
    group.add(pod)
    const rotor = new THREE.Mesh(
      new THREE.TorusGeometry(0.34, 0.02, 5, 28),
      new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.7, toneMapped: false })
    )
    rotor.rotation.y = Math.PI / 2
    rotor.position.set(side * 1.18, -0.08, 0)
    group.add(rotor)
    const gun = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.085, 0.75, 8), dark)
    gun.rotation.x = Math.PI / 2
    gun.position.set(side * 0.46, -0.24, 0.62)
    group.add(gun)
    const gunTip = new THREE.Mesh(new THREE.TorusGeometry(0.078, 0.02, 6, 12), accentMat)
    gunTip.position.set(side * 0.46, -0.24, 1.0)
    group.add(gunTip)
  }

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.5, 0.52), dark)
  head.position.set(0, 0.18, 0.55)
  head.rotation.x = 0.1
  group.add(head)
  const eye = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.1, 0.06), eyeMat)
  eye.position.set(0, 0.18, 0.835)
  group.add(eye)
  const eyeGlow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeGlowTexture(64), color: 0xffa443, transparent: true, opacity: 0.62,
    blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false
  }))
  eyeGlow.position.set(0, 0.18, 0.88)
  eyeGlow.scale.set(1.25, 1.25, 1)
  group.add(eyeGlow)
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeGlowTexture(96), color: accent, transparent: true, opacity: 0.08,
    blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false
  }))
  halo.position.set(0, 0, -0.25)
  halo.scale.set(2.2, 2.2, 1)
  group.add(halo)

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.98, 0.026, 6, 56),
    new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.3, toneMapped: false })
  )
  ring.rotation.set(Math.PI / 2.15, 0, 0.24)
  ring.position.y = -0.08
  group.add(ring)
  const ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(0.74, 0.016, 5, 40),
    new THREE.MeshBasicMaterial({ color: 0xffb04a, transparent: true, opacity: 0.22, toneMapped: false })
  )
  ring2.rotation.z = Math.PI / 2
  group.add(ring2)

  const lower = new THREE.Mesh(new THREE.ConeGeometry(0.23, 0.9, 4), dark)
  lower.rotation.x = Math.PI
  lower.position.y = -0.7
  group.add(lower)

  return { group, armor, accentMat, eyeMat, eye, eyeGlow, ring, ring2, body, scale: 1.35 }
}

function makeHealthBar() {
  const group = new THREE.Group()
  const bg = new THREE.Mesh(
    new THREE.PlaneGeometry(1.55, 0.1),
    new THREE.MeshBasicMaterial({ color: 0x02070b, transparent: true, opacity: 0.72, depthWrite: false, toneMapped: false })
  )
  bg.position.z = -0.002
  group.add(bg)
  const fillGeo = new THREE.PlaneGeometry(1.49, 0.052)
  fillGeo.translate(0.745, 0, 0)
  const fill = new THREE.Mesh(fillGeo, new THREE.MeshBasicMaterial({ color: 0xff4158, transparent: true, opacity: 0.95, depthWrite: false, toneMapped: false }))
  fill.position.set(-0.745, 0, 0)
  group.add(fill)
  const shine = new THREE.Mesh(
    new THREE.PlaneGeometry(1.49, 0.012),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.45, depthWrite: false, toneMapped: false })
  )
  shine.position.set(0, 0.028, 0.001)
  group.add(shine)
  group.visible = false
  return { group, fill, shine }
}

export class EnemyManager {
  constructor({ scene, camera, world, effects, audio, callbacks = {} }) {
    this.scene = scene
    this.camera = camera
    this.world = world
    this.effects = effects
    this.audio = audio
    this.callbacks = callbacks
    this.enemies = []
    this.projectiles = []
    this.playerPosition = new THREE.Vector3()
    this.tmpVec = new THREE.Vector3()
    this.tmpVec2 = new THREE.Vector3()
    this.tmpSphere = new THREE.Sphere()
    this.ray = new THREE.Ray()
    this.shadowMatBase = new THREE.MeshBasicMaterial({
      map: shadowTexture(), transparent: true, opacity: 0.55, depthWrite: false, toneMapped: false
    })
    this.glowTex = makeGlowTexture(64)
  }

  setPlayerPosition(v) { this.playerPosition.copy(v) }

  spawn(kind, portalIndex, wave = 1) {
    const isWarden = kind === 'warden'
    const built = isWarden ? buildWarden(0xff3bd1) : buildWasp(0xff345c)
    const spawn = this.world.spawnPoint(portalIndex)
    const enemy = {
      kind,
      ...built,
      spawnIndex: portalIndex,
      groupPosition: spawn.position,
      hoverBase: isWarden ? 2.05 : 1.6,
      hp: isWarden ? 240 + (wave - 1) * 45 : 72 + (wave - 1) * 15,
      maxHp: 0,
      speed: (isWarden ? 2.35 : 3.7) * (1 + Math.min(0.45, (wave - 1) * 0.035)),
      bodyRadius: isWarden ? 1.3 : 0.86,
      critRadius: isWarden ? 0.4 : 0.22,
      damage: isWarden ? 14 : 8,
      score: isWarden ? 320 : 100,
      fireInterval: (isWarden ? 2.15 : 2.55) * rand(0.85, 1.15),
      fireTimer: rand(0.7, 1.9),
      strafeDir: Math.random() < 0.5 ? -1 : 1,
      strafePhase: rand(0, TAU),
      phase: rand(0, TAU),
      bobAmp: isWarden ? 0.16 : 0.14,
      flash: 0,
      dead: false,
      spawnT: 0,
      burstLeft: 0,
      burstTimer: 0,
      scaleBase: isWarden ? 1.15 : 1,
      healthVisible: false
    }
    enemy.maxHp = enemy.hp
    const group = built.group
    group.position.set(spawn.position.x, enemy.hoverBase, spawn.position.z)
    group.scale.setScalar(0.01)
    this.scene.add(group)

    const shadow = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), this.shadowMatBase.clone())
    shadow.material.opacity = 0.4
    shadow.rotation.x = -Math.PI / 2
    shadow.scale.setScalar(isWarden ? 3.4 : 2.2)
    shadow.position.set(spawn.position.x, 0.025, spawn.position.z)
    this.scene.add(shadow)
    enemy.shadow = shadow

    const groundGlow = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({
        map: this.glowTex,
        color: isWarden ? 0xff3bd1 : 0xff345c,
        transparent: true,
        opacity: 0.07,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false
      })
    )
    groundGlow.rotation.x = -Math.PI / 2
    groundGlow.scale.setScalar(isWarden ? 2.9 : 2.2)
    groundGlow.position.set(spawn.position.x, 0.035, spawn.position.z)
    this.scene.add(groundGlow)
    enemy.groundGlow = groundGlow

    const health = makeHealthBar()
    health.group.position.set(0, isWarden ? 1.6 : 1.15, isWarden ? 0.6 : 0.55)
    health.group.scale.setScalar(isWarden ? 1.1 : 0.9)
    group.add(health.group)
    enemy.health = health

    this.world.activatePortal(portalIndex)
    this.effects.portalBurst(spawn.position, isWarden ? 0xff3bd1 : 0xff46d4)
    this.audio.portal()
    this.enemies.push(enemy)
    return enemy
  }

  damage(enemy, amount, crit, hitPoint) {
    if (enemy.dead) return 0
    const actual = Math.round(amount * (crit ? 2 : 1))
    enemy.hp -= actual
    enemy.flash = 1
    enemy.health.group.visible = true
    enemy.healthVisible = true
    this.effects.enemyHit(hitPoint, crit)
    this.audio.hit(crit)
    this.callbacks.onDamage?.(enemy, actual, crit, hitPoint)
    if (enemy.hp <= 0) this.kill(enemy, crit)
    return actual
  }

  kill(enemy, crit = false) {
    if (enemy.dead) return
    enemy.dead = true
    const pos = enemy.group.position.clone()
    const big = enemy.kind === 'warden'
    this.effects.explosion(pos, big ? 0xff56d4 : 0x53ecff, big)
    this.audio.kill(big)
    this.callbacks.onKill?.(enemy, { position: pos, crit })
    this.scene.remove(enemy.group)
    this.scene.remove(enemy.shadow)
    this.scene.remove(enemy.groundGlow)
    enemy.health.group.visible = false
    // Dispose unique materials/geometries
    enemy.group.traverse((child) => {
      if (child.geometry) child.geometry.dispose()
      if (child.material) {
        const mats = Array.isArray(child.material) ? child.material : [child.material]
        mats.forEach((m) => m.dispose())
      }
    })
    enemy.shadow.geometry.dispose()
    enemy.shadow.material.dispose()
    enemy.groundGlow.geometry.dispose()
    enemy.groundGlow.material.dispose()
    enemy.removeAt = 0.15
  }

  update(dt, elapsed) {
    const player = this.playerPosition
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const e = this.enemies[i]
      if (e.dead) {
        e.removeAt -= dt
        if (e.removeAt <= 0) this.enemies.splice(i, 1)
        continue
      }
      e.spawnT += dt
      const spawnK = clamp(e.spawnT / 0.7, 0, 1)
      const scale = e.scaleBase * (spawnK < 1 ? (0.2 + 0.8 * (1 - Math.pow(1 - spawnK, 3))) : 1)
      e.group.scale.setScalar(scale)

      const dx = player.x - e.group.position.x
      const dz = player.z - e.group.position.z
      const dist = Math.hypot(dx, dz) || 0.001
      const nx = dx / dist
      const nz = dz / dist
      const standoff = e.kind === 'warden' ? 12.5 : 9.5
      let moveX = 0
      let moveZ = 0
      if (dist > standoff + 2.5) {
        moveX += nx
        moveZ += nz
      } else if (dist < standoff - 3.5) {
        moveX -= nx
        moveZ -= nz
      }
      // Orbit / strafe
      const strafe = Math.sin(elapsed * 0.85 + e.strafePhase) * (e.kind === 'warden' ? 0.38 : 0.62) * e.strafeDir
      moveX += -nz * strafe
      moveZ += nx * strafe
      // Keep a little breathing room from other drones
      for (const other of this.enemies) {
        if (other === e || other.dead) continue
        const ox = e.group.position.x - other.group.position.x
        const oz = e.group.position.z - other.group.position.z
        const od = Math.hypot(ox, oz)
        if (od > 0.01 && od < 3.2) {
          moveX += (ox / od) * (3.2 - od) * 0.28
          moveZ += (oz / od) * (3.2 - od) * 0.28
        }
      }
      const len = Math.hypot(moveX, moveZ)
      if (len > 0.001) {
        moveX /= len
        moveZ /= len
      }
      const sp = e.speed * (e.spawnT < 0.8 ? 0.25 : 1)
      e.group.position.x += moveX * sp * dt
      e.group.position.z += moveZ * sp * dt
      e.group.position.x = clamp(e.group.position.x, -38, 38)
      e.group.position.z = clamp(e.group.position.z, -38, 38)
      e.group.position.y = e.hoverBase + Math.sin(elapsed * 1.9 + e.phase) * e.bobAmp

      const targetYaw = Math.atan2(dx, dz)
      e.group.rotation.y = damp(e.group.rotation.y, targetYaw, 6, dt)
      e.group.rotation.z = damp(e.group.rotation.z, -strafe * 0.15, 3, dt)
      e.group.rotation.x = damp(e.group.rotation.x, clamp((e.hoverBase - player.y) * 0.025, -0.1, 0.15), 3, dt)

      e.ring.rotation.z += dt * (e.kind === 'warden' ? 0.9 : 1.8)
      e.ring2.rotation.z -= dt * 1.3
      e.eyeGlow.material.opacity = 0.58 + Math.sin(elapsed * 3 + e.phase) * 0.15

      if (e.flash > 0) {
        e.flash = Math.max(0, e.flash - dt * 7)
        const f = e.flash
        e.armor.emissive.setRGB(f, f, f)
        e.armor.emissiveIntensity = 0.34 + f * 4.2
        e.eyeMat.color.setRGB(1, 0.35 + f * 0.65, 0.4 + f * 0.6)
      } else {
        e.armor.emissive.setHex(e.kind === 'warden' ? 0xff3bd1 : 0xff345c)
        e.armor.emissiveIntensity = 0.34
      }

      if (e.healthVisible) {
        const hp = clamp(e.hp / e.maxHp, 0, 1)
        e.health.fill.scale.x = Math.max(0.001, hp)
        e.health.fill.material.color.setHex(hp > 0.55 ? 0xffb04a : hp > 0.25 ? 0xff7a3d : 0xff3148)
      }

      e.shadow.position.set(e.group.position.x, 0.025, e.group.position.z)
      e.groundGlow.position.set(e.group.position.x, 0.035, e.group.position.z)
      e.groundGlow.material.opacity = 0.045 + Math.sin(elapsed * 2.4 + e.phase) * 0.02
      const height = e.group.position.y
      e.shadow.material.opacity = clamp(0.55 - height * 0.07, 0.16, 0.5)
      e.shadow.scale.setScalar((e.kind === 'warden' ? 3.2 : 2.1) * (1 - height * 0.018))

      // Fire
      if (e.spawnT > 0.9 && dist < 38) {
        if (e.burstLeft > 0) {
          e.burstTimer -= dt
          if (e.burstTimer <= 0) {
            this.fire(e)
            e.burstLeft--
            e.burstTimer = 0.17
          }
        } else {
          e.fireTimer -= dt
          if (e.fireTimer <= 0) {
            const didFire = this.fire(e)
            if (didFire) {
              e.fireTimer = e.fireInterval * rand(0.9, 1.12)
              if (e.kind === 'warden') {
                e.burstLeft = 2
                e.burstTimer = 0.18
              }
            } else {
              e.fireTimer = 0.25
            }
          }
        }
      }
    }

    this.updateProjectiles(dt)
  }

  fire(e) {
    const muzzle = e.eye.getWorldPosition(this.tmpVec)
    const target = this.tmpVec2.copy(this.playerPosition)
    const distance = muzzle.distanceTo(target)
    if (distance < 0.1) return false
    if (this.world.isBlocked(muzzle, target, 0.8)) return false
    const dir = target.sub(muzzle).normalize()
    const spread = e.kind === 'warden' ? 0.028 : 0.045
    dir.x += rand(-spread, spread)
    dir.y += rand(-spread, spread)
    dir.z += rand(-spread, spread)
    dir.normalize()
    this.spawnProjectile(muzzle.clone(), dir, e)
    this.effects.muzzle(muzzle, dir)
    this.audio.enemyShoot(clamp(1 - distance / 42, 0.3, 1))
    return true
  }

  spawnProjectile(origin, dir, enemy) {
    const group = new THREE.Group()
    const color = enemy.kind === 'warden' ? 0xffb347 : 0xff2f72
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(enemy.kind === 'warden' ? 0.16 : 0.12, 10, 8),
      new THREE.MeshBasicMaterial({ color: 0xffd6b0, toneMapped: false })
    )
    group.add(core)
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: makeGlowTexture(64), color, transparent: true, opacity: 0.95,
      blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false
    }))
    glow.scale.setScalar(enemy.kind === 'warden' ? 1.35 : 1.0)
    group.add(glow)
    const tail = new THREE.Mesh(
      new THREE.CylinderGeometry(0.055, 0.005, enemy.kind === 'warden' ? 1.0 : 0.7, 6, 1, true),
      new THREE.MeshBasicMaterial({
        color, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending,
        depthWrite: false, toneMapped: false
      })
    )
    tail.rotation.x = -Math.PI / 2
    tail.position.z = enemy.kind === 'warden' ? -0.6 : -0.42
    group.add(tail)
    group.position.copy(origin)
    group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir)
    this.scene.add(group)
    this.projectiles.push({
      group,
      velocity: dir.clone().multiplyScalar(enemy.kind === 'warden' ? 19 : 23),
      life: 5,
      damage: enemy.damage,
      color,
      radius: enemy.kind === 'warden' ? 0.2 : 0.15
    })
  }

  updateProjectiles(dt) {
    const player = this.playerPosition
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i]
      p.life -= dt
      const prev = p.group.position.clone()
      p.group.position.addScaledVector(p.velocity, dt)
      const pos = p.group.position
      let hitPlayer = pos.distanceTo(player) < 0.75
      if (hitPlayer) {
        this.callbacks.onPlayerHit?.(p.damage, p.velocity.clone().normalize())
        this.removeProjectile(i, true)
        continue
      }
      let worldHit = pos.y < 0.12
      if (!worldHit) {
        for (const box of this.world.colliders) {
          if (segmentBoxIntersection(prev, pos, box)) { worldHit = true; break }
        }
      }
      if (worldHit) {
        this.removeProjectile(i, true)
        continue
      }
      if (p.life <= 0 || Math.abs(pos.x) > 48 || Math.abs(pos.z) > 48) this.removeProjectile(i, false)
    }
  }

  removeProjectile(index, explode) {
    const p = this.projectiles[index]
    if (explode) {
      this.effects.explosion(p.group.position.clone(), p.color, false)
      this.effects.spark(p.group.position.clone(), null, p.color, 8, 4, 0.06)
    }
    this.scene.remove(p.group)
    p.group.traverse((child) => {
      if (child.geometry) child.geometry.dispose()
      if (child.material) {
        const mats = Array.isArray(child.material) ? child.material : [child.material]
        mats.forEach((m) => { if (m.map) m.map.dispose(); m.dispose() })
      }
    })
    this.projectiles.splice(index, 1)
  }

  raycast(ray, maxDistance = 100) {
    let best = null
    for (const e of this.enemies) {
      if (e.dead) continue
      this.tmpSphere.center.copy(e.group.position)
      this.tmpSphere.radius = e.bodyRadius
      const bodyHit = ray.intersectSphere(this.tmpSphere, this.tmpVec)
      if (!bodyHit) continue
      const t = bodyHit.distanceTo(ray.origin)
      if (t > maxDistance) continue
      let crit = false
      const eyePos = e.eye.getWorldPosition(new THREE.Vector3())
      this.tmpSphere.center.copy(eyePos)
      this.tmpSphere.radius = e.critRadius
      const critHit = ray.intersectSphere(this.tmpSphere, this.tmpVec2)
      if (critHit) {
        const ct = critHit.distanceTo(ray.origin)
        if (ct <= t + 0.6) {
          crit = true
          if (!best || ct < best.t) best = { enemy: e, t: ct, point: critHit.clone(), crit: true }
          continue
        }
      }
      if (!best || t < best.t) best = { enemy: e, t, point: bodyHit.clone(), crit }
    }
    return best
  }

  getAimCandidate(origin, direction, maxAngle = 0.07) {
    let best = null
    let bestScore = Infinity
    const flatDir = new THREE.Vector3(direction.x, direction.y, direction.z).normalize()
    for (const e of this.enemies) {
      if (e.dead || e.spawnT < 0.2) continue
      const to = e.group.position.clone().sub(origin)
      const dist = to.length()
      if (dist > 42) continue
      to.normalize()
      const dot = clamp(to.dot(flatDir), -1, 1)
      const angle = Math.acos(dot)
      if (angle < maxAngle && angle < bestScore) {
        bestScore = angle
        best = e
      }
    }
    return best
  }

  get alive() {
    return this.enemies.filter((e) => !e.dead).length
  }

  clear() {
    for (const e of this.enemies) {
      if (!e.dead) {
        this.scene.remove(e.group)
        this.scene.remove(e.shadow)
        this.scene.remove(e.groundGlow)
      }
    }
    for (const p of this.projectiles) {
      this.scene.remove(p.group)
    }
    this.projectiles.length = 0
    this.enemies.length = 0
  }
}
