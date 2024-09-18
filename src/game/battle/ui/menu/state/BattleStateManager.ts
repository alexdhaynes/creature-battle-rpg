import { CursorPositions2x2 } from "@game/battle/battleUIConstants";
import { PlayerBattleCreature } from "@game/battle/creatures";
import { BattleMenuStates } from "@game/constants/gameConstants";

type BattleState = {
  currentMenuState: BattleMenuStates;
  currentPlayer: PlayerBattleCreature | null;
  currentPlayerAttack: string | null;
  currentEnemyAttack: string | null;
  currentMessage: string[];
  currentMenuCell: CursorPositions2x2;
};

export class BattleStateManager {
  private static _state: BattleState = {
    currentMenuState: BattleMenuStates.Main,
    currentPlayer: null,
    currentPlayerAttack: "",
    currentEnemyAttack: "",
    currentMessage: [""],
    currentMenuCell: CursorPositions2x2.TOP_LEFT,
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
  public static setCurrentPlayer(newPlayer: PlayerBattleCreature): void {
    this.setState({ currentPlayer: newPlayer });
    console.log("new state ");
    console.log(this.getState());
  }
}

// import { BattleMenuStates } from "@game/battle/ui/menu/state/BattleMenuStateMachine";
// import { CursorPositions2x2 } from "@game/battle/battleUIConstants";
// import { PlayerBattleCreature } from "@game/battle/creatures";

// type BattleState = {
//   currentMenuState: BattleMenuStates;
//   currentPlayer: PlayerBattleCreature | null;
//   currentPlayerAttack: string | null;
//   currentEnemyAttack: string | null;
//   currentMessage: string[];
//   currentMenuCell: CursorPositions2x2;
// };

// export class BattleStateManager {
//   #state: BattleState;

//   constructor() {
//     this.#state = {
//       currentMenuState: BattleMenuStates.Main,
//       currentPlayerAttack: "",
//       currentEnemyAttack: "",
//       currentMessage: [""],
//       currentMenuCell: CursorPositions2x2.TOP_LEFT,
//       currentPlayer: null,
//     };
//   }

//   setState(newState: Partial<BattleState>) {
//     this.#state = { ...this.#state, ...newState };
//   }

//   // Get the entire state
//   getState(): BattleState {
//     return this.#state;
//   }

//   // Specific setters for state fields
//   setCurrentMessage(messageList: string[]) {
//     this.setState({ currentMessage: messageList });
//   }

//   setcurrentPlayerAttack(attack: string) {
//     this.setState({ currentPlayerAttack: attack });
//   }

//   setcurrentEnemyAttack(attack: string) {
//     this.setState({ currentEnemyAttack: attack });
//   }

//   // Store the currently visible Battle Menu
//   setCurrentMenuState(newState: BattleMenuStates) {
//     this.setState({ currentMenuState: newState });
//   }

//   // Store the current position of the cursor
//   setCurrentMenuCell(newCell: CursorPositions2x2) {
//     this.setState({ currentMenuCell: newCell });
//   }

//   // Store the current player
//   setCurrentPlayer(newPlayer: PlayerBattleCreature) {
//     this.setState({ currentPlayer: newPlayer });
//     console.log("new state ");
//     console.log(this.getState());
//   }
// }
