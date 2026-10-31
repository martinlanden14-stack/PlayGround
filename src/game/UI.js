const $ = (sel) => document.querySelector(sel)
const $$ = (sel) => [...document.querySelectorAll(sel)]

export class UI {
  constructor(callbacks = {}) {
    this.cb = callbacks
    this.healthTarget = { p: 1, e: 1 }
    this.healthGhost = { p: 1, e: 1 }
    this.meterTarget = { p: 0, e: 0 }
    this.announceTimer = null
    this.comboTimer = null
    this.axis = 0
    this.joystickPointer = null
    this.blocking = false
    this.currentScreen = 'title'
    this.previousScreen = 'title'
    this.soundOn = true

    this.el = {
      hud: $('#hud'), touch: $('#touch-controls'), desktop: $('#desktop-hints'),
      title: $('#title-screen'), select: $('#select-screen'), result: $('#result-screen'),
      pause: $('#pause-screen'), how: $('#how-screen'),
      loading: $('#loading-screen'), loaderBar: $('#loader-bar'),
      pHealth: $('#p-health'), eHealth: $('#e-health'),
      pGhost: $('#p-health-ghost'), eGhost: $('#e-health-ghost'),
      pSuper: $('#p-super'), eSuper: $('#e-super'),
      pName: $('#p-name'), eName: $('#e-name'),
      pSuperLabel: $('#p-super-label'), eSuperLabel: $('#e-super-label'),
      pRounds: $('#p-rounds'), eRounds: $('#e-rounds'),
      timer: $('#timer'), roundLabel: $('#round-label'), timerRing: $('.timer-ring'),
      announcer: $('#announcer'), announceKicker: $('#announce-kicker'),
      announceMain: $('#announce-main'), announceSub: $('#announce-sub'),
      combo: $('#combo-display'), comboCount: $('#combo-count'),
      prompt: $('#execution-prompt'),
      flash: $('#flash'), blood: $('#blood-vignette'),
      joystick: $('#joystick'), knob: $('#joystick-knob'),
      sound: $('#sound-toggle'), sound2: $('#sound-toggle-2'),
      quality: $('#quality-toggle'),
      resultTitle: $('#result-title'), resultKicker: $('#result-kicker'), resultSub: $('#result-subtitle'),
      statTime: $('#stat-time'), statCombo: $('#stat-combo'), statDamage: $('#stat-damage'),
    }

    this.bindButtons()
    this.bindJoystick()
    this.bindKeyboard()
    this.bindActionButtons()
    this.setupScreenState()
  }

  bindButtons() {
    const on = (id, fn) => $(id)?.addEventListener('click', (e) => { e.preventDefault(); this.cb.onUi?.(); fn(e) })
    on('#play-now', () => this.cb.onPlay?.())
    on('#choose-fighter', () => this.cb.onChoose?.())
    on('#select-back', () => this.cb.onSelectBack?.())
    on('#enter-arena', () => this.cb.onEnterArena?.())
    on('#rematch', () => this.cb.onRematch?.())
    on('#result-select', () => this.cb.onResultSelect?.())
    on('#result-menu', () => this.cb.onMenu?.())
    on('#resume', () => this.cb.onResume?.())
    on('#restart-round', () => this.cb.onRestart?.())
    on('#quit-fight', () => this.cb.onQuit?.())
    on('#how-to-play', () => this.cb.onHow?.())
    on('#how-close', () => this.cb.onHowClose?.())
    on('#sound-toggle', () => this.toggleSound())
    on('#sound-toggle-2', () => this.toggleSound())
    on('#quality-toggle', () => this.cb.onQuality?.())

    $$('.fighter-card').forEach((card) => {
      card.addEventListener('click', () => {
        const id = card.dataset.fighter
        this.cb.onSelectFighter?.(id)
        this.selectCard(id)
      })
    })
  }

