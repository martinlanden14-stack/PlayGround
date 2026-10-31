import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { clamp, damp, rand, makeGlowTexture, normalMapFromHeight, noise } from './utils.js'

let weaponNormal = null
function getWeaponNormal() {
  if (weaponNormal) return weaponNormal
  weaponNormal = normalMapFromHeight(256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#808080'
    ctx.fillRect(0, 0, w, h)
    // Brushed metal streaks and micro dings.
    for (let i = 0; i < 260; i++) {
      const v = Math.floor(rand(90, 168))
      ctx.fillStyle = `rgba(${v},${v},${v},${rand(0.15, 0.5)})`
      ctx.fillRect(rand(0, w), rand(0, h), rand(2, 48), rand(0.6, 1.8))
    }
    for (let i = 0; i < 70; i++) {
      const v = Math.floor(rand(40, 90))
      ctx.fillStyle = `rgba(${v},${v},${v},0.4)`
      ctx.fillRect(rand(0, w), rand(0, h), rand(1, 8), rand(1, 2))
    }
    noise(ctx, w, h, 1400, 0.16, true)
  }, { strength: 1.5 })
  return weaponNormal
}

function makeGunLabel(text, color = '#59f6ff') {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 128
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, 256, 128)
  ctx.fillStyle = 'rgba(3,8,12,0.92)'
  ctx.fillRect(0, 0, 256, 128)
  ctx.strokeStyle = color
  ctx.globalAlpha = 0.55
  ctx.lineWidth = 3
  ctx.strokeRect(4, 4, 248, 120)
  ctx.globalAlpha = 1
  ctx.fillStyle = color
  ctx.font = '900 52px Orbitron, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.shadowColor = color
  ctx.shadowBlur = 12
  ctx.fillText(text, 128, 54)
  ctx.font = '700 17px Rajdhani, sans-serif'
  ctx.shadowBlur = 5
  ctx.fillStyle = '#a7d9e3'
  ctx.fillText('PULSE // 09', 128, 96)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

export class Weapon {
  constructor({ camera, scene, effects, audio, viewAspect = 1 }) {
    this.camera = camera
    this.scene = scene
    this.effects = effects
    this.audio = audio
    this.magSize = 30
    this.mag = 30
    this.reserve = Infinity
    this.fireTimer = 0
    this.fireRate = 0.104
    this.reloading = false
    this.reloadTimer = 0
    this.reloadDuration = 1.38
    this.autoReloadTimer = -1
    this.adsK = 0
    this.recoil = 0
    this.recoilVelocity = 0
    this.reloadK = 0
    this.shots = 0
    this.hits = 0
    this.viewAspect = viewAspect
    this.baseHip = new THREE.Vector3(0.36, -0.3, -0.66)
    this.baseAds = new THREE.Vector3(0, -0.14, -0.54)
    this.rig = new THREE.Group()
    camera.add(this.rig)
    this.build()
  }

