import * as THREE from 'three'
import {
  makeStoneTextures, makeMetalTextures, makeClothTextures, makeBannerTexture,
  makeFlameTexture, makeGlowTexture, makeMountainTexture, makeStarTexture,
  makeSparkTexture, makeSmokeTexture, cloneTexture,
} from './textures.js'

const TAU = Math.PI * 2

function rngFactory(seed = 1) {
  let a = seed
  return () => {
    a = (a * 1664525 + 1013904223) >>> 0
    return a / 4294967296
  }
}

function bannerGeometry(width = 1, height = 2.6, segX = 10, segY = 22) {
  const geo = new THREE.PlaneGeometry(width, height, segX, segY)
  geo.userData.base = geo.attributes.position.array.slice()
  return geo
}

export class Arena {
  constructor(scene, quality = {}) {
    this.scene = scene
    this.quality = quality
    this.group = new THREE.Group()
    this.group.name = 'Ashen Citadel'
    this.animated = []
    this.banners = []
    this.fires = []
    this.rain = null
    this.embers = null
    this.dust = null
    this.runeMaterials = []
    this.time = 0
    scene.add(this.group)
    this.buildMaterials()
    this.buildSky()
    this.buildFloor()
    this.buildArchitecture()
    this.buildStatue()
    this.buildBanners()
    this.buildFires()
    this.buildLightShafts()
    this.buildWeather()
    this.buildLights()
  }

  buildMaterials() {
    const stone = makeStoneTextures(4, 512)
    const darkStone = makeStoneTextures(19, 512)
    const metal = makeMetalTextures('#7c6c52', 12, 256)
    const bronze = makeMetalTextures('#8a5c2f', 22, 256)
    const cloth = makeClothTextures('#210b10', 30, 256)

    this.materials = {
      stone: new THREE.MeshStandardMaterial({
        map: cloneTexture(stone.map, 5, 4),
        normalMap: cloneTexture(stone.normalMap, 5, 4),
        roughnessMap: cloneTexture(stone.roughnessMap, 5, 4),
        normalScale: new THREE.Vector2(1.1, 1.1),
        roughness: 0.92, metalness: 0.04,
      }),
      floor: new THREE.MeshPhysicalMaterial({
        map: cloneTexture(stone.map, 8, 6),
        normalMap: cloneTexture(stone.normalMap, 8, 6),
        roughnessMap: cloneTexture(stone.roughnessMap, 8, 6),
        normalScale: new THREE.Vector2(0.9, 0.9),
        roughness: 0.52, metalness: 0.08,
        clearcoat: 0.72, clearcoatRoughness: 0.26,
        envMapIntensity: 0.75,
      }),
      wall: new THREE.MeshStandardMaterial({
        map: cloneTexture(darkStone.map, 7, 3),
        normalMap: cloneTexture(darkStone.normalMap, 7, 3),
        roughnessMap: cloneTexture(darkStone.roughnessMap, 7, 3),
        normalScale: new THREE.Vector2(1.4, 1.4),
        roughness: 0.96, metalness: 0.02,
      }),
      pillar: new THREE.MeshStandardMaterial({
        map: cloneTexture(stone.map, 2, 4),
        normalMap: cloneTexture(stone.normalMap, 2, 4),
        roughnessMap: cloneTexture(stone.roughnessMap, 2, 4),
        normalScale: new THREE.Vector2(1.3, 1.3),
        roughness: 0.9, metalness: 0.03,
      }),
      metal: new THREE.MeshStandardMaterial({
        map: metal.map, normalMap: metal.normalMap, roughnessMap: metal.roughnessMap,
        color: 0xc3b08b, roughness: 0.44, metalness: 0.9, envMapIntensity: 1.4,
      }),
      bronze: new THREE.MeshStandardMaterial({
        map: bronze.map, normalMap: bronze.normalMap, roughnessMap: bronze.roughnessMap,
        color: 0xd4a76d, roughness: 0.4, metalness: 0.86, envMapIntensity: 1.5,
      }),
      gold: new THREE.MeshStandardMaterial({
        color: 0xc79b54, roughness: 0.28, metalness: 1.0, envMapIntensity: 1.8,
      }),
      emberGold: new THREE.MeshStandardMaterial({
        color: 0xffbd6a, emissive: 0xff5a1a, emissiveIntensity: 3.2, roughness: 0.3, metalness: 0.5,
      }),
      rune: new THREE.MeshStandardMaterial({
        color: 0xff9b63, emissive: 0xff3d14, emissiveIntensity: 4.5, roughness: 0.4, metalness: 0.2,
      }),
      banner: new THREE.MeshStandardMaterial({
        map: makeBannerTexture('A', '#6e101c', '#d6b06a', 256),
        normalMap: cloth.normalMap,
        roughness: 0.9, metalness: 0.04, side: THREE.DoubleSide,
      }),
      cloth: new THREE.MeshStandardMaterial({
        map: cloth.map, normalMap: cloth.normalMap, roughness: 0.94,
        color: 0x8a5550, side: THREE.DoubleSide,
      }),
      statue: new THREE.MeshStandardMaterial({
        map: cloneTexture(darkStone.map, 1.6, 2.4),
        normalMap: cloneTexture(darkStone.normalMap, 1.6, 2.4),
        roughnessMap: cloneTexture(darkStone.roughnessMap, 1.6, 2.4),
        color: 0x879ba1, roughness: 0.88, metalness: 0.12,
      }),
      statueEye: new THREE.MeshStandardMaterial({
        color: 0xffb09a, emissive: 0xff2b0d, emissiveIntensity: 6, roughness: 0.2,
      }),
    }
    this.runeMaterials.push(this.materials.rune, this.materials.emberGold, this.materials.statueEye)
  }

