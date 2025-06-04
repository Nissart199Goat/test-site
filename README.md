# Gacha Collection Game

This is a simple web application demonstrating a gacha style roll system.

## Setup

Install dependencies and run the server:

```bash
npm install
node server.js
```

The server serves static files from `public/` and exposes these endpoints:
- `POST /roll` : performs a roll and returns the item obtained.
- `GET /items` : list of all possible items.

Inventory is stored locally in the browser via `localStorage`.

Available pages:

- `index.html` - home page
- `roll.html` - roll for new items
- `inventory.html` - view your inventory
- `collection.html` - see all possible items
- `profile.html` - set your nickname
