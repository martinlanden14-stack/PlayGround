/** All DOM HUD, menus, radar and floating combat text. */
export class UI {
  constructor(hooks = {}) {
    this.hooks = hooks;
    this.$ = (id) => document.getElementById(id);

    this.hud = this.$('hud');
    this.hpFill = this.$('hp-fill');
    this.hpNum = this.$('hp-num');
    this.waveNum = this.$('wave-num');
    this.hostiles = this.$('hostile-count');
    this.score = this.$('score');
    this.bestEl = this.$('best');
    this.menuBest = this.$('menu-best');
    this.combo = this.$('combo');
    this.ammoBox = this.$('ammo-box');
    this.ammoNum = this.$('ammo-num');
    this.ammoMax = this.$('ammo-max');
    this.reloadTrack = this.$('reload-track');
    this.reloadFill = this.$('reload-fill');
    this.dashBtn = this.$('btn-dash');
    this.reloadBtn = this.$('btn-reload');
    this.fireBtn = this.$('btn-fire');
    this.crosshair = this.$('crosshair');
    this.hitmarkerEl = this.$('hitmarker');
    this.dmgLayer = this.$('dmg-layer');
    this.banner = this.$('banner');
    this.bannerMain = this.$('banner-main');
    this.bannerSub = this.$('banner-sub');
    this.bossPanel = this.$('boss-panel');
    this.bossName = this.$('boss-name');
    this.bossFill = this.$('boss-fill');
    this.fxDamage = this.$('fx-damage');
    this.radar = this.$('radar');
    this.radarCtx = this.radar.getContext('2d');

    this.screens = {
      menu: this.$('screen-menu'),
      pause: this.$('screen-pause'),
      over: this.$('screen-over'),
    };

    this.autoBtn = this.$('btn-auto');
    this.audioBtn = this.$('btn-audio');
    this.pauseBtn = this.$('btn-pause');

    this.best = Number(localStorage.getItem('nb_best') || 0);
    this.bestEl.textContent = `BEST ${this.best}`;
    this.menuBest.textContent = String(this.best);

    this._bannerTimer = 0;
    this._dmgPool = [];
    this._radarT = 0;
    this._lastCombo = '';

    this._bind();
  }

  _bind() {
    this.$('btn-start').addEventListener('click', () => this.hooks.onStart?.());
    this.$('btn-resume').addEventListener('click', () => this.hooks.onResume?.());
    this.$('btn-quit').addEventListener('click', () => this.hooks.onRestart?.());
    this.$('btn-redeploy').addEventListener('click', () => this.hooks.onRestart?.());
    this.pauseBtn.addEventListener('click', () => this.hooks.onPause?.());
    this.autoBtn.addEventListener('click', () => this.hooks.onToggleAuto?.());
    this.audioBtn.addEventListener('click', () => this.hooks.onToggleAudio?.());
    this.reloadBtn.addEventListener('click', (e) => { e.preventDefault(); this.hooks.onReload?.(); });
    this.dashBtn.addEventListener('click', (e) => { e.preventDefault(); this.hooks.onDash?.(); });
  }

  showHud(show) {
    this.hud.classList.toggle('hidden', !show);
    this.hud.setAttribute('aria-hidden', show ? 'false' : 'true');
  }

  hideScreens() {
    Object.values(this.screens).forEach((s) => s.classList.add('hidden'));
  }

  showMenu() {
    this.hideScreens();
    this.screens.menu.classList.remove('hidden');
    this.showHud(false);
  }

  showPause({ wave, score, kills }) {
    this.$('pause-wave').textContent = String(wave);
    this.$('pause-score').textContent = score.toLocaleString();
    this.$('pause-kills').textContent = String(kills);
    this.screens.pause.classList.remove('hidden');
  }

  hidePause() {
    this.screens.pause.classList.add('hidden');
  }

  showGameOver({ score, wave, kills, best }) {
    this.hideScreens();
    this.$('over-score').textContent = score.toLocaleString();
    this.$('over-wave').textContent = String(wave);
    this.$('over-kills').textContent = String(kills);
    this.$('over-best').textContent = best.toLocaleString();
    this.screens.over.classList.remove('hidden');
  }

  setHealth(hp, max = 100) {
    const pct = Math.max(0, Math.min(100, (hp / max) * 100));
    this.hpFill.style.width = `${pct}%`;
    this.hpNum.textContent = String(Math.max(0, Math.round(hp)));
    this.hpFill.classList.toggle('warn', pct <= 50 && pct > 25);
    this.hpFill.classList.toggle('crit', pct <= 25);
    document.body.classList.toggle('low-health', pct <= 25);
  }

