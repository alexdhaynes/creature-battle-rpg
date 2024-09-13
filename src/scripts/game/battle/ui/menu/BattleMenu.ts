import {
  battleUITextStyle,
  BattleMenuOptionLabels,
  battleMenuCursorInitialPosition,
  battleMenu2x2CursorPositions,
  battleMenuNavigationMap,
  CursorPositions2x2,
  battleMainMenu2x2Grid,
  battleAttackMenu2x2Grid,
} from "@game/battle/battleUIConstants";
import {
  MonsterAssetKeys,
  UIAssetKeys,
} from "@scripts/game/assets/assetConstants";
import { Directions, GameActions } from "@scripts/game/gameConstants";

import {
  battleMenuTriggerMap,
  BattleMenuStateMachine,
  BattleMenuTriggers,
  BattleMenuStates as BattleMenuStatesNew,
} from "@game/battle/battleStateMachine";

export class BattleMenu {
  #scene: Phaser.Scene;
  // game objects
  #battleMenuMain!: Phaser.GameObjects.Container;
  #battleMenuAttack!: Phaser.GameObjects.Container;
  #displayTextLine1!: Phaser.GameObjects.Text;
  #displayTextLine2!: Phaser.GameObjects.Text;
  #battleMenuCursor!: Phaser.GameObjects.Image;
  #attackMenuCursor!: Phaser.GameObjects.Image; // TODO: do we need 2 cursor objects?

  // stores the currently selected cell of a 2x2 menu matrix
  #currentMenuCell!: CursorPositions2x2;
  //state machine
  #stateMachine!: BattleMenuStateMachine;

  // Set initial states
  constructor(scene: Phaser.Scene) {
    this.#scene = scene;
    this.#currentMenuCell = CursorPositions2x2.TOP_LEFT;
  }

  // Putting the class's initial states in an init method so I have more control over when to call these initial states
  // Here, create the game objects and instantiate state machine
  init() {
    this.#createMainInfoPane();
    this.#createMainMenu();
    this.#createAttackMenu();
    // instantiate state machine
    this.#stateMachine = new BattleMenuStateMachine(BattleMenuStatesNew.Main);
  }

  // render the current state
  render() {
    console.log("calling render()");
    console.log(`current state: ${this.#stateMachine.currentState}`);

    switch (this.#stateMachine.currentState) {
      case BattleMenuStatesNew.Main:
        console.log("render main menu");
        this.hideAttackMenu();
        this.showMainMenu();
        break;
      case BattleMenuStatesNew.Attacks:
        console.log("render attack menu");
        this.hideMainMenu();
        this.showAttackMenu();
        break;
      default:
        console.log("no state found");
        break;
    }
  }

