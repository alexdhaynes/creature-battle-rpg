import { BattleBackgroundAssetKeys } from "@scripts/game/assets/assetConstants";

export class BackgroundImage {
  #scene: Phaser.Scene;
  #assetKey: BattleBackgroundAssetKeys;
  #backgroundGameObject: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, assetKey: BattleBackgroundAssetKeys) {
    this.#scene = scene;
    this.#assetKey = assetKey;

    // create main background
    this.#backgroundGameObject = this.#scene.add
      .image(0, 0, assetKey)
      .setAlpha(0)
      .setOrigin(0);
  }

  showBackground() {
    this.#backgroundGameObject.setAlpha(1);
  }

  // No need to create new background instances;
  // You can call updateBackground to change the bg texture
  updateBackground() {
    this.#backgroundGameObject.setTexture(this.#assetKey);
  }
}
