import { BaseScene } from "@game/scenes/BaseScene";
import { SceneKeys } from "@game/constants/sceneConstants";
import { BattleBackgroundAssetKeys } from "@game/constants/assetConstants";
import { BattleMenu } from "@game/battle/ui/menu/BattleMenu";
import {
  CreatureTypes,
  Directions,
  InputActions,
  CREATURES,
  BattleStates,
} from "@game/constants/gameConstants";

import { BackgroundImage } from "@game/battle/Background";

import {
  PlayerBattleCreature,
  EnemyBattleCreature,
} from "@game/battle/creatures";

import { BattleStateContext } from "@game/state/BattleStateContext";

import { StateMachine } from "@game/state/StateMachine";

export class BattleScene extends BaseScene {
  #battleMenu!: BattleMenu; // use ! to tell TS that these properties are defined
  #cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
  #activeEnemyCreature!: EnemyBattleCreature;
  #playerCreature!: PlayerBattleCreature;
  #battleStateMachine: StateMachine;
  #battleStateContext: BattleStateContext;

  constructor() {
    super({
      // the scene name, which we can reference throughout game code
      key: SceneKeys.BATTLE_SCENE,
    });
    this.devMode = false; // turn off logging
  }

  // Scene lifecycle events
  create() {
    this.log("create");

    // create background instance
    const background = new BackgroundImage(
      this,
      BattleBackgroundAssetKeys.MEADOW
    );
    background.showBackground();

    // instantiate and initialize the Battle State Context
    this.#battleStateContext = BattleStateContext.getInstance(this);

    // create the enemy creature
    this.#activeEnemyCreature = new EnemyBattleCreature(this, {
      name: CREATURES.TUXEDO_CAT.name,
      assetKey: CREATURES.TUXEDO_CAT.key,
      creatureType: CreatureTypes.ENEMY,
      assetFrame: 0,
      currentHp: 25,
      maxHp: 25,
      baseAttackValue: 10,
      attackIds: [1, 7, 4, 5],
      currentLevel: 9,
      healthStatusScaleFactor: 0.8,
    });

    // create the player creature
    this.#playerCreature = new PlayerBattleCreature(this, {
      name: CREATURES.ORANGE_CAT.name,
      assetKey: CREATURES.ORANGE_CAT.key,
      creatureType: CreatureTypes.PLAYER,
      assetFrame: 0,
      currentHp: 25,
      maxHp: 25,
      baseAttackValue: 10,
      attackIds: [6, 3, 2, 8],
      currentLevel: 7,
    });

    // Set the player creature as the current player
    // This MUST be done before the BattleMenu component is created!!
    // Otherwise, the BattleMenu will not have the currentPlayer data
    this.#battleStateContext.setCurrentPlayer(this.#playerCreature);
    this.#battleStateContext.setCurrentEnemy(this.#activeEnemyCreature);

    // instantiate then render the main menu (the main menu creates the submenus)
    this.#battleMenu = new BattleMenu(this);
    this.#battleMenu.init();

    // Create hotkeys for keyboard input
    this.#cursorKeys = this.input.keyboard?.createCursorKeys();

    // Show the main battle menu
    this.#battleMenu.mainMenu.show();

    // Create battle state machine
    this.#createBattleStateMachine();
  } //end create()

  // Update lifecycle method (called every frame of the game)
  update() {
    // If #cursorKeys are defined, exit
    if (!this.#cursorKeys) return;

    // Mapping of key presses to actions
    const keyPressActions = [
      { keyboardKey: this.#cursorKeys.space, action: InputActions.OK },
      { keyboardKey: this.#cursorKeys.shift, action: InputActions.CANCEL },
      { keyboardKey: this.#cursorKeys.down, action: Directions.DOWN },
      { keyboardKey: this.#cursorKeys.up, action: Directions.UP },
      { keyboardKey: this.#cursorKeys.left, action: Directions.LEFT },
      { keyboardKey: this.#cursorKeys.right, action: Directions.RIGHT },
    ];

    // Iterate over the mapping and handle the first key press
    for (const { keyboardKey, action } of keyPressActions) {
      // JustDown is called only once per key press
      if (Phaser.Input.Keyboard.JustDown(keyboardKey)) {
        this.#battleMenu.handlePlayerInput(action);
        return;
      }
    }
  } //end update()

  #createBattleStateMachine() {
    // Create state machine
    this.#battleStateMachine = new StateMachine("battle", this);

    // add all the states
    this.#battleStateMachine.addState({
      name: BattleStates.INTRO,
      onEnter: () => {
        // wait for scene setup and transitions to complete
        // for now, just simulate the waiting using timer and then transition to PRE_BATTLE state
        this.time.delayedCall(500, () => {
          this.#battleStateMachine.setState(BattleStates.PRE_BATTLE);
        });
      },
    });

    this.#battleStateMachine.addState({
      name: BattleStates.PRE_BATTLE,
      onEnter: () => {
        // wait for enemy to appear on the screen, then notify the player about the creature
        this.#battleMenu.updateTextContainer([
          `A wild ${this.#activeEnemyCreature.name} appeared!`,
        ]);
        // wait for text animation to complete then move to next state
        // for now, simulate the wait using timer
        this.time.delayedCall(500, () => {
          this.#battleStateMachine.setState(BattleStates.CREATURE_INTRO);
        });
      },
    });

    this.#battleStateMachine.addState({
      name: BattleStates.CREATURE_INTRO,
      onEnter: () => {
        // wait for the player's chosen creature to appear on screen
        // then notify the player about their creature
        this.#battleMenu.updateTextContainer([
          `Go ${this.#playerCreature.name} appeared!`,
        ]);
        // wait for text animation to complete then move to next state
        // for now, simulate the wait using timer
        this.time.delayedCall(500, () => {
          this.#battleStateMachine.setState(BattleStates.PLAYER_INPUT);
        });
      },
    });

    this.#battleStateMachine.addState({
      name: BattleStates.PLAYER_INPUT,
      onEnter: () => {
        // show the main battle menu
        this.#battleMenu.mainMenu.show();
        /* battle sequence flow:
        show attack used, 
        display message, 
        play attack animation, pause
        play healthbar animation, pause
        transition to other creature and repeat steps
        */
        this.#battleMenu.playerAttack();
      },
    });

    this.#battleStateMachine.addState({
      name: BattleStates.ENEMY_INPUT,
      onEnter: () => {
        // pick a random move for the enemy monster
        // TODO: implement AI behavior
        this.time.delayedCall(500, () => {
          this.#battleStateMachine.setState(BattleStates.BATTLE);
        });
      },
    });

    this.#battleStateMachine.addState({
      name: BattleStates.BATTLE,
      onEnter: () => {},
    });

    this.#battleStateMachine.addState({
      name: BattleStates.POST_BATTLE,
      onEnter: () => {},
    });

    this.#battleStateMachine.addState({
      name: BattleStates.FINISHED,
      onEnter: () => {},
    });

    this.#battleStateMachine.addState({
      name: BattleStates.FLEE_ATTEMPT,
      onEnter: () => {},
    });

    // Set the initial state
    this.#battleStateMachine.setState("INTRO");
  }
}
