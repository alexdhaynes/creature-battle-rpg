import { TBattleState, initialState } from "./initialState";

import {
  SET_CURRENT_MENU,
  SET_CURRENT_PLAYER,
  SET_CURRENT_ENEMY,
  SET_CURRENT_PLAYER_ATTACK,
  SET_CURRENT_ENEMY_ATTACK,
  FLEE_BATTLE,
} from "./actions"; // Adjust the path as necessary

const battleStateReducer = (
  state = initialState,
  action: any // todo: action type
): TBattleState => {
  switch (action.type) {
    case SET_CURRENT_MENU:
      return {
        ...state,
        currentMenuState: action.payload,
      };

    case SET_CURRENT_PLAYER:
      return {
        ...state,
        currentPlayer: action.payload,
      };

    case SET_CURRENT_ENEMY:
      return {
        ...state,
        currentEnemy: action.payload,
      };

    case SET_CURRENT_PLAYER_ATTACK:
      return {
        ...state,
        currentPlayerAttack: action.payload,
      };

    case SET_CURRENT_ENEMY_ATTACK:
      return {
        ...state,
        currentEnemyAttack: action.payload,
      };

    case FLEE_BATTLE:
      return {
        ...state,
        battleIsOver: action.payload,
      };

    default:
      return state;
  }
};

export default battleStateReducer;
