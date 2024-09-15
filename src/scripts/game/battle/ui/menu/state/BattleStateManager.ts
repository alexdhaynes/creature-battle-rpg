import { BattleMenuStates } from "@game/battle/ui/menu/state/BattleMenuStateMachine";

export class BattleStateManager {
  currentState: BattleMenuStates;

  playerAttack: string = "";
  enemyAttack: string = "";

  constructor() {
    this.currentState = BattleMenuStates.Main; // or whatever initial state you want
  }

  // Store the chosen attack
  setPlayerAttack(attack: string) {
    this.playerAttack = attack;
  }

  setEnemyAttack(attack: string) {
    this.enemyAttack = attack;
  }

  getState(): BattleMenuStates {
    return this.currentState;
  }

  setState(newState: BattleMenuStates) {
    this.currentState = newState;
  }
}
