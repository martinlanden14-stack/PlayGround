// Touch-first input: dynamic left thumbstick, right-side drag-look, hold-to-fire.
// Desktop falls back to pointer lock + WASD.

import { clamp } from './utils.js';

const LOOK_SENS_TOUCH = 0.0031;
const LOOK_SENS_MOUSE = 0.0021;
const STICK_RADIUS = 52;

export class Input {
  constructor(game) {
    this.game = game;
    this.canvas = game.renderer.domElement;
    this.keys = new Set();

    const forced = new URLSearchParams(location.search).get('touch');
    this.isTouch =
      forced === '1' ||
      (forced !== '0' && (('ontouchstart' in window) || navigator.maxTouchPoints > 0));
    document.body.classList.toggle('touch', this.isTouch);

    // continuous state
    this.moveX = 0;
    this.moveY = 0;
    this.sprint = false;
    this.fireHeld = false;
    this.firePointer = null;
    this.fireLastX = 0;
    this.fireLastY = 0;

    // edge-triggered actions
    this.jumpQueued = false;
    this.reloadQueued = false;

    // accumulated look delta (radians)
    this.lookX = 0;
    this.lookY = 0;

    this.stickPointer = null;
    this.lookPointer = null;
    this.stickCenter = { x: 0, y: 0 };
    this.stickBaseLeft = 0;
    this.stickBaseTop = 0;

    this.pointerLocked = false;
    this.mouseFiring = false;

    this._bindKeyboard();
    this._bindTouch();
    this._bindButtons();
    this._bindPointerLock();

    // prevent context menu / selection gestures on the play surface
    window.addEventListener('contextmenu', (e) => e.preventDefault());
    document.addEventListener('gesturestart', (e) => e.preventDefault());
  }

