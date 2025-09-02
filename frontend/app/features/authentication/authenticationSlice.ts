import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface User {
  username: string | null
  name: string | null
  token: string | null
  isAuthenticated: boolean
  role: string | null
}

const initialState : User = {
  username: null,
  name: null,
  token: null,
  isAuthenticated: false,
  role: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser(state, action) {
      state.username = action.payload.username;
      state.name = action.payload.name;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.role = action.payload.role;
    },
    setUsername(state, action) {
      state.username = action.payload;
    },
    setName(state, action) {
      state.name = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    clearAuthState(state) {
      state.username = null;
      state.name = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    authenticateUser(state, action) {
      state.isAuthenticated = action.payload;
    },
  }
});

export const { 
  loginUser, 
  setUsername, 
  setName, 
  setToken, 
  clearAuthState, 
  authenticateUser 
} = authSlice.actions;
export default authSlice.reducer;