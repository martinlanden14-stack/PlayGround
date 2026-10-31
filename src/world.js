import * as THREE from 'three'
import { TAU, canvasTexture, normalMapFromHeight, noise, rand, randInt, makeGlowTexture, clamp } from './utils.js'

function createFloorTexture(aniso) {
  return canvasTexture(1024, 1024, (ctx, w, h) => {
    ctx.fillStyle = '#26313d'
    ctx.fillRect(0, 0, w, h)
    const tile = 128
    for (let y = 0; y < h; y += tile) {
      for (let x = 0; x < w; x += tile) {
        const shade = randInt(58, 82)
        ctx.fillStyle = `rgb(${shade},${shade + 5},${shade + 10})`
        ctx.fillRect(x + 2, y + 2, tile - 4, tile - 4)
        ctx.strokeStyle = 'rgba(2,5,9,0.9)'
        ctx.lineWidth = 3
        ctx.strokeRect(x + 2, y + 2, tile - 4, tile - 4)
        ctx.strokeStyle = `rgba(${shade + 22},${shade + 31},${shade + 40},0.22)`
        ctx.lineWidth = 1
        ctx.strokeRect(x + 10, y + 10, tile - 20, tile - 20)
        // Recessed bolts
        ctx.fillStyle = 'rgba(2,4,7,0.7)'
        for (const [bx, by] of [[14, 14], [tile - 18, 14], [14, tile - 18], [tile - 18, tile - 18]]) {
          ctx.beginPath()
          ctx.arc(x + bx, y + by, 2.4, 0, TAU)
          ctx.fill()
        }
        // Wear streak
        if (Math.random() < 0.25) {
          const g = ctx.createLinearGradient(x, y, x + tile, y + tile)
          g.addColorStop(0, 'rgba(0,0,0,0)')
          g.addColorStop(0.5, 'rgba(0,0,0,0.13)')
          g.addColorStop(1, 'rgba(0,0,0,0)')
          ctx.fillStyle = g
          ctx.fillRect(x + 8, y + 8, tile - 16, tile - 16)
        }
      }
    }
    // Technical floor markings
    ctx.save()
    ctx.strokeStyle = 'rgba(72,195,211,0.17)'
    ctx.lineWidth = 3
    ctx.setLineDash([26, 18])
    ctx.strokeRect(64, 64, w - 128, h - 128)
    ctx.setLineDash([])
    ctx.strokeStyle = 'rgba(234,164,74,0.12)'
    ctx.lineWidth = 8
    ctx.beginPath()
    ctx.arc(w / 2, h / 2, 335, 0, TAU)
    ctx.stroke()
    ctx.lineWidth = 1
    ctx.strokeStyle = 'rgba(96,216,232,0.13)'
    ctx.beginPath()
    ctx.arc(w / 2, h / 2, 390, 0, TAU)
    ctx.stroke()
    ctx.restore()
    // Grime
    for (let i = 0; i < 160; i++) {
      ctx.fillStyle = `rgba(0,0,0,${rand(0.02, 0.1)})`
      ctx.beginPath()
      ctx.ellipse(rand(0, w), rand(0, h), rand(5, 55), rand(2, 18), rand(0, TAU), 0, TAU)
      ctx.fill()
    }
    noise(ctx, w, h, 9000, 0.11, true)
    noise(ctx, w, h, 5000, 0.12, false)
  }, { repeat: [7, 7], anisotropy: aniso })
}

function createMetalTexture(aniso) {
  return canvasTexture(512, 512, (ctx, w, h) => {
    ctx.fillStyle = '#394653'
    ctx.fillRect(0, 0, w, h)
    for (let y = 0; y < h; y += 64) {
      for (let x = 0; x < w; x += 128) {
        const s = randInt(45, 66)
        ctx.fillStyle = `rgb(${s},${s + 5},${s + 9})`
        ctx.fillRect(x + 1, y + 1, 126, 62)
        ctx.strokeStyle = 'rgba(0,0,0,0.45)'
        ctx.strokeRect(x + 1, y + 1, 126, 62)
      }
    }
    for (let i = 0; i < 250; i++) {
      ctx.fillStyle = `rgba(${randInt(60, 120)},${randInt(70, 130)},${randInt(80, 140)},${rand(0.02, 0.09)})`
      ctx.fillRect(rand(0, w), rand(0, h), rand(4, 60), rand(1, 3))
    }
    // rust / leaks
    for (let i = 0; i < 18; i++) {
      const x = rand(0, w)
      const y = rand(0, h * 0.5)
      const g = ctx.createLinearGradient(x, y, x, y + rand(30, 120))
      g.addColorStop(0, 'rgba(74,49,30,0.22)')
      g.addColorStop(1, 'rgba(20,13,8,0)')
      ctx.fillStyle = g
      ctx.fillRect(x, y, rand(1, 5), rand(30, 130))
    }
    noise(ctx, w, h, 6000, 0.18, true)
    noise(ctx, w, h, 3000, 0.2, false)
  }, { repeat: [2, 2], anisotropy: aniso })
}

function createWallTexture(aniso) {
  return canvasTexture(1024, 512, (ctx, w, h) => {
    ctx.fillStyle = '#36424f'
    ctx.fillRect(0, 0, w, h)
    for (let y = 0; y < h; y += 128) {
      for (let x = 0; x < w; x += 128) {
        const s = randInt(64, 92)
        ctx.fillStyle = `rgb(${s},${s + 5},${s + 11})`
        ctx.fillRect(x + 2, y + 2, 124, 124)
        ctx.strokeStyle = 'rgba(0,0,0,0.6)'
        ctx.lineWidth = 2
        ctx.strokeRect(x + 2, y + 2, 124, 124)
        ctx.strokeStyle = 'rgba(78,116,132,0.13)'
        ctx.lineWidth = 1
        ctx.strokeRect(x + 11, y + 11, 106, 106)
        // vents
        if (Math.random() < 0.22) {
          ctx.strokeStyle = 'rgba(0,0,0,0.45)'
          for (let i = 0; i < 5; i++) {
            ctx.beginPath()
            ctx.moveTo(x + 35, y + 45 + i * 8)
            ctx.lineTo(x + 92, y + 45 + i * 8)
            ctx.stroke()
          }
        }
      }
    }
    // Structural seams
    ctx.fillStyle = 'rgba(0,0,0,0.58)'
    ctx.fillRect(0, 250, w, 8)
    ctx.fillRect(502, 0, 6, h)
    ctx.fillStyle = 'rgba(93,170,181,0.16)'
    ctx.fillRect(0, 248, w, 2)
    // warning marks
    ctx.save()
    ctx.globalAlpha = 0.28
    ctx.fillStyle = '#d78b30'
    for (let i = 0; i < 6; i++) {
      ctx.beginPath()
      ctx.moveTo(660 + i * 46, 470)
      ctx.lineTo(680 + i * 46, 470)
      ctx.lineTo(646 + i * 46, 512)
      ctx.lineTo(626 + i * 46, 512)
      ctx.closePath()
      ctx.fill()
    }
    ctx.restore()

    // Recessed light channels and glowing service panels
    const channels = [86, 352, 742, 948]
    for (const cx of channels) {
      ctx.save()
      const g = ctx.createLinearGradient(cx - 4, 0, cx + 4, 0)
      g.addColorStop(0, 'rgba(27,118,139,0.05)')
      g.addColorStop(0.5, 'rgba(80,236,255,0.9)')
      g.addColorStop(1, 'rgba(27,118,139,0.05)')
      ctx.fillStyle = g
      ctx.fillRect(cx - 4, 38, 8, 402)
      ctx.globalAlpha = 0.32
      ctx.fillStyle = '#aefaff'
      ctx.fillRect(cx - 1, 38, 2, 402)
      ctx.restore()
    }
    for (let i = 0; i < 3; i++) {
      const x = 150 + i * 290
      const y = 42 + (i % 2) * 260
      ctx.save()
      const g = ctx.createLinearGradient(x, y, x + 120, y + 70)
      g.addColorStop(0, 'rgba(27,84,102,0.2)')
      g.addColorStop(1, 'rgba(5,13,20,0.12)')
      ctx.fillStyle = g
      ctx.fillRect(x, y, 130, 74)
      ctx.strokeStyle = 'rgba(100,225,242,0.42)'
      ctx.lineWidth = 2
      ctx.strokeRect(x, y, 130, 74)
      ctx.fillStyle = 'rgba(106,238,250,0.6)'
      for (let b = 0; b < 5; b++) ctx.fillRect(x + 14 + b * 21, y + 54, 13, 3)
      ctx.fillStyle = 'rgba(255,150,65,0.4)'
      ctx.fillRect(x + 14, y + 14, 56, 2)
      ctx.restore()
    }
    // top light rail and base lighting
    ctx.fillStyle = 'rgba(91,236,253,0.7)'
    ctx.fillRect(0, 4, w, 5)
    ctx.fillStyle = 'rgba(255,147,58,0.28)'
    ctx.fillRect(0, 490, w, 4)
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = `rgba(0,0,0,${rand(0.03, 0.13)})`
      ctx.fillRect(rand(0, w), rand(0, h), rand(2, 92), rand(1, 4))
    }
    noise(ctx, w, h, 7000, 0.13, true)
    noise(ctx, w, h, 5000, 0.13, false)
  }, { repeat: [4, 1], anisotropy: aniso })
}

