import "@styles/index.css" //import root css
import Phaser, {Types as PhaserTypes} from 'phaser'; // Import Phaser and types
import { SceneKeys } from "@game/scenes/scene-keys";
import { sceneList } from "./scenes/sceneData";

const config: PhaserTypes.Core.GameConfig = {
  width: "100%",
  height: "100%",
  banner: false,
  type: Phaser.CANVAS,
  pixelArt: false,
  backgroundColor: '#452c63',
  scale: {
    parent: 'game-container',
    width: 1024,
    height: 576,
    mode: Phaser.Scale.FIT, // fit the canvas to the container
    autoCenter: Phaser.Scale.CENTER_BOTH
 
  },
};

const game = new Phaser.Game(config);

// add scene classes to game
sceneList.map((sceneListItem) => (
  game.scene.add(sceneListItem.key, sceneListItem.scene)
));

// add the scene to the game

// start the scene (via Scene Manager)
game.scene.start(SceneKeys.PRELOAD_SCENE);