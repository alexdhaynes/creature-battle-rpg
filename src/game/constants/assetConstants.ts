import type { AssetList } from "@game/constants/types";

import {
  CREATURES,
  DATA_PATH,
  KENNEYS_ASSET_PATH,
  TEMP_GRAPHICS_ASSET_PATH,
  WORKING_GRAPHICS_ASSET_PATH,
} from "@game/constants/gameConstants";

export enum BattleBackgroundAssetKeys {
  FOREST = "FOREST",
  MEADOW = "MEADOW",
}

export enum BattleAssetKeys {
  HEALTH_BAR_BACKGROUND = "HEALTH_BAR_BACKGROUND",
}

export enum HealthBarAssetKeys {
  LEFT_CAP = "LEFT_CAP",
  RIGHT_CAP = "RIGHT_CAP",
  MIDDLE = "MIDDLE",
  LEFT_CAP_SHADOW = "LEFT_CAP_SHADOW",
  MIDDLE_SHADOW = "MIDDLE_SHADOW",
  RIGHT_CAP_SHADOW = "RIGHT_CAP_SHADOW",
}

export enum UIAssetKeys {
  CURSOR = "CURSOR",
}

export enum DataAssetKeys {
  ATTACKS = "ATTACKS",
}
// The grand list of game assets
export const assetList: AssetList = [
  // Backgrounds
  {
    key: BattleBackgroundAssetKeys.MEADOW,
    path: `${WORKING_GRAPHICS_ASSET_PATH}/battle-backgrounds/meadow1pp-w-tree-background.png`,
  },
  // Health bar assets
  {
    key: BattleAssetKeys.HEALTH_BAR_BACKGROUND,
    path: `${WORKING_GRAPHICS_ASSET_PATH}/ui/health-status-bg.png`,
  },
  {
    key: HealthBarAssetKeys.LEFT_CAP,
    path: `${KENNEYS_ASSET_PATH}/ui-space-expansion/barHorizontal_green_left.png`,
  },
  {
    key: HealthBarAssetKeys.RIGHT_CAP,
    path: `${KENNEYS_ASSET_PATH}/ui-space-expansion/barHorizontal_green_right.png`,
  },
  {
    key: HealthBarAssetKeys.MIDDLE,
    path: `${KENNEYS_ASSET_PATH}/ui-space-expansion/barHorizontal_green_mid.png`,
  },
  {
    key: HealthBarAssetKeys.LEFT_CAP_SHADOW,
    path: `${KENNEYS_ASSET_PATH}/ui-space-expansion/barHorizontal_shadow_left.png`,
  },
  {
    key: HealthBarAssetKeys.RIGHT_CAP_SHADOW,
    path: `${KENNEYS_ASSET_PATH}/ui-space-expansion/barHorizontal_shadow_right.png`,
  },
  {
    key: HealthBarAssetKeys.MIDDLE_SHADOW,
    path: `${KENNEYS_ASSET_PATH}/ui-space-expansion/barHorizontal_shadow_mid.png`,
  },

  // Creatures
  {
    key: CREATURES.TUXEDO_CAT.key,
    path: `${WORKING_GRAPHICS_ASSET_PATH}/creatures/${CREATURES.TUXEDO_CAT.key.toLowerCase()}.png`,
  },
  {
    key: CREATURES.ORANGE_CAT.key,
    path: `${WORKING_GRAPHICS_ASSET_PATH}/creatures/${CREATURES.ORANGE_CAT.key.toLowerCase()}.png`,
  },
  // UI: cursor
  {
    key: UIAssetKeys.CURSOR,
    path: `${TEMP_GRAPHICS_ASSET_PATH}/ui/cursor.png`,
  },
  // Data
  {
    key: DataAssetKeys.ATTACKS,
    type: "DATA",
    path: `${DATA_PATH}/attacks.json`,
  },
];
