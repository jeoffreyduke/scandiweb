import { createSlice } from "@reduxjs/toolkit";

export const pdpSlice = createSlice({
  name: "product",
  initialState: {
    value: [],
  },
  reducers: {
    fetchProductData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { fetchProductData } = pdpSlice.actions;

export default pdpSlice.reducer;
