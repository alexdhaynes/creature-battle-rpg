import { createTextContainer } from "@game/battle/ui/menu/battleMenuGameObjects";

export class InventoryMenu {
  // #scene: Phaser.Scene;
  #inventoryMenu!: Phaser.GameObjects.Container;

  constructor(scene: Phaser.Scene) {
    // this.#scene = scene;
    const { inventoryContainer } = this.#createInventoryMenuContainer(scene);

    this.#inventoryMenu = inventoryContainer;
    // hide initially
    this.hide();
  }

  getGameObject() {
    return this.#inventoryMenu;
  }

  // Create Inventory Menu
  #createInventoryMenuContainer = (scene: Phaser.Scene) => {
    // Create text container for inventory pane text
    const { textContainer, textObjects } = createTextContainer(
      scene,
      ["There are no items", "in the inventory..."],
      0,
      0
    );

    const inventoryContainer = scene.add
      .container(0, 448, [textContainer])
      .setAlpha(0); // hide initially

    return {
      inventoryContainer,
      textContainer,
      textObjects,
    };
  };

  // Show the attack menu
  show() {
    this.#inventoryMenu.setAlpha(1);
  }

  // Hide the attack menu
  hide() {
    this.#inventoryMenu.setAlpha(0);
  }
}
