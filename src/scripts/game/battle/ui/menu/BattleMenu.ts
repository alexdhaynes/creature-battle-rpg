import {
  battleUITextStyle,
  BattleMenuOptions,
  battleMenuCursorInitialPosition,
  battleMenuItemCursorPositions,
  battleMenuItemNavigationPath,
  AttackMenuOptions,
  attackMenuItemNavigationPath,
  attackMenuItemCursorPositions,
} from "@game/battle/battleUIConstants";
import {
  MonsterAssetKeys,
  UIAssetKeys,
} from "@scripts/game/assets/assetConstants";
import { Directions, GameActions } from "@scripts/game/gameConstants";

export class BattleMenu {
  #scene: Phaser.Scene;
  #mainBattleMenuPhaserContainerGameObject!: Phaser.GameObjects.Container;
  #moveSelectionSubBattleMenuPhaserContainerGameObject!: Phaser.GameObjects.Container;
  #battleTextGameObjectLine1!: Phaser.GameObjects.Text;
  #battleTextGameObjectLine2!: Phaser.GameObjects.Text;
  #mainBattleMenuCursorPhaserImageGameObject!: Phaser.GameObjects.Image;
  #attackBattleMenuCursorPhaserImageGameObject!: Phaser.GameObjects.Image;
  #selectedBattleMenuOption!: BattleMenuOptions;
  #selectedAttackMenuOption!: AttackMenuOptions;

  constructor(scene: Phaser.Scene) {
    this.#scene = scene;
    this.#selectedBattleMenuOption = BattleMenuOptions.DEFAULT; // initially selected battle menu action
    this.#selectedAttackMenuOption = AttackMenuOptions.DEFAULT; // initially selected attack action
  }

  // Putting the class's initial states in a render method so I have more control over when to call these initial states
  // creates the main battle menu
  render() {
    this.#createMainInfoPane();
    this.#createMainBattleMenuContainer();
    this.#createMonsterAttackSubMenuContainer();
  }

  // Show the main battle menu
  showMainBattleMenu() {
    // update the battle text before showing the main battle menu
    this.#battleTextGameObjectLine1.setText("What should");
    this.#mainBattleMenuPhaserContainerGameObject.setAlpha(1);
    // show the battle text
    this.#battleTextGameObjectLine1.setAlpha(1);
    this.#battleTextGameObjectLine2.setAlpha(1);

    // reset initial position of cursor
    this.#mainBattleMenuCursorPhaserImageGameObject.setPosition(
      battleMenuCursorInitialPosition.x,
      battleMenuCursorInitialPosition.y
    );
    // reset the initial battle action to default
    this.#selectedBattleMenuOption = BattleMenuOptions.DEFAULT;
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
      console.log("shift press - cancel");
      this.hideMonsterAttackSubMenu();
      this.showMainBattleMenu();
      return;
    }
    if (input === GameActions.OK) {
      console.log("ok press - ok ");
      this.hideMainBattleMenu();
      this.showMonsterAttackSubMenu();
      return;
    }

    // Log player input
    // console.log("player input: ", input);

    // if the input is a direction, update the battle menu option
    if (Object.values(Directions).includes(input as Directions)) {
      this.#updateSelectedBattleMenuOptionFromInput(input);
      this.#moveMainBattleMenuCursor();
      this.#updateSelectedAttackMenuOptionFromInput(input);
      this.#moveAttackMenuCursor();
    }
  }

  // Battle actions menu
  // Displays on the right in the sub page
  #createMainBattleMenuContainer() {
    // battle menu text object
    this.#battleTextGameObjectLine1 = this.#scene.add.text(
      20,
      468,
      "What should",
      battleUITextStyle
    );
    // battle menu text object
    this.#battleTextGameObjectLine2 = this.#scene.add.text(
      20,
      512,
      `${MonsterAssetKeys.IGUANIGNITE} do next?`,
      battleUITextStyle
    );

    // cursor game object
    this.#mainBattleMenuCursorPhaserImageGameObject = this.#scene.add
      .image(
        battleMenuCursorInitialPosition.x,
        battleMenuCursorInitialPosition.y,
        UIAssetKeys.CURSOR,
        0
      )
      .setOrigin(0.5)
      .setScale(2.5);

    // add all the battle menu game objects to a container

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
        this.#mainBattleMenuCursorPhaserImageGameObject,
      ]
    );

    // Hide the main battle menu initially
    this.hideMainBattleMenu();
  }

  // Contextual submenu depending on which battle action has been chosen
  // Displays on the left in the main info wrapper pane
  // When "Fight" option is chosen, display  available attacks
  #createMonsterAttackSubMenuContainer() {
    // create attack battle menu cursor
    this.#attackBattleMenuCursorPhaserImageGameObject = this.#scene.add
      .image(
        battleMenuCursorInitialPosition.x,
        battleMenuCursorInitialPosition.y,
        UIAssetKeys.CURSOR,
        0
      )
      .setOrigin(0.5)
      .setScale(2.5);
    // Store container in a reference variable
    this.#moveSelectionSubBattleMenuPhaserContainerGameObject =
      this.#scene.add.container(0, 448, [
        this.#scene.add.text(55, 22, "slash", battleUITextStyle),
        this.#scene.add.text(240, 22, "growl", battleUITextStyle),
        this.#scene.add.text(55, 70, "-", battleUITextStyle),
        this.#scene.add.text(240, 70, "-", battleUITextStyle),
        this.#attackBattleMenuCursorPhaserImageGameObject,
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

  #updateSelectedBattleMenuOptionFromInput(direction: keyof typeof Directions) {
    // if a battle menu option is selected (which it always should be),
    // set the new battle menu option
    const currentBattleMenuOptionNavigationPath =
      battleMenuItemNavigationPath[this.#selectedBattleMenuOption];

    const newBattleMenuOptionPath = currentBattleMenuOptionNavigationPath
      ? currentBattleMenuOptionNavigationPath[direction]
      : undefined;

    if (newBattleMenuOptionPath) {
      this.#selectedBattleMenuOption = newBattleMenuOptionPath;
    }
  }

  // Move the cursor depending on the current selected battle menu option
  #moveMainBattleMenuCursor() {
    const newCursorX =
      battleMenuItemCursorPositions[this.#selectedBattleMenuOption].cursorX;

    const newCursorY =
      battleMenuItemCursorPositions[this.#selectedBattleMenuOption].cursorY;

    this.#mainBattleMenuCursorPhaserImageGameObject.setPosition(
      newCursorX,
      newCursorY
    );
  }

  // Store the currently selected attack
  #updateSelectedAttackMenuOptionFromInput(direction: keyof typeof Directions) {
    // set the new attack menu option
    const currentAttackMenuOptionNavigationPath =
      attackMenuItemNavigationPath[this.#selectedAttackMenuOption];

    const newAttackMenuOptionPath = currentAttackMenuOptionNavigationPath
      ? currentAttackMenuOptionNavigationPath[direction]
      : undefined;

    if (newAttackMenuOptionPath) {
      this.#selectedAttackMenuOption = newAttackMenuOptionPath;
    }
  }

  // move the cursor on the attack menu
  #moveAttackMenuCursor() {
    const newCursorX =
      attackMenuItemCursorPositions[this.#selectedAttackMenuOption].cursorX;

    const newCursorY =
      attackMenuItemCursorPositions[this.#selectedAttackMenuOption].cursorY;

    this.#attackBattleMenuCursorPhaserImageGameObject.setPosition(
      newCursorX,
      newCursorY
    );
  }
}
