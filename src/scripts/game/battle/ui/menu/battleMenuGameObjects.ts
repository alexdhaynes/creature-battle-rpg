import {
  battleUITextStyle,
  BattleMenuOptionLabels,
  battleMenuCursorInitialPosition,
  AttackMenuOptionLabels,
} from "@game/battle/battleUIConstants";

import {
  CreatureAssetKeys,
  UIAssetKeys,
} from "@scripts/game/assets/assetConstants";

// Define the custom return type
interface TextContainerResult {
  textContainer: Phaser.GameObjects.Container;
  textObjects: Phaser.GameObjects.Text[];
}

/* ============ Helper Components ============ */

/* MainMenu structure:
    <battleMenuContainer>

      <battleMenuInfoPane>
        <TextObjects>
      </battleMenuInfoPane>

      <battleMenuNav>
        <battleMenuNavItems />
      </battleMenuNav>
    </battleMenuContainer>
*/

// Create a text container
// Supports an array of text lines
export const createTextContainer = (
  scene: Phaser.Scene,
  textLines: string[],
  x: number,
  y: number
): TextContainerResult => {
  const textContainer = scene.add.container(x, y);
  const paddingY = 24;
  const paddingX = 30;
  const verticalSpacing = 44;

  const textObjects = textLines.map((text, index) => {
    const textObj = scene.add.text(
      paddingX,
      index * verticalSpacing + paddingY,
      text,
      battleUITextStyle
    );
    textContainer.add(textObj);
    return textObj;
  });

  return {
    textContainer,
    textObjects, // Return an array of text objects
  };
};

// Update the contents of a text container
export const updateTextContainer = (
  textObjects: Phaser.GameObjects.Text[],
  newTextLines: string[]
) => {
  textObjects.forEach((textObj, index) => {
    if (index < newTextLines.length) {
      textObj.setText(newTextLines[index]);
    } else {
      // handle cases where there are fewer new text lines than text objects
      textObj.setText(""); // Clear text
    }
  });
};

// The main info bg pane
// Note: positioning is set on its parent
export const createMainBgPane = (scene: Phaser.Scene) => {
  const rectHeight = 124;
  const padding = 2;

  const backgroundRect = scene.add
    .rectangle(
      padding, //x
      padding, // y
      scene.scale.width - padding, //width
      rectHeight, //height
      0xffffff, //fil
      1
    )
    .setOrigin(0)
    .setStrokeStyle(padding * 2, 0xff0000, 1);

  return backgroundRect;
};

// A sub info bg pane (half the width of the main pane)
// Note: positioning is set on its parent
const createSubBgPane = (scene: Phaser.Scene) => {
  const rectWidth = 500; // TODO: create a dynamic constant for this based on main bg pain size
  const rectHeight = 124;
  const padding = 2;

  const backgroundRect = scene.add
    .rectangle(padding, padding, rectWidth, rectHeight, 0xffffff, 1)
    .setOrigin(0)
    .setStrokeStyle(padding * 2, 0x00ff00, 1);

  return backgroundRect;
};

/* ========================  Components ======================== */

// <battleMenuInfoPane>
export const createBattleMenuInfoPane = (scene: Phaser.Scene) => {
  // Create text container for info pane text
  const { textContainer, textObjects } = createTextContainer(
    scene,
    ["What should", `${CreatureAssetKeys.ORANGE_CAT} do next?`],
    0,
    0
  );

  return {
    textContainer,
    textObjects,
  };
};

// Create cursor
export const _createCursor = (scene: Phaser.Scene) => {
  const battleMenuCursor = scene.add
    .image(
      battleMenuCursorInitialPosition.x,
      battleMenuCursorInitialPosition.y,
      UIAssetKeys.CURSOR,
      0
    )
    .setOrigin(0.5)
    .setScale(2.5);

  return {
    battleMenuCursor,
  };
};

