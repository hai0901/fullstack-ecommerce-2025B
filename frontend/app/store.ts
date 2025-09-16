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