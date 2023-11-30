import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Grid,
  Card,
  Typography,
  CardContent,
  CircularProgress,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

import { useAppDispatch } from "../redux/hooks";
import { fetchPosts } from "../redux/post/post.actions";
import { RootState } from "../redux/store";

export const HomePage = (): JSX.Element => {
  const posts = useSelector((state: RootState) => state.posts);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Grid container direction="column" alignItems="center">
      <Grid
        container
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h4" sx={{ alignContent: "center" }}>
          All posts
        </Typography>
        <Button
          variant="contained"
          href="/posts/new"
          sx={{ width: 120, mx: 2 }}
        >
          New Post
        </Button>
      </Grid>
      {posts.loading ? <CircularProgress /> : <></>}
      {posts.allPosts.map((post) => (
        <Link to={`/posts/${post._id}`} key={post._id}>
          <Card sx={{ p: 1, m: 2, width: "60vw" }}>
            <CardContent>
              <Typography sx={{ fontWeight: "bold" }}>{post.title}</Typography>
              <Typography>{post.text}</Typography>
              <Typography>
                posted at {post.createdAt.slice(11, 19)} on{" "}
                {post.createdAt.slice(0, 10)}
              </Typography>
              <Typography>by {post.user.username}</Typography>
            </CardContent>
          </Card>
        </Link>
      ))}
    </Grid>
  );
};

export default HomePage;
