import {
  BattleCreature,
  CreatureDetails,
} from "@game/battle/creatures/BattleCreature";

import { Coordinate, ENEMY_POSITION } from "@game/gameConstants";

export class EnemyBattleCreature extends BattleCreature {
  constructor(
    scene: Phaser.Scene,
    config: CreatureDetails,
    position: Coordinate = ENEMY_POSITION // default to the enemy position constant
  ) {
    super(scene, config, position);
  }
}
