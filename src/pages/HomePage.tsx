import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Grid,
  Card,
  Typography,
  CardContent,
  CircularProgress,
  Button,
  Container,
  Box,
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
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" sx={{ alignContent: "center" }}>
              All posts
            </Typography>
            <Button
              variant="contained"
              href="/posts/new"
              sx={{ width: 120, mt: 2 }}
            >
              New Post
            </Button>
          </Grid>
          {posts.loading ? <CircularProgress /> : <></>}
          <Grid item xs={12}>
            {posts.allPosts.toReversed().map((post) => (
              <Link to={`/posts/${post._id}`} key={post._id}>
                <Card sx={{ my: 1 }}>
                  <CardContent>
                    <Typography sx={{ fontWeight: "bold", fontSize: 18 }}>
                      {post.title}
                    </Typography>
                    <Typography sx={{ my: 1 }}>{post.text}</Typography>
                    <Typography sx={{ fontSize: 14 }}>
                      posted at {post.createdAt.slice(11, 16)} on{" "}
                      {post.createdAt.slice(0, 10)}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }}>
                      by {post.user.username}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;
