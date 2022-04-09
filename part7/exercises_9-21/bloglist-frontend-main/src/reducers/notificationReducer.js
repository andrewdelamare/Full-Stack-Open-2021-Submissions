import {createSlice} from '@reduxjs/toolkit';
import { PromiseProvider } from 'mongoose';
import {useSelector} from 'react-redux';

const initialState = {note: '', type: null};

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
      state = {note: '', type: null};
      return state;
    },
  },
});

export const {notify, clear} = notificationSlice.actions;

export const displayNotification = (note, type, time) => {
  return async (dispatch) => {
    const highestId = window.setTimeout(() => {
      for (let i = highestId; i >= 0; i--) {
        window.clearInterval(i);
      }
    }, 0);
    dispatch(notify({note: note, type: type}));
    setTimeout(async ()=> {
      console.log('clearing notification!!!');
      dispatch(clear());
    }, time*1000);
  };
};


export default notificationSlice.reducer;
