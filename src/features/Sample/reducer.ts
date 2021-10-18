import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './models';
import { SucceededPayload, FailedPayload } from '../payload-types';

interface GetMembersParams {
  orgCode: string;
}

export interface UserState {
  users: User[];
  isLoading: boolean;
  error?: Error | null;
}

export const initialState: UserState = {
  users: [],
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    getMembersStarted: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      action: PayloadAction<GetMembersParams>) => {
      state.users = [];
      state.isLoading = true;
    },
    getMembersSucceeded: (
      state,
      action: PayloadAction<
        SucceededPayload<GetMembersParams,{ users: User[] }>
      >
    ) => {
      state.users = action.payload.result.users;
      state.isLoading = false;
      state.error = null;
    },
    getMembersFailed: (
      state,
      action: PayloadAction<FailedPayload<GetMembersParams, Error>>
    ) => {
      state.isLoading = false;
      state.error = action.payload.error;
    }
  }
});

export const { getMembersStarted, getMembersSucceeded, getMembersFailed } = userSlice.actions;
export default userSlice.reducer;
