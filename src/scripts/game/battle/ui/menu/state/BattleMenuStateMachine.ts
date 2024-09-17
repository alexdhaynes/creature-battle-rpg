import { InputActions } from "@game/gameConstants";
import { StateMachine, TransitionPayload } from "@game/StateMachine";
import { BattleStateManager } from "@game/battle/ui/menu/state/BattleStateManager";
import { BattleMenuOptionLabels } from "@game/battle/battleUIConstants";
import { BattleMenu } from "@game/battle/ui/menu/BattleMenu";

export enum BattleMenuStates {
  Main = "BATTLE_MENU_MAIN",
  Attacks = "BATTLE_MENU_ATTACKS",
  Creatures = "BATTLE_MENU_MONSTERS",
  Inventory = "BATTLE_MENU_INVENTORY",
  DisplayPersistentMessage = "BATTLE_MENU_PERSISTENT_MESSAGE",
  DisplayTimedMessage = "BATTLE_MENU_TIMED_MESSAGE",
  Closed = "BATTLE_MENU_CLOSED",
}

export class BattleMenuStateMachine extends StateMachine<
  BattleMenuStates,
  InputActions
> {
  battleMenu; //reference to the BattleMenu class for updating its UI
  battleStateManager: BattleStateManager;
  // dispatch() is in the superclass

  constructor(battleMenu: BattleMenu) {
    super();
    this.battleMenu = battleMenu;
    this.battleStateManager = new BattleStateManager();
    this.initializeTransitions();
  }

  // Update menu state and notify observers when that has been done
  updateMenuState(newState: BattleMenuStates) {
    // Update BattleStateManager state
    this.battleStateManager.setCurrentMenuState(newState);
    // Notify observers of the state change
    this.notifyObservers(newState);
  }

  // initialize transitions
  initializeTransitions() {
    // bind this to the handlers because they lose their "this"
    this.transitions = {
      [BattleMenuStates.Main]: {
        [InputActions.OK]: this.handleMainOk.bind(this),
        [InputActions.CANCEL]: this.handleMainCancel.bind(this),
      },
      [BattleMenuStates.Attacks]: {
        [InputActions.OK]: this.handleAttacksOk.bind(this),
        [InputActions.CANCEL]: this.handleAttacksCancel.bind(this),
      },
      [BattleMenuStates.Inventory]: {
        [InputActions.OK]: this.handleInventoryOk.bind(this),
        [InputActions.CANCEL]: this.handleInventoryCancel.bind(this),
      },
      [BattleMenuStates.Creatures]: {
        [InputActions.OK]: this.handleCreaturesOk.bind(this),
        [InputActions.CANCEL]: this.handleCreaturesCancel.bind(this),
      },
      [BattleMenuStates.DisplayPersistentMessage]: {
        [InputActions.OK]: this.handleMessageOk.bind(this),
      },
      [BattleMenuStates.DisplayTimedMessage]: {
        [InputActions.TIMEOUT]: this.handleMessageTimeout.bind(this),
      },
      [BattleMenuStates.Closed]: {
        [InputActions.OK]: this.handleBattleMenuClose.bind(this),
        [InputActions.CANCEL]: undefined,
      },
    };
  }

  // Handler methods for the transitions
  handleMainOk(payload: TransitionPayload) {
    console.log(`handleMainOk payload(): ${payload.menuItem}`);

    // Handle selections on the Main Menu
    switch (payload.menuItem) {
      // If the Fight menu item is selected
      case BattleMenuOptionLabels.FIGHT:
        this.updateMenuState(BattleMenuStates.Attacks);
        this.battleStateManager.setcurrentPlayerAttack(payload.menuItem);
        break;

      // If the Item (Inventory) menu item is selected
      case BattleMenuOptionLabels.ITEM:
        this.updateMenuState(BattleMenuStates.Inventory);
        break;

      // If the Switch menu item is selected
      case BattleMenuOptionLabels.SWITCH:
        this.updateMenuState(BattleMenuStates.Creatures);
        break;

      // If the FLEE menu item is selected
      case BattleMenuOptionLabels.FLEE:
        this.updateMenuState(BattleMenuStates.Closed);
        break;
    }
  }

  handleMainCancel(payload: TransitionPayload) {
    console.log(`handleMainCancel() payload: ${payload.menuItem}`);
  }

  handleAttacksOk(payload: TransitionPayload) {
    console.log(`handleAttacksOk()`);

    this.battleStateManager.setcurrentPlayerAttack(payload.menuItem);

    // Update the state to display the message about the chosen attack
    this.updateMenuState(BattleMenuStates.DisplayTimedMessage);
  }

  handleAttacksCancel() {
    console.log("handleAttacksCancel()");
    console.log("backToMainMenu()");
    this.updateMenuState(BattleMenuStates.Main);
  }

  handleInventoryOk() {
    // go back to main menu
    this.updateMenuState(BattleMenuStates.Main);
  }

  handleInventoryCancel() {
    // go back to main menu
    this.updateMenuState(BattleMenuStates.Main);
  }

  handleCreaturesOk() {
    // go back to main menu
    this.updateMenuState(BattleMenuStates.Main);
  }

  handleCreaturesCancel() {
    // go back to main menu
    this.updateMenuState(BattleMenuStates.Main);
  }

  handleMessageTimeout() {
    this.updateMenuState(BattleMenuStates.DisplayTimedMessage);
  }

  handleMessageOk() {
    this.updateMenuState(BattleMenuStates.DisplayPersistentMessage);
  }

  handleMessageCancel() {
    console.log("handle message cancel");
  }

  handleBattleMenuClose() {
    this.updateMenuState(BattleMenuStates.Closed);
    console.log("handleBattleMenuClose(). Closing battle menu.");
  }
}
