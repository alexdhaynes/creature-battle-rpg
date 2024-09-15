import {
  battleMenuCursorInitialPosition,
  battleMenu2x2CursorPositions,
  battleMenuNavigationMap,
  CursorPositions2x2,
  battleMainMenu2x2Grid,
  battleAttackMenu2x2Grid,
} from "@game/battle/battleUIConstants";

import { Directions, InputActions } from "@scripts/game/gameConstants";

import {
  BattleMenuStateMachine,
  BattleMenuStates,
} from "@game/battle/BattleMenuStateMachine";

import {
  createMainMenu,
  createAttackMenuNav,
  createInventoryPane,
  createSwitchPane,
  createFleePane,
} from "@game/battle/ui/menu/battleMenuGameObjects";

export class BattleMenu {
  #scene: Phaser.Scene;
  // game objects
  #battleMenuAttack!: Phaser.GameObjects.Container;
  #battleMenuCursor!: Phaser.GameObjects.Image;
  #attackMenuCursor!: Phaser.GameObjects.Image; // TODO: do we need 2 cursor objects?
  cursorIsDisabled: Boolean;
  #currentMenuCell!: CursorPositions2x2; // stores the currently selected cell of a 2x2 menu matrix
  #stateMachine!: BattleMenuStateMachine;
  #battleMenuTextObjects!: Phaser.GameObjects.Text[];
  #battleMenuNav!: Phaser.GameObjects.Container;
  // the containers for the menu items
  #inventoryContainer!: Phaser.GameObjects.Container;
  #creaturesContainer!: Phaser.GameObjects.Container;
  #fleeContainer!: Phaser.GameObjects.Container;

  // Set initial states
  constructor(scene: Phaser.Scene) {
    this.#scene = scene;
    this.#currentMenuCell = CursorPositions2x2.TOP_LEFT;
    // instantiate state machine
    this.#stateMachine = new BattleMenuStateMachine(
      BattleMenuStates.Main,
      this
    );

    this.cursorIsDisabled = false;
  }

  // Putting the class's initial states in an init method
  //so I have more control over when to call these initial states
  // Here, create the game objects and instantiate state machine
  init() {
    // create the main menu
    // the cursor, menu container, text container, and text objects are returned
    const { battleMenuCursor, textObjects, battleMenuNav } = createMainMenu(
      this.#scene
    );

    this.#battleMenuCursor = battleMenuCursor;
    this.#battleMenuTextObjects = textObjects;
    this.#battleMenuNav = battleMenuNav;

    const { inventoryContainer } = createInventoryPane(this.#scene);
    this.#inventoryContainer = inventoryContainer;

    const { creaturesContainer } = createSwitchPane(this.#scene);
    this.#creaturesContainer = creaturesContainer;

    const { fleeContainer } = createFleePane(this.#scene);
    this.#fleeContainer = fleeContainer;

    // create the attack menu
    const { attackMenuNav, attackMenuCursor } = createAttackMenuNav(
      this.#scene
    );

    this.#battleMenuAttack = attackMenuNav;

    this.#attackMenuCursor = attackMenuCursor;

    // Hide the main menu initially
    this.hideMainMenu();
    this.hideAttackMenu();

    // initialize the state machine
    this.#stateMachine.currentState = BattleMenuStates.Main;
  }

  // Respond to keyboard inputs
  handlePlayerInput(
    input: keyof typeof InputActions | keyof typeof Directions
  ) {
    const currentState = this.#stateMachine.currentState;

    // Dispatch state actions
    if (input === InputActions.CANCEL) {
      // do nothing if a cancel action is triggered when the Battle Menu state is Closed
      if (this.#stateMachine.currentState === BattleMenuStates.Closed) return;

      this.#stateMachine.dispatch(currentState, InputActions.CANCEL, {
        menuItem: battleMainMenu2x2Grid[this.#currentMenuCell],
      });
      return;
    }
    if (input === InputActions.OK) {
      const menuItem =
        currentState === BattleMenuStates.Attacks
          ? battleAttackMenu2x2Grid[this.#currentMenuCell]
          : battleMainMenu2x2Grid[this.#currentMenuCell];

      this.#stateMachine.dispatch(currentState, InputActions.OK, { menuItem });
      return;
    }
    // Move the cursor for directional input
    // only listen for directional input when cursor is not disabled
    if (
      !this.cursorIsDisabled &&
      (input === Directions.UP ||
        input === Directions.DOWN ||
        input === Directions.LEFT ||
        input === Directions.RIGHT)
    ) {
      this.#moveCursor(input as keyof typeof Directions);
      return;
    }
  }

  // Given a directional input, move the cursor to the appropriate cell
  #moveCursor(direction: keyof typeof Directions) {
    const currentCursor =
      this.#stateMachine.currentState === BattleMenuStates.Attacks
        ? this.#attackMenuCursor
        : this.#battleMenuCursor;

    // pass the current 2x2 cell to the navigation map
    const currentCell = battleMenuNavigationMap[this.#currentMenuCell];

    const newCell = currentCell ? currentCell[direction] : undefined;

    if (newCell) {
      // update the current cursor location on the battleMenu instance
      this.#currentMenuCell = newCell;
      // Use navigation mapping to deermine new cursor coords
      const { cursorX, cursorY } =
        battleMenu2x2CursorPositions[this.#currentMenuCell];

      // set the cursor's position
      currentCursor.setPosition(cursorX, cursorY);
    }
  }

  // reset cursor to the top left of the grid
  resetCursorPosition() {
    const currentCursor =
      this.#stateMachine.currentState === BattleMenuStates.Attacks
        ? this.#attackMenuCursor
        : this.#battleMenuCursor;
    // set the cursor's position
    const { cursorX, cursorY } =
      battleMenu2x2CursorPositions[CursorPositions2x2.TOP_LEFT];

    // reset the current cell to top left
    this.#currentMenuCell = CursorPositions2x2.TOP_LEFT;

    currentCursor.setPosition(cursorX, cursorY);
  }

  // ========= All methods below either create or toggle game objects =========

  // Show the main battle menu
  showMainMenu() {
    // show the main menu text
    this.#battleMenuTextObjects.map((text) => text.setAlpha(1));
    // show the main menu nav
    this.#battleMenuNav.setAlpha(1);

    // reset initial position of cursor
    this.#battleMenuCursor.setPosition(
      battleMenuCursorInitialPosition.x,
      battleMenuCursorInitialPosition.y
    );
  }

  // Hide the main battle menu
  hideMainMenu() {
    // hide the main menu text
    this.#battleMenuTextObjects.map((text) => text.setAlpha(0));
    // hide the main menu nav
    this.#battleMenuNav.setAlpha(0);
  }
  // Show the attack menu
  showAttackMenu() {
    this.#battleMenuAttack.setAlpha(1);
  }

  // Hide the attack menu
  hideAttackMenu() {
    console.log("hide attack menu");
    this.#battleMenuAttack.setAlpha(0);
  }

  showInventoryPane() {
    this.#inventoryContainer.setAlpha(1);
  }

  hideInventoryPane() {
    this.#inventoryContainer.setAlpha(0);
  }

  showCreaturesPane() {
    this.#creaturesContainer.setAlpha(1);
  }

  hideCreaturesPane() {
    this.#creaturesContainer.setAlpha(0);
  }

  showFleePane() {
    this.#fleeContainer.setAlpha(1);
  }

  hideFleePane() {
    this.#fleeContainer.setAlpha(0);
  }
}
