import { TBattleState, initialState } from "./initialState";
import battleStateReducer from "./reducer";

class Store {
  #state: TBattleState;
  #listeners: ((state: TBattleState) => void)[] = [];
  #reducer;

  constructor(
    reducer: (state: TBattleState, action: any) => TBattleState,
    initialState: TBattleState
  ) {
    this.#state = initialState;
    this.#reducer = reducer;
  }

  getState() {
    return this.#state;
  }

  subscribe(listener: (state: TBattleState) => void) {
    this.#listeners.push(listener);
  }

  #notifyListeners() {
    for (const listener of this.#listeners) {
      listener(this.#state);
    }
  }

  dispatch(action: { type: string; payload: any }) {
    this.#state = this.#reducer(this.#state, action);
    this.#notifyListeners();
  }
}

// create an instance of the store
const store = new Store(battleStateReducer, initialState);

export default store;
