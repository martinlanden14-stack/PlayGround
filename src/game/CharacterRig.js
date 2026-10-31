import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const loader = new GLTFLoader()
const BASE = import.meta.env.BASE_URL || '/'

/**
 * Hand-authored state map for the two Sketchfab characters.
 *
 * The source clips are performance captures rather than game-ready state
 * machines, so each attack selects the most readable slice of a clip and
 * stretches it to the combat action's duration. That keeps the authored
 * animation while making the visual strike land on the gameplay hit frame.
 */
export const CHARACTER_SPECS = {
  nyx: {
    url: `${BASE}models/female-samurai.glb`,
    height: 2.18,
    keepMeshes: ['Object_9'],
    idle: { clip: 'metarig|Idle', speed: 0.92 },
    walk: { clip: 'metarig|Walking', speed: 1.18 },
    block: { clip: 'metarig|Idle', speed: 0.34 },
    victory: { clip: 'metarig|Idle2', speed: 0.72 },
    ko: { clip: 'metarig|Idle', speed: 0.28 },
    hit: { clip: 'metarig|Idle', speed: 1.8 },
    attacks: {
      jab: { clip: 'metarig|Attack1', start: 0.7, length: 0.98 },
      cross: { clip: 'metarig|Attack1', start: 0.66, length: 1.02 },
      kick: { clip: 'metarig|Attack1', start: 0.62, length: 1.08 },
      upper: { clip: 'metarig|Attack1', start: 0.58, length: 1.16 },
      dive: { clip: 'metarig|Attack1', start: 0.64, length: 1.0 },
      special: { clip: 'metarig|Attack1', start: 0.56, length: 1.2 },
      execution: { clip: 'metarig|Attack1', start: 0.5, length: 1.3 },
    },
  },
  kaelus: {
    url: `${BASE}models/flagellant.glb`,
    height: 2.04,
    idle: { clip: 'Boxing', speed: 0.48 },
    walk: { clip: 'Run', speed: 0.92 },
    block: { clip: 'Boxing', speed: 0.24 },
    victory: { clip: 'Flex', speed: 0.7 },
    ko: { clip: 'Boxing', speed: 0.2 },
    hit: { clip: 'Boxing', speed: 1.6 },
    attacks: {
      jab: { clip: 'Boxing', start: 2.55, length: 1.02 },
      cross: { clip: 'Boxing', start: 7.5, length: 1.1 },
      kick: { clip: 'Slash', start: 3.5, length: 1.2 },
      upper: { clip: 'Slash', start: 6.6, length: 1.3 },
      dive: { clip: 'Slash', start: 4.2, length: 1.2 },
      special: { clip: 'Slash', start: 3.3, length: 1.5 },
      execution: { clip: 'Slash', start: 3.1, length: 1.6 },
    },
  },
}

function eachMaterial(mesh, fn) {
  const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
  for (const material of materials) if (material) fn(material)
}

export class CharacterRig {
  constructor(spec) {
    this.spec = spec
    this.holder = new THREE.Group()
    this.holder.name = 'character-rig'
    this.holder.rotation.y = Math.PI / 2
    this.root = null
    this.mixer = null
    this.actions = new Map()
    this.current = null
    this.currentKey = ''
    this.lastAction = null
    this.ready = false
    this.tilt = 0
  }

