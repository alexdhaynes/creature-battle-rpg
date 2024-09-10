// Extend the Phaser.Scene class to create a CustomScene 
// with additional functionality
// This CustomScene class includes a custom log() method for development use
export class ExtendedScene extends Phaser.Scene {
    constructor(config: Phaser.Types.Scenes.SettingsConfig) {
        // Call the parent class constructor with the expected scene config
        super(config);
      }
  
    // log the phaser scene's method
    log(methodName: string) {
      console.log(`[${this.constructor.name}:${methodName}] invoked`);
    }
}
