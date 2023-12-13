import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Post } from "./post.type";
import { Comment } from "./comment.type";
import { RootState } from "../store";

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
  async ({ title, text }: Post, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const res = await axios.post("http://localhost:3000/posts", {
      title,
      text,
      user: state.auth.loggedInUser.user,
    });
    return res;
  }
);

export const newComment = createAsyncThunk(
  "posts/newComment",
  async ({ text, postId }: Comment, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    console.log(postId);
    const res = await axios.patch(`http://localhost:3000/posts/${postId}`, {
      postId,
      text,
      user: state.auth.loggedInUser.user,
    });
    console.log(res);
    return res.data;
  }
);
