import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Post } from "./post.type";

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

export const newPost = createAsyncThunk(
  "posts/newPost",
  async ({ title, text }: Post) => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      const loggedInUser = JSON.parse(user);
      const res = await axios.post("http://localhost:3000/posts", {
        title,
        text,
        user: loggedInUser.user,
      });
      return res;
    } else {
      return;
    }
  }
);
