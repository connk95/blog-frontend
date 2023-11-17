import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "./user.type";

export const fetchUser = createAsyncThunk("users/fetchUser", async () => {
  const res = await axios.get("http://localhost:3000/users");

  return res.data;
});

export const createUser = createAsyncThunk(
  "users/createUser",
  async ({ username, email, password }: User) => {
    const res = await axios.post("http://localhost:3000/users", {
      username,
      email,
      password,
      //   posts: [],
      //   likes: [],
      //   comments: [],
    });

    return res.data;
  }
);
