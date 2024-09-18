import { log as _log } from "@game/utils";

// Extend the Phaser.Scene class to create a BaseScene with additional functionality
// all scene classes in the game with extend BaseScene
// This BaseScene class includes a custom log() method for development use
export class BaseScene extends Phaser.Scene {
  devMode: boolean;

  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    // Call the parent class constructor with the expected scene config
    super(config);
    this.devMode = false;
  }

  // log the phaser scene's method (returning the utility log)
  log(methodName: string) {
    if (this.devMode === true) return _log(methodName, this.constructor.name);
  }
}
