import {
  battleMainMenu2x2Grid,
  battleAttackMenu2x2Grid,
  CursorPositions2x2,
} from "@game/battle/battleUIConstants";

import { Directions, InputActions } from "@scripts/game/gameConstants";

import {
  BattleMenuStateMachine,
  BattleMenuStates,
} from "@game/battle/ui/menu/state/BattleMenuStateMachine";

import {
  createAttackMenuNav,
  createInventoryPane,
  createSwitchPane,
  createFleePane,
  createTextDisplayPane,
  updateTextContainer,
} from "@game/battle/ui/menu/battleMenuGameObjects";

import { BattleMenuObserver } from "@game/battle/ui/menu/state/BattleMenuStateObserver";
import { BattleMainMenu } from "@game/battle/ui/menu/submenus/BattleMainMenu";
import { Cursor } from "@game/battle/ui/menu/submenus/Cursor";
import { BattleStateManager } from "@game/battle/ui/menu/state/BattleStateManager";

export class BattleMenu {
  #scene: Phaser.Scene;
  // game objects
  #battleMenuAttack!: Phaser.GameObjects.Container; // todo: move to Attack Menu Class

  // State management
  stateMachine!: BattleMenuStateMachine;
  stateManager!: BattleStateManager;

  // the containers for the menu items
  #inventoryContainer!: Phaser.GameObjects.Container;
  #creaturesContainer!: Phaser.GameObjects.Container;
  #fleeContainer!: Phaser.GameObjects.Container;
  // the container for status messages
  #statusMessageContainer!: Phaser.GameObjects.Container;
  #statusMessageTextObjects!: Phaser.GameObjects.Text[];
  // store the currently selected menu cell
  #currentMenuCell!: CursorPositions2x2; // stores the currently selected cell of a 2x2 menu matrix

  // main menu
  mainMenu!: BattleMainMenu;

  // store a reference to the currently active cursor
  #currentCursor!: Cursor;

  // Set initial states
  constructor(scene: Phaser.Scene) {
    this.#scene = scene;

    // instantiate state machine
    this.stateMachine = new BattleMenuStateMachine(this);

    // store reference to the state manager
    this.stateManager = this.stateMachine.battleStateManager;

    // create Main Menu
    this.mainMenu = new BattleMainMenu(scene, this.stateManager);

    // Set the current menu state to the mian menu
    this.stateManager.setCurrentMenuState(BattleMenuStates.Main);

    // store a reference to the main menu cursor
    // TODO: add the appropriate cursor depending on which submenu is visible
    this.#currentCursor =
      this.stateManager.getState().currentMenuState === BattleMenuStates.Main
        ? this.mainMenu.getCursor()
        : this.mainMenu.getCursor();

    // store a reference to the current menu cell (stored by state manager)
    this.#currentMenuCell = this.stateManager.getState().currentMenuCell;

    // TODO: do i need observers for main menu?

    // create battlemenuObserver
    const attackMenuObserver = new BattleMenuObserver(this);

    // observe the attack menu
    this.stateMachine.addObserver(attackMenuObserver);
  }

  // Putting the class's initial states in an init method
  //so I have more control over when to call these initial states
  // Here, create the game objects and instantiate state machine
  init() {
    const { inventoryContainer } = createInventoryPane(this.#scene);
    this.#inventoryContainer = inventoryContainer;

    const { creaturesContainer } = createSwitchPane(this.#scene);
    this.#creaturesContainer = creaturesContainer;

    const { fleeContainer } = createFleePane(this.#scene);
    this.#fleeContainer = fleeContainer;

    const { displayTextContainer, displayTextObjects } = createTextDisplayPane(
      this.#scene,
      [""]
    );

    this.#statusMessageContainer = displayTextContainer;
    this.#statusMessageTextObjects = displayTextObjects;

    // create the attack menu
    const { attackMenuNav, attackMenuCursor } = createAttackMenuNav(
      this.#scene
    );

    this.#battleMenuAttack = attackMenuNav;

    //this.#attackMenuCursor = attackMenuCursor;

    // Hide attack menu intiially
    this.hideAttackMenu();
  }

  // Respond to keyboard inputs
  handlePlayerInput(
    input: keyof typeof InputActions | keyof typeof Directions
  ) {
    const { currentMenuState } = this.stateManager.getState();
    // Dispatch state actions
    if (input === InputActions.CANCEL) {
      // do nothing if a cancel action is triggered when the Battle Menu state is Closed
      if (
        this.stateManager.getState().currentMenuState ===
        BattleMenuStates.Closed
      )
        return;

      this.stateMachine.dispatch(currentMenuState, InputActions.CANCEL, {
        menuItem: battleMainMenu2x2Grid[this.#currentMenuCell],
      });
      return;
    }
    if (input === InputActions.OK) {
      const menuItem =
        currentMenuState === BattleMenuStates.Attacks
          ? battleAttackMenu2x2Grid[this.#currentMenuCell]
          : battleMainMenu2x2Grid[this.#currentMenuCell];

      this.stateMachine.dispatch(currentMenuState, InputActions.OK, {
        menuItem,
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
      console.log(input, this.#currentCursor);
      this.#currentCursor.moveCursor(input as keyof typeof Directions);
      return;
    }
  }

  // ========= All methods below either create or toggle game objects =========

  // Show the attack menu
  showAttackMenu() {
    this.#battleMenuAttack.setAlpha(1);
  }

  showAttackMenuMessage(newMessage: string[]) {
    this.hideAttackMenu();
    updateTextContainer(this.#statusMessageTextObjects, newMessage);
    this.#statusMessageContainer.setAlpha(1);
  }

  hideStatusMessage() {
    updateTextContainer(this.#statusMessageTextObjects, [""]);
    this.#statusMessageContainer.setAlpha(0);
  }

  // Hide the attack menu
  hideAttackMenu() {
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
