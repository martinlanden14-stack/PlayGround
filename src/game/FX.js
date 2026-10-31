import * as THREE from 'three'
import { makeSparkTexture, makeGlowTexture, makeSmokeTexture } from './textures.js'

const TAU = Math.PI * 2

function rand(a, b) { return a + Math.random() * (b - a) }

function makeSlashTexture(size = 256) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')
  ctx.translate(size / 2, size / 2)
  ctx.rotate(-0.35)
  const g = ctx.createLinearGradient(-size * 0.46, 0, size * 0.46, 0)
  g.addColorStop(0, 'rgba(255,255,255,0)')
  g.addColorStop(0.22, 'rgba(255,230,180,.15)')
  g.addColorStop(0.48, 'rgba(255,255,245,.95)')
  g.addColorStop(0.54, 'rgba(255,160,70,.8)')
  g.addColorStop(0.72, 'rgba(255,70,20,.18)')
  g.addColorStop(1, 'rgba(255,0,0,0)')
  ctx.strokeStyle = g
  ctx.lineCap = 'round'
  ctx.lineWidth = size * 0.035
  ctx.beginPath()
  ctx.arc(0, size * 0.26, size * 0.44, Math.PI * 1.12, Math.PI * 1.88)
  ctx.stroke()
  ctx.lineWidth = size * 0.012
  ctx.strokeStyle = 'rgba(255,255,255,.85)'
  ctx.beginPath()
  ctx.arc(0, size * 0.25, size * 0.43, Math.PI * 1.14, Math.PI * 1.86)
  ctx.stroke()
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

