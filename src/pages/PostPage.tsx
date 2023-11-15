import { useEffect } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../redux/hooks";
import { RootState } from "../redux/store";
import { fetchSinglePost } from "../redux/post/post.actions";
import { useParams } from "react-router";

export const PostPage = (): JSX.Element => {
  console.log("PostPage rendered");
  const { id } = useParams();
  const posts = useSelector((state: RootState) => state.posts);

  console.log("ID:", id);
  console.log("Posts State:", posts);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchSinglePost(id));
    }
  }, [dispatch, id]);

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        {posts.loading ? (
          // <Typography>Loading...</Typography>
          <CircularProgress />
        ) : posts.singlePost.title ? (
          <Card>
            <CardContent>
              <Typography>{posts.singlePost.title}</Typography>
              <Typography>{posts.singlePost.text}</Typography>
              <Typography>
                posted at {posts.singlePost.createdAt.slice(11, 19)} on{" "}
                {posts.singlePost.createdAt.slice(0, 10)}
              </Typography>
              <Typography>by {posts.singlePost.user.username}</Typography>
            </CardContent>
          </Card>
        ) : (
          <Typography>Post not found</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default PostPage;
