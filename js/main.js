import { Game } from './game.js';

const container = document.getElementById('app');

function fatal(message) {
  const box = document.createElement('div');
  box.className = 'overlay';
  box.innerHTML = `<div class="panel"><div class="panel-kicker danger">SYSTEM FAILURE</div>
    <h2>NO SIGNAL</h2>
    <p style="font-size:11px;line-height:1.7;color:#a9d8e0;letter-spacing:.06em">${message}</p>
    <button class="panel-btn primary" onclick="location.reload()">RETRY</button></div>`;
  document.body.appendChild(box);
}

try {
  const canvas = document.createElement('canvas');
  if (!canvas.getContext('webgl2') && !canvas.getContext('webgl')) {
    fatal('This device does not support WebGL. Try a recent version of Chrome, Safari or Firefox.');
  } else {
    const game = new Game(container);
    window.__NEON_GAME__ = game;
  }
} catch (err) {
  console.error(err);
  fatal('The renderer failed to start. Reload to try again.');
}

// block iOS double-tap zoom and multi-touch page gestures
document.addEventListener('touchstart', (e) => {
  if (e.touches.length > 1) e.preventDefault();
}, { passive: false });
