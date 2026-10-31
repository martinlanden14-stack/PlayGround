// Pointer, wheel, keyboard and touch controls.
// Left click / tap selects; drag on the map pans on touch, box-selects with a mouse.
// Build and zone tools paint by dragging. Two fingers pan and pinch-zoom on touch.
import { BUILDINGS } from './defs.js';
import { clamp } from './util.js';

const TAU = Math.PI * 2;

export class Input {
  constructor(canvas, world, renderer, ui, audio) {
    this.canvas = canvas;
    this.world = world;
    this.renderer = renderer;
    this.ui = ui;
    this.audio = audio;

    this.pointers = new Map();
    this.stroke = null;
    this.pan = null;
    this.marquee = null;
    this.pinch = null;
    this.keys = new Set();
    this.hover = null;
    this.lastClick = { at: 0, x: 0, y: 0, id: null };
    this.lastTap = { at: 0, x: 0, y: 0 };
    this.toastAt = 0;
    this.suppressClick = false;

    this.bind();
  }

  // ---------------------------------------------------------------- events
  bind() {
    const c = this.canvas;
    c.addEventListener('pointerdown', (e) => this.onPointerDown(e));
    c.addEventListener('pointermove', (e) => this.onPointerMove(e));
    c.addEventListener('pointerup', (e) => this.onPointerUp(e));
    c.addEventListener('pointercancel', (e) => this.onPointerUp(e));
    c.addEventListener('pointerleave', (e) => {
      if (e.pointerType === 'mouse' && !this.pointers.size) this.clearHover();
    });
    c.addEventListener('wheel', (e) => this.onWheel(e), { passive: false });
    c.addEventListener('contextmenu', (e) => e.preventDefault());
    c.addEventListener('dblclick', (e) => this.onDoubleClick(e));
    window.addEventListener('keydown', (e) => this.onKeyDown(e));
    window.addEventListener('keyup', (e) => this.keys.delete(e.code));
    window.addEventListener('blur', () => { this.keys.clear(); this.endStroke(false); this.endPan(); });
  }

  screenPos(e) {
    const r = this.canvas.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  tileAt(sx, sy) {
    const p = this.renderer.screenToWorld(sx, sy);
    return { x: Math.floor(p.x), y: Math.floor(p.y), fx: p.x, fy: p.y };
  }

  // ---------------------------------------------------------------- pointer down
  onPointerDown(e) {
    this.audio?.resume();
    const s = this.screenPos(e);
    this.pointers.set(e.pointerId, { x: s.x, y: s.y, type: e.pointerType });
    try { this.canvas.setPointerCapture(e.pointerId); } catch { /* older browsers */ }

    if (e.pointerType === 'touch' && this.pointers.size === 2) {
      this.beginPinch();
      return;
    }
    if (this.pointers.size > 1) return;

    if (e.button === 1 || e.button === 2) {
      this.beginPan(e, s);
      return;
    }
    if (e.button !== 0) return;

    const tile = this.tileAt(s.x, s.y);
    const tool = this.renderer.tool;
    if (tool) {
      this.startStroke(tile, s);
      return;
    }
    if (e.pointerType === 'touch') {
      // One finger either pans the map or becomes a tap on release.
      this.pan = { id: e.pointerId, sx: s.x, sy: s.y, lx: s.x, ly: s.y, moved: false, touch: true, button: 0 };
    } else {
      this.marquee = { id: e.pointerId, x0: s.x, y0: s.y, x1: s.x, y1: s.y, moved: false, additive: e.shiftKey };
      this.renderer.marquee = null;
    }
  }

  beginPan(e, s) {
    this.pan = { id: e.pointerId, sx: s.x, sy: s.y, lx: s.x, ly: s.y, moved: false, touch: false, button: e.button };
    this.canvas.classList.add('grabbing');
  }

  beginPinch() {
    this.endStroke(false);
    this.endPan();
    this.marquee = null;
    this.renderer.marquee = null;
    const pts = [...this.pointers.values()].slice(0, 2);
    const midX = (pts[0].x + pts[1].x) / 2;
    const midY = (pts[0].y + pts[1].y) / 2;
    const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) || 1;
    this.pinch = { dist, midX, midY };
    this.clearHover();
  }

