import { PreloadScene, BattleScene } from "@game/scenes";
import { SceneList } from "@game/constants/types";

// the names of all of our scenes
export enum SceneKeys {
  PRELOAD_SCENE = "PRELOAD_SCENE",
  BATTLE_SCENE = "BATTLE_SCENE",
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
