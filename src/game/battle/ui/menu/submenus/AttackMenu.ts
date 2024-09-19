import {
  battleUITextStyle,
  AttackMenuOptionLabels,
  CursorPositions2x2,
} from "@game/constants/battleUIConstants";

import { BattleStateManager } from "@game/battle/BattleStateManager";

export class AttackMenu {
  // #scene: Phaser.Scene;
  #attackMenu!: Phaser.GameObjects.Container;

  constructor(scene: Phaser.Scene) {
    // this.#scene = scene;
    const attackMenuContainer = this.#createAttackMenuNavContainer(scene);

    this.#attackMenu = attackMenuContainer;
    // hide initially
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
    const { currentPlayer } = BattleStateManager.getState();
    const attackList = currentPlayer?.attackList || [];

    // Create an array to store 4 attack names
    const attackNames: string[] = Array(4).fill(AttackMenuOptionLabels.NO_MOVE);

    // Populate attackNames array with the attack names from attackList
    attackList.forEach((attack, index) => {
      if (attack && index < 4) {
        attackNames[index] = attack.name;
      }
    });

    // Create the attack data grid (assuming 4 moves)
    const newAttackGrid = {
      [CursorPositions2x2.TOP_LEFT]: attackNames[0] || "-",
      [CursorPositions2x2.TOP_RIGHT]: attackNames[1] || "-",
      [CursorPositions2x2.BOTTOM_LEFT]: attackNames[2] || "-",
      [CursorPositions2x2.BOTTOM_RIGHT]: attackNames[3] || "-",
    };

    // update state with the attack data grid
    BattleStateManager.setCurrentAttackGrid(newAttackGrid);

    // Create the phaser text objects for the attack menu
    const attackTextObjects = Object.entries(newAttackGrid).map(
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
