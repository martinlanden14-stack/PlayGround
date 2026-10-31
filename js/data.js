/* OUTLAND — game data definitions */

export const BUILDINGS = {
  wood_wall: {
    id: 'wood_wall', name: 'Timber Wall', cat: 'struct', icon: 'i-wall',
    desc: 'A sturdy timber wall. Blocks movement and gunfire.',
    cost: { wood: 4 }, hp: 160, blocking: true, buildTime: 3.2,
  },
  stone_wall: {
    id: 'stone_wall', name: 'Stone Wall', cat: 'struct', icon: 'i-wall',
    desc: 'Heavy stone masonry. Twice as tough as timber.',
    cost: { stone: 5 }, hp: 380, blocking: true, buildTime: 4.6,
  },
  door: {
    id: 'door', name: 'Door', cat: 'struct', icon: 'i-door',
    desc: 'A swinging timber door. Colonists pass freely.',
    cost: { wood: 6 }, hp: 140, blocking: false, door: true, buildTime: 3.4,
  },
  torch: {
    id: 'torch', name: 'Torch Post', cat: 'struct', icon: 'i-torch',
    desc: 'Burns steadily, lighting the night around it.',
    cost: { wood: 3 }, hp: 30, blocking: true, light: 5.2, buildTime: 1.6,
  },
  stone_floor: {
    id: 'stone_floor', name: 'Stone Floor', cat: 'struct', icon: 'i-floor',
    desc: 'Clean flagstones. Slightly faster to walk on.',
    cost: { stone: 1 }, floor: true, buildTime: 1.1,
  },
  wood_floor: {
    id: 'wood_floor', name: 'Wood Floor', cat: 'struct', icon: 'i-floor',
    desc: 'Warm timber boards underfoot.',
    cost: { wood: 1 }, floor: true, buildTime: 1.1,
  },
  bed: {
    id: 'bed', name: 'Bed', cat: 'comfort', icon: 'i-bed',
    desc: 'A place to rest. Sleep restores colonists far faster than the ground.',
    cost: { wood: 12 }, hp: 70, blocking: false, bed: true, buildTime: 3.8,
  },
  campfire: {
    id: 'campfire', name: 'Campfire', cat: 'comfort', icon: 'i-fire',
    desc: 'Warm light, a cooking station and the heart of the colony.',
    cost: { wood: 8, stone: 4 }, hp: 60, blocking: true, light: 6.8, fire: true, buildTime: 3.6,
  },
  bench: {
    id: 'bench', name: 'Research Bench', cat: 'production', icon: 'i-bench',
    desc: 'Colonists study here to unlock new technology.',
    cost: { wood: 22, stone: 6 }, hp: 100, blocking: true, bench: true, buildTime: 5.4,
  },
  turret: {
    id: 'turret', name: 'Auto-Turret', cat: 'production', icon: 'i-turret',
    desc: 'Tracks and fires on hostile targets within range.',
    cost: { wood: 12, stone: 30 }, hp: 240, blocking: true, turret: true, light: 4.2, buildTime: 6.4,
  },
};

export const BUILD_CATS = [
  { id: 'struct', name: 'Walls & Floors' },
  { id: 'comfort', name: 'Comfort' },
  { id: 'production', name: 'Production' },
];

export const TECHS = [
  {
    id: 'agriculture', name: 'Agriculture', cost: 45, icon: 'i-food',
    desc: 'Crops grow 35% faster and harvests yield more food.',
  },
  {
    id: 'carpentry', name: 'Carpentry', cost: 55, icon: 'i-wood',
    desc: 'Timber structures gain 35% health; construction is 20% faster.',
  },
  {
    id: 'masonry', name: 'Masonry', cost: 70, icon: 'i-stone',
    desc: 'Stone structures gain 40% health and stone walls build faster.',
  },
  {
    id: 'gunsmithing', name: 'Gunsmithing', cost: 90, icon: 'i-target',
    desc: 'Turrets deal +40% damage and gain one tile of range.',
  },
  {
    id: 'medicine', name: 'Herbal Medicine', cost: 65, icon: 'i-heart',
    desc: 'Colonists recover from being downed twice as fast and gain 10 max health.',
  },
  {
    id: 'logistics', name: 'Logistics', cost: 50, icon: 'i-bolt',
    desc: 'Colonists carry more and move 12% faster.',
  },
];

export const SKILLS = [
  { id: 'work', name: 'Labor' },
  { id: 'mining', name: 'Mining' },
  { id: 'cooking', name: 'Cooking' },
  { id: 'farming', name: 'Farming' },
  { id: 'combat', name: 'Combat' },
  { id: 'research', name: 'Research' },
];

