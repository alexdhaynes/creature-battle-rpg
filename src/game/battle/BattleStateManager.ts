import { CursorPositions2x2 } from "@game/constants/battleUIConstants";
import { PlayerBattleCreature } from "@game/battle/creatures";
import { BattleMenuStates } from "@game/constants/gameConstants";

import { AttackMenuGrid } from "@game/constants/battleUIConstants";

type BattleState = {
  currentMenuState: BattleMenuStates;
  currentPlayer: PlayerBattleCreature | null;
  currentPlayerAttack: string | null;
  currentEnemyAttack: string | null;
  currentMessage: string[];
  currentMenuCell: CursorPositions2x2;
  currentAttackGrid: AttackMenuGrid;
};

export class BattleStateManager {
  private static _state: BattleState = {
    currentMenuState: BattleMenuStates.Main,
    currentPlayer: null,
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
  };

  // Static method to set the state
  public static setState(newState: Partial<BattleState>): void {
    this._state = { ...this._state, ...newState };
  }

  // Static method to get the entire state
  public static getState(): BattleState {
    return this._state;
  }

  // Static method to set the current message
  public static setCurrentMessage(messageList: string[]): void {
    this.setState({ currentMessage: messageList });
  }

  // Static method to set the current player attack
  public static setCurrentPlayerAttack(attack: string): void {
    this.setState({ currentPlayerAttack: attack });
  }

  // Static method to set the current enemy attack
  public static setCurrentEnemyAttack(attack: string): void {
    this.setState({ currentEnemyAttack: attack });
  }

  // Static method to store the currently visible Battle Menu
  public static setCurrentMenuState(newState: BattleMenuStates): void {
    this.setState({ currentMenuState: newState });
  }

  // Static method to store the current position of the cursor
  public static setCurrentMenuCell(newCell: CursorPositions2x2): void {
    this.setState({ currentMenuCell: newCell });
  }

  // Static method to store the current player
  public static setCurrentPlayer(newPlayer: PlayerBattleCreature | null): void {
    this.setState({ currentPlayer: newPlayer });
  }

  public static setCurrentAttackGrid(
    newGrid: BattleState["currentAttackGrid"]
  ) {
    this.setState({ currentAttackGrid: newGrid });
  }
}
