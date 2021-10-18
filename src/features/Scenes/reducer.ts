import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './models';

const slice = createSlice({
  name: 'scenes',
  initialState,
  reducers: {
    setType: (state, action: PayloadAction<'child' | 'adult' | undefined>) => {
      state.type = action.payload;
    },
  },
});

export default slice.reducer;
export const { setType } = slice.actions;
