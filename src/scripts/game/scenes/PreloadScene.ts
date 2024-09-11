import { BaseScene } from "@scripts/game/scenes/BaseScene";
import { SceneKeys } from "@game/scenes/sceneData";
import { assetList } from "@scripts/game/assets/assetData";

export class PreloadScene extends BaseScene {
  constructor() {
    super({
      key: SceneKeys.PRELOAD_SCENE, // the scene name
      //active: true, //automatically start the scene when the SceneManager creates an  instance of this class (via super method call)
    });
  }

  // Scene lifecycle events

  preload() {
    this.log("preload");

    // Iterate through assets and preload images
    assetList.map((assetListItem) => {
      this.load.image(assetListItem.key, assetListItem.imagePath);
    });
  }

  create() {
    this.log("create");

    // start battle scene after images have been preloaded
    // this will instantiate the BattleScene class in battle-scene.ts
    this.scene.start(SceneKeys.BATTLE_SCENE);
  }
}