function makeRingTexture(size = 128) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(size / 2, size / 2, size * 0.24, size / 2, size / 2, size * 0.48)
  g.addColorStop(0, 'rgba(255,255,255,0)')
  g.addColorStop(0.7, 'rgba(255,190,110,.2)')
  g.addColorStop(0.88, 'rgba(255,255,240,.9)')
  g.addColorStop(1, 'rgba(255,80,30,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

export class FX {
  constructor(scene) {
    this.scene = scene
    this.bursts = []
    this.rings = []
    this.slashes = []
    this.projectiles = []
    this.smoke = []
    this.sparkTex = makeSparkTexture()
    this.glowTex = makeGlowTexture(128, 'rgba(255,255,255,1)', 'rgba(255,120,50,.5)')
    this.smokeTex = makeSmokeTexture(128)
    this.slashTex = makeSlashTexture()
    this.ringTex = makeRingTexture()
  }

  burst(position, color = 0xffb066, count = 26, power = 1, gravity = 7) {
    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = position.x
      positions[i * 3 + 1] = position.y
      positions[i * 3 + 2] = position.z + rand(-0.08, 0.08)
      const a = Math.random() * TAU
      const b = rand(-1, 1)
      const r = Math.sqrt(1 - b * b)
      const speed = rand(0.8, 3.8) * power
      velocities[i * 3] = Math.cos(a) * r * speed
      velocities[i * 3 + 1] = Math.abs(b) * speed * 0.9 + rand(0.4, 2.2)
      velocities[i * 3 + 2] = Math.sin(a) * r * speed * 0.45
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const mat = new THREE.PointsMaterial({
      map: this.sparkTex, color, size: rand(0.045, 0.09) * Math.min(1.4, power),
      transparent: true, opacity: 1, depthWrite: false,
      blending: THREE.AdditiveBlending, sizeAttenuation: true,
    })
    const points = new THREE.Points(geo, mat)
    points.frustumCulled = false
    this.scene.add(points)
    this.bursts.push({ points, velocities, life: 0, maxLife: rand(0.36, 0.72), gravity })
  }

  smokeBurst(position, color = 0x8b8d88, count = 14, scale = 1) {
    for (let i = 0; i < count; i++) {
      const mat = new THREE.SpriteMaterial({
        map: this.smokeTex, color, transparent: true, opacity: 0.22,
        depthWrite: false, blending: THREE.NormalBlending,
      })
      const s = new THREE.Sprite(mat)
      s.position.set(position.x + rand(-0.2, 0.2), position.y + rand(-0.1, 0.2), position.z + rand(-0.2, 0.2))
      s.scale.setScalar(rand(0.2, 0.45) * scale)
      this.scene.add(s)
      this.smoke.push({ sprite: s, life: 0, maxLife: rand(0.5, 1.1), vy: rand(0.08, 0.3), vx: rand(-0.25, 0.25) })
    }
  }

  ring(position, color = 0xffc07a, scale = 1) {
    const mat = new THREE.SpriteMaterial({
      map: this.ringTex, color, transparent: true, opacity: 0.9,
      depthWrite: false, blending: THREE.AdditiveBlending,
    })
    const s = new THREE.Sprite(mat)
    s.position.copy(position)
    s.position.z += 0.3
    s.scale.setScalar(0.4 * scale)
    this.scene.add(s)
    this.rings.push({ sprite: s, life: 0, maxLife: 0.34, scale })
  }

  slash(position, color = 0xffe0ad, rotation = 0, scale = 1) {
    const mat = new THREE.SpriteMaterial({
      map: this.slashTex, color, transparent: true, opacity: 0.95,
      depthWrite: false, blending: THREE.AdditiveBlending, rotation,
    })
    const s = new THREE.Sprite(mat)
    s.position.copy(position)
    s.position.z += 0.5
    s.scale.set(1.2 * scale, 0.9 * scale, 1)
    this.scene.add(s)
    this.slashes.push({ sprite: s, life: 0, maxLife: 0.22, rot: rotation })
  }

  impact(position, { color = 0xffc27a, heavy = false, block = false, blood = false } = {}) {
    this.burst(position, color, heavy ? 46 : 26, heavy ? 1.7 : 1.1)
    this.ring(position, color, heavy ? 1.7 : 1)
    this.slash(position, block ? 0x9fe8ff : 0xffe0ad, rand(-0.9, 0.9), heavy ? 1.2 : 0.7)
    if (block) {
      this.burst(position, 0x78e4ff, 16, 0.7)
      this.ring(position, 0x5fe8ff, 0.8)
    }
    if (blood) {
      this.burst(position, 0xb01e24, heavy ? 30 : 16, 0.9, 9)
      this.smokeBurst(position, 0x5d1618, 6, 0.8)
    }
    if (heavy) this.smokeBurst(position, 0x6e6258, 8, 1.2)
  }

  spawnProjectile(owner, origin, direction, def) {
    const color = def.specialColor
    const group = new THREE.Group()
    group.position.copy(origin)
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.105, 16, 12),
      new THREE.MeshBasicMaterial({ color: 0xfff0d0 }),
    )
    group.add(core)
    const shell = new THREE.Mesh(
      new THREE.SphereGeometry(0.23, 18, 12),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.34, blending: THREE.AdditiveBlending, depthWrite: false }),
    )
    group.add(shell)
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: this.glowTex, color, transparent: true, opacity: 0.9,
      depthWrite: false, blending: THREE.AdditiveBlending,
    }))
    glow.scale.set(1.0, 1.0, 1)
    group.add(glow)
    const light = new THREE.PointLight(color, 16, 3.8, 2)
    group.add(light)
    this.scene.add(group)
    const projectile = {
      group, core, shell, glow, light, owner, x: origin.x, y: origin.y, z: origin.z,
      vx: direction * 7.2, alive: true, life: 0, maxLife: 2.2, damage: def.damage,
      color, type: def.id,
    }
    this.projectiles.push(projectile)
    this.burst(origin, color, 18, 0.8)
    return projectile
  }

  destroyProjectile(p, impact = true) {
    if (!p.alive) return
    p.alive = false
    if (impact) {
      this.burst(p.group.position, p.color, 34, 1.5)
      this.ring(p.group.position, p.color, 1.5)
      this.smokeBurst(p.group.position, 0x3f4b4c, 8, 1)
    }
    this.scene.remove(p.group)
    p.core.geometry.dispose()
    p.shell.geometry.dispose()
    p.light.dispose?.()
  }

  update(dt) {
    for (let i = this.bursts.length - 1; i >= 0; i--) {
      const b = this.bursts[i]
      b.life += dt
      const pos = b.points.geometry.attributes.position.array
      const v = b.velocities
      for (let j = 0; j < pos.length / 3; j++) {
        v[j * 3 + 1] -= b.gravity * dt
        pos[j * 3] += v[j * 3] * dt
        pos[j * 3 + 1] += v[j * 3 + 1] * dt
        pos[j * 3 + 2] += v[j * 3 + 2] * dt
      }
      b.points.geometry.attributes.position.needsUpdate = true
      b.points.material.opacity = Math.max(0, 1 - b.life / b.maxLife)
      if (b.life >= b.maxLife) {
        this.scene.remove(b.points)
        b.points.geometry.dispose()
        b.points.material.dispose()
        this.bursts.splice(i, 1)
      }
    }
    for (let i = this.rings.length - 1; i >= 0; i--) {
      const r = this.rings[i]
      r.life += dt
      const u = r.life / r.maxLife
      r.sprite.scale.setScalar((0.4 + u * 1.8) * r.scale)
      r.sprite.material.opacity = Math.max(0, (1 - u) * 0.9)
      if (r.life >= r.maxLife) {
        this.scene.remove(r.sprite)
        r.sprite.material.dispose()
        this.rings.splice(i, 1)
      }
    }
    for (let i = this.slashes.length - 1; i >= 0; i--) {
      const s = this.slashes[i]
      s.life += dt
      const u = s.life / s.maxLife
      s.sprite.material.opacity = Math.max(0, (1 - u) * 0.95)
      s.sprite.material.rotation = s.rot + u * 0.4
      s.sprite.scale.set(1.2 + u * 0.4, 0.9 + u * 0.2, 1)
      if (s.life >= s.maxLife) {
        this.scene.remove(s.sprite)
        s.sprite.material.dispose()
        this.slashes.splice(i, 1)
      }
    }
    for (let i = this.smoke.length - 1; i >= 0; i--) {
      const s = this.smoke[i]
      s.life += dt
      const u = s.life / s.maxLife
      s.sprite.position.y += s.vy * dt
      s.sprite.position.x += s.vx * dt
      s.sprite.scale.setScalar(0.25 + u * 0.6)
      s.sprite.material.opacity = Math.max(0, (1 - u) * 0.2)
      if (s.life >= s.maxLife) {
        this.scene.remove(s.sprite)
        s.sprite.material.dispose()
        this.smoke.splice(i, 1)
      }
    }
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i]
      if (!p.alive) { this.projectiles.splice(i, 1); continue }
      p.life += dt
      p.x += p.vx * dt
      p.group.position.x = p.x
      p.group.position.y = p.y + Math.sin(p.life * 16) * 0.035
      p.shell.rotation.x += dt * 7
      p.shell.rotation.y += dt * 5
      p.glow.material.opacity = 0.7 + Math.sin(p.life * 24) * 0.18
      if (Math.random() < 0.22) {
        this.burst({ x: p.x, y: p.group.position.y, z: 0.1 }, p.color, 1, 0.22, 0)
      }
      if (p.life > p.maxLife) this.destroyProjectile(p, false)
    }
  }
}
