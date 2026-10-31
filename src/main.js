import { Game } from './game/Game.js'

const canvas = document.querySelector('#stage')
const game = new Game(canvas)

window.__ASHFALL__ = game
window.addEventListener('error', (event) => {
  console.error('ASHFALL runtime error:', event.error || event.message)
})
