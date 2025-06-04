async function initCollection() {
  const res = await fetch('/items');
  const items = await res.json();
  const ownedIds = new Set(JSON.parse(localStorage.getItem('inventory') || '[]').map(i=>i.id));
  const container = document.getElementById('collection');
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = `card ${item.rarity}`;
    if (!ownedIds.has(item.id)) card.style.filter = 'grayscale(100%)';
    card.innerHTML = `<img src="${item.image}"><p>${item.name}</p>`;
    container.appendChild(card);
  });
}

initCollection();
