const $ = (id) => document.getElementById(id);

export function formatTime(seconds) {
  if (!isFinite(seconds) || seconds < 0) return '--:--.---';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 1000);
  return `${m}:${String(s).padStart(2, '0')}.${String(ms).padStart(3, '0')}`;
}

export class HUD {
  constructor(track, rivalColors) {
    this.track = track;
    this.rivalColors = rivalColors;
    this.el = {
      hud: $('hud'),
      lapNow: $('lapNow'),
      raceTime: $('raceTime'),
      bestLap: $('bestLap'),
      posNow: $('posNow'),
      posSuffix: $('posSuffix'),
      speed: $('speed'),
      gear: $('gear'),
      boostFill: $('boostFill'),
      gaugeArc: $('gaugeArc'),
      driftTag: $('driftTag'),
      offTrack: $('offTrack'),
      toast: $('toast'),
      minimap: $('minimap'),
      startScreen: $('startScreen'),
      countdown: $('countdown'),
      countdownNum: $('countdownNum'),
      pauseScreen: $('pauseScreen'),
      finishScreen: $('finishScreen'),
      finishEyebrow: $('finishEyebrow'),
      finishTitle: $('finishTitle'),
      finishTime: $('finishTime'),
      finishBest: $('finishBest'),
      finishTop: $('finishTop'),
      menuBest: $('menuBest'),
      touch: $('touch'),
      speedLines: $('speedLines'),
      muteBtn: $('muteBtn')
    };
    this.mapCtx = this.el.minimap.getContext('2d');
    this.gaugeLen = this.el.gaugeArc.getTotalLength();
    this.el.gaugeArc.style.strokeDasharray = `${this.gaugeLen}`;
    this.el.gaugeArc.style.strokeDashoffset = `${this.gaugeLen}`;
    this.toastTimer = null;
    this.mapPoints = [];
    for (let i = 0; i < track.N; i += 7) this.mapPoints.push(track.samples[i]);
    this.computeMapBounds();
    this.lastHud = {};
  }

