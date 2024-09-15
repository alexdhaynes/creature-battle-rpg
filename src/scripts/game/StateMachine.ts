export type TState = string; // TODO: be more specific about which string constants are allowed here
export type TAction = string;

export type TransitionsType<TState extends string, TAction extends string> = {
  [state in TState]: Partial<Record<TAction, TransitionHandler>>; // Use Partial to make actions optional
};

export type TransitionHandler = (payload: any) => void;

// TODO: refine this dispatch payload type
export type TransitionPayload = {
  [key: string]: any;
};

export class StateMachine<TState extends string, TAction extends string> {
  currentState: TState;
  transitions: TransitionsType<TState, TAction>;

  constructor(initialState: TState) {
    this.currentState = initialState;
    this.transitions = {} as TransitionsType<TState, TAction>;
  }

  // Transitions will be implemented in subclasses
  initTransitions(): void {
    throw new Error(
      "initialiinitTransitionszeTransitions should be implemented by subclass"
    );
  }

  // Dispatch an action based on the current state
  dispatch(state: TState, actionName: TAction, payload: any): void {
    const action = this.transitions[state]?.[actionName];
    console.log(`dispatch: ${actionName}; to state: ${state}`, payload);

    if (action) {
      action(payload);
    } else {
      console.error(`${actionName} is not valid for ${state}`);
    }
  }

  // Update the current state
  updateState(newState: TState): void {
    this.currentState = newState;
    console.log(`called updateState(); new state: ${newState}`);
  }
}
