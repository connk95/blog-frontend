import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "./user.type";

export const createUser = createAsyncThunk(
  "users/createUser",
  async ({ username, email, password }: User) => {
    const res = await axios.post("http://localhost:3000/users", {
      username,
      email,
      password,
    });
    return res.data;
  }
);

export const fetchUser = createAsyncThunk(
  "users/getUser",
  async (id: string) => {
    console.log("test get user, id: ", id);
    const res = await axios.get(`http://localhost:3000/users/${id}`);
    return res.data;
  }
);
