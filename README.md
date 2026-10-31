# NEON BREACH

**Hold the grid. Survive the swarm.**

NEON BREACH is a fast, mobile-first 3D wave-survival FPS that runs entirely in the browser. Built with Three.js, it ships with no runtime downloads and needs no build step.

![NEON BREACH gameplay](assets/screenshots/gameplay.png)

## Play

Open the deployed project, or run it locally:

```bash
./start.sh
```

Then visit `http://localhost:3002` (set `PORT` to use another port).

### Touch

| Action | Control |
| --- | --- |
| Move | Left joystick |
| Aim | Drag anywhere on the right side of the view |
| Fire | Hold the fire button |
| Jump | Jump button |
| Reload | Reload button |
| Pause / mute | Buttons in the top-right HUD |

Touch aiming includes a small aim-assist cone and a tighter spread to keep the action readable on a phone.

### Desktop

| Action | Control |
| --- | --- |
| Move | `WASD` / arrow keys |
| Aim | Mouse (click the view to lock the pointer) |
| Fire | Left mouse button |
| Jump | `Space` |
| Reload | `R` |
| Sprint | `Shift` |
| Pause | `Esc` |
| Mute | `M` |

## Features

- **Wave survival** with escalating enemy counts, health, speed, and new enemy types.
- **Three enemy classes**:
  - **Crawler** — a fast melee swarmer with a glowing amber face.
  - **Drone** — an orbiting flyer that fires pink plasma bolts.
  - **Brute** — a heavy charger with a large health pool and a hard-hitting melee.
- **Score, combos, and headshots** — chain kills for multipliers; headshots deal triple damage and pay double.
- **Health pickups**, regenerating integrity, reloads, jumping, and a sprint.
- **Procedural neon arena** with animated sky rings, distant skyline, cover, spawn pads, and a synthesized soundtrack.
- **Touch-first HUD** with a responsive portrait layout, rotate hint, hit markers, damage vignette, wave banners, and a persistent best score.
- **Self-contained assets** — Three.js, fonts, icons, and audio are all local or generated at runtime.

## Screens

| Mobile landscape | Desktop |
| --- | --- |
| ![Mobile gameplay](assets/screenshots/gameplay.png) | ![Desktop gameplay](assets/screenshots/desktop-gameplay.png) |

| Portrait | Wave cleared |
| --- | --- |
| ![Portrait gameplay](assets/screenshots/portrait-gameplay.png) | ![Wave cleared](assets/screenshots/wave-clear.png) |

## Tech

- **Three.js r160** (`vendor/three.module.js`) with an ES-module import map.
- **No bundler or framework** — plain HTML, CSS, and JavaScript modules.
- **Procedural audio** via the Web Audio API: weapon, impacts, enemies, UI, and music are synthesized on the fly.
- **Pooled FX** for particles, tracers, flashes, and rings; low-poly enemies and no shadow maps.
- **Dynamic resolution** scales the render target between `0.7x` and `1x` of the device pixel ratio to protect frame rate.
- **Collision and hitscan** use lightweight circle/AABB and ray/sphere helpers in `src/world.js` and `src/enemies.js`.

## Project layout

```text
index.html                  HUD, overlays, import map
css/style.css               Layout, HUD, menus, portrait rules
src/main.js                 Game loop, player, weapon, waves, score
src/world.js                Arena, lighting, colliders, ray helpers
src/enemies.js              Enemy AI, models, projectiles, hit tests
src/fx.js                   Pooled particles, tracers, flashes, rings
src/audio.js                Synthesized SFX and music
src/input.js                Touch joystick/look/buttons + desktop input
src/ui.js                   HUD and overlay DOM updates
vendor/three.module.js      Vendored Three.js r160
assets/fonts/               Orbitron and Rajdhani woff2
assets/screenshots/         Curated project screenshots
```

## Performance notes

The game is tuned for mid-range phones: enemy count is capped per wave, projectiles and FX are pooled, and the render scale adapts to measured FPS. Audio is created only after the first user gesture, as required by mobile browsers.

## Credits

- [Three.js](https://threejs.org/) r160 — MIT License.
- Orbitron and Rajdhani typefaces — SIL Open Font License.
- Arena, enemies, effects, music, and UI are original procedural work built for this project.

<!-- omgithub:readme:start -->
## 🚀 Build, play, and remix with OMGithub

**Created using [OMGithub.com](https://omgithub.com).**

[![OMGithub](https://img.shields.io/badge/OMGithub-Open%20project-orange?style=for-the-badge)](https://omgithub.com/martinlanden14-stack/PlayGround)
[![GitHub](https://img.shields.io/badge/GitHub-Source-181717?logo=github&style=for-the-badge)](https://github.com/martinlanden14-stack/PlayGround)

- 🎮 [Open the project](https://omgithub.com/martinlanden14-stack/PlayGround).
- ✨ [Remix this project](https://omgithub.com/?remix=martinlanden14-stack%2FPlayGround).
- 💻 [Explore the source](https://github.com/martinlanden14-stack/PlayGround).
- 🛠️ [Check build runs](https://github.com/martinlanden14-stack/PlayGround/actions).
- 🐛 [Report an issue](https://github.com/martinlanden14-stack/PlayGround/issues).
- 👤 [Explore the creator's projects](https://omgithub.com/martinlanden14-stack).
- 🌍 [Create with OMGithub](https://omgithub.com).
<!-- omgithub:readme:end -->
