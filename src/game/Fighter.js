import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import {
  makeSkinTextures, makeLeatherTextures, makeClothTextures, makeMetalTextures,
  makeGlowTexture, cloneTexture,
} from './textures.js'
import { CHARACTER_SPECS, loadCharacterRig } from './CharacterRig.js'

const TAU = Math.PI * 2
const BASE_HIPS_Y = 0.88

export const FIGHTERS = {
  nyx: {
    id: 'nyx',
    name: 'NYX',
    title: 'SHADOW ASSASSIN',
    tag: 'CHALLENGER',
    health: 980,
    speed: 1.28,
    power: 0.95,
    reach: 1.0,
    specialName: 'CRIMSON LANCE',
    specialColor: 0xff3b2e,
    palette: {
      skin: '#9d6854',
      cloth: '#171015',
      leather: '#2d171d',
      armor: '#3b2329',
      metal: '#b98d4f',
      accent: '#8c1725',
      glow: '#ff3b30',
      eye: '#ff8c76',
    },
    stats: { speed: 92, power: 62, reach: 74 },
  },
  kaelus: {
    id: 'kaelus',
    name: 'KAELUS',
    title: 'ASHEN WARDEN',
    tag: 'WARDEN',
    health: 1120,
    speed: 1.0,
    power: 1.18,
    reach: 1.08,
    specialName: 'TECTONIC WAVE',
    specialColor: 0x55f0dc,
    palette: {
      skin: '#8e6751',
      cloth: '#15191b',
      leather: '#2f2b24',
      armor: '#4e5456',
      metal: '#c8a56a',
      accent: '#1f5f5d',
      glow: '#5df5e0',
      eye: '#8affec',
    },
    stats: { speed: 54, power: 96, reach: 86 },
  },
}

const POSE_KEYS = [
  'rootY', 'modelRotZ', 'modelRY',
  'hipsX', 'hipsY', 'hipsZ', 'hipsRY',
  'torsoX', 'torsoY', 'torsoZ', 'torsoRY',
  'headX', 'headY', 'headZ', 'headRY',
  'sNx', 'sNy', 'sNz', 'eNx', 'eNy', 'eNz', 'wNx', 'wNy', 'wNz',
  'sFx', 'sFy', 'sFz', 'eFx', 'eFy', 'eFz', 'wFx', 'wFy', 'wFz',
  'hNx', 'hNy', 'hNz', 'kNx', 'kNy', 'kNz', 'aNx', 'aNy', 'aNz',
  'hFx', 'hFy', 'hFz', 'kFx', 'kFy', 'kFz', 'aFx', 'aFy', 'aFz',
]

const GUARD = {
  rootY: 0, modelRotZ: 0, modelRY: -0.05,
  hipsX: 0, hipsY: -0.075, hipsZ: 0, hipsRY: 0,
  torsoX: 0, torsoY: 0, torsoZ: 0.055, torsoRY: -0.08,
  headX: 0, headY: -0.2, headZ: -0.03, headRY: 0,
  sNx: 0, sNy: -0.1, sNz: 0.8, eNx: 0, eNy: 0.08, eNz: 1.22, wNx: 0, wNy: 0, wNz: 0.08,
  sFx: 0, sFy: 0.12, sFz: 0.62, eFx: 0, eFy: -0.08, eFz: 1.4, wFx: 0, wFy: 0, wFz: 0.04,
  hNx: 0, hNy: 0.06, hNz: 0.2, kNx: 0, kNy: 0, kNz: -0.32, aNx: 0, aNy: 0, aNz: 0.12,
  hFx: 0, hFy: -0.06, hFz: -0.18, kFx: 0, kFy: 0, kFz: 0.32, aFx: 0, aFy: 0, aFz: -0.14,
}

function pose(overrides = {}) {
  return { ...GUARD, ...overrides }
}

function lerpPose(a, b, t) {
  const out = {}
  for (const key of POSE_KEYS) out[key] = a[key] + (b[key] - a[key]) * t
  return out
}

function smoothstep(t) { return t * t * (3 - 2 * t) }

function sampleKeyframes(frames, t) {
  if (t <= frames[0][0]) return frames[0][1]
  if (t >= frames[frames.length - 1][0]) return frames[frames.length - 1][1]
  for (let i = 1; i < frames.length; i++) {
    if (t <= frames[i][0]) {
      const [t0, p0] = frames[i - 1]
      const [t1, p1] = frames[i]
      return lerpPose(p0, p1, smoothstep((t - t0) / (t1 - t0)))
    }
  }
  return frames[frames.length - 1][1]
}

function frame(t, overrides) { return [t, pose(overrides)] }

