import * as THREE from 'three'
import { TAU, rand, makeGlowTexture } from './utils.js'

const MAX_PARTICLES = 1000

class ParticlePool {
  constructor(scene) {
    this.geometry = new THREE.BufferGeometry()
    this.positions = new Float32Array(MAX_PARTICLES * 3)
    this.colors = new Float32Array(MAX_PARTICLES * 3)
    this.sizes = new Float32Array(MAX_PARTICLES)
    this.alphas = new Float32Array(MAX_PARTICLES)
    this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3))
    this.geometry.setAttribute('color', new THREE.BufferAttribute(this.colors, 3))
    this.geometry.setAttribute('aSize', new THREE.BufferAttribute(this.sizes, 1))
    this.geometry.setAttribute('aAlpha', new THREE.BufferAttribute(this.alphas, 1))
    this.material = new THREE.ShaderMaterial({
      uniforms: { uMap: { value: makeGlowTexture(64) } },
      vertexShader: `
        attribute float aSize;
        attribute float aAlpha;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vColor = color;
          vAlpha = aAlpha;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * (330.0 / max(0.1, -mv.z));
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform sampler2D uMap;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vec4 tex = texture2D(uMap, gl_PointCoord);
          gl_FragColor = vec4(vColor, 1.0) * tex * vAlpha;
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
    this.points = new THREE.Points(this.geometry, this.material)
    this.points.frustumCulled = false
    scene.add(this.points)

    this.velocities = new Float32Array(MAX_PARTICLES * 3)
    this.baseColors = new Float32Array(MAX_PARTICLES * 3)
    this.life = new Float32Array(MAX_PARTICLES)
    this.maxLife = new Float32Array(MAX_PARTICLES)
    this.baseSize = new Float32Array(MAX_PARTICLES)
    this.gravity = new Float32Array(MAX_PARTICLES)
    this.drag = new Float32Array(MAX_PARTICLES)
    this.cursor = 0
    this.active = 0
  }

  emit(position, color, options = {}) {
    const i = this.cursor
    this.cursor = (this.cursor + 1) % MAX_PARTICLES
    const {
      velocity = new THREE.Vector3(),
      size = 0.12,
      life = 0.6,
      gravity = 0,
      drag = 1.8
    } = options
    this.positions[i * 3] = position.x
    this.positions[i * 3 + 1] = position.y
    this.positions[i * 3 + 2] = position.z
    this.velocities[i * 3] = velocity.x
    this.velocities[i * 3 + 1] = velocity.y
    this.velocities[i * 3 + 2] = velocity.z
    this.baseColors[i * 3] = color.r
    this.baseColors[i * 3 + 1] = color.g
    this.baseColors[i * 3 + 2] = color.b
    this.colors[i * 3] = color.r
    this.colors[i * 3 + 1] = color.g
    this.colors[i * 3 + 2] = color.b
    this.baseSize[i] = size
    this.sizes[i] = size
    this.alphas[i] = 1
    this.life[i] = life
    this.maxLife[i] = life
    this.gravity[i] = gravity
    this.drag[i] = drag
    this.active = Math.min(MAX_PARTICLES, this.active + 1)
    this.geometry.attributes.position.needsUpdate = true
    this.geometry.attributes.color.needsUpdate = true
    this.geometry.attributes.aSize.needsUpdate = true
    this.geometry.attributes.aAlpha.needsUpdate = true
  }

  update(dt) {
    let maxActive = 0
    for (let i = 0; i < MAX_PARTICLES; i++) {
      if (this.life[i] <= 0) {
        this.alphas[i] = 0
        continue
      }
      maxActive = i + 1
      this.life[i] -= dt
      const k = Math.max(0, this.life[i] / this.maxLife[i])
      if (this.life[i] <= 0) {
        this.alphas[i] = 0
        continue
      }
      const d = Math.exp(-this.drag[i] * dt)
      this.velocities[i * 3] *= d
      this.velocities[i * 3 + 1] *= d
      this.velocities[i * 3 + 2] *= d
      this.velocities[i * 3 + 1] -= this.gravity[i] * dt
      this.positions[i * 3] += this.velocities[i * 3] * dt
      this.positions[i * 3 + 1] += this.velocities[i * 3 + 1] * dt
      this.positions[i * 3 + 2] += this.velocities[i * 3 + 2] * dt
      if (this.positions[i * 3 + 1] < 0.03 && this.gravity[i] > 0) {
        this.positions[i * 3 + 1] = 0.03
        this.velocities[i * 3 + 1] *= -0.3
        this.velocities[i * 3] *= 0.7
        this.velocities[i * 3 + 2] *= 0.7
      }
      const fade = k * k
      this.alphas[i] = fade
      this.colors[i * 3] = this.baseColors[i * 3] * (0.4 + k * 0.6)
      this.colors[i * 3 + 1] = this.baseColors[i * 3 + 1] * (0.4 + k * 0.6)
      this.colors[i * 3 + 2] = this.baseColors[i * 3 + 2] * (0.4 + k * 0.6)
      this.sizes[i] = this.baseSize[i] * (0.7 + (1 - k) * 0.8)
    }
    this.geometry.attributes.position.needsUpdate = true
    this.geometry.attributes.color.needsUpdate = true
    this.geometry.attributes.aSize.needsUpdate = true
    this.geometry.attributes.aAlpha.needsUpdate = true
  }
}

function makeScorchTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 128
  const ctx = canvas.getContext('2d')
  const g = ctx.createRadialGradient(64, 64, 2, 64, 64, 62)
  g.addColorStop(0, 'rgba(255,230,180,0.8)')
  g.addColorStop(0.12, 'rgba(255,110,35,0.55)')
  g.addColorStop(0.34, 'rgba(70,30,15,0.25)')
  g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 128, 128)
  for (let i = 0; i < 16; i++) {
    ctx.strokeStyle = `rgba(255,${Math.floor(rand(60, 140))},30,${rand(0.1, 0.4)})`
    ctx.lineWidth = rand(0.5, 1.4)
    ctx.beginPath()
    const a = rand(0, TAU)
    const r1 = rand(4, 16)
    const r2 = rand(20, 55)
    ctx.moveTo(64 + Math.cos(a) * r1, 64 + Math.sin(a) * r1)
    ctx.lineTo(64 + Math.cos(a) * r2, 64 + Math.sin(a) * r2)
    ctx.stroke()
  }
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

export class Effects {
  constructor(scene) {
    this.scene = scene
    this.particles = new ParticlePool(scene)
    this.scorchTexture = makeScorchTexture()

    this.tracerPool = []
    this.tracerGeo = new THREE.CylinderGeometry(1, 1, 1, 5, 1, true)
    for (let i = 0; i < 18; i++) {
      const mesh = new THREE.Mesh(
        this.tracerGeo,
        new THREE.MeshBasicMaterial({
          color: 0x9dfbff,
          transparent: true,
          opacity: 0,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          toneMapped: false
        })
      )
      mesh.visible = false
      mesh.frustumCulled = false
      scene.add(mesh)
      this.tracerPool.push({ mesh, life: 0, maxLife: 0.1 })
    }
    this.tracerCursor = 0

    this.flashPool = []
    for (let i = 0; i < 22; i++) {
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
        map: makeGlowTexture(96),
        color: 0xffffff,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false
      }))
      sprite.visible = false
      sprite.frustumCulled = false
      scene.add(sprite)
      this.flashPool.push({ sprite, life: 0, maxLife: 0.25, size: 1 })
    }
    this.flashCursor = 0

    this.decalPool = []
    const decalGeo = new THREE.PlaneGeometry(1, 1)
    for (let i = 0; i < 28; i++) {
      const mesh = new THREE.Mesh(
        decalGeo,
        new THREE.MeshBasicMaterial({
          map: this.scorchTexture,
          transparent: true,
          opacity: 0,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          toneMapped: false,
          polygonOffset: true,
          polygonOffsetFactor: -1
        })
      )
      mesh.visible = false
      scene.add(mesh)
      this.decalPool.push({ mesh, life: 0, maxLife: 14 })
    }
    this.decalCursor = 0
  }

  spark(position, normal, colorHex = 0xffc06a, count = 12, speed = 4.2, size = 0.075) {
    const color = new THREE.Color(colorHex)
    for (let i = 0; i < count; i++) {
      const dir = new THREE.Vector3(rand(-1, 1), rand(-1, 1), rand(-1, 1)).normalize()
      if (normal) dir.add(normal.clone().multiplyScalar(rand(0.3, 1.15))).normalize()
      dir.multiplyScalar(rand(speed * 0.22, speed))
      this.particles.emit(position, color, {
        velocity: dir,
        size: rand(size * 0.6, size * 1.5),
        life: rand(0.2, 0.65),
        gravity: 8.5,
        drag: 2.2
      })
    }
  }

  impact(position, normal = new THREE.Vector3(0, 1, 0)) {
    this.spark(position, normal, 0xffc46a, 10, 3.6, 0.06)
    const f = this.flashPool[this.flashCursor++ % this.flashPool.length]
    f.life = f.maxLife = 0.13
    f.size = 0.7
    f.sprite.material.color.setHex(0xffa14d)
    f.sprite.position.copy(position).addScaledVector(normal, 0.1)
    f.sprite.scale.setScalar(0.7)
    f.sprite.visible = true
    // glowing bullet scar
    const d = this.decalPool[this.decalCursor++ % this.decalPool.length]
    d.life = d.maxLife
    d.mesh.position.copy(position).addScaledVector(normal, 0.012)
    d.mesh.lookAt(position.clone().add(normal))
    d.mesh.scale.setScalar(rand(0.17, 0.29))
    d.mesh.material.opacity = 0.65
    d.mesh.visible = true
  }

  enemyHit(position, crit = false) {
    this.spark(position, null, crit ? 0xffd16b : 0x56f5ff, crit ? 20 : 10, crit ? 5.5 : 3.8, crit ? 0.085 : 0.06)
    const f = this.flashPool[this.flashCursor++ % this.flashPool.length]
    f.life = f.maxLife = 0.12
    f.size = 0.9
    f.sprite.material.color.setHex(crit ? 0xff9a3c : 0x47eaff)
    f.sprite.position.copy(position)
    f.sprite.scale.setScalar(crit ? 1.4 : 0.9)
    f.sprite.visible = true
  }

  muzzle(position, direction) {
    const f = this.flashPool[this.flashCursor++ % this.flashPool.length]
    f.life = f.maxLife = 0.06
    f.size = 1
    f.sprite.material.color.setHex(0xffe0a0)
    f.sprite.position.copy(position).addScaledVector(direction, 0.1)
    f.sprite.scale.setScalar(0.75)
    f.sprite.visible = true
    for (let i = 0; i < 3; i++) {
      const dir = direction.clone().multiplyScalar(rand(3, 8))
      dir.x += rand(-0.7, 0.7); dir.y += rand(-0.7, 0.7); dir.z += rand(-0.7, 0.7)
      this.particles.emit(position, new THREE.Color(0xffc879), {
        velocity: dir, size: rand(0.05, 0.1), life: rand(0.05, 0.16), gravity: 2, drag: 4
      })
    }
  }

  tracer(start, end, colorHex = 0x8df9ff) {
    const t = this.tracerPool[this.tracerCursor++ % this.tracerPool.length]
    const dir = new THREE.Vector3().subVectors(end, start)
    const length = dir.length()
    if (length < 0.001) return
    dir.normalize()
    const mesh = t.mesh
    mesh.position.copy(start).addScaledVector(dir, length / 2)
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir)
    mesh.scale.set(0.008, length, 0.008)
    mesh.material.color.setHex(colorHex)
    mesh.material.opacity = 0.66
    mesh.visible = true
    t.life = t.maxLife = 0.095
    // Hot core
    const f = this.flashPool[this.flashCursor++ % this.flashPool.length]
    f.life = f.maxLife = 0.08
    f.sprite.material.color.setHex(colorHex)
    f.sprite.position.copy(start)
    f.sprite.scale.setScalar(0.55)
    f.sprite.visible = true
  }

  explosion(position, colorHex = 0x5cefff, big = false) {
    const color = new THREE.Color(colorHex)
    const count = big ? 70 : 38
    for (let i = 0; i < count; i++) {
      const dir = new THREE.Vector3(rand(-1, 1), rand(-0.4, 1.4), rand(-1, 1)).normalize()
      const speed = rand(big ? 2 : 1.2, big ? 11 : 7)
      this.particles.emit(position, color, {
        velocity: dir.multiplyScalar(speed),
        size: rand(0.08, big ? 0.34 : 0.23),
        life: rand(0.35, big ? 1.3 : 0.9),
        gravity: rand(1, 7),
        drag: 1.35
      })
    }
    for (let i = 0; i < (big ? 26 : 12); i++) {
      const dir = new THREE.Vector3(rand(-1, 1), rand(-0.3, 1.2), rand(-1, 1)).normalize()
      this.particles.emit(position, new THREE.Color(0xffb05e), {
        velocity: dir.multiplyScalar(rand(4, big ? 16 : 9)),
        size: rand(0.04, 0.17),
        life: rand(0.25, 0.7),
        gravity: 9,
        drag: 0.8
      })
    }
    const f = this.flashPool[this.flashCursor++ % this.flashPool.length]
    f.life = f.maxLife = big ? 0.42 : 0.28
    f.sprite.material.color.setHex(colorHex)
    f.sprite.position.copy(position)
    f.sprite.scale.setScalar(big ? 7 : 3.8)
    f.sprite.visible = true
    this.spark(position, null, 0xffbc69, big ? 30 : 16, big ? 13 : 8, 0.1)
  }

  portalBurst(position, colorHex = 0xff46d4) {
    const color = new THREE.Color(colorHex)
    for (let i = 0; i < 26; i++) {
      const angle = rand(0, TAU)
      const radius = rand(0.5, 1.7)
      const pos = new THREE.Vector3(position.x + Math.cos(angle) * radius, rand(0.3, 3), position.z + Math.sin(angle) * radius)
      this.particles.emit(pos, color, {
        velocity: new THREE.Vector3(-Math.cos(angle) * rand(1, 3), rand(-0.4, 2), -Math.sin(angle) * rand(1, 3)),
        size: rand(0.06, 0.18),
        life: rand(0.4, 1.0),
        gravity: -0.2,
        drag: 1.1
      })
    }
  }

  heal(position) {
    for (let i = 0; i < 28; i++) {
      const a = rand(0, TAU)
      this.particles.emit(position, new THREE.Color(0x5affd4), {
        velocity: new THREE.Vector3(Math.cos(a) * rand(0.5, 2.2), rand(1, 4.5), Math.sin(a) * rand(0.5, 2.2)),
        size: rand(0.05, 0.14), life: rand(0.4, 0.9), gravity: -1.4, drag: 1.8
      })
    }
  }

  update(dt) {
    this.particles.update(dt)
    for (const t of this.tracerPool) {
      if (t.life > 0) {
        t.life -= dt
        t.mesh.material.opacity = Math.max(0, (t.life / t.maxLife) * 0.66)
        if (t.life <= 0) t.mesh.visible = false
      }
    }
    for (const f of this.flashPool) {
      if (f.life > 0) {
        f.life -= dt
        const k = Math.max(0, f.life / f.maxLife)
        f.sprite.material.opacity = k
        f.sprite.scale.setScalar(f.size * (0.6 + (1 - k) * 1.3))
        if (f.life <= 0) f.sprite.visible = false
      }
    }
    for (const d of this.decalPool) {
      if (d.life > 0) {
        d.life -= dt
        d.mesh.material.opacity = Math.min(0.65, Math.max(0, d.life / d.maxLife) * 1.5)
        if (d.life <= 0) d.mesh.visible = false
      }
    }
  }
}