  setWave(wave) {
    this.waveNum.textContent = String(wave);
  }

  setHostiles(count) {
    const text = count > 0 ? `${count} HOSTILE${count === 1 ? '' : 'S'}` : 'SECTOR CLEAR';
    if (text !== this._hostilesText) {
      this._hostilesText = text;
      this.hostiles.textContent = text;
    }
  }

  setScore(value) {
    this.score.textContent = value.toLocaleString();
  }

  setBest(value) {
    this.best = value;
    this.bestEl.textContent = `BEST ${value}`;
    this.menuBest.textContent = String(value);
  }

  setCombo(mult, chain) {
    if (mult <= 1.01) {
      this.combo.classList.remove('show');
      this._lastCombo = '';
      return;
    }
    const text = `x${mult.toFixed(1)}  ·  ${chain} CHAIN`;
    if (text !== this._lastCombo) {
      this.combo.textContent = text;
      this._lastCombo = text;
      this.combo.classList.remove('show');
      void this.combo.offsetWidth;
      this.combo.classList.add('show');
    }
  }

  setAmmo(ammo, max, reloading = false, progress = 0) {
    this.ammoNum.textContent = String(ammo);
    this.ammoMax.textContent = `/ ${max}`;
    this.ammoBox.classList.toggle('low', ammo <= 6);
    this.reloadTrack.classList.toggle('active', reloading);
    this.reloadFill.style.width = `${Math.min(100, progress * 100)}%`;
    this.ammoBox.classList.toggle('reloading', reloading);
    this.$('ammo-sub').textContent = reloading ? 'RELOADING' : 'PULSE RIFLE';
  }

  setReloading(active, progress = 0, ammo = null, max = null) {
    this.reloadTrack.classList.toggle('active', active);
    this.reloadFill.style.width = `${Math.min(100, progress * 100)}%`;
    this.ammoBox.classList.toggle('reloading', active);
    this.$('ammo-sub').textContent = active ? 'RELOADING' : 'PULSE RIFLE';
    if (ammo !== null) this.ammoNum.textContent = String(ammo);
    if (max !== null) this.ammoMax.textContent = `/ ${max}`;
  }

  setDashReady(ready) {
    this.dashBtn.disabled = !ready;
    this.dashBtn.style.opacity = ready ? '1' : '0.32';
  }

  setBoss(boss) {
    if (!boss) {
      this.bossPanel.classList.add('hidden');
      this._bossHp = null;
      return;
    }
    this.bossPanel.classList.remove('hidden');
    const hp = Math.ceil(boss.hp);
    if (hp !== this._bossHp) {
      this._bossHp = hp;
      this.bossName.textContent = `${boss.name} // ${hp}`;
      this.bossFill.style.width = `${Math.max(0, (boss.hp / boss.max) * 100)}%`;
    }
  }

  showBanner(main, sub, duration = 2.2, danger = false) {
    this.bannerMain.textContent = main;
    this.bannerSub.textContent = sub;
    this.banner.classList.toggle('danger', danger);
    this.banner.classList.add('show');
    clearTimeout(this._bannerTimer);
    this._bannerTimer = setTimeout(() => this.banner.classList.remove('show'), duration * 1000);
  }

  hideBanner() {
    clearTimeout(this._bannerTimer);
    this.banner.classList.remove('show');
  }

  hitmarker(kill = false) {
    this.hitmarkerEl.classList.remove('pop');
    this.hitmarkerEl.classList.toggle('kill', kill);
    void this.hitmarkerEl.offsetWidth;
    this.hitmarkerEl.classList.add('pop');
  }

  crosshairHot(hot, spread = 0) {
    this.crosshair.classList.toggle('hot', hot);
    const gap = 9 + Math.min(10, spread);
    const arms = this.crosshair.querySelectorAll('.ch-arm');
    arms[0].style.transform = `translateY(${-gap + 9}px)`;
    arms[1].style.transform = `translateX(${gap - 9}px)`;
    arms[2].style.transform = `translateY(${gap - 9}px)`;
    arms[3].style.transform = `translateX(${-gap + 9}px)`;
  }

