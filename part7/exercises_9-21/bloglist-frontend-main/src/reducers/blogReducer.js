import {createSlice} from '@reduxjs/toolkit';
import blogService from '../services/blogs';
const initialState = {blogs: []}

const blogSlice = createSlice({
  name: 'blogList',
  initialState,
  reducers: {
    remove(state, action) {
      const blogId = action.payload
      state.blogs = [...state.blogs].filter(blog => blog.id !== blogId)
      return state;
    },
    vote(state, action) {
      const id = action.payload.id;
      const toChange = state.find((n) => n.id === id);
      toChange.votes = toChange.votes +=1;
      state.sort((a, b) => b.votes - a.votes);
    },
    add(state, action) {
      const blogToAdd = action.payload;
      state.blogs = [...state.blogs, blogToAdd];
      return state;
    },
    initialize(state, action) {
      state.blogs = action.payload;
      return state;
    },
  },
});

export const {remove, vote, add, initialize} = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    const sorted = blogs.sort((a, b) => b.likes - a.likes)
    dispatch(initialize(sorted));
  };
};

export const addNewBlog = (target, token) => {
  return async (dispatch) => {
    const newBlog = await blogService.addBlog(target, token);
    console.log("inner new blog", newBlog)
    dispatch(add(newBlog));
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

export const deleteIt = (id) => {
  return async (dispatch) => {
    dispatch(remove(id))
}}

export default blogSlice.reducer;