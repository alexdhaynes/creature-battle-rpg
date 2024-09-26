import {
  battleUITextStyle,
  AttackMenuOptionLabels,
  CursorPositions2x2,
} from "@game/constants/battleUIConstants";
import { CreatureAttack } from "@game/constants/gameConstants";

import { BattleStateContext } from "@game/state/BattleStateContext";

export class AttackMenu {
  // #scene: Phaser.Scene;
  #attackMenu!: Phaser.GameObjects.Container;
  #attackList: CreatureAttack[] | null;
  // battle state context reference
  #battleStateContext: BattleStateContext;

  constructor(scene: Phaser.Scene) {
    // this.#scene = scene;

    // Access the BattleStateContext instance
    this.#battleStateContext = BattleStateContext.getInstance(scene);

    // Get the player's attack list from state and store it here
    const currentPlayer = this.#battleStateContext.getCurrentPlayer();
    this.#attackList = [...(currentPlayer?.attackList || [])];

    const attackMenuContainer = this.#createAttackMenuNavContainer(scene);

    // store a reference to the attack menu's container
    this.#attackMenu = attackMenuContainer;

    // hide the attack menu initially
    this.hide();
  }

  getGameObject() {
    return this.#attackMenu;
  }

  getContainer() {
    return this.#attackMenu;
  }

  // create attacks for a 2x2 grid
  #createAttackMenuNavContainer = (scene: Phaser.Scene) => {
    // Create an array to store 4 attack names
    const attackNames: string[] = Array(4).fill(AttackMenuOptionLabels.NO_MOVE);

    // Populate attackNames array with the attack names from attackList
    this.#attackList?.forEach((attack, index) => {
      if (attack && index < 4) {
        attackNames[index] = attack.name;
      }
    });

    // Create the attack menu using data from the attackList
    const attackMenu = {
      [CursorPositions2x2.TOP_LEFT]: attackNames[0] || "-",
      [CursorPositions2x2.TOP_RIGHT]: attackNames[1] || "-",
      [CursorPositions2x2.BOTTOM_LEFT]: attackNames[2] || "-",
      [CursorPositions2x2.BOTTOM_RIGHT]: attackNames[3] || "-",
    };

    // update the current menu nav in state with the attack data
    this.#battleStateContext.setCurrentMenuNav(attackMenu);

    // Create the phaser text objects for the attack menu
    const attackTextObjects = Object.entries(attackMenu).map(
      ([position, defaultLabel], index) => {
        const attackName = attackNames[index] || defaultLabel;

        // Calculate positions for the text based on the grid enum
        const x =
          position === CursorPositions2x2.TOP_LEFT ||
          position === CursorPositions2x2.BOTTOM_LEFT
            ? 55
            : 240;
        const y =
          position === CursorPositions2x2.TOP_LEFT ||
          position === CursorPositions2x2.TOP_RIGHT
            ? 22
            : 70;

        // Create the text object
        return scene.add.text(x, y, attackName, battleUITextStyle);
      }
    );

    // Add all text objects to a container and return it
    return scene.add.container(0, 448, attackTextObjects);
  };

  // Show the attack menu
  show() {
    this.#attackMenu.setAlpha(1);
  }

  // Hide the attack menu
  hide() {
    this.#attackMenu.setAlpha(0);
  }
}