const ACTIONS = {
  jab: {
    duration: 0.4, hitStart: 0.26, hitEnd: 0.42, damage: 46, reach: 0.93, knockback: 0.08,
    type: 'punch', sound: 'punch', cancelAt: 0.58, meterGain: 7,
    frames: [
      frame(0, {}),
      frame(0.17, { sNz: 0.36, eNz: 1.55, torsoZ: -0.12, torsoRY: 0.08, hipsZ: -0.04, headZ: -0.12 }),
      frame(0.32, { sNz: 1.54, eNz: 0.08, torsoZ: 0.22, torsoRY: -0.24, hipsZ: 0.08, headZ: 0.1, wNz: 0.02 }),
      frame(0.55, { sNz: 1.35, eNz: 0.25, torsoZ: 0.17, torsoRY: -0.16 }),
      frame(0.78, { sNz: 0.92, eNz: 1.0, torsoZ: 0.09 }),
      frame(1, {}),
    ],
  },
  cross: {
    duration: 0.48, hitStart: 0.3, hitEnd: 0.46, damage: 62, reach: 0.98, knockback: 0.12,
    type: 'punch', sound: 'punch', cancelAt: 0.62, meterGain: 9,
    frames: [
      frame(0, {}),
      frame(0.16, { sFz: 0.34, eFz: 1.62, torsoRY: -0.32, torsoZ: -0.1, hipsRY: -0.12 }),
      frame(0.34, { sFz: 1.6, eFz: 0.06, torsoRY: 0.25, torsoZ: 0.25, hipsRY: 0.16, headZ: 0.08 }),
      frame(0.58, { sFz: 1.36, eFz: 0.22, torsoRY: 0.18, torsoZ: 0.17 }),
      frame(0.8, { sFz: 0.88, eFz: 1.12, torsoRY: -0.02 }),
      frame(1, {}),
    ],
  },
  kick: {
    duration: 0.6, hitStart: 0.36, hitEnd: 0.53, damage: 82, reach: 1.18, knockback: 0.22,
    type: 'kick', sound: 'kick', cancelAt: 0.7, meterGain: 11,
    frames: [
      frame(0, {}),
      frame(0.18, { hNz: 0.62, kNz: 1.45, aNz: -0.5, torsoZ: -0.13, hipsY: -0.13, hipsZ: -0.05 }),
      frame(0.4, { hNz: 1.56, kNz: 0.05, aNz: -0.06, torsoZ: -0.27, hipsY: -0.04, hipsZ: 0.04, torsoRY: 0.2, sNz: 0.5, sFz: 0.45 }),
      frame(0.56, { hNz: 1.38, kNz: 0.22, torsoZ: -0.2, hipsY: -0.07 }),
      frame(0.76, { hNz: 0.55, kNz: 0.75, torsoZ: -0.06, hipsY: -0.1 }),
      frame(1, {}),
    ],
  },
  upper: {
    duration: 0.62, hitStart: 0.3, hitEnd: 0.46, damage: 104, reach: 0.82, knockback: 0.35,
    type: 'punch', sound: 'heavy', cancelAt: 0.7, meterGain: 14, launcher: true,
    frames: [
      frame(0, {}),
      frame(0.18, { hipsY: -0.19, torsoZ: -0.2, sNz: 0.28, eNz: 1.65, headZ: -0.12 }),
      frame(0.34, { hipsY: -0.03, torsoZ: 0.14, sNz: 2.32, eNz: 0.08, wNz: 0.04, headZ: 0.22, torsoRY: -0.2 }),
      frame(0.52, { hipsY: -0.05, torsoZ: 0.06, sNz: 2.5, eNz: 0.12, torsoRY: -0.12 }),
      frame(0.74, { sNz: 1.55, eNz: 0.5, torsoZ: 0.04 }),
      frame(1, {}),
    ],
  },
  dive: {
    duration: 0.58, hitStart: 0.16, hitEnd: 0.62, damage: 92, reach: 1.05, knockback: 0.18,
    type: 'kick', sound: 'kick', cancelAt: 0.75, meterGain: 10, air: true,
    frames: [
      frame(0, { hNz: 0.7, kNz: 0.9, torsoZ: -0.2, sNz: 1.2, sFz: 1.1 }),
      frame(0.3, { hNz: 1.2, kNz: 0.18, aNz: -0.2, torsoZ: -0.32, sNz: 1.35, sFz: 1.25 }),
      frame(0.7, { hNz: 1.1, kNz: 0.25, torsoZ: -0.26 }),
      frame(1, { hNz: 0.5, kNz: 0.9, torsoZ: -0.1 }),
    ],
  },
  special: {
    duration: 0.84, hitStart: 0.7, hitEnd: 0.82, damage: 122, reach: 1.3, knockback: 0.28,
    type: 'special', sound: 'special', cancelAt: 0.88, meterGain: 0, projectileAt: 0.42,
    frames: [
      frame(0, {}),
      frame(0.18, { hipsY: -0.15, torsoZ: -0.2, sNz: 0.35, sFz: 0.28, eNz: 1.6, eFz: 1.65, headZ: -0.1 }),
      frame(0.38, { hipsY: -0.09, torsoZ: 0.2, sNz: 1.45, sFz: 1.38, eNz: 0.12, eFz: 0.16, wNz: 0.12, wFz: 0.12, torsoRY: -0.14 }),
      frame(0.58, { torsoZ: 0.3, sNz: 1.58, sFz: 1.5, eNz: 0.05, eFz: 0.08, hipsZ: 0.1 }),
      frame(0.78, { torsoZ: 0.18, sNz: 1.3, sFz: 1.22, eNz: 0.3, eFz: 0.35 }),
      frame(1, {}),
    ],
  },
  execution: {
    duration: 2.65, hitStart: 0.12, hitEnd: 0.92, damage: 999, reach: 1.8, knockback: 0.4,
    type: 'execution', sound: 'special', cancelAt: 2, meterGain: 0,
    frames: [
      frame(0, {}),
      frame(0.08, { hipsY: -0.18, torsoZ: -0.15, sNz: 0.25, eNz: 1.7, sFz: 0.2, eFz: 1.7 }),
      frame(0.16, { torsoZ: 0.24, sNz: 1.55, eNz: 0.08, sFz: 1.48, eFz: 0.1, hipsZ: 0.1, headZ: 0.12 }),
      frame(0.26, { torsoZ: -0.18, sNz: 0.4, eNz: 1.7, sFz: 0.35, eFz: 1.65, hipsZ: -0.05 }),
      frame(0.36, { torsoZ: 0.28, sNz: 1.65, eNz: 0.02, sFz: 1.58, eFz: 0.04, hipsZ: 0.14 }),
      frame(0.46, { torsoZ: -0.12, sNz: 0.5, eNz: 1.6, sFz: 0.4, eFz: 1.6 }),
      frame(0.56, { torsoZ: 0.3, sNz: 1.7, eNz: 0.02, sFz: 1.62, eFz: 0.02, hipsZ: 0.15 }),
      frame(0.72, { torsoZ: -0.1, sNz: 0.4, eNz: 1.7, sFz: 0.35, eFz: 1.7 }),
      frame(0.82, { torsoZ: 0.34, sNz: 1.6, eNz: 0.04, sFz: 1.5, eFz: 0.1, hipsZ: 0.16 }),
      frame(1, {}),
    ],
    events: [
      { at: 0.16, type: 'slash' }, { at: 0.36, type: 'slash' }, { at: 0.56, type: 'slash' },
      { at: 0.82, type: 'finish' },
    ],
  },
}

const shadowTexture = (() => {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(64, 64, 2, 64, 64, 62)
  g.addColorStop(0, 'rgba(0,0,0,.7)')
  g.addColorStop(0.55, 'rgba(0,0,0,.36)')
  g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 128, 128)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
})()

