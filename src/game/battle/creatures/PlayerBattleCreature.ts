import { BattleCreature } from "@game/battle/creatures/BattleCreature";

import {
  Coordinate,
  CreatureDetails,
  PLAYER_POSITION,
} from "@game/constants/gameConstants";

export class PlayerBattleCreature extends BattleCreature {
  constructor(
    scene: Phaser.Scene,
    config: CreatureDetails,
    position: Coordinate = PLAYER_POSITION // default to the enemy position constant
  ) {
    super(scene, config, position);
  }

  // override the takeDamage method
  takeDamage(damage: number, callback?: () => void) {
    super.takeDamage(damage, callback); // invoke the superclass methed
    this._healthStatus.setCurrentHp(this._currentHp); // add additional logic
  }
}
