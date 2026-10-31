// Static game data: terrain, structures, items, research, traits, names, weapons.

export const TILE = 32;
export const MAP_W = 64;
export const MAP_H = 64;
export const HOURS_PER_SEC = 24 / 180; // one in-game day is three minutes at 1x speed
export const START_HOUR = 8.25;
export const COLONY_NAME = 'Emberfield';

export const TERRAIN = {
  grass: { id: 0, name: 'Grass', base: '#5c7942', alt: '#668547', walk: true, fertility: 1, beauty: 0, rank: 1 },
  dirt: { id: 1, name: 'Dirt', base: '#776447', alt: '#806c4d', walk: true, fertility: 1.1, beauty: -1, rank: 3 },
  gravel: { id: 2, name: 'Gravel', base: '#6d685e', alt: '#777268', walk: true, fertility: 0.1, beauty: -2, rank: 2.5 },
  sand: { id: 3, name: 'Sand', base: '#b5a071', alt: '#beaa7c', walk: true, fertility: 0.3, beauty: 0, rank: 4 },
  water: { id: 4, name: 'Water', base: '#355d66', alt: '#3d6872', walk: false, fertility: 0, beauty: 4, rank: 6 },
  soil: { id: 5, name: 'Rich soil', base: '#5c4931', alt: '#665237', walk: true, fertility: 1.3, beauty: -1, rank: 3.4 },
  woodfloor: { id: 6, name: 'Wood floor', base: '#6f4f31', alt: '#7b5837', walk: true, fertility: 0, beauty: 2, rank: 8 },
  stonefloor: { id: 7, name: 'Stone tile', base: '#726d65', alt: '#7b766d', walk: true, fertility: 0, beauty: 2, rank: 8 },
  marsh: { id: 8, name: 'Marsh', base: '#4f6244', alt: '#566b49', walk: true, fertility: 0.6, beauty: -2, rank: 5 },
};
export const TERRAIN_LIST = Object.values(TERRAIN);
export const TERRAIN_BY_ID = [];
for (const t of TERRAIN_LIST) TERRAIN_BY_ID[t.id] = t;
export const T = Object.fromEntries(TERRAIN_LIST.map((t) => [t.name.split(' ')[0].toLowerCase().replace('rich', 'soil'), t.id]));
T.grass = 0; T.dirt = 1; T.gravel = 2; T.sand = 3; T.water = 4; T.soil = 5; T.woodfloor = 6; T.stonefloor = 7; T.marsh = 8;

export const BUILD_CATS = [
  { id: 'orders', name: 'Orders', icon: 'orders', hint: 'Mark work for your colonists' },
  { id: 'structure', name: 'Structure', icon: 'structure', hint: 'Walls, doors and floors' },
  { id: 'furniture', name: 'Furniture', icon: 'furniture', hint: 'Beds, tables and comfort' },
  { id: 'production', name: 'Production', icon: 'production', hint: 'Cooking and research' },
  { id: 'power', name: 'Power', icon: 'power', hint: 'Generate and store electricity' },
  { id: 'security', name: 'Security', icon: 'security', hint: 'Defend the colony' },
  { id: 'zones', name: 'Zones', icon: 'zones', hint: 'Stockpiles and growing areas' },
];

