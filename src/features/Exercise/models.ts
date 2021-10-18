const PoseLandmark = {
  Nose: 0,
  LeftEyeInner: 1,
  LeftEye: 2,
  LeftEyeOuter: 3,
  RightEyeInner: 4,
  RightEye: 5,
  RightEyeOuter: 6,
  LeftEar: 7,
  RightEar: 8,
  MouthLeft: 9,
  MouthRight: 10,
  LeftShoulder: 11,
  RIGHT_SHOULDER: 12,
  LeftElbow: 13,
  RightElBow: 14,
  LeftWrist: 15,
  RightWrist: 16,
  LeftPinky: 17,
  RightPinky: 18,
  LeftIndex: 19,
  RightIndex: 20,
  LeftThumb: 21,
  RightTHumb: 22,
  LeftHip: 23,
  RightHip: 24,
  LeftKnee: 25,
  RightKnee: 26,
  LeftAnkle: 27,
  RightAnkle: 28,
  LeftHeel: 29,
  RightHeel: 30,
  LeftFootIndex: 31,
  RightFootIndex: 32,
} as const;

export type PoseLandmark = typeof PoseLandmark[keyof typeof PoseLandmark];

export interface Pose {
  coordinates: {x: number, y: number, z: number, v:number}[];
  width: number;
  height: number;
}

export interface ExerciseData {
  state?: 'started' | 'finished' | undefined;
  counts: number;
  result: 'success' | 'failure' | undefined;
  image: string | undefined;
}

export interface Squat extends ExerciseData {
  isLower: boolean | undefined;
}
export interface Flag extends ExerciseData {
  numPose: number | undefined;
}

export interface BallStrike extends ExerciseData {

}

export interface Running extends ExerciseData {
}

export interface Kabeana extends ExerciseData {
  candidates: number[];
  index: number;
}

export const MODE_SQUAT = 'squat';
export const MODE_FLAG = 'flag';
export const MODE_RUNNING = 'running';
export const MODE_BALL_STRIKE = 'ball_strike';
export const MODE_KABEANA = 'kabeana';
export const MODE_NEUTRAL = undefined;
export interface ExerciseState {
  pose: Pose;
  mode: 'squat' | 'flag' | 'ball_strike' | 'kabeana' | 'running' | undefined;
  data: Squat | Flag | BallStrike | Kabeana | Running | undefined;
}


export const initialState: ExerciseState = {
  pose: { coordinates: [],  width: 0, height: 0},
  mode: undefined,
  data: {
    counts: 0,
    result: undefined,
    image: undefined,
  },
}

export const KabeanaPose = {
  POSE0001: 0,
  POSE0002: 1,
  POSE0003: 2,
  POSE0004: 3,
  POSE0005: 4,
  POSE0006: 5,
  POSE0007: 6,
  POSE0008: 7,
  POSE0009: 8,
  POSE0010: 9,
  POSE0011: 10,
  POSE0012: 11,
  POSE0013: 12,
  POSE0014: 13,
  POSE0015: 14,
  POSE0016: 15,
  POSE0017: 16,
  POSE0018: 18,
  POSE0019: 18,
  POSE0020: 19,
} as const;
export type KabeanaPose = typeof KabeanaPose[keyof typeof KabeanaPose];
