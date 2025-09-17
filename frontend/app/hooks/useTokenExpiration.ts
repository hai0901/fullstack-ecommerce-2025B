/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Le Duc Trung, Nguyen Huy Anh
 * ID: s3979718, s3956092
 */

import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './redux-hooks';
import { logout } from '~/features/authentication/authenticationSlice';
import { isTokenExpired } from '~/utils/jwt';

export function useTokenExpiration() {
  const { token, isAuthenticated } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthenticated && token) {
      // Check if token is expired
      if (isTokenExpired(token)) {
        console.log('Token expired, logging out user');
        dispatch(logout());
      }
    }
  }, [isAuthenticated, token, dispatch]);

  // Set up interval to check token expiration every minute
  useEffect(() => {
    if (!isAuthenticated || !token) {
      return;
    }

    const interval = setInterval(() => {
      if (isTokenExpired(token)) {
        console.log('Token expired during session, logging out user');
        dispatch(logout());
        clearInterval(interval);
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [isAuthenticated, token, dispatch]);
}
