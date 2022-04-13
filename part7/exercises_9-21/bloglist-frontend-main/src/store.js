import {configureStore} from '@reduxjs/toolkit';
import blogReducer from './reducers/blogReducer';
import notificationReducer from './reducers/notificationReducer';
import userReducer from './reducers/userReducer';

const store = configureStore({
  reducer: {
    blogList: blogReducer,
    notification: notificationReducer,
    userInfo: userReducer,
  },
});

export default store;
