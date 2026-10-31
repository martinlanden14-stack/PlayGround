import './style.css';
import { SunsetGrind } from './game/Game.js';

const canvas = document.getElementById('game-canvas');

try {
  const game = new SunsetGrind(canvas);
  window.__sunsetGrind = game;
} catch (err) {
  console.error('Sunset Grind failed to boot', err);
  const boot = document.getElementById('boot');
  if (boot) {
    boot.innerHTML = `
      <div class="boot-mark">SG<span>’86</span></div>
      <p style="max-width:280px;text-align:center;line-height:1.7;letter-spacing:.16em;color:#ffb08a">
        THIS DEVICE NEEDS WEBGL 2 TO RIDE.<br>TRY A RECENT MOBILE BROWSER.
      </p>
    `;
  }
}
