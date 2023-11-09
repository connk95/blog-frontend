import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "./user.type";
import { fetchUser } from "./user.actions";
import { User } from "./user.type";

const initialState: UserState = {
  loggedInUser: {},
  error: "",
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.loggedInUser = action.payload;
        state.error = "";
        state.loading = false;
      }
    );
    builder.addCase(fetchUser.pending, (state) => {
      state.loggedInUser = {};
      state.error = "";
      state.loading = true;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loggedInUser = {};
      state.error = action.error.message || "Could not find user";
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
