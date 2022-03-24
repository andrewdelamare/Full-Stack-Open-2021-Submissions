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

export const displayNotification = (note, time) => {
  return async (dispatch) => {
    dispatch(notify(note));
    setTimeout(()=> {
      dispatch(clear());
    }, time*1000);
  };
};


export default notificationSlice.reducer;