function rounded(w, h, d, r = 0.03) {
  return new RoundedBoxGeometry(w, h, d, 3, Math.min(r, Math.min(w, h, d) * 0.45))
}
function capsule(radius, length, capSeg = 5, radial = 10) {
  return new THREE.CapsuleGeometry(radius, length, capSeg, radial)
}
function add(parent, geo, mat, pos = [0, 0, 0], rot = [0, 0, 0], scale = [1, 1, 1], shadows = true) {
  const m = new THREE.Mesh(geo, mat)
  m.position.set(...pos)
  m.rotation.set(...rot)
  m.scale.set(...scale)
  if (shadows) { m.castShadow = true; m.receiveShadow = true }
  parent.add(m)
  return m
}

function makeClothSheet(width, height, mat, segX = 8, segY = 18) {
  const geo = new THREE.PlaneGeometry(width, height, segX, segY)
  geo.userData.base = geo.attributes.position.array.slice()
  const mesh = new THREE.Mesh(geo, mat)
  mesh.castShadow = true
  return mesh
}

export class Fighter {
  constructor(scene, def, { side = 'player', x = -0.9 } = {}) {
    this.scene = scene
    this.def = def
    this.side = side
    this.isPlayer = side === 'player'
    this.facing = this.isPlayer ? 1 : -1
    this.x = x
    this.health = def.health
    this.maxHealth = def.health
    this.meter = 0
    this.action = null
    this.queuedAction = null
    this.hitStun = 0
    this.blocking = false
    this.airborne = false
    this.jumpVelocity = 0
    this.victory = false
    this.dead = false
    this.walkPhase = 0
    this.moving = 0
    this.time = Math.random() * 10
    this.pose = pose()
    this.targetPose = pose()
    this.actionEventIndex = 0
    this.onActionEvent = null
    this.onProjectile = null
    this.onFootstep = null
    this.comboHits = 0
    this.lastHitAt = 0
    this.hitFlash = 0

    this.root = new THREE.Group()
    this.root.name = def.name
    this.root.position.set(x, 0, 0)
    this.root.scale.x = this.facing
    scene.add(this.root)
    this.model = new THREE.Group()
    this.model.rotation.y = -0.06
    this.root.add(this.model)
    this.buildMaterials()
    this.buildBody()
    this.buildShadow()
    this.buildAura()

    this.rig = null
    this.characterReady = new Promise((resolve) => { this.resolveCharacter = resolve })
    this.loadCharacter()
  }

  async loadCharacter() {
    const spec = CHARACTER_SPECS[this.def.id]
    if (!spec) {
      this.resolveCharacter()
      return
    }
    try {
      const rig = await loadCharacterRig(spec)
      this.rig = rig
      this.model.add(rig.holder)
      // The procedural body remains as a loading fallback only.
      if (this.hips) this.hips.visible = false
    } catch (error) {
      console.warn(`Character model failed for ${this.def.name}`, error)
    } finally {
      this.resolveCharacter()
    }
  }

  buildMaterials() {
    const p = this.def.palette
    const skin = makeSkinTextures(p.skin, this.def.id === 'nyx' ? 40 : 67, 256)
    const leather = makeLeatherTextures(p.leather, this.def.id === 'nyx' ? 20 : 55, 256)
    const cloth = makeClothTextures(p.cloth, this.def.id === 'nyx' ? 30 : 72, 256)
    const metal = makeMetalTextures(p.metal, this.def.id === 'nyx' ? 12 : 49, 256)
    const armorMetal = makeMetalTextures(p.armor, this.def.id === 'nyx' ? 18 : 61, 256)

    this.materials = {
      skin: new THREE.MeshPhysicalMaterial({
        map: skin.map, normalMap: skin.normalMap, roughnessMap: skin.roughnessMap,
        normalScale: new THREE.Vector2(0.55, 0.55),
        roughness: 0.56, metalness: 0.0, clearcoat: 0.16, clearcoatRoughness: 0.42,
        sheen: 0.25, sheenRoughness: 0.8, sheenColor: new THREE.Color(p.skin).offsetHSL(0, 0.1, 0.08),
        envMapIntensity: 0.6,
      }),
      leather: new THREE.MeshStandardMaterial({
        map: leather.map, normalMap: leather.normalMap, roughnessMap: leather.roughnessMap,
        normalScale: new THREE.Vector2(0.7, 0.7), roughness: 0.8, metalness: 0.08,
      }),
      cloth: new THREE.MeshStandardMaterial({
        map: cloth.map, normalMap: cloth.normalMap, roughnessMap: cloth.roughnessMap,
        normalScale: new THREE.Vector2(0.6, 0.6), roughness: 0.95, metalness: 0.0,
        side: THREE.DoubleSide,
      }),
      armor: new THREE.MeshStandardMaterial({
        map: armorMetal.map, normalMap: armorMetal.normalMap, roughnessMap: armorMetal.roughnessMap,
        color: new THREE.Color(p.armor).offsetHSL(0, 0, 0.08),
        normalScale: new THREE.Vector2(0.9, 0.9), roughness: 0.48, metalness: 0.7,
        envMapIntensity: 1.2,
      }),
      metal: new THREE.MeshStandardMaterial({
        map: metal.map, normalMap: metal.normalMap, roughnessMap: metal.roughnessMap,
        color: 0xffffff, roughness: 0.33, metalness: 0.96, envMapIntensity: 1.7,
      }),
      accent: new THREE.MeshStandardMaterial({
        map: cloth.map, normalMap: cloth.normalMap, color: p.accent,
        roughness: 0.72, metalness: 0.05, side: THREE.DoubleSide,
      }),
      glow: new THREE.MeshStandardMaterial({
        color: p.glow, emissive: p.glow, emissiveIntensity: 4.5,
        roughness: 0.28, metalness: 0.35,
      }),
      eye: new THREE.MeshStandardMaterial({
        color: p.eye, emissive: p.eye, emissiveIntensity: 8,
        roughness: 0.12, metalness: 0.0,
      }),
      dark: new THREE.MeshStandardMaterial({ color: 0x07080a, roughness: 0.85, metalness: 0.2 }),
      blade: new THREE.MeshStandardMaterial({
        color: 0xe6e2d5, roughness: 0.12, metalness: 1.0, envMapIntensity: 2.2,
        emissive: new THREE.Color(p.glow).multiplyScalar(0.12),
      }),
      hair: new THREE.MeshStandardMaterial({ color: 0x161114, roughness: 0.92, metalness: 0.02 }),
      cape: new THREE.MeshStandardMaterial({
        map: cloneTexture(cloth.map, 1.5, 2.5), normalMap: cloth.normalMap,
        color: new THREE.Color(p.accent).multiplyScalar(0.72),
        roughness: 0.94, metalness: 0.0, side: THREE.DoubleSide,
      }),
    }
    this.glowMats = [this.materials.glow, this.materials.eye]
  }

