import { BaseScene } from "@game/scenes/BaseScene";
import { SceneKeys } from "@game/scenes/sceneData";
import {
  BattleBackgroundAssetKeys,
  MonsterAssetKeys,
} from "@scripts/game/assets/assetConstants";
import { BattleMenu } from "@game/battle/ui/menu/BattleMenu";
import { HealthStatus } from "@game/battle/ui/health/HealthStatus";
import { Directions, GameActions } from "@scripts/game/gameConstants";

export class BattleScene extends BaseScene {
  #battleMenu!: BattleMenu; // use ! to tell TS that these properties are defined
  #healthStatus!: HealthStatus;
  #cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys | undefined;

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

    // instantiate then render the player health status container
    this.#healthStatus = new HealthStatus(this);
    this.#healthStatus.render();

    // instantiate then render the main info and sub info pane
    this.#battleMenu = new BattleMenu(this);
    this.#battleMenu.render();
    // Show the main battle menu
    this.#battleMenu.showMainBattleMenu();

    // Create hotkeys for keyboard input
    this.#cursorKeys = this.input.keyboard?.createCursorKeys();
  } //end create()

  // Update lifecycle method (called every frame of the game)
  update() {
    // If #cursorKeys are defined, listenfor keypresses
    if (this.#cursorKeys) {
      // Listen for *single* space key press
      const wasSpaceKeyPressed = Phaser.Input.Keyboard.JustDown(
        this.#cursorKeys.space
      );
      // Listen for *single* shift key press
      const wasShiftKeyPressed = Phaser.Input.Keyboard.JustDown(
        this.#cursorKeys?.shift
      );

      if (wasSpaceKeyPressed) {
        this.#battleMenu.handlePlayerInput(GameActions.OK);
        return;
      }

      if (wasShiftKeyPressed) {
        this.#battleMenu.handlePlayerInput(GameActions.CANCEL);
        return;
      }
    }

    // Set direction based on the arrow key
    let selectedDirection: keyof typeof Directions = Directions.NONE;

    if (this.#cursorKeys?.left.isDown) {
      selectedDirection = Directions.LEFT;
    } else if (this.#cursorKeys?.right.isDown) {
      selectedDirection = Directions.RIGHT;
    } else if (this.#cursorKeys?.up.isDown) {
      selectedDirection = Directions.UP;
    } else if (this.#cursorKeys?.down.isDown) {
      selectedDirection = Directions.DOWN;
    }

    // If a direction is currently selected, have the battle menu handle the player's input
    if (selectedDirection != Directions.NONE) {
      this.#battleMenu.handlePlayerInput(selectedDirection);
    }
  } //end update()
}
