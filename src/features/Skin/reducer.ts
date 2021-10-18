import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState, Rectangle, Attributes } from './models';

const slice = createSlice({
  name: 'skin',
  initialState,
  reducers: {
    setImage: (state, action: PayloadAction<string>) => {
      state.imageBase64 = action.payload;
    },
    setFaceRectangle: (state, action: PayloadAction<Rectangle>) => {
      state.faceRectangle = action.payload;
    },
    setAttributes: (state, action: PayloadAction<Attributes>) => {
      state.attributes = action.payload;
    },
  },
});

export default slice.reducer;
export const { setImage, setFaceRectangle, setAttributes } = slice.actions;
