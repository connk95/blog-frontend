import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./post/post.slice";
import userSlice from "./user/user.slice";
import authSlice from "./auth/auth.slice";

export const store = configureStore({
  reducer: {
    posts: postSlice,
    users: userSlice,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
