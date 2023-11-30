import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostState, Post } from "./post.type";
import { fetchPosts, fetchSinglePost, newPost } from "./post.actions";

const initialState: PostState = {
  allPosts: [],
  singlePost: <Post>{},
  error: "",
  loading: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.allPosts = action.payload;
        state.singlePost = <Post>{};
        state.error = "";
        state.loading = false;
      }
    );
    builder.addCase(fetchPosts.pending, (state) => {
      state.allPosts = [];
      state.singlePost = <Post>{};
      state.error = "";
      state.loading = true;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.allPosts = [];
      state.singlePost = <Post>{};
      state.error = action.error.message || "Could not load posts";
      state.loading = false;
    });
    builder.addCase(
      fetchSinglePost.fulfilled,
      (state, action: PayloadAction<Post>) => {
        state.allPosts = [];
        state.singlePost = action.payload;
        state.error = "";
        state.loading = false;
      }
    );
    builder.addCase(fetchSinglePost.pending, (state) => {
      state.allPosts = [];
      state.singlePost = <Post>{};
      state.error = "";
      state.loading = true;
    });
    builder.addCase(fetchSinglePost.rejected, (state, action) => {
      state.allPosts = [];
      state.singlePost = <Post>{};
      state.error = action.error.message || "Could not load post";
      state.loading = false;
    });
    builder.addCase(newPost.fulfilled, (state) => {
      state.error = "";
      state.loading = false;
    });
    builder.addCase(newPost.pending, (state) => {
      state.error = "";
      state.loading = true;
    });
    builder.addCase(newPost.rejected, (state, action) => {
      state.error = action.error.message || "Could not create post";
      state.loading = false;
    });
  },
});

export default postSlice.reducer;
