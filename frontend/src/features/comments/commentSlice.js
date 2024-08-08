import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentService from "./commentService";

const initialState = {
  comments: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// Get entry comments
export const getComments = createAsyncThunk(
  "comments/getAll",
  async (entryId, thunkAPI) => {
    try {
      return await commentService.getComments(entryId);
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

// Create entry comment
export const createComment = createAsyncThunk(
  "comments/create",
  async ({ commentText, entryId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await commentService.createComment(commentText, entryId, token);
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

// Create entry comment
export const deleteComment = createAsyncThunk(
  "comments/delete",
  async ({ commentId, entryId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await commentService.deleteComment(commentId, entryId, token);
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

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: { reset: (state) => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments = state.comments.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments = action.payload;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments.push(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = commentSlice.actions;
export default commentSlice.reducer;
