import { DataAssetKeys } from "@game/constants/assetConstants";
import { CreatureAttack } from "@game/constants/gameConstants";

export class DataUtils {
  static getCreatureAttackbyId(scene: Phaser.Scene, attackId: number) {
    const data = scene.cache.json.get(DataAssetKeys.ATTACKS);
    return data.find((attack: CreatureAttack) => attack.id === attackId);
  }
}
