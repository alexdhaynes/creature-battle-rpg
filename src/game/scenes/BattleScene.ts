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

    // Register a callback, which will run when the battle state is updated
    this.#battleStateContext.onBattleStateUpdated((newState) => {
      console.log(
        "BattleScene > onBattleStateUpdated() > Battle State Updated to new state:",
        newState
      );
    });

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

    // Create hotkeys for keyboard input
    this.#cursorKeys = this.input.keyboard?.createCursorKeys();

    // Create battle state machine
    this.#createBattleStateMachine();

    // Set the initial battle state
    this.#battleStateMachine.setState("INTRO");

    // instantiate then render the main menu (the main menu creates the submenus)
    this.#battleMenu = new BattleMenu(this, this.#battleStateMachine);
    this.#battleMenu.init();
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
        // set the battle state context
        this.#battleStateContext.setCurrentBattleState(BattleStates.INTRO);
        // TODO: wait for scene setup and transitions to complete
        // for now, just simulate the waiting using timer and then transition to PRE_BATTLE state
        this.time.delayedCall(800, () => {
          this.#battleStateMachine.setState(BattleStates.PRE_BATTLE);
        });
      },
    });

    this.#battleStateMachine.addState({
      name: BattleStates.PRE_BATTLE,
      onEnter: () => {
        // set the battle state context
        this.#battleStateContext.setCurrentBattleState(BattleStates.PRE_BATTLE);
        // wait for enemy to appear on the screen, then notify the player about the creature
        this.#battleMenu.showStatusMessage([
          `A wild ${this.#activeEnemyCreature.name} appeared!`,
        ]);
      },
    });

    this.#battleStateMachine.addState({
      name: BattleStates.CREATURE_INTRO,
      onEnter: () => {
        // set the battle state context
        this.#battleStateContext.setCurrentBattleState(
          BattleStates.CREATURE_INTRO
        );
        // wait for the player's chosen creature to appear on screen
        // then notify the player about their creature
        this.#battleMenu.showStatusMessage([
          `Go ${this.#playerCreature.name}!`,
        ]);
      },
    });

    this.#battleStateMachine.addState({
      name: BattleStates.PLAYER_INPUT,
      onEnter: () => {
        // set the battle state context
        this.#battleStateContext.setCurrentBattleState(
          BattleStates.PLAYER_INPUT
        );
        // show the main battle menu
        this.#battleMenu.moveToMainMenu();
      },
    });

    this.#battleStateMachine.addState({
      name: BattleStates.ENEMY_INPUT,
      onEnter: () => {
        // set the battle state context
        this.#battleStateContext.setCurrentBattleState(
          BattleStates.ENEMY_INPUT
        );
        // pick a random move for the enemy monster
        // TODO: implement AI behavior
        this.time.delayedCall(500, () => {
          this.#battleStateMachine.setState(BattleStates.BATTLE);
        });
      },
    });

    this.#battleStateMachine.addState({
      name: BattleStates.BATTLE,
      onEnter: () => {
        // set the battle state context
        this.#battleStateContext.setCurrentBattleState(BattleStates.BATTLE);
      },
    });

    this.#battleStateMachine.addState({
      name: BattleStates.POST_BATTLE,
      onEnter: () => {
        // set the battle state context
        this.#battleStateContext.setCurrentBattleState(
          BattleStates.POST_BATTLE
        );
      },
    });

    this.#battleStateMachine.addState({
      name: BattleStates.FINISHED,
      onEnter: () => {
        // set the battle state context
        this.#battleStateContext.setCurrentBattleState(BattleStates.FINISHED);
      },
    });

    this.#battleStateMachine.addState({
      name: BattleStates.FLEE_ATTEMPT,
      onEnter: () => {
        // set the battle state context
        this.#battleStateContext.setCurrentBattleState(
          BattleStates.FLEE_ATTEMPT
        );
      },
    });
  }
}
