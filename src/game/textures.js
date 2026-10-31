import * as THREE from 'three'

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

function mulberry32(seed) {
  let a = seed >>> 0
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function hash2(x, y, seed = 0) {
  let h = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263) + Math.imul(seed | 0, 1442695041)
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296
}

function smooth(t) { return t * t * (3 - 2 * t) }

function valueNoise(x, y, seed = 0) {
  const xi = Math.floor(x), yi = Math.floor(y)
  const xf = x - xi, yf = y - yi
  const a = hash2(xi, yi, seed), b = hash2(xi + 1, yi, seed)
  const c = hash2(xi, yi + 1, seed), d = hash2(xi + 1, yi + 1, seed)
  const u = smooth(xf), v = smooth(yf)
  return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v
}

function fbm(x, y, octaves = 5, seed = 0, lacunarity = 2.02, gain = 0.5) {
  let value = 0, amp = 0.5, freq = 1, norm = 0
  for (let i = 0; i < octaves; i++) {
    value += amp * valueNoise(x * freq, y * freq, seed + i * 17)
    norm += amp
    amp *= gain
    freq *= lacunarity
  }
  return value / norm
}

function canvas(size = 256) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  return c
}

function pixelCanvas(size, fn) {
  const c = canvas(size)
  const ctx = c.getContext('2d', { willReadFrequently: true })
  const img = ctx.createImageData(size, size)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4
      const out = fn(x, y, x / size, y / size)
      img.data[i] = out[0]
      img.data[i + 1] = out[1]
      img.data[i + 2] = out[2]
      img.data[i + 3] = out[3] ?? 255
    }
  }
  ctx.putImageData(img, 0, 0)
  return c
}

function toTexture(c, { srgb = true, repeat = [1, 1], anisotropy = 4 } = {}) {
  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.repeat.set(repeat[0], repeat[1])
  t.anisotropy = anisotropy
  t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace
  t.needsUpdate = true
  return t
}

export function cloneTexture(tex, rx = 1, ry = 1) {
  const t = tex.clone()
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.repeat.set(rx, ry)
  t.needsUpdate = true
  return t
}