  buildBody() {
    const M = this.materials
    const isNyx = this.def.id === 'nyx'

    this.hips = new THREE.Group()
    this.hips.position.y = BASE_HIPS_Y
    this.model.add(this.hips)

    // pelvis and belt
    add(this.hips, rounded(0.34, 0.24, 0.27, 0.06), isNyx ? M.leather : M.armor, [0, 0.01, 0])
    add(this.hips, rounded(0.37, 0.075, 0.3, 0.02), M.metal, [0, 0.11, 0], [0, 0, 0])
    add(this.hips, new THREE.BoxGeometry(0.09, 0.1, 0.055), M.glow, [0.18, 0.1, 0.06], [0, 0, 0])
    // hip tassets
    for (const z of [-1, 1]) {
      const plate = add(this.hips, rounded(0.16, 0.3, 0.08, 0.025), isNyx ? M.leather : M.armor, [0.01, -0.12, z * 0.19], [0, z * 0.14, z * 0.1])
      plate.rotation.x = z * 0.06
      add(this.hips, new THREE.BoxGeometry(0.05, 0.27, 0.012), M.metal, [0.085, -0.12, z * 0.225], [0, z * 0.14, z * 0.1])
    }

    // torso
    this.torso = new THREE.Group()
    this.torso.position.y = 0.065
    this.hips.add(this.torso)
    add(this.torso, rounded(0.27, 0.3, 0.23, 0.07), isNyx ? M.leather : M.cloth, [0, 0.17, 0])
    // chest core
    const chest = add(this.torso, new THREE.CylinderGeometry(0.25, 0.2, 0.36, 14), isNyx ? M.leather : M.armor, [0, 0.41, 0], [0, 0, 0], [1.18, 1, 0.84])
    chest.geometry.computeVertexNormals()
    // chest plate
    if (isNyx) {
      add(this.torso, rounded(0.31, 0.3, 0.26, 0.06), M.armor, [0.035, 0.41, 0], [0, 0, 0], [1, 1, 0.92])
      add(this.torso, rounded(0.055, 0.26, 0.04, 0.012), M.metal, [0.19, 0.41, 0.06], [0, 0, 0.04])
      add(this.torso, rounded(0.05, 0.24, 0.035, 0.012), M.metal, [0.19, 0.41, -0.06], [0, 0, -0.04])
      add(this.torso, new THREE.BoxGeometry(0.02, 0.11, 0.1), M.glow, [0.2, 0.42, 0], [0, 0, 0])
      // cross straps
      add(this.torso, new THREE.BoxGeometry(0.035, 0.48, 0.03), M.metal, [0.1, 0.35, 0.145], [0, 0, -0.62])
      add(this.torso, new THREE.BoxGeometry(0.03, 0.42, 0.025), M.leather, [0.1, 0.35, -0.14], [0, 0, 0.7])
    } else {
      add(this.torso, rounded(0.36, 0.38, 0.32, 0.06), M.armor, [0.025, 0.42, 0], [0, 0, 0], [1, 1, 0.95])
      add(this.torso, rounded(0.32, 0.15, 0.3, 0.03), M.metal, [0.035, 0.25, 0], [0, 0, 0])
      add(this.torso, new THREE.BoxGeometry(0.025, 0.28, 0.08), M.glow, [0.22, 0.44, 0], [0, 0, 0])
      add(this.torso, new THREE.BoxGeometry(0.24, 0.06, 0.06), M.glow, [0.14, 0.55, 0], [0, 0, 0.12])
      // fur collar
      for (let i = 0; i < 7; i++) {
        const a = -0.7 + i * 0.23
        add(this.torso, new THREE.DodecahedronGeometry(0.075, 0), M.dark, [0.02 + Math.sin(a) * 0.05, 0.61, Math.cos(a) * 0.16], [0, 0, 0], [1, 0.8, 1])
      }
    }

    // neck
    add(this.torso, new THREE.CylinderGeometry(0.075, 0.09, 0.13, 10), M.skin, [0.01, 0.63, 0])
    this.headPivot = new THREE.Group()
    this.headPivot.position.set(0.005, 0.69, 0)
    this.torso.add(this.headPivot)
    this.buildHead(isNyx)
    this.buildArms(isNyx)
    this.buildLegs(isNyx)
    this.buildCloth(isNyx)
  }

