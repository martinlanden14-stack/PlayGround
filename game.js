const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const hud = document.getElementById('hud');
const menu = document.getElementById('menu');
const gameOver = document.getElementById('gameOver');
const scoreText = document.getElementById('scoreText');
const bestText = document.getElementById('bestText');
const livesText = document.getElementById('livesText');
const finalScoreText = document.getElementById('finalScoreText');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const leftButton = document.getElementById('leftButton');
const rightButton = document.getElementById('rightButton');

const storageKey = 'neon-drift-best-score';
const bestScore = Number(localStorage.getItem(storageKey) || 0);
bestText.textContent = String(bestScore);

const state = {
  running: false,
  lastTime: 0,
  spawnTimer: 0,
  pickupTimer: 0,
  starTimer: 0,
  score: 0,
  lives: 3,
  laneWidth: 0,
  laneCount: 3,
  ship: {
    x: 0,
    y: 0,
    width: 44,
    height: 60,
    speed: 420,
    lane: 1,
    targetX: 0,
    drift: 0,
  },
  obstacles: [],
  pickups: [],
  stars: [],
};

const pointerState = {
  active: false,
  x: 0,
};

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.round(rect.width * ratio);
  canvas.height = Math.round(rect.height * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const width = rect.width;
  const height = rect.height;
  state.laneWidth = width / 3;
  const laneCenter = height * 0.78;
  state.ship.y = laneCenter + 130;
  state.ship.x = width / 2;
  state.ship.targetX = state.ship.x;

  for (const star of state.stars) {
    star.baseX = star.baseX || star.x;
    star.x = star.baseX * width;
  }

  if (!state.running && state.obstacles.length === 0) {
    buildStars(width, height);
  }
}

function buildStars(width, height) {
  state.stars = Array.from({ length: 90 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 2 + 1,
    speed: Math.random() * 58 + 38,
    alpha: Math.random() * 0.8 + 0.2,
  }));
}

function resetGame() {
  state.running = true;
  state.score = 0;
  state.lives = 3;
  state.spawnTimer = 0;
  state.pickupTimer = 0;
  state.obstacles = [];
  state.pickups = [];
  state.ship.lane = 1;
  state.ship.targetX = canvas.clientWidth / 2;
  state.ship.x = state.ship.targetX;
  scoreText.textContent = '0';
  livesText.textContent = '3';
  hud.classList.remove('hidden');
  menu.classList.add('hidden');
  gameOver.classList.add('hidden');
}

function addObstacle() {
  const width = canvas.clientWidth;
  const lane = Math.floor(Math.random() * state.laneCount);
  const laneX = (lane + 0.5) * state.laneWidth;
  const obstacle = {
    lane,
    x: laneX,
    y: -40,
    radius: 20 + Math.random() * 14,
    speed: 220 + Math.random() * 100,
    hitFlash: 0,
  };
  state.obstacles.push(obstacle);
}

function addPickup() {
  const width = canvas.clientWidth;
  const lane = Math.floor(Math.random() * state.laneCount);
  const pickup = {
    lane,
    x: (lane + 0.5) * state.laneWidth,
    y: -18,
    radius: 12,
    speed: 180 + Math.random() * 80,
    value: 10,
  };
  state.pickups.push(pickup);
}

function setLane(lane) {
  const width = canvas.clientWidth;
  state.ship.lane = Math.max(0, Math.min(state.laneCount - 1, lane));
  state.ship.targetX = (state.ship.lane + 0.5) * state.laneWidth;
  if (state.ship.targetX < 0) state.ship.targetX = width * 0.5;
}

function moveLeft() {
  setLane(state.ship.lane - 1);
}

function moveRight() {
  setLane(state.ship.lane + 1);
}

