import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState, Question } from './models';

const slice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    init: (state) => {
      state.questions = [];
      state.ok = 0;
      state.ng = 0;
      state.current = 0;
      state.choose = undefined;
    },
    setLibrary: (state, action: PayloadAction<Question[]>) => {
      state.library = action.payload;
    },
    setChildLibrary: (
      state,
      action: PayloadAction<{ ageType: number; data: Question[] }>
    ) => {
      state.childLibrary[action.payload.ageType] = action.payload.data;
    },
    setQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
    },
    setOk: (state, action: PayloadAction<number>) => {
      state.ok = action.payload;
    },
    setNg: (state, action: PayloadAction<number>) => {
      state.ng = action.payload;
    },
    setCurrent: (state, action: PayloadAction<number>) => {
      state.current = action.payload;
    },
    setChoose: (state, action: PayloadAction<number | undefined>) => {
      state.choose = action.payload;
    },
  },
});

export default slice.reducer;
export const {
  init,
  setLibrary,
  setChildLibrary,
  setQuestions,
  setOk,
  setNg,
  setCurrent,
  setChoose,
} = slice.actions;
