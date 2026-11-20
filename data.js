// ---------- Static game data ----------
const ELEMENTS = {
  fire:   { name: 'Fire',   color: '#ff6a2a', tex: 'basalt',  beats: ['nature', 'shadow'], basic: 'Cinder Breath', special: 'Inferno Wake' },
  water:  { name: 'Water',  color: '#5fd4f0', tex: 'water',   beats: ['fire', 'earth'],    basic: 'Riptide',       special: 'Drowning Deep' },
  nature: { name: 'Nature', color: '#a6e05a', tex: 'moss',    beats: ['water', 'storm'],   basic: 'Thornlash',     special: 'Root Snare' },
  earth:  { name: 'Earth',  color: '#d8a868', tex: 'pebbles', beats: ['storm', 'fire'],    basic: 'Rockfall',      special: 'Fault Line' },
  storm:  { name: 'Storm',  color: '#9fc4ff', tex: 'granite', beats: ['water', 'shadow'],  basic: 'Static Lash',   special: 'Chain Lightning' },
  shadow: { name: 'Shadow', color: '#b48cff', tex: 'ironwood', beats: ['nature', 'earth'], basic: 'Umbral Rend',   special: 'Starless Night' },
};
const EL_KEYS = Object.keys(ELEMENTS);

const RARITY = {
  common: { name: 'Common', mult: 1,   gold: 6,  breed: 20, hatch: 15, color: '#c9c2b4' },
  rare:   { name: 'Rare',   mult: 1.3, gold: 12, breed: 60, hatch: 40, color: '#6fd0ff' },
  epic:   { name: 'Epic',   mult: 1.65, gold: 20, breed: 120, hatch: 80, color: '#c79bff' },
};

