import { InputActions } from "@game/gameConstants";
import { StateMachine, TransitionPayload } from "@game/StateMachine";
import { BattleMenuOptionLabels } from "@game/battle/battleUIConstants";
import { BattleMenu } from "@game/battle/ui/menu/BattleMenu";

export enum BattleMenuStates {
  Main = "BATTLE_MENU_MAIN",
  Attacks = "BATTLE_MENU_ATTACKS",
  Monsters = "BATTLE_MENU_MONSTERS",
  Inventory = "BATTLE_MENU_INVENTORY",
  StatusDisplay = "BATTLE_MENU_STATUS_DISPLAY",
}

export class BattleMenuStateMachine extends StateMachine<
  BattleMenuStates,
  InputActions
> {
  battleMenu; //reference to the BattleMenu class for updating its UI

  // currentState, transitions{}, dispatch(), updateState() are in the superclass

  constructor(currentState: BattleMenuStates, battleMenu: BattleMenu) {
    super(currentState);
    this.battleMenu = battleMenu;
    this.initializeTransitions();
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
      [BattleMenuStates.Monsters]: {
        [InputActions.OK]: this.handleMonstersOk.bind(this),
        [InputActions.CANCEL]: this.handleMonstersCancel.bind(this),
      },
      [BattleMenuStates.StatusDisplay]: {
        [InputActions.OK]: this.handleStatusDisplayOk.bind(this),
        [InputActions.CANCEL]: this.handleStatusDisplayCancel.bind(this),
      },
    };
  }

  // Handler methods for the transitions
  handleMainOk(payload: TransitionPayload) {
    console.log(`MenuItem: ${payload.menuItem}`);
    if (payload.menuItem === BattleMenuOptionLabels.FIGHT) {
      this.updateState(BattleMenuStates.Attacks);
      // show the Attack Menu
      this.battleMenu.hideMainMenu();
      this.battleMenu.showAttackMenu();
    }
  }

  handleMainCancel(payload: TransitionPayload) {
    console.log(`MenuItem: ${payload.menuItem}`);
  }

  handleAttacksOk(payload: TransitionPayload) {
    console.log(`MenuItem: ${payload.menuItem}`);
  }

  handleAttacksCancel(payload: TransitionPayload) {
    console.log(`MenuItem: ${payload.menuItem}`);
    this.updateState(BattleMenuStates.Main);
    // show the Main Menu
    this.battleMenu.hideAttackMenu();
    this.battleMenu.showMainMenu();
  }

  handleInventoryOk(payload: TransitionPayload) {
    // Handle Inventory OK action
    console.log(payload);
  }

  handleInventoryCancel(payload: TransitionPayload) {
    // Handle Inventory CANCEL action
    console.log(payload);
  }

  handleMonstersOk(payload: TransitionPayload) {
    // Handle Monsters OK action
    console.log(payload);
  }

  handleMonstersCancel(payload: TransitionPayload) {
    // Handle Monsters CANCEL action
    console.log(payload);
  }

  handleStatusDisplayOk(payload: TransitionPayload) {
    // Handle Status Display OK action
    console.log(payload);
  }

  handleStatusDisplayCancel(payload: TransitionPayload) {
    // Handle Status Display CANCEL action
    console.log(payload);
  }
}
