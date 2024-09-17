import { Coordinate, CreatureTypes } from "@game/gameConstants";
import { HealthStatus } from "@game/battle/ui/health/HealthStatus";

export type CreatureDetails = {
  name: string;
  assetKey: string;
  creatureType: CreatureTypes;
  assetFrame?: number;
  maxHp: number;
  currentHp: number;
  baseAttackValue: number; // the base damage value for a creature's attack
  attackIds: number[];
};

export type CreatureAttack = {
  id: number;
  name: string;
  animationKey: string;
};

export class BattleCreature {
  protected _scene: Phaser.Scene; // can't make private since this is a base class; but use _ notation to indicate "protected"
  protected _creatureDetails: CreatureDetails;
  protected _gameObject: Phaser.GameObjects.Image;
  protected _healthStatus: HealthStatus;
  protected _creatureType: CreatureTypes;
  protected _currentHp: number;
  protected _maxHp: number;
  protected _creatureAttackList: CreatureAttack[];

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

    this._gameObject = this._scene.add.image(
      position.x,
      position.y,
      this._creatureDetails.assetKey,
      this._creatureDetails.assetFrame || 0
    );

    this._healthStatus = this.#createHealthStatus();
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

  // update current creature hp and animated the health bar
  takeDamage(damage: number, callback?: () => void) {
    this._currentHp -= damage;
    if (this._currentHp < 0) {
      this._currentHp = 0; // prevent damange from going negative
    }
    this._healthStatus.healthBar.setHealthBarPercentageAnimated(
      this._currentHp / this._maxHp,
      { callback }
    );
  }

  // create the health status object for the creature
  #createHealthStatus() {
    return new HealthStatus(
      this._scene,
      this._creatureDetails.name,
      this._creatureType
    );
  }
}
