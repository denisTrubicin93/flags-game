import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { Message } from '../Websocket/models';
import { initialState, HandIndex, CursorState } from './models';

export const getCursor = (state: RootState) => state.cursor;
export const isCursorEnable = (state: RootState) => state.cursor.enable;
export const isCursorSuspending = (state: RootState) => state.cursor.isSuspending;

const slice = createSlice({
  name: 'cursor',
  initialState,
  reducers: {
    clear: (state) => {
      state = initialState;
    },
    prepareHandState: (state, action: PayloadAction<Message>) => {},
    emitHtmlEvents: (state, action: PayloadAction<CursorState>) => {},
    updateHandState: (state, action: PayloadAction<CursorState>) => {
      const nextState = action.payload;
      state.hands[HandIndex.LEFT] = nextState.hands[HandIndex.LEFT];
      state.hands[HandIndex.RIGHT] = nextState.hands[HandIndex.RIGHT];
      state.hoverTimestamp = nextState.hoverTimestamp;
      state.hoverClickPercent = nextState.hoverClickPercent;
      state.hoverClickStatus = nextState.hoverClickStatus;
    },
    updateHoverTimestamp: (
      state,
      action: PayloadAction<number | undefined>
    ) => {
      state.hoverTimestamp = action.payload;
    },
    updateHoverState: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isHovering = action.payload;
    },
    enableCursor: (state) => {
      state.enable = true;
      state.hoverClickPercent = 0;
      state.hoverClickStatus = 'default';
    },
    disableCursor: (state) => {
      const cursor = state.hands.find((h) => h.isExist);
      if (cursor) {
        cursor.isExist = false;
      }
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
    }
  },
});

export default slice.reducer;
export const {
  clear,
  prepareHandState,
  emitHtmlEvents,
  updateHandState,
  updateHoverTimestamp,
  updateHoverState,
  enableCursor,
  disableCursor,
  suspendCursor,
  resumeCursor,
} = slice.actions;
