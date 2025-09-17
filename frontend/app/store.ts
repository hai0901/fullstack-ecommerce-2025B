/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Le Duc Trung, Nguyen Huy Anh
 * ID: s3979718, s3956092
 */

import { configureStore, type Action } from '@reduxjs/toolkit'
import filterItemsReducer from '~/features/filter/filterItemsSlice'
import authReducer from '~/features/authentication/authenticationSlice'
import cartReducer from '~/features/cart/cartSlice'

export const store = configureStore({
  reducer: {
    filterItems: filterItemsReducer,
    auth: authReducer,
    cart: cartReducer
  }
})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>