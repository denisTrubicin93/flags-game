import { HANDSIGN_DEFAULT } from '../../containers/HandTracking/config';
export interface Hand {
  landmarks: [{ x: number; y: number; z: number }];
  cPoint: { x: number; y: number };
  classification: { label: string; score: number };
  isParm: boolean;
  pose: {
    coordinates: { x: number, y: number, z: number, v: number }[];
    width: number;
    height: number;
  }
}
export interface Gesture {
  gesture: 'FIVE' | 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIST';
  finger_state: {
    thumbIsOpen: boolean;
    firstFingerIsOpen: boolean;
    secondFingerIsOpen: boolean;
    thrdFingerIsOpen: boolean;
    forthFingerIsOpen: boolean;
  };
  label: 'Right' | 'Left';
}

export const HandLandmark = {
  Wrist: 0,
  ThumbCMC: 1,
  ThumbMP: 2,
  ThumbIP: 3,
  ThumbTIP: 4,
  IndexMCP: 5,
  IndexPIP: 6,
  IndexDIP: 7,
  IndexTIP: 8,
  MiddleMCP: 9,
  MiddlePIP: 10,
  MiddleDIP: 11,
  MiddleTIP: 12,
  RingMCP: 13,
  RingPIP: 14,
  RingDIP: 15,
  RingTIP: 16,
  PinkyMCP: 17,
  PinkyPIP: 18,
  PinkyDIP: 19,
  PinkyTIP: 20,
} as const;

export type HandLandmark = typeof HandLandmark[keyof typeof HandLandmark];

export const HandPose = {
  Fist: 0,
  One: 1,
  Two: 2,
  Three: 3,
  Four: 4,
  Five: 5,
} as const;
export type HandPose = typeof HandPose[keyof typeof HandPose];

export const ButtonState = {
  Down: 0,
  Up: 1,
} as const;
export type ButtonState = typeof ButtonState[keyof typeof ButtonState];

export interface HandCursor {
  id: number;
  x: number;
  y: number;
  isExist: boolean;
  isDown: boolean;
  isButtonChanged: boolean;
  te: any;
}

export const HandIndex = {
  LEFT: 0,
  RIGHT: 1,
} as const;
export type HandIndex = typeof HandIndex[keyof typeof HandIndex];

export interface CursorState {
  hands: HandCursor[];
  hoverTimestamp: number | undefined;
  hoverClickPercent: number;
  hoverClickStatus: 'default' | 'success' | 'active' | 'error';
  isHovering: boolean;
  enable: boolean;
  isSuspending: boolean;
}

const initialCursor: HandCursor = {
  id: 1,
  x: HANDSIGN_DEFAULT,
  y: HANDSIGN_DEFAULT,
  isExist: false,
  isDown: false,
  isButtonChanged: false,
  te: undefined,
};

export const initialState: CursorState = {
  hands: [initialCursor, { ...initialCursor, id: 2 }],
  hoverTimestamp: undefined,
  hoverClickPercent: 0,
  hoverClickStatus: "default",
  isHovering: false,
  enable: true,
  isSuspending: false,
};

export const HandEventType = {
  NONE: 0,
  POINTER: 1,
  TOUCH: 2,
} as const;
export type HandEventType = typeof HandEventType[keyof typeof HandEventType];

export const CursorEventType = {
  NONE_TO_NONE: 0,
  NONE_TO_POINTER: 1,
  NONE_TO_TOUCH: 2,
  POINTER_TO_NONE: 3,
  POINTER_TO_POINTER: 4,
  POINTER_TO_TOUCH: 5,
  TOUCH_TO_NONE: 6,
  TOUCH_TO_POINTER: 7,
  TOUCH_TO_TOUCH: 8,
} as const;
export type CursorEventType = typeof CursorEventType[keyof typeof CursorEventType];

export const SideOfHandEventType = {
  NONE_TO_RIGHT: 0,
  NONE_TO_LEFT: 1,
  RIGHT_TO_LEFT: 2,
  LEFT_TO_RIGHT: 3,
  NOT_CHANGED: 4,
  ANY_TO_NONE: 5,
} as const;
export type SideOfHandEventType = typeof SideOfHandEventType[keyof typeof SideOfHandEventType];


export const rightHandCursor = document.createElement('div') as HTMLDivElement;
export const leftHandCursor = document.createElement('div') as HTMLDivElement;
