import {createSlice} from '@reduxjs/toolkit';

const initialState ={ user: null, token: null }

const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    
    updateUser(state, action) {
      const user = action.payload;
      const updatedState = {...state, user};
      return updatedState;
    },
    updateToken(state, action) {
      const token = action.payload;
      const updatedState = {...state, token};
      return updatedState;
    },
  },
})

export const {updateUser, updateToken} = userSlice.actions;

export const updateUserInfo = (user, token) => {
  return (dispatch) => {
    dispatch(updateUser(user))
    dispatch(updateToken(token))
  }
}

export default userSlice.reducer;