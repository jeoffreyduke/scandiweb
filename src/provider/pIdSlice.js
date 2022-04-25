import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiFetchProductById } from "../api/storeApi";

export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const res = await ApiFetchProductById(id);
    return res;
  }
);

export const pIdSlice = createSlice({
  name: "pid",
  initialState: {
    value: {},
    status: "",
  },
  extraReducers(builder) {
    builder.addCase(fetchProductById.pending, (state) => {
      return {
        ...state,
        status: "loading",
      };
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      return {
        status: "success",
        value: action.payload.data.product,
      };
    });
    builder.addCase(fetchProductById.rejected, () => {
      return {
        status: "error",
        value: {},
      };
    });
  },
});

export const pIdReducer = pIdSlice.reducer;
