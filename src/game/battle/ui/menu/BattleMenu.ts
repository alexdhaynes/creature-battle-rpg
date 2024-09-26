import {
  battleMainMenu2x2Grid,
  battleMenuCursorInitialPosition,
  menu2x2NavigationMap,
  menu2x2CursorPositions,
} from "@game/constants/battleUIConstants";

import {
  Directions,
  InputActions,
  Polarity,
} from "@game/constants/gameConstants";

import { BattleStateContext } from "@game/state/BattleStateContext";

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
import { SceneKeys } from "@game/constants/sceneConstants";
import { BattleCreature } from "@game/battle/creatures";

export class BattleMenu {
  #scene: Phaser.Scene;
  // game objects

  // the containers for the menu items
  #inventoryContainer!: Phaser.GameObjects.Container;
  #creaturesContainer!: Phaser.GameObjects.Container;
  #fleeContainer!: Phaser.GameObjects.Container;
  // the container for status messages
  #statusMessageContainer!: Phaser.GameObjects.Container;
  #statusMessageTextObjects!: Phaser.GameObjects.Text[];
  // battle state context reference
  #battleStateContext: BattleStateContext;

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

    // create Main Menu
    this.mainMenu = new BattleMainMenu(scene);

    // Access the BattleStateContext instance
    this.#battleStateContext = BattleStateContext.getInstance(scene);

    // Set the current menu to the main menu
    this.#battleStateContext.setCurrentOpenMenu(BattleMenuStates.Main);

    // Create a cursor, which will be shared by all menus
    this.menuCursor = new Cursor(
      this.#scene,
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
    const currentOpenMenu = this.#battleStateContext.getCurrentOpenMenu();
    const currentMenuCell = this.#battleStateContext.getCurrentMenuCell();

    // Dispatch state actions
    if (input === InputActions.CANCEL) {
      // do nothing if a cancel action is triggered when the Battle Menu state is Closed
      if (currentOpenMenu === BattleMenuStates.Closed) return;

      console.log(
        `input is cancel for menu item: ${battleMainMenu2x2Grid[currentMenuCell]}`
      );

      return;
    }
    // Show the selected nav menu
    if (input === InputActions.OK) {
      const menuItem =
        this.#battleStateContext.getCurrentMenuNav()[currentMenuCell]; // choose the correct menu item based on the currently visible menu

      console.log(`input is ok for menu item: ${menuItem}`);

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

  // expose the updateTextContainer message
  updateTextContainer(message: string[]) {
    return updateTextContainer(this.#statusMessageTextObjects, message);
  }

  playerAttack() {
    const player = this.#battleStateContext.getCurrentPlayer();
    const playerAttack = this.#battleStateContext.getCurrentPlayerAttack();
    const damage = playerAttack?.damage || player?.baseAttackValue;
    let message = [`${player?.name} used ${playerAttack?.name}`];

    if (damage && damage < 0) {
      message = [`${player?.name} used a healing move: ${playerAttack?.name}`];
    }

    this.showStatusMessage(message, () => {
      this.#scene.time.delayedCall(500, () => {
        // If the damage is negative, heal the player instead
        if (damage && damage < 0) {
          // (call takeDamage on self with negative value to heal)
          this.#battleStateContext
            .getCurrentPlayer()
            ?.takeDamage(damage, () => {
              this.#enemyAttack();
            });
        } else {
          this.#battleStateContext
            .getCurrentEnemy()
            ?.takeDamage(damage!, () => {
              this.#enemyAttack();
            });
        }
      });
    });
  }

  #enemyAttack() {
    const enemy = this.#battleStateContext.getCurrentEnemy();
    const player = this.#battleStateContext.getCurrentPlayer();

    if (enemy?.isFainted) {
      this.#postBattleSequence();
      return;
    }
    // choose an enemy attack
    const enemyAttackList = enemy?.attackList;
    if (enemyAttackList) {
      const randomIndex = Math.floor(Math.random() * enemyAttackList.length);
      const newAttack = enemyAttackList[randomIndex];

      this.#battleStateContext.setCurrentEnemyAttack(newAttack);

      this.showStatusMessage(
        [`Opponent ${enemy?.name} used ${newAttack?.name}`],
        () => {
          const damage = newAttack?.damage || enemy.baseAttackValue;

          this.#scene.time.delayedCall(500, () => {
            player?.takeDamage(damage, () => {
              this.#postBattleSequence();
            });
          });
        }
      );
    }
  }

  // TODO: rewrite using promises
  #postBattleSequence() {
    const currentEnemy = this.#battleStateContext.getCurrentEnemy();
    const currentPlayer = this.#battleStateContext.getCurrentPlayer();

    const _handleFaint = (
      entity: BattleCreature,
      faintDirection: number,
      faintMessage: string[],
      callback: () => void
    ) => {
      this.showStatusMessage(faintMessage, () => {
        entity.faint(faintDirection, () => {
          console.log("ran faint animation");
          // transition to next scene after a short delay
          this.#scene.time.delayedCall(500, callback);
        });
      });
    };

    // if the opponent has fainted, show a message then transition to next scene
    if (currentEnemy?.isFainted) {
      _handleFaint(
        currentEnemy,
        Polarity.Negative,
        [
          `Wild ${currentEnemy?.name} has fainted.`,
          `${currentPlayer?.name} has gained some experience.`,
        ],
        () => this.#transitionToNextScene()
      );
      return;
    }

    // if the player has fainted, show a message and transition to next scene
    if (currentPlayer?.isFainted) {
      _handleFaint(
        currentPlayer,
        Polarity.Positive,
        [
          `Wild ${currentPlayer?.name} has fainted.`,
          `You have no more creatures, escaping to safety...`,
        ],
        () => this.#transitionToNextScene()
      );
      return;
    }

    // otherwise, move back to the main menu
    // BACK TO MAIN MENU
    this.hideStatusMessage();
    this.mainMenu.show();
  }

  #transitionToNextScene() {
    this.#scene.cameras.main.fadeOut(600, 0, 0, 0);
    this.#scene.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, //listen for the fade out event on the camera
      () => {
        // trigger a callback when the fade out is done
        this.#scene.scene.start(SceneKeys.BATTLE_SCENE); //start the battle scene
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
