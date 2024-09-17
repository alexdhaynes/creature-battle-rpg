import { BattleAssetKeys } from "@game/assets/assetConstants";
import { HealthBar } from "@game/battle/ui/health/HealthBar";
import { Coordinate, CreatureTypes } from "@game/gameConstants";

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
  scaleFactor?: number; // optionally scale the bg image for the health status container, defaults to 1
  coordinates?: Coordinate; // optionally set the coords for the health status container
}

export class HealthStatus {
  #scene;
  healthBar: HealthBar;
  #creatureName;
  #creatureType;
  #creatureLevel;
  #coordinates;
  #gameObject: Phaser.GameObjects.Container; // a ref to the phaser game object

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
    // create the health status container game object
    this.#gameObject = this.#createHealthStatusContainer(
      config.scaleFactor || 1
    );
  }

  // Create the Player's name text object
  #createCreatureName(creatureName: string) {
    return this.#scene.add.text(30, 20, creatureName, {
      color: "#7e3d3f",
      fontSize: "32px",
    });
  }

  // Render the health status container
  #createHealthStatusContainer(scaleFactor: number) {
    // create the creature name label text object
    const nameTextObject = this.#createCreatureName(this.#creatureName);

    // Add the HP score to container
    // set origin to right-bottom of of its local bounds
    // this is so the right edge of the HP score always aligns with right edge of the health bar,
    // aka: the string will grow on the -x axis; it will never exceed the right edge of the parent container
    const hpTextObject: Phaser.GameObjects.Text | undefined =
      this.#creatureType === CreatureTypes.PLAYER
        ? this.#scene.add
            .text(443, 80, "25/25", {
              color: "#7e3d3f",
              fontSize: "16px",
            })
            .setOrigin(1, 0)
        : undefined;

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

    // Conditionally add the HP score to container if the object exists (if the creature is the player)
    if (hpTextObject) {
      containerObjects.push(hpTextObject);
    }

    return this.#scene.add.container(
      this.#coordinates.x,
      this.#coordinates.y,
      containerObjects
    );
  }
}