function normalFromHeight(heightCanvas, strength = 2.2) {
  const size = heightCanvas.width
  const src = heightCanvas.getContext('2d', { willReadFrequently: true }).getImageData(0, 0, size, size).data
  const out = canvas(size)
  const ctx = out.getContext('2d')
  const img = ctx.createImageData(size, size)
  const at = (x, y) => src[((y + size) % size * size + (x + size) % size) * 4] / 255
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = (at(x + 1, y) - at(x - 1, y)) * strength
      const dy = (at(x, y + 1) - at(x, y - 1)) * strength
      const len = Math.hypot(dx, dy, 1)
      const i = (y * size + x) * 4
      img.data[i] = ((dx / len) * 0.5 + 0.5) * 255
      img.data[i + 1] = ((dy / len) * 0.5 + 0.5) * 255
      img.data[i + 2] = ((1 / len) * 0.5 + 0.5) * 255
      img.data[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  return out
}

function roughFromHeight(heightCanvas, low = 0.28, high = 0.88) {
  const size = heightCanvas.width
  const src = heightCanvas.getContext('2d', { willReadFrequently: true }).getImageData(0, 0, size, size).data
  return pixelCanvas(size, (x, y) => {
    const i = (y * size + x) * 4
    const v = src[i] / 255
    const g = clamp((low + (1 - v) * (high - low)) * 255, 0, 255)
    return [g, g, g, 255]
  })
}

function speckle(ctx, size, count, color, rng, maxR = 1.3, alpha = 0.3) {
  for (let i = 0; i < count; i++) {
    ctx.fillStyle = color
    ctx.globalAlpha = alpha * (0.25 + rng())
    const r = 0.25 + rng() * maxR
    ctx.beginPath()
    ctx.arc(rng() * size, rng() * size, r, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalAlpha = 1
}

export function makeStoneTextures(seed = 4, size = 512) {
  const rng = mulberry32(seed)
  const height = pixelCanvas(size, (x, y, u, v) => {
    let n = fbm(u * 7, v * 7, 5, seed) * 0.7 + fbm(u * 31, v * 31, 3, seed + 8) * 0.3
    const crack = Math.abs(fbm(u * 5 + 2.4, v * 5 - 1.1, 4, seed + 31) - 0.5)
    n -= Math.pow(clamp(1 - crack * 9, 0, 1), 3) * 0.32
    const edgeX = Math.min(u, 1 - u), edgeY = Math.min(v, 1 - v)
    const edge = Math.min(edgeX, edgeY)
    n += clamp(edge * 30, 0, 0.1)
    const g = clamp(n * 255, 0, 255)
    return [g, g, g, 255]
  })
  const color = canvas(size)
  const ctx = color.getContext('2d')
  const src = height.getContext('2d', { willReadFrequently: true }).getImageData(0, 0, size, size).data
  const img = ctx.createImageData(size, size)
  for (let i = 0; i < size * size; i++) {
    const n = src[i * 4] / 255
    const moss = clamp((fbm((i % size) / 40, Math.floor(i / size) / 40, 3, seed + 91) - 0.58) * 5, 0, 1)
    const base = 0.18 + n * 0.26
    img.data[i * 4] = (base * 0.82 + moss * 0.05) * 255
    img.data[i * 4 + 1] = (base * 0.95 + moss * 0.14) * 255
    img.data[i * 4 + 2] = (base * 1.08 + moss * 0.05) * 255
    img.data[i * 4 + 3] = 255
  }
  ctx.putImageData(img, 0, 0)
  // large slate seams
  ctx.strokeStyle = 'rgba(4, 8, 9, .8)'
  ctx.lineWidth = 3
  for (let i = 1; i < 4; i++) {
    ctx.beginPath()
    ctx.moveTo((i * size) / 4 + (rng() - 0.5) * 8, 0)
    ctx.lineTo((i * size) / 4 + (rng() - 0.5) * 18, size)
    ctx.stroke()
  }
  for (let i = 1; i < 4; i++) {
    ctx.beginPath()
    ctx.moveTo(0, (i * size) / 4 + (rng() - 0.5) * 8)
    ctx.lineTo(size, (i * size) / 4 + (rng() - 0.5) * 18)
    ctx.stroke()
  }
  // cracks
  ctx.strokeStyle = 'rgba(2, 4, 5, .55)'
  for (let k = 0; k < 18; k++) {
    ctx.lineWidth = 0.5 + rng() * 1.5
    let x = rng() * size, y = rng() * size
    ctx.beginPath(); ctx.moveTo(x, y)
    const steps = 4 + (rng() * 6 | 0)
    for (let s = 0; s < steps; s++) {
      x += (rng() - 0.5) * 34; y += (rng() - 0.5) * 34
      ctx.lineTo(x, y)
    }
    ctx.stroke()
  }
  speckle(ctx, size, 1200, '#b9c1bd', rng, 0.8, 0.11)
  return {
    map: toTexture(color, { repeat: [1, 1], anisotropy: 8 }),
    normalMap: toTexture(normalFromHeight(height, 2.7), { srgb: false, repeat: [1, 1], anisotropy: 8 }),
    roughnessMap: toTexture(roughFromHeight(height, 0.35, 0.95), { srgb: false, repeat: [1, 1], anisotropy: 8 }),
  }
}

export function makeMetalTextures(base = '#7d7568', seed = 12, size = 256) {
  const rng = mulberry32(seed)
  const color = canvas(size)
  const ctx = color.getContext('2d')
  const bg = new THREE.Color(base)
  ctx.fillStyle = `#${bg.getHexString()}`
  ctx.fillRect(0, 0, size, size)
  // brushed streaks
  for (let i = 0; i < 2400; i++) {
    const y = rng() * size
    const x = rng() * size
    const w = 4 + rng() * 60
    ctx.strokeStyle = rng() > 0.5 ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.13)'
    ctx.lineWidth = 0.4 + rng() * 1.2
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y + (rng() - 0.5) * 1.5); ctx.stroke()
  }
  // scratches and dents
  for (let i = 0; i < 34; i++) {
    ctx.strokeStyle = `rgba(230,218,190,${0.08 + rng() * 0.2})`
    ctx.lineWidth = 0.5 + rng()
    const x = rng() * size, y = rng() * size
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + (rng() - 0.5) * 38, y + (rng() - 0.5) * 18); ctx.stroke()
  }
  speckle(ctx, size, 360, '#0c0b09', rng, 1.4, 0.18)
  const height = pixelCanvas(size, (x, y, u, v) => {
    const n = fbm(u * 18, v * 80, 3, seed + 5)
    const g = clamp(110 + n * 100, 0, 255)
    return [g, g, g, 255]
  })
  return {
    map: toTexture(color, { anisotropy: 8 }),
    normalMap: toTexture(normalFromHeight(height, 1.2), { srgb: false, anisotropy: 8 }),
    roughnessMap: toTexture(roughFromHeight(height, 0.22, 0.6), { srgb: false, anisotropy: 8 }),
  }
}

