/* Entry point for game! */

import "@styles/index.css"; //import root css
import Phaser, { Types as PhaserTypes } from "phaser"; // Import Phaser and types
import { SceneKeys } from "@scripts/game/scenes/sceneConstants";
import { sceneList } from "@scripts/game/scenes/sceneConstants";
import { GAME_DIMENSIONS } from "@scripts/game/gameConstants";

const config: PhaserTypes.Core.GameConfig = {
  width: "100%",
  height: "100%",
  banner: false,
  type: Phaser.CANVAS,
  pixelArt: false,
  backgroundColor: "#452c63",
  scale: {
    parent: "game-container",
    width: GAME_DIMENSIONS.width,
    height: GAME_DIMENSIONS.height,
    mode: Phaser.Scale.FIT, // fit the canvas to the container
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

const game = new Phaser.Game(config);

// add scene classes to game
sceneList.map((sceneListItem) =>
  game.scene.add(sceneListItem.key, sceneListItem.scene)
);

// start the scene (via Scene Manager)
game.scene.start(SceneKeys.PRELOAD_SCENE);
