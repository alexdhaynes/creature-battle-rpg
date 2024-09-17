import {
  StateChangeObserver,
  BattleMenuStates,
} from "@game/battle/ui/menu/state/";

export type TState = string; // TYPE TODO: be more specific about which string constants are allowed here
export type TAction = string;

export type TransitionsType<TState extends string, TAction extends string> = {
  [state in TState]: Partial<Record<TAction, TransitionHandler>>; // Use Partial to make actions optional
};

export type TransitionHandler = (payload: any) => void;

export type TransitionPayload = {
  [key: string]: any; // TYPE TODO: be more specific about the payload shape
};

export class StateMachine<TState extends string, TAction extends string> {
  transitions: TransitionsType<TState, TAction>;
  observers: StateChangeObserver[] = []; // List of observers

  constructor() {
    this.transitions = {} as TransitionsType<TState, TAction>;
  }

  // Transitions will be implemented in subclasses
  initTransitions(): void {
    throw new Error(
      "initialiinitTransitionszeTransitions should be implemented by subclass"
    );
  }

  // Add an observer
  addObserver(observer: StateChangeObserver) {
    this.observers.push(observer);
  }

  // Remove an observer
  removeObserver(observer: StateChangeObserver) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  // Notify all observers of a state change
  // TYPE TODO: add more allowable state types
  protected _notifyObservers(newState: BattleMenuStates) {
    this.observers.forEach((observer) => observer.onStateChange(newState));
  }

  // Dispatch an action based on the current state
  dispatch(state: TState, actionName: TAction, payload: any): void {
    const action = this.transitions[state]?.[actionName];
    if (action) {
      action(payload);
    } else {
      console.error(`${actionName} is not valid for ${state}`);
    }
  }
}
