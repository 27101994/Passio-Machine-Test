import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null, // Initialize user as null
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      try {
        window.localStorage.setItem('user', JSON.stringify(action.payload));
      } catch (error) {
        console.error('Error storing user data in local storage:', error);
      }
    },
    removeUser: (state) => {
      state.user = null;
      try {
        window.localStorage.removeItem('user');
      } catch (error) {
        console.error('Error removing user data from local storage:', error);
      }
    },
    setUserFromLocalStorage: (state) => {
      try {
        var user = window.localStorage.getItem('user');
        state.user = user ? JSON.parse(user) : null;
      } catch (error) {
        console.error('Error parsing user data from local storage:', error);
        state.user = null;
      }
    },
  },
});

export const { setUser, removeUser, setUserFromLocalStorage } = authSlice.actions;

export default authSlice.reducer;
