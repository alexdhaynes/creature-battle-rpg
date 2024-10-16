import {
  battleMainMenu2x2Grid,
  battleMenuCursorInitialPosition,
  menu2x2NavigationMap,
  menu2x2CursorPositions,
  BattleMenuOptionLabels,
} from "@game/constants/battleUIConstants";

import {
  BattleStates,
  Directions,
  InputActions,
  Polarity,
} from "@game/constants/gameConstants";

import { BattleStateContext } from "@game/state/BattleStateContext";

import { BattleMenuStates } from "@game/constants/gameConstants";

import {
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
import { StateMachine } from "@game/state/StateMachine";

export class BattleMenu {
  #scene: Phaser.Scene;
  // game objects

  // the containers for the menu items
  #inventoryContainer!: Phaser.GameObjects.Container;
  #creaturesContainer!: Phaser.GameObjects.Container;
  // the container for status messages
  #statusMessageContainer!: Phaser.GameObjects.Container;
  #statusMessageTextObjects!: Phaser.GameObjects.Text[];
  // battle state context reference
  #battleStateContext: BattleStateContext;

  // reference to battle state machine
  #battleStateMachine: StateMachine;

  // main menu
  mainMenu!: BattleMainMenu;
  // attackMenu
  attackMenu!: AttackMenu;

  // store a reference to the current cursor
  menuCursor!: Cursor;
  menuCursorGameObject!: Phaser.GameObjects.Image;

  // Set initial states
  constructor(scene: Phaser.Scene, stateMachine: StateMachine) {
    this.#scene = scene;

    // Store a reference to the battle state machine (defined in BattleScene)
    this.#battleStateMachine = stateMachine;

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
        `CANCEL menu item: ${battleMainMenu2x2Grid[currentMenuCell]}`
      );

      // move to the main menu
      this.moveToMainMenu();

      return;
    }
    // Handle "OK" action on the Main Menu or any submenus
    // Submenus include Status Message and all Nav menus
    if (input === InputActions.OK) {
      // Handle "OK" on Status Messages:

      // if the user clicks ok on a prebattle status message,
      // proceed to creature intro
      if (
        this.#battleStateContext.getCurrentBattleState() ==
        BattleStates.PRE_BATTLE
      ) {
        this.#battleStateMachine.setState(BattleStates.CREATURE_INTRO);
        return;
      }

      // if the user clicks ok on a creature intro status message,
      // proceed to player_input
      if (
        this.#battleStateContext.getCurrentBattleState() ==
        BattleStates.CREATURE_INTRO
      ) {
        this.#battleStateMachine.setState(BattleStates.PLAYER_INPUT);
        return;
      }

      // Handle "OK" on Submenus:
      const menuItem =
        this.#battleStateContext.getCurrentMenuNav()[currentMenuCell];

      if (
        [
          BattleMenuOptionLabels.FIGHT,
          BattleMenuOptionLabels.FLEE,
          BattleMenuOptionLabels.ITEM,
          BattleMenuOptionLabels.SWITCH,
        ].includes(menuItem as BattleMenuOptionLabels)
      ) {
        // choose the correct menu item based on the currently visible menu
        // If the user clicks "ok" on a Main menu nav item
        this.handleMainMenuNavItemOk(menuItem);
        return;
      }

      // If the user clicks "ok" on an Attack menu nav item
      const attackListStrings = this.attackMenu.attackList?.map(
        (attack) => attack.name
      );
      // Update the context with the selected attack
      if (attackListStrings?.includes(menuItem)) {
        this.handleAttackMenuNavItemOk(menuItem);
      }
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
              // set battle state machine to enemy input
              this.#battleStateMachine.setState(BattleStates.ENEMY_INPUT);
            });
        } else {
          this.#battleStateContext
            .getCurrentEnemy()
            ?.takeDamage(damage!, () => {
              // set battle state machine to enemy input
              this.#battleStateMachine.setState(BattleStates.ENEMY_INPUT);
            });
        }
      });
    });
  }

  // Move to the main menu
  // Show all the main menu game objects; hide all the irrelvant game objects
  moveToMainMenu() {
    // hide all the submenus
    this.hideSubmenus();
    // move to the main menu
    this.mainMenu.show();
    // add the cursor to the main menu nav contaienr
    this.mainMenu.getContainer().add(this.menuCursorGameObject);
    // reset the cursor position
    this.menuCursor.resetCursorPosition();
    // set the main menu as the current menu in state
    this.#battleStateContext.setCurrentMenuNav(battleMainMenu2x2Grid);
  }

  // Hide all the submenus
  hideSubmenus() {
    // hide any status messages and all the submenus
    this.hideStatusMessage();
    this.attackMenu.hide();
    this.hideInventoryPane();
    this.hideCreaturesPane();
  }

  handleMainMenuNavItemOk(menuItem: string) {
    console.log(`OK man nav menu item ${menuItem}`);
    // Main menu items
    switch (menuItem) {
      // Move to the fight menu
      case BattleMenuOptionLabels.FIGHT:
        this.mainMenu.hide();
        this.attackMenu.show();
        // add the cursor to the attack menu nav contaienr
        this.attackMenu.getContainer().add(this.menuCursorGameObject);
        // reset the cursor
        this.menuCursor.resetCursorPosition();
        // get the attack menu
        const attackMenu = this.#battleStateContext.getAttackMenuNav();
        // set the attack menu as the current menu in state
        this.#battleStateContext.setCurrentMenuNav(attackMenu);
        break;

      // Move to the inventory
      case BattleMenuOptionLabels.ITEM:
        this.mainMenu.hide();
        this.showInventoryPane();
        break;

      // Move to the creature pane
      case BattleMenuOptionLabels.SWITCH:
        this.mainMenu.hide();
        this.showCreaturesPane();
        break;

      // Show flee text
      case BattleMenuOptionLabels.FLEE:
        this.mainMenu.hide();
        this.#battleStateMachine.setState(BattleStates.FLEE_ATTEMPT);
        break;
    }
  }

  handleAttackMenuNavItemOk(menuItem: string) {
    console.log(`OK attack nav menu item ${menuItem}`);
    const currentAttack = this.attackMenu.attackList?.filter(
      (attack) => attack.name === menuItem
    );
    // If the current attack exists, update the context
    if (currentAttack) {
      this.#battleStateContext.setCurrentPlayerAttack(currentAttack[0]);
      // invoke player attack
      this.playerAttack();
    }
  }

  enemyAttack() {
    const enemy = this.#battleStateContext.getCurrentEnemy();
    const player = this.#battleStateContext.getCurrentPlayer();

    if (enemy?.isFainted) {
      // update battle State Machine to post-battle
      this.#battleStateMachine.setState(BattleStates.FINISHED);
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

          // after takeDamage() finishes animating, move onto postBattleSequence after a short delay
          player?.takeDamage(damage, () => {
            this.#scene.time.delayedCall(500, () => {
              // update battle State Machine to post-battle
              this.#battleStateMachine.setState(BattleStates.POST_BATTLE);
            });
          });
        }
      );
    }
  }

  handleFaint(
    entity: BattleCreature,
    faintDirection: number,
    faintMessage: string[],
    callback: () => void
  ) {
    this.showStatusMessage(faintMessage, () => {
      entity.faint(faintDirection, () => {
        // execute the callback
        callback();
      });
    });
  }

  postBattleSequence() {
    const currentEnemy = this.#battleStateContext.getCurrentEnemy();
    const currentPlayer = this.#battleStateContext.getCurrentPlayer();

    // if the opponent has fainted, show a message then update the battle state
    if (currentEnemy?.isFainted) {
      this.handleFaint(
        currentEnemy,
        Polarity.Negative,
        [
          `Wild ${currentEnemy?.name} has fainted.`,
          `${currentPlayer?.name} has gained some experience.`,
        ],
        () => this.#battleStateMachine.setState(BattleStates.FINISHED)
      );

      return;
    }

    // if the player has fainted, show a message and then update the battle state
    if (currentPlayer?.isFainted) {
      this.#battleStateMachine.setState(BattleStates.FINISHED);

      this.handleFaint(
        currentPlayer,
        Polarity.Positive,
        [
          `Wild ${currentPlayer?.name} has fainted.`,
          `You have no more creatures, escaping to safety...`,
        ],
        () => this.#battleStateMachine.setState(BattleStates.FINISHED)
      );

      return;
    }

    // otherwise, update the state to Player Input
    // (which moves back to main menu)
    this.#battleStateMachine.setState(BattleStates.PLAYER_INPUT);
  }

  transitionToNextScene() {
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
    this.hideSubmenus();
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
}
