/* ============================================================
   Input — touch joystick, touch look, action buttons,
   plus mouse + keyboard for desktop.
   ============================================================ */

export class Input {
  constructor(canvas, { onPause, onMute } = {}) {
    this.canvas = canvas;
    this.onPause = onPause;
    this.onMute = onMute;

    this.enabled = false;
    this.isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;

    this.move = { x: 0, y: 0 };
    this.lookX = 0;
    this.lookY = 0;
    this.firing = false;
    this.sprint = false;
    this.jumpQueued = false;
    this.reloadQueued = false;

    this.keys = new Set();
    this.lookPointer = null;
    this.lastPointer = { x: 0, y: 0 };
    this.joyPointer = null;
    this.firePointer = null;
    this.pointerLocked = false;

    this.joyEl = document.getElementById('joystick');
    this.stickEl = document.getElementById('stick');
    this.fireEl = document.getElementById('btn-fire');
    this.reloadEl = document.getElementById('btn-reload');
    this.jumpEl = document.getElementById('btn-jump');

    this.joyRadius = 42;
    this._bind();
  }

  setEnabled(enabled) {
    this.enabled = enabled;
    if (!enabled) this.reset();
    if (enabled) {
      this.joyEl.classList.remove('active');
      this.stickEl.style.transform = '';
    } else if (document.pointerLockElement) {
      document.exitPointerLock?.();
    }
  }

  reset() {
    this.move.x = 0;
    this.move.y = 0;
    this.lookX = 0;
    this.lookY = 0;
    this.firing = false;
    this.sprint = false;
    this.jumpQueued = false;
    this.reloadQueued = false;
    this.keys.clear();
    this.lookPointer = null;
    this.joyPointer = null;
    this.firePointer = null;
    this.stickEl.style.transform = '';
    this.joyEl.classList.remove('active');
    this.fireEl.classList.remove('pressed');
    this.reloadEl.classList.remove('pressed');
    this.jumpEl.classList.remove('pressed');
  }

  consumeLook() {
    const out = { x: this.lookX, y: this.lookY };
    this.lookX = 0;
    this.lookY = 0;
    return out;
  }

  consumeJump() {
    const j = this.jumpQueued;
    this.jumpQueued = false;
    return j;
  }

  consumeReload() {
    const r = this.reloadQueued;
    this.reloadQueued = false;
    return r;
  }

