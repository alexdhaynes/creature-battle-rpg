# Notes about Phaser development

## Ways to add scenes

1.  via the active property on the Phaser.Scene instance
2.  via the GameConfig's scene property
3.  manually by calling game.scane.add and game.scene.start (game of type Phaser.Game)

## Things you can add to scenes

- shapes
- DOM objects
- text
- particles
- video
- and more!
- [GameObject Factory Docs](https://newdocs.phaser.io/docs/3.85.1/Phaser.GameObjects.GameObjectFactory)

## Containers

- Suppose we add a `GameObject` to a `Container`'s `children` reference
- The `GameObject` is visually and interactively part of the `Container`
- The `Container` manages the `GameObject`'s position and rendering.
- The `GameObject` is a child of the `Scene` in terms of Phaser’s internal management
- But the `GameObject` is a child `Container` in terms of its display and positioning

## TODOS:

- when your game is done (and when it has AI hand-pose inputs), send demo to support@phaser.io
