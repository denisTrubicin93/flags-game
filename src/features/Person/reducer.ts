import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile } from './models';

export interface PersonState {
  profile: Profile;
  isLoading: boolean;
  error: Error | null;
}

export const initialState: PersonState = {
  profile: {
    gender: 'female',
    age: 18,
    marriage: true,
    haveChildren: true,
  },
  isLoading: false,
  error: null,
};

export const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    setPersonalData: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
    },
    setAge: (state, action: PayloadAction<number>) => {
      state.profile.age = action.payload;
    },
    setGender: (
      state,
      action: PayloadAction<'male' | 'female' | 'unknown'>
    ) => {
      state.profile.gender = action.payload;
    },
    setEmotion: (
      state,
      action: PayloadAction<string>
    ) => {
      state.profile.emotion = action.payload;
    },
    setMarriage: (state, action: PayloadAction<boolean>) => {
      state.profile.marriage = action.payload;
    },
    setHaveChildren: (state, action: PayloadAction<boolean>) => {
      state.profile.haveChildren = action.payload;
    },
  },
});

export const {
  setPersonalData,
  setAge,
  setGender,
  setEmotion,
  setMarriage,
  setHaveChildren,
} = personSlice.actions;
export default personSlice.reducer;