  buildHead(isNyx) {
    const M = this.materials
    const head = new THREE.Group()
    head.position.y = 0.06
    this.headPivot.add(head)
    this.head = head

    add(head, new THREE.SphereGeometry(0.155, 24, 18), M.skin, [0, 0.12, 0], [0, 0, 0], [1.04, 1.22, 0.98])
    // jaw
    add(head, rounded(0.15, 0.1, 0.14, 0.035), M.skin, [0.045, 0.01, 0], [0, 0, -0.12], [1, 0.9, 0.92])
    // nose
    add(head, new THREE.ConeGeometry(0.03, 0.075, 7), M.skin, [0.155, 0.1, 0], [0, 0, -Math.PI / 2])
    // brow
    add(head, rounded(0.075, 0.022, 0.13, 0.008), M.skin, [0.12, 0.165, 0], [0, 0, 0.15])
    // eyes
    for (const z of [-1, 1]) {
      add(head, new THREE.SphereGeometry(0.038, 10, 8), M.dark, [0.136, 0.132, z * 0.054], [0, 0, 0], [1, 0.72, 1], false)
      add(head, new THREE.SphereGeometry(0.017, 10, 8), M.eye, [0.158, 0.133, z * 0.052], [0, 0, 0], [1, 0.65, 1], false)
    }
    // mouth
    add(head, new THREE.BoxGeometry(0.018, 0.012, 0.075), M.dark, [0.152, 0.035, 0], [0, 0, 0], [1, 1, 1], false)

    if (isNyx) {
      // lower mask and head wrap
      add(head, rounded(0.13, 0.13, 0.185, 0.04), M.cloth, [0.055, 0.035, 0], [0, 0, -0.08])
      add(head, new THREE.CylinderGeometry(0.168, 0.165, 0.07, 16), M.accent, [0, 0.19, 0], [0, 0, 0.05])
      add(head, new THREE.BoxGeometry(0.02, 0.07, 0.12), M.metal, [0.135, 0.04, 0], [0, 0, 0])
      // hood / wrapped cloth
      add(head, new THREE.SphereGeometry(0.19, 18, 12, 0, TAU, 0, Math.PI * 0.62), M.cloth, [-0.03, 0.14, 0], [0, 0, -0.1], [1.03, 1.06, 1.02])
      // braid
      this.braid = new THREE.Group()
      this.braid.position.set(-0.14, 0.12, 0)
      head.add(this.braid)
      for (let i = 0; i < 6; i++) {
        const seg = add(this.braid, new THREE.SphereGeometry(0.055 - i * 0.004, 10, 8), M.hair, [-0.02 - i * 0.025, -0.07 - i * 0.095, 0], [0, 0, 0], [0.8, 1.3, 0.8])
        seg.castShadow = true
        if (i === 5) add(this.braid, new THREE.ConeGeometry(0.045, 0.13, 7), M.hair, [-0.17, -0.6, 0], [0, 0, 0.2])
      }
    } else {
      // helmet shell
      add(head, new THREE.SphereGeometry(0.19, 20, 16), M.armor, [0, 0.14, 0], [0, 0, -0.05], [1.02, 1.08, 1.03])
      // face opening / dark slit
      add(head, rounded(0.06, 0.15, 0.18, 0.02), M.dark, [0.155, 0.1, 0], [0, 0, 0], [1, 1, 1], false)
      add(head, new THREE.BoxGeometry(0.035, 0.045, 0.13), M.glow, [0.175, 0.12, 0], [0, 0, 0], [1, 1, 1], false)
      // cheek guards
      for (const z of [-1, 1]) {
        add(head, rounded(0.07, 0.19, 0.06, 0.02), M.metal, [0.04, 0.02, z * 0.135], [0, 0, z * 0.08])
      }
      // crest
      add(head, new THREE.BoxGeometry(0.045, 0.13, 0.06), M.metal, [0.0, 0.31, 0], [0, 0, 0.1])
      for (const z of [-1, 1]) {
        const horn = add(head, new THREE.ConeGeometry(0.045, 0.36, 8), M.metal, [-0.02, 0.32, z * 0.14], [z * 0.36, 0, -0.3])
        horn.castShadow = true
      }
      // beard / jaw guard
      add(head, rounded(0.12, 0.11, 0.14, 0.025), M.dark, [0.04, -0.03, 0], [0, 0, 0])
    }
  }

  buildArms(isNyx) {
    const M = this.materials
    const buildArm = (z, near) => {
      const shoulder = new THREE.Group()
      shoulder.position.set(0.01, 0.51, z)
      this.torso.add(shoulder)
      // upper arm
      add(shoulder, capsule(isNyx ? 0.07 : 0.085, 0.24, 5, 10), M.skin, [0, -0.17, 0])
      if (!isNyx) add(shoulder, rounded(0.15, 0.19, 0.16, 0.04), M.armor, [0.01, -0.1, 0])
      // pauldron
      const pauldron = new THREE.Group()
      pauldron.position.set(0.015, 0.03, 0)
      shoulder.add(pauldron)
      if (isNyx) {
        add(pauldron, rounded(0.2, 0.12, 0.18, 0.04), M.armor, [0.02, 0.02, 0], [0, 0, -0.1])
        add(pauldron, rounded(0.16, 0.08, 0.16, 0.03), M.metal, [0.06, 0.09, 0], [0, 0, -0.25])
        add(pauldron, new THREE.BoxGeometry(0.02, 0.08, 0.1), M.glow, [0.12, 0.04, 0.02], [0, 0, -0.1])
      } else {
        add(pauldron, rounded(0.26, 0.15, 0.24, 0.05), M.armor, [0.015, 0.03, 0], [0, 0, -0.08])
        add(pauldron, rounded(0.22, 0.07, 0.2, 0.03), M.metal, [0.05, 0.12, 0], [0, 0, -0.2])
        for (let i = 0; i < 3; i++) {
          add(pauldron, new THREE.ConeGeometry(0.035, 0.18, 6), M.metal, [-0.06, 0.1 + i * 0.045, -0.08 + i * 0.08], [0.2, 0, -0.55])
        }
      }
      const elbow = new THREE.Group()
      elbow.position.y = -0.35
      shoulder.add(elbow)
      add(elbow, capsule(isNyx ? 0.062 : 0.075, 0.2, 5, 10), M.skin, [0, -0.15, 0])
      // bracer
      add(elbow, rounded(isNyx ? 0.12 : 0.16, 0.2, isNyx ? 0.13 : 0.16, 0.035), isNyx ? M.leather : M.armor, [0.01, -0.16, 0])
      add(elbow, rounded(0.13, 0.045, 0.14, 0.015), M.metal, [0.02, -0.08, 0], [0, 0, 0.04])
      add(elbow, new THREE.BoxGeometry(0.018, 0.07, 0.08), M.glow, [0.075, -0.16, 0], [0, 0, 0])
      // hand
      const wrist = new THREE.Group()
      wrist.position.y = -0.31
      elbow.add(wrist)
      add(wrist, new THREE.SphereGeometry(isNyx ? 0.065 : 0.08, 12, 10), M.skin, [0.01, -0.03, 0], [0, 0, 0], [0.9, 1.05, 0.95])
      if (isNyx) {
        // dagger
        const weapon = new THREE.Group()
        weapon.position.set(0.02, -0.06, 0)
        wrist.add(weapon)
        add(weapon, new THREE.BoxGeometry(0.045, 0.02, 0.11), M.metal, [0, 0, 0])
        add(weapon, new THREE.ConeGeometry(0.028, 0.3, 4), M.blade, [0, -0.16, 0], [0, Math.PI / 4, 0], [1, 1, 0.45])
        add(weapon, new THREE.BoxGeometry(0.012, 0.045, 0.012), M.glow, [0, -0.02, 0.055], [0, 0, 0], [1, 1, 1], false)
      } else {
        for (let i = 0; i < 3; i++) {
          add(wrist, new THREE.ConeGeometry(0.018, 0.09, 5), M.metal, [0.06, -0.04, -0.04 + i * 0.04], [0, 0, -Math.PI / 2])
        }
      }
      return { shoulder, elbow, wrist }
    }
    this.armN = buildArm(0.2, true)
    this.armF = buildArm(-0.2, false)
  }

