export const TEMP_GAME_ASSET_PATH = "/temp-game-assets";
export const TEMP_GRAPHICS_ASSET_PATH = `${TEMP_GAME_ASSET_PATH}/images/monster-tamer`;
export const WORKING_GRAPHICS_ASSET_PATH = `${TEMP_GAME_ASSET_PATH}/working-game-assets`;
export const KENNEYS_ASSET_PATH = `${TEMP_GAME_ASSET_PATH}/images/kenneys-assets`;
export const DATA_PATH = `/src/game/data`;

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

export enum Polarity {
  Positive = 1,
  Negative = -1,
}

export enum InputActions {
  OK = "OK",
  CANCEL = "CANCEL",
  TIMEOUT = "TIMEOUT",
}

export interface KeyActionMap {
  keyboardKey: string;
  action: InputActions | Directions;
}

export type Coordinate = {
  x: number;
  y: number;
};

export enum CreatureTypes {
  PLAYER = "PLAYER",
  ENEMY = "ENEMY",
}

export const ENEMY_POSITION: Coordinate = { x: 768, y: 144 };
export const PLAYER_POSITION: Coordinate = { x: 256, y: 318 };

export const CREATURES = {
  TUXEDO_CAT: {
    key: "TUXEDO_CAT",
    name: "Mr. Tux",
  },
  ORANGE_CAT: {
    key: "ORANGE_CAT",
    name: "Wali",
  },
};

export type CreatureDetails = {
  name: string;
  assetKey: string;
  creatureType: CreatureTypes;
  assetFrame?: number;
  maxHp: number;
  currentHp: number;
  baseAttackValue: number; // the base damage value for a creature's attack
  attackIds: number[];
  healthStatusScaleFactor?: number; // optionally scale the health status background image (eg: to de-emphasize)
  currentLevel?: number;
};

export interface CreatureAttack {
  id: number;
  name: string;
  animationKey: string;
  damage: number; // the hp decrease for this attack
  healing?: number; // the hp increase for this attack
  cooldown?: number; // the number of turns before the attack can be used again
  disableDuration?: number; // the number of turns the attack deprives the other player of
  creature?: string; // the creature this attack belongs to; if empty, any creature can have this atatck
  description?: string;
}

export enum BattleMenuStates {
  Main = "BATTLE_MENU_MAIN",
  Attacks = "BATTLE_MENU_ATTACKS",
  Creatures = "BATTLE_MENU_MONSTERS",
  Inventory = "BATTLE_MENU_INVENTORY",
  DisplayPersistentMessage = "BATTLE_MENU_PERSISTENT_MESSAGE",
  DisplayTimedMessage = "BATTLE_MENU_TIMED_MESSAGE",
  Closed = "BATTLE_MENU_CLOSED",
}

// for new state machine
export enum BattleStates {
  INTRO = "INTRO",
  PRE_BATTLE = "PRE_BATTLE",
  CREATURE_INTRO = "CREATURE_INTRO", // the creatures appear on screen
  PLAYER_INPUT = "PLAYER_INPUT",
  ENEMY_INPUT = "ENEMY_INPUT",
  BATTLE = "BATTLE",
  POST_BATTLE = "POST_BATTLE",
  FINISHED = "FINISHED", // battle has eneded
  FLEE_ATTEMPT = "FLEE_ATTEMPT",
}
