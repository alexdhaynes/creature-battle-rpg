import { BattleAssetKeys } from "@game/assets/assetConstants";
import { HealthBar } from "@game/battle/ui/health/HealthBar";
import { Coordinate, CreatureTypes } from "@game/gameConstants";

// This is the overall health container, including:
// the creature name and their level,
// the HealthBar,
// and the HealthBar label (for the player only)

// todo: move
export const enemyHealthStatusCoordinates: Coordinate = { x: 0, y: 0 };
export const playerHealthStatusCoordinates: Coordinate = { x: 556, y: 318 };

export class HealthStatus {
  #scene;
  healthBar: HealthBar;
  #creatureName;
  #creatureType;
  #coordinates;

  constructor(
    scene: Phaser.Scene,
    creatureName: string,
    creatureType: CreatureTypes,
    coordinates?: Coordinate // coordinates to position the health status container
  ) {
    this.#scene = scene;
    // create the health bar
    this.healthBar = new HealthBar(this.#scene, 34, 34);
    this.#creatureName = creatureName;
    this.#creatureType = creatureType;
    // store the coordinates of the health status container
    this.#coordinates =
      coordinates || creatureType === CreatureTypes.PLAYER
        ? playerHealthStatusCoordinates
        : enemyHealthStatusCoordinates;
    // create the health status container game object
    this.#createHealthStatusContainer();
  }

  // Create the Player's name text object
  #createCreatureName(creatureName: string) {
    return this.#scene.add.text(30, 20, creatureName, {
      color: "#7e3d3f",
      fontSize: "32px",
    });
  }

  // Render the health status container
  #createHealthStatusContainer() {
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
        .setOrigin(0),
      // Add Player Creature Name text object to container
      nameTextObject,
      // Add the health bar to container
      this.healthBar.gameObject,
      // Add the Level text object to container
      // TODO: add the actual level to the creature details
      this.#scene.add.text(nameTextObject.width + 35, 23, "L5", {
        color: "#ED474b",
        fontSize: "28px",
      }),
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

    this.#scene.add.container(
      this.#coordinates.x,
      this.#coordinates.y,
      containerObjects
    );
  }
}
