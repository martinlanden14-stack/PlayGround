// Procedural WebAudio: every sound is synthesized, so the game ships with zero audio assets.

export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.sfx = null;
    this.music = null;
    this.noise = null;
    this.started = false;
    this.muted = false;
    this.musicTimer = null;
    this.step = 0;
    this.nextNoteTime = 0;
    this.paused = false;
    try {
      this.muted = localStorage.getItem('sector7.muted') === '1';
    } catch {
      this.muted = false;
    }
  }

  init() {
    if (this.ctx) {
      this.resume();
      return;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = this.muted ? 0 : 0.85;

    const comp = this.ctx.createDynamicsCompressor();
    comp.threshold.value = -18;
    comp.knee.value = 18;
    comp.ratio.value = 5;
    comp.attack.value = 0.004;
    comp.release.value = 0.2;

    this.master.connect(comp).connect(this.ctx.destination);

    this.sfx = this.ctx.createGain();
    this.sfx.gain.value = 0.9;
    this.sfx.connect(this.master);

    this.music = this.ctx.createGain();
    this.music.gain.value = 0.5;
    this.music.connect(this.master);

    // shared noise buffer
    const len = this.ctx.sampleRate * 1.5;
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    this.noise = buf;

    this.started = true;
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  }

  setMuted(muted) {
    this.muted = muted;
    try {
      localStorage.setItem('sector7.muted', muted ? '1' : '0');
    } catch {
      /* storage may be unavailable */
    }
    if (this.master && this.ctx) {
      const t = this.ctx.currentTime;
      this.master.gain.cancelScheduledValues(t);
      this.master.gain.setTargetAtTime(muted ? 0 : 0.85, t, 0.04);
    }
    return muted;
  }

  toggle() {
    return this.setMuted(!this.muted);
  }

  setPaused(paused) {
    this.paused = paused;
    if (!this.ctx || !this.music) return;
    const t = this.ctx.currentTime;
    this.music.gain.cancelScheduledValues(t);
    this.music.gain.setTargetAtTime(paused ? 0.12 : 0.5, t, 0.15);
  }

  // ---------- primitives ----------
  now() {
    return this.ctx.currentTime;
  }

  tone({ type = 'sine', f0 = 440, f1 = null, dur = 0.15, vol = 0.1, when = 0, filter = null, cutoff = 900, q = 1, dest = null }) {
    if (!this.ctx || this.muted) return;
    const t = this.now() + when;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(Math.max(20, f0), t);
    if (f1 !== null) osc.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);

    let node = osc;
    if (filter) {
      const f = this.ctx.createBiquadFilter();
      f.type = filter;
      f.frequency.setValueAtTime(cutoff, t);
      f.Q.value = q;
      node.connect(f);
      node = f;
    }
    node.connect(g);
    g.connect(dest || this.sfx);

    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  }

  hiss({ dur = 0.2, vol = 0.08, when = 0, type = 'highpass', freq = 1200, q = 0.8, dest = null }) {
    if (!this.ctx || this.muted || !this.noise) return;
    const t = this.now() + when;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noise;
    src.playbackRate.value = 1;
    const f = this.ctx.createBiquadFilter();
    f.type = type;
    f.frequency.setValueAtTime(freq, t);
    f.Q.value = q;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(f).connect(g).connect(dest || this.sfx);
    src.start(t, Math.random() * 0.5);
    src.stop(t + dur + 0.02);
  }

  // ---------- game sounds ----------
  shoot() {
    if (!this.ctx) return;
    this.tone({ type: 'sawtooth', f0: 1300, f1: 220, dur: 0.09, vol: 0.075, filter: 'lowpass', q: 6 });
    this.tone({ type: 'square', f0: 2400, f1: 700, dur: 0.05, vol: 0.022 });
    this.hiss({ dur: 0.05, vol: 0.05, freq: 3000, type: 'bandpass', q: 1.4 });
  }

  hit() {
    this.tone({ type: 'triangle', f0: 1500, f1: 900, dur: 0.05, vol: 0.055 });
    this.hiss({ dur: 0.03, vol: 0.025, freq: 4200 });
  }

  kill() {
    this.tone({ type: 'sawtooth', f0: 180, f1: 36, dur: 0.42, vol: 0.1, filter: 'lowpass', q: 4 });
    this.tone({ type: 'square', f0: 520, f1: 120, dur: 0.18, vol: 0.035 });
    this.hiss({ dur: 0.35, vol: 0.07, freq: 700, type: 'lowpass', q: 1 });
  }

  hurt() {
    this.tone({ type: 'sine', f0: 110, f1: 48, dur: 0.3, vol: 0.15 });
    this.tone({ type: 'sawtooth', f0: 260, f1: 70, dur: 0.2, vol: 0.05, filter: 'lowpass', q: 2 });
    this.hiss({ dur: 0.18, vol: 0.06, freq: 900, type: 'bandpass', q: 0.7 });
  }

  empty() {
    this.tone({ type: 'square', f0: 180, f1: 120, dur: 0.04, vol: 0.04 });
    this.hiss({ dur: 0.03, vol: 0.03, freq: 2400 });
  }

  reloadStart() {
    this.tone({ type: 'square', f0: 420, f1: 200, dur: 0.06, vol: 0.035 });
    this.hiss({ dur: 0.08, vol: 0.025, freq: 1600, type: 'bandpass', q: 2 });
  }

  reloadEnd() {
    this.tone({ type: 'square', f0: 300, f1: 640, dur: 0.07, vol: 0.04 });
    this.tone({ type: 'triangle', f0: 980, f1: 1400, dur: 0.09, vol: 0.03, when: 0.06 });
  }

  enemyShoot() {
    this.tone({ type: 'sine', f0: 720, f1: 140, dur: 0.22, vol: 0.06 });
    this.tone({ type: 'triangle', f0: 360, f1: 90, dur: 0.25, vol: 0.03, filter: 'lowpass', q: 1 });
  }

  enemyDie(big = false) {
    if (big) {
      this.tone({ type: 'sawtooth', f0: 90, f1: 24, dur: 1.1, vol: 0.18, filter: 'lowpass', q: 3 });
      this.hiss({ dur: 1.0, vol: 0.16, freq: 300, type: 'lowpass', q: 0.8 });
      this.tone({ type: 'square', f0: 220, f1: 40, dur: 0.6, vol: 0.06 });
    } else {
      this.kill();
    }
  }

  spawn() {
    this.tone({ type: 'sine', f0: 160, f1: 720, dur: 0.4, vol: 0.05 });
    this.hiss({ dur: 0.35, vol: 0.03, freq: 2400, type: 'bandpass', q: 2 });
  }

  pickup() {
    [0, 0.07, 0.14].forEach((d, i) => {
      this.tone({ type: 'triangle', f0: 660 + i * 220, dur: 0.16, vol: 0.06, when: d });
    });
    this.tone({ type: 'sine', f0: 1320, f1: 1760, dur: 0.25, vol: 0.03, when: 0.1 });
  }

  waveStart(n = 1) {
    const root = 110;
    [1, 1.5, 2, 3].forEach((m, i) => {
      this.tone({ type: 'sawtooth', f0: root * m, dur: 0.9, vol: 0.045, when: i * 0.03, filter: 'lowpass', q: 2 });
    });
    this.hiss({ dur: 0.7, vol: 0.03, freq: 500, type: 'bandpass', q: 0.8 });
    this.tone({ type: 'triangle', f0: 440, f1: 880, dur: 0.5, vol: 0.03, when: 0.25 });
    if (n > 0) this.tone({ type: 'sine', f0: 55, dur: 1.2, vol: 0.12 });
  }

  waveClear() {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
      this.tone({ type: 'triangle', f0: f, dur: 0.45, vol: 0.05, when: i * 0.09 })
    );
  }

  bossSpawn() {
    this.tone({ type: 'sawtooth', f0: 60, f1: 32, dur: 1.6, vol: 0.2, filter: 'lowpass', q: 3 });
    this.tone({ type: 'square', f0: 120, f1: 60, dur: 1.2, vol: 0.05, filter: 'lowpass', q: 2 });
    this.hiss({ dur: 1.4, vol: 0.12, freq: 400, type: 'lowpass', q: 0.6 });
    [0, 0.22, 0.44].forEach((d) => this.tone({ type: 'sine', f0: 220, f1: 110, dur: 0.5, vol: 0.06, when: d }));
  }

  playerDeath() {
    this.tone({ type: 'sawtooth', f0: 220, f1: 28, dur: 1.6, vol: 0.2, filter: 'lowpass', q: 2 });
    this.hiss({ dur: 1.4, vol: 0.12, freq: 600, type: 'lowpass', q: 0.8 });
    this.tone({ type: 'sine', f0: 60, dur: 1.8, vol: 0.15 });
  }

  ui() {
    this.tone({ type: 'square', f0: 880, f1: 660, dur: 0.045, vol: 0.025 });
  }

  // ---------- music ----------
  startMusic() {
    if (!this.ctx || this.musicTimer) return;
    this.step = 0;
    this.nextNoteTime = this.ctx.currentTime + 0.12;
    this.musicTimer = setInterval(() => this.scheduleMusic(), 90);
  }

  stopMusic() {
    if (this.musicTimer) {
      clearInterval(this.musicTimer);
      this.musicTimer = null;
    }
  }

  scheduleMusic() {
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') return;
    const spb = 60 / 96;
    const stepDur = spb / 4;
    while (this.nextNoteTime < this.ctx.currentTime + 0.3) {
      this.playStep(this.step, this.nextNoteTime);
      this.nextNoteTime += stepDur;
      this.step = (this.step + 1) % 64;
    }
  }

  playStep(step, t) {
    if (this.muted || !this.ctx) return;
    const when = t - this.ctx.currentTime;
    if (when < 0) return;
    const bar = Math.floor(step / 16);
    const s = step % 16;
    const dest = this.music;

    // kick
    if (s === 0 || s === 8 || (bar % 2 === 1 && s === 11)) {
      this.tone({ type: 'sine', f0: 140, f1: 42, dur: 0.3, vol: 0.14, when, dest });
    }
    // hats
    if (s % 4 === 2) {
      this.hiss({ dur: 0.04, vol: 0.016, freq: 7000, when, dest });
    }
    // bass line in D minor
    const bassNotes = [73.42, 73.42, 87.31, 65.41, 73.42, 98.0, 87.31, 58.27];
    if (s % 2 === 0) {
      const note = bassNotes[(step / 2) % bassNotes.length | 0];
      this.tone({ type: 'sawtooth', f0: note, f1: note * 0.985, dur: 0.22, vol: 0.055, when, filter: 'lowpass', q: 4, dest });
    }
    // sparse arp
    if (s === 3 || s === 7 || s === 10 || s === 14) {
      const arp = [293.66, 349.23, 440, 523.25, 392, 349.23];
      const note = arp[(step * 3) % arp.length | 0];
      this.tone({ type: 'triangle', f0: note, dur: 0.35, vol: 0.022, when, dest });
    }
    // pad chord at bar starts
    if (step % 16 === 0 && bar % 2 === 0) {
      const chords = [
        [146.83, 174.61, 220, 293.66],
        [130.81, 164.81, 196, 261.63],
        [116.54, 146.83, 174.61, 233.08],
        [98, 130.81, 164.81, 196],
      ];
      chords[bar % 4].forEach((f, i) =>
        this.tone({ type: 'sawtooth', f0: f, dur: 6.5, vol: 0.014, when, filter: 'lowpass', q: 1.5, dest })
      );
    }
  }
}
