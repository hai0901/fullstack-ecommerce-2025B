import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

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

// Helper function to get initial state from cookies
const getInitialState = (): User => {
  const token = Cookies.get('auth_token');
  const username = Cookies.get('auth_username');
  const name = Cookies.get('auth_name');
  const role = Cookies.get('auth_role');
  const profilePicture = Cookies.get('auth_profilePicture');
  const address = Cookies.get('auth_address');
  const distributionHub = Cookies.get('auth_distributionHub');
  const tokenExpiry = Cookies.get('auth_tokenExpiry');

  return {
    username: username || null,
    name: name || null,
    token: token || null,
    tokenExpiry: tokenExpiry ? parseInt(tokenExpiry) : null,
    isAuthenticated: !!token,
    role: role || null,
    profilePicture: profilePicture || null,
    address: address || null,
    distributionHub: distributionHub || null
  };
};

const initialState : User = getInitialState();

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

      // Save to cookies with 3 hour expiration
      const expires = new Date(Date.now() + 3 * 60 * 60 * 1000); // 3 hours
      Cookies.set('auth_token', action.payload.token, { expires });
      Cookies.set('auth_username', action.payload.username, { expires });
      Cookies.set('auth_name', action.payload.name, { expires });
      Cookies.set('auth_role', action.payload.role, { expires });
      Cookies.set('auth_profilePicture', action.payload.profilePicture, { expires });
      Cookies.set('auth_address', action.payload.address, { expires });
      if (action.payload.distributionHub) {
        Cookies.set('auth_distributionHub', action.payload.distributionHub, { expires });
      }
      Cookies.set('auth_tokenExpiry', action.payload.tokenExpiry.toString(), { expires });
    },
    logout(state) {
      state.name = null;
      state.username = null;
      state.token = null;
      state.tokenExpiry = null;
      state.role = null;
      state.profilePicture = null;
      state.isAuthenticated = false;

      // Clear all auth cookies
      Cookies.remove('auth_token');
      Cookies.remove('auth_username');
      Cookies.remove('auth_name');
      Cookies.remove('auth_role');
      Cookies.remove('auth_profilePicture');
      Cookies.remove('auth_address');
      Cookies.remove('auth_distributionHub');
      Cookies.remove('auth_tokenExpiry');
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

      // Clear all auth cookies
      Cookies.remove('auth_token');
      Cookies.remove('auth_username');
      Cookies.remove('auth_name');
      Cookies.remove('auth_role');
      Cookies.remove('auth_profilePicture');
      Cookies.remove('auth_address');
      Cookies.remove('auth_distributionHub');
      Cookies.remove('auth_tokenExpiry');
    },
    authenticateUser(state, action) {
      state.isAuthenticated = action.payload;
    },
    updateUser(state, action: PayloadAction<Partial<User>>) {
      // Update state with provided fields
      Object.keys(action.payload).forEach(key => {
        if (key in state && action.payload[key as keyof User] !== undefined) {
          (state as any)[key] = action.payload[key as keyof User];
        }
      });

      // Update cookies with new values
      const expires = new Date(Date.now() + 3 * 60 * 60 * 1000); // 3 hours
      if (action.payload.username !== undefined && action.payload.username !== null) {
        Cookies.set('auth_username', action.payload.username, { expires });
      }
      if (action.payload.name !== undefined && action.payload.name !== null) {
        Cookies.set('auth_name', action.payload.name, { expires });
      }
      if (action.payload.address !== undefined && action.payload.address !== null) {
        Cookies.set('auth_address', action.payload.address, { expires });
      }
      if (action.payload.profilePicture !== undefined && action.payload.profilePicture !== null) {
        Cookies.set('auth_profilePicture', action.payload.profilePicture, { expires });
      }
      if (action.payload.distributionHub !== undefined && action.payload.distributionHub !== null) {
        Cookies.set('auth_distributionHub', action.payload.distributionHub, { expires });
      }
      if (action.payload.role !== undefined && action.payload.role !== null) {
        Cookies.set('auth_role', action.payload.role, { expires });
      }
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
  logout,
  updateUser
} = authSlice.actions;
export default authSlice.reducer;