export function makeLeatherTextures(base = '#3b2421', seed = 20, size = 256) {
  const rng = mulberry32(seed)
  const color = canvas(size)
  const ctx = color.getContext('2d')
  const bg = new THREE.Color(base)
  ctx.fillStyle = `#${bg.getHexString()}`
  ctx.fillRect(0, 0, size, size)
  const img = ctx.getImageData(0, 0, size, size)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4
      const n = fbm(x / 28, y / 28, 4, seed) * 0.6 + fbm(x / 4, y / 4, 2, seed + 3) * 0.4
      const shade = 0.72 + n * 0.5
      img.data[i] *= shade; img.data[i + 1] *= shade; img.data[i + 2] *= shade
    }
  }
  ctx.putImageData(img, 0, 0)
  // creases
  for (let i = 0; i < 30; i++) {
    ctx.strokeStyle = `rgba(0,0,0,${0.12 + rng() * 0.18})`
    ctx.lineWidth = 0.6 + rng() * 1.3
    let x = rng() * size, y = rng() * size
    ctx.beginPath(); ctx.moveTo(x, y)
    for (let s = 0; s < 3; s++) { x += (rng() - 0.5) * 30; y += (rng() - 0.5) * 16; ctx.lineTo(x, y) }
    ctx.stroke()
  }
  speckle(ctx, size, 900, '#1a0c0a', rng, 1.2, 0.2)
  const height = pixelCanvas(size, (x, y) => {
    const n = fbm(x / 9, y / 9, 4, seed + 15) * 0.75 + fbm(x / 2.2, y / 2.2, 2, seed + 2) * 0.25
    const g = clamp(70 + n * 160, 0, 255)
    return [g, g, g, 255]
  })
  return {
    map: toTexture(color, { anisotropy: 4 }),
    normalMap: toTexture(normalFromHeight(height, 1.6), { srgb: false, anisotropy: 4 }),
    roughnessMap: toTexture(roughFromHeight(height, 0.42, 0.92), { srgb: false, anisotropy: 4 }),
  }
}

export function makeClothTextures(base = '#1a1718', seed = 30, size = 256) {
  const rng = mulberry32(seed)
  const bg = new THREE.Color(base)
  const height = pixelCanvas(size, (x, y) => {
    const weave = (Math.sin(x * Math.PI * 0.9) + Math.sin(y * Math.PI * 0.9)) * 0.08
    const n = fbm(x / 22, y / 22, 4, seed) * 0.55 + weave + 0.25
    const g = clamp(n * 255, 0, 255)
    return [g, g, g, 255]
  })
  const color = canvas(size)
  const ctx = color.getContext('2d')
  ctx.fillStyle = `#${bg.getHexString()}`
  ctx.fillRect(0, 0, size, size)
  const img = ctx.getImageData(0, 0, size, size)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4
      const weave = (Math.sin(x * 1.7) + Math.sin(y * 1.7)) * 0.035
      const n = fbm(x / 30, y / 30, 3, seed + 4)
      const shade = 0.78 + weave + n * 0.35
      img.data[i] *= shade; img.data[i + 1] *= shade; img.data[i + 2] *= shade
    }
  }
  ctx.putImageData(img, 0, 0)
  // gold-ish dust / wear
  speckle(ctx, size, 400, '#c9a76a', rng, 0.7, 0.07)
  return {
    map: toTexture(color, { anisotropy: 4 }),
    normalMap: toTexture(normalFromHeight(height, 0.9), { srgb: false, anisotropy: 4 }),
    roughnessMap: toTexture(roughFromHeight(height, 0.6, 0.98), { srgb: false, anisotropy: 4 }),
  }
}

