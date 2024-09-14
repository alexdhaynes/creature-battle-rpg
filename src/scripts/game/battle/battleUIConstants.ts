import { Directions } from "@game/gameConstants";

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
  MOVE_1 = "slash",
  MOVE_2 = "hiss",
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

// label the 2x2 grid of options for the main menu
export const battleMainMenu2x2Grid = {
  [CursorPositions2x2.TOP_LEFT]: BattleMenuOptionLabels.FIGHT,
  [CursorPositions2x2.TOP_RIGHT]: BattleMenuOptionLabels.SWITCH,
  [CursorPositions2x2.BOTTOM_LEFT]: BattleMenuOptionLabels.ITEM,
  [CursorPositions2x2.BOTTOM_RIGHT]: BattleMenuOptionLabels.FLEE,
};

// label the 2x2 grid of options for the attack menu
export const battleAttackMenu2x2Grid = {
  [CursorPositions2x2.TOP_LEFT]: AttackMenuOptionLabels.MOVE_1,
  [CursorPositions2x2.TOP_RIGHT]: AttackMenuOptionLabels.MOVE_2,
  [CursorPositions2x2.BOTTOM_LEFT]: AttackMenuOptionLabels.MOVE_3,
  [CursorPositions2x2.BOTTOM_RIGHT]: AttackMenuOptionLabels.MOVE_4,
};

// Where the cursor should end up when it is moved
export const battleMenu2x2CursorPositions = {
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

// the type that stores the (direction, cell) mapping
export type TBattleMenuNavigationOptionsByDirection = Partial<
  Record<Directions, CursorPositions2x2>
>;

// the type that stores the (cell, navPaths) mapping
// between a cell of the 2x2 matrix and the object of possible navigation paths
export type TBattleMenuOptionNavigationPath = Record<
  CursorPositions2x2,
  TBattleMenuNavigationOptionsByDirection
>;

// The action to which the cursor can move on the Battle Menu
export const battleMenuNavigationMap: TBattleMenuOptionNavigationPath = {
  // the action to which the cursor can move from "Fight"
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

// the type that stores the mapping between a direction
// and the corresponding menu option
export type NavigationPath<
  TOption extends string,
  TDirection extends string
> = {
  [key in TOption]?: {
    [dir in TDirection]?: TOption;
  };
};

// the type that stores the mapping between a menu option
// and the navigation paths available to it
export type TAttackMenuOptionNavigationPath = NavigationPath<
  AttackMenuOptionLabels,
  Directions
>;

// The action to which the cursor can move on the Attack Menu
export const attackMenuItemNavigationPath: TAttackMenuOptionNavigationPath = {
  // the action to which the cursor can move from "Fight"
  [AttackMenuOptionLabels.MOVE_1]: {
    [Directions.RIGHT]: AttackMenuOptionLabels.MOVE_2,
    [Directions.DOWN]: AttackMenuOptionLabels.MOVE_3,
  },
  // the action to which the cursor can move from "Switch"
  [AttackMenuOptionLabels.MOVE_2]: {
    [Directions.LEFT]: AttackMenuOptionLabels.MOVE_1,
    [Directions.DOWN]: AttackMenuOptionLabels.MOVE_4,
  },
  // the action to which the cursor can move from "Item"
  [AttackMenuOptionLabels.MOVE_3]: {
    [Directions.RIGHT]: AttackMenuOptionLabels.MOVE_4,
    [Directions.UP]: AttackMenuOptionLabels.MOVE_1,
  },
  //the directions and actions the cursor can move from "Flee"
  [AttackMenuOptionLabels.MOVE_4]: {
    [Directions.LEFT]: AttackMenuOptionLabels.MOVE_3,
    [Directions.UP]: AttackMenuOptionLabels.MOVE_2,
  },
};
