import {createSlice} from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import {displayNotification} from './notificationReducer';

const initialState ={blogs: [], }

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    vote(state, action) {
      const id = action.payload.id;
      const toChange = state.find((n) => n.id === id);
      toChange.votes = toChange.votes +=1;
      state.sort((a, b) => b.votes - a.votes);
    },
    add(state, action) {
      const blogToAdd = action.payload;
      const blogAdded = [...state, blogToAdd];
      return blogAdded;
    },
    initialize(state, action) {
      state.blogs = action.payload;
      state.blogs.sort((a, b) => b.votes - a.votes);
      return state;
    },
  },
});

export const {vote, add, initialize} = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    console.log(blogs);
    dispatch(initialize(blogs));
  };
};

export const addNewBlog = (target) => {
  return async (dispatch) => {
    const newBlog = await blogService.addBlog(target);
    dispatch(add(newBlog));
    dispatch(displayNotification(`Added: ${newBlog.content}`, 5));
  };
};

export const voteIt = (quote, votes) => {
  return async (dispatch) => {
    console.log(quote);
    const newVotes = votes + 1;
    console.log(newVotes);
    const updated = {content: quote.content, id: quote.id, votes: newVotes};
    console.log(updated);
    blogService.updateBlog(updated);
    dispatch(vote(updated));
  };
};

export default blogSlice.reducer;