function handleInputMove(clientX) {
  const rect = canvas.getBoundingClientRect();
  const relativeX = clientX - rect.left;
  const lane = clamp(Math.floor(relativeX / state.laneWidth), 0, state.laneCount - 1);
  setLane(lane);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function update(dt) {
  if (!state.running) {
    updateStars(dt, true);
    return;
  }

  state.ship.x += (state.ship.targetX - state.ship.x) * Math.min(1, dt * 8);

  state.spawnTimer -= dt;
  if (state.spawnTimer <= 0) {
    addObstacle();
    state.spawnTimer = Math.max(0.42, 1 - state.score / 2200) + Math.random() * 0.3;
    if (Math.random() < 0.28) {
      addPickup();
    }
  }

  state.pickupTimer -= dt;
  if (state.pickupTimer <= 0) {
    state.pickupTimer = 1.7 + Math.random() * 1.2;
  }

  const shipHalf = state.ship.width / 2;
  const shipY = state.ship.y;

  for (const obstacle of state.obstacles) {
    obstacle.y += obstacle.speed * dt;
    obstacle.hitFlash = Math.max(0, obstacle.hitFlash - dt * 4);

    const distX = Math.abs(obstacle.x - state.ship.x);
    const distY = Math.abs(obstacle.y - shipY);
    const collisionRadius = obstacle.radius + state.ship.width * 0.3;

    if (distX < collisionRadius && distY < collisionRadius + 22) {
      state.lives -= 1;
      livesText.textContent = String(state.lives);
      obstacle.hitFlash = 1;
      obstacle.y = canvas.clientHeight + 80;
      if (state.lives <= 0) {
        endGame();
        return;
      }
    }
  }

  for (const pickup of state.pickups) {
    pickup.y += pickup.speed * dt;
    const distX = Math.abs(pickup.x - state.ship.x);
    const distY = Math.abs(pickup.y - shipY);
    if (distX < 28 && distY < 44) {
      state.score += pickup.value;
      scoreText.textContent = String(state.score);
      pickup.y = canvas.clientHeight + 50;
      state.lives = Math.min(5, state.lives + 1);
      livesText.textContent = String(state.lives);
    }
  }

  state.obstacles = state.obstacles.filter((obs) => obs.y < canvas.clientHeight + 60);
  state.pickups = state.pickups.filter((pickup) => pickup.y < canvas.clientHeight + 50);

  state.score += dt * 11;
  scoreText.textContent = String(Math.floor(state.score));

  updateStars(dt, false);
}

function updateStars(dt, idle) {
  for (const star of state.stars) {
    star.y += star.speed * dt * (idle ? 0.4 : 1.0);
    if (star.y > canvas.clientHeight + 4) {
      star.y = -4;
      star.x = Math.random() * canvas.clientWidth;
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  ctx.fillStyle = 'rgba(2, 7, 14, 0.24)';
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = 'rgba(126, 232, 255, 0.18)';
  ctx.lineWidth = 1;
  for (let i = 0; i < state.laneCount; i++) {
    const x = (i + 0.5) * state.laneWidth;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  for (const star of state.stars) {
    ctx.beginPath();
    ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();
  }

  for (const pickup of state.pickups) {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(128, 255, 184, 0.95)';
    ctx.arc(pickup.x, pickup.y, pickup.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255,255,255,0.8)';
    ctx.lineWidth = 2;
    ctx.arc(pickup.x, pickup.y, pickup.radius + 5, 0, Math.PI * 2);
    ctx.stroke();
  }

  for (const obstacle of state.obstacles) {
    const glow = obstacle.hitFlash > 0 ? 'rgba(255, 93, 115, 0.9)' : 'rgba(255, 99, 216, 0.9)';
    ctx.beginPath();
    ctx.fillStyle = glow;
    ctx.shadowBlur = obstacle.hitFlash > 0 ? 18 : 12;
    ctx.shadowColor = glow;
    ctx.arc(obstacle.x, obstacle.y, obstacle.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  drawShip();
}

function drawShip() {
  const x = state.ship.x;
  const y = state.ship.y;
  const w = state.ship.width;
  const h = state.ship.height;

  ctx.save();
  ctx.translate(x, y);
  ctx.shadowBlur = 18;
  ctx.shadowColor = 'rgba(126, 232, 255, 0.8)';

  ctx.fillStyle = '#7ee8ff';
  ctx.beginPath();
  ctx.moveTo(0, -h / 2);
  ctx.lineTo(w / 2, h / 3);
  ctx.lineTo(0, h / 2);
  ctx.lineTo(-w / 2, h / 3);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#ff63d8';
  ctx.fillRect(-6, -h / 2 + 10, 12, 24);

  ctx.restore();
}

function endGame() {
  state.running = false;
  const finalScore = Math.floor(state.score);
  finalScoreText.textContent = `Score: ${finalScore}`;
  const prevBest = Number(localStorage.getItem(storageKey) || 0);
  const nextBest = Math.max(prevBest, finalScore);
  localStorage.setItem(storageKey, String(nextBest));
  bestText.textContent = String(nextBest);
  gameOver.classList.remove('hidden');
  hud.classList.add('hidden');
}

function tick(timestamp) {
  const dt = Math.min(0.032, (timestamp - (state.lastTime || timestamp)) / 1000 || 0.016);
  state.lastTime = timestamp;
  update(dt);
  draw();
  requestAnimationFrame(tick);
}

function start() {
  resetGame();
}

startButton.addEventListener('click', start);
restartButton.addEventListener('click', () => {
  gameOver.classList.add('hidden');
  start();
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a') {
    moveLeft();
  }
  if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'd') {
    moveRight();
  }
  if (event.key === ' ' && !state.running) {
    start();
  }
});

canvas.addEventListener('pointerdown', (event) => {
  if (!state.running) {
    start();
    return;
  }
  handleInputMove(event.clientX);
});

canvas.addEventListener('pointermove', (event) => {
  if (!state.running) return;
  handleInputMove(event.clientX);
});

leftButton.addEventListener('pointerdown', (event) => {
  event.preventDefault();
  moveLeft();
});

rightButton.addEventListener('pointerdown', (event) => {
  event.preventDefault();
  moveRight();
});

window.addEventListener('resize', resizeCanvas);

resizeCanvas();
buildStars(canvas.clientWidth, canvas.clientHeight);
requestAnimationFrame(tick);