  buildLegs(isNyx) {
    const M = this.materials
    const buildLeg = (z, near) => {
      const hip = new THREE.Group()
      hip.position.set(0, -0.01, z)
      this.hips.add(hip)
      add(hip, capsule(isNyx ? 0.085 : 0.105, 0.25, 5, 10), isNyx ? M.leather : M.cloth, [0, -0.2, 0])
      if (!isNyx) add(hip, rounded(0.18, 0.26, 0.18, 0.04), M.armor, [0.02, -0.17, 0])
      // thigh strap
      add(hip, new THREE.TorusGeometry(isNyx ? 0.09 : 0.105, 0.012, 6, 16), M.metal, [0, -0.12, 0], [Math.PI / 2, 0, 0])
      const knee = new THREE.Group()
      knee.position.y = -0.42
      hip.add(knee)
      add(knee, capsule(isNyx ? 0.072 : 0.09, 0.22, 5, 10), isNyx ? M.leather : M.cloth, [0, -0.18, 0])
      add(knee, rounded(isNyx ? 0.12 : 0.15, 0.11, isNyx ? 0.13 : 0.16, 0.03), isNyx ? M.armor : M.metal, [0.04, -0.04, 0], [0, 0, -0.1])
      // greave
      add(knee, rounded(isNyx ? 0.13 : 0.17, 0.25, isNyx ? 0.14 : 0.18, 0.035), isNyx ? M.leather : M.armor, [0.02, -0.2, 0])
      add(knee, new THREE.BoxGeometry(0.018, 0.12, 0.07), M.glow, [0.09, -0.2, 0.02], [0, 0, 0], [1, 1, 1], false)
      const ankle = new THREE.Group()
      ankle.position.y = -0.37
      knee.add(ankle)
      add(ankle, rounded(0.14, 0.1, isNyx ? 0.17 : 0.2, 0.03), isNyx ? M.leather : M.armor, [0.055, -0.035, 0])
      add(ankle, rounded(0.11, 0.04, isNyx ? 0.16 : 0.19, 0.012), M.metal, [0.07, 0.015, 0])
      return { hip, knee, ankle }
    }
    this.legN = buildLeg(0.12, true)
    this.legF = buildLeg(-0.12, false)
  }

  buildCloth(isNyx) {
    const M = this.materials
    if (isNyx) {
      // scarf / sash tails
      this.sashes = []
      for (const [i, z] of [0.03, -0.05].entries()) {
        const mesh = makeClothSheet(0.22, 1.0, M.accent, 6, 16)
        mesh.position.set(-0.16, 0.22, z)
        mesh.rotation.y = 0.05
        mesh.rotation.z = 0.1
        this.torso.add(mesh)
        this.sashes.push({ mesh, phase: i * 1.7 })
      }
      // hip sash
      add(this.hips, new THREE.BoxGeometry(0.035, 0.45, 0.25), M.accent, [-0.08, -0.08, 0.02], [0, 0, 0.1])
      add(this.hips, new THREE.BoxGeometry(0.025, 0.38, 0.2), M.metal, [-0.09, -0.05, 0.03], [0, 0, 0.1])
    } else {
      // cape
      this.cape = makeClothSheet(0.62, 1.32, M.cape, 9, 20)
      this.cape.position.set(-0.19, 0.02, 0)
      this.cape.rotation.y = 0.06
      this.torso.add(this.cape)
      // shoulder mantle
      add(this.torso, new THREE.TorusGeometry(0.24, 0.055, 8, 20, Math.PI * 1.1), M.cape, [0, 0.55, 0], [0, Math.PI / 2, -0.2], [1, 1, 0.7])
    }
  }

