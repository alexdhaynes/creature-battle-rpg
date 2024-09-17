import {
  BattleCreature,
  CreatureDetails,
} from "@game/battle/creatures/BattleCreature";
import { Coordinate } from "@game/gameConstants";

export const ENEMY_POSITION: Coordinate = { x: 768, y: 144 };

export class EnemeyBattleCreature extends BattleCreature {
  constructor(
    scene: Phaser.Scene,
    config: CreatureDetails,
    position: Coordinate = ENEMY_POSITION // default to the enemy position constant
  ) {
    super(scene, config, position);
  }
}
