import "@styles/index.css" //import root css
import Phaser, {Types as PhaserTypes} from 'phaser'; // Import Phaser and types
import { hello } from '@scripts/hello'

hello("alex");

const config: PhaserTypes.Core.GameConfig = {
  parent: 'game-container',
  width: "100%",
  height: "100%",
  banner: false,
};

const game = new Phaser.Game(config);


