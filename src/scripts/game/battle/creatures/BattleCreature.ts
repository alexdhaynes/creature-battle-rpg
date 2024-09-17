import { Coordinate } from "@game/gameConstants";
import { HealthBar } from "@game/battle/ui/health/HealthBar";

export type CreatureDetails = {
  name: string;
  assetKey: string;
  assetFrame?: number;
  maxHp: number;
  currentHp: number;
  baseAttackValue: number;
  attackIds: string[];
};

export class BattleCreature {
  protected _scene: Phaser.Scene; // can't make private since this is a base class; but use _ notation to indicate "protected"
  protected _creatureDetails: CreatureDetails;
  protected _gameObject: Phaser.GameObjects.Image;
  protected _healthBar: HealthBar;

  constructor(
    scene: Phaser.Scene,
    config: CreatureDetails,
    position: Coordinate
  ) {
    this._scene = scene;
    this._creatureDetails = config;

    this._healthBar = new HealthBar(this._scene, 34, 34);
    this._gameObject = this._scene.add.image(
      position.x,
      position.y,
      this._creatureDetails.assetKey,
      this._creatureDetails.assetFrame || 0
    );
  }
}
