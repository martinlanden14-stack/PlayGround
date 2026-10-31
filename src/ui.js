const $ = (id) => document.getElementById(id);

export class UI {
  constructor() {
    this.el = {
      loading: $('loading'),
      loadingFill: $('loading-fill'),
      loadingStatus: $('loading-status'),
      loadingTip: $('loading-tip'),
      title: $('title-screen'),
      hud: $('hud'),
      pause: $('pause-screen'),
      death: $('death-screen'),
      credits: $('credits-screen'),
      settings: $('settings-screen'),
      healthFill: $('health-fill'),
      healthGhost: $('health-ghost'),
      healthNum: $('health-num'),
      armorFill: $('armor-fill'),
      waveNum: $('wave-num'),
      zombiesLeft: $('zombies-left'),
      score: $('score-num'),
      kills: $('kills-num'),
      headshots: $('headshots-num'),
      ammoMag: $('ammo-mag'),
      ammoReserve: $('ammo-reserve'),
      ammoPips: $('ammo-pips'),
      crosshair: $('crosshair'),
      hitmarker: $('hitmarker'),
      headshotBadge: $('headshot-badge'),
      killFeed: $('kill-feed'),
      waveBanner: $('wave-banner'),
      wbKicker: $('wb-kicker'),
      wbTitle: $('wb-title'),
      wbSub: $('wb-sub'),
      damageFlash: $('damage-flash'),
      lowHealth: $('low-health'),
      prompt: $('prompt'),
      fps: $('fps-meter'),
      pauseStats: $('pause-stats'),
      deathStats: $('death-stats'),
      deathQuote: $('death-quote'),
      mobileControls: $('mobile-controls'),
    };
    this._pips = [];
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('i');
      this.el.ammoPips.appendChild(p);
      this._pips.push(p);
    }
    this._damageTimer = 0;
    this._hitTimer = 0;
    this._lastHp = 100;
    this._ghostTimer = 0;
  }

  setLoading(p, status) {
    this.el.loadingFill.style.width = `${Math.round(p * 100)}%`;
    if (status) this.el.loadingStatus.textContent = status;
  }

  hideLoading() {
    this.el.loading.classList.add('hidden');
  }

  showTitle() {
    this.el.title.classList.remove('hidden');
    this.el.hud.classList.add('hidden');
    document.body.classList.remove('in-game');
  }

  hideTitle() {
    this.el.title.classList.add('hidden');
  }

  showHUD() {
    this.el.hud.classList.remove('hidden');
    document.body.classList.add('in-game');
  }

  hideHUD() {
    this.el.hud.classList.add('hidden');
    document.body.classList.remove('in-game');
  }

  setHealth(hp, max = 100) {
    const pct = Math.max(0, Math.min(1, hp / max));
    this.el.healthFill.style.width = `${pct * 100}%`;
    this.el.healthNum.textContent = Math.ceil(hp);
    if (pct < 0.34) {
      this.el.healthNum.style.color = '#ff5a45';
      this.el.lowHealth.style.opacity = '1';
    } else {
      this.el.healthNum.style.color = '';
      this.el.lowHealth.style.opacity = '0';
    }
    if (hp < this._lastHp) {
      this.el.healthGhost.style.transition = 'none';
      this.el.healthGhost.style.width = `${this._lastHp / max * 100}%`;
      requestAnimationFrame(() => {
        this.el.healthGhost.style.transition = 'width 0.8s ease-out 0.25s';
        this.el.healthGhost.style.width = `${pct * 100}%`;
      });
    } else {
      this.el.healthGhost.style.width = `${pct * 100}%`;
    }
    this._lastHp = hp;
  }

  setArmor(v) {
    this.el.armorFill.style.width = `${Math.max(0, Math.min(1, v)) * 100}%`;
  }

  setAmmo(mag, reserve) {
    this.el.ammoMag.textContent = mag;
    this.el.ammoReserve.textContent = reserve;
    this.el.ammoMag.classList.toggle('low', mag <= 6);
    for (let i = 0; i < this._pips.length; i++) this._pips[i].classList.toggle('empty', i >= mag);
  }

  setWave(n, left) {
    this.el.waveNum.textContent = String(n).padStart(2, '0');
    this.el.zombiesLeft.textContent = left;
  }

  setScore(score, kills, headshots) {
    this.el.score.textContent = String(score).padStart(6, '0');
    this.el.kills.textContent = kills;
    this.el.headshots.textContent = headshots;
  }

  hitmarker(kind = '') {
    const el = this.el.hitmarker;
    el.classList.remove('show', 'kill', 'head');
    void el.offsetWidth;
    if (kind === 'kill') el.classList.add('kill');
    if (kind === 'head') el.classList.add('head');
    el.classList.add('show');
    clearTimeout(this._hitTimer);
    this._hitTimer = setTimeout(() => el.classList.remove('show'), 110);
  }

  headshot() {
    const el = this.el.headshotBadge;
    el.classList.remove('show');
    void el.offsetWidth;
    el.classList.add('show');
  }

  damage(amount = 20) {
    this.el.damageFlash.style.opacity = Math.min(0.9, 0.25 + amount / 70);
    clearTimeout(this._damageTimer);
    this._damageTimer = setTimeout(() => { this.el.damageFlash.style.opacity = '0'; }, 120);
  }

  feed(text) {
    const d = document.createElement('div');
    d.className = 'feed-item';
    d.innerHTML = text;
    this.el.killFeed.appendChild(d);
    setTimeout(() => d.remove(), 3900);
    while (this.el.killFeed.children.length > 5) this.el.killFeed.firstChild.remove();
  }

  banner(kicker, title, sub) {
    this.el.wbKicker.textContent = kicker;
    this.el.wbTitle.textContent = title;
    this.el.wbSub.textContent = sub;
    const el = this.el.waveBanner;
    el.classList.remove('show');
    void el.offsetWidth;
    el.classList.add('show');
  }

  prompt(text, show = true) {
    this.el.prompt.textContent = text;
    this.el.prompt.classList.toggle('show', show);
  }

  crosshairSpread(px) {
    this.el.crosshair.style.setProperty('--spread', `${px}px`);
  }

  setCrosshairVisible(v) {
    this.el.crosshair.style.opacity = v ? '0.9' : '0';
  }

  showPause(stats) {
    this.el.pauseStats.innerHTML = stats;
    this.el.pause.classList.remove('hidden');
  }

  hidePause() {
    this.el.pause.classList.add('hidden');
  }

  showDeath(stats, quote) {
    this.el.deathStats.innerHTML = stats;
    if (quote) this.el.deathQuote.textContent = quote;
    this.el.death.classList.remove('hidden');
  }

  hideDeath() {
    this.el.death.classList.add('hidden');
  }

  showCredits() { this.el.credits.classList.remove('hidden'); }
  hideCredits() { this.el.credits.classList.add('hidden'); }
  showSettings() { this.el.settings.classList.remove('hidden'); }
  hideSettings() { this.el.settings.classList.add('hidden'); }

  setFps(v) {
    this.el.fps.textContent = v;
  }

  setPromptAmmo() {}
}
