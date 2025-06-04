const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const itemsPath = path.join(__dirname, 'data', 'items.json');
const inventoryPath = path.join(__dirname, 'data', 'inventory.json');

function loadItems() {
  return JSON.parse(fs.readFileSync(itemsPath));
}

function loadInventory() {
  if (!fs.existsSync(inventoryPath)) return [];
  return JSON.parse(fs.readFileSync(inventoryPath));
}

function saveInventory(inv) {
  fs.writeFileSync(inventoryPath, JSON.stringify(inv, null, 2));
}

const rarityWeights = {
  'common': 60,
  'rare': 25,
  'epic': 10,
  'legendary': 4,
  'ultra-legendary': 1
};

function rollItem() {
  const items = loadItems();
  const totalWeight = Object.values(rarityWeights).reduce((a,b) => a+b,0);
  let rand = Math.random() * totalWeight;
  let rarity;
  for (const [r, w] of Object.entries(rarityWeights)) {
    if (rand < w) { rarity = r; break; }
    rand -= w;
  }
  const available = items.filter(i => i.rarity === rarity);
  const item = available[Math.floor(Math.random()*available.length)];
  return item;
}

app.get('/items', (req,res) => {
  res.json(loadItems());
});

app.get('/inventory', (req,res) => {
  res.json(loadInventory());
});

app.post('/roll', (req,res) => {
  const item = rollItem();
  const inv = loadInventory();
  inv.push({ ...item, obtainedAt: Date.now() });
  saveInventory(inv);
  res.json(item);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
