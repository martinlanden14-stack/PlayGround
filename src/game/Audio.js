export class AudioEngine {
  constructor() {
    this.ctx = null
    this.master = null
    this.musicGain = null
    this.sfxGain = null
    this.reverb = null
    this.started = false
    this.muted = false
    this.musicTimer = null
    this.step = 0
    this.nextNote = 0
  }

  async unlock() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') await this.ctx.resume()
      return
    }
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return
    this.ctx = new Ctx()
    const ctx = this.ctx
    this.master = ctx.createGain()
    this.master.gain.value = this.muted ? 0 : 0.65
    this.master.connect(ctx.destination)
    const comp = ctx.createDynamicsCompressor()
    comp.threshold.value = -16
    comp.knee.value = 18
    comp.ratio.value = 5
    comp.attack.value = 0.003
    comp.release.value = 0.25
    comp.connect(this.master)
    this.bus = comp
    this.musicGain = ctx.createGain()
    this.musicGain.gain.value = 0.18
    this.musicGain.connect(comp)
    this.sfxGain = ctx.createGain()
    this.sfxGain.gain.value = 0.55
    this.sfxGain.connect(comp)

    this.reverb = ctx.createConvolver()
    this.reverb.buffer = this.makeImpulse(2.2, 2.4)
    const wet = ctx.createGain()
    wet.gain.value = 0.34
    this.reverb.connect(wet)
    wet.connect(comp)

    if (ctx.state === 'suspended') await ctx.resume()
    this.startAmbience()
    this.startMusic()
    this.started = true
  }

  makeImpulse(seconds, decay) {
    const ctx = this.ctx
    const rate = ctx.sampleRate
    const length = Math.floor(rate * seconds)
    const buffer = ctx.createBuffer(2, length, rate)
    for (let c = 0; c < 2; c++) {
      const data = buffer.getChannelData(c)
      for (let i = 0; i < length; i++) {
        const t = i / length
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, decay) * (1 - t * 0.2)
      }
    }
    return buffer
  }

  noiseBuffer(seconds = 1) {
    const ctx = this.ctx
    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * seconds), ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
    return buffer
  }

  startAmbience() {
    const ctx = this.ctx
    const noise = ctx.createBufferSource()
    noise.buffer = this.noiseBuffer(4)
    noise.loop = true
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 280
    filter.Q.value = 0.8
    const gain = ctx.createGain()
    gain.gain.value = 0.035
    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    lfo.frequency.value = 0.07
    lfoGain.gain.value = 0.018
    lfo.connect(lfoGain)
    lfoGain.connect(gain.gain)
    noise.connect(filter)
    filter.connect(gain)
    gain.connect(this.musicGain)
    noise.start()
    lfo.start()

    // low realm drone
    for (const [freq, vol] of [[36.5, 0.035], [54.8, 0.018], [73.2, 0.009]]) {
      const osc = ctx.createOscillator()
      osc.type = 'sine'
      osc.frequency.value = freq
      const g = ctx.createGain()
      g.gain.value = vol
      const trem = ctx.createOscillator()
      trem.frequency.value = 0.05 + Math.random() * 0.08
      const tg = ctx.createGain()
      tg.gain.value = vol * 0.45
      trem.connect(tg)
      tg.connect(g.gain)
      osc.connect(g)
      g.connect(this.musicGain)
      osc.start()
      trem.start()
    }
  }

  startMusic() {
    this.nextNote = this.ctx.currentTime + 0.2
    this.musicTimer = setInterval(() => this.scheduleMusic(), 180)
  }

  scheduleMusic() {
    if (!this.ctx || this.ctx.state !== 'running') return
    const ctx = this.ctx
    while (this.nextNote < ctx.currentTime + 0.5) {
      const t = this.nextNote
      const beat = this.step % 16
      const bar = Math.floor(this.step / 16) % 8
      // taiko pattern
      if (beat === 0 || beat === 6 || beat === 10) this.drum(t, beat === 0 ? 1 : 0.62)
      if (beat === 12 && bar % 2 === 0) this.drum(t, 0.42)
      if (beat === 3 || beat === 11) this.metalTick(t, 0.22)
      if (beat === 8 && bar % 4 === 3) this.gong(t)
      if (beat === 0 && bar % 4 === 0) this.lowChoir(t)
      this.nextNote += 60 / 82 / 4
      this.step++
    }
  }

  drum(t, power = 1) {
    const ctx = this.ctx
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(96, t)
    osc.frequency.exponentialRampToValueAtTime(38, t + 0.22)
    gain.gain.setValueAtTime(0.0001, t)
    gain.gain.exponentialRampToValueAtTime(0.6 * power, t + 0.008)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.38)
    osc.connect(gain)
    gain.connect(this.musicGain)
    const send = ctx.createGain(); send.gain.value = 0.28; gain.connect(send); send.connect(this.reverb)
    osc.start(t); osc.stop(t + 0.42)
    // skin noise
    const src = ctx.createBufferSource(); src.buffer = this.noiseBuffer(0.18)
    const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 180; f.Q.value = 1.4
    const ng = ctx.createGain(); ng.gain.setValueAtTime(0.2 * power, t); ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.15)
    src.connect(f); f.connect(ng); ng.connect(this.musicGain); src.start(t)
  }

  metalTick(t, vol = 0.2) {
    const ctx = this.ctx
    const osc = ctx.createOscillator()
    const g = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.value = 1240 + Math.random() * 300
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(vol * 0.1, t + 0.004)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.3)
    osc.connect(g); g.connect(this.musicGain)
    const send = ctx.createGain(); send.gain.value = 0.4; g.connect(send); send.connect(this.reverb)
    osc.start(t); osc.stop(t + 0.32)
  }

  gong(t) {
    const ctx = this.ctx
    for (const [f, a] of [[74, 0.24], [112, 0.1], [186, 0.05], [263, 0.03]]) {
      const osc = ctx.createOscillator(); const g = ctx.createGain()
      osc.type = 'sine'; osc.frequency.value = f
      g.gain.setValueAtTime(0.0001, t)
      g.gain.exponentialRampToValueAtTime(a, t + 0.02)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 2.6)
      osc.connect(g); g.connect(this.musicGain)
      const send = ctx.createGain(); send.gain.value = 0.5; g.connect(send); send.connect(this.reverb)
      osc.start(t); osc.stop(t + 2.7)
    }
  }

  lowChoir(t) {
    const ctx = this.ctx
    for (const [f, a] of [[146.8, 0.016], [220, 0.012], [293.7, 0.008]]) {
      const osc = ctx.createOscillator(); const g = ctx.createGain()
      osc.type = 'sawtooth'; osc.frequency.value = f
      const filter = ctx.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 700
      g.gain.setValueAtTime(0.0001, t)
      g.gain.linearRampToValueAtTime(a, t + 1.2)
      g.gain.linearRampToValueAtTime(0.0001, t + 5.5)
      osc.connect(filter); filter.connect(g); g.connect(this.musicGain)
      const send = ctx.createGain(); send.gain.value = 0.6; g.connect(send); send.connect(this.reverb)
      osc.start(t); osc.stop(t + 5.6)
    }
  }

  noiseHit({ duration = 0.2, frequency = 900, q = 0.8, volume = 0.5, type = 'bandpass' } = {}) {
    if (!this.ctx) return
    const ctx = this.ctx
    const t = ctx.currentTime
    const src = ctx.createBufferSource()
    src.buffer = this.noiseBuffer(duration)
    const f = ctx.createBiquadFilter()
    f.type = type; f.frequency.value = frequency; f.Q.value = q
    const g = ctx.createGain()
    g.gain.setValueAtTime(volume, t)
    g.gain.exponentialRampToValueAtTime(0.0001, t + duration)
    src.connect(f); f.connect(g); g.connect(this.sfxGain)
    const send = ctx.createGain(); send.gain.value = 0.28; g.connect(send); send.connect(this.reverb)
    src.start(t)
  }

  tone({ frequency = 100, endFrequency = 40, duration = 0.25, volume = 0.4, type = 'sine', delay = 0 } = {}) {
    if (!this.ctx) return
    const ctx = this.ctx
    const t = ctx.currentTime + delay
    const osc = ctx.createOscillator()
    const g = ctx.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(frequency, t)
    if (endFrequency) osc.frequency.exponentialRampToValueAtTime(Math.max(1, endFrequency), t + duration)
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(volume, t + 0.008)
    g.gain.exponentialRampToValueAtTime(0.0001, t + duration)
    osc.connect(g); g.connect(this.sfxGain)
    const send = ctx.createGain(); send.gain.value = 0.24; g.connect(send); send.connect(this.reverb)
    osc.start(t); osc.stop(t + duration + 0.02)
  }

  whoosh(power = 1) {
    this.noiseHit({ duration: 0.13, frequency: 700, q: 0.5, volume: 0.16 * power, type: 'bandpass' })
  }

  punch() {
    this.noiseHit({ duration: 0.12, frequency: 1200, q: 0.6, volume: 0.35 })
    this.tone({ frequency: 120, endFrequency: 48, duration: 0.18, volume: 0.4 })
  }

  kick() {
    this.noiseHit({ duration: 0.18, frequency: 620, q: 0.5, volume: 0.4 })
    this.tone({ frequency: 94, endFrequency: 34, duration: 0.28, volume: 0.55 })
  }

  heavy() {
    this.noiseHit({ duration: 0.3, frequency: 420, q: 0.4, volume: 0.6 })
    this.tone({ frequency: 78, endFrequency: 24, duration: 0.5, volume: 0.7 })
    this.tone({ frequency: 196, endFrequency: 90, duration: 0.18, volume: 0.22, type: 'triangle' })
  }

  block() {
    this.noiseHit({ duration: 0.14, frequency: 2600, q: 1.8, volume: 0.22 })
    this.tone({ frequency: 940, endFrequency: 680, duration: 0.22, volume: 0.12, type: 'triangle' })
  }

  special() {
    if (!this.ctx) return
    this.tone({ frequency: 80, endFrequency: 420, duration: 0.6, volume: 0.28, type: 'sawtooth' })
    this.tone({ frequency: 220, endFrequency: 880, duration: 0.45, volume: 0.12, type: 'sine', delay: 0.08 })
    this.noiseHit({ duration: 0.5, frequency: 1800, q: 0.6, volume: 0.2 })
  }

  projectile() {
    this.noiseHit({ duration: 0.45, frequency: 480, q: 0.4, volume: 0.3 })
    this.tone({ frequency: 220, endFrequency: 70, duration: 0.4, volume: 0.3, type: 'sawtooth' })
  }

  ko() {
    this.tone({ frequency: 62, endFrequency: 20, duration: 1.5, volume: 0.9 })
    this.tone({ frequency: 124, endFrequency: 38, duration: 1.1, volume: 0.4, type: 'triangle', delay: 0.03 })
    this.noiseHit({ duration: 0.8, frequency: 300, q: 0.3, volume: 0.5 })
  }

  announce() {
    this.tone({ frequency: 146.8, endFrequency: 146.8, duration: 1.8, volume: 0.14, type: 'sawtooth' })
    this.tone({ frequency: 220, endFrequency: 220, duration: 1.8, volume: 0.1, type: 'sawtooth' })
    this.tone({ frequency: 73.4, endFrequency: 73.4, duration: 2.2, volume: 0.18, type: 'sine' })
  }

  ui() {
    this.tone({ frequency: 660, endFrequency: 440, duration: 0.08, volume: 0.08, type: 'triangle' })
  }

  step() {
    this.noiseHit({ duration: 0.06, frequency: 320, q: 0.7, volume: 0.08 })
  }

  setMuted(muted) {
    this.muted = muted
    if (this.master) this.master.gain.setTargetAtTime(muted ? 0 : 0.65, this.ctx.currentTime, 0.05)
  }

  toggleMute() {
    this.setMuted(!this.muted)
    return this.muted
  }

  stopMusic() {
    if (this.musicTimer) clearInterval(this.musicTimer)
    this.musicTimer = null
  }
}
