import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import allentryService from "./allentryService";

const initialState = {
  entriesAll: [],
  entries: [],
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

// Get all entries
export const searchEntry = createAsyncThunk(
  "entriesAll/search",
  async (text, thunkAPI) => {
    try {
      return await allentryService.searchEntry(text);
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
  reducers: {
    reset: (state) => initialState,
    clear: (state, action) => {
      return void (state.entries = []);
    },
  },
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
      })
      .addCase(searchEntry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchEntry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.entries = action.payload;
      })
      .addCase(searchEntry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(allentrySlice.actions.clear, () => {
        return [];
      });
  },
});

export const { reset, clear } = allentrySlice.actions;

export default allentrySlice.reducer;
