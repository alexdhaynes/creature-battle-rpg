import {
  battleMainMenu2x2Grid,
  battleAttackMenu2x2Grid,
  battleMenuCursorInitialPosition,
  menu2x2NavigationMap,
  menu2x2CursorPositions,
  CursorPositions2x2,
} from "@game/battle/battleUIConstants";

import { Directions, InputActions } from "@scripts/game/gameConstants";

import {
  BattleMenuStateMachine,
  BattleMenuStates,
} from "@game/battle/ui/menu/state/BattleMenuStateMachine";

import {
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
import { AttackMenu } from "./submenus/AttackMenu";

export class BattleMenu {
  #scene: Phaser.Scene;
  // game objects

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
  // attackMenu
  attackMenu!: AttackMenu;

  // store a reference to the current cursor
  menuCursor!: Cursor;
  menuCursorGameObject!: Phaser.GameObjects.Image;

  // Set initial states
  constructor(scene: Phaser.Scene) {
    this.#scene = scene;

    // instantiate state machine
    this.stateMachine = new BattleMenuStateMachine(this);

    // store reference to the state manager
    this.stateManager = this.stateMachine.battleStateManager;

    // create Main Menu
    this.mainMenu = new BattleMainMenu(scene);

    // Set the current menu state to the mian menu
    this.stateManager.setCurrentMenuState(BattleMenuStates.Main);

    // Create a cursor, which will be shared by all menus
    this.menuCursor = new Cursor(
      menu2x2NavigationMap,
      menu2x2CursorPositions,
      battleMenuCursorInitialPosition,
      this.stateManager
    );

    // create the cursor game object
    this.menuCursor.createGameObject(scene);
    // store the cursor game object
    this.menuCursorGameObject = this.menuCursor.getGameObject();

    // create Attack submenu
    this.attackMenu = new AttackMenu(scene);

    // add the cursor to the main menu nav contaienr
    this.mainMenu.getContainer().add(this.menuCursorGameObject);

    // store a reference to the current menu cell (stored by state manager)
    this.#currentMenuCell = this.stateManager.getState().currentMenuCell;

    // create battlemenuObserver
    // TODO: what is this actually doing?
    const menuObserver = new BattleMenuObserver(this);
    this.stateMachine.addObserver(menuObserver);
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
  }

  // Respond to keyboard inputs
  handlePlayerInput(
    input: keyof typeof InputActions | keyof typeof Directions
  ) {
    const { currentMenuState, currentMenuCell } = this.stateManager.getState();

    // Dispatch state actions
    if (input === InputActions.CANCEL) {
      // do nothing if a cancel action is triggered when the Battle Menu state is Closed
      if (
        this.stateManager.getState().currentMenuState ===
        BattleMenuStates.Closed
      )
        return;

      this.stateMachine.dispatch(currentMenuState, InputActions.CANCEL, {
        menuItem: battleMainMenu2x2Grid[currentMenuCell],
      });
      return;
    }
    if (input === InputActions.OK) {
      const menuItem =
        currentMenuState === BattleMenuStates.Attacks
          ? battleAttackMenu2x2Grid[currentMenuCell]
          : battleMainMenu2x2Grid[currentMenuCell];
      console.log("current menu cell from state manager ", currentMenuCell);
      console.log("private prop current menu cell ", this.#currentMenuCell);

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
      // need to update currentMenuCell with new position
      this.menuCursor.moveCursor(input as keyof typeof Directions);
      return;
    }
  }

  // ========= All methods below either create or toggle game objects =========

  showStatusMessage(newMessage: string[]) {
    // hide submenus
    this.attackMenu.hide();
    // show text container
    updateTextContainer(this.#statusMessageTextObjects, newMessage);
    this.#statusMessageContainer.setAlpha(1);
  }

  hideStatusMessage() {
    updateTextContainer(this.#statusMessageTextObjects, [""]);
    this.#statusMessageContainer.setAlpha(0);
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
