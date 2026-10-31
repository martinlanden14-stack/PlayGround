export class Input {
  constructor() {
    this.joy = { x: 0, y: 0, active: false, pointerId: null };
    this.keys = new Set();
    this.actions = [];
    this._joyEl = document.getElementById('joystick');
    this._knob = document.getElementById('joy-knob');
    this._onAction = null;
    this._bindJoystick();
    this._bindButtons();
    this._bindKeyboard();
    this._pressedCodes = new Set();
  }

  _bindJoystick() {
    const el = this._joyEl;
    if (!el) return;
    const knob = this._knob;
    const max = 37;

    const update = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      let dx = (e.clientX - cx) / (rect.width * .36);
      let dy = (e.clientY - cy) / (rect.height * .36);
      const len = Math.hypot(dx, dy);
      if (len > 1) { dx /= len; dy /= len; }
      this.joy.x = dx;
      this.joy.y = dy;
      this.joy.active = len > .12;
      const kx = dx * max, ky = dy * max;
      knob.style.transform = `translate(${kx}px, ${ky}px)`;
      knob.classList.toggle('pushing', -dy > .55);
      el.classList.toggle('engaged', this.joy.active);
    };

    const start = (e) => {
      e.preventDefault();
      this.joy.pointerId = e.pointerId;
      el.setPointerCapture(e.pointerId);
      update(e);
    };
    const move = (e) => {
      if (this.joy.pointerId !== e.pointerId) return;
      e.preventDefault();
      update(e);
    };
    const end = (e) => {
      if (this.joy.pointerId !== e.pointerId) return;
      this.joy.pointerId = null;
      this.joy.x = 0; this.joy.y = 0; this.joy.active = false;
      knob.style.transform = 'translate(0px, 0px)';
      knob.classList.remove('pushing');
      el.classList.remove('engaged');
    };
    el.addEventListener('pointerdown', start);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
    el.addEventListener('lostpointercapture', end);
  }

  _bindButtons() {
    document.querySelectorAll('[data-action]').forEach((btn) => {
      const fire = (e) => {
        e.preventDefault();
        const action = btn.dataset.action;
        this.actions.push(action);
        btn.classList.add('pressed');
        if (navigator.vibrate && action === 'ollie') navigator.vibrate(8);
        setTimeout(() => btn.classList.remove('pressed'), 110);
        if (this._onAction) this._onAction(action);
      };
      btn.addEventListener('pointerdown', fire);
      btn.addEventListener('contextmenu', (e) => e.preventDefault());
    });
  }

  _bindKeyboard() {
    const map = {
      Space: 'ollie',
      KeyJ: 'kickflip',
      KeyK: 'shove',
      KeyL: 'spin',
      ArrowUp: 'push',
      KeyW: 'push',
      ArrowDown: 'brake',
      KeyS: 'brake',
      ArrowLeft: 'left',
      KeyA: 'left',
      ArrowRight: 'right',
      KeyD: 'right'
    };
    window.addEventListener('keydown', (e) => {
      if (e.repeat) return;
      if (map[e.code]) {
        if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault();
        if (['Space', 'KeyJ', 'KeyK', 'KeyL'].includes(e.code)) {
          this.actions.push(map[e.code]);
        } else {
          this.keys.add(map[e.code]);
        }
      }
    });
    window.addEventListener('keyup', (e) => {
      if (map[e.code]) this.keys.delete(map[e.code]);
    });
    window.addEventListener('blur', () => this.keys.clear());
  }

  onAction(fn) { this._onAction = fn; }

  consumeActions() {
    const out = this.actions;
    this.actions = [];
    return out;
  }

  get moveX() {
    let x = this.joy.active ? this.joy.x : 0;
    if (this.keys.has('left')) x -= 1;
    if (this.keys.has('right')) x += 1;
    return Math.max(-1, Math.min(1, x));
  }

  get push() {
    const analog = this.joy.active ? Math.max(0, -this.joy.y) : 0;
    return this.keys.has('push') || analog > .32 ? Math.max(analog, this.keys.has('push') ? 1 : 0) : 0;
  }

  get brake() {
    const analog = this.joy.active ? Math.max(0, this.joy.y) : 0;
    return this.keys.has('brake') || analog > .5 ? 1 : 0;
  }

  get pushing() {
    return this.push > .12;
  }

  reset() {
    this.joy.x = 0; this.joy.y = 0; this.joy.active = false;
    this.keys.clear();
    this.actions = [];
    if (this._knob) this._knob.style.transform = 'translate(0px, 0px)';
  }
}