  build() {
    const gun = new THREE.Group()
    gun.scale.setScalar(0.56)
    this.gun = gun
    this.rig.add(gun)

    const weaponNormalTex = getWeaponNormal()
    const gunmetal = new THREE.MeshStandardMaterial({
      color: 0x46545f, metalness: 0.78, roughness: 0.36, envMapIntensity: 1.3,
      normalMap: weaponNormalTex, normalScale: new THREE.Vector2(0.32, 0.32),
      emissive: 0x040a0f, emissiveIntensity: 0.5
    })
    const polymer = new THREE.MeshStandardMaterial({
      color: 0x1f272e, metalness: 0.44, roughness: 0.62, envMapIntensity: 1.0,
      normalMap: weaponNormalTex, normalScale: new THREE.Vector2(0.42, 0.42),
      emissive: 0x020608, emissiveIntensity: 0.32
    })
    const steel = new THREE.MeshStandardMaterial({
      color: 0x8d9ca5, metalness: 1, roughness: 0.26, envMapIntensity: 1.5,
      normalMap: weaponNormalTex, normalScale: new THREE.Vector2(0.22, 0.22)
    })
    const accent = new THREE.MeshBasicMaterial({ color: 0x54f7ff, toneMapped: false })
    const orange = new THREE.MeshBasicMaterial({ color: 0xff8a34, toneMapped: false })
    const glass = new THREE.MeshPhysicalMaterial({
      color: 0x1c5d78, metalness: 0, roughness: 0.05, transmission: 0.5,
      transparent: true, opacity: 0.32, envMapIntensity: 1.4
    })
    this.materials = { gunmetal, polymer, steel, accent, orange, glass }

    const rounded = (w, h, d, r = 0.02) => new RoundedBoxGeometry(w, h, d, 2, r)
    // Receiver
    const body = new THREE.Mesh(rounded(0.15, 0.17, 0.72, 0.028), gunmetal)
    body.position.set(0, 0, -0.14)
    gun.add(body)
    const upper = new THREE.Mesh(rounded(0.13, 0.075, 0.67, 0.016), polymer)
    upper.position.set(0, 0.105, -0.18)
    gun.add(upper)
    const topRail = new THREE.Mesh(new THREE.BoxGeometry(0.095, 0.032, 0.55), steel)
    topRail.position.set(0, 0.158, -0.19)
    gun.add(topRail)
    for (let i = 0; i < 9; i++) {
      const notch = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.014, 0.018), polymer)
      notch.position.set(0, 0.18, -0.42 + i * 0.055)
      gun.add(notch)
    }
    // Side panels
    for (const side of [-1, 1]) {
      const panel = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.09, 0.33), polymer)
      panel.position.set(side * 0.081, -0.01, -0.18)
      gun.add(panel)
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.018, 0.1), accent)
      stripe.position.set(side * 0.088, 0.045, -0.24)
      gun.add(stripe)
    }

    // Receiver fasteners, panel seams and charging handle.
    const seamMat = new THREE.MeshStandardMaterial({ color: 0x10171c, metalness: 0.6, roughness: 0.55 })
    for (let i = 0; i < 3; i++) {
      const seam = new THREE.Mesh(new THREE.BoxGeometry(0.006, 0.11, 0.014), seamMat)
      seam.position.set(-0.077, 0.005, -0.38 + i * 0.2)
      gun.add(seam)
    }
    for (const [sy, sz] of [[0.055, -0.42], [0.055, 0.04], [-0.05, -0.42], [-0.05, 0.04]]) {
      const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.008, 6), steel)
      bolt.rotation.z = Math.PI / 2
      bolt.position.set(-0.079, sy, sz)
      gun.add(bolt)
    }
    const charge = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.026, 0.12), steel)
    charge.position.set(0.072, 0.075, 0.06)
    gun.add(charge)

    // Barrel shroud and barrel
    const shroud = new THREE.Mesh(new THREE.CylinderGeometry(0.061, 0.072, 0.42, 10), gunmetal)
    shroud.rotation.x = Math.PI / 2
    shroud.position.set(0, 0.02, -0.68)
    gun.add(shroud)
    for (let i = 0; i < 4; i++) {
      const slit = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.014, 0.045), polymer)
      slit.position.set(0, 0.07, -0.55 - i * 0.075)
      gun.add(slit)
    }
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.026, 0.48, 10), steel)
    barrel.rotation.x = Math.PI / 2
    barrel.position.set(0, 0.02, -0.95)
    gun.add(barrel)
    const muzzleBrake = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.045, 0.14, 8), polymer)
    muzzleBrake.rotation.x = Math.PI / 2
    muzzleBrake.position.set(0, 0.02, -1.19)
    gun.add(muzzleBrake)
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.047, 0.008, 5, 12), steel)
      ring.position.set(0, 0.02, -1.15 - i * 0.035)
      gun.add(ring)
    }
    const muzzleGlow = new THREE.Mesh(new THREE.CircleGeometry(0.032, 12), accent)
    muzzleGlow.position.set(0, 0.02, -1.263)
    gun.add(muzzleGlow)
    this.muzzleGlow = muzzleGlow

    this.muzzle = new THREE.Object3D()
    this.muzzle.position.set(0, 0.02, -1.3)
    gun.add(this.muzzle)

    // Stock
    const stock = new THREE.Mesh(rounded(0.11, 0.15, 0.28, 0.022), polymer)
    stock.position.set(0, -0.01, 0.35)
    gun.add(stock)
    const stockTrim = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.035, 0.2), gunmetal)
    stockTrim.position.set(0, 0.06, 0.35)
    gun.add(stockTrim)
    const butt = new THREE.Mesh(rounded(0.13, 0.19, 0.04, 0.018), polymer)
    butt.position.set(0, -0.01, 0.5)
    gun.add(butt)

    // Magazine
    const mag = new THREE.Mesh(rounded(0.1, 0.26, 0.17, 0.02), gunmetal)
    mag.position.set(0, -0.195, -0.08)
    mag.rotation.x = 0.24
    gun.add(mag)
    const magStripe = new THREE.Mesh(new THREE.BoxGeometry(0.105, 0.018, 0.12), orange)
    magStripe.position.set(0, -0.245, -0.055)
    magStripe.rotation.x = 0.24
    gun.add(magStripe)
    this.magMesh = mag

    // Grip
    const grip = new THREE.Mesh(rounded(0.085, 0.22, 0.11, 0.022), polymer)
    grip.position.set(0, -0.16, 0.12)
    grip.rotation.x = -0.28
    gun.add(grip)
    const triggerGuard = new THREE.Mesh(new THREE.TorusGeometry(0.055, 0.009, 5, 12, Math.PI * 1.2), steel)
    triggerGuard.position.set(0, -0.09, -0.01)
    triggerGuard.rotation.z = 0.2
    gun.add(triggerGuard)

    // Handguard / underbarrel rail
    const handguard = new THREE.Mesh(rounded(0.11, 0.08, 0.34, 0.018), polymer)
    handguard.position.set(0, -0.075, -0.55)
    gun.add(handguard)
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.02, 0.3), steel)
    rail.position.set(0, -0.122, -0.55)
    gun.add(rail)
    const sideLight = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.015, 0.18), accent)
    handguard.position.x = 0
    const lightStrip = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.014, 0.17), accent)
    lightStrip.position.set(-0.061, -0.06, -0.55)
    gun.add(lightStrip)

    // Holo sight
    const sightBase = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.035, 0.16), polymer)
    sightBase.position.set(0, 0.195, -0.2)
    gun.add(sightBase)
    const sightFrameMat = new THREE.MeshBasicMaterial({ color: 0x173b44, toneMapped: false })
    const sightFrame = new THREE.Group()
    sightFrame.position.set(0, 0.255, -0.22)
    const frameTop = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.012, 0.02), sightFrameMat)
    frameTop.position.y = 0.05
    const frameBottom = frameTop.clone(); frameBottom.position.y = -0.045
    const frameLeft = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.1, 0.02), sightFrameMat)
    frameLeft.position.x = -0.055
    const frameRight = frameLeft.clone(); frameRight.position.x = 0.055
    sightFrame.add(frameTop, frameBottom, frameLeft, frameRight)
    const lens = new THREE.Mesh(new THREE.PlaneGeometry(0.095, 0.08), glass)
    lens.position.z = -0.003
    sightFrame.add(lens)
    const dot = new THREE.Mesh(new THREE.CircleGeometry(0.0055, 10), new THREE.MeshBasicMaterial({ color: 0xff553d, toneMapped: false }))
    dot.position.set(0, 0, 0.001)
    sightFrame.add(dot)
    const dotGlow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: makeGlowTexture(48), color: 0xff5a40, transparent: true, opacity: 0.6,
      blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false
    }))
    dotGlow.scale.setScalar(0.035)
    dotGlow.position.z = 0.002
    sightFrame.add(dotGlow)
    gun.add(sightFrame)
    this.sightFrame = sightFrame
    this.sightDot = dot

    // Side label / ammo counter
    this.labelCanvas = document.createElement('canvas')
    this.labelCanvas.width = 256
    this.labelCanvas.height = 160
    this.labelTexture = new THREE.CanvasTexture(this.labelCanvas)
    this.labelTexture.colorSpace = THREE.SRGBColorSpace
    this.drawAmmoLabel()
    const label = new THREE.Mesh(
      new THREE.PlaneGeometry(0.088, 0.055),
      new THREE.MeshBasicMaterial({ map: this.labelTexture, transparent: true, toneMapped: true })
    )
    label.position.set(-0.076, -0.005, -0.1)
    label.rotation.y = -Math.PI / 2
    gun.add(label)

    // Gloved hand and forearm on the grip
    const glove = new THREE.MeshStandardMaterial({ color: 0x18222b, metalness: 0.12, roughness: 0.85, envMapIntensity: 0.5 })
    const gloveTrim = new THREE.MeshStandardMaterial({ color: 0x27333c, metalness: 0.3, roughness: 0.7 })
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.1, 14, 10), glove)
    hand.scale.set(0.72, 1.05, 0.82)
    hand.position.set(0.005, -0.17, 0.14)
    hand.rotation.x = 0.12
    gun.add(hand)
    for (let i = 0; i < 4; i++) {
      const finger = new THREE.Mesh(new THREE.CapsuleGeometry(0.018, 0.065, 3, 6), gloveTrim)
      finger.rotation.z = Math.PI / 2.1
      finger.rotation.y = -0.2
      finger.position.set(-0.045, -0.125 - i * 0.033, 0.105 + i * 0.004)
      gun.add(finger)
    }
    const thumb = new THREE.Mesh(new THREE.CapsuleGeometry(0.019, 0.075, 3, 6), gloveTrim)
    thumb.rotation.x = 1.2
    thumb.rotation.z = -0.5
    thumb.position.set(0.045, -0.16, 0.08)
    gun.add(thumb)

    const forearm = new THREE.Mesh(new THREE.CapsuleGeometry(0.055, 0.42, 4, 8), glove)
    forearm.position.set(0.18, -0.36, 0.34)
    forearm.rotation.x = 1.0
    forearm.rotation.z = -0.55
    gun.add(forearm)
    const cuff = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.075, 0.08, 8), gloveTrim)
    cuff.position.set(0.2, -0.31, 0.26)
    cuff.rotation.x = 1.0
    cuff.rotation.z = -0.55
    gun.add(cuff)

    // Left support hand under handguard
    const leftHand = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 8), glove)
    leftHand.scale.set(0.9, 0.6, 1.1)
    leftHand.position.set(-0.01, -0.16, -0.53)
    gun.add(leftHand)
    for (let i = 0; i < 4; i++) {
      const finger = new THREE.Mesh(new THREE.CapsuleGeometry(0.015, 0.06, 3, 6), gloveTrim)
      finger.rotation.z = Math.PI / 2
      finger.position.set(-0.055, -0.125 + i * 0.026, -0.57 + i * 0.016)
      gun.add(finger)
    }

    // Muzzle light
    this.muzzleLight = new THREE.PointLight(0xffb35e, 0, 7, 2)
    this.muzzleLight.position.set(0, 0.02, -1.25)
    gun.add(this.muzzleLight)

    // Dedicated view-model lighting so the rifle stays readable in dark arenas.
    this.keyLight = new THREE.PointLight(0xb8e4f6, 0.32, 3.2, 2)
    this.keyLight.position.set(0.45, 0.58, 0.35)
    this.rig.add(this.keyLight)
    this.rimLight = new THREE.PointLight(0x4fdfff, 0.22, 2.4, 2)
    this.rimLight.position.set(-0.42, -0.12, -0.42)
    this.rig.add(this.rimLight)
    this.warmFill = new THREE.PointLight(0xff9b55, 0.14, 2.2, 2)
    this.warmFill.position.set(0.05, 0.1, -0.95)
    this.rig.add(this.warmFill)
    this.flashTimer = 0
    this.flashSprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: makeGlowTexture(96), color: 0xffd08a, transparent: true, opacity: 0,
      blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false
    }))
    this.flashSprite.position.set(0, 0.02, -1.33)
    this.flashSprite.scale.set(0.45, 0.45, 1)
    gun.add(this.flashSprite)

    this.rig.position.copy(this.baseHip)
    this.rig.rotation.set(0.02, -0.02, 0)
    this.updateViewAspect(this.viewAspect)
  }

  drawAmmoLabel() {
    const ctx = this.labelCanvas.getContext('2d')
    ctx.clearRect(0, 0, 256, 160)
    ctx.fillStyle = '#041017'
    ctx.fillRect(0, 0, 256, 160)
    ctx.strokeStyle = '#2b7a88'
    ctx.lineWidth = 4
    ctx.strokeRect(5, 5, 246, 150)
    ctx.fillStyle = '#54f7ff'
    ctx.font = '900 92px Orbitron, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.shadowColor = '#54f7ff'
    ctx.shadowBlur = 18
    ctx.fillText(String(this.mag).padStart(2, '0'), 128, 74)
    ctx.shadowBlur = 0
    ctx.font = '700 20px Rajdhani, sans-serif'
    ctx.fillStyle = '#7daab2'
    ctx.fillText('VK-7  //  PULSE', 128, 133)
    // segmented bar
    for (let i = 0; i < 15; i++) {
      ctx.fillStyle = i < Math.ceil(this.mag / 2) ? '#54f7ff' : '#16353d'
      ctx.fillRect(18 + i * 14.8, 143, 10, 3)
    }
    this.labelTexture.needsUpdate = true
  }

  updateViewAspect(aspect) {
    this.viewAspect = aspect
    const narrow = aspect < 1
    this.baseHip.x = narrow ? 0.28 : 0.36
    this.baseHip.y = narrow ? -0.32 : -0.3
    this.baseHip.z = narrow ? -0.66 : -0.66
    this.baseAds.y = narrow ? -0.15 : -0.14
    if (this.gun) this.gun.scale.setScalar(narrow ? 0.7 : 0.58)
  }

  setVisible(visible) {
    this.rig.visible = visible
    this.muzzleLight.intensity = 0
  }

  startReload() {
    if (this.reloading || this.mag >= this.magSize) return false
    this.reloading = true
    this.reloadTimer = this.reloadDuration
    this.autoReloadTimer = -1
    this.audio.reload()
    return true
  }

  tryShoot() {
    if (this.reloading || this.fireTimer > 0) return false
    if (this.mag <= 0) {
      this.audio.empty()
      this.fireTimer = 0.22
      this.startReload()
      return false
    }
    this.mag--
    this.shots++
    this.drawAmmoLabel()
    this.fireTimer = this.fireRate
    this.recoil = Math.min(1.5, this.recoil + 0.52)
    this.recoilVelocity += rand(0.01, 0.02)
    this.flashTimer = 0.055
    this.flashSprite.material.opacity = 1
    this.flashSprite.material.rotation = rand(0, Math.PI * 2)
    this.flashSprite.scale.setScalar(rand(0.36, 0.62))
    this.muzzleLight.intensity = 16
    const muzzlePos = this.muzzle.getWorldPosition(new THREE.Vector3())
    this.effects.muzzle(muzzlePos, this.camera.getWorldDirection(new THREE.Vector3()))
    this.audio.shoot()
    if (this.mag <= 0) this.autoReloadTimer = 0.22
    return true
  }

  update(dt, { aiming = false, moving = 0, lookX = 0, lookY = 0 } = {}) {
    this.fireTimer = Math.max(0, this.fireTimer - dt)
    if (this.autoReloadTimer > 0) {
      this.autoReloadTimer -= dt
      if (this.autoReloadTimer <= 0) this.startReload()
    }
    this.adsK = damp(this.adsK, aiming && !this.reloading ? 1 : 0, 12, dt)

    if (this.reloading) {
      this.reloadTimer -= dt
      this.reloadK = 1 - Math.max(0, this.reloadTimer / this.reloadDuration)
      if (this.reloadTimer <= 0) {
        this.mag = this.magSize
        this.reloading = false
        this.reloadK = 0
        this.drawAmmoLabel()
      }
    } else {
      this.reloadK = damp(this.reloadK, 0, 10, dt)
    }

    this.recoil = damp(this.recoil, 0, 13, dt)
    this.recoilVelocity = damp(this.recoilVelocity, 0, 18, dt)

    const t = performance.now() * 0.001
    const breatheX = Math.sin(t * 0.85) * 0.004
    const breatheY = Math.cos(t * 1.1) * 0.0035
    const bob = Math.min(1, moving) * 0.012
    const bobX = Math.sin(t * 8.2) * bob
    const bobY = Math.abs(Math.cos(t * 8.2)) * bob * 0.7
    const swayX = clamp(-lookX * 0.008, -0.022, 0.022)
    const swayY = clamp(lookY * 0.006, -0.018, 0.018)

    const target = this.baseHip.clone().lerp(this.baseAds, this.adsK)
    target.x += breatheX + bobX + swayX
    target.y += breatheY - bobY + swayY
    target.z += this.recoil * 0.045

    // Reload flourish
    const reloadArc = Math.sin(this.reloadK * Math.PI)
    target.y -= reloadArc * 0.17
    target.z += reloadArc * 0.05

    this.rig.position.x = damp(this.rig.position.x, target.x, 18, dt)
    this.rig.position.y = damp(this.rig.position.y, target.y, 18, dt)
    this.rig.position.z = damp(this.rig.position.z, target.z, 18, dt)
    this.rig.rotation.x = damp(this.rig.rotation.x, 0.02 + this.recoil * 0.055 + reloadArc * -0.65, 16, dt)
    this.rig.rotation.y = damp(this.rig.rotation.y, -0.02 + swayX * 0.9 - this.adsK * 0.01 + reloadArc * 0.35, 16, dt)
    this.rig.rotation.z = damp(this.rig.rotation.z, reloadArc * 0.55 - swayX * 0.6, 16, dt)
    this.gun.position.z = -this.recoilVelocity * 0.35

    // Sight brightens in ADS
    this.sightDot.material.color.setRGB(1, 0.22 + (1 - this.adsK) * 0.15, 0.18)
    this.gun.rotation.x = this.adsK * 0.006

    if (this.flashTimer > 0) {
      this.flashTimer -= dt
      const k = Math.max(0, this.flashTimer / 0.055)
      this.flashSprite.material.opacity = k
      this.muzzleLight.intensity = k * 16
      this.muzzleGlow.material.color.setRGB(1, 0.7 + k * 0.3, 0.55)
    } else {
      this.muzzleLight.intensity = 0
      this.flashSprite.material.opacity = 0
      this.muzzleGlow.material.color.setHex(0x54f7ff)
    }
  }

  reset() {
    this.mag = this.magSize
    this.reloading = false
    this.reloadTimer = 0
    this.fireTimer = 0
    this.autoReloadTimer = -1
    this.recoil = 0
    this.recoilVelocity = 0
    this.adsK = 0
    this.shots = 0
    this.hits = 0
    this.drawAmmoLabel()
  }
}

