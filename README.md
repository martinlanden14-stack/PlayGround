# PlayGround

<!-- omgithub:readme:start -->
## 🚀 Build, play, and remix with OMGithub

**Remixed using [OMGithub.com](https://omgithub.com).**

[![OMGithub](https://img.shields.io/badge/OMGithub-Open%20project-orange?style=for-the-badge)](https://omgithub.com/martinlanden14-stack/PlayGround)
[![GitHub](https://img.shields.io/badge/GitHub-Source-181717?logo=github&style=for-the-badge)](https://github.com/martinlanden14-stack/PlayGround)

- 🎮 [Open the project](https://omgithub.com/martinlanden14-stack/PlayGround).
- ✨ [Remix this project](https://omgithub.com/?remix=martinlanden14-stack%2FPlayGround).
- 💻 [Explore the source](https://github.com/martinlanden14-stack/PlayGround).
- 🛠️ [Check build runs](https://github.com/martinlanden14-stack/PlayGround/actions).
- 🐛 [Report an issue](https://github.com/martinlanden14-stack/PlayGround/issues).
- 👤 [Explore the creator's projects](https://omgithub.com/martinlanden14-stack).
- 🌍 [Create with OMGithub](https://omgithub.com).
- 🧬 [Explore the remix source](https://github.com/martinlanden14-stack/PlayGround).
<!-- omgithub:readme:end -->

## NEON BREACH — a 3D wave shooter for mobile

A touch-first, first-person wave shooter that runs entirely in the browser. Hold a neon arena against escalating waves of drones, kamikaze seekers, armored titans and the WARDEN boss. No installs, no external assets — the whole game ships as static files with a vendored Three.js build.

### Play

- **Mobile:** left thumb drags the joystick, right thumb drags anywhere on the view to aim. Auto-fire is on by default and locks the nearest enemy near your crosshair; use the FIRE button for manual shots, RELOAD to top up early, and DASH to dodge incoming orbs.
- **Desktop:** `WASD` to move, click the view to lock the pointer, mouse to aim, left click to fire, `R` to reload, `Shift`/`Space` to dash, `Esc` to pause.
- Weapons have a 24-round magazine with auto-reload. Health regenerates after a few seconds out of danger, and destroyed enemies can drop health cores.
- Every fifth wave spawns a WARDEN. Clear waves for bonus score, chain kills for a score multiplier, and chase your personal best (stored locally).

### Tech

- `index.html` + `styles.css` + ES modules in `src/` — no build step.
- [Three.js](https://threejs.org) is vendored at `vendor/three/three.module.js` (MIT) so the game works offline.
- Pooled particles, tracers, projectiles and ring effects; pixel-ratio auto-scaling for slower phones.
- Procedural Web Audio SFX (gunfire, impacts, explosions, ambience) — no audio downloads.

Run the static server from the repo root with `./start.sh` (or any static file server) and open the printed URL. Designed for landscape, but fully playable in portrait with a compact HUD.
