/* ============================================================
   NEON BREACH — unified input (touch sticks / mouse + keyboard)
   ============================================================ */
function capturePointer(el, pointerId) {
  try { el.setPointerCapture?.(pointerId); } catch { /* pointer may already be gone */ }
}

export class Input {
  constructor(dom) {
    this.dom = dom;
    this.keys = new Set();
    this.look = { x: 0, y: 0 };
    this.move = { x: 0, y: 0 };
    this.stickVec = { x: 0, y: 0 };
    this.firing = false;
    this.mouseFiring = false;
    this.locked = false;
    this.enabled = false;
    this.touch = false;

    this.lookId = null;
    this.stickId = null;
    this.fireId = null;
    this.lastLook = { x: 0, y: 0 };
    this.dragLooking = false;
    this.lastMouse = { x: 0, y: 0 };
    this.pressed = new Set();

    this.stickRadius = 52;
    this.stickBase = dom.stickBase;
    this.stickKnob = dom.stickKnob;
    this.stickHome = dom.stickHome;

    this.bindTouch();
    this.bindMouseKeyboard();
  }

  setEnabled(v) {
    this.enabled = v;
    if (!v) {
      this.firing = false;
      this.mouseFiring = false;
      this.dragLooking = false;
      this.resetStick();
      for (const el of document.querySelectorAll('.tbtn.active')) el.classList.remove('active');
    }
  }

