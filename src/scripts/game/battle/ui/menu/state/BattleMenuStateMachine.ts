import { InputActions } from "@game/gameConstants";
import { StateMachine, TransitionPayload } from "@game/StateMachine";
import { BattleStateManager } from "@game/battle/ui/menu/state/BattleStateManager";
import { BattleMenuOptionLabels } from "@game/battle/battleUIConstants";
import { BattleMenu } from "@game/battle/ui/menu/BattleMenu";
import { StateChangeObserver } from "@game/battle/ui/menu/state/BattleMenuStateObserver";

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
  #observers: StateChangeObserver[] = []; // List of observers

  constructor(battleMenu: BattleMenu) {
    super();
    this.battleMenu = battleMenu;
    this.battleStateManager = new BattleStateManager();
    this.initializeTransitions();
  }

  // Add an observer
  addObserver(observer: StateChangeObserver) {
    this.#observers.push(observer);
  }

  // TODO: add observer logic to the StateMachine superclass
  // Remove an observer
  removeObserver(observer: StateChangeObserver) {
    this.#observers = this.#observers.filter((obs) => obs !== observer);
  }

  // Notify all observers of a state change
  #notifyObservers(newState: BattleMenuStates) {
    this.#observers.forEach((observer) => observer.onStateChange(newState));
  }

  updateState(newState: BattleMenuStates) {
    // Update BattleStateManager's state
    this.battleStateManager.setState(newState);
    // Notify observers of the state change
    this.#notifyObservers(newState);
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
        this.updateState(BattleMenuStates.Attacks);
        this.battleStateManager.setPlayerAttack(payload.menuItem);
        break;

      // If the Item (Inventory) menu item is selected
      case BattleMenuOptionLabels.ITEM:
        this.updateState(BattleMenuStates.Inventory);
        break;

      // If the Switch menu item is selected
      case BattleMenuOptionLabels.SWITCH:
        this.updateState(BattleMenuStates.Creatures);
        break;

      // If the FLEE menu item is selected
      case BattleMenuOptionLabels.FLEE:
        this.updateState(BattleMenuStates.Closed);
        break;
    }
  }

  handleMainCancel(payload: TransitionPayload) {
    console.log(`handleMainCancel() payload: ${payload.menuItem}`);
  }

  handleAttacksOk(payload: TransitionPayload) {
    console.log(`handleAttacksOk()`);

    this.battleStateManager.setPlayerAttack(payload.menuItem);

    // Update the state to display the message about the chosen attack
    this.updateState(BattleMenuStates.DisplayTimedMessage);
  }

  handleAttacksCancel() {
    console.log("handleAttacksCancel()");
    console.log("backToMainMenu()");
    this.updateState(BattleMenuStates.Main);
  }

  handleInventoryOk() {
    // go back to main menu
    this.updateState(BattleMenuStates.Main);
  }

  handleInventoryCancel() {
    // go back to main menu
    this.updateState(BattleMenuStates.Main);
  }

  handleCreaturesOk() {
    // go back to main menu
    this.updateState(BattleMenuStates.Main);
  }

  handleCreaturesCancel() {
    // go back to main menu
    this.updateState(BattleMenuStates.Main);
  }

  handleMessageTimeout() {
    this.updateState(BattleMenuStates.DisplayTimedMessage);
  }

  handleMessageOk() {
    this.updateState(BattleMenuStates.DisplayPersistentMessage);
  }

  handleMessageCancel() {
    console.log("handle message cancel");
  }

  handleBattleMenuClose() {
    this.updateState(BattleMenuStates.Closed);
    console.log("handleBattleMenuClose(). Closing battle menu.");
  }
}
