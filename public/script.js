let items = [];
let animationInterval;
let rolling = false;

async function init() {
  const res = await fetch('/items');
  items = await res.json();
  loadInventory();
}

function playSound(id) {
  const audio = document.getElementById(id);
  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }
}

function startAnimation() {
  const container = document.getElementById('animation-container');
  let idx = 0;
  animationInterval = setInterval(() => {
    const item = items[idx % items.length];
    container.innerHTML = `<div class="card ${item.rarity}"><img src="${item.image}"><p>${item.name}</p></div>`;
    idx++;
  }, 100);
}

async function roll() {
  if (rolling) return;
  rolling = true;
  playSound('roll-sound');
  startAnimation();
  const res = await fetch('/roll', { method: 'POST' });
  const item = await res.json();
  setTimeout(() => {
    clearInterval(animationInterval);
    showResult(item);
    loadInventory();
    if (['epic','legendary','ultra-legendary'].includes(item.rarity)) {
      playSound('rare-sound');
    }
    rolling = false;
  }, 1500);
}

document.getElementById('roll-btn').addEventListener('click', roll);

function showResult(item) {
  const div = document.getElementById('result');
  div.innerHTML = `<div class="card ${item.rarity}"><img src="${item.image}"><p>${item.name}</p></div>`;
}

async function loadInventory() {
  const res = await fetch('/inventory');
  let inv = await res.json();
  const sort = document.getElementById('sort-menu').value;
  if (sort === 'name') {
    inv.sort((a,b)=>a.name.localeCompare(b.name));
  } else if (sort === 'rarity') {
    const order = ['common','rare','epic','legendary','ultra-legendary'];
    inv.sort((a,b)=>order.indexOf(a.rarity)-order.indexOf(b.rarity));
  } else if (sort === 'date') {
    inv.sort((a,b)=>b.obtainedAt-a.obtainedAt);
  }
  const container = document.getElementById('inventory');
  container.innerHTML = '';
  inv.forEach(i => {
    const c = document.createElement('div');
    c.className = `card ${i.rarity}`;
    c.innerHTML = `<img src="${i.image}"><p>${i.name}</p><span class="tooltip">${i.name} - ${i.rarity}<br>${i.description}</span>`;
    container.appendChild(c);
  });
  updateStats(inv);
}

document.getElementById('sort-menu').addEventListener('change', loadInventory);

function updateStats(inv) {
  const total = inv.length;
  const counts = {};
  inv.forEach(i=>{ counts[i.rarity]=(counts[i.rarity]||0)+1; });
  const uniqueIds = new Set(inv.map(i=>i.id));
  const pct = Math.round((uniqueIds.size/items.length)*100);
  const stats = document.getElementById('stats');
  let rarityText = Object.entries(counts).map(([r,c])=>`${c} ${r}`).join(', ');
  stats.innerHTML = `<p>Total rolls: ${total}</p><p>${rarityText}</p><div id="progress-container"><div id="progress-bar" style="width:${pct}%"></div></div><p>Collection: ${pct}%</p>`;
}

init();
