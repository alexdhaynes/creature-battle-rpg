import {
  battleUITextStyle,
  BattleMenuOptions,
} from "@game/battle/battleUIConstants";
import { MonsterAssetKeys } from "@scripts/game/assets/assetConstants";
import { Directions, GameActions } from "@scripts/game/gameConstants";

export class BattleMenu {
  #scene: Phaser.Scene;
  #mainBattleMenuPhaserContainerGameObject!: Phaser.GameObjects.Container;
  #moveSelectionSubBattleMenuPhaserContainerGameObject!: Phaser.GameObjects.Container;
  #battleTextGameObjectLine1!: Phaser.GameObjects.Text;
  #battleTextGameObjectLine2!: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    this.#scene = scene;
  }

  // A render method
  // creates the main battle menu container
  render() {
    this.#createMainInfoPane();
    this.#createMainBattleMenuContainer();
    this.#createMonsterAttackSubMenuContainer();
  }

  // TODO: abstract these show hide methods!
  // Show the main battle menu
  showMainBattleMenu() {
    // update the battle text before showing the main battle menu
    this.#battleTextGameObjectLine1.setText("What should");
    this.#mainBattleMenuPhaserContainerGameObject.setAlpha(1);
    // show the battle text
    this.#battleTextGameObjectLine1.setAlpha(1);
    this.#battleTextGameObjectLine2.setAlpha(1);
  }

  // Hide the main battle menu
  hideMainBattleMenu() {
    this.#mainBattleMenuPhaserContainerGameObject.setAlpha(0);
    // hide the battle text
    this.#battleTextGameObjectLine1.setAlpha(0);
    this.#battleTextGameObjectLine2.setAlpha(0);
  }
  // Show the main battle menu
  showMonsterAttackSubMenu() {
    this.#moveSelectionSubBattleMenuPhaserContainerGameObject.setAlpha(1);
  }

  // Hide the main battle menu
  hideMonsterAttackSubMenu() {
    this.#moveSelectionSubBattleMenuPhaserContainerGameObject.setAlpha(0);
  }

  // handle keyboard input on the battle menu
  handlePlayerInput(input: keyof typeof GameActions | keyof typeof Directions) {
    if (input === GameActions.CANCEL) {
      console.log("shifty");
      this.hideMonsterAttackSubMenu();
      this.showMainBattleMenu();
      return;
    }
    if (input === GameActions.OK) {
      console.log("okie");
      this.hideMainBattleMenu();
      this.showMonsterAttackSubMenu();
      return;
    }
    if (input === Directions.UP) {
      console.log("uppity up");
      return;
    }
    if (input === Directions.DOWN) {
      console.log("downy down");
      return;
    }
    if (input === Directions.LEFT) {
      console.log("lefty left");
      return;
    }
    if (input === Directions.RIGHT) {
      console.log("rightily right");
      return;
    }
  }

  // Battle actions menu
  // Displays on the right in the sub page
  #createMainBattleMenuContainer() {
    // Create the prompt text for the main battle menu
    this.#battleTextGameObjectLine1 = this.#scene.add.text(
      20,
      468,
      "What should",
      battleUITextStyle
    );
    // TODO: update to use monster data that is passed into this class instance
    this.#battleTextGameObjectLine2 = this.#scene.add.text(
      20,
      512,
      `${MonsterAssetKeys.IGUANIGNITE} do next?`,
      battleUITextStyle
    );
    // store scene in a property variable
    this.#mainBattleMenuPhaserContainerGameObject = this.#scene.add.container(
      520,
      448,
      [
        this.#createMainInfoSubPane(),
        this.#scene.add.text(
          55,
          22,
          BattleMenuOptions.FIGHT,
          battleUITextStyle
        ),
        this.#scene.add.text(
          240,
          22,
          BattleMenuOptions.SWITCH,
          battleUITextStyle
        ),
        this.#scene.add.text(55, 70, BattleMenuOptions.ITEM, battleUITextStyle),
        this.#scene.add.text(
          240,
          70,
          BattleMenuOptions.FLEE,
          battleUITextStyle
        ),
      ]
    );

    // Hide the main battle menu initially
    this.hideMainBattleMenu();
  }

  // Contextual menu depending on which battle action has been chosen
  // Displays on the left in the main info wrapper pane
  // When "Fight" option is chosen, display  available attacks
  #createMonsterAttackSubMenuContainer() {
    // Store container in a reference variable
    this.#moveSelectionSubBattleMenuPhaserContainerGameObject =
      this.#scene.add.container(0, 448, [
        this.#scene.add.text(55, 22, "slash", battleUITextStyle),
        this.#scene.add.text(240, 22, "growl", battleUITextStyle),
        this.#scene.add.text(55, 70, "-", battleUITextStyle),
        this.#scene.add.text(240, 70, "-", battleUITextStyle),
      ]);

    this.hideMonsterAttackSubMenu();
  }

  // The main info pane at the left-bottom of the screen
  // This is a wrapper for the sub info pane
  #createMainInfoPane() {
    const rectHeight = 124;
    const padding = 4;

    this.#scene.add
      .rectangle(
        padding, //x
        this.#scene.scale.height - rectHeight - padding, // y
        this.#scene.scale.width - padding * 2, //width
        rectHeight, //height
        0xede4f3, //fil
        1
      )
      .setOrigin(0)
      .setStrokeStyle(8, 0x382350, 1);
  }

  // The sub info pane
  // Displays on the right side
  #createMainInfoSubPane() {
    const rectWidth = 500;
    const rectHeight = 124;

    return this.#scene.add
      .rectangle(0, 0, rectWidth, rectHeight, 0xede4f3, 1)
      .setOrigin(0)
      .setStrokeStyle(8, 0x905ac2, 1);
  }
}
