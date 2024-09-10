import { ExtendedScene } from "@scripts/game/scenes/sceneUtils";
import { SceneKeys } from "@game/scenes/scene-keys";
import { BattleBackgroundAssetKeys, MonsterAssetKeys } from "@game/assets/asset-keys";

export class BattleScene extends ExtendedScene {
    constructor() {
        super({
            // the scene name, which we can reference throughout game code
            key: SceneKeys.BATTLE_SCENE, 
        })
    }

    // Scene lifecycle events
    create() {
        this.log("create");

        // create main background
        this.add.image(0,0, BattleBackgroundAssetKeys.FOREST).setOrigin(0);

        // render the enemy monsters
        this.add.image(768, 144, MonsterAssetKeys.CARNODUSK, 0);

         // render the player monsters
         this.add.image(256, 316, MonsterAssetKeys.IGUANIGNITE, 0).setFlipX(true);
    }
}