import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import entryService from "./entryService";

const initialState = {
  entries: [],
  entry: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// Create new entry
export const createEntry = createAsyncThunk(
  "entries/create",
  async (entryData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await entryService.createEntry(entryData, token);
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

// Get user all entries
export const getEntries = createAsyncThunk(
  "entries/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await entryService.getEntries(token);
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

// Get user single entry
export const getEntry = createAsyncThunk(
  "entries/get",
  async (entryId, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token;
      return await entryService.getEntry(entryId);
      // return await entryService.getEntry(entryId, token);
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
// Delete entry
export const deleteEntry = createAsyncThunk(
  "entries/delete",
  async ({ entryId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await entryService.deleteEntry(entryId, token);
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

// Update  entry
export const updateEntry = createAsyncThunk(
  "entries/update",
  async ({ updateData, entryId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await entryService.updateEntry(updateData, entryId, token);
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
export const entrySlice = createSlice({
  name: "entry",
  initialState,
  reducers: { reset: (state) => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(updateEntry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEntry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateEntry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteEntry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEntry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.entries = state.entries.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(deleteEntry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createEntry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEntry.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createEntry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getEntries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEntries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.entries = action.payload;
      })
      .addCase(getEntries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getEntry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEntry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.entry = action.payload;
      })
      .addCase(getEntry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = entrySlice.actions;

export default entrySlice.reducer;