export class Player {
  constructor({ camera, scene, world, effects, audio, weapon }) {
    this.camera = camera
    this.scene = scene
    this.world = world
    this.effects = effects
    this.audio = audio
    this.weapon = weapon
    this.position = new THREE.Vector3(0, 0, 18)
    this.velocity = new THREE.Vector3()
    this.yaw = 0
    this.pitch = -0.025
    this.radius = 0.38
    this.eyeHeight = 1.66
    this.health = 100
    this.maxHealth = 100
    this.shield = 40
    this.maxShield = 40
    this.dead = false
    this.timeSinceDamage = 99
    this.bobTime = 0
    this.stepTimer = 0
    this.shake = 0
    this.shakeT = 0
    this.roll = 0
    this.moveAmount = 0
    this.lookX = 0
    this.lookY = 0
    this.fov = 72
    this.baseFov = 72
    this.isTouch = false
    this.onDamage = null
    this.onDeath = null
    this.onFootstep = null
    this.camera.rotation.order = 'YXZ'
  }

  reset() {
    this.position.set(0, 0, 18)
    this.velocity.set(0, 0, 0)
    this.yaw = 0
    this.pitch = -0.025
    this.health = this.maxHealth
    this.shield = this.maxShield
    this.dead = false
    this.timeSinceDamage = 99
    this.bobTime = 0
    this.shake = 0
    this.roll = 0
    this.moveAmount = 0
    this.weapon.reset()
    this.updateCamera(0)
  }

