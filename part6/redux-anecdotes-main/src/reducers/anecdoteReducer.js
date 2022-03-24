/* eslint-disable no-unused-vars */
import {createSlice} from '@reduxjs/toolkit';
import {getAll, addAnecdote} from '../services/anecdotes';
import {notify, clear} from './notificationReducer';


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
      const quoteToAdd = action.payload;
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

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const quotes = await getAll();
    console.log(quotes);
    dispatch(initialize(quotes));
  };
};

export const addNewAnecdote = (target) => {
  return async (dispatch) => {
    const newQuote = await addAnecdote(target);
    dispatch(add(newQuote));
    dispatch(notify(`Added: ${newQuote.content}`));
    setTimeout(()=> {
      dispatch(clear());
    }, 5000);
  };
};

export default anecdoteSlice.reducer;
