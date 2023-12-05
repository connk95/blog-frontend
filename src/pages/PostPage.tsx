import { useEffect } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  CircularProgress,
  TextField,
  Button,
  Container,
  Box,
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
    <Container component="main" maxWidth="md">
      {posts.loading ? (
        <CircularProgress />
      ) : posts.singlePost.title ? (
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          component="form"
          // onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card>
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
            </Grid>
            {posts.singlePost.comments ? (
              <Grid item>
                <Card>
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
              </Grid>
            ) : (
              <Typography>Be the first to leave a comment!</Typography>
            )}
            <Grid item xs={12}>
              <TextField
                id="comment"
                label="Comment"
                variant="outlined"
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ width: 90, mt: 2 }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Typography>Post not found</Typography>
      )}
    </Container>
  );
};

export default PostPage;
