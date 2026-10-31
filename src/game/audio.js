const note = (n) => 440 * Math.pow(2, (n - 69) / 12);

export class Soundscape {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.enabled = localStorage.getItem('sg-audio') !== 'off';
    this.started = false;
    this.rollingGain = null;
    this.windGain = null;
    this.grindGain = null;
    this.musicTimer = null;
    this.chordIndex = 0;
    this._lastPush = 0;
  }

  async init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') await this.ctx.resume();
      return;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = this.enabled ? .62 : 0;
    this.master.connect(this.ctx.destination);

    this.noiseBuffer = this.makeNoise(2.4);
    this._buildAmbience();
    this.started = true;
    if (this.enabled) this.startMusic();
  }

  makeNoise(seconds = 2) {
    const len = Math.floor(this.ctx.sampleRate * seconds);
    const buffer = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + .02 * white) / 1.02;
      data[i] = last * 3.1 + white * .18;
    }
    return buffer;
  }

  _loopNoise(filterType, frequency, gainValue, q = .7) {
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    src.loop = true;
    const filter = this.ctx.createBiquadFilter();
    filter.type = filterType;
    filter.frequency.value = frequency;
    filter.Q.value = q;
    const gain = this.ctx.createGain();
    gain.gain.value = 0;
    src.connect(filter).connect(gain).connect(this.master);
    src.start();
    return { src, filter, gain };
  }

  _buildAmbience() {
    // Surf wash
    const surf = this._loopNoise('lowpass', 380, .055, .3);
    surf.gain.gain.setTargetAtTime(.055, this.ctx.currentTime, 1.2);
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.value = .11;
    lfoGain.gain.value = .022;
    lfo.connect(lfoGain).connect(surf.gain.gain);
    lfo.start();

    // Wind
    const wind = this._loopNoise('bandpass', 640, .018, .55);
    wind.gain.gain.setTargetAtTime(.018, this.ctx.currentTime, 2);
    this.windGain = wind.gain;

    // Rolling wheels
    const roll = this._loopNoise('bandpass', 175, 0, .8);
    this.rollingGain = roll.gain;
    this.rollingFilter = roll.filter;

    // Grind
    const grind = this._loopNoise('bandpass', 2400, 0, 7);
    this.grindGain = grind.gain;
    this.grindFilter = grind.filter;
  }

  setEnabled(on) {
    this.enabled = on;
    localStorage.setItem('sg-audio', on ? 'on' : 'off');
    if (this.master) {
      this.master.gain.setTargetAtTime(on ? .62 : 0, this.ctx.currentTime, .05);
    }
    if (on) {
      if (this.ctx?.state === 'suspended') this.ctx.resume();
      if (this.started) this.startMusic();
    } else {
      this.stopMusic();
    }
  }

  toggle() {
    this.setEnabled(!this.enabled);
    return this.enabled;
  }

  startMusic() {
    if (!this.ctx || this.musicTimer || !this.enabled) return;
    const play = () => {
      if (!this.ctx || !this.enabled) return;
      const roots = [41, 45, 48, 43]; // F, A, C, G-ish low register
      const chords = [
        [0, 4, 7, 11],
        [0, 3, 7, 10],
        [0, 3, 7, 14],
        [0, 4, 7, 10]
      ];
      const root = roots[this.chordIndex % 4];
      const chord = chords[this.chordIndex % 4];
      const now = this.ctx.currentTime;
      const bar = 3.6;
      const bus = this.ctx.createGain();
      bus.gain.value = .055;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 1200;
      filter.Q.value = .5;
      bus.connect(filter).connect(this.master);

      chord.forEach((interval, i) => {
        const osc = this.ctx.createOscillator();
        osc.type = i === 0 ? 'triangle' : 'sine';
        osc.frequency.value = note(root + interval);
        const g = this.ctx.createGain();
        g.gain.setValueAtTime(0, now);
        g.gain.linearRampToValueAtTime(i === 0 ? .12 : .055, now + .4);
        g.gain.exponentialRampToValueAtTime(.0001, now + bar - .1);
        osc.connect(g).connect(bus);
        osc.start(now);
        osc.stop(now + bar);
      });
      // Warm sub
      const sub = this.ctx.createOscillator();
      sub.type = 'sine';
      sub.frequency.value = note(root - 12);
      const sg = this.ctx.createGain();
      sg.gain.setValueAtTime(0, now);
      sg.gain.linearRampToValueAtTime(.04, now + .15);
      sg.gain.exponentialRampToValueAtTime(.0001, now + 1.4);
      sub.connect(sg).connect(this.master);
      sub.start(now); sub.stop(now + 1.6);

      // Dusty brush pulse
      const brush = this.ctx.createBufferSource();
      brush.buffer = this.noiseBuffer;
      const bf = this.ctx.createBiquadFilter();
      bf.type = 'highpass'; bf.frequency.value = 2400;
      const bg = this.ctx.createGain();
      bg.gain.setValueAtTime(.018, now);
      bg.gain.exponentialRampToValueAtTime(.0001, now + .14);
      brush.connect(bf).connect(bg).connect(this.master);
      brush.start(now); brush.stop(now + .18);

      this.chordIndex++;
      this.musicTimer = setTimeout(play, bar * 1000);
    };
    play();
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }

  stopMusic() {
    if (this.musicTimer) clearTimeout(this.musicTimer);
    this.musicTimer = null;
  }

  setRolling(speed, active) {
    if (!this.ctx || !this.rollingGain) return;
    const t = this.ctx.currentTime;
    const target = active ? Math.min(.075, .012 + speed * .0065) : 0;
    this.rollingGain.gain.setTargetAtTime(target, t, .08);
    this.rollingFilter.frequency.setTargetAtTime(120 + speed * 22, t, .1);
  }

  setGrind(active) {
    if (!this.ctx || !this.grindGain) return;
    const t = this.ctx.currentTime;
    this.grindGain.gain.setTargetAtTime(active ? .035 : 0, t, .04);
    this.grindFilter.frequency.setTargetAtTime(active ? 3000 : 2400, t, .06);
  }

  blip(freq = 660, dur = .06, type = 'square', vol = .04) {
    if (!this.ctx || !this.enabled) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    osc.connect(g).connect(this.master);
    osc.start(t); osc.stop(t + dur + .01);
  }

  push() {
    if (!this.ctx || !this.enabled) return;
    const now = performance.now();
    if (now - this._lastPush < 120) return;
    this._lastPush = now;
    const t = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(500, t);
    filter.frequency.exponentialRampToValueAtTime(120, t + .16);
    filter.Q.value = .7;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(.035, t);
    g.gain.exponentialRampToValueAtTime(.0001, t + .18);
    src.connect(filter).connect(g).connect(this.master);
    src.start(t); src.stop(t + .2);
  }

  ollie() {
    if (!this.ctx || !this.enabled) return;
    const t = this.ctx.currentTime;
    // Deck pop: click
    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(165, t);
    osc.frequency.exponentialRampToValueAtTime(55, t + .09);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(.14, t);
    g.gain.exponentialRampToValueAtTime(.0001, t + .12);
    osc.connect(g).connect(this.master);
    osc.start(t); osc.stop(t + .13);

    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    const f = this.ctx.createBiquadFilter();
    f.type = 'highpass'; f.frequency.value = 1300;
    const ng = this.ctx.createGain();
    ng.gain.setValueAtTime(.055, t);
    ng.gain.exponentialRampToValueAtTime(.0001, t + .08);
    src.connect(f).connect(ng).connect(this.master);
    src.start(t); src.stop(t + .1);
  }

  land(strength = 1) {
    if (!this.ctx || !this.enabled) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(92, t);
    osc.frequency.exponentialRampToValueAtTime(38, t + .18);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(.13 * strength, t);
    g.gain.exponentialRampToValueAtTime(.0001, t + .28);
    osc.connect(g).connect(this.master);
    osc.start(t); osc.stop(t + .3);

    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    const f = this.ctx.createBiquadFilter();
    f.type = 'lowpass'; f.frequency.value = 500;
    const ng = this.ctx.createGain();
    ng.gain.setValueAtTime(.1 * strength, t);
    ng.gain.exponentialRampToValueAtTime(.0001, t + .16);
    src.connect(f).connect(ng).connect(this.master);
    src.start(t); src.stop(t + .18);
  }

  trick() {
    if (!this.ctx || !this.enabled) return;
    const t = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    const f = this.ctx.createBiquadFilter();
    f.type = 'bandpass';
    f.frequency.setValueAtTime(1900, t);
    f.frequency.exponentialRampToValueAtTime(3400, t + .22);
    f.Q.value = 1.6;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(.05, t);
    g.gain.exponentialRampToValueAtTime(.0001, t + .26);
    src.connect(f).connect(g).connect(this.master);
    src.start(t); src.stop(t + .28);
  }

  tape() {
    if (!this.ctx || !this.enabled) return;
    const t = this.ctx.currentTime;
    [880, 1174, 1568].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0, t + i * .045);
      g.gain.linearRampToValueAtTime(.045, t + i * .045 + .02);
      g.gain.exponentialRampToValueAtTime(.0001, t + i * .045 + .3);
      osc.connect(g).connect(this.master);
      osc.start(t + i * .045); osc.stop(t + i * .045 + .32);
    });
  }

  combo(level = 1) {
    if (!this.ctx || !this.enabled) return;
    const t = this.ctx.currentTime;
    const base = 500 + level * 40;
    [1, 1.25, 1.5].forEach((m, i) => {
      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.value = base * m;
      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0, t + i * .05);
      g.gain.linearRampToValueAtTime(.035, t + i * .05 + .02);
      g.gain.exponentialRampToValueAtTime(.0001, t + i * .05 + .34);
      osc.connect(g).connect(this.master);
      osc.start(t + i * .05); osc.stop(t + i * .05 + .36);
    });
  }

  ui() { this.blip(640, .05, 'square', .025); }

  start() {
    if (!this.ctx) return;
    this.blip(392, .1, 'triangle', .06);
    setTimeout(() => this.blip(587, .12, 'triangle', .055), 90);
    setTimeout(() => this.blip(784, .18, 'triangle', .05), 180);
  }

  end() {
    if (!this.ctx) return;
    [523, 659, 784, 1046].forEach((f, i) => {
      setTimeout(() => this.blip(f, .28, 'sine', .045), i * 120);
    });
  }
}
