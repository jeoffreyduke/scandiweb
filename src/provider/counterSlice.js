import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 1,
  },
  reducers: {
    incrementCounter: (state) => {
      state.value++;
    },
  },
});

export const { incrementCounter } = counterSlice.actions;

export default counterSlice.reducer;
