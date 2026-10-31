export class AudioEngine {
  constructor() {
    this.ctx = null
    this.master = null
    this.enabled = true
    this.noiseBuffer = null
    this.ambient = null
    this.started = false
  }

  init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume()
      return
    }
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return
    this.ctx = new Ctx()
    this.master = this.ctx.createGain()
    this.master.gain.value = this.enabled ? 0.62 : 0
    const comp = this.ctx.createDynamicsCompressor()
    comp.threshold.value = -16
    comp.knee.value = 22
    comp.ratio.value = 5
    comp.attack.value = 0.002
    comp.release.value = 0.22
    this.master.connect(comp)
    comp.connect(this.ctx.destination)
    this.noiseBuffer = this.createNoiseBuffer(1.2)
    this.startAmbient()
  }

  createNoiseBuffer(seconds = 1) {
    const length = Math.max(1, Math.floor(this.ctx.sampleRate * seconds))
    const buffer = this.ctx.createBuffer(1, length, this.ctx.sampleRate)
    const data = buffer.getChannelData(0)
    let last = 0
    for (let i = 0; i < length; i++) {
      const white = Math.random() * 2 - 1
      last = (last + 0.02 * white) / 1.02
      data[i] = last * 3.5
    }
    return buffer
  }

  get now() {
    return this.ctx ? this.ctx.currentTime : 0
  }

  setEnabled(value) {
    this.enabled = value
    if (this.master && this.ctx) {
      this.master.gain.cancelScheduledValues(this.ctx.currentTime)
      this.master.gain.linearRampToValueAtTime(value ? 0.62 : 0, this.ctx.currentTime + 0.08)
    }
  }

  toggle() {
    this.setEnabled(!this.enabled)
    return this.enabled
  }

  startAmbient() {
    if (!this.ctx || this.started) return
    this.started = true
    const ctx = this.ctx
    const bus = ctx.createGain()
    bus.gain.value = 0.0
    bus.connect(this.master)
    bus.gain.linearRampToValueAtTime(0.55, ctx.currentTime + 4)
    this.ambient = bus

    const drone1 = ctx.createOscillator()
    const drone2 = ctx.createOscillator()
    const drone3 = ctx.createOscillator()
    drone1.type = 'sine'
    drone2.type = 'triangle'
    drone3.type = 'sine'
    drone1.frequency.value = 43.65
    drone2.frequency.value = 65.4
    drone3.frequency.value = 87.3
    const dg1 = ctx.createGain(); dg1.gain.value = 0.035
    const dg2 = ctx.createGain(); dg2.gain.value = 0.008
    const dg3 = ctx.createGain(); dg3.gain.value = 0.005
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 220
    filter.Q.value = 2
    drone1.connect(dg1); drone2.connect(dg2); drone3.connect(dg3)
    dg1.connect(filter); dg2.connect(filter); dg3.connect(filter)
    filter.connect(bus)
    drone1.start(); drone2.start(); drone3.start()

    // Air / wind bed
    const noise = ctx.createBufferSource()
    noise.buffer = this.noiseBuffer
    noise.loop = true
    const nf = ctx.createBiquadFilter()
    nf.type = 'bandpass'
    nf.frequency.value = 380
    nf.Q.value = 0.55
    const ng = ctx.createGain()
    ng.gain.value = 0.018
    noise.connect(nf); nf.connect(ng); ng.connect(bus)
    noise.start()

    // Slow pulse modulated by an LFO
    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    lfo.frequency.value = 0.075
    lfoGain.gain.value = 0.013
    lfo.connect(lfoGain); lfoGain.connect(dg1.gain)
    lfo.start()

    this.drones = [drone1, drone2, drone3, lfo, noise]
  }

  makeNoise(duration = 0.2, gain = 0.1, filterType = 'lowpass', frequency = 1000, q = 0.8, when = 0) {
    if (!this.ctx) return
    const t = this.now + when
    const src = this.ctx.createBufferSource()
    src.buffer = this.noiseBuffer
    const filter = this.ctx.createBiquadFilter()
    filter.type = filterType
    filter.frequency.setValueAtTime(frequency, t)
    filter.Q.value = q
    const g = this.ctx.createGain()
    g.gain.setValueAtTime(gain, t)
    g.gain.exponentialRampToValueAtTime(0.0001, t + duration)
    src.connect(filter); filter.connect(g); g.connect(this.master)
    src.start(t)
    src.stop(t + duration + 0.02)
  }

  tone(freq, endFreq, duration, gain = 0.07, type = 'sine', when = 0) {
    if (!this.ctx) return
    const t = this.now + when
    const osc = this.ctx.createOscillator()
    const g = this.ctx.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(freq, t)
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), t + duration)
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(gain, t + 0.006)
    g.gain.exponentialRampToValueAtTime(0.0001, t + duration)
    osc.connect(g); g.connect(this.master)
    osc.start(t)
    osc.stop(t + duration + 0.02)
  }

  shoot() {
    this.makeNoise(0.085, 0.17, 'bandpass', 1150, 0.7)
    this.makeNoise(0.16, 0.09, 'lowpass', 340, 0.8)
    this.tone(180, 55, 0.1, 0.06, 'square')
    this.tone(880, 240, 0.035, 0.02, 'sawtooth')
  }

  enemyShoot(distant = 1) {
    const v = Math.max(0.25, Math.min(1, distant))
    this.tone(820, 180, 0.24, 0.042 * v, 'sine')
    this.tone(430, 110, 0.3, 0.022 * v, 'triangle')
  }

  hit(crit = false) {
    this.tone(crit ? 1420 : 980, crit ? 760 : 620, 0.045, 0.032, 'square')
    this.makeNoise(0.035, 0.025, 'highpass', 2600)
  }

  kill(big = false) {
    this.makeNoise(big ? 0.65 : 0.42, big ? 0.24 : 0.17, 'lowpass', big ? 320 : 550, 0.9)
    this.tone(big ? 92 : 130, 34, big ? 0.55 : 0.37, big ? 0.16 : 0.11, 'sine')
    this.tone(420, 95, 0.22, 0.04, 'sawtooth')
  }

  reload() {
    this.makeNoise(0.05, 0.055, 'highpass', 2300)
    this.tone(320, 280, 0.04, 0.028, 'square', 0.05)
    this.makeNoise(0.07, 0.06, 'bandpass', 1600, 1.5, 0.62)
    this.tone(520, 470, 0.05, 0.025, 'square', 0.72)
  }

  empty() {
    this.tone(1180, 900, 0.035, 0.025, 'square')
    this.makeNoise(0.02, 0.035, 'highpass', 1800)
  }

  hurt() {
    this.makeNoise(0.22, 0.11, 'lowpass', 420, 1)
    this.tone(68, 42, 0.28, 0.1, 'sine')
    this.tone(240, 120, 0.18, 0.035, 'triangle')
  }

  pickup() {
    this.tone(523, 523, 0.09, 0.035, 'sine')
    this.tone(784, 784, 0.09, 0.03, 'sine', 0.08)
    this.tone(1046, 1046, 0.16, 0.028, 'sine', 0.16)
  }

  waveStart(wave) {
    const base = 180 + Math.min(wave, 8) * 14
    this.tone(base, base, 0.24, 0.06, 'sawtooth')
    this.tone(base * 1.5, base * 1.5, 0.32, 0.04, 'triangle', 0.18)
    this.makeNoise(0.5, 0.055, 'bandpass', 500, 0.8, 0.05)
  }

  waveClear() {
    this.tone(392, 392, 0.18, 0.045, 'sine')
    this.tone(523, 523, 0.2, 0.045, 'sine', 0.14)
    this.tone(784, 784, 0.4, 0.05, 'sine', 0.3)
    this.makeNoise(0.3, 0.035, 'highpass', 2400, 0.5, 0.3)
  }

  gameOver() {
    this.tone(220, 55, 1.8, 0.12, 'sawtooth')
    this.tone(110, 28, 2.4, 0.1, 'sine')
    this.makeNoise(1.4, 0.1, 'lowpass', 220, 0.7)
  }

  step() {
    this.makeNoise(0.055, 0.022, 'bandpass', 260 + Math.random() * 120, 1.2)
  }

  ui() {
    this.tone(900, 1120, 0.04, 0.018, 'sine')
  }

  portal() {
    this.tone(160, 720, 0.3, 0.025, 'sine')
    this.tone(240, 1080, 0.25, 0.018, 'triangle')
  }

  dispose() {
    if (this.drones) for (const d of this.drones) { try { d.stop() } catch { /* noop */ } }
    if (this.ctx) this.ctx.close()
  }
}