  // ------------------------------------------------------------ keyboard
  _bindKeyboard() {
    window.addEventListener('keydown', (e) => {
      if (e.repeat) {
        if (['Space', 'KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code)) e.preventDefault();
        return;
      }
      this.keys.add(e.code);
      switch (e.code) {
        case 'Space':
          this.jumpQueued = true;
          e.preventDefault();
          break;
        case 'KeyR':
          this.reloadQueued = true;
          break;
        case 'Escape':
        case 'KeyP':
          if (this.game.isPlaying() || this.game.state === 'paused') {
            this.game.togglePause();
          }
          break;
        case 'KeyM':
          this.game.toggleMute();
          break;
        default:
          break;
      }
    });

    window.addEventListener('keyup', (e) => this.keys.delete(e.code));
    window.addEventListener('blur', () => {
      this.keys.clear();
      this.fireHeld = false;
      this.mouseFiring = false;
    });
  }

  _keyMovement() {
    let x = 0;
    let y = 0;
    if (this.keys.has('KeyW') || this.keys.has('ArrowUp')) y += 1;
    if (this.keys.has('KeyS') || this.keys.has('ArrowDown')) y -= 1;
    if (this.keys.has('KeyD') || this.keys.has('ArrowRight')) x += 1;
    if (this.keys.has('KeyA') || this.keys.has('ArrowLeft')) x -= 1;
    return { x, y };
  }

  // ------------------------------------------------------------ touch
  _bindTouch() {
    if (!this.isTouch) return;

    window.addEventListener(
      'pointerdown',
      (e) => {
        if (!this.game.isPlaying()) return;
        if (e.pointerType === 'mouse') return;
        if (e.target instanceof Element && e.target.closest('button, .screen, #rotate-hint')) return;

        const w = window.innerWidth;
        const h = window.innerHeight;

        if (e.clientX < w * 0.46 && this.stickPointer === null) {
          this._beginStick(e);
        } else if (this.lookPointer === null && e.clientX >= w * 0.46) {
          this.lookPointer = e.pointerId;
          this._lookLastX = e.clientX;
          this._lookLastY = e.clientY;
        }
      },
      { passive: false }
    );

    window.addEventListener(
      'pointermove',
      (e) => {
        if (e.pointerId === this.stickPointer) {
          this._moveStick(e);
        } else if (e.pointerId === this.lookPointer) {
          const dx = e.clientX - this._lookLastX;
          const dy = e.clientY - this._lookLastY;
          this._lookLastX = e.clientX;
          this._lookLastY = e.clientY;
          // ignore absurd jumps (finger swap / palm)
          if (Math.abs(dx) < 120 && Math.abs(dy) < 120) {
            this.lookX += dx * LOOK_SENS_TOUCH;
            this.lookY += dy * LOOK_SENS_TOUCH;
          }
        }
      },
      { passive: true }
    );

    const end = (e) => {
      if (e.pointerId === this.stickPointer) this._endStick();
      if (e.pointerId === this.lookPointer) this.lookPointer = null;
      if (e.pointerId === this.firePointer) {
        this.firePointer = null;
        this.fireHeld = false;
        this.game.ui.setFirePressed(false);
      }
    };
    window.addEventListener('pointerup', end);
    window.addEventListener('pointercancel', end);
    window.addEventListener('blur', () => {
      this._endStick();
      this.lookPointer = null;
      this.fireHeld = false;
    });
  }

  _beginStick(e) {
    const stick = document.getElementById('stick');
    if (!stick) return;
    this.stickPointer = e.pointerId;
    this.stickCenter.x = e.clientX;
    this.stickCenter.y = e.clientY;
    stick.classList.add('active');
    stick.style.position = 'fixed';
    stick.style.left = `${e.clientX - 70}px`;
    stick.style.top = `${e.clientY - 70}px`;
    stick.style.bottom = 'auto';
    stick.style.transform = 'none';
    this._moveStick(e);
  }

  _moveStick(e) {
    const dx = e.clientX - this.stickCenter.x;
    const dy = e.clientY - this.stickCenter.y;
    const dist = Math.hypot(dx, dy);
    const clamped = Math.min(dist, STICK_RADIUS);
    const nx = dist > 0.001 ? dx / dist : 0;
    const ny = dist > 0.001 ? dy / dist : 0;

    this.moveX = (nx * clamped) / STICK_RADIUS;
    this.moveY = (-ny * clamped) / STICK_RADIUS;
    this.sprint = clamped / STICK_RADIUS > 0.9;

    const knob = document.querySelector('#stick .stick-knob');
    if (knob) {
      knob.style.transform = `translate(${nx * clamped}px, ${ny * clamped}px)`;
    }
  }

  _endStick() {
    this.stickPointer = null;
    this.moveX = 0;
    this.moveY = 0;
    this.sprint = false;
    const stick = document.getElementById('stick');
    if (stick) {
      stick.classList.remove('active');
      stick.style.position = '';
      stick.style.left = '';
      stick.style.top = '';
      stick.style.bottom = '';
      stick.style.transform = '';
    }
    const knob = document.querySelector('#stick .stick-knob');
    if (knob) knob.style.transform = '';
  }

  // ------------------------------------------------------------ buttons
  _bindButtons() {
    const fire = document.getElementById('btn-fire');
    const jump = document.getElementById('btn-jump');
    const reload = document.getElementById('btn-reload');

    const press = (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.firePointer = e.pointerId;
      this.fireLastX = e.clientX;
      this.fireLastY = e.clientY;
      this.fireHeld = true;
      this.game.ui.setFirePressed(true);
      try {
        fire.setPointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    };
    // while holding FIRE, sliding the thumb aims the rifle
    const aim = (e) => {
      if (this.firePointer !== e.pointerId) return;
      const dx = e.clientX - this.fireLastX;
      const dy = e.clientY - this.fireLastY;
      this.fireLastX = e.clientX;
      this.fireLastY = e.clientY;
      if (Math.abs(dx) < 120 && Math.abs(dy) < 120) {
        this.lookX += dx * LOOK_SENS_TOUCH;
        this.lookY += dy * LOOK_SENS_TOUCH;
      }
    };
    const release = (e) => {
      if (e) e.preventDefault();
      this.firePointer = null;
      this.fireHeld = false;
      this.game.ui.setFirePressed(false);
    };
    fire.addEventListener('pointerdown', press);
    fire.addEventListener('pointermove', aim);
    fire.addEventListener('pointerup', release);
    fire.addEventListener('pointercancel', release);
    fire.addEventListener('lostpointercapture', release);

    jump.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.jumpQueued = true;
      jump.classList.add('pressed');
      setTimeout(() => jump.classList.remove('pressed'), 110);
      this.game.audio.init();
    });

    reload.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.reloadQueued = true;
      this.game.audio.init();
    });

