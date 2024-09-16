import { Directions } from "@scripts/game/gameConstants";

import {
  CursorPositions2x2,
  CursorPositions2x2Map,
  TBattleMenuOptionNavigationMap,
} from "@game/battle/battleUIConstants";
import { BattleStateManager } from "@game/battle/ui/menu/state/BattleStateManager";

// A Cursor class which takes in a cursor Game Object and other properties
export class Cursor {
  //#cursorIsDisabled: boolean; // keep track of whether the cursor is disabled or not
  #navigationMap!: TBattleMenuOptionNavigationMap; // store the navigation path for this cursor
  #cursor!: Phaser.GameObjects.Image; // a reference to the image object for the cursor
  #cursorPositionsGrid!: CursorPositions2x2Map;
  #stateManager!: BattleStateManager;

  constructor(
    navigationMap: TBattleMenuOptionNavigationMap, // map's a cursor's current cardinal position to its next (eg: Top Left to Bottom Left)
    cursorPositionsGrid: CursorPositions2x2Map, // maps a cursor's current (x,y) pos to its next (x,y) pos
    cursorGameObject: Phaser.GameObjects.Image,
    stateManager: BattleStateManager
  ) {
    //this.#cursorIsDisabled = true;
    this.#navigationMap = navigationMap;
    this.#cursorPositionsGrid = cursorPositionsGrid;
    this.#cursor = cursorGameObject;
    this.#stateManager = stateManager;
  }

  // get the Phaser game object
  getGameObject() {
    return this.#cursor;
  }

  /*
  get cursorIsDisabled() {
    return this.#cursorIsDisabled;
  }

  set cursorIsDisabled(status: boolean) {
    this.#cursorIsDisabled = status;
  }
  */

  // Given a directional input, move the cursor to the appropriate cell
  moveCursor(direction: keyof typeof Directions) {
    console.log("Cursor > moveCursor(): moving cursor ", direction);
    // pass the current 2x2 cell to the navigation map
    const { currentMenuCell } = this.#stateManager.getState();

    const newCell = currentMenuCell
      ? this.#navigationMap[currentMenuCell][direction]
      : undefined;

    if (newCell) {
      console.log("new cell ", newCell);

      // update the current cursor location in state
      this.#stateManager.setCurrentMenuCell(newCell);

      // Use navigation mapping to determine new cursor coords
      const { cursorX, cursorY } = this.#cursorPositionsGrid[newCell];
      console.log(`new cursorX ${cursorX}; new cursorY ${cursorY}`);

      // set the cursor's position
      this.#cursor.setPosition(cursorX, cursorY);
    }
  }

  // reset cursor to the top left of the grid
  resetCursorPosition() {
    // set the cursor's position
    const { cursorX, cursorY } =
      this.#cursorPositionsGrid[CursorPositions2x2.TOP_LEFT];

    // reset the current cell to top left in state and on canvas
    this.#stateManager.setCurrentMenuCell(CursorPositions2x2.TOP_LEFT);
    this.#cursor.setPosition(cursorX, cursorY);
  }
}
