/* ============================================================
   NEON BREACH — HUD / DOM binding
   ============================================================ */
export class HUD {
  constructor(game) {
    this.game = game;
    this.el = (id) => document.getElementById(id);

    this.hud = this.el('hud');
    this.hpValue = this.el('hp-value');
    this.hpFill = this.el('hp-fill');
    this.lowhp = this.el('lowhp');
    this.waveValue = this.el('wave-value');
    this.enemiesLeft = this.el('enemies-left');
    this.scoreValue = this.el('score-value');
    this.combo = this.el('combo');
    this.comboValue = this.el('combo-value');
    this.ammoMag = this.el('ammo-mag');
    this.ammoReserve = this.el('ammo-reserve');
    this.reloadBar = this.el('reload-bar');
    this.reloadFill = this.el('reload-fill');
    this.ammoHint = this.el('ammo-hint');
    this.crosshair = this.el('crosshair');
    this.hitmarkerEl = this.el('hitmarker');
    this.killfeedEl = this.el('killfeed');
    this.banner = this.el('wave-banner');
    this.bannerTitle = this.el('wb-title');
    this.bannerSub = this.el('wb-sub');
    this.damageEl = this.el('damage-flash');
    this.damageDirEl = this.el('hit-damage');
    this.radar = this.el('radar');
    this.rctx = this.radar.getContext('2d');
    this.fpsMeter = this.el('fps-meter');
    this.rotateHint = this.el('rotate-hint');

    this.hpShown = 100;
    this.radarT = 0;
    this.damageFlashV = 0;
    this.sweep = 0;
    this.score = 0;
    this.enemyBlips = [];
    this.lastHp = -1;
    this.fpsSmooth = 60;

    this.resizeRadar();
    window.addEventListener('resize', () => this.resizeRadar());
  }

  resizeRadar() {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const rect = this.radar.getBoundingClientRect();
    const size = Math.max(80, Math.round((rect.width || 100) * dpr));
    this.radar.width = size;
    this.radar.height = size;
    this.radarPx = size;
  }

  show() { this.hud.classList.remove('hidden'); this.hud.setAttribute('aria-hidden', 'false'); }
  hide() { this.hud.classList.add('hidden'); this.hud.setAttribute('aria-hidden', 'true'); }

  setHealth(hp, max) {
    const v = Math.max(0, Math.round(hp));
    if (v === this.lastHp) return;
    this.lastHp = v;
    this.hpValue.textContent = String(v).padStart(3, '0');
    const f = Math.max(0, hp / max);
    this.hpFill.style.width = `${f * 100}%`;
    this.hpFill.classList.toggle('mid', f <= 0.6 && f > 0.3);
    this.hpFill.classList.toggle('low', f <= 0.3);
    this.hpValue.classList.toggle('hurt', f <= 0.3);
    this.lowhp.classList.toggle('on', f <= 0.32);
  }

  setAmmo(mag, reserve) {
    this.ammoMag.textContent = String(mag);
    this.ammoMag.classList.toggle('empty', mag <= 0);
    this.ammoReserve.textContent = String(reserve);
    this.ammoHint.classList.toggle('on', mag <= 0 && reserve > 0);
  }

  setReload(k) {
    if (k < 0) {
      this.reloadBar.classList.remove('on');
      this.reloadFill.style.width = '0%';
      return;
    }
    this.reloadBar.classList.add('on');
    this.reloadFill.style.width = `${Math.min(1, k) * 100}%`;
  }

  flashReload(show = true) {
    this.ammoHint.classList.toggle('on', show);
  }

  setWave(n) {
    this.waveValue.textContent = String(n).padStart(2, '0');
  }

  setEnemies(n) {
    this.enemiesLeft.textContent = String(Math.max(0, n));
  }

  setScore(n) {
    this.score = n;
    this.scoreValue.textContent = n.toLocaleString('en-US');
  }

  setCombo(mult) {
    if (mult > 1) {
      this.combo.classList.remove('hidden');
      this.comboValue.textContent = String(mult);
      this.combo.style.animation = 'none';
      void this.combo.offsetWidth;
      this.combo.style.animation = '';
    } else {
      this.combo.classList.add('hidden');
    }
  }

  hitmarker(kill, crit) {
    const el = this.hitmarkerEl;
    el.classList.remove('show', 'kill');
    void el.offsetWidth;
    el.classList.add('show');
    if (kill) el.classList.add('kill');
    el.style.transform = `translate(-50%, -50%) rotate(45deg) scale(${crit ? 1.25 : 1})`;
  }

  setCrosshairEnemy(v) {
    this.crosshair.classList.toggle('enemy', v);
  }

  setCrosshairFiring(v) {
    this.crosshair.classList.toggle('firing', v);
  }

  killfeed(name, points, verb = 'ELIMINATED') {
    const div = document.createElement('div');
    div.className = 'kf';
    div.innerHTML = `${name} <b>${verb}</b>${points ? ` +${points}` : ''}`;
    this.killfeedEl.appendChild(div);
    while (this.killfeedEl.children.length > 4) this.killfeedEl.firstChild.remove();
    setTimeout(() => div.remove(), 1900);
  }

  waveBanner(title, sub) {
    this.bannerTitle.textContent = title;
    this.bannerSub.textContent = sub;
    this.banner.classList.remove('hidden', 'show');
    void this.banner.offsetWidth;
    this.banner.classList.add('show');
    clearTimeout(this._bannerTimer);
    this._bannerTimer = setTimeout(() => this.banner.classList.add('hidden'), 2400);
  }

  damageFlash(amount) {
    this.damageFlashV = Math.min(1, this.damageFlashV + 0.35 + amount * 0.01);
  }

