import { createSlice } from "@reduxjs/toolkit";

export const csSlice = createSlice({
  name: "switcher",
  initialState: {
    value: 0,
  },
  reducers: {
    handleSwitch: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { handleSwitch } = csSlice.actions;

export default csSlice.reducer;
