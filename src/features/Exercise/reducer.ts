import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCandidates } from '.';
import { RootState } from '..';
import { BallStrike, initialState, Kabeana, Running, MODE_BALL_STRIKE, MODE_KABEANA, MODE_RUNNING, MODE_SQUAT, MODE_FLAG, Pose, Squat, Flag } from './models';

export const getMode = (state: RootState) => state.exercise.mode;
export const getPose = (state: RootState) => state.exercise.pose;
export const getCount = (state: RootState) => state.exercise.data?.counts;
export const getRunningState = (state: RootState) => state.exercise.data?.state;
const slice = createSlice({
  name: 'exercise',
  initialState,
  reducers: {
    setPose: (state, action: PayloadAction<Pose>) => {
      state.pose = action.payload;
    },
    addCount: (state, action: PayloadAction<number>) => {
      if (state.data) {
        state.data.counts = state.data.counts + action.payload;
      }
    },
    setCount: (state, action: PayloadAction<number>) => {
      if (state.data) {
        state.data.counts = action.payload;
      }
    },
    // changePoseFlag: (state, action: PayloadAction<number>) => {
    //   state.data.numPose = action.payload;
    // },
    setMode: (state, action: PayloadAction<'squat' |'flag' | 'kabeana' | 'ball_strike' | 'running' | undefined>) => {
      state.mode = action.payload;

      switch (action.payload) {
        case MODE_SQUAT:
          {
            const squat: Squat = {
              counts: 0,
              result: undefined,
              image: undefined,
              isLower: false,
            };
            state.data = squat;
          }
          break;
        case MODE_FLAG:
          {
            const flag: Flag = {
              counts: 0,
              result: undefined,
              image: undefined,
              numPose: undefined,
            };
            state.data = flag;
          }
          break;
        case MODE_KABEANA:
          {
            const kabeana: Kabeana = {
              counts: 0,
              result: undefined,
              image: undefined,
              candidates: getCandidates(),
              index: 0,
            };
            console.log('kabeana: ', kabeana);
            state.data = kabeana;
          }
          break;
        case MODE_BALL_STRIKE:
          {
            const strike: BallStrike = {
              counts: 0,
              result: undefined,
              image: undefined,
            }
            state.data = strike;
          }
          break;
        case MODE_RUNNING:
          {
            const running: Running = {
              state: undefined,
              counts: 0,
              result: undefined,
              image: undefined,
            }
            state.data = running;
          }
          break;
        default:
          break;
      }
    },
    setResult: (state, action: PayloadAction<'success' | 'failure' | undefined>) => {
      if (state.data) {
        state.data.result = action.payload;
      }
    },
    setImage: (state, action: PayloadAction<string | undefined>) => {
      if (state.data) {
        state.data.image = action.payload;
      }
    },
    setIsLower: (state, action: PayloadAction<boolean | undefined>) => {
      if (state.data) {
        const data = state.data as Squat;
        data.isLower = action.payload;
      }
    },
    setNumPose:(state, action: PayloadAction<number | undefined>) => {
      if (state.data) {
        const data = state.data as Flag;
        data.numPose = action.payload;
        console.log(action.payload)
      }
    },
    nextKabeanaPose: (state) => {
      if (state.data) {
        const data = state.data as Kabeana;
        data.index = (data.index + 1) % data.candidates.length;
      }
    },
    startSubway: (state) => {
      console.debug('startSubway');
      const data = state.data as Running;
      data.state = 'started';
    },
    finishSubway: (state) => {
      console.debug('finishSubway');
      const data = state.data as Running;
      data.state = 'finished';
    },
  },
});

export default slice.reducer;
export const {
  setPose,
  addCount,
  setCount,
  setMode,
  setResult,
  setImage,
  setIsLower,
  setNumPose,
  nextKabeanaPose,
  startSubway,
  finishSubway,
} = slice.actions;
