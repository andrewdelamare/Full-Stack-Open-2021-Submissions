/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

export const vote = (id) => {
  return {
    type: 'VOTE',
    data: id,
  };
};

export const add = (quote) => {
  return {
    type: 'ADD',
    data: asObject(quote),
  };
};

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE': {
      const quoteToVote = state.find((obj) => obj.id === action.data);
      console.log(quoteToVote);
      const votedQuote = {
        ...quoteToVote,
        votes: quoteToVote.votes += 1};
      console.log('state now: ', state);
      return state.map((quote)=>
        quote.id !== action.data ? quote : votedQuote,
      );
    }
    case 'ADD': {
      const quoteToAdd = action.data;
      console.log(quoteToAdd);
      const noteAdded = [...state, quoteToAdd];
      return noteAdded;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
