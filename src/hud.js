import * as THREE from 'three'
import { clamp, formatScore, pad2 } from './utils.js'

const $ = (sel) => document.querySelector(sel)

export class HUD {
  constructor() {
    this.root = $('#hud')
    this.menu = $('#menu')
    this.pauseMenu = $('#pause-menu')
    this.gameover = $('#gameover')
    this.radarCanvas = $('#radar')
    this.radarCtx = this.radarCanvas.getContext('2d')
    this.scoreEl = $('#score')
    this.waveEl = $('#wave-num')
    this.wavePips = $('#wave-pips')
    this.waveProgress = $('#wave-progress-fill')
    this.healthEl = $('#health-num')
    this.healthFill = $('#health-fill')
    this.shieldFill = $('#shield-fill')
    this.ammoEl = $('#ammo-num')
    this.ammoFill = $('#ammo-fill')
    this.weaponLabel = $('#weapon-label')
    this.ammoPanel = document.querySelector('.ammo-panel')
    this.reloadHint = $('#reload-hint')
    this.reticle = $('#reticle')
    this.hitmarker = document.querySelector('.hitmarker')
    this.vitals = document.querySelector('.vitals')
    this.damageVignette = $('#damage-vignette')
    this.damageArc = $('#damage-arc')
    this.toastEl = $('#toast')
    this.toastKicker = $('#toast-kicker')
    this.toastText = $('#toast-text')
    this.toastSub = $('#toast-sub')
    this.comboEl = $('#combo')
    this.comboMult = $('#combo-mult')
    this.bestInline = $('#best-inline')
    this.pickupPrompt = $('#pickup-prompt')
    this.killfeedEl = $('#killfeed')
    this.pauseBtn = $('#pause-btn')
    this.lastScore = -1
    this.lastWave = -1
    this.lastHealth = -1
    this.lastShield = -1
    this.lastAmmo = -1
    this.best = Number(localStorage.getItem('helix-best') || 0)
    this.bestInline.textContent = `BEST ${formatScore(this.best)}`
    this.radarClock = 0
    this.toastTimer = 0
    this.comboTimer = 0
    this.pickupTimer = 0
    this.damageNumberId = 0
    this.buildWavePips()
  }

  buildWavePips() {
    this.wavePips.innerHTML = ''
    this.pips = []
    for (let i = 0; i < 5; i++) {
      const b = document.createElement('b')
      this.wavePips.appendChild(b)
      this.pips.push(b)
    }
  }

  showHud() {
    this.root.classList.remove('is-hidden')
  }

  hideHud() {
    this.root.classList.add('is-hidden')
  }

  showMenu() {
    this.menu.classList.remove('leaving', 'is-hidden')
    this.hideHud()
    this.pauseMenu.classList.add('is-hidden')
    this.gameover.classList.add('is-hidden')
  }

  hideMenu() {
    this.menu.classList.add('leaving')
    this.showHud()
  }

  setSoundMuted(muted) {
    const btn = $('#sound-btn')
    if (btn) btn.classList.toggle('muted', muted)
  }

  setWave(wave) {
    if (wave === this.lastWave) return
    this.lastWave = wave
    this.waveEl.textContent = pad2(wave)
    this.pips.forEach((p, i) => p.classList.toggle('on', i < Math.min(5, wave)))
  }

  setWaveProgress(value) {
    this.waveProgress.style.width = `${clamp(value, 0, 1) * 100}%`
  }

  setScore(score) {
    if (score === this.lastScore) return
    this.lastScore = score
    this.scoreEl.textContent = formatScore(score)
  }

  setBest(score) {
    if (score > this.best) {
      this.best = score
      localStorage.setItem('helix-best', String(score))
    }
    this.bestInline.textContent = `BEST ${formatScore(this.best)}`
  }

