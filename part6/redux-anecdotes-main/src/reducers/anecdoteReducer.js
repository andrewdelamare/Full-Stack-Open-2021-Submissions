/* eslint-disable no-unused-vars */
import {createSlice} from '@reduxjs/toolkit';

const anecdotesAtStart = [];

export const asObject = (anecdote) => {
  const getId = () => (100000 * Math.random()).toFixed(0);
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};
const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    vote(state, action) {
      const id = action.payload;
      const toChange = state.find((n) => n.id === id);
      toChange.votes = toChange.votes +=1;
      state.sort((a, b) => b.votes - a.votes);
    },
    add(state, action) {
      const quoteToAdd = asObject(action.payload);
      const noteAdded = [...state, quoteToAdd];
      return noteAdded;
    },
    initialize(state, action) {
      state = action.payload;
      return action.payload;
    },
  },
});

export const {vote, add, initialize} = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
