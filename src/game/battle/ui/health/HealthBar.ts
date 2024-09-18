import { HealthBarAssetKeys } from "@game/constants/assetConstants";

export class HealthBar {
  #scene: Phaser.Scene;
  #gameObject: Phaser.GameObjects.Container; // store a ref to the game object
  #fullWidth: number;
  #scaleY: number;
  #leftCap!: Phaser.GameObjects.Image;
  #middle!: Phaser.GameObjects.Image;
  #rightCap!: Phaser.GameObjects.Image;
  #leftCapShadow!: Phaser.GameObjects.Image;
  #middleShadow!: Phaser.GameObjects.Image;
  #rightCapShadow!: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.#scene = scene;
    this.#gameObject = this.#scene.add.container(x, y, []);
    this.#scaleY = 0.7;
    this.#fullWidth = 360;
    this.#createHealthBarImages(x, y);
    this.#createHealthBarShadowImages(x, y);
    this.setHealthBarPercentage(1);
  }

  get gameObject() {
    return this.#gameObject;
  }

  // create the track for health bar
  #createHealthBarShadowImages(x: number, y: number) {
    // add the left cap of the healthbar
    this.#leftCapShadow = this.#scene.add
      .image(x, y, HealthBarAssetKeys.LEFT_CAP_SHADOW)
      .setOrigin(0, 0.5)
      .setScale(1, this.#scaleY);

    // add the middle of the healthbar
    this.#middleShadow = this.#scene.add
      .image(
        this.#leftCap.x + this.#leftCap.width,
        y,
        HealthBarAssetKeys.MIDDLE_SHADOW
      )
      .setOrigin(0, 0.5)
      .setScale(1, this.#scaleY);

    this.#middleShadow.displayWidth = this.#fullWidth;

    // Stretch the health bar's middle
    this.#middle.displayWidth = this.#fullWidth;

    this.#rightCapShadow = this.#scene.add
      .image(
        this.#middle.x + this.#middle.displayWidth,
        y,
        HealthBarAssetKeys.RIGHT_CAP_SHADOW
      )
      .setOrigin(0, 0.5)
      .setScale(1, this.#scaleY);

    this.#gameObject.add([
      this.#leftCapShadow,
      this.#middleShadow,
      this.#rightCapShadow,
    ]);
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

    this.#gameObject.add([this.#leftCap, this.#middle, this.#rightCap]);
  }

  // set the health bar percentage between 0 and 1 (no animation)
  setHealthBarPercentage(percent: number = 1) {
    const width = this.#fullWidth * percent;
    this.#middle.displayWidth = width;
    this.#rightCap.x = this.#middle.x + this.#middle.displayWidth;
  }

  // set the health bar percentage (with animation)
  // TYPE TODO: be more specific about the options type
  setHealthBarPercentageAnimated(percent: number, options?: any) {
    const width = this.#fullWidth * percent;
    this.#scene.tweens.add({
      targets: this.#middle,
      displayWidth: width,
      duration: options?.duration || 2000,
      ease: Phaser.Math.Easing.Sine.Out,
      onUpdate: () => {
        this.#rightCap.x = this.#middle.x + this.#middle.displayWidth;
        const isVisible = this.#middle.displayWidth > 0;
        this.#leftCap.visible = isVisible;
        this.#middle.visible = isVisible;
        this.#rightCap.visible = isVisible;
      },
      onComplete: options?.callback,
    });
  }
}