  async load() {
    const gltf = await loader.loadAsync(this.spec.url)
    const root = gltf.scene
    root.name = 'character-model'

    root.traverse((object) => {
      if (!object.isMesh) return
      const parentName = object.parent?.name || ''
      const keep = !this.spec.keepMeshes
        || this.spec.keepMeshes.includes(object.name)
        || this.spec.keepMeshes.includes(parentName)
      object.visible = keep
      if (!keep) return
      object.castShadow = true
      object.receiveShadow = true
      object.frustumCulled = false
      eachMaterial(object, (material) => {
        material.envMapIntensity = Math.max(material.envMapIntensity ?? 1, 1.05)
        material.needsUpdate = true
      })
    })

    root.updateMatrixWorld(true)
    const box = new THREE.Box3()
    root.traverse((object) => {
      if (object.isMesh && object.visible) box.expandByObject(object)
    })
    if (box.isEmpty()) throw new Error(`No visible geometry in ${this.spec.url}`)

    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const scale = this.spec.height / Math.max(0.0001, size.y)

    // Feet on the arena floor, pelvis centred over the fighter origin.
    root.position.set(-center.x, -box.min.y, -center.z)
    this.holder.scale.setScalar(scale)
    this.holder.add(root)
    this.root = root

    this.mixer = new THREE.AnimationMixer(root)
    for (const clip of gltf.animations || []) {
      this.actions.set(clip.name, this.mixer.clipAction(clip))
    }

    this.ready = true
    this.setState('idle', this.spec.idle, 0)
    return this
  }

  getAction(name) {
    return this.actions.get(name) || null
  }

  playAction(clipName, { loop = true, speed = 1, start = 0, fade = 0.2, key = clipName } = {}) {
    const next = this.getAction(clipName)
    if (!next) return null
    if (this.currentKey === key && this.current === next) {
      return next
    }
    const previous = this.current
    // Locomotion states often share one clip. Keep its playhead so idle →
    // guard → idle does not snap back to the first frame.
    if (previous === next && !key.startsWith('attack:')) {
      next.setEffectiveTimeScale(speed)
      this.currentKey = key
      return next
    }
    next.reset()
    next.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce, loop ? Infinity : 1)
    next.clampWhenFinished = !loop
    next.setEffectiveTimeScale(speed)
    next.setEffectiveWeight(1)
    next.enabled = true
    if (start) next.time = start
    next.play()
    if (previous && previous !== next && fade > 0) {
      next.crossFadeFrom(previous, fade, false)
    }
    this.current = next
    this.currentKey = key
    return next
  }

  setState(key, config, fade = 0.22) {
    if (!this.ready || !config) return
    this.playAction(config.clip, {
      loop: true,
      speed: config.speed ?? 1,
      start: config.start ?? 0,
      fade,
      key,
    })
  }

  playAttack(action) {
    if (!this.ready || !action) return
    const spec = this.spec.attacks?.[action.name] || this.spec.attacks?.jab
    if (!spec) return
    const speed = Math.max(0.25, spec.length / Math.max(0.1, action.duration))
    this.playAction(spec.clip, {
      loop: false,
      speed,
      start: spec.start ?? 0,
      fade: 0.08,
      key: `attack:${action.name}`,
    })
  }

  update(dt, fighter) {
    if (!this.ready) return

    if (fighter.dead) {
      this.lastAction = null
      this.setState('ko', this.spec.ko, 0.4)
    } else if (fighter.action) {
      if (fighter.action !== this.lastAction) {
        this.lastAction = fighter.action
        this.playAttack(fighter.action)
      }
    } else {
      this.lastAction = null
      if (fighter.victory) this.setState('victory', this.spec.victory, 0.3)
      else if (fighter.hitStun > 0) this.setState('hit', this.spec.hit, 0.06)
      else if (fighter.blocking) this.setState('block', this.spec.block, 0.12)
      else if (Math.abs(fighter.moving) > 0.08) this.setState('walk', this.spec.walk, 0.18)
      else this.setState('idle', this.spec.idle, 0.26)
    }

    // A small, readable reaction on top of the captured animation.
    const targetTilt = fighter.dead ? 0 : fighter.hitStun > 0 ? -0.16 : 0
    this.tilt += (targetTilt - this.tilt) * (1 - Math.exp(-18 * dt))
    this.holder.rotation.z = this.tilt

    this.mixer.update(dt)
  }

  reset() {
    this.lastAction = null
    this.currentKey = ''
    this.setState('idle', this.spec.idle, 0)
  }
}

export async function loadCharacterRig(spec) {
  return new CharacterRig(spec).load()
}
