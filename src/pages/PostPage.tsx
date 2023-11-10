import { Card, CardContent, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";

import { RootState } from "../redux/store";
import { fetchSinglePost } from "../redux/post/post.actions";
import { useParams } from "react-router";

export const PostPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const post = useSelector((state: RootState) => state.posts.singlePost);

  console.log(post);

  useEffect(() => {
    dispatch(fetchSinglePost(id!));
  }, [dispatch, id]);

  return (
    <Grid container direction="column" alignItems="center">
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
    </Grid>
  );
};

export default PostPage;
