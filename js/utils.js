/* OUTLAND — shared math, RNG, noise & pathfinding helpers */
export const TAU = Math.PI * 2;
export const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
export const lerp = (a, b, t) => a + (b - a) * t;
export const smooth = (t) => t * t * (3 - 2 * t);
export const dist = (ax, ay, bx, by) => Math.hypot(ax - bx, ay - by);
export const key = (x, y) => x + ',' + y;
export const parseKey = (k) => { const i = k.indexOf(','); return [+k.slice(0, i), +k.slice(i + 1)]; };
export const pick = (arr, rnd = Math.random) => arr[(rnd() * arr.length) | 0];

export function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export class RNG {
  constructor(seed = 1) { this.next = mulberry32(seed | 0); }
  float(a = 0, b = 1) { return a + this.next() * (b - a); }
  int(a, b) { return Math.floor(this.float(a, b + 1)); }
  chance(p) { return this.next() < p; }
  pick(arr) { return arr[(this.next() * arr.length) | 0]; }
  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = (this.next() * (i + 1)) | 0;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}

export function hash2(x, y, seed = 0) {
  let h = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263) + Math.imul(seed | 0, 1442695041);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

export function vnoise(x, y, seed = 0) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const u = smooth(xf), v = smooth(yf);
  const a = hash2(xi, yi, seed), b = hash2(xi + 1, yi, seed);
  const c = hash2(xi, yi + 1, seed), d = hash2(xi + 1, yi + 1, seed);
  return lerp(lerp(a, b, u), lerp(c, d, u), v);
}

export function fbm(x, y, seed = 0, oct = 4, lac = 2.02, gain = 0.5) {
  let amp = 0.5, freq = 1, sum = 0, norm = 0;
  for (let i = 0; i < oct; i++) {
    sum += amp * vnoise(x * freq, y * freq, seed + i * 131);
    norm += amp;
    amp *= gain; freq *= lac;
  }
  return sum / norm;
}

export function fmtClock(hourFloat) {
  let h = Math.floor(hourFloat) % 24;
  const m = Math.floor((hourFloat - Math.floor(hourFloat)) * 60);
  const ampm = h >= 12 ? 'PM' : 'AM';
  let hh = h % 12; if (hh === 0) hh = 12;
  return `${String(hh).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ampm}`;
}

export function uid(prefix = 'e') {
  return prefix + (Math.random().toString(36).slice(2, 8)) + (Date.now() % 10000).toString(36);
}

/* ---------- MinHeap for A* ---------- */
class Heap {
  constructor() { this.items = []; this.pri = []; }
  get size() { return this.items.length; }
  push(item, p) {
    const a = this.items, b = this.pri;
    a.push(item); b.push(p);
    let i = a.length - 1;
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (b[parent] <= b[i]) break;
      [a[parent], a[i]] = [a[i], a[parent]];
      [b[parent], b[i]] = [b[i], b[parent]];
      i = parent;
    }
  }
  pop() {
    const a = this.items, b = this.pri;
    const top = a[0];
    const lastI = a.pop(), lastP = b.pop();
    if (a.length) {
      a[0] = lastI; b[0] = lastP;
      let i = 0;
      for (;;) {
        const l = i * 2 + 1, r = l + 1;
        let m = i;
        if (l < a.length && b[l] < b[m]) m = l;
        if (r < a.length && b[r] < b[m]) m = r;
        if (m === i) break;
        [a[m], a[i]] = [a[i], a[m]];
        [b[m], b[i]] = [b[i], b[m]];
        i = m;
      }
    }
    return top;
  }
}

const DIRS = [
  [1, 0, 1], [-1, 0, 1], [0, 1, 1], [0, -1, 1],
  [1, 1, 1.4142], [1, -1, 1.4142], [-1, 1, 1.4142], [-1, -1, 1.4142],
];

function octile(a, b, c, d) {
  const dx = Math.abs(a - c), dy = Math.abs(b - d);
  return (dx + dy) + (1.4142 - 2) * Math.min(dx, dy);
}

/**
 * A* pathfinding on the world grid. Returns array of {x,y} (excluding start)
 * or null when no route exists.
 */
