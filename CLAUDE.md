# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static, no-build todo app. Three top-level files — `index.html`, `style.css`, `app.js` — loaded directly by the browser. No package manager, no bundler, no test runner, no lint config. Do not introduce build tooling unless the user explicitly asks.


## Architecture

- `index.html` — single-page markup. Loads `style.css` and `app.js` (plain `<script>`, no module type). DOM IDs (`todo-form`, `todo-input`, `todo-list`, `count`, `clear-completed`) are the contract that `app.js` reads against.



## Conventions

- Bumping the persisted state shape is a breaking change for existing users; if the shape changes, also bump the `STORAGE_KEY` (currently `todos.v1`) so old/new data don't collide.
- IDs are generated client-side with `Date.now()` + random suffix — they're not cryptographic, just unique enough for a single client.

## Documentation RUles
read css/claude.md for any documentation related stuff.


