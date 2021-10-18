export const CHANGE_MODE_SQUAT = (threshold: number = 100) => ({
  "cmd": "change_mode",
  "mode": "squat",
  "threshold": threshold,
});

export const CHANGE_MODE_FLAG = (pose: number = 0) => ({
  "cmd": "change_mode",
  "mode": "flag",
  "pose": pose,
});

export const CHANGE_MODE_KABEANA = (pose: number = 0) => ({
  "cmd": "change_mode",
  "mode": "kabeana",
  "pose": pose,
});

export const CHANGE_MODE_BALL_STRIKE = ({ targets = 5, targetSize = 45, isRightHand = true }: { targets?: number, targetSize?: 45, isRightHand: boolean}) => ({
  "cmd": "change_mode",
  "mode": "ball_strike",
  "attack_keypoint": isRightHand ? "RIGHT_INDEX" : "LEFT_INDEX",
  "n_targets": targets,
  "target_size": targetSize,
});

export const CHANGE_MODE_NEUTRAL = () => ({
  "cmd": "change_mode",
  "mode": "neutral",
});
