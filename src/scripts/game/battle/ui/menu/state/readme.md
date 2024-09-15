# Battle Menu State Management System

## Battle Menu

- All the UI for the Battle Menu, including keyboard listeners.
- Has references to:
  - `BattleMenuStateMachine`
  - `BattleMenuObserver`

## Battle Menu State Machine

- Handles transitions between states.
- Has references to:
  - `BattleMenu`
  - `BattleStateManager`

## Battle Menu State Observer

- Reacts to state changes by updating the UI.
- Holds a reference to the `BattleMenu`.

## Battle Menu State Manager

- Holds and updates the current battle menu state and battle state.

## Example Flow

1. `BattleScene > update()` listens for keyboard presses every frame.
2. Spacebar is pressed.
3. `BattleScene > update() > handlePlayerInput(<OK Action>)` is called.
4. `BattleMenu > handlePlayerInput()` dispatches:
   - The current state (`BattleMenu.stateMachine.battleStateManager.getState()`)
   - The input action
   - A payload
5. `BattleMenuStateMachine`
   - dispatches the appropriate `transition()` functon based on the `BattleMenuState` and the `InputAction`
   - the `transition()` function invokes `updateState()`
     - `updateState()` triggers a state update in the `BattleStateManager`
     - `updateState()` notfies observer of new state
6. `BattleMenuStateObserver > onStateChange()` is triggered by state change
   - updates UI
