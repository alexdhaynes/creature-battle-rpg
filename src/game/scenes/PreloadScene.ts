import { BaseScene } from "@game/scenes/BaseScene";
import { SceneKeys } from "@game/constants/sceneConstants";
import { assetList } from "@game/constants/assetConstants";

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
      const { key, path } = assetListItem;
      if (
        assetListItem.hasOwnProperty("type") &&
        assetListItem.type === "DATA"
      ) {
        this.load.json(key, path); // load json data
      } else {
        this.load.image(key, path); // load images
      }
    });
  }

  create() {
    this.log("create");

    // start battle scene after images have been preloaded
    // this will instantiate the BattleScene class in battle-scene.ts
    this.scene.start(SceneKeys.BATTLE_SCENE);
  }
}
