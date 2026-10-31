// DOM HUD, screens, and player feedback.
import { clamp } from './utils.js';

const $ = (id) => document.getElementById(id);

export class UI {
  constructor(game) {
    this.game = game;

    this.hud = $('hud');
    this.healthCard = document.querySelector('.health-card');
    this.healthFill = $('health-fill');
    this.healthGhost = $('health-ghost');
    this.healthValue = $('health-value');
    this.scoreValue = $('score-value');
    this.killsValue = $('kills-value');
    this.waveValue = $('wave-value');
    this.waveEnemies = $('wave-enemies');
    this.comboCard = $('combo-card');
    this.comboValue = $('combo-value');
    this.comboFill = $('combo-fill');
    this.ammoValue = $('ammo-value');
    this.ammoPips = $('ammo-pips');
    this.reloadTip = $('reload-tip');
    this.crosshair = $('crosshair');
    this.hitmarkerEl = document.querySelector('.hitmarker');
    this.bannerEl = $('banner');
    this.bannerKicker = $('banner-kicker');
    this.bannerTitle = $('banner-title');
    this.bannerSub = $('banner-sub');
    this.toastStack = $('toast-stack');
    this.damageFlashEl = $('damage-flash');
    this.healFlashEl = $('heal-flash');
    this.bossWrap = $('boss-wrap');
    this.bossFill = $('boss-fill');
    this.bossHp = $('boss-hp');
    this.btnFire = $('btn-fire');
    this.bestEl = $('best-score');
    this.menuBest = $('menu-best');
    this.menuWave = $('menu-wave');
    this.rotateHint = $('rotate-hint');

    this.lastHealth = 100;
    this.lastAmmo = -1;
    this.lastWave = -1;
    this.bossVisible = false;
    this._bannerTimer = 0;
    this._toastCount = 0;

    this._buildAmmoPips();
    this._bind();
    this._loadBest();
    this.updateMuteButtons();

    this.portraitDismissed = false;
    try {
      this.portraitDismissed = sessionStorage.getItem('sector7.portraitOk') === '1';
    } catch {
      this.portraitDismissed = false;
    }
  }

