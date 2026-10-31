// Procedural Web Audio soundscape: every effect is synthesised, no downloads.

export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.comp = null;
    this.muted = false;
    this.started = false;
    this.lastPlayed = new Map();
    this.noiseBuf = null;
    this.ambience = null;
    this.rainGain = null;
    this.volume = 0.6;
  }

  init() {
    if (this.ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    try {
      this.ctx = new AC();
      this.comp = this.ctx.createDynamicsCompressor();
      this.comp.threshold.value = -18;
      this.comp.knee.value = 22;
      this.comp.ratio.value = 7;
      this.comp.attack.value = 0.004;
      this.comp.release.value = 0.22;
      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : this.volume;
      this.master.connect(this.comp);
      this.comp.connect(this.ctx.destination);
      this.noiseBuf = this.makeNoise(2.2, 'white');
      this.started = true;
      this.startAmbience();
    } catch {
      this.ctx = null;
    }
  }

  resume() {
    this.init();
    if (this.ctx?.state === 'suspended') this.ctx.resume().catch(() => {});
  }

  setMuted(m) {
    this.muted = m;
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(m ? 0 : this.volume, this.ctx.currentTime, 0.05);
    }
  }

  makeNoise(seconds, kind) {
    const ctx = this.ctx;
    const len = Math.floor(ctx.sampleRate * seconds);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    if (kind === 'brown') {
      let last = 0;
      for (let i = 0; i < len; i++) {
        const w = Math.random() * 2 - 1;
        last = (last + 0.02 * w) / 1.02;
        d[i] = last * 3.5;
      }
    } else {
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    }
    return buf;
  }

  startAmbience() {
    if (!this.ctx || this.ambience) return;
    const ctx = this.ctx;
    try {
      const src = ctx.createBufferSource();
      src.buffer = this.makeNoise(4, 'brown');
      src.loop = true;
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = 420;
      const g = ctx.createGain();
      g.gain.value = 0.014;
      src.connect(lp); lp.connect(g); g.connect(this.master);
      src.start();
      this.ambience = { src, g };
      // Rain layer, silent until it rains.
      const rsrc = ctx.createBufferSource();
      rsrc.buffer = this.noiseBuf;
      rsrc.loop = true;
      const hp = ctx.createBiquadFilter();
      hp.type = 'highpass';
      hp.frequency.value = 900;
      const rlp = ctx.createBiquadFilter();
      rlp.type = 'lowpass';
      rlp.frequency.value = 6500;
      const rg = ctx.createGain();
      rg.gain.value = 0;
      rsrc.connect(hp); hp.connect(rlp); rlp.connect(rg); rg.connect(this.master);
      rsrc.start();
      this.rainGain = rg;
    } catch { /* ambience is optional */ }
  }

  setRain(amount) {
    if (!this.ctx || !this.rainGain) return;
    try { this.rainGain.gain.setTargetAtTime(Math.max(0, amount) * 0.055, this.ctx.currentTime, 0.5); } catch {}
  }

  tone({ f = 440, f2 = null, dur = 0.12, type = 'sine', gain = 0.16, delay = 0, attack = 0.004, detune = 0 }) {
    const ctx = this.ctx;
    const t0 = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(f, t0);
    if (f2 != null) osc.frequency.exponentialRampToValueAtTime(Math.max(20, f2), t0 + dur);
    if (detune) osc.detune.value = detune;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, gain), t0 + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g); g.connect(this.master);
    osc.start(t0); osc.stop(t0 + dur + 0.02);
  }

  noise({ dur = 0.16, gain = 0.18, type = 'lowpass', f = 1400, f2 = null, q = 0.8, delay = 0, attack = 0.002 }) {
    const ctx = this.ctx;
    const t0 = ctx.currentTime + delay;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuf;
    src.loop = true;
    const filt = ctx.createBiquadFilter();
    filt.type = type;
    filt.frequency.setValueAtTime(f, t0);
    if (f2 != null) filt.frequency.exponentialRampToValueAtTime(Math.max(40, f2), t0 + dur);
    filt.Q.value = q;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, gain), t0 + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(filt); filt.connect(g); g.connect(this.master);
    src.start(t0); src.stop(t0 + dur + 0.03);
  }

  play(name, opts = {}) {
    if (this.muted) return;
    this.init();
    if (!this.ctx || this.ctx.state === 'suspended') { this.resume(); return; }
    const now = performance.now();
    const throttle = name === 'gunshot' || name === 'melee' || name === 'turret' ? 55 : 30;
    if ((this.lastPlayed.get(name) || 0) + throttle > now) return;
    this.lastPlayed.set(name, now);
    const dist = Math.min(1, Math.max(0, opts.distance || 0));
    const vol = 1 - dist * 0.45;
    try {
      switch (name) {
        case 'click':
          this.tone({ f: 760, f2: 520, dur: 0.045, type: 'triangle', gain: 0.05 });
          break;
        case 'select':
          this.tone({ f: 520, f2: 640, dur: 0.07, type: 'sine', gain: 0.06 });
          this.tone({ f: 780, dur: 0.05, type: 'sine', gain: 0.035, delay: 0.05 });
          break;
        case 'build':
          this.noise({ dur: 0.09, gain: 0.16 * vol, type: 'bandpass', f: 1200, q: 1.4 });
          this.tone({ f: 180, f2: 120, dur: 0.1, type: 'triangle', gain: 0.12 * vol });
          this.noise({ dur: 0.07, gain: 0.1 * vol, type: 'bandpass', f: 900, q: 2, delay: 0.08 });
          this.tone({ f: 240, f2: 150, dur: 0.08, type: 'triangle', gain: 0.08 * vol, delay: 0.08 });
          break;
        case 'chop':
          this.noise({ dur: 0.1, gain: 0.2 * vol, type: 'bandpass', f: 700, f2: 260, q: 1.1 });
          this.tone({ f: 130, f2: 78, dur: 0.13, type: 'triangle', gain: 0.14 * vol });
          break;
        case 'mine':
          this.noise({ dur: 0.06, gain: 0.12 * vol, type: 'highpass', f: 2400 });
          this.tone({ f: 1480, f2: 980, dur: 0.13, type: 'square', gain: 0.035 * vol });
          this.tone({ f: 2100, dur: 0.08, type: 'sine', gain: 0.025 * vol });
          break;
        case 'gunshot':
          this.noise({ dur: 0.15, gain: 0.3 * vol, type: 'lowpass', f: 3200, f2: 300, q: 0.9 });
          this.tone({ f: 150, f2: 46, dur: 0.16, type: 'sawtooth', gain: 0.12 * vol });
          this.noise({ dur: 0.05, gain: 0.14 * vol, type: 'highpass', f: 3400 });
          break;
        case 'turret':
          this.noise({ dur: 0.07, gain: 0.2 * vol, type: 'lowpass', f: 4200, f2: 700 });
          this.tone({ f: 320, f2: 130, dur: 0.07, type: 'square', gain: 0.07 * vol });
          break;
        case 'melee':
          this.noise({ dur: 0.08, gain: 0.15 * vol, type: 'lowpass', f: 700, f2: 200 });
          this.tone({ f: 96, f2: 58, dur: 0.1, type: 'sine', gain: 0.14 * vol });
          break;
        case 'death':
          this.tone({ f: 210, f2: 74, dur: 0.65, type: 'sawtooth', gain: 0.07 * vol });
          this.tone({ f: 104, f2: 42, dur: 0.8, type: 'triangle', gain: 0.09 * vol, delay: 0.05 });
          break;
        case 'chime':
          this.tone({ f: 523.25, dur: 0.5, type: 'sine', gain: 0.09 });
          this.tone({ f: 783.99, dur: 0.6, type: 'sine', gain: 0.07, delay: 0.13 });
          this.tone({ f: 1046.5, dur: 0.75, type: 'sine', gain: 0.05, delay: 0.27 });
          break;
        case 'research':
          this.tone({ f: 659.25, dur: 0.22, type: 'triangle', gain: 0.055 });
          this.tone({ f: 880, dur: 0.24, type: 'triangle', gain: 0.05, delay: 0.12 });
          this.tone({ f: 1318.5, dur: 0.38, type: 'sine', gain: 0.04, delay: 0.24 });
          break;
        case 'alarm':
          for (let i = 0; i < 3; i++) {
            this.tone({ f: 660, dur: 0.28, type: 'sawtooth', gain: 0.055, delay: i * 0.62 });
            this.tone({ f: 440, dur: 0.28, type: 'sawtooth', gain: 0.05, delay: i * 0.62 + 0.3 });
          }
          break;
        case 'thunder':
          this.noise({ dur: 1.9, gain: 0.16, type: 'lowpass', f: 500, f2: 70, q: 0.7, attack: 0.08 });
          this.noise({ dur: 0.4, gain: 0.1, type: 'lowpass', f: 1500, f2: 200 });
          break;
        case 'crash':
          this.noise({ dur: 0.8, gain: 0.24, type: 'lowpass', f: 1600, f2: 90, q: 0.8 });
          this.tone({ f: 90, f2: 34, dur: 0.9, type: 'sine', gain: 0.18 });
          this.tone({ f: 380, f2: 90, dur: 0.5, type: 'sawtooth', gain: 0.04 });
          break;
        case 'collapse':
          this.noise({ dur: 0.6, gain: 0.18, type: 'lowpass', f: 900, f2: 120, q: 0.9 });
          this.tone({ f: 70, f2: 32, dur: 0.7, type: 'triangle', gain: 0.12 });
          break;
        case 'cook':
          this.noise({ dur: 0.3, gain: 0.05, type: 'highpass', f: 3200, attack: 0.04 });
          break;
        case 'tend':
          this.tone({ f: 440, dur: 0.25, type: 'sine', gain: 0.04 });
          this.tone({ f: 660, dur: 0.3, type: 'sine', gain: 0.03, delay: 0.16 });
          break;
        case 'eclipse':
          this.tone({ f: 220, f2: 110, dur: 1.8, type: 'sine', gain: 0.06 });
          this.tone({ f: 293.66, f2: 146.83, dur: 2.0, type: 'triangle', gain: 0.03, delay: 0.2 });
          break;
        case 'click-place':
          this.tone({ f: 480, dur: 0.03, type: 'square', gain: 0.03 });
          break;
        case 'error':
          this.tone({ f: 190, f2: 130, dur: 0.14, type: 'square', gain: 0.05 });
          break;
        default:
          this.tone({ f: 600, dur: 0.05, type: 'sine', gain: 0.04 });
      }
    } catch { /* audio failures must never break the game */ }
  }
}