  _bind() {
    /* ---------------- keyboard ---------------- */
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') {
        this.onPause?.();
        return;
      }
      if (!this.enabled) return;
      if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault();
      }
      this.keys.add(e.code);
      if (e.code === 'Space' && !e.repeat) this.jumpQueued = true;
      if (e.code === 'KeyR' && !e.repeat) this.reloadQueued = true;
      if (e.code === 'KeyM' && !e.repeat) this.onMute?.();
      this.sprint = this.keys.has('ShiftLeft') || this.keys.has('ShiftRight');
      this._updateKeyboardMove();
    });

    window.addEventListener('keyup', (e) => {
      this.keys.delete(e.code);
      this.sprint = this.keys.has('ShiftLeft') || this.keys.has('ShiftRight');
      this._updateKeyboardMove();
    });

    window.addEventListener('blur', () => {
      this.firing = false;
      this.keys.clear();
      this.move.x = 0;
      this.move.y = 0;
      this.sprint = false;
    });

    /* ---------------- mouse look / fire ---------------- */
    this.canvas.addEventListener('mousedown', (e) => {
      if (!this.enabled || this.isTouch) return;
      if (e.button !== 0) return;
      this.firing = true;
      if (!document.pointerLockElement) {
        try { this.canvas.requestPointerLock?.(); } catch { /* ignore */ }
      }
    });
    window.addEventListener('mouseup', (e) => {
      if (e.button === 0) this.firing = false;
    });
    document.addEventListener('mousemove', (e) => {
      if (!this.enabled || this.isTouch) return;
      // pointer lock is ideal; while the button is held we also support
      // click-drag aiming for embedded/iframe views where lock is blocked
      if (this.pointerLocked || this.firing) {
        this.lookX += e.movementX || 0;
        this.lookY += e.movementY || 0;
      }
    });
    document.addEventListener('pointerlockchange', () => {
      this.pointerLocked = document.pointerLockElement === this.canvas;
      if (!this.pointerLocked) this.firing = false;
    });

    /* ---------------- touch look (canvas) ---------------- */
    this.canvas.addEventListener('pointerdown', (e) => {
      if (!this.enabled) return;
      if (e.pointerType === 'mouse' && this.pointerLocked) return;
      if (this.lookPointer !== null) return;
      this.lookPointer = e.pointerId;
      this.lastPointer.x = e.clientX;
      this.lastPointer.y = e.clientY;
      try { this.canvas.setPointerCapture(e.pointerId); } catch { /* ignore */ }
    });
    this.canvas.addEventListener('pointermove', (e) => {
      if (!this.enabled || e.pointerId !== this.lookPointer) return;
      this.lookX += e.clientX - this.lastPointer.x;
      this.lookY += e.clientY - this.lastPointer.y;
      this.lastPointer.x = e.clientX;
      this.lastPointer.y = e.clientY;
    });
    const endLook = (e) => {
      if (e.pointerId === this.lookPointer) this.lookPointer = null;
    };
    this.canvas.addEventListener('pointerup', endLook);
    this.canvas.addEventListener('pointercancel', endLook);
    this.canvas.addEventListener('lostpointercapture', endLook);

    /* ---------------- joystick ---------------- */
    const joyStart = (e) => {
      if (!this.enabled || this.joyPointer !== null) return;
      this.joyPointer = e.pointerId;
      this.joyEl.classList.add('active');
      try { this.joyEl.setPointerCapture(e.pointerId); } catch { /* ignore */ }
      this._joyMove(e);
      e.preventDefault();
    };
    const joyMove = (e) => {
      if (e.pointerId !== this.joyPointer) return;
      this._joyMove(e);
      e.preventDefault();
    };
    const joyEnd = (e) => {
      if (e.pointerId !== this.joyPointer) return;
      this.joyPointer = null;
      this.move.x = 0;
      this.move.y = 0;
      this.stickEl.style.transform = '';
      this.joyEl.classList.remove('active');
    };
    this.joyEl.addEventListener('pointerdown', joyStart);
    this.joyEl.addEventListener('pointermove', joyMove);
    this.joyEl.addEventListener('pointerup', joyEnd);
    this.joyEl.addEventListener('pointercancel', joyEnd);
    this.joyEl.addEventListener('lostpointercapture', joyEnd);

    /* ---------------- action buttons ---------------- */
    this.fireEl.addEventListener('pointerdown', (e) => {
      if (!this.enabled || this.firePointer !== null) return;
      this.firePointer = e.pointerId;
      this.firing = true;
      this.fireEl.classList.add('pressed');
      try { this.fireEl.setPointerCapture(e.pointerId); } catch { /* ignore */ }
      e.preventDefault();
    });
    const fireEnd = (e) => {
      if (e.pointerId !== this.firePointer) return;
      this.firePointer = null;
      this.firing = false;
      this.fireEl.classList.remove('pressed');
    };
    this.fireEl.addEventListener('pointerup', fireEnd);
    this.fireEl.addEventListener('pointercancel', fireEnd);
    this.fireEl.addEventListener('lostpointercapture', fireEnd);

    const tapAction = (el, fn) => {
      el.addEventListener('pointerdown', (e) => {
        if (!this.enabled) return;
        el.classList.add('pressed');
        fn();
        e.preventDefault();
      });
      const up = () => el.classList.remove('pressed');
      el.addEventListener('pointerup', up);
      el.addEventListener('pointercancel', up);
      el.addEventListener('lostpointercapture', up);
    };
    tapAction(this.reloadEl, () => { this.reloadQueued = true; });
    tapAction(this.jumpEl, () => { this.jumpQueued = true; });
  }

  _joyMove(e) {
    const rect = this.joyEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    let dx = e.clientX - cx;
    let dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    const max = this.joyRadius;
    if (dist > max) {
      dx = (dx / dist) * max;
      dy = (dy / dist) * max;
    }
    this.stickEl.style.transform = `translate(${dx}px, ${dy}px)`;
    const nx = dx / max;
    const ny = dy / max;
    const dead = 0.14;
    const mag = Math.hypot(nx, ny);
    if (mag < dead) {
      this.move.x = 0;
      this.move.y = 0;
    } else {
      const scaled = (mag - dead) / (1 - dead);
      const inv = 1 / mag;
      this.move.x = nx * inv * scaled;
      this.move.y = -ny * inv * scaled;
    }
  }

  _updateKeyboardMove() {
    if (this.joyPointer !== null) return;
    let x = 0;
    let y = 0;
    if (this.keys.has('KeyW') || this.keys.has('ArrowUp')) y += 1;
    if (this.keys.has('KeyS') || this.keys.has('ArrowDown')) y -= 1;
    if (this.keys.has('KeyD') || this.keys.has('ArrowRight')) x += 1;
    if (this.keys.has('KeyA') || this.keys.has('ArrowLeft')) x -= 1;
    const m = Math.hypot(x, y);
    if (m > 1) { x /= m; y /= m; }
    this.move.x = x;
    this.move.y = y;
  }
}
