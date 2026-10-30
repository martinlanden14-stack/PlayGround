/** Tiny procedural SFX synth — no asset downloads, instant load. */
export class AudioSys {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.noiseBuffer = null;
    this.muted = localStorage.getItem('nb_muted') === '1';
    this.ambient = null;
    this.lastShot = 0;
  }

  unlock() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return;
    }
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    this.ctx = ctx;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18;
    comp.knee.value = 24;
    comp.ratio.value = 6;
    comp.attack.value = 0.004;
    comp.release.value = 0.2;

    const master = ctx.createGain();
    master.gain.value = this.muted ? 0 : 0.55;
    master.connect(comp);
    comp.connect(ctx.destination);
    this.master = master;

    const len = ctx.sampleRate;
    const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    this.noiseBuffer = buffer;
  }

  setMuted(muted) {
    this.muted = muted;
    localStorage.setItem('nb_muted', muted ? '1' : '0');
    if (this.master && this.ctx) {
      this.master.gain.cancelScheduledValues(this.ctx.currentTime);
      this.master.gain.setTargetAtTime(muted ? 0 : 0.55, this.ctx.currentTime, 0.03);
    }
  }

  _tone({ freq = 440, endFreq = null, type = 'sine', dur = 0.15, gain = 0.1, delay = 0, attack = 0.005, filter = null, curve = 'exp' }) {
    const ctx = this.ctx;
    if (!ctx || this.muted) return;
    const t0 = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(Math.max(20, freq), t0);
    if (endFreq) {
      if (curve === 'exp') osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), t0 + dur);
      else osc.frequency.linearRampToValueAtTime(Math.max(20, endFreq), t0 + dur);
    }
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, gain), t0 + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    let node = osc;
    if (filter) {
      const f = ctx.createBiquadFilter();
      f.type = filter.type || 'lowpass';
      f.frequency.setValueAtTime(filter.freq || 1200, t0);
      if (filter.endFreq) f.frequency.exponentialRampToValueAtTime(Math.max(40, filter.endFreq), t0 + dur);
      f.Q.value = filter.q || 0.8;
      node.connect(f);
      node = f;
    }
    node.connect(g);
    g.connect(this.master);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  _noise({ dur = 0.2, gain = 0.1, delay = 0, type = 'lowpass', freq = 2000, endFreq = null, q = 0.7 }) {
    const ctx = this.ctx;
    if (!ctx || this.muted || !this.noiseBuffer) return;
    const t0 = ctx.currentTime + delay;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    src.loop = true;
    const f = ctx.createBiquadFilter();
    f.type = type;
    f.frequency.setValueAtTime(freq, t0);
    if (endFreq) f.frequency.exponentialRampToValueAtTime(Math.max(40, endFreq), t0 + dur);
    f.Q.value = q;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, gain), t0 + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(f);
    f.connect(g);
    g.connect(this.master);
    src.start(t0, Math.random());
    src.stop(t0 + dur + 0.05);
  }

  play(name) {
    if (!this.ctx || this.muted) return;
    switch (name) {
      case 'shoot': {
        const now = performance.now();
        if (now - this.lastShot < 40) return;
        this.lastShot = now;
        this._tone({ freq: 210 + Math.random() * 30, endFreq: 70, type: 'square', dur: 0.09, gain: 0.075, filter: { type: 'lowpass', freq: 3000 } });
        this._noise({ dur: 0.07, gain: 0.09, type: 'highpass', freq: 900 });
        this._tone({ freq: 120, endFreq: 54, type: 'sine', dur: 0.12, gain: 0.1 });
        break;
      }
      case 'hit':
        this._tone({ freq: 1500 + Math.random() * 300, endFreq: 900, type: 'square', dur: 0.045, gain: 0.035 });
        this._noise({ dur: 0.04, gain: 0.04, type: 'bandpass', freq: 2600, q: 2 });
        break;
      case 'kill':
        this._noise({ dur: 0.4, gain: 0.16, type: 'lowpass', freq: 1600, endFreq: 120 });
        this._tone({ freq: 150, endFreq: 38, type: 'sawtooth', dur: 0.35, gain: 0.1 });
        break;
      case 'bossKill':
        this._noise({ dur: 1.1, gain: 0.24, type: 'lowpass', freq: 2200, endFreq: 60 });
        this._tone({ freq: 120, endFreq: 24, type: 'sawtooth', dur: 1.1, gain: 0.16 });
        this._tone({ freq: 420, endFreq: 90, type: 'square', dur: 0.6, gain: 0.06, delay: 0.15 });
        break;
      case 'hurt':
        this._tone({ freq: 170, endFreq: 55, type: 'sawtooth', dur: 0.28, gain: 0.13 });
        this._noise({ dur: 0.18, gain: 0.12, type: 'lowpass', freq: 800 });
        break;
      case 'reload':
        this._tone({ freq: 520, endFreq: 360, type: 'square', dur: 0.05, gain: 0.04 });
        this._tone({ freq: 300, endFreq: 240, type: 'square', dur: 0.06, gain: 0.05, delay: 0.55 });
        break;
      case 'reloadDone':
        this._tone({ freq: 700, endFreq: 1050, type: 'square', dur: 0.08, gain: 0.045 });
        break;
      case 'empty':
        this._tone({ freq: 1400, endFreq: 900, type: 'square', dur: 0.03, gain: 0.03 });
        break;
      case 'dash':
        this._noise({ dur: 0.28, gain: 0.09, type: 'highpass', freq: 300, endFreq: 3800 });
        this._tone({ freq: 240, endFreq: 520, type: 'sine', dur: 0.2, gain: 0.04 });
        break;
      case 'wave':
        this._tone({ freq: 330, endFreq: 330, type: 'triangle', dur: 0.16, gain: 0.05 });
        this._tone({ freq: 440, endFreq: 440, type: 'triangle', dur: 0.22, gain: 0.05, delay: 0.15 });
        break;
      case 'boss':
        this._tone({ freq: 70, endFreq: 46, type: 'sawtooth', dur: 0.9, gain: 0.14, filter: { type: 'lowpass', freq: 300 } });
        this._tone({ freq: 140, endFreq: 92, type: 'square', dur: 0.7, gain: 0.04, delay: 0.08 });
        break;
      case 'pickup':
        this._tone({ freq: 660, endFreq: 660, type: 'sine', dur: 0.09, gain: 0.06 });
        this._tone({ freq: 880, endFreq: 880, type: 'sine', dur: 0.09, gain: 0.06, delay: 0.07 });
        this._tone({ freq: 1320, endFreq: 1320, type: 'sine', dur: 0.14, gain: 0.05, delay: 0.14 });
        break;
      case 'enemyShoot':
        this._tone({ freq: 700, endFreq: 300, type: 'sawtooth', dur: 0.11, gain: 0.022 });
        break;
      case 'combo':
        this._tone({ freq: 880, endFreq: 1320, type: 'triangle', dur: 0.12, gain: 0.035 });
        break;
      default:
        break;
    }
  }

  startAmbient() {
    if (!this.ctx || this.ambient) return;
    const ctx = this.ctx;
    const g = ctx.createGain();
    g.gain.value = 0.0001;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 240;
    filter.Q.value = 2.5;
    g.connect(this.master);

    const oscA = ctx.createOscillator();
    oscA.type = 'sawtooth';
    oscA.frequency.value = 55;
    const oscB = ctx.createOscillator();
    oscB.type = 'sawtooth';
    oscB.frequency.value = 82.4;
    oscB.detune.value = 6;
    const gainA = ctx.createGain();
    gainA.gain.value = 0.4;
    const gainB = ctx.createGain();
    gainB.gain.value = 0.22;
    oscA.connect(gainA).connect(filter);
    oscB.connect(gainB).connect(filter);
    filter.connect(g);

    // slow filter breathing
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.06;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 90;
    lfo.connect(lfoGain).connect(filter.frequency);

    oscA.start();
    oscB.start();
    lfo.start();
    g.gain.setTargetAtTime(0.035, ctx.currentTime, 1.5);
    this.ambient = { g, oscA, oscB, lfo };
  }

  stopAmbient() {
    if (!this.ambient || !this.ctx) return;
    const { g, oscA, oscB, lfo } = this.ambient;
    g.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.3);
    const stopAt = this.ctx.currentTime + 1.2;
    try { oscA.stop(stopAt); oscB.stop(stopAt); lfo.stop(stopAt); } catch { /* noop */ }
    this.ambient = null;
  }
}
