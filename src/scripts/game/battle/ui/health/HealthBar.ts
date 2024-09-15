import { HealthBarAssetKeys } from "@scripts/game/assets/assetConstants";

export class HealthBar {
  #scene: Phaser.Scene;
  #healthBarContainer: Phaser.GameObjects.Container;
  #fullWidth: number;
  #scaleY: number;
  #leftCap: Phaser.GameObjects.Image;
  #middle: Phaser.GameObjects.Image;
  #rightCap: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.#scene = scene;
    this.#healthBarContainer = this.#scene.add.container(x, y, []);
    this.#scaleY = 0.7;
    this.#fullWidth = 360;
    this.#createHealthBarImages(x, y);
    this.#scaleHealthBar(1);
  }

  get container() {
    return this.#healthBarContainer;
  }

  // Render the health bar
  // @param x: x pos of the health bar
  // @param y: y bar of hte health bar
  // @returns Phaser.GameObject.Container
  #createHealthBarImages(x: number, y: number) {
    // add the left cap of the healthbar
    this.#leftCap = this.#scene.add
      .image(x, y, HealthBarAssetKeys.LEFT_CAP)
      .setOrigin(0, 0.5)
      .setScale(1, this.#scaleY);
    // add the middle of the healthbar
    this.#middle = this.#scene.add
      .image(
        this.#leftCap.x + this.#leftCap.width,
        y,
        HealthBarAssetKeys.MIDDLE
      )
      .setOrigin(0, 0.5)
      .setScale(1, this.#scaleY);

    // Stretch the health bar's middle
    this.#middle.displayWidth = this.#fullWidth;

    this.#rightCap = this.#scene.add
      .image(
        this.#middle.x + this.#middle.displayWidth,
        y,
        HealthBarAssetKeys.RIGHT_CAP
      )
      .setOrigin(0, 0.5)
      .setScale(1, this.#scaleY);

    this.#healthBarContainer.add([this.#leftCap, this.#middle, this.#rightCap]);
  }

  #scaleHealthBar(percent: number = 1) {
    const width = this.#fullWidth * percent;
    this.#middle.displayWidth = width;
    this.#rightCap.x = this.#middle.x + this.#middle.displayWidth;
  }
}
