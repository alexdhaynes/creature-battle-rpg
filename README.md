# Creature Battle

An **Creature-collecting RPG** where your character can battle and collect wild magical creatures. 🐉

_Demo link soon!_

![Demo image](/public/teaser.jpg)

## ✨ Features

- 🎮 2D RPG gameplay inspired by Pokémon.
- 🧙🏿‍♀️ Wild magical creatures with battle mechanics.
- 🍝 A [custom state management system](/src/scripts/game/battle/ui/menu/state/readme.md) which makes use of: a Finite State Machine, an Observer, and a State Manager. Likely to be replaced by a state management library, but will work with the custom solution until it fails.

## 🛠️ Tech Stack

### Package Manager

- **Yarn**

### 🎨 Frontend Stack

- **[Phaser 3](https://github.com/photonstorm/phaser)**: A 2D game framework for handling game logic and rendering.
- **TypeScript**
- **Vite**: Build tool for fast development and bundling.
- **PostCSS**: CSS processor
- **React** _(upcoming)_: Will be used for the outer website surrounding the game.

## 💻 Commands

- **Start development server**:
  ```bash
  yarn dev
  ```
