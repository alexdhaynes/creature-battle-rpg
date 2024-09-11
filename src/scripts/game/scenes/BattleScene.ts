import { BaseScene } from "@scripts/game/scenes/BaseScene";
import {
  BattleMenuOptions,
  SceneKeys,
  battleUITextStyle,
} from "@game/scenes/sceneData";
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

    // render the main info pane (a wrapper for the subpage)
    this.#createMainInfoPane();
    // render the sub pane
    // Battle actions menu
    // Displays on the right
    this.add.container(520, 448, [
      this.#createMainInfoSubPane(),
      this.add.text(55, 22, BattleMenuOptions.FIGHT, battleUITextStyle),
      this.add.text(240, 22, BattleMenuOptions.SWITCH, battleUITextStyle),
      this.add.text(55, 70, BattleMenuOptions.ITEM, battleUITextStyle),
      this.add.text(240, 70, BattleMenuOptions.FLEE, battleUITextStyle),
    ]);

    // Contextual menu depending on which battle action has been chosen
    // Displays on the left
    // When "Fight" option is chosen, display  available attacks
    this.add.container(0, 448, [
      this.add.text(55, 22, "slash", battleUITextStyle),
      this.add.text(240, 22, "growl", battleUITextStyle),
      this.add.text(55, 70, "-", battleUITextStyle),
      this.add.text(240, 70, "-", battleUITextStyle),
    ]);
  } //end create()

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

  #createMainInfoPane() {
    const rectHeight = 124;
    const padding = 4;

    this.add
      .rectangle(
        padding, //x
        this.scale.height - rectHeight - padding, // y
        this.scale.width - padding * 2, //width
        rectHeight, //height
        0xede4f3, //fil
        1
      )
      .setOrigin(0)
      .setStrokeStyle(8, 0x382350, 1);
  }

  #createMainInfoSubPane() {
    const rectWidth = 500;
    const rectHeight = 124;

    return this.add
      .rectangle(0, 0, rectWidth, rectHeight, 0xede4f3, 1)
      .setOrigin(0)
      .setStrokeStyle(8, 0x905ac2, 1);
  }
}
