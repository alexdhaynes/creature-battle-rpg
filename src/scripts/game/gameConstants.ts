export const GAME_ASSET_PATH = "/game-assets/images";
export const MONSTER_TAMER_ASSET_PATH = `${GAME_ASSET_PATH}/monster-tamer`;
export const KENNEYS_ASSET_PATH = `${GAME_ASSET_PATH}/kenneys-assets`;
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

export enum GameActions {
  OK = "OK",
  CANCEL = "CANCEL",
}

export interface KeyActionMap {
  keyboardKey: string;
  action: GameActions | Directions;
}
