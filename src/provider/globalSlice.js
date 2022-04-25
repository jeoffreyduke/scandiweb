import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiFetchAllData } from "../api/storeApi";

export const fetchData = createAsyncThunk("data/fetch_data", async () => {
  const res = await ApiFetchAllData();
  return res;
});

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    value: [],
    status: "",
  },
  extraReducers(builder) {
    builder.addCase(fetchData.pending, () => {
      return {
        value: [],
        status: "loading",
      };
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      return {
        value: action.payload.data,
        status: "success",
      };
    });
    builder.addCase(fetchData.rejected, () => {
      return {
        value: [],
        status: "error",
      };
    });
  },
});

export const globalReducer = globalSlice.reducer;
