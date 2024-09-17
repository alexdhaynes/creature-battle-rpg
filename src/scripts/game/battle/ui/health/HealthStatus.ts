import {
  BattleAssetKeys,
  CreatureAssetKeys,
  creatureNames,
} from "@game/assets/assetConstants";
import { HealthBar } from "@game/battle/ui/health/HealthBar";

// This is the overall health container, including:
// the creature name and their level,
// the HealthBar,
// and the HealthBar label (for the player only)

export class HealthStatus {
  #scene;
  #enemyCreatureName;
  #playerCreatureName;
  #playerHealthBar;
  #enemyHealthBar;

  constructor(scene: Phaser.Scene) {
    this.#scene = scene;
    this.#enemyCreatureName = this.#createEnemyCreatureName();
    this.#playerCreatureName = this.#createPlayerCreatureName();
    this.#playerHealthBar = new HealthBar(this.#scene, 34, 34).container;
    this.#enemyHealthBar = new HealthBar(this.#scene, 34, 34).container;
  }

  // A render method
  // creates the player and enemy health status containers
  init() {
    this.#createPlayerHealthStatusContainer();
    this.#createEnemyHealthStatusContainer();
  }

  // Create the Player's name label
  #createPlayerCreatureName() {
    const _playerCreatureName = this.#scene.add.text(
      30,
      20,
      creatureNames[CreatureAssetKeys.ORANGE_CAT],
      {
        color: "#7e3d3f",
        fontSize: "32px",
      }
    );

    return _playerCreatureName;
  }

  // Create the Enemy's name label
  #createEnemyCreatureName() {
    const _enemyCreatureName = this.#scene.add.text(
      30,
      20,
      creatureNames[CreatureAssetKeys.TUXEDO_CAT],
      {
        color: "#7e3d3f",
        fontSize: "32px",
      }
    );

    return _enemyCreatureName;
  }

  // Render the player health status container
  #createPlayerHealthStatusContainer() {
    this.#scene.add.container(556, 318, [
      // add bgimage to container
      this.#scene.add
        .image(0, 0, BattleAssetKeys.HEALTH_BAR_BACKGROUND)
        .setOrigin(0),
      // Add Player Creature Name label to container
      this.#playerCreatureName,
      // Add the health bar to container
      this.#playerHealthBar,
      // Add the Level label to container
      this.#scene.add.text(this.#playerCreatureName.width + 35, 23, "L5", {
        color: "#ED474b",
        fontSize: "28px",
      }),
      // Add the HP label to container
      this.#scene.add.text(30, 55, "HP", {
        color: "#FF6505",
        fontSize: "24px",
        fontStyle: "italic",
      }),
      // Add the HP score to container
      // set origin to right-bottom of of its local bounds
      // this is so the right edge of the HP score always aligns with right edge of the health bar,
      // aka: the string will grow on the -x axis; it will never exceed the right edge of the parent container
      this.#scene.add
        .text(443, 80, "25/25", {
          color: "#7e3d3f",
          fontSize: "16px",
        })
        .setOrigin(1, 0),
    ]);
  }

  // Render the enemy's health status container
  #createEnemyHealthStatusContainer() {
    // render the enemy health status container
    this.#scene.add.container(0, 0, [
      // add bg image to container
      this.#scene.add
        .image(0, 0, BattleAssetKeys.HEALTH_BAR_BACKGROUND)
        .setOrigin(0)
        .setScale(1, 0.8), // reduce y-scale of enemy health status container to accommodate for no HP score label
      // Add Enemy Creature Name label to container
      this.#enemyCreatureName,
      // Add the health bar to container
      this.#enemyHealthBar,
      // Add the Level label to container
      this.#scene.add.text(this.#enemyCreatureName.width + 35, 23, "L5", {
        color: "#ED474b",
        fontSize: "28px",
      }),
      // Add the HP label to container
      this.#scene.add.text(30, 55, "HP", {
        color: "#FF6505",
        fontSize: "24px",
        fontStyle: "italic",
      }),
    ]);
  }
}