    // touch devices should also be able to fire by tapping the right side
    if (!this.isTouch) return;
  }

  // ------------------------------------------------------------ pointer lock / mouse
  _bindPointerLock() {
    this.canvas.addEventListener('mousedown', (e) => {
      if (!this.game.isPlaying()) return;
      if (this.isTouch) return;
      if (e.button !== 0) return;
      if (!this.pointerLocked) {
        this.requestLock();
        return;
      }
      this.mouseFiring = true;
      this.fireHeld = true;
    });

    window.addEventListener('mouseup', (e) => {
      if (e.button !== 0) return;
      this.mouseFiring = false;
      if (!this.isTouch) this.fireHeld = false;
    });

    document.addEventListener('mousemove', (e) => {
      if (!this.pointerLocked || !this.game.isPlaying()) return;
      this.lookX += e.movementX * LOOK_SENS_MOUSE;
      this.lookY += e.movementY * LOOK_SENS_MOUSE;
    });

    // clicking the canvas starts pointer lock on desktop
    this.canvas.addEventListener('click', () => {
      if (this.isTouch || !this.game.isPlaying()) return;
      if (!this.pointerLocked) this.requestLock();
    });

    document.addEventListener('pointerlockchange', () => {
      this.pointerLocked = document.pointerLockElement === this.canvas;
      if (!this.pointerLocked && !this.isTouch && this.game.isPlaying()) {
        this.fireHeld = false;
        this.mouseFiring = false;
        this.game.togglePause(true);
      }
    });
  }

  requestLock() {
    if (this.isTouch) return;
    try {
      const p = this.canvas.requestPointerLock();
      if (p && p.catch) p.catch(() => {});
    } catch {
      /* pointer lock may be blocked */
    }
  }

  releaseLock() {
    if (document.pointerLockElement) {
      try {
        document.exitPointerLock();
      } catch {
        /* ignore */
      }
    }
  }

  // ------------------------------------------------------------ per-frame
  update() {
    if (this.isTouch) {
      // moveX / moveY already set by stick events; keyboard can still assist
      const keys = this._keyMovement();
      if (keys.x || keys.y) {
        this.moveX = clamp(this.moveX + keys.x, -1, 1);
        this.moveY = clamp(this.moveY + keys.y, -1, 1);
        if (this.keys.has('ShiftLeft') || this.keys.has('ShiftRight')) this.sprint = true;
      }
    } else {
      const keys = this._keyMovement();
      this.moveX = keys.x;
      this.moveY = keys.y;
      this.sprint = this.keys.has('ShiftLeft') || this.keys.has('ShiftRight');
    }
    if (this.firePointer) this.fireHeld = true;
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

  reset() {
    this.moveX = 0;
    this.moveY = 0;
    this.fireHeld = false;
    this.firePointer = null;
    this.lookX = 0;
    this.lookY = 0;
    this.jumpQueued = false;
    this.reloadQueued = false;
    this.sprint = false;
    this._endStick();
    this.game.ui.setFirePressed(false);
  }
}