function createFloorNormal(aniso) {
  return normalMapFromHeight(512, 512, (ctx, w, h) => {
    ctx.fillStyle = '#1a1a1a'
    ctx.fillRect(0, 0, w, h)
    const tile = 64
    for (let y = 0; y < h; y += tile) {
      for (let x = 0; x < w; x += tile) {
        const base = randInt(124, 146)
        ctx.fillStyle = `rgb(${base},${base},${base})`
        ctx.fillRect(x + 1, y + 1, tile - 2, tile - 2)
        ctx.fillStyle = `rgb(${base + 28},${base + 28},${base + 28})`
        ctx.fillRect(x + 1, y + 1, tile - 2, 2)
        ctx.fillRect(x + 1, y + 1, 2, tile - 2)
        ctx.fillStyle = `rgb(${Math.max(8, base - 90)},${Math.max(8, base - 90)},${Math.max(8, base - 90)})`
        ctx.fillRect(x + 1, y + tile - 3, tile - 2, 2)
        ctx.fillRect(x + tile - 3, y + 1, 2, tile - 2)
        // Recessed bolt heads.
        for (const [bx, by] of [[7, 7], [tile - 7, 7], [7, tile - 7], [tile - 7, tile - 7]]) {
          const g = ctx.createRadialGradient(x + bx - 2, y + by - 2, 0, x + bx, y + by, 5)
          g.addColorStop(0, '#d8d8d8')
          g.addColorStop(0.7, '#8a8a8a')
          g.addColorStop(1, '#3a3a3a')
          ctx.fillStyle = g
          ctx.beginPath()
          ctx.arc(x + bx, y + by, 3.4, 0, TAU)
          ctx.fill()
        }
        // Scuffs and shallow dents.
        if (Math.random() < 0.3) {
          ctx.fillStyle = `rgba(${randInt(70, 110)},${randInt(70, 110)},${randInt(70, 110)},0.4)`
          ctx.beginPath()
          ctx.ellipse(x + rand(12, tile - 12), y + rand(12, tile - 12), rand(3, 14), rand(2, 6), rand(0, TAU), 0, TAU)
          ctx.fill()
        }
      }
    }
    // Painted guide grooves sunk into the deck.
    ctx.strokeStyle = '#4e4e4e'
    ctx.lineWidth = 5
    ctx.setLineDash([13, 9])
    ctx.strokeRect(32, 32, w - 64, h - 64)
    ctx.setLineDash([])
    ctx.strokeStyle = '#585858'
    ctx.lineWidth = 7
    ctx.beginPath()
    ctx.arc(w / 2, h / 2, 168, 0, TAU)
    ctx.stroke()
    noise(ctx, w, h, 6000, 0.1, true)
    noise(ctx, w, h, 3000, 0.1, false)
  }, { repeat: [7, 7], anisotropy: aniso, strength: 2.9 })
}

function createWallNormal(aniso) {
  return normalMapFromHeight(1024, 512, (ctx, w, h) => {
    ctx.fillStyle = '#1c1c1c'
    ctx.fillRect(0, 0, w, h)
    const tile = 128
    for (let y = 0; y < h; y += tile) {
      for (let x = 0; x < w; x += tile) {
        const base = randInt(126, 148)
        ctx.fillStyle = `rgb(${base},${base},${base})`
        ctx.fillRect(x + 2, y + 2, tile - 4, tile - 4)
        // Bevel: raised top/left lip, sunken bottom/right shadow.
        ctx.fillStyle = `rgb(${base + 30},${base + 30},${base + 30})`
        ctx.fillRect(x + 2, y + 2, tile - 4, 3)
        ctx.fillRect(x + 2, y + 2, 3, tile - 4)
        ctx.fillStyle = `rgb(${Math.max(8, base - 92)},${Math.max(8, base - 92)},${Math.max(8, base - 92)})`
        ctx.fillRect(x + 2, y + tile - 5, tile - 4, 3)
        ctx.fillRect(x + tile - 5, y + 2, 3, tile - 4)
        // Recessed vent grilles.
        if (Math.random() < 0.24) {
          ctx.fillStyle = '#353535'
          ctx.fillRect(x + 36, y + 38, 62, 52)
          ctx.fillStyle = '#101010'
          for (let i = 0; i < 5; i++) ctx.fillRect(x + 40, y + 44 + i * 9, 52, 4)
        }
      }
    }
    // Deep structural joints match the color map seams.
    ctx.fillStyle = '#0e0e0e'
    ctx.fillRect(0, 248, w, 10)
    ctx.fillRect(500, 0, 10, h)
    // Cable/light channels are recessed behind a lip.
    for (const cx of [86, 352, 742, 948]) {
      ctx.fillStyle = '#141414'
      ctx.fillRect(cx - 7, 36, 14, 406)
      ctx.fillStyle = '#9a9a9a'
      ctx.fillRect(cx - 9, 36, 2, 406)
      ctx.fillRect(cx + 7, 36, 2, 406)
    }
    // Raised crown rail.
    ctx.fillStyle = '#c4c4c4'
    ctx.fillRect(0, 2, w, 7)
    noise(ctx, w, h, 9000, 0.1, true)
    noise(ctx, w, h, 4000, 0.1, false)
  }, { repeat: [4, 1], anisotropy: aniso, strength: 2.6 })
}

function createMetalNormal(aniso) {
  return normalMapFromHeight(512, 512, (ctx, w, h) => {
    ctx.fillStyle = '#202020'
    ctx.fillRect(0, 0, w, h)
    for (let y = 0; y < h; y += 64) {
      for (let x = 0; x < w; x += 128) {
        const base = randInt(128, 150)
        ctx.fillStyle = `rgb(${base},${base},${base})`
        ctx.fillRect(x + 2, y + 2, 124, 60)
        ctx.fillStyle = `rgb(${base + 26},${base + 26},${base + 26})`
        ctx.fillRect(x + 2, y + 2, 124, 2)
        ctx.fillRect(x + 2, y + 2, 2, 60)
        ctx.fillStyle = `rgb(${Math.max(8, base - 86)},${Math.max(8, base - 86)},${Math.max(8, base - 86)})`
        ctx.fillRect(x + 2, y + 60, 124, 2)
        ctx.fillRect(x + 124, y + 2, 2, 60)
      }
    }
    // Stamped louvers and rivet rows break up large metal faces.
    for (let i = 0; i < 26; i++) {
      const x = randInt(8, w - 8)
      const y = randInt(8, h - 8)
      ctx.fillStyle = Math.random() < 0.5 ? '#b8b8b8' : '#5c5c5c'
      ctx.beginPath()
      ctx.arc(x, y, rand(1.5, 2.8), 0, TAU)
      ctx.fill()
    }
    for (let i = 0; i < 90; i++) {
      ctx.fillStyle = `rgba(${randInt(60, 150)},${randInt(60, 150)},${randInt(60, 150)},0.18)`
      ctx.fillRect(rand(0, w), rand(0, h), rand(2, 40), 1)
    }
    noise(ctx, w, h, 5000, 0.1, true)
    noise(ctx, w, h, 2500, 0.1, false)
  }, { repeat: [2, 2], anisotropy: aniso, strength: 2.3 })
}

function createWashTexture() {
  return canvasTexture(64, 256, (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, 0, h)
    g.addColorStop(0, 'rgba(150,240,255,0.72)')
    g.addColorStop(0.18, 'rgba(90,196,230,0.3)')
    g.addColorStop(0.55, 'rgba(34,96,124,0.08)')
    g.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, w, h)
    noise(ctx, w, h, 600, 0.08, true)
  })
}

function createTowerTexture() {
  return canvasTexture(512, 512, (ctx, w, h) => {
    ctx.fillStyle = '#070d14'
    ctx.fillRect(0, 0, w, h)
    ctx.fillStyle = '#0b131d'
    ctx.fillRect(4, 0, w - 8, h)
    // Floor slabs and structural pilasters.
    for (let y = 0; y < h; y += 32) {
      ctx.fillStyle = 'rgba(28,42,56,0.55)'
      ctx.fillRect(0, y, w, 3)
      ctx.fillStyle = 'rgba(0,0,0,0.5)'
      ctx.fillRect(0, y + 3, w, 2)
    }
    for (let x = 0; x < w; x += 64) {
      ctx.fillStyle = 'rgba(5,10,16,0.7)'
      ctx.fillRect(x, 0, 5, h)
      ctx.fillStyle = 'rgba(48,74,92,0.16)'
      ctx.fillRect(x + 5, 0, 2, h)
    }
    // Lit window bands with irregular occupancy.
    for (let y = 10; y < h - 8; y += 32) {
      for (let x = 14; x < w - 12; x += 26) {
        const lit = Math.random()
        if (lit > 0.68) {
          const warm = Math.random() < 0.24
          ctx.fillStyle = warm ? 'rgba(255,176,96,0.95)' : 'rgba(126,224,247,0.92)'
          ctx.fillRect(x, y, 16, 9)
          ctx.globalAlpha = 0.18
          ctx.fillRect(x - 3, y - 2, 22, 13)
          ctx.globalAlpha = 1
        } else {
          ctx.fillStyle = 'rgba(10,18,27,0.95)'
          ctx.fillRect(x, y, 16, 9)
        }
      }
    }
    // Crown and edge lighting.
    const edge = ctx.createLinearGradient(0, 0, 0, h)
    edge.addColorStop(0, 'rgba(110,224,255,0.5)')
    edge.addColorStop(1, 'rgba(28,92,120,0.1)')
    ctx.fillStyle = edge
    ctx.fillRect(4, 0, 2, h)
    ctx.fillRect(w - 6, 0, 2, h)
    ctx.fillStyle = 'rgba(255,160,80,0.28)'
    for (let y = 64; y < h; y += 128) ctx.fillRect(0, y, w, 2)
    noise(ctx, w, h, 900, 0.07, true)
  }, { repeat: [1, 2] })
}

