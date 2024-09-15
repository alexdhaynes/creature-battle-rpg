import { BattleMenuStates } from "@game/battle/ui/menu/state/BattleMenuStateMachine";

type BattleState = {
  currentMenuState: BattleMenuStates;
  currentPlayerAttack: string | null;
  currentEnemyAttack: string | null;
  currentMessage: string[];
};

export class BattleStateManager {
  #state: BattleState;

  constructor() {
    this.#state = {
      currentMenuState: BattleMenuStates.Main,
      currentPlayerAttack: "",
      currentEnemyAttack: "",
      currentMessage: [""],
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

  setCurrentMenuState(newState: BattleMenuStates) {
    this.setState({ currentMenuState: newState });
  }
}
