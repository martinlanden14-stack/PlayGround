import './style.css'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'
import { createWorld } from './world.js'
import { Effects } from './effects.js'
import { AudioEngine } from './audio.js'
import { HUD } from './hud.js'
import { Game } from './game.js'

const CinematicShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uAberration: { value: 0.00125 },
    uVignette: { value: 0.34 }
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
    uniform vec2 uResolution;
    uniform float uAberration;
    uniform float uVignette;
    varying vec2 vUv;
    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }
    void main() {
      vec2 centered = vUv - 0.5;
      float r = length(centered);
      vec2 offset = centered * uAberration * (0.22 + r * 1.4);
      vec3 col;
      col.r = texture2D(tDiffuse, vUv + offset).r;
      col.g = texture2D(tDiffuse, vUv).g;
      col.b = texture2D(tDiffuse, vUv - offset).b;
      // Filmic contrast in linear space
      col = (col - 0.5) * 1.045 + 0.5;
      float vig = smoothstep(0.78, 0.18, r);
      col *= mix(1.0 - uVignette, 1.0, vig);
      float grain = hash(vUv * uResolution + fract(uTime) * 91.7) - 0.5;
      col += grain * 0.012;
      gl_FragColor = vec4(max(col, 0.0), 1.0);
    }
  `
}

async function boot() {
  // Capture clicks that land before the heavy scene finishes building.
  let queuedStart = false
  const playBtnEl = document.getElementById('play-btn')
  if (playBtnEl) playBtnEl.addEventListener('click', () => {
    if (!window.__HELIX__?.game) queuedStart = true
  })
  try { await document.fonts.ready } catch { /* fonts can time out */ }
  const debugMode = new URLSearchParams(location.search).has('debug')

  const canvas = document.getElementById('game')
  const isTouch = matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0 || window.innerWidth <= 760
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    powerPreference: 'high-performance',
    stencil: false
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isTouch ? 1.35 : 1.5))
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.16
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFShadowMap

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x03070d)
  const camera = new THREE.PerspectiveCamera(72, window.innerWidth / window.innerHeight, 0.045, 320)
  camera.rotation.order = 'YXZ'
  scene.add(camera)

  const world = createWorld(scene, renderer)
  const effects = new Effects(scene)
  const audio = new AudioEngine()
  const hud = new HUD()

  const composer = new EffectComposer(renderer)
  composer.setPixelRatio(renderer.getPixelRatio())
  composer.setSize(window.innerWidth, window.innerHeight)
  const renderPass = new RenderPass(scene, camera)
  composer.addPass(renderPass)
  const bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), isTouch ? 0.48 : 0.56, 0.5, 0.82)
  composer.addPass(bloom)
  const cinematic = new ShaderPass(CinematicShader)
  cinematic.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight)
  composer.addPass(cinematic)
  composer.addPass(new OutputPass())

  const game = new Game({ scene, camera, renderer, composer, world, effects, audio, hud })
  window.__HELIX__ = Object.assign(window.__HELIX__ || {}, {
    game, renderer, composer, bloom, camera, scene, effects, audio, hud, world
  })
  if (queuedStart) setTimeout(() => game.startGame(), 0)

  function resize() {
    const w = window.innerWidth
    const h = window.innerHeight
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
    composer.setPixelRatio(renderer.getPixelRatio())
    composer.setSize(w, h)
    bloom.resolution.set(w, h)
    cinematic.uniforms.uResolution.value.set(w, h)
    game.weapon.updateViewAspect(camera.aspect)
    game.player.baseFov = camera.aspect < 0.8 ? 80 : game.touchMode ? 76 : 72
  }
  window.addEventListener('resize', resize)
  window.addEventListener('orientationchange', () => setTimeout(resize, 250))

  // Performance governor: step down resolution if sustained frame time is poor.
  let frameAccum = 0
  let frameCount = 0
  let governorApplied = false
  let qualityChecks = 0
  function governor(dt) {
    if (debugMode) return
    if (governorApplied || game.state === 'menu') return
    frameAccum += dt
    frameCount++
    if (frameAccum > 2.6) {
      const avg = frameAccum / frameCount
      qualityChecks++
      if (avg > 0.028 && qualityChecks >= 1) {
        const old = renderer.getPixelRatio()
        if (old > 1.0) {
          renderer.setPixelRatio(Math.max(1.0, old - 0.2))
          composer.setPixelRatio(renderer.getPixelRatio())
          composer.setSize(window.innerWidth, window.innerHeight)
        } else {
          bloom.strength *= 0.8
          governorApplied = true
        }
      }
      if (avg > 0.034 && qualityChecks >= 2) {
        bloom.enabled = false
        governorApplied = true
      }
      frameAccum = 0
      frameCount = 0
    }
  }

  let last = performance.now()
  let elapsed = 0
  renderer.setAnimationLoop((now) => {
    const dt = Math.min(0.05, Math.max(0.0001, (now - last) / 1000))
    last = now
    elapsed += dt
    game.update(dt, elapsed)
    cinematic.uniforms.uTime.value = elapsed
    composer.render()
    governor(dt)
  })

  const bootEl = document.getElementById('boot')
  requestAnimationFrame(() => {
    setTimeout(() => bootEl.classList.add('done'), 260)
  })
  window.__HELIX_READY__ = true
  console.info('HELIX // LAST STAND ready')
}

boot().catch((error) => {
  console.error(error)
  const bootEl = document.getElementById('boot')
  if (bootEl) {
    bootEl.innerHTML = '<div class="boot-copy" style="max-width:520px;text-align:center;line-height:1.8;">DEFENSE GRID FAILED TO INITIALIZE<br><span style="color:#ff5770">' + String(error.message || error) + '</span></div>'
  }
})
