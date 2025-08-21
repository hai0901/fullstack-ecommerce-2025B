import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface FilterItem {
  id: string
  description: string
}

const initialState: FilterItem[] = [
  { id: '1', description: '50000 - 200000' },
  { id: '2', description: 'Toys & Games' }
]

const filterItemsSlice = createSlice({
  name: 'filterItems',
  initialState,
  reducers: {
    filterItemAdded(state, action: PayloadAction<FilterItem>) {
      state.push(action.payload)
    },
    filterItemRemoved(state, action: PayloadAction<string>) {
      return state.filter(item => item.id !== action.payload)
    },
    clearFilterItems(state) {
      return [];
    }
  }
})

export const { filterItemAdded, filterItemRemoved, clearFilterItems } = filterItemsSlice.actions;

export default filterItemsSlice.reducer