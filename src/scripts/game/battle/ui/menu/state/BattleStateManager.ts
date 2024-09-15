import { BattleMenuStates } from "@game/battle/ui/menu/state/BattleMenuStateMachine";

export class BattleStateManager {
  currentState: BattleMenuStates;

  playerAttack: string = "";
  enemyAttack: string = "";
  currentMessage: string[] = [""];

  constructor() {
    this.currentState = BattleMenuStates.Main;
  }

  setCurrentMessage(messageList: string[]) {
    this.currentMessage = messageList;
  }

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
