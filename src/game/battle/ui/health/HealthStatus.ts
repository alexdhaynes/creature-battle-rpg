import { BattleAssetKeys } from "@game/constants/assetConstants";
import { HealthBar } from "@game/battle/ui/health/HealthBar";
import { Coordinate, CreatureTypes } from "@game/constants/gameConstants";

// This is the overall health container, including:
// the creature name and their level,
// the HealthBar,
// and the HealthBar label (for the player only)

export const enemyHealthStatusCoordinates: Coordinate = { x: 0, y: 0 };
export const playerHealthStatusCoordinates: Coordinate = { x: 556, y: 318 };

interface HealthStatusConfig {
  creatureName: string;
  creatureType: CreatureTypes;
  creatureLevel: number;
  currentHp: number;
  maxHp: number;
  scaleFactor?: number; // optionally scale the bg image for the health status container, defaults to 1
  coordinates?: Coordinate; // optionally set the coords for the health status container
}

export class HealthStatus {
  #scene;
  healthBar: HealthBar;
  #creatureName;
  #creatureType;
  #creatureLevel;
  #currentHp: number;
  #maxHp: number;
  #coordinates;
  #gameObjectContainer: Phaser.GameObjects.Container; // a ref to the phaser game object
  #textObject!: Phaser.GameObjects.Text; // a ref to the text object

  constructor(scene: Phaser.Scene, config: HealthStatusConfig) {
    this.#scene = scene;
    // create the health bar
    this.healthBar = new HealthBar(this.#scene, 34, 34);
    this.#creatureName = config.creatureName;
    this.#creatureType = config.creatureType;
    // store the coordinates of the health status container
    this.#creatureLevel = config.creatureLevel;
    this.#coordinates =
      config.coordinates || config.creatureType === CreatureTypes.PLAYER
        ? playerHealthStatusCoordinates
        : enemyHealthStatusCoordinates;
    // create the health status container game object and scale it if necessary
    this.#currentHp = config.currentHp; // Todo: currentHp should be in state
    this.#maxHp = config.maxHp;

    const { container, hpTextObject } = this.#createHealthStatusContainer(
      config.scaleFactor || 1
    );

    this.#gameObjectContainer = container;
    if (hpTextObject) {
      this.#textObject = hpTextObject;
      // add the text object to the container
      this.#gameObjectContainer.add(hpTextObject);
      this.#setHealthStatusText();
    }
  }

  setCurrentHp(newHp: number) {
    this.#currentHp = newHp;
    this.#setHealthStatusText();
  }

  // Create the Player's name text object
  #createCreatureName(creatureName: string) {
    return this.#scene.add.text(30, 20, creatureName, {
      color: "#7e3d3f",
      fontSize: "32px",
    });
  }

  #setHealthStatusText() {
    this.#textObject.setText(`${this.#currentHp}/${this.#maxHp}`);
  }

  // Render the health status container
  #createHealthStatusContainer(scaleFactor: number) {
    // create the creature name label text object
    const nameTextObject = this.#createCreatureName(this.#creatureName);
    let hpTextObject = undefined;
    // Add the HP score to container
    // set origin to right-bottom of of its local bounds
    // this is so the right edge of the HP score always aligns with right edge of the health bar,
    // aka: the string will grow on the -x axis; it will never exceed the right edge of the parent container
    if (this.#creatureType === CreatureTypes.PLAYER) {
      hpTextObject = this.#scene.add
        .text(443, 80, "25/25", {
          color: "#7e3d3f",
          fontSize: "16px",
        })
        .setOrigin(1, 0);
    }

    const containerObjects = [
      // Add a bgimage object to container
      this.#scene.add
        .image(0, 0, BattleAssetKeys.HEALTH_BAR_BACKGROUND)
        .setOrigin(0)
        .setScale(1, scaleFactor), // scale the background image
      // Add Player Creature Name text object to container
      nameTextObject,
      // Add the health bar to container
      this.healthBar.gameObject,
      // Add the Level text object to container
      // TODO: add a dynamic level for the creature here
      this.#scene.add.text(
        nameTextObject.width + 35,
        23,
        `L${this.#creatureLevel}`,
        {
          color: "#ED474b",
          fontSize: "28px",
        }
      ),
      // Add the HP label to container
      this.#scene.add.text(30, 55, "HP", {
        color: "#FF6505",
        fontSize: "24px",
        fontStyle: "italic",
      }),
    ];

    if (this.#creatureType === CreatureTypes.PLAYER) {
    }

    const container = this.#scene.add.container(
      this.#coordinates.x,
      this.#coordinates.y,
      containerObjects
    );

    return {
      container,
      hpTextObject,
    };
  }
}
