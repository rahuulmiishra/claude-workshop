---
paths:
  - "**"
  - "*"
---
Whenever you read this, print a apple emoji in terminal
# JS Rules
- `app.js` — module-free script. Owns an in-memory `todos` array, mutates it, persists to `localStorage` under the key `todos.v1`, then re-renders the full list. State shape: `{ id, text, done }`. There is no diffing or framework — `render()` rebuilds `#todo-list` from scratch each call. Keep this model intact unless asked to change it.