export const BUILDINGS = {
  wall: {
    name: 'Wood wall', cat: 'structure', w: 1, h: 1, hp: 160, work: 1.7, cost: { wood: 5 }, blocks: true,
    desc: 'Rough-hewn timber. Keeps out weather, animals and most raiders.',
  },
  stonewall: {
    name: 'Stone wall', cat: 'structure', w: 1, h: 1, hp: 340, work: 3.0, cost: { stone: 6 }, blocks: true, tech: 'masonry',
    desc: 'Blocks cut from local rock. Fireproof and very durable.',
  },
  door: {
    name: 'Wooden door', cat: 'structure', w: 1, h: 1, hp: 140, work: 1.3, cost: { wood: 4 }, blocks: false, door: true,
    desc: 'A simple hinged door. Colonists pass through; raiders must break it down.',
  },
  floor: {
    name: 'Wood floor', cat: 'structure', w: 1, h: 1, hp: 40, work: 0.65, cost: { wood: 1 }, blocks: false, floor: true,
    desc: 'Smooth boards that make a room warmer, cleaner and more beautiful.',
  },
  stonefloor: {
    name: 'Stone tile', cat: 'structure', w: 1, h: 1, hp: 60, work: 0.8, cost: { stone: 1 }, blocks: false, floor: true, tech: 'masonry',
    desc: 'Cut stone tiles. Cool underfoot and nearly indestructible.',
  },
  sandbag: {
    name: 'Sandbags', cat: 'security', w: 1, h: 1, hp: 100, work: 0.9, cost: { stone: 2 }, blocks: false, cover: 0.55,
    desc: 'A low wall of packed sand. Colonists behind it are harder to hit.',
  },
  bed: {
    name: 'Bed', cat: 'furniture', w: 1, h: 2, hp: 90, work: 2.1, cost: { wood: 7 }, blocks: false, bed: true,
    desc: 'A comfortable place to sleep. Rest quality is far better than the ground.',
  },
  table: {
    name: 'Table', cat: 'furniture', w: 2, h: 1, hp: 80, work: 1.8, cost: { wood: 8 }, blocks: true, table: true,
    desc: 'Colonists prefer to eat at a table. Eating on the ground costs mood.',
  },
  chair: {
    name: 'Chair', cat: 'furniture', w: 1, h: 1, hp: 50, work: 1.0, cost: { wood: 3 }, blocks: false, seat: true,
    desc: 'A simple chair. Pairs with a table for a proper meal.',
  },
  lamp: {
    name: 'Standing lamp', cat: 'furniture', w: 1, h: 1, hp: 40, work: 1.0, cost: { steel: 5 }, blocks: false, light: 6.5, powered: true,
    desc: 'A warm electric lamp. Lights up the night and brightens a room.',
  },
  campfire: {
    name: 'Campfire', cat: 'furniture', w: 1, h: 1, hp: 40, work: 1.0, cost: { wood: 5 }, blocks: false, light: 8, fire: true,
    desc: 'Crackling flames. Keeps the dark at bay and warms nearby colonists.',
  },
  sculpture: {
    name: 'Wood sculpture', cat: 'furniture', w: 1, h: 1, hp: 60, work: 3.4, cost: { wood: 14 }, blocks: true, beauty: 8,
    desc: 'A hand-carved sculpture. Raises the beauty of its surroundings.',
  },
  stove: {
    name: 'Fueled stove', cat: 'production', w: 1, h: 2, hp: 130, work: 2.5, cost: { steel: 10, stone: 5 }, blocks: true, stove: true,
    desc: 'Turns raw food into proper meals. A full belly is a happy colonist.',
  },
  bench: {
    name: 'Research bench', cat: 'production', w: 2, h: 1, hp: 100, work: 2.4, cost: { wood: 10, steel: 5 }, blocks: true, research: true,
    desc: 'A cluttered bench of notes and instruments. Unlocks new technology.',
  },
  solar: {
    name: 'Solar panel', cat: 'power', w: 2, h: 2, hp: 110, work: 2.8, cost: { steel: 12, wood: 2 }, blocks: true, solar: true,
    desc: 'Generates electricity from sunlight. Produces nothing after dark.',
  },
  battery: {
    name: 'Battery', cat: 'power', w: 1, h: 2, hp: 90, work: 2.1, cost: { steel: 8, stone: 3 }, blocks: true, battery: true,
    desc: 'Stores surplus power for lamps and turrets through the night.',
  },
  turret: {
    name: 'Gun turret', cat: 'security', w: 1, h: 1, hp: 180, work: 3.2, cost: { steel: 15, stone: 6 }, blocks: true, turret: true, tech: 'gunsmithing',
    desc: 'An automated machine gun. Shreds raiders that wander into range.',
  },
};

export const ITEMS = {
  wood: { name: 'Wood', color: '#9a7444', unit: 'log', value: 1.2 },
  stone: { name: 'Stone', color: '#8b877e', unit: 'chunk', value: 1 },
  steel: { name: 'Steel', color: '#93a0a6', unit: 'bar', value: 3 },
  grain: { name: 'Grain', color: '#cbb56a', unit: 'sack', value: 1.1, food: 18 },
  meat: { name: 'Meat', color: '#b96a62', unit: 'cut', value: 1.6, food: 24 },
  meal: { name: 'Meal', color: '#d9a96b', unit: 'meal', value: 3.2, food: 55 },
  silver: { name: 'Silver', color: '#c9ccd2', unit: 'coin', value: 1 },
};
export const RES_ORDER = ['wood', 'stone', 'steel', 'food', 'silver'];

