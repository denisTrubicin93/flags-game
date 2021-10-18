import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState, Message } from './models';

export const messageSlice = createSlice({
  name: "ws",
  initialState: initialState,
  reducers: {
    connectAction: (state) => {
    },
    connectedAction: (state) => {
    },
    disconnectedAction: (state) => {
    },
    messageAction: (state, action: PayloadAction<Message>) => {
      // state.message = action.payload;
      // console.log(action.payload)
    },
    storeMessageAction: (state, action: PayloadAction<Message>) => {
      state.message = action.payload;

    },
    sendMessageAction: (state, action: PayloadAction<any>) => {
      state = action.payload;
      console.log(state.message);
    },
    messageAction2: (state, action: PayloadAction<string>) => {
      // just for interating UI by mouse
    }
  }
});

//export const sendMessageAction = createAction<any>('sendMessage');
export const {
  connectedAction,
  disconnectedAction,
  messageAction,
  sendMessageAction,
  storeMessageAction,
  messageAction2
} = messageSlice.actions;
export default messageSlice.reducer;
