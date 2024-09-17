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

// Todo: move these types elsewhere
export type CreatureNameKeys = {
  [key in CreatureAssetKeys]: string;
};

export const creatureNames: CreatureNameKeys = {
  [CreatureAssetKeys.TUXEDO_CAT]: "Mr. Tux",
  [CreatureAssetKeys.ORANGE_CAT]: "Wali",
};

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
  {
    key: HealthBarAssetKeys.LEFT_CAP_SHADOW,
    imagePath: `${KENNEYS_ASSET_PATH}/ui-space-expansion/barHorizontal_shadow_left.png`,
  },
  {
    key: HealthBarAssetKeys.RIGHT_CAP_SHADOW,
    imagePath: `${KENNEYS_ASSET_PATH}/ui-space-expansion/barHorizontal_shadow_right.png`,
  },
  {
    key: HealthBarAssetKeys.MIDDLE_SHADOW,
    imagePath: `${KENNEYS_ASSET_PATH}/ui-space-expansion/barHorizontal_shadow_mid.png`,
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
