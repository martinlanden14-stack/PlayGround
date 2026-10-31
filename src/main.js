// Emberfield boot: build the world, wire the interface, then run the frame loop.
import { World } from './world.js';
import { Renderer } from './render.js';
import { AudioEngine } from './audio.js';
import { UI } from './ui.js';
import { Input } from './input.js';

function showBootError(err) {
  console.error(err);
  const loading = document.getElementById('loading');
  if (!loading) return;
  const sub = loading.querySelector('.load-sub');
  if (sub) sub.textContent = 'Failed to start — see the console';
  const bar = loading.querySelector('.load-bar');
  if (bar) bar.remove();
  const note = document.createElement('div');
  note.style.cssText = 'position:absolute;bottom:24px;left:24px;right:24px;color:#e79a8b;font:12px/1.5 monospace;text-align:center;white-space:pre-wrap';
  note.textContent = String(err && err.stack || err);
  loading.appendChild(note);
}

function boot() {
  const canvas = document.getElementById('game');
  if (!canvas) throw new Error('Missing #game canvas');

  const world = new World(20260401);
  const renderer = new Renderer(canvas, world);
  const audio = new AudioEngine();
  world.audio = audio;
  const ui = new UI(world, renderer, audio);
  const input = new Input(canvas, world, renderer, ui, audio);
  ui.input = input;

  // Begin at a pleasing view of the finished starting colony.
  renderer.camera.x = renderer.camera.tx = 31.5;
  renderer.camera.y = renderer.camera.ty = 30.5;
  renderer.camera.zoom = renderer.camera.tzoom = window.innerWidth < 700 ? 1.05 : 1.18;

  window.addEventListener('resize', () => {
    renderer.resize();
    renderer.clampCamera();
  });
  window.addEventListener('orientationchange', () => setTimeout(() => {
    renderer.resize();
    renderer.clampCamera();
  }, 120));

  // Audio context may only start inside a user gesture.
  const unlock = () => audio.resume();
  window.addEventListener('pointerdown', unlock, { passive: true });
  window.addEventListener('keydown', unlock);
  window.addEventListener('touchstart', unlock, { passive: true });

  const loading = document.getElementById('loading');
  let frames = 0;
  let last = performance.now();
  let simAcc = 0;
  let lastWeatherSound = 0;
  const STEP = 1 / 30;

  function frame(now) {
    const raw = (now - last) / 1000;
    last = now;
    const dt = Math.min(0.12, raw > 0 ? raw : 0.016);

    input.tick(Math.min(0.05, dt));

    // Run the simulation on a fixed step so slow frames do not slow the clock.
    simAcc += dt;
    let guard = 0;
    while (simAcc >= STEP && guard < 10) {
      world.update(STEP);
      simAcc -= STEP;
      guard++;
    }
    if (guard >= 10) simAcc = 0;

    renderer.draw(dt);
    ui.update(dt);

    // Keep the rain layer in sync with the world weather.
    if (audio.ctx && now - lastWeatherSound > 240) {
      lastWeatherSound = now;
      audio.setRain(world.rain);
    }

    frames++;
    if (frames === 3 && loading) {
      loading.classList.add('done');
      setTimeout(() => loading.classList.add('hidden'), 700);
    }
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);

  window.EMBERFIELD = { world, renderer, ui, input, audio };
  console.info('Emberfield ready — seed', world.seed);
}

try {
  boot();
} catch (err) {
  showBootError(err);
}