// c: [deep, main, belly, wing, glow, eye]
const SPECIES = {
  emberwhelp: { name: 'Emberwhelp', els: ['fire'], rarity: 'common', cost: 100, horn: 'swept', size: 1.0,
    c: ['#3a0a08', '#c4301c', '#e8873a', '#8f1a12', '#ff6a2a', '#ffcf4a'], lore: 'Sleeps curled on cooling lava. Wakes hungry.' },
  tidecaller: { name: 'Tidecaller', els: ['water'], rarity: 'common', cost: 200, horn: 'fin', size: 1.0,
    c: ['#06202e', '#2a7f9e', '#9fd3d6', '#1b5a78', '#6fe6ff', '#d8fbff'], lore: 'Hums to the river. The river hums back.' },
  mossback: { name: 'Mossback', els: ['nature'], rarity: 'common', cost: 200, horn: 'antler', size: 1.05,
    c: ['#1a2410', '#5d7a2c', '#b8a86a', '#3d5a22', '#9dff6a', '#f0ff9a'], lore: 'Lichen grows on its spine if it sits still long enough.' },
  cragmaw: { name: 'Cragmaw', els: ['earth'], rarity: 'common', cost: 300, horn: 'ram', size: 1.1,
    c: ['#2a221c', '#8a7458', '#c9b08a', '#5e4a38', '#ffb35a', '#ffe0a0'], lore: 'Chews granite for the minerals. Mostly for fun.' },
  stormwing: { name: 'Stormwing', els: ['storm'], rarity: 'rare', cost: 800, horn: 'swept', size: 1.05,
    c: ['#141a2e', '#5a6fa8', '#c8d4f0', '#3a4a80', '#9fd0ff', '#ffffff'], lore: 'Its wingbeats arrive a second after the thunder.' },
  duskveil: { name: 'Duskveil', els: ['shadow'], rarity: 'epic', cost: 1500, horn: 'crown', size: 1.05, starry: true,
    c: ['#08060e', '#3a2a5a', '#6a5a8a', '#24183e', '#b48cff', '#e8d8ff'], lore: 'Only seen against the night it carries on its wings.' },

  nightember: { name: 'Nightember', els: ['fire', 'shadow'], rarity: 'epic', horn: 'crown', size: 1.2, starry: true,
    c: ['#0a0406', '#9e1420', '#3a0c12', '#6a0a14', '#ff2a3a', '#ff4a4a'], lore: 'Does not breathe fire so much as paint the sky with it.' },
  steamscale: { name: 'Steamscale', els: ['fire', 'water'], rarity: 'rare', horn: 'fin', size: 1.05,
    c: ['#2a1a1e', '#c26a50', '#f0d0b0', '#4a7a8a', '#ffd0a0', '#fff0d0'], lore: 'Every breath leaves a little cloud.' },
  ashbloom: { name: 'Ashbloom', els: ['fire', 'nature'], rarity: 'rare', horn: 'antler', size: 1.05,
    c: ['#2a1408', '#a04a1a', '#d8c060', '#6a7a2a', '#ffa040', '#ffe070'], lore: 'Flowers open in the ash where it lands.' },
  magmaheart: { name: 'Magmaheart', els: ['fire', 'earth'], rarity: 'rare', horn: 'ram', size: 1.15,
    c: ['#1a100a', '#5a3a2a', '#ff7a2a', '#3a2418', '#ff5a10', '#ffd040'], lore: 'Its belly glows through cracks in its hide.' },
  thunderflare: { name: 'Thunderflare', els: ['fire', 'storm'], rarity: 'rare', horn: 'swept', size: 1.05,
    c: ['#2a0e10', '#d0502a', '#ffe08a', '#3a4aa0', '#ffe06a', '#ffffff'], lore: 'Lightning that remembered how to burn.' },
  fenwyrm: { name: 'Fenwyrm', els: ['water', 'nature'], rarity: 'rare', horn: 'fin', size: 1.0,
    c: ['#0e2018', '#3a8a6a', '#a0d0a0', '#2a6a5a', '#7affc0', '#e0fff0'], lore: 'Lives where the marsh forgets which way is down.' },
  tidestone: { name: 'Tidestone', els: ['water', 'earth'], rarity: 'rare', horn: 'ram', size: 1.1,
    c: ['#1a2228', '#6a8090', '#c0c8c0', '#3a5a6a', '#8ad8ff', '#e0f8ff'], lore: 'Smooth as a river pebble and twice as stubborn.' },
  squallfin: { name: 'Squallfin', els: ['water', 'storm'], rarity: 'rare', horn: 'fin', size: 1.0,
    c: ['#0a1428', '#3a70c0', '#d0e8ff', '#2a4a90', '#a0e0ff', '#ffffff'], lore: 'Rides the front edge of every gale.' },
  abyssal: { name: 'Abyssal', els: ['water', 'shadow'], rarity: 'epic', horn: 'crown', size: 1.15, starry: true,
    c: ['#02080e', '#0e3a50', '#2a5a6a', '#08202e', '#3affd0', '#9affea'], lore: 'Its lights are the last thing the deep sea sees.' },
  barkhide: { name: 'Barkhide', els: ['nature', 'earth'], rarity: 'rare', horn: 'antler', size: 1.15,
    c: ['#1e1a10', '#6a5a30', '#9aa060', '#4a4a24', '#c0ff70', '#f0ffb0'], lore: 'Counted by its rings, like an oak.' },
  galeleaf: { name: 'Galeleaf', els: ['nature', 'storm'], rarity: 'rare', horn: 'antler', size: 1.0,
    c: ['#14201a', '#5a9a7a', '#d0f0d0', '#4a8aa0', '#c0fff0', '#ffffff'], lore: 'Scatters seeds on the wind, a thousand miles at a time.' },
  gloomcap: { name: 'Gloomcap', els: ['nature', 'shadow'], rarity: 'epic', horn: 'antler', size: 1.05, starry: true,
    c: ['#0a0e0a', '#2a3a2a', '#4a5a4a', '#1a2a24', '#4affe0', '#aafff0'], lore: 'Glowing fungi bloom along its back after rain.' },
  quakehorn: { name: 'Quakehorn', els: ['earth', 'storm'], rarity: 'rare', horn: 'ram', size: 1.15,
    c: ['#1a1a20', '#6a6a80', '#c0b090', '#4a4a6a', '#ffd080', '#ffffff'], lore: 'When it stamps, the island rings.' },
  obsidian: { name: 'Obsidian Warden', els: ['earth', 'shadow'], rarity: 'epic', horn: 'crown', size: 1.2, starry: true,
    c: ['#050506', '#2a2830', '#5a4a60', '#18161e', '#ff8a4a', '#ffb070'], lore: 'Volcanic glass, sharpened over ten thousand years.' },
  voidbolt: { name: 'Voidbolt', els: ['storm', 'shadow'], rarity: 'epic', horn: 'swept', size: 1.05, starry: true,
    c: ['#06060e', '#2a2a6a', '#6a6aa0', '#14143a', '#c0a0ff', '#ffffff'], lore: 'A crack of light in a sky with no stars.' },
};

