import { createMainMenu } from "@game/battle/ui/menu/battleMenuGameObjects";

import { Cursor } from "@game/battle/ui/menu/submenus/Cursor";
import {
  menu2x2NavigationMap,
  menu2x2CursorPositions,
} from "@game/battle/battleUIConstants";
import { BattleStateManager } from "@game/battle/ui/menu/state/BattleStateManager";

export class BattleMainMenu {
  #scene: Phaser.Scene;
  #mainMenuCursor!: Cursor;
  #mainMenuTextObjects!: Phaser.GameObjects.Text[];
  #mainMenuNav!: Phaser.GameObjects.Container;

  constructor(scene: Phaser.Scene, stateManager: BattleStateManager) {
    this.#scene = scene;

    // create the main menu game objects
    const { textObjects, battleMenuNav, battleMenuCursor } = createMainMenu(
      this.#scene
    );

    this.#mainMenuCursor = new Cursor(
      menu2x2NavigationMap,
      menu2x2CursorPositions,
      battleMenuCursor,
      stateManager
    );

    this.#mainMenuTextObjects = textObjects;
    this.#mainMenuNav = battleMenuNav;

    // hide main menu initially
    this.hide();
  }

  show() {
    // show the main menu text
    this.#mainMenuTextObjects.map((text) => text.setAlpha(1));
    // show the main menu nav
    this.#mainMenuNav.setAlpha(1);
  }

  hide() {
    this.#mainMenuTextObjects.map((text) => text.setAlpha(0));
    this.#mainMenuNav.setAlpha(0);
    this.#mainMenuCursor.resetCursorPosition();
  }

  // get instance of Cursor
  getCursor() {
    return this.#mainMenuCursor;
  }
}
