import {
  battleMenuCursorInitialPosition,
  battleMenu2x2CursorPositions,
  battleMenuNavigationMap,
  CursorPositions2x2,
  battleMainMenu2x2Grid,
  battleAttackMenu2x2Grid,
} from "@game/battle/battleUIConstants";

import { Directions, GameActions } from "@scripts/game/gameConstants";

import {
  BattleMenuStateMachine,
  BattleMenuStates,
} from "@game/battle/BattleMenuStateMachine";

import {
  createMainMenu,
  createAttackMenu,
  createMainInfoPane,
} from "@game/battle/ui/menu/battleMenuGameObjects";

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
  #stateMachine!: any;

  // Set initial states
  constructor(scene: Phaser.Scene) {
    this.#scene = scene;
    this.#currentMenuCell = CursorPositions2x2.TOP_LEFT;
    // instantiate state machine
    this.#stateMachine = new BattleMenuStateMachine(
      BattleMenuStates.Main,
      this
    );
  }

  // Putting the class's initial states in an init method
  //so I have more control over when to call these initial states
  // Here, create the game objects and instantiate state machine
  init() {
    // create the info pane
    createMainInfoPane(this.#scene);

    // create the main menu
    const {
      displayTextLine1,
      displayTextLine2,
      battleMenuCursor,
      battleMenuMain,
    } = createMainMenu(this.#scene);

    // create the attack menu
    const { attackMenuCursor, battleMenuAttack } = createAttackMenu(
      this.#scene
    );

    this.#displayTextLine1 = displayTextLine1;
    this.#displayTextLine2 = displayTextLine2;

    this.#battleMenuMain = battleMenuMain;
    this.#battleMenuAttack = battleMenuAttack;

    this.#battleMenuCursor = battleMenuCursor;
    this.#attackMenuCursor = attackMenuCursor;

    // Hide the main menu initially
    this.hideMainMenu();
    this.hideAttackMenu();

    // initialize the state machine
    this.#stateMachine.currentState = BattleMenuStates.Main;
  }

  // Respond to keyboard inputs
  handlePlayerInput(input: keyof typeof GameActions | keyof typeof Directions) {
    const currentState = this.#stateMachine.currentState;

    // Dispatch state actions
    if (input === GameActions.CANCEL) {
      this.#stateMachine.dispatch(GameActions.CANCEL, {
        menuItem: battleMainMenu2x2Grid[this.#currentMenuCell],
      });
      return;
    }
    if (input === GameActions.OK) {
      let grid = battleMainMenu2x2Grid;
      if (currentState === BattleMenuStates.Attacks) {
        grid = battleAttackMenu2x2Grid;
      }
      this.#stateMachine.dispatch(GameActions.OK, {
        menuItem: grid[this.#currentMenuCell],
      });
      return;
    }
    // Move the cursor for directional input
    if (
      input === Directions.UP ||
      input === Directions.DOWN ||
      input === Directions.LEFT ||
      input === Directions.RIGHT
    ) {
      this.#moveCursor(input as keyof typeof Directions);
      return;
    }
  }

  // Given a directional input, move the cursor to the appropriate cell
  #moveCursor(direction: keyof typeof Directions) {
    let currentCursor = this.#battleMenuCursor;
    if (this.#stateMachine.currentState === BattleMenuStates.Attacks) {
      currentCursor = this.#attackMenuCursor;
      ``;
    }

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
      currentCursor.setPosition(newCursorX, newCursorY);
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
}
