import {createSlice} from '@reduxjs/toolkit';

const initialState ={ username: "", token: null }

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    
    updateUsername(state, action) {
      const username = action.payload;
      const updatedState = {...state, username};
      return updatedState;
    },
    updateToken(state, action) {
      const token = action.payload;
      const updatedState = {...state, token};
      return updatedState;
    },
  },
})

export const {updateUsername, updateToken} = userSlice.actions;

export const updateUserInfo = (username, token) => {
  return (dispatch) => {
    dispatch(updateUsername(username))
    dispatch(updateToken(token))
  }
}

export default userSlice.reducer;