export const TECH = {
  masonry: {
    name: 'Stonecutting', cost: 170, col: 1, row: 0, desc: 'Cut stone into blocks for fireproof walls and floors.',
    unlocks: ['stonewall', 'stonefloor'], icon: 'masonry',
  },
  agriculture: {
    name: 'Agriculture', cost: 210, col: 2, row: 0, desc: 'Better seed stock and crop rotation. +30% harvest yield.',
    icon: 'plants',
  },
  gunsmithing: {
    name: 'Gunsmithing', cost: 280, col: 2, row: 1, desc: 'Precision barrels and actions. Unlocks the gun turret and +20% firearm damage.',
    unlocks: ['turret'], icon: 'security',
  },
  medicine: {
    name: 'Medicine', cost: 250, col: 1, row: 1, desc: 'Field surgery and clean bandages. Doctors tend 60% faster and heal more.',
    icon: 'medicine',
  },
};

export const WORK_TYPES = [
  { id: 'doctor', name: 'Doctor', icon: 'medicine', color: '#d98b8b' },
  { id: 'construction', name: 'Construct', icon: 'hammer', color: '#d9b26a' },
  { id: 'mining', name: 'Mine', icon: 'mine', color: '#a9b0b6' },
  { id: 'plants', name: 'Plants', icon: 'plants', color: '#8fbd6a' },
  { id: 'cooking', name: 'Cook', icon: 'pot', color: '#e0955f' },
  { id: 'hauling', name: 'Haul', icon: 'haul', color: '#c9b183' },
  { id: 'research', name: 'Research', icon: 'research', color: '#8fb8d9' },
];

export const WEAPONS = {
  rifle: { name: 'Assault rifle', ranged: true, range: 9.5, dmg: 9, cooldown: 1.15, acc: 0.62, burst: 3, kind: 'rifle' },
  pistol: { name: 'Autopistol', ranged: true, range: 6.8, dmg: 6, cooldown: 0.85, acc: 0.7, burst: 1, kind: 'pistol' },
  shotgun: { name: 'Pump shotgun', ranged: true, range: 5.2, dmg: 16, cooldown: 1.9, acc: 0.86, burst: 1, kind: 'shotgun' },
  knife: { name: 'Combat knife', ranged: false, range: 1.35, dmg: 11, cooldown: 0.95, acc: 0.9, kind: 'knife' },
  club: { name: 'Wooden club', ranged: false, range: 1.3, dmg: 8, cooldown: 1.2, acc: 0.85, kind: 'club' },
};

export const TRAITS = [
  { id: 'industrious', name: 'Industrious', tone: 'good', text: '+15% work speed' },
  { id: 'lazy', name: 'Lazy', tone: 'bad', text: '-12% work speed' },
  { id: 'optimist', name: 'Optimist', tone: 'good', text: '+8 mood' },
  { id: 'pessimist', name: 'Pessimist', tone: 'bad', text: '-8 mood' },
  { id: 'fastlearner', name: 'Fast learner', tone: 'good', text: '+25% research speed' },
  { id: 'quicksleep', name: 'Quick sleeper', tone: 'good', text: 'Needs less sleep' },
  { id: 'nightowl', name: 'Night owl', tone: 'good', text: 'Happier working at night' },
  { id: 'brawler', name: 'Brawler', tone: 'good', text: '+20% melee damage, dislikes guns' },
  { id: 'trigger', name: 'Trigger-happy', tone: 'mixed', text: '+1 shooting, less accurate' },
  { id: 'gourmand', name: 'Gourmand', tone: 'mixed', text: 'Eats more, loves good meals' },
  { id: 'ascetic', name: 'Ascetic', tone: 'good', text: 'Unaffected by poor surroundings' },
  { id: 'kind', name: 'Kind', tone: 'good', text: 'Improves colony mood' },
];

export const SKILLS = ['shooting', 'melee', 'construction', 'mining', 'cooking', 'plants', 'research', 'medicine', 'crafting'];

