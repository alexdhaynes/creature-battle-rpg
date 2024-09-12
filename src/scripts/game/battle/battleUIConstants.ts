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

// the type that stores the mapping between a direction
// and the corresponding battle menu option
export type TBattleMenuNavigationOptionsByDirection = Partial<
  Record<Directions, BattleMenuOptions>
>;

// the type that stores the mapping between a battle menu option
// and the navigation paths available to it
export type TBattleMenuItemNavigationPath = Record<
  BattleMenuOptions,
  TBattleMenuNavigationOptionsByDirection
>;

// The action to which the cursor can move
export const battleMenuItemNavigationPath: TBattleMenuItemNavigationPath = {
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
