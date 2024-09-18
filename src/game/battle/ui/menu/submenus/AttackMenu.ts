import {
  battleUITextStyle,
  AttackMenuOptionLabels,
} from "@game/battle/battleUIConstants";

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

    BattleStateManager;

    console.log("current player: ");
  }

  getGameObject() {
    return this.#attackMenu;
  }

  getContainer() {
    return this.#attackMenu;
  }

  // Create Attack Menu
  #createAttackMenuNavContainer = (scene: Phaser.Scene) => {
    return scene.add.container(0, 448, [
      scene.add.text(55, 22, AttackMenuOptionLabels.MOVE_1, battleUITextStyle),
      scene.add.text(240, 22, AttackMenuOptionLabels.MOVE_2, battleUITextStyle),
      scene.add.text(55, 70, AttackMenuOptionLabels.NO_MOVE, battleUITextStyle),
      scene.add.text(
        240,
        70,
        AttackMenuOptionLabels.NO_MOVE,
        battleUITextStyle
      ),
    ]);
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
