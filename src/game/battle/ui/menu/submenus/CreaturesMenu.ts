import { createTextContainer } from "@game/battle/ui/menu/battleMenuGameObjects";

export class CreaturesMenu {
  // #scene: Phaser.Scene;
  #creaturesMenu!: Phaser.GameObjects.Container;

  constructor(scene: Phaser.Scene) {
    // this.#scene = scene;
    const { creaturesContainer } = this.#createCreaturesMenuContainer(scene);

    this.#creaturesMenu = creaturesContainer;
    // hide initially
    this.hide();
  }

  getGameObject() {
    return this.#creaturesMenu;
  }

  // Create Creatures Menu
  #createCreaturesMenuContainer = (scene: Phaser.Scene) => {
    // Create text container for creatures pane text
    const { textContainer, textObjects } = createTextContainer(
      scene,
      ["There are no creatures", "in your party..."],
      0,
      0
    );

    const creaturesContainer = scene.add
      .container(0, 448, [textContainer])
      .setAlpha(0); // hide initially

    return {
      creaturesContainer,
      textContainer,
      textObjects,
    };
  };

  // Show the attack menu
  show() {
    this.#creaturesMenu.setAlpha(1);
  }

  // Hide the attack menu
  hide() {
    this.#creaturesMenu.setAlpha(0);
  }
}