export function makeSkinTextures(base = '#a56f58', seed = 40, size = 256) {
  const rng = mulberry32(seed)
  const bg = new THREE.Color(base)
  const color = canvas(size)
  const ctx = color.getContext('2d')
  ctx.fillStyle = `#${bg.getHexString()}`
  ctx.fillRect(0, 0, size, size)
  const img = ctx.getImageData(0, 0, size, size)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4
      const n = fbm(x / 32, y / 32, 4, seed) * 0.55 + fbm(x / 6, y / 6, 2, seed + 1) * 0.45
      const shade = 0.82 + n * 0.32
      img.data[i] *= shade; img.data[i + 1] *= shade * (0.97 + n * 0.05); img.data[i + 2] *= shade
    }
  }
  ctx.putImageData(img, 0, 0)
  // pores / freckles / faint scarring
  speckle(ctx, size, 1100, '#4a221a', rng, 0.55, 0.13)
  for (let i = 0; i < 14; i++) {
    ctx.strokeStyle = `rgba(112,51,42,${0.12 + rng() * 0.15})`
    ctx.lineWidth = 0.5 + rng() * 0.8
    const x = rng() * size, y = rng() * size
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 8 + rng() * 20, y + (rng() - 0.5) * 5); ctx.stroke()
  }
  const height = pixelCanvas(size, (x, y) => {
    const n = fbm(x / 5, y / 5, 3, seed + 8) * 0.5 + fbm(x / 30, y / 30, 3, seed + 2) * 0.5
    const g = clamp(100 + n * 100, 0, 255)
    return [g, g, g, 255]
  })
  return {
    map: toTexture(color, { anisotropy: 4 }),
    normalMap: toTexture(normalFromHeight(height, 0.75), { srgb: false, anisotropy: 4 }),
    roughnessMap: toTexture(roughFromHeight(height, 0.36, 0.7), { srgb: false, anisotropy: 4 }),
  }
}

export function makeBannerTexture(emblem = 'A', primary = '#7c1220', accent = '#d6b06a', size = 256) {
  const c = canvas(size)
  const ctx = c.getContext('2d')
  const g = ctx.createLinearGradient(0, 0, 0, size)
  g.addColorStop(0, primary); g.addColorStop(0.5, '#3a0a0f'); g.addColorStop(1, primary)
  ctx.fillStyle = g; ctx.fillRect(0, 0, size, size)
  // woven texture
  for (let i = 0; i < size; i += 3) {
    ctx.fillStyle = i % 6 === 0 ? 'rgba(255,255,255,.025)' : 'rgba(0,0,0,.035)'
    ctx.fillRect(0, i, size, 1)
    ctx.fillRect(i, 0, 1, size)
  }
  // border
  ctx.strokeStyle = accent
  ctx.lineWidth = 4
  ctx.strokeRect(12, 12, size - 24, size - 24)
  ctx.lineWidth = 1
  ctx.strokeRect(22, 22, size - 44, size - 44)
  // emblem
  ctx.save()
  ctx.translate(size / 2, size / 2)
  ctx.rotate(Math.PI / 4)
  ctx.strokeStyle = accent
  ctx.lineWidth = 5
  ctx.strokeRect(-48, -48, 96, 96)
  ctx.lineWidth = 1
  ctx.strokeRect(-60, -60, 120, 120)
  ctx.restore()
  ctx.fillStyle = accent
  ctx.font = `700 ${size * 0.3}px Cinzel, serif`
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText(emblem, size / 2, size / 2 + 2)
  // tattered edges
  ctx.globalCompositeOperation = 'destination-out'
  const rng = mulberry32(88)
  for (let i = 0; i < 90; i++) {
    const x = rng() * size
    ctx.beginPath(); ctx.arc(x, size - 2 - rng() * 10, 2 + rng() * 8, 0, Math.PI * 2); ctx.fill()
  }
  ctx.globalCompositeOperation = 'source-over'
  return toTexture(c, { anisotropy: 4 })
}