  // ---------------------------------------------------------------- pointer move
  onPointerMove(e) {
    const s = this.screenPos(e);
    const rec = this.pointers.get(e.pointerId);
    if (rec) { rec.x = s.x; rec.y = s.y; }

    if (this.pinch && this.pointers.size >= 2) {
      const pts = [...this.pointers.values()].slice(0, 2);
      const midX = (pts[0].x + pts[1].x) / 2;
      const midY = (pts[0].y + pts[1].y) / 2;
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) || 1;
      const dx = midX - this.pinch.midX;
      const dy = midY - this.pinch.midY;
      if (Math.abs(dx) > 0.01 || Math.abs(dy) > 0.01) this.renderer.panBy(dx, dy);
      if (Math.abs(dist / this.pinch.dist - 1) > 0.004) this.renderer.zoomAt(midX, midY, dist / this.pinch.dist);
      this.pinch = { dist, midX, midY };
      return;
    }

    if (this.pan && this.pan.id === e.pointerId) {
      const dx = s.x - this.pan.lx;
      const dy = s.y - this.pan.ly;
      if (!this.pan.moved && Math.hypot(s.x - this.pan.sx, s.y - this.pan.sy) > (this.pan.touch ? 7 : 4)) this.pan.moved = true;
      if (this.pan.moved) {
        this.renderer.panBy(dx, dy);
        if (!this.pan.touch) this.clearHover();
      }
      this.pan.lx = s.x; this.pan.ly = s.y;
      return;
    }

    if (this.stroke && this.stroke.id === e.pointerId) {
      this.updateStroke(s);
      return;
    }

    if (this.marquee && this.marquee.id === e.pointerId) {
      this.marquee.x1 = s.x; this.marquee.y1 = s.y;
      if (!this.marquee.moved && Math.hypot(s.x - this.marquee.x0, s.y - this.marquee.y0) > 5) this.marquee.moved = true;
      if (this.marquee.moved) {
        this.renderer.hover = null;
        this.renderer.marquee = { x0: this.marquee.x0, y0: this.marquee.y0, x1: s.x, y1: s.y };
      }
      return;
    }

