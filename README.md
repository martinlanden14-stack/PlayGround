# NEON BREACH

A mobile-first 3D wave-survival FPS that runs directly in the browser. Hold a neon arena against escalating drone waves, chain kills for score multipliers, and grab health and ammo drops between breaches.

Built with vanilla ES modules and a locally vendored copy of [Three.js](https://threejs.org/) — no build step, no network assets, no external art or audio files. Everything you see and hear is generated at runtime.

## Features

- **Touch-first controls** — dynamic left-thumb movement stick, right-side drag look, and large fire / reload / jump buttons with subtle aim assist.
- **Desktop support** — WASD movement, pointer-lock mouse look, hold-to-fire, reload, jump, mute, and pause.
- **Escalating waves** — Wraith scouts, Hexer spitters, Juggernaut brutes, and an Overseer elite every fifth wave.
- **Readable combat** — telegraphed melee lunges, dodgeable projectiles, hit markers, damage direction indicators, radar, and kill feed.
- **Scoring loop** — combo multiplier, wave-clear bonuses, persistent best score in `localStorage`.
- **Responsive HUD** — tuned for landscape phones, portrait phones, tablets, and desktop.
- **Procedural presentation** — low-poly geometry, canvas textures, synthesized WebAudio effects, particles, tracers, and shell casings.
- **Performance options** — automatic low-quality mode on touch devices plus a HIGH QUALITY toggle in the pause menu.

## Run it

Requires Node.js 18+ and a browser with WebGL.

```bash
npm start
```

Then open **http://localhost:3002**.

Alternatively:

```bash
./start.sh
```

The included `server.mjs` is a minimal static server with no dependencies. To host elsewhere, serve the repository root over HTTP — ES modules and the import map will not work from `file://`.

## Controls

### Touch

| Action | Input |
| --- | --- |
| Move | Drag in the lower-left stick zone |
| Look | Drag anywhere on the right side of the screen |
| Fire | Hold the pink **FIRE** button |
| Reload | Tap the circular arrow button |
| Jump | Tap the up-arrow button |
| Pause / sound | Top-right HUD buttons |

Landscape gives the widest view. Portrait is fully playable and the HUD reflows automatically.

### Desktop

| Action | Input |
| --- | --- |
| Move | `W` `A` `S` `D` or arrow keys |
| Look | Mouse (click the arena to lock the pointer) |
| Fire | Hold left mouse button |
| Reload | `R` |
| Jump | `Space` |
| Mute | `M` |
| Pause | `Esc` |

## Tips

- Aim for the upper half of a drone for critical hits.
- The combo multiplier rises with every kill and decays if you stop scoring.
- Brutes and Overseers flash and lunge before melee damage lands — strafe out of reach.
- Hexer projectiles can be dodged or blocked by arena cover.
- Clearing a wave repairs some hull and restocks reserve ammo.

## Project layout

```text
index.html          HUD, menus, touch controls, import map
css/style.css       responsive HUD and overlay styling
js/main.js          boot and WebGL fallback
js/game.js          renderer, game loop, waves, scoring, menus
js/player.js        movement, camera, weapon view model, hitscan
js/enemy.js         drone models, AI, attacks, health bars
js/arena.js         procedural arena, cover, lighting, spawn points
js/input.js         touch / mouse / keyboard input
js/hud.js           DOM HUD, radar, kill feed, damage feedback
js/effects.js       particles, tracers, explosions, casings
js/pickups.js       health and ammo drops
js/audio.js         synthesized WebAudio sound effects
server.mjs          zero-dependency local static server
vendor/three.module.js  Three.js r170 (MIT)
```

## Third-party code

Three.js is included at `vendor/three.module.js` under the MIT License. See [threejs.org](https://threejs.org/) for source and license details.

---

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
