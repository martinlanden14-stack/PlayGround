/* ============================================================
   UI — HUD binding, overlays, banners, feedback
   ============================================================ */

const pad2 = (n) => String(n).padStart(2, '0');

export class UI {
  constructor() {
    const $ = (id) => document.getElementById(id);
    this.hud = $('hud');
    this.menu = $('menu');
    this.pauseEl = $('pause');
    this.over = $('gameover');
    this.healthFill = $('health-fill');
    this.healthVal = $('health-val');
    this.healthPanel = document.querySelector('.health-panel');
    this.waveLabel = $('wave-label');
    this.hostilesLabel = $('hostiles-label');
    this.waveVal = $('wave-val');
    this.scoreVal = $('score-val');
    this.ammoVal = $('ammo-val');
    this.comboChip = $('combo-chip');
    this.reloadTrack = $('reload-track');
    this.reloadFill = $('reload-fill');
    this.crosshair = $('crosshair');
    this.hitmarkerEl = $('hitmarker');
    this.bannerEl = $('banner');
    this.bannerMain = $('banner-main');
    this.bannerSub = $('banner-sub');
    this.killLayer = $('killpop-layer');
    this.damageEl = $('damage-vignette');
    this.lowEl = $('low-health');
    this.menuBest = $('menu-best');
    this.fpsBadge = $('fps-badge');
    this.muteBtn = $('btn-mute');

    this._hitTimer = null;
    this._bannerTimer = null;
    this._last = { health: -1, ammo: -1, score: -1, wave: -1, hostiles: -1, combo: -1 };

    this.best = 0;
    try { this.best = Number(localStorage.getItem('neonbreach.best') || 0) || 0; } catch { /* ignore */ }
    this.menuBest.textContent = this.best.toLocaleString();

    this.debug = location.search.includes('debug');
    if (this.debug) this.fpsBadge.classList.remove('hidden');
  }

  setState(state) {
    this.menu.classList.toggle('hidden', state !== 'menu');
    this.pauseEl.classList.toggle('hidden', state !== 'paused');
    this.over.classList.toggle('hidden', state !== 'dead');
    this.hud.classList.toggle('hidden', state === 'menu');
    this.hud.classList.toggle('dim', state === 'paused' || state === 'dead');
    if (state === 'playing') {
      this.hud.classList.remove('dim');
      this.bannerEl.classList.add('hidden');
    }
  }

  reset() {
    this._last = { health: -1, ammo: -1, score: -1, wave: -1, hostiles: -1, combo: -1 };
    this.setHealth(100, 100);
    this.setAmmo(30, 30, false, 0);
    this.setScore(0);
    this.setWave(1);
    this.setHostiles(0);
    this.setCombo(1);
    this.setLowHealth(false);
    this.crosshair.style.setProperty('--spread', '9px');
    this.damageEl.classList.remove('flash');
    this.hitmarkerEl.classList.remove('show', 'kill');
    this.killLayer.innerHTML = '';
    this.reloadTrack.classList.remove('on');
  }

  setHealth(health, max = 100) {
    const h = Math.max(0, Math.round(health));
    if (h === this._last.health) return;
    this._last.health = h;
    const pct = Math.max(0, Math.min(1, health / max));
    this.healthFill.style.transform = `scaleX(${pct.toFixed(3)})`;
    this.healthVal.textContent = h;
    this.healthPanel.classList.toggle('low', pct <= 0.35);
    this.setLowHealth(pct <= 0.35 && pct > 0);
  }

  setLowHealth(on) {
    this.lowEl.classList.toggle('on', on);
  }

  setAmmo(ammo, mag, reloading = false, progress = 0) {
    if (ammo !== this._last.ammo) {
      this._last.ammo = ammo;
      this.ammoVal.textContent = ammo;
    }
    this.ammoVal.classList.toggle('empty', ammo === 0 && !reloading);
    this.reloadTrack.classList.toggle('on', reloading);
    if (reloading) this.reloadFill.style.transform = `scaleX(${Math.max(0, Math.min(1, progress)).toFixed(3)})`;
    else this.reloadFill.style.transform = 'scaleX(0)';
  }