export function findPath(world, sx, sy, tx, ty, opts = {}) {
  const { maxNodes = 12000, adjacent = false } = opts;
  const W = world.w, H = world.h;
  sx |= 0; sy |= 0; tx |= 0; ty |= 0;
  if (!world.inBounds(tx, ty)) return null;
  if (!world.inBounds(sx, sy)) return null;
  if (sx === tx && sy === ty) return [];
  const targetWalkable = world.walkable(tx, ty);
  const needAdjacent = adjacent || !targetWalkable;
  const startIdx = sy * W + sx;
  const targetIdx = ty * W + tx;

  const g = new Float32Array(W * H).fill(Infinity);
  const came = new Int32Array(W * H).fill(-1);
  const closed = new Uint8Array(W * H);
  const open = new Heap();
  g[startIdx] = 0;
  open.push(startIdx, octile(sx, sy, tx, ty));
  let nodes = 0;
  let best = startIdx;
  let bestH = octile(sx, sy, tx, ty);
  let found = false;

  while (open.size) {
    const cur = open.pop();
    if (closed[cur]) continue;
    closed[cur] = 1;
    if (++nodes > maxNodes) break;
    const cx = cur % W, cy = (cur / W) | 0;

    if (needAdjacent) {
      if (Math.abs(cx - tx) <= 1 && Math.abs(cy - ty) <= 1 && !(cx === sx && cy === sy) && world.walkable(cx, cy)) {
        best = cur; found = true; break;
      }
      if (cur === targetIdx) { best = cur; found = true; break; }
    } else if (cur === targetIdx) { best = cur; found = true; break; }

    const h = octile(cx, cy, tx, ty);
    if (h < bestH) { bestH = h; best = cur; }

    for (let d = 0; d < 8; d++) {
      const [dx, dy, dc] = DIRS[d];
      const nx = cx + dx, ny = cy + dy;
      if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
      if (!world.walkable(nx, ny)) continue;
      if (d >= 4 && (!world.walkable(cx + dx, cy) || !world.walkable(cx, cy + dy))) continue;
      const ni = ny * W + nx;
      if (closed[ni]) continue;
      const step = dc * world.moveCost(nx, ny);
      const ng = g[cur] + step;
      if (ng < g[ni]) {
        g[ni] = ng;
        came[ni] = cur;
        open.push(ni, ng + octile(nx, ny, tx, ty));
      }
    }
  }

  let end = found ? best : -1;
  if (end < 0 && needAdjacent) {
    // fall back to closest reached walkable tile if it is adjacent to target
    if (Math.abs((best % W) - tx) <= 1 && Math.abs(((best / W) | 0) - ty) <= 1) end = best;
  }
  if (end < 0) return null;

  const out = [];
  let cur = end;
  let guard = 0;
  while (cur !== startIdx && cur >= 0 && guard++ < 20000) {
    out.push({ x: cur % W, y: (cur / W) | 0 });
    cur = came[cur];
  }
  if (!out.length) return [];
  out.reverse();
  return smoothPath(world, out, sx, sy);
}

function lineWalkable(world, x0, y0, x1, y1) {
  const steps = Math.ceil(Math.hypot(x1 - x0, y1 - y0) * 3);
  for (let i = 1; i < steps; i++) {
    const t = i / steps;
    const x = Math.round(x0 + (x1 - x0) * t);
    const y = Math.round(y0 + (y1 - y0) * t);
    if (!world.walkable(x, y)) return false;
  }
  return true;
}

function smoothPath(world, path, sx, sy) {
  if (path.length < 3) return path;
  const out = [];
  let cx = sx, cy = sy, i = 0;
  while (i < path.length) {
    let far = i;
    for (let j = path.length - 1; j > i; j--) {
      if (lineWalkable(world, cx, cy, path[j].x, path[j].y)) { far = j; break; }
    }
    const p = path[far];
    out.push(p);
    cx = p.x; cy = p.y;
    i = far + 1;
    if (out.length > 400) break;
  }
  return out;
}

export function lineClear(world, x0, y0, x1, y1) {
  const d = Math.hypot(x1 - x0, y1 - y0);
  const steps = Math.max(2, Math.ceil(d * 3));
  for (let i = 1; i < steps; i++) {
    const t = i / steps;
    const x = Math.round(x0 + (x1 - x0) * t);
    const y = Math.round(y0 + (y1 - y0) * t);
    if (!world.inBounds(x, y)) return false;
    if (world.terrain[y * world.w + x] === 4 || world.terrain[y * world.w + x] === 5) return false;
    const o = world.objs.get(key(x, y));
    if (o && (o.kind === 'wall' || o.kind === 'tree' || o.kind === 'rock')) return false;
  }
  return true;
}

export function nearestWalkable(world, x, y, maxR = 12) {
  if (world.walkable(x, y)) return { x, y };
  for (let r = 1; r <= maxR; r++) {
    for (let dy = -r; dy <= r; dy++) {
      for (let dx = -r; dx <= r; dx++) {
        if (Math.max(Math.abs(dx), Math.abs(dy)) !== r) continue;
        const nx = x + dx, ny = y + dy;
        if (world.walkable(nx, ny)) return { x: nx, y: ny };
      }
    }
  }
  return null;
}

export function pointInRect(px, py, r) {
  return px >= r.x && py >= r.y && px < r.x + r.w && py < r.y + r.h;
}
