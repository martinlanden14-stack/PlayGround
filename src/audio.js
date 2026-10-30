export class GameAudio {
  constructor() {
    this.ctx = null;
    this.ready = false;
    this.muted = false;
    this.master = null;
    this.engine = null;
    this.skid = null;
    this.wind = null;
    this.boost = null;
    this.noiseBuffer = null;
  }

  init() {
    if (this.ready) {
      this.resume();
      return;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    this.ctx = ctx;

    const master = ctx.createGain();
    master.gain.value = this.muted ? 0 : 0.55;
    master.connect(ctx.destination);
    this.master = master;

    // Noise buffer
    const len = ctx.sampleRate * 2;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    this.noiseBuffer = buf;

    // Engine: two saws + sub
    const engineGain = ctx.createGain();
    engineGain.gain.value = 0;
    const engineFilter = ctx.createBiquadFilter();
    engineFilter.type = 'lowpass';
    engineFilter.frequency.value = 900;
    engineFilter.Q.value = 3;
    engineGain.connect(engineFilter);
    engineFilter.connect(master);

    const o1 = ctx.createOscillator();
    o1.type = 'sawtooth';
    o1.frequency.value = 60;
    const o2 = ctx.createOscillator();
    o2.type = 'square';
    o2.frequency.value = 61;
    o2.detune.value = 7;
    const sub = ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.value = 30;
    const subGain = ctx.createGain();
    subGain.gain.value = 0.35;
    o1.connect(engineGain);
    o2.connect(engineGain);
    sub.connect(subGain);
    subGain.connect(engineGain);
    o1.start();
    o2.start();
    sub.start();
    this.engine = { o1, o2, sub, gain: engineGain, filter: engineFilter };

    // Skid noise
    const skidSrc = ctx.createBufferSource();
    skidSrc.buffer = buf;
    skidSrc.loop = true;
    const skidFilter = ctx.createBiquadFilter();
    skidFilter.type = 'bandpass';
    skidFilter.frequency.value = 2400;
    skidFilter.Q.value = 6;
    const skidGain = ctx.createGain();
    skidGain.gain.value = 0;
    skidSrc.connect(skidFilter);
    skidFilter.connect(skidGain);
    skidGain.connect(master);
    skidSrc.start();
    this.skid = { gain: skidGain, filter: skidFilter };

    // Wind
    const windSrc = ctx.createBufferSource();
    windSrc.buffer = buf;
    windSrc.loop = true;
    const windFilter = ctx.createBiquadFilter();
    windFilter.type = 'bandpass';
    windFilter.frequency.value = 700;
    windFilter.Q.value = 0.7;
    const windGain = ctx.createGain();
    windGain.gain.value = 0;
    windSrc.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(master);
    windSrc.start();
    this.wind = { gain: windGain, filter: windFilter };

    // Boost whoosh
    const boostSrc = ctx.createBufferSource();
    boostSrc.buffer = buf;
    boostSrc.loop = true;
    const boostFilter = ctx.createBiquadFilter();
    boostFilter.type = 'highpass';
    boostFilter.frequency.value = 1200;
    const boostGain = ctx.createGain();
    boostGain.gain.value = 0;
    boostSrc.connect(boostFilter);
    boostFilter.connect(boostGain);
    boostGain.connect(master);
    boostSrc.start();
    this.boost = { gain: boostGain };

    this.ready = true;
    this.resume();
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  }

  setMuted(muted) {
    this.muted = muted;
    if (this.master) this.master.gain.setTargetAtTime(muted ? 0 : 0.55, this.ctx.currentTime, 0.05);
  }

  update({ speed = 0, throttle = 0, drifting = false, boosting = false, onRoad = true, running = true }) {
    if (!this.ready) return;
    const t = this.ctx.currentTime;
    const s = Math.min(1, speed / 240);
    const rpm = 42 + s * 150 + (throttle > 0 ? 12 : 0);
    this.engine.o1.frequency.setTargetAtTime(rpm, t, 0.05);
    this.engine.o2.frequency.setTargetAtTime(rpm * 1.01 + 2, t, 0.05);
    this.engine.sub.frequency.setTargetAtTime(rpm * 0.5, t, 0.05);
    this.engine.filter.frequency.setTargetAtTime(500 + s * 2600, t, 0.08);
    const engineLevel = running ? 0.055 + s * 0.09 + throttle * 0.03 : 0.03;
    this.engine.gain.gain.setTargetAtTime(engineLevel, t, 0.08);

    this.wind.gain.gain.setTargetAtTime(running ? s * s * 0.16 : 0, t, 0.15);
    this.wind.filter.frequency.setTargetAtTime(500 + s * 900, t, 0.2);
    this.skid.gain.gain.setTargetAtTime(drifting && running ? 0.055 : 0, t, 0.06);
    this.skid.filter.frequency.setTargetAtTime(2000 + s * 900, t, 0.1);
    this.boost.gain.gain.setTargetAtTime(boosting && running ? 0.07 : 0, t, 0.08);
    if (!onRoad && running) this.engine.gain.gain.setTargetAtTime(engineLevel * 1.1, t, 0.1);
  }

  beep(freq = 440, dur = 0.12, type = 'square', vol = 0.15) {
    if (!this.ready) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g);
    g.connect(this.master);
    o.start(t);
    o.stop(t + dur + 0.02);
  }

  lapChime(good = true) {
    this.beep(good ? 880 : 320, 0.14, 'triangle', 0.16);
    setTimeout(() => this.beep(good ? 1320 : 260, 0.2, 'triangle', 0.12), 110);
  }

  finishFanfare() {
    const notes = [523, 659, 784, 1046];
    notes.forEach((f, i) => setTimeout(() => this.beep(f, 0.28, 'triangle', 0.16), i * 130));
  }
}