  damageDirection(fromPos, playerPos, yaw) {
    const dx = fromPos.x - playerPos.x;
    const dz = fromPos.z - playerPos.z;
    const right = dx * Math.cos(yaw) - dz * Math.sin(yaw);
    const fwd = -dx * Math.sin(yaw) - dz * Math.cos(yaw);
    const angle = Math.atan2(right, fwd) * 180 / Math.PI;
    const wrap = this.damageDirEl;
    wrap.classList.remove('hidden');
    const span = wrap.querySelector('span');
    span.style.animation = 'none';
    void span.offsetWidth;
    span.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translateY(-120px)`;
    span.style.animation = '';
    clearTimeout(this._dmgDirTimer);
    this._dmgDirTimer = setTimeout(() => wrap.classList.add('hidden'), 850);
  }

  damagePopup(text) {
    // reserved for floating combat text
  }

  update(dt) {
    // damage vignette decay
    if (this.damageFlashV > 0) {
      this.damageFlashV = Math.max(0, this.damageFlashV - dt * 2.4);
      this.damageEl.style.opacity = String(this.damageFlashV * 0.9);
    }

    // fps meter
    if (dt > 0) {
      this.fpsSmooth += (1 / dt - this.fpsSmooth) * 0.08;
      this.fpsMeter.textContent = `${Math.round(this.fpsSmooth)} FPS`;
    }

    // radar 20hz
    this.radarT += dt;
    this.sweep += dt * 1.7;
    if (this.radarT > 0.05) {
      this.radarT = 0;
      this.drawRadar();
    }
  }

  drawRadar() {
    const ctx = this.rctx;
    const S = this.radarPx || 100;
    const c = S / 2;
    const R = S * 0.44;
    ctx.clearRect(0, 0, S, S);

    // scope dish
    ctx.save();
    ctx.beginPath();
    ctx.arc(c, c, R, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(4,10,20,0.55)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(69,243,255,0.35)';
    ctx.lineWidth = Math.max(1, S * 0.008);
    ctx.stroke();

    // rings
    ctx.strokeStyle = 'rgba(69,243,255,0.14)';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 2; i++) {
      ctx.beginPath();
      ctx.arc(c, c, (R * i) / 2, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(c - R, c); ctx.lineTo(c + R, c);
    ctx.moveTo(c, c - R); ctx.lineTo(c, c + R);
    ctx.stroke();

    // fov wedge
    ctx.beginPath();
    ctx.moveTo(c, c);
    ctx.arc(c, c, R, -Math.PI / 2 - 0.62, -Math.PI / 2 + 0.62);
    ctx.closePath();
    const grd = ctx.createRadialGradient(c, c, 0, c, c, R);
    grd.addColorStop(0, 'rgba(69,243,255,0.14)');
    grd.addColorStop(1, 'rgba(69,243,255,0)');
    ctx.fillStyle = grd;
    ctx.fill();

    // sweep
    const sa = this.sweep % (Math.PI * 2);
    const sg = ctx.createLinearGradient(c, c, c + Math.cos(sa) * R, c + Math.sin(sa) * R);
    sg.addColorStop(0, 'rgba(69,243,255,0.5)');
    sg.addColorStop(1, 'rgba(69,243,255,0)');
    ctx.strokeStyle = sg;
    ctx.lineWidth = Math.max(1.2, S * 0.01);
    ctx.beginPath();
    ctx.moveTo(c, c);
    ctx.lineTo(c + Math.cos(sa) * R, c + Math.sin(sa) * R);
    ctx.stroke();

    const g = this.game;
    if (!g.player) { ctx.restore(); return; }
    const p = g.player.position;
    const yaw = g.player.yaw;
    const sin = Math.sin(yaw), cos = Math.cos(yaw);
    const scale = R / 30;

    for (const e of g.enemies) {
      if (!e.alive) continue;
      const dx = e.group.position.x - p.x;
      const dz = e.group.position.z - p.z;
      let rx = dx * cos - dz * sin;
      let ry = -dx * sin - dz * cos; // forward
      let dist = Math.hypot(rx, ry);
      const maxD = 29;
      if (dist > maxD) { rx = (rx / dist) * maxD; ry = (ry / dist) * maxD; dist = maxD; }
      const x = c + rx * scale;
      const y = c - ry * scale;
      const color = '#' + e.type.color.toString(16).padStart(6, '0');
      const pulse = 0.7 + 0.3 * Math.sin(performance.now() / 180 + e.phase);
      ctx.save();
      ctx.shadowColor = color;
      ctx.shadowBlur = S * 0.06;
      ctx.fillStyle = color;
      ctx.globalAlpha = pulse;
      const br = Math.max(2, S * 0.021) * (e.typeKey === 'brute' || e.typeKey === 'elite' ? 1.5 : 1);
      ctx.beginPath();
      if (e.typeKey === 'scout') {
        ctx.moveTo(x, y - br); ctx.lineTo(x + br, y); ctx.lineTo(x, y + br); ctx.lineTo(x - br, y);
        ctx.closePath();
      } else {
        ctx.arc(x, y, br, 0, Math.PI * 2);
      }
      ctx.fill();
      ctx.restore();
    }

    // player triangle
    ctx.save();
    ctx.translate(c, c);
    ctx.fillStyle = '#e9feff';
    ctx.shadowColor = '#45f3ff';
    ctx.shadowBlur = S * 0.05;
    ctx.beginPath();
    ctx.moveTo(0, -S * 0.038);
    ctx.lineTo(S * 0.026, S * 0.03);
    ctx.lineTo(0, S * 0.017);
    ctx.lineTo(-S * 0.026, S * 0.03);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    ctx.restore();
  }
}