  computeMapBounds() {
    let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
    for (const p of this.track.samples) {
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.z < minZ) minZ = p.z;
      if (p.z > maxZ) maxZ = p.z;
    }
    this.bounds = { minX, maxX, minZ, maxZ };
  }

  setHudVisible(v) {
    this.el.hud.classList.toggle('hidden', !v);
  }

  setTouchVisible(v) {
    this.el.touch.classList.toggle('hidden', !v);
    document.body.classList.toggle('touch-mode', !!v);
  }

  showStart(v) {
    this.el.startScreen.classList.toggle('hidden', !v);
  }

  showPause(v) {
    this.el.pauseScreen.classList.toggle('hidden', !v);
  }

  showFinish(v) {
    this.el.finishScreen.classList.toggle('hidden', !v);
  }

  setBest(best) {
    const txt = best ? formatTime(best) : '--:--.---';
    this.el.bestLap.textContent = txt;
    this.el.menuBest.textContent = txt;
  }

  setCountdown(text, isGo = false) {
    this.el.countdown.classList.remove('hidden');
    const span = this.el.countdownNum;
    span.textContent = text;
    span.classList.toggle('go', isGo);
    span.style.animation = 'none';
    void span.offsetWidth;
    span.style.animation = '';
  }

  hideCountdown() {
    this.el.countdown.classList.add('hidden');
  }

  toast(title, sub = '', duration = 2000) {
    const el = this.el.toast;
    el.innerHTML = `${title}${sub ? `<small>${sub}</small>` : ''}`;
    el.classList.add('on');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => el.classList.remove('on'), duration);
  }

  update(d) {
    if (d.speed !== undefined) this.el.speed.textContent = String(Math.round(d.speed));
    if (d.gear !== undefined) this.el.gear.textContent = d.gear;
    if (d.lap !== undefined) this.el.lapNow.textContent = String(d.lap);
    if (d.time !== undefined) this.el.raceTime.textContent = formatTime(d.time);
    if (d.best !== undefined) this.el.bestLap.textContent = d.best ? formatTime(d.best) : '--:--.---';
    if (d.position !== undefined) {
      this.el.posNow.textContent = String(d.position);
      this.el.posSuffix.textContent = ['th', 'st', 'nd', 'rd'][d.position] || 'th';
    }
    if (d.boost !== undefined) this.el.boostFill.style.width = `${Math.round(d.boost * 100)}%`;
    if (d.speed !== undefined) {
      const frac = Math.min(1, d.speed / 300);
      this.el.gaugeArc.style.strokeDashoffset = `${this.gaugeLen * (1 - frac)}`;
    }
    if (d.drifting !== undefined) this.el.driftTag.classList.toggle('on', !!d.drifting);
    if (d.offTrack !== undefined) this.el.offTrack.classList.toggle('on', !!d.offTrack);
    if (d.speedLines !== undefined) this.el.speedLines.classList.toggle('on', !!d.speedLines);
  }

  drawMap(player, rivals) {
    const ctx = this.mapCtx;
    const w = this.el.minimap.width;
    const h = this.el.minimap.height;
    ctx.clearRect(0, 0, w, h);

    const { minX, maxX, minZ, maxZ } = this.bounds;
    const pad = 30;
    const scale = Math.min((w - pad * 2) / (maxX - minX), (h - pad * 2) / (maxZ - minZ));
    const ox = (w - (maxX - minX) * scale) / 2 - minX * scale;
    const oy = (h - (maxZ - minZ) * scale) / 2 - minZ * scale;
    const mx = (x) => ox + x * scale;
    const my = (z) => oy + z * scale;

    // water
    const wc = { x: 25, z: 10 };
    ctx.beginPath();
    ctx.arc(mx(wc.x), my(wc.z), 80 * scale, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(70, 170, 190, 0.16)';
    ctx.fill();

    // track
    ctx.beginPath();
    this.mapPoints.forEach((p, i) => {
      const x = mx(p.x);
      const y = my(p.z);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.lineJoin = 'round';
    ctx.strokeStyle = 'rgba(5, 7, 14, 0.55)';
    ctx.lineWidth = 13;
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255, 244, 230, 0.28)';
    ctx.lineWidth = 9;
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255, 122, 60, 0.85)';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // start line
    const f = this.track.frameAt(0);
    ctx.save();
    ctx.translate(mx(f.pos.x), my(f.pos.z));
    ctx.rotate(Math.atan2(f.tangent.x, f.tangent.z));
    ctx.fillStyle = '#f6f1e6';
    ctx.fillRect(-7 * scale, -1.2, 14 * scale, 2.4);
    ctx.restore();

    // rivals
    rivals.forEach((r, i) => {
      ctx.beginPath();
      ctx.arc(mx(r.pos.x), my(r.pos.z), 5, 0, Math.PI * 2);
      ctx.fillStyle = this.rivalColors[i];
      ctx.fill();
      ctx.strokeStyle = 'rgba(5,7,14,0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // player
    const px = mx(player.pos.x);
    const py = my(player.pos.z);
    ctx.beginPath();
    ctx.arc(px, py, 11, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 122, 60, 0.22)';
    ctx.fill();
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(Math.PI - player.yaw);
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.lineTo(6, 6);
    ctx.lineTo(0, 3);
    ctx.lineTo(-6, 6);
    ctx.closePath();
    ctx.fillStyle = '#fff4e6';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 122, 60, 0.9)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
  }

  showResults({ placement, time, best, top }) {
    const suffix = ['th', 'st', 'nd', 'rd'][placement] || 'th';
    this.el.finishEyebrow.textContent = placement === 1 ? 'RACE COMPLETE · VICTORY' : 'RACE COMPLETE';
    this.el.finishTitle.textContent = `${placement}${suffix} Place`;
    this.el.finishTime.textContent = formatTime(time);
    this.el.finishBest.textContent = formatTime(best);
    this.el.finishTop.textContent = `${Math.round(top)} KM/H`;
    this.showFinish(true);
  }
}
