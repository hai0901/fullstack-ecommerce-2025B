import { configureStore, type Action } from '@reduxjs/toolkit'

interface FilterItem {
  description: string
}

type FilterItemsState = FilterItem[];

function filterItemsReducer(state: FilterItemsState = [], action: Action) {
  switch (action.type) {
    default: {
      return state
    }
  }
}

export const store = configureStore({
  reducer: {
    filterItems: filterItemsReducer
  }
})