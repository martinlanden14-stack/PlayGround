# SECTOR 7 — Mobile 3D FPS

A touch-first, browser-based arena shooter built with Three.js and Vite. Drop into a neon combat arena, survive endless waves of machines, chain kills for score multipliers, and break the Warden every fifth wave.

Everything is generated at runtime — geometry, weapon model, UI, particles, skyline, and audio. There are no external art or sound assets to download.

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

## Play

```bash
npm install
npm run dev
```

Open the printed local URL. Add `?touch=1` to force the touch UI on a desktop browser, or `?touch=0` to force the desktop UI.

Production build:

```bash
npm run build
npm run preview
```

## Controls

### Mobile / touch

- **Left thumb** — dynamic move stick; push to the edge to sprint
- **Right drag** — aim
- **FIRE** — hold to shoot; slide your thumb to keep aiming while firing
- **JUMP / RELOAD** — dedicated buttons
- **Pause button** — pause, restart, mute, or exit to menu
- Portrait is fully supported; a one-time rotate prompt appears on first play in portrait and holds the simulation while it is open.

### Desktop

- **WASD / arrows** — move
- **Shift** — sprint
- **Mouse** — aim (click to lock the pointer)
- **Mouse 1** — fire
- **Space** — jump
- **R** — reload
- **Esc / P** — pause · **M** — mute

## Features

- Endless escalating waves: drones, ground stalkers, and a Warden boss every fifth wave
- Chain-kill combo multiplier, wave-clear bonuses, and persistent local best score/wave
- Hitscan pulse rifle with recoil, tracers, muzzle flash, reload animation, and mobile aim assist
- Health drops from enemies, delayed regeneration, damage/heal feedback
- Procedural WebAudio soundtrack and sound effects
- Responsive HUD and screen layouts for portrait phones, landscape phones, tablets, and desktop
- Procedural neon arena with a central platform, cover, spawn pads, animated skyline, planet, and stars

## Project layout

| File | Purpose |
| --- | --- |
| `src/game.js` | State machine, waves, scoring, render loop |
| `src/world.js` | Arena geometry, colliders, lighting, skyline |
| `src/player.js` | Movement, collision, camera, health |
| `src/weapon.js` | Viewmodel, hitscan, aim assist, reload |
| `src/enemies.js` | Drone, stalker, and Warden AI; health orbs |
| `src/input.js` | Touch stick/look/fire input, keyboard, pointer lock |
| `src/ui.js` | HUD, screens, banners, best-score persistence |
| `src/fx.js` | Pooled particles, tracers, rings, muzzle flashes |
| `src/audio.js` | Procedural sound effects and music |
| `src/styles.css` | All UI and responsive styling |

### Debug hooks

During development, the game instance is exposed as `window.__sector7` — for example `__sector7.debugSpawn('warden')`, `__sector7.debugKillAll()`, or `__sector7.debugSetHealth(100)`.
