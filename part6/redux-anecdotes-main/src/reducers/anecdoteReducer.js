/* eslint-disable no-unused-vars */
import {createSlice} from '@reduxjs/toolkit';
import {getAll, addAnecdote, addVote} from '../services/anecdotes';
import {displayNotification} from './notificationReducer';


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
      const id = action.payload.id;
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
      state.sort((a, b) => b.votes - a.votes);
      return state;
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
    dispatch(displayNotification(`Added: ${newQuote.content}`, 5));
  };
};

export const voteIt = (quote, votes) => {
  return async (dispatch) => {
    console.log(quote);
    const newVotes = votes + 1;
    console.log(newVotes);
    const updated = {content: quote.content, id: quote.id, votes: newVotes};
    console.log(updated);
    addVote(updated);
    dispatch(vote(updated));
  };
};

export default anecdoteSlice.reducer;
