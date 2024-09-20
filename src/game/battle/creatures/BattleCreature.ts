import {
  Coordinate,
  CreatureTypes,
  CreatureDetails,
  CreatureAttack,
  Polarity,
} from "@game/constants/gameConstants";
import { HealthStatus } from "@game/battle/ui/health/HealthStatus";
import { DataUtils } from "@game/utils/dataUtils";

export class BattleCreature {
  private static _attackData: CreatureAttack[]; // static property to hold the attack data
  protected _scene: Phaser.Scene; // can't make private since this is a base class; but use _ notation to indicate "protected"
  protected _creatureDetails: CreatureDetails;
  protected _gameObject: Phaser.GameObjects.Image; // the game object for the creature
  protected _healthStatus: HealthStatus;
  protected _creatureType: CreatureTypes;
  protected _currentHp: number;
  protected _maxHp: number;
  protected _creatureAttackList: CreatureAttack[];
  protected _creatureLevel: number;

  constructor(
    scene: Phaser.Scene,
    config: CreatureDetails,
    position: Coordinate
  ) {
    this._scene = scene;
    this._creatureDetails = config;
    this._currentHp = this._creatureDetails.currentHp;
    this._maxHp = this._creatureDetails.maxHp;
    this._creatureAttackList = [];
    this._creatureType = this._creatureDetails.creatureType;
    this._creatureLevel = this._creatureDetails.currentLevel || 1;

    // create the creature's game object
    this._gameObject = this._scene.add.image(
      position.x,
      position.y,
      this._creatureDetails.assetKey,
      this._creatureDetails.assetFrame || 0
    );

    // Create the health status component for the creature
    this._healthStatus = this.#createHealthStatus();

    // Load the creature's attack list
    this._creatureDetails.attackIds.map((attackId) => {
      const attackData = DataUtils.getCreatureAttackbyId(this._scene, attackId);

      if (attackData) {
        this._creatureAttackList.push(attackData);
      }
    });
  }

  get isFainted(): boolean {
    return this._currentHp <= 0;
  }

  get name(): string {
    return this._creatureDetails.name;
  }

  get attackList(): CreatureAttack[] {
    // return a copy of the attack list to prevent mutations on the original instance
    return [...this._creatureAttackList];
  }

  get baseAttackValue(): number {
    return this._creatureDetails.baseAttackValue;
  }

  get currentHp(): number {
    return this._currentHp;
  }

  get level(): number {
    return this._creatureLevel;
  }

  // update current creature hp and animated the health bar
  takeDamage(damage: number, callback?: () => void) {
    // Don't let hp go below zero or exceed the max
    this._currentHp =
      this._currentHp - damage <= 0
        ? (this._currentHp = 0)
        : this._currentHp - damage > this._maxHp
        ? (this._currentHp = this._maxHp)
        : (this._currentHp -= damage);

    console.log(
      `this._currentHp ${this._currentHp} - ${damage} =  this._currentHp ${this._currentHp}`
    );

    console.log(
      `${this._creatureDetails.name} took ${damage} points of damage. Current HP is ${this._currentHp}.`
    );

    this._healthStatus.healthBar.setHealthBarPercentageAnimated(
      this._currentHp / this._maxHp,
      { callback }
    );
  }

  // animate faint
  faint(fadeDirection: Polarity = Polarity.Positive, callback?: () => void) {
    let translateYValue = fadeDirection > 0 ? "+=500" : "-=500";

    this._scene.tweens.add({
      targets: this._gameObject,
      alpha: 0,
      y: translateYValue,
      duration: 3000,
      ease: Phaser.Math.Easing.Sine.Out,
      onComplete: () => {
        if (callback) callback();
      },
    });
  }

  // create the health status object for the creature
  #createHealthStatus() {
    const config = {
      creatureName: this._creatureDetails.name,
      creatureType: this._creatureType,
      creatureLevel: this._creatureLevel,
      scaleFactor: this._creatureDetails.healthStatusScaleFactor || 1,
      currentHp: this._currentHp,
      maxHp: this._maxHp,
    };

    return new HealthStatus(this._scene, config);
  }
}
