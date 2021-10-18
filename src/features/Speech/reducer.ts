import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SucceededPayload, FailedPayload } from '../payload-types';

interface GetSpeechParams {
  transcript: string;
}

export interface SpeechState {
  voice: AudioBuffer | null;
  isLoading: boolean;
  error?: Error | null;
}

export const initialState: SpeechState = {
  voice: null,
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "speech",
  initialState: initialState,
  reducers: {
    getSpeechStarted: (
      state,
      action: PayloadAction<GetSpeechParams>) => {
        state.voice = null;
        state.isLoading = true;
    },
    getSpeechSucceeded: (
      state,
      action: PayloadAction<
        SucceededPayload<GetSpeechParams, { voice: AudioBuffer }>
      >
    ) => {
      state.voice = action.payload.result.voice;
      state.isLoading = false;
      state.error = null;
    },
    getSpeechFailed: (
      state,
      action: PayloadAction<FailedPayload<GetSpeechParams, Error>>
    ) => {
      state.voice = null;
      state.isLoading = false;
      state.error = action.payload.error;
    }
  }
});

export const { getSpeechStarted, getSpeechSucceeded, getSpeechFailed } = userSlice.actions;
export default userSlice.reducer;