  buildShadow() {
    this.shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(1.3, 0.62),
      new THREE.MeshBasicMaterial({ map: shadowTexture, transparent: true, opacity: 0.62, depthWrite: false }),
    )
    this.shadow.rotation.x = -Math.PI / 2
    this.shadow.position.set(this.x, 0.026, 0)
    this.shadow.renderOrder = 1
    this.scene.add(this.shadow)
  }

  buildAura() {
    const tex = makeGlowTexture(128, 'rgba(255,255,255,.9)', 'rgba(255,90,60,.35)')
    this.aura = new THREE.Sprite(new THREE.SpriteMaterial({
      map: tex, color: this.def.specialColor, transparent: true, opacity: 0.07,
      depthWrite: false, blending: THREE.AdditiveBlending,
    }))
    this.aura.scale.set(1.2, 1.8, 1)
    this.aura.position.set(0, 0.9, -0.2)
    this.model.add(this.aura)
  }

  setFacing(dir) {
    if (dir === 0) return
    const f = dir > 0 ? 1 : -1
    if (f === this.facing) return
    this.facing = f
    this.root.scale.x = f
  }

  setPosition(x) {
    this.x = x
    this.root.position.x = x
    this.shadow.position.x = x
  }

  setJump(y, velocity = 0) {
    this.root.position.y = y
    this.airborne = y > 0.03
    this.jumpVelocity = velocity
    this.shadow.position.x = this.x
    this.shadow.scale.setScalar(1 - Math.min(y, 2) * 0.16)
    this.shadow.material.opacity = 0.62 - Math.min(y, 2) * 0.15
  }

  canAct() {
    if (this.dead || this.hitStun > 0) return false
    if (!this.action) return true
    return this.action.time / this.action.duration >= this.action.cancelAt
  }

  isAttacking() { return !!this.action && this.action.type !== 'execution' && this.action.type !== 'hit' }

  startAction(name, options = {}) {
    const def = ACTIONS[name]
    if (!def) return false
    if (this.action && !this.canAct()) return false
    this.action = {
      ...def, name, time: 0, hitDone: false, fired: false,
      ...options,
    }
    this.actionEventIndex = 0
    this.blocking = false
    return true
  }

  queueAction(name, options = {}) {
    this.queuedAction = { name, options }
  }

  setBlocking(on) {
    if (this.dead || this.hitStun > 0 || this.action) {
      this.blocking = false
      return
    }
    this.blocking = on
  }

  getHitInfo() {
    if (!this.action || this.action.hitDone) return null
    if (this.action.name === 'execution') return null
    if (this.action.type === 'special') {
      return null
    }
    const t = this.action.time / this.action.duration
    if (t < this.action.hitStart || t > this.action.hitEnd) return null
    return this.action
  }

  consumeHit() {
    if (this.action) this.action.hitDone = true
  }

  takeHit(attack, blocked = false) {
    const power = this.def.power
    const damage = Math.max(1, attack.damage * (attack.power ?? power) * (blocked ? 0.14 : 1))
    this.health = Math.max(0, this.health - damage)
    this.meter = Math.min(100, this.meter + (blocked ? 3 : 7))
    this.hitFlash = 0.16
    if (blocked) {
      this.hitStun = 0.1
      this.blocking = true
      return { damage, blocked, ko: false }
    }
    this.hitStun = attack.launcher ? 0.62 : 0.32
    this.action = null
    this.queuedAction = null
    this.blocking = false
    this.dead = this.health <= 0
    if (this.dead) {
      this.action = { ...ACTIONS.execution, name: 'ko', time: 0, duration: 1.2, hitDone: true, type: 'ko', cancelAt: 9, frames: [frame(0, { modelRotZ: 0, hipsY: -0.12, torsoZ: -0.3 }), frame(1, { modelRotZ: 1.35, hipsY: -0.25, torsoZ: -0.5, headZ: -0.4, sNz: 0.2, sFz: 0.15 })] }
      this.actionEventIndex = 0
      this.hitStun = 0
    }
    return { damage, blocked, ko: this.dead }
  }

  reset(x) {
    this.health = this.maxHealth
    this.meter = Math.min(100, this.meter)
    this.action = null
    this.queuedAction = null
    this.hitStun = 0
    this.blocking = false
    this.dead = false
    this.victory = false
    this.root.position.y = 0
    this.root.position.x = x
    this.x = x
    this.model.rotation.z = 0
    this.pose = pose()
    this.targetPose = pose()
    this.shadow.position.x = x
    this.shadow.scale.setScalar(1)
    this.shadow.material.opacity = 0.62
    this.walkPhase = 0
    this.rig?.reset()
  }

  setVictory(on) {
    this.victory = on
    if (on) this.action = null
  }

  getMeterRatio() { return this.meter / 100 }

  addMeter(amount) { this.meter = Math.min(100, this.meter + amount) }

  update(dt, time, opponent, intent = {}) {
    this.time = time
    const speed = this.def.speed
    this.moving = intent.moving || 0
    this.setFacing(opponent ? Math.sign(opponent.x - this.x) : this.facing)

    if (this.hitFlash > 0) this.hitFlash -= dt
    if (this.hitStun > 0) this.hitStun -= dt

    // action progression
    if (this.action) {
      this.action.time += dt
      const t = Math.min(1, this.action.time / this.action.duration)
      this.targetPose = sampleKeyframes(this.action.frames, t)
      if (this.action.events) {
        while (this.actionEventIndex < this.action.events.length && t >= this.action.events[this.actionEventIndex].at) {
          this.onActionEvent?.(this.action.events[this.actionEventIndex], this.action)
          this.actionEventIndex++
        }
      }
      if (this.action.type === 'special' && !this.action.fired && t >= (this.action.projectileAt || 0.42)) {
        this.action.fired = true
        this.onProjectile?.(this.action)
      }
      if (t >= 1) {
        const queued = this.queuedAction
        this.action = null
        this.queuedAction = null
        if (queued) this.startAction(queued.name, queued.options)
      }
    } else if (this.hitStun > 0) {
      const hit = this.hitStun
      this.targetPose = pose({
        torsoZ: -0.22 - Math.sin(hit * 22) * 0.08,
        headZ: -0.24,
        headY: -0.1,
        hipsY: -0.12,
        sNz: 0.4, eNz: 1.4, sFz: 0.3, eFz: 1.4,
        hNz: 0.12, kNz: -0.25, hFz: -0.1, kFz: 0.25,
      })
    } else if (this.dead) {
      // handled by action
    } else if (this.victory) {
      const b = Math.sin(time * 2.1) * 0.02
      this.targetPose = pose({
        hipsY: -0.03 + b, torsoZ: -0.05, headZ: 0.18, headX: -0.1,
        sNz: 2.5 + b, eNz: 0.25, sFz: 2.3, eFz: 0.35, hNz: 0.1, kNz: -0.2, hFz: -0.05, kFz: 0.2,
      })
    } else if (this.blocking) {
      this.targetPose = pose({
        torsoZ: -0.05, headZ: -0.12, hipsY: -0.1,
        sNz: 1.02, eNz: 1.6, sFz: 0.88, eFz: 1.72, sNy: 0.16, sFy: -0.1,
        hNz: 0.22, kNz: -0.36, hFz: -0.15, kFz: 0.34,
      })
    } else if (this.airborne) {
      this.targetPose = pose({
        torsoZ: -0.12, hipsY: -0.04,
        hNz: 0.62, kNz: 0.55, aNz: -0.3, hFz: -0.28, kFz: 0.7,
        sNz: 1.15, eNz: 0.8, sFz: 0.95, eFz: 0.9,
      })
    } else if (Math.abs(this.moving) > 0.08) {
      this.walkPhase += dt * speed * 8.2 * Math.sign(this.moving || 1)
      const phase = this.walkPhase
      const dir = this.moving > 0 ? 1 : -1
      const swing = Math.sin(phase) * 0.45
      const lift = Math.max(0, Math.cos(phase)) * 0.38
      this.targetPose = pose({
        hipsY: -0.075 + Math.abs(Math.sin(phase * 2)) * 0.025,
        torsoZ: 0.07 + dir * 0.05,
        torsoRY: -0.08 + Math.sin(phase) * 0.06,
        hNz: 0.2 + swing, kNz: -0.32 - lift, aNz: 0.12,
        hFz: -0.18 - swing, kFz: 0.32 + Math.max(0, -Math.cos(phase)) * 0.38,
        sNz: 0.8 - swing * 0.35, eNz: 1.22 + Math.abs(swing) * 0.2,
        sFz: 0.62 + swing * 0.35, eFz: 1.4,
        headZ: -0.03 + Math.sin(phase) * 0.02,
      })
    } else {
      const breathe = Math.sin(time * 2.2) * 0.012
      const sway = Math.sin(time * 1.3) * 0.008
      this.targetPose = pose({
        hipsY: -0.075 + breathe * 0.6,
        torsoZ: 0.055 + breathe,
        torsoRY: -0.08 + sway,
        headZ: -0.03 - breathe * 0.6,
        sNz: 0.8 + breathe, eNz: 1.22 + breathe * 0.6,
        sFz: 0.62 - breathe * 0.5, eFz: 1.4,
      })
    }

    // blend pose
    const rate = this.action ? 32 : (this.hitStun > 0 ? 30 : 12)
    const blend = 1 - Math.exp(-rate * dt)
    for (const key of POSE_KEYS) this.pose[key] += (this.targetPose[key] - this.pose[key]) * blend
    this.applyPose(this.pose)

    // imported character animation
    this.rig?.update(dt, this)

    // cloth / braid
    this.updateCloth(dt, time)
    this.updateAura(time)
    this.updateShadow()

    // jump physics
    if (this.airborne) {
      this.jumpVelocity -= 13 * dt
      this.root.position.y += this.jumpVelocity * dt
      if (this.root.position.y <= 0) {
        this.root.position.y = 0
        this.airborne = false
        this.jumpVelocity = 0
        this.shadow.scale.setScalar(1)
        this.shadow.material.opacity = 0.62
      }
    }
  }

  applyPose(p) {
    this.hips.position.y = BASE_HIPS_Y + p.hipsY
    this.hips.rotation.set(p.hipsX, p.hipsRY, p.hipsZ)
    this.torso.rotation.set(p.torsoX, p.torsoRY, p.torsoZ)
    this.headPivot.rotation.set(p.headX, p.headY, p.headZ + p.headRY * 0.0)
    this.headPivot.rotation.y += p.headRY
    this.model.rotation.z = p.modelRotZ
    this.model.position.y = p.rootY
    this.armN.shoulder.rotation.set(p.sNx, p.sNy, p.sNz)
    this.armN.elbow.rotation.set(p.eNx, p.eNy, p.eNz)
    this.armN.wrist.rotation.set(p.wNx, p.wNy, p.wNz)
    this.armF.shoulder.rotation.set(p.sFx, p.sFy, p.sFz)
    this.armF.elbow.rotation.set(p.eFx, p.eFy, p.eFz)
    this.armF.wrist.rotation.set(p.wFx, p.wFy, p.wFz)
    this.legN.hip.rotation.set(p.hNx, p.hNy, p.hNz)
    this.legN.knee.rotation.set(p.kNx, p.kNy, p.kNz)
    this.legN.ankle.rotation.set(p.aNx, p.aNy, p.aNz)
    this.legF.hip.rotation.set(p.hFx, p.hFy, p.hFz)
    this.legF.knee.rotation.set(p.kFx, p.kFy, p.kFz)
    this.legF.ankle.rotation.set(p.aFx, p.aFy, p.aFz)
  }

  updateCloth(dt, time) {
    const speed = Math.abs(this.moving)
    if (this.cape) {
      const pos = this.cape.geometry.attributes.position
      const base = this.cape.geometry.userData.base
      for (let i = 0; i < pos.count; i++) {
        const x = base[i * 3], y = base[i * 3 + 1]
        const drop = 1 - (y + 0.66) / 1.32
        const wind = Math.sin(time * 2.4 + x * 3.1 + y * 1.4) * 0.055
        const trail = Math.sin(time * 3.8 + y * 2.2) * 0.022 + speed * 0.06
        pos.setZ(i, (wind + trail) * drop * drop + speed * 0.02)
        pos.setX(i, x - speed * 0.035 * drop * drop)
      }
      pos.needsUpdate = true
      this.cape.geometry.computeVertexNormals()
    }
    if (this.sashes) {
      for (const s of this.sashes) {
        const pos = s.mesh.geometry.attributes.position
        const base = s.mesh.geometry.userData.base
        for (let i = 0; i < pos.count; i++) {
          const x = base[i * 3], y = base[i * 3 + 1]
          const drop = 1 - (y + 0.5)
          pos.setZ(i, (Math.sin(time * 2.8 + y * 2.5 + s.phase) * 0.06 + speed * 0.08) * drop * drop)
          pos.setX(i, x + Math.sin(time * 1.9 + y + s.phase) * 0.025 * drop)
        }
        pos.needsUpdate = true
        s.mesh.geometry.computeVertexNormals()
      }
    }
    if (this.braid) {
      this.braid.rotation.z = Math.sin(time * 2.1) * 0.08 + speed * 0.15
      this.braid.rotation.x = Math.sin(time * 1.7 + 0.5) * 0.06
    }
  }

  updateAura(time) {
    const ratio = this.meter / 100
    this.aura.material.opacity = 0.035 + ratio * 0.08 + Math.sin(time * 2.6) * 0.012
    const s = 1.1 + ratio * 0.2
    this.aura.scale.set(s, s * 1.5, 1)
    for (const m of this.glowMats) m.emissiveIntensity = (m === this.materials.eye ? 8 : 4.2) + Math.sin(time * 3.2) * 1.2 + ratio * 2
  }

  updateShadow() {
    this.shadow.position.x = this.x
    this.shadow.position.z = 0.02
    if (!this.airborne) {
      this.shadow.scale.setScalar(1)
      this.shadow.material.opacity = 0.62
    }
  }
}
