import { GameActions } from "@game/gameConstants";
import { BattleMenuOptionLabels } from "@game/battle/battleUIConstants";

export enum BattleMenuStates {
  Main = "BATTLE_MENU_MAIN",
  Attacks = "BATTLE_MENU_ATTACKS",
  Monsters = "BATTLE_MENU_MONSTERS",
  Inventory = "BATTLE_MENU_INVENTORY",
  StatusDisplay = "BATTLE_MENU_STATUS_DISPLAY",
}

export class BattleMenuStateMachine {
  battleMenu; //reference to the BattleMenu class for updating its UI
  currentState;
  transitions;

  constructor(currentState, battleMenu) {
    this.battleMenu = battleMenu;
    this.currentState = currentState;
    this.transitions = {};
    this.initializeTransitions();
  }

  // initialize transitions
  initializeTransitions() {
    // bind this to the handlers because they lose their "this"
    this.transitions = {
      [BattleMenuStates.Main]: {
        [GameActions.OK]: this.handleMainOk.bind(this),
        [GameActions.CANCEL]: this.handleMainCancel.bind(this),
      },
      [BattleMenuStates.Attacks]: {
        [GameActions.OK]: this.handleAttacksOk.bind(this),
        [GameActions.CANCEL]: this.handleAttacksCancel.bind(this),
      },
      [BattleMenuStates.Inventory]: {
        [GameActions.OK]: this.handleInventoryOk.bind(this),
        [GameActions.CANCEL]: this.handleInventoryCancel.bind(this),
      },
      [BattleMenuStates.Monsters]: {
        [GameActions.OK]: this.handleMonstersOk.bind(this),
        [GameActions.CANCEL]: this.handleMonstersCancel.bind(this),
      },
      [BattleMenuStates.StatusDisplay]: {
        [GameActions.OK]: this.handleStatusDisplayOk.bind(this),
        [GameActions.CANCEL]: this.handleStatusDisplayCancel.bind(this),
      },
    };
  }

  // Dispatch an action based on the current state
  dispatch(actionName, payload) {
    const action = this.transitions[this.currentState]?.[actionName];
    if (action) {
      action(payload);
    } else {
      console.error(`${actionName} is not valid for ${this.currentState}`);
    }
  }

  // Update the current state
  updateState(newState) {
    this.currentState = newState;
  }

  // Handler methods for the transitions
  handleMainOk(payload) {
    console.log(`MenuItem: ${payload.menuItem}`);
    if (payload.menuItem === BattleMenuOptionLabels.FIGHT) {
      this.updateState(BattleMenuStates.Attacks);
      // show the Attack Menu
      this.battleMenu.hideMainMenu();
      this.battleMenu.showAttackMenu();
    }
  }

  handleMainCancel(payload) {
    console.log(`MenuItem: ${payload.menuItem}`);
  }

  handleAttacksOk(payload) {
    console.log(`MenuItem: ${payload.menuItem}`);
  }

  handleAttacksCancel(payload) {
    console.log(`MenuItem: ${payload.menuItem}`);
    this.updateState(BattleMenuStates.Main);
    // show the Main Menu
    this.battleMenu.hideAttackMenu();
    this.battleMenu.showMainMenu();
  }

  handleInventoryOk(payload) {
    // Handle Inventory OK action
  }

  handleInventoryCancel(payload) {
    // Handle Inventory CANCEL action
  }

  handleMonstersOk(payload) {
    // Handle Monsters OK action
  }

  handleMonstersCancel(payload) {
    // Handle Monsters CANCEL action
  }

  handleStatusDisplayOk(payload) {
    // Handle Status Display OK action
  }

  handleStatusDisplayCancel(payload) {
    // Handle Status Display CANCEL action
  }
}