// <battleMenuNav>
export const createBattleMenuNav = (scene: Phaser.Scene) => {
  // Create container for battleMenuNavItems
  const _battleMenuNavItems = scene.add.container(0, 0, [
    scene.add.text(55, 22, BattleMenuOptionLabels.FIGHT, battleUITextStyle),
    scene.add.text(240, 22, BattleMenuOptionLabels.SWITCH, battleUITextStyle),
    scene.add.text(55, 70, BattleMenuOptionLabels.ITEM, battleUITextStyle),
    scene.add.text(240, 70, BattleMenuOptionLabels.FLEE, battleUITextStyle),
  ]);

  // create cursor
  const { battleMenuCursor } = _createCursor(scene);

  // Create a container for main manu nav;
  // position it to the right
  const _battleMenuNavContainer = scene.add.container(520, 0, [
    createSubBgPane(scene).setDepth(9), // container background
    _battleMenuNavItems.setDepth(10), // nav items
    battleMenuCursor.setDepth(11), // cursor
  ]);

  const battleMenuNav = scene.add.container(0, 0, [
    _battleMenuNavContainer, // add the nav container
  ]);

  return {
    battleMenuCursor,
    battleMenuNav,
  };
};
/* ============= */

// Create Main Menu and all of its children
// <battleMenuContainer>
export const createMainMenu = (scene: Phaser.Scene) => {
  const containerBg = createMainBgPane(scene);
  const battleMenuContainer = scene.add.container(0, 448);
  const { textContainer, textObjects } = createBattleMenuInfoPane(scene);
  const { battleMenuCursor, battleMenuNav } = createBattleMenuNav(scene);

  battleMenuContainer.add([containerBg, textContainer, battleMenuNav]);

  return {
    textContainer,
    textObjects,
    battleMenuContainer,
    battleMenuCursor,
    battleMenuNav,
  };
};

// Create Attack Menu
export const createAttackMenuNav = (scene: Phaser.Scene) => {
  // create cursor for attack menu
  const attackMenuCursor = _createCursor(scene).battleMenuCursor;

  const attackMenuNav = scene.add.container(0, 448, [
    scene.add.text(55, 22, AttackMenuOptionLabels.MOVE_1, battleUITextStyle),
    scene.add.text(240, 22, AttackMenuOptionLabels.MOVE_2, battleUITextStyle),
    scene.add.text(55, 70, AttackMenuOptionLabels.NO_MOVE, battleUITextStyle),
    scene.add.text(240, 70, AttackMenuOptionLabels.NO_MOVE, battleUITextStyle),
    attackMenuCursor,
  ]);

  return {
    attackMenuNav,
    attackMenuCursor,
  };
};

export const createInventoryPane = (scene: Phaser.Scene) => {
  // Create text container for inventory pane text
  const { textContainer, textObjects } = createTextContainer(
    scene,
    ["There are no items", "in the inventory..."],
    0,
    0
  );

  const inventoryContainer = scene.add
    .container(0, 448, [textContainer])
    .setAlpha(0); // hide initially

  return {
    inventoryContainer,
    textContainer,
    textObjects,
  };
};

export const createSwitchPane = (scene: Phaser.Scene) => {
  // Create text container for switch pane text
  const { textContainer, textObjects } = createTextContainer(
    scene,
    ["There are no creatures", "in your party..."],
    0,
    0
  );

  const creaturesContainer = scene.add
    .container(0, 448, [textContainer])
    .setAlpha(0); // hide initially

  return {
    creaturesContainer,
    textContainer,
    textObjects,
  };
};

export const createFleePane = (scene: Phaser.Scene) => {
  // Create text container for switch pane text
  const { textContainer, textObjects } = createTextContainer(
    scene,
    ["You have fled the battle."],
    0,
    0
  );

  const fleeContainer = scene.add
    .container(0, 448, [textContainer])
    .setAlpha(0); // hide initially

  return {
    fleeContainer,
    textContainer,
    textObjects,
  };
};

// This is a text display pane that will display over the battle menu
export const createTextDisplayPane = (
  scene: Phaser.Scene,
  messageList: string[]
) => {
  const containerBg = createMainBgPane(scene);

  // Create a text container that will sit over the battle manu
  const _textContainer = createTextContainer(scene, messageList, 0, 0);

  const _displayTextContainer = _textContainer.textContainer;

  const displayTextObjects = _textContainer.textObjects;

  const displayTextContainer = scene.add
    .container(0, 448, [containerBg, _displayTextContainer])
    .setAlpha(0); // hide initially

  // add the text container to the battle menu

  return {
    displayTextContainer,
    displayTextObjects,
  };
};
