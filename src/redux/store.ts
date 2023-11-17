import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./post/post.slice";
import userSlice from "./user/user.slice";

export const store = configureStore({
  reducer: {
    posts: postSlice,
    users: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