  bindActionButtons() {
    $$('.fight-btn').forEach((btn) => {
      const action = btn.dataset.action
      const press = (e) => {
        e.preventDefault()
        e.stopPropagation()
        btn.classList.add('pressed')
        if (action === 'block') {
          this.blocking = true
          this.cb.onBlock?.(true)
        } else {
          this.cb.onAction?.(action)
          if (navigator.vibrate) navigator.vibrate(action === 'special' ? 18 : 9)
        }
        try { btn.setPointerCapture(e.pointerId) } catch {}
      }
      const release = (e) => {
        e.preventDefault()
        btn.classList.remove('pressed')
        if (action === 'block') {
          this.blocking = false
          this.cb.onBlock?.(false)
        }
      }
      btn.addEventListener('pointerdown', press)
      btn.addEventListener('pointerup', release)
      btn.addEventListener('pointercancel', release)
      btn.addEventListener('lostpointercapture', release)
    })
  }

  bindJoystick() {
    const zone = $('#move-zone')
    if (!zone) return
    const radius = 44
    const update = (e) => {
      const rect = this.el.joystick.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      let dx = e.clientX - cx
      let dy = e.clientY - cy
      const len = Math.hypot(dx, dy)
      if (len > radius) { dx = (dx / len) * radius; dy = (dy / len) * radius }
      this.el.knob.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`
      const dead = 8
      let axis = Math.abs(dx) < dead ? 0 : Math.max(-1, Math.min(1, dx / radius))
      // smooth the axis a little for touch
      this.axis += (axis - this.axis) * 0.5
      if (Math.abs(this.axis) < 0.06) this.axis = 0
      this.cb.onMove?.(this.axis)
    }
    const end = () => {
      this.joystickPointer = null
      this.el.knob.style.transform = 'translate(-50%, -50%)'
      this.axis = 0
      this.cb.onMove?.(0)
    }
    zone.addEventListener('pointerdown', (e) => {
      e.preventDefault()
      this.joystickPointer = e.pointerId
      try { zone.setPointerCapture(e.pointerId) } catch {}
      update(e)
    })
    zone.addEventListener('pointermove', (e) => {
      if (this.joystickPointer !== e.pointerId) return
      e.preventDefault()
      update(e)
    })
    zone.addEventListener('pointerup', (e) => {
      if (this.joystickPointer === e.pointerId) end()
    })
    zone.addEventListener('pointercancel', end)
    zone.addEventListener('lostpointercapture', end)
  }

  bindKeyboard() {
    const keys = new Set()
    const move = () => {
      const left = keys.has('a') || keys.has('arrowleft')
      const right = keys.has('d') || keys.has('arrowright')
      this.cb.onMove?.((right ? 1 : 0) - (left ? 1 : 0))
    }
    const action = (key) => {
      if (key === 'j') this.cb.onAction?.('punch')
      else if (key === 'k') this.cb.onAction?.('kick')
      else if (key === 'u' || key === 'i') this.cb.onAction?.('special')
      else if (key === 'w' || key === ' ' || key === 'arrowup') this.cb.onAction?.('jump')
      else if (key === 'l') { if (!this.blocking) { this.blocking = true; this.cb.onBlock?.(true) } }
      else if (key === 'escape' || key === 'p') this.cb.onPause?.()
    }
    window.addEventListener('keydown', (e) => {
      const key = e.key.toLowerCase()
      if (['a','d','arrowleft','arrowright','w',' ','arrowup','j','k','l','u','i','escape','p'].includes(key)) e.preventDefault()
      if (e.repeat) return
      if (['a','d','arrowleft','arrowright'].includes(key)) { keys.add(key); move() }
      else action(key)
    })
    window.addEventListener('keyup', (e) => {
      const key = e.key.toLowerCase()
      if (['a','d','arrowleft','arrowright'].includes(key)) { keys.delete(key); move() }
      if (key === 'l' && this.blocking) { this.blocking = false; this.cb.onBlock?.(false) }
    })
    window.addEventListener('blur', () => {
      keys.clear()
      this.axis = 0
      this.cb.onMove?.(0)
      if (this.blocking) { this.blocking = false; this.cb.onBlock?.(false) }
    })
  }

  setupScreenState() {
    this.el.loading?.classList.remove('done')
  }

  activate(id) {
    for (const el of [this.el.title, this.el.select, this.el.result, this.el.pause, this.el.how]) {
      el?.classList.toggle('is-active', el.id === id)
    }
    this.currentScreen = id
  }

  hideAllScreens() {
    for (const el of [this.el.title, this.el.select, this.el.result, this.el.pause, this.el.how]) {
      el?.classList.remove('is-active')
    }
    this.currentScreen = 'fight'
  }

  showTitle() {
    this.activate('title-screen')
    this.el.hud?.classList.add('is-hidden')
    this.el.touch?.classList.add('is-hidden')
    this.el.desktop?.classList.add('is-hidden')
    this.el.prompt?.classList.add('is-hidden')
    this.el.combo?.classList.remove('show')
    this.el.blood?.classList.remove('on')
  }

  showSelect() {
    this.activate('select-screen')
    this.el.hud?.classList.add('is-hidden')
    this.el.touch?.classList.add('is-hidden')
    this.el.desktop?.classList.add('is-hidden')
    this.el.prompt?.classList.add('is-hidden')
  }

  showHow() {
    this.previousScreen = this.currentScreen
    this.activate('how-screen')
  }

  closeHow() {
    this.activate(this.previousScreen === 'select-screen' ? 'select-screen' : 'title-screen')
  }

  showFight() {
    this.hideAllScreens()
    this.el.hud?.classList.remove('is-hidden')
    const coarse = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1000
    this.el.touch?.classList.toggle('is-hidden', !coarse)
    this.el.desktop?.classList.toggle('is-hidden', coarse)
    this.el.prompt?.classList.add('is-hidden')
    this.el.blood?.classList.remove('on')
  }

  showPause() {
    this.previousScreen = this.currentScreen
    this.activate('pause-screen')
    this.el.touch?.classList.add('is-hidden')
    this.el.desktop?.classList.add('is-hidden')
  }

  hidePause() {
    this.hideAllScreens()
    this.el.touch?.classList.toggle('is-hidden', !(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1000))
    this.el.desktop?.classList.toggle('is-hidden', window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1000)
  }

  showResult({ win, time, maxCombo, damage, playerName, enemyName }) {
    this.activate('result-screen')
    this.el.hud?.classList.add('is-hidden')
    this.el.touch?.classList.add('is-hidden')
    this.el.desktop?.classList.add('is-hidden')
    this.el.prompt?.classList.add('is-hidden')
    this.el.result.classList.toggle('is-defeat', !win)
    this.el.resultKicker.textContent = win ? 'THE NIGHT IS YOURS' : 'THE REALM CLAIMS ANOTHER'
    this.el.resultTitle.textContent = win ? 'VICTORY' : 'DEFEAT'
    this.el.resultSubtitle.textContent = win ? `${enemyName} FALLS. THE REALM REMEMBERS.` : `${playerName} FALLS. THE ASH TAKES YOU.`
    this.el.statTime.textContent = time
    this.el.statCombo.textContent = maxCombo
    this.el.statDamage.textContent = damage
  }

  selectCard(id) {
    $$('.fighter-card').forEach((card) => card.classList.toggle('is-selected', card.dataset.fighter === id))
  }

  setFighterInfo(player, enemy) {
    this.el.pName.textContent = player.name
    this.el.eName.textContent = enemy.name
    this.el.pSuperLabel.textContent = player.specialName.split(' ')[0]
    this.el.eSuperLabel.textContent = enemy.specialName.split(' ')[0]
  }

  setPortrait(id, dataUrl) {
    const el = $(`#portrait-${id}`)
    if (el) el.style.backgroundImage = `url("${dataUrl}")`
  }

  setHealth(side, ratio) {
    this.healthTarget[side] = Math.max(0, Math.min(1, ratio))
    if (this.healthGhost[side] < this.healthTarget[side]) this.healthGhost[side] = this.healthTarget[side]
  }

  setMeter(side, ratio) {
    this.meterTarget[side] = Math.max(0, Math.min(1, ratio))
    const el = side === 'p' ? this.el.pSuper : this.el.eSuper
    if (el) {
      el.style.width = `${this.meterTarget[side] * 100}%`
      el.classList.toggle('full', this.meterTarget[side] >= 0.999)
    }
    if (side === 'p') {
      $$('.fight-btn').find((b) => b.dataset.action === 'special')?.classList.toggle('ready', this.meterTarget.p >= 0.999)
    }
  }

  setTimer(value) {
    const n = Math.max(0, Math.ceil(value))
    this.el.timer.textContent = String(n).padStart(2, '0')
    this.el.timerRing.classList.toggle('urgent', n <= 10)
  }

  setRound(round) {
    this.el.roundLabel.textContent = `ROUND ${round}`
  }

  setRoundPips(side, wins) {
    const pips = side === 'p' ? this.el.pRounds : this.el.eRounds
    ;[...pips.children].forEach((p, i) => p.classList.toggle('won', i < wins))
  }

  announce(main, sub = '', kicker = '', duration = 2100) {
    clearTimeout(this.announceTimer)
    this.el.announceKicker.textContent = kicker
    this.el.announceMain.textContent = main
    this.el.announceSub.textContent = sub
    this.el.announcer.classList.remove('show')
    void this.el.announcer.offsetWidth
    this.el.announcer.classList.add('show')
    this.announceTimer = setTimeout(() => this.el.announcer.classList.remove('show'), duration)
  }

  combo(count) {
    if (count < 2) { this.el.combo.classList.remove('show'); return }
    clearTimeout(this.comboTimer)
    this.el.comboCount.textContent = count
    this.el.combo.classList.remove('show')
    void this.el.combo.offsetWidth
    this.el.combo.classList.add('show')
    this.comboTimer = setTimeout(() => this.el.combo.classList.remove('show'), 1500)
  }

  showPrompt() { this.el.prompt.classList.remove('is-hidden') }
  hidePrompt() { this.el.prompt.classList.add('is-hidden') }

  flash(color = '#fff') {
    this.el.flash.style.background = color
    this.el.flash.classList.remove('flash')
    void this.el.flash.offsetWidth
    this.el.flash.classList.add('flash')
  }

  setBlood(on) { this.el.blood.classList.toggle('on', on) }

  damageNumber(text, x, y, color = '#ffdba0') {
    const el = document.createElement('span')
    el.className = 'damage-number'
    el.textContent = text
    el.style.left = `${x}px`
    el.style.top = `${y}px`
    el.style.color = color
    document.body.appendChild(el)
    setTimeout(() => el.remove(), 850)
  }

  toggleSound() {
    this.soundOn = !this.soundOn
    this.cb.onSoundToggle?.(this.soundOn)
    this.el.sound.textContent = `SOUND ${this.soundOn ? 'ON' : 'OFF'}`
    if (this.el.sound2) this.el.sound2.innerHTML = `SOUND: <span>${this.soundOn ? 'ON' : 'OFF'}</span>`
  }

  setQuality(label) {
    if (this.el.quality) this.el.quality.innerHTML = `QUALITY: <span>${label}</span>`
  }

  setLoading(pct) {
    if (this.el.loaderBar) this.el.loaderBar.style.width = `${Math.max(8, pct)}%`
  }

  hideLoading() {
    this.setLoading(100)
    setTimeout(() => this.el.loading?.classList.add('done'), 180)
  }

  update(dt) {
    for (const side of ['p', 'e']) {
      const target = this.healthTarget[side]
      if (this.healthGhost[side] > target) {
        this.healthGhost[side] = Math.max(target, this.healthGhost[side] - dt * 0.65)
      } else {
        this.healthGhost[side] = target
      }
      const fill = side === 'p' ? this.el.pHealth : this.el.eHealth
      const ghost = side === 'p' ? this.el.pGhost : this.el.eGhost
      if (fill) fill.style.width = `${target * 100}%`
      if (ghost) ghost.style.width = `${this.healthGhost[side] * 100}%`
    }
  }
}
