# Battle Menu State Management

## Battle Menu

- all the UI for the BattleMenu, including keyboard listeners
- has references to: `BattleMenuStateMachine`, `BattleMenuObserver`

## Battle Menu State Machine

- handles transitions between states
- has references: to `BattleMenu`, `BattleStateManager`

## Battle Menu State Observer

- reacts to state changes by changing UI
- has a reference to the `BattleMenu`

## Battle Menu State Manager

- holds and updates the current battle menu state / battle state
