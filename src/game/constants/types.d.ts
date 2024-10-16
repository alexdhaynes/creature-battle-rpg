// Asset
export type Asset = {
  key: string;
  path: string;
  type?: string; // indicate if it's not an image
};

export type AssetList = Asset[];

// Scene
export type Scene = {
  key: string;
  scene: typeof Phaser.Scene;
};

export type SceneList = Scene[];

// TODO: import all types into here
