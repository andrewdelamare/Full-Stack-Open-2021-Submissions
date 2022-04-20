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
    like(state, action) {
      const updated = action.payload;
      state.blogs = [...state.blogs].map(blog => blog.id !== updated.id ? blog : updated);
      return state;
    },
    comment(state, action) {
      const updated = action.payload;
      state.blogs = [...state.blogs].map(blog => blog.id !== updated.id ? blog : updated);
      return state;
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

export const {remove, like, comment, add, initialize} = blogSlice.actions;

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

export const likeIt = (blog, token) => {
  return async (dispatch) => {
    blogService.likeBlog(blog, token);
    dispatch(like(blog));
  };
};

export const commentIt = (blog, token) => {
  return async (dispatch) => {
    blogService.commentBlog(blog, token);
    dispatch(comment(blog));
  };
};

export const deleteIt = (id) => {
  return async (dispatch) => {
    dispatch(remove(id))
}}

export default blogSlice.reducer;