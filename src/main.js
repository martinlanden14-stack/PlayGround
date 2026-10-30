import { Game } from './game.js';

const loading = document.getElementById('loading');

function fail(message) {
  loading.classList.remove('done');
  loading.innerHTML = `<div class="load-mark" style="animation:none;border-color:#ff2d9b"></div><span>${message}</span>`;
}

try {
  const game = new Game(document.getElementById('scene'));
  window.__game = game;

  // let the first frame land before revealing the menu
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => loading.classList.add('done'));
    });
  });
} catch (err) {
  console.error(err);
  fail('OPTICS OFFLINE — WEBGL REQUIRED');
}

window.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('gesturestart', (e) => e.preventDefault());