function createSignTexture(title, sub, color = '#47ecff') {
  return canvasTexture(1024, 512, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h)
    const g = ctx.createLinearGradient(0, 0, w, h)
    g.addColorStop(0, 'rgba(4,12,20,0.96)')
    g.addColorStop(0.55, 'rgba(6,17,27,0.96)')
    g.addColorStop(1, 'rgba(3,9,15,0.96)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, w, h)
    ctx.strokeStyle = color
    ctx.globalAlpha = 0.5
    ctx.lineWidth = 3
    ctx.strokeRect(12, 12, w - 24, h - 24)
    ctx.globalAlpha = 0.16
    ctx.lineWidth = 1
    ctx.strokeRect(28, 28, w - 56, h - 56)
    ctx.globalAlpha = 0.24
    ctx.fillStyle = color
    ctx.fillRect(12, 12, 260, 5)
    ctx.fillRect(w - 170, h - 18, 158, 5)
    ctx.globalAlpha = 1
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = '900 126px Orbitron, Arial Black, sans-serif'
    ctx.fillStyle = '#e9fdff'
    ctx.shadowColor = color
    ctx.shadowBlur = 32
    ctx.fillText(title, w / 2, h / 2 - 30)
    ctx.shadowBlur = 12
    ctx.font = '600 30px Rajdhani, Arial Narrow, sans-serif'
    ctx.fillStyle = color
    ctx.fillText(sub, w / 2, h / 2 + 88)
    ctx.shadowBlur = 0
    ctx.font = '700 17px Orbitron, sans-serif'
    ctx.fillStyle = 'rgba(172,230,240,0.48)'
    ctx.fillText('HELIX SYSTEMS // 09', w / 2, h - 58)
    // scanline overlay
    ctx.globalAlpha = 0.12
    ctx.fillStyle = '#8eefff'
    for (let y = 0; y < h; y += 4) ctx.fillRect(0, y, w, 1)
  }, { anisotropy: 8 })
}

function createHazardTexture() {
  return canvasTexture(512, 128, (ctx, w, h) => {
    ctx.fillStyle = '#0b0c0d'
    ctx.fillRect(0, 0, w, h)
    ctx.fillStyle = '#c98227'
    for (let x = -h; x < w + h; x += 64) {
      ctx.beginPath()
      ctx.moveTo(x, h)
      ctx.lineTo(x + 32, h)
      ctx.lineTo(x + 32 + h, 0)
      ctx.lineTo(x + h, 0)
      ctx.closePath()
      ctx.fill()
    }
    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = `rgba(0,0,0,${rand(0.05, 0.28)})`
      ctx.fillRect(rand(0, w), rand(0, h), rand(6, 50), rand(1, 3))
    }
  }, { repeat: [2, 1] })
}

function createPlanetTexture() {
  return canvasTexture(1024, 512, (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, 0, h)
    g.addColorStop(0, '#1b3a60')
    g.addColorStop(0.35, '#3f7ea3')
    g.addColorStop(0.5, '#5aa4bd')
    g.addColorStop(0.62, '#3b7e9e')
    g.addColorStop(0.8, '#1b4460')
    g.addColorStop(1, '#0a1826')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, w, h)
    for (let i = 0; i < 70; i++) {
      const y = rand(0, h)
      const gg = ctx.createLinearGradient(0, y, 0, y + rand(3, 26))
      gg.addColorStop(0, `rgba(${randInt(55, 110)},${randInt(90, 150)},${randInt(120, 185)},${rand(0.05, 0.24)})`)
      gg.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = gg
      ctx.fillRect(0, y, w, rand(3, 25))
    }
    // storm bands
    ctx.save()
    ctx.translate(w * 0.62, h * 0.56)
    ctx.rotate(-0.14)
    for (let i = 0; i < 9; i++) {
      ctx.strokeStyle = `rgba(${randInt(105, 160)},${randInt(170, 210)},${randInt(205, 235)},${rand(0.05, 0.15)})`
      ctx.lineWidth = rand(2, 8)
      ctx.beginPath()
      ctx.ellipse(0, 0, 120 + i * 22, 16 + i * 7, 0, 0, TAU)
      ctx.stroke()
    }
    ctx.restore()
    noise(ctx, w, h, 5000, 0.08, true)
    noise(ctx, w, h, 2000, 0.09, false)
  }, { anisotropy: 4 })
}

function createEnvTexture() {
  return canvasTexture(1024, 512, (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, 0, h)
    g.addColorStop(0, '#01030a')
    g.addColorStop(0.38, '#06101f')
    g.addColorStop(0.52, '#163248')
    g.addColorStop(0.62, '#0b1d2c')
    g.addColorStop(0.8, '#030812')
    g.addColorStop(1, '#010207')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, w, h)
    const glows = [
      [180, 245, 120, 'rgba(20,174,224,0.55)'],
      [720, 255, 150, 'rgba(246,82,196,0.42)'],
      [500, 230, 210, 'rgba(255,144,68,0.3)'],
      [980, 200, 120, 'rgba(38,104,255,0.3)']
    ]
    for (const [x, y, r, c] of glows) {
      const rg = ctx.createRadialGradient(x, y, 0, x, y, r)
      rg.addColorStop(0, c)
      rg.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = rg
      ctx.fillRect(0, 0, w, h)
    }
    // horizon light band
    const band = ctx.createLinearGradient(0, 240, 0, 300)
    band.addColorStop(0, 'rgba(0,0,0,0)')
    band.addColorStop(0.5, 'rgba(61,204,239,0.15)')
    band.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = band
    ctx.fillRect(0, 235, w, 80)
    noise(ctx, w, h, 2500, 0.08, true)
  }, { anisotropy: 2 })
}

function createStars(count = 1600) {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const color = new THREE.Color()
  for (let i = 0; i < count; i++) {
    const r = rand(120, 172)
    const theta = rand(0, TAU)
    const phi = Math.acos(rand(-0.15, 1))
    const x = r * Math.sin(phi) * Math.cos(theta)
    const y = r * Math.cos(phi)
    const z = r * Math.sin(phi) * Math.sin(theta)
    positions[i * 3] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z
    color.setHSL(rand(0.48, 0.62), rand(0.05, 0.45), rand(0.62, 1))
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  const mat = new THREE.PointsMaterial({
    size: 0.46,
    map: makeGlowTexture(64),
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
    toneMapped: false
  })
  const points = new THREE.Points(geo, mat)
  points.frustumCulled = false
  return points
}

function createSky() {
  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(190, 40, 24),
    new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {},
      vertexShader: `
        varying vec3 vPos;
        void main() {
          vPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vPos;
        void main() {
          vec3 d = normalize(vPos);
          float h = d.y;
          vec3 bottom = vec3(0.008, 0.018, 0.035);
          vec3 horizon = vec3(0.025, 0.075, 0.118);
          vec3 top = vec3(0.003, 0.008, 0.025);
          vec3 col = mix(bottom, horizon, smoothstep(-0.15, 0.06, h));
          col = mix(col, top, smoothstep(0.05, 0.72, h));
          float glow = pow(max(0.0, 1.0 - abs(h - 0.03)), 14.0);
          col += vec3(0.06, 0.26, 0.34) * glow * 0.45;
          float side = pow(max(0.0, d.x * 0.7 + d.z * 0.3), 5.0);
          col += vec3(0.12, 0.02, 0.12) * side * 0.12;
          gl_FragColor = vec4(col, 1.0);
        }
      `
    })
  )
  sky.renderOrder = -10
  sky.frustumCulled = false
  return sky
}

