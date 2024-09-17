import { BaseScene } from "@game/scenes/BaseScene";
import { SceneKeys } from "@scripts/game/scenes/sceneConstants";
import { BattleBackgroundAssetKeys } from "@scripts/game/assets/assetConstants";
import { BattleMenu } from "@game/battle/ui/menu/BattleMenu";
import {
  CreatureTypes,
  Directions,
  InputActions,
  CREATURES,
} from "@scripts/game/gameConstants";
import { BackgroundImage } from "@game/battle/Background";
import { EnemyBattleCreature } from "@game/battle/creatures/EnemyBattleCreature";
import { BattleCreature } from "@game/battle/creatures/BattleCreature";

export class BattleScene extends BaseScene {
  #battleMenu!: BattleMenu; // use ! to tell TS that these properties are defined
  #cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
  #activeEnemyCreature!: EnemyBattleCreature;
  #playerCreature!: BattleCreature;

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

    // add the enemy creature
    this.#activeEnemyCreature = new EnemyBattleCreature(this, {
      name: CREATURES.TUXEDO_CAT.name,
      assetKey: CREATURES.TUXEDO_CAT.key,
      creatureType: CreatureTypes.ENEMY,
      assetFrame: 0,
      currentHp: 25,
      maxHp: 25,
      baseAttackValue: 5,
      attackIds: [],
    });

    // add the player creature
    this.#playerCreature = new BattleCreature(
      this,
      {
        name: CREATURES.ORANGE_CAT.name,
        assetKey: CREATURES.ORANGE_CAT.key,
        creatureType: CreatureTypes.PLAYER,
        assetFrame: 0,
        currentHp: 15,
        maxHp: 15,
        baseAttackValue: 7,
        attackIds: [],
      },
      { x: 256, y: 318 }
    );

    // instantiate then render the main info and sub info pane
    this.#battleMenu = new BattleMenu(this);
    this.#battleMenu.init();
    // Show the main battle menu
    this.#battleMenu.mainMenu.show();

    // Create hotkeys for keyboard input
    this.#cursorKeys = this.input.keyboard?.createCursorKeys();
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
}
