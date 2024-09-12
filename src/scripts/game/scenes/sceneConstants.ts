import { PreloadScene } from "@game/scenes/PreloadScene";
import { BattleScene } from "@game/scenes/BattleScene";
import { SceneList } from "@game/scenes/types";

// the names of all of our scenes
export enum SceneKeys {
  PRELOAD_SCENE = "PRELOAD_SCENE",
  BATTLE_SCENE = "BATTLE_SCNENE",
}

export const sceneList: SceneList = [
  {
    key: SceneKeys.PRELOAD_SCENE,
    scene: PreloadScene,
  },
  {
    key: SceneKeys.BATTLE_SCENE,
    scene: BattleScene,
  },
];