function buildPlanet(scene) {
  const group = new THREE.Group()
  group.position.set(-80, 65, -136)
  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(15.5, 48, 32),
    new THREE.MeshBasicMaterial({ map: createPlanetTexture(), toneMapped: false, fog: false })
  )
  planet.rotation.y = -0.6
  group.add(planet)
  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(16.2, 48, 32),
    new THREE.ShaderMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
      uniforms: {
        uColor: { value: new THREE.Color(0x58b8ff) }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vWorld;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vWorld = wp.xyz;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying vec3 vNormal;
        varying vec3 vWorld;
        void main() {
          vec3 viewDir = normalize(cameraPosition - vWorld);
          float rim = pow(1.0 - abs(dot(normalize(vNormal), viewDir)), 2.4);
          gl_FragColor = vec4(uColor * (0.55 + rim * 1.6), rim * 0.85);
        }
      `
    })
  )
  group.add(atmosphere)
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x8fb8cc,
    transparent: true,
    opacity: 0.2,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
    fog: false
  })
  const ring = new THREE.Mesh(new THREE.RingGeometry(18.4, 23.2, 96), ringMat)
  ring.rotation.set(1.26, 0.05, 0.3)
  group.add(ring)
  const ring2 = new THREE.Mesh(new THREE.RingGeometry(24, 24.6, 96), ringMat.clone())
  ring2.material.opacity = 0.07
  ring2.rotation.copy(ring.rotation)
  group.add(ring2)
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeGlowTexture(128),
    color: 0x3d8fdd,
    transparent: true,
    opacity: 0.2,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false
  }))
  glow.scale.set(60, 60, 1)
  group.add(glow)
  group.renderOrder = -5
  scene.add(group)
  return group
}

function buildSkyline(scene, towerTex) {
  const group = new THREE.Group()
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const palettes = [
    { color: 0x2a3d4f, emissive: 0xb9e6f5, intensity: 0.7, rough: 0.62 },
    { color: 0x3a343d, emissive: 0xffc38c, intensity: 0.54, rough: 0.7 },
    { color: 0x243645, emissive: 0x9acfe8, intensity: 0.48, rough: 0.66 }
  ]
  const materials = palettes.map((p) => new THREE.MeshStandardMaterial({
    color: p.color,
    map: towerTex,
    emissive: p.emissive,
    emissiveMap: towerTex,
    emissiveIntensity: p.intensity,
    roughness: p.rough,
    metalness: 0.28
  }))
  const antennaMat = new THREE.MeshBasicMaterial({ color: 0x9deeff, transparent: true, opacity: 0.55, toneMapped: false })
  const beaconPositions = []
  for (let i = 0; i < 64; i++) {
    const angle = (i / 64) * TAU + rand(-0.045, 0.045)
    const radius = rand(78, 132)
    const w = rand(5, 14)
    const d = rand(5, 14)
    const h = rand(14, 56) * (radius > 102 ? 1.16 : 1)
    const mat = materials[i % materials.length]
    const mesh = new THREE.Mesh(geometry, mat)
    mesh.position.set(Math.cos(angle) * radius, h / 2 - 2, Math.sin(angle) * radius)
    mesh.scale.set(w, h, d)
    mesh.rotation.y = rand(-0.15, 0.15)
    group.add(mesh)
    // Rooftop caps and antenna masts break up the flat silhouette.
    if (Math.random() < 0.55) {
      const cap = new THREE.Mesh(geometry, materials[(i + 1) % materials.length])
      const cw = w * rand(0.35, 0.7)
      cap.position.set(mesh.position.x, h - 1.4, mesh.position.z)
      cap.scale.set(cw, rand(1.4, 5.5), cw)
      group.add(cap)
    }
    if (Math.random() < 0.3) {
      const mastH = rand(6, 18)
      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.2, mastH, 5), antennaMat)
      mast.position.set(mesh.position.x, h + mastH / 2 - 2, mesh.position.z)
      group.add(mast)
    }
    if (Math.random() < 0.6) beaconPositions.push(mesh.position.x, h + 1.4, mesh.position.z)
  }
  const bg = new THREE.BufferGeometry()
  bg.setAttribute('position', new THREE.Float32BufferAttribute(beaconPositions, 3))
  const beacons = new THREE.Points(bg, new THREE.PointsMaterial({
    color: 0xff6a60,
    size: 0.9,
    map: makeGlowTexture(64),
    transparent: true,
    opacity: 0.95,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false
  }))
  group.add(beacons)

  // Low-lying city haze behind the silhouettes.
  const hazeMat = new THREE.SpriteMaterial({
    map: makeGlowTexture(256),
    color: 0x2b8fb5,
    transparent: true,
    opacity: 0.16,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false
  })
  for (let i = 0; i < 7; i++) {
    const a = -0.9 + i * 0.3
    const haze = new THREE.Sprite(hazeMat)
    haze.position.set(Math.cos(a) * 150, rand(4, 14), Math.sin(a) * 150)
    haze.scale.set(rand(62, 105), rand(18, 32), 1)
    group.add(haze)
  }
  scene.add(group)
  return group
}

function makeWallSign(width, height, title, sub, color) {
  const sign = new THREE.Mesh(
    new THREE.PlaneGeometry(width, height),
    new THREE.MeshBasicMaterial({
      map: createSignTexture(title, sub, color),
      transparent: false,
      toneMapped: false
    })
  )
  return sign
}

function makeHazardPlane(width, height, texture) {
  return new THREE.Mesh(
    new THREE.PlaneGeometry(width, height),
    new THREE.MeshBasicMaterial({ map: texture, toneMapped: false })
  )
}

export function createWorld(scene, renderer) {
  const aniso = Math.min(8, renderer.capabilities.getMaxAnisotropy())
  const floorTex = createFloorTexture(aniso)
  const metalTex = createMetalTexture(aniso)
  const wallTex = createWallTexture(aniso)
  const floorNormal = createFloorNormal(aniso)
  const metalNormal = createMetalNormal(aniso)
  const wallNormal = createWallNormal(aniso)
  const hazardTex = createHazardTexture()
  const towerTex = createTowerTexture()

  scene.fog = new THREE.FogExp2(0x060d16, 0.0086)

  // Environment map for physically-based metal and glass.
  const envSource = createEnvTexture()
  envSource.mapping = THREE.EquirectangularReflectionMapping
  const pmrem = new THREE.PMREMGenerator(renderer)
  pmrem.compileEquirectangularShader()
  const envTarget = pmrem.fromEquirectangular(envSource)
  scene.environment = envTarget.texture
  scene.environmentIntensity = 1.02
  envSource.dispose()
  pmrem.dispose()

  const sky = createSky()
  scene.add(sky)
  scene.add(createStars())
  const planetGroup = buildPlanet(scene)
  buildSkyline(scene, towerTex)

  // Lights
  const hemi = new THREE.HemisphereLight(0x9fdcf5, 0x18242e, 2.45)
  scene.add(hemi)
  const ambient = new THREE.AmbientLight(0x3d6379, 1.1)
  scene.add(ambient)
  const moon = new THREE.DirectionalLight(0xbcdcff, 3.1)
  moon.position.set(28, 42, 24)
  moon.castShadow = true
  moon.shadow.mapSize.set(1024, 1024)
  moon.shadow.camera.left = -44
  moon.shadow.camera.right = 44
  moon.shadow.camera.top = 44
  moon.shadow.camera.bottom = -44
  moon.shadow.camera.near = 1
  moon.shadow.camera.far = 105
  moon.shadow.bias = -0.0004
  moon.shadow.normalBias = 0.035
  scene.add(moon)
  // Cool and warm rim fills keep every arena wall readable without shadows.
  const rimCool = new THREE.DirectionalLight(0x45c8e8, 0.9)
  rimCool.position.set(-34, 14, 36)
  scene.add(rimCool)
  const rimWarm = new THREE.DirectionalLight(0xff8a52, 0.5)
  rimWarm.position.set(34, 11, 30)
  scene.add(rimWarm)
  const fill = new THREE.PointLight(0x35d6f5, 190, 48, 2)
  fill.position.set(0, 10, 12)
  scene.add(fill)
  const fill2 = new THREE.PointLight(0x4fdcff, 130, 42, 2)
  fill2.position.set(20, 8, -20)
  scene.add(fill2)
  const magentaLight = new THREE.PointLight(0xdb2ba6, 110, 40, 2)
  magentaLight.position.set(-20, 6, -22)
  scene.add(magentaLight)
  const warmLight = new THREE.PointLight(0xff8e3e, 52, 30, 2)
  warmLight.position.set(18, 5.4, -6)
  scene.add(warmLight)
  const coreLight = new THREE.PointLight(0xffa252, 58, 22, 2)
  coreLight.position.set(0, 4.4, 0)
  scene.add(coreLight)
  const coreRim = new THREE.PointLight(0x6fdcff, 46, 18, 2)
  coreRim.position.set(0, 8.2, 0)
  scene.add(coreRim)

  const colliders = []
  const hitMeshes = []
  const portalData = []
  const updatables = []

  const materials = {
    metal: new THREE.MeshStandardMaterial({
      color: 0xaebdc9,
      map: metalTex,
      normalMap: metalNormal,
      normalScale: new THREE.Vector2(0.72, 0.72),
      roughness: 0.44,
      metalness: 0.74,
      envMapIntensity: 1.1,
      emissive: 0x102630,
      emissiveMap: metalTex,
      emissiveIntensity: 0.38
    }),
    darkMetal: new THREE.MeshStandardMaterial({
      color: 0x4a5b68,
      map: metalTex,
      normalMap: metalNormal,
      normalScale: new THREE.Vector2(0.85, 0.85),
      roughness: 0.52,
      metalness: 0.6,
      envMapIntensity: 1.0,
      emissive: 0x122a36,
      emissiveMap: metalTex,
      emissiveIntensity: 0.32
    }),
    wall: new THREE.MeshStandardMaterial({
      color: 0xbfceda,
      map: wallTex,
      normalMap: wallNormal,
      normalScale: new THREE.Vector2(0.95, 0.95),
      roughness: 0.7,
      metalness: 0.26,
      envMapIntensity: 1.0,
      emissive: 0x2a5a70,
      emissiveMap: wallTex,
      emissiveIntensity: 1.2
    }),
    cyan: new THREE.MeshBasicMaterial({ color: 0x66f7ff, toneMapped: false }),
    cyanDim: new THREE.MeshBasicMaterial({ color: 0x0c8b9b, toneMapped: false }),
    orange: new THREE.MeshBasicMaterial({ color: 0xff7a30, toneMapped: false }),
    orangeDim: new THREE.MeshBasicMaterial({ color: 0xb84316, toneMapped: false }),
    red: new THREE.MeshBasicMaterial({ color: 0xff334c, toneMapped: false }),
    magenta: new THREE.MeshBasicMaterial({ color: 0xff3ad2, toneMapped: false }),
    hazard: new THREE.MeshBasicMaterial({ map: hazardTex, toneMapped: false })
  }

  function register(mesh, { hit = true } = {}) {
    if (hit) hitMeshes.push(mesh)
    return mesh
  }

  function addCollider(cx, cz, width, depth, height = 2, rot = 0) {
    const halfX = (Math.abs(Math.cos(rot)) * width + Math.abs(Math.sin(rot)) * depth) / 2
    const halfZ = (Math.abs(Math.sin(rot)) * width + Math.abs(Math.cos(rot)) * depth) / 2
    colliders.push(new THREE.Box3(
      new THREE.Vector3(cx - halfX, 0, cz - halfZ),
      new THREE.Vector3(cx + halfX, height, cz + halfZ)
    ))
  }

  // ----- Floor -----
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0xbcc9d4,
    map: floorTex,
    normalMap: floorNormal,
    normalScale: new THREE.Vector2(0.62, 0.62),
    roughness: 0.47,
    metalness: 0.36,
    envMapIntensity: 1.25,
    emissive: 0x18303a,
    emissiveMap: floorTex,
    emissiveIntensity: 0.3
  })
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(92, 92), floorMat)
  floor.rotation.x = -Math.PI / 2
  floor.receiveShadow = true
  register(floor)
  scene.add(floor)

  const grid = new THREE.GridHelper(90, 45, 0x0f5668, 0x0a2b38)
  grid.position.y = 0.012
  grid.material.transparent = true
  grid.material.opacity = 0.16
  grid.material.depthWrite = false
  grid.material.blending = THREE.AdditiveBlending
  scene.add(grid)

  // Outer floor glow rails
  for (const [x, z, w, d] of [[0, -41.4, 82, 0.16], [0, 41.4, 82, 0.16], [-41.4, 0, 0.16, 82], [41.4, 0, 0.16, 82]]) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(w, 0.025, d), materials.cyanDim)
    rail.position.set(x, 0.03, z)
    scene.add(rail)
  }

  // ----- Perimeter walls -----
  const wallGroup = new THREE.Group()
  const wallDefs = [
    { x: 0, z: -44.7, w: 90, d: 2, rot: 0, sign: true },
    { x: 0, z: 44.7, w: 90, d: 2, rot: Math.PI, sign: false },
    { x: -44.7, z: 0, w: 2, d: 90, rot: -Math.PI / 2, sign: true },
    { x: 44.7, z: 0, w: 2, d: 90, rot: Math.PI / 2, sign: true }
  ]
  for (const def of wallDefs) {
    const wall = new THREE.Mesh(new THREE.BoxGeometry(def.w, 8.4, def.d), materials.wall)
    wall.position.set(def.x, 4.2, def.z)
    wall.castShadow = true
    wall.receiveShadow = true
    wallGroup.add(wall)
    register(wall)
    addCollider(def.x, def.z, def.w, def.d, 8)
    // top trim
    const trim = new THREE.Mesh(new THREE.BoxGeometry(def.w + 0.1, 0.14, def.d + 0.16), materials.cyanDim)
    trim.position.set(def.x, 8.35, def.z)
    wallGroup.add(trim)
    // inner base strip
    const base = new THREE.Mesh(new THREE.BoxGeometry(def.w + 0.06, 0.08, def.d + 0.1), materials.orange)
    base.position.set(def.x, 0.42, def.z)
    base.scale.y = 0.4
    wallGroup.add(base)
    // buttress pillars
    const sideWall = Math.abs(def.x) > Math.abs(def.z)
    for (let i = -36; i <= 36; i += 9) {
      if (Math.abs(i) < 10) continue
      const bx = sideWall ? def.x - Math.sign(def.x) * 0.85 : def.x + i
      const bz = sideWall ? def.z + i : def.z - Math.sign(def.z) * 0.85
      const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.7, 5.2, 0.7), materials.darkMetal)
      pillar.position.set(bx, 2.6, bz)
      pillar.castShadow = true
      wallGroup.add(pillar)
      const lightStrip = new THREE.Mesh(new THREE.BoxGeometry(0.12, 3.4, 0.72), materials.cyan)
      if (!sideWall) lightStrip.position.set(bx, 4.2, bz + Math.sign(-def.z) * 0.36)
      else lightStrip.position.set(bx + Math.sign(-def.x) * 0.36, 4.2, bz)
      if (sideWall) lightStrip.scale.set(6, 1, 1)
      wallGroup.add(lightStrip)
      // low warm lamp
      const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), materials.orange)
      lamp.position.set(bx, 1.1, bz + (!sideWall ? Math.sign(-def.z) * 0.42 : 0))
      if (sideWall) lamp.position.x = bx + Math.sign(-def.x) * 0.42
      wallGroup.add(lamp)
    }
  }
  scene.add(wallGroup)

  // Soft wall washes fake practical light bounce along the upper wall.
  const washTex = createWashTexture()
  for (const def of wallDefs) {
    const sideWall = Math.abs(def.x) > Math.abs(def.z)
    const wash = new THREE.Mesh(
      new THREE.PlaneGeometry(sideWall ? 86 : 86, 5.6),
      new THREE.MeshBasicMaterial({
        map: washTex,
        color: 0x8fe3f5,
        transparent: true,
        opacity: 0.58,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
        side: THREE.DoubleSide
      })
    )
    if (sideWall) {
      wash.position.set(def.x + Math.sign(-def.x) * 1.03, 4.35, 0)
      wash.rotation.y = def.x < 0 ? Math.PI / 2 : -Math.PI / 2
    } else {
      wash.position.set(0, 4.35, def.z + Math.sign(-def.z) * 1.03)
      wash.rotation.y = def.z > 0 ? Math.PI : 0
    }
    scene.add(wash)
  }

  // ----- Wall greebles, service catwalks and overhead gantry -----
  const detailGroup = new THREE.Group()
  const railMat = new THREE.MeshStandardMaterial({
    color: 0x6f8b9c, map: metalTex, normalMap: metalNormal, normalScale: new THREE.Vector2(0.6, 0.6),
    metalness: 0.86, roughness: 0.34, envMapIntensity: 1.3
  })
  const panelMat = new THREE.MeshStandardMaterial({
    color: 0x1b2a35, map: metalTex, normalMap: metalNormal, normalScale: new THREE.Vector2(0.9, 0.9),
    metalness: 0.7, roughness: 0.52, envMapIntensity: 0.8
  })
  const lampFace = new THREE.MeshBasicMaterial({ color: 0xffd9a0, toneMapped: false })
  const boxGeo = new THREE.BoxGeometry(1, 1, 1)
  for (const def of wallDefs) {
    const sideWall = Math.abs(def.x) > Math.abs(def.z)
    const inX = sideWall ? def.x + Math.sign(-def.x) * 1.01 : def.x
    const inZ = sideWall ? def.z : def.z + Math.sign(-def.z) * 1.01
    const rotY = sideWall ? Math.PI / 2 : 0
    // Recessed service panels and vent grilles.
    for (let i = -33; i <= 33; i += 6.6) {
      if (Math.abs(i) < 7) continue
      const along = i
      const y = i % 13 === 0 ? 5.15 : 2.35
      const w = 3.3
      const h = 1.42
      const px = sideWall ? inX + Math.sign(-def.x) * 0.09 : def.x + along
      const pz = sideWall ? def.z + along : inZ + Math.sign(-def.z) * 0.09
      const panel = new THREE.Mesh(boxGeo, panelMat)
      panel.scale.set(w, h, 0.16)
      panel.position.set(px, y, pz)
      panel.rotation.y = rotY
      detailGroup.add(panel)
      // Emissive data channel on every panel.
      const data = new THREE.Mesh(boxGeo, materials.cyanDim)
      data.scale.set(w * 0.82, 0.035, 0.2)
      data.position.set(
        sideWall ? px + Math.sign(-def.x) * 0.02 : px,
        y + h * 0.5 - 0.16,
        sideWall ? pz : pz + Math.sign(-def.z) * 0.02
      )
      data.rotation.y = rotY
      detailGroup.add(data)
      if (i % 13 !== 0) {
        const hazard = new THREE.Mesh(boxGeo, materials.hazard)
        hazard.scale.set(w * 0.32, h * 0.22, 0.19)
        hazard.position.set(
          sideWall ? px + Math.sign(-def.x) * 0.02 : px + w * 0.28,
          y - h * 0.18,
          sideWall ? pz + w * 0.28 : pz + Math.sign(-def.z) * 0.02
        )
        hazard.rotation.y = rotY
        detailGroup.add(hazard)
      }
    }
    // Horizontal pipe runs at ankle height.
    const pipeLen = 80
    for (const [offY, r] of [[1.05, 0.13], [1.32, 0.075]]) {
      const pipe = new THREE.Mesh(new THREE.CylinderGeometry(r, r, pipeLen, 8), materials.darkMetal)
      pipe.rotation.z = Math.PI / 2
      pipe.rotation.y = rotY
      if (sideWall) {
        pipe.rotation.set(Math.PI / 2, 0, 0)
        pipe.position.set(inX + Math.sign(-def.x) * 0.34, offY, def.z)
      } else {
        pipe.position.set(def.x, offY, inZ + Math.sign(-def.z) * 0.34)
      }
      detailGroup.add(pipe)
    }
    // Catwalk platform with railing.
    const catY = 6.55
    const catDepth = 1.55
    const platform = new THREE.Mesh(boxGeo, materials.darkMetal)
    platform.scale.set(sideWall ? catDepth : 88, 0.14, sideWall ? 88 : catDepth)
    platform.position.set(
      sideWall ? inX + Math.sign(-def.x) * catDepth / 2 : def.x,
      catY,
      sideWall ? def.z : inZ + Math.sign(-def.z) * catDepth / 2
    )
    detailGroup.add(platform)
    const railEdgeX = sideWall ? inX + Math.sign(-def.x) * (catDepth - 0.05) : def.x
    const railEdgeZ = sideWall ? def.z : inZ + Math.sign(-def.z) * (catDepth - 0.05)
    for (const railY of [catY + 0.52, catY + 1.02]) {
      const rail = new THREE.Mesh(boxGeo, railMat)
      rail.scale.set(sideWall ? 0.06 : 88, 0.055, sideWall ? 88 : 0.06)
      rail.position.set(railEdgeX, railY, railEdgeZ)
      detailGroup.add(rail)
    }
    for (let i = -42; i <= 42; i += 4.4) {
      const post = new THREE.Mesh(boxGeo, railMat)
      post.scale.set(0.06, 1.08, 0.06)
      post.position.set(sideWall ? railEdgeX : def.x + i, catY + 0.54, sideWall ? def.z + i : railEdgeZ)
      detailGroup.add(post)
      if (i % 8.8 === 0) {
        const bracket = new THREE.Mesh(boxGeo, materials.darkMetal)
        bracket.scale.set(0.16, 0.16, sideWall ? 1.35 : 0.16)
        bracket.position.set(
          sideWall ? inX + Math.sign(-def.x) * 0.7 : def.x + i,
          catY - 0.28,
          sideWall ? def.z + i : inZ + Math.sign(-def.z) * 0.7
        )
        if (sideWall) {
          bracket.rotation.x = 0.45
        } else {
          bracket.rotation.z = 0.45
        }
        detailGroup.add(bracket)
      }
    }
    // Catwalk edge light.
    const edge = new THREE.Mesh(boxGeo, materials.cyanDim)
    edge.scale.set(sideWall ? 0.05 : 88, 0.03, sideWall ? 88 : 0.05)
    edge.position.set(sideWall ? railEdgeX : def.x, catY + 0.08, sideWall ? def.z : railEdgeZ)
    detailGroup.add(edge)
    // Warm practical lamps tucked under the catwalk.
    for (let li = -33; li <= 33; li += 22) {
      const fx = sideWall ? inX + Math.sign(-def.x) * 0.3 : def.x + li
      const fz = sideWall ? def.z + li : inZ + Math.sign(-def.z) * 0.3
      const fixture = new THREE.Mesh(boxGeo, lampFace)
      fixture.scale.set(sideWall ? 0.3 : 0.9, 0.06, sideWall ? 0.9 : 0.3)
      fixture.position.set(fx, 6.26, fz)
      detailGroup.add(fixture)
      const warmGlow = new THREE.Sprite(new THREE.SpriteMaterial({
        map: makeGlowTexture(64), color: 0xffb56a, transparent: true, opacity: 0.3,
        blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false
      }))
      warmGlow.position.set(fx, 6.18, fz)
      warmGlow.scale.set(1.25, 1.25, 1)
      detailGroup.add(warmGlow)
    }
  }

  // Overhead truss ring and cross-braces.
  const gantryLow = 9.55
  const gantryHigh = 10.95
  for (const [x, z, len, rot] of [
    [0, -39.6, 88, 0], [0, 39.6, 88, 0],
    [-39.6, 0, 88, Math.PI / 2], [39.6, 0, 88, Math.PI / 2]
  ]) {
    for (const y of [gantryLow, gantryHigh]) {
      const chord = new THREE.Mesh(boxGeo, materials.darkMetal)
      chord.scale.set(len, 0.3, 0.34)
      chord.position.set(x, y, z)
      chord.rotation.y = rot
      detailGroup.add(chord)
    }
    for (let i = -40; i <= 40; i += 4.4) {
      const brace = new THREE.Mesh(boxGeo, materials.darkMetal)
      brace.scale.set(0.14, gantryHigh - gantryLow + 0.35, 0.14)
      brace.position.set(
        rot === 0 ? x + i : x,
        (gantryLow + gantryHigh) / 2,
        rot === 0 ? z : z + i
      )
      detailGroup.add(brace)
    }
  }
  for (const z of [-30, 30]) {
    const beam = new THREE.Mesh(boxGeo, materials.darkMetal)
    beam.scale.set(80, 0.34, 0.34)
    beam.position.set(0, gantryLow, z)
    detailGroup.add(beam)
    const beam2 = new THREE.Mesh(boxGeo, materials.darkMetal)
    beam2.scale.set(80, 0.22, 0.22)
    beam2.position.set(0, gantryHigh, z)
    detailGroup.add(beam2)
    for (let i = -36; i <= 36; i += 6) {
      const brace = new THREE.Mesh(boxGeo, materials.darkMetal)
      brace.scale.set(0.1, gantryHigh - gantryLow, 0.1)
      brace.position.set(i, (gantryLow + gantryHigh) / 2, z)
      detailGroup.add(brace)
    }
  }

  // Hanging industrial lamps under the gantry.
  for (const [x, z] of [[-30, -29], [-10, -29], [10, -29], [30, -29], [-30, 29], [30, 29], [-29, -8], [-29, 10], [29, -8], [29, 10]]) {
    const housing = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.62, 0.5, 8), materials.darkMetal)
    housing.position.set(x, 8.55, z)
    detailGroup.add(housing)
    const face = new THREE.Mesh(new THREE.CircleGeometry(0.38, 16), lampFace)
    face.rotation.x = Math.PI / 2
    face.position.set(x, 8.28, z)
    detailGroup.add(face)
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: makeGlowTexture(64), color: 0xffb56a, transparent: true, opacity: 0.5,
      blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false
    }))
    glow.position.set(x, 8.24, z)
    glow.scale.set(2.4, 2.4, 1)
    detailGroup.add(glow)
    const cable = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.9, 4), materials.darkMetal)
    cable.position.set(x, 9.1, z)
    detailGroup.add(cable)
  }
  scene.add(detailGroup)

  // Wall signage
  const signFar = makeWallSign(17, 8.5, 'SECTOR 09', 'ORBITAL FOUNDRY // RESTRICTED', '#42e8ff')
  signFar.position.set(-19, 4.8, -43.62)
  scene.add(signFar)
  const signFar2 = makeWallSign(13, 6.5, 'HELIX', 'DEFENSE GRID ONLINE', '#ff9c45')
  signFar2.position.set(21, 4.5, -43.62)
  scene.add(signFar2)
  const signLeft = makeWallSign(12, 6, 'NO SIGNAL', 'AUTONOMOUS DEFENSE PROTOCOL', '#ff49bd')
  signLeft.position.set(-43.62, 4.6, -12)
  signLeft.rotation.y = Math.PI / 2
  scene.add(signLeft)
  const signRight = makeWallSign(10, 5, 'HELIX', 'CORE INTEGRITY 97.4%', '#ff9c45')
  signRight.position.set(43.62, 4.2, 9)
  signRight.rotation.y = -Math.PI / 2
  scene.add(signRight)
  const signBack = makeWallSign(13, 6.5, 'LAST STAND', 'ALL UNITS LOST // HOLD THE LINE', '#42e8ff')
  signBack.position.set(7, 4.5, 43.62)
  signBack.rotation.y = Math.PI
  scene.add(signBack)

  // ----- Central reactor -----
  const coreGroup = new THREE.Group()
  coreGroup.position.set(0, 0, 0)
  const coreBase = new THREE.Mesh(new THREE.CylinderGeometry(3.1, 3.5, 0.34, 8), materials.darkMetal)
  coreBase.position.y = 0.17
  coreBase.receiveShadow = true
  coreGroup.add(coreBase)
  const coreBaseTop = new THREE.Mesh(new THREE.CylinderGeometry(2.7, 3.05, 0.18, 8), materials.metal)
  coreBaseTop.position.y = 0.42
  coreGroup.add(coreBaseTop)
  const daisRing = new THREE.Mesh(new THREE.RingGeometry(3.55, 3.72, 64), materials.orange)
  daisRing.rotation.x = -Math.PI / 2
  daisRing.position.y = 0.032
  coreGroup.add(daisRing)
  const daisRing2 = new THREE.Mesh(new THREE.RingGeometry(4.15, 4.19, 64), materials.cyanDim)
  daisRing2.rotation.x = -Math.PI / 2
  daisRing2.position.y = 0.03
  coreGroup.add(daisRing2)

  const column = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.58, 4.8, 8), materials.darkMetal)
  column.position.y = 2.9
  column.castShadow = true
  coreGroup.add(column)
  const coreGlow = new THREE.Mesh(
    new THREE.CylinderGeometry(0.55, 0.38, 2.4, 8, 1, true),
    new THREE.MeshBasicMaterial({
      color: 0xff8f3f,
      transparent: true,
      opacity: 0.11,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
      toneMapped: false
    })
  )
  coreGlow.position.y = 3.0
  coreGroup.add(coreGlow)
  const coreSprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeGlowTexture(128),
    color: 0xff8b36,
    transparent: true,
    opacity: 0.16,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false
  }))
  coreSprite.scale.set(3.1, 3.1, 1)
  coreSprite.position.y = 3.0
  coreGroup.add(coreSprite)
  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.45, 0.032, 6, 80), materials.orange)
  ring1.rotation.x = Math.PI / 2
  ring1.position.y = 3.4
  coreGroup.add(ring1)
  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.9, 0.026, 6, 72), materials.cyan)
  ring2.position.y = 3.4
  coreGroup.add(ring2)
  const warningRing = new THREE.Mesh(new THREE.RingGeometry(6.1, 6.14, 80), materials.red)
  warningRing.rotation.x = -Math.PI / 2
  warningRing.position.y = 0.035
  coreGroup.add(warningRing)

  // Containment housing around the energy column.
  const housing = new THREE.Mesh(new THREE.CylinderGeometry(0.92, 1.18, 2.6, 8, 1, true), materials.darkMetal)
  housing.position.y = 2.2
  housing.castShadow = true
  coreGroup.add(housing)
  const housingCap = new THREE.Mesh(new THREE.CylinderGeometry(1.24, 0.92, 0.26, 8), materials.metal)
  housingCap.position.y = 3.5
  coreGroup.add(housingCap)
  const energyColumn = new THREE.Mesh(
    new THREE.CylinderGeometry(0.16, 0.09, 5.0, 12),
    new THREE.MeshBasicMaterial({
      color: 0xffc07a, transparent: true, opacity: 0.24,
      blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false
    })
  )
  energyColumn.position.y = 3.7
  energyColumn.renderOrder = 1
  coreGroup.add(energyColumn)
  const containment = new THREE.Mesh(
    new THREE.CylinderGeometry(0.74, 0.86, 3.5, 16, 1, true),
    new THREE.MeshStandardMaterial({
      color: 0x0c1d27, metalness: 0.92, roughness: 0.14,
      transparent: true, opacity: 0.32, side: THREE.DoubleSide, envMapIntensity: 1.5
    })
  )
  containment.position.y = 3.3
  coreGroup.add(containment)
  const hotCore = new THREE.Mesh(
    new THREE.CylinderGeometry(0.11, 0.065, 3.1, 10),
    new THREE.MeshBasicMaterial({
      color: 0xffe2b8, transparent: true, opacity: 0.85,
      blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false
    })
  )
  hotCore.position.y = 3.4
  hotCore.renderOrder = 2
  coreGroup.add(hotCore)
  const hotOrb = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeGlowTexture(64), color: 0xffd9a0, transparent: true, opacity: 0.55,
    blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false
  }))
  hotOrb.position.y = 5.0
  hotOrb.scale.set(1.5, 1.5, 1)
  coreGroup.add(hotOrb)
  const plasma = new THREE.Mesh(
    new THREE.SphereGeometry(0.6, 20, 14),
    new THREE.MeshBasicMaterial({
      color: 0xffe7c4, transparent: true, opacity: 0.78,
      blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false
    })
  )
  plasma.position.y = 5.1
  plasma.renderOrder = 3
  coreGroup.add(plasma)
  const plasmaHalo = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeGlowTexture(128), color: 0xffc07a, transparent: true, opacity: 0.34,
    blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false
  }))
  plasmaHalo.position.y = 5.1
  plasmaHalo.scale.set(3.4, 3.4, 1)
  coreGroup.add(plasmaHalo)
  for (const by of [1.8, 2.85, 3.9]) {
    const band = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.045, 6, 40), materials.metal)
    band.rotation.x = Math.PI / 2
    band.position.y = by
    coreGroup.add(band)
  }
  for (let i = 0; i < 4; i++) {
    const a = i / 4 * TAU + Math.PI / 4
    const seam = new THREE.Mesh(new THREE.BoxGeometry(0.022, 3.1, 0.022), materials.cyanDim)
    seam.position.set(Math.cos(a) * 0.79, 3.3, Math.sin(a) * 0.79)
    coreGroup.add(seam)
  }
  for (let i = 0; i < 4; i++) {
    const a = i / 4 * TAU + Math.PI / 4
    const strut = new THREE.Mesh(new THREE.BoxGeometry(0.2, 4.2, 0.72), materials.metal)
    strut.position.set(Math.cos(a) * 1.5, 2.05, Math.sin(a) * 1.5)
    strut.rotation.y = -a
    strut.rotation.z = 0.1
    strut.castShadow = true
    coreGroup.add(strut)
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.05, 3.9, 0.5), materials.metal)
    fin.position.set(Math.cos(a) * 1.62, 2.1, Math.sin(a) * 1.62)
    fin.rotation.y = -a
    fin.rotation.z = 0.1
    coreGroup.add(fin)
    for (const py of [0.7, 1.55, 2.4, 3.25]) {
      const lampSegment = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.3, 0.54), materials.orangeDim)
      lampSegment.position.set(Math.cos(a) * 1.67, py, Math.sin(a) * 1.67)
      lampSegment.rotation.y = -a
      lampSegment.rotation.z = 0.1
      coreGroup.add(lampSegment)
    }
  }
  for (const [ry, rr] of [[0.95, 1.5], [1.35, 1.42], [1.75, 1.34]]) {
    const coil = new THREE.Mesh(new THREE.TorusGeometry(rr, 0.045, 6, 48), materials.orangeDim)
    coil.rotation.x = Math.PI / 2
    coil.position.y = ry
    coreGroup.add(coil)
  }
  const gyroA = new THREE.Mesh(
    new THREE.TorusGeometry(2.15, 0.03, 6, 72),
    new THREE.MeshBasicMaterial({ color: 0x3fd0e6, toneMapped: false })
  )
  gyroA.rotation.set(0.32, 0, 0.18)
  gyroA.position.y = 4.35
  coreGroup.add(gyroA)
  const gyroB = new THREE.Mesh(
    new THREE.TorusGeometry(1.72, 0.025, 6, 64),
    new THREE.MeshBasicMaterial({ color: 0xff7a2e, toneMapped: false })
  )
  gyroB.rotation.set(-0.42, 0.4, 0)
  gyroB.position.y = 4.35
  coreGroup.add(gyroB)
  const emitter = new THREE.Mesh(new THREE.ConeGeometry(0.72, 1.1, 8, 1, true), materials.darkMetal)
  emitter.position.y = 5.25
  coreGroup.add(emitter)
  const emitterGlow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeGlowTexture(96), color: 0xffc076, transparent: true, opacity: 0.36,
    blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false
  }))
  emitterGlow.position.y = 5.75
  emitterGlow.scale.set(1.9, 1.9, 1)
  coreGroup.add(emitterGlow)
  const updraft = new THREE.Mesh(
    new THREE.ConeGeometry(2.6, 7.5, 16, 1, true),
    new THREE.MeshBasicMaterial({
      color: 0xff9d4d, transparent: true, opacity: 0.012, side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false
    })
  )
  updraft.position.y = 9.3
  coreGroup.add(updraft)
  // Rotating floor markers.
  const markerGroup = new THREE.Group()
  for (let i = 0; i < 12; i++) {
    const a = i / 12 * TAU
    const marker = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.012, 0.1), materials.orangeDim)
    marker.position.set(Math.cos(a) * 5.15, 0.04, Math.sin(a) * 5.15)
    marker.rotation.y = -a
    markerGroup.add(marker)
  }
  coreGroup.add(markerGroup)
  const outerMarkers = new THREE.Group()
  for (let i = 0; i < 24; i++) {
    const a = i / 24 * TAU
    const mat = i % 3 === 0 ? materials.orangeDim : materials.cyanDim
    const marker = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.01, 0.07), mat)
    marker.position.set(Math.cos(a) * 9.6, 0.038, Math.sin(a) * 9.6)
    marker.rotation.y = -a
    outerMarkers.add(marker)
  }
  coreGroup.add(outerMarkers)
  const corePool = new THREE.Mesh(
    new THREE.CircleGeometry(9.2, 56),
    new THREE.MeshBasicMaterial({
      map: makeGlowTexture(256), color: 0xff8a3a, transparent: true, opacity: 0.14,
      blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false
    })
  )
  corePool.rotation.x = -Math.PI / 2
  corePool.position.y = 0.024
  coreGroup.add(corePool)
  scene.add(coreGroup)
  addCollider(0, 0, 6.4, 6.4, 5)
  coreGroup.traverse((o) => { if (o.isMesh && o !== coreSprite) hitMeshes.push(o) })
  updatables.push((dt, t) => {
    ring1.rotation.z += dt * 0.25
    ring2.rotation.z -= dt * 0.4
    ring2.rotation.x += dt * 0.18
    gyroA.rotation.z += dt * 0.42
    gyroB.rotation.x -= dt * 0.5
    gyroB.rotation.y += dt * 0.22
    markerGroup.rotation.y += dt * 0.14
    coreGlow.scale.setScalar(1 + Math.sin(t * 2.1) * 0.035)
    coreSprite.material.opacity = 0.15 + Math.sin(t * 2.1) * 0.035
    coreSprite.scale.setScalar(3.1 + Math.sin(t * 1.4) * 0.15)
    energyColumn.material.opacity = 0.2 + Math.sin(t * 2.6) * 0.06
    energyColumn.scale.x = 1 + Math.sin(t * 3.4) * 0.08
    energyColumn.scale.z = energyColumn.scale.x
    hotCore.material.opacity = 0.72 + Math.sin(t * 4.1) * 0.12
    hotCore.scale.x = 1 + Math.sin(t * 5.2) * 0.12
    hotCore.scale.z = hotCore.scale.x
    hotOrb.material.opacity = 0.46 + Math.sin(t * 3.3) * 0.1
    hotOrb.scale.setScalar(1.45 + Math.sin(t * 2.1) * 0.16)
    plasma.material.opacity = 0.66 + Math.sin(t * 3.8) * 0.14
    plasma.scale.setScalar(1 + Math.sin(t * 2.7) * 0.1)
    plasmaHalo.material.opacity = 0.28 + Math.sin(t * 2.4) * 0.09
    plasmaHalo.scale.setScalar(3.3 + Math.sin(t * 1.9) * 0.35)
    emitterGlow.material.opacity = 0.3 + Math.sin(t * 2.2) * 0.08
    updraft.material.opacity = 0.009 + Math.sin(t * 1.3) * 0.004
  })

  // ----- Cargo / cover -----
  function createCargo(x, z, w, h, d, rot = 0, accent = 'cyan') {
    const group = new THREE.Group()
    group.position.set(x, 0, z)
    group.rotation.y = rot
    const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), materials.darkMetal)
    body.position.y = h / 2
    body.castShadow = true
    body.receiveShadow = true
    group.add(body)
    const lid = new THREE.Mesh(new THREE.BoxGeometry(w + 0.06, 0.1, d + 0.06), materials.metal)
    lid.position.y = h
    lid.castShadow = true
    group.add(lid)
    // corner rails
    const railMat = materials.metal
    for (const sx of [-1, 1]) {
      for (const sz of [-1, 1]) {
        const rail = new THREE.Mesh(new THREE.BoxGeometry(0.1, h, 0.1), railMat)
        rail.position.set(sx * (w / 2 - 0.04), h / 2, sz * (d / 2 - 0.04))
        group.add(rail)
      }
    }
    const stripMat = accent === 'orange' ? materials.orange : materials.cyan
    for (const sy of [0.22, 0.72]) {
      const strip = new THREE.Mesh(new THREE.BoxGeometry(w * 0.72, 0.035, 0.02), stripMat)
      strip.position.set(0, h * sy, d / 2 + 0.015)
      group.add(strip)
    }
    const labelTex = createSignTexture(String(randInt(12, 99)).padStart(2, '0'), 'CARGO', accent === 'orange' ? '#ff9c45' : '#42e8ff')
    const label = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.42, w * 0.21), new THREE.MeshBasicMaterial({ map: labelTex, toneMapped: false }))
    label.position.set(0, h * 0.48, d / 2 + 0.021)
    group.add(label)
    const hazard = makeHazardPlane(w * 0.56, 0.18, hazardTex)
    hazard.position.set(0, 0.08, d / 2 + 0.023)
    group.add(hazard)
    group.traverse((o) => { if (o.isMesh) hitMeshes.push(o) })
    scene.add(group)
    addCollider(x, z, w, d, h, rot)
    return group
  }

  const cargoLayout = [
    [-17, 10, 3.4, 2.6, 3.0, 0.12, 'cyan'],
    [15, 10, 3.8, 2.2, 3.0, -0.08, 'orange'],
    [-23, 1, 4.2, 3.0, 2.8, 1.48, 'orange'],
    [23, -2, 3.2, 3.4, 3.2, 0.34, 'cyan'],
    [-10, -16, 4.0, 2.3, 2.6, 0.08, 'orange'],
    [12, -17, 3.4, 2.7, 3.5, -0.22, 'cyan'],
    [-29, -15, 3.4, 2.5, 3.0, 0.9, 'cyan'],
    [29, 16, 3.5, 2.5, 3.1, -0.72, 'orange'],
    [4, -30, 4.8, 2.6, 3.0, 0.02, 'cyan'],
    [-6, 27, 4.0, 2.4, 2.8, -0.16, 'orange']
  ]
  for (const args of cargoLayout) createCargo(...args)

  // Low blast barriers
  function createBarrier(x, z, w, rot = 0) {
    const group = new THREE.Group()
    group.position.set(x, 0, z)
    group.rotation.y = rot
    const body = new THREE.Mesh(new THREE.BoxGeometry(w, 1.15, 0.55), materials.darkMetal)
    body.position.y = 0.575
    body.castShadow = true
    group.add(body)
    const top = new THREE.Mesh(new THREE.BoxGeometry(w + 0.1, 0.1, 0.66), materials.metal)
    top.position.y = 1.18
    group.add(top)
    const hazard = makeHazardPlane(w * 0.8, 0.34, hazardTex)
    hazard.position.set(0, 0.52, 0.286)
    group.add(hazard)
    const light = new THREE.Mesh(new THREE.BoxGeometry(w * 0.46, 0.035, 0.02), materials.cyan)
    light.position.set(0, 0.94, 0.288)
    group.add(light)
    const feet = new THREE.Mesh(new THREE.BoxGeometry(w * 0.9, 0.08, 1.1), materials.metal)
    feet.position.y = 0.04
    group.add(feet)
    group.traverse((o) => { if (o.isMesh) hitMeshes.push(o) })
    scene.add(group)
    addCollider(x, z, w, 1.1, 1.2, rot)
  }
  const barriers = [
    [-7, 17, 4.4, 0.03], [7.5, 17.4, 3.6, -0.02],
    [-20, 24, 4.8, 0.5], [19, 25, 4.2, -0.4],
    [-16, -9, 3.2, 1.1], [17, -7, 3.4, 0.8],
    [0, 34, 5.4, 0], [-28, 7, 3.0, 1.5], [28, 5, 3.2, 1.55]
  ]
  for (const b of barriers) createBarrier(...b)

  // ----- Support pylons -----
  for (const [x, z] of [[-34, -32], [34, -33], [-35, 32], [35, 33]]) {
    const pylon = new THREE.Group()
    pylon.position.set(x, 0, z)
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.5, 6.8, 6), materials.darkMetal)
    stem.position.y = 3.4
    stem.castShadow = true
    pylon.add(stem)
    const band = new THREE.Mesh(new THREE.CylinderGeometry(1.16, 1.16, 0.12, 6), materials.red)
    band.position.y = 5.2
    pylon.add(band)
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.0, 0.4, 6), materials.metal)
    cap.position.y = 6.9
    pylon.add(cap)
    const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.24, 10, 8), materials.red)
    beacon.position.y = 7.25
    pylon.add(beacon)
    pylon.traverse((o) => { if (o.isMesh) hitMeshes.push(o) })
    scene.add(pylon)
    addCollider(x, z, 3, 3, 7)
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: makeGlowTexture(64), color: 0xff3344, transparent: true, opacity: 0.5,
      blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false
    }))
    glow.scale.set(2.4, 2.4, 1)
    glow.position.set(x, 7.25, z)
    scene.add(glow)
  }

  // ----- Spawn portals -----
  const portalPositions = []
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * TAU + Math.PI / 8
    portalPositions.push(new THREE.Vector3(Math.cos(angle) * 36, 0, Math.sin(angle) * 36))
  }
  for (const pos of portalPositions) {
    const group = new THREE.Group()
    group.position.set(pos.x, 1.65, pos.z)
    group.lookAt(0, 1.65, 0)
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.55, 0.05, 8, 64),
      new THREE.MeshBasicMaterial({
        color: 0xff3ccf, transparent: true, opacity: 0.2,
        blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false
      })
    )
    group.add(ring)
    const halo = new THREE.Mesh(
      new THREE.CircleGeometry(1.5, 40),
      new THREE.MeshBasicMaterial({
        color: 0x9d2dff, transparent: true, opacity: 0.045,
        side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false
      })
    )
    group.add(halo)
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: makeGlowTexture(96), color: 0xea38c8, transparent: true, opacity: 0.16,
      blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false
    }))
    glow.scale.set(5, 5, 1)
    group.add(glow)
    scene.add(group)
    portalData.push({ group, ring, halo, glow, active: 0, phase: rand(0, TAU) })
  }

  // ----- Atmospheric dust -----
  function makeDust(count, color, size, radius, yRange, opacity) {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const a = rand(0, TAU)
      const r = Math.sqrt(Math.random()) * radius
      positions[i * 3] = Math.cos(a) * r
      positions[i * 3 + 1] = rand(yRange[0], yRange[1])
      positions[i * 3 + 2] = Math.sin(a) * r
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const mat = new THREE.PointsMaterial({
      color, size, map: makeGlowTexture(64), transparent: true, opacity,
      depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true, toneMapped: false
    })
    const points = new THREE.Points(geo, mat)
    points.frustumCulled = false
    scene.add(points)
    return points
  }
  const dust = makeDust(420, 0x78eaff, 0.09, 43, [0.4, 12], 0.34)
  const embers = makeDust(180, 0xff9446, 0.13, 28, [0.5, 7], 0.42)
  updatables.push((dt, t) => {
    dust.rotation.y += dt * 0.005
    dust.position.y = Math.sin(t * 0.2) * 0.3
    embers.rotation.y -= dt * 0.009
    embers.position.y = Math.cos(t * 0.3) * 0.25
  })

  // Light shafts behind signage
  const beamMat = new THREE.MeshBasicMaterial({
    color: 0x36d8f0, transparent: true, opacity: 0.025, side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false
  })
  for (const [x, z, rot] of [[-20, -42, 0], [20, -42, 0], [-42, 14, Math.PI / 2], [42, -12, Math.PI / 2]]) {
    const beam = new THREE.Mesh(new THREE.ConeGeometry(4, 14, 16, 1, true), beamMat)
    beam.position.set(x, 6.8, z)
    beam.rotation.z = Math.PI
    beam.rotation.y = rot
    scene.add(beam)
  }

  // Portal glow under-lights on floor
  for (const pos of portalPositions) {
    const pool = new THREE.Mesh(
      new THREE.CircleGeometry(2.2, 40),
      new THREE.MeshBasicMaterial({
        color: 0xc72eb8, transparent: true, opacity: 0.07,
        blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false
      })
    )
    pool.rotation.x = -Math.PI / 2
    pool.position.set(pos.x, 0.028, pos.z)
    scene.add(pool)
  }

  // Decorative wall lamps
  const lampMat = new THREE.MeshBasicMaterial({ color: 0x6cf7ff, toneMapped: false })
  for (let i = 0; i < 16; i++) {
    const angle = (i / 16) * TAU
    const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.075, 8, 6), lampMat)
    lamp.position.set(Math.cos(angle) * 42, 6.3, Math.sin(angle) * 42)
    scene.add(lamp)
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: makeGlowTexture(48), color: 0x4ee9ff, transparent: true, opacity: 0.75,
      blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false
    }))
    glow.position.copy(lamp.position)
    glow.scale.set(1.1, 1.1, 1)
    scene.add(glow)
  }

  const raycaster = new THREE.Raycaster()

  function isBlocked(from, to, margin = 0.4) {
    const dir = new THREE.Vector3().subVectors(to, from)
    const dist = dir.length()
    if (dist < 0.001) return false
    dir.normalize()
    raycaster.set(from, dir)
    raycaster.near = 0.2
    raycaster.far = dist - margin
    const hit = raycaster.intersectObjects(hitMeshes, false)
    return hit.length > 0
  }

  function raycast(raycasterRef) {
    return raycasterRef.intersectObjects(hitMeshes, false)
  }

  function spawnPoint(index) {
    const p = portalPositions[index % portalPositions.length]
    const dir = new THREE.Vector3(-p.x, 0, -p.z).normalize()
    return { position: new THREE.Vector3(p.x + dir.x * 2.2, 0, p.z + dir.z * 2.2), portal: index % portalPositions.length }
  }

  function activatePortal(index) {
    const p = portalData[index]
    if (p) p.active = 1.4
  }

  function update(dt, elapsed) {
    for (const fn of updatables) fn(dt, elapsed)
    let i = 0
    for (const p of portalData) {
      p.phase += dt * (1.2 + i * 0.02)
      p.ring.rotation.z += dt * 0.4
      if (p.active > 0) {
        p.active = Math.max(0, p.active - dt)
        const k = clamp(p.active / 1.4, 0, 1)
        p.ring.material.opacity = 0.2 + k * 0.8
        p.halo.material.opacity = 0.045 + k * 0.2
        p.glow.material.opacity = 0.16 + k * 0.9
        p.group.scale.setScalar(1 + Math.sin((1 - k) * Math.PI) * 0.32)
      } else {
        p.ring.material.opacity = 0.14 + Math.sin(p.phase) * 0.035
        p.halo.material.opacity = 0.028 + Math.sin(p.phase * 0.7) * 0.01
        p.glow.material.opacity = 0.12 + Math.sin(p.phase * 0.9) * 0.035
        p.group.scale.lerp(new THREE.Vector3(1, 1, 1), 0.08)
      }
      i++
    }
    planetGroup.rotation.y += dt * 0.002
    fill.intensity = 175 + Math.sin(elapsed * 1.7) * 10
    magentaLight.intensity = 92 + Math.sin(elapsed * 0.9 + 1) * 12
    coreLight.intensity = 58 + Math.sin(elapsed * 3.1) * 8
  }

  return {
    colliders,
    portalPositions,
    spawnPoint,
    activatePortal,
    isBlocked,
    raycast,
    hitMeshes,
    update,
    materials,
    portalCount: portalData.length
  }
}