// hybrid lookup by sorted element pair
const HYBRID = {};
for (const [id, s] of Object.entries(SPECIES)) if (s.els.length === 2) HYBRID[[...s.els].sort().join('+')] = id;

const HABITAT_COST = { fire: 100, water: 150, nature: 150, earth: 250, storm: 600, shadow: 1200 };
const HABITAT_CAP = 2;
const HABITAT_GOLD_CAP = 800;
const MAX_LEVEL = 10;
const FEEDS_PER_LEVEL = 4;
const BREED_MIN_LEVEL = 4;
const FARM_COST = 200;
const MAX_FARMS = 4;
const MAX_HABITATS = 8;

const CROPS = [
  { id: 'emberberry', name: 'Emberberry', cost: 10,  food: 25,  time: 15,  color: '#ff5a3a' },
  { id: 'sunroot',    name: 'Sunroot',    cost: 60,  food: 140, time: 60,  color: '#ffc040' },
  { id: 'starbloom',  name: 'Starbloom',  cost: 300, food: 800, time: 240, color: '#b0a0ff' },
];

const ARENA = [
  { name: 'Rookie Pell',       sp: 'mossback',   lv: 1 },
  { name: 'Hollow Brann',      sp: 'tidecaller', lv: 2 },
  { name: 'Ash-Sister Wren',   sp: 'emberwhelp', lv: 3 },
  { name: 'Quarryman Oddo',    sp: 'cragmaw',    lv: 4 },
  { name: 'Skyward Lethe',     sp: 'stormwing',  lv: 5 },
  { name: 'Marsh Keeper Ilse', sp: 'fenwyrm',    lv: 6 },
  { name: 'The Furnace Abbot', sp: 'magmaheart', lv: 7 },
  { name: 'Veil-Walker Soren', sp: 'duskveil',   lv: 8 },
  { name: 'Deepwatch Maren',   sp: 'abyssal',    lv: 9 },
  { name: 'Embersong',         sp: 'nightember', lv: 10 },
];

const QUESTS = [
  { id: 'collect', text: 'Collect gold from a habitat', reward: { gold: 50 } },
  { id: 'plant',   text: 'Plant a crop on your farm', reward: { food: 30 } },
  { id: 'feed',    text: 'Feed a dragon', reward: { gold: 60 } },
  { id: 'habitat', text: 'Build a second habitat', reward: { food: 80 } },
  { id: 'buy',     text: 'Buy a new dragon egg', reward: { gold: 150 } },
  { id: 'lv4',     text: `Raise a dragon to level ${BREED_MIN_LEVEL}`, reward: { gold: 200 } },
  { id: 'battle',  text: 'Win a battle in the Arena', reward: { food: 200 } },
  { id: 'breed',   text: 'Hatch a dragon from breeding', reward: { gold: 400 } },
  { id: 'hybrid',  text: 'Hatch a hybrid dragon', reward: { gold: 600 } },
  { id: 'epic',    text: 'Own an Epic dragon', reward: { gold: 1500 } },
];

// fixed slots on the island (world coords, island is 1600 x 1000)
const HAB_SLOTS = [
  [560, 430], [800, 400], [1040, 430], [430, 560], [690, 560], [940, 560], [1180, 560], [820, 700],
];
const FARM_SLOTS = [[1240, 410], [1330, 470], [1360, 560], [1280, 640]];
const HATCHERY_POS = [330, 440];
const ARENA_POS = [560, 700];
const BREEDING_POS = [1080, 700];

function dragonStats(d) {
  const s = SPECIES[d.sp], m = RARITY[s.rarity].mult;
  return {
    hp: Math.round((60 + d.lv * 28) * m),
    atk: Math.round((10 + d.lv * 4.2) * m),
    rate: RARITY[s.rarity].gold * d.lv, // gold per minute
  };
}
function elMult(atkEl, defEls) {
  let m = 1;
  for (const e of defEls) {
    if (ELEMENTS[atkEl].beats.includes(e)) m *= 1.5;
    else if (ELEMENTS[e].beats.includes(atkEl)) m *= 0.75;
  }
  return m;
}
function feedCost(d) { return 8 * d.lv; }
