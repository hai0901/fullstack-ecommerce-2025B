import { configureStore, type Action } from '@reduxjs/toolkit'
import filterItemsReducer from '~/features/filter/filterItemsSlice'
import authReducer from '~/features/authentication/authenticationSlice'

export const store = configureStore({
  reducer: {
    filterItems: filterItemsReducer,
    auth: authReducer
  }
})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>