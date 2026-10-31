# SUNSET CITY

A stylized, open-world crime game that runs in the browser. Built with **Three.js** and **Vite**, designed for both desktop and mobile.

Drive the neon-lit streets of Sunset City, take jobs at the lockup, outrun the police, and build your name one score at a time.

## Play

```bash
npm install
npm run dev
```

Then open the local URL Vite prints. For a production build:

```bash
npm run build
npm run preview
```

The game is a single-page app; the built `dist/` folder can be served from any static host.

## Features

- **Open city** — a procedural low-poly skyline with roads, traffic, pedestrians, parked cars, and rooftop neon.
- **Third-person action** — on-foot movement, melee/shooting, jumping, and vehicle entry/exit.
- **Driving** — arcade car handling with handbrake, vehicle health, and a live speedometer.
- **Crime & police** — wanted stars, pursuing cruisers, and a police helicopter at higher heat levels.
- **Jobs** — the story job *The First Score* plus repeatable contracts: *Hot Delivery*, *Shakedown*, and *Dead Drop*.
- **Progression** — cash payouts, mission timers, fail states, and a free-roam loop after each job.
- **Mobile-first controls** — virtual joystick, drag-to-look, and context-sensitive action buttons, with a responsive HUD for landscape and portrait.
- **Procedural audio** — engine, siren, gunfire, and UI cues generated in the browser (no audio files).

## Controls

### Desktop

| Action | Input |
| --- | --- |
| Move | `W A S D` / arrow keys |
| Look | Drag with the mouse |
| Fire | Left click or `F` |
| Jump | `Space` |
| Interact / enter vehicle | `E` |
| Handbrake | `Shift` |
| Pause | `Esc` |

### Mobile

- **Left joystick** — move / steer.
- **Drag the right side** of the screen — look around.
- **FIRE** — attack or shoot.
- **ENTER** — enter or exit a vehicle, or start a contract.
- **JUMP** — jump while on foot.
- **BRAKE** — handbrake while driving.

Landscape orientation is recommended for the fullest view.

## Project layout

```
index.html        UI shell: HUD, start/pause/result screens
src/main.js       game loop, input, camera, combat, police, missions, audio
src/world.js      procedural city, roads, traffic, pedestrians, props
src/entities.js   low-poly player, cars, people, helicopter, markers
src/style.css     responsive HUD and screen styling
```

## Tech

- [Three.js](https://threejs.org/) for 3D rendering
- [Vite](https://vite.dev/) for development and builds
- Vanilla JavaScript, HTML, and CSS — no game engine or framework

## Notes

- Best played in landscape with sound on.
- The world is generated at load time, so the first visit may take a moment on slower devices.
- No external assets are required; all geometry, materials, and audio are procedural.
