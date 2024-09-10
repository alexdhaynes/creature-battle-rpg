import { ExtendedScene } from "@scripts/game/scenes/sceneUtils";
import { SceneKeys } from "@game/scenes/scene-keys";
import { assetList } from "@scripts/game/assets/assetData";

export class PreloadScene extends ExtendedScene {
    constructor() {
        super({
            key: SceneKeys.PRELOAD_SCENE, // the scene name
            //active: true, //automatically start the scene when the SceneManager creates an  instance of this class (via super method call)
        })
    }

    // Scene lifecycle events

    preload() {
        this.log("preload");

        // Iterate through assets and preload images
        assetList.map((assetListItem) => {
            this.load.image(assetListItem.key, assetListItem.imagePath)
        })
    }

    create() {
        this.log("create");

        // start battle scene after images have been preloaded
        // this will instantiate the BattleScene class in battle-scene.ts
        this.scene.start(SceneKeys.BATTLE_SCENE);
    }

}