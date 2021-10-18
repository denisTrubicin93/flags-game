import { createSlice } from '@reduxjs/toolkit';

type User = {
  username?: string
  birthday?: string
}

const initialState: User = {}


const slice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setName: (state, action) => {
      return Object.assign({}, state, { name: action.payload })
    },
    clearName: state => {
      return Object.assign({}, state, { name: "" })
    },
  }
});

export default slice.reducer;

export const { setName, clearName } = slice.actions;