  setScore(score) {
    if (score === this._last.score) return;
    this._last.score = score;
    this.scoreVal.textContent = score.toLocaleString();
  }

  setWave(wave) {
    if (wave === this._last.wave) return;
    this._last.wave = wave;
    this.waveVal.textContent = pad2(wave);
    this.waveLabel.textContent = `WAVE ${pad2(wave)}`;
  }

  setHostiles(n) {
    if (n === this._last.hostiles) return;
    this._last.hostiles = n;
    this.hostilesLabel.textContent = n > 0 ? `${n} HOSTILE${n === 1 ? '' : 'S'}` : 'CLEAR';
  }

  setCombo(mult) {
    if (mult === this._last.combo) return;
    this._last.combo = mult;
    if (mult > 1) {
      this.comboChip.textContent = `x${mult}`;
      this.comboChip.classList.remove('hidden');
    } else {
      this.comboChip.classList.add('hidden');
    }
  }

  setSpread(px) {
    this.crosshair.style.setProperty('--spread', `${px.toFixed(1)}px`);
  }

  showBanner(main, sub, duration = 2800) {
    this.bannerMain.textContent = main;
    this.bannerSub.textContent = sub;
    this.bannerEl.classList.remove('hidden', 'show');
    void this.bannerEl.offsetWidth;
    this.bannerEl.classList.add('show');
    clearTimeout(this._bannerTimer);
    this._bannerTimer = setTimeout(() => this.bannerEl.classList.add('hidden'), duration);
  }

  hitmarker(kill = false) {
    this.hitmarkerEl.classList.add('show');
    this.hitmarkerEl.classList.toggle('kill', kill);
    clearTimeout(this._hitTimer);
    this._hitTimer = setTimeout(() => {
      this.hitmarkerEl.classList.remove('show', 'kill');
    }, kill ? 160 : 90);
  }

  killPop(text, head = false) {
    const el = document.createElement('span');
    el.className = 'killpop' + (head ? ' head' : '');
    el.textContent = text;
    const a = Math.random() * Math.PI * 2;
    const r = 24 + Math.random() * 46;
    el.style.left = `${Math.cos(a) * r}px`;
    el.style.top = `${Math.sin(a) * r - 12}px`;
    this.killLayer.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
    if (this.killLayer.childElementCount > 8) this.killLayer.firstElementChild?.remove();
  }

  flashDamage() {
    this.damageEl.classList.remove('flash');
    void this.damageEl.offsetWidth;
    this.damageEl.classList.add('flash');
  }

  setMuted(muted) {
    this.muteBtn.classList.toggle('muted', muted);
  }

  setPauseStats(wave, score) {
    document.getElementById('pause-wave').textContent = pad2(wave);
    document.getElementById('pause-score').textContent = score.toLocaleString();
  }

  showGameOver({ score, wave, kills, accuracy }) {
    const isBest = score > this.best;
    if (isBest) {
      this.best = score;
      try { localStorage.setItem('neonbreach.best', String(score)); } catch { /* ignore */ }
    }
    document.getElementById('final-score').textContent = score.toLocaleString();
    document.getElementById('final-wave').textContent = wave;
    document.getElementById('final-kills').textContent = kills;
    document.getElementById('final-acc').textContent = `${accuracy}%`;
    document.getElementById('final-best').textContent = this.best.toLocaleString();
    this.menuBest.textContent = this.best.toLocaleString();
    this.setState('dead');
  }

  showMenu() {
    this.setState('menu');
    this.menuBest.textContent = this.best.toLocaleString();
  }

  setFPS(fps) {
    if (!this.debug) return;
    this.fpsBadge.textContent = `${Math.round(fps)} FPS`;
  }
}
