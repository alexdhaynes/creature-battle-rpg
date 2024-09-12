import { Directions } from "@game/gameConstants";

export const battleUITextStyle = {
  color: "black",
  fontSize: "30px",
};

export enum BattleMenuOptions {
  DEFAULT = "FIGHT",
  FIGHT = "FIGHT",
  SWITCH = "SWITCH",
  ITEM = "ITEM",
  FLEE = "FLEE",
}

export enum AttackMenuOptions {
  DEFAULT = "MOVE_1",
  MOVE_1 = "MOVE_1",
  MOVE_2 = "MOVE_2",
  MOVE_3 = "MOVE_3",
  MOVE_4 = "MOVE_4",
}

export const battleMenuCursorInitialPosition = {
  x: 42,
  y: 38,
};

// Where the cursor should end up when it is moved
export const battleMenuItemCursorPositions = {
  [BattleMenuOptions.FIGHT]: {
    cursorX: battleMenuCursorInitialPosition.x,
    cursorY: battleMenuCursorInitialPosition.y,
  },
  [BattleMenuOptions.SWITCH]: {
    cursorX: 228,
    cursorY: battleMenuCursorInitialPosition.y,
  },
  [BattleMenuOptions.ITEM]: {
    cursorX: battleMenuCursorInitialPosition.x,
    cursorY: 86,
  },
  [BattleMenuOptions.FLEE]: {
    cursorX: 228,
    cursorY: 86,
  },
};

export const attackMenuItemCursorPositions = {
  [AttackMenuOptions.MOVE_1]: {
    cursorX: battleMenuCursorInitialPosition.x,
    cursorY: battleMenuCursorInitialPosition.y,
  },
  [AttackMenuOptions.MOVE_2]: {
    cursorX: 228,
    cursorY: battleMenuCursorInitialPosition.y,
  },
  [AttackMenuOptions.MOVE_3]: {
    cursorX: battleMenuCursorInitialPosition.x,
    cursorY: 86,
  },
  [AttackMenuOptions.MOVE_4]: {
    cursorX: 228,
    cursorY: 86,
  },
};

// the type that stores the mapping between a direction
// and the corresponding battle menu option
export type TBattleMenuNavigationOptionsByDirection = Partial<
  Record<Directions, BattleMenuOptions>
>;

// the type that stores the mapping between a battle menu option
// and the navigation paths available to it
export type TBattleMenuOptionNavigationPath = Record<
  BattleMenuOptions,
  TBattleMenuNavigationOptionsByDirection
>;

// The action to which the cursor can move on the Battle Menu
export const battleMenuItemNavigationPath: TBattleMenuOptionNavigationPath = {
  // the action to which the cursor can move from "Fight"
  [BattleMenuOptions.FIGHT]: {
    [Directions.RIGHT]: BattleMenuOptions.SWITCH,
    [Directions.DOWN]: BattleMenuOptions.ITEM,
  },
  // the action to which the cursor can move from "Switch"
  [BattleMenuOptions.SWITCH]: {
    [Directions.LEFT]: BattleMenuOptions.FIGHT,
    [Directions.DOWN]: BattleMenuOptions.FLEE,
  },
  // the action to which the cursor can move from "Item"
  [BattleMenuOptions.ITEM]: {
    [Directions.RIGHT]: BattleMenuOptions.FLEE,
    [Directions.UP]: BattleMenuOptions.FIGHT,
  },
  //the directions and actions the cursor can move from "Flee"
  [BattleMenuOptions.FLEE]: {
    [Directions.LEFT]: BattleMenuOptions.ITEM,
    [Directions.UP]: BattleMenuOptions.SWITCH,
  },
};

// The action to which the cursor can move on the Attack Menu
export const attackMenuItemNavigationPath = {
  // the action to which the cursor can move from "Fight"
  [AttackMenuOptions.MOVE_1]: {
    [Directions.RIGHT]: AttackMenuOptions.MOVE_2,
    [Directions.DOWN]: AttackMenuOptions.MOVE_3,
  },
  // the action to which the cursor can move from "Switch"
  [AttackMenuOptions.MOVE_2]: {
    [Directions.LEFT]: AttackMenuOptions.MOVE_1,
    [Directions.DOWN]: AttackMenuOptions.MOVE_4,
  },
  // the action to which the cursor can move from "Item"
  [AttackMenuOptions.MOVE_3]: {
    [Directions.RIGHT]: AttackMenuOptions.MOVE_4,
    [Directions.UP]: AttackMenuOptions.MOVE_1,
  },
  //the directions and actions the cursor can move from "Flee"
  [AttackMenuOptions.MOVE_4]: {
    [Directions.LEFT]: AttackMenuOptions.MOVE_1,
    [Directions.UP]: AttackMenuOptions.MOVE_2,
  },
};
