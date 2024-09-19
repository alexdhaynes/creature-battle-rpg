import {
  battleMainMenu2x2Grid,
  battleMenuCursorInitialPosition,
  menu2x2NavigationMap,
  menu2x2CursorPositions,
} from "@game/constants/battleUIConstants";

import { Directions, InputActions } from "@game/constants/gameConstants";

import {
  BattleMenuStateMachine,
  BattleMenuObserver,
} from "@game/battle/ui/menu/state";

import { BattleStateManager } from "@game/battle/BattleStateManager";

import { BattleMenuStates } from "@game/constants/gameConstants";

import {
  createFleePane,
  createFullWidthTextDisplayPane,
  updateTextContainer,
} from "@game/battle/ui/menu/battleMenuGameObjects";

import {
  AttackMenu,
  BattleMainMenu,
  CreaturesMenu,
  Cursor,
  InventoryMenu,
} from "@game/battle/ui/menu/submenus/";

export class BattleMenu {
  #scene: Phaser.Scene;
  // game objects

  // State management
  stateMachine!: BattleMenuStateMachine;

  // the containers for the menu items
  #inventoryContainer!: Phaser.GameObjects.Container;
  #creaturesContainer!: Phaser.GameObjects.Container;
  #fleeContainer!: Phaser.GameObjects.Container;
  // the container for status messages
  #statusMessageContainer!: Phaser.GameObjects.Container;
  #statusMessageTextObjects!: Phaser.GameObjects.Text[];

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

    // create Main Menu
    this.mainMenu = new BattleMainMenu(scene);

    // Set the current menu state to the mian menu
    BattleStateManager.setCurrentMenuState(BattleMenuStates.Main);

    // Create a cursor, which will be shared by all menus
    this.menuCursor = new Cursor(
      menu2x2NavigationMap,
      menu2x2CursorPositions,
      battleMenuCursorInitialPosition
    );

    // create the cursor game object
    this.menuCursor.createGameObject(scene);
    // store the cursor game object
    this.menuCursorGameObject = this.menuCursor.getGameObject();

    // create Attack submenu
    this.attackMenu = new AttackMenu(scene);

    // add the cursor to the main menu nav contaienr
    this.mainMenu.getContainer().add(this.menuCursorGameObject);

    // create battlemenuObserver
    // this observer will listen for state changes and update the menu accordingly
    const menuObserver = new BattleMenuObserver(this);
    this.stateMachine.addObserver(menuObserver);
  }

  // Putting the class's initial states in an init method
  //so I have more control over when to call these initial states
  // Here, create the game objects and instantiate state machine
  init() {
    this.#inventoryContainer = new InventoryMenu(this.#scene).getGameObject();

    this.#creaturesContainer = new CreaturesMenu(this.#scene).getGameObject();

    const { fleeContainer } = createFleePane(this.#scene);
    this.#fleeContainer = fleeContainer;

    const { displayTextContainer, displayTextObjects } =
      createFullWidthTextDisplayPane(this.#scene, [""]);

    this.#statusMessageContainer = displayTextContainer;
    this.#statusMessageTextObjects = displayTextObjects;
  }

  // Respond to keyboard inputs
  handlePlayerInput(
    input: keyof typeof InputActions | keyof typeof Directions
  ) {
    const { currentMenuState, currentMenuCell } = BattleStateManager.getState();

    // Dispatch state actions
    if (input === InputActions.CANCEL) {
      // do nothing if a cancel action is triggered when the Battle Menu state is Closed
      if (
        BattleStateManager.getState().currentMenuState ===
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
          ? BattleStateManager.getState().currentAttackGrid[currentMenuCell] // choose the correct attack based on the attack grid in state
          : battleMainMenu2x2Grid[currentMenuCell];

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

  /* battle sequence flow:
  show attack used, 
  display message, 
  play attack animation, pause
  play healthbar animation, pause
  transition to other creature and repeat steps
  */
  handleBattleSequence() {
    console.log("handle battle sequence");
    this.#playerAttack();
  }

  // TODO: fix this callback hell
  #playerAttack() {
    this.showStatusMessage(
      [
        `${
          BattleStateManager.getCurrentPlayer()?.name
        } used ${BattleStateManager.getCurrentPlayerAttack()}`,
      ],
      () => {
        this.#scene.time.delayedCall(500, () => {
          BattleStateManager.getCurrentEnemy()?.takeDamage(5, () => {
            this.#enemyAttack();
          });
        });
      }
    );
  }

  #enemyAttack() {
    this.showStatusMessage(
      [
        `Opponent ${
          BattleStateManager.getCurrentEnemy()?.name
        } used ${BattleStateManager.getCurrentEnemyAttack()}`,
      ],
      () => {
        this.#scene.time.delayedCall(500, () => {
          BattleStateManager.getCurrentPlayer()?.takeDamage(5, () => {
            // Show the main menu
            this.stateMachine.updateMenuState(BattleMenuStates.Main);
          });
        });
      }
    );
  }

  // ========= All methods below either create or toggle game objects =========

  showStatusMessage(newMessage: string[], callback?: () => void) {
    // hide submenus
    this.attackMenu.hide();
    // show text container
    updateTextContainer(this.#statusMessageTextObjects, newMessage);
    this.#statusMessageContainer.setAlpha(1);

    if (callback) callback();
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
