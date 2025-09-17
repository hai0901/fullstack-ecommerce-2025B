import axios from 'axios';
import { store } from '~/store';
import { logout } from '~/features/authentication/authenticationSlice';
import { isTokenExpired } from './jwt';

// Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;
    // if (token) {
    //   // Check if token is expired before making the request
    //   if (isTokenExpired(token)) {
    //     // Token is expired, dispatch logout
    //     store.dispatch(logout());
    //     return Promise.reject(new Error('Token expired'));
    //   }
    config.headers.Authorization = `Bearer ${token}`;
    console.log("config: ", config);
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors
// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response?.status === 401) {
//       // Token is invalid or expired, logout user
//       store.dispatch(logout());
//     }
//     return Promise.reject(error);
//   }
// );

export default api;
