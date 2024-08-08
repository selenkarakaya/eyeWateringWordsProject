import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import entryReducer from "../features/entry/entrySlice";
import entriesAllReducer from "../features/entry/allentrySlice";
import commentReducer from "../features/comments/commentSlice";
import avatarReducer from "../features/avatar/avatarSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    entries: entryReducer,
    allentry: entriesAllReducer,
    comments: commentReducer,
    avatars: avatarReducer,
  },
});