  look(dx, dy, sensitivity = 0.0022) {
    if (this.dead) return
    this.yaw -= dx * sensitivity
    this.pitch -= dy * sensitivity
    this.pitch = clamp(this.pitch, -1.35, 1.32)
    this.lookX = clamp(this.lookX + dx * 0.55, -22, 22)
    this.lookY = clamp(this.lookY + dy * 0.55, -18, 18)
  }

  applyRecoil(pitchKick, yawKick) {
    this.pitch = clamp(this.pitch + pitchKick, -1.35, 1.32)
    this.yaw += yawKick
    this.shake = Math.min(0.11, this.shake + 0.012)
  }

  getShootOrigin() {
    return new THREE.Vector3(this.position.x, this.position.y + this.eyeHeight, this.position.z)
  }

  getShootDirection(spread = 0) {
    const dir = new THREE.Vector3(0, 0, -1)
    dir.applyEuler(new THREE.Euler(this.pitch, this.yaw, 0, 'YXZ'))
    if (spread > 0) {
      dir.x += rand(-spread, spread)
      dir.y += rand(-spread, spread)
      dir.z += rand(-spread, spread)
      dir.normalize()
    }
    return dir
  }

  takeDamage(amount, sourceDirection = null) {
    if (this.dead) return
    this.timeSinceDamage = 0
    let remaining = amount
    if (this.shield > 0) {
      const absorbed = Math.min(this.shield, remaining)
      this.shield -= absorbed
      remaining -= absorbed
    }
    this.health -= remaining
    this.shake = Math.min(0.17, this.shake + amount * 0.006)
    this.audio.hurt()
    this.onDamage?.(amount, sourceDirection)
    if (this.health <= 0) {
      this.health = 0
      this.dead = true
      this.onDeath?.()
    }
  }