export const TRAITS = [
  { id: 'industrious', name: 'Industrious', desc: '+20% work speed', work: 1.2, mood: 0 },
  { id: 'optimist', name: 'Optimist', desc: '+8 mood', mood: 8 },
  { id: 'gloomy', name: 'Gloomy', desc: '-8 mood', mood: -8 },
  { id: 'nightowl', name: 'Night Owl', desc: 'Needs less sleep', rest: 0.75 },
  { id: 'quick', name: 'Fleet-Footed', desc: '+12% movement speed', speed: 1.12 },
  { id: 'tough', name: 'Tough', desc: '+15 max health', hp: 15 },
  { id: 'greenthumb', name: 'Green Thumb', desc: '+30% farming skill', farm: 1.3 },
  { id: 'sharpshooter', name: 'Sharpshooter', desc: '+30% combat skill', combat: 1.3 },
  { id: 'gourmet', name: 'Gourmet', desc: '+30% cooking skill', cook: 1.3 },
  { id: 'heavy', name: 'Heavy Sleeper', desc: 'Restores need slowly', rest: 1.18 },
  { id: 'brave', name: 'Brave', desc: 'Steady under fire', mood: 3, combat: 1.08 },
];

export const FIRST_NAMES = [
  'Ada', 'Bram', 'Cora', 'Dain', 'Elin', 'Falk', 'Gwen', 'Hale', 'Isla', 'Jory',
  'Kara', 'Lenn', 'Mira', 'Nils', 'Orla', 'Pell', 'Quin', 'Rhea', 'Soren', 'Tess',
  'Una', 'Vale', 'Wren', 'Yara', 'Zeke', 'Ansel', 'Briony', 'Cass', 'Dara', 'Ewan',
  'Faye', 'Galen', 'Hollis', 'Ines', 'Joss', 'Kael', 'Lark', 'Maeve', 'Nova', 'Osric',
];

export const LAST_NAMES = [
  'Ashford', 'Barrow', 'Crane', 'Dunmore', 'Ellery', 'Fenn', 'Grey', 'Harrow',
  'Ives', 'Jarrah', 'Kestrel', 'Lorne', 'Mercer', 'Nyle', 'Oakley', 'Pike',
  'Quarry', 'Rook', 'Stone', 'Thorne', 'Underwood', 'Vance', 'Wilde', 'Yarrow',
];

export const COLONY_NAMES = [
  'New Haven', 'Emberfall', 'Dawnreach', 'Willowmere', 'Stonewatch', 'Rustvale',
  'Northreach', 'Mossgate', 'Hollowford', 'Highmoor', 'Ashwick', 'Briarhold',
];

export const WEATHERS = {
  clear: { name: 'Clear', icon: 'i-sun' },
  overcast: { name: 'Overcast', icon: 'i-rain' },
  rain: { name: 'Rain', icon: 'i-rain' },
  drizzle: { name: 'Drizzle', icon: 'i-rain' },
};

export const SKILL_TITLES = ['Untrained', 'Novice', 'Apprentice', 'Adept', 'Skilled', 'Expert', 'Master'];

export function skillTitle(v) {
  return SKILL_TITLES[Math.min(SKILL_TITLES.length - 1, Math.floor(v / 2))];
}

export const HAIR_COLORS = ['#2b211b', '#4a3426', '#6d4a2f', '#96703f', '#c9a36b', '#3a3a3a', '#7d5b45', '#a9835a'];
export const SKIN_COLORS = ['#f0c9a5', '#e0b08a', '#c99268', '#a9714a', '#8a5736', '#67412d', '#e9bb98', '#b98055'];
export const SHIRT_COLORS = ['#6f8fa3', '#8a6a4e', '#7d8f5c', '#a0705c', '#5c6f7d', '#9b8352', '#6e6a8a', '#4f7a6a', '#a58a6a'];
export const PANTS_COLORS = ['#3f4853', '#4a3f35', '#3c4438', '#51414a', '#35434a', '#4b4436'];
export const BLANKET_COLORS = ['#8f5a54', '#5d7186', '#7c8a5e', '#8a7350', '#6e5d7a', '#577b74'];

export const ITEM_DEFS = {
  wood: { name: 'Wood', icon: 'i-wood', color: '#b9854e' },
  stone: { name: 'Stone', icon: 'i-stone', color: '#9ba3a7' },
  food: { name: 'Berries', icon: 'i-food', color: '#c8d47a' },
  meal: { name: 'Meal', icon: 'i-meal', color: '#e8b96d' },
};

export const JOB_LABELS = {
  idle: 'Idle', wander: 'Wandering', chop: 'Chopping wood', mine: 'Mining stone',
  build: 'Building', haul: 'Hauling', eat: 'Eating', sleep: 'Sleeping',
  cook: 'Cooking', research: 'Researching', farm: 'Farming', fight: 'Fighting',
  refuel: 'Refueling', move: 'Moving out', downed: 'Downed', dead: 'Dead',
  sow: 'Sowing', harvest: 'Harvesting', deconstruct: 'Deconstructing', guard: 'On guard',
};
