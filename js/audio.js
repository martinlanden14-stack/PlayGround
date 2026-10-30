/* ============================================================
   NEON BREACH — procedural audio (no assets, WebAudio)
   ============================================================ */
export class AudioBus {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.muted = false;
    this.noiseBuf = null;
    this.lastShot = 0;
  }

  init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.55;
    this.master.connect(this.ctx.destination);

    // cheap compressor to keep rapid fire from clipping
    const comp = this.ctx.createDynamicsCompressor();
    comp.threshold.value = -14;
    comp.ratio.value = 6;
    comp.connect(this.master);
    this.bus = comp;

    const len = this.ctx.sampleRate * 1.2;
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    this.noiseBuf = buf;
  }

  setMuted(m) {
    this.muted = m;
    if (this.master) {
      const t = this.ctx.currentTime;
      this.master.gain.cancelScheduledValues(t);
      this.master.gain.setTargetAtTime(m ? 0 : 0.55, t, 0.03);
    }
  }

  now() { return this.ctx ? this.ctx.currentTime : 0; }

  env(gain, t0, peak, attack, decay) {
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), t0 + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + attack + decay);
  }

  noise(dur, { type = 'bandpass', freq = 1000, q = 0.9, gain = 0.3, sweep = 0 } = {}) {
    if (!this.ctx || this.muted) return;
    const t = this.now();
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuf;
    const f = this.ctx.createBiquadFilter();
    f.type = type;
    f.frequency.setValueAtTime(freq, t);
    if (sweep) f.frequency.exponentialRampToValueAtTime(Math.max(40, freq * sweep), t + dur);
    f.Q.value = q;
    const g = this.ctx.createGain();
    this.env(g, t, gain, 0.004, dur);
    src.connect(f).connect(g).connect(this.bus);
    src.start(t, Math.random() * 0.3, dur + 0.05);
    src.stop(t + dur + 0.06);
  }

  tone(freq, dur, { type = 'sine', gain = 0.2, slide = 1, attack = 0.005, delay = 0 } = {}) {
    if (!this.ctx || this.muted) return;
    const t = this.now() + delay;
    const o = this.ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (slide !== 1) o.frequency.exponentialRampToValueAtTime(Math.max(20, freq * slide), t + dur);
    const g = this.ctx.createGain();
    this.env(g, t, gain, attack, dur);
    o.connect(g).connect(this.bus);
    o.start(t);
    o.stop(t + attack + dur + 0.03);
  }

  /* ---------------- game sounds ---------------- */
  shoot() {
    if (!this.ctx || this.muted) return;
    const t = this.now();
    if (t - this.lastShot < 0.03) return;
    this.lastShot = t;
    this.noise(0.09, { type: 'bandpass', freq: 1900, q: 0.7, gain: 0.42, sweep: 0.35 });
    this.noise(0.16, { type: 'lowpass', freq: 700, q: 1, gain: 0.22, sweep: 0.4 });
    this.tone(190, 0.1, { type: 'square', gain: 0.12, slide: 0.32 });
    this.tone(70, 0.14, { type: 'sine', gain: 0.24, slide: 0.6 });
  }

  hit() {
    this.tone(1500, 0.05, { type: 'square', gain: 0.1, slide: 1.5 });
    this.tone(2300, 0.04, { type: 'sine', gain: 0.07 });
  }

  kill() {
    this.noise(0.3, { type: 'lowpass', freq: 1200, gain: 0.26, sweep: 0.2 });
    this.tone(320, 0.26, { type: 'sawtooth', gain: 0.1, slide: 0.28 });
    this.tone(90, 0.32, { type: 'sine', gain: 0.22, slide: 0.5 });
    this.tone(1400, 0.12, { type: 'triangle', gain: 0.05, slide: 0.6, delay: 0.02 });
  }

  hurt() {
    this.noise(0.2, { type: 'lowpass', freq: 500, gain: 0.3, sweep: 0.4 });
    this.tone(110, 0.22, { type: 'sawtooth', gain: 0.16, slide: 0.6 });
  }

  reloadStart() {
    this.tone(220, 0.04, { type: 'square', gain: 0.1 });
    this.noise(0.07, { type: 'highpass', freq: 2400, gain: 0.18 });
  }
  reloadEnd() {
    this.tone(340, 0.05, { type: 'square', gain: 0.1 });
    this.noise(0.06, { type: 'bandpass', freq: 1800, gain: 0.2 });
    this.tone(760, 0.08, { type: 'triangle', gain: 0.08 });
  }
  empty() {
    this.tone(900, 0.04, { type: 'square', gain: 0.08 });
    this.tone(600, 0.04, { type: 'square', gain: 0.06, delay: 0.05 });
  }
  jump() { this.noise(0.08, { type: 'highpass', freq: 900, gain: 0.1 }); }
  land() { this.tone(80, 0.1, { type: 'sine', gain: 0.12, slide: 0.7 }); }

  wave() {
    this.tone(220, 0.5, { type: 'sawtooth', gain: 0.07, slide: 1.5, attack: 0.05 });
    this.tone(330, 0.5, { type: 'sawtooth', gain: 0.05, slide: 1.5, attack: 0.08, delay: 0.04 });
    this.tone(880, 0.18, { type: 'sine', gain: 0.06, delay: 0.15 });
  }
  cleared() {
    [523, 659, 784, 1046].forEach((f, i) => this.tone(f, 0.16, { type: 'triangle', gain: 0.08, delay: i * 0.075 }));
  }
  spawn() {
    this.noise(0.35, { type: 'bandpass', freq: 500, q: 2, gain: 0.16, sweep: 2.6 });
    this.tone(90, 0.35, { type: 'sawtooth', gain: 0.07, slide: 2.2 });
  }
  enemyShot() {
    this.tone(520, 0.16, { type: 'sawtooth', gain: 0.06, slide: 0.4 });
  }
  pickup() {
    this.tone(880, 0.08, { type: 'triangle', gain: 0.09 });
    this.tone(1320, 0.1, { type: 'triangle', gain: 0.08, delay: 0.06 });
  }
  ui() { this.tone(660, 0.05, { type: 'sine', gain: 0.07 }); }
  over() {
    this.tone(220, 1.2, { type: 'sawtooth', gain: 0.1, slide: 0.4, attack: 0.05 });
    this.tone(110, 1.4, { type: 'sine', gain: 0.16, slide: 0.5 });
    this.noise(0.9, { type: 'lowpass', freq: 700, gain: 0.1, sweep: 0.3 });
  }
}
