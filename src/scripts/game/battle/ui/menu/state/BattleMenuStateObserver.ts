import { BattleMenu } from "@game/battle/ui/menu/BattleMenu";
import { BattleMenuStates } from "@game/battle/ui/menu/state/BattleMenuStateMachine";

export interface StateChangeObserver {
  onStateChange(newState: BattleMenuStates): void;
}

export class BattleMenuObserver implements StateChangeObserver {
  #battleMenu: BattleMenu;

  constructor(battleMenu: BattleMenu) {
    this.#battleMenu = battleMenu;
  }

  onStateChange(newState: BattleMenuStates) {
    // Log the state change
    console.log(`StateChangeObserver: State changed to: ${newState}`);

    switch (newState) {
      case BattleMenuStates.Main:
        // hide whichever submenu is visible when this method is called
        // TODO: for now, just hide all submnus when state changes to Main menu
        this.#battleMenu.hideCreaturesPane();
        this.#battleMenu.hideInventoryPane();
        this.#battleMenu.hideStatusMessage();
        this.#battleMenu.hideAttackMenu();
        // reset cursor pos
        this.#battleMenu.resetCursorPosition();
        // show the Main Menu
        this.#battleMenu.showMainMenu();
        break;

      case BattleMenuStates.Attacks:
        this.#battleMenu.hideMainMenu();
        this.#battleMenu.resetCursorPosition();
        this.#battleMenu.showAttackMenu();
        break;

      case BattleMenuStates.Inventory:
        this.#battleMenu.hideMainMenu();
        this.#battleMenu.showInventoryPane();
        break;

      case BattleMenuStates.Creatures:
        this.#battleMenu.hideMainMenu();
        this.#battleMenu.showCreaturesPane();
        break;

      case BattleMenuStates.DisplayPersistentMessage:
        console.log("display persistent message");
        break;

      case BattleMenuStates.DisplayTimedMessage:
        const currentAttack =
          this.#battleMenu.stateMachine.battleStateManager.playerAttack;

        this.#battleMenu.showAttackMenuMessage([
          `You selected ${currentAttack} attack!`,
        ]);
        setTimeout(() => {
          this.#battleMenu.stateMachine.updateState(BattleMenuStates.Main);
        }, 2000);
        break;

      case BattleMenuStates.Closed:
        this.#battleMenu.hideMainMenu();
        this.#battleMenu.showFleePane();
        break;

      default:
        console.log(`No actions defined for state: ${newState}`);
        break;
    }
  }
}
