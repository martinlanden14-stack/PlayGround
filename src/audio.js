/* Fully procedural audio: no downloaded samples, no network. */
export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.ready = false;
    this.muted = false;
    this._lastGroan = 0;
  }

  init() {
    if (this.ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    this.ctx = ctx;

    const master = ctx.createGain();
    master.gain.value = 0.72;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18;
    comp.knee.value = 22;
    comp.ratio.value = 5;
    comp.attack.value = 0.004;
    comp.release.value = 0.28;
    master.connect(comp).connect(ctx.destination);
    this.master = master;

    // shared noise
    const len = ctx.sampleRate * 2;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    this.noise = buf;

    // short dark reverb
    const irLen = ctx.sampleRate * 1.7;
    const ir = ctx.createBuffer(2, irLen, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = ir.getChannelData(ch);
      for (let i = 0; i < irLen; i++) {
        const t = i / irLen;
        d[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 2.6) * 0.7;
      }
    }
    const conv = ctx.createConvolver();
    conv.buffer = ir;
    const revGain = ctx.createGain();
    revGain.gain.value = 0.22;
    conv.connect(revGain).connect(master);
    this.reverb = conv;

    this._buildAmbient();
    this.ready = true;
  }

  resume() {
    this.init();
    if (this.ctx?.state === 'suspended') this.ctx.resume();
  }

  setMuted(v) {
    this.muted = v;
    if (this.master) this.master.gain.setTargetAtTime(v ? 0 : 0.72, this.ctx.currentTime, 0.05);
  }

  _buildAmbient() {
    const ctx = this.ctx;
    // rain bed
    const rain = ctx.createBufferSource();
    rain.buffer = this.noise;
    rain.loop = true;
    const rainHP = ctx.createBiquadFilter(); rainHP.type = 'highpass'; rainHP.frequency.value = 480;
    const rainBP = ctx.createBiquadFilter(); rainBP.type = 'bandpass'; rainBP.frequency.value = 1900; rainBP.Q.value = 0.45;
    const rainGain = ctx.createGain(); rainGain.gain.value = 0.028;
    rain.connect(rainHP).connect(rainBP).connect(rainGain).connect(this.master);
    rain.start();

    // low wind
    const wind = ctx.createBufferSource();
    wind.buffer = this.noise;
    wind.loop = true;
    wind.playbackRate.value = 0.55;
    const windLP = ctx.createBiquadFilter(); windLP.type = 'lowpass'; windLP.frequency.value = 240; windLP.Q.value = 0.8;
    const windGain = ctx.createGain(); windGain.gain.value = 0.045;
    const lfo = ctx.createOscillator(); lfo.frequency.value = 0.08;
    const lfoGain = ctx.createGain(); lfoGain.gain.value = 0.02;
    lfo.connect(lfoGain).connect(windGain.gain);
    wind.connect(windLP).connect(windGain).connect(this.master);
    wind.start(); lfo.start();

    // dread drone
    const droneGain = ctx.createGain(); droneGain.gain.value = 0.018;
    const droneLP = ctx.createBiquadFilter(); droneLP.type = 'lowpass'; droneLP.frequency.value = 120;
    for (const f of [36, 54.5, 81]) {
      const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f;
      const g = ctx.createGain(); g.gain.value = 0.28;
      o.connect(g).connect(droneLP);
      o.start();
    }
    droneLP.connect(droneGain).connect(this.master);
  }

  _env(node, t0, peak, attack, decay, sustain = 0.0001) {
    const g = node.gain;
    g.cancelScheduledValues(t0);
    g.setValueAtTime(0.0001, t0);
    g.exponentialRampToValueAtTime(Math.max(0.0002, peak), t0 + attack);
    g.exponentialRampToValueAtTime(Math.max(0.0001, sustain), t0 + attack + decay);
  }

  _send(node, amount = 0.4) {
    if (!this.reverb) return;
    const g = this.ctx.createGain();
    g.gain.value = amount;
    node.connect(g).connect(this.reverb);
  }

  gunshot() {
    if (!this.ready) return;
    const ctx = this.ctx, t = ctx.currentTime;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    src.playbackRate.value = 1.1 + Math.random() * 0.15;
    const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 320;
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1550 + Math.random() * 500; bp.Q.value = 0.6;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 7200;
    const g = ctx.createGain();
    this._env(g, t, 0.75, 0.002, 0.19);
    src.connect(hp).connect(bp).connect(lp).connect(g).connect(this.master);
    this._send(g, 0.5);
    src.start(t); src.stop(t + 0.3);

    const osc = ctx.createOscillator(); osc.type = 'sine';
    osc.frequency.setValueAtTime(128, t);
    osc.frequency.exponentialRampToValueAtTime(38, t + 0.14);
    const og = ctx.createGain(); this._env(og, t, 0.55, 0.002, 0.16);
    osc.connect(og).connect(this.master);
    this._send(og, 0.3);
    osc.start(t); osc.stop(t + 0.22);

    // mechanical snap
    const snap = ctx.createBufferSource(); snap.buffer = this.noise;
    const snapBP = ctx.createBiquadFilter(); snapBP.type = 'bandpass'; snapBP.frequency.value = 3200; snapBP.Q.value = 2.2;
    const sg = ctx.createGain(); this._env(sg, t, 0.16, 0.001, 0.035);
    snap.connect(snapBP).connect(sg).connect(this.master);
    snap.start(t); snap.stop(t + 0.08);
  }

  dryFire() {
    if (!this.ready) return;
    const ctx = this.ctx, t = ctx.currentTime;
    const src = ctx.createBufferSource(); src.buffer = this.noise;
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 2500; bp.Q.value = 3;
    const g = ctx.createGain(); this._env(g, t, 0.22, 0.001, 0.045);
    src.connect(bp).connect(g).connect(this.master);
    src.start(t); src.stop(t + 0.07);
  }

  reload() {
    if (!this.ready) return;
    const ctx = this.ctx, t = ctx.currentTime;
    const clicks = [0, 0.32, 0.62, 1.05, 1.4];
    for (const c of clicks) {
      const src = ctx.createBufferSource(); src.buffer = this.noise;
      const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 900 + Math.random() * 1400; bp.Q.value = 2.5;
      const g = ctx.createGain(); this._env(g, t + c, 0.18, 0.001, 0.06);
      src.connect(bp).connect(g).connect(this.master);
      src.start(t + c); src.stop(t + c + 0.09);
    }
  }

  impact(headshot) {
    if (!this.ready) return;
    const ctx = this.ctx, t = ctx.currentTime;
    if (headshot) {
      const src = ctx.createBufferSource(); src.buffer = this.noise;
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900;
      const g = ctx.createGain(); this._env(g, t, 0.35, 0.001, 0.13);
      src.connect(lp).connect(g).connect(this.master);
      this._send(g, 0.25);
      src.start(t); src.stop(t + 0.2);
      const osc = ctx.createOscillator(); osc.type = 'triangle'; osc.frequency.setValueAtTime(220, t); osc.frequency.exponentialRampToValueAtTime(70, t + 0.12);
      const og = ctx.createGain(); this._env(og, t, 0.22, 0.002, 0.12);
      osc.connect(og).connect(this.master); osc.start(t); osc.stop(t + 0.2);
    } else {
      const src = ctx.createBufferSource(); src.buffer = this.noise;
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 500;
      const g = ctx.createGain(); this._env(g, t, 0.16, 0.002, 0.08);
      src.connect(lp).connect(g).connect(this.master);
      src.start(t); src.stop(t + 0.12);
    }
  }

  groan(pos, dist, boss = false) {
    if (!this.ready) return;
    const now = this.ctx.currentTime;
    if (now - this._lastGroan < 0.35) return;
    this._lastGroan = now;
    const ctx = this.ctx;
    const vol = Math.max(0.02, 0.3 / (1 + dist * 0.12));
    const base = boss ? 48 : 74 + Math.random() * 45;
    const dur = 0.7 + Math.random() * 0.7;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(base, t);
    osc.frequency.linearRampToValueAtTime(base * (0.7 + Math.random() * 0.5), t + dur);
    const lfo = ctx.createOscillator(); lfo.frequency.value = 3.4 + Math.random() * 4;
    const lg = ctx.createGain(); lg.gain.value = 8 + Math.random() * 10;
    lfo.connect(lg).connect(osc.frequency);
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 320 + Math.random() * 400; bp.Q.value = 1.4;
    const dist_ = ctx.createWaveShaper();
    const curve = new Float32Array(256);
    for (let i = 0; i < 256; i++) { const x = (i / 128) - 1; curve[i] = Math.tanh(x * 2.4); }
    dist_.curve = curve;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.12);
    g.gain.exponentialRampToValueAtTime(vol * 0.55, t + dur * 0.55);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(bp).connect(dist_).connect(g).connect(this.master);
    this._send(g, 0.35);
    osc.start(t); osc.stop(t + dur + 0.05);
    lfo.start(t); lfo.stop(t + dur + 0.05);
    // breath noise
    const n = ctx.createBufferSource(); n.buffer = this.noise;
    const nbp = ctx.createBiquadFilter(); nbp.type = 'bandpass'; nbp.frequency.value = 780; nbp.Q.value = 0.8;
    const ng = ctx.createGain(); this._env(ng, t, vol * 0.35, 0.06, dur * 0.8);
    n.connect(nbp).connect(ng).connect(this.master);
    n.start(t); n.stop(t + dur);
  }

  zombieAttack(pos, dist) {
    if (!this.ready) return;
    const ctx = this.ctx, t = ctx.currentTime;
    const vol = Math.max(0.02, 0.3 / (1 + dist * 0.16));
    const osc = ctx.createOscillator(); osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110, t); osc.frequency.exponentialRampToValueAtTime(52, t + 0.32);
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 480; bp.Q.value = 1.2;
    const g = ctx.createGain(); this._env(g, t, vol * 1.4, 0.015, 0.3);
    osc.connect(bp).connect(g).connect(this.master);
    osc.start(t); osc.stop(t + 0.4);
  }

  zombieDeath() {
    if (!this.ready) return;
    const ctx = this.ctx, t = ctx.currentTime;
    const src = ctx.createBufferSource(); src.buffer = this.noise;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 620;
    const g = ctx.createGain(); this._env(g, t, 0.3, 0.005, 0.4);
    src.connect(lp).connect(g).connect(this.master);
    this._send(g, 0.3);
    src.start(t); src.stop(t + 0.5);
    const osc = ctx.createOscillator(); osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(90, t); osc.frequency.exponentialRampToValueAtTime(28, t + 0.5);
    const og = ctx.createGain(); this._env(og, t, 0.12, 0.01, 0.45);
    osc.connect(og).connect(this.master); osc.start(t); osc.stop(t + 0.55);
  }

  playerHurt() {
    if (!this.ready) return;
    const ctx = this.ctx, t = ctx.currentTime;
    const osc = ctx.createOscillator(); osc.type = 'sine';
    osc.frequency.setValueAtTime(72, t); osc.frequency.exponentialRampToValueAtTime(36, t + 0.4);
    const g = ctx.createGain(); this._env(g, t, 0.5, 0.004, 0.4);
    osc.connect(g).connect(this.master); osc.start(t); osc.stop(t + 0.5);
    const src = ctx.createBufferSource(); src.buffer = this.noise;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 300;
    const ng = ctx.createGain(); this._env(ng, t, 0.25, 0.002, 0.22);
    src.connect(lp).connect(ng).connect(this.master);
    src.start(t); src.stop(t + 0.3);
    // tinnitus
    const ring = ctx.createOscillator(); ring.type = 'sine'; ring.frequency.value = 4200;
    const rg = ctx.createGain(); this._env(rg, t, 0.03, 0.05, 0.9);
    ring.connect(rg).connect(this.master); ring.start(t); ring.stop(t + 1);
  }

  heartbeat(intensity = 1) {
    if (!this.ready) return;
    const ctx = this.ctx, t = ctx.currentTime;
    const beat = (offset, vol) => {
      const osc = ctx.createOscillator(); osc.type = 'sine';
      osc.frequency.setValueAtTime(58, t + offset); osc.frequency.exponentialRampToValueAtTime(32, t + offset + 0.14);
      const g = ctx.createGain(); this._env(g, t + offset, vol, 0.005, 0.18);
      osc.connect(g).connect(this.master); osc.start(t + offset); osc.stop(t + offset + 0.25);
    };
    beat(0, 0.22 * intensity);
    beat(0.19, 0.13 * intensity);
  }

  thunder() {
    if (!this.ready) return;
    const ctx = this.ctx, t = ctx.currentTime;
    const src = ctx.createBufferSource(); src.buffer = this.noise;
    src.playbackRate.value = 0.32;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.setValueAtTime(320, t); lp.frequency.exponentialRampToValueAtTime(90, t + 2.2);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.5, t + 0.15);
    g.gain.exponentialRampToValueAtTime(0.18, t + 1.2);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 3);
    src.connect(lp).connect(g).connect(this.master);
    this._send(g, 0.5);
    src.start(t); src.stop(t + 3.2);
  }

  uiClick() {
    if (!this.ready) return;
    const ctx = this.ctx, t = ctx.currentTime;
    const osc = ctx.createOscillator(); osc.type = 'square'; osc.frequency.value = 880;
    const g = ctx.createGain(); this._env(g, t, 0.045, 0.001, 0.05);
    osc.connect(g).connect(this.master); osc.start(t); osc.stop(t + 0.07);
  }
}
