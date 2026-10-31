// The interface layer: RimWorld-style top bar, portraits, inspector, architect,
// work priorities, research, log, help and touch-friendly sheets.
import {
  BUILDINGS, BUILD_CATS, BUILD_CATS as CATS, TECH, WORK_TYPES, ITEMS, WEAPONS,
  SEASONS, TRAITS, NOTICE_COLORS, TERRAIN_BY_ID,
} from './defs.js';
import { clamp, timeString, formatNum, dayStamp } from './util.js';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const CAT_GLYPH = {
  orders: '✎', structure: '▤', furniture: '▥', production: '⚒', power: '⚡', security: '⛨', zones: '▦',
};
const WORK_GLYPH = {
  doctor: '✚', construction: '⚒', mining: '⛏', plants: '❦', cooking: '♨', hauling: '⇄', research: '✦',
};
const MOOD_COLORS = [
  ['Rapturous', '#a9d37f'], ['Content', '#8fbd6a'], ['Steady', '#d8b87a'],
  ['Uneasy', '#d3a45c'], ['Stressed', '#d0865a'], ['Breaking', '#d06a5a'],
];
const RES_META = [
  { id: 'wood', label: 'Wood', glyph: 'W', color: 'linear-gradient(140deg,#a97c46,#7a552d)', tip: 'Construction material' },
  { id: 'stone', label: 'Stone', glyph: 'S', color: 'linear-gradient(140deg,#9c988d,#6e6a60)', tip: 'Cut stone blocks' },
  { id: 'steel', label: 'Steel', glyph: 'M', color: 'linear-gradient(140deg,#a8b3b8,#727d82)', tip: 'Refined metal' },
  { id: 'food', label: 'Food', glyph: 'F', color: 'linear-gradient(140deg,#cbb56a,#9a8340)', tip: 'Grain, meat and meals' },
  { id: 'silver', label: 'Silver', glyph: 'A', color: 'linear-gradient(140deg,#d3d8de,#9aa2ab)', tip: 'Trade goods' },
  { id: 'mood', label: 'Mood', glyph: '☺', color: 'linear-gradient(140deg,#9ec47b,#6c9450)', tip: 'Average colony mood' },
];

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function moodColor(m) {
  if (m > 85) return '#a9d37f';
  if (m > 70) return '#8fbd6a';
  if (m > 55) return '#d8b87a';
  if (m > 40) return '#d3a45c';
  if (m > 24) return '#d0865a';
  return '#d06a5a';
}
function skillLabel(n) {
  return ['—', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'][clamp(n, 0, 10)] || String(n);
}
const COST_META = { wood: 'wood', stone: 'stone', steel: 'steel' };

export class UI {
  constructor(world, renderer, audio) {
    this.world = world;
    this.renderer = renderer;
    this.audio = audio;
    this.input = null;
    this.sheetType = null;
    this.lastTab = 'architect';
    this.archCat = 'structure';
    this.timer = 0;
    this.alertsSig = '';
    this.toastTimer = 0;
    this.noticeEls = [];
    this.portraitEls = new Map();
    this._portraitTimer = 0;
    this._lastSpeed = 1;
    this.isMobile = window.matchMedia('(max-width: 700px)').matches;
    this.cacheDom();
    this.bind();
    this.buildResources();
    this.buildColonistBar();
    this.renderArchCats();
    this.renderArchitect();
    this.setSpeed(1);
    this.updateTopbar();
    this.world.on('notice', (n) => this.showNotice(n));
    this.world.on('colonists', () => this.buildColonistBar());
    this.world.on('tech', () => { if (this.sheetType === 'research') this.renderResearchSheet(); this.toast('Research complete'); });
    this.world.on('raid', () => { this.updateAlerts(true); this.audio.play('alarm'); });
    this.world.on('raidEnd', () => this.updateAlerts(true));
    this.world.on('gameover', () => this.showGameOver());
    window.addEventListener('resize', () => {
      this.isMobile = window.matchMedia('(max-width: 700px)').matches;
      if (!this.isMobile) this.closeSheet();
    });
    this.updateTopbar(true);
    if (!this.isMobile) this.toggleArchitect(true);
  }

  cacheDom() {
    this.dom = {
      topbar: $('#topbar'),
      colonySub: $('#colonySub'),
      clock: $('#clock'),
      weather: $('#weather'),
      weatherGlyph: $('#weatherGlyph'),
      resources: $('#resources'),
      wealth: $('#wealth b'),
      colonistBar: $('#colonistBar'),
      alerts: $('#alerts'),
      notifications: $('#notifications'),
      inspector: $('#inspector'),
      architect: $('#architect'),
      archCats: $('#archCats'),
      archItems: $('#archItems'),
      archFoot: $('#archFoot'),
      archClose: $('#archClose'),
      toolHint: $('#toolHint'),
      toolText: $('#toolText'),
      toolRotate: $('#toolRotate'),
      toolCancel: $('#toolCancel'),
      mainTabs: $('#mainTabs'),
      minimap: $('#minimap'),
      sheet: $('#sheet'),
      backdrop: $('#sheetBackdrop'),
      toast: $('#toast'),
      help: $('#help'),
      loading: $('#loading'),
      speed: $('#speedControls'),
      mute: $('#btnMute'),
    };
  }

  bind() {
    this.dom.speed.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-speed]');
      if (!b) return;
      this.setSpeed(Number(b.dataset.speed));
      this.audio.play('click');
    });
    $('#btnHelp').addEventListener('click', () => this.toggleHelp(true));
    this.dom.mute.addEventListener('click', () => {
      this.audio.setMuted(!this.audio.muted);
      this.dom.mute.classList.toggle('muted', this.audio.muted);
      this.toast(this.audio.muted ? 'Sound off' : 'Sound on');
      if (!this.audio.muted) this.audio.play('click');
    });
    this.dom.mainTabs.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-tab]');
      if (!b) return;
      this.selectTab(b.dataset.tab);
      this.audio.play('click');
    });
    this.dom.archClose.addEventListener('click', () => this.toggleArchitect(false));
    this.dom.archCats.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-cat]');
      if (!b) return;
      this.archCat = b.dataset.cat;
      this.renderArchCats();
      this.renderArchitect();
      this.audio.play('click');
    });
    this.dom.archItems.addEventListener('click', (e) => this.onArchItemClick(e));
    this.dom.archItems.addEventListener('mouseover', (e) => this.onArchHover(e));
    this.dom.archItems.addEventListener('focusin', (e) => this.onArchHover(e));
    this.dom.archItems.addEventListener('mouseleave', () => this.setArchFoot());
    this.dom.archItems.addEventListener('mouseout', (e) => { if (!e.relatedTarget) this.setArchFoot(); });

    this.dom.inspector.addEventListener('click', (e) => this.onInspectorClick(e));
    this.dom.colonistBar.addEventListener('click', (e) => {
      const el = e.target.closest('.portrait');
      if (!el) return;
      const id = Number(el.dataset.id);
      const p = this.world.pawns.find((p) => p.id === id && p.kind === 'colonist');
      if (!p) return;
      if (e.shiftKey) this.selectPawn(p.id, true);
      else {
        this.selectPawn(p.id);
        this.renderer.focus(p.x, p.y, Math.max(1.35, this.renderer.camera.zoom));
      }
      this.audio.play('select');
    });
    this.dom.colonistBar.addEventListener('dblclick', (e) => {
      const el = e.target.closest('.portrait');
      if (!el) return;
      const p = this.world.pawnById(Number(el.dataset.id));
      if (p) this.renderer.focus(p.x, p.y, 1.8);
    });

    this.dom.toolRotate.addEventListener('click', () => { this.input?.rotateTool(); });
    this.dom.toolCancel.addEventListener('click', () => { this.input?.cancelTool(); });

    this.dom.minimap.addEventListener('pointerdown', (e) => {
      const r = this.dom.minimap.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width * this.world.W;
      const y = (e.clientY - r.top) / r.height * this.world.H;
      this.renderer.focus(x, y, this.renderer.camera.zoom);
      this.audio.play('click');
    });

    this.dom.backdrop.addEventListener('pointerdown', () => this.closeSheet());
    this.dom.help.addEventListener('click', (e) => {
      if (e.target.closest('[data-close-help]') || e.target === this.dom.help) this.toggleHelp(false);
    });
  }

  // ---------------------------------------------------------------- top bar
  buildResources() {
    this.dom.resources.innerHTML = RES_META.map((r) => `
      <div class="res ${r.id === 'food' || r.id === 'mood' ? r.id : ''}" data-res="${r.id}" title="${esc(r.tip)}">
        <span class="ric" style="background:${r.color}">${r.glyph}</span>
        <span class="rtext"><span class="rval" data-val="${r.id}">0</span><span class="rlabel">${r.label}</span></span>
      </div>`).join('');
    this.resEls = {};
    for (const r of RES_META) this.resEls[r.id] = $(`[data-val="${r.id}"]`, this.dom.resources).parentElement.parentElement;
  }

  updateTopbar(force = false) {
    const w = this.world;
    const season = SEASONS[w.month] || SEASONS[0];
    this.dom.colonySub.textContent = `${season} · Day ${dayStamp(w.day)}`;
    this.dom.clock.textContent = timeString(w.time);
    const weather = {
      clear: ['Clear skies', '☀'], overcast: ['Overcast', '☁'], rain: ['Rain', '☂'],
      storm: ['Thunderstorm', '⚡'], fog: ['Fog', '≋'],
    }[w.weather] || ['Clear skies', '☀'];
    this.dom.weather.textContent = w.eclipse > 0 ? 'Eclipse' : weather[0];
    this.dom.weatherGlyph.textContent = w.eclipse > 0 ? '◐' : weather[1];
    const c = w.countAll();
    const food = c.grain + c.meat + c.meal;
    const colonists = w.pawns.filter((p) => p.kind === 'colonist' && !p.dead);
    const mood = colonists.length ? colonists.reduce((a, p) => a + p.mood, 0) / colonists.length : 0;
    const vals = { wood: c.wood, stone: c.stone, steel: c.steel, food, silver: c.silver, mood: Math.round(mood) };
    for (const [id, v] of Object.entries(vals)) {
      const el = this.resEls[id];
      if (!el) continue;
      $('.rval', el).textContent = id === 'mood' ? `${v}` : formatNum(v);
      el.classList.toggle('low', (id === 'food' && v < 12) || (id === 'mood' && v < 35));
    }
    this.dom.wealth.textContent = formatNum(w.wealth);
    this.dom.speed.querySelectorAll('button').forEach((b) => {
      const s = Number(b.dataset.speed);
      b.classList.toggle('active', w.paused ? s === 0 : s === w.speed);
    });
    if (force) this.updateSpeedButtons();
  }

  updateSpeedButtons() {
    const w = this.world;
    this.dom.speed.querySelectorAll('button').forEach((b) => {
      const s = Number(b.dataset.speed);
      b.classList.toggle('active', w.paused ? s === 0 : s === w.speed);
    });
  }

  setSpeed(n) {
    const w = this.world;
    if (n === 0) {
      if (!w.paused) { this._lastSpeed = w.speed || 1; w.paused = true; }
    } else {
      w.paused = false;
      w.speed = n;
      this._lastSpeed = n;
    }
    this.updateSpeedButtons();
    const labels = { 0: 'Paused', 1: 'Speed 1×', 2: 'Speed 2×', 3: 'Speed 3×' };
    this.toast(labels[n]);
  }

  togglePause() {
    if (this.world.paused) this.setSpeed(this._lastSpeed || 1);
    else this.setSpeed(0);
  }

  // ---------------------------------------------------------------- portraits
  buildColonistBar() {
    const colonists = this.world.pawns.filter((p) => p.kind === 'colonist');
    this.dom.colonistBar.innerHTML = '';
    this.portraitEls.clear();
    for (const p of colonists) {
      const el = document.createElement('div');
      el.className = 'portrait';
      el.dataset.id = p.id;
      el.title = p.name;
      el.innerHTML = `<canvas width="108" height="120"></canvas>
        <span class="mood-dot"></span>
        <span class="pbadge hidden"></span>
        <span class="draft-flag hidden">DRAFT</span>
        <span class="pmeta"><span class="pname">${esc(p.name.split(' ')[0])}</span></span>`;
      this.dom.colonistBar.appendChild(el);
      this.portraitEls.set(p.id, el);
      this.drawPortraitCanvas(el, p);
    }
    this.refreshPortraitStates();
  }

  drawPortraitCanvas(el, p) {
    const cvs = el.querySelector('canvas');
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    ctx.setTransform(2, 0, 0, 2, 0, 0);
    ctx.clearRect(0, 0, 54, 60);
    this.renderer.drawPortrait(ctx, p, 54, 60);
  }

  refreshPortraitStates() {
    for (const [id, el] of this.portraitEls) {
      const p = this.world.pawns.find((p) => p.id === id);
      if (!p) { el.remove(); this.portraitEls.delete(id); continue; }
      el.classList.toggle('selected', this.renderer.selected.has(id));
      el.classList.toggle('downed', p.downed && !p.dead);
      el.classList.toggle('dead', p.dead);
      const dot = el.querySelector('.mood-dot');
      if (dot) dot.style.color = p.dead ? '#666' : moodColor(p.mood);
      const badge = el.querySelector('.pbadge');
      if (badge) {
        const breaking = p.broken > 0;
        badge.classList.toggle('hidden', !(breaking || p.bleed > 0));
        if (breaking) { badge.textContent = '!'; badge.style.background = '#d0865a'; }
        else if (p.bleed > 0) { badge.textContent = '✚'; badge.style.background = '#d06a5a'; }
      }
      const flag = el.querySelector('.draft-flag');
      if (flag) flag.classList.toggle('hidden', !p.drafted || p.dead);
      if (p.dead) el.title = `${p.name} — deceased`;
      else el.title = `${p.name} · ${p.activity()} · ${Math.round(p.mood)}% mood`;
    }
  }

  // ---------------------------------------------------------------- architect
  renderArchCats() {
    this.dom.archCats.innerHTML = BUILD_CATS.map((c) => `
      <button class="cat-btn ${c.id === this.archCat ? 'active' : ''}" data-cat="${c.id}" title="${esc(c.hint)}">
        <span class="cico">${CAT_GLYPH[c.id] || '•'}</span><span>${esc(c.name)}</span>
      </button>`).join('');
  }

  archEntries() {
    if (this.archCat === 'orders') {
      return [
        { order: 'chop', name: 'Chop trees', glyph: '🪓', hint: 'Mark trees for woodcutting', desc: 'Drag over trees to mark them. Colonists assigned to Plants or Mining will fell them for wood.' },
        { order: 'mine', name: 'Mine', glyph: '⛏', hint: 'Mark rock for mining', desc: 'Drag over boulders and ore to mine them into stone chunks and steel.' },
        { order: 'deconstruct', name: 'Deconstruct', glyph: '⌫', hint: 'Take structures apart', desc: 'Mark built structures to be taken apart. About half the materials are recovered.' },
        { order: 'hunt', name: 'Hunt', glyph: '➹', hint: 'Mark animals for hunting', desc: 'Click an animal to mark it. Armed colonists will hunt it for meat.' },
        { order: 'cancel', name: 'Cancel', glyph: '✕', hint: 'Clear orders and designs', desc: 'Click or drag over designations to cancel them. Also removes zones.' },
      ];
    }
    if (this.archCat === 'zones') {
      return [
        { zone: 'stockpile', name: 'Stockpile zone', glyph: '▦', hint: 'Store items here', desc: 'Drag a rectangle. Haulers will carry loose items into the stockpile.' },
        { zone: 'grow', name: 'Growing zone', glyph: '❦', hint: 'Sow and harvest crops', desc: 'Drag a rectangle. Colonists with the Plants work will sow and harvest it.' },
        { zoneRemove: true, name: 'Remove zone', glyph: '⌫', hint: 'Delete a zone', desc: 'Click a zone to remove it.' },
      ];
    }
    const defs = Object.entries(BUILDINGS).filter(([, d]) => d.cat === this.archCat);
    return defs.map(([id, d]) => ({ build: id, def: d, name: d.name, hint: d.desc, desc: d.desc }));
  }

  renderArchitect() {
    const entries = this.archEntries();
    const cat = BUILD_CATS.find((c) => c.id === this.archCat);
    this.dom.archItems.innerHTML = '';
    if (!entries.length) {
      this.dom.archItems.innerHTML = '<div class="arch-empty">Nothing available here yet.</div>';
      this.setArchFoot(cat?.hint || '');
      return;
    }
    for (const e of entries) {
      const card = document.createElement('button');
      card.className = 'item-card';
      const locked = e.build && e.def.tech && !this.world.hasTech(e.def.tech);
      if (locked) card.classList.add('locked');
      const tool = this.input?.tool;
      if (e.build && tool?.kind === 'build' && tool.defId === e.build) card.classList.add('selected-card');
      if (e.order && tool?.kind === 'order' && tool.order === e.order) card.classList.add('selected-card');
      if (e.zone && tool?.kind === 'zone' && tool.zone === e.zone) card.classList.add('selected-card');
      if (e.zoneRemove && tool?.kind === 'zoneRemove') card.classList.add('selected-card');
      if (e.build) card.dataset.build = e.build;
      if (e.order) card.dataset.order = e.order;
      if (e.zone) card.dataset.zone = e.zone;
      if (e.zoneRemove) card.dataset.zoneRemove = '1';
      let cost = '';
      if (e.def?.cost) {
        cost = Object.entries(e.def.cost).map(([k, v]) => {
          const miss = this.world.countItem(k) < v;
          return `<span class="${miss ? 'miss' : ''}">${v} ${COST_META[k] || k}</span>`;
        }).join(' · ');
      } else if (locked) {
        cost = `Requires ${TECH[e.def.tech]?.name || 'research'}`;
      } else {
        cost = e.hint || '';
      }
      const cvs = document.createElement('canvas');
      cvs.width = 60; cvs.height = 60;
      card.appendChild(cvs);
      const info = document.createElement('div');
      info.className = 'item-info';
      info.innerHTML = `<div class="item-name">${esc(e.name)}</div><div class="item-cost">${cost}</div>`;
      card.appendChild(info);
      this.dom.archItems.appendChild(card);
      if (e.build) this.renderer.drawDefIcon(cvs.getContext('2d'), e.build, 30);
      else this.drawToolGlyph(cvs.getContext('2d'), e);
    }
    this.setArchFoot(cat?.hint || '');
  }

  drawToolGlyph(ctx, e) {
    ctx.setTransform(2, 0, 0, 2, 0, 0);
    ctx.clearRect(0, 0, 30, 30);
    ctx.save();
    ctx.translate(15, 15);
    const color = e.zone ? (e.zone === 'grow' ? '#a6cd7d' : '#dcc68f') : e.zoneRemove || e.order === 'cancel' ? '#d08a7a' : '#dcc68f';
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 1.4;
    if (e.order === 'chop') {
      ctx.rotate(-0.5);
      ctx.fillStyle = '#a87f4d';
      ctx.fillRect(-1, -7, 2.4, 15);
      ctx.fillStyle = '#c8cdd0';
      ctx.beginPath(); ctx.moveTo(1, -7); ctx.lineTo(9, -5); ctx.lineTo(7, 1); ctx.lineTo(1, -1); ctx.closePath(); ctx.fill();
    } else if (e.order === 'mine') {
      ctx.rotate(-0.4);
      ctx.strokeStyle = '#a87f4d'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, 9); ctx.lineTo(0, -8); ctx.stroke();
      ctx.strokeStyle = '#c8cdd0'; ctx.lineWidth = 1.8;
      ctx.beginPath(); ctx.moveTo(-9, -6); ctx.quadraticCurveTo(0, -11, 9, -6); ctx.stroke();
    } else if (e.order === 'hunt') {
      ctx.strokeStyle = '#d9b87a'; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.arc(-2, 2, 7, -1.1, 1.2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-9, -6); ctx.lineTo(8, 8); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(6, 2); ctx.lineTo(10, 8); ctx.lineTo(3, 8); ctx.closePath(); ctx.fill();
    } else if (e.zone) {
      ctx.setLineDash([4, 3]);
      ctx.strokeRect(-10, -10, 20, 20);
      ctx.setLineDash([]);
      if (e.zone === 'grow') {
        ctx.beginPath(); ctx.moveTo(0, 7); ctx.lineTo(0, -5); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(-4, -3, 4, 2, -0.6, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(4, -6, 4, 2, 0.6, 0, Math.PI * 2); ctx.fill();
      } else {
        ctx.strokeRect(-5, -5, 10, 10);
        ctx.beginPath(); ctx.moveTo(-5, 0); ctx.lineTo(5, 0); ctx.moveTo(0, -5); ctx.lineTo(0, 5); ctx.stroke();
      }
    } else if (e.order === 'deconstruct' || e.zoneRemove || e.order === 'cancel') {
      ctx.beginPath(); ctx.moveTo(-7, -7); ctx.lineTo(7, 7); ctx.moveTo(7, -7); ctx.lineTo(-7, 7); ctx.stroke();
    } else {
      ctx.beginPath(); ctx.arc(0, 0, 7, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.restore();
  }

  setArchFoot(text) {
    this.dom.archFoot.innerHTML = text
      ? `<span>${esc(text)}</span>`
      : `<span><span class="hint-key">Click</span> to choose · <span class="hint-key">Drag</span> on map to place · <span class="hint-key">R</span> rotate · <span class="hint-key">Esc</span> cancel</span>`;
  }

  onArchHover(e) {
    const card = e.target.closest('.item-card');
    if (!card) return;
    const entry = this.archEntries().find((en) =>
      (en.build && card.dataset.build === en.build) ||
      (en.order && card.dataset.order === en.order) ||
      (en.zone && card.dataset.zone === en.zone) ||
      (en.zoneRemove && card.dataset.zoneRemove));
    if (!entry) return;
    let text = entry.desc || entry.hint || '';
    if (entry.def?.cost) {
      const cost = Object.entries(entry.def.cost).map(([k, v]) => `${v} ${ITEMS[k]?.name || k}`).join(', ');
      text = `${text} — Costs ${cost}.`;
    }
    this.setArchFoot(text);
  }

  onArchItemClick(e) {
    const card = e.target.closest('.item-card');
    if (!card) return;
    if (card.classList.contains('locked')) {
      const id = card.dataset.build;
      this.toast(`Requires ${TECH[BUILDINGS[id]?.tech]?.name || 'research'}`);
      this.audio.play('error');
      return;
    }
    if (card.dataset.build) {
      const id = card.dataset.build;
      const def = BUILDINGS[id];
      if (def.tech && !this.world.hasTech(def.tech)) { this.toast(`Requires ${TECH[def.tech]?.name || 'research'}`); return; }
      this.input?.setTool({ kind: 'build', defId: id, rot: 0 });
      this.toast(`${def.name} — drag to place, R to rotate`);
      this.audio.play('click');
      if (this.isMobile) this.toggleArchitect(false);
      this.renderArchitect();
      return;
    }
    if (card.dataset.order) {
      this.input?.setTool({ kind: 'order', order: card.dataset.order });
      this.audio.play('click');
      if (this.isMobile) this.toggleArchitect(false);
      this.renderArchitect();
      return;
    }
    if (card.dataset.zone) {
      this.input?.setTool({ kind: 'zone', zone: card.dataset.zone });
      this.audio.play('click');
      if (this.isMobile) this.toggleArchitect(false);
      this.renderArchitect();
      return;
    }
    if (card.dataset.zoneRemove) {
      this.input?.setTool({ kind: 'zoneRemove' });
      this.audio.play('click');
      if (this.isMobile) this.toggleArchitect(false);
      this.renderArchitect();
    }
  }

  toggleArchitect(open) {
    const show = open ?? this.dom.architect.classList.contains('hidden');
    this.dom.architect.classList.toggle('hidden', !show);
    if (show) {
      this.renderArchCats();
      this.renderArchitect();
      this.dom.mainTabs.querySelector('[data-tab="architect"]')?.classList.add('active');
    }
  }

  refreshArchitect() {
    if (!this.dom.architect.classList.contains('hidden')) this.renderArchitect();
  }

  showTool(tool) {
    if (!tool) {
      this.dom.toolHint.classList.add('hidden');
      this.renderArchitect();
      return;
    }
    let label = '';
    if (tool.kind === 'build') {
      const def = BUILDINGS[tool.defId];
      label = `Placing ${def?.name || 'structure'}${def ? ` · ${Object.entries(def.cost || {}).map(([k, v]) => `${v} ${ITEMS[k]?.name || k}`).join(', ')}` : ''}`;
    } else if (tool.kind === 'order') {
      label = { chop: 'Mark trees to chop', mine: 'Mark rock to mine', deconstruct: 'Mark structures to deconstruct', hunt: 'Click an animal to hunt', cancel: 'Click or drag to cancel orders' }[tool.order] || 'Order';
    } else if (tool.kind === 'zone') {
      label = tool.zone === 'grow' ? 'Drag a growing zone' : 'Drag a stockpile zone';
    } else if (tool.kind === 'zoneRemove') {
      label = 'Tap a zone to remove it';
    }
    this.dom.toolText.textContent = label;
    this.dom.toolHint.classList.remove('hidden');
    this.dom.toolRotate.style.display = tool.kind === 'build' ? '' : 'none';
    this.renderArchitect();
  }

  // ---------------------------------------------------------------- selection
  selectPawn(id, additive = false) {
    const r = this.renderer;
    if (!additive) { r.selected.clear(); r.selectedObj = null; r.selectedZone = null; }
    if (additive && r.selected.has(id)) r.selected.delete(id);
    else r.selected.add(id);
    this.refreshSelection();
  }

  selectObject(obj) {
    const r = this.renderer;
    r.selected.clear();
    r.selectedZone = null;
    r.selectedObj = obj?.id ?? null;
    this.refreshSelection();
  }

  selectZone(zone) {
    const r = this.renderer;
    r.selected.clear();
    r.selectedObj = null;
    r.selectedZone = zone?.id ?? null;
    this.refreshSelection();
  }

  clearSelection() {
    const r = this.renderer;
    r.selected.clear();
    r.selectedObj = null;
    r.selectedZone = null;
    r.hoverPawn = null;
    r.hoverObj = null;
    this.refreshSelection();
  }

  refreshSelection() {
    const r = this.renderer;
    this.refreshPortraitStates();
    const ids = [...r.selected];
    const w = this.world;
    if (ids.length === 1) {
      const p = w.pawnById(ids[0]) || w.pawns.find((p) => p.id === ids[0]);
      if (p) { this.renderInspectorPawn(p); return; }
    }
    if (ids.length > 1) { this.renderInspectorMulti(ids); return; }
    if (r.selectedObj) {
      const o = w.objectById(r.selectedObj);
      if (o) { this.renderInspectorObject(o); return; }
    }
    if (r.selectedZone) {
      const z = w.zones.find((z) => z.id === r.selectedZone && !z.removed);
      if (z) { this.renderInspectorZone(z); return; }
    }
    this.dom.inspector.classList.add('hidden');
    this.dom.inspector.classList.remove('has-selection');
    this.dom.inspector.dataset.sig = '';
  }

  inspectorShell(inner, sig) {
    this.dom.inspector.classList.remove('hidden');
    this.dom.inspector.classList.add('has-selection');
    this.dom.inspector.dataset.sig = sig;
    this.dom.inspector.innerHTML = inner;
    this.dynamicInspector();
  }

  renderInspectorPawn(p) {
    if (p.kind === 'animal') return this.renderInspectorAnimal(p);
    const app = p.appearance || {};
    const mood = moodColor(p.mood);
    const traits = (p.traitIds || []).map((id) => TRAITS.find((t) => t.id === id)).filter(Boolean);
    const skills = Object.entries(p.skills).sort((a, b) => b[1] - a[1]);
    const isColonist = p.kind === 'colonist';
    const weapons = WEAPONS[p.weapon];
    const sig = `pawn:${p.id}:${p.kind}:${Math.round(p.mood)}:${p.drafted}:${p.downed}:${p.dead}:${p.traitIds.join(',')}`;
    const priorityGrid = isColonist ? `
      <div class="insp-section">
        <div class="insp-label">Work priorities <b>click to change</b></div>
        <div class="prio-grid">
          ${WORK_TYPES.map((wt) => {
            const pr = p.priorities[wt.id] ?? 3;
            return `<button class="prio ${pr === 0 ? 'off' : 'p' + pr}" data-prio="${wt.id}" data-pawn="${p.id}" title="${wt.name} priority ${pr}">
              <span class="pico">${WORK_GLYPH[wt.id] || '•'}</span>
              <span class="pnum">${pr === 0 ? '–' : pr}</span>
              <span class="prio-name">${wt.name.slice(0, 4)}</span>
            </button>`;
          }).join('')}
        </div>
      </div>` : '';
    this.inspectorShell(`
      <div class="insp-head">
        <div class="insp-portrait"><canvas width="132" height="148"></canvas></div>
        <div class="insp-title">
          <h2>${esc(p.name)}</h2>
          <div class="insp-sub">${esc(p.backstory || (p.kind === 'raider' ? 'Hostile raider' : 'Colonist'))} · ${p.age || 30}</div>
          ${isColonist ? `<span class="mood-pill" style="color:${mood}"><span class="mdot"></span><span class="js-moodlabel">${p.moodLabel()}</span></span>` : `<span class="mood-pill" style="color:var(--red-2)"><span class="mdot"></span><span>Hostile</span></span>`}
        </div>
        <button class="insp-close" data-act="close" aria-label="Close">✕</button>
      </div>
      <div class="insp-section">
        <div class="insp-label">Status <b class="js-activity">${esc(p.activity())}</b></div>
        ${isColonist ? `
        <div class="stat-row need-food"><span class="stat-ico">◔</span><span class="stat-name">Food</span><span class="stat-track"><i class="stat-fill js-fill-food" style="width:${clamp(p.needs.food, 0, 100)}%"></i></span><span class="stat-num js-food">${Math.round(p.needs.food)}</span></div>
        <div class="stat-row need-rest"><span class="stat-ico">☾</span><span class="stat-name">Rest</span><span class="stat-track"><i class="stat-fill js-fill-rest" style="width:${clamp(p.needs.rest, 0, 100)}%"></i></span><span class="stat-num js-rest">${Math.round(p.needs.rest)}</span></div>
        <div class="stat-row need-joy"><span class="stat-ico">❦</span><span class="stat-name">Joy</span><span class="stat-track"><i class="stat-fill js-fill-joy" style="width:${clamp(p.needs.joy, 0, 100)}%"></i></span><span class="stat-num js-joy">${Math.round(p.needs.joy)}</span></div>
        ` : ''}
        <div class="stat-row need-health"><span class="stat-ico">♥</span><span class="stat-name">Health</span><span class="stat-track"><i class="stat-fill js-fill-hp" style="width:${clamp(p.hp / p.maxHp * 100, 0, 100)}%"></i></span><span class="stat-num js-hp">${Math.round(p.hp)}</span></div>
        ${isColonist ? `<div class="stat-row need-mood"><span class="stat-ico">☺</span><span class="stat-name">Mood</span><span class="stat-track"><i class="stat-fill js-fill-mood" style="width:${clamp(p.mood, 0, 100)}%"></i></span><span class="stat-num js-mood">${Math.round(p.mood)}</span></div>` : ''}
        ${p.bleed > 0 ? `<div class="insp-desc" style="color:var(--red-2);margin-top:7px">Bleeding — needs medical attention.</div>` : ''}
      </div>
      ${isColonist ? `
      <div class="insp-section">
        <div class="insp-label">Traits</div>
        <div class="trait-row">${traits.length ? traits.map((t) => `<span class="trait ${t.tone}">${esc(t.name)}</span>`).join('') : '<span class="trait">No notable traits</span>'}</div>
      </div>
      <div class="insp-section">
        <div class="insp-label">Skills <b>${p.skills.shooting > 6 ? 'Combat ready' : 'Developing'}</b></div>
        <div class="skill-grid">${skills.map(([s, v]) => `<div class="skill"><span>${s[0].toUpperCase() + s.slice(1)}</span><span class="sval ${v >= 7 ? 'hi' : v <= 2 ? 'lo' : ''}">${skillLabel(v)}</span></div>`).join('')}</div>
      </div>` : ''}
      <div class="insp-section">
        <div class="insp-label">Equipment</div>
        <div class="insp-desc">${weapons ? `${esc(weapons.name)} — ${weapons.ranged ? `${weapons.dmg} dmg · range ${weapons.range}` : `${weapons.dmg} dmg · melee`}` : 'Unarmed'}</div>
        ${p.carry ? `<div class="insp-desc" style="margin-top:4px">Carrying ${p.carry.qty} ${ITEMS[p.carry.type]?.name || p.carry.type}</div>` : ''}
        ${p.cover > 0 ? `<div class="insp-desc" style="margin-top:4px">Cover: +${Math.round(p.cover * 100)}%</div>` : ''}
      </div>
      ${priorityGrid}
      <div class="insp-section">
        <div class="insp-actions">
          ${isColonist ? `
            <button class="act-btn ${p.drafted ? 'danger' : 'primary'}" data-act="draft" data-pawn="${p.id}">${p.drafted ? 'Undraft' : 'Draft'}<small>${p.drafted ? 'Return to work' : 'Ready weapon'}</small></button>
            <button class="act-btn" data-act="tend" data-pawn="${p.id}">Treat<small>Send a doctor</small></button>
            <button class="act-btn" data-act="follow" data-pawn="${p.id}">Follow<small>Centre camera</small></button>
            <button class="act-btn wide" data-act="work" >Open work priorities</button>
          ` : `
            <button class="act-btn" data-act="follow" data-pawn="${p.id}">Follow<small>Centre camera</small></button>
            <button class="act-btn danger" data-act="attack" data-pawn="${p.id}">Attack<small>Order drafted colonists</small></button>
          `}
        </div>
      </div>
    `, sig);
    const cvs = $('.insp-portrait canvas', this.dom.inspector);
    if (cvs) {
      const ctx = cvs.getContext('2d');
      ctx.setTransform(2, 0, 0, 2, 0, 0);
      this.renderer.drawPortrait(ctx, p, 66, 74);
    }
  }

  renderInspectorAnimal(p) {
    const sig = `animal:${p.id}:${p.dead}:${p.downed}:${Math.round(p.hp)}:${p.huntReservedBy || 0}`;
    const marked = this.world.designations.hunt.has(p.id);
    this.inspectorShell(`
      <div class="insp-head">
        <div class="insp-portrait"><canvas width="132" height="148"></canvas></div>
        <div class="insp-title">
          <h2>${esc(p.name)}</h2>
          <div class="insp-sub">${esc(p.def?.desc || 'Wild animal')}</div>
          <span class="mood-pill" style="color:${p.dead ? 'var(--dim)' : 'var(--amber)'}"><span class="mdot"></span><span>${p.dead ? 'Dead' : p.downed ? 'Wounded' : 'Wild'}</span></span>
        </div>
        <button class="insp-close" data-act="close" aria-label="Close">✕</button>
      </div>
      <div class="insp-section">
        <div class="insp-label">Status <b>${p.dead ? 'Dead' : p.downed ? 'Downed' : 'Wandering'}</b></div>
        <div class="stat-row need-health"><span class="stat-ico">♥</span><span class="stat-name">Health</span><span class="stat-track"><i class="stat-fill js-fill-hp" style="width:${clamp(p.hp / p.maxHp * 100, 0, 100)}%"></i></span><span class="stat-num js-hp">${Math.round(p.hp)}</span></div>
        <div class="insp-desc" style="margin-top:6px">Meat yield: ${p.def?.meat || 0} · Speed: ${p.def?.speed || 1}</div>
      </div>
      <div class="insp-section">
        <div class="insp-actions">
          <button class="act-btn ${marked ? 'danger' : ''}" data-act="hunt" data-pawn="${p.id}">${marked ? 'Cancel hunt' : 'Mark for hunting'}</button>
          <button class="act-btn" data-act="follow" data-pawn="${p.id}">Follow</button>
        </div>
      </div>
    `, sig);
    const cvs = $('.insp-portrait canvas', this.dom.inspector);
    if (cvs) {
      const ctx = cvs.getContext('2d');
      ctx.setTransform(2, 0, 0, 2, 0, 0);
      this.drawAnimalPortrait(ctx, p, 66, 74);
    }
  }

  drawAnimalPortrait(ctx, p, w, h) {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#2d352c');
    g.addColorStop(1, '#171d19');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    ctx.save();
    ctx.translate(w / 2, h * 0.82);
    const scale = p.animalType === 'muffalo' ? 1.5 : p.animalType === 'chicken' ? 2.6 : 2.2;
    ctx.scale(scale, scale);
    const tmp = { ...p, x: 0, y: 0, moving: false, walkPhase: 0, flash: 0, dead: false, downed: false };
    this.renderer.drawAnimal(ctx, tmp, 0, 0);
    ctx.restore();
  }

  renderInspectorObject(o) {
    const def = o.def;
    const sig = `obj:${o.id}:${o.built}:${Math.round(o.hp)}:${Math.round((o.work / (o.workNeeded || 1)) * 20)}:${o.reservedBy || 0}`;
    const isNature = !!o.nature;
    const actions = [];
    if (!o.built) {
      actions.push(`<button class="act-btn danger" data-act="cancelBuild" data-obj="${o.id}">Cancel blueprint<small>Refund materials</small></button>`);
      actions.push(`<button class="act-btn" data-act="prioritizeBuild" data-obj="${o.id}">Prioritise<small>Assign builder</small></button>`);
    } else if (isNature && def.choppable) {
      actions.push(`<button class="act-btn" data-act="chop" data-obj="${o.id}">Chop<small>+${def.wood} wood</small></button>`);
    } else if (isNature && def.minable) {
      actions.push(`<button class="act-btn" data-act="mine" data-obj="${o.id}">Mine<small>+${(def.stone || 0) + (def.steel || 0)} resources</small></button>`);
    } else {
      actions.push(`<button class="act-btn" data-act="deconstruct" data-obj="${o.id}">Deconstruct<small>Recover materials</small></button>`);
      if (o.reservedBy) actions.push(`<button class="act-btn" data-act="follow" data-obj="${o.id}">View worker</button>`);
    }
    actions.push(`<button class="act-btn" data-act="followObj" data-obj="${o.id}">Centre<small>Camera</small></button>`);
    const hpPct = clamp((o.hp / o.maxHp) * 100, 0, 100);
    const progress = !o.built ? clamp(o.work / (o.workNeeded || 1), 0, 1) : null;
    this.inspectorShell(`
      <div class="insp-head">
        <div class="insp-title" style="padding-left:2px">
          <h2>${esc(def?.name || 'Structure')}</h2>
          <div class="insp-sub">${isNature ? 'Natural feature' : o.built ? (def?.cat ? def.cat[0].toUpperCase() + def.cat.slice(1) : 'Structure') : 'Blueprint'}</div>
        </div>
        <button class="insp-close" data-act="close" aria-label="Close">✕</button>
      </div>
      <div class="insp-section">
        <div class="insp-desc">${esc(def?.desc || 'Part of the colony.')}</div>
      </div>
      <div class="insp-section">
        <div class="insp-label">Condition <b class="js-objstate">${o.built ? 'Built' : 'Under construction'}</b></div>
        <div class="hp-line"><span>HP</span><span class="hp-bar"><i class="hp-fill js-fill-hp" style="width:${hpPct}%"></i></span><b class="js-hp">${Math.round(o.hp)}</b></div>
        ${progress != null ? `<div class="stat-row" style="margin-top:7px"><span class="stat-name">Work</span><span class="stat-track"><i class="stat-fill js-fill-work" style="width:${progress * 100}%"></i></span><span class="stat-num js-work">${Math.round(progress * 100)}%</span></div>` : ''}
      </div>
      <div class="insp-section">
        <div class="insp-actions">${actions.join('')}</div>
      </div>
    `, sig);
  }

  renderInspectorZone(z) {
    const sig = `zone:${z.id}:${z.type}`;
    this.inspectorShell(`
      <div class="insp-head">
        <div class="insp-title" style="padding-left:2px">
          <h2>${z.type === 'grow' ? 'Growing zone' : 'Stockpile zone'}</h2>
          <div class="insp-sub">${z.w} × ${z.h} tiles</div>
        </div>
        <button class="insp-close" data-act="close" aria-label="Close">✕</button>
      </div>
      <div class="insp-section">
        <div class="insp-desc">${z.type === 'grow' ? 'Colonists with Plants work will sow and harvest this field. Fertility and daylight affect growth.' : 'Haulers will bring loose resources here. Items already in a stockpile are ignored.'}</div>
      </div>
      <div class="insp-section">
        <div class="insp-actions"><button class="act-btn danger" data-act="removeZone" data-zone="${z.id}">Remove zone</button></div>
      </div>
    `, sig);
  }

  renderInspectorMulti(ids) {
    const pawns = ids.map((id) => this.world.pawns.find((p) => p.id === id)).filter(Boolean);
    this.dom.inspector.classList.remove('hidden');
    this.dom.inspector.classList.add('has-selection');
    this.dom.inspector.dataset.sig = 'multi';
    this.dom.inspector.innerHTML = `
      <div class="insp-head">
        <div class="insp-title" style="padding-left:2px"><h2>${pawns.length} selected</h2><div class="insp-sub">Colonists</div></div>
        <button class="insp-close" data-act="close" aria-label="Close">✕</button>
      </div>
      <div class="multi-list">
        ${pawns.map((p) => `<div class="multi-item" data-pawn-select="${p.id}"><canvas width="116" height="128"></canvas><span>${esc(p.name.split(' ')[0])}</span></div>`).join('')}
      </div>
      <div class="insp-section">
        <div class="insp-actions">
          <button class="act-btn" data-act="draftAll">Draft all</button>
          <button class="act-btn" data-act="undraftAll">Undraft all</button>
        </div>
      </div>`;
    for (const el of $$('.multi-item', this.dom.inspector)) {
      const p = pawns.find((p) => p.id === Number(el.dataset.pawnSelect));
      const cvs = el.querySelector('canvas');
      if (!p || !cvs) continue;
      const ctx = cvs.getContext('2d');
      ctx.setTransform(2, 0, 0, 2, 0, 0);
      this.renderer.drawPortrait(ctx, p, 58, 64);
    }
  }

  dynamicInspector() {
    const ins = this.dom.inspector;
    const ids = [...this.renderer.selected];
    if (ids.length === 1) {
      const p = this.world.pawns.find((p) => p.id === ids[0]);
      if (!p) return;
      const setBar = (sel, v) => { const el = $(sel, ins); if (el) el.style.width = `${clamp(v, 0, 100)}%`; };
      const setTxt = (sel, v) => { const el = $(sel, ins); if (el) el.textContent = v; };
      if (p.kind === 'colonist') {
        setBar('.js-fill-food', p.needs.food); setTxt('.js-food', Math.round(p.needs.food));
        setBar('.js-fill-rest', p.needs.rest); setTxt('.js-rest', Math.round(p.needs.rest));
        setBar('.js-fill-joy', p.needs.joy); setTxt('.js-joy', Math.round(p.needs.joy));
        setBar('.js-fill-mood', p.mood); setTxt('.js-mood', Math.round(p.mood));
        const ml = $('.js-moodlabel', ins);
        if (ml) { ml.textContent = p.moodLabel(); ml.parentElement.style.color = moodColor(p.mood); }
        const act = $('.js-activity', ins);
        if (act) act.textContent = p.activity();
      }
      setBar('.js-fill-hp', p.hp / p.maxHp * 100); setTxt('.js-hp', Math.round(p.hp));
    } else if (this.renderer.selectedObj) {
      const o = this.world.objectById(this.renderer.selectedObj);
      if (!o) return;
      const setBar = (sel, v) => { const el = $(sel, ins); if (el) el.style.width = `${clamp(v, 0, 100)}%`; };
      const setTxt = (sel, v) => { const el = $(sel, ins); if (el) el.textContent = v; };
      setBar('.js-fill-hp', o.hp / o.maxHp * 100); setTxt('.js-hp', Math.round(o.hp));
      if (!o.built) {
        const pr = clamp(o.work / (o.workNeeded || 1), 0, 1);
        setBar('.js-fill-work', pr * 100); setTxt('.js-work', `${Math.round(pr * 100)}%`);
      }
    }
  }

  onInspectorClick(e) {
    const prio = e.target.closest('[data-prio]');
    if (prio) {
      const p = this.world.pawns.find((p) => p.id === Number(prio.dataset.pawn));
      if (!p) return;
      const work = prio.dataset.prio;
      p.priorities[work] = (p.priorities[work] + 1) % 5;
      this.audio.play('click');
      this.renderInspectorPawn(p);
      return;
    }
    const pawnSel = e.target.closest('[data-pawn-select]');
    if (pawnSel) {
      this.selectPawn(Number(pawnSel.dataset.pawnSelect));
      return;
    }
    const btn = e.target.closest('[data-act]');
    if (!btn) return;
    const act = btn.dataset.act;
    const w = this.world;
    if (act === 'close') { this.clearSelection(); this.audio.play('click'); return; }
    if (act === 'draft' || act === 'undraft') {
      const p = w.pawnById(Number(btn.dataset.pawn));
      if (!p) return;
      p.drafted = act === 'draft' ? !p.drafted : false;
      if (p.drafted) { p.clearTask(); p.alarm = false; }
      this.toast(`${p.name.split(' ')[0]} ${p.drafted ? 'drafted' : 'returns to work'}`);
      this.audio.play('select');
      this.refreshSelection();
      return;
    }
    if (act === 'draftAll' || act === 'undraftAll') {
      for (const id of this.renderer.selected) {
        const p = w.pawnById(id);
        if (!p) continue;
        p.drafted = act === 'draftAll';
        if (p.drafted) p.clearTask();
      }
      this.audio.play('select');
      this.refreshSelection();
      return;
    }
    if (act === 'follow' || act === 'attack' || act === 'tend') {
      const p = w.pawnById(Number(btn.dataset.pawn));
      if (!p) return;
      if (act === 'follow') { this.renderer.focus(p.x, p.y, Math.max(1.4, this.renderer.camera.zoom)); this.audio.play('click'); }
      if (act === 'attack') {
        const fighters = w.pawns.filter((c) => c.kind === 'colonist' && !c.dead && !c.downed && c.weapon);
        for (const c of fighters) { c.drafted = true; c.beginTask({ type: 'attack', targetId: p.id }); }
        this.toast(`Colonists attack ${p.name}`);
        this.audio.play('alarm');
      }
      if (act === 'tend') {
        const doctor = w.pawns.filter((c) => c.kind === 'colonist' && !c.dead && !c.downed && c !== p && c.priorities.doctor <= 2)
          .sort((a, b) => b.skills.medicine - a.skills.medicine)[0];
        if (doctor) {
          doctor.drafted = false;
          doctor.beginTask({ type: 'tend', targetId: p.id });
          this.toast(`${doctor.name.split(' ')[0]} is on the way to tend ${p.name.split(' ')[0]}`);
          this.audio.play('select');
        } else this.toast('No available doctor');
      }
      return;
    }
    if (act === 'work') { this.selectTab('work'); return; }
    if (act === 'hunt') {
      const p = w.pawnById(Number(btn.dataset.pawn));
      if (!p) return;
      const on = !w.designations.hunt.has(p.id);
      w.designateHunt(p.id, on);
      this.toast(on ? `${p.name} marked for hunting` : 'Hunt cancelled');
      this.refreshSelection();
      return;
    }
    if (act === 'chop' || act === 'mine' || act === 'deconstruct') {
      const o = w.objectById(Number(btn.dataset.obj));
      if (!o) return;
      w.designations[act].add(o.id);
      this.toast(`${o.def.name} marked`);
      this.audio.play('click');
      this.refreshSelection();
      return;
    }
    if (act === 'cancelBuild') {
      const o = w.objectById(Number(btn.dataset.obj));
      if (!o) return;
      w.cancelBuild(o);
      this.clearSelection();
      this.toast('Blueprint cancelled');
      this.audio.play('click');
      return;
    }
    if (act === 'prioritizeBuild') {
      const o = w.objectById(Number(btn.dataset.obj));
      if (!o) return;
      const builder = w.pawns.filter((p) => p.kind === 'colonist' && !p.dead && !p.downed && !p.drafted)
        .sort((a, b) => b.skills.construction - a.skills.construction)[0];
      if (builder) {
        builder.beginTask({ type: 'build', objId: o.id });
        this.toast(`${builder.name.split(' ')[0]} will build it`);
      }
      return;
    }
    if (act === 'followObj') {
      const o = w.objectById(Number(btn.dataset.obj));
      if (o) this.renderer.focus(o.x + o.w / 2, o.y + o.h / 2, Math.max(1.4, this.renderer.camera.zoom));
      return;
    }
    if (act === 'removeZone') {
      const z = w.zones.find((z) => z.id === Number(btn.dataset.zone));
      if (z) { w.removeZoneAt(z.x, z.y); this.clearSelection(); this.toast('Zone removed'); }
    }
  }

  // ---------------------------------------------------------------- tabs & sheets
  selectTab(tab) {
    this.lastTab = tab;
    this.dom.mainTabs.querySelectorAll('button').forEach((b) => b.classList.toggle('active', b.dataset.tab === tab));
    if (tab === 'architect') { this.closeSheet(); this.input?.cancelTool(true); this.toggleArchitect(true); return; }
    this.toggleArchitect(false);
    if (tab === 'work') this.openSheet('work');
    else if (tab === 'research') this.openSheet('research');
    else if (tab === 'log') this.openSheet('log');
    else if (tab === 'menu') this.openSheet('menu');
  }

  openSheet(kind) {
    this.sheetType = kind;
    this.dom.sheet.classList.remove('hidden');
    this.dom.backdrop.classList.remove('hidden');
    this.dom.mainTabs.querySelectorAll('button').forEach((b) => b.classList.toggle('active', b.dataset.tab === kind));
    if (kind === 'work') this.renderWorkSheet();
    else if (kind === 'research') this.renderResearchSheet();
    else if (kind === 'log') this.renderLogSheet();
    else if (kind === 'menu') this.renderMenuSheet();
    this.audio.play('click');
  }

  closeSheet() {
    this.sheetType = null;
    this.dom.sheet.classList.add('hidden');
    this.dom.backdrop.classList.add('hidden');
    this.dom.sheet.innerHTML = '';
    if (this.lastTab === 'architect') this.dom.mainTabs.querySelectorAll('button').forEach((b) => b.classList.toggle('active', b.dataset.tab === 'architect'));
  }

  sheetShell(title, sub, body, extraClass = '') {
    this.dom.sheet.innerHTML = `
      <div class="sheet-head">
        <div><h2>${esc(title)}</h2><p>${esc(sub)}</p></div>
        <button class="close-btn" data-sheet-close aria-label="Close">✕</button>
      </div>
      <div class="sheet-body ${extraClass}">${body}</div>`;
    this.dom.sheet.querySelector('[data-sheet-close]').onclick = () => this.closeSheet();
  }

  renderWorkSheet() {
    const colonists = this.world.pawns.filter((p) => p.kind === 'colonist' && !p.dead);
    const head = `<div class="work-head name">Colonist</div>${WORK_TYPES.map((w) => `<div class="work-head" title="${esc(w.name)}">${WORK_GLYPH[w.id] || ''}<br>${esc(w.name.slice(0, 4))}</div>`).join('')}`;
    const rows = colonists.map((p) => `
      <div class="work-name"><canvas width="48" height="48" data-portrait="${p.id}"></canvas><span>${esc(p.name)}</span></div>
      ${WORK_TYPES.map((w) => {
        const pr = p.priorities[w.id] ?? 3;
        return `<div class="work-cell p${pr}" data-work="${w.id}" data-pawn="${p.id}" title="${esc(p.name)} · ${esc(w.name)} priority ${pr}">${pr === 0 ? '–' : pr}</div>`;
      }).join('')}`).join('');
    this.sheetShell('Work', 'Click a cell to cycle priority. 1 is highest, 4 lowest, – means never.', `
      <div class="work-grid">${head}${rows}</div>
      <div class="work-legend"><span><b>1</b> — do first</span><span><b>2</b> — important</span><span><b>3</b> — normal</span><span><b>4</b> — last</span><span><b>–</b> — never</span></div>`);
    for (const cvs of $$('canvas[data-portrait]', this.dom.sheet)) {
      const p = colonists.find((p) => p.id === Number(cvs.dataset.portrait));
      if (!p) continue;
      const ctx = cvs.getContext('2d');
      ctx.setTransform(2, 0, 0, 2, 0, 0);
      this.renderer.drawPortrait(ctx, p, 24, 24);
    }
    this.dom.sheet.querySelectorAll('.work-cell').forEach((cell) => {
      cell.onclick = () => {
        const p = colonists.find((p) => p.id === Number(cell.dataset.pawn));
        if (!p) return;
        const work = cell.dataset.work;
        p.priorities[work] = (p.priorities[work] + 1) % 5;
        cell.className = `work-cell p${p.priorities[work]}`;
        cell.textContent = p.priorities[work] === 0 ? '–' : p.priorities[work];
        this.audio.play('click');
      };
    });
  }

  renderResearchSheet() {
    const w = this.world;
    const cards = Object.entries(TECH).map(([id, t]) => {
      const done = w.techs.has(id);
      const active = w.research.active === id;
      const pct = w.researchPct(id);
      return `<div class="tech-card ${done ? 'done' : active ? 'active' : ''}" data-tech="${id}">
        ${done ? '<span class="tech-badge done">Researched</span>' : active ? '<span class="tech-badge active">In progress</span>' : ''}
        <h3>${esc(t.name)}</h3>
        <p>${esc(t.desc)}</p>
        <div class="tech-progress"><i style="width:${pct * 100}%"></i></div>
        <div class="tech-meta"><span>${done ? 'Complete' : `${Math.round(pct * t.cost)} / ${t.cost} pts`}</span><span>${t.unlocks ? 'Unlocks structures' : 'Passive bonus'}</span></div>
      </div>`;
    }).join('');
    const researcher = w.pawns.find((p) => p.kind === 'colonist' && !p.dead && p.task?.type === 'research');
    const cur = w.research.active ? TECH[w.research.active] : null;
    this.sheetShell('Research', `${cur ? `Current project: ${cur.name}` : 'No active project'} · ${researcher ? `${researcher.name.split(' ')[0]} is researching` : 'No one is researching'}`, `
      <div class="tech-grid">${cards}</div>
      <div class="menu-actions"><button class="act-btn" data-sheet-work>Set work priorities</button></div>`);
    this.dom.sheet.querySelectorAll('.tech-card').forEach((card) => {
      card.onclick = () => {
        const id = card.dataset.tech;
        if (w.techs.has(id)) return;
        w.setResearch(id);
        this.renderResearchSheet();
        this.audio.play('click');
      };
    });
    this.dom.sheet.querySelector('[data-sheet-work]').onclick = () => { this.renderWorkSheet(); this.dom.mainTabs.querySelectorAll('button').forEach((b) => b.classList.toggle('active', b.dataset.tab === 'work')); };
  }

  renderLogSheet() {
    const w = this.world;
    const notices = [...w.recentNotices].reverse();
    const rows = notices.map((n) => `
      <div class="log-item">
        <span class="ltime">Day ${dayStamp(n.day)}<br>${timeString(n.time)}</span>
        <span class="lkind" style="color:${NOTICE_COLORS[n.kind] || 'var(--gold)'}">${esc(n.kind)}</span>
        <span class="ltext"><b>${esc(n.title)}</b> — ${esc(n.text)}</span>
      </div>`).join('');
    const s = w.stats;
    this.sheetShell('Colony log', `${SEASONS[w.month]} · Day ${dayStamp(w.day)} · Wealth ${formatNum(w.wealth)}`, `
      <div class="menu-grid" style="margin-bottom:14px">
        <div class="menu-block"><h3>Statistics</h3>
          <div class="menu-row"><span>Raiders killed</span><b>${s.kills}</b></div>
          <div class="menu-row"><span>Structures built</span><b>${s.built}</b></div>
          <div class="menu-row"><span>Crops harvested</span><b>${s.harvested}</b></div>
          <div class="menu-row"><span>Meals cooked</span><b>${s.meals}</b></div>
          <div class="menu-row"><span>Colonists lost</span><b style="color:${s.colonistsLost ? 'var(--red-2)' : 'inherit'}">${s.colonistsLost}</b></div>
        </div>
        <div class="menu-block"><h3>Colony</h3>
          <div class="menu-row"><span>Colonists</span><b>${w.pawns.filter((p) => p.kind === 'colonist' && !p.dead).length}</b></div>
          <div class="menu-row"><span>Research complete</span><b>${w.techs.size} / ${Object.keys(TECH).length}</b></div>
          <div class="menu-row"><span>Rooms / zones</span><b>${w.zones.length}</b></div>
          <div class="menu-row"><span>Items on ground</span><b>${w.items.filter((i) => !i.dead).reduce((a, i) => a + i.qty, 0)}</b></div>
        </div>
      </div>
      <div class="log-list">${rows || '<div class="arch-empty">Nothing has happened yet.</div>'}</div>`);
  }

  renderMenuSheet() {
    const w = this.world;
    this.sheetShell('Menu', 'Emberfield — a hand-built colony simulation', `
      <div class="menu-grid">
        <div class="menu-block">
          <h3>Display</h3>
          <div class="menu-row"><span>Show colonist paths</span><button class="toggle ${this.renderer.showPaths ? 'on' : ''}" data-toggle="paths" aria-label="Toggle paths"></button></div>
          <div class="menu-row"><span>Sound</span><button class="toggle ${!this.audio.muted ? 'on' : ''}" data-toggle="sound" aria-label="Toggle sound"></button></div>
          <div class="menu-row"><span>Weather effects</span><button class="toggle on" data-toggle="weather" aria-label="Toggle weather"></button></div>
          <div class="menu-row"><span>Render quality</span><b>${this.renderer.dpr > 1.5 ? 'High' : 'Standard'}</b></div>
        </div>
        <div class="menu-block">
          <h3>Colony</h3>
          <div class="menu-row"><span>Colony name</span><b>Emberfield</b></div>
          <div class="menu-row"><span>Seed</span><b>${w.seed}</b></div>
          <div class="menu-row"><span>Time</span><b>Day ${w.day} · ${timeString(w.time)}</b></div>
          <div class="menu-row"><span>Difficulty</span><b>Storyteller</b></div>
        </div>
        <div class="menu-block">
          <h3>Help</h3>
          <div class="menu-row"><span>Controls &amp; systems</span><button class="act-btn" data-sheet-help style="flex:0;padding:4px 10px">Open</button></div>
          <div class="menu-row"><span>Centre on colony</span><button class="act-btn" data-sheet-focus style="flex:0;padding:4px 10px">Focus</button></div>
        </div>
        <div class="menu-block">
          <h3>Session</h3>
          <div class="menu-row"><span>Restart colony</span><button class="act-btn danger" data-sheet-restart style="flex:0;padding:4px 10px">Restart</button></div>
          <div class="menu-row"><span>Pause simulation</span><button class="toggle ${w.paused ? 'on' : ''}" data-toggle="pause"></button></div>
        </div>
      </div>
      <div class="arch-foot" style="margin-top:14px;padding-left:0">Tip: right-drag or WASD to pan, pinch to zoom, and press <b>H</b> for help.</div>`);
    this.dom.sheet.querySelectorAll('[data-toggle]').forEach((btn) => {
      btn.onclick = () => {
        const k = btn.dataset.toggle;
        if (k === 'paths') { this.renderer.showPaths = !this.renderer.showPaths; btn.classList.toggle('on', this.renderer.showPaths); }
        if (k === 'sound') { this.audio.setMuted(!this.audio.muted); btn.classList.toggle('on', !this.audio.muted); this.dom.mute.classList.toggle('muted', this.audio.muted); }
        if (k === 'weather') { this.renderer.weatherOff = !this.renderer.weatherOff; btn.classList.toggle('on', !this.renderer.weatherOff); }
        if (k === 'pause') { this.world.paused = !this.world.paused; btn.classList.toggle('on', this.world.paused); this.updateSpeedButtons(); }
        this.audio.play('click');
      };
    });
    this.dom.sheet.querySelector('[data-sheet-help]').onclick = () => { this.closeSheet(); this.toggleHelp(true); };
    this.dom.sheet.querySelector('[data-sheet-focus]').onclick = () => { this.closeSheet(); this.renderer.focus(30, 32, 1.3); };
    this.dom.sheet.querySelector('[data-sheet-restart]').onclick = () => {
      if (confirm('Start a new colony? Current progress will be lost.')) location.reload();
    };
  }

  // ---------------------------------------------------------------- help
  toggleHelp(open) {
    const show = open ?? this.dom.help.classList.contains('hidden');
    if (show) {
      this.dom.help.innerHTML = this.helpHtml();
      this.dom.help.classList.remove('hidden');
      this.audio.play('click');
    } else this.dom.help.classList.add('hidden');
  }

  helpHtml() {
    return `<div class="help-card">
      <h2>Emberfield</h2>
      <p class="tagline">A colony on the edge of the rim. Keep your people fed, rested and hopeful while winter, weather and raiders close in.</p>
      <div class="help-cols">
        <div>
          <h3>Controls — desktop</h3>
          <p><kbd>Left click</kbd> select · <kbd>drag</kbd> marquee select<br>
          <kbd>Right drag</kbd> pan the map · <kbd>Wheel</kbd> zoom<br>
          <kbd>Right click</kbd> move drafted colonist / cancel tool<br>
          <kbd>W A S D</kbd> or arrow keys pan · <kbd>Space</kbd> pause<br>
          <kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> game speed · <kbd>R</kbd> rotate building<br>
          <kbd>Esc</kbd> cancel tool / close panel · <kbd>H</kbd> help</p>
          <h3>Controls — touch</h3>
          <p>Tap to select · drag to pan · pinch to zoom.<br>
          With a build or zone tool active, drag on the map to paint.<br>
          Tap the tool bar's ✕ to cancel. Use the two-finger pan to look around while building.</p>
        </div>
        <div>
          <h3>First priorities</h3>
          <ul>
            <li><b>Architect → Structure</b> to build walls, doors and floors.</li>
            <li><b>Furniture</b> for beds, tables, chairs, lamps and a campfire.</li>
            <li><b>Production</b> for a stove and research bench.</li>
            <li><b>Power</b> for solar panels and batteries; <b>Security</b> for sandbags and turrets.</li>
            <li>Use <b>Orders</b> to chop trees, mine rock and deconstruct old structures.</li>
          </ul>
          <h3>Staying alive</h3>
          <ul>
            <li>Food, rest and joy drive mood. Low mood causes breaks.</li>
            <li>Draft colonists to fight; undraft to send them back to work.</li>
            <li>Build a research bench to unlock stonecutting, agriculture, medicine and gunsmithing.</li>
            <li>Raiders arrive after the first night. Sandbags and a turret help.</li>
          </ul>
        </div>
      </div>
      <button class="help-close" data-close-help>Return to the colony</button>
      <div class="help-seed">Seed 20260401 · 64 × 64 map · one day is three minutes at 1× speed</div>
    </div>`;
  }

  // ---------------------------------------------------------------- notifications & alerts
  showNotice(n) {
    // Rapid repeats (placing a row of walls, for example) update one card instead of stacking.
    const nowMs = performance.now();
    if (this._lastNote && this._lastNote.title === n.title && nowMs - this._lastNote.at < 1400 && this.noticeEls.length) {
      const last = this.noticeEls[this.noticeEls.length - 1];
      last.at = nowMs;
      const text = last.el.querySelector('.ntext');
      const time = last.el.querySelector('.ntime');
      if (text) text.textContent = n.text;
      if (time) time.textContent = timeString(n.time);
      this._lastNote.at = nowMs;
      if (this.sheetType === 'log') this.renderLogSheet();
      return;
    }
    this._lastNote = { title: n.title, at: nowMs };
    const el = document.createElement('div');
    el.className = `note ${n.kind}`;
    el.innerHTML = `<div class="ntitle">${esc(n.title)}</div><div class="ntext">${esc(n.text)}</div><div class="ntime">${timeString(n.time)}</div>`;
    this.dom.notifications.appendChild(el);
    this.noticeEls.push({ el, at: performance.now() });
    while (this.noticeEls.length > 5) {
      const old = this.noticeEls.shift();
      old.el.remove();
    }
    el.addEventListener('click', () => { el.classList.add('out'); setTimeout(() => el.remove(), 350); });
    if (this.dom.sheet.classList.contains('hidden') === false && this.sheetType === 'log') this.renderLogSheet();
  }

  toast(text) {
    if (!text) return;
    this.dom.toast.textContent = text;
    this.dom.toast.classList.add('show');
    clearTimeout(this._toastT);
    this._toastT = setTimeout(() => this.dom.toast.classList.remove('show'), 1900);
  }

  computeAlerts() {
    const w = this.world;
    const out = [];
    if (w.raid?.active) {
      const n = w.raid.attackers.filter((p) => !p.dead && !p.downed).length;
      out.push({ cls: 'raid', icon: '⚔', text: `<b>Raid</b><span class="alabel"> — ${n} hostiles</span>`, key: 'raid' });
    }
    const downed = w.pawns.filter((p) => p.kind === 'colonist' && p.downed && !p.dead);
    if (downed.length) out.push({ cls: 'bad', icon: '✚', text: `<b>${downed.length} downed</b><span class="alabel"> — needs a doctor</span>`, key: 'downed', select: downed[0].id });
    const starving = w.pawns.filter((p) => p.kind === 'colonist' && !p.dead && !p.downed && p.needs.food < 22);
    if (starving.length) out.push({ cls: 'bad', icon: '◔', text: `<b>${starving.length} hungry</b><span class="alabel"> — find food</span>`, key: 'hungry', select: starving[0].id });
    const food = w.countItem('meal') + w.countItem('grain') + w.countItem('meat');
    if (food < 12) out.push({ cls: 'bad', icon: '▲', text: '<b>Low food</b><span class="alabel"> — under 12 units</span>', key: 'food' });
    const breaking = w.pawns.filter((p) => p.kind === 'colonist' && !p.dead && p.mood < 30);
    if (breaking.length) out.push({ cls: 'bad', icon: '☹', text: `<b>Low mood</b><span class="alabel"> — ${breaking.length} at risk</span>`, key: 'mood', select: breaking[0].id });
    const idle = w.pawns.filter((p) => p.kind === 'colonist' && !p.dead && !p.downed && !p.drafted && !p.task && !p.sleeping && !p.broken);
    if (idle.length >= 2 && w.day > 1) out.push({ cls: '', icon: '…', text: `<b>${idle.length} idle</b><span class="alabel"> — assign work</span>`, key: 'idle', work: true });
    if (w.research.active && !w.pawns.some((p) => p.task?.type === 'research') && w.pawns.some((p) => p.kind === 'colonist' && !p.dead && p.priorities.research <= 3)) {
      out.push({ cls: '', icon: '✦', text: '<b>Research stalled</b><span class="alabel"> — no bench work</span>', key: 'research', research: true });
    }
    return out;
  }

  updateAlerts(force = false) {
    const alerts = this.computeAlerts();
    const sig = alerts.map((a) => a.key).join(',');
    if (!force && sig === this.alertsSig) return;
    this.alertsSig = sig;
    this.dom.alerts.innerHTML = alerts.map((a, i) => `<div class="alert ${a.cls}" data-alert="${a.key}" data-i="${i}">${a.icon ? `<span class="aicon">${a.icon}</span>` : ''}<span>${a.text}</span></div>`).join('');
    this.dom.alerts.querySelectorAll('.alert').forEach((el) => {
      el.onclick = () => {
        const a = alerts[Number(el.dataset.i)];
        if (!a) return;
        if (a.select) { this.selectPawn(a.select); this.renderer.focus(this.world.pawnById(a.select)?.x || 30, this.world.pawnById(a.select)?.y || 30); }
        else if (a.work) this.openSheet('work');
        else if (a.research) this.openSheet('research');
        this.audio.play('click');
      };
    });
  }

  showGameOver() {
    const w = this.world;
    this.dom.help.innerHTML = `<div class="help-card">
      <div class="gameover-mark">◈</div>
      <h2 style="text-align:center">The colony has fallen</h2>
      <p class="tagline" style="text-align:center">Every colonist of Emberfield is dead or gone. The wind moves through empty rooms.</p>
      <div class="menu-grid" style="margin-top:16px">
        <div class="menu-block"><h3>Final report</h3>
          <div class="menu-row"><span>Days survived</span><b>${w.day}</b></div>
          <div class="menu-row"><span>Raiders killed</span><b>${w.stats.kills}</b></div>
          <div class="menu-row"><span>Structures built</span><b>${w.stats.built}</b></div>
          <div class="menu-row"><span>Colonists lost</span><b>${w.stats.colonistsLost}</b></div>
          <div class="menu-row"><span>Colony wealth</span><b>${formatNum(w.wealth)}</b></div>
        </div>
        <div class="menu-block"><h3>What remains</h3>
          <div class="menu-row"><span>Research</span><b>${w.techs.size} / ${Object.keys(TECH).length}</b></div>
          <div class="menu-row"><span>Zones</span><b>${w.zones.length}</b></div>
          <div class="menu-row"><span>Seed</span><b>${w.seed}</b></div>
        </div>
      </div>
      <button class="help-close" onclick="location.reload()">Start a new colony</button>
    </div>`;
    this.dom.help.classList.remove('hidden');
  }

  // ---------------------------------------------------------------- per-frame
  update(dt) {
    this.timer += dt;
    this._portraitTimer += dt;
    if (this.timer < 0.2) return;
    this.timer = 0;
    this.updateTopbar();
    if (this._portraitTimer > 0.9) {
      this._portraitTimer = 0;
      for (const [id, el] of this.portraitEls) {
        const p = this.world.pawns.find((p) => p.id === id);
        if (p) this.drawPortraitCanvas(el, p);
      }
    }
    this.refreshPortraitStates();
    this.dynamicInspector();
    this.renderer.drawMinimap(this.dom.minimap);
    this.updateAlerts();
    this.audio.setRain(this.world.rain);
    this.updateNotices();
    if (this.sheetType === 'research') this.updateResearchProgress();
  }

  updateNotices() {
    const now = performance.now();
    for (let i = this.noticeEls.length - 1; i >= 0; i--) {
      const n = this.noticeEls[i];
      const life = n.el.classList.contains('raid') ? 12000 : 8000;
      if (now - n.at > life) {
        n.el.classList.add('out');
        const el = n.el;
        setTimeout(() => el.remove(), 360);
        this.noticeEls.splice(i, 1);
      }
    }
  }

  updateResearchProgress() {
    const w = this.world;
    for (const card of $$('.tech-card', this.dom.sheet)) {
      const id = card.dataset.tech;
      if (!id) continue;
      const pct = w.researchPct(id);
      const bar = $('.tech-progress i', card);
      if (bar) bar.style.width = `${pct * 100}%`;
      const meta = $('.tech-meta span', card);
      if (meta && !w.techs.has(id)) meta.textContent = `${Math.round(pct * TECH[id].cost)} / ${TECH[id].cost} pts`;
      card.classList.toggle('active', w.research.active === id && !w.techs.has(id));
      card.classList.toggle('done', w.techs.has(id));
    }
  }
}
