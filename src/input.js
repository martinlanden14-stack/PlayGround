/** Unified touch + mouse + keyboard controls. */
export class Input {
  constructor({ lookZone, stickZone, stickKnob, fireBtn, onPause }) {
    this.lookZone = lookZone;
    this.stickZone = stickZone;
    this.stickKnob = stickKnob;
    this.fireBtn = fireBtn;
    this.onPause = onPause;
    this.desktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    this.move = { x: 0, y: 0 };
    this.lookX = 0;
    this.lookY = 0;
    this.firing = false;
    this.mouseFiring = false;
    this.touchFiring = false;
    this.keys = new Set();
    this.dashQueued = false;
    this.reloadQueued = false;
    this.pointerLocked = false;

    this.stickPointer = null;
    this.lookPointer = null;
    this.firePointer = null;
    this.stickCenter = { x: 0, y: 0 };
    this.stickRadius = 46;
    this.lastX = 0;
    this.lastY = 0;
    this.enabled = false;

    this._bind();
  }

  _bind() {
    const s = this.stickZone;
    s.addEventListener('pointerdown', (e) => this._stickDown(e));
    s.addEventListener('pointermove', (e) => this._stickMove(e));
    s.addEventListener('pointerup', (e) => this._stickUp(e));
    s.addEventListener('pointercancel', (e) => this._stickUp(e));

    const look = this.lookZone;
    look.addEventListener('pointerdown', (e) => this._lookDown(e));
    look.addEventListener('pointermove', (e) => this._lookMove(e));
    look.addEventListener('pointerup', (e) => this._lookUp(e));
    look.addEventListener('pointercancel', (e) => this._lookUp(e));

    const fire = this.fireBtn;
    fire.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.firePointer = e.pointerId;
      this._capture(fire, e.pointerId);
      this.touchFiring = true;
      fire.classList.add('held');
    });
    const endFire = (e) => {
      if (this.firePointer !== null && e.pointerId !== this.firePointer) return;
      this.firePointer = null;
      this.touchFiring = false;
      fire.classList.remove('held');
    };
    fire.addEventListener('pointerup', endFire);
    fire.addEventListener('pointercancel', endFire);
    fire.addEventListener('pointerleave', (e) => {
      if (e.buttons === 0) endFire(e);
    });

    window.addEventListener('keydown', (e) => this._keyDown(e));
    window.addEventListener('keyup', (e) => this._keyUp(e));
    window.addEventListener('blur', () => this.reset());

    document.addEventListener('pointerlockchange', () => {
      this.pointerLocked = document.pointerLockElement === document.body;
    });

    document.addEventListener('mousemove', (e) => {
      if (!this.pointerLocked || !this.enabled) return;
      this.lookX += e.movementX || 0;
      this.lookY += e.movementY || 0;
    });

    document.addEventListener('mousedown', (e) => {
      if (e.button === 0 && this.pointerLocked && this.enabled) this.mouseFiring = true;
    });
    document.addEventListener('mouseup', (e) => {
      if (e.button === 0) this.mouseFiring = false;
    });

    this.lookZone.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  _capture(el, id) {
    try { el.setPointerCapture?.(id); } catch { /* synthetic or stale pointer */ }
  }

  get firingNow() {
    return this.firing || this.mouseFiring || this.touchFiring;
  }

  _stickDown(e) {
    if (!this.enabled) return;
    e.preventDefault();
    this.stickPointer = e.pointerId;
    this._capture(this.stickZone, e.pointerId);
    this.stickZone.classList.add('active');
    const rect = this.stickZone.getBoundingClientRect();
    const base = this.stickKnob.getBoundingClientRect();
    // anchor to the base centre, but let players grab anywhere in the zone
    this.stickCenter = {
      x: base.left + base.width / 2,
      y: base.top + base.height / 2,
    };
    this.stickRadius = Math.max(34, base.width * 0.82);
    this._stickMove(e, rect);
  }

  _stickMove(e, rect) {
    if (this.stickPointer !== e.pointerId) return;
    e.preventDefault();
    const dx = e.clientX - this.stickCenter.x;
    const dy = e.clientY - this.stickCenter.y;
    const len = Math.hypot(dx, dy);
    const max = this.stickRadius;
    const clamped = Math.min(1, len / max);
    let nx = 0;
    let ny = 0;
    if (len > 4) {
      nx = (dx / len) * clamped;
      ny = (dy / len) * clamped;
    }
    this.move.x = nx;
    this.move.y = -ny;
    this.stickKnob.style.transform = `translate(${nx * max}px, ${ny * max}px)`;
  }

  _stickUp(e) {
    if (this.stickPointer !== e.pointerId) return;
    this.stickPointer = null;
    this.move.x = 0;
    this.move.y = 0;
    this.stickKnob.style.transform = 'translate(0px, 0px)';
    this.stickZone.classList.remove('active');
  }

  _lookDown(e) {
    if (!this.enabled) return;
    if (e.pointerType === 'mouse') {
      if (!this.pointerLocked) {
        this.requestLock();
        return;
      }
      this.mouseFiring = true;
      return;
    }
    if (this.lookPointer !== null) return;
    this.lookPointer = e.pointerId;
    this.lastX = e.clientX;
    this.lastY = e.clientY;
    this._capture(this.lookZone, e.pointerId);
  }

  _lookMove(e) {
    if (e.pointerId !== this.lookPointer) return;
    const dx = e.clientX - this.lastX;
    const dy = e.clientY - this.lastY;
    this.lastX = e.clientX;
    this.lastY = e.clientY;
    this.lookX += dx;
    this.lookY += dy;
  }

  _lookUp(e) {
    if (e.pointerType === 'mouse') {
      this.mouseFiring = false;
    }
    if (e.pointerId === this.lookPointer) this.lookPointer = null;
  }

  _keyDown(e) {
    if (!this.enabled) return;
    const key = e.key.toLowerCase();
    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(key)) e.preventDefault();
    if (key === 'escape' || key === 'p') {
      this.onPause?.();
      return;
    }
    if (key === 'r') this.reloadQueued = true;
    if (key === ' ' || key === 'shift') this.dashQueued = true;
    this.keys.add(key);
  }

  _keyUp(e) {
    this.keys.delete(e.key.toLowerCase());
  }

  consumeLook() {
    const out = { x: this.lookX, y: this.lookY };
    this.lookX = 0;
    this.lookY = 0;
    return out;
  }

  consumeDash() {
    const q = this.dashQueued;
    this.dashQueued = false;
    return q;
  }

  consumeReload() {
    const q = this.reloadQueued;
    this.reloadQueued = false;
    return q;
  }

  /** Movement vector in local space: x = strafe right, y = forward. */
  getMove() {
    let x = 0;
    let y = 0;
    const k = this.keys;
    if (k.has('w') || k.has('arrowup')) y += 1;
    if (k.has('s') || k.has('arrowdown')) y -= 1;
    if (k.has('d') || k.has('arrowright')) x += 1;
    if (k.has('a') || k.has('arrowleft')) x -= 1;

    x += this.move.x;
    y += this.move.y;

    const len = Math.hypot(x, y);
    if (len > 1) {
      x /= len;
      y /= len;
    }
    return { x, y };
  }

  requestLock() {
    if (!this.desktop || this.pointerLocked) return;
    const el = document.body;
    const p = el.requestPointerLock?.();
    if (p && p.catch) p.catch(() => { /* headless / unsupported */ });
  }

  releaseLock() {
    if (document.pointerLockElement) document.exitPointerLock?.();
  }

  reset() {
    this.keys.clear();
    this.move.x = this.move.y = 0;
    this.lookX = this.lookY = 0;
    this.firing = false;
    this.mouseFiring = false;
    this.touchFiring = false;
    this.stickPointer = null;
    this.lookPointer = null;
    this.firePointer = null;
    this.stickKnob.style.transform = 'translate(0px, 0px)';
    this.stickZone.classList.remove('active');
    this.fireBtn.classList.remove('held');
  }
}
