/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import {createSlice} from '@reduxjs/toolkit';

const initialState = '';

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action) {
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

export const {setFilter, clear} = filterSlice.actions;
export default filterSlice.reducer;
