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

export class BattleStateContext extends Phaser.Data.DataManager {
  // Static instance to store the single instance of the class
  private static instance: BattleStateContext;

  private constructor(scene: Phaser.Scene) {
    super(scene);

    // Set the initial battle state
    this.set("battleState", {
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
    });
  }

  // Static method to get the singleton instance
  public static getInstance(scene: Phaser.Scene): BattleStateContext {
    if (!BattleStateContext.instance) {
      BattleStateContext.instance = new BattleStateContext(scene);
    }
    return BattleStateContext.instance;
  }

  // Helper method to get the full battleState
  #getBattleState(): BattleState {
    return this.get("battleState") as BattleState;
  }

  getBattleState(): BattleState {
    return this.get("battleState") as BattleState;
  }

  // Helper method to set the updated battleState
  #setBattleState(updatedState: Partial<BattleState>): void {
    const currentState = this.#getBattleState();
    this.set("battleState", { ...currentState, ...updatedState });
  }

  setCurrentPlayer(player: PlayerBattleCreature | null): void {
    this.#setBattleState({ currentPlayer: player });
  }

  getCurrentPlayer(): PlayerBattleCreature | null {
    return this.#getBattleState().currentPlayer;
  }

  setCurrentEnemy(enemy: EnemyBattleCreature | null): void {
    this.#setBattleState({ currentEnemy: enemy });
  }

  getCurrentEnemy(): EnemyBattleCreature | null {
    return this.#getBattleState().currentEnemy;
  }

  setCurrentPlayerAttack(attack: CreatureAttack | null): void {
    this.#setBattleState({ currentPlayerAttack: attack });
  }

  getCurrentPlayerAttack(): CreatureAttack | null {
    return this.#getBattleState().currentPlayerAttack;
  }

  setCurrentEnemyAttack(attack: CreatureAttack | null): void {
    this.#setBattleState({ currentEnemyAttack: attack });
  }

  getCurrentEnemyAttack(): CreatureAttack | null {
    return this.#getBattleState().currentEnemyAttack;
  }

  setCurrentMessage(messageList: string[]): void {
    this.#setBattleState({ currentMessage: messageList });
  }

  getCurrentMessage(): string[] {
    return this.#getBattleState().currentMessage;
  }

  setCurrentOpenMenu(menuState: BattleMenuStates): void {
    this.#setBattleState({ currentOpenMenu: menuState });
  }

  getCurrentOpenMenu(): BattleMenuStates {
    return this.#getBattleState().currentOpenMenu;
  }

  setCurrentMenuCell(cell: CursorPositions2x2): void {
    this.#setBattleState({ currentMenuCell: cell });
  }

  getCurrentMenuCell(): CursorPositions2x2 {
    return this.#getBattleState().currentMenuCell;
  }

  setCurrentAttackGrid(grid: BattleState["currentAttackGrid"]): void {
    this.#setBattleState({ currentAttackGrid: grid });
  }

  getCurrentAttackGrid(): BattleState["currentAttackGrid"] {
    return this.#getBattleState().currentAttackGrid;
  }
}
