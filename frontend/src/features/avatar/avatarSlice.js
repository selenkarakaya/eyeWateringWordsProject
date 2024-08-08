import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import avatarService from "./avatarService";

const initialState = {
  avatars: [],
  avatar: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// Create new entry
export const createImage = createAsyncThunk(
  "avatars/create",
  async (newImage, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await avatarService.createImage(newImage, token);
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

// Get all avatar
export const getAvatar = createAsyncThunk(
  "avatars/getAll",
  async (_, thunkAPI) => {
    try {
      return await avatarService.getAvatar();
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

export const avatarSlice = createSlice({
  name: "avatar",
  initialState,
  reducers: { reset: (state) => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(createImage.pending, (state) => {
        // NOTE: clear single entry on entryies page, this replaces need for
        // loading state on individual entry
        state.isLoading = true;
      })
      .addCase(createImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAvatar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.avatars = action.payload;
      })
      .addCase(getAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export const { reset } = avatarSlice.actions;
export default avatarSlice.reducer;