  buildSky() {
    const skyGeo = new THREE.SphereGeometry(60, 32, 24)
    const skyMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        topColor: { value: new THREE.Color(0x010306) },
        midColor: { value: new THREE.Color(0x0b1a20) },
        bottomColor: { value: new THREE.Color(0x20150f) },
        moonDir: { value: new THREE.Vector3(0.3, 0.48, -0.82).normalize() },
      },
      vertexShader: `
        varying vec3 vWorld;
        void main() {
          vWorld = normalize(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vWorld;
        uniform vec3 topColor, midColor, bottomColor, moonDir;
        float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float noise(vec2 p) {
          vec2 i = floor(p), f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(mix(hash(i), hash(i + vec2(1,0)), f.x), mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x), f.y);
        }
        float fbm(vec2 p) {
          float v = 0.0, a = 0.5;
          for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
          return v;
        }
        void main() {
          float h = clamp(vWorld.y * 0.5 + 0.5, 0.0, 1.0);
          vec3 col = mix(bottomColor, midColor, smoothstep(0.0, 0.52, h));
          col = mix(col, topColor, smoothstep(0.5, 1.0, h));
          float clouds = fbm(vec2(atan(vWorld.z, vWorld.x) * 1.7, vWorld.y * 4.0) + 2.0);
          clouds = smoothstep(0.52, 0.83, clouds);
          col += vec3(0.09, 0.12, 0.14) * clouds * smoothstep(0.15, 0.85, h);
          float halo = pow(max(dot(vWorld, moonDir), 0.0), 22.0);
          col += vec3(0.28, 0.38, 0.44) * halo * 0.7;
          float glow = pow(max(dot(vWorld, moonDir), 0.0), 4.0);
          col += vec3(0.035, 0.06, 0.08) * glow;
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    })
    const sky = new THREE.Mesh(skyGeo, skyMat)
    sky.frustumCulled = false
    this.group.add(sky)

    const starsGeo = new THREE.BufferGeometry()
    const starsCount = this.quality.mobile ? 260 : 520
    const pos = new Float32Array(starsCount * 3)
    const rng = rngFactory(42)
    for (let i = 0; i < starsCount; i++) {
      const phi = rng() * TAU
      const y = 0.15 + rng() * 0.82
      const r = Math.sqrt(1 - y * y)
      pos[i * 3] = Math.cos(phi) * r * 52
      pos[i * 3 + 1] = y * 52
      pos[i * 3 + 2] = Math.sin(phi) * r * 52
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const stars = new THREE.Points(starsGeo, new THREE.PointsMaterial({
      size: 0.09, map: makeStarTexture(), transparent: true, opacity: 0.75,
      depthWrite: false, blending: THREE.AdditiveBlending, color: 0xbfd7ef,
    }))
    this.group.add(stars)

    const moonTex = makeGlowTexture(128, 'rgba(245,250,255,1)', 'rgba(160,196,222,.55)')
    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(2.15, 32, 24),
      new THREE.MeshBasicMaterial({ color: 0xd7e1e8, fog: false }),
    )
    moon.position.set(15, 15.5, -34)
    this.group.add(moon)
    const moonGlow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: moonTex, color: 0xb9d4ea, transparent: true, opacity: 0.5,
      depthWrite: false, blending: THREE.AdditiveBlending, fog: false,
    }))
    moonGlow.scale.set(13, 13, 1)
    moonGlow.position.copy(moon.position)
    this.group.add(moonGlow)

    const mountain = new THREE.Mesh(
      new THREE.PlaneGeometry(44, 16),
      new THREE.MeshBasicMaterial({
        map: makeMountainTexture(1024, 512, 7), transparent: true,
        depthWrite: false, opacity: 0.8, color: 0x5b7a84, fog: true,
      }),
    )
    mountain.position.set(0, 5.5, -26)
    this.group.add(mountain)
    const mountain2 = mountain.clone()
    mountain2.material = mountain.material.clone()
    mountain2.material.color.set(0x78929a)
    mountain2.material.opacity = 0.38
    mountain2.position.set(5, 2.8, -19)
    mountain2.scale.set(0.8, 0.55, 1)
    this.group.add(mountain2)
  }

  buildFloor() {
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(24, 18), this.materials.floor)
    floor.rotation.x = -Math.PI / 2
    floor.position.set(0, 0, -1.5)
    floor.receiveShadow = true
    this.group.add(floor)

    // central dais
    const dais = new THREE.Mesh(new THREE.CylinderGeometry(3.65, 3.85, 0.18, 72), this.materials.stone)
    dais.position.set(0, 0.06, 0.1)
    dais.receiveShadow = true
    this.group.add(dais)
    const daisRim = new THREE.Mesh(new THREE.TorusGeometry(3.68, 0.05, 8, 96), this.materials.bronze)
    daisRim.rotation.x = Math.PI / 2
    daisRim.position.set(0, 0.16, 0.1)
    this.group.add(daisRim)

    const ring = new THREE.Mesh(new THREE.RingGeometry(2.25, 2.31, 96), this.materials.gold)
    ring.rotation.x = -Math.PI / 2
    ring.position.set(0, 0.163, 0.1)
    this.group.add(ring)
    const ring2 = new THREE.Mesh(new THREE.RingGeometry(1.55, 1.58, 96), this.materials.emberGold)
    ring2.rotation.x = -Math.PI / 2
    ring2.position.set(0, 0.164, 0.1)
    this.group.add(ring2)
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * TAU
      const glyph = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.008, 0.055), this.materials.emberGold)
      glyph.position.set(Math.cos(a) * 2.65, 0.166, 0.1 + Math.sin(a) * 2.65)
      glyph.rotation.y = -a
      this.group.add(glyph)
    }

    // floor seams / slabs
    const rng = rngFactory(77)
    for (let i = 0; i < 20; i++) {
      const x = (rng() - 0.5) * 18
      const z = -1.5 + (rng() - 0.5) * 13
      if (Math.hypot(x, z - 0.1) < 4.1) continue
      const w = 1.2 + rng() * 2.4, d = 0.8 + rng() * 2
      const slab = new THREE.Mesh(new THREE.BoxGeometry(w, 0.025, d), this.materials.stone)
      slab.position.set(x, 0.012, z)
      slab.rotation.y = (rng() - 0.5) * 0.12
      slab.receiveShadow = true
      this.group.add(slab)
    }

    // front ledge and side stairs
    for (let s = 0; s < 4; s++) {
      const step = new THREE.Mesh(new THREE.BoxGeometry(24 - s * 0.4, 0.18, 0.7), this.materials.stone)
      step.position.set(0, -0.1 - s * 0.17, 7.3 + s * 0.65)
      step.receiveShadow = true
      this.group.add(step)
    }
    for (const side of [-1, 1]) {
      for (let s = 0; s < 3; s++) {
        const step = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.16, 5.2), this.materials.stone)
        step.position.set(side * (7.1 + s * 0.62), 0.08 - s * 0.12, 1.2)
        this.group.add(step)
      }
    }

    // wet puddles
    for (let i = 0; i < 7; i++) {
      const p = new THREE.Mesh(
        new THREE.CircleGeometry(0.35 + rng() * 1.2, 24),
        new THREE.MeshPhysicalMaterial({
          color: 0x091115, roughness: 0.08, metalness: 0.8,
          transparent: true, opacity: 0.42, clearcoat: 1, envMapIntensity: 1.3,
        }),
      )
      p.rotation.x = -Math.PI / 2
      p.position.set((rng() - 0.5) * 12, 0.022, -1.5 + (rng() - 0.5) * 8)
      p.scale.set(1, 0.55 + rng() * 0.8, 1)
      this.group.add(p)
    }
  }

  buildArchitecture() {
    // rear wall
    const wall = new THREE.Mesh(new THREE.BoxGeometry(26, 7.5, 0.85), this.materials.wall)
    wall.position.set(0, 3.7, -7.4)
    wall.receiveShadow = true
    this.group.add(wall)
    const wallCap = new THREE.Mesh(new THREE.BoxGeometry(27, 0.34, 1.2), this.materials.stone)
    wallCap.position.set(0, 7.55, -7.3)
    this.group.add(wallCap)

    // wall buttresses
    for (const x of [-9.2, -6.8, 6.8, 9.2]) {
      const b = new THREE.Mesh(new THREE.BoxGeometry(0.7, 7.2, 1.4), this.materials.wall)
      b.position.set(x, 3.55, -6.9)
      this.group.add(b)
      const cap = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.24, 1.7), this.materials.stone)
      cap.position.set(x, 7.1, -6.9)
      this.group.add(cap)
    }

    // colonnade
    for (const x of [-7.8, -4.9, 4.9, 7.8]) {
      const pillar = new THREE.Group()
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.46, 4.5, 18), this.materials.pillar)
      shaft.position.y = 2.25
      shaft.castShadow = true
      shaft.receiveShadow = true
      pillar.add(shaft)
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.78, 0.36, 18), this.materials.stone)
      base.position.y = 0.18
      pillar.add(base)
      const capital = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.48, 0.38, 18), this.materials.stone)
      capital.position.y = 4.68
      pillar.add(capital)
      const band = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.045, 8, 32), this.materials.bronze)
      band.rotation.x = Math.PI / 2
      band.position.y = 3.4
      pillar.add(band)
      const rune = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.3, 0.02), this.materials.rune)
      rune.position.set(0, 2.75, 0.46)
      pillar.add(rune)
      pillar.position.set(x, 0, -4.7)
      this.group.add(pillar)
    }

    // lintel beams
    for (const x of [-6.35, 0, 6.35]) {
      const beam = new THREE.Mesh(new THREE.BoxGeometry(2.75, 0.42, 0.8), this.materials.stone)
      beam.position.set(x, 4.95, -4.7)
      beam.castShadow = true
      this.group.add(beam)
    }

    // side arches / broken walls
    for (const side of [-1, 1]) {
      const arch = new THREE.Group()
      const left = new THREE.Mesh(new THREE.BoxGeometry(0.7, 5.2, 0.9), this.materials.wall)
      left.position.set(-1.6, 2.6, 0)
      arch.add(left)
      const right = left.clone(); right.position.x = 1.6
      arch.add(right)
      const top = new THREE.Mesh(new THREE.BoxGeometry(3.9, 0.6, 0.95), this.materials.stone)
      top.position.y = 5.05
      arch.add(top)
      arch.position.set(side * 10.8, 0, -3.5)
      arch.rotation.y = side * 0.2
      this.group.add(arch)
    }

    // side steps / plinths with braziers
    for (const side of [-1, 1]) {
      const plinth = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.9, 1.15, 8), this.materials.stone)
      plinth.position.set(side * 4.05, 0.575, -2.4)
      plinth.castShadow = true
      this.group.add(plinth)
    }
  }

  buildStatue() {
    const g = new THREE.Group()
    const mat = this.materials.statue
    const base = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.7, 0.7, 8), this.materials.stone)
    base.position.y = 0.35
    g.add(base)
    const base2 = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.55, 1.5), this.materials.wall)
    base2.position.y = 0.95
    g.add(base2)
    const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.62, 1.8, 8), mat)
    torso.position.y = 2.15
    g.add(torso)
    const chest = new THREE.Mesh(new THREE.SphereGeometry(0.72, 18, 12), mat)
    chest.scale.set(1, 0.75, 0.7)
    chest.position.set(0, 2.55, 0.12)
    g.add(chest)
    const head = new THREE.Mesh(new THREE.DodecahedronGeometry(0.46, 1), mat)
    head.scale.set(0.9, 1.05, 0.8)
    head.position.y = 3.3
    g.add(head)
    // horns
    for (const side of [-1, 1]) {
      const horn = new THREE.Mesh(new THREE.ConeGeometry(0.16, 1.1, 8), mat)
      horn.position.set(side * 0.38, 3.75, 0)
      horn.rotation.z = side * -0.45
      g.add(horn)
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.055, 10, 8), this.materials.statueEye)
      eye.position.set(side * 0.18, 3.36, 0.37)
      g.add(eye)
      const shoulder = new THREE.Mesh(new THREE.DodecahedronGeometry(0.34, 0), mat)
      shoulder.position.set(side * 0.95, 2.85, 0)
      g.add(shoulder)
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.14, 1.6, 8), mat)
      arm.position.set(side * 1.04, 2.05, 0.05)
      arm.rotation.z = side * 0.08
      g.add(arm)
      const fist = new THREE.Mesh(new THREE.DodecahedronGeometry(0.24, 0), mat)
      fist.position.set(side * 1.1, 1.3, 0.1)
      g.add(fist)
    }
    // chest rune
    const rune = new THREE.Mesh(new THREE.RingGeometry(0.2, 0.24, 6), this.materials.rune)
    rune.position.set(0, 2.62, 0.68)
    g.add(rune)
    const rune2 = new THREE.Mesh(new THREE.RingGeometry(0.34, 0.36, 24), this.materials.emberGold)
    rune2.position.set(0, 2.62, 0.67)
    g.add(rune2)
    // wing silhouettes
    for (const side of [-1, 1]) {
      const wingShape = new THREE.Shape()
      wingShape.moveTo(0, 0)
      wingShape.lineTo(side * 1.8, 0.8)
      wingShape.lineTo(side * 2.1, 0.35)
      wingShape.lineTo(side * 1.65, 0.1)
      wingShape.lineTo(side * 2.25, -0.25)
      wingShape.lineTo(side * 1.2, -0.5)
      wingShape.lineTo(side * 1.4, -0.95)
      wingShape.lineTo(side * 0.5, -0.55)
      wingShape.lineTo(0, 0)
      const wing = new THREE.Mesh(new THREE.ShapeGeometry(wingShape), new THREE.MeshStandardMaterial({
        color: 0x17252a, roughness: 0.9, metalness: 0.2, side: THREE.DoubleSide,
      }))
      wing.position.set(side * 0.45, 2.9, -0.4)
      wing.rotation.y = side * 0.25
      g.add(wing)
    }
    g.position.set(0, 0, -5.9)
    g.scale.setScalar(1.18)
    this.group.add(g)
    this.statue = g
  }

  buildBanners() {
    for (const x of [-6.35, 6.35]) {
      const geo = bannerGeometry(1.02, 2.7, 8, 20)
      const mesh = new THREE.Mesh(geo, this.materials.banner)
      mesh.position.set(x, 3.1, -4.25)
      mesh.rotation.y = x < 0 ? 0.08 : -0.08
      mesh.castShadow = true
      this.group.add(mesh)
      this.banners.push({ mesh, phase: x < 0 ? 0.4 : 2.1 })
      const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 1.35, 8), this.materials.bronze)
      rod.rotation.z = Math.PI / 2
      rod.position.set(x, 4.46, -4.24)
      this.group.add(rod)
      for (const side of [-1, 1]) {
        const finial = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), this.materials.gold)
        finial.position.set(x + side * 0.7, 4.46, -4.24)
        this.group.add(finial)
      }
    }
  }

  buildFires() {
    const flameTex = makeFlameTexture(128)
    const glowTex = makeGlowTexture(128, 'rgba(255,220,160,.95)', 'rgba(255,90,20,.4)')
    for (const side of [-1, 1]) {
      const x = side * 4.05
      const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.28, 0.32, 16, 1, true), this.materials.bronze)
      bowl.position.set(x, 1.28, -2.4)
      this.group.add(bowl)
      const rim = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.045, 8, 24), this.materials.gold)
      rim.rotation.x = Math.PI / 2
      rim.position.set(x, 1.44, -2.4)
      this.group.add(rim)
      const light = new THREE.PointLight(0xff5a1f, 34, 8, 2)
      light.position.set(x, 1.9, -2.0)
      this.group.add(light)
      const flame = new THREE.Sprite(new THREE.SpriteMaterial({
        map: flameTex, color: 0xffa14f, transparent: true, opacity: 0.95,
        depthWrite: false, blending: THREE.AdditiveBlending,
      }))
      flame.scale.set(1.3, 2.0, 1)
      flame.position.set(x, 2.05, -2.4)
      this.group.add(flame)
      const core = new THREE.Sprite(new THREE.SpriteMaterial({
        map: glowTex, color: 0xffdf9a, transparent: true, opacity: 0.7,
        depthWrite: false, blending: THREE.AdditiveBlending,
      }))
      core.scale.set(0.9, 1.1, 1)
      core.position.set(x, 1.72, -2.35)
      this.group.add(core)
      this.fires.push({ flame, core, light, phase: side > 0 ? 1.7 : 0.2, baseY: 2.05 })
    }
  }

  buildLightShafts() {
    const mat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      uniforms: { uColor: { value: new THREE.Color(0x91c9df) }, uOpacity: { value: 0.07 } },
      vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: `
        varying vec2 vUv; uniform vec3 uColor; uniform float uOpacity;
        void main() {
          float edge = smoothstep(0.0, 0.25, vUv.x) * smoothstep(1.0, 0.75, vUv.x);
          float fade = smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.55, vUv.y);
          gl_FragColor = vec4(uColor, edge * fade * uOpacity);
        }
      `,
    })
    for (const [x, z, s] of [[-4.2, -1.2, 1], [4.2, -1.2, 1], [0, -3.4, 1.6]]) {
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 2.4 * s, 8.5, 32, 1, true), mat.clone())
      shaft.position.set(x, 4.6, z)
      shaft.rotation.z = x * 0.015
      shaft.renderOrder = 2
      this.group.add(shaft)
    }
  }

  buildWeather() {
    const rng = rngFactory(99)
    const drops = this.quality.mobile ? 520 : 1050
    const positions = new Float32Array(drops * 6)
    const velocities = new Float32Array(drops)
    for (let i = 0; i < drops; i++) {
      const x = (rng() - 0.5) * 26
      const y = rng() * 15
      const z = -8 + rng() * 14
      const len = 0.18 + rng() * 0.5
      positions[i * 6] = x
      positions[i * 6 + 1] = y
      positions[i * 6 + 2] = z
      positions[i * 6 + 3] = x - 0.035
      positions[i * 6 + 4] = y - len
      positions[i * 6 + 5] = z
      velocities[i] = 6 + rng() * 7
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const mat = new THREE.LineBasicMaterial({
      color: 0x9ab4c3, transparent: true, opacity: 0.22,
      depthWrite: false, blending: THREE.AdditiveBlending,
    })
    const rain = new THREE.LineSegments(geo, mat)
    rain.frustumCulled = false
    this.group.add(rain)
    this.rain = { mesh: rain, positions, velocities, drops }

    const emberCount = this.quality.mobile ? 90 : 170
    const ep = new Float32Array(emberCount * 3)
    const es = new Float32Array(emberCount)
    const ev = new Float32Array(emberCount * 3)
    for (let i = 0; i < emberCount; i++) {
      ep[i * 3] = (rng() - 0.5) * 14
      ep[i * 3 + 1] = rng() * 5
      ep[i * 3 + 2] = -5 + rng() * 10
      es[i] = 0.03 + rng() * 0.06
      ev[i * 3] = (rng() - 0.5) * 0.15
      ev[i * 3 + 1] = 0.2 + rng() * 0.45
      ev[i * 3 + 2] = (rng() - 0.5) * 0.12
    }
    const eg = new THREE.BufferGeometry()
    eg.setAttribute('position', new THREE.BufferAttribute(ep, 3))
    const embers = new THREE.Points(eg, new THREE.PointsMaterial({
      size: 0.065, map: makeSparkTexture(), transparent: true, opacity: 0.75,
      depthWrite: false, blending: THREE.AdditiveBlending, color: 0xff8a3a,
      sizeAttenuation: true,
    }))
    embers.frustumCulled = false
    this.group.add(embers)
    this.embers = { mesh: embers, positions: ep, speeds: es, velocities: ev, count: emberCount, rng }

    const dustCount = this.quality.mobile ? 90 : 160
    const dp = new Float32Array(dustCount * 3)
    for (let i = 0; i < dustCount; i++) {
      dp[i * 3] = (rng() - 0.5) * 15
      dp[i * 3 + 1] = 0.3 + rng() * 4
      dp[i * 3 + 2] = -4 + rng() * 8
    }
    const dg = new THREE.BufferGeometry()
    dg.setAttribute('position', new THREE.BufferAttribute(dp, 3))
    const dust = new THREE.Points(dg, new THREE.PointsMaterial({
      size: 0.03, map: makeSmokeTexture(), transparent: true, opacity: 0.13,
      depthWrite: false, color: 0xc7d5d7,
    }))
    dust.frustumCulled = false
    this.group.add(dust)
    this.dust = { mesh: dust, positions: dp, count: dustCount, rng }
  }

  buildLights() {
    const hemi = new THREE.HemisphereLight(0x658ba0, 0x100a07, 0.45)
    this.scene.add(hemi)

    const moon = new THREE.DirectionalLight(0xa9c7e8, 2.1)
    moon.position.set(-7, 11, 6)
    moon.castShadow = true
    moon.shadow.mapSize.set(this.quality.mobile ? 1024 : 2048, this.quality.mobile ? 1024 : 2048)
    moon.shadow.camera.left = -9
    moon.shadow.camera.right = 9
    moon.shadow.camera.top = 9
    moon.shadow.camera.bottom = -3
    moon.shadow.camera.near = 1
    moon.shadow.camera.far = 30
    moon.shadow.bias = -0.0008
    moon.shadow.normalBias = 0.02
    this.scene.add(moon)
    this.moon = moon

    const key = new THREE.SpotLight(0xffc48a, 280, 18, 0.52, 0.75, 1.6)
    key.position.set(0, 8, 5.5)
    key.target.position.set(0, 1.1, 0)
    key.castShadow = false
    this.scene.add(key, key.target)
    this.keyLight = key

    const rim = new THREE.SpotLight(0x48b5d8, 160, 16, 0.6, 0.9, 1.8)
    rim.position.set(-7, 4.5, -4.5)
    rim.target.position.set(-1, 1.2, 0)
    this.scene.add(rim, rim.target)
    this.rimLight = rim

    const fill = new THREE.SpotLight(0xd65b45, 110, 14, 0.62, 0.9, 1.8)
    fill.position.set(7, 3.8, -4)
    fill.target.position.set(1, 1.1, 0)
    this.scene.add(fill, fill.target)
    this.fillLight = fill
  }

  update(dt, time) {
    this.time += dt
    const t = this.time

    // rain
    if (this.rain) {
      const p = this.rain.positions
      const v = this.rain.velocities
      for (let i = 0; i < this.rain.drops; i++) {
        const idx = i * 6
        const fall = v[i] * dt
        p[idx + 1] -= fall
        p[idx + 4] -= fall
        p[idx] -= dt * 0.7
        p[idx + 3] -= dt * 0.7
        if (p[idx + 1] < 0.05) {
          const x = (Math.random() - 0.5) * 26
          const z = -8 + Math.random() * 14
          const len = 0.18 + Math.random() * 0.5
          p[idx] = x; p[idx + 1] = 13 + Math.random() * 3; p[idx + 2] = z
          p[idx + 3] = x - 0.035; p[idx + 4] = p[idx + 1] - len; p[idx + 5] = z
        }
      }
      this.rain.mesh.geometry.attributes.position.needsUpdate = true
    }

    // embers
    if (this.embers) {
      const p = this.embers.positions
      const v = this.embers.velocities
      for (let i = 0; i < this.embers.count; i++) {
        p[i * 3] += v[i * 3] * dt + Math.sin(t * 0.7 + i) * dt * 0.04
        p[i * 3 + 1] += v[i * 3 + 1] * dt
        p[i * 3 + 2] += v[i * 3 + 2] * dt
        if (p[i * 3 + 1] > 6.5) {
          p[i * 3] = (Math.random() - 0.5) * 14
          p[i * 3 + 1] = -0.2
          p[i * 3 + 2] = -5 + Math.random() * 10
        }
      }
      this.embers.mesh.geometry.attributes.position.needsUpdate = true
    }

    // dust
    if (this.dust) {
      const p = this.dust.positions
      for (let i = 0; i < this.dust.count; i++) {
        p[i * 3] += Math.sin(t * 0.15 + i) * dt * 0.02
        p[i * 3 + 1] += Math.sin(t * 0.22 + i * 1.7) * dt * 0.015
      }
      this.dust.mesh.geometry.attributes.position.needsUpdate = true
    }

    // fire flicker
    for (const f of this.fires) {
      const flicker = 0.86 + Math.sin(t * 9 + f.phase) * 0.08 + Math.sin(t * 21 + f.phase * 2) * 0.06
      f.flame.scale.set(1.3 * flicker, 2.0 * flicker, 1)
      f.flame.material.opacity = 0.82 + Math.sin(t * 13 + f.phase) * 0.12
      f.flame.position.y = f.baseY + Math.sin(t * 7 + f.phase) * 0.04
      f.core.scale.set(0.9 * flicker, 1.1 * flicker, 1)
      f.light.intensity = 34 * flicker
      f.light.position.y = 1.9 + Math.sin(t * 8 + f.phase) * 0.05
    }

    // banners
    for (const b of this.banners) {
      const pos = b.mesh.geometry.attributes.position
      const base = b.mesh.geometry.userData.base
      for (let i = 0; i < pos.count; i++) {
        const x = base[i * 3], y = base[i * 3 + 1]
        const drop = 1 - (y + 1.35) / 2.7
        const wave = Math.sin(t * 1.6 + x * 2.1 + y * 1.2 + b.phase) * 0.08
        const wave2 = Math.sin(t * 2.7 + x * 3.5 + b.phase) * 0.025
        pos.setZ(i, (wave + wave2) * drop * drop)
        pos.setX(i, x + Math.sin(t * 1.1 + y + b.phase) * 0.012 * drop)
      }
      pos.needsUpdate = true
      b.mesh.geometry.computeVertexNormals()
    }

    // rune pulse
    const pulse = 2.6 + Math.sin(t * 2.2) * 1.0
    for (const mat of this.runeMaterials) mat.emissiveIntensity = pulse + (mat === this.materials.statueEye ? 2.2 : 0)
    this.materials.emberGold.emissiveIntensity = 2.4 + Math.sin(t * 1.7) * 0.8

    // light breathing
    this.keyLight.intensity = 280 + Math.sin(t * 0.8) * 16
    this.rimLight.intensity = 160 + Math.sin(t * 0.55 + 2) * 12
    this.fillLight.intensity = 110 + Math.sin(t * 0.7 + 1) * 10
    this.moon.intensity = 2.1 + Math.sin(t * 0.2) * 0.08
  }
}
