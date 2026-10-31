/* ============================================================
   AudioEngine — all sound is synthesized with WebAudio.
   No external audio assets required.
   ============================================================ */

const midi = (n) => 440 * Math.pow(2, (n - 69) / 12);

export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.musicGain = null;
    this.sfxGain = null;
    this.noiseBuffer = null;
    this.muted = false;
    this.started = false;
    this._timer = null;
    this._step = 0;
    this._nextNote = 0;
    this.tempo = 104;
  }

  init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    try {
      this.ctx = new AC();
    } catch {
      return;
    }
    this.master = this.ctx.createGain();
    this.master.gain.value = this.muted ? 0 : 0.7;
    this.master.connect(this.ctx.destination);

    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.value = 0.9;
    this.sfxGain.connect(this.master);

    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.value = 0.34;
    this.musicGain.connect(this.master);

    // pre-render one second of white noise
    const len = Math.floor(this.ctx.sampleRate);
    this.noiseBuffer = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = this.noiseBuffer.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;

    this.started = true;
    this._startMusic();
  }

  setMuted(muted) {
    this.muted = muted;
    if (this.master && this.ctx) {
      this.master.gain.cancelScheduledValues(this.ctx.currentTime);
      this.master.gain.setTargetAtTime(muted ? 0 : 0.7, this.ctx.currentTime, 0.03);
    }
  }

  toggleMute() {
    this.setMuted(!this.muted);
    return this.muted;
  }

  _tone({ freq = 440, freqEnd = null, type = 'sine', dur = 0.15, gain = 0.1, attack = 0.005, dest = null, delay = 0, detune = 0 }) {
    if (!this.ctx) return;
    const t0 = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(Math.max(20, freq), t0);
    if (freqEnd !== null) osc.frequency.exponentialRampToValueAtTime(Math.max(20, freqEnd), t0 + dur);
    if (detune) osc.detune.value = detune;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, gain), t0 + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g).connect(dest || this.sfxGain);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  _noise({ dur = 0.1, gain = 0.1, type = 'bandpass', freq = 1200, freqEnd = null, q = 1, delay = 0, dest = null, attack = 0.002 }) {
    if (!this.ctx || !this.noiseBuffer) return;
    const t0 = this.ctx.currentTime + delay;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    src.loop = true;
    const filter = this.ctx.createBiquadFilter();
    filter.type = type;
    filter.frequency.setValueAtTime(freq, t0);
    if (freqEnd !== null) filter.frequency.exponentialRampToValueAtTime(Math.max(40, freqEnd), t0 + dur);
    filter.Q.value = q;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, gain), t0 + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(filter).connect(g).connect(dest || this.sfxGain);
    src.start(t0);
    src.stop(t0 + dur + 0.03);
  }

  // ---------------- weapons / combat ----------------
  shoot() {
    if (!this.ctx) return;
    const p = 0.9 + Math.random() * 0.2;
    this._noise({ dur: 0.09, gain: 0.16, type: 'bandpass', freq: 2600 * p, freqEnd: 420, q: 0.9 });
    this._tone({ freq: 190 * p, freqEnd: 58, type: 'square', dur: 0.1, gain: 0.09 });
    this._tone({ freq: 900 * p, freqEnd: 180, type: 'sawtooth', dur: 0.05, gain: 0.025 });
  }

  dryFire() {
    this._noise({ dur: 0.03, gain: 0.05, type: 'highpass', freq: 2400 });
    this._tone({ freq: 320, freqEnd: 220, type: 'square', dur: 0.04, gain: 0.025 });
  }

  hit(head = false) {
    this._tone({ freq: head ? 1650 : 1180, freqEnd: head ? 900 : 720, type: 'square', dur: 0.055, gain: 0.045 });
    if (head) this._tone({ freq: 2400, freqEnd: 1800, type: 'sine', dur: 0.09, gain: 0.05, delay: 0.02 });
  }

  kill(head = false) {
    this._noise({ dur: 0.28, gain: 0.13, type: 'lowpass', freq: 1400, freqEnd: 160 });
    this._tone({ freq: head ? 420 : 300, freqEnd: 46, type: 'sawtooth', dur: 0.32, gain: 0.08 });
    if (head) this._tone({ freq: 1200, freqEnd: 500, type: 'triangle', dur: 0.16, gain: 0.05, delay: 0.02 });
  }

  reloadStart() {
    this._noise({ dur: 0.035, gain: 0.07, type: 'highpass', freq: 2600 });
    this._tone({ freq: 240, freqEnd: 160, type: 'square', dur: 0.05, gain: 0.035 });
    this._noise({ dur: 0.04, gain: 0.05, type: 'bandpass', freq: 1500, delay: 0.12 });
  }

  reloadEnd() {
    this._noise({ dur: 0.03, gain: 0.08, type: 'highpass', freq: 3000 });
    this._tone({ freq: 420, freqEnd: 620, type: 'square', dur: 0.06, gain: 0.04, delay: 0.02 });
  }

  enemyShoot() {
    this._tone({ freq: 760, freqEnd: 220, type: 'sawtooth', dur: 0.14, gain: 0.035 });
    this._tone({ freq: 1500, freqEnd: 600, type: 'sine', dur: 0.09, gain: 0.02 });
  }

  hurt() {
    this._tone({ freq: 130, freqEnd: 44, type: 'sine', dur: 0.3, gain: 0.2 });
    this._noise({ dur: 0.18, gain: 0.11, type: 'lowpass', freq: 900, freqEnd: 200 });
  }

  pickup() {
    this._tone({ freq: 520, freqEnd: 1040, type: 'triangle', dur: 0.16, gain: 0.06 });
    this._tone({ freq: 780, freqEnd: 1560, type: 'sine', dur: 0.14, gain: 0.04, delay: 0.06 });
  }

  step() {
    const p = 0.9 + Math.random() * 0.25;
    this._noise({ dur: 0.05, gain: 0.028, type: 'lowpass', freq: 320 * p, freqEnd: 110 });
    this._tone({ freq: 72 * p, freqEnd: 42, type: 'sine', dur: 0.08, gain: 0.045 });
  }

  waveStart() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    [110, 164.81, 220].forEach((f, i) => {
      this._tone({ freq: f, type: 'triangle', dur: 0.9, gain: 0.05, attack: 0.02, delay: i * 0.04 });
    });
    this._noise({ dur: 0.7, gain: 0.04, type: 'highpass', freq: 400, freqEnd: 4200, q: 0.5 });
  }

  waveClear() {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
      this._tone({ freq: f, type: 'triangle', dur: 0.35, gain: 0.045, delay: i * 0.07 });
    });
  }

  gameOver() {
    if (!this.ctx) return;
    [440, 349.23, 261.63, 130.81].forEach((f, i) => {
      this._tone({ freq: f, freqEnd: f * 0.98, type: 'sawtooth', dur: 0.5, gain: 0.055, delay: i * 0.16 });
    });
    this._noise({ dur: 1.2, gain: 0.06, type: 'lowpass', freq: 1200, freqEnd: 80 });
  }

  ui() {
    this._tone({ freq: 900, freqEnd: 1200, type: 'square', dur: 0.035, gain: 0.025 });
  }

  // ---------------- procedural music ----------------
  _startMusic() {
    if (!this.ctx || this._timer) return;
    this._nextNote = this.ctx.currentTime + 0.12;
    this._timer = setInterval(() => this._schedule(), 25);
  }

  stopMusic() {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  }

  _schedule() {
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') return;
    const stepDur = 60 / this.tempo / 4;
    while (this._nextNote < this.ctx.currentTime + 0.14) {
      this._playStep(this._step, this._nextNote, stepDur);
      this._step = (this._step + 1) % 16;
      this._nextNote += stepDur;
    }
  }

  _playStep(step, t, stepDur) {
    const delay = Math.max(0, t - this.ctx.currentTime);
    const dest = this.musicGain;

    // kick
    if (step % 4 === 0) {
      this._tone({ freq: 128, freqEnd: 42, type: 'sine', dur: 0.18, gain: 0.36, delay, dest, attack: 0.004 });
    }
    // off-beat hat
    if (step % 2 === 1) {
      this._noise({ dur: 0.035, gain: 0.035, type: 'highpass', freq: 7600, delay, dest });
    }
    // snare-ish on 4 and 12
    if (step === 4 || step === 12) {
      this._noise({ dur: 0.12, gain: 0.08, type: 'bandpass', freq: 1900, q: 0.6, delay, dest });
    }

    const bassPattern = [45, 45, 0, 45, 48, 0, 43, 43, 45, 45, 0, 45, 50, 0, 43, 43];
    const bassNote = bassPattern[step];
    if (bassNote) {
      this._tone({
        freq: midi(bassNote), freqEnd: midi(bassNote) * 0.99, type: 'sawtooth',
        dur: stepDur * 0.85, gain: 0.09, delay, dest, attack: 0.006,
      });
    }

    // sparse arp
    if ([0, 2, 5, 7, 8, 11, 13, 14].includes(step)) {
      const arp = [69, 72, 76, 79, 81, 76, 72, 67];
      const n = arp[(step * 3 + this._step) % arp.length];
      this._tone({
        freq: midi(n + 12), type: 'triangle', dur: stepDur * 0.6, gain: 0.018, delay, dest, attack: 0.004,
      });
    }

    // pad every two bars
    if (step === 0) {
      [57, 60, 64].forEach((n, i) => {
        this._tone({
          freq: midi(n), type: 'triangle', dur: 3.6, gain: 0.02, delay: delay + i * 0.01,
          dest, attack: 0.35, detune: i * 4,
        });
      });
    }
  }
}
