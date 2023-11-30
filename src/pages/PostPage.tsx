import { useEffect } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  CircularProgress,
  TextField,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../redux/hooks";
import { RootState } from "../redux/store";
import { fetchSinglePost } from "../redux/post/post.actions";
import { useParams } from "react-router";

export const PostPage = (): JSX.Element => {
  const { id } = useParams();
  const posts = useSelector((state: RootState) => state.posts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchSinglePost(id));
    }
  }, [dispatch, id]);

  return (
    <Grid container flexDirection="column" alignItems="center">
      {posts.loading ? (
        <CircularProgress />
      ) : posts.singlePost.title ? (
        <Grid item>
          <Card sx={{ p: 1, m: 2, width: "60vw" }}>
            <CardContent>
              <Typography sx={{ fontWeight: "bold" }}>
                {posts.singlePost.title}
              </Typography>
              <Typography>{posts.singlePost.text}</Typography>
              <Typography>
                posted at {posts.singlePost.createdAt.slice(11, 19)} on{" "}
                {posts.singlePost.createdAt.slice(0, 10)}
              </Typography>
              <Typography>by {posts.singlePost.user.username}</Typography>
            </CardContent>
          </Card>
          {posts.singlePost.comments.length > 0 ? (
            <Card sx={{ p: 1, m: 2, width: "60vw " }}>
              {posts.singlePost.comments.map((comment) => (
                <CardContent key={comment.id}>
                  <Typography>{comment.text}</Typography>;
                  <Typography>
                    posted at {comment.createdAt.slice(11, 19)} on{" "}
                    {comment.createdAt.slice(0, 10)}
                  </Typography>
                  ;
                </CardContent>
              ))}
            </Card>
          ) : (
            <Typography sx={{ mx: 2.5 }}>
              Be the first to leave a comment!
            </Typography>
          )}
          <Grid container direction={"column"} sx={{ alignItems: "flex-end" }}>
            <TextField
              id="outlined-basic"
              label="Comment"
              variant="outlined"
              sx={{ m: 2, width: "61vw" }}
            />
            <Button variant="contained" sx={{ width: 90, mx: 2 }}>
              Submit
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Typography>Post not found</Typography>
      )}
    </Grid>
  );
};

export default PostPage;
