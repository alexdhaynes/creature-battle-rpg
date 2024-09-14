export const TEMP_GAME_ASSET_PATH = "/temp-game-assets";
export const TEMP_GRAPHICS_ASSET_PATH = `${TEMP_GAME_ASSET_PATH}/images/monster-tamer`;
export const WORKING_GRAPHICS_ASSET_PATH = `${TEMP_GAME_ASSET_PATH}/working-game-assets`;
export const KENNEYS_ASSET_PATH = `${TEMP_GAME_ASSET_PATH}/images/kenneys-assets`;
export const GAME_DIMENSIONS = {
  width: 1024,
  height: 576,
};
export const GAME_CONTAINER_ID = "game-container";

// Directions
export enum Directions {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  UP = "UP",
  DOWN = "DOWN",
  NONE = "NONE",
}

export enum InputActions {
  OK = "OK",
  CANCEL = "CANCEL",
}

export interface KeyActionMap {
  keyboardKey: string;
  action: InputActions | Directions;
}