  // Respond to keyboard inputs
  handlePlayerInput(input: keyof typeof GameActions | keyof typeof Directions) {
    if (input === GameActions.CANCEL) {
      console.log("shift press - cancel");

      return;
    }
    if (input === GameActions.OK) {
      // If we're on the main menu
      if (this.#stateMachine.currentState === BattleMenuStatesNew.Main) {
        // determine the current menu item
        const currentMenuItem = battleMainMenu2x2Grid[this.#currentMenuCell];
        // Construct the trigger from:
        // the  current State, the current menu item selected, and the current game action
        const trigger =
          battleMenuTriggerMap[this.#stateMachine.currentState][
            currentMenuItem
          ][GameActions.OK];
        this.#stateMachine.transition(trigger);
        this.render();
      }
      // If we're on the attack menu
      else if (
        this.#stateMachine.currentState === BattleMenuStatesNew.Attacks
      ) {
        //todo
      }

      // this.#stateMachine.transition(BattleMenuTriggers.Cancel);
      return;
    }
    if (input === Directions.UP) {
      this.#moveCursor(Directions.UP);
      return;
    }
    if (input === Directions.DOWN) {
      this.#moveCursor(Directions.DOWN);
      return;
    }
    if (input === Directions.LEFT) {
      this.#moveCursor(Directions.LEFT);
      return;
    }
    if (input === Directions.RIGHT) {
      this.#moveCursor(Directions.RIGHT);
      return;
    }
  }

  // Given a directional input, move the cursor to the appropriate cell
  #moveCursor(direction: keyof typeof Directions) {
    // pass the current 2x2 cell to the navigation map
    const currentCell = battleMenuNavigationMap[this.#currentMenuCell];

    const newCell = currentCell ? currentCell[direction] : undefined;

    if (newCell) {
      // update the current cursor location on the battleMenu instance
      this.#currentMenuCell = newCell;
      // Use navigation mapping to deermine new cursor coords
      const newCursorX =
        battleMenu2x2CursorPositions[this.#currentMenuCell].cursorX;

      const newCursorY =
        battleMenu2x2CursorPositions[this.#currentMenuCell].cursorY;

      // set the cursor's position
      this.#battleMenuCursor.setPosition(newCursorX, newCursorY);
    }
  }

  // ========= All methods below either create or toggle game objects =========

  // Show the main battle menu
  showMainMenu() {
    // update the battle text before showing the main battle menu
    this.#displayTextLine1.setText("What should");
    this.#battleMenuMain.setAlpha(1);
    // show the battle text
    this.#displayTextLine1.setAlpha(1);
    this.#displayTextLine2.setAlpha(1);

    // reset initial position of cursor
    this.#battleMenuCursor.setPosition(
      battleMenuCursorInitialPosition.x,
      battleMenuCursorInitialPosition.y
    );
  }

  // Hide the main battle menu
  hideMainMenu() {
    this.#battleMenuMain.setAlpha(0);
    // hide the battle text
    this.#displayTextLine1.setAlpha(0);
    this.#displayTextLine2.setAlpha(0);
  }
  // Show the main battle menu
  showAttackMenu() {
    this.#battleMenuAttack.setAlpha(1);
  }

  // Hide the main battle menu
  hideAttackMenu() {
    this.#battleMenuAttack.setAlpha(0);
  }

  // Create Main Menu
  #createMainMenu() {
    // battle menu display text object
    this.#displayTextLine1 = this.#scene.add.text(
      20,
      468,
      "What should",
      battleUITextStyle
    );
    // battle menu display text object
    this.#displayTextLine2 = this.#scene.add.text(
      20,
      512,
      `${MonsterAssetKeys.IGUANIGNITE} do next?`,
      battleUITextStyle
    );

    // cursor game object
    this.#battleMenuCursor = this.#scene.add
      .image(
        battleMenuCursorInitialPosition.x,
        battleMenuCursorInitialPosition.y,
        UIAssetKeys.CURSOR,
        0
      )
      .setOrigin(0.5)
      .setScale(2.5);

    // add all the battle menu game objects to a container

    this.#battleMenuMain = this.#scene.add.container(520, 448, [
      this.#createMainInfoSubPane(),
      this.#scene.add.text(
        55,
        22,
        BattleMenuOptionLabels.FIGHT,
        battleUITextStyle
      ),
      this.#scene.add.text(
        240,
        22,
        BattleMenuOptionLabels.SWITCH,
        battleUITextStyle
      ),
      this.#scene.add.text(
        55,
        70,
        BattleMenuOptionLabels.ITEM,
        battleUITextStyle
      ),
      this.#scene.add.text(
        240,
        70,
        BattleMenuOptionLabels.FLEE,
        battleUITextStyle
      ),
      this.#battleMenuCursor,
    ]);

    // Hide the main battle menu initially
    this.hideMainMenu();
  }

  // Contextual submenu depending on which battle action has been chosen
  // Displays on the left in the main info wrapper pane
  // When "Fight" option is chosen, display  available attacks
  #createAttackMenu() {
    // create attack battle menu cursor
    this.#attackMenuCursor = this.#scene.add
      .image(
        battleMenuCursorInitialPosition.x,
        battleMenuCursorInitialPosition.y,
        UIAssetKeys.CURSOR,
        0
      )
      .setOrigin(0.5)
      .setScale(2.5);
    // Store container in a reference variable
    this.#battleMenuAttack = this.#scene.add.container(0, 448, [
      this.#scene.add.text(55, 22, "slash", battleUITextStyle),
      this.#scene.add.text(240, 22, "growl", battleUITextStyle),
      this.#scene.add.text(55, 70, "-", battleUITextStyle),
      this.#scene.add.text(240, 70, "-", battleUITextStyle),
      this.#attackMenuCursor,
    ]);

    this.hideAttackMenu();
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
