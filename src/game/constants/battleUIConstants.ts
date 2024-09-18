import { Directions } from "@game/constants/gameConstants";

export const battleUITextStyle = {
  color: "black",
  fontSize: "30px",
};

export enum BattleMenuOptionLabels {
  FIGHT = "FIGHT",
  SWITCH = "SWITCH",
  ITEM = "ITEM",
  FLEE = "FLEE",
}

export enum AttackMenuOptionLabels {
  MOVE_1 = "MOVE_1",
  MOVE_2 = "MOVE_2",
  MOVE_3 = "MOVE_3",
  MOVE_4 = "MOVE_4",
  NO_MOVE = "-",
}

export const battleMenuCursorInitialPosition = {
  x: 42,
  y: 38,
};

// Cursor positions for a 2x2 menu
export enum CursorPositions2x2 {
  TOP_LEFT = "TOP_LEFT",
  TOP_RIGHT = "TOP_RIGHT",
  BOTTOM_LEFT = "BOTTOM_LEFT",
  BOTTOM_RIGHT = "BOTTOM_RIGHT",
}

// TODO: use this
// export const menu2x2GridPositions = {
//   [CursorPositions2x2.TOP_LEFT]: { x: 55, y: 22 },
//   [CursorPositions2x2.TOP_RIGHT]: { x: 240, y: 22 },
//   [CursorPositions2x2.BOTTOM_LEFT]: { x: 55, y: 70 },
//   [CursorPositions2x2.BOTTOM_RIGHT]: { x: 240, y: 70 },
// };

export type AttackMenuGrid = {
  [key in CursorPositions2x2]: string;
};

// label the 2x2 grid of options for the main menu
export const battleMainMenu2x2Grid = {
  [CursorPositions2x2.TOP_LEFT]: BattleMenuOptionLabels.FIGHT,
  [CursorPositions2x2.TOP_RIGHT]: BattleMenuOptionLabels.SWITCH,
  [CursorPositions2x2.BOTTOM_LEFT]: BattleMenuOptionLabels.ITEM,
  [CursorPositions2x2.BOTTOM_RIGHT]: BattleMenuOptionLabels.FLEE,
};

export type CursorCoordinates = {
  cursorX: number;
  cursorY: number;
};

export type CursorPositions2x2Map = Record<
  CursorPositions2x2,
  CursorCoordinates
>;

// the type that stores the (direction, cell) mapping
export type TBattleMenuNavigationOptionsByDirection = Partial<
  Record<Directions, CursorPositions2x2>
>;

// the type that stores the (cell, navPaths) mapping
// between a cell of the 2x2 matrix and the object of possible navigation paths
export type TBattleMenuOptionNavigationMap = Record<
  CursorPositions2x2,
  TBattleMenuNavigationOptionsByDirection
>;

// Map's the cursor's position in a 2x2 grid to a set of coordinates
// (position, {coords}) mapping
export const menu2x2CursorPositions: CursorPositions2x2Map = {
  [CursorPositions2x2.TOP_LEFT]: {
    cursorX: battleMenuCursorInitialPosition.x,
    cursorY: battleMenuCursorInitialPosition.y,
  },
  [CursorPositions2x2.TOP_RIGHT]: {
    cursorX: 228,
    cursorY: battleMenuCursorInitialPosition.y,
  },
  [CursorPositions2x2.BOTTOM_LEFT]: {
    cursorX: battleMenuCursorInitialPosition.x,
    cursorY: 86,
  },
  [CursorPositions2x2.BOTTOM_RIGHT]: {
    cursorX: 228,
    cursorY: 86,
  },
};

// Maps the cursor's current position in a 2x2 grid to its next position,
// based on directional input
// (position, {possibleNewPositions}) mapping
export const menu2x2NavigationMap: TBattleMenuOptionNavigationMap = {
  [CursorPositions2x2.TOP_LEFT]: {
    [Directions.RIGHT]: CursorPositions2x2.TOP_RIGHT,
    [Directions.DOWN]: CursorPositions2x2.BOTTOM_LEFT,
  },
  // the action to which the cursor can move from "Switch"
  [CursorPositions2x2.TOP_RIGHT]: {
    [Directions.LEFT]: CursorPositions2x2.TOP_LEFT,
    [Directions.DOWN]: CursorPositions2x2.BOTTOM_RIGHT,
  },
  // the action to which the cursor can move from "Item"
  [CursorPositions2x2.BOTTOM_LEFT]: {
    [Directions.RIGHT]: CursorPositions2x2.BOTTOM_RIGHT,
    [Directions.UP]: CursorPositions2x2.TOP_LEFT,
  },
  //the directions and actions the cursor can move from "Flee"
  [CursorPositions2x2.BOTTOM_RIGHT]: {
    [Directions.LEFT]: CursorPositions2x2.BOTTOM_LEFT,
    [Directions.UP]: CursorPositions2x2.TOP_RIGHT,
  },
};
