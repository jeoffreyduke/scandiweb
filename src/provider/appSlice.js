import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    value: 0,
  },
  reducers: {
    handleApp: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { handleApp } = appSlice.actions;

export default appSlice.reducer;
