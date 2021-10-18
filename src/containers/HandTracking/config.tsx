export const HANDSIGN_WIDTH = 120;    // 表示サイズ  幅
export const HANDSIGN_HEIGHT = 120;   // 表示サイズ  高さ
export const HANDSIGN_DEFAULT = 500; // 初期表示位置

export const DOWN_MOVE_THRESHOLD = 40.0; // DOWN時に移動と見なさない閾値
export const UP_MOVE_THRESHOLD = 15.0; // UP時の移動と見なさない閾値

export const CANCEL_CLICK_CHATTERING_THRESHOLD = 10; // ms
export const DRAG_DELAY = 100;

export const HANDSIGN_ROUTER_DELAY = 800;
// export const HOVER_CLICK_THRESHOLD = 1200; // ホバーでクリックとする閾値
export const HOVER_CLICK_THRESHOLD = 1500; // ホバーでクリックとする閾値
export const HOVER_CLICK_THRESHOLD_CIRCLE = HOVER_CLICK_THRESHOLD * 0.8;

export const STICKY_THRESHOLD = 200; // 短辺がこの値以下の要素はマージンを取らない
export const STICKY_MARGIN = 0.2; // この割合まで要素の内側にカーソルが入った場合に張り付く
export const ENABLE_HOVER_CLICK = process.env.ENABLE_HOVER_CLICK || 'true';

export const DEFAULT_COORDS = {
  "cmd": "set_coord_trans",
  "x": 0.0, // 0 - 1.0
  "y": 0.3, // 0 - 1.0
  "w": 0.6, // 0 - 1.0
  "h": 0.3, // 0 - 1.0
  "round_to_bounds": true // default is true, option.
};

export const HAND_COORDS_LEFT = {
  "cmd": "set_coord_trans",
  "x": 0.0, // 0 - 1.0
  "y": 0.3, // 0 - 1.0
  "w": 0.6, // 0 - 1.0
  "h": 0.3, // 0 - 1.0
  "round_to_bounds": true // default is true, option.
};

export const HAND_COORDS_RIGHT = {
  "cmd": "set_coord_trans",
  "x": 0.4, // 0 - 1.0
  "y": 0.3, // 0 - 1.0
  "w": 0.6, // 0 - 1.0
  "h": 0.3, // 0 - 1.0
  "round_to_bounds": true // default is true, option.
};
