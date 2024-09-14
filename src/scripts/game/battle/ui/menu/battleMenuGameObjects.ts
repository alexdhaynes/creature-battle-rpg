import {
  battleUITextStyle,
  BattleMenuOptionLabels,
  battleMenuCursorInitialPosition,
  AttackMenuOptionLabels,
} from "@game/battle/battleUIConstants";

import {
  MonsterAssetKeys,
  UIAssetKeys,
} from "@scripts/game/assets/assetConstants";

// Create Main Menu
export const createMainMenu = (scene: Phaser.Scene) => {
  // battle menu display text object
  const displayTextLine1 = scene.add.text(
    20,
    468,
    "What should",
    battleUITextStyle
  );
  // battle menu display text object
  const displayTextLine2 = scene.add.text(
    20,
    512,
    `${MonsterAssetKeys.IGUANIGNITE} do next?`,
    battleUITextStyle
  );

  // cursor game object
  const battleMenuCursor = scene.add
    .image(
      battleMenuCursorInitialPosition.x,
      battleMenuCursorInitialPosition.y,
      UIAssetKeys.CURSOR,
      0
    )
    .setOrigin(0.5)
    .setScale(2.5);

  // add all the battle menu game objects to a container

  const battleMenuMain = scene.add.container(520, 448, [
    _createMainInfoSubPane(scene),
    scene.add.text(55, 22, BattleMenuOptionLabels.FIGHT, battleUITextStyle),
    scene.add.text(240, 22, BattleMenuOptionLabels.SWITCH, battleUITextStyle),
    scene.add.text(55, 70, BattleMenuOptionLabels.ITEM, battleUITextStyle),
    scene.add.text(240, 70, BattleMenuOptionLabels.FLEE, battleUITextStyle),
    battleMenuCursor,
  ]);

  return {
    displayTextLine1,
    displayTextLine2,
    battleMenuCursor,
    battleMenuMain,
  };
};

// Contextual submenu depending on which battle action has been chosen
// Displays on the left in the main info wrapper pane
// When "Fight" option is chosen, display  available attacks
export const createAttackMenu = (scene: Phaser.Scene) => {
  // create attack battle menu cursor
  const attackMenuCursor = scene.add
    .image(
      battleMenuCursorInitialPosition.x,
      battleMenuCursorInitialPosition.y,
      UIAssetKeys.CURSOR,
      0
    )
    .setOrigin(0.5)
    .setScale(2.5);

  const battleMenuAttack = scene.add.container(0, 448, [
    scene.add.text(55, 22, AttackMenuOptionLabels.MOVE_1, battleUITextStyle),
    scene.add.text(240, 22, AttackMenuOptionLabels.MOVE_2, battleUITextStyle),
    scene.add.text(55, 70, AttackMenuOptionLabels.NO_MOVE, battleUITextStyle),
    scene.add.text(240, 70, AttackMenuOptionLabels.NO_MOVE, battleUITextStyle),
    attackMenuCursor,
  ]);

  return {
    attackMenuCursor,
    battleMenuAttack,
  };
};

// The main info pane at the left-bottom of the screen
// This is a wrapper for the sub info pane
export const createMainInfoPane = (scene: Phaser.Scene) => {
  const rectHeight = 124;
  const padding = 4;

  return scene.add
    .rectangle(
      padding, //x
      scene.scale.height - rectHeight - padding, // y
      scene.scale.width - padding * 2, //width
      rectHeight, //height
      0xede4f3, //fil
      1
    )
    .setOrigin(0)
    .setStrokeStyle(8, 0x382350, 1);
};

// The sub info pane
// Displays on the right side
const _createMainInfoSubPane = (scene: Phaser.Scene) => {
  const rectWidth = 500;
  const rectHeight = 124;

  return scene.add
    .rectangle(0, 0, rectWidth, rectHeight, 0xede4f3, 1)
    .setOrigin(0)
    .setStrokeStyle(8, 0x905ac2, 1);
};
