import { BattleStateManager } from "@game/state/BattleStateManager";
import { BattleCreature } from "@game/battle/creatures";

import {
  battleUITextStyle,
  BattleMenuOptionLabels,
} from "@game/constants/battleUIConstants";

import {
  createFullWidthBgRect,
  createHalfBgRect,
  createTextContainer,
} from "@game/battle/ui/menu/battleMenuGameObjects";

export class BattleMainMenu {
  //#scene: Phaser.Scene;
  #mainMenuTextObjects!: Phaser.GameObjects.Text[];
  #mainMenuTextContainer: Phaser.GameObjects.Container;
  #mainMenuNav!: Phaser.GameObjects.Container;
  #currentPlayer!: BattleCreature | null;

  constructor(scene: Phaser.Scene) {
    //this.#scene = scene;

    // create the main menu game objects
    const { mainMenuNav, textObjects, textContainer } =
      this.#createMainMenuGameObject(scene);

    this.#mainMenuTextObjects = textObjects;
    this.#mainMenuNav = mainMenuNav;
    this.#mainMenuTextContainer = textContainer;

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
  }

  getContainer() {
    return this.#mainMenuNav;
  }

  /* ============ UI methods ============ */

  // Create Main Menu game object and all of its children
  // <mainMenuContainer>
  #createMainMenuGameObject(scene: Phaser.Scene) {
    const _containerBg = createFullWidthBgRect(scene);
    const { textContainer, textObjects } =
      this.#createBattleMenuInfoPane(scene);
    const mainMenuNav = this.#createMainNav(scene);

    const mainMenuContainer = scene.add.container(0, 448, [
      _containerBg,
      textContainer,
      mainMenuNav,
    ]);

    return {
      textContainer,
      textObjects,
      mainMenuContainer,
      mainMenuNav,
    };
  }

  // Create text container for info pane text
  // TODO: this container should be shared by all submenus!
  #createBattleMenuInfoPane(scene: Phaser.Scene) {
    const { currentPlayer } = BattleStateManager.getState();

    const { textContainer, textObjects } = createTextContainer(
      scene,
      ["What should", `${currentPlayer?.name} do next?`],
      0,
      0
    );

    return {
      textContainer,
      textObjects,
    };
  }

  // Create the Nav items on the main menu
  #createMainNav(scene: Phaser.Scene) {
    // Create container for mainMenuNavItems
    const _navItems = scene.add.container(0, 0, [
      scene.add.text(55, 22, BattleMenuOptionLabels.FIGHT, battleUITextStyle),
      scene.add.text(240, 22, BattleMenuOptionLabels.SWITCH, battleUITextStyle),
      scene.add.text(55, 70, BattleMenuOptionLabels.ITEM, battleUITextStyle),
      scene.add.text(240, 70, BattleMenuOptionLabels.FLEE, battleUITextStyle),
    ]);

    // Create a container for main manu nav;
    // position it to the right
    return scene.add.container(520, 0, [
      createHalfBgRect(scene).setDepth(1), // container background
      _navItems.setDepth(2), // nav items
    ]);
  }
}
