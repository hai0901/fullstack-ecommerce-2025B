import { configureStore, type Action } from '@reduxjs/toolkit'
import filterItemsReducer from '~/features/filter/filterItemsSlice'

export const store = configureStore({
  reducer: {
    filterItems: filterItemsReducer
  }
})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>