  heal(amount) {
    this.health = Math.min(this.maxHealth, this.health + amount)
    this.shield = Math.min(this.maxShield, this.shield + amount * 0.6)
  }

  resolveCollisions() {
    const r = this.radius
    for (const box of this.world.colliders) {
      if (box.max.y < 0.15) continue
      const closestX = clamp(this.position.x, box.min.x, box.max.x)
      const closestZ = clamp(this.position.z, box.min.z, box.max.z)
      let dx = this.position.x - closestX
      let dz = this.position.z - closestZ
      const d2 = dx * dx + dz * dz
      if (d2 >= r * r) continue
      if (d2 > 1e-8) {
        const d = Math.sqrt(d2)
        this.position.x += (dx / d) * (r - d)
        this.position.z += (dz / d) * (r - d)
      } else {
        const left = Math.abs(this.position.x - box.min.x)
        const right = Math.abs(box.max.x - this.position.x)
        const front = Math.abs(this.position.z - box.min.z)
        const back = Math.abs(box.max.z - this.position.z)
        const min = Math.min(left, right, front, back)
        if (min === left) this.position.x = box.min.x - r
        else if (min === right) this.position.x = box.max.x + r
        else if (min === front) this.position.z = box.min.z - r
        else this.position.z = box.max.z + r
      }
    }
    this.position.x = clamp(this.position.x, -41.8, 41.8)
    this.position.z = clamp(this.position.z, -41.8, 41.8)
  }

