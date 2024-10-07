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
    super.takeDamage(damage, callback); // invoke the superclass method and pass the callback to the superclass method
    this._healthStatus.setCurrentHp(this._currentHp);
  }
}
