import type { AssetList } from "@scripts/game/assets/types"
import { BattleAssetKeys, BattleBackgroundAssetKeys, HealthBarAssetKeys, MonsterAssetKeys } from "@game/assets/asset-keys";
import { KENNEYS_ASSET_PATH, MONSTER_TAMER_ASSET_PATH } from "@game/constants";

export const assetList: AssetList = [
    // Backgrounds 
    {
        key: BattleBackgroundAssetKeys.FOREST,
        imagePath: `${MONSTER_TAMER_ASSET_PATH}/battle-backgrounds/forest-background.png`
    },

    // Health bar assets 
    {
        key: BattleAssetKeys.HEALTH_BAR_BACKGROUND,
        imagePath: `${KENNEYS_ASSET_PATH}/ui-space-expansion/custom-ui.png`
    },
    {
        key: HealthBarAssetKeys.LEFT_CAP,
        imagePath: `${KENNEYS_ASSET_PATH}/ui-space-expansion/barHorizontal_green_left.png`
    },
    {
        key: HealthBarAssetKeys.RIGHT_CAP,
        imagePath: `${KENNEYS_ASSET_PATH}/ui-space-expansion/barHorizontal_green_right.png`
    },
    {
        key: HealthBarAssetKeys.MIDDLE,
        imagePath: `${KENNEYS_ASSET_PATH}/ui-space-expansion/barHorizontal_green_mid.png`
    },

    // Monsters
    {
        key: MonsterAssetKeys.IGUANIGNITE,
        imagePath: `${MONSTER_TAMER_ASSET_PATH}/monsters/${MonsterAssetKeys.IGUANIGNITE.toLocaleLowerCase()}.png`
    },
    {
        key: MonsterAssetKeys.CARNODUSK,
        imagePath: `${MONSTER_TAMER_ASSET_PATH}/monsters/${MonsterAssetKeys.CARNODUSK.toLocaleLowerCase()}.png`
    },
]