import * as THREE from 'three'

export const TAU = Math.PI * 2
export const clamp = (v, min, max) => Math.max(min, Math.min(max, v))
export const lerp = (a, b, t) => a + (b - a) * t
export const rand = (min = 0, max = 1) => min + Math.random() * (max - min)
export const randInt = (min, max) => Math.floor(rand(min, max + 1))
export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
export const damp = (a, b, lambda, dt) => lerp(a, b, 1 - Math.exp(-lambda * dt))
export const smoothstep = (edge0, edge1, x) => {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}
export const formatScore = (n) => Math.max(0, Math.floor(n)).toString().padStart(6, '0')
export const pad2 = (n) => String(n).padStart(2, '0')
export const angleLerp = (a, b, t) => {
  let d = ((b - a + Math.PI) % TAU) - Math.PI
  if (d < -Math.PI) d += TAU
  return a + d * t
}

export function canvasTexture(width, height, draw, { repeat = [1, 1], srgb = true, anisotropy = 4 } = {}) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  draw(ctx, width, height)
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(repeat[0], repeat[1])
  if (srgb) texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = anisotropy
  texture.needsUpdate = true
  return texture
}

// Turns a grayscale height drawing into a tangent-space normal map. The height
// canvas wraps at the edges so the resulting texture tiles with the color map.
export function normalMapFromHeight(width, height, draw, { repeat = [1, 1], anisotropy = 4, strength = 2.4 } = {}) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  draw(ctx, width, height)
  const src = ctx.getImageData(0, 0, width, height).data
  const out = ctx.createImageData(width, height)
  const heightAt = (x, y) => {
    x = (x + width) % width
    y = (y + height) % height
    const i = (y * width + x) * 4
    return (src[i] * 0.299 + src[i + 1] * 0.587 + src[i + 2] * 0.114) / 255
  }
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const dx = (heightAt(x + 1, y) - heightAt(x - 1, y)) * strength
      const dy = (heightAt(x, y + 1) - heightAt(x, y - 1)) * strength
      const nx = -dx
      const ny = -dy
      const inv = 1 / Math.hypot(nx, ny, 1)
      const i = (y * width + x) * 4
      out.data[i] = (nx * inv * 0.5 + 0.5) * 255
      out.data[i + 1] = (ny * inv * 0.5 + 0.5) * 255
      out.data[i + 2] = (inv * 0.5 + 0.5) * 255
      out.data[i + 3] = 255
    }
  }
  ctx.putImageData(out, 0, 0)
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(repeat[0], repeat[1])
  texture.anisotropy = anisotropy
  texture.needsUpdate = true
  return texture
}

export function noise(ctx, w, h, count, alpha = 0.08, light = true) {
  for (let i = 0; i < count; i++) {
    const v = Math.floor(rand(0, 255))
    ctx.fillStyle = light
      ? `rgba(${v},${v},${v},${rand(alpha * 0.25, alpha)})`
      : `rgba(0,0,0,${rand(alpha * 0.25, alpha)})`
    const s = rand(0.5, 2.5)
    ctx.fillRect(rand(0, w), rand(0, h), s, s)
  }
}

export function roundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
}

export function makeGlowTexture(size = 128, stops) {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  const grad = stops || [[0, 'rgba(255,255,255,1)'], [0.15, 'rgba(255,255,255,0.85)'], [0.42, 'rgba(255,255,255,0.28)'], [1, 'rgba(255,255,255,0)']]
  for (const [offset, color] of grad) g.addColorStop(offset, color)
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

export function makeRingTexture(size = 128) {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, size, size)
  ctx.strokeStyle = 'rgba(255,255,255,1)'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.arc(size / 2, size / 2, size * 0.39, 0, TAU)
  ctx.stroke()
  ctx.globalAlpha = 0.35
  ctx.lineWidth = 8
  ctx.beginPath()
  ctx.arc(size / 2, size / 2, size * 0.42, 0, TAU)
  ctx.stroke()
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

export function makeSprite(text, { color = '#ffffff', font = '700 42px Orbitron, sans-serif', padding = 20, glow = 16 } = {}) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  ctx.font = font
  const m = ctx.measureText(text)
  canvas.width = Math.ceil(m.width + padding * 2)
  canvas.height = Math.ceil(64 + padding)
  const c = canvas.getContext('2d')
  c.font = font
  c.textAlign = 'center'
  c.textBaseline = 'middle'
  c.shadowColor = color
  c.shadowBlur = glow
  c.fillStyle = color
  c.fillText(text, canvas.width / 2, canvas.height / 2)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

export function segmentBoxIntersection(start, end, box) {
  const dir = new THREE.Vector3().subVectors(end, start)
  let tmin = 0
  let tmax = 1
  for (const axis of ['x', 'y', 'z']) {
    if (Math.abs(dir[axis]) < 1e-8) {
      if (start[axis] < box.min[axis] || start[axis] > box.max[axis]) return false
    } else {
      const inv = 1 / dir[axis]
      let t1 = (box.min[axis] - start[axis]) * inv
      let t2 = (box.max[axis] - start[axis]) * inv
      if (t1 > t2) [t1, t2] = [t2, t1]
      tmin = Math.max(tmin, t1)
      tmax = Math.min(tmax, t2)
      if (tmin > tmax) return false
    }
  }
  return true
}

export function disposeObject(obj) {
  obj.traverse((child) => {
    if (child.geometry) child.geometry.dispose()
    if (child.material) {
      const mats = Array.isArray(child.material) ? child.material : [child.material]
      for (const mat of mats) {
        for (const key of Object.keys(mat)) {
          const value = mat[key]
          if (value && value.isTexture) value.dispose()
        }
        mat.dispose()
      }
    }
  })
}
