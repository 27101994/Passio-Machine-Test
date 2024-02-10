
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      accessToken: null,
      // Other user properties if needed
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      window.localStorage.setItem('user', JSON.stringify(action.payload));
    },
    removeUser: (state) => {
      state.user = null;
      window.localStorage.removeItem('user');
    },
    setUserFromLocalStorage: (state) => {
      var user = window.localStorage.getItem('user');
      if (user) {
        state.user = JSON.parse(user);
      } else {
        state.user = null;
      }
    },
  },
});

export const { setUser, removeUser, setUserFromLocalStorage } = authSlice.actions;

export default authSlice.reducer;
