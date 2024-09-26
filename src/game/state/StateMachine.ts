export type State = {
  name: string;
  onEnter?: () => void; // a method that runs when we have first entered the state
};

export class StateMachine {
  #id: string; // a unique id to identify the StateMachine
  #context: Phaser.Scene | undefined; // the correct "this" for the StateMachine
  #states: Map<string, State>;
  #currentState: State | undefined;
  #isTransitioning: boolean; // is the state currently in transition?
  #stateQueue: string[]; // the queue of state names that the machine will transition to

  constructor(id: string, context?: Phaser.Scene | undefined) {
    this.#id = id;
    this.#context = context;
    this.#isTransitioning = false;
    this.#stateQueue = [];
    this.#currentState = undefined;
    this.#states = new Map();
  }

  get currentStateName(): string | undefined {
    return this.#currentState?.name;
  }

  update() {
    if (this.#stateQueue && this.#stateQueue.length > 0) {
      // dequeue the stateQueue and pass that state to the setter
      this.setState(this.#stateQueue.shift() as string);
    }
  }

  setState(newStateName: string) {
    const methodName = "setState";
    // throw a warning if user tries to add a state that doesn't exist
    if (!this.#states.has(newStateName)) {
      console.warn(
        `[${StateMachine.name}--${
          this.#id
        }:${methodName}] tried to transition to unknown state ${newStateName}`
      );
      return;
    }

    if (this.#isCurrentState(newStateName)) {
      return;
    }

    // If the machine is currently in transition, enqueue the new state
    if (this.#isTransitioning) {
      this.#stateQueue.push(newStateName);
    }

    // Start the state transition
    this.#isTransitioning = true;
    // Log the transition
    console.log(
      `[${StateMachine.name}--${
        this.#id
      }:${methodName}] state transitioning from ${
        this.#currentState?.name ?? "no current state" // note: ?? returns the right side operand exactly when the left side is null or undefined.
      } to ${newStateName}`
    );

    // Update the state with the new state
    this.#currentState = this.#states.get(newStateName);

    // Call the transition callback if it exists
    if (this.#currentState?.onEnter) {
      this.#currentState.onEnter();

      // Log the invocation of onEnter
      console.log(
        `[${StateMachine.name}--${
          this.#id
        }:${methodName}] state transitioning from ${
          this.#currentState?.name ?? "no current state"
        } onEnter() invoked.`
      );
    }

    // End the transition
    this.#isTransitioning = false;
  }

  // add a new State to our #states array
  addState(newStateObj: State) {
    this.#states.set(newStateObj.name, {
      name: newStateObj.name,
      onEnter: this.#context
        ? newStateObj.onEnter?.bind(this.#context) // bind the appropriate context to the new state, if a context for it exists
        : newStateObj.onEnter,
    } as State);
  }

  // check if a provided state name is already the current state
  #isCurrentState(stateName: String): boolean {
    if (!this.#currentState) {
      return false;
    }
    return this.#currentState.name == stateName;
  }
}
