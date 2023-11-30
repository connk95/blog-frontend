import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSinglePost = createAsyncThunk(
  "posts/fetchSinglePost",
  async (id: string) => {
    const res = await axios.get(`http://localhost:3000/posts/${id}`);
    return res.data;
  }
);

export const fetchPosts = createAsyncThunk("posts/fetchAllPosts", async () => {
  const res = await axios.get("http://localhost:3000/posts");
  return res.data;
});

export const newPost = createAsyncThunk("posts/newPost", async (data) => {
  const res = await axios.post("http://localhost:3000/posts", { data });
  return res;
});