  damageNumber(worldPos, camera, value, kind = '') {
    const v = worldPos.clone();
    v.project(camera);
    if (v.z > 1 || v.z < -1) return;
    const x = (v.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-v.y * 0.5 + 0.5) * window.innerHeight;
    if (x < -40 || x > window.innerWidth + 40 || y < -40 || y > window.innerHeight + 40) return;

    let el = this._dmgPool.find((d) => !d.used);
    if (!el) {
      if (this._dmgPool.length >= 18) return;
      const node = document.createElement('div');
      node.className = 'dmg';
      this.dmgLayer.appendChild(node);
      el = { node, used: false };
      this._dmgPool.push(el);
    }
    el.used = true;
    el.node.className = `dmg ${kind}`;
    el.node.textContent = String(value);
    el.node.style.left = `${x + (Math.random() - 0.5) * 16}px`;
    el.node.style.top = `${y}px`;
    el.node.style.animation = 'none';
    void el.node.offsetWidth;
    el.node.style.animation = '';
    setTimeout(() => { el.used = false; }, 760);
  }

  flashDamage() {
    this.fxDamage.classList.add('show');
    clearTimeout(this._dmgTimer);
    this._dmgTimer = setTimeout(() => this.fxDamage.classList.remove('show'), 90);
  }

  setAuto(on) {
    this.autoBtn.classList.toggle('on', on);
  }

  setMuted(muted) {
    this.audioBtn.classList.toggle('on', !muted);
    this.audioBtn.textContent = muted ? 'MUTE' : 'SND';
  }

  updateRadar(dt, playerPos, yaw, enemies) {
    this._radarT += dt;
    const ctx = this.radarCtx;
    const size = this.radar.width;
    const c = size / 2;
    const scale = (size / 2 - 8) / 26;
    ctx.clearRect(0, 0, size, size);

    ctx.save();
    ctx.beginPath();
    ctx.arc(c, c, c - 2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(5, 12, 24, 0.55)';
    ctx.fill();
    ctx.clip();

    // sweep
    const ang = this._radarT * 1.6;
    const grad = ctx.createRadialGradient(c, c, 0, c, c, c);
    grad.addColorStop(0, 'rgba(53, 240, 255, 0.10)');
    grad.addColorStop(1, 'rgba(53, 240, 255, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(c, c);
    ctx.arc(c, c, c, ang - 0.5, ang);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = 'rgba(53, 240, 255, 0.16)';
    ctx.lineWidth = 1;
    for (const r of [0.33, 0.66, 1]) {
      ctx.beginPath();
      ctx.arc(c, c, (c - 6) * r, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(c, 8);
    ctx.lineTo(c, size - 8);
    ctx.moveTo(8, c);
    ctx.lineTo(size - 8, c);
    ctx.stroke();

    // forward cone
    ctx.beginPath();
    ctx.moveTo(c, c);
    ctx.arc(c, c, c - 6, -Math.PI / 2 - 0.5, -Math.PI / 2 + 0.5);
    ctx.closePath();
    ctx.fillStyle = 'rgba(53, 240, 255, 0.055)';
    ctx.fill();

    // enemies
    const fx = -Math.sin(yaw);
    const fz = -Math.cos(yaw);
    const rx = Math.cos(yaw);
    const rz = -Math.sin(yaw);

    for (const e of enemies) {
      const dx = e.pos.x - playerPos.x;
      const dz = e.pos.z - playerPos.z;
      let sx = dx * rx + dz * rz;
      let sy = dx * fx + dz * fz;
      let px = c + sx * scale;
      let py = c - sy * scale;
      const maxR = c - 9;
      const d = Math.hypot(px - c, py - c);
      let clamped = false;
      if (d > maxR) {
        px = c + ((px - c) / d) * maxR;
        py = c + ((py - c) / d) * maxR;
        clamped = true;
      }
      const color = `#${e.cfg.color.toString(16).padStart(6, '0')}`;
      const dotR = e.cfg.boss ? 5 : clamped ? 2 : 3.2;
      ctx.beginPath();
      ctx.arc(px, py, dotR + 2.5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = clamped ? 0.12 : 0.2;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(px, py, dotR, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = clamped ? 0.55 : 1;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    // player arrow
    ctx.save();
    ctx.translate(c, c);
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.lineTo(5.5, 6);
    ctx.lineTo(0, 3);
    ctx.lineTo(-5.5, 6);
    ctx.closePath();
    ctx.fillStyle = '#eafcff';
    ctx.fill();
    ctx.restore();

    ctx.restore();

    ctx.strokeStyle = 'rgba(53, 240, 255, 0.28)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(c, c, c - 2, 0, Math.PI * 2);
    ctx.stroke();
  }
}
