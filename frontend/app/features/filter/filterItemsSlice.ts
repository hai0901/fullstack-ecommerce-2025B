import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface FilterItem {
  id: string
  description: string | number[]
}

const initialState: FilterItem[] = [];

const filterItemsSlice = createSlice({
  name: 'filterItems',
  initialState,
  reducers: {
    filterItemAdded(state, action: PayloadAction<FilterItem>) {
      if (action.payload.id !== "priceRange") state.push(action.payload);
      else {
        const priceRangeItem = state.find(item => item.id === "priceRange");
        if (priceRangeItem) {
          priceRangeItem.description = action.payload.description;
        } else {
          state.push(action.payload);
        }
      }
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