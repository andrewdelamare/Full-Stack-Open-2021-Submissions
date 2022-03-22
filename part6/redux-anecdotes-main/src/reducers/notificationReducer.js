/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import {createSlice} from '@reduxjs/toolkit';

const initialState = '';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notify(state, action) {
      const content = action.payload;

      state = content;

      return state;
    },
    clear(state) {
      state = '';
      return state;
    },
  },
});

export const {notify, clear} = notificationSlice.actions;
export default notificationSlice.reducer;
