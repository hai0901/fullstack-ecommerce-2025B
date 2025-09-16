import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface User {
  username: string | null
  name: string | null
  token: string | null
  tokenExpiry: number | null
  isAuthenticated: boolean
  role: string | null
  profilePicture: string | null
  address: string | null
  distributionHub: string | null
}

const initialState : User = {
  username: null,
  name: null,
  token: null,
  tokenExpiry: null,
  isAuthenticated: false,
  role: null,
  profilePicture: null,
  address: null,
  distributionHub: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser(state, action) {
      state.username = action.payload.username;
      state.name = action.payload.name;
      state.token = action.payload.token;
      state.tokenExpiry = action.payload.tokenExpiry;
      state.isAuthenticated = true;
      state.role = action.payload.role;
      state.profilePicture = action.payload.profilePicture;
      state.address = action.payload.address;
      state.distributionHub = action.payload.distributionHub ? action.payload.distributionHub : null;
    },
    logout(state) {
      state.name = null;
      state.username = null;
      state.token = null;
      state.tokenExpiry = null;
      state.role = null;
      state.profilePicture = null;
      state.isAuthenticated = false;
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
      state.tokenExpiry = null;
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
  authenticateUser,
  logout 
} = authSlice.actions;
export default authSlice.reducer;