  update(player, weapon) {
    const hp = Math.round(player.health)
    if (hp !== this.lastHealth) {
      this.lastHealth = hp
      this.healthEl.textContent = hp
      this.healthFill.style.width = `${clamp(hp / player.maxHealth, 0, 1) * 100}%`
      this.vitals.classList.toggle('low', hp <= 35)
    }
    const sh = Math.round(player.shield)
    if (sh !== this.lastShield) {
      this.lastShield = sh
      this.shieldFill.style.width = `${clamp(sh / player.maxShield, 0, 1) * 100}%`
    }
    const ammo = weapon.mag
    if (ammo !== this.lastAmmo || weapon.reloading !== this.lastReloading) {
      this.lastAmmo = ammo
      this.lastReloading = weapon.reloading
      this.ammoEl.textContent = weapon.reloading ? '--' : pad2(ammo)
      this.ammoFill.style.width = `${clamp(ammo / weapon.magSize, 0, 1) * 100}%`
      this.ammoPanel.classList.toggle('empty', ammo === 0 && !weapon.reloading)
      this.reloadHint.textContent = weapon.reloading ? 'RELOADING…' : 'R · RELOAD'
    }
    this.reticle.classList.toggle('ads', weapon.adsK > 0.55)
  }

  updateRadar(player, enemies, dt, pickups = []) {
    this.radarClock += dt
    if (this.radarClock < 0.055) return
    this.radarClock = 0
    const ctx = this.radarCtx
    const size = this.radarCanvas.width
    const c = size / 2
    ctx.clearRect(0, 0, size, size)
    ctx.save()
    ctx.translate(c, c)
    // rings
    ctx.strokeStyle = 'rgba(75,205,228,0.13)'
    ctx.lineWidth = 1
    for (const r of [36, 72, 100]) {
      ctx.beginPath()
      ctx.arc(0, 0, r, 0, Math.PI * 2)
      ctx.stroke()
    }
    ctx.strokeStyle = 'rgba(75,205,228,0.1)'
    ctx.beginPath()
    ctx.moveTo(-102, 0); ctx.lineTo(102, 0)
    ctx.moveTo(0, -102); ctx.lineTo(0, 102)
    ctx.stroke()
    // FOV wedge
    ctx.fillStyle = 'rgba(69,232,255,0.055)'
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.arc(0, 0, 100, -Math.PI / 2 - 0.72, -Math.PI / 2 + 0.72)
    ctx.closePath()
    ctx.fill()
    // sweep
    const sweep = this.radarClock * 20
    const angle = (performance.now() * 0.0007) % (Math.PI * 2)
    const grad = ctx.createLinearGradient(0, 0, Math.cos(angle) * 100, Math.sin(angle) * 100)
    grad.addColorStop(0, 'rgba(93,245,255,0.35)')
    grad.addColorStop(1, 'rgba(93,245,255,0)')
    ctx.strokeStyle = grad
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(Math.cos(angle) * 99, Math.sin(angle) * 99)
    ctx.stroke()

    const yaw = player.yaw
    const cos = Math.cos(yaw)
    const sin = Math.sin(yaw)
    const scale = 100 / 42
    const blips = []
    for (const e of enemies) {
      if (e.dead) continue
      const dx = e.group.position.x - player.position.x
      const dz = e.group.position.z - player.position.z
      if (Math.hypot(dx, dz) > 42) continue
      const rx = (dx * cos - dz * sin) * scale
      const ry = -(dx * -sin - dz * cos) * scale
      blips.push({ x: rx, y: ry, type: e.kind })
    }
    for (const p of pickups) {
      const dx = p.group.position.x - player.position.x
      const dz = p.group.position.z - player.position.z
      if (Math.hypot(dx, dz) > 42) continue
      blips.push({ x: (dx * cos - dz * sin) * scale, y: -(dx * -sin - dz * cos) * scale, type: 'pickup' })
    }
    for (const b of blips) {
      const d = Math.hypot(b.x, b.y)
      const k = d > 100 ? 100 / d : 1
      const x = b.x * k
      const y = b.y * k
      if (b.type === 'pickup') {
        ctx.fillStyle = 'rgba(75,255,218,0.95)'
        ctx.shadowColor = '#4bffda'
        ctx.shadowBlur = 8
        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fill()
      } else if (b.type === 'warden') {
        ctx.fillStyle = '#ff4fd8'
        ctx.shadowColor = '#ff4fd8'
        ctx.shadowBlur = 11
        ctx.fillRect(x - 4, y - 4, 8, 8)
      } else {
        ctx.fillStyle = '#ff3f55'
        ctx.shadowColor = '#ff3f55'
        ctx.shadowBlur = 9
        ctx.beginPath()
        ctx.arc(x, y, 3.2, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    ctx.shadowBlur = 0
    // player arrow
    ctx.fillStyle = '#7cffff'
    ctx.shadowColor = '#47f5ff'
    ctx.shadowBlur = 8
    ctx.beginPath()
    ctx.moveTo(0, -9)
    ctx.lineTo(6.5, 6)
    ctx.lineTo(0, 3)
    ctx.lineTo(-6.5, 6)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }

  setTarget(hasTarget) {
    this.reticle.classList.toggle('target', hasTarget)
  }

  hit(crit = false) {
    this.hitmarker.classList.remove('show', 'crit')
    void this.hitmarker.offsetWidth
    this.hitmarker.classList.add('show')
    if (crit) this.hitmarker.classList.add('crit')
  }

  damage(amount, direction = null, playerYaw = 0) {
    this.damageVignette.style.opacity = String(clamp(0.35 + amount * 0.025, 0, 0.75))
    clearTimeout(this.damageTimer)
    this.damageTimer = setTimeout(() => { this.damageVignette.style.opacity = '0' }, 180)
    this.damageArc.classList.remove('flash')
    void this.damageArc.offsetWidth
    let rotation = 0
    if (direction) {
      const angle = Math.atan2(direction.x, direction.z)
      rotation = angle - playerYaw + Math.PI
    }
    this.damageArc.style.transform = `translate(-50%, -50%) rotate(${rotation}rad)`
    this.damageArc.classList.add('flash')
  }

  damageNumber(worldPosition, amount, crit, camera) {
    const projected = worldPosition.clone().project(camera)
    if (projected.z > 1 || projected.z < -1) return
    const x = (projected.x * 0.5 + 0.5) * window.innerWidth
    const y = (-projected.y * 0.5 + 0.5) * window.innerHeight
    if (x < 0 || x > window.innerWidth || y < 0 || y > window.innerHeight) return
    const el = document.createElement('div')
    el.className = `damage-number${crit ? ' crit' : ''}`
    el.textContent = crit ? `${amount} CRIT` : String(amount)
    el.style.left = `${x}px`
    el.style.top = `${y}px`
    this.root.appendChild(el)
    setTimeout(() => el.remove(), 760)
  }

  killfeed(kind, crit) {
    const row = document.createElement('div')
    row.className = 'kill-row'
    row.innerHTML = `<b>YOU</b><span class="weapon-ico"></span><em>${crit ? 'CRITICAL' : ''}</em><span>${kind === 'warden' ? 'WARDEN' : 'WASP'} DRONE</span>`
    this.killfeedEl.appendChild(row)
    while (this.killfeedEl.children.length > 4) this.killfeedEl.firstElementChild.remove()
    setTimeout(() => {
      row.classList.add('out')
      setTimeout(() => row.remove(), 320)
    }, 2800)
  }

  toast(kicker, text, sub = '', type = '', duration = 2200) {
    this.toastKicker.textContent = kicker
    this.toastText.textContent = text
    this.toastSub.textContent = sub
    this.toastEl.className = `toast show ${type}`
    clearTimeout(this.toastTimer)
    this.toastTimer = setTimeout(() => this.toastEl.classList.remove('show'), duration)
  }

  combo(mult) {
    if (mult < 2) return
    this.comboMult.textContent = `x${mult}`
    this.comboEl.classList.add('show')
    clearTimeout(this.comboTimer)
    this.comboTimer = setTimeout(() => this.comboEl.classList.remove('show'), 1800)
  }

  pickup() {
    this.pickupPrompt.classList.add('show')
    clearTimeout(this.pickupTimer)
    this.pickupTimer = setTimeout(() => this.pickupPrompt.classList.remove('show'), 1200)
  }

  showPause(stats) {
    $('#pause-wave').textContent = pad2(stats.wave)
    $('#pause-score').textContent = formatScore(stats.score)
    $('#pause-kills').textContent = String(stats.kills)
    this.pauseMenu.classList.remove('is-hidden')
  }

  hidePause() {
    this.pauseMenu.classList.add('is-hidden')
  }

  showGameOver(stats) {
    $('#dead-wave').textContent = pad2(stats.wave)
    $('#dead-score').textContent = formatScore(stats.score)
    $('#dead-kills').textContent = String(stats.kills)
    $('#dead-acc').textContent = `${Math.round(stats.accuracy * 100)}%`
    this.gameover.classList.remove('is-hidden')
  }

  hideGameOver() {
    this.gameover.classList.add('is-hidden')
  }
}
