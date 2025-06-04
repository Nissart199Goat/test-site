# Gacha Collection Game

This is a simple web application demonstrating a gacha style roll system.

## Setup

Install dependencies and run the server:

```bash
npm install
node server.js
```

The server serves static files from `public/` and provides these endpoints:
- `POST /roll` : performs a roll and returns the item obtained.
- `GET /inventory` : returns the list of obtained items.
- `GET /items` : list of all possible items.

Inventory and items are stored in JSON files under `data/`.
