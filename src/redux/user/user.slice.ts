import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, NewUser, UserState } from "./user.type";
import { fetchUser, createUser } from "./user.actions";

const initialState: UserState = {
  loggedInUser: <User>{},
  newUser: <NewUser>{},
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
        state.newUser = <User>{};
        state.error = "";
        state.loading = false;
      }
    );
    builder.addCase(fetchUser.pending, (state) => {
      state.loggedInUser = <User>{};
      state.newUser = <User>{};
      state.error = "";
      state.loading = true;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loggedInUser = <User>{};
      state.newUser = <User>{};
      state.error = action.error.message || "Could not find user";
      state.loading = false;
    });
    builder.addCase(
      createUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.newUser = action.payload;
        state.loggedInUser = <User>{};
        state.error = "";
        state.loading = false;
      }
    );
    builder.addCase(createUser.pending, (state) => {
      state.loggedInUser = <User>{};
      state.newUser = <User>{};
      state.error = "";
      state.loading = true;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.loggedInUser = <User>{};
      state.newUser = <User>{};
      state.error = action.error.message || "Could not create user";
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
