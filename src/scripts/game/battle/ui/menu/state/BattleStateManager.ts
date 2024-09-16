import { BattleMenuStates } from "@game/battle/ui/menu/state/BattleMenuStateMachine";
import { CursorPositions2x2 } from "@game/battle/battleUIConstants";

type BattleState = {
  currentMenuState: BattleMenuStates;
  currentPlayerAttack: string | null;
  currentEnemyAttack: string | null;
  currentMessage: string[];
  currentMenuCell: CursorPositions2x2;
};

export class BattleStateManager {
  #state: BattleState;

  constructor() {
    this.#state = {
      currentMenuState: BattleMenuStates.Main,
      currentPlayerAttack: "",
      currentEnemyAttack: "",
      currentMessage: [""],
      currentMenuCell: CursorPositions2x2.TOP_LEFT,
    };
  }

  setState(newState: Partial<BattleState>) {
    this.#state = { ...this.#state, ...newState };
  }

  // Get the entire state
  getState(): BattleState {
    return this.#state;
  }

  // Specific setters for state fields
  setCurrentMessage(messageList: string[]) {
    this.setState({ currentMessage: messageList });
  }

  setcurrentPlayerAttack(attack: string) {
    this.setState({ currentPlayerAttack: attack });
  }

  setcurrentEnemyAttack(attack: string) {
    this.setState({ currentEnemyAttack: attack });
  }

  // Store the currently visible Battle Menu
  setCurrentMenuState(newState: BattleMenuStates) {
    this.setState({ currentMenuState: newState });
  }

  // Store the current position of the cursor
  setCurrentMenuCell(newCell: CursorPositions2x2) {
    this.setState({ currentMenuCell: newCell });
  }
}