  update(dt, input) {
    if (this.dead) {
      this.updateCamera(dt)
      return
    }
    this.timeSinceDamage += dt
    if (this.timeSinceDamage > 7) this.health = Math.min(this.maxHealth, this.health + 6 * dt)
    if (this.timeSinceDamage > 3.5) this.shield = Math.min(this.maxShield, this.shield + 14 * dt)
    this.lookX = damp(this.lookX, 0, 10, dt)
    this.lookY = damp(this.lookY, 0, 10, dt)

    let mx = input.moveX || 0
    let mz = input.moveY || 0
    const mag = Math.hypot(mx, mz)
    if (mag > 1) { mx /= mag; mz /= mag }
    const forward = new THREE.Vector3(-Math.sin(this.yaw), 0, -Math.cos(this.yaw))
    const right = new THREE.Vector3(Math.cos(this.yaw), 0, -Math.sin(this.yaw))
    const wantsMove = Math.hypot(mx, mz)
    const speed = 6.5
    const targetVel = new THREE.Vector3()
    targetVel.addScaledVector(forward, mz)
    targetVel.addScaledVector(right, mx)
    if (wantsMove > 1) targetVel.normalize()
    targetVel.multiplyScalar(speed)
    const accel = input.grounded === false ? 5 : 14
    this.velocity.x = damp(this.velocity.x, targetVel.x, accel, dt)
    this.velocity.z = damp(this.velocity.z, targetVel.z, accel, dt)
    if (wantsMove < 0.05) {
      this.velocity.x = damp(this.velocity.x, 0, 12, dt)
      this.velocity.z = damp(this.velocity.z, 0, 12, dt)
    }

    if (input.jump && this.position.y <= 0.001) {
      this.velocity.y = 7.0
      input.jump = false
    }
    this.velocity.y -= 19 * dt
    this.position.y += this.velocity.y * dt
    if (this.position.y < 0) {
      if (this.velocity.y < -6) this.audio.step()
      this.position.y = 0
      this.velocity.y = 0
      input.grounded = true
    } else {
      input.grounded = false
    }
    this.position.x += this.velocity.x * dt
    this.position.z += this.velocity.z * dt
    this.resolveCollisions()

    const planarSpeed = Math.hypot(this.velocity.x, this.velocity.z)
    this.moveAmount = clamp(planarSpeed / speed, 0, 1)
    if (planarSpeed > 0.4 && this.position.y < 0.02) {
      this.bobTime += dt * (7.4 + planarSpeed * 0.25)
      this.stepTimer -= planarSpeed * dt
      if (this.stepTimer <= 0) {
        this.stepTimer = 2.15
        this.audio.step()
        this.onFootstep?.()
      }
    }
    this.roll = damp(this.roll, -mx * 0.018, 6, dt)

    this.weapon.update(dt, {
      aiming: input.aim,
      moving: this.moveAmount,
      lookX: this.lookX,
      lookY: this.lookY
    })
    const targetFov = input.aim ? 55 : this.baseFov
    this.fov = damp(this.fov, targetFov, 9, dt)
    this.camera.fov = this.fov
    this.camera.updateProjectionMatrix()
    this.updateCamera(dt)
  }

  updateCamera(dt) {
    const speedK = this.moveAmount
    const bobY = Math.sin(this.bobTime * 2) * 0.026 * speedK
    const bobX = Math.cos(this.bobTime) * 0.02 * speedK
    this.shake = damp(this.shake, 0, 8, dt)
    const shakeX = (Math.random() - 0.5) * this.shake
    const shakeY = (Math.random() - 0.5) * this.shake
    this.camera.position.set(
      this.position.x + bobX + shakeX,
      this.position.y + this.eyeHeight + bobY + shakeY,
      this.position.z
    )
    this.camera.rotation.set(
      this.pitch + (Math.random() - 0.5) * this.shake * 0.8,
      this.yaw + (Math.random() - 0.5) * this.shake * 0.8,
      this.roll
    )
  }
}