export const FIRST_NAMES = ['Aria', 'Bram', 'Cleo', 'Dax', 'Elin', 'Finn', 'Greta', 'Hale', 'Iris', 'Jory', 'Kira', 'Lenn', 'Mira', 'Niko', 'Orla', 'Pax', 'Quinn', 'Rhea', 'Sol', 'Tamsin', 'Ulla', 'Vex', 'Wren', 'Yara', 'Zane', 'Ash', 'Bex', 'Cass', 'Dune', 'Esk', 'Fable', 'Gale', 'Hollis', 'Ines', 'Juno', 'Kit', 'Lark', 'Moss', 'Nell', 'Oak', 'Piper', 'Rook', 'Sage', 'Teal', 'Vale', 'Willa'];
export const NICKNAMES = ['the Quiet', 'Six-Toes', 'Sparks', 'Half-Ear', 'the Baker', 'Two-Guns', 'Cinder', 'Brightwater', 'the Owl', 'Hearth', 'Thistle', 'the Fox', 'Ember', 'Rain', 'Stone', 'the Mouse', 'Rust', 'Maple', 'Frost', 'Pebble'];
export const BACKSTORIES = [
  'Vatgrown soldier', 'Colony farmer', 'Space miner', 'Orphaned drifter', 'Street medic', 'Frontier cook',
  'Urban burglar', 'Naval engineer', 'Wandering trader', 'Settlement blacksmith', 'Lab assistant', 'Mercenary scout',
  'Beast handler', 'Ships cook', 'Glitterworld janitor', 'Mining foreman', 'Medical student', 'Pyromaniac chef',
  'Mountain guide', 'Desert herder', 'Ritual woodcarver', 'Salvage diver', 'Ranch hand', 'Tunnel rat',
];

export const SKIN_TONES = ['#f0c7a8', '#e3b090', '#d29a74', '#b97d58', '#95603f', '#70452e', '#4f3022'];
export const HAIR_COLORS = ['#2b211c', '#3d2b20', '#5a3a26', '#7a4a2a', '#a2652f', '#c2893f', '#d9b26a', '#e8dfcb', '#8a8f96', '#b04a3a'];
export const SHIRT_COLORS = ['#7d8c62', '#9b6a4d', '#5a7d85', '#8a5a6b', '#b08a4f', '#6a6f8e', '#8d8d7a', '#4e6e58', '#a05a48', '#6b5d7a', '#b7a37a', '#4f6b7a'];
export const PANTS_COLORS = ['#3f4a52', '#4a4136', '#3c4552', '#564a3a', '#2f3a3f', '#4d3d33'];

export const HAIR_STYLES = ['short', 'long', 'bun', 'bald', 'mohawk', 'curly', 'braids', 'ponytail', 'hood', 'cap'];

export const ANIMAL_DEFS = {
  muffalo: {
    name: 'Muffalo', w: 1.5, h: 1.2, hp: 180, speed: 0.75, meat: 70, fur: '#8a7c6a', furAlt: '#6f6355',
    desc: 'A shaggy herd animal. Slow, hardy, and delicious.',
  },
  chicken: {
    name: 'Chicken', w: 0.5, h: 0.45, hp: 22, speed: 0.9, meat: 12, fur: '#e8dfc8', furAlt: '#d1c3a4',
    desc: 'A plump farm bird. Too small to be dangerous.',
  },
  hare: {
    name: 'Hare', w: 0.55, h: 0.5, hp: 18, speed: 1.35, meat: 9, fur: '#a08e75', furAlt: '#86745c',
    desc: 'A nervous wild hare. Quick, but not quick enough.',
  },
};

export const RAIDERS = [
  { name: 'Pirate', shirt: '#6b3f3a', pants: '#33322f', skin: '#b97d58', mask: true },
  { name: 'Marauder', shirt: '#5a4a3c', pants: '#2f2d29', skin: '#95603f', mask: false },
  { name: 'Scavenger', shirt: '#455049', pants: '#333b36', skin: '#d29a74', mask: true },
];

export const SEASONS = ['Aprimay', 'Jugust', 'Septober', 'Decembary'];
export const MONTHS = ['Aprimay', 'Jugust', 'Septober', 'Decembary'];

export const CATEGORY_ORDER = BUILD_CATS.map((c) => c.id);

export function buildingList(cat) {
  return Object.entries(BUILDINGS).filter(([, d]) => d.cat === cat);
}

export const NOTICE_COLORS = { info: '#8fb8d9', good: '#8fbd6a', bad: '#d98b7a', raid: '#d25c4a', tech: '#d9b26a' };
