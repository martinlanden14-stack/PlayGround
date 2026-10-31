import './styles.css';
import { Game } from './game.js';

function showFatal(message) {
  const boot = document.getElementById('boot');
  if (boot) {
    boot.innerHTML = `
      <div style="max-width:520px;padding:28px;text-align:center;font-family:monospace;line-height:1.7">
        <div style="color:#ff2d78;letter-spacing:.25em;font-size:12px;margin-bottom:12px">ARENA OFFLINE</div>
        <div style="color:#cfe9ff;font-size:13px">${message}</div>
        <div style="color:#8ba3b8;font-size:11px;margin-top:14px">This game needs WebGL. Try a modern browser or enable hardware acceleration.</div>
      </div>`;
    boot.classList.remove('done');
  }
}

let game;
try {
  game = new Game();
  window.__sector7 = game;
} catch (err) {
  console.error(err);
  showFatal(String(err?.message || err));
}

// reveal the arena once the first frames have compiled
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    const boot = document.getElementById('boot');
    if (boot) {
      boot.classList.add('done');
      setTimeout(() => boot.remove(), 900);
    }
  });
});

// pause audio scheduler drift when the tab is hidden
document.addEventListener('visibilitychange', () => {
  if (!game) return;
  if (document.hidden) {
    game.audio.stopMusic();
  } else if (game.state === 'playing' || game.state === 'menu') {
    game.audio.startMusic();
  }
});