    if (e.pointerType === 'mouse') this.updateHover(s);
  }

  updateHover(s) {
    const p = this.renderer.screenToWorld(s.x, s.y);
    this.renderer.hover = p;
    const pawn = this.pawnNear(p.x, p.y, 0.46);
    this.renderer.hoverPawn = pawn;
    const tx = Math.floor(p.x), ty = Math.floor(p.y);
    this.renderer.hoverObj = pawn ? null : this.world.objectAt(tx, ty) || null;
    this.hover = p;
  }

  clearHover() {
    this.renderer.hover = null;
    this.renderer.hoverPawn = null;
    this.renderer.hoverObj = null;
    this.hover = null;
  }

  // ---------------------------------------------------------------- pointer up
  onPointerUp(e) {
    const s = this.screenPos(e);
    this.pointers.delete(e.pointerId);
    try { this.canvas.releasePointerCapture(e.pointerId); } catch { /* noop */ }

    if (this.pinch) {
      if (this.pointers.size < 2) this.pinch = null;
      return;
    }

    if (this.stroke && this.stroke.id === e.pointerId) {
      this.endStroke(true, s);
      return;
    }

    if (this.pan && this.pan.id === e.pointerId) {
      const wasMoved = this.pan.moved;
      const touch = this.pan.touch;
      const button = this.pan.button;
      this.endPan();
      if (!wasMoved) {
        if (button === 2) { this.rightClick(tileAt(this.renderer, s)); return; }
        if (touch) this.tap(s, e);
        else this.tap(s, e);
      } else if (button === 2) {
        // Right-drag was a pan; nothing else to do.
      }
      return;
    }

    if (this.marquee && this.marquee.id === e.pointerId) {
      const m = this.marquee;
      this.marquee = null;
      this.renderer.marquee = null;
      if (m.moved) this.applyMarquee(m);
      else this.tap(s, e);
      return;
    }
  }

  endPan() {
    if (this.pan) this.pan = null;
    this.canvas.classList.remove('grabbing');
  }

  // ---------------------------------------------------------------- tap / select
  tap(s, e = {}) {
    const p = this.renderer.screenToWorld(s.x, s.y);
    const additive = !!e.shiftKey;
    const pawn = this.pawnNear(p.x, p.y, this.pickRadius());
    const now = performance.now();
    const isDouble = now - this.lastTap.at < 340 && Math.hypot(s.x - this.lastTap.x, s.y - this.lastTap.y) < 28;
    this.lastTap = { at: now, x: s.x, y: s.y };

    if (pawn) {
      if (isDouble) {
        this.renderer.focus(pawn.x, pawn.y, Math.min(2.1, Math.max(1.7, this.renderer.camera.zoom * 1.2)));
      }
      if (additive) this.ui.selectPawn(pawn.id, true);
      else this.ui.selectPawn(pawn.id);
      this.audio?.play('select');
      return;
    }

    const tx = Math.floor(p.x), ty = Math.floor(p.y);
    const obj = this.world.objectAt(tx, ty);
    if (obj) {
      this.ui.selectObject(obj);
      this.audio?.play('select');
      return;
    }
    const zone = this.world.zoneAt(tx, ty);
    if (zone) {
      this.ui.selectZone(zone);
      this.audio?.play('select');
      return;
    }
    if (!additive) this.ui.clearSelection();
    if (isDouble) this.renderer.focus(p.x, p.y, Math.max(1.35, this.renderer.camera.zoom));
  }

  applyMarquee(m) {
    const x0 = Math.min(m.x0, m.x1), x1 = Math.max(m.x0, m.x1);
    const y0 = Math.min(m.y0, m.y1), y1 = Math.max(m.y0, m.y1);
    const r = this.renderer;
    const picked = [];
    for (const p of this.world.pawns) {
      if (p.dead) continue;
      if (p.kind !== 'colonist' && p.kind !== 'animal') continue;
      const sp = r.worldToScreen(p.x, p.y);
      if (sp.x >= x0 && sp.x <= x1 && sp.y >= y0 && sp.y <= y1) picked.push(p.id);
    }
    if (m.additive) {
      for (const id of picked) r.selected.add(id);
      this.ui.refreshSelection();
    } else if (picked.length) {
      r.selected.clear();
      r.selectedObj = null;
      r.selectedZone = null;
      for (const id of picked) r.selected.add(id);
      this.ui.refreshSelection();
    } else {
      this.ui.clearSelection();
    }
    this.audio?.play('select');
  }

  onDoubleClick(e) {
    const s = this.screenPos(e);
    const p = this.renderer.screenToWorld(s.x, s.y);
    const pawn = this.pawnNear(p.x, p.y, this.pickRadius());
    if (pawn) this.renderer.focus(pawn.x, pawn.y, Math.max(1.8, this.renderer.camera.zoom));
  }

  pickRadius() {
    return clamp(20 / (this.renderer.camera.zoom * 32), 0.4, 0.95);
  }

  pawnNear(x, y, radius) {
    let best = null, bd = radius * radius;
    for (const p of this.world.pawns) {
      if (p.dead) continue;
      const dx = p.x - x, dy = p.y - y;
      const d = dx * dx + dy * dy;
      if (d > bd) continue;
      // Colonists win ties over animals and raiders.
      if (!best || (p.kind === 'colonist' && best.kind !== 'colonist') || d < bd * 0.98) {
        bd = d; best = p;
      }
    }
    return best;
  }

  // ---------------------------------------------------------------- right click
  rightClick(tile) {
    if (this.renderer.tool) { this.cancelTool(); return; }
    const r = this.renderer;
    const colonists = [...r.selected]
      .map((id) => this.world.pawnById(id))
      .filter((p) => p && p.kind === 'colonist' && !p.dead && !p.downed);
    if (!colonists.length) {
      if (r.selectedObj || r.selectedZone) this.ui.clearSelection();
      return;
    }
    const target = this.pawnNear(tile.x + 0.5, tile.y + 0.5, 0.8);
    if (target && target.kind !== 'colonist') {
      let ordered = 0;
      for (const p of colonists) {
        if (!p.drafted && p.weapon) { p.drafted = true; p.clearTask(); }
        if (p.beginTask({ type: 'attack', targetId: target.id })) ordered++;
      }
      if (ordered) {
        this.ui.toast(`${ordered} colonist${ordered > 1 ? 's' : ''} attacking ${target.name}`);
        this.audio?.play('alarm');
        this.ui.refreshSelection();
      }
      return;
    }
    // Formation move: one tile per colonist around the clicked spot.
    const offsets = [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1], [2, 0], [-2, 0], [0, 2], [0, -2]];
    let moved = 0;
    colonists.forEach((p, i) => {
      const off = offsets[i % offsets.length];
      const tx = tile.x + off[0], ty = tile.y + off[1];
      if (p.task && p.task.type === 'sleep') p.wake();
      if (p.beginTask({ type: 'move', x: tx, y: ty })) moved++;
    });
    if (moved) {
      this.world.spawnParticles('dust', tile.x + 0.5, tile.y + 0.5, 5, { spread: 0.6 });
      this.audio?.play('click');
    }
    this.ui.refreshSelection();
  }

  // ---------------------------------------------------------------- tools
  setTool(tool) {
    this.endStroke(false);
    if (tool && tool.kind === 'build') {
      const def = BUILDINGS[tool.defId];
      if (def) tool.anchor = def.w > 1 || def.h > 1 ? 'center' : 'corner';
    }
    this.renderer.tool = tool;
    this.renderer.zonePreview = null;
    this.ui.showTool(tool);
    this.ui.renderArchitect();
    this.audio?.play('select');
  }

  rotateTool() {
    const tool = this.renderer.tool;
    if (!tool || tool.kind !== 'build') return;
    tool.rot = ((tool.rot || 0) + 90) % 180;
    this.ui.showTool(tool);
    this.ui.renderArchitect();
    this.audio?.play('click');
  }

  cancelTool(silent = false) {
    const had = !!this.renderer.tool;
    this.renderer.tool = null;
    this.renderer.zonePreview = null;
    this.endStroke(false);
    this.ui.showTool(null);
    if (had && !silent) this.audio?.play('click');
  }

  startStroke(tile, s) {
    const tool = this.renderer.tool;
    if (!tool) return;
    const stroke = {
      id: this.pointers.keys().next().value,
      kind: tool.kind,
      order: tool.order,
      zone: tool.zone,
      start: { x: tile.x, y: tile.y },
      last: { x: tile.x, y: tile.y },
      placed: new Set(),
      failed: false,
      moved: false,
    };
    this.stroke = stroke;

    if (tool.kind === 'build') {
      const def = BUILDINGS[tool.defId];
      const single = def && def.w === 1 && def.h === 1;
      if (single) {
        this.tryBuild(tile.x, tile.y);
      } else {
        // Ghost follows the cursor until release.
        this.renderer.hover = { x: tile.fx, y: tile.fy };
      }
      return;
    }
    if (tool.kind === 'zoneRemove') {
      this.removeZoneAt(tile.x, tile.y);
      return;
    }
    if (tool.kind === 'order' && tool.order === 'hunt') {
      this.huntAt(tile.x, tile.y);
      return;
    }
    if (tool.kind === 'order' && tool.order === 'cancel') {
      this.renderer.zonePreview = { x0: tile.x, y0: tile.y, x1: tile.x, y1: tile.y, type: 'cancel' };
      return;
    }
    if (tool.kind === 'zone') {
      this.renderer.zonePreview = { x0: tile.x, y0: tile.y, x1: tile.x, y1: tile.y, type: tool.zone };
      return;
    }
    if (tool.kind === 'order') {
      this.renderer.zonePreview = { x0: tile.x, y0: tile.y, x1: tile.x, y1: tile.y, type: 'order' };
    }
  }

  updateStroke(s) {
    const stroke = this.stroke;
    if (!stroke) return;
    const tool = this.renderer.tool;
    if (!tool) { this.endStroke(false); return; }
    const tile = this.tileAt(s.x, s.y);
    this.renderer.hover = { x: tile.fx, y: tile.fy };
    if (!stroke.moved && Math.hypot(tile.x - stroke.start.x, tile.y - stroke.start.y) > 0) stroke.moved = true;

    if (tool.kind === 'build') {
      const def = BUILDINGS[tool.defId];
      if (!def) return;
      if (def.w === 1 && def.h === 1) {
        const from = stroke.last;
        for (const t of lineTiles(from.x, from.y, tile.x, tile.y)) this.tryBuild(t.x, t.y);
      }
      stroke.last = { x: tile.x, y: tile.y };
      return;
    }
    if (tool.kind !== 'order' && tool.kind !== 'zone' && tool.kind !== 'zoneRemove') return;
    if (tool.kind === 'zoneRemove') return;
    if (tool.kind === 'order' && tool.order === 'hunt') return;
    stroke.last = { x: tile.x, y: tile.y };
    this.renderer.zonePreview = {
      x0: stroke.start.x, y0: stroke.start.y,
      x1: tile.x, y1: tile.y,
      type: tool.kind === 'zone' ? tool.zone : tool.order === 'cancel' ? 'cancel' : 'order',
    };
  }

  endStroke(finish = true, s = null) {
    const stroke = this.stroke;
    if (!stroke) return;
    this.stroke = null;
    const tool = this.renderer.tool;
    this.renderer.zonePreview = null;
    if (!finish || !tool) return;

    if (tool.kind === 'build') {
      const def = BUILDINGS[tool.defId];
      // 1x1 pieces were painted during the drag. Larger footprints are placed once.
      if (def && (def.w > 1 || def.h > 1)) {
        const end = s ? this.tileAt(s.x, s.y) : stroke.last;
        this.tryBuild(end.x, end.y);
      }
      return;
    }
    if (tool.kind === 'order' && tool.order === 'hunt') return;
    if (tool.kind === 'zoneRemove') return;

    const end = s ? this.tileAt(s.x, s.y) : stroke.last;
    const x0 = Math.min(stroke.start.x, end.x), x1 = Math.max(stroke.start.x, end.x);
    const y0 = Math.min(stroke.start.y, end.y), y1 = Math.max(stroke.start.y, end.y);

    if (tool.kind === 'zone') {
      const zone = this.world.addZone(tool.zone, x0, y0, x1, y1);
      if (zone) {
        const n = zone.w * zone.h;
        this.ui.toast(`${tool.zone === 'grow' ? 'Growing' : 'Stockpile'} zone created (${n} tiles)`);
        this.audio?.play('chime');
        this.ui.renderArchitect();
      } else {
        this.fail('Cannot place a zone there');
      }
      return;
    }
    if (tool.kind === 'order') {
      if (tool.order === 'cancel') {
        const n = this.cancelArea(x0, y0, x1, y1);
        if (n) { this.ui.toast(`${n} order${n > 1 ? 's' : ''} cancelled`); this.audio?.play('click'); }
      } else {
        const n = this.world.designate(tool.order, x0, y0, x1, y1);
        if (n) {
          this.ui.toast(`${n} ${tool.order === 'chop' ? 'tree' : tool.order === 'mine' ? 'deposit' : 'structure'}${n > 1 ? 's' : ''} marked`);
          this.audio?.play('click');
        } else {
          this.fail(tool.order === 'chop' ? 'Drag over trees to mark them' : tool.order === 'mine' ? 'Drag over rock or ore to mark it' : 'Drag over built structures');
        }
      }
      this.ui.renderArchitect();
    }
  }

  tryBuild(tx, ty) {
    const tool = this.renderer.tool;
    if (!tool) return false;
    const def = BUILDINGS[tool.defId];
    if (!def) return false;
    const rot = tool.rot || 0;
    const w = rot % 180 === 90 ? def.h : def.w;
    const h = rot % 180 === 90 ? def.w : def.h;
    const anchor = tool.anchor === 'center';
    const x = tx - (anchor ? Math.floor((w - 1) / 2) : 0);
    const y = ty - (anchor ? Math.floor((h - 1) / 2) : 0);
    const key = `${x},${y}`;
    if (this.stroke) {
      if (this.stroke.placed.has(key) || this.stroke.failed) return false;
      this.stroke.placed.add(key);
    }
    const res = this.world.queueBuild(tool.defId, x, y, rot);
    if (res.ok) {
      this.audio?.play('build', { distance: 0.2 });
      this.ui.updateTopbar();
      this.ui.renderArchitect();
      return true;
    }
    if (res.reason === 'resources') {
      if (this.stroke) this.stroke.failed = true;
      const missing = this.world.missingFor(tool.defId)
        .map((m) => `${m.need} ${m.type}`).join(', ');
      this.fail(`Not enough resources${missing ? ` — need ${missing}` : ''}`);
    } else if (res.reason === 'floor') {
      if (this.stroke) this.stroke.failed = true;
      this.fail('The floor is already finished there');
    }
    return false;
  }

  removeZoneAt(x, y) {
    const z = this.world.zoneAt(x, y);
    if (!z) { this.fail('Tap a zone to remove it'); return; }
    this.world.removeZoneAt(z.x, z.y);
    this.ui.clearSelection();
    this.ui.toast('Zone removed');
    this.audio?.play('click');
  }

  huntAt(x, y) {
    const p = this.pawnNear(x + 0.5, y + 0.5, 0.8);
    if (!p || p.kind !== 'animal') { this.fail('Tap a wild animal to mark it for hunting'); return; }
    const on = !this.world.designations.hunt.has(p.id);
    this.world.designateHunt(p.id, on);
    this.ui.toast(on ? `${p.name} marked for hunting` : 'Hunt order cancelled');
    this.audio?.play(on ? 'select' : 'click');
  }

  cancelArea(x0, y0, x1, y1) {
    const w = this.world;
    let n = 0;
    for (const set of Object.values(w.designations)) {
      for (const id of [...set]) {
        const o = w.objectById(id);
        if (!o) { set.delete(id); continue; }
        if (o.x >= x0 && o.x + o.w - 1 <= x1 && o.y >= y0 && o.y + o.h - 1 <= y1) { set.delete(id); n++; }
      }
    }
    for (const p of w.pawns) {
      if (p.kind !== 'animal' || p.dead) continue;
      if (p.x >= x0 && p.x < x1 + 1 && p.y >= y0 && p.y < y1 + 1 && w.designations.hunt.delete(p.id)) n++;
    }
    // Blueprints and zones inside the rectangle.
    for (const o of [...w.objects]) {
      if (o.dead || o.built) continue;
      if (o.x >= x0 && o.x + o.w - 1 <= x1 && o.y >= y0 && o.y + o.h - 1 <= y1) {
        if (w.cancelBuild(o)) n++;
      }
    }
    if (w.zoneAt(x0, y0)) { w.removeZoneAt(x0, y0); n++; }
    return n;
  }

  fail(text) {
    const now = performance.now();
    if (now - this.toastAt < 700) return;
    this.toastAt = now;
    this.ui.toast(text);
    this.audio?.play('error');
  }

  // ---------------------------------------------------------------- wheel & keys
  onWheel(e) {
    e.preventDefault();
    const s = this.screenPos(e);
    const factor = Math.exp(-e.deltaY * (e.deltaMode === 1 ? 0.05 : 0.0016));
    this.renderer.zoomAt(s.x, s.y, clamp(factor, 0.6, 1.6));
  }

  onKeyDown(e) {
    const tag = e.target?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || e.metaKey || e.ctrlKey || e.altKey) return;
    this.keys.add(e.code);
    this.audio?.resume();
    switch (e.code) {
      case 'Space':
        e.preventDefault();
        this.ui.togglePause();
        break;
      case 'Digit1': this.ui.setSpeed(1); break;
      case 'Digit2': this.ui.setSpeed(2); break;
      case 'Digit3': this.ui.setSpeed(3); break;
      case 'Digit0': case 'Numpad0': this.ui.setSpeed(0); break;
      case 'KeyR': this.rotateTool(); break;
      case 'Escape':
        if (!this.ui.dom.help.classList.contains('hidden')) this.ui.toggleHelp(false);
        else if (!this.ui.dom.sheet.classList.contains('hidden')) this.ui.closeSheet();
        else if (this.renderer.tool) this.cancelTool();
        else this.ui.clearSelection();
        break;
      case 'KeyH': this.ui.toggleHelp(); break;
      case 'KeyM': this.ui.dom.mute.click(); break;
      case 'KeyF': this.focusSelected(); break;
      case 'KeyB': this.ui.selectTab('architect'); break;
      case 'Equal': case 'NumpadAdd': this.renderer.zoomAt(this.renderer.w / 2, this.renderer.h / 2, 1.14); break;
      case 'Minus': case 'NumpadSubtract': this.renderer.zoomAt(this.renderer.w / 2, this.renderer.h / 2, 0.88); break;
      default: break;
    }
  }

  focusSelected() {
    const ids = [...this.renderer.selected];
    const pawns = ids.map((id) => this.world.pawnById(id)).filter(Boolean);
    if (pawns.length) {
      const x = pawns.reduce((a, p) => a + p.x, 0) / pawns.length;
      const y = pawns.reduce((a, p) => a + p.y, 0) / pawns.length;
      this.renderer.focus(x, y, Math.max(1.5, this.renderer.camera.zoom));
    } else if (this.renderer.selectedObj) {
      const o = this.world.objectById(this.renderer.selectedObj);
      if (o) this.renderer.focus(o.x + o.w / 2, o.y + o.h / 2);
    } else {
      this.renderer.focus(30, 31, 1.2);
    }
  }

  tick(dt) {
    if (!this.keys.size) return;
    const speed = 780;
    let dx = 0, dy = 0;
    if (this.keys.has('KeyA') || this.keys.has('ArrowLeft')) dx += 1;
    if (this.keys.has('KeyD') || this.keys.has('ArrowRight')) dx -= 1;
    if (this.keys.has('KeyW') || this.keys.has('ArrowUp')) dy += 1;
    if (this.keys.has('KeyS') || this.keys.has('ArrowDown')) dy -= 1;
    if (dx || dy) this.renderer.panBy(dx * speed * dt, dy * speed * dt);
  }
}

function tileAt(renderer, s) {
  const p = renderer.screenToWorld(s.x, s.y);
  return { x: Math.floor(p.x), y: Math.floor(p.y), fx: p.x, fy: p.y };
}

function lineTiles(x0, y0, x1, y1) {
  const out = [];
  let dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;
  let x = x0, y = y0;
  for (let guard = 0; guard < 200; guard++) {
    out.push({ x, y });
    if (x === x1 && y === y1) break;
    const e2 = err * 2;
    if (e2 > -dy) { err -= dy; x += sx; }
    if (e2 < dx) { err += dx; y += sy; }
  }
  return out;
}
