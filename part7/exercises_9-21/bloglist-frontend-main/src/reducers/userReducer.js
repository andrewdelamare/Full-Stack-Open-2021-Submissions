import {createSlice} from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import loginService from '../services/login';
import {displayNotification} from './notificationReducer';
const initialState ={ username: "", password: "", user: null, token: null }

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUsername(state, action) {
      const username = action.payload;
      const updatedState = {...state, username};
      return updatedState;
    },
    updatePassword(state, action) {
      const password = action.payload;
      const updatedState = {...state, password};
      return updatedState;
    },
    loggedInInfo(state, event) {
      const dispatch = useDispatch();
      event.preventDefault();
      try {
        async function login(){
          const u = await loginService.login({
            username: state.username,
            password: state.password,
          });
          const updatedState = {...state, user: u, token:u.token}
          window.localStorage.setItem("loggedBlogappUser", JSON.stringify(u));
          return updatedState
        }
        login();
      } catch (exception) {
          dispatch(displayNotification("Incorrect username or password", false, 5))
          console.log(exception);
      };
    },
  },
})

export const {updateUsername, updatePassword, loggedInInfo} = userSlice.actions;

const handleLogin = (event) => {
  const dispatch = useDispatch();
  event.preventDefault();
  try {
     async function login(){
      const u = await loginService.login({
            username: state.username,
            password: state.password,
          });
          const updatedState = {...state, user: u, token:u.token}
          window.localStorage.setItem("loggedBlogappUser", JSON.stringify(u));
          return updatedState
        }
        login();
      } catch (exception) {
          dispatch(displayNotification("Incorrect username or password", false, 5))
          console.log(exception);
}

}

export default userSlice.reducer;
/*
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
*/