export function makeGlowTexture(size = 128, inner = 'rgba(255,255,255,1)', mid = 'rgba(255,140,50,.45)') {
  const c = canvas(size)
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, inner)
  g.addColorStop(0.18, mid)
  g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  return toTexture(c, { anisotropy: 1 })
}

export function makeFlameTexture(size = 128) {
  const c = canvas(size)
  const ctx = c.getContext('2d')
  const rng = mulberry32(3)
  for (let i = 0; i < 26; i++) {
    const x = size / 2 + (rng() - 0.5) * size * 0.36
    const y = size * 0.66 + (rng() - 0.5) * size * 0.18
    const r = size * (0.16 + rng() * 0.3)
    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    const hue = 20 + rng() * 30
    g.addColorStop(0, `hsla(${hue}, 100%, 76%, .7)`)
    g.addColorStop(0.35, `hsla(${hue - 8}, 100%, 55%, .36)`)
    g.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = g
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill()
  }
  return toTexture(c, { anisotropy: 1 })
}

export function makeSparkTexture(size = 64) {
  const c = canvas(size)
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, 'rgba(255,255,235,1)')
  g.addColorStop(0.12, 'rgba(255,210,130,.95)')
  g.addColorStop(0.4, 'rgba(255,90,30,.45)')
  g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g; ctx.fillRect(0, 0, size, size)
  return toTexture(c, { anisotropy: 1 })
}

export function makeSmokeTexture(size = 128) {
  const c = canvas(size)
  const ctx = c.getContext('2d')
  const img = ctx.createImageData(size, size)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = (x - size / 2) / (size / 2), dy = (y - size / 2) / (size / 2)
      const r = Math.hypot(dx, dy)
      const n = fbm(x / 18, y / 18, 4, 5)
      const a = clamp((1 - r) * 1.5, 0, 1) * clamp((n - 0.25) * 2.4, 0, 1)
      const i = (y * size + x) * 4
      img.data[i] = 180; img.data[i + 1] = 175; img.data[i + 2] = 165; img.data[i + 3] = a * 255
    }
  }
  ctx.putImageData(img, 0, 0)
  return toTexture(c, { anisotropy: 1 })
}

export function makeMountainTexture(width = 1024, height = 512, seed = 7) {
  const c = document.createElement('canvas')
  c.width = width; c.height = height
  const ctx = c.getContext('2d')
  const layers = [
    { y: 0.66, color: '#0a1013', amp: 0.16, freq: 1.4 },
    { y: 0.78, color: '#0c1417', amp: 0.12, freq: 2.3 },
    { y: 0.9, color: '#0e181b', amp: 0.08, freq: 4.1 },
  ]
  layers.forEach((layer, li) => {
    ctx.beginPath()
    ctx.moveTo(0, height)
    for (let x = 0; x <= width; x += 4) {
      const u = x / width
      const n = fbm(u * layer.freq * 6 + li * 4, li * 5, 4, seed + li * 9)
      const y = height * layer.y - n * height * layer.amp
      ctx.lineTo(x, y)
    }
    ctx.lineTo(width, height)
    ctx.closePath()
    ctx.fillStyle = layer.color
    ctx.fill()
  })
  const t = toTexture(c, { anisotropy: 4 })
  return t
}

export function makeStarTexture(size = 64) {
  const c = canvas(size)
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.3, 'rgba(190,225,255,.4)')
  g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g; ctx.fillRect(0, 0, size, size)
  return toTexture(c, { anisotropy: 1 })
}

export function makeNoiseTexture(size = 128) {
  const c = pixelCanvas(size, (x, y) => {
    const n = fbm(x / 12, y / 12, 4, 22) * 255
    return [n, n, n, 255]
  })
  return toTexture(c, { srgb: false, anisotropy: 1 })
}
