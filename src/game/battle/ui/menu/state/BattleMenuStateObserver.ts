import { BattleMenu } from "@game/battle/ui/menu/BattleMenu";
import { BattleMenuStates } from "@game/battle/ui/menu/state/BattleMenuStateMachine";
import {
  CursorPositions2x2,
  battleMenuCursorInitialPosition,
} from "@game/battle/battleUIConstants";

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
        // TODO: move this repetitve logic to helper function
        this.#battleMenu.hideCreaturesPane();
        this.#battleMenu.hideInventoryPane();
        this.#battleMenu.hideStatusMessage();
        this.#battleMenu.attackMenu.hide();
        // add the cursor to the main menu
        this.#battleMenu.mainMenu
          .getContainer()
          .add(this.#battleMenu.menuCursorGameObject);
        // reset cursor pos
        this.#battleMenu.menuCursorGameObject.setPosition(
          battleMenuCursorInitialPosition.x,
          battleMenuCursorInitialPosition.y
        );
        // reset the current cell
        this.#battleMenu.stateManager.setCurrentMenuCell(
          CursorPositions2x2.TOP_LEFT
        );

        // show the Main Menu
        this.#battleMenu.mainMenu.show();
        break;

      case BattleMenuStates.Attacks:
        this.#battleMenu.mainMenu.hide();
        // add cursor to the attacks menu
        this.#battleMenu.attackMenu
          .getContainer()
          .add(this.#battleMenu.menuCursorGameObject);
        // reset cursor pos
        this.#battleMenu.menuCursorGameObject.setPosition(
          battleMenuCursorInitialPosition.x,
          battleMenuCursorInitialPosition.y
        );
        // reset the current cell
        this.#battleMenu.stateManager.setCurrentMenuCell(
          CursorPositions2x2.TOP_LEFT
        );

        this.#battleMenu.attackMenu.show();
        break;

      case BattleMenuStates.Inventory:
        this.#battleMenu.mainMenu.hide();
        this.#battleMenu.showInventoryPane();
        break;

      case BattleMenuStates.Creatures:
        this.#battleMenu.mainMenu.hide();
        this.#battleMenu.showCreaturesPane();
        break;

      case BattleMenuStates.DisplayPersistentMessage:
        break;

      case BattleMenuStates.DisplayTimedMessage:
        const { currentPlayerAttack } =
          this.#battleMenu.stateMachine.battleStateManager.getState();

        this.#battleMenu.showStatusMessage([
          `You selected ${currentPlayerAttack} attack!`,
        ]);
        setTimeout(() => {
          this.#battleMenu.stateMachine.updateMenuState(BattleMenuStates.Main);
        }, 1500);
        break;

      case BattleMenuStates.Closed:
        this.#battleMenu.mainMenu.hide();
        this.#battleMenu.showFleePane();
        break;

      default:
        console.error(`No actions defined for state: ${newState}`);
        break;
    }
  }
}
