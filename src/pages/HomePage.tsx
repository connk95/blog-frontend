import { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { Grid, Card, Typography, CardContent } from "@mui/material";
import { Link } from "react-router-dom";

// import "./App.css";
import { useAppDispatch } from "../redux/hooks";
import { fetchPosts } from "../redux/post/post.actions";
import { store } from "../redux/store";
import { RootState } from "../redux/store";

export const HomePage = (): JSX.Element => {
  const posts = useSelector((state: RootState) => state.posts);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  console.log(posts.allPosts);

  return (
    <Provider store={store}>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography>Posts</Typography>
          {posts.loading ? <Typography>Loading...</Typography> : <></>}
          {posts.allPosts.map((post) => (
            <Link to={`/posts/${post._id}`} key={post._id}>
              <Card>
                <CardContent>
                  <Typography>{post.title}</Typography>
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
      </Grid>
    </Provider>
  );
};

export default HomePage;
