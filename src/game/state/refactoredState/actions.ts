import { BattleMenuStates } from "@game/constants/gameConstants";

import {
  EnemyBattleCreature,
  PlayerBattleCreature,
} from "@game/battle/creatures";

// Action Types
export const SET_CURRENT_MENU = "OPEN_MENU";
export const SET_CURRENT_PLAYER = "SET_CURRENT_PLAYER";
export const SET_CURRENT_ENEMY = "SET_CURRENT_ENEMY";
export const SET_CURRENT_PLAYER_ATTACK = "SET_CURRENT_PLAYER_ATTACK";
export const SET_CURRENT_ENEMY_ATTACK = "SET_CURRENT_PLAYER_ATTACK";
export const FLEE_BATTLE = "FLEE_BATTLE";
export const DISPLAY_TIMED_MESSAGE = "DISPLAY_TIMED_MESSAGE";
export const DISPLAY_PERSISTENT_MESSAGE = "DISPLAY_PERSISTENT_MESSAGE";

// Action Creators
export const setMenuState = (newMenu: BattleMenuStates) => ({
  type: SET_CURRENT_MENU,
  payload: newMenu,
});

export const setCurrentPlayer = (newPlayer: PlayerBattleCreature) => ({
  type: SET_CURRENT_PLAYER,
  payload: newPlayer,
});

export const setCurrentEnemy = (newEnemy: EnemyBattleCreature) => ({
  type: SET_CURRENT_ENEMY,
  payload: newEnemy,
});

export const setCurrentPlayerAttack = (newPlayerAttack: string) => ({
  type: SET_CURRENT_PLAYER_ATTACK,
  payload: newPlayerAttack,
});

export const setCurrentEnemyAttack = (newEnemyAttack: string) => ({
  type: SET_CURRENT_ENEMY_ATTACK,
  payload: newEnemyAttack,
});

export const setBattleState = (currentOpenMenu: boolean) => ({
  type: FLEE_BATTLE,
  payload: currentOpenMenu,
});