  _bind() {
    const g = this.game;
    const safe = (fn) => (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      g.audio.init();
      g.audio.ui();
      fn();
    };

    $('btn-play')?.addEventListener('click', safe(() => g.start()));
    $('btn-again')?.addEventListener('click', safe(() => g.start()));
    $('btn-restart')?.addEventListener('click', safe(() => g.start()));
    $('btn-resume')?.addEventListener('click', safe(() => g.togglePause(false)));
    $('btn-quit')?.addEventListener('click', safe(() => g.toMenu()));
    $('btn-over-menu')?.addEventListener('click', safe(() => g.toMenu()));
    $('btn-pause')?.addEventListener('click', safe(() => g.togglePause()));
    $('btn-mute')?.addEventListener('click', safe(() => g.toggleMute()));
    $('btn-menu-mute')?.addEventListener('click', safe(() => g.toggleMute()));
    $('btn-pause-mute')?.addEventListener('click', safe(() => g.toggleMute()));

    $('btn-rotate-dismiss')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.portraitDismissed = true;
      this.rotateHint.classList.remove('show');
      document.body.classList.add('portrait-ok');
      try {
        sessionStorage.setItem('sector7.portraitOk', '1');
      } catch {
        /* ignore */
      }
    });

    window.addEventListener('resize', () => this._maybeRotateHint());
  }

  _buildAmmoPips() {
    this.ammoPips.innerHTML = '';
    for (let i = 0; i < 30; i++) {
      this.ammoPips.appendChild(document.createElement('i'));
    }
    this.pips = [...this.ammoPips.children];
  }

  _loadBest() {
    let best = 0;
    let wave = 0;
    try {
      best = parseInt(localStorage.getItem('sector7.best') || '0', 10) || 0;
      wave = parseInt(localStorage.getItem('sector7.bestWave') || '0', 10) || 0;
    } catch {
      best = 0;
    }
    this.best = best;
    this.bestWave = wave;
    this._renderBest();
  }

  _renderBest() {
    if (this.bestEl) this.bestEl.textContent = this.best.toLocaleString('en-US');
    if (this.menuBest) this.menuBest.textContent = this.best.toLocaleString('en-US');
    if (this.menuWave) this.menuWave.textContent = String(this.bestWave);
  }

  saveBest(score, wave) {
    let scoreBest = false;
    let waveBest = false;
    if (score > this.best) {
      this.best = score;
      scoreBest = true;
    }
    if (wave > this.bestWave) {
      this.bestWave = wave;
      waveBest = true;
    }
    if (scoreBest || waveBest) {
      try {
        localStorage.setItem('sector7.best', String(this.best));
        localStorage.setItem('sector7.bestWave', String(this.bestWave));
      } catch {
        /* ignore */
      }
      this._renderBest();
    }
    return scoreBest;
  }

  setHudVisible(visible) {
    this.hud.classList.toggle('active', visible);
    this.hud.setAttribute('aria-hidden', visible ? 'false' : 'true');
  }

  setScreen(name) {
    const map = { menu: 'screen-menu', pause: 'screen-pause', over: 'screen-over' };
    for (const [key, id] of Object.entries(map)) {
      const el = $(id);
      if (el) el.dataset.open = key === name ? 'true' : 'false';
    }
    if (name === 'menu' || name === 'over') {
      this.setHudVisible(false);
    }
    if (name === 'pause') {
      this.setHudVisible(true);
    }
  }

  setHealth(hp) {
    const pct = clamp(hp / 100, 0, 1) * 100;
    this.healthFill.style.width = `${pct}%`;
    this.healthGhost.style.width = `${pct}%`;
    this.healthValue.textContent = String(Math.ceil(hp));
    this.healthCard.classList.toggle('low', hp <= 30);
    this.lastHealth = hp;
  }

  damageFlash() {
    const el = this.damageFlashEl;
    el.classList.add('hit');
    clearTimeout(this._damageTimer);
    this._damageTimer = setTimeout(() => el.classList.remove('hit'), 70);
  }

  healFlash() {
    const el = this.healFlashEl;
    el.classList.add('hit');
    clearTimeout(this._healTimer);
    this._healTimer = setTimeout(() => el.classList.remove('hit'), 80);
  }

  setAmmo(ammo, mag, reloading) {
    if (ammo === this.lastAmmo && !reloading) return;
    this.lastAmmo = ammo;
    this.ammoValue.textContent = String(ammo);
    this.ammoValue.classList.toggle('low', ammo <= 6);
    for (let i = 0; i < this.pips.length; i++) {
      this.pips[i].classList.toggle('spent', i >= Math.min(ammo, this.pips.length));
    }
    if (reloading) {
      this.reloadTip.textContent = 'RELOADING';
      this.reloadTip.classList.add('show');
    } else {
      this.reloadTip.classList.remove('show');
    }
  }

  setReloading(reloading) {
    if (reloading) {
      this.reloadTip.textContent = 'RELOADING';
      this.reloadTip.classList.add('show');
    } else {
      this.reloadTip.classList.remove('show');
    }
  }

  setLocked(locked) {
    this.crosshair.classList.toggle('locked', locked);
  }

  setFirePressed(pressed) {
    this.btnFire?.classList.toggle('pressed', pressed);
  }

  hitmarker(kill = false) {
    const el = this.hitmarkerEl;
    el.classList.remove('show', 'kill');
    void el.offsetWidth;
    el.classList.add('show');
    if (kill) el.classList.add('kill');
    clearTimeout(this._hitTimer);
    this._hitTimer = setTimeout(() => el.classList.remove('show', 'kill'), 300);
  }

  scorePop(text, kill = false) {
    if (!text) return;
    const el = document.createElement('div');
    el.className = `score-pop${kill ? ' kill' : ''}`;
    el.textContent = text;
    el.style.left = `${50 + (Math.random() * 8 - 4)}%`;
    el.style.top = `${50 + (Math.random() * 6 - 3)}%`;
    this.hud.appendChild(el);
    setTimeout(() => el.remove(), 900);
  }

  toast(text, type = '') {
    if (!text) return;
    const el = document.createElement('div');
    el.className = `toast ${type}`.trim();
    el.textContent = text;
    this.toastStack.appendChild(el);
    this._toastCount++;
    setTimeout(() => {
      el.remove();
      this._toastCount--;
    }, 2300);
    if (this._toastCount > 5) {
      const first = this.toastStack.firstElementChild;
      if (first) first.remove();
    }
  }

  banner(kicker, title, sub, duration = 3200) {
    const b = this.bannerEl;
    this.bannerKicker.textContent = kicker;
    this.bannerTitle.textContent = title;
    this.bannerSub.textContent = sub;
    b.classList.remove('show');
    void b.offsetWidth;
    b.classList.add('show');
    b.style.animationDuration = `${duration}ms`;
    clearTimeout(this._bannerTimer);
    this._bannerTimer = setTimeout(() => b.classList.remove('show'), duration);
  }

  setWave(wave, remaining) {
    if (wave !== this.lastWave) {
      this.waveValue.textContent = String(wave);
      this.lastWave = wave;
    }
    this.waveEnemies.textContent = String(Math.max(0, remaining));
  }

  setScore(score) {
    this.scoreValue.textContent = score.toLocaleString('en-US');
  }

  setKills(kills) {
    this.killsValue.textContent = String(kills);
  }

  setCombo(mult, frac) {
    this.comboValue.textContent = `x${mult}`;
    this.comboCard.classList.toggle('hot', mult > 1);
    this.comboFill.style.width = `${clamp(frac, 0, 1) * 100}%`;
  }

  showBoss() {
    this.bossVisible = true;
    this.bossWrap.classList.add('show');
    this.bossFill.style.width = '100%';
    this.bossHp.textContent = '100%';
  }

  updateBoss(frac) {
    if (!this.bossVisible) return;
    const pct = clamp(frac, 0, 1);
    this.bossFill.style.width = `${pct * 100}%`;
    this.bossHp.textContent = `${Math.ceil(pct * 100)}%`;
  }

  hideBoss() {
    this.bossVisible = false;
    this.bossWrap.classList.remove('show');
  }

  updateMuteButtons() {
    const muted = this.game.audio.muted;
    $('btn-mute')?.classList.toggle('muted', muted);
    $('btn-menu-mute')?.classList.toggle('muted', muted);
    const label = $('btn-pause-mute');
    if (label) label.textContent = `SOUND: ${muted ? 'OFF' : 'ON'}`;
  }

  showPause(paused, stats) {
    if (paused) {
      $('pause-wave').textContent = String(stats?.wave || 1);
      $('pause-score').textContent = (stats?.score || 0).toLocaleString('en-US');
    }
  }

  showGameOver(stats, newBest) {
    $('over-score').textContent = stats.score.toLocaleString('en-US');
    $('over-wave').textContent = String(stats.wave);
    $('over-kills').textContent = String(stats.kills);
    $('over-combo').textContent = `x${stats.bestCombo}`;
    $('record-line').textContent = newBest ? 'NEW PERSONAL BEST' : `PERSONAL BEST  ${this.best.toLocaleString('en-US')}`;
    const sub = $('over-sub');
    if (stats.wave <= 1) sub.textContent = 'You barely scratched the arena. Try again.';
    else if (stats.wave < 4) sub.textContent = 'The machines are still operational.';
    else if (stats.wave < 7) sub.textContent = 'A respectable dent in the swarm.';
    else sub.textContent = 'The grid remembers your name.';
  }

  _maybeRotateHint() {
    if (!this.game.input?.isTouch) return;
    if (this.portraitDismissed) return;
    if (document.body.classList.contains('portrait-ok')) return;
    const portrait = window.innerHeight > window.innerWidth * 1.05;
    if (portrait && this.game.state === 'playing') {
      this.rotateHint.classList.add('show');
    } else if (!portrait) {
      this.rotateHint.classList.remove('show');
    }
  }

  maybeRotateHint() {
    this._maybeRotateHint();
  }

  isRotateHintVisible() {
    return this.rotateHint.classList.contains('show');
  }
}
