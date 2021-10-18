export const BUTTON_SELECT_THERSHOLD = 1500;
export const BUTTON_SLEEP_THRESHOLD = 30000;
export const FOOT_LIMIT_THRESHOLD = 1000;
export const ButtonStatus = {
  BLUR: 'NONE',
  FORCUS_L1: 'FORCUS_L1',
  FORCUS_L2: 'FORCUS_L2',
  FORCUS_R1: 'FORCUS_R1',
  FORCUS_R2: 'FORCUS_R2',
  SELECTED_L1: 'SELECTED_L1',
  SELECTED_L2: 'SELECTED_L2',
  SELECTED_R1: 'SELECTED_R1',
  SELECTED_R2: 'SELECTED_R2',
}
export type ButtonStatus = typeof ButtonStatus[keyof typeof ButtonStatus];

export const ButtonPoint = {
  BLUR: 'blur',
  L1: 'L1',
  L2: 'L2',
  R1: 'R1',
  R2: 'R2',
} as const;
export type ButtonPoint = typeof ButtonPoint[keyof typeof ButtonPoint];

export interface ButtonState {
  status: ButtonStatus;
  point: ButtonPoint;
  hoverTimestamp: number | undefined;
  hoverClickPercent: number;
  hoverClickStatus: 'default' | 'success' | 'active' | 'error';
  isHovering: boolean;
  enable: boolean;
  isSuspending: boolean;
}

export const initialState: ButtonState = {
  status: ButtonStatus.BLUR,
  point: ButtonPoint.BLUR,
  hoverTimestamp: Date.now(),
  hoverClickPercent: 0,
  hoverClickStatus: "default",
  isHovering: false,
  enable: true,
  isSuspending: false,
}

