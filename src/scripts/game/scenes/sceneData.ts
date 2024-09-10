import { PreloadScene } from "@game/scenes/preload-scene";
import { BattleScene } from "@game/scenes/battle-scene";
import { SceneKeys } from "@game/scenes/scene-keys";
import type { SceneList } from "@game/scenes/types";

export const sceneList: SceneList = [
    {
        key:  SceneKeys.PRELOAD_SCENE,
        scene: PreloadScene
    },
    {
        key:  SceneKeys.BATTLE_SCENE,
        scene: BattleScene
    },
];