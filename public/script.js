async function roll() {
  const res = await fetch('/roll', { method: 'POST' });
  const item = await res.json();
  showResult(item);
  loadInventory();
}

document.getElementById('roll-btn').addEventListener('click', roll);

function showResult(item) {
  const div = document.getElementById('result');
  div.innerHTML = `<div class="card"><img src="${item.image}"><p>${item.name}</p></div>`;
}

async function loadInventory() {
  const res = await fetch('/inventory');
  const inv = await res.json();
  const container = document.getElementById('inventory');
  container.innerHTML = '';
  inv.forEach(i => {
    const c = document.createElement('div');
    c.className = 'card';
    c.innerHTML = `<img src="${i.image}"><p>${i.name}</p>`;
    container.appendChild(c);
  });
}

loadInventory();
