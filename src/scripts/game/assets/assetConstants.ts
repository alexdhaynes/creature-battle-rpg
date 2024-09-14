import type { AssetList } from "@game/assets/types";

import {
  KENNEYS_ASSET_PATH,
  TEMP_GRAPHICS_ASSET_PATH,
  WORKING_GRAPHICS_ASSET_PATH,
} from "@scripts/game/gameConstants";

export enum BattleBackgroundAssetKeys {
  FOREST = "FOREST",
  MEADOW = "MEADOW",
}

export enum CreatureAssetKeys {
  TUXEDO_CAT = "TUXEDO_CAT",
  ORANGE_CAT = "ORANGE_CAT",
}

export enum BattleAssetKeys {
  HEALTH_BAR_BACKGROUND = "HEALTH_BAR_BACKGROUND",
}

export enum HealthBarAssetKeys {
  LEFT_CAP = "LEFT_CAP",
  RIGHT_CAP = "RIGHT_CAP",
  MIDDLE = "MIDDLE",
}

export enum UIAssetKeys {
  CURSOR = "CURSOR",
}

// The grand list of game assets
export const assetList: AssetList = [
  // Backgrounds
  {
    key: BattleBackgroundAssetKeys.MEADOW,
    imagePath: `${WORKING_GRAPHICS_ASSET_PATH}/battle-backgrounds/meadow-background.png`,
  },

  // Health bar assets
  {
    key: BattleAssetKeys.HEALTH_BAR_BACKGROUND,
    imagePath: `${KENNEYS_ASSET_PATH}/ui-space-expansion/custom-ui.png`,
  },
  {
    key: HealthBarAssetKeys.LEFT_CAP,
    imagePath: `${KENNEYS_ASSET_PATH}/ui-space-expansion/barHorizontal_green_left.png`,
  },
  {
    key: HealthBarAssetKeys.RIGHT_CAP,
    imagePath: `${KENNEYS_ASSET_PATH}/ui-space-expansion/barHorizontal_green_right.png`,
  },
  {
    key: HealthBarAssetKeys.MIDDLE,
    imagePath: `${KENNEYS_ASSET_PATH}/ui-space-expansion/barHorizontal_green_mid.png`,
  },

  // Creatures
  {
    key: CreatureAssetKeys.TUXEDO_CAT,
    imagePath: `${WORKING_GRAPHICS_ASSET_PATH}/creatures/${CreatureAssetKeys.TUXEDO_CAT.toLowerCase()}.png`,
  },
  {
    key: CreatureAssetKeys.ORANGE_CAT,
    imagePath: `${WORKING_GRAPHICS_ASSET_PATH}/creatures/${CreatureAssetKeys.ORANGE_CAT.toLowerCase()}.png`,
  },
  // UI: cursor
  {
    key: UIAssetKeys.CURSOR,
    imagePath: `${TEMP_GRAPHICS_ASSET_PATH}/ui/cursor.png`,
  },
];