  /* ------------------------------ touch ------------------------------ */
  bindTouch() {
    const { lookZone, stickZone, fireBtn, reloadBtn, jumpBtn } = this.dom;

    lookZone?.addEventListener('pointerdown', (e) => {
      if (!this.enabled) return;
      this.touch = true;
      if (e.pointerType === 'mouse') return; // desktop uses pointer lock
      if (this.lookId !== null) return;
      this.lookId = e.pointerId;
      this.lastLook.x = e.clientX;
      this.lastLook.y = e.clientY;
      capturePointer(lookZone, e.pointerId);
      e.preventDefault();
    });

    lookZone?.addEventListener('pointermove', (e) => {
      if (!this.enabled || e.pointerId !== this.lookId) return;
      const dx = e.clientX - this.lastLook.x;
      const dy = e.clientY - this.lastLook.y;
      this.lastLook.x = e.clientX;
      this.lastLook.y = e.clientY;
      const s = 0.0044;
      this.look.x += Math.max(-90, Math.min(90, dx)) * s;
      this.look.y += Math.max(-90, Math.min(90, dy)) * s;
      e.preventDefault();
    });

    const endLook = (e) => {
      if (e.pointerId === this.lookId) this.lookId = null;
    };
    lookZone?.addEventListener('pointerup', endLook);
    lookZone?.addEventListener('pointercancel', endLook);
    lookZone?.addEventListener('lostpointercapture', endLook);

    stickZone?.addEventListener('pointerdown', (e) => {
      if (!this.enabled) return;
      this.touch = true;
      if (this.stickId !== null) return;
      this.stickId = e.pointerId;
      const r = stickZone.getBoundingClientRect();
      this.stickOrigin = { x: e.clientX, y: e.clientY };
      this.stickBase.style.left = `${e.clientX - r.left}px`;
      this.stickBase.style.top = `${e.clientY - r.top}px`;
      this.stickBase.classList.add('on');
      this.stickHome?.classList.add('hide');
      this.stickZoneRect = r;
      capturePointer(stickZone, e.pointerId);
      e.preventDefault();
    });

    stickZone?.addEventListener('pointermove', (e) => {
      if (!this.enabled || e.pointerId !== this.stickId) return;
      this.updateStick(e.clientX, e.clientY);
      e.preventDefault();
    });

    const endStick = (e) => {
      if (e.pointerId === this.stickId) this.resetStick();
    };
    stickZone?.addEventListener('pointerup', endStick);
    stickZone?.addEventListener('pointercancel', endStick);
    stickZone?.addEventListener('lostpointercapture', endStick);

    fireBtn?.addEventListener('pointerdown', (e) => {
      if (!this.enabled) return;
      this.touch = true;
      this.fireId = e.pointerId;
      this.firing = true;
      fireBtn.classList.add('active');
      capturePointer(fireBtn, e.pointerId);
      e.preventDefault();
    });
    const endFire = (e) => {
      if (e.pointerId !== this.fireId) return;
      this.firing = false;
      this.fireId = null;
      fireBtn.classList.remove('active');
    };
    fireBtn?.addEventListener('pointerup', endFire);
    fireBtn?.addEventListener('pointercancel', endFire);
    fireBtn?.addEventListener('lostpointercapture', endFire);

    reloadBtn?.addEventListener('pointerdown', (e) => {
      if (!this.enabled) return;
      this.touch = true;
      this.pressed.add('reload');
      reloadBtn.classList.add('active');
      e.preventDefault();
    });
    const endReload = () => reloadBtn.classList.remove('active');
    reloadBtn?.addEventListener('pointerup', endReload);
    reloadBtn?.addEventListener('pointercancel', endReload);
    reloadBtn?.addEventListener('pointerleave', endReload);

    jumpBtn?.addEventListener('pointerdown', (e) => {
      if (!this.enabled) return;
      this.touch = true;
      this.pressed.add('jump');
      jumpBtn.classList.add('active');
      e.preventDefault();
    });
    const endJump = () => jumpBtn.classList.remove('active');
    jumpBtn?.addEventListener('pointerup', endJump);
    jumpBtn?.addEventListener('pointercancel', endJump);
    jumpBtn?.addEventListener('pointerleave', endJump);

    document.addEventListener('gesturestart', (e) => e.preventDefault());
    document.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  updateStick(cx, cy) {
    if (!this.stickOrigin) return;
    let dx = cx - this.stickOrigin.x;
    let dy = cy - this.stickOrigin.y;
    const len = Math.hypot(dx, dy);
    const r = this.stickRadius;
    if (len > r) { dx = (dx / len) * r; dy = (dy / len) * r; }
    const dead = 0.14;
    let nx = dx / r;
    let ny = dy / r;
    const mag = Math.hypot(nx, ny);
    if (mag < dead) { nx = 0; ny = 0; }
    else {
      const t = (mag - dead) / (1 - dead);
      nx = (nx / mag) * t;
      ny = (ny / mag) * t;
      if (t > 1) { nx /= t; ny /= t; }
    }
    this.stickVec.x = nx;
    this.stickVec.y = -ny; // up = forward
    this.stickKnob.style.transform = `translate(${dx}px, ${dy}px)`;
  }

  resetStick() {
    this.stickId = null;
    this.stickVec.x = 0;
    this.stickVec.y = 0;
    this.stickOrigin = null;
    this.stickKnob.style.transform = 'translate(0px, 0px)';
    this.stickBase.classList.remove('on');
    this.stickHome?.classList.remove('hide');
  }

  /* --------------------------- mouse / keys --------------------------- */
  bindMouseKeyboard() {
    const canvas = this.dom.canvas;

    window.addEventListener('keydown', (e) => {
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault();
      if (e.repeat) return;
      this.keys.add(e.code);
      if (!this.enabled) return;
      if (e.code === 'KeyR') this.pressed.add('reload');
      if (e.code === 'Space') this.pressed.add('jump');
      if (e.code === 'Escape') this.pressed.add('pause');
      if (e.code === 'KeyM') this.pressed.add('mute');
    });
    window.addEventListener('keyup', (e) => this.keys.delete(e.code));
    window.addEventListener('blur', () => this.keys.clear());

    document.addEventListener('pointerlockchange', () => {
      this.locked = document.pointerLockElement === canvas;
      if (!this.locked) this.mouseFiring = false;
    });

    canvas.addEventListener('mousedown', (e) => {
      if (!this.enabled) return;
      if (e.button !== 0) return;
      if (!this.locked && canvas.requestPointerLock) {
        canvas.requestPointerLock();
      }
      // fallback if pointer lock is unavailable: drag to look
      if (!this.locked) {
        this.dragLooking = true;
        this.lastMouse.x = e.clientX;
        this.lastMouse.y = e.clientY;
      }
      this.mouseFiring = true;
      this.firing = true;
    });
    window.addEventListener('mouseup', (e) => {
      if (e.button !== 0) return;
      this.mouseFiring = false;
      this.firing = false;
      this.dragLooking = false;
    });
    document.addEventListener('mousemove', (e) => {
      if (!this.enabled) return;
      if (this.locked) {
        this.look.x += e.movementX * 0.0022;
        this.look.y += e.movementY * 0.0022;
      } else if (this.dragLooking) {
        this.look.x += (e.clientX - this.lastMouse.x) * 0.0034;
        this.look.y += (e.clientY - this.lastMouse.y) * 0.0034;
        this.lastMouse.x = e.clientX;
        this.lastMouse.y = e.clientY;
      }
    });
  }

  consumeLook() {
    const out = { x: this.look.x, y: this.look.y };
    this.look.x = 0;
    this.look.y = 0;
    return out;
  }

  consumePressed(action) {
    if (this.pressed.has(action)) { this.pressed.delete(action); return true; }
    return false;
  }

  clearPressed() { this.pressed.clear(); }

  /* ------------------------------ sample ------------------------------ */
  sample() {
    let mx = 0, my = 0;
    if (this.keys.has('KeyW') || this.keys.has('ArrowUp')) my += 1;
    if (this.keys.has('KeyS') || this.keys.has('ArrowDown')) my -= 1;
    if (this.keys.has('KeyD') || this.keys.has('ArrowRight')) mx += 1;
    if (this.keys.has('KeyA') || this.keys.has('ArrowLeft')) mx -= 1;
    mx += this.stickVec.x;
    my += this.stickVec.y;
    const len = Math.hypot(mx, my);
    if (len > 1) { mx /= len; my /= len; }
    this.move.x = mx;
    this.move.y = my;
    return this.move;
  }
}

export function vibrate(pattern) {
  if (navigator.vibrate) { try { navigator.vibrate(pattern); } catch { /* noop */ } }
}
