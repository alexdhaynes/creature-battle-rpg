import { battleUITextStyle } from "@game/battle/battleUIConstants";

// Define the custom return type
interface TextContainerResult {
  textContainer: Phaser.GameObjects.Container;
  textObjects: Phaser.GameObjects.Text[];
}

/* ============ Helper Components ============ */

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

// The main bg rectangle
// Note: positioning is set on its parent
export const createFullWidthBgRect = (scene: Phaser.Scene) => {
  const rectHeight = 124;
  const padding = 2;

  const backgroundRect = scene.add
    .rectangle(
      padding, //x
      padding, // y
      scene.scale.width - padding, //width
      rectHeight, //height
      0xfff000, //fil
      1
    )
    .setOrigin(0)
    .setStrokeStyle(padding * 2, 0x000, 1);

  return backgroundRect;
};

// A sub info bg rect (half the width of the main pane)
// Note: positioning is set on its parent
export const createHalfBgRect = (scene: Phaser.Scene) => {
  const rectWidth = 500;
  const rectHeight = 124;
  const padding = 2;

  const backgroundRect = scene.add
    .rectangle(padding, padding, rectWidth, rectHeight, 0x00ff00, 1)
    .setOrigin(0)
    .setStrokeStyle(padding * 2, 0x000, 1);

  return backgroundRect;
};

/* ========================  Components ======================== */

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
export const createFullWidthTextDisplayPane = (
  scene: Phaser.Scene,
  messageList: string[]
) => {
  const containerBg = createFullWidthBgRect(scene);

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
