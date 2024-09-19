import { CursorPositions2x2 } from "@game/constants/battleUIConstants";
import { BattleMenuStates } from "@game/constants/gameConstants";

/*
    TODO: 
    - improve state management by taking a redux approach
    - create a UI wireframe and create a component for each piece of UI
        - ensure no excess obejcts
    - 
*/

type BattleState = {
  currentPlayer: {
    name: string;
    currentHealth: number;
    maxHealth: number;
    attackPower: number;
    assetFrame: number;
    attackIds: string[]; // List of IDs or names for the available attacks
  };
  currentEnemy: {
    name: string;
    currentHealth: number;
    maxHealth: number;
    attackPower: number;
    assetFrame: number;
    attackIds: string[]; // List of IDs or names for the available attacks
  };
  currentPlayerAttack: string | null;
  currentEnemyAttack: string | null;
  currentMenuState: BattleMenuStates; // the currently visible menu
  currentMessage: string[]; // List of messages to be displayed in the message display pane
  currentCursorPosition: CursorPositions2x2; // the cursor's current position
  turnCount: number; // Counter to track the current turn number
  gameOver: boolean; // Flag to determine if the game has ended
  playerTurn: boolean; // Flag to track whether it's the player's turn
  enemyTurn: boolean; // Flag for the enemy's turn
  isBattlePaused: boolean; // Flag to handle pause states (e.g., message display)
  battleOutcome: "victory" | "defeat" | null; // Outcome of the battle (victory/defeat/ongoing)
};

/*
State: The GameState holds the centralized state.
Actions: Defined types and payloads to describe state changes.
Reducer: A function that updates the state based on the dispatched action.
Store: A class to manage state and trigger actions.
*/

// TODO 00: Compononents
// FORK
// Put all the UI into components first so we are ready to go

// TODO 0: Initial state object

// TODO 1: Action types
// export const ActionTypes = {
//   PLAYER_ATTACK: "PLAYER_ATTACK",
//   SET_CURRENT_ENEMY: "SET_CURRENT_ENEMY",
//   UPDATE_HEALTH: "UPDATE_HEALTH",
//   SET_MENU_STATE: "SET_MENU_STATE",
//   // Add other game-specific actions here
// };

// // TODO 2: Action functions (define what kind of actions can be dispatched to change the global state)
// export const playerAttack = (attackId: string) => ({
//   type: ActionTypes.PLAYER_ATTACK,
//   payload: { attackId },
// });

// export const setCurrentEnemy = (enemy: any) => ({
//   type: ActionTypes.SET_CURRENT_ENEMY,
//   payload: { enemy },
// });

// // TODO 3: Reducer functions (determine how the state should be updated based on the actions dispatched)
// const battleReducer = (state = initialState, action: any) => {
//   switch (action.type) {
//     case ActionTypes.PLAYER_ATTACK:
//       return {
//         ...state,
//         currentPlayerAttack: action.payload.attackId,
//         messages: [`Player used attack ${action.payload.attackId}`],
//       };

//     case ActionTypes.SET_CURRENT_ENEMY:
//       return {
//         ...state,
//         currentEnemy: action.payload.enemy,
//       };

//     case ActionTypes.UPDATE_HEALTH:
//       return {
//         ...state,
//         currentPlayer: {
//           ...state.currentPlayer,
//           currentHealth: Math.max(
//             0,
//             state.currentPlayer.currentHealth - action.payload.damage
//           ),
//         },
//         currentEnemy: {
//           ...state.currentEnemy,
//           currentHealth: Math.max(
//             0,
//             state.currentEnemy.currentHealth - action.payload.damage
//           ),
//         },
//       };

//     case ActionTypes.SET_MENU_STATE:
//       return {
//         ...state,
//         menuState: action.payload.menuState,
//       };

//     default:
//       return state;
//   }
// };

// // TODO 4: Store; class that holds the state, dispatches actions, and triggers the reducer.

// class Store {
//   private state: GameState;
//   private reducer: (state: GameState, action: Action) => GameState;

//   constructor(
//     reducer: (state: GameState, action: Action) => GameState,
//     initialState: GameState
//   ) {
//     this.reducer = reducer;
//     this.state = initialState;
//   }

//   dispatch(action: Action) {
//     this.state = this.reducer(this.state, action);
//   }

//   getState() {
//     return this.state;
//   }
// }

// const store = new Store(gameReducer, initialState);

// // TODO 5: use the store
// // Simulating an attack on the enemy
// store.dispatch(attackEnemy(5));
// console.log(store.getState().currentEnemy.currentHealth); // 20

// // Changing the menu state
// store.dispatch(changeMenuState("Attacks"));
// console.log(store.getState().menuState); // Attacks

// // Adding a message
// store.dispatch(addMessage("Player used a powerful attack!"));
// console.log(store.getState().messages); // ['Enemy took 5 damage!', 'Player used a powerful attack!']
