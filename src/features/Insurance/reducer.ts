import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './models';

const slice = createSlice({
  name: 'insurance',
  initialState,
  reducers: {
    setUrlIndex: (state, action: PayloadAction<number | undefined>) => {
      state.urlIndex = action.payload;
    },
    setType: (state, action: PayloadAction<number | undefined>) => {
      state.type = action.payload;
    },
  },
});

export default slice.reducer;
export const { setUrlIndex, setType } = slice.actions;
