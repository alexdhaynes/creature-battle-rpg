import { CursorPositions2x2 } from "@game/constants/battleUIConstants";
import {
  EnemyBattleCreature,
  PlayerBattleCreature,
} from "@game/battle/creatures";
import {
  BattleMenuStates,
  CreatureAttack,
} from "@game/constants/gameConstants";

import { AttackMenuGrid } from "@game/constants/battleUIConstants";

type BattleState = {
  currentOpenMenu: BattleMenuStates;
  currentPlayer: PlayerBattleCreature | null;
  currentPlayerAttack: CreatureAttack | null;
  currentEnemy: EnemyBattleCreature | null;
  currentEnemyAttack: CreatureAttack | null;
  currentMessage: string[];
  currentMenuCell: CursorPositions2x2;
  currentAttackGrid: AttackMenuGrid;
};

export class BattleStateContext {
  private static _state: BattleState = {
    currentOpenMenu: BattleMenuStates.Main,
    currentPlayer: null,
    currentEnemy: null,
    currentPlayerAttack: null,
    currentEnemyAttack: null,
    currentMessage: [""],
    currentMenuCell: CursorPositions2x2.TOP_LEFT,
    currentAttackGrid: {
      [CursorPositions2x2.TOP_LEFT]: "-",
      [CursorPositions2x2.TOP_RIGHT]: "-",
      [CursorPositions2x2.BOTTOM_LEFT]: "-",
      [CursorPositions2x2.BOTTOM_RIGHT]: "-",
    },
  };

  // Static method to set the state
  public static setState(newState: Partial<BattleState>): void {
    this._state = { ...this._state, ...newState };
  }

  // Static method to get the entire state
  public static getState(): BattleState {
    return this._state;
  }

  public static getCurrentPlayer() {
    return this._state.currentPlayer;
  }

  public static getCurrentPlayerAttack() {
    return this._state.currentPlayerAttack;
  }

  public static getCurrentEnemy() {
    return this._state.currentEnemy;
  }

  public static getCurrentEnemyAttack() {
    return this._state.currentEnemyAttack;
  }

  // Static method to set the current message
  public static setCurrentMessage(messageList: string[]): void {
    this.setState({ currentMessage: messageList });
  }

  // Static method to set the current player attack
  public static setCurrentPlayerAttack(attack: CreatureAttack): void {
    this.setState({ currentPlayerAttack: attack });
  }

  // Static method to set the current enemy attack
  public static setCurrentEnemyAttack(attack: CreatureAttack): void {
    this.setState({ currentEnemyAttack: attack });
  }

  // Static method to store the currently visible Battle Menu
  public static setCurrentOpenMenu(newState: BattleMenuStates): void {
    this.setState({ currentOpenMenu: newState });
  }

  // Static method to store the current position of the cursor
  public static setCurrentMenuCell(newCell: CursorPositions2x2): void {
    this.setState({ currentMenuCell: newCell });
  }

  // Static method to store the current player
  public static setCurrentPlayer(newPlayer: PlayerBattleCreature | null): void {
    this.setState({ currentPlayer: newPlayer });
  }

  // Static method to store the current enemy
  public static setCurrentEnemy(newPlayer: EnemyBattleCreature | null): void {
    this.setState({ currentEnemy: newPlayer });
  }

  public static setCurrentAttackGrid(
    newGrid: BattleState["currentAttackGrid"]
  ) {
    this.setState({ currentAttackGrid: newGrid });
  }
}
