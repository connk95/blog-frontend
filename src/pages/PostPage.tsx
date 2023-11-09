import { Redirect } from "react-router";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";

import { RootState } from "../redux/store";
import { fetchPosts } from "../redux/post/post.actions";

export const PostPage = (
  props: RouteComponentProps<{ id: string }>
): JSX.Element => {
  const { id } = props.match.params;
  const { post } = useSelector((state: RootState) => ({
    post: selectPost(state, id),
  }));

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
