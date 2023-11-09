import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk("users/fetchUser", async () => {
  const res = await axios.get("http://localhost:3000/users");

  return res.data;
});
