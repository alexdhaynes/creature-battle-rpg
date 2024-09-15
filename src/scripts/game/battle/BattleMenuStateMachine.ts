import { InputActions } from "@game/gameConstants";
import { StateMachine, TransitionPayload } from "@game/StateMachine";
import { BattleMenuOptionLabels } from "@game/battle/battleUIConstants";
import { BattleMenu } from "@game/battle/ui/menu/BattleMenu";

export enum BattleMenuStates {
  Main = "BATTLE_MENU_MAIN",
  Attacks = "BATTLE_MENU_ATTACKS",
  Creatures = "BATTLE_MENU_MONSTERS",
  Inventory = "BATTLE_MENU_INVENTORY",
  Closed = "BATTLE_MENU_CLOSED",
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
      [BattleMenuStates.Creatures]: {
        [InputActions.OK]: this.handleCreaturesOk.bind(this),
        [InputActions.CANCEL]: this.handleCreaturesCancel.bind(this),
      },
      [BattleMenuStates.Closed]: {
        [InputActions.OK]: this.handleBattleMenuClose.bind(this),
        [InputActions.CANCEL]: null,
      },
    };
  }

  // Handler methods for the transitions
  handleMainOk(payload: TransitionPayload) {
    console.log(`handleMainOk payload(): ${payload.menuItem}`);

    // hide the Main menu in all cases
    this.battleMenu.hideMainMenu();

    // Handle selections on the Main Menu
    switch (payload.menuItem) {
      // If the Fight menu item is selected
      case BattleMenuOptionLabels.FIGHT:
        // Update the current state to the Attacks menu
        this.updateState(BattleMenuStates.Attacks);
        // reset the cursor position
        this.battleMenu.resetCursorPosition();
        this.battleMenu.showAttackMenu();

        break;

      // If the Item (Inventory) menu item is selected
      case BattleMenuOptionLabels.ITEM:
        // Update the current state to the Inventory
        this.updateState(BattleMenuStates.Inventory);

        this.battleMenu.showInventoryPane();
        break;

      // If the Switch menu item is selected
      case BattleMenuOptionLabels.SWITCH:
        // Update the current state to the Inventory
        this.updateState(BattleMenuStates.Creatures);
        this.battleMenu.showCreaturesPane();

        break;

      // If the FLEE menu item is selected
      case BattleMenuOptionLabels.FLEE:
        // Update the current state to the Inventory
        this.updateState(BattleMenuStates.Closed);
        this.battleMenu.showFleePane();

        break;
    }
  }

  handleMainCancel(payload: TransitionPayload) {
    console.log(`handleMainCancel() payload: ${payload.menuItem}`);
  }

  handleAttacksOk(payload: TransitionPayload) {
    console.log(`handleAttacksOk() payload: ${payload.menuItem}`);
  }

  handleAttacksCancel() {
    console.log("handleAttacksCancel()");
    console.log("backToMainMenu()");
    this.updateState(BattleMenuStates.Main);
    // reset the cursor position
    this.battleMenu.resetCursorPosition();
    // hide whichever submenu is visible when this method is called
    this.battleMenu.hideAttackMenu();
    // show the Main Menu
    this.battleMenu.showMainMenu();
    //this.battleMenu.backtoMainMenu(;
  }

  handleInventoryOk(payload: TransitionPayload) {
    console.log(`handleInventoryOk() payload: ${payload.menuItem}`);
  }

  handleInventoryCancel(payload: TransitionPayload) {
    // Handle Inventory CANCEL action
    this.updateState(BattleMenuStates.Main);
    this.battleMenu.hideInventoryPane();
    // show the Main Menu
    this.battleMenu.showMainMenu();
    console.log(`handleInventoryCancel() payload: ${payload.menuItem}`);
  }

  handleCreaturesOk(payload: TransitionPayload) {
    // Handle Creatures OK action
    console.log(`handleCreaturesOk() payload: ${payload.menuItem}`);
  }

  handleCreaturesCancel(payload: TransitionPayload) {
    // Handle Creatures CANCEL action
    this.updateState(BattleMenuStates.Main);
    this.battleMenu.hideCreaturesPane();
    // show the Main Menu
    this.battleMenu.showMainMenu();
    console.log(`handleCreaturesCancel() payload: ${payload.menuItem}`);
  }

  handleBattleMenuClose() {
    this.updateState(BattleMenuStates.Closed);
    console.log("handleBattleMenuClose(). Closing battle menu.");
  }
}
