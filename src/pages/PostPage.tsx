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
import { useNavigate } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { newComment } from "../redux/post/post.actions";

const defaultTheme = createTheme();

// interface CommentInput {
//   text: string;
//   user: string;
//   postId: string;
// }

export const PostPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const posts = useSelector((state: RootState) => state.posts);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Comment>();

  const onSubmit: SubmitHandler<Comment> = async (data) => {
    const commentData = {
      text: data.comment,
      postId: id,
    };
    console.log(commentData);
    await dispatch(newComment(commentData));
    navigate("/");
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchSinglePost(id));
    }
  }, [dispatch, id]);

  return (
    <ThemeProvider theme={defaultTheme}>
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
            onSubmit={handleSubmit(onSubmit)}
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
              {posts.singlePost.comments.length > 0 ? (
                <Grid item xs={12}>
                  <Typography sx={{ ml: 1, mb: 2 }}>Comments</Typography>
                  <Card>
                    {posts.singlePost.comments.map((comment) => (
                      <CardContent key={comment.id}>
                        {console.log("comment: ", comment)}
                        <Typography>{comment.text}</Typography>
                        <Typography>
                          posted at {comment.createdAt.slice(11, 19)} on{" "}
                          {comment.createdAt.slice(0, 10)}
                        </Typography>
                        <Typography>by {comment.user.username}</Typography>
                      </CardContent>
                    ))}
                  </Card>
                </Grid>
              ) : (
                <Typography sx={{ m: 2, ml: 3 }}>
                  Be the first to leave a comment!
                </Typography>
              )}
              <Grid item xs={12}>
                <TextField
                  {...register("comment", {
                    required: "Please add a comment and try again",
                    maxLength: {
                      value: 240,
                      message:
                        "Comments cannot exceed 240 characters in length",
                    },
                  })}
                  id="comment"
                  label="Comment"
                  variant="outlined"
                  fullWidth
                />
                {errors.comment && (
                  <Typography variant="caption" color="error">
                    {errors.comment.message}
                  </Typography>
                )}
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
    </ThemeProvider>
  );
};

export default PostPage;
