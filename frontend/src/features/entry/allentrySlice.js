import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import allentryService from "./allentryService";

const initialState = {
  entriesAll: [],
  entry: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// Get all entries
export const getAllEntries = createAsyncThunk(
  "entriesAll/getAll",
  async (_, thunkAPI) => {
    try {
      return await allentryService.getAllEntries();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const allentrySlice = createSlice({
  name: "entriesAll",
  initialState,
  reducers: { reset: (state) => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(getAllEntries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllEntries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.entriesAll = action.payload;
      })
      .addCase(getAllEntries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = allentrySlice.actions;

export default allentrySlice.reducer;
