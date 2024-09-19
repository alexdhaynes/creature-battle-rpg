import { BattleMenuStates } from "@game/constants/gameConstants";
import {
  CursorPositions2x2,
  AttackMenuGrid,
} from "@game/constants/battleUIConstants";

import {
  EnemyBattleCreature,
  PlayerBattleCreature,
} from "@game/battle/creatures";

export type TBattleState = {
  currentMenuState: BattleMenuStates;
  currentPlayer: PlayerBattleCreature | null;
  currentEnemy: EnemyBattleCreature | null;
  currentPlayerAttack: string;
  currentEnemyAttack: string;
  currentMessage: string[];
  currentMenuCell: CursorPositions2x2;
  currentAttackGrid: AttackMenuGrid;
  battleIsOver: boolean;
};

export type BattleStateKeyValuePair<
  initialStateKey extends keyof TBattleState
> = {
  key: initialStateKey;
  value: TBattleState[initialStateKey];
};

export const initialState: TBattleState = {
  currentMenuState: BattleMenuStates.Main,
  currentPlayer: null,
  currentEnemy: null,
  currentPlayerAttack: "",
  currentEnemyAttack: "",
  currentMessage: [""],
  currentMenuCell: CursorPositions2x2.TOP_LEFT,
  currentAttackGrid: {
    [CursorPositions2x2.TOP_LEFT]: "-",
    [CursorPositions2x2.TOP_RIGHT]: "-",
    [CursorPositions2x2.BOTTOM_LEFT]: "-",
    [CursorPositions2x2.BOTTOM_RIGHT]: "-",
  },
  battleIsOver: false,
};
