import { BaseScene } from "@scripts/game/scenes/BaseScene";
import { SceneKeys } from "@game/scenes/sceneData";
import {
  BattleAssetKeys,
  BattleBackgroundAssetKeys,
  HealthBarAssetKeys,
  MonsterAssetKeys,
} from "@game/assets/assetData";

export class BattleScene extends BaseScene {
  constructor() {
    super({
      // the scene name, which we can reference throughout game code
      key: SceneKeys.BATTLE_SCENE,
    });
  }

  // Scene lifecycle events
  create() {
    this.log("create");

    // create main background
    this.add.image(0, 0, BattleBackgroundAssetKeys.FOREST).setOrigin(0);

    // render the enemy monsters
    this.add.image(768, 144, MonsterAssetKeys.CARNODUSK, 0);

    // render the player monsters
    this.add.image(256, 316, MonsterAssetKeys.IGUANIGNITE, 0).setFlipX(true);

    // Player Health Bar
    // text game object
    const playerMonsterName = this.add.text(
      30,
      20,
      MonsterAssetKeys.IGUANIGNITE,
      {
        color: "#7e3d3f",
        fontSize: "32px",
      }
    );
    // render the player health status container
    this.add.container(556, 318, [
      // add bgimage to container
      this.add.image(0, 0, BattleAssetKeys.HEALTH_BAR_BACKGROUND).setOrigin(0),
      // Add Player Monster Name label to container
      playerMonsterName,
      // Add the health bar to container
      this.#createHealthBar(34, 34),
      // Add the Level label to container
      this.add.text(playerMonsterName.width + 35, 23, "L5", {
        color: "#ED474b",
        fontSize: "28px",
      }),
      // Add the HP label to container
      this.add.text(30, 55, "HP", {
        color: "#FF6505",
        fontSize: "24px",
        fontStyle: "italic",
      }),
      // Add the HP score to container
      // set origin to right-bottom of of its local bounds
      // this is so the right edge of the HP score always aligns with right edge of the health bar,
      // aka: the string will grow on the -x axis; it will never exceed the right edge of the parent container
      this.add
        .text(443, 80, "25/25", {
          color: "#7e3d3f",
          fontSize: "16px",
        })
        .setOrigin(1, 0),
    ]);

    // Enemy Health Bar
    // text game object
    const enemyMonsterName = this.add.text(30, 20, MonsterAssetKeys.CARNODUSK, {
      color: "#7e3d3f",
      fontSize: "32px",
    });

    // render the enemy health status container
    this.add.container(0, 0, [
      // add bg image to container
      this.add
        .image(0, 0, BattleAssetKeys.HEALTH_BAR_BACKGROUND)
        .setOrigin(0)
        .setScale(1, 0.8), // reduce y-scale of enemy health status container to accommodate for no HP score label
      // Add Enemy Monster Name label to container
      enemyMonsterName,
      // Add the health bar to container
      this.#createHealthBar(34, 34),
      // Add the Level label to container
      this.add.text(enemyMonsterName.width + 35, 23, "L5", {
        color: "#ED474b",
        fontSize: "28px",
      }),
      // Add the HP label to container
      this.add.text(30, 55, "HP", {
        color: "#FF6505",
        fontSize: "24px",
        fontStyle: "italic",
      }),
    ]);
  }

  // private method to generate the health bar
  #createHealthBar(x: number, y: number) {
    const scaleY = 0.7;
    // add the left cap of the healthbar
    const leftCap = this.add
      .image(x, y, HealthBarAssetKeys.LEFT_CAP)
      .setOrigin(0, 0.5)
      .setScale(1, scaleY);
    // add the middle of the healthbar
    const middle = this.add
      .image(leftCap.x + leftCap.width, y, HealthBarAssetKeys.MIDDLE)
      .setOrigin(0, 0.5)
      .setScale(1, scaleY);
    // Stretch the health bar's middle
    middle.displayWidth = 360;
    const rightCap = this.add
      .image(middle.x + middle.displayWidth, y, HealthBarAssetKeys.RIGHT_CAP)
      .setOrigin(0, 0.5)
      .setScale(1, scaleY);

    return this.add.container(x, y, [leftCap, middle, rightCap]);
  }
}
