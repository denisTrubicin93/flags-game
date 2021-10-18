import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import {
  ButtonPoint,
  ButtonStatus,
  initialState,
} from './models';

export const getHoverTimestamp = (state: RootState) =>
  state.button.hoverTimestamp;
export const getCurrentPoint = (state: RootState) => state.button.point;
export const getCurrentStatus = (state: RootState) => state.button.status;

const slice = createSlice({
  name: 'button',
  initialState,
  reducers: {
    setBtnPoint: (state, action: PayloadAction<ButtonPoint>) => {
      state.point = action.payload;
    },
    setFootPoint: (state, action: PayloadAction<ButtonPoint>) => {
      state.point = action.payload;
    },
    setBtnStatus: (state, action: PayloadAction<ButtonStatus>) => {
      state.status = action.payload;
    },
    updateHoverTimestamp: (
      state,
      action: PayloadAction<number | undefined>
    ) => {
      state.hoverTimestamp = action.payload;
    },
    updateHoverState: (state, action: PayloadAction<boolean>) => {
      // state.hoverTimestamp = nextState.hoverTimestamp;
      // state.hoverClickPercent = nextState.hoverClickPercent;
      // state.hoverClickStatus = nextState.hoverClickStatus;
    },
    enableCursor: (state) => {
      state.enable = true;
      state.hoverClickPercent = 0;
      state.hoverClickStatus = 'default';
    },
    disableCursor: (state) => {
      state.hoverClickPercent = 0;
      state.hoverClickStatus = 'default';
      state.enable = false;
    },
    suspendCursor: (state) => {
      state.isSuspending = true;
    },
    resumeCursor: (state) => {
      state.isSuspending = false;
      state.hoverClickPercent = 0;
      state.hoverClickStatus = 'default';
    },
  },
});

export default slice.reducer;
export const {
  setBtnPoint,
  setFootPoint,
  setBtnStatus,
  updateHoverTimestamp,
  enableCursor,
  disableCursor,
  suspendCursor,
  resumeCursor,
} = slice.actions;
